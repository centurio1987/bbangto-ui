import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface BarsLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Preset size, or a custom pixel height. Defaults to `md` (24px). */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Number of bars. Defaults to 4. */
  count?: number;
  /** Bar color. Defaults to the primary semantic color. */
  color?: string;
  /** Accessible label for screen readers. Defaults to `Loading`. */
  label?: string;
}

const SIZE_MAP = { sm: 16, md: 24, lg: 32 } as const;

/**
 * Equalizer-style loading indicator. It communicates ongoing progress, so it is
 * marked essential and survives the global reduced-motion reset.
 */
export const BarsLoader = React.forwardRef<HTMLSpanElement, BarsLoaderProps>(
  ({ size = 'md', count = 4, color, label = 'Loading', style, ...props }, ref) => {
    const height = typeof size === 'number' ? size : SIZE_MAP[size];
    const width = Math.max(3, Math.round(height / 5));
    const barColor = color ?? cssVar('semantic', 'primary', 'base');
    const animation = cssVar('motion', 'preset', 'bars');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        data-bbangto-motion="essential"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: Math.max(2, Math.round(width / 2)),
          height,
          ...style,
        }}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width,
              height,
              borderRadius: cssVar('radius', 'full'),
              backgroundColor: barColor,
              transformOrigin: 'center',
              animation,
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </span>
    );
  },
);

BarsLoader.displayName = 'BarsLoader';
