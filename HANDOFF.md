# 인수인계 — bbangto-ui main

다른 머신에서 새 세션을 열었을 때 어디서부터 이어 갈지 찾는 문서입니다. 진행 중인 일의 자세한 맥락은 그 브랜치의 `HANDOFF.md` 에 있습니다.

| 항목 | 값 |
|---|---|
| 기준 시각 | 2026-11-25 (KST) 밤 |
| 브랜치 | `main` |
| 이 머신의 작업 트리 | `/Users/centurio/bbangto-ui` |

## 진행 중인 브랜치

| 브랜치 | 한 줄 요약 | 자세한 맥락 |
|---|---|---|
| `KAN-082-MD50S0` | viz 도식 스펙 표현력 확장. 실행 계획 19단계가 끝났고 카드 여섯 장(루트와 하위 `.1` ~ `.5`)이 검토 판정을 기다립니다. main 에 아직 병합하지 않았습니다 | 그 브랜치의 `HANDOFF.md` (`git fetch && git switch KAN-082-MD50S0` 뒤에 엽니다) |

## main 의 지금 상태

- `KANBAN.md` 의 「진행 중」 · 「검토」 칸은 main 에서는 비어 있습니다. KAN-082 카드들은 그 브랜치의 보드에서 검토 칸에 있습니다.
- 「할 일」: `KAN-084-QGNC19`(세 부품 진한 면 글자색). 고칠 곳이 KAN-082 범위와 겹쳐서, 계획을 세울 때 순서를 정하기로 돼 있습니다.
- 백로그의 `KAN-080-RN47PY`(템플릿 조립 가능성 P5~P11)는 KAN-082 다음에 하기로 정했습니다(2026-11-24 주인 결정, `38be1fa`).
- 열린 PR: #14 `chore(release): version packages`. changesets(패키지 버전 기록 도구) 봇이 main 에 push 될 때마다 갱신하는 릴리스 PR 입니다.
- 이번 인수인계 때 올린 main 커밋 두 개는 2026-10-29 에 merge-record(병합된 카드의 기록이 main 을 가리키게 고치는 도구)를 일괄로 돌린 뒤 커밋하지 않고 남아 있던 결과입니다(`9ba1793` 기록 33장 · `29835e6` 리포트 21장).

## 다음 할 일

1. `git fetch && git switch KAN-082-MD50S0` 로 브랜치를 받고, 그 브랜치의 `HANDOFF.md` 「다음 할 일」을 따릅니다.
2. KAN-082 를 병합할 때 `HANDOFF.md` 가 main 과 브랜치 양쪽에 새로 생긴 파일이라 부딪칩니다. 병합 전에 브랜치 쪽 파일을 지울지, 이 파일과 합칠지 정합니다. 병합이 끝나면 이 파일의 「진행 중인 브랜치」 표도 고칩니다.
3. KAN-082 병합 뒤 KAN-080 · KAN-084 의 순서를 정하고 시작합니다.

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
- `kan/*` 롤백 태그 237개는 2026-11-26 에 원격에 올렸습니다. `git fetch --tags` 로 받습니다.
- 이 머신에만 있는 것: `~/.claude/projects/-Users-centurio-bbangto-ui/` 아래 세션 기록(`*.jsonl`).

## 마지막 세션 요약

이 작업 트리에서 연 마지막 작업 세션은 KAN-082 브랜치의 작업 트리를 대상으로 실행 계획을 이어 갔습니다.

- 마지막 요청: 「재개」
- 마지막 답: KAN-082 의 카드 여섯 장이 모두 검토에 있고, 완료로 옮기는 일과 main 병합은 주인 몫이다.
