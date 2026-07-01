import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * WarpedCheckerboard_01 — 액화·물결 왜곡된 2색 체크 격자 미학.
 *
 * 직교 체크/깅엄 격자를 파도처럼 휘게 만든 풀블리드 디스토션 배경(딥 레드 + 베이비 핑크)
 * 위에, 텍스트는 반드시 솔리드 화이트 패널로 분리해 가독을 확보한다. 굵은 라운드
 * 그로테스크 산세리프(Y2K/레트로), 넉넉한 spacing, 큰 radius(lg~xl)로 말랑한 호응을 만들고,
 * shadow는 거의 없이(평면 플랫 카드) 패턴 왜곡이 깊이감을 대신한다.
 */

const RED = '#B3122B';
const PINK = '#F2A6B8';
const INK = '#1A0A0E';

const foundations = makeFoundations({
  name: 'warped-checkerboard-01',
  description: '액화 왜곡된 2색 체크 격자(레드/핑크) 풀블리드 배경 + 솔리드 화이트 패널 + 라운드 그로테스크 + 플랫 카드',
  fontSans: "'Fredoka', 'Clash Display', 'General Sans', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '10px', md: '16px', lg: '24px', xl: '32px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 0 rgba(26,10,14,0.04)',
    md: '0 1px 2px rgba(26,10,14,0.06)',
    lg: '0 2px 6px rgba(26,10,14,0.08)',
    xl: '0 4px 12px rgba(26,10,14,0.10)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: 700 },
    h1: { fontSize: '44px', lineHeight: '1.08', letterSpacing: '-0.01em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '0em', fontWeight: 600 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FDF2F5',
    bgElevated: '#FFFFFF',
    bgSunken: '#FBE4EA',
    overlay: 'rgba(26,10,14,0.55)',
    fg: INK,
    fgMuted: '#5A3A42',
    fgSubtle: '#8A6A72',
    fgInverse: '#FFFFFF',
    border: PINK,
    borderMuted: '#FBE4EA',
    borderStrong: RED,
    focus: RED,
    primaryBase: RED,
    primaryHover: '#8F0E22',
    primaryActive: '#6E0A1A',
    primarySubtle: '#FBE4EA',
    primaryFg: '#FFFFFF',
    accent: RED,
    accent2: PINK,
    accent3: INK,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-warp-cell': '44px',
  '--bbangto-ext-warp-color-a': RED,
  '--bbangto-ext-warp-color-b': PINK,
  '--bbangto-ext-warp-amplitude': '12px',
  '--bbangto-ext-warp-frequency': '0.04',
  '--bbangto-ext-warp-pattern':
    'repeating-conic-gradient(var(--bbangto-ext-warp-color-a, #B3122B) 0% 25%, var(--bbangto-ext-warp-color-b, #F2A6B8) 0% 50%) 0 0 / var(--bbangto-ext-warp-cell, 44px) var(--bbangto-ext-warp-cell, 44px)',
  '--bbangto-ext-warp-svg':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='warp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.02' numOctaves='2' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='28' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3C/svg%3E#warp\")",
  '--bbangto-ext-warp-speed': '14s',
};

/* 색 스킴 변형(colorway) — 액화 왜곡 체크/보더/shape 모티프는 base에서 상속하고 색만 교체한다. */

// 다크: 잉크 나이트 위에 흐르는 딥 마룬 × 비비드 핑크 체크. (base는 라이트 → 다크 대비 변형)
const DARK_RED = '#FF4D6D';
const DARK_PINK = '#3A0E1A';
const darkFoundations = makeColorway(foundations, {
  name: 'warped-checkerboard-01-dark',
  description: '액화 왜곡 체크 다크 — 잉크 나이트 배경 위 딥 마룬×비비드 핑크 격자 + 라이트 패널',
  semantic: makeSemantic({
    bg: '#1A0A0E', bgElevated: '#2A121A', bgSunken: '#120609', overlay: 'rgba(0,0,0,0.62)',
    fg: '#FDE7EC', fgMuted: '#E0A9B6', fgSubtle: '#B07C88', fgInverse: '#1A0A0E',
    border: '#4A1E2A', borderMuted: '#2A121A', borderStrong: DARK_RED, focus: DARK_RED,
    primaryBase: DARK_RED, primaryHover: '#FF7088', primaryActive: '#FF98A8',
    primarySubtle: DARK_PINK, primaryFg: '#1A0A0E',
    accent: DARK_RED, accent2: '#F2A6B8', accent3: '#FDE7EC',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-warp-cell': '44px',
  '--bbangto-ext-warp-color-a': DARK_RED,
  '--bbangto-ext-warp-color-b': DARK_PINK,
  '--bbangto-ext-warp-amplitude': '12px',
  '--bbangto-ext-warp-frequency': '0.04',
  '--bbangto-ext-warp-pattern':
    'repeating-conic-gradient(var(--bbangto-ext-warp-color-a, #FF4D6D) 0% 25%, var(--bbangto-ext-warp-color-b, #3A0E1A) 0% 50%) 0 0 / var(--bbangto-ext-warp-cell, 44px) var(--bbangto-ext-warp-cell, 44px)',
  '--bbangto-ext-warp-svg':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='warp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.02' numOctaves='2' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='28' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3C/svg%3E#warp\")",
  '--bbangto-ext-warp-speed': '14s',
};

// 코발트: 붉은 계열을 코발트×하늘색 체크로 전환한 라이트 액센트 변형. (강조색 전환)
const COBALT = '#1E50C8';
const COBALT_SKY = '#8FB4EE';
const cobaltFoundations = makeColorway(foundations, {
  name: 'warped-checkerboard-01-cobalt',
  description: '액화 왜곡 체크 코발트 — 코발트×스카이 블루 격자 라이트 액센트 변형',
  semantic: makeSemantic({
    bg: '#EEF4FD', bgElevated: '#FFFFFF', bgSunken: '#DFE9F8', overlay: 'rgba(10,18,31,0.55)',
    fg: '#0A121F', fgMuted: '#3A4457', fgSubtle: '#6A7488', fgInverse: '#FFFFFF',
    border: '#A9C4F0', borderMuted: '#DFE9F8', borderStrong: COBALT, focus: COBALT,
    primaryBase: COBALT, primaryHover: '#1740A6', primaryActive: '#102F7D',
    primarySubtle: '#D6E3FA', primaryFg: '#FFFFFF',
    accent: COBALT, accent2: COBALT_SKY, accent3: '#0A121F',
  }),
});
const cobaltExt: Record<string, string> = {
  '--bbangto-ext-warp-cell': '44px',
  '--bbangto-ext-warp-color-a': COBALT,
  '--bbangto-ext-warp-color-b': COBALT_SKY,
  '--bbangto-ext-warp-amplitude': '12px',
  '--bbangto-ext-warp-frequency': '0.04',
  '--bbangto-ext-warp-pattern':
    'repeating-conic-gradient(var(--bbangto-ext-warp-color-a, #1E50C8) 0% 25%, var(--bbangto-ext-warp-color-b, #8FB4EE) 0% 50%) 0 0 / var(--bbangto-ext-warp-cell, 44px) var(--bbangto-ext-warp-cell, 44px)',
  '--bbangto-ext-warp-svg':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='warp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.02' numOctaves='2' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='28' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3C/svg%3E#warp\")",
  '--bbangto-ext-warp-speed': '14s',
};

const STYLE_ID = 'bbangto-warped-checkerboard-motif';
const CSS = `
.bbangto-warped-checkerboard-card {
  position: relative !important;
  background: var(--bbangto-semantic-background-elevated, #FFFFFF) !important;
  border-radius: var(--bbangto-radius-xl, 32px) !important;
  border: 2px solid var(--bbangto-semantic-border-base, #F2A6B8) !important;
  box-shadow: var(--bbangto-shadow-md, 0 1px 2px rgba(26,10,14,0.06)) !important;
  transition: transform 200ms cubic-bezier(0.2, 0, 0, 1), border-color 200ms ease !important;
}
.bbangto-warped-checkerboard-card:hover {
  transform: translateY(-2px) !important;
  border-color: var(--bbangto-semantic-border-strong, #B3122B) !important;
}
.bbangto-warped-checkerboard-card:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus, #B3122B) !important;
  outline-offset: 3px;
}
.bbangto-warped-checkerboard-btn {
  border-radius: 9999px !important;
  background: var(--bbangto-semantic-primary-base, #B3122B) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-family: 'Fredoka', 'Clash Display', system-ui, sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
  border: none !important;
  box-shadow: none !important;
  transition: transform 120ms ease, background 120ms ease !important;
}
.bbangto-warped-checkerboard-btn:hover { background: var(--bbangto-semantic-primary-hover, #8F0E22) !important; }
.bbangto-warped-checkerboard-btn:active { transform: translateY(1px) scale(0.98) !important; background: var(--bbangto-semantic-primary-active, #6E0A1A) !important; }
.bbangto-warped-checkerboard-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus, #B3122B) !important;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-warped-checkerboard-card { transition: none !important; }
  .bbangto-warped-checkerboard-card:hover { transform: none !important; }
  .bbangto-warped-checkerboard-btn { transition: none !important; }
  .bbangto-warped-checkerboard-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-warped-checkerboard-btn',
  cardClass: 'bbangto-warped-checkerboard-card',
  displayPrefix: 'WarpedCheckerboard',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 9999, fontFamily: "'Fredoka', 'Clash Display', system-ui, sans-serif",
      fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-base, #B3122B)',
        color: 'var(--bbangto-semantic-primary-foreground, #FFFFFF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-primary-subtle, #FBE4EA)',
        color: 'var(--bbangto-semantic-foreground-muted, #5A3A42)',
      },
      solid: {
        background: 'var(--bbangto-semantic-foreground-base, #1A0A0E)',
        color: 'var(--bbangto-semantic-foreground-inverse, #FFFFFF)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'WARP 01',
  title: '휘어지는 체크, 흐르는 격자',
  tagline: '직교 격자를 파도처럼 액화한 디스토션 미학',
  body: '딥 레드와 베이비 핑크의 체크 격자를 물결처럼 왜곡해 풀블리드 배경으로 깔고, 텍스트는 솔리드 화이트 패널 위에만 올려 또렷하게 읽힌다. 그림자 없는 플랫 카드 위로 패턴의 왜곡이 깊이를 대신한다.',
  ctaPrimary: '룩북 열기',
  ctaSecondary: '패턴 살펴보기',
  bandTitle: '격자가 유체처럼 휘어지는 단 하나의 변형 문법.',
  items: [
    { name: '히어로 패널', tone: 'accent', tag: 'HERO', desc: '왜곡 체크 풀블리드 위에 솔리드 카드와 대형 타이포를 올린다.' },
    { name: '룩북 카드', tone: 'muted', tag: 'LOOKBOOK', desc: '평면 화이트 패널에 핑크 보더로 패턴과 콘텐츠를 분리한다.' },
    { name: '링크 칩', tone: 'solid', tag: 'BIO', desc: '잉크 솔리드 알약 라벨로 패턴 위에서도 또렷하게 묶는다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'WarpedCheckerboardShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '왜곡 체크 레이아웃',
    dos: [
      '왜곡된 체크 격자는 배경/보더 등 장식 레이어에만 한정하고 풀블리드로 깐다.',
      '텍스트와 폼은 반드시 솔리드 화이트 패널(inset) 위에 분리해 배치한다.',
      'radius는 lg~xl(24~32px)로 크게 잡아 패턴의 말랑한 물결과 호응시킨다.',
    ],
    donts: [
      '왜곡 패턴 위에 본문 텍스트를 직접 올리지 않는다(고채도 진동으로 가독성 저하).',
      '한 화면을 패턴으로 가득 채워 정보 밀도 높은 면(표/폼)까지 왜곡하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 레드(#B3122B)와 핑크(#F2A6B8)는 적록색맹·저시력에서 구분이 어려우므로 명도 차를 확보하고, 패턴 위 텍스트는 잉크(#1A0A0E)/화이트만 사용한다.',
      '⚠ 패턴 위 텍스트는 WCAG AA 미달 위험이 크므로, 본문은 솔리드 화이트 패널로 분리해 4.5:1 이상 대비를 확보한다.',
      '⚠ 흐르는 왜곡 모션은 prefers-reduced-motion: reduce에서 정적 패턴으로 폴백한다(발작·멀미 위험 회피).',
      'SVG feDisplacementMap 필터 미지원 환경에서는 사전 왜곡 이미지 또는 직선 체크 패턴으로 폴백한다.',
      '포커스 링은 패턴과 구분되는 솔리드 레드(#B3122B) 아웃라인으로 표시한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '굵은 라운드 그로테스크 산세리프(Y2K/레트로 감성)로 헤드라인을 세우고, 본문도 동일 패밀리의 가벼운 웨이트로 통일한다.',
    requiredFonts: ['Fredoka', 'Clash Display', 'General Sans'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'WarpedCheckerboard_01: 규칙적 체크/깅엄 격자를 파도처럼 액화·물결 왜곡시킨 단일 디스토션 — 직교 그리드가 유체로 휘어지는 변형 기법이 곧 시각 문법. 딥 레드/베이비 핑크 2색, 텍스트는 솔리드 패널로 분리.',
  components: {
    Button: {
      description: '솔리드 레드 알약형 버튼(패턴과 충돌 방지). hover에서 진해지고 press 시 살짝 가라앉는다.',
      specs: ['모서리: pill(9999px)', '채움: 솔리드 레드 primary', '그림자: 없음(플랫)', 'active: translateY/scale 미세 press', 'focus-visible: 솔리드 레드 outline'],
    },
    Card: {
      description: '왜곡 체크 배경 위에 올리는 솔리드 화이트 패널. 그림자 거의 없는 플랫 면 + 핑크 보더로 패턴과 콘텐츠를 분리한다.',
      specs: ['모서리: radius xl(32px)', '면: 솔리드 화이트', '보더: 2px 핑크', '그림자: 거의 없음(플랫)', 'hover: translateY(-2px) + 보더 레드 강조', 'reduce-motion: 변형 비활성'],
    },
    Tag: {
      description: '솔리드 fill 알약 라벨. accent=레드, muted=핑크 subtle, solid=잉크.',
      specs: ['모서리: pill(9999px)', '텍스트: letter-spacing 0.06em', '폰트: Fredoka', '색: red / pink-subtle / ink'],
    },
  },
  example: Showcase,
};

export const warpedCheckerboardWrappers = wrapperComponents;
export const WarpedCheckerboardShowcase = Showcase;

export const warpedCheckerboardStyleGuide: StyleGuide = {
  name: 'warped-checkerboard-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (레드×핑크)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (잉크 나이트)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'cobalt', label: '코발트 액센트', foundations: cobaltFoundations, extendedFoundations: cobaltExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { WarpedCheckerboardShowcase: Showcase },
  guidelines,
  visualMotif,
};
