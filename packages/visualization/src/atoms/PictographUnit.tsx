import React from 'react';
import { vvar } from '../tokens/contract';

export interface PictographUnitProps {
  x: number;
  y: number;
  size?: number;
  /** 0~1. 부분 채움(마지막 단위의 소수 표현). */
  fraction?: number;
  fill?: string;
}

/** 아이소타입 반복 1단위 atom — 정량화는 단위 반복 수로 표현한다. */
export const PictographUnit = React.forwardRef<SVGGElement, PictographUnitProps>(
  ({ x, y, size = 16, fraction = 1, fill }, ref) => {
    const unitFill = fill ?? vvar('shape', 'stroke');
    const clamped = Math.max(0, Math.min(1, fraction));

    return (
      <g ref={ref} data-viz-pictograph-unit>
        <rect
          data-viz-part="shape"
          x={x}
          y={y}
          width={size}
          height={size}
          rx={size * 0.2}
          style={{ fill: 'none', stroke: unitFill, strokeWidth: 1.5 }}
        />
        {clamped > 0 && (
          <rect
            x={x}
            y={y}
            width={size * clamped}
            height={size}
            rx={size * 0.2}
            style={{ fill: unitFill, stroke: 'none' }}
          />
        )}
      </g>
    );
  },
);

PictographUnit.displayName = 'PictographUnit';
