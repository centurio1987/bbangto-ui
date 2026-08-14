/**
 * `@centurio1987/bbangto-ui-visualization` — headless 시각화 디자인 시스템(다이어그램 / 인포그래픽).
 *
 * **이 배럴이 내보내는 컴포넌트는 87종의 시각화 "유형" 중 하나씩이다.** 이름만 보고 고르지 말 것 —
 * 유형마다 언제 쓰고 언제 피해야 하는지가 저작돼 있고, 각 컴포넌트 선언 위 JSDoc(`@vizType`/`@useWhen`/
 * `@avoidWhen`)에 그 근거가 붙어 있다. 정본과 프로그래밍 질의는 아래 두 경로다.
 *
 * ```ts
 * // 1) 코드로 고르기 — 서브패스 export(이 배럴을 오염시키지 않는다)
 * import { selectVizTypes, vizTypeRegistry } from '@centurio1987/bbangto-ui-visualization/type-meta';
 *
 * selectVizTypes(vizTypeRegistry, {
 *   dataShape: ['process'],            // 가진 데이터가 무엇인가
 *   structuralTraits: ['branching'],   // 그 데이터의 구조가 무엇인가(분기·순환·계층 …)
 *   match: 'all',                      // 지정한 축을 전부 만족하는 것만. 비면 "그런 유형은 없다"가 답이다
 * });
 * ```
 *
 * ```jsonc
 * // 2) 파일로 읽기 — 87 엔트리 매니페스트(패키지에 동봉)
 * // node_modules/@centurio1987/bbangto-ui-visualization/type.manifest.json
 * ```
 *
 * **고르는 순서**: `dataShape`+`structuralTraits`로 후보를 좁히고 → 각 후보의 `useWhen`/`avoidWhen`으로 확정한다.
 * 컴포넌트 이름 하나가 여러 유형을 겸하기도 한다(`Statistics`·`Cycle`·`Hierarchy`) — 그때는
 * `defaultVizTypeForExport`/`vizTypeForVariant`로 **자기가 받을 그림의** 유형을 확인한다.
 *
 * 전체 문서는 패키지 루트 `README.md`, 유형 축 설계는 `TYPE_METADATA_STRATEGY.md`에 있다.
 */
export type { VisualizationFoundation, NodeSemanticKind, NodeSemanticStyle } from './tokens/types';
export {
  vvar,
  visualizationFoundationToStyleObject,
  baseVisualizationFoundation,
  resolveLabelFont,
  hasNonAsciiScript,
} from './tokens';
export type {
  VisualizationStyleGuide,
  VizWrapperComponents,
  VizPatterns,
  VizVisualMotif,
  VizVisualMotifComponentSpec,
} from './styleGuide/VisualizationStyleGuide';
export { resolveVizFoundationPreset } from './styleGuide/VisualizationStyleGuide';
export {
  VisualizationStyleGuideProvider,
  useVisualizationStyleGuide,
  useVizFoundation,
  useVizDefsPrefix,
  useVizWrapperComponent,
} from './styleGuide/VisualizationStyleGuideProvider';
export type { VisualizationStyleGuideProviderProps } from './styleGuide/VisualizationStyleGuideProvider';
export { CanvasContext, useCanvasContext } from './context/CanvasContext';
export type { CanvasContextValue } from './context/CanvasContext';
export type { BBox, NodeSpec, EdgeSpec } from './types/data';
export * from './geometry';
export * from './atoms';
export * from './molecules';
export * from './templates';
export * from './patterns';
