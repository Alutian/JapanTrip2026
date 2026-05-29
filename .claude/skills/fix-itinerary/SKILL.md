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

### Step 4.5 — Live-render smoke check (after deploy, before subagents)

Run a tools-only smoke check against the deployed page. This catches the cheap, deterministic bugs (broken images, malformed tel, dead anchors) so the adversarial pair can focus on UX/structure judgement.

Run inside `mcp__playwright__browser_evaluate` after navigating to `https://alutian.github.io/JapanTrip2026/days/<N>?k=<token>` (open all `<details>` and scroll to bottom first so lazy-loaded content triggers):

```js
async () => {
  document.querySelectorAll('details').forEach(d => d.open = true);
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise(r => setTimeout(r, 4000));

  const base = '/JapanTrip2026';
  const findings = [];

  // 1. Images — every <img> must have loaded
  for (const img of document.querySelectorAll('main img')) {
    if (!img.complete || img.naturalWidth === 0) {
      findings.push({ kind: 'broken-image', src: img.src, alt: img.alt });
    }
  }

  // 2. tel: links — must match E.164, no spaces, AND no stray "trunk 0" after the country code.
  //    Catches Day-2 bug `+810120428485`: Japan toll-free 0120 with national leading 0 preserved
  //    when it should have been dropped for the international form (`+81120428485`).
  for (const a of document.querySelectorAll('a[href^="tel:"]')) {
    const num = a.href.slice(4);
    const e164 = /^\+[1-9]\d{6,14}$/.test(num);
    const noTrunk0 = !/^\+\d{1,3}0/.test(num);  // no 0 in positions 2–4 after the +
    if (!e164 || !noTrunk0) {
      findings.push({ kind: 'malformed-tel', href: a.href, label: a.textContent });
    }
  }

  // 3. Internal links — HEAD-fetch each, verify 200 and anchor presence
  const internal = [...new Set(Array.from(document.querySelectorAll('a[href]'))
    .map(a => a.getAttribute('href'))
    .filter(h => h && h.startsWith(base + '/')))];
  for (const href of internal) {
    const [path, anchor] = href.split('#');
    try {
      const res = await fetch(path, { method: 'GET' });
      if (!res.ok) { findings.push({ kind: 'dead-link', href, status: res.status }); continue; }
      if (anchor) {
        const html = await res.text();
        const re = new RegExp(`id=["']${anchor}["']`);
        if (!re.test(html)) findings.push({ kind: 'dead-anchor', href, anchor });
      }
    } catch (e) {
      findings.push({ kind: 'fetch-error', href, err: String(e) });
    }
  }

  // 4. Named places without a mapQuery in the same card — heuristic
  // (Reviewer judges; smoke just lists card titles that have no map link.)
  const cardsNoMap = [];
  for (const card of document.querySelectorAll('main .card')) {
    const title = card.querySelector('h2')?.textContent || '';
    const hasMap = !!card.querySelector('a[href*="google.com/maps"]');
    const looksLikePlace = /restaurant|station|hotel|park|cafe|store|airport|building|counter|m\/w|terminal/i.test(title);
    if (looksLikePlace && !hasMap) cardsNoMap.push(title.trim().slice(0, 80));
  }
  if (cardsNoMap.length) findings.push({ kind: 'card-without-map', cards: cardsNoMap });

  return findings;
}
```

Append console-error count from playwright's `console: N errors, M warnings` line in the navigate result.

**Save findings to `reviews/day-<N>-iter-<i>-smoke.md`** as a structured list. Treat every finding as a candidate WRONG/BROKEN — patch in this iteration unless you have an explicit reason to defer.

If smoke check finds nothing (or only deferred items): proceed to Step 5 with the empty smoke result passed into both subagent prompts as context.

If smoke check finds blocking issues: fix them, re-deploy, re-run smoke. Don't waste subagent calls on bugs you can detect deterministically.

### Step 5 — Adversarial re-review (two subagents in parallel)

Send a single message with **two `Agent` tool uses** so they run concurrently. Pass the smoke-check findings file into both prompts as context.

- **Subagent A — "Specialist."** Gets the prior review (`day-<N>-iter-<i>.md`), the smoke-check findings (`day-<N>-iter-<i>-smoke.md`), and a one-paragraph change summary. Default stance is **skeptical, not generous**: "Assume at least one fix is broken until you verify it on the live page." Performs both an *audit pass* and a *structural verification pass*:
  - **Audit:** Walk every iter-1 finding, mark ✅/🟡/❌/🔄 with one-line evidence drawn from the live page (not from the change summary).
  - **Structural verification** (this is the part the old auditor never did):
    - Re-multiply every cost breakdown shown on the page. Mismatch = WRONG/BROKEN.
    - Diff every `✅ booked` / `⬜ TO BOOK` marker against the `BOOKINGS` array in `site/src/data/trip.ts` and `Plan_C_Family_of_5/todos.md`. Drift = WRONG/BROKEN.
    - For every `/lodging/<key>`, `/days/<n>` cross-link: verify the target exists. For fragment links: verify the `id` exists in the rendered target HTML (the smoke check already did this; confirm and elaborate).
    - For every `→ Day N` teaser: confirm Day N is in `DAYS` and the teaser matches the day's actual first action.
    - Confirm or refute the smoke-check findings — if smoke flagged something, decide whether it's real or false-positive.
  - Output as the prior audit format (FINDING-BY-FINDING + NEW ISSUES INTRODUCED + VERDICT REASONING) PLUS a `STRUCTURAL CHECKS` block before the verdict.
- **Subagent B — "fresh Candice."** No prior-review context. Runs the review-itinerary skill from scratch on the now-updated page. Same persona, no memory. Gets the smoke-check findings as context but is told *not* to re-litigate them — they're handled. This catches what the Specialist would gloss over because they're anchored to verification rather than feel.

Both must adopt the Candice persona (read `.claude/agents/candice.md`). Both must follow review-itinerary's output format (with the additions noted for Specialist). Both must write scratch files to `.claude/skills/fix-itinerary/scratch/` — *never* to the repo root. Snapshots, screenshots, intermediate notes all go there.

Save outputs to `day-<N>-iter-<i>-specialist.md` and `day-<N>-iter-<i>-fresh.md`.

### Step 6 — Pass / loop

**Pass criteria** — both reviews must satisfy:

- **Smoke check (Step 4.5) has no unresolved findings.**
- **WRONG / BROKEN section is empty** (or contains only items deferred with explicit user agreement) in *both* the Specialist's structural-checks block AND fresh Candice's review.
- **STRUCTURE / UX section has no Broken-level findings** — at most a few nits or "could be even better" notes.
- **MISSING section contains only nice-to-haves**, not "Cmd-F-and-not-find" essentials.
- Across both reviews, no contradictions about whether the page is trustworthy at the moment of use.

If pass → proceed to **Step 7**.

If fail → take the union of findings from smoke + both reviews (de-duplicate). Loop to Step 2 with iteration `i+1`.

### Step 7 — Encode lessons (between pass and advance)

**Required, not optional.** Before marking the day passed and advancing the outer loop:

Walk back through everything the user corrected *during this day's loop* that the subagents (and smoke check) did not catch on their own. For each one, decide where the lesson lands so it compounds into future days' reviews:

- **Persona** (`.claude/agents/candice.md`) — if the lesson is "Candice should react to X" (e.g. "we're on Google Fi, eSIM suggestions are redundant"; "prep on the wrong day infuriates you").
- **Memory** (`~/.claude/projects/-Users-ajaynainani-Documents-Projects-Japan2026/memory/<topic>.md`) — if the lesson is durable user/family fact (e.g. DOBs, carrier, household routines, fixed preferences).
- **Skill checklist** (`.claude/skills/review-itinerary/SKILL.md` or this file) — if the lesson is "future reviewers should structurally check for X" (e.g. entry-point routing, temporal feasibility, cross-data drift).
- **Source-of-truth doc** (`Plan_C_Family_of_5/*.md`, `bookings/*.md`) — if the lesson is a fact about *this* trip that future days need to inherit.

Each encoded lesson is logged in `state.json.lessons_encoded` as `{ day: N, lesson: "...", target_file: "...", iter: i }`.

**The skill is incomplete if a user correction isn't either encoded somewhere durable or explicitly noted as out-of-scope.** This is the highest-leverage step: it converts one-time bug catches into permanent skill capability.

After Step 7: mark `state.passed.push(N)`, write a 2-3 line summary to `state.json`, advance the outer loop.

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
  "open_questions": [],
  "lessons_encoded": [
    { "day": 0, "lesson": "Family is on Google Fi — no eSIM needed in Japan",
      "target_file": ".claude/agents/candice.md", "iter": 2 },
    { "day": 0, "lesson": "Entry-point routing changes when Day N is added/renumbered",
      "target_file": ".claude/skills/review-itinerary/SKILL.md (checklist F)", "iter": 2 },
    { "day": 0, "lesson": "Prep on the wrong day is the silent failure mode",
      "target_file": ".claude/skills/review-itinerary/SKILL.md (checklist J)", "iter": 2 }
  ],
  "smoke_check_history": {
    "2-iter-2": { "broken_image": 0, "malformed_tel": 1, "dead_anchor": 0, "card_without_map": 1 }
  }
}
```

Update after each iteration. Use `components_built` to brief subagents about what reusable components already exist. Use `lessons_encoded` to verify Step 7 fires (no lesson missing). Use `smoke_check_history` to see if the same class of bug keeps recurring across days — if so, escalate to a new checklist item.

## Output discipline

- **Don't ask the user between findings.** Batch (c)-classified questions and ask once per iteration.
- **Don't paste full reviews back into the chat.** Summarize: *"Day N iter i — auditor found 2 unresolved (X, Y); fresh found 1 new (Z). Looping."*
- **Push without ceremony.** Each iteration's commit message: `Day N — iter i fixes: <one line>`.
- **Stop the loop the moment the user says stop**, even mid-iteration. Save state first.

## When this skill ends

- All 12 days (0–11) are in `state.passed` → tell the user the whole site is Candice-approved.
- OR the user says stop / move on → save state, summarize what's done and what isn't.
- OR you hit a hard blocker that needs a human decision and 3 iterations didn't clear it → surface and wait.
