import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Photo_Type_Editorial_01 — 포토·타입 에디토리얼 미학.
 *
 * 단색 평면 배경(차콜/오렌지/옐로) + 흑백·톤다운 사진을 대비 소재로,
 * 초대형 grotesque 디스플레이 산세리프(800~900 weight, 압축 트래킹)가 캔버스를 지배한다.
 * 글자를 사진으로 채우거나(background-clip:text) 사진을 글자·기하 프레임 안에 가두고,
 * ghost/outline 텍스트와 컷아웃을 겹쳐 포토-타입 한 덩어리를 만든다.
 * radius는 각짐을 유지(none~sm), 깊이는 그림자가 아니라 마스킹·레이어 겹침으로만 표현한다.
 */

const CHARCOAL = '#141210';
const ORANGE = '#E8540C';
const YELLOW = '#F5B70A';

const foundations = makeFoundations({
  name: 'photo-type-editorial-01',
  description:
    '단색 평면 배경 + 초대형 grotesque 타이포와 사진 융합(클립·마스크·아웃라인) + 각진 플랫 프레임, 차콜/오렌지/옐로 대비',
  fontSans: "'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: 'none',
    md: `4px 4px 0 ${CHARCOAL}`,
    lg: `8px 8px 0 ${CHARCOAL}`,
    xl: `12px 12px 0 ${CHARCOAL}`,
  },
  typeScale: {
    display: { fontSize: '88px', lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: 900 },
    h1: { fontSize: '52px', lineHeight: '0.98', letterSpacing: '-0.02em', fontWeight: 800 },
    h2: { fontSize: '32px', lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: 800 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: 700 },
  },
  semantic: makeSemantic({
    bg: '#F5F2EC',
    bgElevated: '#FFFFFF',
    bgSunken: '#EAE6DD',
    overlay: 'rgba(20,18,16,0.55)',
    fg: CHARCOAL,
    fgMuted: '#403B34',
    fgSubtle: '#6E665B',
    fgInverse: '#FFFFFF',
    border: '#DAD4C8',
    borderMuted: '#EAE6DD',
    borderStrong: CHARCOAL,
    focus: ORANGE,
    primaryBase: CHARCOAL,
    primaryHover: '#000000',
    primaryActive: '#2A2620',
    primarySubtle: '#EAE6DD',
    primaryFg: '#FFFFFF',
    accent: ORANGE,
    accent2: YELLOW,
    accent3: CHARCOAL,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-text-image': `linear-gradient(135deg, ${ORANGE} 0%, ${YELLOW} 100%)`,
  '--bbangto-ext-text-stroke': `2px ${CHARCOAL}`,
  '--bbangto-ext-photo-mask': 'polygon(0 0, 100% 0, 100% 86%, 0 100%)',
  '--bbangto-ext-frame-rect': `3px solid ${CHARCOAL}`,
  '--bbangto-ext-headline-overlap': '-24px',
  '--bbangto-ext-cutout-edge': '2px solid #FFFFFF',
};

const STYLE_ID = 'bbangto-photo-type-editorial-motif';
const CSS = `
.bbangto-photo-type-editorial-card {
  border-radius: 2px !important;
  border: var(--bbangto-ext-frame-rect, 3px solid ${CHARCOAL}) !important;
  background: var(--bbangto-semantic-background-elevated, #FFFFFF) !important;
  box-shadow: none !important;
  transition: transform 160ms ease, box-shadow 160ms ease !important;
}
.bbangto-photo-type-editorial-card:hover {
  transform: translate(-3px, -3px) !important;
  box-shadow: 6px 6px 0 var(--bbangto-semantic-foreground-base, ${CHARCOAL}) !important;
}
.bbangto-photo-type-editorial-btn {
  border-radius: 2px !important;
  background: var(--bbangto-semantic-primary-base, ${CHARCOAL}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 800 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  box-shadow: none !important;
  transition: background 120ms ease, transform 120ms ease !important;
}
.bbangto-photo-type-editorial-btn:hover { background: ${ORANGE} !important; }
.bbangto-photo-type-editorial-btn:active { transform: translateY(1px) !important; }
.bbangto-photo-type-editorial-btn:focus-visible { outline: 3px solid ${ORANGE} !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-photo-type-editorial-card { transition: none !important; }
  .bbangto-photo-type-editorial-card:hover { transform: none !important; }
  .bbangto-photo-type-editorial-btn { transition: none !important; }
  .bbangto-photo-type-editorial-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-photo-type-editorial-btn',
  cardClass: 'bbangto-photo-type-editorial-card',
  displayPrefix: 'PhotoTypeEditorial',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 2, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.12em', lineHeight: 1.4, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    tones: {
      accent: { background: CHARCOAL, color: YELLOW },
      muted: { background: '#EAE6DD', color: '#403B34' },
      solid: { background: ORANGE, color: '#FFFFFF' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'PHOTO·TYPE 01',
  title: '사진을 입은 거대한 활자',
  tagline: '포토와 타입이 한 평면에서 녹아드는 에디토리얼',
  body: '초대형 grotesque 헤드라인 안에 사진을 채우고, 사진은 기하 프레임 안에 가둔다. 평면 단색 배경 위에서 활자와 이미지가 겹쳐 하나의 포토-타입 덩어리로 읽힌다.',
  ctaPrimary: '커버 보기',
  ctaSecondary: '아카이브',
  bandTitle: '글자가 곧 사진, 사진이 곧 프레임.',
  items: [
    { name: '포토텍스트 헤드', tone: 'accent', tag: 'CLIP', desc: '글자 내부를 사진으로 채우되 의미 텍스트는 실제 문자로 유지한다.' },
    { name: '프레임드 포토', tone: 'muted', tag: 'FRAME', desc: '누끼·톤다운 사진을 각진 기하 프레임 안에 가두어 평면에 안착시킨다.' },
    { name: '고스트 타입', tone: 'solid', tag: 'GHOST', desc: 'outline-only 반복 텍스트를 컷아웃 뒤 백드롭으로 겹친다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'PhotoTypeEditorialShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '포토·타입 레이아웃',
    dos: [
      '헤드라인은 굵고 단순한 단어로 두어 사진 채움(클립) 후에도 형태가 읽히게 한다.',
      '헤드라인↔사진 겹침은 --bbangto-ext-headline-overlap(-24px) 음수 오프셋으로 일관되게 적용한다.',
      '사진은 각진 기하 프레임(--bbangto-ext-frame-rect) 안에 가두어 평면 단색 배경에 안착시킨다.',
      '깊이는 그림자가 아니라 마스킹·레이어 겹침으로 표현하고 radius는 none~sm으로 각짐을 유지한다.',
    ],
    donts: [
      '본문·긴 텍스트를 사진으로 채우지 않는다(헤드라인 단어에만 클립 적용).',
      '저대비 사진 위에 텍스트를 직접 올리지 않는다.',
      '둥근 모서리·소프트 섀도로 평면성을 흐트러뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      'background-clip:text·text-stroke는 글자 내부 사진과 배경 간 명도 대비가 보장되지 않으므로, 미지원/고대비 모드를 위해 충분한 대비의 폴백 단색 fill을 반드시 지정한다.',
      '핵심 정보는 타입 자체가 아니라 일반 텍스트 캡션으로 중복 제공해 스크린리더·SEO·고대비 모드에서 손실되지 않게 한다.',
      'prefers-contrast: more 환경에서는 사진 fill을 해제하고 단색 텍스트로 되돌린다.',
      '본문 텍스트는 단색 면 위에서 WCAG AA(본문 4.5:1, 대형 3:1)를 충족한다.',
      '의미를 전달하는 사진·컷아웃에는 대체텍스트를, 장식 레이어에는 aria-hidden을 부여한다.',
      'hover lift(translate/offset shadow)는 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '압축 grotesque 디스플레이(Archivo Black/Anton류, 800~900 weight)가 헤드라인을 지배하고, 본문은 휴머니스트 산세리프(Inter)로 절제한다.',
    requiredFonts: ['Archivo Black', 'Anton', 'Inter'],
  },
};

const visualMotif: VisualMotif = {
  summary:
    'Photo_Type_Editorial_01: 단색 평면 배경 + 초대형 grotesque 타이포와 사진의 융합. 글자를 사진으로 채우거나(클립) 사진을 글자·기하 프레임 안에 가두고, ghost/outline 텍스트와 컷아웃을 겹쳐 포토-타입 한 덩어리를 만든다.',
  components: {
    Button: {
      description: '각진(radius 2px) 플랫 솔리드 차콜 버튼. 헤드라인을 방해하지 않게 절제하며 hover 시 오렌지로 전환.',
      specs: ['모서리: radius 2px(각짐)', '채움: 차콜 primary 플랫', '라벨: uppercase, letter-spacing 0.06em', 'hover: 오렌지 전환', 'focus-visible: 오렌지 3px outline'],
    },
    Card: {
      description: '사진을 가두는 각진 기하 프레임 카드(FramedPhoto). 평면·무그림자 기조, hover에서 hard offset shadow가 드러난다.',
      specs: ['모서리: radius 2px', '프레임: 3px solid 차콜(--bbangto-ext-frame-rect)', '평소 그림자: none(평면)', 'hover: translate(-3px) + 6px hard offset shadow', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: '평면 각진 라벨. accent=차콜 위 옐로, muted=중립, solid=오렌지 위 화이트.',
      specs: ['모서리: radius 2px(각짐)', '텍스트: uppercase, letter-spacing 0.12em', '폰트: Inter', '색: charcoal/yellow · neutral · orange/white'],
    },
  },
  example: Showcase,
};

export const photoTypeEditorialWrappers = wrapperComponents;
export const PhotoTypeEditorialShowcase = Showcase;

export const photoTypeEditorialStyleGuide: StyleGuide = {
  name: 'photo-type-editorial-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { PhotoTypeEditorialShowcase: Showcase },
  guidelines,
  visualMotif,
};
