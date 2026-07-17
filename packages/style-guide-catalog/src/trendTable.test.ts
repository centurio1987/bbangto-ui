import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { STYLE_FAMILIES, STYLE_FAMILY_LABELS } from '@centurio1987/bbangto-ui-tokens';
import type { StyleGuideMeta } from '@centurio1987/bbangto-ui-tokens';
import { styleGuideCatalog } from './index';
import {
  buildTrendTable,
  replaceBetweenMarkers,
  extractBetweenMarkers,
  TREND_TABLE_START,
  TREND_TABLE_END,
} from './trendTable';
import type { SelectableEntry } from './select';

function entry(name: string, meta?: Partial<StyleGuideMeta>): SelectableEntry {
  return { name, meta: meta as StyleGuideMeta | undefined };
}

const mdPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'core',
  'style-guide-catalog.md'
);

describe('buildTrendTable — 형식·이스케이프 (fixture)', () => {
  it('헤더/구분선 + 행 형식, priority 없으면 —', () => {
    const md = buildTrendTable([
      entry('a-01', { trendIndex: 0, displayName: 'A_01', family: 'tech-dark', summary: 's', priority: 'P1' }),
      entry('b-01', { trendIndex: 1, displayName: 'B_01', family: 'nostalgia', summary: 's2' }),
    ]);
    const lines = md.split('\n');
    expect(lines[0]).toBe('| # | 표시명 | slug | 패밀리 | 요약 | P |');
    expect(lines[1]).toBe('|---|--------|------|--------|------|---|');
    expect(lines[2]).toBe('| 0 | A_01 | `a-01` | 테크/다크 | s | P1 |');
    expect(lines[3]).toBe('| 1 | B_01 | `b-01` | 노스탤지어 | s2 | — |'); // priority 없음
  });

  it('summary의 파이프·개행을 이스케이프/접음', () => {
    const md = buildTrendTable([
      entry('x-01', { trendIndex: 0, displayName: 'X_01', family: 'flat-systematic', summary: 'a | b\n  c' }),
    ]);
    expect(md.split('\n')[2]).toBe('| 0 | X_01 | `x-01` | 평면/체계 | a \\| b c | — |');
  });
});

describe('buildTrendTable — 데이터 정합성', () => {
  it('meta 없는 항목 → throw(silent drop 아님)', () => {
    expect(() => buildTrendTable([entry('has-01', { trendIndex: 0, displayName: 'H', family: 'tech-dark', summary: 's' }), entry('no-01')])).toThrow(/meta 없는 항목/);
  });

  it('동률 trendIndex → catalog 소스 배열 순서 유지(결정성)', () => {
    const cat = [
      entry('z-01', { trendIndex: 3, displayName: 'Z', family: 'tech-dark', summary: 's' }),
      entry('a-01', { trendIndex: 3, displayName: 'A', family: 'tech-dark', summary: 's' }),
      entry('m-01', { trendIndex: 1, displayName: 'M', family: 'tech-dark', summary: 's' }),
    ];
    const slugs = buildTrendTable(cat)
      .split('\n')
      .slice(2)
      .map((l) => l.match(/`([^`]+)`/)![1]);
    // trendIndex 1 먼저, 동률 3은 소스 순서(z 먼저, a 나중) — name asc였다면 a,z가 됐을 것.
    expect(slugs).toEqual(['m-01', 'z-01', 'a-01']);
  });
});

describe('STYLE_FAMILY_LABELS 완전성', () => {
  it('STYLE_FAMILIES 전 키가 비어있지 않은 라벨로 매핑된다', () => {
    for (const f of STYLE_FAMILIES) {
      expect(STYLE_FAMILY_LABELS[f], f).toBeTruthy();
    }
  });

  it('실 카탈로그의 모든 meta.family가 매핑된다', () => {
    for (const sg of styleGuideCatalog) {
      const fam = sg.meta?.family;
      if (fam) expect(STYLE_FAMILY_LABELS[fam], `${sg.name}:${fam}`).toBeTruthy();
    }
  });
});

describe('replaceBetweenMarkers — 실패 조건', () => {
  const S = '<!--s-->';
  const E = '<!--e-->';
  it('정상 치환(마커 보존)', () => {
    expect(replaceBetweenMarkers(`a${S}old${E}b`, S, E, 'NEW')).toBe(`a${S}\nNEW\n${E}b`);
  });
  it('마커 누락 → throw', () => {
    expect(() => replaceBetweenMarkers(`a${S}b`, S, E, 'x')).toThrow(/마커 누락/);
  });
  it('마커 중복 → throw', () => {
    expect(() => replaceBetweenMarkers(`${S}${E}${S}${E}`, S, E, 'x')).toThrow(/마커 중복/);
  });
  it('마커 역순 → throw', () => {
    expect(() => replaceBetweenMarkers(`${E}...${S}`, S, E, 'x')).toThrow(/역순/);
  });
});

describe('트렌드 표 재생성 동기 (drift 게이트)', () => {
  const md = readFileSync(mdPath, 'utf8');

  it('core md에 트렌드 표 마커가 정확히 1쌍 존재', () => {
    expect(md.split(TREND_TABLE_START).length - 1).toBe(1);
    expect(md.split(TREND_TABLE_END).length - 1).toBe(1);
  });

  it('마커 구간 === buildTrendTable(styleGuideCatalog) (stale 시 gen:trend-table 재실행 필요)', () => {
    const committed = extractBetweenMarkers(md, TREND_TABLE_START, TREND_TABLE_END);
    expect(committed).toBe(buildTrendTable(styleGuideCatalog));
  });

  it('표 행 수 = 카탈로그 항목 수, 전 행 slug가 카탈로그 name에 대응', () => {
    const names = new Set(styleGuideCatalog.map((sg) => sg.name));
    const rows = buildTrendTable(styleGuideCatalog).split('\n').slice(2);
    expect(rows).toHaveLength(styleGuideCatalog.length);
    for (const r of rows) {
      const slug = r.match(/`([^`]+)`/)![1];
      expect(names.has(slug), slug).toBe(true);
    }
  });
});
