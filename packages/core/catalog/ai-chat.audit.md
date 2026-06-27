# AIChat — layout axis audit

- **Category:** pattern
- **Host:** `AIChat` (`packages/core/src/patterns/AIChat.tsx`)
- **Axis:** `layout` (`AIChatLayout` union / `data-bbangto-aichat-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `frosted` | variant | Pure-chrome treatment of the composer panel. Swaps the default opaque `background.elevated` fill + solid `border.muted` top border for a translucent glass plate: `backdrop-filter: blur(spacing.16)` (+ `-webkit-` prefix), a ~65% surface fill composited via `color-mix(in srgb, background.elevated 65%, transparent)`, and a 1px hairline top border via `color-mix(in srgb, border.base 12%, transparent)`. Only the composer chrome changes; the container skeleton, message-area, and a11y contract are identical to `default`. The unique distinguishing signal is the presence of `backdrop-filter: blur` + an alpha-bearing surface fill — no other layout alters the chrome material. |

## Tally

- **reviewed:** 12
- **absorbed:** 5
  - "glass-composer" → folded into `frosted` (the blur + translucent fill IS the frosted plate).
  - "translucent-input-bar" → folded into `frosted` (alpha surface is the same color-mix fill).
  - "hairline-composer" → folded into `frosted` (1px hairline border is part of the frosted chrome swap).
  - "blur-panel" → folded into `frosted` (backdrop blur is the load-bearing frosted signal).
  - "vibrancy-footer" → folded into `frosted` (macOS-vibrancy framing is the same `backdrop-filter` glass material, no skeleton delta).
- **noise:** 4
  - "rounded-composer" → noise: a `radius` token tweak on the existing composer, not a layout/chrome material change.
  - "shadow-composer" → noise: a `shadow` elevation tweak; no structural or material distinction.
  - "tight-composer" → noise: a `spacing` padding variation on the default composer.
  - "accent-border-composer" → noise: recolors the existing solid border with a `primary` token; still an opaque solid border, not a new chrome kind.
- **dropped:** 2
  - "gradient-composer" — dropped: a gradient surface is a colour-fill variation, not the glass/blur material that defines this axis member; it would duplicate `frosted`'s "non-opaque composer" slot without the load-bearing `backdrop-filter`.
  - "floating-composer" — dropped: detaches the composer into an absolutely-positioned floating bar — a positioning/skeleton change that belongs to a structural layout member, not the chrome-material axis piloted here; deferred to avoid mixing skeleton and chrome deltas in round 1.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `default` remains the first union value; `frosted` is appended to the end of `AIChatLayout`. Existing call sites/stories render unchanged (no container override for `frosted`; composer only gains chrome when `layout === 'frosted'`).
- Type exported from the component file; the barrel re-exports via `export *`.
- All colours/lengths are `cssVar()` references. The `backdrop-filter` blur and the translucent fills are synthesized inline via `color-mix` (no glass/alpha tokens exist), but every input colour is a `cssVar()` token (`background.elevated`, `border.base`) and the blur length is `spacing.16`.
- `semantic.border` only exposes `base`/`muted`/`strong`/`focus` — the hairline uses `border.base` (no `subtle`).
- a11y contract held: `role=log` + `aria-live` message list and composer focus/Enter-to-send are untouched; the Frosted story asserts the log role, textarea visibility, and Enter submission.
- Shared files (barrels, tokens, utils, sibling components) untouched.
