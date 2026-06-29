import type { BbangtoFoundation } from './types';

const PREFIX = '--bbangto';

/**
 * Flattens a nested theme object into CSS custom property name-value pairs.
 * e.g., { semantic: { background: { base: '#fff' } } }
 * becomes { '--bbangto-semantic-background-base': '#fff' }
 */
export function flattenToCSSVars(
  obj: Record<string, unknown>,
  prefix: string = PREFIX,
): Record<string, string> {
  const result: Record<string, string> = {};

  function recurse(current: unknown, path: string): void {
    if (current === null || current === undefined) return;

    if (typeof current === 'string' || typeof current === 'number') {
      result[path] = String(current);
      return;
    }

    if (typeof current === 'object' && !Array.isArray(current)) {
      for (const [key, value] of Object.entries(current as Record<string, unknown>)) {
        // Skip metadata fields
        if (key === 'name' || key === 'description') continue;
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        recurse(value, `${path}-${cssKey}`);
      }
    }
  }

  recurse(obj, prefix);
  return result;
}

/**
 * Generates a CSS string with all custom properties from a theme.
 */
export function foundationToCSSString(theme: BbangtoFoundation): string {
  const vars = flattenToCSSVars(theme as unknown as Record<string, unknown>);
  const lines = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return lines;
}

/**
 * Generates a React-compatible style object from a theme.
 */
export function foundationToStyleObject(theme: BbangtoFoundation): Record<string, string> {
  return flattenToCSSVars(theme as unknown as Record<string, unknown>);
}

/**
 * Returns the CSS variable reference string for use in stylesheets.
 * e.g., cssVar('semantic', 'background', 'base') => 'var(--bbangto-semantic-background-base)'
 */
export function cssVar(...path: string[]): string {
  const cssPath = path
    .map((p) => p.replace(/([A-Z])/g, '-$1').toLowerCase())
    .join('-');
  return `var(${PREFIX}-${cssPath})`;
}
