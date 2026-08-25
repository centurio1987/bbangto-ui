/**
 * gateDocs — **품질 게이트 목록 드리프트 게이트** 순수 검증기 (KAN-046).
 *
 * 루트 `package.json` 의 게이트 명령은 둘로 갈라져 있다 — `test` 는 `pnpm --filter storybook test` 라
 * storybook 패키지만 돌고, **패키지 vitest 는 `test:unit` 에서만 돈다**(매니페스트 바이트 동기·대비
 * over-claim·명명 규칙·커버리지 census 가 전부 그쪽이다). 그래서 게이트를 넷으로 적은 문서를 보고
 * 올리면 넷이 전부 초록인 채로 통과하고, 다른 사람이 `test:unit` 에서 처음 발견하게 된다. 실제로
 * 규범 문서 8곳과 에이전트 훅 1곳이 그 상태였다.
 *
 * **불변식**: `pnpm typecheck` 와 `pnpm test` 를 한 덩이에 함께 적은 명령 목록은 `pnpm test:unit` 도
 * 적어야 한다.
 *
 * 「한 덩이」 = `pnpm` 을 포함한 줄이 **서로 인접**해 이어진 그룹. 경계는 셋 — 빈 줄, 코드펜스, 그리고
 * `pnpm` 이 없는 줄. 산문 블록 전체를 한 덩이로 보면 같은 블록 어딘가에 `test:unit` 이 한 번 언급되기만
 * 해도 그 블록의 4게이트 목록이 통과하므로(`viz-style-expansion.md` 가 실제로 그럴 뻔했다) 인접으로
 * 좁혔다.
 *
 * **커버리지 한계 — 이 게이트가 잡는 것은 리터럴 `pnpm typecheck` + `pnpm test` 동거 한 가지 표기다.**
 * `pnpm --filter … test`, `pnpm typecheck/build/test`, `` `pnpm typecheck`/`build`/`test` `` 는 안 잡힌다.
 * 트리거를 넓히면 기록 문서가 대량으로 걸려 allowlist 가 부풀고, 그러면 allowlist 자체가 신호를 죽인다.
 * 전수를 보장하지 않는다는 사실을 여기 적어 두는 것이 넓히는 것보다 낫다.
 *
 * `auditGateDocs` 는 fs·import 에 의존하지 않는 **순수 함수**라 fixture 주입 단위 테스트가 가능하다
 * (`gateDocs.test.ts` 가 "넷만 적은 문서 → 위반"을 자동·영속 검증한다). `metadataCoverage.ts` 와 같은
 * 자리에 있고 같은 이유로 여기 있다 — 물리적으로 foundations 지만 **저장소 전역 거버넌스 게이트**이고,
 * `test:unit` 의 `pnpm -r` 이 전 패키지를 항상 실행하므로 필터 누락이 없다.
 *
 * 배포물에는 안 실린다 — `package.json` 의 `files` 가 `src` 를 통째로 제외하고, 배럴(`src/index.ts`)과
 * tsup 엔트리 어디에도 넣지 않는다.
 */

/** 검사 대상 문서 1건. `path` 는 repo 상대경로(슬래시). */
export interface GateDocInput {
  readonly path: string;
  readonly text: string;
}

/** 게이트 목록인데 `test:unit` 이 빠진 명령 덩이 1건. */
export interface GateViolation {
  readonly path: string;
  /** 1-indexed. 덩이의 첫 줄. */
  readonly startLine: number;
  /** 1-indexed. 덩이의 마지막 줄. */
  readonly endLine: number;
  /** 사람이 읽을 덩이 원문(줄바꿈 유지). */
  readonly excerpt: string;
}

/** 게이트 목록임을 알리는 트리거 둘. 이 둘이 한 덩이에 함께 있어야 검사 대상이 된다. */
const TYPECHECK_RE = /\bpnpm typecheck\b/;
/** `pnpm test:unit`·`pnpm test:watch` 를 삼키지 않도록 뒤의 콜론을 배제한다. */
const TEST_RE = /\bpnpm test\b(?!:)/;
/**
 * 요구를 채우는 표기 둘. 리터럴 `pnpm test:unit`, 그리고 그것을 포함하는 글롭 `pnpm test*`
 * (`.claude/settings.json` 의 permissions `Bash(pnpm test*)` 가 실제로 `test:unit` 을 허용한다 —
 * 게이트 목록이 아닌 그 블록을 특례로 빼지 않고 규칙 안에서 통과시키기 위한 것이다).
 */
const SATISFIED_RE = /\bpnpm test(?::unit\b|\*)/;

/** 이 줄이 명령 덩이에 속하는가. */
function carriesPnpm(line: string): boolean {
  return line.includes('pnpm');
}

// allowlist 항목 하나와 repo 상대경로를 대조한다. 지원하는 형태는 둘 —
// 정확한 경로(`WAVE0_REPORT.md`)와 별별-슬래시 접두 basename(`**/CHANGELOG.md`).
function matchesAllow(relPath: string, pattern: string): boolean {
  if (pattern.startsWith('**/')) {
    const base = pattern.slice(3);
    return relPath === base || relPath.endsWith(`/${base}`);
  }
  return relPath === pattern;
}

/** 문서 하나를 인접 `pnpm` 줄 덩이로 쪼갠다. 노출하는 이유는 테스트가 경계 규칙을 직접 겨냥하기 위해서다. */
export function findCommandGroups(
  text: string,
): { startLine: number; endLine: number; lines: string[] }[] {
  const out: { startLine: number; endLine: number; lines: string[] }[] = [];
  const lines = text.split('\n');
  let cur: { startLine: number; endLine: number; lines: string[] } | null = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    if (carriesPnpm(line)) {
      if (cur) {
        cur.endLine = i + 1;
        cur.lines.push(line);
      } else {
        cur = { startLine: i + 1, endLine: i + 1, lines: [line] };
      }
    } else if (cur) {
      out.push(cur);
      cur = null;
    }
  }
  if (cur) out.push(cur);
  return out;
}

/**
 * 문서 목록을 훑어 **위반 목록**을 반환한다(빈 배열 = 통과). fs·import 없음 → 순수.
 * `allowlist` 는 repo 상대경로 또는 `**\/<basename>`.
 */
export function auditGateDocs(
  docs: readonly GateDocInput[],
  allowlist: readonly string[] = [],
): GateViolation[] {
  const violations: GateViolation[] = [];
  for (const doc of docs) {
    if (allowlist.some((p) => matchesAllow(doc.path, p))) continue;
    for (const g of findCommandGroups(doc.text)) {
      const joined = g.lines.join('\n');
      if (!TYPECHECK_RE.test(joined) || !TEST_RE.test(joined)) continue;
      if (SATISFIED_RE.test(joined)) continue;
      violations.push({
        path: doc.path,
        startLine: g.startLine,
        endLine: g.endLine,
        excerpt: joined,
      });
    }
  }
  return violations;
}

/** 위반 하나를 한 줄로 — 테스트 실패 메시지가 어느 자리인지 바로 말하게 한다. */
export function formatViolation(v: GateViolation): string {
  const where = v.startLine === v.endLine ? `${v.startLine}` : `${v.startLine}-${v.endLine}`;
  return `${v.path}:${where} — 게이트 목록에 \`pnpm test:unit\` 이 없습니다`;
}
