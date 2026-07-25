# 메타데이터 커버리지 감사 리포트 (KAN-035)

> **목적**: bbangto-ui의 소비 주체가 **AI**일 때, "코드 전수 검토 없이 catalog에서 채택하도록 돕는"
> 기계가독 채택 메타데이터(KAN-018 도입)가 **모든 채택 인터페이스에 빠짐없이 적용**됐는지 전수 감사하고,
> 재발을 막는 **집행 장치(census)** 를 명문화한다.
>
> 이 문서는 사람용 리포트다. 기계 SSOT는 [`metadata-coverage.json`](./metadata-coverage.json)이고,
> 집행 게이트는 [`packages/foundations/src/metadataCoverage.test.ts`](./packages/foundations/src/metadataCoverage.test.ts)다.

- **감사일**: 2026-07-25
- **감사 범위**: `packages/*`가 노출하는 모든 "채택(adoption) 인터페이스" — AI가 코드/문서 전수 검토 없이
  골라야 하는 catalog. 기능 선택형 원자(무엇이 필요한가로 고르는 것)는 범위 밖으로 분류하되 근거·승격 trigger를 남긴다.

---

## 1. 감사 매트릭스

| 인터페이스 범주 | 패키지 | 수량 | 선택 방식 | 채택 메타 | 게이트 | 판정 |
|---|---|---|---|---|---|---|
| UI 스타일가이드 | `style-guide-catalog` | 51 | 스타일(paint) 채택 | `StyleGuideMeta` → `catalog.manifest.json` | `manifest.test`·`accessibility.test` | ✅ covered (authored 51/51) |
| viz 스타일가이드 | `visualization-style-guide-catalog` | 30 | 스타일(paint) 채택 | `StyleGuideMeta` → `catalog.manifest.json` | `manifest.test` | ✅ covered (30/30) |
| viz 유형 | `visualization` | 87 | 유형(what) 채택 | `VizTypeMeta` → `type.manifest.json` | `typeMeta/registry.test`·`manifest.test` | ✅ covered (87/87) |
| **foundation** | **`foundations`** | **76** | **색 스킴(base) 채택** | **`FoundationMeta` → `foundation.manifest.json`** | `meta/registry.test`·`manifest.test`·`select.test` | **✅ covered (authored 76/76, KAN-041)** |
| core components | `core` | 57 | 기능(무엇이 필요한가) | — | — | ⬜ out-of-scope |
| core blocks | `core` | 13 | 기능(어떤 섹션) | — | — | ⬜ out-of-scope |
| core patterns | `core` | 4 | 기능(어떤 화면/플로우) | — | — | ⬜ out-of-scope |
| core motion | `core` | ~28 | 효과(원하는 모션) | `motion-catalog.md`(구현 추적 SSOT) | — | ⬜ out-of-scope |

> 각 축 게이트는 실측 green: UI 31 + viz-sg 14 + viz-type 33 + foundation 44 테스트 통과(foundation은 KAN-041 backfill 후 40→44 — 4개 셀렉터 fixture 추가).
>
> **KAN-041 갱신(2026-07-25)**: foundation 축이 `infra-pilot`(authored 3/76)에서 **`covered`(authored 76/76·pending 0)**로 승격됐다.
> 이로써 **네 축 전량 covered** — "전 인터페이스 메타 커버리지"가 이 시점에 달성됐다.

## 2. 판정 근거

### 2-1. 3개 축 covered
스타일 축(UI·viz)과 유형 축은 KAN-018/020에서 인프라를 세우고 KAN-021/040에서 전량 backfill을 완료했다
(pending 0). 각 패키지의 매니페스트 동기 테스트가 "전량 authored·바이트 일치"를 hard-fail로 강제한다 →
축 **내부** drift는 이미 봉인돼 있다.

### 2-2. foundation = 유일했던 실질 갭 → KAN-035 infra-pilot → KAN-041 covered
`foundationCatalog`(76종)은 AI가 색 스킴 base를 고르는 채택 catalog이지만 런타임 노출은 `name`+`description`
한 줄뿐이었고, `catalog.json`은 `{id,label,file}` 3필드뿐이었다 → 스타일가이드와 동일한 "76개 코드 전수 열람"
문제. KAN-035에서 스타일/유형 축과 **동형 인프라**(`FoundationMeta` 스키마 + `foundation.manifest.json` +
`selectFoundations` + 게이트)를 세우고 **파일럿 3종**(`blueprint`·`amber-dark`·`stark-white`)을 저작했다.
**KAN-041에서 잔여 73종을 전량 backfill해 76/76 authored·pending 0**을 달성하고, census status를
`infra-pilot`→`covered`로 승격했다(동결 스키마 위 additive — 필드 추가·변경 0, registry에 meta만 추가).

> **완성 표기**: KAN-035는 foundation을 `infra-pilot`으로 추적하며 `followUp`(KAN-041)이 비면 게이트가 fail하도록
> 설계됐다(영구 예외 방지). KAN-041 완료로 그 followUp이 해소돼 **네 축 전량 covered**가 됐다 — 'foundation-meta 필수'
> 게이트(`registry.test`의 registry≡catalog)가 이제 pending 0을 hard-fail로 집행한다.

#### 파일럿 관찰 — 스키마 적합성 확인
- foundations 카탈로그는 **거의 전량 라이트-베이스**(흰 표면 + 어두운 텍스트, 브랜드 accent 프리셋)다.
  base 라이트/다크/고대비 테마는 **core에 내장**이고, 유일한 다크-베이스는 `amber-dark`(#0b0e11).
- 따라서 파생 `colorScheme`은 정확하되 편중되고(75 light / 1 dark), 파생 `baseTextContrast`도 전량 ~aaa(≈18)로
  거의 상수다 → **실질 변별은 authored 필드**(`tags`=accent 색/타이포, `mood`, `domains`, `summary`,
  `useWhen`/`avoidWhen`)가 담당한다. 이는 `StyleGuideMeta` 어휘(`Domain`/`Tag`/`StyleMood`) **재사용 결정을 확인**한다
  (스키마 변경 불필요).
- `baseTextContrast` over-claim 게이트는 현재 자명 통과지만, 향후 **다크/저대비 foundation** 추가 대비 forward guard로 유지한다.

### 2-3. 부수 drift 수리 — catalog.json 이중 SSOT
`catalog.json`(74) ≠ `foundationCatalog`(76): `amber-dark`/`amber-light`가 catalog.json에서 누락돼 있었다.
KAN-035에서 catalog.json을 `foundationCatalog`에서 파생하는 **생성물로 격하**해(gen 스크립트가 emit) 이중-SSOT
drift를 구조적으로 제거했다. `manifest.test`가 3자 slug-set(catalog/manifest/foundationCatalog=76) 일치를 강제한다.

### 2-4. core 4범주 out-of-scope
components/blocks/patterns는 **기능 선택형**(무엇이 필요한가로 고르며 N-way 채택 판단이 아님), motion은
**효과 선택형**(자체 SSOT `motion-catalog.md` 보유)이다. 스타일은 주입된 style-guide가 결정하므로 개별
원자에 채택 메타는 불필요하다. 각 범주의 **승격 trigger**는 census `outOfScope[].promoteTrigger`에 명시했다.

## 3. 집행 장치 (census)

개별 축 게이트가 축 **내부** drift를 잡는 데 반해, census([`metadata-coverage.json`](./metadata-coverage.json) +
[`metadataCoverage.test.ts`](./packages/foundations/src/metadataCoverage.test.ts))는 **축 자체의 누락**과
**infra-pilot의 영구화**를 잡는다:

1. **드리프트 스캔**: `packages/*`의 카탈로그 파일(`*.manifest.json`·`src/catalog.json`)을 전수 발견해,
   census에 축 또는 `ignoredCatalogFiles`로 **선언되지 않은 파일이 하나라도 있으면 fail**. → 신규 카탈로그가
   census 등록 없이는 CI를 통과 못 한다("태스크마다 메타 동반 생성됐는지"를 기계가 강제).
2. **상태 정합**: `covered`는 authored==total(pending 0), `infra-pilot`은 `followUp` 필수 + authored≥pilotAuthored.
3. **자동 실패주입 테스트**: 미선언 카탈로그·followUp 누락 등에서 검증기가 위반을 내는지 fixture로 영속 검증.

> census 게이트는 물리적으로 `foundations` 패키지에 호스팅하지만 **저장소 전역 거버넌스 게이트**다
> (`pnpm test:unit`의 `-r`이 전 패키지를 항상 실행하므로 필터 누락 없음). 향후 `tokens` 이관 여지는 열어둔다.

## 4. 재감사 절차 (신규 카탈로그 추가 시)

1. 새 채택 catalog(예: 새 `*.manifest.json`)를 추가하면 census 게이트가 **미선언으로 fail**한다.
2. `metadata-coverage.json`의 `axes`에 축을 선언(covered면 전량 authored, infra-pilot이면 `followUp` 필수)하거나,
   채택 catalog가 아니면 `ignoredCatalogFiles`/`outOfScope`에 rationale과 함께 명시한다.
3. 이 리포트의 매트릭스와 §2 근거를 갱신한다.

## 5. 관련 문서

- 스타일 축 전략: [`packages/style-guide-catalog/METADATA_STRATEGY.md`](./packages/style-guide-catalog/METADATA_STRATEGY.md)
- 유형 축 전략: [`packages/visualization/TYPE_METADATA_STRATEGY.md`](./packages/visualization/TYPE_METADATA_STRATEGY.md)
- foundation 축 전략: [`packages/foundations/FOUNDATION_METADATA_STRATEGY.md`](./packages/foundations/FOUNDATION_METADATA_STRATEGY.md)
