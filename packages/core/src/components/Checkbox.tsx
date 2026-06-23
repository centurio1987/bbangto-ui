import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, style, className, disabled, ...props }, ref) => {
    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const labelStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'base'),
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    return (
      <label style={containerStyles} className={className}>
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          style={{
            width: '18px',
            height: '18px',
            accentColor: cssVar('semantic', 'primary', 'base'),
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...props}
        />
        {label && <span style={labelStyles}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
