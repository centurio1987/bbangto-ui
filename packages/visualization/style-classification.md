# Visualization Style Classification — 사진별 분석 기반 스타일 재분류

> `diagram-references/` 88장을 **폴더 분류와 무관하게** 사진별로 개별 분석(배경/스트로크/채움/팔레트/차원감/도형 언어/타이포/커넥터/그림자/질감)한 뒤,
> 시각 속성 군집으로 스타일 패밀리를 정의한 문서. `visualization-catalog.md` §4의 스타일 가이드 인벤토리가 이 분류를 따른다.
>
> **핵심 결론: 폴더(minimal/colorful/isometric/hand-drawn) ≠ 스타일.**
> 실측 결과 "hand-drawn" 폴더 20장 중 6장은 지터 없는 클린 벡터(F5/F2)였고, "isometric" 폴더 22장 중 8장은
> 페인트가 기업 도식 언어(F2)인 클린 다이어그램이었으며, "minimal"과 "colorful"은 각각 F1/F2/F3에 걸쳐 섞여 있었다.
> 아이소메트릭은 **스타일이 아니라 geometry**(투영)이고, 같은 투영 위에 서로 다른 페인트 패밀리가 존재한다.

## 분류 방법

1. 88장 각각에 대해 15개 속성 레코드 작성: 배경(색+질감) / 스트로크(색·굵기·선질: clean vector vs 지터 vs 브러시) /
   채움(none/flat/gradient/texture) / 팔레트(hex+채도 성격) / 차원감 / 도형 언어(radius·geometric vs organic) /
   타이포(계열·굵기 대비·케이스) / 커넥터(라우팅·화살촉·대시) / 그림자·광 / 질감 / 스타일 자유 라벨.
2. 폴더명은 분석 입력에서 배제(분석 지시문에 명시).
3. **페인트 언어**(스타일 가이드가 주입할 층) 기준으로 군집화. 투영(iso/flat)은 geometry이므로 분류 축에서 분리 —
   단, 페인트 자체가 면분할 명암(F6)이나 광택 그라디언트(F7)일 때는 페인트 패밀리로 성립.
4. 판독 불가/무관 이미지는 제외 목록에 기재.

## 스타일 패밀리 7종 (관측 빈도순)

| # | 패밀리 | 장수 | 시그니처 | 구현 상태 |
|---|---|---|---|---|
| F2 | Corporate_Schematic | 24 | 흰 바탕·헤어라인 중립선·브랜드 액센트 타일·대시 경계·orthogonal+소형 화살촉 | **Corporate_Schematic_01 ✓ (ORD-009)** |
| F1 | Editorial_Accent | 16 | 웜 뉴트럴 바탕·잉크·절제된 단일 액센트·초대형 숫자↔미세 캡션·무그림자 | Minimal_Line_01 ✓ (`editorial` preset 추가 — ORD-009) |
| F4 | Marker_Sketchnote | 16 | 진짜 지터 잉크·손글씨·형광 하이라이트(노랑 최빈)·종이/보드 질감 | 스펙만 (구 HandDrawn_Marker_01 — 지터 렌더 블로커) |
| F6 | Iso_ColorBlock | 8 | 면별 3단 플랫 명암(그라디언트 없음)·뮤트 단일 색족·샤프 프리즘 | 스펙만 (구 Isometric_Prism_01 일부 — iso geometry 블로커) |
| F7 | Neon_Gradient_Dark | 7 | 다크 그라운드·광택 멀티휴 그라디언트·흰 헤어라인 엣지·글로우 | **Neon_Gradient_Dark_01 ✓ (ORD-009)** |
| F3 | Flat_Pop | 6 | 고채도 플랫 채움·굵은 네이비 아웃라인·오프셋 솔리드 섀도·스타디움 필 | Colorful_Flat_01 ✓ (`bento-dark` preset 추가 — ORD-009) |
| F5 | Ink_Line_Duotone | 6 | 지터 없는 균일 모노라인·블랙+블루 듀오톤·채움 없음/라이트 틴트 | **Ink_Line_Duotone_01 ✓ (ORD-009)** |
| — | 아웃라이어 | 3 | 단독 스타일 (블롭 마인드맵, 프린트 콜라주, 맥시멀 콜라주) | 대상 아님 |
| — | 제외 | 2 | 다이어그램이 아님 (광고 사진 2장) | — |

합계 88장. 기존 문서가 "판독 불가 2장"이라 했던 것 중 `infographic_colorful_06`도 재분석 결과 광고 사진으로 확인(제외 2장 = minimal_03, colorful_06; colorful_01은 저신뢰 썸네일이지만 차트 콜라주로 F2 잠정 배정).

---

## 전수 배정표 (88장)

### F1. Editorial_Accent — 16장

| 이미지 | 근거 요약 |
|---|---|
| mermaid_minimal_01 | off-white #F7F7F6 + 무채색 블랙 필 바·볼드 제목 vs 라이트 캡션 |
| mermaid_minimal_02 | 라이트 그레이 + 블랙 헤어라인 서클·액센트만 솔리드 |
| mermaid_minimal_03 | off-white + 모노스페이스 타이포·파스텔 필 라벨 (mono 타임라인 변형) |
| mermaid_minimal_04 | 크림 #F0EDE4 + 딥레드 #C0392B 서클 단일 액센트·거대 숫자 |
| mermaid_minimal_08 | 웜 베이지 #F0EBE2 + 블랙 도트 + 블루 글로우/오렌지 2액센트 |
| mermaid_colorful_05 | 위와 동일 구성의 스펙트럼 차트(크림 #F0EBE1 + 글로우) — 폴더만 다름 |
| mermaid_isometric_04 | 종이 질감 #F2F1EE + 러스트 #C0654A 단일 액센트 (F1 페인트 × 액소노메트릭 geometry) |
| mermaid_isometric_06 | 페일 틸 바탕 + 다크레드 액센트 서클 프린트 포스터 변형 |
| system_minimal_01 | 탄/베이지 #E4DDD0 + 틸네이비 + 오렌지 액센트 어시 듀오톤 |
| system_minimal_03 | 페일 크림 + 도트 그리드 + 블랙 박스 + 오렌지 #F2994A 단일 액센트 (픽셀 아이콘 변형) |
| system_minimal_08 | off-white + 틸그린 #146B4E 단일휴 모노라인 (라인아트 서브모드의 원형) |
| infographic_minimal_01 | 크림 #F0ECE2 + 레드 #E8321F 듀오톤 블록·초대형 숫자 |
| infographic_minimal_04 | 동일 크림+레드 서클 세트 |
| infographic_minimal_05 | 동일 세트 변형 (수직 디바이더) |
| infographic_minimal_02 | 라이트 그레이 대시보드·무채색 + 블루 단일 액센트·거대 스탯 숫자 |
| infographic_minimal_06 | 에디토리얼 데이터 저널리즘 스프레드 (다색 카테고리컬 변형) |

**공통 시그니처**: 웜 오프화이트/크림 그라운드(#F0ECE2~#F7F7F6) · 잉크 #1A1A1A · 절제된 1~2 액센트(레드 #E8321F/#C0392B 최빈, 러스트·틸·블루 대체) ·
초대형 디스플레이 숫자 ↔ 미세 캡션의 극단 타이포 대비 · 그림자 없음 · 완전 플랫. 서브모드: (a) 모노라인 라인아트, (b) 솔리드 액센트 블록, (c) 데이터 저널리즘 다색.

### F2. Corporate_Schematic — 24장 (최대 패밀리, Corporate_Schematic_01 구현 ✓)

| 이미지 | 근거 요약 |
|---|---|
| system_colorful_01 | AWS 레퍼런스 아키텍처 — 흰 바탕·블랙 1px·오렌지 #ED7100 아이콘 타일·대시 AZ 경계 |
| system_colorful_02 | FE-BE-DB 플로우 — 헤어라인 박스 + 오렌지/블루 아이콘 스퀘어 |
| system_colorful_03 | Azure 아키텍처 — #0078D4 블루 듀오톤 |
| system_colorful_04 | 대형 멀티티어 AWS — 고채도 아이콘 vs 파스텔 티어 컨테이너 |
| system_colorful_05 | 다크모드 슬라이드 변형 — #1B1B3A 위 고채도 아이콘 타일 |
| system_colorful_06 | ASP.NET — 모노크롬 블루 #4472C4 |
| system_colorful_08 | 엔터프라이즈 AI 플랫폼 — 블루 헤더 바 + 아웃라인 박스 |
| system_minimal_02 | SaaS IA 트리 — borderless 필 + 헤어라인 커넥터 |
| system_minimal_04 | Visio식 박스 다이어그램 — 대시 그룹 경계 |
| system_minimal_05 | Miro식 협업 화이트보드 파스텔 변형 |
| system_hand-drawn_05 | 빈티지 인쇄 플로차트 — **클린 드래프팅 선** (무채색 조상 변형) |
| system_hand-drawn_07 | UML 스윔레인 — **클린 벡터** + 파스텔 그린 액티비티 노드 |
| system_isometric_01 | 클라우드 인프라 도식 (F2 페인트 × iso geometry) |
| system_isometric_02 | Alibaba Cloud 도식 (동일) |
| system_isometric_05 | Cloudcraft식 iso + 도트 그리드 플로어 |
| system_isometric_08 | Cloudcraft식 iso + 마커풍 주석 (F2×F4 하이브리드 주석) |
| mermaid_colorful_01 | 기업 PPT 마인드맵 템플릿 콜라주 |
| mermaid_colorful_04 | 동일 계열 템플릿 콜라주 |
| mermaid_isometric_05 | **플랫 2D** UX 플로차트 (그린 듀오톤·iso 폴더 오분류) |
| mermaid_minimal_07 | SaaS 데이터 리니지 카드 — 흰 카드 + 소프트 섀도 + 파스텔 태그 |
| mermaid_minimal_09 | 소프트 SaaS 앱 플로차트 (네이비/인디고 필) |
| infographic_colorful_01 | 차트 콜라주 (저신뢰 썸네일 — 잠정) |
| infographic_colorful_02 | 기업 바차트 덱 |
| infographic_colorful_08 | pseudo-3D 스텝바 기업 템플릿 |

**공통 시그니처**: 흰/라이트 그라운드(#FFFFFF/#F7F8FA) · 중립 헤어라인 1px(#999/#231F20) · 시맨틱은 **플랫 브랜드 액센트 타일**(오렌지 #ED7100, 애저 블루 #0078D4, 블루 #4472C4 계열) ·
대시 존 경계 · orthogonal-elbow + 소형 화살촉 · 균일 휴머니스트 산스 · 컨테이너는 옅은 파스텔 틴트 · 그림자 없음/최소.
최대 갭이었으나 ORD-009에서 `Corporate_Schematic_01`로 구현 — 레포의 템플릿 자산(Architecture/C4/UML/BPMN 계열)과 가장 궁합이 좋은 페인트 언어.

### F3. Flat_Pop — 6장 (Colorful_Flat_01 ✓)

| 이미지 | 근거 요약 |
|---|---|
| mermaid_colorful_07 | 아키타입 — 네이비 아웃라인 + 고채도 필 + **오프셋 솔리드 섀도** + 스타디움 필 |
| mermaid_minimal_05 | 네온 옐로그린 #D4E82A + 니어블랙 듀오톤 볼드 블록 |
| mermaid_isometric_03 | 블랙/레드 플레이풀 iso 플랫폼 (F3 페인트 × iso geometry) |
| system_colorful_07 | ByteByteGo식 볼드 컬러 필 비교표 |
| infographic_colorful_03 | 다크모드 캔디 차트 UI (#000 + 캔디 브라이트) |
| infographic_colorful_05 | 벤토 그리드 스탯 모자이크 (블랙 + 피치/오렌지) |

**공통 시그니처**: 고채도 플랫 채움 · 굵은 다크 아웃라인(#2B2A4C) 또는 borderless 블록 · 오프셋 솔리드 섀도 ·
스타디움/큰 radius · 헤비 라운디드 산스 ALL-CAPS. 구현된 Colorful_Flat_01이 크림 그라운드 모드를 커버 —
**다크 그라운드(벤토/캔디) colorway가 관측상 절반인데 preset 갭**.

### F4. Marker_Sketchnote — 16장 (스펙만)

| 이미지 | 근거 요약 |
|---|---|
| mermaid_hand-drawn_01 | 파인펜 지터 + 오렌지 #E8703A 배너·그리드 페이퍼 |
| mermaid_hand-drawn_02 | 볼드 마커 3px+ 지터 + 옐로 #F2C230 배너 |
| mermaid_hand-drawn_03 | 무채색 지터 + **크로스해치 음영**(채움 대체) |
| mermaid_hand-drawn_04 | 구아슈 브러시 페인팅 변형 (로열블루+레드 블롭) |
| mermaid_hand-drawn_05 | 냅킨 스케치 무채색 |
| mermaid_hand-drawn_06 | 볼펜 브레인스톰·종이 얼룩 |
| mermaid_hand-drawn_07 | 화이트보드 마커 사진 변형 |
| mermaid_colorful_06 | 노트 괘지 위 네이비 잉크 더블 스트로크 도들 |
| system_hand-drawn_03 | 진짜 지터 잉크 + 옐로 마커 #F2C94C + 블루/레드 액센트 |
| system_hand-drawn_06 | 도트 그리드 연필 지터 + 마젠타 #E91E8C 마커 주석 |
| infographic_hand-drawn_01 | 잉크 지터 + 틸/핑크 파스텔 액센트 |
| infographic_hand-drawn_02 | 단일 블루 마커 지터 레퍼런스 시트 |
| infographic_hand-drawn_03 | 앰버 그라운드 #F5A623 + 볼드 블랙 잉크 듀오톤 |
| infographic_hand-drawn_04 | 니트 핸드라인 + 블랙/옐로 듀오톤 유기 패널 |
| infographic_hand-drawn_05 | **다크 보드** + 페리윙클 마커 + 옐로 하이라이트 |
| infographic_hand-drawn_06 | 레트로 어시 팔레트 인스트럭셔널 포스터 |

**공통 시그니처**: 진짜 지터(roughness/bowing) 잉크 1.5~3px · 잉크 1~2색 제한 · **하이라이트 액센트는 옐로/앰버 #F2C230 최빈(6장)**, 오렌지·핑크 대체 ·
손글씨 타이포 · 종이/도트그리드/화이트보드/**다크보드** 그라운드 · 채움 대신 크로스해치. 기존 HandDrawn_Marker_01 스펙 유지하되 다크보드 colorway 추가.

### F5. Ink_Line_Duotone — 6장 (신규 발견 — 폴더 분류가 숨겼던 패밀리)

| 이미지 | 근거 요약 |
|---|---|
| system_hand-drawn_01 | Workleap 라인아트 iso — **지터 없는 균일 2px**, 블랙+블루 #1E3FE0 듀오톤 |
| system_hand-drawn_02 | "Making Software" 블루프린트 일러스트 — 블루 #3355DD 클린 모노라인 + 픽셀/모노 타이포 |
| system_hand-drawn_04 | 컨셉 루프 — 볼드 블루 커브 + 도트 라인, 클린 벡터 |
| system_isometric_04 | 블루 듀오톤 라인 아이콘 네트워크 |
| system_minimal_07 | SaaS 마케팅 iso 라인아트 — 헤어라인 + 블루 액센트 |
| mermaid_isometric_01 | 아웃라인 큐브 + 단일 퍼플 솔리드 액센트 + 모노 JSON 카드 |

**공통 시그니처**: **지터 없는** 균일 모노라인 1.5~2px · 블랙(또는 그레이) + 블루 계열(#1E3FE0/#3355DD) 잉크 듀오톤 ·
채움 없음 또는 라이트 블루 틴트 · 흰/라이트 그라운드 · 모노/픽셀 디스플레이 타이포 액센트 · 기술 에디토리얼 무드.
"hand-drawn" 폴더에 3장, "isometric"·"minimal"에 각각 흩어져 있어 폴더 기준으로는 존재 자체가 안 보였다.
구현된 가이드 중 최근연은 Blueprint_Technical_01(잉크 keyline 공유)이나, 파스텔 시맨틱 필 없이 순수 라인+단일 액센트라는 점이 다르다.

### F6. Iso_ColorBlock — 8장 (스펙만)

| 이미지 | 근거 요약 |
|---|---|
| infographic_isometric_02 | 면분할 플랫 (네이비퍼플/인디고/핑크/블루 트라이어드) |
| infographic_isometric_05 | 그린 듀오톤 4단 (#1b3a4b→#cfe8a8) 플랫 페이스 |
| infographic_isometric_06 | 동일 그린 듀오톤 키트 포스터 |
| mermaid_isometric_02 | 블루 코퍼레이트 iso 프로세스 (플랫 필 + 면 셰이딩) |
| mermaid_minimal_06 | **무채색** 다이아몬드 스택 변형 |
| system_minimal_06 | 무채색 계단 다이아몬드 변형 |
| system_isometric_03 | 일러스트 iso 데이터센터 (글래스 그라디언트 혼재 — 경계 사례) |
| infographic_colorful_04 | iso 일러스트 피규어 + 컬러 밴드 변형 |

**공통 시그니처**: 아이소메트릭 투영 + **면별 3단 플랫 명암**(top/side/front 별색, 그라디언트 없음) · 뮤트 단일 색족 램프(그린/퍼플/무채색) · 샤프 프리즘.
페인트(3단 면 토큰)는 지금 구조로 구현 가능; iso geometry(투영·depth sorting)가 이연 사유.

### F7. Neon_Gradient_Dark — 7장 (신규 분리 — 구 Isometric 스펙이 F6과 합쳐놨던 패밀리)

| 이미지 | 근거 요약 |
|---|---|
| infographic_isometric_01 | 딥퍼플 그라디언트 그라운드 + 화이트→라벤더 그라디언트 바 + 헤어라인 엣지 |
| infographic_isometric_03 | 다크 네이비 + 오렌지 그라디언트 솔리드/와이어프레임 하이브리드 |
| infographic_isometric_04 | 퍼플 그라디언트 계단 + 캐스트 섀도 |
| infographic_isometric_07 | 시안→퍼플→핑크→오렌지→옐로 니어네온 글래시 바 |
| system_isometric_06 | 글로시 블루 그라디언트 + 프로스티드 글래스 패널 |
| system_isometric_07 | 다크 네이비 + 네온 그린 #3DDC84 글로우 아이콘 |
| mermaid_isometric_07 | 블루→마젠타 그라디언트 콘 + iso 그리드 플레인 |

**공통 시그니처**: 다크 그라운드(#1e1a3d/#4a1a6b 그라디언트) · 광택 멀티휴 그라디언트 채움 · 흰 헤어라인 엣지 · 글로우/소프트 라이트 ·
그리드/다이아 패턴 오버레이. 그라디언트는 SVG defs로 페인트 층에서 구현 가능(Provider defs 인프라 존재) — iso geometry와 분리하면 플랫 차트에도 적용 가능한 페인트 패밀리.

### 아웃라이어 — 3장 (스타일 가이드 대상 아님, 단독 관측)

| 이미지 | 스타일 |
|---|---|
| mermaid_colorful_02 | 유기 블롭 모노크롬 마인드맵 (레드 단색 테이퍼링 브랜치) |
| mermaid_colorful_03 | 듀오톤 프린트 콜라주 (퍼플 하프톤 사진 + 크림) — F1 인접 |
| infographic_colorful_07 | 맥시멀리스트 콜라주 캐러셀 (네온 타일 + 사진 컷아웃) — F3 인접 |

### 제외 — 2장 (다이어그램 아님)

| 이미지 | 사유 |
|---|---|
| infographic_minimal_03 | 사진 기반 SNS 광고 |
| infographic_colorful_06 | 제품 before/after 광고 사진 (재분석에서 신규 확인) |

---

## 구현 매핑과 갭 (우선순위)

| 패밀리 | 대응 가이드 | 상태 · 조치 |
|---|---|---|
| F2 Corporate_Schematic | Corporate_Schematic_01 | **구현 ✓ (ORD-009).** 24장 최대 패밀리 — 브랜드 아이콘 배제 규칙(§5-6) 하에 중립 액센트 타일, kind별 tagColor 혼용(오렌지·그린=다크 텍스트), colorway `default`/`slide-dark`. |
| F1 Editorial_Accent | Minimal_Line_01 | **정합 완료 (ORD-009).** 라인아트 서브모드(a) = default/slate + **`editorial` preset(b)** 추가. 레드 #E8321F는 텍스트 대비 미달(4.07/4.28 실측)이라 그래픽 블록 전용 — guidelines에 금지 규칙 + 다크 레드 #B3271A 대안 명시. |
| F3 Flat_Pop | Colorful_Flat_01 | 커버 ✓ + **`bento-dark` preset 추가 (ORD-009)** — 블랙 그라운드 + 피치/오렌지 램프(infographic_colorful_05). |
| F4 Marker_Sketchnote | HandDrawn_Marker_01 (스펙) | 스펙 유효, **구현 이연 유지**(지터 seeded 렌더·손글씨 폰트·질감 토큰화 블로커). 보강: 하이라이트 최빈 옐로 #F2C230, **다크보드 colorway**, 크로스해치 음영 토큰. |
| F5 Ink_Line_Duotone | Ink_Line_Duotone_01 | **구현 ✓ (ORD-009).** 클린 모노라인 1.75px + 블랙/블루 2잉크 역할 분리(도형/흐름), colorway `default`/`slate`. `makeVizColorway` edge.stroke override가 이 가이드로 추가됨. |
| F6 Iso_ColorBlock | Isometric_Prism_01 (스펙 일부) | 구 스펙에서 그라디언트 요소를 F7로 분리하고 순수 면분할 3단 토큰으로 재정의. **geometry 이연 유지**. |
| F7 Neon_Gradient_Dark | Neon_Gradient_Dark_01 | **구현 ✓ (ORD-009).** wrapper 레벨 `<defs><linearGradient>`(defsPrefix+useId 유일 id, stop=ext var) — iso geometry 없이 플랫 차트/패턴에 적용. 외부 라벨+리더 틱 규칙 구현. colorway `default`/`aurora`. |

## 스타일 가이드 정의 초안 (신규/보정분) — ORD-009에서 구현 완료 (F4/F6 스펙 보강분 제외)

### Corporate_Schematic_01 (신규 — 1순위)
- slug `corporate-schematic-01`. 근거 24장 (F2 배정표).
- foundations: canvas #FFFFFF(그리드 옅게)/#F7F8FA · keyline 중립 헤어라인 1~1.25px #4A4A4A · 시맨틱 kind = **플랫 액센트 타일**
  (오렌지 #E07A1F·블루 #2D6FD1·그린 #2E9E4A·퍼플 #6B3FD1 계열 — 브랜드 무관 중립 조정) · 컨테이너/boundary 옅은 파스텔 틴트 + 대시 경계 ·
  edge 1.25px + 소형 삼각 화살촉 · 균일 휴머니스트 산스, 라벨 12px/태그 10px.
- colorway: `default`(라이트) + `slide-dark`(#1B1B3A 다크 그라운드 + 고채도 타일 — system_colorful_05).
- wrapper: Node(타일형 아이콘 배지 + 흰 카드), Boundary(대시 + 코너 라벨), EdgeLabel(선상 인라인 캡션).
- 접근성: 액센트 타일 위 흰 라벨 4.5:1 검증(오렌지 위 흰색 위험 → 다크 텍스트 전환), 대시 경계선 3:1.

### Ink_Line_Duotone_01 (신규 — 즉시 구현 가능)
- slug `ink-line-duotone-01`. 근거 6장 (F5 배정표).
- foundations: canvas #FFFFFF/#EAEAEA · 잉크 #111111 + 블루 #2B44E0 듀오톤 · stroke 균일 1.75px(지터 없음) ·
  fill none 기본, 강조만 라이트 블루 틴트 #D6E4F7 또는 솔리드 블루 · 모노스페이스 태그/주석 · 도트/대시 보조선.
- colorway: `default`(블랙+블루) + `slate`(그레이+퍼플 — mermaid_isometric_01).
- visual motif: 익스플로디드 리더선(대시 + 소형 화살촉), 커브 스위시 커넥터, 라인 아이콘.

### Neon_Gradient_Dark_01 (신규 분리)
- slug `neon-gradient-dark-01`. 근거 7장 (F7 배정표).
- foundations: canvas 다크 그라디언트(#1E1A3D→#4A1A6B) + 그리드/다이아 패턴 오버레이 · 도형 채움 = defs 그라디언트
  (시안 #29B6E8→퍼플 #8A3FF0→핑크 #E0389E→오렌지 #FF9A1F 램프에서 kind별 구간 할당) · 흰 헤어라인 엣지 1px · 글로우(soft blur) 절제.
- 구현 노트: 그라디언트는 Provider `useVizDefs` 확장으로 주입(defs id prefix 네임스페이스 기존 인프라 재사용). 글로우는 filter 토큰.
- 접근성: 다크 그라운드 위 라벨은 순백 고정, 그라디언트 도형 위 텍스트 금지(외부 라벨 + 리더선).

### 기존 가이드 보정
- **Minimal_Line_01**: `editorial` preset 추가(솔리드 레드 #E8321F 액센트 블록 모드 — F1 최빈 서브모드). 문서상 근거를 "minimal 폴더 23장" → "F1 배정 16장"으로 교체.
- **Colorful_Flat_01**: `bento-dark` preset 추가(블랙 그라운드 + 피치/오렌지 #E8823C — infographic_colorful_05).
- **HandDrawn_Marker_01 스펙**: 하이라이트 기본 옐로 #F2C230, `darkboard` colorway(블랙 그라운드 + 페리윙클 #8FA8E0 + 옐로), 크로스해치 음영 토큰 추가.
- **Isometric_Prism_01 스펙** → **Iso_ColorBlock_01**로 재정의: 그라디언트·글로우 조항 삭제(F7로 이관), 면별 3단 플랫 명암 토큰(top/side/front)만.

## 횡단 관측 (분류에서 드러난 규칙)

1. **투영과 페인트의 직교성**: iso 폴더 22장이 페인트 기준 F2(4)·F5(2)·F6(5)·F7(6)·F1(2)·F3(1)·기타로 분해됨.
   스타일 가이드는 페인트만 정의하고, iso는 geometry 확장(투영 유틸 + iso Node 변형)으로 별도 트랙 유지가 옳다 — 어떤 페인트 가이드와도 조합 가능해진다.
2. **"선질(line quality)"이 최상위 판별자**: clean vector vs 지터 vs 브러시가 패밀리를 가장 강하게 가른다(F4 vs F5 분리 근거).
3. **액센트 전략의 3형**: 단일 액센트(F1/F5), 시맨틱 다색 타일(F2/F3), 램프/그라디언트(F6/F7) — foundations의 palette 슬롯 사용 방식이 패밀리별로 다름.
4. 다크 그라운드 변형이 4개 패밀리(F2/F3/F4/F7)에서 독립 관측 — 다크 colorway는 패밀리 공통 요구.
