import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Organic_Fluid_Blob_01 — 바이오모픽 유체 블롭/리본 미학.
 *
 * 밝은 단색 배경 위로 비비드~파스텔 다색 유체 그라디언트(시안·마젠타·라임·코랄)가
 * 흐르고, 둥근 지오메트릭 산세리프와 비정형 곡률(블롭)·알약 곡선이 형태 언어가 된다.
 * shadow는 거의 쓰지 않고(평면적·매끈) 그라디언트 색면이 깊이를 대신한다.
 * 시그니처는 hover 시 블롭 모핑(border-radius 변형)이며, 본문 텍스트는 그라디언트
 * 색면이 아니라 솔리드 영역(솔리드 카드 인테리어 + 그라디언트 링)에만 얹는다.
 */

const FG = '#1A1430';
const MAGENTA = '#DB2777';
const CYAN = '#06B6D4';
const LIME = '#84CC16';
const CORAL = '#FB7185';
const BLOB_GRADIENT = `linear-gradient(135deg, ${CYAN} 0%, ${MAGENTA} 52%, ${CORAL} 100%)`;

const foundations = makeFoundations({
  name: 'organic-fluid-blob-01',
  description:
    '유체 블롭·리본 곡선 + 다색 그라디언트 색면 + 둥근 지오메트릭 산세리프 + 평면적(그림자 최소), 마젠타/시안/라임/코랄 다색 액센트',
  fontSans: "'Poppins', 'Quicksand', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '14px', md: '22px', lg: '32px', xl: '48px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(26,20,48,0.05)',
    md: '0 8px 30px rgba(219,39,119,0.10)',
    lg: '0 16px 50px rgba(6,182,212,0.14)',
    xl: '0 24px 70px rgba(219,39,119,0.18)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '44px', lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: 600 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FBFAFF',
    bgElevated: '#FFFFFF',
    bgSunken: '#F2EEFB',
    overlay: 'rgba(20,16,40,0.55)',
    fg: FG,
    fgMuted: '#4A4565',
    fgSubtle: '#7A7595',
    fgInverse: '#FFFFFF',
    border: '#E8E2F5',
    borderMuted: '#F2EEFB',
    borderStrong: '#D6CCEC',
    focus: MAGENTA,
    primaryBase: MAGENTA,
    primaryHover: '#BE185D',
    primaryActive: '#9D174D',
    primarySubtle: '#FCE7F3',
    primaryFg: '#FFFFFF',
    accent: CYAN,
    accent2: LIME,
    accent3: CORAL,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-blob-path': "path('M0,80 C0,30 40,0 92,0 C150,0 200,28 200,82 C200,140 150,160 96,160 C42,160 0,134 0,80 Z')",
  '--bbangto-ext-blob-gradient': BLOB_GRADIENT,
  '--bbangto-ext-ribbon-curve': "path('M0,40 C100,0 220,80 360,30 C440,2 520,60 600,30')",
  '--bbangto-ext-morph-duration': '600ms',
  '--bbangto-ext-squircle': '46% 54% 52% 48% / 56% 48% 52% 44%',
};

/*
 * 색 스킴 변형(색 스킴 기호선택) — 블롭·리본 모티프(래퍼 CSS·shape·morph)는
 * base에서 상속하고 semantic 색 + 유체 그라디언트 색면만 교체한다.
 * shape/path/duration/squircle은 색이 아니므로 각 preset에서 동일하게 유지한다.
 */

// 다크 — 잉크빛 자수정 바탕 위 네온 유체(비비드 시안·핑크·코랄) 그라디언트.
const darkFoundations = makeColorway(foundations, {
  name: 'organic-fluid-blob-01-dark',
  description: '잉크빛 자수정 다크 바탕 + 네온 시안/핑크/코랄 유체 그라디언트',
  semantic: makeSemantic({
    bg: '#14101F', bgElevated: '#1E1830', bgSunken: '#0D0A16', overlay: 'rgba(10,8,20,0.62)',
    fg: '#F5F1FF', fgMuted: '#C4BCE0', fgSubtle: '#948CB5', fgInverse: '#14101F',
    border: '#33294D', borderMuted: '#241C38', borderStrong: '#4A3D6B', focus: '#F472B6',
    primaryBase: '#F472B6', primaryHover: '#F9A8D4', primaryActive: '#FBCFE5',
    primarySubtle: '#3B1F35', primaryFg: '#2A0A1A',
    accent: '#22D3EE', accent2: '#A3E635', accent3: '#FB7185',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-blob-path': extendedFoundations['--bbangto-ext-blob-path'],
  '--bbangto-ext-blob-gradient': 'linear-gradient(135deg, #22D3EE 0%, #F472B6 52%, #FB7185 100%)',
  '--bbangto-ext-ribbon-curve': extendedFoundations['--bbangto-ext-ribbon-curve'],
  '--bbangto-ext-morph-duration': '600ms',
  '--bbangto-ext-squircle': '46% 54% 52% 48% / 56% 48% 52% 44%',
};

// 아쿠아 — 시안/티일을 주액센트로 전환한 라이트 변형(마젠타는 보조 강조로).
const aquaFoundations = makeColorway(foundations, {
  name: 'organic-fluid-blob-01-aqua',
  description: '민트빛 라이트 바탕 + 시안/티일 주액센트 유체 그라디언트',
  semantic: makeSemantic({
    bg: '#F5FCFD', bgElevated: '#FFFFFF', bgSunken: '#E3F6F9', overlay: 'rgba(8,30,36,0.55)',
    fg: '#0A2E33', fgMuted: '#35595E', fgSubtle: '#6A8B90', fgInverse: '#FFFFFF',
    border: '#C4E8ED', borderMuted: '#E0F4F7', borderStrong: '#A0D6DE', focus: '#0891B2',
    primaryBase: '#0891B2', primaryHover: '#0E7490', primaryActive: '#155E75',
    primarySubtle: '#CFFAFE', primaryFg: '#FFFFFF',
    accent: '#DB2777', accent2: '#84CC16', accent3: '#FB7185',
  }),
});
const aquaExt: Record<string, string> = {
  '--bbangto-ext-blob-path': extendedFoundations['--bbangto-ext-blob-path'],
  '--bbangto-ext-blob-gradient': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 52%, #DB2777 100%)',
  '--bbangto-ext-ribbon-curve': extendedFoundations['--bbangto-ext-ribbon-curve'],
  '--bbangto-ext-morph-duration': '600ms',
  '--bbangto-ext-squircle': '46% 54% 52% 48% / 56% 48% 52% 44%',
};

const STYLE_ID = 'bbangto-organic-fluid-blob-motif';
const CSS = `
.bbangto-organic-fluid-blob-card {
  border-radius: 42% 58% 63% 37% / 41% 44% 56% 59% !important;
  border: 1.5px solid transparent !important;
  background-image:
    linear-gradient(var(--bbangto-semantic-background-elevated, #FFFFFF), var(--bbangto-semantic-background-elevated, #FFFFFF)),
    var(--bbangto-ext-blob-gradient, ${BLOB_GRADIENT}) !important;
  background-origin: border-box !important;
  background-clip: padding-box, border-box !important;
  box-shadow: none !important;
  transition: border-radius var(--bbangto-ext-morph-duration, 600ms) cubic-bezier(0.65, 0, 0.35, 1) !important;
}
.bbangto-organic-fluid-blob-card:hover {
  border-radius: 58% 42% 38% 62% / 56% 59% 41% 44% !important;
}
.bbangto-organic-fluid-blob-btn {
  border-radius: 9999px !important;
  background: var(--bbangto-semantic-primary-base, ${MAGENTA}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 600 !important;
  border: none !important;
  box-shadow: none !important;
  transition: border-radius var(--bbangto-ext-morph-duration, 600ms) cubic-bezier(0.65, 0, 0.35, 1), background 160ms ease, transform 160ms ease !important;
}
.bbangto-organic-fluid-blob-btn:hover {
  background: var(--bbangto-semantic-primary-hover, #BE185D) !important;
  border-radius: var(--bbangto-ext-squircle, 46% 54% 52% 48% / 56% 48% 52% 44%) !important;
}
.bbangto-organic-fluid-blob-btn:active {
  background: var(--bbangto-semantic-primary-active, #9D174D) !important;
  transform: scale(0.97) !important;
}
.bbangto-organic-fluid-blob-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-primary-base, ${MAGENTA}) !important;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-organic-fluid-blob-card { transition: none !important; }
  .bbangto-organic-fluid-blob-card:hover { border-radius: 42% 58% 63% 37% / 41% 44% 56% 59% !important; }
  .bbangto-organic-fluid-blob-btn { transition: none !important; }
  .bbangto-organic-fluid-blob-btn:hover { border-radius: 9999px !important; }
  .bbangto-organic-fluid-blob-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-organic-fluid-blob-btn',
  cardClass: 'bbangto-organic-fluid-blob-card',
  displayPrefix: 'OrganicFluidBlob',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 9999, fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #CFFAFE)',
        color: 'var(--bbangto-semantic-primary-active, #0E7490)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #F2EEFB)',
        color: 'var(--bbangto-semantic-foreground-muted, #4A4565)',
      },
      solid: {
        background: `var(--bbangto-semantic-primary-base, ${MAGENTA})`,
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'BLOB 01',
  title: '흐르는 형태로 말하는 화면',
  tagline: '매끈하게 번지는 유체 곡선과 다색 그라디언트',
  body: '시안에서 마젠타, 코랄로 보간되는 색면이 화면을 가로지르고, 카드와 버튼은 비정형 곡률로 부드럽게 흐른다. 그림자 대신 색의 흐름이 깊이를 만들고, 본문 글자는 언제나 솔리드 영역 위에 또렷이 놓인다.',
  ctaPrimary: '흐름 시작하기',
  ctaSecondary: '팔레트 보기',
  bandTitle: '형태가 굳지 않는다 — 곡선이 흐르는 만큼 화면도 살아 움직인다.',
  items: [
    { name: '블롭 카드', tone: 'accent', tag: 'BLOB', desc: '비정형 곡률 + 그라디언트 링. hover에서 형태가 부드럽게 모핑된다.' },
    { name: '리본 헤더', tone: 'muted', tag: 'RIBBON', desc: '흐르는 스우시 곡선을 배경 데코로 깔아 시선을 유도한다.' },
    { name: '알약 액션', tone: 'solid', tag: 'PILL', desc: '솔리드 마젠타 알약 버튼. press 시 살짝 줄고 스쿼클로 변형.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'OrganicFluidBlobShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '유체 레이아웃 & 곡선 흐름',
    dos: [
      '블롭·리본·스우시 곡선과 다색 그라디언트는 배경·데코 영역에 배치한다.',
      '카드는 비정형 곡률(블롭)로, 버튼은 알약/스쿼클로 곡선 언어를 일관되게 적용한다.',
      'shadow는 최소화하고 그라디언트 색면의 명암 보간으로 깊이를 표현한다.',
      'hover 블롭 모핑은 --bbangto-ext-morph-duration(600ms)으로 매끈하게 흐르게 한다.',
    ],
    donts: [
      '비비드 그라디언트 색면 위에 본문 텍스트를 직접 얹지 않는다(보간 구간 대비 급변).',
      '곡선을 무질서하게 남발해 정보의 시선 흐름을 깨뜨리지 않는다.',
      '평면적 미학을 해치는 무거운 드롭섀도를 카드/버튼에 더하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 다색 유체 그라디언트 위 텍스트는 WCAG 4.5:1 미달 위험 — 본문은 솔리드 배경/오버레이 위에만 얹는다(카드 인테리어는 솔리드, 그라디언트는 보더 링으로만).',
      '색만으로 의미를 전달하지 않는다 — 그라디언트 보간 구간은 색맹 사용자가 구분하기 어렵다.',
      'SVG 블롭·리본·스우시 데코는 aria-hidden 처리해 스크린리더에서 제외한다.',
      'CTA 버튼은 솔리드 primary 채움(흰 텍스트 4.5:1 이상)으로 가독성을 확보한다.',
      'hover 블롭 모핑은 prefers-reduced-motion: reduce에서 정적 형태로 폴백한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '둥근 지오메트릭 산세리프(Poppins/Quicksand)를 본문·라벨에 쓰고, 리퀴드 디스플레이는 헤드라인 한정으로만 사용한다.',
    requiredFonts: ['Poppins', 'Quicksand', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Organic_Fluid_Blob_01: 바이오모픽 블롭·리본·스우시의 매끈한 곡선과 시안→마젠타→코랄 다색 유체 그라디언트가 화면을 가로지른다. 질감 없이 형태의 유연함과 색의 흐름이 곧 언어이며, hover 블롭 모핑이 시그니처.',
  components: {
    Button: {
      description: '솔리드 마젠타 알약 버튼. hover 시 스쿼클로 모핑, press 시 살짝 줄어든다.',
      specs: ['모서리: pill(9999px)', '채움: 솔리드 primary 마젠타', '그림자: 없음(평면)', 'hover: 스쿼클 border-radius 모핑', 'active: scale(0.97) press', 'focus-visible: 마젠타 outline', 'reduce-motion: 모핑 정적 폴백'],
    },
    Card: {
      description: '비정형 곡률(블롭) 타일. 솔리드 인테리어 + 다색 그라디언트 보더 링, hover에서 형태가 모핑된다.',
      specs: ['모서리: 비정형 블롭 border-radius', '배경: 솔리드 인테리어(텍스트 가독 확보)', '보더: 다색 유체 그라디언트 링', '그림자: 없음(색면이 깊이 대신)', 'hover: 블롭 모핑(600ms)', 'reduce-motion: 형태 고정'],
    },
    Tag: {
      description: '둥근 캡슐 라벨. accent=시안 파스텔, muted=중립, solid=마젠타.',
      specs: ['모서리: 캡슐(9999px)', '폰트: Poppins', '텍스트: letter-spacing 0.06em', '색: cyan-pastel / neutral / magenta-solid'],
    },
  },
  example: Showcase,
};

export const organicFluidBlobWrappers = wrapperComponents;
export const OrganicFluidBlobShowcase = Showcase;

export const organicFluidBlobStyleGuide: StyleGuide = {
  name: 'organic-fluid-blob-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (마젠타 라이트)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (네온 자수정)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'aqua', label: '아쿠아 (시안 액센트)', foundations: aquaFoundations, extendedFoundations: aquaExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { OrganicFluidBlobShowcase: Showcase },
  guidelines,
  visualMotif,
};
