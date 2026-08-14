import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

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
      bgFill = vvar('canvas', 'bg'),
      padding = 3,
    },
    ref,
  ) => {
    const effectiveFill = fill ?? vvar('edge', 'stroke');
    const effectiveFont = resolveLabelFont(label, fontFamily);
    const charWidth = fontSize * 0.6;
    const approxWidth = label.length * charWidth + padding * 2;

    return (
      <g ref={ref} data-bbangto-viz-edge-label>
        <rect
          x={x - approxWidth / 2}
          y={y - fontSize / 2 - padding}
          width={approxWidth}
          height={fontSize + padding * 2}
          style={{ fill: bgFill, stroke: 'none' }}
          rx={2}
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={effectiveFont}
          fontSize={fontSize}
          style={{ fill: effectiveFill }}
        >
          {label}
        </text>
      </g>
    );
  },
);

EdgeLabel.displayName = 'EdgeLabel';
