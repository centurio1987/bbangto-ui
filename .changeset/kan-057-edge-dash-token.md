---
'@centurio1987/bbangto-ui-visualization': patch
'@centurio1987/bbangto-ui-tokens': patch
---

스타일 가이드의 `edge.dashPattern` 이 `Edge` 연결선의 기본 대시를 정한다(KAN-057).

이 토큰은 타입에 선언돼 있었지만 계약 스타일시트도 `Edge` 도 읽지 않아, 가이드에 대시를 적어도 연결선은 실선이었다.
이제 계약 스타일시트가 `Edge` 연결선에 `stroke-dasharray: var(--bbangto-viz-edge-dash-pattern)` 을 건다.
`strokeDasharray` prop 은 지금처럼 인라인으로 나가 가이드 값을 이긴다. props 와 export 는 그대로다.

### 바뀐 동작

- 카탈로그 가이드 30개와 base foundation 은 모두 `edge.dashPattern: ''`(실선)이라 지금 있는 그림은 바뀌지 않는다.
- 대시는 `Edge` 연결선에만 걸린다. 축선·눈금·수염처럼 같은 edge 채널(`data-bbangto-viz-edge`)을 쓰는 구조선은 실선으로 남는다.
  연결선을 가르려고 `Edge` 의 `<path>` 에 `data-viz-part="connector"` 속성이 붙는다.
- `visualizationFoundationToStyleObject` 가 `*-dash-pattern` 의 빈 값을 `''` 대신 `none` 으로 낸다. React 는 빈 문자열 CSS
  변수를 지우므로, 그대로 두면 대시 가이드 안에 겹친 실선 가이드의 연결선이 바깥 대시를 물려받았다.
- 가이드 기본값을 앱 스타일시트로 덮으려면 `[data-bbangto-viz-style-guide] [data-viz-part="connector"]` 보다 구체적인 선택자를 쓴다.
