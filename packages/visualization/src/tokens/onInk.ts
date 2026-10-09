import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA } from '@centurio1987/bbangto-ui-tokens';
import type { NodeSemanticKind, VisualizationFoundation } from './types';

/**
 * 면 위 글자색 (KAN-061) — 패키지 내부 전용. 공개 API 로 내보내지 않는다.
 *
 * 면 토큰마다 그 위에 쓸 글자색을 하나 정한다. 가이드 글자색 넷을 순서대로 보고 처음으로
 * 면과 4.5:1 을 넘는 것을 쓰며, 넘는 것이 없으면 검정·흰색 중 대비가 큰 쪽을 쓴다.
 * 가이드가 `on` 에 직접 적은 값은 계산값을 이긴다.
 *
 * `visualizationFoundationToStyleObject` 가 결과를 `--bbangto-viz-on-*` 로 내므로, 템플릿은 보통
 * `vvar('on', 'palette', 'p1')` 를 쓴다. 데이터마다 투명도가 바뀌는 면만 `useVizFoundation()` 으로
 * 값을 받아 `pickOnInk(f, surfacesFor(f, 면색, 투명도))` 를 칸마다 부른다.
 *
 * 반투명 면(알파 < 1 · `none` · `transparent`)은 밑에 무엇이 깔릴지 모른다. 레인 띠처럼 템플릿이 까는
 * 옅은 반투명 검정이 비쳐 보이므로, canvas 위와 검정 `ON_INK_SHADE` 를 얹은 canvas 위 두 곳에서 모두
 * 4.5:1 을 넘는 글자색을 고른다. 그보다 짙은 음영을 까는 템플릿(IsometricScene)은 자기 음영을 얹은 면을
 * 넘겨 따로 고른다.
 */

/** 면 위 글자의 대비 하한. 면 하나에 글자색 하나라 글씨 크기를 모르므로 큰 글씨 기준(3)은 쓰지 않는다. */
export const ON_INK_MIN = 4.5;

/**
 * 반투명 면 밑에 깔릴 수 있는 검정 음영의 깊이 — 레인·풀 띠(2~3%)를 덮는 값이다. 30% 로 두면 칠하지 않은 면의
 * 글자가 가이드 강조색을 잃어(ink-line-duotone 파랑 → 검정) 입체 음영은 그 템플릿이 따로 고른다(KAN-061 검토 2번).
 */
export const ON_INK_SHADE = 0.05;

const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };
const BLACK: RGBA = { r: 0, g: 0, b: 0, a: 1 };

type PaletteKey = keyof VisualizationFoundation['palette'];
type C4Level = 'l1' | 'l2' | 'l3';

/** 면 토큰 → 그 위 글자색. `--bbangto-viz-on-*` 로 평탄화되는 모양과 같다. */
export interface OnInkMap {
  readonly palette: Record<PaletteKey, string>;
  readonly shape: { readonly fill: string };
  readonly canvas: { readonly bg: string };
  readonly c4: Record<C4Level, { readonly bgTint: string }>;
  readonly node: Record<NodeSemanticKind, { readonly fill: string }>;
}

/** 불투명 canvas. 반투명이면 흰색 위에 합성하고, 읽을 수 없으면 흰색이다. */
function canvasOf(f: VisualizationFoundation): RGBA {
  const c = parseColor(f.canvas.bg);
  return c ? compositeOver(c, WHITE) : WHITE;
}

/**
 * 면 색을 canvas 위에 합성한 불투명 색. `opacity` 는 면 알파에 곱한다(fill-opacity 와 같다).
 * `transparent`·`none`·`var()` 처럼 읽을 수 없는 값은 canvas 로 본다.
 */
export function surfaceOver(f: VisualizationFoundation, value: string, opacity = 1): RGBA {
  const canvas = canvasOf(f);
  const c = parseColor(value);
  if (!c) return canvas;
  return compositeOver({ ...c, a: c.a * opacity }, canvas);
}

/**
 * 글자색을 잴 면들. 불투명 면이면 canvas 위 하나, 반투명 면이면 canvas 위와 검정 음영을 얹은 canvas 위 둘이다.
 * `opacity` 가 1 보다 작으면 불투명 색도 반투명 면이다.
 */
export function surfacesFor(f: VisualizationFoundation, value: string, opacity = 1): RGBA[] {
  const c = parseColor(value);
  const plain = surfaceOver(f, value, opacity);
  if (c && c.a * opacity >= 1) return [plain];
  const shadedCanvas = compositeOver({ ...BLACK, a: ON_INK_SHADE }, canvasOf(f));
  const shaded = c ? compositeOver({ ...c, a: c.a * opacity }, shadedCanvas) : shadedCanvas;
  return [plain, shaded];
}

/** 대비가 가장 낮은 면에서의 대비. */
const worst = (ink: RGBA, surfaces: readonly RGBA[]): number =>
  Math.min(...surfaces.map((s) => contrastRatio(ink, s) ?? 0));

/**
 * 면(들) 위에 쓸 글자색. 모든 면에서 4.5:1 을 넘는 가이드 후보가 이기고, 없으면 검정·흰색이다.
 * 검정·흰색도 모든 면에서 넘지 못하면(중간 밝기 반투명 면) 첫 면 — 실제 바탕 — 에서 대비가 큰 쪽을 쓴다.
 * 불투명한 첫 면 위에서 검정·흰색 중 하나는 늘 4.5:1 을 넘는다.
 */
export function pickOnInk(f: VisualizationFoundation, surface: RGBA | readonly RGBA[]): string {
  const surfaces = Array.isArray(surface) ? (surface as readonly RGBA[]) : [surface as RGBA];
  const candidates = [f.edge.stroke, f.shape.stroke, f.boundary.labelColor, f.canvas.bg];
  for (const ink of candidates) {
    const c = parseColor(ink);
    if (!c || c.a < 1) continue;
    if (worst(c, surfaces) >= ON_INK_MIN) return ink;
  }
  const black = worst(BLACK, surfaces);
  const white = worst(WHITE, surfaces);
  if (Math.max(black, white) >= ON_INK_MIN) return black >= white ? '#000000' : '#FFFFFF';
  const first = surfaces.slice(0, 1);
  return worst(BLACK, first) >= worst(WHITE, first) ? '#000000' : '#FFFFFF';
}

/** foundation 하나의 면 토큰 전부에 글자색을 정한다. 가이드 `on` 값이 있으면 그것을 쓴다. */
export function deriveOnInk(f: VisualizationFoundation): OnInkMap {
  const o = f.on;
  const ink = (value: string, override: string | undefined) => override ?? pickOnInk(f, surfacesFor(f, value));
  const c4 = (l: C4Level) => ({ bgTint: ink(f.c4[l].bgTint, o?.c4?.[l]?.bgTint) });

  return {
    palette: Object.fromEntries(
      (Object.keys(f.palette) as PaletteKey[]).map((k) => [k, ink(f.palette[k], o?.palette?.[k])]),
    ) as Record<PaletteKey, string>,
    shape: { fill: ink(f.shape.fill, o?.shape?.fill) },
    canvas: { bg: o?.canvas?.bg ?? pickOnInk(f, canvasOf(f)) },
    c4: { l1: c4('l1'), l2: c4('l2'), l3: c4('l3') },
    node: Object.fromEntries(
      (Object.keys(f.node) as NodeSemanticKind[]).map((k) => [k, { fill: ink(f.node[k].fill, o?.node?.[k]?.fill) }]),
    ) as Record<NodeSemanticKind, { fill: string }>,
  };
}
