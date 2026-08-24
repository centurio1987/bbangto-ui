---
card: KAN-042-JZ2ZBT
title: bbangto-ui-vizualization을 사용하는 클라이언트가 문제를 제기했다. "/Users/centurio/resume/docs/viz-upstream-issues.md" 이 레포트를 보고 문제를 진단하고 문제 해결 전략 레포트를 작성하고, wbs를 작성하여 이 카드를 수행하는 agent가 사용할 수 있도록 해라.ㄴ
created: 2026-08-24
branch: main
worktree: /Users/centurio/bbangto-ui
base: ab1a408
merged: 649aaaa
status: 검토 대기
---

# KAN-042-JZ2ZBT 검토 요청 — bbangto-ui-vizualization을 사용하는 클라이언트가 문제를 제기했다. "/Users/centurio/resume/docs/viz-upstream-issues.md" 이 레포트를 보고 문제를 진단하고 문제 해결 전략 레포트를 작성하고, wbs를 작성하여 이 카드를 수행하는 agent가 사용할 수 있도록 해라.ㄴ

카드: [KAN-042-JZ2ZBT.md](../cards/KAN-042-JZ2ZBT.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `main` — **머지됨**, 대상은 아래 고정 범위 |
| 워크트리 | `/Users/centurio/bbangto-ui` |
| 베이스 | `ab1a408` |
| 변경 훑기 | `git diff ab1a408..649aaaa` |

**커밋 2건**

```text
649aaaa feat(visualization): 상류 이슈 4건 해소 — 축 정렬 화살촉·콘텐츠 박스·경계 라벨·라벨 서체
ad97f91 kanban: KAN-042 상류 이슈 진단·전략·WBS 작성 + 진행 중 이동
```

**변경 파일 48개 (+1628 −90)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/upstream-viz-issues-p1-p4.md` | M | 55 | 0 |
| `KANBAN.archive.jsonl` | M | 2 | 0 |
| `KANBAN.cards/KAN-042-JZ2ZBT.md` | M | 208 | 0 |
| `KANBAN.log.md` | M | 2 | 2 |
| `KANBAN.md` | M | 2 | 1 |
| `KANBAN.state.json` | M | 25 | 24 |
| `apps/storybook/.storybook/preview.tsx` | M | 6 | 0 |
| `apps/storybook/src/stories/visualization/Atoms.stories.tsx` | M | 395 | 0 |
| `apps/storybook/src/stories/visualization/_edgeGeometryGate.ts` | M | 67 | 0 |
| `packages/tokens/src/visualization.ts` | M | 8 | 0 |
| `packages/visualization/src/atoms/Axis.tsx` | M | 2 | 2 |
| `packages/visualization/src/atoms/Boundary.tsx` | M | 48 | 3 |
| `packages/visualization/src/atoms/EdgeLabel.tsx` | M | 2 | 1 |
| `packages/visualization/src/atoms/Lane.tsx` | M | 2 | 1 |
| `packages/visualization/src/atoms/MilestoneMarker.tsx` | M | 2 | 1 |
| `packages/visualization/src/atoms/Node.tsx` | M | 7 | 4 |
| `packages/visualization/src/atoms/NodeLabel.tsx` | M | 45 | 4 |
| `packages/visualization/src/atoms/Tag.tsx` | M | 2 | 1 |
| `packages/visualization/src/atoms/index.ts` | M | 1 | 1 |
| `packages/visualization/src/geometry/routing.test.ts` | M | 198 | 0 |
| `packages/visualization/src/geometry/routing.ts` | M | 35 | 3 |
| `packages/visualization/src/geometry/shapes.test.ts` | M | 194 | 0 |
| `packages/visualization/src/geometry/shapes.ts` | M | 152 | 1 |
| `packages/visualization/src/index.ts` | M | 7 | 1 |
| `packages/visualization/src/molecules/ClassBox.tsx` | M | 4 | 4 |
| `packages/visualization/src/molecules/EntityTable.tsx` | M | 4 | 4 |
| `packages/visualization/src/patterns/BusinessModelCanvas.tsx` | M | 2 | 1 |
| `packages/visualization/src/patterns/InformationalInfographic.tsx` | M | 4 | 3 |
| `packages/visualization/src/patterns/ListInfographic.tsx` | M | 3 | 2 |
| `packages/visualization/src/patterns/PosterEditorial.tsx` | M | 2 | 1 |
| `packages/visualization/src/patterns/Statistics.tsx` | M | 2 | 1 |
| `packages/visualization/src/patterns/SwotMatrix.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/BPMNCollaborationDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/DataLineage.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/Fishbone.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/GitGraph.tsx` | M | 3 | 2 |
| `packages/visualization/src/templates/Heatmap.tsx` | M | 3 | 3 |
| `packages/visualization/src/templates/Kruchten4Plus1View.tsx` | M | 3 | 3 |
| `packages/visualization/src/templates/NetworkTopology.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/QuadrantChart.tsx` | M | 3 | 2 |
| `packages/visualization/src/templates/RequirementDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/ScatterPlot.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/TimelineDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/UMLPackageDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/ViewpointFrame.tsx` | M | 5 | 4 |
| `packages/visualization/src/tokens/index.ts` | M | 1 | 0 |
| `packages/visualization/src/tokens/labelFont.test.ts` | M | 61 | 0 |
| `packages/visualization/src/tokens/labelFont.ts` | M | 43 | 0 |

**롤백 태그 0개** — 없음(`--tags` 를 넘기지 않았거나 아직 태그가 없습니다)

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-042-JZ2ZBT.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

**이 카드는 두 단계다. 지금 단계(진단·전략·WBS)의 완료 조건과, 후속 수행 단계(S1~S9)의 완료 조건을 분리한다.**

**실행 결과**

```text
품질 게이트 5종 — 2026-08-24 실행, 전부 초록
$ pnpm typecheck   → 8개 워크스페이스 tsc --noEmit 전부 Done (exit 0)
$ pnpm build       → 7개 패키지 tsup ESM+DTS Build success (exit 0)
$ pnpm test        → Test Files 182 passed (182) / Tests 1224 passed (1224) (exit 0)
$ pnpm test:unit   → foundations 44 · style-guide-catalog 76 · viz-catalog 39 등 전부 passed (exit 0)
$ pnpm --filter storybook build → Storybook build completed successfully (exit 0)
검증 절 원문: KANBAN/cards/KAN-042-JZ2ZBT.md 「검증」 절
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-042-JZ2ZBT --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-042-JZ2ZBT --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-042-JZ2ZBT --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 이미 릴리스까지 나간 작업을 지금 소급 승인해도 되는가 — 검토서 없이 검토 컬럼에 10일 서 있었고 그 위에 후속 카드가 쌓였습니다
    - **상세** — 검토 이동 기록은 .kanban/log.md:10 (#123 2026-08-14 14:17 · 검토로 이동)이고, 그 뒤 후속 카드 KAN-043 이 이 카드의 마지막 커밋 649aaaa 위에서 시작해 릴리스까지 갔습니다(.kanban/log.md:8). 즉 이 승인은 이미 npm 에 배포된 것을 사후 확인하는 것입니다

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 브랜치 규율을 못 지킨 채 main 에서 수행된 것을 이대로 닫아도 되는가
    - **상세** — 규율 원문: /Users/centurio/.claude/skills/manage-kanban/SKILL.md 「1.5 브랜치 규율」 — 루트 카드 하나 = 브랜치 하나입니다. 그러나 git branch -a 에 KAN-042-JZ2ZBT 브랜치가 없고 커밋 ad97f91·649aaaa 가 main 에 직접 쌓였습니다. 지금 되돌릴 방법은 없고, 남는 선택은 이 사실을 기록에 남기고 닫을지입니다

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 상류 이슈 4건 해소가 클라이언트 리포트의 요구를 실제로 충족하는가 — 클라이언트 재확인은 안 받았습니다
    - **상세** — P1~P4 는 클라이언트가 원 리포트에서 매긴 이슈 번호이고 각각 축 정렬 화살촉·콘텐츠 박스·경계 라벨·라벨 서체 결함입니다. 원문: /Users/centurio/resume/docs/viz-upstream-issues.md. 해소 코드는 packages/visualization/src/geometry/shapes.ts:1 과 routing.ts:1 이고 신규 테스트는 shapes.test.ts(194행)·routing.test.ts(198행)입니다

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
     `review-judge --card KAN-042-JZ2ZBT --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-042-JZ2ZBT --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-042-JZ2ZBT --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
