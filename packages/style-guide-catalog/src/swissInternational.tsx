import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Swiss_International_01 — 그리드 · 비대칭 정렬 · 산세리프 · 적/흑/백.
 *
 * 흑백 + 단일 빨강 강조, Helvetica류 산세리프, 각진 모서리(radius 0), 그림자 없음.
 * 위계는 크기·굵기·위치로만. 고대비라 접근성에 강하다.
 */

const INK = '#111111';
const RED = '#E2231A';

const foundations = makeFoundations({
  name: 'swiss-international-01',
  description: '그리드 + 비대칭 정렬 + 산세리프 + 적/흑/백, 각진 모서리·무그림자',
  fontSans: "'Helvetica Neue', Helvetica, Arial, 'Pretendard', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: { none: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
  typeScale: {
    display: { fontSize: '104px', lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: 700 },
    h1: { fontSize: '48px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
    h2: { fontSize: '32px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FFFFFF',
    bgElevated: '#FFFFFF',
    bgSunken: '#F2F2F2',
    overlay: 'rgba(0,0,0,0.60)',
    fg: INK,
    fgMuted: '#3D3D3D',
    fgSubtle: '#6E6E6E',
    fgInverse: '#FFFFFF',
    border: INK,
    borderMuted: '#CFCFCF',
    borderStrong: INK,
    focus: RED,
    primaryBase: INK,
    primaryHover: '#000000',
    primaryActive: '#000000',
    primarySubtle: RED,
    primaryFg: '#FFFFFF',
    accent: RED,
    accent2: INK,
    accent3: '#6E6E6E',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-rule': INK,
  '--bbangto-ext-accent-red': RED,
  '--bbangto-ext-grid-gap': '16px',
};

/* 색 스킴 변형(tweak) — 그리드/각진 모서리/무그림자 모티프는 base에서 상속. */

const DARK_INK = '#FFFFFF';
const darkFoundations = makeColorway(foundations, {
  name: 'swiss-international-01-dark',
  description: '반전 — 검정 배경 + 흰 규칙선 + 단일 빨강',
  semantic: makeSemantic({
    bg: '#0A0A0A', bgElevated: '#141414', bgSunken: '#000000', overlay: 'rgba(0,0,0,0.70)',
    fg: '#FFFFFF', fgMuted: '#C4C4C4', fgSubtle: '#8A8A8A', fgInverse: '#0A0A0A',
    border: DARK_INK, borderMuted: '#3A3A3A', borderStrong: DARK_INK, focus: RED,
    primaryBase: DARK_INK, primaryHover: '#F0F0F0', primaryActive: '#E0E0E0',
    primarySubtle: RED, primaryFg: '#0A0A0A',
    accent: RED, accent2: DARK_INK, accent3: '#8A8A8A',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-rule': DARK_INK,
  '--bbangto-ext-accent-red': RED,
  '--bbangto-ext-grid-gap': '16px',
};

const BLUE = '#0057B8';
const blueFoundations = makeColorway(foundations, {
  name: 'swiss-international-01-blue',
  description: '흑/백 유지, 강조를 단일 빨강 대신 단일 파랑으로',
  semantic: makeSemantic({
    bg: '#FFFFFF', bgElevated: '#FFFFFF', bgSunken: '#F2F2F2', overlay: 'rgba(0,0,0,0.60)',
    fg: INK, fgMuted: '#3D3D3D', fgSubtle: '#6E6E6E', fgInverse: '#FFFFFF',
    border: INK, borderMuted: '#CFCFCF', borderStrong: INK, focus: BLUE,
    primaryBase: INK, primaryHover: '#000000', primaryActive: '#000000',
    primarySubtle: BLUE, primaryFg: '#FFFFFF',
    accent: BLUE, accent2: INK, accent3: '#6E6E6E',
  }),
});
const blueExt: Record<string, string> = {
  '--bbangto-ext-rule': INK,
  '--bbangto-ext-accent-red': BLUE,
  '--bbangto-ext-grid-gap': '16px',
};

const STYLE_ID = 'bbangto-swiss-international-motif';
const CSS = `
.bbangto-swiss-btn {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 1.5px solid var(--bbangto-ext-rule, #111111) !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em;
  transition: background 120ms ease, color 120ms ease !important;
}
.bbangto-swiss-btn:hover { background: var(--bbangto-ext-accent-red, #E2231A) !important; color: #fff !important; border-color: var(--bbangto-ext-accent-red, #E2231A) !important; }
.bbangto-swiss-btn:focus-visible { outline: 2px solid var(--bbangto-ext-accent-red, #E2231A) !important; outline-offset: 2px; }
.bbangto-swiss-card {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 1.5px solid var(--bbangto-ext-rule, #111111) !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-swiss-btn { transition: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-swiss-btn',
  cardClass: 'bbangto-swiss-card',
  displayPrefix: 'Swiss',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.10em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #E2231A)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-base, #fff)',
        color: 'var(--bbangto-semantic-foreground-base, #111111)',
        border: '1.5px solid var(--bbangto-semantic-border-base, #111111)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #111111)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'GRID 01',
  title: '그리드가 곧 디자인이다',
  tagline: '크기 · 굵기 · 위치로 만드는 위계',
  body: '장식을 걷어내고 모듈러 그리드, 비대칭 정렬, 단 하나의 빨강으로 정보를 조직한다. 그림자도 둥근 모서리도 없다.',
  ctaPrimary: '읽기',
  ctaSecondary: '인덱스',
  bandTitle: '형태는 기능을 따른다 — 정직한 정보 구조.',
  items: [
    { name: 'Grid', tone: 'accent', tag: 'SYSTEM', desc: '모듈러 그리드와 헤어라인 규칙선으로 정렬한다.' },
    { name: 'Type', tone: 'muted', tag: 'SANS', desc: '산세리프 위계만으로 강약을 만든다.' },
    { name: 'Red', tone: 'solid', tag: 'ACCENT', desc: '단 하나의 빨강을 강조에만 절제해 쓴다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'SwissShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '그리드 & 정렬',
    dos: ['모듈러 그리드와 좌측/비대칭 정렬을 일관되게 쓴다.', '위계는 크기·굵기·위치로만 만든다.'],
    donts: ['그림자/둥근 모서리/그라디언트를 도입하지 않는다.', '빨강을 강조 외 용도로 남용하지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: ['흑백 고대비를 유지한다(우수).', 'focus-visible는 빨강 outline으로 표시한다.', '빨강 강조는 색만이 아니라 위치/굵기로도 보강한다.'],
  },
  typography: {
    title: '타이포그래피',
    rule: '산세리프(Helvetica/Arial 계열) 본문, 라벨·수치 JetBrains Mono.',
    requiredFonts: ['Helvetica Neue', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Swiss_International_01: 모듈러 그리드 + 비대칭 정렬 + 산세리프, 흑/백 + 단일 빨강, 각진 모서리·무그림자. 위계는 크기·굵기·위치로만.',
  components: {
    Button: {
      description: '각진 1.5px 보더 버튼. hover에서 빨강으로 반전되어 강조를 만든다.',
      specs: ['모서리: radius 0', '그림자: 없음', '보더: 1.5px 잉크 실선', 'hover: 빨강 배경 반전', 'focus-visible: 빨강 outline'],
    },
    Card: {
      description: '잉크 실선 테두리만으로 경계를 만드는 평면 표면.',
      specs: ['모서리: radius 0', '그림자: 없음', '보더: 1.5px 잉크 실선', '배경: 흰색'],
    },
    Tag: {
      description: '각진 대문자 라벨. accent=빨강, muted=보더, solid=잉크.',
      specs: ['모서리: radius 0', '텍스트: 대문자 letter-spacing 0.10em', '폰트: JetBrains Mono', '색: red/ink/white'],
    },
  },
  example: Showcase,
};

export const SwissShowcase = Showcase;
export const swissInternationalWrappers = wrapperComponents;

export const swissInternationalStyleGuide: StyleGuide = {
  name: 'swiss-international-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (Red)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (Invert)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'blue', label: '블루 액센트', foundations: blueFoundations, extendedFoundations: blueExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { SwissShowcase: Showcase },
  guidelines,
  visualMotif,
};
