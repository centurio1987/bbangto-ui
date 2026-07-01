import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Mixed_Media_Collage_01 — 멀티미디어 합성 레이어 콜라주 미학.
 *
 * 페이퍼/오프화이트 캔버스 + 사진의 풍부한 톤이 살아나는 다색 팔레트(코랄/세이지),
 * 그래픽 콘덴스트 볼드 헤드 + 휴머니스트 본문. 사진·드로잉·3D·빈티지 요소를
 * 듀오톤·그레인·블렌드 모드로 통일해 "하나의 합성 이미지"로 녹인다. 시그니처는
 * z-레이어로 합성된 컷아웃 씬과 요소별 그라운드(cutout) 섀도, 미세 회전이다.
 */

const PAPER = '#F4F1EA';
const INK = '#1F1B16';
const CORAL = '#E5573F';
const SAGE = '#7C8C5A';
const CUTOUT_SHADOW = '0 6px 18px rgba(31,27,22,0.18), 0 1px 2px rgba(31,27,22,0.12)';
const ROTATE = '-1.2deg';

const foundations = makeFoundations({
  name: 'mixed-media-collage-01',
  description: '페이퍼 캔버스 + 다색 팔레트 위 사진·드로잉·3D를 듀오톤·그레인으로 통일한 레이어 콜라주, 컷아웃 그라운드 섀도 + 미세 회전',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(31,27,22,0.10)',
    md: '0 6px 18px rgba(31,27,22,0.14), 0 1px 2px rgba(31,27,22,0.12)',
    lg: '0 12px 30px rgba(31,27,22,0.18), 0 2px 4px rgba(31,27,22,0.12)',
    xl: '0 24px 56px rgba(31,27,22,0.22), 0 4px 8px rgba(31,27,22,0.14)',
  },
  typeScale: {
    display: { fontSize: '80px', lineHeight: '0.96', letterSpacing: '-0.02em', fontWeight: 800 },
    h1: { fontSize: '48px', lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '30px', lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: 800 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: '#FCFAF5',
    bgSunken: '#E8E3D8',
    overlay: 'rgba(31,27,22,0.55)',
    fg: INK,
    fgMuted: '#4A453C',
    fgSubtle: '#7A7264',
    fgInverse: '#FCFAF5',
    border: '#D8D1C2',
    borderMuted: '#E8E3D8',
    borderStrong: '#BCB39F',
    focus: CORAL,
    primaryBase: '#2A241D',
    primaryHover: '#3E372D',
    primaryActive: '#15110D',
    primarySubtle: '#EFE7DC',
    primaryFg: '#FCFAF5',
    accent: CORAL,
    accent2: SAGE,
    accent3: '#B23A26',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-layer-z': '3',
  '--bbangto-ext-cutout-shadow': CUTOUT_SHADOW,
  '--bbangto-ext-blend-mode': 'multiply',
  '--bbangto-ext-grain-vintage': '0.08',
  '--bbangto-ext-ink-doodle': INK,
  '--bbangto-ext-duotone': 'sepia(0.35) contrast(1.05) saturate(0.9)',
  '--bbangto-ext-layer-rotate': ROTATE,
};

/* 색 스킴 변형(colorway) — 컷아웃/그레인/미세회전 모티프는 base에서 상속, 색만 교체. */

const darkFoundations = makeColorway(foundations, {
  name: 'mixed-media-collage-01-dark',
  description: '다크룸 콜라주 — 딥 차콜 페이퍼 위 코랄/세이지 컷아웃, 스크린 블렌드',
  semantic: makeSemantic({
    bg: '#1C1915', bgElevated: '#262119', bgSunken: '#14110D', overlay: 'rgba(0,0,0,0.62)',
    fg: '#F1EBDD', fgMuted: '#C7BEAC', fgSubtle: '#948B78', fgInverse: '#1C1915',
    border: '#3D372C', borderMuted: '#2A251D', borderStrong: '#6B6350', focus: CORAL,
    primaryBase: '#EDE3D2', primaryHover: '#DDD1BC', primaryActive: '#C9BBA1',
    primarySubtle: '#3A342A', primaryFg: '#201C15',
    accent: CORAL, accent2: '#9DAE73', accent3: '#F07A63',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-layer-z': '3',
  '--bbangto-ext-cutout-shadow': '0 6px 18px rgba(0,0,0,0.50), 0 1px 2px rgba(0,0,0,0.42)',
  '--bbangto-ext-blend-mode': 'screen',
  '--bbangto-ext-grain-vintage': '0.12',
  '--bbangto-ext-ink-doodle': '#F1EBDD',
  '--bbangto-ext-duotone': 'sepia(0.45) contrast(1.10) saturate(0.80) brightness(0.85)',
  '--bbangto-ext-layer-rotate': ROTATE,
};

const cobaltFoundations = makeColorway(foundations, {
  name: 'mixed-media-collage-01-cobalt',
  description: '코발트 콜라주 — 쿨 페이퍼 위 인디고/번트앰버 컷아웃, 코발트 강조',
  semantic: makeSemantic({
    bg: '#F2F0EB', bgElevated: '#FBFAF6', bgSunken: '#E4E2DA', overlay: 'rgba(26,27,34,0.55)',
    fg: '#1A1B22', fgMuted: '#43454F', fgSubtle: '#71737E', fgInverse: '#FBFAF6',
    border: '#D2D1CA', borderMuted: '#E4E2DA', borderStrong: '#B4B3AA', focus: '#2F4CDB',
    primaryBase: '#1E3A8A', primaryHover: '#2947A5', primaryActive: '#15296B',
    primarySubtle: '#DDE3F7', primaryFg: '#FBFAF6',
    accent: '#2F4CDB', accent2: '#C2703D', accent3: '#15296B',
  }),
});
const cobaltExt: Record<string, string> = {
  '--bbangto-ext-layer-z': '3',
  '--bbangto-ext-cutout-shadow': '0 6px 18px rgba(26,27,34,0.18), 0 1px 2px rgba(26,27,34,0.12)',
  '--bbangto-ext-blend-mode': 'multiply',
  '--bbangto-ext-grain-vintage': '0.08',
  '--bbangto-ext-ink-doodle': '#1A1B22',
  '--bbangto-ext-duotone': 'saturate(1.05) contrast(1.05) hue-rotate(-10deg)',
  '--bbangto-ext-layer-rotate': ROTATE,
};

const STYLE_ID = 'bbangto-mixed-media-collage-motif';
const CSS = `
.bbangto-mixed-media-collage-card {
  position: relative;
  border-radius: var(--bbangto-radius-md, 8px) !important;
  box-shadow: var(--bbangto-ext-cutout-shadow, ${CUTOUT_SHADOW}) !important;
  border: 1px solid var(--bbangto-semantic-border-base, #D8D1C2) !important;
  transform: rotate(var(--bbangto-ext-layer-rotate, ${ROTATE})) !important;
  transform-origin: center !important;
  transition: transform 240ms cubic-bezier(0, 0, 0.2, 1), box-shadow 240ms cubic-bezier(0, 0, 0.2, 1) !important;
}
.bbangto-mixed-media-collage-card:hover {
  transform: rotate(0deg) translateY(-4px) !important;
  box-shadow: 0 16px 38px rgba(31,27,22,0.22), 0 2px 6px rgba(31,27,22,0.14) !important;
}
.bbangto-mixed-media-collage-btn {
  border-radius: var(--bbangto-radius-sm, 4px) !important;
  background: var(--bbangto-semantic-primary-base, #2A241D) !important;
  color: var(--bbangto-semantic-primary-foreground, #FCFAF5) !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
  box-shadow: 0 1px 2px rgba(31,27,22,0.18) !important;
  transition: transform 120ms ease, background 120ms ease !important;
}
.bbangto-mixed-media-collage-btn:hover { background: var(--bbangto-semantic-primary-hover, #3E372D) !important; }
.bbangto-mixed-media-collage-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-mixed-media-collage-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, ${CORAL}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-mixed-media-collage-card { transition: none !important; transform: none !important; }
  .bbangto-mixed-media-collage-card:hover { transform: none !important; }
  .bbangto-mixed-media-collage-btn { transition: none !important; }
  .bbangto-mixed-media-collage-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-mixed-media-collage-btn',
  cardClass: 'bbangto-mixed-media-collage-card',
  displayPrefix: 'MixedMediaCollage',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
      borderRadius: 4, borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'transparent',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
      letterSpacing: '0.06em', lineHeight: 1.4, whiteSpace: 'nowrap', textTransform: 'uppercase',
      transform: 'rotate(-1.5deg)',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #FBE3DD)',
        color: 'var(--bbangto-semantic-primary-active, #B23A26)',
        borderColor: 'var(--bbangto-semantic-border-focus, #E5573F)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #E8E3D8)',
        color: 'var(--bbangto-semantic-foreground-muted, #4A453C)',
        borderColor: 'var(--bbangto-semantic-border-base, #CFC7B6)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #41502A)',
        color: 'var(--bbangto-semantic-primary-foreground, #FCFAF5)',
        borderColor: 'var(--bbangto-semantic-primary-base, #41502A)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'COLLAGE 01',
  title: '겹쳐서 하나가 되는 화면',
  tagline: '사진·드로잉·3D를 한 톤으로 녹인 레이어 콜라주',
  body: '서로 다른 매체를 듀오톤과 그레인으로 통일하고, 컷아웃 요소마다 그라운드 섀도를 깔아 한 장의 합성 이미지처럼 쌓아 올린다. 보이는 이음새 대신 레이어 위계로 시선을 모은다.',
  ctaPrimary: '무드보드 열기',
  ctaSecondary: '레이어 살펴보기',
  bandTitle: '매체는 여럿, 화면은 하나의 이미지.',
  items: [
    { name: '씬 레이어', tone: 'accent', tag: 'SCENE', desc: '사진·일러스트·3D 슬롯을 z-순서로 합성해 하나의 장면으로 묶는다.' },
    { name: '컷아웃 미디어', tone: 'muted', tag: 'CUTOUT', desc: '배경을 덜어낸 컷아웃에 듀오톤·그레인을 입혀 톤을 맞춘다.' },
    { name: '스탬프 라벨', tone: 'solid', tag: 'STAMP', desc: '손그림 도장형 스티커로 레이어 위에 메모처럼 얹는다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'MixedMediaCollageShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이어 합성 & 레이아웃',
    dos: [
      '매체를 톤(듀오톤/그레인)으로 통일해 한 화면이 하나의 합성 이미지로 보이게 한다.',
      '--bbangto-ext-layer-z로 z-순서를 정하고 레이어 위계로 초점을 형성한다.',
      '컷아웃 요소마다 --bbangto-ext-cutout-shadow로 그라운드 섀도를 깔아 떠 있게 한다.',
      '여백을 넉넉히 두어 겹친 레이어가 호흡할 공간을 확보한다.',
    ],
    donts: [
      'collage-scrapbook처럼 테이프·찢김 등 이음새를 노출하지 않는다(그건 별도 스타일).',
      '블렌드 모드(multiply)를 남용해 명도를 떨어뜨리거나 텍스트를 묻히지 않는다.',
      '레이어 회전을 무작위로 키워 정보 가독성을 해치지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '합성/사진 위 텍스트는 대비 변동이 크므로 헤드 뒤 솔리드 플레이트나 텍스트 섀도로 WCAG AA(본문 4.5:1, 대형 3:1)를 강제한다.',
      '블렌드 모드가 텍스트·핵심 요소의 명도를 떨어뜨리지 않는지 합성 후 대비를 검증한다.',
      '의미를 전달하는 합성 이미지·컷아웃 요소에는 대체텍스트를, 장식 레이어에는 aria-hidden을 부여한다.',
      '패럴랙스/레이어 등장 모션은 prefers-reduced-motion: reduce에서 정지한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '그래픽 콘덴스트 산세리프(Archivo/Anton류) 대형 헤드 + 휴머니스트 본문(Inter) 혼합. 손글씨는 낙서 오버레이에 한정한다.',
    requiredFonts: ['Archivo', 'Anton', 'Inter', 'Pretendard'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Mixed_Media_Collage_01: 드로잉·사진·3D·빈티지 요소를 듀오톤·그레인·블렌드 모드로 매끈히 융합해 하나의 통합된 멀티미디어 합성 이미지로 만드는 레이어 콜라주 — 이음새가 보이는 오려붙임이 아니라 매체가 녹아든 단일 일러스트레이션.',
  components: {
    Button: {
      description: '합성 노이즈를 방해하지 않는 절제된 솔리드 잉크 버튼. press 시 살짝 가라앉는다.',
      specs: ['모서리: radius sm(4px)', '채움: 딥 잉크 solid', '그림자: subtle sm', 'active: translateY/scale 미세 press', 'focus-visible: 코랄 outline'],
    },
    Card: {
      description: '사진+일러스트+3D 슬롯을 z-레이어로 합성하는 CollageScene. 미세 회전 + 그라운드(cutout) 섀도로 떠 있게, hover에서 정렬되며 떠오른다.',
      specs: ['모서리: radius md(8px)', '그림자: cutout ground shadow', '변형: layer-rotate 미세 회전', 'hover: rotate 0 + translateY(-4px) lift', 'reduce-motion: 회전·lift 비활성'],
    },
    Tag: {
      description: '손그림 도장형 스티커 배지. accent=코랄 스탬프, muted=페이퍼 중립, solid=세이지 솔리드. 미세 회전으로 손맛을 준다.',
      specs: ['모서리: radius 4px 스탬프', '보더: 1.5px solid tone color', '폰트: JetBrains Mono uppercase', '색: coral-subtle / paper-neutral / olive-solid'],
    },
  },
  example: Showcase,
};

export const mixedMediaCollageWrappers = wrapperComponents;
export const MixedMediaCollageShowcase = Showcase;

export const mixedMediaCollageStyleGuide: StyleGuide = {
  name: 'mixed-media-collage-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (페이퍼 + 코랄)', foundations, extendedFoundations },
    { key: 'dark', label: '다크룸 (딥 차콜 + 코랄)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'cobalt', label: '코발트 (쿨 페이퍼 + 인디고)', foundations: cobaltFoundations, extendedFoundations: cobaltExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { MixedMediaCollageShowcase: Showcase },
  guidelines,
  visualMotif,
};
