import type { StyleGuide, VisualMotif } from '../StyleGuide';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Y2K_Futurism_01 — 크롬/실버 메탈 + 네온 글로우.
 *
 * 밝은 실버 베이스 위에 거울 같은 크롬 그라디언트와 글로시 하이라이트, 핑크·시안·라임
 * 네온 강조를 얹는다. 버블/테크노 라운드 폼(radius lg)이 시그니처. 글로시 표면은
 * 대비가 출렁이므로 텍스트·포커스 대비를 별도로 고정하고, 글로우/모션은 절제 옵션을 둔다.
 */

const NEON_PINK = '#FF4FD8';
const NEON_CYAN = '#4FE0FF';
const NEON_LIME = '#B6FF3C';
const INK = '#171430';

const foundations = makeFoundations({
  name: 'y2k-futurism-01',
  description: '크롬·실버 메탈 그라디언트 + 핑크·시안·라임 네온 + 글로시 버블 폼(라이트 실버 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '12px', md: '18px', lg: '26px', xl: '34px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(23,20,48,0.12)',
    md: '0 10px 28px rgba(23,20,48,0.16)',
    lg: '0 18px 50px rgba(79,224,255,0.22)',
    xl: '0 28px 72px rgba(255,79,216,0.26)',
  },
  semantic: makeSemantic({
    bg: 'linear-gradient(160deg, #EEF2F8 0%, #DCE3EE 52%, #E7ECF4 100%)',
    bgElevated: '#FBFCFE',
    bgSunken: '#E2E7F0',
    overlay: 'rgba(23,20,48,0.42)',
    fg: INK,
    fgMuted: '#4A4770',
    fgSubtle: '#6E6B92',
    fgInverse: '#FFFFFF',
    border: '#C2CAD9',
    borderMuted: '#D9DEE9',
    borderStrong: '#9AA4BA',
    focus: '#7A3CFF',
    primaryBase: NEON_PINK,
    primaryHover: '#F23BC8',
    primaryActive: '#D923B0',
    primarySubtle: 'rgba(255,79,216,0.16)',
    primaryFg: '#240C20',
    accent: NEON_CYAN,
    accent2: NEON_LIME,
    accent3: NEON_PINK,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-chrome': 'linear-gradient(150deg, #FBFCFE 0%, #C7D0DE 28%, #8E99AE 52%, #C7D0DE 74%, #FBFCFE 100%)',
  '--bbangto-ext-gloss': 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.28) 46%, rgba(255,255,255,0) 60%)',
  '--bbangto-ext-glow': '0 0 0 2px rgba(255,79,216,0.45), 0 0 22px rgba(79,224,255,0.55)',
  '--bbangto-ext-neon-pink': NEON_PINK,
  '--bbangto-ext-neon-cyan': NEON_CYAN,
  '--bbangto-ext-neon-lime': NEON_LIME,
};

const STYLE_ID = 'bbangto-y2k-futurism-01-motif';
const CSS = `
.bbangto-y2k-btn {
  position: relative !important;
  background-image: var(--bbangto-ext-chrome, linear-gradient(150deg,#FBFCFE,#8E99AE,#FBFCFE)) !important;
  color: #171430 !important;
  font-weight: 700 !important;
  border: 1px solid rgba(255,255,255,0.85) !important;
  border-radius: var(--bbangto-radius-lg, 26px) !important;
  text-shadow: 0 1px 0 rgba(255,255,255,0.7) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -3px 6px rgba(23,20,48,0.18), 0 8px 18px rgba(23,20,48,0.18) !important;
  overflow: hidden !important;
  isolation: isolate !important;
  transition: transform 150ms ease, box-shadow 150ms ease !important;
}
.bbangto-y2k-btn::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 52%;
  border-radius: inherit;
  background-image: var(--bbangto-ext-gloss, linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0)));
  pointer-events: none;
  z-index: 1;
}
.bbangto-y2k-btn:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -3px 6px rgba(23,20,48,0.18), var(--bbangto-ext-glow, 0 0 22px rgba(79,224,255,0.55)) !important;
}
.bbangto-y2k-btn:active { transform: translateY(0); }
.bbangto-y2k-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-border-focus, #7A3CFF) !important;
  outline-offset: 2px;
}
.bbangto-y2k-card {
  position: relative !important;
  background-color: var(--bbangto-semantic-background-elevated, #FBFCFE) !important;
  border: 1px solid rgba(255,255,255,0.9) !important;
  border-radius: var(--bbangto-radius-lg, 26px) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 14px 40px rgba(79,224,255,0.18), 0 4px 12px rgba(23,20,48,0.12) !important;
  overflow: hidden !important;
}
.bbangto-y2k-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 38%;
  background-image: var(--bbangto-ext-gloss, linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0)));
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-y2k-btn { transition: none !important; }
  .bbangto-y2k-btn:hover, .bbangto-y2k-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-y2k-btn',
  cardClass: 'bbangto-y2k-card',
  displayPrefix: 'Y2K',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.6, whiteSpace: 'nowrap',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
    },
    tones: {
      accent: { backgroundColor: 'rgba(79,224,255,0.20)', color: '#063743', border: '1px solid rgba(79,224,255,0.65)' },
      muted: { backgroundColor: 'rgba(23,20,48,0.06)', color: '#4A4770', border: '1px solid #C2CAD9' },
      solid: { backgroundColor: NEON_PINK, color: '#240C20', border: '1px solid rgba(255,255,255,0.7)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'CHROME // NEON',
  title: '거울 같은 크롬, 빛나는 네온',
  tagline: '버블 폼 위에 떠오르는 미래주의',
  body: '밝은 실버 베이스 위로 거울 같은 크롬 표면과 글로시 하이라이트를 얹고, 핑크·시안·라임 네온으로 초점을 만든다. 둥근 버블 폼이 모티프의 시그니처다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '문서 보기',
  bandTitle: '크롬과 네온이 흐르는 인터페이스, 지금 살펴보세요.',
  items: [
    { name: 'Chrome', tone: 'accent', tag: 'METAL', desc: '메탈 그라디언트로 거울 같은 표면을 만든다.' },
    { name: 'Gloss', tone: 'muted', tag: 'SHINE', desc: '상단 하이라이트로 글로시한 버블감을 더한다.' },
    { name: 'Glow', tone: 'solid', tag: 'NEON', desc: '핑크·시안 네온 글로우로 초점을 모은다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'Y2KShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 광택',
    dos: ['버튼·카드는 메탈 그라디언트 + 상단 글로시 하이라이트로 입체감을 준다.', '강조는 핑크·시안·라임 네온을 점으로만 쓴다(면적 최소화).'],
    donts: ['글로시 하이라이트 위에 본문 텍스트를 직접 얹지 않는다(대비 손실).', '네온을 넓은 면적에 깔아 눈부심을 만들지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '글로시 표면 위 텍스트는 진한 잉크색(#171430)을 고정해 대비를 별도 확보한다.',
      'focus-visible는 보라(#7A3CFF) 3px outline + offset으로 네온과 구분한다.',
      'prefers-reduced-motion에서 hover transform과 글로우 강조를 절제한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans, 둥근 버블 인상), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Y2K_Futurism_01: 라이트 실버 베이스 위 크롬·메탈 그라디언트, 글로시 상단 하이라이트, 핑크·시안·라임 네온 글로우, 둥근 버블 폼(radius lg).',
  components: {
    Button: {
      description: '글로시 버블 버튼. 메탈 그라디언트 표면에 상단 하이라이트가 맺히고, hover에서 네온 글로우가 번진다.',
      specs: ['배경: 크롬 메탈 그라디언트', '상단: 글로시 하이라이트 오버레이', '모서리: radius lg(26px, 버블)', 'hover: 1px 떠오르며 네온 글로우', 'focus-visible: 보라 3px outline'],
    },
    Card: {
      description: '카드는 밝은 표면 + 상단 글로시 하이라이트 + 시안 네온 ambient 그림자로 떠 있는 버블판 인상을 만든다.',
      specs: ['배경: 밝은 elevated 표면', '상단: 글로시 하이라이트 오버레이', '모서리: radius lg(26px)', '그림자: 시안 네온 ambient + inset 하이라이트'],
    },
    Tag: {
      description: '스티커 pill 배지. 상단 inset 하이라이트로 광택을 살리고 tone별 네온/뉴트럴로 분류한다.',
      specs: ['배경: tone별(accent 시안 / muted 뉴트럴 / solid 핑크)', '모서리: pill(999)', '폰트: JetBrains Mono', '상단 inset 하이라이트로 스티커감'],
    },
  },
  example: Showcase,
};

export const Y2KShowcase = Showcase;
export const y2kFuturismWrappers = wrapperComponents;

export const y2kFuturismStyleGuide: StyleGuide = {
  name: 'y2k-futurism-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { Y2KShowcase: Showcase },
  guidelines,
  visualMotif,
};
