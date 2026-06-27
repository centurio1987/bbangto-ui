import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES } from './keyframes';

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation duration. Defaults to the `normal` motion duration token. */
  duration?: string;
  /** Animation timing function. Defaults to the `out` easing token. */
  easing?: string;
  /** Delay before the animation starts. Defaults to `0ms`. */
  delay?: string;
}

/**
 * Motion wrapper that fades its children in on mount.
 *
 * Fully tokenized: duration/easing default to motion tokens. Respects
 * `prefers-reduced-motion` via the global reset injected by ThemeProvider.
 */
export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ duration, easing, delay, style, children, ...props }, ref) => {
    const animationStyle: React.CSSProperties = {
      animationName: KEYFRAME_NAMES.fadeIn,
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

FadeIn.displayName = 'FadeIn';
