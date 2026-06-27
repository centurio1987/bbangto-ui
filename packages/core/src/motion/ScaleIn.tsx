import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { KEYFRAME_NAMES } from './keyframes';

export interface ScaleInProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation duration. Defaults to the `normal` motion duration token. */
  duration?: string;
  /** Animation timing function. Defaults to the `out` easing token. */
  easing?: string;
  /** Delay before the animation starts. Defaults to `0ms`. */
  delay?: string;
}

/**
 * Motion wrapper that scales + fades its children in on mount (subtle pop).
 * Useful for popovers, dialogs, and emphasis reveals.
 */
export const ScaleIn = React.forwardRef<HTMLDivElement, ScaleInProps>(
  ({ duration, easing, delay, style, children, ...props }, ref) => {
    const animationStyle: React.CSSProperties = {
      animationName: KEYFRAME_NAMES.scaleIn,
      animationDuration: duration ?? cssVar('motion', 'duration', 'normal'),
      animationTimingFunction: easing ?? cssVar('motion', 'easing', 'out'),
      animationDelay: delay ?? '0ms',
      animationFillMode: 'both',
      ...style,
    };

    return (
      <div ref={ref} style={animationStyle} {...props}>
        {children}
      </div>
    );
  },
);

ScaleIn.displayName = 'ScaleIn';
