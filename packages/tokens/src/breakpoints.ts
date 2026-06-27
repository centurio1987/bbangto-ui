/**
 * Responsive breakpoints (px).
 *
 * ⚠️ These are intentionally NOT CSS custom properties / `cssVar()` tokens:
 * CSS variables do not work inside `@media (min-width: …)` queries. Consume
 * these breakpoints from JavaScript (`matchMedia`) — e.g. via the
 * `useMediaQuery` hook in `@centurio1987/hooks` — or by interpolating the px
 * value into a scoped `<style>` `@media` rule. For column reflow that does not
 * need a hard breakpoint, prefer intrinsic responsiveness
 * (`grid-template-columns: repeat(auto-fit, minmax(…, 1fr))`, `clamp()`).
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Min-width media-query string for a breakpoint, e.g. `up('md')` → `(min-width: 768px)`. */
export const up = (bp: Breakpoint): string => `(min-width: ${breakpoints[bp]}px)`;

/** Max-width media-query string (exclusive), e.g. `down('md')` → `(max-width: 767.98px)`. */
export const down = (bp: Breakpoint): string => `(max-width: ${breakpoints[bp] - 0.02}px)`;
