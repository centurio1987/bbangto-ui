import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import type { ButtonProps } from '../components/Button';
import { Text } from '../components/Text';

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

// ─── Component ────────────────────────────────────────────────────────────────

/** Scoped @media rule id — deterministic, no random/Date. */
const SCOPE = 'bbangto-cta-block';

export const CTA = React.forwardRef<HTMLElement, CTAProps>(
  ({ title, description, primaryCta, secondaryCta, style, className, ...props }, ref) => {
    const sectionStyles: React.CSSProperties = {
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: cssVar('semantic', 'primary', 'subtle'),
      borderRadius: cssVar('radius', 'xl'),
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '40')}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: cssVar('spacing', '24'),
      ...style,
    };

    const actionsStyles: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: cssVar('spacing', '12'),
      marginTop: cssVar('spacing', '8'),
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
          @media (prefers-reduced-motion: reduce) {
            .${SCOPE} * {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>

        <section
          ref={ref}
          className={[SCOPE, className].filter(Boolean).join(' ')}
          aria-label={title}
          style={sectionStyles}
          {...props}
        >
          <Text variant="h2" color="primary">
            {title}
          </Text>

          {description && (
            <Text variant="body" color="muted" style={{ maxWidth: '560px' }}>
              {description}
            </Text>
          )}

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
