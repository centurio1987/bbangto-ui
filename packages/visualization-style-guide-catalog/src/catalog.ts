/**
 * catalog.ts — viz style guide 카탈로그 배열과 slug 조회 맵 (KAN-051 에서 index.ts 로부터 옮김).
 *
 * 배럴(index.ts) 최상위에서 이 둘을 만들면 `Object.fromEntries(...)` 가 모든 preset 을 붙잡아,
 * 빌드를 파일 단위로 내도 preset 하나만 가져오면 전부 딸려 온다. 이 파일로 떼어 두면 카탈로그를
 * 쓰지 않는 소비자 번들에서는 이 파일이 통째로 빠진다. 크기 상한은 루트 bundle-budget.json 이 지킨다.
 */
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
import { synthwave01VizStyleGuide } from './synthwave';
import { artdecoLuxe01VizStyleGuide } from './artdecoLuxe';
import { darkluxe01VizStyleGuide } from './darkluxe';
import { organicBlob01VizStyleGuide } from './organicBlob';
import { ukiyoeFlat01VizStyleGuide } from './ukiyoeFlat';
import { pixelRetro01VizStyleGuide } from './pixelRetro';

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
  synthwave01VizStyleGuide,
  artdecoLuxe01VizStyleGuide,
  darkluxe01VizStyleGuide,
  organicBlob01VizStyleGuide,
  ukiyoeFlat01VizStyleGuide,
  pixelRetro01VizStyleGuide,
];

/** slug(name) → style guide 조회 맵. */
export const vizStyleGuideMap: Record<string, VisualizationStyleGuide> = Object.fromEntries(
  vizStyleGuideCatalog.map((sg) => [sg.name, sg]),
);
