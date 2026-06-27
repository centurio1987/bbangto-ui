# PricingSection — layout axis audit

- **Category:** block
- **Host:** `PricingSection` (`packages/core/src/blocks/PricingSection.tsx`)
- **Axis:** `layout` (`PricingSectionLayout` union / `data-bbangto-pricingsection-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `single-panel` | layout | Root body is a SINGLE centered, self-contained panel — `max-width: 420px` + `margin: 0 auto`, a block (NOT a `repeat(...)` grid track). One plan (highlighted, falling back to the first) renders as a vertical stack of slots: header → price → grouped feature list → CTA pinned at base (`.bbangto-pricingsection-single-panel`). Skeleton-distinct from `cards`/`compact` (multi-tier `auto-fit` grid) and `featured` (flanking row). |
| `frosted-gradient` | variant | Card chrome = `backdrop-filter: blur(spacing.12)` + translucent fill (`color-mix(... background.elevated 60%, transparent)`) floated over a token-composited `linear-gradient` root surface (`primary.subtle → background.base → primary.base`), with `border: none`. Relies on elevation-via-blur (`shadow.lg` + glass) instead of a solid border or flat fill — distinct from `cards` (opaque flat fill + 1px border). |

## Tally

- **reviewed:** 12
- **absorbed:** 6
  - "hero-plan" → folded into `single-panel` (a single emphasized plan IS the single centered panel; no separate skeleton).
  - "centered-solo" → `single-panel` (centering + max-width constraint is the same panel composition).
  - "glass-cards" → `frosted-gradient` (translucent backdrop-blur cards are exactly this variant's chrome).
  - "gradient-backdrop" → `frosted-gradient` (the gradient root surface is part of this variant; not an independent member).
  - "blurred-tiers" → `frosted-gradient` (blur-on-tiers is the same backdrop-filter chrome over the existing card row).
  - "elevated-glass" → `frosted-gradient` (elevation-via-blur + translucency is the variant's defining trait, no extra skeleton).
- **noise:** 0
- **dropped:** 4
  - "accordion-pricing" — dropped: collapses plans into an expand/collapse stack; that is a disclosure-interaction axis, not a visual `layout` arrangement of the same plan set.
  - "toggle-billing" — dropped: monthly/annual switch is a data/state concern (price payload), not a layout skeleton; belongs to props, not a layout member.
  - "carousel-plans" — dropped: a swipeable single-visible track is a carousel-interaction concern; overlaps the existing Carousel block rather than a PricingSection layout.
  - "two-column-split" — dropped: composition-identical to the existing `auto-fit` `cards`/`compact` grid at a 2-plan count (see the `TwoPlans` story); no load-bearing skeleton difference.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `cards` remains the first union value and the `layout = 'cards'` default is untouched — existing call sites/stories (`Default`, `TwoPlans`) render unchanged.
- New members appended to the END of the `PricingSectionLayout` union; the type is exported from the component file (barrel re-exports via `export *`).
- a11y contract held: both new members keep the heading + price comparison semantics — `single-panel` keeps `role="list"`/`listitem`, the plan heading, the `aria-label`'d feature list, and the CTA; `frosted-gradient` reuses the unchanged `CardRow`/`PlanCard` structure (chrome-only change). Each play function re-asserts the role/heading/CTA.
- All styling uses `cssVar()` tokens. The gradient string, `color-mix` translucency, and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference. `semantic.border` was not used with `subtle` (it has no token).
- Shared files (barrels, tokens, utils, sibling components) untouched.
