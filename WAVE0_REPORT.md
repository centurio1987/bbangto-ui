# Wave 0 시범 실행 리포트 — 편제·인프라·토큰 기반

> `ASSET_INTEGRATION_PLAN.md`의 Wave 0을 시범 실행한 결과. Catalog Orchestrator(Opus) 주도.
> **품질 게이트 4종 전부 GREEN 상태에서 작성.**

- **실행일**: 2026-06-24
- **게이트 결과**: `pnpm typecheck` ✅ (9개 프로젝트) · `pnpm build` ✅ · `pnpm test` ✅ (45 파일 / 144 테스트) · `pnpm --filter storybook build` ✅

---

## 0.1 — 패키지/디렉터리 신설 + index 배선 ✅

| 산출물 | 위치 | 상태 |
|---|---|---|
| 신규 패키지 `@centurio1987/hooks` | `packages/hooks/` (package.json·tsconfig·tsup·src) | 빌드/타입체크 GREEN |
| 레퍼런스 훅 `useIsMounted` | `packages/hooks/src/useIsMounted.ts` | zero-dep, 오서링 레퍼런스 |
| `blocks` 배럴 | `packages/core/src/blocks/index.ts` | 빈 배럴, core index 배선 |
| `patterns` 배럴 | `packages/core/src/patterns/index.ts` | 빈 배럴, core index 배선 |
| `motion/shaders` 배럴 | `packages/core/src/motion/shaders/index.ts` | 빈 배럴, motion index 배선 |
| Storybook 의존성 | `apps/storybook/package.json` 에 `@centurio1987/hooks` 추가 | 링크 확인됨 |

**편제 결정**: `blocks`/`patterns`/`shaders`는 별도 패키지가 아니라 **core 내 하위 디렉터리**로 두고 단일 진입점(`@centurio1987/core`)에서 re-export. `hooks`만 독립 패키지(로직 전용, core 의존 없음). motion 패턴과 동일한 구조.

---

## 0.2 — 오서링 템플릿 확정 ✅

`/_templates/` 신설 (빌드/타입체크/스토리 글롭 비대상 — 순수 참조용).

- `Component.template.tsx` — forwardRef+displayName+cssVar 규약 반영
- `Component.stories.template.tsx` — `storybook/test`의 `expect/userEvent/within` + `play` 테스트 골격
- `hook.template.ts` — 헤드리스 훅 규약
- `CHECKLIST_INSTANCE.template.md` — QUALITY_CHECKLIST 인스턴스 + 구조화 반환 스키마
- `README.md` — 작업 순서 + Storybook `title` 계층 규약

---

## 0.3 — 토큰 갭 감사 ✅ (감사만; 실제 토큰 추가는 해당 Wave에서)

현 `BbangtoTheme`(`packages/tokens/src/types.ts`)는 color/typography/spacing/radius/shadow/motion/zIndex를 커버한다.
신규 산출물이 요구하는 **부재 토큰**과 처리 시점:

| 갭 | 필요 산출물 | 심각도 | 처리 시점 | 권고 |
|---|---|:---:|---|---|
| **breakpoint 토큰 (sm/md/lg/xl)** | blocks·patterns 반응형 | **高** | **Wave 4 직전** | ⚠️ 아래 아키텍처 주의 참조 — cssVar 불가, 별도 상수로 export |
| **container max-width / layout 치수** | Hero 등 섹션, Sidebar 폭(240/rail 64px, spacing 최대 64 초과) | 中 | Wave 2(Sidebar)·4 | 우선 기존 `components?` 오버라이드 필드로 처리, 재사용 빈번해지면 `size` 스케일 승격 |
| **zIndex.tooltip** | Tooltip·Menu 레이어링 | 低 | Wave 1·2 | 타입 1줄 + 4개 테마 동기화 (QUALITY_CHECKLIST C 절차) |
| **scrollbar thumb/track 색·폭** | ScrollArea | 低 | Wave 2 | 없으면 `border`/`foreground` 토큰으로 충분, 필요 시 추가 |
| **chat surface (user/assistant 구분)** | ChatBubble | 低 | Wave 2 | `background.elevated`/`primary.subtle`로 대체 가능, 전용 토큰 불요 |

### ⚠️ 아키텍처 주의 — breakpoint는 cssVar 토큰이 될 수 없다
CSS 커스텀 프로퍼티는 `@media (min-width: var(--bp))` 형태로 **미디어 쿼리에서 동작하지 않는다.**
따라서 breakpoint는 `cssVar()` 토큰 계열이 아니라 **`@centurio1987/tokens`에서 별도 상수(숫자/문자열)로 export**해야 한다.
블록/패턴은 이 상수를 JS(matchMedia / 컨테이너 쿼리)로 소비한다. → Wave 4 착수 전 `tokens`에 `breakpoints` 상수 도입을 별도 토큰 변경 태스크로 처리.

**결론**: Wave 0에서는 토큰을 변경하지 않는다(토큰 변경은 4개 테마 동기화 + 영향 컴포넌트 story 검증을 요구하는 Wave-gated 작업). 위 갭은 해당 Wave의 선행 태스크로 편입한다.

---

## 0.4 — 21st Hooks/Shaders 개별 목록 ✅ (단, INFERRED)

21st.dev 카테고리 페이지는 **클라이언트 렌더(JS)** 라 개별 항목명이 HTML에 없어 크롤 불가.
표준 라이브러리 기준 **추정 목록(INFERRED)** 으로 레지스트리를 인스턴스화하고, 실제 착수 시(Wave 3) 헤드리스 브라우저 또는 수동 확인으로 검증한다.

- **Hooks(추정 31)**: useMediaQuery, useInView, useIntersectionObserver, useScroll, useScrollProgress, useMousePosition, useHover, useClickOutside, useDebounce, useThrottle, useLocalStorage, useSessionStorage, useWindowSize, useResizeObserver, useToggle, useCopyToClipboard, useEventListener, useInterval, useTimeout, useKeyPress, useDarkMode, usePrevious, useIsMounted✓(구현됨), useOnScreen, useElementSize, useFocus, useIdle, useNetworkState, useGeolocation, useBattery, useFullscreen
- **Shaders(추정 15)**: MeshGradient, ShaderGradient, AnimatedGradient, Waves, Aurora, DotGrid, Noise, Plasma, Liquid, Metaballs, Silk, Iridescence, Halftone, Voronoi, Ripple

---

## 0.5 — Storybook 사이드바 계층 규약 ✅

`meta.title` 첫 세그먼트 규약 확정: `Atoms` · `Molecules` · `Blocks` · `Patterns` · `Motion` · `Motion/Shaders` · `Hooks`.
상세는 `/_templates/README.md`. 기존 스토리(`Atoms/*`, `Molecules/*`)와 호환.

---

## 🔎 시범 실행에서 발견된 후속 사항

1. **hooks 테스트 하네스 부재 → ✅ 해결됨** — `packages/hooks`에 `vitest` + `@testing-library/react` + `jsdom`(devDep) 설치, `vitest.config.ts`(jsdom 환경), `test`/`test:watch` 스크립트, `useIsMounted.test.ts`(3 케이스) 구성. 루트에 `test:unit` 스크립트(`pnpm -r --filter=!storybook run test`) 추가 — **hooks 단위 테스트 3/3 통과**. (zero runtime-dep 원칙은 devDependency엔 무관.)
2. **breakpoint 상수 도입** — 위 0.3 아키텍처 주의. Wave 4 선행(미처리, 의도적 이월).
3. **`.npmrc` 경고** — `NODE_AUTH_TOKEN` 환경변수 미설정 경고가 출력되나 게이트엔 무영향(설치/빌드 정상). 퍼블리시 시에만 관련.
4. **`@types/react` peer 경고(cosmetic)** — hooks 테스트용 `react-dom@19`와 `@types/react@18`(core와 정렬) 간 버전 경고. typecheck/test 모두 클린이라 무해. 정리하려면 hooks devDep `@types/react`를 `^19`로 올리면 됨.

---

## ✅ 시범 검증 결과 — Wave 1 leaf 계약 (Button 확장)

Component Builder subagent에 `Button` 비파괴적 확장 위임 → leaf 계약대로 동작 확인.
- 추가: `loading`(Spinner 통합 + `aria-busy`), `variant='soft'`, `shape='pill'` — 모두 추가만, 기존 5개 스토리/기본값 보존
- 신규 스토리 3개(Loading/Soft/Pill) 각각 `play` 테스트 포함
- **orchestrator 풀 게이트**: typecheck ✅ · build ✅ · `pnpm test` **147 통과**(144→147) ✅ · storybook build ✅
- leaf 계약(테스트 우선 → 구현 → self typecheck → 구조화 JSON 반환)이 실제로 작동함을 입증.

---

## 다음 단계

Wave 0 그린 + leaf 계약 검증 완료. 의존성 그래프상 다음은 **Wave 1·2·3 병렬 착수** 가능.
- Wave 1(A 그룹 ~29개 variant 확장): Wave Lead(Opus)가 컴포넌트별 Component Builder를 배치 팬아웃.
- Wave 2(B 그룹 9개 primitive) / Wave 3(hooks 31 + shaders 15)도 동시 진행 가능. 단 Wave 3 hooks는 위 하네스로 즉시 착수 가능.
