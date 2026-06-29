import type { BbangtoFoundation, DeepPartial } from './types';

/**
 * Deep merges a partial theme override into a base theme.
 */
export function mergeFoundation(
  base: BbangtoFoundation,
  overrides: DeepPartial<BbangtoFoundation>,
): BbangtoFoundation {
  function deepMerge<T extends Record<string, unknown>>(
    target: T,
    source: Record<string, unknown>,
  ): T {
    const result = { ...target };

    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = (target as Record<string, unknown>)[key];

      if (
        sourceVal !== null &&
        sourceVal !== undefined &&
        typeof sourceVal === 'object' &&
        !Array.isArray(sourceVal) &&
        targetVal !== null &&
        targetVal !== undefined &&
        typeof targetVal === 'object' &&
        !Array.isArray(targetVal)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>,
        );
      } else if (sourceVal !== undefined) {
        (result as Record<string, unknown>)[key] = sourceVal;
      }
    }

    return result;
  }

  return deepMerge(
    base as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as unknown as BbangtoFoundation;
}
