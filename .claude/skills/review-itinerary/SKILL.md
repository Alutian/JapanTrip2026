---
name: review-itinerary
description: Evaluate a single day-by-day page of the Japan 2026 trip companion site (alutian.github.io/JapanTrip2026) for usability, factual accuracy, completeness, and self-sufficiency. Use when the user wants a critique of one or more day pages, or wants to know whether the site can carry them through a specific day without consulting any other source. Produces structured findings ready to translate into concrete edits.
---

# Review one day of the trip site

The goal of this site is a **complete, essential travel companion**: Ajay + Candice land jet-lagged with no memory of the planning, open the site on their phone, and the day's page carries them through. They should rarely have to ask "babes, what was the plan for…" or open another doc.

This skill produces a critique of one day page (e.g. `/days/1`) by comparing what's rendered against what's true, then judging whether what's rendered is enough.

## Inputs

- **Day number** (1–11). Maps to a date — Day 1 = Fri May 29; Day 11 = Mon Jun 8.
- **Optional voice/persona** — if invoked from a specific persona (e.g. Candice), keep that voice in the output. Default voice: blunt practitioner.

## Source-of-truth hierarchy

Always check facts against these, in this order — the site is supposed to summarize them, not contradict them:

1. **`Plan_C_Family_of_5/itinerary.md`** — day-by-day master plan (LOCKED + FLEXIBLE per day).
2. **`Plan_C_Family_of_5/transportation.md`** — bags, takkyubin, transit details, reservations critical path, Day-5 / Day-7 / Day-10 step-by-step tables.
3. **`Plan_C_Family_of_5/todos.md`** — outstanding tasks, booking-window deadlines, on-arrival tasks. **Status of bookings is here.**
4. **`Plan_C_Family_of_5/decisions.md`** — recorded decisions (cuts, swaps, why-this-not-that).
5. **`Plan_C_Family_of_5/food.md`** — restaurant ranking + meal plan.
6. **`bookings/*.md`** — confirmation numbers, addresses, room/seat assignments, PINs, check-in codes.
7. **`Plan_C_Family_of_5/wishlist/*`** — Candice's ranked P1–P6 wishlist by city.

If two source files contradict each other, that itself is a finding — flag it.

## Procedure

### 1. Capture what's rendered

Use playwright (or fetch via curl + parse, if browser tools unavailable):

```
mcp__playwright__browser_navigate → https://alutian.github.io/JapanTrip2026/days/<N>
mcp__playwright__browser_snapshot
```

If a token gate blocks you, the URL form `…/days/<N>/?k=7N3X9-RK8M-2QPLDC-7FH4` will pass it.

Also note what's in the global nav (Today / Hotels / Bookings / SOS) — those are the only other clicks available from this page.

### 2. Pull source-of-truth for the same day

```bash
awk '/^## Day <N> /,/^## Day <N+1> /' Plan_C_Family_of_5/itinerary.md
```

Then `grep` the other source files for cross-references to the same date (e.g. `grep -n "Jun 2\|Day 5" Plan_C_Family_of_5/transportation.md bookings/*.md`).

### 3. Apply the checklist

Score each dimension as **OK / Weak / Broken** with one-line evidence. Don't pad — if it's OK, say OK.

**A. Factual accuracy** (Broken-level findings are critical)
- Every locked time matches the source? (flight #, train, restaurant time)
- Every cost number matches? (`¥X × 5` vs `¥X total for 5` ambiguity is a recurring trap)
- Every booking status matches todos.md? (no "Book NEX" on the page if todos.md says "buy on arrival, decided")
- Every named place matches the source spelling/identity? (e.g. "Yotsuya 4-chome" not "Yotsuya 3-chome")
- Any contradictions between this page and the bookings/ confirmations? (seat numbers, addresses, control numbers, PINs)

**B. Self-sufficiency at the moment** (would a tired/anxious traveler get through the day from this page alone?)
- The **first action of the day** is clear and actionable, with everything needed to do it (location, what to ask for, what to show, what to pay with)?
- Each subsequent step has enough specificity that no out-of-band lookup is needed?
- Addresses, codes, PINs, reservation numbers are *on the page or one tap away* (e.g. linked from the page to /lodging or /bookings)?
- Any required documents/items (passports for child fare, Welcome Suica top-up cash, etc.) are surfaced where they'll be used, not buried in a prep doc?

**C. Critical-path actions surfaced** (the "if this isn't done, the day breaks" stuff)
- One-time-only tasks called out (e.g. "ask Richmond reception for 5:30 taxi *tonight*")?
- Today's booking-window openings (some pre-trip days have these, e.g. May 4 Shinkansen window)?
- Any "by 12:00 noon" cutoffs (takkyubin drops) clearly time-anchored?

**D. Backup paths / friction points**
- For each high-risk moment (NEX sold out, ZIPAIR delayed, kids fading, restaurant queue), is there a fallback or does the page assume happy-path?
- Known frictions named in the source (e.g. "Tokyo Station NEX transfer is the friction point") preserved on the rendered page?

**E. Pace + family realism**
- Day's load fits the energy state expected? (Day 1 = jet lag → page should reflect "do nothing more")
- Kid touchpoints surfaced where kids will actually be the bottleneck (food, bathroom, nap, tantrum-risk windows)?
- Grandma is *included* not *managed around* — page acknowledges her presence without making her the problem.

**F. Information architecture**
- The visual sections (Locked / Plan / etc.) carry real meaning consistently across days, or are they just decoration?
- Emojis adding info or noise?
- Are links useful (Day 2 →, Full itinerary doc →) or dead-ends?
- Does anything on the page belong in /lodging, /bookings, /emergency instead — or vice versa?
- **Entry-point routing — load `/` and `/today` and confirm each lands at the right day given the current date.** This includes: the home-page hero card pointing at the right `n`, the "We just landed" / arrival-day banner triggering on the right date, the today-route auto-redirect resolving to the day under review. Routing changes when Day N is added/removed/renumbered, so re-verify here every time. Off-by-one bugs (e.g. home still hardcoded to `/days/1` after Day 0 was added) hide in these spots and the day page itself can pass while the entry-point is broken.
- **Cross-page collaboration — if the day touches a lodging, transit, or booking that has a dedicated detail page (`/lodging/<key>`, `/packing`, `/bookings`), the day page must cross-link to it and NOT duplicate the detail.** Conversely, if rich detail exists only on the day page that other pages would want (door codes, walking directions, host phone), it should live on the dedicated page and be referenced from the day. Audit both directions.

**G. Drift risk**
- Anything on the page referencing a state that no longer matches main (cancelled steps, old prices, replaced restaurants)?
- "TBD" / "to book" items that have since been booked elsewhere?

**H. What's *missing* entirely** (most important; the things a traveler would Cmd-F for and not find)
- Address of the lodging
- Wifi / check-in code / lockbox / front-desk hours
- Phone number for the host or hotel
- Where on this huge airport the JR East Travel Service Center actually is
- How to pay (cash vs card; minimum cash to carry)
- Emergency contact for the day
- What time the *next day* starts and what to pre-load tonight

**J. Temporal feasibility & day-scoping** (the silent failure mode — a checklist item that *cannot actually be done on this day* makes the whole page lie to you)
- Walk every prep / checklist item and ask: *given this day's constraints (location, time pressure, available wifi, what's still packed vs. used), can a tired traveler actually complete this here?*
- **Pre-trip prep days (Day -N)** exist for items that need wifi, time, or shopping: offline map downloads, app installs + signin, eSIM provisioning, cash exchange, paper backups, screenshot dumps, bilingual translation, ordering anything that ships.
- **Day 0 / departure-day** should hold only **last-mile, morning-of items**: final bag weigh, leave-house, verify bags-pre-paid, get to airport, online check-in if not already done.
- **In-country execution days** should hold only items doable at the moment — not "download X" or "install Y" which presume connectivity + time.
- **Things to flag as mis-scoped:**
  - Offline downloads on a day where you'll be in transit / without solid wifi.
  - "Install X app" on day-of when the install requires sign-in + 2FA + onboarding flow.
  - "Buy travel adapter / battery pack / umbrella" on the day you're already leaving home.
  - "Exchange cash" on a day with no banking window.
  - "Email vendor X to confirm" on a day they won't reply before you need the answer.
- **Counter-test:** for each prep item, name the *day before which* it would have to be done to be useful. If that day is earlier than today, the item is on the wrong page.

**I. Moment-level UX & geographic affordances** (the reason this is a site, not a markdown doc — if these aren't there, we shipped a worse markdown doc)
- **Decomposed into moments, not timestamps.** Travelers think *"we just landed, what next"* not *"16:00."* Each transition is its own section with its own tips, decisions, links, fallbacks. Typical Day 1 moments: *Customs & immigration → JR East counter (Suica + NEX) → NEX ride → Marunouchi transfer → Airbnb arrival → Dinner → Sleep.* Flag a flat list of times as broken.
- **Maps + directions everywhere there's a "go to."** Every named location → "Open in Google Maps" link (`https://www.google.com/maps/search/?api=1&query=<address>` or `place_id` form). Walking/transit segments → directions deeplink (`https://www.google.com/maps/dir/?api=1&origin=…&destination=…&travelmode=transit`), not just text. Lodging pages → embedded mini-map or static thumbnail. Zero map links on a page that includes 3+ locations is a Broken finding.
- **Tappable affordances.** Phone numbers as `tel:` links. Addresses with a copy-to-clipboard button (the "show the taxi driver" case). Wifi password / door code / Smart-EX QR / Airbnb keybox code → copy button. Booking confirmation PDFs/screenshots → tap to open.
- **Progressive disclosure.** Collapsible sections, default-collapsed for prep/historical content, default-expanded for *now*. A single-screen-or-less overview at top: *"Now: customs (15:00). Next: NEX at 16:00."* Don't drown the user in the whole day at once.
- **"You are here" framing.** Current-moment indicator: current section auto-expands, past sections auto-collapse-with-checkmark, future sections show as upcoming. Time-of-day awareness; if it's 17:00 on Day 1, the "JR counter" moment should look completed.
- **Scannability on phone screen.** First viewport answers "what am I doing right now" without scrolling. Each section header parseable in 1 second. Real touch targets (44pt min). Dark mode legible in train light + sunlight.
- **Cross-link the nav, don't recreate.** If lodging address belongs on `/lodging`, the day page references it with a deep link + 1-line summary — not by duplicating. Audit whether the page collaborates with `/lodging`, `/bookings`, `/emergency` or competes with them.

### 4. Synthesize feedback

Write 300-500 words organized as:

```
TL;DR (one sentence — would I trust this page to carry us through Day N? Why/why not.)

WRONG / BROKEN (factual problems + temporal-feasibility violations from checklist J, ranked by blast radius. Anything that "can't actually be done today" goes here, not Missing.)

STRUCTURE / UX (layout, sectioning, maps, affordances, progressive disclosure — findings from checklist I. Don't bury this under content findings; it's at least as important.)

MISSING (the things I'd Cmd-F for and not find — be specific about what to add and where it'd go)

SHIP-BLOCKING NITS (small but they'd bite in the moment)

GOOD AS-IS (don't over-edit what works)

FIXES (concrete edits, file:line where possible; for STRUCTURE fixes, sketch the section breakdown you'd want and which affordances each section gets; for content fixes, what to add to /lodging or /bookings vs the day page itself)
```

If invoked in a persona voice, keep that voice in the TL;DR, WRONG, STRUCTURE, and MISSING sections; the FIXES section can be more neutral/edit-ready.

## Output discipline

- Concrete > abstract. "Add the Airbnb door code line referencing /bookings#yotsuya" beats "more info on lodging."
- File paths and line numbers when referring to source-of-truth.
- Don't repeat the page back to the reader — they have eyes; they want the diff.
- If the page is good, say it's good. Don't manufacture findings to look thorough.

## Naming real files in FIXES

Before you propose any `site/...` file paths in the FIXES section, **read the actual framework**. Don't guess based on Jekyll / Eleventy / Next conventions. For this repo:

- The site is **Astro**. Pages live at `site/src/pages/`, with the dynamic day route at `site/src/pages/days/[day].astro`.
- Layouts: `site/src/layouts/`. Components: `site/src/components/` (if any).
- Shared trip data: `site/src/data/trip.ts` — this is the curated quick-lookup source the day pages read at build time.
- Markdown content for days is *not* in `site/_days/` (that's Jekyll) and *not* in `site/_data/*.yml` (that's Eleventy). Either it's inlined in the `[day].astro` getStaticPaths, or it's in `trip.ts` / a sibling `.ts` data module, or it's a content collection at `site/src/content/`. Find out which before proposing a path.

If you can't quickly determine the right path, say so (e.g. "the day-content source lives somewhere under `site/src/` — Ajay knows where; this fix lands there") rather than inventing a path.
