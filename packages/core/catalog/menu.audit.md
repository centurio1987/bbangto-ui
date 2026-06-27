# Menu variant axis — saturation audit

- **Category:** molecule / navigation-overlay
- **Host:** `Menu` (`packages/core/src/components/Menu.tsx`)
- **Axis:** `variant` (visual chrome / layout family of the list container)
- **Default-first anchor:** `default` (unchanged; existing union head preserved — every existing call site, `DropdownMenu` panel, and story renders identically)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Kind | Load-bearing chrome | Why irreducible to existing members |
|--------|------|---------------------|-------------------------------------|
| `dock` | layout | Container is an equal-width horizontal flex track (`display:flex; flex-direction:row; justify-content:space-between`); each item slot reflows to a stacked column cell (`flex:1 1 0`, `flex-direction:column`, `text-align:center`) — icon top / label bottom | `compact` only shrinks vertical padding; `default/bordered/floating` keep the horizontal icon+label row. None reflow the item slot to a 2-row stack on a horizontal track. |
| `segmented` | variant | Inset track: muted/sunken filled container (`background.sunken`) + `radius.lg`, `border:none`; active/hover cell = filled `background.elevated` chip + `shadow.md` elevation; no border outline, no underline | `bordered` is a flat outlined box; `floating` is an elevated panel with a border. Neither paints a sunken track with elevated active chips. |
| `glow` | variant | Borderless transparent base items; active/hover chrome is a `radial-gradient` halo behind the item + multi-spread outer `box-shadow` glow composed from `primary.subtle`/`primary.base`. Glow replaces border/fill as the chrome | `bordered`/`floating` use solid border + flat shadow; the radial halo + luminous outer glow is a distinct pure-CSS chrome with no border/fill. |

All three compose color exclusively from existing scale tokens via `cssVar()`
(`semantic.background.sunken|elevated`, `semantic.primary.subtle|base`,
`shadow.md`, `radius.md|lg`, `spacing.*`). The radial-gradient halo string is the
only inline composition and its stops are token-derived (`transparent` is the
sole literal). `border.subtle` was deliberately avoided (absent from the
contract — would emit an undefined CSS var).

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `tabs`/`pills` (fold into `segmented`'s active-chip track), `rail` (folds into `dock`'s vertical stacked cell), `spotlight` (folds into `glow`'s radial halo), `elevated` (already reachable via `floating`).
- **noise:** 2 — `glass` (needs a `backdrop-filter` + glass surface token absent from `SemanticColors`), `gradient-fill` (a whole-panel gradient duplicates `Hero`'s `gradient-surface`, not a menu chrome).
- **dropped:**
  - `dense-grid` — multi-column grid of items; an orthogonal layout sub-axis (column count) rather than a chrome/slot-reflow family, and overlaps `dock`'s flex track without adding distinct chrome.
  - `underline` — active item underline only; a sub-treatment that folds into `segmented`'s active-cell affordance with no separate container chrome.
  - `frosted` — translucent blur surface; requires `backdrop-filter` + a glass token not present in the contract (would force raw values).
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New members appended to the union tail; `default` remains the implicit value.
- Root continues to render `data-bbangto-menu-variant={variant}` (the
  pre-existing axis hook); new members reuse it, no new convention introduced.
- `dock`, `segmented`, and `glow` join `compact` in the scoped `<style>` path
  (now keyed on a generalized `bbangto-menu-<variant>-<id>` class) because their
  per-item chrome/layout reaches into child MenuItems, which React's inline
  `style` prop on the `<ul>` cannot target.
- **a11y contract preserved:** `role="menu"` + focusable `role="menuitem"`
  (roving tabindex) + `DropdownMenu`'s Esc-to-close / focus-return are untouched;
  the new variants only alter container/item presentation. Each story `play`
  re-verifies the menu/menuitem roles, focus, and keyboard model.
