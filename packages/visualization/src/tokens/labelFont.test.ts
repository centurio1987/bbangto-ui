import { describe, it, expect } from 'vitest';
import { hasNonAsciiScript, resolveLabelFont } from './labelFont';

// 상류 이슈 P4(라벨 기본 서체가 monoFont라 한글이 그 줄만 폴백으로 떨어진다)의 회귀 고정.
// 판정은 라벨 문자열마다 갈리므로 CSS 변수만으로는 못 푼다 — 컴포넌트 JS에서 결정한다.

const LABEL_FONT_VAR = '--bbangto-viz-typography-label-font';
const TITLE_FONT_VAR = 'var(--bbangto-viz-typography-title-font)';
const MONO_FONT_VAR = 'var(--bbangto-viz-typography-mono-font)';

describe('hasNonAsciiScript', () => {
  it.each([
    ['엣지 로케이션', true],
    ['한글 Mixed Latin', true],
    ['圖形', true],
    ['図', true],
    ['Δelta', true],
    ['🚀 launch', true],
    ['EDGE LOCATION', false],
    ['api-gateway_v2', false],
    ['12.5% (n=3)', false],
    // 라틴 확장·일반 구두점·통화기호는 mono 서체에 들어 있다 — 오탐 금지.
    ['«stereotype»', false],
    ['café résumé', false],
    ['A — B … C', false],
    ['₩1,200', false],
    ['', false],
  ])('%s → %s', (label, expected) => {
    expect(hasNonAsciiScript(label)).toBe(expected);
  });
});

describe('resolveLabelFont', () => {
  it('명시값이 가장 세다', () => {
    expect(resolveLabelFont('엣지', 'Georgia, serif')).toBe('Georgia, serif');
    expect(resolveLabelFont('EDGE', 'Georgia, serif')).toBe('Georgia, serif');
  });

  it('비ASCII 라벨은 titleFont로 떨어진다 (labelFont가 있으면 그것이 먼저)', () => {
    const f = resolveLabelFont('엣지 로케이션');
    expect(f).toContain(LABEL_FONT_VAR);
    expect(f).toContain(TITLE_FONT_VAR);
    expect(f).not.toContain(MONO_FONT_VAR);
  });

  it('라틴 라벨은 monoFont를 유지한다', () => {
    const f = resolveLabelFont('EDGE LOCATION');
    expect(f).toContain(LABEL_FONT_VAR);
    expect(f).toContain(MONO_FONT_VAR);
    expect(f).not.toContain(TITLE_FONT_VAR);
  });

  it('빈 라벨·undefined는 라틴 취급이다', () => {
    expect(resolveLabelFont('')).toContain(MONO_FONT_VAR);
    expect(resolveLabelFont(undefined)).toContain(MONO_FONT_VAR);
  });

  it('반환값은 CSS font-family로 바로 쓸 수 있는 var() 체인이다', () => {
    expect(resolveLabelFont('엣지')).toMatch(/^var\(--[\w-]+, var\(--[\w-]+\)\)$/);
  });
});
