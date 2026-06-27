import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  inset?: number;
}

export const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
  ({ children, color, inset = 1, style, ...props }, ref) => {
    const beamColor = color ?? cssVar('semantic', 'primary', 'base');

    return (
      <div
        ref={ref}
        data-bbangto-border-beam
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: cssVar('radius', 'md'),
          padding: inset,
          ...style,
        }}
        {...props}
      >
        <span
          data-bbangto-border-beam-line
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-50%',
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 120deg, ${beamColor} 180deg, transparent 240deg, transparent 360deg)`,
            animation: cssVar('motion', 'preset', 'borderBeam'),
          }}
        />
        <div style={{ position: 'relative' }}>{children}</div>
      </div>
    );
  },
);

BorderBeam.displayName = 'BorderBeam';
