import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Radiant_Glow_Dark_01 — 다크 무드 라디언트 글로우 미학(테크/다크 패밀리).
 *
 * near-black/딥차콜·플럼 배경을 베이스로 중심에서 방사하는 강렬한 발광색(핫핑크/마젠타
 * + 앰버 보조)과 노이즈 그레인이 열·빛의 방사를 만든다. radius는 절제(none~sm)하고,
 * 깊이 언어는 드롭섀도가 아니라 외향 발산광(glow bloom)이다. wrapper Card는 다크 표면 +
 * radial glow 배경 + grain 오버레이, Button은 glow fill + bloom box-shadow로 표현한다.
 */

const GLOW = '#FF2D8E';
const AMBER = '#FFB020';

const foundations = makeFoundations({
  name: 'radiant-glow-dark-01',
  description: '다크 라디언트 글로우 + 중심 발광(핫핑크/앰버) + 노이즈 그레인 + glow bloom 깊이, 절제된 radius',
  fontSans: "'Space Grotesk', 'Inter Tight', 'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '10px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 0 12px rgba(255,45,142,0.25)',
    md: '0 0 24px rgba(255,45,142,0.35)',
    lg: '0 0 48px rgba(255,45,142,0.45)',
    xl: '0 0 80px rgba(255,45,142,0.55)',
  },
  typeScale: {
    display: { fontSize: '84px', lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: 700 },
    h1: { fontSize: '48px', lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#0A0A0C',
    bgElevated: '#15121A',
    bgSunken: '#060608',
    overlay: 'rgba(0,0,0,0.62)',
    fg: '#FFFFFF',
    fgMuted: '#C9C2D4',
    fgSubtle: '#8C8499',
    fgInverse: '#0A0A0C',
    border: '#2A2533',
    borderMuted: '#1E1A26',
    borderStrong: '#3D3648',
    focus: GLOW,
    primaryBase: GLOW,
    primaryHover: '#FF52A3',
    primaryActive: '#E01277',
    primarySubtle: '#2A0E1E',
    primaryFg: '#14060C',
    accent: GLOW,
    accent2: AMBER,
    accent3: '#8C8499',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-radial-glow':
    'radial-gradient(circle at 50% 12%, rgba(255,45,142,0.42) 0%, rgba(255,45,142,0.12) 32%, transparent 66%)',
  '--bbangto-ext-light-ray':
    'conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(255,176,32,0.16) 28deg, transparent 56deg)',
  '--bbangto-ext-glow-color': GLOW,
  '--bbangto-ext-bloom-blur': '48px',
  '--bbangto-ext-grain': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
  '--bbangto-ext-silhouette-mask': 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)',
  '--bbangto-ext-glow-intensity': '1',
};

const STYLE_ID = 'bbangto-radiant-glow-dark-motif';
const CSS = `
.bbangto-radiant-glow-dark-card {
  border-radius: var(--bbangto-radius-md, 6px) !important;
  background-color: var(--bbangto-semantic-background-elevated, #15121A) !important;
  background-image: var(--bbangto-ext-radial-glow, radial-gradient(circle at 50% 12%, rgba(255,45,142,0.42), transparent 66%)), var(--bbangto-ext-grain) !important;
  background-repeat: no-repeat, repeat !important;
  background-size: 150% 150%, 120px 120px !important;
  background-position: center top, center !important;
  border: 1px solid var(--bbangto-semantic-border-base, #2A2533) !important;
  transition: box-shadow 240ms ease, border-color 240ms ease, transform 240ms ease !important;
}
.bbangto-radiant-glow-dark-card:hover {
  border-color: var(--bbangto-ext-glow-color, #FF2D8E) !important;
  box-shadow: 0 0 calc(var(--bbangto-ext-bloom-blur, 48px) * var(--bbangto-ext-glow-intensity, 1)) rgba(255,45,142,0.40) !important;
  transform: translateY(-2px) !important;
}
.bbangto-radiant-glow-dark-btn {
  border-radius: var(--bbangto-radius-sm, 4px) !important;
  background: var(--bbangto-semantic-primary-base, #FF2D8E) !important;
  color: var(--bbangto-semantic-primary-foreground, #14060C) !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
  border: 1px solid transparent !important;
  box-shadow: 0 0 20px rgba(255,45,142,0.45) !important;
  transition: box-shadow 200ms ease, transform 120ms ease, background 200ms ease !important;
}
.bbangto-radiant-glow-dark-btn:hover {
  background: var(--bbangto-semantic-primary-hover, #FF52A3) !important;
  box-shadow: 0 0 36px rgba(255,45,142,0.70) !important;
}
.bbangto-radiant-glow-dark-btn:active {
  background: var(--bbangto-semantic-primary-active, #E01277) !important;
  transform: translateY(1px) scale(0.99) !important;
}
.bbangto-radiant-glow-dark-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-glow-color, #FF2D8E) !important;
  outline-offset: 3px !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-radiant-glow-dark-card { transition: none !important; }
  .bbangto-radiant-glow-dark-card:hover { transform: none !important; }
  .bbangto-radiant-glow-dark-btn { transition: none !important; }
  .bbangto-radiant-glow-dark-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-radiant-glow-dark-btn',
  cardClass: 'bbangto-radiant-glow-dark-card',
  displayPrefix: 'RadiantGlowDark',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1.5, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      accent: { background: '#1A0A12', color: '#FF77B4', border: '1px solid rgba(255,45,142,0.55)', boxShadow: '0 0 12px rgba(255,45,142,0.35)' },
      muted: { background: '#1A1622', color: '#C9C2D4', border: '1px solid #3D3648' },
      solid: { background: GLOW, color: '#14060C', border: '1px solid transparent', boxShadow: '0 0 14px rgba(255,45,142,0.5)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'GLOW 01',
  title: '어둠을 뚫고 발산하는 빛',
  tagline: '중심에서 방사하는 라디언트 글로우',
  body: 'near-black 표면 위로 핫핑크와 앰버의 발광이 중심에서 퍼져 나간다. 드롭섀도 대신 외향 발산광(bloom)이 깊이를 만들고, 미세한 노이즈 그레인이 빛에 질감을 더한다.',
  ctaPrimary: '빛 켜기',
  ctaSecondary: '무드 살펴보기',
  bandTitle: '하나의 빛에 집중하면, 어둠은 무대가 된다.',
  items: [
    { name: '글로우 히어로', tone: 'accent', tag: 'HERO', desc: '중심 발광과 광선 위에 대형 타이포를 올려 시선을 한 점으로 모은다.' },
    { name: '다크 피처', tone: 'muted', tag: 'FEATURE', desc: '어두운 카드에 코너 글로우만 더해 정보 밀도를 차분하게 유지한다.' },
    { name: '블룸 액션', tone: 'solid', tag: 'BLOOM', desc: '강조 동작에만 bloom을 집중해 호버 시 발광 강도를 끌어올린다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'RadiantGlowDarkShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 발광 배치',
    dos: [
      '발광은 1~2색(핫핑크 키 + 앰버 보조)으로 집중해 초점을 한 곳에 만든다.',
      '히어로/포스터형 섹션은 중심 발광·광선 위에 대형 타이포를 시네마틱 여백과 함께 배치한다.',
      'Pricing·피처에서는 강조 대상에만 bloom을 주고 나머지는 어두운 표면으로 절제한다.',
    ],
    donts: [
      '화면 전체를 균일한 고휘도로 채워 초점을 잃지 않는다.',
      '발광면 위에 저명도 컬러 텍스트를 올려 가독성을 무너뜨리지 않는다.',
      'radius를 크게 키워 발광면보다 모서리가 주역이 되게 하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '발광 그라디언트 위 텍스트는 글로우 최저명도 지점 기준으로 WCAG AA(본문 4.5:1, 대형 3:1)를 검증한다.',
      '발광 그라디언트 텍스트(클립)는 비텍스트 장식으로만 쓰고 본문에는 솔리드 화이트를 사용한다.',
      'grain·맥동 glow 애니메이션은 prefers-reduced-motion: reduce에서 정적으로 멈춘다.',
      '고휘도 점멸·플리커는 발작 위험이 있으므로 회피한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '대형 산세리프 디스플레이(Space Grotesk/Inter Tight, 타이트 트래킹) + 본문 산세리프(Inter), 라벨·수치는 JetBrains Mono.',
    requiredFonts: ['Space Grotesk', 'Inter Tight', 'Inter', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Radiant_Glow_Dark_01: near-black 바탕을 뚫고 중심에서 발산하는 강렬한 라디언트 글로우·광선과 노이즈 그레인이 열·빛의 방사를 만드는 다크 무드가 시그니처. 깊이는 드롭섀도가 아닌 glow bloom으로.',
  components: {
    Button: {
      description: '핫핑크 glow fill 버튼. 외향 bloom box-shadow가 깊이를 만들고 호버 시 발광 강도가 증가한다.',
      specs: ['모서리: radius sm(절제)', '채움: 핫핑크 primary', '깊이: glow bloom box-shadow', 'hover: bloom 강도 증가', 'active: 미세 press', 'focus-visible: 글로우 outline'],
    },
    Card: {
      description: '다크 표면 + 중심 radial glow 배경 + grain 오버레이. hover 시 글로우 보더와 bloom이 떠오른다.',
      specs: ['표면: near-black/플럼 다크', '배경: radial glow + grain', '모서리: radius md(절제)', 'hover: glow 보더 + bloom lift', 'reduce-motion: lift/transition 비활성'],
    },
    Tag: {
      description: '어두운 칩 + 네온 글로우 림. accent=핑크 글로우 림, muted=중립 다크, solid=핫핑크 채움.',
      specs: ['모서리: radius sm', '폰트: JetBrains Mono 대문자', 'letter-spacing 0.1em', '색: pink-glow-rim / neutral-dark / pink-solid'],
    },
  },
  example: Showcase,
};

export const radiantGlowDarkWrappers = wrapperComponents;
export const RadiantGlowDarkShowcase = Showcase;

export const radiantGlowDarkStyleGuide: StyleGuide = {
  name: 'radiant-glow-dark-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { RadiantGlowDarkShowcase: Showcase },
  guidelines,
  visualMotif,
};
