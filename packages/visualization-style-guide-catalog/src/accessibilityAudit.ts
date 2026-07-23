/**
 * viz accessibility over-claim 감사 — `VisualizationFoundation` 팔레트의 실측 WCAG 대비를
 * `meta.accessibility.contrastIntent` 선언과 대조한다. UI `auditContrast`의 viz 스키마판(KAN-026).
 *
 * UI는 `semantic.foreground/background` 단일 본문 쌍이지만 viz는 텍스트가 여러 표면에 놓인다.
 * foundation이 **명시적으로 선언한 텍스트 색 필드**를 각자의 배경 대비로 감사한다 —
 * 이는 **foundation 토큰 레벨 계약**이다(렌더 픽셀 정확 아님; wrapper가 표면을 바꿀 수 있음. UI 감사와 동일 계약):
 *   - `node.<kind>.tagColor` vs fill 표면(불투명 fill 위; fill:'none'인 라인 전용 스타일은 캔버스 위)
 *   - `c4.l{1,2,3}.labelColor` vs bgTint 표면(틴트 over 캔버스)
 *   - `boundary.labelColor` vs `canvas`  (경계 라벨; boundary엔 fill/tint 필드 없음)
 * 비텍스트(keyline/edge.stroke/shape.stroke/boundary.stroke)는 WCAG 3:1 기준이라 `contrastIntent`
 * (텍스트 대비)와 무관 → 감사 대상 아님(후속 카드로 분리). `contrastIntent`는 normal-text 보수 기준(aa=4.5/aaa=7).
 *
 * 순수 WCAG 수학(parse/extract/composite/contrast/effectiveBgColors/CONTRAST_THRESHOLDS)은 전부
 * `tokens/contrast.ts`에서 가져온다(UI 감사와 단일 SSOT 공유; viz→ui-catalog 결합 없음).
 */
import {
  parseColor,
  extractColors,
  compositeOver,
  contrastRatio,
  effectiveBgColors,
  CONTRAST_THRESHOLDS,
} from '@centurio1987/bbangto-ui-tokens';
import type { RGBA, StyleGuideMeta, VisualizationFoundation } from '@centurio1987/bbangto-ui-tokens';

/** over-claim 위반 1건. `measured:null`은 측정 불가(파싱 실패)로 over-claim 취급. */
export interface VizContrastViolation {
  readonly name: string;
  readonly presetKey: string;
  /** 위반 위치: `node.<kind>` | `c4.l1`|`c4.l2`|`c4.l3` | `boundary`. */
  readonly locus: string;
  readonly intent: 'aa' | 'aaa';
  readonly required: number;
  /** 선언된 텍스트 색(원본 리터럴). */
  readonly foreground: string;
  /** 선언된 배경(원본 리터럴 — c4는 bgTint, boundary/canvas는 canvas.bg, node는 fill). */
  readonly background: string;
  /** 합성/worst-case 후 실효 배경(rgba 문자열). 측정 불가 시 null. */
  readonly effectiveBackground: string | null;
  /** 그라디언트/틴트는 worst-case(최소) 대비. 측정 불가 시 null. */
  readonly measured: number | null;
  readonly reason: 'below-threshold' | 'unparseable-foreground' | 'unparseable-background';
}

/** 감사 최소 입력(duck-typed). viz `VisualizationStyleGuide`가 구조적으로 만족. */
export interface AuditableVizEntry {
  readonly name: string;
  readonly meta?: StyleGuideMeta;
  readonly foundations: VisualizationFoundation;
  readonly foundationPresets?: readonly { readonly key: string; readonly foundations: VisualizationFoundation }[];
}

const round = (n: number): number => Math.round(n * 100) / 100;
const rgbaStr = (c: RGBA): string => `rgba(${round(c.r)}, ${round(c.g)}, ${round(c.b)}, ${round(c.a)})`;

/**
 * 텍스트가 놓이는 표면 paint(node.fill·c4.bgTint)의 실효 배경색 후보들을 구한다(그라디언트 canvas면 여럿).
 * - **불투명 paint** → paint가 backdrop을 완전히 덮음 → `[paint]`(canvas 무관, canvas 미파싱이어도 측정 가능).
 * - `'none'`/`'transparent'`/alpha=0(paint 없음) → 텍스트는 캔버스 위 → `canvasEff`(라인 전용 `fill:'none'` 대표 케이스).
 * - **반투명 paint** → 각 canvas 위 합성 → `canvasEff.map(compositeOver)`.
 * - 파싱 불가(var 등) → `[null]`(측정 불가 = 위반; canvas로 은폐하지 않음).
 * - paint가 canvas에 의존하는데 canvas가 비어있음(미파싱) → `[null]`.
 */
function surfaceBg(paint: string, canvasEff: readonly RGBA[]): (RGBA | null)[] {
  const p = paint.trim();
  const onCanvas = (): (RGBA | null)[] => (canvasEff.length ? [...canvasEff] : [null]);
  if (p === 'none' || p === 'transparent') return onCanvas();
  const pc = parseColor(p);
  if (!pc) return [null];
  if (pc.a <= 0) return onCanvas();
  if (pc.a >= 1) return [pc];
  return canvasEff.length ? canvasEff.map((c) => compositeOver(pc, c)) : [null];
}

type PairCtx = {
  readonly name: string;
  readonly presetKey: string;
  readonly locus: string;
  readonly intent: 'aa' | 'aaa';
  readonly required: number;
};

/**
 * fg(텍스트) vs bgColors(실효 배경 후보들) 대비를 판정. 배경이 여럿(그라디언트/틴트)이면 worst-case.
 * fg 파싱 불가·bg 비어있음/일부 null(파싱 불가)은 silent skip이 아니라 violation으로 올린다.
 */
function evalPair(
  fg: string,
  bgRaw: string,
  bgColors: readonly (RGBA | null)[],
  ctx: PairCtx,
): VizContrastViolation | null {
  const base = { ...ctx, foreground: fg, background: bgRaw } as const;
  const fgc = parseColor(fg);
  if (!fgc) {
    return { ...base, effectiveBackground: null, measured: null, reason: 'unparseable-foreground' };
  }
  if (bgColors.length === 0 || bgColors.some((c) => c == null)) {
    return { ...base, effectiveBackground: null, measured: null, reason: 'unparseable-background' };
  }

  let worst = Infinity;
  let worstColor: RGBA | null = null;
  for (const c of bgColors as readonly RGBA[]) {
    const ratio = contrastRatio(fgc, c);
    if (ratio != null && ratio < worst) {
      worst = ratio;
      worstColor = c;
    }
  }
  if (worst !== Infinity && worst + 1e-6 < ctx.required) {
    return {
      ...base,
      effectiveBackground: worstColor ? rgbaStr(worstColor) : null,
      measured: round(worst),
      reason: 'below-threshold',
    };
  }
  return null;
}

/**
 * catalog를 순회하며 contrastIntent(aa/aaa) over-claim을 수집한다. 빈 배열 = 과대주장 없음.
 * low·미저작은 대상 아님(skip). foundationPresets가 있으면 전 preset을, 없으면 base 1개를 감사한다.
 */
export function auditVizContrast(catalog: readonly AuditableVizEntry[]): VizContrastViolation[] {
  const out: VizContrastViolation[] = [];

  for (const sg of catalog) {
    const intent = sg.meta?.accessibility?.contrastIntent;
    if (intent !== 'aa' && intent !== 'aaa') continue;
    const required = CONTRAST_THRESHOLDS[intent];

    const presets: readonly { key: string; foundations: VisualizationFoundation }[] =
      sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations }];

    for (const p of presets) {
      const f = p.foundations;
      const ctx = { name: sg.name, presetKey: p.key, intent, required } as const;
      const canvasEff = effectiveBgColors(extractColors(f.canvas.bg));

      // (A) node 텍스트: tagColor vs (fill 표면). 불투명 fill이면 fill, fill:'none'(라인 전용)이면 캔버스 위.
      //     kind 하드코딩 없이 Object.entries 순회.
      for (const [kind, style] of Object.entries(f.node)) {
        const bgColors = surfaceBg(style.fill, canvasEff);
        const v = evalPair(style.tagColor, style.fill, bgColors, { ...ctx, locus: `node.${kind}` });
        if (v) out.push(v);
      }

      // (B) c4 라벨: labelColor vs (bgTint 표면 over canvas), worst-case.
      for (const level of ['l1', 'l2', 'l3'] as const) {
        const c4 = f.c4[level];
        const bgColors = surfaceBg(c4.bgTint, canvasEff);
        const v = evalPair(c4.labelColor, c4.bgTint, bgColors, { ...ctx, locus: `c4.${level}` });
        if (v) out.push(v);
      }

      // (C) boundary 라벨: labelColor vs canvas(그라디언트면 worst-case).
      const vb = evalPair(f.boundary.labelColor, f.canvas.bg, canvasEff, { ...ctx, locus: 'boundary' });
      if (vb) out.push(vb);
    }
  }

  return out;
}

/** 위반 목록을 사람이 읽기 좋은 한 줄 목록으로 포맷(테스트 실패 메시지·CI 로그용). */
export function formatVizViolations(violations: readonly VizContrastViolation[]): string {
  if (violations.length === 0) return 'no violations (위반 없음)';
  return violations
    .map((v) => {
      const eff = v.effectiveBackground ?? v.background;
      const m = v.measured == null ? 'n/a' : String(v.measured);
      return `${v.name}/${v.presetKey} ${v.locus}: ${v.foreground} on ${eff} = ${m} (< ${v.required}) [${v.reason}]`;
    })
    .join('\n');
}
