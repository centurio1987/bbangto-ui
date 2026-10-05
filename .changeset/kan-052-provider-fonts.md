---
'@centurio1987/bbangto-ui-core': minor
'@centurio1987/bbangto-ui-visualization': minor
---

Provider 외부 글꼴을 끌 수 있게 하고, 겹쳐 써도 글꼴마다 한 번만 불러온다(KAN-052).

### 새 기능

- **`fonts?: 'external' | 'none'`** — `FoundationProvider` · `StyleGuideProvider`(core),
  `VisualizationStyleGuideProvider`(visualization)에 더했다. 기본값 `'external'`은 지금 동작 그대로다.
  `'none'`이면 CDN 글꼴 요청을 하지 않으므로 글꼴을 직접 호스팅하거나 CSP로 외부 요청을 막는 앱이 쓸 수 있다.

### 바뀐 동작

- 글꼴 `@import`를 렌더 트리 안 `<style>`로 내던 것을 `document.head`의 `#bbangto-font-pretendard` ·
  `#bbangto-font-jetbrains-mono`로 옮겼다. 같은 id가 있으면 넣지 않으므로 Provider를 여러 겹 감싸도,
  core Provider 안에 visualization Provider를 겹쳐도 글꼴당 요청은 한 번이다.
- SSR HTML에는 글꼴 `@import`가 들어가지 않는다. 화면이 켜진 뒤에 불러온다.
