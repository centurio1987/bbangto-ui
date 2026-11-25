---
'@centurio1987/bbangto-ui-visualization': minor
---

관계선 라벨을 그린다 — 템플릿이 데이터로 받고도 버리던 라벨 칸이 그림에 나온다(KAN-082.1, 상류 이슈 P7 · P8 · P11 ②).

- `Edge` — `label` 을 그린 경로의 가운데(경로를 따라 잰 길이의 절반)에 `EdgeLabel` 바탕과 함께 그린다. 예전에는 받고 버렸다. `fromLabel` · `toLabel` 을 새로 받아 선 양 끝 근처(가로선은 위, 세로선은 왼쪽)에 그리고, `labelFontSize` 로 글자 크기를, `labelOffset: { x, y }` 로 가운데 라벨 위치를 고른다(타입 `EdgeLabelOffset`).
- 템플릿 — 아키텍처 · 블록 · BPMN 둘 · C4 다섯 · ER · Flowchart · State · UML 컴포넌트 · 배포 · Class 가 라벨 칸을 넘긴다. C4 관계선은 「설명 [기술]」 한 줄이다. 이 템플릿들의 관계 데이터는 `labelOffset` 도 받는다(라벨을 따로 그리는 C4SystemLandscapeDiagram · BPMN 메시지 흐름도 같다).
- ClassDiagram — 클래스 `stereotype` 을 «…» 로, 관계 이름과 양 끝 다중성(`fromLabel` · `toLabel`)을 그린다. 포함 · 집합은 전체 쪽(`from`)에 마름모만 붙고 부분 쪽 화살촉이 없어졌다.
- `EdgeLabel` — 바탕 상자 크기를 재는 `edgeLabelBox` 를 함께 낸다.

**바뀌는 그림**: 이 칸들을 채워 두었던 소비자는 새 버전에서 그 글자가 그림에 나타난다. 포함 · 집합 관계의 부분 쪽 화살촉이 사라진다. 이미 라벨을 따로 그리던 템플릿(DataFlowDiagram · C4DynamicDiagram · C4SystemLandscapeDiagram 등)은 자리가 그대로다.

시험: `src/templates/edgeLabels.test.tsx`(Edge 를 쓰는 템플릿 33개 서버 렌더) · `src/geometry/routing.test.ts`(가운데 · 끝 라벨 자리) · Storybook `VISUALIZATION/Atoms` EdgeLabelAtMidpoint · `Templates/G3` ClassDiagramDeclaredFields · `Templates/Diagram Examples`.
