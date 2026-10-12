---
card: KAN-079-CFS73T
title: 미배포 변경 배포 — KAN-069·070·072·075 (tokens·visualization·visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1)
created: 2026-10-12
branch: KAN-079-CFS73T
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-079-CFS73T
base: 30b92b7
status: 검토 대기
---

# KAN-079-CFS73T 검토 요청 — 미배포 변경 배포 — KAN-069·070·072·075 (tokens·visualization·visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1)

카드: [KAN-079-CFS73T.md](../cards/KAN-079-CFS73T.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-079-CFS73T` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-079-CFS73T` |
| 베이스 | `30b92b7` |
| 변경 훑기 | `git diff 30b92b7...HEAD` |

**커밋 5건**

```text
5c9bbd5 kanban: KAN-079 S3 배포본 확인 — 6개 설치·import · changeset 4건 확인 · 외부 앱 문구 기록
5feef8e kanban: KAN-079 S2 배포 — push · Version PR #12 병합 · 새 버전 6개 publish
4390c5b kanban: KAN-079 S1 push 직전 점검 — 게이트 5종 초록 · 버전 표 확인
ea09b75 kanban: KAN-079 실행 문서 — 전략·실행 계획(S1~S3)·검증 · 인스턴트 예외 기록
f79a81c kanban: KAN-079 진행 중으로 이동
```

**변경 파일 6개 (+132 −27)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 1 | 0 |
| `.kanban/log.md` | M | 1 | 1 |
| `.kanban/state.json` | M | 33 | 22 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 3 | 2 |
| `KANBAN/cards/KAN-079-CFS73T.md` | M | 92 | 0 |

**롤백 태그 0개** — 없음(`--tags` 를 넘기지 않았거나 아직 태그가 없습니다)

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-079-CFS73T.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

### 무엇이 나오면 끝인가

- GitHub Packages 에 tokens 2.0.0 · visualization 2.0.0 · visualization-style-guide-catalog 2.0.0 · core 1.2.3 · foundations 2.0.1 · style-guide-catalog 1.0.1 이 있다(S1 에서 표가 바뀌면 그 표를 따른다)
- hooks 는 0.3.1 그대로다
- release 워크플로 실행 둘(PR 생성 · 배포)이 초록이다(「Generated manifests are committed」 · test:unit 단계 포함)
- 배포된 패키지의 의존이 실제 버전이고 `workspace:*` 가 아니며, 여섯 패키지가 Node 에서 import 된다
- changeset 네 장의 변경이 배포본에 들어 있다(S3 의 네 가지)
- 외부 앱에 전할 문구가 수행 내역에 있다. 범위를 올려야 받는 패키지 3개, 깨지는 곳(지운 토큰 필드와 대신 쓸 것), 바뀐 동작(경계선 · 글자색 · 연결선 대시 범위)을 빠뜨리지 않는다

### 확인 방법

```bash
for n in tokens core foundations style-guide-catalog visualization visualization-style-guide-catalog hooks; do
  npm view @centurio1987/bbangto-ui-$n version --registry https://npm.pkg.github.com
done
gh run list --workflow release.yml --limit 2
# 스크래치 폴더: @centurio1987 레지스트리를 npm.pkg.github.com 으로 두고
#   npm install @centurio1987/bbangto-ui-visualization@2.0.0 … react react-dom
```

**실행 결과**

```text
tokens 2.0.0
core 1.2.3
foundations 2.0.1
style-guide-catalog 1.0.1
visualization 2.0.0
visualization-style-guide-catalog 2.0.0
hooks 0.3.1
completed	success	Merge pull request #12 from centurio1987/changeset-release/main	38215836553
completed	success	kanban: 직렬 중재 KAN-078 → KAN-076(유저 지시) · 두 카드 메모에 scope 정할 때 직렬 다시 걸기	38215665090
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-079-CFS73T --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-079-CFS73T --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-079-CFS73T --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 외부 앱에 보낼 문구를 지금 그대로 보낼 것인가 — 추천은 그대로 보내기입니다
    - **배경**
      - 외부 앱은 배포된 버전만 설치할 수 있다. 이번 배포는 tokens·visualization·visualization-style-guide-catalog 셋이 major 라 앱이 버전 범위를 올려야 받는다. 이 문구가 그 안내다. 원문: KANBAN/cards/KAN-079-CFS73T.md:91
      - 문구에는 새 버전과 범위를 올려야 하는 패키지, 깨지는 곳 하나(시각화 가이드 토큰에서 지운 필드와 대신 쓸 것), 바뀐 그림 셋(경계선 · 글자색 · 연결선 대시 범위)과 README 정정 하나가 들어 있다. 원문: KANBAN/cards/KAN-079-CFS73T.md:91
      - 깨지는 곳은 자기 시각화 가이드를 만들어 지운 필드를 적은 앱에만 있다. 카탈로그 가이드만 쓰는 앱은 범위만 올리면 된다. 원문: packages/tokens/CHANGELOG.md:24
      - 지운 필드 표와 부품 글자색 전후 표는 저장소 CHANGELOG 에만 있고, 배포된 패키지에는 CHANGELOG 가 실리지 않는다. 원문: packages/visualization/CHANGELOG.md:84
      - 네 변경이 배포본에 실제로 실린 것은 확인했다. 원문: KANBAN/cards/KAN-079-CFS73T.md:92
      - 문구를 실제로 외부 앱에 보내는 일은 이 저장소 밖이라 사용자가 한다
    - **정할 것**
      지금 문구 그대로 보낼 것인가, 저장소 CHANGELOG 의 두 표를 덧붙여 보낼 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 보낸다 | 자기 가이드를 만든 앱은 문구의 필드 목록만 보고 옮긴다 | 대부분의 앱은 범위만 올리면 끝나고, 지운 필드를 적은 앱만 그 줄을 지운다 |
    | CHANGELOG 의 지운 필드 표와 부품 글자색 표를 덧붙인다 | 문구가 길어진다 | 부품을 직접 쓰는 앱이 바뀐 글자색을 부품마다 짚어 볼 수 있다 |

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
     `review-judge --card KAN-079-CFS73T --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-079-CFS73T --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-079-CFS73T --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
