---
card: KAN-054-M48FNQ
batch: 1
created: 2026-10-07
branch: KAN-054-M48FNQ
status: 계획
steps: S1, S2, S3
---

# KAN-054-M48FNQ 배치1 — 게이트 둘을 먼저 세우고 합성 규칙을 맞춘다

카드: [KAN-054-M48FNQ.md](../cards/KAN-054-M48FNQ.md) · 범위 `S1` · `S2` · `S3`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치에서는 컴포넌트 결함을 하나도 고치지 않는다. 배치2·3이 고칠 자리를 빨간 테스트로 먼저 드러내고, 고칠 때 따를 규칙(합성 도우미)을 정해 둔다.

## 1. 작업 패키지

### WP1 · `S1` 정적 키보드 커버리지 게이트

`metadataCoverage.ts`/`.test.ts`와 같은 짜임으로 세 파일을 만든다.

| 파일 | 내용 |
|---|---|
| `keyboard-coverage.json` (루트) | 항목마다 `component` · `source`(core 파일) · `story`(스토리 파일) · `keyboardStories`(키보드 스토리 이름 목록) · `behaviors`(APG 기준 필요한 동작, 사람이 읽는 값) · `realInput`(true/false). 전략 표 14개 + KAN-053의 4개 = 18개를 이 단계에서 다 적는다 |
| `packages/foundations/src/keyboardCoverage.ts` | 검사 함수. ① 누락 검사: core `components/*.tsx`에서 지정 role이나 「네이티브 아닌 소문자 요소 + `onClick`」을 찾아, 목록에 없는 파일을 위반으로 낸다 ② 테스트 검사: 각 항목의 `keyboardStories`가 스토리 파일에 `export const <이름>`으로 있고 그 블록의 play에 `userEvent.keyboard`/`userEvent.tab`이 있는지 ③ 실제 입력 표시: `realInput` 항목이 `apps/storybook/src/real-input/`의 테스트에 있는지 |
| `packages/foundations/src/keyboardCoverage.test.ts` | 실제 저장소 검사 + fixture 실패 주입(검증 절 「게이트 자체 시험」의 앞 셋) |

스토리 블록을 정확히 자르는 것은 정규식으로 한다(다음 `export const`까지). TypeScript 파서를 들이지 않는다 — foundations에 의존성을 늘리지 않기 위해서다.

**완료 기준**: `pnpm --filter @centurio1987/bbangto-ui-foundations test`에서 fixture 검사 초록, 실제 저장소 검사 빨강. 빨간 항목 목록이 전략 표의 14개와 같다(테스트 실패 메시지에 항목 이름이 모두 보여야 한다). KAN-053의 4개는 위반에 없다.

### WP2 · `S2` 실제 키 입력 게이트

1. **수단부터 확인한다.** `apps/storybook/vite.config.ts`에 `real-input` 프로젝트(브라우저 모드, chromium, include `src/real-input/**/*.realinput.test.tsx`)를 더하고, Modal 한 항목만 쓴다 — 트리거에 포커스 → `userEvent.keyboard('{Enter}')`(`vitest/browser`) → 포커스가 `role="dialog"` 안에 있는지.
2. `useFocusTrap.ts`의 프레임 재시도를 잠시 한 번 시도로 바꾸고, core 빌드 → 캐시 삭제 → 그 항목이 **빨강**인지 본다. 결과를 수행 내역에 남기고 되돌린다(커밋하지 않는다).
3. 빨강이 나오면 Drawer·Select·Tabs 항목을 더한다. 나오지 않으면 이 WP를 멈추고 전략 「접근 2」의 대안(빌드한 Storybook에 Playwright)을 유저에게 묻는다.

스토리는 `composeStories`로 다시 쓴다. preview 설정이 무거워 안 붙으면 컴포넌트를 `createRoot`로 직접 그린다.

**완료 기준**: `pnpm test`가 `storybook`·`real-input` 두 프로젝트를 다 돌고 초록. 재시도를 걷어낸 상태에서 Modal 항목이 빨강이었다는 기록이 수행 내역에 있다. 커버리지 게이트의 `realInput` 검사에서 Modal·Drawer·Select가 빠진다(Popover·DropdownMenu·DatePicker는 배치2에서 빠진다).

### WP3 · `S3` 합성 규칙 통일

1. **테스트 먼저**: `Modal.stories.tsx`에 외부 `onKeyDown`이 Esc에 `preventDefault`를 하면 열린 채로 남는 스토리, `Select.stories.tsx`에 외부 `onKeyDown`이 ArrowDown을 막으면 목록이 안 열리는 스토리. 둘 다 빨강이어야 한다(지금 Modal은 막아도 닫히고, Select는 외부 콜백이 나중에 돈다).
2. `packages/core/src/a11y/composeHandlers.ts` — `composeHandlers(external, internal)`: 외부를 부르고 `e.defaultPrevented`면 멈춘다. `a11y/index.ts`에서 내보낸다(공개 export에는 넣지 않는다).
3. 다섯 갈래를 바꾼다: Modal·Drawer·Tabs·Select(외부 `onKeyDown`을 트리거로)·Card·Searchfield·Carousel·DropdownMenu 트리거, 그리고 `{...props}`가 덮어쓰던 TreeView·MenuItem·FileUploader avatar(키)·Tooltip(포커스·마우스). 덮어쓰기는 해당 핸들러를 구조 분해로 꺼내 합성한다.

**완료 기준**: 두 스토리 빨강 → 초록. 기존 스토리 전부 초록(특히 Tabs·Drawer·Card·Searchfield·Carousel·TreeView·Menu·Tooltip). `grep -rn "onKeyDown?.(e)" packages/core/src/components` 0건. `packages/core/src/index.ts` 변경 없음.

## 2. 의존과 순서

`S1 → S2 → S3`이다. S1이 `realInput` 표시를 검사하므로 S2가 그 표시를 지운다. S3는 배치2·3이 컴포넌트를 고칠 때 쓸 도우미를 정하므로 고치기 전에 끝나야 한다. S1과 S2는 서로 다른 패키지(foundations · storybook 설정)라 순서를 바꿔도 되지만, S1의 빨간 목록을 먼저 봐야 S2가 어느 항목을 맡을지 정해진다.

배치 밖 의존: 배치2·3 전부가 S3의 도우미와 S1의 목록을 쓴다. `dep-check` 기준 다른 미완료 루트와의 겹침은 KAN-055(`.changeset/`, 용인)뿐이고 이 배치는 changeset을 쓰지 않는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 실제 입력 수단이 결함을 못 잡는다 | 재시도를 걷어내도 Modal 항목이 초록 | WP2 3)대로 멈추고 유저에게 묻는다. 그 대안은 게이트 명령을 하나 늘리므로 CLAUDE.md·gateDocs가 바뀐다 — 혼자 정할 일이 아니다 |
| `composeStories`가 preview의 `afterEach`·데코레이터와 맞지 않는다 | real-input 테스트가 렌더 단계에서 실패 | 컴포넌트를 직접 그린다. 실제 입력 게이트가 보는 것은 포커스 이동이라 테마 데코레이터가 없어도 된다 |
| 고친 core가 테스트에 안 보인다 | play가 옛 DOM을 단정하며 실패 | core 빌드 후 `rm -rf node_modules/.cache/storybook apps/storybook/node_modules/.cache apps/storybook/node_modules/.vite`(KAN-053 배치1과 같은 대응) |
| 합성 규칙이 외부 앱 동작을 바꾼다 | Esc·Enter에 `preventDefault`를 하던 소비자 | 저장소 안 사용처는 스토리뿐이다. changeset(S6)에 바뀐 동작을 적고, 검토서 판단 항목으로 올린다 |
| 정적 검사의 정규식이 스토리 블록을 잘못 자른다 | 엉뚱한 스토리의 `userEvent`로 통과 | fixture에 「다른 스토리에만 키 입력이 있는」 경우를 넣는다 |

되돌리기 어려운 지점은 없다. work마다 `kan/KAN-054-M48FNQ/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**배치를 셋으로 나눈다.** work 6개를 `batch_size_works` 기본값(3~4)으로 묶으면 둘이 되지만, 배치2의 S4·S5가 컴포넌트 아홉 개를 고치고 각각 core 빌드 → 캐시 삭제 → chromium 테스트를 한 바퀴씩 돈다. S6까지 붙이면 한 세션 예산의 절반을 넘을 것으로 본다(측정한 값은 아니다). 배치1이 끝나면 게이트 둘과 도우미가 서서 다음 세션이 맥락 없이 이어받기 좋은 경계가 된다.

**수행 관점: 단일 에이전트(2026-10-07 유저 선택).**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 3 | 1 | 순차라 시간이 더 든다. 대신 core `dist`·Vite 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 3 | 배치1은 1(게이트와 도우미가 뒤 작업 전부의 전제라 순차), 배치2에서 최대 5(컴포넌트 묶음별), 배치3에서 2 | 한 체크아웃의 core `dist`와 Vite 캐시를 함께 쓰므로 테스트 실행은 어차피 한 줄로 세워야 한다. 줄어드는 것은 코드를 쓰는 시간뿐이다. 서브에이전트마다 워크트리를 따로 두면 `pnpm install`과 core 빌드가 폭만큼 반복되고, 같은 `Menu.tsx`를 Menu·DropdownMenu가 함께 쓰므로 그 둘은 한 에이전트에 묶어야 한다 |

**착수 시(2026-10-07)**: 세 work를 미루지 않고 이 배치에서 끝냈다. S1이 Modal도 빨강으로 잡았다(기존 스토리가 `fireEvent`로만 Esc를 확인) — Modal 키보드 스토리는 S3에서 함께 썼다.
