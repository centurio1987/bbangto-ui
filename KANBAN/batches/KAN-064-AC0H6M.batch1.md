---
card: KAN-064-AC0H6M
batch: 1
created: 2026-10-08
branch: KAN-064-AC0H6M
status: 계획
steps: S1, S2
---

# KAN-064-AC0H6M 배치1 — 실제 크기를 재고, 매니페스트 4종을 얇은 색인으로 바꾼다

카드: [KAN-064-AC0H6M.md](../cards/KAN-064-AC0H6M.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 매니페스트를 다시 만드는 방법(prebuild·수동 gen)과 커밋 정책을 아직 바꾸지 않는다. 먼저 크기를 실제로 재서 「얇은 색인이 1만 토큰 안에 드는가」를 확인하고, 그 수치로 색인에 넣을 필드를 정한 뒤 생성기 4종의 출력 형태만 바꾼다. 동기화 장치를 손보는 일은 배치2가 한다.

## 1. 작업 패키지

### WP1 · `S1` 실측

지금 4종의 크기(2026-10-08 main 기준)는 아래와 같다. 토큰 수는 아직 어림값이다.

| 매니페스트 | 항목 | 글자 수 | 한글 글자 |
|---|---|---|---|
| `packages/style-guide-catalog/catalog.manifest.json` | 51 | 94,282 | 12,209 |
| `packages/visualization-style-guide-catalog/catalog.manifest.json` | 30 | 58,653 | 6,932 |
| `packages/foundations/foundation.manifest.json` | 76 | 76,483 | 5,894 |
| `packages/visualization/type.manifest.json` | 87 | 82,108 | 4,162 |

| 무엇을 재는가 | 어떻게 |
|---|---|
| 지금 4종 전체 | 파일을 그대로 토크나이저에 넣는다 |
| 얇은 색인 후보 4종 | 스크래치 스크립트로 지금 매니페스트에서 후보 필드만 뽑아 같은 직렬화(2칸 들여쓰기 JSON)로 만든 뒤 잰다. 이 스크립트는 커밋하지 않는다 |
| 항목 하나의 상세 | 4종에서 가장 큰 항목 하나씩. 「후보 2~3개만 상세를 읽는다」가 몇 토큰인지 보려는 것이다 |

토크나이저는 `claude -p` 사용량이다(4항). 결과는 카드 문서 「전략」 절의 어림 표를 실측 표로 바꾸고, 「수행 내역」에 한 줄로 요약한다(수행 내역은 한 줄씩만 덧붙는 자리라 표를 못 담는다).

색인 후보 필드는 아래에서 시작한다. `metaStatus` 를 남기는 이유는 커버리지 census 게이트(`packages/foundations/src/metadataCoverage.test.ts:37`)가 매니페스트 JSON 에서 항목 수와 authored 수를 읽기 때문이다.

| 축 | 공통 | 축별 |
|---|---|---|
| UI style guide | 이름 · `displayName` · `summary` · `tags` · `domains` · `metaStatus` | `family` · `priority` |
| viz style guide | 같음 | `family` |
| foundation | 같음(이름은 `slug`) | `colorScheme` |
| viz 유형 | 같음(이름은 `id`·`name`, `domains` 는 없음) | `category` · `kind` · `exportNames` · `aliases` |

**완료 기준**: 실측 표가 카드 문서에 있고, 색인 후보 4종 합계가 1만 토큰 안쪽인지가 확인된다. 넘으면 어느 필드를 빼면 들어오는지까지 잰다.

### WP2 · `S2` 얇은 색인 생성

| 파일 | 바꾸는 것 |
|---|---|
| `packages/style-guide-catalog/src/manifest.test.ts` 외 테스트 3개 | 먼저 고친다. 색인 항목이 S1 에서 정한 필드만 갖는지, `useWhen`·`avoidWhen`·`mood`·`accessibility`·`related` 가 색인에 없는지, 상세 자리에서 그 값을 다시 읽을 수 있는지를 본다. 이 시점에 빨강이어야 한다 |
| `packages/style-guide-catalog/src/manifest.ts` 외 생성 함수 3개 | 색인(tier 1)과 상세(tier 2)를 따로 내는 함수로 나눈다. 메타 스키마 타입은 건드리지 않는다 |
| `scripts/gen*.ts` 4개 | 색인 파일과 상세 파일을 쓴다 |
| `*.manifest.json` 4개 | 다시 생성한다. **파일 이름은 그대로 둔다** |

상세 자리는 항목별 파일 `meta/<이름>.json` 을 기본으로 한다. UI·viz style guide 카탈로그에는 `./meta` 같은 서브패스가 없어서(`packages/style-guide-catalog/package.json` 의 `exports` 는 `.` 과 `./manifest.json` 둘뿐), 파일을 읽는 AI 가 상세를 볼 길이 따로 있어야 한다. 이 파일들을 저장소에 커밋할지는 배치2의 S3 가 정한다.

**완료 기준**: 생성 함수 4종이 새 형태를 내고, 고친 `manifest.test.ts` 4개가 초록이다. `git diff --stat packages/tokens/src/styleGuideMeta.ts packages/visualization/src/typeMeta/types.ts packages/foundations/src/meta/types.ts` 가 비어 있다.

## 2. 의존과 순서

`S1 → S2` 순차다. 색인에 넣을 필드가 S1 의 수치로 정해진다.

배치 밖 의존은 셋이다.

- 새 워크트리에서는 `pnpm typecheck` 전에 `pnpm build` 를 먼저 돌린다. UI·viz style guide 생성기와 그 테스트가 core·visualization 의 `dist` 를 읽는다(`packages/style-guide-catalog/scripts/genManifest.ts:6`).
- 커버리지 census 게이트가 매니페스트 JSON 을 읽으므로, 색인에서 `metaStatus` 를 빼면 그 게이트가 깨진다.
- viz 템플릿·패턴 84개의 JSDoc 이 `type.manifest.json` 이라는 이름을 가리킨다(`gen:type-jsdoc`, `packages/visualization/src/typeMeta/jsdoc.test.ts:66`). 파일 이름을 바꾸면 그 파일들이 모두 바뀌고, 템플릿 전체를 scope 로 잡은 KAN-061 과 겹친다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 얇은 색인이 1만 토큰을 넘는다 | S1 실측 합계가 1만 이상 | 넘는 축에서 `tags`·`aliases` 처럼 긴 배열부터 빼 보고, 그래도 넘으면 목표치와 실측을 함께 기록한 뒤 검토 판단 항목으로 올린다 |
| 상세 파일 244개가 새로 생겨 동기화 비용이 오히려 는다 | 커밋 대상 파일 수가 4 → 248 | 배치2 S3 에서 상세 파일을 커밋하지 않고 빌드 산출물로만 싣는 길을 먼저 검토한다 |
| `./manifest.json` 서브패스 형태가 바뀌어 외부 소비자가 깨진다 | 외부 앱이 `meta.useWhen` 을 색인에서 읽는다 | 카드 「제약」대로 changeset 을 major 로 표시한다(배치2 S5). 외부 소비자가 실제로 있는지는 확인 안 함 |
| census 게이트가 새 형태를 못 읽는다 | `metadataCoverage.test.ts` 빨강 | 색인에 `metaStatus` 를 남긴다. 그래도 깨지면 census 쪽을 고쳐야 하므로 scope 에 그 파일을 더한다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-064-AC0H6M/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트 · 토크나이저: `claude -p` 사용량(2026-10-08 유저 선택).** 이 배치의 두 work 를 다음 배치로 미루지 않는다 — S2 의 필드가 S1 수치에서 나오므로 같이 닫는다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | 생성기 4종은 각각 23~34줄이고 테스트도 107~161줄이라 한 세션이 순서대로 고쳐도 무겁지 않다. 4종의 색인 모양이 한 사람 손에서 나와 서로 맞는다 |
| 오케스트레이션 | 2 | 이 배치의 S2 만 4 | 패키지마다 서브에이전트 하나가 테스트·생성 함수·생성기를 고친다. 공통 필드 이름을 메인이 먼저 고정해 넘겨야 하고, 합친 뒤 4종을 다시 맞춰 보는 일이 남는다. 아끼는 것은 S2 한 단계뿐이다 |

토크나이저는 세 길이 있다. 이 머신에는 `ANTHROPIC_API_KEY` 도 `tiktoken` 도 없다(2026-10-08 확인).

| 길 | 대가 | 결과 |
|---|---|---|
| **(채택)** `claude -p` 로 파일마다 한 번씩 보내고 사용량의 입력 토큰 차이를 잰다 | 구독 사용량이 한 번 든다. 4종 전체가 약 31만 글자라 입력 토큰으로 수십만 단위가 될 수 있다 | Claude 토크나이저로 잰 값이 나온다 |
| API 키를 받아 토큰 세기 API(`count_tokens`)를 부른다 | 키가 필요하다 | 같은 값을 사용량 없이 얻는다 |
| `tiktoken` 을 설치해 잰다 | 없다 | Claude 와 다른 토크나이저라 어림값을 다른 어림값으로 바꾸는 셈이다 |
