/**
 * 퍼널 사다리꼴 꼭짓점 — 순수 함수. 값 비례 폭 축소, 수평 중앙 정렬.
 * 각 단계 top 폭 ∝ value[i], bottom 폭 ∝ value[i+1](마지막은 자기 값).
 * 음수→0, 전체 0→[]. 0값도 최소 가시 폭(minWidth) 유지. 정밀 검증은 funnel.test.ts.
 */

export interface FunnelTrapezoid {
  readonly topL: number;
  readonly topR: number;
  readonly botL: number;
  readonly botR: number;
  readonly top: number;
  readonly bottom: number;
}

export interface FunnelOptions {
  width: number;
  height: number;
  /** 0값 단계도 이 폭(px)은 유지(라인처럼 보이도록). 기본 2. */
  minWidth?: number;
}

export function funnelTrapezoids(values: readonly number[], opts: FunnelOptions): FunnelTrapezoid[] {
  const { width, height, minWidth = 2 } = opts;
  const clamp = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
  const vals = values.map(clamp);
  if (vals.length === 0) return [];
  const maxV = Math.max(...vals);
  if (maxV === 0) return [];

  const n = vals.length;
  const bandH = height / n;
  const cx = width / 2;
  const halfW = (v: number) => Math.max(minWidth, (v / maxV) * width) / 2;

  const out: FunnelTrapezoid[] = [];
  for (let i = 0; i < n; i++) {
    const topHalf = halfW(vals[i]);
    const botHalf = halfW(vals[i + 1] ?? vals[i]);
    out.push({
      topL: cx - topHalf,
      topR: cx + topHalf,
      botL: cx - botHalf,
      botR: cx + botHalf,
      top: bandH * i,
      bottom: bandH * (i + 1),
    });
  }
  return out;
}
