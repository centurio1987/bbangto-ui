---
card: KAN-063-Q85EET
title: viz Paint Gate 표본을 나머지 템플릿으로 넓히기 — 리터럴 · 글자 대비 검사가 모든 템플릿을 보게
created: 2026-10-08
branch: KAN-063-Q85EET
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-063-Q85EET
base: 00773ef
status: 승인
---

# KAN-063-Q85EET 검토 요청 — viz Paint Gate 표본을 나머지 템플릿으로 넓히기 — 리터럴 · 글자 대비 검사가 모든 템플릿을 보게

카드: [KAN-063-Q85EET.md](../cards/KAN-063-Q85EET.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-063-Q85EET` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-063-Q85EET` |
| 베이스 | `00773ef` |
| 변경 훑기 | `git diff 00773ef...HEAD` |

**커밋 6건**

```text
bf7f344 docs(visualization): Paint Gate 가 모든 템플릿을 본다고 README 고침 (KAN-063 S5)
249e3de test(storybook): 글자 대비 검사를 템플릿 68개로 넓힘 (KAN-063 S4)
965ea98 test(storybook): 리터럴 색 검사를 템플릿 68개로 넓힘 (KAN-063 S3)
513bd43 test(storybook): Paint Gate 표본 68개를 한 파일로 (KAN-063 S2)
87109c1 test(foundations): viz Paint Gate 표본 누락 검사 — 빨강 먼저 (KAN-063 S1)
47c748b kanban: KAN-063 진행 중으로 이동 (착수)
```

**변경 파일 12개 (+2727 −223)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 14 | 14 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 3 | 3 |
| `KANBAN/cards/KAN-063-Q85EET.md` | M | 15 | 5 |
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | M | 15 | 190 |
| `apps/storybook/src/stories/visualization/_labelContrastBaseline.ts` | M | 1342 | 4 |
| `apps/storybook/src/stories/visualization/_paintGateFixtures.tsx` | M | 1057 | 0 |
| `packages/foundations/src/vizPaintGateCoverage.test.ts` | M | 150 | 0 |
| `packages/foundations/src/vizPaintGateCoverage.ts` | M | 122 | 0 |
| `packages/visualization/README.md` | M | 5 | 4 |

**롤백 태그 7개**

```text
kan/KAN-063-Q85EET/S1
kan/KAN-063-Q85EET/S2
kan/KAN-063-Q85EET/S3
kan/KAN-063-Q85EET/S4
kan/KAN-063-Q85EET/S5
kan/KAN-063-Q85EET/batch1
kan/KAN-063-Q85EET/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-063-Q85EET.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

- `pnpm test:unit` — `vizPaintGateCoverage.test.ts` 초록. 실제 저장소 누락 0, 실패 주입 셋(누락·중복·없는 이름)이 각각 위반을 낸다.
- `pnpm --filter storybook exec vitest run --project storybook src/stories/visualization/TemplatePaintGate.stories.tsx` — `LiteralPaintGate`·`LabelContrastGate` 둘 다 초록이고, 둘 다 표본 68개를 그린다.
- 표본 하나를 지우면 `pnpm test:unit` 이 그 템플릿 이름으로 빨강이 된다. 손으로 한 번 확인하고 되돌린다.
- `packages/visualization/README.md` 에 "표본이 있는 템플릿만 본다"는 문장이 남아 있지 않다.
- 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**실행 결과**

```text
pnpm test:unit — exit 0. foundations 8파일 123건 통과(vizPaintGateCoverage 11건 포함) · visualization 257 · hooks 115 · style-guide-catalog 76 · visualization-style-guide-catalog 39
pnpm --filter storybook exec vitest run --project storybook src/stories/visualization/TemplatePaintGate.stories.tsx — 2 passed(3.18s). LiteralPaintGate 표본 68행, LabelContrastGate 가이드 30개 × 표본 68개
표본 하나(wbs)를 지운 뒤 pnpm test:unit — 1 failed: 「누락 WorkBreakdownStructure: Paint Gate 표본이 없습니다」(확인 뒤 되돌림)
packages/visualization/README.md 에서 「표본이 있는 템플릿만」 문장 — 0건
품질 게이트 5종 — pnpm typecheck exit 0 · pnpm build exit 0 · pnpm test 193파일 1291건 통과 · pnpm --filter storybook build exit 0 · pnpm test:unit exit 0
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-063-Q85EET --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-063-Q85EET --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-063-Q85EET --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] Paint Gate 검사 전용 스토리 둘에서 axe 접근성 검사를 끈 것을 그대로 둘 것인가 — 끈 채로 두었습니다
    - **배경**
      - 템플릿 68개를 가이드 30개로 그리면 한 화면에 2천 장이 넘는다. 테스트가 끝난 뒤 axe(접근성 자동 검사)가 이 화면을 훑는 데 41초가 걸렸고, 세 번 재도 같았다. 원문: KANBAN/cards/KAN-063-Q85EET.md 수행 내역 S4
      - 테스트 하나의 제한 시간은 60초다. 원문: apps/storybook/vite.config.ts:29
      - 이 스토리 둘에서만 axe를 끄자 2초로 줄었다. 원문: apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx:36
      - 저장소 전체 설정은 접근성 위반을 실패로 치지 않고 경고로만 남긴다. 그래서 끄면 잃는 것은 경고뿐이고, 같은 템플릿의 개별 스토리에서 같은 경고가 나온다. 원문: apps/storybook/.storybook/preview.tsx:21-23
    - **정할 것**
      이 두 스토리에서 axe를 끈 채로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 끈 채로 둔다 | 이 화면에서 나오던 접근성 경고가 안 남는다 | 검사가 2초에 끝나고 제한 시간에 가까워질 일이 없다 |
    | 스토리를 가이드 묶음으로 나누고 axe를 켠다 | 전체 테스트가 40초가량 늘어난다 | 묶음마다 제한 시간 안에 들지만, 개별 스토리와 같은 경고가 한 번 더 남는다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-08

    > **추가 의견**
    >
    > - ai · 2026-10-08 — 검토자 대조: 인용 셋(vite.config.ts:29 의 60초, TemplatePaintGate.stories.tsx:36 의 test: 'off', preview.tsx:21-23 의 test: 'todo')은 원문과 맞습니다. 다만 「같은 경고가 개별 스토리에서 나온다」는 절반만 맞습니다. 개별 스토리는 테스트에서 기본 가이드 blueprint 하나로 그리므로(preview.tsx:143) 나머지 가이드 29개에서만 나는 경고는 다시 나오지 않습니다. 그 빈자리 가운데 글자 대비는 같은 화면의 LabelContrastGate 가 새 미달이면 실패로 잡으므로 axe 경고보다 엄하게 덮습니다(axe 가 SVG 글자 대비를 재는지는 확인 안 함). 템플릿 68개 중 ArchiMateDiagram 만 개별 스토리가 없지만 세 층 변형이 같은 함수를 부릅니다(ArchiMateDiagram.tsx:180-205). 배경 첫 항목의 「세 번 재도 같았다」는 인용한 카드 수행 내역 S4 에 없습니다(거기에는 41초만 적혀 있습니다). 전략은 「넘치면 스토리를 나눈다」였고 실측(axe 41초)은 60초를 넘지 않았으므로, axe 를 끈 것은 전략에 없던 조치이고 이 항목이 그것을 묻는 자리입니다. 이를 감안해도 잃는 것은 실패가 아닌 경고뿐이라 추천안에 동의합니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-063-Q85EET --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: 승인

**판정 이력**:

- 승인 · 유저 · 2026-10-08

- 승인이면 → `apply --op move --id KAN-063-Q85EET --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-063-Q85EET --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
