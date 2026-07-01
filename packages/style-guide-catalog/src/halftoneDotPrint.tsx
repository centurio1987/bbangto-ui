import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Halftone_Dot_Print_01 — CMYK 망점 인쇄(halftone) 미학.
 *
 * 밝은 페이퍼 배경 위에 CMYK 4원색 + 키블랙 팔레트, 굵은 그로테스크 산세리프 헤드라인.
 * 색·명암을 점의 크기·밀도·스크린 각으로 표현하는 인쇄 분해 그래픽이 시그니처다.
 * radius는 거의 없는(인쇄물 컷) 평면, 깊이는 그림자가 아니라 도트 밀도로 표현한다.
 */

const PAPER = '#F7F4EC';
const KEY = '#1A1A1A';
const MAGENTA = '#C8006E'; // primary(본문 위 white 대비 5.7:1 확보용 키 마젠타)
const DOT_MAGENTA = '#EC008C'; // 장식 망점용 프로세스 마젠타
const CYAN = '#0098D4';
const YELLOW = '#F4C400';

const foundations = makeFoundations({
  name: 'halftone-dot-print-01',
  description: '밝은 페이퍼 + CMYK 망점 스크린톤 + 굵은 그로테스크 산세리프, 도트 밀도로 톤을 만드는 인쇄 분해 미학',
  fontSans: "'Archivo', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '3px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: 'none',
    md: '0 1px 0 rgba(26,26,26,0.14)',
    lg: '0 2px 0 rgba(26,26,26,0.14)',
    xl: '0 3px 0 rgba(26,26,26,0.16)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '0.98', letterSpacing: '-0.025em', fontWeight: 800 },
    h1: { fontSize: '44px', lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '28px', lineHeight: '1.16', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '11px', lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: '#FFFFFF',
    bgSunken: '#ECE8DD',
    overlay: 'rgba(26,26,26,0.55)',
    fg: KEY,
    fgMuted: '#4A4742',
    fgSubtle: '#7A766E',
    fgInverse: '#FFFFFF',
    border: '#D9D4C8',
    borderMuted: '#ECE8DD',
    borderStrong: KEY,
    focus: CYAN,
    primaryBase: MAGENTA,
    primaryHover: '#A3005A',
    primaryActive: '#840049',
    primarySubtle: '#FBE2EF',
    primaryFg: '#FFFFFF',
    accent: MAGENTA,
    accent2: CYAN,
    accent3: KEY,
  }),
});

const SCREEN_TONE = `radial-gradient(${DOT_MAGENTA} 1.6px, transparent 1.8px)`;

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-halftone-dot-size': '6px',
  '--bbangto-ext-halftone-cell': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-halftone-cyan': CYAN,
  '--bbangto-ext-halftone-magenta': DOT_MAGENTA,
  '--bbangto-ext-halftone-yellow': YELLOW,
  '--bbangto-ext-halftone-key': KEY,
  '--bbangto-ext-halftone-gradient-stop': '60%',
  '--bbangto-ext-screen-tone': SCREEN_TONE,
};

/* 색 스킴 변형(colorway) — 망점 스크린·키라인 모티프(래퍼 CSS/shape)는 base에서 상속하고 색만 교체. */

/* dark — 야간 프레스(암실 인쇄): 어두운 잉크지 위에 형광 CMYK 망점, 밝은 페이퍼 텍스트. */
const darkFoundations = makeColorway(foundations, {
  name: 'halftone-dot-print-01-dark',
  description: 'Halftone 다크 — 어두운 잉크지 위 형광 CMYK 망점, 밝은 페이퍼 잉크 텍스트',
  semantic: makeSemantic({
    bg: '#14110D',
    bgElevated: '#221E17',
    bgSunken: '#0C0A07',
    overlay: 'rgba(0,0,0,0.6)',
    fg: '#F4EFE3',
    fgMuted: '#C4BDAE',
    fgSubtle: '#928B7C',
    fgInverse: '#14110D',
    border: '#3A352B',
    borderMuted: '#221E17',
    borderStrong: '#C4BDAE',
    focus: '#35C4F0',
    primaryBase: '#EC008C',
    primaryHover: '#FF3DA6',
    primaryActive: '#C8006E',
    primarySubtle: '#5A1038',
    primaryFg: '#FFFFFF',
    accent: '#EC008C',
    accent2: '#35C4F0',
    accent3: '#F4C400',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-halftone-dot-size': '6px',
  '--bbangto-ext-halftone-cell': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-halftone-cyan': '#35C4F0',
  '--bbangto-ext-halftone-magenta': '#FF2FA4',
  '--bbangto-ext-halftone-yellow': '#FFD62E',
  '--bbangto-ext-halftone-key': '#F4EFE3',
  '--bbangto-ext-halftone-gradient-stop': '60%',
  '--bbangto-ext-screen-tone': 'radial-gradient(#FF2FA4 1.6px, transparent 1.8px)',
};

/* cyan — 시안 색분해(cyan separation): 쿨 페이퍼 위 시안을 키컬러로, 마젠타는 포커스로 전환. */
const cyanFoundations = makeColorway(foundations, {
  name: 'halftone-dot-print-01-cyan',
  description: 'Halftone 라이트 — 쿨 페이퍼 위 시안 색분해 키컬러, 마젠타 포커스',
  semantic: makeSemantic({
    bg: '#EEF4F6',
    bgElevated: '#FFFFFF',
    bgSunken: '#DCE7EB',
    overlay: 'rgba(20,23,26,0.55)',
    fg: '#14171A',
    fgMuted: '#41484D',
    fgSubtle: '#727A80',
    fgInverse: '#FFFFFF',
    border: '#C6D2D7',
    borderMuted: '#DCE7EB',
    borderStrong: '#14171A',
    focus: '#C8006E',
    primaryBase: '#0079A8',
    primaryHover: '#005F86',
    primaryActive: '#004A69',
    primarySubtle: '#CDECF7',
    primaryFg: '#FFFFFF',
    accent: '#0079A8',
    accent2: '#C8006E',
    accent3: '#14171A',
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-halftone-dot-size': '6px',
  '--bbangto-ext-halftone-cell': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-halftone-cyan': '#0098D4',
  '--bbangto-ext-halftone-magenta': '#EC008C',
  '--bbangto-ext-halftone-yellow': '#F4C400',
  '--bbangto-ext-halftone-key': '#14171A',
  '--bbangto-ext-halftone-gradient-stop': '60%',
  '--bbangto-ext-screen-tone': 'radial-gradient(#0098D4 1.6px, transparent 1.8px)',
};

const STYLE_ID = 'bbangto-halftone-dot-print-motif';
const CSS = `
.bbangto-halftone-dot-print-card {
  position: relative !important;
  border-radius: 2px !important;
  border: 1px solid var(--bbangto-semantic-border-strong, ${KEY}) !important;
  box-shadow: none !important;
  overflow: hidden !important;
  transition: transform 160ms ease, border-color 160ms ease !important;
}
.bbangto-halftone-dot-print-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 10px;
  background-image: var(--bbangto-ext-screen-tone, ${SCREEN_TONE});
  background-size: var(--bbangto-ext-halftone-cell, 8px) var(--bbangto-ext-halftone-cell, 8px);
  background-position: 0 0;
  transition: background-size 200ms ease;
  pointer-events: none;
}
.bbangto-halftone-dot-print-card:hover { transform: translateY(-1px) !important; }
.bbangto-halftone-dot-print-card:hover::before { background-size: 6px 6px; }
.bbangto-halftone-dot-print-btn {
  border-radius: 2px !important;
  background-color: var(--bbangto-semantic-primary-base, ${MAGENTA}) !important;
  background-image: radial-gradient(rgba(255,255,255,0.22) 1.3px, transparent 1.5px) !important;
  background-size: var(--bbangto-ext-halftone-dot-size, 6px) var(--bbangto-ext-halftone-dot-size, 6px) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  box-shadow: none !important;
  border: 1px solid ${KEY} !important;
  transition: background-color 140ms ease, background-size 200ms ease, transform 100ms ease !important;
}
.bbangto-halftone-dot-print-btn:hover {
  background-color: var(--bbangto-semantic-primary-hover, #A3005A) !important;
  background-size: 4px 4px !important;
}
.bbangto-halftone-dot-print-btn:active { transform: translateY(1px) !important; }
.bbangto-halftone-dot-print-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus, ${CYAN}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-halftone-dot-print-card { transition: none !important; }
  .bbangto-halftone-dot-print-card:hover { transform: none !important; }
  .bbangto-halftone-dot-print-card::before { transition: none !important; }
  .bbangto-halftone-dot-print-card:hover::before { background-size: var(--bbangto-ext-halftone-cell, 8px) var(--bbangto-ext-halftone-cell, 8px); }
  .bbangto-halftone-dot-print-btn { transition: none !important; }
  .bbangto-halftone-dot-print-btn:hover { background-size: var(--bbangto-ext-halftone-dot-size, 6px) var(--bbangto-ext-halftone-dot-size, 6px) !important; }
  .bbangto-halftone-dot-print-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-halftone-dot-print-btn',
  cardClass: 'bbangto-halftone-dot-print-card',
  displayPrefix: 'HalftoneDotPrint',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      borderRadius: 2, fontFamily: "'Space Mono', 'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.12em', lineHeight: 1.5, textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #FBE2EF)',
        color: 'var(--bbangto-semantic-primary-active, #A3005A)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #ECE8DD)',
        color: 'var(--bbangto-semantic-foreground-muted, #4A4742)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #1A1A1A)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'CMYK 01',
  title: '점으로 분해한 색, 점으로 쌓은 톤',
  tagline: '시안·마젠타·옐로·키블랙 4원색 망점 인쇄',
  body: '단색 위에 도트 스크린을 얹어 톤을 만든다. 점의 크기와 밀도, 스크린 각으로 색과 명암을 표현하는 인쇄 분해 그래픽 — 본문 텍스트는 솔리드 색으로 분리해 또렷하게 읽힌다.',
  ctaPrimary: '색분해 보기',
  ctaSecondary: '스크린톤 가이드',
  bandTitle: '망점이 모이면 면이 되고, 면이 쌓이면 인쇄가 된다.',
  items: [
    { name: '색분해 패널', tone: 'accent', tag: 'SEPARATION', desc: '큰 면을 망점으로 채워 채널별 색분해를 그대로 드러낸다.' },
    { name: '스크린톤 칩', tone: 'muted', tag: 'SCREEN', desc: '단색 위 도트 명암으로 중립 톤을 만드는 인쇄 라벨.' },
    { name: '키라인 카드', tone: 'solid', tag: 'KEYLINE', desc: '1px 키블랙 외곽선과 상단 망점 띠로 마감한 평면 표면.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'HalftoneDotPrintShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '망점 스크린 & 레이아웃',
    dos: [
      '망점은 큰 면·이미지·장식 영역에 사용하고, 본문 텍스트는 솔리드 색으로 분리한다.',
      '도트 밀도 그라데이션으로 위계와 입체감을 표현한다(그림자 대신 망점).',
      '스크린 각(C 15°/M 75°/Y 0°/K 45°)을 채널별로 어긋나게 겹쳐 인쇄 분해감을 살린다.',
    ],
    donts: [
      '작은 텍스트나 핵심 UI 위에 도트 스크린을 깔지 않는다.',
      '채널을 무분별하게 오버랩해 색이 탁해지지 않게 한다.',
      '셀 피치가 너무 좁은 고빈도 도트로 모아레/플리커를 유발하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '도트 패턴 위 텍스트 대비는 평균이 아닌 최악 지점 기준 4.5:1을 보장한다(밝은 옐로 채널 위 텍스트가 특히 위험).',
      '망점 fill과 텍스트 색을 분리하고, 본문은 항상 솔리드 색 위에 둔다.',
      '포커스 링은 도트와 구분되는 솔리드 색(시안)으로 표시한다.',
      '미세 고빈도 도트는 충분한 cell 피치를 두고, 도트 애니메이션은 prefers-reduced-motion에서 정적 폴백한다.',
      '망점 처리(색분해) 이미지에는 alt 텍스트를 반드시 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '굵은 그로테스크 산세리프(Archivo/Anton)로 헤드라인, 본문은 산세리프, 캡션·라벨은 소문자 대문자화한 모노 인쇄 캡션으로 보강한다.',
    requiredFonts: ['Archivo', 'Anton', 'Pretendard', 'Space Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Halftone_Dot_Print_01: 밝은 페이퍼 + CMYK 망점 스크린톤 + 굵은 그로테스크 산세리프. 색·명암을 점의 크기·밀도·스크린 각으로 표현하는 인쇄 분해 그래픽이 시그니처.',
  components: {
    Button: {
      description: '키 마젠타 채움 위에 미세 도트 스크린을 얹은 평면 버튼. hover에서 도트 밀도가 촘촘해진다.',
      specs: ['모서리: radius 2px(인쇄 컷)', '채움: 키 마젠타 + 도트 스크린', 'hover: 도트 밀도 증가(6→4px)', 'active: 1px press', 'focus-visible: 솔리드 시안 outline'],
    },
    Card: {
      description: '1px 키블랙 키라인으로 마감한 평면 표면. 상단에 망점 띠를 두르고, hover 시 띠 밀도가 촘촘해진다.',
      specs: ['모서리: radius 2px', '보더: 1px 키블랙 키라인', '그림자: none(평면 인쇄)', '상단: 망점 스크린 띠', 'hover: 띠 밀도 증가 + 1px lift', 'reduce-motion: 밀도/lift 정적'],
    },
    Tag: {
      description: '인쇄 캡션 느낌의 사각 스크린톤 칩. accent=마젠타 subtle, muted=중립, solid=키블랙.',
      specs: ['모서리: radius 2px(pill 아님)', '텍스트: 대문자 + letter-spacing 0.12em', '폰트: Space Mono', '색: magenta-subtle / neutral / key-black'],
    },
  },
  example: Showcase,
};

export const halftoneDotPrintWrappers = wrapperComponents;
export const HalftoneDotPrintShowcase = Showcase;

export const halftoneDotPrintStyleGuide: StyleGuide = {
  name: 'halftone-dot-print-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (페이퍼 + 마젠타)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (잉크지 + 형광 CMYK)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'cyan', label: '시안 색분해', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HalftoneDotPrintShowcase: Showcase },
  guidelines,
  visualMotif,
};
