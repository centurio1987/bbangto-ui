import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';

/**
 * Neobrutalism_Editorial_01 — 단일 출처 모티프 상수.
 *
 * gold/ink/paper/offset-shadow 같은 핵심 값을 한 곳에서 선언해
 * foundations(BbangtoFoundation)와 extendedFoundations(CSS 변수) 양쪽에서 참조한다.
 * 같은 값을 두 군데 하드코딩하지 않으므로 색을 바꿀 때 drift가 발생하지 않는다.
 */
export const BAKERY = {
  /** 잉크 — 본문/테두리/1차 액션 채움. */
  ink: '#1C1B17',
  inkHover: '#2A2823',
  inkActive: '#000000',
  /** 크림 — 페이지 캔버스. */
  cream: '#FAF2DD',
  /** 종이 — elevated 표면(메뉴 카드 등). */
  paper: '#FFFCF2',
  /** 크림보다 한 톤 가라앉은 sunken 표면. */
  creamSunken: '#F3E8C9',
  /** 골드 — 브랜드 강조색. 오프셋 그림자와 포커스 링에 사용. */
  gold: '#E9C766',
  goldHover: '#DDB94E',
  /** 카테고리 악센트 (템플릿 PRODUCT=gold / APP=green / INFRA=pink). */
  green: '#C2D3B4',
  pink: '#ECC3C8',
  /** 본문 보조 텍스트. */
  muted: '#4A463C',
  subtle: '#6E6A5E',
  faint: '#9A9483',
  /** 모티프 파라미터. */
  borderWidth: '2px',
} as const;

/** 잉크 기반 하드 오프셋 그림자(blur 0). 카드 등 일반 표면용. */
const inkOffset = (n: number) => `${n}px ${n}px 0 ${BAKERY.ink}`;
/** 골드 오프셋 그림자 — 버튼 모티프의 시그니처. */
export const BAKERY_OFFSET_SHADOW = `3px 3px 0 ${BAKERY.gold}`;

/**
 * Neobrutalism_Editorial_01 foundations.
 *
 * 네오브루탈리즘 "소프트웨어 베이커리" 모티프:
 * - 크림 캔버스 + 잉크 텍스트/테두리 + 골드 강조
 * - 각진 모서리(radius 0) + 잉크 실선 테두리 + 하드 오프셋 그림자
 * - IBM Plex Sans KR(본문) / IBM Plex Mono(라벨·수치)
 */
export const bakeryFoundations: BbangtoFoundation = {
  name: 'bakery',
  description: '네오브루탈리즘 소프트웨어 베이커리 — 크림·잉크·골드, 각진 모서리, 하드 오프셋 그림자',

  palette: {
    common: { white: '#ffffff', black: '#000000' },
    neutral: {
      0: BAKERY.ink,
      10: '#221F1A',
      20: '#3A3833',
      30: '#4A463C',
      40: BAKERY.subtle,
      50: '#857F70',
      60: BAKERY.faint,
      70: '#B9B19C',
      80: '#D8CFB5',
      90: BAKERY.creamSunken,
      95: BAKERY.cream,
      99: BAKERY.paper,
      100: '#ffffff',
    },
    coolNeutral: {},
    blue: {},
    red: {},
    green: {},
    orange: {},
  },

  semantic: {
    background: {
      base: BAKERY.cream,
      elevated: BAKERY.paper,
      sunken: BAKERY.creamSunken,
      overlay: 'rgba(28,27,23,0.55)',
    },
    foreground: {
      base: BAKERY.ink,
      muted: BAKERY.muted,
      subtle: BAKERY.subtle,
      inverse: BAKERY.cream,
    },
    border: {
      base: BAKERY.ink,
      muted: '#3A3833',
      strong: BAKERY.ink,
      focus: BAKERY.gold,
    },
    // 1차 액션 = 잉크 채움 + 크림 텍스트 (템플릿의 메인 CTA).
    primary: {
      base: BAKERY.ink,
      hover: BAKERY.inkHover,
      active: BAKERY.inkActive,
      subtle: BAKERY.gold,
      foreground: BAKERY.cream,
    },
    error: {
      base: '#C0392B',
      hover: '#A93226',
      active: '#922B21',
      subtle: '#F5D8D3',
      foreground: BAKERY.cream,
    },
    success: {
      base: '#5C7A4A',
      hover: '#4E6840',
      active: '#3F5534',
      subtle: BAKERY.green,
      foreground: BAKERY.cream,
    },
    warning: {
      base: '#B8860B',
      hover: '#A2770A',
      active: '#8A6508',
      subtle: BAKERY.gold,
      foreground: BAKERY.ink,
    },
    disabled: {
      background: BAKERY.creamSunken,
      foreground: BAKERY.faint,
      border: '#C9BFA3',
    },
    // 베이커리 팔레트로 매핑 — product=gold, app=green, infra=pink, 나머지는 잉크 계열.
    category: {
      planning: '#5C7A4A',
      architecture: BAKERY.ink,
      strategy: '#C0392B',
      tech: '#B8860B',
      design: BAKERY.pink,
      research: BAKERY.green,
      quality: '#5C7A4A',
      leadership: BAKERY.gold,
    },
  },

  typography: {
    fontFamily: {
      sans: "'IBM Plex Sans KR', sans-serif",
      mono: "'IBM Plex Mono', monospace",
    },
    scale: {
      display: { fontSize: '96px', lineHeight: '0.9', letterSpacing: '0.04em', fontWeight: 700 },
      h1: { fontSize: '38px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 700 },
      h2: { fontSize: '30px', lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: 700 },
      h3: { fontSize: '20px', lineHeight: '1.3', letterSpacing: '0', fontWeight: 700 },
      body: { fontSize: '16px', lineHeight: '1.75', letterSpacing: '0', fontWeight: 400 },
      meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
    },
  },

  spacing: {
    0: '0px', 1: '1px', 2: '2px', 3: '3px', 4: '4px',
    5: '5px', 6: '6px', 8: '8px', 10: '10px', 12: '12px',
    16: '16px', 20: '20px', 24: '24px', 32: '32px', 40: '40px',
    48: '48px', 64: '64px',
  },

  // 각진 모서리 모티프 — full(원형)만 곡률 허용, 나머지는 전부 0.
  radius: {
    none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px',
  },

  // soft blur 대신 하드 오프셋(blur 0) 그림자 스케일.
  shadow: {
    none: 'none',
    sm: inkOffset(2),
    md: inkOffset(3),
    lg: inkOffset(5),
    xl: inkOffset(8),
  },

  motion: {
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
  },

  zIndex: {
    dropdown: 1000, sticky: 1100, overlay: 1200,
    modal: 1300, popover: 1400, toast: 1500,
  },
};

/**
 * 확장 토큰 (visual motif). `--bbangto-ext-*` 네임스페이스로 그대로 주입된다.
 * 값은 모두 위 BAKERY 상수 / BAKERY_OFFSET_SHADOW에서 파생 — 단일 출처.
 */
export const bakeryExtendedFoundations: Record<string, string> = {
  '--bbangto-ext-ink': BAKERY.ink,
  '--bbangto-ext-paper': BAKERY.paper,
  '--bbangto-ext-accent': BAKERY.gold,
  '--bbangto-ext-accent-app': BAKERY.green,
  '--bbangto-ext-accent-infra': BAKERY.pink,
  '--bbangto-ext-border-width': BAKERY.borderWidth,
  '--bbangto-ext-offset-shadow': BAKERY_OFFSET_SHADOW,
};
