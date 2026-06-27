import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface AnimatedGradientBgProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  colors?: [string, string, string];
}

export const AnimatedGradientBg = React.forwardRef<HTMLDivElement, AnimatedGradientBgProps>(
  (
    {
      children,
      colors = [
        cssVar('semantic', 'primary', 'subtle'),
        cssVar('semantic', 'warning', 'subtle'),
        cssVar('semantic', 'success', 'subtle'),
      ],
      style,
      ...props
    },
    ref,
  ) => {
    const gradientStyle: React.CSSProperties = {
      backgroundImage: `linear-gradient(120deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      backgroundSize: '200% 200%',
      animation: cssVar('motion', 'preset', 'animatedGradient'),
      ...style,
    };

    return (
      <div ref={ref} data-bbangto-animated-gradient style={gradientStyle} {...props}>
        {children}
      </div>
    );
  },
);

AnimatedGradientBg.displayName = 'AnimatedGradientBg';
