/**
 * 유형(what) 축 채택 메타데이터 인프라 배럴 (KAN-020).
 *
 * 서브패스 `@centurio1987/bbangto-ui-visualization/type-meta`로 노출된다(루트 배럴 미오염 → 컴포넌트
 * 소비자 번들 무영향). AI 소비자는 여기서 `selectVizTypes`·`vizTypeRegistry`를 import하거나 커밋된
 * `type.manifest.json`을 파일로 읽는다. 전략은 패키지 루트 TYPE_METADATA_STRATEGY.md 참고.
 */
export type {
  VizTypeMeta,
  VizTypeRegistryEntry,
  VizTypeCategory,
  VizDataShape,
  VizPrimitive,
  VizTypeTag,
} from './types';
export {
  VIZ_TYPE_CATEGORIES,
  VIZ_TYPE_CATEGORY_LABELS,
  VIZ_DATA_SHAPES,
  VIZ_PRIMITIVES,
  VIZ_TYPE_TAGS,
} from './types';

export { vizTypeRegistry } from './registry';

export type {
  VizTypeManifestEntry,
  VizTypeManifestCompleteness,
} from './manifest';
export { buildTypeManifest, serializeTypeManifest } from './manifest';

export type {
  VizTypeSelectionCriteria,
  VizTypeSelectionResult,
  VizCriterionWeights,
} from './select';
export { selectVizTypes, DEFAULT_VIZ_WEIGHTS } from './select';
