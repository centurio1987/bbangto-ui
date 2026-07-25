/**
 * metadataCoverage.test.ts — **repo 전역 메타데이터 커버리지 census 게이트** (KAN-035).
 *
 * 물리적으로 foundations 패키지에 호스팅하지만 **저장소 전역 거버넌스 게이트**다(`test:unit`의 `pnpm -r`이
 * 전 패키지를 항상 실행하므로 필터 누락 없음). 두 층위:
 *  1) 실제 repo 검증 — `metadata-coverage.json` 선언 vs `packages/*` 실제 카탈로그 파일·매니페스트 통계 대조.
 *  2) fixture 실패주입 — 미선언 카탈로그·infra-pilot followUp 누락 등에서 검증기가 위반을 낸다(자동·영속, 외부검토 #18).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  auditCoverage,
  isCatalogFile,
  type CoverageDeclaration,
} from './metadataCoverage';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

/** node_modules·dist를 건너뛰며 dir 하위 파일을 repo 상대경로(슬래시)로 수집. */
function walk(absDir: string, acc: string[] = []): string[] {
  for (const ent of readdirSync(absDir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist') continue;
    const abs = join(absDir, ent.name);
    if (ent.isDirectory()) walk(abs, acc);
    else acc.push(relative(repoRoot, abs).split('\\').join('/'));
  }
  return acc;
}

function readDecl(): CoverageDeclaration {
  return JSON.parse(readFileSync(join(repoRoot, 'metadata-coverage.json'), 'utf8'));
}

/** 축의 .manifest.json에서 {total, authored} 통계 산출. */
function manifestStat(pkg: string, files: readonly string[]): { total: number; authored: number } {
  const rel = files.find((f) => f.endsWith('.manifest.json'));
  if (!rel) return { total: 0, authored: 0 };
  const arr = JSON.parse(readFileSync(join(repoRoot, 'packages', pkg, rel), 'utf8')) as {
    metaStatus?: string;
  }[];
  return { total: arr.length, authored: arr.filter((e) => e.metaStatus === 'authored').length };
}

describe('metadata-coverage census — 실제 repo', () => {
  const decl = readDecl();
  const discovered = walk(join(repoRoot, 'packages')).filter(isCatalogFile);

  it('발견된 모든 카탈로그 파일이 census에 선언돼 있다(드리프트 0)', () => {
    const stats: Record<string, { total: number; authored: number }> = {};
    for (const ax of decl.axes) stats[ax.id] = manifestStat(ax.package, ax.files);
    const violations = auditCoverage(decl, discovered, stats);
    expect(violations).toEqual([]);
  });

  it('4개 축 전량 covered(foundation KAN-041 승격)·core out-of-scope 선언 존재', () => {
    const byId = new Map(decl.axes.map((a) => [a.id, a]));
    expect(byId.has('ui-style-guide')).toBe(true);
    expect(byId.has('viz-style-guide')).toBe(true);
    expect(byId.has('viz-type')).toBe(true);
    const f = byId.get('foundation');
    expect(f?.status).toBe('covered'); // KAN-041에서 infra-pilot→covered 승격(pending 0)
    // covered면 followUp/pilotAuthored 불필요(영구 예외 아님).
    expect(decl.axes.every((a) => a.status === 'covered')).toBe(true);
    expect(decl.outOfScope.length).toBeGreaterThanOrEqual(4);
  });

  it('covered 축은 pending 0(전량 authored)', () => {
    for (const ax of decl.axes.filter((a) => a.status === 'covered')) {
      const s = manifestStat(ax.package, ax.files);
      expect(s.authored, ax.id).toBe(s.total);
    }
  });
});

describe('auditCoverage — fixture 실패주입(순수 검증기)', () => {
  const okAxis = {
    id: 'foundation',
    package: 'foundations',
    files: ['foundation.manifest.json'],
    sourceModule: 'src/index.ts',
    status: 'infra-pilot' as const,
    pilotAuthored: 3,
    followUp: 'KAN-041',
    gate: 'src/meta/*.test.ts',
  };
  const okDecl: CoverageDeclaration = {
    axes: [okAxis],
    outOfScope: [{ id: 'core', rationale: 'r', promoteTrigger: 't' }],
  };
  const discovered = ['packages/foundations/foundation.manifest.json'];

  it('정상 선언 + 일치 discovered → 위반 0', () => {
    expect(auditCoverage(okDecl, discovered)).toEqual([]);
  });

  it('미선언 카탈로그 파일 발견 → 위반', () => {
    const v = auditCoverage(okDecl, [...discovered, 'packages/newpkg/foo.manifest.json']);
    expect(v.some((x) => x.includes('미선언'))).toBe(true);
  });

  it('infra-pilot followUp 누락 → 위반(영구 예외 방지)', () => {
    const decl = { ...okDecl, axes: [{ ...okAxis, followUp: '' }] };
    expect(auditCoverage(decl, discovered).some((x) => x.includes('followUp'))).toBe(true);
  });

  it('covered인데 pending 존재 → 위반', () => {
    const decl = { ...okDecl, axes: [{ ...okAxis, status: 'covered' as const }] };
    const v = auditCoverage(decl, discovered, { foundation: { total: 76, authored: 3 } });
    expect(v.some((x) => x.includes('pending'))).toBe(true);
  });

  it('선언한 축 파일이 디스크에 없음 → 위반', () => {
    expect(auditCoverage(okDecl, []).some((x) => x.includes('디스크에 없음'))).toBe(true);
  });

  it('out-of-scope rationale/promoteTrigger 누락 → 위반', () => {
    const decl = { ...okDecl, outOfScope: [{ id: 'core', rationale: '', promoteTrigger: '' }] };
    const v = auditCoverage(decl, discovered);
    expect(v.some((x) => x.includes('rationale'))).toBe(true);
    expect(v.some((x) => x.includes('promoteTrigger'))).toBe(true);
  });

  it('ignoredCatalogFiles로 명시 제외한 파일은 위반 아님', () => {
    const decl = { ...okDecl, ignoredCatalogFiles: ['packages/x/foo.manifest.json'] };
    expect(auditCoverage(decl, [...discovered, 'packages/x/foo.manifest.json'])).toEqual([]);
  });
});

describe('isCatalogFile', () => {
  it('*.manifest.json·src/catalog.json만 잡고 dist·node_modules·기타 json은 제외', () => {
    expect(isCatalogFile('packages/a/catalog.manifest.json')).toBe(true);
    expect(isCatalogFile('packages/a/type.manifest.json')).toBe(true);
    expect(isCatalogFile('packages/a/src/catalog.json')).toBe(true);
    expect(isCatalogFile('packages/a/package.json')).toBe(false);
    expect(isCatalogFile('packages/a/dist/catalog.manifest.json')).toBe(false);
    expect(isCatalogFile('packages/a/node_modules/x/foo.manifest.json')).toBe(false);
    expect(isCatalogFile('metadata-coverage.json')).toBe(false);
  });
});
