/**
 * 누적 스택 배치 — 순수 함수(렌더 무관). StackedBar/Area(stacked)가 공유.
 * 양수 누적만 지원: 음수·NaN은 0으로 클램프(호출측이 warn). 음수 분리 적재는 후속.
 * ragged 시리즈는 최대 길이 기준, 누락 인덱스는 0. 정밀 검증은 stack.test.ts.
 */

export interface StackSpan {
  /** 누적 하한(이전 시리즈들의 합). */
  readonly y0: number;
  /** 누적 상한(y0 + 이 시리즈 값). */
  readonly y1: number;
}

/** series[s][c] → result[s][c] 누적 span. c축(카테고리)마다 시리즈를 0..S-1 순으로 쌓는다. */
export function stack(series: readonly (readonly number[])[]): StackSpan[][] {
  if (series.length === 0) return [];
  const clamp = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
  const cats = series.reduce((m, s) => Math.max(m, s.length), 0);
  const cum = new Array<number>(cats).fill(0);
  return series.map((s) => {
    const row: StackSpan[] = [];
    for (let c = 0; c < cats; c++) {
      const v = clamp(s[c] ?? 0);
      const y0 = cum[c];
      const y1 = y0 + v;
      cum[c] = y1;
      row.push({ y0, y1 });
    }
    return row;
  });
}
