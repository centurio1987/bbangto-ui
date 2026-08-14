# @centurio1987/bbangto-ui-tokens

bbangto-ui의 **디자인 토큰 타입 계약**과 CSS 변수 변환 유틸. 런타임 스타일을 담지 않는다 —
테마·스타일 가이드가 이 타입에 맞춰 값을 채우고, 컴포넌트는 `var(--bbangto-…)`로 읽는다.

```ts
import {
  flattenToCSSVars, foundationToCSSString, foundationToStyleObject, cssVar, mergeFoundation,
  STYLE_FAMILIES, DOMAINS, TAGS,          // 스타일 축 통제 어휘
  breakpoints, up, down,                   // 반응형 헬퍼
} from '@centurio1987/bbangto-ui-tokens';
```

- **UI 토큰**: `Foundation`(색·타이포·간격·모션) + 시맨틱 레이어
- **시각화 토큰**: `VisualizationFoundation` — `@centurio1987/bbangto-ui-visualization`이 소비한다
- **채택 메타 어휘**: 스타일 가이드가 자기 성격을 선언할 때 쓰는 const union(자유 문자열 금지)

대비(contrast) 판정 유틸(`CONTRAST_THRESHOLDS`·`effectiveBgColors`)도 여기 있다 — 카탈로그 패키지의
WCAG 게이트가 이 함수를 공유한다.

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
