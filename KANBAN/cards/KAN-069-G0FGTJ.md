---
card: KAN-069-G0FGTJ
title: viz 미사용 토큰 정리 — 선언만 있고 읽히지 않는 시각화 토큰을 토큰마다 잇거나 걷기 (경계선부터)
created: 2026-10-10
scope: packages/tokens/src/visualization.ts, packages/visualization/src/**, packages/visualization-style-guide-catalog/src/**, apps/storybook/src/stories/visualization/**, apps/storybook/src/stories/_vizCatalogStory.tsx, packages/visualization/*.md, README.md, .changeset/kan-069-*.md
---

# KAN-069-G0FGTJ — viz 미사용 토큰 정리 — 선언만 있고 읽히지 않는 시각화 토큰을 토큰마다 잇거나 걷기 (경계선부터)

## 전략
**토큰마다 그림 코드에 쓰일 자리가 이미 있는지를 보고, 있으면 잇고 없으면 걷는다.** 잇는 잎(토큰 경로의 끝 값)은 8개, 걷는 잎은 28개다. 카드 원문대로 경계선 셋을 첫 단계로 잇는다.

착수 전 확인한 사실(2026-10-10, main `064586b`, 빌드한 dist 로 잼):

- `VisualizationFoundation` 의 잎 86개 중 36개를 그림 코드가 안 읽는다. 카드 메모의 목록과 두 군데가 다르다. `c4.*.bgTint` 3개는 KAN-061 이후 `C4Box` 가 읽으므로 빠지고, 메모에 없던 `node.*.glyph` 7개와 `node.external.dashed` 가 더해진다.
- 카탈로그 가이드는 30개이고 가이드마다 색 preset 이 2~3개다. 경계선 값은 블루프린트 하나만 지금 상수(`'8 6'`·1.5·8)와 같고 29개가 다르다. 그중 넷(iso-color-block·swiss·bauhaus·neobrutalist)은 실선(`''`)인데 지금 대시로 그려진다.
- 경계선을 쓰는 템플릿은 11개다(C4 다섯·Architecture·DataFlow·UseCase·UML Deployment·Sequence·ViewpointFrame). Sequence 는 `dashPattern="4 3"` 을 직접 넘기므로 그대로 남는다.

토큰마다의 결정:

| 토큰 | 잎 | 지금 그림이 쓰는 값 | 가이드 값 | 결정 | 그림 변화 |
|---|---|---|---|---|---|
| `boundary.dashPattern`·`width`·`radius` | 3 | `Boundary` 의 JS 기본값 `'8 6'`·1.5·8 | 29개가 다름 | 잇기 | 경계선 템플릿 11개 |
| `c4.l1~l3.borderWidth` | 3 | `C4Box` 상수 3·2·1.4 | 29개가 다름 | 잇기 | C4 템플릿 5개 |
| `edge.marker.size` | 1 | `Canvas` 의 `markerSize` 기본 8 | 5~9 | 잇기 | 화살촉 크기 |
| `canvas.gridUnit` | 1 | `GridLayer` 기본 8 | 모두 8 | 잇기 | 없음 |
| `node.*.tagColor`·`c4.*.labelColor` | 10 | KAN-061 계산 글자색(`--bbangto-viz-on-*`) | 15개 가이드 189곳이 계산값과 다름 | 걷기 | 없음 |
| `node.*.glyph`·`node.external.dashed` | 8 | 의미 노드 컴포넌트가 종류마다 고정 | 30개 모두 같은 값 | 걷기 | 없음 |
| `typography.titleWeight`·`sizes.*` | 5 | 파일 104개가 글자 크기 10여 종을 직접 적음 | 일부 다름 | 걷기 | 없음 |
| `iconStyle` | 1 | 아이콘에 채움·선 갈래가 없음 | 갈림 | 걷기 | 없음 |
| `spacing.nodePad`·`laneGap` | 2 | 템플릿이 좌표를 직접 계산 | 일부 다름 | 걷기 | 없음 |
| `motion.duration`·`easing` | 2 | viz 에 움직임이 없음(움직임 줄이기 규칙만 있음) | 거의 같음 | 걷기 | 없음 |

잇는 방식은 둘로 갈린다.

- 경계선 대시는 KAN-057 과 같은 갈래로 잇는다. `Boundary` 의 사각형에 내부 훅 `data-viz-part="boundary"` 를 달고, 계약 스타일시트가 그 훅에 `stroke-dasharray: var(--bbangto-viz-boundary-dash-pattern)` 를 건다. `dashPattern` prop 을 적었을 때만 인라인으로 내므로, 적은 prop 과 소비자 스타일시트가 가이드 값을 이긴다. 빈 값(실선)은 `contract.ts` 가 이미 `none` 으로 바꿔 낸다.
- 경계선 두께·모서리, 화살촉 크기, 격자 간격은 `useVizFoundation()` 값을 JS 기본값으로 쓴다. `Edge` 가 `edge.cornerRadius` 를 읽는 방식과 같다. 셋 다 기하 계산에 숫자가 필요하기 때문이다. 경계 라벨의 위치와 글자 뒤 halo 두께가 선 두께에서 나오고, 화살촉의 `refX` 가 크기에서 나온다. Provider 밖에서는 base 값으로 떨어지는데 그 값이 지금 상수와 같아서 그림이 그대로다.
- C4 테두리는 의미 노드의 `keylineWidth` 처럼 `vvar('c4', level, 'borderWidth')` 를 넘긴다.

걷을 때 함께 고칠 것이 둘 있다.

- 접근성 감사(`accessibilityAudit.ts`)는 지금 `node.*.tagColor`·`c4.*.labelColor` 의 대비를 본다. 그런데 실제로 그리는 글자색은 KAN-061 계산값이라, 감사가 그리지 않는 색을 검사하고 있다. 걷으면서 그 두 자리를 실제 글자색(`--bbangto-viz-on-node-*`·`--bbangto-viz-on-c4-*`)으로 옮긴다. 옮기면 `darkluxe-01`(7:1 이상을 선언한 aaa 가이드)의 `oxblood` preset 노드 글자가 5.87~6.66 으로 걸린다. 지금도 그렇게 그려지는데 감사가 못 잡은 것이다. 그 가이드에는 `on` 덮어쓰기로 저자가 tagColor 에 적었던 색 `#EDE3CE`(13~15:1)을 넣어 선언을 지킨다.
- 같은 문제가 다시 생기지 않게 viz 단위 테스트에 「선언한 잎은 모두 그림 코드가 읽는다」 검사를 둔다(S1). 새 토큰을 선언만 하고 잇지 않으면 `pnpm test:unit` 이 빨개진다.

버린 대안:

- 글자 크기·굵기 잇기. 파일 104개가 10여 종 크기를 좌표 계산과 함께 직접 쓴다. 토큰 4개로 묶으려면 글자 크기 체계를 새로 설계하고 템플릿마다 글자 넘침을 다시 재야 해서 정리 카드의 범위를 넘는다. 횡단 규칙 4(최소 가독 크기 토큰, `packages/visualization/style-classification.md`)는 그때 새로 세운다.
- `tagColor`·`labelColor` 를 `on` 의 기본값으로 잇기. 15개 가이드 189곳의 글자색이 바뀌고, 두 필드가 필수라서 KAN-061 계산이 노드·C4 면에서는 한 번도 안 쓰이게 된다.
- 경계선을 전부 계약 스타일시트로 잇기. 라벨 위치 계산에 선 두께 숫자가 필요하고, `rx`·`ry` 를 CSS 로 거는 것이 브라우저마다 같게 동작하는지는 확인 안 함이다.
- 표준 표기 템플릿(UML 유스케이스·배치)의 경계선을 실선으로 고정하기. 경계선은 관계선이 아니라 KAN-070 의 근거(표기법에서 실선과 대시가 다른 관계를 뜻한다)가 그대로 서지 않고, 지금도 대시로 그린다. 검토 판단 항목으로 올린다.

배포: 걷기는 공개 타입에서 필드를 지우는 일이라 tokens·visualization·visualization-style-guide-catalog 가 모두 major 다.

scope 는 이 워크트리에서 정했으므로 main 의 `dep-check` 에는 이 카드가 main 에 병합되기 전까지 안 보인다.

## 실행 계획
각 단계는 테스트를 먼저 빨갛게 만든 뒤 고친다. 잎 수와 템플릿 수는 2026-10-10 확인값이다.

- [x] `S1` 빨간 테스트 먼저 — ① viz 단위 테스트 `packages/visualization/src/tokens/tokenUsage.test.ts`: base foundation 의 잎마다 viz 소스에 읽는 자리(`vvar(…)` · `--bbangto-viz-*` 이름 · `foundation.<경로>` · onInk 의 `f.<경로>`)가 있는지 본다. ② 스토리 `apps/storybook/src/stories/visualization/TokenWiringGate.stories.tsx`: 블루프린트에서 경계(`3 2`·2.5·14)·C4 테두리(4·3·2)·화살촉(12)·격자(16)만 바꾼 가이드 아래에서 computed `stroke-dasharray`·`stroke-width`·`rx`·C4 테두리·`markerWidth`·격자 간격을 잰다. 대시 가이드 안에 실선 가이드를 겹친 경우 안쪽 경계가 `none` 인지, 카탈로그 가이드 30개의 첫 preset 마다 경계 사각형 computed 값이 그 가이드 값과 같은지도 잰다. 완료 기준: ①이 잎 36개로 빨갛고 ②의 잇기 검사가 빨갛다. 다른 스토리는 초록.
- [x] `S2` 경계선 잇기 — `atoms/Boundary.tsx`·`provider/contractCss.ts`. 사각형에 `data-viz-part="boundary"`, 대시는 prop 을 적었을 때만 인라인, 두께·모서리 기본값은 `useVizFoundation()`. 라벨 위치와 halo 두께가 실제 두께를 따른다. 완료 기준: ②의 경계 검사 초록, ①에서 경계 잎 3개가 빠짐, TemplatePaintGate·Headless·TemplateDashGate 초록.
- [x] `S3` C4 테두리·화살촉·격자 잇기 — `molecules/C4Box.tsx`(`vvar('c4', level, 'borderWidth')`)·`atoms/Canvas.tsx`(`markerSize` 기본값)·`atoms/GridLayer.tsx`(`gridUnit` 기본값). 완료 기준: ② 전부 초록, ①에서 잇는 잎 8개가 모두 빠짐.
- [x] `S4` 걷기 — tokens 타입·viz `tokens/base.ts`·`tokens/types.ts`·카탈로그 가이드 30개와 `_foundation.ts`·지침 문자열 셋에서 잎 28개를 지운다. 접근성 감사와 `_vizCatalogStory.tsx` 4번 검사를 실제 글자색(`--bbangto-viz-on-*`)으로 옮기고, 걸리는 가이드(`darkluxe-01` 등)는 `on` 덮어쓰기로 맞춘다. 완료 기준: ① 초록(남은 잎 58개 전부 읽힘), `pnpm typecheck` 초록, 감사 over-claim 0.
- [x] `S5` 문서와 changeset — tokens JSDoc(잇는 필드의 동작과 prop 우선), 루트 `README.md`(사용자 가이드 예시의 `tagColor`, 감사 설명), `packages/visualization/viz-style-expansion.md`·`style-classification.md`, `contractCss.ts` 주석, `.changeset/kan-069-*.md`(tokens·visualization·catalog major). 완료 기준: 걷은 잎 이름이 소스·현행 문서에서 0건(CHANGELOG·칸반 이력 제외).
- [x] `S6` 품질 게이트 — 5종을 CLAUDE.md 순서로 `bash -c` 에서 돌리고, 새 스토리 파일만 `a11y: { test: 'error' }` 로 임시 강제해 돌린 뒤 되돌린다. 완료 기준: 다섯 다 초록, a11y 결과를 수행 내역에 적는다.

## 검증
이 카드가 끝났다는 것은 아래가 모두 나온다는 뜻이다.

1. `tokenUsage.test.ts` 가 초록이다 — `VisualizationFoundation` 에 남은 잎이 전부 그림 코드에서 읽힌다(카드 목표 「선언과 동작이 어긋난 viz 토큰 0」).
2. `TokenWiringGate` 스토리가 초록이다 — 카탈로그 가이드 30개 각각에서 경계 사각형의 computed `stroke-dasharray`·`stroke-width`·`rx` 가 그 가이드의 `boundary` 값과 같다(카드 목표 「경계선이 카탈로그 가이드 값대로 그려진다」). 실선 가이드는 `none` 이다.
3. 걷은 잎 이름이 현행 소스·문서에 없다.

   ```bash
   bash -c 'grep -rnE "tagColor|iconStyle|nodePad|laneGap|titleWeight|motion\.(duration|easing)|\.glyph\b|sizes\.(title|label|tag|mono)" packages apps README.md --include=*.ts --include=*.tsx --include=*.md | grep -v node_modules | grep -v /dist/ | grep -v CHANGELOG'
   ```

   출력이 0줄이어야 한다(core 의 같은 이름 지역 변수가 걸리면 viz 와 무관함을 수행 내역에 적는다).
4. 접근성 감사 over-claim 0 — `pnpm test:unit` 의 catalog `accessibility.test.ts` 초록.
5. 품질 게이트 5종 초록 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-10T22:26 · s:855b94cf — `전략` 섹션 교체
- 2026-10-10T22:26 · s:855b94cf — `실행 계획` 섹션 교체
- 2026-10-10T22:26 · s:855b94cf — `검증` 섹션 교체
- 2026-10-10T23:22 · s:855b94cf · S1 doing — 착수
- 2026-10-10T23:26 · s:855b94cf · S1 done — 빨간 테스트 두 벌 — tokenUsage.test.ts 가 잎 36개로 빨강, TokenWiringGate 스토리 ①~③ 빨강·④ 가이드 29개 빨강(블루프린트만 초록)
- 2026-10-10T23:26 · s:855b94cf · S2 doing — 착수
- 2026-10-10T23:29 · s:855b94cf · S2 done — 경계선 잇기 — Boundary 두께·모서리는 useVizFoundation 기본값, 대시는 계약 스타일시트 훅 data-viz-part=boundary. 게이트 ①②④ 초록, 단위 테스트 남은 잎 33, viz 스토리 154/155(남은 1은 S3 의 ③)·카탈로그 가이드 스토리 150/150
- 2026-10-10T23:29 · s:855b94cf · S3 doing — 착수
- 2026-10-10T23:30 · s:855b94cf · S3 done — C4 테두리(vvar c4.level.borderWidth)·화살촉(Canvas markerSize 기본값=edge.marker.size)·격자(GridLayer gridUnit 기본값=canvas.gridUnit) 잇기. viz·카탈로그 스토리 305/305, 단위 테스트 남은 잎 28 = 걷을 것 전부
- 2026-10-10T23:30 · s:855b94cf · S4 doing — 착수
- 2026-10-10T23:44 · s:855b94cf · S4 done — 잎 28개 걷기 — tokens 타입·viz base·카탈로그 30개(+_foundation·지침 문장)에서 지움. 가이드 모양 검사(foundationShape.test.ts) 신설. 감사를 실제 글자색(--bbangto-viz-on-*)으로 옮김 → darkluxe oxblood 노드7·C4 3곳(5.87~6.75<7) 걸려 on 으로 크림 지정. tokenUsage 초록·viz 288·catalog 48·스토리 305 초록·typecheck 초록
- 2026-10-10T23:45 · s:855b94cf · S5 doing — 착수
- 2026-10-10T23:47 · s:855b94cf · S5 done — 문서·changeset — tokens JSDoc(이은 필드 4묶음·글자색은 on), 루트 README(가이드 예시·감사 설명·줄 번호 316/321/327-339), viz-style-expansion·style-classification, changeset 세 패키지 major. 검증 grep 남은 것은 viz 패턴 데이터 item.glyph·core UI motion 토큰·core 지역 변수 iconStyle·감사 주석의 이력 한 줄(의도)뿐
- 2026-10-10T23:47 · s:855b94cf · S6 doing — 착수
- 2026-10-10T23:49 · s:855b94cf · S6 done — 게이트 5종 초록 — typecheck·build·test(196 파일 1309/1309)·storybook build·test:unit(viz 288·viz 카탈로그 48 포함 전 패키지 통과). TokenWiringGate 만 a11y test:error 로 임시 강제 → 4/4 통과, 되돌림
