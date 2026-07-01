import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Op_Art_Kinetic_01 — 옵아트 키네틱 미학.
 *
 * 고대비 2색 베이스(흑/백) + 채도 높은 코발트 액센트 1색, 압축 그로테스크 헤비 산세리프,
 * 직각 기조(radius none~sm), 그림자 거의 없음(평면). 시그니처는 평행선/줄무늬의 반복과
 * 위상 드리프트가 만드는 옵티컬 운동감이며, Card는 줄무늬 밴드를 두른 옵아트 패널,
 * 콘텐츠는 솔리드 면 위에 올려 가독을 확보한다.
 */

const OP_FG = '#0B0B0B';
const OP_BG = '#FFFFFF';
const COBALT = '#1B3FD9';

const foundations = makeFoundations({
  name: 'op-art-kinetic-01',
  description: '옵아트 키네틱 — 고대비 흑백 + 코발트 액센트, 압축 그로테스크 헤비 산세리프, 직각 기조, 줄무늬 위상 드리프트의 옵티컬 운동감',
  fontSans: "'Archivo', 'Anton', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 0 rgba(11,11,11,0.12)',
    md: '0 2px 0 rgba(11,11,11,0.14)',
    lg: '0 3px 0 rgba(11,11,11,0.16)',
    xl: '0 4px 0 rgba(11,11,11,0.18)',
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '0.96', letterSpacing: '-0.03em', fontWeight: 800 },
    h1: { fontSize: '44px', lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: 800 },
    h2: { fontSize: '30px', lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: 800 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: OP_BG,
    bgElevated: OP_BG,
    bgSunken: '#F2F2F2',
    overlay: 'rgba(11,11,11,0.60)',
    fg: OP_FG,
    fgMuted: '#3A3A3A',
    fgSubtle: '#6B6B6B',
    fgInverse: '#FFFFFF',
    border: OP_FG,
    borderMuted: '#D9D9D9',
    borderStrong: '#000000',
    focus: COBALT,
    primaryBase: OP_FG,
    primaryHover: COBALT,
    primaryActive: '#000000',
    primarySubtle: '#EAEEFF',
    primaryFg: '#FFFFFF',
    accent: COBALT,
    accent2: '#E0142B',
    accent3: '#E0A800',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-stripe-width': '4px',
  '--bbangto-ext-stripe-gap': '4px',
  '--bbangto-ext-stripe-angle': '90deg',
  '--bbangto-ext-op-pattern': `repeating-linear-gradient(90deg, ${OP_FG} 0 4px, transparent 4px 8px)`,
  '--bbangto-ext-moire-shift': '8px',
  '--bbangto-ext-warp': '0',
  '--bbangto-ext-op-fg': OP_FG,
  '--bbangto-ext-op-bg': OP_BG,
  '--bbangto-ext-op-radius': '2px',
};

/* 색 스킴 변형(colorway) — 줄무늬·위상 드리프트 모티프는 base에서 상속, 색만 교체. */

// 반전 다크 — 흑판 위 백색 줄무늬, 밝아진 코발트 액센트.
const DARK_FG = '#F5F5F5';
const DARK_BG = '#0B0B0B';
const DARK_COBALT = '#5C7BFF';
const darkFoundations = makeColorway(foundations, {
  name: 'op-art-kinetic-01-dark',
  description: '옵아트 키네틱 다크 — 흑판 위 백색 줄무늬 + 밝아진 코발트 액센트',
  semantic: makeSemantic({
    bg: DARK_BG, bgElevated: '#141414', bgSunken: '#050505', overlay: 'rgba(0,0,0,0.72)',
    fg: DARK_FG, fgMuted: '#C9C9C9', fgSubtle: '#8F8F8F', fgInverse: DARK_BG,
    border: DARK_FG, borderMuted: '#333333', borderStrong: '#FFFFFF', focus: DARK_COBALT,
    primaryBase: DARK_FG, primaryHover: DARK_COBALT, primaryActive: '#FFFFFF',
    primarySubtle: '#1A2440', primaryFg: DARK_BG,
    accent: DARK_COBALT, accent2: '#FF4D5E', accent3: '#FFC94D',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-stripe-width': '4px',
  '--bbangto-ext-stripe-gap': '4px',
  '--bbangto-ext-stripe-angle': '90deg',
  '--bbangto-ext-op-pattern': `repeating-linear-gradient(90deg, ${DARK_FG} 0 4px, transparent 4px 8px)`,
  '--bbangto-ext-moire-shift': '8px',
  '--bbangto-ext-warp': '0',
  '--bbangto-ext-op-fg': DARK_FG,
  '--bbangto-ext-op-bg': DARK_BG,
  '--bbangto-ext-op-radius': '2px',
};

// 스칼렛 액센트 전환 — 라이트 기조 유지, 코발트를 강렬한 스칼렛으로 교체.
const SCARLET = '#E0142B';
const scarletFoundations = makeColorway(foundations, {
  name: 'op-art-kinetic-01-scarlet',
  description: '옵아트 키네틱 스칼렛 — 라이트 기조 + 코발트 대신 강렬한 스칼렛 액센트/줄무늬',
  semantic: makeSemantic({
    bg: OP_BG, bgElevated: OP_BG, bgSunken: '#FBF1F1', overlay: 'rgba(11,11,11,0.60)',
    fg: OP_FG, fgMuted: '#3A3A3A', fgSubtle: '#6B6B6B', fgInverse: '#FFFFFF',
    border: OP_FG, borderMuted: '#E4CFCF', borderStrong: '#000000', focus: SCARLET,
    primaryBase: SCARLET, primaryHover: '#B10D20', primaryActive: '#8C0A19',
    primarySubtle: '#FFE1E5', primaryFg: '#FFFFFF',
    accent: SCARLET, accent2: '#1B3FD9', accent3: '#E0A800',
  }),
});
const scarletExt: Record<string, string> = {
  '--bbangto-ext-stripe-width': '4px',
  '--bbangto-ext-stripe-gap': '4px',
  '--bbangto-ext-stripe-angle': '90deg',
  '--bbangto-ext-op-pattern': `repeating-linear-gradient(90deg, ${SCARLET} 0 4px, transparent 4px 8px)`,
  '--bbangto-ext-moire-shift': '8px',
  '--bbangto-ext-warp': '0',
  '--bbangto-ext-op-fg': SCARLET,
  '--bbangto-ext-op-bg': OP_BG,
  '--bbangto-ext-op-radius': '2px',
};

const STYLE_ID = 'bbangto-op-art-kinetic-motif';
const CSS = `
.bbangto-op-art-kinetic-card {
  border-radius: var(--bbangto-ext-op-radius, 2px) !important;
  border: 2px solid var(--bbangto-ext-op-fg, ${OP_FG}) !important;
  box-shadow: none !important;
  background:
    repeating-linear-gradient(
      var(--bbangto-ext-stripe-angle, 90deg),
      var(--bbangto-ext-op-fg, ${OP_FG}) 0 var(--bbangto-ext-stripe-width, 4px),
      transparent var(--bbangto-ext-stripe-width, 4px) calc(var(--bbangto-ext-stripe-width, 4px) + var(--bbangto-ext-stripe-gap, 4px))
    ) top left / 100% 12px no-repeat,
    var(--bbangto-ext-op-bg, ${OP_BG}) !important;
  transition: background-position 600ms linear !important;
}
.bbangto-op-art-kinetic-card:hover {
  background-position: var(--bbangto-ext-moire-shift, 8px) 0, 0 0 !important;
}
.bbangto-op-art-kinetic-btn {
  border-radius: 2px !important;
  background: var(--bbangto-semantic-primary-base, ${OP_FG}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 800 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  box-shadow: none !important;
  transition: background 240ms linear, transform 120ms ease !important;
}
.bbangto-op-art-kinetic-btn:hover {
  background:
    repeating-linear-gradient(45deg,
      var(--bbangto-semantic-primary-base, ${OP_FG}) 0 6px,
      var(--bbangto-semantic-primary-hover, ${COBALT}) 6px 12px
    ) !important;
  color: #FFFFFF !important;
}
.bbangto-op-art-kinetic-btn:active { transform: translateY(1px) !important; }
.bbangto-op-art-kinetic-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-focus, ${COBALT}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-op-art-kinetic-card { transition: none !important; }
  .bbangto-op-art-kinetic-card:hover { background-position: 0 0, 0 0 !important; transform: none !important; }
  .bbangto-op-art-kinetic-btn { transition: none !important; }
  .bbangto-op-art-kinetic-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-op-art-kinetic-btn',
  cardClass: 'bbangto-op-art-kinetic-card',
  displayPrefix: 'OpArtKinetic',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 2, fontFamily: "'Archivo', system-ui, sans-serif", fontSize: 11,
      fontWeight: 800, letterSpacing: '0.1em', lineHeight: 1.4, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: `var(--bbangto-semantic-border-focus, ${COBALT})`,
        color: 'var(--bbangto-semantic-primary-foreground, #FFFFFF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #EDEDED)',
        color: `var(--bbangto-semantic-foreground-base, ${OP_FG})`,
      },
      solid: {
        background: `var(--bbangto-semantic-primary-base, ${OP_FG})`,
        color: 'var(--bbangto-semantic-primary-foreground, #FFFFFF)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'OP ART 01',
  title: '진동하는 평행선의 착시',
  tagline: '정적인 픽셀이 움직이는 듯한 옵티컬 리듬',
  body: '동심원과 평행선의 반복, 그 미세한 위상 변조가 화면을 진동시킨다. 줄무늬는 장식 레이어로만 두고, 텍스트는 솔리드 면 위에 분리해 또렷한 대비를 유지한다.',
  ctaPrimary: '패턴 켜기',
  ctaSecondary: '대비 보기',
  bandTitle: '반복과 위상, 화면을 흔드는 옵아트의 리듬.',
  items: [
    { name: '스트라이프 패널', tone: 'accent', tag: 'STRIPE', desc: '평행선 밴드를 두른 옵아트 카드. 콘텐츠는 솔리드 면 위에 분리한다.' },
    { name: '모아레 그리드', tone: 'muted', tag: 'MOIRE', desc: '셀마다 각도를 바꾼 줄무늬가 만드는 시각적 간섭 패턴.' },
    { name: '토글 액션', tone: 'solid', tag: 'KINETIC', desc: '평소 솔리드, hover에서 줄무늬 fill로 전환되는 버튼.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'OpArtKineticShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '옵아트 레이아웃 & 패턴',
    dos: [
      '줄무늬·동심원 패턴은 장식 레이어로만 쓰고, 화면당 옵아트 영역을 1–2곳으로 제한한다.',
      '콘텐츠(텍스트/아이콘)는 반드시 솔리드 inset 면 위에 올려 가독을 확보한다.',
      '셀마다 stripe-angle·라인 밀도를 변주해 갤러리형 옵티컬 그리드를 구성한다.',
    ],
    donts: [
      '본문·폼·표 같은 고밀도 정보면에 줄무늬를 깔지 않는다.',
      '빠른 애니메이션·고주파 깜빡임을 쓰지 않는다(미세하고 느린 위상 드리프트만).',
      '텍스트를 줄무늬 위에 직접 올려 대비를 무너뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 고주파 평행선/모아레는 시각 피로·편두통·발작을 유발할 수 있다 — prefers-reduced-motion에서 위상 애니메이션을 정지하고 패턴 대비를 완화한다.',
      '⚠ 줄무늬 위 텍스트는 WCAG 대비 미달 위험이 크다 — 텍스트는 단색 면 위에만 배치하고 본문 4.5:1 이상을 확보한다.',
      '포커스 링은 패턴과 구분되는 솔리드 코발트 컬러로 2px outline + offset을 둔다.',
      '버튼/액션 터치 타깃은 최소 44x44px를 확보한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '압축 그로테스크(Archivo/Anton/Druk류) 헤비 웨이트로 좁은 자간의 줄무늬 같은 리듬을 만들고, 라벨·수치는 Space Mono로 보강한다.',
    requiredFonts: ['Archivo', 'Anton', 'Pretendard', 'Space Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Op_Art_Kinetic_01: 고대비 흑백 + 코발트 액센트, 압축 그로테스크 헤비 산세리프, 직각 기조. 평행선·동심원의 반복과 위상 변조가 만드는 옵티컬 운동감이 시그니처.',
  components: {
    Button: {
      description: '직각(radius 2px) 솔리드 흑색 버튼. hover에서 흑/코발트 사선 줄무늬 fill로 전환되는 토글형.',
      specs: ['모서리: radius 2px(직각 기조)', '평소: 솔리드 black', 'hover: 45deg stripe fill(흑/코발트)', 'active: translateY(1px)', 'focus-visible: 코발트 solid outline'],
    },
    Card: {
      description: '상단에 평행선 밴드를 두른 옵아트 패널. 본문은 솔리드 면 위에 분리, hover에서 줄무늬가 느리게 위상 드리프트한다.',
      specs: ['모서리: radius 2px', '보더: 2px solid black', '그림자: none(평면)', '배경: 상단 repeating-linear-gradient 밴드 + 솔리드 본문', 'hover: background-position 위상 드리프트(600ms)', 'reduce-motion: 드리프트 정지'],
    },
    Tag: {
      description: '직각 사선 스트라이프 라벨. accent=코발트, muted=중립 그레이, solid=흑색.',
      specs: ['모서리: radius 2px', '텍스트: uppercase, letter-spacing 0.1em', '폰트: Archivo 800', '색: cobalt / neutral / black'],
    },
  },
  example: Showcase,
};

export const opArtKineticWrappers = wrapperComponents;
export const OpArtKineticShowcase = Showcase;

export const opArtKineticStyleGuide: StyleGuide = {
  name: 'op-art-kinetic-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (흑백 + 코발트)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (반전 흑판 + 코발트)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'scarlet', label: '스칼렛 액센트', foundations: scarletFoundations, extendedFoundations: scarletExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { OpArtKineticShowcase: Showcase },
  guidelines,
  visualMotif,
};
