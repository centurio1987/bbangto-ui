---
card: KAN-054-M48FNQ
batch: 4
created: 2026-10-07
branch: KAN-054-M48FNQ
status: 계획
steps: S7, S8, S9
---

# KAN-054-M48FNQ 배치4 — main을 합치고 FeatureGrid와 포커스 표시를 고친다 (검토 반려 재작업)

카드: [KAN-054-M48FNQ.md](../cards/KAN-054-M48FNQ.md) · 범위 `S7` · `S8` · `S9`
선행: [배치3](KAN-054-M48FNQ.batch3.md) — 검토서 §3-5·§3-6 반려(2026-10-07)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S7` main 합치기

`git merge main`. 코드 충돌은 없고(병합 시험 확인) 칸반 파일 넷만 충돌한다. `.kanban/state.json`은 main 쪽(`:3:`)을 건져 `rebuild --salvage`, `KANBAN.md`는 두 쪽 카드를 다 남기고, 보드 뷰는 다시 그린다. 그 뒤 직렬·용인 기록을 main 쪽 값과 대조한다 — `rebuild`는 우리 쪽(카드 브랜치) 기록을 쓰므로 main에서 바뀐 다른 카드의 기록(예: KAN-051 완료로 바뀐 KAN-055 직렬)이 빠질 수 있다.

**완료 기준**: 병합 커밋, `validate` 오류 0, 다른 카드의 직렬·용인 기록이 main과 같다, `pnpm test:unit`(번들 크기 게이트 포함) 초록.

### WP2 · `S8` 게이트 범위 + FeatureGrid 탭

`keyboardCoverage.test.ts`가 읽는 소스를 core `components/`·`blocks/`·`patterns/`·`motion/`으로 넓히고(검사 함수는 그대로), 목록에 FeatureGrid를 더한다. 탭은 Tabs와 같은 규칙: Tab 정지점 하나, ←/→·Home/End, 옮기면 선택도 옮김(자동 활성화).

**완료 기준**: FeatureGrid `Keyboard` 스토리 빨강 → 초록, 커버리지 게이트 초록.

### WP3 · `S9` 포커스 표시 셋

Card·Calendar 날짜 칸·DatePicker 기본 트리거. 포커스를 받을 때 `:focus-visible`이면 `outline 2px solid primary.base`·간격 2px(Gallery 선례). 실제 입력 테스트: Tab으로 오면 테두리가 있고, 마우스로 누르면 없다.

**완료 기준**: 세 실제 입력 테스트 빨강 → 초록, 기존 스토리 초록.

## 2. 의존과 순서

`S7 → S8 → S9`. main을 먼저 합쳐야 S8·S9의 게이트 결과가 병합 뒤 상태를 말한다(번들 크기 게이트). S8과 S9는 서로 독립이다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 병합 뒤 직렬·용인 기록을 잃는다 | `dep-check`의 serials가 main과 다르다 | main 쪽 값과 대조해 같은 사유로 다시 건다(메모리: rebuild --salvage 는 한쪽 기록만 쓴다) |
| 번들 크기 게이트가 이 카드의 증가분으로 빨강 | `bundleBudget.test.ts` 실패 | 어느 진입점이 얼마나 늘었는지 보고 유저에게 보고한다. 상한을 혼자 올리지 않는다 |
| `:focus-visible` 판정이 실제 입력에서도 안 맞는다 | 실제 입력 테스트가 Tab에서도 테두리 없음 | `matches` 대신 마지막 입력이 키보드였는지 기록하는 방식으로 바꾼다 |

## 4. 착수 시점 판단

수행 관점은 이 카드의 선택(단일 에이전트)을 그대로 따른다.

**착수 시(2026-10-07)**: 세 work를 미루지 않고 끝냈다. S7 병합 뒤 잃은 기록은 셋이었다(KAN-051→055 직렬 — main에서는 이미 scope 변경으로 조용히 무효였다, KAN-048→050 직렬, KAN-050·051 용인). S9의 포커스 판정은 `element.matches(':focus-visible')`가 실제 입력에서 기대대로 돌아 대안으로 갈 필요가 없었다.
