---
card: KAN-053-TZ86NN
title: Drawer·Tabs·Select 키보드·포커스 지원 — Modal에서 공용 훅 추출
created: 2026-10-05
scope: packages/core/src/a11y/**, packages/core/src/components/Drawer.tsx, packages/core/src/components/Tabs.tsx, packages/core/src/components/Select.tsx, packages/core/src/components/Modal.tsx, apps/storybook/src/stories/Drawer.stories.tsx, apps/storybook/src/stories/Tabs.stories.tsx, apps/storybook/src/stories/Select.stories.tsx, apps/storybook/src/stories/Modal.stories.tsx, .changeset/kan-053-*.md
---

# KAN-053-TZ86NN — Drawer·Tabs·Select 키보드·포커스 지원 — Modal에서 공용 훅 추출

## 전략
### 문제

외부 앱이 들여올 세 컴포넌트를 키보드로 쓸 수 없다.

| 컴포넌트 | 있는 것 | 없는 것 | 근거 |
|---|---|---|---|
| Drawer | `role="dialog"`, `aria-modal="true"`, 배경 클릭 닫기, 스크롤 잠금 | Esc 닫기, 열 때 포커스 이동, 포커스 가두기, 닫을 때 복귀. 스토리 파일도 없다 | `packages/core/src/components/Drawer.tsx:21-30, 86-94` |
| Tabs | `role="tablist"`·`tab`·`tabpanel`, `aria-selected` | 화살표·Home/End, roving tabindex(탭 묶음에서 한 곳만 Tab으로 닿게 하는 방식), `aria-controls`·`id`·`aria-labelledby`. 선택 안 된 패널은 `return null`이라 가리킬 대상이 없다. 사용자 `onClick`이 선택 로직을 덮어쓴다 | `Tabs.tsx:222, 379-391, 409` |
| Select | `role="combobox"`·`listbox`·`option`, `aria-expanded` | 트리거에 `tabIndex`가 없어 Tab으로 닿지도 않는다. 화살표·Enter·Space·Esc·글자 검색, `aria-activedescendant`·`aria-controls`·label 연결 없음. `disabled`에 `aria-disabled` 없음 | `Select.tsx:77-85, 168, 201, 206-248` |

공용 훅은 저장소 어디에도 없다. 가장 완성된 참고 구현은 `Modal.tsx:86-127`의 인라인 코드(열 때 포커스 이동, 닫을 때 복귀, Tab 가두기, Esc)다. `packages/hooks`의 `useKeyPress`·`useFocus`는 쓰임이 다르고 core는 hooks에 의존하지 않는다.

### 접근

1. **테스트를 먼저 쓴다.** 동작 기준은 WAI-ARIA APG(W3C의 위젯별 키보드 동작 지침)의 Dialog(Modal)·Tabs·Select-only Combobox 패턴이다. 모든 play 함수는 실제 chromium에서 돈다.
2. **Modal의 인라인 코드를 `packages/core/src/a11y/` 공용 훅으로 뺀다.** `useEscapeKey`, `useFocusTrap`(열 때 이동·가두기·복귀), `useRovingFocus`(화살표·Home/End·방향), `useTypeahead`(글자 검색). Modal을 먼저 이 훅으로 바꿔, 이미 동작하는 구현으로 훅을 검증한다. 공개 export에는 넣지 않는다(내부 모듈).
3. **세 컴포넌트에 붙인다.**
   - Drawer: `useEscapeKey` + `useFocusTrap`. `aria-labelledby`를 받을 수 있게 한다.
   - Tabs: `useRovingFocus`로 Tab 정지점 하나, 방향은 `aria-orientation`을 따른다. `useId`로 tab↔panel `aria-controls`/`aria-labelledby`를 잇는다. 선택 안 된 패널도 `hidden` 빈 껍데기로 DOM에 남겨 `aria-controls`가 가리킬 대상을 둔다. 내용(children)은 지금처럼 선택됐을 때만 그린다 — 내용까지 늘 그리면 외부 앱의 패널 안 컴포넌트가 처음부터 한꺼번에 마운트되어 동작이 바뀐다. 화살표로 탭을 옮기면 선택도 함께 옮긴다(APG의 자동 활성화 권고). 사용자 `onClick`은 내부 선택 뒤에 함께 부른다.
   - Select: 트리거에 `tabIndex=0`, 아래 화살표·Enter·Space로 열기, 화살표·Home/End로 활성 옵션 이동(`aria-activedescendant`), Enter로 선택, Esc로 닫고 트리거에 포커스 유지, `useTypeahead`. `aria-controls`·label 연결·`aria-disabled`·`aria-invalid` 자리를 바로잡는다.

### 버린 대안

- **Radix·React Aria 같은 외부 라이브러리 도입** — core의 dependencies가 tokens 하나뿐인 원칙을 깨고, KAN-051이 줄이는 번들을 다시 키운다.
- **hooks 패키지에 훅을 두고 core가 의존** — 패키지 매니페스트를 바꿔 KAN-051과 겹치고, hooks의 기존 훅과 쓰임이 다르다.
- **세 컴포넌트에 각자 인라인 구현** — Modal과 합쳐 같은 코드가 네 벌이 되고, KAN-054의 11곳이 또 복제한다.

### 겹침 처리

- KAN-054가 이 카드 뒤에 직렬로 선다(`a11y/` 훅을 이어 쓴다).
- KAN-055(배포)가 이 카드 뒤에 직렬로 선다.

### 범위 밖

- 나머지 11곳(Tooltip·Popover·Menu·SegmentedControl·Calendar·DatePicker·Pagination·DataGrid·TreeView·Carousel 등)과 키보드 커버리지 게이트 → KAN-054
- Drawer를 portal로 띄우는 일(지금 core에는 `createPortal`이 없다)

## 실행 계획
- [x] `S1` 키보드 play 테스트 먼저 — Drawer 스토리 신설(Esc 닫힘 · 열면 패널 안으로 포커스 · Tab 순환 · 닫으면 트리거로 복귀), Tabs(→/← · Home/End · Tab 정지점 1개 · `aria-controls` 대상이 DOM에 있음 · 사용자 `onClick`을 넘겨도 선택됨), Select(Tab 도달 · ↓/Enter/Space로 열기 · 화살표+Enter 선택 · Esc로 닫고 트리거 포커스 유지 · 글자 검색 · `aria-activedescendant`). 완료 기준: 새 테스트 빨강, 기존 스토리 초록
- [x] `S2` 공용 훅 추출 — `packages/core/src/a11y/`에 `useEscapeKey`·`useFocusTrap`·`useRovingFocus`·`useTypeahead`, Modal을 이 훅으로 교체. 완료 기준: 기존 Modal 스토리(Esc 포함) 초록, Modal 동작 변화 없음
- [x] `S3` Drawer·Tabs 적용. 완료 기준: 두 스토리의 새 테스트 초록
- [x] `S4` Select 적용 + changeset(core minor). 완료 기준: 게이트 5종 초록

## 검증
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

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `검증` 섹션 교체
- 2026-10-06T00:57 · s:6dbe1299 — `전략` 섹션 교체
- 2026-10-06T16:45 · s:6dbe1299 · S1 doing — 착수
- 2026-10-06T16:48 · s:6dbe1299 · S1 done — Drawer 스토리 신설 + Tabs·Select 키보드 스토리 6건 추가. 새 키보드 테스트 6건이 키보드 단정에서 빨강, 기존 29건 초록, 스토리 tsc 오류 0
- 2026-10-06T16:48 · s:6dbe1299 · S2 doing — 착수
- 2026-10-06T16:50 · s:6dbe1299 · S2 done — a11y/ 훅 넷(useEscapeKey·useFocusTrap·useRovingFocus·useTypeahead) + Modal 교체. Modal 스토리 초록, 공개 export 변경 없음. 사용자 onKeyDown이 내부 처리기를 덮던 것도 함께 합성
- 2026-10-06T16:50 · s:6dbe1299 — Modal 스토리는 Esc만 검사하고 포커스 가두기·복귀는 검사하지 않는다 — useFocusTrap의 그 두 동작은 S3의 Drawer 키보드 테스트가 처음 확인한다
- 2026-10-06T16:50 · s:6dbe1299 · S3 doing — 착수
- 2026-10-06T16:52 · s:6dbe1299 · S3 done — Drawer: Esc·포커스 이동·가두기·복귀(useFocusTrap 실검증). Tabs: roving tabindex·화살표/Home/End 자동 활성화·aria-controls/labelledby·비선택 패널 빈 껍데기·onClick 합성, 선택 탭 없을 때 첫 활성 탭을 Tab 정지점으로. 4파일 33/35 초록, Select 2건만 빨강
- 2026-10-06T16:52 · s:6dbe1299 · S4 doing — 착수
- 2026-10-06T17:04 · s:6dbe1299 · S4 done — Select APG 콤보박스 키 처리 + changeset(core minor). 게이트 5종 초록: build·typecheck·test:unit 549·test 1239·storybook build
- 2026-10-06T17:04 · s:6dbe1299 — 추가 확인(정적 Storybook에 Playwright 실제 키 입력): Modal을 Enter로 열면 포커스가 버튼에 남는 결함 발견 — 착수 전 main 빌드에서도 같았다. useFocusTrap이 패널 마운트까지 최대 10프레임 재시도하게 고침. play 테스트는 흉내 낸 입력이라 이 결함을 못 잡는다. 수정 뒤 Modal·Drawer·Tabs·Select 키보드 흐름과 포커스 표시를 화면으로 확인
