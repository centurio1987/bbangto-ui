/**
 * manifest.test.ts — foundation 매니페스트 생성기 계약 + 커밋 아티팩트 drift 게이트 (KAN-035).
 *
 * 커밋 `foundation.manifest.json`이 생성기 출력과 **바이트 일치**하는지, catalog.json이 SSOT에서 파생돼
 * 3자 slug-set(catalog/manifest/foundationCatalog)이 일치하는지, colorScheme 파생 규칙·over-claim·related
 * 정합이 강제되는지 검증한다.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import type { BbangtoFoundation, FoundationMeta } from '@centurio1987/bbangto-ui-tokens';
import { foundationCatalog } from '../index';
import { foundationMetaRegistry } from './registry';
import {
  buildFoundationManifest,
  serializeFoundationManifest,
  buildCatalogList,
  serializeCatalogList,
  deriveColorScheme,
  slugToLabel,
} from './manifest';

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, '..', '..', 'foundation.manifest.json');
const catalogPath = join(here, '..', 'catalog.json');

describe('buildFoundationManifest — 결정성·파생', () => {
  const m = buildFoundationManifest(foundationCatalog, foundationMetaRegistry);

  it('slug 오름차순으로 결정적 정렬한다', () => {
    const slugs = m.map((e) => e.slug);
    expect(slugs).toEqual([...slugs].sort());
  });

  it('76 엔트리 전량 authored(pending 0, KAN-041), colorScheme dark는 amber-dark 1종', () => {
    expect(m.length).toBe(76);
    const authored = m.filter((e) => e.metaStatus === 'authored');
    expect(authored.length).toBe(Object.keys(foundationMetaRegistry).length);
    expect(authored.length).toBe(76); // pending 0 — 전량 backfill 승격
    expect(m.filter((e) => e.metaStatus === 'pending')).toEqual([]);
    const dark = m.filter((e) => e.colorScheme === 'dark').map((e) => e.slug);
    expect(dark).toEqual(['amber-dark']);
  });

  it('모든 엔트리는 파생 필드(colorScheme·baseTextContrast) + meta를 가진다(전량 authored)', () => {
    for (const e of m) {
      expect(typeof e.baseTextContrast).toBe('number');
      expect(['light', 'dark']).toContain(e.colorScheme);
      expect(e.metaStatus).toBe('authored');
      expect(e.meta).toBeDefined();
    }
  });
});

describe('colorScheme 파생 규칙(경계 0.5·알파·파싱실패)', () => {
  it('순수 흑백·경계 근처 회색을 0.5 기준으로 판정', () => {
    expect(deriveColorScheme('#ffffff')).toBe('light');
    expect(deriveColorScheme('#000000')).toBe('dark');
    expect(deriveColorScheme('#808080')).toBe('dark'); // lum≈0.216
    expect(deriveColorScheme('#cccccc')).toBe('light'); // lum≈0.69
    expect(deriveColorScheme('#b0b0b0')).toBe('dark'); // lum≈0.494 (경계 하)
    expect(deriveColorScheme('#c0c0c0')).toBe('light'); // lum≈0.60 (경계 상)
  });

  it('알파 있는 배경은 흰 페이지 위 실효색으로 합성 후 판정', () => {
    expect(deriveColorScheme('rgba(0,0,0,0.1)')).toBe('light'); // 거의 흰색
    expect(deriveColorScheme('rgba(0,0,0,0.95)')).toBe('dark');
  });

  it('파싱 불가는 throw(데이터 무결성)', () => {
    expect(() => deriveColorScheme('not-a-color')).toThrow(/파싱 불가/);
  });
});

describe('over-claim / related 정합(throw)', () => {
  /** semantic base 쌍만 갖춘 최소 foundation 픽스처. */
  function fnd(bg: string, fg: string): BbangtoFoundation {
    return { semantic: { background: { base: bg }, foreground: { base: fg } } } as unknown as BbangtoFoundation;
  }
  const baseMeta: FoundationMeta = {
    displayName: 'X',
    summary: 's',
    tags: ['light'],
    mood: { formality: 3, energy: 3, warmth: 3, density: 3, ornament: 3 },
    domains: ['saas'],
    useWhen: ['use'],
    avoidWhen: ['avoid'],
    accessibility: { contrastIntent: 'aa', colorblindConsidered: false, darkFirst: false },
  };

  it('contrastIntent가 실측보다 높으면 over-claim throw', () => {
    const cat = { x: fnd('#ffffff', '#999999') }; // #999 on #fff ≈ 2.8 < aa(4.5)
    const reg = { x: baseMeta };
    expect(() => buildFoundationManifest(cat, reg)).toThrow(/over-claim/);
  });

  it('정직한 선언(실측 ≥ 의도)은 통과', () => {
    const cat = { x: fnd('#ffffff', '#111111') }; // ≈18.9 ≥ aa
    const reg = { x: baseMeta };
    expect(() => buildFoundationManifest(cat, reg)).not.toThrow();
  });

  it('related self-ref/미존재/중복 → throw', () => {
    const cat = { x: fnd('#ffffff', '#111111'), y: fnd('#ffffff', '#111111') };
    const withRelated = (r: readonly string[]) => ({ x: { ...baseMeta, related: r } });
    expect(() => buildFoundationManifest(cat, withRelated(['x']))).toThrow(/self-reference/);
    expect(() => buildFoundationManifest(cat, withRelated(['y', 'y']))).toThrow(/duplicate/);
    expect(() => buildFoundationManifest(cat, withRelated(['zzz']))).toThrow(/not in catalog/);
    expect(() => buildFoundationManifest(cat, withRelated(['y']))).not.toThrow();
  });

  it('phantom registry 키(catalog에 없는 slug) → throw', () => {
    const cat = { x: fnd('#ffffff', '#111111') };
    expect(() => buildFoundationManifest(cat, { ghost: baseMeta })).toThrow(/not in foundationCatalog/);
  });
});

describe('커밋 아티팩트 바이트 동기 + 3자 slug-set 일치', () => {
  it('foundation.manifest.json 바이트 일치', () => {
    const generated = serializeFoundationManifest(
      buildFoundationManifest(foundationCatalog, foundationMetaRegistry),
    );
    expect(readFileSync(manifestPath, 'utf8')).toBe(generated);
  });

  it('catalog.json은 SSOT 파생·바이트 일치', () => {
    const generated = serializeCatalogList(buildCatalogList(foundationCatalog));
    expect(readFileSync(catalogPath, 'utf8')).toBe(generated);
  });

  it('catalog.json ≡ foundation.manifest.json ≡ foundationCatalog (76 slug 동일)', () => {
    const catIds = new Set(
      (JSON.parse(readFileSync(catalogPath, 'utf8')) as { id: string }[]).map((e) => e.id),
    );
    const manSlugs = new Set(
      (JSON.parse(readFileSync(manifestPath, 'utf8')) as { slug: string }[]).map((e) => e.slug),
    );
    const catalogKeys = new Set(Object.keys(foundationCatalog));
    expect(catIds).toEqual(catalogKeys);
    expect(manSlugs).toEqual(catalogKeys);
    expect(catalogKeys.size).toBe(76);
  });

  it('slugToLabel은 kebab→Title Case', () => {
    expect(slugToLabel('amber-dark')).toBe('Amber Dark');
    expect(slugToLabel('web-blue')).toBe('Web Blue');
  });
});
