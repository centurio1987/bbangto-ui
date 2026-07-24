import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
import { minimalLine01VizStyleGuide } from './minimalLine';
import { colorfulFlat01VizStyleGuide } from './colorfulFlat';
import { inkLineDuotone01VizStyleGuide } from './inkLineDuotone';
import { corporateSchematic01VizStyleGuide } from './corporateSchematic';
import { neonGradientDark01VizStyleGuide } from './neonGradientDark';
import { markerSketchnote01VizStyleGuide } from './markerSketchnote';
import { isoColorBlock01VizStyleGuide } from './isoColorBlock';
import { swissSystematic01VizStyleGuide } from './swissSystematic';
import { terminalAscii01VizStyleGuide } from './terminalAscii';
import { bauhausGeometric01VizStyleGuide } from './bauhausGeometric';
import { risoPrint01VizStyleGuide } from './risoPrint';
import { hudTelemetry01VizStyleGuide } from './hudTelemetry';
import { halftonePrint01VizStyleGuide } from './halftonePrint';
import { glitchDuotone01VizStyleGuide } from './glitchDuotone';
import { neumorphicSoft01VizStyleGuide } from './neumorphicSoft';
import { clayPlayful01VizStyleGuide } from './clayPlayful';
import { kawaiiPastel01VizStyleGuide } from './kawaiiPastel';
import { neobrutalist01VizStyleGuide } from './neobrutalist';
import { editorialData01VizStyleGuide } from './editorialData';
import { memphisPattern01VizStyleGuide } from './memphisPattern';
import { retro70sWarm01VizStyleGuide } from './retro70sWarm';
import { dopamineMax01VizStyleGuide } from './dopamineMax';
import { bentoStat01VizStyleGuide } from './bentoStat';

export { blueprintTechnical01VizStyleGuide } from './blueprintTechnical';
export { minimalLine01VizStyleGuide } from './minimalLine';
export { colorfulFlat01VizStyleGuide } from './colorfulFlat';
export { inkLineDuotone01VizStyleGuide } from './inkLineDuotone';
export { corporateSchematic01VizStyleGuide } from './corporateSchematic';
export { neonGradientDark01VizStyleGuide } from './neonGradientDark';
export { markerSketchnote01VizStyleGuide } from './markerSketchnote';
export { isoColorBlock01VizStyleGuide } from './isoColorBlock';
export { swissSystematic01VizStyleGuide } from './swissSystematic';
export { terminalAscii01VizStyleGuide } from './terminalAscii';
export { bauhausGeometric01VizStyleGuide } from './bauhausGeometric';
export { risoPrint01VizStyleGuide } from './risoPrint';
export { hudTelemetry01VizStyleGuide } from './hudTelemetry';
export { halftonePrint01VizStyleGuide } from './halftonePrint';
export { glitchDuotone01VizStyleGuide } from './glitchDuotone';
export { neumorphicSoft01VizStyleGuide } from './neumorphicSoft';
export { clayPlayful01VizStyleGuide } from './clayPlayful';
export { kawaiiPastel01VizStyleGuide } from './kawaiiPastel';
export { neobrutalist01VizStyleGuide } from './neobrutalist';
export { editorialData01VizStyleGuide } from './editorialData';
export { memphisPattern01VizStyleGuide } from './memphisPattern';
export { retro70sWarm01VizStyleGuide } from './retro70sWarm';
export { dopamineMax01VizStyleGuide } from './dopamineMax';
export { bentoStat01VizStyleGuide } from './bentoStat';
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
  markerSketchnote01VizStyleGuide,
  isoColorBlock01VizStyleGuide,
  swissSystematic01VizStyleGuide,
  terminalAscii01VizStyleGuide,
  bauhausGeometric01VizStyleGuide,
  risoPrint01VizStyleGuide,
  hudTelemetry01VizStyleGuide,
  halftonePrint01VizStyleGuide,
  glitchDuotone01VizStyleGuide,
  neumorphicSoft01VizStyleGuide,
  clayPlayful01VizStyleGuide,
  kawaiiPastel01VizStyleGuide,
  neobrutalist01VizStyleGuide,
  editorialData01VizStyleGuide,
  memphisPattern01VizStyleGuide,
  retro70sWarm01VizStyleGuide,
  dopamineMax01VizStyleGuide,
  bentoStat01VizStyleGuide,
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

// 채택 스코어링 helper (UI 동형 국소 복제, parity 테스트가 drift 가드).
export {
  selectStyleGuides,
  DEFAULT_WEIGHTS,
  type StyleSelectionCriteria,
  type SelectionResult,
  type MoodConstraint,
  type SelectableEntry,
  type CriterionWeights,
} from './select';

// 팔레트 실측 WCAG 대비 over-claim 감사 (viz 스키마판; 순수 WCAG 수학은 tokens에서 공유). KAN-026.
export {
  auditVizContrast,
  formatVizViolations,
  type VizContrastViolation,
  type AuditableVizEntry,
} from './accessibilityAudit';
