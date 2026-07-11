/** 패턴 배치 계산 — 순수 함수(렌더 무관). */

export interface LayoutPoint {
  x: number;
  y: number;
}

/** start~end 구간에 count개의 중심을 균등 분배한다(양끝 여백 포함). */
export function distributeCenters(count: number, start: number, end: number): number[] {
  if (count <= 0) return [];
  const span = end - start;
  const step = span / count;
  return Array.from({ length: count }, (_, i) => start + step * (i + 0.5));
}

/** 시계 12시(-90°)부터 시계방향으로 count개의 방사 위치. */
export function radialPositions(
  count: number,
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg = -90,
): Array<LayoutPoint & { angleDeg: number }> {
  return Array.from({ length: count }, (_, i) => {
    const angleDeg = startAngleDeg + (360 / count) * i;
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad), angleDeg };
  });
}

function polar(cx: number, cy: number, r: number, angleDeg: number): LayoutPoint {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** 도넛(링) 세그먼트 path — startDeg→endDeg 시계방향, 12시 기준은 호출부에서 -90 보정. */
export function donutSegmentPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number,
): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, startDeg);
  const p2 = polar(cx, cy, rOuter, endDeg);
  const p3 = polar(cx, cy, rInner, endDeg);
  const p4 = polar(cx, cy, rInner, startDeg);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}

/** viewBox 문자열에서 [x, y, w, h]를 파싱한다. 실패 시 fallback. */
export function parseViewBox(
  viewBox: string | undefined,
  fallback: [number, number, number, number],
): [number, number, number, number] {
  if (!viewBox) return fallback;
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return fallback;
  return parts as [number, number, number, number];
}
