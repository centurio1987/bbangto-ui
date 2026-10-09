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

1. **배포 README 에 「목록에 없을 때」의 길이 없다.** `packages/core/README.md` 는 짧은 소개뿐이고 컴포넌트 목록도 확장 방법도 없다. `packages/visualization/README.md:36` 은 빈 결과를 두고 「"그런 유형은 없다"가 답이다. 축을 줄여 다시 묻는다.」에서 끝난다. 확장할 부품은 이미 있다. core 컴포넌트 파일 57개 중 54개가 `forwardRef` 를 쓰고, 테마 값은 `--bbangto-*` CSS 변수 148개로 흐른다(`flattenToCSSVars(lightFoundation)` 실측). viz 는 `Canvas`·`Node`·`Edge` 같은 atom 과 molecule 을 내보낸다(`packages/visualization/src/atoms/index.ts`).
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
  - `packages/visualization/README.md` — KAN-064 가 scope 밖에서 53~115번째 줄(매니페스트 표·스키마)을 고쳤다. 이 카드는 그 구간을 건드리지 않는다. 새 절은 203번째 줄 앞에 두고, 36번째 줄에는 문장 하나만 붙인다.
- **「동봉」이라는 낱말 자체는 막지 않는다.** 매니페스트 파일(`type.manifest.json`·`manifest/<id>.json`)은 실제로 실려 있으므로 KAN-064 의 「패키지에 동봉」 문장은 맞다. 이 카드의 검사는 관리용 문서 두 개를 배포물에 있는 것처럼 가리키는 문장만 막는다. 처음 적은 「`.d.ts` 에 「동봉」 0건」 기준은 이 문장들까지 잡아서 고쳤다.
- **수행 방식은 단일 에이전트다**(2026-10-09 유저 선택). S5 재현 시험 4건만 서브에이전트로 띄운다.

## 실행 계획
- [x] `S1` 검사 먼저 — `packages/foundations/src/publishedDocs.ts`·`.test.ts`, `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx`, 예제 파일 둘(`_readmeExamples/coreExtend.tsx`·`vizCompose.tsx`). 완료 기준: 실패 주입 표본 넷(README 밖 마크다운을 실은 files · 깨진 상대 링크 · 절 없음 · 예제 불일치)이 각각 위반을 내고, 실제 저장소 검사는 빨강이다(viz files 의 문서 2개, 두 README 의 절 없음). 스토리는 라이브러리를 고치지 않은 지금도 초록이다.
- [ ] `S2` core README 「원하는 것이 없을 때」 절 — 순서 넷, CSS 변수 갈래, `className`·`ref` 전달(전달하지 않는 컴포넌트 명시), `coreExtend.tsx` 와 같은 예제. 완료 기준: S1 검사의 core 항목 초록.
- [ ] `S3` visualization README 정리 — 「원하는 것이 없을 때」 절(`vizCompose.tsx` 와 같은 예제), 36번째 줄의 빈 결과 안내를 그 절로 잇기, 범위 밖 3종 사유를 README 에 직접 쓰기, 문서 목록을 「저장소에만 있는 문서」로 합치기. 완료 기준: S1 검사의 viz README 항목 초록, 배포되지 않는 문서를 배포물에 있는 것처럼 가리키는 문장 0.
- [ ] `S4` 관리용 문서 배포 제외 — `package.json` `files` 에서 두 문서를 빼고 주석 4곳을 저장소 링크로 바꾼다. 완료 기준: S1 검사 전부 초록, `pnpm pack` 목록에 두 문서 없음, 빌드한 `dist` 의 `.d.ts` 에서 두 문서 이름이 나오는 줄은 모두 저장소 링크다.
- [ ] `S5` 배포물 재현 시험 — 고치기 전 main 과 고친 브랜치의 `pnpm pack` 결과물을 각각 서브에이전트에게 주고 같은 과제 둘(core 에 없는 컴포넌트 · viz 에 없는 유형)을 낸다. 완료 기준: 네 번의 결론(전후 × 과제 둘)과 에이전트가 읽은 파일을 수행 내역에 남긴다. 게이트가 아니다.
- [ ] `S6` 마무리 — changeset(core·visualization patch), 품질 게이트 5종. 완료 기준: 게이트 5종 초록.

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
