---
card: KAN-069-G0FGTJ
title: viz 미사용 토큰 정리 — 선언만 있고 읽히지 않는 시각화 토큰을 토큰마다 잇거나 걷기 (경계선부터)
created: 2026-10-10
branch: KAN-069-G0FGTJ
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-069-G0FGTJ
base: 064586b
status: 검토 대기
---

# KAN-069-G0FGTJ 검토 요청 — viz 미사용 토큰 정리 — 선언만 있고 읽히지 않는 시각화 토큰을 토큰마다 잇거나 걷기 (경계선부터)

카드: [KAN-069-G0FGTJ.md](../cards/KAN-069-G0FGTJ.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-069-G0FGTJ` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-069-G0FGTJ` |
| 베이스 | `064586b` |
| 변경 훑기 | `git diff 064586b...HEAD` |

**커밋 14건**

```text
a8b64e4 fix(catalog): KAN-069 반려 재작업 — 지침 요약 다섯 곳을 같은 지침의 나머지 문장과 맞게 되돌린다
ff1b271 kanban: KAN-069 검토 반려 → 진행 중 (항목 3 — 지침 문장 앞뒤 불일치, 후속 카드로)
271fbd2 kanban: KAN-069 검토자 확인 — 항목 1·2 승인, 3 반려(지침 문장이 실제 글자색과 아직 어긋남)
fdd03bb kanban: KAN-069 검토 리포트
fb9eb42 kanban: KAN-069 검토로 이동
ee8a1c7 kanban: KAN-069 검토서 — 검토 대상(base 064586b·커밋 8·파일 57)·검증 결과·판단 항목 3
424c7b6 kanban: KAN-069 S6 — 품질 게이트 5종 초록 · a11y 강제 확인
e91c759 docs: KAN-069 S5 — 이은 토큰의 JSDoc·README·viz 문서와 changeset(tokens·visualization·catalog major)
a87d3cf feat!: KAN-069 S4 — 그림에 쓰이지 않는 viz 토큰 28개를 걷는다
aad02d3 feat(viz): KAN-069 S3 — C4 테두리·화살촉 크기·격자 간격이 스타일 가이드 값을 따른다
68b5286 feat(viz): KAN-069 S2 — 경계선이 스타일 가이드의 boundary 대시·두께·모서리를 따른다
169373a test(viz): KAN-069 S1 — 토큰 사용 게이트(단위)와 토큰 잇기 게이트(스토리) 빨간 상태
798a747 kanban: KAN-069 착수 계획 — 실행 문서(전략·S1~S6·검증)·배치 2장·계획 리포트
0a8783d kanban: KAN-069 진행 중으로 이동 (착수)
```

**변경 파일 61개 (+3440 −1263)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-069-unused-viz-tokens.md` | M | 45 | 0 |
| `.kanban/archive.jsonl` | M | 3 | 0 |
| `.kanban/log.md` | M | 3 | 3 |
| `.kanban/reviews/KAN-069-G0FGTJ.events.jsonl` | M | 14 | 0 |
| `.kanban/reviews/KAN-069-G0FGTJ.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 46 | 43 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 13 | 10 |
| `KANBAN/batches/KAN-069-G0FGTJ.batch1.md` | M | 80 | 0 |
| `KANBAN/batches/KAN-069-G0FGTJ.batch2.md` | M | 65 | 0 |
| `KANBAN/cards/KAN-069-G0FGTJ.md` | M | 98 | 0 |
| `KANBAN/reports/KAN-069-G0FGTJ.report.html` | M | 518 | 0 |
| `KANBAN/reviews/KAN-069-G0FGTJ.review.html` | M | 1262 | 0 |
| `KANBAN/reviews/KAN-069-G0FGTJ.review.md` | M | 288 | 0 |
| `README.md` | M | 6 | 5 |
| `apps/storybook/src/stories/_vizCatalogStory.tsx` | M | 11 | 4 |
| `apps/storybook/src/stories/visualization/TokenWiringGate.stories.tsx` | M | 226 | 0 |
| `packages/tokens/src/visualization.ts` | M | 17 | 26 |
| `packages/visualization-style-guide-catalog/src/_foundation.ts` | M | 0 | 6 |
| `packages/visualization-style-guide-catalog/src/accessibility.test.ts` | M | 50 | 36 |
| `packages/visualization-style-guide-catalog/src/accessibilityAudit.ts` | M | 14 | 8 |
| `packages/visualization-style-guide-catalog/src/artdecoLuxe.tsx` | M | 12 | 35 |
| `packages/visualization-style-guide-catalog/src/bauhausGeometric.tsx` | M | 16 | 37 |
| `packages/visualization-style-guide-catalog/src/bentoStat.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/blueprintTechnical.tsx` | M | 14 | 32 |
| `packages/visualization-style-guide-catalog/src/clayPlayful.tsx` | M | 12 | 34 |
| `packages/visualization-style-guide-catalog/src/colorfulFlat.tsx` | M | 11 | 34 |
| `packages/visualization-style-guide-catalog/src/corporateSchematic.tsx` | M | 15 | 36 |
| `packages/visualization-style-guide-catalog/src/darkluxe.tsx` | M | 57 | 62 |
| `packages/visualization-style-guide-catalog/src/dopamineMax.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/editorialData.tsx` | M | 12 | 35 |
| `packages/visualization-style-guide-catalog/src/foundationShape.test.ts` | M | 50 | 0 |
| `packages/visualization-style-guide-catalog/src/glitchDuotone.tsx` | M | 13 | 35 |
| `packages/visualization-style-guide-catalog/src/halftonePrint.tsx` | M | 12 | 33 |
| `packages/visualization-style-guide-catalog/src/hudTelemetry.tsx` | M | 11 | 32 |
| `packages/visualization-style-guide-catalog/src/inkLineDuotone.tsx` | M | 12 | 34 |
| `packages/visualization-style-guide-catalog/src/isoColorBlock.tsx` | M | 11 | 33 |
| `packages/visualization-style-guide-catalog/src/kawaiiPastel.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/markerSketchnote.tsx` | M | 11 | 33 |
| `packages/visualization-style-guide-catalog/src/memphisPattern.tsx` | M | 12 | 33 |
| `packages/visualization-style-guide-catalog/src/minimalLine.tsx` | M | 11 | 33 |
| `packages/visualization-style-guide-catalog/src/neobrutalist.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/neonGradientDark.tsx` | M | 13 | 35 |
| `packages/visualization-style-guide-catalog/src/neumorphicSoft.tsx` | M | 14 | 37 |
| `packages/visualization-style-guide-catalog/src/organicBlob.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/pixelRetro.tsx` | M | 12 | 34 |
| `packages/visualization-style-guide-catalog/src/retro70sWarm.tsx` | M | 13 | 34 |
| `packages/visualization-style-guide-catalog/src/risoPrint.tsx` | M | 14 | 35 |
| `packages/visualization-style-guide-catalog/src/swissSystematic.tsx` | M | 12 | 35 |
| `packages/visualization-style-guide-catalog/src/synthwave.tsx` | M | 16 | 37 |
| `packages/visualization-style-guide-catalog/src/terminalAscii.tsx` | M | 12 | 34 |
| `packages/visualization-style-guide-catalog/src/ukiyoeFlat.tsx` | M | 13 | 34 |
| `packages/visualization/src/atoms/Boundary.tsx` | M | 20 | 9 |
| `packages/visualization/src/atoms/Canvas.tsx` | M | 5 | 2 |
| `packages/visualization/src/atoms/GridLayer.tsx` | M | 11 | 7 |
| `packages/visualization/src/molecules/C4Box.tsx` | M | 1 | 7 |
| `packages/visualization/src/provider/contractCss.ts` | M | 6 | 0 |
| `packages/visualization/src/tokens/base.ts` | M | 11 | 33 |
| `packages/visualization/src/tokens/tokenUsage.test.ts` | M | 121 | 0 |
| `packages/visualization/style-classification.md` | M | 1 | 1 |
| `packages/visualization/viz-style-expansion.md` | M | 6 | 5 |

**롤백 태그 8개**

```text
kan/KAN-069-G0FGTJ/S1
kan/KAN-069-G0FGTJ/S2
kan/KAN-069-G0FGTJ/S3
kan/KAN-069-G0FGTJ/S4
kan/KAN-069-G0FGTJ/S5
kan/KAN-069-G0FGTJ/S6
kan/KAN-069-G0FGTJ/batch1
kan/KAN-069-G0FGTJ/batch2
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-069-G0FGTJ.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

이 카드가 끝났다는 것은 아래가 모두 나온다는 뜻이다.

1. `tokenUsage.test.ts` 가 초록이다 — `VisualizationFoundation` 에 남은 잎이 전부 그림 코드에서 읽힌다(카드 목표 「선언과 동작이 어긋난 viz 토큰 0」).
2. `TokenWiringGate` 스토리가 초록이다 — 카탈로그 가이드 30개 각각에서 경계 사각형의 computed `stroke-dasharray`·`stroke-width`·`rx` 가 그 가이드의 `boundary` 값과 같다(카드 목표 「경계선이 카탈로그 가이드 값대로 그려진다」). 실선 가이드는 `none` 이다.
3. 걷은 잎 이름이 현행 소스·문서에 없다.

   ```bash
   bash -c 'grep -rnE "tagColor|iconStyle|nodePad|laneGap|titleWeight|motion\.(duration|easing)|\.glyph\b|sizes\.(title|label|tag|mono)" packages apps README.md --include=*.ts --include=*.tsx --include=*.md | grep -v node_modules | grep -v /dist/ | grep -v CHANGELOG'
   ```

   출력이 0줄이어야 한다(core 의 같은 이름 지역 변수가 걸리면 viz 와 무관함을 수행 내역에 적는다).
4. 접근성 감사 over-claim 0 — `pnpm test:unit` 의 catalog `accessibility.test.ts` 초록.
5. 품질 게이트 5종 초록 — `pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`.

**실행 결과**

```text
2026-10-11 워크트리 KAN-069-G0FGTJ, HEAD a8b64e4(반려 재작업 — 지침 요약 다섯 곳 되돌림) 에서 다시 실행. 재작업은 카탈로그 지침 문자열과 changeset 만 고쳤다. 1·2·4 는 아래 게이트 안에서 다시 돌았고(viz test:unit · pnpm test · catalog test:unit), 6 만 첫 검토 때(HEAD 424c7b6) 결과다.

1. tokenUsage.test.ts (선언한 잎은 모두 그림 코드가 읽는다) — 초록. 착수 때 36개 → S2 뒤 33 → S3 뒤 28 → S4 뒤 0.
2. TokenWiringGate 스토리 4개 — 4/4 초록. 카탈로그 가이드 30개 모두 경계 사각형의 computed stroke-dasharray·stroke-width·rx 가 그 가이드 boundary 값과 같다(실선 가이드는 none).
3. 지운 이름 grep — 남은 것은 viz 패턴 데이터의 item.glyph, core(UI) 의 motion.* 토큰과 지역 변수 iconStyle, 감사 주석의 이력 한 줄뿐(모두 이 카드와 무관하거나 의도).
4. 접근성 감사 over-claim 0 — catalog accessibility.test.ts 초록(darkluxe-01 oxblood 에 on 덮어쓰기 뒤).
5. 품질 게이트 5종:
   typecheck rc=0
   build rc=0
   test rc=0 — Test Files 196 passed, Tests 1309 passed (재작업 뒤 다시 돌림)
   storybook build rc=0 — Storybook build completed successfully
   test:unit rc=0 — hooks 115 · visualization 288 · foundations 150 · style-guide-catalog 113 · visualization-style-guide-catalog 48 (test:unit 이 도는 패키지 다섯 전부)
6. TokenWiringGate 만 a11y test:'error' 로 임시 강제 — 4/4 통과, 설정은 되돌림.
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-069-G0FGTJ --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-069-G0FGTJ --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-069-G0FGTJ --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] UML 유스케이스·배치 그림의 경계선도 가이드 대시를 따르게 둘 것인가 — 따르게 두었습니다. 경계선은 관계를 나타내는 선이 아니어서입니다
    - **배경**
      - 이 카드로 경계선이 가이드가 정한 대시·두께·모서리로 그려집니다. 전에는 모든 가이드에서 같은 대시(8 6)·두께(1.5)·모서리(8)였습니다. 원문: packages/visualization/src/atoms/Boundary.tsx:74
      - UML 유스케이스 그림(시스템 경계)과 UML 배치 그림도 경계선을 씁니다. 이제 대시를 정한 가이드에서는 그 대시로, 실선을 정한 가이드 넷(iso-color-block·swiss-systematic·bauhaus-geometric·neobrutalist)에서는 실선으로 그려집니다.
      - KAN-070 은 UML·BPMN 같은 표준 표기 그림에서 연결선만 가이드 대시를 따르지 않게 했습니다. 그 표기법에서는 실선과 대시가 서로 다른 관계를 뜻하기 때문입니다. 원문: packages/visualization/src/provider/contractCss.ts:12
      - 경계선은 관계를 나타내지 않으므로 그 근거가 그대로 서지 않습니다. 이 카드 전에도 UML 그림의 경계는 대시로 그려졌습니다.
    - **정할 것**
      표준 표기 그림 안의 경계선도 가이드를 따르게 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 따르게 둔다 | UML 그림의 경계선 모양이 가이드마다 달라진다 | 모든 그림에서 경계선이 같은 규칙을 따른다 |
    | 표준 표기 그림은 실선으로 고정한다 | 스타일시트에 예외 규칙이 하나 늘어난다 | UML 그림의 경계선이 가이드와 상관없이 실선이 된다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-11

    > **추가 의견**
    >
    > - ai · 2026-10-11 — 검토자 확인: 카드 목표가 「경계선(boundary.dashPattern·width·radius)이 카탈로그 가이드 값대로 그려진다」이고, 카드 전략 절이 이 갈래를 버린 대안으로 적으면서 판단 항목으로 올리겠다고 한 그대로라 추천안이 의도와 맞습니다. contractCss.ts:12~17 에서 표기 템플릿 예외(data-viz-notation)가 연결선 훅(connector)에만 걸리고 경계 훅(boundary)에는 안 걸리는 것도 확인했습니다. 고를 때 보탤 사실이 하나 있습니다. UML 유스케이스 그림의 시스템 경계는 관례상 실선 사각형으로 그리는 경우가 많습니다(UML 명세 원문 대조는 안 함). 그래서 두 번째 선택지는 「예외 규칙 하나 늘리기」이면서 「표준 모양에 맞추기」이기도 합니다. 이 카드 전에도 대시(8 6)로 그렸으므로 이번 변경으로 나빠진 그림은 없습니다.

- [x] darkluxe-01 의 oxblood 색 묶음에서 노드·C4 글자를 크림으로 정한 것을 받아들일 것인가 — 7:1 약속을 지키려고 크림으로 정했습니다
    - **배경**
      - C4(시스템 구조를 시스템·컨테이너·컴포넌트 수준별 상자로 그리는 다이어그램 표기)의 상자가 `C4Box` 이고, 「C4 글자」는 그 상자 위 글자입니다. 원문: packages/visualization/src/molecules/C4Box.tsx:24
      - darkluxe-01 은 글자 대비를 7:1 이상(aaa)으로 약속한 가이드입니다. 원문: packages/visualization-style-guide-catalog/src/darkluxe.tsx:373
      - 접근성 검사가 실제로 칠해지는 글자색을 재도록 바꾸자, oxblood 색 묶음의 노드·C4 글자(뮤트 골드)가 5.87~6.75:1 로 약속에 못 미쳤습니다. 지금 배포된 그림이 이렇게 그려집니다.
      - 전에는 검사가 칠하지 않는 색(저자가 tagColor 에 적은 크림)을 재서 통과했습니다.
      - 크림(#EDE3CE)은 같은 면에서 13:1 이상이고, 저자가 처음에 노드 글자색으로 적었던 색입니다. 원문: packages/visualization-style-guide-catalog/src/darkluxe.tsx:143
    - **정할 것**
      oxblood 의 노드·C4 글자를 크림으로 바꿀 것인가, 약속을 낮출 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 크림으로 정한다 | oxblood 의 노드·C4 글자색이 골드에서 크림으로 바뀐다 | 7:1 약속이 지켜지고 저자가 처음 고른 글자색으로 돌아간다 |
    | 약속을 aa(4.5:1)로 낮춘다 | 이 가이드 전체의 약속이 한 단계 낮아진다 | 그림은 그대로이고 aaa 가이드가 하나 줄어든다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-11

    > **추가 의견**
    >
    > - ai · 2026-10-11 — 검토자 확인: 이 크림 지정은 착수 때 유저가 고른 선택지에 이미 들어 있어서 「지금 그림 유지」 결정과 어긋나지 않습니다. 유저가 고른 「걷고 지금 그림 유지 (Recommended)」의 설명 원문은 「그림은 지금과 같습니다. 접근성 감사를 실제 글자색으로 옮기고, 감사에 걸리는 darkluxe-01 oxblood에만 on 덮어쓰기로 저자 색 #EDE3CE(대비 13~15:1)를 넣습니다.」입니다. 선택지와 배치2 계획은 노드 일곱만 말했는데, 실제로는 C4 상자 세 수준도 크림이 됐습니다. 같은 가이드·같은 색 묶음·같은 색이라 「oxblood에만」 범위 안입니다. 대비는 다시 쟀습니다. 뮤트 골드는 5.87(queue)~6.75(C4 l3)이고 크림은 13.37 이상입니다. 인용한 darkluxe.tsx:143 은 새로 넣은 덮어쓰기 자리입니다. 저자가 원래 크림을 골랐다는 근거는 기준점 064586b 의 darkluxe.tsx 에 있습니다(노드 tagColor: CREAM, oxblood 의 c4LabelColor: CREAM 과 주석 「AAA 라벨 대비 보전」).

- [ ] 가이드 지침 문장을 실제 글자색에 맞게 고친 범위를 받아들일 것인가 — 계획(세 곳)보다 넓게 가이드 22곳을 고쳤습니다
    - **배경**
      - C4(시스템 구조를 시스템·컨테이너·컴포넌트 수준별 상자로 그리는 다이어그램 표기)의 상자가 `C4Box` 이고, 「C4 글자」는 그 상자 위 글자입니다. 원문: packages/visualization/src/molecules/C4Box.tsx:24
      - 가이드마다 접근성 지침 문장이 있고, 사람과 에이전트가 가이드를 고를 때 읽는 공개 문구입니다. 많은 문장이 「모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 X 색」처럼 이번에 지운 필드 이름을 썼습니다.
      - 계획에는 세 곳만 적었는데, 실제로는 가이드 22곳의 지침 문장이나 머리 주석이 이 이름을 썼습니다.
      - 칠해지는 글자색이 원래 적은 색과 같은 가이드는 필드 이름만 쉬운 말(노드·C4·경계)로 바꿨습니다.
      - 칠해지는 색이 다른 가이드(synthwave·artdeco-luxe·darkluxe·riso-print 등)는 이름만 바꾸면 틀린 문장이 됩니다. 그래서 경계 라벨과 노드·C4 글자를 나눠 다시 썼습니다. 원문: packages/visualization-style-guide-catalog/src/synthwave.tsx:323
    - **정할 것**
      이 범위로 고친 것을 받아들일 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 둔다 | 가이드 22곳의 공개 문구가 바뀐다 | 지침 문장이 실제 그림과 맞는다 |
    | 이름만 바꾸고 문장 내용은 되돌린다 | 몇몇 가이드의 문장이 실제 글자색과 다른 채 남는다 | 바뀌는 공개 문구가 줄어든다 |

    > **판정**
    >
    > - 반려 · ai · 2026-10-11
    > - 철회 · ai · 2026-10-11

    > **추가 의견**
    >
    > - ai · 2026-10-11 — 검토자 확인 (1/2): 22곳으로 넓힌 것 자체는 의도 안입니다. 검증 3번의 grep(tagColor 0줄)을 통과하려면 이름이 들어간 문장은 어차피 다 고쳐야 하고, 내용을 다시 쓴 것은 유저가 고른 「지금 그림 유지」(칠하는 글자색이 기준)를 따른 것입니다. 그런데 추천안의 결과로 적은 「지침 문장이 실제 그림과 맞는다」는 사실이 아닙니다. 내용을 다시 쓴 가이드 셋에서, 같은 지침 안의 다른 문장이 새 요약과 부딪칩니다. artdecoLuxe.tsx:321 은 노드 글자가 골드로 칠해진다고 쓰는데 :323 은 「텍스트는 크림」, :329 는 「골드 색 텍스트로 본문 라벨 표기 금지」입니다. synthwave.tsx:323 은 네온 잉크가 칠해진다고 쓰는데 :325 는 「텍스트는 니어화이트」, :331 은 「네온 색 텍스트로 본문 라벨 표기 금지(대비 미달)」입니다. darkluxe.tsx 도 :300 과 :302·:307 이 같은 모양입니다. 글자 체계 절(artdeco :315~317 · synthwave :317~319 · darkluxe :294~296)과 description(artdeco :338 · synthwave :340 · darkluxe :317)도 크림·니어화이트 라벨이라고 씁니다. 요약은 「이 색으로 칠한다」고 말하고 바로 아래 금지 목록은 「그 색은 쓰지 말라」고 말하는 상태라, 고치기 전보다 한 가이드 안의 앞뒤가 더 안 맞습니다.
    > - ai · 2026-10-11 — 검토자 확인 (2/2): hud-telemetry 는 노드·C4 글자가 시안 #22D3EE(default)·앰버 #FBBF24(두 번째 색 묶음)로 칠해집니다(빌드한 dist 로 --bbangto-viz-on-* 를 뽑아 확인). 그런데 hudTelemetry.tsx:256 은 「모든 라벨/태그/경계 텍스트는 순백」, :264 는 「시안/앰버 색 텍스트로 본문 라벨 표기 금지」라고 씁니다. 이 가이드도 이 카드가 tagColor: WHITE(064586b hudTelemetry.tsx:41)를 지운 곳이고, :36 주석 「tag는 순백」도 그대로 남았습니다. 지운 필드 이름을 문장에 안 썼을 뿐입니다. 즉 다시 쓸 가이드를 「칠하는 색이 적은 색과 다른가」가 아니라 「지운 이름이 문장에 있는가」로 골랐습니다. 항목 배경의 「칠해지는 색이 다른 가이드(…등)는 다시 썼다」는 이 가이드에는 맞지 않습니다. 반려 사유는 넓힌 범위가 아니라, 항목이 말한 결과와 실제 결과가 다르다는 점입니다.

- [x] 가이드 지침 문장은 지운 필드 이름만 쉬운 말로 바꾸고 실제 글자색과의 차이는 KAN-075 로 넘겼습니다 — 이 처리로 항목 3 의 반려를 닫아도 되는가
      이 의견은 §3-3 「가이드 지침 문장을 실제 글자색에 맞게 고친 범위를 받」 의 추가 의견에서 갈라져 나왔습니다 (추가 2026-10-11).
    - **배경**
      - C4(시스템 구조를 시스템·컨테이너·컴포넌트 수준별 상자로 그리는 다이어그램 표기)의 상자가 `C4Box` 이고, 「노드·C4 글자」는 노드와 그 상자 위 글자입니다. 원문: packages/visualization/src/molecules/C4Box.tsx:24
      - 가이드마다 접근성 지침 문장이 있고, 사람과 에이전트가 가이드를 고를 때 읽는 공개 문구입니다. 가이드 22곳이 이번에 지운 필드 이름(node.tagColor 등)을 문장이나 머리 주석에 썼습니다.
      - 첫 검토 때는 일부 가이드의 요약만 실제로 칠해지는 색 기준으로 고쳤습니다. 그러자 같은 지침의 「텍스트는 크림」·「골드 텍스트 금지」 같은 문장과 부딪혀 항목 3 이 반려됐습니다. 원문: KANBAN/reviews/KAN-069-G0FGTJ.review.md
      - 유저가 「후속 카드로 넘긴다」를 골라, 그렇게 고친 요약 다섯 곳(synthwave·artdeco-luxe·darkluxe·riso-print·bauhaus-geometric)을 원래 문장으로 되돌리고 필드 이름만 쉬운 말(노드·C4·경계)로 바꿨습니다. 원문: packages/visualization-style-guide-catalog/src/synthwave.tsx:323
      - 그래서 지침마다 앞뒤는 맞습니다. 다만 artdeco-luxe·synthwave·darkluxe·hud-telemetry 등에서는 지침이 말하는 글자색(크림·니어화이트·순백)과 실제로 칠해지는 색(골드·네온·시안)이 아직 다릅니다. KAN-061 배포 뒤로 같은 상태이고, 이 카드가 만든 차이는 아닙니다.
      - 어느 쪽을 맞출지는 KAN-075 에서 정합니다. 길은 셋입니다 — 문장 고치기, on 으로 저자 색 지정, 글자색 계산이 경계 라벨 색을 먼저 보게 바꾸기. 원문: packages/visualization/src/tokens/onInk.ts:87
      - changeset 도 「이름만 바꿨고 차이는 KAN-075 에서 정한다」로 고쳤습니다. 원문: .changeset/kan-069-unused-viz-tokens.md:44
    - **정할 것**
      이 처리로 항목 3 의 반려를 닫고 이 카드를 마무리해도 되는가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 닫는다 | KAN-075 가 끝날 때까지 몇몇 가이드의 지침 글자색이 실제와 다르다 | 이 카드는 토큰 정리로 끝나고, 글자색 판단은 가이드 15개를 함께 보는 KAN-075 에서 한다 |
    | 반려를 유지한다 | 이 카드가 KAN-075 의 디자인 판단까지 떠안는다 | 문장과 그림이 이 카드 안에서 맞춰진다 |

    > **판정**
    >
    > - 승인 · ai · 2026-10-11

    > **추가 의견**
    >
    > - ai · 2026-10-11 — 검토자 확인 (1/2): 배경을 대조했고 맞습니다. 되돌린 요약 다섯 줄(synthwave·artdeco-luxe·darkluxe·riso-print·bauhaus-geometric)은 064586b 원문에서 지운 필드 이름만 「노드·C4·경계」로 바꾼 것과 글자 하나까지 같습니다. 같은 지침의 해야 할 것·하지 말 것, 글자 체계 절과도 이제 부딪치지 않습니다(예: artdecoLuxe.tsx 요약 「모든 라벨(노드·C4·경계)은 크림」, :323 「텍스트는 크림」, :329 「골드 색 텍스트로 본문 라벨 표기 금지」). 「이 카드가 만든 차이는 아니다」도 맞습니다. 글자색을 고르는 onInk.ts 는 이 카드에서 바뀌지 않았고, 후보 넷(edge.stroke·shape.stroke·boundary.labelColor·canvas.bg, onInk.ts:87)과 면 색도 가이드 30개에서 그대로입니다. 칠해지는 색이 바뀐 곳은 darkluxe oxblood 하나이고, 그쪽은 문장(웜 크림)에 가까워졌습니다. 유저가 고른 「후속 카드로 넘긴다」의 설명(「이 카드에서는 다시 쓴 세 가이드 요약을 나머지 문장과 맞게 되돌리고 항목 3을 사실대로 고쳐 씁니다」)대로 수행됐습니다. 셋이 다섯으로 늘었지만 riso-print·bauhaus-geometric 도 첫 재작성 때 내용을 고친 곳이라 같은 원칙입니다.
    > - ai · 2026-10-11 — 검토자 확인 (2/2): 넘길 때 보탤 것이 셋 있습니다. 확인 결과를 바꿀 정도는 아닙니다. ① 실제 색과 다른 채 남는 곳은 선택지가 말한 4곳(artdeco·synthwave·darkluxe·hud-telemetry)보다 조금 많습니다. 되돌린 다섯 중 riso-print 는 C4 글자가 다크 잉크가 아니라 리소 파랑 #1E5AA8 이고 teal 묶음은 전부 #0E4A4E 입니다. bauhaus-geometric 은 파랑 타일(container·process) 글자가 흰색이 아니라 크림 #F3EFE4 입니다. 둘 다 차이는 작습니다. KAN-075 메모의 「가이드 15개」에 들 것으로 보이지만, 그 15개 목록은 어디에도 적혀 있지 않습니다. 이 카드가 tagColor 를 지우면 저자 색은 064586b 에서만 읽을 수 있습니다. ② 색 차이는 이 카드가 만든 것이 아니지만, 이 카드가 바꾼 것이 하나 있습니다. 남은 요약 괄호의 「(auditVizContrast 게이트)」는 이제 크림·니어화이트가 아니라 칠해지는 색을 잽니다. 그래서 ≥11:1(artdeco)·≥10.6:1(synthwave)·≥13:1(darkluxe) 같은 숫자는 더 이상 게이트가 재는 값이 아닙니다. aa·aaa 약속 자체는 게이트가 계속 지킵니다. ③ neon-gradient-dark 요약은 이름만 바꾼 것이 아니라 내용을 고친 채 남았습니다. 「계산된 글자색이 대표 색 위 4.5:1 을 넘는다」는 서술은 맞고, 같은 지침의 「라벨은 순백」(바깥 라벨)과도 부딪치지 않습니다.


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-069-G0FGTJ --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-069-G0FGTJ --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-069-G0FGTJ --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
