---
card: KAN-057-CCH3E8
title: viz edge.dashPattern 토큰 정리 — 선언만 있고 읽히지 않는 커넥터 대시 토큰을 잇거나 걷기
created: 2026-10-10
branch: KAN-057-CCH3E8
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-057-CCH3E8
base: 9f187fc
status: 검토 대기
---

# KAN-057-CCH3E8 검토 요청 — viz edge.dashPattern 토큰 정리 — 선언만 있고 읽히지 않는 커넥터 대시 토큰을 잇거나 걷기

카드: [KAN-057-CCH3E8.md](../cards/KAN-057-CCH3E8.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-057-CCH3E8` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-057-CCH3E8` |
| 베이스 | `9f187fc` |
| 변경 훑기 | `git diff 9f187fc...HEAD` |

**커밋 8건**

```text
f27145b kanban: KAN-057 S4 — 품질 게이트 5종 초록
910cbb6 docs(viz): KAN-057 S3 — edge.dashPattern JSDoc · 횡단 규칙 3 상태 문장 · changeset
6d87d9d feat(viz): KAN-057 S2 — edge.dashPattern 을 Edge 연결선에 잇는다
e6b2142 test(viz): KAN-057 S1 — 연결선 대시 토큰 스토리 넷 (구현 전 빨강)
c1c9c9f kanban: KAN-057 배치1 착수 시점 판단 — 단일 에이전트(유저 선택) · 나머지 토큰은 KAN-069
2cba2f9 kanban: KAN-057 계획 리포트 (voice 미적용)
7d429e8 kanban: KAN-057 실행 문서(scope·전략·실행 계획·검증) · 배치 계획 1장(S1~S4)
df81318 kanban: KAN-057 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 15개 (+828 −33)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-057-edge-dash-token.md` | M | 19 | 0 |
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 25 | 16 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 12 | 10 |
| `KANBAN/batches/KAN-057-CCH3E8.batch1.md` | M | 81 | 0 |
| `KANBAN/cards/KAN-057-CCH3E8.md` | M | 53 | 0 |
| `KANBAN/reports/KAN-057-CCH3E8.report.html` | M | 499 | 0 |
| `apps/storybook/src/stories/visualization/Headless.stories.tsx` | M | 109 | 0 |
| `packages/tokens/src/visualization.ts` | M | 5 | 0 |
| `packages/visualization/src/atoms/Edge.tsx` | M | 3 | 0 |
| `packages/visualization/src/provider/contractCss.ts` | M | 3 | 0 |
| `packages/visualization/src/tokens/contract.ts` | M | 12 | 1 |
| `packages/visualization/style-classification.md` | M | 3 | 3 |

**롤백 태그 4개**

```text
kan/KAN-057-CCH3E8/S1
kan/KAN-057-CCH3E8/S2
kan/KAN-057-CCH3E8/S3
kan/KAN-057-CCH3E8/S4
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-057-CCH3E8.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

아래를 저장소 루트에서 `bash -c` 로 돌려 모두 통과하면 끝이다.

1. `pnpm test` — `VISUALIZATION/Headless` 의 대시 스토리 넷이 chromium 에서 초록. 계산된 `stroke-dasharray` 로 잰다: 가이드 대시 `4 4` → `4px, 4px`, prop `2 2` → `2px, 2px`, 구조선과 중첩 실선 가이드 → `none`.
2. `grep -rn "계약 스타일시트도 \`Edge\` 도 읽지 않아" packages` — 0건.
3. `git diff main --stat -- packages/visualization-style-guide-catalog` — 0건(카탈로그 값은 안 고친다. 지금 그림이 안 바뀐다는 근거).
4. 품질 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 모두 초록.

**실행 결과**

```text
1. pnpm test — Test Files 193 passed (193) · Tests 1297 passed (1297). Headless 스토리 파일 단독 실행: Tests 8 passed (8) (대시 스토리 넷 포함 — 가이드 대시 4px, 4px · prop 2px, 2px · 축선·눈금 3개 none · 중첩 실선 가이드 안쪽 none, 바깥 4px, 4px)
2. grep -rn "계약 스타일시트도 `Edge` 도 읽지 않아" packages → 0건
3. git diff 9f187fc --stat -- packages/visualization-style-guide-catalog → 0줄 (카탈로그 무변경)
4. 품질 게이트 — pnpm typecheck rc 0 (TS 오류 0) · pnpm build rc 0 · pnpm test rc 0 · pnpm --filter storybook build rc 0 (Storybook build completed successfully) · pnpm test:unit rc 0 (hooks 115 · visualization 257 · foundations 128 · style-guide-catalog 108 · visualization-style-guide-catalog 39 통과)
참고. a11y — 저장소 설정이 a11y test:'todo' 라 pnpm test 는 접근성 위반을 실패로 안 센다. Headless 파일만 test:'error' 로 임시 강제해 8개 통과, 일부러 넣은 alt 없는 img 는 image-alt 로 실패함을 확인한 뒤 되돌렸다
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-057-CCH3E8 --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-057-CCH3E8 --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-057-CCH3E8 --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 가이드 대시를 Edge 연결선에만 걸고, 축선·눈금 같은 구조선은 실선으로 둘 것인가 — 그렇게 했습니다
    - **배경**
      - 카탈로그 가이드 30개와 기본값은 모두 연결선 대시가 빈 값(실선)이라, 이번 변경으로 바뀌는 그림은 없습니다. 원문: packages/visualization-style-guide-catalog/src (edge 블록 31곳 모두 '')
      - 선 색과 두께를 칠하는 계약 스타일시트(스타일 가이드 값을 그림에 묶는 공통 CSS) 규칙은 연결선뿐 아니라 축선·눈금·상자수염·레이더 바퀴살 같은 구조선에도 걸립니다. Edge 밖에서 그 표시를 단 파일이 20개입니다. 원문: packages/visualization/src/provider/contractCss.ts:18
      - 그 규칙에 대시를 붙이면, 가이드가 대시를 고를 때 차트 축까지 점선이 됩니다.
      - 그래서 Edge 가 그리는 선에만 연결선 표시를 하나 더 달고, 대시는 그 표시에만 걸었습니다. 원문: packages/visualization/src/atoms/Edge.tsx:117 · packages/visualization/src/provider/contractCss.ts:22
      - 같은 대시 가이드 아래에서 축선·눈금 3개가 실선으로 남는 것을 스토리로 확인했습니다. 원문: apps/storybook/src/stories/visualization/Headless.stories.tsx:222
    - **정할 것**
      대시가 걸리는 범위를 Edge 연결선으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** Edge 연결선에만 건다 | Edge 를 안 쓰는 관계선(3번 항목)은 가이드를 따라가지 않는다 | 차트 축·눈금은 어느 가이드에서도 실선이다 |
    | 같은 선 색을 쓰는 선 전부에 건다 | 축·눈금·수염까지 점선이 된다 | 대시 가이드에서 차트를 읽기 어려워진다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 빈 대시 값을 none 으로 바꿔 내는 공개 함수의 출력 변화를 patch 로 배포할 것인가 — patch 로 적어 두었습니다
    - **배경**
      - 스타일 가이드 Provider 는 토큰을 CSS 변수로 넣고, React 는 값이 빈 문자열인 변수를 아예 지웁니다. 원문: packages/visualization/src/styleGuide/VisualizationStyleGuideProvider.tsx:61
      - 그러면 대시 가이드 안에 실선 가이드를 겹쳤을 때, 안쪽 연결선이 바깥 대시를 물려받습니다. 대시 규칙만 넣고 돌렸을 때 안쪽 연결선이 4px, 4px 로 나오는 것을 확인했습니다. 원문: KANBAN/cards/KAN-057-CCH3E8.md (수행 내역 두 번째 단계 「잇기」)
      - 그래서 토큰을 CSS 변수로 바꾸는 함수가 이름이 -dash-pattern 으로 끝나는 변수의 빈 값을 none 으로 냅니다. 원문: packages/visualization/src/tokens/contract.ts:20
      - 이 함수는 패키지 밖으로 공개돼 있어, 직접 부르는 앱은 그 변수 값이 '' 에서 none 으로 바뀝니다. 원문: packages/visualization/src/index.ts:33
      - 두 값 모두 SVG 에서 실선이라, 그 변수를 선 모양으로 쓰는 앱의 그림은 같습니다. 값을 문자열로 비교하는 앱만 달라지며, 그런 앱이 있는지는 확인 안 함입니다.
      - 변경 기록(changeset, 배포 때 버전을 정하는 메모)은 visualization patch · tokens patch 이고, 이 변화를 「바뀐 동작」에 적었습니다. 원문: .changeset/kan-057-edge-dash-token.md
    - **정할 것**
      이 출력 변화를 patch 로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** patch 로 둔다 | 값을 문자열로 비교하는 앱이 있으면 말없이 달라진다 | 그림은 그대로이고, 바뀐 점은 변경 기록에 남는다 |
    | minor 로 올린다 | 0.x 에서는 버전 범위(^0.4.x)를 쓰는 앱이 자동으로 못 받는다 | 그림이 안 바뀌는 변경에 깨는 변경 신호를 붙이게 된다 |
    | 변환을 Provider 안에만 두고 공개 함수는 그대로 둔다 | Provider 파일이 이 카드 범위 밖이라 범위를 넓혀야 한다 | 공개 함수를 직접 부르는 앱은 겹침 문제를 그대로 겪는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] Edge 를 안 쓰고 관계선을 직접 그리는 템플릿 넷을 어디서 다룰 것인가 — 이 카드 밖으로 두었습니다
    - **배경**
      - 가이드가 대시를 정하면 Edge 를 쓰는 템플릿·패턴·몰리큘 38개의 연결선은 점선이 되고, 아래 넷의 관계선은 실선으로 남습니다. 한 가이드 안에서 연결선 모양이 템플릿마다 갈립니다.
      - 확인한 넷은 SitemapTree·WorkBreakdownStructure(트리 가지)·GitGraph(커밋 사이 선)·IsometricScene(입체 연결선)입니다. 원문: packages/visualization/src/templates/SitemapTree.tsx:71 · WorkBreakdownStructure.tsx:80 · GitGraph.tsx:92 · IsometricScene.tsx:159
      - Edge 없이 선을 그리는 템플릿·패턴은 24개이고, 관계선인지 직접 본 것은 7개입니다. 나머지 17개는 확인 안 함이며, 이름으로 보면 대부분 차트 축이나 장식선입니다.
      - 지금 카탈로그 가이드는 모두 실선이라, 이 차이가 실제 그림에 나타나는 가이드는 아직 없습니다.
      - 후속 카드 KAN-069(백로그, 읽히지 않는 viz 토큰 정리)는 토큰만 다루고, 이 템플릿들은 범위에 없습니다. 원문: KANBAN.md (main 73248c4)
    - **정할 것**
      이 넷을 어디서 다룰 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** KAN-069 메모에 넷을 더한다 | KAN-069 범위가 토큰 정리에서 템플릿 수정까지 넓어진다 | 대시 가이드가 처음 생기기 전에 한 카드에서 함께 맞춘다 |
    | 새 백로그 카드를 만든다 | 카드가 하나 늘어난다 | 범위가 선명하고 KAN-069 와 따로 돌 수 있다 |
    | 지금은 두고 대시 가이드를 만들 때 다룬다 | 그때까지 차이가 숨어 있다 | 가이드를 만드는 쪽이 알아채야 한다 |

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
     `review-judge --card KAN-057-CCH3E8 --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-057-CCH3E8 --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-057-CCH3E8 --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
