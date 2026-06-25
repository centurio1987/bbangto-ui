import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import type { ButtonProps } from '../components/Button';
import { Text } from '../components/Text';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Layout axis for the CTA block.
 * - `centered` (default): centered panel — original behavior.
 * - `split`: title/description on the left, actions on the right; 2-col at ≥ lg.
 * - `banner`: full-width strip with strong primary background, compact padding.
 * - `card`: boxed card with border, radius, and elevation.
 */
export type CTALayout = 'centered' | 'split' | 'banner' | 'card';

export interface CTAAction {
  /** Visible label for the button. */
  label: string;
  /** Click handler forwarded to the underlying Button. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Any additional Button props (variant, color, size, href via data-*, etc.). */
  buttonProps?: Omit<ButtonProps, 'children' | 'onClick'>;
}

export interface CTAProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading — the primary call-to-action message. */
  title: string;
  /** Optional supporting copy beneath the title. */
  description?: string;
  /** Primary button configuration. */
  primaryCta: CTAAction;
  /** Secondary button configuration (optional). */
  secondaryCta?: CTAAction;
  /** Visual arrangement of the block. Defaults to `centered`. */
  layout?: CTALayout;
}

// ─── Component ────────────────────────────────────────────────────────────────

/** Scoped @media rule id — deterministic, no random/Date. */
const SCOPE = 'bbangto-cta-block';

export const CTA = React.forwardRef<HTMLElement, CTAProps>(
  (
    { title, description, primaryCta, secondaryCta, layout = 'centered', style, className, ...props },
    ref
  ) => {
    const isSplit = layout === 'split';
    const isBanner = layout === 'banner';
    const isCard = layout === 'card';

    const sectionStyles: React.CSSProperties = {
      width: '100%',
      boxSizing: 'border-box',
      // Banner uses a strong primary background; others keep the subtle panel.
      backgroundColor: isBanner
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'primary', 'subtle'),
      // Banner is a flush full-width strip — no corner radius.
      borderRadius: isBanner ? '0' : cssVar('radius', 'xl'),
      // Card gets a visible border + elevation; banner is borderless.
      ...(isCard
        ? {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: cssVar('semantic', 'border', 'base'),
            boxShadow: cssVar('shadow', 'lg'),
            backgroundColor: cssVar('semantic', 'background', 'base'),
          }
        : null),
      // Banner trims the vertical padding for a compact strip.
      padding: isBanner
        ? `${cssVar('spacing', '24')} ${cssVar('spacing', '40')}`
        : `${cssVar('spacing', '64')} ${cssVar('spacing', '40')}`,
      display: isSplit ? 'grid' : 'flex',
      ...(isSplit
        ? {
            // Default single column (mobile); desktop split via scoped @media.
            gridTemplateColumns: '1fr',
            alignItems: 'center',
          }
        : {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }),
      textAlign: isSplit ? 'left' : 'center',
      gap: cssVar('spacing', '24'),
      ...style,
    };

    const contentStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      alignItems: isSplit ? 'flex-start' : 'center',
      textAlign: isSplit ? 'left' : 'center',
    };

    const actionsStyles: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: isSplit ? 'flex-end' : 'center',
      alignItems: 'center',
      gap: cssVar('spacing', '12'),
      marginTop: isSplit ? '0' : cssVar('spacing', '8'),
    };

    return (
      <>
        {/* Scoped responsive style — @media cannot be expressed in inline style. */}
        <style>{`
          @media (min-width: ${breakpoints.md}px) {
            .${SCOPE} {
              padding-left: ${cssVar('spacing', '64')} !important;
              padding-right: ${cssVar('spacing', '64')} !important;
            }
          }
          @media (min-width: ${breakpoints.lg}px) {
            .${SCOPE}-split {
              grid-template-columns: 1fr auto !important;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .${SCOPE} * {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>

        <section
          ref={ref}
          className={[SCOPE, isSplit && `${SCOPE}-split`, className].filter(Boolean).join(' ')}
          data-bbangto-cta-layout={layout}
          aria-label={title}
          style={sectionStyles}
          {...props}
        >
          <div style={contentStyles}>
            <Text variant="h2" color={isBanner ? 'inverse' : 'primary'}>
              {title}
            </Text>

            {description && (
              <Text
                variant="body"
                color={isBanner ? 'inverse' : 'muted'}
                style={{ maxWidth: isSplit ? undefined : '560px' }}
              >
                {description}
              </Text>
            )}
          </div>

          <div style={actionsStyles}>
            <Button
              size="lg"
              variant="solid"
              color="primary"
              onClick={primaryCta.onClick}
              {...primaryCta.buttonProps}
            >
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                color="primary"
                onClick={secondaryCta.onClick}
                {...secondaryCta.buttonProps}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </section>
      </>
    );
  }
);

CTA.displayName = 'CTA';
