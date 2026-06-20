import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
          type="radio"
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

Radio.displayName = 'Radio';
