import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Cyberpunk_Hud_01 — near-black 베이스 + 네온 HUD.
 *
 * #07090F near-black 캔버스 위에 네온 시안/마젠타/옐로 엣지, 모노·콘덴스트 타이포,
 * 클립된 모서리와 코너 브래킷 HUD 프레임. 글리치·스캔라인은 prefers-reduced-motion
 * 에서 비활성화하고, 본문은 밝은색으로 고정해 다크+네온 대비를 별도 확보한다.
 */

const NEON_CYAN = '#00FFD1';
const NEON_MAGENTA = '#FF2A6D';
const NEON_YELLOW = '#F9F002';

const foundations = makeFoundations({
  name: 'cyberpunk-hud-01',
  description: 'near-black 베이스 + 네온 시안·마젠타·옐로 엣지 + 클립 모서리 HUD 프레임(다크 베이스)',
  fontSans: "'IBM Plex Mono', ui-monospace, monospace",
  fontMono: "'IBM Plex Mono', ui-monospace, monospace",
  radius: { none: '0px', sm: '4px', md: '4px', lg: '6px', xl: '8px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 0 6px rgba(0,255,209,0.25)',
    md: '0 0 14px rgba(0,255,209,0.30)',
    lg: '0 0 28px rgba(0,255,209,0.35)',
    xl: '0 0 48px rgba(255,42,109,0.40)',
  },
  semantic: makeSemantic({
    bg: 'radial-gradient(120% 120% at 50% 0%, #0C111C 0%, #07090F 60%)',
    bgElevated: 'rgba(0,255,209,0.05)',
    bgSunken: 'rgba(0,0,0,0.40)',
    overlay: 'rgba(3,5,10,0.78)',
    fg: '#E6FBFF',
    fgMuted: 'rgba(196,224,232,0.82)',
    fgSubtle: 'rgba(150,184,196,0.60)',
    fgInverse: '#07090F',
    border: 'rgba(0,255,209,0.45)',
    borderMuted: 'rgba(0,255,209,0.20)',
    borderStrong: 'rgba(0,255,209,0.70)',
    focus: NEON_YELLOW,
    primaryBase: NEON_CYAN,
    primaryHover: '#33FFDC',
    primaryActive: '#00D9B2',
    primarySubtle: 'rgba(0,255,209,0.14)',
    primaryFg: '#04110E',
    accent: NEON_CYAN,
    accent2: NEON_MAGENTA,
    accent3: NEON_YELLOW,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-neon-edge': '0 0 4px rgba(0,255,209,0.80), 0 0 12px rgba(0,255,209,0.45)',
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(0,255,209,0.06) 0px, rgba(0,255,209,0.06) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-hud-frame': 'rgba(0,255,209,0.70)',
  '--bbangto-ext-glitch': 'rgba(255,42,109,0.65)',
};

/* 색 스킴 변형 — 클립 모서리·코너 브래킷·스캔라인 모티프는 base에서 상속하고 색만 교체. */

/* daylight HUD — 밝은 콘솔 위 티일 시안 신호(다크 base와 명확히 구분되는 라이트 스킴). */
const lightFoundations = makeColorway(foundations, {
  name: 'cyberpunk-hud-01-light',
  description: 'daylight HUD — 밝은 콘솔 표면 + 티일 시안 신호(라이트)',
  semantic: makeSemantic({
    bg: '#EAF4F2', bgElevated: '#FFFFFF', bgSunken: '#DCE9E6', overlay: 'rgba(6,20,18,0.55)',
    fg: '#06131A', fgMuted: 'rgba(6,19,26,0.72)', fgSubtle: 'rgba(6,19,26,0.50)', fgInverse: '#EAF4F2',
    border: 'rgba(0,140,122,0.40)', borderMuted: 'rgba(0,140,122,0.18)', borderStrong: 'rgba(0,140,122,0.65)',
    focus: '#B26A00',
    primaryBase: '#008C7A', primaryHover: '#00786A', primaryActive: '#00655A',
    primarySubtle: 'rgba(0,140,122,0.14)', primaryFg: '#FFFFFF',
    accent: '#008C7A', accent2: '#C2185B', accent3: '#B26A00',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-neon-edge': '0 0 4px rgba(0,140,122,0.45), 0 0 12px rgba(0,140,122,0.22)',
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(0,140,122,0.05) 0px, rgba(0,140,122,0.05) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-hud-frame': 'rgba(0,140,122,0.65)',
  '--bbangto-ext-glitch': 'rgba(194,24,91,0.60)',
};

/* magenta signal — near-black base 유지, 네온을 시안→마젠타로 전환한 강조 변형. */
const magentaFoundations = makeColorway(foundations, {
  name: 'cyberpunk-hud-01-magenta',
  description: 'magenta signal — near-black + 마젠타 네온 엣지(시안 포커스 강조 변형)',
  semantic: makeSemantic({
    bg: 'radial-gradient(120% 120% at 50% 0%, #1A0A14 0%, #0A050B 60%)',
    bgElevated: 'rgba(255,42,109,0.06)', bgSunken: 'rgba(0,0,0,0.42)', overlay: 'rgba(10,3,8,0.80)',
    fg: '#FFE9F2', fgMuted: 'rgba(240,200,216,0.82)', fgSubtle: 'rgba(210,160,182,0.60)', fgInverse: '#0A050B',
    border: 'rgba(255,42,109,0.45)', borderMuted: 'rgba(255,42,109,0.20)', borderStrong: 'rgba(255,42,109,0.72)',
    focus: NEON_CYAN,
    primaryBase: NEON_MAGENTA, primaryHover: '#FF5488', primaryActive: '#D91E58',
    primarySubtle: 'rgba(255,42,109,0.16)', primaryFg: '#160208',
    accent: NEON_MAGENTA, accent2: NEON_CYAN, accent3: NEON_YELLOW,
  }),
});
const magentaExt: Record<string, string> = {
  '--bbangto-ext-neon-edge': '0 0 4px rgba(255,42,109,0.80), 0 0 12px rgba(255,42,109,0.45)',
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(255,42,109,0.06) 0px, rgba(255,42,109,0.06) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-hud-frame': 'rgba(255,42,109,0.70)',
  '--bbangto-ext-glitch': 'rgba(0,255,209,0.65)',
};

const STYLE_ID = 'bbangto-cyberpunk-hud-01-motif';
const CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';
const CSS = `
.bbangto-cyb-btn {
  position: relative !important;
  background: var(--bbangto-semantic-primary-subtle, rgba(0,255,209,0.14)) !important;
  color: var(--bbangto-semantic-foreground-base, #E6FBFF) !important;
  border: 1px solid var(--bbangto-ext-hud-frame, rgba(0,255,209,0.70)) !important;
  border-radius: 0 !important;
  clip-path: ${CLIP};
  font-family: 'IBM Plex Mono', ui-monospace, monospace !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  box-shadow: var(--bbangto-ext-neon-edge, 0 0 12px rgba(0,255,209,0.45)) !important;
  transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-cyb-btn:hover {
  background: rgba(0,255,209,0.24) !important;
  transform: translateY(-1px);
  box-shadow: 0 0 6px rgba(0,255,209,0.90), 0 0 20px rgba(0,255,209,0.55) !important;
}
.bbangto-cyb-btn:active { transform: translateY(0); }
.bbangto-cyb-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-border-focus, ${NEON_YELLOW}) !important;
  outline-offset: 2px;
}
.bbangto-cyb-card {
  position: relative !important;
  background: var(--bbangto-semantic-background-elevated, rgba(0,255,209,0.05)) !important;
  border: 1px solid var(--bbangto-ext-hud-frame, rgba(0,255,209,0.70)) !important;
  border-radius: 0 !important;
  clip-path: ${CLIP};
  box-shadow: inset 0 0 0 1px rgba(0,255,209,0.10), 0 0 24px rgba(0,255,209,0.18) !important;
  background-image: var(--bbangto-ext-scanline, none) !important;
}
/* HUD 코너 브래킷 */
.bbangto-cyb-card::before,
.bbangto-cyb-card::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
}
.bbangto-cyb-card::before {
  top: 5px; left: 5px;
  border-top: 2px solid var(--bbangto-ext-hud-frame, rgba(0,255,209,0.70));
  border-left: 2px solid var(--bbangto-ext-hud-frame, rgba(0,255,209,0.70));
}
.bbangto-cyb-card::after {
  bottom: 5px; right: 5px;
  border-bottom: 2px solid var(--bbangto-ext-glitch, rgba(255,42,109,0.65));
  border-right: 2px solid var(--bbangto-ext-glitch, rgba(255,42,109,0.65));
}
@keyframes bbangto-cyb-glitch {
  0%, 92%, 100% { transform: translate(0, 0); }
  94% { transform: translate(-1px, 0); }
  96% { transform: translate(1px, 0); }
  98% { transform: translate(-1px, 0); }
}
.bbangto-cyb-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: ${CLIP};
  pointer-events: none;
  animation: bbangto-cyb-glitch 5.5s steps(2, end) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-cyb-btn { transition: none !important; }
  .bbangto-cyb-btn:hover, .bbangto-cyb-btn:active { transform: none; }
  .bbangto-cyb-btn::after { animation: none !important; }
  .bbangto-cyb-card { background-image: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-cyb-btn',
  cardClass: 'bbangto-cyb-card',
  displayPrefix: 'Cyber',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 0, fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.10em', lineHeight: 1.6, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(0,255,209,0.14))',
        color: 'var(--bbangto-semantic-primary-hover, #9CFFEC)',
        border: '1px solid var(--bbangto-semantic-primary-base, rgba(0,255,209,0.55))',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, rgba(150,184,196,0.10))',
        color: 'var(--bbangto-semantic-foreground-muted, rgba(196,224,232,0.82))',
        border: '1px solid var(--bbangto-semantic-border-muted, rgba(150,184,196,0.32))',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, ' + NEON_MAGENTA + ')',
        color: 'var(--bbangto-semantic-primary-foreground, #0B0207)',
        border: '1px solid var(--bbangto-semantic-primary-base, rgba(255,42,109,0.70))',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'HUD ONLINE',
  title: '네온이 흐르는 작전 인터페이스',
  tagline: 'near-black 위에 떠오르는 신호',
  body: '거의 검은 캔버스 위로 시안·마젠타 네온 엣지를 얹어 위계를 만든다. 코너 브래킷과 클립된 모서리가 HUD 프레임의 시그니처다.',
  ctaPrimary: '접속하기',
  ctaSecondary: '로그 보기',
  bandTitle: '신호를 켜고 작전 콘솔로 진입하세요.',
  items: [
    { name: 'Signal', tone: 'accent', tag: 'NEON', desc: '시안 네온 엣지로 활성 상태의 초점을 만든다.' },
    { name: 'Frame', tone: 'muted', tag: 'BRACKET', desc: '코너 브래킷과 클립 모서리로 HUD 골격을 그린다.' },
    { name: 'Alert', tone: 'solid', tag: 'GLITCH', desc: '마젠타 글리치 엣지로 경고·강조를 표현한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'CyberShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 프레임',
    dos: ['표면은 near-black 위 네온 엣지·코너 브래킷으로 HUD 골격을 만든다.', '모서리는 클립(clip-path)으로 깎아 기계적 인상을 유지한다.'],
    donts: ['둥근 라운드 모서리를 크게 쓰지 않는다(HUD 인상 상실).', '네온을 본문 전체에 칠하지 않는다(가독성 저하).'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '본문 텍스트는 밝은색(#E6FBFF)으로 고정해 다크+네온 대비를 확보한다.',
      '글리치·스캔라인 애니메이션은 prefers-reduced-motion에서 비활성화한다.',
      '포커스는 옐로 outline(2px)으로 네온 배경 위에서도 가시성을 보장한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문·라벨·수치 모두 IBM Plex Mono(mono)로 콘덴스트한 HUD 톤을 유지한다.',
    requiredFonts: ['IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Cyberpunk_Hud_01: near-black 캔버스 위 시안·마젠타 네온 엣지, 클립된 모서리와 코너 브래킷 HUD 프레임, 모노 타이포, 글리치/스캔라인(reduced-motion 비활성).',
  components: {
    Button: {
      description: '클립된 모서리에 네온 보더가 둘러진 HUD 버튼. hover 시 글로우가 강해진다.',
      specs: ['배경: 시안 subtle + 네온 글로우', '보더: 1px HUD 프레임 시안', '모서리: clip-path 깎기(라운드 없음)', 'hover: 글로우 강화 + 1px 떠오름', 'focus-visible: 옐로 outline', 'glitch: reduced-motion에서 비활성'],
    },
    Card: {
      description: '코너 브래킷과 스캔라인 텍스처로 작전 콘솔 패널 인상을 만든다.',
      specs: ['배경: elevated + 스캔라인 오버레이', '보더: 1px HUD 프레임', '코너: 좌상 시안 / 우하 마젠타 브래킷', '모서리: clip-path 깎기', '스캔라인: reduced-motion에서 제거'],
    },
    Tag: {
      description: '클립된 작은 칩 배지. tone별 네온 색으로 신호 상태를 표시한다.',
      specs: ['배경: tone별(accent 시안 / muted 그레이 / solid 마젠타)', '모서리: 작은 clip 깎기', '폰트: IBM Plex Mono 대문자', '자간: 0.10em'],
    },
  },
  example: Showcase,
};

export const CyberShowcase = Showcase;
export const cyberpunkHudWrappers = wrapperComponents;

export const cyberpunkHudStyleGuide: StyleGuide = {
  name: 'cyberpunk-hud-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (시안 네온 · near-black)', foundations, extendedFoundations },
    { key: 'light', label: '데이라이트 HUD (티일 · 라이트)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'magenta', label: '마젠타 시그널 (강조)', foundations: magentaFoundations, extendedFoundations: magentaExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { CyberShowcase: Showcase },
  guidelines,
  visualMotif,
};
