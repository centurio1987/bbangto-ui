---
card: KAN-056-D3V1MB
batch: 1
created: 2026-10-07
branch: KAN-056-D3V1MB
status: 계획
steps: S1, S2, S3, S4
---

# KAN-056-D3V1MB 배치1 — 템플릿 13개가 스타일 가이드 색을 따르게

카드: [KAN-056-D3V1MB.md](../cards/KAN-056-D3V1MB.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치이자 마지막 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S1` 테스트 먼저

- `apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx` 를 새로 만든다.
- 가이드 둘: A 는 `blueprintTechnical01VizStyleGuide.foundations`, B 는 A 의 색 문자열을 전부 반전한 것(채널마다 255−값, 알파 유지). tokens 의 `parseColor` 로 읽고, 색이 아닌 값(글꼴·숫자)은 그대로 둔다. 두 가이드 모두 wrapperComponents 없이 만든다.
- 템플릿마다 A·B 두 칸을 그리고, `<defs>` 밖 rect·circle·ellipse·path·line·polyline·polygon·text 를 문서 순서대로 짝짓는다. 짝마다 computed fill·stroke 를 견줘 같으면 `템플릿 <태그> fill=값` 으로 모은다. `none` 과 반투명 검정은 뺀다.
- 실패 메시지가 걸린 자리 목록 전체를 보여 주도록 `expect(violations).toEqual([])` 로 단언한다.
- fixture: architecture·block-diagram·kanban-board·mindmap·uml-component·bpmn 은 `MATRIX_FIXTURES` 에서 가져오고, ArchiMate·BPMNCollaboration·C4Code·Requirement·Timeline·UMLDeployment·UMLSequence 는 새로 쓴다(G1~G4 스토리의 검증된 데이터를 줄여 복사).
- 나머지 matrix fixture 18개를 같은 게이트로 한 번 돌려 본다. 깨끗하면 목록에 더하고, 걸리면 빼고 수행 내역에 걸린 자리를 적는다.

**완료 기준**: `pnpm test` 에서 새 스토리만 빨강이고, 걸린 자리 목록에 13개 템플릿 이름이 모두 나온다.

### WP2 · `S2` 기본값 지우기

- 흰 채움·검정 선 기본값(`?? '#FFFFFF'` · `?? '#111111'` · `fill="#FFFFFF"` · `stroke="#111111"`)을 지운다: ArchitectureDiagram · BlockDiagram · KanbanBoard 카드 · TimelineDiagram · UMLComponentDiagram 상자 · UMLDeploymentDiagram · BPMNCollaborationDiagram(이벤트 원·태스크) · BPMNDiagram 태스크 · Mindmap 노드 선.
- 날 SVG 요소(BPMNDiagram 이벤트 원, RequirementDiagram 바깥 사각형)는 `data-viz-part="shape"` 를 달고 style 의 fill 을 뺀다. BPMNDiagram 끝 이벤트의 `#FFCCBC` 도 여기서 함께 없어진다.
- 회색 연결선 `stroke="#555555"` 를 지운다: C4CodeDiagram · Mindmap · RequirementDiagram.
- UMLComponentDiagram 의 Lollipop·Socket 기본값을 `vvar('edge','stroke')` 로 바꾸고 `typeof stroke === 'string' ? … : '#111111'` 삼항을 지운다.

**완료 기준**: `pnpm typecheck` 초록 · `pnpm build` 뒤 새 스토리에서 걸린 자리가 ArchiMateDiagram · BPMNDiagram 게이트웨이 · UMLSequenceDiagram 에만 남는다.

### WP3 · `S3` 표기 색 옮기기와 문서

- ArchiMateDiagram: `LAYER_FILL` 을 팔레트 키(business p4 · application p5 · technology p6)로 바꾸고, 기본 채움일 때만 `Node` 에 `style={{ fillOpacity: 0.35 }}` 를 준다. `stroke="#111111"` 은 지운다.
- BPMNDiagram 게이트웨이: `fill: vvar('palette','p4')` + `data-viz-part="shape"`(BPMNCollaborationDiagram 과 같게).
- UMLSequenceDiagram: 머리 테두리·글자 기본값을 `vvar('edge','stroke')` 로, 죽은 대체값 `#E8EDF4` 를 지우고 머리 사각형 paint 를 style 로 옮긴다. 메시지 라벨 `#333333` 은 `vvar('boundary','labelColor')`.
- `packages/visualization/README.md`: 「알려진 한계」의 13개 항목을 지운다. 항목이 하나도 안 남으면 절 제목도 지우고, 138행 「(예외는 아래 「알려진 한계」)」 안내를 고친다. 반투명 검정 음영이 계약 밖이라는 설명은 구조 절에 한 줄로 남긴다.
- `.changeset/kan-056-template-paint.md`(visualization patch): 무엇이 바뀌었는지와 기본 가이드에서 눈에 띄게 바뀌는 다섯 곳(카드 전략 「바뀌는 모습」).

**완료 기준**: 새 스토리 초록 · 13개 파일 리터럴 grep 이 `rgba(0,0,0,` 두 줄만 낸다 · README 에 13개 항목이 없다.

### WP4 · `S4` 품질 게이트와 검토 준비

- 게이트 5종을 CLAUDE.md 순서대로 돌린다. `pnpm test` 앞에 Storybook 캐시 세 곳을 지운다.
- ArchiMate 라벨 대비를 바뀐 dist 로 다시 계산한다(11/90 이하).
- 검토서를 뜬다. 판단 항목 후보: 기본 가이드에서 바뀌는 다섯 곳을 patch 로 내는 것, ArchiMate 를 불투명 대신 35% 로 칠한 것, 범위 밖 발견(팔레트 불투명 면 위 라벨 대비, README:141 의 attribute `var()` 문장).

**완료 기준**: 5종 초록, 검토서 정본이 선다.

## 2. 의존과 순서

`S1 → S2 → S3 → S4` 순차다. S2·S3 의 완료 기준이 S1 의 게이트 결과로 재어진다. S2 와 S3 는 파일이 겹치지 않아(S3 는 ArchiMate·BPMNDiagram 게이트웨이·UMLSequence·README·changeset) 순서를 바꿔도 되지만, 기계적인 것을 먼저 끝내 S3 의 판단할 거리만 남기려고 이 순서로 둔다.

배치 밖 의존: `dep-check` 기준 다른 미완료 루트와 겹치는 것은 KAN-055 의 `.changeset/*.md` 하나다. KAN-056 은 자기 changeset 파일 하나만 더하고, KAN-055(배포)가 돌 때 그것이 함께 소비될 뿐이라 어느 쪽이 먼저 끝나도 깨지지 않는다. KAN-057 은 실행 문서가 없어 판정할 수 없다(같은 visualization 패키지지만 고칠 곳은 edge 토큰이다).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 게이트가 템플릿 몫이 아닌 색을 잡는다 | 걸린 자리에 Canvas 바탕·마커처럼 원자가 그리는 요소가 나온다 | `<defs>` 는 이미 뺐다. 원자가 리터럴을 내면 그것도 가이드를 안 따르는 색이라 기록하고, 13개 밖이면 범위 밖 발견으로 남긴다 |
| paint 를 아예 안 준 요소가 검정으로 떨어져 걸린다 | 걸린 값이 `rgb(0, 0, 0)` | 13개 안이면 같은 규칙(계약 또는 vvar)으로 고친다. 13개 밖이면 범위 밖 발견으로 남긴다 |
| 고친 dist 가 테스트에 안 보인다 | play 가 옛 결과로 통과·실패 | `pnpm build` 뒤 캐시 세 곳 삭제(메모리 core-export-vite-cache) |
| 기본 가이드 모양 변화가 기존 스토리 단언을 깬다 | G1~G4 스토리 play 가 빨강 | 리터럴 색을 단언하는 visualization 스토리는 `Headless`·`Atoms` 뿐이고 둘 다 이 13개를 안 그린다(2026-10-07 grep). 깨지면 원인을 보고 범위를 다시 정한다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-056-D3V1MB/S<n>` 태그를 단다.

## 4. 착수 시점 판단

**배치는 하나다.** work 넷이 기본값(3~4) 안이다. S2 는 11개 파일의 한두 줄씩이고 S3 은 파일 다섯이라 대화 맥락을 많이 안 쓴다. 가장 무거운 것은 S1 의 fixture 7개와 S4 의 게이트 실행 시간이다.

**수행 관점: 미정(유저 선택 대기).**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 순차라 게이트 시간이 그대로 든다. 대신 viz dist·Storybook 캐시·chromium 테스트 순서가 꼬일 일이 없다 |
| 오케스트레이션 | 1 | 최대 2(S1 의 fixture 7개 저작 ‖ S2 의 기본값 지우기) | S2 는 파일마다 한두 줄이라 나눠 맡길 이득이 작다. S2 의 완료 기준이 S1 게이트로 재어지므로 둘을 겹쳐 돌려도 확인은 S1 뒤로 밀린다. 게이트는 한 체크아웃의 dist·캐시를 함께 써서 어차피 한 줄로 세워야 한다 |
