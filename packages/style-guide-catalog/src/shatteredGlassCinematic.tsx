import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Shattered_Glass_Cinematic_01 — 깨진 유리 시네마틱 미학.
 *
 * near-black 차콜 시네마틱 배경(딥 잉크) 위로 시안↔마젠타↔라임으로 전이하는
 * 이리데센트 프리즘 굴절이 산란하고, 반투명 결정질 표면에 균열선이 가로지른다.
 * 헤드는 대형 디스플레이 세리프, 본문은 산세리프. radius md(파편 셀은 일부
 * 비대칭 클립). 시그니처는 fragile yet striking — 깨진 유리와 빛의 프리즘 산란.
 */

const INK = '#0B0D12';
const CYAN = '#22D3EE';
const MAGENTA = '#E854C5';
const LIME = '#B6E84A';
const GOLD = '#FFC53D';
const IRIDESCENT = `linear-gradient(120deg, ${CYAN} 0%, ${MAGENTA} 50%, ${LIME} 100%)`;
const SHARD_SHADOW = '0 24px 60px rgba(0,0,0,0.55)';

const foundations = makeFoundations({
  name: 'shattered-glass-cinematic-01',
  description:
    '깨진 유리 시네마틱 — 딥 잉크 다크 배경 + 시안/마젠타/라임 이리데센트 굴절 + 균열 파편 패널 + 대형 세리프 헤드',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '12px', lg: '16px', xl: '22px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.40)',
    md: '0 8px 24px rgba(0,0,0,0.48)',
    lg: '0 16px 40px rgba(0,0,0,0.52)',
    xl: SHARD_SHADOW,
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '44px', lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: INK,
    bgElevated: '#14171F',
    bgSunken: '#07080B',
    overlay: 'rgba(5,6,9,0.72)',
    fg: '#F4F6FB',
    fgMuted: '#AEB5C3',
    fgSubtle: '#79808E',
    fgInverse: INK,
    border: '#2A2F3A',
    borderMuted: '#1C2029',
    borderStrong: '#3C4350',
    focus: GOLD,
    primaryBase: CYAN,
    primaryHover: '#3FE0F2',
    primaryActive: '#0FB6CE',
    primarySubtle: '#10242B',
    primaryFg: INK,
    accent: CYAN,
    accent2: MAGENTA,
    accent3: LIME,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-crack-overlay':
    'conic-gradient(from 210deg at 50% 50%, rgba(255,255,255,0.10), transparent 18%, rgba(255,255,255,0.06) 40%, transparent 62%, rgba(255,255,255,0.08) 84%, transparent)',
  '--bbangto-ext-shard-clip':
    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
  '--bbangto-ext-iridescent': IRIDESCENT,
  '--bbangto-ext-refraction-blur': '10px',
  '--bbangto-ext-glass-edge-glow': `0 0 0 1px rgba(34,211,238,0.45), 0 0 22px rgba(232,84,197,0.28)`,
  '--bbangto-ext-fluted':
    'repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 9px)',
  '--bbangto-ext-shard-shadow': SHARD_SHADOW,
};

/*
 * 색 스킴 변형(colorway) — 균열/굴절/파편 clip 모티프(래퍼 CSS·shape)는 base에서
 * 상속하고 semantic 색 + extendedFoundations 색만 교체한다.
 * base가 딥 잉크 다크이므로 alt 하나는 명확한 라이트(주광 프로스티드 글라스),
 * 나머지 하나는 accent 전환(마젠타/로즈 프리즘) 변형이다.
 */

// 라이트 — 주광 프로스티드 글라스: 서늘한 실버 배경 + 딥 잉크 텍스트 + 딥 프리즘 톤
const LIGHT_IRIDESCENT = 'linear-gradient(120deg, #0E7C8B 0%, #B4358F 50%, #5E8A0E 100%)';
const LIGHT_SHARD_SHADOW = '0 24px 60px rgba(30,40,60,0.20)';
const lightFoundations = makeColorway(foundations, {
  name: 'shattered-glass-cinematic-01-light',
  description: '깨진 유리 라이트 — 주광 프로스티드 글라스: 서늘한 실버 배경 + 딥 잉크 텍스트 + 딥 프리즘 굴절',
  semantic: makeSemantic({
    bg: '#EEF2F7', bgElevated: '#FFFFFF', bgSunken: '#DDE3EC', overlay: 'rgba(15,20,30,0.35)',
    fg: '#14171F', fgMuted: '#4A515F', fgSubtle: '#79808E', fgInverse: '#FFFFFF',
    border: '#C4CCD8', borderMuted: '#DCE2EB', borderStrong: '#9AA3B2', focus: '#B26A00',
    primaryBase: '#0E7C8B', primaryHover: '#0A6675', primaryActive: '#084F5A',
    primarySubtle: '#CDEEF2', primaryFg: '#FFFFFF',
    accent: '#0E7C8B', accent2: '#B4358F', accent3: '#5E8A0E',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-crack-overlay':
    'conic-gradient(from 210deg at 50% 50%, rgba(20,25,35,0.10), transparent 18%, rgba(20,25,35,0.06) 40%, transparent 62%, rgba(20,25,35,0.08) 84%, transparent)',
  '--bbangto-ext-shard-clip':
    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
  '--bbangto-ext-iridescent': LIGHT_IRIDESCENT,
  '--bbangto-ext-refraction-blur': '10px',
  '--bbangto-ext-glass-edge-glow': '0 0 0 1px rgba(14,124,139,0.45), 0 0 22px rgba(180,53,143,0.28)',
  '--bbangto-ext-fluted':
    'repeating-linear-gradient(90deg, rgba(20,25,35,0.05) 0 2px, transparent 2px 9px)',
  '--bbangto-ext-shard-shadow': LIGHT_SHARD_SHADOW,
};

// 로즈 — accent 전환: 딥 플럼-잉크 다크 유지, primary를 마젠타/로즈 프리즘으로 전환
const ROSE_IRIDESCENT = `linear-gradient(120deg, ${MAGENTA} 0%, ${CYAN} 50%, ${LIME} 100%)`;
const roseFoundations = makeColorway(foundations, {
  name: 'shattered-glass-cinematic-01-rose',
  description: '깨진 유리 로즈 — 딥 플럼-잉크 다크 + 마젠타/로즈 프리즘 굴절 accent 전환',
  semantic: makeSemantic({
    bg: '#100A11', bgElevated: '#1A1220', bgSunken: '#0A060B', overlay: 'rgba(8,4,10,0.72)',
    fg: '#F7F0FB', fgMuted: '#C0AECB', fgSubtle: '#8A7E92', fgInverse: '#100A11',
    border: '#352A3A', borderMuted: '#201826', borderStrong: '#4A3C50', focus: '#34E5FF',
    primaryBase: MAGENTA, primaryHover: '#F06FD3', primaryActive: '#C23BA3',
    primarySubtle: '#2A1226', primaryFg: '#150912',
    accent: MAGENTA, accent2: CYAN, accent3: LIME,
  }),
});
const roseExt: Record<string, string> = {
  '--bbangto-ext-crack-overlay':
    'conic-gradient(from 210deg at 50% 50%, rgba(255,255,255,0.10), transparent 18%, rgba(255,255,255,0.06) 40%, transparent 62%, rgba(255,255,255,0.08) 84%, transparent)',
  '--bbangto-ext-shard-clip':
    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
  '--bbangto-ext-iridescent': ROSE_IRIDESCENT,
  '--bbangto-ext-refraction-blur': '10px',
  '--bbangto-ext-glass-edge-glow': `0 0 0 1px rgba(232,84,197,0.45), 0 0 22px rgba(34,211,238,0.28)`,
  '--bbangto-ext-fluted':
    'repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 9px)',
  '--bbangto-ext-shard-shadow': SHARD_SHADOW,
};

const STYLE_ID = 'bbangto-shattered-glass-cinematic-motif';
const CSS = `
.bbangto-shattered-glass-cinematic-card {
  position: relative;
  border-radius: var(--bbangto-radius-md, 12px) !important;
  background: var(--bbangto-semantic-background-elevated, #14171F) !important;
  border: 1px solid var(--bbangto-semantic-border-base, #2A2F3A) !important;
  box-shadow: var(--bbangto-ext-shard-shadow, ${SHARD_SHADOW}) !important;
  clip-path: var(--bbangto-ext-shard-clip, none);
  overflow: hidden;
  isolation: isolate;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.bbangto-shattered-glass-cinematic-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: var(--bbangto-ext-fluted, none), var(--bbangto-ext-crack-overlay, none);
  opacity: 0.5;
  pointer-events: none;
}
.bbangto-shattered-glass-cinematic-card > * { position: relative; z-index: 1; }
.bbangto-shattered-glass-cinematic-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--bbangto-ext-glass-edge-glow, 0 0 22px rgba(232,84,197,0.28)), var(--bbangto-ext-shard-shadow, ${SHARD_SHADOW}) !important;
}
.bbangto-shattered-glass-cinematic-btn {
  position: relative;
  border-radius: 10px !important;
  background-color: var(--bbangto-semantic-background-elevated, #14171F) !important;
  background-image: linear-gradient(var(--bbangto-semantic-background-elevated, #14171F), var(--bbangto-semantic-background-elevated, #14171F)), var(--bbangto-ext-iridescent, ${IRIDESCENT}) !important;
  background-origin: border-box !important;
  background-clip: padding-box, border-box !important;
  color: var(--bbangto-semantic-foreground-base, #F4F6FB) !important;
  border: 1px solid transparent !important;
  font-weight: 600 !important;
  overflow: hidden;
  transition: transform 140ms ease, box-shadow 220ms ease !important;
}
.bbangto-shattered-glass-cinematic-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 620ms ease;
  pointer-events: none;
}
.bbangto-shattered-glass-cinematic-btn:hover { box-shadow: var(--bbangto-ext-glass-edge-glow, 0 0 22px rgba(232,84,197,0.28)) !important; }
.bbangto-shattered-glass-cinematic-btn:hover::after { transform: translateX(120%); }
.bbangto-shattered-glass-cinematic-btn:active { transform: translateY(1px) scale(0.99); }
.bbangto-shattered-glass-cinematic-btn:focus-visible { outline: 2px solid ${GOLD} !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-shattered-glass-cinematic-card { transition: none !important; }
  .bbangto-shattered-glass-cinematic-card:hover { transform: none !important; }
  .bbangto-shattered-glass-cinematic-btn { transition: none !important; }
  .bbangto-shattered-glass-cinematic-btn::after { transition: none !important; transform: translateX(-120%) !important; }
  .bbangto-shattered-glass-cinematic-btn:hover::after { transform: translateX(-120%) !important; }
  .bbangto-shattered-glass-cinematic-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-shattered-glass-cinematic-btn',
  cardClass: 'bbangto-shattered-glass-cinematic-card',
  displayPrefix: 'ShatteredGlassCinematic',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 4,
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(34,211,238,0.16))',
        color: 'var(--bbangto-semantic-primary-hover, #7DE9F5)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, rgba(255,255,255,0.07))',
        color: 'var(--bbangto-semantic-foreground-muted, #AEB5C3)',
      },
      solid: {
        background: `var(--bbangto-semantic-primary-base, ${MAGENTA})`,
        color: `var(--bbangto-semantic-primary-foreground, ${INK})`,
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SHATTERED 01',
  title: '깨진 빛으로 짓는 화면',
  tagline: '어둠을 가르는 프리즘 굴절',
  body: '딥 잉크 시네마틱 면 위로 균열이 번지고, 빛은 시안에서 마젠타, 라임으로 산란한다. 본문은 균열이 비낀 평탄한 클리어 존에 두어 가독성을 지키고, 굴절과 파편은 장식 레이어로만 흐른다.',
  ctaPrimary: '쇼케이스 열기',
  ctaSecondary: '룩북 보기',
  bandTitle: 'fragile yet striking — 깨진 유리에 빛을 가둔다.',
  items: [
    { name: '파편 패널', tone: 'accent', tag: 'SHARD', desc: '비대칭 클립과 균열 오버레이로 결정질 표면을 표현한다.' },
    { name: '균열 디바이더', tone: 'muted', tag: 'CRACK', desc: '섹션 사이에 금 간 라인을 두어 시네마틱 리듬을 만든다.' },
    { name: '굴절 액션', tone: 'solid', tag: 'PRISM', desc: '이리데센트 림 보더와 1회 굴절 스윕으로 행동을 유도한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'ShatteredGlassCinematicShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 파편 구성',
    dos: [
      '시네마틱 Hero(어두운 배경 + 대형 세리프 헤드 + 굴절 파편 그리드)로 시작한다.',
      '균열·굴절은 콘텐츠 위 장식 오버레이로만 쓰고, 본문은 균열이 비낀 평탄한 클리어 존에 배치한다.',
      'clip-path 파편 윤곽에는 직사각형 폴백을 함께 제공해 미지원 브라우저에서도 깨지지 않게 한다.',
    ],
    donts: [
      '본문 텍스트 위에 이리데센트/균열을 직접 깔지 않는다(가독성 붕괴).',
      '굴절 스윕을 무한 반복시키지 않는다 — 호버/등장 시 1회로 제한한다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '다크 배경 + 저채도/투명 굴절면 위 텍스트는 WCAG AA(본문 4.5:1, 대형 3:1) 미달 위험이 크므로 텍스트 레이어에 솔리드 backdrop/대비 토큰을 강제한다.',
      '포커스 링은 굴절 색과 구분되는 솔리드 컬러(골드 #FFC53D)로 그려 이리데센트에 묻히지 않게 한다.',
      '이리데센트 색전이·균열 반짝임은 prefers-reduced-motion: reduce에서 정적화한다(고대비 플릭커·발작 위험 회피).',
      '굴절/균열 이미지에는 alt 텍스트를 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '헤드는 대형 디스플레이 세리프(Playfair Display/Fraunces), 본문은 산세리프(Inter)로 대비를 준다.',
    requiredFonts: ['Playfair Display', 'Fraunces', 'Inter'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Shattered_Glass_Cinematic_01: 딥 잉크 다크 면을 가로지르는 깨진/금 간 유리 + 시안↔마젠타↔라임 이리데센트 프리즘 산란. 반투명 결정질 파편 패널이 시그니처이며 fragile yet striking의 대비가 핵심.',
  components: {
    Button: {
      description: '이리데센트 굴절 림 보더(double-background) 버튼. 호버 시 빛이 1회 스윕하고 엣지 글로우가 켜진다.',
      specs: ['모서리: radius 10px', '보더: 시안→마젠타→라임 그라디언트 림', 'hover: 굴절 스윕 1회 + edge glow', 'active: 미세 press', 'focus-visible: 골드 솔리드 outline'],
    },
    Card: {
      description: '비대칭 clip-path 파편 패널(ShardPanel). 균열·플루티드 오버레이 + 하향 ambient 그림자, hover에서 3px 떠오르며 림 글로우가 돈다.',
      specs: ['모서리: radius md(12px)', '윤곽: shard clip-path(폴백 직사각형)', '오버레이: 균열 + fluted', '그림자: 하향 ambient', 'hover: lift + glass edge glow', 'reduce-motion: 정적화'],
    },
    Tag: {
      description: '작은 결정 파편 칩. 모서리 하나를 잘라 파편감을 주며 accent=시안 결정, muted=중립, solid=마젠타.',
      specs: ['윤곽: 모서리 클립 파편', '텍스트: letter-spacing 0.08em', '폰트: Inter', '색: cyan-subtle / neutral / magenta'],
    },
  },
  example: Showcase,
};

export const shatteredGlassCinematicWrappers = wrapperComponents;
export const ShatteredGlassCinematicShowcase = Showcase;

export const shatteredGlassCinematicStyleGuide: StyleGuide = {
  name: 'shattered-glass-cinematic-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (딥 잉크 + 시안 프리즘)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (주광 프로스티드 글라스)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'rose', label: '로즈 (마젠타 프리즘 accent)', foundations: roseFoundations, extendedFoundations: roseExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { ShatteredGlassCinematicShowcase: Showcase },
  guidelines,
  visualMotif,
};
