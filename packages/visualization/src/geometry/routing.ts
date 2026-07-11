import type { Point } from './anchors';

export type EdgeRouting = 'straight' | 'orthogonal' | 'curved';

export function straightPath(from: Point, to: Point): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

export function orthogonalPath(from: Point, to: Point, cornerRadius = 4): string {
  const mx = (from.x + to.x) / 2;
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);

  if (cornerRadius <= 0 || dx < cornerRadius * 2 || dy < cornerRadius * 2) {
    return `M ${from.x} ${from.y} L ${mx} ${from.y} L ${mx} ${to.y} L ${to.x} ${to.y}`;
  }

  const hDir = to.x >= from.x ? 1 : -1;
  const vDir = to.y >= from.y ? 1 : -1;
  const cr = Math.min(cornerRadius, dx / 2, dy / 2);

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

export function buildPath(
  from: Point,
  to: Point,
  routing: EdgeRouting,
  cornerRadius = 4,
  waypoints?: Point[],
): string {
  if (waypoints && waypoints.length > 0) {
    const pts = [from, ...waypoints, to];
    return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  }
  switch (routing) {
    case 'straight':    return straightPath(from, to);
    case 'curved':      return curvedPath(from, to);
    case 'orthogonal':
    default:            return orthogonalPath(from, to, cornerRadius);
  }
}
