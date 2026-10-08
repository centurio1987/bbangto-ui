/**
 * vizPaintGateCoverage.test.ts — **viz 템플릿 Paint Gate 표본 커버리지 게이트** (KAN-063).
 *
 * `keyboardCoverage.test.ts` 와 같은 자리·같은 구조다. 물리적으로 foundations 에 호스팅하지만 저장소 전역
 * 게이트이고(`test:unit` 의 `pnpm -r` 이 전 패키지를 항상 실행한다), 두 층위로 돈다:
 *  1) 실제 repo 검증 — `templates/index.ts` 가 내보내는 템플릿마다 Paint Gate 표본이 있다.
 *  2) fixture 실패주입 — 누락·중복·없는 이름·이름과 다른 렌더·없는 matrix key 에서 위반을 낸다.
 *
 * 검사 규칙과 한계는 `vizPaintGateCoverage.ts` 파일 주석에 있다.
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  MATRIX_FIXTURES_PATH,
  PAINT_GATE_FIXTURES_PATH,
  TEMPLATES_INDEX_PATH,
  auditPaintGateCoverage,
  templateExports,
  type PaintGateCoverageInput,
} from './vizPaintGateCoverage';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

function readOptional(path: string): string | undefined {
  const abs = join(repoRoot, path);
  return existsSync(abs) ? readFileSync(abs, 'utf8') : undefined;
}

describe('viz paint gate coverage — 실제 repo', () => {
  const input: PaintGateCoverageInput = {
    templatesIndex: readFileSync(join(repoRoot, TEMPLATES_INDEX_PATH), 'utf8'),
    fixtures: readOptional(PAINT_GATE_FIXTURES_PATH),
    matrixFixtures: readOptional(MATRIX_FIXTURES_PATH),
  };

  it('templates 가 내보내는 템플릿마다 Paint Gate 표본이 하나씩 있다', () => {
    expect(auditPaintGateCoverage(input)).toEqual([]);
  });

  it('템플릿 이름을 68개 읽는다 — ArchiMate 한 줄의 넷과 메타 프레임까지', () => {
    const names = templateExports(input.templatesIndex);
    expect(names).toHaveLength(68);
    expect(names).toEqual(
      expect.arrayContaining([
        'ArchiMateDiagram',
        'ArchiMateBusinessDiagram',
        'ArchiMateApplicationDiagram',
        'ArchiMateTechnologyDiagram',
        'Kruchten4Plus1View',
        'ViewpointFrame',
        'IsometricScene',
      ]),
    );
    expect(names).not.toContain('FlowchartProps');
  });
});

describe('viz paint gate coverage — 템플릿 이름 읽기', () => {
  it('값 export 만 읽고 type export 는 한 줄이든 여러 줄이든 뺀다', () => {
    const src = [
      "export { Alpha, Beta } from './Alpha';",
      "export type { AlphaProps } from './Alpha';",
      'export type {',
      '  GammaProps,',
      '  GammaData,',
      "} from './Gamma';",
      "export { Gamma as GammaChart } from './Gamma';",
      "export { Delta, type DeltaProps } from './Delta';",
    ].join('\n');
    expect(templateExports(src)).toEqual(['Alpha', 'Beta', 'GammaChart', 'Delta']);
  });
});

describe('viz paint gate coverage — fixture 실패 주입', () => {
  const INDEX = "export { Alpha } from './Alpha';\nexport { Beta } from './Beta';\n";
  const MATRIX = [
    'export const MATRIX_FIXTURES = [',
    '  {',
    "    key: 'alpha',",
    '    render: () => <Alpha data={[]} />,',
    '  },',
    '  {',
    "    key: 'other',",
    "    render: () => <Other rows={[{ name: 'id', key: 'PK' }]} />,",
    '  },',
    '];',
  ].join('\n');
  const FIXTURES = [
    'export const PAINT_GATE_FIXTURES = [',
    "  fromMatrix('alpha', 'Alpha'),",
    '  {',
    "    key: 'beta',",
    "    template: 'Beta',",
    '    render: () => <Beta data={[]} />,',
    '  },',
    '];',
  ].join('\n');
  const ok: PaintGateCoverageInput = { templatesIndex: INDEX, fixtures: FIXTURES, matrixFixtures: MATRIX };

  it('기준 입력은 통과한다', () => {
    expect(auditPaintGateCoverage(ok)).toEqual([]);
  });

  it('표본 파일이 없으면 그 사실과 빠진 템플릿을 모두 낸다', () => {
    const v = auditPaintGateCoverage({ ...ok, fixtures: undefined });
    expect(v[0]).toContain(PAINT_GATE_FIXTURES_PATH);
    expect(v).toEqual(expect.arrayContaining([expect.stringContaining('누락 Alpha'), expect.stringContaining('누락 Beta')]));
  });

  it('누락 — 내보낸 템플릿에 표본이 없다', () => {
    const fixtures = FIXTURES.replace("  fromMatrix('alpha', 'Alpha'),\n", '');
    expect(auditPaintGateCoverage({ ...ok, fixtures })).toEqual([expect.stringContaining('누락 Alpha')]);
  });

  it('중복 — 한 템플릿에 표본이 둘이다', () => {
    const fixtures = FIXTURES.replace(
      "  fromMatrix('alpha', 'Alpha'),",
      "  fromMatrix('alpha', 'Alpha'),\n  { key: 'alpha-2', template: 'Alpha', render: () => <Alpha data={[1]} /> },",
    );
    expect(auditPaintGateCoverage({ ...ok, fixtures })).toEqual([expect.stringContaining('중복 Alpha')]);
  });

  it('없는 이름 — templates 가 내보내지 않는 이름을 표본이 적었다', () => {
    const fixtures = FIXTURES.replace(
      "  fromMatrix('alpha', 'Alpha'),",
      "  fromMatrix('alpha', 'Alpha'),\n  { key: 'ghost', template: 'Ghost', render: () => <Ghost /> },",
    );
    expect(auditPaintGateCoverage({ ...ok, fixtures })).toEqual([expect.stringContaining('없는 이름 Ghost')]);
  });

  it('이름과 렌더가 다르다 — template 에 적은 컴포넌트를 그리지 않는다', () => {
    const fixtures = FIXTURES.replace('<Beta data={[]} />', '<Alpha data={[]} />');
    expect(auditPaintGateCoverage({ ...ok, fixtures })).toEqual([expect.stringContaining('Beta: 표본')]);
  });

  it('matrix 에서 가져온 key 가 matrix 에 없거나 그 템플릿을 그리지 않는다', () => {
    const missing = FIXTURES.replace("fromMatrix('alpha', 'Alpha')", "fromMatrix('alfa', 'Alpha')");
    expect(auditPaintGateCoverage({ ...ok, fixtures: missing })).toEqual([expect.stringContaining("matrix key 'alfa'")]);
    const wrong = FIXTURES.replace("fromMatrix('alpha', 'Alpha')", "fromMatrix('other', 'Alpha')");
    expect(auditPaintGateCoverage({ ...ok, fixtures: wrong })).toEqual([expect.stringContaining("matrix key 'other'")]);
  });

  it('matrix 안쪽 객체의 key(ER 열 PK 같은 것)를 표본 key 로 읽지 않는다', () => {
    const fixtures = FIXTURES.replace("fromMatrix('alpha', 'Alpha')", "fromMatrix('PK', 'Alpha')");
    expect(auditPaintGateCoverage({ ...ok, fixtures })).toEqual([expect.stringContaining("matrix key 'PK'")]);
  });
});
