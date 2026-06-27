import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Preset size, or a custom pixel value. Defaults to `md` (32px). */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Spinner color. Defaults to the primary semantic color. */
  color?: string;
  /** Accessible label for screen readers. Defaults to `Loading`. */
  label?: string;
}

const SIZE_MAP = { sm: 16, md: 32, lg: 48 } as const;

/**
 * Loading spinner atom (extracted and tokenized from ProgressIndicator).
 *
 * Because it communicates ongoing progress, the spinner is marked
 * `data-bbangto-motion="essential"` and is therefore EXEMPT from the global
 * `prefers-reduced-motion` reset — stopping it would remove meaningful state.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', color, label = 'Loading', style, ...props }, ref) => {
    const px = typeof size === 'number' ? size : SIZE_MAP[size];

    const containerStyle: React.CSSProperties = {
      display: 'inline-block',
      width: `${px}px`,
      height: `${px}px`,
      ...style,
    };

    const svgStyle: React.CSSProperties = {
      animation: cssVar('motion', 'preset', 'spin'),
      width: '100%',
      height: '100%',
      color: color ?? cssVar('semantic', 'primary', 'base'),
    };

    return (
      <span
        ref={ref}
        style={containerStyle}
        role="status"
        aria-label={label}
        data-bbangto-motion="essential"
        {...props}
      >
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';
