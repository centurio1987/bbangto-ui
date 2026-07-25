# @centurio1987/bbangto-ui-tokens

## 1.2.0

### Minor Changes

- b632c67: 채택 메타데이터 통제 어휘 + WCAG 대비 유틸 신규 export (additive).

  - **메타데이터 어휘/타입**: `StyleGuideMeta`·`FoundationMeta` 타입과 통제 어휘 `STYLE_FAMILIES`·`STYLE_FAMILY_LABELS`·`DOMAINS`·`TAGS`를 `styleGuideMeta`/`foundationMeta`에서 신규 export. UI·viz·foundation 카탈로그가 공유하는 채택 메타 SSOT.
  - **WCAG contrast 유틸**(`contrast`): `contrastRatio`·`relativeLuminance`·`parseColor`·`extractColors`·`compositeOver`·`CONTRAST_THRESHOLDS`·`effectiveBgColors` + 타입 `RGBA`. 팔레트 토큰 실측 대비 계산의 범용 순수 수학(카탈로그 accessibility 감사가 소비).

  모두 신규 export라 하위호환. 기존 소비처 무변경 동작.

- 4fa2a01: ORD-008: DIAGRAM → VISUALIZATION 개편 — headless 아토믹 + 스타일 가이드 주입

  - **BREAKING(사전 1.0 클린 rename, shim 없음)**: `@centurio1987/bbangto-ui-diagram` 패키지는
    `@centurio1987/bbangto-ui-visualization`으로 대체·삭제되었다. `DiagramProvider`/`blueprintTheme`/`dvar`/
    `DiagramTheme`/`DiagramCanvas`/`DiagramMarkers` → `VisualizationStyleGuideProvider`/
    (카탈로그 `blueprintTechnical01VizStyleGuide`)/`vvar`/`VisualizationFoundation`/`Canvas`/`Markers`.
    CSS 변수 prefix `--bbangto-diagram-*` → `--bbangto-viz-*`, data 속성 `data-bbangto-diagram-*` → `data-bbangto-viz-*`.
  - tokens: `VisualizationFoundation`/`VizNodeSemanticKind`/`VizNodeSemanticStyle`/`VizFoundationPreset`/
    `VisualizationStyleGuideTokens` 타입 신설(+ foundation `shape` 그룹).
  - visualization: atoms/molecules 전량 headless 전환(계약 스타일시트 + 시맨틱 data-viz-part), 인포그래픽
    패턴 6종(ProcessSteps/Comparison/TimelineRoadmap/Hierarchy/Cycle/Statistics) + 신규 atom 9종/molecule 3종,
    `nodes/`→`molecules/`, `presets/`→`templates/` 아토믹 재매핑.
  - visualization-style-guide-catalog(신규 0.1.0): Blueprint_Technical_01(구 blueprintTheme 승격, paper/whiteprint) ·
    Minimal_Line_01(default/slate) · Colorful_Flat_01(default/candy) — 각각 foundations/foundation presets/
    wrapper components/guidelines/visual motif 완비.

## 1.1.0

### Minor Changes

- 7db914f: 색 스킴 기호선택(foundation preset) 인프라 추가 — 모티프(래퍼 CSS·shape)는 공유하고 foundation 색만 갈아끼우는 구조.

  - **tokens**: `FoundationPreset` 타입 신규 export + `StyleGuideTokens`에 `foundationPresets` / `defaultFoundationKey` 선택 필드 추가.
  - **core**: `resolveFoundationPreset(sg, key)` 순수함수 신규 export + `StyleGuideProvider`에 `foundationKey` prop(및 `data-bbangto-foundation` 속성) 추가. 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순 fallback.

  모두 선택 필드/prop이라 하위호환된다(기존 소비처 무변경 동작).

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

## 0.3.0

### Minor Changes

- 패키지 리네이밍 + 테마 통합

  모든 패키지에 `bbangto-ui-` 접두사 추가 및 5개로 분리됐던 테마 패키지를 단일 패키지로 통합.

  - `@centurio1987/core` → `@centurio1987/bbangto-ui-core`
  - `@centurio1987/tokens` → `@centurio1987/bbangto-ui-tokens`
  - `@centurio1987/hooks` → `@centurio1987/bbangto-ui-hooks`
  - `@centurio1987/diagram` → `@centurio1987/bbangto-ui-diagram`
  - `theme-light` + `theme-dark` + `theme-high-contrast` + `theme-amber` + `themes-external` → `@centurio1987/bbangto-ui-themes` (빌트인 5종 + 브랜드 프리셋 74종)
