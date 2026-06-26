import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
/**
 * Visual treatment of the textarea surface.
 * - `default` (default-first): bare bordered field on an elevated background.
 * - `soft`: borderless field that sits flush inside one filled, rounded,
 *   subtly elevated surface (no outline ring).
 */
export type TextareaVariant = 'default' | 'soft';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  /** Controls the textarea height preset. Default: 'md' */
  size?: TextareaSize;
  /** Controls the CSS resize handle. Default: 'vertical' */
  resize?: TextareaResize;
  /** Visual surface treatment. Default: 'default' */
  variant?: TextareaVariant;
  /** Shows a spinner-style opacity pulse and disables interaction (like Button loading). */
  loading?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      size = 'md',
      resize = 'vertical',
      variant = 'default',
      loading = false,
      style,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Size → minHeight + padding + fontSize
    const sizeMap: Record<TextareaSize, { minHeight: string; paddingY: string; paddingX: string; fontSize: string }> = {
      sm: {
        minHeight: '60px',
        paddingY: cssVar('spacing', '6'),
        paddingX: cssVar('spacing', '8'),
        fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      },
      md: {
        minHeight: '80px',
        paddingY: cssVar('spacing', '8'),
        paddingX: cssVar('spacing', '12'),
        fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      },
      lg: {
        minHeight: '120px',
        paddingY: cssVar('spacing', '12'),
        paddingX: cssVar('spacing', '16'),
        fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      },
    };

    const { minHeight, paddingY, paddingX, fontSize } = sizeMap[size];

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      width: fullWidth ? '100%' : '240px',
      opacity: isDisabled ? 0.5 : 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    // Surface chrome per variant. `default` keeps the original bare bordered
    // field untouched (default-first). `soft` drops the resting outline ring and
    // instead sits flush inside one filled, rounded, subtly elevated surface.
    let surfaceBackground = cssVar('semantic', 'background', 'elevated');
    let surfaceBorder = `1px solid ${error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'border', 'base')}`;
    let surfaceRadius = cssVar('radius', 'md');
    let surfaceShadow: string | undefined;

    if (variant === 'soft') {
      // Filled surface (sunken fill tone) with no outline ring. Error is still
      // conveyed structurally via a colored border; otherwise borderless.
      surfaceBackground = cssVar('semantic', 'background', 'sunken');
      surfaceBorder = error ? `1px solid ${cssVar('semantic', 'error', 'base')}` : 'none';
      surfaceRadius = cssVar('radius', 'lg');
      surfaceShadow = cssVar('shadow', 'sm');
    }

    const textareaStyle: React.CSSProperties = {
      width: '100%',
      minHeight,
      padding: `${paddingY} ${paddingX}`,
      backgroundColor: surfaceBackground,
      border: surfaceBorder,
      borderRadius: surfaceRadius,
      boxShadow: surfaceShadow,
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      outline: 'none',
      resize,
      transition: 'border-color 0.2s',
      cursor: isDisabled ? 'not-allowed' : 'text',
    };

    const helperStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'foreground', 'subtle'),
    };

    return (
      <div style={containerStyle} className={className} data-bbangto-textarea-variant={variant}>
        {label && <label style={labelStyle}>{label}</label>}
        <textarea
          ref={ref}
          style={textareaStyle}
          disabled={isDisabled}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {(error || helperText) && (
          <span style={helperStyle}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
