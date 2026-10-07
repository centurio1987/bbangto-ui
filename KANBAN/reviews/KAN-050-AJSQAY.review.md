---
card: KAN-050-AJSQAY
title: 문서 정리 D — 규율 문서 실측 정합 (theme-* 부재 · 모션 5중 기재)
created: 2026-10-07
branch: KAN-050-AJSQAY
worktree: /Users/centurio/orca/workspaces/bbangto-ui/KAN-050-AJSQAY
base: 1c67396
status: 검토 대기
---

# KAN-050-AJSQAY 검토 요청 — 문서 정리 D — 규율 문서 실측 정합 (theme-* 부재 · 모션 5중 기재)

카드: [KAN-050-AJSQAY.md](../cards/KAN-050-AJSQAY.md)

> 이 문서는 **검토를 위한 산출물**이다. 수행 내역은 카드 실행 문서에 있고, 착수 전
> 계획은 배치 문서에 있다. 여기 있는 것은 "지금 이 브랜치를 무엇으로 판정하는가" 뿐이다.

## 1. 검토 대상

| 항목 | 값 |
|---|---|
| 브랜치 | `KAN-050-AJSQAY` |
| 워크트리 | `/Users/centurio/orca/workspaces/bbangto-ui/KAN-050-AJSQAY` |
| 베이스 | `1c67396` |
| 변경 훑기 | `git diff 1c67396...HEAD` |

**커밋 8건**

```text
fa050b8 KAN-050 검토 반영: 검토자 지적 잔여 3건 (README every theme · 링크 글자 · 전략 §7 고대비)
db09d50 kanban: KAN-050 검토자(opus) 항목 판정 3건 승인 + 추가 의견 3건
803270d kanban: KAN-050 검토서 발행(판단 항목 3, base 1c67396) + 검토로 이동 + 검토 리포트
210eef3 KAN-050 S4: 메타데이터 감사 §2-2 → 전략 §7 단일화 + 게이트 5종 초록
cc6c3a6 KAN-050 S3: 모션 워크플로를 MOTION_QUALITY_CHECKLIST 한 곳으로 (README·catalog §6·§7 은 링크)
5439b79 KAN-050 S2: 깨진 링크·템플릿 drift·옛 패키지 이름 정리 (링크 0·잔여 grep 0줄)
8623c7d KAN-050 S1: theme-* 경로·「5개 테마」·패키지 구조를 실측으로 (9파일, 잔여 grep 0줄)
4d0834f kanban: KAN-050 진행 중으로 이동
```

**변경 파일 29개 (+1755 −184)**

| 파일 | 상태 | 추가 | 삭제 |
|---|:--:|---:|---:|
| `.kanban/archive.jsonl` | M | 5 | 0 |
| `.kanban/log.md` | M | 5 | 5 |
| `.kanban/reviews/KAN-050-AJSQAY.events.jsonl` | M | 9 | 0 |
| `.kanban/reviews/KAN-050-AJSQAY.review.json` | M | 21 | 0 |
| `.kanban/state.json` | M | 65 | 63 |
| `CLAUDE.md` | M | 9 | 7 |
| `DESIGN_SYSTEM_GUIDE.md` | M | 2 | 2 |
| `KANBAN.board.html` | M | 2 | 2 |
| `KANBAN.md` | M | 9 | 8 |
| `KANBAN/cards/KAN-050-AJSQAY.md` | M | 23 | 9 |
| `KANBAN/reviews/KAN-050-AJSQAY.review.html` | M | 1268 | 0 |
| `KANBAN/reviews/KAN-050-AJSQAY.review.md` | M | 251 | 0 |
| `METADATA_COVERAGE_AUDIT.md` | M | 2 | 7 |
| `QUALITY_CHECKLIST.md` | M | 6 | 7 |
| `_templates/CHECKLIST_INSTANCE.template.md` | M | 4 | 4 |
| `_templates/Component.stories.template.tsx` | M | 5 | 4 |
| `_templates/Component.template.tsx` | M | 1 | 1 |
| `_templates/README.md` | M | 20 | 12 |
| `_templates/hook.template.ts` | M | 2 | 2 |
| `apps/storybook/src/Overview.mdx` | M | 3 | 2 |
| `packages/core/COMPONENT_CATALOG.md` | M | 2 | 2 |
| `packages/core/MOTION_QUALITY_CHECKLIST.md` | M | 12 | 6 |
| `packages/core/motion-catalog.md` | M | 11 | 18 |
| `packages/core/src/motion/README.md` | M | 11 | 16 |
| `packages/foundations/FOUNDATION_METADATA_STRATEGY.md` | M | 3 | 3 |
| `packages/hooks/src/index.ts` | M | 1 | 1 |
| `packages/hooks/src/useIsMounted.ts` | M | 1 | 1 |
| `packages/tokens/src/breakpoints.ts` | M | 1 | 1 |
| `packages/tokens/src/types.ts` | M | 1 | 1 |

**롤백 태그 5개**

```text
kan/KAN-050-AJSQAY/S1
kan/KAN-050-AJSQAY/S2
kan/KAN-050-AJSQAY/S3
kan/KAN-050-AJSQAY/S4
kan/KAN-050-AJSQAY/batch1
```

## 2. 검증 — 기준과 실행 결과

<!-- 기준은 카드 실행 문서 「검증」 절의 사본이다. 정본은 KANBAN/cards/KAN-050-AJSQAY.md 이므로
     기준이 바뀌면 그쪽을 고치고 review-init --refresh 로 이 항만 다시 뜬다.
     결과는 착수한 쪽이 이미 돌린 것이다 — 검토자에게 다시 돌리라고 시키지 않는다.
     **다시 돌려 아래와 다르게 나오면 그 자체가 반려 사유다.** -->

**기준**

문서 카드라 **잔여 grep 0건 + 링크 무결 + 품질 게이트 5종 초록**이 끝의 기준이다. 아래 명령은 레포 루트에서 **bash 로** 돌린다 — zsh 는 `$EXC` 를 낱말로 쪼개지 않아 제외 옵션이 통째로 안 먹는다(S1 에서 실측). 2026-10-07 S2 에서 [1] 넷째 줄을 고쳤다 — 처음 쓴 `\b` 패턴은 `@centurio1987/hooks` 를 놓쳤다. 검토 중(검토자 지적) 둘째 줄에 `every theme` 을 더했다 — `src/motion/README.md:34` 가 빠져 있었다. S4 에서 셋째 줄에 `ARCHETYPE/` 거르기를 더했다 — 새 표기 `ARCHETYPE/Components/Atoms/*` 도 `Atoms/\*` 에 걸린다.

```bash
# [1] 잔여 표기 — 넷 다 0줄이어야 한다 (칸반 산출물·CHANGELOG·감사 기록 원문 제외)
EXC='--exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=storybook-static --exclude-dir=KANBAN --exclude-dir=.kanban --exclude-dir=.claude --exclude=CHANGELOG.md --exclude=KANBAN.md --exclude=KANBAN.board.html --exclude=SATURATION_AUDIT.md'
grep -rn $EXC 'theme-\*\|theme-light\|theme-dark\|theme-amber\|theme-high' .
grep -rni $EXC '5개 테마\|5 themes\|all 5 theme\|every theme' .
grep -rn $EXC "'Foundations/Motion'\|'Atoms/\|'Molecules/\|Atoms/\*\|Molecules/\*" . | grep -v 'ARCHETYPE/'
grep -rnE $EXC '@centurio1987/[a-z]' . | grep -v '@centurio1987/bbangto-ui'

# [2] 고친 문서의 상대 링크가 전부 실재하는 파일을 가리킨다 — 0줄이어야 한다
for f in CLAUDE.md QUALITY_CHECKLIST.md DESIGN_SYSTEM_GUIDE.md METADATA_COVERAGE_AUDIT.md _templates/README.md \
         packages/core/MOTION_QUALITY_CHECKLIST.md packages/core/src/motion/README.md packages/core/motion-catalog.md \
         packages/foundations/FOUNDATION_METADATA_STRATEGY.md; do
  d=$(dirname "$f")
  grep -oE '\]\([^)#]+' "$f" | sed 's/](//' | grep -v '^http' | while read -r p; do
    case "$p" in /*) t=".$p";; *) t="$d/$p";; esac
    [ -e "$t" ] || echo "$f → $p"
  done
done

# [3] 게이트 명령 목록이 모션 문서 셋 중 MOTION_QUALITY_CHECKLIST.md 에만 있다 — 그 파일 하나만 나와야 한다
grep -ln 'pnpm typecheck' packages/core/MOTION_QUALITY_CHECKLIST.md packages/core/src/motion/README.md packages/core/motion-catalog.md

# [4] 품질 게이트 5종 (CLAUDE.md 「4. 품질 게이트 실행」) — 전부 초록
pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit
```

`[4]` 의 `test:unit` 에는 `gateDocs`(게이트 목록에 `test:unit` 이 빠진 문서를 잡는 게이트)가 들어 있다 — 모션 문서에서 목록을 걷다가 반쪽 목록을 남기면 여기서 빨강이 된다.

**실행 결과**

```text
[1a] theme-* 경로 grep → 0줄
[1b] 「5개 테마」 grep → 0줄
[1c] 옛 Storybook 제목 grep (ARCHETYPE/ 거름) → 0줄
[1d] 옛 패키지 이름 grep (@centurio1987/[a-z] 중 bbangto-ui 아님) → 0줄
[2] 고친 문서 9개 상대 링크 → 깨진 링크 0개 (착수 전: DESIGN_SYSTEM_GUIDE.md → ASSET_INTEGRATION_PLAN.md 1개)
[3] 게이트 명령 목록이 있는 모션 문서 → packages/core/MOTION_QUALITY_CHECKLIST.md 하나 (착수 전: 3개)
[4] 품질 게이트 5종 (새 워크트리라 pnpm build 를 먼저 한 번 돌림)
    pnpm typecheck                  rc=0
    pnpm build                      rc=0
    pnpm test                       rc=0  Test Files 184 passed · Tests 1239 passed
    pnpm --filter storybook build   rc=0  Storybook build completed successfully
    pnpm test:unit                  rc=0  hooks 115 · visualization 257 · foundations 62 (gateDocs 포함) · style-guide-catalog 76 · viz-style-guide-catalog 39

[검토 반영 뒤 재확인 — fa050b8, 마크다운 3곳만 바뀜]
[1a]~[1d] (1b 에 every theme 추가) → 0줄
[2] 링크 → 깨진 링크 0개
[3] → packages/core/MOTION_QUALITY_CHECKLIST.md 하나
gateDocs (packages/foundations src/gateDocs.test.ts) → Tests 18 passed
코드·스토리 변경이 없어 typecheck·build·test·storybook build 는 다시 돌리지 않음 (위 [4] 는 210eef3 기준)
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
python3 scripts/kanban.py review-judge <project-root> --card KAN-050-AJSQAY --item <번호> --verdict 승인
# 추가 의견
python3 scripts/kanban.py review-note <project-root> --card KAN-050-AJSQAY --item <번호> --text "<추가 의견>"
# 추가 의견을 반영하다 새 의견이 생겼으면 (맨 뒤에 붙어 앞 번호가 안 밀립니다)
python3 scripts/kanban.py review-item <project-root> --card KAN-050-AJSQAY --add "<주제>
  <상세>"
```

**전체 승인은 살아있는 항목이 전부 승인일 때만 섭니다**(철회는 분모에서 빠집니다). 하나라도
반려·추가 의견·미정이면 4항의 전체 승인도 `→ 완료` 이동도 종료코드 14로 거부됩니다.

- [ ] 컴포넌트 렌더 확인 기준을 「5개 테마」에서 「base foundation 3종」으로 바꿔도 되는가 — 바꿨습니다. Storybook 툴바로 바꿔 볼 수 있는 것이 3종뿐이라서입니다
    - **배경**
      - 품질 체크리스트는 새 컴포넌트를 light·dark·high-contrast·amber-light·amber-dark 5개에서 확인하라고 적고 있었습니다. 원문: QUALITY_CHECKLIST.md:15 (변경 전 — git show 1c67396:QUALITY_CHECKLIST.md)
      - Storybook 상단 툴바에서 바꿔 볼 수 있는 것은 light·dark·high-contrast 3개입니다. 원문: apps/storybook/.storybook/preview.tsx:120
      - amber 둘은 지금 브랜드 프리셋 74종과 같은 「확장 foundation」이고, 컴포넌트 스토리 가운데 amber 를 쓰는 곳은 0개입니다. amber 를 고를 수 있는 곳은 foundation 카탈로그 뷰어 하나입니다. 원문: apps/storybook/src/stories/themes/ThemeStyleGuide.stories.tsx:219
      - 같은 문장이 다섯 문서(품질 체크리스트·체크리스트 템플릿·모션 체크리스트·모션 카탈로그·Storybook 첫 화면)에 있었고 모두 3종으로 고쳤습니다. 원문: apps/storybook/src/Overview.mdx:34
    - **정할 것**
      렌더 확인 기준을 base foundation 3종으로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 3종(툴바)으로 둔다 | amber-dark 같은 확장 foundation 에서 깨지는 것은 체크리스트가 잡지 않는다 | 적힌 규칙과 실제로 할 수 있는 확인이 같아진다 |
    | 5종을 유지하고 amber 확인 방법을 적는다 | 컴포넌트마다 amber 스토리를 따로 써야 한다(지금 0개) | 지켜 온 적 없는 규칙이 문서에 계속 남는다 |
    | 툴바에 amber 둘을 더한다 | Storybook 설정을 고쳐야 해 이 카드 범위를 넘는다 | 5종 확인이 실제로 가능해진다. 별도 카드가 필요하다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 처음 범위 밖 파일 6개를 함께 고쳐도 되는가 — 같은 종류의 낡은 표기라 함께 고쳤고, 그 때문에 KAN-051·KAN-048 과의 의존 기록을 다시 걸었습니다
    - **배경**
      - 인벤토리(KAN-044)가 적은 자리만 고치면 같은 낡은 표기가 다른 문서에 남습니다. 레포 전체를 검색해 더 찾은 곳 가운데 범위 밖 파일이 6개였습니다. 원문: KANBAN/cards/KAN-050-AJSQAY.md 「전략」 → 「인벤토리가 놓친 것」
      - 문서 둘 — 부품 분류 카탈로그에 없는 theme 패키지와 옛 hooks 패키지 이름이, Storybook 첫 화면에 「Theme 토글로 5개 테마」가 적혀 있었습니다. 원문: packages/core/COMPONENT_CATALOG.md:28 · apps/storybook/src/Overview.mdx:34
      - 코드 주석 넷 — tokens 의 types.ts·breakpoints.ts 와 hooks 의 index.ts·useIsMounted.ts 에 옛 패키지 이름(`@centurio1987/core`·`@centurio1987/hooks`)이 있었습니다. 주석 한 줄씩이라 동작은 바뀌지 않습니다. 원문: packages/tokens/src/types.ts:201
      - 범위를 넓히면 칸반의 의존 기록 둘(KAN-051 과 CLAUDE.md 를 함께 고쳐도 된다는 허용, KAN-048 뒤에 한다는 순서)이 저절로 무효가 됩니다. 겹치는 파일은 여전히 CLAUDE.md 하나뿐이라 같은 사유로 다시 걸었습니다. 원문: .kanban/log.md (KAN-050 serialize · 독립성 겹침 용인 줄)
      - 감사 기록 원문(옛 이름 3곳)과 모션 카탈로그의 Wave 0 완료 기록은 과거를 적은 것이라 고치지 않았습니다. 원문: packages/core/catalog/SATURATION_AUDIT.md:192
    - **정할 것**
      범위를 넓혀 함께 고친 것과 의존 기록을 다시 건 것을 그대로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** 그대로 둔다 | 카드 범위가 처음 계획보다 파일 6개 넓어진다 | 같은 낡은 표기가 레포에 한 곳도 남지 않는다 |
    | 범위 밖 6개를 되돌리고 별도 카드로 뺀다 | 한 줄짜리 수정에 카드를 하나 더 세운다 | 그 카드가 끝날 때까지 낡은 표기가 남는다 |

    > **판정** — _아직 없습니다._

    > **추가 의견** — _아직 없습니다._

- [ ] 모션 작업 절차의 기준 문서를 MOTION_QUALITY_CHECKLIST.md 하나로 둘 것인가 — 그렇게 했고, 다른 두 문서에는 링크만 남겼습니다
    - **배경**
      - 같은 절차(테스트 먼저 → 체크리스트 → 구현 → 게이트 → 기록)와 게이트 명령 목록이 모션 문서 셋에 따로 적혀 있었습니다. 원문: packages/core/motion-catalog.md:194
      - CLAUDE.md 와 품질 체크리스트는 이미 MOTION_QUALITY_CHECKLIST.md 를 가리키고 있었습니다. 원문: CLAUDE.md:46 · QUALITY_CHECKLIST.md:80
      - 구현 규약 문서(src/motion/README.md)와 백로그(motion-catalog.md)에서는 겹치는 단계를 걷고 그 문서에만 있는 것(구현 방법 / 다음 항목 찾기·라이선스 확인)만 남겼습니다. 걷은 단계가 기준 문서에 모두 있는지 단계별로 대조했습니다. 원문: packages/core/src/motion/README.md:20
    - **정할 것**
      기준 문서를 MOTION_QUALITY_CHECKLIST.md 로 둘 것인가.

    | 선택지 | 대가 | 그러면 어떻게 되는가 |
    | --- | --- | --- |
    | **추천** MOTION_QUALITY_CHECKLIST.md | README·카탈로그를 읽던 사람은 링크를 한 번 더 따라가야 한다 | 게이트가 바뀌어도 고칠 곳이 한 곳이다 |
    | src/motion/README.md | CLAUDE.md·품질 체크리스트가 가리키는 곳도 바꿔야 한다 | 코드 옆 문서가 기준이 된다 |

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
     `review-judge --card KAN-050-AJSQAY --verdict 승인` 이 이 자리를 쓰고
     frontmatter 의 status 도 함께 고친다. 손으로 적어도 되지만, 그때는 수렴 검사를
     안 거치므로 `validate` 가 항목 판정과 어긋난 승인을 error 로 잡는다. -->

**판정**: (아직 없습니다)

**판정 이력**:

- 승인이면 → `apply --op move --id KAN-050-AJSQAY --to done` 뒤에 `main` 병합과 워크트리 정리(출력의 `cleanup`)
- 반려면 → `apply --op move --id KAN-050-AJSQAY --to doing` 뒤에 `doc-log --entry "<반려 사유>"`.
  요청서는 **지우지도 다시 뜨지도 않는다** — 고친 뒤 그 항목을 `review-judge --verdict 승인` 으로
  뒤집으면 같은 문서에서 수렴한다. 1·2항이 낡았으면 `review-init --refresh` 로 그 두 항만 간다.
