---
card: KAN-072-KW0G9B
title: 루트 README 의 「컴포넌트가 없을 때」 길과 viz Provider 서술 바로잡기
created: 2026-10-10
scope: README.md, packages/foundations/src/publishedDocs.ts, packages/foundations/src/publishedDocs.test.ts, apps/storybook/src/stories/ExtendWhenMissing.stories.tsx, packages/visualization/README.md, .changeset/kan-072-viz-readme-arrowhead.md
---

# KAN-072-KW0G9B — 루트 README 의 「컴포넌트가 없을 때」 길과 viz Provider 서술 바로잡기

## 전략
<!-- 왜 이 접근인가 · 제약 · 버린 대안. 사람이 자유롭게 편집한다. -->
### 문제

루트 README 두 자리가 KAN-067 의 결론과 어긋난다. KAN-067 은 배포 README 둘에 「원하는 것이 없을 때」 절을 세웠지만(`packages/core/README.md:15`·`packages/visualization/README.md:150`), 루트 README 는 그 절로 잇지 않고 서술 하나도 실측과 다르다.

1. **길잡이 표에서 「없을 때」 갈 곳이 기여뿐이다.** 「무엇을 하려고 오셨나요」 표(`README.md:17-28`)에서 앱에 원하는 컴포넌트나 그림 유형이 없을 때 고를 수 있는 줄은 「10 · 이 레포에 기여한다」 하나다. 2026-10-09 진단이 원인 후보로 꼽은 자리다. 앱 에이전트는 core README 맨 끝의 저장소 링크(`packages/core/README.md:154`)로 여기에 실제로 닿고, 그 눈에 이 줄은 라이브러리에 요청하는 길로 읽힌다.
2. **Provider 서술이 틀렸다.** `README.md:858` 은 Provider 없이 그리면 무채색 base foundation 으로 떨어져 캔버스는 흰색, 선은 `#333333` 이라고 적는다. 2026-10-09 chromium 실측(KAN-067 S5)에서 색 prop 을 주지 않은 도형은 검게 채워지고 엣지는 `stroke: none` 이라 보이지 않았다. 무채색 값으로 떨어지는 것은 `useVizFoundation()` 이 돌려주는 JS 값뿐이다. viz README 는 같은 서술을 이미 고쳤다(`packages/visualization/README.md:235-237`).

### 접근

1. **검사를 먼저 세운다.**
   - `publishedDocs.ts` 에 루트 README 검사를 더한다. 「무엇을 하려고 오셨나요」 절 안에 `EXTEND_SECTION_RULES` 의 패키지마다 `<패키지 경로>/README.md#원하는-것이-없을-때` 링크가 있는지 본다. 앵커는 `EXTEND_SECTION_TITLE` 에서 GitHub 규칙으로 만든다. 그래서 배포 README 의 절 제목이 바뀌면 루트 링크도 함께 깨진 것으로 잡힌다. 기존 `auditPublishedDocs` 의 인자는 건드리지 않고 함수를 하나 더 둔다.
   - `ExtendWhenMissing.stories.tsx` 에 Provider 밖 스토리를 더한다(`parameters.bbangtoProviders: false`). 루트 README 사례 8 의 Flowchart 예제와 atom 조립 예제(`DecisionSketch`)를 Provider 없이 그리고 도형 채움·엣지 선·글자 채움·캔버스 배경을 잰다. 잰 값을 단언으로 박아 두면, 라이브러리가 나중에 기본 색을 갖게 될 때 이 스토리가 먼저 빨개져 README 두 곳을 다시 보게 한다.
2. **길잡이 표에 줄을 더한다.** 「쓰려는 컴포넌트나 그림이 목록에 없다」 줄이 core·visualization README 의 「원하는 것이 없을 때」 절로 간다. 10번 줄은 문구로 「저장소 자체에 넣는 사람」의 줄임을 밝힌다. 사례 10 머리에는 「앱을 만들다 원하는 것이 없어 왔다면 앱 안에서 먼저 만들고, 기여는 앱을 완성한 뒤」라는 한 문단을 둔다. core README 순서 넷의 4번과 같은 말이다. 사례 1·8 의 「그다음」에도 한 문장씩 잇는다. 컴포넌트와 그림 유형을 처음 소개하는 자리라서다.
3. **`README.md:858` 을 S1 실측대로 고친다.** viz README:235-237 과 같은 사실을 루트 README 문체(합쇼체·해요체)로 쓴다.

### 제약

- 루트 README 에 확장 예제를 복제하지 않는다. 예제는 배포 README 두 곳에만 있고 `publishedDocs` 가 예제 파일과 글자 그대로 대조한다. 루트에 세 번째 사본을 두면 그 대조 밖에서 낡는다. 루트는 링크로 잇는다.
- 라이브러리 코드는 고치지 않는다. 배포 README 는 처음에 고치지 않기로 했으나, 검토 의견 4(2026-10-10 승인)에 따라 visualization README 의 Provider 밖 엣지 서술 두 줄(`packages/visualization/README.md:163`·`:235-236`)만 실측대로 고친다.
- changeset 은 visualization patch 하나만 단다(의견 4 의 두 줄). 루트 README 는 배포물이 아니고, `publishedDocs` 는 `packages/foundations/package.json` 의 `files` 밖이라 배포물에 실리지 않으므로 그 둘에는 changeset 이 필요 없다.
- 카드 메모의 「KAN-064 는 KAN-068 뒤 병합 대기」는 낡았다. KAN-064 는 main `0a81094` 로 병합됐다. scope 를 적은 미완료 카드 가운데 README.md 를 둔 것은 이 카드 하나다.

### 버린 대안

- **루트 README 에 사례 11 을 통째로 쓴다.** 위 제약의 예제 사본 문제다. 루트 README 는 「사례마다 다른 문서를 먼저 읽지 않아도 된다」고 약속하는데, 새 줄은 사례가 아니라 배포 README 로 가는 길잡이라 표 아래 한 줄로 그 차이를 밝힌다.
- **10번 줄을 지운다.** 저장소에 컴포넌트나 preset 을 넣는 사람에게는 필요한 줄이다.
- **「무채색」 낱말을 검사로 막는다.** `useVizFoundation` 폴백 설명처럼 맞는 쓰임까지 막는다. 사실은 스토리가 잰다.

### 정해진 것

- KAN-071(실제 사례 재현)이 견줄 「고치기 전」은 이 카드가 갈라져 나온 main `0a81094` 다. KAN-071 은 그 커밋과 이 카드의 병합 뒤를 견준다.
- 루트 독립성: `dep-check` 위반 0(2026-10-10). 미완료 루트 다섯 중 넷은 scope 미기재다. 그중 KAN-070 은 다른 세션이 막 착수했고 viz 연결선을 다루므로 이 카드와 자리가 갈린다.
- 검토 의견 3(2026-10-10 승인): S2 가 쓰고 재검토가 지운 「그 절은 설치한 패키지 안에도 들어 있다」를 「core 1.2.2 · visualization 1.0.0 부터」라는 조건을 붙여 되살린다. 재검토가 기댄 「배포 대기」는 브랜치 안의 changeset 만 본 판단이었고, main 에는 2026-10-10 04:11 릴리스 PR #11(`a15549a`)이 병합돼 두 버전이 이미 배포돼 있었다.

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->
- [x] `S1` 검사 먼저 — `publishedDocs.ts`·`.test.ts` 에 루트 README 길잡이 검사와 실패 주입 넷(링크 없음 · 앵커 틀림 · 다른 절에만 있음 · 길잡이 절 없음), `ExtendWhenMissing.stories.tsx` 에 Provider 밖 스토리. 완료 기준: 실패 주입 넷이 각각 위반을 내고, 실제 저장소 검사는 빨강이다(core·visualization 링크 둘 없음). Provider 밖 스토리는 지금도 초록이고, 잰 값(도형 채움 · 엣지 선 · 글자 채움 · 캔버스 배경)을 수행 내역에 남긴다.
- [x] `S2` 길잡이 잇기 — 표에 「목록에 없다」 줄, 10번 줄 문구, 사례 10 머리 문단, 사례 1·8 「그다음」 한 문장씩. 완료 기준: S1 루트 검사가 초록이다.
- [x] `S3` Provider 서술 — `README.md:858` 을 S1 에서 잰 값대로 고친다. 완료 기준: 「캔버스는 흰색, 선은 `#333333`」 문장이 0이고, 새 서술이 스토리 단언과 같은 사실을 말한다.
- [x] `S4` 마무리 — 품질 게이트 5종. 완료 기준: 다섯 다 초록.
- [ ] `S5` 검토 반영 — 의견 3(루트 README:33 에 버전 조건 붙여 문장 되살리기) · 의견 4(viz README 163·235 줄의 「엣지는 보이지 않는다」를 「선은 그려지지 않고 검은 화살촉만 남는다」로, visualization patch changeset) · main 병합 뒤 게이트 5종. 완료 기준: 두 문장이 `VizOutsideProvider` 단언·배포 버전과 같은 사실을 말하고, 게이트 5종이 초록이다.

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->
- `pnpm --filter @centurio1987/bbangto-ui-foundations exec vitest run src/publishedDocs.test.ts` — 실패 주입 넷과 실제 저장소 검사가 모두 초록.
- `pnpm test` 안의 `ExtendWhenMissing` 스토리 셋(CoreRating · VizCompose · Provider 밖) 초록.
- 품질 게이트 5종: `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.
- 사람이 볼 것: 루트 README 표의 새 줄과 사례 10 머리 문단이 「앱 안에서 먼저 만든다」로 읽히는가, `README.md:858` 의 새 서술이 Provider 밖 스토리의 단언과 같은 사실인가.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-10T03:59 · s:dc094364 — `전략` 섹션 교체
- 2026-10-10T03:59 · s:dc094364 — `실행 계획` 섹션 교체
- 2026-10-10T03:59 · s:dc094364 — `검증` 섹션 교체
- 2026-10-10T11:07 · s:dc094364 · S1 doing — 착수
- 2026-10-10T11:10 · s:dc094364 · S1 done — publishedDocs 에 불변식 ⑤(루트 README 길잡이 절 → 「원하는 것이 없을 때」 절 링크) · auditRootGuide·githubAnchor · 실패 주입 넷+앵커·통과 표본 초록, 실제 저장소 검사는 빨강(core·viz 링크 둘 없음). ExtendWhenMissing 에 VizOutsideProvider — chromium 실측(사례 8 Flowchart · atom 예제 둘 다): 캔버스 배경 투명 rgba(0,0,0,0) · 도형 채움 rgb(0,0,0)·테두리 none · 노드 이름표 글자 rgb(0,0,0)(검은 도형 위라 안 읽힘) · 엣지 stroke none · arrow 마커는 rgb(0,0,0) 로 칠해져 화살촉만 남음. 스토리 3/3 초록, typecheck 초록
- 2026-10-10T11:10 · s:dc094364 — 관찰: viz README 의 「엣지는 보이지 않는다」(packages/visualization/README.md:163·235-236)는 선만 맞다 — arrow 마커가 따로 칠해져 검은 화살촉은 남는다(S1 실측). 이 카드 제약(배포 README 안 고침)대로 두고 보고에 올린다
- 2026-10-10T11:10 · s:dc094364 · S2 doing — 착수
- 2026-10-10T11:11 · s:dc094364 · S2 done — 루트 README 다섯 자리 — 길잡이 표에 「목록에 없다」 줄(core·viz 의 「원하는 것이 없을 때」 링크) · 10번 줄을 「앱이 아니라 이 레포에」로 · 표 아래 문단(그 절은 설치한 패키지 README 에도 있다, 기여는 앱 완성 뒤) · 사례 10 머리 인용 문단 · 사례 1·8 「그다음」 한 문장씩. publishedDocs 17/17 초록
- 2026-10-10T11:11 · s:dc094364 · S3 doing — 착수
- 2026-10-10T11:11 · s:dc094364 · S3 done — README 사례 8 머리의 Provider 서술을 VizOutsideProvider 실측대로 — 좌표만 나오고 칠이 없다 · 도형 검은 채움 · 이름표 검정이라 안 읽힘 · 엣지 선 없음(화살촉만 검정) · 캔버스 투명 · chromium 만 쟀다고 밝힘 · 무채색 base 는 useVizFoundation() JS 값뿐. 「캔버스는 흰색, 선은 #333333」 0건
- 2026-10-10T11:11 · s:dc094364 · S4 doing — 착수
- 2026-10-10T11:15 · s:dc094364 · S4 done — 게이트 5종 초록 — typecheck · build · test(194 파일 1301건) · storybook build · test:unit(foundations 150 포함)
- 2026-10-10T20:18 · s:dc094364 — 재검토 정정: S2 가 표 아래 문단에 쓴 「그 절은 설치한 패키지 안에도 그대로 들어 있다」는 틀렸다 — 배포된 core 1.2.1·visualization 0.4.1 에는 절이 없다(KAN-067 changeset 배포 대기, 다음 버전은 changeset status 기준 core 1.2.2·viz 1.0.0). 버전 번호는 다른 changeset 이 더해지면 바뀌므로 박지 않고 문장을 지웠다. 함께 githubAnchor 가 결합 부호(\p{M})를 지우던 것을 남기게 고침(GitHub 규칙과 맞춤, 표본 1 추가)
- 2026-10-10T20:46 · s:dc094364 — 정정의 정정: 위 「재검토 정정」의 근거가 틀렸다 — main 에는 2026-10-10 04:11 릴리스 PR #11(a15549a)이 병합돼 core 1.2.2·visualization 1.0.0 이 이미 배포됐고, 두 README 의 「원하는 것이 없을 때」 절도 실렸다. 브랜치가 그 전(0a81094)에서 갈라져 브랜치 안의 changeset status 로는 대기로 보였다(검토자 대조). 지운 문장을 되살릴지는 검토 의견 3, viz README 두 줄은 의견 4(의견 1 대체)가 묻는다
- 2026-10-10T21:54 · s:dc094364 — `전략` 섹션 교체
- 2026-10-10T21:54 · s:dc094364 — `실행 계획` 섹션 교체
