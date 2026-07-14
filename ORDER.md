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

<!-- ORDER:COMMITTED id=ORD-010 status=done committed=2026-07-14 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-010 항목을 추가하세요. -->
### ORD-010 — visualization 유형 인벤토리 P1 26건 구현

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER
P1 구현을 위한 계획을 세우고 실행해
```

- 결과: `visualization-type-inventory.md` §5 P1 항목 **26건 전량 구현**(§7의 "총 27/E=8"은 집계 오기 — 실측 26·E=7, 이번에 정정). 외부 검토(codex gpt-5.5 / Gemini) 반영 플랜, 7 웨이브 RED→GREEN 17커밋. 공통 계약(props/data 속성/접근성/엣지케이스) 선고정 + geometry 순수 함수는 vitest 단위 테스트, 컴포넌트는 storybook play() 이원화.
  - **신규 geometry**(vitest 단위 32): `scale`(linearScale/bandScale/niceTicks)·`treemap`(squarify)·`venn`(2원 정밀·3원 대칭 근사)·`sankey`(acyclic 오프셋)·`tree`(tidyTreeLayout). **신규 atom**: `Axis`·`BandEdge`. **신규 molecule**: `MockupNode`.
  - **차트 템플릿 13**: `BarChart`(VT-501)·`LineChart`(VT-503)·`QuadrantChart`(VT-702)·`PieChart`(VT-506)·`RadarChart`(VT-511)·`RadialGauge`(VT-519)·`Treemap`(VT-507)·`SankeyDiagram`(VT-515)·`GanttChart`(VT-403)·`UserJourneyGantt`(VT-404)·`UserJourneyMap`(VT-205)·`GitGraph`(VT-129, 직선 merge)·`PacketDiagram`(VT-128).
  - **구조 템플릿 5**: `NetworkTopology`(VT-125)·`DataLineage`(VT-127)·`SitemapTree`(VT-304, elbow)·`NetworkGraph`(VT-305)·`ScreenFlow`(VT-206).
  - **패턴 7 + Cycle 확장**: `Venn`(VT-306)·`Pathways`(VT-208)·`GeoMap`(VT-605, caller-supplied path)·`BentoGrid`(VT-607)·`Sketchnote`(VT-608, 지터 paint는 F4 이연)·`PosterEditorial`(VT-609)·`SpectrumSlider`(VT-710) + `Cycle` `spiral` 모드(VT-405, additive union).
  - 6개 스타일 가이드는 계약 CSS(shape/edge)만으로 자동 커버 — 가이드 파일 무변경. 신규 paint 채널·토큰 슬롯 없음.
  - 검증: 게이트 전부 green — typecheck/build/**test 1051개**(기존 1006 → +45, 스토리 파일 149)/storybook build + **unit 32**(신규 geometry) + publint All good. changeset(viz minor — additive, 기존 타입 무변경). 문서: inventory §5 26행 ✅·§6 역방향 표 전수·§7 재계산(오기 정정)·PLAN §D G5 완료 노트.
  - 커버리지 개선: 구현률 데이터 차트 5%→45%·인포그래픽 18%→55%·개념 프레임워크 10%→40%. P1 잔여 0.
  - 이연: `XYChart`(Bar/Line로 대체), G6 메타 프레임(Kruchten/Viewpoint), P2/P3 백로그.

<!-- ORDER:COMMITTED id=ORD-009 status=done committed=2026-07-13 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-009 항목을 추가하세요. -->
### ORD-009 — 신규 파악 preset들 visualization style guide catalog 추가

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
```text
# ORDER

새로 파악한 preset들 visualization의 style guide catalog에 추가해
```

- 결과: `style-classification.md`(88장 사진별 재분류, ORD-008 후속)에서 새로 파악된 preset들을 외부 검토(Gemini 2회) 반영 플랜으로 구현. 커밋 6개(f616bf2/9b3fce2/1da9ebf/391a5e1/d8958d4/ea0263b + 봉인 커밋). TDD — RED(MISSING_EXPORT 3건 실측) → GREEN.
  1. **신규 스타일 가이드 3종** (`@centurio1987/bbangto-ui-visualization-style-guide-catalog`):
     - **Corporate_Schematic_01** (F2, 24장 최대 갭 해소) — 흰 그라운드 + 중립 헤어라인 1.25px + kind별 플랫 액센트 타일(브랜드 hex/아이콘 금지 — 중립 조정값) + 대시 존 경계. **kind별 tagColor 혼용**(오렌지·그린 타일 위 흰 텍스트 4.5:1 미달 실측 → 다크 텍스트). colorway `default`/`slide-dark`.
     - **Ink_Line_Duotone_01** (F5, 신규 발견 패밀리) — 균일 1.75px 클린 모노라인, 블랙 도형 잉크 + 블루 엣지 잉크 2잉크 역할 분리, container만 라이트 틴트. colorway `default`/`slate`. `makeVizColorway`에 `edge.stroke` override 추가(색 전용 불변식 유지).
     - **Neon_Gradient_Dark_01** (F7, 신규 분리 패밀리) — 코어 무변경: wrapper가 `<defs><linearGradient>`를 인라인 주입(defsPrefix+useId 이중 유일 id, stop-color=CSS var → colorway 반응), 글로우/다크 그라디언트 그라운드는 `useVizMotifStyle` 스코프 CSS, 그라디언트 면 위 텍스트 금지 → 외부 라벨+리더 틱 NeonTag. colorway `default`/`aurora`. foundation fill은 램프 대표 hex 유지 → 기존 게이트 전부 호환.
  2. **기존 가이드 preset 보강**: Minimal_Line_01 `editorial`(F1 최빈 서브모드 — 레드 #E8321F는 텍스트 대비 미달 실측이라 그래픽 전용 + #B3271A 대안 명시) · Colorful_Flat_01 `bento-dark`(블랙+피치/오렌지 램프, 단일 다크브라운 tagColor 전 kind 4.5:1 실측).
  3. **스토리북**: 신규 thin 스토리 3파일(5-leaf × 3 = 15 스토리), `makeVizCatalogStories`에 `wrapperExtraPlay` 옵션 — Neon 전용 그라디언트 게이트(defs 부모·id 유일성 Set·url(#id) 참조 무결성). storySort inline 리터럴 3행 추가. 카탈로그 6종 × 5-leaf.
  4. **모든 신규 hex는 WCAG 대비 산술 검증 후 확정**(ink 4.5/edge 3.0/tagColor-vs-fill 4.5) — 플랜 단계 계산값이 play 게이트 실측으로 재확인됨.
  - 검증: 게이트 4종 전부 green — typecheck/build/test **1021개**(기존 1006→+15)/storybook build. changeset(viz-catalog minor — 코어 패키지 무변경) 추가. 문서 갱신: `style-classification.md` 매핑 표 구현✓, `visualization-catalog.md` §4 표 + 4-f/4-g/4-h.
  - 이연 유지(기술 블로커): F4 Marker_Sketchnote(지터 seeded 렌더·손글씨 폰트·질감 토큰화), F6 Iso_ColorBlock(iso geometry).
<!-- /ORDER:COMMITTED id=ORD-009 -->

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

<!-- ORDER:COMMITTED id=ORD-008 status=done committed=2026-07-12 -->
<!-- 봉인 구획: 편집 금지. 철회하려면 신규 지시에 reverts=ORD-008 항목을 추가하세요. -->
### ORD-008 — DIAGRAM → VISUALIZATION 개편 (headless 아토믹 + 스타일 가이드 주입)

<!-- 원문(verbatim): 아래 블록은 신규 지시 영역의 원본을 그대로 보존한다. 수정 금지. -->
> # ORDER
> 현재 diagram으로 단독 디자인 시스템으로 존재하는 영역을 visualization으로 명명하고 구조를 개편하려고 한다.
>
> ## 구조
> - 구조는 archetype처럼 **아토믹 디자인 시스템**을 사용한다. **diagram**이나 **infographic** 유형을 **아토믹 디자인 시스템**의 **템플릿**으로 구조화 한다.
> - **diagram-references**를 참고하여 **pattern**도 파악한 후, 구현한다.
> - **아토믹 디자인 시스템**과 **pattern**에 포함되는 구현물은 **headless component**로 구현한다.
> - 구상 디자인 시스템은 **archetype design system**에 **스타일 가이드**를 주입하여 구현한다.
> - **스타일 가이드**는 기존에 존재하는 **스타일 가이드**처럼, **foundations**, **guideline**, **wrapper components**를 구현해야 한다.
> - **스타일 가이드 카탈로그**는 스토리 북에, 기존의 **스타일 가이드 카탈로그**처럼 **foundations**, **guideline**, **wrapper components**, **visual motif**, **foundation preset**을 구현해야 한다.
>
> ## 아토믹 디자인 시스템을 구성할 컴포넌트를 정의, 설계 구현하고, 스타일 가이드 카탈로그 정의, 설계 구현하기 위한 방법
> - **diagram-references**를 참고하여, 계획을 세운다. 하나의 diagram과 infographic을 하나의 템플릿이나 pattern 단위로 삼고, 그를 구성하는 컴포넌트를 원자, 분자 단위로 구성한다.
> - 디자인 스타일 단위로 스타일 가이드를 정의, 설계, 구현한다.

- 결과: 사용자 확정(파일럿 우선 · minimal+colorful 우선 · Blueprint 승격 · core 비의존 자체 Provider) + 외부 검토 2회(Gemini) 반영 후 Phase R~5로 구현. 커밋 7개(298f353/66f1b69/9f165b8/8c8941c/2bddaa8/4fa2a01 + 봉인 커밋).
  1. **Phase R 목록화**: `diagram-references/` 88장 전수 분석 → [`packages/visualization/visualization-catalog.md`](packages/visualization/visualization-catalog.md) — 템플릿 매핑+갭 / 패턴 인벤토리+원자·분자 분해표 / 신규 컴포넌트 후보 / 스타일 가이드 4종 스펙(isometric·hand-drawn은 구현 이연). 이 목록이 정의→설계→구현의 단일 출처.
  2. **rename**: `packages/diagram` → `packages/visualization`(`@centurio1987/bbangto-ui-visualization` 0.1.0, 클린 rename — ORD-006 선례), `nodes/`→`molecules/`, `presets/`→`templates/`, 스토리북 `DIAGRAM`→`VISUALIZATION` 계층.
  3. **headless 전환**: atoms/molecules 전량 — 리터럴 paint 제거, 계약 스타일시트(`contractCss.ts`)가 시맨틱 속성(`data-viz-part` 등)→`--bbangto-viz-*` 토큰 바인딩, 명시 prop만 인라인 style(오버라이드 우선). cube 음영은 검정 오버레이+fillOpacity로 교체. Provider 부재 시 구조만 렌더(headless 증명 테스트), blueprint 하 computed 값은 구 리터럴과 동일(시각 무회귀 실측).
  4. **스타일 가이드 인프라**: tokens에 `VisualizationFoundation`(+`shape` 그룹)/`VizFoundationPreset`/`VisualizationStyleGuideTokens`, visualization에 `VisualizationStyleGuide`+`VisualizationStyleGuideProvider`(+`useVizFoundation`/`useVizWrapperComponent`/`useVizDefsPrefix`) — core StyleGuide 구조 미러, core 비의존 유지. 다중 Provider 공존+defs id 고유성 테스트 포함.
  5. **패턴 6종 구현**(스필오버 금지 규칙 준수): ProcessSteps/Comparison/TimelineRoadmap/Hierarchy/Cycle/Statistics + 신규 atoms 9종(StatNumber·IndexBadge·IconBadge·RingSegment·ProportionBlock·PictographUnit·MilestoneMarker·PyramidLayer·VsDivider) + molecules 3종(StepConnector·CalloutLeader·StatCard) + `geometry/layout.ts`. 값 텍스트 병기·DOM 순서 일치 등 접근성 규칙 반영.
  6. **카탈로그 분리 배포**: 신규 `@centurio1987/bbangto-ui-visualization-style-guide-catalog`(0.1.0) — **Blueprint_Technical_01**(blueprintTheme verbatim 승격, paper/whiteprint preset) · **Minimal_Line_01**(hairline 라인아트, default/slate) · **Colorful_Flat_01**(navy 아웃라인+flat fill, default/candy). 각각 foundations/foundation presets(≥2)/wrapper components(Node·Tag·EdgeLabel)/guidelines(접근성 포함)/visual motif(스펙+합성 쇼케이스) 완비.
  7. **스토리북**: `VISUALIZATION STYLE GUIDE CATALOG` 5-leaf(Foundations/Wrapper Components/Guideline/Visual Motif/Foundation Presets) 팩토리 `_vizCatalogStory.tsx` + play 게이트(FORBIDDEN·대비 4.5:1/3:1·preset 불변식) + TemplateStyleMatrix(파일럿 3 템플릿 × 3 가이드 var 해석 상이 실측) + 26개 템플릿 전 스토리 paint 해석 게이트.
  - 검증: 게이트 4종 전부 green — typecheck/build/test **1006개**(기존 974→+32)/storybook build, 신규·rename 패키지 publint All good. changeset 추가(tokens·visualization·viz-catalog minor, diagram 삭제 기록).
  - 이연(후속 ORDER): isometric/hand-drawn 스타일 가이드 구현, 파일럿 외 23개 템플릿 리터럴 제거·3-스타일 검증, 신규 템플릿 갭(SitemapTree 등), G5 차트/G6 메타 프레임.
<!-- /ORDER:COMMITTED id=ORD-008 -->