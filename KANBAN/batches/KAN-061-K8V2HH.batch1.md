---
card: KAN-061-K8V2HH
batch: 1
created: 2026-10-10
branch: KAN-061-K8V2HH
status: 계획
steps: S1, S2, S3
---

# KAN-061-K8V2HH 배치1 — 면마다 글자색을 계산하는 함수와 변수를 세우고 노드 글자 기본값부터 바꾼다

카드: [KAN-061-K8V2HH.md](../cards/KAN-061-K8V2HH.md) · 범위 `S1` · `S2` · `S3`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치가 끝나면 `--bbangto-viz-on-*` 변수가 모든 Provider 에서 나오고, 노드 글자 기본값이 그 변수를 쓴다. 템플릿 글자는 아직 대부분 그대로라 기준 목록은 1538곳에서 1455곳(S3 몫 83곳을 뺀 수)으로 준다.

## 1. 작업 패키지

### WP1 · `S1` 빨간 테스트 먼저

| 파일 | 더하는 것 |
|---|---|
| `packages/visualization/src/tokens/onInk.test.ts`(새 파일) | 후보 순서(`edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg`), 넷 다 4.5:1 미만일 때 검정·흰색 중 큰 쪽, 가이드 `on` 값이 계산값을 이김, 반투명 면은 `canvas.bg` 위 합성색으로 잼, `transparent`·`none` 은 `canvas.bg` 로 봄 |
| `packages/visualization-style-guide-catalog/src/onInk.test.ts`(새 파일) | 카탈로그 가이드 30개와 그 `foundationPresets` 전부에서 `visualizationFoundationToStyleObject` 가 낸 `--bbangto-viz-on-*` 값이 짝이 되는 면과 4.5:1 이상 |

**완료 기준**: 두 테스트가 「함수 없음」·「변수 없음」으로 빨갛다.

### WP2 · `S2` 계산 함수와 CSS 변수

- `packages/visualization/src/tokens/onInk.ts`(새 파일): 면 색과 foundation 을 받아 글자색을 돌려주는 순수 함수, 그리고 foundation 하나에서 `on` 맵 전체를 만드는 함수. 대비 계산은 tokens 패키지의 `contrastRatio`·`parseColor`·`compositeOver` 를 쓴다.
- `packages/visualization/src/tokens/contract.ts`: `visualizationFoundationToStyleObject` 가 `on` 맵을 함께 평탄화한다. 이름은 `vvar('on', 'palette', 'p1')` 와 같은 `--bbangto-viz-on-palette-p1` 이 된다.
- `packages/tokens/src/visualization.ts`: `VisualizationFoundation` 에 선택 필드 `on` 을 더하고 JSDoc 에 계산 규칙과 「직접 적으면 계산값을 이긴다」를 쓴다.

**완료 기준**: S1 두 테스트 초록. `pnpm build`·`pnpm typecheck` 초록. Paint Gate 의 `LiteralPaintGate` 초록(변수만 늘었으므로 그림은 그대로다).

### WP3 · `S3` 노드 글자 기본값

`NodeLabel.tsx:51` 의 기본값을 `vvar('edge', 'stroke')` 에서 `vvar('on', 'shape', 'fill')` 로 바꾼다. 같은 원인으로 기준 목록에 오른 템플릿 21개(activity · architecture · block-diagram · bpmn · bpmn-collaboration · c4-code · class-diagram · concept-map · data-flow · flowchart · isometric-scene · kanban-board · network-graph · network-topology · sitemap-tree · sysml-block · timeline · uml-component · uml-deployment · uml-package · use-case)에서 `NodeLabel` 을 거치지 않고 `shape.fill` 위에 직접 글자를 쓰는 곳도 같은 변수로 바꾼다.

순서: 기준 목록에서 이 21개 템플릿의 줄 83곳을 먼저 지워 `LabelContrastGate` 를 빨갛게 한 뒤 고친다.

**완료 기준**: 83곳이 목록에서 빠진 채 `LabelContrastGate`·`LiteralPaintGate` 초록. 다른 템플릿에서 새 미달이 생기지 않는다(게이트가 「새 미달」을 실패로 잡는다).

## 2. 의존과 순서

`S1 → S2 → S3` 순서다. S2 의 변수가 있어야 S3 이 쓸 수 있다.

배치 밖 의존은 셋이다.

- 워크트리 브랜치는 착수 직전에 main 을 다시 따라잡는다(`git merge --ff-only main`). 계획 중에도 다른 세션이 main 에 칸반 커밋을 쌓았다.
- 새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 돌린다. 스토리와 카탈로그 테스트가 패키지 `dist` 를 읽는다.
- `NodeLabel` 기본값은 S4~S6 의 템플릿도 쓴다. 그 템플릿에서 S3 때문에 풀리는 줄이 생기면 게이트가 「기준 목록 줄이 이제 통과」로 빨개진다. 그때는 그 줄을 S3 에서 함께 지운다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 카탈로그 패키지 테스트가 visualization 의 낡은 `dist` 를 읽는다 | S2 를 고쳤는데 카탈로그 테스트가 계속 「변수 없음」 | visualization 을 다시 빌드한 뒤 돌린다 |
| 가이드 B(색을 뒤집은 가이드)에서 계산 결과가 A 와 같은 검정·흰색이 된다 | `LiteralPaintGate` 가 `<text>` fill 을 잡는다 | 계획 때 blueprint A·B 면 19개는 모두 달랐다. 그래도 나오면 그 면만 후보 순서를 다시 보고, 검사 규칙은 고치지 않는다 |
| `NodeLabel` 기본값을 바꾸면 지금 통과하는 노드 글자 색도 바뀐다 | 템플릿 스토리 화면이 달라짐 | 의도한 결과다(카드 전략 「제약」). 색이 바뀐 가이드와 템플릿을 수행 내역에 남긴다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-061-K8V2HH/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-10 유저 선택).**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택, 2026-10-10 유저 선택)** | 3 | 1 | S3~S6 이 모두 같은 기준 목록 파일과 같은 게이트를 고치고 돌린다. 한 세션이 차례로 하면 줄 지우기와 게이트 결과가 섞이지 않는다. S5(960곳, 템플릿 9개)가 길다 |
| 오케스트레이션 | 3(S1·S2 / S3~S6 / S7·S8) | 가운데 배치만 4 | S2 뒤에 템플릿 묶음 넷(S3·S4·S5·S6)을 서브에이전트 넷이 나눠 맡는다. 기준 목록 한 파일을 넷이 고치게 되고, 같은 워크트리에서 브라우저 테스트를 동시에 돌려야 한다. `NodeLabel` 기본값(S3)이 나머지 셋의 결과를 바꾼다 |

S1·S2 는 두 관점 모두 메인 세션이 차례로 한다. 오케스트레이션을 고르면 배치 문서를 위 괄호처럼 다시 나눈다.
