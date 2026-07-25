---
'@centurio1987/bbangto-ui-tokens': minor
---

채택 메타데이터 통제 어휘 + WCAG 대비 유틸 신규 export (additive).

- **메타데이터 어휘/타입**: `StyleGuideMeta`·`FoundationMeta` 타입과 통제 어휘 `STYLE_FAMILIES`·`STYLE_FAMILY_LABELS`·`DOMAINS`·`TAGS`를 `styleGuideMeta`/`foundationMeta`에서 신규 export. UI·viz·foundation 카탈로그가 공유하는 채택 메타 SSOT.
- **WCAG contrast 유틸**(`contrast`): `contrastRatio`·`relativeLuminance`·`parseColor`·`extractColors`·`compositeOver`·`CONTRAST_THRESHOLDS`·`effectiveBgColors` + 타입 `RGBA`. 팔레트 토큰 실측 대비 계산의 범용 순수 수학(카탈로그 accessibility 감사가 소비).

모두 신규 export라 하위호환. 기존 소비처 무변경 동작.
