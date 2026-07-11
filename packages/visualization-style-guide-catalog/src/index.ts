import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
import { minimalLine01VizStyleGuide } from './minimalLine';
import { colorfulFlat01VizStyleGuide } from './colorfulFlat';

export { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
export { minimalLine01VizStyleGuide } from './minimalLine';
export { colorfulFlat01VizStyleGuide } from './colorfulFlat';
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
];

/** slug(name) → style guide 조회 맵. */
export const vizStyleGuideMap: Record<string, VisualizationStyleGuide> = Object.fromEntries(
  vizStyleGuideCatalog.map((sg) => [sg.name, sg]),
);
