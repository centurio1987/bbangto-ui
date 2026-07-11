import { useInsertionEffect } from 'react';

const STYLE_ELEMENT_ID = 'bbangto-diagram-reduced-motion';

const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-bbangto-diagram-theme] *:not([data-bbangto-diagram-animate="essential"]),
  [data-bbangto-diagram-theme] *:not([data-bbangto-diagram-animate="essential"])::before,
  [data-bbangto-diagram-theme] *:not([data-bbangto-diagram-animate="essential"])::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export function useDiagramDefs(): void {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ELEMENT_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = REDUCED_MOTION_CSS;
    document.head.appendChild(style);
  }, []);
}
