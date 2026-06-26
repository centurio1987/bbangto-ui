import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip visual/layout axis.
 *
 * `action` (default) and `filter` are the legacy behaviour members and stay at
 * the head of the union so existing call sites render unchanged. The tail adds
 * chrome/layout members:
 * - `solid`   — opaque accent fill, on-color text, no border ring.
 * - `outline` — transparent fill, accent border ring + accent text.
 * - `avatar`  — leading circular media slot that bleeds to the inline-start.
 */
export type ChipVariant = 'action' | 'filter' | 'solid' | 'outline' | 'avatar';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  selected?: boolean;
  /**
   * Leading media for the `avatar` variant (e.g. an `<img>` or initials).
   * Rendered inside a circular slot whose diameter equals the chip height and
   * which bleeds to the inline-start edge. Falls back to `leftIcon` when omitted.
   */
  avatar?: React.ReactNode;
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
      avatar,
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
    const isSolid = variant === 'solid';
    const isOutline = variant === 'outline';
    const isAvatar = variant === 'avatar';

    // Accent tones shared by the chrome variants (solid fill / outline ring).
    const accentBg = cssVar('semantic', 'primary', 'base');
    const accentOnColor = cssVar('semantic', 'primary', 'foreground');

    // Legacy cascade colours (action / filter / avatar keep the original look).
    const legacyBg = disabled
      ? cssVar('semantic', 'disabled', 'background')
      : selected
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'background', 'elevated');

    const legacyFg = disabled
      ? cssVar('semantic', 'disabled', 'foreground')
      : selected
        ? cssVar('semantic', 'primary', 'foreground')
        : cssVar('semantic', 'foreground', 'base');

    const legacyBorderColor = disabled
      ? cssVar('semantic', 'disabled', 'border')
      : selected
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'border', 'base');

    let bgColor: string;
    let fgColor: string;
    let borderValue: string;

    if (isSolid) {
      // Fill chrome: opaque accent background, on-color text, no border ring.
      bgColor = disabled ? cssVar('semantic', 'disabled', 'background') : accentBg;
      fgColor = disabled ? cssVar('semantic', 'disabled', 'foreground') : accentOnColor;
      borderValue = 'none';
    } else if (isOutline) {
      // Border chrome: transparent fill, accent ring + accent text. Clearly
      // distinct from solid's fill bucket.
      bgColor = 'transparent';
      fgColor = disabled ? cssVar('semantic', 'disabled', 'foreground') : accentBg;
      borderValue = `1px solid ${disabled ? cssVar('semantic', 'disabled', 'border') : accentBg}`;
    } else {
      bgColor = legacyBg;
      fgColor = legacyFg;
      borderValue = `1px solid ${legacyBorderColor}`;
    }

    const { fontSize, fontWeight } = SIZE_FONT[size];

    // Circular leading-media slot for the avatar layout: diameter == chip
    // height, full radius, and a negative inline-start margin so it bleeds to
    // the chip edge (inset 0 top/bottom via the matched height).
    const avatarSlotStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: SIZE_HEIGHT[size],
      height: SIZE_HEIGHT[size],
      borderRadius: cssVar('radius', 'full'),
      overflow: 'hidden',
      marginLeft: `calc(-1 * ${SIZE_PADDING_X[size]})`,
      marginRight: cssVar('spacing', '4'),
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '4'),
      height: SIZE_HEIGHT[size],
      minWidth: 'fit-content',
      padding: `0 ${SIZE_PADDING_X[size]}`,
      borderRadius: isFilter || isAvatar ? cssVar('radius', 'full') : cssVar('radius', 'md'),
      backgroundColor: bgColor,
      color: fgColor,
      border: borderValue,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize,
      fontWeight,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      ...style,
    };

    const innerContent = (
      <>
        {isAvatar ? (
          <span data-chip-avatar style={avatarSlotStyles}>
            {avatar ?? leftIcon}
          </span>
        ) : (
          leftIcon && (
            <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              {leftIcon}
            </span>
          )
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
          data-bbangto-chip-tag-variant={variant}
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
        data-bbangto-chip-tag-variant={variant}
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
