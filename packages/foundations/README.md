# @centurio1987/bbangto-ui-foundations

색 스킴(foundation) 카탈로그 — **76종**. base light/dark/high-contrast는 core에 있고, 여기는 브랜드 프리셋이다.

```ts
import { foundationCatalog, amberLightFoundation } from '@centurio1987/bbangto-ui-foundations';
import { selectFoundations } from '@centurio1987/bbangto-ui-foundations/meta';
```

| 경로 | 내용 |
| ---- | ---- |
| `.` | 프리셋 값 + `foundationCatalog` |
| `./meta` | 채택 메타·선택 helper(어떤 색 스킴을 언제 쓰는가) |
| `./foundation.manifest.json` | 76종 색인 — 후보를 고를 때 읽는 표(`columns` + 한 줄에 한 항목인 `rows`) |
| `./manifest/<slug>.json` | 항목 하나의 상세 — 고른 후보의 `useWhen`·`avoidWhen`·`baseTextContrast` |

전 엔트리가 채택 메타를 갖는다(pending 0). 스타일 가이드는 이 foundation 위에 모티프를 얹는 구조다.

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
