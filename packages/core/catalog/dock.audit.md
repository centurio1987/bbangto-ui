# Dock — variant axis audit

- **Category:** organism / section block
- **Host:** `Dock` (`packages/core/src/blocks/Dock.tsx`)
- **Axis:** `variant` (`DockVariant` union / `data-bbangto-dock-variant`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `glass` | variant | Frosted-chrome treatment. The solid elevated fill is dropped and composited toward transparent (`color-mix(in srgb, background.elevated 50%, transparent)`) so the backdrop reads through; the elevation drop shadow is replaced by a single thin **inset** highlight rim (`inset 0 0 0 1px color-mix(border.strong 55%, transparent)`, `border: none`); stronger `blur(18px)` backdrop-filter than `floating`'s `blur(12px)`. Distinct from `floating`, whose chrome is an *opaque* elevated surface + a `shadow.lg` drop shadow. The translucent fill (resolved `rgba(...)`) + inset rim are the skeleton difference, not the blur alone. |
| `spotlight` | variant | Glow-indicator chrome. The container is near-invisible (`background: transparent`, `border: none`, `box-shadow: none`, `backdrop-filter: none`) and the active affordance lives entirely in two per-item layers: a blurred token-gradient limelight beam behind the active item (`linear-gradient(to bottom, color-mix(primary.base 60%, transparent), transparent)` + `filter: blur(spacing.8)`, `position: absolute`, `z-index: -1`) plus a thin glowing emitter bar across its top (`primary.base` + token glow `box-shadow`). The active pill fill is suppressed in this variant. Distinct from every other member: the indicator is a soft glow column (gradient `background-image`), not an underline / pill / border shape. Inactive items render no beam. |

## Tally

- **reviewed:** 12
- **absorbed:** 4
  - "blur-dock" / "frosted" → folded into `glass` (translucent + backdrop-blur is the same skeleton; the existing `floating` already carries blur, so only the no-fill / inset-rim glass treatment is the new member).
  - "acrylic" → `glass` (acrylic = same translucent-pane-with-rim recipe).
  - "limelight" → `spotlight` (the beam-behind-active-item is the defining trait already captured).
  - "neon-glow" / "active-glow" → `spotlight` (a glowing indicator over the active item is the same glow-chrome, no new container reflow).
- **noise:** 1
  - "magnify" — hover scale-up of the active/hovered icon is already an intrinsic behaviour of the base Dock (`scale(1.2) translateY(-4px)` on the icon wrap); surfacing it as a "variant" is noise, not a distinct chrome skeleton.
- **dropped:** 1
  - "vertical-rail" — dropped: a side-mounted vertical dock is an *orientation* concern (flex-direction + edge anchoring), an orthogonal axis to this container-chrome `variant` axis; it would reshape the nav landmark/layout rather than re-skin it, so it belongs to a future `orientation` axis, not `variant`.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `floating` remains the first union value and the `variant = 'floating'` default is untouched — existing call sites and the `Default` / `Minimal` / `VariantAttached` / `VariantLabeled` stories render byte-identical.
- New members appended to the end of the `DockVariant` union; each member literal is also exported as a named type (`DockVariantGlass`, `DockVariantSpotlight`) from the component file (barrel re-exports via `export *`).
- a11y contract maintained across all variants: the `<nav aria-label="Dock">` landmark is unchanged, each item stays a `<button>` with `aria-pressed` + `aria-label`, and focus drives the same hover/scale state (`onFocus`/`onBlur`). Glow/glass layers are `aria-hidden` decorative spans with `pointer-events: none`, so keyboard focus order and screen-reader semantics are unaffected. Verified in each new story's `play` (role lookups + `aria-pressed` assertions).
- All styling uses `cssVar()` tokens. The glass translucency, glass rim, and spotlight beam gradient are synthesized inline (no glass/gradient token exists) but every colour is a `cssVar()` reference composited via `color-mix(... transparent)`; only dimensionless/length literals (`1px`, `2px`, `0 0 8px`, percentages) are raw, matching the existing component's `40px`/`56px` precedent. `semantic.border` usage stays within `base|muted|strong|focus` (no invalid `subtle`).
- No new props introduced — both members are pure chrome re-skins driven by the existing `variant` prop and the existing `item.active` flag.
- Shared files (barrels, tokens, utils, sibling components) untouched.
