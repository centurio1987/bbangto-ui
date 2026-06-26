import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type NumberFieldSize = 'sm' | 'md' | 'lg';

/**
 * Chrome treatment for the field.
 *
 * `outline` (default, default-first) is the original bordered input with
 * −/+ steppers and a centered editable number — existing call sites and
 * stories render this and must stay byte-identical.
 *
 * `seven-segment` swaps the editable text input for a dark LED-style readout:
 * fixed-width monospace digit cells where each lit glyph gets an accent glow
 * (color + text-shadow) over a dim, always-on "8" ghost (the inactive
 * segments). A still-accessible spinbutton input is kept visually hidden so
 * keyboard/AT users retain the same semantics.
 */
export type NumberFieldVariant = 'outline' | 'seven-segment';

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
  variant?: NumberFieldVariant;
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
      variant = 'outline',
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

    // ── seven-segment readout chrome ──────────────────────────────────────────
    // A completely different treatment from the outline input: dark screen,
    // monospace digit cells, accent-glow lit glyphs over dim ghost segments.
    if (variant === 'seven-segment') {
      const litColor = disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'primary', 'base');
      const glow = disabled
        ? undefined
        : `0 0 2px ${cssVar('semantic', 'primary', 'base')}, 0 0 6px ${cssVar(
            'semantic',
            'primary',
            'base'
          )}`;

      const panelStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'stretch',
        gap: '0',
        backgroundColor: disabled
          ? cssVar('semantic', 'disabled', 'background')
          : cssVar('semantic', 'background', 'sunken'),
        border: `1px solid ${cssVar('semantic', 'border', 'strong')}`,
        borderRadius: cssVar('radius', 'md'),
        fontFamily: cssVar('typography', 'fontFamily', 'mono'),
        overflow: 'hidden',
        ...style,
      };

      // Dark recessed "screen" the digits sit on (composed from the dark
      // foreground token so the accent glow reads as an LED).
      const readoutStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: cssVar('spacing', '2'),
        padding: `${paddingY} ${cssVar('spacing', '10')}`,
        backgroundColor: cssVar('semantic', 'foreground', 'base'),
        borderLeft: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
        borderRight: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
        fontFamily: cssVar('typography', 'fontFamily', 'mono'),
        fontSize,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: '1',
      };

      const cellStyles: React.CSSProperties = {
        position: 'relative',
        display: 'inline-grid',
        placeItems: 'center',
        width: '0.85em',
        lineHeight: '1',
        fontWeight: 700,
      };
      // Inactive segments: the always-on "8" ghost, dimmed.
      const ghostStyles: React.CSSProperties = {
        gridArea: '1 / 1',
        color: cssVar('semantic', 'foreground', 'subtle'),
        opacity: 0.22,
      };
      // Active segments: the real glyph with accent color + glow.
      const litStyles: React.CSSProperties = {
        gridArea: '1 / 1',
        color: litColor,
        textShadow: glow,
      };

      const hiddenInputStyles: React.CSSProperties = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        border: 0,
        whiteSpace: 'nowrap',
      };

      const chars = String(currentValue).split('');

      return (
        <div
          style={panelStyles}
          className={className}
          data-bbangto-number-variant={variant}
        >
          <button
            type="button"
            aria-label="감소"
            disabled={!canDecrement}
            onClick={handleDecrement}
            style={buttonStyles(canDecrement)}
          >
            {'−'}
          </button>
          <div
            className="bbangto-number-readout"
            style={readoutStyles}
            aria-hidden="true"
          >
            {chars.map((char, index) => (
              <span
                key={`${index}-${char}`}
                className="bbangto-number-cell"
                style={cellStyles}
              >
                <span style={ghostStyles}>8</span>
                <span className="bbangto-number-segment-lit" style={litStyles}>
                  {char}
                </span>
              </span>
            ))}
          </div>
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
            style={hiddenInputStyles}
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

    // ── outline (default) ─────────────────────────────────────────────────────
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
      <div
        style={containerStyles}
        className={className}
        data-bbangto-number-variant={variant}
      >
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
