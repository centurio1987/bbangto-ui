import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Punk_Grunge_Graffiti_01 — 제록스로 복사하고 찢어 벽에 덧붙인 펑크 진(zine)·그래피티 미학.
 *
 * 더러운 콘크리트/뉴스프린트 그레이·오프블랙 베이스 + 형광 스폿(하이라이터 옐로/핫 마젠타/
 * 알람 레드)을 거칠게 충돌. radius 0(찢긴 종이), soft 그림자 대신 하드 오프셋과 하프톤
 * 거칠기·레이어 겹침으로 깊이를 만든다. 요소를 미세 회전(jitter)시켜 그리드를 깬다.
 */

const INK = '#14110F'; // 오프블랙(러프 잉크) — 본문/보더/primary 베이스
const SPOT_YELLOW = '#E8FF00'; // 하이라이터 옐로 스폿
const MAGENTA = '#FF2D78'; // 핫 마젠타 스폿
const ALARM_RED = '#E4002B'; // 알람 레드 스폿
const NEWSPRINT = '#E8E5DD'; // 뉴스프린트/복사 그레이 베이스(순백 아님)
const PHOTOCOPY = '#F4F2EC'; // 복사기 번짐 톤 화이트

const foundations = makeFoundations({
  name: 'punk-grunge-graffiti-01',
  description:
    '제록스 하프톤·찢긴 가장자리·스프레이/낙서가 그리드를 깨는 펑크 진 그래피티 — 오프블랙 + 형광 스폿(옐로/마젠타) 충돌',
  fontSans: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
  fontMono: "'Stardos Stencil', 'Courier New', monospace",
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: `2px 2px 0 ${INK}`,
    md: `4px 4px 0 ${INK}`,
    lg: `6px 6px 0 ${INK}`,
    xl: `8px 8px 0 ${INK}`,
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '0.94', letterSpacing: '-0.03em', fontWeight: 800 },
    h1: { fontSize: '44px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '30px', lineHeight: '1.12', letterSpacing: '-0.01em', fontWeight: 800 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: NEWSPRINT,
    bgElevated: PHOTOCOPY,
    bgSunken: '#D6D2C8',
    overlay: 'rgba(20,17,15,0.62)',
    fg: INK,
    fgMuted: '#3A352F',
    fgSubtle: '#6B655C',
    fgInverse: PHOTOCOPY,
    border: '#1A1714',
    borderMuted: '#B8B2A6',
    borderStrong: INK,
    focus: MAGENTA,
    primaryBase: INK,
    primaryHover: '#000000',
    primaryActive: '#000000',
    primarySubtle: '#F0EDE4',
    primaryFg: SPOT_YELLOW,
    accent: SPOT_YELLOW,
    accent2: MAGENTA,
    accent3: ALARM_RED,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-halftone': 'radial-gradient(circle, rgba(20,17,15,0.18) 1px, transparent 1.4px)',
  '--bbangto-ext-photocopy-grain': 'contrast(1.18) grayscale(0.15) brightness(0.98)',
  '--bbangto-ext-torn-edge':
    'polygon(0% 3%, 4% 0%, 12% 4%, 24% 0%, 38% 5%, 52% 0%, 66% 4%, 80% 0%, 92% 5%, 100% 2%, 100% 97%, 94% 100%, 80% 96%, 64% 100%, 48% 96%, 32% 100%, 18% 96%, 6% 100%, 0% 97%)',
  '--bbangto-ext-spray': `radial-gradient(circle at 20% 30%, ${MAGENTA} 0 2px, transparent 3px), radial-gradient(circle at 72% 64%, ${SPOT_YELLOW} 0 1.5px, transparent 2.5px)`,
  '--bbangto-ext-scribble': `repeating-linear-gradient(135deg, ${INK} 0 2px, transparent 2px 5px)`,
  '--bbangto-ext-tape-grunge': 'rgba(232,255,0,0.55)',
  '--bbangto-ext-marker-stroke': `linear-gradient(${SPOT_YELLOW}, ${SPOT_YELLOW})`,
  '--bbangto-ext-rotate-jitter': '-1.5deg',
  '--bbangto-ext-spot-color': SPOT_YELLOW,
  '--bbangto-ext-misregister': `2px 0 0 ${MAGENTA}, -2px 0 0 ${ALARM_RED}`,
};

const STYLE_ID = 'bbangto-punk-grunge-graffiti-motif';
const CSS = `
.bbangto-punk-grunge-graffiti-card {
  position: relative !important;
  border-radius: 0 !important;
  border: 2px solid var(--bbangto-semantic-border-strong, ${INK}) !important;
  box-shadow: 5px 5px 0 var(--bbangto-semantic-border-strong, ${INK}) !important;
  background-color: var(--bbangto-semantic-background-elevated, ${PHOTOCOPY}) !important;
  background-image: var(--bbangto-ext-halftone, radial-gradient(circle, rgba(20,17,15,0.18) 1px, transparent 1.4px)) !important;
  background-size: 6px 6px !important;
  transform: rotate(var(--bbangto-ext-rotate-jitter, -1.5deg)) !important;
  transition: transform 160ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.bbangto-punk-grunge-graffiti-card:hover {
  transform: rotate(1.5deg) translateY(-2px) !important;
  box-shadow: 8px 8px 0 var(--bbangto-semantic-border-strong, ${INK}) !important;
}
.bbangto-punk-grunge-graffiti-btn {
  position: relative !important;
  border-radius: 0 !important;
  background: var(--bbangto-semantic-primary-base, ${INK}) !important;
  color: var(--bbangto-semantic-primary-foreground, ${SPOT_YELLOW}) !important;
  font-family: 'Archivo', 'Helvetica Neue', Arial, sans-serif !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  border: 2px solid ${INK} !important;
  box-shadow: 3px 3px 0 var(--bbangto-ext-spot-color, ${SPOT_YELLOW}) !important;
  transform: rotate(-1deg) !important;
  transition: transform 120ms ease, box-shadow 120ms ease !important;
}
.bbangto-punk-grunge-graffiti-btn:hover {
  transform: rotate(1.5deg) !important;
  box-shadow: 4px 4px 0 var(--bbangto-ext-spot-color, ${SPOT_YELLOW}) !important;
}
.bbangto-punk-grunge-graffiti-btn:active {
  transform: rotate(0deg) translate(2px, 2px) !important;
  box-shadow: 1px 1px 0 var(--bbangto-ext-spot-color, ${SPOT_YELLOW}) !important;
}
.bbangto-punk-grunge-graffiti-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-border-focus, ${MAGENTA}) !important;
  outline-offset: 2px !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-punk-grunge-graffiti-card,
  .bbangto-punk-grunge-graffiti-btn { transition: none !important; }
  .bbangto-punk-grunge-graffiti-card:hover { transform: rotate(var(--bbangto-ext-rotate-jitter, -1.5deg)) !important; }
  .bbangto-punk-grunge-graffiti-btn:hover,
  .bbangto-punk-grunge-graffiti-btn:active { transform: rotate(-1deg) !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-punk-grunge-graffiti-btn',
  cardClass: 'bbangto-punk-grunge-graffiti-card',
  displayPrefix: 'PunkGrungeGraffiti',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      border: `2px solid ${INK}`, fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1.4,
      textTransform: 'uppercase', whiteSpace: 'nowrap', transform: 'rotate(-2deg)',
    },
    tones: {
      accent: { background: INK, color: SPOT_YELLOW },
      muted: { background: NEWSPRINT, color: INK },
      solid: { background: MAGENTA, color: INK },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'XEROX ZINE',
  title: '복사하고 찢어 붙인 선언문',
  tagline: '그리드를 부수는 펑크 진 콜라주',
  body: '제록스 하프톤 패널을 찢어 테이프로 겹쳐 붙이고, 스프레이와 낙서로 형광 스폿을 충돌시킨다. 매끈함 대신 거칠기로, 정렬 대신 회전으로 외친다.',
  ctaPrimary: '진 펼치기',
  ctaSecondary: '포스터 보기',
  bandTitle: '거칠게, 시끄럽게, 규칙 없이 — 벽에 붙이는 한 장.',
  items: [
    { name: '헤드라인 포스터', tone: 'accent', tag: 'SPRAY', desc: '스프레이 디스플레이와 형광 스폿으로 첫 외침을 만든다.' },
    { name: '진 페이지', tone: 'muted', tag: 'XEROX', desc: '제록스 하프톤 패널을 찢어 테이프로 겹쳐 붙인다.' },
    { name: '스티커 칩', tone: 'solid', tag: 'RANSOM', desc: '랜섬노트 라벨과 잉크 스탬프로 강조를 박는다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'PunkGrungeGraffitiShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '콜라주 & 레이아웃',
    dos: [
      '그리드를 의도적으로 깨되, 1차 액션과 핵심 카피는 한 영역에 모아 위계를 확보한다.',
      '형광 스폿(옐로/마젠타/레드)은 강조에만 1~2개로 절제해 충돌시킨다.',
      '거친 텍스처(하프톤/그레인)는 배경·장식 레이어에 두고 요소를 음수 마진·미세 회전으로 겹친다.',
    ],
    donts: [
      '모든 글자를 핸드라이팅·랜섬노트로 처리해 가독성을 무너뜨리지 않는다.',
      '본문 텍스트 위에 하프톤/그레인을 직접 깔지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '형광 옐로/마젠타를 화이트·복사 그레이 배경 위 본문에 직접 쓰지 않는다 — 본문·인터랙티브 텍스트는 오프블랙(#14110F) 기반으로 대비 4.5:1을 강제한다.',
      '텍스처 위 텍스트에는 솔리드 백킹 칩을 깔아 가독성을 확보한다.',
      '회전·jitter 요소도 터치 타깃 44x44px와 포커스 링(마젠타 outline) 가시성을 유지한다.',
      '스프레이/낙서로 표현된 텍스트를 이미지화할 때 대체텍스트를 반드시 제공한다.',
      'misregister·grain 애니메이션은 prefers-reduced-motion: reduce에서 정적으로 고정한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '거친 그로테스크 산세리프(Archivo/Helvetica류) 본문 + 마커·핸드라이팅·스텐실 디스플레이를 혼합하되, 가독 본문은 그로테스크 산세리프로 유지한다.',
    requiredFonts: ['Archivo', 'Helvetica Neue', 'Permanent Marker', 'Stardos Stencil'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Punk_Grunge_Graffiti_01: 제록스 하프톤 거칠기·찢긴 가장자리·스프레이/낙서 마크가 그리드를 깨고 공격적으로 겹쳐지는 반정제 카오스 콜라주. 오프블랙 + 형광 스폿(옐로/마젠타/레드) 충돌이 시그니처.',
  components: {
    Button: {
      description: '오프블랙 채움 + 형광 스폿 하드 오프셋 그림자, 미세 회전. 호버 시 jitter 회전한다.',
      specs: ['모서리: radius 0(찢긴 클립)', '채움: 오프블랙 + 형광 옐로 텍스트', '그림자: 형광 스폿 하드 오프셋', 'base/hover: 미세 회전 jitter', 'active: 눌림 translate', 'focus-visible: 마젠타 outline', 'reduce-motion: jitter 고정'],
    },
    Card: {
      description: '제록스 하프톤 패널 + 하드 보더/오프셋. 미세 회전으로 겹쳐 쌓는 진 페이지.',
      specs: ['모서리: radius 0', '배경: 하프톤 도트 + 복사 화이트', '보더: 2px 오프블랙', '그림자: 하드 오프셋', 'base: -1.5deg 회전', 'hover: 반대 회전·lift', 'reduce-motion: 회전 고정'],
    },
    Tag: {
      description: '랜섬노트/스텐실 칩. accent=옐로 스텐실, muted=뉴스프린트, solid=마젠타 스티커.',
      specs: ['모서리: radius 0', '회전: -2deg', '폰트: Archivo 800 uppercase', '색: 옐로 스텐실 / 뉴스프린트 / 마젠타 스티커'],
    },
  },
  example: Showcase,
};

export const punkGrungeGraffitiWrappers = wrapperComponents;
export const PunkGrungeGraffitiShowcase = Showcase;

export const punkGrungeGraffitiStyleGuide: StyleGuide = {
  name: 'punk-grunge-graffiti-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { PunkGrungeGraffitiShowcase: Showcase },
  guidelines,
  visualMotif,
};
