import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Skeuomorphism_Tactile_01 — 실물 질감(가죽/노트) 스큐어모피즘.
 *
 * 따뜻한 베이지 가죽/노트 배경 위에 베벨 하이라이트와 안쪽 그림자로 물리적
 * 깊이를 만든다. 버튼은 눌리는 물리 버튼, 카드는 가죽·노트 표면. 라이트
 * 베이스라 텍스트·포커스 대비를 별도로 확보한다.
 */

const PRIMARY = '#8A5A2B';
const INK = '#3A2E20';

const foundations = makeFoundations({
  name: 'skeuomorphism-tactile-01',
  description: '따뜻한 베이지 가죽·노트 질감 + 베벨·그라디언트로 빚은 물리적 스큐어모피즘(라이트 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '10px', lg: '16px', xl: '22px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(58,46,32,0.20)',
    md: '0 4px 10px rgba(58,46,32,0.24)',
    lg: '0 10px 24px rgba(58,46,32,0.30)',
    xl: '0 18px 44px rgba(58,46,32,0.36)',
  },
  semantic: makeSemantic({
    bg: 'linear-gradient(180deg, #DCCBA8 0%, #C9B89A 100%)',
    bgElevated: '#E8DCC2',
    bgSunken: '#BBA785',
    overlay: 'rgba(40,30,18,0.55)',
    fg: INK,
    fgMuted: '#5C4A33',
    fgSubtle: '#7A6647',
    fgInverse: '#FBF4E6',
    border: '#A48A60',
    borderMuted: 'rgba(58,46,32,0.22)',
    borderStrong: '#6E5635',
    focus: '#2F6FB0',
    primaryBase: PRIMARY,
    primaryHover: '#7A4E24',
    primaryActive: '#67411D',
    primarySubtle: 'rgba(138,90,43,0.16)',
    primaryFg: '#FBF4E6',
    accent: '#A8762F',
    accent2: '#6E8B4F',
    accent3: '#A85A3C',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-bevel': 'inset 0 1px 0 rgba(255,250,235,0.70), inset 0 -2px 3px rgba(58,46,32,0.30)',
  '--bbangto-ext-texture': 'repeating-linear-gradient(135deg, rgba(58,46,32,0.05) 0px, rgba(58,46,32,0.05) 1px, transparent 1px, transparent 4px)',
  '--bbangto-ext-inner-glow': 'inset 0 0 18px rgba(255,248,232,0.35)',
  '--bbangto-ext-leather': 'radial-gradient(circle at 30% 20%, #D6C4A2 0%, #C2AE8B 70%)',
  '--bbangto-ext-stitch': 'rgba(110,86,53,0.55)',
};

/* 색 스킴 변형(tweak) — 베벨·스티치·질감 모티프는 base에서 상속, 색만 교체. */

/* 다크 에스프레소 가죽 — 짙게 태닝된 가죽 위 캐러멜 하이라이트. */
const darkFoundations = makeColorway(foundations, {
  name: 'skeuomorphism-tactile-01-dark',
  description: '짙은 에스프레소 가죽 표면 + 캐러멜 하이라이트로 빚은 다크 스큐어모피즘',
  semantic: makeSemantic({
    bg: '#241C15', bgElevated: '#332820', bgSunken: '#1A140E', overlay: 'rgba(10,6,2,0.60)',
    fg: '#F4ECDA', fgMuted: '#CBB894', fgSubtle: '#9C8A68', fgInverse: '#241C15',
    border: '#5A4630', borderMuted: 'rgba(244,236,218,0.14)', borderStrong: '#836644', focus: '#5FA8E0',
    primaryBase: '#C79055', primaryHover: '#D6A268', primaryActive: '#B37E44',
    primarySubtle: 'rgba(199,144,85,0.22)', primaryFg: '#241C15',
    accent: '#D2A15E', accent2: '#9DB878', accent3: '#D07E5E',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-bevel': 'inset 0 1px 0 rgba(255,240,210,0.18), inset 0 -2px 3px rgba(0,0,0,0.45)',
  '--bbangto-ext-texture': 'repeating-linear-gradient(135deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 4px)',
  '--bbangto-ext-inner-glow': 'inset 0 0 18px rgba(60,44,26,0.45)',
  '--bbangto-ext-leather': 'radial-gradient(circle at 30% 20%, #3A2C1E 0%, #241C15 70%)',
  '--bbangto-ext-stitch': 'rgba(199,144,85,0.55)',
};

/* 그린 라이브러리 가죽 — 세이지 베이지 표면 위 포레스트 그린 강조(accent 전환). */
const greenFoundations = makeColorway(foundations, {
  name: 'skeuomorphism-tactile-01-green',
  description: '세이지 베이지 가죽 위 포레스트 그린 강조 + 골드 스티치의 라이트 변형',
  semantic: makeSemantic({
    bg: 'linear-gradient(180deg, #D6D3B0 0%, #C3C298 100%)', bgElevated: '#E8E7C8', bgSunken: '#B0AF85', overlay: 'rgba(28,32,16,0.55)',
    fg: '#2C3320', fgMuted: '#4C5636', fgSubtle: '#6B7550', fgInverse: '#F4F4E4',
    border: '#93A06A', borderMuted: 'rgba(44,51,32,0.22)', borderStrong: '#5C6B38', focus: '#B4762B',
    primaryBase: '#4E7A44', primaryHover: '#436B3A', primaryActive: '#385C31',
    primarySubtle: 'rgba(78,122,68,0.16)', primaryFg: '#F4F4E4',
    accent: '#5C8A4E', accent2: '#8A7A47', accent3: '#A85A3C',
  }),
});
const greenExt: Record<string, string> = {
  '--bbangto-ext-bevel': 'inset 0 1px 0 rgba(255,250,235,0.70), inset 0 -2px 3px rgba(30,40,22,0.30)',
  '--bbangto-ext-texture': 'repeating-linear-gradient(135deg, rgba(30,40,22,0.05) 0px, rgba(30,40,22,0.05) 1px, transparent 1px, transparent 4px)',
  '--bbangto-ext-inner-glow': 'inset 0 0 18px rgba(240,246,225,0.35)',
  '--bbangto-ext-leather': 'radial-gradient(circle at 30% 20%, #C9CFA6 0%, #B2BC8B 70%)',
  '--bbangto-ext-stitch': 'rgba(78,90,53,0.55)',
};

const STYLE_ID = 'bbangto-skeuomorphism-tactile-01-motif';
const CSS = `
.bbangto-ske-btn {
  background: linear-gradient(180deg, #9A6A38 0%, #8A5A2B 55%, #744A22 100%) !important;
  color: #FBF4E6 !important;
  border: 1px solid #5E3C1B !important;
  border-radius: var(--bbangto-radius-md, 10px) !important;
  box-shadow: var(--bbangto-ext-bevel, inset 0 1px 0 rgba(255,250,235,0.70), inset 0 -2px 3px rgba(58,46,32,0.30)), 0 4px 10px rgba(58,46,32,0.30) !important;
  text-shadow: 0 -1px 0 rgba(58,46,32,0.45);
  transition: transform 120ms ease, box-shadow 120ms ease !important;
}
.bbangto-ske-btn:hover { filter: brightness(1.05); }
.bbangto-ske-btn:active {
  transform: translateY(1px);
  box-shadow: inset 0 2px 5px rgba(58,46,32,0.55), 0 1px 2px rgba(58,46,32,0.25) !important;
}
.bbangto-ske-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #2F6FB0) !important; outline-offset: 2px; }
.bbangto-ske-card {
  background: var(--bbangto-ext-leather, radial-gradient(circle at 30% 20%, #D6C4A2 0%, #C2AE8B 70%)) !important;
  border: 1px solid #A48A60 !important;
  border-radius: var(--bbangto-radius-lg, 16px) !important;
  box-shadow: var(--bbangto-ext-inner-glow, inset 0 0 18px rgba(255,248,232,0.35)), inset 0 1px 0 rgba(255,250,235,0.55), 0 10px 24px rgba(58,46,32,0.28) !important;
  position: relative;
}
.bbangto-ske-card::after {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px dashed var(--bbangto-ext-stitch, rgba(110,86,53,0.55));
  border-radius: calc(var(--bbangto-radius-lg, 16px) - 6px);
  background: var(--bbangto-ext-texture, none);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-ske-btn { transition: none !important; }
  .bbangto-ske-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-ske-btn',
  cardClass: 'bbangto-ske-card',
  displayPrefix: 'Skeuo',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 11px',
      borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      boxShadow: 'inset 0 1px 0 rgba(255,250,235,0.55), inset 0 -1px 2px rgba(58,46,32,0.25)',
      textShadow: '0 1px 0 rgba(255,250,235,0.40)',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'linear-gradient(180deg, var(--bbangto-semantic-primary-subtle, #C79A52), var(--bbangto-semantic-primary-base, #A8762F))',
        color: 'var(--bbangto-semantic-primary-active, #3A2E20)',
        border: '1px solid var(--bbangto-semantic-primary-base, #8A5A2B)',
      },
      muted: {
        background: 'linear-gradient(180deg, var(--bbangto-semantic-background-elevated, #E2D4B6), var(--bbangto-semantic-background-sunken, #CDBC98))',
        color: 'var(--bbangto-semantic-foreground-muted, #5C4A33)',
        border: '1px solid var(--bbangto-semantic-border-base, #A48A60)',
      },
      solid: {
        background: 'linear-gradient(180deg, var(--bbangto-semantic-primary-base, #6E8B4F), var(--bbangto-semantic-primary-active, #566E3E))',
        color: 'var(--bbangto-semantic-primary-foreground, #FBF4E6)',
        border: '1px solid var(--bbangto-semantic-primary-active, #3F5230)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'TACTILE LEATHER',
  title: '손끝에 닿는 질감의 UI',
  tagline: '눌리고 도드라지는 물리감',
  body: '따뜻한 가죽·노트 표면 위로 베벨 하이라이트와 안쪽 그림자를 쌓아 진짜 물건 같은 깊이를 만든다. 모든 표면은 만질 수 있을 듯한 질감을 시그니처로 가진다.',
  ctaPrimary: '눌러보기',
  ctaSecondary: '안내 보기',
  bandTitle: '실물처럼 도드라지는 인터페이스, 지금 만져보세요.',
  items: [
    { name: 'Bevel', tone: 'accent', tag: 'DEPTH', desc: '하이라이트와 안쪽 그림자로 물리적 입체를 만든다.' },
    { name: 'Texture', tone: 'muted', tag: 'GRAIN', desc: '가죽·노트 결을 미세 패턴으로 표면에 입힌다.' },
    { name: 'Press', tone: 'solid', tag: 'TOUCH', desc: '누르면 실제로 들어가는 물리 버튼 피드백.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'SkeuoShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 질감',
    dos: ['표면은 베벨 하이라이트 + 안쪽 그림자로 물리적 깊이를 준다.', '가죽·노트 결 질감은 미세 패턴으로 은은하게 깐다.'],
    donts: ['과도한 사실주의로 무게감·로딩 비용을 키우지 않는다.', '모든 요소에 질감을 남발해 일관성·유지비를 해치지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '라이트 베이스 위 본문은 잉크색(#3A2E20)으로 충분한 대비를 확보한다.',
      '포커스는 질감과 무관하게 또렷한 블루 outline으로 분리해 표시한다.',
      'prefers-reduced-motion에서 누름(press) transform을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Skeuomorphism_Tactile_01: 따뜻한 가죽·노트 베이지 표면 위 베벨 하이라이트와 안쪽 그림자로 빚은 물리적 깊이, 누르면 들어가는 버튼, 미세 질감 카드.',
  components: {
    Button: {
      description: '물리 버튼. 위쪽 하이라이트와 아래쪽 섀도로 도드라지며, 누르면 실제로 들어간다.',
      specs: ['배경: 갈색 세로 그라디언트', '베벨: 안쪽 상단 하이라이트 + 하단 섀도', '모서리: radius md(10px)', 'active: 1px 내려가며 inset 그림자', 'focus-visible: 블루 outline'],
    },
    Card: {
      description: '가죽·노트 표면 카드. 안쪽 글로우와 점선 스티치로 실제 제본된 노트 인상을 만든다.',
      specs: ['배경: 가죽 radial 그라디언트', '질감: 미세 결 패턴 오버레이', '모서리: radius lg(16px)', '디테일: 점선 스티치 테두리 + inset 글로우'],
    },
    Tag: {
      description: '도드라진 라벨 칩. 베벨 하이라이트로 작은 물리 배지처럼 보인다.',
      specs: ['배경: tone별 세로 그라디언트(accent 황토 / muted 베이지 / solid 올리브)', '모서리: 6px', '폰트: JetBrains Mono', '베벨: inset 하이라이트 + 섀도'],
    },
  },
  example: Showcase,
};

export const SkeuoShowcase = Showcase;
export const skeuomorphismTactileWrappers = wrapperComponents;

export const skeuomorphismTactileStyleGuide: StyleGuide = {
  name: 'skeuomorphism-tactile-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (Tactile Leather)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (Espresso Leather)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'green', label: '그린 라이브러리 (Sage Accent)', foundations: greenFoundations, extendedFoundations: greenExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { SkeuoShowcase: Showcase },
  guidelines,
  visualMotif,
};
