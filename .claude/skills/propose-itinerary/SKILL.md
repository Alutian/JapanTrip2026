---
name: propose-itinerary
description: Draft a coherent day plan for the Japan 2026 trip by reading travelers from memory, preferences from the Candice persona, ranked activities from wishlist/<city>.md, cuts from decisions.md, and locked items from itinerary.md + bookings/. Output is a draft `Day` entry in the trip.ts schema (momentCards / locked / prep / nextDayTeaser) and a conversational rationale. Use when the user says "propose day N", "draft day N", "rethink day N", "what should we do on day N", or anything that asks for a *new* day plan rather than a critique of an existing one. Also use in **real-time mode** when the user is mid-trip and a locked event broke (sold-out reservation, weather, kid illness) and the day needs to be re-anchored on the fly.
---

# Propose one day of the trip

This skill is the **genesis** companion to `review-itinerary` (audit) and `fix-itinerary` (refine). It creates; the others react. Output is structured for handoff to fix-itinerary.

## Two modes

- **Planning mode** (default) — days not yet executed. Build a draft from wishlist + decisions + persona + memory; surface to user; iterate; eventually hand off to fix-itinerary.
- **Real-time mode** — user is *currently in the day* and a constraint broke (sold-out reservation, sudden weather, kid meltdown, restaurant closed). Replan the remaining hours immediately. Skip preference elicitation (you don't have time); lean on persona defaults; surface options, not single answers.

Detect real-time mode from: today's date matching the day's date, OR user phrasing like "we're in", "the X is sold out", "we need to rethink", "we're already in Tokyo".

## Inputs

- **Day number** (required, -1 through 11).
- **Mode** (auto-detected; user can force with "--realtime" or "--planning").
- **Baseline** — `--from-scratch` (greenfield) vs `--build-on-existing` (start from current trip.ts entry). Default: existing if non-trivial, else greenfield.
- **Persona** — default Candice (matches review/fix). Use her voice for the conversational summary.
- **User intent** (free-text in invocation) — explicit constraints, must-haves, mood.

## Sources to load (read-only, in this order)

1. `~/.claude/projects/-Users-ajaynainani-Documents-Projects-Japan2026/memory/*.md` — travelers, fixed family facts.
2. `.claude/agents/candice.md` — voice + taste + pace + dietary defaults.
3. `Plan_C_Family_of_5/decisions.md` — trip-wide rules + cuts (negative constraints).
4. `Plan_C_Family_of_5/wishlist/<city>.md` for the day's city — **the primary source of candidates**. Tier-ranked (P1–P6) with `→ block` pointers showing what's already placed.
5. `Plan_C_Family_of_5/food.md` — restaurant ranking + dietary annotations.
6. `Plan_C_Family_of_5/itinerary.md` — current day's narrative + LOCKED list.
7. `Plan_C_Family_of_5/todos.md` — booking status for items considered.
8. `site/src/data/trip.ts` — `DAYS` (for cross-day duplication + adjacent-day context) and `LODGING` (for the day's home base, return-home geography).
9. `bookings/*.md` — confirmed reservations.

**Hard rule:** never invent suggestions when wishlist has unplaced candidates in the day's geography. Web search only after wishlist + food.md exhausted.

## Procedure

### 1. Load context + detect mode

Read all sources above. Detect planning vs real-time. Identify the day's city, lodging, prior-day endpoint, next-day starting expectation.

### 2. Identify anchors

- **Locked items** (from itinerary.md + bookings/ + trip.ts) — these *cannot move*. Build around them.
- **Geographic anchor** — where the locked event(s) are. Acceptable orbit is ~30 min transit on either side; tighter if multiple locked events.
- **Time anchor** — pre-locked / locked / post-locked are three planning phases.
- **Energy anchor** — high-load items (theme parks, multi-hour exhibits) get a buffer day or rest window adjacent.

### 3. Pull candidates from wishlist

Filter `wishlist/<city>.md`:
- Tier order P1 → P2 → P3 (skip P4-P6 unless wishlist is thin).
- Drop items whose `Where it lives` already points to *another* day (unless cross-day swap is worth proposing — see step 6).
- Drop items in `decisions.md` "Cut" section.
- Group remaining by geographic cluster.

### 4. Apply traveler constraints (from memory + persona)

For each candidate:
- **No pork** (Candice + Ajay) — flag restaurants requiring it; surface alternates.
- **Grandma** — include, don't engineer around. Mark "grandma joins" vs "grandma rests at lodging" only when activity is genuinely incompatible (deep stairs, hours of standing).
- **Kid energy** — Zara (9) + Kai (7). Cluster stimulation early; rest mid-day; second peak late afternoon; fade by ~21:00. Tantrum risk after lunch if not anchored.
- **Connectivity** — Google Fi covers Japan; never propose "set up eSIM."
- **Pace** — default to Candice's "active morning / slow afternoon / interesting evening" unless a locked event breaks it (e.g. teamLab is a locked afternoon, so morning has to be lighter).

### 5. Cross-day duplication + smoothness check

For each candidate, scan `DAYS` in trip.ts:
- **Already placed?** If yes and on a geographically inferior day, *flag and propose swap* — don't auto-swap.
- **Load distribution** — score each day's load (locked count × walking distance × stimulation). If proposing a heavy item on a day adjacent to another heavy day, surface the imbalance.
- **Carry forward** — items the prior day's user-reaction hinted at (e.g. "we didn't get to X — push to a later day") get priority.

### 6. Booking-window awareness

For each candidate that requires advance booking:
- Compute days from today to target date.
- Apply known windows (Shibuya Sky 2 weeks, MiPig 60 days, Klook restaurants varies, most reservations 1 week).
- Surface urgency: *"book by [date]"* or "*window opened [date]; act now*."

### 7. Sketch moment-card sequence

Default rhythm (overridden only by locked anchors):
- **Pre-08:30** — slow start, breakfast at lodging.
- **08:30–12:00** — active morning (one or two stops max for kids).
- **12:00–14:00** — lunch + rest.
- **14:00–17:00** — slow afternoon (single anchor activity or rest at lodging).
- **17:00–20:00** — interesting evening (the dinner-is-the-event window).
- **20:00–22:00** — second moment if energy holds (night view, scramble, neon walk).

Each moment becomes a `MomentCard` in the trip.ts schema: emoji, title, time, lines, mapQuery, optional tel/link/accent.

### 8. Elicit the minimum set of clarifications

Use `AskUserQuestion` *only* for what context can't resolve. Typical:
- Mood/energy for today (push or relax)?
- Splurge appetite for the dinner anchor (kaiseki vs casual)?
- A specific must-do the user mentioned but I'm unsure how to slot?

**Never re-ask** dietary, traveler list, pace defaults, no-pork — those are encoded.

In **real-time mode**, skip eliciting unless absolutely necessary. Propose 2–3 options with rationale and let the user pick fast.

### 9. Synthesize the draft

Produce two artifacts:

**A. Conversational summary in persona voice.** "Babes, here's what I'd do…" — 6–10 sentences. Names the anchor(s), the geographic arc, what changed vs prior plan (if any), the dinner-is-the-event call, and any open question. This is the user-facing output for discussion.

**B. Structured draft in `Day` schema.** Code block, paste-ready into `site/src/data/trip.ts`:

```ts
{
  n: <N>,
  date: '<YYYY-MM-DD>',
  shortDate: '<...>',
  title: '<...>',
  cluster: '<...>',
  crossLinks: [...],
  locked: [...],
  momentCards: [...],
  plan: [...],
  nextDayTeaser: '<...>',
}
```

Save both to `.claude/skills/propose-itinerary/drafts/day-<N>-v<i>.md` (one file with summary + code block).

### 10. Output

- Conversational summary first.
- Structured draft second (collapsed in `<details>` for chat readability).
- Open questions / decisions still needed.
- Handoff: *"Paste the structured draft into `site/src/data/trip.ts`, then run `/fix-itinerary <N>` to refine."*

### 11. Iterate on redirect

If the user pushes back ("more food, less shopping" / "swap the morning"), produce v2 from v1 + the redirect — without re-eliciting.

## Real-time mode specifics

When the user is *in* the day:

- **Skip planning-mode niceties.** No multi-paragraph rationale. Lead with options.
- **Time-aware** — what's still open today (most restaurants close kitchen by 21:00; observatories close 21:00–22:00; konbini are 24h)?
- **Booking-window check is inverted** — most things needing reservation in <4 hours can't happen. Filter for walk-in viability.
- **Energy-aware** — has the user been touring all day? Kids likely fading; propose lower-effort options.
- **Multiple options preferred over single answer** — user picks based on real-time energy you can't predict from text.

## Output discipline

- **Never write to `site/src/data/trip.ts`.** Output is draft-only; user pastes when approved.
- **Never commit.** Drafts archive to `.claude/skills/propose-itinerary/drafts/`.
- **One round of clarifications max** before drafting. Don't volley questions.
- **Persona voice for conversation; neutral for the structured draft.**
- **Hand off explicitly** to `/fix-itinerary` for refinement and deploy.

## When this skill ends

- User pastes the draft + runs `/fix-itinerary <N>` → handed off.
- User says "skip it, write to trip.ts" → still don't write; output the diff for them to apply.
- User says "stop" → save the latest draft to `drafts/` and exit.
