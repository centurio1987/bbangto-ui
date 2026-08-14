import { vvar } from './contract';

/**
 * 라벨 서체 해석 — 상류 이슈 P4.
 *
 * 라벨류 기본값이 `monoFont`인데 mono 서체에는 한글 글리프가 없다. 한글 라벨을 주면
 * **그 줄만** 시스템 폴백으로 떨어져 한 그림 안에서 서체가 갈린다. 판정은 라벨 문자열마다
 * 달라지므로 CSS 변수만으로는 풀 수 없고, 컴포넌트 JS에서 정해야 한다.
 *
 * 우선순위 세 단계:
 *   1. 호출자가 준 명시값
 *   2. `typography.labelFont` 토큰(선택 필드 — 지정한 스타일가이드는 스크립트와 무관하게 이것)
 *   3. 스크립트 판정 — 비ASCII가 있으면 `titleFont`, 아니면 `monoFont`
 *
 * 2·3단계는 CSS 변수 fallback 체인으로 표현한다. `labelFont`가 없는 스타일가이드에서는
 * 변수가 정의되지 않아 자동으로 3단계가 적용된다(기존 가이드 무변경).
 */

const LABEL_FONT_VAR = '--bbangto-viz-typography-label-font';

/**
 * 라벨에 **mono 서체가 못 그릴 가능성이 큰 문자**가 있는지 — 한글·한자·가나 등 비라틴 문자.
 * 클라이언트가 각 호출부에 두고 있는 `isLatin()` 분기를 대체한다.
 *
 * ASCII만 보면 오탐이 난다: `«stereotype»`·`café`·`—`·`₩`는 mono 서체에 다 들어 있다.
 * 그래서 라틴 확장(U+00A0–U+024F)·일반 구두점(U+2000–U+206F)·통화기호(U+20A0–U+20BF)는
 * 라틴으로 본다. 판정이 갈리는 쪽(그리스·키릴 등)은 titleFont로 보내는 편을 택한다 —
 * 오탐 비용은 "mono가 아닌 서체로 그려진다"지만, 놓치면 한 줄 안에서 서체가 갈린다.
 */
export function hasNonAsciiScript(label: string | undefined): boolean {
  if (!label) return false;
  // eslint-disable-next-line no-control-regex
  return /[^\x00-\x7F\u00A0-\u024F\u2000-\u206F\u20A0-\u20BF]/.test(label);
}

/** 라벨에 적용할 `font-family` 값을 돌려준다. */
export function resolveLabelFont(label: string | undefined, explicit?: string): string {
  if (explicit) return explicit;
  const fallback = hasNonAsciiScript(label)
    ? vvar('typography', 'titleFont')
    : vvar('typography', 'monoFont');
  return `var(${LABEL_FONT_VAR}, ${fallback})`;
}
