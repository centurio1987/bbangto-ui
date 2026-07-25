/** 차트 스케일·틱 — 순수 함수(렌더 무관). 정밀 검증은 scale.test.ts. */

/** 선형 스케일: domain 값을 range 픽셀로 매핑. degenerate domain은 range 시작으로 붕괴(NaN 방지). */
export function linearScale(
  domain: readonly [number, number],
  range: readonly [number, number],
): (v: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0;
  return (v: number) => (span === 0 ? r0 : r0 + ((v - d0) / span) * (r1 - r0));
}

export interface BandScale {
  /** 밴드 하나의 폭. */
  readonly bandwidth: number;
  /** 밴드 간 간격(폭+패딩). */
  readonly step: number;
  /** i번째 밴드 시작 좌표. */
  position(index: number): number;
  /** i번째 밴드 중심 좌표. */
  center(index: number): number;
}

/** 범주형 밴드 스케일(d3-band 근사). count개 밴드를 range에 패딩 포함 균등 배치. */
export function bandScale(
  count: number,
  range: readonly [number, number],
  opts?: { paddingInner?: number; paddingOuter?: number },
): BandScale {
  const paddingInner = opts?.paddingInner ?? 0.2;
  const paddingOuter = opts?.paddingOuter ?? paddingInner;
  const [r0, r1] = range;
  if (count <= 0) {
    return { bandwidth: 0, step: 0, position: () => r0, center: () => r0 };
  }
  const span = r1 - r0;
  const step = span / (count - paddingInner + 2 * paddingOuter);
  const bandwidth = step * (1 - paddingInner);
  const start = r0 + step * paddingOuter;
  return {
    bandwidth,
    step,
    position: (i: number) => start + step * i,
    center: (i: number) => start + step * i + bandwidth / 2,
  };
}

/** [min,max]를 사람 친화적 간격으로 나눈 틱 값 배열. degenerate range는 단일 틱. */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const range = max - min;
  const rawStep = range / Math.max(1, count);
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / mag;
  const niceNorm = norm >= 7.5 ? 10 : norm >= 3 ? 5 : norm >= 1.5 ? 2 : 1;
  const step = niceNorm * mag;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let t = start; t <= max + step * 1e-9; t += step) {
    ticks.push(Number(t.toFixed(10)));
  }
  return ticks;
}
