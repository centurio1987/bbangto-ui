import type { BBox } from '../types/data';

export type AnchorSide = 'top' | 'right' | 'bottom' | 'left';

export interface Point {
  x: number;
  y: number;
}

export function getAnchor(bbox: BBox, side: AnchorSide, keylineWidth = 2.5): Point {
  const hw = keylineWidth / 2;
  const { x, y, width, height } = bbox;
  switch (side) {
    case 'top':    return { x: x + width / 2, y: y - hw };
    case 'bottom': return { x: x + width / 2, y: y + height + hw };
    case 'left':   return { x: x - hw, y: y + height / 2 };
    case 'right':  return { x: x + width + hw, y: y + height / 2 };
  }
}

export function nearestAnchors(
  from: BBox,
  to: BBox,
  keylineWidth = 2.5,
): { fromPt: Point; toPt: Point } {
  const fromCx = from.x + from.width / 2;
  const fromCy = from.y + from.height / 2;
  const toCx = to.x + to.width / 2;
  const toCy = to.y + to.height / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  let fromSide: AnchorSide;
  let toSide: AnchorSide;

  if (Math.abs(dx) >= Math.abs(dy)) {
    fromSide = dx >= 0 ? 'right' : 'left';
    toSide = dx >= 0 ? 'left' : 'right';
  } else {
    fromSide = dy >= 0 ? 'bottom' : 'top';
    toSide = dy >= 0 ? 'top' : 'bottom';
  }

  return {
    fromPt: getAnchor(from, fromSide, keylineWidth),
    toPt: getAnchor(to, toSide, keylineWidth),
  };
}
