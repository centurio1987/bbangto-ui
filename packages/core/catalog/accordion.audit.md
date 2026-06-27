# Accordion — variant axis audit

- **Category:** molecule (component)
- **Host:** `Accordion` (`packages/core/src/components/Accordion.tsx`)
- **Axis:** `variant` (`AccordionVariant` union / `data-bbangto-accordion-variant`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `split-media` | layout | Root reflows from a single column (`1fr`) to a 2-track grid (`minmax(0,1fr) minmax(0,0.85fr)` = accordion-list \| media-panel) once active. The synced right panel renders the `media` slot only while expanded (panel swaps on expand). Scoped `<style>` (`.bbangto-accordion-split`, `breakpoints.lg`) carries the responsive column-gap + reduced-motion fallback. Distinct from `separated` (still single-column) — the *grid reflow* is the skeleton difference. |
| `neobrutalist` | variant | Per-item: thick solid border (`spacing.2` ≈ 2px, `border.strong`) + hard offset box-shadow (`spacing.4 spacing.4 0 0`, zero blur, `foreground.base`) + flat `background.base` fill + sharp `radius.none` corners. Elevation comes from the token-driven offset, not a blur radius. Distinct from `bordered`/`separated`, whose elevation is a 1px hairline + rounded radius. |
| `horizontal-panels` | layout | Root becomes a horizontal flex track (`flex-direction: row`). The single panel is a collapsed `flex-basis: spacing.48` strip carrying a token-composited `linear-gradient` background-image (`background-size: cover`) + an `background.overlay` scrim; it expands via `flex-grow: 1` to reveal content. Title rail is vertical (`writing-mode: vertical-rl`) while collapsed. Distinct from every vertical variant — the axis of expansion is horizontal. |

## Tally

- **reviewed:** 12
- **absorbed:** 8
  - "accordion-with-thumbnail" → folded into `split-media` (a leading thumbnail is the same synced `media` surface; no separate member).
  - "preview-pane" → `split-media` (right preview panel is the media track).
  - "image-reveal" → `split-media` (image revealed on expand = panel swap).
  - "brutalist-card" → `neobrutalist` (same thick-border + hard-shadow skeleton).
  - "hard-shadow" → `neobrutalist` (zero-blur offset shadow is the defining trait already captured).
  - "sharp-outline" → `neobrutalist` (sharp `radius.none` + heavy border subset).
  - "filmstrip" → `horizontal-panels` (horizontal flex strips with cover media = same skeleton).
  - "image-accordion" → `horizontal-panels` (collapsed cover strips expanding via flex-grow).
- **noise:** 0
- **dropped:** 1
  - "stepper-accordion" — dropped: a numbered sequential-step affordance is a content/ordinal concern (badge + ordering), not a distinct container skeleton; adds no grid/flex/border reflow beyond the existing `bordered` variant.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `bordered` remains the first union value and the `variant = 'bordered'` default is untouched — existing call sites and the `Default`/`Multiple`/`Flush*`/`Separated`/size stories render byte-identical.
- New members appended to the end of the `AccordionVariant` union; each member literal is also exported as a named type (`AccordionVariantSplitMedia`, `AccordionVariantNeobrutalist`, `AccordionVariantHorizontalPanels`) from the component file (barrel re-exports via `export *`).
- a11y contract maintained across all variants: header keeps `role="button"` + `aria-expanded` + `aria-controls`, content region keeps its `id`, and Enter/Space keyboard toggle is unchanged (header is the shared `headerEl`). Verified in each new story's `play`.
- All styling uses `cssVar()` tokens. The horizontal panel gradient is synthesized inline (no gradient token exists) but every colour/length is a `cssVar()` reference; border-width and shadow offset use `spacing` tokens.
- One additive optional prop introduced: `media?: React.ReactNode` (default `undefined`) — non-breaking, consumed only by `split-media` and `horizontal-panels`.
- Shared files (barrels, tokens, utils, sibling components) untouched.
