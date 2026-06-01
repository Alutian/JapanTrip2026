# Albee CLI v0.5.2 — usage feedback

*Filed 2026-06-02, from building the Day 3 and Day 4 trip-reflection journals (`journals/day-3-2026-05-31.md`, `journals/day-4-2026-06-01.md`). Two full days, ~235 and ~274 moments respectively, JST.*

---

## What I was doing & why

The task each time: take a full day of continuous Albee voice captures (waking → bed, ~15 hours) and turn it into an emotionally faithful journal — the memories, the keeper audio moments with timestamps + IDs, and the travel patterns to feed the trip's planning. The hard requirement is **verbatim accuracy**: quote what was actually said, don't paraphrase. So the CLI's job was to get me *every* moment's full transcript for a specific local day, reliably, in a form I could navigate and cite.

This is a real end-to-end workload, not a toy query: a day is several hundred ~3-minute moments, the family is on JST, and the output gets published to albee.ai as a draft.

## How I used the CLI

1. **Bulk pull, both UTC dates.** Because a JST day straddles two UTC dates (see Issue 1), I pulled both:
   ```
   albee captures --date 2026-06-01 --full-transcript --format json --limit 100 > day4_d0601.json
   albee captures --date 2026-05-31 --full-transcript --format json --limit 100 > day4_d0531.json
   ```
   (651 KB and 763 KB respectively.)
2. **Reconstruct the local day from segments.** Each capture's `segments[]` carry `moment_id`, `recorded` (UTC), and full `transcript_text`. I `jq`'d all segments out of both files, filtered to the JST-day UTC window (`2026-05-31T21:00`→`2026-06-01T13:00`), sorted by time, and converted UTC→JST in `awk` to build a `time ⇥ moment_id ⇥ text` index. Result: 274 moments, 06:31–21:48 JST.
3. **Read the day in order**, then **pulled individual transcripts** for the moments I wanted to feature/verify:
   ```
   albee transcript 514bc1b8-8df7-4f45-9db2-6e1829bb505c
   ```
4. **Publish as draft:**
   ```
   albee artifact sync-commit journals/day-4-2026-06-01.md
   → albee: synced 1 file(s)
   ```

## What I found (the good)

- **`captures --full-transcript --format json` is the right primitive.** Two calls returned the entire day. Crucially, `segments[]` embed the full `transcript_text` inline, so I reconstructed all 274 moments **without** making 274 separate `transcript` calls. This is the single feature that makes day-scale reflection feasible.
- **The data model is clean and complete:** `captures → moment_ids[] + segments[] + anchors[]`, each segment with `moment_id`, `recorded`, `duration_seconds`, `segment_sequence`, `word_count`, `transcript_quality`, `transcript_source`, `transcript_text`.
- **`artifact sync-commit` is fast and idempotent.** (Its success output is inconsistent — see Issue 8.)

---

## Issues, ranked by friction

### 1. `--date` filters by UTC session-start, not the traveler's local day — **highest friction**
A JST calendar day straddles two UTC `--date` values, so "reflect on Day 4 (June 1 JST)" required pulling `--date 2026-06-01` **and** `--date 2026-05-31`, concatenating, and filtering/converting timezones by hand. That's ~5 manual steps for the tool's single most common operation.
**Fix:** a `--tz Asia/Tokyo` (or `--local`) flag so `albee captures --date 2026-06-01 --tz Asia/Tokyo` returns exactly that local day.

### 2. `albee transcript` rejects anything but a full 32-char UUID
```
albee transcript bb17ff34
→ API error 422: VALIDATION_ERROR ... moment_id: Input should be a valid UUID,
  invalid length: expected length 32 for simple format, found 8
```
The Day 3 journal stored 8-char IDs for display; I then could not re-pull those clips and had to recover full UUIDs from raw JSON. Short IDs are a natural thing to surface to a human.
**Fix:** accept an unambiguous prefix, or return a "did you mean `<uuid>`" lookup instead of a hard 422.

### 3. The same session splits across two date pulls, silently
Session `9775380c` came back in **both** files — 22 moments under one date, 145 under the other (it spanned UTC midnight). Nothing flags it as one session; you only notice if you dedupe by `session_id`.
**Fix:** `albee session <id>` to pull a whole session regardless of date boundary, and/or annotate "partial: N of M moments on this date."

### 4. The `session_id_source: null` / `"unknown"` gap looks like missing audio
On Day 3, a multi-hour midday stretch was **searchable** (via MCP `search_moments`) yet **absent from `albee captures`** — those segments had `session_id_source: null` (not finalized into a capture session). Day 4 had three `src=unknown`, single-moment phantom sessions (`31492902`, `f810eeb5`, `92998ace`). A user reading `captures` output would reasonably conclude there's a recording hole when the audio actually exists and just hasn't synced.
**Fix:** surface pending/unsynced moments explicitly — an `--include-pending` flag or a sync-status indicator — so "gap vs. sync lag" isn't a guess.

### 5. No time-ordered moment listing with text
To navigate a day I had to `jq` segments out of the captures JSON, filter by UTC window, sort, and TZ-convert in `awk`. A first-class `albee moments --date X --tz Y --format tsv` emitting `local_time ⇥ moment_id ⇥ text` would replace all of that hand-rolled glue.

### 6. ASR repetition artifacts bloat transcripts
`transcript_quality` is `"first_draft"` and it shows: real examples from one day include `"strength and strength and"` ×~40, `"pop pop pop"` ×~100, `"Look!"` ×~60, `"jump"` ×~100, `"(birds chirping)"` ×30, a looped `"Impedimp"`. These inflate token cost and hurt readability.
**Fix:** a `--clean`/`--dedupe` flag that collapses runs of repeated tokens; and/or a higher-quality re-transcription pass exposed when available (the `first_draft` label implies one may exist).

### 7. Relative time windows are unreliable
`--since 16h` did not reach back to the morning in testing. I stopped trusting relative windows and use explicit `--date` pulls.

### 8. `artifact sync-commit` success output is inconsistent
Same command, same exit code (0), different output across runs in one session:
```
albee artifact sync-commit journals/day-4-2026-06-01.md   → albee: synced 1 file(s)
albee artifact sync-commit feedback/cli-v0.5.2.md         → (no output)
```
With no stdout, the only success signal is the exit code, so a script can't distinguish "synced" from "no-op" from "silently did nothing." Minor, but it undermines trust in the confirmation.
**Fix:** always emit a deterministic result line (e.g., `synced 1 file(s)` / `0 files (no changes)`), ideally with `--json` for scripting.

---

## Correction / clarification on a claim I made

I initially said the **TeamLab afternoon "read as `—` (empty)"** and implied a recording gap. **That was wrong, and worth recording so it isn't repeated:**

- There was **no missing audio**. Recording was continuous all day. Every TeamLab moment from 14:18 onward has a full transcript (500–1,500 chars each); I quoted them directly in the journal. My "0 chars" reading was a **bug in my own `awk` check** (I counted field `$4` when text is in `$3`).
- The **empty-excerpt phenomenon I was thinking of is real, but it lives in the MCP `search_moments`/`list_moments` *excerpt* field**, not in `captures --full-transcript`. On Day 3 I built the index from search excerpts, and some came back blank (`—`) for moments that nonetheless had full transcripts available via `transcript`/`captures`. On Day 4 I built the index from `captures` segments and saw **zero** blanks.
- The only genuinely sparse Day 4 stretch was ~14:03–14:15: five moments transcribed as just `"you"` — low *speech*, not missing audio (queuing/ambient/music).

**The actionable version:** the excerpt field returned by the MCP search tools can be empty even when a full transcript exists — so don't use search excerpts to decide a stretch was uneventful; pull from `captures --full-transcript` segments. (This is a data-consistency note for the MCP `search_moments` path, related to but distinct from Issue 4.)

---

## Related MCP-tool notes (adjacent to the CLI)

- `mcp__albee__list_moments` caps at 100 results with **no offset/pagination**, and overflows token limits on big results.
- `mcp__albee__search_moments` **ignores its `limit` param** and returns the whole window (useful for coverage, surprising as an API), and its `since` requires a full datetime (rejects `'15h'`).
- These are why the **CLI `captures` path is preferable for bulk/day-scale work**; the MCP tools are better for targeted single lookups.
