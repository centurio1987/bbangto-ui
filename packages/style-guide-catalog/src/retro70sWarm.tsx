import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Retro70s_Warm_01 — 70년대 따뜻한 레트로.
 *
 * 크림 베이스 위에 머스타드·테라코타·올리브 어스톤을 얹는다. groovy 라운드
 * 산세리프 디스플레이, 버블 라운드(radius xl), 알약형 버튼·태그, 상단 아치 카드.
 * 필름 그레인 텍스처가 시그니처라 본문·포커스 대비를 별도로 확보한다.
 */

const MUSTARD = '#E0A526';
const TERRACOTTA = '#C75D3A';
const OLIVE = '#6B7233';
const CREAM = '#F2E6CE';
const INK = '#3A2A1A';

const foundations = makeFoundations({
  name: 'retro70s-warm-01',
  description: '크림 베이스 위 머스타드·테라코타·올리브 어스톤 + 필름 그레인 텍스처의 70년대 따뜻한 레트로',
  fontSans: "'Poppins', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', monospace",
  radius: { none: '0px', sm: '10px', md: '16px', lg: '24px', xl: '36px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 6px rgba(58,42,26,0.12)',
    md: '0 6px 16px rgba(58,42,26,0.16)',
    lg: '0 12px 30px rgba(58,42,26,0.20)',
    xl: '0 20px 48px rgba(58,42,26,0.26)',
  },
  semantic: makeSemantic({
    bg: CREAM,
    bgElevated: '#FBF3E2',
    bgSunken: '#E9D9BC',
    overlay: 'rgba(58,42,26,0.50)',
    fg: INK,
    fgMuted: 'rgba(58,42,26,0.74)',
    fgSubtle: 'rgba(58,42,26,0.55)',
    fgInverse: '#FBF3E2',
    border: 'rgba(58,42,26,0.26)',
    borderMuted: 'rgba(58,42,26,0.14)',
    borderStrong: 'rgba(58,42,26,0.42)',
    focus: '#1F6B5A',
    primaryBase: TERRACOTTA,
    primaryHover: '#B14D2D',
    primaryActive: '#963F23',
    primarySubtle: 'rgba(199,93,58,0.16)',
    primaryFg: '#FBF3E2',
    accent: MUSTARD,
    accent2: OLIVE,
    accent3: TERRACOTTA,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-arch': '36px 36px 0 0',
  '--bbangto-ext-grain': 'radial-gradient(rgba(58,42,26,0.10) 1px, transparent 1.4px)',
  '--bbangto-ext-grain-size': '4px 4px',
  '--bbangto-ext-mustard': MUSTARD,
  '--bbangto-ext-terracotta': TERRACOTTA,
  '--bbangto-ext-olive': OLIVE,
};

const STYLE_ID = 'bbangto-retro70s-warm-01-motif';
const CSS = `
.bbangto-ret-btn {
  background: var(--bbangto-ext-terracotta, ${TERRACOTTA}) !important;
  color: #FBF3E2 !important;
  border: 2px solid rgba(58,42,26,0.30) !important;
  border-radius: var(--bbangto-radius-full, 9999px) !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
  box-shadow: 0 4px 0 rgba(58,42,26,0.22) !important;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease !important;
}
.bbangto-ret-btn:hover { background: var(--bbangto-ext-mustard, ${MUSTARD}) !important; color: ${INK} !important; transform: translateY(-2px); box-shadow: 0 6px 0 rgba(58,42,26,0.22) !important; }
.bbangto-ret-btn:active { transform: translateY(0); box-shadow: 0 2px 0 rgba(58,42,26,0.22) !important; }
.bbangto-ret-btn:focus-visible { outline: 3px solid var(--bbangto-semantic-border-focus, #1F6B5A) !important; outline-offset: 2px; }
.bbangto-ret-card {
  position: relative;
  background: var(--bbangto-semantic-background-elevated, #FBF3E2) !important;
  border: 2px solid rgba(58,42,26,0.22) !important;
  border-radius: var(--bbangto-ext-arch, 36px 36px 0 0) !important;
  box-shadow: var(--bbangto-shadow-md, 0 6px 16px rgba(58,42,26,0.16)) !important;
  overflow: hidden;
}
.bbangto-ret-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--bbangto-ext-grain, radial-gradient(rgba(58,42,26,0.10) 1px, transparent 1.4px));
  background-size: var(--bbangto-ext-grain-size, 4px 4px);
  opacity: 0.55;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-ret-btn { transition: none !important; }
  .bbangto-ret-btn:hover, .bbangto-ret-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-ret-btn',
  cardClass: 'bbangto-ret-card',
  displayPrefix: 'Retro',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px',
      borderRadius: 9999, fontFamily: "'Space Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      accent: { backgroundColor: 'rgba(224,165,38,0.22)', color: '#6E4D08', border: '2px solid rgba(224,165,38,0.60)' },
      muted: { backgroundColor: 'rgba(107,114,51,0.16)', color: '#3F4517', border: '2px solid rgba(107,114,51,0.45)' },
      solid: { backgroundColor: TERRACOTTA, color: '#FBF3E2', border: '2px solid rgba(58,42,26,0.30)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'WARM RETRO',
  title: '따뜻한 70년대의 결',
  tagline: '어스톤 위에 구르는 라운드',
  body: '크림 베이스에 머스타드·테라코타·올리브를 얹고, 필름 그레인 한 겹으로 빈티지한 결을 입힌다. 알약형 버튼과 상단 아치 카드가 모티프의 시그니처다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '둘러보기',
  bandTitle: '레트로 무드의 인터페이스, 지금 만나보세요.',
  items: [
    { name: 'Earthtone', tone: 'accent', tag: 'COLOR', desc: '머스타드·테라코타·올리브 어스톤으로 따뜻함을 쌓는다.' },
    { name: 'Grain', tone: 'muted', tag: 'TEXTURE', desc: '필름 그레인 한 겹으로 빈티지한 표면감을 더한다.' },
    { name: 'Arch', tone: 'solid', tag: 'SHAPE', desc: '상단 아치와 버블 라운드로 부드러운 인상을 만든다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'RetroShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 텍스처',
    dos: ['카드 상단은 아치 라운드로, 버튼·태그는 알약형으로 통일한다.', '필름 그레인은 옅게(저투명) 깔아 표면 결로만 느껴지게 한다.'],
    donts: ['그레인을 과하게 올려 본문 가독성을 해치지 않는다.', '차가운 회색 표면을 섞어 어스톤 무드를 깨지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '크림 베이스 위 본문은 짙은 잉크색으로 충분한 대비를 확보한다.',
      '머스타드 표면 위 텍스트는 어두운 글자색을 써 대비를 유지한다.',
      'prefers-reduced-motion에서 hover transform을 끈다.',
      'focus-visible은 보색 그린 outline으로 어스톤과 구분한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '디스플레이·본문 Poppins(groovy 라운드 sans), 라벨·수치 Space Mono(mono).',
    requiredFonts: ['Poppins', 'Space Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Retro70s_Warm_01: 크림 베이스 위 머스타드·테라코타·올리브 어스톤, 필름 그레인 텍스처, 알약형 버튼·태그, 상단 아치 카드의 70년대 따뜻한 레트로.',
  components: {
    Button: {
      description: '알약형 레트로 버튼. 어스톤 위에 입체 하단 그림자가 얹혀 누르는 손맛을 만든다.',
      specs: ['배경: 테라코타 → hover 머스타드', '모서리: pill(full)', '보더: 2px 잉크 반투명', '그림자: 4px 하단 솔리드(누르면 줄어듦)', 'focus-visible: 보색 그린 outline'],
    },
    Card: {
      description: '상단이 아치로 둥근 카드. 표면에 옅은 필름 그레인이 깔려 빈티지한 결을 만든다.',
      specs: ['배경: 크림 elevated', '모서리: 상단 아치(arch 36px)', '보더: 2px 잉크 반투명', '텍스처: 옅은 필름 그레인 오버레이', '그림자: 부드러운 md'],
    },
    Tag: {
      description: '알약형 모노 배지. tone별 어스톤 반투명 배경으로 표면과 같은 무드를 유지한다.',
      specs: ['배경: tone별 어스톤 반투명(accent 머스타드 / muted 올리브 / solid 테라코타)', '모서리: pill(9999)', '폰트: Space Mono 대문자', '보더: 2px tone 반투명'],
    },
  },
  example: Showcase,
};

export const RetroShowcase = Showcase;
export const retro70sWarmWrappers = wrapperComponents;

export const retro70sWarmStyleGuide: StyleGuide = {
  name: 'retro70s-warm-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { RetroShowcase: Showcase },
  guidelines,
  visualMotif,
};
