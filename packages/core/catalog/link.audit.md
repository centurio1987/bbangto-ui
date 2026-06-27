# Link variant axis — saturation audit

- **Category:** atom / navigation
- **Host:** `Link` (`packages/core/src/components/Link.tsx`)
- **Axis:** `variant` (visual chrome family)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `outline` | `border: 1px solid semantic.border.base` over a transparent fill, `padding` (spacing.8 / spacing.12) + `radius.md`, no underline; sunken fill on hover | The legacy variants are text-only (color + underline). A bordered, button-shaped interactive surface is a distinct chrome no text variant expresses. |
| `solid` | filled `backgroundColor: semantic.primary.base` + on-accent `primary.foreground` text, padded + `radius.md`, no border, no underline; deepens to `primary.hover` on hover | A solid filled surface with on-accent foreground cannot be reached by `outline` (transparent + border) or any text-only variant. |
| `ghost` | transparent at rest, hover/focus fill `semantic.background.sunken`, padded + `radius.md`, no border, no underline | Distinct from `outline` (no resting border) and `solid` (no resting fill): the chrome is the hover-revealed fill on an otherwise quiet surface. |

All three compose color exclusively from existing scale tokens via `cssVar()`
(`semantic.primary.base|hover|foreground`, `semantic.border.base`,
`semantic.background.sunken`, `spacing.8|12`, `radius.md`,
`semantic.border.focus` for the keyboard focus ring). No raw values; no
gradient/glass composition was required.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `filled` → `solid`; `accent`/`cta` → `solid`; `bordered` → `outline`;
  `subtle`/`quiet` → `ghost`; `pill` → folds into `radius`/`shape` sub-axis on the padded surfaces, not a chrome family.
- **noise:** 4 — `block` (layout width, orthogonal sub-axis), `icon-only` (content-slot concern), `disabled` (state, not chrome), `loading` (state + spinner, not a variant).
- **dropped:**
  - `glass` — needs `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `gradient` — multi-stop fill belongs to the `Button` chrome family; for a navigation Link it duplicates `solid` without a distinct nav role.
  - `soft` — a translucent tint fill duplicates `ghost`'s resting/hover surface using `background.sunken`; no distinct chrome.
  - `underline-only` — already covered by the existing `underline` prop axis (always/hover/none), not a new variant.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `default` remains the head/default so
  every existing call site and story (Default/Muted/External/Inline) renders
  byte-identically. Surface chrome fields stay `undefined` for the four legacy
  text variants.
- Root now renders `data-bbangto-link-variant={variant}` (first axis hook on
  this host; future axes should follow the `data-bbangto-link-*` convention).
- a11y contract held: still an `<a>` with `href`, keyboard-focusable; the padded
  surfaces add a `semantic.border.focus` box-shadow focus ring. Each new story's
  `play` asserts role/href + focusability.
</content>
