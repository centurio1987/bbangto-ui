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

**커밋 11건**

```text
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

**변경 파일 44개 (+839 −1736)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-061-on-ink.md` | M | 36 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 88 | 88 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 8 | 8 |
| `KANBAN/cards/KAN-061-K8V2HH.md` | M | 26 | 8 |
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | M | 2 | 1 |
| `apps/storybook/src/stories/visualization/_labelContrastBaseline.ts` | M | 7 | 1552 |
| `packages/tokens/src/visualization.ts` | M | 21 | 0 |
| `packages/visualization-style-guide-catalog/src/onInk.test.ts` | M | 64 | 0 |
| `packages/visualization/README.md` | M | 10 | 5 |
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
| `packages/visualization/src/templates/IsometricScene.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/Mindmap.tsx` | M | 8 | 7 |
| `packages/visualization/src/templates/PacketDiagram.tsx` | M | 6 | 2 |
| `packages/visualization/src/templates/QuadrantChart.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/RequirementDiagram.tsx` | M | 17 | 7 |
| `packages/visualization/src/templates/SankeyDiagram.tsx` | M | 12 | 2 |
| `packages/visualization/src/templates/StackedBarChart.tsx` | M | 5 | 2 |
| `packages/visualization/src/templates/Treemap.tsx` | M | 7 | 4 |
| `packages/visualization/src/templates/UserJourneyGantt.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/WorkBreakdownStructure.tsx` | M | 6 | 3 |
| `packages/visualization/src/tokens/contract.ts` | M | 7 | 2 |
| `packages/visualization/src/tokens/onInk.test.ts` | M | 203 | 0 |
| `packages/visualization/src/tokens/onInk.ts` | M | 116 | 0 |

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
## 검증 실행 결과 (2026-10-10, main 4d60413 을 합친 브랜치 위)
- TemplatePaintGate.stories.tsx(LiteralPaintGate · LabelContrastGate):  Tests 2 passed (2)
- LABEL_CONTRAST_BASELINE 항목 수: 0
- visualization 단위(onInk.test.ts 포함): Tests  279 passed (279)
- 카탈로그(가이드·preset 전부 × 면 on 글자색 ≥ 4.5): Tests  41 passed (41)
- 가이드 파일 변경(merge-base 기준): 0줄
- 공개 index 변경(packages/visualization/src/index.ts · tokens/index.ts · packages/tokens/src/index.ts): 0줄
- changeset: --- '@centurio1987/bbangto-ui-tokens': minor '@centurio1987/bbangto-ui-visualization': minor --- 
- pnpm build: 종료코드 0 · pnpm typecheck: 종료코드 0
- pnpm test:  Test Files 194 passed (194)  Tests 1299 passed (1299) 
- pnpm --filter storybook build: Storybook build completed successfully
- pnpm test:unit: 종료코드 0 — packages/hooks: 115 passed (115);packages/visualization: 279 passed (279);packages/foundations: 138 passed (138);packages/style-guide-catalog: 108 passed (108);.../visualization-style-guide-catalog: 41 passed (41);
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

- [ ] 흐리게 쓰던 보조 글자를 진하게 바꾼 것을 받아들일 것인가 — 진하게 바꾸고 구분은 크기로 남겼습니다
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

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 반투명 면 위 글자색을 검정 30% 음영까지 견디게 고르는 규칙을 받아들일 것인가 — 이 규칙으로 24개 면의 글자색이 바뀌었습니다
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

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 앱이 노드·칸 색을 직접 넘기면 글자색을 예전 그대로 둘 것인가 — 지금은 예전 그대로입니다
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

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] visualization 패키지를 minor 로 올릴 것인가 — 기본 글자색이 바뀌므로 minor(0.4.1 → 0.5.0)로 적었습니다
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
     `review-judge --card KAN-061-K8V2HH --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-061-K8V2HH --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-061-K8V2HH --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
