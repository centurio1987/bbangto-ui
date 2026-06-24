import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { visuallyHiddenStyle } from './textA11y';

export interface SplitRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  by?: 'char' | 'word';
  stagger?: number;
}

export const SplitReveal = React.forwardRef<HTMLSpanElement, SplitRevealProps>(
  ({ text, by = 'char', stagger = 24, style, ...props }, ref) => {
    const parts = by === 'word' ? text.split(/(\s+)/) : Array.from(text);

    return (
      <span
        ref={ref}
        data-bbangto-split-reveal
        style={{
          display: 'inline-block',
          position: 'relative',
          ...style,
        }}
        {...props}
      >
        <span aria-hidden="true">
          {parts.map((part, index) => {
            const isSpace = /^\s+$/.test(part);
            return (
              <span
                key={`${part}-${index}`}
                data-bbangto-split-reveal-part
                style={{
                  display: isSpace ? 'inline' : 'inline-block',
                  whiteSpace: isSpace ? 'pre' : undefined,
                  animation: isSpace ? undefined : cssVar('motion', 'preset', 'splitReveal'),
                  animationDelay: isSpace ? undefined : `${index * stagger}ms`,
                }}
              >
                {part}
              </span>
            );
          })}
        </span>
        <span data-bbangto-static-text style={visuallyHiddenStyle}>{text}</span>
      </span>
    );
  },
);

SplitReveal.displayName = 'SplitReveal';
