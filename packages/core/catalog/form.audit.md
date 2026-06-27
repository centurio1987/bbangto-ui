# Form — layout axis audit

- **Category:** form
- **Host:** `FormLayout` (`packages/core/src/patterns/FormLayout.tsx`)
- **Axis:** `layout` (`FormLayoutLayout`)
- **Saturation round:** 1 (pilot)
- **Reviewed:** 12
- **Absorbed (adopted):** 4
- **Noise:** 2
- **Dropped:** 6
- **Unreviewed:** 0 (= 12 − 12)

## Adopted members (load-bearing)

| Member | Load-bearing skeleton |
|--------|-----------------------|
| `popover` | Floating panel anchored to a trigger: `position: absolute` out of inline flow, fixed width (~20rem), `box-shadow` elevation (shadow-md) + rounded radius. Root sits outside document flow — distinct from `card`/`stacked`. |
| `drawer` | Viewport edge-anchored: root becomes a `position: fixed` translucent scrim; inner panel is `position: fixed` pinned to the inline-end edge, full block-size column with elevation. Internal header / body / footer vertical stack. |
| `dialog` | Centred modal: root `position: fixed` scrim backdrop; inner panel `position: fixed` centred (top/left 50% + `translate(-50%,-50%)`), max-width constrained card with border, rounded corners and elevation. |
| `split` | 2-track grid (`grid-template-columns` info/media panel slot \| form field column) at ≥ lg via scoped `<style>` + `breakpoints.lg`. Left/right split skeleton instead of a vertical stack. |

## Noise (too similar to an adopted/existing member — folded in)

| Candidate | Folded into | Reason |
|-----------|-------------|--------|
| `modal` | `dialog` | Same centred-overlay skeleton; pure naming alias. |
| `sheet` | `drawer` | Edge-anchored fixed panel over a scrim — identical skeleton to drawer. |

## Dropped

| Candidate | Reason |
|-----------|--------|
| `inline` | Equivalent to the existing default `stacked` single-column shell — redundant. |
| `wizard` | Multi-step flow control, not a shell layout axis; belongs to a separate Stepper/flow pattern. |
| `floating-label` | Field-level label treatment (FormRow concern), not a form-shell layout. |
| `grid` | Overlaps `split` / `horizontal`; no distinct root skeleton beyond a column count. |
| `fullscreen` | A maximal sizing variant of `dialog`/`drawer`, not a separate skeleton. |
| `accordion` | Collapsible-section behaviour; belongs to `sectioned` + a Disclosure primitive, not a layout. |

## Notes

- Default-first preserved: union head stays `stacked`; new members appended at the tail. Existing `stacked`/`horizontal`/`card`/`sectioned` render paths untouched.
- All styling via `cssVar()` tokens (semantic.border = base/muted/strong/focus only; scrim uses `semantic.background.overlay`; elevation uses `shadow` scale; stacking uses `zIndex.modal` / `zIndex.popover`).
- a11y contract retained for every member: label association + `aria-invalid` + `fieldset` via FormRow/FormSection — unchanged by the new shells.
