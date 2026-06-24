import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'navigation' | 'dot' | 'counter';
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  /** Button size scale. Defaults to 'md'. */
  size?: PaginationSize;
  /** Disable all interaction. */
  disabled?: boolean;
  /** Show first-page / last-page edge buttons (navigation variant only). */
  showEdges?: boolean;
  /** Number of sibling pages shown on each side of the current page (navigation variant only). Defaults to 2. */
  siblings?: number;
}

// Size token maps
const BTN_SIZE: Record<PaginationSize, string> = {
  sm: '24px',
  md: '32px',
  lg: '40px',
};

const FONT_SIZE_MAP: Record<PaginationSize, () => string> = {
  sm: () => cssVar('typography', 'scale', 'meta', 'fontSize'),
  md: () => cssVar('typography', 'scale', 'body', 'fontSize'),
  lg: () => cssVar('typography', 'scale', 'h3', 'fontSize'),
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = 'navigation',
      totalPages = 10,
      currentPage = 1,
      onPageChange,
      size = 'md',
      disabled = false,
      showEdges = false,
      siblings = 2,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const handlePrev = () => {
      if (!disabled && currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (!disabled && currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
    };

    const handleFirst = () => {
      if (!disabled && currentPage !== 1 && onPageChange) onPageChange(1);
    };

    const handleLast = () => {
      if (!disabled && currentPage !== totalPages && onPageChange) onPageChange(totalPages);
    };

    // ── counter variant ──────────────────────────────────────────────────────
    if (variant === 'counter') {
      return (
        <div ref={ref} style={containerStyle} className={className} {...props}>
          <span
            style={{
              fontSize: FONT_SIZE_MAP[size](),
              color: disabled ? cssVar('semantic', 'disabled', 'foreground') : cssVar('semantic', 'foreground', 'base'),
            }}
          >
            <b>{currentPage}</b> / {totalPages}
          </span>
        </div>
      );
    }

    // ── dot variant ──────────────────────────────────────────────────────────
    if (variant === 'dot') {
      const dotSize = size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px';
      return (
        <div ref={ref} style={containerStyle} className={className} {...props}>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActive = idx + 1 === currentPage;
            return (
              <div
                key={idx}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: '50%',
                  backgroundColor: isActive
                    ? disabled
                      ? cssVar('semantic', 'disabled', 'foreground')
                      : cssVar('semantic', 'primary', 'base')
                    : cssVar('semantic', 'border', 'base'),
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.5 : 1,
                }}
                onClick={() => !disabled && onPageChange?.(idx + 1)}
              />
            );
          })}
        </div>
      );
    }

    // ── navigation variant ───────────────────────────────────────────────────
    const btnSizePx = BTN_SIZE[size];

    const navBtnStyle = (isDisabled: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: btnSizePx,
      height: btnSizePx,
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: FONT_SIZE_MAP[size](),
    });

    const pageBtnStyle = (isActive: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: btnSizePx,
      height: btnSizePx,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: isActive
        ? disabled
          ? cssVar('semantic', 'disabled', 'background')
          : cssVar('semantic', 'primary', 'base')
        : 'transparent',
      color: isActive
        ? disabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : cssVar('semantic', 'primary', 'foreground')
        : disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: FONT_SIZE_MAP[size](),
      opacity: disabled ? 0.6 : 1,
    });

    // Page window logic: respects siblings prop
    const getPages = (): number[] => {
      const pages: number[] = [];
      let start = Math.max(1, currentPage - siblings);
      let end = Math.min(totalPages, currentPage + siblings);
      // Clamp window to always show (siblings * 2 + 1) pages when possible
      const windowSize = siblings * 2;
      if (end - start < windowSize) {
        if (start === 1) {
          end = Math.min(totalPages, start + windowSize);
        } else {
          start = Math.max(1, end - windowSize);
        }
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    const isPrevDisabled = disabled || currentPage === 1;
    const isNextDisabled = disabled || currentPage === totalPages;
    const isFirstDisabled = disabled || currentPage === 1;
    const isLastDisabled = disabled || currentPage === totalPages;

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        {showEdges && (
          <button
            style={navBtnStyle(isFirstDisabled)}
            onClick={handleFirst}
            disabled={isFirstDisabled}
            aria-label="first page"
          >
            &laquo;
          </button>
        )}
        <button
          style={navBtnStyle(isPrevDisabled)}
          onClick={handlePrev}
          disabled={isPrevDisabled}
          aria-label="prev page"
        >
          &lt;
        </button>
        {getPages().map((page) => (
          <div
            key={page}
            style={pageBtnStyle(page === currentPage)}
            onClick={() => !disabled && onPageChange?.(page)}
            role="button"
            aria-current={page === currentPage ? 'page' : undefined}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
          >
            {page}
          </div>
        ))}
        <button
          style={navBtnStyle(isNextDisabled)}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="next page"
        >
          &gt;
        </button>
        {showEdges && (
          <button
            style={navBtnStyle(isLastDisabled)}
            onClick={handleLast}
            disabled={isLastDisabled}
            aria-label="last page"
          >
            &raquo;
          </button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
