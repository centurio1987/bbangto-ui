/**
 * 유형(what) 축 채택 메타데이터 인프라 배럴 (KAN-020).
 *
 * 서브패스 `@centurio1987/bbangto-ui-visualization/type-meta`로 노출된다(루트 배럴 미오염 → 컴포넌트
 * 소비자 번들 무영향). AI 소비자는 여기서 `selectVizTypes`·`vizTypeRegistry`를 import하거나, 색인
 * `type.manifest.json`으로 후보를 좁히고 상세 `manifest/<id>.json`을 파일로 읽는다. 고르는 법은 패키지
 * README, 설계는 저장소 문서
 * https://github.com/centurio1987/bbangto-ui/blob/main/packages/visualization/TYPE_METADATA_STRATEGY.md (npm 배포물에는 없다).
 */
export type {
  VizTypeMeta,
  VizTypeRegistryEntry,
  VizTypeCategory,
  VizDataShape,
  VizPrimitive,
  VizTypeTag,
  VizStructuralTrait,
  VizTypeVariant,
} from './types';
export {
  VIZ_TYPE_CATEGORIES,
  VIZ_TYPE_CATEGORY_LABELS,
  VIZ_DATA_SHAPES,
  VIZ_PRIMITIVES,
  VIZ_TYPE_TAGS,
  VIZ_STRUCTURAL_TRAITS,
  VIZ_STRUCTURAL_TRAIT_LABELS,
} from './types';

export { vizTypeRegistry } from './registry';

export {
  vizTypesForExport,
  defaultVizTypeForExport,
  vizTypeForVariant,
} from './lookup';

export type {
  VizTypeManifestEntry,
  VizTypeManifestCompleteness,
} from './manifest';
export { buildTypeManifest, serializeTypeManifest } from './manifest';

export type {
  VizTypeSelectionCriteria,
  VizTypeSelectionResult,
  VizCriterionWeights,
  VizTypeMatchMode,
} from './select';
export { selectVizTypes, DEFAULT_VIZ_WEIGHTS } from './select';
