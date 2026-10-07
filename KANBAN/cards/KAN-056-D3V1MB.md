---
card: KAN-056-D3V1MB
title: viz 템플릿 13개 리터럴 색 제거 — 스타일 가이드가 기본 채움·선 색까지 칠하게
created: 2026-10-07
scope: packages/visualization/src/templates/ArchitectureDiagram.tsx, packages/visualization/src/templates/ArchiMateDiagram.tsx, packages/visualization/src/templates/BlockDiagram.tsx, packages/visualization/src/templates/BPMNDiagram.tsx, packages/visualization/src/templates/BPMNCollaborationDiagram.tsx, packages/visualization/src/templates/C4CodeDiagram.tsx, packages/visualization/src/templates/KanbanBoard.tsx, packages/visualization/src/templates/Mindmap.tsx, packages/visualization/src/templates/RequirementDiagram.tsx, packages/visualization/src/templates/TimelineDiagram.tsx, packages/visualization/src/templates/UMLComponentDiagram.tsx, packages/visualization/src/templates/UMLDeploymentDiagram.tsx, packages/visualization/src/templates/UMLSequenceDiagram.tsx, apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx, apps/storybook/src/stories/visualization/_labelContrastBaseline.ts, packages/visualization/README.md, .changeset/kan-056-*.md
---

# KAN-056-D3V1MB — viz 템플릿 13개 리터럴 색 제거 — 스타일 가이드가 기본 채움·선 색까지 칠하게

## 전략
### 문제

visualization 템플릿 13개가 기본 채움·선 색을 리터럴로 넣는다. `Node` 의 `fill`·`stroke` 에 넘긴 값은 인라인 style 로 렌더돼 계약 스타일시트(`packages/visualization/src/provider/contractCss.ts`)를 이긴다. 그래서 스타일 가이드를 바꿔도 그 부분 색은 그대로다. `packages/visualization/README.md:190` 「알려진 한계」에 적힌 그대로이고, 구 PLAN 「이연」의 「파일럿(Flowchart·SequenceDiagram·C4Container) 외 템플릿 리터럴 paint 제거」가 남은 것이다(`git show 9799843^:packages/visualization/PLAN.md` 35행).

2026-10-07 main 에서 다시 셌다. 13개 파일에 색 리터럴이 있는 줄이 35줄이고, 그중 2줄(KanbanBoard 열 바탕 `rgba(0,0,0,0.02)`, RequirementDiagram 머리 띠 `rgba(0,0,0,0.06)`)은 반투명 검정 틴트라 README 셈 기준에서 빠진다. 고칠 것은 불투명 색 33줄이다. 13개 밖에서는 `atoms/` 의 Node·IsoPrism·Lane 과 `IsometricScene` 에만 리터럴이 있고 전부 반투명 검정 음영이다.

### 접근 — 바꾸는 규칙 넷

1. **흰 채움·검정 선 기본값은 지운다.** `Node` 는 prop 을 안 넘기면 계약 스타일시트가 `shape.fill`·`shape.stroke` 로 칠한다(`atoms/Node.tsx:36`). 날 SVG 요소는 `data-viz-part="shape"` 를 달고 style 에서 fill 을 뺀다. blueprint 에서는 `shape.fill` 이 `#FFFFFF`, `shape.stroke` 가 `#111111` 이라 기본 화면은 지금과 같다(`visualization-style-guide-catalog/src/blueprintTechnical.tsx:23·47-49`, `Headless.stories.tsx:52` 가 이미 단언한다).
2. **회색 연결선 `#555555` 는 지운다.** 연결선은 `edge.stroke` 를 따른다. README 「paint 채널을 늘리지 않는다」에 따라 연결선 색 채널은 edge 하나다.
3. **표기에 뜻이 있는 면 색은 팔레트로 옮긴다.** 형제 템플릿이 이미 고른 토큰을 따른다. BPMN 게이트웨이는 `palette.p4`(`BPMNCollaborationDiagram.tsx:97` 선례), UMLSequence 머리 테두리·글자는 `edge.stroke`, 머리 바탕은 `canvas.bg`(파일럿 `atoms/Lifeline.tsx:30·39` 와 같은 짝. 글자색만 옮기고 바탕을 팔레트로 두면 가이드에 따라 이름이 바탕에 묻힌다 — 검토 항목 4), 메시지 라벨은 `boundary.labelColor`(파일럿 `SequenceDiagram.tsx:193`)다. ArchiMate 계층색은 business→p4 · application→p5 · technology→p6 에 fill-opacity 0.35 를 준다(아래 근거).
4. **표기에 뜻이 없는 장식 틴트는 기본 도형색으로 합친다.** BPMN 끝 이벤트 `#FFCCBC` 는 협업 다이어그램이 이미 흰색이고 끝 이벤트는 3px 테두리로 구분한다. UML 배치 노드 `#E8EDF4` 도 여기에 든다.

| 템플릿 | 지금 | 바꾼 뒤 |
|---|---|---|
| ArchitectureDiagram:119-120 · BlockDiagram:90-91 · KanbanBoard:104-105 | `?? '#FFFFFF'` · `?? '#111111'` | 기본값 지움(규칙 1) |
| TimelineDiagram:110-111 · UMLComponentDiagram:166-167 | `fill="#FFFFFF"` · `stroke="#111111"` | 지움(규칙 1) |
| UMLComponentDiagram:54·88·177·186 | Lollipop·Socket 기본 `'#111111'`, 삼항 대체값 | 호출부가 늘 `edge.stroke` 를 넘긴다. 기본값을 `vvar('edge','stroke')` 로, 삼항은 지움 |
| UMLDeploymentDiagram:116-117 | `?? '#E8EDF4'` · `?? '#111111'` | 지움(규칙 1·4) |
| BPMNCollaborationDiagram:75·166 | 이벤트 원 `fill: '#FFFFFF'` · 태스크 `?? '#FFFFFF'` | 지움(규칙 1) |
| BPMNDiagram:78·221 | 이벤트 `#FFCCBC`/`#FFFFFF` · 태스크 `?? '#FFFFFF'` | 원에 `data-viz-part="shape"`, fill 지움(규칙 1·4) |
| BPMNDiagram:126 | 게이트웨이 `#FFF9C4` | `vvar('palette','p4')` + `data-viz-part="shape"`(규칙 3) |
| C4CodeDiagram:112 · Mindmap:119 · RequirementDiagram:164 | Edge `stroke="#555555"` | 지움(규칙 2) |
| Mindmap:99 | `?? '#111111'` | 지움(규칙 1) |
| RequirementDiagram:61 | 바깥 사각형 `fill: '#FFFFFF'` | `data-viz-part="shape"`, fill 지움(규칙 1) |
| ArchiMateDiagram:51-53·129 | 계층 파스텔 셋 · `stroke="#111111"` | 팔레트 35% · stroke 지움(규칙 3·1) |
| UMLSequenceDiagram:51·61·161 | 머리 `#111111` · 머리 바탕 `palette.p2` · 죽은 대체값 `#E8EDF4` · 라벨 `#333333` | `edge.stroke` · `canvas.bg`(검토 항목 4) · 지움 · `boundary.labelColor`(규칙 3) |

### ArchiMate 를 옅게 칠하는 근거

30개 스타일 가이드에서 라벨 글자색과 면 색의 대비가 4.5:1 미만인 칸을 셌다. 라벨 글자색은 `NodeLabel` 기본값인 `edge.stroke` 다(`atoms/NodeLabel.tsx:51`). 계층 3 × 가이드 30 = 90칸이고, main dist(2026-10-07 15:33 빌드)와 tokens 의 `contrastRatio` 로 계산했다.

| 안 | 4.5 미만 |
|---|---|
| 지금(리터럴 파스텔) | 18/90 |
| 팔레트 불투명(`ArchiMateViewpointDiagram.tsx:107` 선례) | 53/90 |
| **팔레트 35%**(README 「면을 갈라야 하는 유형은 palette 인라인 fill + fill-opacity 상수」) | **11/90** |

라벨이 바탕 위에 바로 놓일 때는 30개 모두 4.5 이상이다. 0.35 는 blueprint 에서 원래 파스텔과 밝기가 비슷하게 남는 값이다(흰 바탕 위 p4 35% ≈ `#F7F4C5` ↔ 원래 `#FFF9C4`, p5 ≈ `#E0EBF5` ↔ `#DBEAFE`, p6 ≈ `#D5E6DC` ↔ `#DCFCE7`).

`Node` 에는 fillOpacity prop 이 없다. `Node` 의 `style` 은 바깥 `<g>` 에 붙고 fill-opacity 는 상속되므로 `style={{ fillOpacity: 0.35 }}` 로 준다. 사용자가 `e.fill` 을 주면 불투명 그대로 둔다(명시한 prop 이 이긴다). 관계선은 요소 다음에 그려지므로(`ArchiMateDiagram.tsx:145`) 반투명 면 아래로 비치지 않는다.

### 테스트 — 스타일 가이드를 바꾸면 그 색도 바뀌는가를 직접 잰다

기존 교차검증(`TemplateStyleMatrix.stories.tsx` 의 ExpandedMatrix)은 가이드 둘 이상에서 지문이 다르면 통과한다. 리터럴이 일부 남아도 다른 부분이 바뀌면 통과라 이 카드의 목표를 못 잰다.

새 스토리 `TemplatePaintGate.stories.tsx` 는 같은 데이터를 두 가이드에서 그린다. A 는 blueprint foundation 이고 B 는 A 의 색을 전부 반전(채널마다 255−값, 알파 유지)한 것이다. 반전한 색은 원래 색과 같을 수 없으므로, 두 화면의 같은 자리 요소가 같은 불투명 fill·stroke 를 내면 그것이 가이드를 안 따르는 색이다.

- 짝짓는 요소: `<defs>` 밖의 rect·circle·ellipse·path·line·polyline·polygon·text. 두 화면의 요소 수가 같은지도 본다.
- 빼는 것: `none`, 반투명 검정(알파 1 미만이거나 fill-opacity 1 미만인 검정). README 셈 기준과 같다.
- 두 가이드에는 wrapperComponents 를 넣지 않는다. 모티프가 그리는 색은 템플릿 몫이 아니다.
- fixture: 13개 중 6개(architecture·block-diagram·kanban-board·mindmap·uml-component·bpmn)는 `_matrixFixtures.tsx` 를 그대로 가져다 쓰고, 7개(ArchiMate·BPMNCollaboration·C4Code·Requirement·Timeline·UMLDeployment·UMLSequence)는 새 스토리 안에 둔다. fill·stroke 를 명시한 fixture 는 없다.
- 나머지 matrix fixture 18개도 S1 에서 같은 게이트로 한 번 재 본다. 깨끗하면 회귀 가드로 함께 묶는다. 걸리면 이 카드에서 고치지 않고 수행 내역과 검토서에 범위 밖 발견으로 남긴다.

### 바뀌는 모습 (changeset 에 적는다)

기본 가이드(blueprint)에서 눈에 띄게 바뀌는 곳은 여섯이다. 나머지 흰 채움·검정 선은 blueprint 토큰과 값이 같아 그대로다. 다른 가이드에서는 13개 템플릿의 이 부분이 이제 그 가이드 색을 따른다.

- C4Code·Mindmap·Requirement 연결선: `#555555` → `#111111`(edge.stroke)
- BPMN 게이트웨이: `#FFF9C4` → `#E7E058`(p4, 협업 다이어그램과 같은 색)
- BPMN 끝 이벤트: `#FFCCBC` → `#FFFFFF`(3px 테두리는 그대로)
- UML 배치 노드: `#E8EDF4` → `#FFFFFF`
- UML 시퀀스 메시지 라벨: `#333333` → `#555555`(boundary.labelColor)
- UML 시퀀스 참여자 머리 바탕: `#C5B6EE`(p2) → `#F9F8F6`(canvas.bg). 이름 글자와 짝을 맞추려고 재작업에서 바꿨다(검토 항목 4)

ArchiMate 계층 면은 위 표처럼 비슷한 밝기로 남는다.

변경 등급은 patch 로 둔다. props 와 export 는 그대로이고, README 가 한계로 적어 둔 동작을 고치는 것이다. 다만 기본 가이드에서도 여섯 곳 모양이 바뀌므로 검토서 판단 항목에 올린다.

### 범위 밖

- 반투명 검정 음영·틴트(Node cube 면, IsoPrism, IsometricScene 바닥 그림자, Lane, KanbanBoard 열 바탕, RequirementDiagram 머리 띠). README 셈 기준대로 어떤 가이드 위에서도 같은 명암을 내는 장치다.
- ArchiMateViewpointDiagram·Mindmap 처럼 팔레트를 불투명으로 칠한 면 위의 라벨 대비. 리터럴 문제가 아니다. 위 대비 계산이 같은 종류의 문제를 보여 주므로 검토서에 발견으로만 남긴다.
- SVG presentation attribute 안의 `var()`. README:141 은 무효라고 적지만, chromium(playwright 1.61)에서는 rect fill·stroke, text fill, line stroke 모두 풀렸다(2026-10-07 직접 확인. Firefox·Safari 는 확인 안 함). 이 카드에서 손대는 줄만 style 로 옮기고 README 문장은 그대로 둔다.
- KAN-057(edge.dashPattern 토큰). 같은 패키지지만 고치는 파일이 다르다.

### 제약

- Storybook 은 워크스페이스 패키지를 dist 로 읽는다(`apps/storybook/.storybook/main.ts:16`). 템플릿을 고친 뒤에는 `pnpm build` 를 하고 Storybook 캐시 세 곳(`node_modules/.cache/storybook` · `apps/storybook/node_modules/.cache` · `apps/storybook/node_modules/.vite`)을 지운 다음 `pnpm test` 를 돌린다.
- 새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다).

## 실행 계획
- [x] `S1` 테스트 먼저 — `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` 를 새로 만든다. blueprint foundation 과 그 색 반전본, 두 가이드에서 같은 데이터를 그려 같은 자리 요소의 불투명 fill·stroke 가 같은 곳을 모은다. fixture 13개(6개는 `_matrixFixtures.tsx` 재사용, 7개는 새로). 나머지 matrix fixture 18개도 한 번 재 보고, 깨끗하면 함께 묶는다. 완료 기준: 새 스토리가 빨강이고, 걸린 자리가 13개 템플릿 모두에서 하나 이상 나온다. 다른 스토리는 초록이다
- [x] `S2` 기본값 지우기 — 흰 채움·검정 선·회색 연결선 기본값을 지운다(전략 규칙 1·2·4). 대상: ArchitectureDiagram·BlockDiagram·KanbanBoard·TimelineDiagram·UMLComponentDiagram·UMLDeploymentDiagram·BPMNCollaborationDiagram·C4CodeDiagram·Mindmap·RequirementDiagram, 그리고 BPMNDiagram 의 태스크·이벤트. 완료 기준: `pnpm typecheck` 초록 · 새 스토리에서 걸린 자리가 ArchiMateDiagram·BPMNDiagram 게이트웨이·UMLSequenceDiagram 에만 남는다
- [x] `S3` 표기 색 옮기기와 문서 — ArchiMate 계층색(팔레트 35%), BPMNDiagram 게이트웨이(p4), UMLSequenceDiagram 머리·메시지 라벨(전략 규칙 3). README 「알려진 한계」의 13개 항목과 138행의 예외 안내를 고치고, `.changeset/kan-056-template-paint.md`(visualization patch)를 쓴다. 완료 기준: 새 스토리 초록 · 13개 파일에서 불투명 색 리터럴 grep 0건 · README 에 13개 항목이 없다
- [x] `S4` 품질 게이트와 검토 준비 — 게이트 5종을 CLAUDE.md 순서대로 돌리고 검토서를 뜬다. 완료 기준: 5종 초록, 검토서 정본이 선다

## 검증
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

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-07T18:09 · s:d6ba577d — `전략` 섹션 교체
- 2026-10-07T18:09 · s:d6ba577d — `실행 계획` 섹션 교체
- 2026-10-07T18:09 · s:d6ba577d — `검증` 섹션 교체
- 2026-10-07T19:33 · s:d6ba577d · S1 doing — 착수
- 2026-10-07T19:37 · s:d6ba577d · S1 done — TemplatePaintGate 스토리 추가. 빨강 82곳이 13개 템플릿 전부에서 나옴. matrix 나머지 18개는 <line> fill 오탐(20건)을 빼면 깨끗해 회귀 가드로 묶음
- 2026-10-07T19:37 · s:d6ba577d · S2 doing — 착수
- 2026-10-07T19:37 · s:d6ba577d · S2 done — 11개 파일 23곳 수정(기본값 지움, BPMN 이벤트 원·Requirement 바깥 사각형에 data-viz-part). typecheck 초록, 게이트 잔여는 ArchiMate·BPMN 게이트웨이·UMLSequence 13곳
- 2026-10-07T19:38 · s:d6ba577d · S3 doing — 착수
- 2026-10-07T19:39 · s:d6ba577d · S3 done — ArchiMate 팔레트 p4/p5/p6 35%, BPMN 게이트웨이 p4, UMLSequence edge.stroke·boundary.labelColor. 게이트·관련 스토리 7파일 34개 초록, 13개 파일 리터럴은 rgba(0,0,0, 두 줄만 남음. README 알려진 한계 절 삭제·구조 절에 예외 명시, changeset patch
- 2026-10-07T19:40 · s:d6ba577d · S4 doing — 착수
- 2026-10-07T19:41 · s:d6ba577d · S4 done — 게이트 5종 초록 — typecheck·build·test(193파일 1273개)·storybook build·test:unit. ArchiMate 대비 재계산 11/90, 13개 파일 리터럴은 rgba(0,0,0, 두 줄만
- 2026-10-07T19:41 · s:d6ba577d — S1 게이트에서 <line> 요소의 fill(initial 검정)이 오탐으로 걸려 비교에서 뺐다. 선은 안쪽 면이 없어 fill 이 그려지지 않는다
- 2026-10-08T00:24 · s:d6ba577d — 검토 반려 2건으로 같은 카드 재작업(2026-10-08, 검토자 2차 판정 · 유저가 3·4·5 판정을 검토자에게 위임). 항목 4: UML 시퀀스 참여자 이름 글자색을 edge.stroke 로 바꾼 탓에 머리 바탕(불투명 p2)과 대비가 무너짐(synthwave 는 두 색이 같음) — 30개 가이드 대비를 재서 고친다. 항목 5: README 의 Paint Gate 문장을 게이트에 표본이 있는 템플릿으로 좁힌다. 항목 3 승인에 따라 후속 백로그 카드 둘(불투명 팔레트 면 위 라벨 대비 · SVG 속성 안 var() 브라우저 확인)을 main 에 만든다.
- 2026-10-08T00:36 · s:d6ba577d — `전략` 섹션 교체
- 2026-10-08T00:36 · s:d6ba577d — `검증` 섹션 교체
- 2026-10-08T00:37 · s:d6ba577d — 재작업 done — 항목 4: UMLSequence 머리 바탕 palette.p2 → canvas.bg(파일럿 Lifeline 과 같은 짝). 후보 7개를 30개 가이드로 재서 고름(캔버스 바탕 + edge.stroke 만 미달 0, 최저 5.93). 테스트 먼저: TemplatePaintGate 에 LabelContrastGate(13개 × 가이드 30개 글자 대비, _labelContrastBaseline.ts 와 대조)를 더해 시퀀스 이름 32곳 빨강 → 수정 뒤 초록. 같은 문제 전수: 카드 전 템플릿(a072197)으로 같은 검사를 돌려 견줌 — 미달 356 → 236(→ 수정 뒤 204), 이 카드가 새로 만들거나 더 떨어뜨린 곳은 시퀀스 이름 말고 53곳(Requirement 36 · ArchiMate 8 · Kanban 4 · BPMN 3 · BPMN 협업 2, 최저 2.29). 원인은 원래 있던 반투명 글자·띠와 가이드 shape.fill 쌍이라 기준 목록에 넣고 검토 항목으로 올림. 항목 5: README Paint Gate 문장을 표본이 있는 템플릿으로 좁히고, 글자색 토큰을 바탕 토큰과 짝지어 재라는 규칙을 공통 계약에 더함. changeset 여섯 곳으로. scope 에 기준 목록 파일 추가 → KAN-055 겹침 용인 AI 재기록. 게이트 5종 초록 — typecheck · build · test(193파일 1274개) · storybook build · test:unit
