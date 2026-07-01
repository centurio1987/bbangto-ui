import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Iridescent_Chrome_01 — 근흑 무대 위 불투명 홀로그래픽 포일 + 액체 크롬 메탈 미학.
 *
 * 차콜/근흑 배경을 무대로, 라일락→민트→피치→시안으로 시프트하는 이리데센트 스펙트럼이
 * 표면·테두리·장식에만 올라간다. 본문 텍스트는 반드시 불투명 솔리드 패널 위에 두어
 * 대비를 확보한다(투명 글래스가 아닌 금속/포일 fill이 핵심). 둥근 산세리프 디스플레이 +
 * 중립 산세리프 본문, radius lg~xl(액체 블롭의 둥근 융기), 상단 광원 specular 하이라이트.
 */

const LILAC = '#B7A6FF';
const MINT = '#8CF0D4';
const PEACH = '#FFC9A8';
const CYAN = '#7FE0FF';
// 각도 시프트 무지개 그라디언트(라일락→민트→피치→시안→라일락 루프).
const IRIDESCENT = `linear-gradient(125deg, ${LILAC} 0%, ${MINT} 30%, ${PEACH} 55%, ${CYAN} 80%, ${LILAC} 100%)`;
// 상단 광원 메탈 specular 하이라이트 스트립(상단만 밝고 50%에서 소멸).
const SPECULAR = 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0) 50%)';
// 포일 입자 노이즈 텍스처(feTurbulence SVG data URI).
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

const foundations = makeFoundations({
  name: 'iridescent-chrome-01',
  description: '근흑 무대 위 불투명 홀로그래픽 포일 + 액체 크롬 메탈 — 각도/인터랙션에 따라 시프트하는 이리데센트 광택',
  fontSans: "'Sora', 'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '10px', md: '14px', lg: '22px', xl: '30px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.40)',
    md: '0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
    lg: '0 16px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.22)',
    xl: '0 28px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '42px', lineHeight: '1.08', letterSpacing: '-0.018em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#0E0F13',
    bgElevated: '#181A20',
    bgSunken: '#08090C',
    overlay: 'rgba(0,0,0,0.62)',
    fg: '#F4F5F8',
    fgMuted: '#B9BDC9',
    fgSubtle: '#888E9D',
    fgInverse: '#0E0F13',
    border: '#2A2D36',
    borderMuted: '#1E2027',
    borderStrong: '#3A3E4A',
    focus: CYAN,
    primaryBase: LILAC,
    primaryHover: '#C7BAFF',
    primaryActive: '#A693F5',
    primarySubtle: '#241F3A',
    primaryFg: '#14121F',
    accent: LILAC,
    accent2: MINT,
    accent3: CYAN,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-iridescent': IRIDESCENT,
  '--bbangto-ext-holo-noise': NOISE,
  '--bbangto-ext-chrome-specular': SPECULAR,
  '--bbangto-ext-liquid-blob': '38% 62% 63% 37% / 41% 44% 56% 59%',
  '--bbangto-ext-foil-shift': '420ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--bbangto-ext-sheen-angle': '125deg',
};

/* 색 스킴 변형(tweak) — 홀로그래픽 포일/크롬 모티프(래퍼 CSS·liquid blob shape·foil-shift 타이밍)는
 * base에서 상속하고 색(semantic + 이리데센트 그라디언트)만 교체한다. base가 근흑 다크이므로
 * 한 변형은 밝은 진주 라이트, 다른 하나는 시안/민트 액센트 전환으로 명확히 구분한다. */

// 라이트: 진주빛(pearl) 크롬 — 밝은 무대 위 딥-톤 홀로그래픽 포일.
const LIGHT_IRIDESCENT = 'linear-gradient(125deg, #8B6FE8 0%, #2FB8A0 30%, #E89B6F 55%, #3BB0D8 80%, #8B6FE8 100%)';
const lightFoundations = makeColorway(foundations, {
  name: 'iridescent-chrome-01-light',
  description: '진주빛 라이트 크롬 — 밝은 무대 위 딥-톤 홀로그래픽 포일',
  semantic: makeSemantic({
    bg: '#F4F2F8', bgElevated: '#FFFFFF', bgSunken: '#E7E3F0', overlay: 'rgba(0,0,0,0.35)',
    fg: '#1A1826', fgMuted: '#4A4660', fgSubtle: '#7A7690', fgInverse: '#F4F2F8',
    border: '#D4CFE2', borderMuted: '#E7E3F0', borderStrong: '#8A85A0', focus: '#2AA9C9',
    primaryBase: '#6A4FD0', primaryHover: '#5A40C0', primaryActive: '#4A32A8',
    primarySubtle: '#E4DCFA', primaryFg: '#FFFFFF',
    accent: '#6A4FD0', accent2: '#1F9E8A', accent3: '#2AA9C9',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-iridescent': LIGHT_IRIDESCENT,
  '--bbangto-ext-holo-noise': NOISE,
  '--bbangto-ext-chrome-specular': SPECULAR,
  '--bbangto-ext-liquid-blob': '38% 62% 63% 37% / 41% 44% 56% 59%',
  '--bbangto-ext-foil-shift': '420ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--bbangto-ext-sheen-angle': '125deg',
};

// 시안 액센트: 근흑 무대는 유지하되 키컬러를 라일락 → 민트/시안 리퀴드 크롬으로 전환.
const CYAN_IRIDESCENT = `linear-gradient(125deg, ${MINT} 0%, ${CYAN} 30%, ${LILAC} 55%, ${MINT} 80%, ${CYAN} 100%)`;
const cyanFoundations = makeColorway(foundations, {
  name: 'iridescent-chrome-01-cyan',
  description: '시안/민트 크롬 액센트 — 근흑 무대 위 리퀴드 시안 키컬러',
  semantic: makeSemantic({
    bg: '#0B0F12', bgElevated: '#14191E', bgSunken: '#060809', overlay: 'rgba(0,0,0,0.62)',
    fg: '#EAF6F8', fgMuted: '#A8BEC4', fgSubtle: '#7A8E94', fgInverse: '#0B0F12',
    border: '#263038', borderMuted: '#1A2228', borderStrong: '#37454E', focus: LILAC,
    primaryBase: '#6FE6D4', primaryHover: MINT, primaryActive: '#52C7B6',
    primarySubtle: '#103029', primaryFg: '#05201B',
    accent: CYAN, accent2: MINT, accent3: PEACH,
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-iridescent': CYAN_IRIDESCENT,
  '--bbangto-ext-holo-noise': NOISE,
  '--bbangto-ext-chrome-specular': SPECULAR,
  '--bbangto-ext-liquid-blob': '38% 62% 63% 37% / 41% 44% 56% 59%',
  '--bbangto-ext-foil-shift': '420ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--bbangto-ext-sheen-angle': '125deg',
};

const STYLE_ID = 'bbangto-iridescent-chrome-motif';
const CSS = `
.bbangto-iridescent-chrome-card {
  position: relative;
  border-radius: var(--bbangto-radius-lg, 22px) !important;
  border: 1.5px solid transparent !important;
  background:
    linear-gradient(var(--bbangto-semantic-background-elevated, #181A20), var(--bbangto-semantic-background-elevated, #181A20)) padding-box,
    var(--bbangto-ext-iridescent, ${IRIDESCENT}) border-box !important;
  background-size: auto, 220% 220% !important;
  background-position: center, 0% 50% !important;
  box-shadow: 0 16px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.18) !important;
  overflow: hidden;
  transition: transform var(--bbangto-ext-foil-shift, 420ms cubic-bezier(0.4, 0, 0.2, 1)), background-position var(--bbangto-ext-foil-shift, 420ms cubic-bezier(0.4, 0, 0.2, 1)), box-shadow 320ms ease !important;
}
.bbangto-iridescent-chrome-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--bbangto-ext-chrome-specular, ${SPECULAR}), var(--bbangto-ext-holo-noise, none);
  background-size: 100% 100%, 160px 160px;
  opacity: 0.55;
  pointer-events: none;
  transition: opacity var(--bbangto-ext-foil-shift, 420ms cubic-bezier(0.4, 0, 0.2, 1));
}
.bbangto-iridescent-chrome-card:hover {
  transform: translateY(-3px) !important;
  background-position: center, 100% 50% !important;
  box-shadow: 0 22px 52px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.24) !important;
}
.bbangto-iridescent-chrome-card:hover::before { opacity: 0.8; }
.bbangto-iridescent-chrome-btn {
  position: relative;
  overflow: hidden;
  border-radius: var(--bbangto-radius-full, 9999px) !important;
  border: 1px solid rgba(255,255,255,0.25) !important;
  background-image: var(--bbangto-ext-iridescent, ${IRIDESCENT}) !important;
  background-size: 200% 100% !important;
  background-position: 0% 50% !important;
  color: #14121F !important;
  font-weight: 700 !important;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.60) !important;
  transition: background-position var(--bbangto-ext-foil-shift, 420ms cubic-bezier(0.4, 0, 0.2, 1)), transform 120ms ease !important;
}
.bbangto-iridescent-chrome-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--bbangto-ext-chrome-specular, ${SPECULAR});
  pointer-events: none;
}
.bbangto-iridescent-chrome-btn:hover { background-position: 100% 50% !important; }
.bbangto-iridescent-chrome-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-iridescent-chrome-btn:focus-visible { outline: 2px solid ${LILAC} !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-iridescent-chrome-card { transition: none !important; }
  .bbangto-iridescent-chrome-card:hover { transform: none !important; background-position: center, 0% 50% !important; }
  .bbangto-iridescent-chrome-card::before { transition: none !important; }
  .bbangto-iridescent-chrome-card:hover::before { opacity: 0.55; }
  .bbangto-iridescent-chrome-btn { transition: none !important; }
  .bbangto-iridescent-chrome-btn:hover { background-position: 0% 50% !important; }
  .bbangto-iridescent-chrome-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-iridescent-chrome-btn',
  cardClass: 'bbangto-iridescent-chrome-card',
  displayPrefix: 'IridescentChrome',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'Sora', 'Inter', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic/ext CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #241F3A)',
        color: 'var(--bbangto-semantic-primary-base, #B7A6FF)',
        border: `1px solid ${MINT}33`,
      },
      muted: {
        background: 'var(--bbangto-semantic-background-elevated, #1E2027)',
        color: 'var(--bbangto-semantic-foreground-muted, #B9BDC9)',
      },
      solid: {
        background: `var(--bbangto-ext-iridescent, ${IRIDESCENT})`,
        color: 'var(--bbangto-semantic-primary-foreground, #14121F)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'IRIDESCENT 01',
  title: '각도마다 색이 흐르는 크롬',
  tagline: '근흑 무대 위에서 시프트하는 홀로그래픽 포일',
  body: '라일락에서 민트, 피치, 시안으로 미끄러지는 이리데센트 표면이 주역이다. 무지갯빛은 테두리와 장식에만 흐르게 하고, 글자는 불투명 솔리드 패널 위에 올려 또렷하게 읽힌다.',
  ctaPrimary: '쇼케이스 열기',
  ctaSecondary: '포일 가이드',
  bandTitle: '빛의 각도가 바뀔 때마다 표면이 다시 태어난다.',
  items: [
    { name: '포일 패널', tone: 'accent', tag: 'FOIL', desc: '불투명 솔리드 패널에 이리데센트 테두리를 둘러 글자 대비를 지킨다.' },
    { name: '크롬 버튼', tone: 'solid', tag: 'CHROME', desc: '액체 크롬 fill 위 상단 specular 하이라이트, hover 시 sheen이 흐른다.' },
    { name: '홀로 칩', tone: 'muted', tag: 'HOLO', desc: '포일 스티커형 배지로 라벨을 가볍게 강조한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'IridescentChromeShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 표면',
    dos: [
      '이리데센트 그라디언트와 specular는 표면·테두리·장식에만 흐르게 한다.',
      '본문 텍스트는 불투명 솔리드 패널(elevated) 위에 올려 배경 스펙트럼과 분리한다.',
      'Hero·제품/굿즈 쇼케이스·무드보드 갤러리처럼 넉넉한 spacing의 포일 군집 레이아웃을 쓴다.',
    ],
    donts: [
      '무지개 그라디언트 위에 본문 텍스트를 직접 올리지 않는다.',
      '투명 글래스처럼 비치는 패널로 만들지 않는다 — 포일/메탈은 불투명 fill이 핵심이다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 홀로 그라디언트·specular 하이라이트는 위치마다 명도가 요동쳐 4.5:1을 보장할 수 없으므로, 텍스트는 불투명 솔리드 backplate/오버레이 토큰 위에만 올린다.',
      '⚠ specular가 텍스트와 겹치는 최저 대비 지점에서도 본문 4.5:1이 유지되는지 story play에서 검증한다.',
      '색 시프트·sheen 애니메이션은 prefers-reduced-motion: reduce에서 정적 포일로 폴백하고 빠른 깜빡임을 피한다.',
      '포일 노이즈 텍스처가 의미를 가질 경우 대체텍스트(alt)를 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '둥근 산세리프 디스플레이(Sora)로 액체 메탈 헤드라인을, 중립 산세리프(Inter)로 본문을 조판한다. 라벨·수치는 JetBrains Mono로 보강한다.',
    requiredFonts: ['Sora', 'Inter', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Iridescent_Chrome_01: 근흑 무대 위 불투명 홀로그래픽 포일과 녹은 크롬 메탈의 반짝이는 표면 — 보는 각도/인터랙션에 따라 스펙트럼이 시프트하는 이리데센트 광택이 시그니처(투명 글래스가 아닌 금속 질감).',
  components: {
    Button: {
      description: '액체 크롬 fill + 상단 specular 하이라이트의 둥근 ChromeButton. hover 시 sheen이 흐르고 press 시 가라앉는다.',
      specs: ['모서리: full pill(액체 블롭)', '채움: 이리데센트 라일락→민트→피치→시안', '하이라이트: 상단 광원 specular ::after', 'hover: background-position sheen 이동', 'active: translateY/scale press', 'focus-visible: 라일락 outline'],
    },
    Card: {
      description: '불투명 솔리드 패널 + 이리데센트 테두리 + 포일 노이즈/specular 오버레이의 FoilCard. hover에서 3px 떠오르며 테두리 색이 시프트한다.',
      specs: ['모서리: radius lg(22px)', '채움: 불투명 elevated padding-box', '테두리: 이리데센트 border-box', '오버레이: specular + 포일 노이즈 ::before', 'hover: translateY(-3px) + 색 시프트', 'reduce-motion: 정적 포일 폴백'],
    },
    Tag: {
      description: '포일 스티커형 HoloChip. accent=다크 라일락 칩, muted=중립, solid=이리데센트 포일.',
      specs: ['모서리: pill(999px)', '텍스트: letter-spacing 0.06em', '폰트: Sora', '색: 라일락 / 중립 / 이리데센트 포일'],
    },
  },
  example: Showcase,
};

export const iridescentChromeWrappers = wrapperComponents;
export const IridescentChromeShowcase = Showcase;

export const iridescentChromeStyleGuide: StyleGuide = {
  name: 'iridescent-chrome-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (근흑 라일락 크롬)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (진주 크롬)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'cyan', label: '시안 액센트 (민트 크롬)', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { IridescentChromeShowcase: Showcase },
  guidelines,
  visualMotif,
};
