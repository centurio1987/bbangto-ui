---
card: KAN-044-3KYT2Q
title: 불필요한 문서들 파악해서 정리하기 위한 계획 세우고 레포트 제출해라
created: 2026-08-25
branch: KAN-044-3KYT2Q
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-044-3KYT2Q
base: b9745ad
status: 검토 대기
---

# KAN-044-3KYT2Q 검토 요청 — 불필요한 문서들 파악해서 정리하기 위한 계획 세우고 레포트 제출해라

카드: [KAN-044-3KYT2Q.md](../cards/KAN-044-3KYT2Q.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-044-3KYT2Q` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-044-3KYT2Q` |
| 베이스 | `b9745ad` |
| 변경 훑기 | `git diff b9745ad...HEAD` |

**커밋 15건**

```text
0e6ed5d KAN-044: ORDER.md 판정 존치→폐기 (검토 3번 반려 반영)
27b43e6 kanban: KAN-044 검토 판정 유입 — 승인 6 · 반려 1(3번 ORDER.md)
70708e2 kanban: KAN-044 §14 에 D↔KAN-046 독립성 행 보강 + 검토 4번에 추가 의견
1b9dc96 kanban: KAN-044 계획 리포트 재렌더(검토 컬럼 반영)
f62106e kanban: KAN-044 검토로 이동 + 검토서 발행(판단 항목 7건) + 검토 화면 렌더
bc560a8 KAN-044: 계획 리포트 재렌더(work 6/6 반영) + Artifact 발행
3f2ddd9 KAN-044 S6: 계획 리포트 발행 + §16 산술 정정(79→28) + 검증 4종 통과
f85e6c3 KAN-044 S6: authoring-kit 을 bbangto-ui 에 활성화 + kanban-report spec/paths 등록 (유저 승인)
b8dc396 KAN-044 S5: 후속 카드 4장 분해 + 루트 독립성 판정(B→D 직렬) + 리스크 7건
e6f416d KAN-044 S2/S4/S3: 79건 참조 그래프·원문 대조·판정 통합 (존치27/통합49/폐기3, 보류0)
b311313 kanban: KAN-044 배치1 완료 표시 + 배치2 착수 시점 판단 기록(S3 유지)
215fd81 KAN-044 S1: 문서 전수 인벤토리(98→모집단 79) + 4구획 분배 + 판정 규칙·워커 계약
56fe689 kanban: KAN-044 배치 3종 계획 문서 작성 (B안 오케스트레이션 · 4구획 팬아웃)
07cca32 kanban: KAN-044 실행 문서 생성 + 전략·WBS(S1~S6)·검증 기준 작성
def52e5 kanban: KAN-044 진행 중으로 이동 (문서 정리 계획 리포트 착수)
```

**변경 파일 20개 (+3270 −51)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.claude/authoring/paths.json` | M | 6 | 0 |
| `.claude/authoring/specs/kanban-report/spec.json` | M | 49 | 0 |
| `.claude/authoring/specs/kanban-report/spec.md` | M | 45 | 0 |
| `.claude/settings.json` | M | 3 | 0 |
| `.kanban/archive.jsonl` | M | 3 | 0 |
| `.kanban/log.md` | M | 3 | 3 |
| `.kanban/reviews/KAN-044-3KYT2Q.events.jsonl` | M | 24 | 0 |
| `.kanban/reviews/KAN-044-3KYT2Q.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 42 | 38 |
| `KANBAN.board.html` | M | 235 | 5 |
| `KANBAN.md` | M | 7 | 5 |
| `KANBAN/batches/KAN-044-3KYT2Q.batch1.md` | M | 55 | 0 |
| `KANBAN/batches/KAN-044-3KYT2Q.batch2.md` | M | 68 | 0 |
| `KANBAN/batches/KAN-044-3KYT2Q.batch3.md` | M | 63 | 0 |
| `KANBAN/cards/KAN-044-3KYT2Q.md` | M | 113 | 0 |
| `KANBAN/reports/KAN-044-3KYT2Q.draft.md` | M | 163 | 0 |
| `KANBAN/reports/KAN-044-3KYT2Q.inventory.md` | M | 404 | 0 |
| `KANBAN/reports/KAN-044-3KYT2Q.report.html` | M | 572 | 0 |
| `KANBAN/reviews/KAN-044-3KYT2Q.review.html` | M | 1160 | 0 |
| `KANBAN/reviews/KAN-044-3KYT2Q.review.md` | M | 234 | 0 |

**롤백 태그 9개**

```text
kan/KAN-044-3KYT2Q/S1
kan/KAN-044-3KYT2Q/S2
kan/KAN-044-3KYT2Q/S3
kan/KAN-044-3KYT2Q/S4
kan/KAN-044-3KYT2Q/S5
kan/KAN-044-3KYT2Q/S6
kan/KAN-044-3KYT2Q/batch1
kan/KAN-044-3KYT2Q/batch2
kan/KAN-044-3KYT2Q/batch3
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-044-3KYT2Q.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

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

**실행 결과**

```text
① 모집단 누락 0 — 통과 (재실행 2026-08-25, 반려 반영 후)
   find . -name "*.md" (node_modules·.git·dist·storybook-static 제외) = 102
   내역: 사람 79 · 기계:changesets 9 · 기계:kanban 13 · 기계:플러그인자산 1
   인벤토리 §3 표 행 수 = 79. 판정 모집단과 차집합 양쪽 0
   직전 실행의 101 → 102 증가분 1건은 검토서 발행본(KANBAN/reviews/KAN-044-3KYT2Q.review.md)이고
   기계 소유라 판정 모집단이 아니다. 사람 문서 79 는 변동 없음.

② 판정 누락 0 — 통과
   §7 집계: 존치 26 · 통합 49 · 이관 0 · 폐기 4 · 보류 0 · 합 79
   검토 3번 반려(「제거」) 반영으로 존치 27→26 · 폐기 3→4 로 이동했고 합은 그대로다.

③ 근거 추적 가능 — 통과
   판정마다 근거 1줄 + 3축(참조 수·최종 커밋일·중복 대상) 기재.
   폐기 4건 중 3건은 참조 0건이고, ORDER.md 만 참조 1건이라
   "지우기 전에 고칠 곳"에 packages/visualization/visualization-type-inventory.md:376 을 명시했다.
   §15 리스크에 「폐기 문서 참조 고아」 행과 A 의 완료 기준(grep 0건)을 함께 넣었다.

④ 리포트가 자립 HTML 로 뜬다 — 통과
   grep -oE '(src|href)="https?://[^"]+' KANBAN/reports/KAN-044-3KYT2Q.report.html | wc -l = 0
   derived-status: KAN-044-3KYT2Q.report.html = fresh (voiced, 초안과 함께 재렌더)
```

## 3. 판단 항목 — 스크립트가 판정할 수 없는 것

<!-- 스크립트가 판정할 수 없는 것만 적는다 — 값의 진위, 선택지 중 하나를 고른 근거,
     범위를 그은 자리. 2항에서 이미 돌아간 검증을 여기 옮겨 적지 않는다.
     한 줄 형식: 체크박스 하나에 의견 하나 — "<주제> — <지금 고른 값과 그 근거>".
     **의견마다 「상세」 접기가 따라붙는다** — 검토자는 이 카드를 수행하지 않았으므로
     내부 기호(`L10`·`P5`·`S8`)만 던지면 판정할 재료가 없다. 상세에는 그 기호를 풀어
     쓰고 원문 경로(`파일:줄`)나 링크를 건다.
     비어 있으면 "기계가 다 판정했고 사람이 정할 것이 없다"는 뜻이다. 그 판단도
     착수한 쪽이 하는 것이지 검토자가 빈칸을 보고 추측할 일이 아니다.
     **승계 절(3-0)이 있으면 그것이 먼저 온다** — 다른 검토서에서 넘어온 의견이고,
     판정은 승계를 받은 이 문서 하나에서만 내려진다. -->

**의견마다 판정과 추가 의견이 따로 붙습니다.** 판정은 상태이고 추가 의견은 말입니다 — 승인/반려를 아직
안 정했어도 의견 하나에만 추가 의견을 달 수 있고, 반대로 의견 하나만 먼저 닫을 수도 있습니다.
`<번호>`는 의견 순서이고, 주제의 문구 일부로도 찾습니다.

```
# 판정 — 승인 · 반려 · 철회
python3 scripts/kanban.py review-judge <project-root> --card KAN-044-3KYT2Q --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-044-3KYT2Q --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-044-3KYT2Q --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] packages/core/catalog/*.audit.md 44개를 한 파일로 접을 것인가 그대로 둘 것인가 — 지금은 「통합(44→1)」으로 판정했습니다
    - **상세** — 파일 단위 참조가 44개 전부 0건이고(글롭 참조만 3행) 43개에 'Saturation round: 1 (pilot)'이 붙은 1회성 증빙이라 개별 파일로 남을 이유가 없습니다. 다만 기각 사유(absorbed/noise/dropped 후보의 탈락 논거)가 유일본이라 폐기는 아닙니다. 접는 작업 자체가 44개를 읽는 비용입니다. 판정과 대안 둘 다: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §9. 글롭 참조 3행의 원문: packages/core/COMPONENT_CATALOG.md:234 · :248 · packages/core/CHANGELOG.md:136

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견** — _아직 없습니다._

- [x] apps/storybook/README.md 를 지울 것인가 Storybook 실행법으로 다시 쓸 것인가 — 지금은 「폐기」입니다
    - **상세** — 현재 내용은 Vite react-ts 스톡 템플릿 원문 그대로라 어느 쪽을 골라도 지금 글은 남지 않습니다. 원문: apps/storybook/README.md:1 이 '# React + TypeScript + Vite' 입니다. 참조 0건이고 apps/storybook/package.json 이 private:true 라 npm 미배포입니다. 판정 근거: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §11 마지막 행

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견** — _아직 없습니다._

- [x] ORDER.md 를 동결 존치로 둘 것인가 — 지금은 「존치」입니다
    - **상세** — ORD-001~011(ORDER.md 에 봉인된 옛 지시 11건)의 원문 블록은 KAN-001~011 로 문자 그대로 이관됐지만, 각 항목의 '결과:' 상세 서술은 ORDER.md 에만 있습니다 — 원문 대조: ORDER.md:246-251(ORD-006 결과 6줄) ↔ KANBAN.md 의 KAN-006 메모 1줄. 옮기려면 칸반 메모의 한 줄 제약과 부딪칩니다. 판정 근거: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §8 ORDER.md 행

    > **판정**
    >
    > - 반려 · 유저 · 2026-08-25
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견**
    >
    > - 유저 · 2026-08-25 — 제거
    > - ai · 2026-08-25 — 처리 회신(2026-08-25): 「제거」로 반영했습니다. ORDER.md 판정을 존치→폐기로 바꾸고 인벤토리 13곳·집필 초안 6곳을 고쳤습니다 — §7 집계(존치 27→26·폐기 3→4), §8 ORDER.md 행(근거를 이 반려로 교체 + 지우기 전에 고칠 곳 = packages/visualization/visualization-type-inventory.md:376 의 'ORDER.md 편집 금지' 문구), §11 통합 2건의 '동결이라 안 고침' 단서를 '함께 폐기되므로 고칠 것 없음'으로, §13 A 카드를 폐기 4건으로(scope 에 ORDER.md 추가), §15 리스크를 '폐기 문서 참조 고아'로 교체하고 A 완료 기준에 grep 0건을 넣었으며, §16 정리 후 모집단 28→27·루트 6→5. 결과 상세 서술은 레포에서 사라지지만 git 이력에는 남습니다. 커밋 0e6ed5d

- [x] 후속 카드를 A·B·C·D 넷으로 가른 경계가 맞는가
    - **상세** — scope(카드가 건드리는 경로 글롭)가 겹치지 않도록 갈랐습니다 — A=폐기 3건 집행, B=core 카탈로그 계열 통합, C=visualization 계열 통합, D=규율 문서 실측 정합. 다르게 가르는 방식(예: 통합/수정 축이 아니라 패키지 축)도 성립합니다. 넷의 scope 와 하는 일 전문: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §13

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견**
    >
    > - ai · 2026-08-25 — §14 보강(2026-08-25): 이 표는 KAN-045 하고만 대조했는데, main 의 「할 일」에 KAN-046-33S4G8(CLAUDE.md 품질 게이트에 pnpm test:unit 추가)이 살아 있습니다. D 의 scope 첫 항목이 CLAUDE.md 라 dep-check 가 루트 간 겹침으로 잡습니다. 다만 절이 달라(KAN-046=게이트 명령 :33-38, D=구조도 :56-63) 순서 의존이 없으므로 직렬이 아니라 dep-waive 로 제안했습니다 — 근거와 명령은 인벤토리 §14 에 넣었습니다

- [x] 후속 카드 B→D 직렬 중재를 등록할 것인가 — 지금은 「필요하다」로 판정했습니다
    - **상세** — 직렬 중재는 두 카드를 병렬로 돌리지 않고 순서를 강제하는 장치입니다. 둘 다 DESIGN_SYSTEM_GUIDE.md 를 고칩니다 — B 는 :182(ASSET_INTEGRATION_PLAN 링크 제거), D 는 :170(packages/theme-* 표기 수정). 고치는 줄이 달라 git 병합은 되지만, D 가 먼저 돌면 :182 에 고칠 것이 없고 B 가 나중에 그 파일을 없애 링크가 깨진 채 남습니다. 판정 근거: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §14

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견** — _아직 없습니다._

- [x] .claude/settings.json 과 .claude/authoring/** 변경이 이 카드 scope 밖인데 이대로 둘 것인가
    - **상세** — 이 카드가 선언한 scope 는 KANBAN/ 아래 네 글롭뿐입니다 — 원문: KANBAN/cards/KAN-044-3KYT2Q.md:5 의 frontmatter scope 줄. 그런데 authoring-kit 활성화가 .claude/ 4파일을 건드렸습니다: .claude/settings.json(enabledPlugins 3줄 추가) · .claude/authoring/paths.json · .claude/authoring/specs/kanban-report/spec.json · 같은 폴더 spec.md. 유저 승인을 받고 한 변경이지만 scope 선언과는 어긋나고, review-init 이 이것을 경고로 냈습니다. 커밋 f85e6c3

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견** — _아직 없습니다._

- [x] 판정 규칙을 「전체 통합 / 부분 통합」으로 가른 보정에 동의하는가
    - **상세** — S1(이 카드 실행 계획의 첫 단계 — 문서 전수 인벤토리와 판정 규칙 확정)이 세운 규칙 2번은 '중복 대상이 있으면 통합'입니다. 그대로 쓰면 일부만 겹치는 문서가 통째로 통합 대상이 됩니다. METADATA_COVERAGE_AUDIT.md 가 그 경우라 존치 + 부분 통합으로 뒀습니다 — 98줄 중 겹치는 것은 §2-2 한 문단이고 흡수처는 packages/foundations/FOUNDATION_METADATA_STRATEGY.md §7 입니다. 원 규칙: KANBAN/reports/KAN-044-3KYT2Q.inventory.md §4, 보정: 같은 문서 §6

    > **판정**
    >
    > - 승인 · 유저 · 2026-08-25

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-044-3KYT2Q --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-044-3KYT2Q --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-044-3KYT2Q --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
