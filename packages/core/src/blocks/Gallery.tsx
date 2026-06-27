import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';
import { Text } from '../components/Text';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Layout variants for the Gallery block. */
export type GalleryLayout =
  | 'grid'
  | 'masonry'
  | 'carousel'
  | 'featured'
  | 'split-panel';

export interface GalleryProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of image items to display in the gallery grid. */
  images: GalleryImage[];
  /**
   * Number of columns. When omitted the grid uses intrinsic responsiveness
   * (`auto-fit / minmax`) so no media query is needed.
   * When set, a fixed column count is used (still fluid per column width).
   *
   * Applies to the `grid` and `masonry` layouts.
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Arrangement of the gallery images.
   * - `grid` (default): even responsive grid.
   * - `masonry`: column-count masonry with images flowing into balanced columns.
   * - `carousel`: horizontal scroll-snap strip, keyboard-operable.
   * - `featured`: one large lead image with a thumbnail strip of the rest.
   * - `split-panel`: a two-track split — a text/CTA panel slot beside a
   *   media cluster (2x2 grid of bare full-cover cells). Single column on
   *   mobile, two columns at ≥ lg. Use the `panel` prop for the copy track.
   */
  layout?: GalleryLayout;
  /**
   * Content for the text/CTA panel track of the `split-panel` layout
   * (e.g. heading, copy, call-to-action). Ignored by other layouts.
   */
  panel?: React.ReactNode;
}

const SCOPE_ATTR = 'data-bbangto-gallery';
const LAYOUT_ATTR = 'data-bbangto-gallery-layout';

/** Unique class prefix to scope media query / animation styles without a CSS Module. */
const GALLERY_ID = 'bbangto-gallery';

export const Gallery = React.forwardRef<HTMLElement, GalleryProps>(
  (
    { images, columns, layout = 'grid', panel, style, className, ...props },
    ref
  ) => {
    const gridTemplateColumns = columns
      ? `repeat(${columns}, 1fr)`
      : 'repeat(auto-fit, minmax(240px, 1fr))';

    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '40')} ${cssVar('spacing', '24')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      ...style,
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      gap: cssVar('spacing', '16'),
    };

    const figureStyle: React.CSSProperties = {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '8'),
    };

    const imgWrapStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      /* Force a square-ish aspect ratio; modern browsers support this directly. */
      aspectRatio: '4 / 3',
      overflow: 'hidden',
      borderRadius: cssVar('radius', 'lg'),
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
    };

    const imgStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: `transform ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
    };

    /** Reusable figure renderer shared by grid / masonry / carousel. */
    const renderFigure = (
      image: GalleryImage,
      index: number,
      wrapStyle?: React.CSSProperties
    ) => (
      <figure key={index} style={figureStyle}>
        <div style={{ ...imgWrapStyle, ...wrapStyle }}>
          <img src={image.src} alt={image.alt} style={imgStyle} loading="lazy" />
        </div>
        {image.caption && (
          <figcaption>
            <Text variant="meta" color="muted" style={{ textAlign: 'center' }}>
              {image.caption}
            </Text>
          </figcaption>
        )}
      </figure>
    );

    // --- Masonry layout -----------------------------------------------------
    if (layout === 'masonry') {
      const columnCount = columns ?? 3;
      const masonryStyle: React.CSSProperties = {
        columnCount,
        columnGap: cssVar('spacing', '16'),
        margin: 0,
        padding: 0,
        listStyle: 'none',
      };
      const itemStyle: React.CSSProperties = {
        breakInside: 'avoid',
        marginBottom: cssVar('spacing', '16'),
      };

      return (
        <>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              [${SCOPE_ATTR}] figure:hover img {
                transform: scale(1.04);
              }
            }
          `}</style>
          <section
            ref={ref}
            {...{ [SCOPE_ATTR]: '' }}
            {...{ [LAYOUT_ATTR]: layout }}
            style={sectionStyle}
            className={className}
            {...props}
          >
            <ul role="list" style={masonryStyle}>
              {images.map((image, index) => (
                <li key={`${image.src}-${index}`} style={itemStyle}>
                  {renderFigure(image, index, { aspectRatio: 'auto' })}
                </li>
              ))}
            </ul>
          </section>
        </>
      );
    }

    // --- Carousel layout ----------------------------------------------------
    if (layout === 'carousel') {
      const scrollerStyle: React.CSSProperties = {
        display: 'flex',
        gap: cssVar('spacing', '16'),
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        listStyle: 'none',
        margin: 0,
        padding: `${cssVar('spacing', '8')} 0`,
        WebkitOverflowScrolling: 'touch',
      };
      const itemStyle: React.CSSProperties = {
        flex: '0 0 auto',
        width: 'min(320px, 80%)',
        scrollSnapAlign: 'start',
      };

      return (
        <>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              [${SCOPE_ATTR}] figure:hover img {
                transform: scale(1.04);
              }
            }
            .${GALLERY_ID}-scroller:focus-visible {
              outline: 2px solid ${cssVar('semantic', 'primary', 'base')};
              outline-offset: 2px;
            }
            @media (prefers-reduced-motion: reduce) {
              .${GALLERY_ID}-scroller {
                scroll-behavior: auto !important;
              }
              .${GALLERY_ID}-scroller img {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
          <section
            ref={ref}
            {...{ [SCOPE_ATTR]: '' }}
            {...{ [LAYOUT_ATTR]: layout }}
            style={sectionStyle}
            className={className}
            {...props}
          >
            <ul
              role="list"
              className={`${GALLERY_ID}-scroller`}
              style={scrollerStyle}
              tabIndex={0}
              aria-label="Image carousel — use arrow keys to scroll"
            >
              {images.map((image, index) => (
                <li key={`${image.src}-${index}`} style={itemStyle}>
                  {renderFigure(image, index)}
                </li>
              ))}
            </ul>
          </section>
        </>
      );
    }

    // --- Featured layout ----------------------------------------------------
    if (layout === 'featured') {
      const [lead, ...rest] = images;
      const featuredWrapStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: cssVar('spacing', '16'),
      };
      const leadWrapStyle: React.CSSProperties = {
        ...imgWrapStyle,
        aspectRatio: '16 / 9',
      };
      const stripStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.max(rest.length, 1)}, 1fr)`,
        gap: cssVar('spacing', '12'),
        listStyle: 'none',
        margin: 0,
        padding: 0,
      };
      const thumbWrapStyle: React.CSSProperties = {
        ...imgWrapStyle,
        aspectRatio: '1 / 1',
      };

      return (
        <>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              [${SCOPE_ATTR}] figure:hover img {
                transform: scale(1.04);
              }
            }
          `}</style>
          <section
            ref={ref}
            {...{ [SCOPE_ATTR]: '' }}
            {...{ [LAYOUT_ATTR]: layout }}
            style={sectionStyle}
            className={className}
            {...props}
          >
            <div style={featuredWrapStyle}>
              {lead && (
                <div className={`${GALLERY_ID}-featured-lead`}>
                  {renderFigure(lead, 0, leadWrapStyle)}
                </div>
              )}
              {rest.length > 0 && (
                <ul role="list" style={stripStyle}>
                  {rest.map((image, index) => (
                    <li key={`${image.src}-${index + 1}`}>
                      {renderFigure(image, index + 1, thumbWrapStyle)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      );
    }

    // --- Split-panel layout -------------------------------------------------
    if (layout === 'split-panel') {
      // Inner split: single column on mobile; two tracks at >= lg via scoped
      // media query. Column gap + centred alignment hold the two tracks level.
      const splitInnerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: cssVar('spacing', '40'),
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
      };

      const panelStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: cssVar('spacing', '16'),
        color: cssVar('semantic', 'foreground', 'base'),
      };

      // Media cluster: a 2-track grid (2x2 for four cells) — always two
      // columns regardless of breakpoint, independent of the outer split.
      const clusterStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: cssVar('spacing', '12'),
        listStyle: 'none',
        margin: 0,
        padding: 0,
      };

      // Bare full-cover cell — no card border, no elevation shadow.
      const cellWrapStyle: React.CSSProperties = {
        ...imgWrapStyle,
        aspectRatio: '1 / 1',
        borderRadius: cssVar('radius', 'md'),
        border: 'none',
        boxShadow: 'none',
      };

      return (
        <>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              [${SCOPE_ATTR}] figure:hover img {
                transform: scale(1.04);
              }
            }
            @media (min-width: ${breakpoints.lg}px) {
              .${GALLERY_ID}-split-inner {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          `}</style>
          <section
            ref={ref}
            {...{ [SCOPE_ATTR]: '' }}
            {...{ [LAYOUT_ATTR]: layout }}
            style={sectionStyle}
            className={className}
            {...props}
          >
            <div className={`${GALLERY_ID}-split-inner`} style={splitInnerStyle}>
              {panel && (
                <div
                  className={`${GALLERY_ID}-split-panel`}
                  style={panelStyle}
                >
                  {panel}
                </div>
              )}
              <ul role="list" style={clusterStyle}>
                {images.map((image, index) => (
                  <li key={`${image.src}-${index}`}>
                    {renderFigure(image, index, cellWrapStyle)}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      );
    }

    // --- Grid layout (default) ----------------------------------------------
    return (
      <>
        {/* Scoped motion style — respects prefers-reduced-motion */}
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            [${SCOPE_ATTR}] figure:hover img {
              transform: scale(1.04);
            }
          }
        `}</style>
        <section
          ref={ref}
          {...{ [SCOPE_ATTR]: '' }}
          {...{ [LAYOUT_ATTR]: layout }}
          style={sectionStyle}
          className={className}
          {...props}
        >
          <ul
            role="list"
            style={{
              ...gridStyle,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {images.map((image, index) => (
              <li key={`${image.src}-${index}`}>{renderFigure(image, index)}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
);

Gallery.displayName = 'Gallery';
