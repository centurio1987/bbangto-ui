# 아키타입 포화 감사 — 라운드 1 (2026-06-27)

> 21st.dev 카테고리별 아키타입 포화 프로그램의 감사 매니페스트 44개를 한 파일로 모은 것이다.
> 프로그램 개요와 채택 멤버 목록은 [`../COMPONENT_CATALOG.md`](../COMPONENT_CATALOG.md) 「레지스트리 — 아키타입 **포화**」 절에 있다.
>
> 원래 카테고리마다 `catalog/<category>.audit.md` 로 따로 있었고(2026-06-27 라운드 1 파일럿 이후 무변경), KAN-048 에서 한 파일로 접었다.
> 본문은 원본 그대로이고 제목만 한 단계씩 내렸다. 절마다 앞에 원본 경로를 주석(`<!-- source: … -->`)으로 남겼다.
>
> 이 문서에만 있는 것은 **기각 후보(absorbed·noise·dropped)와 그 사유**다. 같은 후보가 다음 라운드에 다시 올라오면 먼저 여기서 찾는다.

## 색인

| # | 원 파일 | 절 제목 |
|---:|---|---|
| 1 | `accordion.audit.md` | Accordion — variant axis audit |
| 2 | `ai-chat.audit.md` | AIChat — layout axis audit |
| 3 | `announcement.audit.md` | AnnouncementBar — variant axis audit |
| 4 | `avatar.audit.md` | Avatar — variant axis audit |
| 5 | `badge.audit.md` | Badge — variant axis audit |
| 6 | `button.audit.md` | Button variant axis — saturation audit |
| 7 | `calendar.audit.md` | Calendar — layout axis audit |
| 8 | `card.audit.md` | Card — variant axis audit |
| 9 | `carousel.audit.md` | Carousel variant axis — saturation audit |
| 10 | `checkbox.audit.md` | Checkbox variant axis — saturation audit |
| 11 | `chip-tag.audit.md` | Chip (chip-tag) — variant axis audit |
| 12 | `clients.audit.md` | Clients / LogoCloud — layout axis audit |
| 13 | `date-picker.audit.md` | DatePicker variant axis — saturation audit |
| 14 | `dialog.audit.md` | Dialog (Modal) variant axis — saturation audit |
| 15 | `dock.audit.md` | Dock — variant axis audit |
| 16 | `empty-state.audit.md` | EmptyState variant axis — saturation audit |
| 17 | `features.audit.md` | FeatureGrid — Layout Axis Audit |
| 18 | `file-upload.audit.md` | FileUploader variant axis — saturation audit |
| 19 | `footer.audit.md` | MarketingFooter — layout axis audit |
| 20 | `form.audit.md` | Form — layout axis audit |
| 21 | `gallery.audit.md` | Gallery — layout axis audit |
| 22 | `hero.audit.md` | Hero — layout axis audit |
| 23 | `input.audit.md` | Input — variant axis audit |
| 24 | `link.audit.md` | Link variant axis — saturation audit |
| 25 | `map.audit.md` | MapBlock — layout axis audit |
| 26 | `menu.audit.md` | Menu variant axis — saturation audit |
| 27 | `navbar.audit.md` | TopNavigation — variant axis audit |
| 28 | `notification.audit.md` | Snackbar variant axis — saturation audit |
| 29 | `number.audit.md` | NumberField — variant 축 감사 (number.audit.md) |
| 30 | `pagination.audit.md` | Pagination — Variant Axis Audit |
| 31 | `popover.audit.md` | Popover variant axis — saturation audit |
| 32 | `pricing-section.audit.md` | PricingSection — layout axis audit |
| 33 | `radio-group.audit.md` | RadioGroup variant axis — saturation audit |
| 34 | `select.audit.md` | Select variant axis — saturation audit |
| 35 | `sign-in.audit.md` | SignIn — layout axis audit |
| 36 | `signup.audit.md` | SignUp — layout axis audit |
| 37 | `spinner-loader.audit.md` | Spinner / Loader — variant axis audit |
| 38 | `table.audit.md` | Table — variant axis audit |
| 39 | `tabs.audit.md` | Tabs variant axis — saturation audit |
| 40 | `testimonials.audit.md` | Testimonials — layout axis audit |
| 41 | `textarea.audit.md` | Textarea — variant axis audit |
| 42 | `toggle.audit.md` | Toggle audit — Switch `variant` axis |
| 43 | `tooltip.audit.md` | Tooltip variant axis — saturation audit |
| 44 | `video.audit.md` | VideoBlock — layout axis audit |

---

<!-- source: packages/core/catalog/accordion.audit.md -->
## Accordion — variant axis audit

- **Category:** molecule (component)
- **Host:** `Accordion` (`packages/core/src/components/Accordion.tsx`)
- **Axis:** `variant` (`AccordionVariant` union / `data-bbangto-accordion-variant`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `split-media` | layout | Root reflows from a single column (`1fr`) to a 2-track grid (`minmax(0,1fr) minmax(0,0.85fr)` = accordion-list \| media-panel) once active. The synced right panel renders the `media` slot only while expanded (panel swaps on expand). Scoped `<style>` (`.bbangto-accordion-split`, `breakpoints.lg`) carries the responsive column-gap + reduced-motion fallback. Distinct from `separated` (still single-column) — the *grid reflow* is the skeleton difference. |
| `neobrutalist` | variant | Per-item: thick solid border (`spacing.2` ≈ 2px, `border.strong`) + hard offset box-shadow (`spacing.4 spacing.4 0 0`, zero blur, `foreground.base`) + flat `background.base` fill + sharp `radius.none` corners. Elevation comes from the token-driven offset, not a blur radius. Distinct from `bordered`/`separated`, whose elevation is a 1px hairline + rounded radius. |
| `horizontal-panels` | layout | Root becomes a horizontal flex track (`flex-direction: row`). The single panel is a collapsed `flex-basis: spacing.48` strip carrying a token-composited `linear-gradient` background-image (`background-size: cover`) + an `background.overlay` scrim; it expands via `flex-grow: 1` to reveal content. Title rail is vertical (`writing-mode: vertical-rl`) while collapsed. Distinct from every vertical variant — the axis of expansion is horizontal. |

### Tally

- **reviewed:** 12
- **absorbed:** 8
  - "accordion-with-thumbnail" → folded into `split-media` (a leading thumbnail is the same synced `media` surface; no separate member).
  - "preview-pane" → `split-media` (right preview panel is the media track).
  - "image-reveal" → `split-media` (image revealed on expand = panel swap).
  - "brutalist-card" → `neobrutalist` (same thick-border + hard-shadow skeleton).
  - "hard-shadow" → `neobrutalist` (zero-blur offset shadow is the defining trait already captured).
  - "sharp-outline" → `neobrutalist` (sharp `radius.none` + heavy border subset).
  - "filmstrip" → `horizontal-panels` (horizontal flex strips with cover media = same skeleton).
  - "image-accordion" → `horizontal-panels` (collapsed cover strips expanding via flex-grow).
- **noise:** 0
- **dropped:** 1
  - "stepper-accordion" — dropped: a numbered sequential-step affordance is a content/ordinal concern (badge + ordering), not a distinct container skeleton; adds no grid/flex/border reflow beyond the existing `bordered` variant.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `bordered` remains the first union value and the `variant = 'bordered'` default is untouched — existing call sites and the `Default`/`Multiple`/`Flush*`/`Separated`/size stories render byte-identical.
- New members appended to the end of the `AccordionVariant` union; each member literal is also exported as a named type (`AccordionVariantSplitMedia`, `AccordionVariantNeobrutalist`, `AccordionVariantHorizontalPanels`) from the component file (barrel re-exports via `export *`).
- a11y contract maintained across all variants: header keeps `role="button"` + `aria-expanded` + `aria-controls`, content region keeps its `id`, and Enter/Space keyboard toggle is unchanged (header is the shared `headerEl`). Verified in each new story's `play`.
- All styling uses `cssVar()` tokens. The horizontal panel gradient is synthesized inline (no gradient token exists) but every colour/length is a `cssVar()` reference; border-width and shadow offset use `spacing` tokens.
- One additive optional prop introduced: `media?: React.ReactNode` (default `undefined`) — non-breaking, consumed only by `split-media` and `horizontal-panels`.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/ai-chat.audit.md -->
## AIChat — layout axis audit

- **Category:** pattern
- **Host:** `AIChat` (`packages/core/src/patterns/AIChat.tsx`)
- **Axis:** `layout` (`AIChatLayout` union / `data-bbangto-aichat-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `frosted` | variant | Pure-chrome treatment of the composer panel. Swaps the default opaque `background.elevated` fill + solid `border.muted` top border for a translucent glass plate: `backdrop-filter: blur(spacing.16)` (+ `-webkit-` prefix), a ~65% surface fill composited via `color-mix(in srgb, background.elevated 65%, transparent)`, and a 1px hairline top border via `color-mix(in srgb, border.base 12%, transparent)`. Only the composer chrome changes; the container skeleton, message-area, and a11y contract are identical to `default`. The unique distinguishing signal is the presence of `backdrop-filter: blur` + an alpha-bearing surface fill — no other layout alters the chrome material. |

### Tally

- **reviewed:** 12
- **absorbed:** 5
  - "glass-composer" → folded into `frosted` (the blur + translucent fill IS the frosted plate).
  - "translucent-input-bar" → folded into `frosted` (alpha surface is the same color-mix fill).
  - "hairline-composer" → folded into `frosted` (1px hairline border is part of the frosted chrome swap).
  - "blur-panel" → folded into `frosted` (backdrop blur is the load-bearing frosted signal).
  - "vibrancy-footer" → folded into `frosted` (macOS-vibrancy framing is the same `backdrop-filter` glass material, no skeleton delta).
- **noise:** 4
  - "rounded-composer" → noise: a `radius` token tweak on the existing composer, not a layout/chrome material change.
  - "shadow-composer" → noise: a `shadow` elevation tweak; no structural or material distinction.
  - "tight-composer" → noise: a `spacing` padding variation on the default composer.
  - "accent-border-composer" → noise: recolors the existing solid border with a `primary` token; still an opaque solid border, not a new chrome kind.
- **dropped:** 2
  - "gradient-composer" — dropped: a gradient surface is a colour-fill variation, not the glass/blur material that defines this axis member; it would duplicate `frosted`'s "non-opaque composer" slot without the load-bearing `backdrop-filter`.
  - "floating-composer" — dropped: detaches the composer into an absolutely-positioned floating bar — a positioning/skeleton change that belongs to a structural layout member, not the chrome-material axis piloted here; deferred to avoid mixing skeleton and chrome deltas in round 1.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `default` remains the first union value; `frosted` is appended to the end of `AIChatLayout`. Existing call sites/stories render unchanged (no container override for `frosted`; composer only gains chrome when `layout === 'frosted'`).
- Type exported from the component file; the barrel re-exports via `export *`.
- All colours/lengths are `cssVar()` references. The `backdrop-filter` blur and the translucent fills are synthesized inline via `color-mix` (no glass/alpha tokens exist), but every input colour is a `cssVar()` token (`background.elevated`, `border.base`) and the blur length is `spacing.16`.
- `semantic.border` only exposes `base`/`muted`/`strong`/`focus` — the hairline uses `border.base` (no `subtle`).
- a11y contract held: `role=log` + `aria-live` message list and composer focus/Enter-to-send are untouched; the Frosted story asserts the log role, textarea visibility, and Enter submission.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/announcement.audit.md -->
## AnnouncementBar — variant axis audit

- **Category:** block
- **Host:** `AnnouncementBar` (`packages/core/src/blocks/AnnouncementBar.tsx`)
- **Axis:** `variant` (`AnnouncementBarVariant` union / `data-bbangto-announcementbar-variant`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `gradient` | variant | Pure-chrome fill swap: root paints a token-composited multi-stop `linear-gradient(120deg, primary.active → primary.base → primary.hover)`, drops the solid fill (`backgroundColor: transparent`) and the border (`border: none`). Opens a local stacking context (`isolation: isolate`) so an optional lattice `.bbangto-announcement-grid` overlay (`repeating-linear-gradient` grid in a `color-mix`-derived translucent line color) composites on a negative-z layer — above the gradient fill, below the icon·text·controls track. Track layout is preserved; only the fill treatment changes — distinct from the opaque solid `bar` fill. |
| `glass` | variant | Frosted material: translucent fill (`color-mix(in srgb, background.elevated 62%, transparent)`) + `backdrop-filter: blur(spacing.8)` (with `-webkit-` fallback), a 1px hairline ring `border` (`border.muted`), and a light `shadow.sm` elevation. Foreground text switches to `foreground.base` for legibility on the light translucent surface. A real material — distinct from the opaque fills / solid-on-primary surfaces of every other variant. |

### Tally

- **reviewed:** 9
- **absorbed:** 6 — folded into the two adopted members (no standalone member warranted):
  - "soft-gradient" / "vibrant-gradient" / "mesh-gradient" → all reduce to the `gradient` fill swap (stop list / angle is a `cssVar` payload tweak, not a skeleton difference).
  - "grid-overlay" / "pattern-overlay" → absorbed as the optional `.bbangto-announcement-grid` lattice on `gradient` (decorative negative-z layer, not its own member).
  - "frosted-card" → absorbed into `glass` (the translucent fill + blur + hairline ring already is the frosted treatment).
- **noise:** 1 — "gradient-border" candidate: a gradient applied only to the border ring with an opaque body; no track/skeleton change and no token-expressible gradient-border primitive — discarded as noise.
- **dropped:** 2
  - "solid-accent" — dropped: identical skeleton to the default `bar` (opaque fill, no border), differing only by which `cssVar` color fills it; that is a token/color concern, not a variant member.
  - "elevated-bar" — dropped: a shadow-only delta is already covered by `floating` (margin + `shadow.lg` detached pill); a standalone shadow member would duplicate it without a load-bearing surface difference.
- **unreviewed:** 0 (= 9 − 9 reviewed)

### Notes

- default-first preserved: `bar` remains the first union value and the default arg (`variant = 'bar'`); existing call sites/stories render unchanged. New members (`gradient`, `glass`) appended to the end of the union.
- `AnnouncementBarVariant` is exported from the component file; the barrel re-exports via `export *`.
- All styling uses `cssVar()` tokens. The gradient string, grid lattice, translucent fills and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference (translucency via `color-mix` over `cssVar` colours). `semantic.border` uses only valid steps (`muted`).
- a11y contract intact: `role="region"` + `aria-label="Announcement"` and the accessible, focusable dismiss control survive both new surface treatments; the grid overlay is `aria-hidden`. Verified in the `Glass` story play (region role + dismiss focus) and `Gradient` story play (decorative overlay hidden from AT).
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/avatar.audit.md -->
## Avatar — variant axis audit

- **Category:** component / atom
- **Host:** Avatar (`@centurio1987/core`)
- **Axis:** `variant` (border-treatment chrome)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Load-bearing spec |
|--------|-------------------|
| `plain` (default, first member) | Legacy single-surface render. No chrome change; preserves existing call sites/stories. |
| `gradient-ring` | Outer gradient frame acts as the ring (conic-gradient composed from `primary.base/hover`, `success.base`, `warning.base`); ring thickness via `spacing.3` padding; background-colored ring-offset gap (`background.base`, `spacing.1`) between gradient and inner content; **no solid border** — gradient is the ring. Not expressible via `shape` (circle/square) or `status` dot. |

### Survey ledger

- **reviewed:** 12
- **absorbed:** 4
  - `bordered` → covered by existing `shape` + token border, not a new axis member.
  - `outlined` → same as `bordered`; folds into solid-border treatment already reachable.
  - `elevated` (shadow ring) → expressible via `style`/`shadow` token override, not chrome-distinct.
  - `dot-status` → already the existing `status` dot axis.
- **noise:** 1
  - `fancy` → underspecified marketing label, no concrete border treatment.
- **dropped:**
  - `glass` (dropped — needs backdrop-filter + translucent surface tokens absent from token set; would require raw values beyond minimal gradient synthesis).
  - `image-frame` (dropped — decorative bitmap frame, not token-expressible chrome).
- **unreviewed:** 0 (= 12 reviewed − 12 surveyed)

### Notes

- New union member type `AvatarVariant` exported from `Avatar.tsx` (barrel re-exports via `export *`).
- Root hook: `data-bbangto-avatar-variant={variant}`.
- All colors via `cssVar()`; gradient synthesized from existing semantic tokens (no token primitive for gradients).

---

<!-- source: packages/core/catalog/badge.audit.md -->
## Badge — variant axis audit

- **Category:** atom / display
- **Host:** `Badge` (`packages/core/src/components/Badge.tsx`)
- **Axis:** `variant`
- **Saturation round:** 1 (pilot)

### Adopted members

| Member    | Load-bearing spec |
|-----------|-------------------|
| `outline` | Transparent fill (no `backgroundColor` chrome) + `1px solid` border in the semantic color tone, text in the same semantic tone. Distinct from `solid` (filled), and from `subtle`/`soft` (tinted background). Neutral maps border to `semantic.border.strong`; colored variants borrow their own scale `base`. |

Default-first preserved: union head `solid` stays the default; `outline` appended at the tail. Existing call sites and stories render unchanged.

### Counts

- reviewed: 12
- absorbed: 5
- noise: 4
- dropped: 2 (see below)
- adopted: 1 (`outline`)
- unreviewed: 0 (= 12 − 12)

> Note: reviewed (12) = adopted (1) + absorbed (5) + noise (4) + dropped (2).

### Absorbed (5)

Candidates whose intent is already covered by existing members:

1. `bordered` → same border-only chrome as adopted `outline`.
2. `hollow` → synonym of `outline`.
3. `tinted` → already covered by `subtle`.
4. `muted` → already covered by `soft`.
5. `filled` → already covered by `solid`.

### Noise (4)

Off-axis / not a `variant` concern:

1. `large` — belongs to the `size` axis.
2. `circle` — shape concern, overlaps `dot`.
3. `pulse` — motion concern, not a static variant.
4. `clickable` — interaction concern, not chrome.

### Dropped (2)

1. `gradient` — needs a multi-stop fill the Badge meta scale cannot express cleanly at pill size; would force raw values, not load-bearing for a status chip.
2. `glass` — requires backdrop-filter + translucency tokens absent from the token set; would force raw values.

---

<!-- source: packages/core/catalog/button.audit.md -->
## Button variant axis — saturation audit

- **Category:** atom / control
- **Host:** `Button` (`packages/core/src/components/Button.tsx`)
- **Axis:** `variant` (visual chrome family)
- **Default-first anchor:** `solid` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, base 0% → hover 50% → active 100%)`, no border, `boxShadow` (shadow.lg) elevation | A multi-stop gradient fill cannot be expressed by `solid` (single flat fill) or `soft` (single translucent fill). |
| `link` | no fill, no border, `text-decoration: underline`, text-color only | `ghost` fills on hover; the underline-based inline-link skeleton is a distinct chrome. |
| `neon` | transparent fill, saturated `border`, multi-spread outer `boxShadow` glow, `text-shadow` glow | `outline` is a flat border with no glow/elevation; neon adds luminous elevation in pure CSS. |

All three compose color exclusively from existing scale tokens via `cssVar()`
(`semantic.<color>.base|hover|active|foreground`, `semantic.border.*` for
`neutral`, `shadow.lg`). Gradient/glow strings are the only inline composition,
and their colors are token-derived.

### Candidate accounting (15 surveyed)

- **reviewed:** 12
- **absorbed:** 2 — `elevated` (folds into `gradient`'s `shadow` elevation), `text` (folds into `link`).
- **noise:** 1 — `blur`/glass-morphism (needs a backdrop-filter + glass token absent from the contract; out of scope for a pure-token chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token not present in `SemanticColors`; would force raw values.
  - `raised` — duplicates `solid` + `shadow`; no distinct chrome beyond elevation already reachable.
  - `dashed` — border-style variation only; an orthogonal sub-axis, not a fill/chrome family.
- **unreviewed:** 3 (= 15 − 12 reviewed)

### Notes

- New members appended to the union tail; `solid` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-button-variant={variant}` (first axis hook on
  this host; future axes should follow the same `data-bbangto-button-*`
  convention).

---

<!-- source: packages/core/catalog/calendar.audit.md -->
## Calendar — layout axis audit

- **Category:** molecule
- **Host:** `Calendar` (`packages/core/src/components/Calendar.tsx`)
- **Axis:** `layout` (`CalendarLayout` union / `data-bbangto-calendar-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `fullscreen` | layout | Full-bleed viewport surface (`100vw`/`100vh` flex column) with the card chrome stripped — `border: none`, `radius.none`, `shadow.none`. The header becomes a top **toolbar track** (`data-bbangto-calendar-toolbar`, elevated surface + `border.base` bottom divider) carrying the prev/next nav. The day grid `flex`-grows with tall `gridAutoRows: minmax(96px, 1fr)`; each day cell is an enlarged, top-anchored **content container** (`flex-direction: column`, `align-items: stretch`) holding a `data-bbangto-calendar-events` stacked event-entry host below the date number. Distinct from `month`/`compact` (fixed-width card, centred pill cells). |
| `scheduler-split` | layout | Bordered **card** chrome retained on the root; the body reflows into a 2-track grid via a scoped `@media (min-width: 1024px)` rule on `.bbangto-calendar-scheduler` → `grid-template-columns: 1fr 240px`. Track 1 = the month calendar column (weekday header + day grid); track 2 = an adjacent **vertical time-slot list** (`role="list"`, `border.muted` left divider separating the tracks). Single stacked column below `lg`. Distinct from `dual` (two month grids, no card-spanning split) and `week` (single row). |

### Tally

- **reviewed:** 12
- **absorbed:** 8 — candidates folded into the two adopted skeletons rather than seeded as new members:
  - "event-calendar" / "agenda-month" / "month-with-events" → all reduce to `fullscreen`'s enlarged day-cell + stacked event-entry host; no skeleton delta.
  - "day-view" / "timeline-day" → the time-slot track of `scheduler-split` viewed in isolation; not a separate layout skeleton.
  - "booking-grid" / "availability-picker" → `scheduler-split`'s calendar-beside-slots composition with a different payload (a data concern, not a layout member).
  - "edge-to-edge-month" → the chrome-removal half of `fullscreen`; no independent value.
- **noise:** 1 — "rounded-card-month" (a re-skin of the existing default `month` card; pure styling, no axis member).
- **dropped:** 1
  - "today-jump-button" — dropped: a Today affordance in the fullscreen toolbar would call `Date.now()` (the component deliberately avoids implicit `Date.now()` for seeding) and re-anchor navigation, violating the display-only invariant ("날짜선택/월이동 behavior 불변"). Toolbar ships prev/next nav only.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `month` remains the first union value and `layout = 'month'` default is untouched — existing call sites/stories render byte-for-byte unchanged (verified: shared `getDayCellStyle`/`gridStyle`/header all fall through their new branches as `null` for legacy layouts).
- New members appended to the end of the `CalendarLayout` union; the type is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. `semantic.border` references stay within `base`/`muted`/`strong`/`focus` (no `subtle`). No gradient/glass synthesis was needed for these two layouts.
- Responsive 2-col (`scheduler-split`) uses the scoped `<style>` + `breakpoints.lg` + `.bbangto-calendar-*` namespace pattern (mirrors `Hero`); the story asserts the `@media` rule via aggregated `<style>` text to stay viewport-independent.
- a11y contract intact: `role="grid"` + roving `tabIndex` + `aria-selected` and the prev/next month navigation are unchanged in both new layouts; play functions re-verify selection toggle and month nav.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/card.audit.md -->
## Card — variant axis audit

| field      | value                          |
|------------|--------------------------------|
| category   | surface / container            |
| host       | Card (`@centurio1987/core`)    |
| axis       | `variant`                      |
| saturation | round 1 (pilot)                |

### Tally

| metric           | count |
|------------------|-------|
| reviewed         | 10    |
| absorbed         | 5     |
| adopted (new)    | 2     |
| noise            | 0     |
| dropped          | 5     |
| unreviewed       | 0     | (= 10 − reviewed)

### Adopted members

- **retro** (variant) — load-bearing: thick flat solid border (`spacing.3`, `border.strong`)
  + hard offset box-shadow `4px 4px 0 0` (0 blur / 0 spread, no soft elevation) + flat
  single-colour fill + zero `radius.none`. Distinct from `elevated` (soft blurred shadow).
- **pixel** (variant) — load-bearing: `radius.none` + stepped 8-bit frame built from 8
  layered box-shadow steps (negative-spread stair-stepped corners) instead of a smooth
  1px border (`border: none`) + flat fill. Distinct from `outlined` (single smooth border).

### Absorbed (already covered by an existing member — no new member added)

1. `card` — generic default; absorbed by existing `elevated`.
2. `bordered` — plain single-line frame; absorbed by existing `outlined`.
3. `surface` / `tonal` — flat tinted fill; absorbed by existing `filled`.
4. `flat` — no shadow + border; absorbed by `outlined`.
5. `sunken` / `inset` — recessed background; absorbed by `filled` (`background.sunken`).

### Dropped (reviewed, not adopted)

1. `glass` — requires backdrop-filter blur + translucent layering; no token coverage and
   not a hard-edged member; out of scope for this axis pilot.
2. `gradient` — needs a multi-stop gradient fill; no gradient token, conflicts with the
   flat-fill direction of this round.
3. `neon` / `glow` — soft coloured glow halo; overlaps elevation semantics and needs a
   blurred shadow, opposite of the hard-edged intent.
4. `aurora` — animated moving gradient; motion-coupled, belongs to the motion catalog, not
   a static `variant`.
5. `skeuomorphic` — inner+outer bevel highlights requiring 4+ light/shadow tokens not in
   the palette; redundant next to `retro` for the "tactile" use case.

### Notes

- default-first preserved: union head stays `elevated`; new members appended at the tail,
  so existing call sites and stories render identically.
- All colours sourced from `cssVar('semantic','border','strong')` and
  `cssVar('semantic','background','elevated')`; offsets/widths from `spacing` tokens;
  corners from `radius.none`. No raw colour values.
- Root exposes both `data-card-variant` (existing convention) and the new
  `data-bbangto-card-variant` hook used by the variant stories.

---

<!-- source: packages/core/catalog/carousel.audit.md -->
## Carousel variant axis — saturation audit

- **Category:** molecule / disclosure-navigation
- **Host:** `Carousel` (`packages/core/src/components/Carousel.tsx`)
- **Axis:** `variant` (track/slide visual treatment)
- **Default-first anchor:** `flat` (newly introduced union head; reproduces the prior render exactly, so every existing call site and story is byte-for-byte unchanged)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `edge-fade` | `mask-image: linear-gradient(to right, transparent 0%, opaque 8%, opaque 92%, transparent 100%)` on the track; borderless continuous single track | The track edges physically dissolve via an alpha mask — neither `flat` (hard clipped edges) nor any indicator/size axis can express a feathered overflow boundary. |
| `media-overlay` | full-bleed media (`object-cover`) with an absolutely-positioned panel and a bottom `linear-gradient` scrim (opaque→transparent); no separate text row | A scrim-on-media composition layers content over imagery for legibility; `flat`/`elevated` are opaque card surfaces with no media bleed or gradient scrim. |
| `elevated` | filled `background` (background.elevated) + `box-shadow` (shadow.lg) lift + radius | A raised, detached card surface. `flat` has no fill/shadow; the lift is a distinct depth treatment, not reachable by border tweaks. |

All members compose color exclusively from existing tokens via `cssVar()`
(`semantic.foreground.base` for the mask/scrim alpha stops,
`semantic.background.elevated`, `shadow.lg`, `radius.md`). The mask and scrim
gradient strings are the only inline composition; their colors are token-derived
(no raw hex/rgba). `semantic.border.subtle` was deliberately avoided (undefined
in the contract — only base/muted/strong/focus exist).

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `borderless` (folds into `edge-fade`), `peek`/`carded-bleed` (fold into `media-overlay`'s bleed), `raised` and `floating` (fold into `elevated`'s shadow lift).
- **noise:** 2 — `glass` (needs `backdrop-filter` + a translucent surface token absent from the contract) and `parallax` (a scroll-motion behavior, not a static chrome family).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a glass surface token not present in `SemanticColors`; would force raw values.
  - `parallax` — depth motion tied to scroll position; orthogonal motion sub-axis, not a track/slide chrome.
  - `coverflow` — a 3D `perspective`/`rotateY` transform per slide; an orthogonal transform-geometry axis, out of scope for a chrome family.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New members appended to the union tail; `flat` is the default so the legacy
  single-track render is preserved for all existing stories/call sites.
- Root now renders `data-bbangto-carousel-variant={variant}`, following the
  existing `data-bbangto-carousel-*` hook convention (`-size`, `-fade`,
  `-track`, `-indicator`). Per-slide hook `data-bbangto-carousel-slide` and the
  `data-bbangto-carousel-scrim` element were added for stable test targeting.
- **a11y contract:** root now carries `role="region"` +
  `aria-roledescription="carousel"` + `aria-label`, and `ArrowLeft`/`ArrowRight`
  keyboard navigation was added on the root (additive — does not alter any
  existing variant's render or assertions). New variants inherit and preserve
  this contract; each variant story verifies role/aria-roledescription and
  keyboard movement.

---

<!-- source: packages/core/catalog/checkbox.audit.md -->
## Checkbox variant axis — saturation audit

- **Category:** atom / control
- **Host:** `Checkbox` (`packages/core/src/components/Checkbox.tsx`)
- **Axis:** `variant` (visual chrome family of the box)
- **Default-first anchor:** `solid` (newly named head = the historical native
  `accentColor` box; existing call sites/stories render identically)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, base 0% → hover 50% → active 100%)` on an `appearance:none` box, `border: none` (the gradient surface *is* the chrome), check glyph layered over the gradient via a scoped `:checked::after` pseudo-element | `solid` paints the box with a single flat `accentColor`; a multi-stop gradient surface (and the borderless "surface-as-chrome" treatment) cannot be expressed by the native accent fill. |

Gradient color is composed exclusively from existing scale tokens via `cssVar()`
(`semantic.primary|error . base|hover|active`, glyph from
`semantic.foreground.inverse`, radius from `radius.sm`). The
`linear-gradient(...)` string is the only inline composition and its stops are
token-derived. No gradient/glass token exists in the contract, so no raw color
is introduced.

### Candidate accounting (12 surveyed)

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

### Notes

- New member appended to the union tail; `solid` is the default so every
  existing call site and story renders identically (native `accentColor` box
  untouched — `width/height/accentColor` computed styles preserved).
- Root `<label>` now renders `data-bbangto-checkbox-variant={variant}` (first
  axis hook on this host; future axes should follow the same
  `data-bbangto-checkbox-*` convention).
- The gradient glyph uses a scoped `<style>` with the `.bbangto-checkbox-*`
  namespace (Hero pattern) so the check is CSS-only (`:checked::after`),
  requiring no React state in the leaf.

---

<!-- source: packages/core/catalog/chip-tag.audit.md -->
## Chip (chip-tag) — variant axis audit

- **Category:** atom / selection-display
- **Host:** `Chip` (`packages/core/src/components/Chip.tsx`)
- **Axis:** `variant` (`data-bbangto-chip-tag-variant`)
- **Saturation round:** 1 (pilot)

### Adopted members

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

### Counts

- reviewed: 8
- absorbed: 5
- noise: 1
- dropped: 2 (see below)
- adopted: 3 (`solid`, `outline`, `avatar`)
- unreviewed: 0 (= 8 − 8 reviewed)

> Breakdown: reviewed (8) = absorbed (5) + noise (1) + dropped (2). The 3 adopted
> members are the accepted output of the pilot round; the 8 reviewed are the
> remaining candidates triaged into absorbed / noise / dropped.

### Absorbed (5)

Candidate intents already covered by an adopted member:

1. `filled` → identical to adopted `solid` (opaque accent fill).
2. `bordered` → identical to adopted `outline` (border ring chrome).
3. `hollow` → synonym of `outline`.
4. `image` → leading raster media is covered by the `avatar` media slot.
5. `thumbnail` → leading-media structure is covered by `avatar`.

### Noise (1)

Off-axis — not a `variant` concern:

1. `rounded` — shape/radius concern, belongs to a `shape`/`size` axis, not chrome.

### Dropped (2)

1. `gradient` — needs a multi-stop translucent fill the chip color scale cannot
   express at chip size without raw values; not load-bearing for a compact chip.
2. `glass` — requires `backdrop-filter` + translucency tokens absent from the token
   set; would force raw values.

---

<!-- source: packages/core/catalog/clients.audit.md -->
## Clients / LogoCloud — layout axis audit

- **Category:** block
- **Host:** `LogoCloud` (`packages/core/src/blocks/LogoCloud.tsx`)
- **Axis:** `layout` (`LogoCloudLayout` union / `data-bbangto-logocloud-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `scroll-columns` | layout | Root viewport is a horizontal flex of N (=3) VERTICAL flex tracks (multi-column). Each column owns a `translateY` infinite loop in alternating up/down directions (`bbangto-logocloud-scroll-up` / `-scroll-down` keyframes) with a per-column staggered `animation-duration` (`18s + col*4s`). The fixed-height viewport clips with `overflow: hidden` and fades its top/bottom edges via a vertical `mask-image: linear-gradient(transparent → opaque → opaque → transparent)` (opaque stops composited from `foreground.base`; mask alpha-only). `border: none`. Hover pauses all tracks; reduced motion freezes every column to a static set and hides clones. Distinct from `marquee` by a vertical track direction and a changing column count (structural reflow), not a restyle of the single horizontal row. |

### Tally

- **reviewed:** 12
- **absorbed:** 6 — folded into `scroll-columns` (no separate member warranted):
  - "vertical-marquee" — a single upward column is `scroll-columns` with N=1; the column-count knob already covers it.
  - "two-column-ticker" — same skeleton at N=2; column count is a parameter, not a member.
  - "wall-of-logos" — a dense auto-scrolling grid is the multi-column track set viewed at higher density.
  - "alternating-scroll" — up/down direction alternation is already the per-column default of this member.
  - "edge-fade-rail" — the vertical mask gradient is an intrinsic part of this member's viewport, not a standalone layout.
  - "infinite-vertical" — the seamless `translateY(-50%)` clone loop is this member's core mechanism.
- **noise:** 4
  - "logo-carousel" — paged/snap navigation belongs to the `Carousel` host, not a LogoCloud layout.
  - "hover-zoom-grid" — a per-cell hover affordance (already present as the grayscale/opacity transition), not a layout skeleton.
  - "tooltip-on-logo" — overlay/tooltip concern, orthogonal to logo arrangement.
  - "click-to-filter" — interactive filtering is application state, not a layout member.
- **dropped:** 1
  - "diagonal-scroll" — dropped: a diagonal drift is `scroll-columns` plus a cosmetic `translateX` skew with no skeleton (track-count / track-direction) difference; it would duplicate the vertical loop while harming readability and reduced-motion clarity.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `grid` remains the first union value and the default (`layout = 'grid'`), so existing call sites and stories render unchanged.
- New member appended to the end of the `LogoCloudLayout` union; a standalone `LogoCloudScrollColumnsLayout` alias is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The vertical mask gradient is synthesized inline (no gradient token exists) but its opaque stops reference `cssVar('semantic','foreground','base')`; mask uses alpha only, so the colour choice is non-load-bearing.
- a11y contract preserved: the masked viewport is the `role="list"`; logo cells keep `role="listitem"`; presentational column wrappers (`role="presentation"`) keep listitems as effective list members; clone sets are `aria-hidden` + `role="presentation"`; `img alt` is untouched.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/date-picker.audit.md -->
## DatePicker variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `DatePicker` (`packages/core/src/components/DatePicker.tsx`)
- **Axis:** `variant` (visual / interaction family)
- **Default-first anchor:** `default` (popover-triggered field; union head preserved so every existing call site and story renders identically)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `inline-week-strip` (layout) | Always-visible single horizontal week rail — **no popover**. Root rail is a `grid-template-columns: auto 1fr auto` track for `[prev-chevron \| inline day-cell track \| next-chevron]`; 7 day cells in one inline horizontal track; selected day is a solid-fill **pill** (`primary.base` bg + `radius.full`), unselected cells are ghost (transparent). | `default` is a triggered overlay month grid. A flat, always-on, single-row rail with chevron paging and pill selection cannot be expressed by the popover field — the inline 3-track rail layout *is* the chrome. |
| `wheel` (layout) | Multi-column **scroll-snap drum**: `grid-template-columns: repeat(3, 1fr)` (day/month/year), each column an `overflow-y` scroll track with `scroll-snap-type: y mandatory`; a fixed centre selection **band** (`border-y` via `border.strong` + `primary.subtle` fill) absolutely overlaid at vertical centre; top+bottom edge fade via a `mask-image: linear-gradient(...)`. No month grid, no popover. | Neither the popover grid nor the week rail expresses a vertically-scrolling, snap-aligned drum with a fixed centre band and edge-fade mask. The scroll-snap + mask compositing is the entire interaction model. |
| `ghost` (variant) | Trigger drops its border box (`border: none`) and fill (`background: transparent`); chrome treatment is **none** vs the default outlined field; only a trailing calendar **icon-button** remains; focus is a subtle ring (`box-shadow: 0 0 0 2px border.focus`, no offset) instead of a bordered box. | `default` always paints a 1px bordered, filled field. A borderless, fill-less trigger whose only affordance is a trailing icon-button and whose focus is a ringed (not boxed) state is a distinct trigger chrome. |

Colors are composed exclusively from existing semantic scale tokens via
`cssVar()` (`primary.base/subtle/foreground`, `border.base/strong/focus`,
`background.base`, `foreground.base/muted`); spacing/radius from the spacing and
radius scales. The only non-token literals are the `wheel` mask gradient stops
(`transparent`/`#000`) — these are an alpha-channel mask, not a themeable color,
so no theme token applies.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 7 — `horizontal-calendar` and `day-rail` (synonyms, fold into `inline-week-strip`); `scroller`, `drum`, `spinner-columns` (fold into `wheel`'s scroll-snap drum); `borderless` and `minimal-field` (fold into `ghost`'s no-box/no-fill trigger).
- **noise:** 0
- **dropped:**
  - `inline-month-grid` — an always-visible full month grid is just the `default` calendar un-popped; not a distinct chrome family and it duplicates the `Calendar` component's scope rather than the trigger axis.
  - `range` — date-range (two-thumb / start–end) is a selection-model behaviour sub-axis, not a trigger/layout chrome family; out of scope for this visual axis.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New members appended to the union tail; `default` remains the head and the
  default prop value, so all existing call sites and stories render identically.
- Root element renders `data-bbangto-date-picker-variant={variant}` for every
  variant (new axis hook; `default` now also emits it but no existing story
  depends on its absence).
- a11y contract preserved: day cells keep `aria-selected`; `inline-week-strip`
  uses `role="grid"`/`role="gridcell"` with roving `tabIndex` + Arrow-key paging;
  `wheel` columns are `role="listbox"`/`role="option"` with `aria-selected`;
  `ghost` reuses the unchanged popover calendar behaviour.
- Responsive 2-col was not required for any adopted member; the only scoped
  `<style>` is the namespaced `.bbangto-date-picker-wheel-track` edge-fade mask,
  following the Hero `.bbangto-<comp>-*` precedent.

---

<!-- source: packages/core/catalog/dialog.audit.md -->
## Dialog (Modal) variant axis — saturation audit

- **Category:** organism / overlay
- **Host:** `Modal` (`packages/core/src/components/Modal.tsx`)
- **Axis:** `variant` (visual / structural family of the dialog surface)
- **Default-first anchor:** `popup` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Kind | Load-bearing treatment | Why irreducible to existing members |
|--------|------|------------------------|-------------------------------------|
| `side-sheet` | layout | Panel docks to the inline-end (right) viewport edge: overlay `align-items: stretch` + `justify-content: flex-end`; panel `block-size: 100vh` with `inline-size` capped by the `sm/md/lg` max-inline-size token (never full-width); enters via a **translateX** slide (`--bbangto-slide-x: 100%`, `--bbangto-slide-y: 0`) with `radius.xl` on the leading corners + `shadow.xl`. | `popup` centers a scale-in card; `full` is edge-to-edge with no slide; `bottom-sheet` docks to the **block-end** edge, is **full inline-size**, and enters on the **Y axis** (`--bbangto-slide-y: 100%`). A right-edge, token-capped, X-axis-sliding surface is a distinct anchor + slide-axis no existing member expresses. |

`side-sheet` composes color/space/elevation exclusively from existing tokens via
`cssVar()` (`semantic.background.base`, `semantic.foreground.base`, `radius.xl`,
`shadow.xl`, `motion.duration.normal`, `motion.easing.{in,out}`) and reuses the
host's existing `POPUP_MAX_WIDTH` cap + the shared `bbangto-slide-in/out`
keyframes. Layout uses only primitives (`vw`, `vh`, `%`) per the `Hero` precedent.
Legacy members (`popup`, `full`, `bottom-sheet`) keep their exact prior render.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 8
  - `drawer` → left/right edge drawer is the `side-sheet` layout (edge anchor differs only by side).
  - `right-panel` → inline-end docked panel == `side-sheet`.
  - `left-sheet` → mirror-side `side-sheet` (same anchor family, opposite inline edge).
  - `inspector` / `detail-pane` → persistent edge-docked side surface == `side-sheet`.
  - `action-sheet` → block-end docked list == `bottom-sheet`.
  - `sheet` → bare block-end sheet == `bottom-sheet`.
  - `fullscreen` → edge-to-edge surface == `full`.
  - `centered` / `dialog` → centered scale-in card == `popup` (default head).
- **noise:** 1
  - `wide` → an inline-size *magnitude*, i.e. the existing `size` (sm/md/lg) sub-axis, not a distinct chrome/layout family.
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `command-palette` — a composed search/list *feature* pattern (input + filtered results behavior), not a chrome/layout variant of the dialog surface; out of axis scope.
- **unreviewed:** 0 (= 12 − 12 reviewed)

Accounting closes: 1 adopted + 8 absorbed + 1 noise + 2 dropped = 12 reviewed.

### Notes

- New member appended to the union tail (`ModalVariant`); `popup` remains the
  default so every existing call site and story renders identically.
- Root panel now renders `data-bbangto-dialog-variant={variant}` for all variants
  (first canonical axis hook on this host), mirroring the
  `data-bbangto-popover-variant` / `data-bbangto-hero-layout` convention.
- a11y contract hardened so the new variant ships accessible without regressing
  the legacy ones: panel gains `tabIndex={-1}` and receives focus on open, focus
  returns to the previously focused element on close, `Tab`/`Shift+Tab` are
  trapped within the panel, and `Escape` dismisses (suppressed while `loading`).
  `role="dialog"` + `aria-modal="true"` retained. The `SideSheet` play asserts
  `aria-modal`, the heading/content slots, and `Escape` dismissal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var). `side-sheet` reuses the host's existing raw
  `POPUP_MAX_WIDTH` cap (the established max-inline-size pattern on this host)
  rather than introducing a new sizing token.

---

<!-- source: packages/core/catalog/dock.audit.md -->
## Dock — variant axis audit

- **Category:** organism / section block
- **Host:** `Dock` (`packages/core/src/blocks/Dock.tsx`)
- **Axis:** `variant` (`DockVariant` union / `data-bbangto-dock-variant`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `glass` | variant | Frosted-chrome treatment. The solid elevated fill is dropped and composited toward transparent (`color-mix(in srgb, background.elevated 50%, transparent)`) so the backdrop reads through; the elevation drop shadow is replaced by a single thin **inset** highlight rim (`inset 0 0 0 1px color-mix(border.strong 55%, transparent)`, `border: none`); stronger `blur(18px)` backdrop-filter than `floating`'s `blur(12px)`. Distinct from `floating`, whose chrome is an *opaque* elevated surface + a `shadow.lg` drop shadow. The translucent fill (resolved `rgba(...)`) + inset rim are the skeleton difference, not the blur alone. |
| `spotlight` | variant | Glow-indicator chrome. The container is near-invisible (`background: transparent`, `border: none`, `box-shadow: none`, `backdrop-filter: none`) and the active affordance lives entirely in two per-item layers: a blurred token-gradient limelight beam behind the active item (`linear-gradient(to bottom, color-mix(primary.base 60%, transparent), transparent)` + `filter: blur(spacing.8)`, `position: absolute`, `z-index: -1`) plus a thin glowing emitter bar across its top (`primary.base` + token glow `box-shadow`). The active pill fill is suppressed in this variant. Distinct from every other member: the indicator is a soft glow column (gradient `background-image`), not an underline / pill / border shape. Inactive items render no beam. |

### Tally

- **reviewed:** 12
- **absorbed:** 4
  - "blur-dock" / "frosted" → folded into `glass` (translucent + backdrop-blur is the same skeleton; the existing `floating` already carries blur, so only the no-fill / inset-rim glass treatment is the new member).
  - "acrylic" → `glass` (acrylic = same translucent-pane-with-rim recipe).
  - "limelight" → `spotlight` (the beam-behind-active-item is the defining trait already captured).
  - "neon-glow" / "active-glow" → `spotlight` (a glowing indicator over the active item is the same glow-chrome, no new container reflow).
- **noise:** 1
  - "magnify" — hover scale-up of the active/hovered icon is already an intrinsic behaviour of the base Dock (`scale(1.2) translateY(-4px)` on the icon wrap); surfacing it as a "variant" is noise, not a distinct chrome skeleton.
- **dropped:** 1
  - "vertical-rail" — dropped: a side-mounted vertical dock is an *orientation* concern (flex-direction + edge anchoring), an orthogonal axis to this container-chrome `variant` axis; it would reshape the nav landmark/layout rather than re-skin it, so it belongs to a future `orientation` axis, not `variant`.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `floating` remains the first union value and the `variant = 'floating'` default is untouched — existing call sites and the `Default` / `Minimal` / `VariantAttached` / `VariantLabeled` stories render byte-identical.
- New members appended to the end of the `DockVariant` union; each member literal is also exported as a named type (`DockVariantGlass`, `DockVariantSpotlight`) from the component file (barrel re-exports via `export *`).
- a11y contract maintained across all variants: the `<nav aria-label="Dock">` landmark is unchanged, each item stays a `<button>` with `aria-pressed` + `aria-label`, and focus drives the same hover/scale state (`onFocus`/`onBlur`). Glow/glass layers are `aria-hidden` decorative spans with `pointer-events: none`, so keyboard focus order and screen-reader semantics are unaffected. Verified in each new story's `play` (role lookups + `aria-pressed` assertions).
- All styling uses `cssVar()` tokens. The glass translucency, glass rim, and spotlight beam gradient are synthesized inline (no glass/gradient token exists) but every colour is a `cssVar()` reference composited via `color-mix(... transparent)`; only dimensionless/length literals (`1px`, `2px`, `0 0 8px`, percentages) are raw, matching the existing component's `40px`/`56px` precedent. `semantic.border` usage stays within `base|muted|strong|focus` (no invalid `subtle`).
- No new props introduced — both members are pure chrome re-skins driven by the existing `variant` prop and the existing `item.active` flag.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/empty-state.audit.md -->
## EmptyState variant axis — saturation audit

- **Category:** organism / status surface
- **Host:** `EmptyState` (`packages/core/src/components/EmptyState.tsx`)
- **Axis:** `variant` (panel chrome family)
- **Default-first anchor:** `plain` (newly introduced union head; the original
  chrome-less render is preserved byte-identically when `variant` is omitted)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `gradient` | `backgroundImage: linear-gradient(135deg, primary.base 0% → primary.hover 60% → primary.active 100%)`, `border: none`, inverse-friendly text (`primary.foreground`) | A multi-stop gradient fill cannot be expressed by `plain` (no fill) or `outlined` (transparent outline only). Synthesized from the primary scale. |
| `outlined` | `1px solid semantic.border.base` + `radius.lg`, `backgroundColor: transparent`, no `boxShadow` | Pure outline chrome — no fill, no elevation. Distinct from `gradient` (filled) and `pixel` (hard-shadow). |
| `pixel` | `radius.none` (0) + stepped blur-0 `boxShadow` (`4px 4px 0 border.strong, 8px 8px 0 border.muted`), `2px solid border.strong` | Anti-rounded retro 8-bit frame. The blur-0 stepped shadow + zero radius is the inverse of every rounded/soft card; unreachable by `outlined`'s flat 1px border. |

All members compose color exclusively from existing tokens via `cssVar()`
(`semantic.primary.base|hover|active|foreground`, `semantic.border.base|strong|muted`,
`radius.none|lg`, `semantic.background.base`). The gradient and stepped-shadow
strings are the only inline composition, and their colors are token-derived.
Note: `semantic.border.subtle` is intentionally avoided (absent from the
contract; would resolve to an undefined CSS var).

### Candidate accounting (9 surveyed)

- **reviewed:** 9
- **absorbed:** 4 — `elevated` (folds into `pixel`'s shadow chrome), `bordered`
  (folds into `outlined`), `vibrant`/`hero` (fold into `gradient`'s fill).
- **noise:** 2 — `glass` (needs `backdrop-filter` + a glass surface token absent
  from the contract), `dashed` (a border-style sub-axis, orthogonal to the
  chrome family).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token not in
    `SemanticColors`; would force raw values.
  - `elevated` — duplicates a card + `shadow` already reachable via `pixel`'s
    hard shadow / a soft elevation token; no distinct chrome family.
  - `illustration` — a content/slot concern (large hero artwork), not a panel
    chrome treatment; belongs to the icon/media slot, not this axis.
- **unreviewed:** 0 (= 9 − 9 reviewed)

### Notes

- New members appended to the union tail; `plain` is the default so every
  existing call site and story (Default, Minimal, Size*, Align*, Loading*)
  renders identically.
- Root now renders `data-bbangto-empty-state-variant={variant}` on both the
  loading-skeleton and content render branches (first axis hook on this host;
  future axes should follow the same `data-bbangto-empty-state-*` convention).
- a11y contract preserved: title text remains visible and the action slot stays
  keyboard-focusable across all three variants (verified in each `play`).

---

<!-- source: packages/core/catalog/features.audit.md -->
## FeatureGrid — Layout Axis Audit

- **Category:** blocks (section/organism)
- **Host:** `FeatureGrid` (`packages/core/src/blocks/FeatureGrid.tsx`)
- **Axis:** `layout` (`FeatureGridLayout` union)
- **Saturation round:** 1 (pilot)

### Pre-existing members (default-first preserved)

`grid` (default) · `alternating` · `list` · `bento`

### Adopted this round (with load-bearing spec)

- **`panel-showcase`** (layout) — 2-track split grid: a vertical stack of
  selectable header rows (active row marked by underline + fill + left border)
  on one side + a SINGLE shared media/content panel on the other that swaps to
  the active item. Load-bearing: only one shared media slot synced to selection
  (`data-bbangto-featuregrid-panel`, exactly one), vs grid/alternating which
  carry per-item media; responsive `1fr 1.6fr` split at ≥ lg via scoped
  `<style>`; ARIA tablist/tab/tabpanel contract.
- **`stacked-deck`** (layout) — overlapping cards placed on a shared CSS
  `grid-area` (single stack cell) with incremental translate-x/translate-y
  offsets and z-index layering to fan the deck; rounded border + semi-transparent
  surface (color-mix synthesised from `background.elevated`) per card.
  Load-bearing: cards occupy the same cell (`grid-area: 1 / 1`) and overlap —
  NOT a flow grid.

### Tally

| metric | count |
|--------|-------|
| reviewed | 12 |
| adopted | 2 |
| absorbed | 5 |
| noise | 3 |
| dropped | 2 |
| unreviewed (12 − reviewed) | 0 |

#### Absorbed (5) — already expressible by an existing member

- `masonry` → covered by `bento` mixed-span.
- `cards` → plain `grid` (default) already renders outlined cards.
- `two-column` → `grid` with 2-track intrinsic minmax.
- `feature-list` → `list`.
- `zigzag` → `alternating`.

#### Noise (3) — not a layout-axis concern

- `with-icons` (content/prop concern, not arrangement).
- `dark` (theme/token concern).
- `compact` (density/spacing prop, orthogonal to layout).

#### Dropped (2) — name + reason

- `carousel` — dropped: requires autoplay/scroll-snap + paging controls; a
  motion/navigation widget, out of scope for a static layout axis.
- `accordion` — dropped: collapse/expand disclosure interaction belongs to a
  dedicated Accordion component, not a FeatureGrid layout.

### Notes

- Data hook follows the existing axis convention
  `data-bbangto-featuregrid-layout={layout}` (not a new `data-bbangto-features-*`).
- All colours/spacing/radius from `cssVar()` tokens; `border.subtle` avoided
  (undefined var) — used `border.base`/`border.strong`. Semi-transparent deck
  surface synthesised via `color-mix` over a token colour (no glass token).

---

<!-- source: packages/core/catalog/file-upload.audit.md -->
## FileUploader variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `FileUploader` (`packages/core/src/components/FileUploader.tsx`)
- **Axis:** `variant` (layout / upload-target family)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `avatar` | Circular media slot (`border-radius: radius.full`), thin **solid** 1px border, image fills the slot via `background-size: cover` / `background-position: center`, hover dims (`opacity` transition). The dashed rectangular dropzone chrome is removed entirely — the round slot itself IS the upload target. | `default` and `compact` are both rectangular dropzones with a **dashed** border and external chrome (cloud icon / "Choose file" button). The avatar-as-target treatment (round, solid-bordered, image-filled, hover-dim) is a distinct target form, not a size/density variation of the dashed dropzone. |

All chrome composes from existing tokens via `cssVar()`
(`radius.full`, `semantic.border.base|focus`, `semantic.background.sunken`,
`semantic.disabled.background`, `semantic.foreground.muted`, `semantic.primary.base`,
`motion.duration.fast` / `motion.easing.default`, `spacing.64`). The image
preview `url(...)` is the only inline composition and carries no design value.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `circle` (same round-target idea), `profile` (avatar synonym),
  `thumbnail` (image-fill slot, square sub-case of the round media slot),
  `image-preview` (folds into the filled-slot preview behavior),
  `inline-avatar` (size/placement variation, not a new chrome family).
- **noise:** 3 — `gallery` (multi-image grid; an orthogonal layout axis, not a
  target family), `kanban-drop` (cross-component DnD board, out of host scope),
  `paste-zone` (input-method variation reusing the same dropzone chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent
    from `SemanticColors`; would force raw values.
  - `gradient-ring` — needs a multi-stop gradient ring not derivable as a single
    border token; chrome not expressible without raw gradient color stops beyond
    the avatar's solid-border spec.
  - `bordered-card` — duplicates the existing rectangular dropzone framing; no
    distinct chrome beyond `default`/`compact`.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New member appended to the union tail; `default` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-file-upload-variant={variant}` across all three
  variant branches (first axis hook on this host; future axes should follow the
  same `data-bbangto-file-upload-*` convention).
- a11y contract preserved: the circular target is keyboard-operable
  (`role="button"`, `tabIndex`, Enter/Space via `onKeyDown`) with an
  `aria-label`, and the hidden `input[type=file]` access is retained.

---

<!-- source: packages/core/catalog/footer.audit.md -->
## MarketingFooter — layout axis audit

- **Category:** block
- **Host:** `MarketingFooter` (`packages/core/src/blocks/MarketingFooter.tsx`)
- **Axis:** `layout` (`MarketingFooterLayout` union / `data-bbangto-marketingfooter-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `wordmark` | layout | An OVERSIZED full-bleed brand band rendered as its own full-width root track (`.bbangto-marketing-footer-wordmark`): `font-size: clamp(6rem, 12vw, 16rem)` floored at 6rem, `display` `fontWeight`/`lineHeight`/`letterSpacing` tokens for tight leading, uppercased, `white-space: nowrap` + `overflow: hidden`. Link columns are stacked ABOVE the band (`.bbangto-marketing-footer-columns`) and the social/copyright bottom bar is stacked BELOW it. The brand IS the band — distinct from the small inline logo slot the columns layout uses. Wordmark content comes from the new `wordmark` prop (falls back to `logo`). |
| `gradient` | variant | Chrome variant of the columns skeleton. Root surface is a multi-stop token-composited `linear-gradient(135deg, background.sunken → primary.subtle → background.elevated)` (with a `background.base` fallback) replacing the flat `background.sunken` fill — NO flat fill. An overlaid grid/dot pattern is painted inside an absolutely-positioned `overflow: hidden` wrapper (`.bbangto-marketing-footer-gradient-pattern`, `z-index: 0`) via a `radial-gradient` dot field (`border.muted` dots, `spacing.24` tile), sitting behind the content (inner lifted to `z-index: 1`). A top divider `border` (`border.muted`) is applied to the bottom bar. Distinct from the columns layout's flat sunken surface. |

### Tally

- **reviewed:** 12
- **absorbed:** 6
  - "big-type-footer" → folded into `wordmark` (an oversized brand headline is exactly the wordmark band).
  - "brand-band" → folded into `wordmark` (a full-width brand strip is the band's root track).
  - "marquee-brand" → folded into `wordmark` (band minus animation; the marquee scroll is a motion concern, not a layout skeleton).
  - "gradient-mesh" → folded into `gradient` (a mesh surface is just a multi-stop gradient + pattern overlay).
  - "dotted-grid-bg" → folded into `gradient` (the dot/grid pattern layer is already part of the gradient variant).
  - "aurora-footer" → folded into `gradient` (aurora = a gradient colour treatment, no skeleton difference).
- **noise:** 3
  - "dark-footer" — a pure theme/token swap; owned by the theme packages, not a layout member.
  - "newsletter-footer" — adds an email-capture form slot; a content/slot concern, not a layout skeleton axis.
  - "social-first-footer" — reorders the social row above the columns; an ordering tweak with no new skeleton.
- **dropped:** 1
  - "full-bleed-cta-footer" — dropped: overlaps the `CTA` block's responsibility (a footer-embedded call-to-action is a composition of `CTA` + footer, not a footer layout member); no load-bearing footer-skeleton difference.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `columns` remains the first union value and the `layout = 'columns'` default is untouched — existing call sites/stories render unchanged.
- New members (`wordmark`, `gradient`) appended to the END of the `MarketingFooterLayout` union; the type is exported from the component file (barrel re-exports via `export *`, untouched).
- All styling uses `cssVar()` tokens. The gradient strings, the radial dot pattern, and the `clamp()` band size are synthesized inline (no gradient/pattern/oversize tokens exist) but every colour/length is a `cssVar()` reference (only `vw`/`rem`/`%` sizing primitives and `opacity` are raw, matching the Hero precedent).
- `semantic.border` restricted to `base`/`muted`/`strong`/`focus` — the gradient divider and dot pattern use `border.muted` (no `subtle`).
- a11y contract intact: root stays a `contentinfo` `<footer>`, the `Footer navigation` `<nav>` + links + `Social links` list are preserved in both new members; plays assert the `contentinfo` landmark and keyboard focusability of a link.
- Shared files (barrels, tokens, utils, sibling components) untouched. The only new surface is the optional `wordmark` prop added to `MarketingFooterProps` in the component file itself.

---

<!-- source: packages/core/catalog/form.audit.md -->
## Form — layout axis audit

- **Category:** form
- **Host:** `FormLayout` (`packages/core/src/patterns/FormLayout.tsx`)
- **Axis:** `layout` (`FormLayoutLayout`)
- **Saturation round:** 1 (pilot)
- **Reviewed:** 12
- **Absorbed (adopted):** 4
- **Noise:** 2
- **Dropped:** 6
- **Unreviewed:** 0 (= 12 − 12)

### Adopted members (load-bearing)

| Member | Load-bearing skeleton |
|--------|-----------------------|
| `popover` | Floating panel anchored to a trigger: `position: absolute` out of inline flow, fixed width (~20rem), `box-shadow` elevation (shadow-md) + rounded radius. Root sits outside document flow — distinct from `card`/`stacked`. |
| `drawer` | Viewport edge-anchored: root becomes a `position: fixed` translucent scrim; inner panel is `position: fixed` pinned to the inline-end edge, full block-size column with elevation. Internal header / body / footer vertical stack. |
| `dialog` | Centred modal: root `position: fixed` scrim backdrop; inner panel `position: fixed` centred (top/left 50% + `translate(-50%,-50%)`), max-width constrained card with border, rounded corners and elevation. |
| `split` | 2-track grid (`grid-template-columns` info/media panel slot \| form field column) at ≥ lg via scoped `<style>` + `breakpoints.lg`. Left/right split skeleton instead of a vertical stack. |

### Noise (too similar to an adopted/existing member — folded in)

| Candidate | Folded into | Reason |
|-----------|-------------|--------|
| `modal` | `dialog` | Same centred-overlay skeleton; pure naming alias. |
| `sheet` | `drawer` | Edge-anchored fixed panel over a scrim — identical skeleton to drawer. |

### Dropped

| Candidate | Reason |
|-----------|--------|
| `inline` | Equivalent to the existing default `stacked` single-column shell — redundant. |
| `wizard` | Multi-step flow control, not a shell layout axis; belongs to a separate Stepper/flow pattern. |
| `floating-label` | Field-level label treatment (FormRow concern), not a form-shell layout. |
| `grid` | Overlaps `split` / `horizontal`; no distinct root skeleton beyond a column count. |
| `fullscreen` | A maximal sizing variant of `dialog`/`drawer`, not a separate skeleton. |
| `accordion` | Collapsible-section behaviour; belongs to `sectioned` + a Disclosure primitive, not a layout. |

### Notes

- Default-first preserved: union head stays `stacked`; new members appended at the tail. Existing `stacked`/`horizontal`/`card`/`sectioned` render paths untouched.
- All styling via `cssVar()` tokens (semantic.border = base/muted/strong/focus only; scrim uses `semantic.background.overlay`; elevation uses `shadow` scale; stacking uses `zIndex.modal` / `zIndex.popover`).
- a11y contract retained for every member: label association + `aria-invalid` + `fieldset` via FormRow/FormSection — unchanged by the new shells.

---

<!-- source: packages/core/catalog/gallery.audit.md -->
## Gallery — layout axis audit

- **Category:** block
- **Host component:** `Gallery` (`packages/core/src/blocks/Gallery.tsx`)
- **Axis:** `layout` (`GalleryLayout` union)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `split-panel` | layout | Root inner is a 2-track grid (`1fr` mobile → `1fr 1fr` at ≥ lg via scoped `<style>`); one track is a text/CTA `panel` slot, the adjacent track is a media cluster (`repeat(2, 1fr)` 2x2 of bare full-cover cells). Split held level via `align-items: center` + column gap. Cells are bare — `border: none`, `box-shadow: none` (no card chrome). |

Existing members retained, default-first preserved: `grid` (default) · `masonry` · `carousel` · `featured`. New member appended at the end of the union; no existing call site or story render changes.

### Tally

- **reviewed:** 12
- **absorbed:** 7
- **noise:** 1
- **dropped:** 4
  - `bento` — overlaps existing `masonry` + `featured` emphasis grids; no distinct contract.
  - `lightbox-grid` — interaction/overlay axis, not a layout track arrangement; belongs to a separate behavior axis.
  - `fullbleed-mosaic` — edge-to-edge variant of `grid`; covered by `columns` + container width, not a new branch.
  - `polaroid-scatter` — decorative rotation/scatter requires non-token transforms and raw values; rejected to keep tokens-only contract.
- **unreviewed:** 0 (= 12 reviewed − 12 total surfaced)

### Notes

- a11y contract preserved: media cells render `<img alt>` via the shared `renderFigure`; carousel keyboard contract untouched (separate branch).
- Responsive 2-col uses Hero's scoped `<style>` + `breakpoints.lg` + `.bbangto-gallery-*` namespace pattern only.
- All styling via `cssVar()` tokens; no raw values. `panel?: React.ReactNode` prop added (optional, non-breaking).

---

<!-- source: packages/core/catalog/hero.audit.md -->
## Hero — layout axis audit

- **Category:** block
- **Host:** `Hero` (`packages/core/src/blocks/Hero.tsx`)
- **Axis:** `layout` (`HeroLayout` union / `data-bbangto-hero-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `stacked-showcase` | layout | Single-column stack: centred headline + subhead + CTA on top, then a DEDICATED full-width media slot anchored below (`.bbangto-hero-showcase`) with `radius.xl` corners, `shadow.lg` elevation, and `overflow: hidden` to clip media. Media-below composition — distinct from `centered` (no media slot), `split-media` (side-by-side column), and `background-media` (media behind content). |
| `gradient-surface` | variant | Root surface fills with a token-composited `linear-gradient` (`primary.subtle → background.base → primary.base`), `border: none`, no media layer. Centred copy floats on an inner blurred glass panel (`backdrop-filter: blur` + `radius.xl` + `spacing.40` padding). Pure chrome treatment — distinct from `background-media`, which requires a media/image/video layer. |

### Tally

- **reviewed:** 10
- **absorbed:** 1 — "elevated-media-card" candidate folded into `stacked-showcase` (a card-framed media band is just the stacked slot's `radius.xl` + `shadow.lg` treatment; no separate member warranted).
- **noise:** 0
- **dropped:** 2
  - "glassmorphism-hero" — dropped: pure chrome subset of `gradient-surface` (its glass panel already carries the `backdrop-filter` blur); a standalone member would duplicate the gradient surface without a load-bearing skeleton difference.
  - "video-background-hero" — dropped: composition-identical to existing `background-media` (absolutely positioned full-bleed media layer + scrim); differs only by media payload (video vs image), which is a `media` prop concern, not a layout member.
- **unreviewed:** 0 (= 10 − 10 reviewed)

### Notes

- default-first preserved: `centered` remains the first union value and the media-derived default (`media ? 'split-media' : 'centered'`) is untouched — existing call sites/stories render unchanged.
- New members appended to the end of the `HeroLayout` union; type exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The gradient string and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/input.audit.md -->
## Input — variant axis audit

- **Category:** atom / form control
- **Host component:** `Input` (`packages/core/src/components/Input.tsx`)
- **Axis:** `variant` (visual / layout treatment of the bordered wrapper)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `composer-panel` | layout | Root reflows from single-line input track to a flex-column 2-row panel: borderless field stacked above a justify-end action row. Chrome = rounded elevated panel (`radius.lg`, 1px `border.base`, `shadow.md` elevation, inner padding) wrapping both rows, with a circular (`radius.full`) icon action button anchored trailing-bottom. |

Existing members (`outline` default, `filled`, `underline`, `ghost`) were left untouched — default-first preserved.

### Tally

- **reviewed:** 10
- **absorbed:** 3
- **noise:** 0
- **adopted:** 1 (`composer-panel`)
- **unreviewed:** 0 (= 10 − 10 reviewed)

#### absorbed (3) — collapsed into existing/adopted members
- `chat-input` → folded into `composer-panel` (same 2-row elevated panel + trailing send affordance).
- `search-bar` → already expressible via `outline` + `leftIcon`/`rightIcon`; no new branch.
- `inset-fill` → duplicate of existing `filled` (sunken background, transparent border).

#### dropped
| Member | Reason |
|--------|--------|
| `gradient-border` | Needs a gradient border token absent from the contract; would require raw inline color synthesis beyond cssVar scope. |
| `glass` | Requires backdrop-filter/translucency tokens not in the theme contract. |
| `floating-label` | Cross-axis (label behaviour), not a wrapper `variant`; belongs to a separate `labelMode` axis. |
| `pill` | Pure radius tweak, no load-bearing structural change over `outline`. |
| `segmented` | Multi-field composite, out of scope for a single `Input` element. |

### Notes
- All composer styling uses `cssVar()` tokens only (`radius.lg`/`radius.full`, `shadow.md`, `semantic.border.base`, `semantic.background.elevated`, `semantic.primary.base`/`foreground`, `spacing.*`). No raw values.
- `semantic.border.base` used for the resting panel border (note: `border.subtle` does NOT exist in the contract — only base/muted/strong/focus).
- Root hook `data-bbangto-input-variant="composer-panel"` follows the existing axis convention.

---

<!-- source: packages/core/catalog/link.audit.md -->
## Link variant axis — saturation audit

- **Category:** atom / navigation
- **Host:** `Link` (`packages/core/src/components/Link.tsx`)
- **Axis:** `variant` (visual chrome family)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

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

### Candidate accounting (12 surveyed)

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

### Notes

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

---

<!-- source: packages/core/catalog/map.audit.md -->
## MapBlock — layout axis audit

- **Category:** block
- **Host:** `MapBlock` (`packages/core/src/blocks/MapBlock.tsx`)
- **Axis:** `layout` (`MapBlockLayout` union / `data-bbangto-mapblock-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `stacked` | layout | 2-row vertical grid (`grid-template-rows: auto 1fr`, single `1fr` column). A CENTRED text header band (title + muted `address` description) sits in the `auto` row on top; a full-bleed map media region fills the `1fr` row below. The map area carries NO card chrome — `border: none`, `border-radius: 0`, no elevation — which distinguishes it from `card`. The copy is stacked above, never beside, the map — distinguishing it from `split`. |

### Tally

- **reviewed:** 12
- **absorbed:** 1 — "framed-map" candidate folded into the existing `card` member (a bordered/rounded/elevated map frame is exactly `card`'s `radius.xl` + `border.strong` + `shadow.lg` treatment; no separate member warranted).
- **noise:** 2
  - "embedded" — not a layout member; describes the `embedSrc` iframe vs. placeholder render path, which is an existing prop concern orthogonal to the layout axis.
  - "with-markers" — not a layout member; describes the `markers` overlay feature (pin list), a content/data concern rather than a skeleton arrangement.
- **dropped:** 8
  - "split-reverse" — dropped: mirror of `split` with the info panel on the opposite side; a swap-order variant carries no load-bearing skeleton difference on a single-map host.
  - "sidebar" — dropped: composition-identical to `split` (map + adjacent info column); differs only by panel width, a styling concern not a member.
  - "hero-map" — dropped: duplicate of `stacked` (centred copy over a full-width map band); no distinct skeleton.
  - "fullscreen" — dropped: out of axis — a viewport/overlay sizing concern (100vh map) rather than an internal grid arrangement.
  - "floating-card" — dropped: positioning/behavioral variant (info card absolutely overlaid on the map); not a grid layout member and would fork the a11y region contract.
  - "grid-gallery" — dropped: out of scope — implies multiple map tiles, whereas the block models a single location.
  - "masonry" — dropped: not applicable to a single full-width map media region; no multi-item flow to pack.
  - "compact" — dropped: density/sizing concern (reduced min-height + padding), not a distinct skeleton; belongs to spacing tokens.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `full` remains the first union value and the `layout = 'full'` default is untouched — existing call sites/stories (`Default`, `WithEmbed`) render unchanged.
- New member `stacked` appended to the end of the `MapBlockLayout` union; type exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The full-bleed map drops chrome via `border: none` / `border-radius: 0` (absence of decoration, no raw colour/token values introduced).
- a11y contract held: the section keeps its `aria-labelledby` region label, the map area keeps its `aria-label`, and the placeholder keeps `role="img"`. The `stacked` play asserts data-attr, the 2-track row grid, the chrome-less border, and title/address slot render.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/menu.audit.md -->
## Menu variant axis — saturation audit

- **Category:** molecule / navigation-overlay
- **Host:** `Menu` (`packages/core/src/components/Menu.tsx`)
- **Axis:** `variant` (visual chrome / layout family of the list container)
- **Default-first anchor:** `default` (unchanged; existing union head preserved — every existing call site, `DropdownMenu` panel, and story renders identically)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

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

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `tabs`/`pills` (fold into `segmented`'s active-chip track), `rail` (folds into `dock`'s vertical stacked cell), `spotlight` (folds into `glow`'s radial halo), `elevated` (already reachable via `floating`).
- **noise:** 2 — `glass` (needs a `backdrop-filter` + glass surface token absent from `SemanticColors`), `gradient-fill` (a whole-panel gradient duplicates `Hero`'s `gradient-surface`, not a menu chrome).
- **dropped:**
  - `dense-grid` — multi-column grid of items; an orthogonal layout sub-axis (column count) rather than a chrome/slot-reflow family, and overlaps `dock`'s flex track without adding distinct chrome.
  - `underline` — active item underline only; a sub-treatment that folds into `segmented`'s active-cell affordance with no separate container chrome.
  - `frosted` — translucent blur surface; requires `backdrop-filter` + a glass token not present in the contract (would force raw values).
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

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

---

<!-- source: packages/core/catalog/navbar.audit.md -->
## TopNavigation — variant axis audit

- **Category:** organism (component)
- **Host:** `TopNavigation` (`packages/core/src/components/TopNavigation.tsx`)
- **Axis:** `variant` (`TopNavigationVariant` union / `data-bbangto-navbar-variant`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `bordered` | variant | Opaque surface fill (`background.base`) on a full-width edge-to-edge bar with a crisp hairline `border-bottom: 1px solid border.base` and `box-shadow: none`. Flat and grounded — distinct from the new `glass`/`floating-pill` chrome and from the legacy `default` only by the stronger `border.base` rule + explicit zero elevation. |
| `glass` | variant | Frosted chrome: `backdrop-filter: blur(12px)` over a translucent fill (`color-mix(in srgb, background.base 60%, transparent)`) plus a `border.muted` hairline, so page content blurs through. The translucency + backdrop blur is the skeleton difference; distinct from the opaque `bordered` fill. Blur radius is the only inline literal (no backdrop token); the colour stays `cssVar()`-derived. |
| `floating-pill` | layout | Root reflows from a full-bleed bar to a detached centered capsule: `width:100%` clamped by a constrained `max-width` + `margin-inline:auto` + top `margin-top` (`spacing.16`) offset, `border-radius: radius.full`, `border.muted` hairline all around, and `shadow.lg` elevation over a `background.elevated` fill. The full-bleed→contained-island reflow is the structural change, not just a fill swap. |

### Tally

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

### Notes

- default-first preserved: `default` remains the first union value and `variant = 'default'` keeps the original render byte-identical (`background.base` fill, `border.muted` bottom rule, no elevation). The existing `Default` story and any call site render unchanged; the only DOM delta is the additive non-visual `data-bbangto-navbar-variant` hook.
- New members appended to the end of the `TopNavigationVariant` union; the union type is exported from the component file and re-exported by the barrel via `export *`.
- a11y contract maintained across all variants: root keeps its `role="banner"` landmark, leading/title/trailing slots are unchanged, and the leading→trailing focus order is preserved (verified in each new story's `play` via `back.focus()` → `userEvent.tab()` → trailing). No keyboard/aria regression.
- All colours use `cssVar()` tokens. The two inline literals are non-colour layout values with no token: the `glass` blur radius (`12px`) and the `floating-pill` `max-width` (`640px`); radius/shadow/spacing all resolve from tokens.
- No new required props; `variant` is optional with a default. Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/notification.audit.md -->
## Snackbar variant axis — saturation audit

- **Category:** molecule / notification (feedback)
- **Host:** `Snackbar` (`packages/core/src/components/Snackbar.tsx`)
- **Axis:** `variant` (surface chrome family)
- **Default-first anchor:** `standard` (new union head; original rounded + soft-shadow look, fully backward-compatible)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `pixel` | `border-radius: radius.none` (0) + stacked zero-blur `box-shadow` offsets forming a hard-edge stepped pixel border (`semantic.border.strong`); smooth radius + soft elevation removed | A staircase, anti-alias-free pixel outline cannot be expressed by the `standard` smooth `radius.md` + `shadow.lg` chrome; the chrome treatment itself becomes the stepped border. |
| `elevated` | `border: none` (outline + severity left-border dropped) + multi-layer drop-shadow stack (`shadow.sm + md + lg + xl`) over the opaque `foreground.base` fill | `standard` separates the surface with a soft single `shadow.lg` and may carry a severity outline; `elevated` swaps outline-based separation for pure layered elevation (border↔elevation chrome transition). |

Both members compose exclusively from existing tokens via `cssVar()`
(`semantic.border.strong`, `radius.none`, `shadow.sm|md|lg|xl`). The stepped
pixel-border string is the only inline composition and its color is token-derived.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 4 — `flat` (folds into `standard` with `shadow.none`), `raised` (folds into `elevated`'s layered shadow), `retro`/`8bit` (folds into `pixel`'s stepped border), `card` (folds into `elevated` opaque floating surface).
- **noise:** 1 — `glass`/frosted (needs `backdrop-filter` + a translucent-surface token absent from `SemanticColors`; out of scope for a pure-token chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + translucent surface token not present in the contract; would force raw values.
  - `gradient` — multi-stop fill belongs to the fill/color axis, not the surface-chrome family being saturated here.
  - `bordered` — flat single-border variation only; an orthogonal border-style sub-axis, not a distinct chrome family (already reachable via severity left-border).
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New members appended to the union tail; `standard` remains the default so every
  existing call site and story renders identically.
- Root renders `data-bbangto-notification-variant={variant}` (axis hook on this
  host; future axes should follow the `data-bbangto-notification-*` convention).
- a11y contract preserved across all variants: `role="alert"` + `aria-live="assertive"`
  retained; play functions assert the role/aria survive each new variant.

---

<!-- source: packages/core/catalog/number.audit.md -->
## NumberField — variant 축 감사 (number.audit.md)

- **카테고리:** form / numeric input
- **호스트:** `NumberField` (`packages/core/src/components/NumberField.tsx`)
- **축(axis):** `variant` (chrome treatment)
- **포화 라운드:** 1 (파일럿)

### default-first

union 첫 값 `outline` 이 기본값. 기존 호출부·스토리(`Default`/`WithBounds`/`Disabled`) 렌더는 변경 없음. 신규 멤버는 union 끝에 추가.

```ts
export type NumberFieldVariant = 'outline' | 'seven-segment';
```

### 채택 멤버

| 멤버 | load-bearing 명세 |
|------|-------------------|
| `seven-segment` | 어두운 LED 스타일 readout screen(`semantic.foreground.base` 합성) 위에 등폭(`typography.fontFamily.mono`) 고정폭 digit 셀. 활성 글리프는 accent(`semantic.primary.base`) 색 강조 + `text-shadow` 글로우, 비활성 세그먼트는 항상 켜진 dim "8" 고스트(`semantic.foreground.subtle`, opacity 0.22). 접근성용 spinbutton 입력은 시각적으로만 숨김. 기본 outline input(border + rounded-md + 가운데 텍스트 입력)과 완전히 다른 treatment 종류. |

### 집계

- **reviewed:** 10
- **adopted:** 1 (`seven-segment`)
- **absorbed:** 2
  - `inline-outline` → 기본 `outline` 과 동일 treatment, 별도 멤버 불필요.
  - `bordered` → `outline` 의 border chrome과 중복.
- **noise:** 3
  - `default` / `basic` / `standard` — 의미 없는 별칭, 신규 chrome 없음.
- **dropped:** 4
  - `gradient-readout` — 토큰에 gradient 없음, 인라인 합성 과도 + Button `gradient` 축과 중복.
  - `glass-panel` — glass/blur 토큰 부재, 토큰만으로 재현 불가.
  - `pill-stepper` — `shape` 축(rounded/pill) 혼입, variant 축이 아님.
  - `neon-spin` — Button `neon` 글로우와 중복, 숫자 입력 호스트에 부적합.
- **미열람(unreviewed):** 0 (= 10 − reviewed 10)

### load-bearing 검증 (스토리 play)

`SevenSegment` story 의 play 3단:
1. `data-bbangto-number-variant === 'seven-segment'`.
2. `.bbangto-number-readout` backgroundColor 비투명(어두운 screen) + fontFamily 에 `mono` 포함(등폭) + `.bbangto-number-segment-lit` `text-shadow !== none`(accent glow) + digit 셀 수 = 자릿수.
3. 접근 가능한 `spinbutton` 값 검증 + −/+ 스텝 동작.

---

<!-- source: packages/core/catalog/pagination.audit.md -->
## Pagination — Variant Axis Audit

- **Category:** molecule / navigation control
- **Host component:** `Pagination` (`packages/core/src/components/Pagination.tsx`)
- **Axis under audit:** `variant` (visual treatment of the page-list chrome)
- **Saturation round:** 1 (pilot)

### Existing axis members (frozen, default-first)

`navigation` (default) · `dot` · `counter` — render untouched.

### Adopted members this round

| Member | Load-bearing chrome (why it cannot collapse into an existing variant) |
|--------|----------------------------------------------------------------------|
| `segmented` | Single shared outer border ring + `gap:0` fused bar with internal 1px divider borders between items; border-radius only on the two end items. Cannot be expressed by `navigation` (per-item gapped boxes). |
| `outlined`  | Every item is its own 1px-solid bordered box with transparent fill and inter-item gap; active item swaps to accent-colored border + accent text while staying outline (no solid fill). Distinct from `navigation`'s solid active fill. |
| `pixel`     | Retro 8-bit chrome: zero-radius hard square edges + zero-blur hard offset box-shadow (`2px 2px 0`) + monospace font; static (no motion). No token-flat variant produces stepped/offset chrome. |

All three reuse the navigation page-window logic and the a11y contract
(navigation landmark via `role="navigation"` + `aria-current=page`). Page items
render as native `<button>`s so keyboard activation (Enter/Space) and focus are
intrinsic.

### Audit accounting

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

### Manifest hooks

- Root data hook: `data-bbangto-pagination-variant={variant}` (added on the new
  variant branch root; existing variant roots left unchanged per default-first).
- New union type exported from the component: `PaginationVariant` (auto-exposed
  by the barrel's `export *`).

---

<!-- source: packages/core/catalog/popover.audit.md -->
## Popover variant axis — saturation audit

- **Category:** molecule / overlay
- **Host:** `Popover` (`packages/core/src/components/Popover.tsx`)
- **Axis:** `variant` (visual / structural family of the panel)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Kind | Load-bearing treatment | Why irreducible to existing members |
|--------|------|------------------------|-------------------------------------|
| `sheet` | layout | Panel detaches from the trigger and docks to a viewport edge (`position: fixed`); docked edge drives the full-bleed axis (100% width top/bottom, 100% height left/right) capped by a max dimension; top drag-handle bar + slide-in transform from the docked edge; vertical flex stack (header/body/footer). | `default`/`filled` are trigger-anchored floating panels (`position: absolute`). A viewport-docked, full-bleed, edge-sliding surface is a structural layout no anchored member can express. |
| `arrow` | variant | A token-filled square rotated 45° on the panel edge nearest the trigger; its two outward edges carry the panel's hairline border and its fill matches the surface, so the caret reads as one continuous pointer. Panel keeps its border + box-shadow. | `default`/`filled` have no directional pointer connecting panel to trigger. The caret notch is additive chrome the flat members lack. |
| `elevated` | variant | Borderless opaque surface (`border: none`) relying purely on `shadow.lg` elevation — no 1px hairline, no outline ring. | `default`/`filled` are border-bounded surfaces. `elevated` swaps the hairline for a floating drop-shadow — a chrome the border-based members cannot express. |

All three compose color exclusively from existing tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.primary.subtle`, `semantic.border.muted`,
`semantic.border.strong`, `shadow.lg`, `radius.*`, `spacing.*`, `zIndex.popover`).
No raw design-token values; only layout primitives (`%`, `vw`, `rem` caps) per the
`Hero` precedent. Legacy members (`default`, `filled`) keep their exact prior render.

### Candidate accounting (10 surveyed)

- **reviewed:** 10
- **absorbed:** 3
  - `bottom-sheet` → a docked-edge variant of `sheet` (the `position` prop already selects the edge).
  - `side-drawer` → left/right dock is the same `sheet` layout via `position="left|right"`.
  - `floating` / `card` → borderless drop-shadow surface == `elevated`.
- **noise:** 1
  - `shadow-lg` → elevation *magnitude*; a sub-axis of `elevated`, not a distinct chrome family.
- **dropped:**
  - `glass` — needs `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `gradient` — multi-stop fill family already owned by `Button`'s axis; not a distinct popover chrome and forces inline color synthesis without payoff here.
  - `bordered` — border-style variation only (an orthogonal sub-axis), not a fill/chrome family; `default` already carries the hairline.
- **unreviewed:** 0 (= 10 − 10 reviewed)

Accounting closes: 3 adopted + 3 absorbed + 1 noise + 3 dropped = 10 reviewed.

### Notes

- New members appended to the union tail; `default` remains the default so every
  existing call site and story renders identically.
- Panel now renders `data-bbangto-popover-variant={variant}` (first canonical
  axis hook on this host; legacy `data-variant` retained for back-compat). Future
  axes should follow the same `data-bbangto-popover-*` convention, mirroring
  `data-bbangto-hero-layout` / `data-bbangto-tooltip-variant`.
- a11y contract hardened so new variants ship accessible: trigger now exposes
  `aria-haspopup="dialog"` + `aria-expanded` + `aria-controls`; the panel gains an
  `id` + `tabIndex={-1}` and receives focus on open; `Escape` dismisses. The
  `Sheet`/`Arrow`/`Elevated` plays assert `aria-expanded` and (for `sheet`/`elevated`)
  keyboard dismissal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var); `elevated` removes the border outright instead, and the
  hairline members use `semantic.border.muted`.

---

<!-- source: packages/core/catalog/pricing-section.audit.md -->
## PricingSection — layout axis audit

- **Category:** block
- **Host:** `PricingSection` (`packages/core/src/blocks/PricingSection.tsx`)
- **Axis:** `layout` (`PricingSectionLayout` union / `data-bbangto-pricingsection-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `single-panel` | layout | Root body is a SINGLE centered, self-contained panel — `max-width: 420px` + `margin: 0 auto`, a block (NOT a `repeat(...)` grid track). One plan (highlighted, falling back to the first) renders as a vertical stack of slots: header → price → grouped feature list → CTA pinned at base (`.bbangto-pricingsection-single-panel`). Skeleton-distinct from `cards`/`compact` (multi-tier `auto-fit` grid) and `featured` (flanking row). |
| `frosted-gradient` | variant | Card chrome = `backdrop-filter: blur(spacing.12)` + translucent fill (`color-mix(... background.elevated 60%, transparent)`) floated over a token-composited `linear-gradient` root surface (`primary.subtle → background.base → primary.base`), with `border: none`. Relies on elevation-via-blur (`shadow.lg` + glass) instead of a solid border or flat fill — distinct from `cards` (opaque flat fill + 1px border). |

### Tally

- **reviewed:** 12
- **absorbed:** 6
  - "hero-plan" → folded into `single-panel` (a single emphasized plan IS the single centered panel; no separate skeleton).
  - "centered-solo" → `single-panel` (centering + max-width constraint is the same panel composition).
  - "glass-cards" → `frosted-gradient` (translucent backdrop-blur cards are exactly this variant's chrome).
  - "gradient-backdrop" → `frosted-gradient` (the gradient root surface is part of this variant; not an independent member).
  - "blurred-tiers" → `frosted-gradient` (blur-on-tiers is the same backdrop-filter chrome over the existing card row).
  - "elevated-glass" → `frosted-gradient` (elevation-via-blur + translucency is the variant's defining trait, no extra skeleton).
- **noise:** 0
- **dropped:** 4
  - "accordion-pricing" — dropped: collapses plans into an expand/collapse stack; that is a disclosure-interaction axis, not a visual `layout` arrangement of the same plan set.
  - "toggle-billing" — dropped: monthly/annual switch is a data/state concern (price payload), not a layout skeleton; belongs to props, not a layout member.
  - "carousel-plans" — dropped: a swipeable single-visible track is a carousel-interaction concern; overlaps the existing Carousel block rather than a PricingSection layout.
  - "two-column-split" — dropped: composition-identical to the existing `auto-fit` `cards`/`compact` grid at a 2-plan count (see the `TwoPlans` story); no load-bearing skeleton difference.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `cards` remains the first union value and the `layout = 'cards'` default is untouched — existing call sites/stories (`Default`, `TwoPlans`) render unchanged.
- New members appended to the END of the `PricingSectionLayout` union; the type is exported from the component file (barrel re-exports via `export *`).
- a11y contract held: both new members keep the heading + price comparison semantics — `single-panel` keeps `role="list"`/`listitem`, the plan heading, the `aria-label`'d feature list, and the CTA; `frosted-gradient` reuses the unchanged `CardRow`/`PlanCard` structure (chrome-only change). Each play function re-asserts the role/heading/CTA.
- All styling uses `cssVar()` tokens. The gradient string, `color-mix` translucency, and `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference. `semantic.border` was not used with `subtle` (it has no token).
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/radio-group.audit.md -->
## RadioGroup variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `RadioGroup` (`packages/core/src/components/Radio.tsx`)
- **Axis:** `variant` (set-level layout / surface treatment)
- **Default-first anchor:** `default` (new union head; reproduces the historical
  inline-flex stack so every existing call site and story renders identically)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

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

### Candidate accounting (12 surveyed)

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

### Notes

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

---

<!-- source: packages/core/catalog/select.audit.md -->
## Select variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `Select` (`packages/core/src/components/Select.tsx`)
- **Axis:** `variant` (visual trigger chrome family)
- **Default-first anchor:** `outline` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `glass` | `backdrop-filter: blur(spacing.12 ≈ 12px)` over a translucent surface fill (`color-mix(elevated 55%, transparent)`), framed by a 1px translucent border (`color-mix(border.base 45%, transparent)`) | `outline`/`filled` use an opaque solid fill + opaque border; `underline` is a borderless transparent bottom-rule. None can express a frosted backdrop blur with a semi-transparent surface — the blur + alpha compositing is the whole chrome. |

Colors are composed exclusively from existing scale tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.border.base`, plus the open/error
`borderColor` cascade). Alpha is synthesized with `color-mix(... transparent)`
and the blur radius reuses `spacing.12`; no raw color literals are introduced.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 3 — `frosted` (synonym, folds into `glass`), `blur` (folds into `glass`'s `backdrop-filter`), `translucent` (folds into `glass`'s `color-mix` surface alpha).
- **noise:** 3 — `default` (alias of the `outline` anchor), `bordered` (duplicates `outline`'s 1px frame), `flat` (duplicates `filled` minus elevation).
- **dropped:**
  - `gradient` — a multi-stop gradient fill is a Button-family chrome; on a Select trigger it fights the placeholder/label foreground contrast and is out of scope for this axis.
  - `neon` — saturated glow border belongs to an emphasis sub-axis, not a trigger-surface family; reachable later as a state, not a base variant.
  - `ghost` — a no-fill-until-hover treatment is a hover/state behavior, not a distinct static trigger chrome here.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New member appended to the union tail; `outline` remains the default so every
  existing call site and story renders identically.
- Root trigger already renders `data-bbangto-select-variant={variant}` (existing
  axis hook); `glass` reuses it with no new attribute convention.
- `glass` sets both `backdropFilter` and `WebkitBackdropFilter`, matching the
  `Dock`/`Hero` block precedent for backdrop blur.

---

<!-- source: packages/core/catalog/sign-in.audit.md -->
## SignIn — layout axis audit

- **Category:** pattern
- **Host:** SignIn (`packages/core/src/patterns/SignIn.tsx`)
- **Axis:** `layout` (`SignInLayout` union)
- **Saturation round:** 1 (pilot)

### Existing members (default-first, unchanged)

`centered` (default) · `split` · `minimal` · `social-first`

### Adopted member(s) this round

| Member | Load-bearing spec |
|--------|-------------------|
| `media-backdrop` | Full-bleed media layer on the root (`position:absolute; inset:0; object-fit:cover`) sourced from `marketingPanel` (or a default). The form floats above it as a centred **frosted** card: `backdrop-filter: blur()`, a translucent token surface (`color-mix(... background.base ... transparent)`) and a 1px `border.base` hairline, lifted onto an overlay z-stack (`zIndex:1`) over the `zIndex:0` backdrop. Distinct from `split`: the media is a front backdrop, not a grid column; the form is composited over it instead of beside it. |

### Survey ledger

- **reviewed:** 12
- **absorbed:** 6 — collapsed into existing/adopted members rather than added as new:
  - `hero-image` / `cover-photo` / `photo-side` → folded into `media-backdrop` (backdrop media).
  - `glass-card` / `frosted` → folded into `media-backdrop` (frosted overlay treatment).
  - `two-column` → already covered by existing `split`.
- **noise:** 2 — out-of-axis, not layout:
  - `dark` (theme/color axis, not layout).
  - `compact-spacing` (density axis, not layout).
- **dropped:** 2
  - `video-hero` — dropped: requires autoplay/muted media plumbing + reduced-motion contract beyond a static backdrop; reuse `media-backdrop` with a video node slotted into `marketingPanel` instead of a dedicated member.
  - `carousel-bg` — dropped: introduces stateful slideshow logic (timers, indices) that does not belong on a sign-in pattern's layout axis.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Adopted count this round

1 (`media-backdrop`)

### Notes

- Data hook follows the host's existing convention `data-bbangto-signin-layout` (NOT `data-bbangto-sign-in-layout`) to stay consistent with the already-shipped axis hook.
- All colours are token-derived; the translucent surface uses `color-mix()` over `semantic.background.base` (no raw rgba literals).

---

<!-- source: packages/core/catalog/signup.audit.md -->
## SignUp — layout axis audit

- **Category:** pattern
- **Host:** `SignUp` (`packages/core/src/patterns/SignUp.tsx`)
- **Axis:** `layout` (`SignUpLayout` union / `data-bbangto-signup-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `frosted` | variant | Glass-chrome treatment. The root container fills with a token-composited `linear-gradient` backdrop (`primary.subtle → background.base → primary.base`); the form card floats above it as a translucent glass panel (`.bbangto-signup-frosted`) — `background-color: color-mix(background.base 62% / transparent)`, `backdrop-filter: blur(spacing.12)`, a hairline `1px solid color-mix(border.base 45% / transparent)` border, and `radius.xl` corners. The float is expressed by the backdrop blur, NOT by a `box-shadow` elevation (`box-shadow: none`). This lives outside the border-fill-elevation vocabulary the other layouts share. |

### Tally

- **reviewed:** 10
- **absorbed:** 8
  - "glassmorphism-card" — same backdrop-blur glass panel; the canonical name for this member, folded in.
  - "translucent-card" — translucency is the `color-mix` background of `frosted`; no skeleton difference.
  - "blur-overlay" — the blur is already the load-bearing chrome of `frosted`.
  - "gradient-backdrop" — the gradient is `frosted`'s root backdrop layer, not a standalone layout.
  - "aurora-surface" — a gradient backdrop restyle; same composition as `frosted`'s root fill.
  - "floating-card" — "floating" here is exactly the blur-not-shadow float of `frosted`.
  - "hairline-glass" — the 1px translucent border is part of `frosted`'s chrome.
  - "vibrancy-panel" — macOS-vibrancy framing is `backdrop-filter` blur over a translucent fill = `frosted`.
- **noise:** 0
- **dropped:** 1
  - "elevated-glass" — dropped: contradicts the load-bearing spec. It re-adds a `box-shadow` elevation under the glass, which is the very border/fill/elevation vocabulary `frosted` deliberately replaces with blur; merging it would dilute the member, and a separate elevation member belongs to a different (elevation) axis.
- **unreviewed:** 0 (= 10 − 10 reviewed)

### Notes

- default-first preserved: `centered` remains the first union value and the marketing-panel-derived default (`marketingPanel ? 'split' : 'centered'`) is untouched — existing call sites/stories render unchanged.
- New member appended to the end of the `SignUpLayout` union; the union type is exported from the component file (barrel re-exports via `export *`).
- All styling uses `cssVar()` tokens. The gradient stops, the `color-mix` translucent fill/border, and the `backdrop-filter` blur are synthesized inline (no gradient/glass tokens exist) but every colour/length is a `cssVar()` reference. `semantic.border` only uses `base` (valid; `subtle` intentionally avoided as it is undefined).
- a11y contract intact: label↔input association (`htmlFor`/`id`), `aria-invalid` on errored fields, and tab order are unchanged by the variant; the `frosted` play asserts label lookup, `aria-invalid="true"` after empty submit, focusability, and that `onSubmit` is not called on invalid submit.
- Shared files (barrels, tokens, utils, sibling components) untouched.

---

<!-- source: packages/core/catalog/spinner-loader.audit.md -->
## Spinner / Loader — variant axis audit

- **Category:** spinner-loader
- **Host component:** `ProgressIndicator` (`packages/core/src/components/ProgressIndicator.tsx`)
- **Axis:** `variant` (indeterminate loader treatment)
- **Default-first anchor:** `spinner` (first union member — preserves the historical SVG arc render; existing call sites / stories unchanged)
- **Saturation round:** 1 (pilot)

### Adopted members (+ load-bearing spec)

| Member | Load-bearing treatment |
|--------|------------------------|
| `ring` | Single centred circle drawn purely with `border-width`; `border-top` left transparent to carve the arc gap. No background fill. 360° rotation via `motion.preset.spin`. |
| `spokes` | N (=10) tapered pill lines (`border-radius: full`) placed radially by `translate(-50%,-50%) rotate(θ) translateY(-d)`. Per-child staggered `animation-delay` over `motion.preset.pulse`. No border-ring, no fill. |
| `dots` | Root reflows to a horizontal flex **row** (`gap`); three full-radius circles on a horizontal track. Per-child staggered scale+opacity via the scoped `bbangto-spinner-loader-dot` keyframe. No border-ring, no fill. |
| `bars` | Horizontal flex **row** of narrow rects (small `radius.sm`, not circular) animated with the equalizer `scaleY` beat (`motion.preset.bars`), `transform-origin: center bottom`, staggered delay. No circular radius, no border-ring. |

All colors resolve through `cssVar()` tokens only (`semantic.primary.base`, `radius.full`, `radius.sm`, `spacing.*`, `motion.preset.*`, `motion.duration/easing.*`). `border-top: transparent` on `ring` is the only intentional non-token literal (gap carving, not a color).

### Ledger

- **reviewed:** 12
- **adopted:** 4 (`ring`, `spokes`, `dots`, `bars`)
- **absorbed:** 5 — folded into an adopted member rather than shipped as a separate variant:
  - `arc` → absorbed into `ring` (same border-gap treatment, narrower sweep).
  - `circular-svg` → absorbed into the default `spinner` (already the SVG arc).
  - `pulse-dots` → absorbed into `dots` (opacity-only is a subset of dots' scale+opacity).
  - `wave-dots` → absorbed into `dots` (translateY beat is a re-timing of the same track).
  - `equalizer` → absorbed into `bars` (identical scaleY track, alias name).
- **noise:** 4 — out of scope for an indeterminate loader axis:
  - `skeleton-block` (belongs to a Skeleton host, not a spinner).
  - `progress-track` (determinate bar — already the `value` path).
  - `toast-timer` (notification countdown, different host).
  - `confetti` (celebration motion, not a loader).
- **dropped (named + reason):**
  - `orbit-planets` — dropped: multi-orbit composite needs per-orbit gradient tokens we don't have; over-budget for a leaf.
  - `gooey-blob` — dropped: requires SVG `feGaussianBlur`/`feColorMatrix` filters, not expressible via design tokens.
  - `dual-ring` — dropped: redundant with `ring` (two stacked arcs add no semantic value).
- **unreviewed:** 0 (= 12 reviewed − 12 candidates)

### Notes for orchestrator

- New union member type `ProgressIndicatorVariant` is exported from the component file; the package barrel re-exports via `export *`, so no index edit is required.
- No shared token/util/index files were modified.

---

<!-- source: packages/core/catalog/table.audit.md -->
## Table — variant axis audit

- **Category:** data-display
- **Host component:** `Table` (`@centurio1987/core`)
- **Axis:** `variant` (frame / chrome treatment)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member     | New? | Load-bearing spec |
|------------|------|-------------------|
| `default`  | no (axis seed) | Enclosed card: 1px `border.muted` frame on all 4 sides, `radius.md`, `background.base` fill. Preserves pre-axis rendering — default-first, unchanged for existing callers. |
| `divided`  | yes  | No outer frame (`border: none`), `borderRadius: 0`, transparent fill. Row separation via per-row `border-bottom` (1px `border.muted`); header carries a thick `2px border.strong` underline only. Bare horizontal-rule chrome — no radius / no fill. |
| `outlined` | yes  | Card-like enclosure: rounded `radius.md` border frame (1px `border.base`, stronger than default) + `background.base` fill in an `overflow: auto` container. 4-side frame + surface fill are the load-bearing signal vs. `divided`'s rules-only chrome. |

### Triage ledger

- **reviewed:** 8
- **absorbed:** 4 — candidates folded into existing members rather than minted:
  - `bordered` → folded into `default` (already a 4-side framed card).
  - `card` / `elevated` → folded into `outlined` (same enclose + fill intent; elevation is a shadow concern, not a frame axis).
  - `borderless` → folded into `divided` (frameless rules-only).
  - `lines` / `ruled` → folded into `divided` (horizontal-rule chrome).
- **noise:** 1 — `flush` (ambiguous: conflated zero-padding density with frame removal; density belongs to the `size` axis, not `variant`).
- **dropped:**
  - `striped` — dropped from this axis; already an orthogonal boolean prop (`striped`), not a frame treatment.
  - `glass` — dropped; requires backdrop-blur + translucent fill tokens absent from the token set (`semantic.border` has no `subtle`; no glass surface token), would force raw values.
- **unreviewed:** 0 (= 8 reviewed − 8 candidates surfaced)

### Notes

- Axis hook: `data-bbangto-table-variant={value}` on the root `<table>` (follows the existing `data-size` convention).
- All chrome styling routes through `cssVar()` tokens. `border: none` / `borderRadius: 0` / `transparent` are structural resets, not raw color values.
- Variant threads through `TableContext` so `TableHead` adapts its underline/fill for `divided`.

---

<!-- source: packages/core/catalog/tabs.audit.md -->
## Tabs variant axis — saturation audit

- **Category:** molecule / navigation
- **Host:** `Tabs` (`packages/core/src/components/Tabs.tsx`)
- **Axis:** `variant` (tab-list chrome family)
- **Default-first anchor:** `underline` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `segmented` | one outer 1px `semantic.border.muted` border + `radius.md` wrapping the whole button-group, sunken track (`background.sunken`), `overflow:hidden`; equal-width rectangular cells (`flex:1 0 0%`, `borderRadius:0`, no gap) separated by 1px leading-border dividers (collapsed via `marginLeft:-1px`); only the active cell paints a `background.base` fill | `pill` = container bg + gap + full-radius pills, **no** border; `enclosed` = per-tab open-bottom border that joins a panel; `underline` = bottom-rule-only list with **no** fill. None express a single bordered cell-group with internal dividers. |

The segmented chrome composes color exclusively from existing tokens via
`cssVar()` (`semantic.border.muted`, `semantic.background.base|sunken`,
`semantic.foreground.base|muted`, `radius.md`, motion tokens). The only
structural raw values are layout offsets (`-1px` divider collapse, `0`
radius) — matching the existing file's precedent (`marginBottom:'-1px'`,
`'2px'` indicator). No raw colors.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 6 — `boxed`/`bordered` (fold into `segmented`'s outer border), `solid-fill`/`filled-active` (fold into the active-cell `background.base` fill), `grouped`/`button-group` (fold into the equal-width cell layout).
- **noise:** 2 — `frosted`/glass list (needs `backdrop-filter` + a glass token absent from the contract), `gradient-track` (needs a gradient token family not in `SemanticColors`).
- **dropped:**
  - `card` — duplicates `enclosed`'s panel-joined chrome; no distinct list family.
  - `vertical-rail` — an orientation sub-axis already covered by `orientation`, not a chrome family.
  - `lifted` — `segmented` + `shadow` elevation only; reachable composition, not an irreducible member.
  - `minimal` — `underline` with the rule removed; a token tweak, not a new chrome.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- New member appended to the union tail; `underline` remains the default so
  every existing call site and story renders identically.
- The variant hook `data-bbangto-tabs-variant={variant}` already lives on the
  `TabsList` (`role=tablist`); `segmented` reuses that existing convention
  rather than introducing a second hook.
- a11y contract preserved: `segmented` reuses the same `TabsTrigger`
  (`role=tab` + `aria-selected`) and `TabsContent` (`role=tabpanel`); the play
  asserts role/aria + keyboard (`{Enter}`) activation still works.

---

<!-- source: packages/core/catalog/testimonials.audit.md -->
## Testimonials — layout axis audit

- **Category:** block
- **Host:** `Testimonials` (`packages/core/src/blocks/Testimonials.tsx`)
- **Axis:** `layout` (`TestimonialsLayout` union)
- **Saturation round:** 1 (pilot)

### Existing members (default-first, unchanged)

`grid` (default) · `carousel` · `single` · `masonry`

The first union value (`grid`) remains the default, so every existing call
site and story renders identically. New members are appended to the end of
the union.

### Adopted this round (2)

#### `split-media` (load-bearing)
- Two-track grid: single column on mobile, promoted to two media-dominant
  tracks (`5fr 4fr`) at the `lg` breakpoint via a scoped `<style>` `@media`
  rule (`.bbangto-testimonials-split`).
- One track is a dominant portrait media panel (`aspect-ratio: 4 / 5`,
  `.bbangto-testimonials-media`, token-composited backing surface); the other a
  stacked column carrying the active quote card, author meta and prev/next
  controls.
- Exactly one testimonial is in view (driven by `activeIndex` state) — a
  single-item showcase rather than a multi-card arrangement.
- **Load-bearing styles:** two-track `grid-template-columns` (scoped, `lg`) +
  `aspect-ratio` portrait media panel; single blockquote in view.

#### `stacked-deck` (load-bearing)
- Single fixed-size relative container (`.bbangto-testimonials-deck`); the
  leading cards are `position:absolute` and overlap as a depth stack
  (front / middle / back).
- Depth via `translateY` + `scale` offset per card and a descending `z-index`
  (30 / 20 / 10); not a horizontal track.
- **Load-bearing styles:** `position:absolute` cards, descending `z-index`,
  `translateY`/`scale` transform offset on receding cards.

### Counts

- **Reviewed:** 12
- **Adopted:** 2 (`split-media`, `stacked-deck`)
- **Absorbed:** 7
- **Noise:** 2
- **Dropped:** 1
- **Unreviewed:** 0 (= 12 − 12 reviewed)

#### Absorbed (7) — already covered by an existing member
1. `two-column-grid` → existing `grid` (auto-fit `minmax`).
2. `logo-wall` → existing `grid` / `masonry`.
3. `centered-quote` → existing `single`.
4. `slider` → existing `carousel`.
5. `scroll-snap-rail` → existing `carousel`.
6. `featured-plus-grid` → composition of `single` + `grid`.
7. `masonry-columns` → existing `masonry`.

#### Noise (2) — off-axis (not a layout arrangement)
1. `auto-rotating-video-bg` → autoplay background media; a media/motion concern,
   not a layout track arrangement.
2. `marquee-ticker` → infinite marquee scroll; belongs to the motion axis.

#### Dropped (1)
1. `twitter-embed-cards` → depends on third-party embed/iframe widgets; outside
   the token + first-party component scope of this block.

---

<!-- source: packages/core/catalog/textarea.audit.md -->
## Textarea — variant axis audit

- **Category:** molecule / form control
- **Host component:** `Textarea` (`packages/core/src/components/Textarea.tsx`)
- **Axis:** `variant` (visual surface treatment of the textarea field)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `soft` | variant | Field drops its resting outline ring and sits flush inside one filled, rounded, subtly elevated surface. Chrome = filled background (`semantic.background.sunken`), `border: none` (no ring), larger radius (`radius.lg`), subtle elevation (`shadow.sm`). Distinct from `default`'s bare bordered field (`background.elevated` + 1px `border.base` + `radius.md`, no shadow). |

`variant` is a newly introduced axis. Its first member `default` reproduces the
pre-existing bordered field exactly, so every existing call site/story renders
unchanged (default-first). New member `soft` appended at the union tail.

### Tally

- **reviewed:** 12
- **absorbed:** 5
- **noise:** 1
- **adopted:** 1 (`soft`)
- **unreviewed:** 0 (= 12 − 12 reviewed)

#### absorbed (5) — collapsed into existing/adopted members
- `filled` → same as `soft` (sunken fill + borderless); folded in.
- `elevated-card` → `soft` already carries the rounded + box-shadow elevation; no separate branch.
- `flush` → "borderless flush field" is exactly `soft`'s no-ring intent.
- `subtle` → resting-tone fill identical to `soft`'s sunken surface.
- `bordered` → duplicate of the existing `default` field; nothing new.

#### noise (1)
- `quiet` → vague label with no load-bearing structural delta over `default`/`soft`.

#### dropped
| Member | Reason |
|--------|--------|
| `glass` | Requires backdrop-filter / translucency tokens absent from the theme contract. |
| `gradient` | Needs a gradient surface; would force raw color synthesis beyond the field's purpose. |
| `underline` | Cross-axis border-edge treatment; better as its own axis, not a surface `variant`. |
| `floating-label` | Label-behaviour axis, not a surface treatment. |
| `inset-ring` | Pure focus-ring tweak, no resting structural change over `default`. |

### Notes
- All `soft` styling uses `cssVar()` tokens only (`semantic.background.sunken`, `radius.lg`, `shadow.sm`; error path reuses `semantic.error.base`). No raw values.
- `semantic.border` only exposes base/muted/strong/focus (no `subtle`) — confirmed; `soft` avoids border tokens entirely except the error border.
- Root hook `data-bbangto-textarea-variant={variant}` follows the existing axis-hook convention (cf. `data-bbangto-button-variant`).
- Error state is preserved in `soft` via a 1px `error.base` border for a11y, overriding the borderless resting look only when `error` is set.

---

<!-- source: packages/core/catalog/toggle.audit.md -->
## Toggle audit — Switch `variant` axis

- **Category:** toggle / boolean-control chrome
- **Host component:** `Switch` (`packages/core/src/components/Switch.tsx`)
- **Axis:** `variant` (track chrome treatment)

### Default-first invariant

The `variant` union leads with `solid`, which reproduces the legacy
filled-pill render byte-for-byte. `variant` defaults to `solid`, so every
existing caller and story keeps its current output. New members append to the
end of the union.

### Adopted members

| Member    | Load-bearing distinction                                                                                 |
|-----------|----------------------------------------------------------------------------------------------------------|
| `solid`   | (default, pre-existing) Filled-pill: track fills with `semantic.primary.base` when on.                    |
| `outline` | Chrome shifts from fill to border: transparent track + `1px solid` border; on-state signalled by accent `semantic.primary.base` border-color plus a subtle `color-mix` tint (`primary.base 18% / transparent`) instead of a full track fill. |

### Pilot saturation accounting

- **Reviewed:** 12 candidate toggle treatments
- **Absorbed:** 4 (folded into existing axes — e.g. label/size/loading/disabled already cover these; not new variants)
- **Noise:** 4 (cosmetic restyles with no stable, testable computed-style signal)
- **Dropped:**
  - `gradient-track` — dropped: requires a multi-stop gradient with no semantic token backing; redundant with `solid` accent fill for a boolean control.
  - `glass` — dropped: backdrop-filter/blur has no token and no stable cross-engine computed-style assertion.
  - `inset-shadow` — dropped: relies on raw shadow geometry; the `shadow` tokens do not express an inset and it is not load-bearing for on/off state.
  - `neon` — dropped: glow chrome belongs to interactive press affordances (Button), not a switch track; on-state is already legible via border accent.
- **Unread (not yet examined):** 0  (= 12 reviewed − 12 reviewed; all 12 candidates were reviewed in this round)
- **Saturation rounds:** 1 (pilot)

### Tokens used (no raw values)

- `semantic.primary.base` — on-state accent border + knob tint + `color-mix` source
- `semantic.border.base` — off-state outline border + knob tint
- `motion.duration.normal` / `motion.easing.default` — background-color + border-color transition
- `color-mix(in srgb, …)` — subtle on-state track tint, composed purely from `cssVar` colors (no token literal)

### Notes

- `semantic.border` exposes only `base | muted | strong | focus` (no `subtle`),
  so the off-state outline uses `border.base`; `solid`'s off border keeps its
  original `border.strong`.
- Root hook: `data-bbangto-toggle-variant={variant}` on the `<label>` root.

---

<!-- source: packages/core/catalog/tooltip.audit.md -->
## Tooltip variant axis — saturation audit

- **Category:** atom / overlay
- **Host:** `Tooltip` (`packages/core/src/components/Tooltip.tsx`)
- **Axis:** `variant` (visual chrome family of the bubble)
- **Default-first anchor:** `dark` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

### Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `elevated` | surface fill (`semantic.background.elevated`), `border: none` (hairline removed), soft drop-shadow elevation (`shadow.lg`); arrow inherits the same fill | `dark`/`light`/`error` are all flat-fill + `1px` hairline-border. `elevated` swaps the border for a floating-card drop-shadow — a chrome the border-based members cannot express. |

`elevated` composes color exclusively from existing tokens via `cssVar()`
(`semantic.background.elevated`, `semantic.foreground.base`, `shadow.lg`). No raw
values; `boxShadow` stays `undefined` for the legacy members so their render is
untouched.

### Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5
  - `raised` → folds into `elevated`'s `shadow` elevation.
  - `floating` → identical drop-shadow card; same chrome as `elevated`.
  - `card` → surface fill + shadow == `elevated`.
  - `popover` → overlay surface + shadow == `elevated`.
  - `surface` → flat surface fill already covered by `light`.
- **noise:** 4
  - `bordered` → border-style variation only; an orthogonal sub-axis, not a chrome family.
  - `rounded` → radius sub-axis, not a fill/chrome family.
  - `shadow-sm` → elevation magnitude; a sub-axis of `elevated`, not a new member.
  - `inverse` → color sub-axis (foreground/background swap), not a chrome family.
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent from `SemanticColors`; would force raw values.
  - `gradient` — multi-stop gradient is a fill family already owned by `Button`'s axis; not a distinct tooltip chrome and forces inline color synthesis without payoff here.
- **unreviewed:** 0 (= 12 − 12 reviewed)

Accounting closes: 1 adopted + 5 absorbed + 4 noise + 2 dropped = 12 reviewed.

### Notes

- New member appended to the union tail; `dark` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-tooltip-variant={variant}` (first axis hook on
  this host; future axes should follow the same `data-bbangto-tooltip-*`
  convention, mirroring `data-bbangto-button-variant`).
- a11y contract preserved: `role="tooltip"` overlay with hover/focus parity is
  unchanged; the `Elevated` story asserts both hover- and focus-reveal.
- `semantic.border.subtle` intentionally avoided (not a valid member — would emit
  an undefined CSS var); `elevated` removes the border outright instead.

---

<!-- source: packages/core/catalog/video.audit.md -->
## VideoBlock — layout axis audit

- **Category:** block
- **Host:** `VideoBlock` (`packages/core/src/blocks/VideoBlock.tsx`)
- **Axis:** `layout` (`VideoBlockLayout` union / `data-bbangto-videoblock-layout`)
- **Saturation round:** 1 (pilot)

### Adopted members

| Member | Kind | Load-bearing spec |
|--------|------|-------------------|
| `grid-gallery` | layout | Root composites N square media tiles in a uniform CSS grid (`.bbangto-videoblock-gallery`): base `grid-template-columns: repeat(2, minmax(0, 1fr))` that reflows to `repeat(3, minmax(0, 1fr))` at ≥ `breakpoints.lg` via a scoped `<style>` rule, with a uniform `spacing.16` gap. Each tile is a `1 / 1` aspect-ratio slot (`radius.lg`, `background.sunken`, `overflow: hidden`) holding its own controlled `<video>` (sourced from the new `tiles` prop). Multi-media composition — distinct from the single-media axes `centered`/`split`/`background`/`framed`, which each place exactly one video. |

### Tally

- **reviewed:** 12
- **absorbed:** 4 — "masonry-grid", "thumbnail-strip", "mosaic-wall", and "filmstrip-row" candidates folded into `grid-gallery`: each is a uniform/near-uniform multi-tile reflow that the `gridTemplateColumns` + `gap` + tile aspect-ratio skeleton already expresses (column count / tile ratio are prop/token knobs, not new layout members).
- **noise:** 6 — "video-carousel" (carousel host concern), "lightbox-gallery" (dialog/overlay host concern), "picture-in-picture" (browser API state, not layout), "playlist-sidebar" (= `split` content slot), "autoplay-reel" (playback prop, not layout), "theatre-mode" (= `background` scrim + sizing).
- **dropped:** 2
  - "carousel-gallery" — dropped: a paginated/scroll-snapping track is a Carousel host axis, not a static reflow grid; would duplicate Carousel composition rather than add a VideoBlock skeleton.
  - "pinterest-masonry" — dropped: column-balanced masonry needs intrinsic per-item heights (variable row spans), which contradicts the uniform square-tile `grid-gallery` skeleton; no load-bearing addition over the absorbed uniform grid.
- **unreviewed:** 0 (= 12 − 12 reviewed)

### Notes

- default-first preserved: `centered` remains the first union value and the `layout = 'centered'` default is untouched — existing call sites/stories render unchanged.
- New member appended to the end of the `VideoBlockLayout` union; the member type is exported from the component file as `VideoBlockGalleryLayout` (barrel re-exports via `export *`).
- New optional `tiles?: string[]` prop drives the gallery tiles; it falls back to `[src]` so omitting it keeps existing callers unaffected. Ignored by every other layout.
- All styling uses `cssVar()` tokens (`spacing.16`, `radius.lg`, `semantic.background.sunken`); no raw values, no gradient/glass synthesis needed.
- a11y contract maintained: every tile `<video>` keeps `controls` + a `<track kind="captions">`; the `play` test asserts both on each tile.
- Shared files (barrels, tokens, utils, sibling components) untouched.
