---
'@centurio1987/bbangto-ui-tokens': minor
'@centurio1987/bbangto-ui-visualization': minor
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': minor
---

가이드가 바라는 글자색 `on.ink` 를 더하고, 지침 문장이 글자색을 이름으로 정한 가이드 7개에 적는다(KAN-075).

### tokens · visualization — `on.ink`

`VisualizationFoundation['on']` 에 선택 칸 `ink` 를 더했다. 면 위 글자색을 계산할 때 이 색을 가이드 글자색 넷
(`edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg`)보다 먼저 보고, 면 위에서 4.5:1 을 넘으면
(반투명 면은 음영을 얹은 면까지 모두에서) 그 색을 쓴다. 못 넘으면 지금처럼 계산 후보로 넘어간다. 면마다 적은 `on` 값은
여전히 `on.ink` 보다 먼저다. 적지 않은 가이드의 글자색은 그대로다.

### catalog — 바뀐 그림

지침 문장은 「라벨은 크림」인데 연결선 색(골드·네온·시안)이 먼저 뽑혀 칠해지던 가이드의 글자색이 문장대로 바뀐다.
노드·C4·팔레트·도형·캔버스 면 중 그 색이 4.5:1 을 넘는 133면이다.

| 가이드 | 색 묶음 | 글자색 | 전에 칠해지던 색 |
| --- | --- | --- | --- |
| artdeco-luxe-01 | default · emerald | 크림 `#EFE6D0` | 골드 |
| darkluxe-01 | default · oxblood | 웜 크림 `#EDE3CE` | 골드(oxblood 노드·C4 는 이미 크림) |
| synthwave-01 | default · sunset | 니어화이트 `#F2ECFF` | 시안 · 오렌지 |
| hud-telemetry-01 | default · amber | 순백 `#FFFFFF` | 시안 · 앰버 |
| riso-print-01 | default · teal | 다크 잉크 `#182234` | 스팟 블루 · 틸 |
| colorful-flat-01 | bento-dark | 다크 브라운 `#241505` | `#121212` |
| bauhaus-geometric-01 | default | 파랑 위 흰색 | 크림 |

darkluxe oxblood 가 노드·C4 면마다 적던 `on` 덮어쓰기는 `on.ink` 로 옮겼다. bauhaus bold 는 default 의 `on.ink` 를
물려받지만 그림은 그대로다. 가이드 문장과 칠해지는 글자색은 카탈로그 시험(`textInk.test.ts`)이 함께 본다.
