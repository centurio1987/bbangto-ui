# Snackbar variant axis — saturation audit

- **Category:** molecule / notification (feedback)
- **Host:** `Snackbar` (`packages/core/src/components/Snackbar.tsx`)
- **Axis:** `variant` (surface chrome family)
- **Default-first anchor:** `standard` (new union head; original rounded + soft-shadow look, fully backward-compatible)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `pixel` | `border-radius: radius.none` (0) + stacked zero-blur `box-shadow` offsets forming a hard-edge stepped pixel border (`semantic.border.strong`); smooth radius + soft elevation removed | A staircase, anti-alias-free pixel outline cannot be expressed by the `standard` smooth `radius.md` + `shadow.lg` chrome; the chrome treatment itself becomes the stepped border. |
| `elevated` | `border: none` (outline + severity left-border dropped) + multi-layer drop-shadow stack (`shadow.sm + md + lg + xl`) over the opaque `foreground.base` fill | `standard` separates the surface with a soft single `shadow.lg` and may carry a severity outline; `elevated` swaps outline-based separation for pure layered elevation (border↔elevation chrome transition). |

Both members compose exclusively from existing tokens via `cssVar()`
(`semantic.border.strong`, `radius.none`, `shadow.sm|md|lg|xl`). The stepped
pixel-border string is the only inline composition and its color is token-derived.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 4 — `flat` (folds into `standard` with `shadow.none`), `raised` (folds into `elevated`'s layered shadow), `retro`/`8bit` (folds into `pixel`'s stepped border), `card` (folds into `elevated` opaque floating surface).
- **noise:** 1 — `glass`/frosted (needs `backdrop-filter` + a translucent-surface token absent from `SemanticColors`; out of scope for a pure-token chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + translucent surface token not present in the contract; would force raw values.
  - `gradient` — multi-stop fill belongs to the fill/color axis, not the surface-chrome family being saturated here.
  - `bordered` — flat single-border variation only; an orthogonal border-style sub-axis, not a distinct chrome family (already reachable via severity left-border).
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `standard` remains the default so every
  existing call site and story renders identically.
- Root renders `data-bbangto-notification-variant={variant}` (axis hook on this
  host; future axes should follow the `data-bbangto-notification-*` convention).
- a11y contract preserved across all variants: `role="alert"` + `aria-live="assertive"`
  retained; play functions assert the role/aria survive each new variant.
