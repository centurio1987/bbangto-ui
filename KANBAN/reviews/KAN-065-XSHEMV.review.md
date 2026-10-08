---
card: KAN-065-XSHEMV
title: style guide 모티프 버튼 포커스 테두리 정리 — 자체 CSS 18곳 대비와 없는 semantic 변수 참조
created: 2026-10-08
branch: KAN-065-XSHEMV
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-065-XSHEMV
base: 00c525f
status: 검토 대기
---

# KAN-065-XSHEMV 검토 요청 — style guide 모티프 버튼 포커스 테두리 정리 — 자체 CSS 18곳 대비와 없는 semantic 변수 참조

카드: [KAN-065-XSHEMV.md](../cards/KAN-065-XSHEMV.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-065-XSHEMV` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-065-XSHEMV` |
| 베이스 | `00c525f` |
| 변경 훑기 | `git diff 00c525f...HEAD` |

**커밋 7건**

```text
7fbbc16 docs(KAN-065): tactile 모티프 규칙은 core 인라인 테두리에 가려 왔음 — changeset·전략 절의 미달 수를 화면 기준(5개·색 스킴 7개)으로 바로잡음
fadd22a chore(KAN-065): S5 — README 모티프 포커스 검사 단락 · changeset · 게이트 5종 초록 · 화면 확인
5034867 fix(KAN-065): S4 — style guide 소스의 없는 semantic 변수 5줄을 실제 토큰으로
de5f68c fix(KAN-065): S3 — 모티프 포커스 테두리 미달 6곳(색 스킴 10개)이 포커스 색 토큰을 읽게
3899cd2 test(KAN-065): S2 — 모티프 포커스 테두리 색 브라우저 확인 (빨강: Neobrutalism default 1.47)
7aeffbf test(KAN-065): S1 — 모티프 포커스 테두리 대비 게이트 · 없는 semantic 변수 검사를 모든 줄로 (빨강: 모티프 10건 · 없는 변수 5줄)
bb38da6 kanban: KAN-065 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 23개 (+452 −59)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-065-motif-focus.md` | M | 19 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 14 | 14 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 3 | 3 |
| `KANBAN/cards/KAN-065-XSHEMV.md` | M | 24 | 5 |
| `README.md` | M | 2 | 0 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | M | 44 | 1 |
| `apps/storybook/src/real-input/mount.tsx` | M | 20 | 4 |
| `packages/style-guide-catalog/src/_motif.tsx` | M | 15 | 1 |
| `packages/style-guide-catalog/src/accessibility.test.ts` | M | 156 | 14 |
| `packages/style-guide-catalog/src/accessibilityAudit.ts` | M | 137 | 0 |
| `packages/style-guide-catalog/src/aiSurrealGradient3d.tsx` | M | 2 | 2 |
| `packages/style-guide-catalog/src/blueprintTechnical.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/gothicMedievalDigital.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/iridescentChrome.tsx` | M | 2 | 2 |
| `packages/style-guide-catalog/src/minimalSaas.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/neobrutalismEditorial.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/scandiWarm.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/shatteredGlassCinematic.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/spatial3d.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/tactileTexture.tsx` | M | 3 | 3 |

**롤백 태그 7개**

```text
kan/KAN-065-XSHEMV/S1
kan/KAN-065-XSHEMV/S2
kan/KAN-065-XSHEMV/S3
kan/KAN-065-XSHEMV/S4
kan/KAN-065-XSHEMV/S5
kan/KAN-065-XSHEMV/batch1
kan/KAN-065-XSHEMV/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-065-XSHEMV.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← real-input 의 Neobrutalism 모티프 항목이 여기서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← style-guide-catalog accessibility.test.ts 의 모티프 포커스 검사 · 없는 변수 검사가 여기서 돈다
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다). 실제 입력 테스트는 패키지 `dist` 를 읽으므로, style-guide-catalog 를 고칠 때마다 빌드한 뒤 Storybook 캐시 세 곳(`node_modules/.cache/storybook` · `apps/storybook/node_modules/.cache` · `apps/storybook/node_modules/.vite`)을 지운다.

### 빨강 → 초록

1. `S1` 직후: `test:unit` 의 모티프 포커스 검사가 빨강이고 위반이 전략 「문제」 표의 10건(style guide 6개)과 같다. 없는 semantic 변수 검사가 빨강이고 위반이 5줄과 같다. fixture 는 초록이다.
2. `S2` 직후: `pnpm test` 의 새 실제 입력 항목이 빨강(약 1.47)이다. 나머지는 초록이다.
3. `S3` 직후: 모티프 포커스 검사와 새 실제 입력 항목이 초록이다.
4. `S4` 직후: 없는 semantic 변수 검사가 초록이다.

### 게이트 자체 시험 (fixture 실패 주입)

- 확장 변수를 읽는 포커스 선언은 색 스킴마다 그 색 스킴의 값으로 잰다 — 한 색 스킴만 미달이어도 위반이고, 위반에 색 스킴 키가 적힌다.
- 색 스킴에 없는 변수는 대체값으로 잰다(브라우저와 같다).
- `box-shadow: 0 0 0 3px <반투명 색>` 고리는 표면 위에 합성해 잰다.
- `outline: none` 은 위반도 통과도 아닌 건너뜀이다.
- `@media` 안에 든 포커스 규칙도 잡힌다.
- 색을 못 풀면(`var()` 가 남거나 색 이름을 모름) 조용히 통과하지 않고 `unparseable` 위반으로 올린다.
- 없는 변수 검사: `outline` 이 아닌 줄(태그 `color`, 카드 `background-color`)의 없는 변수도 잡힌다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 바뀐 색 12행(전략 「접근」 5의 표)을 다시 계산해 표와 같은지 본다.
- 빌드한 Storybook 에서 Neobrutalism default · tactile-texture default · minimal-saas default 모티프 버튼에 Tab 으로 와서 테두리가 보이는지 눈으로 본다.

**실행 결과**

```text
게이트 5종 (2026-10-08, 워크트리 KAN-065-XSHEMV, S5 커밋 시점)
pnpm typecheck                  → 통과 (rc=0)
pnpm build                      → 통과 (rc=0)
pnpm test                       → 통과 — Test Files 193 passed · Tests 1293 passed (real-input 의 Neobrutalism 모티프 항목 포함)
pnpm --filter storybook build   → 통과 (rc=0)
pnpm test:unit                  → 통과 — hooks 115 · visualization 257 · foundations 128 · style-guide-catalog 108 · viz-style-guide-catalog 39
  (첫 실행에서 foundations bundleBudget.test.ts 「측정기 자체 시험」 1건이 5초 시간 초과로 실패. 단독 실행 23/23 통과, 전체 재실행 통과. 이 카드는 foundations 를 건드리지 않는다)

빨강 → 초록
S1 직후: 모티프 포커스 검사 빨강 10건(계획 표와 같음) · 없는 semantic 변수 검사 빨강 5줄 · fixture 초록 · 51/51 style guide 에서 모티프 CSS 찾음
S2 직후: 실제 입력 「Neobrutalism default 모티프 Button」 빨강 1.4665 (단위 계산 1.47 과 같음) · 기존 21개 초록
S3 직후: 모티프 포커스 검사 초록 · 실제 입력 22/22 초록 · 바뀐 색 12행이 계획 표와 같음(최저 3.01)
S4 직후: 없는 semantic 변수 검사 초록 · style-guide-catalog 108/108

추가 확인 (빌드한 Storybook, Playwright 실제 Tab, 전환이 끝난 뒤 값)
neobrutalism default  → outline solid 2px rgb(169,136,28) = #A9881C
tactile-texture default → outline solid 2px rgb(235,93,148) = #EB5D94 (core 인라인 테두리 — 모티프 규칙은 !important 가 없어 가려짐)
minimal-saas default  → box-shadow 0 0 0 3px rgb(79,70,229) = #4F46E5
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-065-XSHEMV --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-065-XSHEMV --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-065-XSHEMV --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 통과하던 색 스킴 2개도 포커스 테두리 색이 바뀐 것을 받아들일 것인가 — 받아들이기를 추천합니다. 그 색 스킴이 정해 둔 포커스 색을 따르게 된 결과입니다
    - **배경**
      - 미달 자리를 고칠 때 새 색을 만들지 않고, 이미 3:1 검사를 통과한 포커스 색 토큰을 읽게 했다. 원문: packages/style-guide-catalog/src/shatteredGlassCinematic.tsx:195
      - 그 결과 같은 style guide 의 통과하던 색 스킴 2개도 색이 바뀌었다. shattered-glass 의 rose 는 금색 #FFC53D 에서 시안 #34E5FF 로(대비 11.56 → 11.98), iridescent 의 default 는 라일락 #B7A6FF 에서 시안 #7FE0FF 로(8.21 → 11.60) 바뀌었다.
      - 나머지 색 스킴 6개는 지금 색과 토큰 값이 같아 그대로다. 바뀐 색 12행은 계획 때 계산한 표와 모두 같다. 원문: KANBAN/cards/KAN-065-XSHEMV.md 「전략」 절 「접근」 5
    - **정할 것**
      두 색 스킴의 색 변화를 받아들일 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 받아들인다 | 두 색 스킴의 버튼 포커스 색이 바뀐다 | 포커스 색이 토큰 하나에서만 나와, 색 스킴의 포커스 색을 고치면 모티프 버튼도 따라간다 |
    | 두 색 스킴만 옛 색으로 되돌린다 | style guide 2개에 색 스킴별 모티프 포커스 변수를 새로 둔다 | 옛 색은 남지만 포커스 색이 두 군데에서 나온다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] minimal-saas 포커스 고리가 버튼 채움색과 같은 색이라 「버튼이 3px 커짐」으로만 보이는 것을 그대로 둘 것인가 — 그대로 두기를 추천합니다. 바탕과의 대비는 4.86 이상입니다
    - **배경**
      - minimal-saas 모티프 버튼은 테두리 대신 버튼 둘레의 3px 고리로 포커스를 그린다. 원문: packages/style-guide-catalog/src/minimalSaas.tsx:110
      - 전에는 고리가 반투명 인디고라 바탕과 1.64~2.10 이었다(3:1 미달). 이제 포커스 색 토큰이라 바탕과 4.86~6.29 다.
      - 그런데 default 의 포커스 색(#4F46E5)이 버튼 채움색과 같아, 고리가 버튼에 틈 없이 붙어 버튼이 3px 커진 것처럼 보인다. 빌드한 Storybook 에서 실제 Tab 으로 확인했다.
    - **정할 것**
      고리 모양을 이대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 포커스 전후 차이가 둘레 3px 뿐이다 | 바탕과는 3:1 을 넘고 이 카드에서 끝난다 |
    | 바탕색 틈을 둔 두 겹 고리로 바꾼다 | minimal-saas CSS 한 줄과 확인을 한 번 더 한다 | 버튼과 고리 사이에 바탕색 띠가 생겨 포커스가 더 또렷하다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 가려져 화면에 안 나오는 모티프 포커스 규칙도 검사가 재는 것을 그대로 둘 것인가 — 그대로 두기를 추천합니다. 놓치지 않고 더 엄하게 잡는 쪽입니다
    - **배경**
      - core 는 포커스 테두리를 인라인 스타일(2px, 포커스 색 토큰)로 그린다. 인라인 스타일은 !important 가 없는 CSS 규칙을 이긴다. 원문: packages/core/src/a11y/focusRing.ts:24
      - 모티프 포커스 규칙 53곳 중 !important 가 없는 2곳(tactile-texture, collage-scrapbook)은 처음부터 화면에 안 나왔고 core 테두리가 대신 그려졌다. 원문: packages/style-guide-catalog/src/tactileTexture.tsx:124
      - 그래서 계획 때 「미달」로 센 tactile 색 스킴 3개(1.00~1.35)는 CSS 에 적힌 값이었고, 화면에서 실제로 묻히던 것은 style guide 5개, 색 스킴 7개였다. changeset 과 전략 절은 화면 기준으로 바로잡았다.
      - 이번 수정으로 두 곳도 같은 토큰을 읽어 CSS 와 화면의 색이 같아졌다. 두께는 CSS 의 3px 가 아니라 core 의 2px 로 그려진다(이 카드 전부터 그랬다).
    - **정할 것**
      검사가 가려진 규칙까지 재는 지금 방식을 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 지금처럼 다 잰다 | 화면에 안 나오는 규칙도 고치라고 할 때가 있다 | 규칙이 언제 다시 보이게 되든 대비는 이미 맞다 |
    | !important 없는 outline 은 건너뛴다 | 검사가 core 의 그리는 방식을 알아야 하고, core 가 바뀌면 같이 고쳐야 한다 | 화면과 같은 것만 잡지만, 가려진 규칙이 드러나는 순간은 못 잡는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-065-XSHEMV --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-065-XSHEMV --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-065-XSHEMV --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
