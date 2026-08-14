import type { Point } from './anchors';

export type EdgeRouting = 'straight' | 'orthogonal' | 'curved';

export function straightPath(from: Point, to: Point): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

/**
 * 종단 세그먼트의 최소 길이(user unit).
 *
 * 마커는 전부 `orient="auto"`(atoms/Marker.tsx)라 **종단 세그먼트의 방향**을 그대로 쓴다.
 * 길이가 0이면 방향이 정의되지 않아 Chromium이 0°(오른쪽)로 그리고, 0은 아니어도 마커
 * (기본 한 변 8 user unit · `markerUnits="userSpaceOnUse"`)보다 짧으면 화살촉이 구간을
 * 통째로 덮어 보는 사람에게는 역시 옆을 본 그림이 된다. 정도 차이일 뿐 같은 결함이라
 * 한 값으로 판정한다.
 */
export const MIN_TERMINAL_SEGMENT = 8;

/** 좌표 산술 오차를 흡수하는 축 정렬 판정폭. */
const AXIS_EPSILON = 1e-6;

export function orthogonalPath(from: Point, to: Point, cornerRadius = 4): string {
  const mx = (from.x + to.x) / 2;
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);

  const rounded = cornerRadius > 0 && dx >= cornerRadius * 2 && dy >= cornerRadius * 2;
  const cr = rounded ? Math.min(cornerRadius, dx / 2, dy / 2) : 0;

  // 이 구현의 종단 구간은 어느 분기에서든 가로다 — 길이는 dx/2(모서리 없음) 또는 dx/2 - cr.
  // 그 길이가 마커에 먹히거나 세로 이동이 없으면 그릴 꺾임이 없다: 직선이 같은 그림이고,
  // 길이 0 종단이 사라져 마커 방향이 정의된다.
  if (dx / 2 - cr < MIN_TERMINAL_SEGMENT || dy <= AXIS_EPSILON) {
    return straightPath(from, to);
  }

  if (!rounded) {
    return `M ${from.x} ${from.y} L ${mx} ${from.y} L ${mx} ${to.y} L ${to.x} ${to.y}`;
  }

  const hDir = to.x >= from.x ? 1 : -1;
  const vDir = to.y >= from.y ? 1 : -1;

  return [
    `M ${from.x} ${from.y}`,
    `L ${mx - hDir * cr} ${from.y}`,
    `Q ${mx} ${from.y} ${mx} ${from.y + vDir * cr}`,
    `L ${mx} ${to.y - vDir * cr}`,
    `Q ${mx} ${to.y} ${mx + hDir * cr} ${to.y}`,
    `L ${to.x} ${to.y}`,
  ].join(' ');
}

export function curvedPath(from: Point, to: Point): string {
  const mx = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}`;
}

function dedupeConsecutive(pts: Point[]): Point[] {
  return pts.filter(
    (p, i) => i === 0 || Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) > AXIS_EPSILON,
  );
}

export function buildPath(
  from: Point,
  to: Point,
  routing: EdgeRouting,
  cornerRadius = 4,
  waypoints?: Point[],
): string {
  if (waypoints && waypoints.length > 0) {
    // 연속 중복 점은 길이 0 세그먼트가 된다 — from/to와 같은 waypoint를 준 호출자가 흔하다.
    // 마커 방향을 잃지 않도록 이어지는 같은 점을 접는다(남는 점이 하나뿐이면 직선으로).
    const pts = dedupeConsecutive([from, ...waypoints, to]);
    if (pts.length < 2) return straightPath(from, to);
    return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  }
  switch (routing) {
    case 'straight':    return straightPath(from, to);
    case 'curved':      return curvedPath(from, to);
    case 'orthogonal':
    default:            return orthogonalPath(from, to, cornerRadius);
  }
}
