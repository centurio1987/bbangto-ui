<!-- # 목표
디자인 시스템 스토어를 만든다.

# 컨셉
이 스토어 사용자는 core pacakge에 theme을 제공해서 구상 디자인 시스템을 완성한다. core도 base layout이 달라질 수 있으므로, core theme에 따라 여러 개의 core를 제공한다. theme은 사용자가 직접 작성할수도 있지만, 이 프로젝트 레포에서 preset으로 몇 개를 제공해서 제공한다.

## Core package
base 레이아웃과 스타일, 로직을 포함하고 있는,컴포넌트 묶음이다. base 레이아웃 디자인에 따라, 여러 core theme을 제공한다. 

## Theme pacakge
base 

### Fallback theme
theme을 지정하지 않았을 때 기본 theme을 사용한다.

## 기술 사양
- react
- storybook
- pnpm
- pnpm workspace
- (그 외 필요한 것 있으면 ai agent가 제안)

## ai agent와 상의해서 결정해야 하는 것
- theme 인터페이스와 규격
- 디자인 원칙

### 미리 제공하는 디자인 원칙
- atomic system을 활용한다.
- 추상 컴포넌트를 만들어야 한다. 즉, 구체적 비즈니스 맥락이 아닌, 범용성에 초점이 맞춰져야 하고, 따라서, 인터페이스가 다소 복잡해질 수 있음을 감내한다.
- 컴포넌트 내부에 컨텐츠가 들어가는 경우, min-width를 우선적으로 고려한다. -->

# ORDER

## 신규 지시

_처리할 신규 지시가 없습니다._

## 처리 완료 (COMMITTED)

<!-- ORDER:COMMITTED id=ORD-001 status=done committed=2026-06-29 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-001 항목을 추가하세요. -->
### ORD-001 — StyleGuide 아키텍처 도입 (theme → style-guide 추상화 격상)

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
> ## 배경
> 어떤 디자인 컨셉을 잡느냐에 따라, 컴포넌트의 appearance는 달라진다.
> 단순히 border-radius나 color, border-width가 아니라, decoration 자체가
> 달라질 수 있다. 예를 들면, 마치 도형이 2개 겹쳐 있는 듯한 모습을 하고
> 있는 버튼을 생각해 보자. bbangto-ui는 variant라는 속성으로 이것을
> 표현할 수는 있겠지만, 하나의 통일성 있는 디자인으로 그룹화 할 수단이나 개념이 없다.
> 또한, 그룹화 한다고 해도, 현재 컴포넌트 각각의 variant를 디자인과 별개로, 독립적인 variant를 가지고 있다. 
> 
> 
> ## 목적
> 위 배경을 고려 하면, 지금 **theme** 만을 분리하여 provide 하는 구조로는 capability 한계가 있다. 따라서 provide의 대상이 **theme**이 아니라 **style-guide**여야 한다.
> 
> ### bbangto-ui의 정체성 강화
> - bbangto-ui에서 제공하는 design-system은 원형(architype)만을 제공한다.
> - 사용자가 구체적인 style-guide를 제공하거나 미리 준비된 preset catalog를 이용한다.
> - bbangto-ui가 style guide 양식에 맞는 구성을 위한 인터페이스를 제공해야 한다. 
> 
> ### Style Guide
> 다음의 구성요소로 이루어진다.
> 
> | 항목                   | 내용                                                                        | 실제 양식                            | 필수  |
> | -------------------- | ------------------------------------------------------------------------- | -------------------------------- | --- |
> | foundations          | design token을 정의한다.                                                       | css variable                     | O   |
> | extended foundations | 구체적 디자인 스타일을 실현하기 위한 요소인 visual motif를 반영하기 위해 확장 design token을 정의한다.     | css variable                     | X   |
> | wrapper component    | visual motif를 반영하기 위해, 원형 component를 wrapping 하는 wrapper component를 구현한다. | react component                  | X   |
> | pattern              | 폼 입력, 데이터 테이블 등 반복적으로 사용되는 UI 조합                                          | 여러 react component가 조립된 템플릿 레이아웃 | X   |
> | guideline            | 각 요소를 사용할 때의 Do's & Don'ts, 접근성 규칙                                        | 마크다운 문서                          | X   |
> 
> ### Style Guide Catalog
> 대표적인 디자인 스타일에 대한 preset 집합을 미리 구현하여 bbangto-ui에서 제공한다.

- 결과: StyleGuideTokens (tokens 패키지), StyleGuide + WrapperComponents + Patterns + themeToStyleGuide (core/StyleGuide.ts), StyleGuideProvider + useStyleGuide (core/StyleGuideProvider.tsx) 구현 및 export. pnpm typecheck + pnpm build 통과.
<!-- /ORDER:COMMITTED id=ORD-001 -->

<!-- ORDER:COMMITTED id=ORD-002 status=done committed=2026-06-29 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-002 항목을 추가하세요. -->
### ORD-002 — 카탈로그 preset 일반화(개인정보 제거 · 트렌드 인덱스 명명) + Visual Motif 6요소화

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER 1

- 스타일 가이드에 내 개인적인 내용(이름, 이메일, 내 포트폴리오, 회사 등등)을 포함하면 안된다.
- 명칭은 빵토 Bakery가 아니라 디자인 트렌드와 중복 방지를 위한 각 디자인 트렌드 별 인덱스(brutalism + xxxism + 01) 명으로 해야 한다.
- 각 카탈로그는 참조한 foundations, extended foundations, wrapper component, pattern, visual motif, guideline으로 구성한다.
- visual motif는 현재 빵토 Bakery의 Default 같은 구현 예시와 더불어, 대표 컴포넌트들을 대상으로 visual motif 스펙에 대한 설명을 포함한다.
- 구현 예시는 빵토 Bakery Default를 작성할 때 참고한 template을 토대로 만든다. 
```

- 결과: 개인정보 전면 제거 — 스타일 가이드 데모(`packages/core/src/styleGuides/bakeryPatterns.tsx`)의 실제 이메일/전화/블로그·실제 제품명을 가상(fictional) placeholder로 교체, 연락처는 라우팅 불가 `example.invalid`만. 회귀 방지로 (a) Storybook play 테스트 DOM/href 금지토큰 가드, (b) 저장소 전체 정적 grep 게이트 추가 → 누출 0건. 명칭은 디자인 분석 기반으로 표시명 `Neobrutalism_Editorial_01` / slug `neobrutalism-editorial-01` 확정(`Brutalism_Minimalism_01`은 사용자 예시였음). `StyleGuide`에 **Visual Motif**(`StyleGuide.ts`의 `VisualMotif`/`VisualMotifComponentSpec`) 추가, `bakeryVisualMotif`(대표 컴포넌트 Button/Card/Tag 스펙 + 구현 예시 `BakeryShowcase`) 신규 → 6요소 완성.
<!-- /ORDER:COMMITTED id=ORD-002 -->

<!-- ORDER:COMMITTED id=ORD-003 status=done committed=2026-06-29 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-003 항목을 추가하세요. -->
### ORD-003 — 스토리북 구조 개편 (ARCHETYPE / DIAGRAM / STYLE GUIDE CATALOG)

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER 2
스토리북 구조를 개편한다. 명칭은 더 적절한 것이 있으면 계획 중 제안하고 컨펌 받아라
ARCHETYPE
 |-- Foundations
 |-- Components
	 |-- Atoms
	 |-- Molecules
	 |-- Organisms
 |-- Blocks
 |-- Patterns

DIAGRAM
|-- ...

STYLE GUIDE CATALOG
|-- Brutalism_Minimalism_01
	|-- Referenced Foundations
	|-- Extended Foundations
	|-- Wrapper Components
	|-- Patterns
	|-- Guideline
	|-- Visual Motif
```

- 결과: 사이드바를 3대 최상위로 재편 — `ARCHETYPE`(Foundations[Motion/Shaders·Themes] / Components[Atoms·Molecules·Organisms] / Blocks / Patterns) · `DIAGRAM` · `STYLE GUIDE CATALOG/Neobrutalism_Editorial_01`(6요소 leaf), `Overview`(.mdx)는 최상단 안내 문서로 고정. 85개 스토리 meta title 재매핑 + `apps/storybook/.storybook/preview.tsx` storySort에 하위 순서까지 명시. 기존 `Templates/LandingPage` 스토리는 삭제(랜딩 개념을 Visual Motif가 흡수).
<!-- /ORDER:COMMITTED id=ORD-003 -->

<!-- ORDER:COMMITTED id=ORD-004 status=done committed=2026-06-29 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-004 항목을 추가하세요. -->
### ORD-004 — 스토리북 구조 컨셉에 따른 디렉토리 구조 검토 (결론: 현행 유지)

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER 3
order2에서 반영한 스토리북 구조의 컨셉에 따라, 디렉토리 구조도 변경 가능한 포인트가 있는지 살펴본다.
```

- 결과: 검토 후 **현행 유지(보류)** 결론. 스토리북 분류(`Components/{Atoms,Molecules,Organisms}`)와 일치시키려면 `packages/core/src/components/`(평면 ~57개)를 하위 디렉토리로 분할 가능하나 ≈62 경로 수정 필요(배럴 56 export + 내부 상호 import 18 + blocks/patterns의 `../components/*` import 44). 배럴 export·`tsup` 단일 엔트리·`package.json` exports·외부 소비자·Storybook은 디렉토리 위치를 알지 못해 무영향 → churn 실익 낮음. `styleGuides/` → `styleGuideCatalog/` 의미 정렬은 저위험 옵션으로 남김. 카탈로그 preset이 다수가 되는 시점에 재검토. 품질 게이트(`build`·`typecheck`·`test` 85파일/613테스트·storybook build·개인정보 grep) 전부 green.
<!-- /ORDER:COMMITTED id=ORD-004 -->

<!-- ORDER:COMMITTED id=ORD-005 status=done committed=2026-06-29 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-005 항목을 추가하세요. -->
### ORD-005 — Style Guide Catalog 후보 디자인 스타일/트렌드 조사·목록화

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER
style guide catalog에 포함할 만한 디자인 스타일과 디자인트렌드를 조사해서 수집하고 목록화 해줘. 해당 목록은 style guide catalog를 일괄 생성하는데 사용할거다.
```

- 결과: `packages/core/style-guide-catalog.md` 신규 생성. 2025–2026 UI/그래픽 디자인 트렌드를 웹 조사(Figma/Aesthetics Wiki/UX Planet 등)로 수집해 **23개 후보 스타일**을 목록화. 각 항목을 bbangto-ui `StyleGuide` 6요소(foundations/extendedFoundations/wrapperComponents/patterns/visualMotif/guidelines) 스키마로 곧장 인스턴스화하도록 명세: (1) 우선순위(P1~P3) 요약표 + 표시명/slug 명명 규칙, (2) 항목별 F/EF/W/PT/VM/G 생성 단서와 접근성 주의(저대비/모션) 표기, (3) 일괄 생성 참고(기준 구현 `styleGuides/`, 단일 출처 상수, 접근성·모션 게이트, 콘텐츠 정책), (4) 조사 출처 링크. 패밀리: 구조/raw · 깊이/material · 평면/체계 · 타이포/편집 · 노스탤지어 · 표현/에너지 · 테크/다크 · 정제/럭셔리.
<!-- /ORDER:COMMITTED id=ORD-005 -->

<!-- ORDER:COMMITTED id=ORD-006 status=done committed=2026-06-30 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-006 항목을 추가하세요. -->
### ORD-006 — theme→foundation 재편 · 카탈로그(foundation/style-guide) 분리 · pattern/block wrapping 인터페이스

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER
- archetype의 컴포넌트와 theme은 style guide에서 확장 가능하지만,
  pattern, block은 그렇지 않다. 이 또한 wrapping을 위한 interface를
  제공하는 것이 좋아 보인다.
  - foundation의 theme은 확장 가능한 형태다. 따라서 기본
  foundation(dark, light, high-contrast)를 제외하고는 storybook에서
  FOUNDATION CATALOG로 빼는게 맞다. 또한 theme이란 명칭 대신
  foundation으로 치환해라. 이건 코드 레벨에서도 마찬가지다.
  - 코드 레벨에서도 foundation catalog에 해당하는 내용은 core와 다른
  코드 영역으로 분리하고 npm package도 theme 대신 foundations로
  배포해야 한다.
  - style guide catalog에 정의된 각 style guide는 말
    그대로 사전에 정의한 style guide preset에 대한 카탈로그 이므로,
    core와는 분리 되어야 하고, npm package도 style-guide-catalog로
  별도 배포 되어야 한다.
```

- 결과: 4개 하위 지시를 단계적(Phase 1~4) 커밋으로 구현. 소비자 부재 → 후방호환 alias/shim 미제공(클린 rename).
  1. **pattern/block wrapping 인터페이스**: `StyleGuide`에 `wrapperBlocks`/`wrapperPatterns`(optional) 추가, `useWrapperComponent`/`useWrapperBlock`/`useWrapperPattern` hook 신규(wrapper 미정의 시 fallback=원형 반환). 기존 `wrapperComponents`·24 preset 무수정(후방호환).
  2. **theme→foundation 명칭 치환(코드 레벨)**: `BbangtoTheme`→`BbangtoFoundation`, `ThemeProvider`/`useTheme`→`FoundationProvider`/`useFoundation`(prop `theme`→`foundation`, DOM attr `data-bbangto-theme`→`data-bbangto-foundation`, motion reset 포함), `themeToStyleObject`/`CSSString`→`foundation*`, `mergeTheme`→`mergeFoundation`, `themeToStyleGuide`→`foundationToStyleGuide`. CSS prefix `--bbangto-`(브랜드 네임스페이스)·`StyleGuideTokens.foundations` 필드명은 유지. storybook 전역 툴바 `theme`→`foundation`(base 3종 light/dark/high-contrast로 축소).
  3. **foundation catalog 분리 배포**: `@centurio1987/bbangto-ui-themes` → `@centurio1987/bbangto-ui-foundations`로 패키지 rename. base 3종은 core(`core/src/foundations`)로 내장 이전 → core가 foundations를 의존하지 않는 단방향 그래프. 확장 foundation(amber 2 + external 74 = `foundationCatalog`)만 패키지에 잔류. 객체명 `*Theme`→`*Foundation`. storybook 신규 최상위 **FOUNDATION CATALOG**로 노출.
  4. **style guide catalog 분리 배포**: `core/src/styleGuides`(24 preset + 공통 빌더/bakery 데모)를 신규 패키지 `@centurio1987/bbangto-ui-style-guide-catalog`로 이전(`style-guide-catalog → core → tokens` 단방향). core 배럴에서 `styleGuides` export 완전 제거. 단 `StyleGuide` 타입/Provider/`foundationToStyleGuide`는 core 유지.
  - 검증: 각 Phase 후 `pnpm typecheck`/`build`/`test`(109파일/753테스트)/`pnpm --filter storybook build` green. core 단방향 의존 정적 게이트(`rg @…-(foundations|style-guide-catalog) packages/core/src` = 0) 통과. 신규/rename 4개 패키지 `publint` All good. changeset(core/tokens/foundations major, style-guide-catalog 0.1.0 초판) 추가. 참고: style-guide-catalog의 24 preset은 catalog foundation을 참조하지 않고 자체 `makeFoundations`로 인라인 작성 → style-guide-catalog↛foundations 간선 없음.
<!-- /ORDER:COMMITTED id=ORD-006 -->

<!-- ORDER:COMMITTED id=ORD-007 status=done committed=2026-06-30 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-007 항목을 추가하세요. -->
### ORD-007 — 2026 디자인 트렌드(제공 링크) + 2020–2025 연도별 디자인 트렌드 리서치·목록화

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER

https://www.figma.com/ko-kr/resource-library/web-design-trends/
https://www.behance.net/gallery/239027109/Design-Trends-2026?locale=ko_KR
https://www.adobe.com/express/learn/blog/design-trends-2026

위 링크는 2026년 디자인 트렌드 링크다. 참조하여 새로운 디자인 트렌드를 목록화 해라. 또한, 같은 방식으로 2020년부터 2025년 까지의 디자인 트렌드도 리서치하여 목록화 하라
```

- 결과: `packages/core/design-trends-2020-2026.md` 신규 생성([`style-guide-catalog.md`](packages/core/style-guide-catalog.md)의 시간축 보강 문서). **A. 2026 트렌드** — 제공 링크 3종(Figma 16 / Behance 10 / Adobe 5)을 병합·중복제거하여 22개 항목으로 정리(시각특징 + 출처[F/B/A] + 기존 카탈로그 slug 매핑). **B. 2020–2025 연도별** — 연도별 웹 리서치로 2020(8)·2021(4)·2022(3)·2023(4)·2024(4)·2025(7) 트렌드를 최초/정점 연도 기준 목록화(지속 여부 비고). **C. 카탈로그 갱신 요약** — 기존 23후보로 커버되는 트렌드 매핑 + 신규 후보 5종(`Bento_Modular_01`/`Kinetic_Typography_01`/`Spatial_3D_01`/`Humanist_Imperfect_01`/`Tactile_Texture_01`) + 횡단 관심사(지속가능·접근성·AI/대화·게이미피케이션)는 컴포넌트 스타일이 아니라 패턴(PT)/가이드라인(G)으로 흡수 권고. 16개 출처 링크 첨부. (문서 전용 산출물 → 빌드 그래프 무변경, 코드 품질 게이트 비대상 — ORD-005 선례 동일.) 참고: Adobe Express 링크는 WebFetch 2회 타임아웃 → 동일 도메인 WebSearch로 내용 수집·반영.
<!-- /ORDER:COMMITTED id=ORD-007 -->