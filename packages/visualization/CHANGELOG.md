# @centurio1987/bbangto-ui-visualization

## 0.2.0

### Minor Changes

- 3449f78: ORD-010: visualization 유형 인벤토리 P1 26종 구현(additive — 기존 타입 무변경).

  - 차트 템플릿: BarChart·LineChart·QuadrantChart·PieChart·RadarChart·RadialGauge·Treemap·SankeyDiagram·GanttChart·UserJourneyGantt·UserJourneyMap·GitGraph·PacketDiagram
  - 구조 템플릿: NetworkTopology·DataLineage·SitemapTree·NetworkGraph·ScreenFlow
  - 패턴: Venn·Pathways·GeoMap·BentoGrid·Sketchnote·PosterEditorial·SpectrumSlider + Cycle `spiral` 모드 추가(CycleMode union 확장)
  - 신규 atom: Axis·BandEdge / molecule: MockupNode
  - 신규 geometry(순수 함수 + vitest 단위 테스트): scale(linearScale/bandScale/niceTicks)·treemap(squarify)·venn·sankey·tree(tidyTreeLayout)
  - 6개 스타일 가이드는 계약 CSS(shape/edge)만으로 자동 커버 — 가이드 파일 무변경.

- c7fa242: ORD-011: visualization 유형 인벤토리 P2 22종 구현(additive — 기존 타입 무변경).

  - E 데이터 차트 템플릿: StackedBarChart·AreaChart·ScatterPlot·Histogram·DotPlot·WaterfallChart·Heatmap·ChoroplethMap(caller-supplied path)
  - A 엔지니어링 다이어그램 템플릿: UseCaseDiagram·C4DynamicDiagram·C4SystemLandscapeDiagram·DataFlowDiagram·ActivityDiagram(🔶 근사→전용 승격)
  - 관계/원인 템플릿: ConceptMap(🔶 근사→전용 승격)·Fishbone
  - 패턴: Funnel·ListInfographic·AnnotatedIllustration·SwotMatrix·OnionDiagram
  - 모드 확장(union 확장, 신규 export 아님): Cycle `flywheel`(VT-708)·Statistics `waffle`(VT-513)
  - 신규 molecule: ActorGlyph(UseCase 액터)
  - 신규 geometry(순수 함수 + vitest 단위 테스트): stack·histogram(binning)·waterfall·funnel(trapezoids)·fishbone(layout)
  - 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, Heatmap/Choropleth 강도는 팔레트색+fill-opacity 스케일. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).

- 3e2473c: ORD-012: visualization 유형 인벤토리 P3 11종 구현(additive — 기존 타입 무변경). 잔여 인벤토리 0(P1·P2·P3 전량 ✅).

  - E 데이터 차트 템플릿: Boxplot(VT-510)·ChordDiagram(VT-516)
  - A 엔지니어링 다이어그램 템플릿: UMLPackageDiagram(VT-102)·DMNDiagram(VT-124)·BPMNCollaborationDiagram(VT-123, 🔶 근사→전용 승격)·ArchiMateViewpointDiagram(VT-121)
  - C 계층 템플릿: WorkBreakdownStructure(VT-307, 🔶 근사→전용 승격)
  - F/G 패턴: InformationalInfographic(VT-604)·Iceberg(VT-704)·BusinessModelCanvas(VT-707, 표준 비대칭 9블록)·Honeycomb(VT-709)
  - 신규 geometry(순수 함수 + vitest 단위 테스트): boxplot(Tukey 5수 요약·outlier)·chord(비정방/음수/합0/self-chord/pad 초과 반환 규약)·iceberg(빙산 폴리곤 사다리꼴 밴드)·hexgrid(벌집 오프셋 패킹) + tree.ts `wbsNumbering`(다중 루트·순환 방어)
  - 신규 shape: Node `folder`(UML 패키지 탭) + DMN inline path 헬퍼(knowledgeSource 물결·bkm 모서리 컷)
  - 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, 면 구분은 팔레트색+fill-opacity. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).

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

- b632c67: 유형(what) 축 메타 인프라 + iso geometry 프리미티브 + G6 메타 프레임 (additive — 기존 타입 무변경).

  - **신규 서브패스 `./type-meta`**: `VizTypeMeta` registry(87종 전량 authored) + `selectVizTypes` soft-weighted selector + `type.manifest.json`. 루트 배럴 미오염(컴포넌트 소비자 번들 무영향). 스타일 축과 직교하는 "무엇을 그리나" 축.
  - **진짜 isometric geometry 트랙**: `geometry/isometric`(projectIso 30°투영·depth-sort·iso 커넥터·floor grid) 순수 함수 + `IsoPrism` atom + `IsometricScene` 템플릿. 텍스트 skew 없이 좌표 baking(접근성 불변식).
  - **G6 메타 구조 프레임 2종**: `Kruchten4Plus1View`(4+1 뷰) · `ViewpointFrame`(ISO/IEC/IEEE 42010) — 신규 paint 채널 0, 기존 Canvas/Boundary 재사용, 중첩 슬롯으로 타 프리셋 조합.

  모두 신규 export/서브패스. 기존 유형/스타일 계약 무변경.

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0

> 이 패키지는 `@centurio1987/bbangto-ui-diagram`(≤0.2.2)에서 rename됨(ORD-008, headless 아토믹 개편). 아래 0.2.2 이하 이력은 diagram 시절 기록이다.

## 0.2.2

### Patch Changes

- Updated dependencies [7db914f]
  - @centurio1987/bbangto-ui-tokens@1.1.0

## 0.2.1

### Patch Changes

- Updated dependencies [a45e32e]
  - @centurio1987/bbangto-ui-tokens@1.0.0

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
