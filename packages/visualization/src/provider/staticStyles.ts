import { VIZ_CONTRACT_CSS, VIZ_CONTRACT_STYLE_ID } from './contractCss';
import { VIZ_REDUCED_MOTION_CSS, VIZ_REDUCED_MOTION_STYLE_ID } from './defs';

/**
 * 런타임이 `document.head` 에 넣는 스타일시트 하나. 서버 렌더(`renderToStaticMarkup`)는 insertion effect 를
 * 돌리지 않으므로, 소비자가 이것을 `<style id={id}>{css}</style>` 로 직접 깔아야 같은 그림이 나온다.
 * core 의 `StaticStyle` 과 같은 모양이다(visualization 은 core 에 의존하지 않아 따로 둔다).
 */
export interface StaticStyle {
  readonly id: string;
  readonly css: string;
}

/**
 * visualization 이 런타임에 주입하는 시트 전부 — `VisualizationStyleGuideProvider` 의 주입 순서(감속 → 계약)대로.
 * 훅과 이 목록이 같은 상수를 읽으므로 둘이 갈라질 수 없다(KAN-081).
 */
export function vizStaticStyles(): StaticStyle[] {
  return [
    { id: VIZ_REDUCED_MOTION_STYLE_ID, css: VIZ_REDUCED_MOTION_CSS },
    { id: VIZ_CONTRACT_STYLE_ID, css: VIZ_CONTRACT_CSS },
  ];
}
