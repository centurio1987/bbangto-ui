import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';
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
 * - `wordmark`: an OVERSIZED full-bleed brand wordmark band rendered as its own
 *   full-width root track; link groups are stacked above it and the social /
 *   copyright bottom bar below it. The brand IS the band — distinct from the
 *   small inline logo slot the columns layout uses. Band content comes from the
 *   `wordmark` prop (falls back to `logo`).
 * - `gradient`: a chrome variant of the columns skeleton. The root surface is a
 *   multi-stop token-composited gradient (no flat fill) with an overlaid
 *   grid/dot pattern painted in an absolutely-positioned, overflow-clipped
 *   wrapper behind the content, plus a top divider border on the bottom bar.
 */
export type MarketingFooterLayout =
  | 'columns'
  | 'minimal'
  | 'centered'
  | 'stacked'
  | 'wordmark'
  | 'gradient';

export interface MarketingFooterSocialItem {
  label: string;
  href: string;
  /** Rendered content of the social icon (SVG element, img, or text glyph). */
  icon: React.ReactNode;
}

export interface MarketingFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional logo slot rendered top-left of the footer. */
  logo?: React.ReactNode;
  /**
   * Oversized brand wordmark rendered as a full-width band when
   * `layout="wordmark"`. Falls back to `logo` when omitted.
   */
  wordmark?: React.ReactNode;
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

  /* wordmark: oversized full-bleed brand band as its own root track */
  .bbangto-marketing-footer-wordmark {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-transform: uppercase;
  }

  @media (max-width: ${breakpoints.md - 0.02}px) {
    .bbangto-marketing-footer-wordmark {
      white-space: normal;
    }
  }

  /* gradient: dot/grid pattern layer behind the content */
  .bbangto-marketing-footer-gradient-pattern {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .bbangto-marketing-footer-social-link {
      transition: none !important;
    }
  }
`;

export const MarketingFooter = React.forwardRef<HTMLElement, MarketingFooterProps>(
  ({ logo, wordmark, columns, social, copyright, layout = 'columns', style, ...props }, ref) => {
    const isMinimal = layout === 'minimal';
    const isCentered = layout === 'centered';
    const isStacked = layout === 'stacked';
    const isWordmark = layout === 'wordmark';
    const isGradient = layout === 'gradient';

    const footerStyle: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      // Gradient variant: replace the flat sunken fill with a multi-stop
      // token-composited gradient over a base fallback. Position relative +
      // overflow hidden anchors and clips the absolute pattern layer.
      ...(isGradient
        ? {
            backgroundColor: cssVar('semantic', 'background', 'base'),
            backgroundImage: `linear-gradient(135deg, ${cssVar('semantic', 'background', 'sunken')} 0%, ${cssVar('semantic', 'primary', 'subtle')} 50%, ${cssVar('semantic', 'background', 'elevated')} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }
        : null),
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '40')} ${cssVar('spacing', '40')}`,
      // Lift the content above the gradient pattern layer.
      ...(isGradient ? { position: 'relative', zIndex: 1 } : null),
    };

    // Oversized brand band — its own full-width root track (wordmark layout).
    const wordmarkBandStyle: React.CSSProperties = {
      margin: `${cssVar('spacing', '48')} 0`,
      fontSize: 'clamp(6rem, 12vw, 16rem)',
      fontWeight: cssVar('typography', 'scale', 'display', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'display', 'lineHeight'),
      letterSpacing: cssVar('typography', 'scale', 'display', 'letterSpacing'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    // Dot/grid pattern field overlaid on the gradient surface.
    const gradientPatternStyle: React.CSSProperties = {
      backgroundImage: `radial-gradient(${cssVar('semantic', 'border', 'muted')} 1px, transparent 1px)`,
      backgroundSize: `${cssVar('spacing', '24')} ${cssVar('spacing', '24')}`,
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

        {/* Gradient variant: dot/grid pattern layer behind the content. */}
        {isGradient && (
          <div
            className="bbangto-marketing-footer-gradient-pattern"
            style={gradientPatternStyle}
            aria-hidden="true"
          />
        )}

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
          ) : isWordmark ? (
            /* Wordmark: link groups above an oversized full-width brand band,
               social + copyright bottom bar below. */
            <>
              <nav aria-label="Footer navigation">
                <div className="bbangto-marketing-footer-columns">
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

              {/* Oversized brand wordmark band — its own full-width track. */}
              <div
                className="bbangto-marketing-footer-wordmark"
                style={wordmarkBandStyle}
              >
                {wordmark ?? logo}
              </div>

              <hr style={dividerStyle} aria-hidden="true" />
              <div style={bottomBarStyle}>
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
              // Gradient variant: top divider border on the bottom bar.
              ...(isGradient
                ? { borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}` }
                : null),
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
