import React from 'react';
import { useCanvasContext } from '../context/CanvasContext';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import type { Point } from '../geometry/anchors';
import { nearestAnchors, getAnchor, type AnchorSide } from '../geometry/anchors';
import { buildPath, pathMidpoint, terminalDirections, endLabelCenter, type EdgeRouting } from '../geometry/routing';
import { type MarkerVariant, markerRef } from './Marker';
import { EdgeLabel, edgeLabelBox } from './EdgeLabel';
import type { BBox } from '../types/data';

export type { EdgeRouting, MarkerVariant, AnchorSide };

/** 앵커 계산에 쓰는 테두리 굵기의 최소값 — 노드 테두리 2.5 까지 선 끝 · 화살촉이 테두리 바깥에 온다. */
const ANCHOR_MIN_KEYLINE = 2.5;

/** 선 가운데 라벨을 옮기는 양(user unit). 라벨이 노드나 다른 라벨과 겹칠 때 데이터로 비킨다(KAN-082). */
export interface EdgeLabelOffset {
  x: number;
  y: number;
}

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
  /** 가운데 라벨(`label`)을 경로 가운데에서 이만큼 옮긴다. 끝 라벨은 옮기지 않는다. */
  labelOffset?: EdgeLabelOffset;
  /**
   * 선 양 끝 근처에 붙는 라벨 — UML 다중성(`1` · `0..*`)이나 역할 이름. `from` 쪽 끝과 `to` 쪽 끝에서 경로
   * 안쪽으로 조금 들어가 선 옆(가로선은 위, 세로선은 왼쪽)에 놓는다(routing.ts `endLabelCenter`).
   */
  fromLabel?: string;
  toLabel?: string;
  /** 라벨 글자 크기(label · fromLabel · toLabel 공통). 적지 않으면 `EdgeLabel` 기본값(11). */
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
      labelOffset,
      fromLabel,
      toLabel,
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
    // 선 끝(앵커)은 노드 테두리에서 이만큼의 절반 바깥이다. 선 굵기만 쓰면 굵기 1.5 선의 끝이 테두리 굵기 2 의
    // 바깥 가장자리 안쪽에 떨어져, 끝에 딱 맞춘 화살촉도 테두리를 파고든다(KAN-082.1 검토 2번). 노드 테두리 굵기
    // 2.5 까지는 선 끝이 그 바깥에 오도록 최소값을 둔다 — getAnchor 의 기본 keyline(2.5)과 같은 값이다.
    const anchorKw = Math.max(kw, ANCHOR_MIN_KEYLINE);
    const effectiveCornerRadius = cornerRadius ?? foundation.edge.cornerRadius;

    const fromPt = resolvePoint(from, registry, fromSide, to, registry, anchorKw);
    const toPt = resolvePoint(to, registry, toSide, from, registry, anchorKw);

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
          resolvedTo = nearestAnchors(fromBbox, toBbox, anchorKw).toPt;
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
    if (!label && !fromLabel && !toLabel) return path;

    // 라벨은 선 뒤에 그려 선 위에 얹는다. 가운데 라벨은 그린 경로의 가운데(routing.ts `pathMidpoint`),
    // 끝 라벨은 그린 경로의 양 끝 방향을 읽어 선과 끝 노드를 비킨 자리(`terminalDirections` · `endLabelCenter`).
    const mid = label ? pathMidpoint(fromPt, resolvedTo, routing, waypoints) : null;
    const dirs = fromLabel || toLabel ? terminalDirections(d) : null;
    const endAt = (pt: Point, dir: Point, text: string) => endLabelCenter(pt, dir, edgeLabelBox(text, labelFontSize), 6);
    const fromAt = fromLabel && dirs ? endAt(fromPt, dirs.start, fromLabel) : null;
    const toAt = toLabel && dirs ? endAt(resolvedTo, dirs.end, toLabel) : null;
    return (
      <>
        {path}
        {label && mid && (
          <EdgeLabel
            x={mid.x + (labelOffset?.x ?? 0)}
            y={mid.y + (labelOffset?.y ?? 0)}
            label={label}
            fontSize={labelFontSize}
          />
        )}
        {fromLabel && fromAt && <EdgeLabel x={fromAt.x} y={fromAt.y} label={fromLabel} fontSize={labelFontSize} />}
        {toLabel && toAt && <EdgeLabel x={toAt.x} y={toAt.y} label={toLabel} fontSize={labelFontSize} />}
      </>
    );
  },
);

Edge.displayName = 'Edge';
