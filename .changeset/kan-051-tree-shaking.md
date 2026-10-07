---
'@centurio1987/bbangto-ui-core': patch
'@centurio1987/bbangto-ui-visualization': patch
'@centurio1987/bbangto-ui-style-guide-catalog': patch
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': patch
---

하나만 가져와도 패키지 전체가 번들에 딸려 오던 문제를 고쳤다(KAN-051). 공개 API와 import 경로는 그대로다.

### 바뀐 동작

- **dist 가 파일 단위 출력이 됐다.** 전에는 패키지마다 `dist/index.js` 한 파일이어서, `package.json` 의
  `sideEffects: false` 가 있어도 번들러가 쓰지 않는 컴포넌트를 버리지 못했다(이 선언은 파일 단위로만 작동한다).
  이제 소스 파일마다 출력이 하나씩 나오고 함께 쓰는 코드는 `chunk-*.js` 로 빠진다. 입구(`dist/index.js`,
  visualization 은 `dist/typeMeta/index.js` 도)와 타입 선언(`dist/index.d.ts`)의 경로는 바뀌지 않았다.
- **style-guide-catalog · visualization-style-guide-catalog: 카탈로그 배열과 조회 맵을 `src/catalog.ts` 로 옮겼다.**
  배럴 최상위에서 `Object.fromEntries(...)` 로 맵을 만들던 것이 모든 preset 을 붙잡고 있었다.
  `styleGuideCatalog` · `styleGuideMap` · `vizStyleGuideCatalog` · `vizStyleGuideMap` 은 지금처럼 루트에서 가져온다.

### 크기 (esbuild 0.27.7, minify, react·`@centurio1987/*` 바깥)

| 가져온 것 | 전 | 후 |
|---|---|---|
| core `Button` 하나 | 324,410B | 4,622B |
| visualization `BarChart` 하나 | 171,294B | 8,958B |
| style-guide-catalog `NeobrutalismShowcase` 하나 | 829,011B | 101,092B |
| visualization-style-guide-catalog `minimalLine01VizStyleGuide` 하나 | 335,601B | 11,810B |

전부 가져오는 경우는 청크 경계 때문에 조금 커졌다(core 438,855B → 464,763B). style-guide-catalog 의 Showcase 하나가
여전히 약 101KB 인 것은 Showcase 전부가 함께 쓰는 생성 카피 파일(`_showcaseCopy.generated.ts`) 때문이다.
