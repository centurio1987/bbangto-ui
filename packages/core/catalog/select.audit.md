# Select variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `Select` (`packages/core/src/components/Select.tsx`)
- **Axis:** `variant` (visual trigger chrome family)
- **Default-first anchor:** `outline` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `glass` | `backdrop-filter: blur(spacing.12 ≈ 12px)` over a translucent surface fill (`color-mix(elevated 55%, transparent)`), framed by a 1px translucent border (`color-mix(border.base 45%, transparent)`) | `outline`/`filled` use an opaque solid fill + opaque border; `underline` is a borderless transparent bottom-rule. None can express a frosted backdrop blur with a semi-transparent surface — the blur + alpha compositing is the whole chrome. |

Colors are composed exclusively from existing scale tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.border.base`, plus the open/error
`borderColor` cascade). Alpha is synthesized with `color-mix(... transparent)`
and the blur radius reuses `spacing.12`; no raw color literals are introduced.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 3 — `frosted` (synonym, folds into `glass`), `blur` (folds into `glass`'s `backdrop-filter`), `translucent` (folds into `glass`'s `color-mix` surface alpha).
- **noise:** 3 — `default` (alias of the `outline` anchor), `bordered` (duplicates `outline`'s 1px frame), `flat` (duplicates `filled` minus elevation).
- **dropped:**
  - `gradient` — a multi-stop gradient fill is a Button-family chrome; on a Select trigger it fights the placeholder/label foreground contrast and is out of scope for this axis.
  - `neon` — saturated glow border belongs to an emphasis sub-axis, not a trigger-surface family; reachable later as a state, not a base variant.
  - `ghost` — a no-fill-until-hover treatment is a hover/state behavior, not a distinct static trigger chrome here.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New member appended to the union tail; `outline` remains the default so every
  existing call site and story renders identically.
- Root trigger already renders `data-bbangto-select-variant={variant}` (existing
  axis hook); `glass` reuses it with no new attribute convention.
- `glass` sets both `backdropFilter` and `WebkitBackdropFilter`, matching the
  `Dock`/`Hero` block precedent for backdrop blur.
