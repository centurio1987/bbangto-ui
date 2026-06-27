# MapBlock — layout axis audit

- **Category:** block
- **Host:** `MapBlock` (`packages/core/src/blocks/MapBlock.tsx`)
- **Axis:** `layout` (`MapBlockLayout` union / `data-bbangto-mapblock-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `stacked` | layout | 2-row vertical grid (`grid-template-rows: auto 1fr`, single `1fr` column). A CENTRED text header band (title + muted `address` description) sits in the `auto` row on top; a full-bleed map media region fills the `1fr` row below. The map area carries NO card chrome — `border: none`, `border-radius: 0`, no elevation — which distinguishes it from `card`. The copy is stacked above, never beside, the map — distinguishing it from `split`. |

## Tally

- **reviewed:** 12
- **absorbed:** 1 — "framed-map" candidate folded into the existing `card` member (a bordered/rounded/elevated map frame is exactly `card`'s `radius.xl` + `border.strong` + `shadow.lg` treatment; no separate member warranted).
- **noise:** 2
  - "embedded" — not a layout member; describes the `embedSrc` iframe vs. placeholder render path, which is an existing prop concern orthogonal to the layout axis.
  - "with-markers" — not a layout member; describes the `markers` overlay feature (pin list), a content/data concern rather than a skeleton arrangement.
- **dropped:** 8
  - "split-reverse" — dropped: mirror of `split` with the info panel on the opposite side; a swap-order variant carries no load-bearing skeleton difference on a single-map host.
  - "sidebar" — dropped: composition-identical to `split` (map + adjacent info column); differs only by panel width, a styling concern not a member.
  - "hero-map" — dropped: duplicate of `stacked` (centred copy over a full-width map band); no distinct skeleton.
  - "fullscreen" — dropped: out of axis — a viewport/overlay sizing concern (100vh map) rather than an internal grid arrangement.
  - "floating-card" — dropped: positioning/behavioral variant (info card absolutely overlaid on the map); not a grid layout member and would fork the a11y region contract.
  - "grid-gallery" — dropped: out of scope — implies multiple map tiles, whereas the block models a single location.
  - "masonry" — dropped: not applicable to a single full-width map media region; no multi-item flow to pack.
  - "compact" — dropped: density/sizing concern (reduced min-height + padding), not a distinct skeleton; belongs to spacing tokens.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `full` remains the first union value and the `layout = 'full'` default is untouched — existing call sites/stories (`Default`, `WithEmbed`) render unchanged.
- New member `stacked` appended to the end of the `MapBlockLayout` union; type exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The full-bleed map drops chrome via `border: none` / `border-radius: 0` (absence of decoration, no raw colour/token values introduced).
- a11y contract held: the section keeps its `aria-labelledby` region label, the map area keeps its `aria-label`, and the placeholder keeps `role="img"`. The `stacked` play asserts data-attr, the 2-track row grid, the chrome-less border, and title/address slot render.
- Shared files (barrels, tokens, utils, sibling components) untouched.
