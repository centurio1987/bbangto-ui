# @centurio1987/bbangto-ui-style-guide-catalog

## 0.3.1

### Patch Changes

- 727a4eb: 상류 소비자 리포트 I 계열 7건 해소 — 87종 유형에 **도달하는 경로**를 고친다.

  콘텐츠는 이미 있었다(87종 전량 authored). 문제는 소비자가 그 존재를 알 방법이 없었고,
  알아도 API가 오답을 줬다는 것이다. 어느 소비자는 87종짜리 라이브러리를 쓰면서 도식 18종 중
  카탈로그 템플릿을 1종만 썼다.

  ### 새 기능

  - **`structuralTraits` 축 신설**(I5) — `dataShape`와 직교하는 구조 술어 8종
    (`sequential`·`branching`·`cyclic`·`nested`·`relational`·`cross-axis`·`paired`·`quantitative`).
    87 엔트리 전량 저작. Flowchart(VT-201)와 Process Steps(VT-202)는 `dataShape`가 똑같이 `['process']`라
    **분기 유무를 기계로 걸러낼 수 없었다** — 이제 `structuralTraits: ['branching']` 한 줄로 갈린다.
    소비자가 손으로 복제하던 "구조 → 권장 컴포넌트" 매핑표가 필요 없어진다.
  - **`selectVizTypes`에 `match: 'any' | 'all'`**(I4) — `'all'`은 지정한 criterion을 **전부** 만족하는
    후보만 남기는 하드 필터다. 기본값 `'any'`는 현행 동작 그대로.
    soft-weighted 합산은 criterion을 더할수록 정답이 내려갈 수 있는데, 그 함정이 이제 JSDoc·README에 명시된다.
  - **동점 tie-break에 precision 편입**(I4) — `score↓ → 매칭 축 수↓ → precision↓ → priority↑ → id↑`.
    축을 넓게 선언한 유형이 recall만으로 앞서던 편향이 사라진다(최종 tie-break가 `id`라 결정성은 유지).
  - **역방향 조회 helper**(I6) — `vizTypesForExport` · `defaultVizTypeForExport` · `vizTypeForVariant`.
    `Statistics`를 이름으로 조회하면 id 순으로 VT-513 Waffle이 먼저 잡히지만 **실제 기본 렌더는 VT-601**이다.
    이제 그 둘을 가릴 수 있다.
  - **컴포넌트 JSDoc에 채택 근거 주입**(I2) — 87개 export 전부에 `@vizType`/`@useWhen`/`@avoidWhen`.
    `dist/index.d.ts`의 `useWhen|avoidWhen|dataShape` 언급이 **0 → 370행**. `.d.ts` 머리에는 정본 위치 배너.
  - **7개 패키지 전부 README 신설**(I1) — 배포물의 마크다운 문서가 0개였다.
  - **유형 SSOT 문서 동봉**(I3) — `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md`를 `files`에 편입.
    `.d.ts` 주석이 지목하던 죽은 참조가 살아난다. 인벤토리 90행 ↔ 매니페스트 87의 차이(⛔ 범위 밖 3행)도 명시.
  - **스타일 쇼케이스에 역할 캡션**(I7) — "paint 축 데모이지 그릴 수 있는 그림의 목록이 아니다 · 유형 87종
    정본은 `type.manifest.json`". `makeVizShowcase({ note: false })`로 끌 수 있다.

  ### 파괴적 변경 (0.x minor)

  - **매니페스트 `variant?: string` → `variants?: { prop, value, isDefault? }[]`**(I6).
    이전 스키마는 값만 담아 `"waffle"`을 **어느 prop에** 넣는지 알 수 없었다.
    `type.manifest.json`의 해당 필드를 읽는 소비자는 경로를 바꿔야 한다.
  - `VizTypeMeta.structuralTraits`가 **required**다. 자체 레지스트리를 저작하는 소비자는 필드를 채워야 한다.

  ### 함께 메운 누락

  `Statistics`의 `mosaic`, `Cycle`의 `orbit`, `Comparison`·`DotPlot`의 전 모드가 유형 레지스트리에
  청구되지 않고 있었다(렌더는 되는데 채택 근거를 읽을 수 없는 상태). 전량 편입하고,
  `*Mode` union 멤버를 정적 스캔해 미청구를 실패시키는 게이트를 심어 재발을 끊었다.

- Updated dependencies [727a4eb]
- Updated dependencies [649aaaa]
  - @centurio1987/bbangto-ui-core@1.1.2
  - @centurio1987/bbangto-ui-tokens@1.3.0

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
