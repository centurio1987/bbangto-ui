import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { usePrefersReducedMotion, visuallyHiddenStyle } from './textA11y';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gap?: string;
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      text,
      gap = cssVar('spacing', '32'),
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [paused, setPaused] = React.useState(false);
    const copies = prefersReducedMotion ? [text] : [text, text, text, text];

    return (
      <div
        ref={ref}
        data-bbangto-marquee
        style={{
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
        onMouseEnter={(event) => {
          setPaused(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setPaused(false);
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          setPaused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setPaused(false);
          onBlur?.(event);
        }}
        {...props}
      >
        <div
          aria-hidden="true"
          data-bbangto-marquee-track
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap,
            minWidth: 'max-content',
            whiteSpace: 'nowrap',
            animation: prefersReducedMotion ? undefined : cssVar('motion', 'preset', 'marquee'),
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {copies.map((copy, index) => (
            <span key={index} data-bbangto-marquee-copy>
              {copy}
            </span>
          ))}
        </div>
        <span data-bbangto-static-text style={visuallyHiddenStyle}>{text}</span>
      </div>
    );
  },
);

Marquee.displayName = 'Marquee';
