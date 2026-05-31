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
        '💬 **Message Stitch (Booking.com) BEFORE shipping** to confirm they\'ll hold both suitcases Jun 2→Jun 4 under res `6410484352`. If they decline, ship to the fallback (Lawson Shijo-Karasuma, ~3 min from Stitch).',
        '🧳 **Pack the 2 big suitcases** (Ajay + Kai\'s clothes / Candice + Zara\'s clothes) for shipping. **Deploy the overnight tote** with 2 days of Hakone clothes + toiletries for the four of you. Popo keeps her 20" carry-on.',
        '⚠️ **Day-packs keep:** passports, all meds, 1 full change of clothes each, electronics, kid tablets — never in the shipped bag.',
        '🚫 **No NEX-to-Narita booking needed** — that got replaced by the JR Sobu Rapid. Ignore the old todo.',
      ],
    },
    momentCards: [
      {
        emoji: '🧳',
        title: 'Ship the bags to Kyoto — Lawson near Yotsuya',
        time: 'morning, on your way out',
        lines: [
          'Walk the 2 suitcases ~5 min to the **Lawson** by the Airbnb; counter staff fills the form (or use the Yamato app QR label).',
          '**Ship to:** STITCH HOTEL Kyoto · 118 Saito-cho, Shimogyo-ku, Kyoto 600-8012 · +81 75-606-4860. ~¥5,000 for 2 bags.',
          '**Timing is relaxed** — bags only need to land by your Jun 4 check-in, so even a 2-day delivery is fine. But dropping on the way out means **hands-free all day**. Do it first.',
          'Popo\'s carry-on stays with her. You and the kids carry day-packs + the overnight tote from here to Hakone tomorrow.',
        ],
        mapQuery: 'Lawson Yotsuya 4-chome Shinjuku',
        mapLabel: 'Lawson near Airbnb',
        accent: 'warn',
      },
      {
        emoji: '☕',
        title: 'Easy morning (optional Odaiba)',
        time: '~10:00–12:30',
        lines: [
          'With the bags shipped, keep the morning light — teamLab at 14:00 is the day\'s big event and you want the kids fresh.',
          '**Optional:** head to **Odaiba** early — **Miraikan** science museum (P6, robotics + space, opens 10:00) and/or the life-size **Unicorn Gundam** at DiverCity. It\'s the same waterfront as teamLab, so it flows.',
          'Or just a slow café morning near Yotsuya and head straight to Toyosu for lunch. No pressure.',
        ],
        mapQuery: 'Miraikan Odaiba',
        mapLabel: 'Miraikan',
      },
      {
        emoji: '🍱',
        title: 'Lunch near Toyosu, then to teamLab',
        time: '~12:30–13:45',
        lines: [
          'Lunch at **DiverCity Tokyo Plaza** food court (Odaiba) or near Toyosu.',
          'To teamLab: **Yurikamome → Shin-Toyosu** (from Odaiba/Telecom Center ~16 min, ¥330), or Yurakucho line → Toyosu → 1 stop Yurikamome to Shin-Toyosu.',
          'Aim to be at **Shin-Toyosu by ~13:45**.',
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
      'Morning: reply Rakuten email + confirm Stitch holds bags → pack & ship 2 suitcases to Kyoto from the Lawson → easy morning (optional Miraikan/Odaiba).',
      'Lunch near Toyosu → teamLab Planets (LOCKED 14:00, be there 13:45, rollable pants).',
      'Dusk: Shibuya Crossing (arcade/gachapon fix at GiGO + Don Quijote) → Shinjuku.',
      'Evening: Omoide Yokocho yakitori → Tochomae TOKYO Night & Light show → home Yotsuya.',
    ],
    takkyubin: 'Ship Leg 1 (Tokyo → Kyoto direct, 2 suitcases) from the Lawson near Yotsuya — confirm Stitch holds them Jun 2→Jun 4 first',
    nextDayTeaser: 'Tomorrow → Day 5: Tokyo → Hakone. Day-packs + overnight tote only (big bags already gone to Kyoto). Leave Yotsuya ~12:30 · Hakone Free Pass at Shinjuku · Romancecar 13:20.',
  },
  {
    n: 5,
    date: '2026-06-02',
    shortDate: 'Tue Jun 2',
    title: 'Tokyo → Hakone',
    cluster: 'Transit',
    locked: [
      '~13:00 — Romancecar Shinjuku → Hakone-Yumoto (~85 min, ~¥12,350)',
      'Buy Hakone Free Pass × 5 (2-day) at Yumoto Odakyu Travel Service Center',
      'Tozan Yumoto → Kowakudani (~25 min)',
      'Self check-in Rakuten STAY TERRACE (use online check-in URL from Rakuten email)',
    ],
    plan: ['Pack-and-depart morning', 'Settle in afternoon — Family Mart trip, kitchen unit', 'Dinner: self-catered or local Kowakudani izakaya'],
  },
  {
    n: 6,
    date: '2026-06-03',
    shortDate: 'Wed Jun 3',
    title: 'Hakone Full Day',
    cluster: 'Classic Loop + Open Air Museum',
    locked: ['Drop takkyubin Leg 2 tonight'],
    plan: [
      'H1 Classic Loop: Kowakudani → Gora → Cable Car → Ropeway (P1) → Owakudani (P1) → Lake Ashi pirate ship → Moto-Hakone → Hakone Shrine 20-min walk-up (P2) → bus back',
      'Lunch: Hatsuhana Honten soba or lakeside',
      'PM: H2 Open Air Museum (P1) — 2 stops from Gora, ~2h, Symphonic Sculpture net for kids',
      'Evening: Fujiya Hotel kaiseki if booked, else self-catered + Family Mart',
    ],
    takkyubin: 'Drop Leg 2 (Hakone → Kyoto) at Lawson Kowakudani tonight',
  },
  {
    n: 7,
    date: '2026-06-04',
    shortDate: 'Thu Jun 4',
    title: 'Hakone → Kyoto',
    cluster: 'Transit + Nijo + Gion',
    locked: [
      '~09:00 — Self check-out, Tozan → Yumoto → Odawara',
      '~10:15 — Shinkansen Hikari Odawara → Kyoto (~2h 20m, ~¥65,000)',
      '~12:35 — Arrive Kyoto, subway/walk to Stitch (10 min)',
    ],
    plan: [
      '13:00 — Drop bags at Stitch front desk, lunch',
      '14:30–16:30 — K6 Nijo Castle (P1, last entry ~16:00 — confirm)',
      '17:00 — Stitch formal check-in',
      'Evening (KE1): Hanamikoji → Shirakawa Canal → Pontocho',
      'Dinner: Pontocho alley (P1 — ask Stitch concierge to book on arrival)',
    ],
  },
  {
    n: 8,
    date: '2026-06-05',
    shortDate: 'Fri Jun 5',
    title: 'Fushimi + Higashiyama + GEAR',
    cluster: 'South sunrise → East afternoon → GEAR evening',
    locked: ['GEAR non-verbal performance 19:00–20:30 (res #8241, ART Complex 1928 Sanjo)'],
    plan: [
      '06:30 — K1 Fushimi Inari sunrise (Keihan Gion-Shijo → Inari direct, 15 min, no transfers)',
      '~10:00 — Back to Stitch, rest, kitchen breakfast',
      '14:00–17:30 — K5 Higashiyama Stone-Streets Walk: Kiyomizu-dera (P1) → Sannenzaka + Ninenzaka (P1) → Imo Pi-pi (P3) → Yasaka Shrine → Gion',
      '18:00 — Early dinner Pontocho/Kiyamachi (close to GEAR)',
      '19:00 — GEAR show',
    ],
  },
  {
    n: 9,
    date: '2026-06-06',
    shortDate: 'Sat Jun 6',
    title: 'Nara + Kaiseki',
    cluster: 'Day trip + farewell dinner',
    locked: ['Hand bags to Stitch front desk for takkyubin Leg 3 (Kyoto → Narita) — pack 2 days of essentials in day-pack'],
    plan: [
      'Morning: takkyubin handoff first',
      'N1 Nara: JR Miyakoji Rapid Kyoto → Nara (~45 min, ¥720)',
      'Nara Park deer + Todai-ji Daibutsu + Naramachi stroll',
      'Back to Kyoto by ~16:00',
      'Kaiseki farewell dinner (book via Stitch concierge: Kikunoi Roan / Kiyamachi Sakuragawa / Giro Giro Hitoshina)',
    ],
    takkyubin: 'Leg 3 (Kyoto → Narita Richmond Hotel) — Stitch front desk handles, hand bags this morning',
  },
  {
    n: 10,
    date: '2026-06-07',
    shortDate: 'Sun Jun 7',
    title: 'Kyoto → Narita',
    cluster: 'Transit + Narita unagi',
    locked: [
      '~13:45 — Shinkansen Nozomi Kyoto → Tokyo (~2h 20m, ~¥67,500)',
      '~16:05–16:25 — Tokyo Station transfer to NEX (allow 20 min)',
      '~16:25–17:30 — NEX Tokyo → Narita',
      '~17:50 — Check in Richmond Hotel Narita',
      'At check-in: book Popo 5:30am taxi at reception',
      'Dinner: Kawatoyo Honten unagi farewell — arrive 18:30',
    ],
    plan: [
      'Slow Kyoto morning: coffee, souvenirs',
      'Check out Stitch ~13:00',
      'Buy ekiben at Kyoto Station before boarding',
    ],
  },
  {
    n: 11,
    date: '2026-06-08',
    shortDate: 'Mon Jun 8',
    title: 'Departure',
    cluster: 'Split day',
    locked: [
      '05:30 — Popo pre-booked taxi → NRT (10 min, ~¥2,500)',
      '08:20 — Popo NRT → SIN',
      '16:25 — Family ZG030 NRT → SJC',
      '09:40 — Family lands SJC (gain time crossing dateline)',
    ],
    plan: [
      'Family AM: hotel breakfast, optional Naritasan Park walk',
      'Check out by 11:00',
      '~13:00 — Taxi or Keisei to NRT',
      '~13:30 — At NRT for 16:25 ZG030 (ZIPAIR check-in closes 15:25)',
    ],
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
    notes: 'Self check-in, no front desk. Reply to confirmation email with email in address(AT)mail(DOT)com format to receive check-in URL.',
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
  status: 'booked' | 'to-book';
  conf?: string;
  notes?: string;
};

export const TRANSIT: Transit[] = [
  { leg: 'NRT → Shinjuku', mode: 'NEX', date: 'Fri May 29', duration: '~80 min', pax: 5, cost: '~¥13,010', status: 'on-arrival', notes: 'Buy at JR East counter on arrival (combined with Welcome Suica). 3 adult × ¥3,250 + 2 child × ¥1,630.' },
  { leg: 'Shinjuku → Hakone-Yumoto', mode: 'Romancecar', date: 'Tue Jun 2 ~13:00', duration: '~85 min', pax: 5, cost: '~¥12,350', status: 'to-book', notes: 'Window opened May 2. Book at odakyu.jp/english.' },
  { leg: 'Hakone (2 days)', mode: 'Hakone Free Pass 2-day', date: 'Jun 2–4', duration: '—', pax: 5, cost: '~¥30,500', status: 'to-book', notes: 'Buy on arrival at Yumoto Odakyu Travel Service Center.' },
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
