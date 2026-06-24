import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
}

export const Glow = React.forwardRef<HTMLDivElement, GlowProps>(
  ({ children, color, style, ...props }, ref) => (
    <div
      ref={ref}
      data-bbangto-glow
      style={{
        color: color ?? cssVar('semantic', 'primary', 'base'),
        animation: cssVar('motion', 'preset', 'glow'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);

Glow.displayName = 'Glow';
