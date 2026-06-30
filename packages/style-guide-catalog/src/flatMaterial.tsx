import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Flat_Material_01 — Material You 톤 + elevation 그림자 + 상태 레이어.
 *
 * 키컬러(보라) 파생 톤 시스템, 부드러운 elevation 그림자(0~5단계), 둥근 pill 버튼.
 * 평면을 유지하되 절제된 그림자로 위계를 만든다.
 */

const PRIMARY = '#6750A4';

const foundations = makeFoundations({
  name: 'flat-material-01',
  description: 'Material You 톤 + elevation 그림자 + 상태 레이어, 둥근 pill 액션',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '12px', lg: '16px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)',
    md: '0 1px 2px rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15)',
    lg: '0 2px 3px rgba(0,0,0,0.30), 0 6px 10px 4px rgba(0,0,0,0.15)',
    xl: '0 4px 4px rgba(0,0,0,0.30), 0 8px 12px 6px rgba(0,0,0,0.15)',
  },
  semantic: makeSemantic({
    bg: '#FEF7FF',
    bgElevated: '#FFFFFF',
    bgSunken: '#F3EDF7',
    overlay: 'rgba(0,0,0,0.40)',
    fg: '#1D1B20',
    fgMuted: '#49454F',
    fgSubtle: '#79747E',
    fgInverse: '#F5EFF7',
    border: '#CAC4D0',
    borderMuted: '#E7E0EC',
    borderStrong: '#79747E',
    focus: '#6750A4',
    primaryBase: PRIMARY,
    primaryHover: '#5A4593',
    primaryActive: '#4F3D82',
    primarySubtle: '#EADDFF',
    primaryFg: '#FFFFFF',
    accent: PRIMARY,
    accent2: '#7D5260',
    accent3: '#386A20',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-state-layer': 'rgba(103,80,164,0.08)',
  '--bbangto-ext-state-layer-strong': 'rgba(103,80,164,0.12)',
  '--bbangto-ext-elevation-1': '0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)',
  '--bbangto-ext-elevation-2': '0 1px 2px rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15)',
};

const STYLE_ID = 'bbangto-flat-material-motif';
const CSS = `
.bbangto-mat-btn {
  border-radius: var(--bbangto-radius-full, 9999px) !important;
  box-shadow: var(--bbangto-shadow-sm) !important;
  font-weight: 600 !important;
  transition: box-shadow 180ms cubic-bezier(0.2,0,0,1), filter 180ms ease !important;
}
.bbangto-mat-btn:hover { box-shadow: var(--bbangto-shadow-md) !important; filter: brightness(0.97); }
.bbangto-mat-btn:active { box-shadow: var(--bbangto-shadow-sm) !important; filter: brightness(0.94); }
.bbangto-mat-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #6750A4) !important; outline-offset: 2px; }
.bbangto-mat-card {
  border: none !important;
  border-radius: var(--bbangto-radius-lg, 16px) !important;
  box-shadow: var(--bbangto-shadow-md) !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-mat-btn { transition: none !important; }
  .bbangto-mat-btn:hover, .bbangto-mat-btn:active { filter: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-mat-btn',
  cardClass: 'bbangto-mat-card',
  displayPrefix: 'Mat',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1.6, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: '#EADDFF', color: '#21005D' },
      muted: { background: '#E7E0EC', color: '#49454F' },
      solid: { background: PRIMARY, color: '#fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'MATERIAL YOU',
  title: '톤과 elevation의 질서',
  tagline: '평면 위 절제된 그림자',
  body: '키컬러에서 파생한 톤 시스템과 0~5단계 elevation으로 위계를 만든다. 상태 레이어가 인터랙션의 언어다.',
  ctaPrimary: '시작',
  ctaSecondary: '컴포넌트',
  bandTitle: '키컬러 하나로 빚어낸 일관된 디자인 시스템.',
  items: [
    { name: 'Tonal', tone: 'accent', tag: 'COLOR', desc: '키컬러 파생 톤으로 표면·강조를 일관되게 묶는다.' },
    { name: 'Elevation', tone: 'muted', tag: 'DEPTH', desc: '부드러운 그림자 단계로 평면 위 위계를 만든다.' },
    { name: 'State', tone: 'solid', tag: 'LAYER', desc: '상태 레이어로 hover/press를 표현한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'FlatMaterialShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & elevation',
    dos: ['그림자는 elevation 단계(0~5)로만 표현한다.', '액션 버튼은 둥근 pill(full radius)을 유지한다.'],
    donts: ['임의의 하드 그림자를 쓰지 않는다.', '키컬러 외 색을 무분별하게 추가하지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: ['터치 타깃 최소 48px를 권장한다.', '색 대비는 본문 4.5:1 이상.', 'focus-visible outline을 분명히 표시한다.'],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Flat_Material_01: Material You 키컬러 톤 시스템 + 부드러운 elevation 그림자, 둥근 pill 액션, 상태 레이어 인터랙션.',
  components: {
    Button: {
      description: '둥근 pill 버튼. hover에서 그림자가 한 단계 올라가고 상태 레이어로 눌림을 표현한다.',
      specs: ['모서리: full radius(pill)', '그림자: elevation-1', 'hover: elevation-2 + brightness', 'active: brightness 감소', 'focus-visible: 키컬러 outline'],
    },
    Card: {
      description: '보더 없이 elevation-2 그림자로 떠 있는 표면.',
      specs: ['보더: 없음', '그림자: elevation-2', '모서리: radius lg(16px)', '배경: elevated 표면'],
    },
    Tag: {
      description: 'M3 칩 스타일 배지. tone별 톤 컬러(accent/muted/solid).',
      specs: ['배경: EADDFF(accent) / E7E0EC(muted) / primary(solid)', '모서리: radius sm(8px)', '폰트: JetBrains Mono'],
    },
  },
  example: Showcase,
};

export const FlatMaterialShowcase = Showcase;
export const flatMaterialWrappers = wrapperComponents;

export const flatMaterialStyleGuide: StyleGuide = {
  name: 'flat-material-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { FlatMaterialShowcase: Showcase },
  guidelines,
  visualMotif,
};
