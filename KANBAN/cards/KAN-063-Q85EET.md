---
card: KAN-063-Q85EET
title: viz Paint Gate 표본을 나머지 템플릿으로 넓히기 — 리터럴 · 글자 대비 검사가 모든 템플릿을 보게
created: 2026-10-08
scope: apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx, apps/storybook/src/stories/visualization/_paintGateFixtures.tsx, apps/storybook/src/stories/visualization/_labelContrastBaseline.ts, packages/visualization/src/templates/**, packages/visualization/README.md, packages/foundations/src/vizPaintGateCoverage.ts, packages/foundations/src/vizPaintGateCoverage.test.ts, .changeset/kan-063-*.md
---

# KAN-063-Q85EET — viz Paint Gate 표본을 나머지 템플릿으로 넓히기 — 리터럴 · 글자 대비 검사가 모든 템플릿을 보게

## 전략
### 문제

Paint Gate(`apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx`)의 두 검사는 표본(fixture, 검사에 넣어 그려 보는 시험 데이터)이 있는 템플릿만 본다. 리터럴 색 검사(`LiteralPaintGate`)는 템플릿 68개 중 31개를, 글자 대비 검사(`LabelContrastGate`)는 13개를 그린다. 나머지는 리터럴 색이 들어와도, 글자가 바탕에 묻혀도 걸리지 않는다. README 가 그 한계를 그대로 적고 있다(`packages/visualization/README.md:142-145`). KAN-056 검토 항목 5에서 나온 카드다.

템플릿 수는 `packages/visualization/src/templates/index.ts` 가 내보내는 컴포넌트 이름으로 센다. 68개다. 카드를 만들 때 적은 65는 `export {` 줄 수이고, ArchiMate 줄 하나가 넷(`ArchiMateDiagram`·`ArchiMateBusinessDiagram`·`ArchiMateApplicationDiagram`·`ArchiMateTechnologyDiagram`)을 내보낸다.

2026-10-08 main 에서 표본이 없는 37개 파일을 grep 으로 훑었다. 색 리터럴은 `IsometricScene.tsx:144` 의 반투명 검정 하나뿐이고, 이 색은 검사에서 빠지는 음영이다. 색을 아예 안 줘서 초기값 검정으로 그려지는 자리는 grep 으로 못 잡으므로 S3 에서 실제로 돌려 본다.

### 접근

1. **표본 누락 검사를 먼저 세운다.** 자리는 `packages/foundations` 의 저장소 전역 검사다. `keyboardCoverage.test.ts` 와 같은 구조로, 실제 저장소 검사 하나와 실패 주입 표본(일부러 틀리게 만든 입력)을 함께 둔다. `templates/index.ts` 의 export 이름과 `_paintGateFixtures.tsx` 의 `template: '이름'` 을 견주고, 누락·중복·없는 이름을 모두 실패로 낸다. `pnpm test:unit` 에서 돈다.
2. **표본은 `_paintGateFixtures.tsx` 한 파일에 모은다.** matrix 표본 24개는 `_matrixFixtures.tsx` 를 고치지 않고 key 로 가져와 템플릿 이름만 붙인다. 지금 스토리 파일 안에 있는 7개는 이 파일로 옮긴다. 새 37개는 기존 스토리(G2·G4·G5·G6·ChartsP2·DiagramsP2·DiagramsP3·Structure·IsometricGeometry)의 검증된 데이터를 줄여 만든다. 표본은 `fill`·`stroke` 를 명시하지 않는다(명시한 prop 은 가이드를 이기는 것이 정상이라 검사가 무의미해진다).
3. **두 검사가 모두 68개를 본다.** 리터럴 검사에서 위반이 나오면 템플릿을 토큰으로 고친다. 고치는 규칙은 KAN-056 전략의 네 규칙을 그대로 따른다. 글자 대비 검사에서 새로 드러난 미달은 고치지 않고 기준 목록(`_labelContrastBaseline.ts`)에 올린다. 고치는 일은 KAN-061 이 맡는다.
4. **README 두 문단을 고친다.** `:142-145`(리터럴 검사)와 `:187-189`(글자 대비 검사)를 "모든 템플릿에 표본이 있어야 하고, 빠지면 `test:unit` 이 실패한다"로 바꾼다.

### 제약

- 글자 대비 미달은 이 카드에서 고치지 않는다. 2026-10-08 유저가 KAN-063 먼저, KAN-061 나중으로 정했고 직렬로 기록했다. 기준 목록이 늘어나는 것이 정상이고, 늘어난 수를 템플릿별로 수행 내역에 남겨 KAN-061 이 전략을 다시 세울 때 쓰게 한다.
- `_matrixFixtures.tsx` 는 고치지 않는다. `TemplateStyleMatrix` 가 같이 쓰는 파일이라 scope 에 넣지 않았다.
- 실행 시간: 2026-10-08 main 에서 두 검사를 돌리니 합쳐 0.5초였다(31개·13개). 68개면 대략 다섯 배이고 `testTimeout` 60초(`apps/storybook/vite.config.ts`) 안이다. 넘치면 스토리를 나눈다.

### 버린 대안

- **스토리 안에서 `?raw` 로 `templates/index.ts` 를 읽어 누락을 검사한다.** 다른 패키지의 소스를 Storybook 번들로 끌어오고 `?raw` 타입 선언을 따로 둬야 한다. 같은 일을 하는 자리(foundations 전역 검사)가 이미 있다.
- **패키지 루트 export 를 돌며 템플릿을 고른다.** 루트는 atom·molecule·pattern 도 함께 내보내서 템플릿만 가를 수 없다.
- **글자 대비 미달을 이 카드에서 고친다.** KAN-061 과 같은 일을 두 카드가 나눠 하게 된다.

### 정해진 것

- KAN-055(배포)와의 `.changeset/` 겹침은 그대로 둔다(2026-10-08 유저 선택, 용인 기록). 이 카드는 S3 에서 템플릿을 고쳤을 때만 changeset 한 장을 더한다.
- 수행 방식은 단일 에이전트다(2026-10-08 유저 선택).

## 실행 계획
- [x] `S1` 표본 누락 검사 세우기 — `packages/foundations/src/vizPaintGateCoverage.ts`·`.test.ts`. 완료 기준: 실패 주입 표본 셋(누락·중복·없는 이름)에서 위반을 내고, 실제 저장소 검사는 표본 파일이 아직 없어 68개 누락으로 빨강이다.
- [ ] `S2` 표본 68개 작성 — `_paintGateFixtures.tsx`(matrix 24개 가져오기 · 스토리 안 7개 옮기기 · 새 37개). 스토리가 이 목록을 쓰게 바꾼다. 완료 기준: S1 검사 초록, storybook typecheck 통과.
- [ ] `S3` 리터럴 검사를 68개로 — `LiteralPaintGate` 가 표본 전부를 그린다. 위반은 템플릿을 고쳐 없앤다. 완료 기준: `LiteralPaintGate` 초록, 표본마다 비교한 paint 수가 0보다 크다. 고친 템플릿과 줄을 수행 내역에 남긴다(없으면 없다고 남긴다).
- [ ] `S4` 글자 대비 검사를 68개 × 가이드 30개로 — 새 미달은 기준 목록에 올리고 머리 주석을 고친다. 완료 기준: `LabelContrastGate` 초록, 표본마다 잰 글자 수가 0보다 크다(글자를 그리지 않는 템플릿이면 그 사유를 표본에 적고 따로 뺀다). 늘어난 항목 수를 템플릿별로 수행 내역에 남긴다.
- [ ] `S5` 문서와 마무리 — README 두 문단, changeset(S3 에서 템플릿을 고쳤을 때만), 품질 게이트 5종. 완료 기준: 게이트 5종 초록.

## 검증
- `pnpm test:unit` — `vizPaintGateCoverage.test.ts` 초록. 실제 저장소 누락 0, 실패 주입 셋(누락·중복·없는 이름)이 각각 위반을 낸다.
- `pnpm --filter storybook exec vitest run --project storybook src/stories/visualization/TemplatePaintGate.stories.tsx` — `LiteralPaintGate`·`LabelContrastGate` 둘 다 초록이고, 둘 다 표본 68개를 그린다.
- 표본 하나를 지우면 `pnpm test:unit` 이 그 템플릿 이름으로 빨강이 된다. 손으로 한 번 확인하고 되돌린다.
- `packages/visualization/README.md` 에 "표본이 있는 템플릿만 본다"는 문장이 남아 있지 않다.
- 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T17:18 · s:04d9de55 — `전략` 섹션 교체
- 2026-10-08T17:18 · s:04d9de55 — `실행 계획` 섹션 교체
- 2026-10-08T17:18 · s:04d9de55 — `검증` 섹션 교체
- 2026-10-08T17:35 · s:04d9de55 — `전략` 섹션 교체
- 2026-10-08T17:36 · s:04d9de55 · S1 doing — 착수
- 2026-10-08T17:37 · s:04d9de55 · S1 done — foundations 에 vizPaintGateCoverage.ts·.test.ts — 누락·중복·없는 이름·렌더 불일치·matrix key 검사. 실패 주입 8건 초록, 템플릿 이름 68개 읽기 확인, 실제 저장소 검사는 표본 파일이 없어 빨강(69건: 파일 없음 + 누락 68)
