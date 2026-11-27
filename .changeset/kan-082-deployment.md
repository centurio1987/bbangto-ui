---
'@centurio1987/bbangto-ui-visualization': minor
---

배치 도식 보강 — 노드 중첩 · 종류 · artifact, C4 Deployment, C4 컨테이너 모양, 토폴로지 링크 라벨(KAN-082.3).

- `UMLDeploymentDiagram` — 노드가 `parent`(품는 노드 id) · `kind`(`device` · `executionEnvironment` → «device» · «executionEnvironment») · `stereotype` · `artifacts`(노드 위 파일 이름, 문서 모양 칩)를 받는다. 부모를 자식보다 먼저 그리고 자식이 있는 노드의 이름은 위쪽에 둔다. 좌표는 데이터가 준 그대로다(자동 배치 없음).
- `C4DeploymentDiagram` — 새 템플릿. 배포 노드(`nodes` — `technology` · `parent` 중첩 · `instances` 「×N」) 위에 컨테이너 인스턴스(`containers` — 올라간 노드 `node`)를 놓고, 관계는 다른 C4 도식과 같다(「설명」 아래 「[기술]」, `kind` · 범례). 유형 축에서는 VT-104(배포 도식)의 별칭 「C4 deployment」로 찾힌다 — 유형 수는 87 그대로다.
- C4 컨테이너 — `shape: 'database' | 'queue'` 면 DatabaseNode · QueueNode 모양으로 그린다(`C4ContainerShape`). 비우면 지금 C4 상자 그대로다.
- `NetworkTopology` — 링크가 `label` · `labelOffset` 을 받아 선 가운데에 그린다.
- 배포 도식 두 템플릿(`UMLDeploymentDiagram` · `C4DeploymentDiagram`)은 그리기 전에 상자를 맞춘다. 좌표는 데이터가 준 그대로이고, 자식(C4 는 올라간 컨테이너 포함)이 부모 밖으로 나가거나 부모의 이름 · 스테레오타입 · 기술 글자 띠 안으로 들어오면 부모 상자가 자식을 여백과 함께 담도록 커진다. artifact 칩은 자식 아래에 놓이고, 상자 폭은 이름 · 칩 · 인스턴스 수(×N) 글자보다 좁아지지 않으며, 긴 이름은 줄 수를 자르지 않고 다 그린다. 데이터가 이미 맞으면 상자는 그대로다. 형제 상자끼리 겹치는 것은 옮기지 않는다(KAN-082.3 검토 2번).

**바뀌는 그림**: 새 칸을 안 쓰면 그대로다. 다만 자식이 있는 UML 배포 노드의 스테레오타입 · 이름은 큐브 윗면 모서리 선에 걸치지 않도록 7 · 6 아래로 내려 그린다.

시험: `src/templates/deployment.test.tsx` · `src/geometry/nesting.test.ts` · `src/typeMeta/registry.test.ts`(템플릿 69 · export 88) · Storybook `Templates/Diagram Examples` 의 배포 · 런타임 짝 · `Templates/G2` 의 「좌표가 어긋난 데이터」 두 예시.
