---
'@centurio1987/bbangto-ui-tokens': minor
'@centurio1987/bbangto-ui-visualization': minor
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': patch
---

진한 면(도형 선 색 `shape.stroke` 로 칠한 면) 위 글자색을 낸다 — `--bbangto-viz-on-shape-stroke`(KAN-083).

- tokens — `VisualizationFoundation.on.shape.stroke`(선택). 가이드가 진한 면 위 글자색을 직접 적는 칸이다.
- visualization — `deriveOnInk` 가 `shape.stroke` 면의 글자색을 계산해 `--bbangto-viz-on-shape-stroke` 로 낸다. 면 위 글자는 `vvar('on', 'shape', 'stroke')` 를 쓴다. 계산 규칙은 다른 면과 같다(`on.ink` → 가이드 글자색 넷 → 검정 · 흰색, 4.5:1).
- visualization-style-guide-catalog — terminal-ascii · neon-gradient-dark 의 Node 래퍼가 넘겨받은 `fill` 을 따른다. 넘기지 않으면 지금처럼 무채움 · 그라디언트다. neon 은 node 종류 면(`vvar('node', kind, 'fill')` 이나 그 대표 hex)을 넘겨도 그라디언트다. 템플릿은 래퍼를 거치지 않고 쇼케이스는 node 대표색만 넘기므로 카탈로그 그림은 바뀌지 않는다.

Storybook `VISUALIZATION/Templates/Node Wrapper Fill Gate` 가 가이드 30종의 Node 래퍼에 fill · stroke 를 넘겨 계산값을 재고, 진한 면 글자의 대비를 preset 전부에서 잰다.
