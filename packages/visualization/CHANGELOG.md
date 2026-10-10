# @centurio1987/bbangto-ui-visualization

## 1.0.0

### Major Changes

- a1eca39: 채택 매니페스트 4종이 색인과 항목별 상세 두 층으로 나뉜다(KAN-064).

  전에는 매니페스트 파일 하나에 항목 전부의 전체 메타가 들어 있었다. Claude 토크나이저로 재 보니 UI style guide 매니페스트
  하나가 50,325토큰이라, AI 가 "파일 하나를 읽고 고른다"는 쓰임새가 성립하지 않았다. 이제 매니페스트 파일은 후보를 고를 때
  쓰는 필드만 담은 **색인**이고, 고른 후보의 전체 메타는 패키지에 함께 실리는 **상세 파일**에서 읽는다.

  | 패키지                            | 색인(서브패스)               | 색인 크기            | 상세                     |
  | --------------------------------- | ---------------------------- | -------------------- | ------------------------ |
  | style-guide-catalog               | `./manifest.json`            | 8,709토큰(전 50,325) | `./manifest/<name>.json` |
  | visualization-style-guide-catalog | `./manifest.json`            | 5,179토큰(전 30,392) | `./manifest/<name>.json` |
  | foundations                       | `./foundation.manifest.json` | 8,029토큰(전 37,081) | `./manifest/<slug>.json` |
  | visualization                     | `./type.manifest.json`       | 6,675토큰(전 38,474) | `./manifest/<id>.json`   |

  ### 깨지는 것

  색인 서브패스의 모양이 항목 배열에서 `{ axis, detail, columns, rows }` 객체로 바뀐다. `columns` 가 열 이름이고, `rows` 의
  각 배열이 그 순서대로 한 항목의 값을 담는다. `useWhen` · `avoidWhen` · `mood` · `characteristics` · `accessibility` ·
  `related` · `completeness` 는 색인에 없고 상세 파일에만 있다.

  ```ts
  // 전
  import manifest from "@centurio1987/bbangto-ui-style-guide-catalog/manifest.json";
  manifest.find((e) => e.name === "cyberpunk-hud-01")?.meta?.useWhen;

  // 후 — 색인에서 고르고, 상세에서 읽는다
  import index from "@centurio1987/bbangto-ui-style-guide-catalog/manifest.json";
  import detail from "@centurio1987/bbangto-ui-style-guide-catalog/manifest/cyberpunk-hud-01.json";
  const nameAt = index.columns.indexOf("name");
  index.rows.some((row) => row[nameAt] === "cyberpunk-hud-01"); // true
  detail.meta?.useWhen;
  ```

  ### 그대로인 것

  메타 스키마 타입(`StyleGuideMeta` · `FoundationMeta` · `VizTypeMeta`)과 `buildManifest` · `buildFoundationManifest` ·
  `buildTypeManifest` · `selectStyleGuides` · `selectFoundations` · `selectVizTypes` 의 시그니처는 바뀌지 않는다.
  코드에서 객체로 고르던 쓰임새는 영향이 없다.

### Minor Changes

- d51cf96: 면 위 글자가 어느 스타일 가이드에서나 읽힌다(KAN-061).

  Provider 가 면 토큰마다 그 위에 쓸 글자색을 `--bbangto-viz-on-*` CSS 변수로 함께 낸다.
  대상 면은 `palette.p1~p8` · `shape.fill` · `canvas.bg` · `c4.l1~l3.bgTint` · `node.<kind>.fill` 이고, 이름은 면 경로를 따른다
  (예: `palette.p2` 위 글자 → `--bbangto-viz-on-palette-p2`, `c4.l2.bgTint` → `--bbangto-viz-on-c4-l2-bg-tint`).
  값은 가이드 글자색 넷(`edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg`) 중 처음으로 면과 4.5:1 을 넘는
  것이고, 없으면 검정·흰색 중 대비가 큰 쪽이다. 반투명 면은 밑에 레인 띠 정도(검정 5%)의 음영이 깔려도 읽히는 쪽을 고른다.
  `visualizationFoundationToStyleObject` 도 같은 변수를 함께 낸다.

  ### tokens

  `VisualizationFoundation` 에 선택 필드 `on` 이 생겼다. 가이드가 여기 적은 글자색은 계산값을 이긴다
  (예: `on: { palette: { p1: '#FFFFFF' } }`). 적지 않은 자리는 계산값이다. 기존 가이드는 고칠 것이 없다.

  ### visualization — 바뀐 동작

  카탈로그 가이드 30개에서 글자 대비가 4.5:1 에 못 미치던 1538곳(템플릿 68개 표본 기준)이 모두 풀렸다.
  그 대신 지금 읽히던 글자도 가이드에 따라 색이 바뀔 수 있다. 같은 면이면 어느 템플릿에서나 같은 글자색이 나온다.

  - `NodeLabel` 기본 글자색: `edge.stroke` → `--bbangto-viz-on-shape-fill`. 보조 글자(`subtitle`)의 opacity 0.7 을 걷었다.
  - `ClassBox` · `EntityTable` · `C4Box` · 의미 노드 7종(`PersonNode` 등): 기본 면 위 이름·태그·속성 글자가 그 면의 `on-*` 를
    쓴다. `fill` 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색(`edge.stroke`)을 둔다.
  - 팔레트 면 위 글자: Treemap · WorkBreakdownStructure · PacketDiagram · StackedBarChart · UserJourneyGantt · Mindmap ·
    DMNDiagram · ArchiMateViewpointDiagram · Fishbone 머리 · C4DynamicDiagram 순번. `color`·`fill` 을 직접 주면 종전 글자색이다.
  - 데이터마다 투명도가 바뀌는 면: Heatmap · ChoroplethMap(칸마다) · SankeyDiagram(노드마다 이름 밑 실제 면 — 이름 가운데를 덮는 나가는 리본, 없으면 바탕 — 으로) ·
    ArchiMateDiagram(35% 계층 면). Provider 의 foundation 값으로 계산한다.
  - 흐리게 쓰던 보조 글자의 opacity 를 걷었다: ER 속성 타입(0.6, 9px 로 구분) · QuadrantChart 사분면 이름(0.7) ·
    DataLineage 설명(0.8) · RequirementDiagram 표기·본문(0.6·0.8) · Treemap·PacketDiagram 값(0.85).
  - RequirementDiagram 머리 띠(검정 6%) 위 글자는 띠를 얹은 면으로 고른다. IsometricScene 라벨은 윗면과 그 둘레의 바닥 그림자·옆면 음영 위에서 모두 읽히는 색으로 고른다.

  props 와 export 는 그대로다.

### Patch Changes

- 910cbb6: 스타일 가이드의 `edge.dashPattern` 이 `Edge` 연결선의 기본 대시를 정한다(KAN-057).

  이 토큰은 타입에 선언돼 있었지만 계약 스타일시트도 `Edge` 도 읽지 않아, 가이드에 대시를 적어도 연결선은 실선이었다.
  이제 계약 스타일시트가 `Edge` 연결선에 `stroke-dasharray: var(--bbangto-viz-edge-dash-pattern)` 을 건다.
  `strokeDasharray` prop 은 지금처럼 인라인으로 나가 가이드 값을 이긴다. props 와 export 는 그대로다.

  ### 바뀐 동작

  - 카탈로그 가이드 30개와 base foundation 은 모두 `edge.dashPattern: ''`(실선)이라 지금 있는 그림은 바뀌지 않는다.
  - 대시는 `Edge` 연결선에만 걸린다. 축선·눈금·수염처럼 같은 edge 채널(`data-bbangto-viz-edge`)을 쓰는 구조선은 실선으로 남는다.
    연결선을 가르려고 `Edge` 의 `<path>` 에 `data-viz-part="connector"` 속성이 붙는다.
  - `visualizationFoundationToStyleObject` 가 `*-dash-pattern` 의 빈 값을 `''` 대신 `none` 으로 낸다. React 는 빈 문자열 CSS
    변수를 지우므로, 그대로 두면 대시 가이드 안에 겹친 실선 가이드의 연결선이 바깥 대시를 물려받았다.
  - 가이드 기본값을 앱 스타일시트로 덮으려면 `[data-bbangto-viz-style-guide] [data-viz-part="connector"]` 보다 구체적인 선택자를 쓴다.

- b1dc968: 배포 README 에 「원하는 것이 없을 때」 절을 더하고, visualization 배포물에서 저장소 관리 문서 두 개를 뺐다(KAN-067).

  원하는 컴포넌트나 유형이 없을 때, 앱을 만드는 에이전트가 앱 안에서 확장하지 않고 라이브러리를 떠나거나
  개선 요청으로 결론을 내던 자리다. README 는 목록에서 고르는 법만 적었고, 함께 실린 `visualization-type-inventory.md`
  의 「갭이 보이면 백로그에 행 추가」 지시는 라이브러리에 요청하라는 말로 읽힐 수 있었다.

  - core README: 앱 안에 확장 컴포넌트를 만드는 순서 넷, `--bbangto-*` 변수 갈래, `ref`·`className` 이 넘어가지 않는
    예외(`DataGrid`, React 18 의 `Skeleton`·`Text`), 감쌀 때 걸리는 자리 둘(아이콘 색 고정 · `Button` 의 hover 인라인 색),
    별점 입력 예제.
  - visualization README: atom·molecule 로 조립하는 순서와 부품 표, 결정 그림 예제, 범위 밖 3종(VT-520·VT-610·VT-611)의 사유.
    「Provider 밖에서는 무채색으로 그려진다」는 서술은 틀렸다 — 색 prop 이 없는 도형은 검게 채워지고 엣지는 보이지 않는다
    (chromium 실측). 그 사실로 고쳤다.
  - visualization 배포물: `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 를 `files` 에서 뺐다. 두 문서는
    저장소에 그대로 있고, README 와 `.d.ts` 주석이 GitHub 링크로 가리킨다.

  ### 바뀐 동작

  `node_modules/@centurio1987/bbangto-ui-visualization/` 에서 위 두 문서를 파일로 읽던 도구는 그 파일을 찾지 못한다.
  README 의 「저장소에만 있는 문서」 링크로 옮긴다. 코드·export·타입은 바뀌지 않았다.

- Updated dependencies [910cbb6]
- Updated dependencies [d51cf96]
  - @centurio1987/bbangto-ui-tokens@1.5.0

## 0.4.1

### Patch Changes

- d881cf0: 템플릿 13개가 기본 채움·선 색까지 스타일 가이드를 따른다(KAN-056).

  `ArchitectureDiagram` · `ArchiMateDiagram`(계층별 래퍼 포함) · `BlockDiagram` · `BPMNDiagram` · `BPMNCollaborationDiagram` ·
  `C4CodeDiagram` · `KanbanBoard` · `Mindmap` · `RequirementDiagram` · `TimelineDiagram` · `UMLComponentDiagram` ·
  `UMLDeploymentDiagram` · `UMLSequenceDiagram` 이 기본 색을 리터럴(`#FFFFFF` · `#111111` · `#555555` 등)로 넣고 있었다.
  그 값이 인라인 style 로 렌더돼 계약 스타일시트를 이겼으므로, 스타일 가이드를 바꿔도 그 부분 색은 그대로였다.
  이제 기본값을 넘기지 않고 `shape.*` · `edge.*` · `palette.*` · `boundary.labelColor` 토큰이 칠한다.
  props 와 export 는 그대로이고, 명시한 `fill` · `stroke` 는 지금처럼 가이드를 이긴다.

  ### 바뀐 동작

  다른 가이드에서는 위 템플릿의 이 부분이 이제 그 가이드 색을 따른다. 기본 가이드(Blueprint_Technical_01)에서는
  흰 채움·검정 선이 토큰과 같은 값이라 그대로이고, 아래 여섯 곳만 눈에 띄게 바뀐다.

  - `C4CodeDiagram` · `Mindmap` · `RequirementDiagram` 연결선: `#555555` → `edge.stroke`(blueprint `#111111`).
  - `BPMNDiagram` 게이트웨이: `#FFF9C4` → `palette.p4`(blueprint `#E7E058`). `BPMNCollaborationDiagram` 과 같은 색이다.
  - `BPMNDiagram` 끝 이벤트: `#FFCCBC` → `shape.fill`(blueprint `#FFFFFF`). 3px 테두리는 그대로다.
  - `UMLDeploymentDiagram` 노드: `#E8EDF4` → `shape.fill`(blueprint `#FFFFFF`).
  - `UMLSequenceDiagram` 메시지 라벨: `#333333` → `boundary.labelColor`(blueprint `#555555`). 머리 테두리·글자와 생명선은
    `edge.stroke` 를 따른다.
  - `UMLSequenceDiagram` 참여자 머리 바탕: `palette.p2`(blueprint `#C5B6EE`) → `canvas.bg`(blueprint `#F9F8F6`). 파일럿
    `Lifeline` 원자와 같은 조합이다. 전에는 팔레트 면 위의 `#111111` 이름이 카탈로그 가이드 30개 중 11개에서 4.5:1 에
    못 미쳤고, 이제 30개 모두 4.5:1 이상이다.

  `ArchiMateDiagram` 의 계층 면은 business `palette.p4` · application `palette.p5` · technology `palette.p6` 를 fill-opacity
  0.35 로 칠한다. blueprint 에서는 원래 파스텔과 비슷한 밝기다(예: business `#FFF9C4` → 흰 바탕 위 `#F7F4C5`).
  요소에 `fill` 을 명시하면 불투명 그대로다.

- Updated dependencies [10e4a92]
  - @centurio1987/bbangto-ui-tokens@1.4.0

## 0.4.0

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

## 0.3.0

### Minor Changes

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

- 649aaaa: 상류 이슈 4건 해소 — 축 정렬 엣지 화살촉 · 콘텐츠 박스 · 경계 라벨 · 라벨 서체

  클라이언트가 올린 4건(P1~P4)을 고쳤다. 각 항목마다 **되돌릴 수 있는 우회**를 적는다.

  **P1 · 축 정렬 엣지에서 화살촉이 90° 틀어지던 문제** (`orthogonalPath`)

  - 축 정렬(`from.x === to.x` / `from.y === to.y`)은 `straightPath`에 위임한다. 그림은 같고 길이 0
    종단 세그먼트가 사라져 `orient="auto"` 마커의 방향이 정의된다.
  - 리포트가 제안한 "정확히 0" 판정보다 한 단계 넓다. 종단 구간이 마커(기본 8 user unit)보다
    짧으면 화살촉이 구간을 덮어 길이가 0이 아니어도 옆을 본 그림이 된다 — 새 상수
    `MIN_TERMINAL_SEGMENT`(=8) 아래면 직선으로 잇는다. `dx === cornerRadius * 2`처럼
    **모서리 분기에서도 길이 0 종단이 나오던 경계**가 여기 함께 잡힌다.
  - `buildPath`의 waypoints 경로도 연속 중복 점을 접는다(같은 결함).
  - 되돌릴 우회: 세로 엣지의 `routing="straight"` 명시. 게이트 2종(`lint-diagrams.ts` ·
    `inspectEdgeGeometry`)은 그대로 둘 것 — 상류 회귀를 계속 잡는다.

  **P2 · 형태별 콘텐츠 박스** (신규 `contentBox(shape, bbox, opts?)`)

  - 도형 안에서 글자를 넣어도 되는 사각형을 돌려준다. cylinder·diamond·hexagon·trapezoid·
    parallelogram·cube·folder·subroutine·circle·ellipse·stadium·doubleCircle·rounded 지원.
  - cylinder 뚜껑 상수는 `cylinderCapHeight`(+`CYLINDER_CAP_RATIO/MIN/MAX`)로 승격해
    `cylinderPaths`와 한 값을 공유한다. `cubeDepth`·`subroutineIndent`·`doubleCircleInnerRadius`·
    `folderTabHeight`도 같은 이유로 export한다 — `Node`가 그리는 값과 계산이 갈릴 수 없다.
  - **주의**: cylinder의 실제 콘텐츠 높이는 리포트가 계산한 `h - 2*cap`(h=62 → 43px)이 아니라
    `h - 3*cap`(h=62 → 34.1px)이다. body path의 윗변이 위 뚜껑의 **아랫 호**라 가로 중앙에서
    `y + 2*cap`까지 내려온다(브라우저 `isPointInFill` 실측). 복제해 둔 계산식을 지울 때 이 값으로 맞출 것.
  - `NodeLabel`에 `height?`·`shape?`를 추가했다. 주면 콘텐츠 박스 안으로 줄 수를 맞추고,
    줄이 줄어 낱말이 빠지면 말줄임으로 드러낸다. 안 주면 종전 동작 그대로다.
  - 되돌릴 우회: `_frame.tsx`의 `cap = clamp(h*0.15,4,12)` 복제와 `database`/`decision` 치수 주석.

  **P3 · 경계 라벨이 프레임 선에 얹히던 문제** (`Boundary`)

  - 기본 배치는 그대로 두고(기존 그림 좌표 보존) 라벨 뒤에 배경색 halo를 깐다
    (`paint-order: stroke`) — 선이 글자를 가로지르지 않는다. `labelHalo` / `labelHaloColor` /
    `labelHaloWidth`로 조절한다.
  - `labelPlacement?: 'on-line' | 'outside' | 'inside'` 추가. 밖/안으로 완전히 빼면 halo 없이도 비껴간다.
  - 실측: fontSize 11 기준 라벨 잉크 하단과 프레임 스트로크 밴드 사이 여유는 2.3px뿐이라
    디센더가 있는 라벨(`Payment gateway`)은 기본 두께 1.5에서 0.32px 겹쳤다.
  - 되돌릴 우회: `_frame.tsx`가 `Boundary`에 label을 넘기지 않고 직접 `<text>`로 그리는 것.

  **P4 · 라벨 기본 서체가 monoFont라 한글이 폴백으로 떨어지던 문제**

  - `typography.labelFont`를 **optional**로 추가했다(required면 스타일가이드 전체가 깨진다).
  - 신규 `resolveLabelFont(label, explicit?)` — 명시값 > `labelFont` 토큰 > 스크립트 판정
    (비라틴이면 `titleFont`, 아니면 `monoFont`). 판정 함수 `hasNonAsciiScript`도 export한다.
    라틴 확장·일반 구두점·통화기호(`«»`·`café`·`—`·`₩`)는 라틴으로 본다.
  - 적용: `Boundary`·`Lane`·`EdgeLabel`·`Tag`·`Axis`(틱 라벨)·`MilestoneMarker` ·
    `ClassBox`·`EntityTable` · 호출자 문자열을 그리는 patterns/templates 28곳.
    축 눈금 수치·순번·델타처럼 항상 라틴인 자리는 mono를 유지한다.
  - 되돌릴 우회: `_frame.tsx`의 `isLatin()` 분기.

### Patch Changes

- Updated dependencies [727a4eb]
- Updated dependencies [649aaaa]
  - @centurio1987/bbangto-ui-tokens@1.3.0

## 0.2.0

### Minor Changes

- 3449f78: ORD-010: visualization 유형 인벤토리 P1 26종 구현(additive — 기존 타입 무변경).

  - 차트 템플릿: BarChart·LineChart·QuadrantChart·PieChart·RadarChart·RadialGauge·Treemap·SankeyDiagram·GanttChart·UserJourneyGantt·UserJourneyMap·GitGraph·PacketDiagram
  - 구조 템플릿: NetworkTopology·DataLineage·SitemapTree·NetworkGraph·ScreenFlow
  - 패턴: Venn·Pathways·GeoMap·BentoGrid·Sketchnote·PosterEditorial·SpectrumSlider + Cycle `spiral` 모드 추가(CycleMode union 확장)
  - 신규 atom: Axis·BandEdge / molecule: MockupNode
  - 신규 geometry(순수 함수 + vitest 단위 테스트): scale(linearScale/bandScale/niceTicks)·treemap(squarify)·venn·sankey·tree(tidyTreeLayout)
  - 6개 스타일 가이드는 계약 CSS(shape/edge)만으로 자동 커버 — 가이드 파일 무변경.

- c7fa242: ORD-011: visualization 유형 인벤토리 P2 22종 구현(additive — 기존 타입 무변경).

  - E 데이터 차트 템플릿: StackedBarChart·AreaChart·ScatterPlot·Histogram·DotPlot·WaterfallChart·Heatmap·ChoroplethMap(caller-supplied path)
  - A 엔지니어링 다이어그램 템플릿: UseCaseDiagram·C4DynamicDiagram·C4SystemLandscapeDiagram·DataFlowDiagram·ActivityDiagram(🔶 근사→전용 승격)
  - 관계/원인 템플릿: ConceptMap(🔶 근사→전용 승격)·Fishbone
  - 패턴: Funnel·ListInfographic·AnnotatedIllustration·SwotMatrix·OnionDiagram
  - 모드 확장(union 확장, 신규 export 아님): Cycle `flywheel`(VT-708)·Statistics `waffle`(VT-513)
  - 신규 molecule: ActorGlyph(UseCase 액터)
  - 신규 geometry(순수 함수 + vitest 단위 테스트): stack·histogram(binning)·waterfall·funnel(trapezoids)·fishbone(layout)
  - 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, Heatmap/Choropleth 강도는 팔레트색+fill-opacity 스케일. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).

- 3e2473c: ORD-012: visualization 유형 인벤토리 P3 11종 구현(additive — 기존 타입 무변경). 잔여 인벤토리 0(P1·P2·P3 전량 ✅).

  - E 데이터 차트 템플릿: Boxplot(VT-510)·ChordDiagram(VT-516)
  - A 엔지니어링 다이어그램 템플릿: UMLPackageDiagram(VT-102)·DMNDiagram(VT-124)·BPMNCollaborationDiagram(VT-123, 🔶 근사→전용 승격)·ArchiMateViewpointDiagram(VT-121)
  - C 계층 템플릿: WorkBreakdownStructure(VT-307, 🔶 근사→전용 승격)
  - F/G 패턴: InformationalInfographic(VT-604)·Iceberg(VT-704)·BusinessModelCanvas(VT-707, 표준 비대칭 9블록)·Honeycomb(VT-709)
  - 신규 geometry(순수 함수 + vitest 단위 테스트): boxplot(Tukey 5수 요약·outlier)·chord(비정방/음수/합0/self-chord/pad 초과 반환 규약)·iceberg(빙산 폴리곤 사다리꼴 밴드)·hexgrid(벌집 오프셋 패킹) + tree.ts `wbsNumbering`(다중 루트·순환 방어)
  - 신규 shape: Node `folder`(UML 패키지 탭) + DMN inline path 헬퍼(knowledgeSource 물결·bkm 모서리 컷)
  - 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, 면 구분은 팔레트색+fill-opacity. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).

- 4fa2a01: ORD-008: DIAGRAM → VISUALIZATION 개편 — headless 아토믹 + 스타일 가이드 주입

  - **BREAKING(사전 1.0 클린 rename, shim 없음)**: `@centurio1987/bbangto-ui-diagram` 패키지는
    `@centurio1987/bbangto-ui-visualization`으로 대체·삭제되었다. `DiagramProvider`/`blueprintTheme`/`dvar`/
    `DiagramTheme`/`DiagramCanvas`/`DiagramMarkers` → `VisualizationStyleGuideProvider`/
    (카탈로그 `blueprintTechnical01VizStyleGuide`)/`vvar`/`VisualizationFoundation`/`Canvas`/`Markers`.
    CSS 변수 prefix `--bbangto-diagram-*` → `--bbangto-viz-*`, data 속성 `data-bbangto-diagram-*` → `data-bbangto-viz-*`.
  - tokens: `VisualizationFoundation`/`VizNodeSemanticKind`/`VizNodeSemanticStyle`/`VizFoundationPreset`/
    `VisualizationStyleGuideTokens` 타입 신설(+ foundation `shape` 그룹).
  - visualization: atoms/molecules 전량 headless 전환(계약 스타일시트 + 시맨틱 data-viz-part), 인포그래픽
    패턴 6종(ProcessSteps/Comparison/TimelineRoadmap/Hierarchy/Cycle/Statistics) + 신규 atom 9종/molecule 3종,
    `nodes/`→`molecules/`, `presets/`→`templates/` 아토믹 재매핑.
  - visualization-style-guide-catalog(신규 0.1.0): Blueprint_Technical_01(구 blueprintTheme 승격, paper/whiteprint) ·
    Minimal_Line_01(default/slate) · Colorful_Flat_01(default/candy) — 각각 foundations/foundation presets/
    wrapper components/guidelines/visual motif 완비.

- b632c67: 유형(what) 축 메타 인프라 + iso geometry 프리미티브 + G6 메타 프레임 (additive — 기존 타입 무변경).

  - **신규 서브패스 `./type-meta`**: `VizTypeMeta` registry(87종 전량 authored) + `selectVizTypes` soft-weighted selector + `type.manifest.json`. 루트 배럴 미오염(컴포넌트 소비자 번들 무영향). 스타일 축과 직교하는 "무엇을 그리나" 축.
  - **진짜 isometric geometry 트랙**: `geometry/isometric`(projectIso 30°투영·depth-sort·iso 커넥터·floor grid) 순수 함수 + `IsoPrism` atom + `IsometricScene` 템플릿. 텍스트 skew 없이 좌표 baking(접근성 불변식).
  - **G6 메타 구조 프레임 2종**: `Kruchten4Plus1View`(4+1 뷰) · `ViewpointFrame`(ISO/IEC/IEEE 42010) — 신규 paint 채널 0, 기존 Canvas/Boundary 재사용, 중첩 슬롯으로 타 프리셋 조합.

  모두 신규 export/서브패스. 기존 유형/스타일 계약 무변경.

### Patch Changes

- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
  - @centurio1987/bbangto-ui-tokens@1.2.0

> 이 패키지는 `@centurio1987/bbangto-ui-diagram`(≤0.2.2)에서 rename됨(ORD-008, headless 아토믹 개편). 아래 0.2.2 이하 이력은 diagram 시절 기록이다.

## 0.2.2

### Patch Changes

- Updated dependencies [7db914f]
  - @centurio1987/bbangto-ui-tokens@1.1.0

## 0.2.1

### Patch Changes

- Updated dependencies [a45e32e]
  - @centurio1987/bbangto-ui-tokens@1.0.0

## 0.2.0

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
