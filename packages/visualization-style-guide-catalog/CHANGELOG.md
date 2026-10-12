# @centurio1987/bbangto-ui-visualization-style-guide-catalog

## 2.0.0

### Major Changes

- e91c759: 스타일 가이드 토큰 중 그림에 쓰이지 않던 것을 잇거나 지운다(KAN-069).

  `VisualizationFoundation` 의 잎 86개 중 36개를 그림 코드가 읽지 않았다. 가이드가 값을 적어도 그림이 바뀌지 않았다.
  쓰일 자리가 있는 8개는 잇고, 없는 28개는 지운다.

  ### 바뀐 그림 — 이은 토큰

  - 경계(`Boundary`)가 `boundary.dashPattern`·`width`·`radius` 를 따른다. 지금까지는 모든 가이드에서 `'8 6'`·1.5·8 로 그렸다.
    카탈로그 가이드 29개(블루프린트 제외)의 경계선이 바뀌고, 실선을 정한 넷(iso-color-block·swiss-systematic·bauhaus-geometric·
    neobrutalist)은 실선이 된다. 표준 표기 템플릿 안의 경계도 따른다. `strokeWidth`·`dashPattern`·`radius` prop 이 덮는다.
    대시는 계약 스타일시트가 내부 훅 `data-viz-part="boundary"` 에 건다.
  - `C4Box` 테두리 두께가 `c4.l1~l3.borderWidth` 를 따른다(지금까지 3·2·1.4 고정).
  - `Canvas` 의 `markerSize` 기본값이 `edge.marker.size` 다(지금까지 8 고정, 카탈로그 값은 5~9).
  - `GridLayer` 의 `gridUnit` 기본값이 `canvas.gridUnit` 이다(카탈로그는 모두 8 이라 그림은 그대로다).

  Provider 밖에서는 base 값을 쓰고, 그 값은 지금까지의 상수와 같다.

  ### 지운 필드 — tokens · visualization

  `VisualizationFoundation` 과 `VizNodeSemanticStyle`(visualization 의 `NodeSemanticStyle`)에서 지웠다. `baseVisualizationFoundation`
  도 같은 모양이 된다. 자기 가이드에 적어 두었다면 지운다.

  | 지운 필드                                       | 대신                                                                                               |
  | ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
  | `node.<kind>.tagColor`                          | 노드 글자색은 면마다 계산된다(`--bbangto-viz-on-node-<kind>-fill`). 정하려면 `on.node.<kind>.fill` |
  | `c4.l1~l3.labelColor`                           | C4 글자색도 면마다 계산된다(`--bbangto-viz-on-c4-l1-bg-tint` 등). 정하려면 `on.c4.l1.bgTint` 등    |
  | `node.<kind>.glyph` · `node.external.dashed`    | 없다. 아이콘과 외부 노드 대시는 의미 노드 컴포넌트가 종류마다 정한다                               |
  | `typography.titleWeight` · `typography.sizes.*` | 없다. 글자 크기와 굵기는 템플릿이 정한다                                                           |
  | `iconStyle` · `spacing.*` · `motion.*`          | 없다                                                                                               |

  ### 카탈로그

  - 가이드 30개에서 위 필드를 지웠다. `makeVizColorway` 의 `tagColor`·`c4LabelColor` 선택지도 지웠다.
  - `auditVizContrast` 가 노드·C4 자리에서 실제로 칠하는 글자색(`--bbangto-viz-on-*`)을 잰다. 전에는 칠하지 않는
    `tagColor`·`labelColor` 를 쟀다.
  - 그 결과 `darkluxe-01` 의 `oxblood` preset 이 걸렸다. 노드·C4 글자(계산값 뮤트 골드)가 5.87~6.75:1 로 aaa 선언(7:1)에
    못 미쳤다. `on` 으로 크림(`#EDE3CE`, 13:1 이상)을 정해 그 preset 의 노드·C4 글자색이 바뀐다.
  - 가이드 지침 문장에서 지운 필드 이름(`node.tagColor` 등)을 쉬운 말(노드·C4·경계)로 바꿨다. 지침이 말하는 글자색과
    실제로 칠해지는 노드·C4 글자색이 다른 가이드가 있다(KAN-061 이후 그대로다). 어느 쪽을 맞출지는 KAN-075 에서 정한다.

### Minor Changes

- 09ce0ae: 가이드가 바라는 글자색 `on.ink` 를 더하고, 지침 문장이 글자색을 이름으로 정한 가이드 7개에 적는다(KAN-075).

  ### tokens · visualization — `on.ink`

  `VisualizationFoundation['on']` 에 선택 칸 `ink` 를 더했다. 면 위 글자색을 계산할 때 이 색을 가이드 글자색 넷
  (`edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg`)보다 먼저 보고, 면 위에서 4.5:1 을 넘으면
  (반투명 면은 음영을 얹은 면까지 모두에서) 그 색을 쓴다. 못 넘으면 지금처럼 계산 후보로 넘어간다. 면마다 적은 `on` 값은
  여전히 `on.ink` 보다 먼저다. 적지 않은 가이드의 글자색은 그대로다.

  ### catalog — 바뀐 그림

  지침 문장은 「라벨은 크림」인데 연결선 색(골드·네온·시안)이 먼저 뽑혀 칠해지던 가이드의 글자색이 문장대로 바뀐다.
  노드·C4·팔레트·도형·캔버스 면 중 그 색이 4.5:1 을 넘는 133면이다.

  | 가이드               | 색 묶음           | 글자색                | 전에 칠해지던 색                   |
  | -------------------- | ----------------- | --------------------- | ---------------------------------- |
  | artdeco-luxe-01      | default · emerald | 크림 `#EFE6D0`        | 골드                               |
  | darkluxe-01          | default · oxblood | 웜 크림 `#EDE3CE`     | 골드(oxblood 노드·C4 는 이미 크림) |
  | synthwave-01         | default · sunset  | 니어화이트 `#F2ECFF`  | 시안 · 오렌지                      |
  | hud-telemetry-01     | default · amber   | 순백 `#FFFFFF`        | 시안 · 앰버                        |
  | riso-print-01        | default · teal    | 다크 잉크 `#182234`   | 스팟 블루 · 틸                     |
  | colorful-flat-01     | bento-dark        | 다크 브라운 `#241505` | `#121212`                          |
  | bauhaus-geometric-01 | default           | 파랑 위 흰색          | 크림                               |

  darkluxe oxblood 가 노드·C4 면마다 적던 `on` 덮어쓰기는 `on.ink` 로 옮겼다. bauhaus bold 는 default 의 `on.ink` 를
  물려받지만 그림은 그대로다. 가이드 문장과 칠해지는 글자색은 카탈로그 시험(`textInk.test.ts`)이 함께 본다.

  ### visualization — 템플릿·부품의 글자색

  템플릿·패턴·부품이 도형·연결선 색을 글자에 바로 칠하던 곳을 그 글자가 놓인 면의 글자색으로 바꿨다. 그래서 위 가이드들의
  차트 글자(축 눈금·막대 값·패턴 라벨·연결선 라벨 등)도 문장의 색이 된다. `on.ink` 가 없는 가이드는 대부분 그대로이고,
  도형 선색과 캔버스 위 계산값이 다른 ink-line-duotone(검정 → 흐름선 파랑)·iso-color-block(`#2B3138` → `#3A4149`)의 글자가
  바뀐다. 팔레트 틴트 안 제목(Iceberg·BusinessModelCanvas·Kruchten4Plus1View·ViewpointFrame)은 그 틴트 면으로 고른다.
  `PosterEditorial` 부제는 흐리게(opacity) 쓰지 않는다.

  부품 기본 글자색이 바뀌었다. 직접 쓰는 쪽에서 보인다.

  | 부품                                                          | 전                      | 후                                                                                                                     |
  | ------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
  | `Axis` 눈금 글자 · `Tag` · `StatNumber`                       | 연결선·도형 선색        | `--bbangto-viz-on-canvas-bg`                                                                                           |
  | `EdgeLabel` · `Lifeline` · `StateNode` · `EntityTable` 머리   | 연결선 색               | 바탕을 넘기지 않으면 `--bbangto-viz-on-canvas-bg`, 넘기면 그대로 연결선 색                                             |
  | `StatCard` 숫자 · 라벨                                        | 도형 선색 · 경계 라벨색 | `--bbangto-viz-on-shape-fill`                                                                                          |
  | `IndexBadge` 번호 · `MilestoneMarker` 기간 · `VsDivider` 글자 | 캔버스 바탕색           | 도형 선색 면 위에서 고른 글자색(배지·알약 색을 넘기면 그대로)                                                          |
  | `PyramidLayer` 층 이름                                        | 연결선·도형 선색        | `--bbangto-viz-on-shape-fill`(층 색을 넘기면 그 색으로 고른 글자색)                                                    |
  | `StatNumber` 증감                                             | 팔레트 p1·p6            | 같은 색이되, 가이드가 `on.ink` 를 적었거나 밑 면(새 `surface` prop, 기본 canvas.bg)에서 4.5:1 에 못 미치면 숫자 글자색 |

  쇼케이스(`makeVizShowcase`)의 안내 문단·섹션 제목도 캔버스 위 글자색이고, 안내 문단의 70% 투명도를 걷었다(darkluxe 4.45:1 해소).

  패턴 글자도 그 글자가 놓인 면으로 고른다. Funnel·Onion·Honeycomb·목록 번호·Cycle 허브는 그 칸의 글자색, BentoGrid 칸(90%)·
  GeoMap 지역 이름(55%)·SWOT 사분면(28%)·Venn 원 이름(32%)은 그 틴트 면으로 고른 색이다. Venn 겹친 자리 라벨은 바탕·원·겹친
  면 어디서나 읽히는 색이고, GeoMap 핀 이름은 캔버스 색 칩 위에 놓인다. PosterEditorial 머리말은 팔레트 p1 대신 캔버스 위
  글자색이다.

### Patch Changes

- Updated dependencies [e91c759]
- Updated dependencies [12db5ac]
- Updated dependencies [ab632ea]
- Updated dependencies [09ce0ae]
  - @centurio1987/bbangto-ui-tokens@2.0.0
  - @centurio1987/bbangto-ui-visualization@2.0.0

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

### Patch Changes

- Updated dependencies [910cbb6]
- Updated dependencies [d51cf96]
- Updated dependencies [a1eca39]
- Updated dependencies [b1dc968]
  - @centurio1987/bbangto-ui-visualization@1.0.0
  - @centurio1987/bbangto-ui-tokens@1.5.0

## 0.3.2

### Patch Changes

- Updated dependencies [d881cf0]
- Updated dependencies [10e4a92]
  - @centurio1987/bbangto-ui-visualization@0.4.1
  - @centurio1987/bbangto-ui-tokens@1.4.0

## 0.3.1

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

- Updated dependencies [145f269]
- Updated dependencies [5af8e71]
  - @centurio1987/bbangto-ui-visualization@0.4.0

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

### Patch Changes

- Updated dependencies [727a4eb]
- Updated dependencies [649aaaa]
  - @centurio1987/bbangto-ui-visualization@0.3.0
  - @centurio1987/bbangto-ui-tokens@1.3.0

## 0.2.0

### Minor Changes

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

- b632c67: Visualization 스타일 가이드 카탈로그 6 → 30종 확장 (additive).

  기존 3종(Blueprint_Technical/Minimal_Line/Colorful_Flat) + 신규 발견 3종 위에 24종 추가:

  - **F 계열 신규 가이드**: Iso_ColorBlock · Marker_Sketchnote(hand-drawn) · Swiss_Systematic · Terminal_Ascii · Bauhaus_Geometric · Riso_Print · Hud_Telemetry(+코너 브래킷 wrapper).
  - **패밀리 통합 그룹**: `viz-print-ink`(Riso 리네임 + Halftone_Print + Glitch_Duotone) · `viz-soft-puffy`(Neumorphic + Clay_Playful + Kawaii_Pastel).
  - **P2 1:1 단일 12종**: Neobrutalist · Editorial_Data · Memphis_Pattern · Retro70s_Warm · Dopamine_Max · Bento_Stat · Synthwave · ArtDeco_Luxe · DarkLuxe · Organic_Blob · Ukiyoe_Flat · Pixel_Retro.

  전 가이드 팔레트 실측 대비 감사 통과(over-claim 0). 각각 별도 wrapper·2 colorway preset·게이트 색-스킴 불변식 준수. 기존 3종 export 무변경.

- 9b3fce2: ORD-009: 88장 사진별 재분류(style-classification.md)에서 새로 파악된 preset들을 카탈로그에 추가.

  - **신규 스타일 가이드 3종**
    - `Corporate_Schematic_01` — F2 Corporate_Schematic(24장 최대 패밀리). 흰 바탕·중립 헤어라인 1.25px·kind별 플랫 액센트 타일(브랜드 무관 중립 조정값)·대시 존 경계. colorway `default` + `slide-dark`(#1B1B3A 다크 그라운드).
    - `Ink_Line_Duotone_01` — F5 Ink_Line_Duotone(신규 발견 패밀리). 지터 없는 균일 1.75px 모노라인·블랙+블루 듀오톤·무채움(컨테이너만 라이트 틴트). colorway `default` + `slate`(그레이+퍼플).
    - `Neon_Gradient_Dark_01` — F7 Neon_Gradient_Dark(신규 분리 패밀리). 다크 그라운드·wrapper 레벨 `<defs><linearGradient>` 그라디언트 채움(CSS var stop-color로 colorway 연동)·흰 헤어라인 엣지·절제된 글로우·외부 라벨 규칙. colorway `default` + `aurora`(네온 그린/다크 네이비).
  - **기존 가이드 foundation preset 보강**
    - `Minimal_Line_01`에 `editorial` preset — F1 최빈 서브모드(크림 그라운드 + 솔리드 레드 #E8321F 그래픽 블록 액센트).
    - `Colorful_Flat_01`에 `bento-dark` preset — 블랙 그라운드 + 피치/오렌지 램프(infographic_colorful_05).
  - `makeVizColorway`에 `edge.stroke` 색 override 추가(잉크≠엣지색 듀오톤 지원, 색 전용 불변식 유지).

### Patch Changes

- Updated dependencies [3449f78]
- Updated dependencies [c7fa242]
- Updated dependencies [3e2473c]
- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
- Updated dependencies [b632c67]
  - @centurio1987/bbangto-ui-visualization@0.2.0
  - @centurio1987/bbangto-ui-tokens@1.2.0
