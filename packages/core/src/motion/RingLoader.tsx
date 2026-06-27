import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface RingLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Preset size, or a custom pixel value. Defaults to `md` (32px). */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Ring stroke width in px. Defaults to 4. */
  strokeWidth?: number;
  /** Ring color. Defaults to the primary semantic color. */
  color?: string;
  /** Accessible label for screen readers. Defaults to `Loading`. */
  label?: string;
}

const SIZE_MAP = { sm: 20, md: 32, lg: 48 } as const;

/**
 * Circular ring loader with a rotating SVG and animated dash length. It
 * communicates ongoing progress, so it is marked essential.
 */
export const RingLoader = React.forwardRef<HTMLSpanElement, RingLoaderProps>(
  ({ size = 'md', strokeWidth = 4, color, label = 'Loading', style, ...props }, ref) => {
    const px = typeof size === 'number' ? size : SIZE_MAP[size];
    const ringColor = color ?? cssVar('semantic', 'primary', 'base');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        data-bbangto-motion="essential"
        style={{
          display: 'inline-block',
          width: px,
          height: px,
          ...style,
        }}
        {...props}
      >
        <svg
          style={{
            width: '100%',
            height: '100%',
            animation: cssVar('motion', 'preset', 'spin'),
            color: ringColor,
          }}
          viewBox="0 0 32 32"
          fill="none"
        >
          <circle
            data-bbangto-ring-circle
            cx="16"
            cy="16"
            r="12"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: 78,
              strokeDashoffset: 78,
              transformOrigin: 'center',
              animation: cssVar('motion', 'preset', 'ring'),
            }}
          />
        </svg>
      </span>
    );
  },
);

RingLoader.displayName = 'RingLoader';
