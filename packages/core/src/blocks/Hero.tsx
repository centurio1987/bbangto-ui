import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export interface HeroCta {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Layout axis for the Hero block.
 * - `centered`: text centred, single column.
 * - `split-media`: 2-column (text | media) at ≥ lg.
 * - `split-reverse`: 2-column (media | text) at ≥ lg.
 * - `background-media`: media fills the section, text overlaid with a scrim.
 * - `minimal`: type-only, condensed; no media column even if `media` is passed.
 */
export type HeroLayout =
  | 'centered'
  | 'split-media'
  | 'background-media'
  | 'minimal'
  | 'split-reverse';

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
  /**
   * Layout variant. When omitted, the effective layout is derived from `media`
   * (split-media when media is present, otherwise centered) — preserving the
   * historical auto-split behaviour.
   */
  layout?: HeroLayout;
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
      layout,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Effective layout: explicit prop wins; otherwise derive from media presence
    // to preserve the historical auto-split behaviour.
    const effectiveLayout: HeroLayout =
      layout ?? (media ? 'split-media' : 'centered');

    const isSplit =
      effectiveLayout === 'split-media' || effectiveLayout === 'split-reverse';
    const isReverse = effectiveLayout === 'split-reverse';
    const isBackground = effectiveLayout === 'background-media';
    const isMinimal = effectiveLayout === 'minimal';
    // Whether a media column is rendered alongside text (split layouts only).
    const hasSplit = isSplit && Boolean(media);
    // Whether the heading/CTAs are left-aligned (split text columns).
    const leftAligned = hasSplit;

    const sectionStyles: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...(isBackground ? { position: 'relative', overflow: 'hidden' } : null),
      ...style,
    };

    const innerStyles: React.CSSProperties = {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMinimal
        ? `${cssVar('spacing', '40')} ${cssVar('spacing', '24')}`
        : `${cssVar('spacing', '80')} ${cssVar('spacing', '24')}`,
      display: 'grid',
      gap: isMinimal ? cssVar('spacing', '24') : cssVar('spacing', '40'),
      alignItems: 'center',
      // Background layout sits above the absolutely positioned media scrim.
      ...(isBackground ? { position: 'relative', zIndex: 1 } : null),
      // Default: single column (mobile). Desktop split handled by scoped @media below.
      gridTemplateColumns: '1fr',
    };

    const contentStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: isMinimal ? cssVar('spacing', '16') : cssVar('spacing', '24'),
      textAlign: leftAligned ? 'left' : 'center',
      alignItems: leftAligned ? 'flex-start' : 'center',
      // Background layout overlays text on media — use inverse foreground so it
      // reads against the dark scrim.
      ...(isBackground
        ? { color: cssVar('semantic', 'foreground', 'inverse') }
        : null),
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
      // Background layout inherits the inverse colour from the content column.
      color: isBackground
        ? 'inherit'
        : cssVar('semantic', 'foreground', 'base'),
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
      justifyContent: leftAligned ? 'flex-start' : 'center',
    };

    const mediaStyles: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // In split-reverse the media column is painted first; place it before
      // the text column at the grid level via order.
      ...(isReverse ? { order: -1 } : null),
    };

    // Absolutely positioned media fill + scrim for the background layout.
    const backgroundMediaStyles: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
    };

    const backgroundScrimStyles: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      backgroundColor: cssVar('semantic', 'background', 'overlay'),
    };

    return (
      <section
        ref={ref}
        aria-label="Hero"
        data-bbangto-hero-layout={effectiveLayout}
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

        {/* Reduced-motion fallback for any animated background media. */}
        {isBackground && (
          <style>{`
            .${HERO_ID}-bg-media > * {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            @media (prefers-reduced-motion: reduce) {
              .${HERO_ID}-bg-media * {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        )}

        {/* Background media + scrim — fills the section behind the content. */}
        {isBackground && media && (
          <>
            <div className={`${HERO_ID}-bg-media`} style={backgroundMediaStyles}>
              {media}
            </div>
            <div style={backgroundScrimStyles} aria-hidden="true" />
          </>
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
