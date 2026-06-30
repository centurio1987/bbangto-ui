import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Risograph_Print_01 — 리소/스크린프린트 인쇄소 질감 미학.
 *
 * 웜 크림 종이 위에 한정된 스팟 잉크 2~3색(플루오 마젠타 / 페더레이션 블루 /
 * 플루오 옐로)을 multiply 오버프린트로 겹쳐 제3색을 만든다. 깊이는 그림자가 아니라
 * 의도적 분판 미스레지스트레이션(어긋남)과 인쇄 그레인/망점으로 표현하며,
 * radius는 거의 평면(none~sm), 디스플레이는 잉크 묻은 굵은 그로테스크 산세리프.
 */

const PAPER = '#F4F0E6';
const PAPER_LT = '#FAF7EF';
const PAPER_SUNK = '#ECE6D6';
const INK = '#241A33'; // 마젠타+블루 오버프린트가 만드는 다크 잉크(본문/고대비 텍스트용)
const MAGENTA = '#EC008C';
const BLUE = '#2D4DA7';
const YELLOW = '#FFE800';

const foundations = makeFoundations({
  name: 'risograph-print-01',
  description:
    '웜 크림 종이 + 한정 스팟 잉크 2~3색 multiply 오버프린트 + 분판 미스레지스트레이션 + 그레인/망점 질감, 평면 인쇄물 미학',
  fontSans: "'Archivo', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '3px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
  },
  typeScale: {
    display: { fontSize: '92px', lineHeight: '0.92', letterSpacing: '-0.015em', fontWeight: 800 },
    h1: { fontSize: '54px', lineHeight: '0.98', letterSpacing: '-0.01em', fontWeight: 800 },
    h2: { fontSize: '32px', lineHeight: '1.1', letterSpacing: '0', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: PAPER_LT,
    bgSunken: PAPER_SUNK,
    overlay: 'rgba(36,26,51,0.55)',
    fg: INK,
    fgMuted: '#4A3F63',
    fgSubtle: '#6E6450',
    fgInverse: PAPER_LT,
    border: '#D8CFB8',
    borderMuted: '#E6DECB',
    borderStrong: '#BCAF8E',
    focus: MAGENTA,
    primaryBase: BLUE,
    primaryHover: '#243E89',
    primaryActive: '#1C3170',
    primarySubtle: '#DCE2F2',
    primaryFg: '#FFFFFF',
    accent: MAGENTA,
    accent2: BLUE,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-riso-paper': PAPER,
  '--bbangto-ext-riso-ink-1': MAGENTA,
  '--bbangto-ext-riso-ink-2': BLUE,
  '--bbangto-ext-riso-ink-3': YELLOW,
  '--bbangto-ext-riso-blend': 'multiply',
  '--bbangto-ext-riso-ink-opacity': '0.85',
  '--bbangto-ext-riso-misregister-x': '2px',
  '--bbangto-ext-riso-misregister-y': '3px',
  '--bbangto-ext-riso-grain': 'radial-gradient(rgba(36,26,51,0.10) 0.6px, transparent 0.7px)',
  '--bbangto-ext-riso-halftone':
    'radial-gradient(var(--bbangto-ext-riso-ink-1, #EC008C) 1px, transparent 1.5px)',
};

const STYLE_ID = 'bbangto-risograph-print-motif';
const CSS = `
.bbangto-risograph-print-card {
  position: relative !important;
  border-radius: 2px !important;
  background-color: var(--bbangto-semantic-background-elevated, ${PAPER_LT}) !important;
  background-image: var(--bbangto-ext-riso-grain, radial-gradient(rgba(36,26,51,0.10) 0.6px, transparent 0.7px)) !important;
  background-size: 4px 4px !important;
  border: 1.5px solid var(--bbangto-semantic-border-strong, #BCAF8E) !important;
  box-shadow: none !important;
  transition: transform 160ms cubic-bezier(0, 0, 0.2, 1) !important;
}
.bbangto-risograph-print-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background-image: var(--bbangto-ext-riso-halftone, radial-gradient(${MAGENTA} 1px, transparent 1.5px));
  background-size: 7px 7px;
  mix-blend-mode: var(--bbangto-ext-riso-blend, multiply);
  opacity: 0.10;
}
.bbangto-risograph-print-card:hover {
  transform: translate(-1px, -1px) !important;
}
.bbangto-risograph-print-btn {
  position: relative !important;
  border-radius: 2px !important;
  background: var(--bbangto-semantic-primary-base, ${BLUE}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  box-shadow: none !important;
  transition: box-shadow 140ms ease, transform 120ms ease !important;
}
.bbangto-risograph-print-btn:hover {
  box-shadow:
    var(--bbangto-ext-riso-misregister-x, 2px) var(--bbangto-ext-riso-misregister-y, 3px) 0 0 var(--bbangto-ext-riso-ink-1, ${MAGENTA}),
    calc(-1 * var(--bbangto-ext-riso-misregister-x, 2px)) calc(-1 * var(--bbangto-ext-riso-misregister-y, 3px)) 0 0 var(--bbangto-ext-riso-ink-2, ${BLUE}) !important;
}
.bbangto-risograph-print-btn:active {
  transform: translate(1px, 1px) !important;
  box-shadow: none !important;
}
.bbangto-risograph-print-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-riso-ink-1, ${MAGENTA}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-risograph-print-card { transition: none !important; }
  .bbangto-risograph-print-card:hover { transform: none !important; }
  .bbangto-risograph-print-btn { transition: none !important; }
  .bbangto-risograph-print-btn:hover { box-shadow: none !important; }
  .bbangto-risograph-print-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-risograph-print-btn',
  cardClass: 'bbangto-risograph-print-card',
  displayPrefix: 'RisographPrint',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      borderRadius: 2, fontFamily: "'Space Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1.5, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      // 스탬프형 잉크 라벨: 단색 잉크 면 또는 outline.
      accent: { background: MAGENTA, color: '#FFFFFF' },
      muted: { background: 'transparent', color: BLUE, boxShadow: `inset 0 0 0 1.5px ${BLUE}` },
      solid: { background: YELLOW, color: INK },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'RISO 01',
  title: '잉크가 겹친 자리, 새 색이 태어난다',
  tagline: '한정 스팟 잉크 두세 색의 오버프린트',
  body:
    '크림 종이 위에 마젠타와 블루 잉크를 multiply로 겹치면 겹친 부분에 제3색이 솟는다. 깊이는 그림자가 아니라 분판이 살짝 어긋난 미스레지스트레이션과 화면을 덮는 인쇄 그레인으로 만든다.',
  ctaPrimary: '인쇄소 열기',
  ctaSecondary: '잉크 보기',
  bandTitle: '두세 색의 한계가 만드는, 디지털이 아닌 인쇄의 질감.',
  items: [
    { name: '포스터 면', tone: 'accent', tag: 'POSTER', desc: '초대형 그로테스크 헤드라인에 분판 어긋남을 더한 표지 면.' },
    { name: '룩북 면', tone: 'muted', tag: 'GALLERY', desc: '듀오톤 이미지를 망점으로 떨군 갤러리 그리드 셀.' },
    { name: '스탬프 면', tone: 'solid', tag: 'STAMP', desc: '단색 잉크로 찍은 라벨과 캡션 레일을 묶는 면.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'RisographPrintShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 인쇄 면 분할',
    dos: [
      '포스터형 Hero: 초대형 헤드라인 + 듀오톤 인물/식물 + 헤드라인 한정 분판 어긋남으로 구성한다.',
      '잉크는 2~3색으로 한정하고, 오버랩은 multiply로 겹쳐 제3색을 의도적으로 만든다.',
      '그레인/망점은 장식이 아니라 종이 위 베이스 질감으로 화면 전면에 정적으로 깐다.',
    ],
    donts: [
      '부드러운 그라디언트·드롭섀도·풀컬러 사진을 쓰지 않는다(리소 공정 언어와 충돌).',
      '분판 오프셋을 과하게 키워 본문을 흔들지 않는다 — 어긋남은 헤드라인/장식 한정.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '플루오 옐로/연한 잉크 on 크림 종이는 WCAG 대비 미달 위험 — 본문/소형 텍스트는 잉크 농도 높은 색(블루 #2D4DA7 / 마젠타 #EC008C)이나 오버프린트 다크 잉크(#241A33) 위에만 배치하고 대비 토큰을 별도 강제한다(본문 4.5:1 이상).',
      '미스레지스트레이션(분판 어긋남)은 헤드라인·장식에 한정하고, 본문은 정합을 유지해 가독성을 지킨다.',
      '그레인/망점 텍스처 위 텍스트는 대비를 보강한다. 텍스처는 정적(모션 아님)이지만 버튼 호버의 분판 이동은 prefers-reduced-motion: reduce에서 비활성화한다.',
      '듀오톤 이미지에는 대체텍스트(alt)를 반드시 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '잉크 묻은 듯 굵은 그로테스크 산세리프 디스플레이(Anton/Archivo류)로 초대형 헤드라인을, 본문은 휴머니스트 산세리프로 짠다. 라벨/캡션은 모노(Space Mono)로 보강한다.',
    requiredFonts: ['Anton', 'Archivo', 'Pretendard', 'Space Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Risograph_Print_01: 한정된 스팟 잉크의 반투명 오버프린트가 겹쳐 제3색을 만들고, 의도적 분판 미스레지스트레이션과 인쇄 그레인/망점이 화면 전체를 덮는 — 디지털이 아닌 리소/스크린프린트 인쇄소 질감.',
  components: {
    Button: {
      description: '단색 잉크 면 버튼. 평면(radius 2px), 호버 시 마젠타/블루 분판이 어긋나 밀려 나온다.',
      specs: ['모서리: radius 2px(평면)', '채움: 단색 잉크(블루 primary)', 'hover: 분판 미스레지스트레이션(마젠타/블루 오프셋)', 'active: 1px press', 'focus-visible: 마젠타 outline', 'reduce-motion: 분판 이동 비활성'],
    },
    Card: {
      description: '종이 배경 + 그레인 + multiply 망점 오버레이의 평면 인쇄 면. 그림자 없음.',
      specs: ['모서리: radius 2px(평면)', '배경: 크림 종이 + 그레인 4px', '오버레이: multiply 망점(::after)', '보더: 1.5px ink-strong', '그림자: 없음(깊이는 질감으로)', 'hover: 1px 미세 시프트'],
    },
    Tag: {
      description: '스탬프형 잉크 라벨. accent=마젠타 면, muted=블루 outline 스탬프, solid=옐로 면+다크 잉크 텍스트.',
      specs: ['모서리: radius 2px(스탬프)', '텍스트: uppercase, letter-spacing 0.1em', '폰트: Space Mono', '색: magenta-fill / blue-outline / yellow-fill'],
    },
  },
  example: Showcase,
};

export const risographPrintWrappers = wrapperComponents;
export const RisographPrintShowcase = Showcase;

export const risographPrintStyleGuide: StyleGuide = {
  name: 'risograph-print-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { RisographPrintShowcase: Showcase },
  guidelines,
  visualMotif,
};
