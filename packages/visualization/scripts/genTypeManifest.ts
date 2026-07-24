/**
 * type.manifest.json 생성 스크립트. `pnpm gen:type-manifest`(tsx)로 실행한다.
 *
 * vizTypeRegistry(SSOT)에서 유형 축 매니페스트를 파생해 패키지 루트에 결정적 JSON으로 쓴다.
 * 레지스트리는 **순수 데이터**(컴포넌트 import 없음)라 dist 빌드 없이 Node에서 안전하게 실행된다.
 * 최신성은 manifest.test.ts의 바이트 동기 테스트가 강제한다(prebuild 자동배선 없음 — 코어 패키지 blast radius 최소화).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { vizTypeRegistry } from '../src/typeMeta/registry';
import { buildTypeManifest, serializeTypeManifest } from '../src/typeMeta/manifest';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, '..', 'type.manifest.json');

const manifest = buildTypeManifest(vizTypeRegistry);
writeFileSync(outPath, serializeTypeManifest(manifest), 'utf8');

const authored = manifest.filter((e) => e.metaStatus === 'authored').length;
// eslint-disable-next-line no-console
console.log(
  `[gen:type-manifest] wrote ${manifest.length} entries (${authored} authored, ${manifest.length - authored} pending) → ${outPath}`,
);
