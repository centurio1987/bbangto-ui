import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Tactile_Texture_01 — 퍼피·소프트·스퀴시 촉각 질감 + 하이퍼리얼 디테일.
 *
 * 파스텔/소프트 톤 + 밝은 배경, 두툼하고 말랑한 큰 radius(24~32px), 넉넉한 spacing.
 * 부드러운 이중 그림자(바깥 드롭 + 안쪽 하이라이트)로 푹신한 입체감을 만들고,
 * 버튼은 누르면 살짝 쪼그라드는 스퀴시 인터랙션을 준다. reduce-motion에서 비활성.
 */

const CANDY = '#FF6FA5';
const SKY = '#6FB7FF';
const INK = '#3A2E33';

const foundations = makeFoundations({
  name: 'tactile-texture-01',
  description: '퍼피·소프트·스퀴시 촉각 질감 + 하이퍼리얼 디테일, 파스텔 톤·두툼한 radius·부드러운 이중 그림자',
  fontSans: "'Quicksand', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '12px', md: '18px', lg: '22px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 4px 10px rgba(255,111,165,0.18)',
    md: '0 8px 20px rgba(255,111,165,0.22), inset 0 2px 4px rgba(255,255,255,0.7)',
    lg: '0 10px 24px rgba(255,111,165,0.28), inset 0 2px 4px rgba(255,255,255,0.7)',
    xl: '0 16px 36px rgba(255,111,165,0.32), inset 0 2px 6px rgba(255,255,255,0.75)',
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '42px', lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FFF5F7',
    bgElevated: '#FFFFFF',
    bgSunken: '#FBE8EE',
    overlay: 'rgba(58,46,51,0.45)',
    fg: INK,
    fgMuted: '#7A6A71',
    fgSubtle: '#A4939A',
    fgInverse: '#FFFFFF',
    border: '#F3D3DD',
    borderMuted: '#F7E2E9',
    borderStrong: '#EBB9C8',
    focus: CANDY,
    primaryBase: CANDY,
    primaryHover: '#FF5896',
    primaryActive: '#F0427F',
    primarySubtle: '#FFE0EC',
    primaryFg: '#FFFFFF',
    accent: CANDY,
    accent2: SKY,
    accent3: '#FFB36F',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-puffy-shadow': '0 10px 24px rgba(255,111,165,0.28), inset 0 2px 4px rgba(255,255,255,0.7)',
  '--bbangto-ext-squish': 'scale(0.96)',
  '--bbangto-ext-noise-texture': 'rgba(58,46,51,0.03)',
  '--bbangto-ext-hyperreal-gloss': 'rgba(255,255,255,0.6)',
};

const STYLE_ID = 'bbangto-tactile-texture-motif';
const CSS = `
.bbangto-tactile-card {
  border-radius: 26px !important;
  box-shadow: var(--bbangto-ext-puffy-shadow, 0 10px 24px rgba(255,111,165,0.28), inset 0 2px 4px rgba(255,255,255,0.7)) !important;
  background-image: radial-gradient(var(--bbangto-ext-hyperreal-gloss, rgba(255,255,255,0.6)) 0%, transparent 55%) !important;
  border: 1px solid var(--bbangto-ext-noise-texture, rgba(58,46,51,0.03)) !important;
}
.bbangto-tactile-btn {
  border-radius: 24px !important;
  box-shadow: var(--bbangto-ext-puffy-shadow, 0 10px 24px rgba(255,111,165,0.28), inset 0 2px 4px rgba(255,255,255,0.7)) !important;
  font-weight: 700 !important;
  transition: transform 140ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 140ms ease !important;
}
.bbangto-tactile-btn:active { transform: var(--bbangto-ext-squish, scale(0.96)); }
.bbangto-tactile-btn:focus-visible { outline: 3px solid var(--bbangto-ext-hyperreal-gloss, rgba(255,255,255,0.6)); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-tactile-btn { transition: none !important; }
  .bbangto-tactile-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-tactile-btn',
  cardClass: 'bbangto-tactile-card',
  displayPrefix: 'Tactile',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px',
      borderRadius: 9999, fontFamily: "'Quicksand', sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: '#FFE0EC', color: '#F0427F' },
      muted: { background: '#FFFFFF', color: INK, border: '1px solid #F3D3DD' },
      solid: { background: CANDY, color: '#fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SQUISH 01',
  title: '눌러보고 싶은 말랑한 인터페이스',
  tagline: '손끝으로 느끼는 푹신한 촉각 질감',
  body: '파스텔 톤 표면 위에 두툼한 모서리와 부드러운 이중 그림자를 올렸다. 버튼은 누르면 살짝 쪼그라들었다가 돌아오고, 모션을 줄이면 정적인 상태로 머문다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '둘러보기',
  bandTitle: '말랑한 디테일이 첫인사를 부드럽게 만든다.',
  items: [
    { name: 'Puffy', tone: 'accent', tag: 'SOFT', desc: '바깥 드롭과 안쪽 하이라이트가 만드는 푹신한 입체감.' },
    { name: 'Squish', tone: 'solid', tag: 'PRESS', desc: '누르는 순간 살짝 쪼그라드는 스퀴시 반응을 준다.' },
    { name: 'Gloss', tone: 'muted', tag: 'HYPER', desc: '하이퍼리얼 광택과 미세 질감으로 손맛을 더한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'TactileShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 질감',
    dos: ['넉넉한 spacing과 두툼한 radius로 말랑한 호흡을 준다.', '이중 그림자와 광택은 강조 표면에만 절제해 쓴다.'],
    donts: ['무거운 질감·그림자를 화면 전체에 깔아 시각 노이즈를 만들지 않는다.', '정보 밀도가 높은 화면에는 이 모티프를 쓰지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      'squish 모션은 prefers-reduced-motion: reduce에서 비활성화한다.',
      '텍스처/광택 위 텍스트는 대비를 보강해 가독성을 유지한다.',
      'focus-visible는 광택 outline으로 분명히 표시한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '둥글고 친근한 산세리프(Quicksand 계열) 본문, 라벨·수치 JetBrains Mono.',
    requiredFonts: ['Quicksand', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Tactile_Texture_01: 퍼피·소프트·스퀴시 촉각 질감 + 하이퍼리얼 디테일. 파스텔 톤 + 밝은 배경, 두툼한 radius(24~32px), 부드러운 이중 그림자, 누르면 쪼그라드는 스퀴시. reduce-motion에서 비활성.',
  components: {
    Button: {
      description: '두툼한 모서리에 푹신한 이중 그림자를 두른 버튼. 누르면 살짝 쪼그라드는 스퀴시 반응.',
      specs: ['모서리: radius 24px(청키)', '그림자: 바깥 드롭 + 안쪽 하이라이트 이중', 'active: scale(0.96) 스퀴시', 'reduce-motion: 모션/트랜지션 비활성', 'focus-visible: 광택 outline'],
    },
    Card: {
      description: '파스텔 표면에 푹신한 이중 그림자와 하이퍼리얼 광택을 올린 말랑한 표면.',
      specs: ['모서리: radius 26px', '그림자: 바깥 드롭 + 안쪽 하이라이트 이중', '광택: hyperreal gloss 라디얼', '미세 질감: noise texture 보더'],
    },
    Tag: {
      description: '둥근 알약형 배지. accent=핑크 서브틀, muted=흰 보더, solid=캔디 핑크.',
      specs: ['모서리: radius full(알약)', '텍스트: letter-spacing 0.04em', '폰트: Quicksand', '색: candy/white/ink'],
    },
  },
  example: Showcase,
};

export const tactileTextureWrappers = wrapperComponents;
export const TactileShowcase = Showcase;

export const tactileTextureStyleGuide: StyleGuide = {
  name: 'tactile-texture-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { TactileShowcase: Showcase },
  guidelines,
  visualMotif,
};
