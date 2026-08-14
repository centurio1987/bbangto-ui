import type { BBox } from '../types/data';

export type NodeShape =
  | 'rect'
  | 'rounded'
  | 'stadium'
  | 'circle'
  | 'ellipse'
  | 'diamond'
  | 'cylinder'
  | 'hexagon'
  | 'parallelogram'
  | 'trapezoid'
  | 'subroutine'
  | 'doubleCircle'
  | 'cube'
  | 'component'
  | 'folder';

export function rectPath({ x, y, width, height }: BBox): string {
  return `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
}

export function roundedPath({ x, y, width, height }: BBox, r = 8): string {
  const cr = Math.min(r, width / 2, height / 2);
  return (
    `M ${x + cr} ${y} ` +
    `h ${width - 2 * cr} ` +
    `q ${cr} 0 ${cr} ${cr} ` +
    `v ${height - 2 * cr} ` +
    `q 0 ${cr} ${-cr} ${cr} ` +
    `h ${-(width - 2 * cr)} ` +
    `q ${-cr} 0 ${-cr} ${-cr} ` +
    `v ${-(height - 2 * cr)} ` +
    `q 0 ${-cr} ${cr} ${-cr} Z`
  );
}

export function stadiumPath({ x, y, width, height }: BBox): string {
  const r = height / 2;
  return (
    `M ${x + r} ${y} ` +
    `h ${width - 2 * r} ` +
    `a ${r} ${r} 0 0 1 0 ${height} ` +
    `h ${-(width - 2 * r)} ` +
    `a ${r} ${r} 0 0 1 0 ${-height} Z`
  );
}

export function circlePath({ x, y, width, height }: BBox): string {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const r = Math.min(width, height) / 2;
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
}

export function ellipsePath({ x, y, width, height }: BBox): string {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const rx = width / 2;
  const ry = height / 2;
  return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;
}

export function diamondPath({ x, y, width, height }: BBox): string {
  const cx = x + width / 2;
  const cy = y + height / 2;
  return `M ${cx} ${y} L ${x + width} ${cy} L ${cx} ${y + height} L ${x} ${cy} Z`;
}

export function hexagonPath({ x, y, width, height }: BBox): string {
  const w4 = width / 4;
  return (
    `M ${x + w4} ${y} ` +
    `L ${x + width - w4} ${y} ` +
    `L ${x + width} ${y + height / 2} ` +
    `L ${x + width - w4} ${y + height} ` +
    `L ${x + w4} ${y + height} ` +
    `L ${x} ${y + height / 2} Z`
  );
}

export function parallelogramPath({ x, y, width, height }: BBox, skew = 20): string {
  const s = Math.min(skew, width / 3);
  return (
    `M ${x + s} ${y} L ${x + width} ${y} ` +
    `L ${x + width - s} ${y + height} L ${x} ${y + height} Z`
  );
}

export function trapezoidPath({ x, y, width, height }: BBox, offset = 20): string {
  const o = Math.min(offset, width / 3);
  return (
    `M ${x + o} ${y} L ${x + width - o} ${y} ` +
    `L ${x + width} ${y + height} L ${x} ${y + height} Z`
  );
}

export function subroutinePath(bbox: BBox): string {
  return rectPath(bbox);
}

export interface CylinderPaths {
  body: string;
  topArc: string;
}

/** cylinder 뚜껑(위·아래 타원)의 높이. `cylinderPaths`와 `contentBox`가 이 한 값을 공유한다. */
export const CYLINDER_CAP_RATIO = 0.15;
export const CYLINDER_CAP_MIN = 4;
export const CYLINDER_CAP_MAX = 12;

export function cylinderCapHeight(height: number): number {
  return Math.max(Math.min(height * CYLINDER_CAP_RATIO, CYLINDER_CAP_MAX), CYLINDER_CAP_MIN);
}

export function cylinderPaths({ x, y, width, height }: BBox): CylinderPaths {
  const rx = width / 2;
  const ry = cylinderCapHeight(height);
  const top = y + ry;
  const bottom = y + height - ry;
  const body =
    `M ${x} ${top} ` +
    `a ${rx} ${ry} 0 0 0 ${width} 0 ` +
    `L ${x + width} ${bottom} ` +
    `a ${rx} ${ry} 0 0 1 ${-width} 0 Z`;
  const topArc =
    `M ${x} ${top} a ${rx} ${ry} 0 0 1 ${width} 0`;
  return { body, topArc };
}

export interface CubePaths {
  front: string;
  top: string;
  right: string;
}

export function cubePaths({ x, y, width, height }: BBox, depth = 12): CubePaths {
  const d = Math.min(depth, width / 3, height / 3);
  const front = rectPath({ x, y: y + d, width: width - d, height: height - d });
  const top =
    `M ${x} ${y + d} ` +
    `L ${x + d} ${y} ` +
    `L ${x + width} ${y} ` +
    `L ${x + width - d} ${y + d} Z`;
  const right =
    `M ${x + width - d} ${y + d} ` +
    `L ${x + width} ${y} ` +
    `L ${x + width} ${y + height - d} ` +
    `L ${x + width - d} ${y + height} Z`;
  return { front, top, right };
}

/** UML Package(VT-102) 폴더 탭 shape — 좌상단 탭 + 본체. */
export function folderPath({ x, y, width, height }: BBox, tabW?: number, tabH?: number): string {
  const t = Math.min(tabW ?? width * 0.35, width * 0.6);
  const th = Math.min(tabH ?? 14, height * 0.28);
  return (
    `M ${x} ${y} ` +
    `L ${x + t} ${y} ` +
    `L ${x + t} ${y + th} ` +
    `L ${x + width} ${y + th} ` +
    `L ${x + width} ${y + height} ` +
    `L ${x} ${y + height} Z`
  );
}

// ──────────────────────────────────────────────
// 콘텐츠 박스 — 도형 안에서 **글자를 넣어도 되는 영역**
//
// bbox와 콘텐츠 영역이 다른 도형(cylinder·diamond·hexagon…)에서 호출자가 내부 상수를
// 복제하지 않게 한다. 복제하면 우리가 값을 바꿀 때 그쪽이 조용히 어긋난다(상류 이슈 P2).
// 각 도형의 파라미터 기본값은 **`Node`가 실제로 그리는 값**과 같다.
// ──────────────────────────────────────────────

/** `Node`가 cube를 그릴 때 쓰는 깊이. */
export function cubeDepth({ width, height }: BBox): number {
  return Math.min(14, width / 4, height / 4);
}

/** `Node`가 subroutine 양쪽에 긋는 세로선의 들여쓰기. */
export function subroutineIndent({ width }: BBox): number {
  return Math.min(14, width / 6);
}

/** `Node`가 doubleCircle 안쪽에 그리는 원의 반지름. */
export function doubleCircleInnerRadius({ width, height }: BBox): number {
  const r = Math.min(width, height) / 2;
  const inner = r - 4;
  return inner > 0 ? inner : r * 0.7;
}

/** `folderPath`의 탭 높이 기본값. */
export function folderTabHeight({ height }: BBox, tabH?: number): number {
  return Math.min(tabH ?? 14, height * 0.28);
}

export interface ContentBoxOptions {
  /** rounded 모서리 반경 — `roundedPath`와 같은 기본값 8. */
  radius?: number;
  /** parallelogram 기울기 — `parallelogramPath`와 같은 기본값 20. */
  skew?: number;
  /** trapezoid 윗변 들여쓰기 — `trapezoidPath`와 같은 기본값 20. */
  offset?: number;
  /** cube 깊이 — 기본값은 `cubeDepth`(= `Node`가 그리는 값). */
  depth?: number;
  /** folder 탭 높이 — 기본값은 `folderTabHeight`. */
  tabHeight?: number;
}

/**
 * 도형 안에서 라벨을 배치해도 되는 사각형을 돌려준다.
 *
 * 반환 박스는 항상 bbox 안쪽이며, 도형 경계에 접할 뿐 밖으로 나가지 않는다.
 * 곡선 도형은 최대 넓이 내접 사각형(반지름/√2), 다각형은 전체 높이를 유지하는
 * 보수적 내접 사각형을 쓴다 — 라벨은 가로로 흐르므로 높이를 먼저 지킨다.
 */
export function contentBox(shape: NodeShape, bbox: BBox, opts: ContentBoxOptions = {}): BBox {
  const { x, y, width, height } = bbox;

  switch (shape) {
    case 'cylinder': {
      // 뚜껑 하나 분량(위아래 각 cap)만 빼면 모자란다. `cylinderPaths`의 body는 윗변이
      // **위 뚜껑의 아랫 호**라 가로 중앙에서 y + 2*cap 까지 내려오고, 아랫변은 아래로
      // 처져 양 끝에서 y + height - cap 이 한계다. 폭 전체를 쓰는 사각형의 안전 구간은
      // 그래서 [y + 2*cap, y + height - cap] 이다.
      // (상류 리포트는 대칭 뚜껑을 가정해 h=62 → 43px로 계산했지만, 실제로 칠해지는
      //  영역은 34.1px이다 — apps/storybook Atoms `NodeContentBox` play의 isPointInFill 실측.)
      const cap = cylinderCapHeight(height);
      return { x, y: y + 2 * cap, width, height: Math.max(0, height - 3 * cap) };
    }

    case 'diamond':
      return { x: x + width / 4, y: y + height / 4, width: width / 2, height: height / 2 };

    case 'hexagon':
      return { x: x + width / 4, y, width: width / 2, height };

    case 'parallelogram': {
      const s = Math.min(opts.skew ?? 20, width / 3);
      return { x: x + s, y, width: Math.max(0, width - 2 * s), height };
    }

    case 'trapezoid': {
      const o = Math.min(opts.offset ?? 20, width / 3);
      return { x: x + o, y, width: Math.max(0, width - 2 * o), height };
    }

    case 'cube': {
      const d = opts.depth ?? cubeDepth(bbox);
      return { x, y: y + d, width: Math.max(0, width - d), height: Math.max(0, height - d) };
    }

    case 'folder': {
      const th = folderTabHeight(bbox, opts.tabHeight);
      return { x, y: y + th, width, height: Math.max(0, height - th) };
    }

    case 'subroutine': {
      const indent = subroutineIndent(bbox);
      return { x: x + indent, y, width: Math.max(0, width - 2 * indent), height };
    }

    case 'circle':
    case 'doubleCircle': {
      const r = shape === 'circle' ? Math.min(width, height) / 2 : doubleCircleInnerRadius(bbox);
      const half = r / Math.SQRT2;
      return {
        x: x + width / 2 - half,
        y: y + height / 2 - half,
        width: half * 2,
        height: half * 2,
      };
    }

    case 'ellipse': {
      const halfW = width / 2 / Math.SQRT2;
      const halfH = height / 2 / Math.SQRT2;
      return {
        x: x + width / 2 - halfW,
        y: y + height / 2 - halfH,
        width: halfW * 2,
        height: halfH * 2,
      };
    }

    case 'stadium': {
      const r = height / 2;
      return { x: x + r, y, width: Math.max(0, width - 2 * r), height };
    }

    case 'rounded': {
      // 전체 높이를 쓰는 박스의 네 꼭짓점이 모서리 호에 정확히 얹히는 들여쓰기.
      const cr = Math.min(opts.radius ?? 8, width / 2, height / 2);
      const inset = cr * (1 - 1 / Math.SQRT2);
      return {
        x: x + inset,
        y: y + inset,
        width: Math.max(0, width - 2 * inset),
        height: Math.max(0, height - 2 * inset),
      };
    }

    // rect·component — component의 톱니는 bbox 바깥으로 튀어나오므로 안쪽이 줄지 않는다.
    default:
      return { x, y, width, height };
  }
}

/** DMN Knowledge Source(VT-124) — 하단 물결(ogee) 사각형. Node 미편입(DMN 템플릿 inline). */
export function knowledgeSourcePath({ x, y, width, height }: BBox): string {
  const w = Math.min(10, height * 0.22);
  const dx = width * 0.25;
  return (
    `M ${x} ${y} ` +
    `h ${width} ` +
    `v ${height - w} ` +
    `c ${-dx} ${w} ${-dx} ${-w} ${-width * 0.5} 0 ` +
    `c ${-dx} ${w} ${-dx} ${-w} ${-width * 0.5} 0 ` +
    `Z`
  );
}

/** DMN Business Knowledge Model(VT-124) — 상단 양 모서리 컷 사각형. */
export function bkmPath({ x, y, width, height }: BBox): string {
  const c = Math.min(12, width * 0.12, height * 0.35);
  return (
    `M ${x + c} ${y} ` +
    `L ${x + width - c} ${y} ` +
    `L ${x + width} ${y + c} ` +
    `L ${x + width} ${y + height} ` +
    `L ${x} ${y + height} ` +
    `L ${x} ${y + c} Z`
  );
}
