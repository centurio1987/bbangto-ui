# Badge — variant axis audit

- **Category:** atom / display
- **Host:** `Badge` (`packages/core/src/components/Badge.tsx`)
- **Axis:** `variant`
- **Saturation round:** 1 (pilot)

## Adopted members

| Member    | Load-bearing spec |
|-----------|-------------------|
| `outline` | Transparent fill (no `backgroundColor` chrome) + `1px solid` border in the semantic color tone, text in the same semantic tone. Distinct from `solid` (filled), and from `subtle`/`soft` (tinted background). Neutral maps border to `semantic.border.strong`; colored variants borrow their own scale `base`. |

Default-first preserved: union head `solid` stays the default; `outline` appended at the tail. Existing call sites and stories render unchanged.

## Counts

- reviewed: 12
- absorbed: 5
- noise: 4
- dropped: 2 (see below)
- adopted: 1 (`outline`)
- unreviewed: 0 (= 12 − 12)

> Note: reviewed (12) = adopted (1) + absorbed (5) + noise (4) + dropped (2).

## Absorbed (5)

Candidates whose intent is already covered by existing members:

1. `bordered` → same border-only chrome as adopted `outline`.
2. `hollow` → synonym of `outline`.
3. `tinted` → already covered by `subtle`.
4. `muted` → already covered by `soft`.
5. `filled` → already covered by `solid`.

## Noise (4)

Off-axis / not a `variant` concern:

1. `large` — belongs to the `size` axis.
2. `circle` — shape concern, overlaps `dot`.
3. `pulse` — motion concern, not a static variant.
4. `clickable` — interaction concern, not chrome.

## Dropped (2)

1. `gradient` — needs a multi-stop fill the Badge meta scale cannot express cleanly at pill size; would force raw values, not load-bearing for a status chip.
2. `glass` — requires backdrop-filter + translucency tokens absent from the token set; would force raw values.
