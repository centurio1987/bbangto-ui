import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Neumorphism_Soft_01 — 단색 표면 + 이중 그림자 압출감.
 *
 * 배경과 표면이 같은 라이트 그레이. 좌상 밝음 + 우하 어두움 이중 그림자로
 * 표면이 배경에서 볼록하게 밀려 나온 인상을 만든다. pressed = inset.
 * ⚠ 저대비가 본질이라 텍스트/포커스 대비를 별도로 강제한다.
 */

const SURFACE = '#E4E9F2';
const SH_DARK = '#C4C9D4';
const SH_LIGHT = '#FFFFFF';
const PRIMARY = '#5B8DEF';

const foundations = makeFoundations({
  name: 'neumorphism-soft-01',
  description: '단색 라이트 그레이 표면 + 이중 그림자(볼록/오목) 압출감, 부드러운 라운드',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '10px', md: '14px', lg: '18px', xl: '24px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: `4px 4px 8px ${SH_DARK}, -4px -4px 8px ${SH_LIGHT}`,
    md: `6px 6px 12px ${SH_DARK}, -6px -6px 12px ${SH_LIGHT}`,
    lg: `10px 10px 20px ${SH_DARK}, -10px -10px 20px ${SH_LIGHT}`,
    xl: `14px 14px 28px ${SH_DARK}, -14px -14px 28px ${SH_LIGHT}`,
  },
  neutral: {
    0: '#1A1F2B', 10: '#2A3040', 20: '#3A4254', 30: '#525B70', 40: '#6B7488',
    50: '#8B93A5', 60: '#A6ADBD', 70: '#C4C9D4', 80: '#D7DCE6', 90: SURFACE,
    95: '#EDF1F8', 99: '#F5F7FB', 100: '#FFFFFF',
  },
  semantic: makeSemantic({
    bg: SURFACE,
    bgElevated: SURFACE,
    bgSunken: '#D9DEE9',
    overlay: 'rgba(40,48,64,0.45)',
    fg: '#3A4254',
    fgMuted: '#5A6173',
    fgSubtle: '#858CA0',
    fgInverse: '#FFFFFF',
    border: 'rgba(58,66,84,0.10)',
    borderMuted: 'rgba(58,66,84,0.06)',
    borderStrong: 'rgba(58,66,84,0.18)',
    focus: '#3D68BD',
    primaryBase: PRIMARY,
    primaryHover: '#4A7BD6',
    primaryActive: '#3D68BD',
    primarySubtle: '#D8E2F5',
    primaryFg: '#FFFFFF',
    accent: PRIMARY,
    accent2: '#67C7A8',
    accent3: '#E0A458',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-neu-surface': SURFACE,
  '--bbangto-ext-neu-light': SH_LIGHT,
  '--bbangto-ext-neu-dark': SH_DARK,
  '--bbangto-ext-neu-distance': '6px',
};

/* 색 스킴 변형(tweak) — 단색 표면 + 이중 그림자 압출 모티프는 base에서 상속. */

/* 다크 — 어두운 슬레이트 표면을 이중 그림자로 압출한 소프트 UI. */
const darkFoundations = makeColorway(foundations, {
  name: 'neumorphism-soft-01-dark',
  description: '어두운 슬레이트 단색 표면 + 이중 그림자 압출감(다크 소프트 UI)',
  semantic: makeSemantic({
    bg: '#2A303C', bgElevated: '#2A303C', bgSunken: '#22272F', overlay: 'rgba(0,0,0,0.55)',
    fg: '#E4E9F2', fgMuted: '#AEB6C6', fgSubtle: '#7C8598', fgInverse: '#1A1F2B',
    border: 'rgba(228,233,242,0.10)', borderMuted: 'rgba(228,233,242,0.06)',
    borderStrong: 'rgba(228,233,242,0.20)', focus: '#7FA9F5',
    primaryBase: '#7FA9F5', primaryHover: '#93B7F7', primaryActive: '#6B99EF',
    primarySubtle: '#38445C', primaryFg: '#10192B',
    accent: '#7FA9F5', accent2: '#67C7A8', accent3: '#E0A458',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-neu-surface': '#2A303C',
  '--bbangto-ext-neu-light': '#353C4A',
  '--bbangto-ext-neu-dark': '#1E232C',
  '--bbangto-ext-neu-distance': '6px',
};

/* 세이지 — 따뜻한 세이지 그레이 표면 + 그린 액센트로 전환한 라이트 소프트 UI. */
const sageFoundations = makeColorway(foundations, {
  name: 'neumorphism-soft-01-sage',
  description: '세이지 그레이 단색 표면 + 그린 액센트(라이트 소프트 UI)',
  semantic: makeSemantic({
    bg: '#E9ECE4', bgElevated: '#E9ECE4', bgSunken: '#DEE1D8', overlay: 'rgba(40,48,40,0.45)',
    fg: '#3B4238', fgMuted: '#5B6155', fgSubtle: '#868C80', fgInverse: '#FFFFFF',
    border: 'rgba(59,66,56,0.10)', borderMuted: 'rgba(59,66,56,0.06)',
    borderStrong: 'rgba(59,66,56,0.18)', focus: '#4E7A4A',
    primaryBase: '#6FA368', primaryHover: '#5F9358', primaryActive: '#4E7A4A',
    primarySubtle: '#DCE7D6', primaryFg: '#FFFFFF',
    accent: '#6FA368', accent2: '#67C7A8', accent3: '#E0A458',
  }),
});
const sageExt: Record<string, string> = {
  '--bbangto-ext-neu-surface': '#E9ECE4',
  '--bbangto-ext-neu-light': '#FFFFFF',
  '--bbangto-ext-neu-dark': '#CBCFC4',
  '--bbangto-ext-neu-distance': '6px',
};

const STYLE_ID = 'bbangto-neumorphism-soft-motif';
const CSS = `
.bbangto-neu-btn {
  background: var(--bbangto-ext-neu-surface, #E4E9F2) !important;
  color: var(--bbangto-semantic-primary-base, #5B8DEF) !important;
  border: none !important;
  border-radius: var(--bbangto-radius-md, 14px) !important;
  box-shadow: var(--bbangto-shadow-md) !important;
  font-weight: 600 !important;
  transition: box-shadow 160ms ease !important;
}
.bbangto-neu-btn:hover { box-shadow: var(--bbangto-shadow-sm) !important; }
.bbangto-neu-btn:active {
  box-shadow: inset 4px 4px 8px var(--bbangto-ext-neu-dark, #C4C9D4), inset -4px -4px 8px var(--bbangto-ext-neu-light, #FFFFFF) !important;
}
.bbangto-neu-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #3D68BD) !important; outline-offset: 3px; }
.bbangto-neu-card {
  background: var(--bbangto-ext-neu-surface, #E4E9F2) !important;
  border: none !important;
  border-radius: var(--bbangto-radius-lg, 18px) !important;
  box-shadow: var(--bbangto-shadow-lg) !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-neu-btn { transition: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-neu-btn',
  cardClass: 'bbangto-neu-card',
  displayPrefix: 'Neu',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      background: 'var(--bbangto-ext-neu-surface, #E4E9F2)',
      boxShadow:
        '3px 3px 6px var(--bbangto-ext-neu-dark, #C4C9D4), -3px -3px 6px var(--bbangto-ext-neu-light, #FFFFFF)',
    },
    // 색 결합 해소 — semantic/ext CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: { color: 'var(--bbangto-semantic-primary-base, #5B8DEF)' },
      muted: { color: 'var(--bbangto-semantic-foreground-subtle, #858CA0)' },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #5B8DEF)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
        boxShadow: '2px 2px 5px var(--bbangto-ext-neu-dark, #C4C9D4)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SOFT UI',
  title: '눌리고 떠오르는 표면',
  tagline: '하나의 색, 빛으로 만든 깊이',
  body: '배경과 같은 색의 표면을 이중 그림자만으로 볼록하게 밀어 올린다. 누르면 안으로 들어가 압출감이 뒤집힌다.',
  ctaPrimary: '눌러보기',
  ctaSecondary: '자세히',
  bandTitle: '부드러운 빛과 그림자로 만든 촉각적 인터페이스.',
  items: [
    { name: 'Extrude', tone: 'accent', tag: 'RAISED', desc: '좌상 밝음 + 우하 어두움으로 볼록하게 떠오른다.' },
    { name: 'Press', tone: 'muted', tag: 'INSET', desc: '누르면 inset 그림자로 안쪽으로 들어간다.' },
    { name: 'Mono', tone: 'solid', tag: 'TONE', desc: '단일 색조를 유지해 시각 소음을 줄인다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'NeumorphismShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 그림자',
    dos: ['배경과 표면을 같은 색으로 유지하고 이중 그림자로만 깊이를 만든다.', 'pressed 상태는 inset 그림자로 표현한다.'],
    donts: ['표면에 강한 보더를 두지 않는다(이중 그림자로 충분).', '정보 밀도가 높은 화면에 남용하지 않는다(시각 소음).'],
  },
  accessibility: {
    title: '접근성 ⚠',
    rules: [
      '저대비가 본질이므로 텍스트/아이콘은 충분한 대비를 별도 확보한다.',
      '포커스는 그림자에 의존하지 말고 명시적 outline으로 표시한다.',
      'prefers-reduced-motion에서 그림자 transition을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Neumorphism_Soft_01: 단색 라이트 그레이 표면을 좌상 밝음 + 우하 어두움 이중 그림자로 볼록하게 압출, pressed는 inset, 부드러운 라운드.',
  components: {
    Button: {
      description: '배경과 같은 색의 버튼이 이중 그림자로 떠오른다. 누르면 inset으로 들어가 물리 버튼처럼 눌린다.',
      specs: ['배경: 표면색과 동일', '그림자: 좌상 밝음 + 우하 어두움(이중)', 'active: inset 이중 그림자', '모서리: radius md(14px)', 'focus-visible: 명시 outline'],
    },
    Card: {
      description: '더 큰 거리(distance)의 이중 그림자로 표면이 한층 더 떠오른 인상.',
      specs: ['배경: 표면색과 동일', '그림자: 큰 거리의 이중 그림자', '보더: 없음', '모서리: radius lg(18px)'],
    },
    Tag: {
      description: '작은 이중 그림자가 들어간 pill 배지. solid tone만 액센트 채움.',
      specs: ['배경: 표면색(accent/muted) 또는 primary(solid)', '그림자: 작은 이중 그림자', '모서리: pill(999)', '폰트: JetBrains Mono'],
    },
  },
  example: Showcase,
};

export const NeumorphismShowcase = Showcase;
export const neumorphismSoftWrappers = wrapperComponents;

export const neumorphismSoftStyleGuide: StyleGuide = {
  name: 'neumorphism-soft-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (라이트 그레이)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (슬레이트)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'sage', label: '세이지 (그린 액센트)', foundations: sageFoundations, extendedFoundations: sageExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NeumorphismShowcase: Showcase },
  guidelines,
  visualMotif,
};
