---
card: KAN-062-E02CMT
title: SVG 속성 안 var() 브라우저 확인 — README 문장과 속성으로 색을 넣는 코드를 실제 동작에 맞추기
created: 2026-10-08
branch: KAN-062-E02CMT
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-062-E02CMT
base: d3d22e8
status: 검토 대기
---

# KAN-062-E02CMT 검토 요청 — SVG 속성 안 var() 브라우저 확인 — README 문장과 속성으로 색을 넣는 코드를 실제 동작에 맞추기

카드: [KAN-062-E02CMT.md](../cards/KAN-062-E02CMT.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-062-E02CMT` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-062-E02CMT` |
| 베이스 | `d3d22e8` |
| 변경 훑기 | `git diff d3d22e8...HEAD` |

**커밋 4건**

```text
4874ee8 kanban: KAN-062 S3 — 품질 게이트 5종 초록
7275d6a docs(visualization): SVG 속성 안 var() 설명을 세 브라우저 측정에 맞춤 (KAN-062 S2)
01c4b25 kanban: KAN-062 S1 — 세 브라우저 측정 기록 (색·글꼴 속성 var() 풀림, transform 속성 var() 안 풀림)
af86dcf kanban: KAN-062 진행 중으로 이동 (착수)
```

**변경 파일 8개 (+41 −30)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 14 | 14 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 8 | 8 |
| `KANBAN/cards/KAN-062-E02CMT.md` | M | 9 | 3 |
| `packages/visualization/README.md` | M | 4 | 1 |
| `packages/visualization/src/atoms/Marker.tsx` | M | 2 | 1 |

**롤백 태그 3개**

```text
kan/KAN-062-E02CMT/S1
kan/KAN-062-E02CMT/S2
kan/KAN-062-E02CMT/S3
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-062-E02CMT.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

- `bash -c 'grep -rnE "var\(\).{0,40}(무효|지원하지 않)|(무효|지원하지 않).{0,40}var\(\)" packages/visualization/README.md packages/visualization/src'` 결과 0줄.
- README 「명시한 prop 이 이긴다」 항목에 측정 판(chromium 149 · firefox 151 · webkit 26.5)·날짜·`transform` 예외가 있다.
- 품질 게이트 5종 초록: `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**실행 결과**

```text
- 「속성 안 var() 무효/미지원」 grep: 0줄 (README·visualization src)
- README 측정 판 문장: 1곳 · transform 예외 문장: 1곳 (packages/visualization/README.md:148-151)
- pnpm typecheck: 통과
- pnpm build: 통과
- pnpm test: 통과 — 193파일 1292건
- pnpm --filter storybook build: 통과
- pnpm test:unit: 통과 — hooks 115 · visualization 257 · foundations 128 · style-guide-catalog 95 · visualization-style-guide-catalog 39
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-062-E02CMT --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-062-E02CMT --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-062-E02CMT --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 출시판 Safari 로 확인하지 않은 채 README 에 「풀린다」고 적어도 되는가 — 측정한 판과 Safari 미확인 사실을 함께 적었습니다
    - **배경**
      - README 에는 원래 「SVG 속성 안의 var() 는 무효」라고 적혀 있었지만, 실제로는 chromium 에서 풀렸습니다. 다른 브라우저에서 확인하는 것이 이 카드의 일이었습니다. 원문: packages/visualization/README.md:147
      - 이번에 쓴 브라우저는 Playwright(브라우저 자동화 도구) 1.61.0 이 함께 내려받는 chromium 149 · firefox 151 · webkit 26.5 입니다. 세 브라우저 모두 선 색·글자 색·글꼴 속성 안의 var() 를 풀었고 화면에도 그렇게 그려졌습니다. 원문: KANBAN/cards/KAN-062-E02CMT.md 수행 내역 S1
      - webkit 은 Safari 와 같은 엔진이지만 Playwright 가 따로 빌드한 것이라 출시판 Safari 와 같다고 단정할 수 없습니다. 출시판 Safari 와 옛 판 브라우저는 확인하지 않았습니다.
      - 그래서 README 에 측정한 판과 날짜, 출시판 Safari 는 확인하지 않았다는 문장을 함께 적었습니다. 원문: packages/visualization/README.md:148
    - **정할 것**
      지금 문장 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 지금 문장 그대로 둔다 | 출시판 Safari 에서 다르게 동작하면 README 가 다시 틀린다 | 읽는 사람이 어느 판에서 확인했는지 알고 판단할 수 있다 |
    | 출시판 Safari 로 직접 확인한 뒤 적는다 | 누군가 Safari 에서 Storybook 을 열어 눈으로 봐야 한다 | 문장에서 미확인 단서를 뗄 수 있다 |
    | chromium 에서 확인했다고만 적는다 | firefox·webkit 측정 결과를 버린다 | 문장은 좁아지지만 이 카드의 목표(세 브라우저 결과 기록)를 못 채운다 |

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
     `review-judge --card KAN-062-E02CMT --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-062-E02CMT --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-062-E02CMT --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
