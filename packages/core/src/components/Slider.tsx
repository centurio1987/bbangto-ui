import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({
    value = 50,
    min = 0,
    max = 100,
    onChange,
    fullWidth = false,
    style,
    className,
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const range = max - min;
    const percentage = range === 0 ? 0 : Math.min(100, Math.max(0, ((value - min) / range) * 100));

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : '240px',
      height: '24px',
      opacity: disabled ? 0.5 : 1,
      transition: `opacity ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
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
      transition: `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
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
      border: `2px solid ${isFocused ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', 'primary', 'base')}`,
      borderRadius: '50%',
      boxShadow: isFocused ? `0 0 0 4px ${cssVar('semantic', 'primary', 'subtle')}` : cssVar('shadow', 'sm'),
      pointerEvents: 'none',
      transform: isHovered && !disabled ? 'scale(1.08)' : 'scale(1)',
      transition: [
        `left ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
        `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `box-shadow ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        `border-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      ].join(', '),
    };

    return (
      <div
        style={containerStyle}
        className={className}
        data-bbangto-slider
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={trackStyle}>
          <div data-bbangto-slider-fill style={fillStyle} />
        </div>
        <div data-bbangto-slider-knob style={knobStyle} />
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
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onMouseEnter={(event) => {
            setIsHovered(true);
            onMouseEnter?.(event);
          }}
          onMouseLeave={(event) => {
            setIsHovered(false);
            onMouseLeave?.(event);
          }}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
