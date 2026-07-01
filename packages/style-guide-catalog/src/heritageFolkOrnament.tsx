import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Heritage_Folk_Ornament_01 — 패밀리 노스탤지어 공예 오너먼트 미학.
 *
 * 따뜻한 흙빛 비비드 그라운드(테라코타/코랄)를 좌우 대칭의 민속 꽃·새 모티프와
 * 스캘럽 장식 보더가 감싼다. 그림자는 거의 쓰지 않고(near-flat), 다색 면·반복
 * 보더 패턴 자체로 위계를 만든다. wrapper Card는 다색 프레임 + 코너 오너먼트를
 * 두른 공예 패널, Button은 이중 링을 두른 알약형, Tag는 꽃·잎 칩으로 표현한다.
 */

const INK = '#1F1A17';
const CORAL = '#D24E2E';
const CREAM = '#FBF3E4';
const INDIGO = '#2E3A8C';
const TEAL = '#0E8C7F';
const MUSTARD = '#E0A52E';

const foundations = makeFoundations({
  name: 'heritage-folk-ornament-01',
  description:
    '따뜻한 흙빛 코랄 그라운드 + 대칭 민속 꽃·새 모티프 + 스캘럽 장식 보더 + 세리프 디스플레이/휴머니스트 산세리프, 거의 평면(near-flat) 공예 오너먼트',
  fontSans: "'Mulish', 'Nunito', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '16px', xl: '20px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: 'none',
    md: '0 1px 0 rgba(31,26,23,0.06)',
    lg: '0 2px 0 rgba(31,26,23,0.08)',
    xl: '0 3px 0 rgba(31,26,23,0.10)',
  },
  typeScale: {
    display: { fontSize: '64px', lineHeight: '1.08', letterSpacing: '-0.01em', fontWeight: 700 },
    h1: { fontSize: '40px', lineHeight: '1.14', letterSpacing: '-0.005em', fontWeight: 700 },
    h2: { fontSize: '28px', lineHeight: '1.22', letterSpacing: '0', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: CREAM,
    bgElevated: '#FFFDF7',
    bgSunken: '#F3E7D2',
    overlay: 'rgba(31,26,23,0.55)',
    fg: INK,
    fgMuted: '#5A4F45',
    fgSubtle: '#8A7C6E',
    fgInverse: CREAM,
    border: '#E0CFB2',
    borderMuted: '#EFE4CF',
    borderStrong: '#C9A876',
    focus: INDIGO,
    primaryBase: CORAL,
    primaryHover: '#C0452A',
    primaryActive: '#A93A22',
    primarySubtle: '#FBE0D6',
    primaryFg: '#FFFFFF',
    accent: INDIGO,
    accent2: TEAL,
    accent3: MUSTARD,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-folk-fill': CORAL,
  '--bbangto-ext-folk-radius': '14px',
  '--bbangto-ext-folk-border': `repeating-linear-gradient(45deg, ${CORAL} 0 6px, ${MUSTARD} 6px 12px, ${INDIGO} 12px 18px, ${TEAL} 18px 24px)`,
  '--bbangto-ext-floral-motif':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23D24E2E'%3E%3Ccircle cx='12' cy='6' r='3'/%3E%3Ccircle cx='12' cy='18' r='3'/%3E%3Ccircle cx='6' cy='12' r='3'/%3E%3Ccircle cx='18' cy='12' r='3'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='3' fill='%23E0A52E'/%3E%3C/svg%3E\")",
  '--bbangto-ext-motif-accent-1': INDIGO,
  '--bbangto-ext-motif-accent-2': TEAL,
  '--bbangto-ext-motif-accent-3': MUSTARD,
  '--bbangto-ext-motif-accent-4': CREAM,
  '--bbangto-ext-symmetry-mirror': 'scaleX(-1)',
  '--bbangto-ext-corner-ornament': `radial-gradient(circle, ${MUSTARD} 0 3px, transparent 4px)`,
};

/* 색 스킴 변형(colorway) — 모티프(래퍼 CSS·shape)는 base에서 상속, 색만 교체. */

// 다크: 심야 인디고 그라운드 + 크림/코랄 등불 — 밝은 fg + 어두운 bg.
const nightFoundations = makeColorway(foundations, {
  name: 'heritage-folk-ornament-01-night',
  description: '심야 인디고 그라운드 + 크림·코랄 등불 오너먼트, 다크 공예 패널',
  semantic: makeSemantic({
    bg: '#1E1A2E',
    bgElevated: '#2A2540',
    bgSunken: '#14111F',
    overlay: 'rgba(0,0,0,0.60)',
    fg: '#FBF3E4',
    fgMuted: '#C9BBA8',
    fgSubtle: '#9A8D7C',
    fgInverse: '#1F1A17',
    border: '#46405C',
    borderMuted: '#2E2A42',
    borderStrong: '#6B6288',
    focus: '#E0A52E',
    primaryBase: '#E86B47',
    primaryHover: '#F07E5C',
    primaryActive: '#D2542E',
    primarySubtle: '#3A2620',
    primaryFg: '#FFFFFF',
    accent: '#8C97D9',
    accent2: '#3FBFB0',
    accent3: '#E0A52E',
  }),
});
const nightExt: Record<string, string> = {
  '--bbangto-ext-folk-fill': '#E86B47',
  '--bbangto-ext-folk-radius': '14px',
  '--bbangto-ext-folk-border':
    'repeating-linear-gradient(45deg, #E86B47 0 6px, #E0A52E 6px 12px, #8C97D9 12px 18px, #3FBFB0 18px 24px)',
  '--bbangto-ext-floral-motif':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23E86B47'%3E%3Ccircle cx='12' cy='6' r='3'/%3E%3Ccircle cx='12' cy='18' r='3'/%3E%3Ccircle cx='6' cy='12' r='3'/%3E%3Ccircle cx='18' cy='12' r='3'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='3' fill='%23E0A52E'/%3E%3C/svg%3E\")",
  '--bbangto-ext-motif-accent-1': '#8C97D9',
  '--bbangto-ext-motif-accent-2': '#3FBFB0',
  '--bbangto-ext-motif-accent-3': '#E0A52E',
  '--bbangto-ext-motif-accent-4': '#FBF3E4',
  '--bbangto-ext-symmetry-mirror': 'scaleX(-1)',
  '--bbangto-ext-corner-ornament': 'radial-gradient(circle, #E0A52E 0 3px, transparent 4px)',
};

// 액센트 전환: 쿨 파인/틸 그라운드 + 틸 primary, 인디고 focus — 어두운 fg + 밝은 bg.
const pineFoundations = makeColorway(foundations, {
  name: 'heritage-folk-ornament-01-pine',
  description: '쿨 민트-크림 그라운드 + 틸 primary·인디고 focus, 쪽빛 공예 오너먼트',
  semantic: makeSemantic({
    bg: '#F4F7F5',
    bgElevated: '#FFFFFF',
    bgSunken: '#E6EEEA',
    overlay: 'rgba(20,30,28,0.50)',
    fg: '#14231F',
    fgMuted: '#3F5049',
    fgSubtle: '#6E7F78',
    fgInverse: '#F4F7F5',
    border: '#C2D4CD',
    borderMuted: '#DCE7E2',
    borderStrong: '#8FA69E',
    focus: '#2E3A8C',
    primaryBase: '#0E8C7F',
    primaryHover: '#0B7A6E',
    primaryActive: '#086559',
    primarySubtle: '#C7EAE4',
    primaryFg: '#FFFFFF',
    accent: '#2E3A8C',
    accent2: '#D24E2E',
    accent3: '#E0A52E',
  }),
});
const pineExt: Record<string, string> = {
  '--bbangto-ext-folk-fill': '#0E8C7F',
  '--bbangto-ext-folk-radius': '14px',
  '--bbangto-ext-folk-border':
    'repeating-linear-gradient(45deg, #0E8C7F 0 6px, #E0A52E 6px 12px, #2E3A8C 12px 18px, #D24E2E 18px 24px)',
  '--bbangto-ext-floral-motif':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%230E8C7F'%3E%3Ccircle cx='12' cy='6' r='3'/%3E%3Ccircle cx='12' cy='18' r='3'/%3E%3Ccircle cx='6' cy='12' r='3'/%3E%3Ccircle cx='18' cy='12' r='3'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='3' fill='%23E0A52E'/%3E%3C/svg%3E\")",
  '--bbangto-ext-motif-accent-1': '#2E3A8C',
  '--bbangto-ext-motif-accent-2': '#D24E2E',
  '--bbangto-ext-motif-accent-3': '#E0A52E',
  '--bbangto-ext-motif-accent-4': '#FFFFFF',
  '--bbangto-ext-symmetry-mirror': 'scaleX(-1)',
  '--bbangto-ext-corner-ornament': 'radial-gradient(circle, #E0A52E 0 3px, transparent 4px)',
};

const STYLE_ID = 'bbangto-heritage-folk-ornament-motif';
const CSS = `
.bbangto-heritage-folk-ornament-card {
  position: relative !important;
  border-radius: var(--bbangto-ext-folk-radius, 14px) !important;
  background: var(--bbangto-semantic-background-elevated, #FFFDF7) !important;
  border: 3px solid var(--bbangto-ext-motif-accent-1, ${INDIGO}) !important;
  outline: 3px solid var(--bbangto-ext-folk-fill, ${CORAL}) !important;
  outline-offset: 3px !important;
  box-shadow: none !important;
  transition: transform 220ms cubic-bezier(0, 0, 0.2, 1), outline-color 220ms ease, border-color 220ms ease !important;
}
.bbangto-heritage-folk-ornament-card::before {
  content: "" !important;
  position: absolute !important;
  inset: 7px !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  background-image:
    var(--bbangto-ext-corner-ornament, radial-gradient(circle, ${MUSTARD} 0 3px, transparent 4px)),
    var(--bbangto-ext-corner-ornament, radial-gradient(circle, ${MUSTARD} 0 3px, transparent 4px)),
    var(--bbangto-ext-corner-ornament, radial-gradient(circle, ${MUSTARD} 0 3px, transparent 4px)),
    var(--bbangto-ext-corner-ornament, radial-gradient(circle, ${MUSTARD} 0 3px, transparent 4px));
  background-position: left top, right top, left bottom, right bottom !important;
  background-size: 10px 10px !important;
  background-repeat: no-repeat !important;
}
.bbangto-heritage-folk-ornament-card:hover {
  transform: translateY(-2px) !important;
  outline-color: var(--bbangto-ext-motif-accent-3, ${MUSTARD}) !important;
}
.bbangto-heritage-folk-ornament-btn {
  border-radius: 9999px !important;
  background: var(--bbangto-semantic-primary-base, ${CORAL}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
  border: 2px solid var(--bbangto-ext-motif-accent-4, ${CREAM}) !important;
  box-shadow: 0 0 0 2px var(--bbangto-semantic-primary-base, ${CORAL}) !important;
  transition: transform 140ms ease, background 140ms ease !important;
}
.bbangto-heritage-folk-ornament-btn:hover { background: var(--bbangto-semantic-primary-hover, #C0452A) !important; }
.bbangto-heritage-folk-ornament-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-heritage-folk-ornament-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-focus-ring, ${INDIGO}) !important;
  outline-offset: 3px !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-heritage-folk-ornament-card { transition: none !important; }
  .bbangto-heritage-folk-ornament-card:hover { transform: none !important; }
  .bbangto-heritage-folk-ornament-btn { transition: none !important; }
  .bbangto-heritage-folk-ornament-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-heritage-folk-ornament-btn',
  cardClass: 'bbangto-heritage-folk-ornament-card',
  displayPrefix: 'HeritageFolkOrnament',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'Mulish', 'Nunito', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.5, whiteSpace: 'nowrap',
      border: `1px solid var(--bbangto-semantic-border-strong, ${INDIGO})`,
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #E7E8F4)',
        color: `var(--bbangto-semantic-primary-active, ${INDIGO})`,
        borderColor: `var(--bbangto-semantic-primary-active, ${INDIGO})`,
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #EFE4CF)',
        color: `var(--bbangto-semantic-foreground-base, ${INK})`,
        borderColor: 'var(--bbangto-semantic-border-strong, #C9A876)',
      },
      solid: {
        background: `var(--bbangto-semantic-primary-base, ${TEAL})`,
        color: 'var(--bbangto-semantic-primary-foreground, #FFFFFF)',
        borderColor: `var(--bbangto-semantic-primary-base, ${TEAL})`,
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'HERITAGE 01',
  title: '대대로 물려받은 무늬',
  tagline: '대칭 꽃·새 모티프가 감싸는 공예 오너먼트',
  body: '따뜻한 흙빛 코랄 그라운드를 좌우 대칭의 민속 꽃과 새 무늬, 스캘럽 장식 보더가 감싼다. 본문은 단색 면 위에 또렷하게 두고, 장식은 테두리와 구획에만 모아 손맛과 가독성을 동시에 지킨다.',
  ctaPrimary: '컬렉션 보기',
  ctaSecondary: '이야기 읽기',
  bandTitle: '보더와 무늬가 곧 언어가 되는, 손맛 깃든 장식.',
  items: [
    { name: '장식 패널', tone: 'accent', tag: 'PANEL', desc: '다색 프레임과 코너 오너먼트로 감싼 공예 카드, 본문 면은 단색으로 비운다.' },
    { name: '꽃 칩 라벨', tone: 'muted', tag: 'MOTIF', desc: '꽃·잎 모티프를 더한 작은 분류 칩으로 항목을 구분한다.' },
    { name: '대칭 띠', tone: 'solid', tag: 'BORDER', desc: '반복 플로럴 보더 띠로 섹션을 또렷이 구획한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'HeritageFolkOrnamentShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '장식 구성 & 레이아웃',
    dos: [
      '장식은 보더·배경·구획에 집중하고, 본문 텍스트 영역은 단색 면으로 비워 가독성을 확보한다.',
      '좌우 대칭과 반복으로 질서감을 유지하고, Hero는 대칭 플로럴 일러스트로 중심을 잡는다.',
      '꽃·잎·새 모티프 SVG는 --bbangto-ext-floral-motif로 토큰화해 카드·띠·코너에 재사용한다.',
    ],
    donts: [
      '텍스트 위에 직접 패턴을 깔지 않는다(가독성 붕괴).',
      '다색 충돌을 본문 텍스트 색에까지 끌어들이지 않는다 — 충돌색은 보더·면에 한정한다.',
      '장식을 무작위·비대칭으로 흩뜨려 질서감을 깨뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 고채도 다색 그라운드(코랄/머스타드) 위 텍스트 대비 위험 — 본문은 잉크블랙(#1F1A17)/크림(#FBF3E4) 등 4.5:1 이상 보장 색쌍으로 고정하고 패턴 영역과 분리한다.',
      '포커스 링은 패턴에 묻히지 않도록 단색 고대비(인디고 #2E3A8C)로 그리고 outline-offset으로 띄운다.',
      '꽃·새·스캘럽 등 장식 모티프는 의미 없는 decorative로 처리해 aria-hidden 한다.',
      '의미를 전달하는 이미지에는 반드시 대체 텍스트(alt)를 제공한다.',
      'hover lift(translateY)는 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '헤드라인은 휴머니스트/클래식 세리프 디스플레이, 본문은 둥근 휴머니스트 산세리프로 둔다. 폴백 시스템 폰트를 반드시 지정한다.',
    requiredFonts: ['Playfair Display', 'Fraunces', 'Mulish', 'Nunito'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Heritage_Folk_Ornament_01: 따뜻한 흙빛 코랄 그라운드를 좌우 대칭의 민속 꽃·새 모티프와 스캘럽 장식 보더가 감싸는 공예 오너먼트 — 보더와 채움 패턴 자체가 디자인 언어. 그림자 대신 다색 면·반복 보더로 위계를 만든다.',
  components: {
    Button: {
      description: '크림 보더 + 코랄 외곽 링을 두른 알약형(pill) 버튼. press 시 살짝 가라앉는다.',
      specs: ['모서리: pill(9999px)', '채움: 코랄 primary', '테두리: 크림 이중 링', '그림자: 없음(near-flat)', 'active: translateY/scale 미세 press', 'focus-visible: 인디고 단색 outline'],
    },
    Card: {
      description: '다색 프레임(인디고 보더 + 코랄 외곽 라인)과 네 모서리 코너 오너먼트를 두른 공예 패널. 본문 면은 단색으로 비운다.',
      specs: ['모서리: radius 14px', '프레임: 인디고 보더 + 코랄 outline', '코너: 머스타드 오너먼트 도트', '그림자: 없음(평면)', 'hover: translateY(-2px) lift', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: '꽃·잎 칩 라벨. accent=인디고 subtle, muted=흙빛 중립, solid=틸.',
      specs: ['모서리: pill(999px)', '테두리: 1px 단색 보더', '텍스트: letter-spacing 0.06em', '폰트: Mulish', '색: indigo-subtle / earthy-neutral / teal'],
    },
  },
  example: Showcase,
};

export const heritageFolkOrnamentWrappers = wrapperComponents;
export const HeritageFolkOrnamentShowcase = Showcase;

export const heritageFolkOrnamentStyleGuide: StyleGuide = {
  name: 'heritage-folk-ornament-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (코랄 흙빛)', foundations, extendedFoundations },
    { key: 'night', label: '다크 (심야 인디고)', foundations: nightFoundations, extendedFoundations: nightExt },
    { key: 'pine', label: '틸 액센트 (쿨 파인)', foundations: pineFoundations, extendedFoundations: pineExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HeritageFolkOrnamentShowcase: Showcase },
  guidelines,
  visualMotif,
};
