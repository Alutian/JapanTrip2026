#!/usr/bin/env node
// Resolve every place in data/places.json against the Google Places API.
// For each place:
//   1. Call "Find Place from Text" with input=query, fields=place_id,name,geometry,formatted_address
//   2. If exactly one candidate → trust it
//   3. If multiple candidates → write to data/places.unresolved.md for manual review
//   4. If zero candidates → flag for manual review
//
// Output: data/places.resolved.json (commit this) + data/places.unresolved.md (review queue)
//
// Requires:  GOOGLE_MAPS_API_KEY env var with Places API enabled.
//
// Re-run safe: places that already have a placeId in data/places.json (manually pinned) are not re-resolved.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const dataDir = path.join(siteRoot, 'data');
const placesPath = path.join(dataDir, 'places.json');
const resolvedPath = path.join(dataDir, 'places.resolved.json');
const unresolvedPath = path.join(dataDir, 'places.unresolved.md');
const cachePath = path.join(dataDir, '.places-cache.json');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_MAPS_API_KEY env var.');
  console.error('Get one at https://console.cloud.google.com/apis/credentials');
  console.error('Enable: Places API + Maps Embed API + Maps JavaScript API + Maps Static API');
  process.exit(1);
}

const FIND_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

async function findPlace(query) {
  const url = new URL(FIND_URL);
  url.searchParams.set('input', query);
  url.searchParams.set('inputtype', 'textquery');
  url.searchParams.set('fields', 'place_id,name,geometry/location,formatted_address,types');
  url.searchParams.set('language', 'en');
  url.searchParams.set('key', API_KEY);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Places API HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.status === 'ZERO_RESULTS') return { candidates: [] };
  if (json.status !== 'OK') throw new Error(`Places API status ${json.status}: ${json.error_message || ''}`);
  return { candidates: json.candidates || [] };
}

async function loadCache() {
  try { return JSON.parse(await fs.readFile(cachePath, 'utf8')); } catch { return {}; }
}

async function saveCache(cache) {
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');
}

async function main() {
  const places = JSON.parse(await fs.readFile(placesPath, 'utf8'));
  const cache = await loadCache();
  const resolved = [];
  const unresolved = [];
  let apiCalls = 0;
  let cacheHits = 0;

  for (const p of places) {
    // If manually pinned (placeId in source) — trust it, but still try to fetch geometry from cache.
    if (p.placeId && cache[p.placeId]) {
      resolved.push({ ...p, ...cache[p.placeId], placeId: p.placeId });
      cacheHits++;
      continue;
    }

    const cacheKey = p.placeId || `q:${p.query}`;
    if (cache[cacheKey]) {
      resolved.push({ ...p, ...cache[cacheKey] });
      cacheHits++;
      continue;
    }

    let result;
    try {
      result = await findPlace(p.query);
      apiCalls++;
    } catch (err) {
      console.error(`[${p.id}] API error: ${err.message}`);
      unresolved.push({ place: p, reason: 'api-error', candidates: [], error: err.message });
      continue;
    }

    if (result.candidates.length === 0) {
      unresolved.push({ place: p, reason: 'zero-results', candidates: [] });
      resolved.push({ ...p, resolveStatus: 'zero-results' });
    } else if (result.candidates.length === 1) {
      const c = result.candidates[0];
      const out = {
        placeId: c.place_id,
        resolvedName: c.name,
        formattedAddress: c.formatted_address,
        lat: c.geometry?.location?.lat,
        lng: c.geometry?.location?.lng,
        types: c.types,
        resolveStatus: 'ok',
      };
      cache[cacheKey] = out;
      resolved.push({ ...p, ...out });
    } else {
      // Multiple candidates — pick the first but flag for review.
      const c = result.candidates[0];
      const out = {
        placeId: c.place_id,
        resolvedName: c.name,
        formattedAddress: c.formatted_address,
        lat: c.geometry?.location?.lat,
        lng: c.geometry?.location?.lng,
        types: c.types,
        resolveStatus: 'ambiguous',
        ambiguousCount: result.candidates.length,
      };
      cache[cacheKey] = out;
      resolved.push({ ...p, ...out });
      unresolved.push({ place: p, reason: 'ambiguous', candidates: result.candidates });
    }

    // Small delay to be polite to the API
    await new Promise(r => setTimeout(r, 80));
  }

  await saveCache(cache);
  await fs.writeFile(resolvedPath, JSON.stringify(resolved, null, 2) + '\n', 'utf8');

  // Write unresolved.md review queue
  const md = [
    '# Places needing review',
    '',
    `Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/resolve-places.mjs\`.`,
    '',
    `**${unresolved.length} of ${places.length} places** need a human eyeball. For each one:`,
    '1. Open the Google Maps search URL — find the right pin.',
    '2. From the URL bar, extract the place ID (or open the share dialog → embed → grab the place_id).',
    '3. Edit `data/places.curated.json`: add an entry with the same `id` and a `placeId` field.',
    '4. Re-run `npm run resolve-places`.',
    '',
    '---',
    '',
  ];

  if (unresolved.length === 0) {
    md.push('🎉 Everything resolved cleanly. Nothing to review.');
  } else {
    for (const u of unresolved) {
      const p = u.place;
      const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`;
      md.push(`## ${p.name}`);
      md.push('');
      md.push(`- **id:** \`${p.id}\``);
      md.push(`- **city / priority:** ${p.city}${p.priority ? ` · P${p.priority}` : ''}`);
      md.push(`- **query:** ${p.query}`);
      md.push(`- **reason:** ${u.reason}`);
      md.push(`- [Open Google Maps search →](${searchUrl})`);
      if (u.candidates?.length > 0) {
        md.push('');
        md.push(`**${u.candidates.length} candidates returned by API:**`);
        u.candidates.forEach((c, i) => {
          md.push(`  ${i + 1}. **${c.name}** — ${c.formatted_address} · \`${c.place_id}\``);
        });
      }
      md.push('');
    }
  }

  await fs.writeFile(unresolvedPath, md.join('\n'), 'utf8');

  console.log(`[resolve-places] ${places.length} places · ${apiCalls} API calls · ${cacheHits} cache hits`);
  console.log(`[resolve-places] resolved cleanly: ${resolved.filter(r => r.resolveStatus === 'ok').length}`);
  console.log(`[resolve-places] ambiguous: ${unresolved.filter(u => u.reason === 'ambiguous').length}`);
  console.log(`[resolve-places] zero-results: ${unresolved.filter(u => u.reason === 'zero-results').length}`);
  console.log(`[resolve-places] wrote ${path.relative(siteRoot, resolvedPath)}`);
  console.log(`[resolve-places] wrote ${path.relative(siteRoot, unresolvedPath)} (${unresolved.length} items)`);
}

main().catch(err => { console.error(err); process.exit(1); });
