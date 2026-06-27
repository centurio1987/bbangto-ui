import React, { useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColor = 'primary' | 'error' | 'success' | 'warning';
export type SliderVariant = 'solid' | 'minimal' | 'stepped';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  /** Track/knob size variant. Defaults to 'md'. */
  size?: SliderSize;
  /** Fill and knob accent color. Defaults to 'primary'. */
  color?: SliderColor;
  /**
   * Visual treatment of the track.
   * - `solid` (default): standard track/fill thickness.
   * - `minimal`: thinner track and a smaller, subtler thumb.
   * - `stepped`: renders tick marks at each `step` interval along the track.
   * Defaults to 'solid'.
   */
  variant?: SliderVariant;
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
    step,
    onChange,
    fullWidth = false,
    size = 'md',
    color = 'primary',
    variant = 'solid',
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

    // `minimal` thins the track and shrinks the thumb relative to the size baseline.
    const baseTrackHeightPx = parseInt(TRACK_HEIGHT[size], 10);
    const minimalTrackHeightPx = Math.max(1, Math.round(baseTrackHeightPx / 2));
    const trackHeight = variant === 'minimal' ? `${minimalTrackHeightPx}px` : TRACK_HEIGHT[size];
    const knobPx = variant === 'minimal'
      ? Math.max(8, Math.round(KNOB_SIZE[size] * 0.7))
      : KNOB_SIZE[size];
    const containerHeight = CONTAINER_HEIGHT[size];

    // Tick positions (as percentages) for the `stepped` variant. When `step` is
    // unknown or non-positive, treat the track as a single segment (no ticks).
    const tickPercents: number[] = [];
    if (variant === 'stepped' && typeof step === 'number' && step > 0 && range > 0) {
      const segments = Math.floor(range / step);
      if (segments >= 1) {
        for (let i = 0; i <= segments; i += 1) {
          tickPercents.push(Math.min(100, ((i * step) / range) * 100));
        }
      }
    }

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

    // Tick marks straddle the track vertically and sit on top of it.
    const tickHeight = `calc(${trackHeight} + 4px)`;
    const tickWidth = '2px';
    const tickStyle = (percent: number): React.CSSProperties => ({
      position: 'absolute',
      left: `${percent}%`,
      top: '50%',
      width: tickWidth,
      height: tickHeight,
      transform: 'translate(-50%, -50%)',
      backgroundColor: cssVar('semantic', 'border', 'base'),
      borderRadius: cssVar('radius', 'full'),
      pointerEvents: 'none',
    });

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
        data-bbangto-slider-variant={variant}
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
          {tickPercents.map((percent, i) => (
            <div
              key={i}
              data-bbangto-slider-tick
              style={tickStyle(percent)}
            />
          ))}
        </div>
        <div data-bbangto-slider-knob style={knobStyle} />
        <input
          ref={ref}
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
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
