import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = false, style, className, disabled, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      width: fullWidth ? '100%' : '240px',
      opacity: disabled ? 0.5 : 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const textareaStyle: React.CSSProperties = {
      width: '100%',
      minHeight: '80px',
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color 0.2s',
      cursor: disabled ? 'not-allowed' : 'text',
    };

    const helperStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'foreground', 'subtle'),
    };

    return (
      <div style={containerStyle} className={className}>
        {label && <label style={labelStyle}>{label}</label>}
        <textarea
          ref={ref}
          style={textareaStyle}
          disabled={disabled}
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
