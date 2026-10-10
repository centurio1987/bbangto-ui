/**
 * workspaceSource — **소스 조건 누락 게이트** 순수 검증기 (KAN-066).
 *
 * 패키지끼리 서로를 찾을 때 개발 도구(typecheck · test:unit · 매니페스트 생성기)는 dist 가 아니라 소스를 본다.
 * 장치는 exports 의 개발용 조건 하나다 — 진입점마다 `"bbangto-source": "./src/…ts"` 를 두고, 그 이름은 루트
 * `tsconfig.json` 의 `customConditions` 와 vitest 의 `resolve.conditions` 와 생성기의 tsx `--conditions` 만
 * 켠다. Storybook·tsup 안의 esbuild·쓰는 쪽 번들러는 이 이름을 모르므로 지금처럼 dist 를 읽는다.
 *
 * 이 게이트가 없을 때의 실패는 늦게 드러난다. 새 서브패스를 더하면서 조건을 빠뜨리면 그 진입점만 다시 dist 를
 * 찾는데, 작업하던 워크트리에는 dist 가 이미 있어서 아무 일도 없다가 새 워크트리의 첫 typecheck 에서 TS2307 로
 * 터진다(카드가 풀려던 바로 그 증상이다).
 *
 * **불변식 셋.** 대상은 exports 진입점 가운데 JS 를 내보내는 것(`import` 가 `.js`)이다. JSON·manifest 진입점은
 * 소스가 곧 배포물이라 대상이 아니다.
 *  1) 조건이 있다.
 *  2) 조건이 **맨 앞**이다. 조건은 적힌 순서대로 맞춰 보므로 `types` 뒤에 있으면 typecheck 가 dist 의 `.d.ts`
 *     를 먼저 집는다.
 *  3) 조건 값이 그 진입점의 dist 경로와 짝을 이루는 소스 파일이다 — `./dist/<경로>.js` 의 짝은
 *     `./src/<경로>.ts` 또는 `.tsx` 이고, 그 파일이 실제로 있다.
 *
 * **커버리지 한계.** 조건 이름을 켜는 쪽(tsconfig · vitest 설정 · 생성기 스크립트)이 제대로 켰는지는 여기서
 * 보지 않는다. 그것은 `workspaceSource.test.ts` 의 실제 저장소 검사가 따로 본다.
 *
 * `auditWorkspaceSource` 는 fs 에 의존하지 않는 **순수 함수**라 실패 주입 단위 테스트가 된다. `publishedDocs.ts`
 * 와 같은 자리·같은 이유로 여기 있다 — 물리적으로 foundations 지만 저장소 전역 게이트이고, 배포물에는 안 실린다.
 */

/** 개발용 조건 이름. package.json · tsconfig · vitest 설정 · 생성기 스크립트가 이 글자 그대로 쓴다. */
export const SOURCE_CONDITION = 'bbangto-source';

/** 워크스페이스 패키지 하나. `dir` 은 repo 상대경로(슬래시), `exports` 는 `package.json` 의 값 그대로. */
export interface WorkspacePackage {
  readonly name: string;
  readonly dir: string;
  readonly exports: unknown;
}

export type WorkspaceSourceViolation =
  | { readonly kind: 'missing-condition'; readonly pkg: string; readonly entry: string }
  | { readonly kind: 'condition-not-first'; readonly pkg: string; readonly entry: string }
  | {
      readonly kind: 'source-mismatch';
      readonly pkg: string;
      readonly entry: string;
      readonly target: string;
      readonly expected: string;
    }
  | { readonly kind: 'missing-source'; readonly pkg: string; readonly entry: string; readonly target: string };

/** `./dist/<경로>.js` 의 짝이 되는 소스 후보. dist 경로가 아니면 빈 배열이다. */
export function sourceCandidates(distPath: string): string[] {
  const m = /^\.\/dist\/(.+)\.js$/.exec(distPath);
  if (!m) return [];
  return [`./src/${m[1]}.ts`, `./src/${m[1]}.tsx`];
}

/** 진입점 값에서 JS 대상 경로를 찾는다. JS 를 내보내지 않는 진입점이면 null. */
function jsTarget(value: unknown): string | null {
  if (typeof value === 'string') return value.endsWith('.js') ? value : null;
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    for (const key of ['import', 'default']) {
      const t = v[key];
      if (typeof t === 'string' && t.endsWith('.js')) return t;
    }
  }
  return null;
}

/**
 * 패키지마다 exports 진입점을 훑어 위반을 낸다. `exists` 는 repo 상대경로를 받아 파일이 있는지 답한다.
 * exports 가 객체가 아닌 패키지는 진입점이 없는 것으로 본다.
 */
export function auditWorkspaceSource(
  packages: readonly WorkspacePackage[],
  exists: (repoRel: string) => boolean,
): WorkspaceSourceViolation[] {
  const out: WorkspaceSourceViolation[] = [];
  for (const p of packages) {
    if (!p.exports || typeof p.exports !== 'object') continue;
    for (const [entry, value] of Object.entries(p.exports as Record<string, unknown>)) {
      const dist = jsTarget(value);
      if (dist === null) continue;
      const cond =
        value && typeof value === 'object' ? (value as Record<string, unknown>)[SOURCE_CONDITION] : undefined;
      if (typeof cond !== 'string') {
        out.push({ kind: 'missing-condition', pkg: p.name, entry });
        continue;
      }
      if (Object.keys(value as Record<string, unknown>)[0] !== SOURCE_CONDITION) {
        out.push({ kind: 'condition-not-first', pkg: p.name, entry });
      }
      const candidates = sourceCandidates(dist);
      if (!candidates.includes(cond)) {
        out.push({
          kind: 'source-mismatch',
          pkg: p.name,
          entry,
          target: cond,
          expected: candidates[0] ?? `(${dist} 는 ./dist/…js 가 아니라 짝을 정할 수 없습니다)`,
        });
        continue;
      }
      if (!exists(`${p.dir}/${cond.slice(2)}`)) {
        out.push({ kind: 'missing-source', pkg: p.name, entry, target: cond });
      }
    }
  }
  return out;
}

/** 위반 한 건을 사람이 읽는 한 줄로. */
export function formatWorkspaceSourceViolation(v: WorkspaceSourceViolation): string {
  const where = `${v.pkg} exports["${v.entry}"]`;
  switch (v.kind) {
    case 'missing-condition':
      return `${where}: "${SOURCE_CONDITION}" 조건이 없습니다 — 새 워크트리에서 이 진입점만 dist 를 찾아 TS2307 로 실패합니다`;
    case 'condition-not-first':
      return `${where}: "${SOURCE_CONDITION}" 조건이 맨 앞이 아닙니다 — 앞에 적힌 types·import 가 먼저 맞아 dist 를 읽습니다`;
    case 'source-mismatch':
      return `${where}: "${SOURCE_CONDITION}" 가 ${v.target} 를 가리킵니다 — dist 진입점의 짝은 ${v.expected} 입니다`;
    case 'missing-source':
      return `${where}: "${SOURCE_CONDITION}" 가 가리키는 ${v.target} 가 없습니다`;
  }
}
