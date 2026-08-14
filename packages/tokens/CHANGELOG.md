# @centurio1987/bbangto-ui-tokens

## 1.3.0

### Minor Changes

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

## 1.2.0

### Minor Changes

- b632c67: 채택 메타데이터 통제 어휘 + WCAG 대비 유틸 신규 export (additive).

  - **메타데이터 어휘/타입**: `StyleGuideMeta`·`FoundationMeta` 타입과 통제 어휘 `STYLE_FAMILIES`·`STYLE_FAMILY_LABELS`·`DOMAINS`·`TAGS`를 `styleGuideMeta`/`foundationMeta`에서 신규 export. UI·viz·foundation 카탈로그가 공유하는 채택 메타 SSOT.
  - **WCAG contrast 유틸**(`contrast`): `contrastRatio`·`relativeLuminance`·`parseColor`·`extractColors`·`compositeOver`·`CONTRAST_THRESHOLDS`·`effectiveBgColors` + 타입 `RGBA`. 팔레트 토큰 실측 대비 계산의 범용 순수 수학(카탈로그 accessibility 감사가 소비).

  모두 신규 export라 하위호환. 기존 소비처 무변경 동작.

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

## 1.1.0

### Minor Changes

- 7db914f: 색 스킴 기호선택(foundation preset) 인프라 추가 — 모티프(래퍼 CSS·shape)는 공유하고 foundation 색만 갈아끼우는 구조.

  - **tokens**: `FoundationPreset` 타입 신규 export + `StyleGuideTokens`에 `foundationPresets` / `defaultFoundationKey` 선택 필드 추가.
  - **core**: `resolveFoundationPreset(sg, key)` 순수함수 신규 export + `StyleGuideProvider`에 `foundationKey` prop(및 `data-bbangto-foundation` 속성) 추가. 미지정/미매칭 시 defaultFoundationKey → 첫 preset → base foundations 순 fallback.

  모두 선택 필드/prop이라 하위호환된다(기존 소비처 무변경 동작).

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

## 0.3.0

### Minor Changes

- 패키지 리네이밍 + 테마 통합

  모든 패키지에 `bbangto-ui-` 접두사 추가 및 5개로 분리됐던 테마 패키지를 단일 패키지로 통합.

  - `@centurio1987/core` → `@centurio1987/bbangto-ui-core`
  - `@centurio1987/tokens` → `@centurio1987/bbangto-ui-tokens`
  - `@centurio1987/hooks` → `@centurio1987/bbangto-ui-hooks`
  - `@centurio1987/diagram` → `@centurio1987/bbangto-ui-diagram`
  - `theme-light` + `theme-dark` + `theme-high-contrast` + `theme-amber` + `themes-external` → `@centurio1987/bbangto-ui-themes` (빌트인 5종 + 브랜드 프리셋 74종)
