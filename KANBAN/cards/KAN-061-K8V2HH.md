---
card: KAN-061-K8V2HH
title: viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기
created: 2026-10-08
scope: apps/storybook/src/stories/visualization/TemplatePaintGate.stories.tsx, apps/storybook/src/stories/visualization/_labelContrastBaseline.ts, packages/visualization/src/templates/**
---

# KAN-061-K8V2HH — viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기

## 전략
<!-- 왜 이 접근인가 · 제약 · 버린 대안. 사람이 자유롭게 편집한다. -->
카드 메모: KAN-056 검토 항목 3(승인)·6에서 나왔다. KAN-056 병합 뒤 착수(검사와 기준 목록이 그 카드에 있다). 원인이 셋으로 갈린다: 불투명 팔레트 면 위 edge.stroke 글자, Requirement 반투명 글자(opacity 0.6·0.8)와 검정 6% 띠, riso-print 등의 shape.fill·edge.stroke 쌍. 카탈로그 대비 게이트가 shape.fill·edge.stroke 쌍을 재는지는 확인 안 함

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->
- [ ] `S1` (첫 단계를 적으세요)

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T17:15 · s:04d9de55 — scope 는 KAN-063 과의 직렬 기록을 위해 겹치는 자리만 먼저 적었다(2026-10-08 유저가 063 먼저로 결정). KAN-063 완료 뒤 전략을 다시 세울 때 실제 범위로 고친다
