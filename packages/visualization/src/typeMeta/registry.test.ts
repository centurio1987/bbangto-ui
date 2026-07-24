/**
 * registry.test.ts — 유형 축 레지스트리 커버리지·불변식 게이트 (KAN-020).
 *
 * 핵심 게이트: `templates/index.ts`·`patterns/index.ts`의 value 컴포넌트 export를 **정적 소스 스캔**으로
 * 추출해(런타임 import 회피 — React/CSS/browser side-effect 무관) registry의 `exportNames` 합집합과 양방향
 * 대조한다. inventory-type-inventory.md §10 검증 방식(`export { X }`)의 코드판이자, 87 슬롯 수동 전사의
 * 오탈자·누락·잉여를 자동 검출하는 drift 게이트다.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { vizTypeRegistry } from './registry';
import {
  VIZ_TYPE_CATEGORIES,
  VIZ_DATA_SHAPES,
  VIZ_PRIMITIVES,
  VIZ_TYPE_TAGS,
} from './types';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, '..');

/** value 컴포넌트 re-export만 추출: `export { A, B } from '...'`. `export type {`·헬퍼는 제외. `X as Y`→Y. */
function scanValueExports(relPath: string): string[] {
  const text = readFileSync(join(srcDir, relPath), 'utf8');
  const names: string[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('export type')) continue;
    const m = /^export \{([^}]*)\} from/.exec(line);
    if (!m) continue;
    for (const part of m[1].split(',')) {
      const n = part.trim();
      if (!n) continue;
      names.push(n.includes(' as ') ? n.split(' as ').pop()!.trim() : n);
    }
  }
  return names;
}

const templateExports = scanValueExports('templates/index.ts');
const patternExports = scanValueExports('patterns/index.ts');
const scanned = new Set([...templateExports, ...patternExports]);

/**
 * 의도적 미매핑 export(문서화된 allowlist). registry는 inventory §5/§6의 **87 채택 VT 행**에 충실하며,
 * 아래 3종은 그 VT 행 집합 밖이다:
 *  - Kruchten4Plus1View·ViewpointFrame: §8-b "유형이 아닌 조합(meta) 프레임" — VT 행 미승격(KAN-015).
 *  - IsometricScene: KAN-028 geometry 트랙 신규 템플릿 — inventory §6 역방향 표에 아직 미편입.
 * 이들을 selectable 유형으로 만들려면 먼저 inventory에 VT 행을 추가해야 한다(후속 백필/유지보수 과제).
 */
const UNMAPPED_ALLOWLIST = new Set(['IsometricScene', 'Kruchten4Plus1View', 'ViewpointFrame']);

const registryExportNames = new Set(vizTypeRegistry.flatMap((e) => e.exportNames));

describe('vizTypeRegistry — 정적 스캔 커버리지', () => {
  it('배럴 스캔이 90개 value export를 잡는다(68 템플릿 + 22 패턴)', () => {
    expect(templateExports.length).toBe(68);
    expect(patternExports.length).toBe(22);
    expect(scanned.size).toBe(90);
  });

  it('allowlist를 제외한 모든 배럴 export가 ≥1 엔트리에 매핑된다(역방향 drift 게이트)', () => {
    const uncovered = [...scanned].filter(
      (x) => !UNMAPPED_ALLOWLIST.has(x) && !registryExportNames.has(x),
    );
    expect(uncovered).toEqual([]);
  });

  it('registry의 모든 exportNames가 실제 배럴 export에 존재한다(phantom/오탈자 방지)', () => {
    const phantom = [...registryExportNames].filter((x) => !scanned.has(x));
    expect(phantom).toEqual([]);
  });

  it('allowlist 항목은 어떤 엔트리에도 포함되지 않는다(의도적 제외)', () => {
    const leaked = [...UNMAPPED_ALLOWLIST].filter((x) => registryExportNames.has(x));
    expect(leaked).toEqual([]);
  });

  it('커버된 export 합집합 = 정확히 87(90 − allowlist 3)', () => {
    expect(registryExportNames.size).toBe(87);
    expect(scanned.size - UNMAPPED_ALLOWLIST.size).toBe(87);
  });
});

describe('vizTypeRegistry — 슬롯 불변식', () => {
  it('87 엔트리(⛔ 3행 제외)', () => {
    expect(vizTypeRegistry.length).toBe(87);
  });

  it('id는 VT-\\d{3} 형식·유일하다', () => {
    const ids = vizTypeRegistry.map((e) => e.id);
    for (const id of ids) expect(id).toMatch(/^VT-\d{3}$/);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('범위 외 ⛔ 3종(VT-520/610/611)은 미포함', () => {
    const ids = new Set(vizTypeRegistry.map((e) => e.id));
    for (const excluded of ['VT-520', 'VT-610', 'VT-611']) expect(ids.has(excluded)).toBe(false);
  });

  it('모든 엔트리는 kind∈{template,pattern}·exportNames≥1·name 비어있지 않음', () => {
    for (const e of vizTypeRegistry) {
      expect(['template', 'pattern']).toContain(e.kind);
      expect(e.exportNames.length).toBeGreaterThanOrEqual(1);
      expect(e.name.length).toBeGreaterThan(0);
    }
  });

  it('template 엔트리의 export는 templates 배럴, pattern 엔트리의 export는 patterns 배럴에서 온다', () => {
    const tset = new Set(templateExports);
    const pset = new Set(patternExports);
    for (const e of vizTypeRegistry) {
      const src = e.kind === 'template' ? tset : pset;
      for (const x of e.exportNames) expect(src.has(x)).toBe(true);
    }
  });

  it("type-meta 필수 — 전 엔트리가 rich meta를 보유한다(pending 0, KAN-040 승격 게이트)", () => {
    const pending = vizTypeRegistry.filter((e) => !e.meta).map((e) => e.id);
    expect(pending).toEqual([]);
    expect(vizTypeRegistry.every((e) => e.meta != null)).toBe(true);
  });

  it('모든 meta는 통제 어휘·비어있지 않은 useWhen/avoidWhen(≤5)·category를 가진다', () => {
    for (const e of vizTypeRegistry) {
      const m = e.meta;
      expect(m).toBeDefined();
      if (!m) continue;
      expect(VIZ_TYPE_CATEGORIES).toContain(m.category);
      expect(m.summary.length).toBeGreaterThan(0);
      expect(m.dataShape.length).toBeGreaterThan(0);
      for (const d of m.dataShape) expect(VIZ_DATA_SHAPES).toContain(d);
      expect(m.primitives.length).toBeGreaterThan(0);
      for (const p of m.primitives) expect(VIZ_PRIMITIVES).toContain(p);
      for (const t of m.tags) expect(VIZ_TYPE_TAGS).toContain(t);
      expect(m.useWhen.length).toBeGreaterThan(0);
      expect(m.useWhen.length).toBeLessThanOrEqual(5);
      expect(m.avoidWhen.length).toBeLessThanOrEqual(5);
    }
  });

  it('authored meta의 related는 존재하는 id를 가리킨다(self-ref/dup 없음)', () => {
    const ids = new Set(vizTypeRegistry.map((e) => e.id));
    for (const e of vizTypeRegistry) {
      const related = e.meta?.related;
      if (!related) continue;
      const seen = new Set<string>();
      for (const r of related) {
        expect(r).not.toBe(e.id);
        expect(seen.has(r)).toBe(false);
        expect(ids.has(r)).toBe(true);
        seen.add(r);
      }
    }
  });
});
