# Chip (chip-tag) — variant axis audit

- **Category:** atom / selection-display
- **Host:** `Chip` (`packages/core/src/components/Chip.tsx`)
- **Axis:** `variant` (`data-bbangto-chip-tag-variant`)
- **Saturation round:** 1 (pilot)

## Adopted members

| Member    | Kind   | Load-bearing spec |
|-----------|--------|-------------------|
| `solid`   | chrome / fill   | Opaque accent fill (`semantic.primary.base`), on-color text (`semantic.primary.foreground`), and **no border ring** (`border: none`). The legacy `action`/`filter` cascade always paints a `1px solid` ring, so an unringed opaque fill is unreachable without this member. |
| `outline` | chrome / border | Transparent fill + `1px solid` accent ring (`semantic.primary.base`) + accent text. The border bucket is the inverse of `solid`'s fill bucket and is distinguished by `backgroundColor: transparent` with a visible `borderStyle: solid`. |
| `avatar`  | layout          | Root reflow → `[circular media slot | label | optional remove]`. The leading media slot is a circle whose diameter equals the chip height (`width === height`, `radius.full`) and which bleeds to the inline-start via a negative `margin-left` equal to the chip padding. Text-only chips have no leading-media structural slot. |

Default-first preserved: union head `action` stays the default; `filter` keeps its
existing position; `solid` / `outline` / `avatar` are appended at the tail. Existing
call sites and the `Default`/`Filter`/`Action` stories render byte-for-byte unchanged.

New union type `ChipVariant` is exported from the component file (re-exported by the
barrel via `export *`).

## Counts

- reviewed: 8
- absorbed: 5
- noise: 1
- dropped: 2 (see below)
- adopted: 3 (`solid`, `outline`, `avatar`)
- unreviewed: 0 (= 8 − 8 reviewed)

> Breakdown: reviewed (8) = absorbed (5) + noise (1) + dropped (2). The 3 adopted
> members are the accepted output of the pilot round; the 8 reviewed are the
> remaining candidates triaged into absorbed / noise / dropped.

## Absorbed (5)

Candidate intents already covered by an adopted member:

1. `filled` → identical to adopted `solid` (opaque accent fill).
2. `bordered` → identical to adopted `outline` (border ring chrome).
3. `hollow` → synonym of `outline`.
4. `image` → leading raster media is covered by the `avatar` media slot.
5. `thumbnail` → leading-media structure is covered by `avatar`.

## Noise (1)

Off-axis — not a `variant` concern:

1. `rounded` — shape/radius concern, belongs to a `shape`/`size` axis, not chrome.

## Dropped (2)

1. `gradient` — needs a multi-stop translucent fill the chip color scale cannot
   express at chip size without raw values; not load-bearing for a compact chip.
2. `glass` — requires `backdrop-filter` + translucency tokens absent from the token
   set; would force raw values.
