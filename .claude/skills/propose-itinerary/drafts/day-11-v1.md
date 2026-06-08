# Day 11 — Mon Jun 8 · Departure (fly home) — REAL-TIME DRAFT v1

**Mode:** real-time (it's ~08:00, Popo dropped at NRT, kids asleep, family at Richmond Hotel Narita).
**Anchor (immovable):** ZG030 NRT→SJC **16:25** (ZIPAIR/LCC → check-in + bag drop **closes 15:25**, opens ~13:25).
**Terminal:** NRT **Terminal 1**, ZIPAIR check-in **North Wing, 4F**.

## The convergence (why this day is easy)
NRT T1, 5th floor, *landside* (before passport control) has all three things Ajay asked for, within ~50m of each other:
- **IASS Executive Lounge 1** (T1 Central, 5F, 07:00–21:00) → Ajay's morning work spot (landside; the nicer NOA lounge is airside-only, used post-check-in). Free on **CSR Priority Pass**. Power + USB at seats, wifi, quiet.
- **Kids' play space** right by the lounge (tunnels, slides, foam blocks) → Zara + Kai burn energy; tablets for quiet time in the lounge.
- **Renovated 4F/5F atrium + food court + shops + SHIKISAI GARDEN** → Candice's browse/shop loop.

So: Ajay parks in the lounge and works, kids oscillate between the play space and tablet-time, Candice shops the atrium, everyone reconvenes for lunch on 5F. The catch: **bag drop doesn't open until ~13:25**, so the 11:00–13:15 stretch is landside with all bags (lounge has luggage room). That long landside window IS the "camp and work" time Ajay wants — it's a feature.

---

## Conversational summary (Candice voice)
Babes — easy one. Popo's off, kids are still out, so: lazy hotel breakfast, repack while they wake up, catch the **10:40 shuttle** (don't miss it — it's the last). We're at T1 by ~11. Here's the trick: ZIPAIR won't take our bags until **13:25**, so we've got ~2.5 hours landside first — which is exactly your "sit and work" window. Everything's on **5F**: you set up in the **IASS lounge** (kids are free with you, there's power and wifi), the kids have a little **play space with slides/tunnels right next to it**, and I'll do the shops on 4F/5F. We eat lunch up there ~12:30. Then we check in at **13:25** on the North Wing 4F, drop the four bags (hard cutoff **15:25** — ZIPAIR's a budget carrier, they're strict), and once we're airside I'll hit duty-free for the last souvenir run while you finish working and the kids settle at the gate. Board ~15:50, wheels up 16:25. One repack rule: any liquids/sake and anything heavy goes in **checked** — carry-ons are capped at **7kg** and they actually weigh them.

**One call for you:** lounge or just a food-court table? Lounge = power, calm, kids-free-under-12, but not a run-around space (that's what the play area next door is for). Food court = free, kids sprawl, but noisier and outlets are hit-or-miss. I'd do the lounge for your laptop + the play space for the kids.

---

## Structured draft (replaces existing `n: 11` entry in `site/src/data/trip.ts`)

```ts
{
  n: 11,
  date: '2026-06-08',
  shortDate: 'Mon Jun 8',
  title: 'Departure',
  cluster: 'NRT Terminal 1 → home',
  crossLinks: [
    { href: '/lodging/narita', label: '🔑 Richmond Narita — checkout' },
    { href: '/bookings', label: '✈ Bookings' },
    { href: '/packing', label: '🎒 Packing list' },
  ],
  confirmation: { code: 'GE7DVP', label: 'ZIPAIR conf (family)' },
  countdown: { flightIso: '2026-06-08T16:25:00+09:00', leaveIso: '2026-06-08T10:40:00+09:00', flightLabel: 'ZG030 NRT→SJC' },
  locked: [
    '08:20 — Popo NRT→SIN (Scoot TR885) ✓ already gone',
    '10:40 — LAST hotel shuttle to NRT — do not miss',
    '13:25 — ZIPAIR bag drop OPENS (T1 North Wing 4F)',
    '15:25 — ZIPAIR check-in + bag drop CLOSES (hard, LCC)',
    '16:25 — Family ZG030 NRT→SJC · 09:40 same-day arrival SJC (cross dateline)',
  ],
  bags: {
    title: 'Repack before checkout (ZIPAIR carry-on is weighed: 7kg cap)',
    items: [
      'CHECKED (4 bags, 30kg ea): liquids, sake/alcohol, scissors/nail clippers, all heavy souvenirs',
      'CARRY-ON: passports ×5, GE7DVP printout, chargers + 2 battery packs, kids\' tablets (flight content downloaded), meds, snacks, anything fragile you want hand-carried',
      'Weigh each carry-on to ≤7kg — overflow goes into a checked bag, not the gate',
      'Return meals are PRE-ordered (Spicy Chicken Rice ×2 adults / Veg Penne ×2 kids) — ZIPAIR sells nothing free onboard, so buy kid snacks landside',
    ],
  },
  momentCards: [
    {
      emoji: '🍳',
      title: 'Slow breakfast + repack at Richmond',
      time: '~08:45–10:20',
      lines: [
        'Wake kids ~08:30. Hotel breakfast, then repack to the bag rules above.',
        'Checkout 11:00 — but you\'re leaving on the 10:40 shuttle, so settle the bill / drop keys before 10:30.',
      ],
      mapQuery: 'Richmond Hotel Narita',
    },
    {
      emoji: '🚌',
      title: 'LAST hotel shuttle → NRT Terminal 1',
      time: '10:40 (last one)',
      lines: [
        'Confirm at front desk tonight/this morning that the 10:40 stops at Terminal 1 (ZIPAIR).',
        'Backup if you miss it: Keisei local ~¥260/10 min, or taxi ~¥2,500/10 min.',
      ],
      accent: 'warn',
    },
    {
      emoji: '💻',
      title: 'Landside camp on T1 · 5F (the work/play/shop window)',
      time: '~11:00–13:15',
      lines: [
        'Ajay → **IASS Executive Lounge 1** (T1 Central, 5F, 07:00–21:00) — the ONLY IASS lounge reachable now (the nicer NOA is airside, post-security). Free on **CSR Priority Pass** (you + 2 guests; kids may count → worst case one $27 guest). Power + USB + wifi. Bags have room here.',
        'Kids → **play space right by the lounge** (tunnels/slides/foam — skews young but good for a stint) + tablet quiet-time in the lounge.',
        'Candice → 4F/5F shops + SHIKISAI GARDEN relaxation area.',
        'Lunch ~12:30 on the renovated 5F food court (Jad Thai has GF; plenty of no-pork options).',
        'Alternative to the lounge: a 5F food-court table — free, kids sprawl, but noisier + outlets spotty.',
      ],
      mapQuery: 'IASS Executive Lounge 1 Narita Airport Terminal 1',
      mapLabel: 'IASS Lounge T1 5F in Maps',
      accent: 'accent',
    },
    {
      emoji: '🛂',
      title: 'Check in + drop the 4 bags — T1 North Wing 4F',
      time: '~13:20 (opens 13:25)',
      lines: [
        'ZIPAIR counter / self bag-drop, **North Wing 4F**. Hard close **15:25** — go early to beat the line.',
        'Have GE7DVP + all 5 passports out. Then security + immigration → airside (one-way, no coming back landside).',
      ],
      mapQuery: 'ZIPAIR check-in counter Narita Airport Terminal 1 North Wing',
      accent: 'warn',
    },
    {
      emoji: '🛋',
      title: 'Airside: IASS Superior Lounge NOA + duty-free + gate',
      time: '~13:50–15:50',
      lines: [
        'Wind down in the **nicer** IASS lounge: **Superior Lounge NOA**, 3F airside, by **Gate 26** (07:30–21:00). Free on CSR Priority Pass (kids under 6 free; same worst-case one $27 guest).',
        'Candice → airside duty-free (tax-free; better for last-minute alcohol/cosmetics/souvenirs than landside retail).',
        'Kids settle near the gate. Board ~15:50.',
      ],
      mapQuery: 'IASS Superior Lounge NOA Narita Airport Terminal 1 Gate 26',
      mapLabel: 'Superior Lounge NOA (airside) in Maps',
      accent: 'accent',
    },
  ],
  plan: [
    'Lazy breakfast + repack at Richmond → 10:40 last shuttle to NRT T1',
    '~11:00–13:15 — landside camp on 5F: Ajay works (IASS lounge), kids play space + tablets, Candice shops, family lunch',
    '~13:20 — check in + drop 4 bags, North Wing 4F (closes 15:25)',
    '~13:50 — airside: duty-free + gate → board ~15:50',
    '16:25 — ZG030 home',
  ],
  timezoneNote: 'Depart 16:25 JST → land SJC 09:40 same calendar day (gain time crossing the dateline). Eastbound: stay up, sleep last few hours.',
}
```

## Settled (this thread)
- **Path chosen:** work-at-the-airport day — already on the 10:40 shuttle.
- **Two-lounge arc:** Exec Lounge 1 (5F landside) AM → Superior Lounge NOA (3F airside, Gate 26) PM. Both free on **CSR Priority Pass** (worst case one $27 guest if the kids get counted).
- **No earlier flight:** ZIPAIR NRT→SJC is once daily at 16:25 (ZG030). Confirmed.

## Open questions
1. Does **Candice also carry a Priority Pass** (own CSR / authorized user)? If yes, split the kids across both memberships → everyone free, no $27.

## Handoff
Paste the structured block over the existing `n: 11` entry in `site/src/data/trip.ts`, then run `/fix-itinerary 11` to refine + deploy.
