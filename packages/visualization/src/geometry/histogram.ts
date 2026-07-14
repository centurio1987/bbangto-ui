/**
 * 히스토그램 구간(binning) — 순수 함수. 균등 구간 또는 명시 임계값(edges).
 * 우선순위: thresholds > bins. 마지막 빈만 닫힘 [x0,x1], 그 외 반열림 [x0,x1).
 * 빈 입력→[]. 동일값만→단일 빈. 정밀 검증은 histogram.test.ts.
 */

export interface HistogramBin {
  readonly x0: number;
  readonly x1: number;
  readonly count: number;
}

export interface HistogramOptions {
  /** 균등 구간 개수(기본 10). thresholds 지정 시 무시. */
  bins?: number;
  /** 명시 경계값(오름차순, 길이 ≥2). 지정 시 bins보다 우선. */
  thresholds?: readonly number[];
}

export function histogramBins(values: readonly number[], opts?: HistogramOptions): HistogramBin[] {
  if (values.length === 0) return [];
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return [];

  let edges: number[];
  if (opts?.thresholds && opts.thresholds.length >= 2) {
    edges = [...opts.thresholds];
  } else {
    const min = Math.min(...finite);
    const max = Math.max(...finite);
    if (min === max) return [{ x0: min, x1: max, count: finite.length }];
    const n = Math.max(1, Math.floor(opts?.bins ?? 10));
    const step = (max - min) / n;
    edges = Array.from({ length: n + 1 }, (_, i) => min + step * i);
    edges[n] = max; // 마지막 경계는 정확히 max
  }

  const bins: HistogramBin[] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const x0 = edges[i];
    const x1 = edges[i + 1];
    const isLast = i === edges.length - 2;
    const count = finite.filter((v) => v >= x0 && (isLast ? v <= x1 : v < x1)).length;
    bins.push({ x0, x1, count });
  }
  return bins;
}
