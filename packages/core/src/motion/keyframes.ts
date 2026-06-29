import { useInsertionEffect } from 'react';

/**
 * Motion keyframe layer.
 *
 * This module owns every `@keyframes` rule used by the design system. Keyframe
 * bodies are runtime CSS — they cannot be expressed as design tokens (CSS
 * custom properties can only hold values, not rules). The token layer only
 * holds motion *parameters* (duration/easing/distance/preset); preset strings
 * reference the `bbangto-*` keyframe names defined here.
 *
 * Names are namespaced with `bbangto-` to avoid collisions with consumer or
 * third-party keyframes.
 */

/** Keyframe names. The contract between token presets/atoms and the CSS below. */
export const KEYFRAME_NAMES = {
  spin: 'bbangto-spin',
  pulse: 'bbangto-pulse',
  fadeIn: 'bbangto-fade-in',
  fadeOut: 'bbangto-fade-out',
  slideIn: 'bbangto-slide-in',
  slideOut: 'bbangto-slide-out',
  scaleIn: 'bbangto-scale-in',
  scaleOut: 'bbangto-scale-out',
  wave: 'bbangto-wave',
  bars: 'bbangto-bars',
  ring: 'bbangto-ring',
  shimmer: 'bbangto-shimmer',
  animatedGradient: 'bbangto-animated-gradient',
  gridDrift: 'bbangto-grid-drift',
  gradientText: 'bbangto-gradient-text',
  splitReveal: 'bbangto-split-reveal',
  marquee: 'bbangto-marquee',
  borderBeam: 'bbangto-border-beam',
  glow: 'bbangto-glow',
  ripple: 'bbangto-ripple',
  attentionShake: 'bbangto-attention-shake',
  attentionBounce: 'bbangto-attention-bounce',
} as const;

/**
 * The slide keyframe reads per-instance offsets from CSS custom properties so a
 * single keyframe serves every direction. The `SlideIn` atom sets these vars.
 */
export const SLIDE_VARS = {
  x: '--bbangto-slide-x',
  y: '--bbangto-slide-y',
} as const;

const KEYFRAMES_CSS = `
@keyframes ${KEYFRAME_NAMES.spin} {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes ${KEYFRAME_NAMES.pulse} {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
@keyframes ${KEYFRAME_NAMES.fadeIn} {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ${KEYFRAME_NAMES.slideIn} {
  from {
    opacity: 0;
    transform: translate3d(var(${SLIDE_VARS.x}, 0), var(${SLIDE_VARS.y}, 0), 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes ${KEYFRAME_NAMES.scaleIn} {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes ${KEYFRAME_NAMES.fadeOut} {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes ${KEYFRAME_NAMES.scaleOut} {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}
@keyframes ${KEYFRAME_NAMES.slideOut} {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(var(${SLIDE_VARS.x}, 0), var(${SLIDE_VARS.y}, 0), 0);
  }
}
@keyframes ${KEYFRAME_NAMES.wave} {
  0%, 60%, 100% { transform: translateY(0); }
  30%           { transform: translateY(-6px); }
}
@keyframes ${KEYFRAME_NAMES.bars} {
  0%, 80%, 100% { transform: scaleY(0.45); }
  40%           { transform: scaleY(1); }
}
@keyframes ${KEYFRAME_NAMES.ring} {
  0%   { stroke-dashoffset: 78; }
  50%  { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 78; }
}
@keyframes ${KEYFRAME_NAMES.shimmer} {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
@keyframes ${KEYFRAME_NAMES.animatedGradient} {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes ${KEYFRAME_NAMES.gridDrift} {
  from { background-position: 0 0, 0 0, 0 0; }
  to   { background-position: 32px 32px, 32px 32px, 32px 32px; }
}
@keyframes ${KEYFRAME_NAMES.gradientText} {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes ${KEYFRAME_NAMES.splitReveal} {
  from {
    opacity: 0;
    transform: translate3d(0, 0.65em, 0) rotate(2deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}
@keyframes ${KEYFRAME_NAMES.marquee} {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
@keyframes ${KEYFRAME_NAMES.borderBeam} {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ${KEYFRAME_NAMES.glow} {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 20%, transparent);
    filter: brightness(1);
  }
  50% {
    box-shadow: 0 0 24px 0 color-mix(in srgb, currentColor 45%, transparent);
    filter: brightness(1.08);
  }
}
@keyframes ${KEYFRAME_NAMES.ripple} {
  from {
    opacity: 0.28;
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes ${KEYFRAME_NAMES.attentionShake} {
  0%, 100% { transform: translate3d(0, 0, 0); }
  15%      { transform: translate3d(-4px, 0, 0); }
  30%      { transform: translate3d(4px, 0, 0); }
  45%      { transform: translate3d(-3px, 0, 0); }
  60%      { transform: translate3d(3px, 0, 0); }
  75%      { transform: translate3d(-2px, 0, 0); }
}
@keyframes ${KEYFRAME_NAMES.attentionBounce} {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  35%      { transform: translate3d(0, -8px, 0) scale(1.02); }
  55%      { transform: translate3d(0, 0, 0) scale(0.98); }
  75%      { transform: translate3d(0, -3px, 0) scale(1.01); }
}
`;

/**
 * Accessibility: honour `prefers-reduced-motion`. Scoped to the themed subtree
 * so it never touches a consumer's own animations outside the design system.
 * Elements marked `data-bbangto-motion="essential"` (e.g. a loading Spinner
 * that communicates progress) are exempt and keep animating.
 */
const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-bbangto-foundation] *:not([data-bbangto-motion="essential"]),
  [data-bbangto-foundation] *:not([data-bbangto-motion="essential"])::before,
  [data-bbangto-foundation] *:not([data-bbangto-motion="essential"])::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

/** Full static stylesheet injected once per document. */
export const MOTION_CSS = `${KEYFRAMES_CSS}${REDUCED_MOTION_CSS}`;

const STYLE_ELEMENT_ID = 'bbangto-motion-keyframes';

/**
 * Injects the motion stylesheet into `document.head` exactly once, SSR-safely.
 *
 * `useInsertionEffect` runs before layout effects on the client and never on
 * the server, so there is no hydration mismatch and no FOUC from render-time
 * `<style>` thrash. The element is keyed by a stable id so multiple
 * FoundationProviders share a single injection.
 */
export function useMotionKeyframes(): void {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ELEMENT_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = MOTION_CSS;
    document.head.appendChild(style);
    // Intentionally not removed on unmount: the sheet is global and shared
    // across every FoundationProvider instance; removing it would break siblings.
  }, []);
}
