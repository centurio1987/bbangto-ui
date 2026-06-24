import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Loading/placeholder atom that pulses its opacity. Wraps any content (or an
 * empty box) to signal a loading state. Tokenized via the `pulse` motion
 * preset; honours `prefers-reduced-motion` through the global reset.
 */
export const Pulse = React.forwardRef<HTMLDivElement, PulseProps>(
  ({ style, children, ...props }, ref) => {
    const pulseStyle: React.CSSProperties = {
      animation: cssVar('motion', 'preset', 'pulse'),
      ...style,
    };

    return (
      <div ref={ref} style={pulseStyle} {...props}>
        {children}
      </div>
    );
  },
);

Pulse.displayName = 'Pulse';
