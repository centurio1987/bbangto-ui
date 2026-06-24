import { flattenToCSSVars } from '@centurio1987/tokens';
import type { DiagramTheme } from './types';

const PREFIX = '--bbangto-diagram';

export const dvar = (...p: string[]): string =>
  `var(${PREFIX}-${p.map((s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()).join('-')})`;

export const diagramThemeToStyleObject = (t: DiagramTheme): Record<string, string> =>
  flattenToCSSVars(t as unknown as Record<string, unknown>, PREFIX);
