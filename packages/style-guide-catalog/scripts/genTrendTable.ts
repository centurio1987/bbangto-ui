/**
 * style-guide-catalog.md 트렌드 표 생성 스크립트. `pnpm gen:trend-table`(tsx)로 실행한다.
 *
 * styleGuideCatalog(SSOT)에서 트렌드 색인 표를 파생해 core md의 마커 구간에 결정적으로 치환한다.
 * 마커 밖 수기 산문(P 범례·도출 통계·⚠ 경고·항목별 명세)은 보존된다.
 *
 * 주의: prebuild에 배선하지 않는다(빌드가 tracked md를 mutate하지 않게). meta 변경 시 수동 실행하고,
 * drift는 trendTable.test.ts의 sync 테스트가 CI에서 강제한다.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { styleGuideCatalog } from '../src/index';
import {
  buildTrendTable,
  replaceBetweenMarkers,
  TREND_TABLE_START,
  TREND_TABLE_END,
} from '../src/trendTable';

const here = dirname(fileURLToPath(import.meta.url));
const mdPath = join(here, '..', '..', 'core', 'style-guide-catalog.md');

const md = readFileSync(mdPath, 'utf8');
const table = buildTrendTable(styleGuideCatalog);
const next = replaceBetweenMarkers(md, TREND_TABLE_START, TREND_TABLE_END, table);
writeFileSync(mdPath, next, 'utf8');

// eslint-disable-next-line no-console
console.log(`[gen:trend-table] wrote ${styleGuideCatalog.length} rows → ${mdPath}`);
