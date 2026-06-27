import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type BadgeColor = 'primary' | 'error' | 'success' | 'warning' | 'neutral';
// 'subtle' and 'soft' are siblings: subtle background + colored foreground.
// 'outline' is border-only chrome: no fill, just a 1px semantic border + text.
export type BadgeVariant = 'solid' | 'subtle' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Render a small status dot with no text instead of a pill badge. */
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      icon,
      color = 'error',
      variant = 'solid',
      size = 'md',
      dot = false,
      style,
      ...props
    },
    ref
  ) => {
    const isNeutral = color === 'neutral';
    // 'soft' reuses the same subtle background + colored foreground as 'subtle'.
    const isSubtleStyle = variant === 'subtle' || variant === 'soft';
    // 'outline' is border-only: transparent fill, semantic border + matching text.
    const isOutline = variant === 'outline';

    let bgColor: string;
    let fgColor: string;
    // Border stays undefined for the fill-based variants so their render is
    // untouched; only 'outline' opts into a visible 1px border.
    let borderColor: string | undefined;

    if (isOutline) {
      bgColor = 'transparent';
      fgColor = isNeutral
        ? cssVar('semantic', 'foreground', 'base')
        : cssVar('semantic', color, 'base');
      // semantic.border only exposes base/muted/strong/focus — neutral maps to
      // 'strong'; colored outlines borrow their own scale 'base' tone.
      borderColor = isNeutral
        ? cssVar('semantic', 'border', 'strong')
        : cssVar('semantic', color, 'base');
    } else if (isSubtleStyle) {
      bgColor = isNeutral ? cssVar('semantic', 'background', 'sunken') : cssVar('semantic', color, 'subtle');
      fgColor = isNeutral ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'active');
    } else {
      bgColor = isNeutral ? cssVar('semantic', 'foreground', 'muted') : cssVar('semantic', color, 'base');
      fgColor = isNeutral ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'foreground');
    }

    // Dot mode: a small colored circle, no text. Solid dots use the base color,
    // subtle/soft dots use the subtle background tone.
    if (dot) {
      const dotSize = size === 'sm' ? cssVar('spacing', '6') : cssVar('spacing', '8');
      const dotStyles: React.CSSProperties = {
        display: 'inline-block',
        flexShrink: 0,
        width: dotSize,
        height: dotSize,
        // An outline dot has no fill of its own, so it shows as a hollow ring
        // using the semantic border tone instead of a transparent (invisible) dot.
        backgroundColor: isOutline ? borderColor : bgColor,
        borderRadius: cssVar('radius', 'full'),
        ...style,
      };
      return <span ref={ref} data-bbangto-badge-variant={variant} style={dotStyles} {...props} />;
    }

    const height = size === 'sm' ? '16px' : '20px';
    const paddingX = size === 'sm' ? cssVar('spacing', '4') : cssVar('spacing', '6');

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '4'),
      minWidth: 'fit-content',
      padding: `0 ${paddingX}`,
      height,
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: fgColor,
      backgroundColor: bgColor,
      border: borderColor ? `1px solid ${borderColor}` : undefined,
      borderRadius: cssVar('radius', 'full'),
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <span ref={ref} data-bbangto-badge-variant={variant} style={baseStyles} {...props}>
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
        {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
