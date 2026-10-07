---
card: KAN-056-D3V1MB
title: viz 템플릿 13개 리터럴 색 제거 — 스타일 가이드가 기본 채움·선 색까지 칠하게
created: 2026-10-07
branch: KAN-056-D3V1MB
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-056-D3V1MB
base: a072197
status: 검토 대기
---

# KAN-056-D3V1MB 검토 요청 — viz 템플릿 13개 리터럴 색 제거 — 스타일 가이드가 기본 채움·선 색까지 칠하게

카드: [KAN-056-D3V1MB.md](../cards/KAN-056-D3V1MB.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-056-D3V1MB` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-056-D3V1MB` |
| 베이스 | `a072197` |
| 변경 훑기 | `git diff a072197...HEAD` |

**커밋 13건**

```text
f4d547f fix(visualization): KAN-056 재작업 — UML 시퀀스 머리 바탕을 canvas.bg 로, 글자 대비 게이트 추가
997e8e4 kanban: KAN-056 검토 → 진행 중 — 반려 2건(4 시퀀스 이름 대비 · 5 README 게이트 문장) 같은 카드 재작업 · reconcile 이 KAN-059 scope 캐시를 문서대로 맞춤
8c2c482 kanban: KAN-056 검토 대행 2차(kanban-reviewer) — 항목 3 승인(후속 카드 둘) · 4·5 반려(이 카드에서 고침) (ai · 검토자)
784c1c3 kanban: KAN-056 검토 대행(kanban-reviewer) — 항목 2건 승인 · 추가 의견 3건 · 항목 2건 신설 (ai · 검토자)
6a126c1 kanban: KAN-056 검토로 이동 — 검토서(판단 항목 3) · 검토 리포트
d4b9554 kanban: KAN-056 S4 완료 — 품질 게이트 5종 초록
7c362e2 kanban: KAN-056 S3 완료 — 표기 색 옮기기와 문서
d881cf0 fix(visualization): KAN-056 S3 — ArchiMate 계층색·BPMN 게이트웨이·UML 시퀀스를 토큰으로, README 알려진 한계 정리, changeset
3bd9bab kanban: KAN-056 S2 완료 — 기본값 지우기
22612f4 refactor(visualization): KAN-056 S2 — 템플릿 11개의 흰 채움·검정 선·회색 연결선 기본값을 지워 계약 스타일시트가 칠하게
82f250c kanban: KAN-056 S1 완료 — 게이트 빨강 확인
620419f test(KAN-056): S1 — 템플릿 paint 게이트(blueprint ↔ 색 반전본) 추가, 13개 템플릿에서 82곳 빨강
36e3bed kanban: KAN-056 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 27개 (+2426 −126)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-056-template-paint.md` | M | 31 | 0 |
| `.kanban/archive.jsonl` | M | 4 | 0 |
| `.kanban/log.md` | M | 4 | 4 |
| `.kanban/reviews/KAN-056-D3V1MB.events.jsonl` | M | 17 | 0 |
| `.kanban/reviews/KAN-056-D3V1MB.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 54 | 51 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 5 | 4 |
| `KANBAN/cards/KAN-056-D3V1MB.md` | M | 26 | 11 |
| `KANBAN/reviews/KAN-056-D3V1MB.review.html` | M | 1269 | 0 |
| `KANBAN/reviews/KAN-056-D3V1MB.review.md` | M | 249 | 0 |
| `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` | M | 474 | 0 |
| `apps/storybook/src/stories/visualization/_labelContrastBaseline.ts` | M | 219 | 0 |
| `packages/visualization/README.md` | M | 12 | 11 |
| `packages/visualization/src/templates/ArchiMateDiagram.tsx` | M | 11 | 6 |
| `packages/visualization/src/templates/ArchitectureDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/BPMNCollaborationDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/BPMNDiagram.tsx` | M | 3 | 4 |
| `packages/visualization/src/templates/BlockDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/C4CodeDiagram.tsx` | M | 1 | 1 |
| `packages/visualization/src/templates/KanbanBoard.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/Mindmap.tsx` | M | 1 | 2 |
| `packages/visualization/src/templates/RequirementDiagram.tsx` | M | 1 | 2 |
| `packages/visualization/src/templates/TimelineDiagram.tsx` | M | 0 | 2 |
| `packages/visualization/src/templates/UMLComponentDiagram.tsx` | M | 4 | 6 |
| `packages/visualization/src/templates/UMLDeploymentDiagram.tsx` | M | 2 | 2 |
| `packages/visualization/src/templates/UMLSequenceDiagram.tsx` | M | 8 | 10 |

**롤백 태그 4개**

```text
kan/KAN-056-D3V1MB/S1
kan/KAN-056-D3V1MB/S2
kan/KAN-056-D3V1MB/S3
kan/KAN-056-D3V1MB/S4
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-056-D3V1MB.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← TemplatePaintGate(리터럴 · 글자 대비 두 스토리)가 여기서 돈다
pnpm --filter storybook build
pnpm test:unit
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다. `pnpm test` 앞에는 Storybook 캐시 세 곳을 지운다(전략 「제약」).

### 빨강 → 초록

1. `S1` 직후: `TemplatePaintGate` 만 빨강이다. 걸린 자리 목록에 13개 템플릿 이름이 모두 나온다. 다른 스토리는 초록이다.
2. `S2` 직후: 걸린 자리가 ArchiMateDiagram·BPMNDiagram 게이트웨이·UMLSequenceDiagram 에만 남는다.
3. `S3` 직후: 전부 초록이다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 리터럴 셈 — 13개 파일에서 `bash -c 'grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" <13개 파일>'` 를 돌리면 `rgba(0,0,0,` 두 줄(KanbanBoard 열 바탕 · RequirementDiagram 머리 띠)만 남는다.
- ArchiMate 라벨 대비 — 전략의 계산을 바뀐 dist 로 다시 돌려, 30개 가이드 × 계층 3 중 4.5:1 미만이 11칸 이하인지 본다.
- 기존 교차검증 — `TemplateStyleMatrix` 의 PilotMatrix·ExpandedMatrix 와 `Headless` 가 계속 초록이다.
- 기본 가이드 모양 — S2 에서 지운 흰 채움·검정 선이 blueprint 토큰과 같은 값인지 `blueprintTechnical.tsx` 로 다시 확인하고, 바뀌는 여섯 곳이 changeset 목록과 같은지 본다.
- 글자 대비(재작업에서 더함) — `LabelContrastGate` 가 13개 × 카탈로그 가이드 30개의 글자 대비를 재서 `_labelContrastBaseline.ts`(이미 있는 미달)와 견준다. 새 미달 · 0.01 넘게 떨어진 대비 · 이제 통과해 지울 항목이 모두 0이어야 한다. 카드 전 템플릿(a072197)으로 같은 검사를 돌린 값과 견줘, 이 카드가 만든 미달을 검토서에 따로 적는다.

**실행 결과**

```text
게이트 5종 (2026-10-08 재작업 뒤, 워크트리 KAN-056-D3V1MB · 커밋 f4d547f)
pnpm typecheck                  rc=0
pnpm build                      rc=0
pnpm test                       rc=0 · Test Files 193 passed · Tests 1274 passed (TemplatePaintGate 리터럴 · 글자 대비 두 스토리 포함)
pnpm --filter storybook build   rc=0 · Storybook build completed successfully
pnpm test:unit                  rc=0 · hooks 115 · visualization 257 · foundations 101 · style-guide-catalog 76 · visualization-style-guide-catalog 39 등 전부 통과

빨강 → 초록 (첫 수행 2026-10-07)
S1 직후  TemplatePaintGate 빨강 82곳 — 13개 템플릿 전부에서 나옴 (matrix 나머지 18개는 깨끗해 회귀 가드로 묶음)
S2 직후  잔여 13곳 — ArchiMate · BPMN 게이트웨이 · UMLSequence 에만
S3 직후  0곳 · 관련 스토리 7파일 34개 초록

빨강 → 초록 (재작업 2026-10-08, 검토 항목 4)
LabelContrastGate 추가 직후  빨강 32곳 — 전부 UMLSequence 참여자 이름(16개 가이드 × 2)
머리 바탕 canvas.bg 로 바꾼 뒤  0곳 · 기준 목록 204곳과 일치(새 미달 · 더 떨어짐 · 지울 항목 모두 0)

추가 확인
리터럴 셈       13개 파일 grep → KanbanBoard.tsx:91 · RequirementDiagram.tsx:49 의 rgba(0,0,0, 두 줄만
ArchiMate 대비  4.5:1 미만 11/90 (불투명 팔레트였다면 53/90, 원래 파스텔 18/90)
시퀀스 이름 대비 후보 7개 × 가이드 30개: canvas.bg + edge.stroke 만 미달 0(최저 5.93). 지금이던 p2 + edge.stroke 16 · 카드 전 p2 + #111111 11
글자 대비 앞뒤  카드 전 템플릿(a072197) 356곳 → 지금 204곳. 179곳 해소, 53곳 새 미달 또는 하락(항목 6)
기본 가이드     blueprint shape.fill #FFFFFF · shape.stroke #111111 = 지운 기본값 · 바뀌는 여섯 곳 = changeset 목록
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-056-D3V1MB --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-056-D3V1MB --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-056-D3V1MB --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 기본 가이드에서도 모양이 바뀌는 다섯 곳을 patch 로 내도 되는가 — patch 로 두었습니다
    - **배경**
      - 템플릿 13개의 리터럴 색을 지웠고, props 와 export 는 그대로입니다. 원문: .changeset/kan-056-template-paint.md:2
      - 기본 가이드(blueprint)에서 흰 채움·검정 선은 토큰과 값이 같아 화면이 그대로입니다. 원문: packages/visualization-style-guide-catalog/src/blueprintTechnical.tsx:23
      - 그래도 다섯 곳은 기본 가이드에서도 달라집니다. 연결선 세 종류가 회색에서 검정으로, BPMN 게이트웨이 노랑이 더 진하게, BPMN 끝 이벤트 바탕과 UML 배치 노드가 흰색으로, 시퀀스 메시지 라벨이 조금 옅게 바뀝니다. 원문: .changeset/kan-056-template-paint.md:19
      - 다섯 곳 모두 이미 있는 형제 템플릿이나 파일럿 템플릿이 쓰는 색으로 맞춘 것입니다. 예를 들어 게이트웨이는 BPMN 협업 다이어그램과 같은 색이 됩니다. 원문: packages/visualization/src/templates/BPMNCollaborationDiagram.tsx:97
    - **정할 것**
      변경 등급을 patch(버그 수정)로 둘 것인가, minor(기능 변경)로 올릴 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** patch | 기본 가이드를 쓰는 앱도 다섯 곳 모양이 말없이 바뀐다 | README 가 한계로 적어 둔 동작을 고친 것으로 기록되고, changeset 본문에 다섯 곳이 적혀 있다 |
    | minor | 공개 API 변화가 없는데 버전이 오른다 | 소비 앱이 업데이트 때 변경 내역을 한 번 더 들여다보게 된다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] ArchiMate 계층 면을 팔레트 35% 농도로 칠해도 되는가 — 형제 템플릿(불투명)과 다르게 옅게 칠했습니다
    - **배경**
      - ArchiMate 는 비즈니스·애플리케이션·기술 계층을 면 색으로 가르는 표기라 색을 지울 수 없어 팔레트로 옮겼습니다. 원문: packages/visualization/src/templates/ArchiMateDiagram.tsx:53
      - 라벨 글자가 면 위에 놓이므로, 30개 스타일 가이드에서 라벨 대비가 4.5:1 미만인 칸(계층 3 × 가이드 30 = 90칸)을 셌습니다. 원문: KANBAN/cards/KAN-056-D3V1MB.md 「ArchiMate 를 옅게 칠하는 근거」
      - 지금(고정 파스텔)은 18칸, 불투명 팔레트는 53칸, 35% 농도는 11칸이 미달입니다. 워크트리에서 다시 빌드한 결과로 재계산해도 같았습니다.
      - 같은 표기의 형제 템플릿 ArchiMate 관점 다이어그램은 팔레트를 불투명으로 칠합니다. 원문: packages/visualization/src/templates/ArchiMateViewpointDiagram.tsx:107
      - 기본 가이드에서는 원래 파스텔과 비슷한 밝기로 남습니다(비즈니스 #FFF9C4 → #F7F4C5).
    - **정할 것**
      계층 면을 35% 로 칠하는 것을 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 35% 그대로 | 형제 템플릿과 칠하는 방식이 다르다 | 라벨 대비 미달이 18칸에서 11칸으로 준다 |
    | 불투명으로 바꿔 형제와 맞춘다 | 라벨 대비 미달이 53칸으로 는다 | 두 ArchiMate 템플릿이 같은 방식으로 칠해진다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 범위 밖 발견 둘을 후속 카드로 만들 것인가 — 이 카드에서는 고치지 않았습니다
    - **배경**
      - 팔레트를 불투명으로 칠한 면 위에 라벨이 놓이는 템플릿이 따로 있습니다(ArchiMate 관점 다이어그램, Mindmap). 위 계산처럼 가이드에 따라 대비가 4.5:1 아래로 떨어질 수 있습니다. 리터럴 문제가 아니라서 이 카드 범위 밖입니다. 원문: packages/visualization/src/templates/Mindmap.tsx:35
      - 두 템플릿의 대비는 직접 세지 않았습니다(확인 안 함).
      - README 는 SVG 속성 안의 var() 가 무효라고 적지만, chromium 에서는 rect·text·line 모두 정상으로 풀렸습니다. Firefox·Safari 는 확인 안 함입니다. 원문: packages/visualization/README.md:145
    - **정할 것**
      두 발견을 어떻게 남길 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 대비 문제만 백로그 카드로 | README 문장은 당분간 틀린 채 남는다 | 대비를 실제로 세고 고칠지를 따로 정할 자리가 생긴다 |
    | 둘 다 백로그 카드로 | README 정정을 위해 다른 브라우저 확인이 필요하다 | 문서와 실제 동작이 맞춰진다 |
    | 둘 다 기록만 하고 카드는 안 만든다 | 발견이 이 검토서에만 남는다 | 다음에 같은 문제를 다시 찾아야 할 수 있다 |

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
     `review-judge --card KAN-056-D3V1MB --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-056-D3V1MB --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-056-D3V1MB --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
