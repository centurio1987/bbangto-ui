# @centurio1987/bbangto-ui-style-guide-catalog

## 1.0.0

### Major Changes

- a1eca39: 채택 매니페스트 4종이 색인과 항목별 상세 두 층으로 나뉜다(KAN-064).

  전에는 매니페스트 파일 하나에 항목 전부의 전체 메타가 들어 있었다. Claude 토크나이저로 재 보니 UI style guide 매니페스트
  하나가 50,325토큰이라, AI 가 "파일 하나를 읽고 고른다"는 쓰임새가 성립하지 않았다. 이제 매니페스트 파일은 후보를 고를 때
  쓰는 필드만 담은 **색인**이고, 고른 후보의 전체 메타는 패키지에 함께 실리는 **상세 파일**에서 읽는다.

  | 패키지                            | 색인(서브패스)               | 색인 크기            | 상세                     |
  | --------------------------------- | ---------------------------- | -------------------- | ------------------------ |
  | style-guide-catalog               | `./manifest.json`            | 8,709토큰(전 50,325) | `./manifest/<name>.json` |
  | visualization-style-guide-catalog | `./manifest.json`            | 5,179토큰(전 30,392) | `./manifest/<name>.json` |
  | foundations                       | `./foundation.manifest.json` | 8,029토큰(전 37,081) | `./manifest/<slug>.json` |
  | visualization                     | `./type.manifest.json`       | 6,675토큰(전 38,474) | `./manifest/<id>.json`   |

  ### 깨지는 것

  색인 서브패스의 모양이 항목 배열에서 `{ axis, detail, columns, rows }` 객체로 바뀐다. `columns` 가 열 이름이고, `rows` 의
  각 배열이 그 순서대로 한 항목의 값을 담는다. `useWhen` · `avoidWhen` · `mood` · `characteristics` · `accessibility` ·
  `related` · `completeness` 는 색인에 없고 상세 파일에만 있다.

  ```ts
  // 전
  import manifest from "@centurio1987/bbangto-ui-style-guide-catalog/manifest.json";
  manifest.find((e) => e.name === "cyberpunk-hud-01")?.meta?.useWhen;

  // 후 — 색인에서 고르고, 상세에서 읽는다
  import index from "@centurio1987/bbangto-ui-style-guide-catalog/manifest.json";
  import detail from "@centurio1987/bbangto-ui-style-guide-catalog/manifest/cyberpunk-hud-01.json";
  const nameAt = index.columns.indexOf("name");
  index.rows.some((row) => row[nameAt] === "cyberpunk-hud-01"); // true
  detail.meta?.useWhen;
  ```

  ### 그대로인 것

  메타 스키마 타입(`StyleGuideMeta` · `FoundationMeta` · `VizTypeMeta`)과 `buildManifest` · `buildFoundationManifest` ·
  `buildTypeManifest` · `selectStyleGuides` · `selectFoundations` · `selectVizTypes` 의 시그니처는 바뀌지 않는다.
  코드에서 객체로 고르던 쓰임새는 영향이 없다.

### Patch Changes

- Updated dependencies [910cbb6]
- Updated dependencies [d51cf96]
- Updated dependencies [b1dc968]
  - @centurio1987/bbangto-ui-tokens@1.5.0
  - @centurio1987/bbangto-ui-core@1.2.2

## 0.3.3

### Patch Changes

- 10e4a92: 키보드 포커스 테두리 색(`semantic.border.focus`)이 모든 색 스킴에서 화면 표면과 3:1 이상이 된다(KAN-060, WCAG 1.4.11).

  **tokens** — 포커스 대비를 재는 `FOCUS_CONTRAST_MIN`(3) · `surfaceColors` · `focusContrast` 를 내보낸다.
  `focusContrast(semantic)` 은 `border.focus` 와 `background.base`·`elevated` 사이의 최저 대비와 그 자리를 돌려준다.
  반투명 `elevated` 는 흰색이 아니라 `base` 위에 합성해 잰다.

  **foundations** — 포커스 색이 밝은 표면에 묻히던 21개를 색조는 두고 명도만 낮춘 값으로 바꾼다:
  `aurora-yellow` · `celluloid` · `charcoal-warm` · `commerce-noir` · `coral` · `cosmonaut` · `dark-chrome` ·
  `gold-rush` · `jade-leaf` · `jungle-night` · `lime` · `magazine-light` · `midnight-ink` · `mint-code` ·
  `neon-yellow` · `obsidian-gold` · `oxide-green` · `sunflower` · `sunset` · `volt-emerald` · `warm-parchment`.
  `border.focus` 를 쓰는 Input·Link·Slider·RichTextEditor 의 포커스 테두리 색도 함께 바뀐다.

  **style-guide-catalog** — 같은 규칙으로 색 스킴 10개의 포커스 색을 바꾼다:
  `neobrutalism-editorial-01`(default) · `skeuomorphism-tactile-01`(default · green) · `kawaii-pastel-01`(lavender) ·
  `tactile-texture-01`(default) · `halftone-dot-print-01`(default) · `punk-grunge-graffiti-01`(default) ·
  `ai-surreal-gradient3d-01`(light) · `pixel-art-retro-01`(arcade-paper) · `iridescent-chrome-01`(light).
  `auditFocusContrast(catalog)` 를 내보낸다 — 모든 색 스킴에서 포커스 대비 미달을 목록으로 돌려준다.

  모티프 버튼의 포커스 테두리가 없는 변수(`--bbangto-semantic-focus`·`-focus-ring`)를 읽어 늘 고정 색이던 style guide 11개가
  이제 `--bbangto-semantic-border-focus` 를 읽어 색 스킴마다 포커스 색을 따른다:
  `ai-surreal-gradient3d-01` · `blueprint-technical-01` · `glitch-distortion-01` · `grainy-blur-dreamy-01` ·
  `halftone-dot-print-01` · `halftone-glitch-colorsep-01` · `heritage-folk-ornament-01` · `naive-doodle-01` ·
  `op-art-kinetic-01` · `romantic-botanical-01` · `warped-checkerboard-01`.

- fadd22a: style guide 가 자기 CSS 로 그리는 모티프 버튼 포커스 테두리가 모든 색 스킴에서 화면 표면과 3:1 이상이 된다(KAN-065, WCAG 1.4.11).

  포커스 테두리가 강조색이나 고정 색을 써서 바탕에 묻히던 style guide 5개(색 스킴 7개)가 이제 포커스 색 토큰
  (`--bbangto-semantic-border-focus`)을 읽는다:
  `neobrutalism-editorial-01`(default) · `minimal-saas-01`(default · dark · warm, 3px 고리 모양은 그대로) ·
  `gothic-medieval-digital-01`(light) · `shattered-glass-cinematic-01`(light) · `iridescent-chrome-01`(light).
  `tactile-texture-01` 의 포커스 규칙도 같은 토큰을 읽게 바꿨지만, 이 규칙은 `!important` 가 없어 core 가 그리는 포커스
  테두리(같은 토큰)에 가려 왔으므로 화면은 그대로다.
  같은 토큰을 따르게 되면서 `iridescent-chrome-01`(default)의 포커스 테두리는 라일락에서 그 색 스킴의 포커스 색인 시안으로
  바뀐다. `shattered-glass-cinematic-01`(rose)은 포커스 색 토큰을 시안 `#34E5FF` 에서 금색 `#FFC53D` 로 바꿔, 모티프 버튼과
  입력·링크 같은 core 컴포넌트의 포커스가 모두 금색이 된다 — 「포커스 링은 굴절 색과 구분되는 골드」라는 이 style guide 의
  접근성 규칙에 맞춘 것이다.

  어느 색 스킴에서도 만들어지지 않는 semantic 변수를 읽어 늘 고정 색이던 다섯 자리가 색 스킴을 따른다:
  `ai-surreal-gradient3d-01` accent 태그 글자·테두리(`--bbangto-semantic-border-focus`) ·
  `blueprint-technical-01` 카드 배경(`--bbangto-semantic-background-elevated`, whiteprint 에서 짙은 남색 카드가 밝아진다) ·
  `scandi-warm-01`·`spatial-3d-01` muted 태그 테두리(`--bbangto-semantic-border-base`).

- Updated dependencies [10e4a92]
  - @centurio1987/bbangto-ui-tokens@1.4.0
  - @centurio1987/bbangto-ui-core@1.2.1

## 0.3.2

### Patch Changes

- 145f269: 하나만 가져와도 패키지 전체가 번들에 딸려 오던 문제를 고쳤다(KAN-051). 공개 API와 import 경로는 그대로다.

  ### 바뀐 동작

  - **dist 가 파일 단위 출력이 됐다.** 전에는 패키지마다 `dist/index.js` 한 파일이어서, `package.json` 의
    `sideEffects: false` 가 있어도 번들러가 쓰지 않는 컴포넌트를 버리지 못했다(이 선언은 파일 단위로만 작동한다).
    이제 소스 파일마다 출력이 하나씩 나오고 함께 쓰는 코드는 `chunk-*.js` 로 빠진다. 입구(`dist/index.js`,
    visualization 은 `dist/typeMeta/index.js` 도)와 타입 선언(`dist/index.d.ts`)의 경로는 바뀌지 않았다.
  - **style-guide-catalog · visualization-style-guide-catalog: 카탈로그 배열과 조회 맵을 `src/catalog.ts` 로 옮겼다.**
    배럴 최상위에서 `Object.fromEntries(...)` 로 맵을 만들던 것이 모든 preset 을 붙잡고 있었다.
    `styleGuideCatalog` · `styleGuideMap` · `vizStyleGuideCatalog` · `vizStyleGuideMap` 은 지금처럼 루트에서 가져온다.

  ### 크기 (esbuild 0.27.7, minify, react·`@centurio1987/*` 바깥)

  | 가져온 것                                                           | 전       | 후       |
  | ------------------------------------------------------------------- | -------- | -------- |
  | core `Button` 하나                                                  | 324,410B | 4,622B   |
  | visualization `BarChart` 하나                                       | 171,294B | 8,958B   |
  | style-guide-catalog `NeobrutalismShowcase` 하나                     | 829,011B | 101,092B |
  | visualization-style-guide-catalog `minimalLine01VizStyleGuide` 하나 | 335,601B | 11,810B  |

  전부 가져오는 경우는 청크 경계 때문에 조금 커졌다(core 438,855B → 464,763B). style-guide-catalog 의 Showcase 하나가
  여전히 약 101KB 인 것은 Showcase 전부가 함께 쓰는 생성 카피 파일(`_showcaseCopy.generated.ts`) 때문이다.

- 78ca83d: Showcase 하나만 가져와도 51개 Showcase 몫의 확장 카피가 번들에 딸려 오던 문제를 고쳤다(KAN-058).
  화면에 그려지는 내용은 그대로다(51개 Showcase 의 렌더 결과가 전후 바이트 단위로 같다).

  ### 바뀐 동작

  - **`makeShowcase(W, copy, displayName, ext?)` — 확장 카피를 네 번째 인자로 받는다.** 전에는 세 번째 인자를
    키로 `SHOWCASE_COPY_EXT` 에서 확장 카피를 찾았고, 그 때문에 Showcase 하나가 51개 몫 전부를 끌고 왔다.
    이제 세 번째 인자는 표시용 이름(`displayName`)일 뿐이다. 카탈로그 preset 의 이름(예: `'NeobrutalismShowcase'`)을
    넘겨도 그 카탈로그 카피가 저절로 붙지 않으므로, 확장 카피는 네 번째 인자로 넘기거나 `copy` 에 직접 넣는다.
    카탈로그에 없는 이름을 넘기던 경우에는 바뀌는 것이 없다(그때도 기본값으로 그려졌다).
  - `SHOWCASE_COPY_EXT` 는 지금처럼 루트에서 가져올 수 있다. 51개 카피를 모은 읽기용 값이고, 이 객체를 고쳐
    끼워도 `makeShowcase` 는 더 이상 읽지 않는다.

  ### 크기 (esbuild 0.27.7, minify, react·`@centurio1987/*` 바깥)

  | 가져온 것                   | 전       | 후       |
  | --------------------------- | -------- | -------- |
  | `NeobrutalismShowcase` 하나 | 101,092B | 25,649B  |
  | 패키지 전체(`export *`)     | 840,248B | 840,904B |

- Updated dependencies [145f269]
- Updated dependencies [5af8e71]
- Updated dependencies [d6aa3fa]
- Updated dependencies [7a9e114]
- Updated dependencies [a7afef7]
  - @centurio1987/bbangto-ui-core@1.2.0

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
