---
card: KAN-062-E02CMT
title: SVG 속성 안 var() 브라우저 확인 — README 문장과 속성으로 색을 넣는 코드를 실제 동작에 맞추기
created: 2026-10-08
scope: packages/visualization/README.md, packages/visualization/src/atoms/Marker.tsx
---

# KAN-062-E02CMT — SVG 속성 안 var() 브라우저 확인 — README 문장과 속성으로 색을 넣는 코드를 실제 동작에 맞추기

## 전략
착수 전 측정(2026-10-08, Playwright 1.61.0 빌드 chromium 149 · firefox 151 · webkit 26.5)에서 SVG 색·글꼴 속성(`fill`·`stroke`·`font-family`, 중첩 `var(--a, var(--b))` 포함) 안의 `var()` 는 세 브라우저 모두 풀렸다. 계산된 값과 화면 둘 다 확인했다. `transform` 속성 안의 `var()` 는 세 브라우저 모두 안 풀렸다.

그래서 코드는 이미 실제 동작과 맞고, 틀린 것은 문서 쪽이다. README 「명시한 prop 이 이긴다」 항목의 「`var()` 도 attribute 안에서는 무효」와 `Marker.tsx:26` 주석 「presentation attribute는 var()를 지원하지 않으므로」를 측정 결과로 바꾼다. 「presentation attribute 는 author stylesheet 에 진다」는 맞는 말이고 사용자 prop 을 인라인 style 로 넣는 이유이므로 남긴다.

퍼진 정도(템플릿 표본 68개를 서버 렌더로 훑음): `font-family` 속성 안 `var()` 67개 템플릿, 색 속성 안 `var()` 4개 템플릿(UMLComponentDiagram `stroke`, BPMNDiagram·RequirementDiagram·TimelineDiagram `fill`). 모두 풀리는 형태라 style 로 옮기지 않는다. `transform` 속성 안 `var()` 는 표본에 없다. `glitchDuotone.tsx:160` 의 「SVG transform 속성은 var() 미해석」은 측정과 맞아 손대지 않는다.

제약과 결정:
- 동작이 안 바뀌므로 빨강 먼저 쓰는 테스트가 없다. 측정이 그 확인을 대신하고 방법은 수행 내역에 남긴다.
- changeset 은 만들지 않는다 — README·주석만 고친 KAN-063 선례. 그래서 scope 가 KAN-055(.changeset) 와 겹치지 않는다.
- 출시판 Safari 와 옛 판 브라우저는 확인 안 함. README 에 측정한 판과 날짜를 적는다.

버린 대안:
- 속성 안 `var()` 를 전부 style 로 옮기기 — 세 브라우저가 다 푸는데 템플릿 67개를 고치는 일이라 얻는 것이 없다.
- `transform` 속성 안 `var()` 를 막는 회귀 검사 추가 — 지금 위반이 없고, 유저가 검사 없이 바로 진행을 골랐다(2026-10-08).
- 정식 계획(배치 문서·계획 리포트) — 단계 셋, 고칠 파일 둘이라 인스턴트 예외로 생략(2026-10-08 유저 동의).

## 실행 계획
- [ ] `S1` 측정 기록 — 세 브라우저 측정 방법과 결과를 수행 내역에 남긴다. 완료 기준: 측정 판·속성별 결과·화면 확인 여부가 한 줄로 적혀 있다.
- [ ] `S2` README·주석 수정 — README 「명시한 prop 이 이긴다」 항목과 `Marker.tsx:26` 주석을 측정 결과에 맞춘다. 완료 기준: 두 파일에 「속성 안 var() 무효/미지원」 문장이 없고, README 에 측정 판·날짜와 `transform` 예외가 적혀 있다.
- [ ] `S3` 품질 게이트 — 게이트 5종을 돌린다. 완료 기준: typecheck · build · test · storybook build · test:unit 모두 초록.

## 검증
- `bash -c 'grep -rnE "var\(\).{0,40}(무효|지원하지 않)|(무효|지원하지 않).{0,40}var\(\)" packages/visualization/README.md packages/visualization/src'` 결과 0줄.
- README 「명시한 prop 이 이긴다」 항목에 측정 판(chromium 149 · firefox 151 · webkit 26.5)·날짜·`transform` 예외가 있다.
- 품질 게이트 5종 초록: `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T18:30 · s:37aebb27 — `전략` 섹션 교체
- 2026-10-08T18:30 · s:37aebb27 — `실행 계획` 섹션 교체
- 2026-10-08T18:30 · s:37aebb27 — `검증` 섹션 교체
- 2026-10-08T18:30 · s:37aebb27 — 인스턴트 예외로 배치 문서·계획 리포트 생략, 회귀 검사 없음 (2026-10-08 유저 선택: 바로 진행)
- 2026-10-08T18:30 · s:37aebb27 — `검증` 섹션 교체
