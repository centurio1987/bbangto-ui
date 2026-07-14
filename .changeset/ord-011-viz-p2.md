---
'@centurio1987/bbangto-ui-visualization': minor
---

ORD-011: visualization 유형 인벤토리 P2 22종 구현(additive — 기존 타입 무변경).

- E 데이터 차트 템플릿: StackedBarChart·AreaChart·ScatterPlot·Histogram·DotPlot·WaterfallChart·Heatmap·ChoroplethMap(caller-supplied path)
- A 엔지니어링 다이어그램 템플릿: UseCaseDiagram·C4DynamicDiagram·C4SystemLandscapeDiagram·DataFlowDiagram·ActivityDiagram(🔶 근사→전용 승격)
- 관계/원인 템플릿: ConceptMap(🔶 근사→전용 승격)·Fishbone
- 패턴: Funnel·ListInfographic·AnnotatedIllustration·SwotMatrix·OnionDiagram
- 모드 확장(union 확장, 신규 export 아님): Cycle `flywheel`(VT-708)·Statistics `waffle`(VT-513)
- 신규 molecule: ActorGlyph(UseCase 액터)
- 신규 geometry(순수 함수 + vitest 단위 테스트): stack·histogram(binning)·waterfall·funnel(trapezoids)·fishbone(layout)
- 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, Heatmap/Choropleth 강도는 팔레트색+fill-opacity 스케일. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).
