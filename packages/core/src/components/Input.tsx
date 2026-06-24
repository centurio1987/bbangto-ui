import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Spinner } from '../motion/Spinner';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Controls padding and font size. Defaults to 'md'. */
  size?: InputSize;
  /** Shows a spinner inside the right slot and disables the input. */
  loading?: boolean;
  /** Success message rendered below the input (mutually exclusive with error). */
  success?: string;
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
      size = 'md',
      loading = false,
      success,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Loading acts like disabled for interaction
    const isInteractionDisabled = disabled || loading;

    // ── Size tokens ───────────────────────────────────────────────────────────
    const paddingY =
      size === 'sm'
        ? cssVar('spacing', '6')
        : size === 'lg'
        ? cssVar('spacing', '16')
        : cssVar('spacing', '10');

    const fontSize =
      size === 'sm'
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : size === 'lg'
        ? cssVar('typography', 'scale', 'body', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize');

    // ── Border color resolution ───────────────────────────────────────────────
    const borderColorIdle = error
      ? cssVar('semantic', 'error', 'base')
      : success && !error
      ? cssVar('semantic', 'success', 'base')
      : cssVar('semantic', 'border', 'strong');

    const borderColorFocus = error
      ? cssVar('semantic', 'error', 'base')
      : success && !error
      ? cssVar('semantic', 'success', 'base')
      : cssVar('semantic', 'border', 'focus');

    // ── Styles ────────────────────────────────────────────────────────────────
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
      backgroundColor: isInteractionDisabled
        ? cssVar('semantic', 'disabled', 'background')
        : cssVar('semantic', 'background', 'base'),
      border: `1px solid ${borderColorIdle}`,
      borderRadius: cssVar('radius', 'md'),
      transition: `border-color ${cssVar('motion', 'duration', 'fast')}`,
      cursor: isInteractionDisabled ? 'not-allowed' : 'text',
      overflow: 'hidden',
    };

    const inputStyles: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      padding: `${paddingY} 0`,
      fontSize,
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      color: isInteractionDisabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: isInteractionDisabled ? 'not-allowed' : undefined,
    };

    // Helper / error / success message
    const messageColor = error
      ? cssVar('semantic', 'error', 'base')
      : success
      ? cssVar('semantic', 'success', 'base')
      : cssVar('semantic', 'foreground', 'muted');

    const helperStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: messageColor,
    };

    const messageText = error || success || helperText;

    // Spinner color mirrors disabled foreground when fully disabled, else base.
    const spinnerColor = disabled
      ? cssVar('semantic', 'disabled', 'foreground')
      : cssVar('semantic', 'foreground', 'muted');

    return (
      <div style={containerStyles} className={className}>
        {label && <label style={labelStyles}>{label}</label>}
        <div
          ref={wrapperRef}
          style={inputWrapperStyles}
          aria-busy={loading || undefined}
        >
          {leftIcon && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={isInteractionDisabled}
            style={inputStyles}
            onFocus={() => {
              if (!isInteractionDisabled && wrapperRef.current) {
                wrapperRef.current.style.borderColor = borderColorFocus;
              }
            }}
            onBlur={() => {
              if (!isInteractionDisabled && wrapperRef.current) {
                wrapperRef.current.style.borderColor = borderColorIdle;
              }
            }}
            {...props}
          />
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Spinner size={16} color={spinnerColor} />
            </span>
          ) : (
            rightIcon && (
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {rightIcon}
              </span>
            )
          )}
        </div>
        {messageText && <span style={helperStyles}>{messageText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
