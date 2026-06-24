import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export interface HeroCta {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional small label rendered above the title (e.g. badge / category). */
  eyebrow?: React.ReactNode;
  /** Main heading — required. */
  title: React.ReactNode;
  /** Supporting subtitle rendered below the title. */
  subtitle?: React.ReactNode;
  /** Primary call-to-action button. */
  primaryCta?: HeroCta;
  /** Secondary call-to-action button. */
  secondaryCta?: HeroCta;
  /** Optional media node (image, illustration, video, etc.) rendered in the split column. */
  media?: React.ReactNode;
}

/** Unique class prefix to scope media query styles without a CSS Module. */
const HERO_ID = 'bbangto-hero';

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      eyebrow,
      title,
      subtitle,
      primaryCta,
      secondaryCta,
      media,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const hasSplit = Boolean(media);

    const sectionStyles: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const innerStyles: React.CSSProperties = {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: `${cssVar('spacing', '80')} ${cssVar('spacing', '24')}`,
      display: 'grid',
      gap: cssVar('spacing', '40'),
      alignItems: 'center',
      // Default: single column (mobile). Desktop split handled by scoped @media below.
      gridTemplateColumns: '1fr',
    };

    const contentStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '24'),
      textAlign: hasSplit ? 'left' : 'center',
      alignItems: hasSplit ? 'flex-start' : 'center',
    };

    const eyebrowStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${cssVar('spacing', '4')} ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'primary', 'subtle'),
      color: cssVar('semantic', 'primary', 'base'),
      borderRadius: cssVar('radius', 'full'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
    };

    const titleStyles: React.CSSProperties = {
      margin: 0,
      fontSize: `clamp(${cssVar('typography', 'scale', 'h1', 'fontSize')}, 5vw, ${cssVar('typography', 'scale', 'display', 'fontSize')})`,
      fontWeight: cssVar('typography', 'scale', 'display', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'display', 'lineHeight'),
      letterSpacing: cssVar('typography', 'scale', 'display', 'letterSpacing'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const subtitleStyles: React.CSSProperties = {
      margin: 0,
      maxWidth: '56ch',
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const ctaGroupStyles: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: cssVar('spacing', '12'),
      alignItems: 'center',
      justifyContent: hasSplit ? 'flex-start' : 'center',
    };

    const mediaStyles: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <section
        ref={ref}
        aria-label="Hero"
        style={sectionStyles}
        {...props}
      >
        {/*
          Scoped responsive style: on desktop (≥ lg breakpoint) with media slot,
          switch to two-column split layout. Uses <style> tag rather than inline
          style because @media cannot be expressed in React's style prop.
        */}
        {hasSplit && (
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${HERO_ID}-inner {
                grid-template-columns: 1fr 1fr !important;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .${HERO_ID}-media * {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        )}

        <div
          className={`${HERO_ID}-inner`}
          style={innerStyles}
        >
          {/* Content column */}
          <div style={contentStyles}>
            {eyebrow && (
              <span style={eyebrowStyles} aria-label="Category">
                {eyebrow}
              </span>
            )}

            <h1 style={titleStyles}>{title}</h1>

            {subtitle && (
              <Text
                variant="body"
                color="muted"
                as="p"
                style={subtitleStyles}
              >
                {subtitle}
              </Text>
            )}

            {(primaryCta || secondaryCta) && (
              <div style={ctaGroupStyles}>
                {primaryCta && (
                  <Button
                    variant="solid"
                    color="primary"
                    size="lg"
                    onClick={primaryCta.onClick}
                  >
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    variant="outline"
                    color="primary"
                    size="lg"
                    onClick={secondaryCta.onClick}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}

            {children}
          </div>

          {/* Media column — only rendered when media prop is provided */}
          {hasSplit && (
            <div
              className={`${HERO_ID}-media`}
              style={mediaStyles}
            >
              {media}
            </div>
          )}
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';
