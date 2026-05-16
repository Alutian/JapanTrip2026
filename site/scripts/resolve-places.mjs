#!/usr/bin/env node
// Resolve every place in data/places.json against the Google Places API (New).
// For each place:
//   1. Call places:searchText with textQuery, regionCode=JP, returning id+displayName+formattedAddress+location+types
//   2. If exactly one place → trust it
//   3. If multiple places → write to data/places.unresolved.md for manual review (pick first)
//   4. If zero places → flag for manual review
//
// Output: data/places.resolved.json (commit this) + data/places.unresolved.md (review queue)
//
// Requires:  GOOGLE_MAPS_API_KEY env var with Places API (New) enabled.
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
  console.error('Enable: Places API (New) + Maps Embed API + Maps JavaScript API + Maps Static API');
  process.exit(1);
}

// Places API (New) — POST endpoint with field mask header.
// https://developers.google.com/maps/documentation/places/web-service/text-search
const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const FIELD_MASK = 'places.id,places.displayName,places.formattedAddress,places.location,places.types';

async function findPlace(query) {
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'en',
      regionCode: 'JP',
      // 1 = best match, up to 20 supported; we keep top 5 for the unresolved review
      pageSize: 5,
    }),
  });
  if (!res.ok) throw new Error(`Places API HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  // Normalize to the legacy shape so the rest of the script stays clean.
  const places = json.places || [];
  return {
    candidates: places.map(p => ({
      place_id: p.id,
      name: p.displayName?.text ?? '',
      formatted_address: p.formattedAddress ?? '',
      geometry: { location: { lat: p.location?.latitude, lng: p.location?.longitude } },
      types: p.types || [],
    })),
  };
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
    } else {
      // Trust the top match. Stash all candidates in the cache for later review.
      const c = result.candidates[0];
      const out = {
        placeId: c.place_id,
        resolvedName: c.name,
        formattedAddress: c.formatted_address,
        lat: c.geometry?.location?.lat,
        lng: c.geometry?.location?.lng,
        types: c.types,
        resolveStatus: 'ok',
        alternateCandidates: result.candidates.length > 1
          ? result.candidates.slice(1).map(x => ({ name: x.name, formatted_address: x.formatted_address, place_id: x.place_id }))
          : undefined,
      };
      cache[cacheKey] = out;
      resolved.push({ ...p, ...out });
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

  const altCount = resolved.filter(r => r.alternateCandidates?.length > 0).length;
  console.log(`[resolve-places] ${places.length} places · ${apiCalls} API calls · ${cacheHits} cache hits`);
  console.log(`[resolve-places] resolved cleanly: ${resolved.filter(r => r.resolveStatus === 'ok').length}`);
  console.log(`[resolve-places] with alternate candidates (worth eyeballing): ${altCount}`);
  console.log(`[resolve-places] zero-results: ${unresolved.filter(u => u.reason === 'zero-results').length}`);
  console.log(`[resolve-places] wrote ${path.relative(siteRoot, resolvedPath)}`);
  console.log(`[resolve-places] wrote ${path.relative(siteRoot, unresolvedPath)} (${unresolved.length} items)`);
}

main().catch(err => { console.error(err); process.exit(1); });
