import React from 'react';
import { cssVar } from '@centurio1987/tokens';

// ─── Size ─────────────────────────────────────────────────────────────────────

export type RadioSize = 'sm' | 'md' | 'lg';

const RADIO_DIMENSION: Record<RadioSize, string> = {
  sm: '14px',
  md: '18px',
  lg: '22px',
};

const LABEL_FONT_SIZE: Record<RadioSize, string> = {
  sm: cssVar('typography', 'scale', 'meta', 'fontSize'),
  md: cssVar('typography', 'scale', 'body', 'fontSize'),
  lg: cssVar('typography', 'scale', 'h3', 'fontSize'),
};

// ─── Radio ────────────────────────────────────────────────────────────────────

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed next to the radio input */
  label?: string;
  /** Helper/description text shown below the label */
  description?: string;
  /** Size of the radio input */
  size?: RadioSize;
  /** Error state — turns accent color to error token and sets aria-invalid */
  error?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { label, description, size = 'md', error = false, style, className, disabled, ...props },
    ref
  ) => {
    const dim = RADIO_DIMENSION[size];
    const accentColor = error
      ? cssVar('semantic', 'error', 'base')
      : cssVar('semantic', 'primary', 'base');

    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '2'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const rowStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
    };

    const labelStyles: React.CSSProperties = {
      fontSize: LABEL_FONT_SIZE[size],
      color: error
        ? cssVar('semantic', 'error', 'base')
        : cssVar('semantic', 'foreground', 'base'),
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const descriptionStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      paddingLeft: `calc(${dim} + ${cssVar('spacing', '8')})`,
      cursor: disabled ? 'not-allowed' : 'default',
    };

    return (
      <label style={containerStyles} className={className}>
        <span style={rowStyles}>
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            aria-invalid={error || undefined}
            style={{
              width: dim,
              height: dim,
              accentColor,
              cursor: disabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
            {...props}
          />
          {label && <span style={labelStyles}>{label}</span>}
        </span>
        {description && <span style={descriptionStyles}>{description}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps {
  /** Shared `name` attribute forwarded to all Radio children */
  name: string;
  /** Optional visible legend / group label */
  legend?: string;
  /** Layout direction of the radio items */
  orientation?: RadioGroupOrientation;
  /** Gap override — defaults to spacing-16 for vertical, spacing-24 for horizontal */
  gap?: React.CSSProperties['gap'];
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * RadioGroup wraps a set of `<Radio>` items, forwarding a shared `name`
 * attribute via React.cloneElement so callers don't have to repeat it.
 */
export const RadioGroup = ({
  name,
  legend,
  orientation = 'vertical',
  gap,
  children,
  style,
  className,
}: RadioGroupProps) => {
  const resolvedGap =
    gap ?? (orientation === 'vertical' ? cssVar('spacing', '16') : cssVar('spacing', '24'));

  const groupStyles: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: resolvedGap,
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    ...style,
  };

  const legendStyles: React.CSSProperties = {
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
    color: cssVar('semantic', 'foreground', 'base'),
    marginBottom: cssVar('spacing', '8'),
  };

  const namedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Radio) {
      return React.cloneElement(child as React.ReactElement<RadioProps>, { name });
    }
    return child;
  });

  return (
    <fieldset
      style={{ border: 'none', padding: 0, margin: 0 }}
      className={className}
      role="radiogroup"
    >
      {legend && <legend style={legendStyles}>{legend}</legend>}
      <div style={groupStyles}>{namedChildren}</div>
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';
