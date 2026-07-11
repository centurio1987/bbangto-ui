import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { vvar } from '../tokens/contract';
import { CylinderGlyph } from './glyphs/CylinderGlyph';

export interface DatabaseNodeProps {
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

export const DatabaseNode = React.forwardRef<SVGGElement, DatabaseNodeProps>(
  ({ id, x, y, width, height, title, subtitle, tag = 'database', fill, stroke, strokeWidth, strokeDasharray, children }, ref) => {
    const effectiveFill = fill ?? vvar('node', 'database', 'fill');
    const effectiveStroke = stroke ?? vvar('node', 'database', 'keyline');
    const effectiveStrokeWidth = strokeWidth ?? 2.5;

    const glyphSize = 22;
    const glyphLeft = x + (width - glyphSize) / 2;
    const glyphTop = y + 8;
    const glyphBottom = glyphTop + glyphSize;
    const tagY = y + height - 10;
    const labelY = (glyphBottom + 6 + tagY - 8) / 2;

    return (
      <g ref={ref} data-bbangto-viz-molecule="database" data-bbangto-viz-molecule-id={id}>
        <Node
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          shape="cylinder"
          fill={effectiveFill}
          stroke={effectiveStroke}
          strokeWidth={effectiveStrokeWidth}
          strokeDasharray={strokeDasharray}
        />
        <svg
          data-bbangto-viz-glyph="cylinder"
          x={glyphLeft}
          y={glyphTop}
          width={glyphSize}
          height={glyphSize}
          viewBox="0 0 24 24"
          aria-hidden="true"
          overflow="visible"
        >
          <CylinderGlyph stroke={typeof effectiveStroke === 'string' ? effectiveStroke : '#111111'} />
        </svg>
        <NodeLabel x={x} y={labelY} width={width} title={title} subtitle={subtitle} fontSize={12} />
        <Tag x={x + width / 2} y={tagY} label={tag} />
        {children}
      </g>
    );
  },
);

DatabaseNode.displayName = 'DatabaseNode';
