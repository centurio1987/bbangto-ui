---
card: KAN-065-XSHEMV
batch: 2
created: 2026-10-08
branch: KAN-065-XSHEMV
status: 계획
steps: S3, S4, S5
---

# KAN-065-XSHEMV 배치2 — 미달 6곳과 없는 변수 5줄을 고치고 게이트 5종으로 닫는다

카드: [KAN-065-XSHEMV.md](../cards/KAN-065-XSHEMV.md) · 범위 `S3` · `S4` · `S5`
선행: [배치1](KAN-065-XSHEMV.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

배치1 의 빨강 둘(모티프 포커스 10건, 없는 변수 5줄)과 브라우저 항목 하나를 초록으로 돌린다. 새 색은 짓지 않는다 — 모두 이미 있는 토큰을 읽게 바꾼다.

## 1. 작업 패키지

### WP1 · `S3` 미달 6곳을 포커스 색 토큰으로

| 파일 | 바꾸는 것 |
|---|---|
| `neobrutalismEditorial.tsx` | `outline` 색 `var(--bbangto-ext-accent, #E9C766)` → `var(--bbangto-semantic-border-focus, #A9881C)` |
| `minimalSaas.tsx` | `box-shadow` 고리 색 `var(--bbangto-ext-ring, …)` → 포커스 색 토큰. `outline: none` 과 3px 고리 모양은 그대로 |
| `tactileTexture.tsx` | `outline` 색 `var(--bbangto-ext-hyperreal-gloss, …)` → 포커스 색 토큰. 광택 변수는 배경 광택에 계속 쓴다 |
| `gothicMedievalDigital.tsx` | `outline` 색 `var(--bbangto-ext-neon-block, …)` → 포커스 색 토큰. neon-block 은 hover 블록에 계속 쓴다 |
| `shatteredGlassCinematic.tsx` | `outline` 색 `${GOLD}` → 포커스 색 토큰 |
| `iridescentChrome.tsx` | `outline` 색 `${LILAC}` → 포커스 색 토큰 |

대체값은 그 style guide default 색 스킴의 `border.focus` 값으로 둔다. 소개 문구(`specs`·`rules`)에 적힌 포커스 색이 바뀐 색과 어긋나면 함께 고친다.

**완료 기준**: 모티프 포커스 검사 초록(위반 0). 배치1 의 브라우저 항목 초록. 바뀐 색이 전략 「접근」 5의 표 12행과 같다.

### WP2 · `S4` 없는 변수 5줄 바로잡기

| 자리 | 바꿀 변수 |
|---|---|
| `aiSurrealGradient3d.tsx:200·201` | `--bbangto-semantic-focus` → `--bbangto-semantic-border-focus` |
| `blueprintTechnical.tsx:128` | `--bbangto-semantic-bg-elevated` → `--bbangto-semantic-background-elevated` |
| `scandiWarm.tsx:161` | `--bbangto-semantic-border` → `--bbangto-semantic-border-base` |
| `spatial3d.tsx:185` | `--bbangto-semantic-border` → `--bbangto-semantic-border-base` |

대체값은 그대로 둔다.

**완료 기준**: 없는 semantic 변수 검사 초록(0줄).

### WP3 · `S5` 문서와 마무리

- 루트 `README.md` 포커스 대비 단락에 「style guide 모티프 CSS 의 포커스 테두리도 같은 규칙으로 잰다(`accessibility.test.ts`)」를 더한다.
- `.changeset/kan-065-motif-focus.md` — style-guide-catalog patch. 바뀐 style guide 이름을 적는다.
- 게이트 5종, 카드 「검증」 절 「추가 확인」, 검토서.

**완료 기준**: 게이트 5종 초록, 검토로 이동.

## 2. 의존과 순서

`S3`·`S4` 는 파일이 안 겹쳐 순서가 없다. `S5` 는 둘이 끝난 뒤다(게이트 5종이 둘의 결과를 함께 본다).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 통과하던 색 스킴 2개(shattered rose, iridescent default)의 포커스 색이 바뀐다 | 화면에서 rose 의 금색 테두리가 시안, iridescent default 의 라일락이 하늘색이 됨 | 전략에 적은 의도된 결과다. 검토서 판단 항목으로 올린다 |
| minimal-saas 의 반투명 고리가 꽉 찬 고리가 된다 | 고리가 더 진하게 보임 | 같은 3px 고리 모양을 두고 색만 바뀐다. 검토서 판단 항목으로 올린다 |
| 게이트 5종 중 `pnpm test` 가 오래 걸린다 | — | 예산이 아니라 시간 문제다. 실패하면 그 항목만 다시 돌려 확인한다 |

되돌리기 어려운 지점은 없다. work 마다 `kan/KAN-065-XSHEMV/S<n>` 태그를 단다.

## 4. 착수 시점 판단

배치1 과 같은 관점으로 간다. 배치1 이 예산 절반을 넘겼으면 `S5` 를 따로 떼어 다음 세션으로 미룬다.
