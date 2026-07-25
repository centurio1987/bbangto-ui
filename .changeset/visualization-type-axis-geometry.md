---
'@centurio1987/bbangto-ui-visualization': minor
---

유형(what) 축 메타 인프라 + iso geometry 프리미티브 + G6 메타 프레임 (additive — 기존 타입 무변경).

- **신규 서브패스 `./type-meta`**: `VizTypeMeta` registry(87종 전량 authored) + `selectVizTypes` soft-weighted selector + `type.manifest.json`. 루트 배럴 미오염(컴포넌트 소비자 번들 무영향). 스타일 축과 직교하는 "무엇을 그리나" 축.
- **진짜 isometric geometry 트랙**: `geometry/isometric`(projectIso 30°투영·depth-sort·iso 커넥터·floor grid) 순수 함수 + `IsoPrism` atom + `IsometricScene` 템플릿. 텍스트 skew 없이 좌표 baking(접근성 불변식).
- **G6 메타 구조 프레임 2종**: `Kruchten4Plus1View`(4+1 뷰) · `ViewpointFrame`(ISO/IEC/IEEE 42010) — 신규 paint 채널 0, 기존 Canvas/Boundary 재사용, 중첩 슬롯으로 타 프리셋 조합.

모두 신규 export/서브패스. 기존 유형/스타일 계약 무변경.
