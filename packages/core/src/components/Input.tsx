import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '6'),
      width: fullWidth ? '100%' : 'auto',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const labelStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const inputWrapperStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '6'),
      padding: `0 ${cssVar('spacing', '16')}`,
      backgroundColor: disabled ? cssVar('semantic', 'disabled', 'background') : cssVar('semantic', 'background', 'base'),
      border: `1px solid ${error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'border', 'strong')}`,
      borderRadius: cssVar('radius', 'md'),
      transition: `border-color ${cssVar('motion', 'duration', 'fast')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      overflow: 'hidden',
    };

    const inputStyles: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      padding: `${cssVar('spacing', '10')} 0`,
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      color: disabled ? cssVar('semantic', 'disabled', 'foreground') : cssVar('semantic', 'foreground', 'base'),
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
    };

    const helperStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'foreground', 'muted'),
    };

    return (
      <div style={containerStyles} className={className}>
        {label && <label style={labelStyles}>{label}</label>}
        <div ref={wrapperRef} style={inputWrapperStyles}>
          {leftIcon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{leftIcon}</span>}
          <input
            ref={ref}
            disabled={disabled}
            style={inputStyles}
            onFocus={() => {
              if (!disabled && !error && wrapperRef.current) {
                wrapperRef.current.style.borderColor = cssVar('semantic', 'border', 'focus');
              }
            }}
            onBlur={() => {
              if (!disabled && !error && wrapperRef.current) {
                wrapperRef.current.style.borderColor = cssVar('semantic', 'border', 'strong');
              }
            }}
            {...props}
          />
          {rightIcon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{rightIcon}</span>}
        </div>
        {(error || helperText) && (
          <span style={helperStyles}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
