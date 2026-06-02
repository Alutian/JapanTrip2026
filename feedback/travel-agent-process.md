# Travel-agent process — field feedback

*Running log of where the AI trip-planner fell short of a great human travel agent, captured in-trip so the lessons compound into later days and future trips.*

---

## 2026-06-02 · Missed the Romancecar observation-seat upgrade

**What happened.** We booked Hakone 27 (GSE), Car 5, seats 15C/D + 16B/C/D (control `E655`) back on May 4. The GSE's signature feature is the **front and rear "observation" / saloon seats** behind the glass nose — the whole reason to ride that specific train. We ended up in a regular middle car. On the day of travel, riding in, Ajay called it out: *"a true travel agent would have taken action to remind us or book better seats when they opened up — thinking ahead."*

**Why it's a fair hit.** Observation seats on the GSE are limited and sell out first; they routinely **open up later** as other parties cancel/rebook. A great human agent would have:
1. Flagged at booking time that the seats we got were *not* the panoramic ones, and that the front/rear seats are the point of the GSE.
2. Set a **watch** to re-check availability as the date approached (cancellations free up premium seats), and proactively pinged: *"front-row observation seats just opened for your Romancecar — want me to grab them? Smart-EX changes are free."*
3. Done the same for any reserved-seat leg with a clearly superior seat tier (Shinkansen window/Mt-Fuji-side, etc.).

**The general lesson (not just this train).** *Booking a reserved seat is not "done."* For any leg where seat quality materially changes the experience, the job continues after booking: note the better tier, watch for it to free up, and act/remind before departure. Reserved-seat systems here (Smart-EX, Odakyu/EMot) allow **free, unlimited changes up to departure** — so there is no downside to upgrading the moment a better seat appears, and leaving it to chance is the failure.

**Where this got encoded so it changes behavior:**
- `bookings/romancecar.md` — added a "seat tier" note + a watch reminder pattern.
- `.claude/skills/propose-itinerary/SKILL.md` — added a booking-window step: for reserved-seat legs, record the premium seat tier and set an upgrade-watch, don't treat "booked" as final.

**Status:** behavioral lesson logged; the GSE upgrade itself is now moot (we're aboard). Carry forward to: Shinkansen Odawara→Kyoto, Kyoto→Tokyo, and the NEX legs — check now whether better seats (window / Fuji-side / quieter car) are still grabbable for those.
