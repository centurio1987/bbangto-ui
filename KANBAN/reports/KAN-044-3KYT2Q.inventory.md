# KAN-044-3KYT2Q · S1 산출물 — 문서 인벤토리와 판정 규칙

> 카드: [KAN-044-3KYT2Q.md](../cards/KAN-044-3KYT2Q.md) · 배치: [batch1](../batches/KAN-044-3KYT2Q.batch1.md)
> 기준일 2026-08-25. 이 파일은 S1 의 산출물이고 S2~S4 의 입력이다. 판정 칸은 S3 이 채운다.

## 1. 모집단

마크다운 전량 **98개**(`node_modules`·`.git`·`dist`·`storybook-static` 제외). 그중 기계 소유 **19개**를 빼면 **판정 모집단 79개**다.

비-md 문서 후보는 넷뿐이고 전부 모집단이 아니다 — `KANBAN.board.html`·`KANBAN/reviews/*.review.html` 2개는 칸반 파생물이고, `apps/storybook/index.html` 은 앱 엔트리다. `docs/` 디렉터리는 없다.

### 기계 소유 제외 목록

| 소유자 | 파일 | 왜 제외인가 |
|---|---|---|
| changesets | 9개 — `packages/*/CHANGELOG.md` 7 · `apps/storybook/CHANGELOG.md` · `.changeset/README.md` | 릴리스 도구가 쓰고 지운다. 사람이 정리할 대상이 아니다 |
| manage-kanban | 10개 — `KANBAN.md` · `.kanban/log.md` · `KANBAN/cards/*` 3 · `KANBAN/batches/*` 3 · `KANBAN/reviews/*.review.md` 2 | 스킬이 관리한다. 이 중 4개는 이 카드가 방금 만든 것이다 |

## 2. 배치2 팬아웃 4구획

| 워커 | 구획 | 파일 수 | 총 줄수 | 특징 |
|---|---|---|---|---|
| W1 | 루트 마크다운 | 9 | 1263 | 판정의 핵심. 일회성 계획·감사·리포트가 몰려 있다 |
| W2 | `packages/core/catalog/*.audit.md` | 44 | 1949 | 구조 동일. 전부 2026-06-27 단일 커밋 후 무변경 |
| W3 | `packages/core` 그 외 | 7 | 1537 | 카탈로그·트렌드·모션 레퍼런스 |
| W4 | `packages/visualization` + 나머지 패키지·앱·기타 | 19 | 2938 | METADATA_STRATEGY 3종과 viz 계획 문서군 |
| | **합** | **79** | **7687** | |

## 3. 인벤토리 — 판정 모집단 79건

`참조`·`요지`·`중복 후보`·`성격` 은 S2·S4 가, `판정`·`근거` 는 S3 이 채운다.

### W1 · 루트 마크다운 (9건)

| 경로 | 줄 | 바이트 | 최종 커밋 | 커밋 수 |
|---|---:|---:|---|---:|
| `ORDER.md` | 302 | 32148 | 2026-07-14 | 12 |
| `DESIGN_SYSTEM_GUIDE.md` | 186 | 9594 | 2026-06-24 | 1 |
| `README.md` | 174 | 5358 | 2026-07-12 | 7 |
| `ASSET_INTEGRATION_PLAN.md` | 158 | 9114 | 2026-06-24 | 1 |
| `CLAUDE.md` | 103 | 3554 | 2026-06-24 | 1 |
| `QUALITY_CHECKLIST.md` | 103 | 3234 | 2026-06-24 | 1 |
| `WAVE0_REPORT.md` | 100 | 7463 | 2026-06-24 | 1 |
| `METADATA_COVERAGE_AUDIT.md` | 98 | 8274 | 2026-07-25 | 2 |
| `RELEASE_PLAN.md` | 39 | 2830 | 2026-07-25 | 1 |

### W2 · `packages/core/catalog/*.audit.md` (44건)

| 경로 | 줄 | 바이트 | 최종 커밋 | 커밋 수 |
|---|---:|---:|---|---:|
| `packages/core/catalog/features.audit.md` | 66 | 2656 | 2026-06-27 | 1 |
| `packages/core/catalog/testimonials.audit.md` | 65 | 2698 | 2026-06-27 | 1 |
| `packages/core/catalog/card.audit.md` | 59 | 2829 | 2026-06-27 | 1 |
| `packages/core/catalog/dialog.audit.md` | 59 | 4096 | 2026-06-27 | 1 |
| `packages/core/catalog/chip-tag.audit.md` | 57 | 2846 | 2026-06-27 | 1 |
| `packages/core/catalog/radio-group.audit.md` | 57 | 4430 | 2026-06-27 | 1 |
| `packages/core/catalog/popover.audit.md` | 55 | 4190 | 2026-06-27 | 1 |
| `packages/core/catalog/checkbox.audit.md` | 53 | 3075 | 2026-06-27 | 1 |
| `packages/core/catalog/empty-state.audit.md` | 51 | 3312 | 2026-06-27 | 1 |
| `packages/core/catalog/tooltip.audit.md` | 51 | 2911 | 2026-06-27 | 1 |
| `packages/core/catalog/file-upload.audit.md` | 50 | 3165 | 2026-06-27 | 1 |
| `packages/core/catalog/badge.audit.md` | 49 | 1800 | 2026-06-27 | 1 |
| `packages/core/catalog/textarea.audit.md` | 49 | 2767 | 2026-06-27 | 1 |
| `packages/core/catalog/carousel.audit.md` | 48 | 3633 | 2026-06-27 | 1 |
| `packages/core/catalog/date-picker.audit.md` | 47 | 4357 | 2026-06-27 | 1 |
| `packages/core/catalog/link.audit.md` | 47 | 3368 | 2026-06-27 | 1 |
| `packages/core/catalog/menu.audit.md` | 47 | 4127 | 2026-06-27 | 1 |
| `packages/core/catalog/toggle.audit.md` | 46 | 2812 | 2026-06-27 | 1 |
| `packages/core/catalog/pagination.audit.md` | 45 | 2594 | 2026-06-27 | 1 |
| `packages/core/catalog/form.audit.md` | 44 | 2821 | 2026-06-27 | 1 |
| `packages/core/catalog/spinner-loader.audit.md` | 44 | 3250 | 2026-06-27 | 1 |
| `packages/core/catalog/number.audit.md` | 43 | 2298 | 2026-06-27 | 1 |
| `packages/core/catalog/tabs.audit.md` | 43 | 2953 | 2026-06-27 | 1 |
| `packages/core/catalog/input.audit.md` | 41 | 2353 | 2026-06-27 | 1 |
| `packages/core/catalog/accordion.audit.md` | 40 | 4075 | 2026-06-27 | 1 |
| `packages/core/catalog/ai-chat.audit.md` | 40 | 3700 | 2026-06-27 | 1 |
| `packages/core/catalog/footer.audit.md` | 40 | 4327 | 2026-06-27 | 1 |
| `packages/core/catalog/sign-in.audit.md` | 40 | 2253 | 2026-06-27 | 1 |
| `packages/core/catalog/button.audit.md` | 39 | 2380 | 2026-06-27 | 1 |
| `packages/core/catalog/clients.audit.md` | 39 | 3641 | 2026-06-27 | 1 |
| `packages/core/catalog/navbar.audit.md` | 39 | 4173 | 2026-06-27 | 1 |
| `packages/core/catalog/pricing-section.audit.md` | 39 | 3874 | 2026-06-27 | 1 |
| `packages/core/catalog/map.audit.md` | 38 | 3432 | 2026-06-27 | 1 |
| `packages/core/catalog/notification.audit.md` | 38 | 2917 | 2026-06-27 | 1 |
| `packages/core/catalog/select.audit.md` | 38 | 2566 | 2026-06-27 | 1 |
| `packages/core/catalog/signup.audit.md` | 37 | 3280 | 2026-06-27 | 1 |
| `packages/core/catalog/dock.audit.md` | 36 | 4570 | 2026-06-27 | 1 |
| `packages/core/catalog/calendar.audit.md` | 35 | 3879 | 2026-06-27 | 1 |
| `packages/core/catalog/announcement.audit.md` | 34 | 3818 | 2026-06-27 | 1 |
| `packages/core/catalog/avatar.audit.md` | 34 | 1883 | 2026-06-27 | 1 |
| `packages/core/catalog/table.audit.md` | 34 | 2408 | 2026-06-27 | 1 |
| `packages/core/catalog/gallery.audit.md` | 32 | 1888 | 2026-06-27 | 1 |
| `packages/core/catalog/video.audit.md` | 31 | 3023 | 2026-06-27 | 1 |
| `packages/core/catalog/hero.audit.md` | 30 | 2546 | 2026-06-27 | 1 |

### W3 · `packages/core` 그 외 (7건)

| 경로 | 줄 | 바이트 | 최종 커밋 | 커밋 수 |
|---|---:|---:|---|---:|
| `packages/core/style-guide-catalog.md` | 581 | 101518 | 2026-07-23 | 8 |
| `packages/core/motion-catalog.md` | 301 | 18028 | 2026-06-24 | 1 |
| `packages/core/COMPONENT_CATALOG.md` | 271 | 19991 | 2026-06-27 | 12 |
| `packages/core/design-trends-2020-2026.md` | 168 | 16558 | 2026-06-30 | 1 |
| `packages/core/MOTION_QUALITY_CHECKLIST.md` | 111 | 5165 | 2026-06-30 | 2 |
| `packages/core/src/motion/README.md` | 90 | 4774 | 2026-06-30 | 2 |
| `packages/core/README.md` | 15 | 848 | 2026-08-14 | 1 |

### W4 · `packages/visualization` + 나머지 패키지·앱·기타 (19건)

| 경로 | 줄 | 바이트 | 최종 커밋 | 커밋 수 |
|---|---:|---:|---|---:|
| `sample_design/DESIGN-amber.md` | 634 | 39726 | 2026-06-23 | 1 |
| `packages/visualization/viz-style-expansion.md` | 380 | 33394 | 2026-07-24 | 2 |
| `packages/visualization/visualization-type-inventory.md` | 376 | 38896 | 2026-07-24 | 11 |
| `packages/visualization/style-classification.md` | 251 | 22665 | 2026-07-24 | 4 |
| `packages/visualization/PLAN.md` | 238 | 30028 | 2026-07-24 | 7 |
| `packages/visualization/visualization-catalog.md` | 225 | 18424 | 2026-07-24 | 6 |
| `packages/style-guide-catalog/METADATA_STRATEGY.md` | 155 | 11402 | 2026-07-25 | 8 |
| `packages/visualization/README.md` | 132 | 6373 | 2026-08-14 | 1 |
| `diagram-references/README.md` | 107 | 5465 | 2026-07-12 | 1 |
| `packages/foundations/FOUNDATION_METADATA_STRATEGY.md` | 102 | 8208 | 2026-07-25 | 2 |
| `packages/visualization/TYPE_METADATA_STRATEGY.md` | 96 | 7507 | 2026-07-25 | 2 |
| `apps/storybook/README.md` | 73 | 2425 | 2026-06-20 | 1 |
| `_templates/CHECKLIST_INSTANCE.template.md` | 41 | 1687 | 2026-06-24 | 1 |
| `_templates/README.md` | 37 | 1931 | 2026-06-24 | 1 |
| `packages/visualization-style-guide-catalog/README.md` | 25 | 1225 | 2026-08-14 | 1 |
| `packages/tokens/README.md` | 21 | 1160 | 2026-08-14 | 1 |
| `packages/foundations/README.md` | 18 | 847 | 2026-08-14 | 1 |
| `packages/style-guide-catalog/README.md` | 15 | 867 | 2026-08-14 | 1 |
| `packages/hooks/README.md` | 12 | 598 | 2026-08-14 | 1 |
## 4. 판정 규칙 (S3 이 적용한다)

**세 축을 먼저 잰다.**

| 축 | 기호 | 값 | 재는 법 |
|---|---|---|---|
| inbound 참조 | `R` | 정수 | 이 문서를 경로·파일명으로 부르는 곳의 수. 코드·다른 md·`CLAUDE.md`·스킬·`package.json`·스토리 전부 |
| 성격 | `K` | `상시` \| `일회성` | 상시 = 규율·계약·레퍼런스처럼 계속 읽히는 것. 일회성 = 특정 시점의 계획·감사·리포트 |
| 중복 | `D` | 흡수처 경로 \| 없음 | 같은 내용을 더 최신·더 권위 있게 다루는 다른 문서 |

**판정은 넷 + 보류. 위에서부터 먼저 걸리는 것을 쓴다(우선순위 규칙).**

1. **존치 — 계약 문서면 무조건.** 도구·규율이 읽는 문서다: `CLAUDE.md`, `QUALITY_CHECKLIST.md`,
   루트 `README.md`, 패키지 `README.md`, `_templates/*`. `R`·`K`·`D` 를 안 본다.
2. **통합 — `D` 가 있으면.** 흡수처 경로를 **반드시** 함께 적는다. "어디로"가 없으면 통합이 아니라
   폐기이고, 그건 다른 판정이다.
3. **폐기 — `R=0` 이고 `K=일회성` 이고 그 시점이 지났으면.** 시점이 지났다는 것은 그 계획·감사가
   가리키는 작업이 끝났다는 뜻이고, `KANBAN.md` 완료 컬럼에서 확인한다.
4. **이관 — 내용은 유효한데 자리가 틀렸으면.** 루트에 있는데 특정 패키지 문서이거나 그 반대.
   목적지 경로를 함께 적는다.
5. **존치 — 위 넷에 안 걸리는 나머지.**
6. **보류 — 규칙으로 안 갈리면.** 사유를 적는다. S3 종료 시 `보류` 는 0건이어야 한다
   (안 갈리면 그 자리에서 원문을 열어 닫는다).

**안전 규칙 둘. 이걸 어기면 지운 뒤에 레포가 깨진다.**

- `폐기`·`이관`·`통합` 인데 `R≥1` 이면 **판정 옆에 "지우기 전에 고칠 곳"을 참조원 경로:줄로 적는다.**
  안 적혀 있으면 그 판정은 미완성이다.
- **근거를 못 대면 `존치`다.** "오래됐다"만으로는 아무것도 지우지 않는다. `K=일회성` 과
  "그 시점이 지났다"가 둘 다 서야 폐기가 선다.

**`README.md` 는 판정 대상이지만 이 카드가 손대지 않는다** — `KAN-045`(README 활용 사례별 재작성)의
범위다. 판정은 `존치`(계약 문서)로 고정하고, 정리 대상에서 뺀다.

## 5. 배치2 워커 계약 (프롬프트에 그대로 동봉한다)

**워커는 판정을 내지 않는다. 사실만 낸다.** 판정 규칙을 주는 것은 무엇을 사실로 모아야 하는지
알리기 위해서다. 구획을 가로지르는 중복은 워커가 볼 수 없으므로(자기 구획만 본다) 판정은
S3 이 한자리에서 한다.

파일마다 다음 다섯을 반환한다.

| 필드 | 무엇 |
|---|---|
| `path` | 경로 |
| `refs` | inbound 참조 수 + 참조원 `경로:줄` 최대 5개. 0건이면 `0` |
| `gist` | 원문 요지 1~2줄. 무엇이 적혀 있는가 |
| `kind` | `상시` 또는 `일회성` + 그렇게 본 근거 한 조각(제목·머리말 문구) |
| `dup` | 같은 내용을 다루는 다른 문서 경로. **자기 구획 밖도 적는다.** 없으면 `없음` |

참조 조회는 파일명(확장자 포함)과 확장자 없는 이름 둘 다로 레포 전역을 훑는다.
자기 자신과 `KANBAN/`·`.kanban/` 안의 언급은 참조로 세지 않는다(칸반 메모는 참조가 아니다).

---

# S3 산출물 — 판정 79건

## 6. 규칙 보정 하나 (S3 에서 확정)

S1 규칙 2번 「`D` 가 있으면 통합」을 그대로 쓰면 **일부만 겹치는 문서가 통째로 통합 대상**이 된다.
`METADATA_COVERAGE_AUDIT.md` 가 그 경우다 — 98줄 중 겹치는 것은 §2-2 한 문단이고 나머지는 유일본이다.
그래서 규칙 2번을 둘로 가른다.

- **전체 통합** — 문서의 남는 가치가 흡수처에 전부 들어갈 때. 원본은 사라진다.
- **부분 통합** — 겹치는 절만 흡수처로 보내고 그 자리에 링크를 둔다. 원본은 남는다 → 판정은 `존치`이고
  「겹침 정리」를 따로 적는다.

이 보정으로 `보류` 0건이 됐다.

## 7. 판정 집계

| 판정 | 건수 | 비고 |
|---|---:|---|
| 존치 | 27 | 그중 8건은 「겹침 정리」 또는 「실측 수정」이 따라붙는다 |
| 통합 | 49 | **44건은 `catalog/*.audit.md` 묶음 1건**이므로 실제 통합 작업은 6건 |
| 이관 | 0 | 자리가 틀린 문서는 없었다 |
| 폐기 | 3 | 전부 참조 0건이거나 참조원이 함께 사라진다 |
| 보류 | 0 | |
| **합** | **79** | |

## 8. 판정 — 루트 9건

| 문서 | R | K | 판정 | 근거 | 지우기 전에 고칠 곳 |
|---|---:|---|---|---|---|
| `CLAUDE.md` | 5 | 상시 | **존치** | 계약 문서(규칙 1) | — (본문 수정만: 56–63행 `packages/theme-*` 4종 부재, 패키지 5개 누락, `test:unit` 누락) |
| `QUALITY_CHECKLIST.md` | 10 | 상시 | **존치** | 계약 문서. 템플릿 코드 2개가 조항으로 인용 | — (본문 수정만: 59–62행 `packages/theme-*/src/theme.ts` 4경로 부재, 15행 "5개 테마") |
| `README.md` | 0 | 상시 | **존치** | 계약 문서(레포 대문). **KAN-045 소관이라 이 카드는 손대지 않는다** | — (수치 3건 74→76·24→51·26→25 는 KAN-045 로 넘김) |
| `DESIGN_SYSTEM_GUIDE.md` | 6 | 상시 | **존치** | `blocks/index.ts:5`·`patterns/index.ts:5` 가 계층 정의 출처로 지목. `COMPONENT_CATALOG.md:42` 가 상위로 위임 | — (본문 수정: 170행 `packages/theme-*`) |
| `METADATA_COVERAGE_AUDIT.md` | 4 | 혼합 | **존치**(부분 통합) | 세 전략 문서가 상위 포인터로 지목. §4 재감사 절차를 `metadataCoverage.test.ts` 가 집행 | 겹침 정리: §2-2 파일럿 관찰 문단 → `FOUNDATION_METADATA_STRATEGY.md` §7 로 단일화하고 링크로 대체 |
| `ORDER.md` | 1 | 일회성(동결) | **존치** | **`결과:` 상세 서술이 유일본이다** — KANBAN 카드 메모는 1줄로 압축돼 있어 지우면 ORD-001~011 실행 결과가 소실된다. 안전 규칙 2("근거를 못 대면 존치")에 걸린다 | — (전환 공지·봉인 마커가 이미 있어 추가 조치 없음) |
| `ASSET_INTEGRATION_PLAN.md` | 2 | 일회성 | **통합** | Wave 0~5 전부 DONE(`COMPONENT_CATALOG.md:179-210`), 실측 blocks 13·patterns 4·hooks 31 존재. 실행 결과는 이미 CC 레지스트리에 있다 | 흡수처 `packages/core/COMPONENT_CATALOG.md` — 위임 모델·leaf 계약 요지만 3~5줄. 고칠 곳: `DESIGN_SYSTEM_GUIDE.md:182` |
| `WAVE0_REPORT.md` | 1 | 일회성 | **통합** | "Wave 0 시범 실행 리포트", Wave 1~5 전부 DONE. 산출물 표는 `CC:181-187` 과 중복 | 흡수처 `packages/core/COMPONENT_CATALOG.md` — **토큰 갭 감사(breakpoint 가 cssVar 토큰이 될 수 없다)만 살린다**. 고칠 곳: `COMPONENT_CATALOG.md:181` |
| `RELEASE_PLAN.md` | **0** | 일회성 | **폐기** | KAN-036 산출물이고 KAN-036 완료. 버전표 7행이 **전부 지나감**(tokens 1.2.0→실측 1.3.0 등), `.changeset/` changeset **0건** = 소진. 자기 선언 SSOT 가 `.changeset/*.md` | 없음(참조 0) |

## 9. 판정 — `packages/core/catalog/*.audit.md` 44건

**판정: 통합 (44 → 1)** · 흡수처 `packages/core/catalog/SATURATION_AUDIT.md`(신설)

| 축 | 값 |
|---|---|
| `R` | **파일 단위 44개 전부 0건.** 글롭 단위 3행 — `COMPONENT_CATALOG.md:234`·`:248`·`packages/core/CHANGELOG.md:136`. 코드의 readdir/glob/`?raw` 접근 0. npm 미포함 |
| `K` | **일회성** — 43개에 `Saturation round: 1 (pilot)`, round 2 파일 0건. 커밋 6개 전부 2026-06-27 이후 무변경. CC wave 표 `═══ 포화 완료 ═══` |
| `D` | `COMPONENT_CATALOG.md:230-262` 와 **채택 멤버 이름 86종만** 겹친다 |

**폐기가 아니라 통합인 이유**: `absorbed`/`noise`/`dropped` 후보의 **기각 사유가 유일본**이다. 파일 분량의
절반이 그것이고 다른 어디에도 없다. "왜 이 variant 는 안 넣었는가"를 지우면 같은 후보가 다음 라운드에
다시 올라온다. 반대로 **개별 파일로 남을 이유는 없다** — 개별 참조가 0이고 44개가 같은 라운드 산출물이다.

지우기 전에 고칠 곳:
- `packages/core/COMPONENT_CATALOG.md:234` · `:248` — 글롭 표기를 새 단일 문서로
- `packages/core/CHANGELOG.md:136` — **고치지 않는다.** 과거 릴리스 시점의 사실 기록이다

**대안(존치)**: 44개를 그대로 두는 것도 성립한다. `catalog/` 하위라 루트를 어지럽히지 않고, 통합 작업 자체가
44개 파일을 읽어 접는 비용이다. 유저가 파일 수보다 작업 비용을 중히 보면 이쪽이다.

## 10. 판정 — `packages/core` 그 외 7건

| 문서 | R | K | 판정 | 근거 | 고칠 곳 |
|---|---:|---|---|---|---|
| `style-guide-catalog.md` | 20 | 상시 | **존치(동결)** | **38–92줄이 자동 생성 구간**(`gen:trend-table`). 이동·개명·삭제하면 `trendTable.test.ts` 가 `readFileSync` 에서 깨진다 | 손대지 않는다 |
| `motion-catalog.md` | 15 | 상시 | **존치** | `CLAUDE.md:46` 이 기록 대상으로 지정한 계약 문서 | — |
| `COMPONENT_CATALOG.md` | 7 | 혼합 | **존치** | 코드 3곳(`blocks`·`patterns`·`shaders/index.ts`)이 분류 출처로 지목 | 본문 수정 2건: 246행 "43 카테고리"→**44**, 256행이 지목하는 audit 7종(Slider·ScrollArea·Sidebar·TreeView·Text·CTA·Comparison)은 **존재하지 않는다** |
| `MOTION_QUALITY_CHECKLIST.md` | 15 | 상시 | **존치** | `CLAUDE.md:45` 지정. `QUALITY_CHECKLIST.md:78` 이 D절을 전량 위임 | — |
| `src/motion/README.md` | 8 | 상시 | **존치** | 코드 옆 "how" 문서. 참조 8건이 전부 자기 구획 안이지만 그것이 이 문서의 자리다 | 겹침 정리: 같은 워크플로가 **5곳**(이 파일·MOTION_QUALITY_CHECKLIST·motion-catalog §6·CLAUDE.md §4·QUALITY_CHECKLIST)에 기술 |
| `README.md` | **0** | 상시 | **존치** | `package.json` `files:["dist","README.md"]` = **npm 발행물**. 참조 0 이 "안 읽힘"이 아닌 경우 | — |
| `design-trends-2020-2026.md` | 3 | **일회성** | **통합** | 129행 "#24–28 후보로 정식 등재 완료" = **도출 목적 소진**. §C 5종 명세는 `style-guide-catalog.md` #24–28 로 흡수 완료 | 흡수처 `packages/core/style-guide-catalog.md` — 2020–2025 연도별 목록과 출처 3링크만 출처 절로. 고칠 곳: `style-guide-catalog.md:94`, `packages/style-guide-catalog/src/index.ts:46`(주석). `ORDER.md:269` 는 동결이라 안 고침 |

## 11. 판정 — visualization + 나머지 19건

| 문서 | R | K | 판정 | 근거 | 고칠 곳 |
|---|---:|---|---|---|---|
| `viz/style-classification.md` | **26** | 상시 | **존치** | `packages/tokens/src/styleGuideMeta.ts:18,31` 이 `STYLE_FAMILIES` union 근거로 인용. 가이드 소스 8종이 "근거: F#" 로 인용 | — (§4-f/g/h 중복은 아래 `visualization-catalog` 쪽에서 정리) |
| `viz/visualization-type-inventory.md` | 21 | 상시 | **존치** | `package.json:24` `files` = **npm 동봉**. `typeMeta/registry.ts:4` 가 코드에서 SSOT 선언 | — |
| `viz/TYPE_METADATA_STRATEGY.md` | 15 | 상시 | **존치** | `package.json:25` `files` = npm 동봉. `types.ts:11` 이 코드에서 계약 명시 | — |
| `style-guide-catalog/METADATA_STRATEGY.md` | 13 | 상시 | **존치** | 코드 4곳이 **조항 번호로** 인용(`select.ts:4` "§6 소비 흐름 2단계") | 본문 수정: §7 롤아웃 표의 KAN-026·027 이 📋 인데 둘 다 완료 |
| `viz/viz-style-expansion.md` | 8 | 일회성 | **존치** | K 는 일회성이나 **viz-sg-catalog 소스 7종이 저작 근거로 인용**한다. 지우면 7개 가이드의 근거가 끊긴다 | — |
| `viz/README.md` | 3 | 상시 | **존치** | npm 진입 문서. `src/index.ts:28`·`tsup.config.ts:21` 이 지목 | 겹침 정리: 두 축 직교 표가 `viz-sg-catalog/README.md` 와 거의 동일 → 한쪽을 링크로 |
| `foundations/FOUNDATION_METADATA_STRATEGY.md` | 5 | 상시 | **존치** | 코드 2곳이 지목. 3종 중 유일하게 롤아웃 표가 최신 | §7 이 `METADATA_COVERAGE_AUDIT` §2-2 의 흡수처가 된다(위 8절) |
| `diagram-references/README.md` | 2 | 상시(자산 인덱스) | **존치** | 이미지 **88장이 실재**하고 폴더·파일명 규칙을 설명하는 유일 문서 | — (4스타일 분류는 `style-classification.md` 가 기각했다는 주석 1줄 권장) |
| `_templates/README.md` | 1(+디렉터리 4) | 상시 | **존치** | **Storybook `meta.title` 계층 표의 유일 소재지** | 본문 수정: `Atoms/`·`Molecules/` 규약이 ORD-003 재편(`ARCHETYPE`/`DIAGRAM`/`STYLE GUIDE CATALOG`) 후 구조와 어긋남 |
| `_templates/CHECKLIST_INSTANCE.template.md` | 2 | 상시(템플릿) | **존치** | `QUALITY_CHECKLIST.md` 복사 양식 | 본문 수정 2건: "5개 테마(light/dark/high-contrast/amber-light/amber-dark)" 부재 · "Wave 0\|1\|…\|6"·"21st 출처 카테고리" 가 현행 KAN-### 체계와 다름 |
| 패키지 README 5개 — `tokens`·`foundations`·`hooks`·`style-guide-catalog`·`visualization-style-guide-catalog` | 각 1 | 상시 | **존치** ×5 | 전부 `package.json` `files` 등재 = **npm 배포 진입 문서**. 참조가 `files` 하나뿐인 것이 정상이다 | — |
| `viz/PLAN.md` | 4 | **혼재** | **통합** | §E Phase 0~8 전부 완료. §A/§B 본문 전체가 구 명칭(`packages/diagram`·`dvar()`·`DiagramProvider`). **"이연" 3항목이 전부 완료(KAN-010~016)인데 미갱신이라 §D 인라인 노트와 자기모순** | 흡수처: §C-2 공통 계약 → `packages/visualization/README.md`. **`type-inventory.md:13` 의 "구현 스펙 SSOT" 지위를 함께 옮긴다.** 고칠 곳: `type-inventory.md:13,30,369` · `visualization-catalog.md:43` |
| `viz/visualization-catalog.md` | 11 | 일회성 | **통합** | §1-b·§1-c·§2-a 가 스스로 3곳에서 "type-inventory Registry 에 **흡수됨**"이라 자기 무효를 선언. 148행이 "근거·경계는 style-classification 이 우선" 자인 | 흡수처: §4 스타일 스펙 → `style-classification.md` 로 단일화. 고칠 곳: `type-inventory.md:12,14,29,343,369` · `style-classification.md:4` · `viz/README.md:128` · `PLAN.md:10,34`(PLAN 도 통합 대상이라 함께 사라짐). `ORDER.md:103,293` 은 동결이라 안 고침 |
| `sample_design/DESIGN-amber.md` | **0** | 일회성 | **폐기** | 완전 고아. 값(hex·타이포)은 `packages/foundations/src/amber.ts` 에 **실측 일치로 이미 흡수**됐고 코드가 이 문서를 인용하지 않는다. 원래 **Binance UI 분석 문서**이고 `f510700` 리네임 뒤에도 "Amber's iconic yellow"·가상 폰트 `AmberNova`/`AmberPlex` 잔재가 남아 있다 | 없음(참조 0). `sample_design/` 디렉터리가 통째로 사라진다 |
| `apps/storybook/README.md` | **0** | 해당 없음 | **폐기** | **Vite `react-ts` 스톡 템플릿 원문 그대로**("# React + TypeScript + Vite"). bbangto-ui·Storybook·play 언급 0. 19개 중 유일하게 초기 커밋 이후 무수정. `private: true` 라 미배포 | 없음(참조 0). 대안: 지우는 대신 Storybook 실행법으로 **재작성** |

## 12. 이 카드가 판정하지 않은 것

- **`packages/*/CHANGELOG.md` 8개 + `.changeset/README.md`** — changesets 도구 소유. 사람이 정리할 대상이 아니다
- **`KANBAN.md`·`.kanban/log.md`·`KANBAN/**`** — manage-kanban 스킬 소유
- **`README.md` 본문** — `KAN-045` 소관
- **실제 삭제·통합 커밋** — 후속 카드의 몫(S5)

---

# S5 산출물 — 정리 실행 계획

**이 카드는 아무것도 지우지 않는다.** 아래는 실행 지시가 아니라 **후속 카드 분해안**이고, 실제 등록은
유저 승인 뒤에 `add` 로 한다.

## 13. 후속 카드 후보 4장

루트 카드는 상호 독립이어야 하므로 **`scope` 가 겹치지 않게** 갈랐다. 판정 79건이 넷으로 전부 들어간다.

### A · 폐기 3건 집행

| | |
|---|---|
| `scope` | `RELEASE_PLAN.md`, `sample_design/**`, `apps/storybook/README.md` |
| 하는 일 | 폐기 판정 3건을 실제로 지운다. `sample_design/` 은 디렉터리째 사라진다 |
| 선행 수정 | **없다** — 세 파일 전부 inbound 참조 0건 |
| 되돌리기 | `git revert` 한 번. 파일 삭제만이라 충돌 지점이 없다 |
| 크기 | work 1~2개. 4.7 「인스턴트 예외」 대상 |
| 갈림길 | `apps/storybook/README.md` 는 **지우는 대신 Storybook 실행법으로 재작성**할 수 있다. 지금 것은 Vite 스톡 템플릿 원문이라 어느 쪽이든 현재 내용은 남지 않는다 |

### B · core 카탈로그 계열 통합

| | |
|---|---|
| `scope` | `packages/core/catalog/**`, `packages/core/COMPONENT_CATALOG.md`, `packages/core/design-trends-2020-2026.md`, `packages/core/style-guide-catalog.md`, `packages/style-guide-catalog/src/index.ts`, `ASSET_INTEGRATION_PLAN.md`, `WAVE0_REPORT.md` |
| 하는 일 | ① audit 44 → `SATURATION_AUDIT.md` 1개로 접기 ② `ASSET_INTEGRATION_PLAN`·`WAVE0_REPORT` 를 `COMPONENT_CATALOG` 로 통합(토큰 갭 감사만 살림) ③ `design-trends-2020-2026` 을 `style-guide-catalog.md` 출처 절로 통합 ④ `COMPONENT_CATALOG` 결함 2건 수정(43→44, 없는 audit 7종 문장) |
| 선행 수정 | `COMPONENT_CATALOG.md:181,234,248` · `packages/style-guide-catalog/src/index.ts:46`(주석) · `style-guide-catalog.md:94` |
| **위험** | **`packages/core/style-guide-catalog.md` 38–92줄은 자동 생성 구간이다.** 그 줄을 건드리면 `trendTable.test.ts` 가 red 가 된다. 출처 절은 그 밖이므로 안전하지만, 파일을 **이동·개명·삭제하면** 테스트가 `readFileSync` 에서 깨진다 |
| 되돌리기 | 44개 파일 접기가 한 커밋이면 revert 로 복원된다. work 단위로 태그를 단다 |
| 크기 | work 4개. 배치 1~2개 |

### C · visualization 계열 통합

| | |
|---|---|
| `scope` | `packages/visualization/**`, `packages/visualization-style-guide-catalog/README.md`, `packages/style-guide-catalog/METADATA_STRATEGY.md` |
| 하는 일 | ① `PLAN.md` 통합 — §C-2 공통 계약을 `viz/README.md` 로 옮기고 **`type-inventory.md:13` 의 "구현 스펙 SSOT" 지위도 함께 이동** ② `visualization-catalog.md` 통합 — §4 스타일 스펙을 `style-classification.md` 로 단일화 ③ 두 축 직교 표 중복 해소(`viz/README` ↔ `viz-sg-catalog/README` 중 한쪽을 링크로) ④ `METADATA_STRATEGY.md` §7 롤아웃 표 stale 수정(KAN-026·027) |
| 선행 수정 | `type-inventory.md:12,13,14,29,30,343,369` · `style-classification.md:4` · `viz/README.md:128` |
| **위험** | `visualization-catalog.md` 는 참조가 11건으로 통합 대상 중 가장 많다. **`type-inventory.md` 만 5곳에서 가리킨다** — 링크를 한 번에 다 고치지 않으면 SSOT 체인이 끊긴다 |
| 되돌리기 | 문서 편집만이라 revert 안전 |
| 크기 | work 4개. 배치 1~2개 |

### D · 규율 문서 실측 정합 (B 의 **후행**)

| | |
|---|---|
| `scope` | `CLAUDE.md`, `QUALITY_CHECKLIST.md`, `DESIGN_SYSTEM_GUIDE.md`, `_templates/**`, `packages/core/MOTION_QUALITY_CHECKLIST.md`, `packages/core/src/motion/README.md`, `packages/core/motion-catalog.md`, `METADATA_COVERAGE_AUDIT.md`, `packages/foundations/FOUNDATION_METADATA_STRATEGY.md` |
| 하는 일 | ① `packages/theme-*` 4종 부재를 3문서에서 일괄 수정(`CLAUDE.md:56-63`·`QUALITY_CHECKLIST.md:59-62,15`·`DESIGN_SYSTEM_GUIDE.md:170`) ② `_templates` drift 2건(5개 테마 표기·Wave 어휘·Storybook title 규약) ③ 모션 워크플로 **5중 기재** 단일화 ④ `METADATA_COVERAGE_AUDIT` §2-2 → `FOUNDATION_METADATA_STRATEGY` §7 부분 통합 |
| 선행 수정 | `DESIGN_SYSTEM_GUIDE.md:182` — **B 가 `ASSET_INTEGRATION_PLAN.md` 를 없앤 뒤에 고쳐야 한다** |
| 되돌리기 | 문서 편집만. 다만 `CLAUDE.md` 는 에이전트 규율이라 잘못 고치면 이후 모든 작업에 번진다 — work 단위로 태그 |
| 크기 | work 4개. 배치 1~2개 |

## 14. 루트 독립성 판정

| 쌍 | `scope` 겹침 | 처리 |
|---|---|---|
| A ↔ B, A ↔ C, A ↔ D | 없음 | 병렬 |
| B ↔ C | 없음 — B 는 `packages/style-guide-catalog/src/index.ts`, C 는 같은 패키지의 `METADATA_STRATEGY.md`. 다른 파일 | 병렬 |
| C ↔ D | 없음 | 병렬 |
| **B ↔ D** | **`DESIGN_SYSTEM_GUIDE.md`** — B 는 :182(`ASSET_INTEGRATION_PLAN` 링크 제거), D 는 :170(`packages/theme-*`) | **직렬 중재 · B 선행** |
| A~D ↔ **`KAN-045`**(README 재작성) | **없음** — `README.md` 를 건드리는 카드가 A~D 에 하나도 없다 | 병렬 |

**B ↔ D 를 직렬로 두는 이유**: 줄이 달라 git 병합으로는 붙지만, D 가 먼저 돌면 :182 가 아직 살아 있는
`ASSET_INTEGRATION_PLAN` 을 가리켜 고칠 것이 없고, B 가 나중에 그 파일을 없애면 **링크가 깨진 채로 남는다.**
같은 이유로 `scope` 를 갈라 겹침을 없애는 「스코프 조정」은 안 된다 — `packages/theme-*` 수정 3건은 한 클래스라
쪼개면 같은 지적이 두 카드로 갈린다.

```
python3 <스킬>/scripts/kanban.py dep-serialize <root> --pair <B>,<D> --first <B> \
    --reason "DESIGN_SYSTEM_GUIDE.md 를 둘 다 고친다. B 가 ASSET_INTEGRATION_PLAN 을 없애야 D 가 :182 링크를 고칠 수 있고, 순서가 뒤면 깨진 링크가 남는다"
```

## 15. 리스크 — 지우면 깨지는 자리

| 위험 | 어디 | 막는 법 |
|---|---|---|
| **CI red** | `packages/core/style-guide-catalog.md` 를 이동·개명·삭제하면 `packages/style-guide-catalog/src/trendTable.test.ts` 가 `readFileSync` 에서 깨진다. 38–92줄 수기 편집도 sync 테스트가 red | B 에서 이 파일은 **출처 절만** 손댄다. 파일 자체는 존치(동결) |
| **코드 주석 고아** | `blocks/index.ts:5`·`patterns/index.ts:5` → `DESIGN_SYSTEM_GUIDE.md` · `styleGuideMeta.ts:18,31` → `style-classification.md` · `typeMeta/registry.ts:4` → `type-inventory.md` | 셋 다 **존치** 판정이라 문제 없음. 통합 대상이 이 목록에 없는지 매번 대조 |
| **npm 배포물 유실** | `packages/visualization/package.json` `files` 가 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 를 포함 | 둘 다 존치 판정 |
| **SSOT 체인 단절** | C 에서 `PLAN.md`·`visualization-catalog.md` 를 없앨 때 `type-inventory.md` 의 5개 링크를 한 번에 안 고치면 SSOT 지목이 허공을 가리킨다 | C 의 완료 기준에 "`type-inventory.md` grep 결과 0건" 을 넣는다 |
| **기각 사유 소실** | audit 44개를 폐기하면 `absorbed`/`noise`/`dropped` 후보의 기각 논거가 영구 소실된다 | 폐기가 아니라 **통합**으로 판정한 이유. 접을 때 Tally 전량을 옮긴다 |
| **동결 문서 오편집** | `ORDER.md` 는 봉인 마커가 있고 `visualization-type-inventory.md:376` 이 "편집 금지"라 적는다 | A~D 어느 `scope` 에도 `ORDER.md` 를 넣지 않았다 |
| **CLAUDE.md 오수정 번짐** | D 가 에이전트 규율을 고친다 | work 단위 태그. 게이트 명령 4종은 손대지 않고 구조도·경로만 고친다 |

## 16. 정리 후 문서 수

| | 지금 | 정리 후 | 왜 |
|---|---:|---:|---|
| 존치 | 27 | 27 | 그대로 남는다 |
| `packages/core/catalog/*.audit.md` | 44 | 1 | 한 파일로 접는다 |
| 통합 흡수(파일이 사라짐) | 5 | 0 | `ASSET_INTEGRATION_PLAN`·`WAVE0_REPORT`·`design-trends-2020-2026`·`viz/PLAN`·`viz/visualization-catalog` |
| 폐기 | 3 | 0 | `RELEASE_PLAN`·`sample_design/DESIGN-amber`·`apps/storybook/README` |
| **판정 모집단 합** | **79** | **28** | 27 + 1 |
| 루트 마크다운(기계 소유 제외) | 9 | 6 | 폐기 1 + 통합 2 가 사라진다 |

44 → 1 이 감소분의 대부분이다. **루트는 9 → 6** 이고, 남는 6개는 전부 계약 문서이거나
유일본(`CLAUDE.md`·`QUALITY_CHECKLIST.md`·`README.md`·`DESIGN_SYSTEM_GUIDE.md`·`METADATA_COVERAGE_AUDIT.md`·`ORDER.md`)이다.

> **정정 기록**: 이 표의 「정리 후」가 처음에 35 로 적혀 있었다. 판정별로 다시 세면
> 27(존치) + 1(audit 묶음) = **28** 이다. 집필 워커가 §7 판정 집계와 대조해 잡았다.
