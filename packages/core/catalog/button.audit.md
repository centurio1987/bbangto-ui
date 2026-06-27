# Button variant axis — saturation audit

- **Category:** atom / control
- **Host:** `Button` (`packages/core/src/components/Button.tsx`)
- **Axis:** `variant` (visual chrome family)
- **Default-first anchor:** `solid` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, base 0% → hover 50% → active 100%)`, no border, `boxShadow` (shadow.lg) elevation | A multi-stop gradient fill cannot be expressed by `solid` (single flat fill) or `soft` (single translucent fill). |
| `link` | no fill, no border, `text-decoration: underline`, text-color only | `ghost` fills on hover; the underline-based inline-link skeleton is a distinct chrome. |
| `neon` | transparent fill, saturated `border`, multi-spread outer `boxShadow` glow, `text-shadow` glow | `outline` is a flat border with no glow/elevation; neon adds luminous elevation in pure CSS. |

All three compose color exclusively from existing scale tokens via `cssVar()`
(`semantic.<color>.base|hover|active|foreground`, `semantic.border.*` for
`neutral`, `shadow.lg`). Gradient/glow strings are the only inline composition,
and their colors are token-derived.

## Candidate accounting (15 surveyed)

- **reviewed:** 12
- **absorbed:** 2 — `elevated` (folds into `gradient`'s `shadow` elevation), `text` (folds into `link`).
- **noise:** 1 — `blur`/glass-morphism (needs a backdrop-filter + glass token absent from the contract; out of scope for a pure-token chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token not present in `SemanticColors`; would force raw values.
  - `raised` — duplicates `solid` + `shadow`; no distinct chrome beyond elevation already reachable.
  - `dashed` — border-style variation only; an orthogonal sub-axis, not a fill/chrome family.
- **unreviewed:** 3 (= 15 − 12 reviewed)

## Notes

- New members appended to the union tail; `solid` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-button-variant={variant}` (first axis hook on
  this host; future axes should follow the same `data-bbangto-button-*`
  convention).
