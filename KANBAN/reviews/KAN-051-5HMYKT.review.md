---
card: KAN-051-5HMYKT
title: 번들 트리 셰이킹 복구 — 파일 단위 출력 + 크기 상한 게이트 (core·viz·sgc·vsgc)
created: 2026-10-07
branch: KAN-051-5HMYKT
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-051-5HMYKT
base: e41b97a
status: 검토 대기
---

# KAN-051-5HMYKT 검토 요청 — 번들 트리 셰이킹 복구 — 파일 단위 출력 + 크기 상한 게이트 (core·viz·sgc·vsgc)

카드: [KAN-051-5HMYKT.md](../cards/KAN-051-5HMYKT.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-051-5HMYKT` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-051-5HMYKT` |
| 베이스 | `e41b97a` |
| 변경 훑기 | `git diff e41b97a...HEAD` |

**커밋 7건**

```text
145f269 KAN-051 S4: 상한 실측 확정 + 문서·워크플로·changeset 정리 (게이트 5종 초록)
41b8aa4 KAN-051 S3: sgc·vsgc 배럴 분리 — catalog.ts 로 (sgc Showcase 829KB→101KB · vsgc preset 341KB→12KB · 게이트 전부 초록)
59bc854 kanban: KAN-051 배치2 착수 시점 판단 — 같은 세션에서 S3·S4 이어 감
dc88ec7 KAN-051 S2: tsup 4개 파일 단위 출력 (core Button 324KB→4.6KB · viz BarChart 171KB→9KB · sgc·vsgc 빨강 유지)
ca0d1bf KAN-051 S1: 번들 크기 상한 게이트 먼저 (core·viz·sgc·vsgc 대표 export 빨강 4 · 나머지 초록)
4109815 kanban: KAN-051 진행 중으로 이동
67f7db1 kanban: KAN-051 수행 관점 단일 에이전트 채택 (유저 선택)
```

**변경 파일 25개 (+727 −258)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-051-tree-shaking.md` | M | 30 | 0 |
| `.github/workflows/release.yml` | M | 5 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 15 | 15 |
| `CLAUDE.md` | M | 2 | 2 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 19 | 18 |
| `KANBAN/batches/KAN-051-5HMYKT.batch1.md` | M | 2 | 2 |
| `KANBAN/batches/KAN-051-5HMYKT.batch2.md` | M | 5 | 2 |
| `KANBAN/cards/KAN-051-5HMYKT.md` | M | 15 | 5 |
| `apps/storybook/.storybook/main.ts` | M | 6 | 4 |
| `bundle-budget.json` | M | 66 | 0 |
| `metadata-coverage.json` | M | 2 | 2 |
| `packages/core/tsup.config.ts` | M | 7 | 2 |
| `packages/foundations/package.json` | M | 1 | 0 |
| `packages/foundations/src/bundleBudget.test.ts` | M | 219 | 0 |
| `packages/style-guide-catalog/src/catalog.ts` | M | 128 | 0 |
| `packages/style-guide-catalog/src/index.ts` | M | 3 | 121 |
| `packages/style-guide-catalog/tsup.config.ts` | M | 7 | 2 |
| `packages/visualization-style-guide-catalog/src/catalog.ts` | M | 77 | 0 |
| `packages/visualization-style-guide-catalog/src/index.ts` | M | 3 | 70 |
| `packages/visualization-style-guide-catalog/tsup.config.ts` | M | 7 | 2 |
| `packages/visualization/tsup.config.ts` | M | 14 | 4 |
| `pnpm-lock.yaml` | M | 90 | 4 |

**롤백 태그 6개**

```text
kan/KAN-051-5HMYKT/S1
kan/KAN-051-5HMYKT/S2
kan/KAN-051-5HMYKT/S3
kan/KAN-051-5HMYKT/S4
kan/KAN-051-5HMYKT/batch1
kan/KAN-051-5HMYKT/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-051-5HMYKT.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test
pnpm --filter storybook build
pnpm test:unit                  # ← bundleBudget.test.ts 가 여기서 돈다
```

foundations만 빨리 보려면 `pnpm build && pnpm --filter @centurio1987/bbangto-ui-foundations test`.

### 빨강 → 초록

1. `S1` 직후: core·viz·sgc·vsgc 대표 export가 상한 초과로 빨강(현재 dist 기준 core `Button` 약 320KB). foundations·hooks·tokens와 전체 상한은 초록.
2. `S2` 직후: core·viz 초록, sgc·vsgc 빨강 유지. 게이트가 배럴 문제를 따로 잡는다는 확인이다.
3. `S3` 직후: 전부 초록.
4. 신선도: src 파일 하나를 건드리고 build 없이 `test:unit`을 돌리면 `pnpm build`를 먼저 하라는 메시지로 실패한다.

### 추가 확인

- `find packages/*/dist -name '*.d.ts'` — core·sgc·vsgc는 `index.d.ts` 하나, viz는 `index.d.ts`·`typeMeta/index.d.ts` 둘
- `grep -rlE 'from "(fs|path|url|node:)' packages/*/dist` — 비어 있어야 한다(Node 전용 코드가 배포물에 없음)
- export 목록 전후 대조(core 258, viz 210, typeMeta 15, sgc 174)
- `npm pack --dry-run` — 파일 목록과 크기
- Node에서 `import('@centurio1987/bbangto-ui-core')` 스모크
- rollup·rolldown으로 core `Button`을 한 번 더 재서 수행 내역에 남긴다(게이트는 esbuild 하나)
- Storybook 미리 묶기 캐시가 dist 변경을 못 볼 수 있으므로 한 번은 캐시(`apps/storybook/node_modules/.cache/storybook`)를 지우고 `storybook dev`로 띄운다(Storybook 10의 dev에는 `--force`가 없다)

**실행 결과**

```text
게이트 5종 (2026-10-07, 워크트리 KAN-051-5HMYKT, S4 커밋 145f269 직전 상태)
- pnpm typecheck — 통과 (exit 0)
- pnpm build — 통과 (exit 0)
- pnpm test — Test Files 184 passed (184) · Tests 1239 passed (1239)
- pnpm --filter storybook build — Storybook build completed successfully
- pnpm test:unit — hooks 115/115 · visualization 257/257 · foundations 85/85(bundleBudget 23 포함) · style-guide-catalog 76/76 · visualization-style-guide-catalog 39/39

빨강 → 초록
- S1 직후: 빨강 4 (core·viz·sgc·vsgc 대표 export) · 초록 81. hooks src 를 touch 하고 build 없이 돌리면 「`pnpm build` 를 먼저 하세요」로 실패
- S2 직후: 빨강 2 (sgc·vsgc 대표 export) — 게이트가 배럴 문제를 따로 잡음
- S3 직후: 전부 초록

추가 확인
- d.ts: core·sgc·vsgc 는 dist/index.d.ts 하나, viz 는 dist/index.d.ts · dist/typeMeta/index.d.ts 둘
- grep -rlE 'from "(fs|path|url|node:)' packages/*/dist — 0건
- export 이름 목록 전후 동일: core 258 · viz 210 · type-meta 15 · sgc 174 · vsgc 41 · foundations 78 · hooks 30 · tokens 19
- npm pack --dry-run: core 949파일 593,318B(풀면 2,969,161B) · viz 713/474,963B · sgc 246/508,118B · vsgc 154/294,836B
- Node 패키지 이름 import 스모크: core 258 · viz 210 · type-meta 15 · sgc 174(catalog 51 · map 51) · vsgc 41(catalog 30)
- 교차 측정(minify 후): core Button rollup 4,510B · rolldown 4,510B / viz BarChart rollup 8,679B · rolldown 8,694B (esbuild 4,622B · 8,958B)
- storybook dev: 캐시(apps/storybook/node_modules/.cache/storybook) 지우고 기동 약 6초, 스토리 1,337개 색인, 워크스페이스 7개 패키지 미리 묶기 확인
- sgc gen:manifest · gen:trend-table, vsgc gen:manifest 재실행 — diff 0
```

## 3. 판단 항목 — 스크립트가 판정할 수 없는 것

<!-- 스크립트가 판정할 수 없는 것만 적는다 — 값의 진위, 선택지 중 하나를 고른 근거,
     범위를 그은 자리. 2항에서 이미 돌아간 검증을 여기 옮겨 적지 않는다.
     한 줄 형식: 체크박스 하나에 의견 하나 — "<주제> — <지금 고른 값과 그 근거>".
     **의견마다 상세가 따라붙고, 상세는 조각 둘이다** — `**배경**` 과 `**정할 것**` 이
     각각 단독 줄이다(없거나 하나뿐이면 종료코드 12). 검토자는 이 카드를 수행하지
     않았으므로 내부 기호(`L10`·`P5`·`S8`)만 던지면 판정할 재료가 없고, 재료가 있어도
     줄글 한 덩이면 필요한 부분만 골라 읽지 못한다.
       **배경** — 무엇이 문제인가. `- ` 목록으로, 항목 하나에 사실 하나. 기호를 풀어 쓰고
         항목 끝에 `원문: 파일:줄` 이나 링크를 건다. ①②… 로 늘어놓을 것은 항목으로 가른다.
         목록이 없으면 종료코드 12 — 줄글은 화면에서 한 문단으로 붙는다.
       **정할 것** — 정할 것 한 줄. 그 아래 갈래마다 대가와 결과를 표로 단다:
         | 선택지 | 대가 | 그러면 어떻게 되는가 |
       추천은 선택지 셀 맨 앞의 `**추천** ` 접두다. 고를 것이 없는 항목이면 표를 비운다.
     **올리기 전에 둘을 본다.** ① 이 의견이 카드 의도(원문·목적·이유·목표)와 이어지는가
     — 이어지지 않으면 올리지 않는다. 문제를 위한 문제는 판단 항목이 아니라 별도 카드다.
     ② 지시 원본보다 낮은 레이어로 내려가지 않았는가 — 유저가 제품 관점으로 지시했는데
     플래그 이름·함수 이름을 묻고 있으면 서술을 고칠 것이 아니라 올릴 것이 아니다.
     (SKILL.md 5.6 「판단 항목에 무엇을 올리는가」)
     비어 있으면 "기계가 다 판정했고 사람이 정할 것이 없다"는 뜻이다. 그 판단도
     착수한 쪽이 하는 것이지 검토자가 빈칸을 보고 추측할 일이 아니다.
     **승계 절(3-0)이 있으면 그것이 먼저 온다** — 다른 검토서에서 넘어온 의견이고,
     판정은 승계를 받은 이 문서 하나에서만 내려진다. -->

**의견마다 판정과 추가 의견이 따로 붙습니다.** 판정은 상태이고 추가 의견은 말입니다 — 승인/반려를 아직
안 정했어도 의견 하나에만 추가 의견을 달 수 있고, 반대로 의견 하나만 먼저 닫을 수도 있습니다.
`<번호>`는 의견 순서이고, 주제의 문구 일부로도 찾습니다.

```
# 판정 — 승인 · 반려 · 철회
python3 scripts/kanban.py review-judge <project-root> --card KAN-051-5HMYKT --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-051-5HMYKT --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-051-5HMYKT --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] 패키지 전부를 가져오는 경우 조금 커지고 배포 파일 수가 늘어나는 것을 받아들일 것인가 — 받아들이고 그대로 진행했습니다
    - **배경**
      - 하나만 가져오는 경우는 크게 줄었습니다. core Button 324,410B → 4,622B, viz BarChart 171,294B → 8,958B, vsgc preset 하나 335,601B → 11,810B입니다. 원문: .changeset/kan-051-tree-shaking.md:24
      - 대신 패키지 전부를 가져오면 조금 커집니다. core 438,855B → 464,763B(6%), viz 190,989B → 200,547B(5%)입니다. 출력이 파일 여러 개로 나뉘면서 파일끼리 잇는 코드가 붙기 때문입니다. 원문: bundle-budget.json:20
      - 배포되는 파일 수도 늘었습니다. core는 dist/index.js 한 파일이던 것이 949개 파일이 됐고, 압축 크기는 593KB(풀면 2.97MB)입니다. 원문: KANBAN/cards/KAN-051-5HMYKT.md:128
      - 외부 앱이 쓰는 import 경로와 공개 이름은 그대로입니다. 공개 이름 수가 바꾸기 전과 같습니다(core 258 · viz 210 · sgc 174 · vsgc 41). 원문: KANBAN/cards/KAN-051-5HMYKT.md:122
    - **정할 것**
      이 대가를 받아들이고 배포 카드(KAN-055)로 넘길 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 받아들인다 | 전부 가져오는 앱은 5~6% 커지고 설치되는 파일 수가 늘어난다 | 일부만 쓰는 외부 앱은 쓰는 만큼만 번들에 들어간다 |
    | 전체 크기도 줄이는 후속 카드를 만든다 | 보드에 카드가 한 장 늘고, 줄일 방법은 아직 정하지 않았다 | 이번 배포는 그대로 하고 전체 크기는 나중에 다룬다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-07

    > **추가 의견**
    >
    > - ai · 2026-10-07 — 정정(착수한 쪽): 배경 셋째 줄의 「949개 파일」은 sourcemap(디버깅용 대응표)과 타입 선언까지 포함한 배포 묶음 전체의 파일 수입니다. 실행되는 js 파일만 세면 473개입니다(KANBAN/cards/KAN-051-5HMYKT.md:122). 바꾸기 전 배포 묶음의 파일 수는 확인 안 함이라 「한 파일 → 949개」는 같은 기준의 비교가 아닙니다. 판단(받아들인다)은 바뀌지 않습니다.

- [x] 배포 전에 단위 시험 전체를 돌리게 할 것인가 — 크기 게이트를 배포에 걸려고 시험 전체를 넣었습니다
    - **배경**
      - 크기 상한을 넘는 판이 배포되지 않게 하려고, 배포 워크플로의 빌드 바로 다음에 `pnpm test:unit` 단계를 넣었습니다. 원문: .github/workflows/release.yml:48
      - `test:unit`은 크기 게이트만 도는 것이 아니라 패키지 시험 전부를 돕니다(이번 실행 572건). 하나라도 실패하면 배포 PR 생성과 배포가 함께 멈춥니다. 원문: package.json:11
      - 이 저장소에는 배포 워크플로 말고 다른 CI가 없어서, 지금까지 단위 시험은 원격에서 돈 적이 없습니다. 원문: .github/workflows/
      - 이 카드는 원격으로 올리지 않으므로, 원격에서 실제로 통과하는지는 배포 카드(KAN-055)에서 처음 확인됩니다. 이 카드에서는 확인 안 함입니다.
    - **정할 것**
      배포 전에 단위 시험 전체를 돌리는 지금 방식으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 지금대로 전체를 돌린다 | 크기와 상관없는 시험이 깨져도 배포가 멈춘다 | 로컬에서 놓친 실패가 배포 전에 걸린다 |
    | 크기 게이트 하나만 돌린다 | 다른 단위 시험은 배포 전에 돌지 않는다 | 배포가 멈추는 원인이 크기 하나로 좁혀진다 |
    | 이 단계를 뺀다 | 상한을 넘는 판이 배포될 수 있다 | 배포 과정이 지금까지와 같다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-07

    > **추가 의견** — _아직 없습니다._

- [x] `test:unit` 설명에 「번들 크기」를 더한 곳이 CLAUDE.md 두 줄뿐이다 — 나머지 다섯 곳은 손대지 않았습니다
    - **배경**
      - 카드 계획대로 CLAUDE.md:39, 103의 `test:unit` 설명에 「번들 크기」를 더했습니다. 원문: CLAUDE.md:39
      - 같은 설명이 다섯 곳에 더 있습니다. README.md:1211, QUALITY_CHECKLIST.md:32·52·75, _templates/CHECKLIST_INSTANCE.template.md:37입니다. 원문: README.md:1211
      - 이 가운데 QUALITY_CHECKLIST.md와 _templates는 규율 문서 정리 카드(KAN-050)가 맡은 범위입니다. README.md는 어느 카드의 범위에도 들어 있지 않습니다. 원문: KANBAN/cards/KAN-050-AJSQAY.md (scope)
      - 지금 문구는 틀린 말이 아니라 빠진 말입니다. 괄호 안 목록이 게이트를 다 적은 것은 아니어서, 명령 자체는 그대로 맞습니다.
      - 카드가 맡는 범위를 바꾸면 그 카드와 다른 카드 사이에 받아 둔 「겹쳐도 된다」·「순서대로 한다」 기록이 무효가 돼 다시 받아야 합니다. 원문: ~/.claude/skills/manage-kanban/SKILL.md (3.6 루트 독립성 중재)
    - **정할 것**
      나머지 다섯 곳을 어디서 고칠 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** KAN-050에 넘기고 README 한 줄도 거기 붙인다 | KAN-050 범위에 README가 들어가 겹침 기록을 다시 확인해야 한다 | 규율 문서의 게이트 설명을 한 카드가 한꺼번에 맞춘다 |
    | 이 카드에서 다섯 곳을 고친다 | 이 카드 범위가 KAN-050과 겹쳐 두 카드 순서를 다시 정해야 한다 | 이 카드가 끝날 때 문구가 모두 맞는다 |
    | 그대로 둔다 | 문서마다 게이트 설명이 다르다 | 할 일이 없다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-07

    > **추가 의견**
    >
    > - ai · 2026-10-07 — 카드 전략 「겹침 처리」가 이 카드 몫을 CLAUDE.md 두 줄로 정해 두었고(KANBAN/cards/KAN-051-5HMYKT.md:65), 수행도 그 두 줄에서 멈췄으므로 범위를 끊은 자리는 전략과 맞습니다. 추천대로 KAN-050에 넘기는 데 동의합니다. 다만 표의 대가 칸에 빠진 것이 하나 있습니다. KAN-050 전략은 지금 「CLAUDE.md 두 줄과 게이트 명령 목록은 건드리지 않는다」고 적고 있고(KANBAN/cards/KAN-050-AJSQAY.md:20, S1은 :58), 배치 계획도 이미 섰습니다(KANBAN/batches/KAN-050-AJSQAY.batch1.md). 그래서 넘기려면 README를 범위에 넣는 것과 함께 KAN-050의 전략 문장과 S1 작업 목록도 고쳐야 합니다.

- [x] style-guide-catalog의 Showcase 하나가 아직 약 101KB인 것을 후속 카드로 만들 것인가 — 카드 전략대로 이 카드에서는 다루지 않았습니다
    - **배경**
      - 배럴을 나눈 뒤 Showcase 하나는 829,011B → 101,092B로 줄었지만 다른 패키지보다 여전히 큽니다. 원문: bundle-budget.json
      - 남은 크기의 대부분(76,517B)은 Showcase 51개가 함께 쓰는 생성 카피 파일 하나에서 옵니다. 하나만 가져와도 51개 몫의 문구가 딸려 옵니다. 원문: packages/style-guide-catalog/src/_showcaseCopy.generated.ts
      - 카드 전략에서 이 일은 범위 밖으로 두고 후속 카드로 미뤘습니다. 원문: KANBAN/cards/KAN-051-5HMYKT.md:69
      - 외부 앱 보고에서 문제가 된 것은 core입니다. style-guide-catalog를 쓴다는 말은 없습니다. 원문: KANBAN.md (KAN-051 원문)
    - **정할 것**
      생성 카피를 Showcase별로 나누는 후속 카드를 지금 백로그에 만들 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 백로그 카드로 만들어 둔다 | 보드에 카드가 한 장 늘어난다 | 잊히지 않고, 필요해지면 그때 꺼낸다 |
    | 만들지 않는다 | 이 사실이 이 카드 문서에만 남는다 | style-guide-catalog를 쓰는 앱이 생기면 그때 다시 찾아야 한다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-07

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-051-5HMYKT --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-051-5HMYKT --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-051-5HMYKT --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
