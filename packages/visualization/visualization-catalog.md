# Visualization Catalog — 레퍼런스 전수 분석·목록화 (ORD-008 Phase R)

`diagram-references/` 88장(3 카테고리 × 4 스타일)을 전수 검토하여, visualization 디자인 시스템이
**새로 생성해야 하는 component(템플릿/패턴/atom/molecule)와 스타일 가이드**를 목록화한 단일 출처 문서다.
이후 정의→설계→구현은 모두 이 목록을 기준으로 한다.

- 분석 대상: `01-mermaid-diagram-types`(30장) · `02-system-concept`(31장) · `03-infographic-patterns`(27장)
- 스타일 축: minimal / colorful / isometric / hand-drawn
- 이번 ORD-008 구현 범위(스필오버 방지 규칙): 패턴 6종 + 그 구성 atom/molecule + 스타일 가이드 3종(Blueprint_Technical_01 / Minimal_Line_01 / Colorful_Flat_01). **여기 목록에만 있고 구현 대상 표기가 없는 항목은 전부 후속 ORDER 이연.**
- 참고: 무관 이미지 2장 제외(`infographic_minimal_03`·`infographic_colorful_06` — 광고 사진; `infographic_colorful_01`은 저신뢰 썸네일이나 차트 콜라주로 잠정 반영). 사진별 전수 분석·스타일 재분류는 `style-classification.md` 참조.
- **유형 전수 인벤토리·백로그 SSOT**: [visualization-type-inventory.md](./visualization-type-inventory.md) (VT-### 90행, 우선순위·상태 포함).
  본 문서는 88장 레퍼런스 분석과 스타일 가이드(§4)의 SSOT로 유지된다.

---

## 1. 템플릿 인벤토리 (기존 26 템플릿 매핑 + 갭)

### 1-a. 기존 템플릿이 커버하는 유형

| 레퍼런스 유형 | 근거 이미지(대표) | 커버 템플릿 |
|---|---|---|
| Flowchart / User Flow | mermaid minimal_09, iso_05, hd_04·07, system minimal_05, hd_05 | `Flowchart` (+ DecisionNode/ProcessNode) |
| Mindmap / Concept Map | mermaid colorful_01·02·03·04·07, hd_06 | `Mindmap` |
| Timeline | mermaid minimal_01·03, iso_06 | `TimelineDiagram` |
| 클라우드/인프라 아키텍처 | system colorful_01·03·04·05, iso_02·05·08 | `ArchitectureDiagram`, `C4*` (부분 — 존/아이콘 원자 갭은 1-c) |
| 마이크로서비스 구성 | system colorful_02·08 | `C4Container/Component`, `ArchitectureDiagram` |
| 액티비티/스윔레인 | system hd_07 | `BPMNDiagram` + `Lane` (fork/join 분자 갭) |
| 레이어드 아키텍처 | system minimal_04, colorful_06 | `ArchiMate*` 근접 |

### 1-b. 신규 템플릿 갭 (전부 후속 ORDER 이연)

> 이 갭 리스트는 [visualization-type-inventory.md](./visualization-type-inventory.md) Registry에 흡수됨 — 우선순위·상태는 그쪽이 SSOT.

| 갭 유형 | 근거 이미지 | 비고 |
|---|---|---|
| SitemapTree (IA/사이트맵 전용) | system minimal_01·02 | 트리 + elbow + 연결점 dot |
| NetworkTopology | system iso_01·07 | 존/방화벽/서버 시맨틱 |
| UserJourneyGantt (journey pill + 날짜축) | mermaid minimal_01, iso_05 | TimeAxis + GanttBar 필요 |
| DataLineage (확장 노드카드 + named link) | mermaid minimal_07 | DetailCard/Sparkline 필요 |
| SpectrumSlider (대립축 다축 척도) | mermaid minimal_08, colorful_05 | quadrant와 별개 유형 |
| RadialGauge / Venn / Matrix | mermaid minimal_02, hd_01·05 | 각각 소형 유형 |
| ScreenFlow (화면 목업 노드 플로우) | system minimal_05, hd_06 | MockupNode 필요 |
| ChartPrimitives (bar/line/pie/donut/treemap…) | infographic 전반, mermaid hd_03 | 기존 PLAN.md G5와 합류 |
| 원형/스파이럴 Phase | system minimal_08, hd_04 | Cycle 패턴이 부분 흡수 |

> 관찰: 엔지니어링 계열(UML/C4/BPMN/ER/ArchiMate)은 레퍼런스에 거의 등장하지 않고 기존 26종이 이미 과커버.
> 레퍼런스의 무게중심은 **인포그래픽·프로세스·저널리 계열** — 이번 패턴 레벨 신설이 정확히 이 갭을 메운다.

### 1-c. 기존 템플릿 보강용 원자 갭 (후속 이연)

Zone/Layer 밴드(라벨 탭·코너 배지 슬롯 포함 중첩 경계), 서비스 아이콘 칩(타일+라벨), 범례 LegendBlock,
회전(세로) EdgeLabel, 캡슐형 LinkLabelChip, Fork/Join 바, 툴팁 DetailCard, DashedGhostNode,
TimeAxis/DateTick, 범용 개념 아이콘 글리프 세트, 협업 마커류(우선순위 최하).

---

## 2. 패턴 인벤토리 (이번 ORD-008 구현 대상 6종)

각 패턴은 headless(geometry+시맨틱 속성만), children/data 양모드, `data-viz-pattern="<kind>"` 방출.

### ① ProcessSteps — 순차 스텝 체인
- 근거: infographic minimal_01·04·05, colorful_04·08, iso_01·04·07, hd_03 / mermaid minimal_04·05, hd_02
- 레이아웃 변형(파라미터 `orientation`): `horizontal` | `vertical` | `zigzag`(좌우 교차 콜아웃) — stair/perspective는 isometric 스타일 이연분
- 수용 기준: step 수 = data 길이, 각 step에 IndexBadge + 라벨, step 간 StepConnector 존재

### ② Comparison — vs 대비 레이아웃
- 근거: infographic colorful_03·06, minimal_01
- 변형(`mode`): `split`(2패널 + 중앙 VsDivider) | `magnitude`(비례 블록 크기 비교)
- 수용 기준: 좌/우 패널 + 중앙 디바이더 구조, 항목 수 = data 길이

### ③ TimelineRoadmap — 연대기/로드맵
- 근거: infographic iso_04·05·06 / mermaid minimal_01·03
- 변형(`orientation`): `horizontal`(chevron/세그먼트 축 + 상하 교차 라벨) | `vertical`
- 수용 기준: 마일스톤 수 = data 길이, 각 마일스톤에 MilestoneMarker + 기간/연도 슬롯

### ④ Hierarchy — 계층/조직
- 근거: infographic iso_05·06, hd_02·04 / system minimal_01·02
- 변형(`mode`): `tree`(노드-간선 재귀) | `pyramid`(PyramidLayer 층상)
- 수용 기준: 루트 1 + 자식 간선 수 = 노드 수 − 1(tree), 층 수 = data 길이(pyramid)

### ⑤ Cycle — 순환 프로세스
- 근거: infographic hd_02(RADIALS)·hd_06, system minimal_08, hd_04
- 변형(`mode`): `ring`(RingSegment 아크 체인) | `orbit`(방사 배치 노드 + 곡선 커넥터)
- 수용 기준: 세그먼트/노드 수 = data 길이, 마지막→처음 연결 존재(순환 폐쇄)

### ⑥ Statistics — 수치 강조/아이콘 정량화
- 근거: infographic minimal_02·06, colorful_02·05·08, iso 전반
- 변형(`mode`): `cards`(StatCard 그리드) | `isotype`(PictographUnit 반복 정량화) | `mosaic`(ProportionBlock 타일)
- 수용 기준: 카드/행 수 = data 길이, 각 값은 텍스트로도 노출(그래픽 단독 금지)

### 2-a. 6종 외 관측 패턴 (목록만 — 후속 이연)

> 이 목록은 [visualization-type-inventory.md](./visualization-type-inventory.md) Registry에 흡수됨 — 우선순위·상태는 그쪽이 SSOT.

ChartPrimitives(순수 차트), Sketchnote 컴포지션, Bento/콜라주 그리드, 방사형 노드링크,
지도(geo) 인포그래픽, 포스터/에디토리얼 타이틀 컴포지션, Pathways 여정형.

---

## 3. 패턴용 신규 atom/molecule (이번 ORD-008 구현 대상)

통합 원칙: 순번 배지·아이콘 칩·아크는 각 1개 컴포넌트로 통합, 커넥터는 기존 Edge+Marker 래핑.

| 컴포넌트 | 레벨 | 책임 | 사용 패턴 |
|---|---|---|---|
| `StatNumber` | atom | 대형 값 + 단위 + 선택적 델타(±)를 타입 스케일 계층으로 렌더 | Statistics, ProcessSteps, Comparison |
| `IndexBadge` | atom | 01/02… 순번 배지(circle/square/pill 변형) | ProcessSteps, TimelineRoadmap, Cycle |
| `IconBadge` | atom | 원형 아이콘 칩/핀(선택적 리더 스템, 아이콘 슬롯=children) | 전 패턴 |
| `RingSegment` | atom | 아크/도넛 슬라이스·게이지 세그먼트(startAngle/endAngle/radius) | Cycle, Statistics |
| `ProportionBlock` | atom | 값 비례 사각 타일(모자이크/크기 비교) | Statistics, Comparison |
| `PictographUnit` | atom | 아이소타입 반복 1단위(부분 채움 지원) | Statistics |
| `MilestoneMarker` | atom | 타임라인 지점/chevron 세그먼트 + 연도/기간 슬롯 | TimelineRoadmap |
| `PyramidLayer` | atom | 사다리꼴 계층 층(폭 비례) | Hierarchy |
| `VsDivider` | atom | 중앙 분할선(수직/대각) + 중앙 라벨 슬롯 | Comparison |
| `StepConnector` | molecule | 순차 항목 간 방향 링크(Edge+Marker 래핑; arrow/dashed/chevron/none) | ProcessSteps, Cycle |
| `CalloutLeader` | molecule | 리더선 + 텍스트 블록(그래픽↔라벨 연결) | ProcessSteps(zigzag), Statistics |
| `StatCard` | molecule | StatNumber + IconBadge + 라벨 합성 카드 | Statistics |
| `geometry/layout.ts` | util | row/column/zigzag/radial/stair 배치 계산(순수 함수) | 전 패턴 |

재사용: Canvas, Node(14 shapes), Edge, Marker, NodeLabel, EdgeLabel, Tag, Boundary, Lane, GridLayer.

---

## 4. 스타일 가이드 인벤토리

> **⚠️ 분류 체계 교체 (2026-07-12)**: 최초 작성 시 폴더 분류(minimal/colorful/isometric/hand-drawn)를 스타일 경계로
> 차용했으나, 이는 수집 시점의 러프 분류일 뿐 스타일이 아니다. 88장을 **사진별 개별 분석 → 시각 속성 군집화**로
> 재분류한 결과가 `style-classification.md`에 있으며, 스타일 인벤토리는 그 문서의 **패밀리 7종**(F1~F7)을 정본으로 한다.
> 요지: 최대 패밀리는 미구현 F2 Corporate_Schematic(24장)이고, 폴더 기준으로는 보이지 않던 F5 Ink_Line_Duotone /
> F7 Neon_Gradient_Dark 두 패밀리가 신규 발견됐다. 아이소메트릭 투영은 스타일이 아니라 geometry로 분리한다.

| 패밀리 (관측 장수) | 스타일 가이드 | 상태 |
|---|---|---|
| F2 Corporate_Schematic (24) | Corporate_Schematic_01 | **구현 ✓ (ORD-009)** — colorway `default`/`slide-dark` (§4-f) |
| F1 Editorial_Accent (16) | Minimal_Line_01 | 구현 ✓ — `editorial` 솔리드 레드 preset 추가 완료 (ORD-009) |
| F4 Marker_Sketchnote (16) | HandDrawn_Marker_01 | 스펙만 — 옐로 하이라이트 최빈·darkboard colorway 보강 (지터 렌더 블로커로 이연) |
| F6 Iso_ColorBlock (8) | Iso_ColorBlock_01 (구 Isometric_Prism_01 재정의) | 스펙만 — 그라디언트 조항은 F7로 분리 (iso geometry 블로커로 이연) |
| F7 Neon_Gradient_Dark (7) | Neon_Gradient_Dark_01 | **구현 ✓ (ORD-009)** — wrapper 레벨 그라디언트 defs, colorway `default`/`aurora` (§4-h) |
| F3 Flat_Pop (6) | Colorful_Flat_01 | 구현 ✓ — `bento-dark` preset 추가 완료 (ORD-009) |
| F5 Ink_Line_Duotone (6) | Ink_Line_Duotone_01 | **구현 ✓ (ORD-009)** — colorway `default`/`slate` (§4-g) |
| (별도) | Blueprint_Technical_01 | 구현 ✓ — 레퍼런스 유래가 아닌 기존 blueprintTheme 승격(사용자 결정 ③) |

명명 규칙은 기존 카탈로그(트렌드+인덱스, 예: Neobrutalism_Editorial_01)를 따른다. 개인정보 금지.
아래 4-a~4-e는 최초 작성분(폴더 기준 근거 문구 포함) — 근거·경계는 style-classification.md가 우선한다.
4-f~4-h는 ORD-009 구현분(패밀리 분류 기준 근거).

### 4-a. Blueprint_Technical_01 (구현 — 기존 blueprintTheme 승격)
- slug `blueprint-technical-01`. foundations = 기존 `blueprintTheme` 값 verbatim.
- foundation presets: `default`(paper) + `whiteprint`(inverted navy).
- visual motif: 정밀 제도(blueprint) — 라벤더 캔버스, 2.5px keyline, 8px radius, mono 태그.

### 4-b. Minimal_Line_01 (구현)
- slug `minimal-line-01`. 근거: 각 카테고리 minimal 폴더 23장.
- **foundations 단서**: 배경 warm off-white `#F4F2EC`(관측 `#F7F7F5`~`#EFECE3` 절충) / ink `#1A1A1A` /
  keyline 1~1.25px hairline / fill 없음(none) 또는 순백 카드 / radius 양극(0 또는 full-stadium — 기본 2px, stadium은 shape로) /
  절제된 단일 액센트 `#E8663C`(coral-orange, 관측 최빈) / 보조 그레이 `#8A8A86` / 그림자 없음.
- **colorway 후보**: `default`(coral 액센트) + `slate`(cobalt blue `#2C5BF2` 액센트, cool grey 배경 `#EDEFF3`).
- **wrapper 후보**: Node(hairline+무채움), Tag(소문자 mono 캡션), EdgeLabel(배경 없는 미세 캡션), Boundary(dashed hairline).
- **visual motif 스펙**: 화살촉 최소(작은 삼각 또는 dot 종단), orthogonal 라우팅, 초대형 숫자↔미세 캡션의 극단 타이포 대비, 넉넉한 여백.
- **접근성 주의**: 관측된 저대비 회색 라벨(`#9AA0A6` on off-white) 금지 — 캡션도 4.5:1 확보. hairline 의미선은 3:1 확보.

### 4-c. Colorful_Flat_01 (구현)
- slug `colorful-flat-01`. 근거: 각 카테고리 colorful 폴더 23장.
- **foundations 단서**: 고채도 flat 다색 팔레트 — red `#E8443B` / amber `#F5B841` / teal `#1FB6A6` / green `#3FBF6F` /
  navy 텍스트·아웃라인 `#1B2A4A` / 배경 옅은 tint `#FDF8F1` / 채운 도형 위 흰 라벨 / stadium·큰 radius(12px) /
  두꺼운 스트로크(2.5~3px) / 오프셋 solid shadow(faux-3D, 관측 colorful_07) 절제 사용.
- **colorway 후보**: `default`(warm 4색) + `candy`(마젠타 `#D9418C`·퍼플 `#6C3FBF` 중심 듀오톤, 관측 colorful_03).
- **wrapper 후보**: Node(flat fill + navy 아웃라인 + 흰 라벨), Tag(채색 pill), EdgeLabel(pill 캡슐 배경).
- **visual motif 스펙**: 곡선/대시 곡선 커넥터, 큰 화살촉, 시맨틱 kind별 색 순환(p1~p8 활용), 번호 배지 강조.
- **접근성 주의**: 채색 타일 위 흰 텍스트 4.5:1 검증 필수(amber/teal 위 흰색은 미달 위험 → 어두운 톤으로 보정), 색 단독 구분 금지(라벨 병기).

### 4-d. Isometric_Prism_01 (스펙만 — 구현 이연)
- slug `isometric-prism-01`. 근거: 각 카테고리 isometric 폴더 22장.
- foundations 단서: 그라디언트 듀오톤(violet→magenta→orange 또는 green→teal→navy), 면별 명암 3단계(top/left/right),
  바닥 투영 그림자, 30° 아이소메트릭 투영, 그리드 평면 배경, 원형 아이콘 핀 + 리더 스템.
- 구현 난점(이연 사유): 투영 변환·depth sorting·리본 커넥터는 headless geometry 레이어 확장 필요.
  텍스트는 skew 금지(평면 오버레이 레이어 분리) — 접근성 필수 규칙.

### 4-e. HandDrawn_Marker_01 (스펙만 — 구현 이연)
- slug `hand-drawn-marker-01`. 근거: 각 카테고리 hand-drawn 폴더 20장.
- foundations 단서: 잉크 1~2색 제한(cobalt `#2B44C7`+black, 또는 black+yellow `#FCE300` 하이라이트),
  seeded jitter(roughness/bowing) 라인, 손글씨 웹폰트, grid/paper/whiteboard 배경 텍스처, 형광 하이라이트 스워시.
- 구현 난점(이연 사유): rough 렌더(필터 or path 변형)의 seeded 결정론 보장, 손글씨 폰트 라이선스,
  텍스처 배경 토큰화. 저대비 마커(화이트보드 노랑/연두) 사용 금지 규칙 필요.

### 4-f. Corporate_Schematic_01 (구현 — ORD-009)
- slug `corporate-schematic-01`. 근거: F2 배정 24장(style-classification.md — 최대 패밀리).
- foundations: 흰 그라운드 `#FFFFFF` / 중립 헤어라인 1.25px `#4A4A4A` / kind별 플랫 액센트 타일
  (오렌지 `#E07A1F`·블루 `#2D6FD1`·그린 `#2E9E4A`·퍼플 `#6B3FD1` — 브랜드 무관 중립 조정값) /
  대시 존 경계 `6 4` / 소형 화살촉(marker 6).
- **kind별 tagColor 혼용**: 오렌지·그린 타일 위 흰 텍스트는 4.5:1 미달 실측(3.01/3.44) → 다크 `#1F1F1F`,
  블루·퍼플은 흰 텍스트. colorway `default` + `slide-dark`(`#1B1B3A`, tagColor 유지·다크-태그 kind fill만 상향).
- wrapper: 카드+좌상단 14×14 액센트 타일 Node / 회색 소형 Tag / 캔버스 칩 EdgeLabel.

### 4-g. Ink_Line_Duotone_01 (구현 — ORD-009)
- slug `ink-line-duotone-01`. 근거: F5 배정 6장(폴더 분류가 숨겼던 신규 발견 패밀리).
- foundations: 균일 1.75px 클린 모노라인(지터 없음 — F4와의 경계) / 블랙 도형 잉크 `#111111` +
  블루 엣지 잉크 `#2B44E0` 2잉크 역할 분리 / fill none 기본(container만 라이트 틴트 `#D6E4F7`) /
  도트 리더선 경계 `2 5` / mono 대괄호 태그. colorway `default` + `slate`(그레이 잉크+퍼플 엣지 `#6B3FD1`).
- `makeVizColorway`에 `edge.stroke` override가 이 가이드를 위해 추가됨(잉크≠엣지색, 색 전용 불변식 유지).

### 4-h. Neon_Gradient_Dark_01 (구현 — ORD-009)
- slug `neon-gradient-dark-01`. 근거: F7 배정 7장(구 iso 스펙에서 분리된 그라디언트 페인트 패밀리).
- foundations: 다크 그라운드 `#1E1A3D`(쇼케이스는 모티프 CSS로 `→#4A1A6B` 그라디언트) / 흰 헤어라인 1px /
  node fill은 램프 세그먼트 시작 stop의 대표 hex(게이트/headless 호환), 실제 그라디언트는 wrapper가
  `<defs><linearGradient>`로 주입(id = defsPrefix+useId 이중 유일, stop-color = `--bbangto-viz-ext-grad-*` var
  → colorway 전환 반응). 글로우는 `drop-shadow` 모티프 CSS. colorway `default`(퍼플 램프) + `aurora`(네온 그린).
- 접근성: 그라디언트 면 위 텍스트 금지 — NeonTag가 외부 순백 라벨+리더 틱으로 구현. 대규모(수백 노드)에선
  defs가 노드 수만큼 생성됨을 guidelines에 명시.

---

## 5. 횡단 구현 규칙 (레퍼런스 유래)

1. **auto-contrast**: 채운 도형 위 라벨은 fill 휘도 기반 흰/검 자동 선택을 스타일 가이드 토큰으로 제공.
2. **값의 텍스트 병기**: 크기/아크/색 인코딩(bubble, RingSegment, ProportionBlock)은 반드시 텍스트 값 병기.
3. **커넥터 스타일 축**: 라우팅(orthogonal/curved/straight) × 선(solid/dashed/dotted) × 화살촉(none/dot/triangle)을
   토큰·prop 양쪽에서 스위치 가능하게 — 스타일 가이드가 기본값을 정하고 개별 prop이 오버라이드.
4. **최소 가독 크기**: 그래픽 내 텍스트 min-font-size 토큰. 장식 텍스트와 정보 텍스트 구분.
5. **순서 정보의 DOM 표현**: IndexBadge 순번은 DOM 순서와 일치시켜 스크린리더 호환.
6. **브랜드 아이콘 배제**: AWS/Azure 등 provider 브랜드 아이콘은 도입하지 않고 중립 아이콘 슬롯만 제공.
