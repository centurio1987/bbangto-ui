# Hero — layout axis audit

- **Category:** block
- **Host:** `Hero` (`packages/core/src/blocks/Hero.tsx`)
- **Axis:** `layout` (`HeroLayout` union / `data-bbangto-hero-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `stacked-showcase` | layout | Single-column stack: centred headline + subhead + CTA on top, then a DEDICATED full-width media slot anchored below (`.bbangto-hero-showcase`) with `radius.xl` corners, `shadow.lg` elevation, and `overflow: hidden` to clip media. Media-below composition — distinct from `centered` (no media slot), `split-media` (side-by-side column), and `background-media` (media behind content). |
| `gradient-surface` | variant | Root surface fills with a token-composited `linear-gradient` (`primary.subtle → background.base → primary.base`), `border: none`, no media layer. Centred copy floats on an inner blurred glass panel (`backdrop-filter: blur` + `radius.xl` + `spacing.40` padding). Pure chrome treatment — distinct from `background-media`, which requires a media/image/video layer. |

## Tally

- **reviewed:** 10
- **absorbed:** 1 — "elevated-media-card" candidate folded into `stacked-showcase` (a card-framed media band is just the stacked slot's `radius.xl` + `shadow.lg` treatment; no separate member warranted).
- **noise:** 0
- **dropped:** 2
  - "glassmorphism-hero" — dropped: pure chrome subset of `gradient-surface` (its glass panel already carries the `backdrop-filter` blur); a standalone member would duplicate the gradient surface without a load-bearing skeleton difference.
  - "video-background-hero" — dropped: composition-identical to existing `background-media` (absolutely positioned full-bleed media layer + scrim); differs only by media payload (video vs image), which is a `media` prop concern, not a layout member.
- **unreviewed:** 0 (= 10 − 10 reviewed)

## Notes

- default-first preserved: `centered` remains the first union value and the media-derived default (`media ? 'split-media' : 'centered'`) is untouched — existing call sites/stories render unchanged.
- New members appended to the end of the `HeroLayout` union; type exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The gradient string and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference.
- Shared files (barrels, tokens, utils, sibling components) untouched.
