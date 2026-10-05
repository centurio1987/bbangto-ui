---
card: KAN-049-CWBPP6
title: 문서 정리 C — visualization 계열 통합 (PLAN · visualization-catalog 흡수 + SSOT 이동)
created: 2026-08-25
scope: packages/visualization/**, packages/visualization-style-guide-catalog/README.md, packages/style-guide-catalog/METADATA_STRATEGY.md, packages/foundations/src/gateDocs.test.ts
---

# KAN-049-CWBPP6 — 문서 정리 C — visualization 계열 통합 (PLAN · visualization-catalog 흡수 + SSOT 이동)

## 전략
**두 문서를 지우는 일이 아니라, 두 문서가 아직 들고 있는 살아 있는 말을 제자리로 옮기고 그 말을
가리키던 화살표를 같은 커밋에서 돌려놓는 일이다.** 원안은 KAN-044 §13-C
(`KANBAN/reports/KAN-044-3KYT2Q.inventory.md:318`)이고, 착수 시점(2026-10-06) 실측으로 세 군데를 고쳤다.

### 원안에서 바뀐 것 (착수 실측)

1. **참조가 원안보다 많다.** 원안은 파일명 참조 10곳만 셌다. 실제로는 그 밖에 셋이 더 있다.
   - `visualization-type-inventory.md` 의 §10 이어받기 절차(:374·:375·:376)가 파일명 없이 `catalog`·`PLAN` 을 부른다.
     여기에 본문 :15·:77·:159·:327·:335·:345·:359 와, Registry 출처 열에 `catalog §1-b(내부)`·`PLAN §D G5(내부)` 같은
     **출처 코드가 29행**이 더 있다.
   - `style-classification.md:205` 가 `§5-6` 으로 catalog 의 횡단 규칙 6번을 부른다.
   - `packages/foundations/src/gateDocs.test.ts:38` 주석이 `PLAN.md` 를 부른다. 같은 주석 :37 은 KAN-047 이 고친다.
2. **원안 ③(두 축 직교 표 중복)은 전제가 틀렸다.** viz `README.md:41` 의 표는 `dataShape`×`structuralTraits`
   (유형 축 안의 두 필드)이고, viz-sg-catalog `README.md:19` 의 표는 유형×paint 다. 같은 표가 아니다. 겹치는 것은
   「쇼케이스는 페인트 데모다」 한 문장인데, 두 README 가 각자의 npm 첫 화면이라 반복이 정상이다. 그래서 이 카드에서 뺀다.
3. **PLAN.md 에서 옮길 것이 §C-2 하나가 아니다.** 「ORD-008 개편 — 현재 아키텍처」(`PLAN.md:12-31`)와 「확정된 결정」 중
   아직 참인 것(자동 레이아웃·DSL 파서·외부 런타임 의존 없음, 표기 키트이지 의미 검증기가 아님, data/children 규칙과
   `id` 필수, core import 금지)이 다른 어디에도 없다. 안 옮기면 패키지의 설계 원칙이 git 이력에만 남는다.

### 무엇을 어디로

| 원문 | 행선지 | 처리 |
|---|---|---|
| PLAN 「현재 아키텍처」 · 확정 결정(아직 참인 것) · §C-2 | viz `README.md` 새 절 「구현 규약 (구 PLAN §C-2)」 | 주장마다 코드와 대조한다. 낡은 것은 옮기지 않는다 |
| PLAN §A·§B·§C(구 명칭 `diagram`·`dvar`) · §D 완료 노트 · §E · 검증(diagram 패키지) | 옮기지 않는다 | 유형 목록은 type-inventory 가, 완료 이력은 CHANGELOG·git 이 이미 갖고 있다 |
| catalog §1~§3 | 옮기지 않는다 | 문서가 스스로 「흡수됨」을 선언했다(:32·:93). type-inventory Registry·§8-b 가 갖고 있다 |
| catalog §4 표 · 4-a(Blueprint) · 4-b · 4-c | `style-classification.md` | 4-f~4-h 는 이미 `style-classification.md:213` 이후에 있어 옮기지 않는다. 4-d·4-e 는 F6·F4 구현(KAN-013·014)으로 대체됐다는 한 줄만 남긴다 |
| catalog §5 횡단 구현 규칙 6조 | `style-classification.md` 「횡단 관측」 절 | `§5-6` 참조를 새 자리로 돌린다 |
| `METADATA_STRATEGY.md` §7 KAN-024·026·027 행 | 제자리 | 📋 → ✅ |

### 지키는 것

- **파일 하나를 지우는 커밋에 그 파일의 인바운드 수정이 전부 들어간다.** 그래야 work 단위로 revert 해도
  SSOT 체인이 반쯤 끊긴 상태가 안 생긴다. 예외는 하나다 — S1 이 PLAN 을 지운 뒤 S2 전까지 `visualization-catalog.md:43`
  이 사라진 PLAN 을 부른다. 그 파일도 S2 에서 지워지므로 둔다.
- **README 새 절에는 게이트 명령을 적지 않는다.** `gateDocs.test.ts` 가 `packages/**/*.md` 를 훑어 게이트 목록이 다섯에
  못 미치면 red 를 낸다.
- **고치지 않는 참조가 셋 있다.** `packages/visualization/CHANGELOG.md:128,138` 의 `PLAN §C-2` 는 changesets 생성 이력이라
  두고, 새 절 제목에 「구 PLAN §C-2」를 넣어 검색으로 이어지게 한다. `ORDER.md:103,293` 은 KAN-047 이 파일째 지운다.
  `KANBAN.md`·`.kanban/`·`KANBAN/` 은 칸반 기록이다.

### 버린 대안

- **출처 코드 29행을 전부 다시 쓴다** — 그 유형이 어느 갭 목록에서 들어왔는지라는 출처가 사라진다.
- **설계 원칙을 담을 새 문서(`ARCHITECTURE.md`)를 만든다** — 문서를 줄이는 카드가 문서를 늘린다. KAN-044 가 같은
  이유로 `DOC_INVENTORY.md` 를 버렸다.
- **구현 규약을 type-inventory 에 둔다** — `visualization-type-inventory.md:13` 이 「무엇이 있고/없고/우선인지만 말한다」고
  스스로 범위를 그었다.

### 결정 (2026-10-06 유저 확인)

- **`gateDocs.test.ts` 를 scope 에 더한다.** :38 의 `PLAN.md` 항목만 지운다(:37 은 KAN-047, `ASSET_INTEGRATION_PLAN` 은 KAN-048 몫).
  무효가 된 용인 4건을 다시 기록했다 — 051·052·055 는 겹침 내용 불변, 047 은 사유를 「같은 줄을 각자 자기 조각만 지운다,
  늦게 병합하는 쪽이 충돌을 푼다」로 바로잡았다. KAN-047·048 의 scope 변경이 main 에 들어오면 049 와의 쌍이 다시 무효가 되므로
  그때 main 에서 다시 기록해야 한다(048 과는 그때 처음 겹친다).
- **출처 코드 29행은 남기고 범례로 푼다.** type-inventory §1 출처 표에 `catalog`·`PLAN` 두 코드의 뜻과 원문을 볼 git 경로를 적는다.
  그래서 「검증」 1 grep 에는 범례 2줄이 남는다.
- **원안 변경 두 건을 그대로 간다** — ③(두 축 표 중복)은 빼고, README 로 옮길 것은 현재 아키텍처 요지 · 아직 참인 확정 결정 · §C-2 셋이다.
- **배치안은 단일 에이전트.**

## 실행 계획
- [x] `S1` PLAN.md 흡수·삭제 — viz `README.md` 에 「구현 규약 (구 PLAN §C-2)」 절을 새로 낸다(현재 아키텍처 · 아직 참인 확정 결정 · §C-2). 주장마다 코드 근거(`파일:줄`)를 확인하고, 안 맞으면 코드 기준으로 고쳐 쓰거나 뺀다. 같은 커밋에서 PLAN 인바운드(`visualization-type-inventory.md` :13·:30·:77·:159·:327·:345·:359·:369·:374·:375, `gateDocs.test.ts:38`)를 고치고 type-inventory §1 출처 표에 `PLAN` 코드의 마지막 판(git 고정 경로)을 적은 뒤 `git rm`. 완료 기준: 「검증」 1의 grep 에 `PLAN.md` 0건, 옮긴 주장마다 근거 확인이 수행 내역에 남는다
- [ ] `S2` visualization-catalog.md 흡수·삭제 — §4 표·4-a~4-c·§5 를 `style-classification.md` 로 옮기고 F4·F6 「스펙만」 헤딩을 현행으로 고친다. 같은 커밋에서 인바운드(`visualization-type-inventory.md` :12·:14·:15·:29·:77·:159·:335·:343·:369·:374·:375·:376, `style-classification.md` :4·:205, `README.md:128`)를 고치고 type-inventory §1 출처 표에 `catalog` 코드의 마지막 판을 적은 뒤 `git rm`. 완료 기준: 「검증」 1의 grep 0건, 「검증」 2 통과
- [ ] `S3` METADATA_STRATEGY §7 롤아웃 표 — `packages/style-guide-catalog/METADATA_STRATEGY.md:152,154,155` 의 KAN-024 「viz 후속」·KAN-026·027 📋 를 완료로 고친다. 완료 기준: §7 표에 📋 0건, 각 행에 완료 커밋(`e2484bb`·`d481e26`) 기재
- [ ] `S4` 검증 — 「검증」 1~4 를 전부 돌린다. 완료 기준: 전부 통과하고 숫자가 수행 내역에 남는다

## 검증
**문서만 바꾸는 카드라 「테스트 먼저」는 아래 grep 이 빨강에서 초록으로 가는 것으로 갈음한다.**
QUALITY_CHECKLIST 의 A~E 절은 컴포넌트·토큰·모션·스토리용이라 해당 절이 없고, 「공통 금지 사항」 다섯 줄도
코드에 대한 것이라 이 카드에서 걸릴 자리가 없다.

1. **현행 지목 0** — 지울 두 파일을 파일명으로 부르는 줄이 현행 문서에 없다.
   ```bash
   grep -rnI -E 'visualization-catalog\.md|PLAN\.md' packages apps _templates *.md .claude/settings.json \
     --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=storybook-static \
     | grep -v -E 'ASSET_INTEGRATION_PLAN|RELEASE_PLAN|CHANGELOG\.md|^KANBAN\.md|^ORDER\.md'
   ```
   - 착수 시 빨강 **13줄** — 지울 파일 자신 3(`PLAN.md:10,34` · `visualization-catalog.md:43`) + 인바운드 10
     (`visualization-type-inventory.md:12,13,14,29,30,343,369` · `style-classification.md:4` · `README.md:128` · `gateDocs.test.ts:38`)
   - 끝나면 type-inventory §1 출처 범례의 git 경로 2줄만 남는다
2. **파일명 없는 지목도 풀린다** —
   - `grep -n -E 'catalog·PLAN|catalog §4|§5-6' packages/visualization/*.md` 0건(이어받기 절차·변경 금지 영역·횡단 규칙 참조가 새 자리를 가리킨다)
   - Registry 출처 코드 29행은 남되, §1 출처 표에 `catalog`·`PLAN` 두 코드의 정의가 있다
3. **상대 링크 깨짐 0** — 이 카드가 고친 md(`packages/visualization/*.md` · `packages/style-guide-catalog/METADATA_STRATEGY.md`)의
   `](./…)`·`](../…)` 대상이 전부 존재한다.
4. **품질 게이트 5종 초록** — `CLAUDE.md` 의 목록 그대로다. `gateDocs.test.ts` 가 `packages/**/*.md` 를 훑으므로
   `test:unit` 이 이 카드에서 실제로 걸리는 자리다.
   ```bash
   pnpm typecheck
   pnpm build
   pnpm test
   pnpm --filter storybook build
   pnpm test:unit
   ```

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-06T00:23 · s:211bdcc1 — `전략` 섹션 교체
- 2026-10-06T00:23 · s:211bdcc1 — `실행 계획` 섹션 교체
- 2026-10-06T00:24 · s:211bdcc1 — `검증` 섹션 교체
- 2026-10-06T00:31 · s:211bdcc1 — `전략` 섹션 교체
- 2026-10-06T00:31 · s:211bdcc1 — `검증` 섹션 교체
- 2026-10-06T00:31 · s:211bdcc1 — 착수 결정 4건 유저 확인(전부 추천안) — scope 에 gateDocs.test.ts 추가(문서 frontmatter 를 AI 가 고쳐 reconcile 이 유저로 귀속), 용인 4건 재기록(047 사유 정정), 출처 코드 29행 존치+범례, 원안 ③ 제외·README 이관 확대, 단일 에이전트
- 2026-10-06T00:31 · s:211bdcc1 · S1 doing — 착수
- 2026-10-06T00:34 · s:211bdcc1 · S1 done — PLAN.md 흡수·삭제 — README 「구현 규약 (구 PLAN §C-2)」 신설. 근거: contractCss.ts:12-21 · Node.tsx:37 · tokens/contract.ts:7 · Provider.tsx:95,102 · tokens/base.ts(무채색) · Canvas.tsx:72,92 · package.json deps=tokens 하나 · types/data.ts:8-16 · Flowchart.tsx:63 · BarChart.tsx:59-61 · Sankey:24·GitGraph:33·Venn:27·GeoMap:29. 낡아서 고쳐 옮김: data-viz-pattern→data-bbangto-viz-pattern(0건), 자동 레이아웃 없음→노드-엣지 유형만(tidyTreeLayout·squarifyLayout 있음), core import grep 가드(가드 테스트 없음 → 안 옮김). 인바운드: type-inventory :13·:30(§2-a 출처 표를 범례로)·:327·:369·:374·:375, gateDocs.test.ts:38. 출처 코드 사용처 :77·:159·:345·:359 는 결정 2대로 둠. gateDocs 18/18 통과
