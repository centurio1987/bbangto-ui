---
'@centurio1987/bbangto-ui-style-guide-catalog': minor
---

채택 메타데이터 backfill + 선택 helper (additive).

- **`selectStyleGuides(catalog, criteria)`** 신규 export — soft-weighted 스코어링 순수 함수(하드 필터 아님 → shortlist 붕괴 방지). family/domains/tags/characteristics/mood 기준·결정적 tie-break·pending 처리.
- `catalog.manifest.json` 51종 전량 `StyleGuideMeta` authored(pending 0) — AI가 코드 전수검토 없이 카탈로그를 채택 판단할 수 있는 메타 SSOT.
- `meta.displayName` canonical(`Primary_Secondary_01`) 정규화(#29-50 16종 포함).

`selectStyleGuides`는 신규 export, 나머지는 데이터/문서 보강이라 하위호환.
