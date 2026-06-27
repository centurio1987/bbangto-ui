# DatePicker variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `DatePicker` (`packages/core/src/components/DatePicker.tsx`)
- **Axis:** `variant` (visual / interaction family)
- **Default-first anchor:** `default` (popover-triggered field; union head preserved so every existing call site and story renders identically)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `inline-week-strip` (layout) | Always-visible single horizontal week rail — **no popover**. Root rail is a `grid-template-columns: auto 1fr auto` track for `[prev-chevron \| inline day-cell track \| next-chevron]`; 7 day cells in one inline horizontal track; selected day is a solid-fill **pill** (`primary.base` bg + `radius.full`), unselected cells are ghost (transparent). | `default` is a triggered overlay month grid. A flat, always-on, single-row rail with chevron paging and pill selection cannot be expressed by the popover field — the inline 3-track rail layout *is* the chrome. |
| `wheel` (layout) | Multi-column **scroll-snap drum**: `grid-template-columns: repeat(3, 1fr)` (day/month/year), each column an `overflow-y` scroll track with `scroll-snap-type: y mandatory`; a fixed centre selection **band** (`border-y` via `border.strong` + `primary.subtle` fill) absolutely overlaid at vertical centre; top+bottom edge fade via a `mask-image: linear-gradient(...)`. No month grid, no popover. | Neither the popover grid nor the week rail expresses a vertically-scrolling, snap-aligned drum with a fixed centre band and edge-fade mask. The scroll-snap + mask compositing is the entire interaction model. |
| `ghost` (variant) | Trigger drops its border box (`border: none`) and fill (`background: transparent`); chrome treatment is **none** vs the default outlined field; only a trailing calendar **icon-button** remains; focus is a subtle ring (`box-shadow: 0 0 0 2px border.focus`, no offset) instead of a bordered box. | `default` always paints a 1px bordered, filled field. A borderless, fill-less trigger whose only affordance is a trailing icon-button and whose focus is a ringed (not boxed) state is a distinct trigger chrome. |

Colors are composed exclusively from existing semantic scale tokens via
`cssVar()` (`primary.base/subtle/foreground`, `border.base/strong/focus`,
`background.base`, `foreground.base/muted`); spacing/radius from the spacing and
radius scales. The only non-token literals are the `wheel` mask gradient stops
(`transparent`/`#000`) — these are an alpha-channel mask, not a themeable color,
so no theme token applies.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 7 — `horizontal-calendar` and `day-rail` (synonyms, fold into `inline-week-strip`); `scroller`, `drum`, `spinner-columns` (fold into `wheel`'s scroll-snap drum); `borderless` and `minimal-field` (fold into `ghost`'s no-box/no-fill trigger).
- **noise:** 0
- **dropped:**
  - `inline-month-grid` — an always-visible full month grid is just the `default` calendar un-popped; not a distinct chrome family and it duplicates the `Calendar` component's scope rather than the trigger axis.
  - `range` — date-range (two-thumb / start–end) is a selection-model behaviour sub-axis, not a trigger/layout chrome family; out of scope for this visual axis.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `default` remains the head and the
  default prop value, so all existing call sites and stories render identically.
- Root element renders `data-bbangto-date-picker-variant={variant}` for every
  variant (new axis hook; `default` now also emits it but no existing story
  depends on its absence).
- a11y contract preserved: day cells keep `aria-selected`; `inline-week-strip`
  uses `role="grid"`/`role="gridcell"` with roving `tabIndex` + Arrow-key paging;
  `wheel` columns are `role="listbox"`/`role="option"` with `aria-selected`;
  `ghost` reuses the unchanged popover calendar behaviour.
- Responsive 2-col was not required for any adopted member; the only scoped
  `<style>` is the namespaced `.bbangto-date-picker-wheel-track` edge-fade mask,
  following the Hero `.bbangto-<comp>-*` precedent.
