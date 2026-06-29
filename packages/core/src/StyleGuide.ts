import type React from 'react';
import type { BbangtoTheme, StyleGuideTokens } from '@centurio1987/bbangto-ui-tokens';

/** 원형 컴포넌트를 감싸는 wrapper component 맵. 키: 컴포넌트 이름 (e.g. "Button"). */
export type WrapperComponents = Record<string, React.ComponentType<any>>;

/** 여러 컴포넌트를 조합한 패턴 레이아웃 맵. 키: 패턴 이름 (e.g. "LoginForm"). */
export type Patterns = Record<string, React.ComponentType<any>>;

/** 대표 컴포넌트 하나에 visual motif가 어떻게 적용되는지에 대한 스펙 설명. */
export interface VisualMotifComponentSpec {
  /** 자연어 설명 — 이 컴포넌트에서 모티프가 만드는 인상. */
  readonly description: string;
  /** 구체 규칙 목록 (테두리/모서리/그림자/상태 등). */
  readonly specs: readonly string[];
}

/**
 * Visual Motif — 스타일 가이드의 시각 문법을 문서화하는 요소.
 * Patterns(개별 재사용 섹션)와 달리, "이 모티프가 대표 컴포넌트에 어떻게 적용되는가"의
 * 스펙 설명과, 그 스펙이 적용된 구현 예시 하나를 한데 묶는다.
 */
export interface VisualMotif {
  /** 모티프 전반 요약. */
  readonly summary: string;
  /** 대표 컴포넌트(Button/Card/Tag 등)별 모티프 스펙. 키: 컴포넌트 이름. */
  readonly components: Record<string, VisualMotifComponentSpec>;
  /** 선택. 스펙이 적용된 전체 구현 예시(조립된 레이아웃). */
  readonly example?: React.ComponentType<any>;
}

/**
 * StyleGuide 전체 인터페이스.
 * StyleGuideTokens(프레임워크 독립)를 확장해 React 의존 레이어를 추가한다.
 */
export interface StyleGuide extends StyleGuideTokens {
  /** 선택. 원형 atom 컴포넌트(Button/Card/Tag 등)를 감싸 visual motif를 적용한 wrapper 맵. */
  readonly wrapperComponents?: WrapperComponents;
  /**
   * 선택. 원형 block(Hero/FeatureGrid 등 "한 섹션" 단위)을 감싸 visual motif를
   * 적용한 wrapper 맵. 키: block 이름. `useWrapperBlock`으로 resolve 한다.
   */
  readonly wrapperBlocks?: WrapperComponents;
  /**
   * 선택. 원형 pattern(SignIn/AIChat 등 "한 화면/플로우" 단위)을 감싸 visual
   * motif를 적용한 wrapper 맵. 키: pattern 이름. `useWrapperPattern`으로 resolve 한다.
   */
  readonly wrapperPatterns?: WrapperComponents;
  /** 선택. 반복 사용되는 UI 조합(폼, 테이블 등)을 조립한 패턴 레이아웃 맵(쇼케이스). */
  readonly patterns?: Patterns;
  /** 선택. 시각 문법(visual motif) 문서 — 컴포넌트별 스펙 + 구현 예시. */
  readonly visualMotif?: VisualMotif;
}

/**
 * BbangtoTheme을 foundations-only StyleGuide로 변환하는 헬퍼.
 * 기존 테마를 StyleGuide 체계로 마이그레이션할 때 사용한다.
 */
export function themeToStyleGuide(theme: BbangtoTheme): StyleGuide {
  return {
    name: theme.name,
    description: theme.description,
    foundations: theme,
  };
}
