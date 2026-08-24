---
card: KAN-044-3KYT2Q
batch: 2
created: 2026-08-25
branch: KAN-044-3KYT2Q
status: 완료
steps: S2, S4, S3
---

# KAN-044-3KYT2Q 배치2 — 4구획 팬아웃 조사 후 판정 통합

카드: [KAN-044-3KYT2Q.md](../cards/KAN-044-3KYT2Q.md) · 범위 `S2` `S4` `S3`
선행: [배치1](KAN-044-3KYT2Q.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

WBS 순서(S2→S3→S4)와 이 배치의 실행 순서(S2·S4 → S3)가 다르다. **팬아웃 워커가 참조 조회와
원문 대조를 한 번에 하는 것이 이 안의 이득**이라 둘을 붙였고, 판정 통합은 그 뒤다.

### WP1 · `S2`+`S4` 4구획 병렬 조사 (서브에이전트 4)

워커마다 자기 구획의 문서에 대해 둘을 함께 낸다 — inbound 참조(누가 이 문서를 부르는가)와
원문 요지(무엇이 적혀 있는가·다른 어느 문서와 겹치는가). 판정 규칙(배치1 산출)을 프롬프트에
동봉하고, **워커는 판정을 내지 않는다** — 사실만 낸다. 판정은 WP2가 한 머리에서 한다.

| 워커 | 구획 | 대략 |
|---|---|---|
| W1 | 루트 마크다운 | 9개(KANBAN.md 제외) · ASSET_INTEGRATION_PLAN·DESIGN_SYSTEM_GUIDE·METADATA_COVERAGE_AUDIT·ORDER·RELEASE_PLAN·WAVE0_REPORT·README·CLAUDE·QUALITY_CHECKLIST |
| W2 | `packages/core/catalog/*.audit.md` | 44개 · 구조가 동일해 표본이 아니라 전량을 훑되 요지는 공통 스키마로 압축 |
| W3 | `packages/core` 그 외 | style-guide-catalog·COMPONENT_CATALOG·motion-catalog·design-trends-2020-2026·MOTION_QUALITY_CHECKLIST·README 류 |
| W4 | `packages/visualization` + 나머지 패키지·앱·기타 | PLAN·visualization-catalog·visualization-type-inventory·style-classification·viz-style-expansion·TYPE_METADATA_STRATEGY·METADATA_STRATEGY 2종·패키지 README·`sample_design`·`diagram-references`·`_templates`·`apps/storybook` |

**완료 기준**: 구획 전량에 (inbound 참조 수 · 참조원 경로 · 원문 요지 1~2줄 · 중복 후보 문서
경로)가 붙는다. 참조 0건 목록이 구획마다 따로 나온다. 판정 칸은 비어 있다.

### WP2 · `S3` 판정 통합

워커 넷의 반환을 한자리에 놓고 배치1의 규칙을 적용해 판정 모집단 전량에 판정 1개 + 근거
1줄을 붙인다. 구획을 가로지르는 중복(예: 루트 `METADATA_COVERAGE_AUDIT` ↔ 패키지
`METADATA_STRATEGY` 3종)은 여기서만 보인다 — 워커는 자기 구획만 봤기 때문이다.

**완료 기준**: 전량에 판정 1개. `보류` 0건(못 갈리면 그 자리에서 원문을 열어 닫는다).
`폐기` 판정마다 참조 0건이거나 "지우기 전에 고칠 곳"이 적혀 있다.

## 2. 의존과 순서

- WP1 전체가 배치1의 인벤토리·판정 규칙에 걸린다(배치 밖 의존, 직렬).
- WP1 워커 넷은 서로 독립이다 — 구획이 겹치지 않고 아무도 파일을 안 고친다(전부 읽기).
  워크트리 격리가 필요 없는 이유가 이것이다.
- WP2 는 WP1 넷이 **전부** 끝나야 시작한다(배리어). 구획 간 중복 판정이 목적이라
  파이프라인으로 흘리면 그 판정을 못 한다.

## 3. 리스크

- **워커별 판정 기준 편차** — B안의 대표 리스크다. 워커가 판정을 내지 않게 하고(사실만 반환)
  판정을 WP2 한 곳으로 모아 원천 차단한다. 규칙 동봉은 워커가 **무엇을 사실로 모아야 하는지**
  알리는 용도다.
- **W2 구획 44개가 구조 동일** — 파일마다 요지를 따로 쓰면 반환이 두꺼워진다. 공통 스키마
  1줄 + 예외만 따로 적게 한다.
- **반환 누락** — 워커가 죽거나 빈 값을 내면 그 구획이 통째로 판정에서 빠진다. WP2 시작 전에
  구획별 행 수를 인벤토리와 대조해 누락 0을 확인한다.
- 되돌리기: 이 배치도 문서만 고친다. `kan/KAN-044-3KYT2Q/S2`·`S4`·`S3` 태그.

## 4. 착수 시점 판단

**2026-08-25 착수** — WP2(`S3`)는 이 배치에 그대로 둔다. 워커 넷이 사실만 반환하므로(판정 없음) 반환 분량이 파일당 5필드로 압축되고, 구획을 가로지르는 중복 판정은 넷을 한자리에 놓아야만 선다. 배치3으로 미루면 그 반환을 다시 읽어야 한다.
