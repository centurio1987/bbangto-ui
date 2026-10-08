---
card: KAN-064-AC0H6M
title: AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화
created: 2026-10-08
scope: packages/style-guide-catalog/src/manifest.ts, packages/style-guide-catalog/scripts/**, packages/style-guide-catalog/catalog.manifest.json, packages/visualization-style-guide-catalog/src/manifest.ts, packages/visualization-style-guide-catalog/scripts/**, packages/visualization-style-guide-catalog/catalog.manifest.json, packages/foundations/src/meta/manifest.ts, packages/foundations/scripts/**, packages/foundations/foundation.manifest.json, packages/visualization/src/typeMeta/manifest.ts, packages/visualization/scripts/**, packages/visualization/type.manifest.json, packages/style-guide-catalog/src/manifest.test.ts, packages/visualization-style-guide-catalog/src/manifest.test.ts, packages/foundations/src/meta/manifest.test.ts, packages/visualization/src/typeMeta/manifest.test.ts, metadata-coverage.json, packages/style-guide-catalog/METADATA_STRATEGY.md, packages/foundations/package.json, packages/visualization/package.json, packages/style-guide-catalog/package.json, packages/visualization-style-guide-catalog/package.json, .changeset/kan-064-manifest-index.md, README.md, packages/foundations/README.md, packages/style-guide-catalog/README.md, packages/visualization-style-guide-catalog/README.md, packages/foundations/FOUNDATION_METADATA_STRATEGY.md, packages/visualization/TYPE_METADATA_STRATEGY.md, packages/tokens/src/styleGuideMeta.ts, packages/tokens/src/foundationMeta.ts, packages/visualization/src/index.ts, packages/visualization/tsup.config.ts, packages/visualization/src/typeMeta/index.ts, packages/foundations/src/meta/index.ts, .gitignore, packages/foundations/src/metadataCoverage.test.ts, packages/style-guide-catalog/manifest/**, packages/visualization-style-guide-catalog/manifest/**, packages/foundations/manifest/**, packages/visualization/manifest/**, packages/visualization/src/typeMeta/jsdoc.test.ts, packages/visualization/README.md
---

# KAN-064-AC0H6M — AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화

## 전략
### 진단 요약 (2026-10-08)

매니페스트 4종은 `StyleGuide.meta` 같은 객체 필드를 생성기로 투영한 JSON 파일이다(`packages/style-guide-catalog/METADATA_STRATEGY.md`). 크기는 S1 에서 Claude 토크나이저로 쟀다(아래 「실측」). 처음 어림(한글 1.3토큰/글자)은 전체 4종을 약 11만 토큰으로 봤는데 실측은 156,272토큰이었다.

**이득인 것**: 메타 필드(`useWhen`·`avoidWhen`·`domains`·`mood`)는 코드에 없는 채택 근거다. 특히 foundation 76종은 설명이 거의 없어 메타가 유일한 선택 근거다.

**오버헤드인 것**: 메타가 아니라 투영 파일과 동기화 장치다.
- 통째로 읽기엔 큼(UI 하나가 50,325토큰, S1 실측). "파일 하나만 읽고 고른다"는 전제가 흔들린다.
- 선택 함수(`selectStyleGuides`·`selectVizTypes`·`selectFoundations`)는 JSON을 읽지 않고 객체·레지스트리를 받는다. JSON은 사람·AI가 눈으로 읽는 용도뿐이다.
- 동기화 비용: 바이트 일치 테스트 4종, 수동 재생성 2개(foundation·viz 유형, README.md:1199), 생성기가 dist를 읽어 생기는 빌드 순서 함정(README.md:1202, 메모리 fresh-worktree-gate-order), census 게이트(metadata-coverage.json).
- 메타가 자기 검증 부담을 낳음: accessibility 과장 감사 2회(KAN-024·026), displayName 정규화(KAN-027). 메타 축 인프라 카드 12장 안팎.
- 저장소 안에서 AI 소비자가 매니페스트를 실제로 읽어 채택한 사례는 확인 안 함(스킬·에이전트 지시문에 읽으라는 곳 없음).

### 실측 (S1, 2026-10-08)

잰 방법: `claude -p` 를 도구 없이 고정 시스템 프롬프트로 부르고 파일을 표준 입력으로 넣은 뒤, 사용량의 입력 토큰(`input_tokens` + 캐시 생성·읽기 합)에서 빈 입력 기준선 23,159토큰을 뺐다. 기준선은 처음과 끝에 두 번 재서 같았다. 모델은 `claude-opus-5-5` 다. 후보 파일은 커밋된 매니페스트에서 스크래치 스크립트로 뽑았고 커밋하지 않았다.

| 매니페스트 | 항목 | 글자 수 | 전체(실측) | 색인 후보, 객체·2칸 들여쓰기 | 색인 후보, 표 형태 |
|---|---|---|---|---|---|
| UI style guide | 51 | 94,282 | 50,325 | 13,575 | 8,469 |
| viz style guide | 30 | 58,653 | 30,392 | 7,657 | 5,081 |
| foundation | 76 | 76,483 | 37,081 | 14,348 | 7,841 |
| viz 유형 | 87 | 82,108 | 38,474 | 13,865 | 6,465 |
| 합계 | 244 | 311,526 | 156,272 | 49,445 | 27,856 |

색인 후보 필드는 공통으로 이름·`displayName`·`summary`·`tags`·`domains`·`metaStatus` 이고, 축별로 UI 는 `family`·`priority`, viz style guide 는 `family`, foundation 은 `colorScheme`, viz 유형은 `kind`·`category`·`exportNames`·`aliases`(`domains` 없음)를 더했다. 「표 형태」는 열 이름을 머리에 한 번만 적고 항목을 한 줄짜리 배열로 늘어놓은 것이다. 같은 필드를 객체로 한 줄씩 적으면 4종 합계 36,294토큰이다. 키 이름이 항목마다 되풀이되는 몫이 표 형태와의 차이다.

필드를 줄이면 이렇게 된다(표 형태, 4종 합계).

| 남긴 필드 | 합계 |
|---|---|
| 위 후보 전부 | 27,856 |
| `tags`·`domains`·`aliases`·`exportNames` 를 뺌 | 18,379 |
| 이름·`summary` 만 | 13,649 |

**목표 「4종 합계 1만 토큰 안쪽」은 선택에 쓸 수 있는 어떤 조합으로도 닿지 않는다.** `summary` 는 한국어 한 문장이라 글자당 토큰이 많아서, 이 필드 하나만 244개 남겨도 1만을 넘는다. 대신 AI 는 한 번에 한 축에서 고르므로 읽는 단위는 축 하나다. 표 형태면 축마다 5,081~8,469토큰이고, 지금 UI 매니페스트 하나(50,325)를 통째로 읽는 것보다 83% 적다. 후보 하나의 상세는 가장 큰 항목 기준으로 약 460~1,060토큰이다(축별 글자·토큰 비율로 환산, 따로 재지는 않음). 그래서 S2 는 「후보 전부 · 표 형태」로 가고, 목표는 「축마다 1만 토큰 안쪽」으로 읽는다. 이 읽기는 검토 판단 항목으로 올린다.

### 전략

**메타 필드는 그대로 두고, 매니페스트를 "얇은 색인"으로 줄이며, 동기화 장치를 단순화한다.**

1. **얇은 색인(tier 1)**: `name`·`displayName`·`family`(또는 `category`)·`tags`·`domains`·`summary` 한 줄만 싣는다. 처음에는 4종 합계 1만 토큰 안쪽을 목표로 했으나, S1 실측으로 축마다 1만 토큰 안쪽으로 고쳤다(「실측」 참고). AI는 이것으로 후보 2~3개를 고른다.
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
- [x] `S1` 실측: 실제 토크나이저(`claude -p` 사용량의 입력 토큰 차이, 2026-10-08 유저 선택)로 4종 매니페스트 크기와 "얇은 색인" 후보 크기를 잰다. 완료 기준: 「전략」 절의 어림 표가 실측 표로 바뀌고 「수행 내역」에 한 줄 요약이 남으며, 얇은 색인 합계가 1만 토큰 안쪽인지 확인된다.
- [x] `S2` 얇은 색인 스키마 확정: 4축 공통 필드(name·displayName·family/category·tags·domains·summary·metaStatus)와 축별 추가 필드를 정하고, 생성기 4종이 tier 1 색인을 내도록 바꾼다. 완료 기준: `buildManifest`류 4종이 새 형태를 내고 기존 `manifest.test.ts`가 새 형태로 초록.
- [x] `S3` 커밋본·동기화 정책 결정: 색인 커밋 유지 여부, 바이트 일치 테스트 축소 범위, 수동 gen 2개의 prebuild 통일, 생성기의 dist 의존을 걷을지 여부. 완료 기준: 매니페스트를 다시 만드는 길이 전부 `prebuild` 이고, `rm -rf packages/*/dist` 뒤 매니페스트 생성·검사 가운데 무엇이 무엇 때문에 실패하는지가 기록된다. 워크스페이스 전체를 build 없이 돌리는 일은 KAN-066 이 맡는다(2026-10-08 유저 선택).
- [ ] `S4` 상세 메타 2단 읽기 경로 정리: `./meta`·`./type-meta` 서브패스와 README 사례를 "색인 → 후보 상세" 흐름으로 고치고, METADATA_STRATEGY.md 3종의 "파일 하나만 읽는다" 서술을 갱신한다. 완료 기준: README·전략 문서에서 옛 서술이 0건(grep).
- [ ] `S5` 게이트 통과와 census 갱신: metadata-coverage.json 등록 갱신, 5종 게이트 전부 초록, 메모리 fresh-worktree-gate-order 갱신 여부 판단. 완료 기준: typecheck·build·test·storybook build·test:unit 모두 초록.

## 검증
- 실측 토큰 표가 「전략」 절에 있고, 얇은 색인 4종 합계가 1만 토큰 안쪽이다(넘으면 사유와 함께 기록).
- `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit` 모두 초록.
- 매니페스트 생성기 4개가 모두 `prebuild` 로 돈다(`gen:foundation-manifest`·`gen:type-manifest` 를 손으로 칠 일이 없다). `rm -rf packages/*/dist` 뒤 매니페스트 생성·검사에서 실패하는 것과 그 사유가 「수행 내역」에 있다. 워크스페이스 전체를 build 없이 돌리는 것은 이 카드의 검증이 아니다(KAN-066).
- `grep -rn "한 개만 로드\|파일 하나로 통째로\|파일로 읽기용" README.md packages/*/README.md packages/*/*STRATEGY.md`가 옛 서술을 0건 낸다.
- 메타 스키마 3종 타입 정의 파일에서 타입 선언이 바뀌지 않았다. 주석은 바뀔 수 있다(`git diff packages/tokens/src/styleGuideMeta.ts packages/visualization/src/typeMeta/types.ts packages/foundations/src/meta/types.ts` 에 주석 줄만 나온다).
- `./manifest.json` 서브패스 형태가 바뀌었으면 changeset이 major로 표시돼 있다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T17:45 · s:876578f9 — `전략` 섹션 교체
- 2026-10-08T17:45 · s:876578f9 — `실행 계획` 섹션 교체
- 2026-10-08T17:45 · s:876578f9 — `검증` 섹션 교체
- 2026-10-08T18:32 · s:bea40e0e — `실행 계획` 섹션 교체
- 2026-10-08T18:32 · s:bea40e0e — `검증` 섹션 교체
- 2026-10-08T18:34 · s:bea40e0e · S1 doing — 착수
- 2026-10-08T18:40 · s:bea40e0e — `전략` 섹션 교체
- 2026-10-08T18:40 · s:bea40e0e — `전략` 섹션 교체
- 2026-10-08T18:41 · s:bea40e0e — `전략` 섹션 교체
- 2026-10-08T18:41 · s:bea40e0e · S1 done — 실측(claude-opus-5-5): 전체 4종 156,272 · 색인 후보 객체 49,445 · 표 형태 27,856(축마다 5,081~8,469) · 이름+summary 만도 13,649 → 합계 1만은 불가, 축마다 1만으로 읽음(사유는 전략 절)
- 2026-10-08T18:41 · s:bea40e0e · S2 doing — 착수
- 2026-10-08T18:52 · s:bea40e0e — S2 결정: 상세 자리는 배치1 문서의 meta/<이름>.json 이 아니라 카드 전략대로 manifest/<이름>.json 이다 — foundations 의 ./meta 서브패스(dist/meta)와 이름이 겹치지 않게. 색인 파일 이름은 그대로, 공개 export 는 늘리지 않음
- 2026-10-08T18:52 · s:bea40e0e · S2 done — 색인 4종을 {axis,detail,columns,rows} 표 형태로, 상세는 manifest/<이름>.json 244개. 커밋 색인 실측 8,709·5,179·8,029·6,675(합계 28,592). census 게이트도 색인을 읽게 고침. 4패키지 test·typecheck 초록
- 2026-10-08T18:52 · s:bea40e0e — 배치1 끝. 다음 세션 메모: KAN-062 가 main 에 완료·병합됐다(a4e293e) — packages/visualization/README.md 겹침은 더 묻지 않고 S4 시작 때 scope 에 넣는다(용인 2건은 scope 바뀌면 다시 ai 로 재기록). 상세 파일 244개는 아직 untracked, S3 에서 .gitignore 처리
- 2026-10-08T19:00 · s:bea40e0e · S3 doing — 착수
- 2026-10-08T19:06 · s:bea40e0e — S3 결정: 수동 gen 2개(foundation·viz 유형)를 prebuild 로 옮겨 4개 모두 pnpm build 가 다시 만든다. 상세 manifest/ 4폴더는 .gitignore 하고 package.json files 로 npm 에만 싣는다(npm pack --dry-run 으로 51·30·76·87개 확인). 바이트 동기 테스트는 커밋하는 색인 4개에만 남긴다
- 2026-10-08T19:06 · s:bea40e0e — S3 dist 실험(packages/*/dist 7개 지운 뒤): 생성기 UI(core dist)·viz style guide(visualization dist)·foundation(tokens dist) 실패, viz 유형만 성공. 테스트도 UI 5파일·viz style guide 3파일·foundations 4파일(meta/manifest·registry·focusContrast·bundleBudget)·visualization labelFont 1파일이 같은 이유로 실패. 원인은 패키지 exports 가 dist 만 가리키는 것 하나 → KAN-066. foundation 생성기가 빌드 없이 돈다던 주석·README 는 틀렸다(주석은 고침, README 는 S4)
- 2026-10-08T19:06 · s:bea40e0e · S3 done — prebuild 4개 통일 · 상세는 gitignore + npm files · 색인만 바이트 동기 · dist 의존은 걷지 않고 사유 기록(KAN-066). pnpm build 뒤 커밋 색인 바이트 그대로
