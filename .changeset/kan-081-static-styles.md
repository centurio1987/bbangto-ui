---
'@centurio1987/bbangto-ui-core': minor
'@centurio1987/bbangto-ui-visualization': minor
'@centurio1987/bbangto-ui-style-guide-catalog': minor
'@centurio1987/bbangto-ui-visualization-style-guide-catalog': minor
---

런타임에만 `<head>` 에 들어가던 스타일시트를 `{ id, css }` 목록으로 낸다 — 서버 문자열 렌더(`renderToStaticMarkup`)로 칠해진 정적 HTML 을 만들 수 있다(KAN-081).

서버 렌더는 insertion effect · effect 를 돌리지 않아 계약 · 모티프 시트가 안 들어가고, 그래서 도형이 브라우저 기본값(검정)으로 그려졌다. 이제 소비자가 목록을 `<style id={id}>{css}</style>` 로 직접 깐다.

- core — `coreStaticStyles()` · `MOTION_STYLE_ID` · `StaticStyle`
- visualization — `vizStaticStyles()`(감속 → 계약 순) · `VIZ_CONTRACT_STYLE_ID` · `VIZ_REDUCED_MOTION_STYLE_ID` · `StaticStyle`
- style-guide-catalog — `motifStylesOf(styleGuide)`
- visualization-style-guide-catalog — `vizMotifStylesOf(vizStyleGuide)`

런타임 동작은 바뀌지 않는다. 훅이 같은 상수를 읽어 주입하고, 주입되는 `<style id>` 와 내용도 그대로다. Storybook 테스트가 카탈로그 전 preset 을 그려 런타임이 넣은 시트 72개가 목록과 같은지 확인한다.
