import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { dvar } from '../tokens/contract';
import { StackedRectGlyph } from './glyphs/StackedRectGlyph';

export interface ContainerNodeProps {
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

export const ContainerNode = React.forwardRef<SVGGElement, ContainerNodeProps>(
  ({ id, x, y, width, height, title, subtitle, tag = 'container', fill, stroke, strokeWidth, strokeDasharray, children }, ref) => {
    const effectiveFill = fill ?? dvar('node', 'container', 'fill');
    const effectiveStroke = stroke ?? dvar('node', 'container', 'keyline');
    const effectiveStrokeWidth = strokeWidth ?? 2.5;

    const glyphSize = 22;
    const glyphLeft = x + (width - glyphSize) / 2;
    const glyphTop = y + 8;
    const glyphBottom = glyphTop + glyphSize;
    const tagY = y + height - 10;
    const labelY = (glyphBottom + 6 + tagY - 8) / 2;

    return (
      <g ref={ref} data-bbangto-diagram-molecule="container" data-bbangto-diagram-molecule-id={id}>
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
          data-bbangto-diagram-glyph="stackedRect"
          x={glyphLeft}
          y={glyphTop}
          width={glyphSize}
          height={glyphSize}
          viewBox="0 0 24 24"
          aria-hidden="true"
          overflow="visible"
        >
          <StackedRectGlyph stroke={typeof effectiveStroke === 'string' ? effectiveStroke : '#111111'} />
        </svg>
        <NodeLabel x={x} y={labelY} width={width} title={title} subtitle={subtitle} fontSize={12} />
        <Tag x={x + width / 2} y={tagY} label={tag} />
        {children}
      </g>
    );
  },
);

ContainerNode.displayName = 'ContainerNode';
