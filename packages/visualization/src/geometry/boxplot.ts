/**
 * Boxplot(box-and-whisker) 요약 통계 — 순수 함수. Tukey 방식.
 * 선형보간 사분위 + 1.5×IQR whisker/outlier. 정밀 검증은 boxplot.test.ts.
 */

export interface FiveNumber {
  /** 데이터 최솟값(outlier 포함). */
  readonly min: number;
  readonly q1: number;
  readonly median: number;
  readonly q3: number;
  /** 데이터 최댓값(outlier 포함). */
  readonly max: number;
  readonly iqr: number;
  /** 하단 fence(q1-1.5·IQR) 이상인 최소 관측값(whisker 끝). */
  readonly whiskerLow: number;
  /** 상단 fence(q3+1.5·IQR) 이하인 최대 관측값(whisker 끝). */
  readonly whiskerHigh: number;
  /** fence 밖 관측값. */
  readonly outliers: number[];
}

/** 정렬된 배열에서 p분위(0~1) 선형보간(type-7). */
function quantileSorted(sorted: readonly number[], p: number): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  if (n === 1) return sorted[0];
  const idx = (n - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  const h = idx - lo;
  return sorted[lo] * (1 - h) + sorted[hi] * h;
}

/** 원시 값 배열 → 5수 요약. 빈 배열은 undefined. */
export function boxplotSummary(values: readonly number[]): FiveNumber | undefined {
  if (!values.length) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = quantileSorted(sorted, 0.25);
  const median = quantileSorted(sorted, 0.5);
  const q3 = quantileSorted(sorted, 0.75);
  const iqr = q3 - q1;
  const lowFence = q1 - 1.5 * iqr;
  const highFence = q3 + 1.5 * iqr;

  const outliers = sorted.filter((v) => v < lowFence || v > highFence);
  const inRange = sorted.filter((v) => v >= lowFence && v <= highFence);
  const whiskerLow = inRange.length ? inRange[0] : sorted[0];
  const whiskerHigh = inRange.length ? inRange[inRange.length - 1] : sorted[sorted.length - 1];

  return {
    min: sorted[0],
    q1,
    median,
    q3,
    max: sorted[sorted.length - 1],
    iqr,
    whiskerLow,
    whiskerHigh,
    outliers,
  };
}
