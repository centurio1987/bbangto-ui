# TopNavigation — variant axis audit

- **Category:** organism (component)
- **Host:** `TopNavigation` (`packages/core/src/components/TopNavigation.tsx`)
- **Axis:** `variant` (`TopNavigationVariant` union / `data-bbangto-navbar-variant`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `bordered` | variant | Opaque surface fill (`background.base`) on a full-width edge-to-edge bar with a crisp hairline `border-bottom: 1px solid border.base` and `box-shadow: none`. Flat and grounded — distinct from the new `glass`/`floating-pill` chrome and from the legacy `default` only by the stronger `border.base` rule + explicit zero elevation. |
| `glass` | variant | Frosted chrome: `backdrop-filter: blur(12px)` over a translucent fill (`color-mix(in srgb, background.base 60%, transparent)`) plus a `border.muted` hairline, so page content blurs through. The translucency + backdrop blur is the skeleton difference; distinct from the opaque `bordered` fill. Blur radius is the only inline literal (no backdrop token); the colour stays `cssVar()`-derived. |
| `floating-pill` | layout | Root reflows from a full-bleed bar to a detached centered capsule: `width:100%` clamped by a constrained `max-width` + `margin-inline:auto` + top `margin-top` (`spacing.16`) offset, `border-radius: radius.full`, `border.muted` hairline all around, and `shadow.lg` elevation over a `background.elevated` fill. The full-bleed→contained-island reflow is the structural change, not just a fill swap. |

## Tally

- **reviewed:** 12
- **absorbed:** 2
  - "elevated"/"raised" → folded into `bordered` (a shadow-on-bar is the same opaque edge-to-edge skeleton with an elevation token swap; not a distinct structure).
  - "blurred-sticky" → `glass` (a sticky frosted bar is `glass` chrome + the existing `fixed` prop; no new member).
- **noise:** 3
  - "sticky"/"fixed" — already covered by the existing `fixed` boolean prop (positioning, not a chrome variant).
  - "transparent" — a fill-alpha tweak, not a structural skeleton; degenerates to `glass` without the blur.
  - "centered-title" — the layout already centers `title` between leading/trailing slots; no axis change.
- **dropped:** 4
  - "search-bar" — dropped: embedding a search input is a content/slot concern, not a container skeleton; belongs to the slot API, not the `variant` axis.
  - "tabbed-nav" — dropped: a secondary tab row is a composition of the existing `Tabs` organism, not a TopNavigation chrome treatment.
  - "mega-menu" — dropped: a full-bleed dropdown panel is an overlay/disclosure concern owned by `Popover`/`Drawer`, outside the bar's own surface.
  - "gradient-bar" — dropped: a gradient fill adds no structural reflow beyond `bordered`/`glass`; pure colour treatment with no token gradient and no skeleton difference, so it would be a near-duplicate fill swap.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- default-first preserved: `default` remains the first union value and `variant = 'default'` keeps the original render byte-identical (`background.base` fill, `border.muted` bottom rule, no elevation). The existing `Default` story and any call site render unchanged; the only DOM delta is the additive non-visual `data-bbangto-navbar-variant` hook.
- New members appended to the end of the `TopNavigationVariant` union; the union type is exported from the component file and re-exported by the barrel via `export *`.
- a11y contract maintained across all variants: root keeps its `role="banner"` landmark, leading/title/trailing slots are unchanged, and the leading→trailing focus order is preserved (verified in each new story's `play` via `back.focus()` → `userEvent.tab()` → trailing). No keyboard/aria regression.
- All colours use `cssVar()` tokens. The two inline literals are non-colour layout values with no token: the `glass` blur radius (`12px`) and the `floating-pill` `max-width` (`640px`); radius/shadow/spacing all resolve from tokens.
- No new required props; `variant` is optional with a default. Shared files (barrels, tokens, utils, sibling components) untouched.
