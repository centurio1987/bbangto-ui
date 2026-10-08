// 공통 빌더(다른 preset 작성/소비 시 재사용).
export { makeFoundations, makeSemantic, makeColorway, type SemanticInput, type FoundationInput } from './_foundation';
export { makeMotifWrappers, cx, useMotifStyle, type MotifConfig, type TagConfig } from './_motif';
export {
  makeShowcase,
  type ShowcaseCopy,
  type ShowcaseItem,
  type PhilosophyCard,
  type ShowcaseContact,
  type ShowcaseCopyExt,
} from './_showcase';
export { SHOWCASE_COPY_EXT } from './_showcaseCopy';

// P1 카탈로그 presets.
export { neobrutalismEditorialStyleGuide, NeobrutalismShowcase, neobrutalismEditorialWrappers } from './neobrutalismEditorial';
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

// 신규 후보(2026 트렌드 리서치 — packages/core/style-guide-catalog.md 「출처」 절) presets.
export { bentoModularStyleGuide, BentoShowcase, bentoModularWrappers } from './bentoModular';
export { kineticTypographyStyleGuide, KineticShowcase, kineticTypographyWrappers } from './kineticTypography';
export { spatial3dStyleGuide, Spatial3DShowcase, spatial3dWrappers } from './spatial3d';
export { humanistImperfectStyleGuide, HumanistShowcase, humanistImperfectWrappers } from './humanistImperfect';
export { tactileTextureStyleGuide, TactileShowcase, tactileTextureWrappers } from './tactileTexture';

// 이미지 레퍼런스 마이닝 신규 후보(#29–#50 — style-guide-catalog.md) presets.
export { risographPrintStyleGuide, RisographPrintShowcase, risographPrintWrappers } from './risographPrint';
export { blueprintTechnicalStyleGuide, BlueprintTechnicalShowcase, blueprintTechnicalWrappers } from './blueprintTechnical';
export { grainyBlurDreamyStyleGuide, GrainyBlurDreamyShowcase, grainyBlurDreamyWrappers } from './grainyBlurDreamy';
export { gothicMedievalDigitalStyleGuide, GothicMedievalDigitalShowcase, gothicMedievalDigitalWrappers } from './gothicMedievalDigital';
export { glitchDistortionStyleGuide, GlitchDistortionShowcase, glitchDistortionWrappers } from './glitchDistortion';
export { organicFluidBlobStyleGuide, OrganicFluidBlobShowcase, organicFluidBlobWrappers } from './organicFluidBlob';
export { radiantGlowDarkStyleGuide, RadiantGlowDarkShowcase, radiantGlowDarkWrappers } from './radiantGlowDark';
export { halftoneDotPrintStyleGuide, HalftoneDotPrintShowcase, halftoneDotPrintWrappers } from './halftoneDotPrint';
export { ukiyoeWoodblockStyleGuide, UkiyoeWoodblockShowcase, ukiyoeWoodblockWrappers } from './ukiyoeWoodblock';
export { punkGrungeGraffitiStyleGuide, PunkGrungeGraffitiShowcase, punkGrungeGraffitiWrappers } from './punkGrungeGraffiti';
export { aiSurrealGradient3dStyleGuide, AiSurrealGradient3dShowcase, aiSurrealGradient3dWrappers } from './aiSurrealGradient3d';
export { shatteredGlassCinematicStyleGuide, ShatteredGlassCinematicShowcase, shatteredGlassCinematicWrappers } from './shatteredGlassCinematic';
export { pixelArtRetroStyleGuide, PixelArtRetroShowcase, pixelArtRetroWrappers } from './pixelArtRetro';
export { halftoneGlitchColorsepStyleGuide, HalftoneGlitchColorsepShowcase, halftoneGlitchColorsepWrappers } from './halftoneGlitchColorsep';
export { mixedMediaCollageStyleGuide, MixedMediaCollageShowcase, mixedMediaCollageWrappers } from './mixedMediaCollage';
export { photoTypeEditorialStyleGuide, PhotoTypeEditorialShowcase, photoTypeEditorialWrappers } from './photoTypeEditorial';
export { opArtKineticStyleGuide, OpArtKineticShowcase, opArtKineticWrappers } from './opArtKinetic';
export { warpedCheckerboardStyleGuide, WarpedCheckerboardShowcase, warpedCheckerboardWrappers } from './warpedCheckerboard';
export { iridescentChromeStyleGuide, IridescentChromeShowcase, iridescentChromeWrappers } from './iridescentChrome';
export { romanticBotanicalStyleGuide, RomanticBotanicalShowcase, romanticBotanicalWrappers } from './romanticBotanical';
export { heritageFolkOrnamentStyleGuide, HeritageFolkOrnamentShowcase, heritageFolkOrnamentWrappers } from './heritageFolkOrnament';
export { naiveDoodleStyleGuide, NaiveDoodleShowcase, naiveDoodleWrappers } from './naiveDoodle';

// 카탈로그 배열과 name 조회 맵은 catalog.ts 에 둔다(KAN-051). 여기서 직접 만들면 배럴 최상위의
// Object.fromEntries 가 모든 preset 을 붙잡아, preset 하나만 가져와도 전부 딸려 온다.
export { styleGuideCatalog, styleGuideMap } from './catalog';

// 채택 메타데이터 매니페스트 생성기 (catalog.manifest.json으로 투영).
export {
  buildManifest,
  serializeManifest,
  type ManifestEntry,
  type ManifestCompleteness,
  type CatalogEntryLike,
} from './manifest';

// 채택 스코어링 helper (meta 기반 후보 필터·랭크, METADATA_STRATEGY §6 2단계).
export {
  selectStyleGuides,
  DEFAULT_WEIGHTS,
  type StyleSelectionCriteria,
  type SelectionResult,
  type MoodConstraint,
  type SelectableEntry,
  type CriterionWeights,
} from './select';

// accessibility over-claim 감사 (팔레트 실측 WCAG 대비 vs contrastIntent 선언, KAN-024)
// + 포커스 테두리 대비 감사 (border.focus vs 표면 3:1, KAN-060).
export {
  auditContrast,
  auditFocusContrast,
  CONTRAST_THRESHOLDS,
  type AuditableEntry,
  type ContrastViolation,
  type FocusContrastViolation,
} from './accessibilityAudit';

// 트렌드 표 자동생성 (매니페스트 → style-guide-catalog.md 색인 표, KAN-025).
export {
  buildTrendTable,
  replaceBetweenMarkers,
  extractBetweenMarkers,
  TREND_TABLE_START,
  TREND_TABLE_END,
} from './trendTable';
