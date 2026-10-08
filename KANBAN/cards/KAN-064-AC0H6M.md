---
card: KAN-064-AC0H6M
title: AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화
created: 2026-10-08
scope: packages/style-guide-catalog/src/manifest.ts, packages/style-guide-catalog/scripts/**, packages/style-guide-catalog/catalog.manifest.json, packages/visualization-style-guide-catalog/src/manifest.ts, packages/visualization-style-guide-catalog/scripts/**, packages/visualization-style-guide-catalog/catalog.manifest.json, packages/foundations/src/meta/manifest.ts, packages/foundations/scripts/**, packages/foundations/foundation.manifest.json, packages/visualization/src/typeMeta/manifest.ts, packages/visualization/scripts/**, packages/visualization/type.manifest.json, packages/style-guide-catalog/src/manifest.test.ts, packages/visualization-style-guide-catalog/src/manifest.test.ts, packages/foundations/src/meta/manifest.test.ts, packages/visualization/src/typeMeta/manifest.test.ts, metadata-coverage.json, packages/style-guide-catalog/METADATA_STRATEGY.md
---

# KAN-064-AC0H6M — AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화

## 전략
### 진단 요약 (2026-10-08)

매니페스트 4종은 `StyleGuide.meta` 같은 객체 필드를 생성기로 투영한 JSON 파일이다(`packages/style-guide-catalog/METADATA_STRATEGY.md`). 크기를 한글 1.3토큰/글자로 어림잡으면 다음과 같다(실제 토크나이저 실측은 S1에서 한다).

| 매니페스트 | 항목 | 전체(어림) | 이름+설명만 |
|---|---|---|---|
| UI style guide | 51 | 약 37,000 | 약 3,400 |
| viz style guide | 30 | 약 22,600 | 약 2,400 |
| foundation | 76 | 약 26,200 | 약 80 |
| viz 유형 | 87 | 약 25,900 | 약 640 |

**이득인 것**: 메타 필드(`useWhen`·`avoidWhen`·`domains`·`mood`)는 코드에 없는 채택 근거다. 특히 foundation 76종은 설명이 거의 없어 메타가 유일한 선택 근거다.

**오버헤드인 것**: 메타가 아니라 투영 파일과 동기화 장치다.
- 통째로 읽기엔 큼(UI 하나가 약 3.7만 토큰). "파일 하나만 읽고 고른다"는 전제가 흔들린다.
- 선택 함수(`selectStyleGuides`·`selectVizTypes`·`selectFoundations`)는 JSON을 읽지 않고 객체·레지스트리를 받는다. JSON은 사람·AI가 눈으로 읽는 용도뿐이다.
- 동기화 비용: 바이트 일치 테스트 4종, 수동 재생성 2개(foundation·viz 유형, README.md:1199), 생성기가 dist를 읽어 생기는 빌드 순서 함정(README.md:1202, 메모리 fresh-worktree-gate-order), census 게이트(metadata-coverage.json).
- 메타가 자기 검증 부담을 낳음: accessibility 과장 감사 2회(KAN-024·026), displayName 정규화(KAN-027). 메타 축 인프라 카드 12장 안팎.
- 저장소 안에서 AI 소비자가 매니페스트를 실제로 읽어 채택한 사례는 확인 안 함(스킬·에이전트 지시문에 읽으라는 곳 없음).

### 전략

**메타 필드는 그대로 두고, 매니페스트를 "얇은 색인"으로 줄이며, 동기화 장치를 단순화한다.**

1. **얇은 색인(tier 1)**: `name`·`displayName`·`family`(또는 `category`)·`tags`·`domains`·`summary` 한 줄만 싣는다. 4종 합계 1만 토큰 안쪽을 목표로 한다. AI는 이것으로 후보 2~3개를 고른다.
2. **상세 메타(tier 2)**: `useWhen`·`avoidWhen`·`mood`·`accessibility`·`related`는 기존처럼 객체(`./meta` 서브패스, 카탈로그 배열)에서 읽는다. 후보로 좁힌 뒤에만 읽으므로 토큰이 O(후보 수)가 된다. 필요하면 항목별 상세 파일(`manifest/<name>.json`)을 선택 산출물로 둔다.
3. **동기화 단순화**: 네 생성기를 `prebuild`로 통일하고, dist 의존을 없앤다(생성기가 `src`의 meta 모듈만 import하도록 분리). 바이트 일치 테스트는 "커밋본이 최신인가"가 아니라 "생성기가 결정적인가"만 보도록 줄인다. 커밋본 유지 여부는 S3에서 결정한다(npm 패키지에는 빌드 결과가 실리므로 커밋본의 역할은 저장소를 둘러보는 AI용뿐).
4. **README·전략 문서 갱신**: "매니페스트 하나만 읽는다"는 서술을 2단 읽기(색인 → 상세)로 바꾼다.

### 버린 대안

- **전부 걷어내기**: foundation 76종과 "언제 피하라" 정보가 사라져 KAN-018이 풀던 문제가 돌아온다.
- **지금 그대로 두기**: 동기화 장치 비용이 계속 쌓이고, 통째 읽기 전제가 이미 깨져 있다.
- **전체 매니페스트를 npm에만 싣고 저장소에서 지우기**: 저장소 안 AI는 `.ts` 메타를 직접 읽으면 되므로 가능하지만, 색인 자체의 크기 문제를 풀지 않는다. 3번과 결합할 때만 의미가 있어 S3 결정 항목으로 넘긴다.

### 제약

- 메타 스키마(`StyleGuideMeta`·`VizTypeMeta`·`FoundationMeta`)는 바꾸지 않는다. 투영과 장치만 손댄다.
- `./manifest.json` 서브패스 export는 외부 소비자가 있을 수 있으므로 형태를 바꾸면 메이저 버전으로 표시한다(KAN-036 배포 규율 따름).
- census 게이트(metadata-coverage.json)는 유지한다. 색인 파일명이 바뀌면 등록만 갱신한다.

## 실행 계획
- [ ] `S1` 실측: 실제 토크나이저로 4종 매니페스트 크기와 "얇은 색인" 후보 크기를 잰다. 완료 기준: 수치 표가 이 문서 「수행 내역」에 기록되고, 얇은 색인 합계가 1만 토큰 안쪽인지 확인된다.
- [ ] `S2` 얇은 색인 스키마 확정: 4축 공통 필드(name·displayName·family/category·tags·domains·summary)와 축별 추가 필드를 정하고, 생성기 4종이 tier 1 색인을 내도록 바꾼다. 완료 기준: `buildManifest`류 4종이 새 형태를 내고 기존 `manifest.test.ts`가 새 형태로 초록.
- [ ] `S3` 커밋본·동기화 정책 결정: 색인 커밋 유지 여부, 바이트 일치 테스트 축소 범위, 수동 gen 2개의 prebuild 통일, 생성기의 dist 의존 제거. 완료 기준: 새 워크트리에서 `pnpm typecheck` → `pnpm test:unit`이 `pnpm build` 선행 없이 통과하거나, 불가능하면 그 사유가 기록된다.
- [ ] `S4` 상세 메타 2단 읽기 경로 정리: `./meta`·`./type-meta` 서브패스와 README 사례를 "색인 → 후보 상세" 흐름으로 고치고, METADATA_STRATEGY.md 3종의 "파일 하나만 읽는다" 서술을 갱신한다. 완료 기준: README·전략 문서에서 옛 서술이 0건(grep).
- [ ] `S5` 게이트 통과와 census 갱신: metadata-coverage.json 등록 갱신, 5종 게이트 전부 초록, 메모리 fresh-worktree-gate-order 갱신 여부 판단. 완료 기준: typecheck·build·test·storybook build·test:unit 모두 초록.

## 검증
- 실측 토큰 표가 「수행 내역」에 있고, 얇은 색인 4종 합계가 1만 토큰 안쪽이다(넘으면 사유와 함께 기록).
- `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit` 모두 초록.
- 새 워크트리(또는 `rm -rf packages/*/dist` 뒤)에서 `pnpm typecheck && pnpm test:unit`이 통과한다. 불가능하면 사유 기록.
- `grep -rn "한 개만 로드\|파일 하나로 통째로\|파일로 읽기용" README.md packages/*/README.md packages/*/*STRATEGY.md`가 옛 서술을 0건 낸다.
- 메타 스키마 3종 타입 정의 파일에 diff가 없다(`git diff --stat packages/tokens/src/styleGuideMeta.ts packages/visualization/src/typeMeta/types.ts packages/foundations/src/meta/types.ts`).
- `./manifest.json` 서브패스 형태가 바뀌었으면 changeset이 major로 표시돼 있다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T17:45 · s:876578f9 — `전략` 섹션 교체
- 2026-10-08T17:45 · s:876578f9 — `실행 계획` 섹션 교체
- 2026-10-08T17:45 · s:876578f9 — `검증` 섹션 교체
