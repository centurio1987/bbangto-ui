---
'@centurio1987/bbangto-ui-visualization': minor
---

배치 도식 보강 — 노드 중첩 · 종류 · artifact, C4 Deployment, C4 컨테이너 모양, 토폴로지 링크 라벨(KAN-082.3).

- `UMLDeploymentDiagram` — 노드가 `parent`(품는 노드 id) · `kind`(`device` · `executionEnvironment` → «device» · «executionEnvironment») · `stereotype` · `artifacts`(노드 위 파일 이름, 문서 모양 칩)를 받는다. 부모를 자식보다 먼저 그리고 자식이 있는 노드의 이름은 위쪽에 둔다. 좌표는 데이터가 준 그대로다(자동 배치 없음).
- `C4DeploymentDiagram` — 새 템플릿. 배포 노드(`nodes` — `technology` · `parent` 중첩 · `instances` 「×N」) 위에 컨테이너 인스턴스(`containers` — 올라간 노드 `node`)를 놓고, 관계는 다른 C4 도식과 같다(「설명」 아래 「[기술]」, `kind` · 범례). 유형 축에서는 VT-104(배포 도식)의 별칭 「C4 deployment」로 찾힌다 — 유형 수는 87 그대로다.
- C4 컨테이너 — `shape: 'database' | 'queue'` 면 DatabaseNode · QueueNode 모양으로 그린다(`C4ContainerShape`). 비우면 지금 C4 상자 그대로다.
- `NetworkTopology` — 링크가 `label` · `labelOffset` 을 받아 선 가운데에 그린다.

**바뀌는 그림**: 새 칸을 안 쓰면 그대로다.

시험: `src/templates/deployment.test.tsx` · `src/typeMeta/registry.test.ts`(템플릿 69 · export 88) · Storybook `Templates/Diagram Examples` 의 배포 · 런타임 짝.
