---
card: KAN-049-CWBPP6
title: 문서 정리 C — visualization 계열 통합 (PLAN · visualization-catalog 흡수 + SSOT 이동)
created: 2026-10-06
branch: KAN-049-CWBPP6
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-049-CWBPP6
base: 11cb644
status: 검토 대기
---

# KAN-049-CWBPP6 검토 요청 — 문서 정리 C — visualization 계열 통합 (PLAN · visualization-catalog 흡수 + SSOT 이동)

카드: [KAN-049-CWBPP6.md](../cards/KAN-049-CWBPP6.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-049-CWBPP6` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-049-CWBPP6` |
| 베이스 | `11cb644` |
| 변경 훑기 | `git diff 11cb644...HEAD` |

**커밋 11건**

```text
5a4aede docs(viz): 검토 §3-1 반려 반영 — 구현 규약에 빠진 규칙 5개와 알려진 한계 추가 — KAN-049
ea3a9f3 kanban: KAN-049 검토자(opus) 항목 판정 — §3-1 반려(PLAN 의 살아 있는 규칙 5개 누락) · §3-2 승인
ac56062 kanban: KAN-049 검토로 이동 — 검토서(판단 항목 2) 발행
75bad37 kanban: KAN-049 S4 검증 완료 — 검증 1~3 통과, 품질 게이트 5종 green
b087dcc docs(style-guide-catalog): METADATA_STRATEGY §7 롤아웃 표의 KAN-024·026·027 완료 반영 — KAN-049 S3
6a5a8fd docs(viz): visualization-catalog.md 를 style-classification 으로 흡수하고 삭제 — KAN-049 S2
9799843 docs(viz): PLAN.md 를 README 「구현 규약」으로 흡수하고 삭제 — KAN-049 S1
fecab77 kanban: KAN-049 계획 리포트 렌더(voice 미적용)
f39a5fb kanban: KAN-049 착수 결정 반영 — scope 에 gateDocs.test.ts 추가 + 용인 4건 재기록(047 사유 정정)
3c30a6a kanban: KAN-049 전략·실행 계획·검증 작성 + 배치1 계획
1df226b kanban: KAN-049 착수 — 진행 중으로 이동
```

**변경 파일 19개 (+2502 −615)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 7 | 0 |
| `.kanban/log.md` | M | 7 | 7 |
| `.kanban/reviews/KAN-049-CWBPP6.events.jsonl` | M | 7 | 0 |
| `.kanban/reviews/KAN-049-CWBPP6.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 100 | 104 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 9 | 7 |
| `KANBAN/batches/KAN-049-CWBPP6.batch1.md` | M | 95 | 0 |
| `KANBAN/cards/KAN-049-CWBPP6.md` | M | 111 | 6 |
| `KANBAN/reports/KAN-049-CWBPP6.report.html` | M | 529 | 0 |
| `KANBAN/reviews/KAN-049-CWBPP6.review.html` | M | 1265 | 0 |
| `KANBAN/reviews/KAN-049-CWBPP6.review.md` | M | 223 | 0 |
| `packages/foundations/src/gateDocs.test.ts` | M | 1 | 2 |
| `packages/style-guide-catalog/METADATA_STRATEGY.md` | M | 3 | 3 |
| `packages/visualization/PLAN.md` | M | 0 | 238 |
| `packages/visualization/README.md` | M | 69 | 1 |
| `packages/visualization/style-classification.md` | M | 43 | 9 |
| `packages/visualization/visualization-catalog.md` | M | 0 | 225 |
| `packages/visualization/visualization-type-inventory.md` | M | 10 | 11 |

**롤백 태그 6개**

```text
kan/KAN-049-CWBPP6/S1
kan/KAN-049-CWBPP6/S1.r2
kan/KAN-049-CWBPP6/S2
kan/KAN-049-CWBPP6/S3
kan/KAN-049-CWBPP6/S4
kan/KAN-049-CWBPP6/batch1
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-049-CWBPP6.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

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
   - 끝나면 3줄만 남는다 — type-inventory §2-a 출처 범례 2줄(git 경로)과 `style-classification.md` 머리말의 흡수 이력 1줄.
     셋 다 「어디서 흡수했고 원문은 어디서 보는가」를 적은 이력이지 현행 문서를 가리키는 줄이 아니다
2. **파일명 없는 지목도 풀린다** —
   - `grep -n -E 'catalog·PLAN|catalog §4|§5-6' packages/visualization/visualization-type-inventory.md` 0건(이어받기 절차·변경 금지 영역이 새 자리를 가리킨다)
   - `grep -n '§5-6' packages/visualization/style-classification.md` 0건(횡단 규칙 참조가 새 절을 가리킨다). 같은 파일의 「구 catalog §4-a~4-e」는 흡수 이력이라 남는다
   - Registry 출처 코드 29행은 남되, §2-a 출처 표에 `catalog`·`PLAN` 두 코드의 정의가 있다
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

**실행 결과**

```text
검증 1 (현행 지목 0) — grep 결과 3줄: visualization-type-inventory.md:29·:30 (출처 코드 범례, git 경로) · style-classification.md:5 (흡수 이력). 착수 시 13줄
검증 2 (파일명 없는 지목) — type-inventory 의 catalog·PLAN/catalog §4/§5-6: 0건 · style-classification 의 §5-6: 0건 · Registry 출처 코드 29행 유지(§2-a 범례로 풀림)
검증 3 (상대 링크) — 고친 md 8개의 상대 링크 10개 중 깨짐 0
검증 4 (품질 게이트 5종)
  pnpm build — exit 0
  pnpm typecheck — exit 0
  pnpm test — Test Files 182 passed (182) · Tests 1224 passed (1224)
  pnpm --filter storybook build — Storybook build completed successfully
  pnpm test:unit — hooks 115 · foundations 62(gateDocs 18 포함) · visualization 257 · style-guide-catalog 76 · visualization-style-guide-catalog 39 전부 통과
재작업(§3-1 반려 반영, 5a4aede) 뒤 — md 2개만 바뀜(README · style-classification). pnpm test:unit 다시 실행: hooks 115 · foundations 62 · visualization 257 · style-guide-catalog 76 · visualization-style-guide-catalog 39 전부 통과. typecheck·build·test·storybook build 는 md 를 읽지 않아 다시 돌리지 않음(위 결과 유지)
```

## 3. 판단 항목 — 스크립트가 판정할 수 없는 것

<!-- 스크립트가 판정할 수 없는 것만 적는다 — 값의 진위, 선택지 중 하나를 고른 근거,
     범위를 그은 자리. 2항에서 이미 돌아간 검증을 여기 옮겨 적지 않는다.
     한 줄 형식: 체크박스 하나에 의견 하나 — "<주제> — <지금 고른 값과 그 근거>".
     **의견마다 상세가 따라붙고, 상세는 조각 둘이다** — `**배경**` 과 `**정할 것**` 이
     각각 단독 줄이다(없거나 하나뿐이면 종료코드 12). 검토자는 이 카드를 수행하지
     않았으므로 내부 기호(`L10`·`P5`·`S8`)만 던지면 판정할 재료가 없고, 재료가 있어도
     줄글 한 덩이면 필요한 부분만 골라 읽지 못한다.
       **배경** — 무엇이 문제인가. `- ` 목록으로, 항목 하나에 사실 하나. 기호를 풀어 쓰고
         항목 끝에 `원문: 파일:줄` 이나 링크를 건다. ①②… 로 늘어놓을 것은 항목으로 가른다.
         목록이 없으면 종료코드 12 — 줄글은 화면에서 한 문단으로 붙는다.
       **정할 것** — 정할 것 한 줄. 그 아래 갈래마다 대가와 결과를 표로 단다:
         | 선택지 | 대가 | 그러면 어떻게 되는가 |
       추천은 선택지 셀 맨 앞의 `**추천** ` 접두다. 고를 것이 없는 항목이면 표를 비운다.
     **올리기 전에 둘을 본다.** ① 이 의견이 카드 의도(원문·목적·이유·목표)와 이어지는가
     — 이어지지 않으면 올리지 않는다. 문제를 위한 문제는 판단 항목이 아니라 별도 카드다.
     ② 지시 원본보다 낮은 레이어로 내려가지 않았는가 — 유저가 제품 관점으로 지시했는데
     플래그 이름·함수 이름을 묻고 있으면 서술을 고칠 것이 아니라 올릴 것이 아니다.
     (SKILL.md 5.6 「판단 항목에 무엇을 올리는가」)
     비어 있으면 "기계가 다 판정했고 사람이 정할 것이 없다"는 뜻이다. 그 판단도
     착수한 쪽이 하는 것이지 검토자가 빈칸을 보고 추측할 일이 아니다.
     **승계 절(3-0)이 있으면 그것이 먼저 온다** — 다른 검토서에서 넘어온 의견이고,
     판정은 승계를 받은 이 문서 하나에서만 내려진다. -->

**의견마다 판정과 추가 의견이 따로 붙습니다.** 판정은 상태이고 추가 의견은 말입니다 — 승인/반려를 아직
안 정했어도 의견 하나에만 추가 의견을 달 수 있고, 반대로 의견 하나만 먼저 닫을 수도 있습니다.
`<번호>`는 의견 순서이고, 주제의 문구 일부로도 찾습니다.

```
# 판정 — 승인 · 반려 · 철회
python3 scripts/kanban.py review-judge <project-root> --card KAN-049-CWBPP6 --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-049-CWBPP6 --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-049-CWBPP6 --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] README 「구현 규약」 절이 지운 PLAN.md 의 살아 있는 내용을 지금 코드에 맞게 옮겼는가 — 주장마다 코드와 대조했고, 코드와 다른 2건은 코드 기준으로 고쳐 옮겼습니다
    - **배경**
      - PLAN.md 는 대부분 2026-07-12 개편 전 설계 이력이고, 아직 맞는 내용은 「현재 아키텍처」·「확정된 결정」·「공통 계약」 세 덩이에 있었다. 원문: git show fecab77:packages/visualization/PLAN.md
      - 세 덩이를 viz README 의 새 절 하나로 옮기면서 주장마다 코드 위치를 확인했다. 확인한 위치 목록은 카드 수행 내역의 첫 단계(PLAN 흡수) 완료 줄에 있다. 원문: KANBAN/cards/KAN-049-CWBPP6.md
      - 코드와 달라 고쳐 옮긴 것이 둘이다. 속성 이름 data-viz-pattern 은 실제로 data-bbangto-viz-pattern 이다. 원문: packages/visualization/src/patterns/Venn.tsx:39
      - 「자동 레이아웃 없음」은 노드와 화살표로 그리는 유형에만 맞다. 트리·트리맵은 위치를 자동으로 계산하는 함수가 있다. 원문: packages/visualization/src/geometry/tree.ts:20
      - 「core 를 가져다 쓰지 못하게 검사로 막는다」는 문장은 옮기지 않았다. 그런 검사가 레포에 없고, 지금은 의존 목록에 core 가 없을 뿐이다. 원문: packages/visualization/package.json
    - **정할 것**
      README 절을 이대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 「core 사용을 검사로 막는다」는 약속이 문서에서 사라진다 | 문서가 지금 코드가 실제로 하는 일만 말한다 |
    | core 사용 금지 검사를 새 카드로 만든다 | 카드가 하나 늘어난다 | PLAN 이 약속만 하고 만들지 않았던 장치가 실제로 생긴다 |

    > **판정**
    >
    > - 반려 · ai · 2026-10-06

    > **추가 의견**
    >
    > - ai · 2026-10-06 — 반려 사유는 core 검사 선택지가 아니라 빠진 내용입니다. core 검사는 추천대로 새 카드 없이 두는 데 동의합니다. 그런데 지운 PLAN.md 의 §C(원자 레이어)와 §F(리스크·결정 사항)에 지금 코드에서도 맞는 규칙이 있는데, README 「구현 규약」 어디에도 없습니다. 전략의 「무엇을 어디로」 표는 §C 를 「유형 목록·완료 이력」이라며 옮기지 않는 쪽에 넣었고, §F 는 표에 아예 없습니다. 전략이 「안 옮기면 패키지의 설계 원칙이 git 이력에만 남는다」고 경고한 바로 그 상태입니다. 빠진 것은 다섯입니다. ① children 모드에서 Canvas 는 직속 자식만 훑어 노드 좌표를 등록합니다. 조건부·중첩·memo 로 감싼 노드는 등록되지 않고, 그 노드를 가리키는 Edge 는 경고만 내고 그리지 않습니다(throw 하지 않음). 우회는 Edge 에 {x,y} 를 직접 주거나 노드를 최상위에 두는 것입니다. PLAN 은 이 안내를 README 에 둔다고 적었습니다(PLAN.md:134). 코드: src/atoms/Canvas.tsx:29-51, src/atoms/Edge.tsx:39-42·86. ② 렌더 중에 DOM 을 재지 않습니다. 글자 폭은 src/geometry/text.ts:5 의 estimateWidth 로 추정하고 getComputedTextLength 를 쓰지 않습니다(SSR 결과를 같게 하려는 규칙, PLAN.md:212·215). ③ NodeLabel 은 기본 wrap, 선택 truncate 이고, 글자를 눌러 맞추는 fit 은 직접 골라야 켜집니다(PLAN.md:145, src/atoms/NodeLabel.tsx:6·41). ④ 사용자가 모션 줄이기를 켜면 스타일 가이드 범위 안의 애니메이션을 끄고 data-bbangto-viz-animate="essential" 만 남깁니다. PLAN.md:214 와 형태는 달라졌지만 지금도 있는 규칙입니다(src/provider/defs.ts:6-9). ⑤ 장식 글리프는 aria-hidden 입니다(PLAN.md:213, src/molecules/DatabaseNode.tsx:58 외). type-inventory :12 가 이제 README 「구현 규약」을 구현 규약의 기준 문서로 가리키므로, 이것들이 빠지면 기준 문서에 없는 규칙이 코드에만 남습니다. ①은 소비자가 바로 부딪히는 문제라 꼭 옮겨야 하고, ②~⑤는 「구조」·「작성 모델」 절에 한 줄씩이면 됩니다. 반려는 이 다섯 줄을 더하라는 뜻이지 절을 다시 쓰라는 뜻이 아닙니다.
    > - ai · 2026-10-06 — 반영했습니다(5a4aede). 짚어 주신 다섯 가지를 코드로 다시 확인한 뒤 README 「구현 규약」에 넣었습니다 — 구조 절에 DOM 측정 안 함·모션 줄이기, 작성 모델 절에 children 모드 노드 등록 한계·NodeLabel 모드, 공통 계약 접근성에 장식 aria-hidden. ①은 코드가 엘리먼트 props 를 읽는 방식이라, memo 여부가 아니라 「다른 엘리먼트 안에 넣었거나 다섯 값을 props 로 받지 않는 래퍼」가 등록되지 않는다고 정확히 적었습니다(Canvas.tsx:29-51). 같은 종류 누락을 PLAN 전체에서 다시 훑어 하나를 더 찾았습니다 — 「이연」의 리터럴 paint 제거가 끝나지 않아 템플릿 12개가 기본 색을 리터럴로 넣고, 스타일 가이드가 그 부분을 못 바꿉니다. README 에 「알려진 한계」 절로 적고, 「리터럴 색을 쓰지 않는다」 문장이 이와 어긋나지 않게 고쳤습니다. PLAN 이 말한 snap()·gridPlace 헬퍼는 코드에 없어 옮기지 않았습니다.

- [x] visualization-catalog.md 에서 style-classification 으로 옮긴 범위를 이렇게 그어도 되는가 — 색 값은 옮기지 않고 소스 파일을 가리키게 했습니다
    - **배경**
      - 지운 문서의 스타일 절에는 가이드마다 색 값과 선 두께가 적혀 있었다. 같은 값이 각 가이드 소스 파일에 있고, 실제로 쓰이는 것은 그쪽이다. 원문: packages/visualization-style-guide-catalog/src/minimalLine.tsx:41
      - 그래서 옮긴 것은 값이 아니라 가이드를 고를 때 필요한 것이다. preset 이름(소스에서 확인), 무엇을 감싸는지, 접근성 주의를 옮기고 값은 소스 파일 이름으로 가리켰다. 원문: packages/visualization/style-classification.md 「초기 3종」 절
      - 레퍼런스 이미지에서 뽑은 공통 규칙 6개를 함께 옮겼다. 그중 2개(채운 도형 위 라벨 색 자동 선택, 최소 글자 크기)는 아직 토큰으로 구현돼 있지 않다는 사실도 함께 적었다. 원문: packages/visualization/style-classification.md 「횡단 구현 규칙」 절
      - 이미지 한 장 한 장이 어느 유형의 근거였는지 적은 표는 옮기지 않았다. 유형 목록의 출처 코드와 그 범례의 git 경로로만 찾을 수 있다. 원문: packages/visualization/visualization-type-inventory.md:29
    - **정할 것**
      이 범위로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 색 값을 보려면 소스 파일을 열어야 한다 | 문서와 코드의 값이 어긋날 자리가 없다 |
    | 색 값도 옮긴다 | 같은 값이 두 곳에 생긴다 | 가이드를 고칠 때마다 문서도 고쳐야 하고, 빠뜨리면 문서가 틀린 값을 보인다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-06

    > **추가 의견**
    >
    > - ai · 2026-10-06 — 범위에 동의합니다. 사실 하나만 바로잡습니다. 수행 내역 S2 줄은 구 catalog §4-h 의 「노드 수만큼 그라디언트 defs 가 생긴다」 주의를 「소스에서 못 찾아 안 옮김」이라고 적었지만, 그 주의는 이미 packages/visualization-style-guide-catalog/src/neonGradientDark.tsx:315(guidelines 의 dos)와 :232 주석에 있습니다. 그래서 안 옮긴 결과는 맞고, 이 항목의 원칙(값과 주의는 소스가 기준)과도 맞습니다. 구 §4-d 의 「라벨 skew 금지」 접근성 규칙도 isoColorBlock.tsx:215-217 에 있어서, 4-d·4-e 를 한 줄로 줄이면서 잃은 규칙은 확인한 범위에서 없습니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-049-CWBPP6 --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-049-CWBPP6 --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-049-CWBPP6 --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
