/**
 * workspaceSource.test.ts — **소스 조건 누락 게이트** (KAN-066).
 *
 * `publishedDocs.test.ts` 와 같은 자리·같은 구조다. 두 층위로 돈다:
 *  1) 실제 repo 검증 — `packages/*` 의 exports 진입점마다 개발용 조건이 있고, 그 이름을 루트 tsconfig 가 켠다.
 *  2) fixture 실패주입 — 불변식 셋을 각각 일부러 어긴 입력에서 검증기가 위반을 낸다.
 *
 * 불변식과 커버리지 한계는 `workspaceSource.ts` 파일 주석에 있다.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  auditWorkspaceSource,
  formatWorkspaceSourceViolation,
  sourceCandidates,
  SOURCE_CONDITION,
  type WorkspacePackage,
} from './workspaceSource';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

function collectPackages(): WorkspacePackage[] {
  const root = join(repoRoot, 'packages');
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(root, e.name, 'package.json')))
    .map((e) => {
      const dir = `packages/${e.name}`;
      const pj = JSON.parse(readFileSync(join(repoRoot, dir, 'package.json'), 'utf8')) as {
        name: string;
        exports?: unknown;
      };
      return { name: pj.name, dir, exports: pj.exports };
    });
}

describe('소스 조건 — 실제 repo', () => {
  const packages = collectPackages();

  it('워크스페이스 패키지를 실제로 집는다(범위가 조용히 비지 않았다)', () => {
    const names = packages.map((p) => p.name);
    expect(names).toContain('@centurio1987/bbangto-ui-tokens');
    expect(names).toContain('@centurio1987/bbangto-ui-core');
    expect(names).toContain('@centurio1987/bbangto-ui-visualization');
    expect(packages.length).toBeGreaterThanOrEqual(7);
  });

  it('JS 진입점마다 조건이 맨 앞에 있고, 짝이 되는 소스 파일을 가리킨다', () => {
    const violations = auditWorkspaceSource(packages, (rel) => existsSync(join(repoRoot, rel)));
    expect(violations.map(formatWorkspaceSourceViolation)).toEqual([]);
  });

  it('루트 tsconfig 가 같은 조건 이름을 켠다 — typecheck 가 소스를 읽는다', () => {
    const tsconfig = JSON.parse(readFileSync(join(repoRoot, 'tsconfig.json'), 'utf8')) as {
      compilerOptions?: { customConditions?: string[] };
    };
    expect(tsconfig.compilerOptions?.customConditions ?? []).toContain(SOURCE_CONDITION);
  });
});

describe('auditWorkspaceSource — fixture 실패주입(순수 검증기)', () => {
  const files = new Set(['packages/demo/src/index.ts', 'packages/demo/src/meta/index.ts', 'packages/demo/src/view.tsx']);
  const exists = (rel: string) => files.has(rel);
  const pkg = (exports: unknown): WorkspacePackage => ({ name: '@x/demo', dir: 'packages/demo', exports });
  const good = { [SOURCE_CONDITION]: './src/index.ts', types: './dist/index.d.ts', import: './dist/index.js' };
  const kinds = (exports: unknown) => auditWorkspaceSource([pkg(exports)], exists).map((v) => v.kind);

  it('조건이 맨 앞에 있고 짝이 맞으면 위반이 없다(서브패스·tsx 포함)', () => {
    expect(
      kinds({
        '.': good,
        './meta': { [SOURCE_CONDITION]: './src/meta/index.ts', types: './dist/meta/index.d.ts', import: './dist/meta/index.js' },
        './view': { [SOURCE_CONDITION]: './src/view.tsx', import: './dist/view.js' },
      }),
    ).toEqual([]);
  });

  it('JSON·manifest 진입점은 대상이 아니다', () => {
    expect(kinds({ '.': good, './catalog': './src/catalog.json', './manifest/*': './manifest/*' })).toEqual([]);
  });

  it('1) 조건이 없으면 잡는다 — 객체 진입점도, 문자열 .js 진입점도', () => {
    expect(kinds({ '.': { types: './dist/index.d.ts', import: './dist/index.js' } })).toEqual(['missing-condition']);
    expect(kinds({ '.': './dist/index.js' })).toEqual(['missing-condition']);
  });

  it('2) 조건이 types 뒤에 있으면 잡는다', () => {
    expect(
      kinds({ '.': { types: './dist/index.d.ts', [SOURCE_CONDITION]: './src/index.ts', import: './dist/index.js' } }),
    ).toEqual(['condition-not-first']);
  });

  it('3) 짝이 아닌 소스를 가리키거나 파일이 없으면 잡는다', () => {
    expect(kinds({ '.': { ...good, [SOURCE_CONDITION]: './src/meta/index.ts' } })).toEqual(['source-mismatch']);
    expect(
      kinds({ './gone': { [SOURCE_CONDITION]: './src/gone.ts', import: './dist/gone.js' } }),
    ).toEqual(['missing-source']);
  });

  it('위반 문구가 패키지와 진입점을 함께 말한다', () => {
    const [v] = auditWorkspaceSource([pkg({ '.': './dist/index.js' })], exists);
    expect(formatWorkspaceSourceViolation(v!)).toContain('@x/demo exports["."]');
  });

  it('sourceCandidates — dist 경로의 짝을 ts·tsx 둘로 낸다', () => {
    expect(sourceCandidates('./dist/typeMeta/index.js')).toEqual(['./src/typeMeta/index.ts', './src/typeMeta/index.tsx']);
    expect(sourceCandidates('./lib/index.js')).toEqual([]);
  });
});
