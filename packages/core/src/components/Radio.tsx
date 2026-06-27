import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';

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

/**
 * Visual/layout treatment applied to the whole radio set.
 *
 * - `default`: the historical inline-flex stack (vertical column or horizontal
 *   row). Kept first so every existing call site renders identically.
 * - `card`: each option reflows into a bordered panel (1px border + radius +
 *   padding) with stacked content; the set is a responsive grid that becomes
 *   two columns at the `lg` breakpoint, and the selected panel gets an accent
 *   border + subtle tint via `:has(:checked)`.
 * - `list`: full-width row cards stacked vertically, each split-aligned
 *   (leading content ↔ trailing radio indicator) and divided by a top rule,
 *   with the selected row tinted.
 * - `segmented`: a single rounded-full pill track holding equal-width segments;
 *   the radio dot is visually hidden (label only) and the active segment is
 *   filled with an elevated surface + subtle shadow.
 * - `glass`: a frosted chrome panel — backdrop-filter blur over a translucent
 *   surface, a 1px translucent border highlight, and an active glow when any
 *   item is checked. Replaces the opaque solid fill with a glassy surface.
 */
export type RadioGroupVariant = 'default' | 'card' | 'list' | 'segmented' | 'glass';

/** Unique class prefix to scope variant `<style>` rules without a CSS Module. */
const RADIO_GROUP_ID = 'bbangto-radio-group';

export interface RadioGroupProps {
  /** Shared `name` attribute forwarded to all Radio children */
  name: string;
  /** Optional visible legend / group label */
  legend?: string;
  /** Layout direction of the radio items (only affects `default`/`glass`) */
  orientation?: RadioGroupOrientation;
  /** Visual/layout treatment for the set. Defaults to `default`. */
  variant?: RadioGroupVariant;
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
  variant = 'default',
  gap,
  children,
  style,
  className,
}: RadioGroupProps) => {
  const resolvedGap =
    gap ?? (orientation === 'vertical' ? cssVar('spacing', '16') : cssVar('spacing', '24'));

  const isDefault = variant === 'default';
  const innerClassName = isDefault ? undefined : `${RADIO_GROUP_ID}-${variant}`;
  const itemClassName = isDefault ? undefined : `${RADIO_GROUP_ID}-${variant}-item`;

  // Translucent surfaces are synthesized from existing scale tokens via
  // color-mix so no raw color literals are introduced (glass chrome).
  const glassSurface = `color-mix(in srgb, ${cssVar('semantic', 'background', 'elevated')} 55%, transparent)`;
  const glassBorder = `color-mix(in srgb, ${cssVar('semantic', 'border', 'base')} 50%, transparent)`;
  const glassBlur = `blur(${cssVar('spacing', '12')})`;

  // ── Group container style per variant ──────────────────────────────────────
  let baseGroupStyles: React.CSSProperties;
  if (variant === 'card') {
    baseGroupStyles = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: cssVar('spacing', '16'),
      width: '100%',
    };
  } else if (variant === 'list') {
    baseGroupStyles = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      overflow: 'hidden',
    };
  } else if (variant === 'segmented') {
    baseGroupStyles = {
      display: 'flex',
      flexDirection: 'row',
      gap: cssVar('spacing', '4'),
      padding: cssVar('spacing', '4'),
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      borderRadius: cssVar('radius', 'full'),
    };
  } else if (variant === 'glass') {
    baseGroupStyles = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: resolvedGap,
      padding: cssVar('spacing', '20'),
      backgroundColor: glassSurface,
      backdropFilter: glassBlur,
      WebkitBackdropFilter: glassBlur,
      border: `1px solid ${glassBorder}`,
      borderRadius: cssVar('radius', 'lg'),
    };
  } else {
    // default — historical inline-flex stack (render preserved exactly).
    baseGroupStyles = {
      display: 'inline-flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: resolvedGap,
    };
  }

  const groupStyles: React.CSSProperties = {
    ...baseGroupStyles,
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    ...style,
  };

  // ── Per-item style injected into each Radio child ──────────────────────────
  let itemStyle: React.CSSProperties | undefined;
  if (variant === 'card') {
    itemStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '8'),
      width: '100%',
      padding: cssVar('spacing', '16'),
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      boxSizing: 'border-box',
    };
  } else if (variant === 'list') {
    itemStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: cssVar('spacing', '12'),
      boxSizing: 'border-box',
    };
  } else if (variant === 'segmented') {
    itemStyle = {
      flex: '1 1 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${cssVar('spacing', '6')} ${cssVar('spacing', '12')}`,
      borderRadius: cssVar('radius', 'full'),
      boxSizing: 'border-box',
    };
  }

  // ── Scoped style for selectors inline style cannot express (:has, @media,
  //    child reflow, visually-hidden inputs). Namespaced by variant. ──────────
  let scopedStyle = '';
  if (variant === 'card') {
    scopedStyle = `
      @media (min-width: ${breakpoints.lg}px) {
        .${RADIO_GROUP_ID}-card { grid-template-columns: 1fr 1fr; }
      }
      .${RADIO_GROUP_ID}-card-item:has(input:checked) {
        border-color: ${cssVar('semantic', 'primary', 'base')};
        background-color: ${cssVar('semantic', 'primary', 'subtle')};
        box-shadow: 0 0 0 1px ${cssVar('semantic', 'primary', 'base')};
      }
    `;
  } else if (variant === 'list') {
    scopedStyle = `
      .${RADIO_GROUP_ID}-list-item + .${RADIO_GROUP_ID}-list-item {
        border-top: 1px solid ${cssVar('semantic', 'border', 'base')};
      }
      .${RADIO_GROUP_ID}-list-item > span:first-child {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;
      }
      .${RADIO_GROUP_ID}-list-item:has(input:checked) {
        background-color: ${cssVar('semantic', 'primary', 'subtle')};
      }
    `;
  } else if (variant === 'segmented') {
    scopedStyle = `
      .${RADIO_GROUP_ID}-segmented-item > span:first-child {
        width: 100%;
        justify-content: center;
      }
      .${RADIO_GROUP_ID}-segmented-item input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }
      .${RADIO_GROUP_ID}-segmented-item:has(input:checked) {
        background-color: ${cssVar('semantic', 'background', 'elevated')};
        box-shadow: ${cssVar('shadow', 'sm')};
      }
    `;
  } else if (variant === 'glass') {
    scopedStyle = `
      .${RADIO_GROUP_ID}-glass:has(input:checked) {
        box-shadow: 0 0 0 1px color-mix(in srgb, ${cssVar('semantic', 'primary', 'base')} 50%, transparent),
                    0 0 24px color-mix(in srgb, ${cssVar('semantic', 'primary', 'base')} 35%, transparent);
      }
    `;
  }

  const legendStyles: React.CSSProperties = {
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
    color: cssVar('semantic', 'foreground', 'base'),
    marginBottom: cssVar('spacing', '8'),
  };

  const namedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Radio) {
      const childEl = child as React.ReactElement<RadioProps & { className?: string }>;
      const merged: Partial<RadioProps> & { className?: string; style?: React.CSSProperties } = {
        name,
      };
      if (itemClassName) {
        merged.className = [childEl.props.className, itemClassName].filter(Boolean).join(' ');
      }
      if (itemStyle) {
        merged.style = { ...itemStyle, ...childEl.props.style };
      }
      return React.cloneElement(childEl, merged);
    }
    return child;
  });

  return (
    <fieldset
      style={{ border: 'none', padding: 0, margin: 0 }}
      className={className}
      role="radiogroup"
      data-bbangto-radio-group-variant={variant}
    >
      {scopedStyle && <style>{scopedStyle}</style>}
      {legend && <legend style={legendStyles}>{legend}</legend>}
      <div className={innerClassName} style={groupStyles}>
        {namedChildren}
      </div>
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';
