---
card: KAN-047-TRYYRC
title: 문서 정리 A — 폐기 4건 집행 (RELEASE_PLAN · sample_design · storybook README · ORDER)
created: 2026-10-06
branch: KAN-047-TRYYRC
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-047-TRYYRC
base: 11cb644
status: 검토 대기
---

# KAN-047-TRYYRC 검토 요청 — 문서 정리 A — 폐기 4건 집행 (RELEASE_PLAN · sample_design · storybook README · ORDER)

카드: [KAN-047-TRYYRC.md](../cards/KAN-047-TRYYRC.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-047-TRYYRC` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-047-TRYYRC` |
| 베이스 | `11cb644` |
| 변경 훑기 | `git diff 11cb644...HEAD` |

**커밋 5건**

```text
25c1427 KAN-047 S2: 폐기 4건 삭제 (RELEASE_PLAN · sample_design/DESIGN-amber · storybook README · ORDER)
f108b11 KAN-047 S1: ORDER.md 참조원 2곳 정리 (type-inventory:376 · gateDocs.test.ts:37)
fc60380 kanban: 용인 KAN-047 ↔ KAN-049 재확인 (scope 변경 후, 유저 선택) + 인스턴트 예외 동의
0c04093 kanban: KAN-047 전략·실행 계획·검증 작성 + scope 에 gateDocs.test.ts 추가
df41f69 kanban: KAN-047 진행 중으로 이동
```

**변경 파일 12개 (+118 −1101)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 2 | 0 |
| `.kanban/log.md` | M | 2 | 2 |
| `.kanban/state.json` | M | 33 | 34 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 7 | 7 |
| `KANBAN/cards/KAN-047-TRYYRC.md` | M | 70 | 6 |
| `ORDER.md` | M | 0 | 302 |
| `RELEASE_PLAN.md` | M | 0 | 39 |
| `apps/storybook/README.md` | M | 0 | 73 |
| `packages/foundations/src/gateDocs.test.ts` | M | 1 | 1 |
| `packages/visualization/visualization-type-inventory.md` | M | 1 | 1 |
| `sample_design/DESIGN-amber.md` | M | 0 | 634 |

**롤백 태그 2개**

```text
kan/KAN-047-TRYYRC/S1
kan/KAN-047-TRYYRC/S2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-047-TRYYRC.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

셋이 모두 통과해야 끝이다.

1. **네 파일이 레포에서 사라졌다** — 아래 출력이 빈 줄이어야 한다.
   ```bash
   git ls-files RELEASE_PLAN.md sample_design apps/storybook/README.md ORDER.md
   ```
2. **참조 고아 0건** — 칸반 이력을 뺀 레포 전역에서 0건이어야 한다. 착수 전(빨강)과 끝난 뒤(초록) 둘 다 기록한다.
   ```bash
   grep -rnI -E 'ORDER\.md|RELEASE_PLAN|sample_design|DESIGN-amber|storybook/README' \
     --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=storybook-static \
     --exclude-dir=KANBAN --exclude-dir=.kanban --exclude=KANBAN.md --exclude=KANBAN.board.html . | wc -l
   ```
3. **품질 게이트 5종 초록** — `CLAUDE.md` 의 목록 그대로다. `gateDocs.test.ts` 가 루트·`apps/*` 의 md 를 훑으므로 `test:unit` 이 특히 걸리는 자리다.
   ```bash
   pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit
   ```

**실행 결과**

```text
1. git ls-files RELEASE_PLAN.md sample_design apps/storybook/README.md ORDER.md → [] (빈 출력)
2. 참조 grep (칸반 기록 제외) → 0건 (착수 전 4건: ORDER.md:34 · RELEASE_PLAN.md:1 · visualization-type-inventory.md:376 · gateDocs.test.ts:37)
3. 품질 게이트 5종 (2026-10-06, 워크트리 KAN-047-TRYYRC)
   - pnpm build → rc=0
   - pnpm typecheck → rc=0 (새 워크트리는 dist 가 없어 build 를 먼저 돌렸다. build 전에는 foundations 가 tokens 타입을 못 찾아 rc=2 — 이번 변경과 무관)
   - pnpm test → rc=0, Test Files 182 passed / Tests 1224 passed
   - pnpm --filter storybook build → rc=0, "Storybook build completed successfully"
   - pnpm test:unit → rc=0, hooks 115 · visualization 257 · foundations 62(gateDocs.test.ts 포함) · style-guide-catalog 76 · viz-style-guide-catalog 39 = 549 passed
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-047-TRYYRC --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-047-TRYYRC --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-047-TRYYRC --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] B·C 카드가 지울 문서 이름은 테스트 주석에 남겨 둔 것이 맞는가 — 이 카드는 ORDER.md 이름만 지웠습니다
    - **배경**
      - 테스트 파일의 주석 한 곳이 「규칙 검사에 걸리지 않는 문서」 예시로 문서 다섯 개를 이름으로 적고 있습니다. 원문: packages/foundations/src/gateDocs.test.ts:36
      - 그중 ORDER.md 는 이 카드가 지웠으므로 그 이름만 뺐습니다. 테스트 동작은 바뀌지 않습니다. 원문: packages/foundations/src/gateDocs.test.ts:37
      - 남은 이름 가운데 ASSET_INTEGRATION_PLAN.md 는 KAN-048(문서 정리 B)이, packages/visualization/PLAN.md 는 KAN-049(문서 정리 C)가 지울 문서입니다. 원문: KANBAN/cards/KAN-048-R2KW3G.md:5
      - 두 카드의 작업 범위 목록에는 이 테스트 파일이 없어서, 착수할 때 이 주석을 놓칠 수 있습니다. 원문: KANBAN/cards/KAN-049-CWBPP6.md:5
    - **정할 것**
      남은 두 이름을 어떻게 처리할 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 남겨 두고 B·C 카드 메모에 한 줄씩 적는다 | 같은 주석을 세 카드가 나눠 고칩니다 | 각 카드가 자기 문서를 지울 때 이름도 함께 지워 주석이 늘 사실과 맞습니다 |
    | 지금 함께 지운다 | 아직 있는 문서를 주석에서 먼저 지웁니다 | B·C 가 끝날 때까지 주석이 사실과 어긋나고, 이 카드가 남의 작업 범위를 고친 것이 됩니다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 「참조 0건」 검사에서 칸반 기록을 뺀 것이 맞는가 — 지운 문서 이름이 칸반 기록에는 남아 있습니다
    - **배경**
      - 카드 목표는 「grep 결과 0건이라 참조 고아가 남지 않는다」입니다. 원문: KANBAN.md:142
      - 칸반 기록 파일 18개(보드·카드 문서·검토서·로그·KAN-044 리포트)에 지운 문서 이름이 나옵니다. 예: KAN-044 수행 내역의 「ORDER.md 판정을 존치→폐기로」. 원문: KANBAN/cards/KAN-044-3KYT2Q.md:113
      - 이 기록들은 그때 무슨 일이 있었는지 적은 이력입니다. 지금 파일이 없다고 고치면 이력이 바뀌고, 보드의 원문 펜스는 요약·의역하지 않는 것이 규칙입니다.
      - 그래서 검사에서 KANBAN.md·KANBAN/·.kanban/ 을 뺐고, 그 밖의 레포 전역은 0건입니다. 원문: KANBAN/cards/KAN-047-TRYYRC.md 「검증」 2
    - **정할 것**
      칸반 기록 속 이름을 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 둔다 | 기록 속 문서 이름 몇 개가 이제 없는 파일을 가리킵니다 | 이력이 그때 모습 그대로 남고, 지운 파일 내용은 git 이력에서 볼 수 있습니다 |
    | 기록도 고친다 | 보드 원문·카드 문서·검토서·로그를 손대야 합니다 | 원문 보존 규칙과 부딪치고, 검토서 정본은 손으로 고치면 안 되는 파일입니다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-047-TRYYRC --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-047-TRYYRC --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-047-TRYYRC --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
