import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Editorial_Magazine_01 — 인쇄 편집/매거진 모티프.
 *
 * warm paper(#FBF7F0) 배경 위에 디스플레이 세리프 대형 헤드라인과 serif 본문,
 * 헤어라인 칼럼 규칙선으로 지면 같은 위계를 만든다. radius는 none~sm,
 * 절제된 밑줄/얇은 보더 버튼. 잉크 온 페이퍼의 고대비를 기본으로 한다.
 */

const PAPER = '#FBF7F0';
const INK = '#1A1714';
const RULE = '#D8CFC0';
const ACCENT = '#8C2F1D';

const fontSerif = "'Source Serif 4', Georgia, serif";
const fontMono = "'IBM Plex Mono', ui-monospace, monospace";

const foundations = makeFoundations({
  name: 'editorial-magazine-01',
  description: 'warm paper 위 세리프 본문 + 디스플레이 세리프 헤드라인 + 헤어라인 칼럼 규칙선(잉크 온 페이퍼 고대비)',
  fontSans: fontSerif,
  fontMono,
  radius: { none: '0px', sm: '2px', md: '3px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 0 rgba(26,23,20,0.10)',
    md: '0 1px 2px rgba(26,23,20,0.12)',
    lg: '0 2px 4px rgba(26,23,20,0.14)',
    xl: '0 4px 8px rgba(26,23,20,0.16)',
  },
  semantic: makeSemantic({
    bg: PAPER,
    bgElevated: '#FFFDF8',
    bgSunken: '#F3ECDF',
    overlay: 'rgba(26,23,20,0.45)',
    fg: INK,
    fgMuted: 'rgba(26,23,20,0.72)',
    fgSubtle: 'rgba(26,23,20,0.52)',
    fgInverse: PAPER,
    border: RULE,
    borderMuted: 'rgba(216,207,192,0.55)',
    borderStrong: '#B8AC97',
    focus: ACCENT,
    primaryBase: INK,
    primaryHover: '#000000',
    primaryActive: '#2E2A25',
    primarySubtle: 'rgba(26,23,20,0.08)',
    primaryFg: PAPER,
    accent: ACCENT,
    accent2: '#3F5B57',
    accent3: '#9A6B12',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-dropcap': '600 3.4em/0.82 ' + fontSerif,
  '--bbangto-ext-column-rule': '1px solid ' + RULE,
  '--bbangto-ext-pull-quote': '500 italic 1.35em/1.45 ' + fontSerif,
  '--bbangto-ext-hairline': RULE,
  '--bbangto-ext-measure': '34rem',
};

const STYLE_ID = 'bbangto-editorial-magazine-01-motif';
const CSS = `
.bbangto-edi-btn {
  background: transparent !important;
  color: var(--bbangto-semantic-foreground-base, #1A1714) !important;
  border: 1px solid var(--bbangto-semantic-foreground-base, #1A1714) !important;
  border-radius: var(--bbangto-radius-sm, 2px) !important;
  font-family: ${JSON.stringify(fontSerif)} !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
  text-underline-offset: 3px;
  transition: background-color 160ms ease, color 160ms ease !important;
}
.bbangto-edi-btn:hover {
  background: var(--bbangto-semantic-foreground-base, #1A1714) !important;
  color: var(--bbangto-semantic-background-base, #FBF7F0) !important;
  text-decoration: underline;
}
.bbangto-edi-btn:active { background: var(--bbangto-semantic-primary-active, #2E2A25) !important; }
.bbangto-edi-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, #8C2F1D) !important;
  outline-offset: 2px;
}
.bbangto-edi-card {
  background: var(--bbangto-semantic-background-elevated, #FFFDF8) !important;
  border: 0 !important;
  border-top: 2px solid var(--bbangto-semantic-foreground-base, #1A1714) !important;
  border-bottom: var(--bbangto-ext-column-rule, 1px solid #D8CFC0) !important;
  border-radius: var(--bbangto-radius-none, 0px) !important;
  box-shadow: none !important;
}
.bbangto-edi-card + .bbangto-edi-card { border-left: var(--bbangto-ext-column-rule, 1px solid #D8CFC0) !important; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-edi-btn { transition: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-edi-btn',
  cardClass: 'bbangto-edi-card',
  displayPrefix: 'Editorial',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 2, fontFamily: fontMono, fontSize: 11,
      fontWeight: 600, letterSpacing: '0.10em', lineHeight: 1.6,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    },
    tones: {
      accent: { backgroundColor: 'transparent', color: '#8C2F1D', border: '1px solid #8C2F1D' },
      muted: { backgroundColor: 'transparent', color: 'rgba(26,23,20,0.72)', border: '1px solid #D8CFC0' },
      solid: { backgroundColor: INK, color: PAPER, border: '1px solid #1A1714' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'ISSUE NO.07',
  title: '지면 위에서 호흡하는 활자',
  tagline: '읽기를 위한 위계, 칼럼을 가르는 규칙선',
  body: '큰 디스플레이 세리프 헤드라인과 차분한 본문 세리프가 한 지면 안에서 위계를 나눈다. 헤어라인 규칙선은 칼럼의 경계를 또렷하게 잡아준다.',
  ctaPrimary: '기사 읽기',
  ctaSecondary: '목차 보기',
  bandTitle: '한 호를 펼치듯, 지면 같은 인터페이스를 만나보세요.',
  items: [
    { name: 'Headline', tone: 'accent', tag: 'TYPE', desc: '디스플레이 세리프로 호의 첫인상을 결정한다.' },
    { name: 'Column', tone: 'muted', tag: 'RULE', desc: '헤어라인 규칙선이 본문 칼럼을 가른다.' },
    { name: 'Pull Quote', tone: 'solid', tag: 'QUOTE', desc: '강조 인용으로 지면에 리듬을 더한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'EditorialShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '지면 & 규칙선',
    dos: [
      '본문은 warm paper 배경 위 잉크색 세리프로, 충분한 행간(1.7 이상)을 둔다.',
      '칼럼 경계는 1px 헤어라인 규칙선으로 또렷하게 구분한다.',
    ],
    donts: [
      '둥근 모서리나 큰 그림자로 인쇄물의 평면감을 해치지 않는다.',
      '본문 행장(measure)을 너무 길게 늘려 가독성을 떨어뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '잉크 온 페이퍼 대비를 유지한다(본문 #1A1714 / 배경 #FBF7F0).',
      ':focus-visible에서 accent outline을 2px로 노출한다.',
      'prefers-reduced-motion에서 버튼 전환 애니메이션을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문/헤드라인 Source Serif 4(serif), 라벨·수치 IBM Plex Mono(mono). 본문 행장은 약 34rem.',
    requiredFonts: ['Source Serif 4', 'IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Editorial_Magazine_01: warm paper 배경 위 디스플레이 세리프 헤드라인 + serif 본문, 헤어라인 칼럼 규칙선, radius none~sm, 절제된 밑줄/얇은 보더 버튼, 잉크 온 페이퍼 고대비.',
  components: {
    Button: {
      description: '얇은 보더와 절제된 밑줄의 편집 버튼. hover 시 잉크로 반전되어 지면 강조처럼 읽힌다.',
      specs: ['배경: 투명(hover 시 잉크 반전)', '보더: 1px 잉크색', '모서리: radius sm(2px)', 'hover: 배경 잉크 + 밑줄', 'focus-visible: accent outline 2px'],
    },
    Card: {
      description: '카드는 지면 블록처럼 평면이다. 상단 2px 굵은 규칙선과 하단 헤어라인으로 단을 구획한다.',
      specs: ['배경: paper elevated', '상단: 2px 잉크 규칙선', '하단: 1px 헤어라인', '모서리: radius none(0)', '그림자: 없음(평면)'],
    },
    Tag: {
      description: '대문자 모노 라벨 배지. 인쇄물의 섹션 캡션처럼 얇은 보더로 분류를 표시한다.',
      specs: ['배경: tone별(accent/muted 투명 + 보더 / solid 잉크)', '모서리: radius sm(2px)', '폰트: IBM Plex Mono 대문자', '자간: 0.10em'],
    },
  },
  example: Showcase,
};

export const EditorialShowcase = Showcase;
export const editorialMagazineWrappers = wrapperComponents;

export const editorialMagazineStyleGuide: StyleGuide = {
  name: 'editorial-magazine-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { EditorialShowcase: Showcase },
  guidelines,
  visualMotif,
};
