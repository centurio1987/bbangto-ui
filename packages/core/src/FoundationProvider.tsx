import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import {
  BbangtoFoundation,
  foundationToStyleObject,
  mergeFoundation,
  FoundationOverride,
} from '@centurio1987/bbangto-ui-tokens';
import { lightFoundation } from './foundations';
import { useMotionKeyframes } from './motion/keyframes';
import { useExternalFonts, type ExternalFontsMode } from './internal/ExternalFonts';

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
  /**
   * External web fonts (Pretendard, JetBrains Mono). Defaults to `'external'`.
   * `'none'` stops this Provider from requesting them — load the fonts yourself (self-hosting, strict CSP).
   * Injection is shared by the whole document: for zero CDN requests every Provider must use `'none'`.
   * Each font is injected into `document.head` once, however many Providers are nested.
   */
  fonts?: ExternalFontsMode;
}

/**
 * Provides the Bbangto UI foundation to the component tree and applies CSS variables.
 */
export function FoundationProvider({
  children,
  foundation = lightFoundation,
  overrides,
  as: Component = 'div',
  className,
  style,
  fonts = 'external',
}: FoundationProviderProps) {
  const mergedFoundation = useMemo(() => {
    return overrides ? mergeFoundation(foundation, overrides) : foundation;
  }, [foundation, overrides]);

  const cssVars = useMemo(() => {
    return foundationToStyleObject(mergedFoundation);
  }, [mergedFoundation]);

  // Inject motion keyframes + prefers-reduced-motion reset once per document.
  useMotionKeyframes();
  useExternalFonts(fonts);

  return (
    <FoundationContext.Provider value={{ foundation: mergedFoundation }}>
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
    return lightFoundation;
  }
  return context.foundation;
}
