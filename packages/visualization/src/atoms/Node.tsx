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
          data-bbangto-diagram-node-shape="rect"
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
          data-bbangto-diagram-node-shape="rounded"
          d={roundedPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'stadium':
      return (
        <path
          data-bbangto-diagram-node-shape="stadium"
          d={stadiumPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'circle': {
      const r = Math.min(width, height) / 2;
      return (
        <circle
          data-bbangto-diagram-node-shape="circle"
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
          data-bbangto-diagram-node-shape="ellipse"
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
          data-bbangto-diagram-node-shape="diamond"
          d={diamondPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'hexagon':
      return (
        <path
          data-bbangto-diagram-node-shape="hexagon"
          d={hexagonPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'parallelogram':
      return (
        <path
          data-bbangto-diagram-node-shape="parallelogram"
          d={parallelogramPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'trapezoid':
      return (
        <path
          data-bbangto-diagram-node-shape="trapezoid"
          d={trapezoidPath(bbox)}
          style={shapeStyle}
        />
      );

    case 'subroutine': {
      const indent = Math.min(14, width / 6);
      return (
        <>
          <path
            data-bbangto-diagram-node-shape="subroutine"
            d={subroutinePath(bbox)}
            style={shapeStyle}
          />
          <line
            x1={x + indent}
            y1={y}
            x2={x + indent}
            y2={y + height}
            style={{ stroke: shapeStyle.stroke, strokeWidth: shapeStyle.strokeWidth }}
          />
          <line
            x1={x + width - indent}
            y1={y}
            x2={x + width - indent}
            y2={y + height}
            style={{ stroke: shapeStyle.stroke, strokeWidth: shapeStyle.strokeWidth }}
          />
        </>
      );
    }

    case 'cylinder': {
      const { body, topArc } = cylinderPaths(bbox);
      return (
        <>
          <path
            data-bbangto-diagram-node-shape="cylinder"
            d={body}
            style={shapeStyle}
          />
          <path
            d={topArc}
            style={{ ...shapeStyle, fill: 'none' }}
          />
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
            data-bbangto-diagram-node-shape="doubleCircle"
            cx={cx}
            cy={cy}
            r={r}
            style={shapeStyle}
          />
          <circle cx={cx} cy={cy} r={innerR > 0 ? innerR : r * 0.7} style={{ ...shapeStyle, fill: 'none' }} />
        </>
      );
    }

    case 'cube': {
      const depth = Math.min(14, width / 4, height / 4);
      const { front, top, right } = cubePaths(bbox, depth);
      const faceStyle = { ...shapeStyle };
      const dimStyle = { ...shapeStyle, fill: shapeStyle.fill ? adjustBrightness(shapeStyle.fill as string, -15) : '#ddd' };
      return (
        <>
          <path data-bbangto-diagram-node-shape="cube" d={front} style={faceStyle} />
          <path d={top} style={dimStyle} />
          <path d={right} style={{ ...dimStyle, fill: shapeStyle.fill ? adjustBrightness(shapeStyle.fill as string, -30) : '#bbb' }} />
        </>
      );
    }

    case 'component': {
      const notchW = 16;
      const notchH = 8;
      const notchX = x - notchW / 2;
      const notch1Y = y + height / 3 - notchH / 2;
      const notch2Y = y + (2 * height) / 3 - notchH / 2;
      return (
        <>
          <path
            data-bbangto-diagram-node-shape="component"
            d={rectPath(bbox)}
            style={shapeStyle}
          />
          <rect
            x={notchX}
            y={notch1Y}
            width={notchW}
            height={notchH}
            style={{ ...shapeStyle }}
          />
          <rect
            x={notchX}
            y={notch2Y}
            width={notchW}
            height={notchH}
            style={{ ...shapeStyle }}
          />
        </>
      );
    }

    default: {
      const d = rectPath(bbox);
      return <path data-bbangto-diagram-node-shape="unknown" d={d} style={shapeStyle} />;
    }
  }

  function adjustBrightness(color: string, amount: number): string {
    if (!color.startsWith('#') || color.length < 7) return color;
    const r = Math.max(0, Math.min(255, parseInt(color.slice(1, 3), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(color.slice(3, 5), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(color.slice(5, 7), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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
      fill = 'white',
      stroke = '#111111',
      strokeWidth = 2.5,
      strokeDasharray,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const bbox: BBox = { x, y, width, height };
    const shapeStyle: React.CSSProperties = {
      fill,
      stroke,
      strokeWidth,
      strokeDasharray,
    };

    return (
      <g
        ref={ref}
        data-bbangto-diagram-node
        data-bbangto-diagram-node-id={id}
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
