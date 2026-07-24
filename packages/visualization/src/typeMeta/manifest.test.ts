/**
 * manifest.test.ts — 유형 축 매니페스트 생성기 계약 + 커밋 아티팩트 drift 게이트 (KAN-020).
 *
 * style-guide-catalog/manifest.test.ts 동형: 커밋 `type.manifest.json`이 `serializeTypeManifest(
 * buildTypeManifest(vizTypeRegistry))`와 **바이트 일치**하는지, related 참조 정합성이 authored 전체에 대해
 * throw로 강제되는지, 결정적 정렬·카운트가 유지되는지 검증한다.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { buildTypeManifest, serializeTypeManifest } from './manifest';
import { vizTypeRegistry } from './registry';
import type { VizTypeRegistryEntry } from './types';

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, '..', '..', 'type.manifest.json');

describe('buildTypeManifest — 결정성·완성도', () => {
  it('id 오름차순으로 결정적 정렬한다', () => {
    const m = buildTypeManifest(vizTypeRegistry);
    const ids = m.map((e) => e.id);
    expect(ids).toEqual([...ids].sort());
  });

  it('metaStatus authored=87(전량 backfill)·pending=0 (KAN-040)', () => {
    const m = buildTypeManifest(vizTypeRegistry);
    const authored = m.filter((e) => e.metaStatus === 'authored').length;
    expect(authored).toBe(87);
    expect(m.length - authored).toBe(0);
    expect(m.length).toBe(87);
  });

  it('완성도(exportCount·useWhenCount 등)를 구조에서 계산한다', () => {
    const m = buildTypeManifest(vizTypeRegistry);
    for (const e of m) {
      expect(e.completeness.exportCount).toBe(e.exportNames.length);
      if (e.metaStatus === 'pending') {
        expect(e.completeness.useWhenCount).toBe(0);
        expect(e.completeness.primitiveCount).toBe(0);
        expect(e.meta).toBeUndefined();
      } else {
        expect(e.completeness.useWhenCount).toBeGreaterThan(0);
        expect(e.completeness.primitiveCount).toBeGreaterThan(0);
      }
    }
  });
});

describe('buildTypeManifest — related 참조 정합성(authored 전체, throw)', () => {
  const base: VizTypeRegistryEntry = {
    id: 'VT-901',
    name: 'Fixture A',
    kind: 'template',
    exportNames: ['Fixture'],
  };
  const other: VizTypeRegistryEntry = {
    id: 'VT-902',
    name: 'Fixture B',
    kind: 'template',
    exportNames: ['Fixture2'],
  };

  it('self-reference → throw', () => {
    const bad = { ...base, meta: mkMeta({ related: ['VT-901'] }) };
    expect(() => buildTypeManifest([bad, other])).toThrow(/self-reference/);
  });

  it('duplicate related → throw', () => {
    const bad = { ...base, meta: mkMeta({ related: ['VT-902', 'VT-902'] }) };
    expect(() => buildTypeManifest([bad, other])).toThrow(/duplicate/);
  });

  it('존재하지 않는 id → throw', () => {
    const bad = { ...base, meta: mkMeta({ related: ['VT-999'] }) };
    expect(() => buildTypeManifest([bad, other])).toThrow(/not in registry/);
  });

  it('유효한 related → 통과', () => {
    const ok = { ...base, meta: mkMeta({ related: ['VT-902'] }) };
    expect(() => buildTypeManifest([ok, other])).not.toThrow();
  });
});

describe('type.manifest.json — 커밋 아티팩트 바이트 동기', () => {
  it('serializeTypeManifest(buildTypeManifest(registry))와 바이트 일치', () => {
    const generated = serializeTypeManifest(buildTypeManifest(vizTypeRegistry));
    const committed = readFileSync(manifestPath, 'utf8');
    expect(committed).toBe(generated);
  });
});

/** 최소 유효 meta 픽스처(related만 가변). */
function mkMeta(over: { related?: readonly string[] }) {
  return {
    category: 'engineering' as const,
    summary: 'fixture',
    dataShape: ['hierarchy'] as const,
    primitives: ['node'] as const,
    aliases: [] as const,
    useWhen: ['use it'] as const,
    avoidWhen: ['avoid it'] as const,
    tags: [] as const,
    ...over,
  };
}
