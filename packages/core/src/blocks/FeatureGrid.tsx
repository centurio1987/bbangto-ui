import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
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

/**
 * Layout axis for {@link FeatureGrid}.
 *
 * - `grid` (default): intrinsic auto-fit / minmax responsive grid.
 * - `alternating`: zig-zag rows where icon/text columns swap side per row
 *   (2-column at ≥ lg via scoped `<style>`).
 * - `list`: single-column vertical stack of features.
 * - `bento`: mixed-span grid where some items span 2 columns / rows.
 */
export type FeatureGridLayout = 'grid' | 'alternating' | 'list' | 'bento';

export interface FeatureGridProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section title rendered as a prominent heading. */
  title?: string;
  /** Optional subtitle rendered below the section title. */
  subtitle?: string;
  /** Array of feature items to display in the grid. */
  items: FeatureGridItem[];
  /**
   * Visual arrangement of the feature items. Defaults to `'grid'` which renders
   * the original intrinsic auto-fit grid (existing behavior is unchanged).
   */
  layout?: FeatureGridLayout;
}

/** Unique class prefix to scope media-query styles without a CSS Module. */
const FG_ID = 'bbangto-featuregrid';

/**
 * FeatureGrid — organism/section block.
 *
 * Renders a responsive grid of feature cards with an optional header.
 * Uses intrinsic responsiveness (auto-fit / minmax) so no media queries
 * are needed.  All colours, spacing, radius and typography come from
 * cssVar() tokens.
 */
export const FeatureGrid = React.forwardRef<HTMLElement, FeatureGridProps>(
  ({ title, subtitle, items, layout = 'grid', style, ...props }, ref) => {
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

    // --- Layout-specific list (container) styles -------------------------
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: cssVar('spacing', '24'),
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    const listStyleObj: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '24'),
      listStyle: 'none',
      margin: '0 auto',
      padding: 0,
      maxWidth: '720px',
    };

    // alternating: single column on mobile, scoped <style> upgrades each
    // <li> to a 2-column zig-zag at ≥ lg.
    const alternatingStyleObj: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '40'),
      listStyle: 'none',
      margin: '0 auto',
      padding: 0,
      maxWidth: '960px',
    };

    // bento: dense grid; spanning of select items handled via scoped <style>.
    const bentoStyleObj: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridAutoRows: 'minmax(160px, auto)',
      gridAutoFlow: 'dense',
      gap: cssVar('spacing', '24'),
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    const containerStyleByLayout: Record<FeatureGridLayout, React.CSSProperties> =
      {
        grid: gridStyle,
        list: listStyleObj,
        alternating: alternatingStyleObj,
        bento: bentoStyleObj,
      };

    const itemInnerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      height: '100%',
    };

    // alternating rows lay icon and text side-by-side inside the card.
    const alternatingInnerStyle: React.CSSProperties = {
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

    const isAlternating = layout === 'alternating';
    const isBento = layout === 'bento';
    const needsScopedStyle = isAlternating || isBento;

    const scopedCss = isAlternating
      ? `
        @media (min-width: ${breakpoints.lg}px) {
          .${FG_ID}-alt-inner {
            flex-direction: row !important;
            align-items: center;
            gap: ${cssVar('spacing', '32')};
          }
          /* Zig-zag: even rows mirror the column order. */
          .${FG_ID}-alt-item:nth-child(even) .${FG_ID}-alt-inner {
            flex-direction: row-reverse !important;
          }
          .${FG_ID}-alt-icon {
            flex: 0 0 33%;
          }
          .${FG_ID}-alt-body {
            flex: 1 1 auto;
          }
        }
      `
      : isBento
        ? `
        @media (min-width: ${breakpoints.lg}px) {
          .${FG_ID}-bento {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          /* First item spans 2 columns and 2 rows (feature hero cell). */
          .${FG_ID}-bento-item:nth-child(1) {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
          }
          /* Fourth item gets a wide 2-column band. */
          .${FG_ID}-bento-item:nth-child(4) {
            grid-column: span 2 !important;
          }
        }
      `
        : '';

    return (
      <section
        ref={ref}
        style={sectionStyle}
        data-bbangto-featuregrid-layout={layout}
        {...props}
      >
        {/*
          Scoped responsive style: multi-column / spanning layouts cannot be
          expressed inline because they rely on @media and :nth-child. Rendered
          only for layouts that need it (alternating, bento).
        */}
        {needsScopedStyle && <style>{scopedCss}</style>}

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

        <ul
          className={
            isAlternating
              ? `${FG_ID}-alt`
              : isBento
                ? `${FG_ID}-bento`
                : undefined
          }
          style={containerStyleByLayout[layout]}
          aria-label={title ?? 'Features'}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={
                isAlternating
                  ? `${FG_ID}-alt-item`
                  : isBento
                    ? `${FG_ID}-bento-item`
                    : undefined
              }
              style={{ listStyle: 'none' }}
            >
              <Card
                variant="outlined"
                padding="lg"
                style={{ height: '100%', boxSizing: 'border-box' }}
              >
                {isAlternating ? (
                  <div
                    className={`${FG_ID}-alt-inner`}
                    style={alternatingInnerStyle}
                  >
                    {item.icon && (
                      <span
                        className={`${FG_ID}-alt-icon`}
                        style={iconWrapperStyle}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    <div className={`${FG_ID}-alt-body`} style={itemInnerStyle}>
                      <Text variant="h3" as="h3">
                        {item.title}
                      </Text>
                      <Text
                        variant="body"
                        color="muted"
                        style={descriptionStyle}
                      >
                        {item.description}
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div style={itemInnerStyle}>
                    {item.icon && (
                      <span style={iconWrapperStyle} aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <Text variant="h3" as="h3">
                      {item.title}
                    </Text>
                    <Text
                      variant="body"
                      color="muted"
                      style={descriptionStyle}
                    >
                      {item.description}
                    </Text>
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

FeatureGrid.displayName = 'FeatureGrid';
