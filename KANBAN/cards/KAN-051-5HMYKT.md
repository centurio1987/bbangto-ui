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
- [x] `S1` 크기 게이트 먼저 — foundations에 esbuild `~0.27.7` devDependency, 루트 `bundle-budget.json`(7개 패키지 대표 export·전체 상한, 상한 규칙), `bundleBudget.test.ts`(측정기 자체 시험 fixture · dist 실측 · dist 신선도). 완료 기준: `pnpm build && pnpm test:unit`이 core·viz·sgc·vsgc 크기로 빨강, foundations·hooks·tokens는 초록. src만 고치고 build 없이 돌리면 `pnpm build`를 먼저 하라는 안내와 함께 실패. 측정값을 수행 내역에 기록
- [ ] `S2` tsup 설정 4개를 파일 단위 출력으로 — entry 글롭과 제외 패턴, `dts.entry` 명시, viz 배너 유지. 완료 기준: core·viz 초록, sgc·vsgc는 아직 빨강, export 목록 전후 동일, `find dist -name '*.d.ts'`가 index(viz는 typeMeta 포함)만
- [ ] `S3` sgc·vsgc 배럴 분리 — catalog import·배열·map을 `src/catalog.ts`로. 완료 기준: 게이트 전부 초록, 공개 API 동일, sgc `genManifest`·`genTrendTable` 동작
- [ ] `S4` 상한 확정과 정리 — 실측으로 `bundle-budget.json` 확정, `apps/storybook/.storybook/main.ts:16-20` 주석, `metadata-coverage.json` sourceModule 서술, `CLAUDE.md:39, 103` test:unit 설명에 "번들 크기" 추가, `release.yml` build 뒤 `pnpm test:unit` 단계, changeset 4개(core·viz·sgc·vsgc patch). 완료 기준: 게이트 5종 초록, `npm pack --dry-run` 목록 확인, Node에서 dist import 스모크, rollup·rolldown 교차 측정값 기록

## 검증
### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test
pnpm --filter storybook build
pnpm test:unit                  # ← bundleBudget.test.ts 가 여기서 돈다
```

foundations만 빨리 보려면 `pnpm build && pnpm --filter @centurio1987/bbangto-ui-foundations test`.

### 빨강 → 초록

1. `S1` 직후: core·viz·sgc·vsgc 대표 export가 상한 초과로 빨강(현재 dist 기준 core `Button` 약 320KB). foundations·hooks·tokens와 전체 상한은 초록.
2. `S2` 직후: core·viz 초록, sgc·vsgc 빨강 유지. 게이트가 배럴 문제를 따로 잡는다는 확인이다.
3. `S3` 직후: 전부 초록.
4. 신선도: src 파일 하나를 건드리고 build 없이 `test:unit`을 돌리면 `pnpm build`를 먼저 하라는 메시지로 실패한다.

### 추가 확인

- `find packages/*/dist -name '*.d.ts'` — core·sgc·vsgc는 `index.d.ts` 하나, viz는 `index.d.ts`·`typeMeta/index.d.ts` 둘
- `grep -rlE 'from "(fs|path|url|node:)' packages/*/dist` — 비어 있어야 한다(Node 전용 코드가 배포물에 없음)
- export 목록 전후 대조(core 258, viz 210, typeMeta 15, sgc 174)
- `npm pack --dry-run` — 파일 목록과 크기
- Node에서 `import('@centurio1987/bbangto-ui-core')` 스모크
- rollup·rolldown으로 core `Button`을 한 번 더 재서 수행 내역에 남긴다(게이트는 esbuild 하나)
- Storybook 미리 묶기 캐시가 dist 변경을 못 볼 수 있으므로 한 번은 `storybook dev --force`로 띄운다

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-05T00:12 · s:bcc5b01f — `전략` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `실행 계획` 섹션 교체
- 2026-10-05T00:12 · s:bcc5b01f — `검증` 섹션 교체
- 2026-10-07T13:55 · s:f1219b38 · S1 doing — 착수
- 2026-10-07T13:58 · s:f1219b38 · S1 done — 크기 게이트 bundleBudget.test.ts + bundle-budget.json. build 뒤 실측(대표/전체 B): core Button 324410/438855 · viz BarChart 171294/190989 · sgc NeobrutalismShowcase 829011/839953 · vsgc minimalLine01 335601/341908 · foundations amberLight 3579/271431 · hooks useDebounce 216/9619 · tokens cssVar 147/5387. 빨강 4(core·viz·sgc·vsgc 대표) · 초록 81. hooks src touch 후 build 없이 돌리면 「pnpm build 를 먼저」로 실패 확인. 측정기 자체 시험 초록
