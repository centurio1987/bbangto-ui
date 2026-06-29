# Style Guide Catalog — 후보 디자인 스타일/트렌드 목록

> 목적: Style Guide Catalog를 **일괄 생성**하기 위한 후보 디자인 트렌드 수집·목록.
> 각 항목은 bbangto-ui의 `StyleGuide` 6요소(아래)로 곧장 인스턴스화할 수 있도록 명세화한다.
> 현재 구현된 preset은 `Neobrutalism_Editorial_01`(= `neobrutalism-editorial-01`) **하나**다.

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
