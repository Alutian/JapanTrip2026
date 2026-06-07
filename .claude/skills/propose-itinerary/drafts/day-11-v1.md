# Day 11 — Mon Jun 8 · Departure (fly home) — REAL-TIME DRAFT v1

**Mode:** real-time (it's ~08:00, Popo dropped at NRT, kids asleep, family at Richmond Hotel Narita).
**Anchor (immovable):** ZG030 NRT→SJC **16:25** (ZIPAIR/LCC → check-in + bag drop **closes 15:25**, opens ~13:25).
**Terminal:** NRT **Terminal 1**, ZIPAIR check-in **North Wing, 4F**.

## The convergence (why this day is easy)
NRT T1, 5th floor, *landside* (before passport control) has all three things Ajay asked for, within ~50m of each other:
- **IASS Executive Lounge 1** (T1 Central, 5F, 07:00–21:00) → Ajay's work spot. Power + USB at seats, wifi, quiet. ~¥3,226/adult pay-per-use; **kids under 12 free** with an adult.
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
        'Ajay → **IASS Executive Lounge 1** (T1 Central, 5F, 07:00–21:00). ~¥3,226/adult, **kids under 12 free**. Power + USB + wifi. Bags have room here.',
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
      emoji: '🛍',
      title: 'Airside: last duty-free + gate',
      time: '~13:50–15:50',
      lines: [
        'Candice → airside duty-free (tax-free; better for last-minute alcohol/cosmetics/souvenirs than landside retail).',
        'Ajay finishes work (airside seating has power; IASS satellite lounge also airside if you want quiet).',
        'Kids settle near the gate. Board ~15:50.',
      ],
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

## Open questions / decisions
1. **Lounge vs food-court table** for the 11:00–13:15 camp? (Recommend: IASS lounge for Ajay + adjacent play space for kids.)
2. **Verify the 10:40 shuttle serves Terminal 1** (some hotel shuttles hit T2/T3 first) — quick ask at the front desk.
3. Confirm whether anyone has **Priority Pass / Amex Platinum** that gets the IASS lounge free (skip the ¥3,226).

## Handoff
Paste the structured block over the existing `n: 11` entry in `site/src/data/trip.ts`, then run `/fix-itinerary 11` to refine + deploy.
