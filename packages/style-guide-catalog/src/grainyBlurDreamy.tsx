import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Grainy_Blur_Dreamy_01 — 필름 그레인 + 아웃포커스 블러의 몽환적 포토그래픽 헤이즈.
 *
 * 웜 오프화이트 종이 배경 위에 코랄/피치·라벤더·인디고/스카이의 저대비 헤이즈
 * 그라디언트를 깔고, 그 위로 가시적 필름 그레인을 합성한다. 헤드라인은 잉크 블랙
 * 단색을 흐림 레이어와 분리해 또렷이 올리고, soft ambient 헤이즈만 쓰며 하드 그림자는
 * 금지한다. '매끈함'이 아니라 '입자감 있는 흐림'이 시그니처다.
 */

const INK = '#181426';
const DEEP_BLUE = '#1E2A6B';
const CORAL = '#FF7E6B';
const LAVENDER = '#9B8CFF';
const HAZE_GRADIENT =
  'radial-gradient(120% 90% at 12% 8%, rgba(255,126,107,0.40) 0%, rgba(255,126,107,0) 55%), ' +
  'radial-gradient(110% 95% at 88% 18%, rgba(155,140,255,0.40) 0%, rgba(155,140,255,0) 60%), ' +
  'radial-gradient(130% 110% at 70% 95%, rgba(94,160,255,0.34) 0%, rgba(94,160,255,0) 62%), ' +
  'radial-gradient(120% 120% at 30% 88%, rgba(255,206,92,0.30) 0%, rgba(255,206,92,0) 60%)';
const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const foundations = makeFoundations({
  name: 'grainy-blur-dreamy-01',
  description: '필름 그레인 + 아웃포커스 블러 헤이즈 + 웜 오프화이트 종이 배경, 코랄/라벤더/스카이 저대비 그라디언트에 또렷한 잉크 단색 헤드라인',
  fontSans: "'Inter Tight', 'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Inter', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '12px', md: '16px', lg: '22px', xl: '30px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 4px 24px rgba(94,72,140,0.10)',
    md: '0 10px 44px rgba(94,72,140,0.14)',
    lg: '0 20px 70px rgba(94,72,140,0.18)',
    xl: '0 32px 110px rgba(94,72,140,0.22)',
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: 800 },
    h1: { fontSize: '46px', lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '-0.015em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FBF7F1',
    bgElevated: '#FFFDFA',
    bgSunken: '#F2ECE3',
    overlay: 'rgba(24,20,38,0.46)',
    fg: INK,
    fgMuted: '#4C4660',
    fgSubtle: '#7C7691',
    fgInverse: '#FFFDFA',
    border: '#E7DFD3',
    borderMuted: '#F0E9DE',
    borderStrong: '#D3C8B7',
    focus: DEEP_BLUE,
    primaryBase: CORAL,
    primaryHover: '#F26450',
    primaryActive: '#DB4E3B',
    primarySubtle: '#FFEDE8',
    primaryFg: '#26120D',
    accent: CORAL,
    accent2: LAVENDER,
    accent3: '#5EA0FF',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-grain': GRAIN_SVG,
  '--bbangto-ext-grain-opacity': '0.12',
  '--bbangto-ext-soft-focus-blur': '20px',
  '--bbangto-ext-haze-gradient': HAZE_GRADIENT,
  '--bbangto-ext-blend-mode': 'soft-light',
  '--bbangto-ext-defocus-radius': '14px',
};

const STYLE_ID = 'bbangto-grainy-blur-dreamy-motif';
const CSS = `
.bbangto-grainy-blur-dreamy-card {
  position: relative !important;
  border-radius: var(--bbangto-radius-lg, 22px) !important;
  background:
    var(--bbangto-ext-haze-gradient, ${HAZE_GRADIENT}),
    var(--bbangto-semantic-background-elevated, #FFFDFA) !important;
  border: 1px solid var(--bbangto-semantic-border-muted, #F0E9DE) !important;
  box-shadow: var(--bbangto-shadow-md, 0 10px 44px rgba(94,72,140,0.14)) !important;
  overflow: hidden !important;
  isolation: isolate !important;
  transition: box-shadow 320ms ease, transform 320ms ease !important;
}
.bbangto-grainy-blur-dreamy-card::before {
  content: '' !important;
  position: absolute !important;
  inset: -2px !important;
  background-image: var(--bbangto-ext-grain, ${GRAIN_SVG}) !important;
  opacity: var(--bbangto-ext-grain-opacity, 0.12) !important;
  mix-blend-mode: var(--bbangto-ext-blend-mode, soft-light) !important;
  pointer-events: none !important;
  z-index: 0 !important;
}
.bbangto-grainy-blur-dreamy-card > * { position: relative !important; z-index: 1 !important; }
.bbangto-grainy-blur-dreamy-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: var(--bbangto-shadow-lg, 0 20px 70px rgba(94,72,140,0.18)) !important;
}
.bbangto-grainy-blur-dreamy-btn {
  position: relative !important;
  border-radius: 9999px !important;
  background-image: linear-gradient(120deg, var(--bbangto-semantic-primary-base, #FF7E6B), var(--bbangto-semantic-primary-hover, #F26450)) !important;
  color: var(--bbangto-semantic-primary-foreground, #26120D) !important;
  font-weight: 700 !important;
  border: 0 !important;
  box-shadow: var(--bbangto-shadow-sm, 0 4px 24px rgba(94,72,140,0.10)) !important;
  overflow: hidden !important;
  isolation: isolate !important;
  transition: filter 200ms ease, box-shadow 200ms ease, transform 120ms ease !important;
}
.bbangto-grainy-blur-dreamy-btn::after {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  background-image: var(--bbangto-ext-grain, ${GRAIN_SVG}) !important;
  opacity: var(--bbangto-ext-grain-opacity, 0.12) !important;
  mix-blend-mode: var(--bbangto-ext-blend-mode, soft-light) !important;
  pointer-events: none !important;
}
.bbangto-grainy-blur-dreamy-btn:hover {
  filter: saturate(1.08) brightness(1.03) !important;
  box-shadow: var(--bbangto-shadow-md, 0 10px 44px rgba(94,72,140,0.14)) !important;
}
.bbangto-grainy-blur-dreamy-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-grainy-blur-dreamy-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus, #1E2A6B) !important;
  outline-offset: 2px !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-grainy-blur-dreamy-card { transition: none !important; }
  .bbangto-grainy-blur-dreamy-card:hover { transform: none !important; }
  .bbangto-grainy-blur-dreamy-btn { transition: none !important; }
  .bbangto-grainy-blur-dreamy-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-grainy-blur-dreamy-btn',
  cardClass: 'bbangto-grainy-blur-dreamy-card',
  displayPrefix: 'GrainyBlurDreamy',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 9999, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1.5, whiteSpace: 'nowrap',
      backdropFilter: 'blur(6px)',
    },
    tones: {
      accent: { background: 'rgba(255,126,107,0.18)', color: '#B43A28' },
      muted: { background: 'rgba(155,140,255,0.18)', color: '#4A3DA8' },
      solid: { background: DEEP_BLUE, color: '#FFFDFA' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'DREAMY 01',
  title: '안개처럼 번지는 화면',
  tagline: '입자감 있는 흐림 위에 또렷한 한 줄',
  body: '코랄과 라벤더가 부드럽게 섞인 헤이즈 그라디언트 위에 필름 그레인을 얹어 몽환적인 안개를 만든다. 헤드라인은 잉크 단색으로 흐림 레이어와 분리해 또렷하게 읽히도록 올린다.',
  ctaPrimary: '무드보드 열기',
  ctaSecondary: '룩북 보기',
  bandTitle: '흐릿한 배경, 또렷한 메시지 — 그 사이의 균형.',
  items: [
    { name: '헤이즈 히어로', tone: 'accent', tag: 'HERO', desc: '블러 그라디언트 위에 대형 헤드라인을 겹쳐 시네마틱한 첫인상을 만든다.' },
    { name: '무드 카드', tone: 'muted', tag: 'MOODBOARD', desc: '페더 가장자리와 그레인 오버레이로 사진적 감성의 카드 그리드를 쌓는다.' },
    { name: '헤이즈 칩', tone: 'solid', tag: 'LABEL', desc: '반투명 헤이즈 칩으로 분류 라벨을 흐림 위에 가볍게 띄운다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'GrainyBlurDreamyShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 헤이즈',
    dos: [
      '헤드라인은 선명한 단색 텍스트를 블러 레이어 위에 분리해 올리고 충분한 대비를 확보한다.',
      '그레인은 텍스처 레이어(::before/::after)로만 합성하고 콘텐츠 텍스트에는 적용하지 않는다.',
      '시네마틱한 넉넉한 여백으로 헤이즈 그라디언트가 번질 공간을 확보한다.',
    ],
    donts: [
      '흐릿한 그라디언트 위에 저대비 텍스트를 직접 올려 가독성을 무너뜨리지 않는다.',
      '그레인 opacity를 과도하게 올려 시각 소음·깜빡임을 만들지 않는다.',
      'soft ambient 헤이즈 대신 윤곽이 또렷한 하드 그림자를 쓰지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '저대비·블러 배경이 본질이므로 본문/CTA는 솔리드 배경칩 또는 4.5:1 이상 대비를 강제한다.',
      '포커스 링은 그레인 위에서도 보이도록 별도 토큰(deep blue 3px outline)을 사용한다.',
      '애니메이션 그레인/흐름 그라디언트는 prefers-reduced-motion: reduce 시 정지해 입자 깜빡임 발작 위험을 피한다.',
      '블러는 CSS filter/배경 이미지로만 적용하고 콘텐츠 텍스트에는 미적용한다.',
      '인물/그라디언트 이미지에는 대체텍스트를 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '대형 산세리프 디스플레이(Inter Tight 등 굵은 그로테스크)로 헤드라인을 올리고, 가독 본문 산세리프(Inter)로 본문을 절제한다.',
    requiredFonts: ['Inter Tight', 'Inter'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Grainy_Blur_Dreamy_01: 필름 그레인 + 아웃포커스 블러가 코랄/라벤더 헤이즈 그라디언트 위에 겹쳐 몽환적 포토그래픽 안개를 만든다. 또렷한 잉크 단색 헤드라인이 흐림과 분리되는 것이 시그니처.',
  components: {
    Button: {
      description: '코랄 그라디언트 fill에 미세 그레인을 얹은 pill 버튼. 호버 시 채도가 살짝 선명해진다.',
      specs: ['모서리: pill(9999px)', '채움: 코랄 그라디언트 + grain overlay', '그림자: soft ambient sm', 'hover: saturate/brightness 미세 선명화', 'focus-visible: deep blue 3px outline'],
    },
    Card: {
      description: '헤이즈 그라디언트 배경 + 그레인 오버레이의 HazeCard. soft ambient 그림자, hover 시 3px 떠오른다.',
      specs: ['모서리: radius lg(22px)', '배경: haze gradient + grain ::before', '그림자: soft ambient md', 'hover: translateY(-3px)', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: '반투명 헤이즈 칩. accent=코랄 헤이즈, muted=라벤더 헤이즈, solid=딥 블루.',
      specs: ['모서리: pill(9999px)', 'backdrop blur 6px', 'letter-spacing 0.1em', '색: coral-haze / lavender-haze / deep-blue'],
    },
  },
  example: Showcase,
};

export const grainyBlurDreamyWrappers = wrapperComponents;
export const GrainyBlurDreamyShowcase = Showcase;

export const grainyBlurDreamyStyleGuide: StyleGuide = {
  name: 'grainy-blur-dreamy-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { GrainyBlurDreamyShowcase: Showcase },
  guidelines,
  visualMotif,
};
