---
'@centurio1987/bbangto-ui-core': minor
---

나머지 상호작용 컴포넌트를 키보드만으로 쓸 수 있게 했다(KAN-054). 동작 기준은 WAI-ARIA APG의 위젯별 패턴이다.

### 새 기능

- **Tooltip** — 트리거에 포커스가 오면 보이고 Esc로 숨는다. 트리거의 `aria-describedby`가 말풍선을 가리킨다.
- **Popover** — `aria-haspopup`·`aria-expanded`·`aria-controls`가 감싼 div가 아니라 실제 트리거에 붙는다. 닫히면 연 요소로 포커스가 돌아온다.
- **Menu** — 항목 묶음의 Tab 정지점이 하나가 됐다. ↑/↓(dock 변형은 ←/→)·Home/End로 움직이고, 글자를 치면 그 글자로 시작하는 항목으로 간다. 비활성 항목은 건너뛴다.
- **DropdownMenu** — Enter/Space/↓로 열면 첫 항목, ↑로 열면 끝 항목에 실제 포커스가 간다. 항목을 고르면 닫히고 트리거로 돌아오며, Tab은 고르지 않고 닫기만 한다.
- **SegmentedControl** — `role="radiogroup"`/`radio`와 `aria-checked`가 붙고, 선택된 조각 하나가 Tab 정지점이다. 화살표로 옮기면 선택도 함께 옮겨진다.
- **TreeView** — 보이는 항목 중 하나만 Tab 정지점이다. Home/End와 글자 검색이 된다.
- **Calendar** — 화살표가 실제 포커스를 옮기고 월 경계를 넘는다. Home/End는 주의 처음·끝, PageUp/PageDown은 이전·다음 달(Shift면 해)이다. 두 달 보기의 둘째 달도 같은 키로 다룬다.
- **DatePicker** — 기본 변형의 트리거가 `role="button"`이고 Enter/Space/↓로 열린다. 열면 선택된 날에 포커스가 가고, 팝업 날짜는 Calendar와 같은 키로 움직인다. 주간 띠는 화살표를 거듭 눌러도 계속 움직이고 주를 넘긴다. 휠은 열마다 Tab 정지점이 하나이고 ↑/↓/Home/End로 고른다.
- **Carousel** — 화살표·점 버튼을 꺼도 region에 Tab으로 닿는다.
- **Pagination** — 페이지 번호와 점 변형의 점을 Enter/Space로 누른다. 점에는 `Page n` 이름과 `aria-current`가 붙는다.
- **DataGrid** — 정렬 가능한 열 머리 안에 버튼이 생겨 Tab으로 닿고 Enter/Space로 정렬한다. 열 머리에 `aria-sort`가 붙는다.
- **FileUploader** — 기본 변형의 드롭존에 Tab으로 닿고 Enter/Space로 파일 선택 창을 연다.
- **FeatureGrid** — `panel-showcase` 레이아웃의 탭 묶음이 Tab 정지점 하나가 됐고, ↑/↓·Home/End로 옮기면 선택과 패널도 함께 옮겨진다.
- **포커스 표시** — 키보드로 포커스한 Card(클릭할 수 있는 카드)·Calendar 날짜 칸·DatePicker 기본 트리거에 테두리(2px, primary 색)가 보인다. 마우스로 누른 포커스에는 그리지 않는다.

### 바뀐 동작

- **외부 `onKeyDown`이 `preventDefault()`를 하면 그 키의 내부 처리를 건너뛴다.** 모든 core 컴포넌트가 이 한 규칙을 따른다(전에는 컴포넌트마다 달랐다). 외부 처리기가 먼저 불리는 것은 그대로다. 예: Modal·Drawer에서 Esc에 `preventDefault()`를 하면 닫히지 않고, Searchfield에서 Enter에 하면 `onSearch`가 불리지 않는다. KAN-053의 「Modal·Drawer: 사용자 처리기를 먼저 부르고 내부 처리를 이어서 한다」에 이 예외가 더해진 것이다.
- **Select: `onKeyDown`이 바깥 컨테이너가 아니라 `role="combobox"` 요소에 붙는다.** 내부 키 처리보다 먼저 불린다.
- **TreeView·MenuItem·FileUploader·Tooltip: 넘긴 처리기가 내부 처리기를 덮어쓰지 않는다.** 전에는 `onKeyDown`(TreeView), `onClick`·`onKeyDown`·포커스·마우스 처리기(MenuItem), `onClick`·`onKeyDown`(FileUploader), 포커스·마우스 처리기(Tooltip)를 넘기면 내부 동작이 사라졌다. 이제 둘 다 불린다.
- **Card: `onClick`만 넘겨도 `interactive`로 동작한다** — `role="button"`, Tab 정지점, Enter/Space, 포인터 커서. 마우스 전용으로 두려면 `interactive={false}`를 명시한다.
- **Menu·TreeView·SegmentedControl·DatePicker 휠: Tab 정지점이 묶음마다 하나로 줄었다.** 전에는 항목마다 Tab에 걸렸다. 묶음 안은 화살표로 움직인다.
- **DropdownMenu: 키보드 이동이 실제 포커스로 바뀌었다.** 전에는 포커스를 트리거에 둔 채 내부 번호로 활성 항목을 셌고, 보조기술은 그것을 알 수 없었다. 메뉴는 열 때 바로 보이게 한다(닫을 때만 페이드 뒤에 숨는다).
- **DropdownMenu: 항목을 고르면 마우스로 골랐어도 메뉴가 닫히고 트리거로 돌아온다.** 전에는 키보드로 고를 때만 닫혔다. 항목의 `onClick`·`onKeyDown`에서 `preventDefault()`를 하면 그 항목의 `onSelect`도 닫힘도 일어나지 않는다 — 외부가 직접 처리하고 메뉴를 열어 둘 때 쓴다.
- **TreeView: 접힌 노드에서 ↓를 누르면 숨은 자식이 아니라 다음에 보이는 항목으로 간다.**
- **DatePicker 주간 띠: 날짜 칸에 Tab 정지점이 포커스를 따라간다.** 전에는 선택된 칸에 고정이었다.
- **포커스 이동이 패널이 실제로 포커스를 받을 때까지 몇 프레임 다시 시도한다.** `visibility` 전환으로 나타나는 패널은 처음 한 프레임 동안 포커스를 거부한다. Modal·Drawer·Popover·DropdownMenu·DatePicker가 이 덕을 본다.
