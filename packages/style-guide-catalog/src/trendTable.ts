/**
 * 트렌드 표 자동생성 — `catalog.manifest.json`(기계 SSOT)에서 `style-guide-catalog.md`의 트렌드
 * 색인 표를 파생한다(문서 drift 제거). meta(trendIndex/displayName/family/priority/summary)는 이미
 * 각 style guide에 저작→매니페스트로 투영되므로, 표는 그 3차 투영이다. (KAN-025)
 *
 * 생성/검증 분리: 이 순수 함수는 표 문자열만 만들고, `genTrendTable.ts`가 md 마커 구간에 write하며,
 * `trendTable.test.ts`가 커밋 md와 바이트 동기를 강제(stale 시 CI fail)한다.
 */
import { STYLE_FAMILY_LABELS } from '@centurio1987/bbangto-ui-tokens';
import type { SelectableEntry } from './select';

/** 트렌드 표 마커 — genTrendTable/테스트가 공유. 이 사이만 자동생성으로 치환된다. */
export const TREND_TABLE_START = '<!-- gen:trend-table:start -->';
export const TREND_TABLE_END = '<!-- gen:trend-table:end -->';

/** 표 구조를 깨는 문자(파이프·개행)만 이스케이프+trim. 백틱/괄호/이모지는 셀 내 정상 렌더. */
function cell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
}

/**
 * 카탈로그를 트렌드 색인 표(markdown 문자열, 마커 없음)로 변환한다. 결정적.
 * 정렬: trendIndex 오름차순, **동률은 catalog 소스 배열 순서 유지**(ES 안정정렬) — slug/표시명
 * 리네임이 표 재배치를 유발하지 않게. meta 없는 항목은 silent drop이 아니라 throw(데이터 결손 은폐 방지).
 */
export function buildTrendTable(catalog: readonly SelectableEntry[]): string {
  const missing = catalog.filter((e) => !e.meta).map((e) => e.name);
  if (missing.length) {
    throw new Error(`[trendTable] meta 없는 항목(트렌드 표 파생 불가): ${missing.join(', ')}`);
  }

  const rows = catalog
    .map((e, i) => ({ e, i }))
    .sort(
      (a, b) =>
        (a.e.meta!.trendIndex ?? Infinity) - (b.e.meta!.trendIndex ?? Infinity) || a.i - b.i
    )
    .map(({ e }) => {
      const m = e.meta!;
      return (
        `| ${m.trendIndex ?? '—'} | ${cell(m.displayName)} | \`${e.name}\` | ` +
        `${STYLE_FAMILY_LABELS[m.family]} | ${cell(m.summary)} | ${m.priority ?? '—'} |`
      );
    });

  return [
    '| # | 표시명 | slug | 패밀리 | 요약 | P |',
    '|---|--------|------|--------|------|---|',
    ...rows,
  ].join('\n');
}

/**
 * md의 start/end 마커 사이를 body로 치환한다. 마커 누락·중복·역순 시 throw
 * (잘못된 문서 부분수정/중복삽입 방지). 마커 자체는 보존한다.
 */
export function replaceBetweenMarkers(
  md: string,
  start: string,
  end: string,
  body: string
): string {
  const s = md.indexOf(start);
  const e = md.indexOf(end);
  if (s < 0 || e < 0) throw new Error('[trendTable] 마커 누락(start 또는 end 없음)');
  if (md.indexOf(start, s + 1) >= 0 || md.indexOf(end, e + 1) >= 0) {
    throw new Error('[trendTable] 마커 중복(start/end가 2회 이상 등장)');
  }
  if (e < s) throw new Error('[trendTable] 마커 역순(end가 start보다 앞)');
  return md.slice(0, s + start.length) + '\n' + body + '\n' + md.slice(e);
}

/** md에서 두 마커 사이 본문을 추출한다(앞뒤 개행 trim). 테스트가 커밋본 구간 비교에 사용. */
export function extractBetweenMarkers(md: string, start: string, end: string): string {
  const s = md.indexOf(start);
  const e = md.indexOf(end);
  if (s < 0 || e < 0 || e < s) throw new Error('[trendTable] 마커 추출 실패');
  return md.slice(s + start.length, e).replace(/^\n+/, '').replace(/\n+$/, '');
}
