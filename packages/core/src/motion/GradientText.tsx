import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  colors?: [string, string, string];
}

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  (
    {
      children,
      colors = [
        cssVar('semantic', 'primary', 'base'),
        cssVar('semantic', 'warning', 'base'),
        cssVar('semantic', 'success', 'base'),
      ],
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        data-bbangto-gradient-text
        style={{
          display: 'inline-block',
          color: 'transparent',
          backgroundImage: `linear-gradient(120deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: cssVar('motion', 'preset', 'gradientText'),
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  },
);

GradientText.displayName = 'GradientText';
