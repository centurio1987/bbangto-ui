---
card: KAN-048-R2KW3G
title: 문서 정리 B — core 카탈로그 계열 통합 (audit 44→1 · 일회성 계획 3종 흡수)
created: 2026-08-25
scope: packages/core/catalog/**, packages/core/COMPONENT_CATALOG.md, packages/core/design-trends-2020-2026.md, packages/core/style-guide-catalog.md, packages/style-guide-catalog/src/index.ts, ASSET_INTEGRATION_PLAN.md, WAVE0_REPORT.md, packages/foundations/src/gateDocs.test.ts, packages/foundations/src/gateDocs.ts
---

# KAN-048-R2KW3G — 문서 정리 B — core 카탈로그 계열 통합 (audit 44→1 · 일회성 계획 3종 흡수)

## 전략
<!-- 왜 이 접근인가 · 제약 · 버린 대안. 사람이 자유롭게 편집한다. -->

**출발점은 KAN-044 의 판정이다.** 무엇을 어디로 보낼지는 `KANBAN/reports/KAN-044-3KYT2Q.inventory.md`
§8(루트)·§9(audit 44)·§10(core 그 외)·§13-B 에 이미 정해져 있고 KAN-044 검토에서 승인됐다. 이 카드는 그
판정을 집행한다. 2026-10-06 에 인벤토리가 짚은 줄을 지금 레포와 다시 대조했고 전부 그대로다 —
`COMPONENT_CATALOG.md:181·234·246·248·256` · `style-guide-catalog.md:94` ·
`packages/style-guide-catalog/src/index.ts:46` · `DESIGN_SYSTEM_GUIDE.md:182`.

### 인벤토리 이후에 생긴 참조 하나 — scope 를 넓힌다

KAN-046(게이트 문서 드리프트 검증기)이 인벤토리보다 나중에 들어오면서 `WAVE0_REPORT.md` 를 부르는 자리가
코드에 생겼다.

- `packages/foundations/src/gateDocs.test.ts:44-45` — allowlist 에 `WAVE0_REPORT.md` 를 정확한 경로로 둔다.
- 같은 파일 `:144` — 픽스처 테스트가 그 경로로 「allowlist 문서는 넷이어도 통과」를 확인한다.
- 같은 파일 `:33-38` 머리 주석과 `packages/foundations/src/gateDocs.ts:77-78` 주석 — `WAVE0_REPORT.md`·
  `ASSET_INTEGRATION_PLAN.md` 를 예시로 든다.

WAVE0 를 지우고 allowlist 항목을 남기면 아무것도 걸러내지 않는 항목이 된다. 그 파일 주석이 바로 그것을 막으라고
적어 두었다(「실제로 발화하지 않는 항목을 적어 두면 다음 사람이 잘못 읽는다」). 그래서 두 파일을 scope 에
더하고 함께 고친다. 미완료 루트 카드 중 이 두 파일을 가진 카드는 없다(`dep-check` 로 확인).

### 무엇을 어떻게 접는가

1. **audit 44 → `packages/core/catalog/SATURATION_AUDIT.md` 하나.** 요약하지 않고 이어 붙인다. 파일마다 H1 을
   `## <카테고리>` 절로 한 단계 내리고 그 아래 제목도 한 단계씩 내린다. 맨 위에 색인 표(카테고리·호스트·축)를
   둔다. 요약해서 줄이는 안을 버린 이유는 둘이다 — 기각 사유(absorbed·noise·dropped)가 다른 어디에도 없는
   유일본이고(인벤토리 §9), 요약하면 무엇을 버렸는지 나중에 확인할 길이 없다. 이어 붙이면 「원본 각 줄이 새
   문서에 순서대로 있다」를 스크립트로 확인할 수 있다.
2. **`ASSET_INTEGRATION_PLAN.md`·`WAVE0_REPORT.md` → `COMPONENT_CATALOG.md`.** §5 레지스트리 바로 앞에
   「Wave 실행 기록」 절을 하나 둔다. 옮기는 것은 위임 모델·leaf 계약의 요지 3~5줄과 WAVE0 §0.3 토큰 갭 감사
   (표와 「breakpoint 는 cssVar 토큰이 될 수 없다」 주의)뿐이다. Wave 별 산출물 표는 레지스트리에 이미 있다.
   **게이트 명령 줄(`pnpm …`)은 옮기지 않는다** — `gateDocs` 가 `packages/**/*.md` 를 훑으므로 명령 넷짜리
   목록이 들어오면 `test:unit` 이 빨강이 된다.
3. **`design-trends-2020-2026.md` → `style-guide-catalog.md` 「출처 (조사 근거)」 절(:338).** §B 2020–2025 연도별
   목록과 출처 링크를 옮긴다. 인벤토리는 「출처 3링크만」이라 적었지만, 연도별 목록을 살리면서 그 근거 링크
   15개를 버리면 목록을 확인할 길이 없어진다. 그래서 이미 출처 절에 있는 링크를 뺀 나머지를 전부 옮긴다.
   §A 본문과 §C 는 #24–28 로 흡수가 끝났으므로 옮기지 않는다(문서 129행 「정식 등재 완료」).
4. **`COMPONENT_CATALOG.md` 실측 결함 2건.** `:246` 「43 카테고리」는 W0~W5 행을 더하면 5+9+10+6+10+4=44 이고
   audit 파일 수도 44 다. `:256` 은 포화 7종(Slider·ScrollArea·Sidebar·TreeView·Text·CTA·Comparison)의 흡수
   사유가 「각 감사 매니페스트에 기록」됐다고 하지만 그 7종의 매니페스트는 처음부터 없다.

### 지키는 선

- **`style-guide-catalog.md` 38–92줄은 손대지 않는다.** `gen:trend-table` 자동 생성 구간이고
  `trendTable.test.ts` 가 마커 사이를 생성 결과와 대조한다. 파일 이동·개명도 하지 않는다(`readFileSync`).
- **`DESIGN_SYSTEM_GUIDE.md:182` 는 이 카드에서 고치지 않는다.** KAN-050 의 몫이고, KAN-044 검토 5번에서 유저가
  승인한 직렬 중재(이 카드가 선행)가 그 순서를 정했다. 그래서 이 카드가 병합된 뒤 KAN-050 이 끝날 때까지
  :182 가 없는 파일을 가리킨다. 레포에 링크 검사 게이트는 없어서(`package.json` 전수 확인) CI 는 안 깨진다.
- **`packages/core/CHANGELOG.md:136` 은 고치지 않는다.** 그 릴리스 시점의 사실 기록이다.
- **`packages/style-guide-catalog/src/index.ts` 는 46행 주석만 고친다.** KAN-051 도 이 파일을 고치지만
  (용인 기록 있음) 저쪽은 export 배선이고 이쪽은 주석 한 줄이다.

### 테스트를 먼저 세우는 방법

문서 작업이라 `play` 함수를 붙일 대상이 없다. 대신 work 마다 빨강을 먼저 본다.

- S1 — 무손실 검증 스크립트(scratchpad, 커밋 안 함)를 먼저 돌려 「새 문서 없음」 빨강을 본 뒤 접는다.
- S2 — `gateDocs.test.ts` 에서 WAVE0 항목부터 빼서 `test:unit` 이 `WAVE0_REPORT.md` 위반으로 빨강이 되는 것을
  보고, 흡수·삭제로 초록을 만든다.
- S3 — 흡수 전후로 `trendTable.test.ts` 가 계속 초록인지 본다(깨지면 자동 생성 구간을 건드린 것이다).

### 버린 대안

- **audit 44개 존치** — 인벤토리 §9 가 대안으로 적었지만 KAN-044 검토에서 통합으로 승인됐다.
- **audit 를 요약해서 접기** — 위 1번의 이유로 버렸다.
- **`DESIGN_SYSTEM_GUIDE.md:182` 까지 이 카드에서 고치기** — scope 밖이고 승인된 직렬 순서를 뒤집는다.

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->
- [ ] `S1` audit 44개를 `packages/core/catalog/SATURATION_AUDIT.md` 하나로 무손실 접기 — 색인 표 + 파일마다 `## <카테고리>` 절. `COMPONENT_CATALOG.md:234·248` 의 `catalog/<category>.audit.md` 표기를 새 문서로 고치고 44개를 지운다. 완료 기준: 검증 스크립트가 44개 원본의 모든 줄(제목은 한 단계 내린 형태)이 새 문서에 파일 순서대로 있다고 낸다 · `packages/core/catalog/` 에 파일이 하나만 남는다
- [ ] `S2` `ASSET_INTEGRATION_PLAN.md`·`WAVE0_REPORT.md` 를 `COMPONENT_CATALOG.md` 「Wave 실행 기록」 절로 흡수 — 먼저 `gateDocs.test.ts` allowlist 에서 WAVE0 항목을 빼고 픽스처를 로컬 allowlist 로 바꿔 `test:unit` 빨강을 본다. 그다음 위임 모델 요지·토큰 갭 감사·breakpoint 주의를 옮기고(게이트 명령 줄은 안 옮긴다) `:181` 링크를 고친 뒤 두 파일을 지우고, 주석 두 곳(`gateDocs.test.ts:33-38` · `gateDocs.ts:77-78`)을 실제에 맞춘다. 완료 기준: `@centurio1987/bbangto-ui-foundations` vitest 초록 · 두 파일명 grep 결과가 `DESIGN_SYSTEM_GUIDE.md:182`(KAN-050 몫)와 칸반 기록뿐
- [ ] `S3` `design-trends-2020-2026.md` 를 `style-guide-catalog.md` 「출처 (조사 근거)」 절로 흡수 — §B 연도별 목록 + 아직 없는 출처 링크 전부. `:94` 문구와 `packages/style-guide-catalog/src/index.ts:46` 주석을 출처 절로 돌리고 파일을 지운다. 완료 기준: `trendTable.test.ts` 초록 · `git diff` 가 38–92줄을 건드리지 않음 · 파일명 grep 결과가 칸반 기록뿐
- [ ] `S4` `COMPONENT_CATALOG.md` 결함 2건(`:246` 43→44 · `:256` 없는 매니페스트 문장) + 품질 게이트 5종 + 최종 대조. 완료 기준: 게이트 5종 초록 · 「검증」 절 1~5 전부 통과

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

아래 다섯이 전부 통과해야 끝이다.

1. **무손실 접기** — S1 검증 스크립트가 44/44 를 낸다. 원본 각 파일의 모든 줄이 `SATURATION_AUDIT.md` 의 해당
   절에 같은 순서로 있다(제목 줄은 `#` 하나가 더 붙은 형태로 대조한다).
2. **잔여 참조 0** — 아래 명령의 출력이 `DESIGN_SYSTEM_GUIDE.md:182` 한 줄과
   `packages/core/CHANGELOG.md:136`(과거 릴리스 기록) 한 줄뿐이다.
   ```bash
   grep -rnE "WAVE0_REPORT|ASSET_INTEGRATION_PLAN|design-trends-2020-2026|\.audit\.md" . \
     --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=storybook-static \
     --exclude-dir=KANBAN --exclude-dir=.kanban --exclude=KANBAN.md --exclude=KANBAN.board.html
   ```
3. **자동 생성 구간 무변경** — `git diff main -- packages/core/style-guide-catalog.md` 의 변경 hunk 가 전부
   38–92줄 밖이다.
4. **품질 게이트 5종 초록** — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` ·
   `pnpm test:unit`.
5. **문서 수** — 칸반 산출물을 뺀 마크다운이 착수 시점 90개에서 44개가 된다(47개 삭제, 1개 생성).
   ```bash
   find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" \
     -not -path "*/storybook-static/*" -not -path "./KANBAN/*" -not -path "./.kanban/*" -not -name KANBAN.md | wc -l
   ```

**이 카드가 확인하지 않는 것**: `DESIGN_SYSTEM_GUIDE.md:182` 의 깨진 링크 해소. KAN-050 의 완료 기준이다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-06T00:22 · s:a0ca9d11 — `전략` 섹션 교체
- 2026-10-06T00:22 · s:a0ca9d11 — `실행 계획` 섹션 교체
- 2026-10-06T00:22 · s:a0ca9d11 — `검증` 섹션 교체
