import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { vizMotifStylesOf, vizStyleGuideCatalog } from './index';

// KAN-081 — 서버 렌더 소비자가 `<head>` 에 깔 viz 모티프 시트. 래퍼가 런타임에 `useVizMotifStyle` 로 넣는 것과 같은 id 여야 한다.
const src = join(__dirname);
/** 모티프 시트를 런타임에 주입하는 preset 파일 → 그 파일의 MOTIF_ID 값. */
const injecting = readdirSync(src)
  .filter((f) => f.endsWith('.tsx') && !f.startsWith('_'))
  .map((f) => readFileSync(join(src, f), 'utf-8'))
  .filter((text) => text.includes('useVizMotifStyle('))
  .map((text) => text.match(/const MOTIF_ID = '([^']+)'/)?.[1]);

describe('vizMotifStylesOf', () => {
  it('런타임에 모티프를 주입하는 preset 은 모두, 그리고 그것만 시트 하나를 낸다 — id 는 그 파일의 MOTIF_ID', () => {
    const exported = vizStyleGuideCatalog.flatMap((g) => vizMotifStylesOf(g).map((s) => s.id));
    expect(injecting.length).toBeGreaterThan(0);
    expect(injecting.every(Boolean)).toBe(true);
    expect([...exported].sort()).toEqual([...(injecting as string[])].sort());
  });

  it('시트마다 css 가 비어 있지 않고 id 가 서로 다르다', () => {
    const sheets = vizStyleGuideCatalog.flatMap((g) => vizMotifStylesOf(g));
    for (const s of sheets) expect(s.css.trim().length, s.id).toBeGreaterThan(0);
    expect(new Set(sheets.map((s) => s.id)).size).toBe(sheets.length);
  });

  it('모티프가 없는 가이드 · 없는 값은 빈 목록이다', () => {
    const plain = vizStyleGuideCatalog.find((g) => vizMotifStylesOf(g).length === 0);
    expect(plain).toBeDefined();
    expect(vizMotifStylesOf(undefined)).toEqual([]);
  });
});
