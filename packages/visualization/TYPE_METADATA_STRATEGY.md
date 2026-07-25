# Visualization Type — 채택(adoption) 메타데이터 전략 (유형 축)

> bbangto-ui 소비 주체가 **AI**일 때, "어떤 상황·데이터에 어떤 시각화 컴포넌트(패턴/템플릿)를 쓸지"를
> **코드/문서 전수 검토 없이** 고르도록 돕는 기계가독 메타데이터 체계. (KANBAN KAN-020)
>
> **관련 문서:** 유형 인벤토리 SSOT는 [`./visualization-type-inventory.md`](./visualization-type-inventory.md),
> 스타일(paint) 축 전략은 [`../style-guide-catalog/METADATA_STRATEGY.md`](../style-guide-catalog/METADATA_STRATEGY.md),
> 색 스킴 base 축은 [`../foundations/FOUNDATION_METADATA_STRATEGY.md`](../foundations/FOUNDATION_METADATA_STRATEGY.md) (KAN-035),
> 전 인터페이스 커버리지 감사/집행은 [`../../METADATA_COVERAGE_AUDIT.md`](../../METADATA_COVERAGE_AUDIT.md) 참고.
> 유형 ⊥ 스타일: 한 유형은 모든 스타일 가이드로 리스킨된다.

---

## 1. 문제

visualization 패키지의 패턴 22종·템플릿 68 export(채택 유형 **87종**)가 런타임에 노출하는 정보는 컴포넌트
함수와 props 타입뿐이다. 채택에 필요한 분류자 — 카테고리·데이터 형태·프리미티브·"언제 써라/피해라" — 는
사람용 문서 `visualization-type-inventory.md`에만 있고 코드 객체와 연결이 없다.

따라서 AI가 유형을 고르려면 (a) 90 컴포넌트 소스를 전수 열거나, (b) 376줄 인벤토리 문서를 전수 읽어야
한다. 스타일 축(`StyleGuideMeta` → `catalog.manifest.json` → `selectStyleGuides`, KAN-018/021/022/023)이
이미 이 문제를 푼 인프라를 갖췄으므로, **그 구조를 유형 축으로 미러링**한다.

## 2. 전략 — "타입 필드 + 생성 매니페스트 + 셀렉터" (스타일 축 미러)

```
vizTypeRegistry(entry.meta)  ──(buildTypeManifest, 결정적)──▶  type.manifest.json  ──▶  AI 채택 판단
   (코드 SSOT)                                                    (압축 투영, 1파일)      ▲
        └────────────────────(selectVizTypes, 런타임 스코어링)──────────────────────────┘
```

- **SSOT = `src/typeMeta/registry.ts`의 각 엔트리**. 슬롯 정체성(`id/name/exportNames/kind`)은 항상,
  rich `meta`(`VizTypeMeta`)는 저작된 유형만. 인벤토리 §5/§6의 87 채택 VT 행을 전사한다.
- **투영 = `type.manifest.json`** — 레지스트리에서 `buildTypeManifest`가 파생(id 오름차순·고정 키 순서).
- **셀렉터 = `selectVizTypes`** — dataShape/category/primitives/tags/priority로 스코어링·랭킹.

## 3. `VizTypeMeta` 스키마 (통제 어휘)

`src/typeMeta/types.ts`. 통제 어휘는 const union = SSOT(추가는 union 편집 → 컴파일 게이트, free string 금지):

- `category`: A~G 7종(engineering·process-flow·hierarchy-relation·time·data-chart·infographic-editorial·concept-framework).
- `dataShape`: FT Visual Vocabulary 9범주(magnitude·ranking·part-to-whole·change-over-time·correlation·
  distribution·flow·spatial·deviation) + 구조형 7종(hierarchy·network·process·temporal·comparison·relationship·concept).
- `primitives`: inventory 프리미티브 컬럼 16종(node·edge·lane·axis·radial·grid·area·tree·band·leader·mockup·geo·icon-unit·port·lifeline·boundary).
- `tags`: 고정 union(chart·framework·infographic·diagram·standard·time·geo·radial·matrix·editorial).
- `summary`·`aliases`·`useWhen`(≤5)·`avoidWhen`(≤5)·`priority?`·`related?`(VT id, 생성기가 정합성 검증).

**모드/다-export 표현**: 1 export가 여러 VT/모드를 담당하면 엔트리 `variant`로 렌더 힌트를 준다
(예: VT-708 Flywheel = `exportNames:['Cycle'], variant:'flywheel'`). 다-export 유형은 `exportNames` 복수
(예: VT-108 = SequenceDiagram·UMLSequenceDiagram·ZenUMLDiagram).

## 4. 매니페스트 계약

- `metaStatus`: `authored`(meta 저작) | `pending`(백필 대기). **'pending'은 "해당 없음"이 아니다.**
- `completeness`: 구조에서 계산(저작 대상 아님) — exportCount·hasVariant·useWhenCount·primitiveCount.
- `related` 참조 정합성(존재·self-ref·중복)은 **authored 전체**에 대해 생성기가 throw로 강제.
- 커밋 `type.manifest.json`은 `manifest.test.ts`가 재생성 결과와 **바이트 일치** 검증(drift 게이트).
  생성은 `pnpm gen:type-manifest`(수동). prebuild 자동배선은 **안 함**(코어 패키지 blast radius 최소화 —
  trendTable/KAN-025 선례). 커버리지는 `registry.test.ts`가 배럴 정적 스캔으로 양방향 검증.

## 5. 거버넌스 + 번들 격리

- **위치**: `packages/visualization` 내부(스타일 축 메타는 UI·viz 공유라 tokens에 있지만, 유형 축은 viz 전용).
- **서브패스 export** `@centurio1987/bbangto-ui-visualization/type-meta` — 루트 배럴을 오염시키지 않아
  컴포넌트 소비자 번들에 레지스트리가 딸려오지 않는다. AI 소비자·툴만 명시 import.
- **범위**: geometry 트랙(`IsometricScene`)·G6 조합 프레임(`Kruchten4Plus1View`·`ViewpointFrame`)은
  inventory §8-b가 VT 유형 행으로 미승격 → 레지스트리 제외(registry.test allowlist에 문서화). selectable로
  만들려면 먼저 인벤토리에 VT 행 추가가 선행(후속 유지보수 과제).

## 6. AI 소비 흐름 (두 경로)

용도별로 분리한다:

1. **파일 읽기** — `type.manifest.json` 한 개를 로드해 전 유형을 비교(오프라인·컨텍스트 창 스캔용, 런타임 무의존).
2. **런타임 셀렉터** — `import { selectVizTypes, vizTypeRegistry } from '@centurio1987/bbangto-ui-visualization/type-meta'`
   로 프로그래밍적 shortlist·재랭크.

권장 흐름(역할 분리, 스타일 축 §6 미러):
```
가진 데이터/맥락 → selectVizTypes({dataShape, category, primitives}) → 상위 N shortlist
  → 각 후보 useWhen/avoidWhen으로 AI 최종 판단 → exportNames(+variant)로 렌더
```
셀렉터는 soft-weighted(하드 필터 아님) — criteria 불일치로 후보가 탈락하지 않아 shortlist가 붕괴하지 않는다.

## 7. 롤아웃 단계

- **KAN-020**: 인프라(스키마·매니페스트·셀렉터·문서) + 파일럿 6종(카테고리 A~G 스팬 + 다-export·variant·
  related 실증). `VizTypeMeta` 스키마·`selectVizTypes` 시그니처·서브패스 export를 **stable 계약**으로 동결.
- **KAN-040(완료)**: pending 81종의 `meta`를 **채우기만** 한 additive 백필 → **전 87종 authored(pending 0)**.
  동결 스키마 위에서 인벤토리 §5 각 행(정의·용도·프리미티브·aliases·tags·related)을 통제 어휘 union으로
  정규화해 승격(필드 추가·변경 없음). **gate 'type-meta 필수' 승격**: `registry.test.ts`가 전 엔트리 meta
  보유(pending 0)·통제 어휘·useWhen/avoidWhen(≤5)·related 정합성을 hard-fail로 강제한다. 타입상 `meta?`
  optional 제거는 breaking change라 별도 카드로 이연(스타일 축 KAN-021 선례 — 게이트로 집행, 타입은 유지).
- **향후**: 스키마 필드 변경·제거는 breaking change로 별도 카드. 신규 유형이 추가되면 `metaStatus:'pending'`으로
  잠시 존재할 수 있으나(계약상 유효), 'type-meta 필수' 게이트가 백필 전까지 red로 막는다. (커버리지 감사·집행은
  상위 카드 KAN-035.)
