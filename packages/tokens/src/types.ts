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
export interface BbangtoFoundation {
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

  /**
   * Motion / Animation.
   *
   * Only motion *parameters* live here (durations, easing curves, slide
   * distances, and ready-made `animation` shorthand presets). The `@keyframes`
   * rule bodies themselves are NOT tokens — CSS custom properties cannot hold a
   * CSS rule — they live in `@centurio1987/core`'s motion layer
   * (`src/motion/keyframes.ts`) and are injected once globally. Preset strings
   * reference those keyframes by their `bbangto-*` names.
   */
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
    /** Translate offsets used by slide-style enter/exit animations. */
    readonly distance: {
      readonly sm: string;
      readonly md: string;
      readonly lg: string;
    };
    /**
     * Ready-made `animation` shorthand strings for looping/visual animations
     * whose timing is not part of the duration scale (e.g. spinner, pulse).
     * Each references a `bbangto-*` keyframe owned by the core motion layer.
     */
    readonly preset: {
      readonly spin: string;
      readonly pulse: string;
      readonly wave: string;
      readonly bars: string;
      readonly ring: string;
      readonly shimmer: string;
      readonly animatedGradient: string;
      readonly gridDrift: string;
      readonly gradientText: string;
      readonly splitReveal: string;
      readonly marquee: string;
      readonly borderBeam: string;
      readonly glow: string;
      readonly attentionShake: string;
      readonly attentionBounce: string;
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

/**
 * 하나의 StyleGuide(모티프) 위에서 기호선택 가능한 색 스킴 변형.
 * 모티프(래퍼 CSS·shape)는 공유하고 foundation 색만 갈아끼운다.
 */
export interface FoundationPreset {
  /** 안정 id: 'default' | 'dark' | 'warm' ... (data-bbangto-foundation 값). */
  readonly key: string;
  /** 표시명: '기본 (Light)' 등. */
  readonly label: string;
  /** 이 preset의 완성된 foundation 토큰. */
  readonly foundations: BbangtoFoundation;
  /** 선택. preset별 --bbangto-ext-* 확장 CSS 변수(색 결합값). */
  readonly extendedFoundations?: Record<string, string>;
}

/**
 * StyleGuide의 토큰 레이어. React 의존 없이 프레임워크 독립적으로 사용 가능.
 * foundations(필수) + extendedFoundations + guidelines로 구성된다.
 */
export interface StyleGuideTokens {
  readonly name: string;
  readonly description?: string;
  /** 필수. 기존 BbangtoFoundation 토큰 (CSS 변수로 주입된다). */
  readonly foundations: BbangtoFoundation;
  /** 선택. visual motif 구현을 위한 확장 CSS 변수. --bbangto-ext-* 네임스페이스 권장. */
  readonly extendedFoundations?: Record<string, string>;
  /**
   * 선택. 기호선택 가능한 색 스킴 목록. 없으면 foundations 단일 사용(기존 동작).
   * 첫 항목의 foundations는 base foundations와 동일 객체를 참조해 drift를 방지한다.
   */
  readonly foundationPresets?: readonly FoundationPreset[];
  /** 선택. 기본 preset key. 미지정 시 foundationPresets[0].key. */
  readonly defaultFoundationKey?: string;
  /** 선택. 컴포넌트 사용 가이드라인 (JSON 객체). 키: 가이드라인 이름, 값: 구조화된 데이터. */
  readonly guidelines?: Record<string, Record<string, unknown>>;
}

/** Utility type for partial theme overrides */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type FoundationOverride = DeepPartial<BbangtoFoundation>;
