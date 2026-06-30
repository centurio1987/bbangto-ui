import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Claymorphism_Playful_01 — 두툼한 3D 점토 표면.
 *
 * 밝은 라벤더/파스텔 배경 위에 파스텔 다색 표면을 얹고, 외부 드롭섀도 +
 * 내부 inset 하이라이트로 말랑한 압출(extrusion) 인상을 만든다. radius xl(28px)로
 * 매우 둥글게, 큰 spacing. 라이트 베이스라 텍스트 대비는 충분하지만, 정보 밀도가
 * 높은 화면에서는 그림자 시각 소음이 커지므로 사용을 자제한다.
 */

const LAVENDER = '#ECE9FF';
const PRIMARY = '#7C6CF0';
const ACCENT_PINK = '#FF9EC4';
const ACCENT_MINT = '#7EE0C8';

const foundations = makeFoundations({
  name: 'claymorphism-playful-01',
  description: '두툼한 3D 점토 표면 + 외부 드롭섀도 + 내부 inset 하이라이트(밝은 라벤더 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '14px', md: '20px', lg: '24px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '6px 6px 14px rgba(124,108,240,0.18)',
    md: '10px 10px 24px rgba(124,108,240,0.22)',
    lg: '16px 16px 40px rgba(124,108,240,0.26)',
    xl: '22px 22px 56px rgba(124,108,240,0.30)',
  },
  semantic: makeSemantic({
    bg: LAVENDER,
    bgElevated: '#FBFAFF',
    bgSunken: '#E2DEFB',
    overlay: 'rgba(60,52,120,0.32)',
    fg: '#2C2552',
    fgMuted: '#5A5180',
    fgSubtle: '#8C84B0',
    fgInverse: '#FFFFFF',
    border: '#D6CFFA',
    borderMuted: '#E6E1FC',
    borderStrong: '#BCB1F2',
    focus: '#5B47E0',
    primaryBase: PRIMARY,
    primaryHover: '#6B5AE6',
    primaryActive: '#5A48D6',
    primarySubtle: 'rgba(124,108,240,0.16)',
    primaryFg: '#FFFFFF',
    accent: ACCENT_PINK,
    accent2: ACCENT_MINT,
    accent3: '#FFD27E',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-clay-shadow-out': '12px 12px 28px rgba(124,108,240,0.28)',
  '--bbangto-ext-clay-shadow-in': 'inset 0 3px 6px rgba(255,255,255,0.85), inset 0 -5px 10px rgba(124,108,240,0.22)',
  '--bbangto-ext-clay-radius': '28px',
  '--bbangto-ext-clay-surface': '#FBFAFF',
  '--bbangto-ext-clay-highlight': 'rgba(255,255,255,0.9)',
};

const STYLE_ID = 'bbangto-claymorphism-playful-01-motif';
const CSS = `
.bbangto-clay-btn {
  background: var(--bbangto-ext-clay-surface, #FBFAFF) !important;
  color: var(--bbangto-semantic-foreground-base, #2C2552) !important;
  border: none !important;
  border-radius: var(--bbangto-ext-clay-radius, 28px) !important;
  padding: 12px 22px !important;
  font-weight: 700 !important;
  box-shadow: var(--bbangto-ext-clay-shadow-out, 12px 12px 28px rgba(124,108,240,0.28)), var(--bbangto-ext-clay-shadow-in, inset 0 3px 6px rgba(255,255,255,0.85), inset 0 -5px 10px rgba(124,108,240,0.22)) !important;
  transition: transform 180ms ease, box-shadow 180ms ease !important;
}
.bbangto-clay-btn:hover { transform: translateY(-2px); }
.bbangto-clay-btn:active {
  transform: translateY(1px);
  box-shadow: inset 0 4px 10px rgba(124,108,240,0.28), inset 0 -2px 4px rgba(255,255,255,0.7) !important;
}
.bbangto-clay-btn:focus-visible { outline: 3px solid var(--bbangto-semantic-border-focus, #5B47E0) !important; outline-offset: 3px; }
.bbangto-clay-card {
  background: var(--bbangto-ext-clay-surface, #FBFAFF) !important;
  border: none !important;
  border-radius: var(--bbangto-ext-clay-radius, 28px) !important;
  box-shadow: var(--bbangto-ext-clay-shadow-out, 12px 12px 28px rgba(124,108,240,0.28)), var(--bbangto-ext-clay-shadow-in, inset 0 3px 6px rgba(255,255,255,0.85), inset 0 -5px 10px rgba(124,108,240,0.22)) !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-clay-btn { transition: none !important; }
  .bbangto-clay-btn:hover, .bbangto-clay-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-clay-btn',
  cardClass: 'bbangto-clay-card',
  displayPrefix: 'Clay',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 13px',
      borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 2px 2px 6px rgba(124,108,240,0.18)',
    },
    tones: {
      accent: { background: '#FFE2EE', color: '#A03867', border: '1px solid #FFC7DD' },
      muted: { background: '#E8E4FB', color: '#5A5180', border: '1px solid #D6CFFA' },
      solid: { background: PRIMARY, color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'CLAY PLAY',
  title: '말랑하게 빚은 인터페이스',
  tagline: '눌러보고 싶은 두툼한 표면',
  body: '파스텔 점토 표면 위에 외부 드롭섀도와 안쪽 하이라이트를 겹쳐 손으로 빚은 듯한 압출 깊이를 만든다. 둥근 모서리와 넉넉한 여백이 모티프의 시그니처다.',
  ctaPrimary: '만져보기',
  ctaSecondary: '가이드 보기',
  bandTitle: '말랑한 점토 위에 올려둔 인터페이스, 지금 눌러보세요.',
  items: [
    { name: 'Squish', tone: 'accent', tag: 'CLAY', desc: '누르면 안쪽으로 들어가는 inset 압출 반응.' },
    { name: 'Round', tone: 'muted', tag: 'RADIUS', desc: 'radius xl(28px)로 모든 모서리를 둥글게.' },
    { name: 'Pastel', tone: 'solid', tag: 'COLOR', desc: '라벤더 베이스 위 파스텔 다색 표면 팔레트.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'ClayShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 그림자',
    dos: ['표면마다 외부 드롭섀도 + 안쪽 하이라이트를 함께 써 압출감을 만든다.', '모서리는 radius xl(28px)로 크게 둥글린다.'],
    donts: ['정보 밀도가 높은 화면에 두꺼운 그림자를 남발하지 않는다(시각 소음).', '표면을 평평한 단색으로 두지 않는다(점토감 상실).'],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '라이트 베이스이므로 본문 텍스트는 진한 보라(#2C2552)로 대비를 확보한다.',
      'focus-visible는 3px 진한 보라 outline + offset으로 그림자와 분리한다.',
      'prefers-reduced-motion에서 hover/active transform을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문 Pretendard(sans), 라벨·수치 JetBrains Mono(mono).',
    requiredFonts: ['Pretendard', 'JetBrains Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Claymorphism_Playful_01: 밝은 라벤더 위 파스텔 점토 표면, 외부 드롭섀도 + 내부 inset 하이라이트로 말랑한 압출, radius xl(28px)의 둥근 모서리.',
  components: {
    Button: {
      description: '두툼한 점토 버튼. 안쪽 하이라이트로 부풀어 오르고, 누르면 inset으로 들어간다.',
      specs: ['배경: 밝은 파스텔 표면', '그림자: 외부 드롭 + 안쪽 inset 하이라이트', '모서리: radius xl(28px)', 'active: 안쪽으로 눌리는 inset 반전', 'focus-visible: 3px 진한 보라 outline'],
    },
    Card: {
      description: '카드는 더 큰 압출과 부드러운 외부 그림자로 점토 덩어리가 떠 있는 인상을 만든다.',
      specs: ['배경: 밝은 파스텔 표면', '그림자: 외부 드롭 + 안쪽 inset 하이라이트', '모서리: radius xl(28px)', '보더: 없음(그림자로 형태 표현)'],
    },
    Tag: {
      description: '말랑한 pill 배지. 작은 안쪽 하이라이트로 표면과 같은 점토 재질감을 유지한다.',
      specs: ['배경: tone별 파스텔(accent 핑크 / muted 라벤더 / solid 보라)', '모서리: pill(999)', '폰트: JetBrains Mono', '안쪽 1px 하이라이트 + 작은 드롭'],
    },
  },
  example: Showcase,
};

export const ClayShowcase = Showcase;
export const claymorphismPlayfulWrappers = wrapperComponents;

export const claymorphismPlayfulStyleGuide: StyleGuide = {
  name: 'claymorphism-playful-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { ClayShowcase: Showcase },
  guidelines,
  visualMotif,
};
