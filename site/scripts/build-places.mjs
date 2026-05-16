#!/usr/bin/env node
// Build the places registry by ingesting:
//   - Plan_C_Family_of_5/wishlist/raw/{tokyo,kyoto,hakone}.csv
//   - site/data/places.curated.json  (curated entries: lodging, locked bookings, day-spine non-wishlist)
// Output: site/data/places.json
//
// NOTE: this only assembles the registry. Verification (real placeId, lat/lng) happens via
// scripts/resolve-places.mjs which calls Google Places API and writes places.resolved.json.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const dataDir = path.join(siteRoot, 'data');

const CSV_FILES = [
  { city: 'tokyo', path: path.join(repoRoot, 'Plan_C_Family_of_5/wishlist/raw/tokyo.csv') },
  { city: 'kyoto', path: path.join(repoRoot, 'Plan_C_Family_of_5/wishlist/raw/kyoto.csv') },
  { city: 'hakone', path: path.join(repoRoot, 'Plan_C_Family_of_5/wishlist/raw/hakone.csv') },
];

// Minimal CSV parser supporting quoted fields with embedded commas and newlines.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function slugify(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// City-context strings to append to ambiguous queries so Places API picks the right place.
const CITY_HINT = {
  tokyo: 'Tokyo Japan',
  kyoto: 'Kyoto Japan',
  hakone: 'Hakone Japan',
  nara: 'Nara Japan',
  narita: 'Narita Japan',
};

async function ingestCSVs() {
  const out = [];
  for (const { city, path: p } of CSV_FILES) {
    let text;
    try { text = await fs.readFile(p, 'utf8'); } catch { continue; }
    const rows = parseCSV(text);
    if (rows.length === 0) continue;
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const col = (name) => headers.findIndex(h => h === name);
    const iPrio = col('priority');
    const iCat = col('category');
    const iWhat = col('what');
    const iMap = col('map link');
    const iBooked = col('booked?');
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const priority = parseInt(row[iPrio], 10);
      const what = (row[iWhat] || '').trim();
      const mapLink = (row[iMap] || '').trim();
      if (!what && !mapLink) continue; // skip blank rows
      // Some Map Link cells contain multiple places separated by newlines — split them.
      const mapCandidates = mapLink ? mapLink.split(/\n+/).map(s => s.trim()).filter(Boolean) : [''];
      for (let mi = 0; mi < mapCandidates.length; mi++) {
        const m = mapCandidates[mi];
        const baseQuery = m || what;
        if (!baseQuery) continue;
        const idBase = slugify(`${city}-${baseQuery}`);
        const id = mapCandidates.length > 1 ? `${idBase}-${mi + 1}` : idBase;
        out.push({
          id,
          name: baseQuery,
          query: `${baseQuery} ${CITY_HINT[city] || ''}`.trim(),
          city,
          priority: Number.isFinite(priority) ? priority : null,
          category: (row[iCat] || '').trim() || null,
          source: `wishlist:${city}`,
          booked: (row[iBooked] || '').trim().toLowerCase() === 'yes' || null,
          sourceWhat: what !== baseQuery ? what : null,
        });
      }
    }
  }
  return out;
}

async function main() {
  await fs.mkdir(dataDir, { recursive: true });

  // 1. Pull wishlist items from CSVs
  const fromCSV = await ingestCSVs();

  // 2. Layer in the curated registry (lodging + locked bookings + day-plan-only places)
  let curated = [];
  const curatedPath = path.join(dataDir, 'places.curated.json');
  try {
    curated = JSON.parse(await fs.readFile(curatedPath, 'utf8'));
  } catch {
    console.warn('[build-places] no places.curated.json yet — generating CSV-only registry');
  }

  // 3. Merge: curated entries override CSV entries by id (so we can pin exact placeIds when known).
  const byId = new Map();
  for (const p of fromCSV) byId.set(p.id, p);
  for (const p of curated) byId.set(p.id, { ...byId.get(p.id), ...p });

  const merged = Array.from(byId.values()).sort((a, b) => {
    // Sort by city, then priority asc (nulls last), then name
    if (a.city !== b.city) return (a.city || '').localeCompare(b.city || '');
    const pa = a.priority ?? 99;
    const pb = b.priority ?? 99;
    if (pa !== pb) return pa - pb;
    return (a.name || '').localeCompare(b.name || '');
  });

  const outPath = path.join(dataDir, 'places.json');
  await fs.writeFile(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`[build-places] wrote ${merged.length} places to ${path.relative(siteRoot, outPath)}`);
  const withPriority = merged.filter(p => p.priority);
  console.log(`[build-places]   - by priority: ${[1,2,3,4,5,6].map(p => `P${p}:${withPriority.filter(x => x.priority === p).length}`).join(' ')}`);
  console.log(`[build-places]   - by city: ${['tokyo','kyoto','hakone','nara','narita'].map(c => `${c}:${merged.filter(x => x.city === c).length}`).join(' ')}`);
}

main().catch(err => { console.error(err); process.exit(1); });
