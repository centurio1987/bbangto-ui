import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES } from './keyframes';

export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay increment between children in ms. Defaults to 80. */
  stagger?: number;
  /** FadeIn duration for each child. Defaults to `motion.duration.normal`. */
  duration?: string;
  /** FadeIn easing for each child. Defaults to `motion.easing.out`. */
  easing?: string;
}

/**
 * Sequences the entrance of direct children by applying an incremental
 * `animation-delay` to each, producing a staggered fade-in cascade.
 *
 * The wrapper div itself is unstyled — lay it out as needed. Each child
 * receives a transparent wrapping `div` with the stagger animation; the child's
 * own layout is preserved. To stagger a flex/grid row, apply flex/grid styles
 * to the Stagger root via `style` and use block children.
 */
export const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ stagger = 80, duration, easing, style, children, ...props }, ref) => {
    const dur = duration ?? cssVar('motion', 'duration', 'normal');
    const ease = easing ?? cssVar('motion', 'easing', 'out');

    return (
      <div ref={ref} style={style} {...props}>
        {React.Children.map(children, (child, i) => (
          <div
            style={{
              animationName: KEYFRAME_NAMES.fadeIn,
              animationDuration: dur,
              animationTimingFunction: ease,
              animationDelay: `${i * stagger}ms`,
              animationFillMode: 'both',
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
);

Stagger.displayName = 'Stagger';
