import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Spatial_3D_01 — WebGL/3D · 공간 UI 미학을 CSS로 모사.
 *
 * 딥/중립 다크 배경 + 라이팅 기반 음영, 스크롤/포인터 반응 깊이·시차(틸트).
 * radius md~lg, 산세리프. 실제 WebGL은 슬롯으로 두되 CSS 3D transform/그림자로
 * 깊이를 표현한다. blue·violet 강조로 라이팅을 암시한다.
 */

const BLUE = '#3B82F6';
const VIOLET = '#8B5CF6';

const foundations = makeFoundations({
  name: 'spatial-3d-01',
  description: '딥 다크 + 라이팅 음영 + 포인터 반응 깊이·시차(틸트), CSS 3D transform으로 공간 UI 모사',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '18px', xl: '24px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 4px 12px rgba(0,0,0,0.35)',
    md: '0 10px 24px rgba(0,0,0,0.40)',
    lg: '0 18px 40px rgba(0,0,0,0.45)',
    xl: '0 28px 60px rgba(0,0,0,0.55)',
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '44px', lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#0E1117',
    bgElevated: '#161B22',
    bgSunken: '#0A0D12',
    overlay: 'rgba(0,0,0,0.66)',
    fg: '#E6EDF3',
    fgMuted: '#9AA7B4',
    fgSubtle: '#6B7785',
    fgInverse: '#0E1117',
    border: '#2A323D',
    borderMuted: '#1E252E',
    borderStrong: '#3A4452',
    focus: BLUE,
    primaryBase: BLUE,
    primaryHover: '#2F6FE0',
    primaryActive: '#2A63C8',
    primarySubtle: 'rgba(59,130,246,0.16)',
    primaryFg: '#FFFFFF',
    accent: BLUE,
    accent2: VIOLET,
    accent3: '#9AA7B4',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-perspective': '800px',
  '--bbangto-ext-depth-z': '24px',
  '--bbangto-ext-tilt': '6deg',
  '--bbangto-ext-3d-shadow': '0 18px 40px rgba(0,0,0,0.45)',
};

/* 색 스킴 변형 — 3D transform·라이팅 모티프는 base에서 상속하고 색만 바꾼다. */

const lightFoundations = makeColorway(foundations, {
  name: 'spatial-3d-01-light',
  description: 'Spatial 3D 라이트 — 밝은 스튜디오 배경 + blue 라이팅 강조',
  semantic: makeSemantic({
    bg: '#F4F6FB', bgElevated: '#FFFFFF', bgSunken: '#E8ECF4', overlay: 'rgba(15,23,42,0.30)',
    fg: '#0E1117', fgMuted: '#475569', fgSubtle: '#64748B', fgInverse: '#FFFFFF',
    border: '#CBD5E1', borderMuted: '#E2E8F0', borderStrong: '#94A3B8', focus: '#2563EB',
    primaryBase: '#2563EB', primaryHover: '#1D4ED8', primaryActive: '#1E40AF',
    primarySubtle: 'rgba(37,99,235,0.14)', primaryFg: '#FFFFFF',
    accent: '#2563EB', accent2: '#7C3AED', accent3: '#64748B',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-perspective': '800px',
  '--bbangto-ext-depth-z': '24px',
  '--bbangto-ext-tilt': '6deg',
  '--bbangto-ext-3d-shadow': '0 18px 40px rgba(15,23,42,0.18)',
};

const violetFoundations = makeColorway(foundations, {
  name: 'spatial-3d-01-violet',
  description: 'Spatial 3D 다크 — violet/magenta 라이팅 강조 변형',
  semantic: makeSemantic({
    bg: '#12101A', bgElevated: '#1B1826', bgSunken: '#0D0B14', overlay: 'rgba(0,0,0,0.66)',
    fg: '#EDE9F4', fgMuted: '#ADA3BE', fgSubtle: '#7C7290', fgInverse: '#12101A',
    border: '#322B41', borderMuted: '#241F30', borderStrong: '#453B58', focus: '#A855F7',
    primaryBase: '#8B5CF6', primaryHover: '#7C3AED', primaryActive: '#6D28D9',
    primarySubtle: 'rgba(139,92,246,0.18)', primaryFg: '#FFFFFF',
    accent: '#8B5CF6', accent2: '#EC4899', accent3: '#ADA3BE',
  }),
});
const violetExt: Record<string, string> = {
  '--bbangto-ext-perspective': '800px',
  '--bbangto-ext-depth-z': '24px',
  '--bbangto-ext-tilt': '6deg',
  '--bbangto-ext-3d-shadow': '0 18px 40px rgba(0,0,0,0.48)',
};

const STYLE_ID = 'bbangto-spatial-3d-motif';
const CSS = `
.bbangto-spatial-card {
  border-radius: 18px !important;
  transform-style: preserve-3d;
  background:
    linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 42%),
    var(--bbangto-semantic-background-elevated, #161B22) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    var(--bbangto-ext-3d-shadow, 0 18px 40px rgba(0,0,0,0.45)) !important;
  transition: transform 220ms cubic-bezier(0.4,0,0.2,1), box-shadow 220ms cubic-bezier(0.4,0,0.2,1) !important;
}
.bbangto-spatial-card:hover {
  transform: translateY(-6px) translateZ(var(--bbangto-ext-depth-z, 24px)) rotateX(var(--bbangto-ext-tilt, 6deg)) !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 30px 64px rgba(0,0,0,0.58) !important;
}
.bbangto-spatial-btn {
  border-radius: 12px !important;
  transform-style: preserve-3d;
  background: linear-gradient(180deg, #3B82F6, #2A63C8) !important;
  border: 1px solid rgba(255,255,255,0.14) !important;
  color: #fff !important;
  font-weight: 600 !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.22),
    0 10px 24px rgba(59,130,246,0.30) !important;
  transition: transform 160ms cubic-bezier(0.4,0,0.2,1), box-shadow 160ms cubic-bezier(0.4,0,0.2,1) !important;
}
.bbangto-spatial-btn:hover {
  transform: translateY(-2px) translateZ(8px) !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.26),
    0 16px 32px rgba(59,130,246,0.42) !important;
}
.bbangto-spatial-btn:active {
  transform: translateY(1px) translateZ(0) !important;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.35),
    0 4px 12px rgba(59,130,246,0.24) !important;
}
.bbangto-spatial-btn:focus-visible { outline: 2px solid #8B5CF6 !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-spatial-card,
  .bbangto-spatial-btn { transition: none !important; }
  .bbangto-spatial-card:hover { transform: none !important; }
  .bbangto-spatial-btn:hover,
  .bbangto-spatial-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-spatial-btn',
  cardClass: 'bbangto-spatial-card',
  displayPrefix: 'Spatial',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(59,130,246,0.16))',
        color: 'var(--bbangto-semantic-primary-base, #3B82F6)',
        border: '1px solid var(--bbangto-semantic-border-strong, rgba(59,130,246,0.34))',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, rgba(154,167,180,0.12))',
        color: 'var(--bbangto-semantic-foreground-muted, #9AA7B4)',
        border: '1px solid var(--bbangto-semantic-border, rgba(154,167,180,0.26))',
      },
      solid: {
        background: `linear-gradient(180deg, var(--bbangto-semantic-primary-base, ${BLUE}), ${VIOLET})`,
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SPATIAL 01',
  title: '깊이를 가진 인터페이스',
  tagline: '라이팅 · 시차 · 포인터로 만드는 공간감',
  body: '평면을 넘어 음영과 시차로 층위를 만든다. 포인터에 반응하는 미세한 틸트와 부유하는 카드가 화면에 부피를 부여한다. WebGL 슬롯은 비워 두고, 깊이는 CSS 3D 변환으로 암시한다.',
  ctaPrimary: '둘러보기',
  ctaSecondary: '구조 보기',
  bandTitle: '빛과 거리로 위계를 만든다 — 부피를 가진 공간 UI.',
  items: [
    { name: 'Depth', tone: 'accent', tag: 'LAYER', desc: '층위를 가진 카드가 음영과 시차로 거리를 표현한다.' },
    { name: 'Tilt', tone: 'muted', tag: 'POINTER', desc: '포인터를 따라 미세하게 기울며 공간감을 더한다.' },
    { name: 'Light', tone: 'solid', tag: 'SHADER', desc: '라이팅 그라디언트로 표면의 입체를 암시한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'Spatial3DShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '깊이 & 시차',
    dos: ['radius md~lg와 라이팅 그라디언트로 표면의 입체를 일관되게 표현한다.', '깊이는 그림자·translateZ·미세 틸트로 절제해 만든다.'],
    donts: ['과한 회전이나 큰 시차로 멀미를 유발하지 않는다.', '실제 WebGL 없이 무거운 3D 연출을 남발하지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      'WebGL/3D 콘텐츠는 저사양·미지원 환경을 위한 정적 이미지 폴백을 필수로 제공한다.',
      '무거운 3D/WebGL 자원은 lazy-load로 지연 로드한다.',
      'prefers-reduced-motion: reduce 시 틸트/시차/부유 트랜지션을 정지한다.',
      '3D 콘텐츠에는 대체텍스트(alt)를 제공해 스크린리더 접근을 보장한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '산세리프(Inter/Pretendard 계열) 본문, 라벨·수치 JetBrains Mono.',
    requiredFonts: ['Inter', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Spatial_3D_01: 딥 다크 배경 + 라이팅 음영, 포인터 반응 깊이·시차(틸트)를 CSS 3D transform으로 모사. radius md~lg 산세리프, blue·violet 라이팅 강조. WebGL은 슬롯으로 둔다.',
  components: {
    Button: {
      description: '그라디언트 필 버튼. hover에서 부유하고 active에서 눌리는 깊이 프레스를 만든다.',
      specs: ['모서리: radius 12px', '배경: blue 그라디언트 필', '깊이: hover translateY/Z 상승, active translateY 눌림', '그림자: 라이팅 inset + 컬러 글로우', 'focus-visible: violet outline'],
    },
    Card: {
      description: '라이팅 그라디언트와 층층 3D 그림자로 부유하는 표면. hover에서 틸트하며 떠오른다.',
      specs: ['모서리: radius 18px', '그림자: 3d layered shadow(--bbangto-ext-3d-shadow)', '배경: 라이팅 그라디언트 + elevated', 'hover: translateZ/translateY + rotateX 틸트', 'preserve-3d: transform-style 적용'],
    },
    Tag: {
      description: '둥근 라벨. accent=blue 톤, muted=중립, solid=blue→violet 그라디언트.',
      specs: ['모서리: pill(999)', '폰트: JetBrains Mono', '색: blue/neutral/그라디언트', '보더: 반투명 라이팅 보더'],
    },
  },
  example: Showcase,
};

export const spatial3dWrappers = wrapperComponents;
export const Spatial3DShowcase = Showcase;

export const spatial3dStyleGuide: StyleGuide = {
  name: 'spatial-3d-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (딥 다크 · Blue)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (스튜디오 · Blue)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'violet', label: '바이올렛 액센트 (다크)', foundations: violetFoundations, extendedFoundations: violetExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { Spatial3DShowcase: Showcase },
  guidelines,
  visualMotif,
};
