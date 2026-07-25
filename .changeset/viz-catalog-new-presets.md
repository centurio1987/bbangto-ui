---
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': minor
---

ORD-009: 88장 사진별 재분류(style-classification.md)에서 새로 파악된 preset들을 카탈로그에 추가.

- **신규 스타일 가이드 3종**
  - `Corporate_Schematic_01` — F2 Corporate_Schematic(24장 최대 패밀리). 흰 바탕·중립 헤어라인 1.25px·kind별 플랫 액센트 타일(브랜드 무관 중립 조정값)·대시 존 경계. colorway `default` + `slide-dark`(#1B1B3A 다크 그라운드).
  - `Ink_Line_Duotone_01` — F5 Ink_Line_Duotone(신규 발견 패밀리). 지터 없는 균일 1.75px 모노라인·블랙+블루 듀오톤·무채움(컨테이너만 라이트 틴트). colorway `default` + `slate`(그레이+퍼플).
  - `Neon_Gradient_Dark_01` — F7 Neon_Gradient_Dark(신규 분리 패밀리). 다크 그라운드·wrapper 레벨 `<defs><linearGradient>` 그라디언트 채움(CSS var stop-color로 colorway 연동)·흰 헤어라인 엣지·절제된 글로우·외부 라벨 규칙. colorway `default` + `aurora`(네온 그린/다크 네이비).
- **기존 가이드 foundation preset 보강**
  - `Minimal_Line_01`에 `editorial` preset — F1 최빈 서브모드(크림 그라운드 + 솔리드 레드 #E8321F 그래픽 블록 액센트).
  - `Colorful_Flat_01`에 `bento-dark` preset — 블랙 그라운드 + 피치/오렌지 램프(infographic_colorful_05).
- `makeVizColorway`에 `edge.stroke` 색 override 추가(잉크≠엣지색 듀오톤 지원, 색 전용 불변식 유지).
