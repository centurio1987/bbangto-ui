---
card: KAN-050-AJSQAY
batch: 1
created: 2026-10-07
branch: KAN-050-AJSQAY
status: 계획
steps: S1, S2, S3, S4
---

# KAN-050-AJSQAY 배치1 — 규율 문서의 경로·이름을 실측에 맞추고 모션 워크플로 기재를 한 곳으로

카드: [KAN-050-AJSQAY.md](../cards/KAN-050-AJSQAY.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치이자 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

전부 문서 편집이다. 코드는 `packages/tokens/src/types.ts:201` 주석 한 줄뿐이다. 바꿀 문장은 착수 전에 실측으로 정했고(카드 문서 「전략」 → 「실제 구조」), 아래 표의 「바꿀 값」이 그 결과다.

### WP1 · `S1` `theme-*` 경로 · 「5개 테마」 · 패키지 구조

| 자리 | 지금 | 바꿀 값 |
|---|---|---|
| `CLAUDE.md:52-66` 구조도 | 패키지 2개(core·tokens) + 없는 `theme-*` 4개, core 이름 `@centurio1987/core` | 실재 7개를 실제 이름으로. core 아래에 `src/foundations/`(base 3종) 표기. 게이트 목록과 `:39`·`:103` 은 손대지 않는다(KAN-051 몫) |
| `QUALITY_CHECKLIST.md:15` · `_templates/CHECKLIST_INSTANCE.template.md:21` | 5개 테마(light/dark/high-contrast/amber-light/amber-dark) | base foundation 3종(light / dark / high-contrast — Storybook 상단 툴바 「Foundation」) |
| `QUALITY_CHECKLIST.md:59-64` | `packages/theme-*/src/theme.ts` 4경로 | `BbangtoFoundation` 을 따르는 모든 foundation — `packages/core/src/foundations/light.ts`(dark·highContrast 는 spread 상속) · `packages/foundations/src/amber.ts` · `packages/foundations/src/themes/*.ts` 74개. 빠진 파일은 `pnpm typecheck` 가 잡는다 |
| `DESIGN_SYSTEM_GUIDE.md:170` | `packages/tokens` + `packages/theme-*` | `packages/tokens`(타입) + `packages/core/src/foundations`(base 3종) + `packages/foundations`(확장 76종) |
| `MOTION_QUALITY_CHECKLIST.md:70` | `theme-light` + `theme-amber` baseMotion | core `light.ts`(dark/high-contrast 는 spread) · `amber.ts` `baseMotion` · 프리셋 74개 각각(74개 전부 `motion.preset` 을 직접 갖는다 — 실측) |
| `MOTION_QUALITY_CHECKLIST.md:103` · `motion-catalog.md:219` | all 5 themes | the 3 base foundations (Storybook toolbar) |
| `src/motion/README.md:10` | `theme-*` | `packages/core/src/foundations/*` · `packages/foundations/src/**` |
| `COMPONENT_CATALOG.md:28` | `themes (theme-light/dark/amber/high-contrast)` | `foundations (base 3: core/src/foundations · 확장 76: packages/foundations)` |
| `apps/storybook/src/Overview.mdx:34-35` | 「Theme」 토글로 5개 테마 | 「Foundation」 토글로 base 3종. amber 와 브랜드 프리셋은 FOUNDATION CATALOG 에서 본다 |

**완료 기준**: 카드 「검증」 [1] 의 첫 두 grep(`theme-*` · 「5 테마」)이 0줄.

### WP2 · `S2` 깨진 링크와 템플릿 drift

| 자리 | 지금 | 바꿀 값 |
|---|---|---|
| `DESIGN_SYSTEM_GUIDE.md:182` | 지워진 `ASSET_INTEGRATION_PLAN.md` 링크 | `packages/core/COMPONENT_CATALOG.md` 「Wave 실행 기록」 링크(위임 모델·leaf 계약·토큰 갭 감사가 흡수된 자리) |
| `_templates/README.md:1` · `:23` | 「Wave 0.2 산출물」 · 「Wave 0.5」 | Wave 표기를 걷는다. 출처가 필요하면 `COMPONENT_CATALOG.md` 「Wave 실행 기록」으로 링크 |
| `_templates/README.md:23-37` 제목 규약 표 | `Atoms/*`·`Molecules/*`·`Blocks/*`·`Hooks/*` … | 실제 storySort 계층 — `ARCHETYPE/Components/{Atoms,Molecules,Organisms}` · `ARCHETYPE/Foundations/{Base,Motion,Motion/Shaders}` · `ARCHETYPE/Blocks` · `ARCHETYPE/Patterns`. 정본은 `apps/storybook/.storybook/preview.tsx` storySort 라고 적는다. 훅 데모 스토리는 지금 없으므로 `Hooks/*` 행은 「자리 미정 — 생기면 storySort 에 먼저 넣는다」로 |
| `_templates/Component.stories.template.tsx:8,12` | `@centurio1987/core` · `title: 'Atoms/__Name__'` | `@centurio1987/bbangto-ui-core` · `'ARCHETYPE/Components/Atoms/__Name__'` |
| `_templates/Component.template.tsx:7` | `@centurio1987/tokens` | `@centurio1987/bbangto-ui-tokens`(`Button.tsx:2` 와 같은 표기) |
| `_templates/CHECKLIST_INSTANCE.template.md:8-9` | `Wave: 0…6` · `21st 출처 카테고리` | `카드: KAN-###` · `참고 출처 (있으면)` |
| `src/motion/README.md:51-52` | `title: 'Foundations/Motion'` or `'Atoms/…'` | `'ARCHETYPE/Foundations/Motion/…'` |
| `packages/tokens/src/types.ts:201` 주석 | `@centurio1987/core` | `@centurio1987/bbangto-ui-core` |

**완료 기준**: 「검증」 [1] 의 뒤 두 grep(옛 제목 · 옛 패키지 이름)이 0줄, [2] 링크 검사가 0줄. 지금 [2] 는 `DESIGN_SYSTEM_GUIDE.md → ASSET_INTEGRATION_PLAN.md` 한 줄로 빨강이다(착수 전 실측).

### WP3 · `S3` 모션 워크플로 단일화

정본은 `MOTION_QUALITY_CHECKLIST.md` 「Workflow (per item)」(`:14-34`)이다. `CLAUDE.md` §5 와 `QUALITY_CHECKLIST.md` D 는 이미 그 파일을 가리키므로 고칠 것이 없다.

| 자리 | 남기는 것 | 걷는 것 |
|---|---|---|
| `src/motion/README.md` 「Workflow」(`:20-33`) | 「테스트와 체크리스트 전에 구현하지 않는다」 한 줄 + 정본 링크. 이 파일이 다루는 것은 3단계(구현)이고 그것이 아래 「How to add…」라는 안내 | 5단계 목록과 게이트 명령 |
| `motion-catalog.md` §6(`:194-223`) | 1 문서 읽기 · 2 다음 항목 찾기(§7·§4d) · 3 라이선스 확인, 그다음 「항목 하나는 정본 워크플로대로」 + 정본 링크, 끝으로 기록 대상(§4·§5·§7)과 완료 정의 | 4~7단계(테스트·체크리스트·구현·게이트 명령)의 재서술 |
| `motion-catalog.md:26-28` · `MOTION_QUALITY_CHECKLIST.md:8-10` | 「패키지 밖에 있으므로 배포·번들에 안 들어간다」는 결론 | `files: ["dist"]`(실제는 `["dist", "README.md"]`) · 「tsup entry 는 `src/index.ts`」 → 「빌드 entry 는 전부 `src/` 아래」로. KAN-051 앞뒤 모두 참이다 |

**완료 기준**: 「검증」 [3] 이 `MOTION_QUALITY_CHECKLIST.md` 한 줄만 낸다(지금은 세 파일). 걷은 단계 중 정본에 없는 것이 없는지 단계별로 대조해 수행 내역에 남긴다.

### WP4 · `S4` 메타데이터 감사 §2-2 정리 + 게이트

`METADATA_COVERAGE_AUDIT.md` §2-2 「파일럿 관찰」(`:53-60`)을 `FOUNDATION_METADATA_STRATEGY.md` §7 「파일럿·전량 저작 관찰」 링크 한 줄로 바꾼다. 착수 전 대조에서 전략 쪽에 없는 사실이 둘 나왔다 — 유일한 다크 베이스의 배경값(`#0b0e11`)과, 실질 변별을 맡는 authored 필드 중 `summary`·`useWhen`·`avoidWhen`. 이 둘을 전략 §7 에 먼저 옮기고 감사 쪽을 걷는다.

그다음 품질 게이트 5종을 돌린다(「검증」 [4]).

**완료 기준**: 대조표에 누락 0건 + 게이트 5종 초록.

## 2. 의존과 순서

`S1 → S2 → S3 → S4` 순서로 간다. 엄격한 의존은 하나다 — `S3` 가 `motion-catalog.md` §6 을 고쳐 쓰면서 `:219` 줄이 들어 있는 단계를 걷으므로, `S1` 이 먼저 그 줄을 고쳐 둔다. 순서가 뒤집혀도 결과는 같지만 `S1` 완료 기준(grep 0줄)이 `S3` 에 기대게 된다.

배치 밖 의존은 없다. 선행 KAN-048 은 완료됐고 전략 재수립 표시도 끝났다(`dep-check` 의 `restrategy_required: false`). KAN-051 과는 `CLAUDE.md` 를 함께 고치지만 줄이 다르고 용인 기록이 서 있다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| `CLAUDE.md` 를 잘못 고치면 이후 모든 에이전트 작업에 번진다 | 게이트 목록이나 워크플로 줄이 diff 에 보인다 | `S1` 커밋 전에 `git diff CLAUDE.md` 가 구조도 블록 안에만 있는지 본다. work 마다 `kan/KAN-050-AJSQAY/S<n>` 태그 |
| 모션 문서에서 게이트 목록을 걷다가 반쪽 목록이 남는다 | `pnpm test:unit` 의 `gateDocs` 빨강 | 목록은 통째로 걷거나 통째로 둔다. `S3` 끝에 `pnpm --filter @centurio1987/bbangto-ui-foundations test` 로 먼저 본다 |
| `Overview.mdx` 수정이 Storybook 빌드를 깬다 | `pnpm --filter storybook build` 실패 | 마크다운 문장만 고치고 MDX 구문(import·JSX)은 건드리지 않는다 |
| KAN-051 이 먼저 병합되면 `CLAUDE.md`·`motion-catalog.md` 문맥이 바뀐다 | 병합 충돌 | 고치는 줄이 겹치지 않아 병합은 붙는다. `motion-catalog.md:27` 은 KAN-051 앞뒤 모두 참인 문장이라 다시 고칠 일이 없다 |
| main 체크아웃을 다른 세션이 동시에 쓴다 | 내 커밋에 남의 칸반 이벤트가 섞인다 | 착수는 워크트리에서 한다. 칸반 커밋 전 `git diff .kanban/log.md` 를 본다 |

되돌리기 어려운 지점은 없다. 문서 편집이라 `git revert` 로 work 단위로 돌아간다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->

**배치는 하나다.** work 4개가 `batch_size_works` 기본값(3~4) 안이고, work 하나가 문서 몇 줄과 grep 한 번이라 세션 예산 절반에 한참 못 미친다. 무거운 것은 끝의 게이트 5종(`pnpm test` 가 스토리 전체를 chromium 으로 돈다)인데, 그것은 시간이 걸릴 뿐 토큰을 쓰지 않는다.

**수행 관점: 유저 선택 대기.** 두 관점을 나란히 놓으면 이렇다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 순차라 편집 시간이 조금 더 든다. 대신 work 경계와 태그가 그대로 맞고, 같은 파일을 두 번 여는 일이 순서대로 일어난다 |
| 오케스트레이션 | 1 | 2 — 파일 묶음으로 가른다(루트 문서·템플릿·Overview·types.ts / 모션 문서 3·메타데이터 문서 2) | `S1` 이 두 묶음에 걸쳐 있어 work 하나가 두 에이전트로 쪼개지고, `kan/…/S1` 태그를 둘이 다 끝난 뒤에야 달 수 있다. 모션 문서 셋은 `S1`·`S3` 가 함께 고치므로 같은 에이전트에 몰아야 한다. 게이트는 어차피 합친 뒤 한 번이다. 줄어드는 것은 몇 분의 편집 시간뿐이다 |
