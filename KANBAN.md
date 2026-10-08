# KANBAN — bbangto-ui

> hyper plan 보드. 앱 기능 백로그가 아니라 프로젝트 차원의 계획을 유저·AI가 공동 관리한다.
> 카드 메타(생성/최종/갱신)는 manage-kanban 스킬이 관리한다. 규칙은 스킬 SKILL.md를 따른다.

## 백로그
<!-- 아직 착수 결정 전. 우선순위 미정 후보 풀. 백로그→할 일 이동이 "할지 고민" → "하기로 확정" 전환점. -->
- `KAN-055-34A57K` 트리 셰이킹·글꼴·키보드 수정분 배포 (사용자 실행 지시 후) — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: 수정분 배포
  - 목적: KAN-051~054·058 결과를 GitHub Packages에 배포하고, 배포본으로 크기를 다시 잰 뒤 외부 앱에 버전을 알린다
  - 이유: 외부 앱은 배포된 버전만 설치할 수 있다
  - 목표: 배포된 core 새 버전에서 Button 단독이 크기 상한 이하로 확인된다
  - 메모: 외부 앱 소비 문제 대응 5장 중 5 · push·배포는 사용자의 분명한 실행 지시 뒤에만. 열 이동은 승인이 아니다
  - 실행 문서: KANBAN/cards/KAN-055-34A57K.md (0/3 · 최근 10-08)
  - 원문:
    ```text
    [첨부 이미지]
    bbangto-ui 컴포넌트를 지금 들여오면 생기는 문제
    - 워커가 시안의 화면 조각 42개를 나눴습니다. bbangto-ui에 이미 있는 것이 11개, 이 앱에서 만들 것이 22개, bbangto-ui에 요청할 것이 9개입니다.
    - 그런데 bbangto-ui core(1.1.2)는 들여오는 입구가 하나뿐입니다. Button 하나만 써도 약 420KB가 번들에 들어갑니다. 지금 웹 앱 전체가 375KB이니 앱이 두 배 넘게 커집니다.
    - 원인은 bbangto-ui 빌드에 있습니다. forwardRef 127곳에 「안 쓰면 버려도 된다」는 표시(__PURE__)가 없습니다. 이 두 가지는 제가 설치된 파일에서 직접 확인했습니다. 워커가 이 표시를 붙인 사본으로 다시 빌드하자 Button이 25KB로 줄었다고 보고했고, 이 재빌드는 제가 다시 해 보지 않았습니다.
    - 번들 말고도 문제가 있다고 워커가 보고했습니다(제가 직접 확인하지는 않았습니다).
      - Provider가 외부 글꼴을 늘 불러옵니다.
      - Drawer에 Esc 닫기와 포커스 처리가 없습니다.
      - Tabs·Select의 키보드 조작이 빠져 있습니다.
    
    이 문제를 해결하기 위한 전략을 수립, 실행 계획 수립, 칸반 카드화 해라.
    ```
- `KAN-057-CCH3E8` viz edge.dashPattern 토큰 정리 — 선언만 있고 읽히지 않는 커넥터 대시 토큰을 잇거나 걷기 — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: 엣지 대시 토큰 정리
  - 목적: 선언만 된 edge.dashPattern 토큰을 계약 스타일시트나 Edge 가 읽게 잇거나, 쓸 계획이 없으면 걷어낸다
  - 이유: 토큰 자리(packages/tokens/src/visualization.ts:66)는 있는데 아무도 읽지 않아, 스타일 가이드가 그 값을 넣어도 엣지 선 모양이 바뀌지 않는다(KAN-049 에서 발견)
  - 목표: 토큰이 실제로 엣지에 반영되거나 타입에서 사라져, 선언과 동작이 어긋난 자리가 없어진다. style-classification 횡단 규칙 3 의 상태 문장도 갱신된다
  - 메모: 잇는 쪽이면 스타일 가이드 기본값을 개별 prop(strokeDasharray)이 덮는 순서를 지킨다. 잇기와 걷기 중 무엇을 할지는 착수 때 정한다
  - 원문:
    ```text
    만들어 (앞 답변 「앞서 여쭌 백로그 카드 두 가지(리터럴 색이 남은 템플릿 13개, 읽히지 않는 `edge.dashPattern` 토큰)는 아직 만들지 않았습니다.」에 대한 답)
    ```
- `KAN-061-K8V2HH` viz 템플릿 라벨 대비 미달 정리 — 불투명 팔레트 면 · 글자 대비 기준 목록 줄이기 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: viz 라벨 대비 정리
  - 목적: viz 템플릿 글자가 카탈로그 가이드 30개 모두에서 4.5:1 이상 읽히게 한다 — KAN-056 기준 목록 204곳과 불투명 팔레트 면(Mindmap · ArchiMateViewpoint)부터
  - 이유: KAN-056 검토에서 가이드에 따라 글자가 바탕에 묻히는 곳이 확인됐다(Mindmap 92곳 · Requirement 64곳 등). 지금은 기준 목록으로 더 나빠지지만 않게 막아 둔 상태다
  - 목표: _labelContrastBaseline.ts 가 빈다(모든 템플릿으로 넓히는 일은 KAN-063 이 먼저 한다)
  - 메모: KAN-056 검토 항목 3(승인)·6에서 나왔다. KAN-056 병합 뒤 착수(검사와 기준 목록이 그 카드에 있다). 원인이 셋으로 갈린다: 불투명 팔레트 면 위 edge.stroke 글자, Requirement 반투명 글자(opacity 0.6·0.8)와 검정 6% 띠, riso-print 등의 shape.fill·edge.stroke 쌍. 카탈로그 대비 게이트가 shape.fill·edge.stroke 쌍을 재는지는 확인 안 함
  - 실행 문서: KANBAN/cards/KAN-061-K8V2HH.md (0/1 · 최근 10-08)
- `KAN-062-E02CMT` SVG 속성 안 var() 브라우저 확인 — README 문장과 속성으로 색을 넣는 코드를 실제 동작에 맞추기 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: 속성 안 var() 확인
  - 목적: Firefox·Safari 에서 SVG 속성(presentation attribute) 안의 var() 가 풀리는지 확인하고, README 문장과 그 형태로 색을 넣는 코드를 결과에 맞춘다
  - 이유: viz README 는 속성 안 var() 가 무효라 적지만 chromium 에서는 풀린다. 코드에도 그 형태가 있어 안 풀리는 브라우저에서는 인터페이스 선이 사라지거나 라벨이 검정이 된다(KAN-056 검토 항목 3)
  - 목표: 세 브라우저 결과가 README 에 적히고, 안 풀리는 브라우저가 있으면 속성 안 var() 가 모두 style 로 옮겨지고 검사로 막힌다
  - 메모: KAN-056 검토 항목 3(검토자 승인, 둘째 선택지)에서 나왔다. KAN-056 시점 줄: UMLComponentDiagram.tsx:65·97, BPMNDiagram.tsx:86·128, README.md 「명시한 prop 이 이긴다」 항목. 다른 템플릿·원자에도 같은 형태가 있는지는 확인 안 함

## 할 일
- `KAN-060-G9YKG6` 포커스 테두리 색 대비 3:1 — border.focus 토큰 정리와 대비 게이트 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: 포커스 색 대비
  - 목적: border.focus 가 배경과 3:1 이 안 되는 색 스킴(foundation 21개, style guide 13개 이상)의 값을 고치고 대비 게이트를 세운다
  - 이유: KAN-059 가 모든 포커스 테두리를 border.focus 로 그리는데, 그 색 스킴에서는 테두리가 배경과 거의 같아 보이지 않는다(neonYellow 1.03, cosmonaut 1.00)
  - 목표: 모든 foundation·style guide 색 스킴에서 border.focus 가 background.base·elevated 와 3:1 이상이고, 어기면 test:unit 이 빨강이 된다
  - 메모: KAN-059 착수 전 계획에서 발견(2026-10-07 main dist 를 tokens contrastRatio 로 계산). 그라디언트 배경 style guide 는 아직 못 쟀다 · 테두리는 border.focus 를 실행 때 읽으므로 토큰만 고치면 KAN-059 결과에 그대로 반영된다
  - 실행 문서: KANBAN/cards/KAN-060-G9YKG6.md (0/5 · 최근 10-08)
  - 계획 리포트: KANBAN/reports/KAN-060-G9YKG6.report.html (낡음)
  - 원문:
    ```text
    새 카드로 분리 (앞 질문 「border.focus 대비가 3:1에 못 미치는 색 스킴(foundation 21개, style guide 13개 이상)을 어떻게 할까요?」에 대한 답)
    ```

## 진행 중
- `KAN-063-Q85EET` viz Paint Gate 표본을 나머지 템플릿으로 넓히기 — 리터럴 · 글자 대비 검사가 모든 템플릿을 보게 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: Paint Gate 표본 확장
  - 목적: TemplatePaintGate 의 두 검사(리터럴 색 · 글자 대비)가 표본이 없는 템플릿도 그리게 표본(fixture)을 더한다
  - 이유: 지금 리터럴 검사는 템플릿 export 65개 중 31개, 글자 대비 검사는 13개만 본다. 나머지는 리터럴이 들어와도 걸리지 않고 README 가 그 한계를 적고 있다(KAN-056 검토 항목 5)
  - 목표: templates 가 내보내는 모든 템플릿에 표본이 있고, 표본이 빠진 템플릿이 생기면 검사가 빨강이 된다
  - 메모: KAN-056 검토 항목 5(검토자 승인, 추천안의 후속 부분)에서 나왔다. KAN-056 병합 뒤 착수. 글자 대비 검사를 넓히면 새 미달이 나와 viz 라벨 대비 정리 카드와 같은 파일을 고치게 되므로 착수 전에 순서를 정한다
  - 실행 문서: KANBAN/cards/KAN-063-Q85EET.md (1/5 · 최근 10-08)
  - 계획 리포트: KANBAN/reports/KAN-063-Q85EET.report.html (낡음)

## 검토

## 완료
- `KAN-020` visualization **유형(패턴/템플릿) 축** 매니페스트 + selector 인프라 구현 — 생성:유저 · 최종:유저 · 갱신:2026-08-14
  - 메모: 완료(2026-07-24). 유형(what) 축 채택 메타 인프라 신설 — 스타일 축(KAN-018/021/022/023)을 유형 축으로 미러링. 산출물: `packages/visualization/src/typeMeta/{types,registry,manifest,select,index}.ts` + `scripts/genTypeManifest.ts` + `type.manifest.json`(87 엔트리) + 서브패스 export `./type-meta`(루트 배럴 미오염 → 컴포넌트 소비자 번들 무영향) + `TYPE_METADATA_STRATEGY.md`(+ style METADATA_STRATEGY 포인터). **VizTypeMeta 스키마**(category A~G·dataShape=FT9+구조7·primitives16·tags 고정 union·useWhen/avoidWhen/related). **레지스트리 87 슬롯**(inventory §5/§6 전사, ⛔ 3행 제외) — 파일럿 6종 rich-meta(BarChart VT-501·ClassDiagram VT-101·ProcessSteps VT-202·SwotMatrix VT-703·Sequence VT-108[다-export 3]·Cycle VT-203[variant]), 나머지 81 pending. **buildTypeManifest**(related 정합성 authored 전체 throw·id 결정적 정렬·완성도 계산) + **selectVizTypes**(soft-weighted recall·includePending 기본 false·결정적 tie-break — select.ts 시맨틱 계승). 커버리지 게이트 = 배럴 정적 소스스캔 양방향(90 export − allowlist 3[IsometricScene·Kruchten4Plus1View·ViewpointFrame; inventory §8-b VT 미승격] = 87). TDD 30 테스트(registry/manifest 바이트동기/select). 외부검토(codex) 13지적 반영(모드 variant·정적스캔·서브패스·시맨틱계승·태그 union·개수기준 분리·related 전체·stable-API·소비 이원경로). prebuild 미배선(코어 blast radius↓, KAN-025 선례)—`gen:type-manifest` 수동+바이트동기 테스트가 최신성 강제. 게이트 5종 green: typecheck·build(viz dist/typeMeta emit)·test:unit(viz 138[+30])·test(1219 play)·storybook build. 스코프=인프라+파일럿; pending 81 전량 backfill은 [[KAN-040]] 후속. [[KAN-035]] **선행조건**(본 카드=유형 축 인프라, KAN-035=전 인터페이스 커버리지 감사).
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
- `KAN-039` P2 viz 1:1 단일 스타일 12종 순차 구현 (KAN-034 P2) — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료(2026-07-24, 12/12): P2 1:1 단일 12종 전량 저작(각자 고유 family). 안전/리스크 2배치 병렬 하네스로 수행. 배치1(Tier A 6종, feat bef142d): Neobrutalist·Editorial_Data·Memphis_Pattern·Retro70s_Warm·Dopamine_Max·Bento_Stat. 배치2(리스크군 6종, feat 4060546): Synthwave(다크 네온+CRT 스캔라인)·ArtDeco_Luxe(흑/딥그린+골드 대칭 프레임)·DarkLuxe(순흑+골드 헤어라인+세리프, aaa)·Organic_Blob(결정론적 bezier blob shape, Tier B 신규 geometry)·Ukiyoe_Flat(흙빛 라이트틴트+스미 잉크, 저대비 정직 하향)·Pixel_Retro(정수그리드+스퀘어 픽셀 pattern). 다크 3종은 neon/HUD 선례로 라벨=라이트·stroke=네온/골드 ≥4.5, 채도/저대비군은 반투명워시/라이트틴트+다크잉크로 대비 확보(over-claim 감사 0). 6 에이전트×2배치 병렬 저작+seam 직렬 통합. 인프라: ExpandedMatrix 교차검증 매트릭스가 카탈로그 30종=720셀로 커지며 testTimeout 15s→60s 상향. 게이트 4종 green(manifest 24→30·test 1216/181 files·storybook build). viz 카탈로그 18→30 guide(KAN-039 +12). KAN-034 후속 3카드(037·038·039) 전량 완료.
- `KAN-028` viz geometry 트랙 — 진짜 isometric 투영(projection·depth-sort·iso 커넥터) 프리미티브 구현 — 생성:ai · 최종:ai · 갱신:2026-07-24
  - 메모: 완료 — 진짜 iso geometry 트랙. geometry/isometric.ts 순수함수(projectIso 30°투영행렬·isoPrismFaces 가시3면·isoDepthKey/depthSortBoxes painter's·isoConnectorPath 바닥축 L라우팅+공통z·floorShadowPolygon·isoFloorGrid extent기반·fitIsoProjection auto-fit) + IsoPrism 아톰(3 base면 data-viz-part + 검정 음영 오버레이는 장식마커[aria-hidden/data-bbangto-viz-decoration/pointer-events]로 paint gate 바깥·라벨 optional) + IsometricScene 템플릿(draw order: grid→shadow→connector[프리즘 뒤 오클루전]→depth-sorted prism→평면 라벨 오버레이). 텍스트 skew 금지(좌표 baking·SVG transform 0 — 접근성 불변식 play 검증). Iso_ColorBlock·Corporate_Schematic 동일 씬 스토리로 paint/geometry 직교성 실증. isometric.test.ts 26종. style-classification.md F6/§6/횡단관측1 갱신 + isoColorBlock.tsx 상호참조 주석. 게이트 5종 green(typecheck·test:unit 223·build·test 1219 play·storybook build). Plan 외부검토(codex) 7개 보완 반영(커넥터 순서·라벨 책임 단일화·면 꼭짓점 정확성 테스트·장식 명시마커·grid extent화·fit/angle 계약·검증커맨드 분리). KAN-035 관점: geometry 프리미티브는 StyleGuide가 아니라 manifest/StyleGuideMeta 대상 아님(JSDoc useWhen류 문서화로 갈음).
- `KAN-040` viz 유형 축 meta 전량 backfill — [[KAN-020]] 인프라 위 pending 81종에 rich `VizTypeMeta`(useWhen/avoidWhen/dataShape/primitives/related) additive 저작, 완료 시 gate 'type-meta 필수' 승격 후보. 스키마는 KAN-020이 stable 동결 → 필드 추가·변경 없이 채우기만. 스타일 축 KAN-021(48+6 backfill) 동형. [[KAN-035]] **관계**: 본 카드 = viz 유형 축 커버리지 **저작 실행**, KAN-035 = 전 인터페이스 커버리지 **감사/집행**(상위). — 생성:유저 · 최종:유저 · 갱신:2026-08-14
  - 메모: 완료(2026-07-25): KAN-020 인프라(동결 스키마) 위 pending 81종 전량 additive 백필 → 전 87 authored·pending 0. 인벤토리 §5 각 행(정의·용도·프리미티브·aliases·tags·related)을 통제 어휘 union으로 정규화 승격(필드 추가·변경 0). **gate 'type-meta 필수' 승격**: registry.test.ts에 전 엔트리 meta 보유(pending 0)·통제 어휘 검증·useWhen/avoidWhen(≤5)·related 정합성 hard-fail 추가. 타입상 meta? optional 제거는 breaking이라 이연(스타일 축 KAN-021 선례=게이트 집행·타입 유지). TDD: manifest.test authored 6→87·pending 81→0, select.test AUTHORED=87 + 카운트/집합 의존 3종 재작성(process 만점집합=레지스트리 파생·geo soft-weighted 비붕괴) + includePending 합성 픽스처 테스트(실 레지스트리 pending 0이라 커버리지 보존). type.manifest.json 재생성(gen:type-manifest). 게이트 5종 green: typecheck(8pkg)·build·test:unit(viz 138→141)·test(1219 play)·storybook build. 코어/스토리 무변경(순수 데이터+테스트). [[KAN-035]] 감사/집행은 상위 카드 유지.
- `KAN-035` 최초 ai를 위한 메타데이터를 도입한 작업 이후로, 태스크를 진행할 때마다, 메타데이터 생성도 같이 진행이 됐는지 확인 필요. 같이 생성이 안됐다면, 없는 인터페이스들에 대해서 적용하기 위한 계획 및 수행 필요 — 생성:유저 · 최종:ai · 갱신:2026-07-25
  - 메모: 완료(2026-07-25). 전 인터페이스 메타 커버리지 감사+집행. 감사: 3축(UI 스타일가이드 51·viz 스타일가이드 30·유형 87) 전량 authored·게이트 green, core 4범주(components 57/blocks 13/patterns 4/motion 28) 기능선택형 out-of-scope(근거+승격 trigger 명문화). 유일 갭=foundations 76(name+description 한 줄뿐)→FoundationMeta 축 인프라 신설: tokens/foundationMeta.ts(Domain/Tag/StyleMood 재사용) + foundations/src/meta/{registry,manifest,select,index}.ts + gen(colorScheme·baseTextContrast 파생·over-claim hard-fail·catalog.json emit) + 서브패스 ./meta(번들격리, 루트 배럴 미오염) + 파일럿 3종(blueprint·amber-dark·stark-white). 집행 census: metadata-coverage.json(count 미포함, 매니페스트서 계산) + foundations/src/metadataCoverage.test(드리프트 스캔=미선언 카탈로그 fail·infra-pilot followUp 필수·자동 실패주입 fixture) + METADATA_COVERAGE_AUDIT.md 리포트. 부수 drift 수리: catalog.json 74→76 생성물 격하(amber 2종 누락+carbon 정렬 교정). 파일럿 관찰: foundations 전량 라이트-베이스(다크=amber-dark뿐)→colorScheme 편중, 실질변별=tags/mood/domains(StyleGuideMeta 재사용 적합 확인, 스키마 변경 불필요). 게이트 5종 green: typecheck·build(dist/meta emit)·test:unit(foundations 40 신규)·test(1219 play)·storybook build. 외부검토(codex) 반영(DoD 정직화·census count계산·이중SSOT 격하·baseTextContrast 명명 축소·자동 실패주입 등 14지적). 잔여 73 backfill=후속 KAN-041. 유형축 인프라 KAN-020이 선행조건.
- `KAN-041` foundations 잔여 73종 FoundationMeta 전량 backfill → census infra-pilot→covered 승격(pending 0) — 생성:ai · 최종:ai · 갱신:2026-07-25
  - 메모: 완료(2026-07-25). KAN-035 인프라(동결 스키마) 위 잔여 73종 FoundationMeta 전량 additive 백필 → 76/76 authored·pending 0(파일 미변경, registry에 meta만 추가). 저작 grounding=실제 accent 토큰(semantic.primary.base) — description 오해(다수가 'on dark'라도 실 background.base=흰색, 예 electric-void) 회피. 통제 어휘=tokens TAGS/DOMAINS 재사용, related 76종 인접 클러스터(색hue/mono·void/warm) 정합. 'foundation-meta 필수' 게이트 승격: registry.test에 registry키집합≡catalog키집합(pending 0) hard-fail + manifest.test 76 전량 authored assert + metadata-coverage.json foundation infra-pilot→covered(census가 covered축 authored==total 강제). selector fixture 보강 3종(mood 근접·복합 criteria 가중합·weights.tags=0 소거). foundation.manifest.json 재생성(gen). 게이트 5종 green: typecheck(8pkg)·build(dist/meta emit·루트배럴 미오염)·test:unit(foundations 40→44)·test(1219 play)·storybook build. 문서: FOUNDATION_METADATA_STRATEGY 롤아웃표·METADATA_COVERAGE_AUDIT foundation→covered(네 축 전량 covered 달성). 관찰: 76 저작 후에도 colorScheme 75L/1D 편중·baseTextContrast≥17.39 상수 → 실질변별 tags/mood/domains(StyleGuideMeta 어휘 재사용 76 스케일 충분 확인, 스키마 변경 0).
- `KAN-036` 지금까지의 작업 내역을 npm package에 새로 반영해라. 새로 생기거나 없어져야 하는 패키지가 있는지, 이름이 바뀌어야 하는 패키지가 있는지도 확인하고, 버전도 확인해서 배포 계획을 세워라. — 생성:유저 · 최종:유저 · 갱신:2026-08-14
  - 메모: 완료(2026-07-25): 작업 내역 npm 반영 감사 + 배포 계획. 마지막 발행(06ed3e5) 이후 ORD-008~~012 + KAN-013~~041 전량 미발행 확인. 갭 해소: 패키지별 단일 changeset 5종 신규(tokens/foundations/style-guide-catalog/visualization/viz-catalog) — foundations는 기존 6 changeset이 하나도 안 건드려 버전 범프 자체 누락(핵심 갭). changeset status 검증 = tokens 1.1.0→1.2.0·foundations 1.0.1→1.1.0·style-guide-catalog 0.2.0→0.3.0·visualization 0.1.0→0.2.0·viz-catalog 0.1.0→0.2.0·core 1.1.1(dep auto)·hooks 0.3.0 유지, major 0(전부 additive; style-guide-catalog bakery→neobrutalism 리네임만 breaking이나 pre-1.0라 minor 허용+기존 changeset 커버). 패키지 신설/삭제/리네임 불필요(diagram→visualization·themes→foundations 이미 코드 반영). drift 정정: style-guide-catalog desc 29→51·viz-catalog desc +30·visualization CHANGELOG H1 diagram→visualization+lineage. RELEASE_PLAN.md 신규(버전표+승인게이트+레거시 deprecate follow-up). 게이트 전부 green: typecheck 8pkg·build·test:unit(viz141/found44/sgc76/vsgc39)·test 1219 play·storybook build·dist↔exports(dist/meta·dist/typeMeta)·build drift 0. 외부검토(codex) 반영(changeset 패키지별 분할·semver 배럴 diff 검증·release-readiness). 배포 실행(main push→Version PR→publish 6종)은 유저 명시 승인 후 별도.
- `KAN-042-JZ2ZBT` bbangto-ui-vizualization을 사용하는 클라이언트가 문제를 제기했다. "/Users/centurio/resume/docs/viz-upstream-issues.md" 이 레포트를 보고 문제를 진단하고 문제 해결 전략 레포트를 작성하고, wbs를 작성하여 이 카드를 수행하는 agent가 사용할 수 있도록 해라.ㄴ — 생성:유저 · 최종:ai · 갱신:2026-08-24
  - 실행 문서: KANBAN/cards/KAN-042-JZ2ZBT.md (9/9 · 최근 08-14)
  - 검토 문서: KANBAN/reviews/KAN-042-JZ2ZBT.review.md (승인 3/3 · 승인)
- `KAN-043-2JM72N` 상류 리포트 I 계열(I1~I7) 해소 — 유형 선택 정보 도달 경로 — 생성:ai · 최종:ai · 갱신:2026-08-24
  - 메모: P 계열(KAN-042) 후속. 87종 콘텐츠는 있으나 소비자가 도달 못 하는 경로 결함 7건.
  - 실행 문서: KANBAN/cards/KAN-043-2JM72N.md (9/9 · 최근 08-14)
  - 검토 문서: KANBAN/reviews/KAN-043-2JM72N.review.md (승인 4/4 · 승인)
  - 원문:
    ```text
    bbangto-ui-vizualization 패키지를 사용하는 사용자가 피드백 레포트를 작성했다. (/Users/centurio/resume/docs/viz-upstream-issues.md) P계열은 반영했으므로, I 계열을 검토해서 개선 해라
    ```
- `KAN-044-3KYT2Q` 불필요한 문서들 파악해서 정리하기 위한 계획 세우고 레포트 제출해라 — 생성:유저 · 최종:ai · 갱신:2026-08-25
  - 짧은 제목: 문서 정리 계획 리포트
  - 목적: 레포 안의 문서를 전수 파악해 존치·통합·폐기를 가르는 정리 계획과 리포트를 낸다
  - 이유: 루트에만 ASSET_INTEGRATION_PLAN·DESIGN_SYSTEM_GUIDE·METADATA_COVERAGE_AUDIT·ORDER·RELEASE_PLAN 등이 쌓여 어느 것이 살아있는 문서인지 구분되지 않는다
  - 목표: 문서마다 판정과 근거가 붙은 정리 계획 리포트가 나와 실제 정리를 착수할 수 있다
  - 실행 문서: KANBAN/cards/KAN-044-3KYT2Q.md (6/6 · 최근 08-25)
  - 계획 리포트: KANBAN/reports/KAN-044-3KYT2Q.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-044-3KYT2Q.review.md (승인 7/7 · 추가 의견 총 3 · 승인)
- `KAN-045-PNT454` README는 이 레포를 설명하기에 정보가 많이 부족하다. 이 프로젝트를 활용 사례 별로 분류하고, 사례 별로 사용 방법을 자세한 절차로 서술해라. 서술 과정에서 authoring-kit skill을 이용해라. — 생성:유저 · 최종:ai · 갱신:2026-08-25
  - 짧은 제목: README 활용 사례별 재작성
  - 목적: README를 활용 사례별로 분류하고 사례마다 패키지 사용 절차를 authoring-kit 으로 서술한다
  - 이유: 지금 README에는 패키지별 활용법도, style guide 구현 사례와 그 방법도 없다
  - 목표: 처음 온 사람이 README만 보고 자기 사례에 맞는 패키지를 골라 style guide 까지 구현할 수 있다
  - 실행 문서: KANBAN/cards/KAN-045-PNT454.md (7/7 · 최근 08-25)
  - 계획 리포트: KANBAN/reports/KAN-045-PNT454.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-045-PNT454.review.md (승인 5/5 · 추가 의견 총 4 · 승인)
  - 원문:
    ```text
    README는 이 레포를 설명하기에 정보가 많이 부족하다. 이 프로젝트를 활용 사례 별로 분류하고, 사례 별로 사용 방법을 자세한 절차로 서술해라. 서술 과정에서 authoring-kit skill을 이용해라.
    - 패키지 별 활용 방법이 없다.
    - 패키지를 사용해서 style guide를 구현할 수 있다는 사례 자체가 소개되어 있지 않다.
    - style guide를 구현하기 위한 방법이 서술되어 있지 않다.
    ```
- `KAN-046-33S4G8` pnpm test:unit 을 CLAUDE.md 품질 게이트에 추가 — 매니페스트·대비·명명 게이트가 문서에 없다 — 생성:ai · 최종:ai · 갱신:2026-08-26
  - 짧은 제목: test:unit 게이트 문서화
  - 목적: CLAUDE.md 「품질 게이트 실행」 절에 pnpm test:unit 을 다섯 번째 명령으로 넣는다
  - 이유: 매니페스트 바이트 동기·대비 over-claim·명명 규칙·커버리지 census 가 전부 test:unit 에서만 도는데 CLAUDE.md 와 옛 README 둘 다 0회 등장했다
  - 목표: 네 명령만 초록인 상태로 올려 다른 사람이 test:unit 에서 처음 발견하는 일이 없어진다
  - 메모: KAN-045 검토 5번 판단 항목의 유저 의견('별도 카드로 발행해라')에서 분기. pnpm test 의 실체는 pnpm --filter storybook test 라 패키지 vitest 를 실행하지 않는다 — 근거 package.json:11, CLAUDE.md:32
  - 실행 문서: KANBAN/cards/KAN-046-33S4G8.md (4/4 · 최근 08-25)
  - 검토 문서: KANBAN/reviews/KAN-046-33S4G8.review.md (승인 7/7 · 추가 의견 총 4 · 승인)
  - 원문:
    ```text
    별도 카드로 발행해라
    ```
- `KAN-049-CWBPP6` 문서 정리 C — visualization 계열 통합 (PLAN · visualization-catalog 흡수 + SSOT 이동) — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: viz 계열 통합
  - 목적: viz 의 PLAN.md 와 visualization-catalog.md 를 흡수하면서 구현 스펙 SSOT 지위와 인바운드 링크를 함께 옮긴다
  - 이유: 두 문서가 본문에서 스스로 「흡수됨」을 선언했는데 type-inventory.md 가 아직 5곳에서 그것을 가리킨다
  - 목표: viz 문서 2건이 사라지고 type-inventory grep 결과가 0건이라 SSOT 체인이 끊기지 않는다
  - 메모: KAN-044 §13-C. 위험: visualization-catalog.md 는 참조 11건으로 통합 대상 중 최다 — 링크를 한 번에 다 고치지 않으면 SSOT 지목이 허공을 가리킨다. 완료 기준에 type-inventory grep 0건을 넣는다. work 4개 · KAN-047 넘김: packages/foundations/src/gateDocs.test.ts:38 주석의 packages/visualization/PLAN.md 항목도 지운다. scope 에 이 파일을 더하면 :37 을 고칠 B(KAN-048)와 겹친다
  - 실행 문서: KANBAN/cards/KAN-049-CWBPP6.md (4/4 · 최근 10-06)
  - 계획 리포트: KANBAN/reports/KAN-049-CWBPP6.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-049-CWBPP6.review.md (승인 2/2 · 추가 의견 총 7 · 승인)
- `KAN-047-TRYYRC` 문서 정리 A — 폐기 4건 집행 (RELEASE_PLAN · sample_design · storybook README · ORDER) — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: 폐기 4건 집행
  - 목적: KAN-044 가 폐기로 판정한 문서 4건을 실제로 지운다
  - 이유: 넷 다 참조가 0건이거나(3건) 참조원을 함께 고치면 되고(ORDER.md 1건), 목적이 소진된 1회성 문서다
  - 목표: 네 문서가 레포에서 사라지고 grep 결과 0건이라 참조 고아가 남지 않는다
  - 메모: KAN-044 §13-A. ORDER.md 는 검토 3번 반려(유저 「제거」)로 존치→폐기가 된 건이라 선행 수정이 하나 있다 — visualization-type-inventory.md:376 의 「ORDER.md 편집 금지」 문구. work 1~2개(4.7 인스턴트 예외 대상)
  - 실행 문서: KANBAN/cards/KAN-047-TRYYRC.md (2/2 · 최근 10-06)
  - 검토 문서: KANBAN/reviews/KAN-047-TRYYRC.review.md (승인 2/2 · 추가 의견 총 2 · 승인)
- `KAN-052-BYS4JN` Provider 외부 글꼴 선택화 — fonts prop + 글꼴별 1회 주입 (core·viz) — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: Provider 외부 글꼴 선택화
  - 목적: Provider 세 곳이 외부 CDN 글꼴을 무조건 불러오는 것을 끌 수 있게 하고, 겹쳐 쓸 때(core 안에 viz 포함) 글꼴마다 한 번만 불러오게 한다
  - 이유: 앱이 글꼴을 직접 호스팅하거나 CSP(외부 리소스 차단 정책)를 쓰면 지금은 외부 글꼴 요청을 막을 방법이 없다
  - 목표: fonts="none"이면 외부 글꼴 요청이 0건이고, 기본값을 쓰는 기존 화면은 그대로다
  - 메모: 외부 앱 소비 문제 대응 5장 중 2 · 근거는 카드 문서 「전략」
  - 실행 문서: KANBAN/cards/KAN-052-BYS4JN.md (4/4 · 최근 10-06)
  - 계획 리포트: KANBAN/reports/KAN-052-BYS4JN.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-052-BYS4JN.review.md (승인 1/1 · 추가 의견 총 1 · 승인)
  - 원문:
    ```text
    [첨부 이미지]
    bbangto-ui 컴포넌트를 지금 들여오면 생기는 문제
    - 워커가 시안의 화면 조각 42개를 나눴습니다. bbangto-ui에 이미 있는 것이 11개, 이 앱에서 만들 것이 22개, bbangto-ui에 요청할 것이 9개입니다.
    - 그런데 bbangto-ui core(1.1.2)는 들여오는 입구가 하나뿐입니다. Button 하나만 써도 약 420KB가 번들에 들어갑니다. 지금 웹 앱 전체가 375KB이니 앱이 두 배 넘게 커집니다.
    - 원인은 bbangto-ui 빌드에 있습니다. forwardRef 127곳에 「안 쓰면 버려도 된다」는 표시(__PURE__)가 없습니다. 이 두 가지는 제가 설치된 파일에서 직접 확인했습니다. 워커가 이 표시를 붙인 사본으로 다시 빌드하자 Button이 25KB로 줄었다고 보고했고, 이 재빌드는 제가 다시 해 보지 않았습니다.
    - 번들 말고도 문제가 있다고 워커가 보고했습니다(제가 직접 확인하지는 않았습니다).
      - Provider가 외부 글꼴을 늘 불러옵니다.
      - Drawer에 Esc 닫기와 포커스 처리가 없습니다.
      - Tabs·Select의 키보드 조작이 빠져 있습니다.
    
    이 문제를 해결하기 위한 전략을 수립, 실행 계획 수립, 칸반 카드화 해라.
    ```
- `KAN-048-R2KW3G` 문서 정리 B — core 카탈로그 계열 통합 (audit 44→1 · 일회성 계획 3종 흡수) — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: core 카탈로그 통합
  - 목적: core 의 audit 44개를 한 파일로 접고 목적이 소진된 계획 문서 3종을 COMPONENT_CATALOG·style-guide-catalog 로 흡수한다
  - 이유: audit 44개는 파일 단위 참조 0건인 1회성 증빙이고 ASSET_INTEGRATION_PLAN·WAVE0_REPORT 는 Wave 전량 DONE 으로 실행 결과가 이미 레지스트리에 있다
  - 목표: md 47개가 사라지고 1개가 생겨 46개가 줄고, COMPONENT_CATALOG 의 실측 결함 2건이 함께 고쳐진다
  - 메모: KAN-044 §13-B. 위험: packages/core/style-guide-catalog.md 38–92줄은 자동 생성 구간이라 이동·개명·삭제하면 trendTable.test.ts 가 readFileSync 에서 red 가 된다 — 출처 절만 손댄다. D 의 선행(직렬 중재). work 4개 · KAN-047 넘김: packages/foundations/src/gateDocs.test.ts 도 고친다 — :37 주석의 ASSET_INTEGRATION_PLAN.md 항목, :44–45 ALLOWLIST 의 WAVE0_REPORT.md(지우면 발화 안 하는 항목이 되고 :144 fixture 테스트도 함께 손봐야 한다). scope 에 이 파일을 더하면 :38 을 고칠 C(KAN-049)와 겹친다
  - 실행 문서: KANBAN/cards/KAN-048-R2KW3G.md (4/4 · 최근 10-06)
  - 계획 리포트: KANBAN/reports/KAN-048-R2KW3G.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-048-R2KW3G.review.md (승인 2/2 · 추가 의견 총 2 · 승인)
- `KAN-053-TZ86NN` Drawer·Tabs·Select 키보드·포커스 지원 — Modal에서 공용 훅 추출 — 생성:ai · 최종:ai · 갱신:2026-10-06
  - 짧은 제목: Drawer·Tabs·Select 키보드 지원
  - 목적: Modal의 포커스 처리를 공용 훅으로 빼고 Drawer·Tabs·Select에 WAI-ARIA APG 키보드 동작을 넣는다
  - 이유: 외부 앱이 들여올 세 컴포넌트를 키보드로 쓸 수 없고, Select는 Tab으로 닿지도 않는다
  - 목표: 세 컴포넌트의 키보드·포커스 동작이 실제 chromium 위 play 테스트로 확인된다
  - 메모: 외부 앱 소비 문제 대응 5장 중 3 · KAN-054의 선행
  - 실행 문서: KANBAN/cards/KAN-053-TZ86NN.md (4/4 · 최근 10-06)
  - 계획 리포트: KANBAN/reports/KAN-053-TZ86NN.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-053-TZ86NN.review.md (승인 5/5 · 추가 의견 총 5 · 승인)
  - 원문:
    ```text
    [첨부 이미지]
    bbangto-ui 컴포넌트를 지금 들여오면 생기는 문제
    - 워커가 시안의 화면 조각 42개를 나눴습니다. bbangto-ui에 이미 있는 것이 11개, 이 앱에서 만들 것이 22개, bbangto-ui에 요청할 것이 9개입니다.
    - 그런데 bbangto-ui core(1.1.2)는 들여오는 입구가 하나뿐입니다. Button 하나만 써도 약 420KB가 번들에 들어갑니다. 지금 웹 앱 전체가 375KB이니 앱이 두 배 넘게 커집니다.
    - 원인은 bbangto-ui 빌드에 있습니다. forwardRef 127곳에 「안 쓰면 버려도 된다」는 표시(__PURE__)가 없습니다. 이 두 가지는 제가 설치된 파일에서 직접 확인했습니다. 워커가 이 표시를 붙인 사본으로 다시 빌드하자 Button이 25KB로 줄었다고 보고했고, 이 재빌드는 제가 다시 해 보지 않았습니다.
    - 번들 말고도 문제가 있다고 워커가 보고했습니다(제가 직접 확인하지는 않았습니다).
      - Provider가 외부 글꼴을 늘 불러옵니다.
      - Drawer에 Esc 닫기와 포커스 처리가 없습니다.
      - Tabs·Select의 키보드 조작이 빠져 있습니다.
    
    이 문제를 해결하기 위한 전략을 수립, 실행 계획 수립, 칸반 카드화 해라.
    ```
- `KAN-050-AJSQAY` 문서 정리 D — 규율 문서 실측 정합 (theme-* 부재 · 모션 5중 기재) — 생성:ai · 최종:ai · 갱신:2026-10-07
  - 짧은 제목: 규율 문서 실측 정합
  - 목적: CLAUDE.md·QUALITY_CHECKLIST·DESIGN_SYSTEM_GUIDE 의 실측 어긋남을 고치고 5곳에 흩어진 모션 워크플로 기재를 하나로 모은다
  - 이유: packages/theme-* 4종이 실재하지 않는데 세 규율 문서가 그것을 구조도와 경로로 가리키고 있다
  - 목표: 규율 문서가 실제 레포 구조와 일치하고 모션 워크플로가 한 곳에만 적힌다
  - 메모: KAN-044 §13-D. 2026-10-07 전략 재수립(선행 KAN-048 완료) — 전수 grep 으로 scope 3파일 추가(COMPONENT_CATALOG·Overview.mdx·types.ts), motion-catalog:27 은 KAN-051 앞뒤 모두 참인 문장으로 고쳐 순서 의존을 없앤다. 상세는 카드 문서 「전략」
  - 실행 문서: KANBAN/cards/KAN-050-AJSQAY.md (4/4 · 최근 10-07)
  - 계획 리포트: KANBAN/reports/KAN-050-AJSQAY.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-050-AJSQAY.review.md (승인 3/3 · 추가 의견 총 3 · 승인)
- `KAN-051-5HMYKT` 번들 트리 셰이킹 복구 — 파일 단위 출력 + 크기 상한 게이트 (core·viz·sgc·vsgc) — 생성:ai · 최종:ai · 갱신:2026-10-07
  - 짧은 제목: 번들 트리 셰이킹 복구
  - 목적: core·visualization·style-guide-catalog·viz-style-guide-catalog를 하나만 가져와도 전부 딸려 오지 않게 빌드 출력을 파일 단위로 바꾸고 크기 상한 게이트를 건다
  - 이유: Button 하나만 써도 core 320KB가 번들에 들어가 외부 앱(375KB)이 두 배 가까이 커진다
  - 목표: dist 기준 core Button 단독이 7KB 이하이고, 상한을 넘으면 test:unit이 빨강이 된다
  - 메모: 외부 앱 소비 문제 대응 5장 중 1 · 근거와 측정값은 카드 문서 「전략」
  - 실행 문서: KANBAN/cards/KAN-051-5HMYKT.md (4/4 · 최근 10-07)
  - 계획 리포트: KANBAN/reports/KAN-051-5HMYKT.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-051-5HMYKT.review.md (승인 4/4 · 추가 의견 총 2 · 승인)
  - 원문:
    ```text
    [첨부 이미지]
    bbangto-ui 컴포넌트를 지금 들여오면 생기는 문제
    - 워커가 시안의 화면 조각 42개를 나눴습니다. bbangto-ui에 이미 있는 것이 11개, 이 앱에서 만들 것이 22개, bbangto-ui에 요청할 것이 9개입니다.
    - 그런데 bbangto-ui core(1.1.2)는 들여오는 입구가 하나뿐입니다. Button 하나만 써도 약 420KB가 번들에 들어갑니다. 지금 웹 앱 전체가 375KB이니 앱이 두 배 넘게 커집니다.
    - 원인은 bbangto-ui 빌드에 있습니다. forwardRef 127곳에 「안 쓰면 버려도 된다」는 표시(__PURE__)가 없습니다. 이 두 가지는 제가 설치된 파일에서 직접 확인했습니다. 워커가 이 표시를 붙인 사본으로 다시 빌드하자 Button이 25KB로 줄었다고 보고했고, 이 재빌드는 제가 다시 해 보지 않았습니다.
    - 번들 말고도 문제가 있다고 워커가 보고했습니다(제가 직접 확인하지는 않았습니다).
      - Provider가 외부 글꼴을 늘 불러옵니다.
      - Drawer에 Esc 닫기와 포커스 처리가 없습니다.
      - Tabs·Select의 키보드 조작이 빠져 있습니다.
    
    이 문제를 해결하기 위한 전략을 수립, 실행 계획 수립, 칸반 카드화 해라.
    ```
- `KAN-054-M48FNQ` 나머지 컴포넌트 키보드·포커스 일괄 + 키보드 커버리지 게이트 — 생성:ai · 최종:ai · 갱신:2026-10-07
  - 짧은 제목: 나머지 키보드 일괄 + 커버리지 게이트
  - 목적: 나머지 11곳의 키보드·포커스 결함을 고치고, 상호작용 컴포넌트마다 키보드 테스트가 있는지 test:unit이 검사하게 한다
  - 이유: 같은 결함이 11곳에 더 있어서 보고된 세 곳만 고치면 같은 문제가 다시 나온다
  - 목표: keyboard-coverage.json에 오른 모든 상호작용 컴포넌트에 키보드 play 테스트가 있고, 빠지면 test:unit이 빨강이 된다
  - 메모: 외부 앱 소비 문제 대응 5장 중 4 · KAN-053 뒤에 직렬 · KAN-053 넘김: onKeyDown 합성 규칙 통일(Tabs↔Modal·Drawer) + 실제 키 입력 게이트 — 전략 「KAN-053에서 넘어온 것」
  - 실행 문서: KANBAN/cards/KAN-054-M48FNQ.md (11/11 · 최근 10-07)
  - 계획 리포트: KANBAN/reports/KAN-054-M48FNQ.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-054-M48FNQ.review.md (승인 6/6 · 추가 의견 총 13 · 승인)
  - 원문:
    ```text
    [첨부 이미지]
    bbangto-ui 컴포넌트를 지금 들여오면 생기는 문제
    - 워커가 시안의 화면 조각 42개를 나눴습니다. bbangto-ui에 이미 있는 것이 11개, 이 앱에서 만들 것이 22개, bbangto-ui에 요청할 것이 9개입니다.
    - 그런데 bbangto-ui core(1.1.2)는 들여오는 입구가 하나뿐입니다. Button 하나만 써도 약 420KB가 번들에 들어갑니다. 지금 웹 앱 전체가 375KB이니 앱이 두 배 넘게 커집니다.
    - 원인은 bbangto-ui 빌드에 있습니다. forwardRef 127곳에 「안 쓰면 버려도 된다」는 표시(__PURE__)가 없습니다. 이 두 가지는 제가 설치된 파일에서 직접 확인했습니다. 워커가 이 표시를 붙인 사본으로 다시 빌드하자 Button이 25KB로 줄었다고 보고했고, 이 재빌드는 제가 다시 해 보지 않았습니다.
    - 번들 말고도 문제가 있다고 워커가 보고했습니다(제가 직접 확인하지는 않았습니다).
      - Provider가 외부 글꼴을 늘 불러옵니다.
      - Drawer에 Esc 닫기와 포커스 처리가 없습니다.
      - Tabs·Select의 키보드 조작이 빠져 있습니다.
    
    이 문제를 해결하기 위한 전략을 수립, 실행 계획 수립, 칸반 카드화 해라.
    ```
- `KAN-058-G883EJ` style-guide-catalog Showcase 생성 카피 분할 — Showcase 하나가 51개 몫 카피를 끌고 오는 문제 — 생성:ai · 최종:ai · 갱신:2026-10-07
  - 짧은 제목: Showcase 카피 분할
  - 목적: 생성 카피 파일(_showcaseCopy.generated.ts)을 Showcase별로 나눠 Showcase 하나만 가져오면 그 카피만 딸려 오게 한다
  - 이유: KAN-051 뒤에도 Showcase 하나가 약 101KB이고 그중 76,517B가 Showcase 51개가 함께 쓰는 생성 카피 파일 하나에서 온다
  - 목표: Showcase 하나를 가져온 번들에 그 Showcase 카피만 들어가고, bundle-budget.json 의 sgc 대표 상한을 새 실측으로 낮춘다
  - 메모: KAN-051 검토 4항(2026-10-07 승인)에서 나온 후속 · 근거는 KANBAN/cards/KAN-051-5HMYKT.md 「전략」의 범위 밖 절
  - 실행 문서: KANBAN/cards/KAN-058-G883EJ.md (4/4 · 최근 10-07)
  - 계획 리포트: KANBAN/reports/KAN-058-G883EJ.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-058-G883EJ.review.md (승인 2/2 · 추가 의견 총 2 · 승인)
- `KAN-059-62EAKB` core 키보드 포커스 표시 통일 — :focus-visible 테두리를 모든 상호작용 컴포넌트에 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: 포커스 표시 통일
  - 목적: 브라우저 기본 테두리를 끈 core 컴포넌트(components 13개·blocks 1개)에 키보드 포커스일 때만 보이는 테두리를 한 규칙으로 단다
  - 이유: Button 등은 키보드로 포커스해도 화면에 아무 표시가 없어 키보드 사용자가 자기 위치를 모른다(KAN-054 검토 §3-6)
  - 목표: 키보드로 닿는 core 컴포넌트마다 포커스 표시가 보이고, 빠지면 테스트가 빨강이 된다
  - 메모: KAN-054 검토 §3-6(2026-10-07 유저가 추천대로 재작업 선택)에서 나온 후속 · KAN-054는 Card·Calendar 날짜 칸·DatePicker 트리거 셋만 a11y/focusRing.ts 로 고쳤다 — 이 카드가 나머지를 같은 규칙으로
  - 실행 문서: KANBAN/cards/KAN-059-62EAKB.md (6/6 · 최근 10-07)
  - 계획 리포트: KANBAN/reports/KAN-059-62EAKB.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-059-62EAKB.review.md (승인 4/4 · 추가 의견 총 4 · 승인)
- `KAN-056-D3V1MB` viz 템플릿 13개 리터럴 색 제거 — 스타일 가이드가 기본 채움·선 색까지 칠하게 — 생성:ai · 최종:ai · 갱신:2026-10-08
  - 짧은 제목: 템플릿 리터럴 색 제거
  - 목적: 템플릿 13개가 넣는 불투명 기본 채움·선 색을 계약 토큰으로 바꿔 스타일 가이드가 그 부분까지 칠하게 한다
  - 이유: 기본값이 인라인 style 로 렌더돼 스타일 가이드를 바꿔도 그 색이 그대로다 — 구 PLAN 「이연」이 끝나지 않은 채 남았다(KAN-049 에서 발견)
  - 목표: 13개 템플릿에 불투명 리터럴 색이 0건이 되고 viz README 「알려진 한계」의 해당 항목이 지워진다
  - 메모: 목록과 셈 기준은 packages/visualization/README.md 「알려진 한계」. 반투명 검정 음영(Node cube 면·IsoPrism·IsometricScene 바닥 그림자·Lane)은 paint 무관 장치라 대상이 아니다
  - 실행 문서: KANBAN/cards/KAN-056-D3V1MB.md (4/4 · 최근 10-08)
  - 계획 리포트: KANBAN/reports/KAN-056-D3V1MB.report.html (낡음)
  - 검토 문서: KANBAN/reviews/KAN-056-D3V1MB.review.md (승인 6/6 · 추가 의견 총 14 · 승인)
  - 원문:
    ```text
    만들어 (앞 답변 「앞서 여쭌 백로그 카드 두 가지(리터럴 색이 남은 템플릿 13개, 읽히지 않는 `edge.dashPattern` 토큰)는 아직 만들지 않았습니다.」에 대한 답)
    ```
