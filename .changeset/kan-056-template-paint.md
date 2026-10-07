---
'@centurio1987/bbangto-ui-visualization': patch
---

템플릿 13개가 기본 채움·선 색까지 스타일 가이드를 따른다(KAN-056).

`ArchitectureDiagram` · `ArchiMateDiagram`(계층별 래퍼 포함) · `BlockDiagram` · `BPMNDiagram` · `BPMNCollaborationDiagram` ·
`C4CodeDiagram` · `KanbanBoard` · `Mindmap` · `RequirementDiagram` · `TimelineDiagram` · `UMLComponentDiagram` ·
`UMLDeploymentDiagram` · `UMLSequenceDiagram` 이 기본 색을 리터럴(`#FFFFFF` · `#111111` · `#555555` 등)로 넣고 있었다.
그 값이 인라인 style 로 렌더돼 계약 스타일시트를 이겼으므로, 스타일 가이드를 바꿔도 그 부분 색은 그대로였다.
이제 기본값을 넘기지 않고 `shape.*` · `edge.*` · `palette.*` · `boundary.labelColor` 토큰이 칠한다.
props 와 export 는 그대로이고, 명시한 `fill` · `stroke` 는 지금처럼 가이드를 이긴다.

### 바뀐 동작

다른 가이드에서는 위 템플릿의 이 부분이 이제 그 가이드 색을 따른다. 기본 가이드(Blueprint_Technical_01)에서는
흰 채움·검정 선이 토큰과 같은 값이라 그대로이고, 아래 여섯 곳만 눈에 띄게 바뀐다.

- `C4CodeDiagram` · `Mindmap` · `RequirementDiagram` 연결선: `#555555` → `edge.stroke`(blueprint `#111111`).
- `BPMNDiagram` 게이트웨이: `#FFF9C4` → `palette.p4`(blueprint `#E7E058`). `BPMNCollaborationDiagram` 과 같은 색이다.
- `BPMNDiagram` 끝 이벤트: `#FFCCBC` → `shape.fill`(blueprint `#FFFFFF`). 3px 테두리는 그대로다.
- `UMLDeploymentDiagram` 노드: `#E8EDF4` → `shape.fill`(blueprint `#FFFFFF`).
- `UMLSequenceDiagram` 메시지 라벨: `#333333` → `boundary.labelColor`(blueprint `#555555`). 머리 테두리·글자와 생명선은
  `edge.stroke` 를 따른다.
- `UMLSequenceDiagram` 참여자 머리 바탕: `palette.p2`(blueprint `#C5B6EE`) → `canvas.bg`(blueprint `#F9F8F6`). 파일럿
  `Lifeline` 원자와 같은 조합이다. 전에는 팔레트 면 위의 `#111111` 이름이 카탈로그 가이드 30개 중 11개에서 4.5:1 에
  못 미쳤고, 이제 30개 모두 4.5:1 이상이다.

`ArchiMateDiagram` 의 계층 면은 business `palette.p4` · application `palette.p5` · technology `palette.p6` 를 fill-opacity
0.35 로 칠한다. blueprint 에서는 원래 파스텔과 비슷한 밝기다(예: business `#FFF9C4` → 흰 바탕 위 `#F7F4C5`).
요소에 `fill` 을 명시하면 불투명 그대로다.
