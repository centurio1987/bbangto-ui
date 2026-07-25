/**
 * registry.test.ts — foundation 축 레지스트리 커버리지·불변식 게이트 (KAN-035, 인프라+파일럿 스코프).
 *
 * 커버리지 SSOT는 `foundationCatalog`(src/index.ts, 76). registry는 authored 메타만 담으므로 게이트는
 * "registry 키 ⊆ catalog 키(phantom 0)·파일럿 ≥3·통제 어휘·useWhen/avoidWhen(≤5)·related 정합"을 강제한다.
 * pending 0 승격(전량 authored)은 후속 KAN-041의 몫이라 여기선 강제하지 않는다(infra-pilot 계약).
 */
import { describe, it, expect } from 'vitest';
import { TAGS, DOMAINS } from '@centurio1987/bbangto-ui-tokens';
import { foundationCatalog } from '../index';
import { foundationMetaRegistry } from './registry';

const catalogSlugs = new Set(Object.keys(foundationCatalog));
const registrySlugs = Object.keys(foundationMetaRegistry);
const TAG_SET = new Set<string>(TAGS);
const DOMAIN_SET = new Set<string>(DOMAINS);

describe('foundationMetaRegistry — 커버리지', () => {
  it('registry 키는 모두 foundationCatalog에 존재한다(phantom 0)', () => {
    const phantom = registrySlugs.filter((s) => !catalogSlugs.has(s));
    expect(phantom).toEqual([]);
  });

  it('파일럿 authored ≥ 3(인프라+파일럿 스코프)', () => {
    expect(registrySlugs.length).toBeGreaterThanOrEqual(3);
  });

  it('foundationCatalog는 76종(amber 2 + external 74)', () => {
    expect(catalogSlugs.size).toBe(76);
  });
});

describe('foundationMetaRegistry — authored 메타 불변식', () => {
  it('모든 authored는 통제 어휘 tags/domains·비어있지 않은 summary/displayName을 가진다', () => {
    for (const [slug, m] of Object.entries(foundationMetaRegistry)) {
      expect(m.displayName.length, slug).toBeGreaterThan(0);
      expect(m.summary.length, slug).toBeGreaterThan(0);
      expect(m.tags.length, slug).toBeGreaterThan(0);
      for (const t of m.tags) expect(TAG_SET.has(t), `${slug}:tag ${t}`).toBe(true);
      for (const d of m.domains) expect(DOMAIN_SET.has(d), `${slug}:domain ${d}`).toBe(true);
    }
  });

  it('mood 5축은 모두 1~5 정수', () => {
    for (const [slug, m] of Object.entries(foundationMetaRegistry)) {
      for (const axis of ['formality', 'energy', 'warmth', 'density', 'ornament'] as const) {
        const v = m.mood[axis];
        expect(Number.isInteger(v), `${slug}:${axis}`).toBe(true);
        expect(v, `${slug}:${axis}`).toBeGreaterThanOrEqual(1);
        expect(v, `${slug}:${axis}`).toBeLessThanOrEqual(5);
      }
    }
  });

  it('useWhen(1~5)·avoidWhen(≤5) 비어있지 않은 명령형 문장', () => {
    for (const [slug, m] of Object.entries(foundationMetaRegistry)) {
      expect(m.useWhen.length, slug).toBeGreaterThan(0);
      expect(m.useWhen.length, slug).toBeLessThanOrEqual(5);
      expect(m.avoidWhen.length, slug).toBeLessThanOrEqual(5);
      for (const s of [...m.useWhen, ...m.avoidWhen]) expect(s.trim().length, slug).toBeGreaterThan(0);
    }
  });

  it('accessibility.contrastIntent는 통제 어휘, boolean 필드 정상', () => {
    for (const [slug, m] of Object.entries(foundationMetaRegistry)) {
      expect(['low', 'aa', 'aaa'], slug).toContain(m.accessibility.contrastIntent);
      expect(typeof m.accessibility.colorblindConsidered, slug).toBe('boolean');
      expect(typeof m.accessibility.darkFirst, slug).toBe('boolean');
    }
  });

  it('related는 존재하는 slug·self-ref/중복 없음', () => {
    for (const [slug, m] of Object.entries(foundationMetaRegistry)) {
      if (!m.related) continue;
      const seen = new Set<string>();
      for (const r of m.related) {
        expect(r, slug).not.toBe(slug);
        expect(seen.has(r), `${slug}:dup ${r}`).toBe(false);
        expect(catalogSlugs.has(r), `${slug}:related ${r}`).toBe(true);
        seen.add(r);
      }
    }
  });
});
