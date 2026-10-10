---
card: KAN-072-KW0G9B
batch: 2
created: 2026-10-10
branch: KAN-072-KW0G9B
status: 계획
steps: S5
---

# KAN-072-KW0G9B 배치2 — 검토 의견 3·4 반영

카드: [KAN-072-KW0G9B.md](../cards/KAN-072-KW0G9B.md) · 범위 `S5`
선행: [배치1](KAN-072-KW0G9B.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

검토서 의견 3·4 가 검토자 판정으로 승인됐다(2026-10-10, 유저 위임). 둘 다 문장을 고치는 일이라 work 하나로 묶는다.

## 1. 작업 패키지

### WP1 · `S5` 검토 반영

| 자리 | 고치는 것 |
|---|---|
| `README.md:33`(루트) | 의견 3 — 「그 절은 core 1.2.2 · visualization 1.0.0 부터 설치한 패키지 안에도 들어 있다」를 되살린다 |
| `packages/visualization/README.md:163` | 의견 4 — 「엣지는 보이지 않는다」를 「엣지는 선이 그려지지 않아 검은 화살촉만 남는다」로 |
| `packages/visualization/README.md:235-236` | 의견 4 — 같은 서술. 실측 근거에 `VizOutsideProvider` 를 더한다 |
| `.changeset/kan-072-viz-readme-arrowhead.md`(새 파일) | 의견 4 — visualization patch |

**완료 기준**: 두 문장이 `VizOutsideProvider` 단언과 배포 버전(main `a15549a`)과 같은 사실을 말한다. main 병합(KAN-070 포함) 뒤 게이트 5종이 초록이다.

## 2. 의존과 순서

배치 밖 의존은 하나다. main 을 먼저 받아 왔다(`9ee7455`, KAN-070 이 같은 viz README 267줄 근처와 Flowchart 를 고쳤다). 테스트는 이미 있다 — `VizOutsideProvider` 가 화살촉 검정을 단언하므로 새 테스트는 쓰지 않는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| KAN-070 의 Flowchart·계약 스타일시트 변경이 Provider 밖 렌더를 바꿨다 | `VizOutsideProvider` 빨강 | 게이트의 `pnpm test` 가 잡는다. 빨강이면 README 를 고치기 전에 다시 잰다 |

되돌리기 어려운 지점은 없다. `kan/KAN-072-KW0G9B/S5` 태그를 단다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(배치1 과 같음, 2026-10-10 유저 선택).** work 하나라 미룰 것이 없다.
