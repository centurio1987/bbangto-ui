import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      width: '100%',
      overflowX: 'auto',
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
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
      <div style={containerStyle}>
        <table ref={ref} style={tableStyle} className={className} {...props}>
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = 'Table';

export const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, style, ...props }, ref) => (
    <thead ref={ref} style={{ backgroundColor: cssVar('semantic', 'background', 'elevated'), borderBottom: `1px solid ${cssVar('semantic', 'border', 'base')}`, ...style }} {...props}>
      {children}
    </thead>
  )
);
TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, style, ...props }, ref) => (
    <tbody ref={ref} style={{ ...style }} {...props}>
      {children}
    </tbody>
  )
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ children, style, ...props }, ref) => (
    <tr ref={ref} style={{ borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`, ...style }} {...props}>
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

export const TableHeader = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ children, style, ...props }, ref) => (
    <th ref={ref} style={{ padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`, fontWeight: 'bold', color: cssVar('semantic', 'foreground', 'muted'), ...style }} {...props}>
      {children}
    </th>
  )
);
TableHeader.displayName = 'TableHeader';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ children, style, ...props }, ref) => (
    <td ref={ref} style={{ padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '16')}`, ...style }} {...props}>
      {children}
    </td>
  )
);
TableCell.displayName = 'TableCell';
