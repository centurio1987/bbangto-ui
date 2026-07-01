import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Glitch_Distortion_01 — '데이터 손상'을 미감으로 삼는 듀오톤 글리치.
 *
 * near-black/딥차콜 베이스 + 네온 마젠타·시안 듀오톤(+간헐 옐로) 액센트.
 * 드롭섀도 대신 RGB 채널 오프셋 복제(마젠타/시안 가장자리)와 픽셀 블록 잔상으로
 * 깊이를 대체한다. radius는 none~sm으로 픽셀 블록감을 유지하고, 글리치(채널 시프트·
 * 슬라이스 점프)는 hover/포커스 등 의도된 순간에만 강하게 드러난다.
 */

const FG = '#F2F2F5';
const MAGENTA = '#FF00C8';
const CYAN = '#00E5FF';
const YELLOW = '#FFE600';
const CHANNEL_SHADOW = '1px 0 0 rgba(255,0,200,0.55), -1px 0 0 rgba(0,229,255,0.55)';

const foundations = makeFoundations({
  name: 'glitch-distortion-01',
  description: 'near-black 베이스 + 마젠타/시안 듀오톤 + RGB 채널 오프셋·슬라이스 글리치, 모노/콘덴스트 디스플레이',
  fontSans: "'Archivo', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '2px', lg: '4px', xl: '4px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: CHANNEL_SHADOW,
    md: '2px 0 0 rgba(255,0,200,0.8), -2px 0 0 rgba(0,229,255,0.8)',
    lg: `3px 0 0 ${MAGENTA}, -3px 0 0 ${CYAN}`,
    xl: `4px 0 0 ${MAGENTA}, -4px 0 0 ${CYAN}, 0 0 24px rgba(255,0,200,0.3)`,
  },
  typeScale: {
    display: { fontSize: '72px', lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: 800 },
    h1: { fontSize: '42px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 800 },
    h2: { fontSize: '28px', lineHeight: '1.15', letterSpacing: '0', fontWeight: 700 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#0A0A0E',
    bgElevated: '#14141A',
    bgSunken: '#050507',
    overlay: 'rgba(0,0,0,0.62)',
    fg: FG,
    fgMuted: '#B8B8C2',
    fgSubtle: '#7A7A88',
    fgInverse: '#0A0A0E',
    border: '#2A2A33',
    borderMuted: '#1C1C24',
    borderStrong: '#3D3D4A',
    focus: CYAN,
    primaryBase: MAGENTA,
    primaryHover: '#E600B4',
    primaryActive: '#CC00A0',
    primarySubtle: '#2A0A22',
    primaryFg: '#FFFFFF',
    accent: MAGENTA,
    accent2: CYAN,
    accent3: YELLOW,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-rgb-shift': '3px',
  '--bbangto-ext-glitch-magenta': MAGENTA,
  '--bbangto-ext-glitch-cyan': CYAN,
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-slice-offset': '8px',
  '--bbangto-ext-datamosh': 'repeating-linear-gradient(135deg, rgba(255,0,200,0.08) 0 6px, rgba(0,229,255,0.08) 6px 12px)',
  '--bbangto-ext-colorbar': `linear-gradient(90deg, ${MAGENTA} 0 33%, ${CYAN} 33% 66%, ${YELLOW} 66% 100%)`,
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-channel-shadow': CHANNEL_SHADOW,
};

/* 색 스킴 변형(colorway) — 채널 오프셋·슬라이스·픽셀 모티프는 base에서 상속하고 색만 교체. */

/* light — 종이/표백 글리치: 화이트 지면 위 딥 마젠타/틸 시안 듀오톤. */
const LIGHT_MAGENTA = '#C6009A';
const LIGHT_CYAN = '#0092A8';
const lightFoundations = makeColorway(foundations, {
  name: 'glitch-distortion-01-light',
  description: '표백 글리치 — 화이트 지면 위 딥 마젠타/틸 시안 채널 오프셋',
  semantic: makeSemantic({
    bg: '#F4F4F7', bgElevated: '#FFFFFF', bgSunken: '#E6E6EC', overlay: 'rgba(0,0,0,0.35)',
    fg: '#0E0E14', fgMuted: '#3A3A44', fgSubtle: '#6A6A78', fgInverse: '#F4F4F7',
    border: '#C8C8D2', borderMuted: '#DEDEE6', borderStrong: '#9A9AA6', focus: LIGHT_CYAN,
    primaryBase: LIGHT_MAGENTA, primaryHover: '#A80083', primaryActive: '#8A006C',
    primarySubtle: '#FBD9F1', primaryFg: '#FFFFFF',
    accent: LIGHT_MAGENTA, accent2: LIGHT_CYAN, accent3: '#B38F00',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-rgb-shift': '3px',
  '--bbangto-ext-glitch-magenta': LIGHT_MAGENTA,
  '--bbangto-ext-glitch-cyan': LIGHT_CYAN,
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-slice-offset': '8px',
  '--bbangto-ext-datamosh': 'repeating-linear-gradient(135deg, rgba(198,0,154,0.08) 0 6px, rgba(0,146,168,0.08) 6px 12px)',
  '--bbangto-ext-colorbar': `linear-gradient(90deg, ${LIGHT_MAGENTA} 0 33%, ${LIGHT_CYAN} 33% 66%, #B38F00 66% 100%)`,
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-channel-shadow': '1px 0 0 rgba(198,0,154,0.55), -1px 0 0 rgba(0,146,168,0.55)',
};

/* cyan — 액센트 전환: near-black 유지, 리드 액센트를 시안으로, 포커스를 마젠타로 뒤집는다. */
const cyanFoundations = makeColorway(foundations, {
  name: 'glitch-distortion-01-cyan',
  description: '시안 채널 리드 — 딥 틸-블랙 위 시안 primary + 마젠타 포커스',
  semantic: makeSemantic({
    bg: '#05090C', bgElevated: '#0E161B', bgSunken: '#020507', overlay: 'rgba(0,0,0,0.62)',
    fg: '#EAFBFF', fgMuted: '#A8C4CC', fgSubtle: '#6E8890', fgInverse: '#05090C',
    border: '#1E3038', borderMuted: '#142228', borderStrong: '#2E4650', focus: MAGENTA,
    primaryBase: CYAN, primaryHover: '#00CFEA', primaryActive: '#00B4CC',
    primarySubtle: '#05323A', primaryFg: '#04121A',
    accent: CYAN, accent2: MAGENTA, accent3: YELLOW,
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-rgb-shift': '3px',
  '--bbangto-ext-glitch-magenta': CYAN,
  '--bbangto-ext-glitch-cyan': MAGENTA,
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-slice-offset': '8px',
  '--bbangto-ext-datamosh': 'repeating-linear-gradient(135deg, rgba(0,229,255,0.08) 0 6px, rgba(255,0,200,0.08) 6px 12px)',
  '--bbangto-ext-colorbar': `linear-gradient(90deg, ${CYAN} 0 33%, ${MAGENTA} 33% 66%, ${YELLOW} 66% 100%)`,
  '--bbangto-ext-scanline': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)',
  '--bbangto-ext-channel-shadow': '1px 0 0 rgba(0,229,255,0.55), -1px 0 0 rgba(255,0,200,0.55)',
};

const STYLE_ID = 'bbangto-glitch-distortion-motif';
const CSS = `
.bbangto-glitch-distortion-card {
  border-radius: 2px !important;
  background: var(--bbangto-semantic-background-elevated, #14141A) !important;
  border: 1px solid var(--bbangto-semantic-border-base, #2A2A33) !important;
  box-shadow: var(--bbangto-ext-channel-shadow, ${CHANNEL_SHADOW}) !important;
  position: relative;
  transition: transform 160ms steps(2, end), box-shadow 160ms ease !important;
}
.bbangto-glitch-distortion-card:hover {
  transform: translateX(var(--bbangto-ext-rgb-shift, 3px)) !important;
  box-shadow: 3px 0 0 var(--bbangto-ext-glitch-magenta, ${MAGENTA}), -3px 0 0 var(--bbangto-ext-glitch-cyan, ${CYAN}) !important;
}
.bbangto-glitch-distortion-btn {
  border-radius: 2px !important;
  background: var(--bbangto-semantic-primary-base, ${MAGENTA}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-family: var(--bbangto-typography-font-family-mono, 'Space Mono', monospace) !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase;
  transition: transform 120ms steps(2, end), text-shadow 120ms ease, background 120ms ease !important;
}
.bbangto-glitch-distortion-btn:hover {
  background: var(--bbangto-semantic-primary-hover, #E600B4) !important;
  text-shadow: 2px 0 0 rgba(0,229,255,0.9), -2px 0 0 ${YELLOW} !important;
  transform: translateX(2px) !important;
}
.bbangto-glitch-distortion-btn:active { transform: translateX(-2px) scale(0.99) !important; }
.bbangto-glitch-distortion-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-focus, ${CYAN}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-glitch-distortion-card { transition: none !important; }
  .bbangto-glitch-distortion-card:hover { transform: none !important; }
  .bbangto-glitch-distortion-btn { transition: none !important; }
  .bbangto-glitch-distortion-btn:hover { text-shadow: none !important; transform: none !important; }
  .bbangto-glitch-distortion-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-glitch-distortion-btn',
  cardClass: 'bbangto-glitch-distortion-card',
  displayPrefix: 'GlitchDistortion',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      borderRadius: 2, fontFamily: "'Space Mono', 'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1.4, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(0,229,255,0.14))',
        color: 'var(--bbangto-semantic-primary-active, #00E5FF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #1C1C24)',
        color: 'var(--bbangto-semantic-foreground-muted, #B8B8C2)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #FF00C8)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'GLITCH_05',
  title: '데이터가 깨지는 순간',
  tagline: '어긋난 채널, 밀려난 슬라이스',
  body: 'RGB 채널을 분리해 마젠타와 시안 가장자리를 어긋나게 겹치고, 가로 슬라이스를 밀어 픽셀이 무너진 손상을 연출한다. 정적 상태는 가독 가능한 베이스를 유지하고, 글리치는 hover와 포커스의 순간에만 강하게 드러난다.',
  ctaPrimary: '리빌 재생',
  ctaSecondary: '아카이브 열기',
  bandTitle: 'RGB가 어긋나고 픽셀이 무너진다 — 손상 그 자체가 미감.',
  items: [
    { name: '히어로 글리치', tone: 'accent', tag: 'HERO', desc: '왜곡된 인물 위로 채널 시프트된 대형 헤드라인을 얹는다.' },
    { name: '에러 상태', tone: 'muted', tag: '404', desc: '데이터 손상 연출로 로딩·오류 화면을 표현한다.' },
    { name: '포스터 리빌', tone: 'solid', tag: 'DROP', desc: '채널 분리 복제와 슬라이스 점프로 프로덕트 리빌을 강조한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'GlitchDistortionShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 글리치 운용',
    dos: [
      'Hero·갤러리 그리드·404/로딩·포스터형 랜딩·프로덕트 리빌에 글리치를 배치한다.',
      'radius는 none~sm으로 픽셀 블록감을 유지하고 spacing은 타이트~표준으로 좁힌다.',
      '글리치(채널 시프트·슬라이스 점프)는 hover/포커스/전환 등 의도된 순간에만 강하게 적용한다.',
    ],
    donts: [
      '본문 전체에 상시 채널 시프트·슬라이스를 적용하지 않는다.',
      '마젠타↔시안이 동시에 발광하는 면 위에 핵심 텍스트를 올리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성 (⚠ WCAG)',
    rules: [
      'near-black 위 네온·채널 오프셋·저해상 픽셀화는 대비 저하 위험 → 텍스트 명도 대비 ≥4.5:1을 별도 검증한다.',
      '핵심 텍스트·CTA 라벨은 채널 오프셋을 0에 가깝게 두고 고대비 레이어를 확보한다.',
      '색만으로 의미를 전달하지 않는다(채널 색·컬러바는 보조 수단으로만 사용).',
      '빠른 깜빡임·슬라이스 점프는 photosensitive(발작) 위험 → 1초 3회 미만 플래시로 제한하고 prefers-reduced-motion에서 글리치 애니메이션을 정지한다.',
      '글리치 처리된 인물/이미지는 alt 텍스트로 원 의미를 보강한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '디스플레이는 모노/콘덴스트(Space Mono·Archivo)로 채널 복제까지 적용하고, 본문은 가독성을 위해 클린 산세리프를 쓴다.',
    requiredFonts: ['Space Mono', 'JetBrains Mono', 'Archivo', 'Pretendard'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Glitch_Distortion_01: RGB 채널이 어긋나고 가로 슬라이스가 밀려 픽셀이 깨진, "데이터 손상"을 미감으로 삼는 듀오톤 글리치. near-black 위 마젠타/시안 액센트가 시그니처.',
  components: {
    Button: {
      description: '모노 대문자 마젠타 채움 버튼. hover에 시안/옐로 채널 시프트(text-shadow)와 슬라이스 점프, active에 역방향 점프.',
      specs: ['모서리: radius 2px(픽셀 블록)', '채움: 마젠타 primary', '폰트: Space Mono 대문자', 'hover: 채널 시프트 + translateX 점프', 'focus-visible: 시안 outline', 'reduce-motion: 시프트·점프 비활성'],
    },
    Card: {
      description: 'RGB 채널 오프셋 복제 그림자를 두른 딥차콜 타일. hover에서 슬라이스가 옆으로 밀리며 채널 오프셋이 강화된다.',
      specs: ['모서리: radius 2px', '그림자: 마젠타/시안 채널 오프셋(드롭섀도 대체)', '보더: 1px 다크', 'hover: translateX 슬라이스 + 오프셋 강화', 'reduce-motion: 슬라이스 비활성'],
    },
    Tag: {
      description: '모노 대문자 코드/노이즈 라벨. accent=시안 subtle, muted=중립 다크, solid=마젠타.',
      specs: ['모서리: 2px(픽셀)', '폰트: Space Mono', '텍스트: letter-spacing 0.1em 대문자', '색: cyan-subtle / neutral / magenta'],
    },
  },
  example: Showcase,
};

export const glitchDistortionWrappers = wrapperComponents;
export const GlitchDistortionShowcase = Showcase;

export const glitchDistortionStyleGuide: StyleGuide = {
  name: 'glitch-distortion-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (near-black · 마젠타)', foundations, extendedFoundations },
    { key: 'light', label: '표백 라이트 (딥 마젠타/틸)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'cyan', label: '시안 액센트 (틸-블랙)', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { GlitchDistortionShowcase: Showcase },
  guidelines,
  visualMotif,
};
