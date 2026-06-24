import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

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

// ─── Component ────────────────────────────────────────────────────────────────

export const Comparison = React.forwardRef<HTMLElement, ComparisonProps>(
  ({ title, columns, rows, style, ...props }, ref) => {
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
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'subtle')}`,
    };

    const labelCellStyle: React.CSSProperties = {
      ...cellBase,
      justifyContent: 'flex-start',
      paddingLeft: cssVar('spacing', '16'),
    };

    return (
      <section ref={ref} style={sectionStyle} {...props}>
        {/* Optional heading */}
        {title && (
          <Text
            variant="h2"
            style={{
              textAlign: 'center',
              marginBottom: cssVar('spacing', '32'),
            }}
          >
            {title}
          </Text>
        )}

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
