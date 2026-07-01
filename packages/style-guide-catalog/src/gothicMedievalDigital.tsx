import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Gothic_Medieval_Digital_01 — 다크 신비주의 × 디지털 충돌 미학.
 *
 * near-black/옥스블러드/차콜 베이스 + 본 화이트·뮤트 골드, 단 하나의 네온 블록.
 * 중세 블랙레터·문장·왁스 인장·성물 도상이 디지털 그리드와 정면 충돌한다.
 * radius는 각진 고딕(none~sm)에 아치 상단만 예외 곡선, shadow는 낮고 단단한
 * 드롭 + 한정된 네온 relic-glow. 시그니처는 성스러움과 글리치의 긴장.
 */

const NEAR_BLACK = '#0B0A0C';
const BONE = '#F2EBDD';
const OXBLOOD = '#7E1F1A';
const GOLD = '#6E5C3A';
const GOLD_TEXT = '#D8B860';
const NEON = '#C6FF3D';
const GRAIN = 'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 3px)';
const RELIC_GLOW = '0 0 0 1px rgba(110,92,58,0.55), 0 0 26px rgba(198,255,61,0.20)';

const foundations = makeFoundations({
  name: 'gothic-medieval-digital-01',
  description: 'near-black/옥스블러드 + 뮤트 골드 + 단일 네온 블록, 블랙레터·문장·왁스 인장이 디지털 그리드와 충돌하는 다크 신비주의',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '14px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 0 rgba(0,0,0,0.5)',
    md: '0 2px 0 rgba(0,0,0,0.6)',
    lg: '0 3px 0 rgba(0,0,0,0.6), 0 0 18px rgba(198,255,61,0.12)',
    xl: '0 4px 0 rgba(0,0,0,0.7), 0 0 28px rgba(198,255,61,0.18)',
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: 800 },
    h1: { fontSize: '44px', lineHeight: '1.06', letterSpacing: '-0.005em', fontWeight: 800 },
    h2: { fontSize: '28px', lineHeight: '1.18', letterSpacing: '0', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: NEAR_BLACK,
    bgElevated: '#16131A',
    bgSunken: '#070608',
    overlay: 'rgba(8,7,9,0.72)',
    fg: BONE,
    fgMuted: '#CFC6B4',
    fgSubtle: '#938A78',
    fgInverse: NEAR_BLACK,
    border: '#3A2A2C',
    borderMuted: '#241F26',
    borderStrong: GOLD,
    focus: NEON,
    primaryBase: OXBLOOD,
    primaryHover: '#9A2A22',
    primaryActive: '#5E1612',
    primarySubtle: '#2A1614',
    primaryFg: BONE,
    accent: GOLD_TEXT,
    accent2: NEON,
    accent3: '#B9BCC4',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-blackletter-tracking': '0.04em',
  '--bbangto-ext-crest-frame': `1px solid ${GOLD}`,
  '--bbangto-ext-arch': '14px 14px 2px 2px',
  '--bbangto-ext-seal': '9999px',
  '--bbangto-ext-sunburst': 'radial-gradient(120% 80% at 50% 0%, rgba(198,255,61,0.10), transparent 60%)',
  '--bbangto-ext-neon-block': NEON,
  '--bbangto-ext-grain': GRAIN,
  '--bbangto-ext-relic-glow': RELIC_GLOW,
};

/*
 * 색 스킴 변형(색만 교체) — 블랙레터/문장/아치/왁스 인장 모티프(래퍼 CSS·shape)는
 * makeColorway로 base에서 그대로 상속하고, semantic 색 + extendedFoundations 색만 바꾼다.
 * base가 다크 신비주의이므로 (1) light = 조명 필사본 양피지, (2) accent = 자수정+시안 릴릭.
 */

/* Light — Illuminated Vellum: 양피지 위 잉크·골드 리프. 단일 충돌 블록은 골드 리프로. */
const vellumFoundations = makeColorway(foundations, {
  name: 'gothic-medieval-digital-01-light',
  description: '조명 필사본(illuminated vellum) — 양피지 위 잉크·뮤트 골드, 단일 골드 리프 블록',
  semantic: makeSemantic({
    bg: '#EFE6D2', bgElevated: '#F7F0DF', bgSunken: '#E2D6BC', overlay: 'rgba(38,28,18,0.35)',
    fg: '#241C15', fgMuted: '#4A3D2E', fgSubtle: '#7A6A52', fgInverse: BONE,
    border: '#C9B892', borderMuted: '#DED0AF', borderStrong: GOLD, focus: '#3E5A00',
    primaryBase: OXBLOOD, primaryHover: '#9A2A22', primaryActive: '#5E1612',
    primarySubtle: '#E8D2CC', primaryFg: BONE,
    accent: '#8A6E2E', accent2: '#3E5A00', accent3: '#6B5B45',
  }),
});
const vellumExt: Record<string, string> = {
  '--bbangto-ext-blackletter-tracking': '0.04em',
  '--bbangto-ext-crest-frame': `1px solid ${GOLD}`,
  '--bbangto-ext-arch': '14px 14px 2px 2px',
  '--bbangto-ext-seal': '9999px',
  '--bbangto-ext-sunburst': 'radial-gradient(120% 80% at 50% 0%, rgba(232,194,90,0.16), transparent 60%)',
  '--bbangto-ext-neon-block': '#E8C25A',
  '--bbangto-ext-grain': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.022) 0 1px, transparent 1px 3px)',
  '--bbangto-ext-relic-glow': '0 0 0 1px rgba(110,92,58,0.55), 0 0 26px rgba(232,194,90,0.30)',
};

/* Accent — Midnight Amethyst: 자수정 성소 + 단일 시안 릴릭(옥스블러드→애머시스트, 네온→시안). */
const amethystFoundations = makeColorway(foundations, {
  name: 'gothic-medieval-digital-01-amethyst',
  description: '미드나잇 애머시스트 — 자수정 성소 위 단 하나의 시안 릴릭 블록',
  semantic: makeSemantic({
    bg: '#0C0A12', bgElevated: '#171325', bgSunken: '#070510', overlay: 'rgba(8,6,14,0.72)',
    fg: '#ECE6F5', fgMuted: '#C4BAD6', fgSubtle: '#857A9C', fgInverse: '#0C0A12',
    border: '#2E2440', borderMuted: '#1E1830', borderStrong: '#8A78C0', focus: '#3DE6FF',
    primaryBase: '#5A2E8C', primaryHover: '#6E3AA8', primaryActive: '#431F6E',
    primarySubtle: '#241636', primaryFg: '#ECE6F5',
    accent: '#C9B8F0', accent2: '#3DE6FF', accent3: '#B9BCC4',
  }),
});
const amethystExt: Record<string, string> = {
  '--bbangto-ext-blackletter-tracking': '0.04em',
  '--bbangto-ext-crest-frame': '1px solid #8A78C0',
  '--bbangto-ext-arch': '14px 14px 2px 2px',
  '--bbangto-ext-seal': '9999px',
  '--bbangto-ext-sunburst': 'radial-gradient(120% 80% at 50% 0%, rgba(61,230,255,0.12), transparent 60%)',
  '--bbangto-ext-neon-block': '#3DE6FF',
  '--bbangto-ext-grain': GRAIN,
  '--bbangto-ext-relic-glow': '0 0 0 1px rgba(138,120,192,0.55), 0 0 26px rgba(61,230,255,0.22)',
};

const STYLE_ID = 'bbangto-gothic-medieval-digital-motif';
const CSS = `
.bbangto-gothic-medieval-digital-card {
  border-radius: var(--bbangto-ext-arch, 14px 14px 2px 2px) !important;
  border: var(--bbangto-ext-crest-frame, 1px solid ${GOLD}) !important;
  box-shadow: 0 2px 0 rgba(0,0,0,0.6), inset 0 0 0 3px rgba(11,10,12,0.92), inset 0 0 0 4px rgba(110,92,58,0.32) !important;
  background-image: var(--bbangto-ext-grain, ${GRAIN}), var(--bbangto-ext-sunburst, radial-gradient(120% 80% at 50% 0%, rgba(198,255,61,0.10), transparent 60%)) !important;
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0, 0, 0.2, 1) !important;
}
.bbangto-gothic-medieval-digital-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: var(--bbangto-ext-relic-glow, ${RELIC_GLOW}), 0 2px 0 rgba(0,0,0,0.6) !important;
}
.bbangto-gothic-medieval-digital-btn {
  border-radius: 2px !important;
  background: var(--bbangto-semantic-primary-base, ${OXBLOOD}) !important;
  color: var(--bbangto-semantic-primary-foreground, ${BONE}) !important;
  border: 1px solid var(--bbangto-semantic-border-strong, ${GOLD}) !important;
  font-weight: 700 !important;
  letter-spacing: var(--bbangto-ext-blackletter-tracking, 0.04em) !important;
  box-shadow: 0 2px 0 rgba(0,0,0,0.6) !important;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease, transform 120ms ease !important;
}
.bbangto-gothic-medieval-digital-btn:hover {
  background: var(--bbangto-ext-neon-block, ${NEON}) !important;
  color: ${NEAR_BLACK} !important;
  border-color: var(--bbangto-ext-neon-block, ${NEON}) !important;
}
.bbangto-gothic-medieval-digital-btn:active { transform: translateY(1px) !important; }
.bbangto-gothic-medieval-digital-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-neon-block, ${NEON}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-gothic-medieval-digital-card { transition: none !important; }
  .bbangto-gothic-medieval-digital-card:hover { transform: none !important; }
  .bbangto-gothic-medieval-digital-btn { transition: none !important; }
  .bbangto-gothic-medieval-digital-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-gothic-medieval-digital-btn',
  cardClass: 'bbangto-gothic-medieval-digital-card',
  displayPrefix: 'GothicMedievalDigital',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 999, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.12em', lineHeight: 1.5, whiteSpace: 'nowrap',
      border: `1px solid ${GOLD}`, textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic/ext CSS 변수로 색 스킴을 따라가되 기존 hex는 fallback으로 유지.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #2A1B12)',
        color: 'var(--bbangto-semantic-foreground-muted, #D8B860)',
        borderColor: 'var(--bbangto-semantic-border-strong, #6E5C3A)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #1E1A22)',
        color: 'var(--bbangto-semantic-foreground-muted, #CFC6B4)',
        borderColor: 'var(--bbangto-semantic-border-base, #3A2A2C)',
      },
      // solid = 단일 충돌 릴릭 블록: 배경/보더는 ext-neon-block으로 스킴을 따라가고,
      // 밝은 블록 위 텍스트는 근-블랙으로 고정(모든 스킴에서 neon-block은 밝은 색).
      solid: {
        background: 'var(--bbangto-ext-neon-block, #C6FF3D)',
        color: NEAR_BLACK,
        borderColor: 'var(--bbangto-ext-neon-block, #C6FF3D)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'GOTHIC 01',
  title: '성소와 회로가 충돌하는 다크 비전',
  tagline: '블랙레터 문장과 단 하나의 네온 블록',
  body: '근-블랙 화면 위로 옥스블러드와 뮤트 골드가 가라앉고, 단 하나의 네온 블록이 정적을 가른다. 중세의 문장·왁스 인장·성물 도상이 디지털 그리드와 정면으로 부딪치며 성스러움과 글리치의 긴장을 만든다.',
  ctaPrimary: '문장 입장',
  ctaSecondary: '코덱스 열람',
  bandTitle: '성스러움과 글리치 사이, 단 하나의 네온이 위계를 세운다.',
  items: [
    { name: '문장 카드', tone: 'accent', tag: 'CREST', desc: '아치 상단과 골드 프레임으로 두른 문장형 카드. 그레인이 인쇄된 종이의 결을 더한다.' },
    { name: '인장 배지', tone: 'muted', tag: 'SEAL', desc: '왁스 인장을 닮은 원형 엠블럼. 차분한 차콜 위에 본 화이트 라벨을 또렷이 얹는다.' },
    { name: '네온 블록', tone: 'solid', tag: 'RELIC', desc: '페이지에 단 하나만 허용되는 충돌 액센트. 근-블랙 텍스트로 가독을 지킨다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'GothicMedievalDigitalShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 충돌 위계',
    dos: [
      '블랙레터/디스플레이 세리프는 헤드라인·엠블럼에만 쓰고 본문은 가독 산세리프를 유지한다.',
      '충돌 네온 블록은 페이지당 1~2점으로 절제해 위계의 정점으로만 배치한다.',
      '빽빽한 헤드와 넓은 다크 여백을 대비시키고, 문장/아치 프레임으로 Hero·컬렉션 그리드를 구성한다.',
    ],
    donts: [
      '블랙레터로 장문 본문을 조판해 가독성을 무너뜨리지 않는다.',
      '오컬트 성물 도상을 남용해 시각 위계를 붕괴시키지 않는다.',
      '네온 블록을 여러 개 경쟁시켜 단일 충돌 액센트의 임팩트를 희석하지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      'near-black 배경 위 본문·액션 텍스트는 본 화이트(#F2EBDD) 등 4.5:1 이상 대비를 강제한다.',
      '뮤트 골드/옥스블러드 단독으로는 본문 텍스트를 조판하지 않는다(대비 미달 위험).',
      '네온 온 다크 대비를 검증하고, 포커스 링은 그레인/글로우 위에서도 보이도록 네온 outline으로 보강한다.',
      '인장·문장·성물 도상에는 의미를 전달하는 보조 텍스트(alt)를 제공한다.',
      '그레인/relic-glow/글리치 모션은 prefers-reduced-motion: reduce 시 정적으로 폴백한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '블랙레터/맥락 디스플레이 세리프는 헤드·엠블럼에만, 본문은 가독 휴머니스트 산세리프(Inter)를 유지한다. 블랙레터 미지원 시 디스플레이 세리프로 폴백한다.',
    requiredFonts: ['UnifrakturCook', 'Inter', 'Pretendard'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Gothic_Medieval_Digital_01: near-black/옥스블러드/차콜 + 본 화이트·뮤트 골드, 단일 네온 블록. 블랙레터·문장·왁스 인장·성물 도상이 디지털 그리드와 정면 충돌하는 다크 신비주의가 시그니처.',
  components: {
    Button: {
      description: '블랙레터 자간의 각진 옥스블러드 버튼. 호버 시 단 하나의 네온 블록으로 인버트되고, press 시 단단히 가라앉는다.',
      specs: ['모서리: radius 2px(각진 고딕)', '채움: 옥스블러드 primary + 골드 보더', '자간: blackletter-tracking 0.04em', 'hover: 네온 블록 인버트(근-블랙 텍스트)', 'active: translateY press', 'focus-visible: 네온 outline'],
    },
    Card: {
      description: '아치 상단 + 골드 crest 프레임의 문장형 카드(CrestCard). 그레인·sunburst 텍스처를 얹고 hover에서 relic-glow가 번진다.',
      specs: ['모서리: arch(상단 14px / 하단 2px)', '프레임: 골드 crest-frame + inset 이중 보더', '텍스처: grain + sunburst halo', '그림자: 낮고 단단한 드롭', 'hover: translateY(-2px) + relic-glow', 'reduce-motion: 모션 정적 폴백'],
    },
    Tag: {
      description: '왁스 인장을 닮은 원형 SealBadge. accent=골드 인장, muted=차콜, solid=단일 네온 블록.',
      specs: ['모서리: seal(999px 원형)', '텍스트: uppercase, letter-spacing 0.12em', '보더: 골드 1px', '색: gold-seal / charcoal / neon-block'],
    },
  },
  example: Showcase,
};

export const gothicMedievalDigitalWrappers = wrapperComponents;
export const GothicMedievalDigitalShowcase = Showcase;

export const gothicMedievalDigitalStyleGuide: StyleGuide = {
  name: 'gothic-medieval-digital-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (근-블랙 · 옥스블러드 · 네온)', foundations, extendedFoundations },
    { key: 'light', label: '조명 필사본 (양피지 · 잉크 · 골드 리프)', foundations: vellumFoundations, extendedFoundations: vellumExt },
    { key: 'amethyst', label: '미드나잇 애머시스트 (자수정 · 시안 릴릭)', foundations: amethystFoundations, extendedFoundations: amethystExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { GothicMedievalDigitalShowcase: Showcase },
  guidelines,
  visualMotif,
};
