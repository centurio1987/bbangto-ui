---
card: KAN-072-KW0G9B
title: 루트 README 의 「컴포넌트가 없을 때」 길과 viz Provider 서술 바로잡기
created: 2026-10-10
branch: KAN-072-KW0G9B
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-072-KW0G9B
base: 0a81094
status: 검토 대기
---

# KAN-072-KW0G9B 검토 요청 — 루트 README 의 「컴포넌트가 없을 때」 길과 viz Provider 서술 바로잡기

카드: [KAN-072-KW0G9B.md](../cards/KAN-072-KW0G9B.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-072-KW0G9B` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-072-KW0G9B` |
| 베이스 | `0a81094` |
| 변경 훑기 | `git diff 0a81094...HEAD` |

**커밋 11건**

```text
084668e fix(KAN-072): 재검토 — 배포 전 절을 설치한 패키지에 있다고 한 문장 지움 · 앵커에 결합 부호 남김
698f5ed kanban: KAN-072 계획 리포트 다시 그림 (수행 내역·배치 완료 반영)
8077b6b kanban: KAN-072 검토로 이동 — 검토서(판단 항목 2) · 검토 리포트 · 발행본
1093d95 kanban: KAN-072 S4 — 품질 게이트 5종 초록 · 배치1 완료(단일 에이전트)
0502a82 docs(KAN-072): S3 — 루트 README 의 「Provider 없이 그리면 무채색」 서술을 실측대로
da9bbc0 docs(KAN-072): S2 — 루트 README 길잡이에 「원하는 것이 없을 때」 길 잇기
b5f5b0a test(KAN-072): S1 — 루트 README 길잡이 링크 검사(빨강) · Provider 밖 viz 렌더 실측 스토리
d492f2d kanban: KAN-072 배치1 계획(S1~S4, 두 관점) · 계획 리포트
4d7e6ff kanban: KAN-072 메모 — 병합된 KAN-064 대기 서술을 걷고 KAN-071 비교 기준 커밋을 적음
5688c15 kanban: KAN-072 실행 문서 — 전략·실행 계획(S1~S4)·검증
6979223 kanban: KAN-072 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 16개 (+2421 −55)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 3 | 0 |
| `.kanban/log.md` | M | 3 | 3 |
| `.kanban/reviews/KAN-072-KW0G9B.events.jsonl` | M | 2 | 0 |
| `.kanban/reviews/KAN-072-KW0G9B.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 43 | 36 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 10 | 7 |
| `KANBAN/batches/KAN-072-KW0G9B.batch1.md` | M | 77 | 0 |
| `KANBAN/cards/KAN-072-KW0G9B.md` | M | 73 | 0 |
| `KANBAN/reports/KAN-072-KW0G9B.report.html` | M | 515 | 0 |
| `KANBAN/reviews/KAN-072-KW0G9B.review.html` | M | 1250 | 0 |
| `KANBAN/reviews/KAN-072-KW0G9B.review.md` | M | 199 | 0 |
| `README.md` | M | 9 | 4 |
| `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx` | M | 82 | 0 |
| `packages/foundations/src/publishedDocs.test.ts` | M | 67 | 2 |
| `packages/foundations/src/publishedDocs.ts` | M | 65 | 1 |

**롤백 태그 5개**

```text
kan/KAN-072-KW0G9B/S1
kan/KAN-072-KW0G9B/S2
kan/KAN-072-KW0G9B/S3
kan/KAN-072-KW0G9B/S4
kan/KAN-072-KW0G9B/batch1
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-072-KW0G9B.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->
- `pnpm --filter @centurio1987/bbangto-ui-foundations exec vitest run src/publishedDocs.test.ts` — 실패 주입 넷과 실제 저장소 검사가 모두 초록.
- `pnpm test` 안의 `ExtendWhenMissing` 스토리 셋(CoreRating · VizCompose · Provider 밖) 초록.
- 품질 게이트 5종: `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.
- 사람이 볼 것: 루트 README 표의 새 줄과 사례 10 머리 문단이 「앱 안에서 먼저 만든다」로 읽히는가, `README.md:858` 의 새 서술이 Provider 밖 스토리의 단언과 같은 사실인가.

**실행 결과**

```text
재검토(084668e) 뒤 다시 돌린 결과
typecheck exit=0
build exit=0
test exit=0
sbbuild exit=0
unit exit=0
 Test Files  194 passed (194)
      Tests  1301 passed (1301)
packages/foundations test:       Tests  150 passed (150)
└  Storybook build completed successfully
publishedDocs.test.ts 17/17 (실제 저장소 루트 길잡이 검사 · 결합 부호 앵커 표본 포함) · ExtendWhenMissing 3/3 (VizOutsideProvider 포함)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-072-KW0G9B --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-072-KW0G9B --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-072-KW0G9B --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] visualization README 의 「엣지는 보이지 않는다」 두 곳을 이 카드에서 함께 고칠 것인가 — 지금은 고치지 않았습니다. 카드 제약(배포 README 는 건드리지 않는다)을 따랐습니다
    - **배경**
      - Provider 밖에서는 엣지 선이 그려지지 않지만 화살촉은 검게 남습니다. 2026-10-10 chromium 에서 잰 값입니다. 원문: apps/storybook/src/stories/ExtendWhenMissing.stories.tsx:159
      - 루트 README 는 이 카드에서 「검은 화살촉만 남는다」로 고쳤습니다. 원문: README.md:861
      - visualization README 두 곳은 「엣지는 보이지 않는다」고 적습니다. KAN-067 이 쓴 줄이라 아직 배포되지 않았고, 다음 배포부터 앱이 설치한 패키지 안에 실립니다. 원문: packages/visualization/README.md:163
      - 같은 서술의 두 번째 자리입니다. 원문: packages/visualization/README.md:235
      - 지금 배포된 visualization 0.4.1 의 README 는 아직 옛 서술 「Provider 밖에서는 무채색으로 떨어진다」를 싣고 있습니다. 원문: git show 7e3f287:packages/visualization/README.md 153줄
      - 세 문서 모두 「그림은 Provider 안에 둔다」는 결론은 같습니다. 갈리는 것은 Provider 밖 그림을 묘사하는 말뿐입니다.
      - visualization README 를 고치면 visualization 패키지에 patch 변경 기록(changeset)이 하나 붙고, KAN-064·KAN-067 과 함께 나갈 다음 배포에 실립니다. 원문: .changeset/kan-067-extend-when-missing.md:16
    - **정할 것**
      visualization README 두 줄을 어디서 고칠 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이 카드에서 함께 고친다 | 고칠 파일에 visualization README 와 변경 기록 하나가 더해지고, 검토를 한 번 더 받습니다 | 다음 배포에 실리기 전에 세 문서가 같은 사실을 말합니다. 고칠 두 자리는 이미 같은 스토리가 잰 값입니다 |
    | 그대로 둔다 | 배포 README 와 루트 README 가 Provider 밖 화살촉을 다르게 묘사합니다 | 앱이 할 일(Provider 안에 둔다)은 같아서 실제로 막히는 일은 없습니다 |
    | 후속 카드로 뺀다 | 두 줄 고침에 카드 하나가 듭니다 | 이 카드는 지금 범위로 닫히지만, 후속 카드가 다음 배포보다 늦으면 지금 서술이 그대로 배포됩니다 |

    > **판정**
    >
    > - 철회 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 배경 셋과 선택지 표가 배포 상태를 잘못 적고 있어 판정하지 않았습니다. main 에는 2026-10-10 04:11(한국 시각) 릴리스 PR #11(a15549a · version packages 7849962)이 병합돼 KAN-067 변경 기록이 이미 소비됐고, 04:13 에 visualization 1.0.0 · core 1.2.2 가 레지스트리에 올라갔습니다(npm view time, npm.pkg.github.com). 내려받은 visualization 1.0.0 의 README.md 는 이 브랜치의 packages/visualization/README.md 와 글자 그대로 같아서 「엣지는 보이지 않는다」 두 줄(163 · 235~236)은 이미 배포돼 있습니다. 그래서 「아직 배포되지 않았다」 · 「지금 배포된 0.4.1」 · 「KAN-064·KAN-067 과 함께 나갈 다음 배포에 실린다」(.changeset/kan-067-extend-when-missing.md 는 main 에 없음)는 셋 다 지금 사실과 다르고, 추천 갈래의 결과 「다음 배포에 실리기 전에 세 문서가 같은 사실을 말한다」는 더는 이룰 수 없습니다. 이 브랜치가 릴리스 병합 전 커밋(0a81094)에서 갈라져, 브랜치 안의 changeset status 로는 대기로 보였던 것이 원인으로 보입니다. 바뀐 사실로 다시 보면, 이 카드에서 고치는 갈래는 이 두 줄 때문에 visualization 1.0.1 patch 배포가 따로 나가는 일이 되고, 후속 카드 갈래의 「늦으면 그대로 배포된다」 위험은 이미 일어난 일이라 사라집니다(다음 visualization 배포 때 함께 실림). 그대로 두는 갈래의 대가와 결과는 같습니다. 질문 자체는 유효하니 배경과 표를 main · 레지스트리 기준으로 다시 써 주세요.
    > - ai · 2026-10-10 — 검토자 지적대로 배경 셋과 표가 배포 상태를 잘못 적었습니다(브랜치가 릴리스 병합 전 0a81094 에서 갈라져, 브랜치 안의 changeset 만 보고 「배포 대기」로 썼습니다). main a15549a 와 배포 버전 기준으로 다시 쓴 의견을 4번으로 올리고 이 의견은 철회합니다.

- [x] 길잡이 표의 새 줄이 사례가 아니라 패키지 README 의 절로 가도 되는가 — 그렇게 했습니다. 예제 사본을 루트에 두지 않으려고
    - **배경**
      - 루트 README 는 「사례마다 설치·절차·코드가 처음부터 끝까지 들어 있어서 다른 문서를 먼저 읽지 않아도 된다」고 약속합니다. 원문: README.md:15
      - 새 줄 「쓰려는 컴포넌트나 그림 유형이 목록에 없다」는 그 약속의 예외입니다. 사례 대신 core·visualization README 의 「원하는 것이 없을 때」 절로 갑니다. 원문: README.md:28
      - 표 아래 문단이 그 예외를 밝히고, 앱을 만들다 막혔으면 라이브러리를 바꾸거나 요청하기 전에 그 절부터 보라고 적습니다. 원문: README.md:33
      - 링크는 저장소의 패키지 README 로 갑니다. 두 절은 2026-10-10 배포된 core 1.2.2 · visualization 1.0.0 의 README 에도 실려, 설치한 패키지 안에서도 읽힙니다. 원문: main a15549a(릴리스 PR #11 병합)
      - 두 절의 예제 코드는 스토리북이 실제로 그려 보는 예제 파일과 글자 그대로 같은지 검사가 대조합니다. 루트에 사본을 두면 그 대조 밖에서 낡습니다. 원문: packages/foundations/src/publishedDocs.ts:17
    - **정할 것**
      새 줄을 링크로 둘 것인가, 루트 README 에 사례 11 을 따로 쓸 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 링크로 둔다 | 루트 README 의 「다른 문서를 먼저 읽지 않아도 된다」에 예외가 하나 생깁니다 | 예제가 패키지 README 에만 있어 지금 검사가 계속 지킵니다 |
    | 사례 11 을 쓴다 | 같은 예제가 세 곳에 놓이고, 루트 사본을 지킬 검사를 하나 더 만들어야 합니다 | 루트 README 만 읽어도 끝나지만 사본이 낡을 자리가 하나 늘어납니다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 배경 넷째 줄 「두 절은 아직 배포되지 않아서(KAN-067 변경 기록 대기), 지금 설치한 패키지 안의 README 에는 없습니다」는 지금 사실과 다릅니다. core 1.2.2 · visualization 1.0.0 이 2026-10-10 04:13(한국 시각)에 배포됐고, 내려받은 두 패키지의 README.md 는 이 브랜치의 packages/core/README.md · packages/visualization/README.md 와 글자 그대로 같아 「원하는 것이 없을 때」 절(core 15줄 · visualization 150줄)이 들어 있습니다. 이 사실은 추천을 바꾸지 않고 오히려 받칩니다 — 링크가 가리키는 절이 설치한 패키지 안에도 있으니 루트에 사본을 둘 이유가 더 줄어듭니다. 링크로 두는 것은 카드 목표 「루트 README 가 배포 README 의 「원하는 것이 없을 때」 절로 이어지고」와 전략의 버린 대안(사례 11 통째로 · 예제 사본 문제)에 그대로 맞아 승인합니다. 재검토에서 지운 「그 절은 설치한 패키지 안에도 들어 있다」를 되살릴지는 맨 뒤 새 항목으로 따로 세웠습니다.

- [ ] 재검토에서 지운 「그 절은 설치한 패키지 안에도 들어 있다」를 되살릴 것인가 — 지운 근거(배포 대기)가 지금 사실과 다릅니다
    - **배경**
      - 검토자 에이전트가 의견 2 의 배경을 main 과 레지스트리에 대조하다가 세웠습니다.
      - 재검토가 루트 README 표 아래 문단에서 「그 절은 설치한 패키지 안(`node_modules/@centurio1987/bbangto-ui-core/README.md` 등)에도 그대로 들어 있어요」를 지웠습니다. 근거는 「배포된 core 1.2.1 · visualization 0.4.1 에는 절이 없다」였습니다. 원문: KANBAN/cards/KAN-072-KW0G9B.md:73
      - 그 근거는 재검토 시각(2026-10-10 20:18)에 이미 사실이 아니었습니다. core 1.2.2 · visualization 1.0.0 이 같은 날 04:13(한국 시각)에 배포됐습니다. 원문: npm view @centurio1987/bbangto-ui-visualization time (npm.pkg.github.com, 1.0.0 = 2026-10-09T19:13:07Z)
      - 내려받은 core 1.2.2 의 README.md 는 이 브랜치의 core README 와 글자 그대로 같고 「원하는 것이 없을 때」 절이 있습니다. 원문: packages/core/README.md:15
      - visualization 1.0.0 도 같습니다. 원문: packages/visualization/README.md:150
      - 이 브랜치는 릴리스 병합 전 커밋에서 갈라져 브랜치 안에서는 KAN-067 변경 기록이 아직 대기로 보입니다. main 에서는 이미 지워졌습니다. 원문: main a15549a 의 .changeset/ (config.json · README.md 만 남음)
      - visualization 은 0.4.1 에서 1.0.0 으로 크게(major) 올라, 버전 범위를 ^0.4 로 받은 앱은 손으로 올리기 전까지 절이 없는 README 를 읽습니다. core 는 1.2.2 라 ^1.2 범위면 다음 설치에 받습니다. 원문: main packages/visualization/package.json:3
    - **정할 것**
      루트 README 표 아래 문단에 「그 절은 설치한 패키지 안에도 있다」를 다시 넣을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | 버전 조건을 붙여 되살린다(core 1.2.2 · visualization 1.0.0 부터) | 루트 README 한 문장과 검토 한 번 | 저장소 대신 node_modules 만 읽는 앱 에이전트도 같은 절이 손안에 있다는 것을 압니다. 이미 배포된 버전이라 「부터」로 적으면 다음 배포가 와도 낡지 않습니다 |
    | 지운 채 둔다 | 루트 README 가 설치한 패키지 안의 사본을 알리지 않습니다 | 링크가 저장소의 절로 가므로 길은 그대로 이어지고, 지금 문단에 틀린 말은 없습니다 |

    > **판정** — _아직 없습니다._

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 수행 쪽 추천은 「버전 조건을 붙여 되살린다」입니다. 지운 근거가 틀렸으니 되돌리는 것이 맞고, core 1.2.2 · visualization 1.0.0 은 이미 배포된 버전이라 「부터」로 적으면 다음 배포가 와도 낡지 않습니다. 앱을 만드는 에이전트는 저장소보다 node_modules 에 풀린 배포물을 먼저 읽는다는 것이 KAN-067 의 전제입니다(packages/foundations/src/publishedDocs.ts:4). 그 자리에 같은 절이 있다고 알려 주면 저장소를 열지 않고도 길을 찾습니다.

- [ ] visualization README 의 「엣지는 보이지 않는다」 두 곳을 고칠 것인가 — 지금은 고치지 않았습니다. 이 두 줄은 이미 visualization 1.0.0 으로 배포됐습니다
      이 의견은 §3-1 「visualization README 의 「엣지는 보이」 의 추가 의견에서 갈라져 나왔습니다 (추가 2026-10-10).
    - **배경**
      - Provider 밖에서는 엣지 선이 그려지지 않지만 화살촉은 검게 남습니다. 2026-10-10 chromium 에서 잰 값입니다. 원문: apps/storybook/src/stories/ExtendWhenMissing.stories.tsx:159
      - 루트 README 는 이 카드에서 「검은 화살촉만 남는다」로 고쳤습니다. 원문: README.md:861
      - visualization README 두 곳은 「엣지는 보이지 않는다」고 적습니다. 원문: packages/visualization/README.md:163
      - 같은 서술의 두 번째 자리입니다. 원문: packages/visualization/README.md:235
      - 이 두 줄은 2026-10-10 04:13(한국 시각)에 배포된 visualization 1.0.0 의 README 에 이미 실려 있습니다. 원문: main a15549a(릴리스 PR #11 병합) · main packages/visualization/package.json:3
      - 세 문서 모두 「그림은 Provider 안에 둔다」는 결론은 같습니다. 갈리는 것은 Provider 밖 그림을 묘사하는 말뿐입니다.
      - 고치면 visualization 에 patch 변경 기록(changeset)이 하나 붙습니다. 변경 기록은 누가 배포를 낼 때까지 기다렸다가 그 배포에 함께 실립니다. 원문: .changeset/README.md
    - **정할 것**
      visualization README 두 줄을 어디서 고칠 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이 카드에서 함께 고친다 | 고칠 파일에 visualization README 와 변경 기록 하나가 더해지고, 검토를 한 번 더 받습니다 | 다음 visualization 배포부터 세 문서가 같은 사실을 말합니다. 고칠 두 자리는 이미 같은 스토리가 잰 값입니다 |
    | 후속 카드로 뺀다 | 두 줄 고침에 카드 하나가 듭니다 | 이 카드는 지금 범위로 닫히고, 결과는 위 갈래와 같지만 그 카드가 끝날 때까지 늦어집니다 |
    | 그대로 둔다 | 배포 README 와 루트 README 가 Provider 밖 화살촉을 다르게 묘사합니다 | 앱이 할 일(Provider 안에 둔다)은 같아서 실제로 막히는 일은 없습니다 |

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
     `review-judge --card KAN-072-KW0G9B --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-072-KW0G9B --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-072-KW0G9B --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
