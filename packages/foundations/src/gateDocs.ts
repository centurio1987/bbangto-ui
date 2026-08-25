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
 * 「한 덩이」의 규칙은 자리마다 다르고, 그 이유는 **통과 구멍이 자리마다 반대 방향으로 열리기**
 * 때문이다. 코드펜스 안에서는 펜스 하나가 통째로 한 덩이다(빈 줄 하나로 목록을 쪼개 빠져나가지
 * 못하게). 펜스 밖에서는 `pnpm` 을 포함한 줄이 **서로 인접**해 이어진 것만 한 덩이다(같은 문단
 * 어딘가의 `test:unit` 한 번이 그 문단의 4게이트 목록을 통과시키지 못하게 —
 * `viz-style-expansion.md` 가 실제로 그럴 뻔했다). 자세한 것은 `findCommandGroups` 주석에 있다.
 *
 * **요구를 채우는 표기는 리터럴 `pnpm test:unit` 하나뿐이다.** 글롭(`pnpm test*`)으로 때울 수 없고,
 * 글롭은 트리거에서도 빠진다 — 권한 패턴을 특례로 통과시키려다 문서 쪽 통과 구멍을 함께 여는 것보다
 * 트리거를 좁히는 쪽이 낫다.
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

/**
 * 게이트 목록임을 알리는 트리거 둘. 이 둘이 한 덩이에 함께 있어야 검사 대상이 된다.
 *
 * 뒤따르는 `*` 를 배제하는 이유는 **글롭이 통과 구멍이 되지 않게** 하기 위해서다.
 * `.claude/settings.json` 의 permissions 는 `Bash(pnpm typecheck*)`·`Bash(pnpm test*)` 처럼
 * 글롭으로 적히는데, 그것은 게이트 목록이 아니라 권한 패턴이라 애초에 트리거가 아니다. 그 블록을
 * 「글롭이 요구를 만족시킨다」로 통과시키면 **문서에 `pnpm test*` 라고만 써도 게이트를 지나가는 길**이
 * 함께 열린다 — 트리거에서 빼는 쪽이 만족 조건을 느슨하게 푸는 것보다 좁다.
 */
const TYPECHECK_RE = /\bpnpm typecheck\b(?!\*)/;
/** `pnpm test:unit`·`pnpm test:watch`(콜론)와 `pnpm test*`(글롭)를 삼키지 않는다. */
const TEST_RE = /\bpnpm test\b(?![:*])/;
/** 요구를 채우는 표기는 **리터럴 `pnpm test:unit` 하나뿐**이다. 글롭으로 때울 수 없다. */
const SATISFIED_RE = /\bpnpm test:unit\b/;

/** 이 줄이 명령 덩이에 속하는가. */
function carriesPnpm(line: string): boolean {
  return line.includes('pnpm');
}

/** 코드펜스 열고 닫는 줄(``` 또는 ~~~, 들여쓰기 허용). */
const FENCE_RE = /^\s*(?:```|~~~)/;

// allowlist 항목 하나와 repo 상대경로를 대조한다. 지원하는 형태는 둘 —
// 정확한 경로(`WAVE0_REPORT.md`)와 별별-슬래시 접두 basename(`**/CHANGELOG.md`).
function matchesAllow(relPath: string, pattern: string): boolean {
  if (pattern.startsWith('**/')) {
    const base = pattern.slice(3);
    return relPath === base || relPath.endsWith(`/${base}`);
  }
  return relPath === pattern;
}

/**
 * 문서 하나를 명령 덩이로 쪼갠다. 노출하는 이유는 테스트가 경계 규칙을 직접 겨냥하기 위해서다.
 *
 * 규칙이 자리마다 다른 이유는 **양쪽 통과 구멍을 다 막기** 위해서다.
 *
 * - **코드펜스 안 = 펜스 하나가 한 덩이.** 인접만 보면 게이트 목록 사이에 빈 줄 하나를 넣어
 *   두 덩이로 쪼개는 것만으로 검사를 지나갈 수 있다. 같은 펜스 안에 있으면 그것은 한 목록이다.
 * - **펜스 밖 = 인접한 `pnpm` 줄.** 산문에서는 반대 구멍이 열린다 — 블록 전체를 한 덩이로 보면
 *   같은 문단 어딘가의 `test:unit` 한 번이 그 문단의 4게이트 목록을 통과시킨다
 *   (`packages/visualization/viz-style-expansion.md:235` 가 실제로 그럴 뻔했다).
 */
export function findCommandGroups(
  text: string,
): { startLine: number; endLine: number; lines: string[] }[] {
  const out: { startLine: number; endLine: number; lines: string[] }[] = [];
  const lines = text.split('\n');
  let cur: { startLine: number; endLine: number; lines: string[] } | null = null;
  let inFence = false;

  const flush = (): void => {
    if (cur) out.push(cur);
    cur = null;
  };
  const take = (line: string, i: number): void => {
    if (cur) {
      cur.endLine = i + 1;
      cur.lines.push(line);
    } else {
      cur = { startLine: i + 1, endLine: i + 1, lines: [line] };
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    if (FENCE_RE.test(line)) {
      // 펜스 경계에서 항상 끊는다 — 펜스 안 덩이가 밖으로 새거나 그 반대가 되지 않게.
      flush();
      inFence = !inFence;
      continue;
    }
    if (carriesPnpm(line)) take(line, i);
    else if (!inFence) flush(); // 펜스 안에서는 pnpm 없는 줄이 덩이를 끊지 않는다.
  }
  flush();
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
