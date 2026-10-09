import { flattenToCSSVars } from '@centurio1987/bbangto-ui-tokens';
import type { VisualizationFoundation } from './types';

const PREFIX = '--bbangto-viz';

/** `vvar('node', 'person', 'fill')` → `var(--bbangto-viz-node-person-fill)` */
export const vvar = (...p: string[]): string =>
  `var(${PREFIX}-${p.map((s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()).join('-')})`;

/**
 * foundation → `--bbangto-viz-*` CSS 변수.
 * 대시 패턴의 빈 값('' = 실선)은 `none` 으로 낸다. React 는 빈 문자열 변수를 지우므로, 그대로 두면
 * 바깥 Provider 의 대시가 안쪽 실선 가이드로 상속된다.
 */
export const visualizationFoundationToStyleObject = (
  f: VisualizationFoundation,
): Record<string, string> => {
  const vars = flattenToCSSVars(f as unknown as Record<string, unknown>, PREFIX);
  for (const key of Object.keys(vars)) {
    if (key.endsWith('-dash-pattern') && vars[key] === '') vars[key] = 'none';
  }
  return vars;
};
