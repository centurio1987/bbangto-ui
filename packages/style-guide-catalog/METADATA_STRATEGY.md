# Style Guide Catalog — 채택(adoption) 메타데이터 전략

> bbangto-ui 소비 주체가 **AI**일 때, catalog에서 style guide를 **코드 전수 검토 없이** 고르도록
> 돕는 기계가독 메타데이터 체계. (KANBAN KAN-018)
>
> **관련 문서:** 트렌드 표는 [`../core/style-guide-catalog.md`](../core/style-guide-catalog.md),
> viz 페인트 패밀리(F1~F7)는 [`../visualization/style-classification.md`](../visualization/style-classification.md).

---

## 1. 문제

catalog 51종(UI) + 6종(viz)의 각 `StyleGuide` 객체가 런타임에 노출하는 정보는 `name`(슬러그) +
`description`(한 줄) + 산문형 `guidelines`/`visualMotif`뿐이다. 채택에 실제로 필요한 분류자
— 패밀리·우선순위·"언제 써라/피해라"·도메인 적합성·무드 — 는 문서 표에만 있고 객체와 연결이 없다.

따라서 AI가 채택하려면 (a) 51개 `.tsx`를 전수 열어 hex·모티프를 읽거나(비쌈, 게다가 "언제 쓰는
스타일인지" 의도는 코드에 안 드러남), (b) 한 줄 `description`에 의존(51종 변별 불가)해야 한다.

## 2. 전략 — "타입 필드 + 생성 매니페스트" 이중 구조

- **SSOT = 각 StyleGuide 객체의 `meta` 필드**(`StyleGuideMeta`). 저작 위치가 곧 진실이라 drift가
  구조적으로 억제된다. 문서 표의 채택 정보를 객체로 흡수한다.
- **투영 = `catalog.manifest.json`** — `styleGuideCatalog` 배열에서 생성기(`buildManifest`)가 파생.
  AI는 이 JSON **한 개**만 로드해 전 항목을 비교한다 → "코드 전수 검토 없이" 요건 충족.
  (선례: `packages/foundations/src/catalog.json` — 다만 그건 `{id,label,file}` 3필드뿐.)

```
StyleGuide.meta  ──(buildManifest, 결정적)──▶  catalog.manifest.json  ──▶  AI 채택 판단
   (SSOT)                                          (압축 투영, 1파일)
```

## 3. `StyleGuideMeta` 스키마

정의: [`../tokens/src/styleGuideMeta.ts`](../tokens/src/styleGuideMeta.ts). 통제 어휘를 const union으로
강제해 저작 시 타입체크로 일관성을 지킨다.

| 필드 | 형태 | 의미 |
|---|---|---|
| `displayName` | `string` | PascalCase_NN 표시명 |
| `trendIndex?` | `number` | catalog.md 트렌드 # |
| `family` | `StyleFamily` | **단일 primary** 패밀리 |
| `priority?` | `'P1'\|'P2'\|'P3'` | 카탈로그 우선순위 |
| `summary` | `string` | 채택 관점 한 줄 |
| `tags` | `Tag[]` | 통제 태그(부차 성격) |
| `mood` | `{formality,energy,warmth,density,ornament}` 1–5 | 순서형 무드 축 |
| `characteristics` | coarse enum 집합 | 시각 특성 요약 |
| `domains` | `Domain[]` | 프로덕트/도메인 적합성 |
| `useWhen` | `string[]` | 적합 시나리오(LLM용) |
| `avoidWhen` | `string[]` | 안티패턴(LLM용) |
| `accessibility` | `{contrastIntent,colorblindConsidered,motionHeavy,darkFirst}` | 접근성 **설계 의도(advisory)** |
| `related?` | `string[]` | 대체/인접 슬러그(생성기가 존재·중복·self-ref 검증) |

### 설계 결정 (외부 검토 반영)

- **`family`는 단일 primary 분류자.** 혼합 스타일의 부차 성격은 `tags`가 담당한다. 하나의 축으로
  강제 분류해야 필터가 단순하고 일관된다.
- **`accessibility`는 "측정 보장"이 아니라 "설계 의도".** `contrastIntent`/`colorblindConsidered`는
  저자 선언이고, `darkFirst`/`motionHeavy`는 설계 사실이다. **KAN-024 완료**: 팔레트 실측 WCAG 대비
  (`foreground.base` vs `background.base`, 전 preset; 그라디언트는 worst-case)를 `contrastIntent`와
  CI에서 대조해 **over-claim을 hard-fail**한다(aa≥4.5·aaa≥7·low 무제약, `low`=정직한 저대비 허용).
  유틸은 `tokens/contrast.ts`, 감사는 `style-guide-catalog/accessibilityAudit.ts`(`auditContrast`).
  UI 51종 실측 결과 전량 정직(over-claim 0). viz는 텍스트 쌍 스키마가 달라 후속 카드로 분리.
- **`useWhen`/`avoidWhen`은 자유 텍스트.** 소비자가 LLM이라 서술형이 유효하다. 단 **기계 필터의
  1차 신호는 구조화 필드(`tags`/`domains`/`mood`/`characteristics`)** 이고, `useWhen`/`avoidWhen`은
  최종 판단용 근거라는 역할 분리를 지킨다. 서술 규칙: 짧은 명령형 문장 ≤5개.

### 통제 어휘

- **`StyleFamily`** (UI 8 + viz 7)
  - UI(catalog.md 패밀리 편입): `structural-raw`(구조/raw), `depth-material`(깊이/material),
    `flat-systematic`(평면/체계), `typographic-editorial`(타이포/편집), `nostalgia`(노스탤지어),
    `expressive-energetic`(표현/에너지), `tech-dark`(테크/다크), `refined-luxury`(정제/럭셔리)
  - viz(style-classification.md F1~F7): `viz-editorial-accent`(F1), `viz-corporate-schematic`(F2),
    `viz-flat-pop`(F3), `viz-marker-sketchnote`(F4), `viz-ink-line-duotone`(F5),
    `viz-iso-colorblock`(F6), `viz-neon-gradient-dark`(F7)
- **`Domain`**: saas · dev-tools · fintech · dashboard · ecommerce · marketing · portfolio ·
  editorial · blog · docs · landing · gaming · entertainment · social · kids · education ·
  healthcare · luxury · creative-agency · crypto-web3
- **`Tag`**: 색/명도(dark·light·high-contrast·muted·vivid·pastel·monochrome·neon·gradient), 형태/질감
  (sharp·rounded·geometric·organic·textured·glossy·flat·depth·glass·grainy), 타이포/레이아웃
  (typographic·serif·mono·grid·asymmetric·dense·airy), 무드(playful·serious·minimal·maximal·retro·
  futuristic·luxurious·raw·technical·hand-drawn), 모션(animated·kinetic·static)

### `mood` 1–5 앵커 (저자별 편차 억제)

| 축 | 1 | 3 | 5 |
|---|---|---|---|
| `formality` 격식 | 낙서/키치 | 편집적 | 기업/포멀 |
| `energy` 에너지 | 차분/정적 | 균형 | 강렬/시끄러움 |
| `warmth` 온도감 | 차가움(블루/모노) | 중립 | 따뜻함(웜톤/우드) |
| `density` 밀도 | 여백 넉넉 | 균형 | 조밀/꽉참 |
| `ornament` 장식성 | 미니멀 | 절제된 장식 | 맥시멀/장식적 |

## 4. 매니페스트 계약

각 엔트리(`ManifestEntry`, [`src/manifest.ts`](src/manifest.ts)):

- `metaStatus: 'authored' | 'pending'` — rich/thin을 명시 구분. **`pending`은 "아직 백필 안 됨"이지
  "해당 없음"이 아니다.** 소비자는 `pending` 항목을 "정보 부족"으로 다루고 후속 백필을 기대해야 한다.
- `completeness`(생성기가 객체 구조에서 계산, 저작 대상 아님):
  `hasWrappers = wrapperComponents 키>0`, `hasPatterns = patterns 키>0`,
  `foundationPresetCount = foundationPresets.length ?? 1`, `hasVisualMotif = !!visualMotif`.
- 결정성: `name` 오름차순 정렬, 고정 키 순서, 2-space indent + 말미 개행. `undefined` 값은 생략.

## 5. 거버넌스 + 패키지 의존 방향

- **의존 방향(순환참조 방지)**: `tokens`(meta 타입) → `core`(StyleGuide) → `style-guide-catalog`
  (매니페스트·향후 helper). `core`는 catalog를 역참조하지 않는다. `selectStyleGuides()` 같은 helper는
  catalog 패키지에 둔다.
- `meta`는 타입상 **optional**(백필 미완 항목과 공존). **KAN-021로 전 항목 backfill 완료**(UI 51/51·viz
  6/6 authored, 두 매니페스트 pending 0) → 매니페스트 동기 테스트에 "전량 authored·pending 0" DoD
  assertion을 추가해 gate를 승격했다. 타입 시그니처의 `?`(optional) 제거는 소비 helper 도입 시점
  (KAN-022)에 병행한다(현재는 테스트 게이트가 필수성을 강제).
- **재생성 강제**: `catalog.manifest.json`은 생성물이다. `prebuild`가 `gen:manifest`를 자동 실행하고,
  vitest 동기 테스트(`buildManifest(styleGuideCatalog) === 커밋본`)가 stale 매니페스트를 CI에서 잡는다.
- **drift 최소화**: 매니페스트를 채택 필드의 기계 SSOT로 삼고, `style-guide-catalog.md` 트렌드 표는
  **KAN-025로 매니페스트에서 자동생성**한다(`buildTrendTable` → md의 `<!-- gen:trend-table -->` 마커
  구간, `gen:trend-table` 스크립트로 갱신). sync 테스트(`trendTable.test.ts`, `test:unit`)가 stale md를
  CI에서 잡는다. 패밀리 한국어 라벨은 `tokens`의 `STYLE_FAMILY_LABELS`(기계가독 SSOT).

## 6. AI 소비 흐름

1. `@centurio1987/bbangto-ui-style-guide-catalog/manifest.json`(또는 패키지 `catalog.manifest.json`)
   **한 파일**을 로드한다.
2. `domains` / `mood` / `tags` / `characteristics`로 후보 3–5종을 필터·랭크한다.
   (예: "다크 게이밍 대시보드" → `domains∋gaming` + `characteristics.colorScheme='dark'` +
   `mood.energy≥4` → `cyberpunk-hud-01` 식별.) **이 2단계는 KAN-022의 `selectStyleGuides(catalog,
   criteria)`가 코드로 수행**한다 — soft-weighted 스코어링으로 상위 N을 결정적으로 반환.
3. 필요 시 해당 슬러그의 `useWhen`/`avoidWhen`·`summary`로 최종 판단한다(여전히 `.tsx` 전수 열람 불필요).
4. `styleGuideMap[slug]`로 채택한다.

> **KAN-022 완료**: `selectStyleGuides`가 위 2단계를 구현한다(`src/select.ts`, UI·viz 양쪽 export).
> soft-weighted(하드 필터 아님) → shortlist 붕괴 없이 상위 N 반환, 최종 판단은 소비자(AI)가
> `useWhen`/`avoidWhen`으로. viz는 국소 복제 + parity 테스트로 drift 가드.
>
> **KAN-023 완료**: 이 흐름의 **사람용 실현**이 Storybook "Catalog Decision Table" 스토리다
> (필터→`selectStyleGuides` 재랭크, UI/viz 2스토리). 사람이 눈으로 후보를 비교·선택한다.

## 7. 롤아웃 단계

| 단계 | 내용 | 상태 |
|---|---|---|
| **파일럿(KAN-018)** | `StyleGuideMeta` 타입·어휘 + `buildManifest` + 매니페스트 + 게이트 + **대표 3종**(minimal-saas-01·neobrutalism-editorial-01·cyberpunk-hud-01) | ✅ 이 카드 |
| KAN-021 | 잔여 48 UI + 6 viz `meta` 전량 backfill → gate "meta 필수" 승격 | ✅ (UI 51/51·viz 6/6 authored, pending 0; viz 매니페스트 인프라 신설) |
| KAN-022 | `selectStyleGuides(criteria)` 스코어링 helper API | ✅ (soft-weighted, UI·viz 국소복제+parity, 38 vitest) |
| KAN-023 | Storybook "Catalog Decision Table" 비교표 스토리 | ✅ (인터랙티브 필터·랭킹, UI/viz 2스토리) |
| KAN-024 | 팔레트 토큰 실측 WCAG 대비 계산 → `accessibility` 선언과 CI 대조 | ✅ (UI over-claim hard-fail, 실측 51종 정직; viz 후속) |
| KAN-025 | 매니페스트 → `style-guide-catalog.md` 트렌드 표 자동생성 | ✅ (gen 마커+통합 표, sync 테스트; STYLE_FAMILY_LABELS 승격) |
| KAN-026 | viz 팔레트 실측 대비 감사(canvas 위 잉크/라벨 텍스트 쌍 정의 후 auditContrast 확장) | 📋 |
| KAN-027 | #29-50 비정규 displayName 16건 canonical(`Primary_Secondary_01`) 정규화 | 📋 |
