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

  it('공용 vitest 설정이 같은 조건 이름을 브라우저 쪽과 node 쪽 둘 다에 켠다', () => {
    const shared = readFileSync(join(repoRoot, 'vitest.source.ts'), 'utf8');
    // node 환경 테스트는 `ssr.resolve.conditions` 만 본다 — `resolve.conditions` 만 켜면 소스를 못 찾는다(S2 실측).
    expect(shared).toMatch(/ssr:\s*\{\s*resolve:\s*\{\s*conditions:/);
    expect(shared).toMatch(/resolve:\s*\{\s*conditions:/);
    expect(shared).toContain(`'${SOURCE_CONDITION}'`);
  });

  it('test 스크립트가 있는 패키지마다 vitest 설정이 공용 조건 설정을 가져다 쓴다 — test:unit 이 소스를 읽는다', () => {
    const missing: string[] = [];
    for (const p of packages) {
      const pj = JSON.parse(readFileSync(join(repoRoot, p.dir, 'package.json'), 'utf8')) as {
        scripts?: Record<string, string>;
      };
      if (!pj.scripts?.test) continue;
      const cfg = join(repoRoot, p.dir, 'vitest.config.ts');
      const text = existsSync(cfg) ? readFileSync(cfg, 'utf8') : '';
      if (!/from '\.\.\/\.\.\/vitest\.source'/.test(text)) missing.push(`${p.dir}/vitest.config.ts`);
    }
    expect(missing).toEqual([]);
  });

  it('tsx 로 도는 스크립트(매니페스트 생성기 등)마다 같은 조건을 켠다 — build 순서와 상관없이 돈다', () => {
    const missing: string[] = [];
    for (const p of packages) {
      const pj = JSON.parse(readFileSync(join(repoRoot, p.dir, 'package.json'), 'utf8')) as {
        scripts?: Record<string, string>;
      };
      for (const [name, cmd] of Object.entries(pj.scripts ?? {})) {
        if (/(^|\s)tsx\s/.test(cmd) && !cmd.includes(`--conditions=${SOURCE_CONDITION}`)) {
          missing.push(`${p.dir} scripts.${name}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});

describe('크기 게이트의 자리 — test:unit 이 아니라 build 끝', () => {
  // 크기 게이트(bundleBudget.test.ts)는 빌드된 dist 를 잰다. test:unit 에 두면 build 없이 돌 수 없으므로
  // 루트 build 가 dist 를 다 만든 직후에 돈다(KAN-066, 2026-10-10 유저 선택). 연결이 끊기면 크기 게이트가
  // 조용히 아무 데서도 안 도는데, 그 상태는 초록으로 보인다 — 그래서 연결 자체를 여기서 본다.
  const read = (rel: string) => readFileSync(join(repoRoot, rel), 'utf8');

  it('foundations 기본 vitest 설정은 크기 게이트를 뺀다', () => {
    expect(read('packages/foundations/vitest.config.ts')).toMatch(/exclude:[^\]]*'src\/bundleBudget\.test\.ts'/);
  });

  it('크기 게이트 전용 설정은 크기 게이트 하나만 싣는다', () => {
    expect(read('packages/foundations/vitest.bundle.config.ts')).toMatch(/include:\s*\['src\/bundleBudget\.test\.ts'\]/);
  });

  it('루트 build 가 모든 패키지를 빌드한 뒤 foundations 의 크기 게이트를 돌린다', () => {
    const root = JSON.parse(read('package.json')) as { scripts: Record<string, string> };
    const fnd = JSON.parse(read('packages/foundations/package.json')) as { scripts: Record<string, string> };
    expect(fnd.scripts['test:bundle']).toContain('vitest.bundle.config.ts');
    expect(root.scripts.build).toMatch(/^pnpm -r --filter=!storybook run build && .*bbangto-ui-foundations run test:bundle$/);
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
