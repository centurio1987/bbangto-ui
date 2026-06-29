import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import {
  BbangtoFoundation,
  foundationToStyleObject,
  mergeFoundation,
  FoundationOverride,
} from '@centurio1987/bbangto-ui-tokens';
import { lightTheme } from '@centurio1987/bbangto-ui-themes';
import { useMotionKeyframes } from './motion/keyframes';

interface FoundationContextValue {
  foundation: BbangtoFoundation;
}

const FoundationContext = createContext<FoundationContextValue | undefined>(undefined);

export interface FoundationProviderProps {
  children: ReactNode;
  /** Custom foundation object. Defaults to the light foundation. */
  foundation?: BbangtoFoundation;
  /** Partial foundation overrides applied on top of the base foundation. */
  overrides?: FoundationOverride;
  /** HTML tag for the foundation wrapper. Defaults to 'div'. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

/**
 * Provides the Bbangto UI foundation to the component tree and applies CSS variables.
 */
export function FoundationProvider({
  children,
  foundation = lightTheme,
  overrides,
  as: Component = 'div',
  className,
  style,
}: FoundationProviderProps) {
  const mergedFoundation = useMemo(() => {
    return overrides ? mergeFoundation(foundation, overrides) : foundation;
  }, [foundation, overrides]);

  const cssVars = useMemo(() => {
    return foundationToStyleObject(mergedFoundation);
  }, [mergedFoundation]);

  // Inject motion keyframes + prefers-reduced-motion reset once per document.
  useMotionKeyframes();

  return (
    <FoundationContext.Provider value={{ foundation: mergedFoundation }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
      `}</style>
      <Component
        className={className}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        data-bbangto-foundation={mergedFoundation.name}
      >
        {children}
      </Component>
    </FoundationContext.Provider>
  );
}

/**
 * Hook to access the current Bbangto UI foundation from the nearest FoundationProvider.
 */
export function useFoundation(): BbangtoFoundation {
  const context = useContext(FoundationContext);
  if (context === undefined) {
    // Return default foundation if used outside provider, though wrapping is recommended.
    return lightTheme;
  }
  return context.foundation;
}
