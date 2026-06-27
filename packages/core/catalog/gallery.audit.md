# Gallery — layout axis audit

- **Category:** block
- **Host component:** `Gallery` (`packages/core/src/blocks/Gallery.tsx`)
- **Axis:** `layout` (`GalleryLayout` union)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `split-panel` | layout | Root inner is a 2-track grid (`1fr` mobile → `1fr 1fr` at ≥ lg via scoped `<style>`); one track is a text/CTA `panel` slot, the adjacent track is a media cluster (`repeat(2, 1fr)` 2x2 of bare full-cover cells). Split held level via `align-items: center` + column gap. Cells are bare — `border: none`, `box-shadow: none` (no card chrome). |

Existing members retained, default-first preserved: `grid` (default) · `masonry` · `carousel` · `featured`. New member appended at the end of the union; no existing call site or story render changes.

## Tally

- **reviewed:** 12
- **absorbed:** 7
- **noise:** 1
- **dropped:** 4
  - `bento` — overlaps existing `masonry` + `featured` emphasis grids; no distinct contract.
  - `lightbox-grid` — interaction/overlay axis, not a layout track arrangement; belongs to a separate behavior axis.
  - `fullbleed-mosaic` — edge-to-edge variant of `grid`; covered by `columns` + container width, not a new branch.
  - `polaroid-scatter` — decorative rotation/scatter requires non-token transforms and raw values; rejected to keep tokens-only contract.
- **unreviewed:** 0 (= 12 reviewed − 12 total surfaced)

## Notes

- a11y contract preserved: media cells render `<img alt>` via the shared `renderFigure`; carousel keyboard contract untouched (separate branch).
- Responsive 2-col uses Hero's scoped `<style>` + `breakpoints.lg` + `.bbangto-gallery-*` namespace pattern only.
- All styling via `cssVar()` tokens; no raw values. `panel?: React.ReactNode` prop added (optional, non-breaking).
