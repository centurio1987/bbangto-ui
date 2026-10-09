---
card: KAN-072-KW0G9B
batch: 1
created: 2026-10-10
branch: KAN-072-KW0G9B
status: 계획
steps: S1, S2, S3, S4
---

# KAN-072-KW0G9B 배치1 — 검사를 세우고 루트 README 두 자리를 고친다

카드: [KAN-072-KW0G9B.md](../cards/KAN-072-KW0G9B.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치이자 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

work 넷이 한 배치에 들어간다. 고치는 파일은 넷이고(루트 `README.md`, `publishedDocs.ts`·`.test.ts`, `ExtendWhenMissing.stories.tsx`), 라이브러리 코드와 배포 README 는 건드리지 않는다.

## 1. 작업 패키지

### WP1 · `S1` 검사를 먼저 세운다

| 파일 | 더하는 것 |
|---|---|
| `packages/foundations/src/publishedDocs.ts` | 루트 README 원문과 `EXTEND_SECTION_RULES` 를 받아 위반을 내는 순수 함수 하나. 「무엇을 하려고 오셨나요」 절 안에 패키지마다 `<dir>/README.md#<EXTEND_SECTION_TITLE 의 GitHub 앵커>` 링크가 있는지 본다. 위반 종류와 메시지를 더하고, 머리 주석의 불변식 목록에 다섯째로 적는다 |
| `packages/foundations/src/publishedDocs.test.ts` | 실제 저장소 검사(루트 README 를 읽는다) 1건 + 실패 주입 넷: 링크 없음 · 앵커 틀림 · 링크가 다른 절에만 있음 · 길잡이 절 없음 |
| `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx` | Provider 밖 스토리 하나(`parameters.bbangtoProviders: false`). 루트 README 사례 8 의 Flowchart 예제와 `DecisionSketch` 를 Provider 없이 그리고 도형 채움 · 엣지 선 · 글자 채움 · 캔버스 배경을 단언한다 |

**완료 기준**: 실패 주입 넷이 각각 위반을 낸다. 실제 저장소 검사는 빨강이다(core·visualization 링크 둘 없음). Provider 밖 스토리는 라이브러리를 고치지 않은 지금도 초록이고, 잰 값을 수행 내역에 남긴다.

### WP2 · `S2` 길잡이를 잇는다

| 자리 | 고치는 것 |
|---|---|
| 길잡이 표(`README.md:17-28`) | 10번 줄 앞에 「쓰려는 컴포넌트나 그림이 목록에 없다」 줄. 사례 칸은 core·visualization README 의 「원하는 것이 없을 때」 절 링크 둘 |
| 10번 줄 | 「이 레포에 컴포넌트나 preset을 넣는다」가 저장소 자체에 넣는 사람의 줄임을 문구로 밝힌다 |
| 표 아래 문단(`README.md:30`) | 새 줄만 사례가 아니라 배포 README 로 간다는 한 문장 |
| 사례 10 머리(`README.md:1176`) | 앱을 만들다 원하는 것이 없어 왔다면 앱 안에서 먼저 만들고, 기여는 앱을 완성한 뒤의 선택이라는 한 문단 |
| 사례 1·8 「그다음」 | 목록에 없을 때 갈 절로 한 문장씩 |

**완료 기준**: S1 의 루트 README 검사가 초록이다.

### WP3 · `S3` Provider 서술을 고친다

`README.md:858` 의 「무채색 base foundation 으로 떨어져요 … 캔버스는 흰색, 선은 `#333333`」을 S1 에서 잰 값으로 바꾼다. viz README:235-237 과 같은 사실을 루트 README 문체로 쓰고, 무채색 값이 남는 자리는 `useVizFoundation()` 의 JS 값뿐이라는 것도 함께 적는다.

**완료 기준**: 「캔버스는 흰색, 선은 `#333333`」 문장이 0이다. 새 서술이 Provider 밖 스토리의 단언과 같은 사실을 말한다.

### WP4 · `S4` 품질 게이트

`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**완료 기준**: 다섯 다 초록.

## 2. 의존과 순서

`S1 → S2`, `S1 → S3`, `S2·S3 → S4` 순서다. S2 와 S3 은 같은 파일(`README.md`)의 다른 자리를 고친다.

배치 밖 의존은 하나다. 새 워크트리라 `pnpm build` 를 먼저 돌린다. 스토리와 검사가 패키지 `dist` 를 읽는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| GitHub 앵커 규칙을 잘못 만든다 | 검사는 초록인데 GitHub 에서 링크가 절 머리로 안 간다 | viz README:37 이 이미 쓰는 `#원하는-것이-없을-때` 와 같은 값이 나오는지 실패 주입 표본으로 박는다 |
| Provider 밖 렌더가 브라우저마다 다르다 | chromium 값만 맞는다 | `pnpm test` 는 chromium 하나만 돈다. README 에 「chromium 실측」이라고 밝히고 다른 브라우저는 확인 안 함으로 둔다 |
| Provider 밖 스토리가 a11y 대비 위반을 낸다 | 글자와 도형이 같은 검정 | 전역 a11y 가 `test: 'todo'` 라 게이트를 막지 않는다. 일부러 나쁜 렌더를 재는 스토리라는 것을 주석으로 밝힌다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-072-KW0G9B/S<n>` 태그를 단다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | README 한 파일을 한 세션이 고치므로 충돌이 없다. work 넷이 짧아 순서대로 해도 한 세션 예산의 절반에 못 미친다 |
| 오케스트레이션 | 1 | S1 안의 검사·스토리만 2 | S2·S3 은 같은 `README.md` 를 고쳐 나눌 수 없다. 나눌 수 있는 것은 S1 의 두 파일뿐이고, 아끼는 시간보다 메인이 결과를 맞추는 일이 크다 |
