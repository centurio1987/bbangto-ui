import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type PaginationSize = 'sm' | 'md' | 'lg';

/**
 * Visual treatment of the pagination control.
 *
 * The first member (`navigation`) is the default and its render is frozen —
 * legacy call sites and stories must keep working untouched. The page-list
 * chrome variants (`segmented` / `outlined` / `pixel`) are appended at the end
 * and reuse navigation's page window + a11y contract (navigation landmark +
 * `aria-current=page`); they only differ in how each page item is framed.
 */
export type PaginationVariant =
  | 'navigation'
  | 'dot'
  | 'counter'
  | 'segmented'
  | 'outlined'
  | 'pixel';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PaginationVariant;
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

    // ── segmented / outlined / pixel variants ────────────────────────────────
    // Page-list chrome variations. They share the navigation window logic and
    // its a11y contract (navigation landmark + aria-current=page); only the
    // framing of each page item differs. Page items render as real <button>s so
    // keyboard activation (Enter/Space) and focus come for free.
    if (variant === 'segmented' || variant === 'outlined' || variant === 'pixel') {
      const pages = getPages();
      const accent = disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'primary', 'base');
      const activeFg = disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'primary', 'foreground');
      const baseFg = disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base');

      const itemBase: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: btnSizePx,
        height: btnSizePx,
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
        fontSize: FONT_SIZE_MAP[size](),
        fontFamily:
          variant === 'pixel'
            ? cssVar('typography', 'fontFamily', 'mono')
            : cssVar('typography', 'fontFamily', 'sans'),
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };

      // Per-variant container chrome.
      let variantContainer: React.CSSProperties;
      if (variant === 'segmented') {
        // One shared outer ring; items fuse with gap:0 and clip at the ends.
        variantContainer = {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
          borderRadius: cssVar('radius', 'md'),
          overflow: 'hidden',
          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        };
      } else if (variant === 'outlined') {
        // Separate bordered boxes with breathing room between them.
        variantContainer = {
          display: 'inline-flex',
          alignItems: 'center',
          gap: cssVar('spacing', '8'),
          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        };
      } else {
        // pixel: tight retro chrome, monospace, no motion.
        variantContainer = {
          display: 'inline-flex',
          alignItems: 'center',
          gap: cssVar('spacing', '6'),
          fontFamily: cssVar('typography', 'fontFamily', 'mono'),
        };
      }

      const itemStyle = (
        isActive: boolean,
        idx: number,
        isLast: boolean
      ): React.CSSProperties => {
        if (variant === 'segmented') {
          return {
            ...itemBase,
            backgroundColor: isActive
              ? disabled
                ? cssVar('semantic', 'disabled', 'background')
                : accent
              : 'transparent',
            color: isActive ? activeFg : baseFg,
            // Interior 1px dividers only; the first item has no left divider.
            borderLeft:
              idx === 0 ? 'none' : `1px solid ${cssVar('semantic', 'border', 'muted')}`,
            // Radius only on the two end items (left end / right end).
            borderTopLeftRadius: idx === 0 ? cssVar('radius', 'md') : 0,
            borderBottomLeftRadius: idx === 0 ? cssVar('radius', 'md') : 0,
            borderTopRightRadius: isLast ? cssVar('radius', 'md') : 0,
            borderBottomRightRadius: isLast ? cssVar('radius', 'md') : 0,
          };
        }
        if (variant === 'outlined') {
          // Each item is its own outlined box; active swaps to accent outline +
          // accent text while staying transparent (outline, never a solid fill).
          return {
            ...itemBase,
            backgroundColor: 'transparent',
            color: isActive ? accent : baseFg,
            border: `1px solid ${isActive ? accent : cssVar('semantic', 'border', 'base')}`,
            borderRadius: cssVar('radius', 'md'),
          };
        }
        // pixel: hard square edges (no radius) + zero-blur hard offset shadow.
        return {
          ...itemBase,
          backgroundColor: isActive
            ? disabled
              ? cssVar('semantic', 'disabled', 'background')
              : accent
            : cssVar('semantic', 'background', 'elevated'),
          color: isActive ? activeFg : baseFg,
          border: `2px solid ${cssVar('semantic', 'border', 'strong')}`,
          borderRadius: cssVar('radius', 'none'),
          boxShadow: `2px 2px 0 ${cssVar('semantic', 'border', 'strong')}`,
        };
      };

      return (
        <div
          ref={ref}
          role="navigation"
          aria-label="pagination"
          data-bbangto-pagination-variant={variant}
          style={{ ...variantContainer, ...style }}
          className={className}
          {...props}
        >
          {pages.map((page, idx) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                style={itemStyle(isActive, idx, idx === pages.length - 1)}
                onClick={() => !disabled && onPageChange?.(page)}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`page ${page}`}
              >
                {page}
              </button>
            );
          })}
        </div>
      );
    }

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
