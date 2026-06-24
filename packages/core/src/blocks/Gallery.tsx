import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of image items to display in the gallery grid. */
  images: GalleryImage[];
  /**
   * Number of columns. When omitted the grid uses intrinsic responsiveness
   * (`auto-fit / minmax`) so no media query is needed.
   * When set, a fixed column count is used (still fluid per column width).
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

const SCOPE_ATTR = 'data-bbangto-gallery';

export const Gallery = React.forwardRef<HTMLElement, GalleryProps>(
  ({ images, columns, style, className, ...props }, ref) => {
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
              <li key={`${image.src}-${index}`}>
                <figure style={figureStyle}>
                  <div style={imgWrapStyle}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={imgStyle}
                      loading="lazy"
                    />
                  </div>
                  {image.caption && (
                    <figcaption>
                      <Text
                        variant="meta"
                        color="muted"
                        style={{ textAlign: 'center' }}
                      >
                        {image.caption}
                      </Text>
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }
);

Gallery.displayName = 'Gallery';
