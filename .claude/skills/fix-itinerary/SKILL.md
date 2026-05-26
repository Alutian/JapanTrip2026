---
name: fix-itinerary
description: Drive the per-day fix loop for the Japan 2026 trip companion site (alutian.github.io/JapanTrip2026). For each day page, run Candice-style review → triage findings → retrieve/ask for info → apply fixes → re-review with two adversarial subagents → pass or loop. Use when the user says "fix day N", "run the fix loop", "let's keep going on the days", or any directive to keep improving day pages until they're trustworthy.
---

# Fix a day until it's actually useful

This skill drives the **inner loop** (one day, until Candice approves) and the **outer loop** (across days 0–11, until all approved). Use the [[review-itinerary]] skill at each review step — it defines the criteria. This skill is the procedure that *acts on* those findings.

## Inputs

- **Day number** (0–11). If omitted, pick the lowest-numbered day that hasn't passed yet — start at 0.
- **Existing state** (from `.claude/skills/fix-itinerary/state.json` if present, else fresh) — which days have passed, prior reviews, change summaries.

## Outer loop (across days)

```
for day in [0, 1, 2, …, 11]:
  if state.passed.includes(day): continue
  inner_loop(day)
  if user said "stop": break
```

**After each day passes**, post a brief summary of what changed and **ask the user to spot-check the deployed page** before advancing the outer loop. This is the directionality gate — Ajay confirms the visual/UX feel is on track, then we move on. Don't auto-advance.

## Inner loop (one day)

### Step 1 — Review

Spawn a single Candice subagent that runs the **review-itinerary** skill on day N. Use `subagent_type: general-purpose` (the project-level `candice` agent file isn't loaded mid-session; pass the persona path inline so the subagent reads it).

The review output has six sections (TL;DR, WRONG/BROKEN, STRUCTURE/UX, MISSING, SHIP-BLOCKING NITS, GOOD AS-IS, FIXES). Save it to `.claude/skills/fix-itinerary/reviews/day-<N>-iter-<i>.md` for the iteration counter `i`.

### Step 2 — Triage findings

Go through every finding in WRONG / STRUCTURE / MISSING / NITS. Classify each into one of:

- **(a) I have it.** Info is already in the repo (`Plan_C_Family_of_5/*.md`, `bookings/*.md`, prior conversation context). Just apply the fix.
- **(b) I can find it.** External lookup — web fetch (ZIPAIR baggage policy, SJC terminal map, flight-status URL), a current price, a verified fact. Use `WebFetch` / `WebSearch` / `Bash` (curl). After retrieving, **write the answer back to source-of-truth** (typically `bookings/*.md` or `Plan_C_Family_of_5/transportation.md`) so future sessions / day reviews have it.
- **(c) Private — ask the user.** Decisions only Ajay can make (whether to splurge on a pre-paid bag, ride strategy to SJC, a door code that's in his iMessage not in the repo), or judgment calls that need his preference. **Hard rule: never ask the user something a public web search could answer.** Terminal locations, airline policies, train schedules, restaurant hours, addresses — all (b). Only ask (c) for genuinely private info or genuine preference calls. Batch via `AskUserQuestion` — minimize round-trips.

For each finding, write the triage tag and decision into the review file as you go:
```
- [(b) → found via zipair.net/en/about, written to bookings/flights.md:48] SJC ZIPAIR counter location
- [(c) → ASK] Should we Uber XL or take two cars to SJC?
- [(a)]   Page has wrong cost format `× 5` — direct edit
```

### Step 3 — Retrieve + write back

Execute (a) directly. For (b), fetch and update the source-of-truth markdown — commit those edits so the trip docs improve over time, not just the site. For (c), gather user answers, then update source-of-truth from those answers too (so the same question doesn't have to be re-asked).

After retrieval, you have **everything needed** to land the fixes. Don't proceed to Step 4 until every flagged finding has either an answer, a deliberate "won't fix" rationale, or a "deferred to outer task" note.

### Step 4 — Apply fixes

Edit the actual site:

- **Data-only fix:** edit the day's entry in `site/src/data/trip.ts`.
- **New optional field on Day:** extend the `Day` type in `trip.ts` first, then populate. Optional fields default-render as collapsed/empty on other days.
- **Structural / component fix:** add or modify components under `site/src/components/` and consume them from `site/src/pages/days/[day].astro`. Reusable components (Countdown, CopyButton, MapLink, TelLink) belong here — build once, reuse across days.
- **Cross-link fix:** add deep links to `/lodging`, `/bookings`, `/emergency` from the day page; do **not** duplicate content already on those pages.
- **Layout fix:** layout changes go in `site/src/layouts/Layout.astro` or scoped styles on the day page.

When you build a reusable affordance for one day's findings (e.g. CopyButton because Day 0 needs a confirmation copy), **note in the change summary** that it's now available for later days — Candice's reviews on Days 5/7 etc. will likely call for the same thing.

Commit, push to `main`, wait for the GitHub Pages deploy (`gh run watch` or background-poll). Skill is allowed to push without confirmation since the change set is bounded (one day's data + components).

### Step 5 — Adversarial re-review (two subagents in parallel)

Send a single message with **two `Agent` tool uses** so they run concurrently:

- **Subagent A — "auditor with memory."** Gets the prior review (`day-<N>-iter-<i>.md`) + a one-paragraph change summary you write. Task: *"Did each finding from the prior review actually get fixed? Are any prior findings unresolved, half-resolved, or regressed? Surface only findings tied to the prior review — don't re-derive from scratch."* This catches half-done fixes.
- **Subagent B — "fresh Candice."** No prior-review context. Runs the review-itinerary skill from scratch on the now-updated page. Same persona, no memory. This catches what the auditor would gloss over because they're anchored to the prior findings.

Both must adopt the Candice persona (read `.claude/agents/candice.md`). Both must follow review-itinerary's output format.

Save outputs to `day-<N>-iter-<i>-audit.md` and `day-<N>-iter-<i>-fresh.md`.

### Step 6 — Pass / loop

**Pass criteria** — both reviews must satisfy:

- **WRONG / BROKEN section is empty** (or contains only items deferred with explicit user agreement).
- **STRUCTURE / UX section has no Broken-level findings** — at most a few nits or "could be even better" notes.
- **MISSING section contains only nice-to-haves**, not "Cmd-F-and-not-find" essentials.
- Across both reviews, no contradictions about whether the page is trustworthy at the moment of use.

If pass → mark `state.passed.push(N)`, write a 2-3 line summary to `.claude/skills/fix-itinerary/state.json`, advance the outer loop.

If fail → take the union of findings from both reviews (de-duplicate). Loop to Step 2 with iteration `i+1`.

## Loop control

- **Max 3 inner iterations per day** before pausing to talk to the user. If iteration 3 didn't pass, summarize: what's been fixed, what's stubbornly resisting, what the user needs to decide. Then wait for direction.
- **After every outer-loop pass**, post a one-line status: *"Day 0 passed in 2 iterations. Day 1 next."* No more.
- If a fix touches `site/src/layouts/Layout.astro` or anything global, run a quick smoke check by fetching the home page after deploy to make sure nothing crashed.

## State tracking

`.claude/skills/fix-itinerary/state.json`:

```json
{
  "passed": [0, 1],
  "in_progress": 2,
  "iterations": { "0": 2, "1": 3, "2": 1 },
  "components_built": ["CopyButton", "MapLink", "Countdown"],
  "open_questions": []
}
```

Update after each iteration. Use it to brief subagents about what reusable components already exist.

## Output discipline

- **Don't ask the user between findings.** Batch (c)-classified questions and ask once per iteration.
- **Don't paste full reviews back into the chat.** Summarize: *"Day N iter i — auditor found 2 unresolved (X, Y); fresh found 1 new (Z). Looping."*
- **Push without ceremony.** Each iteration's commit message: `Day N — iter i fixes: <one line>`.
- **Stop the loop the moment the user says stop**, even mid-iteration. Save state first.

## When this skill ends

- All 12 days (0–11) are in `state.passed` → tell the user the whole site is Candice-approved.
- OR the user says stop / move on → save state, summarize what's done and what isn't.
- OR you hit a hard blocker that needs a human decision and 3 iterations didn't clear it → surface and wait.
