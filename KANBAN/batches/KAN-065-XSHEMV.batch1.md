---
card: KAN-065-XSHEMV
batch: 1
created: 2026-10-08
branch: KAN-065-XSHEMV
status: 계획
steps: S1, S2
---

# KAN-065-XSHEMV 배치1 — 모티프 CSS 를 꺼내 재는 검사와 브라우저 확인을 빨강으로 먼저 세운다

카드: [KAN-065-XSHEMV.md](../cards/KAN-065-XSHEMV.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 style guide 색을 하나도 바꾸지 않는다. 모티프 포커스 미달 10건과 없는 semantic 변수 5줄을 단위 검사로 먼저 드러내고, 계산이 브라우저와 같은지 실제 Tab 한 건으로 대조한다.

## 1. 작업 패키지

### WP1 · `S1` 모티프 포커스 대비 게이트와 없는 변수 검사

| 파일 | 더하는 것 |
|---|---|
| `packages/style-guide-catalog/src/_motif.tsx` | 래퍼 → CSS 대응표(`WeakMap`)와 `motifCssOf(wrappers)`. 배럴에는 안 낸다 |
| `packages/style-guide-catalog/src/accessibilityAudit.ts` | 포커스 선언을 꺼내는 함수(`:focus` 선택자의 `outline`·`outline-color`·`box-shadow`, `outline: none` 건너뜀)와 `auditMotifFocusContrast` — `var()` 를 색 스킴 변수(semantic + 확장)로 풀고, 없으면 대체값. `surfaceColors`·`contrastRatio` 로 재서 `auditFocusContrast` 와 같은 모양의 위반 목록 |
| `packages/style-guide-catalog/src/accessibility.test.ts` | fixture(카드 「검증」 절 「게이트 자체 시험」) + 실제 검사(51개 style guide × 색 스킴) + CSS 를 찾은 style guide 수 51 확인 + 없는 변수 검사를 모든 줄로 넓힘 |

실패 메시지에는 style guide·색 스킴·선택자·잰 색·대비를 함께 낸다. 고칠 사람이 그 줄을 바로 찾게 하려는 것이다.

**완료 기준**: fixture 초록. 모티프 포커스 실제 검사 빨강, 위반이 전략 「문제」 표 10건과 같다. 없는 변수 검사 빨강, 위반이 5줄과 같다. style-guide-catalog typecheck 통과.

### WP2 · `S2` 브라우저 확인

| 파일 | 더하는 것 |
|---|---|
| `apps/storybook/src/real-input/mount.tsx` | style guide 와 색 스킴을 받는 마운트(`StyleGuideProvider`) — 기존 `mount` 는 그대로 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | 「Neobrutalism default 모티프 Button 에 Tab 으로 오면 테두리 색이 배경과 3:1 이상」 — 실제 Tab 뒤 `outline-color` 를 읽어 provider 의 표면 변수와 `focusContrast` 로 잰다(KAN-060 항목과 같은 방식) |

**완료 기준**: 새 항목 빨강(약 1.47), 기존 실제 입력 항목 전부 초록.

## 2. 의존과 순서

`S1 → S2` 순서로 한다. S2 는 S1 의 계산이 브라우저와 같은지 대조하는 짝이라, S1 의 위반 목록(Neobrutalism default 1.47)이 나온 뒤에 그 값과 견준다. 파일은 겹치지 않는다.

배치 밖 의존: `dep-check` 기준 다른 미완료 루트와의 겹침은 KAN-055 의 `.changeset/` 하나다(이 카드는 S5 에서 changeset 한 장만 더한다). KAN-057·062 는 실행 문서가 없어 판정 불가다. KAN-064(매니페스트) 는 style-guide-catalog 의 `manifest.ts`·`scripts/` 를 고치고, 이 카드는 그 파일을 안 건드린다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 위반 목록이 계획 때 잰 10건과 다르다 | 실제 검사의 위반 수·이름이 표와 다름 | 계획 측정은 `tsx` 로 React 훅을 가짜로 돌려 CSS 를 꺼냈고 게이트는 `motifCssOf` 다. 다르면 색 값을 손으로 다시 재서 어느 쪽이 맞는지 정하고 수행 내역에 남긴다 |
| 래퍼 객체가 style guide 에 그대로 실리지 않는 파일이 있다 | CSS 를 찾은 수가 51 미만 | 그 파일이 래퍼를 펼치거나 감쌌다는 뜻이다. 대응표 키를 래퍼의 `Button` 컴포넌트로 바꿔 다시 본다 |
| 브라우저가 돌려주는 `outline-color` 형식 | `contrastRatio` 가 `null` | KAN-060 항목과 같은 방식이라 거기서 통했다. `null` 이면 실패로 둔다 |
| style-guide-catalog dist 가 Storybook 에 안 보인다 | 마운트에서 새 함수가 없다고 나옴 | 빌드 뒤 Storybook 캐시 세 곳 삭제(메모리 core-export-vite-cache) |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-065-XSHEMV/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택).** 이 배치의 두 work 를 다음 배치로 미루지 않는다 — S2 가 S1 의 계산을 브라우저 쪽에서 대조하는 짝이라 같이 닫는다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | 순차라 게이트 시간이 그대로 든다. 대신 dist·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 2 | 이 배치는 2(S1·S2), 배치2 는 2(S3·S4) | S2 는 S1 의 값과 견줄 때 뜻이 있어 나눠도 대조는 뒤에 한다. 배치2 의 S3·S4 는 파일이 안 겹치지만 각각 몇 줄이라 아끼는 시간이 적고, 게이트 5종은 어차피 한 워크트리에서 한 번 돈다 |
