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

/**
 * 경로의 가운데 — 선을 따라 잰 길이의 절반 지점(KAN-082, 간선 라벨을 놓는 곳).
 *
 * 경유점이 없으면 세 방식 모두 두 끝점의 중점이다. 직선은 그대로이고, 직각 경로(`orthogonalPath`)는
 * 가로 dx/2 · 세로 dy · 가로 dx/2 로 대칭이라 절반 지점이 세로 구간의 가운데(= 중점)에 오며, 모서리를
 * 둥글게 깎아도 양쪽이 같은 만큼 깎여 그대로다. 곡선(`curvedPath`)도 제어점이 중점에 대해 대칭이라
 * t=0.5 가 길이의 절반이고 그 점이 중점이다. 경유점이 있으면 꺾은선의 길이를 재어 절반 지점을 찾는다.
 */
export function pathMidpoint(
  from: Point,
  to: Point,
  _routing: EdgeRouting,
  waypoints?: Point[],
): Point {
  if (waypoints && waypoints.length > 0) {
    const pts = dedupeConsecutive([from, ...waypoints, to]);
    if (pts.length >= 2) {
      const lens = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
      let rest = lens.reduce((a, b) => a + b, 0) / 2;
      for (let i = 0; i < lens.length; i++) {
        if (rest <= lens[i] || i === lens.length - 1) {
          const t = lens[i] === 0 ? 0 : Math.min(1, rest / lens[i]);
          return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t };
        }
        rest -= lens[i];
      }
    }
  }
  return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
}

/**
 * 경로 양 끝에서 경로 안쪽으로 향하는 단위 방향(KAN-082, 끝 라벨 자리).
 *
 * `buildPath` 가 낸 문자열(M · L · Q · C, 절대 좌표)에서 좌표쌍을 차례로 읽어, 시작점과 다른 첫 좌표와
 * 끝점과 다른 마지막 좌표를 본다. L 은 다음 꼭짓점, Q · C 는 제어점이라 곡선이어도 양 끝의 접선 방향이 된다.
 * 경로 계산을 여기에 다시 적지 않고 그린 경로를 읽으므로 그림과 어긋나지 않는다.
 */
export function terminalDirections(d: string): { start: Point; end: Point } {
  const nums = (d.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
  const pts: Point[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: nums[i], y: nums[i + 1] });
  const toward = (from: Point, list: Point[]): Point => {
    for (const p of list) {
      const dx = p.x - from.x;
      const dy = p.y - from.y;
      const l = Math.hypot(dx, dy);
      if (l > AXIS_EPSILON) return { x: dx / l, y: dy / l };
    }
    return { x: 1, y: 0 };
  };
  if (pts.length === 0) return { start: { x: 1, y: 0 }, end: { x: -1, y: 0 } };
  const first = pts[0];
  const last = pts[pts.length - 1];
  return { start: toward(first, pts.slice(1)), end: toward(last, pts.slice(0, -1).reverse()) };
}

/**
 * 선 끝 근처 라벨(다중성 같은 것)의 중심 — 끝점에서 경로 안쪽으로 조금 들어가 선 옆에 놓는다(KAN-082).
 *
 * 선 옆은 늘 위쪽이나 왼쪽으로 고른다(가로선은 위, 세로선은 왼쪽) — 양 끝 라벨이 같은 쪽에 있어야 읽기 쉽다.
 * 경로를 따라 들어가는 거리는 라벨 상자가 끝 노드에 닿지 않게, 옆으로 비키는 거리는 상자가 선에 닿지 않게 잡는다.
 *
 * @param end 끝점 · @param dir 끝점에서 경로 안쪽으로 향하는 단위 방향(`terminalDirections`)
 * @param box 라벨 상자 크기 · @param gap 상자와 선 · 노드 사이 여백
 */
export function endLabelCenter(
  end: Point,
  dir: Point,
  box: { width: number; height: number },
  gap = 4,
): Point {
  let px = dir.y;
  let py = -dir.x;
  if (py > AXIS_EPSILON || (Math.abs(py) <= AXIS_EPSILON && px > 0)) {
    px = -px;
    py = -py;
  }
  // 상자 중심에서 방향 v 로 상자 가장자리까지의 거리(축 정렬 상자의 지지 함수)
  const reach = (vx: number, vy: number) => (Math.abs(vx) * box.width + Math.abs(vy) * box.height) / 2;
  const along = reach(dir.x, dir.y) + gap;
  const side = reach(px, py) + gap;
  return { x: end.x + dir.x * along + px * side, y: end.y + dir.y * along + py * side };
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
