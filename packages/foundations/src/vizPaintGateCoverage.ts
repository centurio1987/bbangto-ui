/**
 * vizPaintGateCoverage — **viz 템플릿 Paint Gate 표본 커버리지 게이트**의 순수 검증기 (KAN-063).
 *
 * Storybook `VISUALIZATION/Templates/Paint Gate`(`TemplatePaintGate.stories.tsx`)의 두 검사 — 리터럴 색 검사와
 * 글자 대비 검사 — 는 표본(fixture)이 있는 템플릿만 그린다. 표본이 없는 템플릿은 리터럴 색이 들어와도, 글자가 바탕에
 * 묻혀도 걸리지 않는다. 새 템플릿이 표본 없이 들어오는 것을 문서로 당부하는 대신 `test:unit` 에서 막는다.
 * 자리와 짜임은 `keyboardCoverage.ts` 를 따른다(이 파일 = fs 없는 순수 함수, `.test.ts` = 실제 저장소 + fixture).
 *
 * 검사:
 *  1) 누락 — `templates/index.ts` 가 내보내는 이름마다 `_paintGateFixtures.tsx` 에 표본이 있어야 한다.
 *  2) 중복 — 한 이름에 표본이 둘이면 위반. 어느 쪽이 그 템플릿의 표본인지 흐려진다.
 *  3) 없는 이름 — 표본이 적은 이름을 templates 가 내보내지 않으면 위반(이름을 바꾸거나 지운 뒤 남은 표본).
 *  4) 렌더 — 표본 블록 안에 그 이름의 JSX(`<이름`)가 있어야 한다. `fromMatrix(key, 이름)` 으로 가져온 표본은
 *     `_matrixFixtures.tsx` 에 그 key 가 있고 그 블록이 `<이름` 을 그려야 한다.
 *
 * 표본 파일의 형식: 표본 하나가 `fromMatrix('key', '이름')` 호출이거나 `template: '이름'` 을 가진 객체다.
 * 객체 표본의 블록은 그 `template:` 부터 다음 표본(다음 `template:` 이나 `fromMatrix(`)까지다.
 *
 * **커버리지 한계**: 정규식으로 읽으므로 이름을 변수에 담아 넘기면 못 본다. `<이름` 이 블록 안에 있는지만 보고
 * 그 JSX 가 실제로 render 가 돌려주는 값인지는 보지 않는다. 표본이 화면에 무언가를 그리는지는 Storybook 검사의
 * 「비교한 paint 수 > 0」·「잰 글자 수 > 0」이 진다.
 */

export const TEMPLATES_INDEX_PATH = 'packages/visualization/src/templates/index.ts';
export const PAINT_GATE_FIXTURES_PATH = 'apps/storybook/src/stories/visualization/_paintGateFixtures.tsx';
export const MATRIX_FIXTURES_PATH = 'apps/storybook/src/stories/visualization/_matrixFixtures.tsx';

/** 검사에 넘기는 저장소 상태(테스트가 fs 로 읽어 주입). 파일이 없으면 `undefined`. */
export interface PaintGateCoverageInput {
  readonly templatesIndex: string;
  readonly fixtures: string | undefined;
  readonly matrixFixtures: string | undefined;
}

/** `templates/index.ts` 가 내보내는 값 이름. `export type { … }` 과 `type X` 항목은 뺀다. 문서 순서. */
export function templateExports(indexSource: string): string[] {
  const names: string[] = [];
  for (const m of indexSource.matchAll(/export\s+(type\s+)?\{([^}]*)\}\s*from/g)) {
    if (m[1]) continue;
    for (const raw of m[2]!.split(',')) {
      const item = raw.trim();
      if (!item || /^type\s/.test(item)) continue;
      const alias = /\bas\s+(\w+)$/.exec(item);
      names.push(alias ? alias[1]! : item);
    }
  }
  return names;
}

interface FixtureEntry {
  readonly template: string;
  /** `fromMatrix` 로 가져온 표본이면 그 key. */
  readonly matrixKey?: string;
  /** 객체 표본의 블록. */
  readonly block?: string;
}

/** 표본 파일에서 표본을 문서 순서로 읽는다. */
function fixtureEntries(source: string): FixtureEntry[] {
  const re = /fromMatrix\(\s*'([^']+)'\s*,\s*'(\w+)'\s*\)|template:\s*'(\w+)'/g;
  const hits = Array.from(source.matchAll(re));
  return hits.map((m, i) => {
    if (m[1] !== undefined) return { template: m[2]!, matrixKey: m[1] };
    const end = i + 1 < hits.length ? hits[i + 1]!.index! : source.length;
    return { template: m[3]!, block: source.slice(m.index!, end) };
  });
}

/** matrix 파일의 표본 블록(key → 블록). 줄에 `key: '…'` 만 있는 것이 표본 머리다(안쪽 객체의 key 는 뺀다). */
function matrixBlocks(source: string): Map<string, string> {
  const heads = Array.from(source.matchAll(/^[ \t]*key:\s*'([^']+)',?[ \t]*$/gm));
  const blocks = new Map<string, string>();
  heads.forEach((m, i) => {
    const end = i + 1 < heads.length ? heads[i + 1]!.index! : source.length;
    blocks.set(m[1]!, source.slice(m.index!, end));
  });
  return blocks;
}

function rendersTemplate(block: string, template: string): boolean {
  return new RegExp(`<${template}[\\s/>]`).test(block);
}

/** 템플릿 목록과 표본 파일을 대조해 위반 목록을 낸다(빈 배열 = 통과). */
export function auditPaintGateCoverage(input: PaintGateCoverageInput): string[] {
  const violations: string[] = [];
  const exported = templateExports(input.templatesIndex);
  const exportedSet = new Set(exported);

  if (input.fixtures === undefined) violations.push(`표본 파일 ${PAINT_GATE_FIXTURES_PATH} 가 없습니다`);
  const entries = fixtureEntries(input.fixtures ?? '');
  const counts = new Map<string, number>();
  for (const e of entries) counts.set(e.template, (counts.get(e.template) ?? 0) + 1);

  // 1) 누락
  for (const name of exported) {
    if (!counts.has(name)) violations.push(`누락 ${name}: Paint Gate 표본이 없습니다 — ${PAINT_GATE_FIXTURES_PATH} 에 더하세요`);
  }
  // 2) 중복
  for (const [name, n] of counts) {
    if (n > 1) violations.push(`중복 ${name}: 표본이 ${n}개입니다`);
  }
  // 3) 없는 이름
  for (const name of counts.keys()) {
    if (!exportedSet.has(name)) violations.push(`없는 이름 ${name}: ${TEMPLATES_INDEX_PATH} 가 내보내지 않습니다`);
  }
  // 4) 렌더
  const matrix = input.matrixFixtures === undefined ? undefined : matrixBlocks(input.matrixFixtures);
  for (const e of entries) {
    if (e.matrixKey !== undefined) {
      const block = matrix?.get(e.matrixKey);
      if (matrix === undefined) violations.push(`${e.template}: matrix key '${e.matrixKey}' — ${MATRIX_FIXTURES_PATH} 가 없습니다`);
      else if (block === undefined) violations.push(`${e.template}: matrix key '${e.matrixKey}' 가 ${MATRIX_FIXTURES_PATH} 에 없습니다`);
      else if (!rendersTemplate(block, e.template)) {
        violations.push(`${e.template}: matrix key '${e.matrixKey}' 의 표본이 <${e.template}> 를 그리지 않습니다`);
      }
    } else if (!rendersTemplate(e.block!, e.template)) {
      violations.push(`${e.template}: 표본 블록이 <${e.template}> 를 그리지 않습니다`);
    }
  }
  return violations;
}
