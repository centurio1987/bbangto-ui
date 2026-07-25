# @centurio1987/bbangto-ui-style-guide-catalog

## 0.3.0

### Minor Changes

- 298f353: Neobrutalism_Editorial_01 파일/네이밍 체계 표준화(다른 preset과 완전 동일 구조로 일관화)

  - `src/bakery.ts` → `src/neobrutalismEditorial.tsx` (유일하게 다르던 파일명·확장자 제거)
  - export 이름 변경(breaking): `bakeryStyleGuide` → `neobrutalismEditorialStyleGuide`
  - 모티프 styleId/클래스: `bbangto-bakery-motif` → `bbangto-neobrutalism-editorial-01-motif`, `.bbangto-bakery-btn/card` → `.bbangto-neo-btn/card`
  - wrapper displayPrefix: `Bakery` → `Neobrutalism`
  - 슬러그 `neobrutalism-editorial-01`, Showcase displayName `NeobrutalismShowcase`, 카피 콘텐츠는 카탈로그 정체성으로 보존

- b632c67: 채택 메타데이터 backfill + 선택 helper (additive).

  - **`selectStyleGuides(catalog, criteria)`** 신규 export — soft-weighted 스코어링 순수 함수(하드 필터 아님 → shortlist 붕괴 방지). family/domains/tags/characteristics/mood 기준·결정적 tie-break·pending 처리.
  - `catalog.manifest.json` 51종 전량 `StyleGuideMeta` authored(pending 0) — AI가 코드 전수검토 없이 카탈로그를 채택 판단할 수 있는 메타 SSOT.
  - `meta.displayName` canonical(`Primary_Secondary_01`) 정규화(#29-50 16종 포함).

  `selectStyleGuides`는 신규 export, 나머지는 데이터/문서 보강이라 하위호환.

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0
  - @centurio1987/bbangto-ui-core@1.1.1

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
