import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  /** Accessible label for screen readers. Defaults to `Loading content`. */
  label?: string;
}

/**
 * Skeleton shimmer block. It communicates loading state, so it is marked
 * essential and exposes status semantics.
 */
export const Shimmer = React.forwardRef<HTMLDivElement, ShimmerProps>(
  ({ width = '100%', height = '1rem', radius, label = 'Loading content', style, ...props }, ref) => {
    const shimmerStyle: React.CSSProperties = {
      display: 'block',
      width,
      height,
      borderRadius: radius ?? cssVar('radius', 'sm'),
      backgroundImage: `linear-gradient(90deg, ${cssVar('semantic', 'border', 'muted')} 0%, ${cssVar('semantic', 'background', 'elevated')} 50%, ${cssVar('semantic', 'border', 'muted')} 100%)`,
      backgroundSize: '200% 100%',
      animation: cssVar('motion', 'preset', 'shimmer'),
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        data-bbangto-motion="essential"
        style={shimmerStyle}
        {...props}
      />
    );
  },
);

Shimmer.displayName = 'Shimmer';
