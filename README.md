# Japan 2026 — Family Trip

Planning + day-of companion for our May 29 – Jun 8, 2026 trip (Ajay, Candice, Zara, Kai, Grandma).

## What's where

- **[Plan_C_Family_of_5/](Plan_C_Family_of_5/)** — itinerary, menus, wishlist, decisions, todos
- **[bookings/](bookings/)** — all confirmation numbers + lodging detail
- **[site/](site/)** — installable mobile web app (Astro PWA, deploys to GitHub Pages)

## Install the phone app

Once GitHub Pages is enabled on this repo, the site auto-deploys on every push to `main`.

URL: `https://alutian.github.io/JapanTrip2026/?k=<token>`

The token is shared offline (iMessage / Signal). Without it the site shows an empty page.

**iPhone:** Open in Safari → Share → Add to Home Screen → tap the red 🗾 icon. Launches full-screen, works offline once cached.

**Android:** Open in Chrome → tap the install prompt or menu → Install App.

Three views:
- `/` — adults landing: today's plan, hotels, transit, bookings, emergency
- `/grandma` — grandma view: her flights, hotels, 5:30 AM taxi (Jun 8), emergency
- `/today` — auto-routes to today's day plan

## How updates flow

```
edit markdown in repo  →  git push main  →  GitHub Action  →  Pages rebuilds  →  PWA auto-updates on next launch
```

The site reads markdown from `Plan_C_Family_of_5/` and `bookings/` at build time. Quick-lookup tables (hotels, transit, bookings) are curated in `site/src/data/trip.ts` — update there when bookings change, not in markdown.

## Local dev

```bash
cd site
npm install
npm run dev
```

Open `http://localhost:4321/JapanTrip2026/?k=<token>`.

## Enable GitHub Pages (one-time)

1. GitHub repo Settings → Pages
2. Source: **GitHub Actions** (not the legacy branch-based deploy)
3. Push to `main` → first deploy runs in ~90 sec
