---
card: KAN-052-BYS4JN
batch: 1
created: 2026-10-06
branch: KAN-052-BYS4JN
status: 계획
steps: S1, S2, S3, S4
---

# KAN-052-BYS4JN 배치1 — Provider 외부 글꼴 선택화 전량

카드: [KAN-052-BYS4JN.md](../cards/KAN-052-BYS4JN.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S1` 테스트 환경과 글꼴 play 테스트 (red)

- `apps/storybook/.storybook/preview.tsx:125-142` 전역 데코레이터가 모든 스토리를 `FoundationProvider` + `VisualizationStyleGuideProvider`로 감싼다. 스토리 parameter `bbangtoProviders: false`면 감싸지 않고 `<Story />`만 낸다.
- 새 파일 `apps/storybook/src/stories/ProviderFonts.stories.tsx`(core)와 기존 `visualization/Provider.stories.tsx`에 글꼴 스토리를 더한다. 글꼴 스토리는 전부 `bbangtoProviders: false`이고, `beforeEach`에서 `bbangto-font-*` id 노드와 `@import`를 담은 `style`을 지운 뒤 렌더한다.
- 세는 범위는 `document` 전체다. 글꼴 하나마다 「`@import`에 그 글꼴 URL이 든 `style`」과 「`bbangto-font-<글꼴>` id 노드」를 함께 센다. 지금 코드는 앞쪽에, 고친 코드는 뒤쪽에 걸리므로 둘 다 세야 고치기 전후를 같은 잣대로 본다.

| 스토리 | 기대 |
|---|---|
| core `fonts="none"` | Pretendard 0 · JetBrains Mono 0 |
| core 기본값 | 각 1 |
| core Provider 둘 겹침 | 각 1 |
| core 안 viz 겹침(둘 다 기본값) | JetBrains Mono 1 |
| core 안 viz 겹침(둘 다 `none`) | 둘 다 0 |
| viz `fonts="none"` 단독 | JetBrains Mono 0 |

**완료 기준**: 새 글꼴 스토리는 빨강(`fonts` prop이 없어 타입 오류가 나거나, 겹침에서 2가 나온다). 그 밖의 기존 스토리는 `pnpm test`에서 전부 초록.

### WP2 · `S2` core 글꼴 주입 통합

- `packages/core/src/internal/ExternalFonts.tsx`를 만든다. `useExternalFonts(mode: 'external' | 'none')` 훅이 `useInsertionEffect`로 `document.head`에 `bbangto-font-pretendard`·`bbangto-font-jetbrains-mono` id의 `<style>`을 없을 때만 넣는다. 지금 있는 모션 주입(`packages/core/src/motion/keyframes.ts:212-224`)과 같은 방식이다.
- `FoundationProvider.tsx:55-58`, `StyleGuideProvider.tsx:49-52`의 렌더 트리 안 `<style>`을 지우고 `fonts?: 'external' | 'none'`(기본 `'external'`) prop과 위 훅으로 바꾼다.

**완료 기준**: `pnpm build` 뒤 core 글꼴 스토리 4종 초록. core 안 viz 겹침은 viz가 아직 렌더 트리에 `<style>`을 내므로 빨강으로 남는다.

### WP3 · `S3` viz 글꼴 주입

- `packages/visualization/src/internal/ExternalFonts.tsx`를 만들고 **core와 같은 id**(`bbangto-font-jetbrains-mono`)와 같은 URL을 쓴다. viz는 core에 의존하지 않으므로(`packages/visualization/package.json:35-37`, 의존은 tokens 하나) 코드를 나누지 않고 id 값으로만 맞춘다.
- `VisualizationStyleGuideProvider.tsx:72`의 `<style>`을 지우고 `fonts` prop을 더한다.

**완료 기준**: 글꼴 스토리 6종 전부 초록. `grep -rnE "fonts\.googleapis|cdn\.jsdelivr" packages/core/src packages/visualization/src`가 `internal/ExternalFonts.tsx` 두 파일 밖에서 0건.

### WP4 · `S4` 문서·changeset·게이트

- `packages/core/README.md`, `packages/visualization/README.md`에 `fonts` 사용법 한 절을 둔다. 적을 것은 셋이다. 기본값은 지금과 같다. `none`이면 외부 요청이 0건이고 글꼴은 앱이 직접 불러와야 한다. SSR HTML에는 `@import`가 안 들어가고 화면이 켜진 뒤 불러온다.
- `.changeset/kan-052-provider-fonts.md` — core·visualization minor.
- 게이트 5종을 돌리고, 기본값 Storybook 화면에서 Pretendard·JetBrains Mono가 예전처럼 보이는지 한 번 본다.

**완료 기준**: 게이트 5종 초록. 그다음 검토서를 뜨고 `→ 검토`.

## 2. 의존과 순서

`S1 → S2 → S3 → S4`가 모두 순서다.

- `S1`이 먼저인 것은 `CLAUDE.md` 규약(테스트 선행) 때문이다. 빨강을 한 번 봐야 테스트가 고치기 전 상태를 실제로 잡는지 확인된다.
- `S3`의 완료 기준(core 안 viz 겹침 1개)은 core와 viz가 **같은 id**를 쓸 때만 선다. `S2`가 id를 먼저 정해야 `S3`가 맞출 값이 생긴다. 코드만 보면 둘을 동시에 짤 수 있지만 확인은 `S2` 뒤에야 된다.
- `S4`의 게이트는 앞의 셋이 다 들어간 상태에서만 뜻이 있다.

배치 밖 의존:

- **KAN-055(배포)가 이 카드 뒤에 직렬로 선다.** 이 카드가 완료돼야 KAN-055를 착수할 수 있다. 이 카드 쪽 제약은 없다.
- **KAN-049와 겹침 용인**(2026-10-05). 이 카드는 viz README의 사용법 절만 고친다.
- **KAN-051(번들 트리 셰이킹)·KAN-053(키보드)**과는 경로 겹침이 없다(`dep-check` 기준). 셋 다 core를 고치므로, 먼저 병합되는 카드가 있으면 `main`을 한 번 받아 게이트를 다시 돌린다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 기존 스토리가 렌더 트리 안의 `@import` 스타일을 전제로 짜여 있다 | `ScrollArea.stories.tsx:146-147`·`LogoCloud.stories.tsx:83`·`FeatureGrid.stories.tsx:5` 주석이 「전역 `@import` 스타일이 앞설 수 있다」를 의식한다. `S2` 뒤 이 셋이 빨개진다 | 셋 다 그 스타일을 **피하려고** canvas 안 모든 `style`을 합쳐 읽는 쪽이라 깨질 가능성은 낮다. 빨개지면 그 스토리의 선택자를 고치되 기대값은 건드리지 않는다 |
| 주입 노드가 언마운트해도 남아 스토리끼리 섞인다 | 같은 파일에서 순서를 바꾸면 결과가 달라진다 | `beforeEach` 정리가 이것을 막는다. 정리 없이도 초록이 나오면 오히려 테스트가 잘못 센 것으로 본다 |
| Storybook이 core 옛 빌드를 본다 | 고친 뒤에도 글꼴 스토리가 그대로 빨강 | `pnpm build` 뒤 Storybook vite 캐시를 지운다(이 저장소에서 이미 겪은 일이다) |
| `fonts` 타입이 두 패키지에서 갈라진다 | core는 `'external' \| 'none'`인데 viz가 다른 값을 받는다 | 두 패키지가 타입을 나눌 수 없으므로 같은 리터럴을 각자 선언하고, 겹침 스토리가 두 Provider에 같은 값을 넘겨 타입 검사로 맞춘다 |
| `pnpm test`(chromium)가 오래 걸린다 | `S1`·`S4`에서 전체 실행 두 번 | `S2`·`S3` 사이에는 글꼴 스토리 파일만 골라 돌리고, 전체 실행은 `S1` 완료와 `S4` 게이트 두 번만 한다 |

되돌리기 어려운 지점은 없다. 공개 API에는 선택 prop 하나가 늘 뿐이고 기본값이 지금 동작과 같다. work마다 `kan/KAN-052-BYS4JN/S<n>` 태그를 달아 단위별로 되돌릴 수 있다.

## 4. 착수 시점 판단

**배치 1개로 끝낸다.** work 4개는 `batch_size_works` 기본값(3~4) 안이다. 마지막 `S4`는 게이트 실행이라 `S3` 바로 뒤에 붙어야 뜻이 있고, 다음 배치로 미룰 이유가 없다.

**수행 관점은 두 안을 견주어 유저가 고른다.**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 거의 없다. work 4개가 확인 순서로 묶여 있어 직렬이 곧 가장 짧은 길이다 |
| 오케스트레이션 | 1 | 2(`S2` core · `S3` viz 동시 작성) | 병렬로 얻는 것은 파일 하나씩의 짧은 편집뿐이다. 두 서브에이전트가 같은 워크트리에서 `pnpm build`·Storybook 캐시를 함께 쓰면 서로의 확인 결과를 흐리므로 워크트리를 하나 더 갈라야 하고, 그 기동 비용이 편집 비용보다 크다. id 값을 둘이 따로 정하면 겹침 테스트가 빨갛게 남는다 |

오케스트레이션이 값을 하려면 병렬 구간이 길고 각 조각이 따로 무거워야 한다. 이 카드는 두 조건이 다 아니다.

**선택 결과**: 단일 에이전트 (2026-10-06 유저 선택). `S4`까지 이 배치 하나로 끝낸다.
