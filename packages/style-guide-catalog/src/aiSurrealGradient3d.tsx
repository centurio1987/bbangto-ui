import type { StyleGuide, VisualMotif } from '@centurio1987/bbangto-ui-core';
import { makeFoundations, makeSemantic, makeColorway } from './_foundation';
import { makeMotifWrappers } from './_motif';
import { makeShowcase, type ShowcaseCopy } from './_showcase';

/*
 * Ai_Surreal_Gradient3d_01 — AI 생성 초현실 3D 렌더 + 이리데센트 미학.
 *
 * 딥 다크(near-black 네이비/차콜) 배경 위에 라이팅 기반으로 렌더된 3D 오브젝트와
 * 무지갯빛(이리데센트) 그라데이션 표면을 올린다. radius md~lg(렌더 카드/이미지 프레임),
 * 오브젝트 접지용 소프트 ambient shadow + 표면 스펙큘러 글로스. 굵은 그로테스크
 * 디스플레이 + 메타데이터용 모노. 이리데센트는 장식·대형 헤딩에만, 본문은 솔리드 대비 확보.
 */

const BG = '#0A0B14';
const FG = '#F2F3F8';
const VIOLET = '#8B5CF6';
const CYAN = '#5BE1FF';
const MAGENTA = '#FF6BD6';
const LIME = '#B6FF5B';
const IRIDESCENT = `linear-gradient(135deg, ${CYAN} 0%, ${VIOLET} 38%, ${MAGENTA} 70%, ${LIME} 100%)`;
const RENDER_SHADOW = '0 18px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)';
const SPEC_HIGHLIGHT = 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 0 24px rgba(123,92,246,0.18)';

const foundations = makeFoundations({
  name: 'ai-surreal-gradient3d-01',
  description: '딥 다크 위 AI 초현실 3D 렌더 + 이리데센트 그라데이션 표면, 소프트 접지 그림자 + 스펙큘러 글로스, 그로테스크/모노 타이포',
  fontSans: "'Space Grotesk', 'Archivo', 'Pretendard', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radius: { none: '0px', sm: '8px', md: '14px', lg: '20px', xl: '28px', full: '9999px' },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.4)',
    md: '0 10px 24px rgba(0,0,0,0.5)',
    lg: RENDER_SHADOW,
    xl: '0 28px 64px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.45)',
  },
  typeScale: {
    display: { fontSize: '76px', lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: 700 },
    h1: { fontSize: '44px', lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: 700 },
    h2: { fontSize: '30px', lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: 600 },
    meta: { fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: 500 },
  },
  semantic: makeSemantic({
    bg: BG,
    bgElevated: '#14161F',
    bgSunken: '#060710',
    overlay: 'rgba(6,7,16,0.66)',
    fg: FG,
    fgMuted: '#A8ABB8',
    fgSubtle: '#6E7180',
    fgInverse: '#0A0B14',
    border: '#262936',
    borderMuted: '#1B1E2A',
    borderStrong: '#3A3E4F',
    focus: CYAN,
    primaryBase: VIOLET,
    primaryHover: '#7C3AED',
    primaryActive: '#6D28D9',
    primarySubtle: '#1E1B33',
    primaryFg: '#FFFFFF',
    accent: CYAN,
    accent2: MAGENTA,
    accent3: LIME,
  }),
});

const extendedFoundations: Record<string, string> = {
  '--bbangto-ext-iridescent': IRIDESCENT,
  '--bbangto-ext-chroma-shift': 'conic-gradient(from 210deg at 50% 50%, #5BE1FF, #8B5CF6, #FF6BD6, #B6FF5B, #5BE1FF)',
  '--bbangto-ext-spec-highlight': SPEC_HIGHLIGHT,
  '--bbangto-ext-render-shadow': RENDER_SHADOW,
  '--bbangto-ext-render-frame': '1px solid rgba(123,92,246,0.35)',
  '--bbangto-ext-fallback-img': 'radial-gradient(120% 120% at 30% 20%, #1E1B33 0%, #0A0B14 70%)',
};

/* 색 스킴 변형(colorway) — 이리데센트 렌더/글로스 모티프는 base에서 상속, 색만 교체. */

// 라이트 렌더룸 — 밝은 라벤더 무대 위 이리데센트(base 다크의 명확한 대비 파트너).
const lightFoundations = makeColorway(foundations, {
  name: 'ai-surreal-gradient3d-01-light',
  description: '라이트 렌더룸 — 밝은 라벤더 무대 위 이리데센트 3D 렌더, 어두운 본문으로 대비 확보',
  semantic: makeSemantic({
    bg: '#F4F2FB', bgElevated: '#FFFFFF', bgSunken: '#E9E5F5', overlay: 'rgba(20,16,32,0.28)',
    fg: '#141020', fgMuted: '#4A4560', fgSubtle: '#7C7794', fgInverse: '#F4F2FB',
    border: '#D8D2EC', borderMuted: '#E9E5F5', borderStrong: '#B3ABD0', focus: '#0EA5C4',
    primaryBase: '#7C3AED', primaryHover: '#6D28D9', primaryActive: '#5B21B6',
    primarySubtle: '#E9E2FB', primaryFg: '#FFFFFF',
    accent: '#0EA5C4', accent2: '#DB2777', accent3: '#65A30D',
  }),
});
const lightExt: Record<string, string> = {
  '--bbangto-ext-iridescent': 'linear-gradient(135deg, #22D3EE 0%, #7C3AED 38%, #DB2777 70%, #65A30D 100%)',
  '--bbangto-ext-chroma-shift': 'conic-gradient(from 210deg at 50% 50%, #22D3EE, #7C3AED, #DB2777, #65A30D, #22D3EE)',
  '--bbangto-ext-spec-highlight': 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 24px rgba(124,58,237,0.10)',
  '--bbangto-ext-render-shadow': '0 18px 40px rgba(80,60,140,0.18), 0 2px 8px rgba(80,60,140,0.12)',
  '--bbangto-ext-render-frame': '1px solid rgba(124,58,237,0.28)',
  '--bbangto-ext-fallback-img': 'radial-gradient(120% 120% at 30% 20%, #EDE7FB 0%, #F4F2FB 70%)',
};

// 마젠타 홀로 — 딥 다크 유지하되 키컬러를 바이올렛→핫핑크로, 포커스를 라임으로 전환한 액센트 변형.
const magentaFoundations = makeColorway(foundations, {
  name: 'ai-surreal-gradient3d-01-magenta',
  description: '마젠타 홀로 — 딥 다크 무대 위 핫핑크 키컬러 + 라임 포커스 이리데센트',
  semantic: makeSemantic({
    bg: '#0E0916', bgElevated: '#1A1122', bgSunken: '#080410', overlay: 'rgba(8,4,16,0.66)',
    fg: '#F6F0FA', fgMuted: '#B8A6C4', fgSubtle: '#7C6E88', fgInverse: '#0E0916',
    border: '#2E2338', borderMuted: '#1F1728', borderStrong: '#463652', focus: '#B6FF5B',
    primaryBase: '#EC4899', primaryHover: '#DB2777', primaryActive: '#BE185D',
    primarySubtle: '#2A1020', primaryFg: '#FFFFFF',
    accent: '#B6FF5B', accent2: '#5BE1FF', accent3: '#C084FC',
  }),
});
const magentaExt: Record<string, string> = {
  '--bbangto-ext-iridescent': 'linear-gradient(135deg, #B6FF5B 0%, #EC4899 38%, #5BE1FF 70%, #C084FC 100%)',
  '--bbangto-ext-chroma-shift': 'conic-gradient(from 210deg at 50% 50%, #B6FF5B, #EC4899, #5BE1FF, #C084FC, #B6FF5B)',
  '--bbangto-ext-spec-highlight': 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 0 24px rgba(236,72,153,0.20)',
  '--bbangto-ext-render-shadow': '0 18px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
  '--bbangto-ext-render-frame': '1px solid rgba(236,72,153,0.38)',
  '--bbangto-ext-fallback-img': 'radial-gradient(120% 120% at 30% 20%, #2A1020 0%, #0E0916 70%)',
};

const STYLE_ID = 'bbangto-ai-surreal-gradient3d-motif';
const CSS = `
.bbangto-ai-surreal-gradient3d-card {
  position: relative;
  border-radius: var(--bbangto-radius-lg, 20px) !important;
  background:
    var(--bbangto-ext-fallback-img, radial-gradient(120% 120% at 30% 20%, #1E1B33 0%, #0A0B14 70%)),
    var(--bbangto-semantic-background-elevated, #14161F) !important;
  border: var(--bbangto-ext-render-frame, 1px solid rgba(123,92,246,0.35)) !important;
  box-shadow: var(--bbangto-ext-render-shadow, ${RENDER_SHADOW}), ${SPEC_HIGHLIGHT} !important;
  color: var(--bbangto-semantic-foreground-base, #F2F3F8) !important;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.bbangto-ai-surreal-gradient3d-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: ${IRIDESCENT};
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.45;
  pointer-events: none;
}
.bbangto-ai-surreal-gradient3d-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 28px 64px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.45), ${SPEC_HIGHLIGHT} !important;
}
.bbangto-ai-surreal-gradient3d-btn {
  border-radius: 14px !important;
  background: ${IRIDESCENT} !important;
  background-size: 180% 180% !important;
  color: #0A0B14 !important;
  font-weight: 700 !important;
  border: none !important;
  box-shadow: ${SPEC_HIGHLIGHT}, 0 6px 18px rgba(91,225,255,0.22) !important;
  transition: transform 140ms ease, background-position 320ms ease, box-shadow 140ms ease !important;
}
.bbangto-ai-surreal-gradient3d-btn:hover {
  background-position: 100% 50% !important;
  box-shadow: ${SPEC_HIGHLIGHT}, 0 10px 26px rgba(255,107,214,0.3) !important;
}
.bbangto-ai-surreal-gradient3d-btn:active { transform: translateY(1px) scale(0.99) !important; }
.bbangto-ai-surreal-gradient3d-btn:focus-visible {
  outline: 2px solid var(--bbangto-semantic-focus, #5BE1FF) !important;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-ai-surreal-gradient3d-card { transition: none !important; }
  .bbangto-ai-surreal-gradient3d-card:hover { transform: none !important; }
  .bbangto-ai-surreal-gradient3d-btn { transition: none !important; }
  .bbangto-ai-surreal-gradient3d-btn:hover { background-position: 0% 50% !important; }
  .bbangto-ai-surreal-gradient3d-btn:active { transform: none !important; }
}
`;

const wrapperComponents = makeMotifWrappers({
  styleId: STYLE_ID,
  css: CSS,
  buttonClass: 'bbangto-ai-surreal-gradient3d-btn',
  cardClass: 'bbangto-ai-surreal-gradient3d-card',
  displayPrefix: 'AiSurrealGradient3d',
  tag: {
    defaultTone: 'accent',
    baseStyle: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 999, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
      fontWeight: 600, letterSpacing: '0.12em', lineHeight: 1.5, whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    },
    // 색 결합 해소 — semantic CSS 변수 + 기존 hex fallback으로 색 스킴을 따라간다.
    tones: {
      accent: {
        background: 'var(--bbangto-semantic-primary-subtle, rgba(91,225,255,0.12))',
        color: 'var(--bbangto-semantic-focus, #5BE1FF)',
        border: '1px solid var(--bbangto-semantic-focus, #5BE1FF)',
      },
      muted: {
        background: 'var(--bbangto-semantic-background-sunken, #1B1E2A)',
        color: 'var(--bbangto-semantic-foreground-muted, #A8ABB8)',
        border: '1px solid var(--bbangto-semantic-border-strong, #3A3E4F)',
      },
      solid: {
        background: 'var(--bbangto-semantic-primary-base, #8B5CF6)',
        color: 'var(--bbangto-semantic-primary-foreground, #fff)',
      },
    },
  },
});

const copy: ShowcaseCopy = {
  badge: 'RENDER 01',
  title: '부유하는 초현실 렌더',
  tagline: '딥 다크 위로 흐르는 이리데센트 표면',
  body: '라이팅으로 빚어낸 3D 오브젝트가 어두운 무대 위에 떠오르고, 무지갯빛 그라데이션이 각도에 따라 색을 바꾼다. 본문은 솔리드 대비를 지키고, 이리데센트는 헤딩과 표면 장식에만 절제해 올린다.',
  ctaPrimary: '컬렉션 열기',
  ctaSecondary: '렌더 보기',
  bandTitle: '어둠 위에 떠오르는 색, 흔들리지 않는 가독성.',
  items: [
    { name: '히어로 렌더', tone: 'accent', tag: 'MATERIAL', desc: '중앙에 부유하는 대형 3D 오브젝트를 풀블리드로 담는다.' },
    { name: '메타 카드', tone: 'muted', tag: 'ORIGIN', desc: '코너 크로스마커와 모노 캡션으로 렌더 메타데이터를 표기한다.' },
    { name: '드롭 액션', tone: 'solid', tag: 'RELEASE', desc: '이리데센트 글로스 버튼으로 컬렉션 드롭을 유도한다.' },
  ],
};

const Showcase = makeShowcase(wrapperComponents, copy, 'AiSurrealGradient3dShowcase');

const guidelines: Record<string, Record<string, unknown>> = {
  layout: {
    title: '렌더 그리드 & 레이아웃',
    dos: [
      '중앙 부유 오브젝트 Hero + 2×2 렌더 카드 군집으로 시선을 모은다.',
      '카드마다 MATERIAL/ORIGIN 같은 모노 메타데이터 캡션을 반복해 일관된 문법을 만든다.',
      '3D 오브젝트는 렌더 이미지 자산(또는 lazy WebGL 슬롯)으로 주입하고 솔리드/다크 오버레이로 콘텐츠를 감싼다.',
    ],
    donts: [
      '본문 텍스트를 이리데센트 표면 위에 직접 올려 대비를 무너뜨리지 않는다.',
      '인터랙티브 시차/실시간 3D를 남발하지 않는다 — 정적 렌더 자산 중심을 유지한다.',
    ],
  },
  accessibility: {
    title: '접근성',
    rules: [
      '⚠ 다크 위 이리데센트는 명도/채도 변동이 커 WCAG 대비 위배 위험 → 본문은 무지갯빛 표면 위에 직접 두지 말고 솔리드/다크 오버레이로 본문 4.5:1·대형 3:1 대비를 확보한다.',
      '이리데센트는 장식과 대형 헤딩에만 사용하고, 인터랙티브 텍스트는 솔리드 대비 토큰으로 강제한다.',
      '빠른 크로마 시프트/시머 애니메이션은 prefers-reduced-motion: reduce에서 정적화하고 발작 위험을 회피한다.',
      '모든 렌더 이미지에 의미 있는 대체텍스트를 제공하고, 데모 자산은 가상 placeholder로 라이선스/콘텐츠 정책을 준수한다.',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '굵은 그로테스크 산세리프(Space Grotesk/Archivo) 디스플레이 + 메타데이터용 모노(IBM Plex Mono).',
    requiredFonts: ['Space Grotesk', 'Archivo', 'IBM Plex Mono'],
  },
};

const visualMotif: VisualMotif = {
  summary: 'Ai_Surreal_Gradient3d_01: 딥 다크 위 AI 초현실 3D 렌더 + 이리데센트 표면. 소프트 접지 그림자·스펙큘러 글로스가 시그니처이며, 정적 렌더 자산 중심으로 색은 헤딩·표면 장식에만 절제해 올린다.',
  components: {
    Button: {
      description: '이리데센트 그라데이션 fill + 글로스 하이라이트 버튼. hover 시 그라데이션이 흐른다.',
      specs: ['모서리: radius 14px', '채움: 이리데센트 그라디언트', '글로스: inset spec-highlight', 'hover: background-position 시프트', 'focus-visible: 시안 outline'],
    },
    Card: {
      description: '3D 렌더 슬롯을 담는 RenderCard. 다크 패널 + 이리데센트 림 보더 + 접지 그림자.',
      specs: ['모서리: radius 20px', '그림자: render-shadow 소프트 ambient', '보더: 이리데센트 render-frame', 'hover: translateY(-3px) lift', 'reduce-motion: lift 비활성'],
    },
    Tag: {
      description: 'holographic chip(크로마 시프트 톤). accent=시안 글로우, muted=중립, solid=바이올렛.',
      specs: ['모서리: pill(999px)', '텍스트: 모노 uppercase, letter-spacing 0.12em', '폰트: IBM Plex Mono', '색: cyan-glow / neutral / violet'],
    },
  },
  example: Showcase,
};

export const aiSurrealGradient3dWrappers = wrapperComponents;
export const AiSurrealGradient3dShowcase = Showcase;

export const aiSurrealGradient3dStyleGuide: StyleGuide = {
  name: 'ai-surreal-gradient3d-01',
  description: foundations.description,
  foundations,
  extendedFoundations,
  foundationPresets: [
    { key: 'default', label: '기본 (딥 다크 · 바이올렛 이리데센트)', foundations, extendedFoundations },
    { key: 'light', label: '라이트 렌더룸 (라벤더 무대)', foundations: lightFoundations, extendedFoundations: lightExt },
    { key: 'magenta', label: '마젠타 홀로 (핫핑크 · 라임 포커스)', foundations: magentaFoundations, extendedFoundations: magentaExt },
  ],
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { AiSurrealGradient3dShowcase: Showcase },
  guidelines,
  visualMotif,
};
