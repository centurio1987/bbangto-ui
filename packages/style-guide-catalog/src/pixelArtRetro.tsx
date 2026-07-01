import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Pixel_Art_Retro_01 — 의도적 저해상 8비트 도트 미감.
 *
 * CRT 다크 베이스 + 제한 팔레트(코발트 블루/레드/그린/옐로) 고채도 원색,
 * 모든 형태를 정수 픽셀 그리드(4px/8px 배수)에 스냅한다. 라운드 곡선 금지(직각),
 * blur 0 하드 오프셋 도트 그림자, image-rendering: pixelated. 픽셀폰트는 헤드/라벨
 * 강조에만, 본문은 가독 산세리프. 시그니처는 계단형 모서리·격자 배경·블록 타이포.
 */

const COBALT = '#2D5BFF';
const PIXEL_SHADOW = '4px 4px 0 0 #000000';
const PIXEL_FONT = "'Press Start 2P', 'Galmuri11', monospace";

const foundations = makeFoundations({
  name: 'pixel-art-retro-01',
  description:
    '8비트 도트 미감 + 정수 픽셀 그리드 스냅 + 직각 모서리 + blur 0 하드 도트 그림자, CRT 다크 베이스에 고채도 원색',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: PIXEL_FONT,
  radius: { none: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', full: '0px' },
  shadow: {
    none: 'none',
    sm: '2px 2px 0 0 #000000',
    md: PIXEL_SHADOW,
    lg: '6px 6px 0 0 #000000',
    xl: '8px 8px 0 0 #000000',
  },
  typeScale: {
    display: { fontSize: '44px', lineHeight: '1.25', letterSpacing: '0', fontWeight: 400 },
    h1: { fontSize: '28px', lineHeight: '1.3', letterSpacing: '0', fontWeight: 400 },
    h2: { fontSize: '20px', lineHeight: '1.35', letterSpacing: '0', fontWeight: 400 },
    meta: { fontSize: '11px', lineHeight: '1.6', letterSpacing: '0.08em', fontWeight: 400 },
  },
  semantic: makeSemantic({
    bg: '#10121A',
    bgElevated: '#1A1D2B',
    bgSunken: '#0A0B12',
    overlay: 'rgba(0,0,0,0.62)',
    fg: '#F2F4FF',
    fgMuted: '#AEB6DC',
    fgSubtle: '#7B83AE',
    fgInverse: '#10121A',
    border: '#3A4060',
    borderMuted: '#262B40',
    borderStrong: '#5A628A',
    focus: '#FFD23F',
    primaryBase: COBALT,
    primaryHover: '#1A47E6',
    primaryActive: '#1238C0',
    primarySubtle: '#1A2240',
    primaryFg: '#FFFFFF',
    accent: COBALT,
    accent2: '#3FCF6A',
    accent3: '#FF4D4D',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-pixel-grid':
    'repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 16px)',
  '--bbangto-ext-dither':
    'repeating-conic-gradient(#1A1D2B 0% 25%, #10121A 0% 50%) 50% / 4px 4px',
  '--bbangto-ext-pixel-shadow': PIXEL_SHADOW,
  '--bbangto-ext-pixel-border': '3px solid #5A628A',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)',
  '--bbangto-ext-palette-index': '#2D5BFF, #FF4D4D, #3FCF6A, #FFD23F',
};

/* 색 스킴 변형 — 픽셀 그리드·계단형 직각·하드 도트 그림자 모티프는 base에서 상속, 색만 교체. */

/* Light: 아케이드 오락실 종이/스티커 미감 — 크림 페이퍼 위 잉크 도트, 코발트 유지, 레드 포커스. */
const arcadePaperFoundations = makeColorway(foundations, {
  name: 'pixel-art-retro-01-arcade-paper',
  description: '8비트 라이트 — 크림 페이퍼 위 잉크 도트, 코발트 원색 + 레드 포커스',
  semantic: makeSemantic({
    bg: '#F4F1E8', bgElevated: '#FFFFFF', bgSunken: '#E7E2D2', overlay: 'rgba(20,18,10,0.45)',
    fg: '#1A1710', fgMuted: '#4A4535', fgSubtle: '#7A7460', fgInverse: '#F4F1E8',
    border: '#C7BFA8', borderMuted: '#DED7C4', borderStrong: '#8A836B', focus: '#FF4D4D',
    primaryBase: COBALT, primaryHover: '#1A47E6', primaryActive: '#1238C0',
    primarySubtle: '#D6DEFF', primaryFg: '#FFFFFF',
    accent: COBALT, accent2: '#2E9E52', accent3: '#E23B3B',
  }),
});
const arcadePaperExt: Record<string, string> = {
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-pixel-grid':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.055) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(0,0,0,0.055) 0 1px, transparent 1px 16px)',
  '--bbangto-ext-dither':
    'repeating-conic-gradient(#FFFFFF 0% 25%, #E7E2D2 0% 50%) 50% / 4px 4px',
  '--bbangto-ext-pixel-shadow': '4px 4px 0 0 #1A1710',
  '--bbangto-ext-pixel-border': '3px solid #8A836B',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 3px)',
  '--bbangto-ext-palette-index': '#2D5BFF, #E23B3B, #2E9E52, #FF4D4D',
};

/* Accent: 신스웨이브 아케이드 — 딥 퍼플 CRT 베이스에 핫 마젠타 원색 + 그린 포커스. */
const synthwaveFoundations = makeColorway(foundations, {
  name: 'pixel-art-retro-01-synthwave',
  description: '8비트 다크 액센트 — 딥 퍼플 CRT + 핫 마젠타 원색 + 그린 포커스',
  semantic: makeSemantic({
    bg: '#17101E', bgElevated: '#221630', bgSunken: '#0E0914', overlay: 'rgba(0,0,0,0.62)',
    fg: '#F8ECFF', fgMuted: '#C9AEDC', fgSubtle: '#9179A6', fgInverse: '#17101E',
    border: '#4A3560', borderMuted: '#2C2038', borderStrong: '#6E4F8A', focus: '#3FCF6A',
    primaryBase: '#FF3DAE', primaryHover: '#E62698', primaryActive: '#C01880',
    primarySubtle: '#3A1030', primaryFg: '#FFFFFF',
    accent: '#FF3DAE', accent2: COBALT, accent3: '#FFD23F',
  }),
});
const synthwaveExt: Record<string, string> = {
  '--bbangto-ext-pixel-size': '4px',
  '--bbangto-ext-pixel-grid':
    'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 16px)',
  '--bbangto-ext-dither':
    'repeating-conic-gradient(#221630 0% 25%, #17101E 0% 50%) 50% / 4px 4px',
  '--bbangto-ext-pixel-shadow': '4px 4px 0 0 #000000',
  '--bbangto-ext-pixel-border': '3px solid #6E4F8A',
  '--bbangto-ext-scanline':
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.20) 0 1px, transparent 1px 3px)',
  '--bbangto-ext-palette-index': '#FF3DAE, #2D5BFF, #3FCF6A, #FFD23F',
};

const STYLE_ID = 'bbangto-pixel-art-retro-motif';
const CSS = `
.bbangto-pixel-art-retro-card {
  border-radius: 0 !important;
  border: var(--bbangto-ext-pixel-border, 3px solid #5A628A) !important;
  box-shadow: var(--bbangto-ext-pixel-shadow, ${PIXEL_SHADOW}) !important;
  background-color: var(--bbangto-semantic-background-elevated, #1A1D2B) !important;
  background-image: var(--bbangto-ext-pixel-grid) !important;
  image-rendering: pixelated !important;
  transition: transform 80ms steps(2, end), box-shadow 80ms steps(2, end) !important;
}
.bbangto-pixel-art-retro-card:hover {
  transform: translate(-2px, -2px) !important;
  box-shadow: 6px 6px 0 0 #000000 !important;
}
.bbangto-pixel-art-retro-btn {
  border-radius: 0 !important;
  border: 3px solid #000000 !important;
  background: var(--bbangto-semantic-primary-base, ${COBALT}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-family: ${PIXEL_FONT} !important;
  font-size: 12px !important;
  letter-spacing: 0.02em !important;
  box-shadow: var(--bbangto-ext-pixel-shadow, ${PIXEL_SHADOW}) !important;
  image-rendering: pixelated !important;
  transition: transform 80ms steps(2, end), box-shadow 80ms steps(2, end) !important;
}
.bbangto-pixel-art-retro-btn:hover { background: var(--bbangto-semantic-primary-hover, #1A47E6) !important; }
.bbangto-pixel-art-retro-btn:active {
  transform: translate(4px, 4px) !important;
  box-shadow: 0 0 0 0 #000000 !important;
}
.bbangto-pixel-art-retro-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-border-focus, #FFD23F) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-pixel-art-retro-card { transition: none !important; }
  .bbangto-pixel-art-retro-card:hover { transform: none !important; }
  .bbangto-pixel-art-retro-btn { transition: none !important; }
  .bbangto-pixel-art-retro-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-pixel-art-retro-btn',
  cardClass: 'bbangto-pixel-art-retro-card',
  displayPrefix: 'PixelArtRetro',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px',
      borderRadius: 0, border: '2px solid #000000', fontFamily: PIXEL_FONT,
      fontSize: 9, fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6,
      whiteSpace: 'nowrap', textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, #1A2240)',
        color: 'var(--bbangto-semantic-foreground-muted, #8FA8FF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-border-muted, #262B40)',
        color: 'var(--bbangto-semantic-foreground-muted, #AEB6DC)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #3FCF6A)',
        color: 'var(--bbangto-semantic-primary-foreground, #08120A)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'PIXEL 01',
  title: '도트로 쌓아 올린 8비트 화면',
  tagline: '정수 픽셀 그리드에 스냅된 레트로 게임 미감',
  body: '모든 형태가 4px 그리드에 딱 맞아떨어진다. 직각 모서리, 블러 0의 하드 도트 그림자, 격자 배경 위 고채도 원색으로 옛 콘솔 화면의 또렷한 도트 감성을 되살린다.',
  ctaPrimary: 'START',
  ctaSecondary: 'CONTINUE',
  bandTitle: '저해상이지만 또렷하게 — 픽셀 하나까지 그리드에 맞춘다.',
  items: [
    { name: '스코어 보드', tone: 'accent', tag: 'SCORE', desc: '게임풍 수치 패널을 픽셀 보더 카드에 담아 또렷이 보여준다.' },
    { name: '아이템 슬롯', tone: 'muted', tag: 'ITEM', desc: '도트 매트릭스 글리프를 균일한 픽셀 그리드 셀에 배치한다.' },
    { name: '액션 버튼', tone: 'solid', tag: 'PLAY', desc: '눌리면 그림자만큼 우하로 내려앉는 직각 8비트 버튼이다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'PixelArtRetroShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '픽셀 그리드 & 레이아웃',
    dos: [
      '모든 크기·간격·위치를 4px/8px 정수 픽셀 그리드 단위에 스냅한다.',
      'image-rendering: pixelated로 스케일 시에도 도트가 또렷하게 유지되게 한다.',
      '곡선은 라운드 대신 계단형 픽셀 단으로 표현한다.',
    ],
    donts: [
      '안티앨리어싱·그라디언트·라운드 곡선을 남용해 도트 경계를 흐리지 않는다.',
      '서브픽셀(소수점) 위치/크기로 요소를 배치해 그리드 정렬을 깨뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 비트맵/픽셀 폰트는 소형 시 가독성·대비가 떨어지므로 헤드·라벨 강조에만 쓰고, 장문 본문은 가독 산세리프로 최소 크기·충분한 대비를 확보한다.',
      '⚠ 격자·디더링 배경 위 텍스트는 저대비로 위배되기 쉬우므로 본문 4.5:1 이상 대비를 보강한다.',
      '⚠ CRT 스캔라인·블링킹 커서는 prefers-reduced-motion 시 정지하고, 발작 위험이 있는 빠른 점멸을 회피한다.',
      '픽셀 아이콘은 도트 글리프만으로 의미를 전달하지 않도록 대체 텍스트를 제공한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '픽셀 디스플레이 폰트(Press Start 2P / Galmuri)는 헤드·라벨에만, 본문은 가독 산세리프(Pretendard)로 작성한다.',
    requiredFonts: ['Press Start 2P', 'Galmuri11', 'Pretendard'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Pixel_Art_Retro_01: 의도적 저해상 8비트 — 정수 픽셀 그리드에 스냅된 블록 타이포·도트 일러스트·계단형 직각 모서리·격자 배경으로 레트로 게임 도트 미감을 만든다.',
  components: {
    Button: {
      description: '직각 + 하드 도트 그림자 버튼. press 시 그림자만큼 우하로 눌려 내려앉는다.',
      specs: ['모서리: 직각(radius 0)', '보더: 3px 솔리드', '그림자: blur 0 하드 오프셋', 'active: 그림자 폭만큼 translate(눌림)', 'focus-visible: 옐로 outline', '폰트: 픽셀 디스플레이'],
    },
    Card: {
      description: '픽셀 보더 + 격자 배경 + blur 0 그림자의 직각 타일. hover에서 좌상으로 떠오른다.',
      specs: ['모서리: 직각(radius 0)', '보더: 픽셀 3px', '배경: 그리드 격자', '그림자: blur 0 도트', 'hover: translate(-2px,-2px) lift', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: '직각 8비트 라벨 칩(픽셀폰트). accent=코발트 subtle, muted=중립, solid=그린.',
      specs: ['모서리: 직각(radius 0)', '보더: 2px 솔리드', '폰트: 픽셀 + uppercase', 'letter-spacing 0.04em', '색: cobalt-subtle / neutral / green'],
    },
  },
  example: Showcase,
};

export const pixelArtRetroWrappers = wrapperComponents;
export const PixelArtRetroShowcase = Showcase;

export const pixelArtRetroStyleGuide: StyleGuide = {
  name: 'pixel-art-retro-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (코발트 CRT)', foundations, extendedFoundations },
    { key: 'arcade-paper', label: '아케이드 페이퍼 (라이트)', foundations: arcadePaperFoundations, extendedFoundations: arcadePaperExt },
    { key: 'synthwave', label: '신스웨이브 (마젠타)', foundations: synthwaveFoundations, extendedFoundations: synthwaveExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { PixelArtRetroShowcase: Showcase },
  guidelines,
  visualMotif,
};
