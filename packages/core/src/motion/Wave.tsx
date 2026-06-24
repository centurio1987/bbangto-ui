import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface WaveProps {
  /** Number of dots. Defaults to 3. */
  count?: number;
  /** Diameter of each dot in px. Defaults to 8. */
  dotSize?: number;
  /** Dot color. Defaults to the primary semantic color. */
  color?: string;
  /** Delay between consecutive dots in ms. Defaults to 160. */
  stagger?: number;
  /** Accessible label for screen readers. */
  label?: string;
}

/**
 * Three-dot wave loading indicator. Each dot plays `bbangto-wave` with a
 * staggered delay so the dots appear to ripple. Marked `essential` so it
 * survives the `prefers-reduced-motion` reset.
 */
export const Wave = React.forwardRef<HTMLSpanElement, WaveProps & React.HTMLAttributes<HTMLSpanElement>>(
  (
    { count = 3, dotSize = 8, color, stagger = 160, label = 'Loading', style, ...props },
    ref,
  ) => {
    const dotColor = color ?? cssVar('semantic', 'primary', 'base');
    const animation = cssVar('motion', 'preset', 'wave');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        data-bbangto-motion="essential"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: dotSize / 2,
          ...style,
        }}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: dotColor,
              animation,
              animationDelay: `${i * stagger}ms`,
            }}
          />
        ))}
      </span>
    );
  },
);

Wave.displayName = 'Wave';
