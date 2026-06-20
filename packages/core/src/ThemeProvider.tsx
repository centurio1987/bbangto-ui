import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import {
  BbangtoTheme,
  themeToStyleObject,
  mergeTheme,
  ThemeOverride,
} from '@bbangto-ui/tokens';
import { lightTheme } from '@bbangto-ui/theme-light';

interface ThemeContextValue {
  theme: BbangtoTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Custom theme object. Defaults to the light theme. */
  theme?: BbangtoTheme;
  /** Partial theme overrides applied on top of the base theme. */
  overrides?: ThemeOverride;
  /** HTML tag for the theme wrapper. Defaults to 'div'. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

/**
 * Provides the Bbangto UI theme to the component tree and applies CSS variables.
 */
export function ThemeProvider({
  children,
  theme = lightTheme,
  overrides,
  as: Component = 'div',
  className,
  style,
}: ThemeProviderProps) {
  const mergedTheme = useMemo(() => {
    return overrides ? mergeTheme(theme, overrides) : theme;
  }, [theme, overrides]);

  const cssVars = useMemo(() => {
    return themeToStyleObject(mergedTheme);
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
      `}</style>
      <Component
        className={className}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        data-bbangto-theme={mergedTheme.name}
      >
        {children}
      </Component>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current Bbangto UI theme from the nearest ThemeProvider.
 */
export function useTheme(): BbangtoTheme {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default theme if used outside provider, though wrapping is recommended.
    return lightTheme;
  }
  return context.theme;
}
