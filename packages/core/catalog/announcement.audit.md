# AnnouncementBar — variant axis audit

- **Category:** block
- **Host:** `AnnouncementBar` (`packages/core/src/blocks/AnnouncementBar.tsx`)
- **Axis:** `variant` (`AnnouncementBarVariant` union / `data-bbangto-announcementbar-variant`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `gradient` | variant | Pure-chrome fill swap: root paints a token-composited multi-stop `linear-gradient(120deg, primary.active → primary.base → primary.hover)`, drops the solid fill (`backgroundColor: transparent`) and the border (`border: none`). Opens a local stacking context (`isolation: isolate`) so an optional lattice `.bbangto-announcement-grid` overlay (`repeating-linear-gradient` grid in a `color-mix`-derived translucent line color) composites on a negative-z layer — above the gradient fill, below the icon·text·controls track. Track layout is preserved; only the fill treatment changes — distinct from the opaque solid `bar` fill. |
| `glass` | variant | Frosted material: translucent fill (`color-mix(in srgb, background.elevated 62%, transparent)`) + `backdrop-filter: blur(spacing.8)` (with `-webkit-` fallback), a 1px hairline ring `border` (`border.muted`), and a light `shadow.sm` elevation. Foreground text switches to `foreground.base` for legibility on the light translucent surface. A real material — distinct from the opaque fills / solid-on-primary surfaces of every other variant. |

## Tally

- **reviewed:** 9
- **absorbed:** 6 — folded into the two adopted members (no standalone member warranted):
  - "soft-gradient" / "vibrant-gradient" / "mesh-gradient" → all reduce to the `gradient` fill swap (stop list / angle is a `cssVar` payload tweak, not a skeleton difference).
  - "grid-overlay" / "pattern-overlay" → absorbed as the optional `.bbangto-announcement-grid` lattice on `gradient` (decorative negative-z layer, not its own member).
  - "frosted-card" → absorbed into `glass` (the translucent fill + blur + hairline ring already is the frosted treatment).
- **noise:** 1 — "gradient-border" candidate: a gradient applied only to the border ring with an opaque body; no track/skeleton change and no token-expressible gradient-border primitive — discarded as noise.
- **dropped:** 2
  - "solid-accent" — dropped: identical skeleton to the default `bar` (opaque fill, no border), differing only by which `cssVar` color fills it; that is a token/color concern, not a variant member.
  - "elevated-bar" — dropped: a shadow-only delta is already covered by `floating` (margin + `shadow.lg` detached pill); a standalone shadow member would duplicate it without a load-bearing surface difference.
- **unreviewed:** 0 (= 9 − 9 reviewed)

## Notes

- default-first preserved: `bar` remains the first union value and the default arg (`variant = 'bar'`); existing call sites/stories render unchanged. New members (`gradient`, `glass`) appended to the end of the union.
- `AnnouncementBarVariant` is exported from the component file; the barrel re-exports via `export *`.
- All styling uses `cssVar()` tokens. The gradient string, grid lattice, translucent fills and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference (translucency via `color-mix` over `cssVar` colours). `semantic.border` uses only valid steps (`muted`).
- a11y contract intact: `role="region"` + `aria-label="Announcement"` and the accessible, focusable dismiss control survive both new surface treatments; the grid overlay is `aria-hidden`. Verified in the `Glass` story play (region role + dismiss focus) and `Gradient` story play (decorative overlay hidden from AT).
- Shared files (barrels, tokens, utils, sibling components) untouched.
