---
name: reflect-on-day
description: "[DRAFT] Build an emotionally rich, factually accurate journal of a single trip day from the family's Albee voice captures, then publish it to albee.ai as a draft. Use at the end of a trip day (or the morning after) when the user says \"reflect on day N\", \"journal today\", \"what happened today\", or wants the day's memories, keeper audio moments, and travel-pattern learnings written up. This is the reflection counterpart to the forward-planning skills (propose/fix/review-itinerary)."
---

# Reflect on one day of the trip

This skill turns a full day of Albee captures into a journal that someone will actually want to re-read in five years — the memories, the keeper audio moments, and the patterns that should feed the planning skills. It is the **backward-looking** counterpart to [[propose-itinerary]] / [[fix-itinerary]] / [[review-itinerary]].

Read [[albee-cli-workflow]] for the pull/publish mechanics and [[travel-patterns]] for the kind of learnings to extract. This skill is the *procedure*; those define the tools and the pattern vocabulary. Do not duplicate them.

**Gold-standard exemplar:** `journals/day-3-2026-05-31.md`. Match its depth, voice, and section layout. (It exists in two forms in git history — the *second* pass, with verbatim quotes, is the bar. The first pass read like a checklist and had to be redone. Don't ship the first pass.)

## The procedure

### 1. Pull the FULL day — don't cap, don't trust the date
- The window is ~15h (waking to bed), several hundred moments (~3 min each). **Do not cap at 100** — that's only 300 minutes.
- A JST calendar day straddles **two UTC `--date` values**. Pull both `--date <day>` and `--date <day-1>` and combine, filtering to the JST day. See [[albee-cli-workflow]] for the exact commands and the `session_id_source: null` sync quirk.
- Build a time-ordered index (JST time → full moment UUID → first line) so you can navigate the day.
- **Measure the source data — you will cite it in the journal (every journal states this).** Count moments; sum `duration_seconds` across segments for **hours of audio**; sum `word_count` for **transcription length**. Note where the data came from (`captures` vs `search_moments` backfill). Bookend travel days run on the **device's local timezone** (e.g. Pacific on a departure day), not JST — convert accordingly and say so.

### 1b. Blank / thin days — handle explicitly, never fabricate
Some days have little or no capture (a flight, a jet-lagged arrival, a recorder left off). **Check coverage before writing.** If a day is uncaptured or near-empty:
- Do **not** invent a narrative or write from memory dressed up as transcript. The cardinal rule (quote, never paraphrase) means: no source → no story.
- Produce a **minimal stub journal** at `journals/day-N-YYYY-MM-DD.md` that states plainly the day was not captured, **how much** (e.g. "0 captures" / "12 min across 4 moments"), the likely reason (flight / jet lag / recorder off), and — if the audio simply landed under an adjacent day's window (timezone straddle) — a pointer to where it actually lives. Keep it short: a title, a one-paragraph "Not captured" note, and the source-data line. Then commit + draft-sync like any journal.
- Flag the gap in the adjacent day's "Threads to follow up" so the record is honest end-to-end.

### 2. THE CARDINAL RULE — quote, never paraphrase
This is the step that gets skipped and forces a costly second pass.

- For **every** moment you'll feature, pull the **full transcript** (`albee transcript <full-uuid>`) and quote the **actual words**. Paraphrase flattens the emotion; the verbatim line and the *shape* of the moment are the entire point.
- **Keep full 32-char UUIDs**, not 8-char stubs — the CLI rejects stubs, so stubs make transcripts unretrievable later.
- **Don't trust the index excerpt.** Empty/`—` excerpts routinely hide the day's best moments (e.g. an entire playground hour). Pull the transcript before deciding a stretch was dull.
- Mine the connective tissue, not just the obvious peaks — the friction beat that *precedes* a tender one is often what makes the arc land.

### 3. Write the journal — `journals/day-N-YYYY-MM-DD.md`
Mirror the exemplar's sections:
- **Source data** (one line, near the top — required in every journal): how much audio grounded this entry, e.g. *"Source: ~275 moments · ~13.6 h of audio · ~69k words of transcription (Albee captures, 05:56–22:52 JST)."* For blank days, state the absence and amount. This sets the reader's trust in how complete the reflection is.
- **At a glance** — plan vs. reality, and the one-line lesson of the day.
- **The day, the way it happened** — hour-by-hour narrative built from real quotes and the shape of each moment. Aim for arcs, not lists.
- **Key moments — the line to listen for** — a table: `~JST time | moment | the verbatim line to listen for | moment ID`.
- **What we learned about how we travel** — durable patterns, phrased to carry into later days.
- **Threads to follow up** — open loops (illness, logistics, unresolved snags).

### 4. Feed the planning skills
- Promote durable, repeatable heuristics into [[travel-patterns]] (don't duplicate what's already there — strengthen or add).
- Create a `day-N-retrospective.md` for the proposal process if the day changed concrete plans (cuts, re-slots, wants met/unmet).
- Flag decisions that need the user/Candice (don't auto-apply itinerary reshapes).

### 5. Commit, then publish as a DRAFT
- Commit the journal, then `albee artifact sync-commit journals/day-N-YYYY-MM-DD.md` to publish it to albee.ai as a draft (only the user can see drafts).
- **Draft only.** Never run `artifact publish` or `artifact share` without explicit confirmation — those make it visible to others. See [[albee-cli-workflow]].
