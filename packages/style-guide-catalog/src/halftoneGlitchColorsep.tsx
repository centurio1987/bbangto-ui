import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Halftone_Glitch_Colorsep_01 — CMYK 망점 스크린 + 색분해(채널 어긋남) 글리치 미학.
 *
 * near-black 다크 베이스 + 2~3색 한정 잉크(잉크 레드/잉크 그린/시안), 헤비 그로테스크
 * 산세리프(초대형 콘덴스트 헤드라인) + 모노 캡션, radius none~sm(인쇄물·잘린 컷).
 * 드롭섀도 대신 적·녹 채널을 의도적으로 어긋나게 겹친 오프셋이 깊이 역할을 하며,
 * 망점 패턴 자체가 색분해로 찢기는 듯한 일그러짐이 시그니처다.
 */

const INK_RED = '#C8102E';
const INK_GREEN = '#178A4C';
const CYAN = '#00AEEF';
const PAPER = '#F4F1E9';

const foundations = makeFoundations({
  name: 'halftone-glitch-colorsep-01',
  description: 'CMYK 망점 스크린 + 적·녹 채널 색분해 글리치, near-black 다크 베이스 + 한정 잉크 팔레트 + 헤비 그로테스크',
  fontSans: "'Archivo', 'Anton', 'Pretendard', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '2px', lg: '3px', xl: '4px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '3px 0 0 rgba(200,16,46,0.40), -3px 0 0 rgba(23,138,76,0.40)',
    md: '4px 0 0 rgba(200,16,46,0.50), -4px 0 0 rgba(23,138,76,0.50)',
    lg: '6px 0 0 rgba(200,16,46,0.60), -6px 0 0 rgba(23,138,76,0.60)',
    xl: '8px 0 0 rgba(200,16,46,0.70), -8px 0 0 rgba(23,138,76,0.70)',
  },
  typeScale: {
    display: { fontSize: '88px', lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: 900 },
    h1: { fontSize: '48px', lineHeight: '0.96', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '30px', lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: 800 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: '#0E0E10',
    bgElevated: '#18181B',
    bgSunken: '#08080A',
    overlay: 'rgba(8,8,10,0.66)',
    fg: PAPER,
    fgMuted: '#C9C5BC',
    fgSubtle: '#8E8B83',
    fgInverse: '#0E0E10',
    border: '#2A2A2E',
    borderMuted: '#1F1F23',
    borderStrong: '#3A3A40',
    focus: CYAN,
    primaryBase: INK_RED,
    primaryHover: '#A50D26',
    primaryActive: '#85091E',
    primarySubtle: '#2A1216',
    primaryFg: '#FFFFFF',
    accent: INK_RED,
    accent2: INK_GREEN,
    accent3: CYAN,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-halftone-dot': 'rgba(244,241,233,0.12)',
  '--bbangto-ext-halftone-size': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-colorsep-offset': '3px',
  '--bbangto-ext-channel-r': INK_RED,
  '--bbangto-ext-channel-g': INK_GREEN,
  '--bbangto-ext-glitch-slice': '4px',
  '--bbangto-ext-misregister': 'rotate(-0.6deg) translate(2px, -1px)',
  '--bbangto-ext-paper-noise': 'rgba(244,241,233,0.04)',
};

/* 색 스킴 변형(tweak) — 망점·색분해·오정합 모티프(래퍼 CSS/shape)는 base에서 상속하고 색만 교체. */

// 라이트: 뉴스프린트 페이퍼 화이트 베이스 + 잉크 레드(다크 base의 명확한 라이트 대응).
const paperFoundations = makeColorway(foundations, {
  name: 'halftone-glitch-colorsep-01-paper',
  description: 'CMYK 망점 글리치 라이트 — 뉴스프린트 페이퍼 화이트 베이스 + 잉크 레드/그린 한정 잉크',
  semantic: makeSemantic({
    bg: '#F4F1E9', bgElevated: '#FFFFFF', bgSunken: '#E7E2D6', overlay: 'rgba(14,14,16,0.55)',
    fg: '#141414', fgMuted: '#3A3A3E', fgSubtle: '#6E6B63', fgInverse: '#F4F1E9',
    border: '#C9C4B8', borderMuted: '#DED9CD', borderStrong: '#A8A399', focus: '#0077A3',
    primaryBase: INK_RED, primaryHover: '#A50D26', primaryActive: '#85091E',
    primarySubtle: '#F6D9DE', primaryFg: '#FFFFFF',
    accent: INK_RED, accent2: INK_GREEN, accent3: '#0077A3',
  }),
});
const paperExt: Record<string, string> = {
  '--bbangto-ext-halftone-dot': 'rgba(14,14,16,0.14)',
  '--bbangto-ext-halftone-size': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-colorsep-offset': '3px',
  '--bbangto-ext-channel-r': INK_RED,
  '--bbangto-ext-channel-g': INK_GREEN,
  '--bbangto-ext-glitch-slice': '4px',
  '--bbangto-ext-misregister': 'rotate(-0.6deg) translate(2px, -1px)',
  '--bbangto-ext-paper-noise': 'rgba(14,14,16,0.05)',
};

// 액센트: 다크 베이스 유지 + 잉크 레드 → 시안 채널로 강조색 전환.
const cyanFoundations = makeColorway(foundations, {
  name: 'halftone-glitch-colorsep-01-cyan',
  description: 'CMYK 망점 글리치 다크 — 시안 잉크 전환(강조 채널 = 시안, focus = 잉크 레드)',
  semantic: makeSemantic({
    bg: '#0E0E10', bgElevated: '#18181B', bgSunken: '#08080A', overlay: 'rgba(8,8,10,0.66)',
    fg: PAPER, fgMuted: '#C9C5BC', fgSubtle: '#8E8B83', fgInverse: '#04141B',
    border: '#243036', borderMuted: '#18242A', borderStrong: '#33454E', focus: INK_RED,
    primaryBase: CYAN, primaryHover: '#0090C4', primaryActive: '#00729B',
    primarySubtle: '#0A2530', primaryFg: '#04141B',
    accent: CYAN, accent2: INK_GREEN, accent3: INK_RED,
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-halftone-dot': 'rgba(244,241,233,0.12)',
  '--bbangto-ext-halftone-size': '8px',
  '--bbangto-ext-halftone-angle': '45deg',
  '--bbangto-ext-colorsep-offset': '3px',
  '--bbangto-ext-channel-r': CYAN,
  '--bbangto-ext-channel-g': INK_GREEN,
  '--bbangto-ext-glitch-slice': '4px',
  '--bbangto-ext-misregister': 'rotate(-0.6deg) translate(2px, -1px)',
  '--bbangto-ext-paper-noise': 'rgba(244,241,233,0.04)',
};

const STYLE_ID = 'bbangto-halftone-glitch-colorsep-motif';
const CSS = `
.bbangto-halftone-glitch-colorsep-card {
  position: relative;
  border-radius: var(--bbangto-radius-sm, 2px) !important;
  border: 1.5px solid var(--bbangto-semantic-border-strong, #3A3A40) !important;
  box-shadow: 3px 0 0 rgba(200,16,46,0.45), -3px 0 0 rgba(23,138,76,0.45) !important;
  background-image:
    radial-gradient(var(--bbangto-ext-halftone-dot, rgba(244,241,233,0.12)) 22%, transparent 23%) !important;
  background-size: var(--bbangto-ext-halftone-size, 8px) var(--bbangto-ext-halftone-size, 8px) !important;
  transition: box-shadow 160ms steps(3, end), transform 160ms steps(3, end) !important;
}
.bbangto-halftone-glitch-colorsep-card:hover {
  box-shadow: 5px 0 0 rgba(200,16,46,0.62), -5px 0 0 rgba(23,138,76,0.62) !important;
  transform: var(--bbangto-ext-misregister, rotate(-0.6deg) translate(2px, -1px)) !important;
}
.bbangto-halftone-glitch-colorsep-btn {
  border-radius: var(--bbangto-radius-sm, 2px) !important;
  background: var(--bbangto-semantic-primary-base, #C8102E) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-family: 'Archivo', 'Anton', system-ui, sans-serif !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
  border: none !important;
  transition: box-shadow 120ms steps(2, end), transform 120ms steps(2, end) !important;
}
.bbangto-halftone-glitch-colorsep-btn:hover {
  box-shadow: 2px 0 0 rgba(0,174,239,0.70), -2px 0 0 rgba(23,138,76,0.70) !important;
}
.bbangto-halftone-glitch-colorsep-btn:active {
  transform: translate(var(--bbangto-ext-colorsep-offset, 3px), 0) !important;
  box-shadow: 4px 0 0 rgba(200,16,46,0.80), -4px 0 0 rgba(23,138,76,0.80) !important;
}
.bbangto-halftone-glitch-colorsep-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-focus, #00AEEF) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-halftone-glitch-colorsep-card { transition: none !important; }
  .bbangto-halftone-glitch-colorsep-card:hover { transform: none !important; }
  .bbangto-halftone-glitch-colorsep-btn { transition: none !important; }
  .bbangto-halftone-glitch-colorsep-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-halftone-glitch-colorsep-btn',
  cardClass: 'bbangto-halftone-glitch-colorsep-card',
  displayPrefix: 'HalftoneGlitchColorsep',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      lineHeight: 1.4, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-base, #C8102E)',
        color: 'var(--bbangto-semantic-primary-foreground, #FFFFFF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-border-muted, #1F1F23)',
        color: 'var(--bbangto-semantic-foreground-muted, #C9C5BC)',
      },
      solid: {
        background: 'var(--bbangto-semantic-border-focus, #00AEEF)',
        color: 'var(--bbangto-semantic-foreground-inverse, #0E0E10)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'COLORSEP 01',
  title: '어긋난 잉크가 만드는 깊이',
  tagline: '망점 스크린과 적·녹 채널 분리의 인쇄 글리치',
  body: 'CMYK 망점으로 면을 분해하고 적·녹 채널을 일부러 어긋나게 겹쳐 인쇄 오정합과 디지털 글리치가 동시에 일어난 듯한 일그러짐을 만든다. 채널 분리는 장식 레이어에만 쓰고 본문은 단일 솔리드 잉크로 또렷하게 유지한다.',
  ctaPrimary: '프레스 시작',
  ctaSecondary: '룩북 보기',
  bandTitle: '한정 잉크 2~3색, 어긋남이 곧 깊이다.',
  items: [
    { name: '망점 패널', tone: 'accent', tag: 'HALFTONE', desc: 'CMYK 스크린으로 면을 분해해 인쇄물 같은 질감을 입힌다.' },
    { name: '오정합 컷', tone: 'muted', tag: 'MISREGISTER', desc: '회전·이동으로 잘린 컷을 콜라주처럼 비스듬히 배치한다.' },
    { name: '색분해 라벨', tone: 'solid', tag: 'CHANNEL', desc: '적·녹 채널을 겹쳐 어긋난 가장자리로 깊이를 만든다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'HalftoneGlitchColorsepShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '포스터 그리드 & 레이아웃',
    dos: [
      '초대형 콘덴스트 헤드라인을 중심에 둔 포스터형 밀집 그리드로 구성한다.',
      '잘린 컷을 회전·오정합으로 비스듬히 배치해 무드보드/콜라주 감각을 만든다.',
      '채널 분리·망점은 이미지/장식 레이어에만 한정하고 본문 면은 솔리드로 둔다.',
    ],
    donts: [
      '가독 본문 텍스트에 색분해 오프셋을 직접 적용해 잔상·번짐으로 판독을 해치지 않는다.',
      '망점 잉크를 4색 이상으로 늘려 인쇄 메타포(2~3색 한정)를 흐리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '적·녹 채널 분리는 적록색맹에게 두 레이어가 동일하게 보일 수 있으니 의미를 색에만 의존하지 말고 형태·라벨을 병행한다.',
      '망점/오정합 면 위 텍스트는 단색 솔리드 배경 칩에 올려 본문 대비 WCAG AA 4.5:1 이상을 확보한다.',
      '채널 어긋남 진동·글리치 슬라이스 애니메이션은 prefers-reduced-motion: reduce 시 정적 폴백으로 멈춰 빠른 깜빡임 발작 위험을 회피한다(story play에서 검증).',
      '망점·오정합 처리한 이미지에는 반드시 대체 텍스트(alt)를 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '헤비 그로테스크 산세리프(Archivo/Anton)로 초대형 콘덴스트 헤드라인을 세우고, 캡션·라벨은 모노(IBM Plex Mono)로 보강한다.',
    requiredFonts: ['Archivo', 'Anton', 'IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Halftone_Glitch_Colorsep_01: CMYK 망점 스크린으로 면을 분해하고 적·녹(R/G) 채널을 의도적으로 어긋나게 겹쳐 인쇄 오정합 + 디지털 글리치가 동시에 일어난 듯한 일그러짐 — 망점 패턴이 색분해로 찢기는 것이 시그니처. near-black 다크 베이스 + 2~3색 한정 잉크.',
  components: {
    Button: {
      description: '솔리드 잉크 면 + 잘린 컷(radius sm) 버튼. press 시 채널이 분리되며 색분해 오프셋이 증폭된다.',
      specs: ['모서리: radius sm(2px) 잘린 컷', '채움: 솔리드 잉크 레드', '텍스트: 헤비 그로테스크 대문자', 'active: colorsep-offset translate + 적·녹 분리 증폭', 'focus-visible: 시안 outline'],
    },
    Card: {
      description: '망점 스크린으로 채운 패널. 드롭섀도 대신 적·녹 채널 어긋남이 깊이를 만들고, hover에서 오정합이 증폭된다.',
      specs: ['모서리: radius sm(2px)', '깊이: 적·녹 채널 colorsep box-shadow', '질감: halftone-dot radial-gradient 망점', 'hover: misregister 회전·이동 증폭', 'reduce-motion: 어긋남 애니 비활성'],
    },
    Tag: {
      description: '인쇄 스티커풍 모노 라벨(잘린 모서리). accent=잉크 레드, muted=중립 다크, solid=시안.',
      specs: ['모서리: radius sm(2px)', '폰트: IBM Plex Mono 대문자', '텍스트: letter-spacing 0.1em', '색: ink-red / neutral-dark / cyan'],
    },
  },
  example: Showcase,
};

export const halftoneGlitchColorsepWrappers = wrapperComponents;
export const HalftoneGlitchColorsepShowcase = Showcase;

export const halftoneGlitchColorsepStyleGuide: StyleGuide = {
  name: 'halftone-glitch-colorsep-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (Near-black + 잉크 레드)', foundations, extendedFoundations },
    { key: 'paper', label: '페이퍼 (뉴스프린트 라이트)', foundations: paperFoundations, extendedFoundations: paperExt },
    { key: 'cyan', label: '시안 액센트 (다크)', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HalftoneGlitchColorsepShowcase: Showcase },
  guidelines,
  visualMotif,
};
