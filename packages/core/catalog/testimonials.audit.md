# Testimonials — layout axis audit

- **Category:** block
- **Host:** `Testimonials` (`packages/core/src/blocks/Testimonials.tsx`)
- **Axis:** `layout` (`TestimonialsLayout` union)
- **Saturation round:** 1 (pilot)

## Existing members (default-first, unchanged)

`grid` (default) · `carousel` · `single` · `masonry`

The first union value (`grid`) remains the default, so every existing call
site and story renders identically. New members are appended to the end of
the union.

## Adopted this round (2)

### `split-media` (load-bearing)
- Two-track grid: single column on mobile, promoted to two media-dominant
  tracks (`5fr 4fr`) at the `lg` breakpoint via a scoped `<style>` `@media`
  rule (`.bbangto-testimonials-split`).
- One track is a dominant portrait media panel (`aspect-ratio: 4 / 5`,
  `.bbangto-testimonials-media`, token-composited backing surface); the other a
  stacked column carrying the active quote card, author meta and prev/next
  controls.
- Exactly one testimonial is in view (driven by `activeIndex` state) — a
  single-item showcase rather than a multi-card arrangement.
- **Load-bearing styles:** two-track `grid-template-columns` (scoped, `lg`) +
  `aspect-ratio` portrait media panel; single blockquote in view.

### `stacked-deck` (load-bearing)
- Single fixed-size relative container (`.bbangto-testimonials-deck`); the
  leading cards are `position:absolute` and overlap as a depth stack
  (front / middle / back).
- Depth via `translateY` + `scale` offset per card and a descending `z-index`
  (30 / 20 / 10); not a horizontal track.
- **Load-bearing styles:** `position:absolute` cards, descending `z-index`,
  `translateY`/`scale` transform offset on receding cards.

## Counts

- **Reviewed:** 12
- **Adopted:** 2 (`split-media`, `stacked-deck`)
- **Absorbed:** 7
- **Noise:** 2
- **Dropped:** 1
- **Unreviewed:** 0 (= 12 − 12 reviewed)

### Absorbed (7) — already covered by an existing member
1. `two-column-grid` → existing `grid` (auto-fit `minmax`).
2. `logo-wall` → existing `grid` / `masonry`.
3. `centered-quote` → existing `single`.
4. `slider` → existing `carousel`.
5. `scroll-snap-rail` → existing `carousel`.
6. `featured-plus-grid` → composition of `single` + `grid`.
7. `masonry-columns` → existing `masonry`.

### Noise (2) — off-axis (not a layout arrangement)
1. `auto-rotating-video-bg` → autoplay background media; a media/motion concern,
   not a layout track arrangement.
2. `marquee-ticker` → infinite marquee scroll; belongs to the motion axis.

### Dropped (1)
1. `twitter-embed-cards` → depends on third-party embed/iframe widgets; outside
   the token + first-party component scope of this block.
