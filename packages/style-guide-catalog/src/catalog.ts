/**
 * catalog.ts — style guide 카탈로그 배열과 name 조회 맵 (KAN-051 에서 index.ts 로부터 옮김).
 *
 * 배럴(index.ts) 최상위에서 이 둘을 만들면 `Object.fromEntries(...)` 가 모든 preset 을 붙잡아,
 * 빌드를 파일 단위로 내도 preset 하나만 가져오면 전부 딸려 온다. 이 파일로 떼어 두면 카탈로그를
 * 쓰지 않는 소비자 번들에서는 이 파일이 통째로 빠진다. 크기 상한은 루트 bundle-budget.json 이 지킨다.
 */
import type { StyleGuide } from '@centurio1987/bbangto-ui-core';

import { neobrutalismEditorialStyleGuide } from './neobrutalismEditorial';
import { glassmorphismAuroraStyleGuide } from './glassmorphismAurora';
import { neumorphismSoftStyleGuide } from './neumorphismSoft';
import { flatMaterialStyleGuide } from './flatMaterial';
import { minimalSaasStyleGuide } from './minimalSaas';
import { swissInternationalStyleGuide } from './swissInternational';
import { terminalMonoStyleGuide } from './terminalMono';
import { claymorphismPlayfulStyleGuide } from './claymorphismPlayful';
import { editorialMagazineStyleGuide } from './editorialMagazine';
import { bauhausGeometricStyleGuide } from './bauhausGeometric';
import { y2kFuturismStyleGuide } from './y2kFuturism';
import { vaporwaveSynthStyleGuide } from './vaporwaveSynth';
import { maximalismDopamineStyleGuide } from './maximalismDopamine';
import { cyberpunkHudStyleGuide } from './cyberpunkHud';
import { auroraGradientStyleGuide } from './auroraGradient';
import { scandiWarmStyleGuide } from './scandiWarm';
import { darkLuxeEditorialStyleGuide } from './darkLuxeEditorial';
import { skeuomorphismTactileStyleGuide } from './skeuomorphismTactile';
import { memphisPostmodernStyleGuide } from './memphisPostmodern';
import { frutigerAeroGlossyStyleGuide } from './frutigerAeroGlossy';
import { retro70sWarmStyleGuide } from './retro70sWarm';
import { collageScrapbookStyleGuide } from './collageScrapbook';
import { kawaiiPastelStyleGuide } from './kawaiiPastel';
import { artDecoLuxeStyleGuide } from './artDecoLuxe';
import { bentoModularStyleGuide } from './bentoModular';
import { kineticTypographyStyleGuide } from './kineticTypography';
import { spatial3dStyleGuide } from './spatial3d';
import { humanistImperfectStyleGuide } from './humanistImperfect';
import { tactileTextureStyleGuide } from './tactileTexture';
import { risographPrintStyleGuide } from './risographPrint';
import { blueprintTechnicalStyleGuide } from './blueprintTechnical';
import { grainyBlurDreamyStyleGuide } from './grainyBlurDreamy';
import { gothicMedievalDigitalStyleGuide } from './gothicMedievalDigital';
import { glitchDistortionStyleGuide } from './glitchDistortion';
import { organicFluidBlobStyleGuide } from './organicFluidBlob';
import { radiantGlowDarkStyleGuide } from './radiantGlowDark';
import { halftoneDotPrintStyleGuide } from './halftoneDotPrint';
import { ukiyoeWoodblockStyleGuide } from './ukiyoeWoodblock';
import { punkGrungeGraffitiStyleGuide } from './punkGrungeGraffiti';
import { aiSurrealGradient3dStyleGuide } from './aiSurrealGradient3d';
import { shatteredGlassCinematicStyleGuide } from './shatteredGlassCinematic';
import { pixelArtRetroStyleGuide } from './pixelArtRetro';
import { halftoneGlitchColorsepStyleGuide } from './halftoneGlitchColorsep';
import { mixedMediaCollageStyleGuide } from './mixedMediaCollage';
import { photoTypeEditorialStyleGuide } from './photoTypeEditorial';
import { opArtKineticStyleGuide } from './opArtKinetic';
import { warpedCheckerboardStyleGuide } from './warpedCheckerboard';
import { iridescentChromeStyleGuide } from './iridescentChrome';
import { romanticBotanicalStyleGuide } from './romanticBotanical';
import { heritageFolkOrnamentStyleGuide } from './heritageFolkOrnament';
import { naiveDoodleStyleGuide } from './naiveDoodle';

/**
 * Style Guide Catalog — bbangto-ui가 제공하는 대표 디자인 스타일 preset 집합.
 *
 * 단일 출처: 이 배열만 손으로 관리하고, `styleGuideMap`은 여기서 파생한다(중복 작성 금지).
 */
export const styleGuideCatalog: readonly StyleGuide[] = [
  neobrutalismEditorialStyleGuide,
  glassmorphismAuroraStyleGuide,
  neumorphismSoftStyleGuide,
  flatMaterialStyleGuide,
  minimalSaasStyleGuide,
  swissInternationalStyleGuide,
  terminalMonoStyleGuide,
  // P2
  claymorphismPlayfulStyleGuide,
  editorialMagazineStyleGuide,
  bauhausGeometricStyleGuide,
  y2kFuturismStyleGuide,
  vaporwaveSynthStyleGuide,
  maximalismDopamineStyleGuide,
  cyberpunkHudStyleGuide,
  auroraGradientStyleGuide,
  scandiWarmStyleGuide,
  darkLuxeEditorialStyleGuide,
  // P3
  skeuomorphismTactileStyleGuide,
  memphisPostmodernStyleGuide,
  frutigerAeroGlossyStyleGuide,
  retro70sWarmStyleGuide,
  collageScrapbookStyleGuide,
  kawaiiPastelStyleGuide,
  artDecoLuxeStyleGuide,
  // 신규 후보(2026 트렌드 리서치 §C)
  bentoModularStyleGuide,
  kineticTypographyStyleGuide,
  spatial3dStyleGuide,
  humanistImperfectStyleGuide,
  tactileTextureStyleGuide,
  // 이미지 레퍼런스 마이닝 신규 후보(#29–#50)
  risographPrintStyleGuide,
  blueprintTechnicalStyleGuide,
  grainyBlurDreamyStyleGuide,
  gothicMedievalDigitalStyleGuide,
  glitchDistortionStyleGuide,
  organicFluidBlobStyleGuide,
  radiantGlowDarkStyleGuide,
  halftoneDotPrintStyleGuide,
  ukiyoeWoodblockStyleGuide,
  punkGrungeGraffitiStyleGuide,
  aiSurrealGradient3dStyleGuide,
  shatteredGlassCinematicStyleGuide,
  pixelArtRetroStyleGuide,
  halftoneGlitchColorsepStyleGuide,
  mixedMediaCollageStyleGuide,
  photoTypeEditorialStyleGuide,
  opArtKineticStyleGuide,
  warpedCheckerboardStyleGuide,
  iridescentChromeStyleGuide,
  romanticBotanicalStyleGuide,
  heritageFolkOrnamentStyleGuide,
  naiveDoodleStyleGuide,
];

/** name → StyleGuide 조회 맵. styleGuideCatalog에서 파생. */
export const styleGuideMap: Record<string, StyleGuide> = Object.fromEntries(
  styleGuideCatalog.map((sg) => [sg.name, sg])
);
