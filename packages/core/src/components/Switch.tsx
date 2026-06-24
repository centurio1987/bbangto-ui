import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, style, className, disabled, checked, ...props }, ref) => {
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

    const trackStyles: React.CSSProperties = {
      position: 'relative',
      width: '40px',
      height: '24px',
      backgroundColor: checked ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'background', 'elevated'),
      borderRadius: '12px',
      transition: `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      border: `1px solid ${checked ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'strong')}`,
    };

    const knobStyles: React.CSSProperties = {
      position: 'absolute',
      top: '2px',
      left: checked ? 'calc(100% - 20px)' : '2px',
      width: '18px',
      height: '18px',
      backgroundColor: cssVar('common', 'white'),
      borderRadius: '50%',
      transition: `left ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      boxShadow: cssVar('shadow', 'sm'),
    };

    return (
      <label style={containerStyles} className={className}>
        <div style={trackStyles}>
          <div style={knobStyles} />
        </div>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          disabled={disabled}
          checked={checked}
          style={{ display: 'none' }}
          {...props}
        />
        {label && <span style={labelStyles}>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
