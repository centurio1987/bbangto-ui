# Foundation — 채택(adoption) 메타데이터 전략 (색 스킴 base 축)

> bbangto-ui 소비 주체가 **AI**일 때, `foundationCatalog`(76종)에서 색 스킴 base를 **코드 전수 검토 없이**
> 고르도록 돕는 기계가독 메타데이터 체계. (KANBAN KAN-035)
>
> **관련 문서:** 상위 커버리지 감사/집행은 [`../../METADATA_COVERAGE_AUDIT.md`](../../METADATA_COVERAGE_AUDIT.md),
> 스타일(paint) 축은 [`../style-guide-catalog/METADATA_STRATEGY.md`](../style-guide-catalog/METADATA_STRATEGY.md),
> 유형(what) 축은 [`../visualization/TYPE_METADATA_STRATEGY.md`](../visualization/TYPE_METADATA_STRATEGY.md).
> foundation ⊥ 스타일 ⊥ 유형: foundation은 색 토큰 base이고, style-guide가 이를 모티프로 감싸며, viz 유형은 그 위에 리스킨된다.

---

## 1. 문제

`foundationCatalog`(amber 2 + external 74 = 76종)의 각 preset이 런타임에 노출하는 건 `name`+`description`
한 줄뿐이고, `catalog.json`은 `{id,label,file}` 3필드뿐이었다. 채택에 필요한 분류자 — accent 성격·무드·
"언제 써라/피해라"·도메인 적합성 — 는 코드 객체와 연결이 없어, AI가 고르려면 76개 `.ts`를 전수 열어야 했다.
스타일/유형 축이 이미 이 문제를 푼 인프라(`*Meta` → `*.manifest.json` → `select*`)를 갖췄으므로 **그 구조를
foundation 축으로 미러링**한다.

## 2. 전략 — "타입 필드(재사용 어휘) + 생성 매니페스트 + 셀렉터" (스타일/유형 축 미러)

```
foundationCatalog(SSOT) + foundationMetaRegistry(authored)
        └──(buildFoundationManifest, 결정적)──▶ foundation.manifest.json ──▶ AI 채택 판단
        └──(selectFoundations, 런타임 스코어링)──────────────────────────────┘
```

- **SSOT = `foundationCatalog`(slug 정체성) + `foundationMetaRegistry`(authored 메타)**. 린 설계: slug 목록이
  이미 `foundationCatalog`에 있으므로 registry는 **authored만** 담는다(pending 슬롯 나열 불필요).
- **투영 = `foundation.manifest.json`** — `foundationCatalog` 키를 순회하며 파생 필드 + meta를 병합해 생성.
- **셀렉터 = `selectFoundations`** — colorScheme/domains/tags/mood로 soft-weighted 스코어링·랭킹.

## 3. `FoundationMeta` 스키마 — 통제 어휘 **재사용**

정의: [`../tokens/src/foundationMeta.ts`](../tokens/src/foundationMeta.ts). `Domain`/`Tag`/`StyleMood`는
`styleGuideMeta.ts`에서 **재사용**한다(축 간 어휘 일관성, 중복 union 금지).

| 필드 | 형태 | 의미 |
|---|---|---|
| `displayName` | `string` | Title Case 표시명 |
| `summary` | `string` | accent 성격/용도 한 줄 |
| `tags` | `Tag[]` | accent 색/명도·형태·타이포·무드(재사용) |
| `mood` | `StyleMood` 1–5 | 순서형 무드 5축(재사용) |
| `domains` | `Domain[]` | 프로덕트/도메인 적합성(재사용) |
| `useWhen`/`avoidWhen` | `string[]` ≤5 | LLM용 근거 |
| `accessibility` | `{contrastIntent, colorblindConsidered, darkFirst}` | 접근성 **설계 의도(advisory)** |
| `related?` | `string[]` | 인접 foundation slug(생성기가 정합성 검증) |

**파생 필드(저작 안 함, 생성기가 계산)** — 매니페스트에만 존재:
- `colorScheme`: `semantic.background.base` 실효 휘도로 파생(≥0.5 light, <0.5 dark). 알파는 흰 페이지 위 합성 후 판정.
- `baseTextContrast`: `foreground.base` vs `background.base` 실측 대비(소수 2자리). 이름을 `baseTextContrast`로 **좁힌** 이유는
  `contrastIntent`가 **대표 base 텍스트 쌍 한정** advisory임을 명시하기 위함(전 조합 보장 아님).

## 4. 매니페스트 계약

- `metaStatus`: `authored`(meta 저작) | `pending`(백필 대기). **'pending'은 "해당 없음"이 아니다.**
- 생성기가 hard-fail하는 것: **over-claim**(`contrastIntent`가 실측 `baseTextContrast`보다 높음, KAN-024 패턴,
  base 쌍 한정), **related 정합성**(존재·self-ref·중복), **phantom registry 키**(catalog에 없는 slug 저작).
- 커밋 `foundation.manifest.json`은 `meta/manifest.test.ts`가 생성 결과와 **바이트 일치** 검증(drift 게이트).
  생성은 `pnpm --filter …-foundations gen:foundation-manifest`(수동). prebuild 미배선(코어 blast radius↓, viz/KAN-025 선례).
- **catalog.json은 생성물**: `foundationCatalog`에서 파생 emit → 이중-SSOT drift(amber 누락 등) 구조적 불가. 3자 slug-set(76) 일치 테스트가 강제.

## 5. 거버넌스 + 번들 격리

- **스키마 위치**: `tokens`(스타일 축 `StyleGuideMeta` 선례 — 어휘 재사용을 위해 공용 패키지에 둔다).
- **인프라 위치**: `packages/foundations/src/meta`. **서브패스 export** `@centurio1987/bbangto-ui-foundations/meta`
  로 노출 → 루트 배럴을 오염시키지 않아 토큰 소비자 번들에 registry가 딸려오지 않는다(viz `/type-meta` 선례).
- **상위 집행**: 이 축의 커버리지(축 자체 누락·infra-pilot 영구화)는 repo 전역 census
  ([`../../metadata-coverage.json`](../../metadata-coverage.json) + `foundations/src/metadataCoverage.test.ts`)가 감시한다.

## 6. AI 소비 흐름 (스타일/유형 축 §6 미러)

```
가진 맥락(도메인/무드/다크여부) → selectFoundations({colorScheme, domains, tags, mood}) → 상위 N shortlist
  → 각 후보 useWhen/avoidWhen으로 AI 최종 판단 → foundationCatalog[slug]로 채택
```
셀렉터는 soft-weighted(하드 필터 아님) — criteria 불일치로 후보가 탈락하지 않아 shortlist가 붕괴하지 않는다.

## 7. 롤아웃 단계

| 단계 | 내용 | 상태 |
|---|---|---|
| **KAN-035** | `FoundationMeta` 스키마(어휘 재사용) + `buildFoundationManifest`(파생 colorScheme·baseTextContrast·over-claim·catalog.json emit) + `selectFoundations` + 게이트 + **파일럿 3종**(blueprint·amber-dark·stark-white) + repo census | ✅ 이 카드 |
| **KAN-041** | 잔여 73종 `FoundationMeta` 전량 backfill → **pending 0** → census `infra-pilot`→`covered` 승격 + selector 기대 fixture 보강 + 이 문서 갱신 | 📋 후속 |

### 파일럿 관찰(스키마 검증 결과)
foundations는 거의 전량 라이트-베이스(브랜드 accent 프리셋; base 라이트/다크 테마는 core 내장, 유일 다크-베이스는
`amber-dark`). 따라서 `colorScheme`/`baseTextContrast` 파생은 정확하되 편중되며, **실질 변별은 authored
`tags`/`mood`/`domains`가 담당**한다 → `StyleGuideMeta` 어휘 재사용이 적합함을 확인(스키마 변경 불필요).
`baseTextContrast` over-claim 게이트는 현재 자명 통과지만 향후 다크/저대비 foundation 대비 forward guard로 유지한다.
