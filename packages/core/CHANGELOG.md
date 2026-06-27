# @centurio1987/core

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
