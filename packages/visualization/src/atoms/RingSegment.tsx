import React from 'react';
import { donutSegmentPath } from '../geometry/layout';

export interface RingSegmentProps {
  cx: number;
  cy: number;
  rOuter: number;
  rInner: number;
  /** 12시 = -90°. 시계방향 각도(도). */
  startAngle: number;
  endAngle: number;
  fill?: string;
}

/** 아크/도넛 슬라이스 atom — Cycle 링과 게이지가 공유한다(값은 텍스트 병기 필수). */
export const RingSegment = React.forwardRef<SVGPathElement, RingSegmentProps>(
  ({ cx, cy, rOuter, rInner, startAngle, endAngle, fill }, ref) => (
    <path
      ref={ref}
      data-viz-ring-segment
      data-viz-part={fill ? undefined : 'shape'}
      d={donutSegmentPath(cx, cy, rOuter, rInner, startAngle, endAngle)}
      style={fill ? { fill, stroke: 'none' } : undefined}
    />
  ),
);

RingSegment.displayName = 'RingSegment';
