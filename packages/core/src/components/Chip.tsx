import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'action' | 'filter';
  selected?: boolean;
  /** Visual size of the chip. Defaults to `'md'` (32 px height). */
  size?: ChipSize;
  /**
   * When `true`, renders a remove (×) button inside the chip.
   * The outer chip element becomes a `<span>` wrapper so that two
   * independent focusable targets (chip click + remove click) are
   * accessible without nesting interactive elements.
   */
  removable?: boolean;
  /** Called when the remove button is clicked. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const SIZE_HEIGHT: Record<ChipSize, string> = {
  sm: cssVar('spacing', '24'),
  md: cssVar('spacing', '32'),
  lg: cssVar('spacing', '40'),
};

const SIZE_PADDING_X: Record<ChipSize, string> = {
  sm: cssVar('spacing', '8'),
  md: cssVar('spacing', '12'),
  lg: cssVar('spacing', '16'),
};

const SIZE_FONT: Record<ChipSize, { fontSize: string; fontWeight: string }> = {
  sm: {
    fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
  },
  md: {
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
  },
  lg: {
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
  },
};

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'action',
      selected = false,
      size = 'md',
      removable = false,
      onRemove,
      leftIcon,
      rightIcon,
      children,
      style,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isFilter = variant === 'filter';

    const bgColor = disabled
      ? cssVar('semantic', 'disabled', 'background')
      : selected
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'background', 'elevated');

    const fgColor = disabled
      ? cssVar('semantic', 'disabled', 'foreground')
      : selected
        ? cssVar('semantic', 'primary', 'foreground')
        : cssVar('semantic', 'foreground', 'base');

    const borderColor = disabled
      ? cssVar('semantic', 'disabled', 'border')
      : selected
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'border', 'base');

    const { fontSize, fontWeight } = SIZE_FONT[size];

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '4'),
      height: SIZE_HEIGHT[size],
      minWidth: 'fit-content',
      padding: `0 ${SIZE_PADDING_X[size]}`,
      borderRadius: isFilter ? cssVar('radius', 'full') : cssVar('radius', 'md'),
      backgroundColor: bgColor,
      color: fgColor,
      border: `1px solid ${borderColor}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize,
      fontWeight,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      ...style,
    };

    const innerContent = (
      <>
        {leftIcon && (
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            {leftIcon}
          </span>
        )}
        {children && (
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>
            {children}
          </span>
        )}
        {rightIcon && !removable && (
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            {rightIcon}
          </span>
        )}
      </>
    );

    if (removable) {
      // Use a wrapper <span> so the chip body button and the remove button are
      // siblings — avoids nesting <button> inside <button>.
      const removeButtonStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        padding: '0',
        marginLeft: cssVar('spacing', '2'),
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: 'inherit',
        lineHeight: 1,
        flexShrink: 0,
      };

      const wrapperStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        ...baseStyles,
        // The wrapper carries the visual chip styles; padding accommodates the remove btn.
        paddingRight: cssVar('spacing', '6'),
      };

      return (
        <span
          data-chip
          style={wrapperStyles}
          className={className}
        >
          <button
            ref={ref}
            disabled={disabled}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: cssVar('spacing', '4'),
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              color: 'inherit',
              font: 'inherit',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            {...props}
          >
            {innerContent}
          </button>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${typeof children === 'string' ? children : ''}`}
            onClick={onRemove}
            style={removeButtonStyles}
          >
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </span>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={baseStyles}
        className={className}
        {...props}
      >
        {innerContent}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
