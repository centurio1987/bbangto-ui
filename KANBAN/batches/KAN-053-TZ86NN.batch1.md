---
card: KAN-053-TZ86NN
batch: 1
created: 2026-10-06
branch: KAN-053-TZ86NN
status: 계획
steps: S1, S2
---

# KAN-053-TZ86NN 배치1 — 키보드 테스트를 먼저 세우고 Modal에서 공용 훅을 뺀다

카드: [KAN-053-TZ86NN.md](../cards/KAN-053-TZ86NN.md) · 범위 `S1` · `S2`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S1` 키보드 play 테스트 먼저

동작 기준은 WAI-ARIA APG(W3C의 위젯별 키보드 동작 지침)의 Dialog·Tabs·Select-only Combobox 패턴이다. 기존 스토리는 건드리지 않고 키보드 전용 스토리를 덧붙인다.

| 파일 | 새 스토리 | 확인하는 것 |
|---|---|---|
| `apps/storybook/src/stories/Drawer.stories.tsx` (신설) | `Default` + `Keyboard` | 트리거 버튼으로 열면 포커스가 패널 안으로 간다 · Tab/Shift+Tab이 패널 안에서 돈다 · Esc로 닫힌다 · 닫히면 포커스가 트리거로 돌아온다 · `aria-labelledby`가 제목을 가리킨다 |
| `apps/storybook/src/stories/Tabs.stories.tsx` | `Keyboard` · `KeyboardVertical` | Tab 정지점이 선택된 탭 하나(`tabindex="0"`이 하나) · →/←가 이동하며 선택도 옮긴다 · 끝에서 처음으로 돈다 · Home/End · 비활성 탭은 건너뛴다 · 세로 방향은 ↓/↑ · 각 탭의 `aria-controls`가 가리키는 `role="tabpanel"` 요소가 DOM에 있다 · 선택된 패널의 `aria-labelledby`가 그 탭 id다 · 비선택 패널의 **내용은 DOM에 없다**(마운트 동작 유지) · 사용자 `onClick`을 넘겨도 선택되고 `onClick`도 불린다 |
| `apps/storybook/src/stories/Select.stories.tsx` | `Keyboard` · `KeyboardDisabled` | Tab으로 `combobox`에 닿는다 · `aria-label`을 넘기면 combobox의 이름이 된다 · ↓/Enter/Space로 열린다 · 열리면 `aria-activedescendant`가 옵션 id를 가리킨다 · ↓/↑/Home/End로 활성 옵션이 옮겨지고 비활성 옵션은 건너뛴다 · Enter로 고르면 `onChange` 값이 맞고 닫히며 포커스는 combobox에 남는다 · Esc로 닫히고 포커스가 남는다 · 글자를 치면 그 글자로 시작하는 옵션이 활성 · `aria-controls`가 listbox id · 비활성 Select는 `aria-disabled="true"`이고 Tab으로 안 닿는다 · `error`면 combobox에 `aria-invalid` |

테스트는 해당 스토리 파일만 골라 돌린다. 기존 스토리가 초록인지는 같은 파일의 나머지 스토리와 `Modal.stories.tsx`로 본다.

**완료 기준**: 새 키보드 스토리가 **키보드 단정에서** 빨강(렌더 실패나 import 오류로 빨간 것은 인정하지 않는다). 기존 스토리는 전부 초록.

### WP2 · `S2` 공용 훅 추출 + Modal 교체

`packages/core/src/a11y/`에 훅 넷과 `index.ts`를 둔다. **공개 export(`packages/core/src/index.ts`)에는 넣지 않는다.**

| 훅 | 하는 일 | 처음 쓰는 곳 |
|---|---|---|
| `useEscapeKey(active, onEscape)` | 켜져 있을 때 Esc를 받으면 부른다 | Modal(이 WP) · Drawer(S3) |
| `useFocusTrap(ref, active)` | 켜질 때 직전 포커스를 기억하고 패널로 옮김 · Tab/Shift+Tab 가두기 · 꺼질 때 복귀. 포커스 대상 선택자는 Modal의 지금 문자열을 그대로 쓴다 | Modal(이 WP) · Drawer(S3) |
| `useRovingFocus({ orientation, loop })` | 화살표·Home/End로 다음 대상 index를 계산해 돌려준다. 비활성 항목은 건너뛴다 | Tabs(S3) · Select(S4) |
| `useTypeahead(items, onMatch)` | 글자 입력을 잠깐 모아 그 문자열로 시작하는 항목을 찾는다 | Select(S4) |

Modal은 `handleKeyDown`의 Esc·Tab 처리와 열고 닫을 때의 포커스 effect를 `useEscapeKey`·`useFocusTrap`으로 바꾼다. `loading` 중에는 Esc를 무시하는 지금 동작을 그대로 둔다.

**완료 기준**: `Modal.stories.tsx` 전부 초록(Esc 단정 포함). `grep -n "onKeyDown" packages/core/src/components/Modal.tsx`가 인라인 키 처리 대신 훅을 쓴다는 것을 보인다. `packages/core/src/index.ts`에 변경 없음.

## 2. 의존과 순서

`S1 → S2`는 엄격한 순서다. `CLAUDE.md` 규약이 테스트 선행이고, S2를 먼저 하면 Drawer·Tabs·Select 테스트가 빨간 것을 한 번도 못 보고 지나간다.

S2 안에서는 훅을 먼저 쓰고 Modal을 나중에 바꾼다. Modal이 이미 동작하는 유일한 구현이라 훅이 맞는지 확인할 기준이 Modal 스토리뿐이다.

배치 밖 의존: 없음. `dep-check` 기준으로 이 카드의 겹침은 KAN-055(배포)뿐이고 이 카드가 선행이다. KAN-054(나머지 11곳)가 이 배치의 훅을 이어 쓴다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 고친 core가 테스트에 안 보인다 | play가 옛 DOM을 단정하며 실패한다. 캐시 문제라는 힌트가 없다 | Storybook은 core의 `dist`를 읽고 Vite가 그것을 미리 묶어 캐시한다. core를 고칠 때마다 `pnpm --filter @centurio1987/bbangto-ui-core build` 후 `rm -rf node_modules/.cache/storybook apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite`를 하고 돌린다 |
| S1 테스트가 엉뚱한 이유로 빨갛다 | 스토리 렌더 단계나 `findByRole`에서 멈춘다 | 완료 기준대로 키보드 단정에서 실패하는지 메시지를 확인한다. 아니면 테스트부터 고친다 |
| Modal 교체가 동작을 바꾼다 | Modal 스토리의 포커스·Esc 단정 실패 | 선택자 문자열·`requestAnimationFrame` 포커스 이동·`loading` 조건을 그대로 옮긴다. 안 되면 `kan/KAN-053-TZ86NN/S1` 태그로 되돌린다 |
| `useRovingFocus`·`useTypeahead`는 이 배치에서 검증되지 않는다 | Modal이 두 훅을 안 쓴다 | 이 배치에서는 타입 검사만 통과시키고, 동작 확인은 S3·S4의 Tabs·Select 테스트가 맡는다. 배치2에서 API를 고칠 수 있다는 전제로 둔다 |

되돌리기 어려운 지점은 없다. work마다 `kan/KAN-053-TZ86NN/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**배치를 둘로 나눈다.** work 4개는 `batch_size_works` 기본값(3~4) 안이지만, 이 카드는 work마다 core 빌드 → 캐시 삭제 → chromium 테스트를 한 바퀴씩 돌아야 해서 work 하나가 문서 카드보다 무겁다. S2가 끝나면 훅의 API가 정해지고 Modal로 검증되므로, 거기가 다음 세션이 맥락 없이 이어받기 좋은 경계다.

**수행 관점: 유저 선택 대기.** 두 관점을 나란히 놓으면 이렇다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 2 | 1 | 순차라 시간이 더 든다. 대신 빌드·캐시·테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 2 | 배치1의 S1에서 3(컴포넌트별 테스트), 배치2의 S3·S4에서 2 | 한 체크아웃의 core `dist`와 Vite 캐시를 함께 쓰므로 테스트 실행은 어차피 한 줄로 세워야 한다. 줄어드는 것은 코드를 쓰는 시간뿐이고, 서브에이전트마다 워크트리를 따로 두면 `pnpm install`과 core 빌드가 폭만큼 반복된다 |
