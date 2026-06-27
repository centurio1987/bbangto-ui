# Toggle audit — Switch `variant` axis

- **Category:** toggle / boolean-control chrome
- **Host component:** `Switch` (`packages/core/src/components/Switch.tsx`)
- **Axis:** `variant` (track chrome treatment)

## Default-first invariant

The `variant` union leads with `solid`, which reproduces the legacy
filled-pill render byte-for-byte. `variant` defaults to `solid`, so every
existing caller and story keeps its current output. New members append to the
end of the union.

## Adopted members

| Member    | Load-bearing distinction                                                                                 |
|-----------|----------------------------------------------------------------------------------------------------------|
| `solid`   | (default, pre-existing) Filled-pill: track fills with `semantic.primary.base` when on.                    |
| `outline` | Chrome shifts from fill to border: transparent track + `1px solid` border; on-state signalled by accent `semantic.primary.base` border-color plus a subtle `color-mix` tint (`primary.base 18% / transparent`) instead of a full track fill. |

## Pilot saturation accounting

- **Reviewed:** 12 candidate toggle treatments
- **Absorbed:** 4 (folded into existing axes — e.g. label/size/loading/disabled already cover these; not new variants)
- **Noise:** 4 (cosmetic restyles with no stable, testable computed-style signal)
- **Dropped:**
  - `gradient-track` — dropped: requires a multi-stop gradient with no semantic token backing; redundant with `solid` accent fill for a boolean control.
  - `glass` — dropped: backdrop-filter/blur has no token and no stable cross-engine computed-style assertion.
  - `inset-shadow` — dropped: relies on raw shadow geometry; the `shadow` tokens do not express an inset and it is not load-bearing for on/off state.
  - `neon` — dropped: glow chrome belongs to interactive press affordances (Button), not a switch track; on-state is already legible via border accent.
- **Unread (not yet examined):** 0  (= 12 reviewed − 12 reviewed; all 12 candidates were reviewed in this round)
- **Saturation rounds:** 1 (pilot)

## Tokens used (no raw values)

- `semantic.primary.base` — on-state accent border + knob tint + `color-mix` source
- `semantic.border.base` — off-state outline border + knob tint
- `motion.duration.normal` / `motion.easing.default` — background-color + border-color transition
- `color-mix(in srgb, …)` — subtle on-state track tint, composed purely from `cssVar` colors (no token literal)

## Notes

- `semantic.border` exposes only `base | muted | strong | focus` (no `subtle`),
  so the off-state outline uses `border.base`; `solid`'s off border keeps its
  original `border.strong`.
- Root hook: `data-bbangto-toggle-variant={variant}` on the `<label>` root.
