---
card: KAN-054-M48FNQ
batch: 2
created: 2026-10-07
branch: KAN-054-M48FNQ
status: 계획
steps: S4, S5
---

# KAN-054-M48FNQ 배치2 — 오버레이와 복합 위젯 아홉 개를 고친다

카드: [KAN-054-M48FNQ.md](../cards/KAN-054-M48FNQ.md) · 범위 `S4` · `S5`
선행: [배치1](KAN-054-M48FNQ.batch1.md) — 게이트 둘과 합성 도우미

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

컴포넌트마다 순서는 같다. 키보드 스토리를 먼저 써서 빨강을 보고 → 고치고 → core 빌드·캐시 삭제 → 초록. 스토리 이름은 배치1이 `keyboard-coverage.json`에 적은 이름을 그대로 쓴다. 동작 기준은 WAI-ARIA APG다.

## 1. 작업 패키지

### WP1 · `S4` 오버레이

| 컴포넌트 | 고칠 것 | 쓸 훅 | 실제 입력 항목 |
|---|---|---|---|
| Tooltip | Esc로 닫기 · 말풍선 `id` + 트리거 `aria-describedby` | `useEscapeKey` | — |
| Popover | 닫을 때 트리거로 포커스 복귀 · `aria-expanded`/`aria-controls`/`aria-haspopup`를 감싼 div가 아니라 실제 트리거에(자식 `cloneElement`) · `document` 리스너 대신 훅 | `useEscapeKey` · `useFocusTrap`(복귀만 쓸지 가두기까지 쓸지는 APG Dialog 비모달 기준으로 정한다) | 있음 |
| Menu 단독 | 화살표·Home/End로 항목 이동 · 글자 검색 · roving | `useRovingFocus` · `useTypeahead` | — |
| DropdownMenu | 위와 같음 + Tab은 고르지 않고 닫기만 + 트리거에서 화살표로 열면 첫/끝 항목에 포커스 | 같음 | 있음 |

단독 Menu 스토리 6개(`Compact`~`Glow`)의 「키만 누르고 확인 없음」은 확인 줄을 더해 고친다.

**완료 기준**: 네 컴포넌트의 키보드 스토리 빨강 → 초록. 실제 입력에 Popover·DropdownMenu 항목 초록. 커버리지 게이트의 빨간 항목에서 Tooltip·Popover·Menu·DropdownMenu가 빠진다. 기존 스토리 전부 초록.

### WP2 · `S5` 복합 위젯

| 컴포넌트 | 고칠 것 | 쓸 훅 | 실제 입력 항목 |
|---|---|---|---|
| SegmentedControl | 컨테이너 `role="radiogroup"`, 조각 `role="radio"` + `aria-checked` + `aria-disabled` · roving · 화살표로 이동하며 선택 | `useRovingFocus` | — |
| TreeView | 한 항목만 `tabIndex=0`(roving) · Home/End · 글자 검색 | `useRovingFocus`(세로) · `useTypeahead` | — |
| Calendar | 화살표 뒤 실제 `.focus()` · 월 경계에서 다음/이전 달로 · Home/End(주의 처음·끝) · PageUp/PageDown(달) · 두 달 보기의 둘째 달도 같은 키 처리 | 날짜 계산은 자체(2차원이라 `useRovingFocus`가 맞지 않는다) | — |
| DatePicker | 기본 트리거를 `role="button"` + Enter/Space/↓로 열기 · 팝업 날짜에 Calendar와 같은 키 · 주간 띠 기준점을 포커스된 칸으로 · 휠 목록에 화살표와 roving | `useRovingFocus` · `useFocusTrap`(팝업) | 있음 |
| Carousel | region에 `tabIndex=0` · 화살표에 `preventDefault` | — | — |

**완료 기준**: 다섯 컴포넌트의 키보드 스토리 빨강 → 초록. 실제 입력에 DatePicker 항목 초록. 커버리지 게이트의 빨간 항목에서 다섯이 빠진다(남는 것은 배치3의 다섯). 기존 스토리 전부 초록.

## 2. 의존과 순서

`S4 → S5`. 둘 사이에 코드 의존은 없지만 DatePicker 팝업이 Popover 비슷한 열고 닫기를 하므로 Popover에서 정한 포커스 복귀 방식을 DatePicker가 따른다. 같은 work 안에서는 표의 순서로 간다.

배치 밖 의존: 배치1의 합성 도우미·커버리지 목록·실제 입력 프로젝트. 배치1에서 `useRovingFocus`의 API가 바뀌면(TreeView 세로 방향 등) 그것을 따른다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 한 work가 커서 세션 예산 절반을 넘는다 | S5 중간에 예산 경고 | 「착수 시점 판단」에서 S5를 SegmentedControl·TreeView·Carousel과 Calendar·DatePicker로 나눌지 정한다. 나눠도 work id는 그대로이고 배치 문서만 바꾼다 |
| Popover의 `cloneElement`가 외부 앱의 트리거 ref·핸들러를 덮는다 | Popover 기존 스토리 실패 | ref 합성과 `composeHandlers`로 이어 붙인다. 자식이 요소 하나가 아니면 지금처럼 감싼 div를 남기고 ARIA만 옮기지 않는다 |
| Calendar 키 처리를 DatePicker가 복제한다 | 같은 날짜 이동 코드가 두 벌 | Calendar의 날짜 계산을 함수로 빼서 DatePicker가 쓴다(`a11y/`가 아니라 Calendar 옆) |
| roving으로 바꾸면 기존 스토리의 Tab 순서 단정이 깨진다 | TreeView·Menu 기존 스토리 실패 | APG 기준으로 스토리를 고친다. 기존 단정이 roving이 아닌 동작을 확인하고 있었다면 그것이 결함이었다 |

## 4. 착수 시점 판단

**착수 시(2026-10-07)**: 배치1과 같은 세션에서 이어서 했다. 예산이 남아 S5를 나누지 않았다. 계획에서 바뀐 것 셋 — Popover의 Esc는 `document` 리스너를 그대로 뒀다(기존 스토리 2개가 그 동작에 기댄다). DropdownMenu는 실제 입력이 「Enter로 열면 포커스가 트리거에 남는」 결함을 새로 잡아 메뉴의 `visibility` 전환을 고쳤다. Calendar와 DatePicker가 함께 쓰는 날짜 계산은 Calendar 옆이 아니라 `a11y/dateGridKeys.ts`에 뒀다(범위 목록 안에 있는 자리).
