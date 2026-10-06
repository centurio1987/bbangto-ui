---
'@centurio1987/bbangto-ui-core': minor
---

Drawer·Tabs·Select를 키보드만으로 쓸 수 있게 했다(KAN-053). 동작 기준은 WAI-ARIA APG의 Dialog·Tabs·Select-only Combobox 패턴이다.

### 새 기능

- **Drawer** — 열면 패널로 포커스가 들어가고, Tab/Shift+Tab이 패널 안에서 돌며, Esc로 닫히고, 닫히면 연 요소로 포커스가 돌아온다. Modal과 같은 계약이다.
- **Tabs** — 탭 묶음의 Tab 정지점이 하나가 됐다(선택된 탭, 선택이 없으면 첫 활성 탭). 묶음 안에서는 화살표(가로 ←/→, 세로 ↑/↓)와 Home/End로 움직이고 비활성 탭은 건너뛴다. 각 탭은 `aria-controls`로 자기 패널을, 패널은 `aria-labelledby`로 자기 탭을 가리킨다.
- **Select** — Tab으로 닿는다. 닫혀 있을 때 ↓/↑/Enter/Space로 열고, 열려 있을 때 ↓/↑/Home/End로 옵션을 옮기며(비활성 옵션은 건너뛴다) Enter/Space로 고르고 Esc로 닫는다. 글자를 치면 그 글자로 시작하는 옵션으로 간다. 포커스는 내내 combobox에 있고 활성 옵션은 `aria-activedescendant`로 가리킨다.

### 바뀐 동작

- **Tabs: 화살표로 탭을 옮기면 선택도 함께 옮겨진다**(APG 자동 활성화). `onValueChange`가 화살표마다 불린다.
- **Tabs: 선택 안 된 패널 자리에 `hidden` 빈 `role="tabpanel"` 요소가 생긴다.** `aria-controls`가 가리킬 대상을 두기 위해서다. 패널 **내용**은 지금처럼 선택됐을 때만 마운트된다.
- **Tabs: `TabsTrigger`에 넘긴 `onClick`이 선택을 막지 않는다.** 전에는 사용자 `onClick`이 내부 선택 처리를 덮어써 클릭해도 탭이 안 바뀌었다. 이제 선택한 뒤 `onClick`도 부른다.
- **Select: `aria-label`·`aria-labelledby`가 바깥 컨테이너가 아니라 `role="combobox"` 요소에 붙는다.** `aria-invalid`도 combobox로 옮겼다. `disabled`면 `aria-disabled="true"`이고 Tab 순서에서 빠진다. `loading`이면 `aria-busy`가 붙는다.
- **Select: 옵션을 마우스로 눌러도 포커스가 combobox에 남는다.**
- **Modal: 키보드로 열었을 때 포커스가 대화상자로 들어가지 않던 결함을 고쳤다.** 패널이 열림 신호보다 한 박자 늦게 그려지는데 포커스 이동은 다음 프레임에 한 번만 시도해서, 실제 키 입력에서는 포커스가 연 버튼에 남곤 했다. 이제 패널이 그려질 때까지 몇 프레임 다시 시도하고, 패널 안 요소가 이미 포커스를 가졌으면(`autoFocus`) 빼앗지 않는다.
- **Modal·Drawer: `onKeyDown`을 넘겨도 Esc 닫기와 포커스 가두기가 꺼지지 않는다.** 전에는 사용자 `onKeyDown`이 내부 처리기를 덮어썼다. 이제 사용자 처리기를 먼저 부르고 내부 처리를 이어서 한다.
