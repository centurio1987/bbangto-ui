# @centurio1987/bbangto-ui-style-guide-catalog

core 위에 얹는 **완성형 UI 스타일 가이드 51종**. 각 가이드는 foundation(색 스킴) + 모티프(형태·질감) + 쇼케이스를 묶는다.

```ts
import { styleGuideCatalog, styleGuideMap } from '@centurio1987/bbangto-ui-style-guide-catalog';
import manifest from '@centurio1987/bbangto-ui-style-guide-catalog/manifest.json';
```

**고르는 순서**: 채택 메타(`family`·`domain`·`tags`)로 후보를 좁히고 → 각 가이드의 `useWhen`/`avoidWhen`으로 확정한다.
프로그래밍 선택은 `selectStyleGuides`를 쓴다.

전 가이드가 WCAG 대비 게이트를 통과한 상태로 배포된다(가이드가 주장하는 등급과 실측이 일치하는지 테스트가 강제).

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
