import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { DiagramTheme } from '../tokens/types';
import { diagramThemeToStyleObject } from '../tokens/contract';
import { blueprintTheme } from '../tokens/blueprint';
import { useDiagramDefs } from './defs';

interface DiagramContextValue {
  theme: DiagramTheme;
}

const DiagramContext = createContext<DiagramContextValue | undefined>(undefined);

export interface DiagramProviderProps {
  children: ReactNode;
  theme?: DiagramTheme;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export function DiagramProvider({
  children,
  theme = blueprintTheme,
  as: Component = 'div',
  className,
  style,
}: DiagramProviderProps) {
  const cssVars = useMemo(() => diagramThemeToStyleObject(theme), [theme]);

  useDiagramDefs();

  return (
    <DiagramContext.Provider value={{ theme }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');`}</style>
      <Component
        className={className}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        data-bbangto-diagram-theme={theme.name}
      >
        {children}
      </Component>
    </DiagramContext.Provider>
  );
}

export function useDiagramTheme(): DiagramTheme {
  const ctx = useContext(DiagramContext);
  return ctx?.theme ?? blueprintTheme;
}
