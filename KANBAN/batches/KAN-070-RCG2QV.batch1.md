---
card: KAN-070-RCG2QV
batch: 1
created: 2026-10-10
branch: KAN-070-RCG2QV
status: 계획
steps: S1, S2, S3, S4
---

# KAN-070-RCG2QV 배치1 — 어느 선이 가이드 대시를 따르는지 게이트로 먼저 세우고 맞춘다

카드: [KAN-070-RCG2QV.md](../cards/KAN-070-RCG2QV.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치이자 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

work 가 넷이라 한 배치로 닫는다. 고치는 파일은 템플릿 28개와 패턴 1개로 많지만 대부분 속성 한 줄씩이다. 카탈로그 스타일 가이드 30개는 모두 실선(`''`)이라 이 배치가 끝나도 지금 있는 그림은 바뀌지 않는다.

## 1. 작업 패키지

### WP1 · `S1` Dash Gate 스토리 (구현 전 빨강)

| 파일 | 더하는 것 |
|---|---|
| `apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx` | 새 파일. 블루프린트 가이드를 펼쳐 `edge.dashPattern` 만 `7 3` 으로 바꾼 가이드 아래에서 Paint Gate 표본과 패턴 몇 개를 그리고, 계산된 `stroke-dasharray` 로 잰다 |

스토리 넷의 기대값:

| 스토리 | 무엇을 | 기대값 | 지금 |
|---|---|---|---|
| ① 표준 표기 템플릿 | 레지스트리 `standard` 태그 템플릿 표본 전부 | `<svg>` 에 `data-viz-notation`, 연결선 중 `7px, 3px` 0개 | 빨강 |
| ② 관계선 템플릿 | 비표준 관계선 템플릿 13개 | 템플릿마다 `7px, 3px` 연결선 1개 이상, `data-viz-notation` 없음 | 빨강(SitemapTree·WorkBreakdownStructure·IsometricScene) |
| ③ Flowchart 대비 | 같은 데이터에서 한 선만 `dashed` / 대시 선 없음 | 섞이면 실선 `none`·대시 `6px, 4px`, 없으면 `7px, 3px` | 섞인 쪽 빨강 |
| ④ 패턴 | TimelineRoadmap · ProcessSteps · Cycle · Hierarchy · Sketchnote | 축 `none`, 나머지 연결선 `7px, 3px` | 축 빨강 |

②의 13개는 Edge 를 쓰는 비표준 템플릿 10개(Architecture·Block·ConceptMap·DataFlow·DataLineage·Flowchart·Mindmap·NetworkGraph·NetworkTopology·ScreenFlow)와 새로 잇는 셋이다. Edge 를 쓰는 비표준 파일 15개 중 나머지 다섯(패턴 넷과 ProcessSteps 가 쓰는 StepConnector)은 Paint Gate 표본이 없어 ④에서 그린다.

**완료 기준**: 위 「지금」 칸대로 빨강이고, 그 밖의 Dash Gate 검사와 다른 스토리는 초록.

### WP2 · `S2` 구현

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/src/provider/contractCss.ts` | `[data-bbangto-viz-style-guide] [data-viz-notation] [data-viz-part="connector"] { stroke-dasharray: none; }` |
| 표준 템플릿 23개 파일 + `PacketDiagram.tsx` | `Canvas` 두 곳(children 모드·data 모드)에 `data-viz-notation`. 소비자 props 보다 앞에 둔다 |
| `templates/SitemapTree.tsx` · `templates/WorkBreakdownStructure.tsx` · `templates/IsometricScene.tsx` | 관계선 `<path>` 에 `data-viz-part="connector"` |
| `templates/Flowchart.tsx` | 데이터에 `dashed` 선이 하나라도 있으면 나머지 선에 `strokeDasharray="none"` |
| `patterns/TimelineRoadmap.tsx` | 축 `Edge` 에 `strokeDasharray="none"` |

**완료 기준**: S1 넷 초록, Paint Gate·Headless 를 포함한 viz 스토리 초록, viz typecheck 통과.

### WP3 · `S3` 문서

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/README.md` | 구현 규약 — 내부 훅 셋(`data-viz-part="shape"`·`"connector"`·`data-viz-notation`), 어느 선이 가이드 대시를 따르는가, Dash Gate, StepConnector 두 변형을 대시 가이드에서 섞을 때 주의 |
| `packages/tokens/src/visualization.ts` | `edge.dashPattern` JSDoc — 표준 표기 템플릿의 연결선은 제외 |
| `packages/visualization/style-classification.md` | 횡단 규칙 3 상태 문장 |
| `packages/visualization/src/provider/contractCss.ts` | 새 규칙 주석 |
| `.changeset/kan-070-connector-dash-scope.md` | visualization patch · tokens patch |

**완료 기준**: 네 문서와 changeset 이 같은 분류를 말한다. `git diff main...HEAD --stat -- packages/visualization-style-guide-catalog` 0줄.

### WP4 · `S4` 품질 게이트

`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit` 를 이 순서로 `bash -c` 에서 돌린다. 그 뒤 Dash Gate 파일만 `a11y: { test: 'error' }` 로 임시 강제해 돌리고 되돌린다.

**완료 기준**: 다섯 다 초록, a11y 강제 결과를 수행 내역에 적는다.

## 2. 의존과 순서

`S1 → S2` 는 고정이다. 게이트가 먼저 빨강이어야 구현이 무엇을 고쳤는지 보인다. `S3` 은 S2 에서 분류가 확정된 뒤 쓴다(구현 중 분류가 바뀌면 문서도 바뀐다). `S4` 는 셋이 다 끝난 뒤다.

배치 밖 의존:

- `dep-check --new KAN-070-RCG2QV` 에서 겹치는 미완료 루트가 0이다. 다만 다른 미완료 루트 넷은 scope 가 비어 있어 판정 대상이 아니다.
- **경로에 드러나지 않는 겹침 하나** — KAN-069(백로그, viz 미사용 토큰 정리)는 메모상 계약 스타일시트와 `packages/tokens/src/visualization.ts` 에 경계선 규칙·JSDoc 을 더할 카드다. 이 카드도 두 파일을 고친다. KAN-069 는 아직 착수 전이라, 이 카드가 먼저 병합되면 KAN-069 가 그 위에서 시작한다. 이 카드의 scope 는 병합 전까지 이 워크트리에만 있어 main 의 겹침 검사에 안 보인다.
- 지금 그림이 안 바뀌므로 다른 카드의 스토리 기대값에 영향이 없다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 레지스트리를 Storybook 에서 못 읽는다 | `type-meta` 서브패스 import 실패 | `pnpm build` 뒤 Storybook vite 캐시를 지운다(메모리 core-export-vite-cache). 그래도 안 되면 표준 이름 목록을 스토리에 적고, 목록과 레지스트리가 같은지를 vitest 단위 테스트로 본다 |
| 표준 템플릿 표본에 연결선이 없다 | ①의 연결선 검사가 처음부터 초록 | 훅 검사(`data-viz-notation`)는 여전히 빨강이어야 한다. 연결선 검사는 「있으면」으로 두고 훅 검사를 주로 삼는다 |
| `Canvas` 에 준 속성이 소비자 props 에 덮인다 | 소비자가 `data-viz-notation={undefined}` 를 넘기면 훅이 빠짐 | 훅을 `{...props}` 앞에 둔다. 소비자가 일부러 끄는 길로 남긴다 |
| 패턴을 그릴 데이터가 길다 | ④ 스토리가 커진다 | 기존 Patterns 스토리의 데이터를 줄여 옮긴다. 원래 스토리는 손대지 않는다 |
| 템플릿 28개를 고치며 다른 스토리가 깨진다 | Paint Gate·Structure 빨강 | 속성 추가뿐이라 칠·기하는 안 바뀐다. 깨지면 속성 위치(어느 요소에 붙었는가)를 먼저 본다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-070-RCG2QV/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**단일 에이전트(2026-10-10 유저 선택).** S1 → S2 → S3 → S4 를 한 세션이 차례로 한다. 마지막 work 를 다음 배치로 미루지 않는다 — S4 는 게이트 실행뿐이다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 템플릿 28개를 한 세션이 차례로 고친다. 속성 한 줄씩이라 시간보다 빠뜨림이 걱정인데, 그것은 S1 게이트가 잡는다. 빌드·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 1 | 3(S2 를 표준 템플릿 / 관계선·Flowchart·축 / 문서로 나눔) | 셋 다 같은 워크트리의 다른 파일이라 충돌은 없지만, 게이트를 각자 돌리면 `pnpm build`·Storybook 캐시를 동시에 건드린다. 나눠서 아끼는 시간(속성 몇십 줄)보다 맥락을 넘기는 비용이 크다 |
