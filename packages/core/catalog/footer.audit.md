# MarketingFooter — layout axis audit

- **Category:** block
- **Host:** `MarketingFooter` (`packages/core/src/blocks/MarketingFooter.tsx`)
- **Axis:** `layout` (`MarketingFooterLayout` union / `data-bbangto-marketingfooter-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `wordmark` | layout | An OVERSIZED full-bleed brand band rendered as its own full-width root track (`.bbangto-marketing-footer-wordmark`): `font-size: clamp(6rem, 12vw, 16rem)` floored at 6rem, `display` `fontWeight`/`lineHeight`/`letterSpacing` tokens for tight leading, uppercased, `white-space: nowrap` + `overflow: hidden`. Link columns are stacked ABOVE the band (`.bbangto-marketing-footer-columns`) and the social/copyright bottom bar is stacked BELOW it. The brand IS the band — distinct from the small inline logo slot the columns layout uses. Wordmark content comes from the new `wordmark` prop (falls back to `logo`). |
| `gradient` | variant | Chrome variant of the columns skeleton. Root surface is a multi-stop token-composited `linear-gradient(135deg, background.sunken → primary.subtle → background.elevated)` (with a `background.base` fallback) replacing the flat `background.sunken` fill — NO flat fill. An overlaid grid/dot pattern is painted inside an absolutely-positioned `overflow: hidden` wrapper (`.bbangto-marketing-footer-gradient-pattern`, `z-index: 0`) via a `radial-gradient` dot field (`border.muted` dots, `spacing.24` tile), sitting behind the content (inner lifted to `z-index: 1`). A top divider `border` (`border.muted`) is applied to the bottom bar. Distinct from the columns layout's flat sunken surface. |

## Tally

- **reviewed:** 12
- **absorbed:** 6
  - "big-type-footer" → folded into `wordmark` (an oversized brand headline is exactly the wordmark band).
  - "brand-band" → folded into `wordmark` (a full-width brand strip is the band's root track).
  - "marquee-brand" → folded into `wordmark` (band minus animation; the marquee scroll is a motion concern, not a layout skeleton).
  - "gradient-mesh" → folded into `gradient` (a mesh surface is just a multi-stop gradient + pattern overlay).
  - "dotted-grid-bg" → folded into `gradient` (the dot/grid pattern layer is already part of the gradient variant).
  - "aurora-footer" → folded into `gradient` (aurora = a gradient colour treatment, no skeleton difference).
- **noise:** 3
  - "dark-footer" — a pure theme/token swap; owned by the theme packages, not a layout member.
  - "newsletter-footer" — adds an email-capture form slot; a content/slot concern, not a layout skeleton axis.
  - "social-first-footer" — reorders the social row above the columns; an ordering tweak with no new skeleton.
- **dropped:** 1
  - "full-bleed-cta-footer" — dropped: overlaps the `CTA` block's responsibility (a footer-embedded call-to-action is a composition of `CTA` + footer, not a footer layout member); no load-bearing footer-skeleton difference.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `columns` remains the first union value and the `layout = 'columns'` default is untouched — existing call sites/stories render unchanged.
- New members (`wordmark`, `gradient`) appended to the END of the `MarketingFooterLayout` union; the type is exported from the component file (barrel re-exports via `export *`, untouched).
- All styling uses `cssVar()` tokens. The gradient strings, the radial dot pattern, and the `clamp()` band size are synthesized inline (no gradient/pattern/oversize tokens exist) but every colour/length is a `cssVar()` reference (only `vw`/`rem`/`%` sizing primitives and `opacity` are raw, matching the Hero precedent).
- `semantic.border` restricted to `base`/`muted`/`strong`/`focus` — the gradient divider and dot pattern use `border.muted` (no `subtle`).
- a11y contract intact: root stays a `contentinfo` `<footer>`, the `Footer navigation` `<nav>` + links + `Social links` list are preserved in both new members; plays assert the `contentinfo` landmark and keyboard focusability of a link.
- Shared files (barrels, tokens, utils, sibling components) untouched. The only new surface is the optional `wordmark` prop added to `MarketingFooterProps` in the component file itself.
