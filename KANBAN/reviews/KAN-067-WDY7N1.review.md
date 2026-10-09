---
card: KAN-067-WDY7N1
title: 배포 문서에 「원하는 것이 없을 때」 길 — core·viz README 확장 절 + viz 관리용 문서 배포 제외
created: 2026-10-09
branch: KAN-067-WDY7N1
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-067-WDY7N1
base: 8b64dc0
status: 승인
---

# KAN-067-WDY7N1 검토 요청 — 배포 문서에 「원하는 것이 없을 때」 길 — core·viz README 확장 절 + viz 관리용 문서 배포 제외

카드: [KAN-067-WDY7N1.md](../cards/KAN-067-WDY7N1.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-067-WDY7N1` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-067-WDY7N1` |
| 베이스 | `8b64dc0` |
| 변경 훑기 | `git diff 8b64dc0...HEAD` |

**커밋 7건**

```text
b1dc968 chore(KAN-067): S6 — changeset(core·visualization patch) · 게이트 5종 초록
b0779da docs(KAN-067): S5 — 배포물 재현 시험 기록 · viz README 의 「Provider 밖은 무채색」 서술을 실측으로 고침
e2ab662 fix(KAN-067): S4 — visualization 배포물에서 관리용 문서 두 개를 뺀다
dbb5640 docs(KAN-067): S3 — visualization README 「원하는 것이 없을 때」 절 · 범위 밖 3종 사유 · 저장소 문서 링크
2674a48 docs(KAN-067): S2 — core README 「원하는 것이 없을 때」 절
889efee test(KAN-067): S1 — 배포 문서 게이트(publishedDocs)와 README 예제 스토리 먼저
0dcb93c kanban: KAN-067 할 일 → 진행 중 (배치1 착수)
```

**변경 파일 19개 (+868 −48)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-067-extend-when-missing.md` | M | 24 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 14 | 14 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 4 | 4 |
| `KANBAN/cards/KAN-067-WDY7N1.md` | M | 23 | 8 |
| `apps/storybook/src/stories/ExtendWhenMissing.stories.tsx` | M | 90 | 0 |
| `apps/storybook/src/stories/_readmeExamples/coreExtend.tsx` | M | 81 | 0 |
| `apps/storybook/src/stories/_readmeExamples/vizCompose.tsx` | M | 28 | 0 |
| `packages/core/README.md` | M | 123 | 0 |
| `packages/foundations/src/publishedDocs.test.ts` | M | 161 | 0 |
| `packages/foundations/src/publishedDocs.ts` | M | 226 | 0 |
| `packages/visualization/README.md` | M | 79 | 10 |
| `packages/visualization/package.json` | M | 1 | 3 |
| `packages/visualization/src/index.ts` | M | 2 | 1 |
| `packages/visualization/src/typeMeta/index.ts` | M | 2 | 1 |
| `packages/visualization/src/typeMeta/registry.ts` | M | 2 | 1 |
| `packages/visualization/src/typeMeta/types.ts` | M | 4 | 3 |

**롤백 태그 8개**

```text
kan/KAN-067-WDY7N1/S1
kan/KAN-067-WDY7N1/S2
kan/KAN-067-WDY7N1/S3
kan/KAN-067-WDY7N1/S4
kan/KAN-067-WDY7N1/S5
kan/KAN-067-WDY7N1/S6
kan/KAN-067-WDY7N1/batch1
kan/KAN-067-WDY7N1/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-067-WDY7N1.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

- `pnpm test:unit` — `publishedDocs.test.ts` 초록. 실제 저장소 위반 0, 실패 주입 넷이 각각 위반을 낸다.
- `pnpm --filter storybook exec vitest run --project storybook src/stories/ExtendWhenMissing.stories.tsx` — core 확장 예제가 Provider 안에서 토큰 색을 받고, viz 조합 예제가 노드와 엣지를 그린다.
- README 예제 한 줄을 바꾸면 `pnpm test:unit` 이 예제 불일치로 빨강이 된다. 손으로 한 번 확인하고 되돌린다.
- `packages/visualization` 에서 `pnpm pack` 한 tarball 목록(`tar -tzf`)에 `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 가 없다.
- `pnpm build` 뒤 `grep -rnE 'visualization-type-inventory|TYPE_METADATA_STRATEGY' packages/visualization/dist --include='*.d.ts'` 의 모든 줄이 `github.com` 링크다. 매니페스트를 가리키는 「동봉」 문장은 맞는 문장이므로 세지 않는다.
- 재현 시험(S5) 결과가 수행 내역에 전후 × 과제 둘로 남아 있다.
- 품질 게이트 5종 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**실행 결과**

```text
$ pnpm --filter @centurio1987/bbangto-ui-foundations exec vitest run src/publishedDocs.test.ts
      Tests  10 passed (10)
$ pnpm --filter storybook exec vitest run --project storybook src/stories/ExtendWhenMissing.stories.tsx
      Tests  2 passed (2)
$ (packages/visualization) pnpm pack && tar -tzf … | grep -v '^package/dist/'
package/package.json
package/type.manifest.json
package/README.md
$ grep -rhE 'visualization-type-inventory|TYPE_METADATA_STRATEGY' packages/visualization/dist --include='*.d.ts' | grep -vc github.com
0
README 예제 한 줄 변경 → publishedDocs example-drift 빨강, 되돌리면 초록(손 확인, S6)
게이트 5종: typecheck rc=0 · build rc=0 · test rc=0 (194 files, 1295 tests) · storybook build rc=0 · test:unit rc=0 (foundations 138, visualization 257, hooks 115, style-guide-catalog 108, viz-sgc 39)
재현 시험(S5): 전후 × 과제 둘 = 4건 모두 「앱 안 확장」 — 수행 내역 S5 참고
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-067-WDY7N1 --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-067-WDY7N1 --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-067-WDY7N1 --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] 재현 시험이 겪으신 현상을 재현하지 못했는데 이 카드를 닫을 것인가 — 닫고, 실제 사례로 재현하는 후속 카드를 여는 쪽을 골랐다
    - **배경**
      - 고치기 전 배포물로도 두 과제(core 에 없는 색 선택기 · viz 에 없는 결함 나무) 모두 에이전트가 앱 안에서 만드는 쪽으로 결론을 냈다. 라이브러리를 떠나거나 개선을 요청한 경우는 없었다. 원문: KANBAN/cards/KAN-067-WDY7N1.md:90
      - 고친 뒤 색 선택기 에이전트는 새 README 절을 근거로 들었고, 읽은 파일이 21개에서 14개로, 걸린 시간이 260초에서 114초로 줄었다. 원문: KANBAN/cards/KAN-067-WDY7N1.md:90
      - 고치기 전 에이전트는 색이 그림에 박힌 체크 아이콘을 다시 칠하겠다는, 실제로는 안 되는 계획을 세웠다. 고친 뒤 에이전트는 README 의 「감쌀 때 걸리는 자리」 문단을 읽고 그 아이콘을 피했다. 원문: packages/core/README.md:44
      - 시험은 과제마다 한 번씩이고, 앱 지시문 없이 과제만 준 조건이다. 겪으신 상황의 앱 지시문 · 과제 문구 · 모델은 확인 안 함이다. 원문: KANBAN/batches/KAN-067-WDY7N1.batch2.md:45
    - **정할 것**
      이 카드를 지금 닫을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 닫고 후속 카드를 연다 | 현상의 원인이 확정되지 않은 채 닫힌다 | 이 카드가 고친 배포 문서 두 원인은 다음 배포에 실리고, 남은 원인(앱 지시문 등)은 실제 사례를 받아 따로 재현한다 |
    | 이 카드에서 원인을 더 찾는다 | 실제 사례를 받을 때까지 카드가 검토에 머문다 | 배포 문서 수정도 그만큼 늦게 나간다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 원문 의도와는 맞습니다. 진단 답변은 길을 둘 냈습니다 — 「어느 앱에서 어떤 컴포넌트가 없었는지 알려 주시면 그 상황 그대로 재현 시험을 꾸리겠습니다」와 「바로 고치기를 원하시면 1·2번부터 칸반 카드로 올려 진행하겠습니다」. 유저는 뒤를 골랐고(원문 「1,2번 칸반 카드로 올려 ㅣㄴ행해」), 이 카드는 그 1·2를 끝냈습니다. 다만 S5 가 재현하지 못한 것을 원인이 앱 지시문에 있다는 근거로 읽으면 안 됩니다. 시험 지시문이 두 길을 막았습니다. ① 「앱 폴더 밖의 경로, 인터넷, 다른 저장소는 보지 않습니다」 — 진단이 꼽은 경로(core README 의 저장소 링크 → 루트 README.md:28 「이 레포에 기여한다」)를 따라갈 수 없었습니다. 같은 길로 이제 packages/visualization/README.md:275 가 인벤토리(「갭이 보이면 행 추가」 지시가 있는 문서)를 GitHub 링크로 가리킵니다. ② 「코드는 쓰지 않아도 됩니다」 — 방침만 묻고 구현은 시키지 않아, 막히는 순간까지 가지 않았습니다. 고치기 전 에이전트의 CheckIcon 재채색 계획은 구현하면 실패하는 계획이었습니다. 후속 재현 카드가 이 두 조건을 열지 않으면 같은 결과가 다시 날 수 있습니다. 근거: 세션 기록의 S5 서브에이전트 지시문 4건, 진단 답변 「고칠 방법」 절.
    > - ai · 2026-10-10 — 수행 내역의 S5 줄(KANBAN/cards/KAN-067-WDY7N1.md:90)에는 과제 문구와 읽은 파일 목록이 없습니다. 배치 계획은 「과제 문구를 전후에 글자 그대로 같게 두고 수행 내역에 원문을 남긴다」(KANBAN/batches/KAN-067-WDY7N1.batch2.md:71), S5 완료 기준은 「에이전트가 읽은 파일을 수행 내역에 남긴다」(카드 :58)였는데, 지금은 파일 수(21→14 등)만 있습니다. 위 의견의 두 조건(인터넷 금지 · 방침만)이 바로 그 과제 문구 안에 있어서, 원문이 빠지면 이 시험이 무엇을 못 봤는지 나중에 알 수 없습니다. 원문은 지금 세션 기록에만 있습니다.

- [x] 루트 README 의 두 자리를 어디서 고칠 것인가 — 이 카드 범위를 넓히지 않고 새 카드 하나로 여는 쪽을 골랐다
    - **배경**
      - 루트 README 길잡이 표에서 「컴포넌트가 없을 때」 갈 수 있는 줄은 「사례 10 · 이 레포에 기여한다」 하나뿐이다. 진단에서 원인 후보로 꼽은 자리다. 원문: README.md:28
      - 루트 README 는 Provider 없이 시각화를 그리면 무채색으로 그려진다고 적는다. chromium 에서 재 보니 도형은 검게 채워지고 엣지는 보이지 않았다. 같은 서술이 있던 viz README 두 곳은 이 카드에서 고쳤다. 원문: README.md:858
      - 루트 README 는 npm 배포물이 아니고 이 카드의 고칠 파일 목록 밖이다. KAN-064(매니페스트 얇은 색인화)의 목록에는 들어 있지만, 그 카드는 검토 승인을 받고 병합만 남았다. 원문: KANBAN/cards/KAN-064-AC0H6M.md 머리말 scope
    - **정할 것**
      두 자리를 어느 카드에서 고칠 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 새 카드 하나로 연다 | 카드가 하나 는다 | 승인된 KAN-064 와 이 카드를 다시 열지 않고 고친다 |
    | 이 카드 범위를 넓힌다 | 고칠 파일 목록이 바뀌어 KAN-064 와의 겹침 용인을 다시 받아야 한다 | 이 카드의 검토가 한 번 더 돈다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — 루트 README.md:28 은 진단 답변이 「에이전트 눈에는 이 길이 곧 라이브러리에 요청하는 길입니다」라고 짚은 자리이고, core README 의 저장소 링크(지금 packages/core/README.md:154)로 닿습니다. 저장소가 공개라 실제 앱 에이전트도 갈 수 있습니다. S5 는 인터넷을 막아 이 경로를 시험하지 못했으므로(항목 1 의견), 겪으신 현상의 남은 부분을 다룰 가능성이 큰 자리가 이 새 카드입니다. 항목 1 의 후속 재현 카드와 같은 경로를 보므로, 두 카드를 따로 열 때 그 관계를 메모에 남겨 두면 재현 전후 비교가 가능합니다.

- [x] visualization 버전 올림을 patch 로 둘 것인가 — 코드가 안 바뀌었으므로 patch 로 적었다
    - **배경**
      - 코드 · export · 타입은 바뀌지 않았다. 바뀐 것은 README 두 개와 visualization 배포물의 파일 목록이다. 원문: .changeset/kan-067-extend-when-missing.md
      - visualization 배포물에서 문서 두 개가 빠졌다. node_modules 안의 그 파일을 경로로 읽던 도구는 파일을 못 찾는다. changeset 의 「바뀐 동작」 절이 그 사실을 적는다. 원문: packages/visualization/package.json:20-24
      - KAN-064 의 changeset 은 visualization 을 major 로 올린다. 두 카드가 같은 릴리스에 묶이면 visualization 은 어차피 major 가 된다. 원문: KAN-064-AC0H6M 브랜치 .changeset/kan-064-manifest-index.md:5
    - **정할 것**
      visualization 의 버전 올림 수준을 무엇으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** patch 로 둔다 | 문서 파일을 경로로 읽던 도구가 버전 숫자만 보고는 변화를 모른다 | changeset 본문이 알리고, KAN-064 와 같은 릴리스면 major 가 덮는다 |
    | minor 로 올린다 | 코드 변화 없이 버전 숫자가 커진다 | 0.x 에서 minor 는 깨지는 변경 신호라 사용자가 더 조심해서 올린다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-10

    > **추가 의견**
    >
    > - ai · 2026-10-10 — patch 가 카드 취지와도 맞습니다. 앱이 viz 를 ^0.4.0 처럼 캐럿 범위로 받으면 0.4.x 만 따라가고 0.5.0 은 받지 않습니다. patch 면 기존 앱이 다음 설치 때 새 README 와 문서 제외를 그대로 받고, minor 면 사람이 손으로 올리기 전까지 인벤토리가 든 옛 배포물을 계속 읽습니다. 깨질 쪽도 좁습니다 — packages/visualization/package.json:9-19 의 exports 가 두 문서를 내보낸 적이 없어 import 로는 닿지 않았고, 파일 경로로 읽던 도구만 영향을 받습니다. 배경에 빠진 사실 하나: KAN-068(미배포 수정분 먼저 배포)의 메모가 「그 사이 끝난 다른 카드(예: KAN-067)의 changeset 을 함께 실을지는 착수 때 정한다」라고 적습니다. 이 카드가 KAN-068 에 실리면 KAN-064 major 보다 먼저 0.4.x patch 로 나가므로 「major 가 덮는다」는 일어나지 않습니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-067-WDY7N1 --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: 승인

**판정 이력**:

- 승인 · 유저 · 2026-10-10

- 승인이면 → `apply --op move --id KAN-067-WDY7N1 --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-067-WDY7N1 --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
