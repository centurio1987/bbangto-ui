import React, { createContext, useContext, useId, useMemo, type ReactNode } from 'react';
import type { VisualizationFoundation } from '../tokens/types';
import { visualizationFoundationToStyleObject } from '../tokens/contract';
import { baseVisualizationFoundation } from '../tokens/base';
import { useVizDefs } from '../provider/defs';
import { useVizContractCss } from '../provider/contractCss';
import type { VisualizationStyleGuide } from './VisualizationStyleGuide';
import { resolveVizFoundationPreset } from './VisualizationStyleGuide';

interface VizContextValue {
  styleGuide: VisualizationStyleGuide;
  foundations: VisualizationFoundation;
  /** SVG <defs> id 충돌 방지용 Provider 인스턴스 고유 prefix (useId 기반). */
  defsPrefix: string;
}

const VizContext = createContext<VizContextValue | undefined>(undefined);

export interface VisualizationStyleGuideProviderProps {
  children: ReactNode;
  styleGuide: VisualizationStyleGuide;
  /**
   * 선택. styleGuide.foundationPresets 중 적용할 색 스킴 key.
   * 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순으로 fallback.
   */
  foundationKey?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * VisualizationStyleGuide를 트리에 제공한다.
 * foundations(+extendedFoundations)를 --bbangto-viz-* CSS 변수로 주입하고,
 * wrapperComponents를 컨텍스트로 노출한다. core StyleGuideProvider의 미러.
 */
export function VisualizationStyleGuideProvider({
  children,
  styleGuide,
  foundationKey,
  as: Component = 'div',
  className,
  style,
}: VisualizationStyleGuideProviderProps) {
  const { foundations, extendedFoundations, activeKey } = resolveVizFoundationPreset(
    styleGuide,
    foundationKey,
  );

  const cssVars = useMemo(
    () => ({
      ...visualizationFoundationToStyleObject(foundations),
      ...extendedFoundations,
    }),
    [foundations, extendedFoundations],
  );

  // useId는 콜론 등 CSS/URL 위험 문자를 포함할 수 있어 안전 문자로 정규화한다.
  const rawId = useId();
  const defsPrefix = useMemo(() => `viz-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`, [rawId]);

  useVizDefs();
  useVizContractCss();

  const ctx = useMemo(
    () => ({ styleGuide, foundations, defsPrefix }),
    [styleGuide, foundations, defsPrefix],
  );

  return (
    <VizContext.Provider value={ctx}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');`}</style>
      <Component
        className={className}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        data-bbangto-viz-style-guide={styleGuide.name}
        data-bbangto-viz-foundation={activeKey}
      >
        {children}
      </Component>
    </VizContext.Provider>
  );
}

/** 가장 가까운 Provider의 VisualizationStyleGuide. Provider 밖이면 undefined. */
export function useVisualizationStyleGuide(): VisualizationStyleGuide | undefined {
  return useContext(VizContext)?.styleGuide;
}

/**
 * 활성 visualization foundation. Provider 밖이면 무채색 base로 폴백한다.
 * (구 useDiagramTheme 대체 — 기하 계산 등 값이 필요한 컴포넌트용.)
 */
export function useVizFoundation(): VisualizationFoundation {
  return useContext(VizContext)?.foundations ?? baseVisualizationFoundation;
}

/**
 * SVG <defs> id에 붙일 Provider 고유 prefix.
 * 다중 Provider 공존 시 마커/그라디언트 id 충돌을 막는다. Provider 밖이면 'viz'.
 */
export function useVizDefsPrefix(): string {
  return useContext(VizContext)?.defsPrefix ?? 'viz';
}

/**
 * headless 원형 컴포넌트를 style guide의 wrapper로 resolve 한다.
 * wrapper 미정의 시(혹은 Provider 밖이면) fallback(원형)을 그대로 반환한다.
 */
export function useVizWrapperComponent<P>(
  name: string,
  fallback: React.ComponentType<P>,
): React.ComponentType<P> {
  const sg = useContext(VizContext)?.styleGuide;
  const wrapper = sg?.wrapperComponents?.[name];
  return (wrapper as React.ComponentType<P> | undefined) ?? fallback;
}
