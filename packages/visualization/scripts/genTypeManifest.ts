/**
 * type.manifest.json 생성 스크립트. `pnpm gen:type-manifest`(tsx)로 실행한다.
 *
 * vizTypeRegistry(SSOT)에서 유형 축 매니페스트를 파생해 패키지 루트에 색인(type.manifest.json)과
 * 항목별 상세(manifest/<id>.json)를 결정적 JSON으로 쓴다(KAN-064). 상세 폴더는 매번 비우고 다시 쓴다.
 * 레지스트리는 **순수 데이터**(컴포넌트 import 없음)라 dist 빌드 없이 Node에서 안전하게 실행된다.
 * `pnpm build` 가 prebuild 로 부른다(KAN-064).
 * 커밋본이 최신인지는 배포 워크플로가 빌드 직후 git diff 로 본다(.github/workflows/release.yml). manifest.test.ts 의 색인 바이트
 * 동기 테스트는 빌드 없이 돌릴 때만 낡은 색인을 잡는다 — 빌드가 색인을 먼저 다시 쓰기 때문이다.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { vizTypeRegistry } from '../src/typeMeta/registry';
import {
  buildTypeManifest,
  buildTypeManifestIndex,
  serializeTypeManifestIndex,
  serializeTypeManifestEntry,
} from '../src/typeMeta/manifest';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, '..', 'type.manifest.json');
const detailDir = join(here, '..', 'manifest');

const manifest = buildTypeManifest(vizTypeRegistry);
writeFileSync(outPath, serializeTypeManifestIndex(buildTypeManifestIndex(manifest)), 'utf8');
rmSync(detailDir, { recursive: true, force: true });
mkdirSync(detailDir);
for (const e of manifest) writeFileSync(join(detailDir, `${e.id}.json`), serializeTypeManifestEntry(e), 'utf8');

const authored = manifest.filter((e) => e.metaStatus === 'authored').length;
// eslint-disable-next-line no-console
console.log(
  `[gen:type-manifest] wrote ${manifest.length} entries (${authored} authored, ${manifest.length - authored} pending) → ${outPath} + ${detailDir}/`,
);
