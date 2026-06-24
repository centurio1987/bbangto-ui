import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type NumberFieldSize = 'sm' | 'md' | 'lg';

export interface NumberFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size' | 'type'
  > {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: NumberFieldSize;
}

const clamp = (value: number, min?: number, max?: number): number => {
  let next = value;
  if (typeof min === 'number' && next < min) next = min;
  if (typeof max === 'number' && next > max) next = max;
  return next;
};

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      disabled = false,
      size = 'md',
      style,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(
      defaultValue ?? 0
    );
    const currentValue = isControlled ? (valueProp as number) : internalValue;

    const commitValue = (next: number) => {
      const clamped = clamp(next, min, max);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      if (clamped !== currentValue) {
        onValueChange?.(clamped);
      }
    };

    const canDecrement =
      !disabled && (typeof min !== 'number' || currentValue > min);
    const canIncrement =
      !disabled && (typeof max !== 'number' || currentValue < max);

    const handleDecrement = () => {
      if (!canDecrement) return;
      commitValue(currentValue - step);
    };

    const handleIncrement = () => {
      if (!canIncrement) return;
      commitValue(currentValue + step);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      if (raw === '') return;
      const parsed = Number(raw);
      if (Number.isNaN(parsed)) return;
      commitValue(parsed);
    };

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
        ? cssVar('typography', 'scale', 'h3', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize');

    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'stretch',
      gap: '0',
      backgroundColor: disabled
        ? cssVar('semantic', 'disabled', 'background')
        : cssVar('semantic', 'background', 'base'),
      border: `1px solid ${cssVar('semantic', 'border', 'strong')}`,
      borderRadius: cssVar('radius', 'md'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      overflow: 'hidden',
      ...style,
    };

    const buttonStyles = (enabled: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${cssVar('spacing', '12')}`,
      backgroundColor: 'transparent',
      color: enabled
        ? cssVar('semantic', 'foreground', 'base')
        : cssVar('semantic', 'disabled', 'foreground'),
      border: 'none',
      fontSize,
      lineHeight: '1',
      cursor: enabled ? 'pointer' : 'not-allowed',
      transition: `color ${cssVar('motion', 'duration', 'fast')} ${cssVar(
        'motion',
        'easing',
        'default'
      )}`,
      outline: 'none',
      flexShrink: 0,
    });

    const inputStyles: React.CSSProperties = {
      width: '3.5em',
      minWidth: 0,
      padding: `${paddingY} ${cssVar('spacing', '6')}`,
      textAlign: 'center',
      fontSize,
      color: disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      backgroundColor: 'transparent',
      border: 'none',
      borderLeft: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRight: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      outline: 'none',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    return (
      <div style={containerStyles} className={className}>
        <button
          type="button"
          aria-label="감소"
          disabled={!canDecrement}
          onClick={handleDecrement}
          style={buttonStyles(canDecrement)}
        >
          {'−'}
        </button>
        <input
          ref={ref}
          type="number"
          role="spinbutton"
          inputMode="numeric"
          value={currentValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-valuenow={currentValue}
          aria-valuemin={min}
          aria-valuemax={max}
          onChange={handleInputChange}
          style={inputStyles}
          {...props}
        />
        <button
          type="button"
          aria-label="증가"
          disabled={!canIncrement}
          onClick={handleIncrement}
          style={buttonStyles(canIncrement)}
        >
          {'+'}
        </button>
      </div>
    );
  }
);

NumberField.displayName = 'NumberField';
