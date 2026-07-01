import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * ArtDeco_Luxe_01 — 1920s 아르데코 럭셔리.
 *
 * 흑(#0E1411)/딥그린(#10302A) 베이스 위에 골드(#C8A24B) 라인.
 * 대칭·기하 장식, radius none + 기하 프레임, 디스플레이 세리프.
 * 골드 온 다크 대비를 확보하고 본문은 밝은색으로 고정한다.
 */

const INK = '#0E1411';
const GOLD = '#C8A24B';
const GOLD_BRIGHT = '#E6C878';
const PARCHMENT = '#F3ECDB';

const fontSans = "'Cormorant Garamond', Georgia, serif";
const fontMono = "'Cormorant Garamond', Georgia, serif";

const foundations = makeFoundations({
  name: 'artdeco-luxe-01',
  description: '흑·딥그린 베이스 위 골드 라인의 1920s 아르데코 럭셔리(대칭·기하 장식, 디스플레이 세리프)',
  fontSans,
  fontMono,
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.35)',
    md: '0 8px 24px rgba(0,0,0,0.45)',
    lg: '0 16px 48px rgba(0,0,0,0.55)',
    xl: '0 24px 64px rgba(0,0,0,0.65)',
  },
  semantic: makeSemantic({
    bg: 'linear-gradient(160deg, #0E1411 0%, #10302A 100%)',
    bgElevated: '#13241F',
    bgSunken: '#0A100D',
    overlay: 'rgba(8,12,10,0.72)',
    fg: PARCHMENT,
    fgMuted: 'rgba(243,236,219,0.78)',
    fgSubtle: 'rgba(243,236,219,0.52)',
    fgInverse: INK,
    border: 'rgba(200,162,75,0.55)',
    borderMuted: 'rgba(200,162,75,0.26)',
    borderStrong: 'rgba(200,162,75,0.85)',
    focus: GOLD_BRIGHT,
    primaryBase: GOLD,
    primaryHover: GOLD_BRIGHT,
    primaryActive: '#A8842F',
    primarySubtle: 'rgba(200,162,75,0.16)',
    primaryFg: INK,
    accent: GOLD,
    accent2: GOLD_BRIGHT,
    accent3: '#9FB7A6',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-gold-line': GOLD,
  '--bbangto-ext-deco-frame': '2px solid rgba(200,162,75,0.7)',
  '--bbangto-ext-fan': 'repeating-conic-gradient(from 90deg at 50% 100%, rgba(200,162,75,0.22) 0deg 6deg, transparent 6deg 12deg)',
  '--bbangto-ext-gold-bright': GOLD_BRIGHT,
};

/* 색 스킴 변형(tweak) — 대칭 골드 프레임·부채꼴 모티프는 base에서 상속, 색만 교체. */

// 라이트: 샴페인/아이보리 지면 위 앤티크 골드 라인, 딥그린 잉크 본문.
const ANTIQUE_GOLD = '#A8842F';
const ivoryFoundations = makeColorway(foundations, {
  name: 'artdeco-luxe-01-ivory',
  description: '샴페인·아이보리 지면 위 앤티크 골드 라인의 라이트 아르데코(딥그린 잉크 본문)',
  semantic: makeSemantic({
    bg: '#F5EEDC', bgElevated: '#FBF6E9', bgSunken: '#EAE0C7', overlay: 'rgba(20,26,22,0.45)',
    fg: '#14201B', fgMuted: 'rgba(20,32,27,0.72)', fgSubtle: 'rgba(20,32,27,0.50)', fgInverse: '#FBF6E9',
    border: 'rgba(168,132,47,0.55)', borderMuted: 'rgba(168,132,47,0.28)', borderStrong: 'rgba(168,132,47,0.85)', focus: ANTIQUE_GOLD,
    primaryBase: ANTIQUE_GOLD, primaryHover: '#8F6E22', primaryActive: '#75591A',
    primarySubtle: 'rgba(168,132,47,0.16)', primaryFg: '#FBF6E9',
    accent: ANTIQUE_GOLD, accent2: GOLD, accent3: '#2C4A3E',
  }),
});
const ivoryExt: Record<string, string> = {
  '--bbangto-ext-gold-line': ANTIQUE_GOLD,
  '--bbangto-ext-deco-frame': '2px solid rgba(168,132,47,0.7)',
  '--bbangto-ext-fan': 'repeating-conic-gradient(from 90deg at 50% 100%, rgba(168,132,47,0.22) 0deg 6deg, transparent 6deg 12deg)',
  '--bbangto-ext-gold-bright': GOLD,
};

// 액센트: 오닉스 지면 위 제이드/에메랄드 + 플래티넘 라인의 다크 아르데코.
const JADE = '#3FB98B';
const jadeFoundations = makeColorway(foundations, {
  name: 'artdeco-luxe-01-jade',
  description: '오닉스 지면 위 제이드·에메랄드 + 플래티넘 라인의 다크 아르데코',
  semantic: makeSemantic({
    bg: 'linear-gradient(160deg, #0B1210 0%, #123A31 100%)', bgElevated: '#122822', bgSunken: '#080E0C', overlay: 'rgba(6,12,10,0.72)',
    fg: '#EAF3EC', fgMuted: 'rgba(234,243,236,0.78)', fgSubtle: 'rgba(234,243,236,0.52)', fgInverse: '#0B1210',
    border: 'rgba(63,185,139,0.50)', borderMuted: 'rgba(63,185,139,0.24)', borderStrong: 'rgba(63,185,139,0.82)', focus: '#7FE3C0',
    primaryBase: JADE, primaryHover: '#5ACFA1', primaryActive: '#2E9B72',
    primarySubtle: 'rgba(63,185,139,0.16)', primaryFg: '#06120D',
    accent: JADE, accent2: '#C9D6CC', accent3: GOLD,
  }),
});
const jadeExt: Record<string, string> = {
  '--bbangto-ext-gold-line': JADE,
  '--bbangto-ext-deco-frame': '2px solid rgba(63,185,139,0.7)',
  '--bbangto-ext-fan': 'repeating-conic-gradient(from 90deg at 50% 100%, rgba(63,185,139,0.22) 0deg 6deg, transparent 6deg 12deg)',
  '--bbangto-ext-gold-bright': '#7FE3C0',
};

const STYLE_ID = 'bbangto-artdeco-luxe-01-motif';
const CSS = `
.bbangto-deco-btn {
  position: relative;
  background-color: transparent !important;
  color: var(--bbangto-ext-gold-bright, ${GOLD_BRIGHT}) !important;
  border: var(--bbangto-ext-deco-frame, 2px solid rgba(200,162,75,0.7)) !important;
  border-radius: 0 !important;
  padding: 10px 22px !important;
  font-family: ${fontSans} !important;
  font-weight: 600 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  box-shadow: inset 0 0 0 1px rgba(200,162,75,0.28) !important;
  transition: color 180ms ease, background-color 180ms ease, box-shadow 180ms ease !important;
}
.bbangto-deco-btn::before,
.bbangto-deco-btn::after {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 1px;
  background: var(--bbangto-ext-gold-line, ${GOLD});
  opacity: 0.7;
}
.bbangto-deco-btn::before { left: 4px; }
.bbangto-deco-btn::after { right: 4px; }
.bbangto-deco-btn:hover {
  background-color: var(--bbangto-ext-gold-line, ${GOLD}) !important;
  color: ${INK} !important;
  box-shadow: inset 0 0 0 1px rgba(14,20,17,0.4) !important;
}
.bbangto-deco-btn:active { transform: translateY(1px); }
.bbangto-deco-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, ${GOLD_BRIGHT}) !important;
  outline-offset: 3px;
}
.bbangto-deco-card {
  position: relative;
  background-color: var(--bbangto-semantic-background-elevated, #13241F) !important;
  border: 1px solid var(--bbangto-ext-gold-line, ${GOLD}) !important;
  border-radius: 0 !important;
  box-shadow: 0 16px 48px rgba(0,0,0,0.55) !important;
}
.bbangto-deco-card::before {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(200,162,75,0.35);
  pointer-events: none;
}
.bbangto-deco-card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 12px;
  background: var(--bbangto-ext-fan, none);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-deco-btn { transition: none !important; }
  .bbangto-deco-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-deco-btn',
  cardClass: 'bbangto-deco-card',
  displayPrefix: 'ArtDeco',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px',
      borderRadius: 0, fontFamily: fontSans, fontSize: 12,
      fontWeight: 600, letterSpacing: '0.18em', lineHeight: 1.6,
      whiteSpace: 'nowrap', textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        backgroundColor: 'var(--bbangto-semantic-primary-subtle, rgba(200,162,75,0.14))',
        color: 'var(--bbangto-semantic-primary-active, #E6C878)',
        border: '1px solid var(--bbangto-semantic-primary-base, #C8A24B)',
      },
      muted: {
        backgroundColor: 'var(--bbangto-semantic-background-sunken, rgba(243,236,219,0.06))',
        color: 'var(--bbangto-semantic-foreground-muted, rgba(243,236,219,0.78))',
        border: '1px solid var(--bbangto-semantic-border-muted, rgba(200,162,75,0.30))',
      },
      solid: {
        backgroundColor: 'var(--bbangto-semantic-primary-base, #C8A24B)',
        color: 'var(--bbangto-semantic-primary-foreground, #0E1411)',
        border: '1px solid var(--bbangto-semantic-primary-hover, #E6C878)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'ART DECO',
  title: '대칭으로 빚은 황금의 기하학',
  tagline: '흑과 딥그린 위에 새긴 골드 라인',
  body: '깊은 흑·딥그린 캔버스 위로 골드 라인이 대칭 프레임을 그린다. 직선적 기하 장식과 부채꼴 모티프가 1920s 럭셔리의 시그니처다.',
  ctaPrimary: '컬렉션 보기',
  ctaSecondary: '소개 읽기',
  bandTitle: '황금빛 기하 위에 세운 인터페이스, 지금 살펴보세요.',
  items: [
    { name: 'Frame', tone: 'accent', tag: 'GEOMETRY', desc: '이중 골드 라인이 대칭 프레임을 만든다.' },
    { name: 'Symmetry', tone: 'muted', tag: 'BALANCE', desc: '좌우 대칭 장식으로 정제된 위계를 세운다.' },
    { name: 'Fan', tone: 'solid', tag: 'MOTIF', desc: '부채꼴 골드 모티프로 카드 하단을 장식한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'ArtDecoShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 골드 라인',
    dos: ['흑·딥그린 베이스 위에 골드 라인으로 대칭 프레임을 그린다.', '장식 라인은 기하적 의미(프레임·구분·강조)를 갖도록 배치한다.'],
    donts: ['radius를 둥글게 주지 않는다(직선 기하 모티프 유지).', '의미 없는 골드 라인을 남발해 장식의 위계를 흐리지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '골드 온 다크 대비를 확인한다(본문은 밝은 parchment 고정).',
      '골드 단색 위 텍스트는 잉크색으로 대비를 확보한다.',
      'prefers-reduced-motion에서 hover/active 트랜지션을 끈다.',
      ':focus-visible에 골드 outline을 항상 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문·라벨 모두 디스플레이 세리프(Cormorant Garamond). 대문자 + 넓은 자간으로 고전미를 낸다.',
    requiredFonts: ['Cormorant Garamond'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'ArtDeco_Luxe_01: 흑·딥그린 위 골드 라인의 대칭 기하 프레임, radius none, 부채꼴 모티프, 디스플레이 세리프 + 넓은 자간 대문자.',
  components: {
    Button: {
      description: '골드 라인 프레임 버튼. 안쪽 좌우 수직선이 대칭 장식을 이루고, hover 시 골드 솔리드로 반전된다.',
      specs: ['배경: 투명, 골드 2px 프레임', '안쪽 좌우 1px 골드 수직선(대칭)', '모서리: radius none', 'hover: 골드 솔리드 + 잉크 텍스트', 'focus-visible: 골드 outline'],
    },
    Card: {
      description: '카드는 골드 외곽선 안에 1px 내부 라인을 겹쳐 이중 프레임을 만들고, 하단에 부채꼴 모티프를 깐다.',
      specs: ['배경: deep 엘리베이션 표면', '보더: 1px 골드 외곽 + inset 내부 라인', '모서리: radius none', '하단: 부채꼴 골드 그라디언트 모티프'],
    },
    Tag: {
      description: '직각 pill 배지. 넓은 자간 대문자 세리프로 라벨을 새긴다.',
      specs: ['배경: tone별(accent 골드틴트 / muted 페이퍼 / solid 골드)', '모서리: radius none', '폰트: Cormorant Garamond, 대문자', '자간: 0.18em'],
    },
  },
  example: Showcase,
};

export const ArtDecoShowcase = Showcase;
export const artDecoLuxeWrappers = wrapperComponents;

export const artDecoLuxeStyleGuide: StyleGuide = {
  name: 'artdeco-luxe-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (흑·딥그린 + 골드)', foundations, extendedFoundations },
    { key: 'ivory', label: '아이보리 (샴페인 + 앤티크 골드)', foundations: ivoryFoundations, extendedFoundations: ivoryExt },
    { key: 'jade', label: '제이드 (오닉스 + 에메랄드)', foundations: jadeFoundations, extendedFoundations: jadeExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { ArtDecoShowcase: Showcase },
  guidelines,
  visualMotif,
};
