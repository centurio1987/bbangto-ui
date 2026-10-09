---
card: KAN-074-KAZBTF
title: 미배포 변경 배포 — KAN-057·061·067 과 KAN-064 major 4개 (tokens 1.5.0 · core 1.2.2 · visualization·style-guide-catalog·visualization-style-guide-catalog 1.0.0 · foundations 2.0.0)
created: 2026-10-10
scope: packages/tokens/package.json, packages/tokens/CHANGELOG.md, packages/core/package.json, packages/core/CHANGELOG.md, packages/foundations/package.json, packages/foundations/CHANGELOG.md, packages/style-guide-catalog/package.json, packages/style-guide-catalog/CHANGELOG.md, packages/visualization/package.json, packages/visualization/CHANGELOG.md, packages/visualization-style-guide-catalog/package.json, packages/visualization-style-guide-catalog/CHANGELOG.md, .changeset/kan-057-edge-dash-token.md, .changeset/kan-061-on-ink.md, .changeset/kan-064-manifest-index.md, .changeset/kan-067-extend-when-missing.md
---

# KAN-074-KAZBTF — 미배포 변경 배포 — KAN-057·061·067 과 KAN-064 major 4개 (tokens 1.5.0 · core 1.2.2 · visualization·style-guide-catalog·visualization-style-guide-catalog 1.0.0 · foundations 2.0.0)

## 전략
### 무엇을 하는가

main 에 쌓인 changeset 네 장(KAN-057 연결선 대시 토큰 · KAN-061 viz 글자 대비 · KAN-064 매니페스트 색인화 · KAN-067 배포 README 보강)으로 패키지 6개 버전을 올려 GitHub Packages 에 배포한다. KAN-064 의 major(호환이 깨지는 큰 버전 올림) 4개가 함께 나간다. 057·061·067 을 먼저 따로 내는 안(KAN-073)은 보관했다 — 먼저 내도 visualization 이 0.5.0 이 되어 외부 앱의 `^0.4` 범위로는 어차피 받지 못하기 때문이다(2026-10-10 유저 선택, `1f85a22`).

### 착수 시점 상태 (2026-10-10, main 0a81094)

| 패키지 | 배포본 | 다음 | 근거 |
|---|---|---|---|
| tokens | 1.4.0 | 1.5.0 | 061 minor · 057 patch |
| core | 1.2.1 | 1.2.2 | 067 patch |
| foundations | 1.1.2 | 2.0.0 | 064 major |
| style-guide-catalog | 0.3.3 | 1.0.0 | 064 major |
| visualization | 0.4.1 | 1.0.0 | 064 major · 061 minor · 057·067 patch |
| visualization-style-guide-catalog | 0.3.2 | 1.0.0 | 064 major |

- 다음 버전은 `pnpm changeset status --verbose`, 배포본은 `npm view` 로 확인했다. 배포본은 로컬 `package.json` version 과 같다. hooks 0.3.1 은 올리지 않는다.
- 마지막 배포(origin/main `adb851c`, KAN-068 Version PR #10 병합) 뒤 로컬 main 이 커밋 90개 앞선다(이 카드 기록 전). origin 쪽 새 커밋 0, 열린 PR 0.
- release.yml 의 「Generated manifests are committed」 단계(KAN-064 가 더함, `.github/workflows/release.yml` Build 다음)가 CI 에서 처음 도는 배포다. 대조하는 생성 파일 5개(색인 4개 · `packages/foundations/src/catalog.json`)에 version 필드가 없어, Version PR 이 version 줄을 바꿔도 이 단계에 걸리지 않는다.
- KAN-064 의 상세 파일(`manifest/` 4폴더)은 `.gitignore` 대상이고 CI 빌드의 prebuild 가 만들어 `files` 로 실린다. 배포본에 실제로 들어갔는지는 S3 에서 본다.

### 승인 규칙

- 2026-10-10 사용자 「배포 카드 만들고 push 배포 진행」을 카드 생성·착수·push·Version PR 병합(=배포) 지시로 받는다. 앞 답변 「다음 배포 카드를 만들고 push 와 배포까지 진행할까요? push 하면 커밋 90개가 원격에 올라가고 release.yml 이 돌아 major 넷이 나갑니다」에 대한 답이다.
- Version PR 의 버전·CHANGELOG 가 위 표와 어긋나면 지시가 있어도 병합하지 않고 멈춰 보고한다.
- 카드 완료 때 카드 브랜치를 main 에 병합해 다시 push 하는 일은 그때 따로 지시를 받는다.

### 흐름

1. 착수는 워크트리 `KAN-074-KAZBTF` 에서 한다. 버전·CHANGELOG·changeset 소진은 CI 가 `changeset-release/main` 브랜치에서 만들므로, 카드 브랜치에는 칸반 기록만 쌓인다. push 는 main 체크아웃에서 한다.
2. S1 push 직전 점검 → S2 push · Version PR 대조 · 병합 → CI 배포 → S3 배포본 확인과 전달.
3. main 체크아웃은 여러 세션이 함께 쓴다. S1 에서 점검한 커밋 뒤에 main 이 움직였으면, 새로 들어온 커밋이 칸반 파일만 건드렸는지 본다. `packages/` 나 `.changeset/` 이 바뀌었으면 S1 을 다시 하고, 다음 버전 표가 바뀌면 push 전에 멈춰 보고한다.
4. 병합 뒤 origin/main 에 release 커밋이 생기므로 로컬 main 에 반영한다(fast-forward 가 안 되면 `git pull --no-rebase`).

### 다른 카드와의 순서

- 백로그 KAN-066·069·070·071·072 는 scope 가 없어 `dep-check` 가 겹침을 볼 수 없다. 이 카드가 바꾸는 파일은 CI Version PR 이 만들고 그 전까지 main 에서 손대지 않으므로, 그 카드들이 push 전에 병합되지 않는 한 겹치지 않는다.
- KAN-071(이탈 현상 실제 재현)은 이 배포본의 KAN-067 README 로 전후 시험을 한다. 이 카드 뒤에 착수한다.

### 범위 밖

- 외부 앱 쪽 업그레이드와 그쪽 화면 확인(다른 저장소)
- 크기 게이트가 배포본도 재게 고치는 일

## 실행 계획
- [x] `S1` push 직전 점검 — main 체크아웃에 MERGE_HEAD·충돌 표시(UU)가 없는지 본다. `.changeset/*.md` 목록과 `pnpm changeset status --verbose` 로 버전 표를 다시 내고, push 할 main 커밋에서 게이트 5종을 돌린다. 빌드 뒤 release.yml 과 같은 `git diff --exit-code` 로 생성 파일 5개가 커밋본과 같은지 본다. origin 보다 앞선 커밋 수를 세고, 열린 PR 이 없는지 본다. 완료 기준: 패키지·배포본·다음 버전 표(major 4개 · 그 밖 2개), 게이트 5종 초록, 생성 파일 diff 0, 점검한 커밋 해시와 나갈 커밋 수
- [x] `S2` 배포 — main 이 S1 커밋 뒤에 움직였으면 새 커밋이 칸반 파일뿐인지 확인한다 → `git push origin main` → release 실행 초록 · Version PR 생성 확인 → PR 의 버전·CHANGELOG·changeset 소진을 S1 표와 대조 → 같으면 병합, 다르면 멈춘다 → release 실행 초록 확인 → 로컬 main 에 origin/main 반영. 완료 기준: 레지스트리에 새 버전 6개, release 실행 둘(PR 생성·배포) 초록
- [x] `S3` 배포본 확인과 전달 — 스크래치 폴더에 외부 앱과 같은 길(`npm install`)로 새 버전 6개와 react·react-dom 을 받는다. 배포된 package.json 의 의존이 `workspace:*` 가 아니라 실제 버전인지, Node 에서 이름으로 import 되는지 본다. changeset 마다 배포본에서 변경 하나 이상을 찾는다 — 057: visualization dist 에 `--bbangto-viz-edge-dash-pattern` 과 `data-viz-part` connector · 061: visualization dist 에 `--bbangto-viz-on-` 변수, tokens 타입의 `VisualizationFoundation` 에 `on` · 064: 색인 서브패스 4개가 `{ axis, detail, columns, rows }` 이고 상세 파일 수가 색인 rows 수와 같으며 상세 하나가 서브패스 이름으로 import 됨 · 067: core README 에 「원하는 것이 없을 때」 절, visualization 배포물에 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 없음. 외부 앱에 전할 문구를 수행 내역에 남긴다. 완료 기준: 6개 설치·import 성공, 변경 4건 확인, 문구 기록

## 검증
### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 1.5.0 · core 1.2.2 · foundations 2.0.0 · style-guide-catalog 1.0.0 · visualization 1.0.0 · visualization-style-guide-catalog 1.0.0 이 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- hooks 는 0.3.1 그대로다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(「Generated manifests are committed」 · test:unit 단계 포함)
- 배포된 패키지의 의존이 실제 버전이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 네 장의 변경이 배포본에 들어 있다(S3 의 네 가지). 특히 KAN-064 상세 파일이 배포본에 실렸다
- 외부 앱에 전할 문구가 수행 내역에 있다. 범위를 올려야 받는 패키지 4개, 깨지는 곳(매니페스트 색인 모양), 바뀐 동작(viz 글자색 · 연결선 대시 · viz 배포물에서 빠진 문서 두 개)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens core foundations style-guide-catalog visualization visualization-style-guide-catalog hooks; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-visualization@1.0.0 … react react-dom
# node -e "console.log(require.resolve('@centurio1987/bbangto-ui-visualization/manifest/VT-101.json'))"
```

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-10T03:58 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-10T03:58 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-10T03:58 · s:bcc5b01f — `검증` 섹션 교체
- 2026-10-10T04:07 · s:bcc5b01f — 인스턴트 예외 동의(2026-10-10 유저) — work 3개(S1~S3)가 점검 → push·배포 → 배포본 확인 순서로만 돌고, 저장소에서 바꾸는 파일은 칸반 기록뿐(버전·CHANGELOG 는 CI Version PR). 배치 문서·계획 리포트 생략
- 2026-10-10T04:07 · s:bcc5b01f · S1 doing — 착수
- 2026-10-10T04:09 · s:bcc5b01f · S1 done — 점검 커밋 main 9cbd196(워크트리 바탕과 같음), MERGE_HEAD·UU 없음. changeset 4장(057·061·064·067). 다음 버전: tokens 1.4.0→1.5.0 · core 1.2.1→1.2.2 · foundations 1.1.2→2.0.0 · style-guide-catalog 0.3.3→1.0.0 · visualization 0.4.1→1.0.0 · visualization-style-guide-catalog 0.3.2→1.0.0, major 4개(064) · hooks 0.3.1 미대상(npm view 배포본 = 로컬 version). 게이트 5종 초록: install · build · 생성 파일 5개 git diff 0 · typecheck · test:unit 702(hooks 115 · visualization 285 · foundations 143 · style-guide-catalog 113 · visualization-style-guide-catalog 46) · test 1300/1300(194파일) · storybook build. 나갈 커밋 92개(칸반만 59 · 코드·문서 24 · 병합 9), origin 쪽 새 커밋 없음, 열린 PR 없음
- 2026-10-10T04:09 · s:bcc5b01f · S2 doing — 착수
- 2026-10-10T04:13 · s:bcc5b01f · S2 done — main 9cbd196 push(adb851c..9cbd196, 92커밋) → release 실행 37978338051 초록(Generated manifests are committed · test:unit 포함)이 Version PR #11 생성 → PR 대조: 16파일(changeset 4장 소진 · package.json 6개 version 줄만 · CHANGELOG 6개), 버전 S1 표와 같음, mergeable CLEAN → 병합(a15549a) → release 실행 37978559843 초록, publish 6개(tokens 1.5.0 · core 1.2.2 · foundations 2.0.0 · visualization 1.0.0 · style-guide-catalog 1.0.0 · visualization-style-guide-catalog 1.0.0) → npm view 레지스트리 7개 확인(hooks 0.3.1 그대로) → 로컬 main 을 origin/main 으로 fast-forward(a15549a)
- 2026-10-10T04:13 · s:bcc5b01f · S3 doing — 착수
- 2026-10-10T04:15 · s:bcc5b01f — 외부 앱 전달 문구 — ① 새 버전(GitHub Packages): tokens 1.5.0 · core 1.2.2 는 지금 범위(^1)로 받는다. foundations 2.0.0 · visualization 1.0.0 · style-guide-catalog 1.0.0 · visualization-style-guide-catalog 1.0.0 은 major 라 범위를 올려야 받는다(foundations ^2.0.0, 나머지 ^1.0.0). 넷을 함께 올린다 — style-guide-catalog 1.0.0 은 core 1.2.2, visualization-style-guide-catalog 1.0.0 은 visualization 1.0.0 에 의존한다. hooks 0.3.1 그대로. ② 깨지는 곳은 하나다(KAN-064): 매니페스트 JSON 색인 서브패스 4개(style-guide-catalog·visualization-style-guide-catalog 의 ./manifest.json, foundations 의 ./foundation.manifest.json, visualization 의 ./type.manifest.json)가 항목 배열에서 { axis, detail, columns, rows } 객체로 바뀐다. rows 의 각 배열이 columns 순서대로 한 항목이고, useWhen·avoidWhen·mood·accessibility 같은 상세 메타는 ./manifest/<이름>.json 에서 읽는다. 이 JSON 을 읽지 않는 앱은 고칠 코드가 없다. 컴포넌트 props·export·select* 함수 시그니처는 그대로다. ③ 바뀐 동작: (가) viz 면 위 글자색(KAN-061) — 면마다 글자가 4.5:1 이상이 되도록 Provider 가 --bbangto-viz-on-* 변수를 내고 템플릿이 그것을 쓴다. 지금 읽히던 글자도 색이 바뀔 수 있고, 흐리게 쓰던 보조 글자 몇 곳의 opacity 를 걷었다. fill·color 를 직접 준 자리는 종전 글자색이다. (나) 연결선 대시(KAN-057) — 스타일 가이드의 edge.dashPattern 이 Edge 연결선에 걸린다. 카탈로그 가이드는 모두 실선이라 지금 그림은 그대로다. 앱 스타일시트로 덮으려면 [data-bbangto-viz-style-guide] [data-viz-part="connector"] 보다 구체적인 선택자를 쓴다. (다) 원하는 것이 없을 때(KAN-067) — core·visualization README 에 앱 안에서 확장 컴포넌트·그림을 만드는 절이 생겼다. visualization 배포물에서 visualization-type-inventory.md·TYPE_METADATA_STRATEGY.md 가 빠졌다(README 의 저장소 링크로 읽는다)
- 2026-10-10T04:15 · s:bcc5b01f · S3 done — 배포본 6개를 스크래치 폴더에 npm install(react·react-dom 19)로 받음 — version 6개 기대와 같음, 의존은 실제 버전(core·foundations·visualization → tokens 1.5.0, style-guide-catalog → core 1.2.2·tokens 1.5.0, visualization-style-guide-catalog → visualization 1.0.0·tokens 1.5.0), workspace:* 0. Node 이름 import 6개 성공(export tokens 22 · core 258 · foundations 78 · visualization 210 · style-guide-catalog 175 · visualization-style-guide-catalog 41). 변경 4건: 057 계약 스타일시트에 stroke-dasharray: var(--bbangto-viz-edge-dash-pattern) 과 [data-viz-part="connector"], 빈 대시는 none · 061 visualizationFoundationToStyleObject 가 --bbangto-viz-on-* 20개(on-shape-fill 포함), tokens d.ts 에 on?: · 064 색인 4개 모두 axis·detail·columns·rows, 상세 파일 수 = rows(51 · 30 · 76 · 87), 첫 항목 상세를 ./manifest/<이름>.json 서브패스로 import 해 meta 있음 · 067 core·visualization README 에 「원하는 것이 없을 때」 절, visualization 배포물에 문서 두 개 없음(dist·manifest·README·package.json·type.manifest.json 만). 외부 앱 문구는 바로 위 줄
