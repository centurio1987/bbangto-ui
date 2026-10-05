---
card: KAN-052-BYS4JN
title: Provider 외부 글꼴 선택화 — fonts prop + 글꼴별 1회 주입 (core·viz)
created: 2026-10-06
branch: KAN-052-BYS4JN
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-052-BYS4JN
base: 11cb644
status: 검토 대기
---

# KAN-052-BYS4JN 검토 요청 — Provider 외부 글꼴 선택화 — fonts prop + 글꼴별 1회 주입 (core·viz)

카드: [KAN-052-BYS4JN.md](../cards/KAN-052-BYS4JN.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-052-BYS4JN` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-052-BYS4JN` |
| 베이스 | `11cb644` |
| 변경 훑기 | `git diff 11cb644...HEAD` |

**커밋 6건**

```text
5af8e71 KAN-052 S4: README fonts 사용법 + changeset(core·viz minor) — 게이트 5종 초록
84aa3f7 KAN-052 S3: viz Provider 글꼴 주입을 core 와 같은 id 로 + fonts prop
12ed704 KAN-052 S2: core Provider 글꼴 주입을 id 기반 1회 주입 + fonts prop 으로
9bea4b2 KAN-052 S1: 글꼴 주입 play 테스트 + 데코레이터 끄기 parameter (red)
8a668f9 kanban: KAN-052 진행 중으로 이동(착수)
8353e10 kanban: KAN-052 배치1 계획 + 계획 리포트 발행(authoring-kit voice 적용)
```

**변경 파일 20개 (+1310 −52)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-052-provider-fonts.md` | M | 19 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 15 | 15 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 22 | 21 |
| `KANBAN/batches/KAN-052-BYS4JN.batch1.md` | M | 97 | 0 |
| `KANBAN/cards/KAN-052-BYS4JN.md` | M | 12 | 4 |
| `KANBAN/reports/KAN-052-BYS4JN.draft.md` | M | 184 | 0 |
| `KANBAN/reports/KAN-052-BYS4JN.report.html` | M | 625 | 0 |
| `apps/storybook/.storybook/preview.tsx` | M | 4 | 0 |
| `apps/storybook/src/stories/ProviderFonts.stories.tsx` | M | 138 | 0 |
| `apps/storybook/src/stories/visualization/Provider.stories.tsx` | M | 56 | 0 |
| `packages/core/README.md` | M | 16 | 0 |
| `packages/core/src/FoundationProvider.tsx` | M | 9 | 4 |
| `packages/core/src/StyleGuideProvider.tsx` | M | 9 | 4 |
| `packages/core/src/internal/ExternalFonts.tsx` | M | 48 | 0 |
| `packages/visualization/README.md` | M | 6 | 0 |
| `packages/visualization/src/internal/ExternalFonts.tsx` | M | 37 | 0 |
| `packages/visualization/src/styleGuide/VisualizationStyleGuideProvider.tsx` | M | 9 | 1 |

**롤백 태그 5개**

```text
kan/KAN-052-BYS4JN/S1
kan/KAN-052-BYS4JN/S2
kan/KAN-052-BYS4JN/S3
kan/KAN-052-BYS4JN/S4
kan/KAN-052-BYS4JN/batch1
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-052-BYS4JN.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

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

**실행 결과**

```text
게이트 5종 (2026-10-06, 워크트리 KAN-052-BYS4JN, S4 커밋 직전 상태에서 실행)
- pnpm typecheck: exit 0
- pnpm build: exit 0
- pnpm test: exit 0 — Test Files 183 passed (183) / Tests 1232 passed (1232)
- pnpm --filter storybook build: exit 0 — Storybook build completed successfully
- pnpm test:unit: exit 0 — packages/hooks test:       Tests  115 passed (115);packages/foundations test:       Tests  62 passed (62);packages/visualization test:       Tests  257 passed (257);packages/style-guide-catalog test:       Tests  76 passed (76);.../visualization-style-guide-catalog test:       Tests  39 passed (39);

빨강 → 초록
- S1 직후: 새 글꼴 스토리 6종만 빨강, 그 밖 1226 통과 (기본값 가드 2종은 고치기 전에도 초록)
- S2 직후: core 4종 초록, viz 관련 3종(viz 단독 none · core 안 viz 겹침 2종) 빨강
- S3 직후: 글꼴 스토리 10종 전부 초록

추가 확인
- grep -rnE "fonts\.googleapis|cdn\.jsdelivr" packages/core/src packages/visualization/src → internal/ExternalFonts.tsx 두 파일 밖 0건
- 빌드한 Storybook 기본 화면(Foundations/Base/Typography, 헤드리스 chromium): head 에 #bbangto-font-pretendard·#bbangto-font-jetbrains-mono 1개씩, 렌더 트리 안 @import 0개, Pretendard 로드됨, JetBrains Mono 18 face 등록·요청 시 로드(이 화면은 mono 글자를 안 씀). 스크린샷으로 Pretendard 적용 확인
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-052-BYS4JN --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-052-BYS4JN --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-052-BYS4JN --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] fonts="none"을 Provider마다 따로 줘야 외부 글꼴 요청이 0건이 되는데, 이대로 둘 것인가 — 지금은 겹친 Provider 전부에 none을 줘야 0건이고, README 두 곳에 그렇게 적었습니다
    - **배경**
      - 카드 목표는 「fonts="none"이면 외부 글꼴 요청이 0건이고, 기본값을 쓰는 기존 화면은 그대로다」입니다. 원문: KANBAN.md:128
      - 글꼴은 문서 전체가 한 벌을 나눠 씁니다. 안쪽 Provider에만 none을 주고 바깥 Provider를 기본값으로 두면, 바깥이 이미 글꼴을 불러온 상태입니다. 원문: packages/core/src/internal/ExternalFonts.tsx:40
      - 겹친 Provider 전부에 none을 주면 0건입니다. core 안에 viz를 겹친 화면으로 실제 브라우저에서 확인했습니다. 원문: apps/storybook/src/stories/ProviderFonts.stories.tsx:127
      - 외부 앱은 보통 Provider를 둘(core 스타일 가이드 + viz) 겹쳐 씁니다. 둘 다에 none을 적어야 한다고 README에 적었습니다. 원문: packages/core/README.md:28
    - **정할 것**
      Provider마다 none을 주는 지금 방식으로 받을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 겹친 Provider 수만큼 none을 적어야 하고, 하나를 빠뜨리면 글꼴 요청이 나간다 | Provider마다 자기 몫만 정하므로 동작을 예측하기 쉽고, 기본값을 쓰는 다른 화면에 영향이 없다 |
    | none 하나가 문서 전체를 끈다 | 「끄기」 표시를 문서 전역에 남겨야 하고, 기본값을 쓰는 다른 Provider의 글꼴까지 막는다 | 한 곳만 적으면 된다. 대신 같은 페이지의 다른 화면에서 글꼴이 예고 없이 빠질 수 있다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-052-BYS4JN --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-052-BYS4JN --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-052-BYS4JN --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
