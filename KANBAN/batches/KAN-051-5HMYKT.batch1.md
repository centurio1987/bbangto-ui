---
card: KAN-051-5HMYKT
batch: 1
created: 2026-10-07
branch: KAN-051-5HMYKT
status: 계획
steps: S1, S2
---

# KAN-051-5HMYKT 배치1 — 크기 게이트를 먼저 세우고 빌드 출력을 파일 단위로 바꾼다

카드: [KAN-051-5HMYKT.md](../cards/KAN-051-5HMYKT.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S1` 크기 상한 게이트를 먼저 건다

번들 크기를 재는 시험을 먼저 세워, 지금 dist가 상한을 넘는다는 사실을 빨강으로 확인한다. 고친 뒤에야 재기 시작하면 게이트가 무엇을 잡는지 한 번도 못 보고 지나간다.

| 파일 | 하는 일 |
|---|---|
| `packages/foundations/package.json` · `pnpm-lock.yaml` | devDependency `esbuild: ~0.27.7`. 저장소에 이미 받은 판(`node_modules/.pnpm/esbuild@0.27.7`)이라 새로 내려받는 것은 없다 |
| `bundle-budget.json` (루트, 신설) | 7개 패키지마다 대표 export 하나와 상한 둘(대표 하나만 · 전체). 상한 규칙 문장도 함께 적는다 |
| `packages/foundations/src/bundleBudget.test.ts` (신설) | 측정기 자체 시험 · dist 실측 · dist 신선도 검사 |

대표 export는 전략 표를 따른다 — core `Button`, visualization `BarChart`, style-guide-catalog Showcase 하나, visualization-style-guide-catalog preset 하나, foundations `amberLightFoundation`, tokens 하나, hooks 하나. 이번 상한은 전략 절의 메모리 재현값(고친 뒤 예상치)과 정상 3개 패키지의 현재 측정치로 정하고, S4에서 실측으로 확정한다.

측정 방식은 전략 절 그대로다. esbuild를 `write:false`로 돌려 디스크에 쓰지 않고, `react`·`@centurio1987/*`는 바깥으로 둔다. 진입 경로는 각 `package.json`의 `exports[sub].import`에서 풀어서 패키지마다 `sideEffects:false`가 읽히게 한다.

**완료 기준**: `pnpm build && pnpm test:unit`이 core·viz·sgc·vsgc 대표 export 상한 초과로 빨강이고, foundations·hooks·tokens와 전체 상한은 초록이다. 측정기 자체 시험(한 파일에 A·B면 B가 남고, 두 파일로 나누면 빠진다)이 초록이다. src 파일 하나를 건드리고 build 없이 돌리면 `pnpm build`를 먼저 하라는 안내로 실패한다. 측정값을 수행 내역에 남긴다.

### WP2 · `S2` tsup 설정 4개를 파일 단위 출력으로

소스는 건드리지 않고 `tsup.config.ts`만 바꾼다. 바꿀 모양은 카드 전략 절 「접근 2」의 설정 조각이다.

| 패키지 | 바꾸는 것 | 지키는 것 |
|---|---|---|
| core | entry 글롭 + 제외 패턴 · `splitting: true` · `dts: { entry: 'src/index.ts' }` | `external: ['react', 'react-dom']` |
| visualization | 같음 + `typeMeta/jsdocSource.ts`·`jsdocTags.ts` 제외 · `dts.entry`에 `src/typeMeta/index.ts` 추가 | `DTS_BANNER` 상수와 `dts.banner` (`jsdoc.test.ts:62-70`이 본문을 읽는다) |
| style-guide-catalog | core와 같음 | — |
| visualization-style-guide-catalog | core와 같음 | — |

착수 직전에 4개 패키지의 export 이름 목록을 뽑아 둔다. 카드에 적힌 수(core 258, viz 210, typeMeta 15, sgc 174)는 10-05 측정이고 그 뒤 KAN-052·053이 병합됐으므로, 대조 기준은 이 배치에서 새로 뽑은 목록이다. vsgc는 카드에 수가 없어서 여기서 처음 센다.

**완료 기준**: 게이트에서 core·viz 대표 export가 초록으로 바뀌고 sgc·vsgc는 빨강이 남는다(배럴 문제를 게이트가 따로 잡는다는 확인이다). export 이름 목록이 전후 같다. `find packages/{core,visualization,style-guide-catalog,visualization-style-guide-catalog}/dist -name '*.d.ts'`에 index만 나온다(viz는 `typeMeta/index.d.ts`까지 둘). `grep -rlE 'from "(fs|path|url|node:)' packages/*/dist`가 비어 있다.

## 2. 의존과 순서

`S1 → S2`는 엄격한 순서다. 게이트가 빨강인 것을 먼저 봐야 S2가 무엇을 초록으로 바꿨는지 말할 수 있다. `CLAUDE.md`의 테스트 선행 규약도 같은 순서를 요구한다.

S2 안에서는 core를 먼저 바꿔 게이트로 확인하고, 나머지 셋에 같은 모양을 옮긴다. core가 크기 차이가 가장 크고(320KB → 약 4.6KB 예상) 대표 export가 하나라 결과를 읽기 쉽다.

배치 밖 의존: 선행 없음. `dep-check` 기준으로 이 카드의 직렬 상대는 KAN-055(배포)뿐이고 이 카드가 선행이다. KAN-048·049·050과는 같은 파일을 다른 줄에서 건드려 용인으로 처리돼 있다(카드 전략 「겹침 처리」).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 게이트가 다른 패키지의 낡은 dist를 잰다 | 고쳤는데 숫자가 그대로다 | 신선도 검사가 막는다. 그래도 의심되면 `pnpm build`를 다시 하고 잰다 |
| `dts.entry`를 빠뜨려 선언 파일이 수백 개 생긴다 | `find … -name '*.d.ts'`에 index 말고 다른 파일이 나온다 | 4개 설정 모두 `dts.entry`를 명시한다. 완료 기준에 넣었다 |
| 파일 분할 뒤 export가 사라지거나 늘어난다 | 목록 대조에서 차이가 난다 | 착수 직전 목록과 맞춘다. 차이가 나면 제외 패턴이 소스를 빠뜨린 것이라 글롭부터 본다 |
| Storybook이 바뀐 dist 모양을 못 읽는다 | 게이트 5종 중 `pnpm test`·Storybook build는 S4에서야 돈다 | S2 끝에 `pnpm --filter storybook build`를 한 번 돌려 일찍 본다. core dist를 바꾼 뒤에는 Vite 캐시(`node_modules/.cache/storybook`, `apps/storybook/node_modules/.vite`)를 지우고 돌린다 |
| 상한을 메모리 재현값으로 정해 S1 직후 숫자가 어긋난다 | 정상 3개 패키지가 처음부터 빨강 | 정상 3개는 이 배치에서 다시 잰 값으로 상한을 잡는다. 확정은 S4다 |

되돌리기 어려운 지점은 없다. 소스는 그대로이고 바꾸는 것은 설정 파일과 새 시험 파일뿐이다. work마다 `kan/KAN-051-5HMYKT/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**배치를 둘로 나눈다.** work 4개는 `batch_size_works` 기본값(3~4) 안이지만, 이 카드는 work마다 `pnpm build`(패키지 7개 전체) → `pnpm test:unit`을 한 바퀴씩 돌고 S4는 브라우저 시험과 Storybook build까지 게이트 5종을 전부 돈다. S2가 끝나면 core·viz는 초록, sgc·vsgc는 빨강인 상태가 남는다. 남은 문제가 배럴 하나로 좁혀진 자리라, 다음 세션이 맥락 없이 이어받기 좋은 경계다.

**수행 관점: 유저 선택 대기.** 두 관점을 나란히 놓으면 이렇다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 2 (S1·S2 / S3·S4) | 1 | 순차라 시간이 더 든다. 대신 build와 게이트 순서가 꼬일 일이 없고, 검증 절의 「빨강 → 초록」 네 단계를 그대로 밟는다 |
| 오케스트레이션 | 2 (S1 → S2‖S3 / S4) | 2 (S2·S3) | S2와 S3는 다른 파일을 고치지만 둘 다 같은 dist를 빌드해 게이트로 잰다. 한 체크아웃이면 build를 어차피 한 줄로 세워야 하고, 워크트리를 따로 두면 `pnpm install`과 전체 build가 폭만큼 반복된다. S3가 먼저 끝나면 「S2 직후 sgc·vsgc는 빨강」(검증 절 2단계) 확인이 사라져, 게이트가 배럴 문제를 따로 잡는지 볼 자리가 없어진다 |
