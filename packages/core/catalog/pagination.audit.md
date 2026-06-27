# Pagination — Variant Axis Audit

- **Category:** molecule / navigation control
- **Host component:** `Pagination` (`packages/core/src/components/Pagination.tsx`)
- **Axis under audit:** `variant` (visual treatment of the page-list chrome)
- **Saturation round:** 1 (pilot)

## Existing axis members (frozen, default-first)

`navigation` (default) · `dot` · `counter` — render untouched.

## Adopted members this round

| Member | Load-bearing chrome (why it cannot collapse into an existing variant) |
|--------|----------------------------------------------------------------------|
| `segmented` | Single shared outer border ring + `gap:0` fused bar with internal 1px divider borders between items; border-radius only on the two end items. Cannot be expressed by `navigation` (per-item gapped boxes). |
| `outlined`  | Every item is its own 1px-solid bordered box with transparent fill and inter-item gap; active item swaps to accent-colored border + accent text while staying outline (no solid fill). Distinct from `navigation`'s solid active fill. |
| `pixel`     | Retro 8-bit chrome: zero-radius hard square edges + zero-blur hard offset box-shadow (`2px 2px 0`) + monospace font; static (no motion). No token-flat variant produces stepped/offset chrome. |

All three reuse the navigation page-window logic and the a11y contract
(navigation landmark via `role="navigation"` + `aria-current=page`). Page items
render as native `<button>`s so keyboard activation (Enter/Space) and focus are
intrinsic.

## Audit accounting

- **reviewed:** 12
- **absorbed:** 6 (candidates that collapsed into existing/adopted members)
  - `bordered-bar`, `joined`, `connected` → absorbed into `segmented`
  - `ghost-outline`, `chip` → absorbed into `outlined`
  - `retro` → absorbed into `pixel`
- **noise:** 2
  - `default` (alias of existing `navigation`)
  - `basic` (no distinguishing chrome)
- **dropped:** 2
  - `glassmorphism` — dropped: requires backdrop-filter + translucent gradient layers with no backing token; would force raw non-token color values.
  - `neon-glow` — dropped: multi-spread glow chrome already owned by `Button`'s `neon` variant; out of scope for a static page-list and duplicates an existing axis elsewhere.
- **not yet reviewed:** 0 (= 12 reviewed − 12 surfaced)

## Manifest hooks

- Root data hook: `data-bbangto-pagination-variant={variant}` (added on the new
  variant branch root; existing variant roots left unchanged per default-first).
- New union type exported from the component: `PaginationVariant` (auto-exposed
  by the barrel's `export *`).
