---
card: KAN-054-M48FNQ
title: 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트
created: 2026-10-05
scope: packages/core/src/a11y/**, packages/core/src/components/Popover.tsx, packages/core/src/components/Tooltip.tsx, packages/core/src/components/Menu.tsx, packages/core/src/components/SegmentedControl.tsx, packages/core/src/components/Calendar.tsx, packages/core/src/components/DatePicker.tsx, packages/core/src/components/Pagination.tsx, packages/core/src/components/DataGrid.tsx, packages/core/src/components/TreeView.tsx, packages/core/src/components/Carousel.tsx, packages/core/src/components/Card.tsx, packages/core/src/components/FileUploader.tsx, packages/core/src/components/Modal.tsx, packages/core/src/components/Drawer.tsx, packages/core/src/components/Tabs.tsx, packages/core/src/components/Select.tsx, packages/core/src/components/Searchfield.tsx, apps/storybook/src/stories/Popover.stories.tsx, apps/storybook/src/stories/Tooltip.stories.tsx, apps/storybook/src/stories/Menu.stories.tsx, apps/storybook/src/stories/SegmentedControl.stories.tsx, apps/storybook/src/stories/Calendar.stories.tsx, apps/storybook/src/stories/DatePicker.stories.tsx, apps/storybook/src/stories/Pagination.stories.tsx, apps/storybook/src/stories/DataGrid.stories.tsx, apps/storybook/src/stories/TreeView.stories.tsx, apps/storybook/src/stories/Carousel.stories.tsx, apps/storybook/src/stories/Card.stories.tsx, apps/storybook/src/stories/FileUploader.stories.tsx, apps/storybook/src/stories/Accordion.stories.tsx, apps/storybook/src/stories/Modal.stories.tsx, apps/storybook/src/stories/Select.stories.tsx, apps/storybook/vite.config.ts, apps/storybook/src/real-input/**, packages/core/src/blocks/FeatureGrid.tsx, apps/storybook/src/stories/FeatureGrid.stories.tsx, keyboard-coverage.json, packages/foundations/src/keyboardCoverage.ts, packages/foundations/src/keyboardCoverage.test.ts, .changeset/kan-054-*.md
---

# KAN-054-M48FNQ — 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트

## 전략
### 문제

외부 앱이 보고한 세 곳(Drawer·Tabs·Select, KAN-053) 말고도 같은 키보드·포커스 결함이 core에 더 있다. 2026-10-07 재수립 때 main(`d545ac8`) 코드를 다시 읽어 확인했다. 코드 읽기로 확인한 것이고 실행은 하지 않았다. 공용 훅(`packages/core/src/a11y/`)을 쓰는 곳은 KAN-053이 고친 넷(Modal·Drawer·Tabs·Select)뿐이고 아래 어느 컴포넌트도 쓰지 않는다.

**처음 계획한 11곳** — 9곳은 그대로이고 2곳(Menu 단독·Carousel)은 일부만 맞았다.

| 컴포넌트 | 결함 | 근거 |
|---|---|---|
| Tooltip | Esc로 닫히지 않음. 말풍선에 `id`가 없고 트리거에 `aria-describedby`가 없음. `{...props}`가 뒤에 펼쳐져 사용자 `onFocus`/`onBlur`가 보이기·숨기기를 덮어씀 | `Tooltip.tsx:134-141` |
| Popover | 열 때 포커스는 패널로 가지만 닫을 때 트리거로 돌아오지 않음. `aria-expanded`/`aria-controls`가 실제 트리거가 아니라 감싼 div에 붙음. Esc는 `document` 리스너로 손수 처리 | `Popover.tsx:90-123, 342-348` |
| Menu(단독) | 화살표·Home/End·글자 검색 없음. 항목의 Enter/Space만 있음(처음 표의 "키 처리 전무"는 틀렸다). 단독 Menu 스토리 6개가 `{ArrowDown}`을 누르고 아무것도 확인하지 않음 | `Menu.tsx:156-167, 198-203` |
| DropdownMenu | Home/End·글자 검색 없음. 활성 항목이 전부 `tabIndex=0`이라 roving이 아님. 트리거 쪽 활성 index를 보조기술이 알 수 없음(`aria-activedescendant` 없음) | `Menu.tsx:232, 400, 440-514` |
| SegmentedControl | 조각이 div `onClick`뿐 — role·tabIndex·키 처리·`aria-checked`가 없어 키보드로 닿지 않음 | `SegmentedControl.tsx:99-117` |
| TreeView | Home/End·글자 검색 없음. 모든 treeitem이 `tabIndex=0`. `{...props}`가 뒤에 펼쳐져 사용자 `onKeyDown`이 내부 처리 전체를 덮어씀 | `TreeView.tsx:141-201, 257-258, 374` |
| Calendar | 화살표가 roving `tabIndex`만 바꾸고 `.focus()`가 없어 실제 포커스는 그대로. 월 경계에서 멈춤. 두 달 보기(`dual`)의 둘째 달은 전부 `tabIndex=-1`에 키 처리 없음 | `Calendar.tsx:217-239, 610-614, 656-681` |
| DatePicker | 기본 변형의 트리거 div가 `tabIndex=0`인데 키 처리·role이 없어 Enter/Space로 안 열림. 팝업 날짜에 화살표 없음. 주간 띠(`inline-week-strip`)는 화살표 기준점을 포커스가 아니라 선택값에서 잡아 한 칸 넘게 못 감. 휠(`wheel`) 목록은 화살표가 없고 옵션마다 Tab 정지점 | `DatePicker.tsx:167-186, 272-332, 410-425, 521-529` |
| Pagination | 기본 변형의 페이지 번호가 `div role=button tabIndex=0`인데 키 처리 없음. 점(`dot`) 변형은 role·tabIndex·키 처리가 모두 없음 | `Pagination.tsx:116-131, 371-383` |
| DataGrid | 정렬 헤더(`<th>`)가 `onClick`뿐 — 포커스할 수 없고 `aria-sort`도 없음. 스토리 파일이 없음 | `DataGrid.tsx:103-107` |
| Carousel | region에 `tabIndex`가 없다. 내부 화살표·점 버튼에 포커스가 있을 때는 키가 거품으로 올라가 닿지만, 둘 다 끈 경우와 슬라이드 내용에 포커스가 있을 때는 닿지 않음. 화살표 처리에 `preventDefault`가 없음 | `Carousel.tsx:264-283` |

**재확인에서 더 나온 것** — 「검증」의 「누락 검사가 표에 없는 것을 더 잡으면 표에 더한다」를 미리 적용한다.

| 컴포넌트 | 결함 | 근거 |
|---|---|---|
| Card | `onClick`을 넘기고 `interactive`를 안 켜면 마우스로만 누를 수 있는 div가 됨 | `Card.tsx:171-180, 248-259` |
| FileUploader | 기본 변형의 드롭존이 div `onClick`뿐이고 숨은 `input`은 포커스할 수 없어 키보드로 파일을 고를 길이 없음. avatar 변형은 `{...props}`가 뒤에 펼쳐져 사용자 `onKeyDown`이 내부 처리를 덮어씀 | `FileUploader.tsx:121-130, 191-198, 396-404` |
| Accordion | 결함 없음(Enter/Space·ARIA 정상). 헤더가 `div role=button onClick`이라 누락 검사에 걸리므로 목록에 올리고 키보드 테스트만 단다 | `Accordion.tsx:294-307` |

**외부 `onKeyDown`을 내부 키 처리와 묶는 방식이 다섯 갈래다.** 외부 앱이 키 처리를 덧붙이거나 막으려 할 때 컴포넌트마다 결과가 다르다.

| 방식 | 컴포넌트 |
|---|---|
| 외부 먼저, 기본 동작이 막혔으면 내부를 건너뜀 | Tabs(`Tabs.tsx:131-132`) |
| 외부 먼저, 막혀도 내부를 이어서 함 | Modal·Drawer(`Modal.tsx:92-96`), DropdownMenu 트리거(`Menu.tsx:588-591`, 순서는 내부 먼저) |
| 내부 먼저, 외부 나중 | Card·Searchfield·Carousel(`Card.tsx:174-180`, `Searchfield.tsx:98-103`, `Carousel.tsx:274-283`) |
| 외부가 바깥 div에 붙어 거품으로 나중에 받음 | Select(`Select.tsx:296-301`) |
| 외부가 내부를 통째로 덮어씀 | TreeView·MenuItem·FileUploader avatar(키), Tooltip(포커스) |

### 접근

1. **정적 게이트를 먼저 건다.** 루트 `keyboard-coverage.json`(정본) + `packages/foundations/src/keyboardCoverage.ts`(검사 함수) + `keyboardCoverage.test.ts`. 자리와 짜임은 `metadataCoverage.ts`/`.test.ts`를 따른다.
   - **누락 검사**: core `components/`에서 상호작용 컴포넌트를 찾는다 — `role`이 dialog·tablist·listbox·combobox·menu·tree·grid·radiogroup인 것, 그리고 button·a·input·select·textarea·label이 아닌 소문자 요소에 `onClick`을 단 것. 파일 단위로 보고, 목록에 없으면 빨강이다. 목록이 검사보다 넓은 것(DataGrid처럼 컴포넌트 태그에 `onClick`을 단 경우)은 허용한다.
   - **테스트 검사**: 목록의 각 항목은 **스토리 이름**을 지정한다. 그 스토리가 지정한 파일에 있고, play 함수가 `userEvent.keyboard` 또는 `userEvent.tab`을 쓰는지 본다. 파일 단위로만 보면 Menu·TreeView·Carousel·DatePicker가 지금도 통과한다 — 이미 키를 누르는 스토리가 하나씩 있기 때문이다. 단독 Menu 스토리처럼 키만 누르고 아무것도 확인하지 않는 것도 통과시킨다.
   - **실제 입력 표시**: 열 때 포커스가 옮겨 가는 오버레이(Modal·Drawer·Select·Popover·DropdownMenu·DatePicker)는 `realInput: true`를 달고, 실제 입력 테스트 파일에 그 컴포넌트 항목이 있는지도 본다(접근 2와 잇는다).
2. **실제 키 입력 게이트를 따로 둔다.** (KAN-053에서 넘어온 2) play 테스트는 `storybook/test`의 `userEvent`가 이벤트를 흉내 내는 방식이라, KAN-053의 「Modal을 Enter로 열면 포커스가 안 들어간다」처럼 렌더 순서에 걸린 결함을 못 잡는다. vitest 4 브라우저 모드의 `vitest/browser` `userEvent.keyboard`는 provider(여기서는 Playwright)의 API로 실제 키를 보낸다(`@vitest/browser/context.d.ts:271-277`의 설명이 Playwright `Keyboard` API를 가리킨다). `apps/storybook/vite.config.ts`에 두 번째 vitest 프로젝트(`real-input`)를 두고 `apps/storybook/src/real-input/*.realinput.test.tsx`를 돌린다. 스토리를 `composeStories`로 다시 쓰고, 안 되면 컴포넌트를 직접 그린다. 이 프로젝트는 `pnpm test` 안에서 돌므로 게이트 목록(CLAUDE.md·gateDocs)은 바뀌지 않는다.
   - **먼저 확인할 것**: 이 방식이 그 결함을 실제로 잡는지는 아직 돌려 보지 않았다. `useFocusTrap`의 프레임 재시도를 잠시 걷어낸 상태에서 Modal 항목이 빨강이 되는지로 확인한다. 안 잡히면 이 접근을 버리고, 빌드한 Storybook에 Playwright를 직접 붙이는 길로 간다. 그 길은 게이트 명령이 하나 늘어나므로 CLAUDE.md·gateDocs를 고쳐야 하고, 그 전에 유저에게 묻는다.
3. **합성 규칙을 하나로 맞춘다.** (KAN-053에서 넘어온 1) 규칙은 **「외부 콜백을 먼저 부르고, 외부가 기본 동작을 막았으면(`preventDefault`) 내부 처리를 건너뛴다」** 하나다. Tabs가 이미 이렇게 한다. 외부 앱에 내부 동작을 끌 길을 주는 쪽이 안전하다(Radix UI도 같은 규칙으로 알고 있으나 이번에 소스를 열어 확인하지는 않았다). `a11y/composeHandlers.ts`에 도우미 하나를 두고 위 다섯 갈래를 모두 이 도우미로 바꾼다. Select는 외부 `onKeyDown`을 바깥 div가 아니라 트리거에 붙인다.
   - **동작이 바뀌는 곳**: Modal·Drawer에서 외부 앱이 Esc에 `preventDefault`를 하면 이제 닫히지 않는다. Searchfield에서 Enter에 `preventDefault`를 하면 `onSearch`가 불리지 않는다. 지금 저장소 안 사용처는 스토리뿐이다(KAN-053 검토 §3-2와 같은 확인).
   - 도우미는 core에 vitest가 없어 단위 테스트를 두지 않는다. core에 vitest를 넣으려면 `packages/core/package.json`을 고쳐야 하는데 그 파일은 KAN-055 범위다. 대신 Modal(Esc를 막으면 열린 채로)·Select(키를 막으면 안 열림) 스토리가 동작으로 확인한다.
4. **`a11y/` 훅을 이어 써서 고친다.** 오버레이(Tooltip·Popover·Menu·DropdownMenu) → 복합 위젯(SegmentedControl·TreeView·Calendar·DatePicker·Carousel) → 나머지(Pagination·DataGrid·Card·FileUploader·Accordion 테스트) 순서다. 동작 기준은 WAI-ARIA APG(W3C의 위젯별 키보드 동작 지침)이고, 목록형 위젯에서 Tab은 고르지 않고 닫기만 한다(KAN-053 검토 §3-3에서 승인된 Select 규칙을 Menu·DropdownMenu에도 따른다).

### 버린 대안

- **QUALITY_CHECKLIST.md에 키보드 항목만 추가** — 문서에만 적으면 같은 결함이 다시 생긴다. 그 파일은 KAN-050 범위이기도 하다.
- **axe 같은 자동 접근성 검사 도입** — 정적 ARIA 속성은 잡지만 키보드 동작(포커스 이동·Esc)은 못 잡는다. 이 카드의 결함 대부분이 동작이다. `@storybook/addon-a11y`가 이미 깔려 있지만 `test: 'todo'`로 꺼져 있고, 켜는 일은 이 카드의 목적과 다르다.
- **합성 규칙을 「내부 먼저, 외부 나중」으로 통일** — 외부 앱이 내부 동작(Esc 닫기 등)을 끌 길이 없어진다. 고칠 곳 수도 비슷하다.
- **실제 입력 검사를 play 함수 안에서 `vitest/browser`로** — Storybook 화면에서 스토리를 열 때는 vitest가 없어 그 import가 깨진다.
- **새로 찾은 Card·FileUploader를 별도 카드로** — 같은 정적 게이트가 이들을 누락으로 잡으므로, 빼면 이 카드의 게이트가 초록이 될 수 없다.

### 겹침 처리

- KAN-053 뒤에 직렬로 섰고 KAN-053은 완료됐다. 이 절이 그 재수립이다(2026-10-07).
- KAN-055와 용인: 이 카드의 changeset은 이 카드가 끝나 main에 병합된 뒤에만 들어오므로 그 전 배포에 섞이지 않는다. 범위가 넓어져도 KAN-055와 겹치는 자리는 `.changeset/`뿐이다.
- 범위에 KAN-053이 고친 네 파일(Modal·Drawer·Tabs·Select)과 그 스토리가 다시 들어온다. KAN-053은 완료라 병렬 충돌은 없다.

### KAN-053에서 넘어온 것 (2026-10-06 검토 승인)

KAN-053 검토서(`KANBAN/reviews/KAN-053-TZ86NN.review.md` · 정본 `.kanban/reviews/KAN-053-TZ86NN.events.jsonl`)에서 넘긴 두 건을 둘 다 work로 받았다.

1. **키 처리 콜백 합성 규칙 통일** → 접근 3, work `S3`.
2. **실제 키 입력 게이트** → 접근 2, work `S2`.

### 범위 밖

- Accordion 헤더 사이 화살표·Home/End(APG에서 선택 사항). 목록에는 올리고 키보드 테스트만 단다.
- FormLayout `drawer`/`dialog` 레이아웃(열고 닫는 상태가 없는 레이아웃이라 성격이 다르다)
- `@storybook/addon-a11y` 켜기(`a11y.test`를 `todo`에서 바꾸는 일)
- RadioGroup·Switch·Slider — 브라우저 기본 입력 요소라 키보드가 이미 된다

### 재작업 (2026-10-07 검토 반려)

검토서 §3-5·§3-6을 검토자(kanban-reviewer, opus)가 반려했고, 유저가 추천대로 이 카드에서 다시 작업하기로 정했다. §3-3 의견에서 나온 DropdownMenu 닫힘도 유저가 함께 넣기로 했다.

1. **main을 먼저 합친다.** 그사이 KAN-051(번들 트리 셰이킹, `test:unit`의 번들 크기 게이트)이 main에 들어갔다. 코드 충돌은 없고 칸반 파일만 충돌한다(병합 시험으로 확인). 합친 뒤 직렬·용인 기록을 main 쪽 값과 대조한다.
2. **게이트 범위를 넓히고 FeatureGrid 탭을 고친다.** 누락 검사가 core의 `components/`만 보던 것을 `blocks/`·`patterns/`·`motion/`까지 넓힌다. 같은 검사 함수로 걸리는 파일은 `blocks/FeatureGrid.tsx` 하나다. 그 탭은 선택된 탭만 Tab 정지점이고 키 처리가 없어 다른 탭에 닿을 수 없다. Tabs와 같은 규칙(화살표·Home/End, 옮기면 선택도 옮김)으로 고친다.
3. **이 카드가 키보드로 열어 준 셋에 포커스 표시를 단다.** Card, Calendar 날짜 칸, DatePicker 기본 트리거다. 셋 다 인라인 `outline: 'none'`이라 스타일 블록의 `:focus-visible`로는 덮을 수 없다. 포커스를 받을 때 `:focus-visible`인지 보고(`element.matches`) 그때만 테두리를 단다. 모양은 저장소 선례(`blocks/Gallery.tsx:195` — `outline 2px solid primary.base`, 간격 2px)를 따른다. 키보드 포커스 판정은 흉내 낸 입력으로는 믿기 어려워 실제 입력 테스트로 확인한다. core 전체의 포커스 표시는 새 카드로 넘긴다.
4. **DropdownMenu의 닫힘을 합성 규칙에 맞춘다.** 지금은 항목을 고르면 목록 쪽 처리가 늘 닫아서, 외부가 항목 처리기에서 `preventDefault`를 해도 막을 수 없다. 항목이 실제로 실행됐을 때만 닫도록, 실행 신호를 항목에서 내부 문맥(context)으로 받는다. 그러면 외부가 막을 때 항목 실행과 닫힘이 함께 건너뛰어진다(1번 규칙과 같다). 공개 API는 바뀌지 않는다.

## 실행 계획
- [x] `S1` 정적 키보드 커버리지 게이트 — 루트 `keyboard-coverage.json`(컴포넌트 → 소스 파일 · 스토리 파일 · 키보드 스토리 이름 · 필요한 동작 · `realInput`)과 `packages/foundations/src/keyboardCoverage.ts`·`.test.ts`(누락 검사 · 테스트 검사 · 실제 입력 표시 검사 · fixture 실패 주입). 목록은 이 단계에서 끝까지 채운다(전략 표 14개 + KAN-053의 4개). 완료 기준: 실제 저장소 검사가 빨강이고, 빨간 항목이 전략 표의 14개와 일치. fixture 검사는 초록
- [x] `S2` 실제 키 입력 게이트 — `apps/storybook/vite.config.ts`에 `real-input` 프로젝트, `apps/storybook/src/real-input/`에 Modal·Drawer·Select·Tabs 항목(`vitest/browser`의 `userEvent`). 첫 일은 수단 확인: `useFocusTrap` 프레임 재시도를 잠시 걷어내면 Modal(Enter로 열기 → 포커스가 대화상자 안) 항목이 빨강이 되는지. 완료 기준: 지금 코드에서 초록, 재시도를 걷어내면 빨강(걷어낸 것은 커밋하지 않는다). `pnpm test`가 두 프로젝트를 모두 돈다
- [x] `S3` 합성 규칙 통일 — `a11y/composeHandlers.ts`(외부 먼저, `preventDefault`면 내부 건너뜀)를 Modal·Drawer·Tabs·Select·Card·Searchfield·Carousel·DropdownMenu 트리거·TreeView·MenuItem·FileUploader avatar·Tooltip에 적용. 테스트 먼저: Modal(Esc를 막으면 열린 채로)·Select(키를 막으면 안 열림) 스토리. 완료 기준: 두 스토리 빨강 → 초록, 기존 스토리 초록, `grep -n "onKeyDown?.(e)" packages/core/src/components`가 0건
- [x] `S4` 오버레이 — Tooltip(Esc · `aria-describedby`), Popover(포커스 복귀 · ARIA를 실제 트리거로 · `useEscapeKey`), Menu 단독(화살표 · Home/End · 글자 검색), DropdownMenu(roving · Home/End · 글자 검색 · Tab은 닫기만). 실제 입력 항목에 Popover·DropdownMenu 추가. 완료 기준: 네 컴포넌트의 키보드 스토리와 실제 입력 항목 초록, 커버리지 게이트의 빨간 항목에서 넷이 빠짐
- [x] `S5` 복합 위젯 — SegmentedControl(radiogroup · 화살표), TreeView(Home/End · roving · 글자 검색), Calendar(실제 포커스 이동 · 월 넘김 · 두 달 보기), DatePicker(기본 트리거 키 · 팝업 화살표 · 주간 띠 기준점 · 휠 목록), Carousel(region 포커스 · `preventDefault`). 실제 입력 항목에 DatePicker 추가. 완료 기준: 다섯 컴포넌트의 키보드 스토리 초록, 빨간 항목에서 다섯이 빠짐
- [x] `S6` 나머지 + changeset — Pagination(기본 · 점), DataGrid(정렬 헤더 버튼 · `aria-sort` · 스토리 신설), Card(`onClick`만 줘도 키보드로 닿게), FileUploader(기본 드롭존), Accordion(키보드 테스트만), changeset(core minor). 완료 기준: 커버리지 게이트를 포함한 게이트 5종 초록
- [ ] `S7` main 합치기 — `git merge main`, 칸반 파일 충돌은 병합 런북(`rebuild --salvage` → `reconcile` → `validate`)으로 풀고 직렬·용인 기록을 main 쪽과 대조해 잃은 것을 다시 건다. 완료 기준: 병합 커밋, `validate` 오류 0, `pnpm test:unit`(번들 크기 게이트 포함) 초록
- [ ] `S8` 게이트 범위 넓히기 + FeatureGrid 탭 — 누락 검사를 `components/`·`blocks/`·`patterns/`·`motion/`으로 넓히고 `keyboard-coverage.json`에 FeatureGrid(스토리 `Keyboard`)를 더한다. 테스트 먼저: 게이트 빨강(FeatureGrid 스토리 없음) → FeatureGrid 키보드 스토리 빨강 → 탭에 `useRovingFocus`. 완료 기준: FeatureGrid 키보드 스토리·커버리지 게이트 초록
- [ ] `S9` 포커스 표시 셋 — Card·Calendar 날짜 칸·DatePicker 기본 트리거에 키보드 포커스일 때만 테두리. 테스트 먼저: 실제 입력 테스트(Tab이면 테두리, 마우스 클릭이면 없음) 빨강 → 초록. 완료 기준: 세 실제 입력 테스트 초록, 기존 스토리 초록
- [ ] `S10` DropdownMenu 닫힘 — 항목 실행 신호를 내부 문맥으로 받아 실행됐을 때만 닫는다. 테스트 먼저: 항목 `onClick`·`onKeyDown`에서 `preventDefault`하면 열린 채로, 아니면 닫히는 스토리 빨강 → 초록. 완료 기준: 그 스토리와 기존 Menu 스토리·실제 입력 초록
- [ ] `S11` 마무리 — changeset 보강(FeatureGrid·포커스 표시·메뉴 닫힘), 게이트 5종, core 전체 포커스 표시 새 카드를 백로그에, 검토서 1·2항 갱신과 §3-6 상세 정정(components 13개). 완료 기준: 게이트 5종 초록, 검토로 이동

## 검증
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

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `검증` 섹션 교체
- 2026-10-06T17:58 · s:6dbe1299 — `전략` 섹션 교체
- 2026-10-07T13:35 · s:b1c51cf9 — `전략` 섹션 교체
- 2026-10-07T13:35 · s:b1c51cf9 — `실행 계획` 섹션 교체
- 2026-10-07T13:35 · s:b1c51cf9 — `검증` 섹션 교체
- 2026-10-07T13:55 · s:b1c51cf9 · S1 doing — 착수
- 2026-10-07T13:58 · s:b1c51cf9 · S1 done — keyboard-coverage.json(18항목·ignored Radio) + keyboardCoverage.ts/.test.ts. 실제 저장소 빨강 — 키보드 스토리 없음 15곳(전략 표 14 + Modal: 기존 스토리가 fireEvent로만 Esc 확인) · 실제 입력 테스트 없음 6곳(Modal·Drawer·Select·Popover·DropdownMenu·DatePicker). 누락 검사 위반 0(신호 15파일 전부 선언, Tooltip·Carousel·DataGrid는 신호 밖이라 직접 선언). fixture 15건 초록, foundations tsc 통과
- 2026-10-07T13:58 · s:b1c51cf9 — 관찰: core blocks/FeatureGrid.tsx 에 role=tablist 가 있다. 게이트 스캔 범위(components/) 밖이라 이 카드에서는 다루지 않는다 — 검토서에 올린다
- 2026-10-07T13:58 · s:b1c51cf9 · S2 doing — 착수
- 2026-10-07T14:01 · s:b1c51cf9 · S2 done — vite.config.ts 에 real-input 프로젝트 + src/real-input/(mount·Modal·Drawer·Select). 수단 확인: useFocusTrap MAX_FOCUS_FRAMES 를 0 으로 걷어내자 Modal 실제 입력 항목이 '포커스가 대화상자 안' 단정에서 빨강, 같은 상태에서 Drawer play(흉내 입력)는 초록 — 실제 입력만 결함을 잡는다. 되돌린 뒤 3건 초록. pnpm test 187파일 1242건 초록(1239 + 실제 입력 3). 커버리지 게이트의 실제 입력 위반은 Popover·DropdownMenu·DatePicker 셋만 남음
- 2026-10-07T14:01 · s:b1c51cf9 · S3 doing — 착수
- 2026-10-07T14:04 · s:b1c51cf9 · S3 done — a11y/composeHandlers.ts(외부 먼저, preventDefault면 내부 건너뜀)를 12곳에 적용: Modal·Drawer·Tabs·Select(외부 onKeyDown을 트리거로)·Card·Searchfield·Carousel·DropdownMenu 트리거 + 덮어쓰기 수정 TreeView·MenuItem(클릭·키·호버)·FileUploader(avatar·default)·Tooltip(포커스·마우스). Modal Keyboard·KeyDownPreventDefault, Select KeyDownPreventDefault 스토리 빨강→초록. pnpm test 1245건 초록, core tsc 통과, 'onKeyDown?.(e)' grep 0건. 마우스 처리기 합성(Carousel·DropdownMenu onClick)은 내부 먼저 그대로 둠 — 덮어쓰기가 아니라서
- 2026-10-07T14:05 · s:b1c51cf9 · S4 doing — 착수
- 2026-10-07T14:13 · s:b1c51cf9 · S4 done — Tooltip(Esc·말풍선 id + 트리거 aria-describedby) · Popover(ARIA를 cloneElement로 실제 트리거에, useFocusTrap으로 열 때 이동·닫을 때 복귀, Tab 가두기는 비모달이라 안 붙임. Esc는 기존 document 리스너 유지 — 기존 스토리 2개가 그 동작에 기댐) · Menu(MenuContext로 roving tabindex, ↑/↓·Home/End·글자 검색, dock만 가로 ←/→ + aria-orientation) · DropdownMenu(내부 번호 방식 걷고 실제 포커스: Enter/Space/↓ 첫 항목·↑ 끝 항목, Tab은 닫기만, 고르면 닫고 트리거로). 실제 입력이 새 결함을 잡음: DropdownMenu를 Enter로 열면 포커스가 트리거에 남음 — 메뉴가 visibility 전환 중이라 focus 거부. 열 때 visibility 0s로 고치고, useFocusTrap도 '포커스가 실제로 들어갈 때까지' 재시도로 고침(Popover 같은 원인). 단독 Menu 스토리 6개에 확인 줄 추가(dock은 →). pnpm test 189파일 1252건 초록
- 2026-10-07T14:13 · s:b1c51cf9 · S5 doing — 착수
- 2026-10-07T14:20 · s:b1c51cf9 · S5 done — SegmentedControl(radiogroup/radio·aria-checked·Tab 정지점=선택 조각·화살표로 이동하며 선택, 비활성 건너뜀) · TreeView(roving·Home/End·글자 검색 + 접힌 노드의 숨은 자식으로 가던 결함 수정) · Calendar(포커스를 날짜 값으로 — 월 경계·Home/End·PageUp/PageDown·두 달 보기 둘째 달) · DatePicker(기본 트리거 role=button·Enter/Space/↓로 열면 선택된 날에 포커스·팝업 날짜 키 / 주간 띠 기준점을 포커스된 칸으로·주 넘김 / 휠 열마다 Tab 정지점 하나·↑/↓로 고름) · Carousel(region tabIndex=0·화살표 preventDefault). 공용: a11y/dateGridKeys.ts·focusWhenReady.ts. 실제 입력에 DatePicker 추가. pnpm test 190파일 1261건 초록. 커버리지 게이트 남은 빨강은 S6 다섯
- 2026-10-07T14:20 · s:b1c51cf9 · S6 doing — 착수
- 2026-10-07T14:28 · s:b1c51cf9 · S6 done — Pagination(번호·점 Enter/Space, 점에 Page n·aria-current) · DataGrid(정렬 머리 안에 버튼·aria-sort, DataGrid.stories.tsx 신설) · Card(onClick만 줘도 interactive, interactive={false}로 끔) · FileUploader(기본 드롭존 role=button·Tab·Enter/Space) · Accordion(키보드 스토리만 — 처음부터 초록) · .changeset/kan-054-keyboard.md(core minor). 게이트 5종 초록: typecheck · build · test 191파일 1267건 · storybook build · test:unit 565건(키보드 커버리지 16건 포함)
- 2026-10-07T14:28 · s:b1c51cf9 — 추가 확인: 빌드한 Storybook에서 Playwright 실제 키로 9개 키보드 스토리를 돌아보고 화면을 찍었다. 이동은 모두 기대대로. Button·Card는 포커스를 받아도 화면 표시가 없다 — core에 :focus-visible 이 0곳, outline:none 이 14파일. 이 카드 범위 밖이라 검토서에 새 카드로 올린다
- 2026-10-07T16:00 · s:b1c51cf9 — 검토 반려(검토자 재검토 §3-5·§3-6, 2026-10-07 유저가 추천대로 재작업 선택): ① 게이트를 blocks·patterns·motion 까지 넓히고 FeatureGrid 탭 키보드를 고친다 ② 이 카드가 키보드로 열어 준 셋(Card·Calendar 날짜 칸·DatePicker 기본 트리거)에 포커스 표시를 단다 — core 전체는 새 카드 ③ DropdownMenu 가 항목을 고르면 닫는 처리를 외부 preventDefault 로 막을 수 있게(§3-3 의견, 1번 합성 규칙과 맞춤, 유저 선택). 먼저 main(KAN-051 병합, 번들 크기 게이트)을 합친다
- 2026-10-07T16:01 · s:b1c51cf9 — `전략` 섹션 교체
- 2026-10-07T16:01 · s:b1c51cf9 — `실행 계획` 섹션 교체
