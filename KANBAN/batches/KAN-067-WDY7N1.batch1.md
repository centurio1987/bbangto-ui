---
card: KAN-067-WDY7N1
batch: 1
created: 2026-10-09
branch: KAN-067-WDY7N1
status: 계획
steps: S1, S2, S3
---

# KAN-067-WDY7N1 배치1 — 검사를 먼저 세우고 README 두 곳에 「원하는 것이 없을 때」 절을 쓴다

카드: [KAN-067-WDY7N1.md](../cards/KAN-067-WDY7N1.md) · 범위 `S1` · `S2` · `S3`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치는 배포 README 를 고치는 데까지 간다. `package.json` 의 `files` 는 아직 건드리지 않는다. 배치가 끝나면 검사 넷 중 「files 에 README 밖 마크다운 없음」 하나만 빨강으로 남고, 배치2의 S4 가 그것을 초록으로 바꾼다.

## 1. 작업 패키지

### WP1 · `S1` 검사와 예제를 먼저 세운다

| 파일 | 더하는 것 |
|---|---|
| `packages/foundations/src/publishedDocs.ts`(새 파일) | 공개 패키지 목록을 `packages/*/package.json` 에서 읽고(`private` 이 아닌 것), 넷을 위반 목록으로 낸다. ① `files` 에 `README.md` 밖의 `.md` ② 배포 README 의 상대 링크가 `files` 밖을 가리킴 ③ core·visualization README 에 「원하는 것이 없을 때」 절 없음 ④ 그 절의 `tsx` 코드 블록이 `_readmeExamples/` 파일과 다름 |
| `packages/foundations/src/publishedDocs.test.ts`(새 파일) | 실제 저장소 검사 1건 + 실패 주입 넷(위 ①~④를 각각 일부러 어긴 입력) |
| `apps/storybook/src/stories/_readmeExamples/coreExtend.tsx`(새 파일) | core 에 없는 컴포넌트를 앱 안에서 만드는 예제. 가장 가까운 core 컴포넌트를 감싸고 모자란 부분은 `var(--bbangto-…)` 로 칠한다 |
| `apps/storybook/src/stories/_readmeExamples/vizCompose.tsx`(새 파일) | 87종에 없는 그림을 `Canvas`·`Node`·`Edge` 로 조립하는 예제 |
| `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx`(새 파일) | 두 예제를 그리는 스토리 둘. play 함수가 core 예제의 계산된 색이 `--bbangto-semantic-primary-base` 값과 같은지, viz 예제가 노드와 엣지를 그리는지 본다 |

**완료 기준**: 실패 주입 넷이 각각 위반을 낸다. 실제 저장소 검사는 빨강이다(viz `files` 의 문서 2개, 두 README 의 절 없음). 스토리 둘은 라이브러리를 고치지 않은 지금도 초록이다.

### WP2 · `S2` core README 절

`packages/core/README.md` 의 「외부 글꼴」 절 앞에 「원하는 것이 없을 때」 절을 넣는다. 담는 것은 넷이다.

- 순서 넷: export 에서 찾는다 → 없으면 앱 안에 확장 컴포넌트를 만든다 → 라이브러리를 빼거나 바꾸지 않는다 → 개선 요청은 앱을 완성한 뒤의 선택이다
- 쓸 수 있는 CSS 변수 갈래(semantic·spacing·radius·shadow·typography)와 이름을 찾는 법(`flattenToCSSVars`, tokens 설치 시)
- `className`·`ref` 전달. `forwardRef` 를 쓰지 않는 셋(DataGrid·Skeleton·Text)은 실제로 ref 가 안 넘어가는지 확인해 적는다
- `coreExtend.tsx` 와 글자 그대로 같은 예제

**완료 기준**: S1 검사의 core 항목(③·④)이 초록이다.

### WP3 · `S3` visualization README 정리

`packages/visualization/README.md` 를 네 군데 고친다.

| 자리 | 고치는 것 |
|---|---|
| 36번째 줄 | 빈 결과가 「그런 유형은 없다」로 끝나지 않고 새 절로 이어지게 한 문장을 붙인다 |
| 새 절 | 「원하는 것이 없을 때」 — 순서 넷, atom·molecule 목록, Canvas 자식 등록 규칙(173~176번째 줄)으로 잇기, `vizCompose.tsx` 와 같은 예제 |
| 108번째 줄 | 범위 밖 3종(VT-520·VT-610·VT-611)의 사유를 인벤토리로 미루지 않고 README 에 직접 적는다 |
| 203~208번째 줄 | 「함께 들어 있는 문서」를 지우고 두 문서를 「저장소에만 있는 문서」 줄로 옮긴다(GitHub 링크) |

**완료 기준**: S1 검사의 viz README 항목(②·③·④)이 초록이다. README 에 배포되지 않는 문서를 배포물에 있는 것처럼 가리키는 문장이 0이다.

## 2. 의존과 순서

`S1 → S2`, `S1 → S3` 순서다. S1 의 예제 파일이 있어야 README 예제를 그 파일과 맞출 수 있다. S2 와 S3 은 서로 다른 파일이라 순서가 없다.

배치 밖 의존은 셋이다.

- 새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 돌린다. 스토리와 검사가 패키지 `dist` 를 읽는다.
- S3 이 README 에서 두 문서를 「저장소에만 있는 문서」로 옮기면, 배치2의 S4 가 `files` 에서 빼기 전까지 검사 ②는 통과하지만 ①은 빨강이다. 배치 사이에 이 상태로 멈추는 것이 정상이다.
- KAN-064 와 겹치는 세 파일(`packages/visualization/package.json`·`src/index.ts`·`src/typeMeta/index.ts`)은 이 배치에서 건드리지 않는다. 중재 결과는 카드 문서 「전략」에 적는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| README 코드 블록과 예제 파일을 견주는 방식이 import 줄 차이로 늘 어긋난다 | 같은 예제인데 검사가 빨강 | 예제 파일 전체를 README 에 그대로 싣는다(import 포함). 앱 에이전트가 복사해 쓸 코드이므로 import 가 있는 편이 낫다 |
| viz 예제가 Canvas 자식 등록 규칙을 어겨 엣지가 안 그려진다 | 콘솔 경고만 나고 스토리는 통과 | play 함수가 엣지 path 개수를 센다. 0이면 빨강이다 |
| core 예제가 Provider 밖에서 그려져 기본 색으로 나온다 | 계산된 색이 브라우저 기본값 | 스토리가 `FoundationProvider` 로 감싸고, README 예제에도 Provider 안에 둔다는 문장을 붙인다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-067-WDY7N1/S<n>` 태그를 단다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 2 | 1 | README 두 절을 한 세션이 쓰므로 순서·말투가 같다. S2·S3 을 차례로 하는 만큼 시간이 더 든다 |
| 오케스트레이션 | 2 | 이 배치의 S2·S3 만 2 | S1 뒤에 서브에이전트 둘이 README 를 하나씩 맡는다. 두 절의 순서와 말투를 메인이 맞추는 일이 생기고, 아끼는 것은 S2·S3 중 짧은 쪽 시간뿐이다 |
