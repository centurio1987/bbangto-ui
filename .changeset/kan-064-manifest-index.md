---
'@centurio1987/bbangto-ui-style-guide-catalog': major
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': major
'@centurio1987/bbangto-ui-foundations': major
'@centurio1987/bbangto-ui-visualization': major
---

채택 매니페스트 4종이 색인과 항목별 상세 두 층으로 나뉜다(KAN-064).

전에는 매니페스트 파일 하나에 항목 전부의 전체 메타가 들어 있었다. Claude 토크나이저로 재 보니 UI style guide 매니페스트
하나가 50,325토큰이라, AI 가 "파일 하나를 읽고 고른다"는 쓰임새가 성립하지 않았다. 이제 매니페스트 파일은 후보를 고를 때
쓰는 필드만 담은 **색인**이고, 고른 후보의 전체 메타는 패키지에 함께 실리는 **상세 파일**에서 읽는다.

| 패키지 | 색인(서브패스) | 색인 크기 | 상세 |
|---|---|---|---|
| style-guide-catalog | `./manifest.json` | 8,709토큰(전 50,325) | `./manifest/<name>.json` |
| visualization-style-guide-catalog | `./manifest.json` | 5,179토큰(전 30,392) | `./manifest/<name>.json` |
| foundations | `./foundation.manifest.json` | 8,029토큰(전 37,081) | `./manifest/<slug>.json` |
| visualization | `./type.manifest.json` | 6,675토큰(전 38,474) | `./manifest/<id>.json` |

### 깨지는 것

색인 서브패스의 모양이 항목 배열에서 `{ axis, detail, columns, rows }` 객체로 바뀐다. `columns` 가 열 이름이고, `rows` 의
각 배열이 그 순서대로 한 항목의 값을 담는다. `useWhen` · `avoidWhen` · `mood` · `characteristics` · `accessibility` ·
`related` · `completeness` 는 색인에 없고 상세 파일에만 있다.

```ts
// 전
import manifest from '@centurio1987/bbangto-ui-style-guide-catalog/manifest.json';
manifest.find((e) => e.name === 'cyberpunk-hud-01')?.meta?.useWhen;

// 후 — 색인에서 고르고, 상세에서 읽는다
import index from '@centurio1987/bbangto-ui-style-guide-catalog/manifest.json';
import detail from '@centurio1987/bbangto-ui-style-guide-catalog/manifest/cyberpunk-hud-01.json';
const nameAt = index.columns.indexOf('name');
index.rows.some((row) => row[nameAt] === 'cyberpunk-hud-01'); // true
detail.meta?.useWhen;
```

### 그대로인 것

메타 스키마 타입(`StyleGuideMeta` · `FoundationMeta` · `VizTypeMeta`)과 `buildManifest` · `buildFoundationManifest` ·
`buildTypeManifest` · `selectStyleGuides` · `selectFoundations` · `selectVizTypes` 의 시그니처는 바뀌지 않는다.
코드에서 객체로 고르던 쓰임새는 영향이 없다.
