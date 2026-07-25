import React from 'react';
import { vvar } from '../tokens/contract';

export interface VsDividerProps {
  x: number;
  y1: number;
  y2: number;
  label?: string;
  radius?: number;
}

/** 중앙 분할선 atom — Comparison의 좌/우 대비 축 + 중앙 라벨(VS). */
export const VsDivider = React.forwardRef<SVGGElement, VsDividerProps>(
  ({ x, y1, y2, label = 'VS', radius = 18 }, ref) => {
    const cy = (y1 + y2) / 2;
    const ink = vvar('shape', 'stroke');

    return (
      <g ref={ref} data-viz-vs-divider>
        <line x1={x} y1={y1} x2={x} y2={y2} style={{ stroke: ink, strokeWidth: 1.5, strokeDasharray: '6 4' }} />
        <circle cx={x} cy={cy} r={radius} style={{ fill: ink }} />
        <text
          x={x}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={radius * 0.7}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('canvas', 'bg') }}
        >
          {label}
        </text>
      </g>
    );
  },
);

VsDivider.displayName = 'VsDivider';
