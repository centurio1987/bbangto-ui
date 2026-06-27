import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export type LinkVariant =
  | 'default'
  | 'muted'
  | 'standalone'
  | 'inline'
  | 'outline'
  | 'solid'
  | 'ghost';
export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual variant. Defaults to 'default'. */
  variant?: LinkVariant;
  /** Typography size. Defaults to 'md'. */
  size?: LinkSize;
  /**
   * When true, opens in a new tab (target="_blank" + rel="noopener noreferrer")
   * and renders a trailing external-link indicator.
   */
  external?: boolean;
  /**
   * Underline behavior. Defaults to 'always' for the 'inline' variant, 'none'
   * for the padded surface variants ('outline' | 'solid' | 'ghost'), and
   * 'hover' for every other text variant.
   */
  underline?: LinkUnderline;
}

// sm -> meta, md -> body, lg -> h3
const sizeScale: Record<LinkSize, 'meta' | 'body' | 'h3'> = {
  sm: 'meta',
  md: 'body',
  lg: 'h3',
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      size = 'md',
      external = false,
      underline,
      children,
      style,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const scale = sizeScale[size];

    const isMuted = variant === 'muted';
    // The padded button-shaped surfaces. Their chrome (fill/border/padding/
    // radius) is undefined for every legacy text variant so those render
    // byte-identically.
    const isSurface =
      variant === 'outline' || variant === 'solid' || variant === 'ghost';

    // Rest + hover text color. Legacy text variants and the bordered/hover-fill
    // surfaces (outline, ghost) share the primary text color; `solid` flips to
    // the on-accent foreground token so text reads against the filled surface.
    let baseColor = isMuted
      ? cssVar('semantic', 'foreground', 'muted')
      : cssVar('semantic', 'primary', 'base');
    let hoverColor = isMuted
      ? cssVar('semantic', 'foreground', 'base')
      : cssVar('semantic', 'primary', 'hover');

    // Surface-only chrome — stays undefined for every legacy text variant.
    let surfaceBg: string | undefined;
    let surfaceHoverBg: string | undefined;
    let surfaceBorderColor: string | undefined;
    let surfacePadding: string | undefined;
    let surfaceRadius: string | undefined;

    if (isSurface) {
      surfacePadding = `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`;
      surfaceRadius = cssVar('radius', 'md');
    }
    if (variant === 'outline') {
      // Transparent fill + 1px solid border; subtle sunken fill on hover.
      surfaceBg = 'transparent';
      surfaceHoverBg = cssVar('semantic', 'background', 'sunken');
      surfaceBorderColor = cssVar('semantic', 'border', 'base');
    } else if (variant === 'solid') {
      // Solid accent fill + on-accent foreground; deepens to hover fill.
      surfaceBg = cssVar('semantic', 'primary', 'base');
      surfaceHoverBg = cssVar('semantic', 'primary', 'hover');
      baseColor = cssVar('semantic', 'primary', 'foreground');
      hoverColor = cssVar('semantic', 'primary', 'foreground');
    } else if (variant === 'ghost') {
      // Transparent at rest, fills with the sunken surface on hover/focus.
      surfaceBg = 'transparent';
      surfaceHoverBg = cssVar('semantic', 'background', 'sunken');
    }

    const resolvedUnderline: LinkUnderline =
      underline ??
      (variant === 'inline' ? 'always' : isSurface ? 'none' : 'hover');

    const baseTextDecoration =
      resolvedUnderline === 'always' ? 'underline' : 'none';
    const hoverTextDecoration =
      resolvedUnderline === 'none' ? 'none' : 'underline';

    const externalTarget = external ? '_blank' : target;
    const externalRel = external ? 'noopener noreferrer' : rel;

    // Keyboard focus ring for the padded surfaces (they read as buttons, so a
    // visible indicator matters). Legacy text variants keep their behavior.
    const focusRing = `0 0 0 2px ${cssVar('semantic', 'border', 'focus')}`;

    const baseStyles: React.CSSProperties = {
      display: variant === 'inline' ? 'inline' : 'inline-flex',
      alignItems: variant === 'inline' ? undefined : 'center',
      gap: variant === 'inline' ? undefined : cssVar('spacing', '2'),
      color: baseColor,
      backgroundColor: surfaceBg,
      border: surfaceBorderColor ? `1px solid ${surfaceBorderColor}` : undefined,
      padding: surfacePadding,
      borderRadius: surfaceRadius,
      textDecoration: baseTextDecoration,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', scale, 'fontSize'),
      fontWeight: cssVar('typography', 'scale', scale, 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', scale, 'lineHeight'),
      letterSpacing: cssVar('typography', 'scale', scale, 'letterSpacing'),
      cursor: 'pointer',
      transition: `color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      ...style,
    };

    return (
      <a
        ref={ref}
        target={externalTarget}
        rel={externalRel}
        data-bbangto-link-variant={variant}
        style={baseStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
          e.currentTarget.style.textDecoration = hoverTextDecoration;
          if (surfaceHoverBg) {
            e.currentTarget.style.backgroundColor = surfaceHoverBg;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = baseColor;
          e.currentTarget.style.textDecoration = baseTextDecoration;
          if (surfaceBg) {
            e.currentTarget.style.backgroundColor = surfaceBg;
          }
        }}
        onFocus={(e) => {
          if (isSurface) {
            e.currentTarget.style.boxShadow = focusRing;
          }
        }}
        onBlur={(e) => {
          if (isSurface) {
            e.currentTarget.style.boxShadow = '';
          }
        }}
        {...props}
      >
        {children}
        {external && (
          <span aria-hidden="true" style={{ marginLeft: cssVar('spacing', '1') }}>
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
