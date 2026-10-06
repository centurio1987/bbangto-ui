---
card: KAN-049-CWBPP6
batch: 1
created: 2026-10-06
branch: KAN-049-CWBPP6
status: 계획
steps: S1, S2, S3, S4
---

# KAN-049-CWBPP6 배치1 — viz 문서 2건 흡수·삭제 전량

카드: [KAN-049-CWBPP6.md](../cards/KAN-049-CWBPP6.md) · 범위 `S1` · `S2` · `S3` · `S4`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

## 1. 작업 패키지

### WP1 · `S1` PLAN.md 흡수·삭제

viz `README.md` 「함께 들어 있는 문서」 앞에 「구현 규약 (구 PLAN §C-2)」 절을 낸다. 담는 것은 셋이다 —
현재 아키텍처 요지(`PLAN.md:12-31`), 아직 참인 확정 결정(`PLAN.md:44-48`·`:57-66` 중 코드와 맞는 것), §C-2 공통 계약(`PLAN.md:151-163`).
주장마다 코드에서 근거를 찾는다(예: `contractCss.ts` 존재, `useVizDefsPrefix` export, `package.json` 에 core 의존 없음).
못 찾으면 옮기지 않는다.

같은 커밋에서 PLAN 인바운드 11곳(`visualization-type-inventory.md` 10곳 · `gateDocs.test.ts:38`)을 고치고,
type-inventory §1 출처 표에 `PLAN` 코드의 정의를 git 고정 경로로 남긴 뒤 `git rm packages/visualization/PLAN.md`.

**완료 기준**: 카드 「검증」 1의 grep 에 `PLAN.md` 0건. 옮긴 주장마다 근거 `파일:줄` 이 수행 내역에 남는다.

### WP2 · `S2` visualization-catalog.md 흡수·삭제

`style-classification.md` 로 옮기는 것 — §4 패밀리→가이드 표(F4·F6 상태를 현행으로), 4-a Blueprint(레퍼런스 유래가 아니라 지금은 어디에도 없다),
4-b·4-c 스펙, §5 횡단 규칙 6조. 4-f~4-h 는 이미 `style-classification.md:213` 이후에 있어 옮기지 않는다.
4-d·4-e 는 「F6·F4 구현(KAN-013·014)으로 대체」 한 줄로 접는다. F4·F6 헤딩의 「(스펙만)」을 고친다.

같은 커밋에서 인바운드 15곳(type-inventory 12 · style-classification 2 · README 1)을 고치고 `catalog` 코드 정의를 남긴 뒤 `git rm`.
`README.md:128` 은 함께 고친다 — 「함께 들어 있는 문서」라 해 놓고 `package.json` `files` 에 없는 두 문서를 적고 있다.

**완료 기준**: 카드 「검증」 1 grep 0건(범례 줄 제외), 「검증」 2 통과.

### WP3 · `S3` METADATA_STRATEGY §7 롤아웃 표

`packages/style-guide-catalog/METADATA_STRATEGY.md:152,154,155` 세 행. KAN-024 의 「viz 후속」은 KAN-026(`e2484bb`)이 닫았고,
KAN-026·027(`d481e26`)은 보드에서 완료다.

**완료 기준**: §7 표에 📋 0건, 각 행에 완료 커밋 기재.

### WP4 · `S4` 검증

카드 「검증」 1~4. 게이트 5종 중 실제로 걸릴 수 있는 것은 `test:unit`(gateDocs 가 `packages/**/*.md` 를 훑는다)뿐이다.

**완료 기준**: 전부 통과, 숫자가 수행 내역에 남는다. 그 뒤 검토서를 뜨고 `→ 검토`.

## 2. 의존과 순서

`S1 → S2` 는 **느슨한 순서**다. 둘 다 `visualization-type-inventory.md` §1 출처 표와 §10 이어받기 절차(:369·:374·:375)를 고치므로
같은 줄을 두 번 손댄다. 한 줄 안에 `catalog`·`PLAN` 이 함께 있는 자리가 다섯(:77·:159·:369·:374·:375)이라, S1 에서 PLAN 조각만 지우고 S2 에서
catalog 조각을 지운다. 순서를 바꿔도 결과는 같지만 한 세션이 순서대로 하는 편이 같은 줄 충돌이 없다.

`S3` 은 독립이다(다른 패키지의 다른 파일). `S4` 는 셋이 다 끝나야 의미가 있다.

**배치 밖 의존 — KAN-047.** 다른 세션에서 진행 중이고 같은 두 자리를 고친다.

| 자리 | KAN-047 | KAN-049 |
|---|---|---|
| `visualization-type-inventory.md:376` | 「ORDER.md 편집 금지」 조각을 지운다 | 「catalog §4」 조각을 고친다 |
| `gateDocs.test.ts:37-38` | :37 의 `ORDER.md` 항목을 지운다 | :38 의 `PLAN.md` 항목을 지운다 |

둘 다 **자기 조각만** 지우므로 할 일이 서로를 바꾸지 않는다. 다만 같은 줄(또는 붙은 줄)이라 늦게 병합하는 쪽에서
git 충돌이 난다. 해소는 기계적이다 — 두 조각이 다 지워진 줄로 맞춘다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| README 새 절이 이미 낡은 주장을 옮김 | 근거 `파일:줄` 을 못 댐 | 옮기지 않는다. PLAN 「현재 아키텍처」는 2026-07-12 기준이라 이후 바뀐 것이 있을 수 있다 |
| README 새 절이 gateDocs 를 red 로 만듦 | `test:unit` 빨강 | 게이트 명령을 README 에 적지 않는다. §C-2 「테스트 이원화」는 무엇을 어디서 테스트하는지만 옮긴다 |
| style-classification 으로 옮긴 hex 가 코드와 다름 | 4-b·4-c 값 ≠ `minimalLine.tsx`·`colorfulFlat.tsx` | 코드가 정본이다. 문서에는 값 대신 「근거·경계」만 옮기고 값은 소스 파일을 가리킨다 |
| 출처 코드 29행이 뜻을 잃음 | 범례 없이 `catalog §1-b` 만 남음 | WP1·WP2 가 각자 자기 코드의 범례를 같은 커밋에 넣는다 |

되돌리기 어려운 지점 없음 — 전부 문서 편집이고 `kan/KAN-049-CWBPP6/S<n>` 태그로 work 단위 롤백이 선다. 삭제한 두 파일도 revert 로 돌아온다.

## 4. 착수 시점 판단

**배치 1개로 끝낸다.** work 4개는 `batch_size_works` 기본값(3~4) 안이다. `S3` 이 작아 배치를 나눌 이유가 없다.

**두 관점**

| 관점 | 배치 수 | 병렬 폭 | 리스크 |
|---|---|---|---|
| **단일 에이전트(추천)** | 1 | 1 | 없음. S1·S2 가 type-inventory 의 같은 줄을 고치므로 직렬이 곧 최단 경로다 |
| 오케스트레이션 | 1 | 최대 3(S1 README 작성 · S2 style-classification 작성 · S3) | 병렬로 돌릴 수 있는 것은 **행선지 문서 쓰기**뿐이고 인바운드 수정·`git rm` 은 type-inventory 같은 줄이라 메인이 직렬로 합쳐야 한다. 행선지 쓰기는 원문 대조와 코드 근거 확인이 대부분이라 서브에이전트에 넘기면 근거 확인을 메인이 다시 해야 한다 |

오케스트레이션이 값을 하는 조건(병렬 구간이 길고 조각이 독립적으로 무겁다)이 여기서는 서지 않는다.
