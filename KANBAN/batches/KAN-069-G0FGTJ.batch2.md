---
card: KAN-069-G0FGTJ
batch: 2
created: 2026-10-10
branch: KAN-069-G0FGTJ
status: 계획
steps: S4, S5, S6
---

# KAN-069-G0FGTJ 배치2 — 쓰일 자리가 없는 토큰 28개를 걷고 감사를 실제 글자색으로 옮긴다

카드: [KAN-069-G0FGTJ.md](../cards/KAN-069-G0FGTJ.md) · 범위 `S4` · `S5` · `S6`
선행: [배치1](KAN-069-G0FGTJ.batch1.md) (이 카드의 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치가 끝나도 그림은 거의 그대로다. 걷는 잎은 그림 코드가 원래 안 읽던 것이다. 바뀌는 것은 접근성 감사를 통과시키려고 `on` 덮어쓰기를 넣는 가이드뿐이고, 지금 확인된 것은 `darkluxe-01` 하나다.

## 1. 작업 패키지

### WP1 · `S4` 걷기

| 파일 | 바꾸는 것 |
|---|---|
| `packages/tokens/src/visualization.ts` | `VizNodeSemanticStyle` 의 `tagColor`·`glyph`·`dashed`, `c4.*.labelColor`, `typography.titleWeight`·`sizes`, `iconStyle`, `spacing`, `motion` 을 지운다 |
| `packages/visualization/src/tokens/base.ts`·`types.ts` | base 값과 viz 쪽 타입 별칭에서 같은 잎을 지운다 |
| `packages/visualization-style-guide-catalog/src/_foundation.ts` | 공용 헬퍼가 만드는 노드 스타일에서 지운다 |
| 카탈로그 가이드 30개 | 같은 잎을 지운다. 지침 문자열 셋(pixelRetro·neumorphicSoft·kawaiiPastel)의 「`node.tagColor` / `c4.labelColor`」 문장을 실제 글자색 규칙으로 고친다 |
| `packages/visualization-style-guide-catalog/src/accessibilityAudit.ts`·`accessibility.test.ts` | 감사 (A)·(B) 자리를 `visualizationFoundationToStyleObject` 가 낸 `--bbangto-viz-on-node-*`·`--bbangto-viz-on-c4-*` 대비로 바꾼다 |
| 감사에 걸리는 가이드 | `on` 덮어쓰기로 선언을 지킨다. 확인된 곳은 `darkluxe-01` `oxblood` 의 노드 일곱(5.87~6.66, 선언 aaa)이고 넣을 색은 저자가 tagColor 에 적었던 `#EDE3CE` 다 |
| `apps/storybook/src/stories/_vizCatalogStory.tsx` | 4번 검사(tagColor 대 fill)를 실제 글자색 대 fill 로 바꾼다. preset 불변식(326~332행)에서 걷은 잎을 뺀다 |

**완료 기준**: `tokenUsage.test.ts` 초록(남은 잎 58개 전부 읽힘), `pnpm build`·`pnpm typecheck` 초록, catalog `accessibility.test.ts` 초록(over-claim 0).

### WP2 · `S5` 문서와 changeset

| 파일 | 바꾸는 것 |
|---|---|
| `packages/tokens/src/visualization.ts` | 잇는 필드 넷(`boundary`·`c4.*.borderWidth`·`edge.marker.size`·`canvas.gridUnit`)의 JSDoc — 어디에 쓰이고 어떤 prop 이 덮는가 |
| 루트 `README.md` | 사용자 가이드 만들기 예시(1014·1032행 부근)의 `tagColor`, 접근성 감사 설명(1135~1137행)을 실제 글자색 규칙으로 |
| `packages/visualization/viz-style-expansion.md` | 307행 preset 불변 목록, 376행 `tagColor↔fill` |
| `packages/visualization/style-classification.md` | F2 행의 `tagColor` 서술 |
| `.changeset/kan-069-unused-viz-tokens.md` | tokens·visualization·visualization-style-guide-catalog major. 바뀐 그림(배치1)과 지운 필드 목록, 옮길 곳(`tagColor` → `on.node.<kind>.fill`) |

**완료 기준**: 카드 「검증」 3번의 grep 이 0줄이다.

### WP3 · `S6` 품질 게이트

`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit` 를 이 순서로 `bash -c` 에서 돌린다. 앞서 storybook 캐시 두 곳을 지운다. 그 뒤 `TokenWiringGate` 만 `a11y: { test: 'error' }` 로 임시 강제해 돌리고 되돌린다.

**완료 기준**: 다섯 다 초록, a11y 강제 결과를 수행 내역에 적는다.

## 2. 의존과 순서

S4 → S5 → S6 차례다. S5 의 changeset 은 S4 에서 실제로 지운 목록을 옮겨 적는다.

오케스트레이션으로 돌리면 S4 의 카탈로그 30개를 서브에이전트 둘에 15개씩 나눌 수 있다. 다만 지우는 일이 기계적이라 스크립트 한 번이 더 빠르고, 둘로 나누면 같은 `_foundation.ts`·감사 파일을 함께 고친다. 이 배치도 단일 에이전트를 추천한다.

## 3. 리스크

- 감사를 실제 글자색으로 옮기면 `darkluxe-01` 말고도 걸리는 가이드가 나올 수 있다(지금은 노드 면이 불투명 hex 인 곳만 쟀다). 나오면 같은 방식(`on` 덮어쓰기에 저자 색)으로 맞추고 수행 내역에 적는다. 저자 색도 선언에 못 미치면 덮어쓰지 않고 멈춰서 유저에게 묻는다.
- 공개 타입에서 필드를 지우므로 소비자의 가이드 정의가 컴파일 오류를 낸다. changeset 에 옮길 곳을 함께 적는다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->
