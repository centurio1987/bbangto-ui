---
card: KAN-057-CCH3E8
batch: 1
created: 2026-10-09
branch: KAN-057-CCH3E8
status: 계획
steps: S1, S2, S3, S4
---

# KAN-057-CCH3E8 배치1 — 연결선 대시 토큰을 테스트로 먼저 세우고 잇는다

카드: [KAN-057-CCH3E8.md](../cards/KAN-057-CCH3E8.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치이자 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

work 가 넷이고 각각 파일 한두 개라 한 배치로 닫는다. 카탈로그 스타일 가이드 30개는 모두 실선(`''`)이라 이 배치가 끝나도 지금 있는 그림은 바뀌지 않는다.

## 1. 작업 패키지

### WP1 · `S1` 실패하는 테스트 넷

| 파일 | 더하는 것 |
|---|---|
| `apps/storybook/src/stories/visualization/Headless.stories.tsx` | 대시 스토리 넷. 블루프린트 가이드를 펼쳐 `edge.dashPattern` 만 `4 4` 로 바꾼 가이드를 쓰고, 계산된 `stroke-dasharray` 로 잰다 |

넷의 기대값: ① 가이드 대시 아래 `Edge` → `4px, 4px` ② 같은 가이드에서 `strokeDasharray="2 2"` → `2px, 2px` ③ 같은 가이드에서 `Axis` 의 축선(`data-bbangto-viz-edge` 만 단 선) → `none` ④ 대시 가이드 안에 원래 블루프린트(실선) 가이드를 겹친 안쪽 `Edge` → `none`.

**완료 기준**: `pnpm test` 에서 ①·④ 가 빨강. ②·③ 은 지금도 초록일 수 있다(②는 인라인 prop 이 이미 이기고, ③은 아무도 대시를 안 묶었다) — 구현 뒤 깨지지 않게 지키는 테스트다. 다른 스토리는 그대로 초록.

### WP2 · `S2` 잇기

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/src/atoms/Edge.tsx` | 선에 `data-viz-part="connector"` |
| `packages/visualization/src/provider/contractCss.ts` | `[data-bbangto-viz-style-guide] [data-viz-part="connector"] { stroke-dasharray: var(--bbangto-viz-edge-dash-pattern); }` |
| `packages/visualization/src/tokens/contract.ts` | `visualizationFoundationToStyleObject` 가 `*-dash-pattern` 키의 `''` 를 `none` 으로 |

**완료 기준**: S1 넷 초록, 다른 스토리 초록, viz typecheck 통과.

### WP3 · `S3` 문서

| 파일 | 바꾸는 것 |
|---|---|
| `packages/tokens/src/visualization.ts` | `edge.dashPattern` JSDoc — 빈 값은 실선, `Edge` 연결선에만 적용, `strokeDasharray` prop 이 이김 |
| `packages/visualization/style-classification.md` | 횡단 규칙 3 의 상태 문장 — 선 모양은 토큰과 prop 양쪽, 라우팅·화살촉은 prop 만 |
| `.changeset/kan-057-edge-dash-token.md` | visualization patch · tokens patch |

**완료 기준**: 「계약 스타일시트도 `Edge` 도 읽지 않아」 문장 0건, changeset 있음.

### WP4 · `S4` 품질 게이트

`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit` 를 이 순서로 `bash -c` 에서 돌린다.

**완료 기준**: 다섯 다 초록.

## 2. 의존과 순서

`S1 → S2` 는 고정이다. 테스트가 먼저 빨강이어야 구현이 무엇을 고쳤는지 보인다. `S3` 은 파일이 안 겹쳐 S1·S2 와 따로 할 수 있다. `S4` 는 셋이 다 끝난 뒤다.

배치 밖 의존: `dep-check --new KAN-057-CCH3E8` 에서 겹치는 미완료 루트가 0이다. 경로에 안 드러나는 의존도 살폈다 — KAN-064(매니페스트)·KAN-067(README·배포 문서)·KAN-061(템플릿 라벨 대비)은 `Edge`·계약 스타일시트·토큰 타입을 안 건드린다. `packages/visualization/README.md` 는 KAN-067 scope 라 이 카드에서 고치지 않는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| ④가 S2 전에도 초록이다 | 중첩 실선 가이드 안쪽이 이미 `none` | React 가 빈 변수를 지우지 않는다는 뜻이다. 그러면 정규화(`'' → none`)는 뺀다. 필요 없는 변환을 넣지 않는다 |
| 계산된 값의 형식이 기대와 다르다 | `4px, 4px` 대신 `4, 4` 등 | chromium 이 돌려준 형식을 그대로 기대값으로 쓴다. 대시가 걸렸는지(`none` 이 아닌지)가 요점이다 |
| `Axis` 축선에도 대시가 걸린다 | ③ 빨강 | 훅이 `Edge` 밖으로 샜다는 뜻. 선택자를 다시 본다 |
| viz dist 가 Storybook 에 안 보인다 | 새 속성이 DOM 에 없음 | `pnpm build` 뒤 Storybook vite 캐시 삭제(메모리 core-export-vite-cache) |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-057-CCH3E8/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**단일 에이전트(2026-10-09 유저 선택).** S1 → S2 → S3 → S4 를 한 세션이 차례로 한다. 나머지 viz 미사용 토큰은 후속 카드 `KAN-069-G0FGTJ`(백로그, main `73248c4`)로 넘겼다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 순서대로라 게이트 시간이 그대로 든다. 대신 빌드·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 1 | 2(S1→S2 와 S3 를 나란히) | S3 은 JSDoc·문단·changeset 몇 줄이라 나눠서 아끼는 시간이 적고, 서브에이전트에 맥락을 넘기는 비용이 그보다 크다. 게이트는 어차피 한 워크트리에서 한 번 돈다 |
