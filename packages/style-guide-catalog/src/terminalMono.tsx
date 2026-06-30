import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Terminal_Mono_01 — 모노스페이스 전면 + 다크 콘솔 + 포스포 그린.
 *
 * 본문까지 전부 모노스페이스, 다크 배경, 박스 드로잉 보더, 깜빡이는 커서/프롬프트.
 * 각진 모서리(radius 0). 개발자/콘솔 미학.
 */

const GREEN = '#3FB950';
const BG = '#0C0E0C';

const foundations = makeFoundations({
  name: 'terminal-mono-01',
  description: '모노스페이스 전면 + 다크 콘솔 + 포스포 그린, 박스 보더·커서·각진 모서리',
  // 터미널 미학: 본문(sans 슬롯)도 모노스페이스를 쓴다.
  fontSans: "'JetBrains Mono', ui-monospace, monospace",
  fontMono: "'JetBrains Mono', ui-monospace, monospace",
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: { none: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
  typeScale: {
    display: { fontSize: '64px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 700 },
    h1: { fontSize: '34px', lineHeight: '1.1', letterSpacing: '0', fontWeight: 700 },
    body: { fontSize: '15px', lineHeight: '1.7', letterSpacing: '0', fontWeight: 400 },
  },
  neutral: {
    0: '#000000', 10: '#0C0E0C', 20: '#121613', 30: '#1B221B', 40: '#2A332A',
    50: '#48564A', 60: '#6E7E6C', 70: '#9DB39A', 80: '#C2D4BF', 90: '#E6EDE4',
    95: '#F0F5EF', 99: '#F7FAF6', 100: '#FFFFFF',
  },
  semantic: makeSemantic({
    bg: BG,
    bgElevated: '#121613',
    bgSunken: '#080A08',
    overlay: 'rgba(0,0,0,0.70)',
    fg: '#E6EDE4',
    fgMuted: '#9DB39A',
    fgSubtle: '#6E7E6C',
    fgInverse: BG,
    border: '#2A332A',
    borderMuted: '#1B221B',
    borderStrong: GREEN,
    focus: GREEN,
    primaryBase: GREEN,
    primaryHover: '#46C95A',
    primaryActive: '#2EA043',
    primarySubtle: 'rgba(63,185,80,0.15)',
    primaryFg: BG,
    accent: GREEN,
    accent2: '#58A6FF',
    accent3: '#E3B341',
    error: { base: '#F85149', subtle: 'rgba(248,81,73,0.15)', foreground: BG },
    success: { base: GREEN, subtle: 'rgba(63,185,80,0.15)', foreground: BG },
    warning: { base: '#E3B341', subtle: 'rgba(227,179,65,0.15)', foreground: BG },
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-cursor': GREEN,
  '--bbangto-ext-prompt-green': GREEN,
  '--bbangto-ext-scanline': 'rgba(63,185,80,0.04)',
};

const STYLE_ID = 'bbangto-terminal-mono-motif';
const CSS = `
.bbangto-term-btn {
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  color: var(--bbangto-semantic-primary-base, #3FB950) !important;
  border: 1px solid var(--bbangto-semantic-primary-base, #3FB950) !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-weight: 600 !important;
  text-transform: none;
  transition: background 120ms linear !important;
}
.bbangto-term-btn:hover { background: var(--bbangto-semantic-primary-subtle, rgba(63,185,80,0.15)) !important; }
.bbangto-term-btn:active { background: rgba(63,185,80,0.28) !important; }
.bbangto-term-btn:focus-visible { outline: 1px solid var(--bbangto-semantic-primary-base, #3FB950) !important; outline-offset: 2px; }
.bbangto-term-card {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 1px solid var(--bbangto-semantic-border-base, #2A332A) !important;
  background: var(--bbangto-semantic-background-elevated, #121613) !important;
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-term-btn',
  cardClass: 'bbangto-term-card',
  displayPrefix: 'Term',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      background: 'transparent', border: `1px solid ${GREEN}`,
    },
    tones: {
      accent: { color: GREEN, border: `1px solid ${GREEN}` },
      muted: { color: '#9DB39A', border: '1px solid #2A332A' },
      solid: { background: GREEN, color: BG, border: `1px solid ${GREEN}` },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: '$ ./catalog',
  title: '터미널이라는 미학',
  tagline: '모노스페이스 · 다크 콘솔 · 커서',
  body: '본문까지 전부 모노스페이스, 박스 드로잉 보더, 포스포 그린 강조. 프롬프트와 커서가 인터페이스의 리듬을 만든다.',
  ctaPrimary: 'run()',
  ctaSecondary: '--help',
  bandTitle: '> 코드처럼 읽히는 인터페이스. 지금 실행하세요.',
  items: [
    { name: 'Mono', tone: 'accent', tag: 'TYPE', desc: '본문까지 모노스페이스로 코드 같은 리듬을 만든다.' },
    { name: 'Console', tone: 'muted', tag: 'DARK', desc: '다크 배경 + 박스 보더로 콘솔을 재현한다.' },
    { name: 'Cursor', tone: 'solid', tag: 'GREEN', desc: '포스포 그린 강조와 프롬프트·커서 표기.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'TerminalShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 보더',
    dos: ['모든 경계는 1px 박스 드로잉 보더, 모서리 radius 0.', '본문·라벨 모두 모노스페이스를 유지한다.'],
    donts: ['둥근 모서리/그림자/그라디언트를 도입하지 않는다.', '깜빡이는 커서를 과용해 시각 피로를 주지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: ['다크 배경 위 본문 대비를 충분히 확보한다(밝은 그린-화이트).', '깜빡임(blink) 모션은 prefers-reduced-motion에서 끈다.', '모노 본문은 행 길이를 짧게 유지해 가독성을 지킨다.'],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문·라벨·수치 전부 JetBrains Mono(모노스페이스).',
    requiredFonts: ['JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Terminal_Mono_01: 본문까지 모노스페이스, 다크 콘솔 배경, 1px 박스 드로잉 보더, 포스포 그린 강조, 각진 모서리·무그림자.',
  components: {
    Button: {
      description: '투명 배경 + 그린 보더의 콘솔 버튼. hover에서 그린 틴트로 채워진다.',
      specs: ['모서리: radius 0', '배경: 투명', '보더: 1px 그린', 'hover: 그린 subtle 틴트', 'focus-visible: 그린 outline'],
    },
    Card: {
      description: '다크 elevated 표면 + 1px 박스 보더의 콘솔 패널.',
      specs: ['모서리: radius 0', '배경: 다크 elevated', '보더: 1px 보더 색', '그림자: 없음'],
    },
    Tag: {
      description: '박스형 모노 라벨. accent=그린 보더, muted=그레이 보더, solid=그린 채움.',
      specs: ['모서리: radius 0', '배경: 투명(accent/muted) 또는 그린(solid)', '폰트: JetBrains Mono', '보더: 1px'],
    },
  },
  example: Showcase,
};

export const TerminalShowcase = Showcase;
export const terminalMonoWrappers = wrapperComponents;

export const terminalMonoStyleGuide: StyleGuide = {
  name: 'terminal-mono-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { TerminalShowcase: Showcase },
  guidelines,
  visualMotif,
};
