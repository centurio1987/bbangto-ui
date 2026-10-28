# @centurio1987/bbangto-ui-visualization-style-guide-catalog

headless 시각화 시스템 위에 얹는 **시각화 스타일 가이드 30종**(blueprint·swiss·synthwave·riso …).

```tsx
import { vizStyleGuideCatalog, blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { VisualizationStyleGuideProvider, Flowchart } from '@centurio1987/bbangto-ui-visualization';

<VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide}>
  <Flowchart data={…} />
</VisualizationStyleGuideProvider>
```

## 이 패키지는 **paint 축**이다

각 가이드의 `visualMotif.example` 쇼케이스는 **색·서체·선을 비교하기 위한 데모**라 유형을 몇 종만 그린다.
**그릴 수 있는 그림의 목록이 아니다** — 유형은 87종이고 정본은
`@centurio1987/bbangto-ui-visualization`의 `type.manifest.json` / `selectVizTypes()`다.

| 축 | 패키지 | 정본 |
| -- | ------ | ---- |
| 유형(what) | `…-visualization` | `type.manifest.json` (87) |
| 스타일(paint) | 이 패키지 | `catalog.manifest.json` (30) |

정적 렌더(`renderToStaticMarkup`)에서는 preset 래퍼가 런타임에 넣는 모티프 시트가 빠진다. `vizMotifStylesOf(vizStyleGuide)` 가 그 시트를 `{ id, css }` 로 낸다(모티프가 있는 18종) — 쓰는 법은 `@centurio1987/bbangto-ui-visualization` README 의 「정적 렌더」.

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
