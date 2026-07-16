import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
import { minimalLine01VizStyleGuide } from './minimalLine';
import { colorfulFlat01VizStyleGuide } from './colorfulFlat';
import { inkLineDuotone01VizStyleGuide } from './inkLineDuotone';
import { corporateSchematic01VizStyleGuide } from './corporateSchematic';
import { neonGradientDark01VizStyleGuide } from './neonGradientDark';

export { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
export { minimalLine01VizStyleGuide } from './minimalLine';
export { colorfulFlat01VizStyleGuide } from './colorfulFlat';
export { inkLineDuotone01VizStyleGuide } from './inkLineDuotone';
export { corporateSchematic01VizStyleGuide } from './corporateSchematic';
export { neonGradientDark01VizStyleGuide } from './neonGradientDark';
export { makeVizColorway } from './_foundation';
export type { VizColorwayOverride } from './_foundation';
export { useVizMotifStyle } from './_motif';
export { makeVizShowcase } from './_showcase';
export type { VizShowcaseConfig } from './_showcase';

/** 카탈로그 단일 출처 — 표시 순서 그대로. */
export const vizStyleGuideCatalog: readonly VisualizationStyleGuide[] = [
  blueprintTechnical01VizStyleGuide,
  minimalLine01VizStyleGuide,
  colorfulFlat01VizStyleGuide,
  inkLineDuotone01VizStyleGuide,
  corporateSchematic01VizStyleGuide,
  neonGradientDark01VizStyleGuide,
];

/** slug(name) → style guide 조회 맵. */
export const vizStyleGuideMap: Record<string, VisualizationStyleGuide> = Object.fromEntries(
  vizStyleGuideCatalog.map((sg) => [sg.name, sg]),
);

// 채택 메타데이터 매니페스트 생성기 (catalog.manifest.json으로 투영). UI 동형 생성기 국소 복제.
export {
  buildManifest,
  serializeManifest,
  type ManifestEntry,
  type ManifestCompleteness,
  type CatalogEntryLike,
} from './manifest';
