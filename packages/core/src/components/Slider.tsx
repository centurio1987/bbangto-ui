import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value = 50, min = 0, max = 100, onChange, fullWidth = false, style, className, disabled, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : '240px',
      height: '24px',
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '4px',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      borderRadius: '2px',
    };

    const fillStyle: React.CSSProperties = {
      position: 'absolute',
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: cssVar('semantic', 'primary', 'base'),
      borderRadius: '2px',
    };

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: 0,
    };

    const knobStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(${percentage}% - 8px)`,
      width: '16px',
      height: '16px',
      backgroundColor: cssVar('common', 'white'),
      border: `2px solid ${cssVar('semantic', 'primary', 'base')}`,
      borderRadius: '50%',
      boxShadow: cssVar('shadow', 'sm'),
      pointerEvents: 'none',
      transition: 'box-shadow 0.2s',
    };

    return (
      <div style={containerStyle} className={className}>
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
        <div style={knobStyle} />
        <input
          ref={ref}
          type="range"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
