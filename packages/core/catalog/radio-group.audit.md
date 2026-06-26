# RadioGroup variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `RadioGroup` (`packages/core/src/components/Radio.tsx`)
- **Axis:** `variant` (set-level layout / surface treatment)
- **Default-first anchor:** `default` (new union head; reproduces the historical
  inline-flex stack so every existing call site and story renders identically)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing treatment | Why irreducible to existing members |
|--------|------------------------|-------------------------------------|
| `card` (layout) | Each option reflows into a bordered panel (`1px border.base` + `radius.md` + `spacing.16` padding), content stacked; the set is a responsive grid that becomes `1fr 1fr` at the `lg` breakpoint via a scoped `@media`; selected panel gets `border-color: primary.base` + `primary.subtle` tint + 1px ring via `:has(input:checked)`. | `default` is a flat flex stack with no per-option chrome; only a grid of bordered panels can express stacked card reflow + multi-column wrap + per-panel selected accent. |
| `list` (layout) | Full-width rows in a single bordered/rounded container, each row split-aligned (`row-reverse` + `space-between` so the indicator pins to the trailing edge), divided by a `border-top` rule, selected row tinted `primary.subtle` via `:has`. | `default`/`card` lead with the dot; the split trailing-indicator + divider + edge-to-edge row tint is a distinct row-card layout neither expresses. |
| `segmented` (layout) | Single `radius.full` pill track (`background.sunken`) holding `flex: 1 1 0` equal-width segments; the radio dot is visually hidden (clip-rect, label only) and the active segment is filled with `background.elevated` + `shadow.sm` via `:has`. | A single-track equal-width pill with a hidden indicator and a filled active segment cannot be derived from a bordered-panel grid or a divided row stack. |
| `glass` (variant) | Frosted panel: `backdrop-filter: blur(spacing.12)` over a translucent surface (`color-mix(background.elevated 55%, transparent)`), framed by a 1px translucent border highlight (`color-mix(border.base 50%, transparent)`), with an active glow `box-shadow` when any item is checked. | The other members paint opaque solid fills/borders; only `glass` composites a backdrop blur + alpha surface + glow — the translucency is the whole chrome. |

Colors are composed exclusively from existing scale tokens via `cssVar()`. Alpha
is synthesized with `color-mix(... transparent)` and the blur radius reuses
`spacing.12`; no raw color literals are introduced. Structural-only raw values
(`1fr`, `flex: 1 1 0`, clip-rect for the visually-hidden input) follow the
existing Hero precedent.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `tiles`/`boxed` (fold into `card`'s bordered panel grid),
  `stacked-rows` (folds into `list`), `toggle`/`pills` (fold into `segmented`'s
  equal-width track + filled active segment).
- **noise:** 0
- **dropped:**
  - `accordion` — expand/collapse disclosure is a different interaction model,
    not a static radio set layout; out of axis scope.
  - `table` — a tabular column/cell grid is a data-display concern, not a
    selection-surface treatment for a small option set.
  - `floating-label` — a field-label animation belongs to an input-label
    sub-axis, orthogonal to the set-level layout/surface family.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `default` stays the head so existing
  renders are byte-identical.
- Root `<fieldset role="radiogroup">` now renders
  `data-bbangto-radio-group-variant={variant}` as the axis hook.
- Per-option chrome is injected by extending the existing
  `React.cloneElement` pass (adds a namespaced `className` + base `style`
  alongside the shared `name`); selected/hidden/reflow rules that inline style
  cannot express live in a single scoped `<style>` namespaced
  `.bbangto-radio-group-<variant>(-item)`.
- The responsive 2-col `card` reflow uses the Hero scoped-`<style>` +
  `breakpoints.lg` pattern; `glass` sets both `backdropFilter` and
  `WebkitBackdropFilter`, matching the Hero/Select backdrop-blur precedent.
- No shared files (barrel, tokens, utils, other components) were touched;
  `RadioGroupVariant` is exported from `Radio.tsx` and surfaces through the
  existing `export *` barrel.
