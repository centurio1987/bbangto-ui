---
'@centurio1987/bbangto-ui-core': minor
---

키보드로 포커스해도 화면에 표시가 없던 core 컴포넌트에 포커스 테두리를 달았다(KAN-059). 모든 자리가 한 규칙을 따른다 — 키보드 포커스(`:focus-visible`)일 때만 2px 실선, 간격 2px, 색은 `semantic.border.focus`.

### 새 기능

- **포커스 테두리** — Button · Link(모든 변형) · Dock 항목 · ScrollArea 는 자기 자신에, Menu 항목 · TreeView 항목 · NumberField 증감 버튼은 안쪽 간격(-2px)으로 그린다. TreeView 는 항목(`li`)이 아니라 그 행에 그려, 펼친 노드에서 고리가 자식 목록까지 감싸지 않는다.
- **입력칸** — Input(기본·composer-panel) · Searchfield · NumberField · RichTextEditor 는 포커스가 안쪽 입력에 있을 때 바깥 상자에, Textarea 는 자기 자신에 그린다. 글자 입력칸은 마우스로 눌러도 브라우저가 키보드 포커스로 치므로 클릭할 때도 보인다. 기존 테두리 색 변화는 그대로다.
- **숨긴 입력** — Switch 는 트랙에, RadioGroup `segmented` 는 그 조각에, NumberField `seven-segment` 는 판 전체에 그린다.

### 바뀐 동작

- **포커스 테두리 색이 `semantic.primary.base` 에서 `semantic.border.focus` 로 바뀌었다.** KAN-054 의 Card · Calendar 날짜 칸 · DatePicker 기본 트리거와 Gallery · Testimonials 도 같은 색을 쓴다. 기본 foundation 대부분은 두 값이 같아서 눈에 보이는 차이는 amberDark · amberLight · highContrast 셋이다.
- **Link 상자 변형(outline · solid · ghost)의 포커스 고리가 box-shadow 에서 outline 으로 바뀌었다.** 마우스로 누를 때는 더 생기지 않는다.
- **Input · Link: 넘긴 `onFocus`·`onBlur` 가 내부 처리를 덮어쓰지 않는다.** 전에는 소비자가 `onFocus` 를 넘기면 Input 은 포커스 때 테두리 색이 바뀌지 않았고, Link 상자 변형은 포커스 고리가 생기지 않았다. 이제 소비자 처리기가 먼저 불리고 내부 처리가 이어진다(KAN-054 의 합성 규칙과 같다).
- Button · ScrollArea · Textarea · Searchfield · NumberField · Switch 도 `onFocus`·`onBlur` 를 같은 규칙으로 합성한다. 전에는 덮어쓸 내부 처리가 없던 자리라 소비자 쪽 동작은 그대로다.

### 알려진 한계

- 키보드 포커스인지는 포커스를 받는 순간 한 번 본다. 마우스로 포커스한 뒤 키를 눌러도 테두리는 생기지 않는다.
- `border.focus` 가 배경과 3:1 이 안 되는 색 스킴에서는 테두리가 흐리다(KAN-060 에서 토큰을 고친다).
