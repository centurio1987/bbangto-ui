---
card: KAN-047-TRYYRC
title: 문서 정리 A — 폐기 4건 집행 (RELEASE_PLAN · sample_design · storybook README · ORDER)
created: 2026-08-25
scope: RELEASE_PLAN.md, sample_design/**, apps/storybook/README.md, ORDER.md, packages/visualization/visualization-type-inventory.md, packages/foundations/src/gateDocs.test.ts
---

# KAN-047-TRYYRC — 문서 정리 A — 폐기 4건 집행 (RELEASE_PLAN · sample_design · storybook README · ORDER)

## 전략
**KAN-044 가 폐기로 판정한 문서 4건을 지운다.** 판정은 KAN-044 검토에서 끝났으므로 다시 따지지 않는다.
근거는 `KANBAN/reports/KAN-044-3KYT2Q.inventory.md` §8·§11·§13-A·§15.

| 문서 | 지우는 근거 (KAN-044) |
|---|---|
| `RELEASE_PLAN.md` | KAN-036 산출물. 버전표 7행이 전부 지나갔고 changeset 0건 = 소진 |
| `sample_design/DESIGN-amber.md` | 값이 `packages/foundations/src/amber.ts` 에 이미 흡수됨. 디렉터리째 사라진다 |
| `apps/storybook/README.md` | Vite `react-ts` 스톡 템플릿 원문. bbangto-ui 언급 0 |
| `ORDER.md` | 검토 3번 반려(유저 「제거」). 계획·지시는 2026-07-14 에 `KANBAN.md` 로 넘어갔다 |

### 착수 시 재조사 (2026-10-06)

인벤토리는 2026-08-25 기준이라 참조를 다시 훑었다(칸반 이력 `KANBAN.md`·`KANBAN/`·`.kanban/` 제외).
**인벤토리에 없던 참조가 하나 생겼다** — `packages/foundations/src/gateDocs.test.ts:37` 의 주석이
`ORDER.md` 를 「allowlist 에 없지만 위반이 될 수 없는 문서」로 나열한다. KAN-046(2026-08-26 완료)이
넣은 줄이다. 테스트 동작에는 안 걸리고(그 파일을 읽는 코드 없음) 주석만 낡으므로 그 조각만 지운다.
이 파일을 `scope` 에 더했다.

같은 주석 블록의 :37 에는 B(KAN-048)가 지울 `ASSET_INTEGRATION_PLAN.md`, :38 에는 C(KAN-049)가 지울
`packages/visualization/PLAN.md` 항목이 함께 있다. **이 카드는 `ORDER.md` 조각만 지우고 남의 항목은
건드리지 않는다.** B·C 는 착수할 때 같은 주석을 고쳐야 한다.

나머지 셋(`RELEASE_PLAN`·`sample_design`·`apps/storybook/README`)은 지금도 inbound 참조 0건이다.

### 순서와 제약

1. 참조원부터 고치고(S1) 그다음 지운다(S2). 거꾸로 하면 사이 커밋에서 없는 파일을 가리키는 줄이 생긴다.
2. **칸반 이력은 고치지 않는다.** `KANBAN.md` 의 KAN-001~011 원문, 카드 문서, `.kanban/` 로그에 남은
   `ORDER.md` 언급은 그때의 사실이라 이력이다. 검증 grep 에서도 뺀다.
3. `sample_design/.DS_Store` 는 `.gitignore` 대상이라 레포에 없다. 병합 뒤 main 체크아웃에만 남으므로
   완료 정리 때 지워야 디렉터리가 사라진다.
4. 테스트 먼저: 문서 삭제라 새 `play`·vitest 테스트를 만들 자리가 없다. 대신 아래 「검증」의 grep 을
   착수 전에 돌려 빨간 상태(참조 있음)를 기록하고, 끝난 뒤 0건으로 초록을 확인한다.
   `QUALITY_CHECKLIST.md` 에는 문서 작업 섹션이 없어 인스턴스화할 것이 없다 — 게이트 5종만 적용한다.

### 버린 대안

- **`apps/storybook/README.md` 를 Storybook 실행법으로 재작성** — 실행법은 `CLAUDE.md` 의
  `pnpm dev  # Storybook 개발 서버 (포트 6006)` 가 이미 적고 있다. 재작성하면 같은 내용이 두 곳에 생기고,
  카드 목표(문서가 사라진다)와도 어긋난다.
- **`gateDocs.test.ts` 주석을 B·C 몫까지 한 번에 정리** — 그 항목들이 가리키는 파일은 아직 살아 있다.
  지금 지우면 주석이 사실과 어긋나고 B·C 의 scope 를 이 카드가 침범한다.

## 실행 계획
- [x] `S1` 참조원 정리 — `packages/visualization/visualization-type-inventory.md:376` 의 「ORDER.md 편집 금지」 조각과 `packages/foundations/src/gateDocs.test.ts:37` 의 `ORDER.md` 항목을 지운다. 완료 기준: 두 파일에 `ORDER.md` 0건, 나머지 문장과 남의 항목(ASSET_INTEGRATION_PLAN·PLAN.md)은 그대로
- [ ] `S2` 폐기 4건 삭제 — `git rm` 으로 `RELEASE_PLAN.md`·`sample_design/DESIGN-amber.md`·`apps/storybook/README.md`·`ORDER.md` 를 지운다. 완료 기준: 「검증」 1~3 전부 통과

## 검증
셋이 모두 통과해야 끝이다.

1. **네 파일이 레포에서 사라졌다** — 아래 출력이 빈 줄이어야 한다.
   ```bash
   git ls-files RELEASE_PLAN.md sample_design apps/storybook/README.md ORDER.md
   ```
2. **참조 고아 0건** — 칸반 이력을 뺀 레포 전역에서 0건이어야 한다. 착수 전(빨강)과 끝난 뒤(초록) 둘 다 기록한다.
   ```bash
   grep -rnI -E 'ORDER\.md|RELEASE_PLAN|sample_design|DESIGN-amber|storybook/README' \
     --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=storybook-static \
     --exclude-dir=KANBAN --exclude-dir=.kanban --exclude=KANBAN.md --exclude=KANBAN.board.html . | wc -l
   ```
3. **품질 게이트 5종 초록** — `CLAUDE.md` 의 목록 그대로다. `gateDocs.test.ts` 가 루트·`apps/*` 의 md 를 훑으므로 `test:unit` 이 특히 걸리는 자리다.
   ```bash
   pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit
   ```

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-06T00:19 · s:3f8d729b — `전략` 섹션 교체
- 2026-10-06T00:19 · s:3f8d729b — `실행 계획` 섹션 교체
- 2026-10-06T00:19 · s:3f8d729b — `검증` 섹션 교체
- 2026-10-06T00:20 · s:3f8d729b — 착수 전 검증 grep 빨강 4건 — ORDER.md:34 · RELEASE_PLAN.md:1 (지울 파일 자신) · visualization-type-inventory.md:376 · gateDocs.test.ts:37 (S1 이 고칠 참조원). scope 에 gateDocs.test.ts 를 더하자 KAN-049 와의 용인이 무효(waiver_stale)가 됐다 — 겹침 내용은 그대로, 유저 재확인 대기
- 2026-10-06T00:22 · s:3f8d729b — 유저 동의 2건(2026-10-06) — ①KAN-049 겹침 다시 용인(사유에 :376 공유 가능성 반영) ②4.7 인스턴트 예외: 배치 문서·계획 리포트 생략, work 2개로 바로 수행
- 2026-10-06T00:22 · s:3f8d729b · S1 doing — 착수
- 2026-10-06T00:22 · s:3f8d729b · S1 done — 참조원 2곳의 ORDER.md 조각 삭제 — type-inventory.md:376 「ORDER.md 편집 금지」, gateDocs.test.ts:37 주석 항목. 같은 줄의 ASSET_INTEGRATION_PLAN·catalog §4 는 그대로
