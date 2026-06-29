import type { StyleGuide, VisualMotif } from '../StyleGuide';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Minimal_Saas_01 — 중립 그레이 + 단일 액센트, 넉넉한 여백, 얇은 보더.
 *
 * 흰 배경, 미세한 1px 보더와 약한 그림자, 인디고 액센트는 1차 액션·링크에만.
 * 콘텐츠 우선·여백 위주의 현대 B2B 기본값.
 */

const PRIMARY = '#4F46E5';

const foundations = makeFoundations({
  name: 'minimal-saas-01',
  description: '중립 그레이 + 단일 인디고 액센트, 얇은 보더·약한 그림자, 넉넉한 여백',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(16,24,40,0.05)',
    md: '0 1px 3px rgba(16,24,40,0.10), 0 1px 2px rgba(16,24,40,0.06)',
    lg: '0 4px 6px -1px rgba(16,24,40,0.10), 0 2px 4px -1px rgba(16,24,40,0.06)',
    xl: '0 10px 15px -3px rgba(16,24,40,0.10), 0 4px 6px -2px rgba(16,24,40,0.05)',
  },
  typeScale: {
    display: { fontSize: '60px', lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: 700 },
    h1: { fontSize: '36px', lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: '#FFFFFF',
    bgElevated: '#FFFFFF',
    bgSunken: '#F9FAFB',
    overlay: 'rgba(17,24,39,0.50)',
    fg: '#111827',
    fgMuted: '#4B5563',
    fgSubtle: '#9CA3AF',
    fgInverse: '#FFFFFF',
    border: '#E5E7EB',
    borderMuted: '#F3F4F6',
    borderStrong: '#D1D5DB',
    focus: '#4F46E5',
    primaryBase: PRIMARY,
    primaryHover: '#4338CA',
    primaryActive: '#3730A3',
    primarySubtle: '#EEF2FF',
    primaryFg: '#FFFFFF',
    accent: PRIMARY,
    accent2: '#0EA5E9',
    accent3: '#10B981',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-ring': 'rgba(79,70,229,0.40)',
  '--bbangto-ext-divider': '#E5E7EB',
};

const STYLE_ID = 'bbangto-minimal-saas-motif';
const CSS = `
.bbangto-saas-btn {
  border-radius: var(--bbangto-radius-md, 8px) !important;
  box-shadow: var(--bbangto-shadow-sm) !important;
  font-weight: 600 !important;
  transition: filter 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-saas-btn:hover { filter: brightness(0.97); box-shadow: var(--bbangto-shadow-md) !important; }
.bbangto-saas-btn:active { filter: brightness(0.93); }
.bbangto-saas-btn:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px var(--bbangto-ext-ring, rgba(79,70,229,0.40)) !important;
}
.bbangto-saas-card {
  border: 1px solid var(--bbangto-semantic-border-base, #E5E7EB) !important;
  border-radius: var(--bbangto-radius-lg, 12px) !important;
  box-shadow: var(--bbangto-shadow-sm) !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-saas-btn { transition: none !important; }
  .bbangto-saas-btn:hover, .bbangto-saas-btn:active { filter: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-saas-btn',
  cardClass: 'bbangto-saas-card',
  displayPrefix: 'Saas',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px',
      borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1.6, whiteSpace: 'nowrap',
      border: '1px solid transparent',
    },
    tones: {
      accent: { background: '#EEF2FF', color: '#3730A3', border: '1px solid #C7D2FE' },
      muted: { background: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' },
      solid: { background: PRIMARY, color: '#fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'PRODUCT',
  title: '군더더기 없는 제품 UI',
  tagline: '콘텐츠가 먼저, 색은 의미에만',
  body: '중립 그레이 위에 단 하나의 액센트를 1차 액션과 링크에만 쓴다. 얇은 보더와 약한 그림자로 정보 밀도와 가독성의 균형을 잡는다.',
  ctaPrimary: '무료로 시작',
  ctaSecondary: '데모 보기',
  bandTitle: '팀이 매일 쓰는 제품, 조용하지만 분명하게.',
  items: [
    { name: 'Neutral', tone: 'muted', tag: 'GRAY', desc: '그레이 스케일로 표면·텍스트 위계를 만든다.' },
    { name: 'Accent', tone: 'accent', tag: 'INDIGO', desc: '액센트는 1차 액션과 링크에만 절제해 쓴다.' },
    { name: 'Space', tone: 'solid', tag: 'WHITE', desc: '넉넉한 여백으로 가독성과 집중을 확보한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'MinimalSaasShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  color: {
    title: '색 사용',
    dos: ['액센트는 1차 액션·링크·선택 상태에만 쓴다.', '표면·텍스트 위계는 그레이 스케일로 만든다.'],
    donts: ['액센트를 넓은 면적 배경에 쓰지 않는다.', '여러 강조색을 동시에 쓰지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: ['본문 대비 4.5:1 이상.', 'focus-visible는 3px ring으로 분명히 표시한다.', '링크는 색만이 아니라 밑줄/문맥으로도 구분한다.'],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치·코드 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Minimal_Saas_01: 흰 배경 + 중립 그레이 + 단일 인디고 액센트, 얇은 1px 보더와 약한 그림자, 넉넉한 여백의 제품 UI.',
  components: {
    Button: {
      description: '저장식 솔리드/아웃라인 버튼. hover에서 살짝 어두워지고 그림자가 한 단계 오른다.',
      specs: ['모서리: radius md(8px)', '그림자: sm', 'hover: brightness + 그림자 md', 'focus-visible: 3px 인디고 ring', '액센트는 1차 액션에만'],
    },
    Card: {
      description: '얇은 1px 보더 + 약한 그림자의 깔끔한 표면.',
      specs: ['보더: 1px 그레이', '그림자: sm', '모서리: radius lg(12px)', '배경: 흰색'],
    },
    Tag: {
      description: '작은 라벨 배지. tone별 subtle 배경 + 1px 보더.',
      specs: ['배경: EEF2FF(accent) / F3F4F6(muted) / primary(solid)', '모서리: radius sm(6px)', '폰트: JetBrains Mono'],
    },
  },
  example: Showcase,
};

export const MinimalSaasShowcase = Showcase;
export const minimalSaasWrappers = wrapperComponents;

export const minimalSaasStyleGuide: StyleGuide = {
  name: 'minimal-saas-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { MinimalSaasShowcase: Showcase },
  guidelines,
  visualMotif,
};
