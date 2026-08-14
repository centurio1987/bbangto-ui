import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

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
    const effectiveFill = fill ?? vvar('edge', 'stroke');
    const effectiveFont = resolveLabelFont(label, fontFamily);

    return (
      <text
        ref={ref}
        data-bbangto-viz-tag
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={effectiveFont}
        fontSize={fontSize}
        style={{ fill: effectiveFill }}
      >
        {`[${label}]`}
      </text>
    );
  },
);

Tag.displayName = 'Tag';
