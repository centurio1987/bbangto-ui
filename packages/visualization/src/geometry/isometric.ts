/**
 * True isometric geometry 트랙 — 순수 함수(React 무관). 정밀 검증은 isometric.test.ts.
 *
 * `Iso_ColorBlock` 페인트 패밀리(Node `cube` 케이스의 가짜 2.5D 면 오버레이 재사용)와 달리
 * 여기는 **진짜 투영 geometry**다: 30° 투영 행렬 · painter's depth-sort · 바닥 축 커넥터
 * 라우팅 · floor cast shadow. 페인트와 직교하므로 임의 스타일 가이드 위에 합성 가능하다.
 *
 * 좌표계: world 3D → screen 2D.
 *   +x → 화면 down-right (cosα, sinα)
 *   +y → 화면 down-left  (−cosα, sinα)
 *   +z → 화면 up         (0, −1)
 * 세 축 스크린 벡터는 모두 길이 == scale(cos²+sin²=1). **α=30°에서만** 3축이 120° 등각(=true
 * isometric). 다른 α는 유효한 oblique 투영이나 iso는 아니다. `projectIso`는 임의 α에 대해
 * 유한값을 반환(clamp/throw 없음) — α∉(0,90) 사용은 호출자 책임이다.
 *
 * 접근성: 텍스트는 이 모듈로 skew/투영하지 않는다. 투영은 좌표에만 baking되고, 라벨은 렌더
 * 층에서 평면 `<text>`(SVG transform 없음)로 얹는다.
 */

import type { Point } from './anchors';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Axis-aligned 3D 박스 — near-min corner(x,y,z) + x/y/z축 크기(w,d,h). */
export interface Box3 {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
}

export interface IsoProjection {
  /** world (0,0,0)의 화면 위치. */
  origin: Point;
  /** world 단위 → 화면 px(축 벡터 길이). */
  scale: number;
  /** ground 축의 수평 기준 각도(도). 기본 30(=true iso). */
  angleDeg?: number;
}

const DEG = Math.PI / 180;

/** world 점을 화면 좌표로 투영한다. scale에 선형, origin에 가산(affine). */
export function projectIso(p: Vec3, proj: IsoProjection): Point {
  const a = (proj.angleDeg ?? 30) * DEG;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const s = proj.scale;
  return {
    x: proj.origin.x + (p.x - p.y) * cos * s,
    y: proj.origin.y + (p.x + p.y) * sin * s - p.z * s,
  };
}

export interface IsoPrismFaces {
  readonly top: Point[];
  readonly left: Point[];
  readonly right: Point[];
}

/**
 * 박스의 가시 세 면을 화면 폴리곤(각 4점)으로 반환한다.
 * 가시면 = +z(top) · +x(right, down-right, x=x1) · +y(left, down-left, y=y1).
 * 세 면의 정점 순서는 화면 winding 부호가 일치하도록 배열(향후 backface 판정 재사용 대비).
 */
export function isoPrismFaces(box: Box3, proj: IsoProjection): IsoPrismFaces {
  const x0 = box.x;
  const x1 = box.x + box.w;
  const y0 = box.y;
  const y1 = box.y + box.d;
  const z0 = box.z;
  const z1 = box.z + box.h;
  const P = (x: number, y: number, z: number) => projectIso({ x, y, z }, proj);
  return {
    top: [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)],
    right: [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)],
    // left는 winding 부호를 top/right와 맞추기 위해 z1→z0 순으로 배열.
    left: [P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0)],
  };
}

/** SVG path `d` — 폴리곤(닫힘). */
export function facePath(pts: Point[]): string {
  if (pts.length === 0) return '';
  return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';
}

/**
 * Painter's-algorithm depth key(near-min corner 합). 클수록 카메라에 가깝다(나중에 그림).
 * ground 타일링은 i+j 순, 수직 스택은 z0가 큰 쪽이 나중 → 위에 그려진다.
 * ⚠️ 스칼라 한계: 반대 축으로 오프셋되며 화면상 겹치는 두 박스는 오정렬될 수 있다
 * (비상호침투 axis-aligned 전제). 그런 씬은 `depthSortBoxes`에 위상 `compare`를 넘긴다:
 * `A.x+A.w≤B.x || A.y+A.d≤B.y || A.z+A.h≤B.z` 이면 A를 먼저 그린다.
 */
export function isoDepthKey(box: Box3): number {
  return box.x + box.y + box.z;
}

/** 박스를 far→near로 안정 정렬한다(기본 `isoDepthKey` 오름차순). */
export function depthSortBoxes<T extends { box: Box3 }>(
  items: T[],
  opts?: { compare?: (a: Box3, b: Box3) => number },
): T[] {
  const cmp = opts?.compare ?? ((a: Box3, b: Box3) => isoDepthKey(a) - isoDepthKey(b));
  return [...items].sort((p, q) => cmp(p.box, q.box));
}

export interface IsoConnector {
  readonly points: Point[];
  readonly d: string;
}

const EPS = 1e-9;

function dedupeConsecutive(pts: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - p.x) > EPS || Math.abs(last.y - p.y) > EPS) out.push(p);
  }
  return out;
}

/**
 * 두 world 점을 ground(수평) 두 축을 따라 L자로 라우팅한다. 세 점 모두 **공통 z**
 * (기본 `from.z`, `opts.z` 우선)에서 투영해 바닥에 붙인다(from.z≠to.z 시 사선 방지).
 * 단일 축(collinear) 입력은 중복 waypoint를 제거해 2점으로 붕괴한다.
 */
export function isoConnectorPath(
  from: Vec3,
  to: Vec3,
  proj: IsoProjection,
  opts?: { order?: 'xy' | 'yx'; z?: number },
): IsoConnector {
  const z = opts?.z ?? from.z;
  const order = opts?.order ?? 'xy';
  const waypoint: Vec3 =
    order === 'xy' ? { x: to.x, y: from.y, z } : { x: from.x, y: to.y, z };
  const world: Vec3[] = [{ x: from.x, y: from.y, z }, waypoint, { x: to.x, y: to.y, z }];
  const points = dedupeConsecutive(world.map((p) => projectIso(p, proj)));
  const d = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  return { points, d };
}

/**
 * 박스 바닥 사각형을 floor plane(기본 z=0)에 투영한 4점. 선택적 world XY offset으로
 * cast shadow 변위를 준다. ⚠️ 바닥 사각형 투영(박스 6점 실루엣 아님) = drop shadow 근사.
 * 떠 있는 박스(box.z>0)의 그림자는 근사상 동일 크기다.
 */
export function floorShadowPolygon(
  box: Box3,
  proj: IsoProjection,
  opts?: { floorZ?: number; offset?: { dx: number; dy: number } },
): Point[] {
  const z = opts?.floorZ ?? 0;
  const dx = opts?.offset?.dx ?? 0;
  const dy = opts?.offset?.dy ?? 0;
  const x0 = box.x + dx;
  const x1 = box.x + box.w + dx;
  const y0 = box.y + dy;
  const y1 = box.y + box.d + dy;
  const P = (x: number, y: number) => projectIso({ x, y, z }, proj);
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

export interface IsoGridLine {
  readonly a: Point;
  readonly b: Point;
}

export interface IsoExtent {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * 바닥 그리드 라인 — extent 기반(실제 셀 XY 범위, 비영/음수 origin 포함). x방향 라인은 각 y
 * 격자선을, y방향 라인은 각 x 격자선을 그린다. step≤0이면 빈 배열.
 */
export function isoFloorGrid(
  bounds: IsoExtent,
  step: number,
  proj: IsoProjection,
  opts?: { z?: number },
): IsoGridLine[] {
  if (step <= 0) return [];
  const z = opts?.z ?? 0;
  const { minX, maxX, minY, maxY } = bounds;
  const lines: IsoGridLine[] = [];
  const ny = Math.floor((maxY - minY) / step + EPS);
  for (let i = 0; i <= ny; i++) {
    const y = minY + i * step;
    lines.push({ a: projectIso({ x: minX, y, z }, proj), b: projectIso({ x: maxX, y, z }, proj) });
  }
  const nx = Math.floor((maxX - minX) / step + EPS);
  for (let i = 0; i <= nx; i++) {
    const x = minX + i * step;
    lines.push({ a: projectIso({ x, y: minY, z }, proj), b: projectIso({ x, y: maxY, z }, proj) });
  }
  return lines;
}

/**
 * 박스 집합을 viewBox에 맞추는 투영을 계산한다(순수 — auto-fit). 전 박스 8코너를 unit 투영
 * (origin 0·scale 1)해 screen bbox를 얻은 뒤 선형 fit한다.
 * 계약: `opts.scale`를 주면 그 값을 존중(min-align만, overflow 허용); 미지정이면 padding 내에
 * 완전히 들어가도록 scale 산출(span≤ε 축은 제외해 0-div 방지, 둘 다 붕괴면 scale=1).
 */
export function fitIsoProjection(
  boxes: Box3[],
  viewBox: [number, number, number, number],
  opts?: { pad?: number; angleDeg?: number; scale?: number },
): IsoProjection {
  const [vbX, vbY, vbW, vbH] = viewBox;
  const pad = opts?.pad ?? 8;
  const angleDeg = opts?.angleDeg ?? 30;

  if (boxes.length === 0) {
    return { origin: { x: vbX + vbW / 2, y: vbY + vbH / 2 }, scale: opts?.scale ?? 1, angleDeg };
  }

  const unit: IsoProjection = { origin: { x: 0, y: 0 }, scale: 1, angleDeg };
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const b of boxes) {
    for (const cx of [b.x, b.x + b.w]) {
      for (const cy of [b.y, b.y + b.d]) {
        for (const cz of [b.z, b.z + b.h]) {
          const p = projectIso({ x: cx, y: cy, z: cz }, unit);
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
      }
    }
  }

  const spanX = maxX - minX;
  const spanY = maxY - minY;
  let scale: number;
  if (opts?.scale != null) {
    scale = opts.scale;
  } else {
    const sx = spanX > EPS ? (vbW - 2 * pad) / spanX : Infinity;
    const sy = spanY > EPS ? (vbH - 2 * pad) / spanY : Infinity;
    scale = Math.min(sx, sy);
    if (!Number.isFinite(scale) || scale <= 0) scale = 1;
  }

  return {
    origin: { x: vbX + pad - minX * scale, y: vbY + pad - minY * scale },
    scale,
    angleDeg,
  };
}
