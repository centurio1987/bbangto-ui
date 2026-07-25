import React from 'react';

export interface BandEdgeProps {
  /** source 우측 앵커(중심 y). */
  sx: number;
  sy: number;
  /** target 좌측 앵커(중심 y). */
  tx: number;
  ty: number;
  /** 리본 폭(값 비례). */
  width: number;
  fill?: string;
  fillOpacity?: number;
}

/**
 * 가변폭 리본 엣지 atom(Sankey 등) — from{sx,sy,width}→to{tx,ty,width} 큐빅 filled path.
 * stroke 채널의 Edge와 분리(면 채색). fill 미지정 시 계약 shape 채널.
 */
export const BandEdge = React.forwardRef<SVGPathElement, BandEdgeProps>(
  ({ sx, sy, tx, ty, width, fill, fillOpacity = 0.5 }, ref) => {
    const half = width / 2;
    const cx = (sx + tx) / 2;
    // 상단 경계: source 상단 → target 상단, 하단 경계 역방향. 큐빅 수평 제어점.
    const d = [
      `M ${sx} ${sy - half}`,
      `C ${cx} ${sy - half} ${cx} ${ty - half} ${tx} ${ty - half}`,
      `L ${tx} ${ty + half}`,
      `C ${cx} ${ty + half} ${cx} ${sy + half} ${sx} ${sy + half}`,
      'Z',
    ].join(' ');

    return (
      <path
        ref={ref}
        data-bbangto-viz-band-edge
        data-viz-part={fill ? undefined : 'shape'}
        d={d}
        style={fill ? { fill, fillOpacity, stroke: 'none' } : { fillOpacity }}
      />
    );
  },
);

BandEdge.displayName = 'BandEdge';
