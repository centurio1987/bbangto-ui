import React from 'react';
import { useCanvasContext } from '../context/CanvasContext';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import type { Point } from '../geometry/anchors';
import { nearestAnchors, getAnchor, type AnchorSide } from '../geometry/anchors';
import { buildPath, pathMidpoint, type EdgeRouting } from '../geometry/routing';
import { type MarkerVariant, markerRef } from './Marker';
import { EdgeLabel } from './EdgeLabel';
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
  /**
   * 선에 붙는 라벨(관계 이름 · 흐름 데이터 · 전이 조건 · 분기 조건 …). 경로를 따라 잰 길이의 절반 지점에
   * 바탕과 함께 그린다(`EdgeLabel`). 비우면 아무것도 그리지 않는다.
   */
  label?: string;
  /** 라벨 글자 크기. 적지 않으면 `EdgeLabel` 기본값(11). */
  labelFontSize?: number;
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
      label,
      labelFontSize,
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
    // 대시 기본값(edge.dashPattern)은 연결선 훅(data-viz-part="connector")에만 걸린다 —
    // 같은 edge 채널을 쓰는 축선·눈금 같은 구조선은 실선으로 남는다.
    // 명시적 prop만 인라인 style로 렌더(사용자 오버라이드 우선 보장).
    const paintStyle = Object.fromEntries(
      Object.entries({ stroke, strokeWidth, strokeDasharray }).filter(([, v]) => v !== undefined),
    );

    const path = (
      <path
        ref={ref}
        data-bbangto-viz-edge
        data-viz-part="connector"
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
    if (!label) return path;

    // 라벨은 선 뒤에 그려 선 위에 얹는다. 자리는 그린 경로의 가운데(routing.ts `pathMidpoint`).
    const mid = pathMidpoint(fromPt, resolvedTo, routing, waypoints);
    return (
      <>
        {path}
        <EdgeLabel x={mid.x} y={mid.y} label={label} fontSize={labelFontSize} />
      </>
    );
  },
);

Edge.displayName = 'Edge';
