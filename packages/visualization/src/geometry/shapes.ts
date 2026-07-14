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

export function cylinderPaths({ x, y, width, height }: BBox): CylinderPaths {
  const rx = width / 2;
  const ry = Math.max(Math.min(height * 0.15, 12), 4);
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
