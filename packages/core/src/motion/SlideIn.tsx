import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS } from './keyframes';

/** The direction the content travels as it enters. */
export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideInProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction the content moves while entering. Defaults to `up`. */
  direction?: SlideDirection;
  /** Travel distance. Defaults to the `md` motion distance token. */
  distance?: string;
  /** Animation duration. Defaults to the `normal` motion duration token. */
  duration?: string;
  /** Animation timing function. Defaults to the `out` easing token. */
  easing?: string;
  /** Delay before the animation starts. Defaults to `0ms`. */
  delay?: string;
}

/**
 * Motion wrapper that slides + fades its children in on mount. A single
 * keyframe (`bbangto-slide-in`) reads the per-instance offset from CSS custom
 * properties, so every direction shares one keyframe.
 */
export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  (
    { direction = 'up', distance, duration, easing, delay, style, children, ...props },
    ref,
  ) => {
    const d = distance ?? cssVar('motion', 'distance', 'md');
    const neg = `calc(-1 * ${d})`;

    // Initial offset: "up" starts below and rises to its place, etc.
    const offset: Record<SlideDirection, { x: string; y: string }> = {
      up: { x: '0px', y: d },
      down: { x: '0px', y: neg },
      left: { x: d, y: '0px' },
      right: { x: neg, y: '0px' },
    };

    const animationStyle = {
      [SLIDE_VARS.x]: offset[direction].x,
      [SLIDE_VARS.y]: offset[direction].y,
      animationName: KEYFRAME_NAMES.slideIn,
      animationDuration: duration ?? cssVar('motion', 'duration', 'normal'),
      animationTimingFunction: easing ?? cssVar('motion', 'easing', 'out'),
      animationDelay: delay ?? '0ms',
      animationFillMode: 'both',
      ...style,
    } as React.CSSProperties;

    return (
      <div ref={ref} style={animationStyle} {...props}>
        {children}
      </div>
    );
  },
);

SlideIn.displayName = 'SlideIn';
