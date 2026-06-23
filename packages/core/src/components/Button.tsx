import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'primary' | 'error' | 'success' | 'warning' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine colors
    let bg = 'transparent';
    let fg = cssVar('semantic', 'foreground', 'base');
    let border = 'transparent';
    
    let hoverBg = 'transparent';
    let hoverFg = fg;
    let hoverBorder = 'transparent';

    const semanticPrefix = color === 'neutral' ? 'border' : color;
    const baseColor = color === 'neutral' ? cssVar('semantic', 'border', 'strong') : cssVar('semantic', semanticPrefix, 'base');
    const hoverColor = color === 'neutral' ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', semanticPrefix, 'hover');
    const subtleColor = color === 'neutral' ? cssVar('semantic', 'background', 'sunken') : cssVar('semantic', semanticPrefix, 'subtle');

    if (variant === 'solid') {
      bg = disabled ? cssVar('semantic', 'disabled', 'background') : baseColor;
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : (color === 'neutral' ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'foreground'));
      hoverBg = disabled ? bg : hoverColor;
    } else if (variant === 'outline') {
      bg = 'transparent';
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : baseColor;
      border = disabled ? cssVar('semantic', 'disabled', 'border') : baseColor;
      hoverBg = disabled ? bg : subtleColor;
      hoverBorder = disabled ? border : hoverColor;
      hoverFg = disabled ? fg : hoverColor;
    } else if (variant === 'ghost') {
      bg = 'transparent';
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : baseColor;
      hoverBg = disabled ? bg : subtleColor;
      hoverFg = disabled ? fg : hoverColor;
    }

    // Determine sizes
    const paddingY = size === 'sm' ? cssVar('spacing', '6') : size === 'lg' ? cssVar('spacing', '16') : cssVar('spacing', '10');
    const paddingX = size === 'sm' ? cssVar('spacing', '12') : size === 'lg' ? cssVar('spacing', '24') : cssVar('spacing', '16');
    const fontSize = size === 'sm' ? cssVar('typography', 'scale', 'meta', 'fontSize') : size === 'lg' ? cssVar('typography', 'scale', 'h3', 'fontSize') : cssVar('typography', 'scale', 'meta', 'fontSize');
    const fontWeight = cssVar('typography', 'scale', 'meta', 'fontWeight');
    const lineHeight = cssVar('typography', 'scale', 'meta', 'lineHeight');

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '6'),
      width: fullWidth ? '100%' : 'fit-content',
      minWidth: fullWidth ? 'none' : 'fit-content',
      padding: `${paddingY} ${paddingX}`,
      backgroundColor: bg,
      color: fg,
      border: `1px solid ${border}`,
      borderRadius: cssVar('radius', 'md'),
      fontSize,
      fontWeight,
      lineHeight,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: `all ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.borderColor = hoverBorder;
            e.currentTarget.style.color = hoverFg;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = bg;
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.color = fg;
          }
        }}
        {...props}
      >
        {leftIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{leftIcon}</span>}
        {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
        {rightIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
