---
card: KAN-083-JSQKF4
title: viz 진한 면 위 글자색 변수와 terminal-ascii Node 래퍼의 면 색 따르기 — publish-report 조립층을 bbangto 계약으로 칠하기 위한 확장
created: 2026-11-24
scope: packages/tokens/src/visualization.ts, packages/visualization/src/tokens/**, packages/visualization/README.md, packages/visualization-style-guide-catalog/src/**, apps/storybook/src/stories/visualization/NodeWrapperFillGate.stories.tsx, .changeset/**
---

# KAN-083-JSQKF4 — viz 진한 면 위 글자색 변수와 terminal-ascii Node 래퍼의 면 색 따르기 — publish-report 조립층을 bbangto 계약으로 칠하기 위한 확장

## 전략
publish-report 스킬은 조립층(viz 도식 부품) 색칠을 bbangto 계약으로 옮긴다. 계약은 기본 면 · 선은 비워 두고, 그 밖의 면 · 선은 `vvar()` CSS 변수로, 면 위 글자는 그 면의 on 변수로 칠하는 것이다. 이렇게 맞춰 보면 bbangto-ui 에 없는 표현이 둘이고, 이 카드는 그 둘만 bbangto-ui 에 더한다. 스킬 쪽 교체는 새 버전이 배포된 뒤 publish-report 가 한다(계획 정본 `~/.claude/plans/publish-report-skill.md` 2026-11-24 절).

첫째는 진한 면 위 글자색이다. 조립층의 진한 칸은 글자색(`shape.stroke`)으로 면을 칠하고 그 위에 글자를 쓴다. on 변수는 지금 palette p1~p8 · `shape.fill` · `canvas.bg` · c4 단계 면 · node 종류별 면에만 있다(`packages/visualization/src/tokens/onInk.ts` `deriveOnInk`). 그래서 publish-report 는 그 글자를 `canvas.bg` 로 칠하고 자체 `[대비]` 가드로 잰다. `shape.stroke` 면을 더해 `--bbangto-viz-on-shape-stroke` 를 내고, 가이드가 값을 직접 적을 칸 `on.shape.stroke` 를 tokens 에 연다. 테마마다 다른 글자색을 줄 수 있는 칸이 이것이다.

둘째는 terminal-ascii 프리셋의 Node 래퍼다. 넘겨받은 면 색을 버리고 늘 `fill="none"` 으로 그린다(`packages/visualization-style-guide-catalog/src/terminalAscii.tsx:194`). README 의 「명시한 prop 이 이긴다」(구현 규약)와 맞지 않고, 다른 래퍼는 `fill={props.fill ?? 'none'}` 형식이다(markerSketchnote · inkLineDuotone). publish-report 는 이 래퍼 때문에 진한 칸에 사각형을 한 겹 덧칠한다. 같은 형식으로 고치고, 같은 문제가 다시 생기지 않게 가이드 30종의 Node 래퍼 전부를 재는 시험을 둔다.

### 버린 대안

| 대안 | 버린 까닭 |
| --- | --- |
| `pickOnInk` 를 공개 API 로 내보낸다 | 소비자가 JS 값으로 글자색을 계산하게 되어 계약(CSS 변수로 칠하기)에서 멀어진다. 면 토큰 하나를 더하는 편이 기존 on 체계와 같다 |
| terminal-ascii 의 무채움을 가이드 규칙으로 두고 publish-report 가 피한다 | 스킬이 래퍼마다 예외를 알아야 하고, 「명시한 prop 이 이긴다」가 래퍼에서만 깨진 채 남는다 |
| Tag · EdgeLabel 래퍼의 글자색 덮어쓰기까지 함께 고친다 | 조립층이 쓰지 않는 부품이고, 프리셋의 글자색은 가이드 정체성에 가깝다. 이 카드 범위 밖으로 둔다 |

### 수행안

| 수행안 | 대가 | 위험 |
| --- | --- | --- |
| **추천** 「순차 진행」 — 한 세션이 S1~S4 를 차례로 | 묶음 1개, 동시에 진행되는 단계 없음 | 게이트(Storybook 시험)가 길다 |
| 「병렬 진행」 — 진한 면 글자색과 래퍼를 나눠 동시에 | 묶음 1개 안에서 S1·S2 와 S3 를 나란히 | 둘이 같은 카탈로그 시험 파일을 고칠 수 있어 합치는 일이 생긴다 |

### 정할 것

| 정할 것 | 추천 | 다른 길 |
| --- | --- | --- |
| 1. 버전 올림 — 어느 변경셋으로 낼까 | **추천** tokens · visualization 은 minor, visualization-style-guide-catalog 는 patch. 새 토큰 칸과 새 CSS 변수는 기능 추가이고, 래퍼 수정은 버그 수정이다 | 셋 다 patch |

### 만약

| 만약 | 그러면 | 대응 |
| --- | --- | --- |
| 어느 가이드에서 `shape.stroke` 면의 계산 글자색이 4.5:1 에 못 미친다 | 카탈로그 on 시험이 그 가이드 이름으로 실패한다 | 계산은 검정 · 흰색까지 내려가므로 불투명 면에서는 늘 넘는다. 반투명 `shape.stroke` 면이면 그 가이드 `on.shape.stroke` 에 값을 적는다 |
| 다른 Node 래퍼도 fill · stroke 를 버린다 | 새 래퍼 시험이 그 가이드 이름으로 실패한다 | 같은 카드에서 같은 형식으로 고친다 |

## 실행 계획
- [x] `S1` 진한 면 글자색 시험을 먼저 쓴다 — viz `onInk.test.ts` 에 `shape.stroke` 계산 · 가이드 덮어쓰기 · `--bbangto-viz-on-shape-stroke` 변수, 카탈로그 `onInk.test.ts` 면 목록에 `shape.stroke`. 완료 기준: 새 시험이 빨갛고 그 까닭이 「없음」이다
- [ ] `S2` 진한 면 글자색을 구현한다 — tokens `on.shape.stroke` 타입, viz `OnInkMap` · `deriveOnInk`, README 의 면 목록. 완료 기준: S1 시험이 초록이고 가이드 30종 전부 4.5:1 이상
- [ ] `S3` Node 래퍼 면 색 시험을 먼저 쓰고 래퍼를 고친다 — 카탈로그 vitest(가이드마다 Node 래퍼에 fill · stroke 를 넘겨 서버 렌더) · Storybook play(chromium 계산값) → `terminalAscii.tsx` 를 `props.fill ?? 'none'` 으로. 완료 기준: 두 시험이 고치기 전에는 terminal-ascii 로 빨갛고, 고친 뒤 초록
- [ ] `S4` 게이트 다섯 · 변경셋 · 품질 체크리스트 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`, `.changeset/kan-083-*.md`. 완료 기준: 다섯이 초록이고 변경셋과 체크리스트가 커밋됨

## 검증
- `pnpm test:unit` — viz `src/tokens/onInk.test.ts`, 카탈로그 `src/onInk.test.ts`(가이드 30종 × `shape.stroke` 면 4.5:1), 새 래퍼 면 색 시험이 통과한다
- `pnpm test` — Storybook `VISUALIZATION/Gates/Node Wrapper Fill` play 가 가이드 전부에서 넘긴 fill · stroke 가 계산값으로 칠해지는지 잰다
- `pnpm typecheck` · `pnpm build`(끝의 번들 크기 게이트 포함) · `pnpm --filter storybook build` 가 초록이다
- 고치기 전 커밋에서 S1 · S3 시험이 빨갛게 실패한 기록이 수행 내역에 있다

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-11-24T11:41 · s:afda4ec4 — `전략` 섹션 교체
- 2026-11-24T11:41 · s:afda4ec4 — `실행 계획` 섹션 교체
- 2026-11-24T11:41 · s:afda4ec4 — `검증` 섹션 교체
- 2026-11-24T11:41 · s:afda4ec4 — `전략` 섹션 교체
- 2026-11-24T11:41 · s:afda4ec4 — `전략` 섹션 교체
- 2026-11-24T11:41 · s:afda4ec4 — `전략` 섹션 교체
- 2026-11-24T12:01 · s:afda4ec4 — 실행 표시 켬 — 승인받은 계획대로 이 세션이 이어 간다
- 2026-11-24T12:01 · s:afda4ec4 · S1 doing — 시작
- 2026-11-24T12:01 · s:afda4ec4 · S1 done — viz onInk.test 에 진한 면 3건 · CSS 변수 1건, 카탈로그 면 목록에 shape.stroke — 구현 전 viz 3건 undefined, 카탈로그 가이드 전부 「변수 없음」으로 실패 확인
