---
card: KAN-048-R2KW3G
title: 문서 정리 B — core 카탈로그 계열 통합 (audit 44→1 · 일회성 계획 3종 흡수)
created: 2026-10-06
branch: KAN-048-R2KW3G
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-048-R2KW3G
base: 185f422
status: 승인
---

# KAN-048-R2KW3G 검토 요청 — 문서 정리 B — core 카탈로그 계열 통합 (audit 44→1 · 일회성 계획 3종 흡수)

카드: [KAN-048-R2KW3G.md](../cards/KAN-048-R2KW3G.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-048-R2KW3G` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-048-R2KW3G` |
| 베이스 | `185f422` |
| 변경 훑기 | `git diff 185f422...HEAD` |

**커밋 11건**

```text
72050f9 KAN-048 S4: 품질 게이트 5종 초록 + 검증 5항 통과 (main 병합 뒤 기준)
ce66b0f Merge branch 'main' into KAN-048-R2KW3G — KAN-047 병합분 반영
c3da886 KAN-048 S4(중간): COMPONENT_CATALOG 결함 2건 — 포화 43→44 카테고리, 없는 매니페스트 7종 문장 정정
4f0f397 KAN-048 S3: design-trends-2020-2026 → style-guide-catalog 출처 절 흡수
ce59df6 KAN-048 S2: Wave 계획 2종 → COMPONENT_CATALOG「Wave 실행 기록」흡수 + gateDocs allowlist 정리
360bc94 KAN-048 S1: audit 44개 → catalog/SATURATION_AUDIT.md 무손실 접기
cb0cf16 kanban: 용인 KAN-048 ↔ KAN-051 재승인(유저) + 배치1 단일 에이전트 선택
5c54575 kanban: KAN-048 계획 정정 — 검증 절 번호 끊김 수정, 전략 절의 무효 용인 서술 갱신, 리포트 재렌더
18a932e kanban: KAN-048 계획 리포트 발행 — authoring-kit(ppangtolab-teacher × kanban-report) 초안, 게이트 MUST 15/15 · 문체 A
b534899 kanban: KAN-048 착수 계획 — 전략·WBS(S1~S4)·검증·배치1, scope 에 gateDocs 2파일 추가, 목표 수치 정정
e47c982 kanban: KAN-048 착수 — 진행 중으로 이동
```

**변경 파일 62개 (+3714 −2677)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 3 | 0 |
| `.kanban/log.md` | M | 3 | 3 |
| `.kanban/state.json` | M | 273 | 273 |
| `ASSET_INTEGRATION_PLAN.md` | M | 0 | 158 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 8 | 7 |
| `KANBAN/batches/KAN-048-R2KW3G.batch1.md` | M | 103 | 0 |
| `KANBAN/cards/KAN-048-R2KW3G.md` | M | 130 | 3 |
| `KANBAN/reports/KAN-048-R2KW3G.draft.md` | M | 232 | 0 |
| `KANBAN/reports/KAN-048-R2KW3G.report.html` | M | 652 | 0 |
| `WAVE0_REPORT.md` | M | 0 | 100 |
| `packages/core/COMPONENT_CATALOG.md` | M | 26 | 5 |
| `packages/core/catalog/SATURATION_AUDIT.md` | M | 2183 | 0 |
| `packages/core/catalog/accordion.audit.md` | M | 0 | 40 |
| `packages/core/catalog/ai-chat.audit.md` | M | 0 | 40 |
| `packages/core/catalog/announcement.audit.md` | M | 0 | 34 |
| `packages/core/catalog/avatar.audit.md` | M | 0 | 34 |
| `packages/core/catalog/badge.audit.md` | M | 0 | 49 |
| `packages/core/catalog/button.audit.md` | M | 0 | 39 |
| `packages/core/catalog/calendar.audit.md` | M | 0 | 35 |
| `packages/core/catalog/card.audit.md` | M | 0 | 59 |
| `packages/core/catalog/carousel.audit.md` | M | 0 | 48 |
| `packages/core/catalog/checkbox.audit.md` | M | 0 | 53 |
| `packages/core/catalog/chip-tag.audit.md` | M | 0 | 57 |
| `packages/core/catalog/clients.audit.md` | M | 0 | 39 |
| `packages/core/catalog/date-picker.audit.md` | M | 0 | 47 |
| `packages/core/catalog/dialog.audit.md` | M | 0 | 59 |
| `packages/core/catalog/dock.audit.md` | M | 0 | 36 |
| `packages/core/catalog/empty-state.audit.md` | M | 0 | 51 |
| `packages/core/catalog/features.audit.md` | M | 0 | 66 |
| `packages/core/catalog/file-upload.audit.md` | M | 0 | 50 |
| `packages/core/catalog/footer.audit.md` | M | 0 | 40 |
| `packages/core/catalog/form.audit.md` | M | 0 | 44 |
| `packages/core/catalog/gallery.audit.md` | M | 0 | 32 |
| `packages/core/catalog/hero.audit.md` | M | 0 | 30 |
| `packages/core/catalog/input.audit.md` | M | 0 | 41 |
| `packages/core/catalog/link.audit.md` | M | 0 | 47 |
| `packages/core/catalog/map.audit.md` | M | 0 | 38 |
| `packages/core/catalog/menu.audit.md` | M | 0 | 47 |
| `packages/core/catalog/navbar.audit.md` | M | 0 | 39 |
| `packages/core/catalog/notification.audit.md` | M | 0 | 38 |
| `packages/core/catalog/number.audit.md` | M | 0 | 43 |
| `packages/core/catalog/pagination.audit.md` | M | 0 | 45 |
| `packages/core/catalog/popover.audit.md` | M | 0 | 55 |
| `packages/core/catalog/pricing-section.audit.md` | M | 0 | 39 |
| `packages/core/catalog/radio-group.audit.md` | M | 0 | 57 |
| `packages/core/catalog/select.audit.md` | M | 0 | 38 |
| `packages/core/catalog/sign-in.audit.md` | M | 0 | 40 |
| `packages/core/catalog/signup.audit.md` | M | 0 | 37 |
| `packages/core/catalog/spinner-loader.audit.md` | M | 0 | 44 |
| `packages/core/catalog/table.audit.md` | M | 0 | 34 |
| `packages/core/catalog/tabs.audit.md` | M | 0 | 43 |
| `packages/core/catalog/testimonials.audit.md` | M | 0 | 65 |
| `packages/core/catalog/textarea.audit.md` | M | 0 | 49 |
| `packages/core/catalog/toggle.audit.md` | M | 0 | 46 |
| `packages/core/catalog/tooltip.audit.md` | M | 0 | 51 |
| `packages/core/catalog/video.audit.md` | M | 0 | 31 |
| `packages/core/design-trends-2020-2026.md` | M | 0 | 168 |
| `packages/core/style-guide-catalog.md` | M | 92 | 1 |
| `packages/foundations/src/gateDocs.test.ts` | M | 5 | 6 |
| `packages/foundations/src/gateDocs.ts` | M | 1 | 1 |
| `packages/style-guide-catalog/src/index.ts` | M | 1 | 1 |

**롤백 태그 5개**

```text
kan/KAN-048-R2KW3G/S1
kan/KAN-048-R2KW3G/S2
kan/KAN-048-R2KW3G/S3
kan/KAN-048-R2KW3G/S4
kan/KAN-048-R2KW3G/batch1
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-048-R2KW3G.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

아래 다섯이 전부 통과해야 끝이다.

**1. 무손실 접기** — S1 검증 스크립트가 44/44 를 낸다. 원본 각 파일의 모든 줄이 `SATURATION_AUDIT.md` 의 해당
절에 같은 순서로 있다(제목 줄은 `#` 하나가 더 붙은 형태로 대조한다).

**2. 잔여 참조 정리** — 아래 명령의 출력이 다음 표의 줄뿐이다. 지운 파일을 살아 있는 문서처럼 가리키는 줄이 없어야 한다.

```bash
grep -rnE "WAVE0_REPORT|ASSET_INTEGRATION_PLAN|design-trends-2020-2026|\.audit\.md" . \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=storybook-static \
  --exclude-dir=KANBAN --exclude-dir=.kanban --exclude=KANBAN.md --exclude=KANBAN.board.html \
  --exclude=SATURATION_AUDIT.md
```

`SATURATION_AUDIT.md` 를 빼는 이유: 그 문서는 원본 파일 이름을 색인과 절마다의 출처 주석으로 일부러 기록한다. 그 기록은 잔여 참조가 아니다.

| 줄 | 왜 남는가 |
|---|---|
| `DESIGN_SYSTEM_GUIDE.md:182` | KAN-050 몫(직렬 중재). 이 카드 병합 뒤 KAN-050 완료까지 없는 파일을 가리킨다 |
| `ORDER.md:269` | 과거 결과 기록. KAN-047 이 ORDER.md 를 통째로 지웠다 — 2026-10-06 에 main 을 합친 뒤로 이 줄은 안 나온다 |
| `packages/core/CHANGELOG.md:136` | 과거 릴리스 기록 |
| `packages/core/COMPONENT_CATALOG.md` 「Wave 실행 기록」 머리 | 이 카드가 남긴 흡수 출처 기록 |
| `packages/core/style-guide-catalog.md` 「2020–2026 시간축 리서치」 머리 | 이 카드가 남긴 흡수 출처 기록 |
| `packages/foundations/src/gateDocs.test.ts` allowlist 머리 주석 | 이 카드가 남긴 allowlist 변경 기록 |

**3. 자동 생성 구간 무변경** — `git diff -U0 main -- packages/core/style-guide-catalog.md` 의 변경 hunk 가 전부
38–92줄 밖이다(문맥 줄이 섞이지 않게 `-U0` 로 본다).

**4. 품질 게이트 5종 초록** — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` ·
`pnpm test:unit`.

**5. 문서 수** — 칸반 산출물을 뺀 마크다운에서 이 카드 몫은 47개 삭제·1개 생성(−46)이다. 착수 시점 90개 기준이면 44개가 되고,
도중에 KAN-047 병합(−4)을 합쳤으므로 실측 기대값은 86 → 40 이다. `git diff --name-status main` 의 md 기준 D 47 · A 1 로도 확인한다.

```bash
find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" \
  -not -path "*/storybook-static/*" -not -path "./KANBAN/*" -not -path "./.kanban/*" -not -name KANBAN.md | wc -l
```

**이 카드가 확인하지 않는 것**: `DESIGN_SYSTEM_GUIDE.md:182` 의 깨진 링크 해소. KAN-050 의 완료 기준이다.

**실행 결과**

```text
실행 시점: 2026-10-06, main(KAN-047 병합분 185f422)을 합친 뒤 워크트리 /Users/centurio/orca/workspaces/bbangto-ui/KAN-048-R2KW3G 에서 실행

[1] 무손실 접기 — python3 k048_verify_fold.py (원본은 git main 에서 읽어 대조)
    PASS 44/44   (접기 전에는 FAIL 0/44 — 새 문서 없음)

[2] 잔여 참조 — grep -rnE "WAVE0_REPORT|ASSET_INTEGRATION_PLAN|design-trends-2020-2026|\.audit\.md" … --exclude=SATURATION_AUDIT.md
    DESIGN_SYSTEM_GUIDE.md:182               KAN-050 몫(직렬 중재) — 이 카드 병합 뒤 KAN-050 완료까지 없는 파일을 가리킴
    packages/core/COMPONENT_CATALOG.md:169   흡수 출처 기록
    packages/core/CHANGELOG.md:136           과거 릴리스 기록
    packages/core/style-guide-catalog.md:349 흡수 출처 기록
    packages/foundations/src/gateDocs.test.ts:33  allowlist 변경 기록
    (ORDER.md:269 는 KAN-047 이 ORDER.md 를 지워 더 이상 안 나옴)

[3] 자동 생성 구간 — git diff -U0 main -- packages/core/style-guide-catalog.md
    @@ -94 +94 @@  ·  @@ -346,0 +347,91 @@   → 38–92줄 무변경

[4] 품질 게이트 5종 — 전부 exit 0
    pnpm typecheck                 통과
    pnpm build                     통과
    pnpm test                      Test Files 182 passed · Tests 1224 passed
    pnpm --filter storybook build  Storybook build completed successfully
    pnpm test:unit                 hooks 115 · foundations 62 · visualization 257 · style-guide-catalog 76 · viz-style-guide-catalog 39 — 전부 통과

[5] 문서 수 — 칸반 산출물 제외 마크다운
    86 → 40  (KAN-047 병합 뒤 기준. git diff --name-status main 의 md: D 47 · A 1)

work 별 빨강 → 초록
    S1  검증 스크립트 FAIL 0/44 → PASS 44/44
    S2  gateDocs allowlist 에서 WAVE0_REPORT.md 를 빼자 foundations vitest 1건 실패(WAVE0_REPORT.md:7) → 흡수·삭제 뒤 62/62
    S3  style-guide-catalog vitest(trendTable 포함) 흡수 전 76/76 → 흡수 뒤 76/76
```

## 3. 판단 항목 — 스크립트가 판정할 수 없는 것

<!-- 스크립트가 판정할 수 없는 것만 적는다 — 값의 진위, 선택지 중 하나를 고른 근거,
     범위를 그은 자리. 2항에서 이미 돌아간 검증을 여기 옮겨 적지 않는다.
     한 줄 형식: 체크박스 하나에 의견 하나 — "<주제> — <지금 고른 값과 그 근거>".
     **의견마다 상세가 따라붙고, 상세는 조각 둘이다** — `**배경**` 과 `**정할 것**` 이
     각각 단독 줄이다(없거나 하나뿐이면 종료코드 12). 검토자는 이 카드를 수행하지
     않았으므로 내부 기호(`L10`·`P5`·`S8`)만 던지면 판정할 재료가 없고, 재료가 있어도
     줄글 한 덩이면 필요한 부분만 골라 읽지 못한다.
       **배경** — 무엇이 문제인가. `- ` 목록으로, 항목 하나에 사실 하나. 기호를 풀어 쓰고
         항목 끝에 `원문: 파일:줄` 이나 링크를 건다. ①②… 로 늘어놓을 것은 항목으로 가른다.
         목록이 없으면 종료코드 12 — 줄글은 화면에서 한 문단으로 붙는다.
       **정할 것** — 정할 것 한 줄. 그 아래 갈래마다 대가와 결과를 표로 단다:
         | 선택지 | 대가 | 그러면 어떻게 되는가 |
       추천은 선택지 셀 맨 앞의 `**추천** ` 접두다. 고를 것이 없는 항목이면 표를 비운다.
     **올리기 전에 둘을 본다.** ① 이 의견이 카드 의도(원문·목적·이유·목표)와 이어지는가
     — 이어지지 않으면 올리지 않는다. 문제를 위한 문제는 판단 항목이 아니라 별도 카드다.
     ② 지시 원본보다 낮은 레이어로 내려가지 않았는가 — 유저가 제품 관점으로 지시했는데
     플래그 이름·함수 이름을 묻고 있으면 서술을 고칠 것이 아니라 올릴 것이 아니다.
     (SKILL.md 5.6 「판단 항목에 무엇을 올리는가」)
     비어 있으면 "기계가 다 판정했고 사람이 정할 것이 없다"는 뜻이다. 그 판단도
     착수한 쪽이 하는 것이지 검토자가 빈칸을 보고 추측할 일이 아니다.
     **승계 절(3-0)이 있으면 그것이 먼저 온다** — 다른 검토서에서 넘어온 의견이고,
     판정은 승계를 받은 이 문서 하나에서만 내려진다. -->

**의견마다 판정과 추가 의견이 따로 붙습니다.** 판정은 상태이고 추가 의견은 말입니다 — 승인/반려를 아직
안 정했어도 의견 하나에만 추가 의견을 달 수 있고, 반대로 의견 하나만 먼저 닫을 수도 있습니다.
`<번호>`는 의견 순서이고, 주제의 문구 일부로도 찾습니다.

```
# 판정 — 승인 · 반려 · 철회
python3 scripts/kanban.py review-judge <project-root> --card KAN-048-R2KW3G --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-048-R2KW3G --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-048-R2KW3G --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] audit 44개를 요약하지 않고 원문 그대로 한 파일에 이어 붙인 것이 맞는가 — 지금은 2183줄짜리 한 파일입니다
    - **배경**
      - 카드의 목적은 audit 44개를 한 파일로 모으는 것이고, 모으는 방식(원문 그대로인지 요약인지)은 정해 두지 않았습니다. 원문: KANBAN.md:133
      - 각 audit 파일에는 넣은 변형과 함께 넣지 않은 후보와 그 이유가 적혀 있고, 그 이유는 다른 어느 문서에도 없습니다. 원문: KANBAN/reports/KAN-044-3KYT2Q.inventory.md:235
      - 원문 그대로 이어 붙였고 제목 단계만 한 칸씩 내렸습니다. 원본 44개의 모든 줄이 같은 순서로 들어 있는지 스크립트로 44/44 확인했습니다. 원문: packages/core/catalog/SATURATION_AUDIT.md:1
      - 맨 위 색인 표에서 원래 파일 이름으로 카테고리를 찾을 수 있습니다. 원문: packages/core/catalog/SATURATION_AUDIT.md:11
    - **정할 것**
      원문 그대로 둘 것인가, 요약본으로 줄일 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 원문 그대로 둔다 | 한 파일이 2천 줄을 넘어 처음부터 끝까지 읽기는 어렵습니다 | 색인으로 카테고리를 찾아 읽고, 넣지 않은 후보의 이유가 하나도 빠지지 않습니다 |
    | 요약본으로 줄인다 | 어떤 이유를 버렸는지 나중에 확인할 수 없습니다 | 파일은 짧아지지만 다음 라운드에 같은 후보가 다시 올라왔을 때 버린 이유를 못 찾을 수 있습니다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-06

    > **추가 의견**
    >
    > - ai · 2026-10-06 — 원문 그대로 접은 것은 유저가 KAN-044 에서 승인한 판정의 근거와 같은 방향입니다. KAN-044 검토 1번(유저 승인 2026-08-25)의 상세가 「기각 사유(absorbed/noise/dropped 후보의 탈락 논거)가 유일본이라 폐기는 아닙니다」라고 적었고, 요약본은 그 유일본을 일부 버리는 길이라 승인된 근거를 스스로 무너뜨립니다. 대조: button.audit.md 원본 39줄이 SATURATION_AUDIT.md:280 부터 제목만 한 단계 내려간 채 같은 순서로 있고, 절마다 source 주석 44개가 붙어 있습니다. 작은 지적 하나 — 배경 첫 항목의 「원문: KANBAN.md:133」은 카드 제목 줄이고 목적 문장은 :135 입니다. 판정에는 영향이 없습니다.

- [x] 트렌드 문서의 출처 링크를 계획(3개)보다 많은 16개 옮긴 것이 맞는가 — 연도별 표의 근거를 남기려고 넓혔습니다
    - **배경**
      - 이전 카드 KAN-044 의 정리 계획은 트렌드 문서에서 2020~2025 연도별 목록과 출처 링크 3개만 옮기라고 적었습니다. 원문: KANBAN/reports/KAN-044-3KYT2Q.inventory.md:256
      - 연도별 표 6개(2020~2025)는 그 문서의 링크 15개를 보고 만든 것이라, 링크를 빼면 표의 각 줄을 어디서 가져왔는지 확인할 길이 없습니다. 원문: packages/core/style-guide-catalog.md:347
      - 그래서 출처 절에 이미 있던 2개(Figma 2026 · CC Creative)를 뺀 16개를 모두 옮겼습니다. 늘어난 것은 링크 16줄입니다. 원문: packages/core/style-guide-catalog.md:419
    - **정할 것**
      링크를 모두 둘 것인가, 계획대로 3개만 남길 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 16개를 모두 둔다 | 출처 절이 링크 16줄만큼 길어집니다 | 연도별 표의 각 줄을 출처로 되짚어 볼 수 있습니다 |
    | 계획대로 3개만 남긴다 | 연도별 표 대부분이 출처 없는 목록이 됩니다 | 출처 절은 짧아지지만 2020~2025 표를 검증할 수 없습니다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-06

    > **추가 의견**
    >
    > - ai · 2026-10-06 — 16개로 넓힌 것은 유저 의도 안에 있다고 봅니다. 「3링크만」은 KAN-044 인벤토리 §10 표의 한 칸(AI 가 쓴 계획 세부)이고, 유저는 KAN-044 를 문서 단위로 승인했을 뿐 이 칸을 따로 고른 적이 없습니다. 카드 목적(문서 흡수)·목표(md −46, 결함 2건)는 링크 수와 무관하게 그대로 충족되고, 늘어난 16줄은 자동 생성 구간(38–92) 밖인 출처 절에만 있습니다(hunk @@ -346,0 +347,91). 사람이 「계획대로 3개」를 고를 때 알아야 할 것 — 원문 design-trends-2020-2026.md §A 제목이 「2026 디자인 트렌드 (제공 링크 3종 종합)」이라, 인벤토리의 3링크는 유저가 건넨 2026 링크 셋(Figma·Behance·Adobe)을 뜻할 가능성이 큽니다. 그 길을 고르면 2020~2025 연도별 표 6개는 출처가 0개가 됩니다. 수치 대조: 원문 링크 18개 = 2026 3개 + 2020~2025 15개, 그중 Figma 2026·CC Creative 2개는 출처 절에 이미 있었고, 새 문서에는 2026 2개(:414–415) + 2020~2025 14개(:423–436) = 16개가 있습니다. 배경의 15·16·2 가 모두 맞습니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-048-R2KW3G --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: 승인

**판정 이력**:

- 승인 · 유저 · 2026-10-06

- 승인이면 → `apply --op move --id KAN-048-R2KW3G --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-048-R2KW3G --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
