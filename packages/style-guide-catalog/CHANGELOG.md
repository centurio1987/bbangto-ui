# @centurio1987/bbangto-ui-style-guide-catalog

## 0.2.0

### Minor Changes

- 7db914f: 전 51종 style guide의 visual motif(Showcase)를 3섹션 에디토리얼 랜딩 템플릿으로 통일하고, Neobrutalism_Editorial_01을 공용 factory로 표준 편입.

  - 공용 `makeShowcase`를 Hero → Menu/Gallery → Craft(철학 3카드 · 가상 연락처 · 푸터) 구성으로 확장. 확장 카피는 `SHOWCASE_COPY_EXT` 단일 모듈에 결정론적으로 주입(LLM은 텍스트 데이터만, 코드 변형은 결정론적).
  - Neobrutalism_Editorial_01을 bespoke 파일에서 factory(makeFoundations/makeMotifWrappers/makeShowcase) + foundation preset 구조로 편입. 슬러그 `neobrutalism-editorial-01` 보존.
  - 전 50종에 foundation preset(색 스킴 기호선택) 적용.
  - 신규 export: `SHOWCASE_COPY_EXT` · 타입 `ShowcaseCopyExt` / `PhilosophyCard` / `ShowcaseContact`.

- 111e8ef: 신규 후보 5종 style guide preset 추가 (2026 디자인 트렌드 리서치 §C 기반):
  Bento_Modular_01 · Kinetic_Typography_01 · Spatial_3D_01 · Humanist_Imperfect_01 · Tactile_Texture_01.
  각 preset은 기존 6요소(foundations / extendedFoundations / wrapperComponents / patterns /
  guidelines / visualMotif) 구조를 동일하게 따르며 `styleGuideCatalog`(24→29) · `styleGuideMap`에 등재.
- cdab886: image-references 전수 마이닝 신규 후보 22종(#29–#50) style guide preset 추가:
  Risograph_Print_01 · Blueprint_Technical_01 · Grainy_Blur_Dreamy_01 · Gothic_Medieval_Digital_01 ·
  Glitch_Distortion_01 · Organic_Fluid_Blob_01 · Radiant_Glow_Dark_01 · Halftone_Dot_Print_01 ·
  Ukiyoe_Woodblock_01 · Punk_Grunge_Graffiti_01 · Ai_Surreal_Gradient3d_01 · Shattered_Glass_Cinematic_01 ·
  Pixel_Art_Retro_01 · Halftone_Glitch_Colorsep_01 · Mixed_Media_Collage_01 · Photo_Type_Editorial_01 ·
  Op_Art_Kinetic_01 · Warped_Checkerboard_01 · Iridescent_Chrome_01 · Romantic_Botanical_01 ·
  Heritage_Folk_Ornament_01 · Naive_Doodle_01.
  각 preset은 기존 6요소(foundations / extendedFoundations / wrapperComponents / patterns /
  guidelines / visualMotif) 구조를 동일하게 따르며 `styleGuideCatalog`(29→51) · `styleGuideMap`에 등재.
  Storybook story 22종 + storySort 등록.

### Patch Changes

- Updated dependencies [7db914f]
  - @centurio1987/bbangto-ui-core@1.1.0
  - @centurio1987/bbangto-ui-tokens@1.1.0

## 0.1.1

### Patch Changes

- Updated dependencies [a45e32e]
  - @centurio1987/bbangto-ui-core@1.0.0
  - @centurio1987/bbangto-ui-tokens@1.0.0
