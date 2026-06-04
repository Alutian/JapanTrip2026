# Day 8 — Fri Jun 5, Kyoto (real-time, drafted 7am day-of)

**Mode:** real-time / build-on-existing. User in the day at 7am, leaving room ~8am.
**Locked:** GEAR non-verbal 19:00–20:30, res #8241, ART Complex 1928, Sanjo-dori, Nakagyo-ku.
**User calls (this session):** keep Fushimi (relaxed 8am start, not pre-dawn) · keep GEAR · everything else hugs the two hubs incl. food · cat café in the middle if time, else push to Day 9/10 · dinner casual walk-in.

## Carry-forward signals applied (from day-5 retrospective)
- Popo + Candice were under the weather (Jun 2) → midday rest block, Popo lower-loop only / can rest + taxi.
- Cat café owed to Kai → Cat Cafe MOCHA Kawaramachi (6 min Stitch, 5 min Sanjo) as the "middle" beat.
- Lock a Candice-safe dinner pattern → here dinner is casual walk-in by user choice (Men-ya Inoichi clear shio = no-pork-safe).
- Turn-taking game for train/queue/pre-show wait; one deliberate 1:1 parent-kid stretch (Yotsutsuji push).
- Candice shopping window baked into midday (Nishiki + Teramachi/Shinkyogoku arcades by Stitch).
- "Hubs not hops": two hubs only — Fushimi (south AM) + Sanjo (central PM/eve). No day-trip sprawl.

## Live timeline (from 8am)
- 08:00 Leave Stitch → Keihan Gion-Shijo (~5 min walk)
- 08:10 Keihan Gion-Shijo → Fushimi-Inari (direct, ~8 min, ¥160)
- 08:25–10:30 Fushimi Inari: inari-sushi/Vermillion breakfast; Popo + 1 lower loop, parent+kid to Yotsutsuji (1:1)
- 10:50 Keihan back → Stitch by ~11:00
- 11:00–13:30 Midday rest + lunch near home (Nishiki graze / Sushiro) + Candice shopping window
- 13:30–15:00 🐱 Cat Cafe MOCHA Kawaramachi (slides to Day 9/10 if short on time/energy)
- 15:00–17:15 FORK A: Higashiyama stone-streets (Kiyomizu → Sannenzaka/Ninenzaka → Imo Pi-pi → Yasaka; Popo taxis to base) / FORK B: light Shirakawa+Gion stroll near Sanjo
- 17:15–18:15 Casual walk-in dinner near Sanjo (Men-ya Inoichi shio ramen / Pontocho counter)
- 18:30 At ART Complex 1928 (confirm exact door via front desk)
- 19:00–20:30 GEAR
- ~20:45 Walk back to Stitch (~15 min) or dessert

## Actions
- None to book. Walk-in dinner + walk-in cat café.
- Only: confirm GEAR exact address with Stitch front desk before heading out.

## Structured draft (paste into site/src/data/trip.ts)
```ts
{
  n: 8,
  date: '2026-06-05',
  shortDate: 'Fri Jun 5',
  title: 'Fushimi + GEAR (relaxed start)',
  cluster: 'South morning → midday rest → Sanjo evening + GEAR',
  locked: ['GEAR non-verbal performance 19:00–20:30 (res #8241, ART Complex 1928, Sanjo-dori Nakagyo-ku — confirm exact door)'],
  plan: [
    '08:00 — Leave Stitch (no pre-dawn rush); Keihan Gion-Shijo → Fushimi-Inari direct (~8 min, ¥160)',
    '08:25–10:30 — Fushimi Inari: inari-sushi / Vermillion Café breakfast; Popo + one on flat lower loop, parent+kid push to Yotsutsuji (1:1 stretch)',
    '11:00–13:30 — Midday rest at Stitch + lunch (Nishiki graze / Sushiro) = Candice shopping window in the Teramachi/Nishiki arcades',
    '13:30–15:00 — 🐱 Cat Cafe MOCHA Kawaramachi (owed to Kai; 6 min from Stitch) — slides to Day 9/10 if energy is short',
    '15:00–17:15 — FORK: A) Higashiyama stone-streets (Kiyomizu → Sannenzaka/Ninenzaka → Yasaka; Popo taxis to base) OR B) light Shirakawa/Gion stroll near Sanjo',
    '17:15 — Casual walk-in dinner near Sanjo (Men-ya Inoichi shio ramen, Candice-safe) — no reservation',
    '18:30 — Arrive ART Complex 1928 (Sanjo)',
    '19:00–20:30 — GEAR show',
  ],
  nextDayTeaser: 'Tomorrow → Day 9: takkyubin Leg 3 handoff FIRST (pack 2 days in day-packs), then Nara deer + Todai-ji, back by ~16:00 for kaiseki farewell.',
}
```
