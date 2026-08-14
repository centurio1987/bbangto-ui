/**
 * jsdoc.test.ts — 컴포넌트 소스 JSDoc ↔ 레지스트리 최신성 게이트 (KAN-043 / 상류 I2).
 *
 * `gen:type-jsdoc`이 주입한 태그가 레지스트리와 어긋나면(유형 추가·useWhen 수정 후 재생성 누락) 여기서 실패한다.
 * `type.manifest.json` 바이트동기 테스트와 같은 정책이다 — 생성기는 수동 실행이고, 최신성은 테스트가 강제한다.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { vizTypeRegistry } from './registry';
import { buildJsdocTags } from './jsdocTags';
import { buildExportFileMap, jsdocBodyAbove } from './jsdocSource';

const srcDir = dirname(dirname(fileURLToPath(import.meta.url)));

const fileMap = buildExportFileMap();
const exportNames = [...new Set(vizTypeRegistry.flatMap((e) => e.exportNames))].sort();

const jsdocAbove = (file: string, name: string) =>
  jsdocBodyAbove(readFileSync(file, 'utf8'), name);

describe('컴포넌트 JSDoc — 채택 근거 주입 (상류 I2)', () => {
  it('배럴이 registry의 모든 export를 소스 파일로 해석한다', () => {
    const unresolved = exportNames.filter((n) => !fileMap.has(n));
    expect(unresolved).toEqual([]);
    expect(exportNames.length).toBe(87);
  });

  it('모든 export 선언 위에 최신 @vizType 태그 블록이 있다(생성기 재실행 필요 시 실패)', () => {
    const stale: string[] = [];
    for (const name of exportNames) {
      const expected = buildJsdocTags(name, vizTypeRegistry);
      const body = jsdocAbove(fileMap.get(name)!, name);
      for (const tag of expected) {
        if (!body.includes(tag)) {
          stale.push(`${name}: ${tag.slice(0, 60)}…`);
          break;
        }
      }
    }
    expect(stale).toEqual([]);
  });

  it('리포트가 지목한 갭이 실제로 메워졌다 — Flowchart는 JSDoc 자체가 없었다', () => {
    const body = jsdocAbove(fileMap.get('Flowchart')!, 'Flowchart').join('\n');
    expect(body).toContain('@vizType VT-201');
    expect(body).toContain('@useWhen 분기가 있는 범용 절차');
    // ProcessSteps는 산문 주석이 있던 자리 — 산문이 보존된 채 태그만 더해져야 한다.
    const ps = jsdocAbove(fileMap.get('ProcessSteps')!, 'ProcessSteps').join('\n');
    expect(ps).toContain('ProcessSteps 패턴 — 순차 스텝 체인(headless).');
    expect(ps).toContain('@avoidWhen 조건 분기가 있으면 Flowchart(VT-201) 사용');
  });

  it('1:N export는 겸하는 유형 전부와 그 prop 값을 노출한다(Statistics)', () => {
    const body = jsdocAbove(fileMap.get('Statistics')!, 'Statistics').join('\n');
    for (const id of ['VT-513', 'VT-514', 'VT-601']) expect(body).toContain(`@vizType ${id}`);
    expect(body).toContain('mode="cards"(기본)');
    expect(body).toContain('mode="waffle"');
  });

  it('메인 엔트리 배럴 머리와 dts 배너 둘 다 정본 위치를 가리킨다', () => {
    // 소스 머리 주석은 dts 롤업이 버리므로 배너가 따로 필요하다 — 둘이 같은 세 포인터를 담아야 한다.
    const index = readFileSync(join(srcDir, 'index.ts'), 'utf8');
    const tsup = readFileSync(join(srcDir, '..', 'tsup.config.ts'), 'utf8');
    for (const pointer of ['type.manifest.json', 'selectVizTypes', '/type-meta']) {
      expect(index).toContain(pointer);
      expect(tsup).toContain(pointer);
    }
  });
});
