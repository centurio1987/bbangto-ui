---
card: KAN-074-KAZBTF
title: 미배포 변경 배포 — KAN-057·061·067 과 KAN-064 major 4개 (tokens 1.5.0 · core 1.2.2 · visualization·style-guide-catalog·visualization-style-guide-catalog 1.0.0 · foundations 2.0.0)
created: 2026-10-10
branch: KAN-074-KAZBTF
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-074-KAZBTF
base: 9cbd196
status: 승인
---

# KAN-074-KAZBTF 검토 요청 — 미배포 변경 배포 — KAN-057·061·067 과 KAN-064 major 4개 (tokens 1.5.0 · core 1.2.2 · visualization·style-guide-catalog·visualization-style-guide-catalog 1.0.0 · foundations 2.0.0)

카드: [KAN-074-KAZBTF.md](../cards/KAN-074-KAZBTF.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-074-KAZBTF` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-074-KAZBTF` |
| 베이스 | `9cbd196` |
| 변경 훑기 | `git diff 9cbd196...HEAD` |

**커밋 2건**

```text
142ea0f kanban: KAN-074 S2·S3 끝 — push 92커밋 · Version PR #11 대조·병합 · publish 6개(tokens 1.5.0 · core 1.2.2 · foundations 2.0.0 · visualization·style-guide-catalog·visualization-style-guide-catalog 1.0.0) · 배포본 변경 4건 확인 · 외부 앱 전달 문구
0168161 kanban: KAN-074 할 일 → 진행 중 · S1 push 직전 점검 끝 — major 4개 표 · 게이트 5종 초록(test 1300/1300 · test:unit 702) · 나갈 커밋 92개
```

**변경 파일 6개 (+29 −21)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 12 | 12 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 3 | 3 |
| `KANBAN/cards/KAN-074-KAZBTF.md` | M | 10 | 3 |

**롤백 태그 0개** — 없음(`--tags` 를 넘기지 않았거나 아직 태그가 없습니다)

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-074-KAZBTF.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 1.5.0 · core 1.2.2 · foundations 2.0.0 · style-guide-catalog 1.0.0 · visualization 1.0.0 · visualization-style-guide-catalog 1.0.0 이 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- hooks 는 0.3.1 그대로다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(「Generated manifests are committed」 · test:unit 단계 포함)
- 배포된 패키지의 의존이 실제 버전이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 네 장의 변경이 배포본에 들어 있다(S3 의 네 가지). 특히 KAN-064 상세 파일이 배포본에 실렸다
- 외부 앱에 전할 문구가 수행 내역에 있다. 범위를 올려야 받는 패키지 4개, 깨지는 곳(매니페스트 색인 모양), 바뀐 동작(viz 글자색 · 연결선 대시 · viz 배포물에서 빠진 문서 두 개)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens core foundations style-guide-catalog visualization visualization-style-guide-catalog hooks; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-visualization@1.0.0 … react react-dom
# node -e "console.log(require.resolve('@centurio1987/bbangto-ui-visualization/manifest/VT-101.json'))"
```

**실행 결과**

```text
검증 실행 2026-10-10 04:10~04:15 (착수한 세션)
[레지스트리] npm view @centurio1987/bbangto-ui-<n> version --registry https://npm.pkg.github.com
  tokens 1.5.0 · core 1.2.2 · foundations 2.0.0 · style-guide-catalog 1.0.0 · visualization 1.0.0 · visualization-style-guide-catalog 1.0.0 · hooks 0.3.1 — 검증 기준과 같음
[release 워크플로] gh run list --workflow release.yml --limit 2
  37978338051 success — main push(9cbd196), Version PR #11 생성, 2026-10-09T19:09:57Z
  37978559843 success — PR #11 병합 push(a15549a), publish 6개, 2026-10-09T19:11:51Z
  두 실행 모두 Build packages · Generated manifests are committed · Unit gates (bundle size included) · Create Release PR or Publish 단계 success
[Version PR 대조] PR #11 16파일 — changeset 4장 소진 · package.json 6개는 version 줄만 · CHANGELOG 6개. 버전이 S1 표와 같음. mergeable CLEAN, main 위 커밋 1개(7849962)
[push 전 게이트] 워크트리(9cbd196)에서 install · build · 생성 파일 5개 git diff 0 · typecheck · test:unit 702 · test 1300/1300(194파일) · storybook build 초록
[의존·import] 배포본 의존은 모두 실제 버전(core·foundations·visualization → tokens 1.5.0 · style-guide-catalog → core 1.2.2·tokens 1.5.0 · visualization-style-guide-catalog → visualization 1.0.0·tokens 1.5.0). workspace:* 0. Node 이름 import 6개 성공
[changeset 변경 4건] 057 계약 스타일시트 stroke-dasharray: var(--bbangto-viz-edge-dash-pattern) · [data-viz-part="connector"] / 061 visualizationFoundationToStyleObject 가 --bbangto-viz-on-* 20개, tokens d.ts on?: / 064 색인 4개 axis·detail·columns·rows, 상세 파일 51·30·76·87개 = rows, 상세 서브패스 import 성공 / 067 core·visualization README 「원하는 것이 없을 때」, visualization 배포물에 관리 문서 둘 없음
[로컬 main] origin/main 으로 fast-forward(a15549a)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-074-KAZBTF --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-074-KAZBTF --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-074-KAZBTF --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [x] 외부 앱에 보낼 문구를 지금 그대로 보낼 것인가 — 추천은 그대로 보내기입니다
    - **배경**
      - 외부 앱은 배포된 버전만 설치할 수 있다. 이번 배포는 패키지 넷이 major 라 앱이 버전 범위를 올려야 받는다. 이 문구가 그 안내다. 원문: KANBAN/cards/KAN-074-KAZBTF.md:92
      - 문구에는 새 버전과 범위를 올려야 하는 패키지, 깨지는 곳 하나(매니페스트 JSON 색인 모양), 바뀐 동작 셋(viz 글자색 · 연결선 대시 · visualization 배포물에서 빠진 문서 둘)이 들어 있다. 원문: KANBAN/cards/KAN-074-KAZBTF.md:92
      - 깨지는 곳의 전후 예제 코드는 changeset 에 있고 지금은 저장소의 CHANGELOG 로 옮겨졌다. 배포된 패키지에는 CHANGELOG 가 실리지 않는다(visualization 배포물은 dist · manifest · README · package.json · type.manifest.json 뿐). 원문: .changeset/kan-064-manifest-index.md:21
      - 네 변경이 배포본에 실제로 실린 것은 확인했다. 원문: KANBAN/cards/KAN-074-KAZBTF.md:93
      - 문구를 실제로 외부 앱에 보내는 일은 이 저장소 밖이라 사용자가 한다
    - **정할 것**
      지금 문구 그대로 보낼 것인가, 매니페스트 예제를 덧붙여 보낼 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 보낸다 | 매니페스트 JSON 을 읽는 앱은 문구의 설명(columns 순서 · ./manifest/<이름>.json)만 보고 옮긴다 | 대부분의 앱은 범위만 올리면 끝나고, 매니페스트를 읽는 앱만 그 자리를 고친다 |
    | 저장소 CHANGELOG 의 전후 예제를 덧붙여 보낸다 | 문구가 길어진다 | 매니페스트를 읽는 앱이 예제를 그대로 따라 옮길 수 있다 |

    > **판정**
    >
    > - 승인 · 유저 · 2026-10-10

    > **추가 의견** — _아직 없습니다._


## 4. 판정

<!-- 문서 하나에 대한 판정이다. **항목별로 갈리는 말은 여기 적지 않는다** — 3항 각 의견의
     「판정」과 「추가 의견」이 그 자리다. 여기 남는 것은 그 항목들이 전부 승인으로 닫혔다는
     사실 하나뿐이다.
     아래 「판정 이력」은 **덧붙기만 하는 이력**이다. 왕복이 돌면 줄이 쌓이고, 그것이 이 문서가
     무엇을 거쳐 승인에 닿았는지의 전부다 — 지우지 않는다. **판정에는 사유 칸이 없다** —
     승인은 대체로 덧붙일 말이 없고, 있다면 그것은 문서 전체가 아니라 그 항목에 대한
     말이라 3항의 「추가 의견」이 받는다.
     `review-judge --card KAN-074-KAZBTF --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: 승인

**판정 이력**:

- 승인 · 유저 · 2026-10-10

- 승인이면 → `apply --op move --id KAN-074-KAZBTF --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-074-KAZBTF --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
