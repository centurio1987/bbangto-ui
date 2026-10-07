---
card: KAN-054-M48FNQ
batch: 3
created: 2026-10-07
branch: KAN-054-M48FNQ
status: 계획
steps: S6
---

# KAN-054-M48FNQ 배치3 — 남은 다섯을 고치고 게이트 5종을 초록으로

카드: [KAN-054-M48FNQ.md](../cards/KAN-054-M48FNQ.md) · 범위 `S6`
선행: [배치2](KAN-054-M48FNQ.batch2.md) — 오버레이·복합 위젯

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S6` 나머지 + changeset

| 컴포넌트 | 고칠 것 | 스토리 |
|---|---|---|
| Pagination | 기본 변형의 페이지 번호를 `<button>`으로(또는 Enter/Space 처리) · 점 변형에 `role`·`tabIndex`·키 처리와 `aria-label`(몇 쪽인지) | `Pagination.stories.tsx`에 키보드 스토리 |
| DataGrid | 정렬 가능한 헤더 안에 `<button>`을 두고 `<th>`에 `aria-sort` | `DataGrid.stories.tsx` **신설**(기본 + 키보드 정렬) |
| Card | `onClick`만 줘도 `interactive`처럼 `role="button"`·`tabIndex=0`·Enter/Space가 붙게. `interactive={false}`를 명시하면 지금처럼 | `Card.stories.tsx`에 키보드 스토리 |
| FileUploader | 기본 변형 드롭존에 `role="button"`·`tabIndex=0`·Enter/Space로 파일 선택 열기 | `FileUploader.stories.tsx`에 키보드 스토리 |
| Accordion | 고치지 않는다 | `Accordion.stories.tsx`에 키보드 스토리(Tab으로 헤더 · Enter/Space로 펼치기 · `aria-expanded`) |

마지막으로 `.changeset/kan-054-keyboard.md`(core minor). 고친 컴포넌트 목록과 함께 **동작이 바뀐 곳**을 적는다 — 합성 규칙(외부 `preventDefault`가 내부 처리를 막는다), roving으로 Tab 정지점이 하나가 된 위젯들, Card가 `onClick`만으로 버튼 역할을 갖게 된 것.

**완료 기준**: 커버리지 게이트를 포함한 게이트 5종 초록(카드 「검증」 절). 커버리지 게이트의 빨간 항목 0. 「검증」의 「추가 확인」(키보드만으로 Storybook 써 보기 · grep 0건)까지 끝.

## 2. 의존과 순서

표의 순서는 중요하지 않다. changeset은 맨 끝에 쓴다 — 바뀐 동작 목록이 그때 확정된다. 게이트 5종은 changeset까지 넣은 뒤 한 번에 돈다.

배치 밖 의존: 배치1·2 전부. KAN-055(배포)는 이 카드가 main에 병합된 뒤에 이 changeset을 모은다(용인 기록).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| Card의 `onClick` 기본 동작 변경이 외부 앱 화면을 바꾼다 | 클릭 가능한 Card에 포커스 테두리가 새로 생긴다 | changeset과 검토서 판단 항목으로 올린다. 되돌릴 길(`interactive={false}`)을 남겨 둔다 |
| DataGrid 헤더에 `<button>`을 넣으면 Table 스타일이 바뀐다 | 헤더 글자 위치·커서 차이 | 버튼 스타일을 초기화(`all: unset` 류)하고 시각 회귀는 스토리 화면으로 확인한다 |
| `pnpm --filter storybook build`가 시간이 오래 걸린다 | — | 게이트 순서대로 돌고 각 결과를 수행 내역에 남긴다 |

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->
