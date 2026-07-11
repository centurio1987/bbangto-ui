import type React from 'react';
import type {
  VisualizationFoundation,
  VisualizationStyleGuideTokens,
} from '@centurio1987/bbangto-ui-tokens';

/** 원형(headless) 시각화 컴포넌트를 감싸는 wrapper component 맵. 키: 컴포넌트 이름 (e.g. "Node"). */
export type VizWrapperComponents = Record<string, React.ComponentType<any>>;

/** 여러 시각화 컴포넌트를 조합한 패턴/쇼케이스 맵. 키: 패턴 이름. */
export type VizPatterns = Record<string, React.ComponentType<any>>;

/**
 * 대표 컴포넌트 하나에 visual motif가 어떻게 적용되는지에 대한 스펙 설명.
 * core StyleGuide의 VisualMotifComponentSpec과 동형(로컬 재선언 — core 비의존 유지).
 */
export interface VizVisualMotifComponentSpec {
  readonly description: string;
  readonly specs: readonly string[];
}

/** Visual Motif — 스타일 가이드의 시각 문법 문서 + 구현 예시. core VisualMotif와 동형. */
export interface VizVisualMotif {
  readonly summary: string;
  readonly components: Record<string, VizVisualMotifComponentSpec>;
  readonly example?: React.ComponentType<any>;
}

/**
 * VisualizationStyleGuide 전체 인터페이스.
 * VisualizationStyleGuideTokens(프레임워크 독립)를 확장해 React 의존 레이어를 추가한다.
 * core의 StyleGuide와 구조 미러 — 단 wrapper 대상이 headless 시각화 컴포넌트다.
 */
export interface VisualizationStyleGuide extends VisualizationStyleGuideTokens {
  /** 선택. headless 원형(Node/Tag/EdgeLabel/Boundary 등)을 감싸 motif를 적용한 wrapper 맵. */
  readonly wrapperComponents?: VizWrapperComponents;
  /** 선택. 조립된 패턴/쇼케이스 맵. */
  readonly patterns?: VizPatterns;
  /** 선택. 시각 문법(visual motif) 문서 — 컴포넌트별 스펙 + 구현 예시. */
  readonly visualMotif?: VizVisualMotif;
}

/** 안정 참조 — 매 렌더 새 객체 생성으로 인한 useMemo 무효화 방지. */
const EMPTY_EXT: Record<string, string> = {};

/**
 * VisualizationStyleGuide + 선택한 foundationKey로부터 활성 색 스킴을 해석한다.
 * core의 resolveFoundationPreset과 동일 규칙(Provider와 Storybook이 공유하는 순수함수).
 *
 * - foundationPresets가 없으면 base foundations/extendedFoundations 사용.
 * - 잘못된 key는 dev 모드에서 console.warn 후 기본 preset으로 fallback.
 * - 활성 preset의 ext만 사용한다(base ext와 섞지 않음).
 */
export function resolveVizFoundationPreset(
  sg: VisualizationStyleGuideTokens,
  key?: string,
): {
  foundations: VisualizationFoundation;
  extendedFoundations: Record<string, string>;
  activeKey?: string;
} {
  const presets = sg.foundationPresets;
  if (!presets?.length) {
    return { foundations: sg.foundations, extendedFoundations: sg.extendedFoundations ?? EMPTY_EXT };
  }
  const found = key != null ? presets.find((p) => p.key === key) : undefined;
  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (key != null && !found && nodeEnv !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(`[bbangto] unknown viz foundationKey "${key}" on "${sg.name}"; using default.`);
  }
  const active = found ?? presets.find((p) => p.key === sg.defaultFoundationKey) ?? presets[0];
  return {
    foundations: active.foundations,
    extendedFoundations: active.extendedFoundations ?? EMPTY_EXT,
    activeKey: active.key,
  };
}
