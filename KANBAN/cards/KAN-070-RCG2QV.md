---
card: KAN-070-RCG2QV
title: viz 연결선 대시 범위 — 어느 선이 스타일 가이드 대시를 따르는가 (Edge 밖 관계선 넷 · 실선이 뜻을 갖는 Edge 선)
created: 2026-10-10
scope: packages/visualization/src/templates/*.tsx, packages/visualization/src/patterns/TimelineRoadmap.tsx, packages/visualization/src/provider/contractCss.ts, packages/visualization/README.md, packages/visualization/style-classification.md, packages/tokens/src/visualization.ts, apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx, .changeset/kan-070-connector-dash-scope.md
---

# KAN-070-RCG2QV — viz 연결선 대시 범위 — 어느 선이 스타일 가이드 대시를 따르는가 (Edge 밖 관계선 넷 · 실선이 뜻을 갖는 Edge 선)

## 전략
**가르는 기준을 두 층으로 둔다.** 템플릿 층에서는 유형 메타데이터의 `standard` 태그(UML·BPMN·C4 같은 표준 표기법 유래, `packages/visualization/src/typeMeta/types.ts:138`)가 붙은 템플릿의 연결선 전부가 가이드 대시를 끈다. 선 층에서는 한 그림 안에 대시 선과 나란히 놓여 실선이 뜻을 갖는 선, 그리고 축이 가이드 대시를 끈다. 나머지 관계선은 Edge 를 쓰든 안 쓰든 가이드 대시를 따른다.

착수 전 확인한 사실(2026-10-10, main `0a81094` 기준):

- 계약 스타일시트(스타일 가이드 값을 그림에 묶는 공통 CSS)는 `[data-bbangto-viz-style-guide] [data-viz-part="connector"]` 에만 `stroke-dasharray: var(--bbangto-viz-edge-dash-pattern)` 을 건다. 그 훅은 `Edge` 가 내는 선에만 붙는다. 원문: `packages/visualization/src/provider/contractCss.ts:22` · `packages/visualization/src/atoms/Edge.tsx:117`
- 카탈로그 가이드 30개와 base foundation 은 모두 `edge.dashPattern: ''`(실선)이다(KAN-057 확인). 그래서 이 카드도 지금 있는 그림은 바꾸지 않는다. 대시 가이드가 처음 생길 때 어느 선이 따라가는지를 정해 두는 일이다.
- `Edge` 를 쓰는 파일 38개 중 23개가 `standard` 태그 템플릿이다(Activity·ArchiMate·ArchiMateViewpoint·BPMN·BPMNCollaboration·C4 여섯·Class·DMN·ER·Requirement·Sequence·State·SysMLBlock·UMLComponent·UMLDeployment·UMLPackage·UMLSequence·UseCase). 이 중 대시 값을 따로 안 넘기는 선은 표기법상 실선이다. BPMN 시퀀스 흐름이 대시 가이드를 따르면 메시지 흐름처럼 보이고, UML 연관이 따르면 의존처럼 보인다. 템플릿 안에 대시 선이 없는 경우(BPMNDiagram·StateDiagram 등)도 마찬가지라서 선 단위가 아니라 템플릿 단위로 끈다.
- 표준 템플릿은 모두 `Canvas` 를 두 번(children 모드·data 모드) 그리고, `Canvas` 는 남는 속성을 `<svg>` 로 넘긴다. 그래서 `Canvas` 에 내부 훅 `data-viz-notation` 을 달고, 계약 스타일시트에 `[data-bbangto-viz-style-guide] [data-viz-notation] [data-viz-part="connector"] { stroke-dasharray: none; }` 를 더한다. 선택자가 하나 더 구체적이라 가이드 대시를 이기고, 템플릿이 넘긴 인라인 대시(`'5 3'` 등)에는 진다. ArchiMate 변형 셋은 `ArchiMateDiagram.tsx` 안에, ZenUMLDiagram 은 `SequenceDiagram` 을 감싸므로 따로 손대지 않는다. 연결선이 없는 PacketDiagram 에도 같은 훅을 단다 — 「`standard` 태그 = 훅」을 예외 없이 두어야 게이트가 레지스트리만 보고 검사할 수 있다.
- 비표준 템플릿 중 Flowchart 는 데이터가 선마다 `dashed` 를 고른다(`templates/Flowchart.tsx:127`). 대시 선이 하나라도 있으면 나머지 실선이 대비로 뜻을 가지므로 `'none'` 을 넘기고, 없으면 지금처럼 가이드를 따른다.
- TimelineRoadmap 의 시간 축은 `Edge` 로 그린 축이다(`patterns/TimelineRoadmap.tsx:52`). 구조선이라 `strokeDasharray="none"` 을 넘긴다.
- Edge 없이 관계선을 그리는 셋 — SitemapTree·WorkBreakdownStructure 의 트리 가지(`templates/SitemapTree.tsx:71` · `templates/WorkBreakdownStructure.tsx:80`)와 IsometricScene 의 입체 연결선(`templates/IsometricScene.tsx:186`) — 에 `data-viz-part="connector"` 를 단다. 셋 다 이미 엣지 칠 훅(`data-bbangto-viz-edge`)이 있어 색·두께는 가이드를 따르고 대시만 빠져 있었다.

카드 메모의 목록과 다르게 분류한 것 둘(조사로 바뀜):

- **GitGraph**(`templates/GitGraph.tsx:92`)는 「못 따르는 선」에서 뺀다. 부모 선은 엣지 색이 아니라 브랜치 색(`branchColor`)으로 칠하는 계열선이고, 병합 선은 `'4 3'` 을 직접 넘긴다. 차트의 계열선처럼 가이드 연결선이 아니므로 그대로 둔다.
- **StepConnector**(`molecules/StepConnector.tsx:23`)는 「따르면 안 되는 선」에서 뺀다. `variant='dashed'` 를 고를 수 있지만 이 저장소에서 쓰는 곳은 ProcessSteps 하나이고 늘 기본(`arrow`)이다. 단계 사이 화살표는 관계선이라 가이드를 따르는 쪽이 목표(「관계선은 템플릿과 상관없이 같은 모양」)에 맞다. 소비자가 두 변형을 섞어 대시 가이드에 올리면 구분이 흐려지는데, 이것은 README 에 적는다.

나머지 Edge 밖 선은 관계선이 아니라서 손대지 않는다. 축·눈금(Axis·RadarChart 바퀴살·RadialGauge 눈금·Boxplot 수염·DotPlot 범위), 뼈대(Fishbone 척추·뼈), 도형 일부(DataFlowDiagram 저장소 선·ActorGlyph 팔다리·UML 소켓), 구분선(UserJourneyMap 단계선·PosterEditorial 괘선), 핀 꼬리(GeoMap)다. 훑은 범위는 `src/{atoms,molecules,patterns,templates}/*.tsx` 의 `<line>`·`<polyline>`·`<path>` 전부(Edge.tsx 제외)다.

**게이트를 둔다.** 새 스토리 `VISUALIZATION/Templates/Dash Gate` 가 Paint Gate 표본(`_paintGateFixtures.tsx`, 내보내는 템플릿마다 하나, 커버리지는 `test:unit` 이 강제)을 대시 가이드(`edge.dashPattern: '7 3'`) 아래 그린다. 레지스트리에서 `standard` 태그 템플릿 이름을 읽어, 그 템플릿에는 훅이 있고 가이드 대시로 그려진 연결선이 0개인지 본다. 새 표준 템플릿이 훅을 빠뜨리면 여기서 실패한다. 관계선 템플릿 목록은 스토리에 적고, 그 템플릿마다 가이드 대시로 그려진 연결선이 1개 이상인지 본다.

버린 대안:

- 표준 템플릿의 실선마다 `strokeDasharray="none"` 을 넘기기. 23개 파일의 선마다 조건식을 고쳐야 하고, 새 표준 템플릿이 빠뜨려도 잡을 방법이 없다.
- 대시 선과 대비될 때만 끄기(선 층만 쓰기). BPMNDiagram·StateDiagram·C4 처럼 대시 선이 없는 표준 템플릿이 가이드 대시를 따라가 표기법과 어긋난다.
- `standard` 태그를 렌더링이 직접 읽기. 레지스트리는 AI 채택용 메타라 `type-meta` 서브패스로만 나가고 루트 번들에 안 들어간다. 렌더링은 템플릿이 선언하고, 둘이 맞는지는 게이트가 본다.

이 카드 밖으로 둔 것:

- DataFlowDiagram·Flowchart 를 `standard` 로 볼지. 둘 다 표기 관례가 있지만 레지스트리는 비표준으로 둔다. 태그를 바꾸면 AI 채택 메타가 바뀌므로 이 카드에서 정하지 않고 검토 항목으로 올린다.
- 경계선 대시(`boundary.dashPattern`). KAN-069 범위다.

검토 뒤 바뀐 것(2026-10-10, 검토 1번 추가 의견 · 유저 선택 「C4는 가이드를 따르게」): C4 여섯은 `standard` 태그가 있어도 표시를 달지 않고 관계선처럼 가이드 대시를 따른다. C4 공식 문서가 선 모양을 정하지 않고(c4model.com/diagrams/notation, notation independent), 이 저장소 C4 템플릿에도 점선이 없다. 표시를 다는 템플릿은 23개 파일에서 18개 파일(표준 이름 28개 중 22개)로 준다. 예외는 Dash Gate 의 `GUIDE_FOLLOWING_STANDARD` 한 곳에 근거와 함께 둔다(S5). 검토 3번(Flowchart·DataFlowDiagram)은 유저가 「지금대로 둔다」를 골랐다.

## 실행 계획
- [x] `S1` 실패하는 테스트 먼저 — 새 스토리 파일 `apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx`(`VISUALIZATION/Templates/Dash Gate`). 대시 가이드(blueprint foundation 에 `edge.dashPattern: '7 3'`) 아래에서 계산된 `stroke-dasharray` 로 잰다. ① 표준 표기 템플릿 — 레지스트리의 `standard` 태그 템플릿 표본마다 `<svg>` 에 `data-viz-notation` 이 있고, `7px, 3px` 인 연결선이 0개 ② 관계선 템플릿 — 스토리에 적은 목록(Edge 를 쓰는 비표준 템플릿 + SitemapTree·WorkBreakdownStructure·IsometricScene)마다 `7px, 3px` 인 연결선이 1개 이상이고 비표준 템플릿에는 훅이 없음 ③ Flowchart — 데이터에 대시 선이 있으면 실선은 `none`·대시 선은 `6px, 4px`, 없으면 `7px, 3px` ④ TimelineRoadmap 축은 `none`, ProcessSteps·Cycle·Hierarchy·Sketchnote 연결선은 `7px, 3px`. 완료 기준: ①·②·③의 대시 있는 쪽·④의 축이 빨강이고, 나머지와 다른 스토리는 초록.
- [x] `S2` 구현 — `contractCss.ts` 에 표준 표기 규칙, 표준 템플릿 23개 파일과 PacketDiagram 의 `Canvas` 두 곳에 `data-viz-notation`, SitemapTree·WorkBreakdownStructure·IsometricScene 관계선에 `data-viz-part="connector"`, Flowchart 의 대시 대비, TimelineRoadmap 축 `strokeDasharray="none"`. 완료 기준: S1 이 모두 초록이고 Paint Gate·Headless 를 포함한 viz 스토리가 초록.
- [x] `S3` 문서 — viz README 구현 규약(내부 훅 셋 `shape`·`connector`·`data-viz-notation` 과 대시 규칙, Dash Gate, StepConnector 두 변형을 섞을 때 주의), `packages/tokens/src/visualization.ts` 의 `edge.dashPattern` JSDoc(표준 표기 템플릿 제외), `style-classification.md` 횡단 규칙 3 상태 문장, `contractCss.ts` 주석, changeset(`@centurio1987/bbangto-ui-visualization` patch · `@centurio1987/bbangto-ui-tokens` patch). 완료 기준: 문서 넷과 changeset 이 같은 분류를 말하고, `git diff main...HEAD --stat -- packages/visualization-style-guide-catalog` 가 0줄.
- [x] `S4` 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`. 그리고 Dash Gate 파일만 `a11y: { test: 'error' }` 로 임시 강제해 돌린 뒤 되돌린다. 완료 기준: 다섯 다 초록이고 a11y 강제 결과를 적는다.
- [x] `S5` C4 재작업(검토 1번 추가 의견 · 2026-10-10 유저 선택 「C4는 가이드를 따르게」) — C4 템플릿 6개 파일의 `Canvas` 12곳에서 `data-viz-notation` 을 걷고, Dash Gate 에서 C4 를 표기법 목록 밖·관계선 목록 안으로 옮긴다(C4 공식 문서가 선 모양을 정하지 않는다: c4model.com/diagrams/notation). README·tokens JSDoc·style-classification·changeset 의 범위 문장을 맞추고 게이트 5종을 다시 돌린다. 완료 기준: Dash Gate 초록(C4 연결선이 가이드 대시), 게이트 5종 초록.

## 검증
아래를 저장소 루트에서 `bash -c` 로 돌려 모두 통과하면 끝이다.

1. `pnpm test` — `VISUALIZATION/Templates/Dash Gate` 스토리가 chromium 에서 초록. 대시 가이드 `7 3` 아래 계산된 `stroke-dasharray` 로 잰다: 표준 표기 템플릿의 연결선은 `7px, 3px` 이 0개, 관계선 템플릿은 1개 이상, Flowchart 는 대시 선이 섞이면 실선 `none`·대시 `6px, 4px`, TimelineRoadmap 축 `none`.
2. 같은 `pnpm test` 에서 Paint Gate·Headless(KAN-057 대시 스토리 넷)를 포함한 기존 스토리가 그대로 초록.
3. `git diff main...HEAD --stat -- packages/visualization-style-guide-catalog` — 0줄(카탈로그 값은 안 고친다. 지금 그림이 안 바뀐다는 근거). 착수 뒤 main 이 움직여도(배포 커밋 등) 이 브랜치 커밋만 보도록 기준점(merge-base)부터 잰다.
4. 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 모두 초록.
5. a11y — Dash Gate 파일만 `a11y: { test: 'error' }` 로 임시 강제해 돌린 결과(저장소 설정이 `'todo'` 라 `pnpm test` 는 접근성 위반을 실패로 안 센다).

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-10T04:03 · s:6b95cb93 — `전략` 섹션 교체
- 2026-10-10T04:03 · s:6b95cb93 — `실행 계획` 섹션 교체
- 2026-10-10T04:03 · s:6b95cb93 — `검증` 섹션 교체
- 2026-10-10T11:07 · s:6b95cb93 · S1 doing — 착수
- 2026-10-10T11:10 · s:6b95cb93 · S1 done — TemplateDashGate.stories.tsx 에 게이트 넷(대시 가이드 7 3). 이 파일만 돌린 결과 넷 다 빨강 — ① 표준 표기 표본 28개 모두 data-viz-notation 없음 ② 가이드 대시 0개인 관계선 템플릿이 wbs·sitemap-tree·isometric-scene ③ 대시 섞인 Flowchart 실선이 7px, 3px ④ TimelineRoadmap 축 7px, 3px. 각 스토리는 첫 실패에서 멈추므로 뒤 검사(①의 연결선 수·②의 훅·④의 패턴 연결선 넷)는 S2 뒤에 본다. 레지스트리 서브패스(type-meta)는 vite 캐시를 지운 뒤 그대로 읽혔다
- 2026-10-10T11:10 · s:6b95cb93 · S2 doing — 착수
- 2026-10-10T11:13 · s:6b95cb93 · S2 done — contractCss 에 [data-viz-notation] 연결선 stroke-dasharray:none, 표준 표기 템플릿 23개 파일+PacketDiagram 의 Canvas 48곳에 data-viz-notation(소비자 props 앞), SitemapTree·WBS·IsometricScene 관계선에 data-viz-part=connector, Flowchart 는 dashed 가 섞이면 나머지 선 none, TimelineRoadmap 축 strokeDasharray=none. Dash Gate ①을 강화(대시를 직접 안 넘긴 연결선은 none · 직접 넘긴 대시는 남음 · 잰 수>0) — 표준 표본에서 none 38개, 직접 넘긴 대시 12개(5 3·5 4·6 4·2 3)가 그대로. viz tsc 오류 0, viz 스토리 22파일/151 초록
- 2026-10-10T11:13 · s:6b95cb93 · S3 doing — 착수
- 2026-10-10T11:14 · s:6b95cb93 — `검증` 섹션 교체
- 2026-10-10T11:14 · s:6b95cb93 — 검증 3번 명령을 git diff main → main...HEAD 로 고침 — 착수 뒤 main 에 KAN-074 배포 커밋(7849962 version packages, viz 1.0.0)이 들어와 두 점 비교가 그 CHANGELOG·package.json 을 거꾸로 보였다. 이 카드의 changeset 은 다음 배포(viz 1.0.1 patch)에 실린다
- 2026-10-10T11:15 · s:6b95cb93 — `실행 계획` 섹션 교체
- 2026-10-10T11:15 · s:6b95cb93 · S3 done — viz README 구현 규약(내부 훅 셋, 관계선·표기법 대시 규칙, Dash Gate, StepConnector 두 변형), tokens edge.dashPattern JSDoc(관계선에만 · 표준 표기 템플릿 제외), style-classification 횡단 규칙 3 상태 문장, contractCss 주석, changeset kan-070-connector-dash-scope.md(visualization·tokens patch → 다음 배포 viz 1.0.1). 카탈로그 30개·프리셋 포함 92곳 edge.dashPattern 모두 '' 를 dist 로 다시 확인, git diff main...HEAD 카탈로그 0줄
- 2026-10-10T11:15 · s:6b95cb93 · S4 doing — 착수
- 2026-10-10T11:18 · s:6b95cb93 · S4 done — 게이트 5종 초록 — typecheck rc 0(TS 오류 0) · build rc 0 · test 195 파일/1304 통과 · storybook build 완료 · test:unit hooks 115·visualization 285·foundations 143·style-guide-catalog 113·viz catalog 46 통과. a11y — Dash Gate 파일만 test:'error' 로 강제해 4개 통과, 일부러 넣은 alt 없는 img 는 image-alt 로 실패함을 확인한 뒤 되돌렸다. main 은 착수 뒤 배포 커밋만 들어왔고 코드 변경 0(CHANGELOG·package.json·changeset 삭제뿐)
- 2026-10-10T20:40 · s:6b95cb93 — `실행 계획` 섹션 교체
- 2026-10-10T20:40 · s:6b95cb93 · S5 doing — 착수
- 2026-10-10T20:41 · s:6b95cb93 — `전략` 섹션 교체
- 2026-10-10T20:43 · s:6b95cb93 · S5 done — C4 6개 파일의 data-viz-notation 12곳을 걷어 착수 전과 같게(기준점 대비 diff 0줄), Dash Gate 에 GUIDE_FOLLOWING_STANDARD(C4 여섯, c4model.com 근거)와 NOTATION_TEMPLATES = standard − 예외, C4 를 관계선 목록으로. README·tokens JSDoc·style-classification·changeset 범위 문장 수정. Dash Gate 초록 — 표기 표본 22개 · 실선 30개 · 직접 넘긴 대시 12개 유지. 게이트 5종 초록(test 195/1304 · unit hooks 115·viz 285·foundations 143·sg-catalog 113·viz catalog 46), a11y 강제 4개 통과
