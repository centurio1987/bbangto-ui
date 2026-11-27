# 인수인계 — bbangto-ui main

다른 머신에서 새 세션을 열었을 때 어디서부터 이어 갈지 찾는 문서입니다.

| 항목 | 값 |
|---|---|
| 기준 시각 | 2026-11-27 (KST) |
| 브랜치 | `main` |
| 이 머신의 작업 트리 | `/home/centurio/bbangto-ui` (리눅스 머신. 앞선 인수인계는 `/Users/centurio/bbangto-ui` 에서 썼습니다) |

## 진행 중인 브랜치

없습니다. `KAN-082-MD50S0`(viz 도식 스펙 표현력 확장)은 카드 여섯 장이 모두 검토 승인을 받아 완료 칸으로 갔고, 2026-11-27 에 main 에 병합했습니다(`c727fb7`). 로컬 카드 브랜치는 지웠습니다.

## main 의 지금 상태

- **원격에 아직 올리지 않았습니다.** 이 머신의 main 은 `origin/main` 보다 70여 커밋 앞입니다(KAN-082 병합 · 검토 판정 기록 · 이 문서). 올리면 changesets(패키지 버전 기록 도구) 봇이 릴리스 PR #14 를 갱신합니다 — KAN-082 의 변경셋 다섯(`.changeset/kan-082-*.md`, visualization minor)이 함께 실립니다.
- 원격의 `origin/KAN-082-MD50S0` 브랜치는 그대로 있습니다. 이 머신에서 쌓은 검토 반영 커밋(S20 등)은 그 브랜치가 아니라 병합된 main 에만 있습니다.
- `KANBAN.md` 의 「진행 중」 · 「검토」 칸은 비어 있습니다.
- 「할 일」: `KAN-084-QGNC19`(세 부품 진한 면 글자색). 고칠 곳이 KAN-082 범위와 겹쳐서, 계획을 세울 때 순서를 정하기로 돼 있습니다.
- 백로그의 `KAN-080-RN47PY`(템플릿 조립 가능성 P5~P11)는 KAN-082 다음에 하기로 직렬 중재(순서를 정해 두는 칸반 기록)가 걸려 있습니다(2026-11-24 주인 결정, `38be1fa`). KAN-082 가 끝났으므로 KAN-080 은 **전략을 다시 세운 뒤에** 시작할 수 있습니다(`dep-serialize --pair KAN-080-RN47PY,KAN-082-MD50S0 --restrategy-done`).
- 이 머신은 언어 설정이 `LANG=ko_KR.UTF-8` 이라 `pnpm test` 에서 Calendar 스토리 7건이 「January 2025」 글자를 못 찾아 실패합니다. `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 pnpm test` 로 돌리면 1331건 모두 통과합니다(2026-11-27 확인).

## 다음 할 일

1. main 을 원격에 올릴지 정합니다(올리면 릴리스 PR #14 가 갱신됩니다).
2. KAN-080 · KAN-084 의 순서를 정하고 시작합니다. KAN-080 은 시작 전에 전략을 다시 세웁니다(위 직렬 중재).

## 다른 머신에서 이어 가는 법

```bash
git clone https://github.com/centurio1987/bbangto-ui.git   # 처음이면
cd bbangto-ui && git fetch && git switch main
pnpm install                                   # pnpm 9.15.0, Node 18 이상
pnpm --filter storybook exec playwright install chromium   # pnpm test(브라우저 시험)용
```

- 작업 규칙과 품질 게이트 다섯은 `CLAUDE.md` 에 있습니다.
- 칸반 작업에는 `~/.claude/skills/manage-kanban` 스킬이 있어야 합니다. 이 저장소가 아니라 `~/.claude` 설정 저장소에 들어 있습니다.
- 로컬 게이트에 필요한 환경 변수는 찾지 못했습니다(루트와 storybook 의 package.json 스크립트만 봤습니다). CI 배포 단계는 `NODE_AUTH_TOKEN` 을 씁니다.
- `kan/*` 롤백 태그는 `git fetch --tags` 로 받습니다. 이 머신에서 단 `kan/KAN-082-MD50S0/S20` 은 아직 원격에 없습니다.

## 마지막 세션 요약

- 요청: 「이어서」, 그 뒤 카드마다 「검토 판정을 읽고 처리해 주세요」.
- 한 일: KAN-082.1 검토서 세 항목을 반영 결과에 맞춰 「승인」 선택지로 고침 → 여섯 장 검토 화면을 허브에 띄움 → KAN-082.3 2번 의견(「레이아웃 깨짐, 글자, 도식 겹침 등이 발생하지 않도록」)을 S20 으로 반영(배포 도식 두 템플릿이 그리기 전에 상자를 맞춘다) → 여섯 장 모두 승인 → 하위부터 완료 · 루트 완료 → merge-record → main 병합.
