import React from 'react';
import { cssVar } from '@centurio1987/tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc' | 'none';
/**
 * Chrome treatment of the table frame.
 * - `default`  — enclosed card: 1px muted border on all 4 sides, rounded, filled.
 * - `divided`  — no outer frame / no fill; rows read as thin horizontal rules and
 *                the header carries a thick underline only.
 * - `outlined` — card-like enclosure: rounded border frame + background fill in an
 *                overflow-auto container.
 * @default 'default'
 */
export type TableVariant = 'default' | 'divided' | 'outlined';

// ─── Context ─────────────────────────────────────────────────────────────────

interface TableContextValue {
  size: TableSize;
  striped: boolean;
  variant: TableVariant;
  rowIndex: React.MutableRefObject<number>;
}

const TableContext = React.createContext<TableContextValue>({
  size: 'md',
  striped: false,
  variant: 'default',
  rowIndex: { current: 0 },
});

// ─── Table ───────────────────────────────────────────────────────────────────

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  /**
   * Density / size of cell padding.
   * @default 'md'
   */
  size?: TableSize;
  /**
   * Alternates the background of odd/even rows in <TableBody>.
   * @default false
   */
  striped?: boolean;
  /**
   * Frame chrome of the table. See {@link TableVariant}.
   * @default 'default'
   */
  variant?: TableVariant;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, style, className, size = 'md', striped = false, variant = 'default', ...props }, ref) => {
    const rowIndex = React.useRef(0);

    const isDivided = variant === 'divided';
    const isOutlined = variant === 'outlined';

    // `divided` strips the enclosing card chrome down to bare horizontal rules:
    // no 4-side frame, no rounded corners, no surface fill. `default` and
    // `outlined` both enclose the table in a filled, rounded border frame —
    // `outlined` leans on the stronger `base` border to read as a distinct card.
    const containerStyle: React.CSSProperties = isDivided
      ? {
          width: '100%',
          overflow: 'auto',
          border: 'none',
          borderRadius: 0,
          backgroundColor: 'transparent',
        }
      : {
          width: '100%',
          overflow: 'auto',
          border: `1px solid ${cssVar('semantic', 'border', isOutlined ? 'base' : 'muted')}`,
          borderRadius: cssVar('radius', 'md'),
          backgroundColor: cssVar('semantic', 'background', 'base'),
        };

    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'base'),
      ...style,
    };

    return (
      <TableContext.Provider value={{ size, striped, variant, rowIndex }}>
        <div style={containerStyle}>
          <table
            ref={ref}
            style={tableStyle}
            className={className}
            data-size={size}
            data-bbangto-table-variant={variant}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = 'Table';

// ─── TableHead ───────────────────────────────────────────────────────────────

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, style, ...props }, ref) => {
  const { variant } = React.useContext(TableContext);
  const isDivided = variant === 'divided';

  return (
    <thead
      ref={ref}
      style={{
        // `divided` drops the header fill and leans on a thick underline rule;
        // enclosed variants keep the elevated surface + hairline separator.
        backgroundColor: isDivided
          ? 'transparent'
          : cssVar('semantic', 'background', 'elevated'),
        borderBottom: isDivided
          ? `2px solid ${cssVar('semantic', 'border', 'strong')}`
          : `1px solid ${cssVar('semantic', 'border', 'base')}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </thead>
  );
});
TableHead.displayName = 'TableHead';

// ─── TableBody ───────────────────────────────────────────────────────────────

/** Resets the row stripe counter each render so striping is always consistent. */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, style, ...props }, ref) => {
  const { rowIndex } = React.useContext(TableContext);
  // Reset counter before rendering body rows
  rowIndex.current = 0;

  return (
    <tbody ref={ref} style={{ ...style }} {...props}>
      {children}
    </tbody>
  );
});
TableBody.displayName = 'TableBody';

// ─── TableRow ────────────────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Highlights the row as selected.
   * Sets aria-selected="true" and applies a primary subtle background.
   * @default false
   */
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, style, selected = false, ...props }, ref) => {
    const { striped, rowIndex } = React.useContext(TableContext);

    // Bump counter — we use a ref so the increment happens during render
    // without causing re-renders.
    const currentIndex = rowIndex.current;
    rowIndex.current = currentIndex + 1;

    const isEven = currentIndex % 2 === 1; // 0-based: rows 1, 3, … are "even" visually
    const stripeAttr = striped ? (isEven ? 'even' : 'odd') : undefined;

    let backgroundColor: string | undefined;
    if (selected) {
      backgroundColor = cssVar('semantic', 'primary', 'subtle');
    } else if (striped && isEven) {
      backgroundColor = cssVar('semantic', 'background', 'elevated');
    }

    const rowStyle: React.CSSProperties = {
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      backgroundColor,
      transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      ...style,
    };

    return (
      <tr
        ref={ref}
        style={rowStyle}
        aria-selected={selected ? true : undefined}
        data-stripe={stripeAttr}
        {...props}
      >
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'TableRow';

// ─── TableHeader ─────────────────────────────────────────────────────────────

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Enables sort affordance — renders a sort direction indicator.
   * @default false
   */
  sortable?: boolean;
  /**
   * Current sort direction for this column.
   * Only meaningful when sortable=true.
   * @default 'none'
   */
  sortDirection?: SortDirection;
}

/** Inline sort icon — a compact up/down chevron using CSS borders only. */
function SortIcon({ direction }: { direction: SortDirection }) {
  const activeColor = cssVar('semantic', 'primary', 'base');
  const inactiveColor = cssVar('semantic', 'foreground', 'subtle');

  const upColor = direction === 'asc' ? activeColor : inactiveColor;
  const downColor = direction === 'desc' ? activeColor : inactiveColor;

  return (
    <span
      data-sort-icon
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '2px',
        marginLeft: cssVar('spacing', '4'),
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    >
      {/* Up chevron */}
      <span
        style={{
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderBottom: `4px solid ${upColor}`,
        }}
      />
      {/* Down chevron */}
      <span
        style={{
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: `4px solid ${downColor}`,
        }}
      />
    </span>
  );
}

const ARIA_SORT: Record<SortDirection, React.AriaAttributes['aria-sort']> = {
  asc: 'ascending',
  desc: 'descending',
  none: 'none',
};

export const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ children, style, sortable = false, sortDirection = 'none', ...props }, ref) => {
    const { size } = React.useContext(TableContext);

    const paddingV =
      size === 'sm'
        ? cssVar('spacing', '8')
        : size === 'lg'
        ? cssVar('spacing', '16')
        : cssVar('spacing', '12');
    const paddingH = cssVar('spacing', '16');

    return (
      <th
        ref={ref}
        style={{
          padding: `${paddingV} ${paddingH}`,
          fontWeight: 'bold',
          color: cssVar('semantic', 'foreground', 'muted'),
          cursor: sortable ? 'pointer' : undefined,
          userSelect: sortable ? 'none' : undefined,
          whiteSpace: 'nowrap',
          ...style,
        }}
        aria-sort={sortable ? ARIA_SORT[sortDirection] : undefined}
        {...props}
      >
        {children}
        {sortable && <SortIcon direction={sortDirection} />}
      </th>
    );
  }
);
TableHeader.displayName = 'TableHeader';

// ─── TableCell ───────────────────────────────────────────────────────────────

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ children, style, ...props }, ref) => {
    const { size } = React.useContext(TableContext);

    const paddingV =
      size === 'sm'
        ? cssVar('spacing', '8')
        : size === 'lg'
        ? cssVar('spacing', '20')
        : cssVar('spacing', '16');
    const paddingH = cssVar('spacing', '16');

    return (
      <td
        ref={ref}
        style={{
          padding: `${paddingV} ${paddingH}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </td>
    );
  }
);
TableCell.displayName = 'TableCell';
