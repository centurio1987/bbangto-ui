/**
 * catalog.manifest.json 생성 스크립트. `pnpm gen:manifest`(tsx)로 실행한다.
 *
 * vizStyleGuideCatalog(SSOT)에서 매니페스트를 파생해 패키지 루트에 색인(catalog.manifest.json)과
 * 항목별 상세(manifest/<name>.json)를 결정적 JSON으로 쓴다(KAN-064). 상세 폴더는 매번 비우고 다시 쓴다.
 * 카탈로그 객체는 구조만 읽으므로(렌더 없음) Node에서 안전하게 실행된다.
 * 단, wrapper/showcase가 visualization 런타임을 import하므로 dist가 빌드돼 있어야 한다. `pnpm build` 는
 * visualization 을 먼저 빌드한 뒤 prebuild 로 이 스크립트를 부르므로 그 순서를 지킨다.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { vizStyleGuideCatalog } from '../src/index';
import {
  buildManifest,
  buildManifestIndex,
  serializeManifestIndex,
  serializeManifestEntry,
} from '../src/manifest';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, '..', 'catalog.manifest.json');
const detailDir = join(here, '..', 'manifest');

const manifest = buildManifest(vizStyleGuideCatalog);
writeFileSync(outPath, serializeManifestIndex(buildManifestIndex(manifest)), 'utf8');
rmSync(detailDir, { recursive: true, force: true });
mkdirSync(detailDir);
for (const e of manifest) writeFileSync(join(detailDir, `${e.name}.json`), serializeManifestEntry(e), 'utf8');

const authored = manifest.filter((e) => e.metaStatus === 'authored').length;
// eslint-disable-next-line no-console
console.log(
  `[gen:manifest] wrote ${manifest.length} entries (${authored} authored, ${manifest.length - authored} pending) → ${outPath} + ${detailDir}/`
);
