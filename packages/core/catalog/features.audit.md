# FeatureGrid — Layout Axis Audit

- **Category:** blocks (section/organism)
- **Host:** `FeatureGrid` (`packages/core/src/blocks/FeatureGrid.tsx`)
- **Axis:** `layout` (`FeatureGridLayout` union)
- **Saturation round:** 1 (pilot)

## Pre-existing members (default-first preserved)

`grid` (default) · `alternating` · `list` · `bento`

## Adopted this round (with load-bearing spec)

- **`panel-showcase`** (layout) — 2-track split grid: a vertical stack of
  selectable header rows (active row marked by underline + fill + left border)
  on one side + a SINGLE shared media/content panel on the other that swaps to
  the active item. Load-bearing: only one shared media slot synced to selection
  (`data-bbangto-featuregrid-panel`, exactly one), vs grid/alternating which
  carry per-item media; responsive `1fr 1.6fr` split at ≥ lg via scoped
  `<style>`; ARIA tablist/tab/tabpanel contract.
- **`stacked-deck`** (layout) — overlapping cards placed on a shared CSS
  `grid-area` (single stack cell) with incremental translate-x/translate-y
  offsets and z-index layering to fan the deck; rounded border + semi-transparent
  surface (color-mix synthesised from `background.elevated`) per card.
  Load-bearing: cards occupy the same cell (`grid-area: 1 / 1`) and overlap —
  NOT a flow grid.

## Tally

| metric | count |
|--------|-------|
| reviewed | 12 |
| adopted | 2 |
| absorbed | 5 |
| noise | 3 |
| dropped | 2 |
| unreviewed (12 − reviewed) | 0 |

### Absorbed (5) — already expressible by an existing member

- `masonry` → covered by `bento` mixed-span.
- `cards` → plain `grid` (default) already renders outlined cards.
- `two-column` → `grid` with 2-track intrinsic minmax.
- `feature-list` → `list`.
- `zigzag` → `alternating`.

### Noise (3) — not a layout-axis concern

- `with-icons` (content/prop concern, not arrangement).
- `dark` (theme/token concern).
- `compact` (density/spacing prop, orthogonal to layout).

### Dropped (2) — name + reason

- `carousel` — dropped: requires autoplay/scroll-snap + paging controls; a
  motion/navigation widget, out of scope for a static layout axis.
- `accordion` — dropped: collapse/expand disclosure interaction belongs to a
  dedicated Accordion component, not a FeatureGrid layout.

## Notes

- Data hook follows the existing axis convention
  `data-bbangto-featuregrid-layout={layout}` (not a new `data-bbangto-features-*`).
- All colours/spacing/radius from `cssVar()` tokens; `border.subtle` avoided
  (undefined var) — used `border.base`/`border.strong`. Semi-transparent deck
  surface synthesised via `color-mix` over a token colour (no glass token).
