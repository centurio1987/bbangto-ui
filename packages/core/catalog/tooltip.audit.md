# Tooltip variant axis — saturation audit

- **Category:** atom / overlay
- **Host:** `Tooltip` (`packages/core/src/components/Tooltip.tsx`)
- **Axis:** `variant` (visual chrome family of the bubble)
- **Default-first anchor:** `dark` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `elevated` | surface fill (`semantic.background.elevated`), `border: none` (hairline removed), soft drop-shadow elevation (`shadow.lg`); arrow inherits the same fill | `dark`/`light`/`error` are all flat-fill + `1px` hairline-border. `elevated` swaps the border for a floating-card drop-shadow — a chrome the border-based members cannot express. |

`elevated` composes color exclusively from existing tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.foreground.base`, `shadow.lg`). No raw
values; `boxShadow` stays `undefined` for the legacy members so their render is
untouched.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5
  - `raised` → folds into `elevated`'s `shadow` elevation.
  - `floating` → identical drop-shadow card; same chrome as `elevated`.
  - `card` → surface fill + shadow == `elevated`.
  - `popover` → overlay surface + shadow == `elevated`.
  - `surface` → flat surface fill already covered by `light`.
- **noise:** 4
  - `bordered` → border-style variation only; an orthogonal sub-axis, not a chrome family.
  - `rounded` → radius sub-axis, not a fill/chrome family.
  - `shadow-sm` → elevation magnitude; a sub-axis of `elevated`, not a new member.
  - `inverse` → color sub-axis (foreground/background swap), not a chrome family.
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `gradient` — multi-stop gradient is a fill family already owned by `Button`'s axis; not a distinct tooltip chrome and forces inline color synthesis without payoff here.
- **unreviewed:** 0 (= 12 − 12 reviewed)

Accounting closes: 1 adopted + 5 absorbed + 4 noise + 2 dropped = 12 reviewed.

## Notes

- New member appended to the union tail; `dark` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-tooltip-variant={variant}` (first axis hook on
  this host; future axes should follow the same `data-bbangto-tooltip-*`
  convention, mirroring `data-bbangto-button-variant`).
- a11y contract preserved: `role="tooltip"` overlay with hover/focus parity is
  unchanged; the `Elevated` story asserts both hover- and focus-reveal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var); `elevated` removes the border outright instead.
