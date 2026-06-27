# SignIn — layout axis audit

- **Category:** pattern
- **Host:** SignIn (`packages/core/src/patterns/SignIn.tsx`)
- **Axis:** `layout` (`SignInLayout` union)
- **Saturation round:** 1 (pilot)

## Existing members (default-first, unchanged)

`centered` (default) · `split` · `minimal` · `social-first`

## Adopted member(s) this round

| Member | Load-bearing spec |
|--------|-------------------|
| `media-backdrop` | Full-bleed media layer on the root (`position:absolute; inset:0; object-fit:cover`) sourced from `marketingPanel` (or a default). The form floats above it as a centred **frosted** card: `backdrop-filter: blur()`, a translucent token surface (`color-mix(... background.base ... transparent)`) and a 1px `border.base` hairline, lifted onto an overlay z-stack (`zIndex:1`) over the `zIndex:0` backdrop. Distinct from `split`: the media is a front backdrop, not a grid column; the form is composited over it instead of beside it. |

## Survey ledger

- **reviewed:** 12
- **absorbed:** 6 — collapsed into existing/adopted members rather than added as new:
  - `hero-image` / `cover-photo` / `photo-side` → folded into `media-backdrop` (backdrop media).
  - `glass-card` / `frosted` → folded into `media-backdrop` (frosted overlay treatment).
  - `two-column` → already covered by existing `split`.
- **noise:** 2 — out-of-axis, not layout:
  - `dark` (theme/color axis, not layout).
  - `compact-spacing` (density axis, not layout).
- **dropped:** 2
  - `video-hero` — dropped: requires autoplay/muted media plumbing + reduced-motion contract beyond a static backdrop; reuse `media-backdrop` with a video node slotted into `marketingPanel` instead of a dedicated member.
  - `carousel-bg` — dropped: introduces stateful slideshow logic (timers, indices) that does not belong on a sign-in pattern's layout axis.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Adopted count this round

1 (`media-backdrop`)

## Notes

- Data hook follows the host's existing convention `data-bbangto-signin-layout` (NOT `data-bbangto-sign-in-layout`) to stay consistent with the already-shipped axis hook.
- All colours are token-derived; the translucent surface uses `color-mix()` over `semantic.background.base` (no raw rgba literals).
