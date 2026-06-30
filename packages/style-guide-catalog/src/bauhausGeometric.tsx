import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Bauhaus_Geometric_01 — 바우하우스 기하 구성.
 *
 * 3원색(빨/노/파) + 흑백, 기하 산세리프, radius none을 기본으로 하되
 * 의도적인 원형 요소로 대비를 준다. 면 분할과 기하 블록으로 구성한다.
 * 원색 대비가 강하므로 텍스트·포커스 대비를 별도로 확보한다.
 */

const RED = '#E63946';
const YELLOW = '#FFCA3A';
const BLUE = '#1D3557';
const INK = '#1A1A1A';
const PAPER = '#F4F1EA';

const foundations = makeFoundations({
  name: 'bauhaus-geometric-01',
  description: '바우하우스 기하 구성 — 3원색(빨·노·파) + 흑백, 기하 산세리프, 면 분할·원형 장식',
  fontSans: "'Futura', 'Century Gothic', system-ui, sans-serif",
  fontMono: "'Futura', 'Century Gothic', ui-monospace, monospace",
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '2px 2px 0 #1A1A1A',
    md: '4px 4px 0 #1A1A1A',
    lg: '6px 6px 0 #1A1A1A',
    xl: '8px 8px 0 #1A1A1A',
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: '#FFFFFF',
    bgSunken: '#E7E2D6',
    overlay: 'rgba(26,26,26,0.55)',
    fg: INK,
    fgMuted: '#3D3D3D',
    fgSubtle: '#6B6B6B',
    fgInverse: '#FFFFFF',
    border: INK,
    borderMuted: 'rgba(26,26,26,0.30)',
    borderStrong: '#000000',
    focus: BLUE,
    primaryBase: BLUE,
    primaryHover: '#16283F',
    primaryActive: '#101D2E',
    primarySubtle: 'rgba(29,53,87,0.14)',
    primaryFg: '#FFFFFF',
    accent: RED,
    accent2: YELLOW,
    accent3: BLUE,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-shape-circle': RED,
  '--bbangto-ext-shape-triangle': YELLOW,
  '--bbangto-ext-shape-square': BLUE,
  '--bbangto-ext-grid-line': INK,
  '--bbangto-ext-block-divide': '4px',
};

const STYLE_ID = 'bbangto-bauhaus-geometric-01-motif';
const CSS = `
.bbangto-bau-btn {
  position: relative;
  background: var(--bbangto-ext-shape-square, #1D3557) !important;
  color: #fff !important;
  border: 3px solid var(--bbangto-ext-grid-line, #1A1A1A) !important;
  border-radius: 0 !important;
  font-family: 'Futura', 'Century Gothic', system-ui, sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  box-shadow: var(--bbangto-shadow-sm, 2px 2px 0 #1A1A1A) !important;
  transition: transform 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-bau-btn::after {
  content: '';
  position: absolute;
  top: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  background: var(--bbangto-ext-shape-circle, #E63946);
  border: 3px solid var(--bbangto-ext-grid-line, #1A1A1A);
  border-radius: 9999px;
  pointer-events: none;
}
.bbangto-bau-btn:hover { transform: translate(-2px,-2px); box-shadow: var(--bbangto-shadow-md, 4px 4px 0 #1A1A1A) !important; }
.bbangto-bau-btn:active { transform: translate(0,0); box-shadow: var(--bbangto-shadow-sm, 2px 2px 0 #1A1A1A) !important; }
.bbangto-bau-btn:focus-visible { outline: 3px solid var(--bbangto-ext-shape-circle, #E63946) !important; outline-offset: 3px; }
.bbangto-bau-card {
  position: relative;
  background: var(--bbangto-semantic-background-elevated, #fff) !important;
  border: 3px solid var(--bbangto-ext-grid-line, #1A1A1A) !important;
  border-radius: 0 !important;
  box-shadow: var(--bbangto-shadow-md, 4px 4px 0 #1A1A1A) !important;
  overflow: hidden;
}
.bbangto-bau-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--bbangto-ext-block-divide, 4px);
  background: linear-gradient(90deg,
    var(--bbangto-ext-shape-circle, #E63946) 0 33.33%,
    var(--bbangto-ext-shape-triangle, #FFCA3A) 33.33% 66.66%,
    var(--bbangto-ext-shape-square, #1D3557) 66.66% 100%);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-bau-btn { transition: none !important; }
  .bbangto-bau-btn:hover, .bbangto-bau-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-bau-btn',
  cardClass: 'bbangto-bau-card',
  displayPrefix: 'Bauhaus',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 0, fontFamily: "'Futura', 'Century Gothic', system-ui, sans-serif",
      fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1.6,
      textTransform: 'uppercase', whiteSpace: 'nowrap', border: '2px solid #1A1A1A',
    },
    tones: {
      accent: { background: RED, color: '#FFFFFF' },
      muted: { background: PAPER, color: INK },
      solid: { background: BLUE, color: '#FFFFFF' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'BAUHAUS GRID',
  title: '기하로 조립한 화면',
  tagline: '원·삼각·사각이 만드는 질서',
  body: '빨·노·파 3원색과 흑백, 면 분할과 굵은 윤곽선으로 구성을 만든다. 직각 면 위에 의도된 원형 장식을 얹어 긴장감을 준다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '구성 보기',
  bandTitle: '기하 구성으로 짜인 인터페이스, 지금 살펴보세요.',
  items: [
    { name: 'Circle', tone: 'accent', tag: 'SHAPE', desc: '직각 면 위에 얹은 원형으로 초점을 만든다.' },
    { name: 'Grid', tone: 'muted', tag: 'LAYOUT', desc: '면 분할과 굵은 윤곽선으로 격자 질서를 세운다.' },
    { name: 'Primary', tone: 'solid', tag: 'COLOR', desc: '빨·노·파 원색 블록으로 위계를 나눈다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'BauhausShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 구성',
    dos: ['직각 면 + 굵은 윤곽선으로 기하 블록을 만든다.', '원·삼각·사각 장식은 면 위에 의도적으로 배치한다.'],
    donts: ['둥근 모서리를 남발하지 않는다(원형은 의도된 장식만).', '도형 장식이 본문 가독성을 가리지 않게 한다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '원색 대비가 강하므로 텍스트는 흑/백으로 충분한 대비를 확보한다.',
      'focus-visible에 3px 원색 outline + offset을 둔다.',
      'prefers-reduced-motion에서 hover transform을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '기하 산세리프(Futura/Century Gothic). 라벨·수치는 대문자 + 넓은 자간.',
    requiredFonts: ['Futura', 'Century Gothic'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Bauhaus_Geometric_01: 종이 캔버스 위 3원색(빨·노·파)+흑백, 기하 산세리프, 직각 면 분할과 굵은 윤곽선, 의도된 원형 장식.',
  components: {
    Button: {
      description: '직각 원색 블록 버튼. 굵은 윤곽선과 하드 그림자, 모서리에 얹힌 원형 장식이 시그니처다.',
      specs: ['배경: 파랑 면 블록', '보더: 3px 흑색 윤곽선', '모서리: radius none(0)', '장식: 우상단 원형 도트', 'focus-visible: 3px 빨강 outline'],
    },
    Card: {
      description: '카드 상단에 빨·노·파 3분할 띠를 두른 종이 면. 직각 윤곽선과 하드 그림자로 구성한다.',
      specs: ['배경: 흰 종이 면', '보더: 3px 흑색 윤곽선', '상단: 3원색 분할 띠', '그림자: 하드(4px 오프셋 흑색)'],
    },
    Tag: {
      description: '직각 라벨 배지. tone별 원색 블록 + 흑색 보더로 분류를 표시한다.',
      specs: ['배경: tone별 원색(accent 빨강 / muted 종이 / solid 파랑)', '모서리: 직각(0)', '폰트: 기하 산세리프 대문자', '보더: 2px 흑색'],
    },
  },
  example: Showcase,
};

export const BauhausShowcase = Showcase;
export const bauhausGeometricWrappers = wrapperComponents;

export const bauhausGeometricStyleGuide: StyleGuide = {
  name: 'bauhaus-geometric-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { BauhausShowcase: Showcase },
  guidelines,
  visualMotif,
};
