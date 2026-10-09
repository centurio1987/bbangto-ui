# @centurio1987/bbangto-ui-visualization

Headless 시각화 디자인 시스템 — 다이어그램 / 인포그래픽 **87종**을 React 컴포넌트로 낸다.
페인트(색·서체·선)는 토큰으로 분리돼 있어, 같은 그림을 스타일 가이드만 바꿔 다시 칠할 수 있다.

## 30초 요약

```bash
npm i @centurio1987/bbangto-ui-visualization
```

```tsx
import { Canvas, Flowchart } from '@centurio1987/bbangto-ui-visualization';
```

**이름만 보고 고르지 말 것.** 이 패키지의 핵심은 컴포넌트 목록이 아니라 **"언제 무엇을 쓰는가"가
기계가독 형태로 저작돼 있다**는 점이다. 87종 각각에 `useWhen`·`avoidWhen`·`dataShape`·`structuralTraits`가 붙어 있다.

## 유형 고르는 순서

1. **좁힌다** — `dataShape`(가진 데이터가 무엇인가) + `structuralTraits`(그 데이터의 구조가 무엇인가)
2. **확정한다** — 후보의 `useWhen` / `avoidWhen`을 읽는다

```ts
import { selectVizTypes, vizTypeRegistry } from '@centurio1987/bbangto-ui-visualization/type-meta';

selectVizTypes(vizTypeRegistry, {
  dataShape: ['process'],           // 절차 데이터
  structuralTraits: ['branching'],  // 조건에 따라 갈린다
  match: 'all',                     // 지정한 축을 전부 만족하는 것만
  explain: true,
});
// → VT-201 Flowchart · VT-106 UML Activity · VT-122 BPMN … (ProcessSteps는 분기가 없어 탈락)
```

`match: 'all'`이 빈 배열을 주면 **"그런 유형은 없다"가 답이다.** 축을 줄여 다시 묻는다.

> `match`를 생략하면 기본값 `'any'`(soft-weighted)다. `'any'`는 후보가 탈락하지 않는 대신
> **criterion을 더할수록 정답이 아래로 내려갈 수 있다** — 구체적으로 묻는 중이라면 `'all'`을 쓴다.

### 두 축은 직교한다

| 축 | 무엇을 말하나 | 예 |
| -- | ------------- | -- |
| `dataShape` (16종) | 가진 **데이터**의 성격 | `process` · `hierarchy` · `magnitude` · `temporal` … |
| `structuralTraits` (8종) | 그 데이터의 **구조** | `branching` · `sequential` · `cyclic` · `nested` · `relational` · `cross-axis` · `paired` · `quantitative` |

Flowchart(VT-201)와 Process Steps(VT-202)는 `dataShape`가 똑같이 `['process']`다.
둘을 가르는 것은 `branching`뿐이다 — 분기가 있는 파이프라인을 직선 스텝으로 그리는 사고가 여기서 갈린다.

## 정본은 셋, 전부 같은 데이터다

| 경로 | 언제 쓰나 |
| ---- | --------- |
| `.../type-meta`의 `vizTypeRegistry` | 코드에서 질의할 때(**코드 SSOT**) |
| `type.manifest.json` (패키지 동봉, 87 엔트리) | 파일 하나로 통째로 읽을 때 |
| 각 컴포넌트 선언 위 JSDoc `@vizType`/`@useWhen`/`@avoidWhen` | IDE 툴팁·`d.ts`를 읽을 때 |

셋은 `vizTypeRegistry`에서 생성·투영된 것이라 어긋나지 않는다(생성기 + 최신성 테스트가 강제).

## 한 컴포넌트가 여러 유형을 겸할 때

`Statistics`·`Cycle`·`Hierarchy`는 `mode` prop에 따라 다른 유형을 그린다.
**이름으로 조회하면 기본 렌더가 아닌 유형이 먼저 잡힐 수 있다** — 기본값은 따로 물어야 한다.

```ts
import {
  vizTypesForExport, defaultVizTypeForExport, vizTypeForVariant, vizTypeRegistry,
} from '@centurio1987/bbangto-ui-visualization/type-meta';

vizTypesForExport(vizTypeRegistry, 'Statistics');        // [VT-513 Waffle, VT-514 Isotype, VT-601 Statistical Infographic]
defaultVizTypeForExport(vizTypeRegistry, 'Statistics');  // VT-601 — prop 없이 렌더하면 나오는 그림
vizTypeForVariant(vizTypeRegistry, 'Statistics', 'waffle'); // VT-513
```

매니페스트의 `variants`는 `{ prop, value, isDefault? }` 꼴이라 **값을 어느 prop에 넣을지**까지 담는다.

## 매니페스트 스키마

```jsonc
{
  "id": "VT-202",
  "name": "Process Steps",
  "kind": "pattern",                       // 'template' | 'pattern'
  "exportNames": ["ProcessSteps"],
  "variants": [ /* { prop, value, isDefault? } — 있을 때만 */ ],
  "metaStatus": "authored",                // 전량 authored (pending 0)
  "completeness": { "exportCount": 1, "hasVariant": false, "useWhenCount": 2, "primitiveCount": 3 },
  "meta": {
    "category": "process-flow",            // A~G 7대역
    "summary": "순차 스텝 체인(배지+커넥터)",
    "dataShape": ["process"],
    "structuralTraits": ["sequential"],
    "primitives": ["node", "leader", "grid"],
    "aliases": [], "tags": ["infographic"],
    "useWhen": ["튜토리얼/워크플로를 순서대로 안내할 때", "…"],
    "avoidWhen": ["조건 분기가 있으면 Flowchart(VT-201) 사용", "…"],
    "related": ["VT-201"]
  }
}
```

`id` 체계: `VT-1xx` 엔지니어링 · `2xx` 프로세스 · `3xx` 계층/관계 · `4xx` 시간축 ·
`5xx` 데이터 차트 · `6xx` 인포그래픽/에디토리얼 · `7xx` 개념 프레임워크.

> 인벤토리 문서에는 VT 행이 **90개**지만 레지스트리·매니페스트는 **87개**다. 차이 3은
> 제품 범위 밖으로 판정된 행(VT-520 Data Table · VT-610 Infographic Resume · VT-611 Scrollytelling)이고,
> 이들은 컴포넌트가 없다. 누락이 아니라 의도적 제외다 — 사유는 `visualization-type-inventory.md`에 행별로 적혀 있다.

## 스타일(paint) 축은 별개다

`@centurio1987/bbangto-ui-visualization-style-guide-catalog`가 30종 스타일 가이드를 낸다.
그쪽 쇼케이스는 **페인트 비교용 데모**라 유형을 셋만 그린다 — 그릴 수 있는 그림의 목록이 아니다.

```tsx
import { VisualizationStyleGuideProvider } from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';

<VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide}>
  <Flowchart data={…} />
</VisualizationStyleGuideProvider>
```

Provider는 기본으로 JetBrains Mono를 Google Fonts에서 불러온다. 글꼴을 직접 호스팅하거나 CSP로
외부 요청을 막는 앱은 `fonts="none"`으로 끈다. 글꼴은 `document.head`에 한 번만 들어가므로
(`#bbangto-font-jetbrains-mono`) core Provider 안에 겹쳐도 요청이 두 번 나가지 않는다.
외부 요청을 0건으로 만들려면 문서 안의 Provider 전부에 `fonts="none"`을 준다. SSR HTML에는 `@import`가
들어가지 않고 화면이 켜진 뒤에 불러온다.

## 구현 규약 (구 PLAN §C-2)

새 유형을 더하거나 컴포넌트를 고칠 때 지키는 규약이다. 소비자에게는 공개 계약이기도 하다 —
어떤 props 가 오고, 무엇을 지원하지 않는지가 여기서 정해진다.

### 구조

- **geometry 는 컴포넌트에, paint 는 스타일 레이어에.** 컴포넌트는 리터럴 색 대신 시맨틱 data 속성
  (`data-viz-part="shape"` · `data-bbangto-viz-edge` · `data-bbangto-viz-pattern` …)을 낸다.
  `src/provider/contractCss.ts` 의 계약 스타일시트가 그 속성을 `--bbangto-viz-*` 토큰에 묶는다.
  예외는 면 위에 반투명 검정을 얹는 음영·틴트(`Node` cube 면, `IsoPrism`, `IsometricScene` 바닥 그림자, `Lane`,
  `KanbanBoard` 열 바탕, `RequirementDiagram` 머리 띠)뿐이다 — 어떤 스타일 가이드 위에서도 같은 명암을 내는 장치라
  토큰을 따르지 않는다. Storybook `VISUALIZATION/Templates/Paint Gate`
  (`apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx`)가 이 규약을 검사한다. 검사는
  `_paintGateFixtures.tsx` 의 표본(fixture)을 그리고, `src/templates/index.ts` 가 내보내는 템플릿마다 표본이 하나씩
  있어야 한다. 새 템플릿을 내보내고 표본을 더하지 않으면 `test:unit` 에서
  `packages/foundations/src/vizPaintGateCoverage.test.ts` 가 그 템플릿 이름으로 실패한다.
- **명시한 prop 이 이긴다.** 사용자가 준 `fill`·`stroke` 는 인라인 `style` 로 렌더된다. SVG presentation
  attribute 는 author stylesheet 에 지기 때문이다. attribute 안의 `var()` 는 색·글꼴 속성(`fill`·`stroke`·
  `font-family`)에서는 풀린다 — 2026-10-08 Playwright 1.61.0 의 chromium 149 · firefox 151 · webkit 26.5 에서
  확인했고, 출시판 Safari 와 옛 판 브라우저는 확인하지 않았다. `transform` 속성 안의 `var()` 는 세 브라우저 모두
  풀지 않으므로 쓰지 않는다.
- **토큰 계층**: `VisualizationFoundation`(tokens 패키지) → `vvar()` 가 만드는 `var(--bbangto-viz-…)` →
  `VisualizationStyleGuideProvider` 가 CSS 변수를 주입한다. Provider 밖에서는 무채색 `baseVisualizationFoundation` 으로 떨어진다.
- **스타일 가이드는 core 와 같은 모양이고 core 에 기대지 않는다.** `VisualizationStyleGuide` 는 core `StyleGuide` 의
  구조를 로컬로 다시 선언했다. 이 패키지의 런타임 의존은 `@centurio1987/bbangto-ui-tokens` 하나다.
- **레이어**: `atoms/` → `molecules/` → `patterns/` · `templates/`(다이어그램·인포그래픽 유형). 배치 계산은 `geometry/` 의 순수 함수다.
- **마커 id 가 겹치지 않는다.** `Canvas` 가 `useId` 로 캔버스마다 마커 id 를 따로 만든다. defs 가 더 필요하면
  Provider 의 `useVizDefsPrefix()` 를 쓴다.
- **렌더 중에 DOM 을 재지 않는다.** 글자 폭은 `geometry/text.ts` 의 `estimateWidth` 로 추정하고
  `getComputedTextLength` 는 쓰지 않는다 — 그래서 서버 렌더와 브라우저 렌더의 결과가 같다.
- **모션 줄이기를 따른다.** `prefers-reduced-motion: reduce` 면 스타일 가이드 범위 안의 애니메이션·전환을 사실상 끈다.
  꼭 남겨야 하는 움직임에만 `data-bbangto-viz-animate="essential"` 을 붙인다(`src/provider/defs.ts`).

### 작성 모델

- **노드-엣지 유형은 좌표를 호출자가 준다.** Flowchart·C4·UML 처럼 노드와 엣지로 그리는 유형에는 자동 레이아웃
  엔진이 없다 — `data.nodes` 의 `x`·`y`·`width`·`height` 를 그대로 그린다. 트리·트리맵·차트처럼 배치가 데이터에서
  정해지는 유형만 `geometry/` 의 순수 함수(`tidyTreeLayout`·`squarifyLayout` 등)로 위치를 계산한다.
  텍스트 DSL 파서와 mermaid·dagre·d3 의존은 없다.
- **표기 키트이지 검증기가 아니다.** BPMN·ArchiMate·SysML 같은 표준의 의미와 제약을 런타임에 검사하지 않는다.
- **`children` 과 `data`**: 둘 다 받고, `children` 이 있으면 `children` 만 그린다(둘을 섞지 않는다).
  `data` 항목은 `id` 가 필수다 — 자동 번호를 매기면 SSR 과 CSR 의 id 가 어긋난다.
- **`children` 모드의 노드 등록은 한 단계뿐이다.** `Canvas` 는 바로 아래 자식 엘리먼트의 props 에서
  `id`·`x`·`y`·`width`·`height` 를 읽어 엣지가 찾을 좌표로 등록한다. `<g>`·Fragment 처럼 다른 엘리먼트 안에 넣은 노드나
  그 다섯 값을 props 로 받지 않는 래퍼 컴포넌트는 등록되지 않는다. 그 id 를 가리키는 `Edge` 는 콘솔 경고만 내고
  그려지지 않는다(throw 하지 않는다). 그럴 때는 `Edge` 의 `from`/`to` 에 `{ x, y }` 를 직접 주거나 노드를 `Canvas` 바로 아래에 둔다.
- **`NodeLabel` 은 기본이 `wrap`(어절 단위 줄바꿈, `maxLines` 기본 3)이고 `truncate`(말줄임)를 고를 수 있다.**
  한 줄에 눌러 맞추는 `fit`(SVG `lengthAdjust`)은 폰트가 대체되면 글자가 찌그러지므로 직접 골라야만 켜진다.

### 공통 계약 (ORD-010 이후 유형 전부)

- **props 이름**: 주 입력 `data`, 대체 모드 `children`, 항목 배열 `items`/`series`, 항목 필드 `{ id, label, value, color? }`
  (`id` 는 필수 string), 값 포맷 `formatValue?: (n) => string`, 차트 도메인 `domain?: [min, max]`
  (없으면 데이터에서 계산하고 0 기준선을 넣는다).
- **data 속성은 두 갈래다.** 테스트·외부 셀렉터용 공개 훅은 `data-bbangto-viz-*`(`-bar`·`-point`·`-line`·`-axis`·`-tick`·
  `-band-edge`·`-pattern` …)이고, `data-viz-part="shape"` 는 계약 스타일시트만 쓰는 내부 훅이다.
- **paint 채널을 늘리지 않는다.** 계약 채널은 `shape`·`edge` 둘이다. 면을 갈라야 하는 유형은
  `vvar('palette', 'pN')` 인라인 fill 과 fill-opacity 상수로, 텍스트 위계는 `vvar('typography', …)` 로 낸다.
- **면 위 글자는 그 면의 `on-*` 글자색을 쓴다.** 기본 가이드에서 읽힌다고 다른 가이드에서도 읽히지는 않는다
  (synthwave 의 `palette.p2` 와 `edge.stroke` 는 둘 다 `#28E0F0`). 그래서 Provider 가 면 토큰(`palette.p1~p8`·`shape.fill`·
  `canvas.bg`·`c4.l1~l3.bgTint`·`node.<kind>.fill`)마다 그 위에 쓸 글자색을 `--bbangto-viz-on-*` 로 함께 낸다.
  `vvar('palette', 'p2')` 면 위 글자는 `vvar('on', 'palette', 'p2')` 를 쓴다. 값은 가이드 글자색 넷(`edge.stroke` →
  `shape.stroke` → `boundary.labelColor` → `canvas.bg`) 중 처음으로 면과 4.5:1 을 넘는 것이고, 없으면 검정·흰색 중 대비가
  큰 쪽이다. 반투명 면은 밑에 검정 음영이 깔려도 읽히는 쪽을 고른다. 가이드는 `foundations.on` 에 값을 직접 적어 계산값을
  덮을 수 있다. 데이터마다 투명도가 바뀌는 면(heatmap 칸 등)은 미리 계산할 수 없어 `useVizFoundation()` 과 같은 계산
  (`src/tokens/onInk.ts`)으로 칸마다 고른다. 글자를 흐리게(opacity) 쓰지 않는다 — 위계는 크기와 굵기로 낸다.
  Paint Gate 와 같은 파일의 `LabelContrastGate` 가 표본 전부를 카탈로그 가이드 전부에서 그려 글자 대비를 재고,
  기준 목록(`_labelContrastBaseline.ts`)은 비어 있다. 새 미달은 목록에 올리지 말고 고친다.
- **접근성**: 루트 `Canvas` 는 `role="img"`(`accessible="structured"` 면 `group`)와 `title`(선택 `desc`)을 갖는다.
  값은 항상 텍스트로 함께 적는다 — 그래픽만으로 값을 말하지 않는다. 노드 글리프·아이콘 배지 같은 장식은 `aria-hidden` 이다.
- **경계 입력**: 빈 데이터는 빈 캔버스다(throw 하지 않는다). 항목 하나도 그린다. `children`·`data` 를 함께 주면 `children` 이다.
- **지원 범위**: Sankey 는 비순환·좌→우·수동 노드 좌표. GitGraph merge 는 직선. Venn 은 2원 정밀 + 3원 대칭 근사.
  GeoMap 은 호출자가 준 region path 를 그린다(투영 없음, 고정 viewBox). 대량 데이터 최적화는 대상이 아니다.
- **테스트는 두 갈래다.** 순수 geometry 는 `src/**/*.test.ts` 의 vitest 단위 테스트로, 컴포넌트 렌더는 Storybook `play()` 로 본다.
  `play()` 에서는 텍스트 bbox·computed width 를 대조하지 않는다(실행마다 흔들린다) — geometry 가 낸 값과
  attribute 정수를 ±1 로 대조한다.

## 함께 들어 있는 문서

- `visualization-type-inventory.md` — 유형 축 인벤토리(VT 행 90, 사람용 SSOT)
- `TYPE_METADATA_STRATEGY.md` — 유형 메타 레이어 설계·저작 규약

저장소에만 있는 문서(npm 배포물에는 없다): `style-classification.md` — 88장 레퍼런스 기반 스타일 패밀리 분류와 횡단 구현 규칙,
`viz-style-expansion.md` — 88장 밖 스타일 확장 계획.

## 라이선스·저장소

[github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
