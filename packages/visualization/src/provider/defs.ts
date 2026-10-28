import { useInsertionEffect } from 'react';

/** 감속 시트의 `<style id>`. 정적 렌더 목록(`staticStyles.ts`)과 같은 값을 쓴다. */
export const VIZ_REDUCED_MOTION_STYLE_ID = 'bbangto-viz-reduced-motion';

export const VIZ_REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-bbangto-viz-style-guide] *:not([data-bbangto-viz-animate="essential"]),
  [data-bbangto-viz-style-guide] *:not([data-bbangto-viz-animate="essential"])::before,
  [data-bbangto-viz-style-guide] *:not([data-bbangto-viz-animate="essential"])::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export function useVizDefs(): void {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(VIZ_REDUCED_MOTION_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = VIZ_REDUCED_MOTION_STYLE_ID;
    style.textContent = VIZ_REDUCED_MOTION_CSS;
    document.head.appendChild(style);
  }, []);
}
