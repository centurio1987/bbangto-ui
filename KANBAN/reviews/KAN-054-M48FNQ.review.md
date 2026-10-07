---
card: KAN-054-M48FNQ
title: 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트
created: 2026-10-07
branch: KAN-054-M48FNQ
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-054-M48FNQ
base: 1ebedb33b9b7e2b373d26a31297016ccb7768a67
status: 검토 대기
---

# KAN-054-M48FNQ 검토 요청 — 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트

카드: [KAN-054-M48FNQ.md](../cards/KAN-054-M48FNQ.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-054-M48FNQ` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-054-M48FNQ` |
| 베이스 | `1ebedb33b9b7e2b373d26a31297016ccb7768a67` |
| 변경 훑기 | `git diff 1ebedb33b9b7e2b373d26a31297016ccb7768a67...HEAD` |

**커밋 20건**

```text
1ee38d0 KAN-054 S11: changeset 보강 + 게이트 5종 + 검토서 §3-5·§3-6 재작업 결과 반영
40ba448 KAN-054 S10: DropdownMenu 닫힘을 합성 규칙에 맞춤 — 항목 실행 신호로만 닫는다
9b4c507 KAN-054 S9: 키보드로 열어 준 셋에 포커스 표시 — Card·Calendar 날짜 칸·DatePicker 트리거
88c5c26 KAN-054 S8: 키보드 게이트 범위를 blocks·patterns·motion 까지 + FeatureGrid 탭 키보드
8a51d22 kanban: KAN-054 S7 완료 — main 병합 후 직렬·용인 기록 복원(KAN-051→055 외 2)
4ee72e1 Merge branch 'main' into KAN-054-M48FNQ — KAN-051(번들 트리 셰이킹·크기 게이트) 반영
8022aaa kanban: KAN-054 재작업 계획 — 전략 덧붙임·S7~S11·배치4·5·scope(FeatureGrid) + 용인·직렬 재기록
d161b02 kanban: KAN-054 진행 중으로 — 검토 반려(§3-5·§3-6) 재작업
bcf7e2d kanban: KAN-054 재검토(kanban-reviewer) — §3-3 승인, §3-5·§3-6 반려(추천대로 재작업)
4fd7399 kanban: KAN-054 검토서 §3-3·§3-5·§3-6 상세 정정 — 검토자가 짚은 사실 반영
89a4ecd kanban: KAN-054 검토 대행(kanban-reviewer) — 항목 승인 4 · 추가 의견 6
cd9a529 kanban: KAN-054 계획 리포트 다시 그림(6/6 진행 반영)
47b8d76 kanban: KAN-054 검토로 이동 — 검토서(판단 항목 6건)·검토 리포트
7a9e114 KAN-054 S6: Pagination·DataGrid·Card·FileUploader·Accordion + changeset
72974cc KAN-054 S5: 복합 위젯 키보드 — SegmentedControl·TreeView·Calendar·DatePicker·Carousel
82ead62 KAN-054 S4: 오버레이 키보드 — Tooltip·Popover·Menu·DropdownMenu
ffb9222 KAN-054 S3: 키 처리 콜백 합성 규칙 통일 — a11y/composeHandlers
ffa0fae KAN-054 S2: 실제 키 입력 게이트 — real-input vitest 프로젝트 + Modal·Drawer·Select
e69616f KAN-054 S1: 키보드 커버리지 게이트 — keyboard-coverage.json + keyboardCoverage.test.ts
bffb5fa kanban: KAN-054 진행 중으로 이동
```

**변경 파일 69개 (+4818 −410)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-054-keyboard.md` | M | 35 | 0 |
| `.kanban/archive.jsonl` | M | 10 | 0 |
| `.kanban/log.md` | M | 10 | 10 |
| `.kanban/reviews/KAN-054-M48FNQ.events.jsonl` | M | 29 | 0 |
| `.kanban/reviews/KAN-054-M48FNQ.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 140 | 140 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 5 | 4 |
| `KANBAN/batches/KAN-054-M48FNQ.batch1.md` | M | 2 | 0 |
| `KANBAN/batches/KAN-054-M48FNQ.batch2.md` | M | 2 | 1 |
| `KANBAN/batches/KAN-054-M48FNQ.batch3.md` | M | 2 | 1 |
| `KANBAN/batches/KAN-054-M48FNQ.batch4.md` | M | 53 | 0 |
| `KANBAN/batches/KAN-054-M48FNQ.batch5.md` | M | 46 | 0 |
| `KANBAN/cards/KAN-054-M48FNQ.md` | M | 48 | 7 |
| `KANBAN/reports/KAN-054-M48FNQ.report.html` | M | 7 | 7 |
| `KANBAN/reviews/KAN-054-M48FNQ.review.html` | M | 1279 | 0 |
| `KANBAN/reviews/KAN-054-M48FNQ.review.md` | M | 349 | 0 |
| `apps/storybook/src/real-input/DatePicker.realinput.test.tsx` | M | 31 | 0 |
| `apps/storybook/src/real-input/Drawer.realinput.test.tsx` | M | 49 | 0 |
| `apps/storybook/src/real-input/DropdownMenu.realinput.test.tsx` | M | 44 | 0 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | M | 78 | 0 |
| `apps/storybook/src/real-input/Modal.realinput.test.tsx` | M | 41 | 0 |
| `apps/storybook/src/real-input/Popover.realinput.test.tsx` | M | 28 | 0 |
| `apps/storybook/src/real-input/Select.realinput.test.tsx` | M | 44 | 0 |
| `apps/storybook/src/real-input/mount.tsx` | M | 32 | 0 |
| `apps/storybook/src/stories/Accordion.stories.tsx` | M | 25 | 0 |
| `apps/storybook/src/stories/Calendar.stories.tsx` | M | 56 | 0 |
| `apps/storybook/src/stories/Card.stories.tsx` | M | 37 | 0 |
| `apps/storybook/src/stories/Carousel.stories.tsx` | M | 39 | 0 |
| `apps/storybook/src/stories/DataGrid.stories.tsx` | M | 82 | 0 |
| `apps/storybook/src/stories/DatePicker.stories.tsx` | M | 105 | 0 |
| `apps/storybook/src/stories/FeatureGrid.stories.tsx` | M | 46 | 0 |
| `apps/storybook/src/stories/FileUploader.stories.tsx` | M | 33 | 1 |
| `apps/storybook/src/stories/Menu.stories.tsx` | M | 194 | 1 |
| `apps/storybook/src/stories/Modal.stories.tsx` | M | 77 | 0 |
| `apps/storybook/src/stories/Pagination.stories.tsx` | M | 38 | 0 |
| `apps/storybook/src/stories/Popover.stories.tsx` | M | 43 | 0 |
| `apps/storybook/src/stories/SegmentedControl.stories.tsx` | M | 48 | 0 |
| `apps/storybook/src/stories/Select.stories.tsx` | M | 33 | 0 |
| `apps/storybook/src/stories/Tooltip.stories.tsx` | M | 45 | 1 |
| `apps/storybook/src/stories/TreeView.stories.tsx` | M | 48 | 0 |
| `apps/storybook/vite.config.ts` | M | 17 | 0 |
| `keyboard-coverage.json` | M | 249 | 0 |
| `packages/core/src/a11y/composeHandlers.ts` | M | 19 | 0 |
| `packages/core/src/a11y/dateGridKeys.ts` | M | 44 | 0 |
| `packages/core/src/a11y/focusRing.ts` | M | 25 | 0 |
| `packages/core/src/a11y/focusWhenReady.ts` | M | 20 | 0 |
| `packages/core/src/a11y/index.ts` | M | 4 | 0 |
| `packages/core/src/a11y/useFocusTrap.ts` | M | 6 | 6 |
| `packages/core/src/blocks/FeatureGrid.tsx` | M | 15 | 0 |
| `packages/core/src/components/Calendar.tsx` | M | 86 | 39 |
| `packages/core/src/components/Card.tsx` | M | 16 | 5 |
| `packages/core/src/components/Carousel.tsx` | M | 7 | 3 |
| `packages/core/src/components/DataGrid.tsx` | M | 36 | 10 |
| `packages/core/src/components/DatePicker.tsx` | M | 146 | 24 |
| `packages/core/src/components/Drawer.tsx` | M | 3 | 4 |
| `packages/core/src/components/FileUploader.tsx` | M | 12 | 3 |
| `packages/core/src/components/Menu.tsx` | M | 170 | 101 |
| `packages/core/src/components/Modal.tsx` | M | 3 | 4 |
| `packages/core/src/components/Pagination.tsx` | M | 14 | 0 |
| `packages/core/src/components/Popover.tsx` | M | 12 | 12 |
| `packages/core/src/components/Searchfield.tsx` | M | 3 | 3 |
| `packages/core/src/components/SegmentedControl.tsx` | M | 38 | 0 |
| `packages/core/src/components/Select.tsx` | M | 3 | 2 |
| `packages/core/src/components/Tabs.tsx` | M | 3 | 5 |
| `packages/core/src/components/Tooltip.tsx` | M | 19 | 6 |
| `packages/core/src/components/TreeView.tsx` | M | 64 | 8 |
| `packages/foundations/src/keyboardCoverage.test.ts` | M | 224 | 0 |
| `packages/foundations/src/keyboardCoverage.ts` | M | 224 | 0 |

**롤백 태그 16개**

```text
kan/KAN-054-M48FNQ/S1
kan/KAN-054-M48FNQ/S10
kan/KAN-054-M48FNQ/S11
kan/KAN-054-M48FNQ/S2
kan/KAN-054-M48FNQ/S3
kan/KAN-054-M48FNQ/S4
kan/KAN-054-M48FNQ/S5
kan/KAN-054-M48FNQ/S6
kan/KAN-054-M48FNQ/S7
kan/KAN-054-M48FNQ/S8
kan/KAN-054-M48FNQ/S9
kan/KAN-054-M48FNQ/batch1
kan/KAN-054-M48FNQ/batch2
kan/KAN-054-M48FNQ/batch3
kan/KAN-054-M48FNQ/batch4
kan/KAN-054-M48FNQ/batch5
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-054-M48FNQ.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← 키보드 play 테스트 + 실제 키 입력 테스트(real-input 프로젝트)가 chromium 에서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← keyboardCoverage.test.ts 가 여기서 돈다
```

core를 고칠 때마다 `pnpm --filter @centurio1987/bbangto-ui-core build` 후 Storybook·Vite 캐시를 지우고 돌린다(Storybook이 core `dist`를 읽는다).

### 빨강 → 초록

1. `S1` 직후: 커버리지 게이트가 빨강. 빨간 항목이 전략 표의 14개(처음 11개 + Card·FileUploader·Accordion)와 일치해야 한다. 누락 검사가 표에 없는 것을 더 잡으면 표에 더하고, 표에 있는데 못 잡으면 검사 규칙을 고친다. KAN-053의 4개(Modal·Drawer·Tabs·Select)는 초록이어야 한다.
2. `S2` 직후: 실제 입력 프로젝트가 지금 코드에서 초록. `useFocusTrap` 재시도를 걷어낸 상태에서는 Modal 항목이 빨강(수행 내역에 결과를 남기고 걷어낸 것은 되돌린다).
3. `S3` 직후: 합성 규칙 스토리 둘이 빨강 → 초록. 커버리지 게이트의 빨간 항목 수는 그대로.
4. `S4`·`S5`·`S6`를 지날 때마다 해당 컴포넌트가 빨간 항목에서 빠진다.
5. `S6` 직후: 전부 초록.

### 게이트 자체 시험

- 키보드 테스트가 없는 가짜 상호작용 컴포넌트를 fixture로 넣으면 누락 검사가 빨강이 되는지
- 목록에 있는데 지정한 스토리의 play에서 `userEvent.keyboard`를 지우면 테스트 검사가 빨강이 되는지
- `realInput: true` 항목의 실제 입력 테스트를 지우면 빨강이 되는지
- 실제 입력 게이트가 KAN-053의 Modal Enter 결함을 잡는지(`S2`의 재시도 걷어내기)

### 추가 확인

- 키보드만으로 Storybook에서 고친 컴포넌트를 한 번씩 써 본다(마우스 없이 열기·이동·선택·닫기)
- `grep -rn "onKeyDown?.(e)" packages/core/src/components` — 0건(모든 합성이 도우미를 지난다)

**실행 결과**

```text
pnpm typecheck — exit 0
pnpm build — exit 0
pnpm test — exit 0
 Test Files  192 passed (192)
      Tests  1272 passed (1272)
pnpm --filter storybook build — exit 0
pnpm test:unit — exit 0 (번들 크기 게이트 포함)
packages/hooks test:       Tests  115 passed (115)
packages/visualization test:       Tests  257 passed (257)
packages/foundations test:       Tests  101 passed (101)
packages/style-guide-catalog test:       Tests  76 passed (76)
.../visualization-style-guide-catalog test:       Tests  39 passed (39)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-054-M48FNQ --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-054-M48FNQ --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-054-M48FNQ --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 외부 앱이 키 처리를 막으면 컴포넌트 기본 동작을 건너뛰게 한 규칙으로 배포할 것인가 — 그렇게 맞췄습니다
    - **배경**
      - 외부 앱이 넘긴 키 처리 콜백과 컴포넌트 자체 키 처리를 묶는 방식이 컴포넌트마다 다섯 갈래였다. KAN-053 검토에서 이 카드로 넘어온 건이다. 원문: KANBAN/cards/KAN-054-M48FNQ.md 「KAN-053에서 넘어온 것」
      - 지금은 규칙이 하나다. 외부 콜백을 먼저 부르고, 외부가 기본 동작을 막았으면(preventDefault) 컴포넌트 처리를 건너뛴다. 원문: packages/core/src/a11y/composeHandlers.ts:11
      - 외부 앱에서 보이는 변화는 둘이다. Modal·Drawer에서 Esc를 막으면 닫히지 않고, Searchfield에서 Enter를 막으면 검색이 실행되지 않는다. 원문: .changeset/kan-054-keyboard.md
      - 이 저장소 안에서 이 컴포넌트들을 쓰는 곳은 스토리뿐이다.
    - **정할 것**
      이 규칙으로 배포할 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | Esc·Enter를 막던 외부 앱은 동작이 바뀐다 | 외부 앱이 컴포넌트 기본 동작을 끌 길이 생긴다 |
    | 컴포넌트 처리를 먼저 하고 외부 콜백을 나중에 부른다 | 외부 앱이 기본 동작을 끌 길이 없다 | Esc로 안 닫히게 하려면 Modal에 따로 옵션을 더해야 한다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 클릭 처리만 넘긴 Card를 키보드로도 누를 수 있게 할 것인가 — 그렇게 했습니다
    - **배경**
      - 전에는 Card에 클릭 처리(onClick)를 넘겨도 interactive를 따로 켜지 않으면 마우스로만 누를 수 있었다.
      - 지금은 클릭 처리만 넘겨도 Tab으로 닿고 Enter/Space로 눌리며 포인터 커서가 생긴다. 원문: packages/core/src/components/Card.tsx:69
      - 마우스 전용으로 두려면 interactive={false}를 적는다.
      - 클릭할 수 있는 카드가 있는 외부 앱은 Tab 순서에 카드가 새로 들어온다.
    - **정할 것**
      Card의 기본값을 이렇게 바꿀 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 클릭 처리가 있으면 키보드로도 누른다 | 외부 앱의 Tab 순서가 길어질 수 있다 | 클릭할 수 있는 카드를 키보드 사용자도 쓴다 |
    | 지금처럼 interactive를 켜야만 키보드로 누른다 | 클릭 처리만 넘긴 카드는 계속 마우스 전용이다 | 같은 결함이 외부 앱마다 남는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 계획에 없던 수정을 이 카드에 함께 넣어도 되는가 — 같은 종류의 결함이라 넣었습니다
    - **배경**
      - DropdownMenu를 Enter로 열면 실제 브라우저에서 포커스가 첫 항목으로 안 가고 트리거에 남았다. 이번에 만든 실제 입력 검사가 찾았고, 기존 play 테스트는 통과하고 있었다.
      - 원인은 메뉴가 서서히 나타나는 효과다. 나타나는 첫 순간에는 포커스를 받지 못한다. 열 때는 바로 보이게 바꿨다. 원문: packages/core/src/components/Menu.tsx:639
      - 같은 원인으로 Popover도 열 때 포커스가 안 들어갔다. KAN-053의 포커스 이동 함수를 포커스가 실제로 들어갈 때까지 다시 시도하게 고쳤다. 원문: packages/core/src/a11y/useFocusTrap.ts:36
      - TreeView는 접힌 폴더에서 ↓를 누르면 보이지 않는 자식으로 가려다 멈췄다. 보이는 항목만 오가게 고쳤다.
      - 외부 앱이 넘긴 처리기가 컴포넌트 처리기를 통째로 덮던 곳 네 군데(TreeView·MenuItem·FileUploader·Tooltip)도 고쳤다.
      - 처음 결함 표 11곳에 Card·FileUploader·Accordion을 더했다. 새 게이트가 이 셋을 누락으로 잡기 때문이다. Accordion은 결함이 없어 테스트만 달았다.
    - **정할 것**
      이 수정들을 이 카드에 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이 카드에 둔다 | 검토할 변경이 늘었다 | 키보드 결함이 한 번에 닫힌다 |
    | 따로 카드로 뗀다 | 되돌려서 다시 나눠야 한다 | 그동안 키보드 게이트가 빨강이라 이 카드를 닫을 수 없다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 실제 키 입력 검사를 열 때 포커스가 옮겨 가는 오버레이 여섯에만 둘 것인가 — 그렇게 뒀습니다
    - **배경**
      - 기존 play 테스트는 키 입력을 흉내 내서, 화면이 그려지는 순서에 걸린 포커스 결함을 못 잡는다. KAN-053에서 넘어온 건이다.
      - 이번에 Playwright로 실제 키를 보내는 검사를 pnpm test 안에 뒀다. KAN-053의 Modal 결함을 일부러 되살리면 이 검사만 빨강이 되고 play 테스트는 초록이었다. 원문: KANBAN/cards/KAN-054-M48FNQ.md 「수행 내역」 S2
      - 대상은 열 때 포커스가 옮겨 가는 여섯(Modal·Drawer·Select·Popover·DropdownMenu·DatePicker)이다. 어느 컴포넌트가 대상인지는 keyboard-coverage.json의 realInput이 정하고, 빠지면 test:unit이 빨강이 된다. 원문: keyboard-coverage.json
      - Tabs·Menu·TreeView처럼 열고 닫지 않는 위젯은 play 테스트만 있다.
    - **정할 것**
      실제 입력 검사 대상을 이 기준으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 오버레이 여섯으로 둔다 | 열고 닫지 않는 위젯의 렌더 순서 결함은 못 잡는다 | 검사가 빠르고 결함이 실제로 나온 자리를 덮는다 |
    | 키보드 목록 18개 전부로 넓힌다 | 테스트 파일이 12개 늘고 pnpm test가 길어진다 | 같은 종류의 결함을 위젯에서도 잡는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 키보드 게이트가 core의 components 폴더만 보게 둘 것인가 — 그렇게 뒀습니다
    - **배경**
      - 게이트는 packages/core/src/components 아래 파일만 훑는다. 원문: packages/foundations/src/keyboardCoverage.test.ts:48
      - 그 밖의 폴더(blocks·patterns·motion)는 안 본다. blocks/FeatureGrid.tsx에 탭 목록이 있는데, 키보드로 쓸 수 있는지는 확인 안 함. 원문: packages/core/src/blocks/FeatureGrid.tsx:367
    - **정할 것**
      검사 범위를 넓힐 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 두고 넓히는 일은 새 카드로 | 그 폴더의 결함은 당분간 안 잡힌다 | 이 카드를 지금 닫을 수 있다 |
    | 이 카드에서 넓힌다 | 걸리는 블록을 이 카드에서 고쳐야 한다 | 범위가 더 커지고 검토를 다시 받는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 키보드로 포커스해도 화면에 표시가 없는 결함을 어디서 고칠 것인가 — 이 카드에서는 손대지 않았습니다
    - **배경**
      - 빌드한 Storybook을 실제 키로 돌아보며 화면을 찍었다. Button과 Card는 포커스를 받아도 테두리나 그림자 같은 표시가 없다.
      - core에는 키보드 포커스 표시용 스타일(:focus-visible)이 한 곳도 없고, 14개 파일이 브라우저 기본 테두리를 끈다. 원문: packages/core/src/components/Button.tsx:153
      - Menu 항목처럼 배경색으로 대신 보여 주는 곳도 있다.
      - 이 카드의 범위는 키보드로 닿고 조작하는 것이다. 포커스 표시는 Button·Input처럼 이 카드 밖 컴포넌트에 걸친다.
      - Card는 이번에 클릭 처리만 넘겨도 Tab 순서에 들어오게 되어서, 표시 없는 정지점이 늘었다.
    - **정할 것**
      포커스 표시를 어디서 고칠 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 새 카드로 core 전체의 포커스 표시를 맞춘다 | 그 카드가 끝날 때까지 표시가 없다 | 표시 하나를 모든 컴포넌트에 같은 규칙으로 단다 |
    | 이 카드에서 Card만 고친다 | Button 등은 그대로다 | 컴포넌트마다 다른 표시가 생길 수 있다 |

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
     `review-judge --card KAN-054-M48FNQ --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-054-M48FNQ --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-054-M48FNQ --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
