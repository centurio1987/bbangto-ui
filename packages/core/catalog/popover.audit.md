# Popover variant axis — saturation audit

- **Category:** molecule / overlay
- **Host:** `Popover` (`packages/core/src/components/Popover.tsx`)
- **Axis:** `variant` (visual / structural family of the panel)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Kind | Load-bearing treatment | Why irreducible to existing members |
|--------|------|------------------------|-------------------------------------|
| `sheet` | layout | Panel detaches from the trigger and docks to a viewport edge (`position: fixed`); docked edge drives the full-bleed axis (100% width top/bottom, 100% height left/right) capped by a max dimension; top drag-handle bar + slide-in transform from the docked edge; vertical flex stack (header/body/footer). | `default`/`filled` are trigger-anchored floating panels (`position: absolute`). A viewport-docked, full-bleed, edge-sliding surface is a structural layout no anchored member can express. |
| `arrow` | variant | A token-filled square rotated 45° on the panel edge nearest the trigger; its two outward edges carry the panel's hairline border and its fill matches the surface, so the caret reads as one continuous pointer. Panel keeps its border + box-shadow. | `default`/`filled` have no directional pointer connecting panel to trigger. The caret notch is additive chrome the flat members lack. |
| `elevated` | variant | Borderless opaque surface (`border: none`) relying purely on `shadow.lg` elevation — no 1px hairline, no outline ring. | `default`/`filled` are border-bounded surfaces. `elevated` swaps the hairline for a floating drop-shadow — a chrome the border-based members cannot express. |

All three compose color exclusively from existing tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.primary.subtle`, `semantic.border.muted`,
`semantic.border.strong`, `shadow.lg`, `radius.*`, `spacing.*`, `zIndex.popover`).
No raw design-token values; only layout primitives (`%`, `vw`, `rem` caps) per the
`Hero` precedent. Legacy members (`default`, `filled`) keep their exact prior render.

## Candidate accounting (10 surveyed)

- **reviewed:** 10
- **absorbed:** 3
  - `bottom-sheet` → a docked-edge variant of `sheet` (the `position` prop already selects the edge).
  - `side-drawer` → left/right dock is the same `sheet` layout via `position="left|right"`.
  - `floating` / `card` → borderless drop-shadow surface == `elevated`.
- **noise:** 1
  - `shadow-lg` → elevation *magnitude*; a sub-axis of `elevated`, not a distinct chrome family.
- **dropped:**
  - `glass` — needs `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `gradient` — multi-stop fill family already owned by `Button`'s axis; not a distinct popover chrome and forces inline color synthesis without payoff here.
  - `bordered` — border-style variation only (an orthogonal sub-axis), not a fill/chrome family; `default` already carries the hairline.
- **unreviewed:** 0 (= 10 − 10 reviewed)

Accounting closes: 3 adopted + 3 absorbed + 1 noise + 3 dropped = 10 reviewed.

## Notes

- New members appended to the union tail; `default` remains the default so every
  existing call site and story renders identically.
- Panel now renders `data-bbangto-popover-variant={variant}` (first canonical
  axis hook on this host; legacy `data-variant` retained for back-compat). Future
  axes should follow the same `data-bbangto-popover-*` convention, mirroring
  `data-bbangto-hero-layout` / `data-bbangto-tooltip-variant`.
- a11y contract hardened so new variants ship accessible: trigger now exposes
  `aria-haspopup="dialog"` + `aria-expanded` + `aria-controls`; the panel gains an
  `id` + `tabIndex={-1}` and receives focus on open; `Escape` dismisses. The
  `Sheet`/`Arrow`/`Elevated` plays assert `aria-expanded` and (for `sheet`/`elevated`)
  keyboard dismissal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var); `elevated` removes the border outright instead, and the
  hairline members use `semantic.border.muted`.
