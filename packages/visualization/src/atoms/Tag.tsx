import React from 'react';
import { dvar } from '../tokens/contract';

export interface TagProps {
  x: number;
  y: number;
  label: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}

export const Tag = React.forwardRef<SVGTextElement, TagProps>(
  (
    {
      x,
      y,
      label,
      fontSize = 10,
      fontFamily,
      fill,
    },
    ref,
  ) => {
    const effectiveFill = fill ?? dvar('edge', 'stroke');
    const effectiveFont = fontFamily ?? dvar('typography', 'monoFont');

    return (
      <text
        ref={ref}
        data-bbangto-diagram-tag
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={effectiveFont}
        fontSize={fontSize}
        fill={effectiveFill}
      >
        {`[${label}]`}
      </text>
    );
  },
);

Tag.displayName = 'Tag';
