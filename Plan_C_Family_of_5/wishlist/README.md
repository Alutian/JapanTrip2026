# Candice's Wishlist — Source of Truth

Candice ranks activities by city in three Google Sheets. The exported CSVs live in [raw/](raw/) and are the canonical source. The markdown files in this folder are the synthesized view — that's where you look during day-of planning.

## Files

- [tokyo.md](tokyo.md) — 53 items, P1→P6
- [kyoto.md](kyoto.md) — Kyoto + Gion + Higashiyama
- [hakone.md](hakone.md) — sparse; mostly validates the existing menu
- [raw/](raw/) — exact CSV exports

## Priority scale

- **P1** — must-do, the spine of the day plan
- **P2** — important, slot if it fits the cluster
- **P3** — option, surface when in the area
- **P4–P6** — nice-to-know, mention in passing

## How items connect to the rest of the repo

| If it's... | It lives in... |
|---|---|
| A ranked activity / restaurant / café from Candice | this folder |
| An activity block grouped by area + duration + food pairing | [../menus/](../menus/) |
| Pinned to a specific day with a time | [../itinerary.md](../itinerary.md) |
| A reservation with a confirmation number | [../../bookings/](../../bookings/) |

The same item can appear in all four — e.g. **GEAR** is on the wishlist (P1), in the Kyoto menu as block KE4, locked on Day 8 of the itinerary, and tracked under bookings.

## When Candice updates the sheet

1. Re-export each tab as CSV.
2. Replace the files in [raw/](raw/).
3. Re-sync the markdown files in this folder — diff against the raw CSV, fold new items into the appropriate priority section, mark anything newly booked.
4. If any new item is P1 or P2, check whether it needs a corresponding menu block in [../menus/](../menus/) and a day slot in [../itinerary.md](../itinerary.md).
