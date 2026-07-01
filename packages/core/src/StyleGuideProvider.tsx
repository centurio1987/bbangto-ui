import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { foundationToStyleObject } from '@centurio1987/bbangto-ui-tokens';
import { useMotionKeyframes } from './motion/keyframes';
import type { StyleGuide } from './StyleGuide';
import { resolveFoundationPreset } from './StyleGuide';

const StyleGuideContext = createContext<StyleGuide | undefined>(undefined);

export interface StyleGuideProviderProps {
  children: ReactNode;
  styleGuide: StyleGuide;
  /**
   * 선택. styleGuide.foundationPresets 중 적용할 색 스킴 key.
   * 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순으로 fallback.
   */
  foundationKey?: string;
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
  foundationKey,
  as: Component = 'div',
  className,
  style,
}: StyleGuideProviderProps) {
  const { foundations, extendedFoundations, activeKey } = resolveFoundationPreset(styleGuide, foundationKey);

  const cssVars = useMemo(() => ({
    ...foundationToStyleObject(foundations),
    ...extendedFoundations,
  }), [foundations, extendedFoundations]);

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
        data-bbangto-foundation={activeKey}
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

type WrapperKind = 'wrapperComponents' | 'wrapperBlocks' | 'wrapperPatterns';

/**
 * 현재 StyleGuide에서 주어진 wrapper 종류/이름의 wrapping 컴포넌트를 찾아 반환한다.
 * 정의돼 있으면 wrapper를, 없으면(혹은 provider 밖이면) fallback(원형)을 반환한다.
 */
function resolveWrapper<P>(
  styleGuide: StyleGuide | undefined,
  kind: WrapperKind,
  name: string,
  fallback: React.ComponentType<P>,
): React.ComponentType<P> {
  const wrapper = styleGuide?.[kind]?.[name];
  return (wrapper as React.ComponentType<P> | undefined) ?? fallback;
}

/**
 * 원형 atom 컴포넌트를 style guide의 wrapper로 resolve 한다.
 * wrapper 미정의 시 `fallback`(원형 컴포넌트)을 그대로 반환한다.
 */
export function useWrapperComponent<P>(
  name: string,
  fallback: React.ComponentType<P>,
): React.ComponentType<P> {
  return resolveWrapper(useContext(StyleGuideContext), 'wrapperComponents', name, fallback);
}

/**
 * 원형 block("한 섹션" 단위)을 style guide의 wrapper로 resolve 한다.
 * wrapper 미정의 시 `fallback`(원형 block)을 그대로 반환한다.
 */
export function useWrapperBlock<P>(
  name: string,
  fallback: React.ComponentType<P>,
): React.ComponentType<P> {
  return resolveWrapper(useContext(StyleGuideContext), 'wrapperBlocks', name, fallback);
}

/**
 * 원형 pattern("한 화면/플로우" 단위)을 style guide의 wrapper로 resolve 한다.
 * wrapper 미정의 시 `fallback`(원형 pattern)을 그대로 반환한다.
 */
export function useWrapperPattern<P>(
  name: string,
  fallback: React.ComponentType<P>,
): React.ComponentType<P> {
  return resolveWrapper(useContext(StyleGuideContext), 'wrapperPatterns', name, fallback);
}
