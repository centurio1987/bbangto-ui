import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { usePrefersReducedMotion, visuallyHiddenStyle } from './textA11y';

export interface TypingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: React.ReactNode;
}

export const TypingText = React.forwardRef<HTMLSpanElement, TypingTextProps>(
  ({ text, speed = 35, startDelay = 0, cursor = '|', style, ...props }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [visibleCount, setVisibleCount] = React.useState(() => (speed <= 0 ? text.length : 0));

    React.useEffect(() => {
      if (prefersReducedMotion || speed <= 0 || typeof window === 'undefined') {
        setVisibleCount(text.length);
        return;
      }

      setVisibleCount(0);
      let interval = 0;
      const timeout = window.setTimeout(() => {
        interval = window.setInterval(() => {
          setVisibleCount((current) => {
            if (current >= text.length) {
              window.clearInterval(interval);
              return current;
            }
            return current + 1;
          });
        }, speed);
      }, startDelay);

      return () => {
        window.clearTimeout(timeout);
        window.clearInterval(interval);
      };
    }, [prefersReducedMotion, speed, startDelay, text]);

    const visualText = text.slice(0, visibleCount);
    const showCursor = visibleCount < text.length && !prefersReducedMotion;

    return (
      <span
        ref={ref}
        data-bbangto-typing-text
        style={{
          display: 'inline-block',
          position: 'relative',
          ...style,
        }}
        {...props}
      >
        <span aria-hidden="true">
          {visualText}
          {showCursor ? (
            <span
              data-bbangto-typing-cursor
              style={{
                display: 'inline-block',
                marginLeft: '0.08em',
                animation: cssVar('motion', 'preset', 'pulse'),
              }}
            >
              {cursor}
            </span>
          ) : null}
        </span>
        <span data-bbangto-static-text style={visuallyHiddenStyle}>{text}</span>
      </span>
    );
  },
);

TypingText.displayName = 'TypingText';
