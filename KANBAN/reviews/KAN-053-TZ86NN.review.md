---
card: KAN-053-TZ86NN
title: Drawer·Tabs·Select 키보드·포커스 지원 — Modal에서 공용 훅 추출
created: 2026-10-06
branch: KAN-053-TZ86NN
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-053-TZ86NN
base: b9f4a2f
status: 검토 대기
---

# KAN-053-TZ86NN 검토 요청 — Drawer·Tabs·Select 키보드·포커스 지원 — Modal에서 공용 훅 추출

카드: [KAN-053-TZ86NN.md](../cards/KAN-053-TZ86NN.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-053-TZ86NN` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-053-TZ86NN` |
| 베이스 | `b9f4a2f` |
| 변경 훑기 | `git diff b9f4a2f...HEAD` |

**커밋 6건**

```text
d6aa3fa KAN-053 S4: Select 키보드 적용 + changeset, Modal 열림 포커스 결함 수정 (게이트 5종 초록)
f9e87c8 KAN-053 S3: Drawer·Tabs 키보드·포커스 적용 (새 테스트 초록)
48dc248 kanban: KAN-053 배치2 착수 시점 판단 — 같은 세션에서 S3·S4 이어 감
c56cfad KAN-053 S2: a11y 공용 훅 넷 추출 + Modal 교체 (Modal 스토리 초록)
2cafe72 KAN-053 S1: Drawer·Tabs·Select 키보드 play 테스트 먼저 (빨강 6 · 기존 초록)
dd9a28c kanban: KAN-053 진행 중으로 이동
```

**변경 파일 20개 (+888 −118)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-053-keyboard-a11y.md` | M | 21 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 15 | 21 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 18 | 18 |
| `KANBAN/batches/KAN-053-TZ86NN.batch2.md` | M | 5 | 1 |
| `KANBAN/cards/KAN-053-TZ86NN.md` | M | 14 | 4 |
| `apps/storybook/src/stories/Drawer.stories.tsx` | M | 102 | 0 |
| `apps/storybook/src/stories/Select.stories.tsx` | M | 126 | 0 |
| `apps/storybook/src/stories/Tabs.stories.tsx` | M | 147 | 0 |
| `packages/core/src/a11y/index.ts` | M | 7 | 0 |
| `packages/core/src/a11y/useEscapeKey.ts` | M | 16 | 0 |
| `packages/core/src/a11y/useFocusTrap.ts` | M | 71 | 0 |
| `packages/core/src/a11y/useRovingFocus.ts` | M | 61 | 0 |
| `packages/core/src/a11y/useTypeahead.ts` | M | 46 | 0 |
| `packages/core/src/components/Drawer.tsx` | M | 26 | 3 |
| `packages/core/src/components/Modal.tsx` | M | 10 | 41 |
| `packages/core/src/components/Select.tsx` | M | 122 | 15 |
| `packages/core/src/components/Tabs.tsx` | M | 77 | 12 |

**롤백 태그 6개**

```text
kan/KAN-053-TZ86NN/S1
kan/KAN-053-TZ86NN/S2
kan/KAN-053-TZ86NN/S3
kan/KAN-053-TZ86NN/S4
kan/KAN-053-TZ86NN/batch1
kan/KAN-053-TZ86NN/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-053-TZ86NN.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← 키보드 play 테스트가 실제 chromium 에서 돈다
pnpm --filter storybook build
pnpm test:unit
```

### 빨강 → 초록

1. `S1` 직후: Drawer·Tabs·Select의 새 키보드 테스트가 빨강. 기존 스토리는 초록.
2. `S2` 직후: Modal 스토리 초록 유지(훅 교체가 동작을 바꾸지 않았다는 확인).
3. `S3` 직후: Drawer·Tabs 초록, Select 빨강 유지.
4. `S4` 직후: 전부 초록.

### 추가 확인

- 키보드만으로 Storybook에서 세 컴포넌트를 한 번씩 써 본다(마우스 없이 열기·이동·선택·닫기)
- `grep -n "onKeyDown\|useEscapeKey\|useFocusTrap" packages/core/src/components/Modal.tsx` — 인라인 키 처리 대신 훅을 쓴다

**실행 결과**

```text
pnpm build                      exit 0
pnpm typecheck                  exit 0
pnpm test                       exit 0 — Test Files 184 passed (184) · Tests 1239 passed (1239)
pnpm --filter storybook build   exit 0 — Storybook build completed successfully
pnpm test:unit                  exit 0 — hooks 115 · visualization 257 · foundations 62 · style-guide-catalog 76 · visualization-style-guide-catalog 39 passed
빨강→초록: S1 직후 새 키보드 테스트 6건 빨강(기존 29 초록) → S3 직후 Select 2건만 빨강 → S4 직후 4파일 35/35 초록
추가 확인(정적 Storybook + Playwright 실제 키 입력): Drawer Enter 열기→포커스 패널 안 · Tab 순환 · Esc→연 버튼 복귀 / Tabs →로 Settings 이동·Tab 한 번에 묶음 밖 / Select Tab 도달·↓↓ 활성 Option 2·Enter 후 포커스 유지 / Modal Enter 열기→포커스 대화상자 안(수정 전에는 버튼에 남음, 착수 전 main 빌드도 동일)
grep onKeyDown Modal.tsx → handleKeyDown 이 useEscapeKey·useFocusTrap 처리기를 부른다(인라인 키 처리 없음)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-053-TZ86NN --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-053-TZ86NN --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-053-TZ86NN --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] Tabs에서 화살표로 탭을 옮기면 내용도 바로 바꿀 것인가 — 바로 바꾸게(자동 활성화) 했습니다
    - **배경**
      - 지금은 →를 누르면 옆 탭으로 포커스가 가면서 그 탭의 내용이 곧바로 보입니다. 원문: packages/core/src/components/Tabs.tsx:139
      - W3C의 탭 지침(APG)은 내용이 바로 그려질 수 있으면 이 방식을 권하고, 내용을 불러오는 데 시간이 걸리면 화살표는 포커스만 옮기고 Enter·Space로 고르는 방식을 권합니다. 원문: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
      - 이 방식에서는 화살표를 누를 때마다 외부 앱이 넘긴 탭 변경 콜백이 불립니다. 탭을 바꿀 때 데이터를 불러오는 앱이면 화살표로 지나가기만 해도 요청이 나갑니다. 원문: .changeset/kan-053-keyboard-a11y.md
    - **정할 것**
      화살표가 내용까지 바꾸는 지금 방식으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 지금대로 둔다 | 탭 전환에 무거운 일을 거는 앱은 화살표마다 그 일이 돈다 | 키 한 번에 내용이 보인다 |
    | 화살표는 포커스만, Enter·Space로 고른다 | 내용을 보려면 키를 한 번 더 눌러야 한다 | 콜백이 사용자가 고를 때만 불린다 |
    | 앱이 고르게 옵션을 연다 | 옵션이 하나 늘고 이 카드 범위가 커진다 | 앱마다 맞는 쪽을 고른다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 이번 변경을 core의 minor 버전(1.2.0)으로 낼 것인가 — minor로 적었습니다
    - **배경**
      - 외부 앱 쪽에서 달라 보이는 것이 셋입니다. Tabs 화살표가 선택을 옮기고, 선택 안 된 탭 자리에 숨은 빈 패널 요소가 생기며, Select의 접근성 이름과 오류 표시가 바깥 상자에서 combobox 요소로 옮겨 갑니다. 원문: .changeset/kan-053-keyboard-a11y.md
      - 화면 동작으로는 고장을 고친 것이지만, 외부 앱이 바깥 상자의 오류 표시를 찾거나 숨은 요소까지 세는 자동 테스트를 갖고 있으면 그 테스트가 깨질 수 있습니다.
      - core는 지금 1.1.2이고, 버전 규칙(semver)에서 minor는 기존 사용처가 깨지지 않는다는 약속입니다. 배포는 KAN-055가 맡습니다. 원문: packages/core/package.json:3
      - 이 저장소 안에서는 깨진 곳이 없습니다. 세 컴포넌트를 쓰는 곳은 각자의 스토리 파일뿐이고 전체 play 테스트 1239건이 초록입니다.
    - **정할 것**
      minor로 낼 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** minor로 낸다 | 위 같은 테스트를 가진 외부 앱은 갱신 뒤 테스트를 고쳐야 한다 | 지금 들여오려는 앱이 버전 범위를 안 바꾸고 받는다 |
    | major(2.0.0)로 낸다 | 외부 앱이 버전 범위를 직접 올려야 받는다 | 바뀐 동작을 모르고 받는 일이 없다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] Select 목록이 열린 채 Tab을 누르면 고르지 않고 닫기만 할 것인가 — 닫기만 하게 했습니다
    - **배경**
      - W3C 예시(APG Select-only Combobox)는 목록이 열린 채 Tab을 누르면 가리키던 옵션을 고르고 다음 요소로 갑니다. 원문: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      - 이번 구현은 고르지 않고 닫기만 한 뒤 다음 요소로 갑니다. 원문: packages/core/src/components/Select.tsx:160
      - 예시 방식에서는 화살표로 훑어보다가 Tab으로 빠져나가면 마지막에 가리킨 값이 저장됩니다.
    - **정할 것**
      닫기만 하는 지금 방식으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 닫기만 한다 | W3C 예시와 다르다 | 훑어보다 Tab으로 나가도 값이 안 바뀐다 |
    | 가리킨 옵션을 고르고 닫는다 | 훑어보다 나가면 값이 바뀐다 | W3C 예시와 같다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 계획에 없던 수정 다섯 건을 이 카드에 함께 넣어도 되는가 — 같은 종류의 결함이거나 이번 변경이 새로 만든 구멍이라 넣었습니다
    - **배경**
      - Modal을 키보드로 열면 포커스가 대화상자로 들어가지 않고 연 버튼에 남던 결함을 고쳤습니다. 이 카드를 시작하기 전 main 빌드에서도 같았습니다. 원문: packages/core/src/a11y/useFocusTrap.ts:29
      - Modal과 Drawer에 키 처리 콜백을 넘기면 Esc 닫기와 포커스 가두기가 꺼지던 것을 고쳤습니다. Tabs의 클릭 콜백이 선택을 막던 것과 같은 종류입니다. 원문: packages/core/src/components/Modal.tsx:93
      - 선택된 탭이 없으면 Tab으로 탭 묶음에 아예 못 들어가는 경우가 이번 변경으로 생겨서, 그때는 첫 활성 탭을 Tab 정지점으로 삼게 했습니다. 원문: packages/core/src/components/Tabs.tsx:114
      - Select에서 키보드로 가리킨 옵션과 이미 고른 옵션이 같은 배경색이라 구별이 안 돼서, 가리킨 옵션에 안쪽 테두리를 더했습니다. 원문: packages/core/src/components/Select.tsx:267
      - Select 옵션을 마우스로 누르면 포커스가 사라지던 것을 막았고, 불러오는 중이면 그 사실을 화면 낭독기에 알립니다. 원문: packages/core/src/components/Select.tsx:342
    - **정할 것**
      다섯 건을 이 카드에 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 둔다 | 카드 범위가 전략에 적은 것보다 넓어진다 | 키보드 사용자가 겪을 구멍이 같은 배포에서 함께 닫힌다 |
    | 빼서 별도 카드로 옮긴다 | 되돌리는 커밋과 카드 하나가 더 든다 | 이 카드의 변경이 전략에 적은 것과 같아진다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 대화상자를 열 때 포커스가 들어가는지를 play 테스트가 못 잡는 문제를 어떻게 둘 것인가 — 이번에는 실제 키 입력으로 한 번 확인만 했습니다
    - **배경**
      - 4번 항목의 Modal 결함은 play 테스트를 통과한 상태에서 실제 키 입력으로만 드러났습니다. play 테스트는 키 입력을 흉내 내서 화면이 그려지는 순서가 실제와 다릅니다. 원문: apps/storybook/src/stories/Drawer.stories.tsx:81
      - 카드 목표는 키보드·포커스 동작이 실제 chromium 위 play 테스트로 확인되는 것입니다. 원문: KANBAN.md:100
      - 이번에는 Storybook 정적 빌드에 실제 키 입력을 보내 Modal·Drawer·Tabs·Select를 한 번씩 확인했습니다. 이 확인은 게이트에 들어가 있지 않습니다.
      - 나머지 11곳을 맡은 KAN-054는 키보드 테스트가 있는지만 보는 정적 게이트를 계획하고 있습니다. 원문: KANBAN/cards/KAN-054-M48FNQ.md:31
    - **정할 것**
      실제 키 입력 확인을 게이트로 만들 것인가, 만든다면 어느 카드에서 할 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** KAN-054에 넘긴다 | 그 카드 범위가 조금 커진다 | 나머지 11곳과 함께 실제 키 입력 확인이 게이트가 된다 |
    | 이 카드에서 만든다 | 이 카드 검토가 한 번 더 돈다 | 세 컴포넌트에 바로 붙는다 |
    | 지금대로 둔다 | 같은 종류의 결함이 테스트를 통과해 나갈 수 있다 | 할 일이 늘지 않는다 |

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
     `review-judge --card KAN-053-TZ86NN --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-053-TZ86NN --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-053-TZ86NN --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
