import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { vvar } from '../tokens/contract';

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
    const effectiveFill = fill ?? vvar('node', 'decision', 'fill');
    // 기본 면(node.decision.fill) 위 글자색 — 이름과 태그가 같은 면 위에 있다.
    // fill 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색을 둔다(KAN-061).
    const labelFill = fill === undefined ? vvar('on', 'node', 'decision', 'fill') : vvar('edge', 'stroke');
    const effectiveStroke = stroke ?? vvar('node', 'decision', 'keyline');
    const effectiveStrokeWidth = strokeWidth ?? vvar('node', 'decision', 'keylineWidth');

    // Diamond: text goes to the center, tag near bottom half
    const labelY = y + height * 0.42;
    const tagY = y + height * 0.74;

    return (
      <g ref={ref} data-bbangto-viz-molecule="decision" data-bbangto-viz-molecule-id={id}>
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
        <NodeLabel
          x={x}
          y={labelY}
          width={width}
          title={title}
          subtitle={subtitle}
          fontSize={11}
          mode="truncate"
          fill={labelFill}
        />
        <Tag x={x + width / 2} y={tagY} label={tag} fill={labelFill} />
        {children}
      </g>
    );
  },
);

DecisionNode.displayName = 'DecisionNode';
