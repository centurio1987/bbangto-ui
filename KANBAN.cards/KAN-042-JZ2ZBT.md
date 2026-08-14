---
card: KAN-042-JZ2ZBT
title: bbangto-ui-vizualization을 사용하는 클라이언트가 문제를 제기했다. "/Users/centurio/resume/docs/viz-upstream-issues.md" 이 레포트를 보고 문제를 진단하고 문제 해결 전략 레포트를 작성하고, wbs를 작성하여 이 카드를 수행하는 agent가 사용할 수 있도록 해라.ㄴ
created: 2026-08-14
---

# KAN-042-JZ2ZBT — bbangto-ui-vizualization을 사용하는 클라이언트가 문제를 제기했다. "/Users/centurio/resume/docs/viz-upstream-issues.md" 이 레포트를 보고 문제를 진단하고 문제 해결 전략 레포트를 작성하고, wbs를 작성하여 이 카드를 수행하는 agent가 사용할 수 있도록 해라.ㄴ

## 전략
<!-- 왜 이 접근인가 · 제약 · 버린 대안. 사람이 자유롭게 편집한다. -->

**결론: 4건 전부 실재한다. 3건은 소스에서 원인 줄까지 확정했고, P3만 실측이 1단계로 필요하다.
그리고 클라이언트가 모르는 사실이 하나 있다 — P1은 우리 저장소의 Storybook 스토리에서도 이미 틀린 그림을 내고 있다.**

대상: `@centurio1987/bbangto-ui-visualization` 0.2.0(= 현재 HEAD. 리포트가 인용한 `dist/index.js` 코드가
`src`와 문자 단위로 일치한다). 원 리포트: `/Users/centurio/resume/docs/viz-upstream-issues.md`.

---

## 1. 확정된 원인

### P1 · 축 정렬 엣지의 화살촉 (심각도 높음 — 산출물이 조용히 틀린다)

- 원인 줄: `packages/visualization/src/geometry/routing.ts:14-15`. `from.x === to.x`이면
  `mx === from.x === to.x`라 `M … L mx from.y`(첫 L)와 `L to.x to.y`(마지막 L)가 **둘 다 길이 0**이다.
  markerStart도 같은 이유로 틀어진다 — 리포트는 markerEnd만 적었다.
- 마커 10종 전부 `orient="auto"`(`src/atoms/Marker.tsx:57,73,89,105,121,134,150,166,180,196`) → 방향 미정의 → Chromium 0°.
- **우리 저장소 자체 재현**: `apps/storybook/src/stories/visualization/G1Templates.stories.tsx`
  `FlowchartChildrenMode`의 `n2(240,40,120×60) → n3(240,170,120×60)`. `nearestAnchors`(`geometry/anchors.ts:37-42`)가
  `|dy| > |dx|`로 bottom→top을 고르고 두 앵커의 x가 같은 300 → `d = "M 300 101.25 L 300 101.25 L 300 168.75 L 300 168.75"`.
  즉 이 스토리는 지금 90° 틀어진 화살촉을 보여주고 있다. 클라이언트만의 문제가 아니다.
- **클라이언트 제안(`from.x === to.x`면 `straightPath` 위임)은 방향은 맞지만 부족하다.**
  같은 `dx < cornerRadius*2` 분기는 dx가 0이 아니라 1~7px일 때도 종단 세그먼트를 1px짜리 **가로** 조각으로 만든다.
  이때 orient는 정의되지만 화살촉은 여전히 옆을 본다. 판정 기준은 "정확히 0"이 아니라
  **종단 세그먼트 길이 ≤ ε**여야 한다.
- 회귀 위험 낮음: `d` 문자열을 고정한 play 테스트가 없다(6개 파일 전부 `d.length > 4` 수준).
- 근본 원인의 근본 원인: `geometry/*.test.ts` 18개 중 **routing 단위 테스트가 없다**. 결함이 하필 여기서 난 이유다.

### P2 · 콘텐츠 박스 미노출 (심각도 중간 — 조용한 잘림)

- 원인 줄: `src/geometry/shapes.ts:110`(`cylinder`의 `ry = clamp(h*0.15, 4, 12)`), `:65-69`(`diamond` 내접 절반).
  `contentBox`류 export는 저장소 전체에 0건.
- 구조적으로 호출자가 계산할 수밖에 없다: `Node`는 headless라 라벨을 그리지 않고,
  `NodeLabel`(`src/atoms/NodeLabel.tsx:7-20`)은 `height`를 아예 받지 않아 세로 넘침을 판단할 수단이 없다.
- 그래서 이것은 "상수를 안 열어줬다"가 아니라 **계약 누락**이다. `contentBox(shape, bbox)` 하나만 export하면
  같은 사고가 `NodeLabel` 경로로 다시 난다 — 라벨 렌더러가 그 박스를 받을 수 있어야 재발이 끊긴다.

### P3 · Boundary 라벨이 프레임 선에 닿는다 (심각도 중간 — 미확정, 실측 선행)

- 원인 줄: `src/atoms/Boundary.tsx:69-79`. 라벨 y가 `y - labelFontSize/2`이고 `dominantBaseline="central"`이라
  프레임 상단선까지 여유가 **폰트 크기 비례 ~0.2em 고정**이다(fs=11 → 약 2px). 배경 knockout 없음, `labelPlacement` 없음.
- 한글 라벨은 라틴 대문자와 달리 em 박스 하단까지 글리프가 차므로 스트로크 밴드(±strokeWidth/2)에 닿는다.
  `strokeWidth`는 호출자 자유값이라 두꺼울수록 확실히 겹친다(클라이언트 `_frame.tsx`는 `T.BORDER_W`를 쓴다).
- **확정하지 않았다.** 겹침의 정도는 폰트 메트릭에 달렸고 소스만으로는 못 정한다 → S1에서 chromium 실측
  (`getBBox()` 하단 vs 스트로크 밴드)으로 판정한 뒤 수정 형태를 고른다.

### P4 · 라벨 기본 서체 monoFont (심각도 중간 — 리포트보다 범위가 넓다)

- 클라이언트가 본 것은 `Boundary.tsx:45` 한 곳이지만, `vvar('typography','monoFont')` 하드코딩은
  **약 40곳**에 퍼져 있다 — atoms 8(Boundary·Lane·EdgeLabel·Tag·Axis·StatNumber·IndexBadge·MilestoneMarker),
  molecules 2(ClassBox·EntityTable), patterns/templates 다수. 그중 호출자가 서체를 바꿀 수 있는 곳은 4곳뿐이다.
- 토큰 계약(`packages/tokens/src/visualization.ts:91-101`)에 `labelFont` 채널이 없다. 게다가 `typography`는
  required readonly 블록이라 **viz 스타일가이드 28+개가 전체 리터럴로 재작성**한다
  (`packages/visualization-style-guide-catalog/src/*.tsx`). 필수 필드를 추가하면 전 가이드 typecheck가 깨진다
  → **optional 필드 + 해석 헬퍼가 유일하게 additive한 경로**다.
- 스크립트 판정은 라벨 문자열마다 달라지므로 CSS 변수만으로는 못 푼다. 컴포넌트 JS에서 결정해야 하고,
  선례가 이미 있다(`src/templates/SequenceDiagram.tsx:131,184`의 `monoFont` 분기).

---

## 2. 해결 원칙

1. **클라이언트 우회가 지워질 수 있는 상태**가 완료 조건이다. 되돌릴 대상은 넷 —
   세로 엣지 `routing="straight"` 19곳, `_frame.tsx`의 `cap = clamp(h*0.15,4,12)` 복제,
   `Boundary` label 대신 직접 그리는 `BoundaryLabel`, `isLatin()` 서체 분기.
   그들이 남긴 두 게이트(`scripts/lint-diagrams.ts`, `render-core.ts`의 `inspectEdgeGeometry`)는
   상류 수정 후에도 **초록이어야 한다** — 우리 수정이 그 게이트의 판정과 일치하는지가 검증 기준이다.
2. **상수 대신 계약을 노출한다.** 값을 열어주는 데서 멈추지 않고, 그 값을 필요로 하는 렌더러가 받아쓸 수 있게 한다.
3. **기본값 변경은 additive하게.** 기존 그림의 좌표를 움직이지 않는 선에서 고친다.

우선순위: **P1**(틀린 산출물 + 조용함 + 자체 재현) → **P4**(범위 넓고 기계적) → **P2**(API 추가) → **P3**(실측 선행).

## 3. 버린 대안

- **P1을 `Edge`에서 "축 정렬이면 routing을 straight로 스왑"** — `buildPath`/`orthogonalPath`를 직접 쓰는
  호출자(패턴·몰레큘 6곳)가 그대로 깨진다. 기하 레이어에서 고친다.
- **P1을 마커 `orient` 각도 명시로 우회** — 경로에 길이 0 세그먼트가 그대로 남아 클라이언트 게이트가 계속 빨갛다.
- **P4를 foundation CSS 변수만으로** — 라벨 문자열별 분기가 불가능하다.
- **P4에서 `labelFont`를 required로 추가** — 가이드 28+개 동시 변경 + 색스킴 파생(`_foundation.ts:makeVizColorway`)까지 파급.
- **P3에서 라벨을 무조건 프레임 밖 위로 이동** — 기존 사용자 그림이 움직인다. 기본값은 현행 배치를 유지하고
  knockout을 기본으로 켜는 쪽이 호환된다(최종 판단은 S1 실측 후 S8).

## 4. 범위 밖

- 클라이언트 저장소(`/Users/centurio/resume`) 수정 — 우회 제거는 릴리스 이후 그쪽 작업이다. 이 카드는 회신까지만 한다.
- 신규 스타일가이드·신규 유형 추가. 기존 4축 메타(`metadata-coverage.json`)는 이 카드에서 건드리지 않는다
  (`contentBox`는 geometry export라 유형 커버리지 스캔 대상인 `templates/index.ts`·`patterns/index.ts`에 걸리지 않는다).

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->

> 순서는 의존 순서다. S1은 전 항목의 선행이고(테스트 먼저 — `CLAUDE.md` 필수 워크플로), S8은 S1의 실측 결과에 의존한다.
> S4·S6은 서로 독립이라 병렬 가능. 각 단계 끝에 `pnpm typecheck`를 돌리고, 4 게이트 전량은 S9에서 한 번 더 돌린다.

- [x] `S1` RED 고정 — routing 단위 테스트 신설 + P1·P3 chromium 실측
  · 신규 `packages/visualization/src/geometry/routing.test.ts` — 축 정렬(`from.x===to.x`, `from.y===to.y`), 근축(dx=1,3,7 × cornerRadius 4), 일반 케이스. 단정: 파싱한 세그먼트 중 **길이 ≤ ε(0.01)인 종단 세그먼트가 없다** + 기존 일반 경로 `d` 불변.
  · `apps/storybook/src/stories/visualization/Atoms.stories.tsx`에 세로 엣지 story 추가 — 렌더된 `d`의 종단 세그먼트 길이 실측(클라이언트 `inspectEdgeGeometry`와 같은 판정).
  · P3 실측 story — `Boundary` 라벨 `getBBox()` 하단 y vs 프레임 rect 스트로크 밴드(`y ± strokeWidth/2`). 한글/라틴 라벨 × strokeWidth 1.5/3 네 조합. **여기서 P3의 실재 여부와 겹침량을 확정하고 수행 내역에 수치로 남긴다.**
  · 완료 판정: 새 테스트가 **빨간 상태**로 재현된다(P3만 결과에 따라 초록일 수 있다 — 그러면 S8을 재조정한다).

- [x] `S2` P1 수정 — `orthogonalPath` 종단 세그먼트 ε 규칙
  · `src/geometry/routing.ts` — 축 정렬(`from.x===to.x || from.y===to.y`)은 `straightPath`로 위임. 추가로 `dx`나 `dy`가 ε 이하인 근축도 같은 경로로 흡수한다(리포트 제안보다 한 단계 넓다 — 전략 §1 P1 참고).
  · `buildPath`의 waypoints 경로도 같은 결함을 갖는지 확인한다(연속 중복 점 → 길이 0 세그먼트). 있으면 중복 점 제거를 함께 넣는다.
  · 완료 판정: S1의 routing 테스트 초록, 일반 케이스 `d` 문자열 무변경.

- [x] `S3` P1 회귀 스윕 — 자체 저장소 축 정렬 엣지 전수 + 클라이언트 게이트 대조
  · `Edge`/`buildPath` 소비처 30+ 파일에서 축 정렬 엣지를 만드는 지점을 찾는다(`G1Templates`의 `FlowchartChildrenMode`는 확인됨).
  · `pnpm test`(1219 play) 전량 + `pnpm --filter visualization test`(단위) — 깨지는 단정이 있으면 **정당한 변화인지 판정하고 기록**한다. 현재 `d` 고정 단정은 없어서 무회귀가 예상값이다.
  · 클라이언트 게이트 재현: `routing="straight"`를 **제거한** 상태로 세로 엣지가 종단 길이 0을 만들지 않는지 확인(그쪽 `lint-diagrams.ts`와 같은 판정).

- [x] `S4` P2 — `contentBox(shape, bbox)` 순수 함수 export
  · `src/geometry/shapes.ts` — cylinder `ry` 상수를 `CYLINDER_CAP_RATIO/MIN/MAX`로 승격해 `cylinderPaths`와 `contentBox`가 **한 값을 공유**하게 한다(복제 재발 방지).
  · 지원 shape: 최소 `cylinder`(상하 cap 차감)·`diamond`(내접 사각형)·`hexagon`·`trapezoid`·`parallelogram`·`cube`·`folder`(탭 높이 차감). 나머지는 bbox 그대로 반환.
  · 테스트: `src/geometry/shapes.test.ts`(신규) — 반환 박스가 도형 path 내부에 들어가는지 샘플 점 검사 + cylinder h=62 → 리포트가 계산한 43px 대와 일치.
  · 배럴: `geometry/index.ts`가 `export * from './shapes'`라 루트 export는 자동. 유형 커버리지 게이트 무관(전략 §4).

- [x] `S5` P2 — `NodeLabel`이 콘텐츠 박스를 받게 한다
  · `NodeLabelProps`에 `height?`와 `shape?`(또는 `contentBox?`) optional 추가 → 주어지면 `maxLines`를 세로 여유에서 산출해 조용한 잘림을 없앤다. 미지정 시 현행 동작 그대로(additive).
  · 테스트: `Atoms.stories.tsx` play — cylinder h=62 + 3줄 라벨이 잘리지 않거나(줄 수 축소) 넘치지 않음을 단정.

- [x] `S6` P4 — `typography.labelFont` 토큰 + 스크립트 인식 해석 헬퍼
  · `packages/tokens/src/visualization.ts` — `readonly labelFont?: string` **optional** 추가(required면 가이드 28+개가 깨진다).
  · `packages/visualization/src/tokens/base.ts` — base에 기본값 지정.
  · 신규 헬퍼(예: `src/tokens/labelFont.ts`) — `resolveLabelFont(label, explicit?)`: 명시값 > `labelFont` 토큰 > **비ASCII 포함이면 `titleFont`, 아니면 `monoFont`**. 판정 함수는 export해 호출자도 쓸 수 있게 한다(클라이언트 `isLatin()` 대체).
  · 테스트: `src/tokens/labelFont.test.ts`(신규) — 한글·한자·이모지·라틴·혼합 문자열 분기 + 우선순위 3단.

- [x] `S7` P4 — 라벨 렌더 지점 일괄 적용
  · 대상 목록을 먼저 산출한다: `grep -rn "vvar('typography', 'monoFont')" packages/visualization/src` (약 40곳). **호출자 문자열을 그리는 곳만** 바꾼다 — 축 눈금·수치처럼 항상 라틴인 자리(`Axis`·`StatNumber`·`IndexBadge`)는 mono 유지가 맞는지 건별로 판단하고 판단 근거를 수행 내역에 남긴다.
  · 최소 필수: `Boundary`·`Lane`·`EdgeLabel`·`Tag` + `ClassBox`·`EntityTable` + 한글이 들어갈 수 있는 patterns/templates 라벨.
  · 테스트: `Atoms.stories.tsx`/`Structure.stories.tsx` play — 한글 라벨의 `font-family`가 titleFont 계열로 해석되고, 라틴 라벨은 mono 유지.

- [x] `S8` P3 — Boundary 라벨 배치 (S1 실측 결과에 따라 형태 확정)
  · 겹침이 확인되면: 기본값은 현행 배치를 유지한 채 **라벨 뒤 knockout 사각형**(캔버스 배경색)을 기본으로 깔고, `labelPlacement?: 'outside' | 'inside' | 'on-line'`을 추가해 호출자가 고르게 한다. 좌표 이동을 기본값으로 삼지 않는다(기존 그림 보존).
  · 겹침이 폰트 메트릭 의존이면 최소한 여유를 `fontSize/2`에서 **`fontSize/2 + strokeWidth`**로 넓히는 것을 함께 검토한다.
  · 테스트: S1의 실측 story를 초록으로 뒤집는다.

- [x] `S9` 릴리스 + 상류 회신
  · `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` 4 게이트 전량 초록(`packages/core`에 새 export가 없으므로 storybook vite 캐시 삭제는 불필요할 것 — 실패하면 캐시부터 지운다).
  · changeset 1건 작성(`.changeset/`은 현재 비어 있다). P2(`contentBox`)·P4(`labelFont` 토큰) 신규 export = minor. 본문에 4건 각각의 **되돌릴 수 있는 우회**를 명시한다.
  · `packages/visualization/CHANGELOG.md`는 changesets가 생성하므로 손대지 않는다.
  · 클라이언트 회신: `/Users/centurio/resume/docs/viz-upstream-issues.md`의 표 `이슈:`/`해소:` 칸에 채울 문장을 카드 수행 내역에 남긴다(그쪽 파일은 이 카드에서 수정하지 않는다 — 전략 §4).

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

**이 카드는 두 단계다. 지금 단계(진단·전략·WBS)의 완료 조건과, 후속 수행 단계(S1~S9)의 완료 조건을 분리한다.**

## A. 진단·전략·WBS 단계 (이 문서 자체)

- 리포트 4건 각각에 대해 **소스 원인 줄** 또는 **미확정 표기 + 확정 방법**이 적혀 있다 → 전략 §1.
- 각 항목마다 클라이언트 우회를 되돌릴 수 있는지 판정 기준이 있다 → 전략 §2 원칙 1.
- WBS의 모든 단계에 산출 파일 경로와 완료 판정이 붙어 있다 → 실행 계획 S1~S9.

## B. 후속 수행 단계 (S1~S9)

품질 게이트 4종이 전부 초록이어야 한다(`CLAUDE.md` 필수 워크플로).

```bash
pnpm typecheck
pnpm build
pnpm test                      # chromium play 1219 + α
pnpm --filter storybook build
pnpm --filter visualization test   # geometry/tokens 단위 (신규 routing·shapes·labelFont 포함)
```

항목별 DoD:

| 항목 | 초록 판정 |
| --- | --- |
| P1 | `routing.test.ts`가 축 정렬·근축 전 케이스에서 길이 0 종단 세그먼트 0건. 세로 엣지 play가 실측 `d`로 같은 판정. 기존 play 무회귀. |
| P2 | `contentBox` export + cylinder h=62 반환값이 리포트 계산(≈43px)과 일치. cylinder cap 상수가 `cylinderPaths`와 **한 소스**를 공유. `NodeLabel`이 세로 여유를 받는다. |
| P3 | S1 실측 story가 초록(라벨 글리프 하단이 스트로크 밴드와 겹치지 않음) — 한글/라틴 × strokeWidth 2조합 전부. |
| P4 | 한글 라벨 play에서 `font-family`가 titleFont 계열, 라틴은 mono 유지. `labelFont`는 optional이라 가이드 28+개 무변경 typecheck 통과. |
| 릴리스 | changeset 1건 존재, `pnpm build`로 `dist`에 신규 export가 emit됨(`packages/visualization/dist/index.d.ts`에 `contentBox`·`resolveLabelFont` 존재). |

최종 확인: 클라이언트 우회 4종(세로 엣지 `routing="straight"` 19곳 · cap 복제 · `BoundaryLabel` 수기 렌더 ·
`isLatin()` 분기)이 **되돌릴 수 있는 상태**임을 회신 문안에 항목별로 적었다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-08-14T13:08 · s:9b6021f3 — `전략` 섹션 교체
- 2026-08-14T13:08 · s:9b6021f3 — `실행 계획` 섹션 교체
- 2026-08-14T13:08 · s:9b6021f3 — `검증` 섹션 교체
- 2026-08-14T13:09 · s:9b6021f3 — 상류 리포트 4건 진단 완료 — P1/P2/P4는 소스 원인 줄 확정, P3는 실측 선행(S1)으로 이연. 전략·WBS(S1~S9)·검증 기준 작성. 추가 발견: P1은 G1Templates FlowchartChildrenMode에서 자체 재현(n2→n3 축 정렬), P4 범위는 monoFont 하드코딩 약 40곳.
- 2026-08-14T14:15 · s:23e09c1f · S1 done — S1 placeholder
- 2026-08-14T14:15 · s:23e09c1f · S2 done — S2 placeholder
- 2026-08-14T14:15 · s:23e09c1f · S3 done — S3 placeholder
- 2026-08-14T14:16 · s:23e09c1f — 정정 — 바로 위 S1·S2·S3의 "placeholder" 노트는 스크립트 호출 형태를 확인하다 실수로 기록된 것이다. 단계 완료는 사실이고, 실제 내용은 아래 세 줄로 대체한다.
- 2026-08-14T14:16 · s:23e09c1f — S1(실제) — routing.test.ts 신설(39케이스) + Atoms 스토리 2종(EdgeAxisAlignedMarkers·BoundaryLabelClearance) 추가, 전부 RED 확인. P1 실측 d: 축 정렬 `M 60 30 L 60 30 L 60 170 L 60 170`(종단 0/0), 근축 dx=7 종단 3.5, 그리고 dx=8(=cornerRadius*2)은 라운드 분기로 들어가 종단이 정확히 0 — 리포트가 놓친 경계다. P3 실측(fontSize 11, 폰트는 Courier New 폴백): 잉크 여유가 라틴 대문자 +1.57/+0.82(sw 1.5/3), 한글 +0.87/+0.12, 디센더 라틴(Payment gateway) -0.32/-1.07 → P3 실재 확정, 원인은 스크립트가 아니라 글리프 디센더 깊이. 측정 방법 정정: getStartPositionOfChar는 Chromium에서 dominant-baseline 이동을 반영하지 않아(약 4px 과대) getBBox+폰트 메트릭으로 베이스라인을 유도했다.
- 2026-08-14T14:16 · s:23e09c1f — S2(실제) — orthogonalPath 판정 기준을 '정확히 0'에서 '종단 세그먼트 < MIN_TERMINAL_SEGMENT(=8, 기본 마커 크기)'로 넓히고 dy≈0 축 정렬을 straightPath로 흡수. buildPath는 waypoints의 연속 중복 점을 접는다. 일반 대각·납작 경로의 d 문자열은 테스트로 고정해 불변 확인. 단위 39/39 초록.
- 2026-08-14T14:16 · s:23e09c1f — S3(실제) — 자체 저장소 축 정렬 엣지를 개별로 찾는 대신 전역 게이트를 설치했다: apps/storybook/.storybook/preview.tsx의 afterEach가 모든 스토리에서 _edgeGeometryGate.ts로 종단 길이 0 엣지를 잡는다(클라이언트 inspectEdgeGeometry와 동일 판정·동일 ε 0.5). 게이트가 실제로 도는지는 ε를 10000으로 올려 G1Templates 4건이 빨개지는 것으로 확인했다. 전량 play 1221건 중 P3 스토리 1건만 빨강 = 무회귀. 그림이 바뀌는 범위는 dx < 2*(8+cornerRadius)(기본 cr=4 → dx<24)인 축 정렬·근축 엣지에 한정되고, 그 구간은 수정 전에 화살촉이 옆을 보던 자리다.
- 2026-08-14T14:17 · s:23e09c1f · S4 done — contentBox(shape,bbox,opts?) export + cylinderCapHeight·CYLINDER_CAP_*·cubeDepth·subroutineIndent·doubleCircleInnerRadius·folderTabHeight 승격(Node가 그리는 값과 한 소스). shapes.test.ts 33케이스 + 브라우저 isPointInFill로 14개 도형의 콘텐츠 박스 네 꼭짓점 전수 검증. 리포트 산술 정정: cylinder의 실제 콘텐츠 높이는 h-2*cap(h=62 → 43.4)이 아니라 h-3*cap(34.1)이다 — body 윗변이 위 뚜껑의 아랫 호라 가로 중앙에서 y+2*cap까지 내려온다(43.4로 두면 위 두 꼭짓점이 칠해진 영역 밖으로 나가는 것을 실측).
- 2026-08-14T14:17 · s:23e09c1f · S5 done — NodeLabel에 height?·shape? optional 추가 — 주면 contentBox 기준으로 배치하고 세로 여유에서 줄 수를 산출한다. 줄 수가 줄어 낱말이 빠지면 말줄임을 붙여 조용한 잘림을 없앤다(height 미지정 호출은 이 분기에 들어오지 않아 동작 불변). 스토리 NodeLabelInContentBox: cylinder h=62 + 3줄 라벨이 수정 전 2줄 넘침 → 수정 후 0.
- 2026-08-14T14:17 · s:23e09c1f · S6 done — tokens visualization.ts에 typography.labelFont를 optional로 추가 + resolveLabelFont/hasNonAsciiScript 신설(19케이스). 카드 계획에서 벗어난 점 하나: base.ts에 labelFont 기본값을 넣지 않았다 — 넣으면 CSS var 우선순위상 스크립트 판정이 항상 져서 P4가 기본값으로는 고쳐지지 않는다. 대신 var(--…-label-font, var(--…-title-font|mono-font)) fallback 체인으로 '명시값 > labelFont 토큰 > 스크립트 판정' 3단을 구현했다. 판정 범위는 비ASCII 전체가 아니라 라틴 확장·일반 구두점·통화기호를 제외한 것 — «stereotype»·café·—·₩ 오탐을 막는다.
- 2026-08-14T14:17 · s:23e09c1f · S7 done — monoFont 하드코딩 55곳(43파일)을 전수 판정해 34곳을 resolveLabelFont로 교체하고 21곳은 mono를 유지했다. 판정 기준은 '렌더되는 문자열이 호출자가 준 자연어인가': 교체 = Boundary·Lane·EdgeLabel·Tag·Axis(틱 라벨)·MilestoneMarker·ClassBox(stereotype/속성/메서드)·EntityTable(키/이름/타입)·Heatmap 행열 라벨 + patterns/templates 라벨 24곳. 유지 = 축 눈금 포맷 수치(BarChart·StackedBarChart·Histogram·Boxplot·Treemap·WaterfallChart·DotPlot·Heatmap 셀값)·순번(IndexBadge·C4DynamicDiagram order·WBS code)·델타(StatNumber)·SpectrumSlider 수치·RequirementDiagram «kind»(라틴 유니온)·SequenceDiagram(호출자가 monoFont prop으로 이미 고르는 자리).
- 2026-08-14T14:17 · s:23e09c1f · S8 done — Boundary에 labelPlacement('on-line'|'outside'|'inside')와 labelHalo/labelHaloColor/labelHaloWidth 추가. 기본은 on-line + halo 켬 — 라벨 좌표를 그대로 두고 paint-order:stroke로 글리프 둘레에 배경색을 깔아 프레임 선을 끊는다(사각형 knockout과 달리 글자 폭 추정이 필요 없다). 실측: on-line 6조합 전부 halo 판정 통과, outside 잉크 여유 +3.43, inside +5.22(둘 다 halo 없이). 부수 관찰: P4 적용으로 한글 라벨이 titleFont로 바뀌면서 잉크 여유가 +0.87 → -0.13으로 뒤집혔다 — halo가 없었으면 한글도 겹쳤다.
- 2026-08-14T14:17 · s:23e09c1f · S9 done — 게이트 전량 초록: pnpm typecheck · pnpm build · pnpm test(182파일 1224 play) · pnpm --filter storybook build · pnpm test:unit(visualization 232 포함). changeset 1건(.changeset/upstream-viz-issues-p1-p4.md, visualization+tokens minor). dist/index.d.ts에 contentBox·resolveLabelFont·hasNonAsciiScript·MIN_TERMINAL_SEGMENT·cylinderCapHeight·cubeDepth·BoundaryLabelPlacement emit 확인. storybook vite 캐시는 dist 변경마다 지워야 스토리가 새 빌드를 본다.
- 2026-08-14T14:17 · s:23e09c1f — 클라이언트 회신 문안(viz-upstream-issues.md의 해소: 칸에 채울 내용, 그쪽 파일은 이 카드에서 수정하지 않는다) — P1: orthogonalPath가 축 정렬·근축을 straightPath로 위임한다. 판정은 '길이 0'이 아니라 '종단 세그먼트 < MIN_TERMINAL_SEGMENT(8, 기본 마커 크기)'이고 dx===cornerRadius*2 경계도 포함된다. 세로 엣지 routing="straight" 19곳을 지워도 된다. 게이트 2종은 그대로 둘 것 — 우리도 같은 판정을 preview afterEach에 상시 걸었다. / P2: contentBox(shape,bbox)를 export했다. cylinder cap은 cylinderCapHeight로 한 소스가 됐다. 다만 database 높이 제약은 h-2*cap이 아니라 h-3*cap 기준으로 다시 잡아야 한다(h=62 → 43px이 아니라 34.1px). RoleBox의 clamp 복제는 지워도 된다. / P3: Boundary가 기본으로 라벨 뒤 halo를 깔아 선을 끊고, labelPlacement로 밖·안을 고를 수 있다. Frame이 label을 직접 그리는 우회를 지워도 된다. 다만 halo 색은 캔버스 배경 기본이라 색면 위에 얹는 경계는 labelHaloColor를 넘길 것. / P4: typography.labelFont(optional)와 resolveLabelFont·hasNonAsciiScript를 export했다. 라벨류는 기본으로 비라틴이면 titleFont, 라틴이면 monoFont로 해석한다. _frame.tsx의 isLatin() 분기는 hasNonAsciiScript로 대체하거나 통째로 지워도 된다 — 단 우리 판정은 라틴 확장·구두점·통화기호를 라틴으로 본다(«»·café·—·₩).
