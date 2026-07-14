---
'@centurio1987/bbangto-ui-visualization': minor
---

ORD-010: visualization 유형 인벤토리 P1 26종 구현(additive — 기존 타입 무변경).

- 차트 템플릿: BarChart·LineChart·QuadrantChart·PieChart·RadarChart·RadialGauge·Treemap·SankeyDiagram·GanttChart·UserJourneyGantt·UserJourneyMap·GitGraph·PacketDiagram
- 구조 템플릿: NetworkTopology·DataLineage·SitemapTree·NetworkGraph·ScreenFlow
- 패턴: Venn·Pathways·GeoMap·BentoGrid·Sketchnote·PosterEditorial·SpectrumSlider + Cycle `spiral` 모드 추가(CycleMode union 확장)
- 신규 atom: Axis·BandEdge / molecule: MockupNode
- 신규 geometry(순수 함수 + vitest 단위 테스트): scale(linearScale/bandScale/niceTicks)·treemap(squarify)·venn·sankey·tree(tidyTreeLayout)
- 6개 스타일 가이드는 계약 CSS(shape/edge)만으로 자동 커버 — 가이드 파일 무변경.
