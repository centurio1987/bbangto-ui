# RELEASE_PLAN — bbangto-ui

> KAN-036 산출물. 마지막 발행(`06ed3e5`, version packages #5) 이후 누적된 ORD-008~012 + KAN-013~041
> 작업을 한 번에 발행하기 위한 배포 계획. **변경 상세는 `.changeset/*.md`가 SSOT** — 이 문서는 버전표·
> 승인 게이트·follow-up만 유지한다(중복 방지).

## 다음 릴리스 버전 (changeset status 검증 완료)

| 패키지 | 현재 → 다음 | bump | 근거 |
|---|---|---|---|
| `@centurio1987/bbangto-ui-tokens` | 1.1.0 → **1.2.0** | minor | 메타 어휘·contrast 유틸 신규 export |
| `@centurio1987/bbangto-ui-foundations` | 1.0.1 → **1.1.0** | minor | `./meta` 서브패스·catalog 74→76 |
| `@centurio1987/bbangto-ui-style-guide-catalog` | 0.2.0 → **0.3.0** | minor | `selectStyleGuides`·meta 51 backfill·neobrutalism 표준화 |
| `@centurio1987/bbangto-ui-visualization` | 0.1.0 → **0.2.0** | minor | 유형 축 `./type-meta`·iso geometry·G6 프레임·P1~P3 타입 |
| `@centurio1987/bbangto-ui-visualization-style-guide-catalog` | 0.1.0 → **0.2.0** | minor | 카탈로그 6→30 |
| `@centurio1987/bbangto-ui-core` | 1.1.0 → **1.1.1** | patch | tokens dep auto-bump (src 무변경) |
| `@centurio1987/bbangto-ui-hooks` | 0.3.0 → **0.3.0** | — | 변경 없음 |

- **패키지 신설/삭제/리네임 없음** — 7개 패키지 이름 모두 정상(`@centurio1987/bbangto-ui-*`). `diagram→visualization`,
  `themes→foundations` 리네임은 이미 코드 반영됨.
- semver: 발행분 대비 전부 additive(minor). style-guide-catalog의 `bakeryStyleGuide→neobrutalismEditorialStyleGuide`
  리네임만 breaking이나 pre-1.0(0.x)라 minor 허용, 기존 changeset이 커버.

## 릴리스 절차 (CI: `.github/workflows/release.yml`, changesets/action)

1. 이 브랜치 → main 머지 (changeset·drift 수정 포함).
2. **push 시** CI가 "Version Packages" PR 자동 생성(`pnpm run version-packages` = `changeset version` + storybook devDep 복구).
3. Version PR 리뷰·머지 → changeset 소진 시 CI가 GitHub Packages로 publish(`pnpm -r publish`). 발행 대상 6종
   (tokens/core/foundations/style-guide-catalog/visualization/viz-catalog). hooks 제외.

> ⚠️ publish는 outward-facing. main push/PR 머지는 유저 명시 승인 후에만.

## Follow-up (수동 — 레지스트리 접근 필요)

- **레거시 발행분 deprecate**: 구 `@centurio1987/bbangto-ui-diagram`(≤0.2.2) → visualization,
  `@centurio1987/bbangto-ui-themes` → foundations, 무접두 옛 이름(`@centurio1987/{core,tokens,hooks,diagram}`)
  → 접두 후속. `npm deprecate '<old>' 'renamed → <new>'` 시도.
- GitHub Packages는 `npm deprecate` 지원이 제한적 → **대체 조치 병행**: 최신 릴리스 README에 migration 표,
  GitHub Release note에 rename 안내.
