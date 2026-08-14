/**
 * genTypeJsdoc — 레지스트리의 채택 근거를 컴포넌트 소스 JSDoc에 주입한다 (KAN-043 / 상류 I2).
 *
 * 왜 소스에 쓰는가: tsup dts 롤업이 소스 JSDoc을 그대로 물고 가므로, 배포되는 `dist/index.d.ts` 한 곳에서
 * IDE 툴팁과 LLM의 타입 읽기가 동시에 채택 근거를 본다. 빌드 산출물을 후처리하면 소스와 어긋난다.
 *
 * 멱등하다 — 이미 붙은 생성 태그(`@vizType`/`@useWhen`/`@avoidWhen`/`@seeTypeMeta`) 줄을 걷어내고 다시 붙인다.
 * 사람이 쓴 산문 주석은 건드리지 않는다. 최신성은 `src/typeMeta/jsdoc.test.ts`가 게이트한다.
 *
 * 실행: `pnpm --filter @centurio1987/bbangto-ui-visualization gen:type-jsdoc`
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { vizTypeRegistry } from '../src/typeMeta/registry';
import { buildJsdocTags } from '../src/typeMeta/jsdocTags';
import { applyTags, buildExportFileMap } from '../src/typeMeta/jsdocSource';

const fileMap = buildExportFileMap();
const exportNames = [...new Set(vizTypeRegistry.flatMap((e) => e.exportNames))].sort();

// 파일 단위로 모아 한 번만 쓴다(한 파일이 여러 export를 낼 수 있다 — ArchiMate 4종).
const byFile = new Map<string, string[]>();
for (const name of exportNames) {
  const file = fileMap.get(name);
  if (!file) throw new Error(`[gen:type-jsdoc] 배럴에서 못 찾음: ${name}`);
  byFile.set(file, [...(byFile.get(file) ?? []), name]);
}

let touched = 0;
for (const [file, names] of byFile) {
  const before = readFileSync(file, 'utf8');
  let text = before;
  for (const name of names) text = applyTags(text, name, buildJsdocTags(name, vizTypeRegistry));
  if (text !== before) {
    writeFileSync(file, text);
    touched += 1;
  }
}
console.log(
  `[gen:type-jsdoc] ${exportNames.length} exports / ${byFile.size} files — ${touched} files updated`,
);
