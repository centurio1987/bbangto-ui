---
card: KAN-054-M48FNQ
title: 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트
created: 2026-10-05
scope: packages/core/src/a11y/**, packages/core/src/components/Popover.tsx, packages/core/src/components/Tooltip.tsx, packages/core/src/components/Menu.tsx, packages/core/src/components/SegmentedControl.tsx, packages/core/src/components/Calendar.tsx, packages/core/src/components/DatePicker.tsx, packages/core/src/components/Pagination.tsx, packages/core/src/components/DataGrid.tsx, packages/core/src/components/TreeView.tsx, packages/core/src/components/Carousel.tsx, apps/storybook/src/stories/Popover.stories.tsx, apps/storybook/src/stories/Tooltip.stories.tsx, apps/storybook/src/stories/Menu.stories.tsx, apps/storybook/src/stories/SegmentedControl.stories.tsx, apps/storybook/src/stories/Calendar.stories.tsx, apps/storybook/src/stories/DatePicker.stories.tsx, apps/storybook/src/stories/Pagination.stories.tsx, apps/storybook/src/stories/DataGrid.stories.tsx, apps/storybook/src/stories/TreeView.stories.tsx, apps/storybook/src/stories/Carousel.stories.tsx, keyboard-coverage.json, packages/foundations/src/keyboardCoverage.test.ts, .changeset/kan-054-*.md
---

# KAN-054-M48FNQ — 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트

## 전략
### 문제

외부 앱이 보고한 세 곳(Drawer·Tabs·Select, KAN-053) 말고도 같은 키보드·포커스 결함이 core에 더 있다. 코드만 읽고 확인했고 실행은 하지 않았다.

| 컴포넌트 | 결함 | 근거 |
|---|---|---|
| Tooltip | Esc로 닫히지 않음, `aria-describedby` 연결 없음 | `Tooltip.tsx:136-137` |
| Popover | 닫을 때 트리거로 포커스 복귀 없음, `aria-expanded`/`aria-controls`가 실제 트리거가 아니라 감싼 div에 붙음 | `Popover.tsx:110-123, 342-348` |
| Menu(단독) | 키 처리 전무(DropdownMenu에만 연결) | `Menu.tsx:604` |
| DropdownMenu | Home/End·글자 검색 없음, 항목이 전부 `tabIndex=0`이라 roving 아님 | `Menu.tsx:232, 430-511` |
| SegmentedControl | div `onClick`만 있음 — role·tabIndex·키 처리가 없어 키보드로 도달 불가 | `SegmentedControl.tsx:110-117` |
| TreeView | Home/End 없음, 모든 treeitem이 `tabIndex=0` | `TreeView.tsx:142-185, 374` |
| Calendar | 화살표로 roving `tabIndex`는 바꾸지만 `.focus()` 호출이 없음(실제 포커스가 안 움직일 것으로 추정) | `Calendar.tsx:217-238, 610-614` |
| DatePicker(default) | 트리거 div가 `tabIndex=0`인데 `onKeyDown`이 없음, 팝업 날짜에 화살표 없음 | `DatePicker.tsx:521-529` |
| Pagination(default) | 페이지 번호가 `div role=button tabIndex=0`인데 `onKeyDown`이 없음 | `Pagination.tsx:374-382` |
| DataGrid | 정렬 헤더가 `onClick`만 있고 포커스할 수 없음. 스토리 파일도 없다 | `DataGrid.tsx:105` |
| Carousel | 좌우 화살표 처리는 있으나 region에 `tabIndex`가 없어 키가 닿지 않음 | `Carousel.tsx:274-283` |

### 접근

1. **게이트를 먼저 건다.** 루트 `keyboard-coverage.json`(정본)과 `packages/foundations/src/keyboardCoverage.test.ts`다. 저장소 전체를 보는 게이트를 foundations에 두는 자리는 `metadataCoverage.test.ts`를 따른다. 정적 검사 둘이다.
   - **누락 검사**: core src에서 상호작용 컴포넌트를 찾는다 — `role`이 dialog·tablist·listbox·combobox·menu·tree·grid·radiogroup인 것, 그리고 button·a·input이 아닌 요소에 `onClick`을 단 것. 목록에 없으면 빨강이다.
   - **테스트 검사**: 목록의 각 컴포넌트가 지정한 스토리 파일에 키보드 입력(`userEvent.keyboard` 또는 `userEvent.tab`)을 쓰는 play 함수가 있는지 본다.
   - 이유: 같은 결함이 11곳에 퍼진 것은 키보드 테스트를 요구하는 장치가 없었기 때문이다. 문서에 규칙을 적는 대신 test:unit에서 막는다. CLAUDE.md의 test:unit 설명("커버리지 게이트")에 이 게이트가 들어가므로 CLAUDE.md는 고치지 않는다.
2. **KAN-053의 `a11y/` 훅을 이어 써서 고친다.** 오버레이(Tooltip·Popover·Menu·DropdownMenu) → 복합 위젯(SegmentedControl·TreeView·Calendar·DatePicker·Carousel) → 나머지(Pagination·DataGrid) 순서다. 동작 기준은 WAI-ARIA APG다.

### 버린 대안

- **QUALITY_CHECKLIST.md에 키보드 항목만 추가** — 문서에만 적으면 같은 결함이 다시 생긴다. 그 파일은 KAN-050 범위이기도 하다.
- **axe 같은 자동 접근성 검사 도입** — 정적 ARIA 속성은 잡지만 키보드 동작(포커스 이동·Esc)은 못 잡는다. 이 카드의 결함 대부분이 동작이다.

### 겹침 처리

- KAN-053 뒤에 직렬로 선다. 착수 전에 KAN-053 결과(훅 API)를 보고 전략을 다시 세운다.
- KAN-055와 용인: 이 카드의 changeset은 이 카드가 끝나 main에 병합된 뒤에만 들어오므로 그 전 배포에 섞이지 않는다.

### 범위 밖

- Accordion 헤더 사이 화살표·Home/End(APG에서 선택 사항). 커버리지 목록에는 올리되 고치지 않는다.
- FormLayout `drawer`/`dialog` 레이아웃(열고 닫는 상태가 없는 레이아웃이라 성격이 다르다)

## 실행 계획
- [ ] `S1` 키보드 커버리지 게이트 먼저 — 루트 `keyboard-coverage.json`(컴포넌트 → 필요한 키보드 동작 · 검증 스토리)과 `packages/foundations/src/keyboardCoverage.test.ts`(누락 검사 · 테스트 검사). 완료 기준: 현재 상태로 빨강이고, 빨강 목록이 「전략」 표의 컴포넌트와 일치
- [ ] `S2` 오버레이 — Tooltip(Esc · `aria-describedby`), Popover(포커스 복귀 · ARIA 자리), Menu 단독, DropdownMenu(Home/End · roving · 글자 검색). 완료 기준: 네 스토리의 키보드 테스트 초록
- [ ] `S3` 복합 위젯 — SegmentedControl(radiogroup · 화살표), TreeView(Home/End · roving), Calendar(실제 포커스 이동), DatePicker(트리거 키 · 팝업 화살표), Carousel(region 포커스). 완료 기준: 다섯 스토리의 키보드 테스트 초록
- [ ] `S4` Pagination·DataGrid(스토리 신설) + changeset(core minor). 완료 기준: 커버리지 게이트를 포함한 게이트 5종 초록

## 검증
### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← 키보드 play 테스트가 실제 chromium 에서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← keyboardCoverage.test.ts 가 여기서 돈다
```

### 빨강 → 초록

1. `S1` 직후: 커버리지 게이트가 빨강. 빨강 목록이 「전략」 표의 11개 컴포넌트와 일치해야 한다(누락 검사가 표에 없는 것을 더 잡으면 표에 더하고, 표에 있는데 못 잡으면 검사 규칙을 고친다).
2. `S2`·`S3`·`S4`를 지날 때마다 해당 컴포넌트가 빨강 목록에서 빠진다.
3. `S4` 직후: 전부 초록.

### 게이트 자체 시험

- 키보드 테스트가 없는 가짜 상호작용 컴포넌트를 fixture로 넣으면 빨강이 되는지
- 목록에 있는데 스토리에서 `userEvent.keyboard`를 지우면 빨강이 되는지

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `검증` 섹션 교체
