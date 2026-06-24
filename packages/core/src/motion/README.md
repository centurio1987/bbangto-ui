# Motion layer — implementation conventions

This folder is the **animation Foundation** of the design system. Read this
before adding a new animation atom. The full inventory + roadmap of animations
to port lives in `packages/core/motion-catalog.md` (the SSOT); this file is the
**how**.

## Architecture (3 layers)

1. **Parameters → tokens** (`packages/tokens/src/types.ts`, `theme-*`):
   `motion.duration`, `motion.easing`, `motion.distance`, `motion.preset`.
   Only *values* live here. **Never put `@keyframes` bodies in tokens** — CSS
   custom properties cannot hold a CSS rule.
2. **Keyframes → `keyframes.ts`** (this folder): every `@keyframes` rule, named
   `bbangto-*`, plus the global `prefers-reduced-motion` reset. Injected once
   per document by `ThemeProvider` via `useMotionKeyframes()` (SSR-safe,
   `useInsertionEffect`, deduped by element id).
3. **Atoms → `*.tsx`** (this folder): React components consuming the above.

## Workflow: test-first → implement → quality gate

Do **not** implement before the item's test + checklist exist. The full gate and
the per-item checklist live in `../MOTION_QUALITY_CHECKLIST.md` (package root).
In short:

1. Write the Storybook `play` test first (red until implemented).
2. Copy the checklist for the item.
3. Implement (steps below).
4. Gate — all green:
   `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build`.
   `pnpm test` runs stories as Playwright/chromium browser tests via
   `@storybook/addon-vitest`.
5. Tick every checklist box; update `../motion-catalog.md`.

## How to add a new animation atom

1. If it needs a new keyframe, add it to `KEYFRAME_NAMES` + `KEYFRAMES_CSS` in
   `keyframes.ts` (namespace `bbangto-`). If its timing is a loop that is not in
   the duration scale (e.g. spinner), add an `animation` shorthand to
   `motion.preset` in the token layer + every theme.
2. Create `MyAtom.tsx`. Classify it:
   - **Motion wrapper** (transitions children in/out): default `duration`/
     `easing` to tokens via `cssVar('motion', …)`; expose `duration`/`easing`/
     `delay` props. See `FadeIn.tsx`, `SlideIn.tsx`, `ScaleIn.tsx`.
   - **Loading/visual atom** (conveys state): see `Spinner.tsx`, `Pulse.tsx`.
3. Use `React.forwardRef`, set `displayName`, spread `...props`, merge `...style`
   last so callers can override.
4. **Zero runtime dependencies.** Inline `React.CSSProperties` + `cssVar()` only.
   No framer-motion / emotion / styled-components.
5. Export from `motion/index.ts` (already re-exported by `src/index.ts`).
6. Add a Storybook story in `apps/storybook/src/stories/` (`title: 'Foundations/Motion'`
   or `'Atoms/…'`), `tags: ['autodocs']`, **with a `play` test** asserting its
   contract (see `Motion.stories.tsx` for templates).
7. Update the row in `packages/core/motion-catalog.md`: set `Status=implemented`
   and fill `Atom/Target`, and bump the progress summary count.

## `prefers-reduced-motion` policy

The global reset (in `keyframes.ts`) neutralizes animation/transition for every
element **inside a `[data-bbangto-theme]` subtree**. Exempt an element only when
its motion conveys essential state (e.g. a progress spinner) by setting
`data-bbangto-motion="essential"` — see `Spinner.tsx`. Default = honour the reset.

## Text animation a11y policy

Text animation must preserve a stable accessible name. Animated visual text is
allowed only when assistive technology receives one complete, non-animated
string.

- `TypingText`: render the animated glyph stream with `aria-hidden="true"` and
  expose the full final text in a visually hidden sibling. Do not put each
  intermediate substring in an `aria-live` region. When `prefers-reduced-motion`
  is active, render the final text immediately.
- `SplitReveal`: split visual glyphs/words must be `aria-hidden="true"` and
  accompanied by one visually hidden full-text sibling. The DOM order for the
  accessible text must not depend on animation timing.
- `GradientText`: keep the text itself in normal DOM flow. The gradient is
  decorative styling only, so no extra live region or aria label is needed.
- `Marquee`: moving visual copies must be `aria-hidden="true"` and paired with
  one static accessible text node. Motion must pause on hover and focus. Under
  `prefers-reduced-motion`, disable the marquee animation and show a static
  single copy.
- No text atom may repeatedly announce animation frames. Use `aria-live` only
  for discrete state changes where the final value matters, as in `CountUp`.

## Tokenizing existing components

When replacing hardcoded durations/keyframes in an existing component, change
**values only** — keep DOM structure and the animated `property` identical to
avoid focus/unmount/layout-timing regressions.
