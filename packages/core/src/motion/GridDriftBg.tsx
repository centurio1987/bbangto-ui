import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface GridDriftBgProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gridColor?: string;
  dotColor?: string;
  size?: number;
}

export const GridDriftBg = React.forwardRef<HTMLDivElement, GridDriftBgProps>(
  ({ children, gridColor, dotColor, size = 32, style, ...props }, ref) => {
    const grid = gridColor ?? cssVar('semantic', 'border', 'muted');
    const dot = dotColor ?? cssVar('semantic', 'primary', 'subtle');

    return (
      <div
        ref={ref}
        data-bbangto-grid-drift
        style={{
          backgroundImage: [
            `linear-gradient(${grid} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
            `radial-gradient(circle, ${dot} 1px, transparent 1px)`,
          ].join(', '),
          backgroundSize: `${size}px ${size}px, ${size}px ${size}px, ${size}px ${size}px`,
          animation: cssVar('motion', 'preset', 'gridDrift'),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GridDriftBg.displayName = 'GridDriftBg';
