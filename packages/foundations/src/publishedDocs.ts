/**
 * publishedDocs — **배포 문서 게이트** 순수 검증기 (KAN-067).
 *
 * 앱을 만드는 에이전트는 저장소가 아니라 `node_modules` 에 풀린 배포물을 읽는다. 그 자리에서 두 가지가
 * 결론을 비틀었다(2026-10-09 진단). 하나, 배포 README 가 「목록에서 고르는 법」만 알려 주고 「목록에 없을
 * 때」의 길을 적지 않아, 원하는 컴포넌트가 없으면 라이브러리를 떠나거나 개선 요청으로 결론이 났다. 둘,
 * `files` 로 함께 실린 저장소 관리 문서(`visualization-type-inventory.md` §10 「문맥 없는 에이전트의
 * 이어받기」)가 「갭이 보이면 백로그에 행을 추가하라」고 지시해, 앱 에이전트가 그것을 라이브러리에 요청하라는
 * 말로 읽을 수 있었다.
 *
 * **불변식 넷.**
 *  1) 공개 패키지의 `files` 에는 `README.md` 말고 마크다운이 없다 — 배포물에 실리는 사람용 문서는 README
 *     하나다. 설계·인벤토리·전략 문서는 저장소에 두고 README 가 링크로 가리킨다.
 *  2) 배포 README 가 가리키는 `.md` 는 배포물 안에서 열린다 — 상대 링크든 코드 표기(`foo.md`)든 배포물에
 *     없는 파일을 가리키면 안 된다. 저장소에만 있는 문서는 절대 URL 링크로 건다.
 *  3) `EXTEND_SECTION_RULES` 의 패키지 README 에는 「원하는 것이 없을 때」 절(h2)이 있다.
 *  4) 그 절에는 예제 파일과 글자 그대로 같은 `tsx` 코드 블록이 있다. 예제 파일은 Storybook 스토리가 실제로
 *     그려 보므로(`apps/storybook/src/stories/ExtendWhenMissing.stories.tsx`), README 에서만 고쳐진 예제가
 *     깨진 채 배포되는 일을 막는다.
 *
 * **커버리지 한계.** `files` 의 디렉터리 항목(`dist`·`manifest` 등) 안에 든 마크다운은 보지 않는다 —
 * 빌드 산출물을 검사하려면 build 를 먼저 돌려야 하고, 그러면 이 게이트가 `test:unit` 의 순서 조건을 하나
 * 더 갖는다. 절의 **내용**(순서 넷이 다 적혔는가)도 보지 않는다. 그것은 검토가 진다.
 *
 * `auditPublishedDocs` 는 fs 에 의존하지 않는 **순수 함수**라 실패 주입 단위 테스트가 된다
 * (`publishedDocs.test.ts`). `gateDocs.ts` 와 같은 자리·같은 이유로 여기 있다 — 물리적으로 foundations
 * 지만 저장소 전역 게이트이고, `test:unit` 의 `pnpm -r` 이 전 패키지를 항상 돌린다. 배포물에는 안 실린다
 * (`files` 가 `src` 를 제외하고 배럴에도 넣지 않는다).
 */

/** 공개 패키지 하나. `dir` 은 repo 상대경로(슬래시), `files` 는 `package.json` 의 값 그대로. */
export interface PublishedPackage {
  readonly name: string;
  readonly dir: string;
  readonly files: readonly string[];
  /** `README.md` 원문. 없으면 null. */
  readonly readme: string | null;
}

/** 「원하는 것이 없을 때」 절을 요구하는 패키지와 그 절이 실어야 할 예제. */
export interface ExtendSectionRule {
  /** 패키지 `dir`(repo 상대). */
  readonly dir: string;
  /** 예제 파일의 repo 상대경로. */
  readonly examplePath: string;
}

export type PublishedDocViolation =
  | { readonly kind: 'md-in-files'; readonly pkg: string; readonly entry: string }
  | { readonly kind: 'dead-link'; readonly pkg: string; readonly line: number; readonly target: string }
  | { readonly kind: 'dead-mention'; readonly pkg: string; readonly line: number; readonly name: string }
  | { readonly kind: 'missing-section'; readonly pkg: string }
  | { readonly kind: 'example-missing'; readonly pkg: string; readonly example: string }
  | { readonly kind: 'example-drift'; readonly pkg: string; readonly example: string };

/** 절 제목. README 와 이 상수가 한 글자도 다르면 안 된다. */
export const EXTEND_SECTION_TITLE = '원하는 것이 없을 때';

/**
 * 절을 요구하는 패키지. 컴포넌트를 고르는 패키지 둘이다 — core(UI 컴포넌트)와 visualization(다이어그램·
 * 인포그래픽 유형). 룩(style guide)·foundation 카탈로그는 「직접 만들어 등재한다」 길이 루트 README
 * 사례 6·9 에 이미 있고, tokens·hooks 는 그 자체가 확장 재료다.
 */
export const EXTEND_SECTION_RULES: readonly ExtendSectionRule[] = [
  { dir: 'packages/core', examplePath: 'apps/storybook/src/stories/_readmeExamples/coreExtend.tsx' },
  { dir: 'packages/visualization', examplePath: 'apps/storybook/src/stories/_readmeExamples/vizCompose.tsx' },
];

/** npm 이 `files` 와 무관하게 언제나 싣는 파일. CHANGELOG 는 여기 없다 — 실리는지 확인하지 않았다. */
const ALWAYS_SHIPPED = new Set(['README.md', 'package.json']);

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const LINK = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
/** 경로처럼 생긴 `.md` 이름. 앞이 경로 문자면 더 긴 이름의 일부라 건너뛴다. */
const MD_NAME = /(?<![\w./-])((?:\.{1,2}\/)?[\w-][\w./-]*\.md)(?![\w])/g;

/** posix 경로 정규화 — `./`·`..` 를 푼다. 패키지 밖으로 나가면 null. */
function normalize(rel: string): string | null {
  const out: string[] = [];
  for (const part of rel.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (out.length === 0) return null;
      out.pop();
      continue;
    }
    out.push(part);
  }
  return out.join('/');
}

/** 패키지 루트 기준 경로가 배포물에 실리는가. */
export function isShipped(pkg: Pick<PublishedPackage, 'files'>, rel: string): boolean {
  const p = normalize(rel);
  if (p === null || p === '') return false;
  if (ALWAYS_SHIPPED.has(p)) return true;
  return pkg.files.some((f) => {
    const e = normalize(f);
    if (e === null || e === '') return false;
    return p === e || p.startsWith(`${e}/`);
  });
}

/** 코드펜스 안의 줄을 빈 줄로 바꾼다. 줄 번호는 그대로 둔다. */
function blankFences(lines: readonly string[]): string[] {
  let inFence = false;
  return lines.map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return '';
    }
    return inFence ? '' : line;
  });
}

function auditReadmeRefs(pkg: PublishedPackage, out: PublishedDocViolation[]): void {
  if (pkg.readme === null) return;
  const lines = blankFences(pkg.readme.split(/\r?\n/));
  lines.forEach((line, i) => {
    const lineNo = i + 1;
    for (const m of line.matchAll(LINK)) {
      const target = m[2]!;
      if (SCHEME.test(target) || target.startsWith('#')) continue;
      const path = target.split('#')[0]!;
      if (!isShipped(pkg, path)) out.push({ kind: 'dead-link', pkg: pkg.name, line: lineNo, target });
    }
    // 링크는 위에서 다 봤다. 링크 글자(`[`foo.md`](https://…)`)를 코드 표기로 다시 세지 않게 지운다.
    const rest = line.replace(LINK, ' ');
    for (const m of rest.matchAll(MD_NAME)) {
      const name = m[1]!;
      const base = name.split('/').pop()!;
      if (base === 'README.md') continue;
      if (!isShipped(pkg, name)) out.push({ kind: 'dead-mention', pkg: pkg.name, line: lineNo, name });
    }
  });
}

/** h2 `## <title>` 절의 본문. 다음 h2 앞까지(h3 이하는 안에 든다). 없으면 null. */
export function sectionBody(readme: string, title: string): string | null {
  const lines = readme.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === `## ${title}`);
  if (start < 0) return null;
  let inFence = false;
  const body: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence && /^##\s/.test(line)) break;
    body.push(line);
  }
  return body.join('\n');
}

/** 절 안의 ```tsx 블록 본문들. */
export function tsxBlocks(body: string): string[] {
  const blocks: string[] = [];
  let cur: string[] | null = null;
  for (const line of body.split('\n')) {
    if (cur === null) {
      if (/^```tsx\s*$/.test(line)) cur = [];
    } else if (/^```\s*$/.test(line)) {
      blocks.push(cur.join('\n'));
      cur = null;
    } else {
      cur.push(line);
    }
  }
  return blocks;
}

function sameCode(a: string, b: string): boolean {
  const norm = (s: string) => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');
  return norm(a) === norm(b);
}

/**
 * 공개 패키지 목록과 절 규칙, 예제 원문(`examplePath` → 원문, 없으면 빠진다)을 받아 위반을 낸다.
 * 패키지 순서 · README 줄 순서를 그대로 따르므로 결과가 결정적이다.
 */
export function auditPublishedDocs(
  packages: readonly PublishedPackage[],
  rules: readonly ExtendSectionRule[],
  examples: Readonly<Record<string, string>>,
): PublishedDocViolation[] {
  const out: PublishedDocViolation[] = [];
  for (const pkg of packages) {
    for (const entry of pkg.files) {
      const base = entry.split('/').pop() ?? entry;
      if (/\.md$/i.test(base) && base !== 'README.md') out.push({ kind: 'md-in-files', pkg: pkg.name, entry });
    }
    auditReadmeRefs(pkg, out);
  }
  for (const rule of rules) {
    const pkg = packages.find((p) => p.dir === rule.dir);
    const name = pkg?.name ?? rule.dir;
    const body = pkg?.readme ? sectionBody(pkg.readme, EXTEND_SECTION_TITLE) : null;
    if (body === null) {
      out.push({ kind: 'missing-section', pkg: name });
      continue;
    }
    const example = examples[rule.examplePath];
    const blocks = tsxBlocks(body);
    if (example === undefined || blocks.length === 0) {
      out.push({ kind: 'example-missing', pkg: name, example: rule.examplePath });
    } else if (!blocks.some((b) => sameCode(b, example))) {
      out.push({ kind: 'example-drift', pkg: name, example: rule.examplePath });
    }
  }
  return out;
}

export function formatPublishedDocViolation(v: PublishedDocViolation): string {
  switch (v.kind) {
    case 'md-in-files':
      return `${v.pkg}: files 에 README.md 말고 마크다운이 있다 — "${v.entry}". 저장소 문서는 README 에서 절대 URL 로 가리킨다`;
    case 'dead-link':
      return `${v.pkg} README.md:${v.line}: 배포물에 없는 파일로 가는 상대 링크 — ${v.target}`;
    case 'dead-mention':
      return `${v.pkg} README.md:${v.line}: 배포물에 없는 문서를 가리킨다 — ${v.name}. 저장소 문서면 절대 URL 링크로 건다`;
    case 'missing-section':
      return `${v.pkg} README.md: 「## ${EXTEND_SECTION_TITLE}」 절이 없다`;
    case 'example-missing':
      return `${v.pkg} README.md: 「${EXTEND_SECTION_TITLE}」 절에 tsx 예제가 없다(또는 예제 파일 ${v.example} 이 없다)`;
    case 'example-drift':
      return `${v.pkg} README.md: 「${EXTEND_SECTION_TITLE}」 절의 tsx 예제가 ${v.example} 와 다르다. 예제 파일을 고치고 README 에 그대로 옮긴다`;
  }
}
