# Dialog (Modal) variant axis — saturation audit

- **Category:** organism / overlay
- **Host:** `Modal` (`packages/core/src/components/Modal.tsx`)
- **Axis:** `variant` (visual / structural family of the dialog surface)
- **Default-first anchor:** `popup` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Kind | Load-bearing treatment | Why irreducible to existing members |
|--------|------|------------------------|-------------------------------------|
| `side-sheet` | layout | Panel docks to the inline-end (right) viewport edge: overlay `align-items: stretch` + `justify-content: flex-end`; panel `block-size: 100vh` with `inline-size` capped by the `sm/md/lg` max-inline-size token (never full-width); enters via a **translateX** slide (`--bbangto-slide-x: 100%`, `--bbangto-slide-y: 0`) with `radius.xl` on the leading corners + `shadow.xl`. | `popup` centers a scale-in card; `full` is edge-to-edge with no slide; `bottom-sheet` docks to the **block-end** edge, is **full inline-size**, and enters on the **Y axis** (`--bbangto-slide-y: 100%`). A right-edge, token-capped, X-axis-sliding surface is a distinct anchor + slide-axis no existing member expresses. |

`side-sheet` composes color/space/elevation exclusively from existing tokens via
`cssVar()` (`semantic.background.base`, `semantic.foreground.base`, `radius.xl`,
`shadow.xl`, `motion.duration.normal`, `motion.easing.{in,out}`) and reuses the
host's existing `POPUP_MAX_WIDTH` cap + the shared `bbangto-slide-in/out`
keyframes. Layout uses only primitives (`vw`, `vh`, `%`) per the `Hero` precedent.
Legacy members (`popup`, `full`, `bottom-sheet`) keep their exact prior render.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 8
  - `drawer` → left/right edge drawer is the `side-sheet` layout (edge anchor differs only by side).
  - `right-panel` → inline-end docked panel == `side-sheet`.
  - `left-sheet` → mirror-side `side-sheet` (same anchor family, opposite inline edge).
  - `inspector` / `detail-pane` → persistent edge-docked side surface == `side-sheet`.
  - `action-sheet` → block-end docked list == `bottom-sheet`.
  - `sheet` → bare block-end sheet == `bottom-sheet`.
  - `fullscreen` → edge-to-edge surface == `full`.
  - `centered` / `dialog` → centered scale-in card == `popup` (default head).
- **noise:** 1
  - `wide` → an inline-size *magnitude*, i.e. the existing `size` (sm/md/lg) sub-axis, not a distinct chrome/layout family.
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `command-palette` — a composed search/list *feature* pattern (input + filtered results behavior), not a chrome/layout variant of the dialog surface; out of axis scope.
- **unreviewed:** 0 (= 12 − 12 reviewed)

Accounting closes: 1 adopted + 8 absorbed + 1 noise + 2 dropped = 12 reviewed.

## Notes

- New member appended to the union tail (`ModalVariant`); `popup` remains the
  default so every existing call site and story renders identically.
- Root panel now renders `data-bbangto-dialog-variant={variant}` for all variants
  (first canonical axis hook on this host), mirroring the
  `data-bbangto-popover-variant` / `data-bbangto-hero-layout` convention.
- a11y contract hardened so the new variant ships accessible without regressing
  the legacy ones: panel gains `tabIndex={-1}` and receives focus on open, focus
  returns to the previously focused element on close, `Tab`/`Shift+Tab` are
  trapped within the panel, and `Escape` dismisses (suppressed while `loading`).
  `role="dialog"` + `aria-modal="true"` retained. The `SideSheet` play asserts
  `aria-modal`, the heading/content slots, and `Escape` dismissal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var). `side-sheet` reuses the host's existing raw
  `POPUP_MAX_WIDTH` cap (the established max-inline-size pattern on this host)
  rather than introducing a new sizing token.
