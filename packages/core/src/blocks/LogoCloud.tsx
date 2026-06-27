import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

/** Layout axis controlling how the logos are arranged. */
export type LogoCloudLayout =
  | 'grid'
  | 'marquee'
  | 'inline'
  | 'bordered'
  | 'scroll-columns';

/**
 * The newly added multi-column vertical auto-scroll layout member, exported as
 * a standalone alias so consumers can reference it directly (barrel re-exports
 * via `export *`).
 */
export type LogoCloudScrollColumnsLayout = Extract<
  LogoCloudLayout,
  'scroll-columns'
>;

export interface LogoItem {
  /** Custom React node to render as the logo (takes priority over src/alt). */
  node?: React.ReactNode;
  /** Image URL for the logo. Used when node is not provided. */
  src?: string;
  /** Accessible alt text for the logo image. Required when src is set. */
  alt?: string;
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading displayed above the logo grid. */
  title?: string;
  /** Array of logo items to display. */
  logos: LogoItem[];
  /**
   * Arrangement of the logos:
   * - `grid` (default): even responsive grid.
   * - `marquee`: infinite horizontal scroll (static row under reduced motion).
   * - `inline`: single centered row, no wrap.
   * - `bordered`: grid with cell dividers between cells.
   * - `scroll-columns`: several VERTICAL flex tracks (multi-column) where each
   *   column auto-scrolls on `translateY` in alternating up/down directions with
   *   a per-column staggered duration. The viewport edges fade via a vertical
   *   `mask-image` gradient and carry no border. Frozen to a static set of
   *   columns under reduced motion. Distinct from `marquee` (single horizontal
   *   track) by track direction (vertical) and column count.
   */
  layout?: LogoCloudLayout;
}

/** Unique class prefix to scope media/keyframe styles without a CSS Module. */
const LOGOCLOUD_ID = 'bbangto-logocloud';

export const LogoCloud = React.forwardRef<HTMLElement, LogoCloudProps>(
  ({ title, logos, layout = 'grid', style, ...props }, ref) => {
    const isMarquee = layout === 'marquee';
    const isInline = layout === 'inline';
    const isBordered = layout === 'bordered';
    const isScrollColumns = layout === 'scroll-columns';

    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '48')} ${cssVar('spacing', '24')}`,
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: cssVar('spacing', '32'),
      ...style,
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '960px',
      alignItems: 'center',
      justifyItems: 'center',
    };

    const borderedGridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 0,
      width: '100%',
      maxWidth: '960px',
      alignItems: 'center',
      justifyItems: 'stretch',
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderLeft: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    };

    const inlineStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '960px',
      alignItems: 'center',
      justifyContent: 'center',
      overflowX: 'auto',
    };

    // Marquee uses two flex tracks (original + clone) inside an overflow-hidden
    // viewport; the scoped <style> animates the translate and the
    // prefers-reduced-motion query freezes it to a static row.
    const marqueeViewportStyle: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      maxWidth: '960px',
      overflow: 'hidden',
      maskImage:
        'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      WebkitMaskImage:
        'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
    };

    const marqueeTrackStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: cssVar('spacing', '40'),
      paddingRight: cssVar('spacing', '40'),
      flexShrink: 0,
    };

    // scroll-columns: a fixed-height, overflow-hidden viewport laid out as N
    // horizontal flex cells (columns). Each column owns a vertical track that
    // translateY-loops; the viewport top/bottom fade via a vertical mask. The
    // opaque mask stops are composited from a token colour (mask uses alpha, so
    // any opaque token reads as fully visible). No border on this surface.
    const scrollOpaque = cssVar('semantic', 'foreground', 'base');
    const scrollMask = `linear-gradient(to bottom, transparent, ${scrollOpaque} 14%, ${scrollOpaque} 86%, transparent)`;
    const scrollViewportStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '960px',
      height: '320px',
      overflow: 'hidden',
      border: 'none',
      maskImage: scrollMask,
      WebkitMaskImage: scrollMask,
    };

    const scrollColumnStyle: React.CSSProperties = {
      flex: '1 1 0',
      minWidth: 0,
      overflow: 'hidden',
    };

    const scrollColumnTrackStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: cssVar('spacing', '24'),
      // Continuous loops must be linear so the wrap point has no easing stutter
      // (matches the marquee track timing).
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      willChange: 'transform',
    };

    // Round-robin the logos into NUM_SCROLL_COLUMNS vertical tracks.
    const NUM_SCROLL_COLUMNS = 3;
    const scrollColumns: LogoItem[][] = isScrollColumns
      ? Array.from({ length: NUM_SCROLL_COLUMNS }, (_, col) =>
          logos.filter((_, i) => i % NUM_SCROLL_COLUMNS === col)
        )
      : [];

    const listStyle: React.CSSProperties = isBordered
      ? borderedGridStyle
      : isInline
        ? inlineStyle
        : gridStyle;

    const logoItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      opacity: 0.55,
      filter: 'grayscale(100%)',
      transition: `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, filter ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      ...(isBordered
        ? {
            borderRight: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
            borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
            padding: cssVar('spacing', '24'),
          }
        : null),
      ...(isInline ? { flexShrink: 0 } : null),
    };

    const imgStyle: React.CSSProperties = {
      maxWidth: '120px',
      maxHeight: '40px',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
    };

    const renderLogo = (
      logo: LogoItem,
      index: number,
      keyPrefix = '',
      hidden = false
    ) => (
      <div
        key={`${keyPrefix}${index}`}
        role={hidden ? 'presentation' : 'listitem'}
        aria-hidden={hidden || undefined}
        style={logoItemStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.opacity = '1';
          (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0%)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.opacity = '0.55';
          (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(100%)';
        }}
      >
        {logo.node ?? (
          logo.src ? (
            <img
              src={logo.src}
              alt={logo.alt ?? ''}
              style={imgStyle}
            />
          ) : null
        )}
      </div>
    );

    return (
      <section
        ref={ref}
        aria-label={title ?? 'Trusted by clients'}
        data-bbangto-logocloud-layout={layout}
        style={sectionStyle}
        {...props}
      >
        {/*
          Scoped style for layouts that cannot be expressed inline:
          the marquee keyframe animation plus its prefers-reduced-motion
          static-row fallback. @media/@keyframes cannot live in the React
          style prop, so they are rendered here, namespaced to the component.
        */}
        {isMarquee && (
          <style>{`
            @keyframes ${LOGOCLOUD_ID}-scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .${LOGOCLOUD_ID}-marquee-track {
              animation: ${LOGOCLOUD_ID}-scroll 24s linear infinite;
            }
            .${LOGOCLOUD_ID}-marquee-viewport:hover .${LOGOCLOUD_ID}-marquee-track {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .${LOGOCLOUD_ID}-marquee-track {
                animation: none !important;
              }
              .${LOGOCLOUD_ID}-marquee-clone {
                display: none !important;
              }
            }
          `}</style>
        )}

        {/*
          Scoped style for the scroll-columns layout: vertical translateY loops
          (up + down keyframes) plus a hover pause and a prefers-reduced-motion
          fallback that freezes every column to a static set. @keyframes/@media
          cannot live in the React style prop, so they are namespaced here.
        */}
        {isScrollColumns && (
          <style>{`
            @keyframes ${LOGOCLOUD_ID}-scroll-up {
              from { transform: translateY(0); }
              to { transform: translateY(-50%); }
            }
            @keyframes ${LOGOCLOUD_ID}-scroll-down {
              from { transform: translateY(-50%); }
              to { transform: translateY(0); }
            }
            .${LOGOCLOUD_ID}-scroll-viewport:hover .${LOGOCLOUD_ID}-column-track {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .${LOGOCLOUD_ID}-column-track {
                animation: none !important;
              }
              .${LOGOCLOUD_ID}-column-clone {
                display: none !important;
              }
            }
          `}</style>
        )}

        {title && (
          <Text
            variant="meta"
            color="muted"
            as="p"
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            {title}
          </Text>
        )}

        {isMarquee ? (
          <div className={`${LOGOCLOUD_ID}-marquee-viewport`} style={marqueeViewportStyle}>
            <div
              role="list"
              aria-label="Client logos"
              className={`${LOGOCLOUD_ID}-marquee-track`}
              style={marqueeTrackStyle}
            >
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
            {/* Duplicate track produces the seamless loop; hidden under reduced motion. */}
            <div
              aria-hidden="true"
              className={`${LOGOCLOUD_ID}-marquee-track ${LOGOCLOUD_ID}-marquee-clone`}
              style={marqueeTrackStyle}
            >
              {logos.map((logo, index) => renderLogo(logo, index, 'clone-'))}
            </div>
          </div>
        ) : isScrollColumns ? (
          <div
            role="list"
            aria-label="Client logos"
            className={`${LOGOCLOUD_ID}-scroll-viewport`}
            style={scrollViewportStyle}
          >
            {scrollColumns.map((column, ci) => (
              // The column wrapper is presentational so its listitems still read
              // as direct members of the surrounding role="list".
              <div
                key={`scroll-col-${ci}`}
                role="presentation"
                className={`${LOGOCLOUD_ID}-column`}
                style={scrollColumnStyle}
              >
                <div
                  className={`${LOGOCLOUD_ID}-column-track`}
                  style={{
                    ...scrollColumnTrackStyle,
                    // Alternate scroll direction per column; stagger the duration
                    // so adjacent columns drift out of phase.
                    animationName:
                      ci % 2 === 0
                        ? `${LOGOCLOUD_ID}-scroll-up`
                        : `${LOGOCLOUD_ID}-scroll-down`,
                    animationDuration: `${18 + ci * 4}s`,
                  }}
                >
                  {column.map((logo, index) =>
                    renderLogo(logo, index, `col${ci}-`)
                  )}
                  {/* Cloned set produces the seamless loop; hidden under reduced motion. */}
                  <div
                    aria-hidden="true"
                    className={`${LOGOCLOUD_ID}-column-clone`}
                    style={{ display: 'contents' }}
                  >
                    {column.map((logo, index) =>
                      renderLogo(logo, index, `clone-col${ci}-`, true)
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            role="list"
            aria-label="Client logos"
            style={listStyle}
          >
            {logos.map((logo, index) => renderLogo(logo, index))}
          </div>
        )}
      </section>
    );
  }
);

LogoCloud.displayName = 'LogoCloud';
