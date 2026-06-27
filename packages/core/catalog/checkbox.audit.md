# Checkbox variant axis — saturation audit

- **Category:** atom / control
- **Host:** `Checkbox` (`packages/core/src/components/Checkbox.tsx`)
- **Axis:** `variant` (visual chrome family of the box)
- **Default-first anchor:** `solid` (newly named head = the historical native
  `accentColor` box; existing call sites/stories render identically)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, base 0% → hover 50% → active 100%)` on an `appearance:none` box, `border: none` (the gradient surface *is* the chrome), check glyph layered over the gradient via a scoped `:checked::after` pseudo-element | `solid` paints the box with a single flat `accentColor`; a multi-stop gradient surface (and the borderless "surface-as-chrome" treatment) cannot be expressed by the native accent fill. |

Gradient color is composed exclusively from existing scale tokens via `cssVar()`
(`semantic.primary|error . base|hover|active`, glyph from
`semantic.foreground.inverse`, radius from `radius.sm`). The
`linear-gradient(...)` string is the only inline composition and its stops are
token-derived. No gradient/glass token exists in the contract, so no raw color
is introduced.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 8 — `accent` / `flat` / `native` (all fold into the renamed
  `solid` head), `tinted` / `subtle-fill` (fold into the gradient's
  base→hover stop range), `elevated` (elevation is reachable by layering shadow
  on any fill — not a distinct fill family), `error-fill` (orthogonal `error`
  prop already drives the error color into both `solid` and `gradient`),
  `checked-emphasis` (a state, not a chrome family).
- **noise:** 2 — `glass` / backdrop-blur morphism (needs `backdrop-filter` +
  a translucent surface token absent from `SemanticColors`), `switch` (a
  different host/role, not a checkbox-box chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a glass/translucent surface token not
    present in the token contract; would force raw values.
  - `outline-only` — pure border-style variation; an orthogonal sub-axis, not a
    fill/chrome family.
  - `switch` — toggle-pill is a separate control host, out of the box-chrome axis.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New member appended to the union tail; `solid` is the default so every
  existing call site and story renders identically (native `accentColor` box
  untouched — `width/height/accentColor` computed styles preserved).
- Root `<label>` now renders `data-bbangto-checkbox-variant={variant}` (first
  axis hook on this host; future axes should follow the same
  `data-bbangto-checkbox-*` convention).
- The gradient glyph uses a scoped `<style>` with the `.bbangto-checkbox-*`
  namespace (Hero pattern) so the check is CSS-only (`:checked::after`),
  requiring no React state in the leaf.
