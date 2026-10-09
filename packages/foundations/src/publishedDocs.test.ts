/**
 * publishedDocs.test.ts — **배포 문서 게이트** (KAN-067).
 *
 * `gateDocs.test.ts` 와 같은 자리·같은 구조다. 두 층위로 돈다:
 *  1) 실제 repo 검증 — 공개 패키지의 `files` · 배포 README · 「원하는 것이 없을 때」 절과 예제 파일을 훑어 위반 0.
 *  2) fixture 실패주입 — 불변식 넷을 각각 일부러 어긴 입력에서 검증기가 위반을 낸다.
 *
 * 불변식과 커버리지 한계는 `publishedDocs.ts` 파일 주석에 있다.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  auditPublishedDocs,
  formatPublishedDocViolation,
  isShipped,
  sectionBody,
  EXTEND_SECTION_RULES,
  EXTEND_SECTION_TITLE,
  type PublishedPackage,
} from './publishedDocs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

/** `packages/*` 중 `private` 이 아닌 것. `files` 가 없으면 npm 이 전부 싣지만 이 저장소에는 그런 공개 패키지가 없다. */
function collectPackages(): PublishedPackage[] {
  const root = join(repoRoot, 'packages');
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(root, e.name, 'package.json')))
    .map((e) => {
      const dir = `packages/${e.name}`;
      const pj = JSON.parse(readFileSync(join(repoRoot, dir, 'package.json'), 'utf8')) as {
        name: string;
        private?: boolean;
        files?: string[];
      };
      const readmePath = join(repoRoot, dir, 'README.md');
      return {
        pkg: { name: pj.name, dir, files: pj.files ?? [], readme: existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : null },
        isPrivate: pj.private === true,
      };
    })
    .filter((x) => !x.isPrivate)
    .map((x) => x.pkg);
}

function collectExamples(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of EXTEND_SECTION_RULES) {
    const abs = join(repoRoot, r.examplePath);
    if (existsSync(abs)) out[r.examplePath] = readFileSync(abs, 'utf8');
  }
  return out;
}

describe('배포 문서 — 실제 repo', () => {
  const packages = collectPackages();

  it('공개 패키지를 실제로 집는다(범위가 조용히 비지 않았다)', () => {
    const names = packages.map((p) => p.name);
    expect(names).toContain('@centurio1987/bbangto-ui-core');
    expect(names).toContain('@centurio1987/bbangto-ui-visualization');
    expect(packages.every((p) => p.files.length > 0)).toBe(true);
    // 절을 요구하는 패키지가 공개 패키지 목록에 실제로 있다 — 디렉터리 이름이 바뀌면 여기서 먼저 걸린다.
    for (const r of EXTEND_SECTION_RULES) expect(packages.map((p) => p.dir)).toContain(r.dir);
  });

  it('배포물의 마크다운 · README 참조 · 「원하는 것이 없을 때」 절과 예제에 위반이 없다', () => {
    const violations = auditPublishedDocs(packages, EXTEND_SECTION_RULES, collectExamples());
    expect(violations.map(formatPublishedDocViolation)).toEqual([]);
  });
});

describe('auditPublishedDocs — fixture 실패주입(순수 검증기)', () => {
  const pkg = (over: Partial<PublishedPackage> = {}): PublishedPackage => ({
    name: '@x/demo',
    dir: 'packages/demo',
    files: ['dist', 'type.manifest.json', 'README.md'],
    readme: '# demo\n',
    ...over,
  });
  const example = "import { A } from '@x/demo';\n\nexport function Demo() {\n  return <A />;\n}\n";
  const rule = [{ dir: 'packages/demo', examplePath: 'ex/demo.tsx' }];
  const section = (code: string) =>
    ['# demo', '', `## ${EXTEND_SECTION_TITLE}`, '', '### 예제', '', '```tsx', code, '```', '', '## 다음 절', ''].join('\n');

  it('isShipped — files 항목 그 자체와 디렉터리 하위, 언제나 실리는 README·package.json', () => {
    const p = pkg();
    expect(isShipped(p, 'type.manifest.json')).toBe(true);
    expect(isShipped(p, './dist/index.d.ts')).toBe(true);
    expect(isShipped(p, 'package.json')).toBe(true);
    expect(isShipped(p, 'GUIDE.md')).toBe(false);
    expect(isShipped(p, '../core/README.md')).toBe(false);
    expect(isShipped(p, 'distant/x.js')).toBe(false); // 접두사가 같아도 다른 디렉터리
  });

  it('① files 에 README.md 말고 마크다운이 있으면 위반', () => {
    const v = auditPublishedDocs([pkg({ files: ['dist', 'README.md', 'GUIDE.md'] })], [], {});
    expect(v).toEqual([{ kind: 'md-in-files', pkg: '@x/demo', entry: 'GUIDE.md' }]);
  });

  it('② 배포물에 없는 파일로 가는 상대 링크는 위반, 절대 URL·배포물 안·코드펜스 안은 통과', () => {
    const readme = [
      '# demo',
      '[가이드](./GUIDE.md)',
      '[가이드](https://github.com/x/demo/blob/main/GUIDE.md)',
      '[색인](./type.manifest.json) · [위로](#demo)',
      '```md',
      '[펜스 안](./NOPE.md)',
      '```',
    ].join('\n');
    const v = auditPublishedDocs([pkg({ readme })], [], {});
    expect(v).toEqual([{ kind: 'dead-link', pkg: '@x/demo', line: 2, target: './GUIDE.md' }]);
  });

  it('② 배포물에 없는 문서를 코드 표기로 가리키면 위반, 절대 URL 링크의 글자는 통과', () => {
    const readme = [
      '# demo',
      '사유는 `GUIDE.md` 에 있다.',
      '저장소 문서: [`GUIDE.md`](https://github.com/x/demo/blob/main/GUIDE.md)',
      '이 문서(README.md)와 `*.md` 글롭은 세지 않는다.',
    ].join('\n');
    const v = auditPublishedDocs([pkg({ readme })], [], {});
    expect(v).toEqual([{ kind: 'dead-mention', pkg: '@x/demo', line: 2, name: 'GUIDE.md' }]);
  });

  it('③ 절이 없으면 위반', () => {
    const v = auditPublishedDocs([pkg()], rule, { 'ex/demo.tsx': example });
    expect(v).toEqual([{ kind: 'missing-section', pkg: '@x/demo' }]);
  });

  it('④ 절의 tsx 예제가 예제 파일과 다르면 위반, 같으면 통과(끝 공백 차이는 무시)', () => {
    const drift = auditPublishedDocs([pkg({ readme: section(example.replace('<A />', '<A b />')) })], rule, {
      'ex/demo.tsx': example,
    });
    expect(drift).toEqual([{ kind: 'example-drift', pkg: '@x/demo', example: 'ex/demo.tsx' }]);

    const same = auditPublishedDocs([pkg({ readme: section(example.trimEnd()) })], rule, { 'ex/demo.tsx': example });
    expect(same).toEqual([]);
  });

  it('④ 절에 tsx 블록이 없거나 예제 파일이 없으면 위반', () => {
    const noBlock = `# demo\n\n## ${EXTEND_SECTION_TITLE}\n\n설명뿐이다.\n`;
    expect(auditPublishedDocs([pkg({ readme: noBlock })], rule, { 'ex/demo.tsx': example })).toEqual([
      { kind: 'example-missing', pkg: '@x/demo', example: 'ex/demo.tsx' },
    ]);
    expect(auditPublishedDocs([pkg({ readme: section(example) })], rule, {})).toEqual([
      { kind: 'example-missing', pkg: '@x/demo', example: 'ex/demo.tsx' },
    ]);
  });

  it('절은 다음 h2 앞에서 끝난다 — 다음 절의 예제는 이 절의 것이 아니다', () => {
    const readme = [`## ${EXTEND_SECTION_TITLE}`, '', '없을 때.', '', '## 다른 절', '', '```tsx', example, '```'].join('\n');
    expect(sectionBody(readme, EXTEND_SECTION_TITLE)).not.toContain('export function Demo');
    expect(auditPublishedDocs([pkg({ readme })], rule, { 'ex/demo.tsx': example })).toEqual([
      { kind: 'example-missing', pkg: '@x/demo', example: 'ex/demo.tsx' },
    ]);
  });
});
