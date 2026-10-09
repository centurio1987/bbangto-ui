---
card: KAN-061-K8V2HH
title: viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기
created: 2026-10-08
scope: apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx, apps/storybook/src/stories/visualization/_labelContrastBaseline.ts, packages/visualization/src/templates/**, packages/visualization/src/molecules/**, packages/visualization/src/atoms/NodeLabel.tsx, packages/visualization/src/tokens/contract.ts, packages/visualization/src/tokens/onInk.ts, packages/visualization/src/tokens/onInk.test.ts, packages/tokens/src/visualization.ts, packages/visualization-style-guide-catalog/src/onInk.test.ts, packages/visualization/README.md, .changeset/kan-061-*.md
---

# KAN-061-K8V2HH — viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기

## 전략
### 문제

KAN-063 이 글자 대비 검사(`LabelContrastGate`)를 표본 68개 전부로 넓힌 뒤, 기준 목록(`_labelContrastBaseline.ts`, 이미 알려진 미달을 적어 두고 더 나빠지지만 않게 막는 목록)은 1538곳이 됐다. 이 카드는 그 목록을 비운다.

2026-10-10 진단(가이드 30개 × 표본 68개, 글자마다 밑 면과 글자색이 어느 토큰에서 오는지 기록)에서 원인은 다섯으로 갈렸다.

| 원인 | 곳 | 대표 템플릿 |
| --- | --- | --- |
| 불투명 팔레트 면(p1~p6) 위 글자 | 1150 | wbs · treemap · packet · stacked-bar · archimate-viewpoint · mindmap · dmn |
| 흐리게 그린 보조 글자(opacity 0.6~0.8) | 181 | er-diagram 156 · quadrant 16 · data-lineage 9 |
| `shape.fill` 위 `edge.stroke` 글자(`NodeLabel` 기본값, `packages/visualization/src/atoms/NodeLabel.tsx:51`) | 95 | neon-gradient-dark 는 흰 글자가 `#29b6e8` 위에서 2.35:1 |
| Requirement 반투명 글자와 검정 6% 띠 | 64 | requirement |
| C4 면(`c4.l2.bgTint`·`node.person.fill`·`node.external.fill`) 위 `edge.stroke` 글자 | 48 | c4-container · c4-dynamic · c4-context |

가장 큰 덩어리는 팔레트 면이다. 가이드에 이미 있는 불투명 색 중 가장 대비가 큰 것을 골라도 298곳이 남는다. 가이드 21개의 중간 밝기 팔레트 색 26개에서는 가이드 안 어느 색도 4.5:1 에 닿지 않는다(예: colorful-flat `palette.p1` `#E8443B` 위에서 흰색 3.95 · 가이드 남색 3.73). 불투명한 면이면 검정이나 흰색 중 하나는 늘 4.5:1 을 넘는다.

### 접근 — 면마다 그 위에 쓸 글자색을 계산한다 (2026-10-10 유저 선택)

1. **면 토큰마다 글자색 하나를 정한다.** 후보는 가이드의 글자색 넷이고 순서는 `edge.stroke` → `shape.stroke` → `boundary.labelColor` → `canvas.bg` 다. 처음으로 4.5:1 을 넘는 후보를 쓰고, 넘는 것이 없으면 검정과 흰색 중 대비가 큰 쪽을 쓴다. 큰 글씨 기준(3:1)은 쓰지 않는다. 면 하나에 글자색 하나라서 글씨 크기를 알 수 없기 때문이다.
2. **대상 면**은 `palette.p1~p8`·`shape.fill`·`canvas.bg`·`c4.l1~l3.bgTint`·`node.<kind>.fill` 이다. 반투명 면은 `canvas.bg` 위에 합성한 색으로 재고, `transparent`·`none` 은 `canvas.bg` 로 본다.
3. **계산은 순수 함수 하나가 한다.** 자리는 `packages/visualization/src/tokens/onInk.ts` 이고 패키지 밖으로 내보내지 않는다. `visualizationFoundationToStyleObject`(`tokens/contract.ts`)가 결과를 `--bbangto-viz-on-*` CSS 변수로 함께 낸다. Provider 코드는 그대로 두고, 템플릿은 `vvar('on', 'palette', 'p1')` 처럼 쓴다.
4. **데이터마다 투명도가 바뀌는 면**(heatmap · choropleth · sankey · archimate 4종)은 미리 계산할 수 없다. 이런 템플릿은 `useVizFoundation()` 으로 값을 받아 같은 함수를 칸마다 부른다. `Edge.tsx:78` 이 이미 이 방식으로 foundation 값을 읽는다.
5. **흐린 보조 글자는 opacity 를 걷는다.** 글자색은 면에 맞춘 값을 쓰고, 위계는 크기와 굵기로 남긴다.
6. **tokens 패키지 `VisualizationFoundation` 에 선택 필드 `on` 을 더한다**(minor). 가이드가 직접 적은 값이 계산값을 이긴다. 가이드 파일 30개는 고치지 않는다.

### 제약

- **리터럴 검사(`LiteralPaintGate`)를 깨지 않는다.** 이 검사는 blueprint 가이드 A 와 그 색을 뒤집은 B 에서 같은 자리가 같은 색을 내면 실패한다. 계산 규칙을 미리 돌려 보니 A·B 의 면 19개(파싱되는 면 전부)에서 글자색이 모두 달랐다. 카탈로그 가이드 30개의 면 524개 중 검정·흰색으로 넘어가는 면은 34개(검정 21 · 흰색 13)다.
- **새 함수는 패키지 공개 API 에 넣지 않는다.** `packages/visualization/src/index.ts` 와 `tokens/index.ts` 는 고치지 않는다. 앞의 것은 KAN-064·KAN-067 범위다.
- **후보 글자색에 `node.*.tagColor`·`c4.*.labelColor` 는 넣지 않는다.** KAN-069(백로그, 읽히지 않는 viz 토큰 정리)가 그 토큰을 잇거나 걷기로 정해 두었다. 이 카드가 그것을 읽기 시작하면 KAN-069 의 결정이 이 카드에 묶인다. 다만 두 카드 모두 `packages/tokens/src/visualization.ts` 를 고치므로, KAN-069 가 scope 를 적으면 `dep-check` 가 겹침으로 잡는다.
- **`packages/visualization/README.md` 189~193번째 줄이 낡는다.** 「글자색 토큰은 그 뒤 면 토큰과 짝지어 대비를 재고 고른다」와 「이미 있는 미달은 기준 목록에 적혀 있다」를 `on-*` 변수 규칙으로 바꿔야 다음 템플릿도 같은 규칙을 따른다. 이 파일은 KAN-067 범위와 겹쳐 용인을 기록했다(아래 「정해진 것」).
- **지금 통과하는 글자도 색이 바뀔 수 있다.** 면마다 글자색을 하나로 맞추기 때문이다. 예를 들어 treemap 은 지금 `canvas.bg` 로 글자를 쓰는데, `edge.stroke` 가 4.5:1 을 넘는 면에서는 `edge.stroke` 로 바뀐다. 같은 팔레트 면이면 어느 템플릿에서나 같은 글자색이 나온다.

### 버린 대안

- **가이드 팔레트 색을 고친다.** 21개 가이드의 색 26개를 바꿔야 하고, 가이드 고유의 색감이 달라진다.
- **글자 뒤에 판을 깐다.** README 의 「paint 채널을 늘리지 않는다」(187번째 줄)에 어긋나고, 그림에 없던 상자가 생긴다.
- **템플릿마다 글자색을 손으로 고른다.** 가이드 30개마다 읽히는 색이 달라 템플릿 안에서 하나로 고를 수 없다. 이번 1538곳이 바로 그렇게 생겼다.
- **후보를 가이드의 불투명 색 전부로 넓힌다.** 검정·흰색으로 넘어가는 면이 조금 줄지만 팔레트 색 26개는 그래도 남는다. 대신 `node.*.tagColor` 같은 KAN-069 대상 토큰이 섞이고, 어떤 색이 글자로 쓰일지 가이드 저자가 예상할 수 없다.

### 정해진 것

- **풀이 방식은 「면에 맞춰 자동 계산」이다**(2026-10-10 유저 선택). 질문은 「팔레트 면 위 글자 298곳(중간 밝기 팔레트 색 26개)을 어떻게 풀까요?」였다.
- **KAN-063 직렬 기록**: KAN-063 완료 뒤 이 절을 다시 세웠다. 넓어진 기준 목록 1538곳을 원인별로 나눈 것이 위 진단 표다.
- **README 겹침은 용인한다**(2026-10-10 유저 선택, ai 기록). `packages/visualization/README.md` 를 scope 에 넣었다. 이 카드는 189~193번째 줄만 고치고, KAN-067 은 36·108번째 줄·203번째 줄 앞 새 절·203~208번째 줄을 고친다. 나중에 병합하는 쪽이 두 변경을 다 남긴다.
- **수행 방식은 단일 에이전트다**(2026-10-10 유저 선택). 배치 3개를 한 세션이 차례로 한다.

## 실행 계획
각 단계는 테스트를 먼저 빨갛게 만든 뒤 고친다. S3~S6 은 기준 목록에서 그 단계가 맡은 템플릿의 줄을 먼저 지워 `LabelContrastGate` 를 빨갛게 하고, 고쳐서 초록으로 돌린다. 곳 수는 2026-10-10 진단 기준이다.

- [x] `S1` 빨간 테스트 먼저 — 계산 함수 단위 테스트(`packages/visualization/src/tokens/onInk.test.ts`: 후보 순서, 검정·흰색 대체, 가이드 `on` 값 우선, 반투명·`transparent` 면)와 카탈로그 전수 테스트(`packages/visualization-style-guide-catalog/src/onInk.test.ts`: 가이드 30개 × 면 전부에서 `--bbangto-viz-on-*` 값이 면과 4.5:1 이상). 완료 기준: 두 테스트가 함수와 변수가 없어서 빨갛다.
- [x] `S2` 계산 함수와 CSS 변수 — `tokens/onInk.ts`, `visualizationFoundationToStyleObject` 가 `--bbangto-viz-on-*` 를 함께 낸다, tokens `VisualizationFoundation` 에 선택 필드 `on`(JSDoc 에 규칙). 완료 기준: S1 두 테스트 초록, `pnpm build`·`pnpm typecheck` 초록, `LiteralPaintGate` 초록.
- [x] `S3` 노드 글자 기본값 — `NodeLabel` 기본 글자색을 `on-shape-fill` 로 바꾸고, 같은 원인의 템플릿 21개(class-diagram · sysml-block · c4-code · kanban-board · bpmn 등)를 정리한다. 완료 기준: 그 템플릿의 기준 목록 줄 83곳이 빠지고 Paint Gate 두 검사 초록.
- [x] `S4` 흐린 보조 글자 — er-diagram · quadrant · data-lineage · requirement 의 글자 opacity 를 걷고 면에 맞춘 글자색을 쓴다. requirement 검정 6% 띠 위 글자는 합성한 색으로 고른다. 완료 기준: 네 템플릿의 기준 목록 줄 257곳이 빠지고 게이트 초록.
- [x] `S5` 불투명 팔레트 면 — wbs · treemap · packet · stacked-bar · archimate-viewpoint · mindmap · dmn · user-journey-gantt · fishbone 의 팔레트 면 위 글자를 `on-palette-*` 로. 완료 기준: 아홉 템플릿의 기준 목록 줄 960곳이 빠지고 게이트 초록.
- [ ] `S6` 투명도가 바뀌는 면과 C4 — heatmap · choropleth · sankey · archimate 4종은 칸마다 계산 함수로, C4 넷(context · container · dynamic · system-landscape)은 `C4Box`·`PersonNode`·`ExternalNode` 의 글자를 `on-c4-*`·`on-node-*` 로. 완료 기준: 열한 템플릿의 기준 목록 줄 238곳이 빠지고 게이트 초록.
- [ ] `S7` 기준 목록 닫기 — `_labelContrastBaseline.ts` 를 빈 목록으로 두고 머리 주석을 「새 미달은 목록에 올리지 말고 `on-*` 로 고친다」로 바꾼다. README 189~193번째 줄의 글자색 규칙과 기준 목록 설명을 `--bbangto-viz-on-*` 규칙으로 고친다. 완료 기준: `LABEL_CONTRAST_BASELINE` 0개, 게이트 초록.
- [ ] `S8` 마무리 — changeset(tokens minor · visualization minor), 품질 게이트 5종. 완료 기준: 게이트 5종 초록.

## 검증
- `pnpm --filter storybook exec vitest run --project storybook src/stories/visualization/TemplatePaintGate.stories.tsx` → `LiteralPaintGate`·`LabelContrastGate` 초록, `LABEL_CONTRAST_BASELINE` 항목 0개.
- `pnpm --filter @centurio1987/bbangto-ui-visualization test` → `onInk.test.ts` 초록.
- `pnpm --filter @centurio1987/bbangto-ui-visualization-style-guide-catalog test` → 가이드 30개 × 면 전부의 `on-*` 글자색이 4.5:1 이상.
- `git diff --stat main -- packages/visualization-style-guide-catalog/src/*.tsx` 가 비어 있다(가이드 파일을 고치지 않았다).
- `packages/visualization/src/index.ts`·`tokens/index.ts` 에 새 export 가 없다.
- `.changeset/kan-061-*.md` 가 tokens minor · visualization minor 를 적는다.
- 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 초록.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T17:15 · s:04d9de55 — scope 는 KAN-063 과의 직렬 기록을 위해 겹치는 자리만 먼저 적었다(2026-10-08 유저가 063 먼저로 결정). KAN-063 완료 뒤 전략을 다시 세울 때 실제 범위로 고친다
- 2026-10-10T00:24 · s:add35787 — `전략` 섹션 교체
- 2026-10-10T00:24 · s:add35787 — `실행 계획` 섹션 교체
- 2026-10-10T00:24 · s:add35787 — `검증` 섹션 교체
- 2026-10-10T00:46 · s:add35787 — `전략` 섹션 교체
- 2026-10-10T00:46 · s:add35787 — `실행 계획` 섹션 교체
- 2026-10-10T00:46 · s:add35787 · S1 doing — 착수
- 2026-10-10T00:48 · s:add35787 · S1 done — 빨간 테스트 둘 — tokens/onInk.test.ts(후보 순서·검정흰색 대체·합성·on 우선·변수 이름, 모듈 없음으로 빨강), 카탈로그 onInk.test.ts(가이드·preset 전부 × 면 20개, 변수 없음으로 빨강)
- 2026-10-10T00:48 · s:add35787 · S2 doing — 착수
- 2026-10-10T00:50 · s:add35787 · S2 done — tokens/onInk.ts(surfaceOver·pickOnInk·deriveOnInk, 내부 전용) · contract.ts 가 --bbangto-viz-on-* 를 함께 냄 · tokens VisualizationFoundation.on 선택 필드. 단위 17·카탈로그 2 초록, typecheck 초록, Paint Gate 두 검사 초록
- 2026-10-10T00:50 · s:add35787 · S3 doing — 착수
- 2026-10-10T00:59 · s:add35787 — S3 범위 조정: NodeLabel 기본값을 바꾸자 shape.fill 아닌 면 위에서 기본값을 쓰던 템플릿이 새로 미달이 됐다(게이트는 새 미달을 막는다). 그래서 Mindmap·DMN·ArchiMate viewpoint(S5 몫)와 C4Box·의미 노드 7종·ArchiMate 4종(S6 몫)의 노드 글자·태그를 S3 에서 고쳤다. 반투명·none 면은 canvas 위와 검정 30%(ON_INK_SHADE) 음영 위 둘 다에서 4.5:1 을 넘게 고른다 — riso-print 22% 면이 레인 띠 위에서 4.4 로 떨어진 실측 때문이다
- 2026-10-10T00:59 · s:add35787 · S3 done — NodeLabel 기본 on-shape-fill·보조 글자 opacity 걷음 · ClassBox·C4Box·의미 노드 7종·Mindmap·DMN·ArchiMate viewpoint·ArchiMate·IsometricScene 글자색 · 반투명 면 음영 규칙. 기준 목록 1538→1089(S3 83 + 덩달아 통과 366). Paint Gate 두 검사·pnpm test 1293·typecheck 초록
- 2026-10-10T01:02 · s:add35787 · S4 doing — 착수
- 2026-10-10T01:03 · s:add35787 · S4 done — EntityTable 속성 줄 on-shape-fill·타입 opacity 0.6 걷고 9px · Quadrant 사분면 이름 on-canvas-bg(0.7 걷음) · DataLineage 이름·설명 on-shape-fill(0.8 걷음) · Requirement 머리 띠는 shape.fill+검정 6% 합성색으로 고르고 본문 on-shape-fill(0.6·0.8 걷음). 257곳 지움(1089→832), 게이트 두 검사·typecheck 초록
- 2026-10-10T01:04 · s:add35787 · S5 doing — 착수
- 2026-10-10T01:06 · s:add35787 · S5 done — Treemap·WBS(번호 배지 포함)·Packet·StackedBar·UserJourneyGantt 의 팔레트 면 글자를 on-palette-*(color 직접 지정이면 종전), Treemap·Packet 값 글자 opacity 0.85 걷음, Fishbone 머리 on-palette-p2. Mindmap·DMN·ArchiMate viewpoint 는 S3 에서 먼저 끝남. 693곳 지움(832→139), 게이트 두 검사·typecheck·pnpm test 1293 초록
