# @centurio1987/core

## 0.3.0

### Minor Changes

- 아키타입 포화(archetype saturation) — 43개 UI 카테고리에 걸쳐 86개의 신규 variant/layout 멤버 추가.

  21st.dev 레퍼런스를 열람해 카테고리별로 구조적으로 구별되는 디자인 아키타입을 소진했습니다. W0(파일럿)~W5(패턴) 6개 wave로 나눠 discover→harvest→cluster→implement 파이프라인을 반복했으며, 전체 게이트(typecheck, build, Playwright 608/608, unit 115/115, storybook build)가 green 상태입니다.

  신규 prop 축 12개 도입, 모든 축은 default-first(기존 호출부 하위호환). 44개 카테고리별 감사 매니페스트(`packages/core/catalog/*.audit.md`) 포함.
