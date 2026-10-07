---
card: KAN-059-62EAKB
title: core 키보드 포커스 표시 통일 — :focus-visible 테두리를 모든 상호작용 컴포넌트에
created: 2026-10-07
scope: packages/core/src/a11y/**, packages/core/src/components/Button.tsx, packages/core/src/components/Link.tsx, packages/core/src/components/Input.tsx, packages/core/src/components/Textarea.tsx, packages/core/src/components/Searchfield.tsx, packages/core/src/components/NumberField.tsx, packages/core/src/components/TreeView.tsx, packages/core/src/components/ScrollArea.tsx, packages/core/src/components/RichTextEditor.tsx, packages/core/src/components/Menu.tsx, packages/core/src/components/Switch.tsx, packages/core/src/components/Radio.tsx, packages/core/src/components/Card.tsx, packages/core/src/components/Calendar.tsx, packages/core/src/components/DatePicker.tsx, packages/core/src/blocks/Dock.tsx, packages/core/src/blocks/Gallery.tsx, packages/core/src/blocks/Testimonials.tsx, apps/storybook/src/real-input/**, keyboard-coverage.json, packages/foundations/src/keyboardCoverage.ts, packages/foundations/src/keyboardCoverage.test.ts, .changeset/kan-059-*.md
---

# KAN-059-62EAKB — core 키보드 포커스 표시 통일 — :focus-visible 테두리를 모든 상호작용 컴포넌트에

## 전략
카드 메모: KAN-054 검토 §3-6(2026-10-07 유저가 추천대로 재작업 선택)에서 나온 후속 · KAN-054는 Card·Calendar 날짜 칸·DatePicker 트리거 셋만 a11y/focusRing.ts 로 고쳤다 — 이 카드가 나머지를 같은 규칙으로

### 문제

KAN-054 가 빌드한 Storybook 을 실제 키로 돌아보다가 Button·Card 가 포커스를 받아도 화면에 아무 표시가 없는 것을 찾았다(KAN-054 수행 내역 2026-10-07T14:28). 원인은 컴포넌트가 인라인 `outline: 'none'` 으로 브라우저 기본 테두리를 끄고 대신 그리는 것이 없어서다. KAN-054 는 그중 자기가 키보드로 열어 준 셋(Card·Calendar 날짜 칸·DatePicker 기본 트리거)만 고쳤다.

2026-10-07 main(`5a7ff25`) 코드를 다시 읽어 남은 자리를 정리했다. 코드 읽기로 확인한 것이고 화면으로 돌려 보지는 않았다 — S2 의 실제 입력 테스트가 빨강으로 먼저 증명한다.

| 컴포넌트 | 포커스를 받는 요소 | 지금 표시 | 원문 |
|---|---|---|---|
| Button | button | 없음 | `Button.tsx:153` |
| Link | a | 상자 변형만 box-shadow 고리(마우스로 눌러도 생김), 글자 변형은 없음 | `Link.tsx:116, 135, 160-169` |
| NumberField 증감 버튼 | button | 없음 | `NumberField.tsx:132` |
| TreeView 항목 | treeitem | 선택 배경뿐(포커스와 무관) | `TreeView.tsx:395` |
| Menu 항목 | menuitem | 포커스 때 마우스 올림과 같은 배경 | `Menu.tsx:307, 324` |
| Dock 항목 | button | 포커스 때 마우스 올림과 같은 확대 | `blocks/Dock.tsx:184, 244` |
| ScrollArea | `tabIndex=0` 상자 | 없음 | `ScrollArea.tsx:66, 154` |
| Input(기본·composer) | input | 감싼 상자 테두리 색만 바뀜(1px) | `Input.tsx:158, 227, 264, 314` |
| Textarea | textarea | 없음 | `Textarea.tsx:117` |
| Searchfield | input | 없음 | `Searchfield.tsx:125` |
| NumberField 입력 | input | 없음 | `NumberField.tsx:308` |
| RichTextEditor | contentEditable | 바깥 상자 테두리 색만 바뀜 | `RichTextEditor.tsx:35, 56` |
| Switch | 1px 로 숨긴 input | 없음(트랙에 포커스 스타일 없음) | `Switch.tsx:155-164` |
| Radio `segmented` | 숨긴 input | 없음 | `Radio.tsx:295-303` |
| NumberField `seven-segment` | 숨긴 input | 없음 | `NumberField.tsx:203-212` |

`Menu.tsx:208` 의 `outline: 'none'` 은 목록(`ul`) 상자에 붙어 있는데 그 상자에는 `tabIndex` 가 없어 Tab 으로 닿지 않는다. 고칠 자리가 아니라 게이트 예외로 사유를 적는다.

### 범위를 어떻게 읽었는가

카드 목적은 「브라우저 기본 테두리를 끈 core 컴포넌트(components 13개·blocks 1개)」이고, 제목과 목표는 「키보드로 닿는 core 컴포넌트마다 포커스 표시가 보인다」다. 계획하며 다시 훑자 테두리를 끄지는 않았지만 입력 요소를 숨겨서 표시가 없는 자리가 셋 더 나왔다(위 표 아래 세 줄). 같은 결함이므로 이 카드에 넣었다(2026-10-07 유저 확인).

브라우저 기본 테두리가 그대로 보이는 컴포넌트(Tabs·Accordion·Checkbox·Pagination 등)는 표시가 있으므로 고칠 대상이 아니다. 그것을 bbangto 모양으로 바꾸는 일은 결함 수정이 아니라 모양 맞추기라 범위 밖에 둔다.

### 접근

1. **규칙은 하나다 — `a11y/focusRing.ts`.** 키보드 포커스(`:focus-visible`)일 때만 2px 실선 테두리, 간격 2px. 색은 `semantic.primary.base` 에서 **`semantic.border.focus`** 로 바꾼다.
   - `border.focus` 는 포커스 표시에 쓰라고 둔 토큰이고, Input·Link·Slider·RichTextEditor 가 이미 쓴다. 지금 규칙만 primary 를 쓴다.
   - foundations 79개(확장 76 + base 3) 중 76개는 두 값이 같다. 다른 셋은 amberDark·amberLight·highContrast 다(main dist 기준 계산).
   - 나중에 대비를 고칠 때 브랜드 색(primary)을 건드리지 않고 `border.focus` 만 고치면 된다.
   - KAN-054 의 셋도 이 상수를 읽으므로 함께 따라온다. KAN-054 검토 §3-6 의 대가 칸이 「셋의 표시 방식이 나중에 KAN-059에서 정할 규칙과 다를 수 있다」로 이 자리를 예고했다.
   - 이미 `:focus-visible` 스타일 블록을 쓰는 blocks 둘(`Gallery.tsx:195`, `Testimonials.tsx:438`)도 색 한 단어를 같은 토큰으로 바꾼다.
   - 스크롤·잘림 상자 안의 항목(Menu·TreeView 항목)은 바깥 2px 이 잘릴 수 있다. 그 자리만 안쪽 간격(`-2px`) 변형을 쓰고, 어느 쪽인지는 S6 화면 확인에서 정한다.
2. **판단은 훅 하나가 한다 — `useFocusVisible()`.** 포커스를 받는 순간 `isFocusVisible`(KAN-054)로 키보드 포커스인지 보고, 벗어나면 끈다. 소비자가 넘긴 `onFocus`·`onBlur` 는 `composeHandlers`(KAN-054 합성 규칙, 외부 먼저)로 합친다. Card·DatePicker 가 손으로 쓴 같은 상태를 이 훅으로 바꾼다. Calendar 는 날짜 칸마다 판단해 구조가 달라 그대로 둔다.
3. **테두리를 그리는 자리는 셋이다.**
   - 자기 자신: Button · Link(모든 변형. 상자 변형의 box-shadow 고리는 걷는다) · NumberField 증감 버튼 · Dock 항목 · TreeView 항목 · Menu 항목 · ScrollArea.
   - 감싼 상자: Input · Searchfield · NumberField · RichTextEditor 는 포커스가 안쪽 입력에 있을 때 바깥 상자에 그린다. Textarea 는 자기가 상자다. 글자 입력칸은 마우스로 눌러도 브라우저가 키보드 포커스로 친다(브라우저 기본 동작과 같다). 기존 테두리 색 변화는 스타일 가이드 모양이라 그대로 둔다.
   - 대신 보이는 요소: Switch 트랙 · Radio `segmented` 조각 · NumberField `seven-segment` 판.
4. **게이트 — 빠지면 `test:unit` 이 빨강이 된다.** `keyboard-coverage.json` 에 `focusRing`(컴포넌트·소스·표시 자리) 목록과 `focusRingIgnored`(소스·사유) 를 더하고, `keyboardCoverage.ts` 에 검사 함수를 하나 더한다.
   - 신호: core UI 폴더(components·blocks·patterns·motion)에서 인라인 `outline: 'none'`·스타일 문자열의 `outline: none`·숨김 패턴(`clip: rect(0 0 0 0)`, `clipPath: 'inset(50%)'`)이 나온 파일.
   - 위반: 신호가 나온 파일이 목록에도 예외에도 없을 때, 그리고 목록의 항목에 맞는 실제 입력 테스트(`FocusVisible.realinput.test.tsx` 안 `<컴포넌트>:` 로 시작하는 `it`)가 없을 때.
   - KAN-054 의 키보드 게이트와 같은 파일·같은 짜임이고, fixture 실패 주입을 함께 둔다. 게이트 목록(CLAUDE.md·gateDocs)은 바뀌지 않는다.
5. **실제 입력 테스트 — `pnpm test` 의 `real-input` 프로젝트.** 항목마다 실제 Tab 으로 오면 표시 요소의 `outline` 이 `solid 2px`, 실제 클릭이면 `none` 이다. 글자 입력칸은 클릭 대신 벗어나면 `none` 을 본다. KAN-054 의 `FocusVisible.realinput.test.tsx` 에 이어 쓴다.

### 바뀌는 동작 (changeset 에 적는다)

- 위 표의 컴포넌트가 키보드 포커스에서 테두리를 그린다. 글자 입력칸은 마우스로 눌러도 그린다.
- Link 상자 변형의 고리가 box-shadow 에서 outline 으로 바뀌고, 마우스로 누를 때는 더 안 생긴다.
- 포커스 테두리 색이 `primary.base` 에서 `border.focus` 로 바뀐다. 눈에 보이는 차이는 amberDark·amberLight·highContrast 셋이다.
- Input 처럼 `{...props}` 가 내부 `onFocus`·`onBlur` 를 덮던 자리는 합성된다(외부 먼저). 전에는 소비자가 `onFocus` 를 넘기면 내부 테두리 색 변화가 사라졌다.
- 등급은 KAN-054 와 같은 minor 다(화면이 바뀌는 컴포넌트가 많다).

### 버린 대안

- **공용 스타일시트 한 장**(`[data-…]:focus-visible { outline … !important }`) — 브라우저가 `:focus-visible` 을 계속 따라가는 장점이 있다. 그러나 인라인 `outline: 'none'` 을 이기려면 `!important` 가 필요해 소비자가 `style` 로 끌 수 없다. core 에는 스타일을 문서 머리에 한 번 넣는 자리가 없고(27개 파일이 컴포넌트마다 `<style>` 을 그린다), KAN-054 의 셋과 방식이 둘로 갈린다.
- **인라인 `outline: 'none'` 만 지워 브라우저 기본 테두리에 맡기기** — 가장 작다. 그러나 Input 은 감싼 상자가 `overflow: hidden` 이라 안쪽 입력의 테두리가 잘리고(`Input.tsx:236`), 숨긴 입력은 여전히 안 보이며, 브라우저마다 모양이 달라 통일이 안 된다.
- **색을 `primary.base` 로 두기** — 대비를 고칠 때 브랜드 색을 건드려야 한다.

### 알려진 한계

- 판단은 포커스를 받는 순간 한 번이다(KAN-054 와 같다). 마우스로 포커스한 뒤 키를 눌러도 테두리가 생기지 않는다.
- **테두리 색의 대비.** `border.focus` 가 배경과 3:1(WCAG 1.4.11 비텍스트 대비)이 안 되는 색 스킴이 있다. foundations 79개 중 21개다(배경 base·elevated 중 낮은 쪽, main dist 를 `tokens` 의 `contrastRatio` 로 계산). style guide 색 스킴 204개 중 측정되는 것만 13개이고, 그라디언트 배경은 측정 안 함이다. 고치는 일은 새 카드 KAN-060-G9YKG6 으로 나눴다(2026-10-07 유저 선택). 테두리는 `border.focus` 를 실행할 때 읽으므로 그 카드가 토큰 값을 고치면 이 카드의 결과에 그대로 반영된다.

### 겹침 처리

- KAN-055(배포)와 `.changeset/` 이 겹친다. KAN-054·058 과 같은 모양이다 — 이 카드의 changeset 은 병합 뒤에만 main 에 들어온다. 용인으로 기록했다(2026-10-07 유저 선택).
- KAN-056(visualization 템플릿)과는 scope 가 겹치지 않는다. KAN-057·060 은 실행 문서가 없어 판정 불가다. KAN-060 은 이 카드에서 갈라진 토큰 정리라 `a11y/` 를 건드리지 않을 예정이다.

### 범위 밖

- 브라우저 기본 테두리가 보이는 컴포넌트를 bbangto 모양으로 바꾸기.
- `border.focus` 값의 대비 정리(KAN-060-G9YKG6).
- 포커스 판단을 키 입력 때 다시 하는 개선.
- visualization 패키지의 포커스 표시.

## 실행 계획
- [ ] `S1` 게이트 먼저 — `keyboard-coverage.json` 에 `focusRing`(전략 표의 컴포넌트 + KAN-054 셋, 항목마다 `component`·`source`·`indicator`) 과 `focusRingIgnored`(`Menu.tsx` 목록 상자) 를 더하고, `packages/foundations/src/keyboardCoverage.ts` 에 검사 함수, `.test.ts` 에 실제 저장소 검사와 fixture 실패 주입을 더한다. 검사는 셋이다 — 신호가 나온 파일이 목록·예외에 있는가, 목록의 소스가 공용 규칙(`FOCUS_RING`·`useFocusVisible`·`:focus-visible`)을 쓰는가, 실제 입력 테스트에 `<컴포넌트>:` 항목이 있는가. 완료 기준: fixture 검사 초록, 실제 저장소 검사 빨강이고 위반 목록이 전략 표의 파일과 같다(KAN-054 셋은 위반에 없다)
- [ ] `S2` 실제 입력 테스트 먼저 — `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` 에 전략 표의 자리마다 항목을 더한다. 실제 Tab 이면 표시 요소의 `outline` 이 `solid 2px`, 실제 클릭이면 `none`(글자 입력칸은 벗어나면 `none`). 완료 기준: 새 항목이 모두 빨강, KAN-054 셋은 초록
- [ ] `S3` 공용 규칙 — `a11y/focusRing.ts` 색을 `border.focus` 로, 안쪽 간격 변형, `useFocusVisible()` 훅(외부 `onFocus`·`onBlur` 합성). Card·DatePicker 를 훅으로 바꾸고 Gallery·Testimonials 의 색 한 단어를 맞춘다. 완료 기준: KAN-054 실제 입력 셋과 Card·DatePicker·Calendar·Gallery·Testimonials 스토리 초록, core typecheck 통과
- [ ] `S4` 자기 자신에 그리는 자리 — Button · Link(모든 변형, 상자 변형 box-shadow 고리 걷기) · Dock 항목 · TreeView 항목 · Menu 항목 · ScrollArea. 완료 기준: 해당 실제 입력 항목 초록, 해당 스토리 초록
- [ ] `S5` 감싼 상자와 숨긴 입력 — Input(기본·composer) · Textarea · Searchfield · NumberField(입력은 상자, 증감 버튼은 자기 자신 — 한 파일이라 여기 몰았다) · RichTextEditor · Switch 트랙 · Radio `segmented` 조각 · NumberField `seven-segment` 판. 내부 `onFocus`·`onBlur` 를 `{...props}` 가 덮던 자리는 합성으로 바꾼다. 완료 기준: 실제 입력 항목 전부 초록, S1 게이트 초록
- [ ] `S6` 화면 확인과 마무리 — 빌드한 Storybook 에서 Playwright 실제 Tab 으로 각 자리를 찍어 테두리가 잘리거나 이웃을 덮지 않는지 본다(Menu·TreeView 는 여기서 안쪽 간격 여부를 정한다). changeset(`.changeset/kan-059-focus-ring.md`, core minor), 게이트 5종, 검토서. 완료 기준: 게이트 5종 초록, 검토로 이동

## 검증
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

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-07T18:07 · s:adde175a — `전략` 섹션 교체
- 2026-10-07T18:07 · s:adde175a — `실행 계획` 섹션 교체
- 2026-10-07T18:07 · s:adde175a — `검증` 섹션 교체
- 2026-10-07T18:08 · s:adde175a — `실행 계획` 섹션 교체
- 2026-10-07T19:17 · s:adde175a — `전략` 섹션 교체
- 2026-10-07T19:17 · s:adde175a — `전략` 섹션 교체
