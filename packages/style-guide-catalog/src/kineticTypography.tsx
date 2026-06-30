import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Kinetic_Typography_01 — 움직이는 · 커서 반응 타이포그래피 (타이포/편집, P2).
 *
 * 미니멀 단색 다크 배경 + 단일 강조색(electric orange). 초대형 볼드 헤드라인이
 * 능동 인터랙션 포인트가 된다. 모서리는 거의 각짐(0~4px), 그림자 없음. hover에서
 * letter-spacing·font-weight가 변하는 "kinetic" 감각. 단, 모션은 장식이 아니라
 * 의미라서 prefers-reduced-motion: reduce에서는 모든 transition/animation을 끄고
 * 정적 폴백으로 떨어진다.
 */

const BASE = '#0A0A0A';
const ELECTRIC = '#FF4D00';
const YELLOW = '#FFE600';
const FG = '#FAFAFA';

const foundations = makeFoundations({
  name: 'kinetic-typography-01',
  description: '움직이는/커서 반응 타이포그래피 + 미니멀 단색 배경 + 단일 강조색, 초대형 볼드 헤드라인',
  fontSans: "'Inter var', 'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '4px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: { none: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
  typeScale: {
    display: { fontSize: '120px', lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: 900 },
    h1: { fontSize: '56px', lineHeight: '0.96', letterSpacing: '-0.03em', fontWeight: 800 },
    h2: { fontSize: '36px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
    h3: { fontSize: '22px', lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.16em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: BASE,
    bgElevated: '#141414',
    bgSunken: '#1C1C1C',
    overlay: 'rgba(0,0,0,0.72)',
    fg: FG,
    fgMuted: '#A3A3A3',
    fgSubtle: '#6E6E6E',
    fgInverse: BASE,
    border: '#2A2A2A',
    borderMuted: '#1F1F1F',
    borderStrong: '#3A3A3A',
    focus: ELECTRIC,
    primaryBase: ELECTRIC,
    primaryHover: '#FF6A2B',
    primaryActive: '#E64400',
    primarySubtle: '#2A1408',
    primaryFg: '#0A0A0A',
    accent: ELECTRIC,
    accent2: YELLOW,
    accent3: '#A3A3A3',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-kinetic-duration': '600ms',
  '--bbangto-ext-kinetic-stagger': '60ms',
  '--bbangto-ext-marquee-speed': '12s',
  '--bbangto-ext-text-weight-range': '400 900',
};

const STYLE_ID = 'bbangto-kinetic-typography-motif';
const CSS = `
.bbangto-kinetic-btn {
  border-radius: 2px !important;
  box-shadow: none !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition:
    letter-spacing var(--bbangto-ext-kinetic-duration, 600ms) cubic-bezier(0.2, 0, 0, 1),
    font-weight var(--bbangto-ext-kinetic-duration, 600ms) cubic-bezier(0.2, 0, 0, 1),
    transform 200ms cubic-bezier(0.2, 0, 0, 1),
    background 160ms ease,
    color 160ms ease !important;
}
.bbangto-kinetic-btn:hover {
  letter-spacing: 0.18em;
  font-weight: 900 !important;
  transform: translateY(-1px);
}
.bbangto-kinetic-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-kinetic-accent, #FF4D00) !important;
  outline-offset: 3px;
}
.bbangto-kinetic-card {
  border-radius: 4px !important;
  box-shadow: none !important;
  border: 1px solid var(--bbangto-semantic-border-base, #2A2A2A) !important;
  transition: border-color 200ms ease, transform 200ms cubic-bezier(0.2, 0, 0, 1) !important;
}
.bbangto-kinetic-card:hover {
  border-color: var(--bbangto-semantic-border-strong, #3A3A3A) !important;
  transform: translateY(-1px);
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-kinetic-btn,
  .bbangto-kinetic-card {
    transition: none !important;
    animation: none !important;
  }
  .bbangto-kinetic-btn:hover {
    letter-spacing: 0.06em;
    font-weight: 700 !important;
    transform: none;
  }
  .bbangto-kinetic-card:hover { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-kinetic-btn',
  cardClass: 'bbangto-kinetic-card',
  displayPrefix: 'Kinetic',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.14em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      accent: { background: ELECTRIC, color: '#0A0A0A' },
      muted: { background: 'transparent', color: FG, border: '1px solid #3A3A3A' },
      solid: { background: YELLOW, color: '#0A0A0A' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'KINETIC 01',
  title: '글자가 먼저 움직인다',
  tagline: '커서를 따라 자라는 타이포그래피',
  body: '단색 배경 위에 초대형 볼드 헤드라인 하나. 커서가 닿으면 자간과 굵기가 살아나며 텍스트 자체가 버튼이 된다. 모션을 끄면 같은 위계가 정적으로 남는다.',
  ctaPrimary: '재생',
  ctaSecondary: '정지',
  bandTitle: '움직임은 장식이 아니라 위계다 — 끄면 정적으로 읽힌다.',
  items: [
    { name: 'Motion', tone: 'accent', tag: 'KINETIC', desc: 'hover에서 자간·굵기가 늘어나며 강조를 만든다.' },
    { name: 'Static', tone: 'muted', tag: 'FALLBACK', desc: 'prefers-reduced-motion에서 모든 모션을 끄고 정적 위계로 떨어진다.' },
    { name: 'Accent', tone: 'solid', tag: 'SIGNAL', desc: '단 하나의 일렉트릭 색을 신호로만 절제해 쓴다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'KineticShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 정렬',
    dos: ['단색 배경 위에 초대형 볼드 헤드라인 한 개를 주인공으로 둔다.', '모서리는 0~4px로 각지게, 그림자 없이 평면을 유지한다.', '강조색은 단 하나의 신호로만 절제해 쓴다.'],
    donts: ['그림자/그라디언트/둥근 모서리를 도입하지 않는다.', '여러 강조색을 동시에 남발하지 않는다.', '본문 텍스트 전체에 무한 모션을 깔지 않는다(헤드라인 인터랙션에만).'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      'prefers-reduced-motion: reduce 정적 폴백을 반드시 제공한다 — 모든 transition/animation을 끄고 같은 위계를 정적으로 유지한다.',
      'variable font 미지원 환경을 위해 일반 weight 폰트 폴백을 보장한다.',
      '빠른 깜빡임(fast flashing)을 만들지 않는다 — 초당 3회 이상 명멸 금지.',
      '강조는 색만이 아니라 굵기·자간 변화로도 보강한다.',
      'transform/letter-spacing transition으로 표현하고, 래퍼에 무한 animation을 걸지 않는다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: 'variable font(Inter var 계열) 본문·헤드라인, 라벨·수치 JetBrains Mono. weight 축은 400~900 범위를 인터랙션에 사용한다.',
    requiredFonts: ['Inter var', 'JetBrains Mono'],
    variableFont: true,
  },
};

const visualMotif: VisualMotif = {
  summary: 'Kinetic_Typography_01: 미니멀 단색 다크 배경 + 단일 일렉트릭 강조색 + 초대형 볼드 헤드라인. 텍스트가 능동 인터랙션 포인트로, hover에서 자간·굵기가 살아난다. radius 0~4px·무그림자. prefers-reduced-motion: reduce에서 정적 폴백.',
  components: {
    Button: {
      description: '각진 대문자 버튼. hover에서 자간이 넓어지고 굵기가 900까지 차오르는 kinetic 감각.',
      specs: ['모서리: radius 2px', '그림자: 없음', '텍스트: 대문자 letter-spacing 0.06em→0.18em', 'hover: font-weight 700→900 + translateY(-1px)', 'reduced-motion: 정적 폴백(transition 제거)'],
    },
    Card: {
      description: '1px 보더만으로 경계를 만드는 미니멀 평면. hover에서 테두리가 또렷해진다.',
      specs: ['모서리: radius 4px', '그림자: 없음', '보더: 1px 실선', 'hover: border-color 강조 + translateY(-1px)', 'reduced-motion: 정적 폴백'],
    },
    Tag: {
      description: '각진 모노스페이스 대문자 라벨. accent=일렉트릭, muted=보더, solid=옐로.',
      specs: ['모서리: radius 2px', '텍스트: 대문자 letter-spacing 0.14em', '폰트: JetBrains Mono', '색: electric/outline/yellow'],
    },
  },
  example: Showcase,
};

export const kineticTypographyWrappers = wrapperComponents;
export const KineticShowcase = Showcase;

export const kineticTypographyStyleGuide: StyleGuide = {
  name: 'kinetic-typography-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { KineticShowcase: Showcase },
  guidelines,
  visualMotif,
};
