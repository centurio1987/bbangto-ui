# @centurio1987/core

## 1.2.1

### Patch Changes

- Updated dependencies [10e4a92]
  - @centurio1987/bbangto-ui-tokens@1.4.0

## 1.2.0

### Minor Changes

- 5af8e71: Provider 외부 글꼴을 끌 수 있게 하고, 겹쳐 써도 글꼴마다 한 번만 불러온다(KAN-052).

  ### 새 기능

  - **`fonts?: 'external' | 'none'`** — `FoundationProvider` · `StyleGuideProvider`(core),
    `VisualizationStyleGuideProvider`(visualization)에 더했다. 기본값 `'external'`은 지금 동작 그대로다.
    `'none'`이면 그 Provider는 CDN 글꼴 요청을 하지 않는다. 글꼴을 직접 호스팅하거나 CSP로 외부 요청을 막는 앱용이다.
    주입은 문서 전체가 나눠 쓰므로, 외부 요청을 0건으로 만들려면 문서 안의 Provider 전부에 `'none'`을 준다.

  ### 바뀐 동작

  - 글꼴 `@import`를 렌더 트리 안 `<style>`로 내던 것을 `document.head`의 `#bbangto-font-pretendard` ·
    `#bbangto-font-jetbrains-mono`로 옮겼다. 같은 id가 있으면 넣지 않으므로 Provider를 여러 겹 감싸도,
    core Provider 안에 visualization Provider를 겹쳐도 글꼴당 요청은 한 번이다.
  - SSR HTML에는 글꼴 `@import`가 들어가지 않는다. 화면이 켜진 뒤에 불러온다.

- d6aa3fa: Drawer·Tabs·Select를 키보드만으로 쓸 수 있게 했다(KAN-053). 동작 기준은 WAI-ARIA APG의 Dialog·Tabs·Select-only Combobox 패턴이다.

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

- 7a9e114: 나머지 상호작용 컴포넌트를 키보드만으로 쓸 수 있게 했다(KAN-054). 동작 기준은 WAI-ARIA APG의 위젯별 패턴이다.

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

- a7afef7: 키보드로 포커스해도 화면에 표시가 없던 core 컴포넌트에 포커스 테두리를 달았다(KAN-059). 모든 자리가 한 규칙을 따른다 — 키보드 포커스(`:focus-visible`)일 때만 2px 실선, 간격 2px, 색은 `semantic.border.focus`.

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

### Patch Changes

- 145f269: 하나만 가져와도 패키지 전체가 번들에 딸려 오던 문제를 고쳤다(KAN-051). 공개 API와 import 경로는 그대로다.

  ### 바뀐 동작

  - **dist 가 파일 단위 출력이 됐다.** 전에는 패키지마다 `dist/index.js` 한 파일이어서, `package.json` 의
    `sideEffects: false` 가 있어도 번들러가 쓰지 않는 컴포넌트를 버리지 못했다(이 선언은 파일 단위로만 작동한다).
    이제 소스 파일마다 출력이 하나씩 나오고 함께 쓰는 코드는 `chunk-*.js` 로 빠진다. 입구(`dist/index.js`,
    visualization 은 `dist/typeMeta/index.js` 도)와 타입 선언(`dist/index.d.ts`)의 경로는 바뀌지 않았다.
  - **style-guide-catalog · visualization-style-guide-catalog: 카탈로그 배열과 조회 맵을 `src/catalog.ts` 로 옮겼다.**
    배럴 최상위에서 `Object.fromEntries(...)` 로 맵을 만들던 것이 모든 preset 을 붙잡고 있었다.
    `styleGuideCatalog` · `styleGuideMap` · `vizStyleGuideCatalog` · `vizStyleGuideMap` 은 지금처럼 루트에서 가져온다.

  ### 크기 (esbuild 0.27.7, minify, react·`@centurio1987/*` 바깥)

  | 가져온 것                                                           | 전       | 후       |
  | ------------------------------------------------------------------- | -------- | -------- |
  | core `Button` 하나                                                  | 324,410B | 4,622B   |
  | visualization `BarChart` 하나                                       | 171,294B | 8,958B   |
  | style-guide-catalog `NeobrutalismShowcase` 하나                     | 829,011B | 101,092B |
  | visualization-style-guide-catalog `minimalLine01VizStyleGuide` 하나 | 335,601B | 11,810B  |

  전부 가져오는 경우는 청크 경계 때문에 조금 커졌다(core 438,855B → 464,763B). style-guide-catalog 의 Showcase 하나가
  여전히 약 101KB 인 것은 Showcase 전부가 함께 쓰는 생성 카피 파일(`_showcaseCopy.generated.ts`) 때문이다.

## 1.1.2

### Patch Changes

- 727a4eb: 상류 소비자 리포트 I 계열 7건 해소 — 87종 유형에 **도달하는 경로**를 고친다.

  콘텐츠는 이미 있었다(87종 전량 authored). 문제는 소비자가 그 존재를 알 방법이 없었고,
  알아도 API가 오답을 줬다는 것이다. 어느 소비자는 87종짜리 라이브러리를 쓰면서 도식 18종 중
  카탈로그 템플릿을 1종만 썼다.

  ### 새 기능

  - **`structuralTraits` 축 신설**(I5) — `dataShape`와 직교하는 구조 술어 8종
    (`sequential`·`branching`·`cyclic`·`nested`·`relational`·`cross-axis`·`paired`·`quantitative`).
    87 엔트리 전량 저작. Flowchart(VT-201)와 Process Steps(VT-202)는 `dataShape`가 똑같이 `['process']`라
    **분기 유무를 기계로 걸러낼 수 없었다** — 이제 `structuralTraits: ['branching']` 한 줄로 갈린다.
    소비자가 손으로 복제하던 "구조 → 권장 컴포넌트" 매핑표가 필요 없어진다.
  - **`selectVizTypes`에 `match: 'any' | 'all'`**(I4) — `'all'`은 지정한 criterion을 **전부** 만족하는
    후보만 남기는 하드 필터다. 기본값 `'any'`는 현행 동작 그대로.
    soft-weighted 합산은 criterion을 더할수록 정답이 내려갈 수 있는데, 그 함정이 이제 JSDoc·README에 명시된다.
  - **동점 tie-break에 precision 편입**(I4) — `score↓ → 매칭 축 수↓ → precision↓ → priority↑ → id↑`.
    축을 넓게 선언한 유형이 recall만으로 앞서던 편향이 사라진다(최종 tie-break가 `id`라 결정성은 유지).
  - **역방향 조회 helper**(I6) — `vizTypesForExport` · `defaultVizTypeForExport` · `vizTypeForVariant`.
    `Statistics`를 이름으로 조회하면 id 순으로 VT-513 Waffle이 먼저 잡히지만 **실제 기본 렌더는 VT-601**이다.
    이제 그 둘을 가릴 수 있다.
  - **컴포넌트 JSDoc에 채택 근거 주입**(I2) — 87개 export 전부에 `@vizType`/`@useWhen`/`@avoidWhen`.
    `dist/index.d.ts`의 `useWhen|avoidWhen|dataShape` 언급이 **0 → 370행**. `.d.ts` 머리에는 정본 위치 배너.
  - **7개 패키지 전부 README 신설**(I1) — 배포물의 마크다운 문서가 0개였다.
  - **유형 SSOT 문서 동봉**(I3) — `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md`를 `files`에 편입.
    `.d.ts` 주석이 지목하던 죽은 참조가 살아난다. 인벤토리 90행 ↔ 매니페스트 87의 차이(⛔ 범위 밖 3행)도 명시.
  - **스타일 쇼케이스에 역할 캡션**(I7) — "paint 축 데모이지 그릴 수 있는 그림의 목록이 아니다 · 유형 87종
    정본은 `type.manifest.json`". `makeVizShowcase({ note: false })`로 끌 수 있다.

  ### 파괴적 변경 (0.x minor)

  - **매니페스트 `variant?: string` → `variants?: { prop, value, isDefault? }[]`**(I6).
    이전 스키마는 값만 담아 `"waffle"`을 **어느 prop에** 넣는지 알 수 없었다.
    `type.manifest.json`의 해당 필드를 읽는 소비자는 경로를 바꿔야 한다.
  - `VizTypeMeta.structuralTraits`가 **required**다. 자체 레지스트리를 저작하는 소비자는 필드를 채워야 한다.

  ### 함께 메운 누락

  `Statistics`의 `mosaic`, `Cycle`의 `orbit`, `Comparison`·`DotPlot`의 전 모드가 유형 레지스트리에
  청구되지 않고 있었다(렌더는 되는데 채택 근거를 읽을 수 없는 상태). 전량 편입하고,
  `*Mode` union 멤버를 정적 스캔해 미청구를 실패시키는 게이트를 심어 재발을 끊었다.

- Updated dependencies [727a4eb]
- Updated dependencies [649aaaa]
  - @centurio1987/bbangto-ui-tokens@1.3.0

## 1.1.1

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0

## 1.1.0

### Minor Changes

- 7db914f: 색 스킴 기호선택(foundation preset) 인프라 추가 — 모티프(래퍼 CSS·shape)는 공유하고 foundation 색만 갈아끼우는 구조.

  - **tokens**: `FoundationPreset` 타입 신규 export + `StyleGuideTokens`에 `foundationPresets` / `defaultFoundationKey` 선택 필드 추가.
  - **core**: `resolveFoundationPreset(sg, key)` 순수함수 신규 export + `StyleGuideProvider`에 `foundationKey` prop(및 `data-bbangto-foundation` 속성) 추가. 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순 fallback.

  모두 선택 필드/prop이라 하위호환된다(기존 소비처 무변경 동작).

### Patch Changes

- Updated dependencies [7db914f]
  - @centurio1987/bbangto-ui-tokens@1.1.0

## 1.0.0

### Major Changes

- a45e32e: ORD-006 — theme→foundation 재편 · 카탈로그 분리 · pattern/block wrapping 인터페이스 (breaking).

  **core**

  - `ThemeProvider`/`useTheme` → `FoundationProvider`/`useFoundation` (prop `theme`→`foundation`, DOM attr `data-bbangto-theme`→`data-bbangto-foundation`).
  - base foundation 3종(`lightFoundation`/`darkFoundation`/`highContrastFoundation`) 내장 export.
  - `themeToStyleGuide` → `foundationToStyleGuide`.
  - StyleGuide에 `wrapperBlocks`/`wrapperPatterns` + `useWrapperComponent`/`useWrapperBlock`/`useWrapperPattern` 추가.
  - style guide 카탈로그(`styleGuides` 배럴) export 제거 → `@centurio1987/bbangto-ui-style-guide-catalog`로 이전.

  **tokens**

  - `BbangtoTheme` → `BbangtoFoundation`, `ThemeOverride` → `FoundationOverride`.
  - `themeToStyleObject`/`themeToCSSString` → `foundationToStyleObject`/`foundationToCSSString`, `mergeTheme` → `mergeFoundation`.
  - CSS 변수 prefix `--bbangto-`는 유지.

  **foundations** (구 `@centurio1987/bbangto-ui-themes`에서 rename)

  - 패키지명 `@centurio1987/bbangto-ui-themes` → `@centurio1987/bbangto-ui-foundations`.
  - base 3종은 core로 이전(이 패키지에서 제거). 확장 foundation(amber + external 74)만 제공.
  - 객체명 `*Theme` → `*Foundation`, `themeMap` → `foundationCatalog`(amber 2 + external 74).

### Patch Changes

- Updated dependencies [a45e32e]
  - @centurio1987/bbangto-ui-tokens@1.0.0

## 0.4.0

### Minor Changes

- 패키지 리네이밍 + 테마 통합

  모든 패키지에 `bbangto-ui-` 접두사 추가 및 5개로 분리됐던 테마 패키지를 단일 패키지로 통합.

  - `@centurio1987/core` → `@centurio1987/bbangto-ui-core`
  - `@centurio1987/tokens` → `@centurio1987/bbangto-ui-tokens`
  - `@centurio1987/hooks` → `@centurio1987/bbangto-ui-hooks`
  - `@centurio1987/diagram` → `@centurio1987/bbangto-ui-diagram`
  - `theme-light` + `theme-dark` + `theme-high-contrast` + `theme-amber` + `themes-external` → `@centurio1987/bbangto-ui-themes` (빌트인 5종 + 브랜드 프리셋 74종)

### Patch Changes

- Updated dependencies
  - @centurio1987/bbangto-ui-tokens@0.3.0
  - @centurio1987/bbangto-ui-themes@0.2.0

## 0.3.0

### Minor Changes

- 아키타입 포화(archetype saturation) — 43개 UI 카테고리에 걸쳐 86개의 신규 variant/layout 멤버 추가.

  21st.dev 레퍼런스를 열람해 카테고리별로 구조적으로 구별되는 디자인 아키타입을 소진했습니다. W0(파일럿)~W5(패턴) 6개 wave로 나눠 discover→harvest→cluster→implement 파이프라인을 반복했으며, 전체 게이트(typecheck, build, Playwright 608/608, unit 115/115, storybook build)가 green 상태입니다.

  신규 prop 축 12개 도입, 모든 축은 default-first(기존 호출부 하위호환). 44개 카테고리별 감사 매니페스트(`packages/core/catalog/*.audit.md`) 포함.
