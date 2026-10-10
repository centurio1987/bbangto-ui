# @centurio1987/bbangto-ui-foundations

## 2.0.0

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
  - @centurio1987/bbangto-ui-tokens@1.5.0

## 1.1.2

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

- Updated dependencies [10e4a92]
  - @centurio1987/bbangto-ui-tokens@1.4.0

## 1.1.1

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
  - @centurio1987/bbangto-ui-tokens@1.3.0

## 1.1.0

### Minor Changes

- b632c67: Foundation 채택 메타데이터 축(`FoundationMeta`) 인프라 + 전량 backfill (additive).

  - **신규 서브패스 `./meta`**: `FoundationMeta` registry/selector(`selectFoundations`) + `foundation.manifest.json`(76종 전량 authored) + `./catalog`(catalog.json) export. 루트 배럴은 미오염(컴포넌트 소비자 번들 무영향).
  - `catalog.json` 74→76 정합(누락됐던 amber-dark/amber-light 편입 + carbon 정렬 교정).
  - colorScheme·baseTextContrast 파생값은 실측에서 계산하며 over-claim은 생성기가 hard-fail.

  기존 `.`(루트) export는 무변경. `./meta`는 opt-in 서브패스.

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0

## 1.0.1

### Patch Changes

- Updated dependencies [7db914f]
  - @centurio1987/bbangto-ui-tokens@1.1.0

## 1.0.0

### Major Changes

- a45e32e: ORD-006 — theme→foundation 재편 · 카탈로그 분리 · pattern/block wrapping 인터페이스 (breaking).

  **core**

  - `ThemeProvider`/`useTheme` → `FoundationProvider`/`useFoundation` (prop `theme`→`foundation`, DOM attr `data-bbangto-theme`→`data-bbangto-foundation`).
  - base foundation 3종(`lightFoundation`/`darkFoundation`/`highContrastFoundation`) 내장 export.
  - `themeToStyleGuide` → `foundationToStyleGuide`.
  - StyleGuide에 `wrapperBlocks`/`wrapperPatterns` + `useWrapperComponent`/`useWrapperBlock`/`useWrapperPattern` 추가.
  - style guide 카탈로그(`styleGuides` 배럴) export 제거 → `@centurio1987/bbangto-ui-style-guide-catalog`로 이전.

  **tokens**

  - `BbangtoTheme` → `BbangtoFoundation`, `ThemeOverride` → `FoundationOverride`.
  - `themeToStyleObject`/`themeToCSSString` → `foundationToStyleObject`/`foundationToCSSString`, `mergeTheme` → `mergeFoundation`.
  - CSS 변수 prefix `--bbangto-`는 유지.

  **foundations** (구 `@centurio1987/bbangto-ui-themes`에서 rename)

  - 패키지명 `@centurio1987/bbangto-ui-themes` → `@centurio1987/bbangto-ui-foundations`.
  - base 3종은 core로 이전(이 패키지에서 제거). 확장 foundation(amber + external 74)만 제공.
  - 객체명 `*Theme` → `*Foundation`, `themeMap` → `foundationCatalog`(amber 2 + external 74).

### Patch Changes

- Updated dependencies [a45e32e]
  - @centurio1987/bbangto-ui-tokens@1.0.0

> 구 `@centurio1987/bbangto-ui-themes`에서 rename됨 (ORD-006). 아래는 이전 이름 시절의 이력.

## 0.2.0

### Minor Changes

- 패키지 리네이밍 + 테마 통합

  모든 패키지에 `bbangto-ui-` 접두사 추가 및 5개로 분리됐던 테마 패키지를 단일 패키지로 통합.

  - `@centurio1987/core` → `@centurio1987/bbangto-ui-core`
  - `@centurio1987/tokens` → `@centurio1987/bbangto-ui-tokens`
  - `@centurio1987/hooks` → `@centurio1987/bbangto-ui-hooks`
  - `@centurio1987/diagram` → `@centurio1987/bbangto-ui-diagram`
  - `theme-light` + `theme-dark` + `theme-high-contrast` + `theme-amber` + `themes-external` → `@centurio1987/bbangto-ui-themes` (빌트인 5종 + 브랜드 프리셋 74종)

### Patch Changes

- Updated dependencies
  - @centurio1987/bbangto-ui-tokens@0.3.0
