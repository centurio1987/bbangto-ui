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

## 함께 들어 있는 문서

- `visualization-type-inventory.md` — 유형 축 인벤토리(VT 행 90, 사람용 SSOT)
- `TYPE_METADATA_STRATEGY.md` — 유형 메타 레이어 설계·저작 규약
- `visualization-catalog.md` · `style-classification.md` — 컴포넌트/스타일 분류

## 라이선스·저장소

[github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
