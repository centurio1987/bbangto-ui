---
'@centurio1987/bbangto-ui-visualization': minor
---

객체 도식 · 커뮤니케이션 도식과 ClassBox 빈 칸 숨기기(KAN-082.4, 상류 이슈 P9).

- `ClassBox` — 속성 · 연산이 빈 칸은 그리지 않고 그 높이를 이름 칸이 가진다(UML 칸 억제). 예전처럼 늘 세 칸을 그리려면 `showEmptyCompartments`. 객체 도식용으로 `nameUnderline`(이름 밑줄)을 더했다.
- `ObjectDiagram` — 새 템플릿. 인스턴스(`objects` — `name` · `classifier` · `slots`)를 밑줄 친 「이름 : 클래스」와 「속성 = 값」 칸으로, 링크(`links`)를 화살촉 없는 선과 이름 · 역할 이름으로 그린다. 유형 축에서 VT-101 의 별칭 object diagram 으로 찾힌다.
- `CommunicationDiagram` — 새 템플릿. 객체 사이 링크 위에 번호 메시지(`order` · `label` · `direction: 'forward' | 'backward'`)와 방향 화살표를 단다. 유형 축에서 VT-108 의 별칭 communication 으로 찾힌다.

**바뀌는 그림**: ClassDiagram · C4CodeDiagram · SysMLBlockDiagram 에서 속성이나 연산을 비운 상자는 그 칸이 사라지고 이름 칸이 커진다. 예전 모양은 `showEmptyCompartments`(ClassBox 를 직접 쓸 때)로 돌린다.

유형 수는 87 그대로다(export 90 · 템플릿 71). 시험: `src/molecules/ClassBox.test.tsx` · `src/templates/objectDiagram.test.tsx` · `src/templates/communicationDiagram.test.tsx` · Storybook `Templates/G3` ObjectDiagramSnapshot · `Templates/Diagram Examples` CheckoutAsSequence · CheckoutAsCommunication.
