import type {
  BbangtoTheme,
  ColorScale,
  SemanticColors,
  TypographyScale,
} from '@centurio1987/bbangto-ui-tokens';

/*
 * Style Guide Catalog — foundations 빌더.
 *
 * 모든 preset이 공유하는 boilerplate(motion 파라미터 / spacing / zIndex / 빈 팔레트
 * 스캐폴드)를 한 곳에 모으고, preset별로 실제 달라지는 값(semantic 색 · 타이포 ·
 * radius · shadow)만 인자로 받아 완전한 BbangtoTheme을 조립한다. 같은 값을
 * 6개 파일에 반복 작성하지 않으므로 drift가 발생하지 않는다.
 */

/** 모든 preset 공통 motion 파라미터 (keyframes 본체는 core motion 레이어 소유). */
const MOTION: BbangtoTheme['motion'] = {
  duration: { instant: '0ms', fast: '120ms', normal: '200ms', slow: '320ms' },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  distance: { sm: '4px', md: '8px', lg: '16px' },
  preset: {
    spin: 'bbangto-spin 1s linear infinite',
    pulse: 'bbangto-pulse 1.5s ease-in-out infinite',
    wave: 'bbangto-wave 1.2s ease-in-out infinite',
    bars: 'bbangto-bars 1s ease-in-out infinite',
    ring: 'bbangto-ring 1.4s ease-in-out infinite',
    shimmer: 'bbangto-shimmer 1.6s ease-in-out infinite',
    animatedGradient: 'bbangto-animated-gradient 8s ease-in-out infinite',
    gridDrift: 'bbangto-grid-drift 12s linear infinite',
    gradientText: 'bbangto-gradient-text 4s ease-in-out infinite',
    splitReveal: 'bbangto-split-reveal 300ms cubic-bezier(0, 0, 0.2, 1) both',
    marquee: 'bbangto-marquee 12s linear infinite',
    borderBeam: 'bbangto-border-beam 3s linear infinite',
    glow: 'bbangto-glow 2.4s ease-in-out infinite',
    attentionShake: 'bbangto-attention-shake 480ms cubic-bezier(0.4, 0, 0.2, 1) both',
    attentionBounce: 'bbangto-attention-bounce 620ms cubic-bezier(0.4, 0, 0.2, 1) both',
  },
};

/** 공통 spacing 스케일 (px). */
const SPACING: BbangtoTheme['spacing'] = {
  0: '0px', 1: '1px', 2: '2px', 3: '3px', 4: '4px',
  5: '5px', 6: '6px', 8: '8px', 10: '10px', 12: '12px',
  16: '16px', 20: '20px', 24: '24px', 32: '32px', 40: '40px',
  48: '48px', 64: '64px',
};

/** 공통 zIndex 레이어. */
const ZINDEX: BbangtoTheme['zIndex'] = {
  dropdown: 1000, sticky: 1100, overlay: 1200,
  modal: 1300, popover: 1400, toast: 1500,
};

/** 기본 중립 ramp(0=가장 어두움 → 100=가장 밝음). preset이 필요 시 덮어쓴다. */
const DEFAULT_NEUTRAL: Partial<ColorScale> = {
  0: '#0A0A0A', 10: '#171717', 20: '#262626', 30: '#404040', 40: '#525252',
  50: '#737373', 60: '#8C8C8C', 70: '#A3A3A3', 80: '#D4D4D4', 90: '#E5E5E5',
  95: '#F5F5F5', 99: '#FAFAFA', 100: '#FFFFFF',
};

/** 기본 타이포 스케일. preset이 부분 덮어쓰기 가능. */
const DEFAULT_TYPE_SCALE: TypographyScale = {
  display: { fontSize: '72px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
  h1: { fontSize: '40px', lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: 700 },
  h2: { fontSize: '30px', lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 700 },
  h3: { fontSize: '20px', lineHeight: '1.4', letterSpacing: '0', fontWeight: 600 },
  body: { fontSize: '16px', lineHeight: '1.6', letterSpacing: '0', fontWeight: 400 },
  meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.04em', fontWeight: 500 },
};

/** 표준 의미색 기본값(상태/카테고리). preset이 입력으로 일부만 덮어쓴다. */
const DEFAULT_STATUS = {
  error: { base: '#D92D20', hover: '#B42318', active: '#912018', subtle: '#FEE4E2', foreground: '#FFFFFF' },
  success: { base: '#079455', hover: '#067647', active: '#05603A', subtle: '#DCFAE6', foreground: '#FFFFFF' },
  warning: { base: '#DC6803', hover: '#B54708', active: '#93370D', subtle: '#FEF0C7', foreground: '#FFFFFF' },
} as const;

/** makeSemantic 입력 — preset이 신경 쓰는 핵심 색만 받는다. */
export interface SemanticInput {
  bg: string; bgElevated: string; bgSunken: string; overlay: string;
  fg: string; fgMuted: string; fgSubtle: string; fgInverse: string;
  border: string; borderMuted: string; borderStrong: string; focus: string;
  primaryBase: string; primaryHover: string; primaryActive: string; primarySubtle: string; primaryFg: string;
  /** 카테고리/태그 강조 색(없으면 primaryBase로 폴백). */
  accent?: string; accent2?: string; accent3?: string;
  /** 상태색 부분 덮어쓰기(다크 테마 등). */
  error?: Partial<SemanticColors['error']>;
  success?: Partial<SemanticColors['success']>;
  warning?: Partial<SemanticColors['warning']>;
  disabled?: Partial<SemanticColors['disabled']>;
  category?: Partial<SemanticColors['category']>;
}

/** 핵심 색만 받아 SemanticColors 전체(상태/카테고리 기본값 포함)를 채운다. */
export function makeSemantic(i: SemanticInput): SemanticColors {
  const a1 = i.accent ?? i.primaryBase;
  const a2 = i.accent2 ?? a1;
  const a3 = i.accent3 ?? i.primaryBase;
  return {
    background: { base: i.bg, elevated: i.bgElevated, sunken: i.bgSunken, overlay: i.overlay },
    foreground: { base: i.fg, muted: i.fgMuted, subtle: i.fgSubtle, inverse: i.fgInverse },
    border: { base: i.border, muted: i.borderMuted, strong: i.borderStrong, focus: i.focus },
    primary: {
      base: i.primaryBase, hover: i.primaryHover, active: i.primaryActive,
      subtle: i.primarySubtle, foreground: i.primaryFg,
    },
    error: { ...DEFAULT_STATUS.error, ...i.error },
    success: { ...DEFAULT_STATUS.success, ...i.success },
    warning: { ...DEFAULT_STATUS.warning, ...i.warning },
    disabled: {
      background: i.bgSunken, foreground: i.fgSubtle, border: i.borderMuted,
      ...i.disabled,
    },
    category: {
      planning: a2, architecture: i.primaryBase, strategy: a3, tech: a1,
      design: a1, research: a2, quality: a3, leadership: a1,
      ...i.category,
    },
  };
}

/** makeFoundations 입력. */
export interface FoundationInput {
  name: string;
  description: string;
  semantic: SemanticColors;
  fontSans: string;
  fontMono: string;
  radius: BbangtoTheme['radius'];
  shadow: BbangtoTheme['shadow'];
  /** 부분 덮어쓰기. 미지정 항목은 DEFAULT_TYPE_SCALE 사용. */
  typeScale?: Partial<TypographyScale>;
  /** 미지정 시 DEFAULT_NEUTRAL. */
  neutral?: Partial<ColorScale>;
}

/** 공통 boilerplate + preset 고유값을 합쳐 완전한 BbangtoTheme을 만든다. */
export function makeFoundations(input: FoundationInput): BbangtoTheme {
  return {
    name: input.name,
    description: input.description,
    palette: {
      common: { white: '#ffffff', black: '#000000' },
      neutral: input.neutral ?? DEFAULT_NEUTRAL,
      coolNeutral: {},
      blue: {},
      red: {},
      green: {},
      orange: {},
    },
    semantic: input.semantic,
    typography: {
      fontFamily: { sans: input.fontSans, mono: input.fontMono },
      scale: { ...DEFAULT_TYPE_SCALE, ...input.typeScale },
    },
    spacing: SPACING,
    radius: input.radius,
    shadow: input.shadow,
    motion: MOTION,
    zIndex: ZINDEX,
  };
}
