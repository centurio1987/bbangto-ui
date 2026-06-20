import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'action' | 'filter';
  selected?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ variant = 'action', selected = false, leftIcon, rightIcon, children, style, className, ...props }, ref) => {
    
    const isFilter = variant === 'filter';

    // Base background: if selected, usually a tinted background or primary color
    // According to BBANGTO, filters selected are primary, unselected are white/elevated with borders.
    const bgColor = selected
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'background', 'elevated');
      
    const fgColor = selected
      ? cssVar('semantic', 'primary', 'foreground')
      : cssVar('semantic', 'foreground', 'base');
      
    const borderColor = selected
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'border', 'base');

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '4'),
      height: '32px',
      minWidth: 'fit-content',
      padding: `0 ${cssVar('spacing', '12')}`,
      borderRadius: isFilter ? cssVar('radius', 'full') : cssVar('radius', 'md'),
      backgroundColor: bgColor,
      color: fgColor,
      border: `1px solid ${borderColor}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ...style,
    };

    return (
      <button ref={ref} style={baseStyles} className={className} {...props}>
        {leftIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{leftIcon}</span>}
        {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
        {rightIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{rightIcon}</span>}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
