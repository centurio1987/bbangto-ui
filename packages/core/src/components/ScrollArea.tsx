import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export type ScrollAreaVariant = 'overlay' | 'inset' | 'always' | 'hover';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ScrollAreaOrientation;
  variant?: ScrollAreaVariant;
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      orientation = 'vertical',
      variant = 'overlay',
      maxHeight,
      maxWidth,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // For the `always` variant, force scrollbars to remain visible by using
    // `scroll` instead of `auto` on the active axis (the axis the orientation enables).
    const activeOverflow = variant === 'always' ? 'scroll' : 'auto';
    const overflowX =
      orientation === 'horizontal' || orientation === 'both'
        ? activeOverflow
        : 'hidden';
    const overflowY =
      orientation === 'vertical' || orientation === 'both'
        ? activeOverflow
        : 'hidden';

    const resolvedMaxHeight =
      maxHeight !== undefined
        ? typeof maxHeight === 'number'
          ? `${maxHeight}px`
          : maxHeight
        : undefined;

    const resolvedMaxWidth =
      maxWidth !== undefined
        ? typeof maxWidth === 'number'
          ? `${maxWidth}px`
          : maxWidth
        : undefined;

    const containerStyles: React.CSSProperties = {
      overflowX,
      overflowY,
      maxHeight: resolvedMaxHeight,
      maxWidth: resolvedMaxWidth,
      // Scrollbar styling via CSS custom properties with token fallbacks.
      // Note: scrollbar-width is set per-variant via the namespaced class so
      // the variant can control it (inline styles would override the stylesheet).
      scrollbarColor: `${cssVar('semantic', 'border', 'strong')} ${cssVar('semantic', 'background', 'sunken')}`,
      // Smooth scrolling, respecting reduced-motion
      scrollBehavior: 'smooth',
      // Make container focusable for keyboard scrolling
      outline: 'none',
      ...style,
    };

    // Webkit scrollbar styles via a wrapping element with a style tag.
    // We inject styles scoped to a data attribute to avoid global leakage.
    // The base rules apply to every ScrollArea; per-variant rules below adjust
    // the scrollbar treatment and are namespaced under .bbangto-scrollarea-<variant>.
    const variantClass = `bbangto-scrollarea-${variant}`;

    const variantCss: Record<ScrollAreaVariant, string> = {
      // overlay (default): thin overlay scrollbar, gutter auto — baseline behavior.
      overlay: `
.bbangto-scrollarea-overlay {
  scrollbar-width: thin;
  scrollbar-gutter: auto;
}
.bbangto-scrollarea-overlay::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}`,
      // inset: reserve a stable gutter so content width does not jump.
      inset: `
.bbangto-scrollarea-inset {
  scrollbar-width: thin;
  scrollbar-gutter: stable;
}
.bbangto-scrollarea-inset::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}`,
      // always: scrollbars always visible (overflow is forced to scroll above).
      always: `
.bbangto-scrollarea-always {
  scrollbar-width: auto;
  scrollbar-gutter: auto;
}
.bbangto-scrollarea-always::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}`,
      // hover: scrollbar hidden at rest, revealed on hover.
      hover: `
.bbangto-scrollarea-hover {
  scrollbar-width: none;
  scrollbar-gutter: auto;
}
.bbangto-scrollarea-hover::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.bbangto-scrollarea-hover:hover {
  scrollbar-width: thin;
}
.bbangto-scrollarea-hover:hover::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}`,
    };

    const scrollbarCss = `
[data-bbangto-scrollarea]::-webkit-scrollbar-track {
  background: ${cssVar('semantic', 'background', 'sunken')};
  border-radius: ${cssVar('radius', 'full')};
}
[data-bbangto-scrollarea]::-webkit-scrollbar-thumb {
  background: ${cssVar('semantic', 'border', 'strong')};
  border-radius: ${cssVar('radius', 'full')};
}
[data-bbangto-scrollarea]::-webkit-scrollbar-thumb:hover {
  background: ${cssVar('semantic', 'foreground', 'muted')};
}
${variantCss[variant].trim()}
@media (prefers-reduced-motion: reduce) {
  [data-bbangto-scrollarea] {
    scroll-behavior: auto;
  }
}
    `.trim();

    return (
      <>
        <style>{scrollbarCss}</style>
        <div
          ref={ref}
          data-bbangto-scrollarea=""
          data-bbangto-scrollarea-variant={variant}
          className={variantClass}
          tabIndex={0}
          style={containerStyles}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';
