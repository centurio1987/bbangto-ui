import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Naive_Doodle_01 — 비숙련 어린아이의 크레용 낙서·스크리블 미학.
 *
 * 오프화이트 노트/스케치북 배경 + 원색 마커 다색(빨강/파랑/노랑/핑크/초록)을
 * 천진하게 충돌시킨다. 삐뚤빼뚤한 손그림 윤곽선(이중 라인 흉내), 영역을 벗어난
 * 크레용 채색, 불규칙 radius, 살짝 회전·어긋난 정렬이 시그니처. 본문은 가독용
 * 둥근 산세리프로 대비를 강제하고, 낙서 폰트는 헤드/강조에만 쓴다.
 */

const INK = '#1F2430';
const CRAYON_RED = '#D62828';
const MARKER_BLUE = '#2D6FE0';
const MARKER_YELLOW = '#F2B705';
const MARKER_GREEN = '#2E9E5B';
const MARKER_PINK = '#E5559B';
const WOBBLE_RADIUS = '255px 15px 225px 15px / 15px 225px 15px 255px';

const foundations = makeFoundations({
  name: 'naive-doodle-01',
  description: '크레용 낙서·스크리블 미학 — 오프화이트 노트 배경, 원색 마커 다색, 삐뚤한 손그림 윤곽선과 영역을 벗어난 채색',
  fontSans: "'Quicksand', 'Nunito', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '12px', lg: '22px', xl: '34px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '2px 2px 0 rgba(31,36,48,0.85)',
    md: '3px 3px 0 rgba(31,36,48,0.85)',
    lg: '4px 5px 0 rgba(31,36,48,0.85)',
    xl: '6px 7px 0 rgba(31,36,48,0.85)',
  },
  typeScale: {
    display: { fontSize: '64px', lineHeight: '1.02', letterSpacing: '0em', fontWeight: 700 },
    h1: { fontSize: '38px', lineHeight: '1.1', letterSpacing: '0em', fontWeight: 700 },
    h2: { fontSize: '26px', lineHeight: '1.2', letterSpacing: '0em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FFFDF7',
    bgElevated: '#FFFFFF',
    bgSunken: '#F4F1E8',
    overlay: 'rgba(31,36,48,0.45)',
    fg: INK,
    fgMuted: '#4A4F5C',
    fgSubtle: '#7A7F8A',
    fgInverse: '#FFFFFF',
    border: INK,
    borderMuted: '#C9C4B8',
    borderStrong: '#10131A',
    focus: MARKER_BLUE,
    primaryBase: CRAYON_RED,
    primaryHover: '#B81E1E',
    primaryActive: '#9A1818',
    primarySubtle: '#FCE8E8',
    primaryFg: '#FFFFFF',
    accent: MARKER_BLUE,
    accent2: MARKER_YELLOW,
    accent3: MARKER_GREEN,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-scribble-stroke': `2.5px solid ${INK}`,
  '--bbangto-ext-scribble-fill': `radial-gradient(circle at 30% 20%, rgba(245,183,5,0.18), transparent 60%), radial-gradient(circle at 80% 70%, rgba(45,111,224,0.14), transparent 55%)`,
  '--bbangto-ext-doodle-arrow': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 24'%3E%3Cpath d='M2 14 C14 4 30 4 44 12' fill='none' stroke='%231F2430' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M44 12 L36 8 M44 12 L38 18' fill='none' stroke='%231F2430' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  '--bbangto-ext-wobble-path': WOBBLE_RADIUS,
  '--bbangto-ext-crayon-texture': `repeating-linear-gradient(48deg, rgba(31,36,48,0.05) 0 2px, transparent 2px 5px)`,
  '--bbangto-ext-marker-palette': `${CRAYON_RED}, ${MARKER_BLUE}, ${MARKER_YELLOW}, ${MARKER_PINK}, ${MARKER_GREEN}`,
};

/* 색 스킴 변형(colorway) — 낙서 모티프(wobble radius·오프셋 그림자·회전)는 base에서 상속, 색만 교체. */

const CHALK = '#F5F1E6';

const darkFoundations = makeColorway(foundations, {
  name: 'naive-doodle-01-dark',
  description: '크레용 낙서 다크 — 칠판(잉크 슬레이트) 배경 위 분필 오프화이트 윤곽선과 형광 마커 다색',
  semantic: makeSemantic({
    bg: '#22252E', bgElevated: '#2A2E3A', bgSunken: '#191C24', overlay: 'rgba(0,0,0,0.55)',
    fg: CHALK, fgMuted: '#C4C0B4', fgSubtle: '#918D83', fgInverse: '#1F2430',
    border: CHALK, borderMuted: '#4A4F5C', borderStrong: '#FFFFFF', focus: '#6FA8FF',
    primaryBase: '#FF6B6B', primaryHover: '#FF8585', primaryActive: '#E05252',
    primarySubtle: '#4A2A2A', primaryFg: '#22252E',
    accent: '#6FA8FF', accent2: '#FFD23F', accent3: '#5BD98A',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-scribble-stroke': `2.5px solid ${CHALK}`,
  '--bbangto-ext-scribble-fill': `radial-gradient(circle at 30% 20%, rgba(255,210,63,0.20), transparent 60%), radial-gradient(circle at 80% 70%, rgba(111,168,255,0.18), transparent 55%)`,
  '--bbangto-ext-doodle-arrow': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 24'%3E%3Cpath d='M2 14 C14 4 30 4 44 12' fill='none' stroke='%23F5F1E6' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M44 12 L36 8 M44 12 L38 18' fill='none' stroke='%23F5F1E6' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  '--bbangto-ext-wobble-path': WOBBLE_RADIUS,
  '--bbangto-ext-crayon-texture': `repeating-linear-gradient(48deg, rgba(245,241,230,0.06) 0 2px, transparent 2px 5px)`,
  '--bbangto-ext-marker-palette': `#FF6B6B, #6FA8FF, #FFD23F, #FF8AC6, #5BD98A`,
};

const NAVY = '#17233A';

const blueFoundations = makeColorway(foundations, {
  name: 'naive-doodle-01-blue',
  description: '크레용 낙서 블루 — 쿨 오프화이트 종이 위 마커 블루 주색과 핑크 포커스로 전환한 강조 변형',
  semantic: makeSemantic({
    bg: '#F7FBFF', bgElevated: '#FFFFFF', bgSunken: '#E8F0FA', overlay: 'rgba(23,35,58,0.45)',
    fg: NAVY, fgMuted: '#46536B', fgSubtle: '#78829A', fgInverse: '#FFFFFF',
    border: NAVY, borderMuted: '#BFCBDD', borderStrong: '#0C1526', focus: '#E5559B',
    primaryBase: '#2D6FE0', primaryHover: '#205BC4', primaryActive: '#184AA0',
    primarySubtle: '#DCEAFC', primaryFg: '#FFFFFF',
    accent: '#E5559B', accent2: '#F2B705', accent3: '#2E9E5B',
  }),
});
const blueExt: Record<string, string> = {
  '--bbangto-ext-scribble-stroke': `2.5px solid ${NAVY}`,
  '--bbangto-ext-scribble-fill': `radial-gradient(circle at 30% 20%, rgba(242,183,5,0.16), transparent 60%), radial-gradient(circle at 80% 70%, rgba(45,111,224,0.20), transparent 55%)`,
  '--bbangto-ext-doodle-arrow': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 24'%3E%3Cpath d='M2 14 C14 4 30 4 44 12' fill='none' stroke='%2317233A' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M44 12 L36 8 M44 12 L38 18' fill='none' stroke='%2317233A' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  '--bbangto-ext-wobble-path': WOBBLE_RADIUS,
  '--bbangto-ext-crayon-texture': `repeating-linear-gradient(48deg, rgba(23,35,58,0.06) 0 2px, transparent 2px 5px)`,
  '--bbangto-ext-marker-palette': `#2D6FE0, #E5559B, #F2B705, #2E9E5B, #D62828`,
};

const STYLE_ID = 'bbangto-naive-doodle-motif';
const CSS = `
.bbangto-naive-doodle-card {
  background: var(--bbangto-semantic-background-elevated, #FFFFFF) !important;
  border: var(--bbangto-ext-scribble-stroke, 2.5px solid ${INK}) !important;
  border-radius: var(--bbangto-ext-wobble-path, ${WOBBLE_RADIUS}) !important;
  box-shadow: 3px 3px 0 rgba(31,36,48,0.85) !important;
  background-image: var(--bbangto-ext-scribble-fill) !important;
  transform: rotate(-0.6deg);
  transition: transform 200ms ease, box-shadow 200ms ease !important;
}
.bbangto-naive-doodle-card:hover {
  transform: rotate(0.4deg) translateY(-2px);
  box-shadow: 5px 6px 0 rgba(31,36,48,0.85) !important;
}
.bbangto-naive-doodle-btn {
  background: var(--bbangto-semantic-primary-base, ${CRAYON_RED}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  border: 2.5px solid ${INK} !important;
  border-radius: 18px 9px 20px 8px / 9px 18px 8px 20px !important;
  font-family: 'Quicksand', 'Nunito', system-ui, sans-serif !important;
  font-weight: 700 !important;
  box-shadow: 2px 2px 0 rgba(31,36,48,0.85) !important;
  transform: rotate(-1deg);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease !important;
}
.bbangto-naive-doodle-btn:hover {
  background: var(--bbangto-semantic-primary-hover, #B81E1E) !important;
  transform: rotate(0.6deg) translateY(-1px);
}
.bbangto-naive-doodle-btn:active {
  transform: rotate(0deg) translateY(2px);
  box-shadow: 0 0 0 rgba(31,36,48,0.85) !important;
}
.bbangto-naive-doodle-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus, ${MARKER_BLUE}) !important;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-naive-doodle-card { transition: none !important; transform: none !important; }
  .bbangto-naive-doodle-card:hover { transform: none !important; }
  .bbangto-naive-doodle-btn { transition: none !important; transform: none !important; }
  .bbangto-naive-doodle-btn:hover { transform: none !important; }
  .bbangto-naive-doodle-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-naive-doodle-btn',
  cardClass: 'bbangto-naive-doodle-card',
  displayPrefix: 'NaiveDoodle',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 11px',
      border: `2px solid ${INK}`, borderRadius: '12px 5px 13px 4px / 5px 12px 4px 13px',
      fontFamily: "'Quicksand', 'Nunito', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.5, whiteSpace: 'nowrap',
      transform: 'rotate(-1.5deg)',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: `var(--bbangto-semantic-primary-subtle, #E7F0FD)`,
        color: `var(--bbangto-semantic-primary-active, ${MARKER_BLUE})`,
      },
      muted: {
        background: `var(--bbangto-semantic-background-sunken, #F4F1E8)`,
        color: `var(--bbangto-semantic-foreground-muted, #4A4F5C)`,
      },
      solid: {
        background: `var(--bbangto-semantic-primary-base, ${CRAYON_RED})`,
        color: `var(--bbangto-semantic-primary-foreground, #fff)`,
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'DOODLE 01',
  title: '손으로 그린 듯한 낙서 보드',
  tagline: '삐뚤빼뚤해도 즐거운 크레용 스크리블',
  body: '오프화이트 노트 위에 원색 마커가 천진하게 부딪힌다. 영역을 살짝 벗어난 채색과 삐뚤한 윤곽선, 살짝 어긋난 정렬이 어린아이의 낙서 같은 에너지를 만든다. 본문은 둥근 산세리프로 또렷하게 읽힌다.',
  ctaPrimary: '낙서 시작',
  ctaSecondary: '스케치 보기',
  bandTitle: '규칙은 삐뚤어도, 가독성은 또렷하게.',
  items: [
    { name: '스케치 카드', tone: 'accent', tag: 'SKETCH', desc: '삐뚤한 손그림 보더로 둘러싼 메모 패널. 살짝 기울어 생동감을 준다.' },
    { name: '노트 카드', tone: 'muted', tag: 'NOTE', desc: '오프화이트 노트 톤의 차분한 카드로 본문을 또렷하게 담는다.' },
    { name: '강조 카드', tone: 'solid', tag: 'POP', desc: '크레용 레드로 채운 강조 패널. 화살표·동그라미 주석과 잘 어울린다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'NaiveDoodleShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '낙서 레이아웃 & 구성',
    dos: [
      '낙서·채색·화살표 주석은 별도 장식 레이어로 분리해 콘텐츠 영역과 구분한다.',
      '카드·버튼을 미세하게(-1.5°~+0.6°) 회전·어긋나게 배치해 손그림 에너지를 준다.',
      '강조는 doodle annotation(화살표/동그라미/별표)으로 헤드라인 주변에만 얹는다.',
    ],
    donts: [
      '본문 텍스트 전체를 손글씨 폰트로 깔아 가독성을 희생하지 않는다.',
      '원색 채색을 텍스트 바로 뒤에 깔아 대비를 무너뜨리지 않는다.',
      '정렬 어긋남·회전이 버튼 터치 타깃(44x44px)을 침범하게 두지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 원색 마커 채도 충돌·삐뚤 보더로 대비/포커스 가시성이 취약하다 — 본문 텍스트는 잉크(#1F2430) 등 AA(4.5:1 이상) 색쌍을 별도 토큰으로 강제한다.',
      '크레용 채색(scribble-fill)은 텍스트 뒤에 깔지 않고 카드 배경 장식으로만 사용한다.',
      '포커스 링은 낙서에 묻히지 않도록 단색 고대비(마커 블루) 3px outline + offset으로 고정한다.',
      '손그림 화살표·픽토그램 등 의미 없는 장식은 aria-hidden, 의미 전달 이미지엔 대체텍스트를 제공한다.',
      '회전·어긋남이 있어도 버튼/액션 터치 타깃은 최소 44x44px를 유지한다.',
      'hover/active의 회전·이동 모션은 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문·라벨은 가독용 둥근 산세리프(Quicksand/Nunito)로, 크레용/키즈 핸드라이팅(Schoolbell/Gloria Hallelujah)은 헤드·강조에만 제한적으로 쓴다.',
    requiredFonts: ['Quicksand', 'Nunito', 'Schoolbell', 'Gloria Hallelujah'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Naive_Doodle_01: 비숙련 어린아이의 크레용 낙서·스크리블 — 영역을 삐져나간 채색, 삐뚤한 윤곽선, 화살표·동그라미·별표 주석이 천진한 카오스로 화면을 채운다. 본문은 둥근 산세리프로 또렷하게 읽힌다.',
  components: {
    Button: {
      description: '삐뚤한 손그림 보더 + 이중 라인 흉내의 오프셋 그림자를 두른 크레용 레드 버튼. 살짝 회전돼 있고 press 시 곧게 가라앉는다.',
      specs: ['보더: 2.5px 잉크 손그림 윤곽', '모서리: 불규칙 wobble radius', '그림자: 2px 오프셋 더블-라인', 'rest: 미세 회전(-1deg)', 'active: 회전 0 + 가라앉음', 'focus-visible: 마커 블루 3px outline'],
    },
    Card: {
      description: '삐뚤한 손그림 보더로 둘러싼 스케치 패널. 크레용 채색 텍스처가 배경에 깔리고 살짝 기울어 있으며 hover에서 반대로 기울며 떠오른다.',
      specs: ['보더: 2.5px 잉크 scribble-stroke', '모서리: wobble-path 불규칙 radius', '배경: scribble-fill 채색 텍스처', 'rest: 회전(-0.6deg)', 'hover: 반대 회전 + 2px lift', 'reduce-motion: 회전/모션 비활성'],
    },
    Tag: {
      description: '스티커형 낙서 라벨. 삐뚤한 보더와 미세 회전. accent=마커 블루, muted=노트 중립, solid=크레용 레드.',
      specs: ['보더: 2px 잉크', '모서리: 불규칙 radius', 'rest: 회전(-1.5deg)', '폰트: Quicksand 700', '색: blue-subtle / neutral / crayon-red'],
    },
  },
  example: Showcase,
};

export const naiveDoodleWrappers = wrapperComponents;
export const NaiveDoodleShowcase = Showcase;

export const naiveDoodleStyleGuide: StyleGuide = {
  name: 'naive-doodle-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (크레용 레드 · 오프화이트 노트)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (칠판 · 분필 윤곽선)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'blue', label: '마커 블루 액센트 (쿨 종이)', foundations: blueFoundations, extendedFoundations: blueExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NaiveDoodleShowcase: Showcase },
  guidelines,
  visualMotif,
};
