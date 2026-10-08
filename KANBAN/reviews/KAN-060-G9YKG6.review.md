---
card: KAN-060-G9YKG6
title: 포커스 테두리 색 대비 3:1 — border.focus 토큰 정리와 대비 게이트
created: 2026-10-08
branch: KAN-060-G9YKG6
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-060-G9YKG6
base: 5ed8f1f
status: 검토 대기
---

# KAN-060-G9YKG6 검토 요청 — 포커스 테두리 색 대비 3:1 — border.focus 토큰 정리와 대비 게이트

카드: [KAN-060-G9YKG6.md](../cards/KAN-060-G9YKG6.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-060-G9YKG6` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-060-G9YKG6` |
| 베이스 | `5ed8f1f` |
| 변경 훑기 | `git diff 5ed8f1f...HEAD` |

**커밋 12건**

```text
77dac78 fix(KAN-060): S7 — style guide 포커스 테두리의 없는 변수 12곳을 border-focus 토큰으로
1dc5f4c test(KAN-060): S6 — style guide 포커스 테두리 변수 게이트 (빨강: 없는 변수 12곳)
ec0f407 kanban: KAN-060 재작업 계획 — scope 에 style guide 9파일 · S6·S7 · 배치3 · KAN-055 겹침 용인 재기록(ai)
311b1d7 kanban: KAN-060 검토 → 진행 중 — 항목 3 반려(유저: 없는 변수 12곳은 이 카드에서, 18곳은 새 카드) 같은 카드 재작업
f1d556a kanban: KAN-060 검토 대행(kanban-reviewer) — 항목 1·2 승인 · 항목 3 추가 의견 2건(판정 보류) (ai · 검토자)
d309873 kanban: KAN-060 검토로 이동 — 검토서(판단 항목 3) · 검토 리포트 · 계획 리포트 다시 그림
10e4a92 chore(KAN-060): S5 — README 포커스 대비 단락 · changeset · 게이트 5종 초록 · 화면 확인
ac4bef4 fix(KAN-060): S4 — style guide 9개 · 색 스킴 10개 border.focus 를 표면과 3:1 이상으로
adc94c3 fix(KAN-060): S3 — foundation 21개 border.focus 를 표면과 3:1 이상으로
d719e7f test(KAN-060): S2 — 포커스 테두리 색 브라우저 확인 (빨강: neon-yellow 1.03 · style guide 9개 스토리)
2921714 test(KAN-060): S1 — 포커스 테두리 대비 게이트 (빨강: foundation 21 · style guide 색 스킴 10)
8c884cf kanban: KAN-060 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 63개 (+2285 −134)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-060-focus-contrast.md` | M | 29 | 0 |
| `.kanban/archive.jsonl` | M | 4 | 0 |
| `.kanban/log.md` | M | 4 | 4 |
| `.kanban/reviews/KAN-060-G9YKG6.events.jsonl` | M | 10 | 0 |
| `.kanban/reviews/KAN-060-G9YKG6.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 55 | 60 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 4 | 3 |
| `KANBAN/batches/KAN-060-G9YKG6.batch2.md` | M | 2 | 1 |
| `KANBAN/batches/KAN-060-G9YKG6.batch3.md` | M | 50 | 0 |
| `KANBAN/cards/KAN-060-G9YKG6.md` | M | 53 | 6 |
| `KANBAN/reports/KAN-060-G9YKG6.report.html` | M | 7 | 7 |
| `KANBAN/reviews/KAN-060-G9YKG6.review.html` | M | 1283 | 0 |
| `KANBAN/reviews/KAN-060-G9YKG6.review.md` | M | 286 | 0 |
| `README.md` | M | 13 | 0 |
| `apps/storybook/src/real-input/FocusVisible.realinput.test.tsx` | M | 30 | 1 |
| `apps/storybook/src/real-input/mount.tsx` | M | 4 | 3 |
| `apps/storybook/src/stories/_catalogStory.tsx` | M | 11 | 1 |
| `packages/foundations/src/focusContrast.test.ts` | M | 73 | 0 |
| `packages/foundations/src/themes/aurora-yellow.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/celluloid.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/charcoal-warm.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/commerce-noir.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/coral.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/cosmonaut.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/dark-chrome.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/gold-rush.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/jade-leaf.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/jungle-night.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/lime.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/magazine-light.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/midnight-ink.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/mint-code.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/neon-yellow.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/obsidian-gold.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/oxide-green.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/sunflower.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/sunset.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/volt-emerald.ts` | M | 1 | 1 |
| `packages/foundations/src/themes/warm-parchment.ts` | M | 1 | 1 |
| `packages/style-guide-catalog/src/accessibility.test.ts` | M | 198 | 1 |
| `packages/style-guide-catalog/src/accessibilityAudit.ts` | M | 41 | 0 |
| `packages/style-guide-catalog/src/aiSurrealGradient3d.tsx` | M | 2 | 2 |
| `packages/style-guide-catalog/src/blueprintTechnical.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/glitchDistortion.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/grainyBlurDreamy.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/halftoneDotPrint.tsx` | M | 2 | 2 |
| `packages/style-guide-catalog/src/halftoneGlitchColorsep.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/heritageFolkOrnament.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/index.ts` | M | 4 | 1 |
| `packages/style-guide-catalog/src/iridescentChrome.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/kawaiiPastel.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/naiveDoodle.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/neobrutalismEditorial.tsx` | M | 2 | 1 |
| `packages/style-guide-catalog/src/opArtKinetic.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/pixelArtRetro.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/punkGrungeGraffiti.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/romanticBotanical.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/skeuomorphismTactile.tsx` | M | 2 | 2 |
| `packages/style-guide-catalog/src/tactileTexture.tsx` | M | 1 | 1 |
| `packages/style-guide-catalog/src/warpedCheckerboard.tsx` | M | 2 | 2 |
| `packages/tokens/src/contrast.ts` | M | 53 | 0 |
| `packages/tokens/src/index.ts` | M | 4 | 1 |

**롤백 태그 7개**

```text
kan/KAN-060-G9YKG6/S1
kan/KAN-060-G9YKG6/S2
kan/KAN-060-G9YKG6/S3
kan/KAN-060-G9YKG6/S4
kan/KAN-060-G9YKG6/S5
kan/KAN-060-G9YKG6/S6
kan/KAN-060-G9YKG6/S7
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-060-G9YKG6.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← real-input 의 neon-yellow 항목 · 카탈로그 FoundationPresets 스토리가 여기서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← foundations focusContrast.test.ts · style-guide-catalog accessibility.test.ts 가 여기서 돈다
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다). 실제 입력 테스트와 스토리는 각 패키지 `dist` 를 읽으므로, tokens·foundations·style-guide-catalog 를 고칠 때마다 그 패키지를 빌드한 뒤 Storybook 캐시 세 곳(`node_modules/.cache/storybook` · `apps/storybook/node_modules/.cache` · `apps/storybook/node_modules/.vite`)을 지운다.

### 빨강 → 초록

1. `S1` 직후: `test:unit` 의 포커스 대비 검사 둘이 빨강이고, 위반이 foundation 21 + style guide 색 스킴 10 = 31건으로 전략 표와 같다. fixture 는 초록이다.
2. `S2` 직후: `pnpm test` 의 새 실제 입력 항목이 빨강(약 1.03)이고, 미달 style guide 9개의 `FoundationPresets` 스토리가 빨강이다. 나머지는 초록이다.
3. `S3` 직후: foundations 검사와 새 실제 입력 항목이 초록이다.
4. `S4` 직후: style guide 검사와 9개 스토리가 초록이다.

### 게이트 자체 시험 (fixture 실패 주입)

- `border.focus` 노랑(`#FAFF69`) + `base` 흰색이면 위반이 난다(1.03).
- `elevated` 만 미달이어도 위반이 나고, 위반에 `elevated` 가 적힌다.
- 반투명 `elevated`(`rgba(255,255,255,0.08)`)를 어두운 `base` 위에 두면 `base` 위 합성으로 재서 통과한다(흰색 위로 재면 거짓 미달이 난다).
- 그라디언트 `base` 는 가장 낮은 스톱으로 잰다 — 한 스톱만 미달이어도 위반이 난다.
- 색을 못 읽으면(`var(...)` 등) 조용히 통과하지 않고 위반(`unparseable`)으로 올린다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 값 — 바꾼 31칸이 전략 「새 값」 표와 같은지 `git diff` 로 대조한다. `focus:` 칸 밖의 색(특히 같은 상수를 쓰는 `primary`·장식)이 바뀌지 않았는지 함께 본다.
- 화면 — 빌드한 Storybook 에서 neon-yellow·cosmonaut·Neobrutalism default 셋을 골라 실제 Tab 으로 Button 테두리를 찍어 본다(색이 보이는지).

### 재작업 확인 (검토 항목 3)

- `S6` 직후: `test:unit` 의 「포커스 테두리 변수」 검사가 빨강이고 위반이 전략 「재작업」 표의 12곳(11개 파일)과 같다. fixture 는 초록이다.
- `S7` 직후: 그 검사가 초록이고 게이트 5종이 초록이다. `git diff` 에서 12줄의 변수 이름만 바뀌었는지(대체값·다른 줄 그대로) 본다.

**실행 결과**

```text
2026-10-08 KAN-060-G9YKG6 워크트리(77dac78, 검토 항목 3 재작업 뒤)에서 카드 「검증」 절을 실행한 결과

게이트 5종 (CLAUDE.md 순서)
- pnpm typecheck              rc=0
- pnpm build                  rc=0
- pnpm test                   rc=0  Test Files 193 passed · Tests 1292 passed
- pnpm --filter storybook build  rc=0  Storybook build completed successfully
- pnpm test:unit              rc=0  foundations 117 passed · style-guide-catalog 95 passed · hooks 115 · visualization 257 · visualization-style-guide-catalog 39

빨강 → 초록
- S1 직후 test:unit 포커스 대비 검사 빨강 — foundation 21 · style guide 색 스킴 10, 전략 표와 이름·값 일치. core base 3 통과. fixture 초록
- S2 직후 real-input neon-yellow 항목 빨강(1.03, 두 번 같은 값) · FoundationPresets 스토리 빨강 9개, 43개 초록
- S3 직후 foundations vitest 117 초록 · real-input 21 초록
- S4 직후 style-guide-catalog vitest 90 초록 · 카탈로그 스토리 52파일 359건 초록
- S6 직후(재작업) 포커스 테두리 변수 검사 빨강 — 없는 변수 12곳(11파일), 전략 「재작업」 표와 같음. fixture 4 초록
- S7 직후 그 검사 초록(style-guide-catalog 95)

추가 확인
- 값 대조: git diff 에서 foundation 21칸 · style guide 10칸만 바뀜, focus: 밖의 줄 0(상수 NEO.gold·CANDY·CYAN·MAGENTA 그대로, NEO.goldFocus 1줄 추가)
- 재작업 대조: 11개 파일 12줄에서 변수 이름만 바뀜(대체값 그대로)
- 화면: chromium 실제 Tab 으로 core Button 을 neon-yellow·cosmonaut·Neobrutalism default 에서 찍음 — 테두리 셋 다 바탕과 구분됨
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-060-G9YKG6 --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-060-G9YKG6 --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-060-G9YKG6 --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 새 포커스 색을 3:1 경계에 바짝 붙은 값 그대로 둘 것인가 — 그대로 두었습니다. 원래 색에서 가장 덜 바뀌고, 앞으로 배경이 바뀌어 3:1 밑으로 내려가면 검사가 잡습니다
    - **배경**
      - 31개 색 스킴의 포커스 색을 색조는 두고 명도만 낮춰, 처음으로 3:1을 넘는 값으로 바꿨다. 원문: KANBAN/cards/KAN-060-G9YKG6.md 「새 값」 표
      - 새 값의 대비는 3.00~3.07이다. jungle-night 와 obsidian-gold 둘은 3.00이다.
      - 3:1은 WCAG 1.4.11(비텍스트 대비)이 정한 최소값이다.
      - chromium 에서 실제 Tab 으로 찍어 보니 neon-yellow·cosmonaut·Neobrutalism 기본 셋 모두 테두리가 바탕과 구분됐다. 원문: KANBAN/cards/KAN-060-G9YKG6.md 수행 내역 S5
      - 이 포커스 색은 Input·Link·Slider·RichTextEditor 의 포커스 테두리에도 쓰여 그쪽 색도 함께 어두워졌다.
    - **정할 것**
      포커스 색을 최소값 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 둔다 | 테두리가 겨우 기준을 넘는 색 스킴이 있다 | 브랜드 색 느낌이 가장 많이 남는다 |
    | 목표를 3.5:1 로 올려 다시 계산한다 | 31개 색이 더 어두워져 원래 색과 멀어진다 | 테두리가 더 또렷하다. 값을 다시 옮기고 게이트를 다시 돌린다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] cosmonaut 의 포커스 색을 회색으로 두고, 흰 버튼 문제는 새 카드로 뺄 것인가 — 회색(#909090)으로 두었습니다. 원래 흰색이라 색조가 없어 규칙대로 하면 회색이 나옵니다
    - **배경**
      - cosmonaut 은 포커스 색이 흰색이고 배경도 흰색이라 대비가 1.00이었다. 원문: packages/foundations/src/themes/cosmonaut.ts:48
      - 흰색은 색조가 없어서, 명도만 낮추는 규칙대로 하면 회색 #909090(3.06)이 나온다.
      - 이 색 스킴은 기본 버튼 색도 흰색이라 흰 바탕 위에서 버튼이 안 보인다. 실제 Tab 화면에서도 회색 테두리 안의 버튼이 비어 보였다. 원문: packages/foundations/src/themes/cosmonaut.ts:51
      - neon-yellow 도 버튼 글자가 흰색이고 버튼이 노랑이라 글자가 묻힌다. 둘 다 포커스 색이 아니라 버튼 색 문제다. 원문: packages/foundations/src/themes/neon-yellow.ts:51
    - **정할 것**
      cosmonaut 과 neon-yellow 의 버튼 색 문제를 어디서 다룰 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 포커스는 이대로 두고 버튼 색은 새 카드로 뺀다 | 두 색 스킴의 버튼이 다음 카드까지 안 보인다 | 이 카드 범위가 그대로다. 버튼 색을 정할 때 포커스 색도 함께 다시 본다 |
    | cosmonaut 포커스를 글자색(#111111)으로 바꾼다 | 다른 30개와 규칙이 갈린다 | 테두리가 아주 또렷하다(약 18:1). 버튼 문제는 그대로 남는다 |
    | 이 카드에서 버튼 색까지 고친다 | 카드 범위가 넓어지고, 버튼을 무슨 색으로 할지 근거가 없다 | 한 번에 끝나지만 브랜드 색을 추측해서 정하게 된다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] style guide 가 자기 CSS 로 그리는 버튼 포커스 테두리를 새 카드로 넘길 것인가 — 넘기기를 추천합니다. 이 카드의 검사가 보지 않는 자리이고, 그중 12곳은 없는 변수를 읽고 있습니다
    - **배경**
      - style guide 마다 자기 버튼(모티프 버튼)의 포커스 테두리를 CSS 로 따로 그린다. 이 테두리는 core 의 공용 규칙이 아니라 그 style guide 의 CSS 가 그린다.
      - 그중 23곳은 포커스 색 토큰을 읽어서, 이 카드에서 고친 값이 그대로 반영된다.
      - 11개 파일 12곳은 `--bbangto-semantic-focus` 처럼 없는 변수를 읽는다. 그래서 늘 대체값(고정 색)이 쓰이고, 색 스킴을 바꿔도 테두리 색이 안 따라간다. 원문: packages/style-guide-catalog/src/halftoneDotPrint.tsx:200
      - 18곳은 그 style guide 의 강조색이나 고정 색을 쓴다. Neobrutalism 버튼은 금색(#E9C766)이라 크림 바탕에서 1.47이고, 빌드한 Storybook 에서 실제 Tab 으로도 같은 값이 나왔다. 원문: packages/style-guide-catalog/src/neobrutalismEditorial.tsx:158
      - 이 카드의 검사는 토큰 값만 잰다. 위 30곳(12 + 18)은 재지 않는다.
    - **정할 것**
      style guide 자체 포커스 테두리 30곳을 어디서 다룰 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 새 카드로 뺀다 | 이 카드가 끝나도 일부 style guide 버튼은 포커스가 흐리다 | 없는 변수 12곳 바로잡기와 자체 CSS 대비 검사를 한 카드에서 설계한다 |
    | 이 카드에서 없는 변수 12곳만 고친다 | 재작업과 검토를 한 번 더 돌린다 | 12곳은 토큰을 따라가게 되지만 나머지 18곳은 남는다 |
    | 그대로 둔다 | 흐린 포커스와 없는 변수가 남는다 | 할 일이 없다 |

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
     `review-judge --card KAN-060-G9YKG6 --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-060-G9YKG6 --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-060-G9YKG6 --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
