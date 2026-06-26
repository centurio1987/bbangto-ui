import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPosition = 'right' | 'left';
// default-first: 'solid' keeps the legacy filled-pill render untouched.
// New members append to the end of the union.
export type SwitchVariant = 'solid' | 'outline';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  /** Size of the switch track. @default 'md' */
  size?: SwitchSize;
  /** Whether the switch is in a loading/pending state. Disables interaction and shows aria-busy. @default false */
  loading?: boolean;
  /** Position of the label relative to the track. @default 'right' */
  labelPosition?: SwitchLabelPosition;
  /** Chrome treatment of the track. @default 'solid' */
  variant?: SwitchVariant;
}

// ── Size tokens ──────────────────────────────────────────────────────────────

interface SwitchDimensions {
  trackWidth: string;
  trackHeight: string;
  knobSize: string;
  trackRadius: string;
}

const SIZE_DIMENSIONS: Record<SwitchSize, SwitchDimensions> = {
  sm: { trackWidth: '28px', trackHeight: '16px', knobSize: '10px', trackRadius: '8px' },
  md: { trackWidth: '40px', trackHeight: '24px', knobSize: '18px', trackRadius: '12px' },
  lg: { trackWidth: '52px', trackHeight: '32px', knobSize: '24px', trackRadius: '16px' },
};

const LABEL_FONT_SIZE: Record<SwitchSize, ReturnType<typeof cssVar>> = {
  sm: cssVar('typography', 'scale', 'meta', 'fontSize'),
  md: cssVar('typography', 'scale', 'body', 'fontSize'),
  lg: cssVar('typography', 'scale', 'h3', 'fontSize'),
};

// ── Component ────────────────────────────────────────────────────────────────

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'md',
      loading = false,
      labelPosition = 'right',
      variant = 'solid',
      style,
      className,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const isInteractionDisabled = disabled || loading;

    const { trackWidth, trackHeight, knobSize, trackRadius } = SIZE_DIMENSIONS[size];

    // Knob offset: positioned 2px from edge regardless of size
    const knobOffset = '2px';
    // When checked: knob sits at (trackWidth - knobSize - 2px) from left
    const knobCheckedLeft = `calc(${trackWidth} - ${knobSize} - ${knobOffset})`;

    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
      gap: cssVar('spacing', '8'),
      cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
      opacity: isInteractionDisabled ? 0.5 : 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const labelStyles: React.CSSProperties = {
      fontSize: LABEL_FONT_SIZE[size],
      color: cssVar('semantic', 'foreground', 'base'),
      cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
    };

    // Variant cascade. 'solid' is the legacy filled-pill render and stays
    // byte-for-byte identical so existing callers/stories are untouched.
    // 'outline' shifts the chrome from fill to border: the track is
    // transparent (or a subtle color-mix tint when on) and the on-state is
    // signalled by an accent border-color rather than a full track fill.
    let trackBackground: string;
    let trackBorderColor: string;
    if (variant === 'outline') {
      trackBackground = checked
        ? `color-mix(in srgb, ${cssVar('semantic', 'primary', 'base')} 18%, transparent)`
        : 'transparent';
      trackBorderColor = checked
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'border', 'base');
    } else {
      trackBackground = checked
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'background', 'elevated');
      trackBorderColor = checked
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'border', 'strong');
    }

    const trackStyles: React.CSSProperties = {
      position: 'relative',
      width: trackWidth,
      height: trackHeight,
      backgroundColor: trackBackground,
      borderRadius: trackRadius,
      transition: `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}, border-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      border: `1px solid ${trackBorderColor}`,
      flexShrink: 0,
    };

    const knobStyles: React.CSSProperties = {
      position: 'absolute',
      top: knobOffset,
      left: checked ? knobCheckedLeft : knobOffset,
      width: knobSize,
      height: knobSize,
      // 'solid' keeps the legacy white knob; 'outline' tints the knob with the
      // same border accent so it stays visible against the transparent track.
      backgroundColor: variant === 'outline' ? trackBorderColor : cssVar('common', 'white'),
      borderRadius: '50%',
      transition: `left ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      boxShadow: cssVar('shadow', 'sm'),
    };

    return (
      <label
        aria-busy={loading || undefined}
        data-bbangto-toggle-variant={variant}
        style={containerStyles}
        className={className}
      >
        {labelPosition === 'left' && label && (
          <span style={labelStyles}>{label}</span>
        )}
        <div style={trackStyles} data-size={size}>
          <div style={knobStyles} />
        </div>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          disabled={isInteractionDisabled}
          checked={checked}
          style={{
            // Visually hidden but kept in the accessibility tree and focusable
            // (display:none would remove it from the a11y tree entirely).
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            border: 0,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap',
          }}
          {...props}
        />
        {labelPosition !== 'left' && label && (
          <span style={labelStyles}>{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
