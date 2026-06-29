import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { themeToStyleObject } from '@centurio1987/bbangto-ui-tokens';
import { useMotionKeyframes } from './motion/keyframes';
import type { StyleGuide } from './StyleGuide';

const StyleGuideContext = createContext<StyleGuide | undefined>(undefined);

export interface StyleGuideProviderProps {
  children: ReactNode;
  styleGuide: StyleGuide;
  /** HTML tag for the wrapper. Defaults to 'div'. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

/**
 * Provides a StyleGuide to the component tree.
 * Applies foundations + extendedFoundations as CSS variables,
 * and exposes wrapperComponents / patterns via context.
 */
export function StyleGuideProvider({
  children,
  styleGuide,
  as: Component = 'div',
  className,
  style,
}: StyleGuideProviderProps) {
  const cssVars = useMemo(() => ({
    ...themeToStyleObject(styleGuide.foundations),
    ...(styleGuide.extendedFoundations ?? {}),
  }), [styleGuide]);

  useMotionKeyframes();

  return (
    <StyleGuideContext.Provider value={styleGuide}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
      `}</style>
      <Component
        className={className}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        data-bbangto-style-guide={styleGuide.name}
      >
        {children}
      </Component>
    </StyleGuideContext.Provider>
  );
}

/**
 * Returns the StyleGuide from the nearest StyleGuideProvider.
 * Returns undefined if used outside a provider.
 */
export function useStyleGuide(): StyleGuide | undefined {
  return useContext(StyleGuideContext);
}
