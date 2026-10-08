---
card: KAN-063-Q85EET
batch: 2
created: 2026-10-08
branch: KAN-063-Q85EET
status: 계획
steps: S3, S4, S5
---

# KAN-063-Q85EET 배치2 — 두 검사를 68개로 넓히고 드러난 것을 정리한다

카드: [KAN-063-Q85EET.md](../cards/KAN-063-Q85EET.md) · 범위 `S3` · `S4` · `S5`
선행: [배치1](KAN-063-Q85EET.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

배치1이 모은 표본 68개를 두 검사에 실제로 넣는다. 리터럴 색 위반은 템플릿을 고쳐 없애고, 글자 대비 미달은 기준 목록에 올려 KAN-061 에 넘긴다.

## 1. 작업 패키지

### WP1 · `S3` 리터럴 검사를 68개로

| 파일 | 바꾸는 것 |
|---|---|
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | `LiteralPaintGate` 가 `PAINT_GATE_FIXTURES` 전부를 그린다. `TARGET_FIXTURES.length === 13` 단언은 표본 누락 검사(S1)가 대신하므로 지운다 |
| `packages/visualization/src/templates/*.tsx` | 위반이 나온 템플릿만. KAN-056 전략의 네 규칙(흰 채움·검정 선 기본값은 지운다 · 회색 연결선은 `edge.stroke` · 뜻 있는 면 색은 팔레트 · 뜻 없는 틴트는 기본 도형색)을 따른다 |

**완료 기준**: `LiteralPaintGate` 가 초록이고 표본마다 비교한 paint 수가 0보다 크다. 고친 템플릿과 줄을 수행 내역에 남긴다. 고친 것이 없으면 없다고 남긴다.

### WP2 · `S4` 글자 대비 검사를 68개 × 가이드 30개로

| 파일 | 바꾸는 것 |
|---|---|
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | `LabelContrastGate` 가 표본 전부를 그린다. 실패 메시지에 새 미달을 기준 목록 형식(`"키": 값,`)으로 함께 내서 옮겨 적기 쉽게 한다 |
| `apps/storybook/src/stories/visualization/_labelContrastBaseline.ts` | 새 미달을 더한다. 머리 주석의 「13개 × 30개」를 「68개 × 30개(KAN-063)」로 고친다 |

**완료 기준**: `LabelContrastGate` 가 초록이고 표본마다 잰 글자 수가 0보다 크다. 글자를 그리지 않는 템플릿이 있으면 그 사유를 표본에 적고 따로 뺀다. 늘어난 항목 수를 템플릿별로 수행 내역에 남긴다.

### WP3 · `S5` 문서와 마무리

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/README.md` | `:142-145` 와 `:187-189` — 모든 템플릿에 표본이 있어야 하고 빠지면 `test:unit` 이 실패한다는 문장으로 |
| `.changeset/kan-063-*.md` | S3 에서 템플릿을 고쳤을 때만. visualization patch |

**완료 기준**: 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`)이 초록이다.

## 2. 의존과 순서

`S3 → S4 → S5` 순차다. S3 에서 템플릿을 고치면 글자나 면 색이 바뀔 수 있으므로, 기준 목록은 S3 이 끝난 뒤의 화면에서 잰다. 템플릿을 고쳤으면 S4 전에 visualization 을 다시 빌드하고 Storybook 캐시를 지운다.

배치 밖 의존: changeset 을 더하면 KAN-055(배포)의 `.changeset/` 과 겹친다. 2026-10-08 유저가 그대로 두기로 정했고 용인을 기록했다(KAN-056·058·059·060 과 같은 처리).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 리터럴·무채색 위반이 많이 나온다 | 위반 템플릿이 다섯 개를 넘는다 | 착수 시점 판단에서 S4·S5 를 배치3으로 미룬다 |
| 기준 목록이 크게 늘어난다 | 지금 약 200곳. 늘어날 수는 확인 안 함 | 형식을 바꾸지 않는다. 템플릿별 수를 남겨 KAN-061 이 우선순위를 정하게 한다 |
| 템플릿을 고치면 다른 미완료 카드와 같은 파일을 건드린다 | KAN-057(대시 토큰)·KAN-062(속성 안 var())는 실행 문서가 없어 겹침을 판정할 수 없다 | 고친 파일 목록을 수행 내역에 남긴다. 두 카드가 착수할 때 그 목록을 본다 |
| 검사 시간이 늘어난다 | `testTimeout` 60초 초과 | 지금 0.5초라 가능성은 낮다. 넘치면 가이드 묶음으로 스토리를 나눈다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-063-Q85EET/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택, 배치1과 같다).** 이 배치는 오케스트레이션을 골라도 병렬 폭이 1이다 — S3 의 수정이 S4 의 측정에 들어가고 S5 는 둘의 결과를 문서로 옮기는 일이라 나눌 자리가 없다.
