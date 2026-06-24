import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type BadgeColor = 'primary' | 'error' | 'success' | 'warning' | 'neutral';
// 'subtle' and 'soft' are siblings: subtle background + colored foreground.
export type BadgeVariant = 'solid' | 'subtle' | 'soft';
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

    const bgColor = !isSubtleStyle
      ? (isNeutral ? cssVar('semantic', 'foreground', 'muted') : cssVar('semantic', color, 'base'))
      : (isNeutral ? cssVar('semantic', 'background', 'sunken') : cssVar('semantic', color, 'subtle'));

    const fgColor = !isSubtleStyle
      ? (isNeutral ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'foreground'))
      : (isNeutral ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'active'));

    // Dot mode: a small colored circle, no text. Solid dots use the base color,
    // subtle/soft dots use the subtle background tone.
    if (dot) {
      const dotSize = size === 'sm' ? cssVar('spacing', '6') : cssVar('spacing', '8');
      const dotStyles: React.CSSProperties = {
        display: 'inline-block',
        flexShrink: 0,
        width: dotSize,
        height: dotSize,
        backgroundColor: bgColor,
        borderRadius: cssVar('radius', 'full'),
        ...style,
      };
      return <span ref={ref} style={dotStyles} {...props} />;
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
      borderRadius: cssVar('radius', 'full'),
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <span ref={ref} style={baseStyles} {...props}>
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
        {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
