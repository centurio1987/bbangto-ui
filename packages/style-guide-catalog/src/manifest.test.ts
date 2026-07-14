import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { styleGuideCatalog } from './index';
import { buildManifest, serializeManifest, type CatalogEntryLike, type ManifestEntry } from './manifest';

const committedPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'catalog.manifest.json');
const committed: ManifestEntry[] = JSON.parse(readFileSync(committedPath, 'utf8'));

describe('buildManifest — rich/pending 분기', () => {
  const manifest = buildManifest(styleGuideCatalog);

  it('meta가 저작된 항목은 metaStatus="authored" + rich 필드를 싣는다', () => {
    const cyber = manifest.find((e) => e.name === 'cyberpunk-hud-01');
    expect(cyber?.metaStatus).toBe('authored');
    expect(cyber?.meta?.family).toBe('tech-dark');
    expect(cyber?.meta?.domains).toContain('gaming');
    expect(cyber?.meta?.mood.energy).toBe(5);
  });

  it('meta가 없는 항목은 metaStatus="pending" + meta 미포함(completeness만)', () => {
    const pending = manifest.filter((e) => e.metaStatus === 'pending');
    expect(pending.length).toBeGreaterThan(0);
    for (const e of pending) {
      expect(e.meta).toBeUndefined();
      expect(e.completeness).toBeDefined();
    }
  });

  it('파일럿 3종이 정확히 authored 상태다', () => {
    const authored = manifest.filter((e) => e.metaStatus === 'authored').map((e) => e.name).sort();
    expect(authored).toEqual(['cyberpunk-hud-01', 'minimal-saas-01', 'neobrutalism-editorial-01']);
  });

  it('결정적으로 name 오름차순 정렬된다', () => {
    const names = manifest.map((e) => e.name);
    expect(names).toEqual([...names].sort());
  });
});

describe('completeness 계산 — edge 커버 (fixture)', () => {
  const noop = () => null;
  const full: CatalogEntryLike = {
    name: 'fixture-full',
    description: 'has everything',
    wrapperComponents: { Button: noop },
    patterns: { Showcase: noop },
    foundationPresets: [{}, {}],
    visualMotif: { summary: 'x' },
  };
  const empty: CatalogEntryLike = { name: 'fixture-empty' };

  const [emptyEntry, fullEntry] = buildManifest([full, empty]).sort((a, b) =>
    a.name < b.name ? -1 : 1
  ); // 정렬 후 fixture-empty가 먼저

  it('완전한 fixture → 모든 플래그 true, presetCount=2', () => {
    expect(fullEntry.completeness).toEqual({
      hasWrappers: true,
      hasPatterns: true,
      foundationPresetCount: 2,
      hasVisualMotif: true,
    });
  });

  it('빈 fixture → 모든 플래그 false, presetCount=1(기본)', () => {
    expect(emptyEntry.completeness).toEqual({
      hasWrappers: false,
      hasPatterns: false,
      foundationPresetCount: 1,
      hasVisualMotif: false,
    });
  });
});

describe('related 참조 정합성 검증', () => {
  const withRelated = (name: string, related: string[]): CatalogEntryLike => ({
    name,
    // meta는 related 검증에만 쓰이므로 부분 객체를 캐스팅한다.
    meta: { related } as unknown as CatalogEntryLike['meta'],
  });

  it('존재하지 않는 related 슬러그 → throw', () => {
    expect(() => buildManifest([withRelated('a', ['ghost'])])).toThrow(/not in catalog/);
  });

  it('self-reference → throw', () => {
    expect(() => buildManifest([withRelated('a', ['a'])])).toThrow(/self-reference/);
  });

  it('중복 related → throw', () => {
    const b: CatalogEntryLike = { name: 'b' };
    expect(() => buildManifest([withRelated('a', ['b', 'b']), b])).toThrow(/duplicate/);
  });

  it('실제 카탈로그는 참조 정합성을 통과한다(throw 없음)', () => {
    expect(() => buildManifest(styleGuideCatalog)).not.toThrow();
  });
});

describe('재생성 동기 + 아티팩트 무결성', () => {
  it('buildManifest(styleGuideCatalog)가 커밋된 catalog.manifest.json과 일치한다(정규화 비교)', () => {
    // 불일치 시: `pnpm --filter ...style-guide-catalog gen:manifest` 재실행 필요.
    expect(buildManifest(styleGuideCatalog)).toEqual(committed);
  });

  it('직렬화가 결정적이다(2-space + 말미 개행) — 커밋 파일과 바이트 동일', () => {
    const raw = readFileSync(committedPath, 'utf8');
    expect(serializeManifest(buildManifest(styleGuideCatalog))).toBe(raw);
  });

  it('커밋 매니페스트가 최소 스키마를 만족한다(런타임 손상 가드)', () => {
    for (const e of committed) {
      expect(typeof e.name).toBe('string');
      expect(['authored', 'pending']).toContain(e.metaStatus);
      expect(typeof e.completeness.hasWrappers).toBe('boolean');
      expect(typeof e.completeness.foundationPresetCount).toBe('number');
      if (e.metaStatus === 'authored') {
        expect(e.meta).toBeDefined();
        expect(typeof e.meta!.family).toBe('string');
        expect(Array.isArray(e.meta!.tags)).toBe(true);
        expect(Array.isArray(e.meta!.domains)).toBe(true);
      } else {
        expect(e.meta).toBeUndefined();
      }
    }
  });
});
