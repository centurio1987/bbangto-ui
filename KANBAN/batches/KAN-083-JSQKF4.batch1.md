---
card: KAN-083-JSQKF4
batch: 1
created: 2026-11-24
branch: main
status: 계획
steps: S1, S2, S3, S4
stages: S1 > S2 > S3 > S4
---

# KAN-083-JSQKF4 배치1 — 진한 면 글자색과 Node 래퍼 면 색

카드: [KAN-083-JSQKF4.md](../cards/KAN-083-JSQKF4.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 시작 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지
<!-- work 하나에 WP 하나. 각 WP 는 완료 기준으로 끝난다. 글은 평서로, 이 스킬 안에서만 통하는 낱말과 잘 쓰이지 않는 한자어 없이 쓴다 — 목록은 manage-kanban 의 assets/writing/words.md(SKILL.md 5.10). 여러 낱말로 된 약속된 용어는 「」로 감싼다. -->
### WP1 · `S1` 진한 면 글자색 시험

**완료 기준**: viz `onInk.test.ts` 와 카탈로그 `onInk.test.ts` 에 `shape.stroke` 면 시험이 들어가고, 구현 전이라 「없음」으로 빨갛게 실패한다.

### WP2 · `S2` 진한 면 글자색 구현

**완료 기준**: tokens `on.shape.stroke` · viz `deriveOnInk` 가 `--bbangto-viz-on-shape-stroke` 를 내고, WP1 시험과 가이드 30종 대비가 초록이며 README 면 목록에 적힌다.

### WP3 · `S3` Node 래퍼 면 색

**완료 기준**: 가이드마다 Node 래퍼에 fill · stroke 를 넘기는 vitest 와 Storybook play 가 고치기 전에는 terminal-ascii 로 실패하고, `terminalAscii.tsx` 를 고친 뒤 초록이다.

### WP4 · `S4` 게이트 · 변경셋

**완료 기준**: 게이트 다섯이 초록이고, 변경셋(tokens · visualization minor, 카탈로그 patch)과 품질 체크리스트가 커밋된다.


## 2. 의존과 순서

S2 는 S1 시험을 초록으로 만드는 일이라 S1 뒤다. S3 는 S1 · S2 와 파일이 갈리지만, 카탈로그 시험 실행이 S2 의 타입 변경을 함께 읽으므로 S2 뒤에 둔다. S4 는 앞의 셋을 모두 재므로 맨 끝이다. 배치 밖 의존은 없다. publish-report 쪽 교체는 이 카드가 배포된 뒤의 별도 일이다.

## 3. 리스크

`pnpm test`(Storybook 브라우저 시험)가 가장 오래 걸리는 단계다. 새 워크트리는 `pnpm install` 을 먼저 거쳐야 한다. tokens 의 `on` 타입은 foundations 패키지의 76종 확장 foundation 이 함께 읽으므로, 타입을 넓히는 쪽(선택 칸 추가)으로만 바꾼다.

## 4. 착수 시점 판단

work 넷을 한 묶음으로 둔다. 기본 묶음 크기(work 3~4개) 안이고, 넷 다 작은 변경이라 S4 를 다음 묶음으로 미루지 않는다. 계획 리포트는 만들지 않았다 — 유저가 「검토 전까지 진행」으로 시작과 진행을 함께 지시했다.
