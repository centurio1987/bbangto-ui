import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Maximalism_Dopamine_01 — 맥시멀리즘 / 도파민.
 *
 * 밝은 배경 위에 고채도 충돌색(마젠타·시안·옐로·바이올렛)을 충돌시키고,
 * 대형 가변 타이포·겹침 레이아웃·radius 혼합·강한 보더와 그림자로 과잉의
 * 에너지를 만든다. 라이트 베이스라 텍스트·포커스 대비를 별도로 확보한다.
 */

const MAGENTA = '#FF2E97';
const CYAN = '#00E5FF';
const YELLOW = '#FFE600';
const VIOLET = '#7A4DFF';
const INK = '#141018';

const foundations = makeFoundations({
  name: 'maximalism-dopamine-01',
  description: '고채도 충돌색 + 대형 가변 타이포 + 겹침 레이아웃 + 강한 보더·그림자(라이트 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '6px', md: '14px', lg: '26px', xl: '40px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '3px 3px 0 #141018',
    md: '6px 6px 0 #141018',
    lg: '10px 10px 0 #141018',
    xl: '14px 14px 0 #141018',
  },
  semantic: makeSemantic({
    bg: '#FFF8EC',
    bgElevated: '#FFFFFF',
    bgSunken: '#FCEFD6',
    overlay: 'rgba(20,16,24,0.55)',
    fg: INK,
    fgMuted: 'rgba(20,16,24,0.72)',
    fgSubtle: 'rgba(20,16,24,0.52)',
    fgInverse: '#FFFFFF',
    border: INK,
    borderMuted: 'rgba(20,16,24,0.28)',
    borderStrong: '#000000',
    focus: VIOLET,
    primaryBase: MAGENTA,
    primaryHover: '#E61F83',
    primaryActive: '#C81272',
    primarySubtle: 'rgba(255,46,151,0.16)',
    primaryFg: '#FFFFFF',
    accent: CYAN,
    accent2: VIOLET,
    accent3: YELLOW,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-overlap': '-28px',
  '--bbangto-ext-outline-text': '#141018',
  '--bbangto-ext-pattern':
    'repeating-linear-gradient(45deg, rgba(255,46,151,0.18) 0 10px, rgba(0,229,255,0.18) 10px 20px)',
  '--bbangto-ext-clash-cyan': CYAN,
  '--bbangto-ext-clash-yellow': YELLOW,
  '--bbangto-ext-clash-violet': VIOLET,
};

const STYLE_ID = 'bbangto-maximalism-dopamine-01-motif';
const CSS = `
.bbangto-max-btn {
  background: var(--bbangto-semantic-primary-base, ${MAGENTA}) !important;
  color: #fff !important;
  border: 3px solid var(--bbangto-ext-outline-text, ${INK}) !important;
  border-radius: var(--bbangto-radius-full, 9999px) !important;
  box-shadow: 6px 6px 0 var(--bbangto-ext-outline-text, ${INK}) !important;
  font-weight: 800 !important;
  letter-spacing: 0.01em !important;
  text-transform: uppercase;
  transition: transform 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-max-btn:hover { transform: translate(-2px,-2px); box-shadow: 9px 9px 0 var(--bbangto-ext-outline-text, ${INK}) !important; }
.bbangto-max-btn:active { transform: translate(3px,3px); box-shadow: 2px 2px 0 var(--bbangto-ext-outline-text, ${INK}) !important; }
.bbangto-max-btn:focus-visible { outline: 3px solid var(--bbangto-semantic-border-focus, ${VIOLET}) !important; outline-offset: 3px; }
.bbangto-max-card {
  background: var(--bbangto-semantic-background-elevated, #fff) !important;
  border: 3px solid var(--bbangto-ext-outline-text, ${INK}) !important;
  border-radius: var(--bbangto-radius-lg, 26px) !important;
  box-shadow: 10px 10px 0 var(--bbangto-ext-outline-text, ${INK}) !important;
  position: relative;
  overflow: hidden;
}
.bbangto-max-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bbangto-ext-pattern, transparent);
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
}
.bbangto-max-card > * { position: relative; z-index: 1; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-max-btn { transition: none !important; }
  .bbangto-max-btn:hover, .bbangto-max-btn:active { transform: none; }
}
@media (forced-colors: active) {
  .bbangto-max-btn, .bbangto-max-card { border-color: ButtonText !important; box-shadow: none !important; }
  .bbangto-max-card::before { display: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-max-btn',
  cardClass: 'bbangto-max-card',
  displayPrefix: 'Max',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 800, letterSpacing: '0.06em', lineHeight: 1.5, whiteSpace: 'nowrap',
      textTransform: 'uppercase', border: `2px solid ${INK}`,
    },
    tones: {
      accent: { backgroundColor: CYAN, color: INK },
      muted: { backgroundColor: '#FFFFFF', color: INK },
      solid: { backgroundColor: VIOLET, color: '#FFFFFF' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'DOPAMINE MODE',
  title: '소리 지르는 색의 향연',
  tagline: '과잉 속에서도 또렷한 위계',
  body: '마젠타·시안·옐로·바이올렛이 정면 충돌하는 밝은 캔버스. 대형 가변 타이포와 겹침 레이아웃, 두꺼운 보더와 오프셋 그림자가 도파민을 끌어올린다.',
  ctaPrimary: '터뜨리기',
  ctaSecondary: '가이드 보기',
  bandTitle: '눈이 즐거운 인터페이스, 지금 폭발시켜 보세요.',
  items: [
    { name: 'Clash', tone: 'accent', tag: 'COLOR', desc: '고채도 충돌색을 정면으로 부딪혀 에너지를 만든다.' },
    { name: 'Stack', tone: 'muted', tag: 'LAYOUT', desc: '겹침과 음수 마진으로 레이어 긴장감을 준다.' },
    { name: 'Outline', tone: 'solid', tag: 'BORDER', desc: '두꺼운 보더와 오프셋 그림자로 형태를 또렷이 가둔다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'MaxShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 색 충돌',
    dos: ['고채도 색은 강조 지점에만 충돌시키고 본문 영역은 밝은 베이스로 비운다.', '두꺼운 보더와 오프셋 그림자로 형태 경계를 또렷하게 가둔다.'],
    donts: ['모든 영역을 동시에 채도 100으로 채워 위계를 무너뜨리지 않는다.', '본문 텍스트를 저채도 배경 위 저대비 색으로 두지 않는다.'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '충돌색 위 텍스트는 어두운 잉크색을 고정해 충분한 대비를 확보한다.',
      'prefers-reduced-motion에서 hover 이동·그림자 트랜지션을 끈다.',
      'forced-colors(대비 강제) 모드에서 장식 패턴을 끄고 시스템 색을 따른다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '대형 헤드라인 Pretendard(sans, 초대형·굵게), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Maximalism_Dopamine_01: 밝은 캔버스 위 마젠타·시안·옐로·바이올렛 충돌색, 초대형 가변 타이포, 겹침 레이아웃, 두꺼운 보더와 오프셋 그림자.',
  components: {
    Button: {
      description: '초대형 알약형 버튼. 두꺼운 보더와 오프셋 그림자로 눌리고 떠오르는 촉감을 만든다.',
      specs: ['배경: 마젠타 primary', '보더: 3px 잉크', '모서리: pill(full)', 'hover: 떠오르며 그림자 확장', 'active: 눌리며 그림자 축소', 'focus-visible: 바이올렛 outline'],
    },
    Card: {
      description: '카드는 두꺼운 보더와 큰 오프셋 그림자, 그리고 은은한 사선 패턴 오버레이로 면을 채운다.',
      specs: ['배경: 흰색 elevated', '보더: 3px 잉크', '모서리: radius lg(26px)', '그림자: 10px 오프셋 하드 섀도', '오버레이: 사선 충돌 패턴(multiply)'],
    },
    Tag: {
      description: '두꺼운 보더의 알약형 배지. tone별 충돌색으로 카테고리를 강하게 분류한다.',
      specs: ['배경: tone별 충돌색(accent 시안 / muted 흰색 / solid 바이올렛)', '보더: 2px 잉크', '모서리: pill(999)', '폰트: JetBrains Mono 대문자'],
    },
  },
  example: Showcase,
};

export const MaxShowcase = Showcase;
export const maximalismDopamineWrappers = wrapperComponents;

export const maximalismDopamineStyleGuide: StyleGuide = {
  name: 'maximalism-dopamine-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { MaxShowcase: Showcase },
  guidelines,
  visualMotif,
};
