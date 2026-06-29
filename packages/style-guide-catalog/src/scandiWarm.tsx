import type { StyleGuide, VisualMotif } from '../StyleGuide';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Scandi_Warm_01 — 북유럽 따뜻한 미니멀.
 *
 * 따뜻한 오프화이트/베이지 캔버스(#F4EFE6) 위에 우드톤(#A6794F)을 주조로,
 * 세이지(#7C8B6F)를 절제된 액센트로 쓴다. 휴머니스트 산세리프, 부드러운 radius md,
 * 낮고 절제된 그림자. 라이트 베이스이므로 저채도 대비를 별도로 보강한다.
 */

const WOOD = '#A6794F';
const WOOD_HOVER = '#946A44';
const WOOD_ACTIVE = '#7E5A39';
const SAGE = '#7C8B6F';
const PAPER = '#F4EFE6';
const INK = '#2E2A24';

const foundations = makeFoundations({
  name: 'scandi-warm-01',
  description: '따뜻한 오프화이트 위 우드톤 주조 + 세이지 액센트의 북유럽 미니멀(라이트 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(58,50,42,0.06)',
    md: '0 4px 12px rgba(58,50,42,0.08)',
    lg: '0 10px 28px rgba(58,50,42,0.10)',
    xl: '0 18px 44px rgba(58,50,42,0.12)',
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: '#FBF8F2',
    bgSunken: '#EBE3D6',
    overlay: 'rgba(46,42,36,0.40)',
    fg: INK,
    fgMuted: '#5C5346',
    fgSubtle: '#8A7F70',
    fgInverse: '#FBF8F2',
    border: '#DDD3C2',
    borderMuted: '#E8E0D2',
    borderStrong: '#C8BBA5',
    focus: '#7E5A39',
    primaryBase: WOOD,
    primaryHover: WOOD_HOVER,
    primaryActive: WOOD_ACTIVE,
    primarySubtle: 'rgba(166,121,79,0.14)',
    primaryFg: '#FFFFFF',
    accent: SAGE,
    accent2: '#9AA888',
    accent3: '#C9A36A',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-paper-warm': PAPER,
  '--bbangto-ext-soft-divider': '#E3DACB',
  '--bbangto-ext-wood': WOOD,
  '--bbangto-ext-sage': SAGE,
  '--bbangto-ext-paper-grain': 'rgba(166,121,79,0.05)',
};

const STYLE_ID = 'bbangto-scandi-warm-01-motif';
const CSS = `
.bbangto-sca-btn {
  background: var(--bbangto-ext-wood, ${WOOD}) !important;
  color: #fff !important;
  border: 1px solid transparent !important;
  border-radius: var(--bbangto-radius-md, 10px) !important;
  box-shadow: 0 1px 2px rgba(58,50,42,0.08) !important;
  transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease !important;
}
.bbangto-sca-btn:hover { background: ${WOOD_HOVER} !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(58,50,42,0.12) !important; }
.bbangto-sca-btn:active { background: ${WOOD_ACTIVE} !important; transform: translateY(0); }
.bbangto-sca-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, ${WOOD_ACTIVE}) !important; outline-offset: 2px; }
.bbangto-sca-card {
  background: var(--bbangto-ext-paper-warm, ${PAPER}) !important;
  border: 1px solid var(--bbangto-ext-soft-divider, #E3DACB) !important;
  border-radius: var(--bbangto-radius-lg, 14px) !important;
  box-shadow: 0 4px 12px rgba(58,50,42,0.06) !important;
  background-image: radial-gradient(var(--bbangto-ext-paper-grain, rgba(166,121,79,0.05)) 0.5px, transparent 0.5px) !important;
  background-size: 6px 6px !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-sca-btn { transition: none !important; }
  .bbangto-sca-btn:hover, .bbangto-sca-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-sca-btn',
  cardClass: 'bbangto-sca-card',
  displayPrefix: 'Scandi',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: 'rgba(124,139,111,0.16)', color: '#43503A', border: '1px solid rgba(124,139,111,0.45)' },
      muted: { background: '#EBE3D6', color: '#5C5346', border: '1px solid #DDD3C2' },
      solid: { background: WOOD, color: '#fff', border: '1px solid transparent' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SCANDI WARM',
  title: '따뜻한 종이 위의 절제',
  tagline: '우드톤과 세이지의 고요한 균형',
  body: '저채도 오프화이트 표면 위에 우드톤을 주조로 얹고, 세이지를 점처럼 흩뿌려 위계를 만든다. 여백과 부드러운 모서리가 모티프의 시그니처다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '가이드 보기',
  bandTitle: '따뜻한 미니멀 인터페이스, 지금 살펴보세요.',
  items: [
    { name: 'Paper', tone: 'accent', tag: 'SURFACE', desc: '따뜻한 오프화이트 표면에 미세한 결을 더해 종이 질감을 만든다.' },
    { name: 'Hierarchy', tone: 'muted', tag: 'RHYTHM', desc: '넉넉한 여백과 위계로 정보를 차분하게 정렬한다.' },
    { name: 'Accent', tone: 'solid', tag: 'WOOD', desc: '우드톤과 세이지를 절제해 초점을 한 곳으로 모은다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'ScandiShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 결',
    dos: ['표면은 따뜻한 오프화이트 + 미세한 종이 결로 차분한 깊이를 만든다.', '카드 경계는 1px soft divider로 부드럽게 구분한다.'],
    donts: ['차가운 순백(#FFFFFF) 단색 배경을 쓰지 않는다(온기 상실).', '강한 그림자나 진한 보더로 과한 입체감을 주지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '저채도 베이지 위 본문은 짙은 잉크색(#2E2A24)으로 충분한 대비를 확보한다.',
      '우드톤 버튼 위 흰 텍스트는 4.5:1 이상 대비를 유지한다.',
      'prefers-reduced-motion에서 hover transform을 끈다.',
      ':focus-visible에 우드톤 outline을 명확히 둔다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(휴머니스트 sans), 라벨·수치 IBM Plex Mono(mono).',
    requiredFonts: ['Pretendard', 'IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Scandi_Warm_01: 따뜻한 오프화이트 위 우드톤 주조 표면, 세이지 절제 액센트, 부드러운 radius와 낮은 그림자, 미세한 종이 결.',
  components: {
    Button: {
      description: '우드톤 솔리드 버튼. 낮은 그림자와 부드러운 모서리로 따뜻하고 차분한 인상을 만든다.',
      specs: ['배경: 우드톤 솔리드(#A6794F)', '글자: 흰색(대비 4.5:1+)', '모서리: radius md(10px)', 'hover: 살짝 짙어지며 1px 떠오름', 'focus-visible: 우드톤 outline'],
    },
    Card: {
      description: '카드는 따뜻한 종이 표면에 미세한 결을 더하고, soft divider 보더로 차분히 떠오른다.',
      specs: ['배경: 따뜻한 오프화이트 + 종이 결', '보더: 1px soft divider', '모서리: radius lg(14px)', '그림자: 낮고 부드러운 ambient'],
    },
    Tag: {
      description: '경량 pill 배지. 세이지·중립·우드톤으로 절제된 강조를 한다.',
      specs: ['배경: tone별(accent 세이지 / muted 중립 / solid 우드)', '모서리: pill(999)', '폰트: IBM Plex Mono', '저채도 대비 보강'],
    },
  },
  example: Showcase,
};

export const ScandiShowcase = Showcase;
export const scandiWarmWrappers = wrapperComponents;

export const scandiWarmStyleGuide: StyleGuide = {
  name: 'scandi-warm-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { ScandiShowcase: Showcase },
  guidelines,
  visualMotif,
};
