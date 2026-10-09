import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { vvar } from '../tokens/contract';
import { BarsGlyph } from './glyphs/BarsGlyph';

export interface QueueNodeProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  tag?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeDasharray?: string;
  children?: ReactNode;
}

export const QueueNode = React.forwardRef<SVGGElement, QueueNodeProps>(
  ({ id, x, y, width, height, title, subtitle, tag = 'queue', fill, stroke, strokeWidth, strokeDasharray, children }, ref) => {
    const effectiveFill = fill ?? vvar('node', 'queue', 'fill');
    // 기본 면(node.queue.fill) 위 글자색 — 이름과 태그가 같은 면 위에 있다.
    // fill 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색을 둔다(KAN-061).
    const labelFill = fill === undefined ? vvar('on', 'node', 'queue', 'fill') : vvar('edge', 'stroke');
    const effectiveStroke = stroke ?? vvar('node', 'queue', 'keyline');
    const effectiveStrokeWidth = strokeWidth ?? vvar('node', 'queue', 'keylineWidth');

    const glyphSize = 22;
    const glyphLeft = x + (width - glyphSize) / 2;
    const glyphTop = y + 8;
    const glyphBottom = glyphTop + glyphSize;
    const tagY = y + height - 10;
    const labelY = (glyphBottom + 6 + tagY - 8) / 2;

    return (
      <g ref={ref} data-bbangto-viz-molecule="queue" data-bbangto-viz-molecule-id={id}>
        <Node
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          shape="rect"
          fill={effectiveFill}
          stroke={effectiveStroke}
          strokeWidth={effectiveStrokeWidth}
          strokeDasharray={strokeDasharray}
        />
        <svg
          data-bbangto-viz-glyph="bars"
          x={glyphLeft}
          y={glyphTop}
          width={glyphSize}
          height={glyphSize}
          viewBox="0 0 24 24"
          aria-hidden="true"
          overflow="visible"
        >
          <BarsGlyph
            fill={effectiveStroke}
            stroke={effectiveStroke}
          />
        </svg>
        <NodeLabel
          x={x}
          y={labelY}
          width={width}
          title={title}
          subtitle={subtitle}
          fontSize={12}
          fill={labelFill}
        />
        <Tag x={x + width / 2} y={tagY} label={tag} fill={labelFill} />
        {children}
      </g>
    );
  },
);

QueueNode.displayName = 'QueueNode';
