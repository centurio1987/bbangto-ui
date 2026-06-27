import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Card } from '../components/Card';
import { Text } from '../components/Text';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

export interface TestimonialItem {
  /** The testimonial quote text. */
  quote: string;
  /** Name of the person giving the testimonial. */
  author: string;
  /** Optional job title or role of the author. */
  role?: string;
  /** Optional avatar image URL. */
  avatar?: string;
}

/**
 * Layout axis for the Testimonials block.
 * - `grid` (default): intrinsic responsive grid of equal quote cards.
 * - `carousel`: horizontal scroll-snap track, keyboard-operable, with a
 *   prefers-reduced-motion fallback that disables smooth scrolling.
 * - `single`: one large featured quote (first item).
 * - `masonry`: column-count masonry wall of quote cards.
 * - `split-media`: a 2-track layout (single column on mobile, two tracks at the
 *   `lg` breakpoint) pairing a dominant portrait media panel with a stacked
 *   column of the active quote, author meta and prev/next controls. Exactly one
 *   testimonial is in view — a single-item showcase, not a multi-card grid.
 * - `stacked-deck`: a single fixed-size relative container holding the leading
 *   testimonials as `position:absolute` cards that overlap as a depth stack
 *   (front / middle / back) via `translateY` + `scale` offsets and a descending
 *   `z-index` — not a horizontal track.
 */
export type TestimonialsLayout =
  | 'grid'
  | 'carousel'
  | 'single'
  | 'masonry'
  | 'split-media'
  | 'stacked-deck';

export interface TestimonialsProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section heading. */
  title?: string;
  /** Array of testimonial items to display. */
  items: TestimonialItem[];
  /** Visual arrangement of the testimonial cards. Defaults to `grid`. */
  layout?: TestimonialsLayout;
}

const SECTION_ID = 'bbangto-testimonials';

export const Testimonials = React.forwardRef<HTMLElement, TestimonialsProps>(
  ({ title, items, layout = 'grid', style, ...props }, ref) => {
    // Drives the single testimonial in view for the `split-media` layout. Other
    // layouts never read this, so existing renders are untouched.
    const [activeIndex, setActiveIndex] = React.useState(0);

    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '24')}`,
      boxSizing: 'border-box',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      maxWidth: '1120px',
      margin: '0 auto',
    };

    const headingStyle: React.CSSProperties = {
      textAlign: 'center',
      marginBottom: cssVar('spacing', '40'),
    };

    // Intrinsic responsive grid: auto-fit columns with minmax, no media query needed
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: cssVar('spacing', '24'),
      alignItems: 'stretch',
    };

    // Horizontal scroll-snap track for the carousel layout.
    const carouselStyle: React.CSSProperties = {
      display: 'flex',
      gap: cssVar('spacing', '24'),
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      // Smooth scrolling for keyboard / button navigation; the scoped
      // prefers-reduced-motion rule below resets this to `auto`.
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: cssVar('spacing', '8'),
    };

    const carouselItemStyle: React.CSSProperties = {
      flex: '0 0 auto',
      width: 'min(360px, 80vw)',
      display: 'flex',
      scrollSnapAlign: 'start',
    };

    // Column-count masonry wall — items flow vertically across columns.
    const masonryStyle: React.CSSProperties = {
      columnCount: 3,
      columnGap: cssVar('spacing', '24'),
    };

    const masonryItemStyle: React.CSSProperties = {
      breakInside: 'avoid',
      marginBottom: cssVar('spacing', '24'),
      display: 'block',
    };

    // Single large featured quote.
    const singleStyle: React.CSSProperties = {
      maxWidth: '760px',
      margin: '0 auto',
    };

    const singleQuoteStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'h3', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'h3', 'lineHeight'),
    };

    // split-media: 2-track grid. Single column on mobile; the scoped <style>
    // below promotes it to two media-dominant tracks at the `lg` breakpoint.
    const splitStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: cssVar('spacing', '32'),
      alignItems: 'center',
    };

    // Dominant portrait media panel. Portrait aspect-ratio + rounded clip; the
    // backing surface is composited from tokens so it reads even with no image.
    const splitMediaStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      aspectRatio: '4 / 5',
      borderRadius: cssVar('radius', 'xl'),
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      backgroundImage: `linear-gradient(160deg, ${cssVar('semantic', 'primary', 'subtle')} 0%, ${cssVar('semantic', 'background', 'sunken')} 100%)`,
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    };

    const splitMediaImgStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    const splitMediaInitialStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'display', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'display', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const splitColumnStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '20'),
    };

    const splitControlsStyle: React.CSSProperties = {
      display: 'flex',
      gap: cssVar('spacing', '8'),
      marginTop: cssVar('spacing', '8'),
    };

    // stacked-deck: fixed-size relative container; cards are absolutely
    // positioned and overlap as a depth stack.
    const deckStyle: React.CSSProperties = {
      position: 'relative',
      width: 'min(520px, 100%)',
      minHeight: '340px',
      margin: '0 auto',
    };

    // Per-card depth: receding cards translate down + scale down with a
    // descending z-index so the front card sits on top.
    const deckCardStyle = (depth: number): React.CSSProperties => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transform: `translateY(${depth * 18}px) scale(${1 - depth * 0.05})`,
      transformOrigin: 'top center',
      zIndex: 30 - depth * 10,
    });

    const cardInnerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
      height: '100%',
    };

    const quoteStyle: React.CSSProperties = {
      flex: 1,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      color: cssVar('semantic', 'foreground', 'base'),
      margin: 0,
      // Opening quotation mark via before pseudo — use data attribute instead (no :before in inline style)
    };

    const authorRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '12'),
      marginTop: cssVar('spacing', '8'),
    };

    const authorTextStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '2'),
    };

    // Shared card content renderer so every layout reuses identical slots,
    // a11y and avatar handling.
    const renderCard = (
      item: TestimonialItem,
      opts?: { quoteStyle?: React.CSSProperties }
    ) => (
      <Card
        variant="outlined"
        padding="lg"
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <div style={cardInnerStyle}>
          <blockquote
            style={{ ...quoteStyle, ...opts?.quoteStyle }}
            cite={undefined}
          >
            <Text
              variant={opts?.quoteStyle ? 'h3' : 'body'}
              as="p"
              color="base"
            >
              &ldquo;{item.quote}&rdquo;
            </Text>
          </blockquote>
          <footer style={authorRowStyle}>
            {item.avatar ? (
              <Avatar
                src={item.avatar}
                alt={item.author}
                size="md"
                shape="circle"
              />
            ) : (
              <Avatar
                initials={item.author}
                size="md"
                shape="circle"
                aria-label={item.author}
              />
            )}
            <div style={authorTextStyle}>
              <Text variant="meta" as="strong" color="base">
                {item.author}
              </Text>
              {item.role && (
                <Text variant="meta" as="span" color="muted">
                  {item.role}
                </Text>
              )}
            </div>
          </footer>
        </div>
      </Card>
    );

    const renderItems = () => {
      if (layout === 'single') {
        const featured = items[0];
        if (!featured) return null;
        return (
          <div style={singleStyle}>
            {renderCard(featured, { quoteStyle: singleQuoteStyle })}
          </div>
        );
      }

      if (layout === 'carousel') {
        return (
          <div
            className={`${SECTION_ID}-carousel`}
            role="group"
            aria-label="Testimonials carousel"
            tabIndex={0}
            style={carouselStyle}
          >
            {items.map((item, index) => (
              <div key={index} style={carouselItemStyle}>
                {renderCard(item)}
              </div>
            ))}
          </div>
        );
      }

      if (layout === 'split-media') {
        if (items.length === 0) return null;
        const count = items.length;
        const idx = ((activeIndex % count) + count) % count;
        const active = items[idx];
        const go = (delta: number) =>
          setActiveIndex((i) => (((i + delta) % count) + count) % count);
        return (
          <div className={`${SECTION_ID}-split`} style={splitStyle}>
            {/* Dominant portrait media panel — decorative; the author is
                already announced inside the quote card's footer. */}
            <div
              className={`${SECTION_ID}-media`}
              style={splitMediaStyle}
              aria-hidden="true"
            >
              {active.avatar ? (
                <img src={active.avatar} alt="" style={splitMediaImgStyle} />
              ) : (
                <span style={splitMediaInitialStyle}>
                  {active.author.charAt(0)}
                </span>
              )}
            </div>
            {/* Stacked column: active quote card + prev/next controls. A single
                testimonial is in view at a time. */}
            <div style={splitColumnStyle}>
              {renderCard(active, { quoteStyle: singleQuoteStyle })}
              <div style={splitControlsStyle}>
                <Button
                  variant="outline"
                  color="neutral"
                  size="sm"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                >
                  &lsaquo;
                </Button>
                <Button
                  variant="outline"
                  color="neutral"
                  size="sm"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                >
                  &rsaquo;
                </Button>
              </div>
            </div>
          </div>
        );
      }

      if (layout === 'stacked-deck') {
        if (items.length === 0) return null;
        // The leading testimonials form the depth stack (front → back).
        const deck = items.slice(0, 3);
        return (
          <div className={`${SECTION_ID}-deck`} style={deckStyle}>
            {deck.map((item, depth) => (
              <div
                key={depth}
                className={`${SECTION_ID}-deck-card`}
                style={deckCardStyle(depth)}
              >
                {renderCard(item)}
              </div>
            ))}
          </div>
        );
      }

      if (layout === 'masonry') {
        return (
          <div className={`${SECTION_ID}-masonry`} style={masonryStyle}>
            {items.map((item, index) => (
              <div key={index} style={masonryItemStyle}>
                {renderCard(item)}
              </div>
            ))}
          </div>
        );
      }

      // Default: grid
      return (
        <ul
          role="list"
          style={{ ...gridStyle, listStyle: 'none', padding: 0, margin: 0 }}
        >
          {items.map((item, index) => (
            <li key={index} style={{ display: 'flex' }}>
              {renderCard(item)}
            </li>
          ))}
        </ul>
      );
    };

    // The masonry column-count and carousel scroll-snap layouts benefit from
    // breakpoint-aware tuning that cannot be expressed inline; the carousel
    // additionally needs a prefers-reduced-motion fallback. Only emit the rules
    // each layout actually needs.
    const needsScopedStyle = layout === 'carousel' || layout === 'masonry';

    return (
      <>
        {/*
          Scoped style block for responsive padding at narrower breakpoints.
          Uses breakpoints token values.
        */}
        <style>{`
          @media (max-width: ${breakpoints.sm - 0.02}px) {
            #${SECTION_ID} {
              padding-left: ${cssVar('spacing', '16')};
              padding-right: ${cssVar('spacing', '16')};
            }
          }
        `}</style>

        {needsScopedStyle && (
          <style>{`
            .${SECTION_ID}-carousel:focus-visible {
              outline: 2px solid ${cssVar('semantic', 'primary', 'base')};
              outline-offset: 2px;
            }
            @media (max-width: ${breakpoints.md - 0.02}px) {
              .${SECTION_ID}-masonry {
                column-count: 2 !important;
              }
            }
            @media (max-width: ${breakpoints.sm - 0.02}px) {
              .${SECTION_ID}-masonry {
                column-count: 1 !important;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .${SECTION_ID}-carousel {
                scroll-behavior: auto !important;
              }
              .${SECTION_ID}-carousel * {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        )}

        {layout === 'split-media' && (
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${SECTION_ID}-split {
                grid-template-columns: 5fr 4fr !important;
                align-items: center;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .${SECTION_ID}-split * {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        )}

        <section
          id={SECTION_ID}
          ref={ref}
          aria-label={title ?? 'Testimonials'}
          data-bbangto-testimonials-layout={layout}
          style={sectionStyle}
          {...props}
        >
          <div style={innerStyle}>
            {title && (
              <div style={headingStyle}>
                <Text variant="h2" as="h2">
                  {title}
                </Text>
              </div>
            )}
            {renderItems()}
          </div>
        </section>
      </>
    );
  }
);

Testimonials.displayName = 'Testimonials';
