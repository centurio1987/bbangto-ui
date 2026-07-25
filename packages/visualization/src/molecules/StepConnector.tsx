import React from 'react';
import { Edge } from '../atoms/Edge';
import type { Point } from '../geometry/anchors';

export type StepConnectorVariant = 'arrow' | 'dashed' | 'none';

export interface StepConnectorProps {
  from: Point;
  to: Point;
  variant?: StepConnectorVariant;
  routing?: 'straight' | 'orthogonal' | 'curved';
}

/** 순차 항목 간 방향 링크 molecule — Edge+Marker를 래핑한다(paint는 계약 시트). */
export const StepConnector = React.forwardRef<SVGGElement, StepConnectorProps>(
  ({ from, to, variant = 'arrow', routing = 'straight' }, ref) => (
    <g ref={ref} data-viz-step-connector>
      <Edge
        from={from}
        to={to}
        routing={routing}
        markerEnd={variant === 'none' ? 'none' : 'arrow'}
        strokeDasharray={variant === 'dashed' ? '6 4' : undefined}
      />
    </g>
  ),
);

StepConnector.displayName = 'StepConnector';
