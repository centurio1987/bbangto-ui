import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { styleGuideCatalog } from './index';
import {
  buildManifest,
  buildManifestIndex,
  serializeManifestIndex,
  serializeManifestEntry,
  MANIFEST_INDEX_COLUMNS,
  type CatalogEntryLike,
  type ManifestIndex,
} from './manifest';

const committedPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'catalog.manifest.json');
const committed: ManifestIndex = JSON.parse(readFileSync(committedPath, 'utf8'));

/** 색인 한 행에서 열 이름으로 값을 꺼낸다. */
function cell(index: ManifestIndex, row: readonly unknown[], column: string): unknown {
  return row[index.columns.indexOf(column as (typeof index.columns)[number])];
}

describe('buildManifest — rich/pending 분기', () => {
  const manifest = buildManifest(styleGuideCatalog);

  it('meta가 저작된 항목은 metaStatus="authored" + rich 필드를 싣는다', () => {
    const cyber = manifest.find((e) => e.name === 'cyberpunk-hud-01');
    expect(cyber?.metaStatus).toBe('authored');
    expect(cyber?.meta?.family).toBe('tech-dark');
    expect(cyber?.meta?.domains).toContain('gaming');
    expect(cyber?.meta?.mood.energy).toBe(5);
  });

  it('meta가 없는 항목은 metaStatus="pending" + meta 미포함(completeness만) — fixture', () => {
    // KAN-021 backfill 완료로 실제 카탈로그엔 pending이 0이므로 분기 계약은 fixture로 검증한다.
    const [entry] = buildManifest([{ name: 'fixture-pending' }]);
    expect(entry.metaStatus).toBe('pending');
    expect(entry.meta).toBeUndefined();
    expect(entry.completeness).toBeDefined();
  });

  it('KAN-021 backfill 완료 — 전 항목 authored, pending 0 (gate "meta 필수" 승격 근거)', () => {
    const pending = manifest.filter((e) => e.metaStatus === 'pending');
    expect(pending).toHaveLength(0);
    expect(manifest.every((e) => e.metaStatus === 'authored' && e.meta)).toBe(true);
  });

  it('KAN-018 파일럿 3종은 backfill 이후에도 authored 상태를 유지한다', () => {
    // KAN-021 backfill로 authored가 단조 증가하므로 "정확히 3종" 대신 파일럿 불변식만 검증한다.
    const authored = new Set(
      manifest.filter((e) => e.metaStatus === 'authored').map((e) => e.name)
    );
    for (const pilot of ['cyberpunk-hud-01', 'minimal-saas-01', 'neobrutalism-editorial-01']) {
      expect(authored.has(pilot)).toBe(true);
    }
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

describe('색인과 상세 — 2단 읽기 (KAN-064)', () => {
  const manifest = buildManifest(styleGuideCatalog);
  const index = buildManifestIndex(manifest);

  it('색인 열에는 고를 때 쓰는 필드만 있고 상세 필드는 없다', () => {
    expect(index.columns).toEqual(MANIFEST_INDEX_COLUMNS);
    for (const detail of ['description', 'completeness', 'mood', 'characteristics', 'useWhen', 'avoidWhen', 'accessibility', 'related']) {
      expect(index.columns as readonly string[]).not.toContain(detail);
    }
  });

  it('색인 머리가 축 이름과 상세 자리를 알려 준다', () => {
    expect(index.axis).toBe('ui-style-guide');
    expect(index.detail).toBe('manifest/{name}.json');
  });

  it('색인 한 행은 같은 항목의 매니페스트 값과 같다', () => {
    expect(index.rows).toHaveLength(manifest.length);
    manifest.forEach((e, i) => {
      const row = index.rows[i];
      expect(row).toHaveLength(index.columns.length);
      expect(cell(index, row, 'name')).toBe(e.name);
      expect(cell(index, row, 'displayName')).toBe(e.meta?.displayName ?? null);
      expect(cell(index, row, 'family')).toBe(e.meta?.family ?? null);
      expect(cell(index, row, 'priority')).toBe(e.meta?.priority ?? null);
      expect(cell(index, row, 'summary')).toBe(e.meta?.summary ?? null);
      expect(cell(index, row, 'tags')).toEqual(e.meta?.tags ?? null);
      expect(cell(index, row, 'domains')).toEqual(e.meta?.domains ?? null);
      expect(cell(index, row, 'metaStatus')).toBe(e.metaStatus);
    });
  });

  it('pending 항목은 메타에서 오는 열이 null 이다 — fixture', () => {
    const [row] = buildManifestIndex(buildManifest([{ name: 'fixture-pending' }])).rows;
    expect(row).toEqual(['fixture-pending', null, null, null, null, null, null, 'pending']);
  });

  it('상세 직렬화는 항목 하나를 잃지 않는다(useWhen·avoidWhen 포함)', () => {
    for (const e of manifest) {
      const raw = serializeManifestEntry(e);
      expect(raw.endsWith('\n')).toBe(true);
      expect(JSON.parse(raw)).toEqual(JSON.parse(JSON.stringify(e)));
      if (e.metaStatus === 'authored') expect(raw).toContain('"useWhen"');
    }
  });
});

describe('재생성 동기 + 아티팩트 무결성', () => {
  it('색인이 커밋된 catalog.manifest.json과 일치한다(정규화 비교)', () => {
    // 불일치 시: `pnpm --filter ...style-guide-catalog gen:manifest` 재실행 필요.
    expect(buildManifestIndex(buildManifest(styleGuideCatalog))).toEqual(committed);
  });

  it('색인 직렬화가 결정적이다(한 행 한 줄 + 말미 개행) — 커밋 파일과 바이트 동일', () => {
    const raw = readFileSync(committedPath, 'utf8');
    expect(serializeManifestIndex(buildManifestIndex(buildManifest(styleGuideCatalog)))).toBe(raw);
  });

  it('커밋 색인이 최소 스키마를 만족한다(런타임 손상 가드)', () => {
    expect(committed.columns).toEqual(MANIFEST_INDEX_COLUMNS);
    for (const row of committed.rows) {
      expect(row).toHaveLength(committed.columns.length);
      expect(typeof cell(committed, row, 'name')).toBe('string');
      const status = cell(committed, row, 'metaStatus');
      expect(['authored', 'pending']).toContain(status);
      if (status === 'authored') {
        expect(typeof cell(committed, row, 'family')).toBe('string');
        expect(Array.isArray(cell(committed, row, 'tags'))).toBe(true);
        expect(Array.isArray(cell(committed, row, 'domains'))).toBe(true);
      }
    }
  });
});
