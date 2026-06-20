/**
 * Color scale with numbered steps matching Wanted Design System's atomic color system.
 * Steps range from 0 (darkest/black) to 100 (lightest/white).
 */
export interface ColorScale {
  readonly 0: string;
  readonly 5: string;
  readonly 7?: string;
  readonly 10: string;
  readonly 15?: string;
  readonly 17?: string;
  readonly 20: string;
  readonly 22?: string;
  readonly 23?: string;
  readonly 25?: string;
  readonly 30: string;
  readonly 40: string;
  readonly 45?: string;
  readonly 50: string;
  readonly 60: string;
  readonly 70: string;
  readonly 80: string;
  readonly 90: string;
  readonly 95: string;
  readonly 96?: string;
  readonly 97?: string;
  readonly 98?: string;
  readonly 99: string;
  readonly 100: string;
}

/**
 * Semantic color tokens that map to specific UI roles.
 * These change between light and dark themes.
 */
export interface SemanticColors {
  readonly background: {
    readonly base: string;
    readonly elevated: string;
    readonly sunken: string;
    readonly overlay: string;
  };
  readonly foreground: {
    readonly base: string;
    readonly muted: string;
    readonly subtle: string;
    readonly inverse: string;
  };
  readonly border: {
    readonly base: string;
    readonly muted: string;
    readonly strong: string;
    readonly focus: string;
  };
  readonly primary: {
    readonly base: string;
    readonly hover: string;
    readonly active: string;
    readonly subtle: string;
    readonly foreground: string;
  };
  readonly error: {
    readonly base: string;
    readonly hover: string;
    readonly active: string;
    readonly subtle: string;
    readonly foreground: string;
  };
  readonly success: {
    readonly base: string;
    readonly hover: string;
    readonly active: string;
    readonly subtle: string;
    readonly foreground: string;
  };
  readonly warning: {
    readonly base: string;
    readonly hover: string;
    readonly active: string;
    readonly subtle: string;
    readonly foreground: string;
  };
  readonly disabled: {
    readonly background: string;
    readonly foreground: string;
    readonly border: string;
  };
  readonly category: {
    readonly planning: string;
    readonly architecture: string;
    readonly strategy: string;
    readonly tech: string;
    readonly design: string;
    readonly research: string;
    readonly quality: string;
    readonly leadership: string;
  };
}

/**
 * Typography token for a single text style.
 */
export interface TypographyStyle {
  readonly fontSize: string;
  readonly lineHeight: string;
  readonly letterSpacing: string;
  readonly fontWeight: number;
}

/**
 * Complete typography scale based on Wanted Design System.
 * 7 hierarchy levels with Bold/Medium/Regular variants.
 */
export interface TypographyScale {
  readonly display: TypographyStyle;
  readonly h1: TypographyStyle;
  readonly h2: TypographyStyle;
  readonly h3: TypographyStyle;
  readonly body: TypographyStyle;
  readonly meta: TypographyStyle;
}

/**
 * The complete Bbangto UI theme interface.
 */
export interface BbangtoTheme {
  readonly name: string;
  readonly description?: string;

  /** Raw atomic color palettes */
  readonly palette: {
    readonly common: { readonly white: string; readonly black: string };
    readonly neutral: Partial<ColorScale>;
    readonly coolNeutral: Partial<ColorScale>;
    readonly blue: Partial<ColorScale>;
    readonly red: Partial<ColorScale>;
    readonly green: Partial<ColorScale>;
    readonly orange: Partial<ColorScale>;
  };

  /** Semantic color assignments (change with light/dark mode) */
  readonly semantic: SemanticColors;

  /** Typography */
  readonly typography: {
    readonly fontFamily: {
      readonly sans: string;
      readonly mono: string;
    };
    readonly scale: TypographyScale;
  };

  /** Spacing scale (px values) */
  readonly spacing: {
    readonly 0: string;
    readonly 1: string;
    readonly 2: string;
    readonly 3: string;
    readonly 4: string;
    readonly 5: string;
    readonly 6: string;
    readonly 8: string;
    readonly 10: string;
    readonly 12: string;
    readonly 16: string;
    readonly 20: string;
    readonly 24: string;
    readonly 32: string;
    readonly 40: string;
    readonly 48: string;
    readonly 64: string;
  };

  /** Border radius scale */
  readonly radius: {
    readonly none: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly full: string;
  };

  /** Shadow scale */
  readonly shadow: {
    readonly none: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };

  /** Motion / Animation */
  readonly motion: {
    readonly duration: {
      readonly instant: string;
      readonly fast: string;
      readonly normal: string;
      readonly slow: string;
    };
    readonly easing: {
      readonly default: string;
      readonly in: string;
      readonly out: string;
      readonly inOut: string;
    };
  };

  /** Z-index layers */
  readonly zIndex: {
    readonly dropdown: number;
    readonly sticky: number;
    readonly overlay: number;
    readonly modal: number;
    readonly popover: number;
    readonly toast: number;
  };

  /** Optional component-level token overrides */
  readonly components?: Record<string, Record<string, string>>;
}

/** Utility type for partial theme overrides */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverride = DeepPartial<BbangtoTheme>;
