import React from 'react';
import { vvar } from '../tokens/contract';
import { pickOnInk, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';

export type IndexBadgeVariant = 'circle' | 'square' | 'pill';

export interface IndexBadgeProps {
  cx: number;
  cy: number;
  /** 1부터 시작하는 순번. 01/02… 두 자리로 패딩되어 표기된다. */
  index: number;
  radius?: number;
  variant?: IndexBadgeVariant;
  fill?: string;
  textFill?: string;
}

/** 순번 배지 atom — 모든 패턴의 순번 표기를 통합한다(순번은 DOM 순서와 일치시킬 것). */
export const IndexBadge = React.forwardRef<SVGGElement, IndexBadgeProps>(
  ({ cx, cy, index, radius = 14, variant = 'circle', fill, textFill }, ref) => {
    const bgFill = fill ?? vvar('shape', 'stroke');
    // 기본 배지(도형 선색) 위 번호는 그 면으로 글자색을 고른다(KAN-075). 배지 색을 넘기면 textFill 도 함께 넘긴다.
    const foundation = useVizFoundation();
    const numFill =
      textFill ?? (fill === undefined ? pickOnInk(foundation, surfacesFor(foundation, foundation.shape.stroke)) : vvar('canvas', 'bg'));
    const label = String(index).padStart(2, '0');

    return (
      <g ref={ref} data-viz-index-badge data-viz-index={index}>
        {variant === 'circle' && <circle cx={cx} cy={cy} r={radius} style={{ fill: bgFill }} />}
        {variant === 'square' && (
          <rect x={cx - radius} y={cy - radius} width={radius * 2} height={radius * 2} style={{ fill: bgFill }} />
        )}
        {variant === 'pill' && (
          <rect
            x={cx - radius * 1.4}
            y={cy - radius * 0.8}
            width={radius * 2.8}
            height={radius * 1.6}
            rx={radius * 0.8}
            style={{ fill: bgFill }}
          />
        )}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={radius * 0.9}
          fontWeight={700}
          fontFamily={vvar('typography', 'monoFont')}
          style={{ fill: numFill }}
        >
          {label}
        </text>
      </g>
    );
  },
);

IndexBadge.displayName = 'IndexBadge';
