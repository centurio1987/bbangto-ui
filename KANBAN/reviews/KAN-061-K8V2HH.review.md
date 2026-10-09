---
card: KAN-061-K8V2HH
title: viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기
created: 2026-10-10
branch: KAN-061-K8V2HH
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-061-K8V2HH
base: 4d60413bf9432192b02f46cdbdbebf8a0e08fbb5
status: 검토 대기
---

# KAN-061-K8V2HH 검토 요청 — viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기

카드: [KAN-061-K8V2HH.md](../cards/KAN-061-K8V2HH.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-061-K8V2HH` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-061-K8V2HH` |
| 베이스 | `4d60413bf9432192b02f46cdbdbebf8a0e08fbb5` |
| 변경 훑기 | `git diff 4d60413bf9432192b02f46cdbdbebf8a0e08fbb5...HEAD` |

**커밋 17건**

```text
7cbec02 KAN-061 검토 5번 재작업 2 — Sankey 이름은 가운데를 실제로 덮는 면으로
e46d8a6 kanban: KAN-061 재검토 대행 — 2번 승인 · 5번 반려(ai·검토자) · 검토서 발행본 다시 뽑음
c3519cd kanban: KAN-061 검토서 1·2항 갱신(재작업 뒤 검증) · 2·4·5번 착수한 쪽 의견(ai)
ec8b117 KAN-061 검토 재작업 — 2번 음영 5% + 아이소메트릭 따로 · 5번 Sankey 노드별 리본 면
432be74 kanban: KAN-061 검토자 대행 — 항목 1·3·4 승인(ai·검토자) · 2 의견 · 5 신설(Sankey 노드 이름 4.16:1)
45ca7f1 kanban: KAN-061 진행 중 → 검토 — 검토서(판단 항목 4) · 검토 리포트
e54e15a KAN-061 S8: 마무리 — 병합 뒤 품질 게이트 5종 초록
b3c0ea5 Merge main into KAN-061-K8V2HH — KAN-057·KAN-067 병합분 따라잡기
d51cf96 KAN-061 S8: changeset — tokens minor(VisualizationFoundation.on) · visualization minor(--bbangto-viz-on-*, 템플릿 글자색)
8d5effd KAN-061 S7: 기준 목록을 닫고 README 글자색 규칙을 on-* 로
28f39db KAN-061 S6: 투명도가 바뀌는 면과 C4 나머지 — 기준 목록 139 → 0
b780038 KAN-061 S5: 불투명 팔레트 면 위 글자를 on-palette-* 로 — 기준 목록 832 → 139
51de0f3 KAN-061 S4: 흐린 보조 글자를 면에 맞춘 글자색으로 — 기준 목록 1089 → 832
bddc2c7 KAN-061 S3: 노드 글자 기본값을 면에 맞춘 글자색으로 — 기준 목록 1538 → 1089
4491827 KAN-061 S2: 면 위 글자색 계산 함수와 --bbangto-viz-on-* 변수
d551585 KAN-061 S1: 면 위 글자색 테스트 먼저 (빨강)
8cbb382 kanban: KAN-061 진행 중으로 이동 (단일 에이전트, 배치1 S1부터)
```

**변경 파일 48개 (+2611 −1750)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-061-on-ink.md` | M | 36 | 0 |
| `.kanban/archive.jsonl` | M | 2 | 0 |
| `.kanban/log.md` | M | 2 | 2 |
| `.kanban/reviews/KAN-061-K8V2HH.events.jsonl` | M | 21 | 0 |
| `.kanban/reviews/KAN-061-K8V2HH.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 98 | 98 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 9 | 8 |
| `KANBAN/cards/KAN-061-K8V2HH.md` | M | 30 | 8 |
| `KANBAN/reviews/KAN-061-K8V2HH.review.html` | M | 1268 | 0 |
| `KANBAN/reviews/KAN-061-K8V2HH.review.md` | M | 334 | 0 |
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | M | 66 | 2 |
| `apps/storybook/src/stories/visualization/_labelContrastBaseline.ts` | M | 7 | 1552 |
| `packages/tokens/src/visualization.ts` | M | 23 | 0 |
| `packages/visualization-style-guide-catalog/src/onInk.test.ts` | M | 64 | 0 |
| `packages/visualization/README.md` | M | 11 | 5 |
| `packages/visualization/src/atoms/NodeLabel.tsx` | M | 2 | 2 |
| `packages/visualization/src/molecules/C4Box.tsx` | M | 4 | 1 |
| `packages/visualization/src/molecules/ClassBox.tsx` | M | 4 | 2 |
| `packages/visualization/src/molecules/ContainerNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/molecules/DatabaseNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/molecules/DecisionNode.tsx` | M | 14 | 2 |
| `packages/visualization/src/molecules/EntityTable.tsx` | M | 9 | 6 |
| `packages/visualization/src/molecules/ExternalNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/molecules/PersonNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/molecules/ProcessNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/molecules/QueueNode.tsx` | M | 13 | 2 |
| `packages/visualization/src/templates/ArchiMateDiagram.tsx` | M | 12 | 2 |
| `packages/visualization/src/templates/ArchiMateViewpointDiagram.tsx` | M | 18 | 3 |
| `packages/visualization/src/templates/C4DynamicDiagram.tsx` | M | 1 | 1 |
| `packages/visualization/src/templates/ChoroplethMap.tsx` | M | 14 | 2 |
| `packages/visualization/src/templates/DMNDiagram.tsx` | M | 9 | 1 |
| `packages/visualization/src/templates/DataLineage.tsx` | M | 3 | 2 |
| `packages/visualization/src/templates/Fishbone.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/Heatmap.tsx` | M | 10 | 2 |
| `packages/visualization/src/templates/IsometricScene.tsx` | M | 27 | 2 |
| `packages/visualization/src/templates/Mindmap.tsx` | M | 8 | 7 |
| `packages/visualization/src/templates/PacketDiagram.tsx` | M | 6 | 2 |
| `packages/visualization/src/templates/QuadrantChart.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/RequirementDiagram.tsx` | M | 17 | 7 |
| `packages/visualization/src/templates/SankeyDiagram.tsx` | M | 23 | 3 |
| `packages/visualization/src/templates/StackedBarChart.tsx` | M | 5 | 2 |
| `packages/visualization/src/templates/Treemap.tsx` | M | 7 | 4 |
| `packages/visualization/src/templates/UserJourneyGantt.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/WorkBreakdownStructure.tsx` | M | 6 | 3 |
| `packages/visualization/src/tokens/contract.ts` | M | 7 | 2 |
| `packages/visualization/src/tokens/onInk.test.ts` | M | 210 | 0 |
| `packages/visualization/src/tokens/onInk.ts` | M | 117 | 0 |

**롤백 태그 11개**

```text
kan/KAN-061-K8V2HH/S1
kan/KAN-061-K8V2HH/S2
kan/KAN-061-K8V2HH/S3
kan/KAN-061-K8V2HH/S4
kan/KAN-061-K8V2HH/S5
kan/KAN-061-K8V2HH/S6
kan/KAN-061-K8V2HH/S7
kan/KAN-061-K8V2HH/S8
kan/KAN-061-K8V2HH/batch1
kan/KAN-061-K8V2HH/batch2
kan/KAN-061-K8V2HH/batch3
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-061-K8V2HH.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

- `pnpm --filter storybook exec vitest run --project storybook src/stories/visualization/TemplatePaintGate.stories.tsx` → `LiteralPaintGate`·`LabelContrastGate` 초록, `LABEL_CONTRAST_BASELINE` 항목 0개.
- `pnpm --filter @centurio1987/bbangto-ui-visualization test` → `onInk.test.ts` 초록.
- `pnpm --filter @centurio1987/bbangto-ui-visualization-style-guide-catalog test` → 가이드 30개 × 면 전부의 `on-*` 글자색이 4.5:1 이상.
- `git diff --stat main -- packages/visualization-style-guide-catalog/src/*.tsx` 가 비어 있다(가이드 파일을 고치지 않았다).
- `packages/visualization/src/index.ts`·`tokens/index.ts` 에 새 export 가 없다.
- `.changeset/kan-061-*.md` 가 tokens minor · visualization minor 를 적는다.
- 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 초록.

**실행 결과**

```text
## 검증 실행 결과 (2026-10-10 검토 5번 재작업 2 뒤, 커밋 7cbec02)
- TemplatePaintGate.stories.tsx(LiteralPaintGate · LabelContrastGate · SankeyRibbonLabelGate — 팔레트 8색 리본 + 나가는 값이 받는 값의 절반보다 작은 노드 × 가이드 30개):  Tests 3 passed (3)
- LABEL_CONTRAST_BASELINE 항목 수: 0
- visualization 단위(onInk.test.ts 포함): Tests  280 passed (280)
- 카탈로그(가이드·preset 전부 × 면 on 글자색 ≥ 4.5): Tests  41 passed (41)
- 음영 규칙(검정 5%) 때문에 글자색이 바뀌는 면: 반투명·none 면 170개 중 5개(전부 riso-print, #1E5AA8 → #182234)
- 가이드 파일 변경(merge-base 기준): 0줄 · 공개 index 변경: 0줄
- changeset: --- '@centurio1987/bbangto-ui-tokens': minor '@centurio1987/bbangto-ui-visualization': minor --- 
- pnpm build: 종료코드 0 · pnpm typecheck: 종료코드 0
- pnpm test:  Test Files 194 passed (194)  Tests 1300 passed (1300) 
- pnpm --filter storybook build: Storybook build completed successfully
- pnpm test:unit: 종료코드 0 — packages/hooks: 115 passed (115);packages/visualization: 280 passed (280);packages/foundations: 138 passed (138);packages/style-guide-catalog: 108 passed (108);.../visualization-style-guide-catalog: 41 passed (41);
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-061-K8V2HH --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-061-K8V2HH --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-061-K8V2HH --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] 흐리게 쓰던 보조 글자를 진하게 바꾼 것을 받아들일 것인가 — 진하게 바꾸고 구분은 크기로 남겼습니다
    - **배경**
      - 일부 가이드에서 흐리게(투명도 0.6~0.85) 쓴 보조 글자가 바탕에 묻혀 4.5:1 에 못 미쳤다. ER 표 속성 타입, 사분면 이름, 데이터 계보 설명, 요구사항 표기·본문, 노드 부제, 트리맵·패킷 값이 그랬다. 원문: KANBAN/cards/KAN-061-K8V2HH.md 「전략 · 문제」 진단 표(흐린 보조 글자 181곳 · Requirement 64곳)
      - 이 글자들을 본문과 같은 진하기로 바꾸고, 구분은 크기로 남겼다(ER 표 타입 10px → 9px). 원문: packages/visualization/src/molecules/EntityTable.tsx:131
      - 원래 잘 읽히던 가이드에서도 보조 글자가 본문과 같은 진하기로 보인다. 새 템플릿이 따를 규칙(「글자를 흐리게 쓰지 않는다」)도 README 에 적었다. 원문: packages/visualization/README.md:257
    - **정할 것**
      보조 글자를 진하게 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 진하게 둔다 | 보조 글자와 본문의 차이가 크기뿐이라 위계가 약해진다 | 모든 가이드에서 읽히고, 새 템플릿도 한 규칙을 따른다 |
    | 읽히는 가이드에서만 흐리게 둔다 | 템플릿마다 가이드별 투명도 계산이 늘어난다 | 원래 느낌은 남지만 검사가 가이드마다 다시 갈린다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 검토자 확인: 전략 「접근」 5(「흐린 보조 글자는 opacity 를 걷는다. 글자색은 면에 맞춘 값을 쓰고, 위계는 크기와 굵기로 남긴다.」)에 계획된 그대로입니다. 실제로 위계는 대부분 크기와 굵기 둘로 남아 있습니다(DataLineage 이름 13px·700 / 설명 11px · PacketDiagram 이름 11px·600 / 값 9px · NodeLabel 부제는 2px 작고 굵기 400). 크기 하나로만 가르는 곳은 ER 표 타입(10px → 9px, EntityTable.tsx:131) 하나입니다. 상세의 「구분은 크기로 남겼다」보다 구분이 조금 더 남아 있습니다.

- [x] 반투명 면 위 글자색을 검정 30% 음영까지 견디게 고르는 규칙을 받아들일 것인가 — 이 규칙으로 24개 면의 글자색이 바뀌었습니다
    - **배경**
      - 카탈로그 가이드 30개의 면 570개 중 170개가 반투명이거나 칠하지 않은(none) 면이다(riso-print 22% 분홍 · halftone · glitch · minimal-line 등). 이런 면은 밑에 깔린 것이 비쳐 보인다.
      - 레인 띠(검정 2~3%) 위에서 riso-print 노드 글자가 4.4 로 떨어졌고, 입체 그림은 옆면 음영이 겹친 자리가 약 28% 어두워졌다. 원문: packages/visualization/src/tokens/onInk.ts:28
      - 그래서 반투명 면은 「바탕 그대로」와 「검정 30% 를 얹은 바탕」 두 곳에서 모두 읽히는 글자색을 고르게 했다. 170개 중 24개 면의 글자색이 이 규칙 때문에 바뀌었다(예: ink-line-duotone 의 칠하지 않은 노드 글자가 파랑 #2B44E0 → 거의 검정 #111111).
      - 두 곳을 다 만족하는 색이 없는 중간 밝기 칸(히트맵 칸 등)은 실제 바탕에서 읽히는 검정·흰색을 쓴다. 원문: packages/visualization/src/tokens/onInk.ts:81
    - **정할 것**
      음영 30% 규칙을 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 30% 로 둔다 | 반투명 가이드 24개 면에서 가이드 강조색 대신 더 진한 색이 나온다 | 레인 띠와 입체 음영 위에서도 읽힌다 |
    | 10% 로 낮춘다 | 입체 그림 옆면이 겹친 자리의 글자가 다시 미달한다 | 가이드 강조색이 조금 더 남는다 |
    | 규칙을 없애고 템플릿마다 밑 면을 계산한다 | 레인·입체 템플릿마다 계산 코드가 늘어난다 | 가장 정확하지만 새 템플릿이 빠뜨리기 쉽다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 검토자 확인: 상세의 숫자는 맞습니다(가이드 30개 기준 면 570 · 반투명 170 · 바뀐 면 24, ink-line-duotone #2B44E0 → #111111 도 같습니다). 다만 표의 「10% 로 낮춘다 — 가이드 강조색이 조금 더 남는다」는 차이를 작게 적었습니다. 음영 깊이별로 다시 세면 바뀌는 면은 3% 4개 · 10% 7개 · 20% 18개 · 30% 24개이고, 10% 까지는 전부 riso-print 입니다. 20% 부터 ink-line-duotone 면 10개(칠하지 않은 노드 7종 · shape.fill · C4 면)가 그 가이드의 대표색인 파랑을 잃고, 30% 에서 corporate-schematic · iso-color-block 이 3개씩 더해집니다. 30% 라는 깊이는 IsometricScene 한 템플릿(바닥 그림자 8% + 옆면 22%, onInk.ts:24-28)에서 왔고, 이 규칙을 일으킨 레인 띠는 2~3% 입니다. 그래서 표에 없는 갈래가 하나 있습니다: 기본 음영은 레인 띠 수준(예: 5%)으로 두고, IsometricScene 만 RequirementDiagram 머리 띠처럼 자기 음영을 얹은 면으로 따로 고르는 방식입니다. 그러면 ink-line-duotone 의 파랑은 IsometricScene 밖에서는 남습니다(이 방식이 게이트를 넘는지는 확인 안 함). 전략 「버린 대안」이 가이드 고유의 색감을 지키는 것을 이유로 들었으므로, 이 대가를 받아들일지는 사람이 정할 일이라 판정은 내지 않았습니다.
    > - ai · 2026-10-10 — 검토자 정정과 덧붙임: 바로 앞 의견의 「칠하지 않은 노드 7종」은 6종(person · external · database · queue · decision · process)이 맞습니다. 10개는 노드 6 · shape.fill 1 · C4 면 3 입니다. 덧붙여, 규칙을 그대로 두더라도 고칠 곳이 하나 있습니다. tokens 패키지 공개 타입 설명(packages/tokens/src/visualization.ts 의 on 필드 JSDoc)은 아직 「반투명 면은 canvas.bg 위에 합성해 잰다」라고만 적어, 음영 규칙과 첫 면 우선 대체가 빠져 있습니다(README · changeset 에는 들어가 있습니다). 마지막 줄의 「첫 면(실제 바탕) 우선」 대체는 히트맵 · 코로플레스처럼 첫 면이 실제 바탕이고 둘째 면이 가정한 음영일 때는 맞게 돕니다(가이드 · preset 62개 × 투명도 0.15~1 을 0.05 간격으로 돌려 대체 44번, 실제 바탕에서 4.5 미만 0번). Sankey 는 리본 면들도 실제 바탕인데 첫 면(canvas)만 보고 고르게 되어, 이 문제는 새 항목(5번)으로 따로 세웠습니다.
    > - ai · 2026-10-10 — 착수한 쪽: 2026-10-10 유저가 「기본 5% + 아이소메트릭만 따로」를 골라 재작업했습니다(커밋 ec8b117). 기본 음영을 30% → 5% 로 낮췄고(onInk.ts 의 ON_INK_SHADE), IsometricScene 라벨은 윗면·바닥 그림자 8%·오른쪽 옆면 22% 를 얹은 면들로 직접 고릅니다. 음영 규칙 때문에 글자색이 바뀌는 면은 24 → 5 이고, 다섯 모두 riso-print 의 파랑 #1E5AA8 이 같은 가이드의 남색 #182234(boundary.labelColor)로 바뀌는 것입니다. ink-line-duotone 의 파랑은 그대로 남습니다. 지적하신 tokens 공개 타입 설명(on 필드 JSDoc)에도 음영·대체 규칙을 적었습니다. Paint Gate 세 검사와 게이트 5종이 초록입니다.
    > - ai · 2026-10-10 — 검토자 재확인(재작업 ec8b117): 유저가 고른 「기본 5% + 아이소메트릭만 따로」대로 됐습니다. ON_INK_SHADE 가 0.05 이고(onInk.ts:29), 다시 세어 보니 음영 규칙 때문에 바뀌는 면은 가이드 30개 기준 5개, 모두 riso-print 입니다(지난번 깊이별 표의 5% 값과 같습니다). ink-line-duotone 의 파랑은 IsometricScene 밖에서 남고, 새 단위 테스트가 그것을 지킵니다. IsometricScene 라벨은 윗면 · 그림자와 옆면이 비치는 윗면 · 오른쪽 옆면 세 곳에서 고르고, 가이드 30개와 preset 전부에서 세 곳 모두 4.5 이상입니다(가장 낮은 곳 5.39). 그 결과 IsometricScene 안에서만 기본 가이드 셋의 라벨 색이 on-shape-fill 과 다릅니다: ink-line-duotone #2B44E0 → #111111, neon-gradient-dark #1E1A3D → #000000, iso-color-block #3A4149 → #000000. 뒤의 둘은 불투명한 윗면에도 옆면을 함께 따지게 되어 바뀐 것이고, changeset 에 적혀 있습니다. tokens on 필드 설명도 이제 실제 동작과 맞습니다. 3항의 이 항목 제목은 아직 「30% · 24개 면」이라, 이 승인은 재작업된 5% 규칙에 대한 것입니다.
    > - ai · 2026-10-10 — 착수한 쪽 정리: 이 항목의 제목(「검정 30% 음영 · 24개 면」)은 처음 올릴 때의 규칙을 가리킵니다. 유저 선택으로 바뀐 지금 규칙은 「기본 5% + IsometricScene 만 자기 음영으로 따로」이고, 음영 규칙 때문에 바뀌는 면은 5개(전부 riso-print)입니다. 검토자의 승인도 이 5% 규칙에 대한 것입니다.

- [x] 앱이 노드·칸 색을 직접 넘기면 글자색을 예전 그대로 둘 것인가 — 지금은 예전 그대로입니다
    - **배경**
      - 템플릿에 면 색을 직접 넘기면(fill·color) 그 색은 가이드 밖 값이라 글자색을 미리 계산해 둘 수 없다. var() 같은 값이면 색을 읽을 수도 없다.
      - 그래서 그때는 이번 카드 전의 글자색(대개 edge.stroke)을 그대로 쓴다. 원문: packages/visualization/src/molecules/ClassBox.tsx:48
      - 게이트 표본은 색을 직접 넘기지 않으므로 이 경우는 검사하지 않는다. 원문: apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx:28
      - 직접 넘긴 값은 가이드를 이긴다는 것이 원래 규약이다. 원문: packages/visualization/src/provider/contractCss.ts:10
    - **정할 것**
      직접 넘긴 색 위 글자의 대비를 누가 책임질 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 넘긴 쪽이 책임진다(지금처럼) | 넘긴 색에 따라 글자가 안 읽힐 수 있다 | 동작이 예전과 같아 기존 앱이 놀라지 않는다 |
    | 읽을 수 있는 색이면 글자색을 계산한다 | 템플릿 30여 곳에 계산이 들어가고 var() 값은 여전히 못 다룬다 | 대부분 읽히지만 규칙이 둘로 갈린다 |
    | 글자색을 정하는 prop 을 따로 연다 | 공개 API 가 늘어난다 | 넘긴 쪽이 글자색까지 정할 수 있다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 검토자 확인: 카드 목적은 「카탈로그 가이드 30개 모두에서」 읽히는 것이라 앱이 직접 넘긴 색은 범위 밖이고, 직접 넘긴 값이 가이드를 이긴다는 원래 규약(contractCss.ts:10)과도 맞습니다. 인용한 세 자리(ClassBox.tsx:48 · TemplatePaintGate.stories.tsx:28 · contractCss.ts:10)는 상세와 같습니다. 「예전 그대로」도 맞습니다 — 직접 넘기면 ClassBox · C4Box · 의미 노드는 edge.stroke, Treemap · PacketDiagram 은 canvas.bg, Heatmap · ChoroplethMap 은 shape.stroke 로, 모두 이 카드 전의 값입니다.

- [x] visualization 패키지를 minor 로 올릴 것인가 — 기본 글자색이 바뀌므로 minor(0.4.1 → 0.5.0)로 적었습니다
    - **배경**
      - tokens 패키지는 선택 필드 하나가 늘어 minor 다. 계획 때 유저가 승인했다. 원문: KANBAN/cards/KAN-061-K8V2HH.md 「전략 · 정해진 것」
      - visualization 은 props·export 가 그대로지만, 노드 기본 글자색·보조 글자 진하기·팔레트 면 글자색이 여러 템플릿에서 바뀐다. 원문: .changeset/kan-061-on-ink.md
      - 지금 버전이 0.4.1 이라 minor 면 0.5.0 이고, ^0.4 범위로 받는 앱은 저절로 올라가지 않는다. 원문: packages/visualization/package.json:3
      - 언제 배포할지는 KAN-068(미배포 수정분 배포)이 착수 때 정하기로 돼 있다. 원문: KANBAN.md:73
    - **정할 것**
      visualization 을 minor 로 올릴 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** minor(0.5.0) | ^0.4 로 받는 앱은 직접 올려야 새 글자색을 받는다 | 화면이 바뀌는 변경이 버전에 드러난다 |
    | patch(0.4.2) | 앱이 모르는 사이 글자색이 바뀐다 | 고친 내용이 바로 퍼진다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 검토자 확인: 상세 두 줄이 사실과 다릅니다. ① KAN-068 은 KAN-056 · 060 · 065 세 수정분만 다루고 KAN-061 의 배포 시점은 정하지 않습니다(KANBAN.md:73-77, KANBAN/cards/KAN-068-W6TE2S.md 에 KAN-061 언급 없음). 그 세 changeset 은 이미 2026-10-09 release 커밋 7e3f287 로 소진되어 visualization 이 0.4.1 이 되었습니다. ② tokens minor 는 「전략 · 정해진 것」이 아니라 「전략 · 접근」 6 에 있고, visualization minor 도 계획의 「검증」 절에 이미 적혀 있습니다. 결론(minor)은 바뀌지 않습니다. 다만 근거는 「기본 글자색이 바뀌므로」보다 「Provider 가 새 CSS 변수 --bbangto-viz-on-* 를 내놓으므로(기능 추가)」가 맞습니다. 글자색만 바뀐 변경은 이 저장소가 KAN-056 에서 patch(0.4.1)로 냈습니다(packages/visualization/CHANGELOG.md:3-7).
    > - ai · 2026-10-10 — 착수한 쪽 정정: 검토자 지적이 맞습니다. 상세의 「KAN-068 이 착수 때 정한다」는 틀렸습니다 — KAN-068 은 KAN-056·060·065 만 다뤘고 이미 main 에 병합됐습니다(6c7e290). 「tokens minor 는 전략 · 정해진 것」도 틀렸고 「전략 · 접근」 6 이 맞습니다. minor 의 근거도 검토자 말대로 「새 CSS 변수 --bbangto-viz-on-* 를 내놓는 기능 추가」로 고쳐 읽어 주세요. 결론(minor)은 그대로입니다.

- [ ] Sankey 노드 이름이 neon-gradient-dark 에서 일곱 번째 리본 위 4.16:1 로 남는 것을 어떻게 다룰 것인가 — 게이트 표본이 이 경우를 재지 않습니다
    - **배경**
      - 검토자 에이전트가 3항 2번(반투명 면 음영 규칙)의 「첫 면 우선」 대체를 대조하다 세웠습니다.
      - SankeyDiagram 노드 이름은 canvas 와 리본 면 8개(팔레트 p1~p8, 투명도 0.42)를 한꺼번에 넘겨 글자색 하나를 고릅니다. 원문: packages/visualization/src/templates/SankeyDiagram.tsx:61
      - 리본마다 음영 면까지 더해져 모든 면을 넘는 색이 없으면, 대체 규칙이 첫 면(canvas)만 보고 검정·흰색을 고릅니다. 리본도 실제 바탕인데 빠집니다. 원문: packages/visualization/src/tokens/onInk.ts:95
      - 카탈로그 가이드 neon-gradient-dark-01 에서는 고른 흰 글자가 p7(#FFFFFF) 리본 위에서 4.16:1 입니다. preset 중에는 neon-gradient-dark aurora(p7, 4.28)와 marker-sketchnote darkboard(p1, 4.24)도 4.5 에 못 미칩니다. 셋 다 어떤 한 색으로도 모든 리본을 넘지 못하는 경우라, 대체 규칙이 고른 색 자체는 그중 나은 쪽입니다.
      - 이름은 노드 오른쪽, 그 노드에서 나가는 리본(같은 팔레트 색)이 시작하는 자리에 놓입니다. 그래서 neon-gradient-dark 에서는 일곱 번째 노드에 나가는 연결이 있으면 미달이 드러납니다. 원문: packages/visualization/src/templates/SankeyDiagram.tsx:98
      - 게이트 표본은 노드 4개라 p1~p4 리본만 그려 이 경우를 재지 않습니다. 원문: apps/storybook/src/stories/visualization/_paintGateFixtures.tsx:444
      - changeset 은 「SankeyDiagram(리본 면 전부에서 읽히는 색 하나)」라고 적어, 배포 문서가 사실보다 넓게 말합니다. 원문: .changeset/kan-061-on-ink.md:30
    - **정할 것**
      Sankey 이름의 남은 미달을 이 카드에서 어떻게 다룰 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** changeset 문구를 바로잡고 남은 미달은 별도 카드로 넘긴다 | 카드가 하나 늘어난다 | 이 카드는 문구만 고쳐 닫히고, 노드 7개 이상 Sankey 표본을 게이트에 넣는 일과 함께 따로 본다 |
    | 문구만 바로잡고 남은 미달로 둔다 | neon-gradient-dark 에서 일곱 번째 노드 이름이 4.16:1 로 남고 게이트도 계속 못 본다 | 카드 목표(기준 목록 0)는 그대로다 |
    | 이 카드에서 고친다(이름마다 자기 리본 면으로 고르기 등) | 템플릿 계산이 늘고, 이름이 리본보다 길면 canvas 위로 넘어가 다시 갈린다 | 미달이 줄지만 다 풀리는지는 확인 안 함 |

    > **판정**
    >
    > - 반려 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 착수한 쪽: 2026-10-10 유저가 「이 카드에서 고침」을 골라 재작업했습니다(커밋 ec8b117). 먼저 TemplatePaintGate 에 SankeyRibbonLabelGate(팔레트 8색이 모두 나가는 리본이 되는 노드 여덟 × 카탈로그 가이드 30개)를 더해 neon-gradient-dark 「Source 7」 4.16 을 빨강으로 재현했고, 노드 이름이 그 노드에서 나가는 리본 면을 첫 면(실제 바탕)으로 두고 고르게 바꿔 초록이 됐습니다. 마지막 열 노드처럼 나가는 리본이 없으면 canvas 가 첫 면입니다. changeset 문구도 「노드마다 그 노드에서 나가는 리본 면으로」로 실제 동작에 맞췄습니다.
    > - ai · 2026-10-10 — 검토자 재확인(재작업 ec8b117) — 반려 사유: 방향은 유저가 고른 「이 카드에서 고친다」대로이고, 새 SankeyRibbonLabelGate 는 지난번 지적한 경우(이름이 자기 리본 위)를 실제로 잽니다. 표본 노드는 받는 값 0 · 내보내는 값 24 라 이름(11px)이 24px 리본 한가운데 놓이고, 게이트는 글자 상자 가운데 한 점의 바탕을 잽니다(TemplatePaintGate.stories.tsx:205-207). 재작업 전 흰 글자의 p7 리본 대비를 다시 계산하면 4.16 으로, 착수한 쪽이 재현했다는 빨강과 같습니다. 그런데 고친 방식의 전제인 「이름은 그 노드에서 나가는 리본 위에 놓인다」(SankeyDiagram.tsx:60 주석)가 늘 맞지는 않습니다. 나가는 리본은 노드 위쪽부터 쌓이고(sankey.ts:82), 이름은 노드 높이의 가운데에 놓입니다(SankeyDiagram.tsx:106). 그래서 내보내는 값이 받는 값의 절반보다 작은 노드는 이름 전체가 canvas 위에 있습니다. 예를 들어 neon-gradient-dark 에서 일곱 번째 노드가 60 을 받고 20 을 내보내면, 리본은 y 40~60 이고 이름은 64.5~75.5 입니다. 리본에 맞춰 고른 검정이 canvas #1E1A3D 위에 놓여 1.27:1 이 되고, 재작업 전 흰색(canvas 위 16.53)보다 나빠졌습니다. 이 경우는 이름이 실제로 놓이는 면을 첫 면으로 두면 풀립니다. 게이트 표본에 이런 노드(내보내는 값 < 받는 값의 절반)를 하나 넣어 두면 다시 생기지 않게 막을 수 있습니다.
    > - ai · 2026-10-10 — 검토자 덧붙임: 리본이 글자보다 얇아 이름이 리본과 canvas 에 걸치는 경우는, 고를 때 대가로 적은 「canvas 위로 넘어가 다시 갈린다」 그대로입니다. 다만 그 크기를 적어 둡니다. neon-gradient-dark 에서는 p7 리본과 canvas 둘 다 4.5 를 넘는 글자색이 계산상 없습니다. 검정은 리본 쪽 5.05 · canvas 쪽 1.27 이고, 흰색은 리본 쪽 4.16 · canvas 쪽 16.53 입니다. 지금 방식은 검정을 골라 걸친 부분이 거의 안 보입니다. 이런 조합은 가이드 30개 중 neon-gradient-dark p7 하나이고, preset 까지 넣으면 neon-gradient-dark aurora p7 과 marker-sketchnote darkboard p1 을 더해 셋입니다. 또 검토서 2항 실행 결과는 재작업 전 값(Paint Gate 2 passed · pnpm test 1299 · viz 단위 279)이 그대로라, 새 게이트를 돌린 결과가 검토서에는 없습니다. 카드 수행 내역에는 1300 · 280 으로 적혀 있습니다.
    > - ai · 2026-10-10 — 착수한 쪽(재작업 2, 커밋 7cbec02): 검토자 지적이 맞았습니다 — 나가는 리본은 노드 위쪽부터 쌓이고 이름은 노드 가운데라, 「이름은 자기 리본 위」 전제가 틀리는 노드가 있었습니다. 먼저 SankeyRibbonLabelGate 표본에 60 을 받고 20 만 내보내는 일곱째 노드(p7)를 넣어 neon-gradient-dark 「Source 7」 1.27 을 빨강으로 재현했고, 이름 가운데를 실제로 덮는 나가는 리본이 있으면 그 리본, 없으면 canvas 를 첫 면으로 두고 고르게 고쳐 초록이 됐습니다. 이름이 리본과 canvas 에 걸치는 경우(neon-gradient-dark p7 등)는 검토자 의견대로 남아 있습니다. 검토서 2항은 재작업 뒤 값으로 다시 만들었고, 이번에는 발행본(review.md)도 함께 다시 뽑았습니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-061-K8V2HH --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-061-K8V2HH --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-061-K8V2HH --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
