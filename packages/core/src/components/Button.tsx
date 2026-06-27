import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { Spinner } from '../motion/Spinner';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'gradient' | 'link' | 'neon';
export type ButtonColor = 'primary' | 'error' | 'success' | 'warning' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      shape = 'rounded',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Loading behaves like disabled for interaction, but stays visually "loading".
    const isInteractionDisabled = disabled || loading;
    // Determine colors
    let bg = 'transparent';
    let fg = cssVar('semantic', 'foreground', 'base');
    let border = 'transparent';

    let hoverBg = 'transparent';
    let hoverFg = fg;
    let hoverBorder = 'transparent';

    // Extra chrome that the base solid/outline/ghost/soft cascade never sets.
    // Each stays undefined for legacy variants so their render is untouched.
    let backgroundImage: string | undefined;
    let boxShadow: string | undefined;
    let textShadow: string | undefined;
    let textDecoration: string | undefined;

    const semanticPrefix = color === 'neutral' ? 'border' : color;
    const baseColor = color === 'neutral' ? cssVar('semantic', 'border', 'strong') : cssVar('semantic', semanticPrefix, 'base');
    const hoverColor = color === 'neutral' ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', semanticPrefix, 'hover');
    const activeColor = color === 'neutral' ? cssVar('semantic', 'border', 'muted') : cssVar('semantic', semanticPrefix, 'active');
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
    } else if (variant === 'soft') {
      // Subtle background + colored foreground, reusing existing tokens.
      bg = disabled ? cssVar('semantic', 'disabled', 'background') : subtleColor;
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : baseColor;
      hoverBg = disabled ? bg : subtleColor;
      hoverFg = disabled ? fg : hoverColor;
    } else if (variant === 'gradient') {
      // Multi-stop linear gradient fill (no visible border) with optional
      // elevation. A flat solid/soft fill cannot express this chrome, so the
      // gradient is composed from existing color-scale tokens.
      bg = disabled ? cssVar('semantic', 'disabled', 'background') : baseColor;
      fg = disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : color === 'neutral'
          ? cssVar('semantic', 'foreground', 'inverse')
          : cssVar('semantic', color, 'foreground');
      backgroundImage = disabled
        ? undefined
        : `linear-gradient(135deg, ${baseColor} 0%, ${hoverColor} 50%, ${activeColor} 100%)`;
      boxShadow = disabled ? undefined : cssVar('shadow', 'lg');
      hoverBg = bg;
      hoverFg = fg;
    } else if (variant === 'link') {
      // Inline-link skeleton: no fill, no border, underlined text-color only.
      // Unlike ghost (which fills on hover), the chrome is the underline.
      bg = 'transparent';
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : baseColor;
      textDecoration = 'underline';
      hoverBg = 'transparent';
      hoverFg = disabled ? fg : hoverColor;
    } else if (variant === 'neon') {
      // Transparent fill + saturated border + multi-spread outer glow and a
      // text-shadow glow. Pure CSS elevation that outline's flat border lacks.
      bg = 'transparent';
      fg = disabled ? cssVar('semantic', 'disabled', 'foreground') : baseColor;
      border = disabled ? cssVar('semantic', 'disabled', 'border') : baseColor;
      boxShadow = disabled
        ? undefined
        : `0 0 4px ${baseColor}, 0 0 8px ${baseColor}, 0 0 16px ${baseColor}`;
      textShadow = disabled ? undefined : `0 0 8px ${baseColor}`;
      hoverBg = 'transparent';
      hoverBorder = disabled ? border : hoverColor;
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
      backgroundImage,
      boxShadow,
      textShadow,
      textDecoration,
      color: fg,
      border: `1px solid ${border}`,
      borderRadius: shape === 'pill' ? cssVar('radius', 'full') : cssVar('radius', 'md'),
      fontSize,
      fontWeight,
      lineHeight,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
      transition: `all ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      ...style,
    };

    // Spinner matches the small icon footprint and inherits the foreground color.
    const spinnerColor = disabled ? cssVar('semantic', 'disabled', 'foreground') : fg;

    return (
      <button
        ref={ref}
        disabled={isInteractionDisabled}
        aria-busy={loading || undefined}
        data-bbangto-button-variant={variant}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (!isInteractionDisabled) {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.borderColor = hoverBorder;
            e.currentTarget.style.color = hoverFg;
          }
        }}
        onMouseLeave={(e) => {
          if (!isInteractionDisabled) {
            e.currentTarget.style.backgroundColor = bg;
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.color = fg;
          }
        }}
        {...props}
      >
        {loading ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <Spinner size={16} color={spinnerColor} />
          </span>
        ) : (
          leftIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{leftIcon}</span>
        )}
        {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
        {rightIcon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
