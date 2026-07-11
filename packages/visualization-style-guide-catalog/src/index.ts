import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';

export { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';

/** 카탈로그 단일 출처 — 표시 순서 그대로. */
export const vizStyleGuideCatalog: readonly VisualizationStyleGuide[] = [
  blueprintTechnical01VizStyleGuide,
];

/** slug(name) → style guide 조회 맵. */
export const vizStyleGuideMap: Record<string, VisualizationStyleGuide> = Object.fromEntries(
  vizStyleGuideCatalog.map((sg) => [sg.name, sg]),
);
