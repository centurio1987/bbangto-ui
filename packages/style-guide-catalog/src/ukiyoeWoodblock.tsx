import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Ukiyoe_Woodblock_01 — 전통 목판화(우키요에) 미학.
 *
 * 쌀종이(washi) 오프화이트 배경 + 채도 낮은 흙빛 평면 색면(인디고 藍 / 베니 적갈 朱 /
 * 모스 그린 / 황토 / 먹 sumi). 입체 그림자 대신 먹빛 윤곽선(keyline)과 넉넉한
 * 여백(ma)으로 위계를 표현하고, 붉은 낙관 도장(hanko)이 시그니처 액센트다.
 * 모서리는 각진 목판 면(none~sm), 모션은 정적·느린 페이드.
 */

const SUMI = '#1F1B16'; // 먹 차콜(near-black) — 윤곽선 & 본문
const INDIGO = '#2E4374'; // 藍 인디고 — primary 평면 채색
const BENI = '#9E3B2E'; // 朱 적갈 — 낙관 도장 / accent
const MOSS = '#5A6B3B'; // 모스 그린 — accent2
const OCHRE = '#B8862F'; // 황토 머스타드 — accent3
const WASHI = '#F4EFE3'; // 쌀종이 오프화이트 배경

const foundations = makeFoundations({
  name: 'ukiyoe-woodblock-01',
  description: '쌀종이 배경 + 평면 흙빛 색면 + 먹빛 윤곽선과 여백 위계 + 붉은 낙관 도장, 인디고/적갈 액센트의 전통 목판화 미학',
  fontSans: "'Noto Sans', 'Noto Sans JP', system-ui, sans-serif",
  fontMono: "'Noto Sans Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '3px', md: '4px', lg: '6px', xl: '8px', full: '9999px' },
  shadow: { none: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
  typeScale: {
    display: { fontSize: '60px', lineHeight: '1.12', letterSpacing: '0', fontWeight: 400 },
    h1: { fontSize: '38px', lineHeight: '1.18', letterSpacing: '0', fontWeight: 500 },
    h2: { fontSize: '26px', lineHeight: '1.3', letterSpacing: '0', fontWeight: 600 },
    meta: { fontSize: '12px', lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: 500 },
  },
  semantic: makeSemantic({
    bg: WASHI,
    bgElevated: '#FBF8F0',
    bgSunken: '#EAE3D2',
    overlay: 'rgba(31,27,22,0.55)',
    fg: SUMI,
    fgMuted: '#4A4135',
    fgSubtle: '#7A6F5C',
    fgInverse: '#FBF8F0',
    border: SUMI,
    borderMuted: '#C9BFA8',
    borderStrong: '#1A1712',
    focus: INDIGO,
    primaryBase: INDIGO,
    primaryHover: '#25365E',
    primaryActive: '#1C2A49',
    primarySubtle: '#DDE2EC',
    primaryFg: '#FBF8F0',
    accent: BENI,
    accent2: MOSS,
    accent3: OCHRE,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-sumi-keyline': `1.5px solid ${SUMI}`,
  '--bbangto-ext-washi-grain': 'rgba(31,27,22,0.04)',
  '--bbangto-ext-flat-fill-indigo': INDIGO,
  '--bbangto-ext-flat-fill-beni': BENI,
  '--bbangto-ext-flat-fill-moss': MOSS,
  '--bbangto-ext-flat-fill-ochre': OCHRE,
  '--bbangto-ext-bokashi': `linear-gradient(180deg, ${INDIGO} 0%, #6E84B0 100%)`,
  '--bbangto-ext-hanko-seal': BENI,
  '--bbangto-ext-ma-gap': '40px',
};

const STYLE_ID = 'bbangto-ukiyoe-woodblock-motif';
const CSS = `
.bbangto-ukiyoe-woodblock-card {
  background:
    var(--bbangto-ext-bokashi, linear-gradient(180deg, ${INDIGO} 0%, #6E84B0 100%)) top/100% 6px no-repeat,
    var(--bbangto-semantic-background-elevated, #FBF8F0) !important;
  border: var(--bbangto-ext-sumi-keyline, 1.5px solid ${SUMI}) !important;
  border-radius: var(--bbangto-radius-sm, 3px) !important;
  box-shadow: none !important;
  transition: border-color 320ms ease, opacity 320ms ease !important;
}
.bbangto-ukiyoe-woodblock-card:hover {
  border-color: var(--bbangto-ext-flat-fill-indigo, ${INDIGO}) !important;
}
.bbangto-ukiyoe-woodblock-btn {
  background: var(--bbangto-semantic-primary-base, ${INDIGO}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FBF8F0) !important;
  border: var(--bbangto-ext-sumi-keyline, 1.5px solid ${SUMI}) !important;
  border-radius: var(--bbangto-radius-sm, 3px) !important;
  box-shadow: none !important;
  font-weight: 600 !important;
  transition: background-color 320ms ease !important;
}
.bbangto-ukiyoe-woodblock-btn:hover { background: var(--bbangto-semantic-primary-hover, #25365E) !important; }
.bbangto-ukiyoe-woodblock-btn:active { background: var(--bbangto-semantic-primary-active, #1C2A49) !important; }
.bbangto-ukiyoe-woodblock-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-primary-base, ${INDIGO}) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-ukiyoe-woodblock-card { transition: none !important; }
  .bbangto-ukiyoe-woodblock-btn { transition: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-ukiyoe-woodblock-btn',
  cardClass: 'bbangto-ukiyoe-woodblock-card',
  displayPrefix: 'UkiyoeWoodblock',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      borderRadius: 3, fontFamily: "'Noto Sans', 'Noto Sans JP', system-ui, sans-serif",
      fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.5,
      whiteSpace: 'nowrap', border: `1.5px solid ${SUMI}`,
    },
    tones: {
      accent: { background: BENI, color: '#FBF8F0', borderColor: BENI },
      muted: { background: 'transparent', color: SUMI },
      solid: { background: INDIGO, color: '#FBF8F0', borderColor: INDIGO },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'UKIYOE 09',
  title: '먹선과 색면으로 새긴 풍경',
  tagline: '평면 색면, 먹빛 윤곽, 그리고 여백의 침묵',
  body: '쌀종이 질감 위에 채도를 낮춘 흙빛 색면을 평평하게 얹는다. 입체 그림자 대신 먹빛 윤곽선과 넉넉한 여백(ma)으로 위계를 세우고, 붉은 낙관 도장으로 시선을 묶는다.',
  ctaPrimary: '풍경 보기',
  ctaSecondary: '판화집 열기',
  bandTitle: '색면은 평평하게, 위계는 선과 여백으로.',
  items: [
    { name: '풍경 패널', tone: 'solid', tag: 'SCENE', desc: '후지산·물결 같은 풍경 일러스트를 평면 색면으로 담는 이미지 슬롯. alt 텍스트를 함께 제공한다.' },
    { name: '색인 목록', tone: 'muted', tag: 'INDEX', desc: '먹선 구획으로 항목을 나누고 세로 리듬에 맞춰 위에서 아래로 정렬한다.' },
    { name: '낙관 배지', tone: 'accent', tag: 'SEAL', desc: '붉은 인장형 라벨로 강조하되, 색 하나만으로 정보를 전달하지 않는다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'UkiyoeWoodblockShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '색면 분리 & 여백 레이아웃',
    dos: [
      '색면을 평면으로 분리하고, 입체 그림자 대신 먹빛 윤곽선과 여백(--bbangto-ext-ma-gap)으로 위계를 표현한다.',
      '풍경 일러스트는 이미지 슬롯으로 두고 반드시 alt 텍스트를 제공한다.',
      '비대칭 구도라도 넉넉한 여백(ma)으로 침묵과 균형을 만든다.',
    ],
    donts: [
      '글로시·네온·3D 입체감을 혼용하지 않는다(평면 회화 양식 훼손).',
      '저채도 흙빛 색면끼리 과밀하게 붙여 위계를 흐리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 저채도 흙빛 색면 위 본문은 대비가 위험하므로, 본문 텍스트는 먹 차콜(#1F1B16, near-black)로 4.5:1 이상을 강제한다.',
      'washi 그레인·bokashi 그라데이션 위 텍스트는 단색 패널을 깔아 대비를 확보한다.',
      '붉은 낙관 도장은 장식·강조용일 뿐, 색 단독으로 의미를 전달하지 않는다(텍스트 라벨 병기).',
      '느린 페이드 모션은 prefers-reduced-motion: reduce에서 정적으로 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문은 휴머니스트 산세리프(Noto Sans), 디스플레이는 가는 고전 세리프(Shippori Mincho/Noto Serif)로 우키요에 제목 각字 느낌을 낸다. 큰 letter-spacing은 지양하고 세로 리듬을 강조한다.',
    requiredFonts: ['Noto Sans', 'Noto Sans JP', 'Shippori Mincho', 'Noto Serif'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Ukiyoe_Woodblock_01: 전통 목판화 문법 — 평면 색면 채색 + 먹빛 윤곽선(keyline) + 여백(ma) + 동양 풍경 도상(후지·분재·물결). 붉은 낙관 도장이 시그니처 액센트, 입체 그림자 없이 면과 선으로 위계를 만든다.',
  components: {
    Button: {
      description: '평면 인디고/적갈 fill + 먹빛 윤곽선 버튼. 그림자 없이 hover 시 색면 농도만 느리게 변한다.',
      specs: ['모서리: 각진 radius sm(3px)', '채움: 평면 인디고 primary', '보더: 먹 keyline 1.5px', '그림자: 없음(평면)', 'hover: 색면 농도 변화(slow fade)', 'focus-visible: 인디고 outline'],
    },
    Card: {
      description: 'washi 배경 + 먹 keyline 보더 + 상단 bokashi 색면 띠. 입체 그림자 없이 평면으로 떠 있다.',
      specs: ['모서리: 각진 radius sm(3px)', '배경: washi(쌀종이)', '상단: bokashi 색면 6px 띠', '보더: 먹 keyline 1.5px', '그림자: 없음', 'reduce-motion: 페이드 비활성'],
    },
    Tag: {
      description: '붉은 낙관 도장형(사각 인장) 라벨. accent=하노 적갈, muted=먹선 아웃라인, solid=인디고.',
      specs: ['모서리: 각진 사각(3px)', '보더: 먹 keyline 1.5px', '폰트: Noto Sans', '색: beni-seal / sumi-outline / indigo'],
    },
  },
  example: Showcase,
};

export const ukiyoeWoodblockWrappers = wrapperComponents;
export const UkiyoeWoodblockShowcase = Showcase;

export const ukiyoeWoodblockStyleGuide: StyleGuide = {
  name: 'ukiyoe-woodblock-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { UkiyoeWoodblockShowcase: Showcase },
  guidelines,
  visualMotif,
};
