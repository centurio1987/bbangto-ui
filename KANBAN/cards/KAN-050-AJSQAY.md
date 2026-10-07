---
card: KAN-050-AJSQAY
title: 문서 정리 D — 규율 문서 실측 정합 (theme-* 부재 · 모션 5중 기재)
created: 2026-08-25
scope: CLAUDE.md, QUALITY_CHECKLIST.md, DESIGN_SYSTEM_GUIDE.md, _templates/**, packages/core/MOTION_QUALITY_CHECKLIST.md, packages/core/src/motion/README.md, packages/core/motion-catalog.md, METADATA_COVERAGE_AUDIT.md, packages/foundations/FOUNDATION_METADATA_STRATEGY.md, packages/core/COMPONENT_CATALOG.md, apps/storybook/src/Overview.mdx, packages/tokens/src/types.ts, packages/tokens/src/breakpoints.ts, packages/hooks/src/index.ts, packages/hooks/src/useIsMounted.ts
---

# KAN-050-AJSQAY — 문서 정리 D — 규율 문서 실측 정합 (theme-* 부재 · 모션 5중 기재)

## 전략
**규율 문서가 가리키는 경로·이름·구조를 지금 레포에 맞춘다. 규율의 내용(무엇을 해야 하는가)은 바꾸지 않는다.** 예외는 「5개 테마에서 렌더 확인」 한 줄뿐이고, 그것은 검토서 판단 항목으로 올린다(아래 「고른 값」).

### 선행 KAN-048 완료 뒤 다시 세운 것 (2026-10-07)

KAN-044 인벤토리(`KANBAN/reports/KAN-044-3KYT2Q.inventory.md` §13-D, 2026-08-25)를 출발점으로 삼되, 그 뒤 레포가 바뀐 것을 실측으로 다시 확인했다.

- KAN-048 이 `ASSET_INTEGRATION_PLAN.md` 를 지웠고 `DESIGN_SYSTEM_GUIDE.md:182` 는 지금 **없는 파일을 가리킨다.** 직렬 중재가 막으려던 상태 그대로이고, 이 카드가 고칠 차례다. 흡수처는 `packages/core/COMPONENT_CATALOG.md` 「Wave 실행 기록」 절(:167)이다.
- KAN-046 이 `CLAUDE.md` 게이트 목록에 `pnpm test:unit` 을 이미 넣었다. 인벤토리 §8 의 「`test:unit` 누락」은 해소됐으므로 할 일에서 뺀다.
- KAN-051(번들 트리 셰이킹)은 아직 할 일이다. `packages/core/motion-catalog.md:27` 의 「tsup entry 는 `src/index.ts`」는 지금은 맞고 KAN-051 뒤에 틀린다. 그래서 KAN-051 을 기다리지 않고 **두 상태 모두에서 참인 문장**으로 바꾼다 — KAN-051 이 계획한 entry 도 `src/**` 글롭이라 「빌드 entry 가 전부 `src/` 아래」는 앞뒤 모두 참이다(`KANBAN/cards/KAN-051-5HMYKT.md:44`).
- KAN-051 은 `CLAUDE.md:39,103`(test:unit 설명)을 고친다. 이 카드는 그 두 줄과 게이트 명령 목록을 건드리지 않는다(용인 조건).

### 인벤토리가 놓친 것 — 전수 grep 결과

인벤토리는 문서별로 훑어서 같은 클래스의 결함이 다른 문서에 있는 것을 다 잡지 못했다. 레포 전체를 클래스별로 다시 grep 했다(`node_modules`·`dist`·칸반 산출물·CHANGELOG 제외).

| 클래스 | 인벤토리가 적은 곳 | 더 찾은 곳 |
|---|---|---|
| `theme-*` 패키지 경로 | `CLAUDE.md:61-64` · `QUALITY_CHECKLIST.md:61-64` · `DESIGN_SYSTEM_GUIDE.md:170` | `MOTION_QUALITY_CHECKLIST.md:70` · `src/motion/README.md:10` · **`packages/core/COMPONENT_CATALOG.md:28`** |
| 「5개 테마」 | `QUALITY_CHECKLIST.md:15` · `_templates/CHECKLIST_INSTANCE.template.md:21` | `MOTION_QUALITY_CHECKLIST.md:103` · `motion-catalog.md:219` · **`apps/storybook/src/Overview.mdx:34-35`** |
| 옛 Storybook 제목(`Atoms/*`·`Foundations/Motion`) | `_templates/README.md` | `_templates/Component.stories.template.tsx:12` · `src/motion/README.md:51-52` |
| 옛 패키지 이름(`@centurio1987/core`·`/tokens`) | — | `CLAUDE.md:58` · `_templates/Component.stories.template.tsx:8` · `_templates/Component.template.tsx:7` · **`packages/tokens/src/types.ts:201`(주석)** |
| `CLAUDE.md` 구조도의 패키지 누락 | 「5개 누락」 | 실재 7개 중 2개(core·tokens)만 적혀 있다 |

굵게 적은 셋은 지금 scope 밖이다. **scope 를 넓혀 함께 고친다.** KAN-044 §14 가 `theme-*` 수정을 한 카드에 묶은 이유(「쪼개면 같은 지적이 두 카드로 갈려 한쪽만 고쳐진다」)가 그대로 적용된다. 세 파일 모두 미완료 루트(KAN-051·054·055) scope 와 겹치지 않는다. `packages/core/catalog/SATURATION_AUDIT.md` 의 `@centurio1987/core` 3건은 2026-06 감사 기록의 원문이라 고치지 않는다.

scope 를 넓히면 KAN-051 과의 용인 기록이 무효가 된다(scope 전체를 해시한다). 겹침 내용은 그대로 `CLAUDE.md` 하나이고 절도 그대로라, 같은 사유로 다시 기록한다.

### 실제 구조 — 무엇으로 바꾸는가

- 테마 패키지 넷은 없다. **base foundation 3종**(light·dark·high-contrast)은 `packages/core/src/foundations/` 에 있고 dark·highContrast 는 light 를 spread 한다. **확장 foundation 76종**(amber-light·amber-dark + 브랜드 프리셋 74)은 `packages/foundations/src/` 에 있고 전부 `BbangtoFoundation` 전체 리터럴이다. 토큰 타입을 바꾸면 `pnpm typecheck` 가 빠진 파일을 잡는다.
- Storybook 상단 툴바는 「Theme」이 아니라 **「Foundation」 토글이고 항목은 3개**다(`apps/storybook/.storybook/preview.tsx:118-120`). amber 는 FOUNDATION CATALOG 에서 본다.
- 스토리 제목은 `ARCHETYPE/Components/{Atoms,Molecules,Organisms}` · `ARCHETYPE/Foundations/{Base,Motion,Motion/Shaders}` · `ARCHETYPE/Blocks` · `ARCHETYPE/Patterns` 와 `VISUALIZATION/…`·카탈로그 셋이다(`preview.tsx:28-36` storySort).
- 패키지는 7개이고 이름은 `@centurio1987/bbangto-ui-<패키지>` 다.

### 고른 값 (검토서 판단 항목 후보)

1. **「5개 테마에서 렌더 확인」 → 「base foundation 3종(툴바)에서 렌더 확인」.** 이 규칙이 쓰일 때는 amber 가 base 테마였다. 지금 amber 는 확장 프리셋 76종 중 둘이고, 툴바로 바꿔 볼 수 없어 지키려면 스토리를 따로 써야 한다. 실제로 지켜 온 흔적도 없다 — 컴포넌트 스토리 중 amber foundation 을 쓰는 것은 0개이고, amber 를 고를 수 있는 자리는 foundation 카탈로그 뷰어(`apps/storybook/src/stories/themes/ThemeStyleGuide.stories.tsx:219`) 하나다. 5종을 유지하고 위치만 고치는 길도 있지만, 지킬 수단이 없는 규칙을 문서에 남기는 셈이다.
2. **모션 워크플로의 정본은 `MOTION_QUALITY_CHECKLIST.md` 「Workflow (per item)」.** `CLAUDE.md` §5 와 `QUALITY_CHECKLIST.md` D 가 이미 이 파일을 가리키고 있어, 다섯 곳 중 실제로 중복된 것은 `src/motion/README.md` 「Workflow」와 `motion-catalog.md` §6 둘이다. 두 곳은 정본 링크와 **그 문서에만 있는 단계**(README: 구현 규약 / catalog §6: 다음 항목 찾기·라이선스 확인·§4·§5·§7 기록)만 남긴다. 게이트 명령 목록도 정본 한 곳에만 둔다 — 지우는 쪽이라 `gateDocs` 게이트에 걸릴 일이 없다.
3. **`METADATA_COVERAGE_AUDIT.md` §2-2 「파일럿 관찰」은 링크 한 줄로 바꾼다.** 같은 관찰이 `FOUNDATION_METADATA_STRATEGY.md` §7 「파일럿·전량 저작 관찰」에 더 정확한 값(≥17.39)으로 있다. 지우기 전에 감사 쪽에만 있는 사실이 없는지 한 줄씩 대조한다.

### 버린 대안

- **KAN-051 완료를 기다렸다가 `motion-catalog.md:27` 을 고친다** — 두 루트 사이에 순서 의존을 새로 만든다. 문장을 entry 세부에 기대지 않게 바꾸면 의존 자체가 없어진다.
- **scope 밖 셋을 별도 카드로 뺀다** — 한 줄짜리 수정 셋에 카드 하나를 세우는 비용이 크고, 그사이 같은 결함이 두 카드에 갈려 남는다.
- **모션 문서 셋을 하나로 합친다** — README 는 코드 옆 구현 규약, 체크리스트는 게이트, catalog 는 백로그로 자리가 다르다(인벤토리 §10 존치 판정). 중복된 절만 걷는다.

## 실행 계획
- [x] `S1` `theme-*` 경로·「5개 테마」·패키지 구조를 실제 구조로 — `CLAUDE.md` 구조도(패키지 7개·정확한 이름, 게이트 목록과 :39·:103 은 손대지 않음) · `QUALITY_CHECKLIST.md:15,59-64` · `DESIGN_SYSTEM_GUIDE.md:170` · `MOTION_QUALITY_CHECKLIST.md:70,103` · `src/motion/README.md:10` · `motion-catalog.md:219` · `COMPONENT_CATALOG.md:28` · `apps/storybook/src/Overview.mdx:34-35` · `_templates/CHECKLIST_INSTANCE.template.md:21`. 완료 기준: 검증 [1]의 `theme-*`·「5 테마」 grep 이 0건
- [x] `S2` 깨진 링크와 템플릿 drift — `DESIGN_SYSTEM_GUIDE.md:182` 를 `COMPONENT_CATALOG.md` 「Wave 실행 기록」으로 · `_templates/README.md` 의 Wave 어휘와 Storybook 제목 규약을 `ARCHETYPE/…` 계층으로 · `Component.stories.template.tsx` 제목·import · `Component.template.tsx` import · `CHECKLIST_INSTANCE` 의 `Wave`·`21st 출처` 칸을 카드 id 로 · `src/motion/README.md:51-52` 스토리 제목 · `packages/tokens/src/types.ts:201` 주석 패키지 이름. 완료 기준: 검증 [1]의 옛 제목·옛 패키지 이름 grep 0건, 검증 [2] 링크 검사 통과
- [ ] `S3` 모션 워크플로 단일화 — 정본 `MOTION_QUALITY_CHECKLIST.md` 「Workflow (per item)」. `src/motion/README.md` 「Workflow」와 `motion-catalog.md` §6 은 정본 링크 + 그 문서에만 있는 단계만 남김 · `motion-catalog.md:26-28` 을 KAN-051 앞뒤 모두 참인 문장으로. 완료 기준: 검증 [3] — 게이트 명령 목록이 모션 문서 셋 중 정본 한 곳에만 있다
- [ ] `S4` `METADATA_COVERAGE_AUDIT.md` §2-2 「파일럿 관찰」 → `FOUNDATION_METADATA_STRATEGY.md` §7 링크로. 지우기 전에 감사 쪽 문장마다 전략 §7 에 같은 사실이 있는지 대조하고, 없는 것은 전략 §7 로 옮긴다. 그다음 품질 게이트 5종. 완료 기준: 대조표 0건 누락 + 게이트 5종 초록

## 검증
문서 카드라 **잔여 grep 0건 + 링크 무결 + 품질 게이트 5종 초록**이 끝의 기준이다. 아래 명령은 레포 루트에서 돌린다.

```bash
# [1] 잔여 표기 — 넷 다 0줄이어야 한다 (칸반 산출물·CHANGELOG·감사 기록 원문 제외)
EXC='--exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=storybook-static --exclude-dir=KANBAN --exclude-dir=.kanban --exclude-dir=.claude --exclude=CHANGELOG.md --exclude=KANBAN.md --exclude=KANBAN.board.html --exclude=SATURATION_AUDIT.md'
grep -rn $EXC 'theme-\*\|theme-light\|theme-dark\|theme-amber\|theme-high' .
grep -rni $EXC '5개 테마\|5 themes\|all 5 theme' .
grep -rn $EXC "'Foundations/Motion'\|'Atoms/\|'Molecules/\|Atoms/\*\|Molecules/\*" .
grep -rn $EXC '@centurio1987/core\b\|@centurio1987/tokens\b' .

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

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-07T13:36 · s:f6956d8e — `전략` 섹션 교체
- 2026-10-07T13:36 · s:f6956d8e — `실행 계획` 섹션 교체
- 2026-10-07T13:36 · s:f6956d8e — `검증` 섹션 교체
- 2026-10-07T14:13 · s:f6956d8e · S1 doing — 착수
- 2026-10-07T14:14 · s:f6956d8e · S1 done — theme-* 경로·「5개 테마」·패키지 구조를 실측으로 — 9파일(CLAUDE 구조도 7패키지·QUALITY_CHECKLIST A·B·C·DESIGN_SYSTEM_GUIDE:170·MOTION_QUALITY_CHECKLIST:70,103·motion README:10·motion-catalog:219·COMPONENT_CATALOG:28·Overview.mdx·CHECKLIST_INSTANCE). 검증 [1] theme-*·5 테마 grep 0줄(bash)
- 2026-10-07T14:14 · s:f6956d8e — 검증 절의 $EXC grep 은 zsh 에서 낱말로 안 쪼개져 제외가 안 먹는다 — bash 로 돌려야 한다. 검증 절에 그 사실을 S4 에서 적는다
- 2026-10-07T14:14 · s:f6956d8e · S2 doing — 착수
- 2026-10-07T14:16 · s:f6956d8e · S2 done — 깨진 링크(DESIGN_SYSTEM_GUIDE:182 → COMPONENT_CATALOG 「Wave 실행 기록」)·템플릿 drift(Wave 어휘·title 규약을 ARCHETYPE 계층으로·옛 패키지 이름·hooks 테스트 하네스 문장)·motion README title·옛 패키지 이름 주석 5곳. 계획 때 grep(\b 패턴)이 놓친 @centurio1987/hooks 4곳을 찾아 scope 에 주석 파일 3개를 더하고 용인·직렬 기록을 다시 걸었다(ai). 검증 [1] 옛 제목·옛 이름 0줄, [2] 링크 0줄
