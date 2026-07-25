---
'@centurio1987/bbangto-ui-foundations': minor
---

Foundation 채택 메타데이터 축(`FoundationMeta`) 인프라 + 전량 backfill (additive).

- **신규 서브패스 `./meta`**: `FoundationMeta` registry/selector(`selectFoundations`) + `foundation.manifest.json`(76종 전량 authored) + `./catalog`(catalog.json) export. 루트 배럴은 미오염(컴포넌트 소비자 번들 무영향).
- `catalog.json` 74→76 정합(누락됐던 amber-dark/amber-light 편입 + carbon 정렬 교정).
- colorScheme·baseTextContrast 파생값은 실측에서 계산하며 over-claim은 생성기가 hard-fail.

기존 `.`(루트) export는 무변경. `./meta`는 opt-in 서브패스.
