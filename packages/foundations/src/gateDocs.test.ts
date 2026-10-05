/**
 * gateDocs.test.ts — **품질 게이트 목록 드리프트 게이트** (KAN-046).
 *
 * `metadataCoverage.test.ts` 와 같은 자리·같은 구조다. 물리적으로 foundations 에 호스팅하지만
 * **저장소 전역 거버넌스 게이트**이고(`test:unit` 의 `pnpm -r` 이 전 패키지를 항상 실행하므로 필터
 * 누락 없음), 두 층위로 돈다:
 *  1) 실제 repo 검증 — 규범 문서와 `.claude/settings.json` 을 훑어 위반 0.
 *  2) fixture 실패주입 — 넷만 적은 문서에서 검증기가 위반을 낸다(자동·영속).
 *
 * 불변식과 「한 덩이」 정의, 그리고 **커버리지 한계**는 `gateDocs.ts` 파일 주석에 있다.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  auditGateDocs,
  findCommandGroups,
  formatViolation,
  type GateDocInput,
} from './gateDocs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

/**
 * 스캔에서 건너뛰는 디렉터리. `storybook-static` 은 `.gitignore` 가 `node_modules/`·`dist/` 두 줄뿐이라
 * 트리에 남아 있고, 재귀로 들어가면 239개 파일을 통째로 훑는다.
 */
const SKIP_DIRS = new Set(['node_modules', 'dist', 'storybook-static']);

/**
 * **기록 문서 allowlist — 한 항뿐이다.** `WAVE0_REPORT.md` 가 정확한 경로 항목으로 있었지만 KAN-048 에서
 * 그 문서를 `packages/core/COMPONENT_CATALOG.md` 로 흡수하며(게이트 명령 줄은 옮기지 않았다) 함께 뺐다.
 *
 * 실제로 발화하지 않는 항목을 적어 두면 다음 사람이 "여기 걸리니까 allowlist 에 있겠지"라고 잘못
 * 읽는다. 아래 문서들은 allowlist 에 **없지만** 위반이 될 수 없어서 없는 것이다(실측 확인):
 * `ORDER.md`(`` `pnpm typecheck`/`build`/`test` `` 백틱 표기) · `packages/visualization/PLAN.md`
 * (`pnpm --filter @centurio1987/diagram test`) · `METADATA_COVERAGE_AUDIT.md`(`test:unit` 만) ·
 * `packages/core/COMPONENT_CATALOG.md`(`pnpm` 0회). `KANBAN/`·`.kanban/`·`.changeset/` 은 애초에
 * 스캔 범위 밖이다.
 */
const ALLOWLIST = [
  // changesets 생성물. 수기 편집 금지 — 지금은 `pnpm` 0회지만 changeset 본문에 게이트 목록을
  // 붙이는 습관이 있어, 언젠가 릴리스 도중에 red 가 될 자리다.
  '**/CHANGELOG.md',
];

/** repo 상대경로(슬래시)로 정규화. */
function rel(abs: string): string {
  return relative(repoRoot, abs).split('\\').join('/');
}

/** dir 바로 아래의 `*.md` 만(비재귀). */
function mdFilesShallow(absDir: string): string[] {
  if (!existsSync(absDir)) return [];
  return readdirSync(absDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => rel(join(absDir, e.name)));
}

/** dir 하위 전체의 `*.md`(재귀, SKIP_DIRS 제외). */
function mdFilesDeep(absDir: string, acc: string[] = []): string[] {
  if (!existsSync(absDir)) return acc;
  for (const e of readdirSync(absDir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const abs = join(absDir, e.name);
    if (e.isDirectory()) mdFilesDeep(abs, acc);
    else if (e.name.endsWith('.md')) acc.push(rel(abs));
  }
  return acc;
}

/**
 * 스캔 범위 — 루트 `*.md`(비재귀) · `_templates/*.md` · `packages/**\/*.md` ·
 * `apps/*\/*.md`(비재귀) · `.claude/settings.json`.
 *
 * `apps` 를 비재귀로 좁힌 이유는 SKIP_DIRS 주석에 있다. `.claude/settings.json` 이 끼어 있는 이유는
 * 그 훅 메시지가 사람이 읽는 문서가 아니라 **에이전트에게 주입되는 지시문**이라 문서보다 영향이
 * 직접적이기 때문이다 — 불변식은 문자열 단위라 JSON 에도 그대로 적용된다.
 */
function collectDocs(): GateDocInput[] {
  const paths = [
    ...mdFilesShallow(repoRoot),
    ...mdFilesShallow(join(repoRoot, '_templates')),
    ...mdFilesDeep(join(repoRoot, 'packages')),
    ...readdirSync(join(repoRoot, 'apps'), { withFileTypes: true })
      .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name))
      .flatMap((e) => mdFilesShallow(join(repoRoot, 'apps', e.name))),
  ];
  const settings = join(repoRoot, '.claude', 'settings.json');
  if (existsSync(settings)) paths.push(rel(settings));

  return paths.map((p) => ({ path: p, text: readFileSync(join(repoRoot, p), 'utf8') }));
}

describe('게이트 목록 드리프트 — 실제 repo', () => {
  const docs = collectDocs();

  it('스캔이 실제로 문서를 집는다(범위가 조용히 비지 않았다)', () => {
    const paths = docs.map((d) => d.path);
    // 이 넷이 빠지면 위반 0이 "통과"가 아니라 "아무것도 안 봤다"는 뜻이 된다.
    expect(paths).toContain('CLAUDE.md');
    expect(paths).toContain('QUALITY_CHECKLIST.md');
    expect(paths).toContain('_templates/CHECKLIST_INSTANCE.template.md');
    expect(paths).toContain('.claude/settings.json');
    expect(paths.length).toBeGreaterThan(20);
  });

  it('게이트 목록에 pnpm test:unit 이 빠진 자리가 없다', () => {
    const violations = auditGateDocs(docs, ALLOWLIST);
    expect(violations.map(formatViolation)).toEqual([]);
  });
});

describe('auditGateDocs — fixture 실패주입(순수 검증기)', () => {
  const four = [
    '```bash',
    'pnpm typecheck',
    'pnpm build',
    'pnpm test',
    'pnpm --filter storybook build',
    '```',
  ].join('\n');
  const five = four.replace(
    'pnpm --filter storybook build',
    'pnpm --filter storybook build\npnpm test:unit',
  );

  it('넷만 적은 게이트 목록 → 위반', () => {
    const v = auditGateDocs([{ path: 'DOC.md', text: four }]);
    expect(v).toHaveLength(1);
    expect(v[0]!.startLine).toBe(2);
    expect(v[0]!.endLine).toBe(5);
  });

  it('다섯을 적으면 통과', () => {
    expect(auditGateDocs([{ path: 'DOC.md', text: five }])).toEqual([]);
  });

  it('allowlist 에 든 문서는 넷이어도 통과', () => {
    // 정확한 경로 형태는 실제 allowlist 에 지금 항목이 없어 가상 경로로 시험한다.
    expect(auditGateDocs([{ path: 'RECORD.md', text: four }], ['RECORD.md'])).toEqual([]);
    expect(auditGateDocs([{ path: 'packages/x/CHANGELOG.md', text: four }], ALLOWLIST)).toEqual([]);
  });

  it('&& 로 한 줄에 이어 쓴 형태도 잡는다', () => {
    const one = '   `pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build`.';
    expect(auditGateDocs([{ path: 'DOC.md', text: one }])).toHaveLength(1);
    expect(auditGateDocs([{ path: 'DOC.md', text: `${one.slice(0, -2)} && pnpm test:unit\`.` }])).toEqual(
      [],
    );
  });

  it('pnpm test:watch 는 pnpm test 로 안 세어진다(트리거 오작동 방지)', () => {
    const watchOnly = 'pnpm typecheck\npnpm test:watch';
    expect(auditGateDocs([{ path: 'DOC.md', text: watchOnly }])).toEqual([]);
  });

  it('pnpm test:unit 만 있고 pnpm test 가 없으면 애초에 대상이 아니다', () => {
    expect(auditGateDocs([{ path: 'DOC.md', text: 'pnpm typecheck\npnpm test:unit' }])).toEqual([]);
  });

  it('typecheck 없는 부분집합(스토리 전용 게이트)은 대상이 아니다', () => {
    const subset = 'pnpm test\npnpm --filter storybook build';
    expect(auditGateDocs([{ path: 'DOC.md', text: subset }])).toEqual([]);
  });

  it('test 없는 빠른 시작 블록도 대상이 아니다', () => {
    const quickstart = 'pnpm install\npnpm dev\npnpm build\npnpm typecheck';
    expect(auditGateDocs([{ path: 'DOC.md', text: quickstart }])).toEqual([]);
  });

  it('글롭만 적은 권한 목록은 애초에 트리거가 아니다', () => {
    const perms = [
      '      "Bash(pnpm typecheck*)",',
      '      "Bash(pnpm build*)",',
      '      "Bash(pnpm test*)",',
    ].join('\n');
    expect(auditGateDocs([{ path: '.claude/settings.json', text: perms }])).toEqual([]);
  });

  // ── 통과 구멍 차단(검토 1번: "편법으로 통과하게 두지 말아라") ──

  it('글롭 pnpm test* 로는 요구를 못 채운다 — 게이트 목록에 적어도 여전히 위반', () => {
    const glob = 'pnpm typecheck\npnpm build\npnpm test\npnpm test*';
    expect(auditGateDocs([{ path: 'DOC.md', text: glob }])).toHaveLength(1);
  });

  it('코드펜스 안에서 빈 줄로 목록을 쪼개도 한 덩이다 — 분할 회피 차단', () => {
    const split = ['```bash', 'pnpm typecheck', 'pnpm build', '', 'pnpm test', '```'].join('\n');
    expect(auditGateDocs([{ path: 'DOC.md', text: split }])).toHaveLength(1);
    // 쪼갠 채 다섯째를 넣으면 통과한다 — 막는 것은 분할 자체가 아니라 누락이다.
    const splitOk = split.replace('pnpm test\n', 'pnpm test\n\npnpm test:unit\n');
    expect(auditGateDocs([{ path: 'DOC.md', text: splitOk }])).toEqual([]);
  });

  it('펜스 안 덩이가 펜스 밖으로 새지 않는다', () => {
    const text = ['pnpm typecheck', '```bash', 'pnpm test', '```'].join('\n');
    expect(findCommandGroups(text)).toHaveLength(2);
    expect(auditGateDocs([{ path: 'DOC.md', text }])).toEqual([]);
  });

  it('한 문서의 게이트 목록 둘이 각각 세어진다', () => {
    expect(auditGateDocs([{ path: 'DOC.md', text: `${four}\n\n산문\n\n${four}` }])).toHaveLength(2);
  });
});

describe('findCommandGroups — 「한 덩이」 경계', () => {
  it('pnpm 없는 줄이 덩이를 끊는다 — 산문 블록이 통째로 한 덩이가 되지 않는다', () => {
    // 이 규칙이 없으면 같은 산문 블록 어딘가의 `pnpm test:unit` 한 번이
    // 아래 4게이트 목록을 통과시킨다(viz-style-expansion.md 가 실제로 그럴 뻔했다).
    const prose = [
      '5. 매니페스트 재생성: `pnpm test:unit` 의 바이트 동기 테스트가 잡는다.',
      '   그 게이트는 커밋본과 재생성본을 대조한다.',
      '7. 4 품질 게이트: `pnpm typecheck` / `pnpm build` / `pnpm test` / `pnpm --filter storybook build`.',
    ].join('\n');
    const groups = findCommandGroups(prose);
    expect(groups).toHaveLength(2);
    expect(auditGateDocs([{ path: 'DOC.md', text: prose }])).toHaveLength(1);
  });

  it('빈 줄과 코드펜스가 덩이를 끊는다', () => {
    const text = 'pnpm typecheck\n\npnpm test';
    expect(findCommandGroups(text)).toHaveLength(2);
    expect(auditGateDocs([{ path: 'DOC.md', text }])).toEqual([]);
  });

  it('줄 번호는 1-indexed 이고 덩이의 처음과 끝을 가리킨다', () => {
    const groups = findCommandGroups('산문\npnpm a\npnpm b\n산문');
    expect(groups).toEqual([{ startLine: 2, endLine: 3, lines: ['pnpm a', 'pnpm b'] }]);
  });
});
