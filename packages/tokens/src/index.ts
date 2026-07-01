export type {
  BbangtoFoundation,
  ColorScale,
  SemanticColors,
  TypographyStyle,
  TypographyScale,
  DeepPartial,
  FoundationOverride,
  StyleGuideTokens,
  FoundationPreset,
} from './types';

export { flattenToCSSVars, foundationToCSSString, foundationToStyleObject, cssVar } from './contract';
export { mergeFoundation } from './utils';
export { breakpoints, up, down } from './breakpoints';
export type { Breakpoint } from './breakpoints';
