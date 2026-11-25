---
'@centurio1987/bbangto-ui-visualization': minor
---

관계선 라벨을 그린다 — 템플릿이 데이터로 받고도 버리던 라벨 칸이 그림에 나온다(KAN-082.1, 상류 이슈 P7 · P8 · P11 ②).

- `Edge` — `label` 을 그린 경로의 가운데(경로를 따라 잰 길이의 절반)에 `EdgeLabel` 바탕과 함께 그린다. 예전에는 받고 버렸다. `fromLabel` · `toLabel` 을 새로 받아 선 양 끝 근처(가로선은 위, 세로선은 왼쪽)에 그리고, `labelFontSize` 로 글자 크기를, `labelOffset: { x, y }` 로 가운데 라벨 위치를 고른다(타입 `EdgeLabelOffset`).
- 템플릿 — 아키텍처 · 블록 · BPMN 둘 · C4 다섯 · ER · Flowchart · State · UML 컴포넌트 · 배포 · Class 가 라벨 칸을 넘긴다. C4 관계선은 「설명 [기술]」 한 줄이다. 이 템플릿들의 관계 데이터는 `labelOffset` 도 받는다(라벨을 따로 그리는 C4SystemLandscapeDiagram · BPMN 메시지 흐름도 같다).
- ClassDiagram — 클래스 `stereotype` 을 «…» 로, 관계 이름과 양 끝 다중성(`fromLabel` · `toLabel`)을 그린다. 포함 · 집합은 전체 쪽(`from`)에 마름모만 붙고 부분 쪽 화살촉이 없어졌다.
- `EdgeLabel` — 바탕 상자 크기를 재는 `edgeLabelBox` 를 함께 낸다. 라벨 글에 줄바꿈(`\n`)이 있으면 줄마다 그린다. C4 관계선 글은 「설명」 아래 「[기술]」 두 줄이다(KAN-082.1 검토에서 고름).
- 마커 — 모든 마커가 `orient="auto-start-reverse"` 다. 시작 끝(markerStart)의 마름모 · ER 카디널리티가 노드 안에 그려지던 것을 노드 바깥으로 고쳤다. 화살촉 기준점(refX)을 그린 끝에 맞추고, 선 끝은 노드 테두리 굵기 2.5 까지 그 바깥에 오게 했다 — 화살촉이 노드 테두리를 파고들지 않는다. ER 까마귀발(many · oneOrMany · zeroOrMany)은 갈래가 엔티티 쪽으로 벌어지게 바로잡았다(예전에는 반대로 벌어져 화살촉처럼 보였다).

**바뀌는 그림**: 이 칸들을 채워 두었던 소비자는 새 버전에서 그 글자가 그림에 나타난다. 포함 · 집합 관계의 부분 쪽 화살촉이 사라진다. 선 끝이 노드 테두리에서 0.5 안팎 더 떨어지고 화살촉이 끝에 딱 맞는다. ER 시작 쪽 카디널리티가 엔티티 바깥으로 나오고 까마귀발 방향이 바뀐다. 이미 라벨을 따로 그리던 템플릿(DataFlowDiagram · C4DynamicDiagram · C4SystemLandscapeDiagram 등)은 자리가 그대로다.

시험: `src/templates/edgeLabels.test.tsx`(Edge 를 쓰는 템플릿 33개 서버 렌더) · `src/geometry/routing.test.ts`(가운데 · 끝 라벨 자리) · Storybook `VISUALIZATION/Atoms` EdgeLabelAtMidpoint · `Templates/G3` ClassDiagramDeclaredFields · `Templates/Diagram Examples`.
