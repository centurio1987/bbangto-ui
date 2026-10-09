---
card: KAN-067-WDY7N1
title: 배포 문서에 「원하는 것이 없을 때」 길 — core·viz README 확장 절 + viz 관리용 문서 배포 제외
created: 2026-10-09
scope: packages/core/README.md, packages/visualization/README.md, packages/visualization/package.json, packages/visualization/src/index.ts, packages/visualization/src/typeMeta/index.ts, packages/visualization/src/typeMeta/types.ts, packages/visualization/src/typeMeta/registry.ts, packages/foundations/src/publishedDocs.ts, packages/foundations/src/publishedDocs.test.ts, apps/storybook/src/stories/ExtendWhenMissing.stories.tsx, apps/storybook/src/stories/_readmeExamples/**, .changeset/kan-067-extend-when-missing.md
---

# KAN-067-WDY7N1 — 배포 문서에 「원하는 것이 없을 때」 길 — core·viz README 확장 절 + viz 관리용 문서 배포 제외

## 전략
### 문제

앱을 만드는 에이전트가 bbangto-ui 에 원하는 컴포넌트가 없을 때, 앱 안에 확장 컴포넌트를 만들지 않고 라이브러리를 떠나거나 개선 요청으로 결론을 낸다. 2026-10-09 진단에서 원인은 매니페스트의 문구가 아니라 배포 문서의 짜임새로 나왔다. 매니페스트 네 개에는 이탈이나 요청을 권하는 문구가 없다. 이 카드는 원인 셋 중 둘을 고친다.

1. **배포 README 에 「목록에 없을 때」의 길이 없다.** `packages/core/README.md` 는 짧은 소개뿐이고 컴포넌트 목록도 확장 방법도 없다. `packages/visualization/README.md:36` 은 빈 결과를 두고 「"그런 유형은 없다"가 답이다. 축을 줄여 다시 묻는다.」에서 끝난다. 확장할 부품은 이미 있다. core 컴포넌트 파일 56개 중 53개가 `forwardRef` 를 쓰고, 테마 값은 `--bbangto-*` CSS 변수 148개로 흐른다(`flattenToCSSVars(lightFoundation)` 실측). viz 는 `Canvas`·`Node`·`Edge` 같은 atom 과 molecule 을 내보낸다(`packages/visualization/src/atoms/index.ts`).
2. **배포물에 저장소 관리 지시가 섞여 있다.** `packages/visualization/package.json:24-25` 의 `files` 가 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 를 싣는다. 인벤토리 367~370번째 줄의 「문맥 없는 에이전트의 이어받기」 절은 「새 export/갭이 보이면 §5 해당 대역 끝에 행 추가」라고 지시한다. 앱 에이전트는 이것을 라이브러리 백로그에 올리라는 말로 읽을 수 있다.

나머지 하나(매니페스트에 조립 경로가 없다)는 이 카드 밖이다.

### 접근

1. **검사를 먼저 세운다.** 자리는 `packages/foundations` 의 저장소 전역 검사다. `gateDocs.ts`·`gateDocs.test.ts` 와 같은 구조로 검증기, 실제 저장소 검사, 실패 주입 표본(일부러 틀리게 만든 입력)을 함께 둔다. `publishedDocs.ts` 가 보는 것은 넷이다. 공개 패키지 일곱의 `files` 에 `README.md` 말고는 마크다운이 없는가, 배포 README 의 상대 링크가 배포물 안의 파일을 가리키는가, core·visualization README 에 「원하는 것이 없을 때」 절이 있는가, 그 절의 예제 코드 블록이 `apps/storybook/src/stories/_readmeExamples/` 의 파일과 글자 그대로 같은가. 마지막 검사는 README 에서만 고쳐진 예제가 깨진 채 배포되는 일을 막는다.
2. **예제는 브라우저에서 돌려 본다.** `ExtendWhenMissing.stories.tsx` 가 `_readmeExamples/` 의 예제를 그리고 play 함수로 확인한다. core 쪽은 확장 컴포넌트가 Provider 안에서 토큰 값을 받는지 본다(계산된 색이 `--bbangto-semantic-primary-base` 값과 같은가). viz 쪽은 atom 조합이 노드와 엣지를 실제로 그리는지 본다.
3. **README 절은 순서 하나로 쓴다.** ① export 와 매니페스트에서 찾는다. ② 없으면 가장 가까운 컴포넌트를 감싸거나 토큰·atom 으로 앱 안에 확장 컴포넌트를 만든다. ③ 라이브러리를 빼거나 다른 라이브러리로 바꾸지 않는다. ④ 개선 요청은 앱을 완성한 뒤 덧붙이는 선택이다. core 절에는 쓸 수 있는 CSS 변수 갈래(semantic·spacing·radius·shadow·typography)와 `className`·`ref` 전달을 적는다. viz 절에는 atom·molecule 목록과 Canvas 자식 등록 규칙(README 173~176번째 줄)을 잇는다.
4. **관리용 문서 둘을 배포물에서 뺀다.** 예전 I3 결정(`packages/visualization/CHANGELOG.md:77`)으로 일부러 실은 문서이고, 그 이유는 `.d.ts` 주석이 가리키던 죽은 참조를 살리는 것이었다. 그래서 빼면서 그 참조를 함께 고친다. 주석 네 곳(`src/typeMeta/types.ts:9-11`·`src/typeMeta/registry.ts:4`·`src/typeMeta/index.ts:6`·`src/index.ts:28`)에서는 「두 문서 모두 패키지에 동봉된다」를 지우고 저장소 링크로 바꾼다. README 108번째 줄은 범위 밖 3종(VT-520·VT-610·VT-611)의 사유를 인벤토리로 미루는데, 그 사유 세 줄을 README 에 직접 적는다. README 「함께 들어 있는 문서」 절(203~206번째 줄)은 바로 아래 「저장소에만 있는 문서」 줄과 합친다.
5. **배포물만 읽은 에이전트로 전후를 견준다.** 고치기 전 main 과 고친 뒤 브랜치에서 각각 `pnpm pack` 으로 배포물을 만들고, 그것만 준 서브에이전트에게 core 에 없는 컴포넌트와 viz 에 없는 유형이 필요한 과제를 준다. 결론이 「앱 안에 확장 컴포넌트를 만든다」로 바뀌는지 본다. 결과가 매번 같지 않으므로 게이트로 쓰지 않고 수행 내역에 기록으로 남긴다.

### 제약

- 매니페스트 파일과 생성기는 고치지 않는다. KAN-064 가 재편한 자리다.
- 루트 `README.md` 는 고치지 않는다. npm 배포물이 아니고 KAN-064 scope 에 들어 있다. 길잡이 표에서 컴포넌트가 없을 때 갈 수 있는 줄이 「사례 10 · 이 레포에 기여한다」뿐인 문제(`README.md:28`)는 후속 후보로 수행 내역에 남긴다.
- core 는 `cssVar` 를 다시 내보내지 않는다. 앱이 tokens 를 따로 설치하지 않아도 되게, 예제는 `var(--bbangto-…)` 문자열을 직접 쓰고 `cssVar` 는 tokens 를 설치했을 때의 선택으로 적는다.
- `forwardRef` 를 쓰지 않는 파일 셋(DataGrid·Skeleton·Text)은 S2 에서 ref 가 실제로 안 넘어가는지 확인해 README 에 그대로 적는다. 이 카드에서 고치지 않는다.
- 패키지 README 의 문체는 지금 문서를 따른다(`~다` 서술체).

### 버린 대안

- **문서 머리에 「저장소 관리용」 경고만 단다.** 지시문이 배포물에 그대로 남는다. 경고를 건너뛰고 해당 절만 읽으면 같은 결론이 난다.
- **예제를 README 에만 두고 검사하지 않는다.** 예제가 틀리면 에이전트가 따라 하다 실패하고 다시 라이브러리를 떠난다. 진단한 원인을 다른 모양으로 되살린다.
- **core 컴포넌트 매니페스트를 새로 만든다.** 진단의 고칠 방법 3에 속하고 `metadata-coverage.json` 의 범위 밖 결정을 다시 여는 일이라 KAN-064 와 함께 정한다.

### 정해진 것

- **KAN-064 와의 겹침은 용인한다**(2026-10-09 유저가 KAN-064 세션에서 선택, `.kanban/state.json` waivers 15). 이 세션에서 고른 「직렬 · KAN-067 먼저」는 기록하지 않았다. 그 선택은 "KAN-064 는 아직 백로그"라는 AI 의 잘못된 전제 위에서 나왔다. 실제로 KAN-064 는 자기 브랜치에서 S1~S5 를 끝내고 검토 전체 승인을 받은 상태이고, 병합은 KAN-068(미배포 수정분 배포) 뒤다. 직렬로 걸면 승인된 카드가 이 카드에 묶인다.
- **병합 때 맞출 자리는 넷이다.** 어느 카드가 먼저 main 에 들어가든 나중에 합치는 쪽이 두 변경을 다 남긴다.
  - `packages/visualization/package.json` 의 `files` — KAN-064 는 `manifest` 를 더하고 이 카드는 문서 두 개를 뺀다.
  - `src/typeMeta/index.ts:5-6` — KAN-064 는 「색인 → 상세」 읽기로 고쳤고 「전략은 패키지 루트 TYPE_METADATA_STRATEGY.md 참고」를 남겼다. 이 카드는 그 참조를 저장소 링크로 바꾼다.
  - `src/index.ts` — KAN-064 는 21번째 줄(매니페스트 동봉)을, 이 카드는 28번째 줄(전략 문서)을 고친다.
  - `packages/visualization/README.md` — KAN-064 가 scope 밖에서 53~101번째 줄(매니페스트 표·스키마)을 고쳤다. 이 카드도 그 범위 근처인 106~108번째 줄(범위 밖 3종 사유)을 고쳤다. 2026-10-10 검토자의 가상 병합(`git merge-tree`)으로는 README 가 충돌 없이 합쳐지고, 실제 충돌은 `package.json` 과 `src/typeMeta/index.ts` 두 곳이다. 새 절은 「구현 규약」 절 앞(130번째 줄)에 두고, 36번째 줄에는 문장 하나만 붙인다.
- **「동봉」이라는 낱말 자체는 막지 않는다.** 매니페스트 파일(`type.manifest.json`·`manifest/<id>.json`)은 실제로 실려 있으므로 KAN-064 의 「패키지에 동봉」 문장은 맞다. 이 카드의 검사는 관리용 문서 두 개를 배포물에 있는 것처럼 가리키는 문장만 막는다. 처음 적은 「`.d.ts` 에 「동봉」 0건」 기준은 이 문장들까지 잡아서 고쳤다.
- **수행 방식은 단일 에이전트다**(2026-10-09 유저 선택). S5 재현 시험 4건만 서브에이전트로 띄운다.

## 실행 계획
- [x] `S1` 검사 먼저 — `packages/foundations/src/publishedDocs.ts`·`.test.ts`, `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx`, 예제 파일 둘(`_readmeExamples/coreExtend.tsx`·`vizCompose.tsx`). 완료 기준: 실패 주입 표본 넷(README 밖 마크다운을 실은 files · 깨진 상대 링크 · 절 없음 · 예제 불일치)이 각각 위반을 내고, 실제 저장소 검사는 빨강이다(viz files 의 문서 2개, 두 README 의 절 없음). 스토리는 라이브러리를 고치지 않은 지금도 초록이다.
- [x] `S2` core README 「원하는 것이 없을 때」 절 — 순서 넷, CSS 변수 갈래, `className`·`ref` 전달(전달하지 않는 컴포넌트 명시), `coreExtend.tsx` 와 같은 예제. 완료 기준: S1 검사의 core 항목 초록.
- [x] `S3` visualization README 정리 — 「원하는 것이 없을 때」 절(`vizCompose.tsx` 와 같은 예제), 36번째 줄의 빈 결과 안내를 그 절로 잇기, 범위 밖 3종 사유를 README 에 직접 쓰기, 문서 목록을 「저장소에만 있는 문서」로 합치기. 완료 기준: S1 검사의 viz README 항목 초록, 배포되지 않는 문서를 배포물에 있는 것처럼 가리키는 문장 0.
- [x] `S4` 관리용 문서 배포 제외 — `package.json` `files` 에서 두 문서를 빼고 주석 4곳을 저장소 링크로 바꾼다. 완료 기준: S1 검사 전부 초록, `pnpm pack` 목록에 두 문서 없음, 빌드한 `dist` 의 `.d.ts` 에서 두 문서 이름이 나오는 줄은 모두 저장소 링크다.
- [x] `S5` 배포물 재현 시험 — 고치기 전 main 과 고친 브랜치의 `pnpm pack` 결과물을 각각 서브에이전트에게 주고 같은 과제 둘(core 에 없는 컴포넌트 · viz 에 없는 유형)을 낸다. 완료 기준: 네 번의 결론(전후 × 과제 둘)과 에이전트가 읽은 파일을 수행 내역에 남긴다. 게이트가 아니다.
- [x] `S6` 마무리 — changeset(core·visualization patch), 품질 게이트 5종. 완료 기준: 게이트 5종 초록.

## 검증
- `pnpm test:unit` — `publishedDocs.test.ts` 초록. 실제 저장소 위반 0, 실패 주입 넷이 각각 위반을 낸다.
- `pnpm --filter storybook exec vitest run --project storybook src/stories/ExtendWhenMissing.stories.tsx` — core 확장 예제가 Provider 안에서 토큰 색을 받고, viz 조합 예제가 노드와 엣지를 그린다.
- README 예제 한 줄을 바꾸면 `pnpm test:unit` 이 예제 불일치로 빨강이 된다. 손으로 한 번 확인하고 되돌린다.
- `packages/visualization` 에서 `pnpm pack` 한 tarball 목록(`tar -tzf`)에 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 가 없다.
- `pnpm build` 뒤 `grep -rnE 'visualization-type-inventory|TYPE_METADATA_STRATEGY' packages/visualization/dist --include='*.d.ts'` 의 모든 줄이 `github.com` 링크다. 매니페스트를 가리키는 「동봉」 문장은 맞는 문장이므로 세지 않는다.
- 재현 시험(S5) 결과가 수행 내역에 전후 × 과제 둘로 남아 있다.
- 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-09T22:49 · s:2504f49d — `전략` 섹션 교체
- 2026-10-09T22:49 · s:2504f49d — `실행 계획` 섹션 교체
- 2026-10-09T22:49 · s:2504f49d — `검증` 섹션 교체
- 2026-10-09T22:51 · s:2504f49d — `전략` 섹션 교체
- 2026-10-09T23:05 · s:2504f49d — `전략` 섹션 교체
- 2026-10-09T23:05 · s:2504f49d — `실행 계획` 섹션 교체
- 2026-10-09T23:05 · s:2504f49d — `검증` 섹션 교체
- 2026-10-09T23:06 · s:2504f49d · S1 doing — 착수
- 2026-10-09T23:11 · s:2504f49d · S1 done — publishedDocs.ts·.test.ts(불변식 넷: files 의 README 밖 마크다운 · 배포물에 없는 .md 참조 · 절 없음 · 예제 불일치) — 실패 주입 9건 초록, 실제 저장소 검사 빨강 6건(viz files 문서 2 · viz README 208·209줄 저장소 문서 코드 표기 2 · 두 README 절 없음). 예제 coreExtend(별점 Rating, 네이티브 button+토큰 — StarIcon 은 색이 박혀 있고 Button 은 hover 때 인라인 color 를 덮어써 쓰지 않음)·vizCompose(Canvas·Node·NodeLabel·Edge 결정 그림)와 ExtendWhenMissing 스토리 2건 chromium 초록. 새 파일 타입 오류 0
- 2026-10-09T23:12 · s:2504f49d · S2 doing — 착수
- 2026-10-09T23:13 · s:2504f49d — `전략` 섹션 교체
- 2026-10-09T23:13 · s:2504f49d · S2 done — core README 에 「원하는 것이 없을 때」 절 — 순서 넷 · 변수 갈래 표(이름은 flattenToCSSVars(lightFoundation) 실측) · ref/className 예외 셋(DataGrid 는 셋 다 안 받음, Skeleton·Text 는 ref 가 React 19 에서만) · 감쌀 때 걸리는 자리 둘(아이콘 107종 전부 색이 박혀 있음, Button 은 hover 때 인라인 색을 다시 씀) · 별점 예제. 예제 간격을 spacing-1(=1px) → spacing-4 로 고침. 게이트의 core 항목 초록, 스토리 2건 초록. 전략 절의 「57개 중 54개」를 「56개 중 53개」로 바로잡음(57 에 atoms 폴더가 섞였다)
- 2026-10-09T23:14 · s:2504f49d · S3 doing — 착수
- 2026-10-09T23:15 · s:2504f49d — `전략` 섹션 교체
- 2026-10-09T23:15 · s:2504f49d · S3 done — viz README 네 군데 — 36줄 빈 결과 안내를 새 절로 잇기 · 범위 밖 3종 사유를 README 에 직접(인벤토리 182·199·200행 사유 옮김, VT-520 은 core Table·DataGrid 로 안내) · 「원하는 것이 없을 때」 절을 「구현 규약」 앞에(순서 넷 · atom 23·molecule 16·배치 계산 7 표, export 실측 · 결정 그림 예제) · 「함께 들어 있는 문서」를 「저장소에만 있는 문서」 GitHub 링크 넷으로. 게이트의 viz README 항목 초록, 남은 위반은 S4 몫 files 2건. 새 절 위치를 전략의 203번째 줄 앞에서 구현 규약 앞으로 바꿈(앱 사용자 절이 기여자용 절 뒤에 묻히지 않게, KAN-064 의 53~115줄과도 안 겹침)
- 2026-10-09T23:16 · s:2504f49d · S4 doing — 착수
- 2026-10-09T23:17 · s:2504f49d · S4 done — visualization files 에서 두 문서 제거 + 주석 4곳(types.ts·registry.ts·typeMeta/index.ts·src/index.ts)을 GitHub 링크로. publishedDocs 게이트 10/10 초록. pnpm pack tarball = package.json·type.manifest.json·README.md·dist(708) — 두 문서 없음, CHANGELOG 도 안 실림(검증기 주석에 실측으로 반영). 빌드한 dist d.ts 에서 두 문서 이름이 나오는 3줄 모두 github.com 링크
- 2026-10-09T23:17 · s:2504f49d · S5 doing — 착수
- 2026-10-09T23:25 · s:2504f49d · S5 done — 재현 시험 4건(과제: core 색 선택기 · viz 결함 나무, 둘 다 배포물에 없음 확인. 서브에이전트에게 앱 폴더와 과제만 줌). 네 건 모두 「앱 안 확장」 — 고치기 전에도 이탈·개선 요청은 재현되지 않았다. 차이: 색 선택기는 고친 뒤 새 절을 근거로 들고 읽은 파일 21→14·토큰 141.8k→79.9k·260→114초, 고치기 전 계획에 있던 CheckIcon 재채색(아이콘 색이 고정이라 불가)을 고친 뒤에는 README 의 함정 문단으로 피함. 결함 나무는 전후 비슷(25→19 파일, 119.8k→125.9k, 237→241초), 고친 뒤는 요청을 완성 뒤로 미룸(4단계). 시험이 낸 부산물: 두 에이전트가 Provider 밖 렌더를 의심해 chromium 으로 재 보니 도형 검은 채움·엣지 stroke none — README 의 「Provider 밖은 무채색」 서술이 틀렸다
- 2026-10-09T23:25 · s:2504f49d — S5 부산물 수정: viz README 146줄(이 카드가 쓴 새 절)·217줄의 「Provider 밖에서는 무채색」 서술을 실측(도형 rgb(0,0,0) 채움·엣지 stroke none — atom 예제·Flowchart·Mindmap)으로 고치고, ExtendWhenMissing 스토리에 Provider 안에서 엣지가 보이고 도형이 검지 않다는 단언을 더함. 같은 서술이 루트 README.md:858 에도 있으나 scope 밖(KAN-064 scope)이라 후속 후보로 남김. useVizFoundation 주석(base.ts:13·Provider.tsx:100)은 JS 값 폴백이라 맞다
- 2026-10-09T23:27 · s:2504f49d · S6 doing — 착수
- 2026-10-09T23:29 · s:2504f49d · S6 done — changeset(core·visualization patch, README Provider 서술 정정 포함). 게이트 5종 초록 — typecheck · build(매니페스트 변경 없음) · test(194파일 1295건) · storybook build · test:unit(foundations 138건 등). 손 확인: core README 예제의 aria-label 한 줄을 바꾸면 publishedDocs 가 example-drift 로 빨강, 되돌리면 초록
- 2026-10-10T00:24 · s:2504f49d — `전략` 섹션 교체
- 2026-10-10T00:24 · s:2504f49d — S5 과제 원문(검토자 지적으로 보충, 4건 모두 같은 틀) — 「당신은 이 React 앱을 만드는 개발 에이전트입니다. 앱 폴더: <app-before|app-after>. 이 앱은 bbangto-ui(@centurio1987/bbangto-ui-core · -tokens · -visualization)를 쓰고 있고, 패키지는 앱 폴더의 node_modules 에 설치돼 있습니다. 과제: <A|B>. 이 과제를 어떻게 구현할지 방침을 정해 주세요. 코드는 쓰지 않아도 됩니다. 앱 폴더 안의 파일만 읽으세요. 앱 폴더 밖의 경로, 인터넷, 다른 저장소는 보지 않습니다. 파일을 만들거나 고치지 마세요. 형식: 방침/이유/읽은 파일/쓸 부품」. A=「팀 대시보드 설정 화면에 「팀 색상」을 고르는 색 선택기가 필요합니다. 미리 정한 색 칸 8개 중에서 고르거나 HEX 값을 직접 입력할 수 있어야 합니다.」 B=「장애 회고 페이지에 결함 나무(fault tree) 그림이 필요합니다. 맨 위 사건 「결제 실패」 아래에 AND/OR 게이트로 원인 사건 4~5개가 이어지는 그림입니다.」 이 틀은 인터넷·저장소(루트 README 의 「기여한다」 경로)와 구현을 막았으므로, 그 두 경로는 이 시험이 보지 못했다
- 2026-10-10T00:24 · s:2504f49d — S5 읽은 파일 수(검토자 지적으로 보충, 각 에이전트 보고 원문 기준): 전·색 21(코어 README·d.ts·Radio/Input/FormRow 구현 chunk·tokens) / 후·색 14(코어 README 새 절·d.ts·Chip/RadioGroup chunk·tokens) / 전·나무 25(viz README·type.manifest·인벤토리(검색)·TYPE_METADATA_STRATEGY·Canvas/Edge/Node/Provider 구현) / 후·나무 19(viz README 새 절·type.manifest·Canvas/Node/Edge/Provider 구현·tidyTreeLayout). 전체 경로 목록은 세션 기록의 각 에이전트 보고에 있다
