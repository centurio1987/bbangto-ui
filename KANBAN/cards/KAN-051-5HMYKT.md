---
card: KAN-051-5HMYKT
title: 번들 트리 셰이킹 복구 — 파일 단위 출력 + 크기 상한 게이트 (core·viz·sgc·vsgc)
created: 2026-10-05
scope: packages/core/tsup.config.ts, packages/visualization/tsup.config.ts, packages/style-guide-catalog/tsup.config.ts, packages/visualization-style-guide-catalog/tsup.config.ts, packages/style-guide-catalog/src/index.ts, packages/style-guide-catalog/src/catalog.ts, packages/visualization-style-guide-catalog/src/index.ts, packages/visualization-style-guide-catalog/src/catalog.ts, packages/foundations/package.json, packages/foundations/src/bundleBudget.test.ts, bundle-budget.json, pnpm-lock.yaml, apps/storybook/.storybook/main.ts, metadata-coverage.json, .github/workflows/release.yml, CLAUDE.md, .changeset/kan-051-*.md
---

# KAN-051-5HMYKT — 번들 트리 셰이킹 복구 — 파일 단위 출력 + 크기 상한 게이트 (core·viz·sgc·vsgc)

## 전략
### 문제

외부 앱이 `@centurio1987/bbangto-ui-core` 1.1.2에서 `Button` 하나만 가져와도 core 대부분이 번들에 남는다. 앱 쪽 보고는 약 420KB이고, 이 저장소에서 잰 값은 아래와 같다(esbuild 0.27.7, minify, react·`@centurio1987/*` external, 디스크에 쓰지 않는 메모리 측정).

| 패키지 · 가져온 것 | 하나만 | 전체 |
|---|---|---|
| core `Button` | 320,653B | 435,428B |
| core `lightFoundation`(순수 데이터) | 320,653B | — |
| visualization `BarChart` | 171,287B | 191,063B |
| style-guide-catalog Showcase 하나 | 828,992B | 840,247B |
| visualization-style-guide-catalog preset 하나 | 335,601B | 342,069B |
| foundations `amberLightFoundation` | 3,560B | 271,637B |
| tokens 하나 | 43B | 5,519B |
| hooks 전체 | — | 9,762B |

420KB와 같은 값은 재현하지 못했다(측정 조건 차이로 보지만 확인 안 함).

### 원인

앱 쪽 진단(forwardRef 127곳에 `/*#__PURE__*/` 없음)은 절반만 맞다. PURE만 붙이면 esbuild·rollup·rolldown 모두 크기가 그대로였다. 최상위 `X.displayName = 'X'` 대입 129줄도 부수효과로 남기 때문이다. 진짜 원인은 dist가 `index.js` 한 파일(822KB)이라는 점이다. `package.json:40`에 `sideEffects: false`가 이미 있지만 이 선언은 파일 단위로만 작동하므로 파일이 하나면 쓸모가 없다(`packages/core/tsup.config.ts:4` entry가 `src/index.ts` 하나).

style-guide-catalog와 visualization-style-guide-catalog에는 원인이 하나 더 있다. 배럴(`src/index.ts`) 최상위의 `styleGuideMap = Object.fromEntries(styleGuideCatalog.map(...))`(sgc `index.ts:193`)가 catalog 배열과 모든 preset을 붙잡는다. 이 둘은 빌드 설정만 바꿔서는 829KB 그대로다.

### 접근

1. **크기 상한 게이트를 먼저 건다.** 정본은 루트 `bundle-budget.json`, 게이트는 `packages/foundations/src/bundleBudget.test.ts`다. 저장소 전체를 보는 게이트를 foundations에 두는 자리는 `metadataCoverage.test.ts`를 따른다. 다만 그 게이트는 커밋된 JSON만 읽고, 이 게이트는 foundations가 의존하지 않는 다른 패키지의 dist를 파일 경로로 읽는다. 그래서 build 뒤에 돌려야 맞는 값이 나온다(CLAUDE.md 게이트 순서와 같다).
   - 측정 대상은 dist이고 7개 패키지 전부다. 고칠 4개는 트리 셰이킹을, 정상인 3개(foundations·hooks·tokens)는 회귀를 본다.
   - 측정기는 esbuild(`~0.27.7` 고정, `write:false`)다. 경로는 각 `package.json`의 `exports[sub].import`에서 푼다. 실제 파일 위치에서 재야 패키지별 `sideEffects:false`가 읽힌다.
   - 측정기 자체 시험: 한 파일에 `forwardRef`+`displayName` 컴포넌트 A·B를 넣으면 A만 가져와도 B가 남고(약 4KB), 파일 둘로 나누면 빠진다(약 0.1KB). 이 차이를 판별하는지 단언한다.
   - dist가 없거나 src·`tsup.config.ts`보다 오래됐으면 `pnpm build`를 먼저 하라는 안내와 함께 실패한다. skip이 아니라 실패다.
   - 상한 규칙(추정, S4에서 실측으로 확정): 대표 export는 `ceil(max(측정×1.5, 측정+2KiB)/512)×512`, 전체는 `ceil(측정×1.15/1024)×1024`.
2. **tsup 출력을 파일 단위로 바꾼다.** 소스는 그대로 둔다.
   ```ts
   entry: ['src/**/*.{ts,tsx}', '!src/**/*.{test,stories}.{ts,tsx}', '!src/**/*.d.ts'],
   format: ['esm'], splitting: true,
   dts: { entry: 'src/index.ts' },   // 필수 — 비우면 글롭 전체가 dts 엔트리가 된다
   clean: true, sourcemap: true, treeshake: true, external: ['react', 'react-dom'],
   ```
   visualization은 `typeMeta/jsdocSource.ts`·`jsdocTags.ts`(Node 전용)를 빼고, `dts: { entry: ['src/index.ts', 'src/typeMeta/index.ts'], banner: DTS_BANNER }`를 유지한다. `jsdoc.test.ts:62-70`이 `tsup.config.ts` 본문의 배너 문자열을 보므로 `DTS_BANNER` 상수는 그대로 둔다.
3. **sgc·vsgc 배럴을 나눈다.** catalog용 import(sgc `index.ts:77-127`), catalog 배열과 map(`134-195`), 1행 `import type { StyleGuide }`를 `src/catalog.ts`로 옮기고 `index.ts`에는 re-export만 남긴다. type import도 함께 옮겨야 `noUnusedLocals`에 안 걸린다. vsgc도 같은 모양이다(`index.ts:1-31, 70, 104-106`).

메모리 재현 결과: core Button 4,622B, viz BarChart 8,958B, sgc Showcase 101,135B, vsgc preset 11,810B. export 목록은 전후 동일했다(core 258, viz 210, typeMeta 15, sgc 174).

### 버린 대안

- **소스 127곳에 PURE + displayName 패턴 변경** — 효과가 19~31KB로 파일 분할보다 작다. 규범 문서(`QUALITY_CHECKLIST.md`, `_templates/`)를 바꿔야 해서 KAN-050과 부딪히고, 배럴 문제는 못 푼다.
- **컴포넌트별 서브패스 exports(약 200개)** — 소비자가 import 경로를 바꿔야만 효과가 있고, 파일 분할로 루트 import가 이미 작아진다.
- **tsup `bundle: false`** — `from "../components/Input"`처럼 확장자 없는 상대 경로가 그대로 나와 Node ESM에서 깨진다.
- **tsdown/rolldown 전환** — 패키지 다섯의 빌드 도구를 바꾸는 일이라 범위 밖이다.

### 겹침 처리

- KAN-048과 용인: 같은 `style-guide-catalog/src/index.ts`지만 KAN-048은 46행 주석, 이 카드는 77~195행을 옮긴다.
- KAN-049와 용인: KAN-049는 `packages/visualization/**`를 잡았지만 md 문서만 고친다. 이 카드는 `tsup.config.ts`만 고친다.
- KAN-050과 용인: 같은 CLAUDE.md지만 KAN-050은 "게이트 명령 4종은 손대지 않고 구조도·경로만 고친다"고 적었다. 이 카드는 test:unit 설명 두 줄(39, 103행)만 고친다.
- KAN-055(배포)가 이 카드 뒤에 직렬로 선다.
- `packages/core/motion-catalog.md:28`("tsup entry는 src/index.ts")은 이 카드 뒤에 실제와 어긋나지만 KAN-050 범위라 거기로 넘긴다.

### 범위 밖

- `_showcaseCopy.generated.ts`(76KB)를 Showcase 전부가 공유해 sgc 하나가 101KB로 남는다. 생성기를 preset별로 쪼개는 일은 후속 카드다.
- 외부 앱 쪽 번들 재측정(다른 저장소)

### 외부 검토

플랜을 별도 Claude 세션(plan-reviewer, fable)에 부쳐 지적 5건을 받아 모두 반영했다. 이 카드에 걸린 것은 셋이다: 게이트가 다른 패키지 dist를 읽는다는 점을 선례와 구분해 적을 것, build 없이 돌리면 안내와 함께 실패할 것, tokens도 측정 대상에 넣을 것.

## 실행 계획
<!-- `S<n>`은 고정 id — 이름을 바꾸지 않는다. 체크 상태는 doc-step 이 갱신한다. -->
- [ ] `S1` (첫 단계를 적으세요)

## 검증
<!-- 무엇을 실행해 무엇이 나오면 이 카드가 끝난 것인가. -->

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
