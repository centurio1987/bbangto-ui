# PLAN — `@centurio1987/diagram` 패키지

> Diagram + System Architecture 컴포넌트 시스템. 독자적 atomic system · 독자적 토큰 네임스페이스 · 모든 다이어그램 타입의 **완성된 프리셋 컴포넌트**. **third-party 런타임 의존 0** (workspace `@centurio1987/tokens` 의존만 허용 — core와 동일 정책), ESM tsup 빌드, inline-style + inline-SVG — 기존 레포 규약을 그대로 따른다.

---

## Context (왜 만드는가)

bbangto-ui에는 그래프/노드/엣지/차트/다이어그램 관련 코드가 전혀 없다(그린필드). claude.ai/design 프로토타입(`Directions.dc.html`)이 "Diagram + System Architecture Design System"의 3가지 시각 방향을 제시했고, 그중 **C·Blueprint**를 베이스로 채택했다. 목표는 mermaid가 제공하는 모든 다이어그램 타입(~20종)과 첨부 표준표의 아키텍처 표기법(UML / C4 / ArchiMate / SysML / BPMN + Kruchten 4+1 + ISO/IEC/IEEE 42010)을 **전부** 표현할 수 있는, 자체 atomic system을 가진 독립 패키지를 만드는 것이다.

### 확정된 결정 (재논의 없음)
1. **시각 방향 = C·Blueprint**: 라이트 캔버스 · 파스텔 채움 + 볼드 블랙 키라인(2.5px #111) · 직각 굵은 화살표 · 모노 `[type-tag]` · 점선 그룹 경계. (A·Candy-OS-dark, B·Swiss-Editorial은 토큰 3축 — 캔버스/라인처리/아이콘 fill-vs-line — 만 바꾸면 나중에 테마 변형으로 추가 가능하게 설계.)
2. **작성 모델 = 선언형 프리미티브 컴포넌트**: `<DiagramCanvas><Node/><Edge/></DiagramCanvas>` 형태로 좌표/관계를 props로 직접 제어. **자동 레이아웃 엔진 없음, 텍스트 DSL 파서 없음, mermaid/dagre/d3 의존 없음.** 순수 React + inline SVG + CSS.
3. **모든 다이어그램 타입의 완성 프리셋 컴포넌트** (스텁 금지 — 각 타입은 바로 쓸 수 있는 완성품).
4. **별도 패키지**로 분리.

### "완성 프리셋"의 정의 (acceptance criteria)
이 패키지는 **visual notation kit**이다 — 표준 의미론을 검증/강제하는 렌더러가 아니다(BPMN/ArchiMate/SysML의 의미·제약·계층을 런타임 검증하지 않음). README에 이 선을 명시한다. 각 프리셋이 "완성"으로 인정되는 기준:
- (a) 해당 타입의 대표 표기 요소(노드 shape·엣지·마커·라벨·경계)를 모두 렌더할 수 있다.
- (b) `children`(저수준) + `data`(편의) 두 작성 모드가 모두 동작한다.
- (c) 프로토타입/표준의 대표 예시 1개 이상을 스토리로 재현하고 `play()` 단언이 통과한다.
- (d) autodocs 문서 + 사용 예제 코드가 있다.

### 미러링할 레포 규약 (검증 완료)
- zero runtime deps. 빌드 = tsup(ESM only, `dts:true`, `treeshake`, `external: ['react','react-dom']`). peerDeps React `^18.2 || ^19`.
- 스타일 = inline `React.CSSProperties`만. css-in-js/css-modules 없음.
- 토큰: 테마를 `flattenToCSSVars`로 CSS 변수(prefix `--bbangto-`)로 평탄화 → ThemeProvider가 주입 → 컴포넌트는 `cssVar('a','b','c')` → `var(--bbangto-a-b-c)`로 읽음. **`flattenToCSSVars(obj, prefix)`는 prefix 인자를 받고 `name`/`description` 키를 건너뛴다 (검증: `packages/tokens/src/contract.ts:10-36`).**
- 모든 컴포넌트: `React.forwardRef` + 명시적 `displayName` + `...props` 스프레드 + `...style` 마지막 병합. 컴포넌트와 Props 인터페이스를 named export.
- 컴파운드 컴포넌트는 React Context 사용 (`packages/core/src/components/Tabs.tsx`).
- 1회성 전역 주입은 `useInsertionEffect` + `typeof document` 가드 (`packages/core/src/motion/keyframes.ts` — SSR-safe 패턴).
- 배럴: `export * from './...'` (`packages/core/src/index.ts`).
- Storybook: CSF v3, `title`, `tags:['autodocs']`, Playwright `play()` 테스트(`@storybook/addon-vitest`)가 role/aria/data-attr/computed-style 검증.

---

## A. 패키지 구조

**core/토큰과의 관계 (채택안):** 자체 토큰 contract + 자체 `DiagramProvider`를 두되, `@centurio1987/tokens`의 **범용 유틸 `flattenToCSSVars`만** 재사용한다. `@centurio1987/core`에는 **의존하지 않는다**(두 atomic system 독립 보장). theme-* 패키지에도 의존하지 않는다.

```
packages/diagram/
├── package.json            # name @centurio1987/diagram, deps: @centurio1987/tokens(workspace:*)
├── tsup.config.ts          # core와 동일(ESM, dts, treeshake, external react)
├── tsconfig.json           # core와 동일
├── README.md
└── src/
    ├── index.ts            # 배럴 (export * 한 줄씩)
    ├── tokens/             # types.ts(DiagramTheme) · contract.ts(dvar) · blueprint.ts(기본값)
    │                       #  + candy.ts/swiss.ts(나중에 데이터만) · index.ts
    ├── provider/           # DiagramProvider.tsx · defs.ts(1회성 <marker> defs+reduced-motion) · index.ts
    ├── context/            # CanvasContext.tsx (노드 레지스트리)
    ├── geometry/           # anchors.ts · routing.ts · shapes.ts · text.ts (순수·SSR-safe, DOM 미사용)
    ├── atoms/              # DiagramCanvas · Node · Edge · Marker · NodeLabel · EdgeLabel
    │                       #  · Tag · Boundary · Lane · Lifeline · GridLayer
    ├── nodes/              # 의미 몰리큘: PersonNode · ExternalNode · ContainerNode · DatabaseNode
    │                       #  · QueueNode · DecisionNode · ProcessNode · ClassBox · StateNode
    │                       #  · EntityTable · C4Box + glyphs/(inline-SVG)
    ├── presets/            # 타입별 완성 컴포넌트 (§D)
    └── types/data.ts       # NodeSpec · EdgeSpec (data-prop 공용 형상)
```

`apps/storybook/package.json`에 `"@centurio1987/diagram": "workspace:^"` 추가. `pnpm-workspace.yaml`은 `packages/*`라 변경 불필요.

**`package.json` 핵심** (core/theme-light과 동일 패턴): `type:module`, `exports: { ".": { types, import } }`, `sideEffects:false`, `dependencies: { "@centurio1987/tokens": "workspace:*" }`, peerDeps react/react-dom, devDeps tsup/typescript/@types.

---

## B. 다이어그램 토큰 시스템 (독자 네임스페이스)

- **prefix = `--bbangto-diagram`.** `@centurio1987/tokens`의 `cssVar`는 prefix가 하드코딩(`--bbangto`)이므로, diagram 패키지는 자체 `dvar()`를 둔다 (`src/tokens/contract.ts`):
  ```ts
  import { flattenToCSSVars } from '@centurio1987/tokens';
  const PREFIX = '--bbangto-diagram';
  export const dvar = (...p: string[]) =>
    `var(${PREFIX}-${p.map(s => s.replace(/([A-Z])/g,'-$1').toLowerCase()).join('-')})`;
  export const diagramThemeToStyleObject = (t: DiagramTheme) =>
    flattenToCSSVars(t as any, PREFIX);   // prefix 인자/메타 스킵 검증 완료
  ```
  - `dvar`와 `flattenToCSSVars`는 **동일한** `replace(/([A-Z])/g,'-$1').toLowerCase()` 변환을 쓰므로 키가 일치한다 — 단, `gridUnit→-grid-unit`·`keylineWidth→-keyline-width`·`dashPattern→-dash-pattern` casing 일치를 **Phase 0 단위 테스트로 가드**한다.
  - 타입 안정성: 기존 레포의 `cssVar`도 `...string[]`이라 규약을 맞춰 `dvar(...string[])`를 유지한다. (토큰 경로를 `DiagramTheme` 룩업 타입으로 좁히는 것은 선택적 후속 개선으로만 둔다 — 1차 범위 제외.)
- **`DiagramTheme` 인터페이스** (3축 분리 설계):
  - `canvas` { bg, grid, gridUnit:8 } — **축1 캔버스**
  - `palette` { p1..p8 } = 프로토타입 정확한 8색: `#EE7B4D #C5B6EE #F0C5DA #E7E058 #A6C6E2 #87B79A #A98C7E #9CAFE7`
  - `node: Record<NodeSemanticKind, NodeSemanticStyle>` — kind별 { fill, keyline, keylineWidth, tagColor, dashed?, glyph }
  - `edge` { stroke #111, width 2.5, dashPattern, cornerRadius, marker:{size,arrow,diamond,circle,cross} } — **축2 라인처리**
  - `c4` { l1,l2,l3: { borderWidth(3/2/1.4), bgTint, labelColor } }
  - `boundary` { stroke, width, dashPattern '8 6', radius, labelColor }
  - `typography` { titleFont(Helvetica-Neue 스택), monoFont(JetBrains Mono), titleWeight, sizes }
  - `iconStyle: 'fill' | 'line'` — **축3 아이콘**
  - `spacing` { nodePad, laneGap }, `motion` { duration, easing }
- **`blueprint.ts`**: 위 값들을 프로토타입 스펙대로 채운 기본 `blueprintTheme: DiagramTheme`. (person `#C5B6EE`/user, external `#EE7B4D`/dashed/arrowOut, container `#87B79A`/stackedRect, database `#A6C6E2`/cylinder, queue `#E7E058`/bars …)
- **주입**: `DiagramProvider`가 `diagramThemeToStyleObject(theme)`를 `style`로 주입 + `data-bbangto-diagram-theme={name}` + 폰트 import.
- **SVG `<marker> defs`는 전역 hidden svg가 아니라 `DiagramCanvas`마다 inline `<defs>`로 렌더**한다(아래 C 참조). 외부 검토 반영: 전역 `id="bbangto-diagram-defs"` 1회 주입은 ① `useInsertionEffect`가 SSR에서 안 돌아 화살촉이 hydration 전까지 누락(FOUC), ② 다중 캔버스/다중 테마/스토리북 isolation에서 id 충돌, ③ 전역 defs가 어느 provider scope의 CSS var를 참조하는지 모호 — 세 문제를 모두 일으킨다. **inline defs + `useId` 접두 id**(예: `${uid}-marker-arrow`)로 전부 해결하고 SSR에서도 초기 HTML에 defs가 포함되게 한다.

---

## C. Atomic 레이어 (독립 atomic system)

**엣지 엔드포인트 해석 (외부 검토 반영해 수정):** bbox는 author가 준 `{x,y,width,height}` props에서 나온다(DOM 측정 X). 레지스트리를 **effect로 채우지 않는다** — effect 등록은 첫 렌더에 Edge가 bbox를 못 보고, 렌더 중 Map mutate는 React purity 위반이다. 대신 **레지스트리를 동기적으로 사전 구성**한다:
- **`data` 모드**(권장 경로): `DiagramCanvas`/프리셋이 `data.nodes`를 받아 렌더 전에 `Record<id, BBox>`를 **순수 함수로 즉시 구성**하고, 노드와 엣지에 동일 객체를 내려준다. Edge는 이 레지스트리에서 동기적으로 읽으므로 첫 렌더부터 정확하고 SSR-deterministic.
- **`children` 모드**: `DiagramCanvas`가 `React.Children`을 **1-pass 사전 스캔**해 `id`+`{x,y,width,height}`를 가진 노드 엘리먼트에서 레지스트리를 동기 구성한 뒤 context로 제공(effect 아님). 조건부/중첩/memo wrapper로 스캔이 닿지 못하는 노드는 등록 누락이 가능 → 그런 경우 author가 `Edge`에 명시 `{x,y}`를 주거나 노드를 top-level로 두도록 **README와 dev `console.warn`으로 안내**.
- **앵커 계산**(`geometry/anchors.ts`)은 `keylineWidth`/`stroke-width`의 절반만큼 바깥으로 보정해 화살촉이 테두리에 정확히 닿게 한다(외부 검토 반영: 테두리 두께 무시 시 앵커가 붕 뜸).
- 미등록 id 참조 시 렌더 생략 + dev `console.warn`(throw 금지). `Edge`는 명시 `{x,y}`도 허용(차트용).

**defs(마커)는 `DiagramCanvas`가 자기 `<svg>` 안에 inline `<defs>`로 렌더**하며, marker id는 `useId()` 접두로 캔버스마다 유니크하게 만든다. `marker-end="url(#${uid}-arrow)"`가 같은 svg 내부 마커를 참조하므로 전역 충돌/SSR 누락이 없다.

**아톰** (전부 forwardRef + displayName + `data-bbangto-diagram-*` 셀렉터, `dvar()`로 색/크기 읽음):
- `DiagramCanvas` — svg 루트, viewBox, 자동 `<defs>`, 레지스트리 provider, `role="img"`+aria/`<title>`/`<desc>`
- `Node` — 제네릭 shape: `rect|rounded|stadium|circle|ellipse|diamond|cylinder|hexagon|parallelogram|trapezoid|subroutine|doubleCircle|cube|component`
- `Edge` — routing `straight|orthogonal(기본)|curved`, marker, dashed, label, `waypoints?`
- `Marker` — `arrow|diamond|circle|cross|triangleOpen` + ER crow's-foot 세트 + composition/aggregation diamond (Phase 5에서 추가)
- `NodeLabel`(Helvetica 볼드 타이틀) — **텍스트 정책**: 기본 `wrap`(어절 단위 줄바꿈, `lines` 상한) + `truncate`(말줄임) 지원, 추정폭에 안전 패딩 부여. `lengthAdjust="spacingAndGlyphs"` 강제 클램프는 **opt-in `fit` 모드에서만** 사용(외부 검토 반영: 폰트 미로드/fallback 시 장평 찌그러짐 방지). `title`/`subtitle`/`tag` 정책 명시. · `EdgeLabel`(모노, bg chip 옵션) · `Tag`(`[children]`) · `Boundary`(점선 라운드 + 모노 라벨, variant `system|group|container`) · `Lane` · `Lifeline` · `GridLayer`

**몰리큘 (의미 노드):** `Node`를 감싸 `dvar('node',kind,…)` + 글리프 기본값 적용. `PersonNode · ExternalNode(dashed) · ContainerNode · DatabaseNode(cylinder) · QueueNode(bars) · DecisionNode(diamond) · ProcessNode · ClassBox(3-칸: name/attrs/methods) · StateNode(stadium+start/end) · EntityTable(ER 행 그리드) · C4Box(level별 border/tint = `dvar('c4',level,…)`)`. 글리프는 `nodes/glyphs/`에 로컬 inline-SVG 아톰(독립 atomic system 유지).

---

## D. 전체 다이어그램 타입 인벤토리 + 프리셋

모든 프리셋은 **두 작성 모드 모두 지원**: 저수준 `children`(아톰 직접 조합) + 편의 `data` prop(`types/data.ts`의 `NodeSpec`/`EdgeSpec`). 규칙: `children` 있으면 children 렌더, 없으면 `data` 렌더(병합 금지 — id 중복 방지). **`data` 항목은 `id` 필수**(자동 카운터/랜덤 금지 — SSR/CSR id 불일치로 인한 hydration mismatch 방지). 내부에서 부득이 생성하는 id는 React `useId()`로 결정적으로 만든다.

**G1 그래프/박스-화살표** (아톰 재사용, 신규 shape 없음): `Flowchart` · `BlockDiagram` · `Mindmap` · `TimelineDiagram` · `RequirementDiagram` · `KanbanBoard`

**G2 아키텍처/C4/UML**: `C4ContextDiagram` · `C4ContainerDiagram` · `C4ComponentDiagram` · `C4CodeDiagram` · `ArchitectureDiagram`(mermaid architecture-beta) · `UMLComponentDiagram`(component shape+lollipop) · `UMLDeploymentDiagram`(`cube` shape) · `UMLSequenceDiagram`(SequenceDiagram 리스킨)

**G3 class/state/ER** (신규 몰리큘): `ClassDiagram`(ClassBox, inherit triangleOpen/aggregation diamond) · `StateDiagram`(StateNode start/end/composite) · `ERDiagram`(EntityTable + crow's-foot 마커 신규)

**G4 인터랙션 (lifeline/lane)**: `SequenceDiagram`(Lifeline, activation bar, message Edge, loop/alt Boundary) · `ZenUMLDiagram`(SequenceDiagram 리스킨) · `BPMNDiagram`(pool/swimlane Lane, event 원/task 라운드/gateway 다이아 — BPMN 글리프 신규) · `ArchiMateBusinessDiagram`/`ArchiMateApplicationDiagram`/`ArchiMateTechnologyDiagram`(공용 ArchiMate 몰리큘, 레이어 컬러밴드로 구분) · `SysMLBlockDiagram`(ClassBox 파생 «block»)

**G5 데이터 차트** (geometry 기반, 레지스트리 대부분 불필요): `PieChart` · `XYChart` · `RadarChart` · `QuadrantChart` · `SankeyDiagram`(가변폭 `band` 엣지 신규) · `GanttChart` · `UserJourney` · `PacketDiagram` · `GitGraph`

**G6 메타 구조 프레임** (다른 프리셋을 조합): `Kruchten4Plus1View`(Logical/Process/Development/Physical + Scenarios 5영역 슬롯) · `ViewpointFrame`(ISO/IEC/IEEE 42010 — `viewpoint`/`concerns[]`/`stakeholders[]`/`view` props, 헤더밴드 + body 슬롯)

신규 추가: `Node` shape `cube`/`component`; 마커 crow's-foot(`erOne/erMany/erZeroOrOne/erOneOrMany`)·`compositionDiamond`·`aggregationDiamond`; 엣지 `band`(Sankey). 그 외 전부 기존 아톰 재사용.

---

## E. 실행 단계

CLAUDE.md 규약대로 **테스트 선행** — 각 단계는 story `play()` 단언을 먼저 작성(red) → 구현(green) → 게이트 실행: `pnpm typecheck && pnpm build && pnpm --filter @centurio1987/diagram test && pnpm --filter storybook build`. 스토리는 `apps/storybook/src/stories/diagram/`, title `Diagram/Atoms|Nodes|Presets/…`. `preview.tsx`에 `<DiagramProvider>` 데코레이터 추가(기존 ThemeProvider 데코레이터와 동형). 각 단계 끝에 `src/index.ts` 배럴 + autodocs 스토리 등록.

- **Phase 0 — scaffold + 토큰**: package.json/tsup/tsconfig/index, `tokens/*`, `provider/*`, `context/CanvasContext`, storybook dep+데코레이터, **소비자 스모크 fixture**(임시 앱에서 export/peerDep/d.ts/tree-shaking을 초기 검증), **`@centurio1987/core` import 금지 강제**(의존성 검사 — `package.json` deps에 core 없음 + 간단 grep/lint 가드), **README v0**(선언형 좌표 API 핵심 예제). 테스트: `[data-bbangto-diagram-theme="blueprint"]` 존재; `--bbangto-diagram-node-person-fill === #C5B6EE`; **토큰 casing 패리티**(`gridUnit→-grid-unit` 등) 단위 테스트.
- **Phase 1 — atoms + geometry**: `atoms/*`, `geometry/*`, **README 예제 동시 작성**(ergonomics 검증). 테스트: Canvas role/aria/viewBox/`<title>`·**inline `<defs>`가 같은 svg 내부에 존재**; Node 각 shape SVG·`stroke-width===2.5`; Edge 레지스트리 해석(`d` 비어있지 않음, `marker-end`가 **같은 캔버스 내 `useId` 마커** 참조); 앵커가 keyline 두께 보정; NodeLabel `wrap`/`truncate`/`fit` 동작; Boundary `stroke-dasharray`+모노 라벨; **대형 스토리**(200 노드/100 메시지)로 렌더 성능·Context rerender 비용 점검.
- **Phase 2 — 의미 노드 몰리큘 + 글리프**: `nodes/*`, `nodes/glyphs/*`. 테스트: 몰리큘별 fill 변수·`[tag]` 텍스트·글리프 `<svg>`; `C4Box level="l2"` `stroke-width===2`; ExternalNode dashed.
- **Phase 3 — G1 프리셋**. 두 작성 모드 동등 노드 수, 엣지 연결 검증.
- **Phase 4 — G2 프리셋(C4/아키텍처/UML)**. C4 border 위계 l1>l2>l3, Boundary 라벨.
- **Phase 5 — G3(class/state/ER)**. ClassBox 3칸, ER crow's-foot 마커 id 해석.
- **Phase 6 — G4(인터랙션)**. lifeline 수, message y-정렬 순서, BPMN gateway 다이아, ArchiMate 레이어 밴드.
- **Phase 7 — G5(차트)**. arc/segment 수, 축 grid, Sankey band path.
- **Phase 8 — G6(메타뷰) + 문서**. `Kruchten4Plus1View`·`ViewpointFrame` + `Diagram/Overview` MDX(전 프리셋 갤러리) + 최종 풀게이트.

---

## F. 리스크 / 결정 사항

- **엔드포인트**: 레지스트리를 **effect가 아니라 props에서 동기 사전 구성**(data 모드는 순수 함수, children 모드는 1-pass `React.Children` 스캔). 첫 렌더부터 정확·SSR-deterministic. children 스캔이 못 닿는 노드(조건부/중첩/memo)는 명시 `{x,y}` fallback + `console.warn`. 앵커는 keyline 두께 절반 보정.
- **좌표계**: 절대 SVG user unit + `snap()`(gridUnit 8) 헬퍼. `geometry.gridPlace(items,cols,gap)`로 행/열 배치 편의 제공(레이아웃 엔진 아님). 수작업 좌표 번거로움은 `data` prop + 헬퍼로 완화 — "no auto-layout"은 확정 결정.
- **data vs children**: 둘 다 지원, 병합 금지.
- **텍스트 측정**: `geometry/text.ts` `estimateWidth()`(모노 ≈0.6em 고정폭, 타이틀 보수적 추정 + 안전 패딩) — `getComputedTextLength()`(DOM-only) 미사용. `NodeLabel` 기본은 `wrap`(`lines` 상한)/`truncate`; `lengthAdjust` 강제 클램프는 opt-in `fit` 모드 한정(폰트 fallback 시 찌그러짐 방지). CJK/emoji/긴 라벨은 wrap·truncate로 처리.
- **접근성**: 기본 `role="img"`+aria-label+`<title>`/`<desc>`. 옵션 `accessible="structured"`(canvas `role="group"`, Node별 `role="listitem"`). 장식 글리프/마커 `aria-hidden`.
- **reduced-motion**: 애니메이션은 `animate` opt-in, `[data-bbangto-diagram-theme]` 스코프 `@media (prefers-reduced-motion)`로 게이트. 기본은 정적 문서.
- **SSR / defs**: 렌더 시 DOM 측정 전무. 마커 `<defs>`는 **각 `DiagramCanvas`의 inline `<defs>`**(전역 hidden svg 아님)라 SSR 초기 HTML에 포함 → 화살촉 FOUC 없음, id 충돌 없음, provider scope 모호성 없음. `data-bbangto-diagram-theme` 스코프의 reduced-motion CSS만 1회 주입(`useInsertionEffect`+`typeof document` 가드).
- **Hydration**: `data` 항목 `id` 필수, 내부 생성 id는 `useId()` — SSR/CSR 마크업 일치 보장.
- **의존성 위생**: `@centurio1987/core` import 금지(두 atomic system 결합 방지) — `dependencies`에서 제외 + **의존성 검사/grep 가드로 강제**(말로만 두지 않음).
- **테마 축 미래대비**: `candy.ts`/`swiss.ts`는 순수 `DiagramTheme` 값(3축 토글). 아톰이 전 시각요소를 `dvar()`로 읽으므로 변형 추가 시 아톰 코드 무변경.

---

## 검증 (end-to-end)

1. `pnpm install` 후 `pnpm --filter @centurio1987/diagram build` — ESM dist + d.ts 생성.
2. `pnpm --filter @centurio1987/diagram typecheck` — 무에러.
3. `pnpm storybook` — `Diagram/*` 스토리 렌더 확인, autodocs 페이지 확인.
4. `pnpm --filter @centurio1987/diagram test` (또는 storybook addon-vitest) — 각 Phase의 `play()` 단언 통과(특히 토큰 변수값, 마커 참조 해석, C4 border 위계, ER 마커).
5. `pnpm --filter storybook build` — 풀 번들 무에러.
6. 외부 소비 스모크(Phase 0부터 상시): 임시 앱에서 `<DiagramProvider><C4ContainerDiagram .../></DiagramProvider>` 렌더 → export/peerDep/d.ts/tree-shaking 검증.
7. 시각 일치: "Blueprint와 일치"를 주관 판단이 아니라 **고정 값 fixture로 단언** — palette 8색 hex, keyline 2.5px, C4 border 3/2/1.4, boundary dash '8 6', marker size, typography 토큰을 스토리 `play()`에서 검증. (스크린샷 baseline 회귀는 선택 사항 — 현 레포는 DOM 단언 방식이므로 도입 시 별도 결정.)

### 참조할 핵심 파일
- `packages/tokens/src/contract.ts` — `flattenToCSSVars(obj, prefix)` 재사용
- `packages/core/src/ThemeProvider.tsx` — `DiagramProvider` 템플릿
- `packages/core/src/motion/keyframes.ts` — `provider/defs.ts` 1회 주입 SSR-safe 패턴
- `packages/core/src/components/Tabs.tsx` — forwardRef + Context 컴파운드 패턴
- `apps/storybook/src/stories/Tabs.stories.tsx` — CSF v3 + Playwright `play()` 단언 패턴
- `packages/core/tsup.config.ts` · `packages/core/package.json` — 빌드/매니페스트 미러링
