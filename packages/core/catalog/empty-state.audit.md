# EmptyState variant axis — saturation audit

- **Category:** organism / status surface
- **Host:** `EmptyState` (`packages/core/src/components/EmptyState.tsx`)
- **Axis:** `variant` (panel chrome family)
- **Default-first anchor:** `plain` (newly introduced union head; the original
  chrome-less render is preserved byte-identically when `variant` is omitted)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, primary.base 0% → primary.hover 60% → primary.active 100%)`, `border: none`, inverse-friendly text (`primary.foreground`) | A multi-stop gradient fill cannot be expressed by `plain` (no fill) or `outlined` (transparent outline only). Synthesized from the primary scale. |
| `outlined` | `1px solid semantic.border.base` + `radius.lg`, `backgroundColor: transparent`, no `boxShadow` | Pure outline chrome — no fill, no elevation. Distinct from `gradient` (filled) and `pixel` (hard-shadow). |
| `pixel` | `radius.none` (0) + stepped blur-0 `boxShadow` (`4px 4px 0 border.strong, 8px 8px 0 border.muted`), `2px solid border.strong` | Anti-rounded retro 8-bit frame. The blur-0 stepped shadow + zero radius is the inverse of every rounded/soft card; unreachable by `outlined`'s flat 1px border. |

All members compose color exclusively from existing tokens via `cssVar()`
(`semantic.primary.base|hover|active|foreground`, `semantic.border.base|strong|muted`,
`radius.none|lg`, `semantic.background.base`). The gradient and stepped-shadow
strings are the only inline composition, and their colors are token-derived.
Note: `semantic.border.subtle` is intentionally avoided (absent from the
contract; would resolve to an undefined CSS var).

## Candidate accounting (9 surveyed)

- **reviewed:** 9
- **absorbed:** 4 — `elevated` (folds into `pixel`'s shadow chrome), `bordered`
  (folds into `outlined`), `vibrant`/`hero` (fold into `gradient`'s fill).
- **noise:** 2 — `glass` (needs `backdrop-filter` + a glass surface token absent
  from the contract), `dashed` (a border-style sub-axis, orthogonal to the
  chrome family).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token not in
    `SemanticColors`; would force raw values.
  - `elevated` — duplicates a card + `shadow` already reachable via `pixel`'s
    hard shadow / a soft elevation token; no distinct chrome family.
  - `illustration` — a content/slot concern (large hero artwork), not a panel
    chrome treatment; belongs to the icon/media slot, not this axis.
- **unreviewed:** 0 (= 9 − 9 reviewed)

## Notes

- New members appended to the union tail; `plain` is the default so every
  existing call site and story (Default, Minimal, Size*, Align*, Loading*)
  renders identically.
- Root now renders `data-bbangto-empty-state-variant={variant}` on both the
  loading-skeleton and content render branches (first axis hook on this host;
  future axes should follow the same `data-bbangto-empty-state-*` convention).
- a11y contract preserved: title text remains visible and the action slot stays
  keyboard-focusable across all three variants (verified in each `play`).
