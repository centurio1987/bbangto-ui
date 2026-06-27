# Spinner / Loader — variant axis audit

- **Category:** spinner-loader
- **Host component:** `ProgressIndicator` (`packages/core/src/components/ProgressIndicator.tsx`)
- **Axis:** `variant` (indeterminate loader treatment)
- **Default-first anchor:** `spinner` (first union member — preserves the historical SVG arc render; existing call sites / stories unchanged)
- **Saturation round:** 1 (pilot)

## Adopted members (+ load-bearing spec)

| Member | Load-bearing treatment |
|--------|------------------------|
| `ring` | Single centred circle drawn purely with `border-width`; `border-top` left transparent to carve the arc gap. No background fill. 360° rotation via `motion.preset.spin`. |
| `spokes` | N (=10) tapered pill lines (`border-radius: full`) placed radially by `translate(-50%,-50%) rotate(θ) translateY(-d)`. Per-child staggered `animation-delay` over `motion.preset.pulse`. No border-ring, no fill. |
| `dots` | Root reflows to a horizontal flex **row** (`gap`); three full-radius circles on a horizontal track. Per-child staggered scale+opacity via the scoped `bbangto-spinner-loader-dot` keyframe. No border-ring, no fill. |
| `bars` | Horizontal flex **row** of narrow rects (small `radius.sm`, not circular) animated with the equalizer `scaleY` beat (`motion.preset.bars`), `transform-origin: center bottom`, staggered delay. No circular radius, no border-ring. |

All colors resolve through `cssVar()` tokens only (`semantic.primary.base`, `radius.full`, `radius.sm`, `spacing.*`, `motion.preset.*`, `motion.duration/easing.*`). `border-top: transparent` on `ring` is the only intentional non-token literal (gap carving, not a color).

## Ledger

- **reviewed:** 12
- **adopted:** 4 (`ring`, `spokes`, `dots`, `bars`)
- **absorbed:** 5 — folded into an adopted member rather than shipped as a separate variant:
  - `arc` → absorbed into `ring` (same border-gap treatment, narrower sweep).
  - `circular-svg` → absorbed into the default `spinner` (already the SVG arc).
  - `pulse-dots` → absorbed into `dots` (opacity-only is a subset of dots' scale+opacity).
  - `wave-dots` → absorbed into `dots` (translateY beat is a re-timing of the same track).
  - `equalizer` → absorbed into `bars` (identical scaleY track, alias name).
- **noise:** 4 — out of scope for an indeterminate loader axis:
  - `skeleton-block` (belongs to a Skeleton host, not a spinner).
  - `progress-track` (determinate bar — already the `value` path).
  - `toast-timer` (notification countdown, different host).
  - `confetti` (celebration motion, not a loader).
- **dropped (named + reason):**
  - `orbit-planets` — dropped: multi-orbit composite needs per-orbit gradient tokens we don't have; over-budget for a leaf.
  - `gooey-blob` — dropped: requires SVG `feGaussianBlur`/`feColorMatrix` filters, not expressible via design tokens.
  - `dual-ring` — dropped: redundant with `ring` (two stacked arcs add no semantic value).
- **unreviewed:** 0 (= 12 reviewed − 12 candidates)

## Notes for orchestrator

- New union member type `ProgressIndicatorVariant` is exported from the component file; the package barrel re-exports via `export *`, so no index edit is required.
- No shared token/util/index files were modified.
