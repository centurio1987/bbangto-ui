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
