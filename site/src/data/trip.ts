// Curated quick-lookup data for the phone app.
// Source of truth narratives live in Plan_C_Family_of_5/ + bookings/ markdown files.
// Update this file when bookings change.

export const TRIP = {
  start: '2026-05-28',
  end: '2026-06-08',
  travelers: ['Ajay', 'Candice', 'Zara (9)', 'Kai (7)', 'Grandma (Seck Joo Lee, 75)'],
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
  timezoneNote?: string;
  nextDayTeaser?: string;
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
        '💊 Grandma: print bilingual medication list (EN + JP via Google Translate). Paper, in her carry-on.',
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
      'Grandma: separate conf F0F2P9, same flight, seat 51H.',
    ],
    prep: {
      title: 'Morning-of checklist (only last-mile items — wifi/install/shopping was Day -1)',
      items: [
        '✅ Bags pre-paid — 1 checked bag/pax/direction included in Value package. No counter scramble.',
        '✅ Online check-in done last night — if not, do it NOW (need it before counter close)',
        '🛂 Passports × 5 in day-packs (not checked)',
        '💊 Grandma\'s meds in HER carry-on',
        '📶 Google Fi covers Japan — just power on after landing. Grandma\'s carrier handles her own roaming.',
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
      { href: '/lodging/tokyo', label: '🏠 Yotsuya — wifi, door, directions' },
      { href: '/bookings', label: '✈ Bookings' },
      { href: '/emergency', label: '🆘 Emergency' },
    ],
    locked: [
      '14:50 — Land NRT T1 (ZG029, row 51)',
      '~16:00–17:20 — NEX → Shinjuku (~80 min, ¥16,250 × 5)',
      '~17:30 — Airbnb self check-in (Yotsuya 4-chome)',
    ],
    plan: ['Light dinner near hotel — ramen, konbini, or Yotsuya izakaya', 'Sleep. Jet lag day, do nothing more.'],
  },
  {
    n: 2,
    date: '2026-05-30',
    shortDate: 'Sat May 30',
    title: 'Harajuku → Shibuya',
    cluster: 'Harajuku + Omotesando + Shibuya (one walking arc)',
    locked: ['MiPig Café — 60 min private room (Harajuku)', 'Shibuya Sky sunset (~18:00–18:30; sunset 18:55)'],
    plan: [
      'AM (M1): MiPig → Takeshita St (P2) → Meiji Jingu Gaien Ginkgo (P2) → Omotesando → Maisen tonkatsu lunch',
      'PM: Rest at Yotsuya. Optional Cinnamoroll Café (P1, near Shinjuku Gyoen) on the walk home.',
      'Sunset (E1): Pokémon Center Shibuya + Nintendo Tokyo + Shibuya Sky + Shibuya Scramble after dark',
      'Dinner: Kaikaya by the Sea (reserve) or Gyopao Gyoza for kids',
    ],
  },
  {
    n: 3,
    date: '2026-05-31',
    shortDate: 'Sun May 31',
    title: 'Asakusa → Skytree → Ikebukuro',
    cluster: 'East Tokyo arc',
    locked: [],
    plan: [
      'AM (M3): Kaminarimon + Nakamise (P1) + Senso-ji (P1) + Hoppy Street (P1) + Kappabashi Kitchen Town (P4)',
      'Lunch: Asakusa Imahan sukiyaki or Daikokuya Tempura. Funawa Nakamise (P6) for imo-yokan dessert.',
      'PM: Skytree (P6) + Sumida Aquarium (P6 combo ticket)',
      'Evening (E3): Pokémon Center MEGA TOKYO + Gashapon Ikebukuro (P4) + Sunshine City Sky Circus',
      'Dinner: Mutekiya tonkotsu ramen (Ikebukuro)',
    ],
  },
  {
    n: 4,
    date: '2026-06-01',
    shortDate: 'Mon Jun 1',
    title: 'Tsukiji → teamLab → Shinjuku',
    cluster: 'South-then-home loop',
    locked: ['teamLab Planets Toyosu — entry 14:00–14:30 (inquiry 61d3669eb033ddea8a)', 'Drop takkyubin Leg 1 tonight'],
    plan: [
      'AM (M2): Tsukiji Outer Market food crawl + Turret Coffee (P6). Arrive 9am.',
      '13:00: Toei Oedo Tsukijishijo → Shin-Toyosu (~15 min)',
      '13:45 → teamLab Planets',
      'Late PM: optional Ginza window stop + Sembikiya Fruit Parlor (P6)',
      'Evening (E6): Omoide Yokocho yakitori (P1) + Tokyo Metropolitan Building Night Show (P1) + walk home',
    ],
    takkyubin: 'Drop Leg 1 (Tokyo → Hakone) at Lawson/7-Eleven near Yotsuya tonight',
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
      'At check-in: book grandma 5:30am taxi at reception',
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
      '05:30 — Grandma pre-booked taxi → NRT (10 min, ~¥2,500)',
      '08:20 — Grandma NRT → SIN',
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
      'ZIPAIR confs: GE7DVP (family) + F0F2P9 (grandma) — printed + on phone',
      'All 4 lodging conf #s printed (Yotsuya, Rakuten STAY, Stitch Kyoto, Richmond Narita)',
      'teamLab Planets booking screenshot',
      'GEAR Kyoto reservation #8241',
      'Scoot TR 885 confirmation R643SL (grandma\'s SIN onward)',
      'Bilingual medication list for grandma (EN + JP)',
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
      'Charging cables (USB-C × 2, Lightning × 1 for grandma\'s iPhone)',
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
      'Medications (especially grandma\'s)',
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
    heroImageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg37UEQ0lzW8quw1aBRypWPvlMHZJpBa8dw_UdG0PQNcKsLzjgNpQqYmjigPnAk1zzRP_4IBJCL5YymGuRQFxjlTUm11uRXmxbPtoZW7Yr82eHrAkdlxJ_aKMqIM6MgIlVSuW45QbNg8mxkq=s2048',
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
        { text: 'You will find the building on your right.', imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg3mTpbWHgQv9rBLf9GDW6gt4ZSyLA7x8XHkxPmdhbmhd55ijelJRCGoYbDesUowW6mGgc2THqKugKemA8qMUmK7b0yhr3mycPV2YuH_yMSgm-AF1_yiA_lSO5gzcJJY3t1twB52iklOwbkq6E233Fdhyhh3F675GKpysw=s2048' },
        { text: 'Welcome! 🎉', imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2jmvH4N14iBY-ux_PlTXktncUSl_ckXGrQ2pr6N4UnmFHxLv3g9UhtipfO0tWrh-EJL5FjY2WBRw4waH-xeyb3Ab2aSqzO8mK5mgnETEdbGZsKWSS5lAfKANVbvOgbulOD5CcBcZMztGwlLsI=s2048' },
      ],
    },
    appliances: [
      { name: 'WiFi', note: 'Network + password above. 5G band is in the SSID.' },
      { name: 'Hot water heater', note: 'Keep the boiler ON even when out. DO NOT press お湯はり (auto-fill) — breaks shower hot water.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg0Nmbzw5zgLbNj_oPsO27nGpvwZlCzr3knZ2Wqc-sZuZdB163D1li3d6yI27ZbBllB9Q058WsEQaqwQfr926rdLDY2DWHSkUTujmcuEg50GozAqsft4gXGvcZP60txFTRtl5sSgG6Dx9UL8_O0=s2048' },
      { name: 'Washlet (toilet)', note: 'Standard Japanese washlet remote — buttons for spray, dryer, lid.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg0ljujoLHIXd18YpLTcFbpOLUffO32q43oD0hDSgxFQZKm1dbMpqUR389SZiTroaA57XNqEWU20MObnpZWIZO8vvuq_uVm6fBr_wqJnPew2Ej8pvWyaxea8TnuwKvLPvrTp78O505ZemucnTNE=s2048' },
      { name: 'Washer-dryer combo', note: 'Wash→dry cycle takes ~5h and cannot be opened mid-cycle. Don\'t overload. For big loads use Laundry Brisk (1 min walk).',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2AAfzX6MS3d7VpJSMc8PRdyiBNi8nWhNPKmdGvi9PkKN09SvECZOUJO8cf8_4gDLYRVA9Q9QZUrAS_8CvL6826OKngdExLl1NQzO6PIntkpyc7az2GH-9Sw1Y48ljK9U9XHb99yhAoDVuAq2E=s2048' },
      { name: 'Electric burner', note: 'Hold 電源入/切 (ON/OFF) for 2 sec to power on. Press 加熱入/切 (HEAT) for the desired plate. Use 揚げ物 for frying.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2UgcivKXGiV_59ZGiobpGEvTj1BUe0wzV1hZ8usmQNVPf4laTLe1qN1z6bVoi99xzA1Trg3fPMTcGrnPf1zZk_8o26VCiKdw1nUJbvDNopKVR5YfmHZtmkDKb9Tfq5teoA0XP6BJr8Y8XW=s2048' },
      { name: 'Microwave', note: 'NO metal, foil, paper bags, or plastic bags. They will explode.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2N5nX21YRx5j-piHma1YvFeZYegzqhkrevMJ2Buvx-AtV2eckIy06FOW0t4uwyw0lbkCKoD3Yj2gbGIOdvErDrksQ42w2dljWxSRIAoFsYRDmwWx3ya-u4zxc2h5q7Mg5wN55uehzSHvstVD8=s2048' },
      { name: 'Rice cooker', note: 'Add rice + water. Press メニュー until 白米 (white rice). Press 炊飯 (cook). Press 保温/切 to turn off — does NOT auto-off.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2aM-wCWc9E1g2xVQcptAlsPbV7WQzZsbXcK-BP85zpkrku5ZkYP4pH4duHsaRh_e2t8hGsETRiMPBhed_Sqd_saeChZcCeIKfTNKP7B3QVPrUfHOYIfx_96rRHHXqIo9gsiXsn4qljM1YWUXY=s2048' },
      { name: 'Air conditioner', note: 'Standard remote. Set bedroom + living separately.' },
      { name: 'Smart TV', note: 'Netflix is pre-logged-in — do NOT log out. Broadcast + BS/CS channels also available.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg0JGr2uR7pJrezXkT2PLwNzA4Ry_bPkF6NhB4Q8eTfrdyQ4wDEGNwm6E9ScNtjq6p9GjgA1F3XcO_uP7bbkAbNNzMzH3eAPwRQjDzTf79tIp35P7hDfpYB1cmjHSRwWfUziJaSzxVUWoDNg=s2048' },
      { name: 'Intercom', note: '⚠ Do not touch.',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg0Z4JWDkQ1FNBWarwHNnaqg76Ecz2-V0Vq3t-WeHJPFH9NwvRsbG0AP__ISc0BPbpzDo1JLOnLANjj-FOUKLoYew97mgM4SvNEJeu1un5DbBa0jHU9kMEFVYmLERkx4c2ZqJChsRbOfbqeTeO4=s2048' },
      { name: 'Breaker', note: 'If it trips (too many appliances), call host — breaker is in kitchen inspection port (host needs to access).',
        imageUrl: 'https://docs.google.com/docs-images-rt/ABaEjg2WZm7kOG-oQX3Ui7y_vW_F0mQg0WaVYjib6YIGwrjbMinTCRhhoGasxIoXM74yYzQghRSPIYsQrrRjc5D61fwSp8hQNM9pq7LxovaAgjIjHGqHqJGBI4NKwB_Ah7LiKlwB87FLilVhnXKyiFg=s2048' },
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
    notes: 'Book grandma\'s 5:30am taxi to NRT at reception on arrival. ~10 min taxi ~¥2,500 to NRT.',
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
  { leg: 'NRT → Shinjuku', mode: 'NEX', date: 'Fri May 29', duration: '~80 min', pax: 5, cost: '~¥16,250', status: 'to-book', notes: 'Reserved seats × 5. Buy at NRT counter on arrival or pre-book.' },
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
  { what: 'Grandma SJC → NRT', when: 'May 28', conf: 'F0F2P9', status: 'booked' },
  { what: 'Grandma NRT → SIN', when: 'Mon Jun 8, 08:20', status: 'booked', notes: 'Details still to capture in bookings/flights.md' },
  { what: 'Tokyo lodging (Airbnb Yotsuya)', when: 'May 29 – Jun 2', conf: 'HMYZXN9NPB', status: 'booked' },
  { what: 'Hakone lodging (Rakuten STAY)', when: 'Jun 2 – Jun 4', conf: '2442810403', status: 'booked' },
  { what: 'Kyoto lodging (Stitch Hotel)', when: 'Jun 4 – Jun 7', conf: '6410484352', status: 'booked', notes: 'PIN 3605' },
  { what: 'Narita lodging (Richmond Hotel)', when: 'Jun 7 – Jun 8', conf: '2445218331 + 2445218289', status: 'booked' },
  { what: 'teamLab Planets Tokyo', when: 'Mon Jun 1, 14:00–14:30', conf: '61d3669eb033ddea8a', status: 'booked' },
  { what: 'GEAR Kyoto (non-verbal performance)', when: 'Fri Jun 5, 19:00–20:30', conf: '#8241', status: 'booked', notes: 'ART Complex 1928, Sanjo — confirm address' },
  { what: 'MiPig Café (Harajuku)', when: 'Sat May 30', status: 'to-book', notes: '60-day window — book this week' },
  { what: 'Shibuya Sky (sunset)', when: 'Sat May 30, ~18:00–18:30', status: 'to-book', notes: 'Mid-May window' },
  { what: 'Fujiya Hotel kaiseki (Hakone)', when: 'Jun 2 or Jun 3', status: 'to-book', notes: '~1 month out; smart casual' },
  { what: 'Pontocho dinner (Day 7 arrival)', when: 'Thu Jun 4 evening', status: 'on-arrival', notes: 'Ask Stitch concierge to book' },
  { what: 'Kaiseki farewell dinner (Kyoto)', when: 'Sat Jun 6 evening', status: 'to-book', notes: 'Kikunoi Roan / Kiyamachi Sakuragawa / Giro Giro Hitoshina' },
  { what: 'Grandma 5:30am NRT taxi', when: 'Mon Jun 8', status: 'on-arrival', notes: 'Book at Richmond Hotel Narita reception on arrival Jun 7' },
];

export const EMERGENCY = {
  jpEmergency: [
    { what: 'Police', number: '110' },
    { what: 'Fire / Ambulance', number: '119' },
    { what: 'JNTO Tourist Hotline (24/7, English)', number: '+81-50-3816-2787' },
  ],
  embassies: [
    { what: 'U.S. Embassy Tokyo', number: '+81-3-3224-5000', notes: '1-10-5 Akasaka, Minato-ku, Tokyo' },
    { what: 'Singapore Embassy Tokyo', number: '+81-3-3586-9111', notes: 'For grandma' },
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
    { leg: 'NRT → SIN (solo)', date: 'Mon Jun 8, 08:20', conf: '—', status: 'booked', notes: 'Airline + flight # still to capture' },
  ],
  taxi: {
    when: 'Mon Jun 8, 05:30 AM',
    from: 'Richmond Hotel Narita lobby',
    to: 'Narita International Airport (NRT), terminal TBC',
    cost: '~¥2,500',
    booking: 'Book at hotel reception on Sun Jun 7 evening upon check-in. Reception books taxis routinely; specify: pickup 05:30, solo passenger, 1 bag.',
  },
  notes: [
    'Medications stay in HER carry-on / day-pack at all times. Never in takkyubin, never in checked.',
    'Bilingual medication list — bring printed copy in EN + JP.',
    'Hotel ⇄ NRT is 10 min by taxi. At terminal by 05:40 for 08:20 departure = 2h40 buffer ✓',
  ],
};
