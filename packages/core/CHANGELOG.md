# @centurio1987/core

## 1.1.2

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

## 1.1.1

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0

## 1.1.0

### Minor Changes

- 7db914f: 색 스킴 기호선택(foundation preset) 인프라 추가 — 모티프(래퍼 CSS·shape)는 공유하고 foundation 색만 갈아끼우는 구조.

  - **tokens**: `FoundationPreset` 타입 신규 export + `StyleGuideTokens`에 `foundationPresets` / `defaultFoundationKey` 선택 필드 추가.
  - **core**: `resolveFoundationPreset(sg, key)` 순수함수 신규 export + `StyleGuideProvider`에 `foundationKey` prop(및 `data-bbangto-foundation` 속성) 추가. 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순 fallback.

  모두 선택 필드/prop이라 하위호환된다(기존 소비처 무변경 동작).

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

## 0.4.0

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
  - @centurio1987/bbangto-ui-themes@0.2.0

## 0.3.0

### Minor Changes

- 아키타입 포화(archetype saturation) — 43개 UI 카테고리에 걸쳐 86개의 신규 variant/layout 멤버 추가.

  21st.dev 레퍼런스를 열람해 카테고리별로 구조적으로 구별되는 디자인 아키타입을 소진했습니다. W0(파일럿)~W5(패턴) 6개 wave로 나눠 discover→harvest→cluster→implement 파이프라인을 반복했으며, 전체 게이트(typecheck, build, Playwright 608/608, unit 115/115, storybook build)가 green 상태입니다.

  신규 prop 축 12개 도입, 모든 축은 default-first(기존 호출부 하위호환). 44개 카테고리별 감사 매니페스트(`packages/core/catalog/*.audit.md`) 포함.
