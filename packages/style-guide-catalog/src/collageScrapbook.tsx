import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Collage_Scrapbook_01 — 크라프트 종이 위 콜라주/스크랩북.
 *
 * 크라프트지 배경 위에 손그림 보더, 폴라로이드/테이프로 붙인 사진 컷아웃,
 * 스티커 라벨을 얹는다. 핸드라이팅과 산세리프를 섞고, 모서리 반경을 일부러
 * 불규칙하게 둬 손으로 오려 붙인 인상을 만든다. 라이트 베이스라 잉크색
 * 본문으로 대비를 확보한다.
 */

const KRAFT = '#E8DCC4';
const PAPER = '#FBF6EA';
const INK = '#2E2622';
const STICKER = '#F2C84B';
const MARKER = '#C0392B';
const FOCUS = '#1D4ED8';

const foundations = makeFoundations({
  name: 'collage-scrapbook-01',
  description: '크라프트지 콜라주/스크랩북 — 손그림 보더 + 폴라로이드·테이프 컷아웃 + 스티커 라벨(라이트 베이스)',
  fontSans: "'Pretendard', system-ui, sans-serif",
  fontMono: "'Caveat', 'Gaegu', 'Comic Sans MS', cursive",
  radius: {
    none: '0px',
    sm: '7px 4px 8px 5px',
    md: '11px 7px 13px 8px',
    lg: '17px 12px 19px 14px',
    xl: '24px 18px 27px 20px',
    full: '9999px',
  },
  shadow: {
    none: 'none',
    sm: '1px 2px 4px rgba(46,34,24,0.18)',
    md: '2px 4px 10px rgba(46,34,24,0.22)',
    lg: '4px 8px 20px rgba(46,34,24,0.26)',
    xl: '6px 12px 30px rgba(46,34,24,0.30)',
  },
  semantic: makeSemantic({
    bg: KRAFT,
    bgElevated: PAPER,
    bgSunken: '#DDD0B4',
    overlay: 'rgba(46,34,24,0.48)',
    fg: INK,
    fgMuted: '#5C4F42',
    fgSubtle: '#857562',
    fgInverse: PAPER,
    border: '#4A3B2A',
    borderMuted: 'rgba(74,59,42,0.30)',
    borderStrong: '#2E2218',
    focus: FOCUS,
    primaryBase: MARKER,
    primaryHover: '#A93226',
    primaryActive: '#922B21',
    primarySubtle: 'rgba(192,57,43,0.15)',
    primaryFg: '#FFF7F2',
    accent: STICKER,
    accent2: '#2A8C82',
    accent3: '#D6587E',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-tape': 'linear-gradient(135deg, rgba(228,210,150,0.72), rgba(208,186,120,0.55))',
  '--bbangto-ext-torn-edge': 'rgba(46,34,24,0.14)',
  '--bbangto-ext-sticker': STICKER,
  '--bbangto-ext-rotate': '-1.5deg',
};

/* 색 스킴 변형(colorway) — 손그림 보더·테이프·스티커 모티프(래퍼 CSS·shape)는 base에서 상속. */

// 밤 스크랩북 — 어두운 크라프트/차콜 종이 위 크림 잉크, 따뜻한 코럴 마커.
const darkFoundations = makeColorway(foundations, {
  name: 'collage-scrapbook-01-dark',
  description: '밤 스크랩북 — 어두운 크라프트 종이 + 크림 잉크 본문 + 코럴 마커(다크 베이스)',
  semantic: makeSemantic({
    bg: '#2A241C', bgElevated: '#3A332A', bgSunken: '#1F1A14', overlay: 'rgba(0,0,0,0.55)',
    fg: '#F2E8D5', fgMuted: '#C9BCA5', fgSubtle: '#9C8E78', fgInverse: '#2A241C',
    border: '#6B5B45', borderMuted: 'rgba(230,215,180,0.20)', borderStrong: '#8A7659', focus: '#7FA7FF',
    primaryBase: '#E8705E', primaryHover: '#F08472', primaryActive: '#D65A47',
    primarySubtle: 'rgba(232,112,94,0.22)', primaryFg: '#2A1410',
    accent: '#F2C84B', accent2: '#4FB3A6', accent3: '#E87BA0',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-tape': 'linear-gradient(135deg, rgba(110,95,70,0.72), rgba(85,72,52,0.55))',
  '--bbangto-ext-torn-edge': 'rgba(0,0,0,0.30)',
  '--bbangto-ext-sticker': '#F2C84B',
  '--bbangto-ext-rotate': '-1.5deg',
};

// 압화(押花) 식물 스크랩북 — 차가운 크림 종이 + 올리브 잉크 + 포레스트 그린 마커(강조색 전환).
const botanicalFoundations = makeColorway(foundations, {
  name: 'collage-scrapbook-01-botanical',
  description: '압화 식물 스크랩북 — 차가운 크림 종이 + 올리브 잉크 + 포레스트 그린 마커(라이트, 강조색 전환)',
  semantic: makeSemantic({
    bg: '#EDE7D6', bgElevated: '#FBF7EC', bgSunken: '#DCD3BC', overlay: 'rgba(40,42,30,0.46)',
    fg: '#26281E', fgMuted: '#52543F', fgSubtle: '#7C7C63', fgInverse: '#FBF7EC',
    border: '#3F4A2E', borderMuted: 'rgba(63,74,46,0.30)', borderStrong: '#262E18', focus: '#B85C9E',
    primaryBase: '#2E7D5B', primaryHover: '#266B4D', primaryActive: '#1E573E',
    primarySubtle: 'rgba(46,125,91,0.16)', primaryFg: '#F3FAF5',
    accent: '#E8A93B', accent2: '#C0587E', accent3: '#4C7BB0',
  }),
});
const botanicalExt: Record<string, string> = {
  '--bbangto-ext-tape': 'linear-gradient(135deg, rgba(210,200,160,0.72), rgba(190,180,130,0.55))',
  '--bbangto-ext-torn-edge': 'rgba(38,40,30,0.16)',
  '--bbangto-ext-sticker': '#E8A93B',
  '--bbangto-ext-rotate': '-1.5deg',
};

const STYLE_ID = 'bbangto-collage-scrapbook-01-motif';
const CSS = `
.bbangto-col-btn {
  background-color: var(--bbangto-semantic-background-elevated, #FBF6EA) !important;
  color: var(--bbangto-semantic-foreground-base, #2E2622) !important;
  border: 2px solid var(--bbangto-semantic-border-strong, #2E2218) !important;
  border-radius: var(--bbangto-radius-md, 11px 7px 13px 8px) !important;
  box-shadow: 2px 2px 0 0 var(--bbangto-semantic-border-strong, #2E2218) !important;
  font-family: var(--bbangto-typography-font-family-mono, 'Caveat', cursive) !important;
  font-weight: 700 !important;
  transition: transform 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-col-btn:hover {
  transform: translate(-1px,-1px) rotate(-0.6deg);
  box-shadow: 3px 3px 0 0 var(--bbangto-semantic-border-strong, #2E2218) !important;
}
.bbangto-col-btn:active {
  transform: translate(1px,1px);
  box-shadow: 1px 1px 0 0 var(--bbangto-semantic-border-strong, #2E2218) !important;
}
.bbangto-col-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-border-focus, #1D4ED8) !important;
  outline-offset: 2px;
}
.bbangto-col-card {
  position: relative !important;
  background-color: var(--bbangto-semantic-background-elevated, #FBF6EA) !important;
  border: 1px solid var(--bbangto-semantic-border-muted, rgba(74,59,42,0.30)) !important;
  border-radius: var(--bbangto-radius-sm, 7px 4px 8px 5px) !important;
  box-shadow: var(--bbangto-shadow-md, 2px 4px 10px rgba(46,34,24,0.22)) !important;
  transform: rotate(var(--bbangto-ext-rotate, -1.5deg));
  transition: transform 160ms ease !important;
}
.bbangto-col-card::before {
  content: "";
  position: absolute;
  top: -11px;
  left: 50%;
  width: 88px;
  height: 24px;
  transform: translateX(-50%) rotate(-3deg);
  background: var(--bbangto-ext-tape, rgba(228,210,150,0.7));
  border: 1px solid var(--bbangto-ext-torn-edge, rgba(46,34,24,0.14));
  box-shadow: 0 1px 3px rgba(46,34,24,0.18);
  pointer-events: none;
}
.bbangto-col-card:hover { transform: rotate(0deg); }
.bbangto-col-card:focus-within {
  outline: 3px solid var(--bbangto-semantic-border-focus, #1D4ED8);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-col-btn { transition: none !important; }
  .bbangto-col-btn:hover, .bbangto-col-btn:active { transform: none; }
  .bbangto-col-card { transition: none !important; }
  .bbangto-col-card:hover { transform: rotate(var(--bbangto-ext-rotate, -1.5deg)); }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-col-btn',
  cardClass: 'bbangto-col-card',
  displayPrefix: 'Collage',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 12px',
      borderRadius: '12px 8px 11px 9px',
      fontFamily: "var(--bbangto-typography-font-family-mono, 'Caveat', cursive)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.02em',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      boxShadow: '1px 1px 3px rgba(46,34,24,0.22)',
      transform: 'rotate(-1.5deg)',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        backgroundColor: 'var(--bbangto-semantic-primary-subtle, #F2C84B)',
        color: 'var(--bbangto-semantic-primary-active, #3A2E12)',
        border: '1.5px solid var(--bbangto-semantic-primary-base, #B98A1E)',
      },
      muted: {
        backgroundColor: 'var(--bbangto-semantic-background-sunken, #F4ECD8)',
        color: 'var(--bbangto-semantic-foreground-muted, #5C4F42)',
        border: '1.5px dashed var(--bbangto-semantic-border-muted, #9C8A72)',
      },
      solid: {
        backgroundColor: 'var(--bbangto-semantic-primary-base, #C0392B)',
        color: 'var(--bbangto-semantic-primary-foreground, #FFF7F2)',
        border: '1.5px solid var(--bbangto-semantic-primary-active, #8E2A20)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: '스크랩북 노트',
  title: '오려 붙인 종이의 기록',
  tagline: '테이프와 스티커로 엮은 콜라주',
  body: '크라프트지 위에 사진을 폴라로이드처럼 붙이고, 손그림 보더와 스티커 라벨로 메모를 남긴다. 살짝 기울어진 각도가 손으로 꾸민 페이지의 인상을 만든다.',
  ctaPrimary: '페이지 만들기',
  ctaSecondary: '예시 보기',
  bandTitle: '오늘의 조각들을 한 장에 붙여 보세요.',
  items: [
    { name: '폴라로이드', tone: 'accent', tag: '사진', desc: '컷아웃 사진을 테이프로 붙인 폴라로이드 카드.' },
    { name: '메모 쪽지', tone: 'muted', tag: '노트', desc: '손글씨 메모를 위한 크라프트 쪽지 표면.' },
    { name: '스티커', tone: 'solid', tag: '라벨', desc: '강조용 마커색 스티커 라벨로 초점을 만든다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'CollageShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 콜라주',
    dos: [
      '카드는 폴라로이드/테이프처럼 살짝 기울여(약 -1.5도) 붙인 인상을 만든다.',
      '표면 반경을 모서리마다 미세하게 다르게 둬 손으로 오린 느낌을 유지한다.',
    ],
    donts: [
      '회전 각도를 과하게(±5도 이상) 키워 가독성을 해치지 않는다.',
      '완벽히 정렬된 직각 그리드만 쓰지 않는다(콜라주 인상 상실).',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '손그림 텍스트를 이미지로 쓸 때는 동일한 의미의 대체텍스트(alt)를 반드시 제공한다.',
      '회전된 요소도 실제 터치 타깃은 최소 44x44px를 확보한다(transform은 시각만, 히트박스 별도).',
      '크라프트 배경 위 본문은 잉크색을 고정해 대비를 확보하고, focus-visible 아웃라인을 항상 노출한다.',
      'prefers-reduced-motion에서 hover 회전·이동을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문·라벨 Pretendard(sans), 제목·강조 메모는 Caveat 계열 핸드라이팅(mono 슬롯).',
    requiredFonts: ['Pretendard', 'Caveat'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Collage_Scrapbook_01: 크라프트지 위 손그림 보더 버튼, 폴라로이드·테이프 카드(미세 회전), 스티커 태그로 손으로 꾸민 스크랩북 페이지를 만든다.',
  components: {
    Button: {
      description: '손그림 보더 버튼. 두꺼운 잉크 보더와 오프셋 그림자로 펜으로 그은 듯한 윤곽을 만든다.',
      specs: [
        '배경: 크림 종이색',
        '보더: 2px 잉크 + 2px 오프셋 그림자',
        '모서리: 불규칙 radius md',
        'hover: 살짝 기울며 떠오름',
        'focus-visible: 파란 outline 3px',
      ],
    },
    Card: {
      description: '카드는 폴라로이드처럼 살짝 기울고, 상단에 테이프 한 조각이 붙어 사진을 고정한 인상을 만든다.',
      specs: [
        '배경: 크림 종이색',
        '회전: --bbangto-ext-rotate(약 -1.5도)',
        '테이프: ::before로 상단 중앙에 부착',
        'hover: 회전 0도로 펴짐',
        '모서리: 불규칙 radius sm',
      ],
    },
    Tag: {
      description: '스티커 라벨. 살짝 기운 각도와 부드러운 그림자로 종이에 붙인 스티커 질감을 만든다.',
      specs: [
        '배경: tone별(accent 노랑 스티커 / muted 크라프트 / solid 마커색)',
        '보더: solid·dashed 혼용',
        '회전: -1.5도',
        '폰트: 핸드라이팅(mono 슬롯)',
      ],
    },
  },
  example: Showcase,
};

export const CollageShowcase = Showcase;
export const collageScrapbookWrappers = wrapperComponents;

export const collageScrapbookStyleGuide: StyleGuide = {
  name: 'collage-scrapbook-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (크라프트 · 마커 레드)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (밤 스크랩북 · 코럴)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'botanical', label: '압화 식물 (포레스트 그린)', foundations: botanicalFoundations, extendedFoundations: botanicalExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { CollageShowcase: Showcase },
  guidelines,
  visualMotif,
};
