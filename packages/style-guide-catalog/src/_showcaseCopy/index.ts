import type { ShowcaseCopyExt } from '../_showcase';
import { neobrutalismEditorialCopyExt } from './neobrutalismEditorial';
import { aiSurrealGradient3dCopyExt } from './aiSurrealGradient3d';
import { artDecoLuxeCopyExt } from './artDecoLuxe';
import { auroraGradientCopyExt } from './auroraGradient';
import { bauhausGeometricCopyExt } from './bauhausGeometric';
import { bentoModularCopyExt } from './bentoModular';
import { blueprintTechnicalCopyExt } from './blueprintTechnical';
import { claymorphismPlayfulCopyExt } from './claymorphismPlayful';
import { collageScrapbookCopyExt } from './collageScrapbook';
import { cyberpunkHudCopyExt } from './cyberpunkHud';
import { darkLuxeEditorialCopyExt } from './darkLuxeEditorial';
import { editorialMagazineCopyExt } from './editorialMagazine';
import { flatMaterialCopyExt } from './flatMaterial';
import { frutigerAeroGlossyCopyExt } from './frutigerAeroGlossy';
import { glassmorphismAuroraCopyExt } from './glassmorphismAurora';
import { glitchDistortionCopyExt } from './glitchDistortion';
import { gothicMedievalDigitalCopyExt } from './gothicMedievalDigital';
import { grainyBlurDreamyCopyExt } from './grainyBlurDreamy';
import { halftoneDotPrintCopyExt } from './halftoneDotPrint';
import { halftoneGlitchColorsepCopyExt } from './halftoneGlitchColorsep';
import { heritageFolkOrnamentCopyExt } from './heritageFolkOrnament';
import { humanistImperfectCopyExt } from './humanistImperfect';
import { iridescentChromeCopyExt } from './iridescentChrome';
import { kawaiiPastelCopyExt } from './kawaiiPastel';
import { kineticTypographyCopyExt } from './kineticTypography';
import { maximalismDopamineCopyExt } from './maximalismDopamine';
import { memphisPostmodernCopyExt } from './memphisPostmodern';
import { minimalSaasCopyExt } from './minimalSaas';
import { mixedMediaCollageCopyExt } from './mixedMediaCollage';
import { naiveDoodleCopyExt } from './naiveDoodle';
import { neumorphismSoftCopyExt } from './neumorphismSoft';
import { opArtKineticCopyExt } from './opArtKinetic';
import { organicFluidBlobCopyExt } from './organicFluidBlob';
import { photoTypeEditorialCopyExt } from './photoTypeEditorial';
import { pixelArtRetroCopyExt } from './pixelArtRetro';
import { punkGrungeGraffitiCopyExt } from './punkGrungeGraffiti';
import { radiantGlowDarkCopyExt } from './radiantGlowDark';
import { retro70sWarmCopyExt } from './retro70sWarm';
import { risographPrintCopyExt } from './risographPrint';
import { romanticBotanicalCopyExt } from './romanticBotanical';
import { scandiWarmCopyExt } from './scandiWarm';
import { shatteredGlassCinematicCopyExt } from './shatteredGlassCinematic';
import { skeuomorphismTactileCopyExt } from './skeuomorphismTactile';
import { spatial3dCopyExt } from './spatial3d';
import { swissInternationalCopyExt } from './swissInternational';
import { tactileTextureCopyExt } from './tactileTexture';
import { terminalMonoCopyExt } from './terminalMono';
import { ukiyoeWoodblockCopyExt } from './ukiyoeWoodblock';
import { vaporwaveSynthCopyExt } from './vaporwaveSynth';
import { warpedCheckerboardCopyExt } from './warpedCheckerboard';
import { y2kFuturismCopyExt } from './y2kFuturism';

/*
 * Style Guide Catalog — Showcase 확장 카피 모음 (읽기용).
 *
 * 키 = 각 Showcase displayName(makeShowcase 3번째 인자). 값 = 에디토리얼 확장 섹션
 * (gallery/skills/philosophy/contact/footer) 텍스트. 템플릿 렌더 구조(_showcase.tsx)는
 * 코드로 고정, 정체성 문장·키워드만 데이터로 주입한다.
 *
 * 카피는 preset 마다 이 폴더의 파일 하나에 있고(파일 이름 = preset 모듈 이름), 각 preset 이 자기 몫만
 * import 해 makeShowcase 의 4번째 인자로 넘긴다(KAN-058). 51개를 한 파일에 두고 makeShowcase 가 그것을
 * import 하던 때는 Showcase 하나만 가져와도 51개 몫(약 76KB)이 번들에 딸려 왔다. 이 모음은 공개 export
 * SHOWCASE_COPY_EXT 와 카피 완비성 스토리를 위한 것이라, Showcase 쪽 코드에서 import 하지 않는다.
 *
 * 50개는 showcase-copy-generate 워크플로가 가이드별 schema 검증 데이터를 생성한 뒤 JSON.stringify 로
 * 결정론적 조립한 결과이고, NeobrutalismShowcase 는 손저작 보존이다. 다시 생성할 때는 preset 파일마다
 * 하나씩 쓰고 이 모음에 한 줄을 더한다 — 짝이 어긋나면 카탈로그 스토리(_catalogStory.tsx)가 잡는다.
 */
export const SHOWCASE_COPY_EXT: Record<string, ShowcaseCopyExt> = {
  NeobrutalismShowcase: neobrutalismEditorialCopyExt,
  AiSurrealGradient3dShowcase: aiSurrealGradient3dCopyExt,
  ArtDecoShowcase: artDecoLuxeCopyExt,
  AuroraShowcase: auroraGradientCopyExt,
  BauhausShowcase: bauhausGeometricCopyExt,
  BentoShowcase: bentoModularCopyExt,
  BlueprintTechnicalShowcase: blueprintTechnicalCopyExt,
  ClayShowcase: claymorphismPlayfulCopyExt,
  CollageShowcase: collageScrapbookCopyExt,
  CyberShowcase: cyberpunkHudCopyExt,
  DarkLuxeShowcase: darkLuxeEditorialCopyExt,
  EditorialShowcase: editorialMagazineCopyExt,
  FlatMaterialShowcase: flatMaterialCopyExt,
  AeroShowcase: frutigerAeroGlossyCopyExt,
  GlassmorphismShowcase: glassmorphismAuroraCopyExt,
  GlitchDistortionShowcase: glitchDistortionCopyExt,
  GothicMedievalDigitalShowcase: gothicMedievalDigitalCopyExt,
  GrainyBlurDreamyShowcase: grainyBlurDreamyCopyExt,
  HalftoneDotPrintShowcase: halftoneDotPrintCopyExt,
  HalftoneGlitchColorsepShowcase: halftoneGlitchColorsepCopyExt,
  HeritageFolkOrnamentShowcase: heritageFolkOrnamentCopyExt,
  HumanistShowcase: humanistImperfectCopyExt,
  IridescentChromeShowcase: iridescentChromeCopyExt,
  KawaiiShowcase: kawaiiPastelCopyExt,
  KineticShowcase: kineticTypographyCopyExt,
  MaxShowcase: maximalismDopamineCopyExt,
  MemphisShowcase: memphisPostmodernCopyExt,
  MinimalSaasShowcase: minimalSaasCopyExt,
  MixedMediaCollageShowcase: mixedMediaCollageCopyExt,
  NaiveDoodleShowcase: naiveDoodleCopyExt,
  NeumorphismShowcase: neumorphismSoftCopyExt,
  OpArtKineticShowcase: opArtKineticCopyExt,
  OrganicFluidBlobShowcase: organicFluidBlobCopyExt,
  PhotoTypeEditorialShowcase: photoTypeEditorialCopyExt,
  PixelArtRetroShowcase: pixelArtRetroCopyExt,
  PunkGrungeGraffitiShowcase: punkGrungeGraffitiCopyExt,
  RadiantGlowDarkShowcase: radiantGlowDarkCopyExt,
  RetroShowcase: retro70sWarmCopyExt,
  RisographPrintShowcase: risographPrintCopyExt,
  RomanticBotanicalShowcase: romanticBotanicalCopyExt,
  ScandiShowcase: scandiWarmCopyExt,
  ShatteredGlassCinematicShowcase: shatteredGlassCinematicCopyExt,
  SkeuoShowcase: skeuomorphismTactileCopyExt,
  Spatial3DShowcase: spatial3dCopyExt,
  SwissShowcase: swissInternationalCopyExt,
  TactileShowcase: tactileTextureCopyExt,
  TerminalShowcase: terminalMonoCopyExt,
  UkiyoeWoodblockShowcase: ukiyoeWoodblockCopyExt,
  VaporShowcase: vaporwaveSynthCopyExt,
  WarpedCheckerboardShowcase: warpedCheckerboardCopyExt,
  Y2KShowcase: y2kFuturismCopyExt,
};
