import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'navigation' | 'dot' | 'counter';
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ variant = 'navigation', totalPages = 10, currentPage = 1, onPageChange, style, className, ...props }, ref) => {
    
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const handlePrev = () => {
      if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
    };

    if (variant === 'counter') {
      return (
        <div ref={ref} style={containerStyle} className={className} {...props}>
          <span style={{ fontSize: cssVar('typography', 'scale', 'body', 'fontSize') }}>
            <b>{currentPage}</b> / {totalPages}
          </span>
        </div>
      );
    }

    if (variant === 'dot') {
      return (
        <div ref={ref} style={containerStyle} className={className} {...props}>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActive = idx + 1 === currentPage;
            return (
              <div
                key={idx}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'base'),
                  cursor: 'pointer',
                }}
                onClick={() => onPageChange?.(idx + 1)}
              />
            );
          })}
        </div>
      );
    }

    // Navigation variant
    const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      color: cssVar('semantic', 'foreground', 'base'),
    });

    const pageBtnStyle = (isActive: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: isActive ? cssVar('semantic', 'primary', 'base') : 'transparent',
      color: isActive ? cssVar('semantic', 'primary', 'foreground') : cssVar('semantic', 'foreground', 'base'),
      cursor: 'pointer',
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    });

    // Simple page windowing logic for demo (shows max 5 pages)
    const getPages = () => {
      const pages = [];
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + 4);
      if (end - start < 4) {
        start = Math.max(1, end - 4);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        <button style={navBtnStyle(currentPage === 1)} onClick={handlePrev} disabled={currentPage === 1}>
          &lt;
        </button>
        {getPages().map((page) => (
          <div key={page} style={pageBtnStyle(page === currentPage)} onClick={() => onPageChange?.(page)}>
            {page}
          </div>
        ))}
        <button style={navBtnStyle(currentPage === totalPages)} onClick={handleNext} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
