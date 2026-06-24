import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { dvar } from '../tokens/contract';

export interface DecisionNodeProps {
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

export const DecisionNode = React.forwardRef<SVGGElement, DecisionNodeProps>(
  ({ id, x, y, width, height, title, subtitle, tag = 'decision', fill, stroke, strokeWidth, strokeDasharray, children }, ref) => {
    const effectiveFill = fill ?? dvar('node', 'decision', 'fill');
    const effectiveStroke = stroke ?? dvar('node', 'decision', 'keyline');
    const effectiveStrokeWidth = strokeWidth ?? 2.5;

    // Diamond: text goes to the center, tag near bottom half
    const labelY = y + height * 0.42;
    const tagY = y + height * 0.74;

    return (
      <g ref={ref} data-bbangto-diagram-molecule="decision" data-bbangto-diagram-molecule-id={id}>
        <Node
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          shape="diamond"
          fill={effectiveFill}
          stroke={effectiveStroke}
          strokeWidth={effectiveStrokeWidth}
          strokeDasharray={strokeDasharray}
        />
        <NodeLabel x={x} y={labelY} width={width} title={title} subtitle={subtitle} fontSize={11} mode="truncate" />
        <Tag x={x + width / 2} y={tagY} label={tag} />
        {children}
      </g>
    );
  },
);

DecisionNode.displayName = 'DecisionNode';
