# Motion / Animation Catalog (SSOT)

This file is the **single source of truth** for bringing 21st.dev's animation
catalog into the bbangto-ui design system. It is designed so that an agent with
**no prior context or memory** can read this file alone and continue the work.

- **How to implement** (architecture, conventions, step-by-step): see
  `src/motion/README.md`. Read it before adding anything.
- **What to implement / progress**: the registry (§4) + pattern inventory (§4d).

## Scope model: pattern distillation (read this first)

21st.dev lists **hundreds of components** (Buttons 130, Texts 58, Heroes 73,
Sliders 45, …; ~1,400 total). **We do NOT clone them 1:1**, for two reasons:
(1) most are pure styling, not motion (most Buttons/Inputs/Cards/Selects have no
animation); (2) the motion that exists **collapses into a bounded set of ~30
distinct patterns** (fade, slide, scale, spin, pulse, wave, shimmer,
gradient-shift, typing, marquee, scroll-reveal, count-up, border-beam, parallax,
stagger, …) — the hundreds are recombinations/variations of these.

Therefore the unit of work is the **distinct motion pattern**, not the source
item. **Definition of done = every distinct pattern in the §4d inventory is
either `implemented` (as a reusable atom or a documented per-component option)
or `skipped` with a reason.** The big category counts in §4c are *context*
(how many source variations exist), **not a to-do list**.

> This file lives at the package root (outside `src/`) on purpose: the package's
> `files` field is `["dist"]` and tsup's entry is `src/index.ts`, so this doc is
> **never published to npm nor included in the bundle**.

---

## 1. Collection metadata

- **Surveyed:** 2026-06-24
- **Source:** `https://21st.dev/community/components` (+ category subpages)
- **Method:** WebFetch of the community index; category names + counts captured.
- **Known limitation / `cataloged` semantics:** 21st.dev is a **dynamic,
  community-upload** catalog rendered client-side. Individual component items
  (hundreds per category) cannot be exhaustively or reproducibly enumerated via
  fetch. Therefore the registry is tracked **at category granularity**, and
  `cataloged` means *"category confirmed to exist with N items as of the survey
  date"* — not "every item individually listed". When implementing, browse the
  live category page, pick a representative item, and record its `Source URL` +
  `License/Attribution` on a new row.
- **License caveat:** community items have **per-item licenses**. Before
  `ported` (vs `inspired-by`) implementation, confirm the item's license and
  record attribution. When unknown, default to `inspired-by` (re-implement the
  idea from scratch, zero-dependency) — which is this system's standard mode.

## 2. Status & port-type legend

- **Status:** `cataloged` (category logged) · `candidate` (chosen for a future
  pass) · `implemented` · `skipped` (out of scope) · `blocked` (license unclear)
  · `needs-a11y-review` (accessibility policy undecided).
- **Port type:** `inspired-by` (re-implemented from scratch — default) ·
  `ported` (adapted from a specific source; requires Source URL + License).

## 3. Curation criteria (how "representative" items were chosen this pass)

Picked for: (1) reusability across products, (2) fit with the token model
(duration/easing/distance), (3) de-duplication of existing hardcoded motion,
(4) low implementation risk, (5) low accessibility risk, (6) license clarity.
Deferred: anything requiring a runtime dependency or WebGL/shaders. Text motion
with screen-reader/repetition risk is allowed only under the policy in
`src/motion/README.md`.

---

## 4. Registry

### 4a. Implemented this pass — animation atoms (Foundation/Motion)

| Category | Item | Status | Atom/Target | Source URL | License/Attribution | Port type | Notes |
|---|---|---|---|---|---|---|---|
| Texts | Fade in | implemented | `FadeIn` (`src/motion/FadeIn.tsx`) | — | n/a | inspired-by | duration/easing tokenized; reduced-motion aware |
| Texts / Transitions | Slide in | implemented | `SlideIn` (`src/motion/SlideIn.tsx`) | — | n/a | inspired-by | 4-direction, single keyframe via CSS vars; `motion.distance` token |
| Dialogs/Popovers | Scale in (pop) | implemented | `ScaleIn` (`src/motion/ScaleIn.tsx`) | — | n/a | inspired-by | subtle 0.95→1 pop |
| Spinner Loaders | Spinner | implemented | `Spinner` (`src/motion/Spinner.tsx`) | — | n/a | inspired-by | `motion.preset.spin`; `data-bbangto-motion="essential"` (reduced-motion exempt) |
| Spinner Loaders | Pulse | implemented | `Pulse` (`src/motion/Pulse.tsx`) | — | n/a | inspired-by | `motion.preset.pulse` |
| Spinner Loaders | Dots/wave | implemented | `Wave` (`src/motion/Wave.tsx`) | — | n/a | inspired-by | `motion.preset.wave`; staggered 3-dot; `essential` |
| Buttons / Interaction | Hover-lift / press | implemented | `Pressable` (`src/motion/Pressable.tsx`) | — | n/a | inspired-by | tokenized transform transition; wraps buttons/cards without changing their DOM |
| Buttons / Interaction | Ripple | implemented | `Ripple` (`src/motion/Ripple.tsx`) | — | n/a | inspired-by | pointer-origin ripple; decorative span is `aria-hidden` |
| Attention | Shake / bounce | implemented | `Attention` (`src/motion/Attention.tsx`) | — | n/a | inspired-by | `motion.preset.attentionShake` / `attentionBounce` |

### 4b. Tokenized this pass — existing components (hardcoded motion → tokens)

| Component | Change | Status | Notes |
|---|---|---|---|
| `ProgressIndicator` | `spin` keyframe + bar transition → `motion.preset.spin` / duration+easing tokens; removed local `<style>`; marked `essential` | implemented | DOM & animated property unchanged |
| `Skeleton` | `pulse` keyframe → `motion.preset.pulse`; removed local `<style>` | implemented | — |
| `Accordion` | header/content/icon transitions → duration+easing tokens | implemented | property unchanged (`all`/`background-color`/`transform`) |
| `Switch` | track/knob transitions → tokens | implemented | — |
| `Tabs` | trigger color/border transition → tokens | implemented | — |
| `Tooltip` | opacity/visibility transition → tokens | implemented | — |

### 4c. Source categories on 21st.dev → patterns they map to

**The `Items` counts are context, not a backlog** (see Scope model). Each row
maps a source category to the §4d pattern(s) that cover it. To progress, work
the §4d pattern inventory — not these counts.

| Category | Items | Maps to pattern(s) | Notes |
|---|---|---|---|
| Texts | 58 | P13 typing, P14 gradient-text, P15 split-reveal, P16 marquee | text atoms must follow `src/motion/README.md` a11y policy |
| Backgrounds | 33 | P21 gradient-bg, P22 grid-drift-bg | prefer CSS-only (no canvas) |
| Borders | 12 | P19 border-beam | conic-gradient + keyframe |
| Buttons | 130 | P26 hover-lift/press, P27 ripple | most are pure styling, not motion |
| Carousels | 16 | P28 swipe/drag (P3/P6) | enhance existing `Carousel` |
| Accordions | 40 | P5 collapse/expand | enhance existing `Accordion` |
| Tabs | 38 | P6 cross-fade + sliding indicator | enhance existing `Tabs` |
| Dialogs/Modals | 37 | P1 fade + P3 scale | `Modal`/`AlertDialog` enter/exit |
| Popovers | 23 | P3 scale | `Popover` enter/exit |
| Tooltips | 28 | P1 fade | already tokenized |
| Spinner Loaders | 21 | P7 spin, P8 pulse, P9 wave, P10 bars, P11 ring, P12 shimmer | P7/P8/P9 done |
| Sliders | 45 | P28 drag/track | thumb/track motion |
| Scroll Areas | 24 | P24 scroll-reveal, P25 scroll-progress | IntersectionObserver, SSR-safe |
| Numbers | 18 | P17 count-up | live-region a11y |
| Heroes | 73 | P23 parallax (+ P1/P2/P4 composition) | composition, not a single atom |
| Toasts | 2 | P2 slide + P1 fade | `Toast`/`Snackbar` |
| Alerts / Notifications | 23 / 5 | P2 slide + P1 fade | `SectionMessage`/`GlobalBanner` |
| Shaders | 15 | — (skipped) | WebGL; violates zero-dep CSS-only constraint |

> Non-motion-dominant categories (Cards, Inputs, Selects, Tables, Avatars,
> Badges, Forms, Calendars, Pricing, Footers, etc.) are intentionally **not**
> tracked — they belong to the component system, not the motion Foundation.
> Add a pattern only if a specific animated variant warrants one.

### 4d. Distinct motion pattern inventory — **the real backlog**

This is the bounded set the hundreds of source items reduce to. **Done = every
row here is `implemented` or `skipped` (with reason).** Each pattern ships as a
reusable atom and/or a documented per-component option.

| # | Pattern | Status | Atom/Target | Wave |
|---|---|---|---|---|
| P1 | fade in/out | implemented | `FadeIn` | 0 |
| P2 | slide (directional) | implemented | `SlideIn` | 0 |
| P3 | scale / pop | implemented | `ScaleIn` | 0 |
| P4 | stagger / sequence | implemented | `Stagger` (`src/motion/Stagger.tsx`) | 1 |
| P5 | collapse / expand (measured height) | implemented | `Accordion` option | 2 |
| P6 | cross-fade / view switch | implemented | `Tabs`/`Carousel` option | 2 |
| P7 | spin | implemented | `Spinner` | 0 |
| P8 | pulse | implemented | `Pulse` | 0 |
| P9 | wave / dots ripple | implemented | `Wave` | 0 |
| P10 | bars (equalizer) loader | implemented | `BarsLoader` | 3 |
| P11 | ring / progress loader | implemented | `RingLoader` | 3 |
| P12 | shimmer / skeleton sweep | implemented | `Shimmer` | 3 |
| P13 | typing | implemented | `TypingText` | 4 |
| P14 | gradient-shift text | implemented | `GradientText` | 4 |
| P15 | split / char reveal | implemented | `SplitReveal` | 4 |
| P16 | marquee / ticker | implemented | `Marquee` | 4 |
| P17 | count-up / number roll | implemented | `CountUp` | 5 |
| P18 | attention (shake/bounce) | implemented | `Attention` | 6 |
| P19 | animated border / beam | implemented | `BorderBeam` | 5 |
| P20 | glow / shadow pulse | implemented | `Glow` | 5 |
| P21 | animated gradient background | implemented | `AnimatedGradientBg` | 5 |
| P22 | grid / dot drift background | implemented | `GridDriftBg` | 5 |
| P23 | parallax (scroll-linked) | implemented | `Parallax` | 5 |
| P24 | scroll-reveal (in-view) | implemented | `ScrollReveal` | 5 |
| P25 | scroll progress / sticky | implemented | `ScrollProgress` | 5 |
| P26 | hover lift / press | implemented | `Pressable` / Button option | 6 |
| P27 | ripple | implemented | `Ripple` | 6 |
| P28 | drag / swipe (carousel, slider) | implemented | `Carousel`/`Slider` option | 2 |

**Pattern coverage: 28 / 28 implemented** (P1–P28).
Shaders has no pattern (out of scope).

---

## 5. Progress summary

- **Pattern coverage (the real metric): 28 / 28** distinct motion patterns
  implemented (P1–P28). See §4d for the full inventory.
- **Animation atoms implemented:** 25 (`FadeIn`, `SlideIn`, `ScaleIn`,
  `Spinner`, `Pulse`, `Wave`, `Stagger`, `BarsLoader`, `RingLoader`, `Shimmer`,
  `TypingText`, `GradientText`, `SplitReveal`, `Marquee`, `ScrollReveal`,
  `ScrollProgress`, `Parallax`, `AnimatedGradientBg`, `GridDriftBg`,
  `BorderBeam`, `Glow`, `CountUp`, `Pressable`, `Ripple`, `Attention`)
- **Existing components tokenized:** 6 (`ProgressIndicator`, `Skeleton`, `Accordion`, `Switch`, `Tabs`, `Tooltip`)
- **Components with enter/exit motion (Wave 1):** 7 (`Modal`, `AlertDialog` via Modal, `Drawer`, `Toast`, `Snackbar`, `GlobalBanner`, `SectionMessage`)
- **Components with animated indicators / in-place motion (Wave 2):** 4
  (`Tabs`, `Accordion`, `Carousel`, `Slider`)
- **Source categories surveyed:** 19 motion-relevant (counts = context, not a backlog)
- **Quality gate:** wired — `pnpm test` runs Storybook stories as Playwright/
  chromium browser tests (`@storybook/addon-vitest`); gate + checklist: `MOTION_QUALITY_CHECKLIST.md`.
- **Recommended next:** run the full quality gate and treat Shaders as skipped
  unless the zero-dependency CSS-only constraint changes.

_Keep this summary in sync whenever a row's `Status` changes._

---

## 6. Resume procedure (for an agent with NO prior context)

You can pick up this work cold. Follow the **test-first → implement → quality
gate** workflow — never implement before the item's test + checklist exist.

1. **Read** `src/motion/README.md` (how-to) and `MOTION_QUALITY_CHECKLIST.md`
   (the gate + per-item checklist).
2. **Find the next item**: open the lowest-numbered wave in §7 whose
   dependencies are met, and take the first unchecked `[ ]` item — each maps to a
   pattern `P#` in the §4d inventory (the real backlog). Items within a wave are
   parallelizable (mind same-file conflicts). Close a wave only when its exit
   gate passes.
3. **Verify license** for the chosen 21st.dev item. Default `inspired-by`
   (re-implement from scratch, zero-dependency). Only `ported` with a recorded
   Source URL + License.
4. **Write the test first**: add a `play` function to the item's Storybook story
   asserting its contract (render / token-driven / global injection / a11y /
   reduced-motion). Templates live in `Motion.stories.tsx`. It is red until you
   implement — expected.
5. **Instantiate the checklist** from `MOTION_QUALITY_CHECKLIST.md` for the item.
6. **Implement** following the README conventions (token params → keyframe in
   `keyframes.ts` if new → atom in `src/motion/*.tsx` → export → finish story).
7. **Run the quality gate** — all must be green:
   `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build`.
   (`pnpm test` runs the stories as Playwright/chromium browser tests.) Eyeball
   the story across all 5 themes + the reduced-motion story.
8. **Record**: flip the item's §4 row to `implemented` (+ Source URL/License if
   `ported`), **bump §5 counts**, tick the §7 box. Every checklist box ticked.
9. Repeat. Each item is independent — stop and resume at any task boundary.

**Definition of done for the whole effort:** every pattern in the §4d inventory
is either `implemented` (with a green gate + ticked checklist) or explicitly
`skipped` with a reason, and §4d/§5 coverage counts match reality. (Source item
counts in §4c are context, never the done metric.)

## 7. Wave-based execution plan

Work is split into **waves**. A wave = a batch of items sharing a theme, with:
- **Goal** — what the wave delivers.
- **Depends on** — prerequisite wave(s) that must hit their exit gate first.
- **Parallel items** — items within a wave are independent and may be done
  concurrently (incl. by parallel agents). Caveat: items editing the **same
  file** must serialize; different-file items are conflict-free (use git
  worktrees for parallel agents).
- **Exit gate** — applies to every wave: all its items `implemented` with a
  green per-item quality gate + ticked checklist (`MOTION_QUALITY_CHECKLIST.md`),
  §4 rows + §5 counts updated, and the full gate green:
  `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build`.

**Dependency graph:** Wave 0 → (Waves 1, 2, 3, 4, 5, 6 in parallel). Everything
depends only on Wave 0, so after Wave 0 the remaining waves can run
independently / concurrently.

- [x] **Wave 0 — Foundation, curated atoms & quality gate** — _depends on: none._
  Goal: motion infra + first atoms + runnable gate. Done: tokens
  (`distance`, `preset`), `keyframes.ts` + global injection + reduced-motion,
  atoms `FadeIn`/`SlideIn`/`ScaleIn`/`Spinner`/`Pulse`/`Wave`, tokenized 6
  components, `Foundations/Motion` stories + `play` tests, Playwright gate
  (`pnpm test`) + `MOTION_QUALITY_CHECKLIST.md`.

- [x] **Wave 1 — overlay enter/exit + stagger** — _depends on: Wave 0._ Goal:
  mount/unmount transitions for overlays (reuse `FadeIn`/`ScaleIn`/`SlideIn`).
  Parallel items:
  - [x] `Stagger` wrapper (P4) — sequence children with incremental delay
  - [x] `Modal`/`AlertDialog` — backdrop fade + panel scale-in/out (P1+P3)
  - [x] `Popover` — scale-in from trigger origin (P3)
  - [x] `Drawer` — slide-in by side (P2)
  - [x] `Toast`/`Snackbar` — slide+fade enter/exit (P1+P2)
  - [x] `SectionMessage`/`GlobalBanner` — reveal (P1+P2)

- [x] **Wave 2 — animated indicators in existing components** — _depends on:
  Wave 0 (independent of Wave 1)._ Goal: in-place motion polish. Parallel items
  (different files):
  - [x] `Tabs` — sliding underline indicator + cross-fade (P6)
  - [x] `Accordion` — measured height expand, replace `auto` (P5)
  - [x] `Carousel` — refine transform transition / autoplay (P6/P28)
  - [x] `Slider` — thumb/track motion (P28)

- [x] **Wave 3 — loading/visual atom variants** — _depends on: Wave 0._ Goal:
  round out loaders (all `essential`). Parallel items:
  - [x] `BarsLoader` (P10), `RingLoader` (P11)
  - [x] `Shimmer` skeleton variant — gradient sweep (P12)
  - _Note: `Wave` (P9, 3-dot ripple) already shipped in Wave 0._

- [x] **Wave 4 — text animations** — _depends on: Wave 0._ Goal: text motion
  with SR-safe behavior.
  - [x] `GradientText` (P14), `SplitReveal` (P15) — low a11y risk, parallel
  - [x] `TypingText` (P13), `Marquee` (P16) — follow the text animation a11y
    policy in `src/motion/README.md`: static accessible text, visual copies
    hidden from SR, reduced-motion fallback, pause-on-hover/focus for marquee

- [x] **Wave 5 — scroll, backgrounds & decorative** — _depends on: Wave 0._
  Goal: CSS-only, SSR-safe ambient/decorative motion. Parallel items:
  - [x] `ScrollReveal` (P24), `ScrollProgress` (P25) — IntersectionObserver
  - [x] `Parallax` (P23) — scroll-linked
  - [x] `AnimatedGradientBg` (P21), `GridDriftBg` (P22)
  - [x] `BorderBeam` (P19), `Glow` (P20)
  - [x] `CountUp` (P17) — live-region a11y

- [x] **Wave 6 — interaction & attention motion** — _depends on: Wave 0._ Goal:
  hover/press + attention atoms; filter out pure-styling items (Buttons:130).
  Parallel items:
  - [x] `Pressable` / Button hover-lift + press (P26)
  - [x] `Ripple` (P27)
  - [x] `Attention` — shake/bounce (P18)

- [x] **Out of scope:** Shaders (15) — WebGL violates the zero-dependency
  CSS-only constraint. Revisit only if that constraint changes.
