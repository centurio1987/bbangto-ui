---
card: KAN-044-3KYT2Q
batch: 3
created: 2026-08-25
branch: KAN-044-3KYT2Q
status: 계획
steps: S5, S6
---

# KAN-044-3KYT2Q 배치3 — 정리 실행 계획과 리포트 발행

카드: [KAN-044-3KYT2Q.md](../cards/KAN-044-3KYT2Q.md) · 범위 `S5` `S6`
선행: [배치2](KAN-044-3KYT2Q.batch2.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S5` 정리 실행 계획

판정을 **후속 카드**로 옮긴다. 이 카드는 지우지 않으므로, 나오는 것은 실행 지시가 아니라
실행 가능한 카드 분해안이다.

- 후속 카드 후보마다 범위(`scope` 글롭)·순서·되돌리기 방법.
- 루트 독립성을 미리 본다 — 후속 카드끼리, 그리고 `KAN-045`(README 재작성)와 경로가 겹치면
  그 사실을 지금 적는다. `README.md` 는 KAN-045 의 것이므로 정리 카드가 건드리면 안 된다.
- 리스크: 참조가 걸린 문서를 지우면 `CLAUDE.md` 지시나 스토리·스크립트가 깨진다. 문서마다
  "지우기 전에 고칠 곳"을 붙인다.

**완료 기준**: 후속 카드 후보가 범위와 함께 목록으로 나온다. 참조 있는 폐기·이관 대상마다
선행 수정 지점이 적힌다. `KAN-045` 와의 겹침 판정이 한 줄로 나온다.

### WP2 · `S6` 계획 리포트 발행

```
python3 <스킬>/scripts/kanban.py report-data <root> --card KAN-044-3KYT2Q
python3 <스킬>/scripts/authoring.py status          # authoring-kit 있으면 kanban-report 집필
python3 <스킬>/scripts/report.py <root> --card KAN-044-3KYT2Q [--draft <초안.md>]
```

그다음 `Artifact` 로 발행해 링크를 유저에게 준다.

**완료 기준**: `KANBAN/reports/KAN-044-3KYT2Q.report.html` 이 존재하고 외부 요청 0건
(`grep -oE '(src|href)="https?://' … | wc -l` → 0). `derived-status` 에서 `fresh`.
Artifact 링크가 유저에게 간다.

## 2. 의존과 순서

WP1 → WP2 순차. 리포트는 계획을 그리는 것이라 계획이 먼저다.
배치2의 판정 전량이 있어야 WP1 이 선다(배치 밖 의존).

## 3. 리스크

- **authoring-kit 미설치** — 대화형이면 설치를 묻고, 아니면 voice 미적용으로 진행한다
  (리포트 머리에 `voice 미적용` 배너가 박힌다). 조용히 다른 문체로 내보내지 않는다.
- **리포트에 없는 수치를 쓰는 것** — 소요 시간·인원·비용은 측정된 적이 없다. `report-data`
  출력에 없는 수치는 쓰지 않는다.
- **후속 카드를 이 배치에서 실제로 `add` 하는 것** — 그건 별개 전진이고 유저 승인 대상이다.
  이 배치는 후보 목록까지만 낸다.

## 4. 착수 시점 판단

착수할 때 채운다.
