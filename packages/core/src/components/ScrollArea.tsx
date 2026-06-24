import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ScrollAreaOrientation;
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      orientation = 'vertical',
      maxHeight,
      maxWidth,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const overflowX =
      orientation === 'horizontal' || orientation === 'both' ? 'auto' : 'hidden';
    const overflowY =
      orientation === 'vertical' || orientation === 'both' ? 'auto' : 'hidden';

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
      // Scrollbar styling via CSS custom properties with token fallbacks
      scrollbarWidth: 'thin',
      scrollbarColor: `${cssVar('semantic', 'border', 'strong')} ${cssVar('semantic', 'background', 'sunken')}`,
      // Smooth scrolling, respecting reduced-motion
      scrollBehavior: 'smooth',
      // Make container focusable for keyboard scrolling
      outline: 'none',
      ...style,
    };

    // Webkit scrollbar styles via a wrapping element with a style tag
    // We inject styles scoped to a data attribute to avoid global leakage.
    const scrollbarCss = `
[data-bbangto-scrollarea]::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
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
