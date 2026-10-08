---
card: KAN-064-AC0H6M
title: AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화
created: 2026-10-08
branch: KAN-064-AC0H6M
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-064-AC0H6M
base: c8f6c86
status: 검토 대기
---

# KAN-064-AC0H6M 검토 요청 — AI 채택 매니페스트 재편 — 메타 필드는 유지, 매니페스트는 얇은 색인으로 축소 + 동기화 장치 단순화

카드: [KAN-064-AC0H6M.md](../cards/KAN-064-AC0H6M.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-064-AC0H6M` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-064-AC0H6M` |
| 베이스 | `c8f6c86` |
| 변경 훑기 | `git diff c8f6c86...HEAD` |

**커밋 9건**

```text
a1eca39 chore(KAN-064): S5 — changeset(4패키지 major) · 게이트 5종 초록
6b837ac kanban: KAN-064↔KAN-065 겹침 용인 사유의 README 절 번호 정정 (ai)
45a7952 docs(KAN-064): S4 — 매니페스트를 색인→상세 2단으로 읽는다고 문서·주석을 고침
36e35b0 chore(KAN-064): S3 — 매니페스트 생성기 4개를 prebuild 로 통일, 상세는 npm 에만
c584ed0 kanban: KAN-064 배치1 끝 — 다음 세션 메모(KAN-062 완료로 README 겹침 해소, 상세 파일은 S3)
05fecac feat(KAN-064): S2 — 매니페스트 4종을 얇은 색인(표 형태)으로, 항목 상세는 manifest/<이름>.json 으로
f5d2f12 kanban: KAN-064 scope 에 census 게이트·상세 폴더 4개 추가 · KAN-055·KAN-065 겹침 용인 재기록(겹치는 파일 그대로, ai)
24bd75e kanban(KAN-064): S1 — 매니페스트 4종 토큰 실측 (전체 156,272 · 표 형태 색인 27,856, 합계 1만은 불가)
47105d0 kanban: KAN-064 진행 중으로 이동 (워크트리 착수)
```

**변경 파일 44개 (+1264 −13882)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.changeset/kan-064-manifest-index.md` | M | 44 | 0 |
| `.github/workflows/release.yml` | M | 12 | 0 |
| `.gitignore` | M | 7 | 0 |
| `.kanban/archive.jsonl` | M | 8 | 0 |
| `.kanban/log.md` | M | 8 | 8 |
| `.kanban/state.json` | M | 98 | 97 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 13 | 13 |
| `KANBAN/cards/KAN-064-AC0H6M.md` | M | 53 | 16 |
| `README.md` | M | 16 | 14 |
| `packages/foundations/FOUNDATION_METADATA_STRATEGY.md` | M | 15 | 7 |
| `packages/foundations/README.md` | M | 2 | 1 |
| `packages/foundations/foundation.manifest.json` | M | 83 | 3701 |
| `packages/foundations/package.json` | M | 4 | 1 |
| `packages/foundations/scripts/genFoundationManifest.ts` | M | 15 | 6 |
| `packages/foundations/src/meta/index.ts` | M | 3 | 2 |
| `packages/foundations/src/meta/manifest.test.ts` | M | 62 | 7 |
| `packages/foundations/src/meta/manifest.ts` | M | 66 | 5 |
| `packages/foundations/src/metadataCoverage.test.ts` | M | 14 | 5 |
| `packages/style-guide-catalog/METADATA_STRATEGY.md` | M | 30 | 15 |
| `packages/style-guide-catalog/README.md` | M | 5 | 3 |
| `packages/style-guide-catalog/catalog.manifest.json` | M | 58 | 3645 |
| `packages/style-guide-catalog/package.json` | M | 3 | 1 |
| `packages/style-guide-catalog/scripts/genManifest.ts` | M | 18 | 6 |
| `packages/style-guide-catalog/src/manifest.test.ts` | M | 79 | 21 |
| `packages/style-guide-catalog/src/manifest.ts` | M | 63 | 2 |
| `packages/tokens/src/foundationMeta.ts` | M | 3 | 2 |
| `packages/tokens/src/styleGuideMeta.ts` | M | 3 | 2 |
| `packages/visualization-style-guide-catalog/catalog.manifest.json` | M | 37 | 1982 |
| `packages/visualization-style-guide-catalog/package.json` | M | 3 | 1 |
| `packages/visualization-style-guide-catalog/scripts/genVizManifest.ts` | M | 17 | 6 |
| `packages/visualization-style-guide-catalog/src/manifest.test.ts` | M | 74 | 22 |
| `packages/visualization-style-guide-catalog/src/manifest.ts` | M | 62 | 4 |
| `packages/visualization/README.md` | M | 20 | 4 |
| `packages/visualization/TYPE_METADATA_STRATEGY.md` | M | 14 | 7 |
| `packages/visualization/package.json` | M | 4 | 1 |
| `packages/visualization/scripts/genTypeManifest.ts` | M | 16 | 6 |
| `packages/visualization/src/index.ts` | M | 2 | 1 |
| `packages/visualization/src/typeMeta/index.ts` | M | 3 | 2 |
| `packages/visualization/src/typeMeta/jsdoc.test.ts` | M | 1 | 1 |
| `packages/visualization/src/typeMeta/manifest.test.ts` | M | 64 | 3 |
| `packages/visualization/src/typeMeta/manifest.ts` | M | 65 | 2 |
| `packages/visualization/tsup.config.ts` | M | 1 | 1 |
| `packages/visualization/type.manifest.json` | M | 94 | 4257 |

**롤백 태그 5개**

```text
kan/KAN-064-AC0H6M/S1
kan/KAN-064-AC0H6M/S2
kan/KAN-064-AC0H6M/S3
kan/KAN-064-AC0H6M/S4
kan/KAN-064-AC0H6M/S5
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-064-AC0H6M.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

- 실측 토큰 표가 「전략」 절에 있고, 얇은 색인 4종 합계가 1만 토큰 안쪽이다(넘으면 사유와 함께 기록).
- `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit` 모두 초록.
- 매니페스트 생성기 4개가 모두 `prebuild` 로 돈다(`gen:foundation-manifest`·`gen:type-manifest` 를 손으로 칠 일이 없다). `rm -rf packages/*/dist` 뒤 매니페스트 생성·검사에서 실패하는 것과 그 사유가 「수행 내역」에 있다. 워크스페이스 전체를 build 없이 돌리는 것은 이 카드의 검증이 아니다(KAN-066).
- `grep -rn "한 개만 로드\|파일 하나로 통째로\|파일로 읽기용" README.md packages/*/README.md packages/*/*STRATEGY.md`가 옛 서술을 0건 낸다.
- 메타 스키마 3종 타입 정의 파일에서 타입 선언이 바뀌지 않았다. 주석은 바뀔 수 있다(`git diff packages/tokens/src/styleGuideMeta.ts packages/visualization/src/typeMeta/types.ts packages/foundations/src/meta/types.ts` 에 주석 줄만 나온다).
- `./manifest.json` 서브패스 형태가 바뀌었으면 changeset이 major로 표시돼 있다.

**실행 결과**

```text
1) 실측 토큰 표: KANBAN/cards/KAN-064-AC0H6M.md 「실측 (S1)」 — 전체 156,272 → 커밋 색인 28,592(축마다 5,179~8,709). 4종 합계 1만은 미달, 사유는 같은 절(판단 항목 1)
2) 게이트 5종(2026-10-08, 이 워크트리): typecheck=0 build=0 test=0 storybook_build=0 test_unit=0 · test 193파일/1292 · test:unit 5패키지 전부 passed
3) prebuild: style-guide-catalog=pnpm gen:manifest; visualization-style-guide-catalog=pnpm gen:manifest; foundations=pnpm gen:foundation-manifest; visualization=pnpm gen:type-manifest
   dist 7개를 지운 뒤: 생성기 UI·viz style guide·foundation 실패(core·visualization·tokens dist), viz 유형 성공 — 수행 내역 S3 줄. 워크스페이스 전체는 KAN-066
4) 옛 서술 grep: exit=1 (0건)
5) 메타 타입 파일 diff(c8f6c86..HEAD): 1 file changed, 3 insertions(+), 2 deletions(-) · 주석 밖 줄 0건
6) changeset: '@centurio1987/bbangto-ui-style-guide-catalog': major '@centurio1987/bbangto-ui-visualization-style-guide-catalog': major '@centurio1987/bbangto-ui-foundations': major '@centurio1987/bbangto-ui-visualization': major
7) CI 커밋 확인 단계: 색인 하나를 일부러 바꾸면 exit=1, 되돌리면 exit=0 (S4)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-064-AC0H6M --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-064-AC0H6M --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-064-AC0H6M --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 목표 「네 종류 합계 1만 토큰」을 「한 번에 고르는 한 종류당 1만 토큰」으로 읽어도 되는가 — 합계 1만은 고를 근거를 남기는 어떤 조합으로도 닿지 않아 한 종류당으로 맞췄습니다
    - **배경**
      - 전에는 AI 가 룩 하나를 고르려면 그 종류의 파일 하나를 통째로 읽어야 했고, UI 룩 파일이 50,325토큰이었습니다. 원문: KANBAN/cards/KAN-064-AC0H6M.md:24
      - 카드 목표는 네 종류를 합쳐 1만 토큰 안쪽이었는데, 한 줄 설명(summary)만 남겨도 네 종류 합계가 13,649토큰이라 닿지 않습니다. 원문: KANBAN/cards/KAN-064-AC0H6M.md:44
      - AI 는 한 번에 한 종류(UI 룩이면 UI 룩만)에서 고르므로, 실제로 읽는 양은 한 종류의 색인입니다. 지금 5,179~8,709토큰이고 전보다 78~83% 적습니다. 원문: packages/style-guide-catalog/METADATA_STRATEGY.md:28
    - **정할 것**
      목표를 한 종류당 1만 토큰으로 읽어도 되는가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 한 종류당 1만으로 읽는다 | 네 종류를 한꺼번에 훑으면 약 2.9만 토큰이 든다 | 지금 상태로 끝난다 |
    | 한 줄 설명을 빼고 이름·분류·태그만 남긴다 | 고를 근거가 태그뿐이라 엉뚱한 후보를 고르기 쉽다 | 합계가 더 줄지만 얼마나 줄지는 재지 않았다 |
    | 목표 미달로 남긴다 | 카드 목표를 못 채운 채 닫는다 | 다른 카드에서 다시 줄일 방법을 찾는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 후보 하나의 자세한 설명(상세 파일 244개)을 저장소에는 커밋하지 않고 배포 패키지에만 싣는 것이 맞는가 — 커밋하면 메타를 고칠 때마다 함께 맞출 파일이 늘어 뺐습니다
    - **배경**
      - 상세 파일은 빌드할 때마다 새로 만들어지고, npm 패키지에는 네 종류 모두 실립니다(51·30·76·87개, npm pack --dry-run 으로 확인). 원문: packages/style-guide-catalog/package.json:20
      - 저장소에는 커밋하지 않으므로, 갓 받은 저장소에서는 빌드하기 전까지 상세 파일이 없습니다. 원문: .gitignore:20
      - 그때 저장소 안에서 일하는 AI 는 룩 소스 파일의 메타를 직접 찾아 읽어야 하는데, 색인에는 소스 파일 위치가 없습니다. 원문: packages/style-guide-catalog/src/manifest.ts:102
      - 저장소 안에서 매니페스트를 읽어 룩을 고른 사례는 진단 때 확인하지 못했습니다(확인 안 함). 원문: KANBAN/cards/KAN-064-AC0H6M.md:22
    - **정할 것**
      상세 파일을 커밋하지 않는 쪽으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 커밋하지 않는다 | 빌드 전 저장소에서는 상세를 소스에서 찾아야 한다 | 메타를 고칠 때 함께 커밋할 파일은 색인 하나뿐이다 |
    | 커밋한다 | 메타를 고칠 때마다 상세 파일도 커밋해야 하고, 빠뜨리면 낡은 채 남는다 | 저장소만 받아도 상세를 바로 읽는다 |
    | 커밋하지 않고 색인에 소스 파일 위치를 더한다 | 색인이 커진다(얼마인지 재지 않음) | 빌드 전에도 색인에서 소스로 바로 간다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 배포 워크플로가 빌드 직후 「다시 만든 색인이 커밋본과 같은가」를 보고, 다르면 배포를 멈추게 해도 되는가 — 빌드가 색인을 늘 다시 쓰게 되면서 기존 검사가 커밋 누락을 못 잡게 돼 더했습니다
    - **배경**
      - 이번에 네 종류 모두 빌드할 때 색인을 다시 쓰게 했습니다. 전에는 색 스킴·다이어그램 유형 두 종류를 손으로 다시 만들어야 했습니다. 원문: packages/foundations/package.json:30
      - 배포 워크플로는 빌드 다음에 검사를 돌립니다. 그래서 메타를 고치고 바뀐 색인을 커밋하지 않아도, 검사는 방금 다시 쓴 파일끼리 비교해 통과합니다. UI·viz 룩 두 종류는 원래 이랬고 이번에 네 종류로 넓어졌습니다. 원문: .github/workflows/release.yml:43
      - 그래서 빌드 직후 색인이 커밋본과 다르면 실패하는 단계를 더했습니다. 색인 하나를 일부러 바꿔 실패하는 것을 확인했습니다. 원문: .github/workflows/release.yml:49
      - 이 워크플로는 main 에 push 할 때마다 버전 PR 과 배포까지 하므로, 이 단계가 실패하면 그 push 의 배포가 멈춥니다. 원문: .github/workflows/release.yml:3
    - **정할 것**
      이 단계를 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 둔다 | 커밋을 빠뜨린 push 는 배포가 멈추고, 색인을 커밋해 다시 push 해야 한다 | 저장소 색인이 배포본과 어긋난 채 남지 않는다 |
    | 뺀다 | 커밋 누락을 잡는 자리가 없다 | 저장소 색인이 낡아도 배포는 된다. 배포본은 빌드가 새로 만들어 늘 맞다 |
    | 두 종류를 손으로 다시 만들던 방식으로 되돌린다 | 손으로 칠 명령이 두 개 돌아온다 | 그 두 종류만 기존 검사가 커밋 누락을 잡는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 이 카드를 KAN-055(수정분 배포)보다 먼저 main 에 합쳐도 되는가 — 먼저 합치면 이 카드의 큰 버전 올림(major) 4개가 KAN-055 배포에 함께 실려서, 배포 뒤에 합치기를 권합니다
    - **배경**
      - 색인 파일의 모양이 바뀌어 그 파일을 읽던 외부 프로그램이 깨질 수 있어서, 네 패키지를 큰 버전 올림으로 적었습니다. 원문: .changeset/kan-064-manifest-index.md:1
      - KAN-055 는 main 에 쌓인 변경 기록을 모아 한 번에 배포하는 카드이고, push 실행 지시를 기다리며 백로그에 있습니다. 원문: KANBAN/cards/KAN-055-34A57K.md:13
      - 먼저 합치면 그 배포에서 visualization 0.4.0 → 1.0.0, foundations 1.1.1 → 2.0.0, 두 룩 카탈로그 0.3.x → 1.0.0 으로 올라갑니다. 외부 앱이 지금 범위(예: ^0.4.0)로 받으면 같은 배포에 실린 다른 수정(예: KAN-056 의 viz 템플릿 색 수정)도 받지 못합니다. 외부 앱이 색인 파일을 실제로 읽는지는 확인 안 함. 원문: .changeset/kan-056-template-paint.md:2
    - **정할 것**
      병합 순서를 어떻게 할 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** KAN-055 배포 뒤에 합친다 | 검토를 마친 뒤에도 이 카드가 병합을 기다린다 | 수정분은 지금 버전 줄(0.4.x·1.1.x 등)로, 이 카드는 다음 배포에서 큰 버전으로 따로 나간다 |
    | 지금 합친다 | KAN-055 배포에 큰 버전 올림이 섞인다 | 배포가 한 번으로 끝나지만 외부 앱은 수정분을 받으려면 큰 버전으로 올려야 한다 |

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
     `review-judge --card KAN-064-AC0H6M --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-064-AC0H6M --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-064-AC0H6M --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
