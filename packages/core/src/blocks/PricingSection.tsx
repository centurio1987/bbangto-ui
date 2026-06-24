import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Text } from '../components/Text';

export interface PricingPlan {
  /** Unique plan name (e.g. "Starter", "Pro"). */
  name: string;
  /** Displayed price string (e.g. "$29", "Free"). */
  price: string;
  /** Billing period label (e.g. "/ month", "/ year"). */
  period?: string;
  /** List of feature description strings. */
  features: string[];
  /** CTA button label (e.g. "Get Started"). */
  cta: string;
  /** When true the card gets a visual highlight treatment. */
  highlighted?: boolean;
}

export interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section heading. */
  title?: string;
  /** Array of pricing plan objects to render. */
  plans: PricingPlan[];
}

export const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ title, plans, style, ...props }, ref) => {
    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '24')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      boxSizing: 'border-box',
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
    };

    const headerStyle: React.CSSProperties = {
      textAlign: 'center',
      marginBottom: cssVar('spacing', '48'),
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: cssVar('spacing', '24'),
      alignItems: 'stretch',
    };

    return (
      <section ref={ref} style={sectionStyle} {...props}>
        <div style={innerStyle}>
          {title && (
            <div style={headerStyle}>
              <Text variant="h2">{title}</Text>
            </div>
          )}

          <div style={gridStyle} role="list">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

PricingSection.displayName = 'PricingSection';

// ---------------------------------------------------------------------------
// Internal PlanCard — not exported
// ---------------------------------------------------------------------------

interface PlanCardProps {
  plan: PricingPlan;
}

function PlanCard({ plan }: PlanCardProps) {
  const { name, price, period, features, cta, highlighted = false } = plan;

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    ...(highlighted
      ? {
          borderColor: cssVar('semantic', 'primary', 'base'),
          borderWidth: '2px',
          borderStyle: 'solid',
          // Override the default border set by Card so we only apply our own.
          border: `2px solid ${cssVar('semantic', 'primary', 'base')}`,
        }
      : {}),
  };

  const planHeaderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar('spacing', '8'),
    marginBottom: cssVar('spacing', '24'),
  };

  const planNameRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: cssVar('spacing', '8'),
  };

  const priceRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: cssVar('spacing', '4'),
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: cssVar('semantic', 'border', 'base'),
    margin: `${cssVar('spacing', '16')} 0`,
  };

  const featureListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar('spacing', '12'),
    flex: 1,
    margin: `0 0 ${cssVar('spacing', '24')} 0`,
    padding: 0,
    listStyle: 'none',
  };

  const featureItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: cssVar('spacing', '8'),
    color: cssVar('semantic', 'foreground', 'base'),
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
  };

  const checkmarkStyle: React.CSSProperties = {
    flexShrink: 0,
    marginTop: '2px',
    color: cssVar('semantic', 'success', 'base'),
    fontSize: '14px',
    lineHeight: '1',
  };

  return (
    <div role="listitem" style={{ display: 'flex', flexDirection: 'column' }}>
      <Card
        elevation={highlighted ? 'md' : 'sm'}
        padding="lg"
        bordered={!highlighted}
        style={cardStyle}
      >
        {/* Plan name + "Most Popular" badge */}
        <div style={planHeaderStyle}>
          <div style={planNameRowStyle}>
            <Text variant="h3">{name}</Text>
            {highlighted && (
              <Badge color="primary" variant="soft">
                Most Popular
              </Badge>
            )}
          </div>

          {/* Price */}
          <div style={priceRowStyle}>
            <Text variant="h1" as="span">
              {price}
            </Text>
            {period && (
              <Text variant="body" as="span" color="muted">
                {period}
              </Text>
            )}
          </div>
        </div>

        <div style={dividerStyle} role="separator" aria-hidden="true" />

        {/* Feature list */}
        <ul style={featureListStyle} aria-label={`${name} plan features`}>
          {features.map((feature) => (
            <li key={feature} style={featureItemStyle}>
              <span style={checkmarkStyle} aria-hidden="true">
                &#10003;
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA button — pinned to the bottom */}
        <Button
          variant={highlighted ? 'solid' : 'outline'}
          color="primary"
          fullWidth
          aria-label={`${cta} — ${name} plan`}
        >
          {cta}
        </Button>
      </Card>
    </div>
  );
}
