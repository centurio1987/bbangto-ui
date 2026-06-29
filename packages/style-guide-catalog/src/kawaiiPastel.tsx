import type { StyleGuide, VisualMotif } from '../StyleGuide';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Kawaii_Pastel_01 — 카와이 파스텔 + 둥글둥글 마스코트.
 *
 * 화이트 베이스 위에 베이비핑크/민트/라벤더 파스텔 강조, 둥근 마루부분 폰트,
 * radius xl의 둥글둥글한 표면. 파스텔은 본질적으로 저대비라 텍스트/포커스 대비를
 * 별도로 진한 색(잉크)으로 확보하고, 마스코트 의미는 보조텍스트로 전달한다.
 */

const PINK = '#FFD1E8';
const MINT = '#C8F4E0';
const LAVENDER = '#E2D5FF';
const INK = '#4A3B52'; // 파스텔 위에서 충분한 대비를 내는 진한 본문색
const PRIMARY = '#FF7FB6'; // 채도를 높인 핑크(버튼/CTA용, 흰 글자 대비 확보)

const foundations = makeFoundations({
  name: 'kawaii-pastel-01',
  description: '화이트 베이스 + 베이비핑크·민트·라벤더 파스텔 강조, 둥글둥글 마스코트 모티프(라이트 베이스)',
  fontSans: "'Quicksand', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Fredoka', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '12px', md: '18px', lg: '26px', xl: '36px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(255,138,193,0.18)',
    md: '0 8px 22px rgba(255,138,193,0.22)',
    lg: '0 16px 40px rgba(180,150,255,0.24)',
    xl: '0 24px 60px rgba(180,150,255,0.28)',
  },
  semantic: makeSemantic({
    bg: 'linear-gradient(160deg, #FFFFFF 0%, #FFF6FB 55%, #F4FBFF 100%)',
    bgElevated: '#FFFFFF',
    bgSunken: '#FFF1F8',
    overlay: 'rgba(74,59,82,0.28)',
    fg: INK,
    fgMuted: '#6E5C77',
    fgSubtle: '#9A8AA3',
    fgInverse: '#FFFFFF',
    border: '#F4C9E1',
    borderMuted: '#FBE3F0',
    borderStrong: '#EAA9CE',
    focus: '#7A5CFF',
    primaryBase: PRIMARY,
    primaryHover: '#FB6AA8',
    primaryActive: '#EE5398',
    primarySubtle: 'rgba(255,209,232,0.55)',
    primaryFg: '#FFFFFF',
    accent: MINT,
    accent2: LAVENDER,
    accent3: PINK,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-blush': 'radial-gradient(circle at 50% 50%, rgba(255,127,182,0.45) 0%, rgba(255,127,182,0) 70%)',
  '--bbangto-ext-mascot': 'rgba(255,209,232,0.65)',
  '--bbangto-ext-soft-shadow': '0 10px 26px rgba(255,138,193,0.26)',
  '--bbangto-ext-mint-glow': 'radial-gradient(circle at 50% 50%, rgba(200,244,224,0.55) 0%, rgba(200,244,224,0) 72%)',
  '--bbangto-ext-lavender-veil': 'rgba(226,213,255,0.55)',
};

const STYLE_ID = 'bbangto-kawaii-pastel-01-motif';
const CSS = `
.bbangto-kaw-btn {
  position: relative;
  background: var(--bbangto-semantic-primary-base, #FF7FB6) !important;
  color: #fff !important;
  border: 2px solid #fff !important;
  border-radius: var(--bbangto-radius-full, 9999px) !important;
  box-shadow: var(--bbangto-ext-soft-shadow, 0 10px 26px rgba(255,138,193,0.26)) !important;
  font-weight: 700 !important;
  transition: transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 180ms ease !important;
}
.bbangto-kaw-btn::after {
  content: '';
  position: absolute;
  left: 18%;
  bottom: 18%;
  width: 26%;
  height: 26%;
  border-radius: 9999px;
  background: var(--bbangto-ext-blush, radial-gradient(circle, rgba(255,127,182,0.45) 0%, rgba(255,127,182,0) 70%));
  opacity: 0.7;
  pointer-events: none;
}
.bbangto-kaw-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 34px rgba(255,138,193,0.34) !important; }
.bbangto-kaw-btn:active { transform: translateY(0) scale(0.99); }
.bbangto-kaw-btn:focus-visible { outline: 3px solid var(--bbangto-semantic-border-focus, #7A5CFF) !important; outline-offset: 3px; }
.bbangto-kaw-card {
  position: relative;
  background: var(--bbangto-semantic-background-elevated, #fff) !important;
  border: 2px solid var(--bbangto-semantic-border-base, #F4C9E1) !important;
  border-radius: var(--bbangto-radius-xl, 36px) !important;
  box-shadow: var(--bbangto-ext-soft-shadow, 0 10px 26px rgba(255,138,193,0.26)) !important;
  overflow: hidden;
}
.bbangto-kaw-card::before {
  content: '';
  position: absolute;
  top: -28px;
  right: -28px;
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  background: var(--bbangto-ext-mascot, rgba(255,209,232,0.65));
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-kaw-btn { transition: none !important; }
  .bbangto-kaw-btn:hover, .bbangto-kaw-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-kaw-btn',
  cardClass: 'bbangto-kaw-card',
  displayPrefix: 'Kawaii',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'Fredoka', 'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.03em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: MINT, color: '#1E6B4E', border: '1.5px solid #A8E6CC' },
      muted: { background: LAVENDER, color: '#4A3270', border: '1.5px solid #CDB8FF' },
      solid: { background: PRIMARY, color: '#fff', border: '1.5px solid #fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'KAWAII PASTEL',
  title: '둥글둥글 파스텔 친구들',
  tagline: '말랑한 곡선과 볼터치 글로우',
  body: '화이트 베이스 위로 베이비핑크·민트·라벤더가 사뿐히 얹힌다. 표면은 전부 둥글둥글하고, 버튼에는 작은 볼터치가 맺혀 마스코트 같은 인상을 만든다. 파스텔의 옅은 대비는 진한 잉크색 텍스트로 또렷하게 받쳐준다.',
  ctaPrimary: '시작하기',
  ctaSecondary: '구경하기',
  bandTitle: '말랑말랑한 파스텔 세계, 지금 만나보세요.',
  items: [
    { name: 'Blush', tone: 'accent', tag: 'GLOW', desc: '볼터치 글로우가 버튼 모서리에 사뿐히 맺힌다.' },
    { name: 'Mascot', tone: 'muted', tag: 'FRIEND', desc: '카드 모서리의 둥근 마스코트 원이 친근함을 더한다.' },
    { name: 'Soft', tone: 'solid', tag: 'ROUND', desc: 'radius xl의 둥근 표면과 부드러운 핑크 그림자.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'KawaiiShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 둥근 모서리',
    dos: ['표면은 radius xl 이상으로 둥글게 처리해 말랑한 인상을 만든다.', '파스텔 강조 위에는 진한 잉크색 텍스트로 대비를 확보한다.'],
    donts: ['날카로운 직각 모서리를 쓰지 않는다(모티프 상실).', '파스텔 배경 위에 파스텔 텍스트를 올려 대비를 떨어뜨리지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '파스텔은 저대비이므로 본문 텍스트는 진한 잉크색(#4A3B52)으로 고정해 대비를 확보한다.',
      'focus-visible에 라벤더 계열의 진한 outline(3px)을 별도로 둔다.',
      '마스코트 장식은 의미 전달용이 아니므로 핵심 정보는 보조 텍스트로도 제공한다.',
      'prefers-reduced-motion에서 hover 스케일/바운스 모션을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Quicksand(둥근 마루부분 sans), 라벨·수치 Fredoka(둥근 mono 대용).',
    requiredFonts: ['Quicksand', 'Fredoka'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Kawaii_Pastel_01: 화이트 베이스 위 베이비핑크·민트·라벤더 파스텔, radius xl의 둥글둥글한 표면, 볼터치 글로우와 둥근 마스코트 장식, 진한 잉크색 텍스트로 대비 보강.',
  components: {
    Button: {
      description: '둥근 캡슐 버튼. 채도를 높인 핑크 위 흰 글자로 대비를 확보하고, 작은 볼터치 글로우가 모서리에 맺힌다.',
      specs: ['배경: 채도 핑크(흰 글자 대비 확보)', '보더: 2px 흰색 테두리', '모서리: radius full(캡슐)', '볼터치: ::after 블러시 글로우', 'hover: 살짝 떠오르며 바운스', 'focus-visible: 라벤더 3px outline'],
    },
    Card: {
      description: '둥글둥글한 흰 카드. 모서리에 둥근 마스코트 원이 살짝 비치고, 부드러운 핑크 그림자로 떠 있는 인상을 준다.',
      specs: ['배경: 흰색 elevated', '보더: 2px 파스텔 핑크', '모서리: radius xl(36px)', '장식: ::before 둥근 마스코트 원', '그림자: 부드러운 핑크 soft-shadow'],
    },
    Tag: {
      description: '말랑한 pill 배지. tone별 파스텔 배경 위에 진한 동계열 텍스트로 또렷하게 읽힌다.',
      specs: ['배경: tone별 파스텔(accent 민트 / muted 라벤더 / solid 핑크)', '텍스트: 진한 동계열(대비 확보)', '모서리: pill(999)', '폰트: Fredoka(둥근 mono)'],
    },
  },
  example: Showcase,
};

export const KawaiiShowcase = Showcase;
export const kawaiiPastelWrappers = wrapperComponents;

export const kawaiiPastelStyleGuide: StyleGuide = {
  name: 'kawaii-pastel-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { KawaiiShowcase: Showcase },
  guidelines,
  visualMotif,
};
