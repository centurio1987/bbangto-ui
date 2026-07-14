# Visualization Type Inventory — infographic·diagram 유형 전수 목록 (SSOT 백로그)

인포그래픽·다이어그램 **유형(what)** 을 내부 자산 + 외부 공인 분류체계에서 수집해,
기존 구현(템플릿/패턴)과 전수 교차 매핑한 단일 인벤토리다. 향후 ORDER의 **진짜 백로그**
역할을 하며, `packages/core/motion-catalog.md`의 레지스트리 규약을 미러링한다.

---

## 1. Scope model

- 이 문서는 **유형(what) 축만** 다룬다. 한 유형은 모든 스타일 가이드로 리스킨 가능하다(유형 ⊥ 스타일).
- **스타일(paint) 축 SSOT**: `visualization-catalog.md` §4 + `style-classification.md` (F1~F7 패밀리) — 이 문서에 복제 금지.
- **구현 스펙 SSOT**: `PLAN.md` (아키텍처·§D 구현 노트) — 이 문서는 무엇이 있고/없고/우선인지만 말한다.
- 88장 레퍼런스 이미지는 재분석하지 않는다 — `visualization-catalog.md`의 기존 해석(§1/§2)만 흡수하며, 레퍼런스 유래 갭에는 해당 섹션 표기를 남긴다.
- 구조 **프리미티브**(node/edge/lane/axis/radial/grid/area/tree/band/leader/mockup/geo/icon-unit)는 Registry 행이 아니라 행의 속성 필드다. catalog §1-c의 원자 갭은 §8-b에 프리미티브 수준으로만 기록한다.

## 2. Collection metadata

- 수집일: 2026-07-13 (외부 소스 접근일 동일). 레퍼런스 88장 자체 수집일은 2026-07-11(`diagram-references/README.md`).
- 규모: Registry 본체 **90행** (목표 70~90 내) + Appendix 후보 풀 약 50항목.
- 웹 조사: 3워커 팬아웃(다이어그램 표준 / 데이터 차트 / 인포그래픽·개념 프레임워크) 정상 수행 — 폴백 미사용.

### 2-a. 내부 소스

| 소스 | 추출 내용 |
|---|---|
| `src/templates/index.ts` | 구현 템플릿 컴포넌트 export **25종** (권위 목록) |
| `src/patterns/index.ts` | 구현 패턴 **6종** |
| `visualization-catalog.md` §1-a/§1-b/§1-c/§2/§2-a | 커버 유형 + 템플릿 갭 9항목 + 원자 갭 + 이연 패턴 7항목 |
| `PLAN.md` §D (G1~G6) | 마스터 타입 리스트 — G5 차트 9종·G6 메타 프레임 2종 미구현 |
| `diagram-references/README.md` | 유형 축 vs 스타일 축 분리 근거 |

### 2-b. 외부 소스 (전 항목 접근일 2026-07-13)

| ID | 티어 | 소스 | canonical URL | 비고 |
|---|---|---|---|---|
| X01 | T1 | OMG UML 2.5.1 (구조 7 + 행위 7) | https://www.omg.org/spec/UML/2.5.1 | |
| X02 | T1 | C4 model (핵심 4레벨 + 보조 3종) | https://c4model.com/ | |
| X03 | T1 | ArchiMate 3.2 viewpoints | https://pubs.opengroup.org/architecture/archimate3-doc/ch-Example-Viewpoints.html | SSO 게이트 — 2차(Visual Paradigm 가이드) 교차 검증 |
| X04 | T1 | OMG BPMN 2.0.2 | https://www.omg.org/spec/BPMN/2.0.2 | |
| X05 | T1 | OMG DMN 1.5 | https://www.omg.org/spec/DMN | |
| X06 | T1 | Mermaid 지원 다이어그램 (intro 기준 30종) | https://mermaid.js.org/intro/ | |
| X07 | T1 | PlantUML (UML 9 + 비UML 18) | https://plantuml.com/ | |
| X08 | T1 | D2 (특수 객체 방식) | https://d2lang.com/tour/layouts/ | |
| X09 | T2 | FT Visual Vocabulary (9범주) | https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary | |
| X10 | T2 | Datawrapper 차트 카탈로그 (24종) | https://developer.datawrapper.de/docs/chart-types | |
| X11 | T2 | Periodic Table of Visualization Methods | https://www.visual-literacy.org/periodic_table/periodic_table.pdf | |
| X12 | T2 | NN/g (journey map, mind/concept map) | https://www.nngroup.com/articles/journey-mapping-101/ | |
| X13 | T2 | 개념 프레임워크 1차·권위 소스 묶음 | https://asq.org/quality-resources/fishbone | Strategyzer(BMC)·untools(iceberg)·Jim Collins(flywheel)·UXPin(honeycomb)·Wikipedia(SWOT/AIDA/Venn)·Rohde(sketchnote)·IEEE 8564193(scrollytelling) |
| X14 | T3 | 업계 인포그래픽 분류 (Venngage 9·Visme 13·Wix) | https://venngage.com/blog/9-types-of-infographic-template/ | Piktochart 403 — 스니펫만 |
| X15 | T3 | Visual Frameworks (100+ 패턴) | https://visualframeworks.com/ | |
| X16 | T3 | Bento grid (Banani·SaaSFrame 교차) | https://www.banani.co/definitions/bento-grid | |
| X17 | T3 | Azure Well-Architected 다이어그램 유형 가이드 | https://learn.microsoft.com/en-us/azure/well-architected/architect-role/design-diagrams | 클라우드 관례 중 가장 체계적 |
| X18 | T2 | Data Viz Project (규모 확인만) | https://datavizproject.com/ | 본 사이트 403 — 160+ 유형·4축 분류만 2차 확인, 개별 유형 미인용 |

## 3. Status legend

| 상태 | 판정 기준 |
|---|---|
| ✅ 구현 | 매핑 칸의 코드 export(템플릿/패턴)가 해당 유형을 직접 렌더 |
| 🔶 부분 | **기존 export 2개 이하 조합 + 스타일 조정만으로 근사 가능** — 어떤 조합인지 매핑 칸에 명기 |
| 📋 백로그 | 미구현, §4 채택 기준 통과 |
| ⛔ 범위 외 | 채택 기준 미달 — 사유 필수: `중복병합` / `제품범위외` / `프리미티브수준` |

매핑 칸 표기: `Export명`(template) / `Export명`(pattern) — 코드 식별자 원문 그대로(한글 금지). 📋 행은 제안 위계를 `(→template)` / `(→pattern)`으로 표기.

## 4. Curation criteria + 우선순위 룰

**채택(Registry 등재)**:
- Tier 1(사양/표준) 유형은 원칙 전부 등재. 예외: 메타모델·도구 전용(UML Profile, PlantUML Salt/Ditaa 등)은 후보 풀로.
- Tier 2(권위 분류)는 대표 유형만 — 희귀·장식 변형은 후보 풀.
- Tier 3(업계 관례)는 **2개 이상 소스 교차 검증** 시에만 등재, 아니면 후보 풀.

**병합(동일 유형 판정)**: 구조 프리미티브 조합과 데이터 형태(계층/네트워크/시계열/비율/흐름/비교)가 **모두 같으면** 대표명 1행 + aliases 흡수 (예: org chart → Hierarchy, donut → Pie). 사양이 별도 표기를 요구하면 개별 행 유지 + `related:` 태그 (예: UML Activity ↔ Flowchart). UML 상호작용 4종(Sequence·Communication·Interaction Overview·Timing)은 사양상 동일 Interaction 모델의 투영이므로 Sequence 1행에 흡수.

**우선순위**:
- **P1**: 내부 갭 리스트(catalog §1-b/§2-a, PLAN §D G5)에 등재 **또는** 88장 레퍼런스 분석(catalog §1/§2)에서 관찰된 유형
- **P2**: Tier 1~2 소스 등재 + 기존 프리미티브 재사용으로 구현 가능
- **P3**: 신규 프리미티브 필요 또는 Tier 3 단독 계열
- ✅ 행은 `—`

**ID 규칙**: 카테고리별 대역 고정(A=`VT-1xx` … G=`VT-7xx`), 대역 내 일련번호는 **추가 순 append-only**. 재정렬·재번호 금지. 병합 시 흡수된 ID는 삭제하지 않고 §8-c Deprecated ID 표에 `→ 대상 ID` 튜플로 보존.

## 5. Registry (본체 90행)

열: ID · 이름 · aliases · 한 줄 정의 · 대표 용도 · 프리미티브 · 소스(티어) · 상태 · 매핑(export·위계) · tags · P

### A. 엔지니어링/소프트웨어 다이어그램 — `VT-1xx` (29행)

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-101 | UML Class Diagram | object diagram, C4 code-level class | 클래스·속성·연산과 관계 구조 | 도메인/코드 모델 | node,edge,tree | X01(T1) | ✅ | `ClassDiagram`(template) | related:VT-112 | — |
| VT-102 | UML Package Diagram | — | 패키지 그룹화와 의존 관계 | 모듈 구조 관리 | node,edge,boundary | X01(T1) | 📋 | (→template) | — | P3 |
| VT-103 | UML Component Diagram | composite structure diagram | 컴포넌트·인터페이스 배선 | 모듈 아키텍처 | node,edge,port | X01(T1) | ✅ | `UMLComponentDiagram`(template) | — | — |
| VT-104 | UML Deployment Diagram | C4 deployment | 아티팩트의 실행 노드 배치 | 인프라·배포 구성 | node,edge,boundary | X01(T1) | ✅ | `UMLDeploymentDiagram`(template) | — | — |
| VT-105 | UML Use Case Diagram | usecase | 액터-유스케이스 기능 관계 | 요구 범위 정의 | node,edge,boundary | X01(T1) | 📋 | (→template) | — | P2 |
| VT-106 | UML Activity Diagram | swimlane diagram, activity | 제어 흐름·병행·레인 절차 모델 | 업무 절차/알고리즘 | node,edge,lane | X01(T1) | 🔶 | `Flowchart`+`BPMNDiagram`(Lane) 근사 | related:VT-201 | P2 |
| VT-107 | UML State Machine | statechart, stateDiagram-v2 | 상태·이벤트 전이 모델 | 수명주기/프로토콜 | node,edge | X01(T1) | ✅ | `StateDiagram`(template) | — | — |
| VT-108 | UML Sequence Diagram | communication, interaction overview, timing, ZenUML | 수명선 간 시간순 메시지 교환 | API·시나리오 설계 | lifeline,edge,lane | X01(T1) | ✅ | `SequenceDiagram`·`UMLSequenceDiagram`·`ZenUMLDiagram`(template) | UML 상호작용 4종 투영 흡수 | — |
| VT-109 | C4 System Context | context diagram | 시스템 블랙박스와 외부 관계 | 범위 합의 | node,edge,boundary | X02(T1) | ✅ | `C4ContextDiagram`(template) | — | — |
| VT-110 | C4 Container | — | 배포 단위(앱·DB)와 기술 구성 | 기술 스택 개관 | node,edge,boundary | X02(T1) | ✅ | `C4ContainerDiagram`(template) | — | — |
| VT-111 | C4 Component | — | 컨테이너 내부 컴포넌트 책임 | 상세 설계 진입 | node,edge,boundary | X02(T1) | ✅ | `C4ComponentDiagram`(template) | — | — |
| VT-112 | C4 Code | — | 코드 수준 요소 구조(≈클래스도) | 구현 구조 | node,edge | X02(T1) | ✅ | `C4CodeDiagram`(template) | related:VT-101 | — |
| VT-113 | C4 Dynamic | — | C4 요소 간 순서 있는 협력 | 유스케이스 런타임 | node,edge(순번) | X02(T1) | 📋 | (→template) | — | P2 |
| VT-114 | C4 System Landscape | — | 다중 시스템 전경도 | 전사 시스템 지도 | node,edge,boundary | X02(T1) | 📋 | (→template) | — | P2 |
| VT-115 | Cloud Architecture Diagram | AWS/Azure/GCP diagram, architecture-beta | 클라우드 서비스 구성도 | 클라우드 설계 소통 | node,edge,boundary,icon | X06(T1)·X17(T3) | ✅ | `ArchitectureDiagram`(template) | 중립 아이콘만(브랜드 배제) | — |
| VT-116 | Block Diagram | block-beta, functional block | 기능 블록과 연결 구조 | 기능 분해 | node,edge,grid | X06(T1) | ✅ | `BlockDiagram`(template) | — | — |
| VT-117 | ER Diagram | erDiagram, IE notation, ERD | 엔터티·관계·카디널리티 모델 | DB 스키마 설계 | node(table),edge(crow's-foot) | X01·X06(T1) | ✅ | `ERDiagram`(template) | — | — |
| VT-118 | Requirement Diagram | requirementDiagram(SysML) | 요구-검증-충족 관계 모델 | 요구 추적성 | node,edge | X06(T1) | ✅ | `RequirementDiagram`(template) | — | — |
| VT-119 | SysML Block Definition | BDD | «block» 정의·조성 구조 | 시스템 엔지니어링 | node,edge,tree | X01(T1) | ✅ | `SysMLBlockDiagram`(template) | — | — |
| VT-120 | ArchiMate Layered View | layered viewpoint | 비즈니스~기술 계층 통합 EA 뷰 | 전사 아키텍처 | node,edge,lane(레이어밴드) | X03(T1) | ✅ | `ArchiMateDiagram`·`ArchiMateBusinessDiagram`·`ArchiMateApplicationDiagram`·`ArchiMateTechnologyDiagram`(template) | — | — |
| VT-121 | ArchiMate 확장 viewpoints | motivation, strategy/capability map, implementation & migration | 동기·전략·이행 관점 EA 뷰 묶음 | 목표 정렬/전환 계획 | node,edge,boundary | X03(T1) | 📋 | (→template) | 세부 23종은 후보 풀 | P3 |
| VT-122 | BPMN Process Diagram | orchestration, private process | 단일 참여자 업무 절차 모델 | 프로세스 자동화 | node,edge,lane | X04(T1) | ✅ | `BPMNDiagram`(template) | — | — |
| VT-123 | BPMN Collaboration | choreography, conversation | 풀 간 메시지 교환 모델 | 조직 간 협업 | node,edge,lane(pool) | X04(T1) | 🔶 | `BPMNDiagram`(Lane/pool 조합) 근사 | — | P3 |
| VT-124 | DMN Decision Requirements | DRD, DRG | 의사결정-입력-지식 요구 관계 | 비즈니스 룰 | node,edge | X05(T1) | 📋 | (→template) | — | P3 |
| VT-125 | Network Topology | nwdiag, network diagram | 네트워크 세그먼트·장비 토폴로지 | 망 구성/보안 경계 | node,edge,lane(세그먼트),icon | X07(T1)·X17(T3)·catalog §1-b(내부) | 📋 | (→template) | 존/방화벽/서버 시맨틱 | P1 |
| VT-126 | Data-Flow Diagram | DFD, threat-model DFD | 데이터 이동·변환·저장 흐름 | 위협 모델링 | node,edge,boundary | X17(T3) | 📋 | (→template) | related:VT-127 | P2 |
| VT-127 | Data Lineage | 확장 노드카드 lineage | 데이터 계보·파이프라인 추적 | 데이터 엔지니어링 | node(card),edge(named) | catalog §1-b(내부) | 📋 | (→template) | DetailCard/Sparkline 필요 | P1 |
| VT-128 | Packet Diagram | packet(Mermaid) | 프로토콜 패킷 비트 필드 배치 | 프로토콜 문서화 | grid,axis | X06(T1)·PLAN §D G5(내부) | ✅ | `PacketDiagram`(template) | — | — |
| VT-129 | Git Graph | gitGraph | 브랜치·커밋·머지 이력 | Git 전략 설명 | node,edge,lane,axis | X06(T1)·PLAN §D G5(내부) | ✅ | `GitGraph`(template) | tags:time·직선 merge | — |

### B. 프로세스·플로우 — `VT-2xx` (8행)

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-201 | Flowchart | graph, decision flowchart(퀴즈형 인포그래픽) | 노드·간선 절차와 분기 | 범용 프로세스 도식 | node,edge | X06(T1)·X14(T3) | ✅ | `Flowchart`(template) | related:VT-106 | — |
| VT-202 | Process Steps | process infographic, how-to, step-by-step | 순차 스텝 체인(배지+커넥터) | 튜토리얼/워크플로 | node,leader,grid | catalog §2(내부)·X14(T3) | ✅ | `ProcessSteps`(pattern) | — | — |
| VT-203 | Cycle | cycle diagram, loop, RADIALS | 순환 폐쇄 링/오빗 프로세스 | 반복 프로세스 | radial,edge | catalog §2(내부)·X11(T2) | ✅ | `Cycle`(pattern) | related:VT-708 | — |
| VT-204 | Kanban Board | kanban(Mermaid) | 상태 컬럼별 카드 보드 | 작업 흐름 관리 | lane,node(card) | X06(T1) | ✅ | `KanbanBoard`(template) | — | — |
| VT-205 | User Journey Map | journey(Mermaid), customer journey map | 여정 단계+만족도/감정 곡선 | UX 리서치 | lane,axis,node | X06(T1)·X12(T2)·PLAN §D G5(내부) | ✅ | `UserJourneyMap`(template) | — | — |
| VT-206 | Screen Flow | wireflow, user-flow with mockups | 화면 목업 노드 간 이동 흐름 | 화면 설계 소통 | node(mockup),edge | catalog §1-b(내부)·X17(T3) | 📋 | (→template) | MockupNode 필요 | P1 |
| VT-207 | Funnel | sales/marketing funnel, AIDA | 단계 축소형 전환 구조 | 전환 분석 | area(사다리꼴 스택) | X13(T2) | 📋 | (→pattern) | related:VT-701 | P2 |
| VT-208 | Pathways | 여정형 경로 인포그래픽, tube-map style route | 경로/노선 위 이정표 배열 | 커리큘럼/여정 안내 | edge(path),node,leader | catalog §2-a(내부) | ✅ | `Pathways`(pattern) | — | — |

### C. 계층·관계 — `VT-3xx` (7행)

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-301 | Mindmap | mind map, Buzan map, radial map | 중심 주제 방사형 위계 확장 | 브레인스토밍 | radial,tree,edge | X06(T1)·X12(T2) | ✅ | `Mindmap`(template) | related:VT-302 | — |
| VT-302 | Concept Map | Novak map, knowledge map | 라벨 붙은 연결선의 개념 관계망 | 지식 구조화 | node,edge(labeled) | X12(T2) | 🔶 | `Mindmap`+EdgeLabel 근사 | — | P2 |
| VT-303 | Hierarchy / Tree | org chart, tree diagram, TreeView, hierarchical infographic | 루트-자식 재귀 트리 | 조직/분류 구조 | tree,node,edge | catalog §2(내부)·X06(T1)·X14(T3) | ✅ | `Hierarchy`(pattern) | pyramid 모드는 VT-701 | — |
| VT-304 | Sitemap Tree | IA tree, sitemap | 사이트 IA 전용 트리(elbow) | 정보 구조 설계 | tree,edge(elbow) | catalog §1-b(내부) | 📋 | (→template) | — | P1 |
| VT-305 | Network Graph | node-link, force graph, semantic network, 방사형 노드링크 | 노드·엣지 관계망(비계층) | 관계 분석 | node,edge,radial | X09(T2)·catalog §2-a(내부) | 📋 | (→template) | — | P1 |
| VT-306 | Venn Diagram | Euler diagram, set diagram | 집합 겹침 원 교차 | 교집합/개념 비교 | area(원 교차) | X09·X11·X13(T2)·catalog §1-b(내부) | ✅ | `Venn`(pattern) | tags:chart,framework | — |
| VT-307 | Work Breakdown Structure | WBS | 산출물 중심 작업 분해 트리 | 범위 분해 | tree,node | X07(T1) | 🔶 | `Hierarchy`(tree) 근사 | — | P3 |

### D. 시간축 — `VT-4xx` (5행)

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-401 | Timeline | chronology, Priestley timeline, timeline infographic | 사건의 시간순 나열 | 연혁/사건 전개 | axis,node | X06(T1)·X09(T2)·X14(T3) | ✅ | `TimelineDiagram`(template) | — | — |
| VT-402 | Timeline Roadmap | product roadmap, milestones | 마일스톤·기간 로드맵(chevron) | 제품 계획 공유 | axis,node(marker) | catalog §2(내부)·X14(T3) | ✅ | `TimelineRoadmap`(pattern) | — | — |
| VT-403 | Gantt Chart | gantt, project schedule | 작업·기간 시간축 막대 일정 | 일정 관리 | axis,band,lane | X06·X07(T1)·PLAN §D G5(내부) | ✅ | `GanttChart`(template) | tags:chart | — |
| VT-404 | User Journey Gantt | journey pill + 날짜축 | 여정 pill과 날짜축 결합 | 여정 일정화 | axis,band,node(pill) | catalog §1-b(내부) | ✅ | `UserJourneyGantt`(template) | — | — |
| VT-405 | Radial / Spiral Phase | 원형·스파이럴 단계도 | 나선/원주 위 단계 배열 | 장기 phase 표현 | radial,axis | catalog §1-b(내부) | ✅ | `Cycle`(spiral 모드) | — | — |

### E. 데이터 차트 — `VT-5xx` (20행) — 최대 갭 영역

catalog §1-b·§2-a의 "ChartPrimitives(bar/line/pie/donut/treemap…)"와 PLAN §D G5(XYChart 포함)는 이 대역 전체로 분해·흡수된다.

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도(FT범주) | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-501 | Bar Chart | column, grouped/paired bar, split bars | 범주 값의 막대 길이 비교 | Magnitude/Ranking | axis,band | X09·X10·X11(T2)·G5 XYChart(내부) | ✅ | `BarChart`(template) | — | — |
| VT-502 | Stacked Bar | proportional stacked, diverging/spine | 막대 분할로 합+구성 동시 표시 | Part-to-whole/Deviation | axis,band | X09·X10(T2) | 📋 | (→template) | — | P2 |
| VT-503 | Line Chart | multiple lines | 시간축 값 변화 선 연결 | Change over Time | axis,edge(path) | X09·X10·X11(T2)·G5 XYChart(내부) | ✅ | `LineChart`(template) | — | — |
| VT-504 | Area Chart | stacked area | 선 아래 채움으로 총량 강조 | Change over Time | axis,area | X09·X10(T2) | 📋 | (→template) | — | P2 |
| VT-505 | Scatterplot | XY plot, bubble(크기 인코딩), connected scatter | 두 변수 관계 점 표시 | Correlation | axis,node(dot) | X09·X10·X11(T2) | 📋 | (→template) | — | P2 |
| VT-506 | Pie / Donut | election donut, multiple pies, arc | 부채꼴 구성비 | Part-to-whole | radial,area | X09·X10·X11(T2)·G5(내부) | ✅ | `PieChart`(template) | donutSegmentPath 재사용 | — |
| VT-507 | Treemap | — | 중첩 사각형 면적 계층·비중 | Part-to-whole | grid,area,tree | X09·X11(T2)·catalog §1-b(내부) | ✅ | `Treemap`(template) | squarifyLayout | — |
| VT-508 | Histogram | — | 구간 빈도 연속 막대 | Distribution | axis,band | X09·X11(T2) | 📋 | (→template) | — | P2 |
| VT-509 | Dot Plot | range plot, arrow plot, dumbbell | 점 1~2개로 값·범위·변화 표시 | Distribution/Magnitude | axis,node(dot) | X09·X10(T2) | 📋 | (→template) | — | P2 |
| VT-510 | Boxplot | box-and-whisker, Tukey | 중앙값·사분위 상자 요약 | Distribution | axis,band,area | X09·X11(T2) | 📋 | (→template) | — | P3 |
| VT-511 | Radar Chart | spider, cobweb | 방사 다축 다각형 | Magnitude | radial,axis,area | X09·X11(T2)·G5(내부) | ✅ | `RadarChart`(template) | — | — |
| VT-512 | Heatmap | calendar heatmap, XY heatmap | 격자 색 농도 패턴 | Correlation/Time | grid,area | X09(T2) | 📋 | (→template) | — | P2 |
| VT-513 | Waffle | gridplot, unit chart | 단위 격자 채움 백분율 | Part-to-whole | grid,icon-unit | X09(T2) | 🔶 | `Statistics`(mosaic·ProportionBlock) 근사 | — | P2 |
| VT-514 | Isotype | pictogram | 아이콘 반복 수량(정수) | Magnitude | icon-unit,grid | X09(T2)·catalog §2(내부) | ✅ | `Statistics`(isotype·PictographUnit)(pattern) | — | — |
| VT-515 | Sankey | alluvial, river plot | 흐름 폭으로 이동량 표시 | Flow | band,edge | X09·X11(T2)·G5(내부) | ✅ | `SankeyDiagram`(template) | BandEdge 신규 | — |
| VT-516 | Chord Diagram | — | 원 둘레 간 흐름 리본 | Flow | radial,band | X09(T2) | 📋 | (→template) | — | P3 |
| VT-517 | Waterfall | — | 증감 누적 단계 합계 도달 | Flow/Part-to-whole | axis,band | X09(T2) | 📋 | (→template) | — | P2 |
| VT-518 | Choropleth Map | — | 행정구역 색상 비율 지도 | Spatial | geo,area | X09·X10(T2) | 📋 | (→template) | related:VT-605 | P2 |
| VT-519 | Radial Gauge | gauge, dial | 아크 척도 위 값 표시 | 단일 KPI | radial,axis | catalog §1-b(내부) | ✅ | `RadialGauge`(template) | donutSegmentPath+StatNumber | — |
| VT-520 | Data Table | table | 행·열 원자료 정밀 조회 | 정밀값 비교 | grid | X10·X11(T2) | ⛔ | 사유: 제품범위외(SVG viz 패키지 밖 — DOM 테이블 영역) | — | — |

### F. 인포그래픽/에디토리얼 레이아웃 — `VT-6xx` (11행)

업계 분류(X14)의 timeline/process/hierarchical/flowchart형 인포그래픽은 병합 규칙에 따라 VT-401/202/303/201의 aliases로 흡수했다.

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-601 | Statistical Infographic | data infographic, stat cards | 수치 강조 카드/그리드 구성 | 성과·리서치 요약 | grid,node(card) | catalog §2(내부)·X14(T3) | ✅ | `Statistics`(cards·StatCard)(pattern) | — | — |
| VT-602 | Comparison | versus, before-after, T-chart(pros/cons) | 패널 대비+중앙 디바이더 | 항목 비교 | grid,area | catalog §2(내부)·X14(T3) | ✅ | `Comparison`(pattern) | — | — |
| VT-603 | List Infographic | listicle, checklist | 아이콘+항목 목록 시각화 | 팁/체크리스트 | grid,icon-unit,leader | X14(T3, 교차) | 📋 | (→pattern) | — | P2 |
| VT-604 | Informational Infographic | descriptive | 텍스트 중심 개요 구성 | 개념 소개 | grid,leader | X14(T3, 교차) | 📋 | (→pattern) | — | P3 |
| VT-605 | Geo / Map Infographic | geographic, location infographic | 지도 위 데이터·마커 배치 | 지역 트렌드 | geo,node(pin),leader | catalog §2-a(내부)·X14(T3) | 📋 | (→pattern) | related:VT-518 | P1 |
| VT-606 | Annotated Illustration | anatomical, labeled diagram, cutaway/exploded view | 대상 구조 라벨링 해설 | 제품/구조 설명 | leader,node | X14·X15(T3, 교차) | 📋 | (→pattern) | CalloutLeader 재사용 | P2 |
| VT-607 | Bento Grid | bento layout, 콜라주 그리드 | 비대칭 모듈 격자 배치 | 피처 소개/대시보드 | grid,area | catalog §2-a(내부)·X16(T3, 교차) | 📋 | (→pattern) | — | P1 |
| VT-608 | Sketchnote Composition | visual note | 손그림·화살표 시각 노트 구성 | 강연 기록/아이디어 | node,edge,leader | catalog §2-a(내부)·X13(T2) | 📋 | (→pattern) | F4 스타일(지터) 블로커와 연동 | P1 |
| VT-609 | Poster / Editorial Title | magazine layout, editorial composition | 타이포 위계 중심 지면 구성 | 표지/타이틀 지면 | grid,area | catalog §2-a(내부)·X14(T3) | 📋 | (→pattern) | — | P1 |
| VT-610 | Infographic Resume | visual CV | 경력·스킬 시각 이력서 | 개인 문서 | grid,axis | X14(T3, 교차) | ⛔ | 사유: 제품범위외(개인 문서 특화 컴포지션) | — | — |
| VT-611 | Scrollytelling | scroll-driven longform | 스크롤 연동 내러티브 전개 | 데이터 저널리즘 | (스크롤 인터랙션) | X13(T2) | ⛔ | 사유: 제품범위외(정적 SVG 컴포넌트 범위 밖) | — | — |

### G. 개념 프레임워크 — `VT-7xx` (10행)

| ID | 이름 | aliases | 한 줄 정의 | 대표 용도 | 프리미티브 | 소스(티어) | 상태 | 매핑 | tags | P |
|---|---|---|---|---|---|---|---|---|---|---|
| VT-701 | Pyramid | layered pyramid, Maslow | 기반→정점 층상 구조 | 중요도/단계 계층 | area(사다리꼴 스택) | catalog §2(내부)·X15(T3) | ✅ | `Hierarchy`(pyramid·PyramidLayer)(pattern) | related:VT-207 | — |
| VT-702 | Quadrant / 2x2 Matrix | quadrantChart, Eisenhower, BCG, prioritization matrix | 두 축 4분면 배치 | 우선순위/포트폴리오 | axis,grid,node(dot) | X06(T1)·X13(T2)·§1-b Matrix·G5(내부) | ✅ | `QuadrantChart`(template) | tags:chart | — |
| VT-703 | SWOT Matrix | TOWS | 강점·약점·기회·위협 4분면 | 전략 진단 | grid,area | X13(T2) | 📋 | (→pattern) | related:VT-702 | P2 |
| VT-704 | Iceberg | iceberg model | 수면 아래 숨은 구조 은유 | 근본 원인 탐색 | area,leader | X13(T2)·X15(T3) | 📋 | (→pattern) | 일러스트 성격 강함 | P3 |
| VT-705 | Onion / Concentric | stakeholder onion, peeling layers | 동심원 근접도 레이어 | 이해관계자/의존 계층 | radial,area | X15(T3, 교차) | 📋 | (→pattern) | — | P2 |
| VT-706 | Fishbone | Ishikawa, cause-and-effect | 생선뼈 원인 범주화 | 근본 원인 분석 | edge(spine),node | X06(T1)·X13(T2) | 📋 | (→template) | — | P2 |
| VT-707 | Business Model Canvas | BMC, lean canvas | 9블록 사업 모델 한 장 정리 | 사업 기획 | grid,area | X13(T2) | 📋 | (→pattern) | canvas류 대표 | P3 |
| VT-708 | Flywheel | virtuous cycle, momentum loop | 축적 가속 선순환 바퀴 | 성장 루프 설명 | radial,edge | X13(T2)·X15(T3) | 🔶 | `Cycle`(orbit/ring) 근사 | — | P2 |
| VT-709 | Honeycomb | UX honeycomb, hexagon cluster | 육각 셀 다면 속성 표현 | 다면 기준 제시 | grid(hex) | X13(T2) | 📋 | (→pattern) | hexagon shape 재사용 | P3 |
| VT-710 | Spectrum Slider | continuum, 대립축 다축 척도 | 대립 양극 축 위 위치 표시 | 성향/성숙도 척도 | axis,node(dot) | catalog §1-b(내부) | 📋 | (→pattern) | quadrant와 별개 유형 | P1 |

## 6. 역방향 매핑 체크 테이블 (코드 export → VT ID)

`src/templates/index.ts` 컴포넌트 export 25종 + `src/patterns/index.ts` 6종 전수. 각 export는 1개 이상 VT 행에 매핑되어야 한다.

| export | 종류 | VT ID |
|---|---|---|
| `Flowchart` | template | VT-201 (+VT-106 근사) |
| `BlockDiagram` | template | VT-116 |
| `Mindmap` | template | VT-301 (+VT-302 근사) |
| `TimelineDiagram` | template | VT-401 |
| `RequirementDiagram` | template | VT-118 |
| `KanbanBoard` | template | VT-204 |
| `ClassDiagram` | template | VT-101 |
| `StateDiagram` | template | VT-107 |
| `ERDiagram` | template | VT-117 |
| `C4ContextDiagram` | template | VT-109 |
| `C4ContainerDiagram` | template | VT-110 |
| `C4ComponentDiagram` | template | VT-111 |
| `C4CodeDiagram` | template | VT-112 |
| `ArchitectureDiagram` | template | VT-115 |
| `UMLComponentDiagram` | template | VT-103 |
| `UMLDeploymentDiagram` | template | VT-104 |
| `UMLSequenceDiagram` | template | VT-108 |
| `SequenceDiagram` | template | VT-108 |
| `ZenUMLDiagram` | template | VT-108 |
| `BPMNDiagram` | template | VT-122 (+VT-123·VT-106 근사) |
| `ArchiMateDiagram` | template | VT-120 |
| `ArchiMateBusinessDiagram` | template | VT-120 |
| `ArchiMateApplicationDiagram` | template | VT-120 |
| `ArchiMateTechnologyDiagram` | template | VT-120 |
| `SysMLBlockDiagram` | template | VT-119 |
| `ProcessSteps` | pattern | VT-202 |
| `Comparison` | pattern | VT-602 |
| `TimelineRoadmap` | pattern | VT-402 |
| `Hierarchy` | pattern | VT-303 (+VT-701, VT-307 근사) |
| `Cycle` | pattern | VT-203 (+VT-405·VT-708 근사) |
| `Statistics` | pattern | VT-601 (+VT-514, VT-513 근사) |

## 7. Progress summary

| 그룹 | 행 수 | ✅ | 🔶 | 📋 | ⛔ | 그중 P1 |
|---|---|---|---|---|---|---|
| A. 엔지니어링/소프트웨어 | 29 | 16 | 2 | 11 | 0 | 4 |
| B. 프로세스·플로우 | 8 | 4 | 0 | 4 | 0 | 3 |
| C. 계층·관계 | 7 | 2 | 2 | 3 | 0 | 3 |
| D. 시간축 | 5 | 2 | 1 | 2 | 0 | 3 |
| E. 데이터 차트 | 20 | 1 | 2 | 16 | 1 | 8 |
| F. 인포그래픽/에디토리얼 | 11 | 2 | 0 | 7 | 2 | 4 |
| G. 개념 프레임워크 | 10 | 1 | 1 | 8 | 0 | 2 |
| **계** | **90** | **28** | **8** | **51** | **3** | **27** |

> 커버리지 불균형이 수치로 확인된다: 엔지니어링(A)은 55%(16/29) 구현인 반면, 최대 갭인 데이터 차트(E)는 5%(1/20), 인포그래픽(F) 18%, 개념 프레임워크(G) 10%. 레퍼런스 무게중심(인포그래픽·프로세스·에디토리얼)과 정확히 반대다.
> P1(레퍼런스 관찰·내부 갭 유래) 총 27건 — 다음 ORDER 후보: E 대역 8건(VT-501·503·506·507·511·515·519 등) + F 대역 4건(VT-605·607·608·609)이 최우선.

## 8. 부속 기록

### 8-a. Discrepancy log

| # | 불일치 | 판정 |
|---|---|---|
| 1 | catalog §1 헤더 "기존 26 템플릿" vs `templates/index.ts` 컴포넌트 export **25종**(.tsx 파일 22개 + 비템플릿 `c4Types.ts`) | index.ts export 기준 25종을 권위로 채택. ArchiMateDiagram.tsx 1파일이 4 export |
| 2 | Mermaid 다이어그램 종수: 통념 ~25종 vs intro 페이지 실측 **30종** | 30종 기준(ER experimental·C4 unstable 표기 포함) |
| 3 | Datawrapper "21 chart types"(마케팅) vs developer 문서 **24종** | developer 문서(1차) 기준 |
| 4 | ArchiMate 3.2 원문 pubs 페이지 SSO 게이트 | viewpoint 명칭은 2차(Visual Paradigm) 교차 검증 — 전수 확정은 미결 |
| 5 | Data Viz Project 본 사이트 403 | 개별 유형 미인용, 규모(160+·4축)만 2차 확인 |

### 8-b. 프리미티브 수준 항목 (Registry 비대상 — ⛔ 사유 `프리미티브수준`)

catalog §1-c의 원자 갭은 유형이 아니라 구성 요소이므로 행으로 승격하지 않는다(원문: `visualization-catalog.md` §1-c):
Zone/Layer 밴드 · 서비스 아이콘 칩 · LegendBlock · 회전 EdgeLabel · LinkLabelChip · Fork/Join 바 · DetailCard · DashedGhostNode · TimeAxis/DateTick · 아이콘 글리프 세트 · 협업 마커.
PLAN §D G6 메타 프레임(`Kruchten4Plus1View`·`ViewpointFrame`)은 유형이 아닌 조합 프레임이라 후보 풀에 기재.

### 8-c. Deprecated ID 표

병합·폐기된 ID를 보존한다(재사용 금지). v1 시점 해당 없음.

| 폐기 ID | 병합 대상 | 사유 |
|---|---|---|
| — | — | — |

## 9. Appendix — 후보 풀 (candidate pool)

Registry 미등재 롱테일. 승격 시 해당 대역 끝 번호로 append.

**다이어그램 계열**: Wardley Map(Mermaid) · Cynefin(Mermaid) · Event Modeling(Mermaid) · Railroad/Syntax diagram(PlantUML) · SDL(PlantUML) · UML Profile diagram(OMG — 메타모델 전용) · Salt UI wireframe(PlantUML — VT-206과 별개 도구 산출물) · Files tree(PlantUML) · Grid diagram(D2) · Kruchten 4+1 View(PLAN §D G6) · ViewpointFrame/ISO 42010(PLAN §D G6) · ArchiMate 개별 viewpoints 나머지(Organization·Application Cooperation/Usage·Business Process Cooperation·Product·Technology (Usage)·Physical·Information Structure·Service Realization·Implementation and Deployment) · Azure WAF 특수 3종(Availability&Resilience·Compliance Residency·Identity&Access Flow)

**차트 계열**: Violin(FT) · Population pyramid(FT) · Dot strip/barcode(FT) · Cumulative curve(FT) · Parallel coordinates(FT·PT) · Proportional symbol(FT·DW) · Cartogram(FT) · Dot density map(FT) · Flow map(FT) · Contour/isoline(FT) · Voronoi(FT) · Stock price OHLC(FT) · Fan chart(FT) · Slope chart(FT) · Lollipop(FT) · Bullet bar(DW) · Line+Column combo(FT) · Seismogram(FT) · Circle timeline(FT) · Locator map(DW) · Spectrogram(PT) · Pareto(PT) · Dendrogram(PT) · Hyperbolic tree(PT) · Chernoff faces(PT)

**인포그래픽/프레임워크 계열**: Interactive infographic(Visme 단독) · Decision tree(VF 단독 — VT-201 alias 후보) · Hub and spokes(VF) · Target/bullseye(VF) · Layer cake(VF) · Storyboard(VF) · Tube/subway map(VF — VT-208 alias 후보) · Causal loop/Doom loop(VF — VT-708 세분형) · Poster design 세분(단독)

(FT=X09, DW=X10, PT=X11, VF=X15)

## 10. Resume procedure (문맥 없는 에이전트의 이어받기)

1. **소스 재스캔 순서**: `src/templates/index.ts` → `src/patterns/index.ts` → `visualization-catalog.md` §1-b/§1-c/§2-a → `PLAN.md` §D. 새 export/갭이 보이면 §5 해당 대역 끝에 행 추가 + §6 역방향 표 갱신.
2. **ID 추가 규칙**: 대역 내 마지막 번호 +1로만 추가(append-only). 재정렬·재번호 금지. 병합 시 §8-c에 `폐기 ID → 대상 ID` 기록.
3. **카운트 재계산**: §7 각 그룹 행 수·상태 합계 = §5 실제 행 수와 일치시킬 것(⛔ 포함, Appendix 제외).
4. **검증 명령** (문서 루트 = 리포 루트):
   - export 전수: `rg -o "export \{ [A-Za-z]+ \}" packages/visualization/src/templates/index.ts packages/visualization/src/patterns/index.ts` 의 각 식별자가 §6 표에 존재하는지 대조
   - 갭 흡수: catalog §1-b/§2-a·PLAN §D G5 각 항목명을 본 문서에서 `rg` 검색 — Registry 행/alias/§8-b 중 한 곳에 존재해야 함
   - 링크: 본 문서·catalog·PLAN 간 `](./…)` 상대 링크의 대상 파일 존재 확인
5. **변경 금지 영역**: catalog §4·style-classification.md 내용 복제 금지(스타일 축), 88장 이미지 재분석 금지, ORDER.md 편집 금지.
