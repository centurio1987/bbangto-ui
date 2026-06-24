import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Card } from '../components/Card';
import { Text } from '../components/Text';
import { Avatar } from '../components/Avatar';

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

export interface TestimonialsProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section heading. */
  title?: string;
  /** Array of testimonial items to display. */
  items: TestimonialItem[];
}

const SECTION_ID = 'bbangto-testimonials';

export const Testimonials = React.forwardRef<HTMLElement, TestimonialsProps>(
  ({ title, items, style, ...props }, ref) => {
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

    return (
      <>
        {/*
          Scoped style block for responsive padding at narrower breakpoints.
          Uses breakpoints token values; prefers-reduced-motion is not needed here
          as there are no transitions on this component.
        */}
        <style>{`
          @media (max-width: ${breakpoints.sm - 0.02}px) {
            #${SECTION_ID} {
              padding-left: ${cssVar('spacing', '16')};
              padding-right: ${cssVar('spacing', '16')};
            }
          }
        `}</style>
        <section
          id={SECTION_ID}
          ref={ref}
          aria-label={title ?? 'Testimonials'}
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
            <ul
              role="list"
              style={{ ...gridStyle, listStyle: 'none', padding: 0, margin: 0 }}
            >
              {items.map((item, index) => (
                <li key={index} style={{ display: 'flex' }}>
                  <Card
                    variant="outlined"
                    padding="lg"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <div style={cardInnerStyle}>
                      <blockquote style={quoteStyle} cite={undefined}>
                        <Text variant="body" as="p" color="base">
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    );
  }
);

Testimonials.displayName = 'Testimonials';
