import React, { type ReactNode } from 'react';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { dvar } from '../tokens/contract';

export type C4Level = 'l1' | 'l2' | 'l3';

export interface C4BoxProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level: C4Level;
  title: string;
  subtitle?: string;
  tag?: string;
  fill?: string;
  stroke?: string;
  children?: ReactNode;
}

const LEVEL_BORDER_WIDTH: Record<C4Level, number> = {
  l1: 3,
  l2: 2,
  l3: 1.4,
};

export const C4Box = React.forwardRef<SVGGElement, C4BoxProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      level,
      title,
      subtitle,
      tag,
      fill,
      stroke,
      children,
    },
    ref,
  ) => {
    const effectiveFill = fill ?? dvar('c4', level, 'bgTint');
    const effectiveStroke = stroke ?? dvar('edge', 'stroke');
    const borderWidth = LEVEL_BORDER_WIDTH[level];
    const effectiveTag = tag ?? level;

    const tagY = y + height - 10;
    const labelY = y + height / 2 - 6;

    return (
      <g
        ref={ref}
        data-bbangto-diagram-c4-box={level}
        data-bbangto-diagram-c4-box-id={id}
      >
        <Node
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          shape="rect"
          fill={effectiveFill}
          stroke={effectiveStroke}
          strokeWidth={borderWidth}
        />
        <NodeLabel
          x={x}
          y={labelY}
          width={width}
          title={title}
          subtitle={subtitle}
          fontSize={12}
        />
        <Tag x={x + width / 2} y={tagY} label={effectiveTag} />
        {children}
      </g>
    );
  },
);

C4Box.displayName = 'C4Box';
