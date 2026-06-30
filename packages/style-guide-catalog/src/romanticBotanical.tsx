import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Romantic_Botanical_01 — 파스텔 정원 + 화이트 핸드드로잉 라인아트 미학.
 *
 * 크림 페이퍼 배경 위 블러시 핑크/라일락/세이지/스카이블루 파스텔 팔레트와
 * 화이트 잉크 라인아트(꽃·잎·나비)가 프레임·구분선·accent를 이룬다. 본문은
 * 휴머니스트 산세리프, 디스플레이는 우아한 세리프. 넉넉한 spacing, 꽃잎처럼
 * 부드러운 lg~xl radius(일부 비대칭 컷), 매우 낮은 soft ambient 그림자로
 * 파스텔 위를 가볍게 부유하는 로맨틱 보태니컬 무드를 만든다.
 */

const INK = '#2E2A33';
const ROSE = '#9E3F63';
const SAGE = '#5E7A5A';
const LILAC = '#8E7BB0';

const foundations = makeFoundations({
  name: 'romantic-botanical-01',
  description: '파스텔 가든 팔레트 + 화이트 라인아트(꽃·잎·나비) + 세리프 디스플레이/휴머니스트 산세리프 본문, 꽃잎형 부드러운 radius와 soft ambient',
  fontSans: "'Nunito Sans', 'Inter', 'Pretendard', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '12px', md: '18px', lg: '24px', xl: '32px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(120,90,110,0.05)',
    md: '0 2px 8px rgba(120,90,110,0.07)',
    lg: '0 4px 16px rgba(120,90,110,0.09)',
    xl: '0 8px 28px rgba(120,90,110,0.12)',
  },
  typeScale: {
    display: { fontSize: '64px', lineHeight: '1.1', letterSpacing: '0.005em', fontWeight: 600 },
    h1: { fontSize: '38px', lineHeight: '1.15', letterSpacing: '0', fontWeight: 600 },
    h2: { fontSize: '26px', lineHeight: '1.25', letterSpacing: '0', fontWeight: 600 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: 600 },
  },
  semantic: makeSemantic({
    bg: '#FBF7F2',
    bgElevated: '#FFFFFF',
    bgSunken: '#F3EDE6',
    overlay: 'rgba(60,50,55,0.42)',
    fg: INK,
    fgMuted: '#5A5560',
    fgSubtle: '#847E8C',
    fgInverse: '#FFFFFF',
    border: '#E8DFE6',
    borderMuted: '#F1EAEF',
    borderStrong: '#D5C8D2',
    focus: '#7A2E4A',
    primaryBase: ROSE,
    primaryHover: '#8C3656',
    primaryActive: '#7A2E4A',
    primarySubtle: '#F7E7EE',
    primaryFg: '#FFFFFF',
    accent: SAGE,
    accent2: LILAC,
    accent3: '#6A93B0',
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-botanical-line': 'rgba(255,255,255,0.92)',
  '--bbangto-ext-leaf-outline': '1.5px solid rgba(94,122,90,0.55)',
  '--bbangto-ext-butterfly': LILAC,
  '--bbangto-ext-petal-radius': '24px 32px 24px 32px',
  '--bbangto-ext-garden-gradient': 'linear-gradient(180deg, #EAF1F6 0%, #F7EEF3 48%, #EEF3E9 100%)',
  '--bbangto-ext-bloom-glow': '0 0 24px rgba(247,231,238,0.85)',
};

const STYLE_ID = 'bbangto-romantic-botanical-motif';
const CSS = `
.bbangto-romantic-botanical-card {
  border-radius: var(--bbangto-ext-petal-radius, 24px 32px 24px 32px) !important;
  background: var(--bbangto-semantic-background-elevated, #FFFFFF) !important;
  border: 1px solid var(--bbangto-semantic-border-base, #E8DFE6) !important;
  box-shadow: 0 2px 8px rgba(120,90,110,0.07) !important;
  transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 240ms cubic-bezier(0.2, 0.7, 0.2, 1) !important;
}
.bbangto-romantic-botanical-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 28px rgba(120,90,110,0.12), var(--bbangto-ext-bloom-glow, 0 0 24px rgba(247,231,238,0.85)) !important;
}
.bbangto-romantic-botanical-btn {
  border-radius: 9999px !important;
  background: var(--bbangto-semantic-primary-base, ${ROSE}) !important;
  color: var(--bbangto-semantic-primary-foreground, #FFFFFF) !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
  box-shadow: 0 1px 2px rgba(120,90,110,0.05) !important;
  transition: transform 140ms ease, background 140ms ease !important;
}
.bbangto-romantic-botanical-btn:hover { background: var(--bbangto-semantic-primary-hover, #8C3656) !important; }
.bbangto-romantic-botanical-btn:active { transform: translateY(1px) scale(0.99) !important; background: var(--bbangto-semantic-primary-active, #7A2E4A) !important; }
.bbangto-romantic-botanical-btn:focus-visible { outline: 2px solid var(--bbangto-semantic-focus, #7A2E4A) !important; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .bbangto-romantic-botanical-card { transition: none !important; }
  .bbangto-romantic-botanical-card:hover { transform: none !important; }
  .bbangto-romantic-botanical-btn { transition: none !important; }
  .bbangto-romantic-botanical-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-romantic-botanical-btn',
  cardClass: 'bbangto-romantic-botanical-card',
  displayPrefix: 'RomanticBotanical',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
      borderRadius: 999, fontFamily: "'Nunito Sans', system-ui, sans-serif", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.05em', lineHeight: 1.5, whiteSpace: 'nowrap',
    },
    tones: {
      accent: { background: '#F7E7EE', color: ROSE },
      muted: { background: '#F1EAEF', color: '#5A5560' },
      solid: { background: SAGE, color: '#fff' },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'BOTANICAL 01',
  title: '봄 정원에서 피어나는 브랜드',
  tagline: '파스텔 위 화이트 라인아트가 감싸는 화면',
  body: '크림 페이퍼 배경에 블러시 핑크와 세이지, 라일락을 얇게 풀고 그 위에 흰 잉크로 그린 꽃·잎·나비 라인아트를 얹는다. 꽃잎처럼 부드러운 모서리와 낮은 그림자로 화면이 정원 위에 가볍게 떠 있게 만든다.',
  ctaPrimary: '컬렉션 보기',
  ctaSecondary: '무드보드 열기',
  bandTitle: '파스텔과 라인아트가 만나는 자리, 절제된 로맨틱.',
  items: [
    { name: '가든 히어로', tone: 'accent', tag: 'BLOOM', desc: '세리프 헤드라인과 꽃 라인아트로 봄 캠페인의 첫 화면을 연다.' },
    { name: '뷰티 카드', tone: 'muted', tag: 'PETAL', desc: '꽃잎형 프레임에 제품을 담아 부드럽고 우아하게 진열한다.' },
    { name: '초대장 타일', tone: 'solid', tag: 'GARDEN', desc: '잎맥 구분선과 나비 accent로 뉴스레터·초대장을 장식한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'RomanticBotanicalShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '레이아웃 & 보태니컬 라인아트',
    dos: [
      '가든 그라디언트 배경(--bbangto-ext-garden-gradient) 위 세리프 헤드라인 + 꽃·나비 라인아트로 Hero를 구성한다.',
      '라인아트는 강조·장식 레이어로만 쓰고 본문은 가독 산세리프로 또렷이 유지한다.',
      '나비/꽃 도상은 의미가 있을 때만 절제해서 배치하고 넉넉한 spacing으로 숨 쉴 여백을 둔다.',
    ],
    donts: [
      '파스텔 배경과 화이트 라인을 정보 밀도 높은 화면에 남발해 시각 소음을 만들지 않는다.',
      '꽃 라인아트를 본문 텍스트와 겹쳐 가독성을 떨어뜨리지 않는다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '파스텔 하이키 톤은 본질적으로 저대비 → 본문 텍스트는 어두운 잉크 톤(#2E2A33)으로 WCAG AA 4.5:1 이상을 별도 확보한다.',
      '파스텔 배경 위 흰색 본문 텍스트는 금지한다(대비 부족). 흰색은 라인아트 장식에만 사용한다.',
      '포커스 링은 가시성 보강을 위해 진한 로즈(#7A2E4A) 2px outline + 2px offset으로 명시한다.',
      '라인아트·꽃을 이미지로 내보낼 때는 대체텍스트를 제공한다.',
      '떠다니는 꽃/나비 모션과 카드 hover float는 prefers-reduced-motion: reduce에서 비활성화한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '디스플레이/헤드라인은 우아한 세리프(Cormorant/Playfair류), 본문·라벨은 휴머니스트 산세리프(Nunito Sans/Inter류)로 가독성을 유지한다.',
    requiredFonts: ['Cormorant', 'Playfair Display', 'Nunito Sans', 'Inter'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Romantic_Botanical_01: 파스텔 정원 위에 떠 있는 화이트 핸드드로잉 꽃·잎·나비 라인아트 — 자연 도상이 프레임·구분선·accent를 이루는 로맨틱 보태니컬 문법. 세리프 디스플레이 + 휴머니스트 산세리프 본문이 시그니처.',
  components: {
    Button: {
      description: '꽃잎형 부드러운 알약(full radius) 로즈 채움 버튼. press 시 살짝 가라앉고, focus-visible에서 진한 로즈 링이 또렷이 보인다.',
      specs: ['모서리: full pill(9999px)', '채움: 딥 로즈 primary(흰 텍스트 AA)', '그림자: soft ambient sm', 'active: translateY/scale 미세 press', 'focus-visible: 진한 로즈 outline + offset'],
    },
    Card: {
      description: '꽃잎처럼 비대칭으로 둥근(petal-radius) 타일. soft ambient 그림자로 파스텔 위를 부유하고, hover에서 3px 떠오르며 bloom glow가 번진다.',
      specs: ['모서리: petal-radius(24/32 비대칭)', '그림자: 매우 낮은 soft ambient', '보더: 1px 라일락 subtle', 'hover: translateY(-3px) + bloom glow', 'reduce-motion: float/glow 비활성'],
    },
    Tag: {
      description: '꽃잎형 부드러운 알약 라벨. accent=블러시 subtle, muted=중립, solid=세이지.',
      specs: ['모서리: pill(999px)', '텍스트: letter-spacing 0.05em', '폰트: Nunito Sans', '색: blush-subtle / neutral / sage-solid'],
    },
  },
  example: Showcase,
};

export const romanticBotanicalWrappers = wrapperComponents;
export const RomanticBotanicalShowcase = Showcase;

export const romanticBotanicalStyleGuide: StyleGuide = {
  name: 'romantic-botanical-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  wrapperComponents,
  patterns: { RomanticBotanicalShowcase: Showcase },
  guidelines,
  visualMotif,
};
