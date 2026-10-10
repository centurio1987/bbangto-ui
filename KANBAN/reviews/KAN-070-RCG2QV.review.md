---
card: KAN-070-RCG2QV
title: viz 연결선 대시 범위 — 어느 선이 스타일 가이드 대시를 따르는가 (Edge 밖 관계선 넷 · 실선이 뜻을 갖는 Edge 선)
created: 2026-10-10
branch: KAN-070-RCG2QV
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-070-RCG2QV
base: 0a81094
status: 검토 대기
---

# KAN-070-RCG2QV 검토 요청 — viz 연결선 대시 범위 — 어느 선이 스타일 가이드 대시를 따르는가 (Edge 밖 관계선 넷 · 실선이 뜻을 갖는 Edge 선)

카드: [KAN-070-RCG2QV.md](../cards/KAN-070-RCG2QV.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-070-RCG2QV` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-070-RCG2QV` |
| 베이스 | `0a81094` |
| 변경 훑기 | `git diff 0a81094...HEAD` |

**커밋 11건**

```text
667f238 feat(viz): KAN-070 S5 — C4 관계선은 가이드 대시를 따른다 (검토 1번 추가 의견, 유저 선택)
a517ec2 kanban: KAN-070 검토자 대행 — 항목 1·2·4 승인(ai·검토자) · 1 추가 의견(C4) · 3 사람에게 넘김 · 발행본 다시 뽑음
b2ae712 kanban: KAN-070 검토로 이동 — 검토서(판단 항목 4) · 검토 리포트
de9aa93 kanban: KAN-070 S4 — 품질 게이트 5종 초록 · a11y 강제 확인
12db5ac docs(viz): KAN-070 S3 — 연결선 대시 범위 문서 · changeset
3341683 feat(viz): KAN-070 S2 — 표준 표기 템플릿은 가이드 대시를 끄고, Edge 밖 관계선은 따르게 한다
8569916 test(viz): KAN-070 S1 — 연결선 대시 게이트 스토리 넷 (구현 전 빨강)
b3a2ccf kanban: KAN-070 배치1 착수 시점 판단 — 단일 에이전트(유저 선택)
7a7fea1 kanban: KAN-070 계획 리포트 (voice 미적용)
612e3ce kanban: KAN-070 실행 문서(scope·전략·실행 계획·검증) · 배치 계획 1장(S1~S4)
b40aafc kanban: KAN-070 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 42개 (+2788 −67)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-070-connector-dash-scope.md` | M | 22 | 0 |
| `.kanban/archive.jsonl` | M | 2 | 0 |
| `.kanban/log.md` | M | 2 | 2 |
| `.kanban/reviews/KAN-070-RCG2QV.events.jsonl` | M | 13 | 0 |
| `.kanban/reviews/KAN-070-RCG2QV.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 35 | 25 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 13 | 10 |
| `KANBAN/batches/KAN-070-RCG2QV.batch1.md` | M | 99 | 0 |
| `KANBAN/batches/KAN-070-RCG2QV.batch2.md` | M | 43 | 0 |
| `KANBAN/cards/KAN-070-RCG2QV.md` | M | 80 | 0 |
| `KANBAN/reports/KAN-070-RCG2QV.report.html` | M | 514 | 0 |
| `KANBAN/reviews/KAN-070-RCG2QV.review.html` | M | 1248 | 0 |
| `KANBAN/reviews/KAN-070-RCG2QV.review.md` | M | 273 | 0 |
| `apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx` | M | 351 | 0 |
| `packages/tokens/src/visualization.ts` | M | 4 | 3 |
| `packages/visualization/README.md` | M | 13 | 1 |
| `packages/visualization/src/patterns/TimelineRoadmap.tsx` | M | 2 | 0 |
| `packages/visualization/src/provider/contractCss.ts` | M | 7 | 0 |
| `packages/visualization/src/templates/ActivityDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/ArchiMateDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/ArchiMateViewpointDiagram.tsx` | M | 2 | 0 |
| `packages/visualization/src/templates/BPMNCollaborationDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/BPMNDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/ClassDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/DMNDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/ERDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/Flowchart.tsx` | M | 3 | 1 |
| `packages/visualization/src/templates/IsometricScene.tsx` | M | 1 | 0 |
| `packages/visualization/src/templates/PacketDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/RequirementDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/SequenceDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/SitemapTree.tsx` | M | 1 | 0 |
| `packages/visualization/src/templates/StateDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/SysMLBlockDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/UMLComponentDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/UMLDeploymentDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/UMLPackageDiagram.tsx` | M | 2 | 1 |
| `packages/visualization/src/templates/UMLSequenceDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/UseCaseDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/WorkBreakdownStructure.tsx` | M | 1 | 0 |
| `packages/visualization/style-classification.md` | M | 2 | 1 |

**롤백 태그 5개**

```text
kan/KAN-070-RCG2QV/S1
kan/KAN-070-RCG2QV/S2
kan/KAN-070-RCG2QV/S3
kan/KAN-070-RCG2QV/S4
kan/KAN-070-RCG2QV/S5
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-070-RCG2QV.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

아래를 저장소 루트에서 `bash -c` 로 돌려 모두 통과하면 끝이다.

1. `pnpm test` — `VISUALIZATION/Templates/Dash Gate` 스토리가 chromium 에서 초록. 대시 가이드 `7 3` 아래 계산된 `stroke-dasharray` 로 잰다: 표준 표기 템플릿의 연결선은 `7px, 3px` 이 0개, 관계선 템플릿은 1개 이상, Flowchart 는 대시 선이 섞이면 실선 `none`·대시 `6px, 4px`, TimelineRoadmap 축 `none`.
2. 같은 `pnpm test` 에서 Paint Gate·Headless(KAN-057 대시 스토리 넷)를 포함한 기존 스토리가 그대로 초록.
3. `git diff main...HEAD --stat -- packages/visualization-style-guide-catalog` — 0줄(카탈로그 값은 안 고친다. 지금 그림이 안 바뀐다는 근거). 착수 뒤 main 이 움직여도(배포 커밋 등) 이 브랜치 커밋만 보도록 기준점(merge-base)부터 잰다.
4. 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 모두 초록.
5. a11y — Dash Gate 파일만 `a11y: { test: 'error' }` 로 임시 강제해 돌린 결과(저장소 설정이 `'todo'` 라 `pnpm test` 는 접근성 위반을 실패로 안 센다).

**실행 결과**

```text
1. pnpm test — Test Files 195 passed (195) · Tests 1304 passed (1304). Dash Gate 스토리 넷 초록(대시 가이드 7 3): ① 표준 표기 표본 22개(standard 태그 28개 − C4 여섯) 모두 data-viz-notation, 대시를 직접 안 넘긴 연결선 30개 none · 직접 넘긴 대시 12개(5 3·5 4·6 4·2 3)는 그대로 · 예외 목록 C4 여섯이 실제 standard 태그 템플릿 ② 관계선 템플릿 19개(C4 여섯 포함)마다 7px, 3px 연결선 1개 이상, 표기 템플릿 밖에 훅 없음 ③ Flowchart 점선 섞임 → none · 6px, 4px, 안 섞임 → 7px, 3px 둘 ④ TimelineRoadmap 축 none, ProcessSteps·Cycle(orbit)·Hierarchy·Sketchnote 연결선 7px, 3px
2. Paint Gate·Headless(KAN-057 대시 스토리 넷)·Patterns 를 포함한 viz 스토리 — S2 뒤 따로 돌린 결과 22개 파일 151개 초록이고, S4 의 pnpm test 전체(1번)에도 들어 있다
3. git diff main...HEAD --stat -- packages/visualization-style-guide-catalog → 0줄 (카탈로그 무변경). 카탈로그 가이드 30개·프리셋 포함 92곳 edge.dashPattern 모두 '' (빌드 결과로 확인)
4. 품질 게이트 — pnpm typecheck rc 0 (TS 오류 0) · pnpm build rc 0 · pnpm test rc 0 · pnpm --filter storybook build rc 0 (Storybook build completed successfully) · pnpm test:unit rc 0 (hooks 115 · visualization 285 · foundations 143 · style-guide-catalog 113 · visualization-style-guide-catalog 46 통과)
5. a11y — Dash Gate 파일만 a11y test:'error' 로 임시 강제해 4개 통과, 일부러 넣은 alt 없는 img 는 image-alt 로 실패함을 확인한 뒤 되돌렸다
참고. 착수 뒤 main 에 KAN-074 배포 커밋(7849962 version packages · visualization 1.0.0)이 들어왔다. 코드 변경은 0(CHANGELOG·package.json·changeset 삭제뿐)이라 브랜치에서 돈 게이트가 병합 코드에도 해당한다
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-070-RCG2QV --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-070-RCG2QV --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-070-RCG2QV --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 표준 표기법 템플릿은 템플릿 통째로 가이드 대시를 끌 것인가 — 유형 메타의 「표준」 태그가 붙은 28개를 끄도록 했습니다
    - **배경**
      - 스타일 가이드가 연결선을 점선으로 정하면, 표기법에서 실선과 점선이 서로 다른 관계를 뜻하는 그림은 뜻이 바뀝니다. BPMN(업무 흐름 표기법) 시퀀스 흐름(실선)이 점선이 되면 메시지 흐름으로 읽히고, UML(소프트웨어 설계 표기법) 연관(실선)이 점선이 되면 의존으로 읽힙니다.
      - 지금 카탈로그 가이드 30개는 프리셋까지 92곳 모두 실선이라, 그림에 나타나는 문제는 아직 없습니다. 원문: packages/visualization-style-guide-catalog (edge.dashPattern 값, 빌드 결과로 확인)
      - 유형 메타데이터(AI 가 그림 유형을 고를 때 읽는 정보)에 「표준 표기법 유래」 태그가 이미 있어서, 그 태그가 붙은 28개 내보낸 이름(UML·BPMN·C4(소프트웨어 구조를 네 단계 상자로 그리는 표기법)·ArchiMate·SysML·DMN·ER·Packet)을 기준으로 삼았습니다. 원문: packages/visualization/src/typeMeta/types.ts:138
      - 그 템플릿들의 바깥 틀에 표시를 하나 달고, 공통 CSS 가 그 안의 연결선 대시를 끕니다. 템플릿이 직접 넘긴 점선(UML 의존 등 12개)은 그대로 남고, 점선을 넘기지 않은 연결선 38개는 실선으로 그려집니다. 원문: packages/visualization/src/provider/contractCss.ts:29
      - 점선이 하나도 없는 BPMNDiagram·StateDiagram·C4 도 함께 끕니다. 표기법상 실선이 뜻을 갖기는 마찬가지라서입니다.
      - 새 게이트 스토리가 태그 목록을 직접 읽으므로, 앞으로 표준 템플릿이 표시를 빠뜨리면 그 이름으로 실패합니다. 원문: apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx
    - **정할 것**
      표준 표기법 템플릿 전체에서 가이드 대시를 끌 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 태그가 붙은 템플릿 전체에서 끈다 | 점선 가이드를 골라도 UML·BPMN·C4 그림의 실선은 점선이 되지 않는다 | 표기법의 뜻이 어느 가이드에서나 그대로다 |
    | 점선과 나란히 있는 실선만 끈다 | 템플릿마다 선 단위로 조건을 넣어야 한다 | 점선이 없는 BPMNDiagram·StateDiagram 의 흐름이 점선이 되어 표기법과 어긋난다 |
    | 끄지 않는다(KAN-057 상태 그대로) | 할 일이 없다 | 점선 가이드에서 UML 연관과 의존, BPMN 시퀀스 흐름과 메시지 흐름이 구분되지 않는다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10
    > - 철회 · 유저 · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — C4 여섯 개는 배경의 이유(「표기법상 실선이 뜻을 갖기는 마찬가지」)가 약합니다. 이 저장소의 C4 템플릿 여섯 개에는 점선 연결선이 하나도 없고(templates/C4*.tsx 에 strokeDasharray 0건), C4 모델은 선 모양을 정하지 않는 표기 중립 방식으로 알려져 있습니다(c4model.com 원문은 이번에 다시 확인 안 함). 그래서 점선 가이드에서 C4 관계선만 실선으로 남는 것은 목표 앞 절 「관계선은 템플릿과 상관없이 같은 모양」과 조금 어긋납니다. 그래도 추천안대로 승인합니다. 실선으로 남는 쪽은 뜻을 잃지 않고, 지금 점선 가이드가 없어 그림도 안 바뀌며, C4 만 빼려면 게이트에 예외 목록을 둬야 해 「standard 태그 = 표시」 규칙이 깨지기 때문입니다. C4 관계선은 가이드를 따르게 하고 싶으면 이 항목을 다시 판정해 주세요.

- [x] 카드 메모와 다르게 분류한 GitGraph·StepConnector 를 그대로 둘 것인가 — 둘 다 이번 수정에서 뺐습니다
    - **배경**
      - 카드 메모(KAN-057 검토에서 나온 목록)는 GitGraph 커밋 선을 「가이드 대시를 못 따르는 선」에, StepConnector 를 「따르면 안 되는 선」에 넣었습니다. 원문: KANBAN.md (KAN-070 메모)
      - GitGraph 커밋 선은 연결선 색이 아니라 브랜치마다 다른 색으로 칠하고, 병합 선은 이미 점선(4 3)을 직접 넘깁니다. 차트의 데이터 선처럼 브랜치를 나타내는 선이라 연결선 규칙 밖으로 두었습니다. 원문: packages/visualization/src/templates/GitGraph.tsx:92
      - StepConnector 는 화살표와 점선 두 모양을 고를 수 있는 부품인데, 저장소에서 쓰는 곳은 ProcessSteps 하나이고 늘 화살표입니다. 단계 사이 화살표는 관계선이라 가이드 대시를 따르게 두었습니다. 원문: packages/visualization/src/molecules/StepConnector.tsx:23 · packages/visualization/src/patterns/ProcessSteps.tsx:100
      - 앱이 두 모양을 한 그림에 섞어 뜻을 가르면 점선 가이드에서 구분이 흐려집니다. 그 경우 실선 가이드를 쓰라고 README 에 적었습니다. 원문: packages/visualization/README.md (구현 규약 · 공통 계약)
    - **정할 것**
      두 분류를 이대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 두 모양을 섞어 쓰는 앱은 점선 가이드에서 구분이 흐려진다(README 안내) | ProcessSteps 화살표가 다른 관계선과 같은 모양이 된다 |
    | StepConnector 화살표를 실선으로 고정한다 | ProcessSteps 화살표는 어떤 가이드에서도 실선이다 | 관계선 모양이 템플릿마다 다시 갈린다 |
    | GitGraph 커밋 선도 가이드 대시를 따르게 한다 | 커밋 선이 점선이 되어 병합 선과 비슷해진다 | 브랜치 선과 병합 선의 구분이 흐려진다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견** — _아직 없습니다._

- [x] 표기 관례가 있지만 표준 태그가 없는 Flowchart·DataFlowDiagram 을 어떻게 다룰 것인가 — Flowchart 는 점선이 섞일 때만 나머지 선을 실선으로 고정하고, DataFlowDiagram 은 가이드를 따르게 두었습니다
    - **배경**
      - 유형 메타에서 두 템플릿은 표준 태그가 없어서, 1번 기준으로는 가이드 대시를 따릅니다. 원문: packages/visualization/src/typeMeta/registry.ts (Flowchart·DataFlowDiagram 항목)
      - Flowchart 는 데이터가 선마다 점선 여부를 고릅니다. 점선이 섞였는데 나머지 선까지 가이드 대시를 따르면 둘이 구분되지 않아서, 그때만 나머지 선을 실선으로 고정했습니다. 섞이지 않으면 가이드를 따릅니다. 원문: packages/visualization/src/templates/Flowchart.tsx:74
      - 순서도(ISO 5807)와 데이터 흐름도(Yourdon·Gane-Sarson 표기)도 표기 관례가 있어 표준으로 볼 여지가 있습니다. 태그를 바꾸면 AI 가 유형을 고를 때 읽는 정보도 함께 바뀌므로 이 카드에서 정하지 않았습니다.
    - **정할 것**
      두 템플릿을 이대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 점선 가이드에서 DataFlowDiagram 흐름선이 점선이 된다 | 순서도는 데이터에 따라, 데이터 흐름도는 가이드를 따른다 |
    | 두 템플릿에 표준 태그와 표시를 단다(새 카드) | 유형 메타가 바뀌고 카드가 하나 는다 | 두 템플릿도 어느 가이드에서나 실선이다 |

    > **판정**
    >
    > - 승인 · 유저 · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 검토자 에이전트는 이 항목을 판정하지 않고 사람에게 넘깁니다. 카드 목표가 「표기법상 실선인 선과 축은 실선으로 남는다」인데, 순서도(ISO 5807)와 데이터 흐름도의 흐름선이 이 「표기법상 실선」에 드는지는 유저만 정할 수 있습니다. 든다고 보면 추천안(이대로 둔다)은 점선 가이드에서 DataFlowDiagram 흐름선과 점선이 섞이지 않은 Flowchart 흐름선을 점선으로 만들어 목표 뒤 절과 어긋납니다. 안 든다고 보면 추천안이 맞습니다. 지금 점선 가이드가 없어 어느 쪽이든 그림은 안 바뀝니다.
표에 없는 갈래가 하나 더 있습니다. 유형 메타의 태그는 그대로 두고 두 템플릿의 바깥 틀에만 표시를 단 뒤, 게이트의 「표준이 아닌 템플릿은 표시를 달면 안 된다」 검사에 두 이름을 예외로 적는 길입니다. 렌더링은 이미 태그가 아니라 템플릿이 단 표시를 따르므로(카드 문서 전략의 버린 대안 셋째), AI 채택 정보를 바꾸지 않고 이 카드 범위(templates/*.tsx) 안에서 할 수 있습니다. 대가는 「standard 태그 = 표시」 규칙에 예외가 둘 생기는 것입니다. 원문: apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx:180
    > - ai · 2026-10-10 — 유저 선택(2026-10-10): 「지금대로 둔다」 — Flowchart 는 점선이 섞일 때만 나머지 선을 실선으로 고정하고, DataFlowDiagram 은 가이드 대시를 따른다. 질문: 「표준 태그가 없는 Flowchart·DataFlowDiagram은 어떻게 둘까요?」

- [x] 배포 등급을 patch 로 둘 것인가 — visualization patch · tokens patch 로 적었습니다
    - **배경**
      - 이 카드 착수 뒤 main 에 배포 커밋이 들어와 visualization 이 1.0.0 이 됐고, KAN-057 의 「가이드 대시가 모든 Edge 연결선에 걸린다」가 거기 실렸습니다. 원문: main 의 packages/visualization/package.json:3 (배포 커밋 7849962)
      - 이 카드는 그 범위를 좁히고(표준 표기 템플릿과 축 제외) 넓힙니다(Edge 없이 그린 관계선 셋 추가). 카탈로그 가이드는 모두 실선이라 그림이 안 바뀌고, 점선을 직접 고른 가이드를 쓰는 앱만 그림이 바뀝니다. 그런 앱이 있는지는 확인 안 함입니다. 원문: packages/tokens/src/visualization.ts:67
      - 컴포넌트 props 와 내보낸 이름은 그대로이고, 새로 붙는 속성은 공통 CSS 만 읽는 내부 표시입니다. 원문: .changeset/kan-070-connector-dash-scope.md:2
    - **정할 것**
      이 변경을 patch 로 낼 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** patch 로 둔다 | 점선 가이드를 직접 만든 앱은 표준 템플릿 선이 말없이 실선으로 바뀐다(변경 기록에는 남는다) | 1.0.1 로 나가고 ^1.0 범위 앱이 바로 받는다 |
    | minor 로 올린다 | 그림이 안 바뀌는 대부분의 앱에 기능 추가 신호가 붙는다 | 1.1.0 으로 나간다. ^1.0 범위 앱도 받는다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견** — _아직 없습니다._

- [x] 표준 표기법 템플릿은 템플릿 통째로 가이드 대시를 끌 것인가 — 「표준」 태그 28개 중 C4 여섯을 뺀 22개를 끄도록 했습니다(1번을 고쳐 다시 올림)
      이 의견은 §3-1 「표준 표기법 템플릿은 템플릿 통째로 가이드 대시를 끌 」 의 추가 의견에서 갈라져 나왔습니다 (추가 2026-10-10).
    - **배경**
      - 1번 항목의 추가 의견(검토자)에 따라 유저가 「C4는 가이드를 따르게」를 골랐습니다(2026-10-10). 그래서 1번을 철회하고 바뀐 범위로 이 항목을 다시 올립니다. 원문: KANBAN/cards/KAN-070-RCG2QV.md (전략 절 마지막 문단)
      - 스타일 가이드가 연결선을 점선으로 정하면, 표기법에서 실선과 점선이 서로 다른 관계를 뜻하는 그림은 뜻이 바뀝니다. BPMN(업무 흐름 표기법) 시퀀스 흐름(실선)이 점선이 되면 메시지 흐름으로 읽히고, UML(소프트웨어 설계 표기법) 연관(실선)이 점선이 되면 의존으로 읽힙니다.
      - 유형 메타데이터(AI 가 그림 유형을 고를 때 읽는 정보)의 「표준 표기법 유래」 태그가 붙은 내보낸 이름 28개 중, UML·BPMN·ArchiMate·SysML·DMN·ER·Packet 22개(파일 18개)의 바깥 틀에 표시를 달고 공통 CSS 가 그 안의 연결선 대시를 끕니다. 원문: packages/visualization/src/provider/contractCss.ts:29
      - C4(소프트웨어 구조를 네 단계 상자로 그리는 표기법) 여섯은 표시를 달지 않아 관계선처럼 가이드 대시를 따릅니다. C4 공식 문서는 선 모양을 정하지 않고("Every line should represent a unidirectional relationship. Every line should be labelled …"), 이 저장소 C4 템플릿에도 점선이 없습니다. 원문: https://c4model.com/diagrams/notation
      - 예외는 게이트 스토리 한 곳에 이름과 근거로 적었고, 게이트는 그 이름들이 실제 표준 태그 템플릿인지도 확인합니다. 원문: apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx:81
      - 점선 가이드 아래에서 22개 표본의 연결선 중 템플릿이 점선을 넘기지 않은 30개는 실선이고, 직접 넘긴 점선 12개(UML 의존 등)는 그대로 남습니다. C4 여섯의 연결선은 가이드 점선을 따릅니다.
    - **정할 것**
      표준 표기법 템플릿 중 C4 를 뺀 22개에서 가이드 대시를 끌 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** C4 를 뺀 22개에서 끈다(유저 선택 반영) | 「표준 태그 = 대시 끔」 규칙에 C4 예외가 생긴다 | UML·BPMN 등은 표기법 뜻이 그대로이고, C4 관계선은 다른 관계선과 같은 모양이 된다 |
    | 28개 전부에서 끈다(옛 1번) | 예외가 없다 | 점선 가이드에서 C4 관계선만 실선으로 남는다 |

    > **판정**
    >
    > - 승인 · 유저 · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 유저 선택(2026-10-10): 「C4는 가이드를 따르게」 — 질문 「C4 템플릿 6개의 관계선을 점선 가이드에서 어떻게 그릴까요?」. S5(667f238)에서 반영했고 Dash Gate·게이트 5종 초록


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-070-RCG2QV --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-070-RCG2QV --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-070-RCG2QV --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
