import React, { type ReactNode } from 'react';
import { vvar } from '../tokens/contract';

export interface IconBadgeProps {
  cx: number;
  cy: number;
  radius?: number;
  /** 24×24 viewBox 기준 아이콘 슬롯(중립 — 브랜드 아이콘 도입 금지). */
  children?: ReactNode;
  /** 선택. 배지에서 대상까지 리더 스템을 내린다. */
  stemTo?: { x: number; y: number };
  fill?: string;
  stroke?: string;
}

/** 원형 아이콘 칩/핀 atom — 아이콘 슬롯 + 선택적 리더 스템. */
export const IconBadge = React.forwardRef<SVGGElement, IconBadgeProps>(
  ({ cx, cy, radius = 16, children, stemTo, fill, stroke }, ref) => {
    const bg = fill ?? vvar('canvas', 'bg');
    const line = stroke ?? vvar('shape', 'stroke');
    const iconSize = radius * 1.2;

    return (
      <g ref={ref} data-viz-icon-badge>
        {stemTo && (
          <line x1={cx} y1={cy + radius} x2={stemTo.x} y2={stemTo.y} style={{ stroke: line, strokeWidth: 1.5 }} />
        )}
        <circle cx={cx} cy={cy} r={radius} style={{ fill: bg, stroke: line, strokeWidth: 1.5 }} />
        {children && (
          <svg
            x={cx - iconSize / 2}
            y={cy - iconSize / 2}
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            aria-hidden="true"
            overflow="visible"
          >
            {children}
          </svg>
        )}
      </g>
    );
  },
);

IconBadge.displayName = 'IconBadge';
