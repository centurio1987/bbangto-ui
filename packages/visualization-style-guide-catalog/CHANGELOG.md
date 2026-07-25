# @centurio1987/bbangto-ui-visualization-style-guide-catalog

## 0.2.0

### Minor Changes

- 4fa2a01: ORD-008: DIAGRAM → VISUALIZATION 개편 — headless 아토믹 + 스타일 가이드 주입

  - **BREAKING(사전 1.0 클린 rename, shim 없음)**: `@centurio1987/bbangto-ui-diagram` 패키지는
    `@centurio1987/bbangto-ui-visualization`으로 대체·삭제되었다. `DiagramProvider`/`blueprintTheme`/`dvar`/
    `DiagramTheme`/`DiagramCanvas`/`DiagramMarkers` → `VisualizationStyleGuideProvider`/
    (카탈로그 `blueprintTechnical01VizStyleGuide`)/`vvar`/`VisualizationFoundation`/`Canvas`/`Markers`.
    CSS 변수 prefix `--bbangto-diagram-*` → `--bbangto-viz-*`, data 속성 `data-bbangto-diagram-*` → `data-bbangto-viz-*`.
  - tokens: `VisualizationFoundation`/`VizNodeSemanticKind`/`VizNodeSemanticStyle`/`VizFoundationPreset`/
    `VisualizationStyleGuideTokens` 타입 신설(+ foundation `shape` 그룹).
  - visualization: atoms/molecules 전량 headless 전환(계약 스타일시트 + 시맨틱 data-viz-part), 인포그래픽
    패턴 6종(ProcessSteps/Comparison/TimelineRoadmap/Hierarchy/Cycle/Statistics) + 신규 atom 9종/molecule 3종,
    `nodes/`→`molecules/`, `presets/`→`templates/` 아토믹 재매핑.
  - visualization-style-guide-catalog(신규 0.1.0): Blueprint_Technical_01(구 blueprintTheme 승격, paper/whiteprint) ·
    Minimal_Line_01(default/slate) · Colorful_Flat_01(default/candy) — 각각 foundations/foundation presets/
    wrapper components/guidelines/visual motif 완비.

- b632c67: Visualization 스타일 가이드 카탈로그 6 → 30종 확장 (additive).

  기존 3종(Blueprint_Technical/Minimal_Line/Colorful_Flat) + 신규 발견 3종 위에 24종 추가:

  - **F 계열 신규 가이드**: Iso_ColorBlock · Marker_Sketchnote(hand-drawn) · Swiss_Systematic · Terminal_Ascii · Bauhaus_Geometric · Riso_Print · Hud_Telemetry(+코너 브래킷 wrapper).
  - **패밀리 통합 그룹**: `viz-print-ink`(Riso 리네임 + Halftone_Print + Glitch_Duotone) · `viz-soft-puffy`(Neumorphic + Clay_Playful + Kawaii_Pastel).
  - **P2 1:1 단일 12종**: Neobrutalist · Editorial_Data · Memphis_Pattern · Retro70s_Warm · Dopamine_Max · Bento_Stat · Synthwave · ArtDeco_Luxe · DarkLuxe · Organic_Blob · Ukiyoe_Flat · Pixel_Retro.

  전 가이드 팔레트 실측 대비 감사 통과(over-claim 0). 각각 별도 wrapper·2 colorway preset·게이트 색-스킴 불변식 준수. 기존 3종 export 무변경.

- 9b3fce2: ORD-009: 88장 사진별 재분류(style-classification.md)에서 새로 파악된 preset들을 카탈로그에 추가.

  - **신규 스타일 가이드 3종**
    - `Corporate_Schematic_01` — F2 Corporate_Schematic(24장 최대 패밀리). 흰 바탕·중립 헤어라인 1.25px·kind별 플랫 액센트 타일(브랜드 무관 중립 조정값)·대시 존 경계. colorway `default` + `slide-dark`(#1B1B3A 다크 그라운드).
    - `Ink_Line_Duotone_01` — F5 Ink_Line_Duotone(신규 발견 패밀리). 지터 없는 균일 1.75px 모노라인·블랙+블루 듀오톤·무채움(컨테이너만 라이트 틴트). colorway `default` + `slate`(그레이+퍼플).
    - `Neon_Gradient_Dark_01` — F7 Neon_Gradient_Dark(신규 분리 패밀리). 다크 그라운드·wrapper 레벨 `<defs><linearGradient>` 그라디언트 채움(CSS var stop-color로 colorway 연동)·흰 헤어라인 엣지·절제된 글로우·외부 라벨 규칙. colorway `default` + `aurora`(네온 그린/다크 네이비).
  - **기존 가이드 foundation preset 보강**
    - `Minimal_Line_01`에 `editorial` preset — F1 최빈 서브모드(크림 그라운드 + 솔리드 레드 #E8321F 그래픽 블록 액센트).
    - `Colorful_Flat_01`에 `bento-dark` preset — 블랙 그라운드 + 피치/오렌지 램프(infographic_colorful_05).
  - `makeVizColorway`에 `edge.stroke` 색 override 추가(잉크≠엣지색 듀오톤 지원, 색 전용 불변식 유지).

### Patch Changes

- Updated dependencies [3449f78]
- Updated dependencies [c7fa242]
- Updated dependencies [3e2473c]
- Updated dependencies [b632c67]
- Updated dependencies [4fa2a01]
- Updated dependencies [b632c67]
  - @centurio1987/bbangto-ui-visualization@0.2.0
  - @centurio1987/bbangto-ui-tokens@1.2.0
