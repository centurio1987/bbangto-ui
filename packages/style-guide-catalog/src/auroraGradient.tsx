import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Aurora_Gradient_01 — 오로라 메시 그라디언트 (AI/SaaS 랜딩).
 *
 * 딥 다크 베이스(#0A0E1A) 위에 다점 메시/오로라 그라디언트 배경과 부유 글로우 오브를
 * 깔고, 버튼은 그라디언트 fill + glow, Card/GNB는 다크 글래스로 처리한다.
 * 그라디언트 위 텍스트 대비를 별도 확보하고, 흐르는 그라디언트는
 * prefers-reduced-motion에서 비활성화한다(본문은 밝은색 고정).
 */

const DEEP = '#0A0E1A';
const PURPLE = '#A24BFF';
const PINK = '#FF5DA2';
const TEAL = '#34E0C8';
const ICE = '#7DE3FF';

const foundations = makeFoundations({
  name: 'aurora-gradient-01',
  description: '딥 다크 베이스 위 오로라 메시 그라디언트 + 부유 글로우 오브, 그라디언트 fill 버튼·다크 글래스 표면(AI/SaaS 랜딩)',
  fontSans: "'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '10px', md: '14px', lg: '20px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 10px rgba(0,0,0,0.30)',
    md: '0 10px 30px rgba(0,0,0,0.38)',
    lg: '0 18px 50px rgba(0,0,0,0.45)',
    xl: '0 28px 72px rgba(0,0,0,0.55)',
  },
  semantic: makeSemantic({
    bg: `radial-gradient(90% 80% at 12% 8%, #1B1248 0%, rgba(10,14,26,0) 55%), radial-gradient(80% 70% at 88% 18%, #0C3B4A 0%, rgba(10,14,26,0) 50%), radial-gradient(90% 90% at 50% 100%, #2A1140 0%, rgba(10,14,26,0) 55%), ${DEEP}`,
    bgElevated: 'rgba(255,255,255,0.06)',
    bgSunken: 'rgba(255,255,255,0.03)',
    overlay: 'rgba(6,9,18,0.66)',
    fg: '#EAF0FF',
    fgMuted: 'rgba(226,233,255,0.78)',
    fgSubtle: 'rgba(226,233,255,0.52)',
    fgInverse: DEEP,
    border: 'rgba(255,255,255,0.16)',
    borderMuted: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.30)',
    focus: ICE,
    primaryBase: PURPLE,
    primaryHover: '#9438F0',
    primaryActive: '#7E27D6',
    primarySubtle: 'rgba(162,75,255,0.16)',
    primaryFg: '#FFFFFF',
    accent: TEAL,
    accent2: PINK,
    accent3: ICE,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-mesh':
    'radial-gradient(60% 50% at 15% 10%, rgba(162,75,255,0.55), transparent 60%), radial-gradient(55% 45% at 85% 20%, rgba(52,224,200,0.45), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(255,93,162,0.40), transparent 60%)',
  '--bbangto-ext-glow-orb':
    'radial-gradient(circle at 50% 50%, rgba(125,227,255,0.55), rgba(125,227,255,0) 70%)',
  '--bbangto-ext-noise':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
  '--bbangto-ext-btn-gradient': 'linear-gradient(135deg, #A24BFF 0%, #FF5DA2 55%, #34E0C8 100%)',
  '--bbangto-ext-glow': 'rgba(162,75,255,0.45)',
};

const STYLE_ID = 'bbangto-aurora-gradient-01-motif';
const CSS = `
.bbangto-aur-btn {
  background-color: #7E27D6 !important;
  background-image: var(--bbangto-ext-btn-gradient, linear-gradient(135deg,#A24BFF,#FF5DA2 55%,#34E0C8)) !important;
  background-size: 200% 200% !important;
  background-position: 0% 50% !important;
  color: #fff !important;
  border: 1px solid rgba(255,255,255,0.18) !important;
  border-radius: var(--bbangto-radius-lg, 20px) !important;
  box-shadow: 0 8px 28px var(--bbangto-ext-glow, rgba(162,75,255,0.45)), inset 0 1px 0 rgba(255,255,255,0.25) !important;
  text-shadow: 0 1px 2px rgba(10,14,26,0.45);
  transition: transform 180ms ease, box-shadow 180ms ease !important;
  animation: bbangto-aur-flow 8s ease-in-out infinite;
}
.bbangto-aur-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 36px var(--bbangto-ext-glow, rgba(162,75,255,0.55)), inset 0 1px 0 rgba(255,255,255,0.30) !important;
}
.bbangto-aur-btn:active { transform: translateY(0); }
.bbangto-aur-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #7DE3FF) !important; outline-offset: 2px; }
@keyframes bbangto-aur-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.bbangto-aur-card {
  background-color: rgba(18,22,38,0.62) !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  border-radius: var(--bbangto-radius-lg, 20px) !important;
  box-shadow: 0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10) !important;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-aur-btn { animation: none !important; transition: none !important; background-position: 0% 50% !important; }
  .bbangto-aur-btn:hover, .bbangto-aur-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-aur-btn',
  cardClass: 'bbangto-aur-card',
  displayPrefix: 'Aurora',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: 'rgba(52,224,200,0.16)', color: '#9CF6E6', border: '1px solid rgba(52,224,200,0.50)' },
      muted: { background: 'rgba(255,255,255,0.07)', color: 'rgba(226,233,255,0.80)', border: '1px solid rgba(255,255,255,0.16)' },
      solid: { background: PURPLE, color: '#fff', border: '1px solid rgba(255,255,255,0.28)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'AURORA MESH',
  title: '흐르는 빛으로 그린 인터페이스',
  tagline: '메시 그라디언트가 만드는 깊이',
  body: '딥 다크 캔버스 위로 보라·핑크·틸 오로라가 번지고, 부유 글로우 오브가 초점을 모은다. 표면은 다크 글래스, 버튼은 흐르는 그라디언트 fill로 시선을 끈다.',
  ctaPrimary: '무료로 시작',
  ctaSecondary: '데모 보기',
  bandTitle: '오로라 위에서 빛나는 제품을 지금 만들어 보세요.',
  items: [
    { name: 'Mesh', tone: 'accent', tag: 'GRADIENT', desc: '다점 메시 그라디언트로 화면 전체에 빛을 흘린다.' },
    { name: 'Orb', tone: 'muted', tag: 'GLOW', desc: '부유 글로우 오브가 콘텐츠 뒤에서 부드럽게 빛난다.' },
    { name: 'Surface', tone: 'solid', tag: 'GLASS', desc: '다크 글래스 표면이 그라디언트 위로 떠오른다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'AuroraShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 그라디언트',
    dos: ['배경은 다점 메시 그라디언트로 딥 다크 위에 빛을 흘린다.', '표면(Card/GNB)은 다크 글래스로 그라디언트 위에 떠오르게 한다.'],
    donts: ['그라디언트를 표면 콘텐츠 영역까지 침범시키지 않는다(가독성 저하).', '글로우 오브를 과밀하게 배치해 초점을 흩뜨리지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '그라디언트 위 텍스트는 별도로 대비를 확보한다(밝은 본문색 고정 + text-shadow 보강).',
      '흐르는 그라디언트 애니메이션은 prefers-reduced-motion에서 비활성화한다.',
      'focus-visible에서 아이스 블루 outline으로 포커스를 명확히 표시한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Inter(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Inter', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Aurora_Gradient_01: 딥 다크(#0A0E1A) 위 다점 메시/오로라 그라디언트 배경, 부유 글로우 오브, 그라디언트 fill + glow 버튼, 다크 글래스 표면.',
  components: {
    Button: {
      description: '그라디언트 fill 버튼. 보라→핑크→틸 그라디언트가 흐르며 글로우 그림자로 시선을 끈다.',
      specs: ['배경: 흐르는 그라디언트 fill(보라·핑크·틸)', '그림자: 보라 glow + inset 하이라이트', '모서리: radius lg(20px)', 'hover: 1px 떠오르며 glow 강화', 'reduced-motion: 흐름 애니메이션 정지', 'focus-visible: 아이스 블루 outline'],
    },
    Card: {
      description: '다크 글래스 카드. 반투명 어두운 표면 + blur로 그라디언트 배경 위에 떠 있는 인상을 만든다.',
      specs: ['배경: 반투명 다크(rgba) + backdrop-blur 14px', '보더: 1px 반투명 하이라이트', '모서리: radius lg(20px)', '그림자: 깊은 ambient + inset 하이라이트'],
    },
    Tag: {
      description: '경량 pill 배지. tone별 반투명 배경으로 표면 위 라벨 위계를 만든다.',
      specs: ['배경: tone별 반투명(accent 틸 / muted 흰색 / solid 보라)', '모서리: pill(999)', '폰트: JetBrains Mono', '대비: 밝은 라벨색 고정'],
    },
  },
  example: Showcase,
};

export const AuroraShowcase = Showcase;
export const auroraGradientWrappers = wrapperComponents;

export const auroraGradientStyleGuide: StyleGuide = {
  name: 'aurora-gradient-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { AuroraShowcase: Showcase },
  guidelines,
  visualMotif,
};
