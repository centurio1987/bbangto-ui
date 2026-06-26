# Card — variant axis audit

| field      | value                          |
|------------|--------------------------------|
| category   | surface / container            |
| host       | Card (`@centurio1987/core`)    |
| axis       | `variant`                      |
| saturation | round 1 (pilot)                |

## Tally

| metric           | count |
|------------------|-------|
| reviewed         | 10    |
| absorbed         | 5     |
| adopted (new)    | 2     |
| noise            | 0     |
| dropped          | 5     |
| unreviewed       | 0     | (= 10 − reviewed)

## Adopted members

- **retro** (variant) — load-bearing: thick flat solid border (`spacing.3`, `border.strong`)
  + hard offset box-shadow `4px 4px 0 0` (0 blur / 0 spread, no soft elevation) + flat
  single-colour fill + zero `radius.none`. Distinct from `elevated` (soft blurred shadow).
- **pixel** (variant) — load-bearing: `radius.none` + stepped 8-bit frame built from 8
  layered box-shadow steps (negative-spread stair-stepped corners) instead of a smooth
  1px border (`border: none`) + flat fill. Distinct from `outlined` (single smooth border).

## Absorbed (already covered by an existing member — no new member added)

1. `card` — generic default; absorbed by existing `elevated`.
2. `bordered` — plain single-line frame; absorbed by existing `outlined`.
3. `surface` / `tonal` — flat tinted fill; absorbed by existing `filled`.
4. `flat` — no shadow + border; absorbed by `outlined`.
5. `sunken` / `inset` — recessed background; absorbed by `filled` (`background.sunken`).

## Dropped (reviewed, not adopted)

1. `glass` — requires backdrop-filter blur + translucent layering; no token coverage and
   not a hard-edged member; out of scope for this axis pilot.
2. `gradient` — needs a multi-stop gradient fill; no gradient token, conflicts with the
   flat-fill direction of this round.
3. `neon` / `glow` — soft coloured glow halo; overlaps elevation semantics and needs a
   blurred shadow, opposite of the hard-edged intent.
4. `aurora` — animated moving gradient; motion-coupled, belongs to the motion catalog, not
   a static `variant`.
5. `skeuomorphic` — inner+outer bevel highlights requiring 4+ light/shadow tokens not in
   the palette; redundant next to `retro` for the "tactile" use case.

## Notes

- default-first preserved: union head stays `elevated`; new members appended at the tail,
  so existing call sites and stories render identically.
- All colours sourced from `cssVar('semantic','border','strong')` and
  `cssVar('semantic','background','elevated')`; offsets/widths from `spacing` tokens;
  corners from `radius.none`. No raw colour values.
- Root exposes both `data-card-variant` (existing convention) and the new
  `data-bbangto-card-variant` hook used by the variant stories.
