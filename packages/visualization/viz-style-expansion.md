# Visualization Style Guide Expansion — 카탈로그 풍부화 후보 조사·항목화·구현계획 (KAN-019)

> **KAN-019 deliverable.** "viz 스타일 가이드 카탈로그 수가 매우 적다 → 추가 가능한 디자인 스타일을 조사·수집하고 항목화하고 구현 계획을 세워라."
>
> 최초 KAN-019 분석은 레퍼런스 88장 코퍼스를 사진별로 재분석해 **페인트 패밀리 F1~F7**을 도출했고(`style-classification.md`),
> 그 7개 패밀리는 지금 전부 구현됐다(아래 §1). 즉 **88장 코퍼스는 소진**됐다. 이 문서는 그 코퍼스 **바깥의 새 출처**에서
> viz 카탈로그를 풍부화할 후보를 조사·항목화하고 구현 계획을 세운다. 근거 원칙은 이미 레포에 확립된 **유형 ⊥ 스타일**
> (`visualization-type-inventory.md` §1, `style-classification.md` 횡단관측 1): *한 다이어그램/인포그래픽 유형은 어떤 페인트 언어로도
> 리스킨될 수 있으므로, 다이어그램/인포그래픽으로 성립하는 모든 페인트 언어는 viz 스타일 가이드 후보다.*

---

## 1. 현황과 갭

### 1-a. viz 스타일 가이드 = 8종 (F1~F7 페인트 패밀리 전량 + Blueprint)

| viz 패밀리 | 스타일 가이드 (slug) | 근거 |
|---|---|---|
| F1 Editorial_Accent | `minimal-line-01` | 88-corpus 16장 |
| F2 Corporate_Schematic | `corporate-schematic-01` | 88-corpus 24장 (최대) |
| F3 Flat_Pop | `colorful-flat-01` | 88-corpus 6장 |
| F4 Marker_Sketchnote | `marker-sketchnote-01` | 88-corpus 16장 (KAN-014) |
| F5 Ink_Line_Duotone | `ink-line-duotone-01` | 88-corpus 6장 |
| F6 Iso_ColorBlock | `iso-color-block-01` | 88-corpus 8장 (paint만; 진짜 iso는 KAN-028) |
| F7 Neon_Gradient_Dark | `neon-gradient-dark-01` | 88-corpus 7장 |
| (별도) | `blueprint-technical-01` | 기존 blueprintTheme 승격 |

### 1-b. UI 스타일 가이드 = 51종 (`style-guide-catalog.md` #0–50)

**viz 8 : UI 51 = 갭 43.** 이 불균형이 "매우 적다"의 실체다. UI 카탈로그는 이미 51개의 완성된 **페인트 언어**를
보유하고 있고(각각 foundations + 시각 모티프 + guidelines 저작 완료), 그중 다수는 다이어그램/인포그래픽으로 자연스럽게
번역된다. **UI 카탈로그가 viz 확장의 1차 조사원**인 이유다 — 외부에서 새로 발굴할 필요 없이 레포 내부에 검증된 후보 풀이 있다.

### 1-c. 88-corpus 아웃라이어 3종 — 이제 재검토 대상

`style-classification.md`가 "단독 관측 → 스타일 가이드 대상 아님"으로 보류했던 3장은, UI 카탈로그에 대응 페인트 언어가
저작되면서 **이제 근거를 얻는다**:

| 아웃라이어 이미지 | 당시 판정 | 대응 UI 스타일 (신규 근거) |
|---|---|---|
| `mermaid_colorful_02` 유기 블롭 모노크롬 마인드맵 | 단독 | `organic-fluid-blob-01` (#34) |
| `mermaid_colorful_03` 듀오톤 프린트 콜라주 | 단독(F1 인접) | `risograph-print-01` (#29) / `mixed-media-collage-01` (#43) |
| `infographic_colorful_07` 맥시멀 콜라주 캐러셀 | 단독(F3 인접) | `maximalism-dopamine-01` (#15) / `punk-grunge-graffiti-01` (#38) |

즉 확장 후보는 "레포에 없던 상상"이 아니라 **관측됐으나 미수용된 스타일 + UI에 이미 저작된 페인트 언어**의 교집합이다.

---

## 2. 조사 방법 (수집 축과 배제 기준)

### 2-a. 수집원 3종

- **A. UI 카탈로그 51종 → viz 적용성 트리아지** (1차, §3). 레포 내부 검증 자산이라 실현성이 가장 높다.
- **B. 88-corpus 아웃라이어 3종 재검토** (§1-c). 관측 근거를 새로 확보.
- **C. viz-native 관례** — UI 카탈로그에도 F1~F7에도 없지만 데이터 시각화/다이어그램 전통에서 표준인 페인트 언어:
  Isotype/스위스 그리드 통계, Bauhaus 기하 인포그래픽, ASCII/TUI 박스드로잉 다이어그램, HUD 텔레메트리 대시보드,
  코믹/하프톤 정보 그래픽. (이들은 대부분 §3에서 UI 후보와 1:1 대응돼 A로 흡수된다.)

### 2-b. 배제 기준 (viz로 성립하지 않는 UI 스타일)

다이어그램/인포그래픽의 **정보 전달 제약**이 UI보다 강하므로 다음은 viz 후보에서 배제하거나 대폭 후순위:

1. **가독성 파괴형** — 배경 블러/헤이즈가 텍스트를 흐리는 스타일(`grainy-blur-dreamy`, `shattered-glass`, `iridescent-chrome`).
   다이어그램은 라벨 대비 4.5:1이 필수라 정보 영역에 블러/굴절을 못 쓴다.
2. **사진 의존형** — 실사진 합성이 본질인 스타일(`photo-type-editorial`, `mixed-media-collage`). 다이어그램은 벡터/도형 언어라 사진 자산 부재.
3. **모션 전용형** — 정적 존재감이 약하고 모션이 시그니처인 스타일(`kinetic-typography`, 부분적으로 `op-art-kinetic`). 정적 SVG 다이어그램에서 정체성 소실.
4. **지오메트리 트랙 의존형** — 진짜 3D/공간 투영(`spatial-3d`, `ai-surreal-gradient3d`). **KAN-028**(iso geometry) 선행 필요.
5. **에셋 헤비 텍스처형** — 대량 래스터 텍스처/스탬프가 본질(`heritage-folk-ornament`, `romantic-botanical`, `frutiger-aero`). ROI 낮음.

---

## 3. UI 카탈로그 51종 → viz 적용성 전수 트리아지

> 판정: **커버**(이미 대응 viz 가이드 존재) · **강력**(P1 신규 후보) · **보통**(P2) · **약함/제외**(§2-b 사유).

| # | UI 표시명 | 판정 | viz 근거 / 사유 |
|---|---|---|---|
| 0 | Neobrutalism_Editorial | 보통 | 두꺼운 잉크 아웃라인+하드 오프셋 그림자 — F3와 인접하나 크림/골드·샤프로 차별. |
| 1 | Glassmorphism_Aurora | 약함 | 정보면 backdrop-blur는 라벨 대비 훼손(§2-b-1). 다크 그라디언트는 F7이 커버. |
| 2 | Neumorphism_Soft | 보통 | 동색 이중그림자 압출 노드 가능(filter). 정보 밀도↓·저대비 리스크. |
| 3 | Claymorphism_Playful | 보통 | 파스텔 퍼피 클레이 노드(filter inset). 키즈/에듀 인포그래픽. |
| 4 | Skeuomorphism_Tactile | 약함 | 가죽/베벨은 다이어그램 관례 밖·에셋 헤비. |
| 5 | Flat_Material | 커버 | elevation 플랫 타일 = F2 Corporate + F3에 흡수됨. |
| 6 | Minimal_Saas | 커버 | 중립+인디고 절제 = F1/F2에 흡수됨. |
| **7** | **Swiss_International** | **강력** | **모듈러 그리드+산세리프+흑백+단일 빨강 = Isotype/스위스 통계 그래픽의 원형. 데이터 viz 정본 스타일.** F1(웜)과 냉·그리드로 명확히 분리. |
| 8 | Editorial_Magazine | 보통 | 세리프 디스플레이+헤어라인 칼럼룰 = FT식 데이터 저널리즘 차트. F1 다색 서브모드와 인접. |
| **9** | **Bauhaus_Geometric** | **강력** | **3원색+흑백·기하 산세리프·직각 면분할·굵은 윤곽·하드 그림자·원형 모티프 = 기하 인포그래픽 정본.** 어떤 viz와도 안 겹침. |
| 10 | Y2K_Futurism | 약함 | 크롬+네온 = F7 인접·글로시 에셋 의존. |
| 11 | Vaporwave_Synth | 보통 | 퍼스펙티브 그리드+CRT 스캔라인 신스웨이브 대시보드. F7과 다크+네온 인접하나 그리드/스캔라인 차별. |
| 12 | Memphis_Postmodern | 보통 | 지그재그/물방울/테리조 패턴+하드 오프셋 = 장식 패턴 인포그래픽. F3와 팝 인접. |
| 13 | FrutigerAero_Glossy | 약함 | 아쿠아 글로시+자연 에셋(§2-b-5). |
| 14 | Retro70s_Warm | 보통 | 머스타드/테라코타/올리브 어스톤+그레인 = 웜 레트로 인포그래픽. F1(웜)과 팔레트 차별. |
| 15 | Maximalism_Dopamine | 보통 | 고채도 충돌+겹침 = 도파민 인포그래픽. 아웃라이어 `infographic_colorful_07` 근거. F3/Memphis 인접. |
| 16 | Collage_Scrapbook | 약함 | 테이프/폴라로이드 컷아웃 = 에셋 헤비. riso로 정보형 대체 권장. |
| 17 | Kawaii_Pastel | 보통 | 파스텔+마스코트 = 키즈/에듀 인포그래픽. Claymorphism과 통합 검토. |
| **18** | **Cyberpunk_Hud** | **강력** | **다크+네온 엣지+스캔라인+HUD 프레임 = 텔레메트리/모니터링 대시보드 다이어그램.** F7(글로시 그라디언트)과 라인 프레임·코너 브래킷으로 분리. |
| **19** | **Terminal_Mono** | **강력** | **모노스페이스+다크 콘솔+포스포 그린+박스 보더 = ASCII/TUI 박스드로잉 다이어그램.** dev-tools 다이어그램에 정확히 적합. 신규 지오메트리 0(기존 rect+keyline+mono). |
| 20 | Aurora_Gradient | 커버 | 다크 메시 그라디언트 = F7에 흡수됨. |
| 21 | ArtDeco_Luxe | 보통 | 흑/딥그린+골드 라인 대칭 프레임 = 럭셔리 인포그래픽(골드 라인워크). 차별 뚜렷. |
| 22 | Scandi_Warm | 약함 | 웜 오프화이트+세이지 = F1 인접·차별 약함. |
| 23 | DarkLuxe_Editorial | 보통 | 순흑+골드 헤어라인+대형 세리프 = 다크 럭셔리 차트. F1 다크변형과 분리 검토. |
| 24 | Bento_Modular | 보통 | 벤토 타일 모듈 = 인포그래픽 **레이아웃**(Statistics.waffle/bento 패턴 존재). 스타일보다 패턴 성격. |
| 25 | Kinetic_Typography | 약함 | 모션 시그니처(§2-b-3). |
| 26 | Spatial_3D | 제외 | 지오메트리 트랙(§2-b-4, KAN-028). |
| 27 | Humanist_Imperfect | 커버 | 손그림/유기 결함 = F4 Marker에 흡수됨. |
| 28 | Tactile_Texture | 약함 | 퍼피 질감 = Claymorphism과 중복. |
| **29** | **Risograph_Print** | **강력** | **웜 크림+스팟 잉크 2~3색 multiply 오버프린트+미스레지+그레인 = 리소 에디토리얼 인포그래픽.** 아웃라이어 `mermaid_colorful_03` 근거. 트렌디·차별 강함. |
| 30 | Blueprint_Technical | 커버 | 이미 viz 가이드(`blueprint-technical-01`). |
| 31 | Grainy_Blur_Dreamy | 제외 | 블러 헤이즈(§2-b-1). |
| 32 | Gothic_Medieval_Digital | 약함 | 블랙레터+옥스블러드 = 니치. 정보 타이포 가독성 리스크. |
| 33 | Glitch_Distortion | 보통 | 마젠타/시안 채널 오프셋 = 글리치 대시보드(filter). Halftone_Glitch와 통합. |
| 34 | Organic_Fluid_Blob | 보통 | 바이오모픽 블롭 = 블롭 마인드맵. 아웃라이어 `mermaid_colorful_02` 근거. 블롭 노드 shape 필요(Tier B). |
| 35 | Radiant_Glow_Dark | 커버 | 다크+방사 글로우 = F7 인접에 흡수. |
| 36 | Halftone_Dot_Print | 보통 | CMYK 망점 = 코믹/인쇄 인포그래픽(SVG pattern). riso와 인쇄 패밀리 통합 검토. |
| 37 | Ukiyoe_Woodblock | 약함 | 흙빛 평면 색면+먹 윤곽 = 니치이나 성립. 후순위. |
| 38 | Punk_Grunge_Graffiti | 약함 | 찢긴 가장자리/스프레이 = 에셋 헤비. |
| 39 | Ai_Surreal_Gradient3d | 제외 | 3D 렌더 에셋(§2-b-4). |
| 40 | Shattered_Glass_Cinematic | 제외 | 프리즘 굴절 블러(§2-b-1). |
| 41 | Pixel_Art_Retro | 보통 | 8비트 정수 그리드+하드 도트 = 레트로 게임 인포그래픽. 신규 지오메트리 0(스냅). |
| 42 | Halftone_Glitch_Colorsep | 보통 | 망점+색분해 글리치 = 인쇄 오정합 포스터. #33/#36과 인쇄 패밀리 통합. |
| 43 | Mixed_Media_Collage | 약함 | 사진 합성(§2-b-2). |
| 44 | Photo_Type_Editorial | 제외 | 사진 의존(§2-b-2). |
| 45 | Op_Art_Kinetic | 약함 | 옵티컬 드리프트가 모션 의존(§2-b-3). 정적 줄무늬만 취하면 보통 가능. |
| 46 | Warped_Checkerboard | 약함 | 왜곡 배경 = 정보면과 충돌. |
| 47 | Iridescent_Chrome | 제외 | 홀로그래픽 광택 에셋(§2-b-1/5). |
| 48 | Romantic_Botanical | 약함 | 장식 플로럴 에셋 헤비(§2-b-5). |
| 49 | Heritage_Folk_Ornament | 약함 | 민속 오너먼트 에셋 헤비(§2-b-5). |
| 50 | Naive_Doodle | 약함 | 크레용 낙서 = F4 Marker와 중복(더 나이브). |

**집계:** 커버 6 · 강력(P1) **5** · 보통(P2) **17** · 약함/제외 23.

---

## 4. 신규 viz 스타일 가이드 후보 항목화

### 4-a. P1 — 즉시 착수 권장 5종 (강력·차별 뚜렷·실현성 높음)

| 제안 slug | 제안 표시명 | 제안 viz 패밀리 | 출처 | 시그니처 | 실현성 |
|---|---|---|---|---|---|
| `viz-swiss-systematic-01` | Swiss_Systematic_01 | `viz-swiss-systematic` | UI#7 + C(Isotype) | 냉 뉴트럴·모듈러 그리드·단일 빨강 액센트·헤비 그로테스크·무그림자·좌측정렬 위계 | **Tier A** |
| `viz-bauhaus-geometric-01` | Bauhaus_Geometric_01 | `viz-bauhaus-geometric` | UI#9 | 3원색+흑백·직각 면분할·굵은 검정 윤곽·하드 그림자·원/삼각 기하 노드 | **Tier A** |
| `viz-terminal-ascii-01` | Terminal_Ascii_01 | `viz-terminal-ascii` | UI#19 + C(TUI) | 다크 콘솔·모노스페이스 전면·포스포 그린·박스드로잉 보더·커서 액센트 | **Tier A** |
| `viz-riso-print-01` | Riso_Print_01 | `viz-riso-print` | UI#29 + 아웃라이어 | 웜 크림·스팟 잉크 2~3색 multiply 오버프린트·미스레지 오프셋·그레인/망점 | **Tier A** |
| `viz-hud-telemetry-01` | Hud_Telemetry_01 | `viz-hud-telemetry` | UI#18 + C(HUD) | 다크·네온 엣지·코너 브래킷 프레임·스캔라인·모노 수치·글로우 절제 | **Tier B** |

### 4-b. P2 — 후속 배치 17종 (보통)

Neobrutalist(#0) · Neumorphic(#2) · Clay_Playful(#3) · Editorial_Data(#8) · Synthwave(#11) · Memphis_Pattern(#12) ·
Retro70s_Warm(#14) · Dopamine_Max(#15) · Kawaii_Pastel(#17) · ArtDeco_Luxe(#21) · DarkLuxe(#23) · Bento_Stat(#24) ·
Glitch_Duotone(#33) · Organic_Blob(#34) · Halftone_Print(#36) · Pixel_Retro(#41) · Ukiyoe_Flat(#37).

> **패밀리 통합 후보(P2 저작 시 축소 검토):** 인쇄 계열(riso#29/halftone#36/colorsep#42)은 `viz-print-ink` 한 패밀리 +
> colorway로 묶을 수 있고, 클레이/카와이/택타일(#3/#17/#28)은 `viz-soft-puffy` 한 패밀리로 묶을 수 있다. F1~F7이
> "1스타일=1패밀리"였던 관례를 P2에서 반드시 이어갈 필요는 없다 — 패밀리는 **채택 셀렉터의 조도**일 뿐이므로 과분화 지양.
>
> **→ 해소(KAN-034, §7):** "한 패밀리 + colorway로 ~12 저작단위 축소"는 현 게이트상 **불가**로 판명(2번째+ preset은
> 색상만 달라야 함 — 모티프는 wrapper에 있어 색 토큰으로 스와핑 안 됨). 통합은 **family 코드 그룹핑**(별도 가이드,
> 공유 family)으로만 실현. 결정·배치표·카드 분해는 **§7**.

### 4-c. P3 / 이연

- **KAN-028 선행 필요:** Spatial_3D(#26), Ai_Surreal(#39), 진짜 iso 지오메트리 위 F6 재합성.
- **배제 유지:** §2-b 해당 23종.

### 4-d. P1 후보별 구현 스펙 초안

각 초안은 `VisualizationFoundation` 슬롯(canvas/palette/shape/node×7 kind/edge/c4/boundary/typography/spacing/motion) +
`meta`(StyleGuideMeta) + colorway 프리셋 + wrapper + guidelines를 최소 명세한다.

**Swiss_Systematic_01 (`viz-swiss-systematic`, Tier A)**
- canvas `#FFFFFF` / grid `#E6E6E6` gridUnit 8(모듈러). 잉크 `#111111`, 액센트 레드 `#E1000F`(단일).
- palette: 무채색 그레이 램프(`#111`→`#BDBDBD`) + p5 레드. **색 아닌 위치·크기·굵기로 위계**(Isotype 규칙).
- node: 전 kind 무채움+헤어라인 1px, 강조 kind만 레드 fill·흰 라벨. edge: orthogonal·1px·소형 삼각. radius 0.
- typography: 헬베티카/그로테스크, titleWeight 700, mono 없음. 라벨 좌측정렬.
- meta: family `viz-swiss-systematic`, tags `[grid, sharp, monochrome, technical, typographic, light]`,
  mood `{formality:5,energy:2,warmth:1,density:3,ornament:1}`, domains `[dashboard, editorial, docs, fintech]`,
  contrastIntent `aaa`(흑백+레드 = 고대비). related `[minimal-line-01, corporate-schematic-01]`.
- 접근성: 레드 `#E1000F` on 흰 = 4.0:1(그래픽 전용, 텍스트는 잉크). 색 단독 의미 금지(패턴/라벨 병기).

**Bauhaus_Geometric_01 (`viz-bauhaus-geometric`, Tier A)**
- canvas `#F3EFE4`(웜 페이퍼) / 잉크 `#1A1A1A`. palette = 3원색 `#E63A27`/`#F5C518`/`#1E4FCE` + 흑백 + 보조.
- node: 굵은 검정 윤곽 2.5px, 채도 높은 원색 fill, 하드 오프셋 그림자(오프셋 solid). kind별 기하 글리프(원/삼각/사각).
- edge: 직각·굵은 검정·소형 삼각. radius 0(원형은 shape).
- meta: family `viz-bauhaus-geometric`, tags `[geometric, vivid, sharp, bold, hard, light]`,
  mood `{formality:3,energy:4,warmth:3,density:3,ornament:3}`, domains `[education, editorial, marketing, creative-agency]`,
  contrastIntent `aa`. related `[colorful-flat-01, neobrutalism-editorial-01(UI)]`.
- 접근성: 원색 fill 위 라벨은 휘도 기반 흰/검 자동(옐로 위 검정). 하드 그림자는 장식(정보 아님).

**Terminal_Ascii_01 (`viz-terminal-ascii`, Tier A)**
- canvas `#0B0F0A`(다크 콘솔) / grid `#12301C`. 잉크 = 포스포 그린 `#3DDC84`, 보조 앰버 `#F2C94C`/시안 `#54C7F0`.
- node: 무채움+그린 1px 박스, 라벨 mono. edge: 직각·그린·`─┐└` 박스드로잉 뉘앙스(마커 최소). radius 0.
- typography: **titleFont=monoFont**(JetBrains Mono), 전면 모노. 커서 블록 액센트(장식).
- colorway: `default`(그린) + `amber`(앰버 모노크롬 — 빈티지 CRT).
- meta: family `viz-terminal-ascii`, tags `[dark, mono, technical, sharp, monochrome, neon]`,
  mood `{formality:3,energy:2,warmth:2,density:3,ornament:1}`, domains `[dev-tools, docs, saas, crypto-web3]`,
  colorScheme `dark`, contrastIntent `aa`, darkFirst true. related `[blueprint-technical-01, ink-line-duotone-01]`.
- 접근성: 그린 `#3DDC84` on `#0B0F0A` = 대비 확인(≈11:1, aaa 여유). 저채도 톤온톤 금지.

**Riso_Print_01 (`viz-riso-print`, Tier A)**
- canvas `#F4EFE0`(웜 크림) / grid 미세. 스팟 잉크 2색: 형광 핑크 `#FF4D6D` + 블루 `#1E5AA8`(+ 옵션 옐로).
- node: 잉크 multiply 오버프린트(2색 겹침에서 3색 효과), 미세 미스레지 오프셋(1~2px 채널 시프트), 그레인 오버레이(filter/pattern).
- edge: 스팟 잉크 라인·소형 화살촉. fill은 잉크 반투명(multiply)으로 오버프린트 성립.
- 구현 노트: multiply는 `mix-blend-mode` 모티프 CSS, 그레인은 `feTurbulence` 저주파(marker-sketchnote 선례 재사용), 미스레지는 노드 복제 2색 오프셋.
- meta: family `viz-riso-print`, tags `[grainy, textured, retro, vivid, light]`,
  mood `{formality:2,energy:3,warmth:4,density:2,ornament:3}`, domains `[editorial, blog, creative-agency, marketing]`,
  contrastIntent `aa`. related `[colorful-flat-01, marker-sketchnote-01]`.
- 접근성: 오버프린트 겹침색 위 라벨 대비 실측 필수(accessibilityAudit로 게이트). 미스레지는 장식(정보 오프셋 금지).

**Hud_Telemetry_01 (`viz-hud-telemetry`, Tier B — 코너 브래킷 wrapper 신규)**
- canvas `#07131A`(딥 틸다크) / grid `#0E2A38`. 네온 시안 `#22D3EE` 엣지 + 앰버 `#FBBF24` 경보 + 화이트 라벨.
- node: 무채움+시안 1px, **코너 브래킷 프레임**(`⌐¬` 모서리만 그리는 데코 — 신규 wrapper), 스캔라인 오버레이(pattern), 글로우 절제(drop-shadow).
- edge: 시안·직각·소형 삼각·도트 보조. 수치 라벨 mono.
- 실현성: 코너 브래킷은 **신규 wrapper 데코 컴포넌트** 1개 필요(Node 래핑, `<path>` 4모서리). 나머지는 F7 defs/모티프 인프라 재사용.
- meta: family `viz-hud-telemetry`, tags `[dark, neon, technical, sharp, mono, glow]`,
  mood `{formality:4,energy:3,warmth:1,density:3,ornament:2}`, domains `[dashboard, dev-tools, gaming, crypto-web3]`,
  colorScheme `dark`, contrastIntent `aa`, darkFirst true. related `[neon-gradient-dark-01, terminal-ascii-01]`.
- 접근성: 그라디언트/글로우 위 텍스트 금지 — 라벨은 순백 고정(F7 규칙 재사용). 스캔라인은 opacity 낮게(정보면 비간섭).

---

## 5. 구현 계획

### 5-a. 신규 viz 가이드 1종당 표준 구현 절차 (F5/F7 저작 선례 기준)

1. **테스트 먼저** (CLAUDE.md 워크플로). 신규 가이드는 아래 §5-c 덕분에 **대부분 기존 테스트에 자동 편입**되지만, 가이드 고유
   시그니처 검증(예: Terminal의 mono 폰트, HUD의 코너 브래킷 존재)은 `TemplateStyleMatrix`/`VizCatalogDecisionTable`에
   가이드별 assert를 추가하거나 신규 story `play`로 저작한다.
2. `src/<slug>.tsx` 작성: `foundations`(전 슬롯) + `foundationPresets`(colorway ≥2, 색 외 토큰 deep-equal 불변식) +
   `wrapperComponents`(Node/Tag/EdgeLabel, 필요 시 신규 데코) + `guidelines`(surface/color/typography/accessibility) +
   `visualMotif` + `meta`(StyleGuideMeta 전 필드).
3. `src/index.ts`: import + barrel export + `vizStyleGuideCatalog` 배열에 추가(표시 순서).
4. **tokens**: `packages/tokens/src/styleGuideMeta.ts`의 `STYLE_FAMILIES` union + `STYLE_FAMILY_LABELS` Record에 신규
   viz 패밀리 추가(Record가 컴파일에서 라벨 커버를 강제 — 누락 시 typecheck 실패). tokens 신규 export이므로 **storybook vite
   캐시 삭제** 필요(메모리: core-export-vite-cache).
5. **매니페스트 재생성**: `pnpm --filter …viz-style-guide-catalog gen:manifest`(prebuild 자동). `manifest.test.ts`가
   커밋본과 재생성본 바이트 동기를 검증 → drift 게이트.
6. **접근성 감사**: `accessibilityAudit.ts`(auditVizContrast)가 foreground vs background over-claim을 hard-fail. riso
   오버프린트·HUD 글로우처럼 실효 배경색이 합성되는 경우 worst-case로 선언 정직성 확인(KAN-026 인프라 재사용).
7. **4 품질 게이트**: `pnpm typecheck` / `pnpm build` / `pnpm test` / `pnpm --filter storybook build`.

### 5-b. 실현성 티어와 인프라 의존

| 티어 | 정의 | P1 해당 | 필요 인프라 (전부 **기존 존재**) |
|---|---|---|---|
| **A** | 현행 토큰+colorway만으로 실현. 신규 atom/geometry 0 | Swiss·Bauhaus·Terminal·Riso | `makeVizColorway`, `useVizMotifStyle`(mix-blend/drop-shadow CSS), `feTurbulence`(marker 선례), cube/shape, gradient defs(neon 선례) |
| **B** | wrapper 데코 1개 신규(Node 래핑, geometry 아님) | HUD(코너 브래킷) | 위 + `<defs>`/`<path>` 데코 컴포넌트 패턴(neon NeonTag 선례) |
| **C** | 진짜 투영/depth-sort/3D 필요 | — (P1 없음) | **KAN-028** geometry 트랙 선행 |

> **핵심**: P1 5종은 전부 Tier A/B이며 **신규 코어(headless) 변경 0**. 전부 style-guide-catalog 패키지 내부 저작 +
> tokens 패밀리 union 추가만으로 완결된다. F5/F7이 이미 증명한 경로다.

### 5-c. 신규 가이드의 테스트 자동 편입 (저작 비용 절감의 근거)

Storybook 교차검증 스토리는 `vizStyleGuideCatalog`를 **런타임 순회**하고 카운트를 **데이터 파생**으로 단언한다:

- `TemplateStyleMatrix.PilotMatrix`: `cells.length === vizStyleGuideCatalog.length`, 셀별 SVG 3개, 스냅샷 유일성.
- `TemplateStyleMatrix.ExpandedMatrix`: `cells.length === guideCount`, paint 해석 유일 키.
- `VizCatalogDecisionTable`: 행수 === `authoredCount`(meta 있는 가이드), 셀렉터 재랭크.

→ 신규 가이드가 **meta를 갖고 paint가 해석되면**(§5-a 2·4) 위 3개 스토리는 **가이드별 테스트를 새로 안 짜도 자동으로 green**을
유지한다. `_paintGate.ts`의 `expectVizPaintResolved`가 계약 paint 미해석을 잡는다.

### 5-d. 배치 계획

- **배치 1 (P1, KAN-019 후속 카드):** Swiss → Bauhaus → Terminal → Riso → HUD. 각 1카드(KAN-013/014 granularity 선례).
  Swiss·Terminal 먼저(Tier A·신규 데코 0·가장 빠른 검증), 그다음 Bauhaus·Riso(모티프 CSS), 마지막 HUD(신규 wrapper).
- **배치 2 (P2, 별도 카드군):** §4-b 17종. **저작 전 패밀리 통합 결정** 선행 → **KAN-034에서 해소(§7)**: colorway
  통합은 게이트상 불가 → family 코드 그룹핑(인쇄/소프트)으로 실현, 저작 단위 17 유지. 카드 KAN-037~039로 분해.
- **이연:** §4-c는 KAN-028 완료 후.

### 5-e. 백로그 카드 분해 제안

KAN-019(이 문서)는 **조사·항목화·구현계획 deliverable 산출로 완료**. 실제 구현은 아래 신규 카드로 분해(원 카드가
KAN-013/014로 분해한 패턴 답습):

| 신규 카드(제안) | 스코프 | 티어 |
|---|---|---|
| Swiss_Systematic_01 viz 스타일 가이드 구현 | §4-d Swiss | A |
| Terminal_Ascii_01 viz 스타일 가이드 구현 | §4-d Terminal | A |
| Bauhaus_Geometric_01 viz 스타일 가이드 구현 | §4-d Bauhaus | A |
| Riso_Print_01 viz 스타일 가이드 구현 | §4-d Riso | A |
| Hud_Telemetry_01 viz 스타일 가이드 구현(+코너 브래킷 wrapper) | §4-d HUD | B |
| P2 viz 배치 + 인쇄/소프트 패밀리 통합 결정 (KAN-034 완료 → §7) | §4-b · §7 | A |

---

## 6. 결론·권고

- **갭 확인:** viz 8 : UI 51. "매우 적다"는 UI 대비 43 갭이 실체. 88-corpus(F1~F7)는 소진 → **UI 카탈로그가 검증된 확장 조사원**.
- **항목화:** UI 51종 전수 트리아지 → 강력(P1) 5 · 보통(P2) 17 · 커버/약함/제외 29. 아웃라이어 3종도 신규 근거 확보.
- **실현성:** P1 5종 전부 Tier A/B, **코어 변경 0** — F5/F7이 증명한 경로. 신규 가이드는 §5-c로 기존 테스트에 자동 편입.
- **권고:** KAN-019는 이 deliverable로 완료 처리하고, §5-e의 P1 5카드를 백로그에 등재해 배치 1을 착수한다. P2는
  패밀리 통합 결정을 선행한 뒤 별도 카드군으로.

---

## 7. P2 배치 계획 & 패밀리 통합 결정 (KAN-034)

> **KAN-034 deliverable.** §4-b(P2 17종)가 "저작 전 선행"으로 남긴 **인쇄/소프트 패밀리 통합 결정**을 해소하고,
> P2 배치·카드 분해를 확정한다. P1(KAN-019 → KAN-029~033)의 "1 planning 카드 → N impl 카드" 패턴을 P2에 답습한다.

### 7-1. 핵심 정정 — colorway 통합은 게이트상 불가

§4-b는 "인쇄/소프트 계열을 `한 패밀리 + colorway`로 묶으면 실질 저작 단위 ~12종"이라 전제했다. **이 전제는 현 viz 게이트에서 성립하지 않는다.**

- `apps/storybook/src/stories/_vizCatalogStory.tsx`의 **색-스킴 전용 불변식**(line 319–326): 2번째 이상 preset은
  **색상 토큰만** 달라야 하며 `typography · spacing · canvas.gridUnit · edge.width · shape.strokeWidth · boundary.radius`는
  base와 deep-equal이어야 한다(위반 시 play 실패).
- 각 스타일의 모티프(riso 오버프린트/그레인, halftone 망점, colorsep 채널오프셋; clay inset 퍼피, neumorph 동색
  이중그림자, kawaii 마스코트)는 **wrapperComponents / 모티프 CSS**에 있고 preset 색 토큰으로 스와핑되지 않는다.
- 따라서 인쇄 3종·소프트 3종은 **색상만의 차이가 아니라** 서로 다른 wrapper·그림자·형태를 요구 → **별도 가이드가 강제**된다.
  colorway로 접을 수 없다.

**결론:** "통합"은 저작 단위 축소가 아니라 **`family` 코드 그룹핑**(별도 가이드, 공유 family)으로만 실현된다. 저작 단위는
**17 유지**. 이득은 셀렉터(`selectStyleGuides`)의 family 축 과분화 억제 + 채택자가 "인쇄풍/소프트풍" 버킷으로 1차 선택 가능.

### 7-2. 결정 (사용자 승인, 2026-07-24)

**인쇄/소프트만 family 그룹핑 + 나머지 1:1 + riso 리네임.** UI 카탈로그의 다대1 family 관례(8 family / 51 guide)와 정합한다.

- **`viz-print-ink`** ← riso#29(shipped, 리네임) · Halftone_Print#36 · Glitch_Duotone#33 (+ 이연 colorsep#42).
  #33은 마젠타/시안 **채널 오프셋(오정합/colorsep 축)** 이라 인쇄 오정합 계열로 편입.
- **`viz-soft-puffy`** ← Neumorphic#2 · Clay_Playful#3 · Kawaii_Pastel#17.
- 나머지 **12종은 각자 1:1 family**(고유 시그니처, P2 세트 내 대체 형제 없음).
- **riso 리네임:** shipped `viz-riso-print` → `viz-print-ink` (`STYLE_FAMILIES` union + `STYLE_FAMILY_LABELS` +
  `risoPrint.tsx` `meta.family` + `catalog.manifest.json`/트렌드 표 regen). family 코드는 **채택 메타데이터**이지
  컴포넌트 public API가 아니라 저비용. **실행은 인쇄 패밀리 첫 저작 카드(KAN-037)** 에서 union 신규 편입과 원자적으로 수행(고립 리네임 회피).

family 수 영향: 기존 viz 13 − 1(riso 리네임) + `viz-print-ink` + `viz-soft-puffy` + 12 단일 = **26 family / 30 guide**
(순수 1:1이면 30). 그룹핑으로 4 절약.

### 7-3. P2 17종 → family · tier · 출처 배치표

| # | 제안 slug | 제안 표시명 | family | tier | 출처 UI | 시그니처 |
|---|---|---|---|---|---|---|
| 33 | viz-glitch-duotone-01 | Glitch_Duotone_01 | **viz-print-ink** | A | Glitch_Distortion#33 | 마젠타/시안 채널 오프셋 duotone(정적 오정합) |
| 36 | viz-halftone-print-01 | Halftone_Print_01 | **viz-print-ink** | A | Halftone_Dot_Print#36 | CMYK 망점(SVG pattern)·코믹/인쇄 인포그래픽 |
| 2 | viz-neumorphic-soft-01 | Neumorphic_Soft_01 | **viz-soft-puffy** | A | Neumorphism_Soft#2 | 동색 이중그림자 압출(저대비 리스크) |
| 3 | viz-clay-playful-01 | Clay_Playful_01 | **viz-soft-puffy** | A | Claymorphism_Playful#3 | 파스텔 퍼피 클레이(inset filter)·키즈/에듀 |
| 17 | viz-kawaii-pastel-01 | Kawaii_Pastel_01 | **viz-soft-puffy** | **B** | Kawaii_Pastel#17 | 파스텔+마스코트 글리프(신규 데코 wrapper) |
| 0 | viz-neobrutalist-01 | Neobrutalist_01 | viz-neobrutalist | A | Neobrutalism_Editorial#0 | 두꺼운 잉크 아웃라인+하드 오프셋(크림/골드) |
| 8 | viz-editorial-data-01 | Editorial_Data_01 | viz-editorial-data | A | Editorial_Magazine#8 | 세리프 디스플레이+헤어라인 칼럼룰(FT식) |
| 11 | viz-synthwave-01 | Synthwave_01 | viz-synthwave | A | Vaporwave_Synth#11 | 퍼스펙티브 그리드+CRT 스캔라인(다크 네온) |
| 12 | viz-memphis-pattern-01 | Memphis_Pattern_01 | viz-memphis-pattern | A | Memphis_Postmodern#12 | 지그재그/물방울/테라조+하드 오프셋 |
| 14 | viz-retro70s-warm-01 | Retro70s_Warm_01 | viz-retro70s-warm | A | Retro70s_Warm#14 | 머스타드/테라코타/올리브 어스톤+그레인 |
| 15 | viz-dopamine-max-01 | Dopamine_Max_01 | viz-dopamine-max | A | Maximalism_Dopamine#15 | 고채도 충돌+겹침(도파민 인포그래픽) |
| 21 | viz-artdeco-luxe-01 | ArtDeco_Luxe_01 | viz-artdeco-luxe | A | ArtDeco_Luxe#21 | 흑/딥그린+골드 라인 대칭 프레임 |
| 23 | viz-darkluxe-01 | DarkLuxe_01 | viz-darkluxe | A | DarkLuxe_Editorial#23 | 순흑+골드 헤어라인+대형 세리프(다크 럭셔리) |
| 24 | viz-bento-stat-01 | Bento_Stat_01 | viz-bento-stat | A | Bento_Modular#24 | 벤토 타일 모듈(스타일보다 레이아웃 성격) |
| 34 | viz-organic-blob-01 | Organic_Blob_01 | viz-organic-blob | **B** | Organic_Fluid_Blob#34 | 바이오모픽 블롭 노드(신규 blob shape) |
| 37 | viz-ukiyoe-flat-01 | Ukiyoe_Flat_01 | viz-ukiyoe-flat | A | Ukiyoe_Woodblock#37 | 흙빛 평면 색면+먹 윤곽(니치·후순위) |
| 41 | viz-pixel-retro-01 | Pixel_Retro_01 | viz-pixel-retro | A | Pixel_Art_Retro#41 | 8비트 정수 그리드+하드 도트(스냅, 신규 지오메트리 0) |

> **tier:** A = 현행 토큰+colorway만(신규 atom/geometry 0), B = wrapper 데코 1개 신규(Node 래핑, geometry 아님).
> Tier B 2종: Kawaii(마스코트 글리프 데코), Organic_Blob(블롭 shape — §2-b 판정 "블롭 노드 shape 필요").
> slug/표시명은 저작 시 확정(canonical `Primary_Secondary_01`, `displayName.test.ts` 게이트 준수).

### 7-4. 카드 분해 (백로그 등재)

저작 단위 17을 가독성 있게 배치하되, **그룹 family는 한 카드에 모아** union 편입·리네임을 원자화한다.

| 신규 카드 | 스코프 | tier |
|---|---|---|
| **KAN-037** | `viz-print-ink` 패밀리 — Halftone_Print + Glitch_Duotone 가이드 + riso→print-ink 리네임 | A |
| **KAN-038** | `viz-soft-puffy` 패밀리 — Neumorphic + Clay_Playful + Kawaii_Pastel 가이드 | A/B |
| **KAN-039** | P2 1:1 단일 12종 순차 구현(착수 시 개별 카드로 분해) | A(+Organic_Blob B) |

### 7-5. 저작 순서 · 게이트 주의

1. **KAN-037 먼저** — 리네임을 조기 확정해 이후 카드가 안정된 family 세트 위에서 저작되게 한다. 리네임 =
   union `viz-riso-print`→`viz-print-ink` 교체 + label + `risoPrint.tsx` `meta.family` + manifest/트렌드 표 regen.
   `manifest.test.ts` · `displayName.test.ts` · `accessibility.test.ts`(auditVizContrast) 통과 확인.
2. 그룹 family(print-ink/soft-puffy)는 **guide마다 별도 wrapper**지만 **동일 family 문자열**을 `meta.family`에 부여 →
   `selectStyleGuides` family 축에서 함께 랭크된다.
3. **저대비 위험군**(Neumorphic 동색 이중그림자, Ukiyoe 흙빛 평면)은 `shape.stroke↔canvas.bg ≥4.5`, 채운 kind
   `tagColor↔fill ≥4.5`, `auditVizContrast over-claim 0`을 특히 유의 — 정직한 `contrastIntent` 하향 허용
   (KAN-029 Swiss `aa`·KAN-031 Bauhaus red 다크닝 선례).
4. **§5-c 자동 편입**: meta + paint가 해석되면 `TemplateStyleMatrix` · `VizCatalogDecisionTable`가 카운트를 데이터파생으로
   단언하므로 신규 가이드가 가이드별 테스트 없이 자동 green을 유지한다.
5. tokens 신규 export(신규 family)마다 **storybook vite 캐시 삭제** 필요.
