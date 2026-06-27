import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';
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
 * - `panel-showcase`: 2-track split — a vertical stack of selectable header
 *   rows (active row marked by underline + fill + left border) beside a SINGLE
 *   shared media/content panel that swaps to the active item. Unlike grid /
 *   alternating (which carry per-item media), only one media slot exists and it
 *   is synced to the current selection. 2-column at ≥ lg via scoped `<style>`.
 * - `stacked-deck`: overlapping cards placed on a shared grid cell (single
 *   `grid-area`) with incremental translate-x/translate-y offsets and z-index
 *   layering to fan the deck; each card carries a rounded border and a
 *   semi-transparent surface. Not a flow grid — the cards occupy the same cell
 *   and overlap.
 */
export type FeatureGridLayout =
  | 'grid'
  | 'alternating'
  | 'list'
  | 'bento'
  | 'panel-showcase'
  | 'stacked-deck';

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
    // panel-showcase keeps a single selection synced to the shared panel.
    const [activeIndex, setActiveIndex] = React.useState(0);
    const safeActive = Math.min(activeIndex, Math.max(0, items.length - 1));
    const activeItem = items[safeActive];

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

    // panel-showcase: 2-track wrapper (selectable rows | shared panel). Single
    // column on mobile; scoped <style> upgrades to two tracks at ≥ lg.
    const panelShowcaseContainerStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: cssVar('spacing', '24'),
      alignItems: 'start',
    };

    // stacked-deck: a single grid cell — every card is placed in the same area
    // and fanned via per-item transform offsets (see deckItemStyle).
    const stackedDeckContainerStyle: React.CSSProperties = {
      display: 'grid',
      justifyContent: 'center',
      listStyle: 'none',
      margin: '0 auto',
      padding: cssVar('spacing', '32'),
    };

    const containerStyleByLayout: Record<FeatureGridLayout, React.CSSProperties> =
      {
        grid: gridStyle,
        list: listStyleObj,
        alternating: alternatingStyleObj,
        bento: bentoStyleObj,
        'panel-showcase': panelShowcaseContainerStyle,
        'stacked-deck': stackedDeckContainerStyle,
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
    const isPanelShowcase = layout === 'panel-showcase';
    const isStackedDeck = layout === 'stacked-deck';
    const needsScopedStyle = isAlternating || isBento;

    // --- panel-showcase element styles -----------------------------------
    const tablistStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
    };

    // Selectable header row (resting). The active marker (fill + underline +
    // left border) is composited on top in activeTabRowStyle.
    const tabRowStyle: React.CSSProperties = {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
      background: 'transparent',
      border: 'none',
      borderLeft: `${cssVar('spacing', '3')} solid transparent`,
      borderRadius: cssVar('radius', 'md'),
      color: cssVar('semantic', 'foreground', 'muted'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'h3', 'lineHeight'),
      cursor: 'pointer',
    };

    const activeTabRowStyle: React.CSSProperties = {
      ...tabRowStyle,
      backgroundColor: cssVar('semantic', 'primary', 'subtle'),
      borderLeftColor: cssVar('semantic', 'border', 'strong'),
      color: cssVar('semantic', 'foreground', 'base'),
      textDecoration: 'underline',
      textUnderlineOffset: cssVar('spacing', '4'),
      fontWeight: cssVar('typography', 'scale', 'h3', 'fontWeight'),
    };

    // The one shared panel that swaps to whichever row is selected.
    const panelStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      boxSizing: 'border-box',
      padding: cssVar('spacing', '40'),
      borderRadius: cssVar('radius', 'xl'),
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
    };

    // --- stacked-deck element styles -------------------------------------
    // Each card sits in the same grid cell; incremental offsets + z-index fan
    // the deck. Offsets are composed from spacing tokens via calc().
    const deckItemStyle = (index: number): React.CSSProperties => ({
      gridArea: '1 / 1',
      listStyle: 'none',
      width: '100%',
      maxWidth: '360px',
      transform: `translate(calc(${cssVar('spacing', '16')} * ${index}), calc(${cssVar('spacing', '12')} * ${index}))`,
      zIndex: index,
    });

    // Semi-transparent surface composited from a token colour (no glass token
    // exists, so color-mix synthesises the alpha from a cssVar base).
    const deckSurfaceStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      boxSizing: 'border-box',
      padding: cssVar('spacing', '24'),
      borderRadius: cssVar('radius', 'xl'),
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      backgroundColor: `color-mix(in srgb, ${cssVar('semantic', 'background', 'elevated')} 88%, transparent)`,
      boxShadow: cssVar('shadow', 'lg'),
    };

    // panel-showcase responsive split: single column on mobile, two tracks
    // (rows | shared panel) at ≥ lg. Expressed via scoped <style> because
    // @media cannot live in React's inline style prop.
    const panelShowcaseCss = isPanelShowcase
      ? `
        @media (min-width: ${breakpoints.lg}px) {
          .${FG_ID}-panel {
            grid-template-columns: 1fr 1.6fr !important;
            align-items: start;
          }
        }
      `
      : '';

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

        {/* panel-showcase: responsive 2-track split lives in a scoped <style>. */}
        {isPanelShowcase && <style>{panelShowcaseCss}</style>}

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

        {isPanelShowcase ? (
          // 2-track split: a vertical tablist of selectable rows beside the
          // single shared panel that swaps to the selected item.
          <div
            className={`${FG_ID}-panel`}
            style={containerStyleByLayout['panel-showcase']}
          >
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={title ?? 'Features'}
              style={tablistStyle}
            >
              {items.map((item, index) => {
                const selected = index === safeActive;
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    id={`${FG_ID}-tab-${index}`}
                    aria-selected={selected}
                    aria-controls={`${FG_ID}-panel-view`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    style={selected ? activeTabRowStyle : tabRowStyle}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {activeItem && (
              <div
                role="tabpanel"
                id={`${FG_ID}-panel-view`}
                aria-labelledby={`${FG_ID}-tab-${safeActive}`}
                data-bbangto-featuregrid-panel="true"
                style={panelStyle}
              >
                {activeItem.icon && (
                  <span style={iconWrapperStyle} aria-hidden="true">
                    {activeItem.icon}
                  </span>
                )}
                <Text variant="h3" as="h3">
                  {activeItem.title}
                </Text>
                <Text variant="body" color="muted" style={descriptionStyle}>
                  {activeItem.description}
                </Text>
              </div>
            )}
          </div>
        ) : isStackedDeck ? (
          // Overlapping cards sharing one grid cell; fanned via transform + z.
          <ul
            className={`${FG_ID}-deck`}
            style={containerStyleByLayout['stacked-deck']}
            aria-label={title ?? 'Features'}
          >
            {items.map((item, index) => (
              <li key={index} style={deckItemStyle(index)}>
                <div style={deckSurfaceStyle}>
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
              </li>
            ))}
          </ul>
        ) : (
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
        )}
      </section>
    );
  }
);

FeatureGrid.displayName = 'FeatureGrid';
