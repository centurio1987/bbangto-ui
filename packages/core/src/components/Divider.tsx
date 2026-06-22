import React from 'react';
import { cssVar } from '@centurio87/tokens';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'normal' | 'thick';
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', variant = 'normal', style, className, ...props }, ref) => {
    const isVertical = orientation === 'vertical';
    const thickness = variant === 'thick' ? '8px' : '1px';

    const baseStyles: React.CSSProperties = {
      margin: 0,
      flexShrink: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: cssVar('semantic', 'border', 'muted'),
      borderBottomWidth: isVertical ? 0 : thickness,
      borderRightWidth: isVertical ? thickness : 0,
      width: isVertical ? 'auto' : '100%',
      height: isVertical ? '100%' : 'auto',
      ...style,
    };

    return (
      <hr
        ref={ref}
        style={baseStyles}
        className={className}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
