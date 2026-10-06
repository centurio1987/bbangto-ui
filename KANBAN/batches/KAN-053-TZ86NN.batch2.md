---
card: KAN-053-TZ86NN
batch: 2
created: 2026-10-06
branch: KAN-053-TZ86NN
status: 계획
steps: S3, S4
---

# KAN-053-TZ86NN 배치2 — Drawer·Tabs·Select에 훅을 붙이고 게이트 5종을 통과시킨다

카드: [KAN-053-TZ86NN.md](../cards/KAN-053-TZ86NN.md) · 범위 `S3` · `S4`
선행: [배치1](KAN-053-TZ86NN.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S3` Drawer·Tabs 적용

- **Drawer**: `useEscapeKey` + `useFocusTrap`. `onClose`를 Esc에 잇는다. `aria-labelledby`·`aria-label`은 지금처럼 `...props`로 패널에 그대로 간다는 것을 테스트로 고정한다. 닫히는 애니메이션 동안 패널이 남아 있으므로 포커스 복귀는 언마운트가 아니라 `isOpen`이 꺼지는 순간에 한다(Modal과 같다).
- **Tabs**: `Tabs`에서 `useId`로 기준 id를 만들어 context에 싣는다. 탭 id·패널 id는 기준 id와 `value`로 만든다(`value`에 공백이 있어도 안전하게 바꾼다). `TabsList`가 `useRovingFocus`로 키를 받아 다음 탭에 포커스와 선택을 함께 옮긴다. `TabsTrigger`는 선택됐을 때만 `tabIndex=0`, 아니면 `-1`이고, 사용자 `onClick`은 `{...props}`에 덮이지 않게 내부 선택 뒤에 부른다. `TabsContent`는 비선택일 때 `hidden` 빈 껍데기만 그리고 내용은 그리지 않는다.

**완료 기준**: `Drawer.stories.tsx`·`Tabs.stories.tsx`의 새 키보드 스토리 초록 + 두 파일의 기존 스토리 초록. Select 키보드 스토리는 아직 빨강.

### WP2 · `S4` Select 적용 + changeset + 게이트

- **Select**: combobox `div`에 `tabIndex` (비활성이면 `-1`), `aria-controls`(listbox id), `aria-activedescendant`(열려 있을 때 활성 옵션 id), `aria-disabled`, `aria-invalid`(지금은 바깥 컨테이너에 있다)를 둔다. `aria-label`·`aria-labelledby`는 바깥 컨테이너가 아니라 combobox로 보낸다. 키 처리는 닫힘 상태에서 ↓/↑/Enter/Space로 열기, 열림 상태에서 `useRovingFocus`로 활성 옵션 이동·Enter로 선택·Esc로 닫기, 양쪽 모두 `useTypeahead`. 포커스는 내내 combobox에 있다(옵션으로 옮기지 않는다).
- **changeset**: `.changeset/kan-053-keyboard-a11y.md`, `@centurio1987/bbangto-ui-core` minor. 바뀌는 동작(Tabs의 화살표가 선택도 옮긴다 · 비선택 패널 껍데기가 DOM에 생긴다 · Select가 Tab 순서에 들어간다)을 소비자 기준으로 적는다.
- **게이트 5종**: `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**완료 기준**: 다섯 전부 초록. 그 뒤 키보드만으로 Storybook에서 세 컴포넌트를 한 번씩 써 보고 결과를 수행 내역에 남긴다.

## 2. 의존과 순서

`S3`과 `S4`는 파일이 겹치지 않는다(Drawer·Tabs 대 Select). 다만 둘 다 배치1의 `useRovingFocus`를 처음 실제로 쓰므로, S3에서 훅 API를 고치면 S4가 그 결과 위에서 시작해야 한다. 그래서 순서는 `S3 → S4`로 둔다.

게이트 5종은 S4의 마지막에 한 번 돈다. `pnpm test`가 전체 play 테스트라 가장 오래 걸린다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| Tabs·Select를 쓰는 다른 스토리가 깨진다 | `pnpm test`에서 해당 스토리 밖 실패 | 저장소 안 사용처는 각자의 스토리 파일 하나씩이다(2026-10-06 `grep` 확인). 기존 단정 `findByRole('tabpanel')`은 `hidden` 요소를 기본으로 빼므로 계속 하나만 찾는다 |
| Select 클릭 동작이 바뀐다 | 기존 Select 스토리 실패 | 바깥 클릭 닫기(`mousedown`)와 옵션 클릭 선택은 그대로 두고 키 처리만 더한다 |
| KAN-051(번들 트리 셰이킹)과 숨은 연결 | 경로는 안 겹치지만 KAN-051이 넣을 크기 상한 게이트가 core 크기를 잰다 | 이 카드가 더하는 것은 훅 넷과 컴포넌트 수정이라 수 KB 수준으로 본다(측정 안 함). KAN-051이 먼저 병합되면 그 게이트로 실제 크기를 확인한다 |
| `pnpm test`가 예산을 먹는다 | S4가 길어진다 | 배치를 둘로 나눈 이유가 이것이다. 실패하면 이 카드와 무관한 선행 실패인지부터 가른다 |

되돌리기 어려운 지점은 없다. changeset은 파일 하나이고 배포는 KAN-055가 맡는다.

## 4. 착수 시점 판단

**배치1 직후 같은 세션에서 이어 간다(2026-10-06).** 배치1은 core 빌드 한 번과 스토리 4개 파일 테스트 몇 바퀴로 끝났고(한 바퀴 약 4초), 세션 예산을 거의 쓰지 않았다. `useRovingFocus`는 "다음 index를 돌려주고 이동은 위젯이 정한다"는 API라, Tabs(DOM 포커스)와 Select(`aria-activedescendant`)에 그대로 쓸 수 있다. 고쳐야 할 신호는 없다.

S4를 다음 배치로 미루지 않는다. 남은 것이 Select 한 파일과 changeset, 게이트 실행이고 게이트는 S3·S4가 함께 끝나야 의미가 있다.

배치1에서 넘어온 확인 하나: Modal 스토리는 포커스 가두기·복귀를 검사하지 않으므로, `useFocusTrap`의 그 두 동작은 S3의 Drawer 키보드 테스트가 처음 확인한다.
