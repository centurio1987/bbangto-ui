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
