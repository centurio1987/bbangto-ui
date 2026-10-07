/**
 * bundleBudget.test.ts — **번들 크기 상한 게이트** (KAN-051).
 *
 * `metadataCoverage.test.ts` 와 같은 자리다. 물리적으로 foundations 에 두지만 저장소 전역 게이트이고
 * (`test:unit` 의 `pnpm -r` 이 전 패키지를 항상 실행한다), 상한의 정본은 루트 `bundle-budget.json` 이다.
 *
 * 선례와 다른 점이 하나 있다. 그 게이트는 커밋된 JSON 만 읽지만, 이 게이트는 foundations 가 의존하지 않는
 * 다른 패키지의 **dist 를 파일 경로로** 읽는다. 그래서 `pnpm build` 뒤에 돌아야 맞는 값이 나오고,
 * dist 가 없거나 src·`tsup.config.ts` 보다 오래됐으면 skip 이 아니라 **실패**한다(CLAUDE.md 게이트 순서).
 *
 * 네 층위로 돈다:
 *  1) 측정기 자체 시험 — 한 파일에 forwardRef+displayName 컴포넌트 A·B 를 두면 A 만 가져와도 B 가 남고,
 *     파일 둘로 나누면 빠진다. 이 차이를 못 가리는 측정기로 잰 실측은 의미가 없다.
 *  2) 정본 정합 — 공개 패키지가 전부 정본에 있고, max 가 basis 에 상한 규칙을 적용한 값과 같다.
 *  3) dist 신선도.
 *  4) dist 실측 — 대표 export 하나만 / export 전부.
 *
 * 경로는 각 `package.json` 의 `exports['.'].import` 에서 푼다. 실제 파일 위치에서 묶어야 패키지마다
 * `sideEffects: false` 가 읽힌다.
 */
import { build } from 'esbuild';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

interface Pair {
  representative: number;
  all: number;
}

interface PackageBudget {
  package: string;
  dir: string;
  representative: string;
  basis: Pair;
  max: Pair;
}

interface BudgetFile {
  measure: { external: string[] };
  packages: PackageBudget[];
}

const budget: BudgetFile = JSON.parse(readFileSync(join(repoRoot, 'bundle-budget.json'), 'utf8'));

/** 상한 규칙 — `bundle-budget.json` 의 `rule` 문장과 같은 식이다. */
const representativeLimit = (basis: number): number =>
  Math.ceil(Math.max(basis * 1.5, basis + 2048) / 512) * 512;
const allLimit = (basis: number): number => Math.ceil((basis * 1.15) / 1024) * 1024;

/** stdin 하나를 묶어 바이트 수와 본문을 낸다. 디스크에 쓰지 않는다. */
async function measure(
  contents: string,
  resolveDir: string,
  external: string[],
): Promise<{ bytes: number; text: string }> {
  const r = await build({
    stdin: { contents, resolveDir, loader: 'js' },
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    platform: 'browser',
    logLevel: 'silent',
    external,
  });
  const bytes = r.outputFiles.reduce((n, f) => n + f.contents.length, 0);
  return { bytes, text: r.outputFiles.map((f) => f.text).join('\n') };
}

function entryFile(pkgDir: string): string {
  const pj = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8')) as {
    exports: Record<string, { import?: string } | string>;
  };
  const root = pj.exports['.'];
  const rel = typeof root === 'string' ? root : root.import;
  if (!rel) throw new Error(`${pkgDir}/package.json 의 exports['.'].import 가 없습니다`);
  return join(pkgDir, rel);
}

/** src 아래(시험·스토리 파일 제외)와 tsup.config.ts 중 가장 최근에 고친 파일. */
function newestSource(pkgDir: string): { file: string; mtime: number } {
  let newest = { file: join(pkgDir, 'tsup.config.ts'), mtime: statSync(join(pkgDir, 'tsup.config.ts')).mtimeMs };
  const walk = (dir: string): void => {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, ent.name);
      if (ent.isDirectory()) walk(abs);
      else if (!/\.(test|stories)\.[jt]sx?$/.test(ent.name)) {
        const mtime = statSync(abs).mtimeMs;
        if (mtime > newest.mtime) newest = { file: abs, mtime };
      }
    }
  };
  walk(join(pkgDir, 'src'));
  return newest;
}

/** dist 가 없거나 소스보다 오래됐으면 `pnpm build` 를 먼저 하라는 말과 함께 던진다. */
function assertFreshDist(b: PackageBudget): string {
  const pkgDir = join(repoRoot, b.dir);
  const entry = entryFile(pkgDir);
  if (!existsSync(entry)) {
    throw new Error(
      `${b.package}: ${relative(repoRoot, entry)} 가 없습니다 — 이 게이트는 빌드된 dist 를 잽니다. \`pnpm build\` 를 먼저 하세요`,
    );
  }
  const distTime = statSync(entry).mtimeMs;
  const src = newestSource(pkgDir);
  if (src.mtime > distTime) {
    throw new Error(
      `${b.package}: dist(${relative(repoRoot, entry)})가 ${relative(repoRoot, src.file)} 보다 오래됐습니다 — ` +
        `낡은 dist 를 재면 고친 것이 숫자에 안 나옵니다. \`pnpm build\` 를 먼저 하세요`,
    );
  }
  return entry;
}

describe('측정기 자체 시험 — 파일 하나와 파일 둘을 가리는가', () => {
  const work = mkdtempSync(join(tmpdir(), 'bbangto-bundle-budget-'));
  afterAll(() => rmSync(work, { recursive: true, force: true }));

  // B 에만 4,000 자짜리 표식을 넣어, 남았는지를 크기와 본문 둘로 본다.
  const marker = 'B_ONLY_' + 'x'.repeat(4000);
  const compA =
    "export const A = forwardRef(function A(p, r) { return createElement('i', { ref: r, ...p }, 'a'); });\n" +
    "A.displayName = 'A';\n";
  const compB =
    `export const B = forwardRef(function B(p, r) { return createElement('b', { ref: r, ...p }, ${JSON.stringify(marker)}); });\n` +
    "B.displayName = 'B';\n";
  const reactImport = "import { forwardRef, createElement } from 'react';\n";
  const pkgJson = (name: string): string => JSON.stringify({ name, type: 'module', sideEffects: false });

  const one = join(work, 'one');
  mkdirSync(one);
  writeFileSync(join(one, 'package.json'), pkgJson('fx-one'));
  writeFileSync(join(one, 'index.js'), reactImport + compA + compB);

  const two = join(work, 'two');
  mkdirSync(two);
  writeFileSync(join(two, 'package.json'), pkgJson('fx-two'));
  writeFileSync(join(two, 'a.js'), reactImport + compA);
  writeFileSync(join(two, 'b.js'), reactImport + compB);
  writeFileSync(join(two, 'index.js'), "export * from './a.js';\nexport * from './b.js';\n");

  it('한 파일이면 A 만 가져와도 B 가 남고, 두 파일이면 빠진다', async () => {
    const ext = budget.measure.external;
    const single = await measure(`export { A } from ${JSON.stringify(join(one, 'index.js'))};`, one, ext);
    const split = await measure(`export { A } from ${JSON.stringify(join(two, 'index.js'))};`, two, ext);
    expect(single.text).toContain(marker);
    expect(split.text).not.toContain(marker);
    expect(single.bytes - split.bytes).toBeGreaterThan(3500);
    expect(split.bytes).toBeLessThan(1000);
  });
});

describe('상한 정본 — bundle-budget.json', () => {
  it('공개 패키지가 전부 정본에 있다', () => {
    const listed = new Set(budget.packages.map((b) => b.dir));
    const published = readdirSync(join(repoRoot, 'packages'))
      .map((name) => join('packages', name))
      .filter((rel) => existsSync(join(repoRoot, rel, 'package.json')))
      .filter((rel) => {
        const pj = JSON.parse(readFileSync(join(repoRoot, rel, 'package.json'), 'utf8')) as { private?: boolean };
        return !pj.private;
      });
    expect(published.filter((rel) => !listed.has(rel))).toEqual([]);
  });

  it.each(budget.packages.map((b) => [b.package, b] as const))(
    '%s — max 가 basis 에 상한 규칙을 적용한 값과 같다',
    (_name, b) => {
      expect(b.max).toEqual({
        representative: representativeLimit(b.basis.representative),
        all: allLimit(b.basis.all),
      });
    },
  );
});

describe('dist 신선도 — 빌드 뒤에 돈다', () => {
  it.each(budget.packages.map((b) => [b.package, b] as const))('%s — dist 가 소스보다 새것이다', (_name, b) => {
    expect(() => assertFreshDist(b)).not.toThrow();
  });
});

describe('dist 실측 — 상한 이하', () => {
  it.each(budget.packages.map((b) => [b.package, b] as const))(
    '%s — 대표 export 하나만 / export 전부',
    async (_name, b) => {
      const entry = assertFreshDist(b);
      const pkgDir = join(repoRoot, b.dir);
      const ext = budget.measure.external;
      const one = await measure(`export { ${b.representative} } from ${JSON.stringify(entry)};`, pkgDir, ext);
      const all = await measure(`export * from ${JSON.stringify(entry)};`, pkgDir, ext);
      expect(
        one.bytes,
        `${b.package} 에서 ${b.representative} 하나만 가져왔는데 ${one.bytes}B 가 남습니다(상한 ${b.max.representative}B)`,
      ).toBeLessThanOrEqual(b.max.representative);
      expect(all.bytes, `${b.package} 전체가 ${all.bytes}B 입니다(상한 ${b.max.all}B)`).toBeLessThanOrEqual(
        b.max.all,
      );
    },
    30_000,
  );
});
