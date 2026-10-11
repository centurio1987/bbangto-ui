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

### visualization — 템플릿·부품의 글자색

템플릿·패턴·부품이 도형·연결선 색을 글자에 바로 칠하던 곳을 그 글자가 놓인 면의 글자색으로 바꿨다. 그래서 위 가이드들의
차트 글자(축 눈금·막대 값·패턴 라벨·연결선 라벨 등)도 문장의 색이 된다. `on.ink` 가 없는 가이드는 대부분 그대로이고,
도형 선색과 캔버스 위 계산값이 다른 ink-line-duotone(검정 → 흐름선 파랑)·iso-color-block(`#2B3138` → `#3A4149`)의 글자가
바뀐다. 팔레트 틴트 안 제목(Iceberg·BusinessModelCanvas·Kruchten4Plus1View·ViewpointFrame)은 그 틴트 면으로 고른다.
`PosterEditorial` 부제는 흐리게(opacity) 쓰지 않는다.

부품 기본 글자색이 바뀌었다. 직접 쓰는 쪽에서 보인다.

| 부품 | 전 | 후 |
| --- | --- | --- |
| `Axis` 눈금 글자 · `Tag` · `StatNumber` | 연결선·도형 선색 | `--bbangto-viz-on-canvas-bg` |
| `EdgeLabel` · `Lifeline` · `StateNode` · `EntityTable` 머리 | 연결선 색 | 바탕을 넘기지 않으면 `--bbangto-viz-on-canvas-bg`, 넘기면 그대로 연결선 색 |
| `StatCard` 숫자 · 라벨 | 도형 선색 · 경계 라벨색 | `--bbangto-viz-on-shape-fill` |
| `IndexBadge` 번호 · `MilestoneMarker` 기간 · `VsDivider` 글자 | 캔버스 바탕색 | 도형 선색 면 위에서 고른 글자색(배지·알약 색을 넘기면 그대로) |
| `PyramidLayer` 층 이름 | 연결선·도형 선색 | `--bbangto-viz-on-shape-fill`(층 색을 넘기면 그 색으로 고른 글자색) |
| `StatNumber` 증감 | 팔레트 p1·p6 | 같은 색이되, 가이드가 `on.ink` 를 적었거나 밑 면(새 `surface` prop, 기본 canvas.bg)에서 4.5:1 에 못 미치면 숫자 글자색 |

쇼케이스(`makeVizShowcase`)의 안내 문단·섹션 제목도 캔버스 위 글자색이고, 안내 문단의 70% 투명도를 걷었다(darkluxe 4.45:1 해소).

패턴 글자도 그 글자가 놓인 면으로 고른다. Funnel·Onion·Honeycomb·목록 번호·Cycle 허브는 그 칸의 글자색, BentoGrid 칸(90%)·
GeoMap 지역 이름(55%)·SWOT 사분면(28%)·Venn 원 이름(32%)은 그 틴트 면으로 고른 색이다. Venn 겹친 자리 라벨은 바탕·원·겹친
면 어디서나 읽히는 색이고, GeoMap 핀 이름은 캔버스 색 칩 위에 놓인다. PosterEditorial 머리말은 팔레트 p1 대신 캔버스 위
글자색이다.

