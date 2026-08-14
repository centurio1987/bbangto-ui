# @centurio1987/bbangto-ui-core

bbangto-ui의 **React UI 컴포넌트**와 모션 레이어. 스타일은 토큰(CSS 변수)으로만 들어오므로,
같은 컴포넌트를 스타일 가이드만 바꿔 다시 칠할 수 있다.

```tsx
import { Button, StyleGuideProvider } from '@centurio1987/bbangto-ui-core';
```

- 컴포넌트는 접근성 기본값(role·focus ring·키보드 조작)을 갖춘 상태로 나온다
- 모션은 `src/motion`의 atom/variant 조합으로 구성되며 `prefers-reduced-motion`을 존중한다
- 기본 테마(light / dark / high-contrast)가 함께 들어 있다. 브랜드 프리셋은
  `@centurio1987/bbangto-ui-foundations`, 완성된 스타일 가이드는 `@centurio1987/bbangto-ui-style-guide-catalog`

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
