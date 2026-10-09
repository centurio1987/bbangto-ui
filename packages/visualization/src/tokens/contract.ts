import { flattenToCSSVars } from '@centurio1987/bbangto-ui-tokens';
import type { VisualizationFoundation } from './types';
import { deriveOnInk } from './onInk';

const PREFIX = '--bbangto-viz';

/** `vvar('node', 'person', 'fill')` → `var(--bbangto-viz-node-person-fill)` */
export const vvar = (...p: string[]): string =>
  `var(${PREFIX}-${p.map((s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()).join('-')})`;

/**
 * foundation → `--bbangto-viz-*` CSS 변수. 면 위 글자색 `--bbangto-viz-on-*` 도 함께 낸다
 * (가이드 `on` 값이 있으면 그것을, 없으면 계산값을 — `./onInk`).
 */
export const visualizationFoundationToStyleObject = (
  f: VisualizationFoundation,
): Record<string, string> => ({
  ...flattenToCSSVars(f as unknown as Record<string, unknown>, PREFIX),
  ...flattenToCSSVars({ on: deriveOnInk(f) } as unknown as Record<string, unknown>, PREFIX),
});
