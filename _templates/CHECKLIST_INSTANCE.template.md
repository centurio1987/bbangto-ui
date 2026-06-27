# 체크리스트 인스턴스 — `<산출물명>` (`<Layer>`)

> `QUALITY_CHECKLIST.md`의 해당 섹션을 복사한 작업 단위 체크리스트.
> leaf subagent는 이 파일을 작업 메모/PR 본문에 첨부하고 항목을 채운다.

- **산출물**: `<Name>`
- **계층**: atom | molecule | block | pattern | motion | shader | hook
- **Wave**: 0 | 1 | 2 | 3 | 4 | 5 | 6
- **21st 출처 카테고리**: `<예: Buttons / Heroes / Hooks>`
- **담당 에이전트**: `<id>`

## 테스트 우선 (먼저 RED여야 함)
- [ ] story `play`(또는 hook vitest) 테스트를 **구현 전에** 작성 — 최초 실행 시 실패(RED) 확인
- [ ] 주요 variant/state 별 케이스 포함

## 구현 (QUALITY_CHECKLIST.md A 기준)
- [ ] 파일 생성: `<targetPath>`
- [ ] 배럴에 export 추가 (`packages/core/src/index.ts` 또는 해당 하위 index)
- [ ] `forwardRef` + `displayName` + `...props` + `ref` (컴포넌트)
- [ ] 토큰은 `cssVar()`로만 참조 (하드코딩 금지)
- [ ] 5개 테마 전체 렌더 확인 (light / dark / high-contrast / amber-light / amber-dark)

## 접근성
- [ ] ARIA role/label/live region
- [ ] 키보드 인터랙션 (Tab / Enter / Space / Esc)
- [ ] `@storybook/addon-a11y` 위반 없음

## 모션이 포함된 경우
- [ ] `MOTION_QUALITY_CHECKLIST.md` 통과 + `prefers-reduced-motion` 폴백
- [ ] `motion-catalog.md` 기록

## 게이트 (전부 GREEN)
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] `pnpm test` (Playwright/chromium)
- [ ] `pnpm --filter storybook build`

## 반환(구조화)
```json
{ "name": "", "status": "RED|GREEN|DONE", "files": [], "testFile": "", "typecheckPass": true, "notes": "", "blockers": [] }
```
