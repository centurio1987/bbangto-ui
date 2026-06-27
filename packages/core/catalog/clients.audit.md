# Clients / LogoCloud — layout axis audit

- **Category:** block
- **Host:** `LogoCloud` (`packages/core/src/blocks/LogoCloud.tsx`)
- **Axis:** `layout` (`LogoCloudLayout` union / `data-bbangto-logocloud-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `scroll-columns` | layout | Root viewport is a horizontal flex of N (=3) VERTICAL flex tracks (multi-column). Each column owns a `translateY` infinite loop in alternating up/down directions (`bbangto-logocloud-scroll-up` / `-scroll-down` keyframes) with a per-column staggered `animation-duration` (`18s + col*4s`). The fixed-height viewport clips with `overflow: hidden` and fades its top/bottom edges via a vertical `mask-image: linear-gradient(transparent → opaque → opaque → transparent)` (opaque stops composited from `foreground.base`; mask alpha-only). `border: none`. Hover pauses all tracks; reduced motion freezes every column to a static set and hides clones. Distinct from `marquee` by a vertical track direction and a changing column count (structural reflow), not a restyle of the single horizontal row. |

## Tally

- **reviewed:** 12
- **absorbed:** 6 — folded into `scroll-columns` (no separate member warranted):
  - "vertical-marquee" — a single upward column is `scroll-columns` with N=1; the column-count knob already covers it.
  - "two-column-ticker" — same skeleton at N=2; column count is a parameter, not a member.
  - "wall-of-logos" — a dense auto-scrolling grid is the multi-column track set viewed at higher density.
  - "alternating-scroll" — up/down direction alternation is already the per-column default of this member.
  - "edge-fade-rail" — the vertical mask gradient is an intrinsic part of this member's viewport, not a standalone layout.
  - "infinite-vertical" — the seamless `translateY(-50%)` clone loop is this member's core mechanism.
- **noise:** 4
  - "logo-carousel" — paged/snap navigation belongs to the `Carousel` host, not a LogoCloud layout.
  - "hover-zoom-grid" — a per-cell hover affordance (already present as the grayscale/opacity transition), not a layout skeleton.
  - "tooltip-on-logo" — overlay/tooltip concern, orthogonal to logo arrangement.
  - "click-to-filter" — interactive filtering is application state, not a layout member.
- **dropped:** 1
  - "diagonal-scroll" — dropped: a diagonal drift is `scroll-columns` plus a cosmetic `translateX` skew with no skeleton (track-count / track-direction) difference; it would duplicate the vertical loop while harming readability and reduced-motion clarity.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `grid` remains the first union value and the default (`layout = 'grid'`), so existing call sites and stories render unchanged.
- New member appended to the end of the `LogoCloudLayout` union; a standalone `LogoCloudScrollColumnsLayout` alias is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The vertical mask gradient is synthesized inline (no gradient token exists) but its opaque stops reference `cssVar('semantic','foreground','base')`; mask uses alpha only, so the colour choice is non-load-bearing.
- a11y contract preserved: the masked viewport is the `role="list"`; logo cells keep `role="listitem"`; presentational column wrappers (`role="presentation"`) keep listitems as effective list members; clone sets are `aria-hidden` + `role="presentation"`; `img alt` is untouched.
- Shared files (barrels, tokens, utils, sibling components) untouched.
