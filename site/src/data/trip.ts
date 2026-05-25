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
    n: 0,
    date: '2026-05-28',
    shortDate: 'Thu May 28',
    title: 'Departure SJC',
    cluster: 'San Jose → Narita',
    confirmation: { code: 'GE7DVP', label: 'ZIPAIR family conf' },
    crossLinks: [
      { href: '/bookings', label: '✈ Bookings' },
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
      title: 'Pre-departure checklist (do tonight + morning of)',
      items: [
        '✅ Bags pre-paid — Value package includes 1 checked bag/pax/direction (4 out + 4 back). No counter action needed.',
        '📱 Online check-in opens 24h before — do Wed May 27 11:40 via zipair.net Manage Booking (conf GE7DVP)',
        '🛂 Passports × 5 in day-packs, not checked',
        '💊 Grandma\'s meds in HER carry-on (never checked, never takkyubin)',
        '📶 eSIMs installed + tested (Airalo/Saily for adults; grandma roaming)',
        '🗺 Google Maps offline downloads: Tokyo, Hakone, Kyoto, Narita',
        '💴 ¥30,000 cash starter (or plan 7-Eleven ATM at NRT — JPY/decline-conversion)',
        '📸 Screenshot all booking confirmations to phone Photos (Wi-Fi-independent backup)',
        '🔌 Travel adapters (Type A; check chargers for 100V)',
        '🔋 Portable battery packs × 2',
        '☔ Foldable umbrella per adult (June rainy season)',
        '📲 Apps installed + signed in: Yamato Kuroneko (EN), Smart-EX, Klook',
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
};

export const LODGING: Lodging[] = [
  {
    key: 'tokyo',
    city: 'Tokyo',
    name: 'Airbnb — Luxury Condo in Shinjuku (Yotsuya 4-chome)',
    nights: 4,
    checkIn: 'Fri May 29, 2026 · 3:00 PM',
    checkOut: 'Tue Jun 2, 2026 · 10:00 AM',
    addressEn: '4-chōme-27-3 Yotsuya, 慶愛ビル 301, Shinjuku-ku, Tōkyō-to 160-0004, Japan',
    addressJa: '〒160-0004 東京都新宿区四谷4丁目27-3 慶愛ビル 301',
    conf: 'HMYZXN9NPB',
    notes: 'Host: Skew Lines (Airbnb). 5–10 min walk to Shinjuku Gyoenmae or Yotsuya-sanchome (Marunouchi line).',
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
