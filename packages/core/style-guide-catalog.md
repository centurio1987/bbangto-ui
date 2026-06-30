# Style Guide Catalog — 후보 디자인 스타일/트렌드 목록

> 목적: Style Guide Catalog를 **일괄 생성**하기 위한 후보 디자인 트렌드 수집·목록.
> 각 항목은 bbangto-ui의 `StyleGuide` 6요소(아래)로 곧장 인스턴스화할 수 있도록 명세화한다.
> 현재 `@centurio1987/bbangto-ui-style-guide-catalog` 패키지에 **29개 preset이 구현**되어 있다(#0–28 전부, `styleGuideCatalog`/`styleGuideMap` 등재).

## StyleGuide 6요소 (생성 대상 스키마)

`packages/core/src/StyleGuide.ts` + `@centurio1987/bbangto-ui-tokens`(`StyleGuideTokens`) 기준:

| 요소 | 양식 | 필수 | 채우는 것 |
|------|------|------|-----------|
| `foundations` | `BbangtoFoundation`(css variable로 주입) | O | palette / typography / spacing / radius / shadow / motion / zIndex |
| `extendedFoundations` | `Record<string,string>` (`--bbangto-ext-*`) | X | visual motif 전용 확장 토큰 (offset-shadow, blur, glow 등) |
| `wrapperComponents` | `Record<string, React.ComponentType>` | X | 원형 컴포넌트를 모티프로 감싼 래퍼 (Button/Card/Tag…) |
| `patterns` | `Record<string, React.ComponentType>` | X | 반복 UI 조합(폼/테이블/Hero/Menu…) 템플릿 |
| `guidelines` | 마크다운/구조화 텍스트 | X | Do's & Don'ts + 접근성 + 필수 웹폰트 |
| `visualMotif` | `VisualMotif`(summary + 컴포넌트별 spec + example) | X | 대표 컴포넌트별 시각 문법 + 구현 예시 1개 |

## 명명 규칙

표시명 = `<PrimaryTrend>_<SecondaryModifier>_NN` (PascalCase, 디자인 트렌드 인덱스).
slug = kebab-case (`name` / `data-bbangto-style-guide` / `styleGuideMap` 키).
개인정보·실제 제품/회사명 금지, 콘텐츠는 가상(fictional) placeholder.

---

## 요약 목록 (생성 우선순위 제안)

> 우선순위(P): P1 = 대비/구현 효과 크고 기존 토큰 체계로 바로 표현 가능 · P2 = 가치 높으나 확장토큰/래퍼 필요 · P3 = 틈새/실험적.

| # | 표시명 (제안) | slug | 패밀리 | 핵심 모티프 한 줄 | P |
|---|---------------|------|--------|-------------------|---|
| 0 | **Neobrutalism_Editorial_01** | `neobrutalism-editorial-01` | 구조/raw | 크림·잉크·골드, 각진 모서리, 하드 오프셋 그림자 *(구현됨)* | — |
| 1 | Glassmorphism_Aurora_01 | `glassmorphism-aurora-01` | 깊이/material | 반투명 frosted glass + 배경 블러 + 오로라 그라디언트 | P1 |
| 2 | Neumorphism_Soft_01 | `neumorphism-soft-01` | 깊이/material | 단색 표면 + 이중 그림자(볼록/오목) 압출감 | P1 |
| 3 | Claymorphism_Playful_01 | `claymorphism-playful-01` | 깊이/material | 두툼한 라운드 + 파스텔 + inner/outer 소프트 그림자 | P2 |
| 4 | Skeuomorphism_Tactile_01 | `skeuomorphism-tactile-01` | 깊이/material | 실물 질감(가죽/금속/그라디언트 베벨) 모사 | P3 |
| 5 | Flat_Material_01 | `flat-material-01` | 평면/체계 | Material You 톤 + elevation 그림자 + 명료한 색역 | P1 |
| 6 | Minimal_Saas_01 | `minimal-saas-01` | 평면/체계 | 중립 그레이 + 1 액센트, 넉넉한 여백, 낮은 채도 | P1 |
| 7 | Swiss_International_01 | `swiss-international-01` | 타이포/편집 | 그리드·비대칭 정렬·Helvetica류·적·흑·백 | P1 |
| 8 | Editorial_Magazine_01 | `editorial-magazine-01` | 타이포/편집 | serif 본문 + 대형 헤드라인 + 칼럼 레이아웃 | P2 |
| 9 | Bauhaus_Geometric_01 | `bauhaus-geometric-01` | 타이포/편집 | 원·삼각·사각 기본형 + 3원색 + 기하 구성 | P2 |
| 10 | Y2K_Futurism_01 | `y2k-futurism-01` | 노스탤지어 | 크롬·네온·버블·글로시 그라디언트, 버블 폰트 | P2 |
| 11 | Vaporwave_Synth_01 | `vaporwave-synth-01` | 노스탤지어 | 핑크/시안 네온 그리드, 글리치, 80s 석양 | P2 |
| 12 | Memphis_Postmodern_01 | `memphis-postmodern-01` | 노스탤지어 | 지그재그·도형 패턴·테리조·고채도 충돌 | P3 |
| 13 | FrutigerAero_Glossy_01 | `frutiger-aero-glossy-01` | 노스탤지어 | 에어로 글로스 + 자연(물/하늘) + 스카이 그라디언트 | P3 |
| 14 | Retro70s_Warm_01 | `retro70s-warm-01` | 노스탤지어 | 머스타드/테라코타/올리브, 라운드 산세리프, groovy | P3 |
| 15 | Maximalism_Dopamine_01 | `maximalism-dopamine-01` | 표현/에너지 | 고채도 충돌색·겹침·대형 타이포·밀도 | P2 |
| 16 | Collage_Scrapbook_01 | `collage-scrapbook-01` | 표현/에너지 | 스티커/찢긴 종이/컷아웃/손그림 콜라주 | P3 |
| 17 | Kawaii_Pastel_01 | `kawaii-pastel-01` | 표현/에너지 | 파스텔 + 둥근 형태 + 귀여운 마스코트/아이콘 | P3 |
| 18 | Cyberpunk_Hud_01 | `cyberpunk-hud-01` | 테크/다크 | 다크 베이스 + 네온 엣지/스캔라인 + HUD 프레임 | P2 |
| 19 | Terminal_Mono_01 | `terminal-mono-01` | 테크/다크 | 모노스페이스 전면 + 다크 콘솔 + 커서/ASCII | P1 |
| 20 | Aurora_Gradient_01 | `aurora-gradient-01` | 테크/다크 | 메시 그라디언트 배경 + 부유 글로우 + 다크 글래스 | P2 |
| 21 | ArtDeco_Luxe_01 | `artdeco-luxe-01` | 정제/럭셔리 | 골드 라인·대칭·기하 장식·세리프 디스플레이 | P3 |
| 22 | Scandi_Warm_01 | `scandi-warm-01` | 정제/럭셔리 | 따뜻한 오프화이트 + 우드톤 + 절제된 라운드 | P2 |
| 23 | DarkLuxe_Editorial_01 | `darkluxe-editorial-01` | 정제/럭셔리 | 흑·금 고대비 + 대형 세리프 + 시네마틱 여백 | P2 |
| 24 | **Bento_Modular_01** | `bento-modular-01` | 평면/체계 | 도시락형 모듈·비대칭·균형 그리드 (레이아웃 중심) *(구현됨)* | P1 |
| 25 | **Kinetic_Typography_01** | `kinetic-typography-01` | 타이포/편집 | 커서 반응·가변 모션 텍스트, 움직이는 헤드라인 *(구현됨)* | P2 |
| 26 | **Spatial_3D_01** | `spatial-3d-01` | 깊이/material | WebGL/3D·공간 UI, 스크롤 트리거 깊이·시차 *(구현됨)* | P3 |
| 27 | **Humanist_Imperfect_01** | `humanist-imperfect-01` | 표현/에너지 | 손그림·유기 곡선·의도적 결함 레터폼, 감성 주도 *(구현됨)* | P2 |
| 28 | **Tactile_Texture_01** | `tactile-texture-01` | 표현/에너지 | 퍼피·스퀴시·하이퍼리얼 질감, 촉각 모사 *(구현됨)* | P2 |

> #24–28은 [`design-trends-2020-2026.md`](./design-trends-2020-2026.md) §C(2020–2026 시간축 리서치)에서 도출한 신규 후보. 기존 #1–23이 커버하지 못한 트렌드를 보강한다.

---

## 항목별 생성 명세

> 각 항목은 `foundations`(F)/`extendedFoundations`(EF)/`wrapperComponents`(W)/`patterns`(PT)/`visualMotif`(VM)/`guidelines`(G) 채울 단서를 담는다.
> 색·폰트는 **방향성**이며 실제 값은 생성 시 확정. 접근성(WCAG 대비) 위배 가능성이 큰 모티프는 G에 명시했다.

### 1. Glassmorphism_Aurora_01
- **F**: 어둡거나 채도 있는 배경(딥 인디고/바이올렛) + 반투명 표면. radius `lg~xl`(16–24px). shadow는 부드러운 ambient.
- **EF**: `--bbangto-ext-glass-bg: rgba(255,255,255,0.12)`, `--bbangto-ext-glass-blur: 16px`, `--bbangto-ext-glass-border: rgba(255,255,255,0.25)`, `--bbangto-ext-aurora`(conic/mesh gradient).
- **W**: Card/Modal/GNB — `backdrop-filter: blur()` + 반투명 보더. Button은 frosted fill.
- **PT**: Hero(오로라 배경 위 글래스 카드 스택), Pricing, Dashboard 위젯.
- **VM**: 다층 투명·블러로 깊이 표현; 표면 위 1px 하이라이트 보더가 시그니처.
- **G**: 텍스트 대비 확보(반투명 위 텍스트 가독성), `backdrop-filter` 미지원 폴백, 모션 민감자 배경 애니 축소.

### 2. Neumorphism_Soft_01
- **F**: 배경과 표면이 **동일 단색**(라이트 그레이 `#E0E5EC` 류). radius `lg`. 저채도.
- **EF**: `--bbangto-ext-neu-light: rgba(255,255,255,0.8)`, `--bbangto-ext-neu-dark: rgba(0,0,0,0.15)`, `--bbangto-ext-neu-distance: 6px`.
- **W**: Button/Card/Input — 이중 그림자(좌상 밝음 + 우하 어두움)로 압출·함몰. pressed = inset.
- **PT**: 설정 패널, 미디어 플레이어, 계산기형 키패드.
- **VM**: 표면이 배경에서 "밀려 나온/들어간" 느낌; 상태 전환 = 볼록↔오목.
- **G**: ⚠ 저대비 본질 → 접근성 취약. 텍스트/아이콘은 충분 대비 별도 확보, 포커스 가시성 보강.

### 3. Claymorphism_Playful_01
- **F**: 파스텔 다색 + 밝은 배경. radius `xl`(24–32px) 매우 둥글게. 큰 spacing.
- **EF**: `--bbangto-ext-clay-shadow-out`, `--bbangto-ext-clay-shadow-in`(inner highlight), `--bbangto-ext-clay-radius: 28px`.
- **W**: Card/Button/Avatar — 두툼한 3D 점토 블록(외부 드롭 + 내부 inset 하이라이트).
- **PT**: 온보딩, 어린이/교육 앱, 일러스트 Hero.
- **VM**: 말랑한 점토 덩어리; 겹침과 통통한 깊이.
- **G**: 과한 그림자로 인한 시각 소음 주의, 정보 밀도 높은 화면엔 부적합 명시.

### 4. Skeuomorphism_Tactile_01
- **F**: 자연색 + 질감 배경. radius `md`. 그라디언트·베벨 풍부.
- **EF**: `--bbangto-ext-bevel`, `--bbangto-ext-texture`(noise/leather), `--bbangto-ext-inner-glow`.
- **W**: Button(물리 버튼), Toggle(스위치), Card(가죽/노트). 사실적 베벨/하이라이트.
- **PT**: 노트/메모, 오디오 콘솔, 캘린더(찢는 종이).
- **VM**: 실물 대응(저장=플로피)으로 어포던스 강화.
- **G**: 과도한 사실주의로 인한 무게·로딩, 일관성 비용 명시. 모던 맥락에선 포인트로만.

### 5. Flat_Material_01
- **F**: Material You 톤(키컬러 파생 톤 시스템) + 명료한 elevation. radius `md~lg`. shadow = soft elevation 0–5.
- **EF**: `--bbangto-ext-elevation-1..5`, `--bbangto-ext-state-layer`(hover/press 오버레이).
- **W**: Button(filled/tonal/outlined/text), FAB, Card, Chip — Material 상태 레이어.
- **PT**: 앱 셸(AppBar+NavRail), 리스트, 다이얼로그.
- **VM**: 평면 + 절제된 그림자 elevation으로 위계; 상태 레이어가 인터랙션 언어.
- **G**: 색역 대비·터치 타깃 48px, 모션 표준 이징.

### 6. Minimal_Saas_01
- **F**: 중립 그레이 스케일 + 단일 브랜드 액센트, 흰 배경. radius `sm~md`. 미세한 1px 보더 + 약한 그림자.
- **EF**: 거의 없음(미니멀). `--bbangto-ext-ring`(focus), `--bbangto-ext-divider`.
- **W**: Button/Input/Card/Table — 깔끔·저장식, 액센트는 1차 액션·링크에만.
- **PT**: 대시보드, 데이터 테이블, 설정 폼, Pricing.
- **VM**: 콘텐츠 우선·여백 위주; 색은 의미 전달에만.
- **G**: 대비·키보드 포커스 충실, 정보 밀도와 가독성 균형(현대 B2B 기본값).

### 7. Swiss_International_01
- **F**: 흑·백 + 단일 강조(적). Helvetica/Inter류 산세리프. 강한 모듈러 그리드. radius `none`.
- **EF**: `--bbangto-ext-grid-gap`, `--bbangto-ext-rule`(헤어라인 규칙선).
- **W**: 타이포 중심 — Heading/Label/Button 플랫·각짐. 장식 최소.
- **PT**: 포스터형 Hero, 인덱스 리스트, 비대칭 그리드 갤러리.
- **VM**: 그리드·정렬·여백·타이포 위계가 곧 디자인; 좌측 정렬·비대칭.
- **G**: 위계는 크기/굵기/위치로만, 색 남용 금지. 접근성 우수(고대비).

### 8. Editorial_Magazine_01
- **F**: serif 본문(예: 본문 Lora/Source Serif) + 디스플레이 세리프, warm paper 배경. 대형 헤드 scale. radius `none~sm`.
- **EF**: `--bbangto-ext-dropcap`, `--bbangto-ext-column-rule`, `--bbangto-ext-pull-quote`.
- **W**: Article/Figure/Pullquote/Byline 래퍼. Button은 절제된 밑줄/보더.
- **PT**: 기사 레이아웃(멀티칼럼), 표지, 인덱스/TOC, 인용.
- **VM**: 인쇄 편집 문법(드롭캡·칼럼·풀쿼트·캡션)으로 읽기 리듬.
- **G**: 본문 가독성(행간/행장), 반응형 칼럼 붕괴 규칙.

### 9. Bauhaus_Geometric_01
- **F**: 3원색(빨/노/파) + 흑백, 기하 도형. 산세리프 기하 폰트(Futura류). radius `none`(+ 의도적 원형).
- **EF**: `--bbangto-ext-shape-circle/triangle/square` 장식 토큰.
- **W**: Button/Card에 기하 블록·원색 면 분할. Icon = 기본 도형.
- **PT**: 포스터, 피처 그리드, 기하 Hero.
- **VM**: form follows function — 기본 도형과 원색의 구성.
- **G**: 원색 대비 강함(대비 OK), 도형 장식이 가독성 방해 않도록.

### 10. Y2K_Futurism_01
- **F**: 크롬/실버 + 네온(핑크/시안/라임), 글로시. 버블/테크노 폰트. radius `lg`(버블).
- **EF**: `--bbangto-ext-chrome`(메탈 그라디언트), `--bbangto-ext-gloss`(하이라이트), `--bbangto-ext-glow`.
- **W**: Button(글로시 버블), Badge(스티커), Card(메탈 베젤).
- **PT**: 랜딩 Hero, 음악/게임 UI, 스티커 갤러리.
- **VM**: 광택 메탈 + 네온 글로우 + 버블 형태의 낙관적 미래.
- **G**: 글로시 대비 변동 → 텍스트 대비 보강, 모션/글로우 절제 옵션.

### 11. Vaporwave_Synth_01
- **F**: 딥퍼플 배경 + 네온 핑크·시안, 80s 석양 그라디언트, 퍼스펙티브 그리드. 모노/세리프 혼합. radius `sm`.
- **EF**: `--bbangto-ext-neon-grid`, `--bbangto-ext-scanline`, `--bbangto-ext-glitch`, `--bbangto-ext-sunset`.
- **W**: Button/Card에 네온 글로우 보더·그리드 배경.
- **PT**: 음악 플레이어, 이벤트 랜딩, 레트로 갤러리.
- **VM**: 80s 신스 노스탤지어 — 네온 그리드·글리치·석양.
- **G**: 다크+네온 대비 검증, 글리치/모션 비활성 옵션(발작 위험 회피).

### 12. Memphis_Postmodern_01
- **F**: 고채도 충돌색(핑크/시안/노랑/검정) + 파스텔. 지그재그/물방울/테리조 패턴. 산세리프 굵게. radius 혼합.
- **EF**: `--bbangto-ext-squiggle`, `--bbangto-ext-terrazzo`, `--bbangto-ext-confetti` 패턴 토큰.
- **W**: Card/Tag/Button에 도형 패턴·비대칭 장식.
- **PT**: 이벤트/축제 랜딩, 피처 그리드, 갤러리.
- **VM**: 80s 포스트모던 — 장난스러운 도형·패턴 충돌.
- **G**: 패턴 위 텍스트 가독성, 시각 소음 한계 명시.

### 13. FrutigerAero_Glossy_01
- **F**: 스카이블루·그린·화이트, 자연(물/잎/하늘) 모티프. 에어로 글로스. 산세리프 둥근. radius `lg`.
- **EF**: `--bbangto-ext-aqua-gloss`, `--bbangto-ext-bubble`, `--bbangto-ext-sky-gradient`.
- **W**: Button(아쿠아 글로시), Card(투명 글라스+자연 배경).
- **PT**: 가전/웰니스 랜딩, 위젯 대시보드.
- **VM**: 2000년대 후반 낙관적 테크-자연 글로스.
- **G**: 글로스 대비 보강, 자연 이미지 대체텍스트.

### 14. Retro70s_Warm_01
- **F**: 머스타드/테라코타/올리브/크림. groovy 라운드 산세리프 디스플레이. radius `xl`(버블 라운드).
- **EF**: `--bbangto-ext-arch`(아치 형태), `--bbangto-ext-grain`(필름 그레인).
- **W**: Button/Tag 알약형, Card 아치 상단.
- **PT**: 브랜드 Hero, 메뉴, 어바웃.
- **VM**: 70s 따뜻한 노스탤지어 — 어스톤·아치·그루비 타이포.
- **G**: 어스톤 대비 확인, 그레인 텍스처 가독성.

### 15. Maximalism_Dopamine_01
- **F**: 고채도 다색 충돌 + 대형 가변 타이포. 겹침 레이아웃. radius 혼합. 강한 그림자/보더.
- **EF**: `--bbangto-ext-overlap`, `--bbangto-ext-outline-text`, `--bbangto-ext-pattern`.
- **W**: Button/Heading 초대형·아웃라인, Card 겹침·회전.
- **PT**: 브랜드 캠페인 Hero, 갤러리, 피처.
- **VM**: 풍요·과잉·에너지 — 색·타이포·밀도의 의도적 충돌.
- **G**: 위계 명료성 유지(과잉 속 가독성), reduce-motion·대비 강제 모드.

### 16. Collage_Scrapbook_01
- **F**: 종이/크라프트 배경, 손그림 + 사진 컷아웃. 핸드라이팅 + 산세리프 혼합. radius 불규칙.
- **EF**: `--bbangto-ext-tape`(테이프), `--bbangto-ext-torn-edge`, `--bbangto-ext-sticker`, `--bbangto-ext-rotate`.
- **W**: Card(폴라로이드/테이프), Tag(스티커), Button(손그림 보더).
- **PT**: 무드보드, 포트폴리오, 이벤트.
- **VM**: 아날로그 콜라주 — 찢김·테이프·손글씨의 즉흥성.
- **G**: 손그림 텍스트는 이미지화 시 대체텍스트, 회전 요소 터치 타깃.

### 17. Kawaii_Pastel_01
- **F**: 파스텔(베이비핑크/민트/라벤더) + 화이트. 둥근 마루부분 폰트. radius `xl`.
- **EF**: `--bbangto-ext-blush`(볼터치 글로우), `--bbangto-ext-mascot`, `--bbangto-ext-soft-shadow`.
- **W**: Button/Card/Avatar 둥글둥글, 마스코트 아이콘.
- **PT**: 온보딩, 커뮤니티, 굿즈 스토어.
- **VM**: 귀여움 — 둥근 형태·파스텔·마스코트의 친근함.
- **G**: 파스텔 저대비 보강, 마스코트 의미 전달 보조텍스트.

### 18. Cyberpunk_Hud_01
- **F**: 다크 베이스(near-black) + 네온(시안/마젠타/엘로) 엣지. 모노/콘덴스트 폰트. radius `none~sm`, 클립 모서리.
- **EF**: `--bbangto-ext-neon-edge`, `--bbangto-ext-scanline`, `--bbangto-ext-hud-frame`(코너 브래킷), `--bbangto-ext-glitch`.
- **W**: Button/Card에 클립패스 모서리·네온 보더·HUD 프레임. Badge=상태 LED.
- **PT**: 대시보드/콘솔, 게임 UI, 데이터 HUD.
- **VM**: 디스토피아 하이테크 — 네온 엣지·스캔라인·각진 HUD.
- **G**: 다크+네온 대비 검증, 글리치/스캔라인 모션 비활성 옵션, 포커스 가시성.

### 19. Terminal_Mono_01
- **F**: 다크 콘솔 배경 + 포스포 그린/앰버 또는 모던 멀티. **모노스페이스 전면**(IBM Plex Mono류). radius `none`.
- **EF**: `--bbangto-ext-cursor`(블링크), `--bbangto-ext-prompt`(`$`/`>`), `--bbangto-ext-ascii-border`.
- **W**: Button/Input/Card = 콘솔 박스(ASCII/1px 보더), 커서·프롬프트 표기.
- **PT**: CLI 데모, 로그/모니터, 코드 블록, 개발자 랜딩.
- **VM**: 터미널 미학 — 모노 타이포·프롬프트·커서·박스 드로잉.
- **G**: 모노 본문 가독성(짧은 행), 깜빡임 모션 옵션, 대비 충분.

### 20. Aurora_Gradient_01
- **F**: 다크 또는 딥 배경 + 메시/오로라 그라디언트, 부유 글로우. 산세리프. radius `lg`.
- **EF**: `--bbangto-ext-mesh`(다점 그라디언트), `--bbangto-ext-glow-orb`, `--bbangto-ext-noise`.
- **W**: Card/GNB는 다크 글래스, Button은 그라디언트 fill·glow.
- **PT**: AI/SaaS 랜딩 Hero, 피처, Pricing.
- **VM**: 부드러운 빛의 흐름 — 메시 그라디언트·글로우·노이즈.
- **G**: 그라디언트 위 텍스트 대비, 모션(흐르는 그라디언트) reduce 옵션.

### 21. ArtDeco_Luxe_01
- **F**: 흑·딥그린/네이비 + 골드. 대칭·기하 장식. 디스플레이 세리프(고전). radius `none`(+ 기하 프레임).
- **EF**: `--bbangto-ext-gold-line`, `--bbangto-ext-deco-frame`(기하 보더), `--bbangto-ext-fan`(부채꼴).
- **W**: Card/Button에 골드 라인 프레임·대칭 장식.
- **PT**: 럭셔리 브랜드/호텔/이벤트 랜딩, 초대장.
- **VM**: 1920s 데코 럭셔리 — 골드·대칭·기하 장식.
- **G**: 골드 온 다크 대비 확인, 장식 라인의 의미성 구분.

### 22. Scandi_Warm_01
- **F**: 따뜻한 오프화이트/베이지 + 우드톤 + 절제된 액센트(세이지/테라). 휴머니스트 산세리프. radius `md`(부드럽게).
- **EF**: `--bbangto-ext-paper-warm`, `--bbangto-ext-soft-divider`.
- **W**: Card/Button 절제된 라운드·낮은 그림자, 자연 톤.
- **PT**: 커머스, 라이프스타일, 포트폴리오.
- **VM**: 북유럽 따뜻한 미니멀 — 자연 소재감·여백·절제.
- **G**: 저채도 대비 보강, 여백/위계 균형.

### 23. DarkLuxe_Editorial_01
- **F**: 순흑/차콜 + 골드 또는 단일 채도 액센트. 대형 디스플레이 세리프 + 산세리프 본문. 시네마틱 여백. radius `none~sm`.
- **EF**: `--bbangto-ext-hairline`, `--bbangto-ext-letter-wide`(트래킹), `--bbangto-ext-reveal`(스크롤 등장).
- **W**: Heading 초대형 세리프, Button 미니멀 보더, Card 풀블리드 이미지.
- **PT**: 패션/브랜드 룩북, 시네마틱 Hero, 케이스 스터디.
- **VM**: 다크 편집 럭셔리 — 고대비 세리프·넓은 여백·시네마틱 리듬.
- **G**: 다크 본문 가독성(밝기/행간), 등장 모션 reduce 옵션.

### 24. Bento_Modular_01
- **F**: 중립 배경 + 1~2 액센트(콘텐츠 컬러는 타일별 가변). radius `lg`(16–20px, 도시락 셀). spacing 균일 gap, soft elevation. 타이포 산세리프.
- **EF**: `--bbangto-ext-bento-gap`, `--bbangto-ext-bento-radius`, `--bbangto-ext-tile-elevation`, `--bbangto-ext-tile-span`(grid-area 헬퍼).
- **W**: Card → BentoTile(다양한 span: 1×1/2×1/2×2). GNB/Section은 그리드 컨테이너 래퍼. Button은 타일 내 인라인.
- **PT**: **핵심** — 대시보드, 랜딩 Hero(피처 타일 군집), 프로필/포트폴리오, Pricing. 비대칭·균형 모듈 배치.
- **VM**: 일본 도시락 메타포 — 크기 다른 모듈을 비대칭·균형으로 채운 그리드가 곧 레이아웃 언어. (정적 → 호버 시 타일 확장 옵션)
- **G**: 컴포넌트보다 **레이아웃/패턴 중심** 카탈로그. 반응형 셀 재배치(모바일 단일 컬럼) 규칙, 타일 내 콘텐츠 대비·터치 타깃, 호버 확장 시 reduce-motion 분기.

### 25. Kinetic_Typography_01
- **F**: 미니멀 배경(흑/백 또는 단색) + 단일 강조. 초대형 가변 폰트(variable font) 전제. radius `none~sm`.
- **EF**: `--bbangto-ext-kinetic-duration`, `--bbangto-ext-kinetic-stagger`, `--bbangto-ext-text-weight-range`(가변축), `--bbangto-ext-marquee-speed`.
- **W**: Heading/Display → KineticText(커서·스크롤 반응 스트레치/트위스트/웨이트 변화), Marquee, SplitText(글자 단위 stagger). Button은 호버 시 자간/웨이트 모핑.
- **PT**: 랜딩 Hero, 아젠다/섹션 전환, 타이포 포스터, 인트로 시퀀스.
- **VM**: 텍스트가 수동 요소가 아닌 **능동 인터랙션 포인트** — 색/크기/투명도/웨이트가 입력에 반응.
- **G**: ⚠ **모션 의존** → `prefers-reduced-motion: reduce` 시 정적 폴백 필수(story `play`에서 검증). 가변폰트 미지원 폴백, 모션 중 가독성(과한 왜곡 금지), 발작 위험 빠른 깜빡임 회피.

### 26. Spatial_3D_01
- **F**: 딥/뉴트럴 배경 + 라이팅 기반 음영. radius `md~lg`. 깊이 표현용 perspective. 산세리프.
- **EF**: `--bbangto-ext-perspective`, `--bbangto-ext-depth-z`(레이어 z), `--bbangto-ext-tilt`(마우스 시차), `--bbangto-ext-3d-shadow`, `--bbangto-ext-fallback-img`(정적 폴백).
- **W**: Card → TiltCard(마우스 시차 3D 회전), HeroScene(WebGL/`<model-viewer>` 슬롯), Button은 깊이 press. 3D 캔버스는 lazy 슬롯.
- **PT**: 제품 쇼케이스, 랜딩 Hero(3D 오브젝트), AR 프리뷰, 인터랙티브 스토리.
- **VM**: 스크롤·포인터에 반응하는 공간 깊이 — 시차·틸트·라이팅으로 평면을 입체로.
- **G**: ⚠ **구현 난도·성능 비용 큼(P3)** — WebGL 미지원/저사양 폴백(정적 이미지) 필수, lazy-load·메모리 관리, reduce-motion 시 시차/회전 정지, 3D 콘텐츠 대체텍스트.

### 27. Humanist_Imperfect_01
- **F**: 웜 페이퍼/오프화이트 배경 + 어스/잉크 톤. **손글씨·휴머니스트 산세리프 혼합**. radius 불규칙(손그림). 미세 그레인.
- **EF**: `--bbangto-ext-ink-stroke`(손그림 보더), `--bbangto-ext-wobble`(미세 비틀림), `--bbangto-ext-grain`, `--bbangto-ext-underline-sketch`.
- **W**: Button/Card/Tag에 손그림 보더·약간 어긋난 정렬·유기 곡선. Heading은 핸드드로운 강조(밑줄/동그라미).
- **PT**: 브랜드 어바웃, 포트폴리오, 커뮤니티/뉴스레터, 일러스트 Hero.
- **VM**: 의도적 불완전함 — 손그림 형태·유기 곡선·미세 결함으로 따뜻함·진정성(감성 주도).
- **G**: 손그림 요소 이미지화 시 대체텍스트, 비틀림·정렬 어긋남이 가독성/터치 타깃 해치지 않도록 한계 명시, 본문은 가독 폰트 유지(손글씨는 강조에만).

### 28. Tactile_Texture_01
- **F**: 파스텔/소프트 톤 + 밝은 배경. radius `xl`(두툼·말랑). 큰 spacing. 부드러운 그림자.
- **EF**: `--bbangto-ext-puffy-shadow`(이중 소프트), `--bbangto-ext-squish`(press 시 눌림 트랜지션), `--bbangto-ext-noise-texture`, `--bbangto-ext-hyperreal-gloss`.
- **W**: Button/Card/Avatar에 퍼피·스퀴시 질감(눌리는 인터랙션), 하이퍼리얼 오브젝트 + 장난스런 왜곡.
- **PT**: 온보딩, 굿즈/커머스, 게임화 UI, 일러스트 Hero.
- **VM**: 촉각 모사 — 만짐/눌림을 시각화한 퍼피·소프트·스퀴시 질감 + 하이퍼리얼 디테일.
- **G**: 과한 그림자/질감의 시각 소음 주의, squish 모션 reduce-motion 분기, 텍스처 위 텍스트 대비 보강, 정보 밀도 높은 화면엔 부적합 명시.

---

## 일괄 생성 시 참고

1. **기준 구현**: `packages/core/src/styleGuides/`(`bakery*` 파일군)이 6요소 전체 구현의 레퍼런스. 동일 파일 분해(F/EF/W/PT/G/VM) 패턴을 따른다.
2. **단일 출처 상수**: `bakeryFoundations.ts`의 `BAKERY` 상수처럼, preset별 핵심 색·파라미터를 한 상수 객체로 선언해 foundations·extendedFoundations가 공유(drift 방지).
3. **접근성 게이트**: 저대비 본질을 가진 모티프(Neumorphism/Glassmorphism/Pastel/Maximalism)는 텍스트/포커스 대비를 별도 토큰으로 강제, story `play`에서 검증.
4. **모션 안전**: 글리치/스캔라인/흐르는 그라디언트는 `prefers-reduced-motion` 분기 필수.
5. **콘텐츠 정책**: 모든 데모 콘텐츠는 가상 placeholder, 라우팅 불가 연락처(`example.invalid`)만. 정적 grep 게이트로 회귀 방지.
6. **명명 충돌**: 표시명 인덱스(`_NN`)로 같은 트렌드의 변주를 구분(예: `Glassmorphism_Aurora_01` / `Glassmorphism_Light_02`).

## 출처 (조사 근거)
- [Top UI Design Trends 2026 — Brandemic](https://brandemic.in/blog/must-know-ui-design-trends)
- [Neumorphism vs Glassmorphism vs Neubrutalism — CC Creative](https://www.cccreative.design/blogs/differences-in-ui-design-trends-neumorphism-glassmorphism-and-neubrutalism)
- [Top Web Design Trends for 2026 — Figma](https://www.figma.com/resource-library/web-design-trends/)
- [50 Design Styles Every Designer Should Know — UX Planet](https://uxplanet.org/50-design-styles-every-designer-should-know-for-better-prompting-56c09d55db62)
- [List of Aesthetics / Memphis / Y2K / Neubrutalism — Aesthetics Wiki](https://aesthetics.fandom.com/wiki/List_of_Aesthetics)
- [25+ Graphic Design Styles Explained — Dezignz](https://dezignz.org/types-of-graphic-design-styles/)
- [Cyberpunk Design Trends & Aesthetics — Brainstorm](https://brainstormprojects.studio/cyberpunk-design-style/)

---

## 이미지 레퍼런스 마이닝 신규 후보 (#29–#50)

> 출처: `image-references/`(2020–2026, **999장 전수**) 시각 분류 파이프라인. **분류(84배치 전수 view) → 노벨 클러스터링 → 항목별 6요소 스펙 생성** 3단 공정으로 도출.
> 999장을 29개 기존 스타일로 1차 분류 → 어디에도 안 맞는 **116장**을 노벨 플래그 → 중복 병합해 **22개 신규 후보 클러스터**로 정리(전부 distinctness 통과). 기존 #1–28(웹 리서치 기반)을 **실제 이미지 증거로 보강·확장**한다.

### 전수 분류 분포 (기존 29 스타일 커버리지)

> 999장 중 기존 스타일로 분류된 분포(상위). 레퍼런스가 실제로 어떤 트렌드에 치우쳐 있는지 보여준다.

| 스타일 | 장수 | | 스타일 | 장수 |
|--------|-----:|--|--------|-----:|
| editorial-magazine | 78 | | bento-modular | 25 |
| minimal-saas | 75 | | claymorphism-playful | 19 |
| humanist-imperfect | 67 | | kawaii-pastel | 15 |
| maximalism-dopamine | 65 | | terminal-mono | 15 |
| collage-scrapbook | 63 | | vaporwave-synth | 14 |
| swiss-international | 56 | | glassmorphism-aurora | 12 |
| y2k-futurism | 56 | | scandi-warm | 11 |
| cyberpunk-hud | 49 | | retro70s-warm | 10 |
| aurora-gradient | 49 | | darkluxe-editorial | 8 |
| spatial-3d | 47 | | neumorphism-soft | 5 |
| bauhaus-geometric | 37 | | flat-material | 5 |
| kinetic-typography | 29 | | frutiger-aero-glossy | 5 |
| neobrutalism-editorial | 25 | | tactile-texture | 5 |
| memphis-postmodern | 25 | | artdeco-luxe | 2 |

*기존 스타일 분류 합계 ≈ 872장 / 노벨 116장 → 22 클러스터.*

### 신규 후보 요약 (#29–#50)

| # | 표시명 | slug | 패밀리 | 근거장수 | 핵심 모티프 | 차별점(요약) | P |
|---|--------|------|--------|---------:|-------------|--------------|---|
| 29 | RisographPrint_01 | `risograph-print` | 노스탤지어 | 10 | 거친 그레인 + 한정 색 분판(마젠타·블루·옐로) 오버프린트, 인쇄소 질감의 포스터/인물 | 가장 가까운 기존 스타일은 tactile-texture지만, 그것은 일반 물성 질감이고 이쪽은 '리소/스… | P1 |
| 30 | BlueprintTechnical_02 | `blueprint-technical` | 평면/체계 | 10 | 블루/그린 청사진 그리드 + 치수선·아이소메트릭·라벨 도식의 엔지니어링 제도 레이아웃 | swiss-international/minimal-saas와 달리 단순 그리드가 아니라 '제도 청사진(측… | P1 |
| 31 | GrainyBlurDreamy_03 | `grainy-blur-dreamy` | 깊이/material | 14 | 소프트 포커스 + 필름 그레인 + 흐릿한 그라데이션/인물, 몽환적 안개 분위기 | aurora-gradient/glassmorphism-aurora는 매끈하고 선명한 그라데이션 | P1 |
| 32 | GothicMedievalDigital_04 | `gothic-medieval-digital` | 테크/다크 | 10 | 중세 문장·블랙레터·오컬트 성물 심볼 + 네온/디지털 블록의 다크 퓨전 | artdeco-luxe/darkluxe-editorial는 세련된 럭셔리 톤 | P1 |
| 33 | GlitchDistortion_05 | `glitch-distortion` | 테크/다크 | 10 | 디지털 글리치·픽셀 깨짐·RGB 시프트로 왜곡된 인물/이미지, 네온 마젠타·시안 | cyberpunk-hud는 HUD/인터페이스 오버레이가 주제 | P1 |
| 34 | OrganicFluidBlob_06 | `organic-fluid-blob` | 표현/에너지 | 7 | 흐르는 바이오모픽 블롭·리본·스우시, 매끈한 곡선과 비비드/파스텔 색면 | spatial-3d는 입체 UI 오브젝트, claymorphism-playful은 점토 질감 | P1 |
| 35 | RadiantGlowDark_07 | `radiant-glow-dark` | 테크/다크 | 6 | 어두운 바탕 위 강렬한 발광 그라데이션·광선·실루엣, 노이즈 섞인 네온 글로우 | aurora-gradient는 밝고 매끈한 파스텔 그라데이션 | P1 |
| 36 | HalftoneDotPrint_08 | `halftone-dot-print` | 노스탤지어 | 6 | CMYK 망점/스크린톤 도트 패턴 인쇄 기법 시연(사과 등), 색 분해 그라데이션 | risograph-print와 인접하지만 색분판 오버프린트가 아니라 '규칙적 망점/비트맵 도트 격자 자체… | P2 |
| 37 | UkiyoeWoodblock_09 | `ukiyoe-woodblock` | 노스탤지어 | 4 | 일본 우키요에 목판화(후지산·분재), 절제된 흙빛 팔레트의 서정 풍경 | retro70s-warm/scandi-warm의 따뜻한 톤과 색만 비슷할 뿐, 이쪽은 '전통 목판화 평면… | P2 |
| 38 | PunkGrungeGraffiti_10 | `punk-grunge-graffiti` | 표현/에너지 | 5 | 찢긴 종이·손글씨 그래피티·거친 마크의 반(反)정제 카오스 콜라주 | neobrutalism-editorial는 굵고 정돈된 의도적 투박함, collage-scrapbook은… | P2 |
| 39 | AISurrealGradient3D_11 | `ai-surreal-gradient3d` | 깊이/material | 4 | 불가능한 유기적 3D 형상 + 무지갯빛 그라데이션의 AI 생성 초현실 렌더 | spatial-3d는 정돈된 UI 입체물, organic-fluid-blob은 평면 블롭 | P2 |
| 40 | ShatteredGlassCinematic_12 | `shattered-glass-cinematic` | 깊이/material | 3 | 깨진/금 간 유리 오버레이 + 빛 굴절·이리데센트, 어두운 시네마틱 결정질 | glassmorphism-aurora는 매끈한 반투명 프로스트 패널 UI | P2 |
| 41 | PixelArtRetro_13 | `pixel-art-retro` | 노스탤지어 | 3 | 8비트 픽셀 블록 타이포 + 그리드 배경, 레트로 디지털 도트 미감 | terminal-mono는 모노스페이스 텍스트 터미널, y2k-futurism은 크롬/거품 | P2 |
| 42 | HalftoneGlitchColorSep_14 | `halftone-glitch-colorsep` | 테크/다크 | 4 | 망점 + RGB/적녹 색분해 어긋남 + 픽셀 왜곡 콜라주의 디지털 일그러짐 | 순수 halftone-dot-print(정적 인쇄망점)와 glitch-distortion(채널 파괴) 사… | P2 |
| 43 | MixedMediaCollage_15 | `mixed-media-collage` | 표현/에너지 | 3 | 일러스트·사진·3D·빈티지 요소를 매끈히 합성한 멀티미디어 레이어 합성 | collage-scrapbook은 날것의 오려붙인 종이 콜라주 | P2 |
| 44 | PhotoTypeEditorial_16 | `photo-type-editorial` | 타이포/편집 | 4 | 큰 글자 안에 사진을 채우거나 사진에 타이포/기하 프레임을 겹친 에디토리얼 | editorial-magazine은 그리드 기반 레이아웃 자체가 주제 | P3 |
| 45 | OpArtKinetic_17 | `op-art-kinetic` | 평면/체계 | 2 | 동심원·평행선·줄무늬가 만드는 착시와 운동감의 옵아트 추상 | bauhaus-geometric는 정적 기하 구성, kinetic-typography는 글자 모션 | P3 |
| 46 | WarpedCheckerboard_18 | `warped-checkerboard` | 표현/에너지 | 2 | 적·핑크 체크/깅엄 패턴을 파도처럼 유체 왜곡시킨 격자 디스토션 | memphis-postmodern의 패턴 사용과 달리, 이쪽은 '규칙 체크 격자를 액화·물결 왜곡'시키는… | P3 |
| 47 | IridescentChrome_19 | `iridescent-chrome` | 깊이/material | 2 | 무지갯빛 홀로그래픽 포일·광택 액체 메탈/크롬의 반짝이는 표면 | frutiger-aero-glossy/glassmorphism-aurora는 투명 광택이지만, 이쪽은 '… | P3 |
| 48 | RomanticBotanical_20 | `romantic-botanical` | 노스탤지어 | 2 | 파스텔 꽃·나비·식물 라인아트가 어우러진 로맨틱·자연 정원 무드 | scandi-warm/kawaii-pastel과 톤은 겹치나, 이쪽은 '식물·꽃·나비 도상과 핸드드로잉 … | P3 |
| 49 | HeritageFolkOrnament_21 | `heritage-folk-ornament` | 노스탤지어 | 1 | 풍성한 민속 문양·꽃 모티프·장식 보더의 비비드 흙빛 오너먼트 | gothic-medieval-digital의 어두운 도상과 달리, 이쪽은 '밝고 비비드한 민속·포크 장식… | P3 |
| 50 | NaiveDoodle_22 | `naive-doodle` | 표현/에너지 | 1 | 비숙련 손그림 낙서·스크리블의 어린아이 같은 천진한 카오스 | humanist-imperfect는 세련된 의도적 불완전이고 punk-grunge는 공격적 | P3 |

> ⚠ 인쇄/망점 계열 3종(`risograph-print` #29 · `halftone-dot-print` #36 · `halftone-glitch-colorsep` #42)은 인접 — 구현 시 한 패밀리의 변주(_01/_02/_03)로 묶는 것을 검토. `glitch-distortion` #33 ↔ `halftone-glitch-colorsep` #42 도 일부 겹침.

### 항목별 생성 명세 (#29–#50)

#### 29. RisographPrint_01 (`risograph-print`)  — P1, 근거 10장
- **근거 이미지**: 2020/design-trend-2020-074.webp, 2022/design-trend-2022-065.webp, 2023/design-trend-2023-054.jpg, 2023/design-trend-2023-055.webp, 2024/design-trend-2024-051.jpg
- **F**: 팔레트: 종이 베이스(웜 오프화이트/크림 #F4F0E6류) + 리소 잉크 스팟 컬러 2~3개 한정(플루오 마젠타/페더레이션 블루/플루오 옐로 — RGB 근사값). 잉크는 불투명이 아니라 반투명 오버랩(곱셈/multiply) 전제. 타이포: 잉크 묻은 듯 굵은 그로테스크 산세리프 디스플레이(헤드라인 초대형) + 본문 휴머니스트 산세리프. spacing: 포스터형 넉넉한 여백 + 헤드라인 밀착. radius `none~sm`(인쇄물 평면). shadow: 드롭섀도 거의 없음 — 깊이는 그림자가 아니라 색 분판 어긋남(미스레지스트레이션)으로 표현.
- **EF**: `--bbangto-ext-riso-grain`(인쇄 그레인/노이즈 texture overlay), `--bbangto-ext-riso-misregister-x/y`(분판 오프셋 px), `--bbangto-ext-riso-ink-1/2/3`(스팟 잉크 색), `--bbangto-ext-riso-blend: multiply`(오버프린트 합성 모드), `--bbangto-ext-riso-halftone`(망점 dot 패턴), `--bbangto-ext-riso-paper`(종이 텍스처 배경), `--bbangto-ext-riso-ink-opacity: 0.85`(잉크 반투명).
- **W**: Card → RisoCard(종이 배경 + 그레인 + 이미지에 듀오톤/망점 처리). Button → 단색 잉크 면 + 호버 시 분판 어긋남(마젠타/블루 레이어가 살짝 밀림). Tag/Badge → 스탬프형 잉크 라벨. Heading/Display → 오버프린트 헤드라인(두 잉크 레이어가 겹친 부분에 제3색 발생). Image/Figure → 듀오톤 + halftone + 그레인 래퍼. 공통: 컴포넌트는 `mix-blend-mode: multiply` 잉크 레이어를 겹쳐 합성.
- **PT**: 포스터형 Hero(초대형 헤드라인 + 인물/식물 듀오톤 + 분판 어긋남), 갤러리/룩북(망점 이미지 그리드), 이벤트/뮤직 랜딩, 잡지형 에디토리얼 표지, 사이드 세로 캡션 레일(예시 이미지의 좌우 세로 텍스트). 반복 단위: 종이 위 한정 잉크 면 분할 + 그레인 오버레이.
- **VM**: 한정된 스팟 잉크의 반투명 오버프린트가 겹쳐 제3색을 만들고, 의도적 분판 미스레지스트레이션과 인쇄 그레인/망점이 화면 전체를 덮는 — 디지털이 아닌 리소/스크린프린트 인쇄소 질감.
- **G**: Do: 잉크는 2~3색으로 한정(리소 본질), 오버랩은 multiply로 제3색 생성, 그레인/망점은 장식이 아닌 베이스 질감으로 전면 적용. Don't: 부드러운 그라디언트·드롭섀도·풀컬러 사진(공정 언어와 충돌), 분판 오프셋 과다로 본문 흔들기 금지. 접근성 ⚠: (1) 플루오 잉크(특히 옐로) on 크림 종이는 WCAG 대비 미달 위험 — 본문/소형 텍스트는 잉크 농도 높은 색(블루/마젠타)이나 잉크-오버프린트 다크 영역에만 배치하고 대비 토큰 별도 강제. (2) 미스레지스트레이션은 헤드라인/장식 한정, 본문은 정합 유지(가독성). (3) 그레인/망점 텍스처 위 텍스트 대비 보강, 텍스처는 정적(모션 아님)이라 reduce-motion 부담 적으나 호버 분판 이동은 reduce-motion 분기. 필수 웹폰트: 굵은 그로테스크 디스플레이(예: Archivo/Anton류) + 휴머니스트 산세리프 본문, 듀오톤 이미지는 대체텍스트 필수.

#### 30. BlueprintTechnical_02 (`blueprint-technical`)  — P1, 근거 10장
- **근거 이미지**: 2021/design-trend-2021-004.jpg, 2022/design-trend-2022-004.jpg, 2024/design-trend-2024-012.jpg, 2025/design-trend-2025-012.jpg, 2026/design-trend-2026-039.jpg
- **F**: 팔레트: 청사진 블루(cyanotype #1E3A8A~#0B3D91) 또는 드래프팅 그린(#1F5C3D) 베이스에 화이트/크림 라인. 액센트는 패턴 라벨용 주홍·옐로 1색. typography: 본문은 모노/도면 라벨용 좁은 산세리프(대문자·자간 넓힘), 치수·번호는 모노 숫자. spacing: 모눈(8px 그리드)에 강하게 정렬, 넉넉한 라벨 여백. radius: sm(2~4px) 거의 각진 도면. shadow: 그림자 없음 — 깊이는 1px 라인·아이소메트릭 투상으로만 표현.
- **EF**: `--bbangto-ext-blueprint-bg`(딥 블루/그린 보드 색), `--bbangto-ext-grid-line`(모눈 1px rgba 화이트 0.12), `--bbangto-ext-grid-size: 8px`, `--bbangto-ext-draft-stroke`(라인 두께 1px), `--bbangto-ext-draft-ink`(화이트/크림 선색), `--bbangto-ext-dim-line`(치수선+화살촉 색), `--bbangto-ext-callout`(라벨 리더선 색), `--bbangto-ext-iso-skew`(아이소메트릭 30° 변환값).
- **W**: Card는 모눈 배경 + 1px 외곽선 + 좌상단 도면번호/리비전 캡션을 두른 "도면 프레임"으로 래핑. Button은 채움 없는 아웃라인 + 모서리 코너 마크(crop mark) 부착. Tag/Badge는 치수선 스타일 라벨(리더선 + 캡슐) 또는 부품 번호 원형 콜아웃. Input/Divider는 도면 치수선처럼 화살촉 끝단 적용.
- **PT**: Hero(아이소메트릭 분해도 + 치수선·라벨 콜아웃이 제품/개념을 도해). Spec/Feature 섹션(번호 매긴 콜아웃 리스트 = 부품표). Dashboard(모눈 위 스키매틱 카드 그리드). Comparison/Pricing(도면 표 형식 + 치수 주석). Process/Diagram(노드-라인 회로/조립 흐름도).
- **VM**: 청사진 모눈 보드 위, 채움 없는 1px 화이트 라인 드로잉 + 화살촉 치수선과 번호 콜아웃 라벨, 아이소메트릭 투상으로 구성한 엔지니어링 제도 도면.
- **G**: Do: 모눈·치수선·콜아웃을 실제 정렬 가이드로 일관 사용, 라인 한 두께(1px) 유지, 라벨은 모노/대문자. Don't: 그림자·그라디언트·채움 도형 남발 금지(평면 라인 미감 훼손), 장식용 치수선을 의미 없이 흩뿌리지 말 것. 접근성 ⚠: 딥 블루/그린 위 얇은 1px 라인·저대비 모눈은 WCAG 1.4.3/1.4.11(텍스트·비텍스트 대비) 위배 위험 — 본문 텍스트는 화이트로 4.5:1 이상 확보하고 모눈은 장식(aria-hidden)으로 처리, 1px hairline은 포커스·핵심 정보 전달에 단독 사용 금지(2px 또는 고대비 보강). 콜아웃 번호는 색만이 아닌 텍스트 라벨 병기. 필수 웹폰트: 좁은 기하 산세리프(예: Archivo/Oswald 류) + 모노(예: JetBrains Mono/IBM Plex Mono 류 도면 숫자용).

#### 31. GrainyBlurDreamy_03 (`grainy-blur-dreamy`)  — P1, 근거 14장
- **근거 이미지**: 2020/design-trend-2020-087.jpg, 2023/design-trend-2023-087.jpg, 2023/design-trend-2023-097.jpg, 2024/design-trend-2024-027.webp, 2025/design-trend-2025-042.jpg
- **F**: 팔레트: 채도 높지만 톤 부드러운 그라디언트(코랄/피치, 라벤더/바이올렛, 인디고/스카이, 머스타드) + 웜 오프화이트 종이 배경. 텍스트는 잉크 블랙/딥 블루 단색. typography: 대형 산세리프 디스플레이(굵게, 압축형 가능) + 절제된 본문 산세리프, 헤드라인은 블러 그라디언트 위로 겹침. spacing: 넉넉, 시네마틱 여백. radius: lg(16~24px, 사진 카드 모서리). shadow: 윤곽 없는 soft ambient(빛이 번지는 헤이즈), 하드 그림자 금지.
- **EF**: `--bbangto-ext-grain`(SVG feTurbulence/노이즈 오버레이 텍스처), `--bbangto-ext-grain-opacity`(0.06~0.18), `--bbangto-ext-soft-focus-blur`(8~32px 아웃포커스 블러), `--bbangto-ext-haze-gradient`(저대비 다점 라디얼/메시 그라디언트), `--bbangto-ext-blend-mode`(overlay/soft-light, 그레인 합성), `--bbangto-ext-defocus-radius`(피사체 가장자리 페더). aurora 계열의 mesh 토큰과 달리 grain+blur 합성이 1급 토큰.
- **W**: Card → HazeCard(블러 그라디언트/이미지 배경 + 그레인 오버레이 + 페더 가장자리). Button → 그라디언트 fill에 미세 그레인, 호버 시 블러 살짝 선명화. Tag/Badge → 반투명 헤이즈 칩. Avatar/Figure → 소프트포커스 인물(가장자리 디포커스). Hero 컨테이너 → 풀블리드 그레인+블러 레이어. 모든 래퍼는 공유 GrainOverlay 레이어를 합성.
- **PT**: Hero(블러 그라디언트/인물 위 대형 헤드라인 오버랩), 포스터형 갤러리/룩북, 무드보드 카드 그리드, 음악/앨범·이벤트 랜딩, About/브랜드 감성 섹션, 인용·문구 카드. 사진적 헤이즈가 배경 언어.
- **VM**: 가시적 필름 그레인 + 의도적 아웃포커스 블러가 그라디언트/인물 위에 겹쳐 몽환적 안개(포토그래픽 헤이즈)를 만든다 — 매끈함이 아니라 '입자감 있는 흐림'이 시그니처.
- **G**: Do: 헤드라인은 선명한 단색 텍스트를 블러 레이어 위에 분리해 올리고 충분한 대비 확보; 그레인은 텍스처 레이어로만, 텍스트 자체엔 적용 금지. Don't: 흐릿한 그라디언트 위에 저대비 텍스트 직접 올리기(가독성 붕괴), 그레인 opacity 과다(시각 소음·motion 시 깜빡임). ⚠ 접근성: 저대비·블러 배경 본질 → 본문/CTA는 솔리드 배경칩 또는 4.5:1 이상 대비 강제, 포커스 링은 그레인 위에서도 보이도록 별도 토큰. 애니메이션 그레인/흐름 그라디언트는 `prefers-reduced-motion: reduce` 시 정지(빠른 입자 깜빡임 발작 위험 회피). 블러는 CSS filter/배경 이미지로, 콘텐츠 텍스트엔 미적용. 인물/그라디언트 이미지는 대체텍스트. 필수 웹폰트: 대형 산세리프 디스플레이(예: Inter Tight / Anton / Archivo 류 굵은 그로테스크) + 가독 본문 산세리프(Inter).

#### 32. GothicMedievalDigital_04 (`gothic-medieval-digital`)  — P1, 근거 10장
- **근거 이미지**: 2020/design-trend-2020-095.jpg, 2021/design-trend-2021-018.jpg, 2023/design-trend-2023-074.jpg, 2024/design-trend-2024-023.jpg, 2026/design-trend-2026-105.jpg
- **F**: near-black/딥 옥스블러드(번트 레드)·차콜 베이스 + 본 화이트·뮤트 골드/실버. 시그니처 충돌 액센트로 단일 네온(핑크/시안/라임 중 1) 블록. 타이포는 블랙레터/맥락 디스플레이 세리프 헤드 + 휴머니스트 산세리프 본문 혼합. spacing은 빽빽한 헤드 + 넓은 다크 여백 대비. radius `none~sm`(고딕 각짐, 아치 상단은 예외 곡선). shadow는 낮고 단단한 드롭 + 네온 글로우 한정.
- **EF**: `--bbangto-ext-blackletter-tracking`(블랙레터 자간), `--bbangto-ext-crest-frame`(문장/방패 프레임 보더), `--bbangto-ext-arch`(첨두/반원 아치 상단), `--bbangto-ext-seal`(왁스 인장 원형 엠블럼), `--bbangto-ext-sunburst`(성물 방사선/halo), `--bbangto-ext-neon-block`(충돌 네온 면), `--bbangto-ext-grain`(인쇄/스캔 그레인 텍스처), `--bbangto-ext-relic-glow`(오컬트 글로우).
- **W**: Card → CrestCard(문장 프레임/아치 상단 + 그레인). Button은 블랙레터 라벨 + 각진 보더, 호버 시 네온 블록 인버트. Tag/Badge → SealBadge(왁스 인장형 원형 엠블럼). Heading → BlackletterDisplay(블랙레터/맥락 세리프, 본문은 산세리프 유지). Divider는 sunburst/헤어라인 룰. Icon은 fleur-de-lis·검·해골 등 오컬트 성물 글리프 슬롯.
- **PT**: 다크 Hero(블랙레터 대형 헤드 + 인장/문장 + 네온 블록 충돌), 컬렉션/룩북 그리드(아치 카드 군집), 매니페스토/about(맥락 세리프 + 그레인 본문), 이벤트/포스터 랜딩(타투·옥션 풍 전단), 멤버십/Pricing(문장 티어).
- **VM**: 중세 블랙레터·문장·왁스 인장·성물 도상이 네온 블록·디지털 그리드와 정면 충돌하는 다크 신비주의 — 성스러움과 디지털 글리치의 긴장이 곧 그래픽 문법.
- **G**: Do: 블랙레터는 헤드/엠블럼에만, 본문은 가독 산세리프 유지. 네온 충돌 블록은 페이지당 1~2점으로 절제. 인장/문장/성물은 의미 전달 보조텍스트(alt) 제공. Don't: 블랙레터로 장문 본문 조판, 오컬트 도상 남용으로 위계 붕괴. ⚠ 접근성: near-black 위 뮤트 골드/옥스블러드 액센트는 WCAG 대비 미달 위험 — 본문/액션 텍스트는 본 화이트 등 4.5:1 이상으로 별도 강제, 네온 온 다크 대비 검증, 포커스 가시성 보강. 그레인/글로우/글리치 모션은 `prefers-reduced-motion` 정적 폴백. 필수 웹폰트: 블랙레터/맥락 디스플레이(예: UnifrakturCook 또는 가변 고딕 디스플레이) + 본문 휴머니스트 산세리프(예: Inter/Söhne류), 블랙레터 미지원 시 디스플레이 세리프 폴백.

#### 33. GlitchDistortion_05 (`glitch-distortion`)  — P1, 근거 10장
- **근거 이미지**: 2021/design-trend-2021-055.jpg, 2022/design-trend-2022-016.jpg, 2022/design-trend-2022-118.jpg, 2023/design-trend-2023-080.jpg, 2024/design-trend-2024-034.jpg
- **F**: 팔레트: near-black/딥차콜 베이스 + 네온 마젠타·시안 듀오톤 액센트(+간헐 옐로), 채널 분리용 순수 R/G/B 보조. 타이포: 콘덴스트/모노 산세리프 디스플레이(글자 자체에도 시프트·복제 적용), 본문은 가독성 위해 클린 산세리프. spacing: 타이트~표준. radius: `none~sm`(픽셀 블록감 유지). shadow: 드롭섀도 대신 채널 오프셋 복제(마젠타/시안 가장자리)와 픽셀 블록 잔상으로 깊이 대체.
- **EF**: `--bbangto-ext-rgb-shift`(채널 오프셋 거리, 예 3px), `--bbangto-ext-glitch-magenta: #FF00C8`, `--bbangto-ext-glitch-cyan: #00E5FF`, `--bbangto-ext-pixel-size`(모자이크/픽셀화 블록 크기), `--bbangto-ext-slice-offset`(가로 슬라이스 변위), `--bbangto-ext-datamosh`(블록 깨짐 패턴), `--bbangto-ext-colorbar`(방송 컬러바 그라디언트), `--bbangto-ext-scanline`(주사선 노이즈).
- **W**: Card/Image: RGB 채널 분리 복제 + 가로 슬라이스 변위 + 픽셀화 마스크(hover 시 글리치 강화). Button: 텍스트 channel-shift, hover에 슬라이스 점프. Heading: 레이어 복제(마젠타/시안 오프셋) 텍스트. Tag/Badge: 컬러바 스트립 또는 코드/노이즈 라벨. Divider: 깨진 픽셀/주사선 라인.
- **PT**: Hero(왜곡된 인물/이미지 + 시프트된 대형 헤드라인), 갤러리/포트폴리오 그리드(글리치 썸네일), 404/에러·로딩 상태(데이터 손상 연출), 음악/이벤트 포스터형 랜딩, 프로덕트 리빌 섹션.
- **VM**: RGB 채널이 어긋나고 가로 슬라이스가 밀려 픽셀이 깨진, '데이터 손상' 그 자체를 미감으로 삼는 듀오톤 글리치.
- **G**: Do: 글리치는 hover/포커스/전환 등 의도된 순간에만 강하게, 정적 상태는 가독 가능한 베이스 유지. 핵심 텍스트(본문·CTA 라벨)는 채널 오프셋을 0에 가깝게 두고 별도 고대비 레이어 확보. Don't: 본문 전체에 상시 시프트/슬라이스 적용 금지, 마젠타↔시안 동시 발광 위 텍스트 배치 금지. 접근성(⚠ WCAG): 채널 오프셋·저해상 픽셀화·near-black 위 네온은 대비/가독성 저하 위험 → 텍스트 명도 대비 ≥4.5:1 별도 검증, 색만으로 의미 전달 금지. 빠른 깜빡임·슬라이스 점프는 photosensitive(발작) 위험 → `prefers-reduced-motion`에서 글리치 애니메이션 정지 및 1초 3회 미만 플래시 제한. 글리치 처리된 인물/이미지는 alt 텍스트로 원 의미 보강. 폰트: 모노/콘덴스트 디스플레이(예: Space Mono, JetBrains Mono, Archivo/Anton류) + 클린 산세리프 본문.

#### 34. OrganicFluidBlob_06 (`organic-fluid-blob`)  — P1, 근거 7장
- **근거 이미지**: 2022/design-trend-2022-037.webp, 2022/design-trend-2022-062.webp, 2022/design-trend-2022-095.jpg, 2023/design-trend-2023-101.jpg, 2023/design-trend-2023-122.webp
- **F**: 밝은/딥 단색 배경 위 비비드~파스텔 유체 색면(시안·마젠타·라임·코랄 등 다색 보간). 타이포는 둥근 지오메트릭 산세리프(필요 시 리퀴드 디스플레이는 헤드라인 한정). radius `xl`(블롭은 사실상 비정형 곡률, 100% 라운드 알약/원형 활용). spacing 넉넉, shadow는 거의 없음(평면적·매끈)이며 색면 그라디언트가 깊이를 대신.
- **EF**: `--bbangto-ext-blob-path`(SVG/clip-path 비정형 곡선), `--bbangto-ext-blob-gradient`(다색 유체 보간 그라디언트), `--bbangto-ext-ribbon-curve`(리본/스우시 베지어 경로), `--bbangto-ext-morph-duration`(블롭 모핑 트랜지션), `--bbangto-ext-squircle`(superellipse radius).
- **W**: Card/Section → BlobCard(clip-path 비정형 곡선 + 유체 그라디언트 배경). Button → 알약/스쿼클형 매끈 fill, 호버 시 블롭 모핑. Tag/Badge → 둥근 캡슐. Hero 배경에 RibbonSwoosh(SVG 흐르는 리본) 데코 슬롯, BlobBlob(부유 블롭) 장식 래퍼.
- **PT**: 랜딩 Hero(흐르는 리본/블롭 + 대형 둥근 타이포), 피처 섹션(블롭 컷아웃 카드 군집), 브랜드/About, 음악·이벤트 포스터형 레이아웃, CTA(스우시로 시선 유도).
- **VM**: 매끈하게 흐르는 바이오모픽 블롭·리본·스우시의 곡선과 다색 유체 그라디언트 색면이 화면을 가로지르는 유동적 흐름 — 질감 없이 형태의 유연함 자체가 언어.
- **G**: Do: 곡선/그라디언트는 배경·데코에, 본문은 평이한 영역에 배치. 블롭 모핑은 `prefers-reduced-motion: reduce` 시 정적 폴백(story `play`에서 검증). Don't: 비비드 그라디언트 색면 위 직접 텍스트 얹기 금지(보간 구간에서 대비 급변). ⚠ 접근성: 다색 유체 그라디언트 위 텍스트는 WCAG 4.5:1 미달 위험 — 텍스트엔 솔리드 배경/오버레이 강제, 색만으로 의미 전달 금지(색맹 보간 구분 곤란), SVG 블롭·리본 데코는 `aria-hidden`. 필수 웹폰트: 둥근 지오메트릭 산세리프(예: Poppins/Quicksand 류), 리퀴드 디스플레이는 헤드라인 한정.

#### 35. RadiantGlowDark_07 (`radiant-glow-dark`)  — P1, 근거 6장
- **근거 이미지**: 2023/design-trend-2023-056.jpg, 2023/design-trend-2023-058.jpg, 2024/design-trend-2024-073.jpg, 2025/design-trend-2025-026.jpg, 2025/design-trend-2025-068.jpg
- **F**: near-black/딥차콜·플럼 배경(#0A0A0C~#1A1320)을 베이스로, 중심에서 방사하는 강렬 발광색(핫핑크/마젠타·앰버·레드·라임 중 1~2색 라디언트). 텍스트는 화이트/발광 틴트. typography: 대형 산세리프 디스플레이(타이트 트래킹) + 본문 산세리프. spacing 넉넉(시네마틱 여백), radius `none~sm`(발광면이 주역, 모서리 절제). shadow는 드롭섀도 대신 **glow bloom**(외향 발산광)이 깊이 언어.
- **EF**: `--bbangto-ext-radial-glow`(중심 발광 radial-gradient), `--bbangto-ext-light-ray`(선형 광선/빔 conic·linear), `--bbangto-ext-glow-color`(발광 키컬러), `--bbangto-ext-bloom-blur`(발산 blur 반경), `--bbangto-ext-grain`(노이즈 텍스처 오버레이), `--bbangto-ext-silhouette-mask`(피사체 실루엣 어둠 마스크), `--bbangto-ext-glow-intensity`(발광 강도 multiplier).
- **W**: Card/Section은 다크 표면 + radial glow 배경 + grain 오버레이로 감싸고, Button은 glow fill 또는 발광 보더(box-shadow bloom)로 호버 시 강도 증가. Heading은 발광 그라디언트 텍스트(클립). Tag/Badge는 어두운 칩 + 네온 글로우 림. Hero용 GlowOrb/LightRay 장식 슬롯.
- **PT**: 랜딩 Hero(중심 발광/광선 위 대형 타이포), 이벤트/뮤직 포스터형 섹션, 피처(어두운 카드 + 코너 글로우), Pricing(강조 플랜에만 bloom), 아티스트/제품 실루엣 쇼케이스.
- **VM**: 검은 바탕을 뚫고 중심에서 발산하는 강렬한 라디언트 글로우·광선과 노이즈 그레인이 열·빛의 방사를 만드는 다크 무드가 시그니처.
- **G**: Do: 발광은 1~2색으로 집중, 텍스트는 글로우가 약한 어두운 영역 위에 배치하거나 솔리드 화이트로. Don't: 발광면 위 저명도 컬러 텍스트(가독성 붕괴), 화면 전체 균일 고휘도(초점 상실). ⚠ 접근성: 발광 그라디언트 위 텍스트는 WCAG AA(본문 4.5:1, 대형 3:1) 대비를 글로우 최저명도 지점 기준으로 검증, 발광 그라디언트 텍스트는 비텍스트 장식으로 한정(본문 금지). grain/맥동 glow 애니는 `prefers-reduced-motion` 시 정적, 고휘도 점멸·플리커 회피(발작 위험). 필수 웹폰트: 산세리프 디스플레이(Inter Tight/Space Grotesk류) + 본문 Inter류.

#### 36. HalftoneDotPrint_08 (`halftone-dot-print`)  — P2, 근거 6장
- **근거 이미지**: 2020/design-trend-2020-040.webp, 2022/design-trend-2022-031.webp, 2023/design-trend-2023-106.jpg, 2024/design-trend-2024-046.webp, 2025/design-trend-2025-048.webp
- **F**: 밝은 페이퍼/뉴트럴 배경 + CMYK 4원색(시안/마젠타/옐로 + 키블랙) 중심 팔레트, 단색 위에 도트 스크린을 얹어 톤을 만든다. 타이포는 굵은 그로테스크 산세리프(헤드라인) + 보통 산세리프 본문, 인쇄 캡션 느낌의 작은 대문자. spacing 균일·넉넉, radius `none~sm`(인쇄물 컷 느낌). shadow는 거의 없음(평면 인쇄) — 깊이는 그림자가 아니라 도트 밀도 그라데이션으로 표현.
- **EF**: `--bbangto-ext-halftone-dot-size`(망점 기본 직경 2–8px), `--bbangto-ext-halftone-cell`(스크린 격자 셀 피치), `--bbangto-ext-halftone-angle`(채널별 스크린 각: C 15°/M 75°/Y 0°/K 45°), `--bbangto-ext-halftone-cyan/magenta/yellow/key`(채널 색), `--bbangto-ext-halftone-gradient-stop`(밀도 그라데이션 강도), `--bbangto-ext-screen-tone`(베타/명암용 도트 비트맵 패턴 토큰). 구현은 `radial-gradient` 타일 + `background-size`(=cell) 반복, 또는 SVG `feImage`/blend.
- **W**: Card → HalftoneCard(표면을 도트 스크린 fill + 1px 키라인으로 마감, 이미지 슬롯에 halftone 필터 오버레이). Button → 도트 스크린 채움 + hover 시 도트 밀도/각 변화. Tag/Badge → 스크린톤 칩(단색 위 도트 명암). Image/Figure → HalftoneImage(원본을 망점 분해 처리, 색분해 그라데이션). Heading은 도트 그라데이션 텍스트 fill 옵션.
- **PT**: Hero(대형 오브젝트의 망점 색분해 시연 + 굵은 헤드라인), 갤러리/포트폴리오(halftone 처리 이미지 그리드), 에디토리얼 피처(스크린톤 톤 구획), 프로덕트 쇼케이스(밀도 그라데이션으로 입체감), 포스터형 랜딩.
- **VM**: 규칙적 CMYK 망점/스크린톤 도트 격자 자체를 표면 언어로 노출 — 색·명암을 점의 크기·밀도·스크린 각으로 표현하는 인쇄 분해 그래픽.
- **G**: Do: 망점은 큰 면/이미지/장식에 사용하고 본문 텍스트는 솔리드 색으로 분리해 가독성 확보, 도트 그라데이션으로 위계 표현. Don't: 작은 텍스트나 핵심 UI 위에 도트 스크린을 깔지 말 것, 채널 오버랩으로 인한 색 탁함 주의. ⚠ 접근성(WCAG): 도트 패턴 위 텍스트는 평균 색이 아닌 최악 대비 지점 기준으로 4.5:1 보장(밝은 옐로 채널 위 텍스트 특히 위험), 망점 fill과 텍스트 색을 분리, 포커스 링은 도트와 구분되는 솔리드 색. 미세 고빈도 도트는 모아레/플리커 유발 → 충분한 cell 피치 + (애니메이션 시)`prefers-reduced-motion` 정적 폴백. 필수 폰트: 굵은 그로테스크 산세리프(Archivo/Anton류) + 본문 산세리프. 망점 처리 이미지는 alt 텍스트 필수.

#### 37. UkiyoeWoodblock_09 (`ukiyoe-woodblock`)  — P2, 근거 4장
- **근거 이미지**: 2021/design-trend-2021-072.jpg, 2022/design-trend-2022-061.jpg, 2023/design-trend-2023-049.jpg, 2026/design-trend-2026-121.jpg
- **F**: 웜 washi(쌀종이) 오프화이트/아이보리 배경 + 절제된 흙빛 팔레트(인디고 藍, 베니 적갈 朱, 모스 그린, 머스타드 황토, 먹 sumi 차콜). 채도 낮고 면 채색 평면적. typography: 본문 휴머니스트 산세리프 + 디스플레이는 가는 고전 세리프(우키요에 제목 각字 느낌), 큰 letter-spacing은 지양하고 세로 리듬 강조. spacing: 넉넉한 여백(ma 間)으로 비대칭 침묵. radius `none~sm`(목판 인쇄 면은 각짐). shadow 거의 없음 — 입체 그림자 대신 평면 색면 분리. motion: 정적·느린 페이드(먹 번짐).
- **EF**: `--bbangto-ext-sumi-keyline`(먹빛 1.5–2px 윤곽선, 약간 불균일), `--bbangto-ext-washi-grain`(쌀종이 섬유 노이즈 텍스처), `--bbangto-ext-flat-fill-*`(인디고/적갈/모스/황토 평면 채색 팔레트), `--bbangto-ext-bokashi`(전통 그라데이션 ぼかし — 하늘/물 한 방향 농담), `--bbangto-ext-hanko-seal`(붉은 낙관 도장 사각 액센트), `--bbangto-ext-ma-gap`(여백 리듬 spacing 스케일).
- **W**: Button/Card/Tag/Heading을 sumi 윤곽선 + 평면 색면으로 래핑: Card는 washi 배경 + 먹 keyline 보더 + 상단 bokashi 색면, 모서리에 hanko 도장 액센트 옵션. Button은 평면 적갈/인디고 fill + 먹 윤곽(그림자 없음), hover 시 색면만 농도 변화. Tag/Badge는 붉은 낙관 도장형(사각 인장). Divider는 먹 붓 헤어라인.
- **PT**: Hero(후지산·분재 등 동양 풍경 일러스트 슬롯 + 여백 큰 세로형 캡션), 갤러리/룩북(목판화 패널 그리드), 어바웃/브랜드 스토리(서정 풍경 + 세로 텍스트 리듬), 메뉴·인덱스(먹선 구획). 콘텐츠는 가상 placeholder 풍경 이미지.
- **VM**: 전통 목판화 문법 — 평면 색면 채색 + 먹빛 윤곽선(keyline) + 여백(ma) + 동양 풍경 도상(후지·분재·물결), 붉은 낙관 도장이 시그니처 액센트.
- **G**: Do: 색면을 평면으로 분리하고 입체 그림자 대신 윤곽선·여백으로 위계 표현. 풍경 일러스트는 이미지 슬롯으로 두고 alt 텍스트 제공. Don't: 글로시/네온/3D 입체감 혼용 금지(평면 회화 양식 훼손), 흙빛끼리 과밀 배치 금지. ⚠ 접근성: 저채도 흙빛 본문은 WCAG 대비 위험 — 본문 텍스트는 먹 차콜(near-black)로 4.5:1 강제, washi 노이즈/bokashi 위 텍스트는 단색 패널로 대비 확보, 붉은 인장은 의미 전달용이 아닌 장식으로만(색 단독 정보 금지). 권장 웹폰트: 본문 Noto Sans(JP 폴백), 디스플레이는 가는 세리프(Noto Serif/Shippori Mincho류). 모션은 reduce 시 정적.

#### 38. PunkGrungeGraffiti_10 (`punk-grunge-graffiti`)  — P2, 근거 5장
- **근거 이미지**: 2020/design-trend-2020-011.jpg, 2024/design-trend-2024-040.webp, 2026/design-trend-2026-010.jpg, 2026/design-trend-2026-020.webp, 2026/design-trend-2026-041.jpg
- **F**: 팔레트: 더러운 콘크리트/뉴스프린트 그레이·오프블랙 베이스 + 형광 스폿컬러(하이라이터 옐로 #E8FF00, 핫 마젠타, 알람 레드) 1~2개를 거칠게 충돌. 화이트는 복사기 번짐 톤(순백 아님). 타이포: 본문 거친 그로테스크 산세리프(Helvetica류) + 핸드라이팅/스프레이 마커 + 랜섬노트(잘라붙인 글자 혼합), 대소문자·기울기·자간 의도적 불균일. spacing: 불규칙·겹침 허용(그리드 무시, 음수 마진으로 충돌). radius: none(찢긴 종이/거친 클립 윤곽). shadow: 드롭섀도 거의 없음 — 깊이 대신 하프톤/제록스 거칠기와 레이어 겹침으로 표현.
- **EF**: `--bbangto-ext-halftone`(망점/제록스 도트 텍스처 배경), `--bbangto-ext-photocopy-grain`(거친 노이즈·번짐 필터), `--bbangto-ext-torn-edge`(찢긴 종이 마스크), `--bbangto-ext-spray`(스프레이 페인트 스플래터/드립), `--bbangto-ext-scribble`(손그림 낙서 스트로크), `--bbangto-ext-tape-grunge`(찢긴 마스킹테이프), `--bbangto-ext-marker-stroke`(거친 마커 밑줄/동그라미), `--bbangto-ext-rotate-jitter`(요소별 미세 회전 ±2~6deg), `--bbangto-ext-spot-color`(형광 스폿 액센트), `--bbangto-ext-misregister`(인쇄 오프셋·색 어긋남 효과).
- **W**: Button → 찢긴 종이/스프레이 윤곽 + 마커 밑줄, 호버 시 jitter 회전·하프톤 강화. Card → 제록스 하프톤 패널 + 찢긴 가장자리 + 테이프 고정, 약간 회전해 겹침. Tag → 랜섬노트 라벨 또는 스프레이 스텐실 칩. Heading → 스프레이/핸드라이팅 디스플레이(레이어 겹침·color misregister). Divider → 거친 마커 스트로크. Badge → 잉크 스탬프/스티커.
- **PT**: Hero(겹친 찢긴 포스터 콜라주 + 대형 스프레이 헤드라인 + 형광 스폿), 진/플라이어형 갤러리(불규칙 회전 카드 클러스터), 이벤트/뮤직 랜딩, 머치 스토어 제품 그리드(제록스 제품샷), 어바웃/매니페스토(랜섬노트 타이포 블록).
- **VM**: 제록스로 복사하고 찢어 벽에 덧붙인 펑크 진(zine)·그래피티 — 하프톤 거칠기·찢긴 가장자리·스프레이/낙서 마크가 그리드를 깨고 공격적으로 겹쳐지는 반정제 카오스 콜라주.
- **G**: Do: 그리드를 의도적으로 깨되 1차 액션·핵심 카피는 한 영역에 모아 위계 확보. 형광 스폿은 강조에만 절제 사용. 거친 텍스처는 배경/장식 레이어에 두고 본문 텍스트는 텍스처 위에 올리지 않기. Don't: 모든 글자를 핸드라이팅·랜섬노트로 처리(가독성 붕괴), 본문 위 하프톤 직접 깔기. 접근성(WCAG): ⚠ 형광 옐로/마젠타 온 화이트·복사 그레이 배경은 대비 미달 위험 → 본문/인터랙티브 텍스트는 오프블랙 기반 대비 4.5:1 별도 토큰으로 강제, 텍스처 위 텍스트엔 솔리드 백킹 칩 제공. 회전·jitter 요소도 터치 타깃 44px·포커스 링 가시성 유지. 스프레이/낙서로 표현된 텍스트는 이미지화 시 대체텍스트 필수. misregister/grain 애니메이션은 `prefers-reduced-motion`에서 정적화. 필수 웹폰트: 거친 그로테스크 산세리프(Helvetica Now/Archivo류) + 마커·핸드라이팅(Permanent Marker류) + 스텐실(Stardos Stencil류) 폴백.

#### 39. AISurrealGradient3D_11 (`ai-surreal-gradient3d`)  — P2, 근거 4장
- **근거 이미지**: 2020/design-trend-2020-100.jpg, 2022/design-trend-2022-009.jpg, 2022/design-trend-2022-116.jpg, 2026/design-trend-2026-224.jpg
- **F**: 딥 다크 배경(near-black 네이비/차콜) 위에 라이팅 기반으로 렌더된 3D 오브젝트 + 무지갯빛(이리데센트) 그라데이션 표면. radius `md~lg`(렌더 카드/이미지 프레임). shadow는 오브젝트 접지용 소프트 ambient + 표면 스펙큘러 하이라이트(라이팅 음영). 타이포는 굵은 그로테스크 산세리프 디스플레이 + 메타데이터용 모노.
- **EF**: `--bbangto-ext-iridescent`(conic/holographic 무지갯빛 그라디언트), `--bbangto-ext-chroma-shift`(각도별 색 변이/시머), `--bbangto-ext-spec-highlight`(스펙큘러 글로스), `--bbangto-ext-render-shadow`(오브젝트 접지 그림자), `--bbangto-ext-render-frame`(코너 크로스마커 + 메타데이터 라벨), `--bbangto-ext-fallback-img`(정적 폴백 이미지).
- **W**: Card → RenderCard(3D 렌더 이미지 슬롯 + 코너 크로스마커 + 모노 메타데이터 캡션). Button은 이리데센트 그라디언트 fill + 글로스 하이라이트. Tag/Badge는 holographic chip(크로마 시프트). Hero/Section은 풀블리드 렌더 + 다크 오버레이 컨테이너. 모든 3D 오브젝트는 렌더 이미지 자산(또는 lazy WebGL 슬롯)으로 주입.
- **PT**: Hero(중앙 부유 3D 오브젝트 + 대형 헤드라인), 렌더 그리드 갤러리(2×2 카드 군집 — 예시 이미지 패턴), 아트/제품 쇼케이스, 컬렉션·드롭 랜딩, 무드보드. 카드마다 메타데이터 라벨(MATERIAL/ORIGIN 등) 캡션 반복.
- **VM**: 불가능한 유기적 3D 형상 위 이리데센트 표면 — AI 생성 초현실 드림 렌더가 곧 비주얼 문법. 정적 렌더 이미지 자산 중심(인터랙티브 시차가 아님).
- **G**: 핵심이 렌더 이미지 자산이므로 모든 렌더에 의미 있는 대체텍스트 필수. ⚠ 다크 위 이리데센트는 명도/채도 변동이 커 WCAG 대비 위배 위험 → 본문 텍스트를 무지갯빛 표면 위에 직접 두지 말고 솔리드/다크 오버레이로 대비 확보, 이리데센트는 장식·대형 헤딩에만. 빠른 크로마 시프트/시머 애니는 `prefers-reduced-motion` 분기 + 발작 위험 회피, story `play`에서 정적 폴백 검증. 필수 웹폰트: 굵은 그로테스크 산세리프(Space Grotesk/Archivo류) + 메타데이터용 모노(IBM Plex Mono). 생성 이미지 라이선스/콘텐츠 정책 준수, 데모는 가상 placeholder.

#### 40. ShatteredGlassCinematic_12 (`shattered-glass-cinematic`)  — P2, 근거 3장
- **근거 이미지**: 2022/design-trend-2022-059.jpg, 2023/design-trend-2023-047.jpg, 2026/design-trend-2026-120.jpg
- **F**: near-black/차콜 시네마틱 배경(딥 잉크) + 이리데센트 굴절 액센트(시안↔마젠타↔라임으로 전이하는 프리즘 스펙트럼). 표면은 반투명 결정질 + 균열선. typography: 대형 디스플레이 세리프 헤드 + 산세리프 본문(이미지의 "Fragmented Glass Effect" 톤). radius `md`(파편 셀은 의도적으로 일부 비대칭/클립). spacing 넉넉(시네마틱 여백). shadow direction: 하향 ambient + 균열 엣지의 광택 림(rim) 하이라이트.
- **EF**: `--bbangto-ext-crack-overlay`(균열/금 SVG·conic-gradient 마스크), `--bbangto-ext-shard-clip`(clip-path 파편 폴리곤), `--bbangto-ext-iridescent`(굴절 프리즘 conic/linear 그라디언트), `--bbangto-ext-refraction-blur`(굴절 산란 blur 8–14px), `--bbangto-ext-glass-edge-glow`(균열선 림 라이트), `--bbangto-ext-fluted`(리브드 유리 반복 스트라이프), `--bbangto-ext-shard-shadow`(파편 드롭).
- **W**: Card/Modal → ShardPanel(clip-path 파편 윤곽 + 균열 오버레이 + 엣지 글로우). Button → 굴절 림 보더 + 이리데센트 호버 스윕. Tag/Badge → 작은 결정 파편 칩. Hero 배경 → CrackedGlassOverlay(콘텐츠 위 균열·굴절 레이어, 콘텐츠 본문은 균열 비낀 클리어 존에 배치).
- **PT**: 시네마틱 Hero(어두운 배경 + 대형 세리프 헤드 + 굴절 파편 그리드 갤러리), 프로덕트 쇼케이스(이리데센트 결정 카드 군집), 갤러리/룩북(파편 마스크 이미지 타일), 피처 섹션(균열 디바이더).
- **VM**: 어두운 시네마틱 면을 가로지르는 깨진/금 간 유리 + 빛이 프리즘처럼 산란·이리데센트하는 거친 결정질 — fragile yet striking의 대비가 시그니처.
- **G**: Do: 균열·굴절은 장식 오버레이로만, 본문 텍스트는 균열이 비낀 평탄·고대비 클리어 존에 배치. 굴절 스윕은 호버/등장 시 1회. Don't: 텍스트 위에 직접 이리데센트/균열을 깔지 말 것(가독성 붕괴). ⚠ 접근성: 다크 배경 + 저채도/투명 굴절면 위 텍스트는 WCAG AA(본문 4.5:1, 대형 3:1) 미달 위험 큼 → 텍스트 레이어에 솔리드 backdrop/대비 토큰 강제, 포커스 링은 굴절과 구분되는 솔리드 컬러로. 이리데센트 색전이·균열 반짝임은 `prefers-reduced-motion: reduce` 시 정적화(빠른 깜빡임·고대비 플릭커 발작 위험 회피). 굴절/균열 이미지는 alt 텍스트, clip-path 미지원 폴백(직사각형) 제공. 권장 웹폰트: 디스플레이 세리프(Playfair Display/Fraunces류) + 산세리프 본문(Inter류).

#### 41. PixelArtRetro_13 (`pixel-art-retro`)  — P2, 근거 3장
- **근거 이미지**: 2021/design-trend-2021-012.webp, 2023/design-trend-2023-111.jpg, 2025/design-trend-2025-004.webp
- **F**: 팔레트: 한정된 인덱스 컬러 룩(8~16색 제한 팔레트) — CRT 블랙 베이스 또는 페이퍼 화이트 베이스 + 고채도 8비트 원색(코발트 블루/레드/그린/옐로). 타이포: 비트맵/픽셀 폰트(Press Start 2P, "Galmuri"류 한글 픽셀폰트) 디스플레이 + 가독용 산세리프 본문 혼합. spacing: 픽셀 그리드 단위(4px/8px 배수)에 스냅, 균일. radius: `none`(모든 모서리 직각, 라운드 금지 — 곡선은 계단형 픽셀로 표현). shadow: 블러 0의 하드 오프셋 도트 그림자(2~4px 정수 픽셀 단위).
- **EF**: `--bbangto-ext-pixel-size`(논리 픽셀 1셀 크기, 예 4px), `--bbangto-ext-pixel-grid`(배경 격자 repeating-linear-gradient), `--bbangto-ext-dither`(2색 디더링 패턴), `--bbangto-ext-pixel-shadow`(blur 0 정수 오프셋 그림자), `--bbangto-ext-pixel-border`(계단형/2px 솔리드 보더), `--bbangto-ext-scanline`(CRT 주사선, 선택적), `--bbangto-ext-palette-index`(제한 팔레트 토큰 세트). 전역 `image-rendering: pixelated` 강제.
- **W**: Button → 직각 + 하드 픽셀 그림자, press 시 그림자만큼 우하 이동(눌림). Card → 픽셀 보더 + 격자 배경 + blur 0 그림자. Tag/Badge → 8비트 라벨 칩(픽셀폰트). Input → 직각 콘솔 필드 + 블록 커서. Icon → 도트 매트릭스 글리프(아이콘은 픽셀아트화). Heading → PixelText(비트맵 디스플레이 타이포).
- **PT**: Hero(픽셀 그리드 배경 위 8비트 대형 타이틀 + 도트 일러스트), 게임풍 대시보드/스코어보드, 프로덕트 카드 그리드, 메뉴/네비(픽셀 탭), 로딩 화면(도트 진행바), 도트 일러스트 갤러리.
- **VM**: 의도적 저해상 8비트 — 모든 형태가 정수 픽셀 그리드에 스냅된 블록 타이포·도트 일러스트·계단형 모서리·격자 배경으로 레트로 게임 도트 미감을 만든다.
- **G**: Do: 정수 픽셀 그리드 스냅 유지, `image-rendering: pixelated`로 스케일 시 또렷한 도트, 본문은 가독 산세리프(픽셀폰트는 헤드/라벨 강조에만). Don't: 안티앨리어싱/그라디언트/라운드 곡선 남용, 픽셀폰트로 장문 본문 금지. 접근성(WCAG): ⚠ 비트맵 폰트 소형 시 가독성·대비 저하 — 본문 최소 크기/충분 대비 확보, 격자·디더 배경 위 텍스트 대비 보강(저대비 위배 위험), CRT 스캔라인/블링킹 커서는 `prefers-reduced-motion` 시 정지 및 발작 위험 빠른 점멸 회피, 픽셀 아이콘은 의미 전달 대체텍스트. 필수 웹폰트: Press Start 2P 또는 Galmuri(한글 픽셀폰트) + 가독 산세리프 폴백.

#### 42. HalftoneGlitchColorSep_14 (`halftone-glitch-colorsep`)  — P2, 근거 4장
- **근거 이미지**: 2020/design-trend-2020-154.webp, 2022/design-trend-2022-029.webp, 2023/design-trend-2023-034.webp, 2024/design-trend-2024-113.jpg
- **F**: 바탕은 뉴스프린트/크라프트 오프화이트 또는 near-black 다크 베이스 중 택1. 잉크 팔레트는 CMYK 인쇄 잉크 계열(잉크 레드 #C8102E·잉크 그린 #178A4C·시안·마젠타) 2~3색 한정 + 잉크 블랙. 타이포는 헤비 그로테스크 산세리프(헤드라인 초대형·콘덴스트) + 모노/캡션. radius `none~sm`(인쇄물·잘린 컷). spacing은 포스터형 밀집 그리드. shadow는 거의 없음(드롭섀도 대신 채널 어긋남 오프셋이 깊이 역할).
- **EF**: `--bbangto-ext-halftone-dot`(망점 SVG/radial-gradient 패턴), `--bbangto-ext-halftone-size`(망점 셀 크기 6~12px), `--bbangto-ext-halftone-angle`(스크린 각 15/45/75deg), `--bbangto-ext-colorsep-offset`(채널 어긋남 거리 2~6px), `--bbangto-ext-channel-r`/`--bbangto-ext-channel-g`(적·녹 분리 채널 색), `--bbangto-ext-glitch-slice`(픽셀 슬라이스 변위), `--bbangto-ext-misregister`(인쇄 오정합 회전·이동), `--bbangto-ext-paper-noise`(뉴스프린트 그레인).
- **W**: Card → HalftoneCard(이미지/면을 망점 처리 + 가장자리 적·녹 채널 분리). Heading/Display → ColorSepText(텍스트를 R/G 두 레이어로 겹쳐 오프셋, 호버/등장 시 어긋남 증폭). Tag/Badge → 인쇄 스티커풍(망점 채움 + 잘린 모서리). Button → 솔리드 잉크 면 + press 시 채널 분리·망점 시프트. Image 슬롯은 `background-blend`/`mix-blend-mode`로 망점 스크린 합성.
- **PT**: 포스터형 Hero(초대형 콘덴스트 헤드라인 + 망점 인물/오브젝트 + 채널 어긋남), 무드보드/콜라주 갤러리(잘린 컷 + 회전·오정합 배치), 이벤트·뮤직 랜딩, 잡지 표지/룩북, 피처 그리드(망점 썸네일 군집).
- **VM**: CMYK 망점 스크린으로 면을 분해하고, 적·녹(R/G) 채널을 의도적으로 어긋나게 겹쳐 인쇄 오정합 + 디지털 글리치가 동시에 일어난 듯한 일그러짐 — 망점 패턴 자체가 색분해로 찢기는 것이 시그니처.
- **G**: Do: 채널 분리·망점은 장식/이미지 레이어에 한정하고 본문 텍스트는 단일 솔리드 잉크로 유지. 망점은 2~3색 잉크로 제한해 인쇄 메타포 유지. Don't: 가독 텍스트에 색분해 오프셋을 직접 적용(잔상·번짐으로 판독 불가). 접근성 ⚠: 적·녹 채널 분리는 적록색맹에게 두 레이어가 동일하게 보일 수 있으니 의미 전달을 색에만 의존 금지(형태/라벨 병행), 망점 위 텍스트는 단색 솔리드 배경 칩으로 대비(WCAG AA 4.5:1) 확보, 채널 어긋남 진동·글리치 슬라이스 애니는 `prefers-reduced-motion: reduce` 시 정적 폴백(빠른 깜빡임 발작 위험 회피, story `play`에서 검증), 망점/오정합 이미지는 대체텍스트 제공. 필수 웹폰트: 헤비 그로테스크(Archivo/Anton/Druk류) + 모노(IBM Plex Mono류).

#### 43. MixedMediaCollage_15 (`mixed-media-collage`)  — P2, 근거 3장
- **근거 이미지**: 2022/design-trend-2022-085.jpg, 2022/design-trend-2022-104.jpg, 2023/design-trend-2023-088.jpg
- **F**: 뉴트럴 페이퍼/오프화이트 또는 채도 있는 단색 캔버스(코랄/세이지) 배경 + 사진의 풍부한 톤이 그대로 살아나는 다색 팔레트. 그래픽 산세리프 대형 헤드(콘덴스트 볼드) + 휴머니스트 본문 혼합. spacing 넉넉(레이어가 호흡할 여백). radius `sm~md`(컷아웃 프레임은 불규칙). shadow는 합성 깊이용 소프트 드롭 + 요소별 그라운드 섀도. motion은 레이어 시차/패럴랙스 등장.
- **EF**: `--bbangto-ext-layer-z`(합성 레이어 z-순서), `--bbangto-ext-cutout-shadow`(요소 그라운딩 드롭섀도), `--bbangto-ext-blend-mode`(multiply/screen 합성), `--bbangto-ext-grain-vintage`(빈티지 필름 그레인·하프톤), `--bbangto-ext-ink-doodle`(손그림 선·낙서 오버레이), `--bbangto-ext-duotone`(사진 듀오톤 처리), `--bbangto-ext-layer-rotate`(요소 미세 회전).
- **W**: Card → CollageScene(사진+일러스트+3D 슬롯을 z레이어로 합성, 요소별 cutout-shadow). Image → CutoutMedia(배경 제거 컷아웃 + 듀오톤/그레인 필터 + 미세 회전). Heading → 컷아웃 위에 겹쳐 앉는 그래픽 헤드(블렌드 모드). Tag/Badge → 손그림 낙서·도장형 스티커. Button은 절제된 솔리드(합성 노이즈를 방해 않게).
- **PT**: 에디토리얼 Hero(인물 사진 컷아웃 + 드로잉 선 + 3D 오브젝트 합성), 룩북/캠페인 갤러리, 무드보드형 피처 섹션, 아티클 스프레드, 브랜드 어바웃. 한 화면이 곧 하나의 합성 이미지처럼 구성.
- **VM**: 드로잉·사진·3D·빈티지 요소를 듀오톤·그레인·블렌드 모드로 매끈히 융합해 하나의 통합된 멀티미디어 합성 이미지로 만드는 레이어 콜라주 — 이음새가 보이는 오려붙임이 아니라 매체가 녹아든 단일 일러스트레이션.
- **G**: Do: 매체를 톤(듀오톤/그레인)으로 통일해 '하나의 이미지'로 보이게, 레이어 위계로 초점 형성. Don't: collage-scrapbook처럼 테이프·찢김 이음새를 노출하지 말 것(그건 별도 스타일). 접근성 ⚠ 합성/사진 위 텍스트는 대비 변동 큼 → 헤드 뒤 솔리드 플레이트나 텍스트 섀도로 WCAG AA(본문 4.5:1, 대형 3:1) 강제, 블렌드 모드가 명도를 떨어뜨리지 않게 검증. 합성 이미지·컷아웃 요소는 의미 전달 시 대체텍스트, 장식 레이어는 aria-hidden. 패럴랙스/레이어 등장은 `prefers-reduced-motion` 시 정지. 필수 폰트: 그래픽 콘덴스트 산세리프(Anton/Archivo류) + 휴머니스트 본문(Inter류), 손글씨는 낙서 오버레이 한정.

#### 44. PhotoTypeEditorial_16 (`photo-type-editorial`)  — P3, 근거 4장
- **근거 이미지**: 2020/design-trend-2020-008.webp, 2020/design-trend-2020-148.jpg, 2026/design-trend-2026-066.jpg, 2026/design-trend-2026-226.jpg
- **F**: 단색·고채도 평면 배경(예: 옐로/오렌지/차콜) + 흑백 또는 톤다운 사진을 대비 소재로. 초대형 디스플레이 산세리프(grotesque, 800~900 weight, 압축 트래킹)가 캔버스를 지배. 본문은 절제된 산세리프. spacing은 헤드라인-사진 겹침 위주로 음수 마진 허용, 외곽은 넉넉. radius `none~sm`(타입·프레임 각짐 유지). shadow는 거의 없음(평면) — 깊이는 마스킹·레이어 겹침으로만 표현.
- **EF**: `--bbangto-ext-text-image`(background-clip:text용 사진 fill), `--bbangto-ext-text-stroke`(outline/ghost 텍스트 -webkit-text-stroke), `--bbangto-ext-photo-mask`(clip-path/mask로 사진을 글자·도형 안에 가둠), `--bbangto-ext-frame-rect`(사진 위 기하 프레임 보더), `--bbangto-ext-headline-overlap`(헤드라인↔사진 음수 오프셋), `--bbangto-ext-cutout-edge`(누끼 컷아웃 경계).
- **W**: Heading → PhotoText(글자 내부를 사진으로 채우는 background-clip:text 래퍼, 폴백 단색), GhostHeading(outline-only 반복 텍스트). Card → FramedPhoto(누끼/사진 위에 기하 프레임·타이포 오버레이). Image → MaskedPhoto(글자·사각 마스크 안에 사진 클립). Button/Tag는 평면 각진 라벨로 절제, 헤드라인을 방해하지 않게.
- **PT**: 포스터형 Hero(사진을 채운 초대형 헤드라인 + 상하단 캡션 바), 제품/인물 쇼케이스(누끼 위 outline 반복 텍스트 백드롭), 매거진 표지, 캠페인 랜딩, 갤러리 인덱스(프레임 겹친 컷아웃 군집).
- **VM**: 사진과 대형 타이포가 한 평면에서 융합 — 글자를 사진으로 채우거나(클립), 사진을 글자·기하 프레임 안에 가두고, ghost/outline 텍스트와 컷아웃을 겹쳐 포토-타입 한 덩어리를 만든다.
- **G**: Do: 헤드라인은 굵고 단순한 단어(가독 위해), 사진은 글자 카운터(속공간)에서도 형태가 읽히는 고대비 이미지 선택, PhotoText에는 의미 텍스트를 실제 문자로 두고 background-clip만 적용(스크린리더·SEO 보존). Don't: 본문/긴 텍스트를 사진으로 채우지 말 것, 저대비 사진 위 텍스트 직접 올리기 금지. 접근성 ⚠: background-clip:text·text-stroke는 글자 내부 사진과 배경 간 WCAG 명도대비가 보장되지 않으므로 (a) 폴백 단색 fill을 충분 대비로 지정(`background-clip` 미지원/고대비 모드), (b) 핵심 정보는 타입 자체가 아닌 일반 텍스트 캡션으로 중복 제공, (c) prefers-contrast: more 시 사진 fill 해제. 필수 웹폰트: 압축 grotesque 디스플레이(예: Anton/Archivo Black/Druk류) + 본문 휴머니스트 산세리프(예: Inter).

#### 45. OpArtKinetic_17 (`op-art-kinetic`)  — P3, 근거 2장
- **근거 이미지**: 2020/design-trend-2020-017.webp, 2020/design-trend-2020-139.jpg
- **F**: 고대비 2색 베이스(흑/백 또는 단색 강채도 + 흑) 운영, 채도 높은 액센트 1색(레드/코발트/머스타드)으로 화면당 1쌍의 대비만 유지. typography는 압축된 그로테스크 산세리프(헤비 웨이트, 좁은 자간)로 줄무늬와 같은 리듬감. spacing은 타이트한 모듈형 그리드, radius `none~sm`(직각 기조). shadow는 거의 없음 — 깊이는 그림자가 아니라 라인 밀도/곡률 변조로 표현. motion은 미세하고 느린 위상 드리프트만.
- **EF**: `--bbangto-ext-stripe-width`(라인 두께, 기본 4px), `--bbangto-ext-stripe-gap`(간격, 기본 4px), `--bbangto-ext-stripe-angle`(0/45/90deg), `--bbangto-ext-op-pattern`(repeating-linear-gradient/radial-gradient 동심원·평행선 정의), `--bbangto-ext-moire-shift`(레이어 간 위상 오프셋), `--bbangto-ext-warp`(라인 곡률/배럴 왜곡 강도), `--bbangto-ext-op-fg`/`--bbangto-ext-op-bg`(2색 대비 쌍).
- **W**: Card는 배경을 `repeating-linear-gradient`/동심원 radial-gradient로 채운 옵아트 패널(콘텐츠는 솔리드 inset 블록 위에 올려 가독 확보). Button은 평소 솔리드, hover 시 줄무늬 fill로 전환되는 토글형. Tag/Badge는 사선 스트라이프 라벨. Divider는 단일 라인이 아니라 라인 밴드. Hero/Section은 곡률 변조(warp)된 stripe 배경 래퍼.
- **PT**: 포스터형 Hero(곡선 왜곡 줄무늬 풀블리드 + 헤비 타이포 오버레이), 갤러리/그리드(각 셀이 서로 다른 stripe-angle·동심원 변주), 섹션 구분 밴드, 로딩/프로그레스(이동하는 줄무늬), 통계 카드(라인 밀도로 값 표현).
- **VM**: 동심원·평행선·줄무늬의 반복과 위상/곡률 변조가 만드는 시각적 진동과 착시 — 정적 픽셀이 움직이는 듯한 옵티컬 운동감.
- **G**: Do: 콘텐츠(텍스트/아이콘)는 줄무늬 위에 직접 올리지 말고 반드시 솔리드 inset 패널에 분리, 옵아트는 장식 레이어로만. 화면당 옵아트 영역을 1–2곳으로 제한해 피로 방지. Don't: 본문·폼·표 같은 고밀도 정보면에 줄무늬 적용 금지, 빠른 애니메이션·고주파 깜빡임 금지. 접근성: ⚠ 고주파 평행선/모아레는 시각 피로·편두통·발작 유발 위험 → `prefers-reduced-motion`에서 위상 애니 정지 + 패턴 대비 완화, 줄무늬 위 텍스트는 WCAG 대비 미달 위험이 크므로 텍스트는 단색 면 위에만 배치하고 4.5:1 확보, 포커스 링은 패턴과 구분되는 솔리드 컬러. 폰트: 압축 그로테스크(Archivo/Anton/Druk류) 헤비 웨이트.

#### 46. WarpedCheckerboard_18 (`warped-checkerboard`)  — P3, 근거 2장
- **근거 이미지**: 2025/design-trend-2025-081.jpg, 2026/design-trend-2026-148.jpg
- **F**: 2색 고채도 체크(딥 레드 #B3122B + 베이비 핑크 #F2A6B8) 베이스, 화이트/잉크 보조. 배경 자체가 패턴(풀블리드)이므로 표면은 솔리드 카드로 대비. 타이포는 굵은 라운드 그로테스크 산세리프(Y2K/레트로 감성). spacing 넉넉, radius `lg~xl`(말랑·물결 호응). shadow는 거의 없음(평면 패턴 위 플랫 카드), 대신 패턴 자체의 왜곡이 깊이감 대체.
- **EF**: `--bbangto-ext-warp-cell`(체크 셀 기본 크기), `--bbangto-ext-warp-color-a`/`-color-b`(레드/핑크 2색), `--bbangto-ext-warp-amplitude`(파동 진폭), `--bbangto-ext-warp-frequency`(파장), `--bbangto-ext-warp-svg`(SVG `feDisplacementMap`/turbulence 또는 사전 생성 distorted PNG fallback), `--bbangto-ext-warp-speed`(선택적 흐름 모션 duration).
- **W**: 배경 레이어 WarpField(풀블리드 왜곡 체크 캔버스, SVG 필터 또는 정적 이미지 슬롯). Card → 패턴 위 솔리드/반투명 화이트 패널로 대비 확보. Button/Tag는 솔리드 fill 알약형(패턴과 충돌 방지, 패턴은 보더/액센트에만). Section은 WarpField를 배경으로 감싸는 컨테이너.
- **PT**: 랜딩 Hero(왜곡 체크 풀블리드 배경 + 중앙 솔리드 카드/대형 타이포), 이벤트/굿즈/패션 룩북, 프로필·링크인바이오, 갤러리 썸네일 보더(왜곡 체크 프레임).
- **VM**: 규칙적 체크/깅엄 격자를 파도처럼 액화·물결 왜곡시킨 단일 디스토션 — 직교 그리드가 유체로 휘어지는 변형 기법이 곧 시각 문법.
- **G**: Do: 텍스트는 항상 솔리드 패널 위에 두고 패턴은 배경/보더에 한정. 2색 대비를 충분히(레드↔핑크는 서로 대비 부족하므로 텍스트엔 잉크/화이트 사용). Don't: 왜곡 패턴 위 직접 본문 텍스트 배치 금지(고채도 적·핑크 진동 → 가독성·시각 피로). 접근성: ⚠ 레드/핑크 동시 사용은 적록색맹·저시력에 구분 어려움 → 명도 차 확보, 패턴 위 텍스트 WCAG AA 미달 위험이라 패널 분리 필수. ⚠ 흐르는 왜곡 모션은 `prefers-reduced-motion: reduce` 시 정적 패턴 폴백(발작/멀미 위험 회피). SVG 필터 미지원 시 사전 왜곡 이미지 fallback. 폰트: 라운드 그로테스크(예: Clash Display/Fredoka/General Sans류).

#### 47. IridescentChrome_19 (`iridescent-chrome`)  — P3, 근거 2장
- **근거 이미지**: 2020/design-trend-2020-072.jpg, 2021/design-trend-2021-035.jpg
- **F**: 차콜/근흑(near-black) 또는 딥 그레이 무대 배경 위에 **무지갯빛 이리데센트 표면**이 주역. palette는 단일 베이스 위로 시프트하는 홀로그래픽 스펙트럼(라일락→민트→피치→시안). 타이포는 둥근 산세리프 디스플레이(액체 메탈 헤드라인) + 중립 산세리프 본문. radius `lg~xl`(액체 메탈 블롭의 둥근 융기) — 다만 포일 패널은 `md`. spacing 넉넉, shadow는 표면 광택을 살리는 부드러운 ambient + 메탈 specular 하이라이트(방향성: 상단 광원).
- **EF**: `--bbangto-ext-iridescent`(각도 시프트 conic/linear 무지개 그라디언트), `--bbangto-ext-holo-noise`(포일 입자 노이즈 텍스처), `--bbangto-ext-chrome-specular`(메탈 specular 하이라이트 스트립), `--bbangto-ext-liquid-blob`(녹은 메탈 둥근 윤곽/드립), `--bbangto-ext-foil-shift`(hover/scroll 시 색상 시프트 트랜지션), `--bbangto-ext-sheen-angle`(광택 각도 변수).
- **W**: Card → FoilCard(불투명 홀로그래픽 포일 패널 + 노이즈 텍스처, hover 시 색 시프트). Button → ChromeButton(액체 크롬 fill + specular 하이라이트, press 시 sheen 이동). Heading → LiquidMetalText(녹은 크롬 글자, 이리데센트 그라디언트 + 드립). Tag/Badge → HoloChip(포일 스티커). Avatar/Icon은 크롬 베젤. 투명 글래스가 아닌 **불투명 메탈/포일 fill**이 핵심 차이.
- **PT**: Hero(딥 배경 위 액체 메탈 타이포 + 포일 카드 군집), 제품/굿즈 쇼케이스, 음악/이벤트 랜딩, 무드보드 갤러리(포일 텍스처 타일), 피처 그리드(홀로 도형 — 원/삼각/사각 포일 블록).
- **VM**: 불투명한 무지갯빛 홀로그래픽 포일과 녹은 크롬 메탈의 반짝이는 표면 — 보는 각도/인터랙션에 따라 스펙트럼이 시프트하는 이리데센트 광택이 시그니처(투명 글래스가 아닌 금속 질감).
- **G**: Do: 이리데센트는 표면/장식에만, 텍스트는 불투명 단색 레이어 위에 올려 가독 확보. Don't: 무지개 그라디언트 위에 본문 직접 올리지 않기. ⚠ **WCAG 대비 위험** — 홀로 그라디언트/specular 하이라이트는 위치마다 명도가 요동쳐 텍스트 4.5:1 보장 불가 → 텍스트용 솔리드 backplate/오버레이 토큰 강제, story `play`에서 최저 대비 지점 검증. ⚠ 색 시프트·sheen 애니메이션은 `prefers-reduced-motion: reduce` 시 정적 포일로 폴백, 빠른 깜빡임 회피. 포일 노이즈가 이미지화될 경우 대체텍스트. 필수 웹폰트: 둥근 산세리프 디스플레이(예: Clash Display/Sora류) + 중립 산세리프 본문(Inter류).

#### 48. RomanticBotanical_20 (`romantic-botanical`)  — P3, 근거 2장
- **근거 이미지**: 2020/design-trend-2020-150.jpg, 2022/design-trend-2022-023.jpg
- **F**: 파스텔 가든 팔레트(블러시 핑크/라일락/세이지/스카이블루 + 크림 페이퍼 배경) + 화이트 라인아트 잉크. 본문 휴머니스트 산세리프, 디스플레이는 우아한 세리프(꽃·봄 무드). spacing 넉넉, radius `lg~xl`(꽃잎처럼 부드럽게, 일부 아치/타원 컷). shadow는 매우 낮은 soft ambient(파스텔 위 가벼운 부유). 저채도·하이키 톤 방향.
- **EF**: `--bbangto-ext-botanical-line`(화이트/잉크 핸드드로잉 라인아트 stroke), `--bbangto-ext-leaf-outline`(잎맥/덩굴 SVG 외곽선), `--bbangto-ext-butterfly`(나비 도상 accent), `--bbangto-ext-petal-radius`(꽃잎형 비대칭 라운드), `--bbangto-ext-garden-gradient`(하늘→풀 파스텔 그라디언트 배경), `--bbangto-ext-bloom-glow`(꽃 주변 부드러운 하이라이트).
- **W**: Card → BotanicalCard(꽃·잎 라인아트가 모서리/배경을 감싸는 프레임, 아치 상단 옵션). Button/Tag → 꽃잎형 부드러운 알약, 호버 시 잎·나비 라인 accent 등장. Divider → 덩굴/잎맥 라인 구분선. Avatar/Figure는 라인아트 화관(wreath) 프레임. Heading은 세리프 + 손그림 꽃 언더라인.
- **PT**: 브랜드/봄 캠페인 Hero(가든 그라디언트 배경 + 나비·꽃 라인아트 + 세리프 헤드라인), 굿즈/뷰티·코스메틱 커머스, 무드보드/포트폴리오, 뉴스레터·초대장, 갤러리(꽃 화관 카드 그리드).
- **VM**: 파스텔 정원 위에 떠 있는 화이트 핸드드로잉 꽃·잎·나비 라인아트 — 자연 도상이 프레임·구분선·accent를 이루는 로맨틱 보태니컬 문법.
- **G**: Do: 라인아트는 강조·장식으로, 본문은 가독 산세리프 유지. 나비/꽃 도상은 의미 있을 때만 절제 사용. Don't: 파스텔+화이트 라인 남발로 정보 화면 시각 소음 유발. ⚠ 접근성: 파스텔 하이키 본질상 저대비 → 본문 텍스트는 어두운 잉크 톤으로 WCAG AA(4.5:1) 별도 확보, 파스텔 배경 위 흰 텍스트 금지, 포커스 링 가시성 보강. 라인아트·꽃 이미지화 시 대체텍스트. 떠다니는 꽃/나비 모션은 `prefers-reduced-motion` 분기. 필수 웹폰트: 세리프 디스플레이(예: Cormorant/Playfair류) + 휴머니스트 산세리프 본문(예: Nunito Sans/Inter류).

#### 49. HeritageFolkOrnament_21 (`heritage-folk-ornament`)  — P3, 근거 1장
- **근거 이미지**: 2026/design-trend-2026-016.jpg
- **F**: palette: 따뜻한 흙빛 비비드 — 테라코타/코랄 레드 베이스에 인디고·틸·세이지·머스타드·크림·잉크블랙 다색 액센트(고채도, 보색 충돌). typography: 휴머니스트/약간 클래식한 세리프 디스플레이(헤드라인) + 둥근 휴머니스트 산세리프 본문. spacing: 보더·여백을 장식이 채우므로 콘텐츠 영역엔 넉넉한 패딩으로 숨통 확보. radius: md~lg(8–16px, 부드러운 공예감). shadow: 거의 평면 — 그림자 대신 다색 면·장식 보더로 위계.
- **EF**: --bbangto-ext-folk-border(스캘럽/꽃 반복 보더 패턴, border-image/SVG), --bbangto-ext-floral-motif(꽃·잎·새 모티프 SVG 토큰), --bbangto-ext-folk-fill(코랄 그라운드 채움색), --bbangto-ext-motif-accent-1..4(인디고/틸/머스타드/크림 팔레트 슬롯), --bbangto-ext-symmetry-mirror(좌우 대칭 미러 헬퍼), --bbangto-ext-corner-ornament(모서리 코너 장식).
- **W**: Card → FolkPanel(코랄 그라운드 + 스캘럽 꽃 보더 프레임, 모서리 코너 오너먼트). Button → 알약/라운드형 + 미니 플로럴 인레이 또는 장식 보더. Tag/Badge → 꽃·잎 아이콘 칩. Divider → 반복 플로럴 보더 띠. Heading → 세리프 + 좌우 대칭 장식 플랭킹.
- **PT**: Hero(코랄 그라운드 위 대칭 플로럴 일러스트 + 세리프 헤드라인), 제품/굿즈 카드 그리드(각 카드가 장식 패널), 메뉴/어바웃(보더 띠로 섹션 구획), 초대장/축제 랜딩, 패키징형 카탈로그.
- **VM**: 따뜻한 흙빛 비비드 그라운드를 좌우 대칭의 민속 꽃·새 모티프와 스캘럽 장식 보더가 가득 감싸는 공예 오너먼트 — 보더와 채움 패턴 자체가 디자인 언어.
- **G**: Do: 장식은 보더·배경·구획에 집중하고 본문 텍스트 영역은 단색 면으로 비워 가독성 확보. 대칭·반복으로 질서감 유지. 모티프 SVG는 토큰화해 재사용. Don't: 텍스트 위에 직접 패턴 깔기 금지, 다색 충돌을 본문 색에까지 끌어들이지 말 것. 접근성(WCAG): ⚠ 고채도 다색 그라운드(코랄/머스타드) 위 텍스트 대비 위험 — 본문은 잉크블랙/크림 등 4.5:1 이상 보장하는 색쌍으로 고정하고 패턴 영역과 분리, 포커스 링은 패턴에 묻히지 않게 단색 고대비로. 장식 모티프는 의미 없는 decorative로 처리(aria-hidden), 의미 전달 이미지엔 대체텍스트. 필수 웹폰트: 세리프 디스플레이(예: Playfair Display/Fraunces류) + 휴머니스트 산세리프 본문(예: Mulish/Nunito류), 폴백 시스템 폰트 지정.

#### 50. NaiveDoodle_22 (`naive-doodle`)  — P3, 근거 1장
- **근거 이미지**: 2020/design-trend-2020-086.jpg
- **F**: 밝은 화이트/오프화이트(노트·스케치북) 배경 + 크레용·마커 같은 원색 다색(빨강/파랑/노랑/핑크/초록)을 천진하게 충돌. 타이포는 어린아이 손글씨/크레용 디스플레이 폰트 + 가독용 둥근 산세리프 본문 혼합. radius 불규칙(손으로 그린 듯 들쭉날쭉), spacing 자유분방·비정렬. shadow는 거의 없거나 손그림 더블-라인(이중 윤곽) 흉내.
- **EF**: `--bbangto-ext-scribble-stroke`(삐뚤빼뚤 크레용 보더), `--bbangto-ext-scribble-fill`(영역 밖으로 삐져나간 채색 텍스처), `--bbangto-ext-doodle-arrow`(손그림 화살표/동그라미 강조), `--bbangto-ext-wobble-path`(불규칙 SVG path), `--bbangto-ext-crayon-texture`(크레용/마커 거친 질감), `--bbangto-ext-marker-palette`(원색 마커 셋).
- **W**: Button/Card/Tag/Input에 삐뚤한 손그림 보더 + 영역을 벗어난 크레용 채색. Heading은 낙서 화살표·동그라미·별표로 강조(doodle annotation). Tag=스티커형 낙서 라벨, Checkbox/Icon=어린아이 손그림 픽토그램. 의도적으로 약간 회전·정렬 어긋남.
- **PT**: 스케치북 Hero(낙서로 둘러싼 헤드라인), 무드보드/포스터, 이벤트·키즈·커뮤니티 랜딩, 낙서 주석이 달린 어바웃/FAQ, 손그림 다이어그램.
- **VM**: 비숙련 어린아이의 크레용 낙서·스크리블 — 영역을 삐져나간 채색, 삐뚤한 윤곽선, 화살표·동그라미·별표 주석이 천진한 카오스로 화면을 채운다.
- **G**: Do: 본문은 가독성 높은 둥근 산세리프 유지(낙서 폰트는 헤드/강조에만), 낙서는 장식 레이어로 분리해 콘텐츠와 구분. Don't: 본문 전체를 손글씨로, 원색 위 원색 텍스트로 가독성 희생 금지. 접근성: ⚠ 원색 채도 충돌·삐뚤 보더로 WCAG 대비/포커스 가시성 취약 → 텍스트는 충분 대비(AA) 별도 토큰으로 강제하고 낙서 채색은 텍스트 뒤에 깔지 않기, 손그림 요소 이미지화 시 대체텍스트, 정렬 어긋남이 터치 타깃 44px 침범하지 않도록 한계 명시. 필수 웹폰트: 크레용/키즈 핸드라이팅 디스플레이(예: Schoolbell, Gloria Hallelujah류) + 가독용 둥근 산세리프(예: Quicksand/Nunito류) 폴백 스택.
