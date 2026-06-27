# VideoBlock — layout axis audit

- **Category:** block
- **Host:** `VideoBlock` (`packages/core/src/blocks/VideoBlock.tsx`)
- **Axis:** `layout` (`VideoBlockLayout` union / `data-bbangto-videoblock-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `grid-gallery` | layout | Root composites N square media tiles in a uniform CSS grid (`.bbangto-videoblock-gallery`): base `grid-template-columns: repeat(2, minmax(0, 1fr))` that reflows to `repeat(3, minmax(0, 1fr))` at ≥ `breakpoints.lg` via a scoped `<style>` rule, with a uniform `spacing.16` gap. Each tile is a `1 / 1` aspect-ratio slot (`radius.lg`, `background.sunken`, `overflow: hidden`) holding its own controlled `<video>` (sourced from the new `tiles` prop). Multi-media composition — distinct from the single-media axes `centered`/`split`/`background`/`framed`, which each place exactly one video. |

## Tally

- **reviewed:** 12
- **absorbed:** 4 — "masonry-grid", "thumbnail-strip", "mosaic-wall", and "filmstrip-row" candidates folded into `grid-gallery`: each is a uniform/near-uniform multi-tile reflow that the `gridTemplateColumns` + `gap` + tile aspect-ratio skeleton already expresses (column count / tile ratio are prop/token knobs, not new layout members).
- **noise:** 6 — "video-carousel" (carousel host concern), "lightbox-gallery" (dialog/overlay host concern), "picture-in-picture" (browser API state, not layout), "playlist-sidebar" (= `split` content slot), "autoplay-reel" (playback prop, not layout), "theatre-mode" (= `background` scrim + sizing).
- **dropped:** 2
  - "carousel-gallery" — dropped: a paginated/scroll-snapping track is a Carousel host axis, not a static reflow grid; would duplicate Carousel composition rather than add a VideoBlock skeleton.
  - "pinterest-masonry" — dropped: column-balanced masonry needs intrinsic per-item heights (variable row spans), which contradicts the uniform square-tile `grid-gallery` skeleton; no load-bearing addition over the absorbed uniform grid.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `centered` remains the first union value and the `layout = 'centered'` default is untouched — existing call sites/stories render unchanged.
- New member appended to the end of the `VideoBlockLayout` union; the member type is exported from the component file as `VideoBlockGalleryLayout` (barrel re-exports via `export *`).
- New optional `tiles?: string[]` prop drives the gallery tiles; it falls back to `[src]` so omitting it keeps existing callers unaffected. Ignored by every other layout.
- All styling uses `cssVar()` tokens (`spacing.16`, `radius.lg`, `semantic.background.sunken`); no raw values, no gradient/glass synthesis needed.
- a11y contract maintained: every tile `<video>` keeps `controls` + a `<track kind="captions">`; the `play` test asserts both on each tile.
- Shared files (barrels, tokens, utils, sibling components) untouched.
