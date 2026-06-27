import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Visual chrome family for the checkbox box.
 * - `solid` (default): the native checkbox painted with `accentColor` — the
 *   historical, unchanged appearance.
 * - `gradient`: the box fill becomes a token-composited linear-gradient surface
 *   (no border) and the check glyph is layered over the gradient. A flat
 *   `accentColor` fill cannot express a multi-stop gradient surface, so the box
 *   is custom-painted with `appearance: none`.
 */
export type CheckboxVariant = 'solid' | 'gradient';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Helper/description text shown below the label */
  description?: string;
  /** Size of the checkbox input */
  size?: CheckboxSize;
  /** Visual chrome family of the box. Defaults to `solid`. */
  variant?: CheckboxVariant;
  /** Error state — turns accent color to error token and sets aria-invalid */
  error?: boolean;
  /**
   * Indeterminate state (e.g. "select all" with partial selection).
   * Sets the DOM `indeterminate` property and aria-checked="mixed".
   */
  indeterminate?: boolean;
}

/** Unique class prefix to scope the gradient glyph styles without a CSS Module. */
const CHECKBOX_ID = 'bbangto-checkbox';

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
      variant = 'solid',
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
    const isGradient = variant === 'gradient';
    const accentColor = error
      ? cssVar('semantic', 'error', 'base')
      : cssVar('semantic', 'primary', 'base');

    // Gradient chrome is composed from existing color-scale tokens (no gradient
    // token exists in the contract). base → hover → active gives the multi-stop
    // surface that a flat accentColor fill cannot express.
    const gradientBase = error
      ? cssVar('semantic', 'error', 'base')
      : cssVar('semantic', 'primary', 'base');
    const gradientMid = error
      ? cssVar('semantic', 'error', 'hover')
      : cssVar('semantic', 'primary', 'hover');
    const gradientEnd = error
      ? cssVar('semantic', 'error', 'active')
      : cssVar('semantic', 'primary', 'active');
    const gradientImage = `linear-gradient(135deg, ${gradientBase} 0%, ${gradientMid} 50%, ${gradientEnd} 100%)`;
    const glyphColor = cssVar('semantic', 'foreground', 'inverse');
    const glyphClass = `${CHECKBOX_ID}-gradient-glyph`;

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

    // Default `solid` keeps the native accentColor box untouched. `gradient`
    // strips the native chrome (appearance:none + border:none) and paints the
    // box with the composed gradient surface; the glyph is layered via the
    // scoped pseudo-element below.
    const inputStyles: React.CSSProperties = isGradient
      ? {
          width: dim,
          height: dim,
          appearance: 'none',
          WebkitAppearance: 'none',
          backgroundImage: gradientImage,
          border: 'none',
          borderRadius: cssVar('radius', 'sm'),
          margin: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          flexShrink: 0,
        }
      : {
          width: dim,
          height: dim,
          accentColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
          flexShrink: 0,
        };

    // Scoped glyph styling for the gradient box: the check is drawn as a rotated
    // border and revealed only when :checked, layered over the gradient fill.
    const gradientCss = `
.${glyphClass} { position: relative; }
.${glyphClass}::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 45%;
  width: 28%;
  height: 55%;
  border: solid ${glyphColor};
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
  opacity: 0;
  pointer-events: none;
}
.${glyphClass}:checked::after { opacity: 1; }
`;

    return (
      <label
        style={containerStyles}
        className={className}
        data-bbangto-checkbox-variant={variant}
      >
        {isGradient && <style>{gradientCss}</style>}
        <span style={rowStyles}>
          <input
            type="checkbox"
            ref={callbackRef}
            disabled={disabled}
            className={isGradient ? glyphClass : undefined}
            aria-invalid={error || undefined}
            aria-checked={indeterminate ? 'mixed' : undefined}
            style={inputStyles}
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
