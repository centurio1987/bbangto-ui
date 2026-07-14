/**
 * 워터폴 단계 누적 — 순수 함수. 각 값은 delta(증감), running total로 start/end 산출.
 * 음수 delta 정식 지원(감소 막대). showTotal→마지막에 0~누적합 total 막대.
 * 빈 입력→[]. 정밀 검증은 waterfall.test.ts.
 */

export interface WaterfallStep {
  readonly start: number;
  readonly end: number;
  readonly delta: number;
  readonly isTotal: boolean;
}

export interface WaterfallOptions {
  /** 마지막에 0~최종누적 total 막대를 추가. */
  showTotal?: boolean;
}

export function waterfallSteps(values: readonly number[], opts?: WaterfallOptions): WaterfallStep[] {
  const steps: WaterfallStep[] = [];
  let running = 0;
  for (const v of values) {
    const d = Number.isFinite(v) ? v : 0;
    const start = running;
    running += d;
    steps.push({ start, end: running, delta: d, isTotal: false });
  }
  if (opts?.showTotal && values.length > 0) {
    steps.push({ start: 0, end: running, delta: running, isTotal: true });
  }
  return steps;
}
