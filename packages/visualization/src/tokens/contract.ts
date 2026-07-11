import { flattenToCSSVars } from '@centurio1987/bbangto-ui-tokens';
import type { VisualizationFoundation } from './types';

const PREFIX = '--bbangto-viz';

/** `vvar('node', 'person', 'fill')` → `var(--bbangto-viz-node-person-fill)` */
export const vvar = (...p: string[]): string =>
  `var(${PREFIX}-${p.map((s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()).join('-')})`;

export const visualizationFoundationToStyleObject = (
  f: VisualizationFoundation,
): Record<string, string> => flattenToCSSVars(f as unknown as Record<string, unknown>, PREFIX);
