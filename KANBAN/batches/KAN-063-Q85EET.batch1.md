---
card: KAN-063-Q85EET
batch: 1
created: 2026-10-08
branch: KAN-063-Q85EET
status: 계획
steps: S1, S2
---

# KAN-063-Q85EET 배치1 — 표본 누락 검사를 먼저 세우고 표본 68개를 채운다

카드: [KAN-063-Q85EET.md](../cards/KAN-063-Q85EET.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 두 검사가 그리는 템플릿 집합을 아직 바꾸지 않는다. 표본이 빠지면 빨강이 되는 검사를 먼저 세우고, 그 검사가 초록이 되도록 표본 68개를 한 파일에 모은다. 검사 범위를 넓히는 일은 배치2가 한다.

## 1. 작업 패키지

### WP1 · `S1` 표본 누락 검사

| 파일 | 더하는 것 |
|---|---|
| `packages/foundations/src/vizPaintGateCoverage.ts`(새 파일) | `templateExports(indexSource)` — `export { … } from` 줄에서 컴포넌트 이름을 뽑는다(`export type` 줄은 뺀다) · `fixtureTemplates(fixtureSource)` — 표본마다 붙은 `template: '이름'` 을 뽑는다 · `auditPaintGateCoverage(input)` — 누락·중복·없는 이름을 위반 목록으로 낸다 |
| `packages/foundations/src/vizPaintGateCoverage.test.ts`(새 파일) | 실제 저장소 검사 1건(`packages/visualization/src/templates/index.ts` ↔ `apps/storybook/src/stories/visualization/_paintGateFixtures.tsx`) + 실패 주입 셋(누락 · 같은 이름 두 번 · index 에 없는 이름) + 파서 확인(ArchiMate 줄 하나에서 넷이 나온다, `export type` 은 안 나온다) |

실패 메시지에는 빠진 템플릿 이름을 그대로 낸다. 새 템플릿을 만든 사람이 무엇을 더해야 하는지 바로 알게 하려는 것이다.

**완료 기준**: 실패 주입 셋과 파서 확인이 초록이다. 실제 저장소 검사는 표본 파일이 아직 없어 빨강이다.

### WP2 · `S2` 표본 68개

| 파일 | 더하는 것 |
|---|---|
| `apps/storybook/src/stories/visualization/_paintGateFixtures.tsx`(새 파일) | `PaintGateFixture { key, template, render }` 와 `PAINT_GATE_FIXTURES` 68개. matrix 24개는 `_matrixFixtures.tsx` 에서 key 로 가져와 이름만 붙이고, 스토리 안 7개는 옮기고, 새 37개를 더한다 |
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | 스토리 안의 표본 정의(`NEW_FIXTURES`·`REUSED_KEYS`)를 지우고 새 파일에서 가져온다. 두 검사가 그리는 집합은 그대로 둔다(리터럴 31개 · 글자 대비 13개) |

새 37개의 데이터 출처는 아래와 같다. 각 스토리에서 검증된 데이터를 요소 두세 개 수준으로 줄여 옮긴다.

| 출처 스토리 | 템플릿 |
|---|---|
| `G2Templates` | C4ComponentDiagram · C4ContextDiagram |
| `G4Templates` | ArchiMateDiagram(스토리 없음, Business 표본 데이터에 `layer` 를 준다) · ArchiMateApplicationDiagram · ArchiMateTechnologyDiagram · SysMLBlockDiagram · ZenUMLDiagram |
| `G5Charts` | GanttChart · QuadrantChart · RadialGauge · SankeyDiagram · UserJourneyGantt · UserJourneyMap |
| `G6MetaFrames` | Kruchten4Plus1View · ViewpointFrame(슬롯은 비워 둔다) |
| `ChartsP2` | AreaChart · ChoroplethMap · DotPlot · Histogram · StackedBarChart · WaterfallChart |
| `DiagramsP2` | ActivityDiagram · C4DynamicDiagram · C4SystemLandscapeDiagram · ConceptMap · UseCaseDiagram |
| `DiagramsP3` | ArchiMateViewpointDiagram · DMNDiagram · UMLPackageDiagram |
| `Structure` | DataLineage · GitGraph · NetworkGraph · NetworkTopology · PacketDiagram · ScreenFlow · SitemapTree |
| `IsometricGeometry` | IsometricScene |

**완료 기준**: S1 의 실제 저장소 검사가 초록이다. `pnpm typecheck` 가 통과하고, Paint Gate 스토리 둘이 이 배치 전과 같은 결과를 낸다.

## 2. 의존과 순서

`S1 → S2` 순차다. S1 의 실제 저장소 검사가 먼저 빨강이어야 S2 가 그것을 초록으로 바꾸는 흐름이 선다(저장소 규칙 「테스트 먼저」).

배치 밖 의존은 둘이다. 하나, 새 워크트리에서는 `pnpm typecheck` 전에 `pnpm build` 를 먼저 돌린다(Storybook 이 패키지 dist 를 읽는다). 둘, KAN-061 은 이 카드가 끝날 때까지 착수하지 못한다(직렬 기록, 이 카드가 선행).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 정적 검사가 `template:` 글자만 보고 실제로 그리는 컴포넌트와 어긋나도 통과한다 | 이름은 맞는데 다른 템플릿을 그리는 표본 | 새 표본은 같은 블록 안에 `<이름` JSX 가 있는지도 본다. matrix 에서 가져온 것은 그 key 가 `_matrixFixtures.tsx` 에 있는지 본다 |
| 슬롯을 받는 프레임 둘(Kruchten4Plus1View·ViewpointFrame)에 다른 템플릿을 넣으면 그 색까지 프레임 몫으로 잰다 | 프레임 표본에서 다른 템플릿의 위반이 나온다 | 슬롯을 비운다. 둘 다 슬롯이 선택이고 영역 틀과 이름표는 스스로 그린다 |
| 줄인 데이터가 템플릿의 필수 필드를 빠뜨린다 | typecheck 실패, 빈 캔버스 | 출처 스토리의 데이터 타입을 그대로 따른다. 빈 캔버스는 배치2 검사의 「비교한 paint 수 > 0」이 잡는다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-063-Q85EET/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택).** 이 배치의 두 work 를 다음 배치로 미루지 않는다 — S2 가 S1 의 빨강을 초록으로 바꾸는 짝이라 같이 닫는다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | 표본 37개를 한 세션이 순서대로 쓴다. 출처 스토리 9개를 읽는 만큼 컨텍스트를 쓰지만 표본 모양이 한 사람 손에서 나와 고르다 |
| 오케스트레이션 | 2 | 이 배치의 S2 만 3 | S2 를 출처 스토리 묶음 셋으로 나눠 서브에이전트 셋이 각자 임시 파일에 쓰고, 메인이 한 파일로 합친다. 합칠 때 이름·형식을 맞추는 일이 생기고, S1→S2 와 배치2는 나눌 수 없어 아끼는 시간은 S2 한 단계뿐이다 |
