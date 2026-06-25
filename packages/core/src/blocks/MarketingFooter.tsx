import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Text } from '../components/Text';
import { Link } from '../components/Link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MarketingFooterLinkItem {
  label: string;
  href: string;
}

export interface MarketingFooterColumn {
  title: string;
  links: MarketingFooterLinkItem[];
}

/**
 * Layout axis for the MarketingFooter block.
 * - `columns` (default): multi-column link groups in a responsive grid.
 * - `minimal`: single compact row — brand + a few links + copyright.
 * - `centered`: brand centered on top, link groups centered below.
 * - `stacked`: mobile-first vertical stack of groups (single column always).
 */
export type MarketingFooterLayout = 'columns' | 'minimal' | 'centered' | 'stacked';

export interface MarketingFooterSocialItem {
  label: string;
  href: string;
  /** Rendered content of the social icon (SVG element, img, or text glyph). */
  icon: React.ReactNode;
}

export interface MarketingFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional logo slot rendered top-left of the footer. */
  logo?: React.ReactNode;
  /** Link columns, each with a heading and a list of links. */
  columns: MarketingFooterColumn[];
  /** Optional social icon links rendered in the bottom bar. */
  social?: MarketingFooterSocialItem[];
  /** Copyright text rendered in the bottom bar. */
  copyright?: string;
  /** Layout variant. Defaults to `columns` (existing behavior). */
  layout?: MarketingFooterLayout;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SCOPED_STYLE_ID = 'bbangto-marketing-footer';

const scopedStyle = `
  .bbangto-marketing-footer-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0;
  }

  @media (max-width: ${breakpoints.md - 0.02}px) {
    .bbangto-marketing-footer-columns {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: ${breakpoints.sm - 0.02}px) {
    .bbangto-marketing-footer-columns {
      grid-template-columns: 1fr;
    }
  }

  /* minimal: single compact row of inline links */
  .bbangto-marketing-footer-minimal-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* centered: groups centered horizontally */
  .bbangto-marketing-footer-centered {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }

  /* stacked: single column always */
  .bbangto-marketing-footer-stacked {
    display: flex;
    flex-direction: column;
  }

  @media (prefers-reduced-motion: reduce) {
    .bbangto-marketing-footer-social-link {
      transition: none !important;
    }
  }
`;

export const MarketingFooter = React.forwardRef<HTMLElement, MarketingFooterProps>(
  ({ logo, columns, social, copyright, layout = 'columns', style, ...props }, ref) => {
    const isMinimal = layout === 'minimal';
    const isCentered = layout === 'centered';
    const isStacked = layout === 'stacked';

    const footerStyle: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '40')} ${cssVar('spacing', '40')}`,
    };

    const topRowStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '40'),
      marginBottom: cssVar('spacing', '48'),
      ...(isCentered ? { alignItems: 'center', textAlign: 'center' } : null),
    };

    const logoAreaStyle: React.CSSProperties = {
      flexShrink: 0,
    };

    // Class applied to the link-group container, selecting the responsive
    // layout behavior from the scoped <style> block.
    const groupsClassName = isCentered
      ? 'bbangto-marketing-footer-centered'
      : isStacked
        ? 'bbangto-marketing-footer-stacked'
        : 'bbangto-marketing-footer-columns';

    const columnHeaderStyle: React.CSSProperties = {
      marginBottom: cssVar('spacing', '16'),
    };

    const columnLinkListStyle: React.CSSProperties = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '10'),
    };

    const dividerStyle: React.CSSProperties = {
      border: 'none',
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      margin: 0,
    };

    const bottomBarStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: cssVar('spacing', '16'),
      paddingTop: cssVar('spacing', '24'),
    };

    const socialListStyle: React.CSSProperties = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '16'),
    };

    const socialLinkStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: cssVar('spacing', '40'),
      height: cssVar('spacing', '40'),
      borderRadius: cssVar('radius', 'md'),
      color: cssVar('semantic', 'foreground', 'muted'),
      textDecoration: 'none',
      transition: `color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    };

    const columnItemStyle: React.CSSProperties = {
      padding: `0 ${cssVar('spacing', '24')} ${cssVar('spacing', '40')} 0`,
    };

    return (
      <footer
        ref={ref}
        data-bbangto-marketingfooter-layout={layout}
        style={footerStyle}
        {...props}
      >
        {/* Scoped responsive styles — injected once per render tree */}
        <style
          // Deduplicate if rendered multiple times in the same document
          id={SCOPED_STYLE_ID}
          dangerouslySetInnerHTML={{ __html: scopedStyle }}
        />

        <div style={innerStyle}>
          {isMinimal ? (
            /* Minimal: single compact row — brand + inline links + copyright */
            <div style={bottomBarStyle}>
              {logo && (
                <div style={logoAreaStyle} aria-label="Site logo">
                  {logo}
                </div>
              )}

              <nav aria-label="Footer navigation" style={{ flex: '1 1 auto' }}>
                <ul
                  className="bbangto-marketing-footer-minimal-links"
                  role="list"
                  style={{ gap: cssVar('spacing', '24') }}
                >
                  {columns.flatMap((column) =>
                    column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          variant="muted"
                          size="sm"
                          underline="none"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </nav>

              {copyright && (
                <Text variant="meta" color="muted">
                  {copyright}
                </Text>
              )}
            </div>
          ) : (
            <>
          {/* Top row: logo + columns */}
          <div style={topRowStyle}>
            {logo && (
              <div style={logoAreaStyle} aria-label="Site logo">
                {logo}
              </div>
            )}

            {/* Link columns — layout-dependent container */}
            <nav aria-label="Footer navigation">
              <div className={groupsClassName}>
                {columns.map((column) => (
                  <div key={column.title} style={columnItemStyle}>
                    <Text
                      variant="meta"
                      as="h3"
                      style={{
                        ...columnHeaderStyle,
                        fontWeight: cssVar('typography', 'scale', 'h3', 'fontWeight'),
                        color: cssVar('semantic', 'foreground', 'base'),
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {column.title}
                    </Text>
                    <ul style={columnLinkListStyle} role="list">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            variant="muted"
                            size="sm"
                            underline="none"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          {/* Bottom bar: copyright + social */}
          <hr style={dividerStyle} aria-hidden="true" />
          <div
            style={{
              ...bottomBarStyle,
              ...(isCentered ? { justifyContent: 'center' } : null),
            }}
          >
            {copyright && (
              <Text variant="meta" color="muted">
                {copyright}
              </Text>
            )}

            {social && social.length > 0 && (
              <ul style={socialListStyle} role="list" aria-label="Social links">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bbangto-marketing-footer-social-link"
                      style={socialLinkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = cssVar('semantic', 'foreground', 'base');
                        e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'elevated');
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = cssVar('semantic', 'foreground', 'muted');
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
            </>
          )}
        </div>
      </footer>
    );
  }
);

MarketingFooter.displayName = 'MarketingFooter';
