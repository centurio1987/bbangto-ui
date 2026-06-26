# Textarea — variant axis audit

- **Category:** molecule / form control
- **Host component:** `Textarea` (`packages/core/src/components/Textarea.tsx`)
- **Axis:** `variant` (visual surface treatment of the textarea field)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `soft` | variant | Field drops its resting outline ring and sits flush inside one filled, rounded, subtly elevated surface. Chrome = filled background (`semantic.background.sunken`), `border: none` (no ring), larger radius (`radius.lg`), subtle elevation (`shadow.sm`). Distinct from `default`'s bare bordered field (`background.elevated` + 1px `border.base` + `radius.md`, no shadow). |

`variant` is a newly introduced axis. Its first member `default` reproduces the
pre-existing bordered field exactly, so every existing call site/story renders
unchanged (default-first). New member `soft` appended at the union tail.

## Tally

- **reviewed:** 12
- **absorbed:** 5
- **noise:** 1
- **adopted:** 1 (`soft`)
- **unreviewed:** 0 (= 12 − 12 reviewed)

### absorbed (5) — collapsed into existing/adopted members
- `filled` → same as `soft` (sunken fill + borderless); folded in.
- `elevated-card` → `soft` already carries the rounded + box-shadow elevation; no separate branch.
- `flush` → "borderless flush field" is exactly `soft`'s no-ring intent.
- `subtle` → resting-tone fill identical to `soft`'s sunken surface.
- `bordered` → duplicate of the existing `default` field; nothing new.

### noise (1)
- `quiet` → vague label with no load-bearing structural delta over `default`/`soft`.

### dropped
| Member | Reason |
|--------|--------|
| `glass` | Requires backdrop-filter / translucency tokens absent from the theme contract. |
| `gradient` | Needs a gradient surface; would force raw color synthesis beyond the field's purpose. |
| `underline` | Cross-axis border-edge treatment; better as its own axis, not a surface `variant`. |
| `floating-label` | Label-behaviour axis, not a surface treatment. |
| `inset-ring` | Pure focus-ring tweak, no resting structural change over `default`. |

## Notes
- All `soft` styling uses `cssVar()` tokens only (`semantic.background.sunken`, `radius.lg`, `shadow.sm`; error path reuses `semantic.error.base`). No raw values.
- `semantic.border` only exposes base/muted/strong/focus (no `subtle`) — confirmed; `soft` avoids border tokens entirely except the error border.
- Root hook `data-bbangto-textarea-variant={variant}` follows the existing axis-hook convention (cf. `data-bbangto-button-variant`).
- Error state is preserved in `soft` via a 1px `error.base` border for a11y, overriding the borderless resting look only when `error` is set.
