# Table — variant axis audit

- **Category:** data-display
- **Host component:** `Table` (`@centurio1987/core`)
- **Axis:** `variant` (frame / chrome treatment)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member     | New? | Load-bearing spec |
|------------|------|-------------------|
| `default`  | no (axis seed) | Enclosed card: 1px `border.muted` frame on all 4 sides, `radius.md`, `background.base` fill. Preserves pre-axis rendering — default-first, unchanged for existing callers. |
| `divided`  | yes  | No outer frame (`border: none`), `borderRadius: 0`, transparent fill. Row separation via per-row `border-bottom` (1px `border.muted`); header carries a thick `2px border.strong` underline only. Bare horizontal-rule chrome — no radius / no fill. |
| `outlined` | yes  | Card-like enclosure: rounded `radius.md` border frame (1px `border.base`, stronger than default) + `background.base` fill in an `overflow: auto` container. 4-side frame + surface fill are the load-bearing signal vs. `divided`'s rules-only chrome. |

## Triage ledger

- **reviewed:** 8
- **absorbed:** 4 — candidates folded into existing members rather than minted:
  - `bordered` → folded into `default` (already a 4-side framed card).
  - `card` / `elevated` → folded into `outlined` (same enclose + fill intent; elevation is a shadow concern, not a frame axis).
  - `borderless` → folded into `divided` (frameless rules-only).
  - `lines` / `ruled` → folded into `divided` (horizontal-rule chrome).
- **noise:** 1 — `flush` (ambiguous: conflated zero-padding density with frame removal; density belongs to the `size` axis, not `variant`).
- **dropped:**
  - `striped` — dropped from this axis; already an orthogonal boolean prop (`striped`), not a frame treatment.
  - `glass` — dropped; requires backdrop-blur + translucent fill tokens absent from the token set (`semantic.border` has no `subtle`; no glass surface token), would force raw values.
- **unreviewed:** 0 (= 8 reviewed − 8 candidates surfaced)

## Notes

- Axis hook: `data-bbangto-table-variant={value}` on the root `<table>` (follows the existing `data-size` convention).
- All chrome styling routes through `cssVar()` tokens. `border: none` / `borderRadius: 0` / `transparent` are structural resets, not raw color values.
- Variant threads through `TableContext` so `TableHead` adapts its underline/fill for `divided`.
