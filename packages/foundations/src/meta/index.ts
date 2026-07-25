/**
 * foundation(색 스킴 base) 축 채택 메타데이터 인프라 배럴 (KAN-035).
 *
 * 서브패스 `@centurio1987/bbangto-ui-foundations/meta`로 노출된다(루트 배럴 미오염 → 토큰 소비자 번들에
 * registry가 딸려오지 않음). AI 소비자는 여기서 `selectFoundations`·`foundationMetaRegistry`를 import하거나
 * 커밋된 `foundation.manifest.json`을 파일로 읽는다. 전략은 패키지 루트 FOUNDATION_METADATA_STRATEGY.md 참고.
 */
export type {
  FoundationMeta,
  FoundationColorScheme,
  FoundationAccessibility,
} from '@centurio1987/bbangto-ui-tokens';

export { foundationMetaRegistry } from './registry';

export type {
  FoundationManifestEntry,
  FoundationCatalogEntry,
} from './manifest';
export {
  buildFoundationManifest,
  serializeFoundationManifest,
  buildCatalogList,
  serializeCatalogList,
  deriveColorScheme,
  slugToLabel,
} from './manifest';

export type {
  FoundationSelectionCriteria,
  FoundationSelectionResult,
  FoundationCriterionWeights,
} from './select';
export { selectFoundations, DEFAULT_FOUNDATION_WEIGHTS } from './select';
