import type { StyleGuide } from '../StyleGuide';
import { bakeryStyleGuide } from './bakery';

export { bakeryStyleGuide } from './bakery';
export { bakeryFoundations, bakeryExtendedFoundations, BAKERY } from './bakeryFoundations';
export { bakeryGuidelines } from './bakeryGuidelines';
export {
  BakeryButton,
  BakeryCard,
  BakeryTag,
  bakeryWrapperComponents,
  type BakeryTagProps,
  type BakeryTagTone,
} from './bakeryWrappers';
export { BakeryHero, BakeryMenu, BakeryCraft, bakeryPatterns } from './bakeryPatterns';
export { BakeryShowcase, bakeryVisualMotif } from './bakeryVisualMotif';

// 공통 빌더(다른 preset 작성/소비 시 재사용).
export { makeFoundations, makeSemantic, type SemanticInput, type FoundationInput } from './_foundation';
export { makeMotifWrappers, cx, useMotifStyle, type MotifConfig, type TagConfig } from './_motif';
export { makeShowcase, type ShowcaseCopy, type ShowcaseItem } from './_showcase';

// P1 카탈로그 presets.
export { glassmorphismAuroraStyleGuide, GlassmorphismShowcase, glassmorphismAuroraWrappers } from './glassmorphismAurora';
export { neumorphismSoftStyleGuide, NeumorphismShowcase, neumorphismSoftWrappers } from './neumorphismSoft';
export { flatMaterialStyleGuide, FlatMaterialShowcase, flatMaterialWrappers } from './flatMaterial';
export { minimalSaasStyleGuide, MinimalSaasShowcase, minimalSaasWrappers } from './minimalSaas';
export { swissInternationalStyleGuide, SwissShowcase, swissInternationalWrappers } from './swissInternational';
export { terminalMonoStyleGuide, TerminalShowcase, terminalMonoWrappers } from './terminalMono';

// P2 카탈로그 presets.
export { claymorphismPlayfulStyleGuide, ClayShowcase, claymorphismPlayfulWrappers } from './claymorphismPlayful';
export { editorialMagazineStyleGuide, EditorialShowcase, editorialMagazineWrappers } from './editorialMagazine';
export { bauhausGeometricStyleGuide, BauhausShowcase, bauhausGeometricWrappers } from './bauhausGeometric';
export { y2kFuturismStyleGuide, Y2KShowcase, y2kFuturismWrappers } from './y2kFuturism';
export { vaporwaveSynthStyleGuide, VaporShowcase, vaporwaveSynthWrappers } from './vaporwaveSynth';
export { maximalismDopamineStyleGuide, MaxShowcase, maximalismDopamineWrappers } from './maximalismDopamine';
export { cyberpunkHudStyleGuide, CyberShowcase, cyberpunkHudWrappers } from './cyberpunkHud';
export { auroraGradientStyleGuide, AuroraShowcase, auroraGradientWrappers } from './auroraGradient';
export { scandiWarmStyleGuide, ScandiShowcase, scandiWarmWrappers } from './scandiWarm';
export { darkLuxeEditorialStyleGuide, DarkLuxeShowcase, darkLuxeEditorialWrappers } from './darkLuxeEditorial';

// P3 카탈로그 presets.
export { skeuomorphismTactileStyleGuide, SkeuoShowcase, skeuomorphismTactileWrappers } from './skeuomorphismTactile';
export { memphisPostmodernStyleGuide, MemphisShowcase, memphisPostmodernWrappers } from './memphisPostmodern';
export { frutigerAeroGlossyStyleGuide, AeroShowcase, frutigerAeroGlossyWrappers } from './frutigerAeroGlossy';
export { retro70sWarmStyleGuide, RetroShowcase, retro70sWarmWrappers } from './retro70sWarm';
export { collageScrapbookStyleGuide, CollageShowcase, collageScrapbookWrappers } from './collageScrapbook';
export { kawaiiPastelStyleGuide, KawaiiShowcase, kawaiiPastelWrappers } from './kawaiiPastel';
export { artDecoLuxeStyleGuide, ArtDecoShowcase, artDecoLuxeWrappers } from './artDecoLuxe';

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

/**
 * Style Guide Catalog — bbangto-ui가 제공하는 대표 디자인 스타일 preset 집합.
 *
 * 단일 출처: 이 배열만 손으로 관리하고, `styleGuideMap`은 여기서 파생한다(중복 작성 금지).
 */
export const styleGuideCatalog: readonly StyleGuide[] = [
  bakeryStyleGuide,
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
];

/** name → StyleGuide 조회 맵. styleGuideCatalog에서 파생. */
export const styleGuideMap: Record<string, StyleGuide> = Object.fromEntries(
  styleGuideCatalog.map((sg) => [sg.name, sg])
);
