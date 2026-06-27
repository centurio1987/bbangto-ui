# Calendar — layout axis audit

- **Category:** molecule
- **Host:** `Calendar` (`packages/core/src/components/Calendar.tsx`)
- **Axis:** `layout` (`CalendarLayout` union / `data-bbangto-calendar-layout`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `fullscreen` | layout | Full-bleed viewport surface (`100vw`/`100vh` flex column) with the card chrome stripped — `border: none`, `radius.none`, `shadow.none`. The header becomes a top **toolbar track** (`data-bbangto-calendar-toolbar`, elevated surface + `border.base` bottom divider) carrying the prev/next nav. The day grid `flex`-grows with tall `gridAutoRows: minmax(96px, 1fr)`; each day cell is an enlarged, top-anchored **content container** (`flex-direction: column`, `align-items: stretch`) holding a `data-bbangto-calendar-events` stacked event-entry host below the date number. Distinct from `month`/`compact` (fixed-width card, centred pill cells). |
| `scheduler-split` | layout | Bordered **card** chrome retained on the root; the body reflows into a 2-track grid via a scoped `@media (min-width: 1024px)` rule on `.bbangto-calendar-scheduler` → `grid-template-columns: 1fr 240px`. Track 1 = the month calendar column (weekday header + day grid); track 2 = an adjacent **vertical time-slot list** (`role="list"`, `border.muted` left divider separating the tracks). Single stacked column below `lg`. Distinct from `dual` (two month grids, no card-spanning split) and `week` (single row). |

## Tally

- **reviewed:** 12
- **absorbed:** 8 — candidates folded into the two adopted skeletons rather than seeded as new members:
  - "event-calendar" / "agenda-month" / "month-with-events" → all reduce to `fullscreen`'s enlarged day-cell + stacked event-entry host; no skeleton delta.
  - "day-view" / "timeline-day" → the time-slot track of `scheduler-split` viewed in isolation; not a separate layout skeleton.
  - "booking-grid" / "availability-picker" → `scheduler-split`'s calendar-beside-slots composition with a different payload (a data concern, not a layout member).
  - "edge-to-edge-month" → the chrome-removal half of `fullscreen`; no independent value.
- **noise:** 1 — "rounded-card-month" (a re-skin of the existing default `month` card; pure styling, no axis member).
- **dropped:** 1
  - "today-jump-button" — dropped: a Today affordance in the fullscreen toolbar would call `Date.now()` (the component deliberately avoids implicit `Date.now()` for seeding) and re-anchor navigation, violating the display-only invariant ("날짜선택/월이동 behavior 불변"). Toolbar ships prev/next nav only.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `month` remains the first union value and `layout = 'month'` default is untouched — existing call sites/stories render byte-for-byte unchanged (verified: shared `getDayCellStyle`/`gridStyle`/header all fall through their new branches as `null` for legacy layouts).
- New members appended to the end of the `CalendarLayout` union; the type is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. `semantic.border` references stay within `base`/`muted`/`strong`/`focus` (no `subtle`). No gradient/glass synthesis was needed for these two layouts.
- Responsive 2-col (`scheduler-split`) uses the scoped `<style>` + `breakpoints.lg` + `.bbangto-calendar-*` namespace pattern (mirrors `Hero`); the story asserts the `@media` rule via aggregated `<style>` text to stay viewport-independent.
- a11y contract intact: `role="grid"` + roving `tabIndex` + `aria-selected` and the prev/next month navigation are unchanged in both new layouts; play functions re-verify selection toggle and month nav.
- Shared files (barrels, tokens, utils, sibling components) untouched.
