# Avatar — variant axis audit

- **Category:** component / atom
- **Host:** Avatar (`@centurio1987/core`)
- **Axis:** `variant` (border-treatment chrome)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Load-bearing spec |
|--------|-------------------|
| `plain` (default, first member) | Legacy single-surface render. No chrome change; preserves existing call sites/stories. |
| `gradient-ring` | Outer gradient frame acts as the ring (conic-gradient composed from `primary.base/hover`, `success.base`, `warning.base`); ring thickness via `spacing.3` padding; background-colored ring-offset gap (`background.base`, `spacing.1`) between gradient and inner content; **no solid border** — gradient is the ring. Not expressible via `shape` (circle/square) or `status` dot. |

## Survey ledger

- **reviewed:** 12
- **absorbed:** 4
  - `bordered` → covered by existing `shape` + token border, not a new axis member.
  - `outlined` → same as `bordered`; folds into solid-border treatment already reachable.
  - `elevated` (shadow ring) → expressible via `style`/`shadow` token override, not chrome-distinct.
  - `dot-status` → already the existing `status` dot axis.
- **noise:** 1
  - `fancy` → underspecified marketing label, no concrete border treatment.
- **dropped:**
  - `glass` (dropped — needs backdrop-filter + translucent surface tokens absent from token set; would require raw values beyond minimal gradient synthesis).
  - `image-frame` (dropped — decorative bitmap frame, not token-expressible chrome).
- **unreviewed:** 0 (= 12 reviewed − 12 surveyed)

## Notes

- New union member type `AvatarVariant` exported from `Avatar.tsx` (barrel re-exports via `export *`).
- Root hook: `data-bbangto-avatar-variant={variant}`.
- All colors via `cssVar()`; gradient synthesized from existing semantic tokens (no token primitive for gradients).
