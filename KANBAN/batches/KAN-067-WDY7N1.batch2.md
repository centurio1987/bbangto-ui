---
card: KAN-067-WDY7N1
batch: 2
created: 2026-10-09
branch: KAN-067-WDY7N1
status: 계획
steps: S4, S5, S6
---

# KAN-067-WDY7N1 배치2 — 관리용 문서를 배포물에서 빼고, 배포물만 읽은 에이전트로 전후를 견준다

카드: [KAN-067-WDY7N1.md](../cards/KAN-067-WDY7N1.md) · 범위 `S4` · `S5` · `S6`
선행: [배치1](KAN-067-WDY7N1.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

배치1이 끝나면 검사 넷 중 「files 에 README 밖 마크다운 없음」만 빨강이다. 이 배치는 그것을 초록으로 바꾸고, 바뀐 배포물이 실제로 에이전트의 결론을 바꾸는지 본 뒤 게이트를 돌려 닫는다.

## 1. 작업 패키지

### WP1 · `S4` 관리용 문서 배포 제외

| 파일 | 고치는 것 |
|---|---|
| `packages/visualization/package.json` | `files` 에서 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 를 뺀다 |
| `packages/visualization/src/typeMeta/types.ts:9-11` | 「두 문서 모두 패키지에 동봉된다(`package.json` `files`)」를 지우고 저장소 링크로 바꾼다 |
| `packages/visualization/src/typeMeta/registry.ts:4` | 인벤토리 참조를 저장소 링크로 바꾼다 |
| `packages/visualization/src/typeMeta/index.ts:6` | 「패키지 루트 TYPE_METADATA_STRATEGY.md」를 README 와 저장소 링크로 바꾼다 |
| `packages/visualization/src/index.ts:28` | 「유형 축 설계는 `TYPE_METADATA_STRATEGY.md`」를 저장소 링크로 바꾼다 |

이 주석들은 빌드되어 `dist` 의 `.d.ts` 에 실린다. 문서를 빼고 주석을 두면 I3 결정 이전의 죽은 참조가 그대로 돌아온다.

**완료 기준**: S1 검사 넷이 모두 초록이다. `packages/visualization` 에서 `pnpm pack` 한 tarball 목록(`tar -tzf`)에 두 문서가 없다. `pnpm build` 뒤 `dist` 의 `.d.ts` 에 「동봉」이 0건이다.

### WP2 · `S5` 배포물 재현 시험

고치기 전과 뒤의 배포물을 각각 빈 앱 폴더의 `node_modules` 에 풀고, 그것만 읽게 한 서브에이전트에게 같은 과제 둘을 낸다.

| 과제 | 조건 |
|---|---|
| core 에 없는 컴포넌트가 필요한 화면 | 과제를 내기 전에 core export 와 `COMPONENT_CATALOG.md` 에 그 컴포넌트가 없는지 확인한다 |
| viz 87종에 없는 그림 | 과제를 내기 전에 `type.manifest.json` 의 이름·aliases 에 없는지 확인한다 |

- 고치기 전 배포물은 main 체크아웃(`/Users/centurio/bbangto-ui`)에서, 고친 배포물은 카드 워크트리에서 `pnpm pack` 으로 만든다. 시험 폴더는 세션 임시 폴더에 둔다.
- 서브에이전트에게는 앱 폴더 경로와 과제만 준다. 확장하라거나 라이브러리를 유지하라는 말은 넣지 않는다. 그 말을 넣으면 문서가 아니라 지시문이 결론을 정한다.
- 반환은 셋이다: 고른 방침(앱 안 확장 · 다른 라이브러리 · 개선 요청 · 그 밖) · 근거로 읽은 파일 · 확장이라면 쓸 부품.

**완료 기준**: 네 번(전후 × 과제 둘)의 반환이 수행 내역에 남는다. 결론이 바뀌지 않았으면 그 사실과 에이전트가 읽은 파일을 그대로 남기고 유저에게 보고한다. 게이트가 아니다.

### WP3 · `S6` 마무리

- `.changeset/kan-067-extend-when-missing.md` — core·visualization patch. 배포물 목록이 바뀐다는 것과 README 새 절을 적는다.
- 품질 게이트 5종을 CLAUDE.md 순서로 돌린다.

**완료 기준**: 게이트 5종이 초록이다.

## 2. 의존과 순서

`S4 → S5 → S6` 순서다. S5 의 「고친 뒤」 배포물은 S4 까지 끝나야 만들 수 있다. S6 의 게이트는 마지막에 한 번 돌린다.

배치 밖 의존은 둘이다.

- KAN-064 와 겹치는 세 파일 중 둘(`src/index.ts`·`src/typeMeta/index.ts`)과 `package.json` 을 이 배치가 고친다. 중재 결과(직렬이면 이 카드가 먼저)에 따라 KAN-064 가 이 변경 위에서 전략을 다시 세운다.
- KAN-066(백로그, scope 없음)도 `package.json` 을 고칠 예정이다(`exports`). 이 카드는 `files` 만 고치므로 줄이 겹치지 않는다. 병합 충돌이 나면 두 변경을 다 살린다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| `pnpm pack` 이 `prepack` 등에서 빌드를 다시 돌려 시간이 든다 | pack 이 몇 분씩 걸린다 | `package.json` 스크립트를 먼저 보고, 있으면 `dist` 를 만든 뒤 한 번만 pack 한다 |
| 재현 시험의 과제 문구가 결론을 끌고 간다 | 전후 모두 같은 결론 | 과제 문구를 전후에 글자 그대로 같게 두고 수행 내역에 원문을 남긴다. 결론이 같아도 읽은 파일이 달라졌는지 함께 본다 |
| 과제로 고른 컴포넌트가 사실은 core 에 있다 | 에이전트가 바로 그 컴포넌트를 쓴다 | 과제 전에 export 목록에서 확인한다(WP2 조건) |

되돌리기 어려운 지점은 없다. `files` 를 바꾼 패키지는 이 카드에서 배포하지 않는다(배포는 유저 실행 지시 뒤의 별도 일이다).

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 2 | S5 만 4 | S5 의 네 시험은 어느 관점이든 서브에이전트로 띄운다. 메인이 시험을 하면 이 대화의 맥락이 결론에 섞인다 |
| 오케스트레이션 | 2 | S5 만 4 | 이 배치는 S4 → S5 → S6 이 순서대로 이어져 나눌 자리가 S5 뿐이다. 단일 에이전트 안과 사실상 같다 |
