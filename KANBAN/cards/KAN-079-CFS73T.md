---
card: KAN-079-CFS73T
title: 미배포 변경 배포 — KAN-069·070·072·075 (tokens·visualization·visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1)
created: 2026-10-12
scope: packages/tokens/package.json, packages/tokens/CHANGELOG.md, packages/core/package.json, packages/core/CHANGELOG.md, packages/foundations/package.json, packages/foundations/CHANGELOG.md, packages/style-guide-catalog/package.json, packages/style-guide-catalog/CHANGELOG.md, packages/visualization/package.json, packages/visualization/CHANGELOG.md, packages/visualization-style-guide-catalog/package.json, packages/visualization-style-guide-catalog/CHANGELOG.md, .changeset/kan-069-unused-viz-tokens.md, .changeset/kan-070-connector-dash-scope.md, .changeset/kan-072-viz-readme-arrowhead.md, .changeset/kan-075-guide-text-ink.md
---

# KAN-079-CFS73T — 미배포 변경 배포 — KAN-069·070·072·075 (tokens·visualization·visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1)

## 전략
### 무엇을 하는가

main 에 쌓인 changeset 네 장(KAN-069 미사용 viz 토큰 정리 · KAN-070 연결선 대시 범위 · KAN-072 viz README 의 Provider 밖 서술 · KAN-075 가이드 글자색 `on.ink`)으로 패키지 6개 버전을 올려 GitHub Packages 에 배포한다. KAN-069 가 토큰 필드를 지웠으므로 tokens·visualization·visualization-style-guide-catalog 셋이 major(호환이 깨지는 큰 버전 올림)로 나간다.

### 착수 시점 상태 (2026-10-12, main 30b92b7)

| 패키지 | 배포본 | 다음 | 근거 |
|---|---|---|---|
| tokens | 1.5.0 | 2.0.0 | 069 major · 075 minor · 070 patch |
| visualization | 1.0.0 | 2.0.0 | 069 major · 075 minor · 070·072 patch |
| visualization-style-guide-catalog | 1.0.0 | 2.0.0 | 069 major · 075 minor |
| core | 1.2.2 | 1.2.3 | tokens major 에 따른 의존 범위 갱신(patch) |
| foundations | 2.0.0 | 2.0.1 | 위와 같음 |
| style-guide-catalog | 1.0.0 | 1.0.1 | 위와 같음 |

- 다음 버전은 `pnpm changeset status --verbose`, 배포본은 `npm view` 로 확인했다. 배포본은 로컬 `package.json` version 과 같다. hooks 0.3.1 은 올리지 않는다.
- 마지막 배포(origin/main `a15549a`, KAN-074 Version PR #11 병합) 뒤 로컬 main 이 커밋 147개 앞선다(이 카드 착수 직전).
- KAN-071 병합(`182f61d`)은 `packages/`·`.changeset/`·루트 README 를 바꾸지 않아 범위에 더할 것이 없다.
- KAN-066 이 패키지 `package.json` exports 에 `bbangto-source` 조건을 넣었다(changeset 없음). 이 조건은 이 저장소의 tsconfig·vitest·tsx 만 켜므로 외부 앱 동작은 그대로이고, core·foundations·style-guide-catalog 의 patch 에 실려 나간다.
- release.yml 은 build(번들 크기 게이트 포함) → 생성 파일 5개 `git diff --exit-code` → `test:unit` → changesets action 순서로 돈다.

### 승인 규칙

- 2026-10-12 사용자 「push 배포 진행」을 착수·push·Version PR 병합(=배포) 지시로 받는다. 앞 답변 「배포는 KAN-074 때처럼 "push 배포 진행"이라고 지시해 주시면 그때 시작하겠습니다」에 대한 답이다.
- Version PR 의 버전·CHANGELOG 가 위 표와 어긋나면 지시가 있어도 병합하지 않고 멈춰 보고한다.
- 카드 완료 때 카드 브랜치를 main 에 병합해 다시 push 하는 일은 그때 따로 지시를 받는다.

### 흐름

1. 착수는 워크트리 `KAN-079-CFS73T` 에서 한다. 버전·CHANGELOG·changeset 소진은 CI 가 `changeset-release/main` 브랜치에서 만들므로, 카드 브랜치에는 칸반 기록만 쌓인다. push 는 main 체크아웃에서 한다.
2. S1 push 직전 점검 → S2 push · Version PR 대조 · 병합 → CI 배포 → S3 배포본 확인과 전달.
3. main 체크아웃은 여러 세션이 함께 쓴다. S1 에서 점검한 커밋 뒤에 main 이 움직였으면 새 커밋이 칸반 파일만 건드렸는지 본다. `packages/` 나 `.changeset/` 이 바뀌었으면 S1 을 다시 하고, 다음 버전 표가 바뀌면 push 전에 멈춰 보고한다.
4. 병합 뒤 origin/main 에 release 커밋이 생기므로 로컬 main 에 반영한다(fast-forward 가 안 되면 `git pull --no-rebase`).

### 다른 카드와의 순서

- 백로그 KAN-076·077·078 은 scope 가 없어 `dep-check` 가 겹침을 볼 수 없다. 이 카드가 바꾸는 파일은 CI Version PR 이 만들고 그 전까지 main 에서 손대지 않으므로, 그 카드들이 push 전에 병합되지 않는 한 겹치지 않는다.
- KAN-076(viz 배치 엔진 안내)은 visualization README 를 고친다. push 전에 병합되면 이 배포에 실리고, 뒤면 다음 patch 로 나간다. 이 카드는 076 을 기다리지 않는다.

### 범위 밖

- 외부 앱 쪽 업그레이드와 그쪽 화면 확인(다른 저장소)

## 실행 계획
- [x] `S1` push 직전 점검 — main 체크아웃에 MERGE_HEAD·충돌 표시(UU)가 없는지 본다. `.changeset/*.md` 목록과 `pnpm changeset status --verbose` 로 버전 표를 다시 내고, push 할 main 커밋에서 게이트 5종을 돌린다. 빌드 뒤 release.yml 과 같은 `git diff --exit-code` 로 생성 파일 5개가 커밋본과 같은지 본다. origin 보다 앞선 커밋 수를 세고, 열린 PR 이 없는지 본다. 완료 기준: 패키지·배포본·다음 버전 표(major 3개 · patch 3개), 게이트 5종 초록, 생성 파일 diff 0, 점검한 커밋 해시와 나갈 커밋 수
- [x] `S2` 배포 — main 이 S1 커밋 뒤에 움직였으면 새 커밋이 칸반 파일뿐인지 확인한다 → `git push origin main` → release 실행 초록 · Version PR 생성 확인 → PR 의 버전·CHANGELOG·changeset 소진을 S1 표와 대조 → 같으면 병합, 다르면 멈춘다 → release 실행 초록 확인 → 로컬 main 에 origin/main 반영. 완료 기준: 레지스트리에 새 버전 6개, release 실행 둘(PR 생성·배포) 초록
- [x] `S3` 배포본 확인과 전달 — 스크래치 폴더에 외부 앱과 같은 길(`npm install`)로 새 버전 6개와 react·react-dom 을 받는다. 배포된 package.json 의 의존이 `workspace:*` 가 아니라 실제 버전인지, Node 에서 이름으로 import 되는지 본다. changeset 마다 배포본에서 변경 하나 이상을 찾는다 — 069: tokens 타입의 `VisualizationFoundation` 에 `tagColor`·`titleWeight` 가 없고, visualization dist 계약 스타일시트에 `[data-viz-part="boundary"]` 와 `--bbangto-viz-boundary-dash-pattern` · 070: visualization dist 에 `data-viz-notation` · 072: visualization README 에 화살촉 마커 서술 · 075: tokens 타입의 `on` 에 `ink`, visualization-style-guide-catalog dist 에 artdeco-luxe 의 `on.ink` 크림. 외부 앱에 전할 문구를 수행 내역에 남긴다. 완료 기준: 6개 설치·import 성공, 변경 4건 확인, 문구 기록

## 검증
### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 2.0.0 · visualization 2.0.0 · visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1 이 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- hooks 는 0.3.1 그대로다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(「Generated manifests are committed」 · test:unit 단계 포함)
- 배포된 패키지의 의존이 실제 버전이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 네 장의 변경이 배포본에 들어 있다(S3 의 네 가지)
- 외부 앱에 전할 문구가 수행 내역에 있다. 범위를 올려야 받는 패키지 3개, 깨지는 곳(지운 토큰 필드와 대신 쓸 것), 바뀐 동작(경계선 · 글자색 · 연결선 대시 범위)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens core foundations style-guide-catalog visualization visualization-style-guide-catalog hooks; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-visualization@2.0.0 … react react-dom
```

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-12T16:01 · s:b3fee064 — `전략` 섹션 교체
- 2026-10-12T16:01 · s:b3fee064 — `실행 계획` 섹션 교체
- 2026-10-12T16:01 · s:b3fee064 — `검증` 섹션 교체
- 2026-10-12T16:01 · s:b3fee064 — 인스턴트 예외 — KAN-074 와 같은 모양(work 3개가 점검 → push·배포 → 배포본 확인 순서로만 돌고, 저장소에서 바꾸는 파일은 칸반 기록뿐 · 버전·CHANGELOG 는 CI Version PR). 2026-10-12 유저 「push 배포 진행」 실행 지시로 바로 진행해 배치 문서·계획 리포트를 생략한다. 별도 동의 질문은 하지 않았고 보고에서 알린다
- 2026-10-12T16:01 · s:b3fee064 · S1 doing — 착수
- 2026-10-12T16:03 · s:b3fee064 · S1 done — 점검 커밋 main 30b92b7(워크트리 바탕과 같음), MERGE_HEAD·UU 없음. changeset 4장(069·070·072·075). 다음 버전: tokens 1.5.0→2.0.0 · visualization 1.0.0→2.0.0 · visualization-style-guide-catalog 1.0.0→2.0.0(major 3개, 069) · core 1.2.2→1.2.3 · foundations 2.0.0→2.0.1 · style-guide-catalog 1.0.0→1.0.1(tokens major 에 따른 patch) · hooks 0.3.1 미대상(npm view 배포본 = 로컬 version). 게이트 5종 초록: install · build · 생성 파일 5개 git diff 0 · typecheck · test:unit 750(hooks 115 · foundations 143 · visualization 297 · style-guide-catalog 113 · visualization-style-guide-catalog 82) · test 1310/1310(196파일) · storybook build. 나갈 커밋 147개(칸반만 110 · 코드·문서 29 · 병합 8), origin 쪽 새 커밋 없음, 열린 PR 없음
- 2026-10-12T16:03 · s:b3fee064 · S2 doing — 착수
- 2026-10-12T16:07 · s:b3fee064 · S2 done — main 30b92b7 push(a15549a..30b92b7, 147커밋) → release 실행 38215665090 초록(Generated manifests are committed · Unit gates 포함)이 Version PR #12 생성 → PR 대조: 16파일(changeset 4장 소진 · package.json 6개 version 줄만 · CHANGELOG 6개), 버전 S1 표와 같음, mergeable CLEAN → 병합(7dce3b0) → release 실행 38215836553 초록, publish 6개(tokens 2.0.0 · core 1.2.3 · foundations 2.0.1 · visualization 2.0.0 · style-guide-catalog 1.0.1 · visualization-style-guide-catalog 2.0.0) → npm view 레지스트리 7개 확인(hooks 0.3.1 그대로) → 로컬 main 을 origin/main 으로 fast-forward(7dce3b0)
- 2026-10-12T16:07 · s:b3fee064 · S3 doing — 착수
- 2026-10-12T16:08 · s:b3fee064 — 외부 앱 전달 문구 — ① 새 버전(GitHub Packages): tokens 2.0.0 · visualization 2.0.0 · visualization-style-guide-catalog 2.0.0 은 major 라 범위를 ^2.0.0 으로 올려야 받는다. 셋을 함께 올린다 — visualization 은 tokens 2.0.0, visualization-style-guide-catalog 는 tokens·visualization 2.0.0 에 의존한다. core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1 은 지금 범위로 받지만 셋 다 tokens 2.0.0 을 의존으로 가져오므로, 앱이 tokens 를 직접 ^1 로 두었으면 함께 ^2.0.0 으로 올린다(안 올리면 tokens 가 두 벌 깔린다). hooks 0.3.1 그대로. ② 깨지는 곳(KAN-069): 시각화 가이드 토큰에서 그림에 쓰이지 않던 필드를 지웠다 — node.<kind>.tagColor(대신 on.node.<kind>.fill) · c4.l1~l3.labelColor(대신 on.c4.l1.bgTint 등) · node.<kind>.glyph · node.external.dashed · typography.titleWeight · typography.sizes.* · iconStyle · spacing.* · motion.*(대신 없음), 그리고 makeVizColorway 의 tagColor·c4LabelColor 선택지. 자기 시각화 가이드를 만들어 이 필드를 적은 앱만 타입 오류가 나고 그 줄을 지우면 된다. 카탈로그 가이드만 쓰는 앱은 고칠 코드가 없다. 컴포넌트 export 는 그대로다. ③ 바뀐 그림: (가) 경계 — Boundary 가 가이드의 boundary.dashPattern·width·radius 를 따른다. 카탈로그 가이드 29개의 경계선 모양이 바뀌고 iso-color-block·swiss-systematic·bauhaus-geometric·neobrutalist 넷은 실선이 된다. C4Box 테두리 두께는 c4.l1~l3.borderWidth, Canvas 의 markerSize 기본값은 edge.marker.size 를 따른다. (나) 글자색(KAN-075) — 가이드가 정한 글자색 on.ink 가 생겼고, 지침이 글자색을 정한 가이드 7개(artdeco-luxe · darkluxe · synthwave · hud-telemetry · riso-print · colorful-flat bento-dark · bauhaus-geometric)의 글자가 그 색이 된다. 템플릿·패턴·부품 글자가 놓인 면의 글자색으로 바뀌어 Axis·Tag·StatNumber·StatCard·EdgeLabel 등 부품을 직접 쓰는 자리의 기본 글자색이 바뀐다. (다) 연결선 대시 범위(KAN-070) — UML·BPMN·ArchiMate·SysML·DMN·ER·Packet 템플릿 22개의 선은 가이드 대시를 따르지 않고, SitemapTree·WorkBreakdownStructure 가지와 IsometricScene 연결선은 따른다. 카탈로그 가이드는 모두 실선이라 지금 그림은 그대로다. (라) visualization README 의 Provider 밖 서술을 고쳤다(선은 안 그려지고 화살촉만 검게 남는다). 코드 변경은 없다
- 2026-10-12T16:08 · s:b3fee064 · S3 done — 배포본 6개를 스크래치 폴더에 npm install(react·react-dom 19)로 받음 — version 6개 기대와 같음, 의존은 실제 버전(core·foundations·visualization → tokens 2.0.0, style-guide-catalog → core 1.2.3·tokens 2.0.0, visualization-style-guide-catalog → visualization 2.0.0·tokens 2.0.0), workspace: 0. Node 이름 import 6개 성공(export tokens 22 · core 258 · foundations 78 · style-guide-catalog 175 · visualization 210 · visualization-style-guide-catalog 41). 변경 4건: 069 tokens d.ts 에 readonly tagColor·titleWeight·iconStyle 0건, visualization dist 계약 스타일시트에 data-viz-part="boundary" 와 --bbangto-viz-boundary-dash-pattern · 070 visualization dist 에 data-viz-notation 75곳 · 072 visualization README:163·236 화살촉 서술 · 075 tokens d.ts:521 readonly ink?, visualization-style-guide-catalog dist 에 artdeco 크림 #EFE6D0. 외부 앱 문구는 바로 위 줄
