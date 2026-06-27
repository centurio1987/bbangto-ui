import React from 'react';
import { cssVar } from '@centurio1987/tokens';

/**
 * Surface/layout treatment of the bar's chrome.
 *
 * `default` is the original edge-to-edge bar and stays first so existing
 * call sites and stories render unchanged. The remaining members add new
 * chrome on top of the same flex skeleton:
 *  - `bordered`      opaque fill + a hairline bottom rule, zero elevation
 *  - `glass`         frosted: translucent fill + backdrop blur, content shows through
 *  - `floating-pill` detached centered capsule instead of a full-bleed bar
 */
export type TopNavigationVariant = 'default' | 'bordered' | 'glass' | 'floating-pill';

export interface TopNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  trailing?: React.ReactNode;
  fixed?: boolean;
  variant?: TopNavigationVariant;
}

export const TopNavigation = React.forwardRef<HTMLDivElement, TopNavigationProps>(
  ({ leading, title, trailing, fixed = false, variant = 'default', style, className, ...props }, ref) => {
    // Extra chrome the original `default` bar never sets. Each stays at the
    // legacy value for `default` so its render is byte-for-byte unchanged; new
    // variants override only what they need. Colors are always cssVar-derived.
    let backgroundColor = cssVar('semantic', 'background', 'base');
    let borderBottom: React.CSSProperties['borderBottom'] = `1px solid ${cssVar('semantic', 'border', 'muted')}`;
    let border: React.CSSProperties['border'];
    let boxShadow: React.CSSProperties['boxShadow'];
    let backdropFilter: string | undefined;
    let borderRadius: React.CSSProperties['borderRadius'];
    let boxSizing: React.CSSProperties['boxSizing'];
    let width: React.CSSProperties['width'] = '100%';
    let maxWidth: React.CSSProperties['maxWidth'];
    let marginInline: React.CSSProperties['marginInline'];
    let marginTop: React.CSSProperties['marginTop'];

    if (variant === 'bordered') {
      // Opaque surface fill, edge-to-edge, with a crisper hairline rule and
      // explicitly no elevation — flat and grounded.
      backgroundColor = cssVar('semantic', 'background', 'base');
      borderBottom = `1px solid ${cssVar('semantic', 'border', 'base')}`;
      boxShadow = 'none';
      boxSizing = 'border-box';
    } else if (variant === 'glass') {
      // Frosted chrome: semi-transparent fill composed from the surface token so
      // page content blurs through. backdrop-filter has no token, so the blur
      // radius is the only inline literal; the color stays cssVar-derived.
      backgroundColor = `color-mix(in srgb, ${cssVar('semantic', 'background', 'base')} 60%, transparent)`;
      borderBottom = `1px solid ${cssVar('semantic', 'border', 'muted')}`;
      backdropFilter = 'blur(12px)';
      boxSizing = 'border-box';
    } else if (variant === 'floating-pill') {
      // Detached island: reflow from full-bleed bar to a constrained centered
      // capsule with elevation. max-width/offset have no token (layout literals);
      // radius + shadow + colors all resolve from tokens.
      backgroundColor = cssVar('semantic', 'background', 'elevated');
      borderBottom = undefined;
      border = `1px solid ${cssVar('semantic', 'border', 'muted')}`;
      borderRadius = cssVar('radius', 'full');
      boxShadow = cssVar('shadow', 'lg');
      width = '100%';
      maxWidth = '640px';
      marginInline = 'auto';
      marginTop = cssVar('spacing', '16');
      boxSizing = 'border-box';
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing,
      width,
      maxWidth,
      marginInline,
      marginTop,
      height: '56px',
      padding: `0 ${cssVar('spacing', '16')}`,
      backgroundColor,
      // `border` (shorthand) must precede `borderBottom` (longhand) so the
      // bottom-rule variants win; otherwise the shorthand resets bottom style.
      border,
      borderBottom,
      borderRadius,
      boxShadow,
      backdropFilter,
      WebkitBackdropFilter: backdropFilter,
      position: fixed ? 'fixed' : 'relative',
      top: fixed ? 0 : 'auto',
      left: fixed ? 0 : 'auto',
      zIndex: fixed ? cssVar('zIndex', 'sticky') : 'auto',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    } as React.CSSProperties;

    const sideStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      minWidth: '48px', // Ensuring title stays centered
    };

    const titleStyle: React.CSSProperties = {
      flex: 1,
      textAlign: 'center',
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        role="banner"
        data-bbangto-navbar-variant={variant}
        {...props}
      >
        <div style={sideStyle}>{leading}</div>
        <div style={titleStyle}>{title}</div>
        <div style={{ ...sideStyle, justifyContent: 'flex-end' }}>{trailing}</div>
      </div>
    );
  }
);

TopNavigation.displayName = 'TopNavigation';
