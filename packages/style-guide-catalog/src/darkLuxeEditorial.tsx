import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * DarkLuxe_Editorial_01 — 다크 편집 럭셔리.
 *
 * 순흑/차콜 베이스(#0B0B0C) 위에 절제된 골드(#C9A86A) 강조. 대형 디스플레이
 * 세리프 헤딩 + 산세리프 본문, 시네마틱한 여백. radius는 none~sm로 각진 편집감.
 * 다크 베이스라 본문은 밝은색으로 고정해 가독성을 별도 확보한다.
 */

const INK = '#0B0B0C';
const GOLD = '#C9A86A';
const PAPER = '#F4F0E8';

const foundations = makeFoundations({
  name: 'darkluxe-editorial-01',
  description: '순흑·차콜 베이스 위 절제된 골드 강조의 다크 편집 럭셔리(대형 세리프 헤딩)',
  fontSans: "'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '3px', lg: '4px', xl: '6px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.50)',
    md: '0 6px 20px rgba(0,0,0,0.55)',
    lg: '0 18px 44px rgba(0,0,0,0.62)',
    xl: '0 32px 72px rgba(0,0,0,0.70)',
  },
  typeScale: {
    display: { fontSize: '88px', lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: 600 },
    h1: { fontSize: '52px', lineHeight: '1.08', letterSpacing: '-0.01em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: INK,
    bgElevated: '#161618',
    bgSunken: '#070708',
    overlay: 'rgba(5,5,6,0.72)',
    fg: PAPER,
    fgMuted: 'rgba(244,240,232,0.74)',
    fgSubtle: 'rgba(244,240,232,0.52)',
    fgInverse: INK,
    border: 'rgba(201,168,106,0.42)',
    borderMuted: 'rgba(244,240,232,0.14)',
    borderStrong: 'rgba(201,168,106,0.70)',
    focus: '#E6C988',
    primaryBase: GOLD,
    primaryHover: '#D8BB80',
    primaryActive: '#B89456',
    primarySubtle: 'rgba(201,168,106,0.16)',
    primaryFg: INK,
    accent: GOLD,
    accent2: '#A8B0A0',
    accent3: '#C0848A',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-hairline': '1px solid rgba(201,168,106,0.42)',
  '--bbangto-ext-letter-wide': '0.24em',
  '--bbangto-ext-reveal': '720ms cubic-bezier(0.16,1,0.3,1)',
  '--bbangto-ext-gold': GOLD,
  '--bbangto-ext-serif': "'Playfair Display', Georgia, serif",
};

/* 색 스킴 변형(colorway) — 헤어라인/리빌/각진 편집 모티프는 base에서 상속, 색만 교체. */

/* 라이트 에디토리얼 — 아이보리 페이퍼 위 딥 앤티크 골드. base가 다크이므로 하나는 라이트로 명확히 구분. */
const lightFoundations = makeColorway(foundations, {
  name: 'darkluxe-editorial-01-light',
  description: '아이보리 페이퍼 위 딥 앤티크 골드의 라이트 편집 럭셔리',
  semantic: makeSemantic({
    bg: '#F4F0E8', bgElevated: '#FBF9F4', bgSunken: '#E8E2D6', overlay: 'rgba(20,18,14,0.42)',
    fg: '#141210', fgMuted: 'rgba(20,18,16,0.70)', fgSubtle: 'rgba(20,18,16,0.48)', fgInverse: '#F4F0E8',
    border: 'rgba(138,109,52,0.42)', borderMuted: 'rgba(20,18,16,0.14)', borderStrong: 'rgba(138,109,52,0.66)', focus: '#8A6D34',
    primaryBase: '#8A6D34', primaryHover: '#755B29', primaryActive: '#5F4A20',
    primarySubtle: 'rgba(138,109,52,0.16)', primaryFg: '#FBF9F4',
    accent: '#8A6D34', accent2: '#6E7A66', accent3: '#9A5A5E',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-hairline': '1px solid rgba(138,109,52,0.42)',
  '--bbangto-ext-letter-wide': '0.24em',
  '--bbangto-ext-reveal': '720ms cubic-bezier(0.16,1,0.3,1)',
  '--bbangto-ext-gold': '#8A6D34',
  '--bbangto-ext-serif': "'Playfair Display', Georgia, serif",
};

/* 플래티넘 — 다크 베이스 유지, 골드 대신 은빛 플래티넘 강조로 전환한 accent 변형. */
const platinumFoundations = makeColorway(foundations, {
  name: 'darkluxe-editorial-01-platinum',
  description: '차콜 베이스 위 은빛 플래티넘 강조의 쿨 다크 편집 럭셔리',
  semantic: makeSemantic({
    bg: '#0C0C0E', bgElevated: '#16171A', bgSunken: '#070708', overlay: 'rgba(5,6,8,0.72)',
    fg: '#EDEFF2', fgMuted: 'rgba(237,239,242,0.74)', fgSubtle: 'rgba(237,239,242,0.52)', fgInverse: '#0C0C0E',
    border: 'rgba(199,205,214,0.34)', borderMuted: 'rgba(237,239,242,0.14)', borderStrong: 'rgba(199,205,214,0.58)', focus: '#D8DEE6',
    primaryBase: '#C7CDD6', primaryHover: '#D6DBE2', primaryActive: '#A9B0BB',
    primarySubtle: 'rgba(199,205,214,0.16)', primaryFg: '#0C0C0E',
    accent: '#C7CDD6', accent2: '#9AA0A8', accent3: '#B0A0C0',
  }),
});
const platinumExt: Record<string, string> = {
  '--bbangto-ext-hairline': '1px solid rgba(199,205,214,0.40)',
  '--bbangto-ext-letter-wide': '0.24em',
  '--bbangto-ext-reveal': '720ms cubic-bezier(0.16,1,0.3,1)',
  '--bbangto-ext-gold': '#C7CDD6',
  '--bbangto-ext-serif': "'Playfair Display', Georgia, serif",
};

const STYLE_ID = 'bbangto-darkluxe-editorial-01-motif';
const CSS = `
.bbangto-dlx-btn {
  background: transparent !important;
  color: var(--bbangto-ext-gold, ${GOLD}) !important;
  border: var(--bbangto-ext-hairline, 1px solid rgba(201,168,106,0.42)) !important;
  border-radius: var(--bbangto-radius-sm, 2px) !important;
  padding: 12px 26px !important;
  font-family: var(--bbangto-typography-font-family-sans, 'Inter', sans-serif) !important;
  font-weight: 500 !important;
  letter-spacing: var(--bbangto-ext-letter-wide, 0.24em) !important;
  text-transform: uppercase !important;
  font-size: 12px !important;
  box-shadow: none !important;
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease !important;
}
.bbangto-dlx-btn:hover {
  background: var(--bbangto-ext-gold, ${GOLD}) !important;
  color: ${INK} !important;
  border-color: var(--bbangto-ext-gold, ${GOLD}) !important;
}
.bbangto-dlx-btn:active { background: #B89456 !important; border-color: #B89456 !important; }
.bbangto-dlx-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, #E6C988) !important;
  outline-offset: 3px;
}
.bbangto-dlx-card {
  background: var(--bbangto-semantic-background-elevated, #161618) !important;
  border: 0 !important;
  border-top: var(--bbangto-ext-hairline, 1px solid rgba(201,168,106,0.42)) !important;
  border-radius: var(--bbangto-radius-none, 0px) !important;
  box-shadow: none !important;
  position: relative;
  animation: bbangto-dlx-reveal var(--bbangto-ext-reveal, 720ms cubic-bezier(0.16,1,0.3,1)) both;
}
@keyframes bbangto-dlx-reveal {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-dlx-card { animation: none !important; }
  .bbangto-dlx-btn { transition: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-dlx-btn',
  cardClass: 'bbangto-dlx-card',
  displayPrefix: 'DarkLuxe',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      fontWeight: 600, letterSpacing: '0.18em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(201,168,106,0.14))',
        color: 'var(--bbangto-semantic-primary-active, #E6C988)',
        border: '1px solid var(--bbangto-semantic-border-base, rgba(201,168,106,0.45))',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, rgba(244,240,232,0.06))',
        color: 'var(--bbangto-semantic-foreground-muted, rgba(244,240,232,0.74))',
        border: '1px solid var(--bbangto-semantic-border-muted, rgba(244,240,232,0.16))',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #C9A86A)',
        color: 'var(--bbangto-semantic-primary-foreground, #0B0B0C)',
        border: '1px solid var(--bbangto-semantic-border-strong, rgba(201,168,106,0.70))',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'EDITORIAL EDITION',
  title: '어둠이 빚어낸 정제된 빛',
  tagline: '여백으로 완성하는 럭셔리',
  body: '순흑의 캔버스 위에 절제된 골드 한 줄만을 남긴다. 대형 세리프 헤드라인과 넓은 트래킹, 시네마틱한 여백이 편집 럭셔리의 문법을 만든다.',
  ctaPrimary: '컬렉션 보기',
  ctaSecondary: '에디토리얼 읽기',
  bandTitle: '어둠과 골드가 그리는 정적, 지금 살펴보세요.',
  items: [
    { name: 'Hairline', tone: 'accent', tag: 'DETAIL', desc: '1px 골드 헤어라인으로 표면의 경계를 정의한다.' },
    { name: 'Whitespace', tone: 'muted', tag: 'SPACE', desc: '넉넉한 여백으로 시선의 호흡과 위계를 만든다.' },
    { name: 'Serif', tone: 'solid', tag: 'TYPE', desc: '대형 디스플레이 세리프로 편집 럭셔리 인상을 각인한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'DarkLuxeShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 여백',
    dos: ['표면 경계는 1px 골드 헤어라인으로만 그어 절제된 인상을 유지한다.', '시네마틱한 여백으로 콘텐츠 사이 호흡을 충분히 둔다.'],
    donts: ['둥근 모서리를 크게 주지 않는다(각진 편집감 유지, radius none~sm).', '골드를 면적으로 남발하지 않는다(강조는 점·선 단위).'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '다크 본문은 밝은색(#F4F0E8)으로 고정해 가독성과 대비를 확보한다.',
      '본문 행간을 넉넉히(1.7 이상) 두어 어두운 배경에서의 피로를 줄인다.',
      'prefers-reduced-motion에서 등장(reveal) 모션을 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '헤딩 Playfair Display(serif) 초대형, 본문 Inter(sans), 라벨·수치 JetBrains Mono(mono). 라벨은 넓은 트래킹.',
    requiredFonts: ['Playfair Display', 'Inter', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'DarkLuxe_Editorial_01: 순흑·차콜 베이스 위 절제된 골드 헤어라인, 대형 디스플레이 세리프 헤딩, 넓은 트래킹과 시네마틱 여백, 각진 편집 럭셔리.',
  components: {
    Button: {
      description: '미니멀 골드 보더 버튼. 평소엔 투명 + 1px 골드 외곽선, hover에서 골드 면으로 반전된다.',
      specs: ['배경: 투명(평상시) → 골드 면(hover)', '보더: 1px 골드 헤어라인', '모서리: radius sm(2px)', '라벨: 대문자 + 넓은 트래킹(0.24em)', 'focus-visible: 골드 outline'],
    },
    Card: {
      description: '풀블리드 편집 카드. 상단 1px 골드 헤어라인 + 각진 모서리, 등장 시 부드럽게 reveal 된다.',
      specs: ['배경: elevated 차콜', '경계: 상단 1px 골드 헤어라인', '모서리: radius none(각진 편집감)', '등장: reveal 모션(reduced-motion 시 비활성)'],
    },
    Tag: {
      description: '경량 모노 라벨. 넓은 트래킹 대문자로 편집 캡션의 인상을 준다.',
      specs: ['배경: tone별 절제 색(accent 골드 / muted 페이퍼 / solid 골드면)', '모서리: radius sm(2px)', '폰트: JetBrains Mono 대문자', '트래킹: 0.18em'],
    },
  },
  example: Showcase,
};

export const DarkLuxeShowcase = Showcase;
export const darkLuxeEditorialWrappers = wrapperComponents;

export const darkLuxeEditorialStyleGuide: StyleGuide = {
  name: 'darkluxe-editorial-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (다크 골드)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (아이보리 페이퍼)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'platinum', label: '플래티넘 (은빛 강조)', foundations: platinumFoundations, extendedFoundations: platinumExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { DarkLuxeShowcase: Showcase },
  guidelines,
  visualMotif,
};
