import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Humanist_Imperfect_01 — 손그림 · 유기 곡선 · 의도적 결함 레터폼.
 *
 * 웜 페이퍼/오프화이트 배경 + 어스/잉크 톤. 휴머니스트 산세리프 본문 +
 * 손글씨 강조 혼합. 불규칙 radius와 미세한 비틀림으로 손으로 그린 듯한 인상을
 * 만든다. 미세 그레인으로 종이 질감을 더한다. 감성 주도 · 진정성.
 */

const INK = '#2B2420';
const TERRACOTTA = '#C2410C';
const OLIVE = '#6B7233';

const foundations = makeFoundations({
  name: 'humanist-imperfect-01',
  description: '손그림 + 유기 곡선 + 의도적 결함 레터폼, 웜 페이퍼 배경 + 어스/잉크 톤',
  fontSans: "'Pretendard', 'Inter', system-ui, sans-serif",
  fontMono: "'Caveat', 'Gaegu', 'Comic Sans MS', cursive",
  radius: { none: '0px', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(43,36,32,0.08)',
    md: '0 3px 8px rgba(43,36,32,0.10)',
    lg: '0 8px 20px rgba(43,36,32,0.12)',
    xl: '0 16px 36px rgba(43,36,32,0.14)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.04', letterSpacing: '-0.01em', fontWeight: 700 },
    h1: { fontSize: '42px', lineHeight: '1.1', letterSpacing: '-0.005em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.2', letterSpacing: '0', fontWeight: 700 },
    meta: { fontSize: '13px', lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: 500 },
  },
  semantic: makeSemantic({
    bg: '#FBF7EF',
    bgElevated: '#FFFDF8',
    bgSunken: '#F1EADD',
    overlay: 'rgba(43,36,32,0.50)',
    fg: INK,
    fgMuted: '#6B5E50',
    fgSubtle: '#8C8072',
    fgInverse: '#FBF7EF',
    border: INK,
    borderMuted: '#D8CDBC',
    borderStrong: INK,
    focus: TERRACOTTA,
    primaryBase: TERRACOTTA,
    primaryHover: '#9A330A',
    primaryActive: '#7C2906',
    primarySubtle: '#F6E5D8',
    primaryFg: '#FFFDF8',
    accent: TERRACOTTA,
    accent2: OLIVE,
    accent3: '#6B5E50',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-ink-stroke': INK,
  '--bbangto-ext-wobble': '0.6deg',
  '--bbangto-ext-grain': 'rgba(43,36,32,0.04)',
  '--bbangto-ext-underline-sketch': TERRACOTTA,
};

/* 색 스킴 변형(colorway) — 손그림·비틀림·그레인 모티프는 base에서 상속, 색만 교체. */

/* 다크: 어두운 잉크-브라운 종이 + 웜 크림 잉크. 밝은 테라코타 강조. */
const darkFoundations = makeColorway(foundations, {
  name: 'humanist-imperfect-01-dark',
  description: '손그림 다크 — 어두운 잉크-브라운 종이 + 웜 크림 잉크, 밝은 테라코타 강조',
  semantic: makeSemantic({
    bg: '#211C18', bgElevated: '#2B2420', bgSunken: '#17130F', overlay: 'rgba(0,0,0,0.55)',
    fg: '#F3E9DA', fgMuted: '#C9BBA8', fgSubtle: '#9C8E7C', fgInverse: '#211C18',
    border: '#4A4038', borderMuted: '#352D26', borderStrong: '#6B5E50', focus: '#E8703A',
    primaryBase: '#E8703A', primaryHover: '#F08650', primaryActive: '#C25A28',
    primarySubtle: '#3A2A1F', primaryFg: '#211C18',
    accent: '#E8703A', accent2: '#A8B45C', accent3: '#C9BBA8',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-ink-stroke': '#F3E9DA',
  '--bbangto-ext-wobble': '0.6deg',
  '--bbangto-ext-grain': 'rgba(243,233,218,0.05)',
  '--bbangto-ext-underline-sketch': '#E8703A',
};

/* 올리브: 라이트 유지, 강조색을 테라코타 → 딥 올리브로 전환한 accent 변형. */
const oliveFoundations = makeColorway(foundations, {
  name: 'humanist-imperfect-01-olive',
  description: '손그림 라이트 — 딥 올리브 강조로 전환한 어스 accent 변형',
  semantic: makeSemantic({
    bg: '#F7F6EE', bgElevated: '#FDFCF6', bgSunken: '#EBEADD', overlay: 'rgba(35,38,28,0.50)',
    fg: '#23261C', fgMuted: '#5A5E48', fgSubtle: '#82866E', fgInverse: '#F7F6EE',
    border: '#23261C', borderMuted: '#CFCFBB', borderStrong: '#23261C', focus: '#556021',
    primaryBase: '#556021', primaryHover: '#454E1A', primaryActive: '#363D14',
    primarySubtle: '#E6E9CF', primaryFg: '#FDFCF6',
    accent: '#556021', accent2: '#B45309', accent3: '#5A5E48',
  }),
});
const oliveExt: Record<string, string> = {
  '--bbangto-ext-ink-stroke': '#23261C',
  '--bbangto-ext-wobble': '0.6deg',
  '--bbangto-ext-grain': 'rgba(35,38,28,0.04)',
  '--bbangto-ext-underline-sketch': '#556021',
};

const STYLE_ID = 'bbangto-humanist-imperfect-motif';
const CSS = `
.bbangto-humanist-card {
  border: 2px solid var(--bbangto-ext-ink-stroke, #2B2420) !important;
  border-radius: 14px 12px 15px 11px !important;
  background: var(--bbangto-semantic-background-elevated, #FFFDF8) !important;
  box-shadow: none !important;
  transform: rotate(var(--bbangto-ext-wobble, 0.6deg));
  background-image: radial-gradient(var(--bbangto-ext-grain, rgba(43,36,32,0.04)) 0.5px, transparent 0.5px);
  background-size: 4px 4px;
  transition: transform 180ms ease, box-shadow 180ms ease !important;
}
.bbangto-humanist-card:hover {
  transform: rotate(0deg) translateY(-1px);
  box-shadow: 0 8px 20px rgba(43,36,32,0.12) !important;
}
.bbangto-humanist-btn {
  border: 2px solid var(--bbangto-ext-ink-stroke, #2B2420) !important;
  border-radius: 12px 14px 11px 13px !important;
  box-shadow: none !important;
  font-weight: 600 !important;
  position: relative;
  transition: transform 160ms ease, background 160ms ease !important;
}
.bbangto-humanist-btn:hover {
  transform: translateY(-1px) rotate(calc(-1 * var(--bbangto-ext-wobble, 0.6deg)));
}
.bbangto-humanist-btn:hover::after {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 4px;
  height: 2px;
  border-radius: 2px;
  background: var(--bbangto-ext-underline-sketch, #C2410C);
}
.bbangto-humanist-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-underline-sketch, #C2410C) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-humanist-card,
  .bbangto-humanist-btn { transition: none !important; }
  .bbangto-humanist-card:hover,
  .bbangto-humanist-btn:hover { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-humanist-btn',
  cardClass: 'bbangto-humanist-card',
  displayPrefix: 'Humanist',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: '9px 11px 8px 10px', fontFamily: "'Pretendard', 'Inter', system-ui, sans-serif",
      fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #F6E5D8)',
        color: 'var(--bbangto-semantic-primary-base, #C2410C)',
        border: '1.5px solid var(--bbangto-semantic-primary-base, #C2410C)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-elevated, #FFFDF8)',
        color: 'var(--bbangto-semantic-foreground-base, #2B2420)',
        border: '1.5px solid var(--bbangto-semantic-border-strong, #2B2420)',
      },
      solid: {
        background: 'var(--bbangto-semantic-foreground-base, #2B2420)',
        color: 'var(--bbangto-semantic-background-base, #FBF7EF)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: '손으로 빚은',
  title: '조금 비뚤어도 따뜻하게',
  tagline: '완벽함보다 진심을 그립니다',
  body: '반듯한 선 대신 손이 지나간 흔적을 남깁니다. 살짝 어긋난 모서리와 종이 결, 흙빛과 잉크빛으로 사람 냄새 나는 화면을 빚어냅니다. 결함은 숨기지 않고 다정함으로 바꿉니다.',
  ctaPrimary: '이야기 보기',
  ctaSecondary: '우리 소개',
  bandTitle: '매끈함보다 솔직함 — 손때 묻은 화면이 더 오래 기억됩니다.',
  items: [
    { name: '종이결', tone: 'accent', tag: 'PAPER', desc: '웜 오프화이트 배경에 미세 그레인을 더해 종이 질감을 흉내 냅니다.' },
    { name: '손그림', tone: 'muted', tag: 'SKETCH', desc: '불규칙한 모서리와 잉크 보더로 손으로 그린 인상을 만듭니다.' },
    { name: '흙빛', tone: 'solid', tag: 'EARTH', desc: '테라코타와 올리브, 잉크 톤으로 자연스러운 온기를 더합니다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'HumanistShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 유기적 결함',
    dos: [
      '불규칙 radius와 미세한 비틀림을 절제해 손그림 인상을 만든다.',
      '종이 그레인과 어스/잉크 톤으로 따뜻한 진정성을 유지한다.',
    ],
    donts: [
      '모든 요소를 비틀거나 정렬을 무너뜨려 정보 구조를 흐트러뜨리지 않는다.',
      '손글씨 폰트를 본문 전체에 남용하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '손그림 요소를 이미지로 내보낼 때는 의미를 담은 대체텍스트를 반드시 제공한다.',
      '비틀림·정렬 어긋남은 가독성과 터치 타깃(최소 44px)을 해치지 않는 한도에서만 적용한다.',
      '본문 텍스트는 휴머니스트 산세리프 등 가독 폰트를 유지하고, 손글씨 폰트는 강조에만 쓴다.',
      'prefers-reduced-motion에서는 비틀림·이동 트랜지션을 모두 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문은 휴머니스트 산세리프(Pretendard/Inter), 강조·캡션에만 손글씨 폰트(Caveat/Gaegu)를 쓴다.',
    requiredFonts: ['Pretendard', 'Inter', 'Caveat'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Humanist_Imperfect_01: 손그림 + 유기 곡선 + 의도적 결함 레터폼. 웜 페이퍼 배경 + 어스/잉크 톤, 불규칙 radius와 미세 비틀림·그레인으로 손때 묻은 진정성을 만든다. 본문은 가독 폰트 유지.',
  components: {
    Button: {
      description: '잉크 스트로크 보더 버튼. 모서리가 살짝 어긋나고, hover에서 스케치 밑줄과 미세 이동이 생긴다.',
      specs: ['모서리: 불규칙 radius(12/14/11/13px)', '보더: 2px 잉크 실선', 'hover: 테라코타 스케치 밑줄 + translate', 'focus-visible: 테라코타 outline', 'reduced-motion: 트랜지션 해제'],
    },
    Card: {
      description: '손으로 그린 듯한 잉크 테두리 카드. 미세하게 회전하고 종이 그레인이 깔린다.',
      specs: ['모서리: 불규칙 radius(14/12/15/11px)', '보더: 2px 잉크 실선', '배경: 웜 오프화이트 + 그레인', 'transform: rotate(--bbangto-ext-wobble)', 'hover: 회전 정렬 + 살짝 떠오름'],
    },
    Tag: {
      description: '둥글지만 살짝 어긋난 라벨. accent=테라코타, muted=잉크 보더, solid=잉크.',
      specs: ['모서리: 불규칙 radius(9/11/8/10px)', '폰트: 휴머니스트 산세리프', '색: terracotta/ink/paper', '본문 가독 폰트 유지'],
    },
  },
  example: Showcase,
};

export const HumanistShowcase = Showcase;
export const humanistImperfectWrappers = wrapperComponents;

export const humanistImperfectStyleGuide: StyleGuide = {
  name: 'humanist-imperfect-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (테라코타/웜 페이퍼)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (잉크-브라운 종이)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'olive', label: '올리브 강조', foundations: oliveFoundations, extendedFoundations: oliveExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HumanistShowcase: Showcase },
  guidelines,
  visualMotif,
};
