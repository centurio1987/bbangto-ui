# Input — variant axis audit

- **Category:** atom / form control
- **Host component:** `Input` (`packages/core/src/components/Input.tsx`)
- **Axis:** `variant` (visual / layout treatment of the bordered wrapper)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `composer-panel` | layout | Root reflows from single-line input track to a flex-column 2-row panel: borderless field stacked above a justify-end action row. Chrome = rounded elevated panel (`radius.lg`, 1px `border.base`, `shadow.md` elevation, inner padding) wrapping both rows, with a circular (`radius.full`) icon action button anchored trailing-bottom. |

Existing members (`outline` default, `filled`, `underline`, `ghost`) were left untouched — default-first preserved.

## Tally

- **reviewed:** 10
- **absorbed:** 3
- **noise:** 0
- **adopted:** 1 (`composer-panel`)
- **unreviewed:** 0 (= 10 − 10 reviewed)

### absorbed (3) — collapsed into existing/adopted members
- `chat-input` → folded into `composer-panel` (same 2-row elevated panel + trailing send affordance).
- `search-bar` → already expressible via `outline` + `leftIcon`/`rightIcon`; no new branch.
- `inset-fill` → duplicate of existing `filled` (sunken background, transparent border).

### dropped
| Member | Reason |
|--------|--------|
| `gradient-border` | Needs a gradient border token absent from the contract; would require raw inline color synthesis beyond cssVar scope. |
| `glass` | Requires backdrop-filter/translucency tokens not in the theme contract. |
| `floating-label` | Cross-axis (label behaviour), not a wrapper `variant`; belongs to a separate `labelMode` axis. |
| `pill` | Pure radius tweak, no load-bearing structural change over `outline`. |
| `segmented` | Multi-field composite, out of scope for a single `Input` element. |

## Notes
- All composer styling uses `cssVar()` tokens only (`radius.lg`/`radius.full`, `shadow.md`, `semantic.border.base`, `semantic.background.elevated`, `semantic.primary.base`/`foreground`, `spacing.*`). No raw values.
- `semantic.border.base` used for the resting panel border (note: `border.subtle` does NOT exist in the contract — only base/muted/strong/focus).
- Root hook `data-bbangto-input-variant="composer-panel"` follows the existing axis convention.
