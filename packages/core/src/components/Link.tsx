import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type LinkVariant = 'default' | 'muted' | 'standalone' | 'inline';
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
   * Underline behavior. Defaults to 'always' for the 'inline' variant and
   * 'hover' for every other variant.
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
    const baseColor = isMuted
      ? cssVar('semantic', 'foreground', 'muted')
      : cssVar('semantic', 'primary', 'base');
    const hoverColor = isMuted
      ? cssVar('semantic', 'foreground', 'base')
      : cssVar('semantic', 'primary', 'hover');

    const resolvedUnderline: LinkUnderline =
      underline ?? (variant === 'inline' ? 'always' : 'hover');

    const baseTextDecoration =
      resolvedUnderline === 'always' ? 'underline' : 'none';
    const hoverTextDecoration =
      resolvedUnderline === 'none' ? 'none' : 'underline';

    const externalTarget = external ? '_blank' : target;
    const externalRel = external ? 'noopener noreferrer' : rel;

    const baseStyles: React.CSSProperties = {
      display: variant === 'inline' ? 'inline' : 'inline-flex',
      alignItems: variant === 'inline' ? undefined : 'center',
      gap: variant === 'inline' ? undefined : cssVar('spacing', '2'),
      color: baseColor,
      textDecoration: baseTextDecoration,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', scale, 'fontSize'),
      fontWeight: cssVar('typography', 'scale', scale, 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', scale, 'lineHeight'),
      letterSpacing: cssVar('typography', 'scale', scale, 'letterSpacing'),
      cursor: 'pointer',
      transition: `color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      ...style,
    };

    return (
      <a
        ref={ref}
        target={externalTarget}
        rel={externalRel}
        style={baseStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
          e.currentTarget.style.textDecoration = hoverTextDecoration;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = baseColor;
          e.currentTarget.style.textDecoration = baseTextDecoration;
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
