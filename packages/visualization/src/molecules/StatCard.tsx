import React from 'react';
import { vvar } from '../tokens/contract';
import { StatNumber } from '../atoms/StatNumber';

export interface StatCardProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: number | string;
  unit?: string;
  delta?: number;
}

/** 수치 강조 카드 molecule — StatNumber + 라벨 합성(카드 paint는 계약 시트). */
export const StatCard = React.forwardRef<SVGGElement, StatCardProps>(
  ({ x, y, width, height, label, value, unit, delta }, ref) => (
    <g ref={ref} data-viz-stat-card>
      <rect data-viz-part="shape" x={x} y={y} width={width} height={height} rx={10} />
      <StatNumber
        x={x + width / 2}
        y={y + height * 0.48}
        value={value}
        unit={unit}
        delta={delta}
        fontSize={Math.min(36, height * 0.34)}
      />
      <text
        data-viz-stat-label
        x={x + width / 2}
        y={y + height - 16}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fontFamily={vvar('typography', 'titleFont')}
        style={{ fill: vvar('boundary', 'labelColor') }}
      >
        {label}
      </text>
    </g>
  ),
);

StatCard.displayName = 'StatCard';
