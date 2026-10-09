---
'@centurio1987/bbangto-ui-tokens': minor
'@centurio1987/bbangto-ui-visualization': minor
---

면 위 글자가 어느 스타일 가이드에서나 읽힌다(KAN-061).

Provider 가 면 토큰마다 그 위에 쓸 글자색을 `--bbangto-viz-on-*` CSS 변수로 함께 낸다.
대상 면은 `palette.p1~p8` · `shape.fill` · `canvas.bg` · `c4.l1~l3.bgTint` · `node.<kind>.fill` 이고, 이름은 면 경로를 따른다
(예: `palette.p2` 위 글자 → `--bbangto-viz-on-palette-p2`, `c4.l2.bgTint` → `--bbangto-viz-on-c4-l2-bg-tint`).
값은 가이드 글자색 넷(`edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg`) 중 처음으로 면과 4.5:1 을 넘는
것이고, 없으면 검정·흰색 중 대비가 큰 쪽이다. 반투명 면은 밑에 검정 음영이 깔려도 읽히는 쪽을 고른다.
`visualizationFoundationToStyleObject` 도 같은 변수를 함께 낸다.

### tokens

`VisualizationFoundation` 에 선택 필드 `on` 이 생겼다. 가이드가 여기 적은 글자색은 계산값을 이긴다
(예: `on: { palette: { p1: '#FFFFFF' } }`). 적지 않은 자리는 계산값이다. 기존 가이드는 고칠 것이 없다.

### visualization — 바뀐 동작

카탈로그 가이드 30개에서 글자 대비가 4.5:1 에 못 미치던 1538곳(템플릿 68개 표본 기준)이 모두 풀렸다.
그 대신 지금 읽히던 글자도 가이드에 따라 색이 바뀔 수 있다. 같은 면이면 어느 템플릿에서나 같은 글자색이 나온다.

- `NodeLabel` 기본 글자색: `edge.stroke` → `--bbangto-viz-on-shape-fill`. 보조 글자(`subtitle`)의 opacity 0.7 을 걷었다.
- `ClassBox` · `EntityTable` · `C4Box` · 의미 노드 7종(`PersonNode` 등): 기본 면 위 이름·태그·속성 글자가 그 면의 `on-*` 를
  쓴다. `fill` 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색(`edge.stroke`)을 둔다.
- 팔레트 면 위 글자: Treemap · WorkBreakdownStructure · PacketDiagram · StackedBarChart · UserJourneyGantt · Mindmap ·
  DMNDiagram · ArchiMateViewpointDiagram · Fishbone 머리 · C4DynamicDiagram 순번. `color`·`fill` 을 직접 주면 종전 글자색이다.
- 데이터마다 투명도가 바뀌는 면: Heatmap · ChoroplethMap(칸마다) · SankeyDiagram(리본 면 전부에서 읽히는 색 하나) ·
  ArchiMateDiagram(35% 계층 면). Provider 의 foundation 값으로 계산한다.
- 흐리게 쓰던 보조 글자의 opacity 를 걷었다: ER 속성 타입(0.6, 9px 로 구분) · QuadrantChart 사분면 이름(0.7) ·
  DataLineage 설명(0.8) · RequirementDiagram 표기·본문(0.6·0.8) · Treemap·PacketDiagram 값(0.85).
- RequirementDiagram 머리 띠(검정 6%) 위 글자는 띠를 얹은 면으로 고른다. IsometricScene 윗면 글자는 `on-shape-fill`.

props 와 export 는 그대로다.
