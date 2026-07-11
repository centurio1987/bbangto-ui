import React from 'react';
import { useCanvasContext } from '../context/CanvasContext';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import type { Point } from '../geometry/anchors';
import { nearestAnchors, getAnchor, type AnchorSide } from '../geometry/anchors';
import { buildPath, type EdgeRouting } from '../geometry/routing';
import { type MarkerVariant, markerRef } from './Marker';
import type { BBox } from '../types/data';

export type { EdgeRouting, MarkerVariant, AnchorSide };

export interface EdgeProps extends Omit<React.SVGAttributes<SVGPathElement>, 'stroke' | 'from' | 'to'> {
  id?: string;
  from: string | Point;
  to: string | Point;
  fromSide?: AnchorSide;
  toSide?: AnchorSide;
  routing?: EdgeRouting;
  markerEnd?: MarkerVariant;
  markerStart?: MarkerVariant;
  stroke?: string;
  strokeWidth?: number | string;
  strokeDasharray?: string;
  cornerRadius?: number;
  waypoints?: Point[];
  label?: string;
}

function resolvePoint(
  endpoint: string | Point,
  registry: Readonly<Record<string, BBox>>,
  side: AnchorSide | undefined,
  other: string | Point,
  otherRegistry: Readonly<Record<string, BBox>>,
  keylineWidth: number,
): Point | null {
  if (typeof endpoint !== 'string') return endpoint;

  const bbox = registry[endpoint];
  if (!bbox) {
    console.warn(`[bbangto/diagram] Edge: node id "${endpoint}" not found in registry`);
    return null;
  }

  if (side) return getAnchor(bbox, side, keylineWidth);

  const otherBbox =
    typeof other === 'string' ? otherRegistry[other] : { x: other.x, y: other.y, width: 0, height: 0 };

  if (!otherBbox) return getAnchor(bbox, 'right', keylineWidth);

  return nearestAnchors(bbox, otherBbox, keylineWidth).fromPt;
}

export const Edge = React.forwardRef<SVGPathElement, EdgeProps>(
  (
    {
      id,
      from,
      to,
      fromSide,
      toSide,
      routing = 'orthogonal',
      markerEnd = 'arrow',
      markerStart,
      stroke,
      strokeWidth,
      strokeDasharray,
      cornerRadius,
      waypoints,
      label: _label,
      style,
      ...props
    },
    ref,
  ) => {
    const { registry, uid } = useCanvasContext();
    const foundation = useVizFoundation();
    // 앵커/라우팅 기하는 실제 선 두께 값이 필요 — prop 미지정 시 foundation 값 사용.
    const kw = typeof strokeWidth === 'number' ? strokeWidth : foundation.edge.width;
    const effectiveCornerRadius = cornerRadius ?? foundation.edge.cornerRadius;

    const fromPt = resolvePoint(from, registry, fromSide, to, registry, kw);
    const toPt = resolvePoint(to, registry, toSide, from, registry, kw);

    if (!fromPt || !toPt) return null;

    // Override toSide's resolved point for "to" when using nearestAnchors
    let resolvedTo = toPt;
    if (typeof to === 'string' && !toSide) {
      const toBbox = registry[to];
      if (toBbox) {
        const fromBbox =
          typeof from === 'string'
            ? registry[from]
            : { x: from.x, y: from.y, width: 0, height: 0 };
        if (fromBbox) {
          resolvedTo = nearestAnchors(fromBbox, toBbox, kw).toPt;
        }
      }
    }

    const d = buildPath(fromPt, resolvedTo, routing, effectiveCornerRadius, waypoints);

    // headless: stroke 기본값은 계약 스타일시트([data-bbangto-viz-edge])가 공급한다.
    // 명시적 prop만 인라인 style로 렌더(사용자 오버라이드 우선 보장).
    const paintStyle = Object.fromEntries(
      Object.entries({ stroke, strokeWidth, strokeDasharray }).filter(([, v]) => v !== undefined),
    );

    return (
      <path
        ref={ref}
        data-bbangto-viz-edge
        data-bbangto-viz-edge-id={id}
        d={d}
        markerEnd={markerEnd && markerEnd !== 'none' ? markerRef(uid, markerEnd) : undefined}
        markerStart={markerStart && markerStart !== 'none' ? markerRef(uid, markerStart) : undefined}
        style={{
          fill: 'none',
          ...paintStyle,
          ...style,
        }}
        {...props}
      />
    );
  },
);

Edge.displayName = 'Edge';
