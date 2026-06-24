import React from 'react';
import { dvar } from '../tokens/contract';

export interface EdgeLabelProps {
  x: number;
  y: number;
  label: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  bgFill?: string;
  padding?: number;
}

export const EdgeLabel = React.forwardRef<SVGGElement, EdgeLabelProps>(
  (
    {
      x,
      y,
      label,
      fontSize = 11,
      fontFamily,
      fill,
      bgFill = 'white',
      padding = 3,
    },
    ref,
  ) => {
    const effectiveFill = fill ?? dvar('edge', 'stroke');
    const effectiveFont = fontFamily ?? dvar('typography', 'monoFont');
    const charWidth = fontSize * 0.6;
    const approxWidth = label.length * charWidth + padding * 2;

    return (
      <g ref={ref} data-bbangto-diagram-edge-label>
        <rect
          x={x - approxWidth / 2}
          y={y - fontSize / 2 - padding}
          width={approxWidth}
          height={fontSize + padding * 2}
          fill={bgFill}
          stroke="none"
          rx={2}
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={effectiveFont}
          fontSize={fontSize}
          fill={effectiveFill}
        >
          {label}
        </text>
      </g>
    );
  },
);

EdgeLabel.displayName = 'EdgeLabel';
