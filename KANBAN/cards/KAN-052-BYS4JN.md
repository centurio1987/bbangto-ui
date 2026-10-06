---
card: KAN-052-BYS4JN
title: Provider 외부 글꼴 선택화 — fonts prop + 글꼴별 1회 주입 (core·viz)
created: 2026-10-05
scope: packages/core/src/FoundationProvider.tsx, packages/core/src/StyleGuideProvider.tsx, packages/core/src/internal/ExternalFonts.tsx, packages/visualization/src/styleGuide/VisualizationStyleGuideProvider.tsx, packages/visualization/src/internal/ExternalFonts.tsx, apps/storybook/.storybook/preview.tsx, apps/storybook/src/stories/ProviderFonts.stories.tsx, apps/storybook/src/stories/visualization/Provider.stories.tsx, packages/core/README.md, packages/visualization/README.md, .changeset/kan-052-*.md
---

# KAN-052-BYS4JN — Provider 외부 글꼴 선택화 — fonts prop + 글꼴별 1회 주입 (core·viz)

## 전략
### 문제

Provider 세 곳이 외부 CDN 글꼴을 조건 없이 불러온다. 끄는 prop이 없다.

| 위치 | 불러오는 것 |
|---|---|
| `packages/core/src/FoundationProvider.tsx:55-58` | Pretendard(jsDelivr) · JetBrains Mono(Google Fonts) |
| `packages/core/src/StyleGuideProvider.tsx:49-52` | 같은 두 글꼴, 같은 코드 |
| `packages/visualization/src/styleGuide/VisualizationStyleGuideProvider.tsx:72` | JetBrains Mono(Google Fonts) |

렌더 트리 안의 `<style>{'@import url(...)'}</style>`이라 중복 방지가 없다. Provider를 겹치면 같은 `<style>`이 여러 개 생기고, Storybook 전역 데코레이터(`apps/storybook/.storybook/preview.tsx:126-141`)처럼 core Provider 안에 viz Provider를 겹치면 JetBrains Mono가 두 번 들어간다. 앱이 글꼴을 직접 호스팅하거나 CSP(외부 리소스를 막는 보안 정책)를 쓰면 지금은 외부 요청을 막을 방법이 없다.

### 접근

1. **기본 동작은 그대로 두고 끌 수 있게만 한다.** Provider 세 곳에 `fonts?: 'external' | 'none'`(기본 `'external'`)을 더한다. 기존 사용처가 깨지지 않는 minor 변경이다.
2. **중복 방지는 글꼴별 DOM id로 한다.** 렌더 트리 안의 `<style>` 대신 `bbangto-font-pretendard`, `bbangto-font-jetbrains-mono` id로 `document.head`에 한 번만 넣는다. 모션 keyframes 주입(`packages/core/src/motion/keyframes.ts:212-224`, `useInsertionEffect` + id 확인)이 이미 쓰는 방식이다.
   - context를 쓰지 않는 까닭: visualization은 core에 의존하지 않는다(`packages/visualization/package.json:35-37`). 두 패키지가 같은 context를 나눌 수 없어서 context로는 core 안에 viz를 겹친 경우의 중복을 못 막는다. DOM id는 패키지와 무관하게 같은 값이면 막힌다.
   - core는 두 Provider의 글꼴 코드를 `src/internal/ExternalFonts.tsx` 하나로 묶는다. viz는 core에 의존하지 않으므로 `src/internal/ExternalFonts.tsx`를 따로 두되 **같은 id**를 쓴다.
   - 대가: SSR(서버에서 HTML을 미리 그리는 방식) HTML에 글꼴 `@import`가 빠지고 화면이 켜진 뒤에 불러온다. README에 적는다.
3. **테스트 환경을 먼저 고친다.** 전역 데코레이터가 모든 스토리를 기본값 Provider 둘로 감싸므로 그대로는 `fonts="none"`의 0건을 확인할 수 없다. 스토리 parameter(예: `bbangtoProviders: false`)로 데코레이터를 끌 수 있게 한다. 주입한 노드는 언마운트해도 남으므로 글꼴 스토리는 `beforeEach`에서 `bbangto-font-*` 노드를 지운 뒤 렌더한다.

### 버린 대안

- **기본값을 `'none'`으로 바꾸기** — 기존 사용처의 글꼴이 사라지는 major 변경이다. 이번 범위에 넣지 않는다.
- **같은 패키지 안 context로만 중복 방지** — core 안 viz 겹침을 못 막는다(위).
- **React 19 `<link rel="stylesheet" precedence>` 자동 중복 제거** — peerDependency가 React 18도 받으므로(`packages/core/package.json:27-30`) 쓸 수 없다.

### 겹침 처리

- KAN-049와 용인: 이 카드는 viz Provider 코드와 README의 사용법 절만 고친다. KAN-049는 PLAN·catalog 문서 흡수다.
- KAN-055(배포)가 이 카드 뒤에 직렬로 선다.

### 범위 밖

- foundation별 글꼴 불일치(예: `packages/foundations/src/amber.ts:19`는 Inter를 쓰는데 Provider가 불러오지 않는다)
- 글꼴 파일을 패키지에 동봉해 자체 호스팅하는 일

### 외부 검토

플랜 검토(plan-reviewer, fable)에서 이 카드에 지적 1건이 나와 반영했다: 전역 데코레이터 때문에 테스트가 적힌 대로는 초록이 될 수 없고, core 안 viz 겹침은 같은 패키지 중복 방지로 안 풀린다는 점.

## 실행 계획
- [x] `S1` 테스트 환경과 play 테스트 먼저 — `preview.tsx` 데코레이터에 끄는 parameter, `ProviderFonts.stories.tsx`(core)와 `visualization/Provider.stories.tsx`에 글꼴 스토리, `beforeEach`에서 `bbangto-font-*` 노드 정리. 세는 범위는 `document` 전체의 `@import`를 담은 `style`과 `bbangto-font-*` id 노드. 확인할 경우: `fonts="none"` 0개 · 기본값 글꼴마다 1개 · core Provider 겹침 글꼴마다 1개 · core 안 viz 겹침 JetBrains Mono 1개 · 둘 다 `none`이면 0개. 완료 기준: 새 스토리는 빨강, 데코레이터 parameter를 넣은 뒤에도 기존 스토리 전부 초록
- [x] `S2` core — 두 Provider의 글꼴 코드를 `src/internal/ExternalFonts.tsx`로 묶고 `fonts` prop과 id 기반 `document.head` 주입을 넣는다. 완료 기준: core 경우 초록
- [x] `S3` viz — `VisualizationStyleGuideProvider`에 같은 id로 같은 방식을 적용한다. 완료 기준: core 안 viz 겹침까지 초록
- [x] `S4` README(core·viz)에 `fonts` 사용법과 SSR 차이를 적고 changeset(core·viz minor)을 쓴다. 완료 기준: 게이트 5종 초록

## 검증
### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← 글꼴 play 테스트가 실제 chromium 에서 돈다
pnpm --filter storybook build
pnpm test:unit
```

core에 새 내부 모듈이 생기므로, 스토리에서 옛 dist가 보이면 `pnpm build` 뒤 Storybook vite 캐시를 지운다.

### 빨강 → 초록

1. `S1` 직후: 새 글꼴 스토리는 빨강(`fonts` prop이 없고 중복이 남는다). 데코레이터 parameter 추가로 기존 스토리가 깨지지 않았는지 `pnpm test` 전체가 그 밖에서는 초록이어야 한다.
2. `S2` 직후: core 경우(0개 · 글꼴마다 1개 · 겹침 1개) 초록, core 안 viz 겹침은 아직 빨강.
3. `S3` 직후: 전부 초록.

### 추가 확인

- `grep -rnE "fonts\.googleapis|cdn\.jsdelivr" packages/core/src packages/visualization/src` — `internal/ExternalFonts.tsx` 두 파일 밖에서는 0건
- 기본값 Storybook 화면에서 글꼴이 예전처럼 보이는지 한 번 눈으로 본다(Pretendard·JetBrains Mono)

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `검증` 섹션 교체
- 2026-10-06T00:39 · s:d196a119 · S1 doing — 착수
- 2026-10-06T00:42 · s:d196a119 · S1 done — 데코레이터 bbangtoProviders:false + 글꼴 스토리 8종(core 6·viz 2). pnpm test: 새 6종만 빨강, 1226 통과. 계획 6경우에 StyleGuideProvider none·core 둘 겹침을 StyleGuideProvider로, 기본값 가드 2종(core·viz)을 더함
- 2026-10-06T00:42 · s:d196a119 · S2 doing — 착수
- 2026-10-06T00:43 · s:d196a119 · S2 done — core internal/ExternalFonts.tsx(useExternalFonts·id 2개) + FoundationProvider·StyleGuideProvider fonts prop. 글꼴 스토리: core 4종 초록, viz 관련 3종 빨강(예정대로)
- 2026-10-06T00:43 · s:d196a119 · S3 doing — 착수
- 2026-10-06T00:44 · s:d196a119 · S3 done — viz internal/ExternalFonts.tsx(core와 같은 id·href) + VisualizationStyleGuideProvider fonts prop. 글꼴 스토리 10종 전부 초록, 외부 글꼴 주소는 ExternalFonts.tsx 두 파일 밖 0건
- 2026-10-06T00:45 · s:d196a119 · S4 doing — 착수
- 2026-10-06T00:50 · s:d196a119 · S4 done — README(core·viz) fonts 절 + changeset(core·viz minor). 게이트 5종 초록(test 1232/1232). 빌드 Storybook 기본 화면: head 에 글꼴 노드 2개·렌더 트리 @import 0, Pretendard 적용, JetBrains Mono 18 face 등록·요청 시 로드
- 2026-10-06T00:57 · s:d196a119 — 정정: S3 기록의 「글꼴 스토리 10종」은 「두 스토리 파일의 10개(글꼴 스토리 8 + 기존 viz 스토리 2)」가 맞다. 글꼴 스토리는 8종(core 6·viz 2). S3 커밋 메시지(84aa3f7)에도 같은 오기가 있다 — 검토자(opus) 지적
- 2026-10-06T00:57 · s:d196a119 — 검토자 추가 의견 반영: fonts="none" 이 문서 전체가 아니라 그 Provider 몫만 끈다는 점을 7곳(core·viz ExternalFonts 타입 주석, Provider JSDoc 3, changeset, viz README:127)에서 정확히 고침
