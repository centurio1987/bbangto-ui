import React from 'react';
import { vvar } from '../tokens/contract';
import { pickOnInk, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import { resolveLabelFont } from '../tokens/labelFont';

export interface MilestoneMarkerProps {
  /** 축 위의 지점. */
  x: number;
  y: number;
  /** 기간/연도 표기(2026 등). */
  period: string;
  /** 기간 배지를 축의 위/아래 어느 쪽에 둘지. */
  side?: 'above' | 'below';
  radius?: number;
  fill?: string;
}

/** 타임라인 지점 마커 atom — 축 위 지점 dot + 기간 배지. */
export const MilestoneMarker = React.forwardRef<SVGGElement, MilestoneMarkerProps>(
  ({ x, y, period, side = 'above', radius = 7, fill }, ref) => {
    const dotFill = fill ?? vvar('shape', 'stroke');
    // 기본 알약(도형 선색) 위 글자는 그 면으로 고른다(KAN-075). 색을 넘기면 계산할 수 없어 캔버스 바탕색이다.
    const foundation = useVizFoundation();
    const periodFill = fill === undefined ? pickOnInk(foundation, surfacesFor(foundation, foundation.shape.stroke)) : vvar('canvas', 'bg');
    const badgeW = Math.max(44, period.length * 9 + 16);
    const dir = side === 'above' ? -1 : 1;
    const badgeCenterY = y + dir * (radius + 19);

    return (
      <g ref={ref} data-viz-milestone-marker>
        <circle cx={x} cy={y} r={radius} style={{ fill: dotFill, stroke: vvar('canvas', 'bg'), strokeWidth: 2 }} />
        <rect
          x={x - badgeW / 2}
          y={badgeCenterY - 10}
          width={badgeW}
          height={20}
          rx={10}
          style={{ fill: dotFill }}
        />
        <text
          x={x}
          y={badgeCenterY}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fontWeight={700}
          fontFamily={resolveLabelFont(period)}
          style={{ fill: periodFill }}
        >
          {period}
        </text>
      </g>
    );
  },
);

MilestoneMarker.displayName = 'MilestoneMarker';
