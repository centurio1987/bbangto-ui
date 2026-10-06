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

## 외부 글꼴 (`fonts`)

`FoundationProvider`와 `StyleGuideProvider`는 기본으로 Pretendard(jsDelivr)와 JetBrains Mono(Google Fonts)를
CDN에서 불러온다. 글꼴을 직접 호스팅하거나 CSP로 외부 요청을 막는 앱은 `fonts="none"`으로 끈다.

```tsx
<FoundationProvider>                 {/* 기본값 'external' — 지금까지와 같다 */}
<FoundationProvider fonts="none">    {/* 외부 글꼴 요청 0건. 글꼴은 앱이 직접 불러온다 */}
```

- 글꼴은 `document.head`에 글꼴마다 한 번만 들어간다(`#bbangto-font-pretendard`, `#bbangto-font-jetbrains-mono`).
  Provider를 여러 겹 감싸거나 `VisualizationStyleGuideProvider`를 안에 겹쳐도 요청은 글꼴당 한 번이다.
- 주입은 문서 전체가 나눠 쓴다. 한 Provider에 `fonts="none"`을 줘도 다른 Provider가 이미 넣은 글꼴은 남는다.
  외부 요청을 0건으로 만들려면 문서 안의 Provider 전부에 `fonts="none"`을 준다.
- SSR(서버 렌더링) HTML에는 글꼴 `@import`가 들어가지 않는다. 화면이 켜진(hydration) 뒤에 불러온다.

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
