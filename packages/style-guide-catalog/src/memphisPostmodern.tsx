import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Memphis_Postmodern_01 — 멤피스 포스트모던. 고채도 충돌 + 파스텔.
 *
 * 밝은 크림 캔버스 위에 핑크/시안/노랑/검정을 거리낌 없이 부딪치고,
 * 지그재그·물방울·테리조 패턴을 장식으로 흩뿌린다. 모든 형태는 굵은 검정
 * 윤곽과 하드(블러 0) 오프셋 그림자로 또렷이 묶어 시각 소음 속에서도
 * 가독성을 지킨다. radius는 의도적으로 혼합한다.
 */

const PINK = '#FF5CA2';
const CYAN = '#3DD6D0';
const YELLOW = '#FFD23F';
const INK = '#1A1A1A';
const PASTEL = '#B49BFF';

const foundations = makeFoundations({
  name: 'memphis-postmodern-01',
  description: '고채도 핑크·시안·노랑 충돌 + 파스텔, 지그재그·물방울·테리조 패턴, 굵은 검정 윤곽(밝은 베이스)',
  fontSans: "'Archivo', 'Pretendard', system-ui, sans-serif",
  fontMono: "'Space Mono', 'JetBrains Mono', monospace",
  radius: { none: '0px', sm: '4px', md: '10px', lg: '20px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: `2px 2px 0 ${INK}`,
    md: `4px 4px 0 ${INK}`,
    lg: `7px 7px 0 ${INK}`,
    xl: `10px 10px 0 ${INK}`,
  },
  semantic: makeSemantic({
    bg: '#FBF7F2',
    bgElevated: '#FFFFFF',
    bgSunken: '#F1EAE0',
    overlay: 'rgba(26,26,26,0.55)',
    fg: INK,
    fgMuted: '#4A4540',
    fgSubtle: '#7A736B',
    fgInverse: '#FFFFFF',
    border: INK,
    borderMuted: 'rgba(26,26,26,0.25)',
    borderStrong: '#000000',
    focus: INK,
    primaryBase: PINK,
    primaryHover: '#FF3D8F',
    primaryActive: '#E83477',
    primarySubtle: 'rgba(255,92,162,0.18)',
    primaryFg: INK,
    accent: CYAN,
    accent2: YELLOW,
    accent3: PASTEL,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-squiggle': `repeating-linear-gradient(135deg, ${CYAN} 0 6px, transparent 6px 12px)`,
  '--bbangto-ext-terrazzo': `radial-gradient(circle at 20% 30%, ${PINK} 0 4px, transparent 5px), radial-gradient(circle at 72% 58%, ${YELLOW} 0 5px, transparent 6px), radial-gradient(circle at 45% 82%, ${CYAN} 0 3px, transparent 4px)`,
  '--bbangto-ext-confetti': `radial-gradient(circle, ${PINK} 2px, transparent 3px)`,
  '--bbangto-ext-ink': INK,
  '--bbangto-ext-border-width': '3px',
};

/* 색 스킴 변형(tweak) — 지그재그·물방울·테리조 패턴, 굵은 윤곽·하드 그림자 모티프는 base에서 상속. */

/* 다크: 자정의 플럼-차콜 캔버스 위에 형광 핑크·시안, 윤곽은 크림색(라이트 잉크)으로 반전, 옐로 포커스. */
const darkFoundations = makeColorway(foundations, {
  name: 'memphis-postmodern-01-dark',
  description: '멤피스 다크 — 자정 플럼-차콜 위 형광 핑크·시안, 크림 윤곽 반전, 옐로 포커스',
  semantic: makeSemantic({
    bg: '#17141A', bgElevated: '#221E28', bgSunken: '#0F0D12', overlay: 'rgba(0,0,0,0.6)',
    fg: '#F5EFEA', fgMuted: '#C9C2CC', fgSubtle: '#948E99', fgInverse: '#17141A',
    border: '#F5EFEA', borderMuted: 'rgba(245,239,234,0.25)', borderStrong: '#FFFFFF', focus: '#FFD23F',
    primaryBase: '#FF7AB6', primaryHover: '#FF5CA2', primaryActive: '#E83477',
    primarySubtle: 'rgba(255,122,182,0.22)', primaryFg: '#1A1A1A',
    accent: '#3DD6D0', accent2: '#FFD23F', accent3: '#B49BFF',
  }),
});
const darkExt: Record<string, string> = {
  '--bbangto-ext-squiggle': `repeating-linear-gradient(135deg, ${CYAN} 0 6px, transparent 6px 12px)`,
  '--bbangto-ext-terrazzo': `radial-gradient(circle at 20% 30%, #FF7AB6 0 4px, transparent 5px), radial-gradient(circle at 72% 58%, ${YELLOW} 0 5px, transparent 6px), radial-gradient(circle at 45% 82%, ${CYAN} 0 3px, transparent 4px)`,
  '--bbangto-ext-confetti': `radial-gradient(circle, #FF7AB6 2px, transparent 3px)`,
  '--bbangto-ext-ink': '#F5EFEA',
  '--bbangto-ext-border-width': '3px',
};

/* 시안 액센트: 라이트 유지, 히어로를 핑크→일렉트릭 시안으로 전환하고 핑크는 조연 액센트로. */
const cyanFoundations = makeColorway(foundations, {
  name: 'memphis-postmodern-01-cyan',
  description: '멤피스 일렉트릭 시안 — 쿨 크림 위 시안 히어로, 핑크·노랑 조연',
  semantic: makeSemantic({
    bg: '#F4FBFB', bgElevated: '#FFFFFF', bgSunken: '#E4F3F2', overlay: 'rgba(26,26,26,0.55)',
    fg: INK, fgMuted: '#3F4A49', fgSubtle: '#6E7A79', fgInverse: '#FFFFFF',
    border: INK, borderMuted: 'rgba(26,26,26,0.25)', borderStrong: '#000000', focus: INK,
    primaryBase: '#12B0C4', primaryHover: '#0E97A9', primaryActive: '#0B7E8D',
    primarySubtle: 'rgba(18,176,196,0.18)', primaryFg: INK,
    accent: PINK, accent2: YELLOW, accent3: PASTEL,
  }),
});
const cyanExt: Record<string, string> = {
  '--bbangto-ext-squiggle': `repeating-linear-gradient(135deg, ${PINK} 0 6px, transparent 6px 12px)`,
  '--bbangto-ext-terrazzo': `radial-gradient(circle at 20% 30%, #12B0C4 0 4px, transparent 5px), radial-gradient(circle at 72% 58%, ${YELLOW} 0 5px, transparent 6px), radial-gradient(circle at 45% 82%, ${PINK} 0 3px, transparent 4px)`,
  '--bbangto-ext-confetti': `radial-gradient(circle, #12B0C4 2px, transparent 3px)`,
  '--bbangto-ext-ink': INK,
  '--bbangto-ext-border-width': '3px',
};

const STYLE_ID = 'bbangto-memphis-postmodern-01-motif';
const CSS = `
.bbangto-mem-btn {
  background: var(--bbangto-semantic-primary-base, ${PINK}) !important;
  color: var(--bbangto-semantic-primary-foreground, ${INK}) !important;
  border: var(--bbangto-ext-border-width, 3px) solid var(--bbangto-ext-ink, ${INK}) !important;
  border-radius: var(--bbangto-radius-md, 10px) !important;
  box-shadow: 4px 4px 0 var(--bbangto-ext-ink, ${INK}) !important;
  font-weight: 800 !important;
  letter-spacing: 0.01em !important;
  transition: transform 140ms ease, box-shadow 140ms ease !important;
}
.bbangto-mem-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--bbangto-ext-ink, ${INK}) !important;
}
.bbangto-mem-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--bbangto-ext-ink, ${INK}) !important;
}
.bbangto-mem-btn:focus-visible {
  outline: 3px solid var(--bbangto-semantic-border-focus, ${INK}) !important;
  outline-offset: 3px;
}
.bbangto-mem-card {
  position: relative;
  background: var(--bbangto-semantic-background-elevated, #fff) !important;
  border: var(--bbangto-ext-border-width, 3px) solid var(--bbangto-ext-ink, ${INK}) !important;
  border-radius: var(--bbangto-radius-lg, 20px) !important;
  box-shadow: 7px 7px 0 var(--bbangto-ext-ink, ${INK}) !important;
  overflow: hidden;
}
/* 비대칭 confetti 장식 — 카드 우상단 모서리에만 흩뿌려 본문 가독성을 침범하지 않는다. */
.bbangto-mem-card::after {
  content: '';
  position: absolute;
  top: -14px;
  right: -14px;
  width: 58px;
  height: 58px;
  background: var(--bbangto-ext-confetti, radial-gradient(circle, ${PINK} 2px, transparent 3px)) 0 0 / 12px 12px;
  opacity: 0.5;
  transform: rotate(8deg);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-mem-btn { transition: none !important; }
  .bbangto-mem-btn:hover, .bbangto-mem-btn:active { transform: none; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-mem-btn',
  cardClass: 'bbangto-mem-card',
  displayPrefix: 'Memphis',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.6, whiteSpace: 'nowrap',
      border: `2px solid ${INK}`,
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        backgroundColor: 'var(--bbangto-semantic-primary-subtle, #3DD6D0)',
        color: 'var(--bbangto-semantic-primary-active, #0E2B2A)',
      },
      muted: {
        backgroundColor: 'var(--bbangto-semantic-background-sunken, #FFF1C2)',
        color: 'var(--bbangto-semantic-foreground-muted, #4A3A00)',
      },
      solid: {
        backgroundColor: 'var(--bbangto-semantic-primary-base, #FF5CA2)',
        color: 'var(--bbangto-semantic-primary-foreground, #1A1A1A)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'MEMPHIS MIX',
  title: '충돌하는 색, 춤추는 도형',
  tagline: '규칙을 비트는 포스트모던 표면',
  body: '고채도 색면과 지그재그·물방울·테리조 패턴을 의도적으로 충돌시켜 경쾌한 긴장을 만든다. 패턴은 늘 굵은 검정 윤곽과 단색 면 위에 얹혀 가독성을 잃지 않는다.',
  ctaPrimary: '구경하기',
  ctaSecondary: '패턴 보기',
  bandTitle: '시끄럽지만 분명히 읽히는 인터페이스, 지금 만져보세요.',
  items: [
    { name: '색면', tone: 'accent', tag: 'CLASH', desc: '핑크·시안·노랑을 거리낌 없이 부딪쳐 활기를 만든다.' },
    { name: '패턴', tone: 'muted', tag: 'PATTERN', desc: '지그재그·물방울·테리조를 장식으로 흩뿌린다.' },
    { name: '윤곽', tone: 'solid', tag: 'OUTLINE', desc: '굵은 검정 윤곽과 하드 그림자로 형태를 또렷이 묶는다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'MemphisShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 패턴',
    dos: [
      '패턴은 단색 면이나 모서리 등 여백에만 얹고, 본문 텍스트가 놓이는 영역은 평면 단색으로 비운다.',
      '모든 형태를 굵은 검정 윤곽 + 하드(블러 0) 오프셋 그림자로 묶어 색 충돌 속에서도 형태를 또렷이 한다.',
    ],
    donts: [
      '텍스트 바로 뒤에 고채도 패턴을 깔지 않는다(가독성 붕괴).',
      '한 화면에 패턴을 세 종류 이상 동시에 노출하지 않는다(시각 소음 한계).',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '패턴 위 텍스트는 반드시 단색 배경판 위에 올려 본문 대비 4.5:1 이상을 확보한다.',
      '고채도 면 위 텍스트는 흰색/검정 중 대비가 높은 쪽을 고정 선택한다(핑크 면=검정 글씨).',
      'focus-visible은 3px 검정 outline + offset으로 색면과 무관하게 항상 보이게 한다.',
      'prefers-reduced-motion에서 hover/active transform을 끈다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '제목·본문은 굵은 산세리프(Archivo), 라벨·수치는 Space Mono. 두께 대비를 과감히 준다.',
    requiredFonts: ['Archivo', 'Space Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Memphis_Postmodern_01: 밝은 크림 위 핑크·시안·노랑·검정 충돌과 파스텔, 지그재그·물방울·테리조 패턴, 굵은 검정 윤곽과 하드 오프셋 그림자, 혼합 radius.',
  components: {
    Button: {
      description: '고채도 핑크 면에 굵은 검정 윤곽과 하드 그림자를 얹은 버튼. hover 시 살짝 떠오르고 active 시 눌린다.',
      specs: ['배경: primary 핑크 단색', '보더: 3px 검정 윤곽', '그림자: 4px 하드 오프셋(블러 0)', '모서리: radius md(10px)', 'hover: -2px 떠오름 / active: +2px 눌림', 'focus-visible: 3px 검정 outline'],
    },
    Card: {
      description: '흰 표면에 굵은 검정 윤곽과 큰 하드 그림자를 두르고, 우상단 모서리에만 confetti 장식을 흩뿌린 카드.',
      specs: ['배경: elevated 흰색 단색(본문 가독성 우선)', '보더: 3px 검정 윤곽', '그림자: 7px 하드 오프셋', '모서리: radius lg(20px)', '장식: 우상단 confetti 패턴(opacity 0.5, pointer-events 없음)'],
    },
    Tag: {
      description: '굵은 검정 2px 윤곽의 Space Mono pill. tone별 고채도/파스텔 면을 바꿔 카테고리를 구분한다.',
      specs: ['배경: tone별(accent 시안 / muted 파스텔 옐로 / solid 핑크)', '보더: 2px 검정', '모서리: radius 8px', '폰트: Space Mono', '면색마다 대비 높은 글자색 고정'],
    },
  },
  example: Showcase,
};

export const MemphisShowcase = Showcase;
export const memphisPostmodernWrappers = wrapperComponents;

export const memphisPostmodernStyleGuide: StyleGuide = {
  name: 'memphis-postmodern-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (크림·핑크)', foundations, extendedFoundations },
    { key: 'dark', label: '다크 (형광 핑크·시안)', foundations: darkFoundations, extendedFoundations: darkExt },
    { key: 'cyan', label: '일렉트릭 시안', foundations: cyanFoundations, extendedFoundations: cyanExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { MemphisShowcase: Showcase },
  guidelines,
  visualMotif,
};
