import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { composeHandlers, getRovingIndex } from '../a11y';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  segments: string[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
  fullWidth?: boolean;
  /** Overall size of the control — affects padding and font size. Default: 'md'. */
  size?: SegmentedControlSize;
  /** Disables all segments, preventing any selection change. */
  disabled?: boolean;
  /** Indexes of individual segments to disable while keeping others interactive. */
  disabledIndexes?: number[];
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      segments,
      selectedIndex = 0,
      onChange,
      fullWidth = false,
      size = 'md',
      disabled = false,
      disabledIndexes = [],
      style,
      className,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    // Padding per size level
    const paddingY: Record<SegmentedControlSize, string> = {
      sm: cssVar('spacing', '2'),
      md: cssVar('spacing', '4'),
      lg: cssVar('spacing', '8'),
    };
    const paddingX: Record<SegmentedControlSize, string> = {
      sm: cssVar('spacing', '10'),
      md: cssVar('spacing', '16'),
      lg: cssVar('spacing', '20'),
    };
    const fontSize: Record<SegmentedControlSize, string> = {
      sm: cssVar('typography', 'scale', 'meta', 'fontSize'),
      md: cssVar('typography', 'scale', 'body', 'fontSize'),
      lg: cssVar('typography', 'scale', 'h3', 'fontSize'),
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: disabled
        ? cssVar('semantic', 'disabled', 'background')
        : cssVar('semantic', 'background', 'sunken'),
      padding: '2px',
      borderRadius: cssVar('radius', 'md'),
      width: fullWidth ? '100%' : 'auto',
      cursor: disabled ? 'not-allowed' : 'auto',
      ...style,
    };

    const segmentStyle = (isSelected: boolean, isSegmentDisabled: boolean): React.CSSProperties => {
      const effectivelyDisabled = disabled || isSegmentDisabled;
      return {
        flex: fullWidth ? 1 : 'none',
        padding: `${paddingY[size]} ${paddingX[size]}`,
        textAlign: 'center',
        cursor: effectivelyDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isSelected
          ? effectivelyDisabled
            ? cssVar('semantic', 'disabled', 'background')
            : cssVar('semantic', 'background', 'elevated')
          : 'transparent',
        color: effectivelyDisabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : isSelected
            ? cssVar('semantic', 'foreground', 'base')
            : cssVar('semantic', 'foreground', 'subtle'),
        borderRadius: cssVar('radius', 'sm'),
        boxShadow: isSelected && !effectivelyDisabled ? cssVar('shadow', 'sm') : 'none',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize: fontSize[size],
        fontWeight: isSelected ? 'bold' : 'normal',
        transition: 'all 0.2s',
        userSelect: 'none',
      };
    };

    const handleSegmentClick = (index: number) => {
      if (disabled) return;
      if (disabledIndexes.includes(index)) return;
      onChange?.(index);
    };

    // Radio group keyboard contract (WAI-ARIA APG Radio Group): one Tab stop —
    // the selected segment, or the first enabled one — and the arrow keys move
    // focus and selection together, skipping disabled segments and wrapping.
    const segmentDisabled = segments.map((_, i) => disabled || disabledIndexes.includes(i));
    const tabStopIndex = !segmentDisabled[selectedIndex]
      ? selectedIndex
      : segmentDisabled.findIndex((d) => !d);

    const handleKeyDown = composeHandlers(onKeyDown, (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || e.altKey || e.ctrlKey || e.metaKey) return;
      const radios = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]'));
      const current = radios.indexOf(document.activeElement as HTMLElement);
      if (current < 0) return;
      if (e.key === ' ') {
        e.preventDefault();
        handleSegmentClick(current);
        return;
      }
      // Both arrow pairs move, as in the APG pattern; Home / End are not part of it.
      if (e.key === 'Home' || e.key === 'End') return;
      const next =
        getRovingIndex(e.key, current, segmentDisabled, { orientation: 'horizontal' }) ??
        getRovingIndex(e.key, current, segmentDisabled, { orientation: 'vertical' });
      if (next === null || next === current) return;
      e.preventDefault();
      radios[next].focus();
      handleSegmentClick(next);
    });

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        data-size={size}
        data-disabled={disabled ? 'true' : undefined}
        role="radiogroup"
        aria-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {segments.map((segment, index) => {
          const isSegmentDisabled = disabledIndexes.includes(index);
          return (
            <div
              key={segment}
              style={segmentStyle(index === selectedIndex, isSegmentDisabled)}
              data-segment-disabled={isSegmentDisabled ? 'true' : undefined}
              role="radio"
              aria-checked={index === selectedIndex}
              aria-disabled={segmentDisabled[index] || undefined}
              tabIndex={index === tabStopIndex ? 0 : -1}
              onClick={() => handleSegmentClick(index)}
            >
              {segment}
            </div>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
