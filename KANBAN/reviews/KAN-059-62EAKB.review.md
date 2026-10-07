---
card: KAN-059-62EAKB
title: core 키보드 포커스 표시 통일 — :focus-visible 테두리를 모든 상호작용 컴포넌트에
created: 2026-10-07
branch: KAN-059-62EAKB
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-059-62EAKB
base: f0dc035
status: 검토 대기
---

# KAN-059-62EAKB 검토 요청 — core 키보드 포커스 표시 통일 — :focus-visible 테두리를 모든 상호작용 컴포넌트에

카드: [KAN-059-62EAKB.md](../cards/KAN-059-62EAKB.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-059-62EAKB` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-059-62EAKB` |
| 베이스 | `f0dc035` |
| 변경 훑기 | `git diff f0dc035...HEAD` |

**커밋 7건**

```text
a7afef7 chore(KAN-059): S6 — 화면 확인(19자리, 잘림 없음)·changeset·게이트 5종 초록
b31a0f6 feat(KAN-059): S5 — 입력칸·숨긴 입력 키보드 포커스 테두리, Input 처리기 합성
dd28abd feat(KAN-059): S4 — Button·Link·Dock·TreeView·Menu·ScrollArea 키보드 포커스 테두리
178e91f feat(KAN-059): S3 — 포커스 테두리 규칙을 border.focus 하나로, useFocusVisible 훅
ef1dcc4 test(KAN-059): S2 — 포커스 표시 실제 입력 17항목(빨강), TreeView 현황을 실측대로 고침
2f2751e test(KAN-059): S1 — 포커스 표시 게이트(focusRing 선언 + auditFocusRing), 새 13파일에서 빨강
30001ab kanban: KAN-059 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 31개 (+767 −137)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-059-focus-ring.md` | M | 23 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 14 | 15 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 8 | 8 |
| `KANBAN/cards/KAN-059-62EAKB.md` | M | 23 | 7 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | M | 264 | 1 |
| `keyboard-coverage.json` | M | 22 | 1 |
| `packages/core/src/a11y/focusRing.ts` | M | 14 | 6 |
| `packages/core/src/a11y/index.ts` | M | 3 | 1 |
| `packages/core/src/a11y/useFocusVisible.ts` | M | 35 | 0 |
| `packages/core/src/blocks/Dock.tsx` | M | 8 | 3 |
| `packages/core/src/blocks/Gallery.tsx` | M | 1 | 1 |
| `packages/core/src/blocks/Testimonials.tsx` | M | 1 | 1 |
| `packages/core/src/components/Button.tsx` | M | 6 | 1 |
| `packages/core/src/components/Card.tsx` | M | 4 | 6 |
| `packages/core/src/components/DatePicker.tsx` | M | 5 | 5 |
| `packages/core/src/components/Input.tsx` | M | 30 | 36 |
| `packages/core/src/components/Link.tsx` | M | 7 | 15 |
| `packages/core/src/components/Menu.tsx` | M | 11 | 7 |
| `packages/core/src/components/NumberField.tsx` | M | 22 | 6 |
| `packages/core/src/components/Radio.tsx` | M | 6 | 0 |
| `packages/core/src/components/RichTextEditor.tsx` | M | 8 | 2 |
| `packages/core/src/components/ScrollArea.tsx` | M | 7 | 2 |
| `packages/core/src/components/Searchfield.tsx` | M | 8 | 1 |
| `packages/core/src/components/Switch.tsx` | M | 7 | 0 |
| `packages/core/src/components/Textarea.tsx` | M | 6 | 1 |
| `packages/core/src/components/TreeView.tsx` | M | 12 | 7 |
| `packages/foundations/src/keyboardCoverage.test.ts` | M | 103 | 1 |
| `packages/foundations/src/keyboardCoverage.ts` | M | 105 | 0 |

**롤백 태그 8개**

```text
kan/KAN-059-62EAKB/S1
kan/KAN-059-62EAKB/S2
kan/KAN-059-62EAKB/S3
kan/KAN-059-62EAKB/S4
kan/KAN-059-62EAKB/S5
kan/KAN-059-62EAKB/S6
kan/KAN-059-62EAKB/batch1
kan/KAN-059-62EAKB/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-059-62EAKB.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← real-input 프로젝트의 FocusVisible 항목이 여기서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← keyboardCoverage.test.ts 의 포커스 표시 검사가 여기서 돈다
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다). 실제 입력 테스트는 core `dist` 를 읽으므로 core 를 고칠 때마다 `pnpm --filter @centurio1987/bbangto-ui-core build` 뒤 Storybook 캐시 세 곳(`node_modules/.cache/storybook`·`apps/storybook/node_modules/.cache`·`apps/storybook/node_modules/.vite`)을 지운다.

### 빨강 → 초록

1. `S1` 직후: `test:unit` 의 포커스 표시 검사가 빨강이고 위반이 전략 표의 파일과 같다. fixture 검사는 초록이다.
2. `S2` 직후: `pnpm test` 의 `real-input` 에서 새 항목이 모두 빨강(`outline` 이 `none`), KAN-054 셋은 초록이다.
3. `S3` 직후: KAN-054 셋이 여전히 초록이다(색만 바뀌고 `solid 2px` 는 그대로).
4. `S4`·`S5` 직후: 새 항목이 모두 초록, `test:unit` 포커스 표시 검사 초록.

### 게이트 자체 시험 (fixture 실패 주입)

- 목록에 없는 파일에 `outline: 'none'` 을 넣으면 위반이 난다.
- 숨김 패턴(`clip: 'rect(0 0 0 0)'`)만 있는 파일도 위반이 난다.
- 목록에 있지만 공용 규칙을 안 쓰는 소스는 위반이 난다.
- 목록에 있지만 실제 입력 항목이 없으면 위반이 난다.
- 예외에 사유 없이 올린 항목은 위반이 난다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 화면 — 빌드한 Storybook 에서 실제 Tab 으로 각 자리를 찍어 테두리가 보이고 잘리지 않는지 본다. 마우스 클릭 때는 테두리가 없는지(글자 입력칸 제외)도 같은 자리에서 본다.
- 합성 — 소비자가 `onFocus` 를 넘겨도 테두리가 생기는지 실제 입력 항목 하나로 본다.
- `grep` — core UI 폴더에서 `outline: 'none'` 이 남은 파일이 모두 `focusRing` 목록이나 예외에 있다(게이트와 같은 결과여야 한다).

**실행 결과**

```text
pnpm typecheck — 종료코드 0
pnpm build — 종료코드 0
pnpm test — Test Files 192 passed (192) · Tests 1289 passed (1289) (real-input FocusVisible 20건 포함)
pnpm --filter storybook build — 종료코드 0
pnpm test:unit — 종료코드 0 · hooks 115 · visualization 257 · foundations 112(포커스 표시 게이트 포함) · style-guide-catalog 76 · visualization-style-guide-catalog 39
화면 확인 — 빌드한 Storybook 에서 실제 Tab 으로 19자리: 모두 2px 테두리 하나, overflow 로 잘리는 조상 없음
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-059-62EAKB --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-059-62EAKB --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-059-62EAKB --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 포커스 테두리 색을 브랜드 색에서 포커스 전용 색으로 바꿀 것인가 — 포커스 전용 색(border.focus)으로 바꿨습니다
    - **배경**
      - KAN-054 는 Card·Calendar 날짜 칸·DatePicker 에 브랜드 기본 색(primary)으로 테두리를 그렸다. 이번에 그 규칙 한 줄을 포커스 전용 색으로 바꿨다. 원문: packages/core/src/a11y/focusRing.ts:25
      - foundation 에는 포커스 표시에 쓰라고 둔 색이 따로 있고, Input·Link·Slider 가 이미 그 색을 쓴다. 원문: packages/core/src/components/Input.tsx:88
      - foundation 79개 중 76개는 두 색이 같다. 화면에서 달라지는 것은 amberDark·amberLight·고대비 셋이다(main 빌드 산출물로 계산).
      - 대비가 모자란 색 스킴을 고칠 KAN-060 은 이 색 하나만 고치면 되고, 브랜드 색은 건드리지 않는다.
    - **정할 것**
      포커스 테두리 색을 포커스 전용 색으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 포커스 전용 색으로 둔다 | 색 스킴 셋에서 KAN-054 셋의 테두리 색이 바뀐다 | 모든 컴포넌트의 포커스 색이 한 토큰을 따르고, KAN-060 이 그 토큰만 고치면 된다 |
    | 브랜드 색으로 되돌린다 | Input·Link 의 포커스 색과 다른 색이 남는다 | 대비를 고치려면 브랜드 색을 바꿔야 한다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 글자 입력칸은 마우스로 눌러도 테두리가 보이게 둘 것인가 — 그렇게 뒀습니다
    - **배경**
      - 브라우저는 글자 입력칸을 마우스로 눌러도 키보드 포커스로 친다. 그래서 Input·Textarea·Searchfield·NumberField·RichTextEditor 는 클릭해도 2px 테두리가 생긴다.
      - Input·RichTextEditor 가 원래 하던 1px 테두리 색 변화는 스타일 가이드 모양이라 남겼다. 포커스 때 1px 색 변화 바깥에 2px 테두리가 한 겹 더 생긴다. 원문: packages/core/src/components/Input.tsx:225
      - 버튼·링크·스위치처럼 글자를 넣지 않는 컴포넌트는 마우스로 누르면 테두리가 생기지 않는다. 실제 클릭을 보내는 테스트로 확인했다. 원문: apps/storybook/src/real-input/FocusVisible.realinput.test.tsx:140
    - **정할 것**
      입력칸을 클릭할 때 테두리가 보이는 것을 받을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 받는다 | 입력칸을 클릭할 때마다 테두리가 생긴다 | 브라우저 기본 동작과 같고, 입력칸 다섯이 다른 컴포넌트와 같은 표시를 쓴다 |
    | 입력칸은 테두리 없이 색 변화만 둔다 | Textarea·Searchfield·NumberField 는 색 변화도 없어서 새로 만들어야 한다 | 1px 색 변화만으로는 잘 안 보이는 표시가 입력칸에 남는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] TreeView 를 고칠 대상으로 둘 것인가 — 계획과 달리 브라우저 기본 테두리가 이미 있었지만 고쳤습니다
    - **배경**
      - 계획 때는 TreeView 항목에 표시가 없다고 적었다. 실제 키 입력 테스트로 보니 브라우저 기본 테두리가 항목 전체에 그려지고 있었다. 계획 문서의 표를 실측대로 고쳤다. 원문: KANBAN/cards/KAN-059-62EAKB.md 「전략」 문제 표
      - 그 기본 테두리는 펼친 폴더에서 자식 목록까지 한꺼번에 감싸서, 지금 어느 항목에 있는지 흐렸다.
      - 지금은 행 하나에만 안쪽 2px 테두리를 그린다. 빌드한 Storybook 의 펼친 트리에서 확인했다. 원문: packages/core/src/components/TreeView.tsx:403
    - **정할 것**
      TreeView 를 이렇게 바꾼 것을 받을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 받는다 | 브라우저 기본 모양 대신 core 모양이 된다 | 펼친 트리에서도 항목 하나만 표시되고 다른 컴포넌트와 같아진다 |
    | 되돌린다 | 게이트 예외에 TreeView 를 사유와 함께 올려야 한다 | 펼친 폴더에서 고리가 하위 트리 전체를 감싸는 모양이 남는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 외부 앱이 Input·Link 에 넘긴 포커스 처리기가 내부 처리를 덮지 않게 바꿀 것인가 — 바꿨습니다
    - **배경**
      - 전에는 외부 앱이 Input 에 포커스 처리기(onFocus)를 넘기면 포커스 때 테두리 색이 바뀌지 않았다. Link 상자 변형은 포커스 고리가 생기지 않았다.
      - 이제 외부 처리기가 먼저 불리고 내부 처리가 이어진다. KAN-054 가 키 처리기에 정한 합성 규칙과 같다. 원문: packages/core/src/a11y/composeHandlers.ts:16
      - 외부 처리기에서 preventDefault 를 하면 내부 처리를 건너뛴다. 테두리도 그때는 그리지 않는다. 원문: packages/core/src/a11y/useFocusVisible.ts:29
      - 실제 키 입력 테스트가 처리기를 넘긴 Input 에서 테두리와 외부 처리기 호출을 함께 본다. 원문: apps/storybook/src/real-input/FocusVisible.realinput.test.tsx:266
    - **정할 것**
      이 동작 변화를 이 카드에 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이 카드에 둔다 | 처리기를 넘긴 외부 앱에서 Input·Link 의 포커스 모양이 바뀐다 | 외부 처리기 때문에 포커스 표시가 사라지는 일이 없다 |
    | 옛 동작을 남긴다 | 처리기를 넘기면 테두리를 끄는 갈래를 따로 둬야 한다 | 처리기를 넘긴 Input·Link 는 포커스 표시가 없다 |

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
     `review-judge --card KAN-059-62EAKB --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-059-62EAKB --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-059-62EAKB --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
