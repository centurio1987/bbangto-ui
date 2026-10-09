---
card: KAN-057-CCH3E8
title: viz edge.dashPattern 토큰 정리 — 선언만 있고 읽히지 않는 커넥터 대시 토큰을 잇거나 걷기
created: 2026-10-09
scope: packages/visualization/src/provider/contractCss.ts, packages/visualization/src/atoms/Edge.tsx, packages/visualization/src/tokens/contract.ts, packages/tokens/src/visualization.ts, packages/visualization/style-classification.md, apps/storybook/src/stories/visualization/Headless.stories.tsx, .changeset/kan-057-edge-dash-token.md
---

# KAN-057-CCH3E8 — viz edge.dashPattern 토큰 정리 — 선언만 있고 읽히지 않는 커넥터 대시 토큰을 잇거나 걷기

## 전략
**잇는다.** 걷지 않는다. `packages/visualization/style-classification.md` 횡단 규칙 3 이 「선 모양을 토큰과 prop 양쪽에서 바꿀 수 있게 하고, 스타일 가이드가 기본값을 정하고 개별 prop 이 덮어쓴다」고 이미 정해 두었다. 걷으면 그 규칙을 거꾸로 고쳐 써야 하고, 잇는 쪽은 규칙이 말한 상태를 코드가 따라가는 일이다.

착수 전 확인한 사실(2026-10-09, main `9f187fc` 기준):

- 카탈로그 스타일 가이드 30개와 base foundation 모두 `edge.dashPattern` 이 `''`(실선)이다. 그래서 잇더라도 지금 있는 가이드의 그림은 하나도 안 바뀐다. 바뀌는 것은 「가이드가 대시를 정하면 연결선이 따라간다」는 길이 생기는 것뿐이다.
- 계약 스타일시트의 엣지 규칙(`[data-bbangto-viz-edge]`)에 그대로 붙이면 안 된다. 그 속성은 `Edge` 연결선만이 아니라 축(`Axis`)·눈금·상자수염 그림의 수염·레이더 바퀴살·게이지 눈금·사람 모양 아이콘의 팔다리 같은 구조선 19개 파일에도 붙어 있다. 가이드가 대시를 정하면 축까지 점선이 된다.
- 그래서 `Edge` 가 내는 선에만 내부 훅 `data-viz-part="connector"` 를 하나 더 달고, 계약 스타일시트가 그 훅에만 `stroke-dasharray` 를 묶는다. `data-viz-part="shape"` 와 같은 갈래(계약 스타일시트만 쓰는 내부 훅)다. 엣지 paint 채널(stroke·width)은 그대로라 「paint 채널을 늘리지 않는다」 규약과 부딪히지 않는다.
- `Edge` 는 지금처럼 명시한 `strokeDasharray` prop 만 인라인 style 로 낸다. 인라인이 스타일시트를 이기므로 「개별 prop 이 덮어쓴다」가 따로 손대지 않아도 선다. 기본값을 인라인 `var()` 로 넣는 길은 버렸다 — 그러면 소비자의 스타일시트가 기본값을 못 덮는다.
- 빈 문자열이 문제다. Provider 는 토큰을 React `style` 의 CSS 변수로 넣는데, 값이 `''` 이면 그 변수 선언이 아예 빠질 것으로 본다(확인 안 함 — S1 의 중첩 Provider 테스트가 확인한다). 빠지면 바깥 Provider 의 대시 값이 안쪽으로 상속돼, 실선 가이드 안의 연결선이 점선이 된다. 그래서 viz 의 `visualizationFoundationToStyleObject` 가 `*-dash-pattern` 키의 `''` 를 `none` 으로 바꿔 넣는다. 경계(`boundary.dashPattern`)도 같은 이름 규칙에 걸리지만 그 토큰은 지금 아무도 안 읽으므로 그림은 안 바뀐다.

이 카드 밖으로 둔 것:

- `packages/visualization/README.md` 의 구현 규약 절(내부 훅 목록). KAN-067 의 scope 라 손대면 루트 독립성이 깨진다. 내부 훅이라 공개 계약은 안 바뀌고, 설명은 토큰 JSDoc 과 `contractCss.ts` 주석에 둔다.
- `Edge` 를 안 쓰고 직접 선을 그리는 템플릿의 연결선(SitemapTree·IsometricScene·WorkBreakdownStructure 등). 라우팅·화살촉 prop 도 받지 않는 선이라 규칙 3 의 「연결선 축」 밖이다.
- 선언만 되고 읽히지 않는 viz 토큰 나머지. 착수 중 훑어보니 `edge.dashPattern` 말고도 `boundary.dashPattern`·`boundary.width`·`boundary.radius`(카탈로그 29개가 기본과 다른 값을 넣는데 그림에 안 나온다), `c4.*` 9개, `typography.sizes.*` 4개, `spacing.*`·`motion.*`·`edge.marker.size`·`node.*.tagColor`·`canvas.gridUnit`·`iconStyle`·`typography.titleWeight` 가 있다. 별도 카드 후보로 유저에게 올린다.

## 실행 계획
- [x] `S1` 실패하는 테스트 먼저 — `Headless.stories.tsx` 에 play 함수 넷: ① 가이드의 `edge.dashPattern` 이 `Edge` 선에 반영된다 ② `strokeDasharray` prop 이 가이드 값을 이긴다 ③ 같은 가이드 아래 축·구조선(`data-bbangto-viz-edge` 만 단 선)은 실선 그대로다 ④ 대시 가이드 안에 실선 가이드를 겹쳐도 안쪽 연결선은 실선이다. 완료 기준: `pnpm test` 에서 ①·④ 가 빨강이고(②·③ 은 지금도 초록일 수 있다 — 회귀 방지용), 다른 스토리는 그대로 초록.
- [x] `S2` 구현 — `Edge.tsx` 에 `data-viz-part="connector"`, `contractCss.ts` 에 그 훅의 `stroke-dasharray: var(--bbangto-viz-edge-dash-pattern)`, `tokens/contract.ts` 에 `*-dash-pattern` 빈 값 → `none`. 완료 기준: S1 넷이 초록, 다른 스토리 초록.
- [ ] `S3` 문서 — `packages/tokens/src/visualization.ts` 의 `edge.dashPattern` JSDoc(빈 값=실선, prop 이 이김, 연결선에만), `style-classification.md` 횡단 규칙 3 상태 문장, changeset(`@centurio1987/bbangto-ui-visualization` patch · `@centurio1987/bbangto-ui-tokens` patch). 완료 기준: 「계약 스타일시트도 `Edge` 도 읽지 않아」 문장이 저장소에 0건, changeset 파일이 있다.
- [ ] `S4` 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`. 완료 기준: 다섯 다 초록.

## 검증
아래를 저장소 루트에서 `bash -c` 로 돌려 모두 통과하면 끝이다.

1. `pnpm test` — `VISUALIZATION/Headless` 의 대시 스토리 넷이 chromium 에서 초록. 계산된 `stroke-dasharray` 로 잰다: 가이드 대시 `4 4` → `4px, 4px`, prop `2 2` → `2px, 2px`, 구조선과 중첩 실선 가이드 → `none`.
2. `grep -rn "계약 스타일시트도 \`Edge\` 도 읽지 않아" packages` — 0건.
3. `git diff main --stat -- packages/visualization-style-guide-catalog` — 0건(카탈로그 값은 안 고친다. 지금 그림이 안 바뀐다는 근거).
4. 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 모두 초록.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-09T22:53 · s:6b95cb93 — `전략` 섹션 교체
- 2026-10-09T22:53 · s:6b95cb93 — `실행 계획` 섹션 교체
- 2026-10-09T22:53 · s:6b95cb93 — `검증` 섹션 교체
- 2026-10-10T00:16 · s:6b95cb93 · S1 doing — 착수
- 2026-10-10T00:18 · s:6b95cb93 · S1 done — Headless.stories.tsx 에 대시 스토리 넷(EdgeDashFromStyleGuide·EdgeDashPropOverridesStyleGuide·EdgeDashSkipsStructuralLines·EdgeDashNestedSolidGuide). 이 파일만 돌린 결과 ①·④ 빨강(none ≠ 4px, 4px), ②·③·기존 넷 초록. ④는 바깥 대시 연결선도 함께 재므로 S2 전 빨강 — 정규화가 필요한지는 S2 에서 규칙만 넣고 ④ 안쪽을 다시 재어 정한다(계획 리스크 1행의 확인 시점을 S2 중간으로 옮김)
- 2026-10-10T00:18 · s:6b95cb93 · S2 doing — 착수
- 2026-10-10T00:19 · s:6b95cb93 · S2 done — Edge 선에 data-viz-part="connector", contractCss 에 [data-bbangto-viz-style-guide] [data-viz-part="connector"] { stroke-dasharray: var(--bbangto-viz-edge-dash-pattern) }. 규칙만 넣었을 때 ④ 안쪽이 4px, 4px 로 새는 것을 확인(React 가 빈 변수를 지움)하고 contract.ts 에서 *-dash-pattern 의 '' 를 none 으로 낸다. Headless 8개·Provider 4개 초록, viz tsc 오류 0
