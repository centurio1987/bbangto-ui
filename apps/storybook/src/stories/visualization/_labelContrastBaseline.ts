/**
 * 글자 대비 게이트(`TemplatePaintGate.stories.tsx` 의 LabelContrastGate)가 이미 알고 있는 미달 목록.
 *
 * KAN-056 이 13개 템플릿에서 시작했고 KAN-063 이 표본 68개로 넓혀 1538곳이 됐다. KAN-061 이 면 위 글자를
 * 그 면에 맞춘 글자색(`--bbangto-viz-on-*`, 템플릿에서는 `vvar('on', …)`)으로 바꿔 전부 지웠다.
 *
 * 이 목록은 비어 있어야 한다. 새 미달이 나오면 여기 올리지 말고 글자를 그 뒤 면의 `on-*` 로 고친다.
 * 데이터마다 투명도가 바뀌는 면은 `useVizFoundation()` 과 visualization 내부의 `pickOnInk`·`surfacesFor`
 * (`packages/visualization/src/tokens/onInk.ts`)로 칸마다 고른다.
 * 키는 `가이드 · fixture · text[문서 순서] "글자 앞 24자"`, 값은 그때의 대비(소수 둘째 자리)다.
 */
export const LABEL_CONTRAST_BASELINE: Readonly<Record<string, number>> = {};
