import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Bento_Modular_01 — 도시락(bento)형 모듈 그리드 미학.
 *
 * 중립적 밝은 배경 + 1~2개 액센트(인디고/틸), 산세리프, 큰 radius(lg, 도시락 셀),
 * soft elevation 그림자. 시그니처는 비대칭·균형 모듈 그리드 레이아웃이며,
 * wrapper Card는 둥근 "타일"(soft shadow + subtle border)로 표현한다.
 */

const FG = '#16181D';
const INDIGO = '#4F46E5';
const TEAL = '#0D9488';
const TILE_ELEVATION = '0 1px 2px rgba(16,24,40,0.06), 0 6px 16px rgba(16,24,40,0.08)';

const foundations = makeFoundations({
  name: 'bento-modular-01',
  description: '도시락형 모듈 그리드 + 둥근 타일 + soft elevation + 산세리프, 인디고/틸 액센트',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '18px', xl: '24px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(16,24,40,0.06)',
    md: '0 1px 2px rgba(16,24,40,0.06), 0 6px 16px rgba(16,24,40,0.08)',
    lg: '0 2px 4px rgba(16,24,40,0.07), 0 12px 28px rgba(16,24,40,0.10)',
    xl: '0 4px 8px rgba(16,24,40,0.08), 0 24px 48px rgba(16,24,40,0.14)',
  },
  typeScale: {
    display: { fontSize: '68px', lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '40px', lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: 700 },
    h2: { fontSize: '28px', lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#F7F8FA',
    bgElevated: '#FFFFFF',
    bgSunken: '#EEF0F3',
    overlay: 'rgba(16,24,40,0.50)',
    fg: FG,
    fgMuted: '#4A4E58',
    fgSubtle: '#7A7F8A',
    fgInverse: '#FFFFFF',
    border: '#E2E5EA',
    borderMuted: '#EEF0F3',
    borderStrong: '#CDD2DA',
    focus: INDIGO,
    primaryBase: INDIGO,
    primaryHover: '#4338CA',
    primaryActive: '#3730A3',
    primarySubtle: '#EEF0FF',
    primaryFg: '#FFFFFF',
    accent: INDIGO,
    accent2: TEAL,
    accent3: '#7A7F8A',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-bento-gap': '16px',
  '--bbangto-ext-bento-radius': '18px',
  '--bbangto-ext-tile-elevation': TILE_ELEVATION,
};

const STYLE_ID = 'bbangto-bento-modular-motif';
const CSS = `
.bbangto-bento-card {
  border-radius: var(--bbangto-ext-bento-radius, 18px) !important;
  box-shadow: var(--bbangto-ext-tile-elevation, ${TILE_ELEVATION}) !important;
  border: 1px solid var(--bbangto-semantic-border-base, #E2E5EA) !important;
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0, 0, 0.2, 1) !important;
}
.bbangto-bento-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 2px 4px rgba(16,24,40,0.07), 0 12px 28px rgba(16,24,40,0.10) !important;
}
.bbangto-bento-btn {
  border-radius: 12px !important;
  background: var(--bbangto-semantic-primary-base, #4F46E5) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 600 !important;
  box-shadow: 0 1px 2px rgba(16,24,40,0.06) !important;
  transition: transform 120ms ease, background 120ms ease !important;
}
.bbangto-bento-btn:hover { background: var(--bbangto-semantic-primary-hover, #4338CA) !important; }
.bbangto-bento-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-bento-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-primary-base, #4F46E5) !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-bento-card { transition: none !important; }
  .bbangto-bento-card:hover { transform: none !important; }
  .bbangto-bento-btn { transition: none !important; }
  .bbangto-bento-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-bento-btn',
  cardClass: 'bbangto-bento-card',
  displayPrefix: 'Bento',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 999, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: '#EEF0FF', color: INDIGO },
      muted: { background: '#EEF0F3', color: '#4A4E58' },
      solid: { background: TEAL, color: '#fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'BENTO 01',
  title: '모듈로 정렬하는 대시보드',
  tagline: '비대칭이지만 균형 잡힌 도시락 그리드',
  body: '크고 작은 둥근 타일을 한 판에 담아 정보를 칸칸이 정리한다. 부드러운 그림자와 얇은 보더로 각 셀이 떠 있는 듯한 모듈 레이아웃을 만든다.',
  ctaPrimary: '보드 열기',
  ctaSecondary: '템플릿 보기',
  bandTitle: '한 화면에 담는 모듈, 흐트러지지 않는 균형.',
  items: [
    { name: '요약 타일', tone: 'accent', tag: 'OVERVIEW', desc: '핵심 지표를 큰 셀 하나에 모아 첫눈에 보여준다.' },
    { name: '활동 타일', tone: 'muted', tag: 'ACTIVITY', desc: '최근 변화를 작은 모듈로 나눠 시간순으로 쌓는다.' },
    { name: '액션 타일', tone: 'solid', tag: 'QUICK', desc: '자주 쓰는 동작을 둥근 버튼 타일로 묶어 둔다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'BentoShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '모듈 그리드 & 레이아웃',
    dos: [
      '크고 작은 타일을 섞어 비대칭이되 균형 잡힌 모듈 그리드를 구성한다.',
      '셀 간 간격은 --bbangto-ext-bento-gap(16px)로 일관되게 유지한다.',
      '모바일에서는 그리드를 단일 컬럼으로 reflow해 위에서 아래로 쌓는다.',
    ],
    donts: [
      '타일 크기를 무작위로 흩뜨려 시선 흐름을 깨뜨리지 않는다.',
      '좁은 화면에서 다컬럼 그리드를 그대로 욱여넣어 셀을 찌그러뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '타일 위 텍스트는 배경과 충분한 대비(본문 4.5:1 이상)를 유지한다.',
      '버튼/액션 타일 터치 타깃은 최소 44x44px를 확보한다.',
      'hover lift(translateY)는 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '산세리프(Inter/Pretendard) 본문, 라벨·수치는 JetBrains Mono로 보강한다.',
    requiredFonts: ['Inter', 'Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Bento_Modular_01: 도시락형 모듈 그리드 + 둥근 타일 + soft elevation + 산세리프. 인디고/틸 액센트, 비대칭·균형 레이아웃이 시그니처.',
  components: {
    Button: {
      description: '둥근 모서리(radius 12px) 인디고 채움 버튼. press 시 살짝 가라앉는다.',
      specs: ['모서리: radius 12px', '채움: 인디고 primary', '그림자: soft sm', 'active: translateY/scale 미세 press', 'focus-visible: 인디고 outline'],
    },
    Card: {
      description: '도시락 셀을 닮은 둥근 타일. soft elevation + 얇은 보더, hover에서 2px 떠오른다.',
      specs: ['모서리: radius 18px', '그림자: soft tile elevation', '보더: 1px subtle', 'hover: translateY(-2px) lift', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: '둥근 pill 라벨. accent=인디고 subtle, muted=중립, solid=틸.',
      specs: ['모서리: pill(999px)', '텍스트: letter-spacing 0.04em', '폰트: Inter', '색: indigo-subtle / neutral / teal'],
    },
  },
  example: Showcase,
};

export const bentoModularWrappers = wrapperComponents;
export const BentoShowcase = Showcase;

export const bentoModularStyleGuide: StyleGuide = {
  name: 'bento-modular-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { BentoShowcase: Showcase },
  guidelines,
  visualMotif,
};
