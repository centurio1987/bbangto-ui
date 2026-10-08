---
card: KAN-064-AC0H6M
batch: 2
created: 2026-10-08
branch: KAN-064-AC0H6M
status: 계획
steps: S3, S4, S5
---

# KAN-064-AC0H6M 배치2 — 다시 만드는 방법을 하나로 맞추고, 문서와 게이트를 따라오게 한다

카드: [KAN-064-AC0H6M.md](../cards/KAN-064-AC0H6M.md) · 범위 `S3` · `S4` · `S5`
선행: 배치1 (`S1` · `S2`)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

배치1이 매니페스트의 모양을 바꿨다면, 이 배치는 그것을 누가 언제 다시 만들고 무엇이 최신을 지키는지를 정한다. 그다음 「파일 하나만 읽는다」고 적은 문서와 주석을 2단 읽기(색인 → 후보 상세)로 고치고, 게이트 다섯과 census 등록을 맞춘다.

## 1. 작업 패키지

### WP1 · `S3` 커밋본·동기화 정책

정할 것은 셋이고, 각각 기본안을 두고 시작한다.

| 정할 것 | 기본안 | 근거 |
|---|---|---|
| 수동 gen 2개(foundation·viz 유형) | `prebuild` 로 옮긴다 | 둘 다 순수 데이터만 읽어 빌드 없이 돈다(`packages/foundations/scripts/genFoundationManifest.ts:5`, `packages/visualization/scripts/genTypeManifest.ts:5`). 옮기면 「명령 넷의 성격이 서로 다르다」는 README 표(`README.md:1206`)가 한 줄로 준다 |
| 커밋본 | 얇은 색인 4개만 커밋하고, 항목별 상세 파일은 `.gitignore` 에 넣어 빌드 때만 만들어 npm 패키지에 싣는다 | 저장소를 둘러보는 AI 에게는 색인이 필요하고, 상세는 소스(`.ts` 메타)를 직접 읽으면 된다. 상세 244개를 커밋하면 동기화할 자리가 오히려 는다 |
| 바이트 일치 테스트 | 색인 4개에만 남긴다 | 색인 필드(이름·summary·tags·domains)는 좀처럼 안 바뀌어, 메타의 `useWhen` 한 줄을 고칠 때마다 빨강이 되던 일이 없어진다. 카드 전략은 「결정적인가만 본다」였지만, 그러면 커밋한 색인이 말없이 낡는다 |

생성기의 `dist` 의존은 UI·viz style guide 둘에만 있다. 프리셋 파일 하나에 메타와 런타임 wrapper 가 함께 있어서다(`packages/style-guide-catalog/src/artDecoLuxe.tsx:3`·`:290`). 걷어내려면 프리셋 81개(UI 51 · viz 30)에서 메타를 떼어 내야 하고, UI 쪽 프리셋은 KAN-065 가 고칠 파일과 겹친다. 기본안은 **걷어내지 않고** `prebuild` 순서(`pnpm -r` 이 core·visualization 을 먼저 빌드한다)에 맡긴 뒤 그 사유를 기록하는 것이다.

**완료 기준**: 매니페스트를 다시 만드는 길이 전부 `prebuild` 다. `rm -rf packages/*/dist` 뒤 어떤 명령이 무엇 때문에 실패하는지가 카드 문서에 기록된다. 워크스페이스 전체를 build 없이 돌리는 일은 KAN-066 이 맡는다(4항).

### WP2 · `S4` 2단 읽기 문서·주석

옛 서술이 있는 자리(2026-10-08 grep):

| 자리 | 줄 |
|---|---|
| 문서 | `packages/visualization/README.md:56` · `packages/foundations/README.md:14` · `README.md:1206` 표 · 전략 문서 3개(`packages/style-guide-catalog/METADATA_STRATEGY.md` · `packages/foundations/FOUNDATION_METADATA_STRATEGY.md` · `packages/visualization/TYPE_METADATA_STRATEGY.md`) |
| 생성 함수 주석 | `packages/style-guide-catalog/src/manifest.ts:2` · `packages/visualization-style-guide-catalog/src/manifest.ts:2` · `packages/foundations/src/meta/manifest.ts:2` · `packages/visualization/src/typeMeta/manifest.ts:2` |
| 메타 타입 파일 주석 | `packages/tokens/src/styleGuideMeta.ts:8` · `packages/tokens/src/foundationMeta.ts:9` |
| 그 밖의 안내 | `packages/visualization/src/index.ts:21` · `packages/visualization/tsup.config.ts:21` · `packages/visualization/src/typeMeta/index.ts` · `packages/foundations/src/meta/index.ts` |

**완료 기준**: 카드 「검증」의 grep 이 옛 서술 0건을 낸다. 메타 타입 파일은 주석만 바뀌고 타입 선언은 그대로다.

### WP3 · `S5` 게이트와 census

| 무엇 | 바꾸는 것 |
|---|---|
| `metadata-coverage.json` | 상세 파일 자리가 생기면 `files` 에 등록한다. 색인 파일 이름은 그대로라 축 4개의 등록은 안 바뀔 수 있다 |
| changeset | `./manifest.json` · `./foundation.manifest.json` · `./type.manifest.json` 의 형태가 바뀌었으므로 해당 패키지 4개를 major 로 적는다 |
| 메모리 `fresh-worktree-gate-order` | S3 결과로 「새 워크트리는 build 먼저」가 그대로면 둔다 |

**완료 기준**: typecheck · build · test · storybook build · test:unit 이 모두 초록이다.

## 2. 의존과 순서

`S3 → S4 → S5` 순차다. S4 가 적을 문장(무엇이 커밋되고 무엇이 빌드 때만 생기는가)이 S3 의 결정에서 나오고, S5 의 census 등록도 S3 이 정한 파일 자리를 따른다.

배치 밖 의존이 둘이다.

- **KAN-055(배포)와 같은 파일을 고친다.** S3 의 `prebuild` 는 `packages/foundations/package.json` · `packages/visualization/package.json` 을, 상세 파일을 npm 에 싣는 일은 UI·viz style guide 의 `package.json` `files` 를, S5 는 `.changeset/kan-064-manifest-index.md` 를 고친다. 착수 전에 scope 에 넣었고, KAN-055 와의 겹침(package.json 3개 · changeset)과 KAN-065 와의 겹침(루트 README.md)은 용인으로 기록했다(2026-10-08 유저 선택).
- **KAN-062 와 같은 문서를 고친다.** KAN-062 의 scope 에 `packages/visualization/README.md` 가 있다(2026-10-08 기록). 이 카드는 같은 파일의 56번 줄 표를 고쳐야 하는데, 이 겹침은 아직 중재하지 않아 그 파일을 scope 에 넣지 않았다. S4 전에 묻는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| README 를 고치다 게이트 명령 목록을 건드린다 | `packages/foundations/src/gateDocs.test.ts` 빨강 | 게이트 다섯 줄은 그대로 두고 매니페스트 표만 고친다 |
| 카드 「검증」의 「메타 타입 파일 diff 없음」을 주석 수정이 어긴다 | `git diff --stat` 이 `styleGuideMeta.ts` 를 낸다 | 검증 문구를 「타입 선언 diff 없음, 주석만 바뀜」으로 고치고 그 사실을 검토 판단 항목에 적는다 |
| 상세 파일을 커밋하지 않으면 저장소를 둘러보는 AI 가 상세를 못 본다 | 색인에서 고른 뒤 읽을 파일이 저장소에 없다 | 색인에 소스 위치(`.ts` 파일 경로)를 함께 싣는다. S1 수치에 이 필드도 넣어 잰다 |
| major 표시가 KAN-055 의 배포 버전과 엇갈린다 | 배포 전에 major changeset 이 둘 이상 쌓인다 | changeset 은 이 카드에서 쓰되 배포는 KAN-055 의 실행 지시를 따른다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-064-AC0H6M/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택).** 이 배치는 세 work 가 앞 결정에 차례로 기대므로 오케스트레이션으로 나눌 자리가 없다.

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(채택)** | 2 | 1 | S3 → S4 → S5 가 순차라 그대로 한 세션이 한다 |
| 오케스트레이션 | 2 | 이 배치는 1 | S4 의 문서 고침만 자리별로 나눌 수 있지만 문장이 S3 결정 하나에서 나와 나눌 이득이 거의 없다 |

**S3 의 검증 범위: 매니페스트 생성·검사까지로 좁히고, 워크스페이스 전체를 build 없이 돌리는 일은 KAN-066 으로 뗐다(2026-10-08 유저 선택).** 원래 카드 목표는 「새 워크트리에서 build 선행 없이 typecheck·test:unit 이 통과한다」인데, 패키지들이 서로의 타입을 `dist/index.d.ts` 로 찾고(`packages/core/package.json` 의 `exports.types`, 루트 `tsconfig.json` 에 `paths` 없음) 새 워크트리의 첫 typecheck 가 foundations → tokens 에서 TS2307 로 실패한 기록이 있다(메모리 `fresh-worktree-gate-order`, 2026-10-07 KAN-050). 매니페스트를 아무리 고쳐도 이 목표는 이 카드 안에서 서지 않는다.
