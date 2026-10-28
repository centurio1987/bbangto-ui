import { describe, expect, it } from 'vitest';
import { motifStylesOf, styleGuideCatalog } from './index';
import { motifCssOf } from './_motif';

// KAN-081 — 서버 렌더 소비자가 `<head>` 에 깔 모티프 시트. 래퍼가 런타임에 넣는 것과 같은 id · css 여야 한다.
describe('motifStylesOf', () => {
  it('카탈로그 전 preset 이 모티프 시트 하나를 낸다 — css 는 래퍼가 주입하는 것과 같다', () => {
    for (const sg of styleGuideCatalog) {
      const sheets = motifStylesOf(sg);
      expect(sheets, sg.name).toHaveLength(1);
      expect(sheets[0].id, sg.name).toMatch(/^bbangto-[a-z0-9-]+$/);
      expect(sheets[0].css, sg.name).toBe(motifCssOf(sg.wrapperComponents));
      expect(sheets[0].css.trim().length, sg.name).toBeGreaterThan(0);
    }
  });

  it('preset 끼리 id 가 겹치지 않는다(겹치면 런타임 dedupe 가 다른 preset 의 시트를 막는다)', () => {
    const ids = styleGuideCatalog.map((sg) => motifStylesOf(sg)[0]?.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('모티프 래퍼가 없는 가이드는 빈 목록이다', () => {
    expect(motifStylesOf({ ...styleGuideCatalog[0], wrapperComponents: undefined })).toEqual([]);
    expect(motifStylesOf(undefined)).toEqual([]);
  });
});
