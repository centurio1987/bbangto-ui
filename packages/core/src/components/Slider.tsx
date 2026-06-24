import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColor = 'primary' | 'error' | 'success' | 'warning';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  /** Track/knob size variant. Defaults to 'md'. */
  size?: SliderSize;
  /** Fill and knob accent color. Defaults to 'primary'. */
  color?: SliderColor;
  /** Show the current numeric value above the knob. Defaults to false. */
  showValue?: boolean;
}

// Track heights per size
const TRACK_HEIGHT: Record<SliderSize, string> = {
  sm: '2px',
  md: '4px',
  lg: '6px',
};

// Knob dimensions per size
const KNOB_SIZE: Record<SliderSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

// Container heights per size (knob + some padding)
const CONTAINER_HEIGHT: Record<SliderSize, string> = {
  sm: '20px',
  md: '24px',
  lg: '32px',
};

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({
    value = 50,
    min = 0,
    max = 100,
    onChange,
    fullWidth = false,
    size = 'md',
    color = 'primary',
    showValue = false,
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

    const knobPx = KNOB_SIZE[size];
    const trackHeight = TRACK_HEIGHT[size];
    const containerHeight = CONTAINER_HEIGHT[size];

    // Resolve color tokens
    const baseColor = cssVar('semantic', color, 'base');
    const subtleColor = cssVar('semantic', color, 'subtle');
    const focusBorderColor = color === 'primary'
      ? cssVar('semantic', 'border', 'focus')
      : baseColor;

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : '240px',
      height: showValue ? `calc(${containerHeight} + 20px)` : containerHeight,
      opacity: disabled ? 0.5 : 1,
      transition: `opacity ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: trackHeight,
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      borderRadius: cssVar('radius', 'full'),
      top: showValue ? `calc(20px + (${containerHeight} - ${trackHeight}) / 2)` : `calc((${containerHeight} - ${trackHeight}) / 2)`,
    };

    const fillStyle: React.CSSProperties = {
      position: 'absolute',
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: baseColor,
      borderRadius: cssVar('radius', 'full'),
      transition: `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
    };

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: 0,
      top: 0,
    };

    const knobTopOffset = showValue
      ? `calc(20px + (${containerHeight} - ${knobPx}px) / 2)`
      : `calc((${containerHeight} - ${knobPx}px) / 2)`;

    const knobStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(${percentage}% - ${knobPx / 2}px)`,
      top: knobTopOffset,
      width: `${knobPx}px`,
      height: `${knobPx}px`,
      backgroundColor: cssVar('common', 'white'),
      border: `2px solid ${isFocused ? focusBorderColor : baseColor}`,
      borderRadius: '50%',
      boxShadow: isFocused ? `0 0 0 4px ${subtleColor}` : cssVar('shadow', 'sm'),
      pointerEvents: 'none',
      transform: isHovered && !disabled ? 'scale(1.08)' : 'scale(1)',
      transition: [
        `left ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
        `top ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
        `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `box-shadow ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        `border-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      ].join(', '),
    };

    const labelStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(${percentage}% - ${knobPx / 2}px)`,
      top: 0,
      minWidth: `${knobPx}px`,
      textAlign: 'center',
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'base'),
      pointerEvents: 'none',
      transition: `left ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
      userSelect: 'none',
    };

    return (
      <div
        style={containerStyle}
        className={className}
        data-bbangto-slider
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showValue && (
          <span data-bbangto-slider-label style={labelStyle}>
            {value}
          </span>
        )}
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
