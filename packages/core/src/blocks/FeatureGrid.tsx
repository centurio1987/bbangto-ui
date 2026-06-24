import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Card } from '../components/Card';
import { Text } from '../components/Text';

export interface FeatureGridItem {
  /** Optional icon element displayed above the title. */
  icon?: React.ReactNode;
  /** Feature title (required). */
  title: string;
  /** Feature description (required). */
  description: string;
}

export interface FeatureGridProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section title rendered as a prominent heading. */
  title?: string;
  /** Optional subtitle rendered below the section title. */
  subtitle?: string;
  /** Array of feature items to display in the grid. */
  items: FeatureGridItem[];
}

/**
 * FeatureGrid — organism/section block.
 *
 * Renders a responsive grid of feature cards with an optional header.
 * Uses intrinsic responsiveness (auto-fit / minmax) so no media queries
 * are needed.  All colours, spacing, radius and typography come from
 * cssVar() tokens.
 */
export const FeatureGrid = React.forwardRef<HTMLElement, FeatureGridProps>(
  ({ title, subtitle, items, style, ...props }, ref) => {
    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '24')}`,
      boxSizing: 'border-box',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      textAlign: 'center',
      marginBottom: cssVar('spacing', '48'),
    };

    const subtitleStyle: React.CSSProperties = {
      marginTop: cssVar('spacing', '12'),
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: cssVar('spacing', '24'),
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    const itemInnerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      height: '100%',
    };

    const iconWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: cssVar('semantic', 'primary', 'base'),
      fontSize: '1.5rem',
      lineHeight: 1,
    };

    const descriptionStyle: React.CSSProperties = {
      marginTop: cssVar('spacing', '4'),
      flex: 1,
    };

    return (
      <section ref={ref} style={sectionStyle} {...props}>
        {(title || subtitle) && (
          <header style={headerStyle}>
            {title && (
              <Text variant="h2" as="h2">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text variant="body" color="muted" style={subtitleStyle}>
                {subtitle}
              </Text>
            )}
          </header>
        )}

        <ul style={gridStyle} aria-label={title ?? 'Features'}>
          {items.map((item, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              <Card
                variant="outlined"
                padding="lg"
                style={{ height: '100%', boxSizing: 'border-box' }}
              >
                <div style={itemInnerStyle}>
                  {item.icon && (
                    <span style={iconWrapperStyle} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <Text variant="h3" as="h3">
                    {item.title}
                  </Text>
                  <Text variant="body" color="muted" style={descriptionStyle}>
                    {item.description}
                  </Text>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

FeatureGrid.displayName = 'FeatureGrid';
