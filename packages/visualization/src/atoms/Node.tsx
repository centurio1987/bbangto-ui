import React from 'react';
import type { BBox } from '../types/data';
import {
  type NodeShape,
  rectPath,
  roundedPath,
  stadiumPath,
  diamondPath,
  hexagonPath,
  parallelogramPath,
  trapezoidPath,
  subroutinePath,
  cylinderPaths,
  cubePaths,
  folderPath,
} from '../geometry/shapes';

export type { NodeShape };

export interface NodeProps extends React.SVGAttributes<SVGGElement> {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: NodeShape;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeDasharray?: string;
}

// headless: paint 기본값은 계약 스타일시트([data-viz-part="shape"])가 공급한다.
// 명시적 prop만 인라인 style로 렌더 — SVG presentation attribute는 author stylesheet에
// 지므로 반드시 style로 매핑해 사용자 오버라이드가 계약 시트를 이기게 한다.
function definedStyle(entries: React.CSSProperties): React.CSSProperties {
  return Object.fromEntries(
    Object.entries(entries).filter(([, v]) => v !== undefined),
  ) as React.CSSProperties;
}

function renderShapeElements(
  shape: NodeShape,
  bbox: BBox,
  shapeStyle: React.CSSProperties,
): React.ReactNode {
  const { x, y, width, height } = bbox;

  switch (shape) {
    case 'rect':
      return (
        <rect
          data-bbangto-viz-node-shape="rect"
          data-viz-part="shape"
          x={x}
          y={y}
          width={width}
          height={height}
          style={shapeStyle}
        />
      );

    case 'rounded':
      return (
        <path
          data-bbangto-viz-node-shape="rounded"
          data-viz-part="shape"
          d={roundedPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'stadium':
      return (
        <path
          data-bbangto-viz-node-shape="stadium"
          data-viz-part="shape"
          d={stadiumPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'circle': {
      const r = Math.min(width, height) / 2;
      return (
        <circle
          data-bbangto-viz-node-shape="circle"
          data-viz-part="shape"
          cx={x + width / 2}
          cy={y + height / 2}
          r={r}
          style={shapeStyle}
        />
      );
    }

    case 'ellipse':
      return (
        <ellipse
          data-bbangto-viz-node-shape="ellipse"
          data-viz-part="shape"
          cx={x + width / 2}
          cy={y + height / 2}
          rx={width / 2}
          ry={height / 2}
          style={shapeStyle}
        />
      );

    case 'diamond':
      return (
        <path
          data-bbangto-viz-node-shape="diamond"
          data-viz-part="shape"
          d={diamondPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'hexagon':
      return (
        <path
          data-bbangto-viz-node-shape="hexagon"
          data-viz-part="shape"
          d={hexagonPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'parallelogram':
      return (
        <path
          data-bbangto-viz-node-shape="parallelogram"
          data-viz-part="shape"
          d={parallelogramPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'trapezoid':
      return (
        <path
          data-bbangto-viz-node-shape="trapezoid"
          data-viz-part="shape"
          d={trapezoidPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'subroutine': {
      const indent = Math.min(14, width / 6);
      const lineStyle = definedStyle({
        stroke: shapeStyle.stroke,
        strokeWidth: shapeStyle.strokeWidth,
        fill: 'none',
      });
      return (
        <>
          <path
            data-bbangto-viz-node-shape="subroutine"
            data-viz-part="shape"
            d={subroutinePath(bbox)}
            style={shapeStyle}
          />
          <line data-viz-part="shape" x1={x + indent} y1={y} x2={x + indent} y2={y + height} style={lineStyle} />
          <line data-viz-part="shape" x1={x + width - indent} y1={y} x2={x + width - indent} y2={y + height} style={lineStyle} />
        </>
      );
    }

    case 'cylinder': {
      const { body, topArc } = cylinderPaths(bbox);
      return (
        <>
          <path
            data-bbangto-viz-node-shape="cylinder"
            data-viz-part="shape"
            d={body}
            style={shapeStyle}
          />
          <path data-viz-part="shape" d={topArc} style={{ ...shapeStyle, fill: 'none' }} />
        </>
      );
    }

    case 'doubleCircle': {
      const r = Math.min(width, height) / 2;
      const cx = x + width / 2;
      const cy = y + height / 2;
      const innerR = r - 4;
      return (
        <>
          <circle
            data-bbangto-viz-node-shape="doubleCircle"
            data-viz-part="shape"
            cx={cx}
            cy={cy}
            r={r}
            style={shapeStyle}
          />
          <circle
            data-viz-part="shape"
            cx={cx}
            cy={cy}
            r={innerR > 0 ? innerR : r * 0.7}
            style={{ ...shapeStyle, fill: 'none' }}
          />
        </>
      );
    }

    case 'cube': {
      const depth = Math.min(14, width / 4, height / 4);
      const { front, top, right } = cubePaths(bbox, depth);
      // paint 무관 음영: 면색 위 검정 오버레이(fillOpacity)로 top/right 면을 어둡게 한다.
      // (hex 연산은 var() 기반 fill과 비호환이라 사용하지 않는다.)
      return (
        <>
          <path data-bbangto-viz-node-shape="cube" data-viz-part="shape" d={front} style={shapeStyle} />
          <path data-viz-part="shape" d={top} style={shapeStyle} />
          <path d={top} style={{ fill: '#000000', fillOpacity: 0.12, stroke: 'none' }} />
          <path data-viz-part="shape" d={right} style={shapeStyle} />
          <path d={right} style={{ fill: '#000000', fillOpacity: 0.24, stroke: 'none' }} />
        </>
      );
    }

    case 'folder':
      return (
        <path
          data-bbangto-viz-node-shape="folder"
          data-viz-part="shape"
          d={folderPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'component': {
      const notchW = 16;
      const notchH = 8;
      const notchX = x - notchW / 2;
      const notch1Y = y + height / 3 - notchH / 2;
      const notch2Y = y + (2 * height) / 3 - notchH / 2;
      return (
        <>
          <path
            data-bbangto-viz-node-shape="component"
            data-viz-part="shape"
            d={rectPath(bbox)}
            style={shapeStyle}
          />
          <rect data-viz-part="shape" x={notchX} y={notch1Y} width={notchW} height={notchH} style={shapeStyle} />
          <rect data-viz-part="shape" x={notchX} y={notch2Y} width={notchW} height={notchH} style={shapeStyle} />
        </>
      );
    }

    default: {
      const d = rectPath(bbox);
      return <path data-bbangto-viz-node-shape="unknown" data-viz-part="shape" d={d} style={shapeStyle} />;
    }
  }
}

export const Node = React.forwardRef<SVGGElement, NodeProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      shape = 'rect',
      fill,
      stroke,
      strokeWidth,
      strokeDasharray,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const bbox: BBox = { x, y, width, height };
    const shapeStyle = definedStyle({ fill, stroke, strokeWidth, strokeDasharray });

    return (
      <g
        ref={ref}
        data-bbangto-viz-node
        data-bbangto-viz-node-id={id}
        style={style}
        {...props}
      >
        {renderShapeElements(shape, bbox, shapeStyle)}
        {children}
      </g>
    );
  },
);

Node.displayName = 'Node';
