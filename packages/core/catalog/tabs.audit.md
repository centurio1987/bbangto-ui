# Tabs variant axis — saturation audit

- **Category:** molecule / navigation
- **Host:** `Tabs` (`packages/core/src/components/Tabs.tsx`)
- **Axis:** `variant` (tab-list chrome family)
- **Default-first anchor:** `underline` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `segmented` | one outer 1px `semantic.border.muted` border + `radius.md` wrapping the whole button-group, sunken track (`background.sunken`), `overflow:hidden`; equal-width rectangular cells (`flex:1 0 0%`, `borderRadius:0`, no gap) separated by 1px leading-border dividers (collapsed via `marginLeft:-1px`); only the active cell paints a `background.base` fill | `pill` = container bg + gap + full-radius pills, **no** border; `enclosed` = per-tab open-bottom border that joins a panel; `underline` = bottom-rule-only list with **no** fill. None express a single bordered cell-group with internal dividers. |

The segmented chrome composes color exclusively from existing tokens via
`cssVar()` (`semantic.border.muted`, `semantic.background.base|sunken`,
`semantic.foreground.base|muted`, `radius.md`, motion tokens). The only
structural raw values are layout offsets (`-1px` divider collapse, `0`
radius) — matching the existing file's precedent (`marginBottom:'-1px'`,
`'2px'` indicator). No raw colors.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 6 — `boxed`/`bordered` (fold into `segmented`'s outer border), `solid-fill`/`filled-active` (fold into the active-cell `background.base` fill), `grouped`/`button-group` (fold into the equal-width cell layout).
- **noise:** 2 — `frosted`/glass list (needs `backdrop-filter` + a glass token absent from the contract), `gradient-track` (needs a gradient token family not in `SemanticColors`).
- **dropped:**
  - `card` — duplicates `enclosed`'s panel-joined chrome; no distinct list family.
  - `vertical-rail` — an orientation sub-axis already covered by `orientation`, not a chrome family.
  - `lifted` — `segmented` + `shadow` elevation only; reachable composition, not an irreducible member.
  - `minimal` — `underline` with the rule removed; a token tweak, not a new chrome.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New member appended to the union tail; `underline` remains the default so
  every existing call site and story renders identically.
- The variant hook `data-bbangto-tabs-variant={variant}` already lives on the
  `TabsList` (`role=tablist`); `segmented` reuses that existing convention
  rather than introducing a second hook.
- a11y contract preserved: `segmented` reuses the same `TabsTrigger`
  (`role=tab` + `aria-selected`) and `TabsContent` (`role=tabpanel`); the play
  asserts role/aria + keyboard (`{Enter}`) activation still works.
