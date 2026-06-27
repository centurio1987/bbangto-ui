import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Text } from '../components/Text';

/**
 * Visual arrangement of the pricing plans.
 * - `cards` (default): tier-card row (current behavior).
 * - `table`: feature comparison table (rows = features, columns = plans).
 * - `featured`: highlighted plan enlarged/centered, others smaller flanking.
 * - `compact`: condensed card row with reduced padding / font sizes.
 * - `single-panel`: a single centered, self-contained panel (max-width
 *   constrained, `margin: 0 auto`) — NOT a repeat-tier grid track. One plan
 *   (the highlighted one, falling back to the first) is rendered as a vertical
 *   stack of slots: header → price → grouped feature list → CTA pinned at base.
 * - `frosted-gradient`: card-row variant whose chrome is a backdrop-blurred,
 *   translucent (semi-transparent) fill floated over a token-composited
 *   `linear-gradient` root surface, with NO solid border — elevation comes from
 *   the blur/translucency rather than a border or flat fill.
 */
export type PricingSectionLayout =
  | 'cards'
  | 'table'
  | 'featured'
  | 'compact'
  | 'single-panel'
  | 'frosted-gradient';

/** Unique class prefix to scope media query styles without a CSS Module. */
const PRICING_ID = 'bbangto-pricingsection';

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
  /** Visual arrangement of the plans. Defaults to `'cards'`. */
  layout?: PricingSectionLayout;
}

export const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ title, plans, layout = 'cards', style, ...props }, ref) => {
    const isFrosted = layout === 'frosted-gradient';

    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '24')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      boxSizing: 'border-box',
      // Frosted-gradient: composite a token-based gradient onto the root surface
      // so the translucent cards float over it. No border — the chrome is the
      // gradient + the cards' backdrop blur. Synthesized inline because no
      // gradient token exists, but every colour stop is a cssVar reference.
      ...(isFrosted
        ? {
            backgroundImage: `linear-gradient(135deg, ${cssVar('semantic', 'primary', 'subtle')} 0%, ${cssVar('semantic', 'background', 'base')} 50%, ${cssVar('semantic', 'primary', 'base')} 100%)`,
            border: 'none',
          }
        : null),
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

    return (
      <section
        ref={ref}
        data-bbangto-pricingsection-layout={layout}
        style={sectionStyle}
        {...props}
      >
        <div style={innerStyle}>
          {title && (
            <div style={headerStyle}>
              <Text variant="h2">{title}</Text>
            </div>
          )}

          {layout === 'table' ? (
            <PricingTable plans={plans} />
          ) : layout === 'featured' ? (
            <FeaturedPlans plans={plans} />
          ) : layout === 'single-panel' ? (
            <SinglePanel plans={plans} />
          ) : (
            // cards (default), compact and frosted-gradient share the card-row body
            <CardRow
              plans={plans}
              compact={layout === 'compact'}
              frosted={isFrosted}
            />
          )}
        </div>
      </section>
    );
  }
);

PricingSection.displayName = 'PricingSection';

// ---------------------------------------------------------------------------
// CardRow — default `cards` row + `compact` variant. Not exported.
// ---------------------------------------------------------------------------

interface CardRowProps {
  plans: PricingPlan[];
  compact?: boolean;
  /** Frosted-gradient chrome: translucent + backdrop blur + no border. */
  frosted?: boolean;
}

function CardRow({ plans, compact = false, frosted = false }: CardRowProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: compact
      ? 'repeat(auto-fit, minmax(220px, 1fr))'
      : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: compact ? cssVar('spacing', '12') : cssVar('spacing', '24'),
    alignItems: 'stretch',
  };

  return (
    <div style={gridStyle} role="list">
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} compact={compact} frosted={frosted} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SinglePanel — one self-contained, centered, max-width-constrained panel.
// Renders a single plan (highlighted, falling back to the first) as a vertical
// stack of slots (header → price → feature list → CTA). NOT a repeat-tier grid.
// Not exported.
// ---------------------------------------------------------------------------

interface SinglePanelProps {
  plans: PricingPlan[];
}

function SinglePanel({ plans }: SinglePanelProps) {
  const highlightedIdx = plans.findIndex((p) => p.highlighted);
  const plan = plans[highlightedIdx >= 0 ? highlightedIdx : 0];

  // A single centered panel — constrained width + auto horizontal margins.
  // Deliberately a block (not a grid) so there is no repeat-tier track.
  const panelStyle: React.CSSProperties = {
    maxWidth: '420px',
    margin: '0 auto',
    width: '100%',
  };

  return (
    <div
      className={`${PRICING_ID}-single-panel`}
      style={panelStyle}
      role="list"
    >
      <PlanCard plan={plan} forceHighlight={Boolean(plan?.highlighted)} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FeaturedPlans — one highlighted plan enlarged/centered, others flanking.
// Not exported.
// ---------------------------------------------------------------------------

interface FeaturedPlansProps {
  plans: PricingPlan[];
}

function FeaturedPlans({ plans }: FeaturedPlansProps) {
  // The featured plan is the highlighted one, falling back to the middle plan.
  const highlightedIdx = plans.findIndex((p) => p.highlighted);
  const featuredIdx =
    highlightedIdx >= 0 ? highlightedIdx : Math.floor(plans.length / 2);

  const rowStyle: React.CSSProperties = {
    // Mobile: stack in a single column. Desktop split handled by scoped @media.
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar('spacing', '24'),
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      {/*
        Scoped responsive style: on desktop (≥ lg breakpoint) lay the plans out
        in a row and visually enlarge the featured plan so the others flank it.
        @media cannot be expressed inline so we render a scoped <style>.
      */}
      <style>{`
        @media (min-width: ${breakpoints.lg}px) {
          .${PRICING_ID}-featured-row {
            flex-direction: row !important;
            align-items: center !important;
          }
          .${PRICING_ID}-featured-flank {
            flex: 0 1 280px;
            transform: scale(0.92);
          }
          .${PRICING_ID}-featured-main {
            flex: 0 1 360px;
            transform: scale(1.06);
            z-index: 1;
          }
        }
      `}</style>

      <div className={`${PRICING_ID}-featured-row`} style={rowStyle} role="list">
        {plans.map((plan, idx) => {
          const isFeatured = idx === featuredIdx;
          return (
            <div
              key={plan.name}
              className={
                isFeatured
                  ? `${PRICING_ID}-featured-main`
                  : `${PRICING_ID}-featured-flank`
              }
              style={{ width: '100%', maxWidth: isFeatured ? '360px' : '280px' }}
              data-featured={isFeatured || undefined}
            >
              <PlanCard plan={plan} forceHighlight={isFeatured} />
            </div>
          );
        })}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// PricingTable — feature comparison table. Rows = features, columns = plans.
// Not exported.
// ---------------------------------------------------------------------------

interface PricingTableProps {
  plans: PricingPlan[];
}

function PricingTable({ plans }: PricingTableProps) {
  // Union of all feature strings across plans, preserving first-seen order.
  const allFeatures: string[] = [];
  for (const plan of plans) {
    for (const feature of plan.features) {
      if (!allFeatures.includes(feature)) allFeatures.push(feature);
    }
  }

  const tableWrapStyle: React.CSSProperties = {
    width: '100%',
    overflowX: 'auto',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const cellBase: React.CSSProperties = {
    padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
    borderBottom: `1px solid ${cssVar('semantic', 'border', 'base')}`,
    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
    color: cssVar('semantic', 'foreground', 'base'),
  };

  const headerCellStyle: React.CSSProperties = {
    ...cellBase,
    fontWeight: cssVar('typography', 'scale', 'h3', 'fontWeight'),
    verticalAlign: 'bottom',
  };

  const rowHeaderStyle: React.CSSProperties = {
    ...cellBase,
    fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
    color: cssVar('semantic', 'foreground', 'muted'),
  };

  const planHeaderInnerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar('spacing', '4'),
  };

  const checkmarkStyle: React.CSSProperties = {
    color: cssVar('semantic', 'success', 'base'),
    fontSize: '16px',
    lineHeight: '1',
  };

  const dashStyle: React.CSSProperties = {
    color: cssVar('semantic', 'foreground', 'muted'),
  };

  return (
    <div style={tableWrapStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th scope="col" style={headerCellStyle}>
              <Text variant="meta" as="span" color="muted">
                Features
              </Text>
            </th>
            {plans.map((plan) => (
              <th key={plan.name} scope="col" style={headerCellStyle}>
                <div style={planHeaderInnerStyle}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: cssVar('spacing', '8'),
                    }}
                  >
                    <Text variant="h3" as="span">
                      {plan.name}
                    </Text>
                    {plan.highlighted && (
                      <Badge color="primary" variant="soft">
                        Most Popular
                      </Badge>
                    )}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      gap: cssVar('spacing', '4'),
                    }}
                  >
                    <Text variant="h2" as="span">
                      {plan.price}
                    </Text>
                    {plan.period && (
                      <Text variant="meta" as="span" color="muted">
                        {plan.period}
                      </Text>
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature) => (
            <tr key={feature}>
              <th scope="row" style={rowHeaderStyle}>
                {feature}
              </th>
              {plans.map((plan) => {
                const has = plan.features.includes(feature);
                return (
                  <td key={plan.name} style={cellBase}>
                    {has ? (
                      <span style={checkmarkStyle} aria-label="Included">
                        &#10003;
                      </span>
                    ) : (
                      <span style={dashStyle} aria-label="Not included">
                        &mdash;
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          {/* CTA row */}
          <tr>
            <th scope="row" style={rowHeaderStyle} aria-hidden="true" />
            {plans.map((plan) => (
              <td key={plan.name} style={cellBase}>
                <Button
                  variant={plan.highlighted ? 'solid' : 'outline'}
                  color="primary"
                  fullWidth
                  aria-label={`${plan.cta} — ${plan.name} plan`}
                >
                  {plan.cta}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Internal PlanCard — not exported
// ---------------------------------------------------------------------------

interface PlanCardProps {
  plan: PricingPlan;
  /** Condensed treatment: reduced padding + smaller price/feature font. */
  compact?: boolean;
  /** Force the highlighted treatment regardless of `plan.highlighted`. */
  forceHighlight?: boolean;
  /** Frosted-gradient chrome: translucent fill + backdrop blur + no border. */
  frosted?: boolean;
}

function PlanCard({
  plan,
  compact = false,
  forceHighlight = false,
  frosted = false,
}: PlanCardProps) {
  const { name, price, period, features, cta } = plan;
  const highlighted = forceHighlight || plan.highlighted || false;

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
    // Frosted chrome wins over any border (highlighted included): the elevation
    // comes from the backdrop blur + translucency, not a border or flat fill.
    // Translucency is synthesized from a token colour via color-mix (no opaque
    // background token would read as glass), and the blur radius is a spacing
    // token. No solid border.
    ...(frosted
      ? {
          backgroundColor: `color-mix(in srgb, ${cssVar('semantic', 'background', 'elevated')} 60%, transparent)`,
          backgroundImage: 'none',
          border: 'none',
          backdropFilter: `blur(${cssVar('spacing', '12')})`,
          WebkitBackdropFilter: `blur(${cssVar('spacing', '12')})`,
          boxShadow: cssVar('shadow', 'lg'),
        }
      : {}),
  };

  const planHeaderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar('spacing', '8'),
    marginBottom: compact ? cssVar('spacing', '12') : cssVar('spacing', '24'),
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
    gap: compact ? cssVar('spacing', '8') : cssVar('spacing', '12'),
    flex: 1,
    margin: `0 0 ${compact ? cssVar('spacing', '12') : cssVar('spacing', '24')} 0`,
    padding: 0,
    listStyle: 'none',
  };

  const featureItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: cssVar('spacing', '8'),
    color: cssVar('semantic', 'foreground', 'base'),
    fontSize: compact
      ? cssVar('typography', 'scale', 'meta', 'fontSize')
      : cssVar('typography', 'scale', 'body', 'fontSize'),
    lineHeight: compact
      ? cssVar('typography', 'scale', 'meta', 'lineHeight')
      : cssVar('typography', 'scale', 'body', 'lineHeight'),
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
        elevation={frosted ? 'lg' : highlighted ? 'md' : 'sm'}
        padding={compact ? 'sm' : 'lg'}
        bordered={!highlighted && !frosted}
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
            <Text variant={compact ? 'h2' : 'h1'} as="span">
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
