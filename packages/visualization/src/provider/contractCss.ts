import { useInsertionEffect } from 'react';

const STYLE_ELEMENT_ID = 'bbangto-viz-contract';

/**
 * 계약 스타일시트 — 시맨틱 data 속성을 --bbangto-viz-* 토큰에 바인딩한다.
 * 구체 색은 담지 않고 var() 참조만 담으므로, 값은 각 Provider 요소의 CSS 변수
 * 스코프를 따라 자연 격리된다(다중 스타일 가이드 공존 가능).
 * headless 컴포넌트는 리터럴 paint 없이 구조만 방출하고, 이 시트가 paint를 공급한다.
 * 명시적 사용자 prop은 인라인 style(fill/stroke)로 렌더되어 항상 이 시트를 이긴다.
 *
 * 연결선 대시(edge.dashPattern)는 관계선 훅 `data-viz-part="connector"` 에만 건다. 표준 표기법 템플릿은
 * 바깥 svg 에 `data-viz-notation` 을 달아 그 안의 연결선이 가이드 대시를 따르지 않게 한다 — 표기법에서
 * 실선과 대시가 서로 다른 관계를 뜻하기 때문이다. 템플릿이 넘긴 인라인 대시는 그대로 남는다.
 */
const CONTRACT_CSS = `
[data-bbangto-viz-style-guide] [data-viz-part="shape"] {
  fill: var(--bbangto-viz-shape-fill);
  stroke: var(--bbangto-viz-shape-stroke);
  stroke-width: var(--bbangto-viz-shape-stroke-width);
}
[data-bbangto-viz-style-guide] [data-bbangto-viz-edge] {
  stroke: var(--bbangto-viz-edge-stroke);
  stroke-width: var(--bbangto-viz-edge-width);
}
[data-bbangto-viz-style-guide] [data-viz-part="connector"] {
  stroke-dasharray: var(--bbangto-viz-edge-dash-pattern);
}
[data-bbangto-viz-style-guide] [data-viz-notation] [data-viz-part="connector"] {
  stroke-dasharray: none;
}
`;

export function useVizContractCss(): void {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ELEMENT_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = CONTRACT_CSS;
    document.head.appendChild(style);
  }, []);
}
