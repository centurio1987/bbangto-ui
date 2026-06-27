# Carousel variant axis — saturation audit

- **Category:** molecule / disclosure-navigation
- **Host:** `Carousel` (`packages/core/src/components/Carousel.tsx`)
- **Axis:** `variant` (track/slide visual treatment)
- **Default-first anchor:** `flat` (newly introduced union head; reproduces the prior render exactly, so every existing call site and story is byte-for-byte unchanged)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `edge-fade` | `mask-image: linear-gradient(to right, transparent 0%, opaque 8%, opaque 92%, transparent 100%)` on the track; borderless continuous single track | The track edges physically dissolve via an alpha mask — neither `flat` (hard clipped edges) nor any indicator/size axis can express a feathered overflow boundary. |
| `media-overlay` | full-bleed media (`object-cover`) with an absolutely-positioned panel and a bottom `linear-gradient` scrim (opaque→transparent); no separate text row | A scrim-on-media composition layers content over imagery for legibility; `flat`/`elevated` are opaque card surfaces with no media bleed or gradient scrim. |
| `elevated` | filled `background` (background.elevated) + `box-shadow` (shadow.lg) lift + radius | A raised, detached card surface. `flat` has no fill/shadow; the lift is a distinct depth treatment, not reachable by border tweaks. |

All members compose color exclusively from existing tokens via `cssVar()`
(`semantic.foreground.base` for the mask/scrim alpha stops,
`semantic.background.elevated`, `shadow.lg`, `radius.md`). The mask and scrim
gradient strings are the only inline composition; their colors are token-derived
(no raw hex/rgba). `semantic.border.subtle` was deliberately avoided (undefined
in the contract — only base/muted/strong/focus exist).

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `borderless` (folds into `edge-fade`), `peek`/`carded-bleed` (fold into `media-overlay`'s bleed), `raised` and `floating` (fold into `elevated`'s shadow lift).
- **noise:** 2 — `glass` (needs `backdrop-filter` + a translucent surface token absent from the contract) and `parallax` (a scroll-motion behavior, not a static chrome family).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a glass surface token not present in `SemanticColors`; would force raw values.
  - `parallax` — depth motion tied to scroll position; orthogonal motion sub-axis, not a track/slide chrome.
  - `coverflow` — a 3D `perspective`/`rotateY` transform per slide; an orthogonal transform-geometry axis, out of scope for a chrome family.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `flat` is the default so the legacy
  single-track render is preserved for all existing stories/call sites.
- Root now renders `data-bbangto-carousel-variant={variant}`, following the
  existing `data-bbangto-carousel-*` hook convention (`-size`, `-fade`,
  `-track`, `-indicator`). Per-slide hook `data-bbangto-carousel-slide` and the
  `data-bbangto-carousel-scrim` element were added for stable test targeting.
- **a11y contract:** root now carries `role="region"` +
  `aria-roledescription="carousel"` + `aria-label`, and `ArrowLeft`/`ArrowRight`
  keyboard navigation was added on the root (additive — does not alter any
  existing variant's render or assertions). New variants inherit and preserve
  this contract; each variant story verifies role/aria-roledescription and
  keyboard movement.
