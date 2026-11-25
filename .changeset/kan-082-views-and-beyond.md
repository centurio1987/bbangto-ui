---
'@centurio1987/bbangto-ui-visualization': minor
---

SEI Views and Beyond 프레임 `ViewsAndBeyondFrame` 을 더한다(KAN-082.5).

- Module(코드 구조) · Component-and-Connector(런타임 구조) · Allocation(물리 배치 · 팀 배치) 세 영역을 가로로 놓는다. 영역마다 `slots` 의 중첩 도식을 먼저, 없으면 `data` 불릿을 그린다(Kruchten4Plus1View 와 같은 쓰는 법).
- 유형이 아니라 다른 도식을 담는 조합 프레임이라 유형 축(registry)에는 넣지 않는다 — Kruchten4Plus1View · ViewpointFrame 과 같다. 유형 수는 87 그대로다.

시험: `src/templates/viewsAndBeyond.test.tsx` · `src/typeMeta/registry.test.ts`(allowlist 4) · Storybook `Templates/G6-MetaFrames` ViewsAndBeyondSEI.
