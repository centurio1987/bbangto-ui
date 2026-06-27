import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';
import { Text } from '../components/Text';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Visual arrangement of the comparison block.
 * - `table`   (default) — feature comparison table (1 label col + N data cols).
 * - `columns` — two side-by-side cards (e.g. "Us" vs "Them"); stacks on mobile,
 *               2-col at ≥ lg breakpoint via a scoped media rule.
 * - `slider`  — before/after overlay with a draggable / keyboard-operable divider.
 */
export type ComparisonLayout = 'table' | 'columns' | 'slider';

export interface ComparisonColumn {
  /** Column header name (e.g. plan or product name). */
  name: string;
  /** When true, this column is visually highlighted as the recommended/featured option. */
  highlighted?: boolean;
}

export interface ComparisonRow {
  /** Row feature label displayed in the first column. */
  label: string;
  /**
   * Values for each column (positionally matched to `columns`).
   * - `true`  → rendered as a check mark (✓)
   * - `false` → rendered as a dash (–)
   * - string  → rendered as-is
   */
  values: (string | boolean)[];
}

export interface ComparisonProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional section heading. */
  title?: string;
  /** Column definitions — at least one required. */
  columns: ComparisonColumn[];
  /** Feature rows — each row has a label and one value per column. */
  rows: ComparisonRow[];
  /**
   * Visual arrangement of the block. Defaults to `'table'` (existing behavior).
   * @default 'table'
   */
  layout?: ComparisonLayout;
}

/** Stable class/css-var namespace prefix for scoped <style> rules. */
const COMPARISON_ID = 'bbangto-comparison';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span
        aria-label="included"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: cssVar('radius', 'full'),
          backgroundColor: cssVar('semantic', 'success', 'subtle'),
          color: cssVar('semantic', 'success', 'base'),
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        ✓
      </span>
    );
  }

  if (value === false) {
    return (
      <span
        aria-label="not included"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          color: cssVar('semantic', 'foreground', 'subtle'),
          fontSize: '1rem',
          lineHeight: 1,
        }}
      >
        –
      </span>
    );
  }

  return (
    <Text variant="body" style={{ textAlign: 'center' }}>
      {value}
    </Text>
  );
}

/**
 * Renders the feature list for a single column inside a slider panel.
 */
function SliderPanel({
  column,
  rows,
  colIdx,
  variant,
}: {
  column: ComparisonColumn;
  rows: ComparisonRow[];
  colIdx: number;
  variant: 'before' | 'after';
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: cssVar('spacing', '8'),
        padding: cssVar('spacing', '24'),
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor:
          variant === 'after'
            ? cssVar('semantic', 'primary', 'subtle')
            : cssVar('semantic', 'background', 'sunken'),
      }}
    >
      <Text variant="h3" color={variant === 'after' ? 'primary' : 'base'}>
        {column.name}
      </Text>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {rows.map((row, rowIdx) => (
          <li
            key={rowIdx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: cssVar('spacing', '12'),
              padding: `${cssVar('spacing', '8')} 0`,
              borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
              whiteSpace: 'nowrap',
            }}
          >
            <Text variant="body">{row.label}</Text>
            <CellValue value={row.values[colIdx] ?? false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ComparisonSliderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  heading: React.ReactNode;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  sectionStyle: React.CSSProperties;
}

/**
 * Before/after overlay comparison. The first column is the "before" base panel;
 * the second column is the "after" panel, clipped from the left to `position`%.
 * A native range input acts as the draggable + keyboard-operable divider so it
 * works with pointer drag AND arrow keys out of the box.
 */
const ComparisonSlider = React.forwardRef<HTMLElement, ComparisonSliderProps>(
  ({ title, heading, columns, rows, sectionStyle, ...props }, ref) => {
    const [position, setPosition] = React.useState(50);
    const beforeCol = columns[0];
    const afterCol = columns[1] ?? columns[0];
    const overlayClass = `${COMPARISON_ID}-slider-overlay`;

    return (
      <section
        ref={ref}
        data-bbangto-comparison-layout="slider"
        style={sectionStyle}
        {...props}
      >
        <style>{`
          .${overlayClass} {
            transition: clip-path 120ms ease-out;
          }
          @media (prefers-reduced-motion: reduce) {
            .${overlayClass} {
              transition: none !important;
            }
          }
        `}</style>
        {heading}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: cssVar('radius', 'lg'),
            overflow: 'hidden',
            border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
          }}
        >
          {/* Base ("before") panel — full width underneath. */}
          <SliderPanel column={beforeCol} rows={rows} colIdx={0} variant="before" />

          {/* Top ("after") panel — clipped from the left edge to `position`%. */}
          <div
            className={overlayClass}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 0 0 ${position}%)`,
            }}
          >
            <SliderPanel
              column={afterCol}
              rows={rows}
              colIdx={columns[1] ? 1 : 0}
              variant="after"
            />
          </div>

          {/* Visual divider handle at the split point. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${position}%`,
              width: 2,
              transform: 'translateX(-1px)',
              backgroundColor: cssVar('semantic', 'primary', 'base'),
              pointerEvents: 'none',
            }}
          />

          {/* Draggable + keyboard-operable divider control. */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label={
              title
                ? `${title} — reveal ${afterCol.name} over ${beforeCol.name}`
                : `Reveal ${afterCol.name} over ${beforeCol.name}`
            }
            aria-valuetext={`${position}%`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: cssVar('spacing', '8'),
              width: '100%',
              margin: 0,
              cursor: 'ew-resize',
            }}
          />
        </div>
      </section>
    );
  }
);

ComparisonSlider.displayName = 'ComparisonSlider';

// ─── Component ────────────────────────────────────────────────────────────────

export const Comparison = React.forwardRef<HTMLElement, ComparisonProps>(
  ({ title, columns, rows, layout = 'table', style, ...props }, ref) => {
    const colCount = columns.length;

    // Grid: 1 label column + N data columns.
    // min(160px) for data cols so the grid stays readable without media queries.
    const gridTemplateColumns = `minmax(140px, 1fr) repeat(${colCount}, minmax(120px, 1fr))`;

    const sectionStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'base'),
      ...style,
    };

    const headerRowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      gap: 0,
      borderBottom: `2px solid ${cssVar('semantic', 'border', 'base')}`,
    };

    const dataRowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      gap: 0,
    };

    const cellBase: React.CSSProperties = {
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '12')}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    };

    const labelCellStyle: React.CSSProperties = {
      ...cellBase,
      justifyContent: 'flex-start',
      paddingLeft: cssVar('spacing', '16'),
    };

    const heading = title && (
      <Text
        variant="h2"
        style={{
          textAlign: 'center',
          marginBottom: cssVar('spacing', '32'),
        }}
      >
        {title}
      </Text>
    );

    // ─── Layout: columns ────────────────────────────────────────────────────
    // Two side-by-side cards (one per column) — stacks on mobile, becomes a
    // 2-col grid at ≥ lg via a scoped <style> rule (@media can't be inline).
    if (layout === 'columns') {
      const cardsClass = `${COMPARISON_ID}-cards`;
      return (
        <section
          ref={ref}
          data-bbangto-comparison-layout="columns"
          style={sectionStyle}
          {...props}
        >
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${cardsClass} {
                grid-template-columns: repeat(${colCount}, 1fr) !important;
              }
            }
          `}</style>
          {heading}
          <div
            className={cardsClass}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: cssVar('spacing', '24'),
              alignItems: 'start',
            }}
          >
            {columns.map((col, colIdx) => (
              <div
                key={colIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: cssVar('spacing', '12'),
                  padding: cssVar('spacing', '24'),
                  borderRadius: cssVar('radius', 'lg'),
                  border: `${col.highlighted ? '2px' : '1px'} solid ${
                    col.highlighted
                      ? cssVar('semantic', 'primary', 'base')
                      : cssVar('semantic', 'border', 'base')
                  }`,
                  backgroundColor: col.highlighted
                    ? cssVar('semantic', 'primary', 'subtle')
                    : cssVar('semantic', 'background', 'elevated'),
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: cssVar('spacing', '8'),
                  }}
                >
                  <Text variant="h3" color={col.highlighted ? 'primary' : 'base'}>
                    {col.name}
                  </Text>
                  {col.highlighted && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: `${cssVar('spacing', '2')} ${cssVar('spacing', '8')}`,
                        borderRadius: cssVar('radius', 'full'),
                        backgroundColor: cssVar('semantic', 'primary', 'base'),
                        color: cssVar('semantic', 'primary', 'foreground'),
                        fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                        fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
                        lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
                      }}
                    >
                      Recommended
                    </span>
                  )}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {rows.map((row, rowIdx) => {
                    const val = row.values[colIdx] ?? false;
                    return (
                      <li
                        key={rowIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: cssVar('spacing', '12'),
                          padding: `${cssVar('spacing', '8')} 0`,
                          borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
                        }}
                      >
                        <Text variant="body">{row.label}</Text>
                        <CellValue value={val} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // ─── Layout: slider ─────────────────────────────────────────────────────
    // Before/after overlay: two stacked panels, the top ("after") clipped to a
    // width driven by a range input. Keyboard-operable (arrow keys move the
    // divider). prefers-reduced-motion disables the clip transition.
    if (layout === 'slider') {
      return (
        <ComparisonSlider
          ref={ref}
          title={title}
          heading={heading}
          columns={columns}
          rows={rows}
          sectionStyle={sectionStyle}
          {...props}
        />
      );
    }

    // ─── Layout: table (default, unchanged behavior) ────────────────────────
    return (
      <section
        ref={ref}
        data-bbangto-comparison-layout="table"
        style={sectionStyle}
        {...props}
      >
        {/* Optional heading */}
        {heading}

        {/* Scrollable wrapper for narrow viewports */}
        <div
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Comparison table — semantic role */}
          <div
            role="table"
            aria-label={title ?? 'Feature comparison'}
            style={{ minWidth: `${140 + colCount * 120}px` }}
          >
            {/* Column header row */}
            <div role="rowgroup">
              <div role="row" style={headerRowStyle}>
                {/* Empty corner cell for the label column */}
                <div
                  role="columnheader"
                  aria-label="Feature"
                  style={{
                    ...cellBase,
                    justifyContent: 'flex-start',
                    paddingLeft: cssVar('spacing', '16'),
                    borderBottom: 'none',
                  }}
                />
                {columns.map((col, i) => (
                  <div
                    key={i}
                    role="columnheader"
                    aria-sort="none"
                    style={{
                      ...cellBase,
                      flexDirection: 'column',
                      gap: cssVar('spacing', '4'),
                      borderBottom: 'none',
                      backgroundColor: col.highlighted
                        ? cssVar('semantic', 'primary', 'subtle')
                        : 'transparent',
                      borderRadius: i === 0
                        ? `${cssVar('radius', 'lg')} 0 0 0`
                        : i === colCount - 1
                          ? `0 ${cssVar('radius', 'lg')} 0 0`
                          : undefined,
                    }}
                  >
                    <Text
                      variant="h3"
                      color={col.highlighted ? 'primary' : 'base'}
                      style={{ textAlign: 'center' }}
                    >
                      {col.name}
                    </Text>
                    {col.highlighted && (
                      <span
                        style={{
                          display: 'inline-block',
                          padding: `${cssVar('spacing', '2')} ${cssVar('spacing', '8')}`,
                          borderRadius: cssVar('radius', 'full'),
                          backgroundColor: cssVar('semantic', 'primary', 'base'),
                          color: cssVar('semantic', 'primary', 'foreground'),
                          fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                          fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
                          lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
                        }}
                      >
                        Recommended
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Data rows */}
            <div role="rowgroup">
              {rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  role="row"
                  style={{
                    ...dataRowStyle,
                    backgroundColor:
                      rowIdx % 2 === 1
                        ? cssVar('semantic', 'background', 'sunken')
                        : cssVar('semantic', 'background', 'elevated'),
                  }}
                >
                  {/* Feature label */}
                  <div role="rowheader" style={labelCellStyle}>
                    <Text variant="body">{row.label}</Text>
                  </div>

                  {/* Values */}
                  {columns.map((col, colIdx) => {
                    const val = row.values[colIdx] ?? false;
                    return (
                      <div
                        key={colIdx}
                        role="cell"
                        style={{
                          ...cellBase,
                          backgroundColor: col.highlighted
                            ? cssVar('semantic', 'primary', 'subtle')
                            : 'transparent',
                        }}
                      >
                        <CellValue value={val} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Comparison.displayName = 'Comparison';
