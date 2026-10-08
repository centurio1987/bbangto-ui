/**
 * WCAG 2.x 대비(contrast) 계산 유틸 — 프레임워크 독립 순수 함수.
 *
 * foundation 팔레트의 색 문자열(hex/rgb/rgba)에서 상대휘도·대비비를 계산한다. 알파가 있는 색은
 * 배경 위에 합성(composite)한 뒤 계산한다. style-guide-catalog의 accessibility 감사(auditContrast)와
 * Storybook 대비 검증 play가 공유한다. (KAN-024)
 */

/** 파싱된 색. r/g/b는 0~255, a(알파)는 0~1. */
export interface RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

const clampByte = (n: number): number => (n < 0 ? 0 : n > 255 ? 255 : n);

/**
 * 색 문자열 → RGBA. 지원: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`, `rgb(r,g,b)`, `rgba(r,g,b,a)`.
 * 파싱 불가(gradient·var()·명명색 등) 시 null.
 */
export function parseColor(input: string): RGBA | null {
  const s = input.trim();

  // hex
  if (s.startsWith('#')) {
    const h = s.slice(1);
    const hx = (a: number, b: number) => parseInt(h.slice(a, b), 16);
    if (h.length === 3 || h.length === 4) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1;
      return Number.isNaN(r + g + b + a) ? null : { r, g, b, a };
    }
    if (h.length === 6 || h.length === 8) {
      const r = hx(0, 2);
      const g = hx(2, 4);
      const b = hx(4, 6);
      const a = h.length === 8 ? hx(6, 8) / 255 : 1;
      return Number.isNaN(r + g + b + a) ? null : { r, g, b, a };
    }
    return null;
  }

  // rgb()/rgba()
  const m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/i);
  if (m) {
    const r = clampByte(Number(m[1]));
    const g = clampByte(Number(m[2]));
    const b = clampByte(Number(m[3]));
    let a = 1;
    if (m[4] != null) a = m[4].endsWith('%') ? Number(m[4].slice(0, -1)) / 100 : Number(m[4]);
    return Number.isNaN(r + g + b + a) ? null : { r, g, b, a: a < 0 ? 0 : a > 1 ? 1 : a };
  }

  return null;
}

/**
 * CSS 색 문자열에서 파싱 가능한 색을 모두 추출한다. 단색이면 `[색]`, 그라디언트
 * (`linear-gradient(...)`/`radial-gradient(...)`)면 전 색 스톱을 반환한다. 색이 없으면 `[]`.
 * 그라디언트 배경 위 텍스트 대비는 이 스톱들 중 최악(min contrast)으로 판정한다.
 */
export function extractColors(input: string): RGBA[] {
  const single = parseColor(input);
  if (single) return [single];
  const out: RGBA[] = [];
  const re = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/gi;
  for (const m of input.match(re) ?? []) {
    const c = parseColor(m);
    if (c) out.push(c);
  }
  return out;
}

/** 순백색(알파 합성 기본 backdrop). */
const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };

/** fg를 (불투명 가정) bg 위에 알파 합성 → 불투명 RGBA. */
export function compositeOver(fg: RGBA, bg: RGBA): RGBA {
  if (fg.a >= 1) return { ...fg, a: 1 };
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

/** WCAG 상대휘도(relative luminance). 알파 무시(불투명 색 기준). */
export function relativeLuminance(c: RGBA): number {
  const f = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}

const toRGBA = (c: string | RGBA): RGBA | null => (typeof c === 'string' ? parseColor(c) : c);

/**
 * WCAG 대비비. 파싱 불가 시 null. 알파가 있으면 합성 후 계산:
 * bg는 불투명 배경(반투명 시 흰색 위) 기준, fg는 그 bg 위에 합성한다.
 */
export function contrastRatio(a: string | RGBA, b: string | RGBA): number | null {
  const fg = toRGBA(a);
  const bg = toRGBA(b);
  if (!fg || !bg) return null;
  const bgOpaque = bg.a < 1 ? compositeOver(bg, WHITE) : bg;
  const fgOpaque = fg.a < 1 ? compositeOver(fg, bgOpaque) : fg;
  const l1 = relativeLuminance(fgOpaque);
  const l2 = relativeLuminance(bgOpaque);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** contrastIntent → 본문/라벨 텍스트 WCAG 대비 하한(normal-text 보수 기준). low는 무제약(0). */
export const CONTRAST_THRESHOLDS = { low: 0, aa: 4.5, aaa: 7 } as const;

/**
 * 레이어드 CSS 배경의 색 스톱들을 "실효 불투명색"으로 해석한다. 그라디언트는 보통 반투명
 * 오버레이 여러 겹 + 트레일링 solid 바탕(base) 구조라, 반투명/투명 스톱은 그 base 위에 합성한다
 * (투명 페이드 스톱을 흰색 위에 얹어 생기는 false 저대비 방지). 텍스트 대비는 이 실효색들 중 최악.
 * style-guide-catalog(UI)·visualization-style-guide-catalog(viz) 감사가 공유하는 순수 WCAG 헬퍼.
 */
export function effectiveBgColors(stops: readonly RGBA[]): RGBA[] {
  const opaque = stops.filter((s) => s.a >= 1);
  const backdrop = opaque.length ? opaque[opaque.length - 1] : WHITE;
  return stops.map((s) => (s.a >= 1 ? s : compositeOver(s, backdrop)));
}

/** 포커스 표시(테두리)가 이웃 배경과 가져야 하는 대비 하한 — WCAG 1.4.11 비텍스트 대비. (KAN-060) */
export const FOCUS_CONTRAST_MIN = 3;

/** 화면 표면 둘(base·elevated)의 실효 불투명색. 그라디언트면 스톱마다 한 색이다. */
export interface SurfaceColors {
  readonly base: RGBA[];
  readonly elevated: RGBA[];
}

/**
 * `background.base`·`background.elevated` 를 실제로 화면에 깔리는 불투명색으로 푼다.
 *
 * base 는 `effectiveBgColors` 그대로다. elevated 는 불투명 색(스톱)이 하나도 없으면 흰색이 아니라 **base 의 각 색
 * 위에** 합성한다 — 유리 효과 카드처럼 `rgba(255,255,255,0.08)` 인 표면은 실제로 어두운 base 위에 깔리므로, 흰색
 * 위로 재면 있지도 않은 저대비가 나온다. 불투명 스톱이 있으면 그 자체로 푼다. 색을 못 읽은 표면은 빈 배열이다.
 */
export function surfaceColors(background: { readonly base: string; readonly elevated: string }): SurfaceColors {
  const base = effectiveBgColors(extractColors(background.base));
  const elevStops = extractColors(background.elevated);
  const elevated = elevStops.some((s) => s.a >= 1)
    ? effectiveBgColors(elevStops)
    : elevStops.flatMap((s) => base.map((b) => compositeOver(s, b)));
  return { base, elevated };
}

/** `focusContrast` 결과 — 최저 대비와 그 값이 나온 표면. */
export interface FocusContrast {
  readonly ratio: number;
  readonly against: 'base' | 'elevated';
}

/**
 * `border.focus` 와 화면 표면(base·elevated, `surfaceColors`) 사이의 최저 대비. 포커스 테두리는 페이지 바탕에도
 * 카드·팝오버 위에도 그려지므로 둘 중 낮은 쪽이 그 색 스킴의 값이다. 포커스 색이나 표면 색을 못 읽으면 null —
 * 감사는 null 을 통과로 두지 않는다. foundation·style guide 포커스 대비 게이트가 공유한다. (KAN-060)
 */
export function focusContrast(semantic: {
  readonly border: { readonly focus: string };
  readonly background: { readonly base: string; readonly elevated: string };
}): FocusContrast | null {
  const focus = parseColor(semantic.border.focus);
  const surfaces = surfaceColors(semantic.background);
  if (!focus || !surfaces.base.length || !surfaces.elevated.length) return null;
  let worst: FocusContrast | null = null;
  for (const against of ['base', 'elevated'] as const) {
    for (const bg of surfaces[against]) {
      const ratio = contrastRatio(focus, bg);
      if (ratio != null && (worst == null || ratio < worst.ratio)) worst = { ratio, against };
    }
  }
  return worst;
}
