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
export { synthwave01VizStyleGuide } from './synthwave';
export { artdecoLuxe01VizStyleGuide } from './artdecoLuxe';
export { darkluxe01VizStyleGuide } from './darkluxe';
export { organicBlob01VizStyleGuide } from './organicBlob';
export { ukiyoeFlat01VizStyleGuide } from './ukiyoeFlat';
export { pixelRetro01VizStyleGuide } from './pixelRetro';
export { makeVizColorway } from './_foundation';
export type { VizColorwayOverride } from './_foundation';
export { useVizMotifStyle } from './_motif';
export { makeVizShowcase } from './_showcase';
export type { VizShowcaseConfig } from './_showcase';

// 카탈로그 배열과 name 조회 맵은 catalog.ts 에 둔다(KAN-051). 여기서 직접 만들면 배럴 최상위의
// Object.fromEntries 가 모든 preset 을 붙잡아, preset 하나만 가져와도 전부 딸려 온다.
export { vizStyleGuideCatalog, vizStyleGuideMap } from './catalog';

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
