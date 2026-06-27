# SignUp — layout axis audit

- **Category:** pattern
- **Host:** `SignUp` (`packages/core/src/patterns/SignUp.tsx`)
- **Axis:** `layout` (`SignUpLayout` union / `data-bbangto-signup-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `frosted` | variant | Glass-chrome treatment. The root container fills with a token-composited `linear-gradient` backdrop (`primary.subtle → background.base → primary.base`); the form card floats above it as a translucent glass panel (`.bbangto-signup-frosted`) — `background-color: color-mix(background.base 62% / transparent)`, `backdrop-filter: blur(spacing.12)`, a hairline `1px solid color-mix(border.base 45% / transparent)` border, and `radius.xl` corners. The float is expressed by the backdrop blur, NOT by a `box-shadow` elevation (`box-shadow: none`). This lives outside the border-fill-elevation vocabulary the other layouts share. |

## Tally

- **reviewed:** 10
- **absorbed:** 8
  - "glassmorphism-card" — same backdrop-blur glass panel; the canonical name for this member, folded in.
  - "translucent-card" — translucency is the `color-mix` background of `frosted`; no skeleton difference.
  - "blur-overlay" — the blur is already the load-bearing chrome of `frosted`.
  - "gradient-backdrop" — the gradient is `frosted`'s root backdrop layer, not a standalone layout.
  - "aurora-surface" — a gradient backdrop restyle; same composition as `frosted`'s root fill.
  - "floating-card" — "floating" here is exactly the blur-not-shadow float of `frosted`.
  - "hairline-glass" — the 1px translucent border is part of `frosted`'s chrome.
  - "vibrancy-panel" — macOS-vibrancy framing is `backdrop-filter` blur over a translucent fill = `frosted`.
- **noise:** 0
- **dropped:** 1
  - "elevated-glass" — dropped: contradicts the load-bearing spec. It re-adds a `box-shadow` elevation under the glass, which is the very border/fill/elevation vocabulary `frosted` deliberately replaces with blur; merging it would dilute the member, and a separate elevation member belongs to a different (elevation) axis.
- **unreviewed:** 0 (= 10 − 10 reviewed)

## Notes

- default-first preserved: `centered` remains the first union value and the marketing-panel-derived default (`marketingPanel ? 'split' : 'centered'`) is untouched — existing call sites/stories render unchanged.
- New member appended to the end of the `SignUpLayout` union; the union type is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The gradient stops, the `color-mix` translucent fill/border, and the `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference. `semantic.border` only uses `base` (valid; `subtle` intentionally avoided as it is undefined).
- a11y contract intact: label↔input association (`htmlFor`/`id`), `aria-invalid` on errored fields, and tab order are unchanged by the variant; the `frosted` play asserts label lookup, `aria-invalid="true"` after empty submit, focusability, and that `onSubmit` is not called on invalid submit.
- Shared files (barrels, tokens, utils, sibling components) untouched.
