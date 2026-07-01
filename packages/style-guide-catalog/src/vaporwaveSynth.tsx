import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Vaporwave_Synth_01 — 베이퍼웨이브/신스웨이브.
 *
 * 딥퍼플 캔버스(#1A0B2E) 위에 네온 핑크·시안 글로우, 80s 석양 그라디언트,
 * 퍼스펙티브 네온 그리드. 모노/세리프 혼합 타이포. 다크 베이스라 본문은
 * 밝은색을 고정하고, 글리치·스캔라인 모션은 reduced-motion에서 반드시 끈다.
 */

const NEON_PINK = '#FF6AD5';
const NEON_CYAN = '#26F7FD';

const foundations = makeFoundations({
  name: 'vaporwave-synth-01',
  description: '딥퍼플 배경 + 네온 핑크·시안 글로우 + 80s 석양 그라디언트 + 퍼스펙티브 네온 그리드(다크 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '18px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 10px rgba(255,106,213,0.18)',
    md: '0 8px 28px rgba(38,247,253,0.20)',
    lg: '0 16px 52px rgba(255,106,213,0.28)',
    xl: '0 24px 72px rgba(38,247,253,0.32)',
  },
  semantic: makeSemantic({
    bg: 'radial-gradient(135% 120% at 50% 0%, #2A0F4A 0%, #1A0B2E 55%, #0C0518 100%)',
    bgElevated: 'rgba(255,106,213,0.07)',
    bgSunken: 'rgba(12,5,24,0.55)',
    overlay: 'rgba(8,3,18,0.68)',
    fg: '#F6ECFF',
    fgMuted: 'rgba(238,224,255,0.82)',
    fgSubtle: 'rgba(238,224,255,0.56)',
    fgInverse: '#1A0B2E',
    border: 'rgba(255,106,213,0.45)',
    borderMuted: 'rgba(255,106,213,0.20)',
    borderStrong: 'rgba(38,247,253,0.60)',
    focus: '#26F7FD',
    primaryBase: NEON_PINK,
    primaryHover: '#FF4FCB',
    primaryActive: '#E13FB0',
    primarySubtle: 'rgba(255,106,213,0.18)',
    primaryFg: '#1A0B2E',
    accent: NEON_CYAN,
    accent2: '#B36BFF',
    accent3: '#FFB347',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-neon-grid':
    'linear-gradient(rgba(38,247,253,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,213,0.30) 1px, transparent 1px)',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 3px)',
  '--bbangto-ext-glitch': 'rgba(38,247,253,0.55)',
  '--bbangto-ext-sunset':
    'linear-gradient(180deg, #FF6AD5 0%, #C85CE6 35%, #7B5BFF 70%, #26F7FD 100%)',
};

/* 색 스킴 변형(colorway) — 래퍼 CSS·shape·radius·shadow·typo는 base에서 상속, 색만 교체. */

// Light — 파스텔 베이퍼웨이브. 연한 라벤더/핑크 캔버스 위 딥퍼플 본문, 마젠타 키컬러.
const lightFoundations = makeColorway(foundations, {
  name: 'vaporwave-synth-01-light',
  description: '파스텔 베이퍼웨이브 — 연한 라벤더 캔버스 + 딥마젠타 키컬러(라이트 베이스)',
  semantic: makeSemantic({
    bg: '#FBEFFF', bgElevated: '#FFFFFF', bgSunken: '#F1E1FB', overlay: 'rgba(42,15,74,0.30)',
    fg: '#2A0F4A', fgMuted: 'rgba(42,15,74,0.72)', fgSubtle: 'rgba(42,15,74,0.50)', fgInverse: '#FBEFFF',
    border: 'rgba(216,27,154,0.40)', borderMuted: 'rgba(123,91,255,0.22)', borderStrong: 'rgba(216,27,154,0.62)', focus: '#7B5BFF',
    primaryBase: '#D81B9A', primaryHover: '#C0148A', primaryActive: '#A50E76',
    primarySubtle: 'rgba(216,27,154,0.14)', primaryFg: '#FFFFFF',
    accent: '#7B5BFF', accent2: '#00A8B5', accent3: '#FF8FB3',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-neon-grid':
    'linear-gradient(rgba(216,27,154,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(123,91,255,0.18) 1px, transparent 1px)',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(42,15,74,0.06) 0px, rgba(42,15,74,0.06) 1px, transparent 2px, transparent 3px)',
  '--bbangto-ext-glitch': 'rgba(216,27,154,0.55)',
  '--bbangto-ext-sunset':
    'linear-gradient(180deg, #FF9AE0 0%, #C89BFF 45%, #7B5BFF 100%)',
};

// Cyan — 다크 유지, 강조색을 핑크→시안으로 전환한 accent 변형(포커스는 핑크로 스왑).
const cyanFoundations = makeColorway(foundations, {
  name: 'vaporwave-synth-01-cyan',
  description: '시안 신스웨이브 — 딥퍼플 다크 캔버스 + 시안 키컬러(강조색 전환 변형)',
  semantic: makeSemantic({
    bg: '#160A2B', bgElevated: 'rgba(38,247,253,0.07)', bgSunken: 'rgba(9,4,20,0.60)', overlay: 'rgba(8,3,18,0.68)',
    fg: '#EAF9FF', fgMuted: 'rgba(224,248,255,0.82)', fgSubtle: 'rgba(224,248,255,0.56)', fgInverse: '#0C0518',
    border: 'rgba(38,247,253,0.45)', borderMuted: 'rgba(38,247,253,0.20)', borderStrong: 'rgba(255,106,213,0.60)', focus: '#FF6AD5',
    primaryBase: NEON_CYAN, primaryHover: '#14E0E6', primaryActive: '#0FB9BF',
    primarySubtle: 'rgba(38,247,253,0.18)', primaryFg: '#0C0518',
    accent: NEON_PINK, accent2: '#B36BFF', accent3: '#FFB347',
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-neon-grid':
    'linear-gradient(rgba(38,247,253,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(38,247,253,0.22) 1px, transparent 1px)',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 3px)',
  '--bbangto-ext-glitch': 'rgba(255,106,213,0.55)',
  '--bbangto-ext-sunset':
    'linear-gradient(180deg, #26F7FD 0%, #4AB6FF 40%, #7B5BFF 75%, #FF6AD5 100%)',
};

const STYLE_ID = 'bbangto-vaporwave-synth-01-motif';
const CSS = `
.bbangto-vap-btn {
  background: rgba(26,11,46,0.55) !important;
  color: #F6ECFF !important;
  border: 1px solid var(--bbangto-ext-glitch, rgba(38,247,253,0.55)) !important;
  border-radius: var(--bbangto-radius-sm, 4px) !important;
  box-shadow: 0 0 0 1px rgba(255,106,213,0.35), 0 0 14px rgba(255,106,213,0.45), inset 0 0 10px rgba(38,247,253,0.20) !important;
  text-shadow: 0 0 6px rgba(38,247,253,0.55);
  letter-spacing: 0.03em;
  transition: transform 160ms ease, box-shadow 160ms ease !important;
}
.bbangto-vap-btn:hover {
  box-shadow: 0 0 0 1px rgba(38,247,253,0.55), 0 0 22px rgba(255,106,213,0.65), inset 0 0 14px rgba(38,247,253,0.30) !important;
  transform: translateY(-1px);
}
.bbangto-vap-btn:active { transform: translateY(0); }
.bbangto-vap-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, #26F7FD) !important;
  outline-offset: 2px;
}
.bbangto-vap-card {
  position: relative;
  background: rgba(26,11,46,0.62) !important;
  border: 1px solid var(--bbangto-ext-glitch, rgba(38,247,253,0.55)) !important;
  border-radius: var(--bbangto-radius-sm, 4px) !important;
  box-shadow: 0 0 0 1px rgba(255,106,213,0.30), 0 0 24px rgba(255,106,213,0.30), inset 0 1px 0 rgba(38,247,253,0.30) !important;
  overflow: hidden;
}
.bbangto-vap-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bbangto-ext-scanline, repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 3px));
  opacity: 0.5;
  pointer-events: none;
  animation: bbangto-vap-scan 6s linear infinite;
}
@keyframes bbangto-vap-scan {
  from { background-position-y: 0; }
  to { background-position-y: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-vap-btn { transition: none !important; }
  .bbangto-vap-btn:hover, .bbangto-vap-btn:active { transform: none; }
  .bbangto-vap-card::before { animation: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-vap-btn',
  cardClass: 'bbangto-vap-card',
  displayPrefix: 'Vapor',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(38,247,253,0.14))',
        color: 'var(--bbangto-semantic-primary-active, #9CFCFF)',
        border: '1px solid var(--bbangto-semantic-border-strong, rgba(38,247,253,0.55))',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, rgba(238,224,255,0.06))',
        color: 'var(--bbangto-semantic-foreground-muted, rgba(238,224,255,0.80))',
        border: '1px solid var(--bbangto-semantic-border-muted, rgba(238,224,255,0.20))',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #FF6AD5)',
        color: 'var(--bbangto-semantic-primary-foreground, #1A0B2E)',
        border: '1px solid var(--bbangto-semantic-border-strong, rgba(255,106,213,0.70))',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'SYNTH WAVE',
  title: '네온이 흐르는 석양의 격자',
  tagline: '딥퍼플 위로 번지는 핑크와 시안',
  body: '깊은 보라 캔버스 위에 80s 석양 그라디언트와 퍼스펙티브 네온 그리드를 깔고, 표면마다 네온 글로우 보더로 빛의 윤곽을 새긴다. 본문은 밝은색을 고정해 대비를 지킨다.',
  ctaPrimary: '여정 시작',
  ctaSecondary: '가이드 보기',
  bandTitle: '석양의 격자 위에서, 지금 신스웨이브를 켜 보세요.',
  items: [
    { name: 'Grid', tone: 'accent', tag: 'PERSPECTIVE', desc: '소실점으로 수렴하는 퍼스펙티브 네온 그리드.' },
    { name: 'Scanline', tone: 'muted', tag: 'CRT', desc: 'CRT 스캔라인 오버레이로 레트로 질감을 더한다.' },
    { name: 'Glow', tone: 'solid', tag: 'NEON', desc: '핑크·시안 글로우 보더로 표면의 윤곽을 밝힌다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'VaporShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 네온',
    dos: [
      '표면 보더는 네온 글로우(핑크/시안)로 윤곽을 새긴다.',
      '배경에는 석양 그라디언트와 퍼스펙티브 그리드를 깔아 깊이를 만든다.',
    ],
    donts: [
      '글로우를 무채색 표면에 남발해 초점을 흐리지 않는다.',
      '다크 베이스에 어두운 본문색을 쓰지 않는다(대비 상실).',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '다크 베이스이므로 본문은 밝은색을 고정해 충분한 대비를 확보한다.',
      '네온 위 텍스트는 글로우에 묻히지 않도록 명도 대비를 별도 검증한다.',
      'prefers-reduced-motion에서 글리치·스캔라인 모션을 반드시 비활성화한다(발작 위험 회피).',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono)로 모노/세리프 혼합 인상을 준다.',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Vaporwave_Synth_01: 딥퍼플 캔버스 위 80s 석양 그라디언트와 퍼스펙티브 네온 그리드, 핑크·시안 글로우 보더, CRT 스캔라인 질감.',
  components: {
    Button: {
      description: '네온 글로우 보더 버튼. 시안 외곽선과 핑크 글로우가 어둠 속에서 빛난다.',
      specs: ['배경: 반투명 딥퍼플', '보더: 1px 네온(시안) + 핑크 글로우 그림자', '모서리: radius sm(4px)', 'hover: 글로우 강화 + 1px 떠오름', 'focus-visible: 시안 outline'],
    },
    Card: {
      description: '카드는 네온 글로우 보더와 CRT 스캔라인 오버레이로 레트로 모니터 표면을 연출한다.',
      specs: ['배경: 반투명 딥퍼플', '보더: 1px 네온 + 핑크 글로우', '오버레이: 스캔라인(reduced-motion 시 정지)', '모서리: radius sm(4px)'],
    },
    Tag: {
      description: '경량 pill 배지. 모노 대문자 라벨로 신스웨이브 HUD 같은 인상을 준다.',
      specs: ['배경: tone별(accent 시안 / muted 라이트 / solid 핑크)', '모서리: radius sm(4px)', '폰트: JetBrains Mono 대문자', '글자 간격 확장(0.06em)'],
    },
  },
  example: Showcase,
};

export const VaporShowcase = Showcase;
export const vaporwaveSynthWrappers = wrapperComponents;

export const vaporwaveSynthStyleGuide: StyleGuide = {
  name: 'vaporwave-synth-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (딥퍼플 + 핑크 네온)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 (파스텔 라벤더)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'cyan', label: '시안 강조 (다크)', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { VaporShowcase: Showcase },
  guidelines,
  visualMotif,
};
