import React, { useState, useMemo } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';
import { Pagination } from './Pagination';

export interface DataGridColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (selectedIndices: number[]) => void;
}

export function DataGrid<T>({
  data,
  columns,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleSelectRow = (index: number) => {
    const newSet = new Set(selectedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedIndices(newSet);
    onSelectionChange?.(Array.from(newSet));
  };

  const handleSelectAll = () => {
    if (selectedIndices.size === data.length) {
      setSelectedIndices(new Set());
      onSelectionChange?.([]);
    } else {
      const allIndices = new Set(data.map((_, i) => i));
      setSelectedIndices(allIndices);
      onSelectionChange?.(Array.from(allIndices));
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a: any, b: any) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  // To keep track of original indices for selection
  const paginatedItemsWithIndex = paginatedData.map(item => ({
    item,
    originalIndex: data.indexOf(item)
  }));

  const allSelected = data.length > 0 && selectedIndices.size === data.length;
  const indeterminate = selectedIndices.size > 0 && selectedIndices.size < data.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '16') }}>
      <Table>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableHeader style={{ width: '40px', padding: `0 ${cssVar('spacing', '16')}` }}>
                {/* Simplified checkbox handling without passing indeterminate to actual Checkbox if it doesn't support it */}
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  ref={input => { if (input) input.indeterminate = indeterminate; }}
                  onChange={handleSelectAll} 
                />
              </TableHeader>
            )}
            {columns.map((col) => (
              <TableHeader
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(String(col.key))}
                style={{ cursor: col.sortable ? 'pointer' : 'default', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <span style={{ fontSize: '0.8em' }}>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItemsWithIndex.map(({ item, originalIndex }) => (
            <TableRow key={originalIndex} style={{ backgroundColor: selectedIndices.has(originalIndex) ? cssVar('semantic', 'background', 'sunken') : 'transparent' }}>
              {selectable && (
                <TableCell style={{ width: '40px', padding: `0 ${cssVar('spacing', '16')}` }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIndices.has(originalIndex)} 
                    onChange={() => handleSelectRow(originalIndex)} 
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(item) : String((item as any)[col.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {paginatedItemsWithIndex.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + (selectable ? 1 : 0)} style={{ textAlign: 'center', padding: cssVar('spacing', '32') }}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="navigation"
          />
        </div>
      )}
    </div>
  );
}
