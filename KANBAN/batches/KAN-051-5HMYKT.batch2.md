---
card: KAN-051-5HMYKT
batch: 2
created: 2026-10-07
branch: KAN-051-5HMYKT
status: 계획
steps: S3, S4
---

# KAN-051-5HMYKT 배치2 — 카탈로그 배럴을 나누고 상한을 실측으로 확정한다

카드: [KAN-051-5HMYKT.md](../cards/KAN-051-5HMYKT.md) · 범위 `S3` · `S4`
선행: [배치1](KAN-051-5HMYKT.batch1.md) — core·viz가 게이트 초록, sgc·vsgc가 빨강인 상태에서 시작한다

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP3 · `S3` sgc·vsgc 배럴 분리

두 카탈로그 패키지는 빌드 출력을 파일 단위로 바꿔도 하나만 가져오면 전부 딸려 온다. 배럴(`src/index.ts`) 최상위에서 `Object.fromEntries(catalog.map(...))`가 모든 preset을 붙잡기 때문이다. 이 부분을 `src/catalog.ts`로 옮기고 `index.ts`에는 다시 내보내는 줄만 남긴다.

| 패키지 | `src/catalog.ts`로 옮기는 것 | `index.ts`에 남는 것 |
|---|---|---|
| style-guide-catalog | 1행 `import type { StyleGuide }` · 77~127행 preset import · 128~195행 주석·`styleGuideCatalog`·`styleGuideMap` | 기존 개별 export 전부 + `export { styleGuideCatalog, styleGuideMap } from './catalog'` |
| visualization-style-guide-catalog | 1행 type import · 2~31행 preset import · 69~106행 `vizStyleGuideCatalog`·`vizStyleGuideMap` | 같은 모양 |

type import까지 옮겨야 `index.ts`에 쓰이지 않는 import가 남지 않는다(`noUnusedLocals`). 생성 스크립트(`scripts/genManifest.ts`·`genTrendTable.ts`·`genVizManifest.ts`)와 시험 파일 8개는 `./index`·`../src/index`에서 카탈로그를 가져오는데, 다시 내보내기로 그대로 읽히므로 고치지 않는다.

**완료 기준**: 게이트 7개 패키지 전부 초록. 공개 export 이름 목록이 배치1에서 뽑은 것과 같다. `pnpm --filter @centurio1987/bbangto-ui-style-guide-catalog gen:manifest`·`gen:trend-table`과 vsgc `gen:manifest`가 돌고, 생성된 파일에 diff가 없다.

### WP4 · `S4` 상한 확정과 정리

| 파일 | 하는 일 |
|---|---|
| `bundle-budget.json` | S3 뒤 실측값으로 상한을 다시 계산해 확정한다(규칙은 카드 전략 「접근 1」) |
| `apps/storybook/.storybook/main.ts:16-20` | 「590KB 단일 파일」「src로 alias한다」는 주석이 지금 코드(`optimizeDeps.include`)와도, 바뀐 dist와도 안 맞는다. 실제 동작대로 고친다 |
| `metadata-coverage.json` | sgc·vsgc의 `sourceModule`이 `src/index.ts`를 가리킨다. `src/catalog.ts`로 고친다 |
| `CLAUDE.md:39, 103` | `test:unit` 설명에 「번들 크기」를 더한다. 다른 줄은 KAN-050 몫이라 건드리지 않는다 |
| `.github/workflows/release.yml` | `Build packages` 다음에 `pnpm test:unit` 단계를 넣어, 상한을 넘는 판이 배포되지 않게 한다 |
| `.changeset/kan-051-*.md` | core·viz·sgc·vsgc patch 4개 |

**완료 기준**: 게이트 5종 초록. `npm pack --dry-run` 파일 목록을 수행 내역에 남긴다. Node에서 `import('@centurio1987/bbangto-ui-core')` 스모크가 통과한다. rollup·rolldown으로 core `Button`을 한 번 더 잰 값을 남긴다. Storybook을 `storybook dev --force`로 한 번 띄워 미리 묶기 캐시 문제가 없는지 본다.

## 2. 의존과 순서

`S3 → S4`는 엄격한 순서다. S4의 상한 확정은 S3 뒤의 실측값이 있어야 하고, `metadata-coverage.json`이 가리킬 `src/catalog.ts`도 S3에서 생긴다.

S4 안에서는 `bundle-budget.json` 확정과 게이트 5종을 마지막에 둔다. 주석·문서·워크플로·changeset은 서로 기다리는 것이 없다.

배치 밖 의존: 이 배치가 끝나 카드가 완료되면 KAN-055(배포)의 직렬 막힘 하나가 풀린다. KAN-050(규율 문서 정리)은 이 카드 뒤에 `packages/core/motion-catalog.md:28`을 고친다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| sgc가 101KB에서 더 안 줄어 상한 근처에 붙는다 | Showcase 대표 export가 상한을 간신히 넘거나 넘지 않는다 | 원인은 Showcase 전부가 함께 쓰는 `_showcaseCopy.generated.ts`(76KB)이고 카드 범위 밖이다. 상한은 실측에 규칙을 적용해 잡고, 생성기 분할은 후속 카드로 남긴다 |
| 배럴 분리로 공개 API가 바뀐다 | export 목록 대조에서 차이 | 배치1에서 뽑은 목록과 맞춘다. 개별 preset export는 `index.ts`에 그대로 두므로 바뀌는 것은 두 상수의 정의 위치뿐이어야 한다 |
| 게이트 5종 중 브라우저 시험이 dist 변경으로 깨진다 | `pnpm test`에서 import 오류나 옛 DOM 단정 실패 | core를 다시 빌드한 뒤 Storybook·Vite 캐시를 지우고 돌린다. 그래도 깨지면 S2 태그와 비교해 어느 work에서 생긴 것인지부터 가른다 |
| `release.yml`에 넣은 `test:unit`이 CI에서만 다르게 돈다 | 로컬 초록, CI 빨강 | 이 카드에서는 push하지 않으므로 CI 결과는 KAN-055(배포)에서 처음 본다. 그 사실을 완료 보고에 적는다 |

되돌리기 어려운 지점은 없다. work마다 `kan/KAN-051-5HMYKT/S<n>` 태그를 단다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->
