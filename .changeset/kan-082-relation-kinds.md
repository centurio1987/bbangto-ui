---
'@centurio1987/bbangto-ui-visualization': minor
---

화살표 종류와 범례 — 한 도식에 뜻이 다른 화살표를 섞으면 선 모양으로 갈리고 범례 한 줄로 그 뜻을 읽는다(KAN-082.2, 상류 이슈 P11 ①).

- `RELATION_KINDS` — 관계선의 뜻 열 가지(호출 · 비동기 메시지 · 데이터 이동 · 제어 흐름 · 배치 · 네트워크 연결 · 의존 · 상속 · 포함 · 집합). `RELATION_LINE_STYLES` 가 종류마다 대시와 양 끝 화살촉을 정하고(열 가지가 모두 다르다, 실선은 `none` 으로 고정), `RELATION_KIND_NAMES` 가 범례 이름이다. `relationEdgeProps(kind)` 는 Edge 에 넘길 속성과 공개 훅 `data-bbangto-viz-relation-kind` 를 낸다.
- `LegendBlock` — 관계선 범례 molecule. 견본 선을 Edge 로 그려 템플릿 선과 같은 매핑을 읽는다. `legendBlockSize` · `relationLegendBox` 로 템플릿이 범례를 놓는다.
- 템플릿 — C4 다섯(컨텍스트 · 컨테이너 · 컴포넌트 · 코드 · 시스템 지형) · UMLComponentDiagram · UMLDeploymentDiagram · ArchitectureDiagram · NetworkTopology 의 관계 데이터가 `kind` 를 받는다(템플릿마다 쓰는 종류만 — `C4RelationKind` · `UMLComponentRelationKind` · `UMLDeploymentRelationKind` · `ArchRelationKind` · `TopologyLinkKind`). 쓰인 종류가 둘 이상이면 노드 아래에 범례를 붙이고, 데이터 `legend` 로 위치 · 이름을 바꾸거나 `false` 로 끈다. 자동 viewBox 를 쓰는 템플릿은 범례까지 담도록 넓어진다.
- 상류 이슈 P11 ① — `classRelationshipLineStyle`(ClassDiagram 관계 매핑) · `erCardinalityMarker`(ERDiagram 카디널리티 마커)를 낸다. 두 템플릿이 그것을 쓴다.
- `EdgeLabel` — 바탕 상자 폭이 한글 · 한자 · 가나를 1em 으로 어림한다(예전에는 모든 글자 0.6em 이라 한글 라벨 양 끝에 선이 비쳤다).

**바뀌는 그림**: `kind` 를 안 적은 관계는 그대로다. 한글 선 라벨의 바탕 상자가 글자 폭만큼 넓어진다.

시험: `src/atoms/relationKind.test.tsx`(목록 · 매핑 · 템플릿 아홉의 견본 선 = 템플릿 선) · Storybook `VISUALIZATION/Molecules` LegendBlockAllKinds · `Templates/Diagram Examples` RuntimeMixedArrowsWithLegend.
