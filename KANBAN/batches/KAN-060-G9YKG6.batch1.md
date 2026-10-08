---
card: KAN-060-G9YKG6
batch: 1
created: 2026-10-08
branch: KAN-060-G9YKG6
status: 계획
steps: S1, S2
---

# KAN-060-G9YKG6 배치1 — 잴 기준을 하나로 모으고 빨간 검사 둘을 먼저 세운다

카드: [KAN-060-G9YKG6.md](../cards/KAN-060-G9YKG6.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 색 값을 하나도 바꾸지 않는다. 미달 31곳을 단위 검사와 브라우저 검사 두 겹의 빨강으로 먼저 드러내고, 배치2가 값을 고칠 때 볼 기준(함수 하나)을 tokens 에 둔다.

## 1. 작업 패키지

### WP1 · `S1` 포커스 대비 게이트

| 파일 | 더하는 것 |
|---|---|
| `packages/tokens/src/contrast.ts` | `FOCUS_CONTRAST_MIN = 3` · `surfaceColors(background)`(base 색들 + 그 위에 합성한 elevated 색들) · `focusContrast(semantic)`(최저 대비와 그 자리, 못 읽으면 `null`) |
| `packages/tokens/src/index.ts` | 위 셋을 배럴로 낸다 |
| `packages/foundations/src/focusContrast.test.ts`(새 파일) | `foundationCatalog` 76개 실제 검사 1건 + 카드 「검증」 절 「게이트 자체 시험」 다섯 |
| `packages/style-guide-catalog/src/accessibilityAudit.ts` | `auditFocusContrast(catalog)` — `auditContrast` 와 같은 모양의 위반 목록(`name`·`presetKey`·`measured`·`against`·`reason`) |
| `packages/style-guide-catalog/src/accessibility.test.ts` | 153개 색 스킴 실제 검사 + core base 3개(`lightFoundation`·`darkFoundation`·`highContrastFoundation`) 실제 검사 + fixture |
| `packages/style-guide-catalog/src/index.ts` | `auditFocusContrast` 를 내보낸다(`auditContrast` 옆) |

실패 메시지에는 색 스킴 이름·지금 값·잰 대비·미달 자리를 함께 낸다. 고칠 사람이 값을 바로 찾게 하려는 것이다.

**완료 기준**: fixture 초록. 실제 검사 둘이 빨강이고, 위반 목록이 전략 「새 값」 표 31건(foundation 21 · style guide 색 스킴 10)과 같다. core base 3개는 위반에 없다. tokens·foundations·style-guide-catalog typecheck 통과.

### WP2 · `S2` 브라우저 확인

| 파일 | 더하는 것 |
|---|---|
| `apps/storybook/src/real-input/mount.tsx` | `mount(ui, foundation = lightFoundation)` — 기존 호출은 그대로 돈다 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | `Button: neon-yellow foundation 에서 Tab 으로 오면 테두리 색이 배경과 3:1 이상` — 실제 Tab 뒤 `outline-color` 를 읽어 provider 의 `--bbangto-semantic-background-base` 와 `contrastRatio` 로 잰다 |
| `apps/storybook/src/stories/_catalogStory.tsx` | `FoundationPresets` 7번 접근성 확인에 `focusContrast(...) >= FOCUS_CONTRAST_MIN` |

**완료 기준**: 새 실제 입력 항목 빨강(약 1.03), 기존 실제 입력 항목 전부 초록. 미달 style guide 9개의 `FoundationPresets` 스토리 빨강, 나머지 42개 초록.

## 2. 의존과 순서

`S1 → S2` 순차다. S2 의 스토리와 실제 입력 항목이 S1 에서 tokens 에 더한 `focusContrast`·`FOCUS_CONTRAST_MIN` 을 가져다 쓰므로, S1 을 끝내고 tokens 를 빌드한 뒤에 S2 를 시작한다.

배치 밖 의존: `dep-check` 기준 다른 미완료 루트와의 겹침은 KAN-055 의 `.changeset/` 하나다(이 카드는 S5 에서 changeset 한 장만 더한다). KAN-057·061·062·063 은 실행 문서가 없어 판정 불가다 — 넷 다 시각화 패키지 카드이고, 이 카드는 시각화 패키지를 건드리지 않는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 위반 목록이 계획 때 잰 31건과 다르다 | 실제 검사의 위반 수·이름이 표와 다름 | 계획 측정은 `tsx` 로 소스를 직접 읽었고 게이트는 vitest 다. 다르면 어느 쪽이 맞는지 색 값을 손으로 다시 재서 정하고 수행 내역에 남긴다 |
| 브라우저가 돌려주는 `outline-color` 형식 | `rgb(…)`가 아니라 `color(srgb …)`·`oklch(…)` 같은 형식이 와서 `contrastRatio` 가 `null` | `null` 이면 실패로 두고(통과로 새지 않게) 형식을 변환하는 작은 함수를 테스트 파일 안에 둔다 |
| tokens 를 고친 dist 가 Storybook 에 안 보인다 | 스토리가 `focusContrast is not a function` | tokens 빌드 뒤 Storybook 캐시 세 곳 삭제(메모리 core-export-vite-cache) |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-060-G9YKG6/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택).** 이 배치의 두 work 를 다음 배치로 미루지 않는다 — S2 가 S1 의 빨강을 브라우저 쪽에서 한 번 더 확인하는 짝이라 같이 닫는다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | 순차라 게이트 시간이 그대로 든다. 대신 tokens dist·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 2 | 이 배치는 1, 배치2 는 2 | S1→S2 는 함수 하나를 이어 써서 나눌 수 없다. 배치2 의 S3·S4 는 나뉘지만 값을 옮겨 적는 일이라 아끼는 시간이 적다 |
