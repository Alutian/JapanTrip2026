# Places registry — how it works

Three files in this folder, in dependency order:

```
places.curated.json  ← hand-authored (lodging, locked bookings, day-spine places)
       │
       ▼  build-places.mjs (merges with the 3 wishlist CSVs)
places.json          ← generated registry, 100+ places
       │
       ▼  resolve-places.mjs (calls Google Places API)
places.resolved.json ← canonical: every place with placeId + lat/lng + verified name
places.unresolved.md ← anything ambiguous or not found — review queue
```

`places.resolved.json` is what the site reads at build time. It's committed so the site builds without an API key.

## Setup (one time)

You need a Google Cloud API key with these APIs enabled:

- **Places API** (for resolution)
- **Maps Embed API** (for the embedded iframe on lodging pages)
- **Maps JavaScript API** (for the multi-marker /map page and day maps)
- **Maps Static API** (optional, if we want static map images)

Steps:

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project (or reuse existing) → enable the 4 APIs above
3. Credentials → Create Credentials → API key
4. Restrict the key:
   - **API restrictions:** select the 4 APIs above
   - **HTTP referrer restriction:** add `https://alutian.github.io/*` and `http://localhost:*` (lets it work both on the deployed site and during local dev)
5. Copy the key

Set it as an env var:

```bash
export GOOGLE_MAPS_API_KEY=your-key-here
# Or put it in site/.env.local (gitignored):
echo 'GOOGLE_MAPS_API_KEY=your-key-here' > site/.env.local
```

## Re-run when wishlist or bookings change

```bash
cd site
npm run build-places    # rebuild places.json from CSVs + curated overlay
npm run resolve-places  # hit Places API for new/changed entries
```

Both are idempotent. `resolve-places` caches its API responses in `data/.places-cache.json` (gitignored) so re-running only costs API calls for new places.

## When something resolves wrong

Open `places.unresolved.md` — every ambiguous place is listed with API candidates and a Google Maps search link. To pin the right one:

1. Find the correct pin on Google Maps
2. Copy its place ID from the share dialog (or from the URL — `data=...!1s<placeId>`)
3. Add an entry to `places.curated.json` with the same `id` and a `placeId` field:
   ```json
   { "id": "tokyo-cinnamoroll-cafe", "placeId": "ChIJ..." }
   ```
4. Re-run `npm run build-places && npm run resolve-places`

The curated overlay always wins over the auto-resolved data.
