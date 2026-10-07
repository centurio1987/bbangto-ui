---
card: KAN-059-62EAKB
batch: 1
created: 2026-10-07
branch: KAN-059-62EAKB
status: 계획
steps: S1, S2, S3
---

# KAN-059-62EAKB 배치1 — 빨간 테스트 둘을 먼저 세우고 규칙을 하나로 모은다

카드: [KAN-059-62EAKB.md](../cards/KAN-059-62EAKB.md) · 범위 `S1` · `S2` · `S3`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 컴포넌트에 테두리를 하나도 더 달지 않는다. 고칠 자리를 게이트와 실제 입력 테스트 두 겹의 빨강으로 먼저 드러내고, 배치2가 따를 규칙(색·간격·훅)을 한 곳에 정해 둔다.

## 1. 작업 패키지

### WP1 · `S1` 포커스 표시 게이트

KAN-054 의 키보드 게이트와 같은 세 파일에 이어 쓴다.

| 파일 | 더하는 것 |
|---|---|
| `keyboard-coverage.json` | `focusRing` — 항목마다 `component` · `source` · `indicator`(테두리를 그리는 자리: 자기 자신·감싼 상자·트랙 등, 사람이 읽는 값). 전략 표 15자리를 파일 단위로 묶고 KAN-054 셋(Card·Calendar·DatePicker)도 적는다. `focusRingIgnored` — `Menu.tsx` 목록 상자(Tab 으로 닿지 않음) |
| `packages/foundations/src/keyboardCoverage.ts` | 검사 함수 하나. ① 신호(인라인 `outline: 'none'`·스타일 문자열 `outline: none`·`clip: rect(0 0 0 0)`·`clipPath: 'inset(50%)'`)가 나온 core UI 파일이 목록이나 예외에 있는가 ② 목록의 소스가 `FOCUS_RING`·`useFocusVisible`·`:focus-visible` 중 하나를 쓰는가 ③ 실제 입력 테스트에 `<컴포넌트>:` 로 시작하는 `it` 가 있는가 |
| `packages/foundations/src/keyboardCoverage.test.ts` | 실제 저장소 검사 한 건 + 카드 「검증」 절 「게이트 자체 시험」의 다섯 |

신호를 찾는 것은 KAN-054 처럼 정규식이다. TypeScript 파서를 들이지 않는다.

**완료 기준**: fixture 검사 초록. 실제 저장소 검사 빨강이고, 실패 메시지의 파일 목록이 전략 표의 파일과 같다. KAN-054 셋은 위반에 없다.

### WP2 · `S2` 실제 입력 테스트

`apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` 에 이어 쓴다. KAN-054 의 `outlineOf` 를 쓰고, 표시 요소가 포커스 요소와 다른 자리(감싼 상자·트랙·조각·판)는 그 요소를 골라 본다.

| 묶음 | 항목 | 확인 |
|---|---|---|
| 자기 자신 | Button · Link 글자 변형 · Link 상자 변형 · NumberField 증감 · Dock · TreeView · Menu · ScrollArea | Tab → `solid 2px`, 실제 클릭 → `none` |
| 감싼 상자 | Input · Input composer · Textarea · Searchfield · NumberField 입력 · RichTextEditor | Tab → 상자가 `solid 2px`, 벗어나면 `none` |
| 숨긴 입력 | Switch · Radio `segmented` · NumberField `seven-segment` | Tab → 트랙·조각·판이 `solid 2px`, 벗어나면 `none` |

**완료 기준**: 새 항목이 모두 빨강(테두리 `none`), KAN-054 셋은 초록. 빨강이 안 나는 항목이 있으면 그 자리는 이미 표시가 있다는 뜻이므로 표에서 빼고 수행 내역에 남긴다.

### WP3 · `S3` 공용 규칙

- `a11y/focusRing.ts` — `FOCUS_RING` 색을 `semantic.border.focus` 로. 안쪽 간격 변형(`outlineOffset: '-2px'`)을 함께 낸다.
- `a11y/useFocusVisible.ts`(새 파일) — `{ focusVisible, focusProps }` 를 돌려준다. `focusProps.onFocus` 는 `e.target === e.currentTarget && isFocusVisible(e.currentTarget)` 로 켜고, `onBlur` 는 끈다. 소비자 처리기는 `composeHandlers` 로 먼저 돈다. 감싼 상자 자리를 위해 「안쪽 요소가 받은 포커스도 센다」 선택지를 둔다.
- Card·DatePicker 의 손수 쓴 상태를 이 훅으로 바꾼다. Calendar 는 그대로다(날짜 칸마다 판단).
- `blocks/Gallery.tsx:195`·`blocks/Testimonials.tsx:438` 의 `primary` 한 단어를 `border.focus` 로.

**완료 기준**: KAN-054 실제 입력 셋 초록, Card·DatePicker·Calendar·Gallery·Testimonials 스토리 초록, core typecheck 통과.

## 2. 의존과 순서

`S1 → S2 → S3` 순차다. S1 의 게이트가 S2 의 테스트 항목 이름(`<컴포넌트>:`)을 읽고, S3 는 S2 의 KAN-054 셋 항목으로 회귀를 본다.

배치 밖 의존: `dep-check` 기준 다른 미완료 루트와의 겹침은 KAN-055 의 `.changeset/` 하나다(용인, 2026-10-07 유저 선택). KAN-056 과는 겹치지 않고, KAN-057·060 은 실행 문서가 없어 판정 불가다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 신호 정규식이 놓치거나 과하게 잡는다 | 실제 저장소 위반 목록이 전략 표와 다름 | 다르면 표와 정규식 중 어느 쪽이 맞는지 코드를 다시 읽어 정하고 수행 내역에 남긴다 |
| 숨긴 입력의 실제 Tab 이 트랙에 닿는지 확인 안 함 | Switch 항목에서 `document.activeElement` 가 input 이 아님 | 포커스 요소와 표시 요소를 나눠 단정한다. 포커스가 안 들어가면 그것은 키보드 결함이라 멈추고 보고한다 |
| 고친 dist 가 테스트에 안 보인다 | play·실제 입력이 옛 결과로 통과·실패 | core 빌드 뒤 Storybook 캐시 세 곳 삭제(메모리 core-export-vite-cache) |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-059-62EAKB/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-07 유저 선택).**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | 순차라 게이트 시간이 그대로 든다. 대신 core dist·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 2 | 이 배치는 1 | S1·S2·S3 가 서로의 결과를 읽어 나눌 수 없다. 병렬은 배치2 에서만 생긴다 |
