---
card: KAN-070-RCG2QV
batch: 2
created: 2026-10-10
branch: KAN-070-RCG2QV
status: 계획
steps: S5
---

# KAN-070-RCG2QV 배치2 — C4 관계선을 가이드 대시에 따르게 (검토 1번 재작업)

카드: [KAN-070-RCG2QV.md](../cards/KAN-070-RCG2QV.md) · 범위 `S5`
선행: [배치1](KAN-070-RCG2QV.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

검토 1번에 검토자가 단 추가 의견(C4 는 표준 태그가 있지만 표기법이 선 모양을 정하지 않는다)을 유저가 받아 「C4는 가이드를 따르게」를 골랐다(2026-10-10). C4 공식 문서(c4model.com/diagrams/notation)는 notation independent 이고, 이 저장소 C4 템플릿 6개에도 점선이 없다.

## 1. 작업 패키지

### WP1 · `S5` C4 재작업

| 파일 | 바꾸는 것 |
|---|---|
| `templates/C4{Context,Container,Component,Code,Dynamic,SystemLandscape}Diagram.tsx` | `Canvas` 두 곳의 `data-viz-notation` 을 걷는다 |
| `apps/storybook/src/stories/visualization/TemplateDashGate.stories.tsx` | 표기법 목록 = 레지스트리 `standard` − C4 여섯. C4 는 관계선 목록으로 |
| viz README · tokens JSDoc · style-classification · changeset | 범위 문장에서 C4 를 빼고 예외 이유를 적는다 |

**완료 기준**: Dash Gate 초록(C4 연결선이 `7px, 3px`), 게이트 5종 초록.

## 2. 의존과 순서

코드 → 게이트 스토리 → 문서 → 게이트 5종. 검토서는 그 뒤 `review-init --refresh` 로 1·2항을 다시 뜨고 1번 상세를 고친다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 「standard 태그 = 대시 끔」 규칙에 예외가 생긴다 | 새 표준 템플릿을 더할 때 예외 목록을 모른다 | 예외를 Dash Gate 한 곳에 이름과 근거로 적고, README 에도 같은 문장을 둔다 |

## 4. 착수 시점 판단

단일 에이전트로 바로 수행한다(배치1과 같은 방식). work 하나라 미룰 것이 없다.
