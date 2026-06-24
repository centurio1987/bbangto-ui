import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Helper/description text shown below the label */
  description?: string;
  /** Size of the checkbox input */
  size?: CheckboxSize;
  /** Error state — turns accent color to error token and sets aria-invalid */
  error?: boolean;
  /**
   * Indeterminate state (e.g. "select all" with partial selection).
   * Sets the DOM `indeterminate` property and aria-checked="mixed".
   */
  indeterminate?: boolean;
}

const CHECKBOX_DIMENSION: Record<CheckboxSize, string> = {
  sm: '14px',
  md: '18px',
  lg: '22px',
};

const LABEL_FONT_SIZE: Record<CheckboxSize, ReturnType<typeof cssVar>> = {
  sm: cssVar('typography', 'scale', 'meta', 'fontSize'),
  md: cssVar('typography', 'scale', 'body', 'fontSize'),
  lg: cssVar('typography', 'scale', 'h3', 'fontSize'),
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      size = 'md',
      error = false,
      indeterminate = false,
      style,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Sync the indeterminate DOM property via callback ref.
    const callbackRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          node.indeterminate = indeterminate;
        }
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [indeterminate, ref]
    );

    const dim = CHECKBOX_DIMENSION[size];
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
            type="checkbox"
            ref={callbackRef}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-checked={indeterminate ? 'mixed' : undefined}
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

Checkbox.displayName = 'Checkbox';
