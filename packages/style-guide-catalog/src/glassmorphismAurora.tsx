import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Glassmorphism_Aurora_01 — 반투명 frosted glass + 오로라 배경.
 *
 * 깊은 인디고 캔버스 위에 backdrop-blur 반투명 표면, 1px 하이라이트 보더,
 * 보라/시안 오로라 강조. 다크 베이스라 텍스트 대비를 별도로 확보한다.
 */

const PRIMARY = '#7C5CFF';
const CYAN = '#5BE0E6';

const foundations = makeFoundations({
  name: 'glassmorphism-aurora-01',
  description: '반투명 frosted glass + 배경 블러 + 보라·시안 오로라 강조(다크 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.25)',
    md: '0 8px 24px rgba(0,0,0,0.30)',
    lg: '0 16px 48px rgba(0,0,0,0.40)',
    xl: '0 24px 64px rgba(0,0,0,0.50)',
  },
  semantic: makeSemantic({
    bg: 'radial-gradient(125% 125% at 8% 0%, #232861 0%, #0D0F24 58%)',
    bgElevated: 'rgba(255,255,255,0.08)',
    bgSunken: 'rgba(255,255,255,0.04)',
    overlay: 'rgba(8,10,30,0.60)',
    fg: '#F4F6FF',
    fgMuted: 'rgba(232,236,255,0.80)',
    fgSubtle: 'rgba(232,236,255,0.55)',
    fgInverse: '#10122E',
    border: 'rgba(255,255,255,0.28)',
    borderMuted: 'rgba(255,255,255,0.14)',
    borderStrong: 'rgba(255,255,255,0.40)',
    focus: '#8AB4FF',
    primaryBase: PRIMARY,
    primaryHover: '#6B4AF0',
    primaryActive: '#5A3DD8',
    primarySubtle: 'rgba(124,92,255,0.18)',
    primaryFg: '#FFFFFF',
    accent: CYAN,
    accent2: '#B388FF',
    accent3: '#FF8AC7',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-glass-bg': 'rgba(255,255,255,0.10)',
  '--bbangto-ext-glass-border': 'rgba(255,255,255,0.30)',
  '--bbangto-ext-glass-blur': '16px',
  '--bbangto-ext-glass-highlight': 'rgba(255,255,255,0.55)',
  '--bbangto-ext-aurora': 'conic-gradient(from 120deg, #7C5CFF, #5BE0E6, #FF8AC7, #7C5CFF)',
};

const STYLE_ID = 'bbangto-glassmorphism-aurora-motif';
const CSS = `
.bbangto-glass-btn {
  background: var(--bbangto-ext-glass-bg, rgba(255,255,255,0.10)) !important;
  color: #fff !important;
  border: 1px solid var(--bbangto-ext-glass-border, rgba(255,255,255,0.30)) !important;
  border-radius: var(--bbangto-radius-md, 12px) !important;
  box-shadow: inset 0 1px 0 var(--bbangto-ext-glass-highlight, rgba(255,255,255,0.55)), 0 4px 16px rgba(0,0,0,0.25) !important;
  -webkit-backdrop-filter: blur(var(--bbangto-ext-glass-blur, 16px));
  backdrop-filter: blur(var(--bbangto-ext-glass-blur, 16px));
  transition: transform 160ms ease, background 160ms ease !important;
}
.bbangto-glass-btn:hover { background: rgba(255,255,255,0.18) !important; transform: translateY(-1px); }
.bbangto-glass-btn:active { transform: translateY(0); }
.bbangto-glass-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #8AB4FF) !important; outline-offset: 2px; }
.bbangto-glass-card {
  background: var(--bbangto-ext-glass-bg, rgba(255,255,255,0.10)) !important;
  border: 1px solid var(--bbangto-ext-glass-border, rgba(255,255,255,0.30)) !important;
  border-radius: var(--bbangto-radius-lg, 16px) !important;
  box-shadow: inset 0 1px 0 var(--bbangto-ext-glass-highlight, rgba(255,255,255,0.55)), 0 16px 48px rgba(0,0,0,0.40) !important;
  -webkit-backdrop-filter: blur(var(--bbangto-ext-glass-blur, 16px));
  backdrop-filter: blur(var(--bbangto-ext-glass-blur, 16px));
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-glass-btn { transition: none !important; }
  .bbangto-glass-btn:hover, .bbangto-glass-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-glass-btn',
  cardClass: 'bbangto-glass-card',
  displayPrefix: 'Glass',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
    },
    tones: {
      accent: { background: 'rgba(91,224,230,0.16)', color: '#BEFBFF', border: '1px solid rgba(91,224,230,0.50)' },
      muted: { background: 'rgba(255,255,255,0.08)', color: 'rgba(232,236,255,0.80)', border: '1px solid rgba(255,255,255,0.18)' },
      solid: { background: PRIMARY, color: '#fff', border: '1px solid rgba(255,255,255,0.30)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'AURORA GLASS',
  title: '빛을 머금은 유리 표면',
  tagline: '반투명 위에 쌓이는 깊이',
  body: '깊은 색 배경 위로 frosted glass 표면을 겹쳐 위계를 만든다. 표면마다 1px 하이라이트 보더가 모티프의 시그니처다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '문서 보기',
  bandTitle: '오로라 위에 띄운 인터페이스, 지금 살펴보세요.',
  items: [
    { name: 'Surface', tone: 'accent', tag: 'GLASS', desc: '반투명 + backdrop-blur로 뒤 배경을 비춘다.' },
    { name: 'Depth', tone: 'muted', tag: 'LAYER', desc: '다층 투명도로 카드 스택의 깊이를 표현한다.' },
    { name: 'Glow', tone: 'solid', tag: 'AURORA', desc: '보라·시안 오로라 강조로 초점을 모은다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'GlassmorphismShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 블러',
    dos: ['표면은 반투명 + backdrop-blur로 뒤 콘텐츠를 비춘다.', '표면 위 1px 하이라이트 보더로 유리 가장자리를 표현한다.'],
    donts: ['불투명 단색 표면을 쓰지 않는다(유리감 상실).', '블러를 과도하게 중첩해 성능을 떨어뜨리지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '반투명 위 텍스트는 충분한 대비를 별도 확보한다(밝은 본문색 고정).',
      'backdrop-filter 미지원 브라우저용 불투명 폴백 배경을 둔다.',
      'prefers-reduced-motion에서 hover transform을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Glassmorphism_Aurora_01: 깊은 인디고 위 반투명 frosted glass 표면, 1px 하이라이트 보더, 보라·시안 오로라 강조, backdrop-blur 깊이.',
  components: {
    Button: {
      description: '반투명 유리 버튼. 뒤 배경을 비추며, 안쪽 하이라이트로 가장자리에 빛이 맺힌다.',
      specs: ['배경: 반투명 흰색 + backdrop-blur', '보더: 1px 반투명 하이라이트', '모서리: radius md(12px)', 'hover: 밝아지며 1px 떠오름', 'focus-visible: 포커스 블루 outline'],
    },
    Card: {
      description: '카드는 더 두꺼운 블러와 부드러운 그림자로 배경에서 떠 있는 유리판 인상을 만든다.',
      specs: ['배경: 반투명 흰색 + blur 16px', '보더: 1px 반투명 하이라이트', '모서리: radius lg(16px)', '그림자: 부드러운 ambient + inset 하이라이트'],
    },
    Tag: {
      description: '경량 pill 배지. 반투명 배경 위 작은 블러로 표면과 같은 재질감을 유지한다.',
      specs: ['배경: tone별 반투명(accent 시안 / muted 흰색 / solid 보라)', '모서리: pill(999)', '폰트: JetBrains Mono', '작은 backdrop-blur(6px)'],
    },
  },
  example: Showcase,
};

export const GlassmorphismShowcase = Showcase;
export const glassmorphismAuroraWrappers = wrapperComponents;

export const glassmorphismAuroraStyleGuide: StyleGuide = {
  name: 'glassmorphism-aurora-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { GlassmorphismShowcase: Showcase },
  guidelines,
  visualMotif,
};
