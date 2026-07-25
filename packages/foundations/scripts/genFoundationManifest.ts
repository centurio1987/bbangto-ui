/**
 * foundation.manifest.json + catalog.json 생성 스크립트. `pnpm gen:foundation-manifest`(tsx)로 실행 (KAN-035).
 *
 * `foundationCatalog`(SSOT) + `foundationMetaRegistry`(authored)에서 채택 매니페스트를 파생하고, catalog.json도
 * 같은 SSOT에서 emit해 이중-SSOT drift(amber 누락 등)를 구조적으로 제거한다. 순수 데이터라 dist 빌드 없이 실행.
 * 최신성은 meta/manifest.test.ts 바이트 동기 테스트가 강제(prebuild 미배선 — blast radius 최소화).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { foundationCatalog } from '../src/index';
import { foundationMetaRegistry } from '../src/meta/registry';
import {
  buildFoundationManifest,
  serializeFoundationManifest,
  buildCatalogList,
  serializeCatalogList,
} from '../src/meta/manifest';

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, '..', 'foundation.manifest.json');
const catalogPath = join(here, '..', 'src', 'catalog.json');

const manifest = buildFoundationManifest(foundationCatalog, foundationMetaRegistry);
writeFileSync(manifestPath, serializeFoundationManifest(manifest), 'utf8');

const catalog = buildCatalogList(foundationCatalog);
writeFileSync(catalogPath, serializeCatalogList(catalog), 'utf8');

const authored = manifest.filter((e) => e.metaStatus === 'authored').length;
// eslint-disable-next-line no-console
console.log(
  `[gen:foundation-manifest] wrote ${manifest.length} entries (${authored} authored, ${manifest.length - authored} pending) + catalog.json(${catalog.length}) → ${manifestPath}`,
);
