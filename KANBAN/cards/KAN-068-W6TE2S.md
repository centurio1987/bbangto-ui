---
card: KAN-068-W6TE2S
title: 미배포 수정분 배포 — KAN-056·060·065 를 KAN-064 major 전에 (사용자 실행 지시 후)
created: 2026-10-10
scope: packages/tokens/package.json, packages/tokens/CHANGELOG.md, packages/foundations/package.json, packages/foundations/CHANGELOG.md, packages/core/package.json, packages/core/CHANGELOG.md, packages/style-guide-catalog/package.json, packages/style-guide-catalog/CHANGELOG.md, packages/visualization/package.json, packages/visualization/CHANGELOG.md, packages/visualization-style-guide-catalog/package.json, packages/visualization-style-guide-catalog/CHANGELOG.md, .changeset/kan-056-template-paint.md, .changeset/kan-060-focus-contrast.md, .changeset/kan-065-motif-focus.md
---

# KAN-068-W6TE2S — 미배포 수정분 배포 — KAN-056·060·065 를 KAN-064 major 전에 (사용자 실행 지시 후)

## 전략
### 무엇을 하는가

main 에 쌓인 changeset 세 장(KAN-056 viz 템플릿 색 · KAN-060 포커스 대비 · KAN-065 모티프 포커스)으로 패키지 버전을 올려 GitHub Packages 에 배포한다. KAN-064 의 큰 버전 올림(major) 4개가 같은 배포에 섞이면, 외부 앱은 지금 범위(`^0.4.0` 등)로 이 수정분을 받지 못한다. 그래서 KAN-064 를 main 에 병합하기 전에 따로 낸다(KAN-064 검토 §3-5, 2026-10-09 유저 선택).

### 착수 시점 상태 (2026-10-10, main 73248c4)

| 패키지 | 배포본 | 다음 | 근거 |
|---|---|---|---|
| tokens | 1.3.0 | 1.4.0 | 060 minor |
| foundations | 1.1.1 | 1.1.2 | 060 patch |
| style-guide-catalog | 0.3.2 | 0.3.3 | 060·065 patch |
| visualization | 0.4.0 | 0.4.1 | 056 patch |
| core | 1.2.0 | 1.2.1 | tokens 의존 올림 |
| visualization-style-guide-catalog | 0.3.1 | 0.3.2 | 의존 올림 |

- 다음 버전은 `pnpm changeset status --verbose`, 배포본은 `npm view` 로 확인했다. major 는 없다(「would release NO packages as a major」). hooks 0.3.1 은 올리지 않는다.
- KAN-055 수행 내역의 정정 줄(2026-10-08T18:18)이 외부 앱에 예고한 다음 배포(tokens 1.4.0 · foundations 1.1.2 · style-guide-catalog 0.3.3 · core 1.2.1)와 같고, visualization 0.4.1 · visualization-style-guide-catalog 0.3.2 가 더 붙는다.
- 마지막 배포(origin/main f49bee4) 뒤 changeset 없이 패키지를 건드린 것은 KAN-062(README·주석)와 KAN-063(시험 파일·README)뿐이다. 둘 다 이번에 버전이 오르는 패키지 안이라 함께 실린다.
- 열린 PR 은 없다.

### 승인 규칙

- 2026-10-10 사용자 「진행」을 착수·push·배포 지시로 받는다. 앞 답변 「KAN-068 을 착수해 배포합니다. push 가 필요하므로 실행 지시를 주실 때 진행합니다」에 대한 답이다.
- push 하면 main 의 로컬 커밋 전부(칸반 커밋 포함, 개수는 S1 에서 센다)가 공개 저장소에 나가고, `.github/workflows/release.yml:6-8` 이 돌아 Version PR 을 만든다. Version PR 병합이 곧 배포다.
- Version PR 의 버전·CHANGELOG 가 위 표와 어긋나면 지시가 있어도 병합하지 않고 멈춰 보고한다.
- 카드 완료 때 카드 브랜치를 main 에 병합해 다시 push 하는 일은 그때 따로 지시를 받는다.

### 흐름

1. 착수는 워크트리 `KAN-068-W6TE2S` 에서 한다. 버전·CHANGELOG·changeset 소진은 CI 가 `changeset-release/main` 브랜치에서 만들므로, 카드 브랜치에는 칸반 기록만 쌓인다. push 는 main 체크아웃에서 한다.
2. S1 push 직전 점검 → S2 push · Version PR 대조 · 병합 → CI 배포 → S3 배포본 확인과 전달.
3. main 체크아웃은 여러 세션이 함께 쓴다. S1 에서 점검한 커밋 뒤에 main 이 움직였으면, 새로 들어온 커밋이 칸반 파일만 건드렸는지 본다. `packages/` 나 `.changeset/` 이 바뀌었으면 S1 을 다시 한다.
4. 병합 뒤 origin/main 에 release 커밋이 생기므로 로컬 main 에 병합한다(`git pull --no-rebase`).

### 다른 카드와의 순서

- KAN-064(검토 승인, 병합 대기): 이 카드가 끝난 뒤 main 에 병합한다(§3-5). major changeset 은 KAN-064 브랜치에만 있어 지금 main 을 push 해도 섞이지 않는다. push 직전에 `.changeset/` 에 kan-064 가 없는지 다시 본다.
- KAN-067(할 일): 아직 main 에 병합되지 않았고 changeset 도 main 에 없다. push 전에 병합되어 changeset 이 생기면 major 가 아닐 때만 함께 싣고 S1 표를 다시 낸다. major 면 push 하지 않고 멈춘다.

### 범위 밖

- 외부 앱 쪽 업그레이드와 그쪽 화면 확인(다른 저장소)
- KAN-064 병합(이 카드 완료 뒤 KAN-064 카드에서 한다)
- 크기 게이트가 배포본도 재게 고치는 일

## 실행 계획
- [x] `S1` push 직전 점검 — main 체크아웃에 MERGE_HEAD·충돌 표시(UU)가 없는지 본다. `.changeset/*.md` 목록과 `pnpm changeset status --verbose` 로 버전 표를 다시 내고, push 할 main 커밋에서 게이트 5종을 돌린다. origin 보다 앞선 커밋 수를 세고, 열린 PR 이 없는지 본다. 완료 기준: 패키지·배포본·다음 버전 표, major 0, 게이트 5종 초록, 점검한 커밋 해시와 나갈 커밋 수
- [ ] `S2` 배포 — main 이 S1 커밋 뒤에 움직였으면 새 커밋이 칸반 파일뿐인지 확인한다 → `git push origin main` → release 실행 초록 · Version PR 생성 확인 → PR 의 버전·CHANGELOG·changeset 소진을 S1 표와 대조 → 같으면 병합, 다르면 멈춘다 → release 실행 초록 확인 → 로컬 main 에 origin/main 병합. 완료 기준: 레지스트리에 새 버전 6개, release 실행 둘(PR 생성·배포) 초록
- [ ] `S3` 배포본 확인과 전달 — 스크래치 폴더에 외부 앱과 같은 길(`npm install`)로 새 버전 6개와 react·react-dom 을 받는다. 배포된 package.json 의 의존이 `workspace:*` 가 아니라 실제 버전인지, Node 에서 이름으로 import 되는지 본다. changeset 마다 배포 dist 에서 수정 하나씩을 찾는다(tokens `focusContrast` export · foundations 포커스 색 하나 · style-guide-catalog 모티프 포커스가 `--bbangto-semantic-border-focus` 를 읽음 · visualization 템플릿에 옛 리터럴 색이 없음). 외부 앱에 전할 문구를 수행 내역에 남긴다. 완료 기준: 6개 설치·import 성공, 수정 4건 확인, 문구 기록

## 검증
### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 1.4.0 · foundations 1.1.2 · core 1.2.1 · style-guide-catalog 0.3.3 · visualization 0.4.1 · visualization-style-guide-catalog 0.3.2 가 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- 이번 배포에 major 가 없다. visualization 이 1.0.0, foundations 가 2.0.0 이 되지 않았다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(test:unit 단계 포함)
- 배포된 core 의 의존이 tokens 1.4.0 이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 세 장의 수정이 배포 dist 에 들어 있다(S3 의 네 가지)
- 외부 앱에 전할 문구가 수행 내역에 있다. 바뀐 동작(포커스 테두리 색이 바뀐 색 스킴 · viz 템플릿 기본 색이 가이드를 따름 · shattered-glass rose 포커스 금색)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens foundations core style-guide-catalog visualization visualization-style-guide-catalog; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-core@1.2.1 … react react-dom
# node -e "import('@centurio1987/bbangto-ui-tokens').then(m => console.log(typeof m.focusContrast))"
```

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-10T00:20 · s:bea40e0e — `전략` 섹션 교체
- 2026-10-10T00:20 · s:bea40e0e — `실행 계획` 섹션 교체
- 2026-10-10T00:20 · s:bea40e0e — `검증` 섹션 교체
- 2026-10-10T00:40 · s:bea40e0e — 인스턴트 예외 동의(2026-10-10 유저) — work 3개(S1~S3)가 점검 → push·배포 → 배포본 확인 순서로만 돌고, 저장소에서 바꾸는 파일은 칸반 기록뿐(버전·CHANGELOG 는 CI Version PR). 배치 문서·계획 리포트 생략. KAN-067 겹침은 용인(유저 선택)
- 2026-10-10T00:40 · s:bea40e0e · S1 doing — 착수
- 2026-10-10T00:42 · s:bea40e0e · S1 done — 점검 커밋 main 7093fcd(워크트리 바탕과 코드 같음), MERGE_HEAD·UU 없음. changeset 3장(056·060·065). 다음 버전: tokens 1.3.0→1.4.0 · foundations 1.1.1→1.1.2 · style-guide-catalog 0.3.2→0.3.3 · visualization 0.4.0→0.4.1 · core 1.2.0→1.2.1 · visualization-style-guide-catalog 0.3.1→0.3.2, major 0 (npm view 배포본 = 로컬 version, hooks 0.3.1 미대상). 게이트 5종 초록: install · build · typecheck · test 1293/1293(193파일) · storybook build · test:unit 647(크기 게이트 포함). 나갈 커밋 126개(칸반 90), origin 쪽 새 커밋 없음, 열린 PR 없음, .changeset 에 kan-064·kan-067 없음
