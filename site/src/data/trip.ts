// Curated quick-lookup data for the phone app.
// Source of truth narratives live in Plan_C_Family_of_5/ + bookings/ markdown files.
// Update this file when bookings change.

export const TRIP = {
  start: '2026-05-28',
  end: '2026-06-08',
  travelers: ['Ajay', 'Candice', 'Zara (9)', 'Kai (7)', 'Popo (75)'],
};

export type Day = {
  n: number;
  date: string; // YYYY-MM-DD
  shortDate: string; // e.g. "Fri May 29"
  title: string;
  cluster: string;
  locked: string[];
  plan: string[];
  takkyubin?: string;

  // Optional richer fields (used on Day 0 first; will roll forward to other days)
  confirmation?: { code: string; label: string };  // e.g. { code: 'GE7DVP', label: 'ZIPAIR conf' }
  crossLinks?: { href: string; label: string }[];  // top-of-page jumps to /lodging, /bookings, /emergency
  countdown?: { flightIso: string; leaveIso: string; flightLabel?: string };
  prep?: { title?: string; items: string[] };       // pre-departure checklist
  bags?: { title?: string; items: string[] };       // bag weigh-in / boarding
  leaveHouse?: { title?: string; items: string[] }; // leave-the-house checklist
  getThere?: { title?: string; lines: string[]; mapQuery?: string; mapLabel?: string };
  atGate?: { title?: string; lines: string[]; tel?: { number: string; label: string } };
  // Generic moment cards — for days that need multiple sequenced transitions.
  // Renders below Locked, above Plan. Each card is self-contained.
  momentCards?: MomentCard[];
  timezoneNote?: string;
  nextDayTeaser?: string;
};

export type MomentCard = {
  emoji?: string;
  title: string;
  time?: string;                                            // "~14:50", "16:00–17:20"
  lines?: string[];                                         // bullet body
  mapQuery?: string;                                        // → google maps deeplink
  mapLabel?: string;
  tel?: { number: string; label: string };                  // tappable phone
  link?: { href: string; label: string };                   // internal cross-link
  accent?: 'default' | 'warn' | 'accent';                   // border color
};

export const DAYS: Day[] = [
  {
    n: -1,
    date: '2026-05-27',
    shortDate: 'Wed May 27',
    title: 'Pack + Prep',
    cluster: 'Last day at home — get-it-done-now items',
    crossLinks: [
      { href: '/packing', label: '🎒 Packing list' },
      { href: '/bookings', label: '✈ Bookings' },
    ],
    locked: [
      'ZIPAIR online check-in opens 11:40 (24h before ZG029). Do it the moment it opens.',
      'These items CANNOT be done morning-of — they need wifi, time, or stores. Today is the deadline.',
    ],
    prep: {
      title: 'Do-tonight prep (wifi + time required — not feasible morning of)',
      items: [
        '📱 ZIPAIR online check-in (opens 11:40 PT) → zipair.net Manage Booking, conf GE7DVP',
        '🗺 Google Maps offline downloads: Tokyo, Hakone, Kyoto, Narita (each ~200MB; do on home wifi)',
        '📲 Install + sign in: Yamato Kuroneko (EN), Smart-EX, Klook',
        '📸 Screenshot ALL booking confirmations to phone Photos (flights, lodging, teamLab, trains) — Wi-Fi-independent backup',
        '🚖 Schedule Uber XL pickup for 08:30 Thu May 28 → SJC Terminal B departures',
        '💴 Order ¥30,000 cash from bank (pickup today) OR commit to 7-Eleven ATM at NRT on arrival',
        '📞 Confirm house-sitter: keys, alarm code, dates, plant instructions',
        '📑 Paper backup of flight info + lodging confirmations in a separate bag from originals',
      ],
    },
    bags: {
      title: 'Pack tonight (final pass — use the full list)',
      items: [
        '🎒 See /packing for the master list (clothes, toiletries, electronics, kid stuff, Japan-specific)',
        '🔌 Travel adapters × 2 (Type A — same as US, but check 100V tolerance on chargers)',
        '🔋 Portable battery packs × 2, fully charged',
        '☔ Foldable umbrella per adult (June rainy season)',
        '👞 Comfortable walking shoes broken in (15–20k steps/day)',
        '🧥 Layers — June Tokyo highs ~26°C, but Hakone evenings cool',
        '💊 ALL prescription meds in carry-ons (never checked, never takkyubin)',
      ],
    },
    plan: [],
    nextDayTeaser: 'Tomorrow → Day 0: Wheels up 11:40 SJC. Morning is just bags + Uber.',
  },
  {
    n: 0,
    date: '2026-05-28',
    shortDate: 'Thu May 28',
    title: 'Departure SJC',
    cluster: 'San Jose → Narita',
    confirmation: { code: 'GE7DVP', label: 'ZIPAIR family conf' },
    crossLinks: [
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/packing', label: '🎒 Packing list' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    countdown: {
      flightIso: '2026-05-28T11:40:00-07:00',
      leaveIso: '2026-05-28T08:30:00-07:00',
      flightLabel: 'wheels up (ZG029)',
    },
    locked: [
      '11:40 — ZIPAIR ZG029 SJC → NRT (11h 10m, nonstop). All 5 in row 51.',
      'Check-in counter: SJC Terminal B. Closes 10:40 sharp (60 min pre-flight).',
      'Depart from gate: Terminal A. Walk B → A after check-in (~10 min).',
      'Popo: separate conf F0F2P9, same flight, seat 51H.',
    ],
    prep: {
      title: 'Morning-of checklist (only last-mile items — wifi/install/shopping was Day -1)',
      items: [
        '✅ Bags pre-paid — 1 checked bag/pax/direction included in Value package. No counter scramble.',
        '✅ Online check-in done last night — if not, do it NOW (need it before counter close)',
        '🛂 Passports × 5 in day-packs (not checked)',
        '📶 Google Fi covers Japan — just power on after landing. Popo\'s carrier handles her own roaming.',
        '💴 Cash + cards in wallet (¥ from bank yesterday, or plan NRT 7-Eleven ATM — JPY/decline-conversion)',
        '🎒 Full packing list confirmed (see /packing). Day -1 items should already be ✅.',
      ],
    },
    bags: {
      title: 'Bag weigh-in (final check before leaving)',
      items: [
        '✅ 1 checked bag/pax/direction is included in Value package — no add-bag scramble at counter',
        'Checked bag limits: 30 kg max / piece, sum of 3 sides ≤ 203 cm. Final weigh-in this morning — redistribute if any > 30 kg.',
        'Carry-on: 7 kg/pax (not upgraded). Two pieces allowed (40×25×55 + 35×25×45 cm) but total weight ≤ 7 kg.',
        'Don\'t overpack day-packs — 7 kg cap means the kids\' tablets + your laptop + snacks need to balance.',
      ],
    },
    leaveHouse: {
      title: 'Leave the house',
      items: [
        'Set up Nest cameras',
        'Lock all doors',
        'Park cars in garage / driveway',
        'Take out trash + compost',
        'Ping house-sitter (keys, alarm code, dates)',
      ],
    },
    getThere: {
      title: 'Get to SJC',
      lines: [
        '🚗 Uber XL — schedule night of May 27 for 08:30 pickup',
        '🎯 Target SJC arrival 09:00 (gives 1h 40m before counter close)',
        '🅿 If driving: Lot 3 (departures); pre-reserve via flysanjose.com',
        '🏷 Curbside drop at Terminal B departures (NOT Terminal A — counter is in B)',
      ],
      mapQuery: 'San Jose Mineta International Airport Terminal B',
      mapLabel: 'Open SJC Terminal B in Maps',
    },
    atGate: {
      title: 'At the gate / in the air',
      lines: [
        'After check-in: walk Terminal B → Terminal A (~10 min) for departure',
        'ZIPAIR sells nothing free — buy snacks landside if kids need extras',
        'Westbound: eat the meal on board, then sleep ~7h. Land local afternoon — push through to 21:00 JST',
        'Flight status (in case of delay): FlightAware TZP29 / FR24 zg29 / zipair.net/en/flight_status',
      ],
      tel: { number: '+18888206002', label: 'ZIPAIR US — (888) 820-6002 (Mon–Fri 09:00–18:00 PT)' },
    },
    timezoneNote: '11:40 PT depart → land tomorrow 14:50 JST (set watches +16h, then -1 calendar day on return).',
    nextDayTeaser: 'Tomorrow → Day 1: Land NRT 14:50, NEX to Yotsuya. Welcome Suica + NEX bought at JR East counter on arrival.',
    plan: [],
  },
  {
    n: 1,
    date: '2026-05-29',
    shortDate: 'Fri May 29',
    title: 'Arrival → Yotsuya',
    cluster: 'Yotsuya / Shinjuku local',
    crossLinks: [
      { href: '/lodging/tokyo', label: '🔑 Yotsuya — door, wifi, directions' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '14:50 — Land NRT T1 (ZG029, row 51 — seats 51A/C/D/G/H)',
      '~17:30–18:30 — Airbnb self check-in window (M/W Hotel 3F, Yotsuya 4-chome)',
      'Jet lag day. Goal: shower, eat, sleep.',
    ],
    prep: {
      title: 'Before stepping off the plane (check on the jetway)',
      items: [
        '🔑 Confirm Airbnb door code arrived in Airbnb messages (host sends evening May 28)',
        '🛂 Passports out of carry-on into outer pocket — Welcome Suica kid-fare verification needs them',
        '📱 Phones on — Google Fi auto-connects in Japan; no setup',
        '💴 Cash plan: either ¥30,000 starter from bank (Day -1) OR use 7-Eleven ATM in NRT arrivals after customs. **Decline DCC** — choose JPY so your bank handles conversion.',
      ],
    },
    momentCards: [
      {
        emoji: '🛂',
        title: 'Immigration + customs',
        time: '14:50–~15:45',
        lines: [
          'All 5 walk together. Allow ~60 min — immigration is the chokepoint.',
          'After customs: follow signs to JR / NEX (lower level B1).',
        ],
        accent: 'warn',
      },
      {
        emoji: '🧳',
        title: 'Drop Popo\'s bag at JAL ABC (T1 South Wing 1F)',
        time: '~15:45–16:00',
        lines: [
          'One of Popo\'s bags stays at the airport for the 10 days — she picks it up Jun 8 before her Scoot flight (same T1).',
          'Counter: **JAL ABC, T1 South Wing 1F** (signs from arrivals lobby).',
          'Provide: name (LEE, SECK JOO), phone, pickup date **Jun 8**.',
          'Cost: ~¥700/day medium · 10 days = **~¥7,000 total**. **Pay at pickup**, not now.',
          'Card or cash (JCB/VISA/MC/Amex/Diners/UP). Keep the receipt — it\'s the only way to retrieve.',
          'Hours: 06:30 → ~1h after last arrival. Popo\'s 8:20 Scoot Jun 8 → she arrives NRT ~05:50 + brief wait to 06:30 open.',
        ],
        mapQuery: 'JAL ABC Counter Narita Airport Terminal 1 South Wing',
        mapLabel: 'JAL ABC T1 in Maps',
        accent: 'warn',
      },
      {
        emoji: '🎫',
        title: 'JR East Travel Service Center — Welcome Suica + NEX',
        time: '~16:00–16:15',
        lines: [
          '**One counter, two purchases.** Welcome Suica × 5 (3 adult, 2 child — bring all 5 passports for kid-fare verification) + NEX tickets × 5 same time.',
          'Welcome Suica = no deposit, 28-day validity, no end-of-trip refund hassle.',
          'Top-up at counter: ~¥3,000/adult, ~¥2,000/kid (cash works; credit sometimes too).',
          'Ask staff about the **N\'EX Tokyo Direct Ticket** tourist discount.',
          'If NEX is sold out: next train in ~30 min. Wait it out, don\'t panic-taxi.',
        ],
        mapQuery: 'JR East Travel Service Center Narita Airport Terminal 1',
        mapLabel: 'Find JR East counter at NRT T1',
        accent: 'accent',
      },
      {
        emoji: '🚆',
        title: 'NEX → Shinjuku',
        time: '~16:15–17:35',
        lines: [
          '~80 min, ~¥13,010 **total** (3 adult × ¥3,250 + 2 child × ¥1,630).',
          '3 suitcases: end-of-car luggage racks; day-packs overhead.',
          'Doze. Don\'t fully sleep — Shinjuku is the get-off stop.',
        ],
      },
      {
        emoji: '🚇',
        title: 'Shinjuku → Yotsuya-sanchome (1 stop Marunouchi)',
        time: '~17:40',
        lines: [
          'Tap Welcome Suica at gate. 1 stop east on Marunouchi line, ~¥180 pp.',
          'Easier than the 10-min walk with 3 suitcases.',
          'Exit at Yotsuya-sanchome → ~3 min walk to M/W Hotel.',
        ],
        mapQuery: 'Yotsuya-sanchome Station',
        mapLabel: 'Yotsuya-sanchome on Maps',
      },
      {
        emoji: '🚪',
        title: 'M/W Hotel 3F — self check-in',
        time: '~17:55–18:30',
        lines: [
          'Building unlocked. Elevator to 3F. Watch the small step exiting.',
          'Enter door code on LOCKSTATE smart lock.',
          'WiFi auto-connects from /lodging/tokyo — copy SSID + password from there.',
        ],
        mapQuery: 'M/W Hotel 4-27-3 Yotsuya Shinjuku Tokyo',
        mapLabel: 'M/W Hotel on Maps',
        tel: { number: '+815017214123', label: 'Skew Lines host: +81 50-1721-4123' },
        link: { href: '/lodging/tokyo', label: 'Full Yotsuya guide — door, wifi, walking photos →' },
        accent: 'accent',
      },
      {
        emoji: '🍜',
        title: 'Dinner (3 jet-lag-friendly options, all 5 min walk)',
        time: '~19:00',
        lines: [
          '**Ramen Ouka** — 5 min walk from Shinjuku-gyoenmae Exit 2. Halal / no-pork ramen. Halal R set ¥1,500, Vegan R set ¥1,100. Family-friendly, English-friendly.',
          '**Halal Wagyu Ramen Shinjuku Tei (Yotsuya)** — backup, slightly further. A5 wagyu, no pork or alcohol.',
          '**Lawson / 7-Eleven** — 3 min walk. The kid-meltdown route: onigiri, oden, sushi rolls. Always open.',
        ],
        mapQuery: 'Ramen Ouka Shinjuku-gyoenmae',
        mapLabel: 'Ramen Ouka in Maps',
      },
      {
        emoji: '🛒',
        title: 'Groceries on the way back (milk, snacks, breakfast for kids)',
        time: '~20:00',
        lines: [
          '**Lawson Store 100 Shinjuku Ni Chome Ten** ⭐ — on the route from Yotsuya-sanchome back to the Airbnb. **Lawson Store 100** is the hybrid konbini + ¥100 grocery — more grocery selection than a regular Lawson: milk, eggs, fresh fruit, bread, breakfast cereal, household stuff. Best single stop for our "stock the Airbnb" run.',
          '**Any 7-Eleven / FamilyMart / Lawson** — 3 min walk per host\'s guide. Lighter selection (onigiri, drinks, snacks, fresh sandwiches) but always open.',
          '**Ito-Yokado Shinjuku Tomihisa** — 5 min walk from Shinjuku-gyoenmae, **full supermarket** (2 floors: kitchen/personal care + fruits/veggies/meat/fish/bakery/bento). Save this for a dedicated trip Day 2+; tonight is too tired.',
          '**Cash tip:** Lawson Store 100 takes IC cards (Welcome Suica) for most items — no need to break ¥10,000 bills here.',
        ],
        mapQuery: 'Lawson Store 100 Shinjuku 2-chome',
        mapLabel: 'Lawson Store 100 in Maps',
      },
    ],
    plan: [
      '😴 Sleep. Push to 21:00 JST minimum. Set Day 2 alarm before passing out.',
    ],
    nextDayTeaser: 'Tomorrow → Day 2: MiPig Café (Harajuku, ~10:00) + Shibuya neon + Tochomae Night Show. Set 07:30 alarm.',
  },
  {
    n: 2,
    date: '2026-05-30',
    shortDate: 'Sat May 30',
    title: 'Harajuku morning → Shinjuku night',
    cluster: 'MiPig · Meiji Shrine · Takeshita · long walk · ⟶ Shinjuku evening: Tocho Night Show + Godzilla Head + sushi train',
    crossLinks: [
      { href: '/lodging/tokyo', label: '🏠 Yotsuya — for the midday rest window' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '10:00 — MiPig Café 60-min private room (Harajuku Takeshita) ✅ booked',
      '~19:45–20:15 — Tokyo Metropolitan Building Night Show (Tochomae, free, nightly) — replaces sold-out Shibuya Sky',
    ],
    momentCards: [
      {
        emoji: '🚇',
        title: 'Yotsuya-sanchome → Harajuku',
        time: '~09:15–09:45',
        lines: [
          'Marunouchi line Yotsuya-sanchome → Shinjuku (1 stop, ¥180), transfer to JR Yamanote → Harajuku (2 stops). ~20 min total.',
          'Welcome Suica covers both — tap at each gate.',
          'Take **Takeshita Exit** at Harajuku — drops you onto the street.',
        ],
        mapQuery: 'Harajuku Station Takeshita Exit',
        mapLabel: 'Harajuku Takeshita Exit',
      },
      {
        emoji: '🐷',
        title: 'MiPig Café — 10:00 (60 min, private room)',
        time: '10:00–11:00',
        lines: [
          '**Bsquare Takeshita Street 1F, Jingumae 1-6-10** — just behind the Alta complex on Takeshita St.',
          'Enter through the hollowed tree-stump door. Shoes off inside.',
          'Booking is by online reservation only (not phone). Arrive a few min early; staff seats by reservation time.',
          'Kid-pace highlight of the day — pace the rest around their fade after this.',
        ],
        mapQuery: 'mipig cafe Harajuku Takeshita Street Bsquare',
        mapLabel: 'MiPig in Maps',
        tel: { number: '+81368043838', label: '03-6804-3838 (info only, not for reservations)' },
        accent: 'accent',
      },
      {
        emoji: '🛍️',
        title: 'Takeshita Street + Omotesando walk',
        time: '~11:00–12:30',
        lines: [
          'Walk Takeshita St south → cross Meiji-dori → Omotesando (the architecture/tree-lined boulevard). ~15 min easy walk.',
          '*Note:* Meiji Jingu Gaien ginkgo is gorgeous **in autumn** — in May it\'s just a tree-lined avenue. Reframe as "Omotesando architecture walk."',
          'Kid-pace stops: crepe stand on Takeshita, Kiddy Land on Omotesando.',
        ],
        mapQuery: 'Omotesando Tokyo',
        mapLabel: 'Omotesando',
      },
      {
        emoji: '🍱',
        title: 'Lunch — Maisen Aoyama Honten (tonkatsu)',
        time: '~12:30–13:45',
        lines: [
          '**4-8-5 Jingumae, Shibuya-ku** — 3 min walk from Omotesando Station. 11:00–21:00, last order 20:30.',
          '⚠ **Tonkatsu = pork.** Candice picks **chicken katsu (鶏かつ)** or **ebi-fry (shrimp)** — both standard menu. Ajay + kids + Popo get the signature kurobuta tonkatsu.',
          'Walk-in works; Sat lunch queue can be real — arrive by 12:15 to skip the wait.',
        ],
        mapQuery: 'Tonkatsu Maisen Aoyama Honten Jingumae',
        mapLabel: 'Maisen Aoyama in Maps',
        tel: { number: '+81120428485', label: '0120-428-485 (Maisen — JP toll-free, call from local SIM)' },
      },
      {
        emoji: '🏠',
        title: 'Rest at Yotsuya',
        time: '~14:30–16:00',
        lines: [
          'Yamanote Harajuku → Shinjuku (2 stops) → Marunouchi → Yotsuya-sanchome (1 stop). ~20 min home.',
          'Target home by 14:30. Kid nap or chill, adult coffee/recharge.',
          '**Leave again by 16:30** to clear transit + arrive in Shibuya by ~17:00.',
        ],
        link: { href: '/lodging/tokyo', label: 'Yotsuya — door code, wifi →' },
      },
      {
        emoji: '🚇',
        title: 'Yotsuya-sanchome → Shinjuku',
        time: '~19:35',
        lines: [
          'Walk to **Yotsuya-sanchome** Marunouchi line (~5 min from M/W Hotel).',
          'Marunouchi line west **3 stops to Shinjuku** (~7 min, ¥180). Exit **West Side** for Tocho.',
          'Welcome Suica taps you through both gates.',
        ],
        mapQuery: 'Shinjuku Station West Exit',
        mapLabel: 'Shinjuku Station West Exit',
      },
      {
        emoji: '🌃',
        title: 'Tokyo Metropolitan Building Night Show',
        time: 'Catch 20:00 or 20:30 show',
        lines: [
          '~10–12 min walk west from Shinjuku Station West Exit to the **Tokyo Metropolitan Government Building** (Tochomae).',
          'Projection mapping on the **twin towers, ~15 min per show, free**. Runs every 30 min through ~21:30 last call.',
          'No booking. Crowd gathers on the plaza ~10 min prior.',
          '⭐ P1 from Candice\'s Tokyo wishlist — pulled forward from Day 4 (replaces sold-out Shibuya Sky).',
        ],
        mapQuery: 'Tokyo Metropolitan Government Building Tochomae',
        mapLabel: 'Tocho twin towers in Maps',
        accent: 'accent',
      },
      {
        emoji: '🚶',
        title: 'Walk Tocho → Kabukicho (neon stretch)',
        time: '~20:30 / ~15–20 min east',
        lines: [
          'Back east through west Shinjuku to **Kabukicho** — the bright-lights district.',
          'Pass the giant TV billboards, alley arcades, and Cross Shinjuku 3D Cat as you go.',
          'Both dinner + Godzilla anchors are along this stretch.',
        ],
        mapQuery: 'Kabukicho Shinjuku',
        mapLabel: 'Kabukicho in Maps',
      },
      {
        emoji: '🍣',
        title: 'Sushi train dinner — Uobei or Genki Sushi (Kabukicho)',
        time: '~20:45–21:30',
        lines: [
          '**Uobei Shinjuku** — same chain that won Day 1\'s mental backup. Tablet ordering, plates fly to you on bullet-train rails. Walk-in.',
          '**Genki Sushi Shinjuku** — classic conveyor belt + tablet, in Kabukicho. Walk-in. Tokyo\'s most kid-magnet sushi spot.',
          '**No-pork plates:** salmon (sake), tuna (maguro), ebi, ika, unagi, tamago, salmon roe (ikura), kanikama. Avoid chasu, butabara, kakuni, pork floss.',
          '¥120–¥200/plate, IC card or credit OK.',
        ],
        mapQuery: 'Uobei Sushi Shinjuku Kabukicho',
        mapLabel: 'Uobei / Genki Sushi area',
        accent: 'accent',
      },
      {
        emoji: '🦖',
        title: 'Godzilla Head photo — Hotel Gracery Shinjuku',
        time: '~21:35',
        lines: [
          '**Hotel Gracery Shinjuku, Kabukicho** — Godzilla\'s head pokes out from the 8th-floor terrace, lit up at night.',
          'View from **street level on Godzilla Road**, free. ~5-min photo op.',
          '~3 min walk from the sushi train spot — same neighborhood.',
        ],
        mapQuery: 'Hotel Gracery Shinjuku Godzilla',
        mapLabel: 'Godzilla Head in Maps',
        accent: 'accent',
      },
      {
        emoji: '🛍️',
        title: 'Optional: Don Quijote Shinjuku',
        time: '~21:45 (if kids still going)',
        lines: [
          '**Don Quijote Shinjuku Higashi-Honten** — 5 floors of chaos, open 24h. On the walk back toward the station.',
          'Pokémon plushies, weird Japan snacks, kids\' toys, anime stuff. 15-min dip max.',
          'Skip if kids are fading — going home wins.',
        ],
        mapQuery: 'Don Quijote Shinjuku Higashi-Honten',
        mapLabel: 'Don Quijote in Maps',
      },
      {
        emoji: '🚇',
        title: 'Shinjuku → Yotsuya home',
        time: '~22:00',
        lines: [
          'Back to Shinjuku Station → Marunouchi line east **1 stop to Yotsuya-sanchome** (~5 min, ¥180) → 5-min walk to M/W Hotel.',
          'Or walk the 25 min via Shinjuku Gyoen perimeter if anyone\'s still up for it.',
        ],
      },
    ],
    plan: [
      '🛏️ Home by ~22:30. Day 3 is Asakusa — earlier start than today.',
    ],
    nextDayTeaser: 'Tomorrow → Day 3: Asakusa + Senso-ji + Skytree + Ikebukuro. Earlier start (~07:30) to beat Senso-ji crowds.',
  },
  {
    n: 3,
    date: '2026-05-31',
    shortDate: 'Sun May 31',
    title: 'Asakusa → Mizumachi → Skytree',
    cluster: 'East Tokyo arc — REVISED day-of (May 31): Sumida River Walk to Skytree on foot · toy mission at Solamachi · evening is an A/B/C fork',
    crossLinks: [
      { href: '/lodging/tokyo', label: '🏠 Yotsuya' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '📍 Revised day-of (May 31) — morning re-anchored on the foot route to Skytree; Kai\'s toy mission at Solamachi; evening A/B/C fork (see last card).',
      '☀ Fed by 6, in bed by 9 — Day-2 lesson: kids hard-fade after 7pm',
    ],
    prep: {
      title: 'Before leaving the hotel (Day-2 lessons baked in)',
      items: [
        '🎫 **Identify the 2 broken Welcome Suica by owner name** — tonight while packing. Tomorrow at Yotsuya station: try regular Suica at the machine; fall back to paper tickets per trip. NO 45-min Ueno detour.',
        '🥢 **Pre-lock dinner option.** Mutekiya = pure tonkotsu = Candice has no option (anti-pattern). Top pick: **Kura Sushi Ikebukuro** (bikkura-pon prize game for kids). Backups: Sushiro, Ippudo (has tori-paitan for Candice), or AFURI. Day-2 lesson: don\'t walk to Ikebukuro without a pick.',
        '🐖 **Candice pork pre-check.** She\'s the only one — Nakamise + Hoppy St have pork-heavy stalls. Check her plate before ordering.',
        '🎒 Day-pack restock: snacks for kids (recovery food = onigiri, rice crackers, plain bread), water bottles, 3 working Welcome Suica.',
      ],
    },
    momentCards: [
      {
        emoji: '🏧',
        title: 'Cash takeout — 7-Eleven near Yotsuya',
        time: '~07:30 (first stop of the day)',
        lines: [
          '**7-Eleven ATM** takes US Visa/Mastercard/Amex reliably (Day 2 problem was Suica top-up machines, NOT 7-Eleven ATMs).',
          '**Always choose "JPY / decline conversion"** when prompted — DCC = worse rate.',
          'Withdraw **¥50,000** for the day (Ikebukuro food court + Yokocho-style stalls + cash-only spots in Asakusa).',
          'Closest to M/W Hotel: 7-Eleven Yotsuya 4-chome, ~3 min walk.',
        ],
        mapQuery: '7-Eleven Yotsuya 4-chome Shinjuku',
        mapLabel: '7-Eleven near hotel',
        accent: 'warn',
      },
      {
        emoji: '🎫',
        title: 'Replace 2 broken Suica — Yotsuya station ticket machine (no detour)',
        time: '~08:00 (right before boarding to Asakusa)',
        lines: [
          '**Decision tree at the machine, in order:**',
          '**1. Try a regular Suica or Pasmo from the ticket machine** at Yotsuya station. Look for the multi-function machine with the **"Suica" / "Pasmo" option**. ¥500 deposit per card (refundable at any JR window before flying home) + ¥2-3k top-up. **2 minutes, no detour.** Slight fare discount over paper (~1-3% on JR) plus the cards tap at konbini, vending machines, coin lockers — useful for the rest of the trip.',
          '**2. If machine says "Suica unavailable"** (chip shortage occasionally bites) → buy **paper tickets** at the same machine for the 2 affected people, one trip at a time. ~¥230 per Asakusa hop, ~¥260 Skytree → Ikebukuro, ~¥220 Ikebukuro → home. Total day-3 cost for 2 paper-ticket riders ≈ ¥1,400.',
          '**Tonight while packing tomorrow\'s day-pack:** identify which 2 cards are broken (write the owners\' names down). If a kid\'s card is broken, push the **child** button when buying their paper ticket / new Suica.',
          '**Other 3 of you** keep using your working Welcome Suica cards — nothing changes for them.',
          '⚠ **Skipped: 45-min detour to Ueno JR East counter for Welcome Suica replacement.** Not worth the trip-time. Regular Suica or paper is the win.',
        ],
        mapQuery: 'Yotsuya Station Marunouchi line',
        mapLabel: 'Yotsuya Station',
        accent: 'accent',
      },
      {
        emoji: '🚇',
        title: 'All 5 → Asakusa',
        time: '~08:30',
        lines: [
          '**Marunouchi line Yotsuya-sanchome → Otemachi** (5 stops, ~12 min) → underground walk transfer to Hanzomon platform → **Hanzomon line Otemachi → Asakusa** (5 stops, ~12 min). Total ~30 min, ¥230/pp.',
          '**OR JR Chuo-Sobu Local Yotsuya → Kanda** (5 stops, ~10 min) → Ginza line → Asakusa (8 stops, ~12 min). Same time, slightly cheaper.',
          'Aim Asakusa arrival ~09:00 — temple still empty before tour buses.',
        ],
        mapQuery: 'Asakusa Station Ginza Line',
        mapLabel: 'Asakusa Station',
      },
      {
        emoji: '⛩️',
        title: 'Asakusa morning arc (M3) — done early',
        time: '~09:00–10:00 (already behind you)',
        lines: [
          '**Kaminarimon + Nakamise + Senso-ji** — done. Temple was a quick, low-engagement stop for the kids (fine — the trip rule keeps only the experiential traditional sites).',
          '**Hoppy Street / Kappabashi Kitchen Town** — optional, not load-bearing. Kappabashi (plastic food samples + chopsticks, P4) is a 10-min detour west *only* if there\'s appetite.',
          '**Funawa Nakamise** → P6 imo-yokan (sweet-potato dessert) if you pass back through Nakamise.',
          'From here the day pivots to the **Skytree on foot** — see next card.',
        ],
        mapQuery: 'Kaminarimon Asakusa',
        mapLabel: 'Kaminarimon in Maps',
      },
      {
        emoji: '🥐',
        title: 'Brunch + cross to Skytree on foot — Sumida River Walk → MUYA',
        time: '~10:00–11:15',
        lines: [
          'From **Sumida Park**, take the **Sumida River Walk** pedestrian bridge (alongside the railway bridge, open 7:00–22:00). ~15 min on foot — lands in **Tokyo Mizumachi** and points straight at the Skytree. No train needed.',
          '⭐ **Brunch — MUYA** (Tokyo Mizumachi, West Zone; opens **8:00**). Bakery café from a Nara roaster — **French toast, Japanese-style sandwiches, proper espresso.** Low-key and design-y, not a tour-bus spot.',
          '🐖 **Candice:** French toast + non-pork sandwiches — covered.',
          '**Backup (sit-down):** **Deus Ex Machina Asakusa** — same complex, hip moto-brand café (burgers, patty melt, veggie sandwich, rice bowls). Opens **11:00**, so MUYA is the better call right now.',
        ],
        mapQuery: 'MUYA Tokyo Mizumachi',
        mapLabel: 'MUYA in Maps',
        accent: 'accent',
      },
      {
        emoji: '🧸',
        title: "Kai's travel buddy — Pokémon Center Skytown + gachapon (Solamachi)",
        time: '~11:15–12:15',
        lines: [
          '🎯 **Today\'s mission: a small toy for Kai to carry + photograph around Japan** (Zara has her Labubu).',
          '⭐ **Pokémon Center Skytown** — Tokyo Solamachi East Yard 4F (the mall at the base of Skytree). A small plush = the perfect carry-around mascot.',
          '**Donguri Republic** (Solamachi) — Totoro / Ghibli plush, if he wants something other than Pokémon.',
          '**Gachapon wall + character shops** (Solamachi) — let him hunt and pick his own guy; half the fun.',
          'Same building as the aquarium + Skytree deck — zero extra transit.',
        ],
        mapQuery: 'Pokemon Center Skytown Tokyo Solamachi',
        mapLabel: 'Pokémon Center Skytown',
        accent: 'accent',
      },
      {
        emoji: '🗼',
        title: 'Skytree deck + Sumida Aquarium',
        time: '~12:15–14:30 (flex — only if energy holds)',
        lines: [
          'You\'re already at the base (Solamachi) — no transit.',
          '**Sumida Aquarium** — Solamachi floors 4-5. Penguins + jellyfish tunnel, kid-magnet, ~1.5 hrs. Combo with Skytree ~¥3,400 adult / ¥2,500 child.',
          '**Skytree Tembo Deck** (P6) — ¥2,100 adult / ¥950 child, walk-up day-of. **Cash budget ~¥15-17k for the 5** if you do both.',
          '**Skip-it permission:** if the kids are toast after the toy hunt, the aquarium alone is plenty — the deck is the easy cut.',
        ],
        mapQuery: 'Tokyo Skytree',
        mapLabel: 'Skytree in Maps',
      },
      {
        emoji: '🍱',
        title: 'Lunch — when hungry (brunch may carry you a while)',
        time: '~13:00–14:30',
        lines: [
          '**At Solamachi** — large food floor, lots of kid-friendly options, no transit.',
          '**OR back in Asakusa** (10-min walk over the bridge): **Daikokuya Tempura** (shrimp/veg tempura bowls, walk-in) or **Asakusa Imahan** sukiyaki (beef — no-pork fine).',
        ],
        mapQuery: 'Tokyo Solamachi food court',
        mapLabel: 'Solamachi dining',
      },
      {
        emoji: '🌆',
        title: 'Evening — how it actually went',
        time: 'evening',
        lines: [
          '✅ **Stayed local at the Skytree.** Dinner at Solamachi, kids ran around, Candice + Popo did the Solamachi shops. Easy, low-key night after a full day — the right call.',
          'Toy mission was already handled at Pokémon Center Skytown, so no Ikebukuro/Akihabara run was needed.',
          '🎆 **Light show deferred to Day 4.** The TOKYO LIGHTS finale was tonight-only, but the regular Tochomae projection-mapping show resumes Mon Jun 1 and is already the Day 4 evening anchor.',
        ],
        mapQuery: 'Tokyo Solamachi',
        mapLabel: 'Solamachi',
      },
      {
        emoji: '🚇',
        title: 'Home to Yotsuya',
        time: 'after dinner',
        lines: [
          'Skytree (Oshiage) → Yotsuya: Hanzomon line → Otemachi, transfer Marunouchi line → Yotsuya-sanchome (~30 min).',
          'Easy night in — Day 4 is teamLab (booked 14:00) **plus the bag shipment to Kyoto**, so a calm morning helps.',
        ],
      },
    ],
    plan: [
      '🛏️ Home by ~21:00. Day 4 has teamLab booked 14:00 — morning can be slow.',
    ],
    nextDayTeaser: 'Tomorrow → Day 4: slow morning · teamLab Planets 14:00 (booked) · evening Omoide Yokocho yakitori + Tochomae Night Show. (Akihabara may get pulled into tonight — Day 4 evening stays Shinjuku.)',
  },
  {
    n: 4,
    date: '2026-06-01',
    shortDate: 'Mon Jun 1',
    title: 'Bags → Kyoto · teamLab · Shibuya Crossing · Tochomae Light Show',
    cluster: 'Last Tokyo day — ship the bags, teamLab at 14:00, then west for dusk crossing + the light show you deferred',
    crossLinks: [
      { href: '/lodging/tokyo', label: '🏠 Yotsuya' },
      { href: '/transit', label: '🧳 Bags/Transit' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      'teamLab Planets Toyosu — entry 14:00–14:30 (inquiry 61d3669eb033ddea8a). Be at Shin-Toyosu ~13:45.',
      '🧳 Ship 2 suitcases Tokyo → Kyoto (Stitch) today — last chance before Hakone.',
    ],
    prep: {
      title: 'Do these in the morning (before you leave) — they unlock the next 3 days',
      items: [
        '📧 **Reply to the Rakuten STAY email** in `name(AT)mail(DOT)com` format → this is what delivers your Hakone self-check-in link for tomorrow. No reply = no check-in.',
        '💬 **Stitch hold = ✅ CONFIRMED.** They\'ll hold both suitcases Jun 2→Jun 4. On the takkyubin label supply the **reservation name = "Candice Kao"** (the booking is under her) + **check-in date "Jun 4"** + res `6410484352`. ⚠️ Use Candice\'s name, not Ajay\'s — that\'s what Stitch matches the bags to.',
        '🧳 **Pack the 2 big suitcases** (Ajay + Kai\'s clothes / Candice + Zara\'s clothes) for shipping. **Deploy the overnight tote** with 2 days of Hakone clothes + toiletries for the four of you. Popo keeps her 20" carry-on.',
        '⚠️ **Day-packs keep:** passports, all meds, 1 full change of clothes each, electronics, kid tablets — never in the shipped bag.',
        '🚫 **No NEX-to-Narita booking needed** — that got replaced by the JR Sobu Rapid. Ignore the old todo.',
      ],
    },
    momentCards: [
      {
        emoji: '🧳',
        title: 'Ship the bags to Kyoto — Lawson near Yotsuya',
        time: 'today, or tomorrow morning before the 13:20 Romancecar',
        lines: [
          'Walk the 2 suitcases ~5 min to the **Lawson** by the Airbnb; counter staff fills the form (or use the Yamato app QR label).',
          '**Ship to (recipient):** STITCH HOTEL Kyoto · 118 Saito-cho, Shimogyo-ku, Kyoto 600-8012 · +81 75-606-4860.',
          '**On the label, specify:** reservation name **Candice Kao** (the booking is under her — use her name, not Ajay\'s) · check-in date **Jun 4** · res `6410484352`. That\'s all Stitch needs — the 2-day hold is ✅ confirmed.',
          '**Cost** ~¥5,000 for 2 bags. Pay at the counter (cash easiest).',
          '**Delivery timing is a non-issue:** even 2-day delivery lands Jun 4 = your check-in day, and they\'re going to Kyoto (not Hakone), so the bags are never needed in between. Today or tomorrow morning both arrive in time.',
          '**The only real constraint is geography:** drop them while you\'re still by the Yotsuya Lawson — i.e. before you board the Romancecar tomorrow. Otherwise you\'re hauling two big suitcases onto the Romancecar + the tiny Tozan switchback (the thing ship-ahead exists to avoid). **Today = lighter morning tomorrow; tomorrow-morning = pack once.** Your call.',
          'Popo\'s carry-on stays with her. You + kids carry day-packs + the overnight tote from here to Hakone tomorrow.',
        ],
        mapQuery: 'Lawson Yotsuya 4-chome Shinjuku',
        mapLabel: 'Lawson near Airbnb',
        accent: 'warn',
      },
      {
        emoji: '🚇',
        title: 'Yotsuya → Odaiba (leave ~8:00)',
        time: '~08:00–08:45',
        lines: [
          'JR Chuo-Sobu/Yamanote **Yotsuya → Shimbashi**, then **Yurikamome → Odaiba-Kaihinkoen** (~13 min, ¥325). The Yurikamome is driverless — grab the **front window** seats, the kids love the elevated bay ride over Rainbow Bridge.',
          'Going early beats the "nothing opens till 10" problem — the beach + bay are open-air and free, no waiting.',
        ],
        mapQuery: 'Odaiba-Kaihinkoen Station',
        mapLabel: 'Odaiba-Kaihinkoen',
      },
      {
        emoji: '🏖️',
        title: 'Odaiba Seaside Park — beach + mini Statue of Liberty',
        time: '~08:45–11:00',
        lines: [
          '**Free, open 24/7, no gate** — perfect energy-burn before teamLab. ~800m artificial sand beach on Tokyo Bay.',
          '**Mini Statue of Liberty** with the **Rainbow Bridge** behind it — the classic Odaiba photo. Tokyo Tower across the water too.',
          'Let the kids run the sand and the waterfront promenade. Morning light is best for the photos.',
          'Grab breakfast/coffee at **DECKS** or **AquaCity** mall right behind the beach (cafés open ~8–9; food court fills in by 11).',
        ],
        mapQuery: 'Odaiba Seaside Park Statue of Liberty',
        mapLabel: 'Odaiba beach + Lady Liberty',
        accent: 'accent',
      },
      {
        emoji: '🤖',
        title: 'Optional — Unicorn Gundam (11:00 transform)',
        time: '~11:00–11:30',
        lines: [
          'Life-size **Unicorn Gundam** statue outside **DiverCity Tokyo Plaza**, ~10-min walk from the beach. Free.',
          '**Transforms at 11:00** (next slot 13:00) — time it for the 11:00 if the kids are into it. Last chance ever: the statue is decommissioned Aug 2026.',
        ],
        mapQuery: 'Unicorn Gundam Statue DiverCity Tokyo Plaza',
        mapLabel: 'Unicorn Gundam',
      },
      {
        emoji: '🍱',
        title: 'Lunch → to teamLab',
        time: '~11:45–13:45',
        lines: [
          'Lunch at **DiverCity Tokyo Plaza** food court, or hop toward Toyosu.',
          'To teamLab: **Yurikamome → Shin-Toyosu** (~16 min, ¥330). teamLab is a short walk from Shin-Toyosu.',
          'Aim to be at **Shin-Toyosu by ~13:45** for the 14:00 entry.',
        ],
        mapQuery: 'DiverCity Tokyo Plaza',
        mapLabel: 'DiverCity',
      },
      {
        emoji: '🌊',
        title: 'teamLab Planets — LOCKED 14:00 entry',
        time: '14:00–~16:30',
        lines: [
          '**Entry window 14:00–14:30** (inquiry `61d3669eb033ddea8a`). May be up to 30 min admission queue on top. ~2.5 hrs on site.',
          '**Barefoot + shallow-water rooms** — wear pants you can **roll above the knee**; rental shorts available if anyone\'s in a skirt. Lockers on site.',
          'Popo can do the dry rooms or sit out the water sections — she doesn\'t have to skip it.',
        ],
        mapQuery: 'teamLab Planets Toyosu',
        mapLabel: 'teamLab Planets',
        accent: 'accent',
      },
      {
        emoji: '🌃',
        title: 'Shibuya Crossing at dusk',
        time: '~17:30–18:45 (sunset 18:48 — perfect timing)',
        lines: [
          'teamLab → Shibuya: **Yurakucho line Toyosu → Nagatacho → transfer Hanzomon line → Shibuya**, ~30 min (Google Maps live).',
          'The world\'s most famous scramble as the **neon comes up** — watch from street level, then the free upper views at **Shibuya Scramble Square / Mag\'s Park** or the **Starbucks Tsutaya 2F** window. Hachiko statue for the photo.',
          '🕹️ **Akihabara fix, covered here:** **GiGO / Adores arcades** + a big **Don Quijote** are right at the crossing — grab the gachapon/arcade hit without the cross-town trip.',
        ],
        mapQuery: 'Shibuya Scramble Crossing',
        mapLabel: 'Shibuya Crossing',
        accent: 'accent',
      },
      {
        emoji: '🍢',
        title: 'Dinner — Omoide Yokocho yakitori (Shinjuku)',
        time: '~19:00–20:00',
        lines: [
          'Shibuya → Shinjuku: **JR Yamanote**, ~7 min. Omoide Yokocho is just outside the west exit.',
          'Yakitori counters (Uchu or any open stall). 🐖 **Candice: chicken skewers only** — negima, momo, sasami, tsukune; skip the butabara. Rest of the family eats anything. Walk-in, **cash**.',
          'Fed before the show, then a ~7-min walk to the Tocho.',
        ],
        mapQuery: 'Omoide Yokocho Shinjuku',
        mapLabel: 'Omoide Yokocho',
      },
      {
        emoji: '🎆',
        title: 'TOKYO Night & Light — the show you deferred',
        time: '~19:30–21:45 (shows repeat every ~15 min)',
        lines: [
          'Regular nightly projection mapping on the **Tokyo Metropolitan Government Building** (No. 1, east wall) resumes tonight now that TOKYO LIGHTS is over.',
          '**Free, standing, walk-up** — 2 min from Tochomae Station / ~7 min walk from Omoide Yokocho. Shows loop every ~15 min until ~21:45, so **roll up whenever** after dinner; no fixed session to race.',
          'Programs rotate (Pac-Man, the Aimer music pieces, etc.). Confirm tonight\'s exact times on tokyoprojectionmappingproject.jp if you want a specific one.',
        ],
        mapQuery: 'Tokyo Metropolitan Government Building Tochomae',
        mapLabel: 'Tocho (light show)',
        accent: 'accent',
      },
      {
        emoji: '🏠',
        title: 'Home to Yotsuya',
        time: 'after the show',
        lines: [
          'Tochomae/Shinjuku → **Yotsuya-sanchome** on the Marunouchi line, ~6 min (2 stops). You\'re basically in your backyard.',
          'Big day done: bags shipped, teamLab, the crossing, the light show. **Tomorrow is Tokyo → Hakone** — day-packs + overnight tote only; leave Yotsuya ~12:30 for the 13:20 Romancecar.',
        ],
      },
    ],
    plan: [
      'Morning (leave ~8:00): Yotsuya → Odaiba beach + mini Statue of Liberty (free, open early — energy burn) → optional 11:00 Unicorn Gundam transform. Ship the 2 suitcases to Kyoto anytime (today or tomorrow AM).',
      'Lunch at DiverCity → Yurikamome to Shin-Toyosu → teamLab Planets (LOCKED 14:00, be there 13:45, rollable pants).',
      'Dusk: Shibuya Crossing (arcade/gachapon fix at GiGO + Don Quijote) → Shinjuku.',
      'Evening: Omoide Yokocho yakitori → Tochomae TOKYO Night & Light show → home Yotsuya.',
    ],
    takkyubin: 'Ship Leg 1 (Tokyo → Kyoto direct, 2 suitcases) from the Lawson near Yotsuya — confirm Stitch holds them Jun 2→Jun 4 first',
    nextDayTeaser: 'Tomorrow → Day 5: Tokyo → Hakone. Day-packs + overnight tote only. ⛈️ Typhoon inbound — SKIP the Free Pass, use Suica. Romancecar 13:20.',
  },
  {
    n: 5,
    date: '2026-06-02',
    shortDate: 'Tue Jun 2',
    title: 'Tokyo → Hakone',
    cluster: 'Transit day — day-packs + overnight tote only (big bags already gone to Kyoto)',
    crossLinks: [
      { href: '/lodging/hakone', label: '🏠 Rakuten STAY' },
      { href: '/transit', label: '🧳 Bags/Transit' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '✅ 2 suitcases shipped to Stitch Kyoto (7-Eleven/Yamato, under Candice Kao) — done.',
      '13:20 — Romancecar Hakone 27 (GSE) Shinjuku → Hakone-Yumoto, Car 5 seats 15C/D + 16B/C/D (control # E655)',
      '⛈️ TYPHOON: SKIP the Hakone Free Pass (mountain transport suspended Jun 3). Use Suica for the Shinjuku→Yumoto base fare + keep the reserved Romancecar ticket for the seat.',
    ],
    prep: {
      title: 'Before you leave Yotsuya (checkout morning)',
      items: [
        '🧳 **SHIP THE BAGS FIRST (carried over from yesterday).** Walk the 2 suitcases ~5 min to the **Lawson** → send to **STITCH HOTEL Kyoto**, 118 Saito-cho, Shimogyo-ku, Kyoto 600-8012. **Label:** recipient **Candice Kao** · check-in **Jun 4** · res `6410484352`. ~¥5,000. Even 2-day delivery lands Jun 4 = check-in day, so timing\'s fine — but they MUST leave from Yotsuya, not ride the train with you.',
        '🎒 **Then carry only:** day-packs + the shared overnight tote (2 days of Hakone clothes for the four of you) + Popo\'s 20" carry-on.',
        '🔑 **Hakone door code is in (Room 301): PIN `2098` for both the building entrance AND the room — press E after.** Entry from 3 PM. Pre-register guest info on the tablet check-in via this link so arrival is fast: https://guestbook.stay.rakuten.com/E3ajKVo?code=6395 — save the resulting QR. Support +81 50-1750-9719.',
        '💴 **Top up Suica well** — with no Free Pass, Suica now covers the Romancecar base fare (Shinjuku→Yumoto) AND the Tozan/bus to Kowakudani. Make sure all working cards have ample balance.',
      ],
    },
    momentCards: [
      {
        emoji: '🧳',
        title: 'Ship the 2 suitcases to Kyoto — Lawson (do this first)',
        time: 'checkout morning',
        lines: [
          'Carried over from yesterday — must happen before you leave Yotsuya, so the bags don\'t ride the Romancecar + Tozan with you.',
          'Walk the 2 suitcases ~5 min to the **Lawson** by the Airbnb. **Ship to:** STITCH HOTEL Kyoto · 118 Saito-cho, Shimogyo-ku, Kyoto 600-8012 · +81 75-606-4860.',
          '**Label:** recipient **Candice Kao** (booking\'s under her) · check-in **Jun 4** · res `6410484352`. ~¥5,000, cash easiest.',
          '**Timing OK:** even 2-day delivery arrives Jun 4 = check-in day; they\'re going to Kyoto, never needed in Hakone.',
        ],
        mapQuery: 'Lawson Yotsuya 4-chome Shinjuku',
        mapLabel: 'Lawson near Airbnb',
        accent: 'warn',
      },
      {
        emoji: '🚇',
        title: 'Go to Shinjuku early (don\'t linger with the bags)',
        time: '~10:45 (right after the bag drop)',
        lines: [
          'You check out at 10 but the train\'s not till 13:20 — so the move is **head to Shinjuku now and park the bags**, not haul them around Yotsuya for 3 hours.',
          'Marunouchi line **Yotsuya-sanchome → Shinjuku** (1 stop), or ~10-min walk. Head for the **Odakyu / west side** (Romancecar platforms).',
          'What you\'re carrying after the suitcase drop: Popo\'s small roller + the overnight tote + backpacks — all carry-on-sized, easy to stash for a couple hours.',
        ],
        mapQuery: 'Shinjuku Station Odakyu',
        mapLabel: 'Shinjuku Station (Odakyu)',
      },
      {
        emoji: '⛈️',
        title: 'TYPHOON UPDATE — SKIP the Free Pass (decided at the counter)',
        time: '~11:00',
        lines: [
          '**Typhoon No. 6 hits Hakone tomorrow (Jun 3): ~180mm rain + high wind.** The ropeway, pirate ship, and likely the Tozan loop will be suspended — so the Free Pass\'s main value is gone. **Odakyu staff advised against buying it. Don\'t.** (Saves ~¥21,500.)',
          '✅ **If Jun 3 clears unexpectedly,** buy a 1-day pass at Hakone-Yumoto that morning instead.',
          '⚠️ **BUT the pass was also covering your Romancecar base fare** (Shinjuku→Yumoto). Your booked ticket E655 is only the seat surcharge — it won\'t open the gate alone. **Fix: tap Suica in at Shinjuku / out at Yumoto** for the base fare, and keep the reserved Romancecar ticket for the seat. **Ask the counter staff to confirm this right now** while you\'re standing there. Top up Suica if low.',
        ],
        mapQuery: 'Odakyu Sightseeing Service Center Shinjuku',
        mapLabel: 'Odakyu Service Center',
        accent: 'warn',
      },
      {
        emoji: '🧺',
        title: 'Stash the bags → hands-free lunch (the 10–1 window)',
        time: '~11:15–13:00',
        lines: [
          '**Park the carry-ons so you\'re not lugging them at lunch.** Best option: the **staffed luggage storage at the Odakyu Sightseeing Service Center** (same counter — holds bags up to 160cm / 25kg each). One stop, bags + pass sorted together.',
          '⚠️ **Don\'t rely on Shinjuku coin lockers** — the large ones are typically **full by 10am** (busiest station in Japan). Staffed storage is the safer bet; lockers only if you happen to find a free large one.',
          'Then **hands-free lunch + a stroll** for ~90 min — easy on the kids and Popo. Quick picks near the west/south side: **NEWoMan / Lumine** food floors, or **Tokyo Mizon / Odakyu department-store** restaurants right there. Keep it light pre-train.',
          '**~13:00:** collect the bags, head to the Romancecar platform.',
        ],
        mapQuery: 'Odakyu Sightseeing Service Center Shinjuku luggage storage',
        mapLabel: 'Odakyu luggage storage',
        accent: 'accent',
      },
      {
        emoji: '🚆',
        title: 'Romancecar Shinjuku → Hakone-Yumoto (BOOKED)',
        time: '13:20 → 14:56',
        lines: [
          '**Hakone 27 (GSE)** · Car 5 · seats **15C/D + 16B/C/D** · control # **E655** · ¥4,610 LE surcharge (base fare now via Suica, since no Free Pass).',
          'Board by ~13:10. **Day-packs overhead; grandma\'s 20" + the overnight tote in the Car 5 vestibule luggage rack.**',
          'Try for the front/rear observation seats\' view if you can — GSE is the panoramic one.',
        ],
        mapQuery: 'Hakone-Yumoto Station',
        mapLabel: 'Hakone-Yumoto',
        accent: 'accent',
      },
      {
        emoji: '🚞',
        title: 'Yumoto → Kowakudani (no pass — pay as you go)',
        time: '~15:00–15:25',
        lines: [
          '**Tozan Railway** Yumoto → Kowakudani, ~3 stops, ~25 min — **pay by Suica or cash** (no Free Pass now). The winding switchback mountain train.',
          '⚠️ **Typhoon front may already be arriving** — if the Tozan line is suspended, fall back to the **Hakone Tozan Bus** (Yumoto → Kowakudani area) or a **taxi** (~15 min, ~¥3,000). Check status at Yumoto.',
          'Carry-ons only, so any of these options is manageable.',
        ],
        mapQuery: 'Kowakudani Station Hakone',
        mapLabel: 'Kowakudani Station',
      },
      {
        emoji: '🔑',
        title: 'Self check-in — Rakuten STAY TERRACE Kowakudani',
        time: '~15:35 (entry allowed from 3 PM)',
        lines: [
          '<10-min walk from Kowakudani Station. **483-2 Kowakudani · Room 301** (booking `2442810403`).',
          '🔑 **Building + Room PIN are the SAME: `2098`** — enter it, then **press E**. (Entrance A = parking lot, Entrance B = from Kowakidani Station; same PIN for both doors AND the room.)',
          '⚠️ **No entry before 3 PM** — you arrive ~15:35, so you\'re fine.',
          '📱 **Finish online check-in on the in-unit tablet:** Living-room tablet → "Check-in" → pull up the reservation via your **Check-in QR / booking number** → identity verified by facial recognition or video call. Register guest info in advance via the link in prep to make this fast.',
          'No front desk. Support: **+81 50-1750-9719**. No on-site onsen — Yunessun (3-min walk) is the Day 6 plan.',
        ],
        mapQuery: 'Rakuten STAY TERRACE Hakone Kowakudani',
        mapLabel: 'Rakuten STAY Kowakudani',
        accent: 'accent',
      },
      {
        emoji: '🛒',
        title: 'Settle in — afternoon/evening',
        time: 'rest of day',
        lines: [
          'Family Mart run for breakfast + snacks; the unit has a kitchen.',
          'Dinner: self-catered in the unit, or a local **Kowakudani izakaya**. Low-key — tomorrow is the big Hakone loop.',
        ],
        mapQuery: 'FamilyMart Kowakudani',
        mapLabel: 'FamilyMart nearby',
      },
    ],
    plan: [
      '🧳 FIRST: ship the 2 suitcases from the Lawson → Stitch Kyoto (Candice Kao, check-in Jun 4) before leaving Yotsuya.',
      'Checkout 10am → go to Shinjuku early (~10:45), don\'t haul bags around Yotsuya.',
      '⛈️ SKIP the Free Pass (typhoon — mountain transport suspended Jun 3). Use Suica for the base fare. Stash the carry-ons at the Odakyu center\'s staffed luggage storage.',
      'Hands-free lunch + stroll near Shinjuku (~11:15–13:00); coin lockers usually full by 10am, so use staffed storage.',
      'Collect bags ~13:00 → Romancecar 13:20 → Hakone-Yumoto 14:56 (Hakone 27 GSE, Car 5, control E655).',
      'Yumoto → Kowakudani by Tozan (Suica) — or bus/taxi if the line\'s suspended → self check-in Rakuten STAY (Room 301, PIN 2098).',
      'Settle in: Family Mart, kitchen, low-key dinner.',
    ],
    nextDayTeaser: 'Tomorrow → Day 6: ⛈️ TYPHOON day in Hakone — mountain loop is off. Indoor plan: Yunessun onsen (3-min walk) or cozy unit day. Departure Jun 4 clears up.',
  },
  {
    n: 6,
    date: '2026-06-03',
    shortDate: 'Wed Jun 3',
    title: 'Hakone — TYPHOON DAY (indoor plan)',
    cluster: '⛈️ Typhoon No. 6 (Jangmi) hits Kanto today — mountain loop is OFF; ride it out with indoor/low-exposure options',
    crossLinks: [
      { href: '/lodging/hakone', label: '🏠 Rakuten STAY' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '⛈️ TYPHOON: ~180mm rain + high-wind gusts forecast today. Ropeway + pirate ship suspend in wind; Tozan railway washes out first in heavy rain. Assume the Classic Loop is NOT running.',
      'Drop takkyubin Leg 2 (Hakone → Kyoto) — do it at a lull, or push to early Jun 4 if conditions are bad tonight.',
    ],
    prep: {
      title: 'Typhoon-day mindset',
      items: [
        '🌀 **Today is a stay-safe / stay-cozy day, not a sightseeing day.** The unit has a kitchen — stock up so you don\'t need to go out in the worst of it.',
        '📵 **Check live status before any trip out:** Hakone Tozan Railway/Ropeway/cruise run real-time suspension notices. If wind/rain is peaking, don\'t attempt the loop even if tempted by a gap.',
        '🛒 **Family Mart run early** (morning, before the worst): breakfast, lunch, snacks, dinner ingredients, kid stuff. 3-min walk.',
        '👜 **Takkyubin Leg 2:** if you can drop the bags during a morning lull, great; if it\'s dangerous, carry them to Odawara tomorrow and ship from there, or just keep them — they\'re only going to Kyoto where you\'re headed anyway.',
      ],
    },
    momentCards: [
      {
        emoji: '⛈️',
        title: 'The situation today',
        time: 'all day',
        lines: [
          '**Typhoon No. 6 (Jangmi)** tracks across Kanto today — forecast ~**180mm rain** + strong gusts in Hakone. Tomorrow (Jun 4) clears for your Kyoto departure.',
          '**The Classic Loop (ropeway, Owakudani, pirate ship) is almost certainly suspended** — those close in high wind. The **Tozan railway** is the first thing to wash out in heavy rain. Plan as if outdoor Hakone is closed today.',
          '**Goal:** keep everyone safe, dry, and entertained; save the energy for Kyoto. Don\'t force the mountain.',
        ],
        mapQuery: 'Kowakudani Hakone',
        mapLabel: 'Kowakudani',
        accent: 'warn',
      },
      {
        emoji: '♨️',
        title: 'Plan A — Yunessun onsen water park (3-min walk)',
        time: 'late morning / afternoon',
        lines: [
          '**The best typhoon-day move.** Yunessun is a 3-min walk from the unit — swimsuit onsen water park, **mostly indoor**, kid-heaven (slides, themed baths). You stay close to home and barely go outside.',
          'Check it\'s open (most indoor facilities stay open through rain; they only close for extreme conditions). Swimsuits required — bring or rent.',
          'Pair with the connected **Mori no Yu** traditional onsen zone for the adults/Popo if they want a quiet soak.',
        ],
        mapQuery: 'Yunessun Hakone Kowakudani',
        mapLabel: 'Yunessun',
        accent: 'accent',
      },
      {
        emoji: '🏠',
        title: 'Plan B — cozy unit day',
        time: 'flexible',
        lines: [
          'If conditions are too rough even for the 3-min Yunessun walk: **hunker down in the unit.** Kitchen + streaming (the unit has it) + the kids\' tablets + card games.',
          '**Cook a family meal** — make the konbini/grocery haul count. This is the "slow afternoon" the pace plan always wanted, just weather-forced.',
          'Big rest banks energy for Kyoto (Day 7 has Nijo + Gion in the evening).',
        ],
        mapQuery: 'FamilyMart Kowakudani',
        mapLabel: 'FamilyMart nearby',
      },
      {
        emoji: '🎨',
        title: 'Plan C — if there\'s a real weather lull (only if safe)',
        time: 'opportunistic',
        lines: [
          '**Only if the Tozan line is confirmed running and rain/wind genuinely ease:** the **Hakone Open-Air Museum** is the lowest-risk "sight" — it has large indoor pavilions (Picasso hall) to duck into, and the kids\' Symphonic Sculpture net. 2 stops from Gora.',
          '**Do NOT attempt the ropeway/Owakudani/pirate-ship loop** — exposed and the first to suspend.',
          'When in doubt, default to Yunessun (Plan A) — closer and safer.',
        ],
        mapQuery: 'Hakone Open-Air Museum',
        mapLabel: 'Open-Air Museum',
      },
      {
        emoji: '🍽️',
        title: 'Dinner',
        time: 'evening',
        lines: [
          'Self-catered in the unit (kitchen) is the safe, cozy call on a typhoon night — make the grocery haul count.',
          'If it\'s calm enough, a short walk to a local **Kowakudani/Gora izakaya**. Don\'t go far in bad wind.',
        ],
        mapQuery: 'Gora restaurants Hakone',
        mapLabel: 'Gora dining',
      },
    ],
    plan: [
      '⛈️ TYPHOON DAY — mountain loop is off. Stay safe/cozy.',
      'Plan A: Yunessun onsen water park (3-min walk, mostly indoor, kid-heaven).',
      'Plan B: cozy unit day — kitchen, streaming, tablets, rest. Banks energy for Kyoto.',
      'Plan C (only if a real lull + Tozan running): Open-Air Museum (has indoor pavilions). NOT the ropeway/loop.',
      'Drop takkyubin Leg 2 at a lull, or defer to Jun 4 from Odawara. Dinner: self-catered.',
    ],
    takkyubin: 'Drop Leg 2 (Hakone → Kyoto) at a weather lull today — or carry to Odawara tomorrow if unsafe',
  },
  {
    n: 7,
    date: '2026-06-04',
    shortDate: 'Thu Jun 4',
    title: 'Hakone → Kyoto',
    cluster: 'Travel day — protect it. One relay morning, soft landing, lantern-walk evening.',
    crossLinks: [
      { href: '/lodging/kyoto', label: '🏠 Stitch Hotel' },
      { href: '/transit', label: '🧳 Bags/Transit' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '~08:00 — Self check-out Rakuten STAY Kowakudani (Room 301), Tozan → Yumoto → Odawara',
      '10:11 — Shinkansen Hikari 637 Odawara → Kyoto, arrive 12:12 (Car 14, seats 3A/B/C/D + 2D, res #2001)',
      '15:00 — Stitch Hotel formal check-in window opens (drop bags at front desk on arrival ~12:45)',
    ],
    prep: {
      title: 'Before you leave Kowakudani (checkout morning)',
      items: [
        '🔑 **Self check-out Room 301** — tidy, bag the trash per the unit instructions, leave by ~08:00 to make the relay. Support +81 50-1750-9719.',
        '🎫 **Hakone Free Pass still covers the Tozan to Yumoto** (2-day window from Jun 2). Tap through the gate as normal; it does NOT cover Yumoto→Odawara Odakyu — that short hop is pay-as-you-go / Suica.',
        '🍱 **Plan the Odawara ekiben as the kids\' "activity."** ~1h buffer (09:05–10:11) at Odawara — the station is famous for the **kamameshi clay-pot bento (Tokai Kamameshi)**. Let each kid pick their own box; eat it on the Hikari. Graze, don\'t book.',
        '📱 **Smart-EX QR tickets:** log in, "Display QR-Ticket," save all 5 QRs to phone Photos for offline. Hikari 637, Car 14.',
        '🧳 **Big bags:** the 2 suitcases (takkyubin Leg 2, dropped at Lawson Kowakudani last night) should reach Stitch today — confirm at the front desk when you drop the day-packs.',
      ],
    },
    momentCards: [
      {
        emoji: '🚞',
        title: 'The relay down to Odawara',
        time: '~08:00–09:05',
        lines: [
          'Self check-out Room 301 by ~08:00. **Tozan Kowakudani → Hakone-Yumoto** (~08:10–08:35, tap Free Pass).',
          'Switch at Yumoto: **Odakyu Yumoto → Odawara** (~08:50–09:05). This short hop is NOT on the Free Pass — pay Suica.',
          'Day-packs + overnight tote + Popo\'s roller only — big bags already shipped ahead to Kyoto. Easy carry on the switchback train.',
        ],
        mapQuery: 'Odawara Station',
        mapLabel: 'Odawara Station',
      },
      {
        emoji: '🍱',
        title: 'Odawara ekiben — let the kids pick (this is the activity)',
        time: '~09:05–10:11',
        lines: [
          '~1h buffer before the Hikari. Odawara Station is famous for the **kamameshi clay-pot bento** (Tōkai / Kōraku-en kamameshi) — warm rice + chicken/veg in a little ceramic pot.',
          'Each kid picks their own box; eat it on the train. Candice-safe: chicken kamameshi or a mixed makunouchi, skip the pork katsu boxes.',
          'Find the Shinkansen gates with ~15 min to spare — Odawara is small, but board calm not rushed.',
        ],
        mapQuery: 'Odawara Station ekiben',
        mapLabel: 'Odawara ekiben stand',
        accent: 'accent',
      },
      {
        emoji: '🚄',
        title: 'Shinkansen Hikari 637 → Kyoto (BOOKED)',
        time: '10:11 → 12:12',
        lines: [
          '**Hikari 637** · Car **14** · seats **3A/3B/3C + 3D/2D** · res `#2001`. (Hikari only — Nozomi doesn\'t stop at Odawara.)',
          'Suggested: Ajay + Candice + one kid in 3ABC; Popo + other kid in the 3D/2D column pair.',
          'Run the story-game or a 1-2-3 ranking on the kids\' kamameshi for the 2h ride. Right side (D/E) gets the Mt. Fuji view ~15 min in if it\'s clear.',
        ],
        mapQuery: 'Kyoto Station',
        mapLabel: 'Kyoto Station',
        accent: 'accent',
      },
      {
        emoji: '🧳',
        title: 'Land soft — drop bags at Stitch',
        time: '~12:30–12:50',
        lines: [
          'Kyoto Station → **Stitch Hotel** (118 Saito-cho, Shimogyo-ku). Easiest with a tired family + day-packs: **taxi ~10 min (~¥1,200)**. Or Karasuma subway → Shijo (2 min) + ~7-min walk.',
          '24h front desk — **drop the day-packs even though formal check-in is 3 PM.** Confirm the 2 takkyubin suitcases arrived.',
          '住所 for the taxi: 〒600-8012 京都府京都市下京区斎藤町118 · front desk +81 75-606-4860 · PIN `3605`.',
        ],
        mapQuery: 'STITCH HOTEL Kyoto Saito-cho Shimogyo',
        mapLabel: 'Stitch Hotel Kyoto',
      },
      {
        emoji: '🐙',
        title: 'Nishiki Market graze lunch (5 min walk)',
        time: '~13:00',
        lines: [
          '**Kyoto\'s Kitchen** — 400m covered food arcade, ~5 min from Stitch. This is lunch AND the afternoon\'s fun: hands-on, kid-bait, no reservation.',
          'Graze: **Kai** tamagoyaki on a stick · **Tako Tamago** octopus-quail-egg · **Mochitsuki Ya** fresh mochi · **Sawawa** warabi-mochi for dessert. Everyone picks their own.',
          'Candice-safe everywhere here — skip the few pork-skewer stalls, plenty else. Light it up; dinner\'s later.',
        ],
        mapQuery: 'Nishiki Market Kyoto',
        mapLabel: 'Nishiki Market',
        accent: 'accent',
      },
      {
        emoji: '🌿',
        title: 'White space — Kamo River + check-in',
        time: '~14:00–17:00',
        lines: [
          '**Protected downtime — this is the point of a travel day.** Kamo River is 2 min from Stitch; let the kids run the bank while the adults sit. Rotate one-on-one if anyone needs it.',
          'Formal check-in opens **15:00** — unpack, breathe, nap. Family Mart is next door for snacks/drinks.',
          '🏯 **Optional bonus (only if the kids still have gas ~14:30):** Nijo Castle — flat, Popo-friendly, ~1.5h, one metro stop / 15-min walk; nightingale floors chirp (kids love it). Last entry ~16:00 — confirm. **Skip guilt-free if they\'re toast.**',
        ],
        mapQuery: 'Kamo River Shijo Kyoto',
        mapLabel: 'Kamo River',
      },
      {
        emoji: '🏮',
        title: 'Gion at dusk — Pontocho + Shirakawa lantern walk (the event)',
        time: '~17:30–19:30',
        lines: [
          '**The one thing we care about today.** **Hanamikoji** stone street + wooden teahouses (possible maiko ~17:45–18:15) → **Shirakawa Canal**, willow-lined and lantern-lit → **Pontocho Alley** across the river, ~5 min from Stitch.',
          'Dinner is a **Candice-safe sure thing**, not a walk-in gamble: a Pontocho conveyor-sushi/robata counter, **Ippudo Kawaramachi** (tori-paitan for Candice), or **Men-ya Inoichi** (ramen, kid-friendly). Order around pork as always.',
          'Grandma can walk the kids back over the river when they fade; adults can linger 10 min.',
        ],
        mapQuery: 'Pontocho Alley Kyoto',
        mapLabel: 'Pontocho Alley',
        accent: 'accent',
      },
      {
        emoji: '🌙',
        title: 'Home + early lights-out',
        time: '~20:30–21:00',
        lines: [
          '~5–10 min walk back to Stitch. Fade by 21:00 on purpose.',
          '**Tomorrow is the 6:30am Fushimi Inari sunrise** — empty red torii only happens if we\'re actually up. Lay out clothes, set the alarm, don\'t let the night drift.',
        ],
        mapQuery: 'STITCH HOTEL Kyoto',
        mapLabel: 'Stitch Hotel',
      },
    ],
    plan: [
      '~08:00 self check-out Kowakudani → Tozan to Yumoto → Odakyu to Odawara (~09:05).',
      'Odawara ~1h buffer: grab the kamameshi clay-pot ekiben (the kids\' "activity"), find Shinkansen gates.',
      '10:11 Hikari 637 → Kyoto 12:12 (Car 14, res #2001). Story-game on the ride.',
      'Taxi/subway to Stitch (~12:45) → drop day-packs at front desk, confirm takkyubin bags arrived.',
      '~13:00 Nishiki Market graze lunch (5 min) — hands-on, kid-friendly, no booking.',
      'WHITE SPACE 14:00–17:00: Kamo River downtime + 15:00 formal check-in + unpack. Nijo Castle = optional bonus only if kids have energy.',
      'Dusk: Hanamikoji → Shirakawa Canal → Pontocho lantern walk. Candice-safe dinner (sushi train / Ippudo Kawaramachi / Men-ya Inoichi) — no reservation gamble.',
      'Home by ~21:00 — protect the early Fushimi sunrise tomorrow.',
    ],
    nextDayTeaser: 'Tomorrow → Day 8: Fushimi Inari SUNRISE (be out the door ~06:00, Keihan Gion-Shijo → Inari direct) · Higashiyama stone-streets afternoon · GEAR show 19:00 (res #8241). Early night tonight is the whole game.',
  },
  {
    n: 8,
    date: '2026-06-05',
    shortDate: 'Fri Jun 5',
    title: 'Fushimi + GEAR (relaxed start)',
    cluster: 'South morning → midday rest → Sanjo evening + GEAR',
    locked: ['GEAR non-verbal performance 19:00–20:30 (res #8241, ART Complex 1928, Sanjo-dori Nakagyo-ku — confirm exact door with front desk)'],
    plan: [
      '08:00 — Leave Stitch (no pre-dawn rush); Keihan Gion-Shijo → Fushimi-Inari direct (~8 min, ¥160)',
      '08:25–10:30 — Fushimi Inari: inari-sushi / Vermillion Café breakfast; Popo + one on flat lower loop, parent+kid push to Yotsutsuji (1:1 stretch)',
      '11:00–13:30 — Midday rest at Stitch + lunch (Nishiki graze / Sushiro) = Candice shopping window in the Teramachi/Nishiki arcades',
      '13:30–15:00 — 🐱 Cat Cafe MOCHA Kawaramachi (owed to Kai; 6 min from Stitch) — slides to Day 9/10 if energy is short',
      '15:00–17:15 — Pick one: Higashiyama stone-streets (Kiyomizu → Sannenzaka/Ninenzaka → Imo Pi-pi → Yasaka; Popo taxis to base) OR light Shirakawa/Gion stroll near Sanjo',
      '17:15 — Casual walk-in dinner near Sanjo (Men-ya Inoichi shio ramen, Candice-safe) — no reservation',
      '18:30 — Arrive ART Complex 1928 (Sanjo)',
      '19:00–20:30 — GEAR show',
    ],
    nextDayTeaser: 'Tomorrow → Day 9: takkyubin Leg 3 handoff FIRST (pack 2 days in day-packs), then Nara deer + Todai-ji, back by ~16:00 for kaiseki farewell.',
  },
  {
    n: 9,
    date: '2026-06-06',
    shortDate: 'Sat Jun 6',
    title: 'Nara + Kaiseki',
    cluster: 'Day trip + farewell dinner',
    locked: ['⏰ BEFORE NOON (aim 10:00): hand 3 suitcases to Stitch front desk for takkyubin Leg 3 → Richmond Hotel Narita. MUST go TODAY, not the travel day — next-day delivery only if dropped before ~12:00 (arrives Narita Sun Jun 7 evening). Both room names on the tags. ~¥2,500/bag.'],
    plan: [
      '⚠️ FIRST, before anything: pack 2 days (Jun 6 + Jun 7) of clothes/toiletries/meds into day-packs + overnight tote — main bags are gone until Sun ~6pm in Narita. Grandma\'s carry-on stays with her.',
      '08:00–10:00 — Takkyubin handoff at Stitch front desk (beat the noon cutoff = next-day delivery)',
      'N1 Nara: JR Miyakoji Rapid Kyoto → Nara (~45 min, ¥720)',
      'Nara Park deer + Todai-ji Daibutsu + Naramachi stroll',
      'Back to Kyoto by ~16:00',
      'Kaiseki farewell dinner (book via Stitch concierge: Kikunoi Roan / Kiyamachi Sakuragawa / Giro Giro Hitoshina)',
    ],
    takkyubin: 'Leg 3 (Kyoto → Narita Richmond Hotel), ~¥2,500/bag × 3 — Stitch front desk handles outbound. Drop THIS morning before noon; arrives Narita Jun 7 evening for the ~18:10 check-in. Request the pickup with the front desk the night before; note both room reservation names on the tags.',
  },
  {
    n: 10,
    date: '2026-06-07',
    shortDate: 'Sun Jun 7',
    title: 'Kyoto → Akihabara → Narita',
    cluster: 'Transit + Akihabara stop',
    locked: [
      '12:01 — Shinkansen Nozomi 16 Kyoto → Tokyo (booked; arrive Tokyo 14:15; Car 15, seats 13C/D/E + 14D/E)',
      'JR Narita Line rapid Tokyo → Narita TOWN (~80 min, Suica ~¥1,340/adult) — NOT the NEX (that overshoots to the airport)',
      'Check in Richmond Hotel Narita (3 main suitcases already here via takkyubin Leg 3)',
      'At check-in: book Popo 5:30am taxi at reception',
      '🧳 Retrieve Popo\'s stored bag from JAL ABC, NRT T1 SOUTH WING, THIS EVENING — the 1F counter is open late (06:30 to ~1hr after the last intl flight), so a ~20:00 pickup is comfortable. Do NOT leave it for the morning: her 5:30 taxi arrives ~05:40, the counter opens 06:30, and Scoot check-in closes 07:20 — too tight. Grab it tonight; she takes it in her morning taxi. Confirm the counter on her claim ticket.',
    ],
    momentCards: [
      {
        emoji: '🚶',
        title: 'Akihabara walking route (Electric Town Exit)',
        time: '~14:30–16:45',
        lines: [
          'Bonus: it\'s Sunday — Chūō-dōri is CAR-FREE 13:00–18:00 ("Pedestrian Paradise"), so the whole spine is traffic-free for the kids + grandma (cancelled only in rain).',
          'Everything below is on the west / Electric Town side EXCEPT Yodobashi (east) — save that for last if you want it.',
        ],
        accent: 'accent',
      },
      {
        emoji: '🎁',
        title: '1. Radio Kaikan',
        time: '14:30–15:05',
        lines: ['10 floors of figures + "Gift Shop The Akiba" for souvenirs. AC, condensed — good opener right at the exit.'],
        mapQuery: 'Akihabara Radio Kaikan',
        mapLabel: 'Radio Kaikan',
      },
      {
        emoji: '🎮',
        title: '2. Taito Station — playable games',
        time: '15:05–15:50',
        lines: [
          'Real arcade across B1–5F. For Zara & Kai: 3F driving + light-gun shooters, 5F Taiko no Tatsujin / rhythm games.',
          '1F–2F are the crane / UFO-catcher floors. Bring ¥100 coins (~¥100–200 a play). GiGO nearby is the other big arcade.',
        ],
        mapQuery: 'Taito Station Akihabara',
        mapLabel: 'Taito Station',
      },
      {
        emoji: '🥚',
        title: '3. Gachapon Kaikan',
        time: '15:50–16:10',
        lines: ['500+ capsule machines just off Chūō-dōri — hand the kids coins and let them "earn" their own souvenirs.'],
        mapQuery: 'Akihabara Gachapon Kaikan',
        mapLabel: 'Gachapon Kaikan',
      },
      {
        emoji: '🛒',
        title: '4. Don Quijote Akihabara',
        time: '16:10–16:40',
        lines: ['Snacks, Japan-exclusive KitKats, quirky + grandma gifts, all under one roof. (Yodobashi electronics is across the station, east side, if you want it.)'],
        mapQuery: 'Don Quijote Akihabara',
        mapLabel: 'Don Quijote',
      },
      {
        emoji: '🍲',
        title: '5. Shabu-shabu dinner → back to Tokyo Station',
        time: '~16:45',
        lines: [
          'Pick one (reserve for 5): Mo-Mo-Paradise / Nikuya Yokocho / Onyasai (near station, west) or Tajima-ya (Yodobashi 8F, east — do last).',
          'After dinner: Yamanote 4 min to Tokyo Station, grab bags, JR Narita Line rapid.',
        ],
        accent: 'warn',
      },
    ],
    plan: [
      '⏰ Check out Stitch by 11:00 (window closes 11:00) — store day-bags at front desk',
      'Slow last Kyoto morning: coffee + souvenirs (Kawaramachi / Nishiki); grab the 12:01 from Kyoto Station',
      '~14:15 arrive Tokyo Station → stash light bags in coin lockers (Tokyo Stn = anchor; you return here for the Narita train)',
      '~14:30–16:45 Akihabara — see the walking route above (souvenirs, arcades, gachapon)',
      '🍲 Early shabu-shabu dinner ~16:45 (reserve a table for 5 — CHOOSE ONE LATER): ① Mo-Mo-Paradise Akihabara (AYCE, grade-tiered incl. A5 Kagoshima wagyu; 1 min from stn) ② Nikuya Yokocho (A5 wagyu, 4 broths, semi-private rooms) ③ Shabu Shabu Onyasai (AYCE, tablet ordering, kid-friendly) ④ Tajima-ya (AYCE, in Yodobashi Akiba 8F)',
      'Back to Tokyo Station, grab bags → JR Narita Line rapid → Narita town (~20:00)',
      'Retrieve Popo\'s airport bag tonight (see locked), check in, early night before the 4:45 wake-up',
    ],
  },
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
      '08:20 — Popo NRT→SIN (Scoot TR885) ✓ already gone (grabbed her JAL ABC stored bag, T1 South Wing, on her way)',
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
          'Confirm at the front desk that the 10:40 stops at Terminal 1 (ZIPAIR).',
          'Backup if you miss it: Keisei local ~¥260/10 min, or taxi ~¥2,500/10 min.',
        ],
        accent: 'warn',
      },
      {
        emoji: '💻',
        title: 'Landside camp on T1 · 5F (work / play / shop)',
        time: '~11:00–13:15',
        lines: [
          'Ajay → **IASS Executive Lounge 1** (T1 Central, 5F, 07:00–21:00) — the only IASS lounge reachable now (the nicer NOA is airside, post-security). Free on **CSR Priority Pass** (you + 2 guests; kids may count → worst case one $27 guest). Power + USB + wifi; bags have room here.',
          'Kids → **play space right by the lounge** (tunnels/slides/foam) + tablet quiet-time in the lounge.',
          'Candice → 4F/5F shops + SHIKISAI GARDEN relaxation area.',
          'Lunch ~12:30 on the 5F food court (no-pork options plenty; Jad Thai has GF).',
          'Have the Priority Pass QR open in the app before you walk up. Lounge is small + space-available — 5F food court is the fallback.',
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
        title: 'Airside: Superior Lounge NOA + duty-free + gate',
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
      '~11:00–13:15 — landside camp on 5F: Ajay works (Exec Lounge 1), kids play space + tablets, Candice shops, family lunch',
      '~13:20 — check in + drop 4 bags, North Wing 4F (closes 15:25)',
      '~13:50 — airside: Superior Lounge NOA + duty-free → board ~15:50',
      '16:25 — ZG030 home',
    ],
    timezoneNote: 'Depart 16:25 JST → land SJC 09:40 same calendar day (gain time crossing the dateline). Eastbound: stay up, sleep the last few hours.',
  },
];

// ---------- Packing list ----------
// Master list — referenced from Day -1 and Day 0 pages.
// Edit here when items get added/removed; the page auto-renders.

export type PackingSection = {
  key: string;
  title: string;
  items: string[];
  note?: string;
};

export const PACKING: PackingSection[] = [
  {
    key: 'docs',
    title: '🛂 Documents (carry-on only — never checked)',
    items: [
      'Passports × 5 (all valid 6+ months past Jun 8)',
      'ZIPAIR confs: GE7DVP (family) + F0F2P9 (Popo) — printed + on phone',
      'All 4 lodging conf #s printed (Yotsuya, Rakuten STAY, Stitch Kyoto, Richmond Narita)',
      'teamLab Planets booking screenshot',
      'GEAR Kyoto reservation #8241',
      'Scoot TR 885 confirmation R643SL (Popo\'s SIN onward)',
      'Travel insurance card / policy # if applicable',
      'Cash + cards in primary wallet; backup card in separate bag',
    ],
  },
  {
    key: 'electronics',
    title: '🔌 Electronics',
    items: [
      'Travel adapters × 2 (Type A — same as US; voltage 100V, check chargers)',
      'Portable battery packs × 2 (fully charged)',
      'Charging cables (USB-C × 2, Lightning × 1 for Popo\'s iPhone)',
      'Wall chargers (multi-port preferred)',
      'Phone for each adult; kids share or have own',
      'Tablets for the kids (downloaded shows + games for the flight)',
      'Headphones / earbuds per person (incl. kids)',
      'Camera if bringing (charger + spare battery + SD card)',
    ],
  },
  {
    key: 'clothes',
    title: '👕 Clothes per person',
    note: 'June Tokyo highs ~26°C, lows ~18°C; Hakone evenings cooler; expect rain. Pack for layering.',
    items: [
      'Comfortable walking shoes (broken in — 15–20k steps/day)',
      'Sandals or slip-ons (onsen, lodging, easy on-off at temples)',
      'Light layers: t-shirts + 1–2 long sleeves per person',
      '1 light rain jacket per adult',
      'Underwear + socks for ~5 days (laundry at Stitch Kyoto handles the rest)',
      '1 nicer outfit per person for kaiseki / Fujiya dining',
      'PJs / sleepwear',
      'Swimsuits (Yunessun water park option in Hakone)',
      'Sun hat for the kids',
    ],
  },
  {
    key: 'toiletries',
    title: '🧴 Toiletries (carry-on liquids ≤100ml, the rest checked)',
    items: [
      'Toothbrushes + travel toothpaste',
      'Deodorant',
      'Sunscreen (SPF 30+, reef-safe if visiting beaches)',
      'Insect repellent (kid-safe formulation)',
      'Hand sanitizer + travel tissue (some Japanese bathrooms lack paper)',
      'Prescription meds — ALL in carry-on, never checked, never takkyubin',
      'Pain reliever (ibuprofen / Tylenol) + kid-dose equivalent',
      'Band-aids + small first-aid kit',
      'Contacts + glasses + saline if applicable',
    ],
  },
  {
    key: 'daypack',
    title: '🎒 Day-pack essentials (every transit day)',
    items: [
      'Passport + travel docs',
      'Wallet + cash + IC card (Welcome Suica, bought at NRT Day 1)',
      'Phone + charger + portable battery',
      'Any meds you packed (kid Tylenol, ibuprofen, allergy)',
      'One full change of clothes per person (in case takkyubin bag is delayed)',
      'Toothbrush + small toiletries',
      'Snacks + refillable water bottle',
      'Rain layer',
      'Kid amusement (tablet, book, cards)',
      'Packable foldable tote (Sea-to-Summit Ultra-Sil) — for konbini hauls + souvenirs',
    ],
  },
  {
    key: 'kids',
    title: '👧 Kids (Zara 9, Kai 7)',
    items: [
      'Tablets + headphones + downloaded content for 11h flight',
      'Sticker books, small toys, card games',
      'Snacks they actually like (ZIPAIR sells nothing free)',
      'Spare clothes in the day-pack (spills happen)',
      'Wet-wipes',
      'Comfort item for sleep (small stuffy / blanket)',
    ],
  },
  {
    key: 'japan',
    title: '🗾 Japan-specific extras',
    items: [
      'Foldable umbrella per adult (or buy ¥500 at konbini on arrival)',
      'Slip-on shoes (constant temple/onsen shoe removal)',
      'Cash-friendly mindset — many small places still cash only',
      'Small bag for trash (Japan has very few public bins)',
      'Empty space in suitcase for souvenirs (or plan Don Quijote extra bag)',
    ],
  },
];

export type Lodging = {
  key: string;
  city: string;
  name: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  addressEn: string;
  addressJa?: string;
  phone?: string;
  conf: string;
  pin?: string;
  room?: string;
  notes?: string;

  // Rich detail (populated as host guides become available)
  hostName?: string;
  hostPhone?: string;
  nearestStation?: { name: string; line: string; exit: string; walkMin: number };
  wifi?: { ssid: string; password: string };
  doorCode?: string;        // actual code, when known
  doorCodeNote?: string;    // e.g. "Sent via Airbnb message 1 day before check-in"
  checkInFlow?: string[];   // ordered steps to get from street → in the room
  walkingDirections?: { from: string; steps: { text: string; imageUrl?: string }[] };
  appliances?: { name: string; note: string; imageUrl?: string }[];
  heroImageUrl?: string;
  houseRules?: string[];
  trash?: string[];
  luggageStorage?: string;
  laundromat?: { name: string; addressEn: string; addressJa?: string; walkMin: number; mapsQuery?: string };
  emergencyAddress?: string;  // what to tell 119/110 (local format)
  nearby?: { label: string; note: string; mapsQuery?: string }[];
  guideUrl?: string;          // link back to host's full guest guide
  imageUrls?: string[];       // hero / gallery
};

export const LODGING: Lodging[] = [
  {
    key: 'tokyo',
    city: 'Tokyo',
    name: 'M/W HOTEL 3F by skew lines (Yotsuya 4-chome)',
    nights: 4,
    checkIn: 'Fri May 29, 2026 · 3:00 PM',
    checkOut: 'Tue Jun 2, 2026 · 10:00 AM',
    addressEn: '4 Chome-27-3 Yotsuya, Shinjuku-ku, Tokyo 160-0004 · M/W Hotel 3F (慶愛ビル / Keiai Building)',
    addressJa: '〒160-0004 東京都新宿区四谷4丁目27-3 慶愛ビル M/W Hotel 3階',
    conf: 'HMYZXN9NPB',
    hostName: 'Skew Lines',
    hostPhone: '+81 50-1721-4123',
    nearestStation: { name: 'Shinjuku-gyoenmae', line: 'Marunouchi', exit: 'Exit 2', walkMin: 6 },
    wifi: { ssid: 'elecom2g01-0fee9a', password: '6000776026708' },
    doorCodeNote: 'Sent via Airbnb message ~1 day before check-in (May 28 evening). Add to this entry once received.',
    heroImageUrl: '/img/lodging/tokyo/hero-building-entrance.jpg',
    checkInFlow: [
      'Building entrance is unlocked — walk in. (Photo: see hero shot — "NOT LOCKED" red callout marks the door.)',
      'Elevator to 3rd floor. Room is directly across when you step off.',
      'Small step exiting elevator — watch your footing (especially with bags).',
      'Enter passcode on LOCKSTATE smart lock; door unlocks.',
      'To lock from outside: press the LOCKSTATE button. From inside: turn the knob.',
    ],
    walkingDirections: {
      from: 'Shinjuku-gyoenmae Station, Exit 2 (Marunouchi line)',
      steps: [
        { text: 'Take Exit 2 and turn left.' },
        { text: 'Turn left at the first intersection.' },
        { text: 'Walk along the road.' },
        { text: 'Turn right.' },
        { text: 'Go straight.' },
        { text: 'Keep going straight.' },
        { text: 'Go along the road.' },
        { text: 'Keep on going along the road.' },
        { text: 'Go straight and cross the crosswalk.' },
        { text: 'Turn left at this corner.' },
        { text: 'Go straight.' },
        { text: 'Turn right here.' },
        { text: 'You will find the building on your right.', imageUrl: '/img/lodging/tokyo/walk-13-stairs.jpg' },
        { text: 'Welcome! 🎉', imageUrl: '/img/lodging/tokyo/walk-14-welcome.jpg' },
      ],
    },
    appliances: [
      { name: 'WiFi', note: 'Network + password above. 5G band is in the SSID.' },
      { name: 'Hot water heater', note: 'Keep the boiler ON even when out. DO NOT press お湯はり (auto-fill) — breaks shower hot water.',
        imageUrl: '/img/lodging/tokyo/appliance-boiler.jpg' },
      { name: 'Washlet (toilet)', note: 'Standard Japanese washlet remote — buttons for spray, dryer, lid.',
        imageUrl: '/img/lodging/tokyo/appliance-washlet.jpg' },
      { name: 'Washer-dryer combo', note: 'Wash→dry cycle takes ~5h and cannot be opened mid-cycle. Don\'t overload. For big loads use Laundry Brisk (1 min walk).',
        imageUrl: '/img/lodging/tokyo/appliance-washer.jpg' },
      { name: 'Electric burner', note: 'Hold 電源入/切 (ON/OFF) for 2 sec to power on. Press 加熱入/切 (HEAT) for the desired plate. Use 揚げ物 for frying.',
        imageUrl: '/img/lodging/tokyo/appliance-burner.jpg' },
      { name: 'Microwave', note: 'NO metal, foil, paper bags, or plastic bags. They will explode.',
        imageUrl: '/img/lodging/tokyo/appliance-microwave.jpg' },
      { name: 'Rice cooker', note: 'Add rice + water. Press メニュー until 白米 (white rice). Press 炊飯 (cook). Press 保温/切 to turn off — does NOT auto-off.',
        imageUrl: '/img/lodging/tokyo/appliance-ricecooker.jpg' },
      { name: 'Air conditioner', note: 'Standard remote. Set bedroom + living separately.' },
      { name: 'Smart TV', note: 'Netflix is pre-logged-in — do NOT log out. Broadcast + BS/CS channels also available.',
        imageUrl: '/img/lodging/tokyo/appliance-tv-remote.jpg' },
      { name: 'Intercom', note: '⚠ Do not touch.',
        imageUrl: '/img/lodging/tokyo/appliance-intercom.jpg' },
      { name: 'Breaker', note: 'If it trips (too many appliances), call host — breaker is in kitchen inspection port (host needs to access).',
        imageUrl: '/img/lodging/tokyo/appliance-breaker.jpg' },
    ],
    trash: [
      'Keep trash INSIDE the room — NEVER set it outside the building.',
      'Separate burnable / non-burnable.',
      'Vacation-rental trash is industrial waste; contractor collects after checkout.',
      'For long stays or overflow, message host via reservation site to arrange pickup.',
    ],
    luggageStorage: 'Can leave bags inside the room\'s entrance after 12:00 PM on check-in day. NO post-checkout storage — use Bounce (promo code SKEWLINES = 10% off).',
    laundromat: {
      name: 'Laundry Brisk',
      addressEn: '4-27-2 Yotsuya, Shinjuku-ku, Tokyo 160-0004',
      addressJa: '〒160-0004 東京都新宿区四谷4-27-2',
      walkMin: 1,
      mapsQuery: 'Laundry Brisk 4-27-2 Yotsuya Shinjuku Tokyo',
    },
    emergencyAddress: 'Address to give 119 / 110: 4-27-3 Yotsuya, Shinjuku-ku, Tokyo 160-0004 · Building: 慶愛ビル (Keiai Building), M/W Hotel 3F.',
    nearby: [
      { label: 'Shinjuku-gyoenmae Station Exit 2', note: 'Marunouchi line, 6 min walk', mapsQuery: 'Shinjuku-gyoenmae Station Exit 2' },
      { label: 'Laundry Brisk', note: 'Coin laundry, 1 min walk', mapsQuery: 'Laundry Brisk 4-27-2 Yotsuya' },
    ],
    guideUrl: 'https://docs.google.com/document/d/e/2PACX-1vQ7r8Vj51BJkTiIhf6qZQxZtf9z088kF3Mfeu17U8yNB7ofq02o-iGBZkUf8kFAjmTfIvh0sUhF6jPk/pub',
    notes: 'Self check-in via smart lock. Building unlocked, elevator to 3F. Marunouchi line is the closest (Shinjuku-gyoenmae 6 min); Shinjuku Station 10 min walk for JR.',
  },
  {
    key: 'hakone',
    city: 'Hakone',
    name: 'Rakuten STAY TERRACE Hakone Kowakudani',
    nights: 2,
    checkIn: 'Tue Jun 2, 2026 (afternoon)',
    checkOut: 'Thu Jun 4, 2026 (morning)',
    addressEn: '483-2 Kowakudani, Hakone, Kanagawa, 250-0406, Japan',
    addressJa: '〒250-0406 神奈川県足柄下郡箱根町小涌谷483-2',
    phone: '+81 50-1750-9719',
    conf: '2442810403',
    room: '301',
    pin: '2098',
    doorCode: '2098',
    doorCodeNote: 'Same PIN 2098 for the building entrance (Entrance A = parking lot, B = from Kowakidani Station) AND Room 301. Press E after entering it. Entry allowed from 3 PM only.',
    checkInFlow: [
      'Reach the building (~10-min walk from Kowakudani Station). Use Entrance A (parking lot) or B (from the station) — either door.',
      'Enter PIN 2098, then press E to unlock the entrance.',
      'Go to Room 301. Enter the same PIN 2098, press E to unlock the room.',
      'Inside: go to the living-room tablet → tap "Check-in" → pull up the reservation with your Check-in QR (or booking # 2442810403).',
      'Confirm the details; identity is verified by facial recognition or a quick video call. Done.',
    ],
    notes: 'Self check-in, no front desk. Pre-register guest info before arrival to speed up the tablet step: https://guestbook.stay.rakuten.com/E3ajKVo?code=6395 — save the resulting Check-in QR. Support +81 50-1750-9719.',
  },
  {
    key: 'kyoto',
    city: 'Kyoto',
    name: 'STITCH HOTEL Kyoto — Apartment Suite (2F)',
    nights: 3,
    checkIn: 'Thu Jun 4, 2026 · 3:00 PM – 11:00 PM',
    checkOut: 'Sun Jun 7, 2026 · 6:00 AM – 11:00 AM',
    addressEn: '118, Saito-cho, Shimogyo Ward, Shimogyo-ku, Kyoto 600-8012, Japan',
    addressJa: '〒600-8012 京都府京都市下京区斎藤町118',
    phone: '+81 75-606-4860',
    conf: '6410484352',
    pin: '3605',
    notes: '24h front desk, English-speaking. 2 min walk to Hankyu Kawaramachi + Keihan Gion-Shijo. Front desk handles takkyubin in + out.',
  },
  {
    key: 'narita',
    city: 'Narita',
    name: 'Richmond Hotel Narita',
    nights: 1,
    checkIn: 'Sun Jun 7, 2026 · 2:00 PM',
    checkOut: 'Mon Jun 8, 2026 · 11:00 AM',
    addressEn: 'Narita City (central, walking distance to Omotesando Street + Naritasan)',
    addressJa: '千葉県成田市 — TODO: capture exact address from Expedia receipt',
    conf: 'Trip 1016631380 (Expedia). Room 1 (Ajay, twin+sofa) #2445218331 · Room 2 (Candice, deluxe double) #2445218289',
    notes: 'Book Popo\'s 5:30am taxi to NRT at reception on arrival. ~10 min taxi ~¥2,500 to NRT.',
  },
];

export type Transit = {
  leg: string;
  mode: string;
  date: string;
  duration: string;
  pax: number;
  cost: string;
  status: 'booked' | 'to-book' | 'on-arrival' | 'n/a';
  conf?: string;
  notes?: string;
};

export const TRANSIT: Transit[] = [
  { leg: 'NRT → Shinjuku', mode: 'NEX', date: 'Fri May 29', duration: '~80 min', pax: 5, cost: '~¥13,010', status: 'on-arrival', notes: 'Buy at JR East counter on arrival (combined with Welcome Suica). 3 adult × ¥3,250 + 2 child × ¥1,630.' },
  { leg: 'Shinjuku → Hakone-Yumoto', mode: 'Romancecar', date: 'Tue Jun 2 ~13:00', duration: '~85 min', pax: 5, cost: '~¥12,350', status: 'to-book', notes: 'Window opened May 2. Book at odakyu.jp/english.' },
  { leg: 'Hakone (2 days)', mode: 'Pay-as-you-go (Suica) — Free Pass SKIPPED', date: 'Jun 2–4', duration: '—', pax: 5, cost: '~¥3,000', status: 'n/a', notes: '⛈️ Typhoon Jun 3 suspends ropeway/boats/loop — Free Pass not worth it. Suica covers Romancecar base fare + Tozan/bus.' },
  { leg: 'Odawara → Kyoto', mode: 'Shinkansen Hikari', date: 'Thu Jun 4 ~10:15', duration: '~2h 20m', pax: 5, cost: '~¥65,000', status: 'to-book', notes: 'Hikari only — Nozomi does not stop at Odawara. Smart-EX app.' },
  { leg: 'Kyoto ↔ Nara', mode: 'JR Miyakoji Rapid', date: 'Sat Jun 6', duration: '45 min', pax: 5, cost: '~¥7,200 RT', status: 'to-book', notes: 'Pay with Suica.' },
  { leg: 'Kyoto → Tokyo Station', mode: 'Shinkansen Nozomi', date: 'Sun Jun 7 ~13:45', duration: '~2h 20m', pax: 5, cost: '~¥67,500', status: 'to-book', notes: 'Smart-EX. Book May 7 onward.' },
  { leg: 'Tokyo Station → Narita', mode: 'NEX', date: 'Sun Jun 7 ~16:25', duration: '~60 min', pax: 5, cost: '~¥15,000', status: 'to-book', notes: 'Allow 20-min transfer at Tokyo Station from Shinkansen — use elevators.' },
];

export type Booking = {
  what: string;
  when: string;
  conf?: string;
  status: 'booked' | 'to-book' | 'on-arrival';
  notes?: string;
};

export const BOOKINGS: Booking[] = [
  { what: 'ZIPAIR family RT (SJC↔NRT)', when: 'May 28 / Jun 8', conf: 'GE7DVP', status: 'booked' },
  { what: 'Popo SJC → NRT', when: 'May 28', conf: 'F0F2P9', status: 'booked' },
  { what: 'Popo NRT → SIN', when: 'Mon Jun 8, 08:20', conf: 'R643SL', status: 'booked', notes: 'Scoot TR 885 (Terminal 1)' },
  { what: 'Tokyo lodging (Airbnb Yotsuya)', when: 'May 29 – Jun 2', conf: 'HMYZXN9NPB', status: 'booked' },
  { what: 'Hakone lodging (Rakuten STAY)', when: 'Jun 2 – Jun 4', conf: '2442810403', status: 'booked' },
  { what: 'Kyoto lodging (Stitch Hotel)', when: 'Jun 4 – Jun 7', conf: '6410484352', status: 'booked', notes: 'PIN 3605' },
  { what: 'Narita lodging (Richmond Hotel)', when: 'Jun 7 – Jun 8', conf: '2445218331 + 2445218289', status: 'booked' },
  { what: 'teamLab Planets Tokyo', when: 'Mon Jun 1, 14:00–14:30', conf: '61d3669eb033ddea8a', status: 'booked' },
  { what: 'GEAR Kyoto (non-verbal performance)', when: 'Fri Jun 5, 19:00–20:30', conf: '#8241', status: 'booked', notes: 'ART Complex 1928, Sanjo — confirm address' },
  { what: 'MiPig Café (Harajuku Takeshita)', when: 'Sat May 30, 10:00', status: 'booked', notes: '60-min private room' },
  { what: 'Tokyo Metropolitan Building Night Show (Tochomae)', when: 'Sat May 30, ~19:45–20:15', status: 'on-arrival', notes: 'Free, nightly projection mapping. No booking. Replaces sold-out Shibuya Sky on Day 2.' },
  { what: 'Fujiya Hotel kaiseki (Hakone)', when: 'Jun 2 or Jun 3', status: 'to-book', notes: '~1 month out; smart casual' },
  { what: 'Pontocho dinner (Day 7 arrival)', when: 'Thu Jun 4 evening', status: 'on-arrival', notes: 'Ask Stitch concierge to book' },
  { what: 'Kaiseki farewell dinner (Kyoto)', when: 'Sat Jun 6 evening', status: 'to-book', notes: 'Kikunoi Roan / Kiyamachi Sakuragawa / Giro Giro Hitoshina' },
  { what: 'Popo 5:30am NRT taxi', when: 'Mon Jun 8', status: 'on-arrival', notes: 'Book at Richmond Hotel Narita reception on arrival Jun 7' },
];

export const EMERGENCY = {
  jpEmergency: [
    { what: 'Police', number: '110' },
    { what: 'Fire / Ambulance', number: '119' },
    { what: 'JNTO Tourist Hotline (24/7, English)', number: '+81-50-3816-2787' },
  ],
  embassies: [
    { what: 'U.S. Embassy Tokyo', number: '+81-3-3224-5000', notes: '1-10-5 Akasaka, Minato-ku, Tokyo' },
    { what: 'Singapore Embassy Tokyo', number: '+81-3-3586-9111', notes: 'For Popo' },
  ],
  lodging: [
    { what: 'Rakuten STAY support (Hakone)', number: '+81 50-1750-9719' },
    { what: 'Stitch Hotel Kyoto front desk', number: '+81 75-606-4860' },
  ],
};

export const GRANDMA = {
  name: 'Seck Joo Lee',
  flights: [
    { leg: 'SJC → NRT (with family)', date: 'Thu May 28', conf: 'F0F2P9', status: 'booked' },
    { leg: 'NRT → SIN (solo)', date: 'Mon Jun 8, 08:20', conf: 'R643SL', status: 'booked', notes: 'Scoot TR 885, Terminal 1 (arrives SIN 14:35)' },
  ],
  taxi: {
    when: 'Mon Jun 8, 05:30 AM',
    from: 'Richmond Hotel Narita lobby',
    to: 'Narita International Airport (NRT) Terminal 1',
    cost: '~¥2,500',
    booking: 'Book at hotel reception on Sun Jun 7 evening upon check-in. Reception books taxis routinely; specify: pickup 05:30, solo passenger, 1 bag.',
  },
  notes: [
    'Medications stay in HER carry-on / day-pack at all times. Never in takkyubin, never in checked.',
    'Bilingual medication list — bring printed copy in EN + JP.',
    'Hotel ⇄ NRT is 10 min by taxi. At terminal by 05:40 for 08:20 departure = 2h40 buffer ✓',
  ],
};
