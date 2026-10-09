# @centurio1987/bbangto-ui-style-guide-catalog

core 위에 얹는 **완성형 UI 스타일 가이드 51종**. 각 가이드는 foundation(색 스킴) + 모티프(형태·질감) + 쇼케이스를 묶는다.

```ts
import { styleGuideCatalog, styleGuideMap } from '@centurio1987/bbangto-ui-style-guide-catalog';
import index from '@centurio1987/bbangto-ui-style-guide-catalog/manifest.json';            // 색인 — 51종 표
import detail from '@centurio1987/bbangto-ui-style-guide-catalog/manifest/cyberpunk-hud-01.json'; // 항목 하나의 상세
```

**고르는 순서**: 색인(`manifest.json`)의 `family`·`domains`·`tags`·`summary`로 후보 2~3개를 좁히고 →
후보마다 상세(`manifest/<name>.json`)의 `useWhen`/`avoidWhen`으로 확정한다. 색인은 `{ axis, detail, columns, rows }`
꼴이라 `columns` 가 열 이름이고 `rows` 가 한 줄에 한 가이드다. 프로그래밍 선택은 `selectStyleGuides`를 쓴다.

전 가이드가 WCAG 대비 게이트를 통과한 상태로 배포된다(가이드가 주장하는 등급과 실측이 일치하는지 테스트가 강제).

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
