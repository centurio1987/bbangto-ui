import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Blueprint_Technical_01 — 엔지니어링 청사진 제도(製圖) 미학.
 *
 * 딥 블루 청사진 보드 위, 채움 없는 1px 화이트/크림 라인 드로잉.
 * 화살촉 치수선·번호 콜아웃 라벨·아이소메트릭 투상으로 구성한 도면.
 * 8px 모눈에 강하게 정렬, 그림자 없음 — 깊이는 1px 라인으로만 표현.
 * 액센트는 패턴 라벨용 주홍·옐로 1색씩만 허용한다.
 */

const BOARD = '#0B3D91';
const INK = '#F5F8FF';
const VERMILION = '#F2683C';
const AMBER = '#FBBF24';
const GRID_LINE = 'rgba(255,255,255,0.12)';

const foundations = makeFoundations({
  name: 'blueprint-technical-01',
  description: '청사진 제도 미감 — 딥 블루 보드 + 8px 모눈 + 1px 화이트 라인 드로잉, 화살촉 치수선·번호 콜아웃, 그림자 없음',
  fontSans: "'Oswald', 'Archivo Narrow', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '3px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: { none: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
  typeScale: {
    display: { fontSize: '60px', lineHeight: '1.06', letterSpacing: '0.04em', fontWeight: 700 },
    h1: { fontSize: '38px', lineHeight: '1.12', letterSpacing: '0.05em', fontWeight: 700 },
    h2: { fontSize: '26px', lineHeight: '1.2', letterSpacing: '0.06em', fontWeight: 600 },
    meta: { fontSize: '11px', lineHeight: '1.5', letterSpacing: '0.16em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: BOARD,
    bgElevated: '#103A86',
    bgSunken: '#082E6E',
    overlay: 'rgba(7,25,60,0.62)',
    fg: INK,
    fgMuted: '#C7D4EE',
    fgSubtle: '#93A6CC',
    fgInverse: BOARD,
    border: '#2E55A8',
    borderMuted: '#1E3A8A',
    borderStrong: '#5C7FC0',
    focus: AMBER,
    primaryBase: INK,
    primaryHover: '#FFFFFF',
    primaryActive: '#D9E2F5',
    primarySubtle: 'rgba(245,248,255,0.10)',
    primaryFg: BOARD,
    accent: VERMILION,
    accent2: AMBER,
    accent3: '#93A6CC',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-blueprint-bg': BOARD,
  '--bbangto-ext-grid-line': GRID_LINE,
  '--bbangto-ext-grid-size': '8px',
  '--bbangto-ext-draft-stroke': '1px',
  '--bbangto-ext-draft-ink': INK,
  '--bbangto-ext-dim-line': AMBER,
  '--bbangto-ext-callout': VERMILION,
  '--bbangto-ext-iso-skew': '30deg',
};

const STYLE_ID = 'bbangto-blueprint-technical-motif';
const CSS = `
.bbangto-blueprint-technical-card {
  position: relative !important;
  border-radius: 4px !important;
  border: var(--bbangto-ext-draft-stroke, 1px) solid var(--bbangto-ext-draft-ink, ${INK}) !important;
  box-shadow: none !important;
  background-color: var(--bbangto-semantic-bg-elevated, #103A86) !important;
  background-image:
    linear-gradient(var(--bbangto-ext-grid-line, ${GRID_LINE}) 1px, transparent 1px),
    linear-gradient(90deg, var(--bbangto-ext-grid-line, ${GRID_LINE}) 1px, transparent 1px) !important;
  background-size: var(--bbangto-ext-grid-size, 8px) var(--bbangto-ext-grid-size, 8px) !important;
  transition: border-color 160ms linear !important;
}
.bbangto-blueprint-technical-card:hover {
  border-color: var(--bbangto-ext-dim-line, ${AMBER}) !important;
}
.bbangto-blueprint-technical-btn {
  border-radius: 2px !important;
  background: transparent !important;
  color: var(--bbangto-semantic-primary-base, ${INK}) !important;
  border: 1px solid var(--bbangto-semantic-primary-base, ${INK}) !important;
  font-family: 'Oswald', 'Archivo Narrow', system-ui, sans-serif !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.12em !important;
  box-shadow: none !important;
  transition: background 120ms linear, color 120ms linear !important;
}
.bbangto-blueprint-technical-btn:hover {
  background: var(--bbangto-semantic-primary-subtle, rgba(245,248,255,0.10)) !important;
}
.bbangto-blueprint-technical-btn:active {
  background: var(--bbangto-semantic-primary-base, ${INK}) !important;
  color: var(--bbangto-semantic-primary-foreground, ${BOARD}) !important;
}
.bbangto-blueprint-technical-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-focus, ${AMBER}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-blueprint-technical-card { transition: none !important; }
  .bbangto-blueprint-technical-card:hover { transform: none !important; }
  .bbangto-blueprint-technical-btn { transition: none !important; }
  .bbangto-blueprint-technical-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-blueprint-technical-btn',
  cardClass: 'bbangto-blueprint-technical-card',
  displayPrefix: 'BlueprintTechnical',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 2, fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.14em', lineHeight: 1.5, whiteSpace: 'nowrap',
      textTransform: 'uppercase', border: `1px solid ${INK}`,
    },
    tones: {
      accent: { background: 'transparent', color: AMBER, borderColor: AMBER },
      muted: { background: 'transparent', color: '#C7D4EE', borderColor: '#2E55A8' },
      solid: { background: VERMILION, color: '#FFFFFF', borderColor: VERMILION },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'DWG-01 / REV.A',
  title: '도면으로 읽는 시스템',
  tagline: '모눈 위에 정렬한 1px 라인 드로잉',
  body: '청사진 보드 위에 채움 없는 라인으로 구조를 도해한다. 화살촉 치수선과 번호 콜아웃이 각 부품을 가리키고, 8px 모눈이 모든 요소를 정확히 정렬한다. 그림자 대신 선의 두께와 투상으로 깊이를 만든다.',
  ctaPrimary: '도면 열기',
  ctaSecondary: '부품표 보기',
  bandTitle: '선 하나로 정의하는 구조, 모눈으로 보장하는 정밀.',
  items: [
    { name: '아이소메트릭 분해도', tone: 'accent', tag: 'FIG-01', desc: '제품을 30° 투상으로 분해해 부품 관계를 도해한다.' },
    { name: '치수 주석 패널', tone: 'muted', tag: 'DIM-02', desc: '화살촉 치수선과 리더선으로 규격을 정확히 표기한다.' },
    { name: '부품 콜아웃 표', tone: 'solid', tag: 'BOM-03', desc: '번호 콜아웃과 텍스트 라벨로 부품 목록을 정리한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'BlueprintTechnicalShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '모눈 정렬 & 도면 레이아웃',
    dos: [
      '모든 요소를 8px 모눈(--bbangto-ext-grid-size)에 정확히 스냅해 정렬한다.',
      '치수선·콜아웃·모눈을 실제 정렬 가이드로 일관되게 사용한다.',
      '라인 두께는 1px(--bbangto-ext-draft-stroke) 한 두께로 유지한다.',
      '라벨·번호·치수는 모노/대문자에 넓은 자간으로 표기한다.',
    ],
    donts: [
      '그림자·그라디언트·채움 도형을 남발해 평면 라인 미감을 훼손하지 않는다.',
      '의미 없는 장식용 치수선을 무작위로 흩뿌리지 않는다.',
      '풀컬러 사진이나 부드러운 elevation으로 도면 언어를 깨뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '딥 블루 보드 위 본문 텍스트는 화이트(#F5F8FF)로 대비 4.5:1 이상을 확보한다.',
      '저대비 모눈은 장식이므로 aria-hidden 처리하고 정보 전달에 쓰지 않는다.',
      '1px hairline은 포커스·핵심 정보 전달에 단독 사용하지 않는다(2px 또는 고대비 보강).',
      '콜아웃은 색만이 아니라 번호·텍스트 라벨을 병기해 의미를 전달한다.',
      '호버 시 라인 색 전환은 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '좁은 기하 산세리프(Oswald/Archivo Narrow) 대문자 라벨 + 모노(JetBrains Mono/IBM Plex Mono) 도면 숫자.',
    requiredFonts: ['Oswald', 'Archivo Narrow', 'JetBrains Mono', 'IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Blueprint_Technical_01: 딥 블루 청사진 보드 + 8px 모눈 위 채움 없는 1px 화이트 라인 드로잉. 화살촉 치수선·번호 콜아웃 라벨·아이소메트릭 투상으로 구성한 엔지니어링 제도 도면. 그림자 없이 선으로만 깊이를 표현하고, 주홍·옐로 액센트를 라벨에만 1색씩 쓴다.',
  components: {
    Button: {
      description: '채움 없는 1px 아웃라인 버튼. 대문자 라벨, active 시 잉크로 반전 채움.',
      specs: ['모서리: radius 2px(거의 각짐)', '채움: 없음(transparent)', '보더: 1px 드래프트 잉크', 'active: 잉크 반전 채움', 'focus-visible: 앰버 outline'],
    },
    Card: {
      description: '8px 모눈 배경 + 1px 외곽선 도면 프레임. 그림자 없음, hover에서 치수선 앰버로 라인 강조.',
      specs: ['모서리: radius 4px', '배경: 8px 모눈 그리드', '보더: 1px 드래프트 잉크', '그림자: 없음', 'hover: 외곽선 앰버 전환', 'reduce-motion: 전환 비활성'],
    },
    Tag: {
      description: '치수선/콜아웃 스타일 라벨. accent=앰버 아웃라인, muted=블루 라인, solid=주홍 채움.',
      specs: ['모서리: radius 2px', '폰트: JetBrains Mono 대문자', '자간: 0.14em', '색: amber-outline / blue-line / vermilion-solid'],
    },
  },
  example: Showcase,
};

export const blueprintTechnicalWrappers = wrapperComponents;
export const BlueprintTechnicalShowcase = Showcase;

export const blueprintTechnicalStyleGuide: StyleGuide = {
  name: 'blueprint-technical-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { BlueprintTechnicalShowcase: Showcase },
  guidelines,
  visualMotif,
};
