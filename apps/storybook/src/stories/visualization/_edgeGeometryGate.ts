/**
 * 엣지 기하 게이트 — 마커가 방향을 잃은 엣지를 잡는다.
 *
 * 마커는 전부 `orient="auto"`(visualization/src/atoms/Marker.tsx)라 **종단 세그먼트의 방향**을
 * 그대로 쓴다. 종단이 길이 0이면 방향이 정의되지 않아 Chromium이 0°(오른쪽)로 그린다 —
 * 세로로 내려가는 화살표의 화살촉만 옆을 보는 그림이 조용히 남는다.
 *
 * 판정 규칙은 상류 이슈를 올린 클라이언트 저장소의 게이트(`resume/scripts/render-core.ts`의
 * `inspectEdgeGeometry`)와 같다 — 여기가 초록이면 그쪽도 초록이어야 한다.
 *
 * preview.tsx의 `afterEach`에 걸려 **모든 스토리**에 적용된다(카드 KAN-042 · S3).
 */

export interface EdgeGeometryDefect {
  id: string;
  end: 'start' | 'end';
  d: string;
}

/** 길이 0 판정폭 — 클라이언트 게이트와 같은 0.5. */
const SAME_POINT_EPS = 0.5;

/** d 문자열에서 각 명령의 끝점만 뽑는다(Q·C는 제어점을 버리고 마지막 좌표쌍). */
export function pathEndpoints(d: string): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (const m of d.matchAll(/([MLQCmlqc])([^MLQCZmlqcz]*)/g)) {
    const n = (m[2].trim().match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    if (n.length >= 2) out.push({ x: n[n.length - 2], y: n[n.length - 1] });
  }
  return out;
}

export function terminalLengths(d: string): { start: number; end: number } {
  const p = pathEndpoints(d);
  if (p.length < 2) return { start: 0, end: 0 };
  const len = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(b.x - a.x, b.y - a.y);
  return { start: len(p[0], p[1]), end: len(p[p.length - 2], p[p.length - 1]) };
}

export function edgeGeometryDefects(root: ParentNode): EdgeGeometryDefect[] {
  const defects: EdgeGeometryDefect[] = [];
  const edges = Array.from(root.querySelectorAll('path[data-bbangto-viz-edge]'));

  edges.forEach((el, i) => {
    const d = el.getAttribute('d') ?? '';
    if (pathEndpoints(d).length < 2) return;
    const id = el.getAttribute('data-bbangto-viz-edge-id') || `#${i}`;
    const { start, end } = terminalLengths(d);
    // 마커가 붙은 쪽만 문제다 — 마커 없는 선은 방향을 그리지 않는다.
    if (el.getAttribute('marker-end') && end < SAME_POINT_EPS) defects.push({ id, end: 'end', d });
    if (el.getAttribute('marker-start') && start < SAME_POINT_EPS) {
      defects.push({ id, end: 'start', d });
    }
  });

  return defects;
}

export function assertEdgeMarkersOriented(root: ParentNode, label: string): void {
  const defects = edgeGeometryDefects(root);
  if (!defects.length) return;
  throw new Error(
    `[엣지 기하] 종단 세그먼트 길이 0 — 마커가 방향을 잃은 엣지 ${defects.length}건 (${label}).\n` +
      defects.map((d) => `  ${d.id} · ${d.end}\n    d="${d.d}"`).join('\n'),
  );
}
