# KANBAN — bbangto-ui

> hyper plan 보드. 앱 기능 백로그가 아니라 프로젝트 차원의 계획을 유저·AI가 공동 관리한다.
> 카드 메타(생성/최종/갱신)는 manage-kanban 스킬이 관리한다. 규칙은 스킬 SKILL.md를 따른다.

## 백로그
<!-- 아직 착수 결정 전. 우선순위 미정 후보 풀. 백로그→할 일 이동이 "할지 고민" → "하기로 확정" 전환점. -->
- `KAN-020` bbangto-ui에서 visualization 라이브러리를 가져다 쓸 때, 사용 주체가 ai라면, 어떤 경우에 어떤 시각화 패턴을 사용할지 파악하기 위해 라이브러리 코드를 검사해야 할 수도 있다. 하지만, 그러면 패턴이 방대해 졌을 때 효과적으로 탐색하기 어렵다. 따라서, 각 패턴이 어떤 상황에서 유효한지 알려주는 메타 데이터를 라이브러리 레벨에서 제공할 수 있다면 좋을 것이다. 그렇게 하기 위한 전략을 구상해라. — 생성:유저 · 최종:ai · 갱신:2026-07-23
  - 메모: 검증(2026-07-23): 전제 부분 무효 — '메타데이터 전무'는 부정확. 이미 존재: (a) visualization/visualization-type-inventory.md가 유형별 '대표 용도(when to use)'+데이터형태(FT Visual Vocabulary)+프리미티브 분류 SSOT 제공, (b) style-guide-catalog/METADATA_STRATEGY.md + selectStyleGuides가 그대로 미러링 가능한 작동 선례. 잔여 과제로 재스코핑 필요: 패턴/템플릿 코드 객체에 기계가독 메타(useWhen 등)+매니페스트/헬퍼가 아직 부재(src/patterns·templates grep 0건). → 카드를 '패턴 축 매니페스트/셀렉터 구현'으로 좁힐 것.
- `KAN-028` viz geometry 트랙 — 진짜 isometric 투영(projection·depth-sort·iso 커넥터) 프리미티브 구현 — 생성:ai · 최종:ai · 갱신:2026-07-23
  - 메모: KAN-013에서 분리. Iso_ColorBlock은 paint 패밀리(cube 3단 면 재사용)로 구현 완료했고, style-classification.md line 167/246-247 원칙(스타일 가이드는 paint만, iso는 별도 geometry 트랙)에 따라 진짜 iso는 이 카드로 분리. 필요: geometry/isometric.ts(투영 행렬 30°·depth-sort·iso 커넥터 라우팅·floor cast shadow), 텍스트는 skew 금지(평면 오버레이 레이어 — 접근성 필수). 착수 시 Iso_ColorBlock paint 가이드를 iso geometry 위에 합성 가능한지 검토.
- `KAN-035` 최초 ai를 위한 메타데이터를 도입한 작업 이후로, 태스크를 진행할 때마다, 메타데이터 생성도 같이 진행이 됐는지 확인 필요. 같이 생성이 안됐다면, 없는 인터페이스들에 대해서 적용하기 위한 계획 및 수행 필요 — 생성:유저 · 최종:유저 · 갱신:2026-07-24
- `KAN-036` 지금까지의 작업 내역을 npm package에 새로 반영해라. 새로 생기거나 없어져야 하는 패키지가 있는지, 이름이 바뀌어야 하는 패키지가 있는지도 확인하고, 버전도 확인해서 배포 계획을 세워라. — 생성:유저 · 최종:유저 · 갱신:2026-07-24
- `KAN-039` P2 viz 1:1 단일 스타일 12종 순차 구현 (KAN-034 P2) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: KAN-034 결정: 아래 12종은 각자 고유 family(1:1). 착수 시 개별 카드로 분해(KAN-019→029~033 선례). 순서·slug·tier: viz-style-expansion.md §7-3 배치표. 목록: Neobrutalist#0 · Editorial_Data#8 · Synthwave#11 · Memphis_Pattern#12 · Retro70s_Warm#14 · Dopamine_Max#15 · ArtDeco_Luxe#21 · DarkLuxe#23 · Bento_Stat#24 · Organic_Blob#34(Tier B 신규 blob shape) · Pixel_Retro#41 · Ukiyoe_Flat#37(저대비 유의). Organic_Blob 외 전부 Tier A.

## 할 일

## 진행 중

## 검토

## 완료
- `KAN-025` catalog.manifest.json → style-guide-catalog.md 트렌드 표 자동생성(문서 drift 제거) — 생성:ai · 최종:유저 · 갱신:2026-07-24
  - 메모: 기계 SSOT(매니페스트)에서 사람용 트렌드 표 파생. tokens STYLE_FAMILY_LABELS(주석 라벨→Record&lt;StyleFamily,string&gt; 승격) + style-guide-catalog/trendTable.ts(buildTrendTable 순수: meta결측 throw·안정정렬=trendIndex→카탈로그 소스 순서·pipe/개행 이스케이프 + replaceBetweenMarkers 실패조건 throw) + genTrendTable.ts/gen:trend-table(prebuild 미배선 → 빌드가 소스 md mutate 안 함). core md 1회 구조조정: 수기 표 2개 제거, gen 마커+통합 표(#0-50), P범례·도출통계·⚠경고·명세 산문 보존, 서두 stale 수정. trendTable.test.ts(형식·데이터정합·라벨완전성·마커·md sync 바이트)=drift 게이트(test:unit). 부수: pixel-art-retro-01 trendIndex 3→41 버그 선반영(별도 커밋), displayName 16건 정규화는 KAN-027. 4 게이트 green(storybook vite 캐시 삭제 필요).
- `KAN-024` 팔레트 토큰 실측 WCAG 대비 계산 → meta.accessibility 선언 CI 대조 — 생성:ai · 최종:유저 · 갱신:2026-07-23
  - 메모: contrastIntent over-claim(선언이 실측보다 높음)을 CI hard-fail로 방지(accessibility가 advisory 과대주장으로 흐르는 것 차단). tokens/contrast.ts(parseColor hex/rgb/rgba·extractColors 그라디언트·relativeLuminance·compositeOver·contrastRatio, 범용) + style-guide-catalog/accessibilityAudit.ts(auditContrast: foreground.base vs background.base 전 preset, aa≥4.5/aaa≥7/low 무제약, 그라디언트는 실효색 worst-case, fg 파싱불가·bg 색추출불가=violation). accessibility.test.ts 17종(유틸+임계+엣지+실카탈로그 over-claim 0+파싱 sanity). storybook 로컬 대비 함수 dedup(tokens import). **실측 결과 UI 51종 전량 선언 정직(over-claim 0, 정정 불필요).** 4 게이트 green(storybook vite 캐시 삭제 필요=tokens 신규 export). viz는 스키마 상이로 KAN-026 분리.
- `KAN-023` Storybook 'Catalog Decision Table' 스토리 (매니페스트 비교표 렌더) — 생성:ai · 최종:유저 · 갱신:2026-07-23
  - 메모: 매니페스트 채택 메타를 사람이 비교·선택하는 인터랙티브 결정 테이블(METADATA_STRATEGY §6 소비 흐름의 사람용 실현). `CatalogDecisionTable` 공통 컴포넌트 — 필터(domain/family/colorScheme/min-energy)→`criteriaFromFilters`(순수·export)→`selectStyleGuides` 재랭크(score 내림차순)→core `Table` 렌더, Rank·selected=Rank1, null-safe·kind별 컬럼. UI(51)·viz(6) 스토리 2개(`apps/storybook/src/stories/CatalogDecisionTable.stories.tsx` + `visualization/VizCatalogDecisionTable.stories.tsx` + `_decisionTable.tsx`). play(실 chromium): 데이터파생 행수·구체 토큰·관계적 필터 재랭크(매핑 검증)·soft-weighted 비붕괴·broad 개인정보 가드. 4 게이트 green, storySort/매니페스트 무변경.
- `KAN-022` selectStyleGuides(criteria) 스코어링 helper API (catalog 패키지) — 생성:ai · 최종:유저 · 갱신:2026-07-23
  - 메모: `selectStyleGuides(catalog, criteria)` 순수 함수(METADATA_STRATEGY §6 2단계 구현). soft-weighted 스코어링(하드 필터 아님 → shortlist 붕괴 방지), family/priority(집합)·domains/tags(recall)·characteristics(등가, dark↔both)·mood(근접/band graded), 입력 sanitize·결정적 tie-break(score→priority→trendIndex→name)·pending 처리. generic `{name,meta?}`로 UI/viz/ManifestEntry 공용, 양쪽 배럴 export. viz는 select.ts 국소 복제(manifest.ts 선례)+parity 테스트(UI helper를 test 전용 devDep로 import해 deep-equal, drift 가드). UI 28+viz 10 vitest green, 4 게이트 green. `meta?` optional 제거는 이연(별도 카드).
- `KAN-021` 잔여 48 UI + 6 viz style guide meta 전량 backfill (완료 시 gate 'meta 필수' 승격) — 생성:ai · 최종:유저 · 갱신:2026-07-23
  - 메모: Workflow 5배치(A~D UI 48 + E viz 6)로 StyleGuideMeta 일괄 저작. UI 51/51·viz 6/6 authored, 두 매니페스트 pending 0. viz 매니페스트 인프라(생성기 국소 복제·prebuild·동기 테스트) 신설. 매니페스트 동기/DoD 테스트로 gate "meta 필수" 승격 근거 확보(타입상 optional 제거는 KAN-022 helper 도입 시 병행). 품질 게이트 4종 green + git clean. KAN-018 커밋 누락 genManifest.ts 편입.
- `KAN-001` ORD-001 — StyleGuide 아키텍처 도입 (theme → style-guide 추상화 격상) — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: StyleGuideTokens/StyleGuide/StyleGuideProvider 구현 및 export. typecheck+build 통과.
  - 원문:
    ```text
    ## 배경
    어떤 디자인 컨셉을 잡느냐에 따라, 컴포넌트의 appearance는 달라진다.
    단순히 border-radius나 color, border-width가 아니라, decoration 자체가
    달라질 수 있다. 예를 들면, 마치 도형이 2개 겹쳐 있는 듯한 모습을 하고
    있는 버튼을 생각해 보자. bbangto-ui는 variant라는 속성으로 이것을
    표현할 수는 있겠지만, 하나의 통일성 있는 디자인으로 그룹화 할 수단이나 개념이 없다.
    또한, 그룹화 한다고 해도, 현재 컴포넌트 각각의 variant를 디자인과 별개로, 독립적인 variant를 가지고 있다.
    
    
    ## 목적
    위 배경을 고려 하면, 지금 **theme** 만을 분리하여 provide 하는 구조로는 capability 한계가 있다. 따라서 provide의 대상이 **theme**이 아니라 **style-guide**여야 한다.
    
    ### bbangto-ui의 정체성 강화
    - bbangto-ui에서 제공하는 design-system은 원형(architype)만을 제공한다.
    - 사용자가 구체적인 style-guide를 제공하거나 미리 준비된 preset catalog를 이용한다.
    - bbangto-ui가 style guide 양식에 맞는 구성을 위한 인터페이스를 제공해야 한다.
    
    ### Style Guide
    다음의 구성요소로 이루어진다.
    
    | 항목                   | 내용                                                                        | 실제 양식                            | 필수  |
    | -------------------- | ------------------------------------------------------------------------- | -------------------------------- | --- |
    | foundations          | design token을 정의한다.                                                       | css variable                     | O   |
    | extended foundations | 구체적 디자인 스타일을 실현하기 위한 요소인 visual motif를 반영하기 위해 확장 design token을 정의한다.     | css variable                     | X   |
    | wrapper component    | visual motif를 반영하기 위해, 원형 component를 wrapping 하는 wrapper component를 구현한다. | react component                  | X   |
    | pattern              | 폼 입력, 데이터 테이블 등 반복적으로 사용되는 UI 조합                                          | 여러 react component가 조립된 템플릿 레이아웃 | X   |
    | guideline            | 각 요소를 사용할 때의 Do's & Don'ts, 접근성 규칙                                        | 마크다운 문서                          | X   |
    
    ### Style Guide Catalog
    대표적인 디자인 스타일에 대한 preset 집합을 미리 구현하여 bbangto-ui에서 제공한다.
    ```
- `KAN-002` ORD-002 — 카탈로그 preset 일반화(개인정보 제거·트렌드 인덱스 명명) + Visual Motif 6요소화 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: 개인정보 전면 제거 + Neobrutalism_Editorial_01 명명 확정 + Visual Motif 6요소 완성.
  - 원문:
    ```text
    # ORDER 1
    
    - 스타일 가이드에 내 개인적인 내용(이름, 이메일, 내 포트폴리오, 회사 등등)을 포함하면 안된다.
    - 명칭은 빵토 Bakery가 아니라 디자인 트렌드와 중복 방지를 위한 각 디자인 트렌드 별 인덱스(brutalism + xxxism + 01) 명으로 해야 한다.
    - 각 카탈로그는 참조한 foundations, extended foundations, wrapper component, pattern, visual motif, guideline으로 구성한다.
    - visual motif는 현재 빵토 Bakery의 Default 같은 구현 예시와 더불어, 대표 컴포넌트들을 대상으로 visual motif 스펙에 대한 설명을 포함한다.
    - 구현 예시는 빵토 Bakery Default를 작성할 때 참고한 template을 토대로 만든다.
    ```
- `KAN-003` ORD-003 — 스토리북 구조 개편 (ARCHETYPE / DIAGRAM / STYLE GUIDE CATALOG) — 생성:ai · 최종:유저 · 갱신:2026-07-24
  - 메모: 사이드바 3대 최상위 재편(ARCHETYPE/DIAGRAM/STYLE GUIDE CATALOG), 85개 스토리 meta title 재매핑.
  - 원문:
    ```text
    # ORDER 2
    스토리북 구조를 개편한다. 명칭은 더 적절한 것이 있으면 계획 중 제안하고 컨펌 받아라
    ARCHETYPE
     |-- Foundations
     |-- Components
         |-- Atoms
         |-- Molecules
         |-- Organisms
     |-- Blocks
     |-- Patterns
    
    DIAGRAM
    |-- ...
    
    STYLE GUIDE CATALOG
    |-- Brutalism_Minimalism_01
        |-- Referenced Foundations
        |-- Extended Foundations
        |-- Wrapper Components
        |-- Patterns
        |-- Guideline
        |-- Visual Motif
    ```
- `KAN-004` ORD-004 — 스토리북 구조 컨셉에 따른 디렉토리 구조 검토 (결론: 현행 유지) — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: 검토 후 현행 유지(보류) 결론 — churn 실익 낮음. styleGuides→styleGuideCatalog 명명은 저위험 옵션으로 보류.
  - 원문:
    ```text
    # ORDER 3
    order2에서 반영한 스토리북 구조의 컨셉에 따라, 디렉토리 구조도 변경 가능한 포인트가 있는지 살펴본다.
    ```
- `KAN-005` ORD-005 — Style Guide Catalog 후보 디자인 스타일/트렌드 조사·목록화 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: style-guide-catalog.md 신규 생성 — 2025-2026 트렌드 23개 후보 목록화(P1~P3 우선순위).
  - 원문:
    ```text
    # ORDER
    style guide catalog에 포함할 만한 디자인 스타일과 디자인트렌드를 조사해서 수집하고 목록화 해줘. 해당 목록은 style guide catalog를 일괄 생성하는데 사용할거다.
    ```
- `KAN-006` ORD-006 — theme→foundation 재편·카탈로그(foundation/style-guide) 분리·pattern/block wrapping 인터페이스 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: 4 Phase 구현: wrapperBlocks/Patterns 인터페이스, theme→foundation 전면 rename, foundations/style-guide-catalog 별도 패키지 분리 배포.
  - 원문:
    ```text
    # ORDER
    - archetype의 컴포넌트와 theme은 style guide에서 확장 가능하지만,
      pattern, block은 그렇지 않다. 이 또한 wrapping을 위한 interface를
      제공하는 것이 좋아 보인다.
      - foundation의 theme은 확장 가능한 형태다. 따라서 기본
      foundation(dark, light, high-contrast)를 제외하고는 storybook에서
      FOUNDATION CATALOG로 빼는게 맞다. 또한 theme이란 명칭 대신
      foundation으로 치환해라. 이건 코드 레벨에서도 마찬가지다.
      - 코드 레벨에서도 foundation catalog에 해당하는 내용은 core와 다른
      코드 영역으로 분리하고 npm package도 theme 대신 foundations로
      배포해야 한다.
      - style guide catalog에 정의된 각 style guide는 말
        그대로 사전에 정의한 style guide preset에 대한 카탈로그 이므로,
        core와는 분리 되어야 하고, npm package도 style-guide-catalog로
      별도 배포 되어야 한다.
    ```
- `KAN-007` ORD-007 — 2026 디자인 트렌드(제공 링크) + 2020-2025 연도별 디자인 트렌드 리서치·목록화 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: design-trends-2020-2026.md 신규 — 2026 트렌드 22개 + 2020~2025 연도별 트렌드 + 신규 후보 5종(§C).
  - 원문:
    ```text
    # ORDER
    
    https://www.figma.com/ko-kr/resource-library/web-design-trends/
    https://www.behance.net/gallery/239027109/Design-Trends-2026?locale=ko_KR
    https://www.adobe.com/express/learn/blog/design-trends-2026
    
    위 링크는 2026년 디자인 트렌드 링크다. 참조하여 새로운 디자인 트렌드를 목록화 해라. 또한, 같은 방식으로 2020년부터 2025년 까지의 디자인 트렌드도 리서치하여 목록화 하라
    ```
- `KAN-008` ORD-008 — DIAGRAM → VISUALIZATION 개편 (headless 아토믹 + 스타일 가이드 주입) — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: visualization 패키지 신설, headless 아토믹 전환, 스타일 가이드 3종(Blueprint_Technical/Minimal_Line/Colorful_Flat) + 패턴 6종 구현.
  - 원문:
    ```text
    # ORDER
    현재 diagram으로 단독 디자인 시스템으로 존재하는 영역을 visualization으로 명명하고 구조를 개편하려고 한다.
    
    ## 구조
    - 구조는 archetype처럼 **아토믹 디자인 시스템**을 사용한다. **diagram**이나 **infographic** 유형을 **아토믹 디자인 시스템**의 **템플릿**으로 구조화 한다.
    - **diagram-references**를 참고하여 **pattern**도 파악한 후, 구현한다.
    - **아토믹 디자인 시스템**과 **pattern**에 포함되는 구현물은 **headless component**로 구현한다.
    - 구상 디자인 시스템은 **archetype design system**에 **스타일 가이드**를 주입하여 구현한다.
    - **스타일 가이드**는 기존에 존재하는 **스타일 가이드**처럼, **foundations**, **guideline**, **wrapper components**를 구현해야 한다.
    - **스타일 가이드 카탈로그**는 스토리 북에, 기존의 **스타일 가이드 카탈로그**처럼 **foundations**, **guideline**, **wrapper components**, **visual motif**, **foundation preset**을 구현해야 한다.
    
    ## 아토믹 디자인 시스템을 구성할 컴포넌트를 정의, 설계 구현하고, 스타일 가이드 카탈로그 정의, 설계 구현하기 위한 방법
    - **diagram-references**를 참고하여, 계획을 세운다. 하나의 diagram과 infographic을 하나의 템플릿이나 pattern 단위로 삼고, 그를 구성하는 컴포넌트를 원자, 분자 단위로 구성한다.
    - 디자인 스타일 단위로 스타일 가이드를 정의, 설계, 구현한다.
    ```
- `KAN-009` ORD-009 — 신규 파악 preset들 visualization style guide catalog 추가 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: 신규 스타일 가이드 3종(Corporate_Schematic_01/Ink_Line_Duotone_01/Neon_Gradient_Dark_01) + 기존 2종 preset 보강.
  - 원문:
    ```text
    # ORDER
    
    새로 파악한 preset들 visualization의 style guide catalog에 추가해
    ```
- `KAN-010` ORD-010 — visualization 유형 인벤토리 P1 26건 구현 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: P1 26건 전량 구현 — 구현률 데이터차트5%→45%·인포그래픽18%→55%·개념프레임워크10%→40%. P1 잔여 0.
  - 원문:
    ```text
    # ORDER
    P1 구현을 위한 계획을 세우고 실행해
    ```
- `KAN-011` ORD-011 — visualization 유형 인벤토리 P2 22건 구현 — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: P2 22건 전량 구현 — 전체 구현률 60%→84%(76/90). P1·P2 잔여 0, P3 백로그(📋9·🔶2)만 잔존.
  - 원문:
    ```text
    p2 수행
    ```
- `KAN-012` visualization P3 백로그 11건 구현 (VT-102/121/123/124/307/510/516/604/704/707/709) — 생성:ai · 최종:ai · 갱신:2026-07-14
  - 메모: 완료(ORD-012) — P3 11건 전량 구현, 인벤토리 백로그 소진(구현률 84%→97%, 87/90·범위 외 ⛔3 제외 시 100%). 신규 export: Boxplot·ChordDiagram·UMLPackageDiagram·DMNDiagram·BPMNCollaborationDiagram(🔶→✅)·ArchiMateViewpointDiagram·WorkBreakdownStructure(🔶→✅)·InformationalInfographic·Iceberg·BusinessModelCanvas·Honeycomb. 신규 geometry 4(boxplot/chord/iceberg/hexgrid)+tree.wbsNumbering+folder shape. 게이트 전부 green: typecheck/build/unit 82/play 1090/storybook build/publint. 외부 검토(codex/Gemini) 반영.
  - 원문:
    ```text
    p3 수행
    ```
- `KAN-018` bbangto-ui 라이브러리를 가져다 쓸 때, 직접 스타일 가이드를 구성하지 않고, catalog에서 채택하는 경우도 있을 것이다. 이 판단을 ai가 해야 한다고 할 때, 코드 내용을 전수 검토 하지 않고, 채택에 도움을 줄 수 있는 장치를 마련 하고 싶다. 메타 데이터를 심어 놓는다던가. 그와 관련된 전략을 구상해라. — 생성:유저 · 최종:ai · 갱신:2026-07-14
  - 메모: 완료 — 채택 메타데이터 전략+파일럿. StyleGuideMeta 타입+통제어휘(packages/tokens/src/styleGuideMeta.ts), buildManifest 생성기+catalog.manifest.json(51행, authored 3/pending 48), 파일럿 3종 meta 저작(minimal-saas-01·neobrutalism-editorial-01·cyberpunk-hud-01), 전략문서 METADATA_STRATEGY.md. 게이트 전부 green: typecheck/build(prebuild gen:manifest)/unit(catalog 13·viz 82·hooks 115)/play 1090/storybook build/pack. 외부검토(codex·Gemini) 반영. 후속: 잔여 백필·selectStyleGuides·Decision Table·WCAG 실측·md 자동생성.
- `KAN-017` 신규 style guide 후보 5종 구현 (Bento_Modular/Kinetic_Typography/Spatial_3D/Humanist_Imperfect/Tactile_Texture) — 생성:ai · 최종:ai · 갱신:2026-07-23
  - 메모: 검증(2026-07-23): 전제 무효 — 5종 후보(Bento_Modular/Kinetic_Typography/Spatial_3D/Humanist_Imperfect/Tactile_Texture)가 전부 이미 독립 preset으로 구현·등록됨. trendIndex #24-28, canonical displayName _01 부여(style-guide-catalog/src/index.ts:161-166, catalog.manifest.json). '이미지 레퍼런스 마이닝 #29-50' 파생 스타일과 혼입 없음. 미구현 0종 → 완료 처리.
- `KAN-026` viz 카탈로그 팔레트 실측 대비 감사 — 생성:유저 · 최종:ai · 갱신:2026-07-23
  - 메모: 완료(2026-07-23): auditVizContrast 구현 — VisualizationFoundation 선언 텍스트색(node.tagColor·c4.labelColor·boundary.labelColor)을 각 배경 표면 대비로 감사해 contrastIntent over-claim을 CI hard-fail. 순수 WCAG 수학(CONTRAST_THRESHOLDS·effectiveBgColors) tokens/contrast.ts로 승격(UI/viz SSOT 공유, UI 감사 리팩터+하위호환 re-export). surfaceBg 모델: 불투명 fill은 canvas 무관, fill:'none'(라인전용)·투명은 캔버스 위, 반투명은 canvas 합성, var/비-transparent tint는 fail-close. 그라디언트 worst-case. VizContrastViolation에 fg/bg/effectiveBg 진단+formatVizViolations. 실측 결과 viz 6종 전량 정직(over-claim 0). ChatGPT 외부검토 반영(tokens 승격·tint 정책 강화·Object.entries 순회·진단 강화·null-skip 확대). TDD 선작성. 4게이트 green(feat 커밋 e2484bb).
- `KAN-027` #29-50 비정규 displayName 16건 canonical 정규화 — 생성:유저 · 최종:ai · 갱신:2026-07-23
  - 메모: 완료(2026-07-23): #29-50 meta.displayName 16종을 마이닝 도출 시퀀스명(GrainyBlurDreamy_03·PixelArtRetro_13 등, CamelCase+_NN)에서 canonical Primary_Secondary_01(단어 경계 _ + _01)로 정정. 명명 결정은 별도 필요 없었음 — Storybook 스토리 타이틀이 이미 canonical 형태로 확립됨(슬러그 기계 변환, AI 케이스=Ai_Surreal_Gradient3d_01)이라 meta를 거기에 정렬. 산문 #### NN. 헤더의 마이닝명은 provenance로 의도 보존(명칭 SSOT는 트렌드 표/meta, md §379 주석) — 이미 정규화된 6종과 동일 패턴으로 #29-50 전체가 일관해짐. 매니페스트·트렌드 표 gen 재생성(16 셀만, 행순서 불변). 신규 게이트 displayName.test.ts(전 카탈로그 canonical 형식 …_01 + 16종 슬러그 기계정합 + 유일성)=재발 방지. slug(name)는 이미 canonical이라 무변경. 5게이트 green(typecheck·build·test:unit catalog76·play1092·storybook build). feat 커밋 d481e26.
- `KAN-016` 파일럿 외 템플릿 3-스타일 매트릭스 검증 확대 — 생성:ai · 최종:유저 · 갱신:2026-07-24
  - 메모: 완료 — 교차검증 템플릿 축을 파일럿 3종 → 그룹 전 축(G1~G5·P2·P3) 대표 24종으로 재스코핑. 신규 `_matrixFixtures.tsx`(그룹 스토리 검증 데이터 복사, 기존 스토리 무변경) + `TemplateStyleMatrix.stories.tsx`에 template-major `ExpandedMatrix` 스토리 추가(PilotMatrix 유지). play 검증: fixture 가드(key slug-safe·유일), 행수=fixture수·셀수=vizStyleGuideCatalog.length(SSOT), 셀별 svg role=img+non-empty title+expectVizPaintResolved+paintSig non-empty, 행마다 guideVarSig 전-가이드 all-distinct(결정적), 템플릿별 paintSig(svg 전 geometry mark, bg 제외, 상한60) 집합&gt;1. 외부검토(codex) 반영: 약한 &gt;1 기준 보강(가이드축 all-distinct 분리), bg가 paint 가리는 문제 제거, 첫-N 취약성→전-mark 일반화, SSOT 카운트, per-row 무결성. ExpandedMatrix 24×6=144 SVG play 2.56s(분할 불필요). 4 게이트 green(typecheck/build/test 1093/storybook build). viz 소스·core export 무변경.
- `KAN-014` 스타일 가이드 Marker_Sketchnote (hand-drawn, F4) 구현 — 생성:ai · 최종:ai · 갱신:2026-07-23
  - 메모: 완료 — F4 Marker_Sketchnote paint 가이드 구현(`marker-sketchnote-01`). 블로커 해소: seeded 지터는 RoughNode wrapper가 <defs><filter>에 feTurbulence(고정 seed=7)+feDisplacementMap 주입(NeonNode 패턴 미러, useVizDefsPrefix+useId 유일 id)으로 결정론 확보 — PRNG·새 geometry 0. 필터는 도형 그룹(data-viz-rough)에만, 텍스트 미적용(가독성). 손글씨=cursive 폴백 문자열(에셋 미번들). paper/darkboard 2 preset(makeVizColorway). meta contrastIntent 'aa'(over-claim 감사 0, 전 preset 실측 통과). 스토리 wrapperExtraPlay로 필터 스코프·seed·라벨 미왜곡 검증. 파일: src/markerSketchnote.tsx + VizStyleGuideMarkerSketchnote01.stories.tsx + index/preview/manifest. viz 6→8종. 4 게이트 green(typecheck/build/test 1103/storybook build)+카탈로그 39테스트. 외부검토(codex) 반영.
- `KAN-013` 스타일 가이드 Iso_ColorBlock (isometric, F6) 구현 — 생성:ai · 최종:ai · 갱신:2026-07-23
  - 메모: 완료(paint 패밀리 스코프, 사용자 승인) — F6 Iso_ColorBlock paint 가이드 구현(`iso-color-block-01`). 블로커 재해석: 분류문서 line 167/246-247 '스타일 가이드는 paint만, iso는 별도 geometry 트랙' 원칙에 따라 3단 면 페인트만 구현. Node cube 케이스(atoms/Node.tsx:212, front/top12%/right24% 고정 오버레이)를 재사용해 면별 3단 플랫 음영 확보 — 새 geometry 0. IsoNode wrapper는 제네릭 박스(rect/rounded/미지정)만 cube 승격, 의미 도형은 pass-through(시맨틱 보존). 단일 계열 램프(더스티 블루/웜 클레이 2 preset)+중립 커넥터 잉크(역할 분리)+accent 1색. 검토 반영: description·meta·guideline에 'paint family, 진짜 iso 투영 아님' 명시; face-tone ext 토큰은 dead token이라 폐기(--ext-accent만). meta 'aa'(over-claim 0). 진짜 iso 투영·depth-sort는 [[KAN-028]] 후속 트랙으로 분리. 파일: src/isoColorBlock.tsx + 스토리(wrapperExtraPlay=cube 승격·pass-through 검증) + index/preview/manifest. 4 게이트 green+카탈로그 39테스트.
- `KAN-015` G6 메타 프레임(Kruchten 4+1 / Viewpoint) 구현 — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-23): G6 메타 구조 프레임 2종 구현. Kruchten4Plus1View(영역별 slots=중첩 프리셋 우선·data=불릿 폴백, 영역 단위 no-merge; 3행 배치=상단 2코너·중앙 Scenarios(+1) 밴드·하단 2코너) + ViewpointFrame(ISO/IEC/IEEE 42010 — 헤더밴드=viewpoint·concerns[]·stakeholders[]·modelKinds[], body=중첩 view 슬롯, 미지정 시 'No view supplied' 플레이스홀더). §C-2 공통계약 준수(신규 아톰/geometry/paint 채널 0 — 기존 Canvas·Boundary·vvar·parseViewBox만 재사용). 슬롯=절대좌표 nested svg(x/y/w/h)로 타 프리셋 조합. 명칭 오판 방지: 42010 ViewpointFrame != ArchiMate 고유 viewpoint(ArchiMateViewpointDiagram, VT-121) — description/주석 명시. TDD 선작성(G6MetaFrames.stories.tsx 3스토리 play=영역/슬롯/헤더 메타/폴백 검증). 배럴 export + 인벤토리·PLAN SSOT 갱신. 4게이트 green(typecheck·build·test 1106·storybook build).
- `KAN-019` visualization 관련 스타일 가이드 카탈로그 수가 매우 적은 상황이다. 풍부화 하기 위해, 추가할 수 있는 디자인 스타일을 조사 및 수집 하고, 항목화 해라. 그리고 구현 계획을 세워라. — 생성:유저 · 최종:ai · 갱신:2026-07-24
  - 메모: 수행(2026-07-24): 88-corpus(F1~F7) 소진 확인 → 코퍼스 바깥 신규 조사원(UI 카탈로그 51종 + 아웃라이어 3종)에서 확장 후보 조사·항목화·구현계획 산출. deliverable=packages/visualization/viz-style-expansion.md. UI 51종 전수 viz-적용성 트리아지(강력 P1 5 / 보통 P2 17 / 커버·약함·제외 29), 유형⊥스타일 원칙 근거. P1 5종(Swiss/Bauhaus/Terminal/Riso/HUD) 전부 Tier A/B·코어변경 0(F5/F7 경로)·기존 매트릭스/결정테이블 테스트에 자동편입(§5-c). visualization-catalog.md §4에 포인터 추가. 실제 구현은 후속 카드로 분해(KAN-013/014 선례).
- `KAN-029` Swiss_Systematic_01 viz 스타일 가이드 구현 (KAN-019 P1) — 생성:ai · 최종:유저 · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): Swiss_Systematic_01 (slug swiss-systematic-01) 구현 — 냉 뉴트럴 그레이 램프 + 단일 레드 #E1000F 액센트, 무채움 헤어라인 노드 + 레드 fill 강조 kind, 무그림자·radius0. 2 preset(Achromatic+Red / Ink). contrastIntent aa (white-on-red 4.99 &lt; 7 이라 aaa 불가, 정직 하향). 병렬 배치 1/5. src/swissSystematic.tsx + 스토리, tokens family viz-swiss-systematic + index/manifest 편입. 4게이트 green.
- `KAN-030` Terminal_Ascii_01 viz 스타일 가이드 구현 (KAN-019 P1) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): Terminal_Ascii_01 (slug terminal-ascii-01) 구현 — 다크 콘솔 #0B0F0A + 포스포 그린 #3DDC84, titleFont===monoFont 전면 mono, 무채움 그린 박스, default/amber colorway. contrastIntent aaa (최악 감사 10.09). wrapperExtraPlay=mono 시그니처 3중 검증. family viz-terminal-ascii. 4게이트 green.
- `KAN-031` Bauhaus_Geometric_01 viz 스타일 가이드 구현 (KAN-019 P1) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): Bauhaus_Geometric_01 (slug bauhaus-geometric-01) 구현 — 웜 페이퍼 #F3EFE4 + 3원색 + 굵은 검정 윤곽 + 하드 오프셋 그림자. fill별 라벨 휘도 자동(모두 4.5 이상); red fill은 #D13120로 다크닝(순수 #E63A27은 white 4.20/black 4.14 둘 다 실패)하고 palette.p1엔 원색 #E63A27 보존. 무효 태그 bold/hard → high-contrast/flat 교체. contrastIntent aa. family viz-bauhaus-geometric. 4게이트 green.
- `KAN-032` Riso_Print_01 viz 스타일 가이드 구현 (KAN-019 P1) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): Riso_Print_01 (slug riso-print-01) 구현 — 웜 크림 #F4EFE0 + 스팟 잉크(핑크 #FF4D6D × 블루 #1E5AA8) multiply 오버프린트(mix-blend-mode 모티프) + feTurbulence grain(seed 7 결정론) + 미스레지 데코 ghost. shape.stroke=블루 #1E5AA8(핑크 2.8:1이라 라인/텍스트에서 제외). default/teal preset, 전 라벨 다크 잉크. contrastIntent aa (최악 라벨 7.84), accessibilityAudit over-claim 0. family viz-riso-print. 4게이트 green.
- `KAN-033` Hud_Telemetry_01 viz 스타일 가이드 구현(+코너 브래킷 wrapper) (KAN-019 P1) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): Hud_Telemetry_01 (slug hud-telemetry-01) 구현 (Tier B) — 딥 틸다크 #07131A + 네온 시안 #22D3EE 엣지 + 코너 브래킷 데코(신규 wrapper HudNode가 x/y/w/h에서 4모서리 path 계산, data-viz-hud-bracket) + 스캔라인/글로우 절제(name-scoped CSS). default/amber preset, 화이트 라벨(글로우 위 텍스트 금지). contrastIntent aa. wrapperExtraPlay=브래킷 4+·노드 2+. related에 terminal-ascii-01 복원(5종 동시 편입). family viz-hud-telemetry. 4게이트 green.
- `KAN-034` P2 viz 스타일 배치 + 인쇄/소프트 패밀리 통합 결정 (KAN-019 P2) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): P2 통합 결정 카드(코드변경 0·순수 계획/문서). 핵심 정정 — 메모의 「colorway로 ~12 저작단위 축소」는 현 게이트상 불가(_vizCatalogStory 색-스킴 불변식: 2번째+ preset은 색상만·비색토큰 deep-equal; 모티프는 wrapper라 색토큰 스와핑 불가). ∴ 통합=family 코드 그룹핑(별도 가이드·공유 family)만 가능, 저작단위 17 유지. 결정(사용자 승인): viz-print-ink(riso 리네임+halftone#36+glitch#33) · viz-soft-puffy(neumorph#2+clay#3+kawaii#17) 그룹핑, 나머지 12종 1:1(총 26 family/30 guide). riso 리네임 viz-riso-print→viz-print-ink는 첫 print 카드(KAN-037)에서 원자 수행. deliverable=viz-style-expansion.md §7(배치표·카드분해·게이트 주의). 분해: KAN-037(print-ink)·KAN-038(soft-puffy)·KAN-039(1:1 12종).
- `KAN-037` viz-print-ink 패밀리 — Halftone_Print + Glitch_Duotone viz 가이드 + riso 리네임 (KAN-034 P2) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): viz-print-ink 패밀리 확정 + Halftone_Print_01·Glitch_Duotone_01 2종 저작(병렬 하네스 검증 웨이브 — KAN-034 후속 첫 배치). riso 리네임 원자 수행: tokens STYLE_FAMILIES viz-riso-print→viz-print-ink + STYLE_FAMILY_LABELS 'Print Ink' + risoPrint.tsx meta.family. 신규 2종 모두 meta.family=viz-print-ink 공유(3 guide/1 family). Halftone(웜페이퍼 #F7F4EC + CMYK 반투명 워시 multiply 오버프린트 + K 망점 SVG <pattern> 도형한정 오버레이·HalftonePrintNode, near-black K 잉크 라벨, contrastIntent aaa) · Glitch(밝은 쿨페이퍼 #F2EFF2 + 마젠타/시안 채널 반투명 워시 + RGB-split 두 유령채널 ±1.6px 오프셋 multiply·GlitchNode, 다크잉크 라벨, contrastIntent aa). 둘 다 risoPrint 템플릿 미러(별도 wrapper·makeVizColorway 2 preset·게이트 색스킴 불변식 준수). 게이트 4종 green: build(viz manifest 13→15)·typecheck·test 1141 passed/166 files·storybook build. 병렬 저작 전략 실증: 2 에이전트가 각자 src+story 2파일만 저작, 공유 seam(tokens union·barrel·manifest)은 메인 직렬 통합. viz 카탈로그 13→15 guide. 후속 KAN-038(soft-puffy)·KAN-039(1:1 12종) 미착수.
- `KAN-038` viz-soft-puffy 패밀리 — Neumorphic + Clay_Playful + Kawaii_Pastel viz 가이드 (KAN-034 P2) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24): 신규 viz-soft-puffy family 확정 + 소프트/퍼피 계열 3종 저작(3 guide/1 family). tokens STYLE_FAMILIES viz-soft-puffy 추가 + label 'Soft Puffy'. 저대비 위험군 정직 대응(전부 다크 잉크 라벨·윤곽 ≥4.5, 모티프는 wrapper 장식). Neumorphic_Soft_01(동색 표면 #E8ECF2 + 듀얼 소프트 섀도 압출·NeumorphNode feOffset+feGaussianBlur+feFlood+feComposite 2겹 feMerge, 다크 슬레이트 잉크 ~10:1, contrastIntent aa·contrast medium) · Clay_Playful_01(파스텔 퍼피 + inset inner-shadow·ClayNode feComposite operator=out 알파반전 + outer puff, 다크 클레이 잉크, aa) · Kawaii_Pastel_01(파스텔 + 마스코트 글리프 데코 wrapper·KawaiiNode bbox서 얼굴 글리프 계산, Tier B, 다크 플럼 잉크, aa). 3종 모두 risoPrint 템플릿 미러(별도 wrapper·makeVizColorway 2 preset·색스킴 불변식). 병렬 저작 실증: 3 general-purpose 에이전트가 각자 src+story 2파일만, 공유 seam(tokens 신규 family·barrel·manifest)은 메인 직렬 통합(P0 family 추가 선행). 게이트 4종 green: build(manifest 15→18)·typecheck·test 1156 passed/169 files·storybook build. viz 카탈로그 15→18 guide. feat d979f14. 후속 KAN-039(1:1 12종) 미착수.
