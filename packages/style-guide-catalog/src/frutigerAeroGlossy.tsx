import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * FrutigerAero_Glossy_01 — 2000s 프루티거 에어로 글로스.
 *
 * 스카이블루·그린·화이트 팔레트 위에 아쿠아 글로시 버튼과 투명 글라스 카드를 얹는다.
 * 물·잎·하늘 같은 자연 모티프와 에어로 글로스(상단 하이라이트 + 광택)가 시그니처.
 * 밝은 베이스라 파스텔 표면 위 텍스트·포커스 대비를 별도로 보강한다.
 */

const SKY = '#5BB8F0';
const GREEN = '#7ED957';
const SKY_DEEP = '#2E86C8';

const foundations = makeFoundations({
  name: 'frutiger-aero-glossy-01',
  description: '스카이블루·그린·화이트 자연 모티프 + 아쿠아 글로스 표면(라이트 베이스)',
  fontSans: "'Pretendard', 'Segoe UI', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '18px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(46,134,200,0.16)',
    md: '0 8px 24px rgba(46,134,200,0.20)',
    lg: '0 16px 44px rgba(46,134,200,0.24)',
    xl: '0 28px 64px rgba(46,134,200,0.30)',
  },
  semantic: makeSemantic({
    bg: 'linear-gradient(180deg, #EAF7FF 0%, #F4FBFF 52%, #EDFBF0 100%)',
    bgElevated: 'rgba(255,255,255,0.78)',
    bgSunken: 'rgba(214,238,252,0.55)',
    overlay: 'rgba(20,60,90,0.45)',
    fg: '#10374F',
    fgMuted: 'rgba(16,55,79,0.78)',
    fgSubtle: 'rgba(16,55,79,0.56)',
    fgInverse: '#FFFFFF',
    border: 'rgba(91,184,240,0.42)',
    borderMuted: 'rgba(91,184,240,0.22)',
    borderStrong: 'rgba(46,134,200,0.60)',
    focus: '#0E6FB8',
    primaryBase: SKY,
    primaryHover: '#43A8E8',
    primaryActive: SKY_DEEP,
    primarySubtle: 'rgba(91,184,240,0.18)',
    primaryFg: '#063A5C',
    accent: GREEN,
    accent2: '#46C7E8',
    accent3: '#A0E66B',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-aqua-gloss': 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.30) 46%, rgba(91,184,240,0.55) 47%, rgba(46,134,200,0.85) 100%)',
  '--bbangto-ext-bubble': 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.10) 60%)',
  '--bbangto-ext-sky-gradient': 'linear-gradient(180deg, rgba(234,247,255,0.85) 0%, rgba(214,242,222,0.78) 100%)',
  '--bbangto-ext-gloss-highlight': 'rgba(255,255,255,0.85)',
  '--bbangto-ext-leaf-green': GREEN,
};

const STYLE_ID = 'bbangto-frutiger-aero-glossy-01-motif';
const CSS = `
.bbangto-aero-btn {
  position: relative;
  background: var(--bbangto-ext-aqua-gloss, linear-gradient(180deg, #fff, #2E86C8)) !important;
  color: #063A5C !important;
  border: 1px solid rgba(46,134,200,0.65) !important;
  border-radius: var(--bbangto-radius-lg, 18px) !important;
  font-weight: 700 !important;
  text-shadow: 0 1px 0 rgba(255,255,255,0.65);
  box-shadow: inset 0 1px 0 var(--bbangto-ext-gloss-highlight, rgba(255,255,255,0.85)), 0 6px 16px rgba(46,134,200,0.30) !important;
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease !important;
}
.bbangto-aero-btn:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 22px rgba(46,134,200,0.38) !important; }
.bbangto-aero-btn:active { transform: translateY(0); filter: brightness(0.97); }
.bbangto-aero-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #0E6FB8) !important; outline-offset: 2px; }
.bbangto-aero-card {
  background-color: var(--bbangto-semantic-background-elevated, rgba(255,255,255,0.78)) !important;
  background-image: var(--bbangto-ext-sky-gradient, linear-gradient(180deg, rgba(234,247,255,0.85), rgba(214,242,222,0.78))) !important;
  border: 1px solid var(--bbangto-semantic-border-base, rgba(91,184,240,0.42)) !important;
  border-radius: var(--bbangto-radius-lg, 18px) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 16px 44px rgba(46,134,200,0.24) !important;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-aero-btn { transition: none !important; }
  .bbangto-aero-btn:hover, .bbangto-aero-btn:active { transform: none; filter: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-aero-btn',
  cardClass: 'bbangto-aero-card',
  displayPrefix: 'Aero',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
    },
    tones: {
      accent: { background: 'rgba(126,217,87,0.22)', color: '#2E6B16', border: '1px solid rgba(126,217,87,0.65)' },
      muted: { background: 'rgba(214,238,252,0.70)', color: 'rgba(16,55,79,0.78)', border: '1px solid rgba(91,184,240,0.40)' },
      solid: { background: SKY, color: '#063A5C', border: '1px solid rgba(46,134,200,0.55)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'AERO GLOSS',
  title: '하늘과 물을 담은 광택 표면',
  tagline: '맑은 빛이 흐르는 2000s 글로스',
  body: '스카이블루·그린·화이트를 기반으로 물방울 같은 광택과 투명 글라스 표면을 쌓는다. 상단 하이라이트와 부드러운 그라디언트가 모티프의 시그니처다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '둘러보기',
  bandTitle: '맑은 하늘 위에 띄운 인터페이스, 지금 만나보세요.',
  items: [
    { name: 'Gloss', tone: 'accent', tag: 'AQUA', desc: '상단 하이라이트와 광택으로 아쿠아 버튼을 만든다.' },
    { name: 'Glass', tone: 'muted', tag: 'SKY', desc: '투명 표면 위 하늘 그라디언트로 깊이를 더한다.' },
    { name: 'Nature', tone: 'solid', tag: 'LEAF', desc: '잎·물·하늘 모티프로 신선한 인상을 전한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'AeroShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 글로스',
    dos: ['버튼 상단에 1px 하이라이트와 광택 그라디언트로 아쿠아 질감을 만든다.', '카드는 투명 표면 위 하늘 그라디언트 배경으로 깊이를 표현한다.'],
    donts: ['완전 불투명·무광 단색 표면을 쓰지 않는다(에어로 글로스 상실).', '광택을 과하게 겹쳐 텍스트 가독성을 해치지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '파스텔·광택 표면 위 텍스트는 대비를 별도로 보강한다(짙은 본문색 + 하이라이트 text-shadow).',
      '자연(물·잎·하늘) 이미지에는 의미를 전달하는 대체 텍스트를 반드시 제공한다.',
      'prefers-reduced-motion에서 hover transform·filter를 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 둥근 산세리프 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'FrutigerAero_Glossy_01: 스카이블루·그린·화이트 위 아쿠아 글로시 버튼과 투명 글라스 카드, 상단 하이라이트 광택과 물·잎·하늘 자연 모티프, radius lg의 둥근 형태.',
  components: {
    Button: {
      description: '아쿠아 글로시 버튼. 상단 하이라이트와 하단 짙은 블루 광택으로 물방울 같은 입체 질감을 만든다.',
      specs: ['배경: 아쿠아 글로스 그라디언트(상단 흰빛 → 하단 블루)', '보더: 1px 블루', '모서리: radius lg(18px)', 'hover: 1px 떠오르며 밝아짐', 'focus-visible: 짙은 블루 outline'],
    },
    Card: {
      description: '투명 글라스 카드. 반투명 표면 위 하늘 그라디언트 배경과 살짝의 블러로 신선한 깊이를 만든다.',
      specs: ['배경: 반투명 흰색 + 하늘 그라디언트', '보더: 1px 스카이블루', '모서리: radius lg(18px)', '그림자: 부드러운 블루 ambient + inset 하이라이트'],
    },
    Tag: {
      description: '경량 pill 배지. tone별 자연 색(잎 그린/하늘 뮤트/스카이 솔리드)으로 표면 재질감을 유지한다.',
      specs: ['배경: tone별(accent 잎 그린 / muted 하늘 / solid 스카이블루)', '모서리: pill(999)', '폰트: JetBrains Mono', '상단 1px 하이라이트'],
    },
  },
  example: Showcase,
};

export const AeroShowcase = Showcase;
export const frutigerAeroGlossyWrappers = wrapperComponents;

export const frutigerAeroGlossyStyleGuide: StyleGuide = {
  name: 'frutiger-aero-glossy-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { AeroShowcase: Showcase },
  guidelines,
  visualMotif,
};
