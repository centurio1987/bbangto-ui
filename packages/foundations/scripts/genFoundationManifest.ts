/**
 * foundation.manifest.json + catalog.json 생성 스크립트. `pnpm gen:foundation-manifest`(tsx)로 실행 (KAN-035).
 *
 * `foundationCatalog`(SSOT) + `foundationMetaRegistry`(authored)에서 채택 매니페스트를 파생하고, catalog.json도
 * 같은 SSOT에서 emit해 이중-SSOT drift(amber 누락 등)를 구조적으로 제거한다. 렌더는 없지만 대비 계산을 tokens
 * 런타임에서 가져오므로 tokens 의 dist 가 있어야 돈다(KAN-064 실측). `pnpm build` 가 tokens 를 먼저 빌드한 뒤 prebuild 로 부른다.
 * 매니페스트는 색인(foundation.manifest.json)과 항목별 상세(manifest/<slug>.json) 두 층으로 쓴다(KAN-064).
 * 상세 폴더는 매번 비우고 다시 쓴다.
 * 최신성은 meta/manifest.test.ts 의 색인 바이트 동기 테스트가 강제한다.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { foundationCatalog } from '../src/index';
import { foundationMetaRegistry } from '../src/meta/registry';
import {
  buildFoundationManifest,
  buildFoundationManifestIndex,
  serializeFoundationManifestIndex,
  serializeFoundationManifestEntry,
  buildCatalogList,
  serializeCatalogList,
} from '../src/meta/manifest';

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, '..', 'foundation.manifest.json');
const detailDir = join(here, '..', 'manifest');
const catalogPath = join(here, '..', 'src', 'catalog.json');

const manifest = buildFoundationManifest(foundationCatalog, foundationMetaRegistry);
writeFileSync(manifestPath, serializeFoundationManifestIndex(buildFoundationManifestIndex(manifest)), 'utf8');
rmSync(detailDir, { recursive: true, force: true });
mkdirSync(detailDir);
for (const e of manifest) writeFileSync(join(detailDir, `${e.slug}.json`), serializeFoundationManifestEntry(e), 'utf8');

const catalog = buildCatalogList(foundationCatalog);
writeFileSync(catalogPath, serializeCatalogList(catalog), 'utf8');

const authored = manifest.filter((e) => e.metaStatus === 'authored').length;
// eslint-disable-next-line no-console
console.log(
  `[gen:foundation-manifest] wrote ${manifest.length} entries (${authored} authored, ${manifest.length - authored} pending) + catalog.json(${catalog.length}) → ${manifestPath} + ${detailDir}/`,
);
