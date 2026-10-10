---
'@centurio1987/bbangto-ui-tokens': major
'@centurio1987/bbangto-ui-visualization': major
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': major
---

스타일 가이드 토큰 중 그림에 쓰이지 않던 것을 잇거나 지운다(KAN-069).

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

| 지운 필드 | 대신 |
| --- | --- |
| `node.<kind>.tagColor` | 노드 글자색은 면마다 계산된다(`--bbangto-viz-on-node-<kind>-fill`). 정하려면 `on.node.<kind>.fill` |
| `c4.l1~l3.labelColor` | C4 글자색도 면마다 계산된다(`--bbangto-viz-on-c4-l1-bg-tint` 등). 정하려면 `on.c4.l1.bgTint` 등 |
| `node.<kind>.glyph` · `node.external.dashed` | 없다. 아이콘과 외부 노드 대시는 의미 노드 컴포넌트가 종류마다 정한다 |
| `typography.titleWeight` · `typography.sizes.*` | 없다. 글자 크기와 굵기는 템플릿이 정한다 |
| `iconStyle` · `spacing.*` · `motion.*` | 없다 |

### 카탈로그

- 가이드 30개에서 위 필드를 지웠다. `makeVizColorway` 의 `tagColor`·`c4LabelColor` 선택지도 지웠다.
- `auditVizContrast` 가 노드·C4 자리에서 실제로 칠하는 글자색(`--bbangto-viz-on-*`)을 잰다. 전에는 칠하지 않는
  `tagColor`·`labelColor` 를 쟀다.
- 그 결과 `darkluxe-01` 의 `oxblood` preset 이 걸렸다. 노드·C4 글자(계산값 뮤트 골드)가 5.87~6.75:1 로 aaa 선언(7:1)에
  못 미쳤다. `on` 으로 크림(`#EDE3CE`, 13:1 이상)을 정해 그 preset 의 노드·C4 글자색이 바뀐다.
- 가이드 지침 문장의 라벨 서술을 실제 글자색에 맞췄다.
