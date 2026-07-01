import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
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

/* 색 스킴 변형(tweak) — 모노스페이스·박스보더·각진 콘솔 모티프는 base에서 상속, 색만 교체. */

/* light: 종이 터미널 — 밝은 페이퍼 배경 + 짙은 잉크 그린. base(다크)와 명확히 구분. */
const PAPER_GREEN = '#1A7F37';
const paperFoundations = makeColorway(foundations, {
  name: 'terminal-mono-01-light',
  description: '종이 터미널 — 밝은 페이퍼 배경 + 짙은 잉크 그린(라이트)',
  semantic: makeSemantic({
    bg: '#F4F6F2', bgElevated: '#FFFFFF', bgSunken: '#E7EBE4', overlay: 'rgba(15,26,16,0.35)',
    fg: '#0F1A10', fgMuted: '#3C4A3C', fgSubtle: '#647063', fgInverse: '#F4F6F2',
    border: '#C6CEC2', borderMuted: '#DDE3D8', borderStrong: PAPER_GREEN, focus: PAPER_GREEN,
    primaryBase: PAPER_GREEN, primaryHover: '#166B2E', primaryActive: '#0F5624',
    primarySubtle: 'rgba(26,127,55,0.12)', primaryFg: '#FFFFFF',
    accent: PAPER_GREEN, accent2: '#0969DA', accent3: '#9A6700',
  }),
});
const paperExt: Record<string, string> = {
  '--bbangto-ext-cursor': PAPER_GREEN,
  '--bbangto-ext-prompt-green': PAPER_GREEN,
  '--bbangto-ext-scanline': 'rgba(26,127,55,0.05)',
};

/* amber: 앰버 CRT — 다크 배경 + 앰버 포스포. accent(강조색) 전환 변형. */
const AMBER = '#E3B341';
const amberFoundations = makeColorway(foundations, {
  name: 'terminal-mono-01-amber',
  description: '앰버 CRT — 다크 콘솔 + 앰버 포스포 강조',
  semantic: makeSemantic({
    bg: '#0E0B06', bgElevated: '#161009', bgSunken: '#0A0804', overlay: 'rgba(0,0,0,0.70)',
    fg: '#F2D3A0', fgMuted: '#C7A56E', fgSubtle: '#8A754C', fgInverse: '#0E0B06',
    border: '#3A2E17', borderMuted: '#241C0E', borderStrong: AMBER, focus: AMBER,
    primaryBase: AMBER, primaryHover: '#F0C25A', primaryActive: '#C79A2E',
    primarySubtle: 'rgba(227,179,65,0.15)', primaryFg: '#0E0B06',
    accent: AMBER, accent2: '#E8843C', accent3: '#D97757',
  }),
});
const amberExt: Record<string, string> = {
  '--bbangto-ext-cursor': AMBER,
  '--bbangto-ext-prompt-green': AMBER,
  '--bbangto-ext-scanline': 'rgba(227,179,65,0.05)',
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
      background: 'transparent', border: `1px solid var(--bbangto-semantic-primary-base, ${GREEN})`,
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        color: 'var(--bbangto-semantic-primary-base, #3FB950)',
        border: '1px solid var(--bbangto-semantic-primary-base, #3FB950)',
      },
      muted: {
        color: 'var(--bbangto-semantic-foreground-muted, #9DB39A)',
        border: '1px solid var(--bbangto-semantic-border-base, #2A332A)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #3FB950)',
        color: 'var(--bbangto-semantic-primary-foreground, #0C0E0C)',
        border: '1px solid var(--bbangto-semantic-primary-base, #3FB950)',
      },
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
  foundationPresets: [
    { key: 'default', label: '기본 (포스포 그린)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (종이 터미널)', foundations: paperFoundations, extendedFoundations: paperExt },
    { key: 'amber', label: '앰버 CRT', foundations: amberFoundations, extendedFoundations: amberExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { TerminalShowcase: Showcase },
  guidelines,
  visualMotif,
};
