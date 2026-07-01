import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Neobrutalism_Editorial_01 — "소프트웨어 베이커리" 모티프.
 *
 * 크림 캔버스 + 잉크 2px 실선 테두리 + 각진 모서리(radius 0) + 골드 하드 오프셋 그림자,
 * IBM Plex Sans/Mono. 최초 손저작 플래그십을 공용 factory(makeFoundations/makeMotifWrappers/
 * makeShowcase)로 표준 편입해 다른 49종과 동일 구조 + 색 스킴 preset을 갖춘다.
 * 슬러그 'neobrutalism-editorial-01'은 카탈로그 정체성이므로 절대 보존한다.
 */

/** 단일 출처 모티프 상수 — foundations/extendedFoundations 양쪽에서 참조(색 drift 방지). */
const BAKERY = {
  ink: '#1C1B17',
  inkHover: '#2A2823',
  inkActive: '#000000',
  cream: '#FAF2DD',
  paper: '#FFFCF2',
  creamSunken: '#F3E8C9',
  gold: '#E9C766',
  goldHover: '#DDB94E',
  green: '#C2D3B4',
  pink: '#ECC3C8',
  muted: '#4A463C',
  subtle: '#6E6A5E',
  faint: '#9A9483',
  borderWidth: '2px',
} as const;

/** 잉크 기반 하드 오프셋 그림자(blur 0). */
const inkOffset = (n: number) => `${n}px ${n}px 0 ${BAKERY.ink}`;
/** 골드 오프셋 그림자 — 버튼 모티프의 시그니처. */
const BAKERY_OFFSET_SHADOW = `3px 3px 0 ${BAKERY.gold}`;

const foundations = makeFoundations({
  name: 'neobrutalism-editorial-01',
  description: '네오브루탈리즘 소프트웨어 베이커리 — 크림·잉크·골드, 각진 모서리, 하드 오프셋 그림자',
  fontSans: "'IBM Plex Sans KR', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: { none: 'none', sm: inkOffset(2), md: inkOffset(3), lg: inkOffset(5), xl: inkOffset(8) },
  typeScale: {
    display: { fontSize: '96px', lineHeight: '0.9', letterSpacing: '0.04em', fontWeight: 700 },
    h1: { fontSize: '38px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: 700 },
    h3: { fontSize: '20px', lineHeight: '1.3', letterSpacing: '0', fontWeight: 700 },
    body: { fontSize: '16px', lineHeight: '1.75', letterSpacing: '0', fontWeight: 400 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  neutral: {
    0: BAKERY.ink, 10: '#221F1A', 20: '#3A3833', 30: '#4A463C', 40: BAKERY.subtle,
    50: '#857F70', 60: BAKERY.faint, 70: '#B9B19C', 80: '#D8CFB5', 90: BAKERY.creamSunken,
    95: BAKERY.cream, 99: BAKERY.paper, 100: '#ffffff',
  },
  semantic: makeSemantic({
    bg: BAKERY.cream, bgElevated: BAKERY.paper, bgSunken: BAKERY.creamSunken, overlay: 'rgba(28,27,23,0.55)',
    fg: BAKERY.ink, fgMuted: BAKERY.muted, fgSubtle: BAKERY.subtle, fgInverse: BAKERY.cream,
    border: BAKERY.ink, borderMuted: '#3A3833', borderStrong: BAKERY.ink, focus: BAKERY.gold,
    primaryBase: BAKERY.ink, primaryHover: BAKERY.inkHover, primaryActive: BAKERY.inkActive,
    primarySubtle: BAKERY.gold, primaryFg: BAKERY.cream,
    accent: BAKERY.gold, accent2: BAKERY.green, accent3: BAKERY.pink,
    error: { base: '#C0392B', hover: '#A93226', active: '#922B21', subtle: '#F5D8D3', foreground: BAKERY.cream },
    success: { base: '#5C7A4A', hover: '#4E6840', active: '#3F5534', subtle: BAKERY.green, foreground: BAKERY.cream },
    warning: { base: '#B8860B', hover: '#A2770A', active: '#8A6508', subtle: BAKERY.gold, foreground: BAKERY.ink },
    disabled: { background: BAKERY.creamSunken, foreground: BAKERY.faint, border: '#C9BFA3' },
    category: {
      planning: '#5C7A4A', architecture: BAKERY.ink, strategy: '#C0392B', tech: '#B8860B',
      design: BAKERY.pink, research: BAKERY.green, quality: '#5C7A4A', leadership: BAKERY.gold,
    },
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-ink': BAKERY.ink,
  '--bbangto-ext-paper': BAKERY.paper,
  '--bbangto-ext-accent': BAKERY.gold,
  '--bbangto-ext-accent-app': BAKERY.green,
  '--bbangto-ext-accent-infra': BAKERY.pink,
  '--bbangto-ext-border-width': BAKERY.borderWidth,
  '--bbangto-ext-offset-shadow': BAKERY_OFFSET_SHADOW,
};

/* 색 스킴 변형(tweak) — 잉크 테두리/각진 모서리/하드 오프셋 모티프는 base에서 상속(makeColorway). */

// 미드나잇 — 잉크/크림 반전 다크. 골드 CTA.
const midnightFoundations = makeColorway(foundations, {
  name: 'neobrutalism-editorial-01-midnight',
  description: '네오브루탈리즘 다크 — 잉크 캔버스 + 크림 잉크선 + 골드 CTA',
  semantic: makeSemantic({
    bg: BAKERY.ink, bgElevated: '#2A2823', bgSunken: '#141310', overlay: 'rgba(0,0,0,0.6)',
    fg: BAKERY.cream, fgMuted: '#C9C2AE', fgSubtle: '#9A9483', fgInverse: BAKERY.ink,
    border: BAKERY.cream, borderMuted: '#3A3833', borderStrong: BAKERY.cream, focus: BAKERY.gold,
    primaryBase: BAKERY.gold, primaryHover: BAKERY.goldHover, primaryActive: '#C9A63F',
    primarySubtle: '#3A3833', primaryFg: BAKERY.ink,
    accent: BAKERY.gold, accent2: BAKERY.green, accent3: BAKERY.pink,
    warning: { base: BAKERY.gold, hover: BAKERY.goldHover, active: '#C9A63F', subtle: '#3A3833', foreground: BAKERY.ink },
  }),
});
const midnightExt: Record<string, string> = {
  '--bbangto-ext-ink': BAKERY.cream,
  '--bbangto-ext-paper': '#2A2823',
  '--bbangto-ext-accent': BAKERY.gold,
  '--bbangto-ext-accent-app': BAKERY.green,
  '--bbangto-ext-accent-infra': BAKERY.pink,
  '--bbangto-ext-border-width': BAKERY.borderWidth,
  '--bbangto-ext-offset-shadow': `3px 3px 0 ${BAKERY.cream}`,
};

// 베리 — 라이트 크림 유지, 강조색만 골드→베리로 전환(accent 변형).
const BERRY = '#C2557A';
const berryFoundations = makeColorway(foundations, {
  name: 'neobrutalism-editorial-01-berry',
  description: '네오브루탈리즘 베리 액센트 — 크림 캔버스, 골드→베리 강조',
  semantic: makeSemantic({
    bg: BAKERY.cream, bgElevated: BAKERY.paper, bgSunken: BAKERY.creamSunken, overlay: 'rgba(28,27,23,0.55)',
    fg: BAKERY.ink, fgMuted: BAKERY.muted, fgSubtle: BAKERY.subtle, fgInverse: BAKERY.cream,
    border: BAKERY.ink, borderMuted: '#3A3833', borderStrong: BAKERY.ink, focus: BERRY,
    primaryBase: BAKERY.ink, primaryHover: BAKERY.inkHover, primaryActive: BAKERY.inkActive,
    primarySubtle: '#E6B3C3', primaryFg: BAKERY.cream,
    accent: BERRY, accent2: BAKERY.green, accent3: BAKERY.pink,
  }),
});
const berryExt: Record<string, string> = {
  '--bbangto-ext-ink': BAKERY.ink,
  '--bbangto-ext-paper': BAKERY.paper,
  '--bbangto-ext-accent': BERRY,
  '--bbangto-ext-accent-app': BAKERY.green,
  '--bbangto-ext-accent-infra': BAKERY.pink,
  '--bbangto-ext-border-width': BAKERY.borderWidth,
  '--bbangto-ext-offset-shadow': `3px 3px 0 ${BERRY}`,
};

const STYLE_ID = 'bbangto-bakery-motif';
const CSS = `
.bbangto-bakery-btn {
  border: var(--bbangto-ext-border-width, 2px) solid var(--bbangto-ext-ink, #1C1B17) !important;
  border-radius: 0 !important;
  box-shadow: var(--bbangto-ext-offset-shadow, 3px 3px 0 #E9C766) !important;
  font-family: var(--bbangto-typography-font-family-mono, 'IBM Plex Mono', monospace) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
  transition: transform 120ms ease, box-shadow 120ms ease !important;
}
.bbangto-bakery-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--bbangto-ext-accent, #E9C766) !important;
}
.bbangto-bakery-btn:active {
  transform: translate(3px, 3px);
  box-shadow: none !important;
}
.bbangto-bakery-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-accent, #E9C766) !important;
  outline-offset: 2px;
}
.bbangto-bakery-card {
  border: var(--bbangto-ext-border-width, 2px) solid var(--bbangto-ext-ink, #1C1B17) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-bakery-btn { transition: none !important; }
  .bbangto-bakery-btn:hover,
  .bbangto-bakery-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-bakery-btn',
  cardClass: 'bbangto-bakery-card',
  displayPrefix: 'Bakery',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      border: '1.5px solid var(--bbangto-ext-ink, #1C1B17)', borderRadius: 0, padding: '2px 8px',
      fontFamily: "var(--bbangto-typography-font-family-mono, 'IBM Plex Mono', monospace)",
      fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    // 색 스킴을 따라가되 잉크-on-color 대비를 유지(표준 tone: accent/muted/solid).
    tones: {
      accent: {
        background: 'var(--bbangto-ext-accent, #E9C766)',
        color: 'var(--bbangto-ext-ink, #1C1B17)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-elevated, #FFFCF2)',
        color: 'var(--bbangto-ext-ink, #1C1B17)',
      },
      solid: {
        background: 'var(--bbangto-ext-ink, #1C1B17)',
        color: 'var(--bbangto-semantic-background-base, #FAF2DD)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SOFTWARE BAKERY',
  title: '오븐',
  tagline: '코드와 철학을 굽습니다',
  body: '반죽을 치대듯 문제를 매만지고, 화덕을 지키듯 인프라를 돌봅니다. 매일 아침 갓 구운 소프트웨어를 한 봉지 가득 담아 내어 드립니다.',
  ctaPrimary: '메뉴 둘러보기',
  ctaSecondary: '레시피가 궁금해요',
  bandTitle: '갓 구운 소프트웨어, 한 봉지 어떠세요?',
  items: [
    { name: '소금빵', tone: 'accent', tag: 'PRODUCT', desc: '매일의 기본을 책임지는 메인 제품 라인업.' },
    { name: '바게트', tone: 'muted', tag: 'APP', desc: '엣지에서 가볍게 구운 클라이언트 앱.' },
    { name: '화덕', tone: 'solid', tag: 'INFRA', desc: '꺼지지 않는 화덕, 안정적인 인프라 베이스.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'NeobrutalismShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 테두리',
    dos: [
      '모든 경계는 잉크(--bbangto-ext-ink) 실선 테두리로 명확히 구분한다.',
      '카드·배지는 각진 모서리(radius 0)를 유지한다.',
    ],
    donts: [
      '부드러운 blur 그림자를 쓰지 않는다 — 그림자는 blur 0 오프셋만.',
      '둥근 모서리(border-radius > 0)를 도입하지 않는다(원형 아바타 제외).',
    ],
  },
  color: {
    title: '색 사용',
    dos: [
      '골드(--bbangto-ext-accent)는 강조(배지·포커스 링·버튼 오프셋 그림자)에만 쓴다.',
      '색 위 텍스트는 항상 잉크(ink-on-color)로 올려 대비를 확보한다.',
    ],
    donts: [
      '골드를 넓은 면적의 본문 배경으로 쓰지 않는다(가독성 저하).',
      '크림 위에 골드 텍스트를 쓰지 않는다(대비 부족).',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문은 IBM Plex Sans KR(sans), 라벨·수치·코드는 IBM Plex Mono(mono).',
    requiredFonts: ['IBM Plex Sans KR', 'IBM Plex Mono'],
    note: '웹폰트는 호스트(앱/Storybook)가 로드한다. 컴포넌트 내부에서 @import 하지 않는다.',
  },
  accessibility: {
    title: '접근성',
    rules: [
      'focus-visible 시 골드 outline(2px)로 키보드 포커스를 분명히 표시한다.',
      'prefers-reduced-motion에서는 버튼 transform/transition을 비활성화한다.',
      '인터랙션 요소는 의미에 맞는 태그를 쓴다 — 페이지 내 이동은 <a href>, 동작은 <button>.',
    ],
  },
};

const visualMotif: VisualMotif = {
  summary:
    '네오브루탈리즘 "소프트웨어 베이커리": 크림 캔버스 위 잉크 2px 실선 테두리, 각진 모서리(radius 0), 골드 하드 오프셋 그림자, IBM Plex Sans/Mono.',
  components: {
    Button: {
      description:
        '1차 액션은 잉크로 가득 채우고 골드 오프셋 그림자로 종이 위에 올려놓은 듯한 입체감을 준다. 누르면 그림자를 흡수하며 살짝 눌린다.',
      specs: [
        '테두리: 2px 잉크 실선, 모서리 radius 0',
        '그림자: 3px 3px 0 골드(blur 0 하드 오프셋)',
        'hover: translate(2px,2px) + 그림자 1px로 축소',
        'active: translate(3px,3px) + 그림자 제거',
        'focus-visible: 2px 골드 outline (offset 2px)',
        '라벨: IBM Plex Mono, letter-spacing 0.02em',
      ],
    },
    Card: {
      description:
        '표면은 평평하게 두고 잉크 실선 테두리만으로 경계를 만든다. 소프트 그림자를 쓰지 않아 종이를 잘라 붙인 듯한 인상.',
      specs: [
        '테두리: 2px 잉크 실선, 모서리 radius 0',
        '그림자: 없음(none) — 경계는 오직 테두리로',
        '배경: 크림/종이 등 표면 토큰',
      ],
    },
    Tag: {
      description:
        '카테고리/메타 라벨용 경량 배지. 카테고리 색 배경 위에 잉크 텍스트를 올려 대비를 확보하고, mono 폰트로 라벨임을 분명히 한다.',
      specs: [
        '테두리: 1.5px 잉크 실선, 모서리 radius 0',
        '배경: tone별(accent 골드 / muted 종이 / solid 잉크)',
        '텍스트: 잉크(색 배경 위 ink-on-color), solid tone일 때만 크림',
        '폰트: IBM Plex Mono, 대문자 letter-spacing 0.06em',
      ],
    },
  },
  example: Showcase,
};

export const NeobrutalismShowcase = Showcase;
export const neobrutalismEditorialWrappers = wrapperComponents;

export const bakeryStyleGuide: StyleGuide = {
  name: 'neobrutalism-editorial-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (크림)', foundations, extendedFoundations },
    { key: 'midnight', label: '미드나잇 (다크)', foundations: midnightFoundations, extendedFoundations: midnightExt },
    { key: 'berry', label: '베리 액센트', foundations: berryFoundations, extendedFoundations: berryExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NeobrutalismShowcase: Showcase },
  guidelines,
  visualMotif,
};
