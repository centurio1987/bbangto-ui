---
card: KAN-044-3KYT2Q
title: 불필요한 문서들 파악해서 정리하기 위한 계획 세우고 레포트 제출해라
created: 2026-08-25
scope: KANBAN/cards/KAN-044-3KYT2Q.md, KANBAN/batches/KAN-044-3KYT2Q.*, KANBAN/reports/KAN-044-3KYT2Q.*, KANBAN/reviews/KAN-044-3KYT2Q.*
---

# KAN-044-3KYT2Q — 불필요한 문서들 파악해서 정리하기 위한 계획 세우고 레포트 제출해라

## 전략
<!-- 왜 이 접근인가 · 제약 · 버린 대안. 사람이 자유롭게 편집한다. -->

**이 카드는 계획과 리포트까지다. 문서를 지우지 않는다.** 판정과 근거를 붙인 리포트를 내고,
실제 삭제·통합은 후속 카드가 한다. 판정과 집행을 한 카드에 묶으면 "지워도 되는가"라는 사람의
판단이 집행 커밋에 딸려 들어가 되돌리기 어려워진다.

### 대상 범위

레포의 마크다운 94개(`node_modules`·`.git`·`dist`·`storybook-static` 제외)가 모집단이다.
비-md 문서 후보는 넷뿐이고 전부 산출물·엔트리라 모집단이 아니다 — `KANBAN.board.html`,
`KANBAN/reviews/*.review.html` 2개(칸반 파생물), `apps/storybook/index.html`(앱 엔트리).

모집단 94개 중 **기계 소유 문서 17개는 판정 대상에서 뺀다.** 사람이 정리할 것이 아니라
도구가 쓰고 지우는 파일이기 때문이다.

| 소유자 | 파일 | 수 |
|---|---|---|
| changesets | `packages/*/CHANGELOG.md` · `.changeset/README.md` | 9 |
| manage-kanban | `KANBAN.md` · `.kanban/log.md` · `KANBAN/cards/*` · `KANBAN/reviews/*.review.md` | 6 |
| (이 카드가 만드는 것) | `KANBAN/cards/KAN-044-*.md` 등 | — |

따라서 **판정 모집단은 78개**다(94 − 9 − 6 − 이 카드 산출물 1). 정확한 수는 S1이 확정한다.

### 판정 근거를 무엇으로 삼는가

세 축을 겹쳐 본다. 하나만으로는 오판한다.

1. **inbound 참조 수** — 그 문서를 코드·다른 md·`CLAUDE.md`·스킬·`package.json`이 부르는가.
   0건이면 폐기 후보 신호이지 판정이 아니다(사람만 읽는 문서는 원래 0건이다).
2. **최신성과 커밋 이력** — `packages/core/catalog/*.audit.md` 38개는 전부 2026-06-27 단일 커밋
   이후 무변경이다. 한 번 쓰고 안 본 문서라는 신호다.
3. **내용 중복** — 루트의 `ASSET_INTEGRATION_PLAN` · `RELEASE_PLAN` · `WAVE0_REPORT` ·
   `METADATA_COVERAGE_AUDIT` 가 서로, 그리고 패키지의 `METADATA_STRATEGY` 3종과 겹치는지.
   이건 파일을 실제로 열어야 알 수 있어서 S4로 따로 뺐다.

### 판정은 넷이다

`존치` · `통합`(어디로 갈지 함께 적는다) · `이관`(자리를 옮긴다) · `폐기`.
판정마다 근거 한 줄과 위 세 축의 값을 붙인다. **근거를 못 대면 `존치`로 둔다** —
"오래됐다"만으로 지우지 않는다.

### 버린 대안

- **파일을 전부 열어 읽고 판정** — 78개 × 평균 200줄이면 한 세션 예산을 넘긴다. 그래서 메타데이터
  (참조·날짜·크기)로 먼저 거르고, 「통합」·「폐기」 후보만 S4에서 실제로 연다.
- **정리까지 이 카드에서 집행** — 위 첫 문단의 이유로 버렸다. 후속 카드로 분해한다(S5).
- **새 루트 문서(`DOC_INVENTORY.md`)를 만들어 인벤토리를 남김** — 문서 정리 카드가 루트 문서를
  하나 더 늘리는 자기모순이다. 인벤토리는 이 카드 실행 문서 안에 두고, 사람이 보는 것은
  `KANBAN/reports/` 의 계획 리포트로 낸다.

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->
- [x] `S1` 문서 전수 인벤토리 — 모집단 확정과 메타데이터 수집. 완료 기준: md 전량에 (경로·줄수·바이트·최종 커밋일·커밋 수·소유자[사람/기계]) 6열이 붙고, 행 수가 `find` 결과와 일치한다. 기계 소유 제외 목록이 명시된다
- [x] `S2` inbound 참조 그래프 — 각 문서를 부르는 곳을 레포 전역에서 찾는다(코드·md·`CLAUDE.md`·스킬·`package.json`·스토리). 완료 기준: 문서마다 참조 수와 참조원 경로가 붙고, 참조 0건 목록이 따로 나온다
- [x] `S3` 판정 규칙 확정 + 1차 분류 — 존치/통합/이관/폐기 4판정의 결정 규칙을 먼저 글로 박고, 그 규칙으로 판정 모집단 전량을 분류한다. 완료 기준: 전량에 판정 1개 + 근거 1줄. 규칙으로 안 갈리는 건은 `보류`로 표시하고 사유를 남긴다
- [x] `S4` 통합·폐기 후보 원문 대조 — 판정이 `통합`·`폐기`·`보류`인 건만 파일을 실제로 열어 중복·유효성을 확인한다. 최소 대상: 루트 5종(ASSET_INTEGRATION_PLAN·RELEASE_PLAN·WAVE0_REPORT·METADATA_COVERAGE_AUDIT·DESIGN_SYSTEM_GUIDE)과 `packages/core/catalog/*.audit.md` 38개 표본. 완료 기준: 건마다 "무엇이 어디로" 한 줄, `보류` 0건
- [x] `S5` 정리 실행 계획 — 후속 카드 분해안(카드마다 범위·순서·되돌리기 방법)과 리스크(참조 깨짐·CLAUDE.md 지시 유실). 완료 기준: 후속 카드 후보가 범위와 함께 목록으로 나오고, 참조가 걸린 문서마다 "지우기 전에 고칠 곳"이 적힌다
- [x] `S6` 계획 리포트 발행 — `report-data` → (authoring-kit 있으면 집필) → `report.py` 렌더 → Artifact 발행. 완료 기준: 단일 자립 HTML이 외부 요청 0건으로 뜨고 링크가 유저에게 간다

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

**이 카드는 문서만 만든다 — 코드 게이트(`pnpm typecheck`·`build`·`test`)는 돌 대상이 없다.**
그래서 검증은 산출물의 완전성과 근거 추적성으로 판정한다. 아래 넷이 전부 통과해야 끝이다.

1. **모집단 누락 0** — 인벤토리 행 수가 아래 명령의 출력과 정확히 같다.
   ```bash
   find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.git/*" \
     -not -path "*/dist/*" -not -path "*/storybook-static/*" | wc -l
   ```
2. **판정 누락 0** — 판정 모집단(기계 소유 제외) 전량에 판정 1개가 붙고 `보류`가 0건이다.
3. **근거 추적 가능** — 판정마다 근거 1줄과 세 축(참조 수·최종 커밋일·중복 대상)의 값이 붙는다.
   `폐기` 판정에는 참조 0건이거나 "지우기 전에 고칠 곳"이 반드시 적혀 있다.
4. **리포트가 자립 HTML로 뜬다** — `KANBAN/reports/KAN-044-3KYT2Q.report.html` 이 존재하고
   외부 요청이 0건이다(CSP 제약). 다음으로 확인한다.
   ```bash
   grep -oE '(src|href)="https?://[^"]+' KANBAN/reports/KAN-044-3KYT2Q.report.html | wc -l   # 0 이어야 한다
   python3 <스킬>/scripts/kanban.py derived-status .   # 해당 리포트가 fresh
   ```

**이 카드가 판정하지 않는 것**: 실제 삭제·통합 커밋. 그것은 S5가 내는 후속 카드의 몫이고,
이 카드의 검증에 넣지 않는다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-08-25T00:01 · s:af4d5613 — `전략` 섹션 교체
- 2026-08-25T00:01 · s:af4d5613 — `실행 계획` 섹션 교체
- 2026-08-25T00:01 · s:af4d5613 — `검증` 섹션 교체
- 2026-08-25T00:10 · s:af4d5613 · S1 doing — 착수
- 2026-08-25T00:12 · s:af4d5613 · S1 done — md 98개 전수 인벤토리 → 기계 소유 19 제외 = 판정 모집단 79개 확정. 4구획(루트9/core-catalog44/core그외7/viz+나머지19) + 판정 규칙 6조·안전 규칙 2조·워커 계약 5필드를 KANBAN/reports/KAN-044-3KYT2Q.inventory.md 에 박음
- 2026-08-25T00:12 · s:af4d5613 — 인벤토리 산출물 위치를 카드 실행 문서 안이 아니라 KANBAN/reports/KAN-044-3KYT2Q.inventory.md 로 뒀다 — 79행 표 + 규칙이 전략 절을 덮어 카드 문서가 안 읽히기 때문. scope 안이라 루트 문서를 늘리지 않는다는 전략 취지는 유지된다
- 2026-08-25T00:12 · s:af4d5613 · S2 doing — 착수
- 2026-08-25T00:12 · s:af4d5613 · S4 doing — 착수
- 2026-08-25T00:14 · s:af4d5613 — S6 사전 확인: authoring-kit 플러그인은 설치돼 있으나 scope 가 centurio1987.github.io·code_test·resume 3개 프로젝트뿐이고 bbangto-ui 에는 안 붙어 있다 — S6 에서 이 레포에 붙일지 유저에게 묻고, 안 붙이면 voice 미적용으로 렌더한다
- 2026-08-25T00:26 · s:af4d5613 · S2 done — 4구획 워커 병렬 조사로 79건 전량 inbound 참조 조회 완료. 참조 0건 6건(README·RELEASE_PLAN·core/README·DESIGN-amber·apps/storybook/README + audit 44개는 파일 단위 0/글롭 3). 코드가 근거로 인용하는 문서 다수 확인(styleGuideMeta.ts→style-classification, blocks·patterns/index.ts→DESIGN_SYSTEM_GUIDE, genTrendTable.ts→style-guide-catalog.md)
- 2026-08-25T00:26 · s:af4d5613 · S4 done — 통합·폐기 후보 원문 대조 완료. 겹치는 짝 10쌍(A~J) 줄 번호까지 확정. 실측 불일치 12건 발견 — CLAUDE.md·QUALITY_CHECKLIST·DESIGN_SYSTEM_GUIDE 의 packages/theme-* 4종 부재, README 수치 3건, RELEASE_PLAN 버전표 7행 전부 지나감, COMPONENT_CATALOG 43↔44 및 없는 audit 7종 지목, CHANGELOG 6개의 files 편입 오기재
- 2026-08-25T00:26 · s:af4d5613 · S3 doing — 착수
- 2026-08-25T00:27 · s:af4d5613 · S3 done — 판정 79/79 완료, 보류 0. 존치 27(그중 겹침정리·실측수정 8) · 통합 49(실작업 6건, 44는 audit 묶음 1건) · 이관 0 · 폐기 3(RELEASE_PLAN·sample_design/DESIGN-amber·apps/storybook/README, 전부 참조 0). 규칙 2번을 전체통합/부분통합으로 가르는 보정으로 보류 0 달성
- 2026-08-25T00:28 · s:af4d5613 · S5 doing — 착수
- 2026-08-25T00:30 · s:af4d5613 · S5 done — 후속 카드 4장(A 폐기집행 / B core계열통합 / C viz계열통합 / D 규율문서 실측정합) 분해. 루트 독립성 판정: A·B·C 병렬, B→D 직렬 중재 필요(DESIGN_SYSTEM_GUIDE 겹침), KAN-045 와 겹침 0. 리스크 7건에 막는 법 명시. 정리 후 모집단 79→35
- 2026-08-25T12:36 · s:af4d5613 — 검증 4종 실행 결과 — ①모집단 누락 0: 인벤토리 79행 = 현재 판정 모집단 79, 차집합 양쪽 0 ②판정 누락 0: 표 파싱 재검산 존치27+통합49+이관0+폐기3=79, 보류 0 ③폐기 3건 전부 참조 0 명시 ④리포트 자립: 외부 요청 0·fetch 0·63KB·voiced=true·derived-status fresh
- 2026-08-25T12:36 · s:af4d5613 · S6 done — authoring-kit(ppangtolab-teacher × kanban-report, 규칙 해시 5ec7fd0a8902f140) 집필 초안으로 계획 리포트 렌더. 집필 워커가 §16 산술 오류(79→35)를 잡아 28로 정정. 외부 요청 0건 자립 HTML 63KB
- 2026-08-25T14:10 · s:cb5e6918 — 검토 3번 반려(유저 의견 「제거」) — ORDER.md 판정을 존치→폐기로 뒤집고 인벤토리 §7·§8·§13-A·§15·§16 과 리포트를 그에 맞춰 고친다
