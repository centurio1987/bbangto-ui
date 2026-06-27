# Motion Quality Gate & Checklist

Every animation work item (new atom, new variant, or tokenizing an existing
component) must pass this gate. The workflow is **tests + checklist first →
implement → gate** — do not implement before the test and checklist for the
item exist. This file is the gate; copy the checklist into the PR/commit.

> Lives at package root (outside `src/`, package `files: ["dist"]`) → never
> published nor bundled. Companion to `motion-catalog.md` (SSOT) and
> `src/motion/README.md` (how-to).

---

## Workflow (per item)

1. **Write the test first.** Add a `play` function to the item's Storybook
   story asserting its contract (see "Test requirements"). It will fail/red
   until implemented — that's expected.
2. **Instantiate the checklist** below for the item (copy it into your notes/PR).
3. **Implement** per `src/motion/README.md`.
4. **Run the gate** (all must be green):
   ```bash
   pnpm typecheck            # types across tokens/themes/core
   pnpm build                # tsup builds + dts
   pnpm test                 # Storybook stories as Playwright/chromium browser tests
   pnpm --filter storybook build   # stories bundle (full smoke)
   ```
5. **Tick every checklist box.** Any unchecked box = not done.
6. **Record** in `motion-catalog.md` (§4 row → `implemented`, §5 counts, §7 box).

The commands above are the quality gateway. CI / a reviewer re-runs them; a red
gate blocks the item.

---

## Test requirements (Playwright-backed)

Tests run as Storybook `play` functions executed in **real chromium via
`@storybook/addon-vitest` + Playwright** (configured in
`apps/storybook/vite.config.ts`). Use `storybook/test` (`within`, `expect`,
`userEvent`). Templates already exist in
`apps/storybook/src/stories/Motion.stories.tsx`.

Each animation item's story MUST have a `play` function asserting, as applicable:

- **Renders**: children/content present (`findByText`/`getByRole`).
- **Token-driven**: the animated property uses the expected keyframe/token
  (e.g. `getComputedStyle(el).animationName === 'bbangto-<name>'`, or a slide
  offset CSS var is set). See `FadeInDemo`/`SlideInDemo`.
- **Global injection**: `document.getElementById('bbangto-motion-keyframes')`
  is present (proves ThemeProvider injected the sheet).
- **Accessibility role/label**: loading atoms expose `role="status"` +
  `aria-label`; see `SpinnerDemo`.
- **Reduced-motion policy**: essential elements carry
  `data-bbangto-motion="essential"`; non-essential ones do not. A forced
  reduced-motion story (see `ReducedMotion`) demonstrates the behavior.
- **a11y**: keep the `@storybook/addon-a11y` checks clean (no violations) for
  the new stories.

---

## Checklist (copy per item)

### Architecture & tokens
- [ ] Motion *parameters* read from tokens via `cssVar('motion', …)`; no magic numbers.
- [ ] No `@keyframes` body in the token layer; new keyframes added to
      `src/motion/keyframes.ts` and namespaced `bbangto-*`.
- [ ] New looping/preset animation (if any) added to `motion.preset` in tokens
      **and every theme** (`theme-light` + `theme-amber` baseMotion;
      dark/high-contrast inherit via spread).

### Accessibility
- [ ] `prefers-reduced-motion` honored (global reset applies; verified in the
      forced reduced-motion story).
- [ ] Essential-motion exception used **only** where motion conveys state
      (`data-bbangto-motion="essential"`), with justification.
- [ ] Correct ARIA (`role`, `aria-label`/`aria-live`) for status/loading/number
      animations; no screen-reader spam from looping/typing/marquee.
- [ ] Text animations follow `src/motion/README.md`: one stable accessible text
      node, visual animated glyphs/copies hidden with `aria-hidden="true"`, no
      live intermediate substrings, and reduced-motion renders static text.
- [ ] Marquee/ticker atoms pause on hover and focus, and reduce to one static
      copy under `prefers-reduced-motion`.

### SSR / robustness
- [ ] No render-time DOM/`document` access; injection only via
      `useInsertionEffect` (already centralized in ThemeProvider).
- [ ] No hydration-mismatch risk (no `Math.random`/`Date.now` in render output).

### Constraints
- [ ] Zero new runtime dependencies (inline styles + `cssVar` only).
- [ ] `React.forwardRef` + `displayName` + `...props` + `...style` (merged last).
- [ ] Exported from `src/motion/index.ts`.

### Tokenizing an existing component (if applicable)
- [ ] **Values only** changed — DOM structure and animated `property` identical
      (no focus/unmount/layout-timing regression).
- [ ] Removed any now-redundant local `<style>` keyframe (use the global ones).

### Tests & docs
- [ ] `play` test added and green via `pnpm test`.
- [ ] Story renders correctly across **all 5 themes** (light/dark/high-contrast/
      amber-dark/amber-light) and in the reduced-motion story.
- [ ] `motion-catalog.md` §4 row → `implemented` (+ Source URL/License if `ported`),
      §5 counts bumped, §7 checkbox ticked.

### Gate
- [ ] `pnpm typecheck` green
- [ ] `pnpm build` green
- [ ] `pnpm test` green (Playwright/chromium)
- [ ] `pnpm --filter storybook build` green
