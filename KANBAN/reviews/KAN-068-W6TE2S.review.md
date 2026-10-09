---
card: KAN-068-W6TE2S
title: 미배포 수정분 배포 — KAN-056·060·065 를 KAN-064 major 전에 (사용자 실행 지시 후)
created: 2026-10-10
branch: KAN-068-W6TE2S
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-068-W6TE2S
base: 7093fcd
status: 검토 대기
---

# KAN-068-W6TE2S 검토 요청 — 미배포 수정분 배포 — KAN-056·060·065 를 KAN-064 major 전에 (사용자 실행 지시 후)

카드: [KAN-068-W6TE2S.md](../cards/KAN-068-W6TE2S.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-068-W6TE2S` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-068-W6TE2S` |
| 베이스 | `7093fcd` |
| 변경 훑기 | `git diff 7093fcd...HEAD` |

**커밋 6건**

```text
e58883a kanban: KAN-068 검토 대행(kanban-reviewer) — 항목 1 승인 · 항목 2 반려(전달 문구가 changeset 보다 넓음 · 18곳 약속 누락 · style guide 이름 없음 · export 서술 충돌) (ai · 검토자)
b2f21ce kanban: KAN-068 검토로 이동 — 검토서(판단 항목 2: visualization 파일 나눔 차이 · 외부 앱 전달 문구) · 검토 리포트
0f41c41 kanban: KAN-068 S2·S3 — 배포 확인(release 둘 초록 · 새 버전 6개) · 배포본 설치·import·수정 4건 확인 · 외부 앱 전달 문구
6e09ff5 kanban: KAN-068 S2 진행 기록 — push · Version PR #10 대조·병합(adb851c), 배포 확인 대기
1fe02e7 kanban: KAN-068 S1 — push 직전 점검 (게이트 5종 초록 · 다음 버전 표 · 나갈 커밋 126개)
01b0efe kanban: KAN-068 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 10개 (+1531 −45)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 2 | 0 |
| `.kanban/log.md` | M | 2 | 2 |
| `.kanban/reviews/KAN-068-W6TE2S.events.jsonl` | M | 13 | 0 |
| `.kanban/reviews/KAN-068-W6TE2S.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 24 | 31 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 7 | 7 |
| `KANBAN/cards/KAN-068-W6TE2S.md` | M | 11 | 3 |
| `KANBAN/reviews/KAN-068-W6TE2S.review.html` | M | 1253 | 0 |
| `KANBAN/reviews/KAN-068-W6TE2S.review.md` | M | 196 | 0 |

**롤백 태그 0개** — 없음(`--tags` 를 넘기지 않았거나 아직 태그가 없습니다)

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-068-W6TE2S.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 1.4.0 · foundations 1.1.2 · core 1.2.1 · style-guide-catalog 0.3.3 · visualization 0.4.1 · visualization-style-guide-catalog 0.3.2 가 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- 이번 배포에 major 가 없다. visualization 이 1.0.0, foundations 가 2.0.0 이 되지 않았다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(test:unit 단계 포함)
- 배포된 core 의 의존이 tokens 1.4.0 이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 세 장의 수정이 배포 dist 에 들어 있다(S3 의 네 가지)
- 외부 앱에 전할 문구가 수행 내역에 있다. 바뀐 동작(포커스 테두리 색이 바뀐 색 스킴 · viz 템플릿 기본 색이 가이드를 따름 · shattered-glass rose 포커스 금색)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens foundations core style-guide-catalog visualization visualization-style-guide-catalog; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-core@1.2.1 … react react-dom
# node -e "import('@centurio1987/bbangto-ui-tokens').then(m => console.log(typeof m.focusContrast))"
```

**실행 결과**

```text
KAN-068 검증 결과 (2026-10-10, 카드 「검증」 절 기준)
1) 새 버전 6개: tokens 1.4.0 · foundations 1.1.2 · core 1.2.1 · style-guide-catalog 0.3.3 · visualization 0.4.1 · visualization-style-guide-catalog 0.3.2 — tokens 는 사용자 npm view, 6개 모두 npm install 로 설치한 version 이 기대와 같음
2) major 없음: changeset status 「would release NO packages as a major」, Version PR #10 의 version 줄 6개가 모두 patch·minor (visualization 0.4.1 · foundations 1.1.2)
3) release 실행: 37953798674(push 7093fcd → Version PR #10 생성) success · 37954018900(PR 병합 adb851c → publish) success — 사용자 gh run list
4) 의존: core·foundations·visualization → tokens 1.4.0 · style-guide-catalog → core 1.2.1·tokens 1.4.0 · visualization-style-guide-catalog → visualization 0.4.1·tokens 1.4.0, workspace:* 0건. Node 이름 import 6개 exit=0
5) 수정 4건: tokens focusContrast·surfaceColors 함수 · FOCUS_CONTRAST_MIN 3 / foundations aurora-yellow 포커스 #9E9301 / style-guide-catalog var(--bbangto-semantic-border-focus 53건 / visualization C4CodeDiagram.js 의 #555555 0건
6) 배포 dist ↔ push 직전 점검 때의 저장소 빌드: tokens 3 · foundations 6 · core 967 · style-guide-catalog 447 · visualization-style-guide-catalog 151 파일 바이트 같음. visualization 708개 중 562개 같음, 다시 묶은 minify 크기 같음(3항 1)
7) 외부 앱 전달 문구: 카드 수행 내역에 기록 — 보낼 것은 정정본 KANBAN/cards/KAN-068-W6TE2S.md:97 (3항 2 반려 반영)
8) 게이트 5종(push 직전 점검, main 7093fcd 와 같은 코드): typecheck · build · test 1293/1293(193파일) · storybook build · test:unit 647 초록
배포 변경 자체(버전·CHANGELOG·changeset 소진 15파일)는 카드 브랜치가 아니라 main 의 7e3f287(Version PR #10)에 있음
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-068-W6TE2S --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-068-W6TE2S --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-068-W6TE2S --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 배포된 visualization 이 저장소 빌드와 파일 나눔만 다른 것을 「내용이 같다」로 받아도 되는가 — 다시 묶어 견주니 코드는 같고 파일을 나눈 방식과 이름만 달랐습니다
    - **배경**
      - 배포본을 받아, push 직전 점검 때 저장소에서 빌드한 결과와 파일마다 견줬습니다. 다섯 패키지는 모든 파일이 바이트까지 같았고, visualization 만 708개 중 562개가 같았습니다. 원문: KANBAN/cards/KAN-068-W6TE2S.md:96
      - 다른 것은 코드를 여러 조각 파일(chunk)로 나눈 방식과 그 파일 이름입니다. 외부 앱처럼 esbuild 로 다시 묶어 줄이면 크기가 전체 200,330B, BarChart 8,958B, C4CodeDiagram 13,569B 로 양쪽이 같습니다. 원문: bundle-budget.json:7
      - 경로 주석과 이름 끝의 숫자를 빼고 줄을 견주면 전체 10,499줄 중 다른 줄은 react 를 불러오는 줄 2개의 이름 순서뿐입니다.
      - 나눔이 왜 달라졌는지는 확인 안 함입니다. 배포 빌드는 GitHub Actions 의 리눅스에서, 저장소 빌드는 이 맥에서 돌았고, visualization 은 빌드 입구를 파일 글롭(이름 패턴)으로 잡습니다. 원문: packages/visualization/tsup.config.ts:33
      - 배포 워크플로는 publish 직전에 배포할 바로 그 빌드 결과로 크기 게이트를 돌리고, 이번 실행(37954018900)이 초록이었습니다. 그래서 배포본이 크기 상한 안에 든다는 것은 나눔 차이와 상관없이 확인됐습니다. 원문: .github/workflows/release.yml:48
    - **정할 것**
      나눔 차이를 그대로 받을 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 받는다 | visualization 은 배포본과 저장소 빌드를 파일 단위로 견주면 계속 어긋난다 | 이 카드는 지금 상태로 끝난다 |
    | 후속 카드를 만든다 | 빌드 입구 순서를 고정하는 일이 백로그에 하나 는다 | 다음 배포부터 파일 단위로도 같아지는지 볼 수 있다(그렇게 될지는 확인 안 함) |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 외부 앱에 보낼 전달 문구를 이대로 지금 보내도 되는가 — changeset 세 장의 「바뀐 동작」을 빠짐없이 옮겼습니다
    - **배경**
      - 외부 앱은 배포본만 설치하므로, 이번 수정이 그쪽 화면에서 무엇을 바꾸는지는 이 문구로만 알 수 있습니다. 원문: KANBAN/cards/KAN-068-W6TE2S.md:95
      - 문구는 다섯 갈래입니다. 새 버전 6개, 포커스 테두리 색이 짙어진 색 스킴(foundation 21개, style guide 색 스킴 10개), 모티프 버튼 포커스(shattered-glass rose 가 시안에서 금색으로 바뀌는 것 포함), viz 템플릿 13개의 기본 색, 그리고 KAN-055 때 알린 「흐린 포커스 테두리」 한계가 풀렸다는 소식입니다.
      - 내용은 changeset 원문에서 옮겼고, 수정 네 건은 배포본 안에서 직접 찾았습니다. 원문: KANBAN/cards/KAN-068-W6TE2S.md:96
      - 이번 배포에는 major 가 없어서, 외부 앱이 지금 버전 범위로 업데이트만 받으면 됩니다. 외부 앱이 실제로 어떤 범위를 쓰는지는 확인 안 함입니다.
      - 다음 배포에는 KAN-064 의 major 4개가 실려 외부 앱이 범위를 올려야 합니다. 그 안내는 KAN-064 를 배포할 때 따로 씁니다.
    - **정할 것**
      이 문구를 이대로 지금 외부 앱에 보낼 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 이대로 지금 보낸다 | 색 스킴 이름 목록까지 들어가 문구가 길다 | 외부 앱이 포커스 색과 템플릿 색이 바뀐 화면을 미리 안다 |
    | 줄여서 보낸다 | 어느 색 스킴이 바뀌었는지는 외부 앱이 CHANGELOG 를 따로 봐야 한다 | 문구가 짧아진다 |
    | KAN-064 배포 때 함께 보낸다 | 그때까지 외부 앱은 이번 수정이 나온 것을 모른다 | 안내가 한 번으로 줄지만 major 안내와 섞인다 |

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
     `review-judge --card KAN-068-W6TE2S --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-068-W6TE2S --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-068-W6TE2S --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
