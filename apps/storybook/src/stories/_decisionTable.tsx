import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@centurio1987/bbangto-ui-core';
import {
  selectStyleGuides,
  type ManifestEntry,
  type StyleSelectionCriteria,
} from '@centurio1987/bbangto-ui-style-guide-catalog';
import { DOMAINS, STYLE_FAMILIES } from '@centurio1987/bbangto-ui-tokens';
import type { Domain, StyleFamily } from '@centurio1987/bbangto-ui-tokens';

/*
 * Catalog Decision Table — 매니페스트 채택 메타를 사람이 비교·선택하는 인터랙티브 결정 테이블.
 *
 * METADATA_STRATEGY §6 "AI 소비 흐름"의 사람용 실현: 필터(domain/family/colorScheme/min-energy)로
 * StyleSelectionCriteria를 만들어 selectStyleGuides(KAN-022)가 후보를 스코어링·랭크 → core Table에
 * score 내림차순으로 렌더한다. soft-weighted라 어떤 필터에도 후보가 0으로 붕괴하지 않고 재정렬만 된다.
 *
 * UI/viz 공용: kind='viz'면 priority 컬럼을 숨기고 family 옵션을 viz-* union으로 제한한다.
 */

export interface DecisionFilters {
  domain: 'any' | Domain;
  family: 'any' | StyleFamily;
  colorScheme: 'any' | 'light' | 'dark' | 'both';
  /** 0 = any(무제약). 1~5 = mood.energy 하한. */
  minEnergy: number;
}

export const INITIAL_FILTERS: DecisionFilters = {
  domain: 'any',
  family: 'any',
  colorScheme: 'any',
  minEnergy: 0,
};

/**
 * 필터 상태 → StyleSelectionCriteria 매핑(순수). 매핑 오류를 데이터/상호작용과 분리해
 * 검증하기 위해 export한다(play가 "최상위 행이 활성 필터를 만족"으로 정확성 확인).
 * 'any'/0은 해당 criterion을 생략(무제약).
 */
export function criteriaFromFilters(f: DecisionFilters): StyleSelectionCriteria {
  return {
    ...(f.domain !== 'any' && { domains: [f.domain] }),
    ...(f.family !== 'any' && { family: f.family }),
    ...(f.colorScheme !== 'any' && { characteristics: { colorScheme: f.colorScheme } }),
    ...(f.minEnergy > 0 && { mood: { energy: { min: f.minEnergy } } }),
    explain: true,
  };
}

const uiFamilies = STYLE_FAMILIES.filter((f) => !f.startsWith('viz-'));
const vizFamilies = STYLE_FAMILIES.filter((f) => f.startsWith('viz-'));

const CELL_MONO: React.CSSProperties = {
  fontFamily: 'var(--bbangto-typography-font-family-mono)',
  fontSize: 12,
  whiteSpace: 'nowrap',
};

const labelStyle: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: 12,
  color: 'var(--bbangto-semantic-foreground-muted)',
  fontFamily: 'var(--bbangto-typography-font-family-sans)',
};

const selectStyle: React.CSSProperties = {
  padding: '4px 8px',
  fontSize: 13,
  borderRadius: 'var(--bbangto-radius-sm)',
  border: '1px solid var(--bbangto-semantic-border-base)',
  backgroundColor: 'var(--bbangto-semantic-background-base)',
  color: 'var(--bbangto-semantic-foreground-base)',
};

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: string; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <label style={labelStyle}>
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={selectStyle}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const anyOpt = (values: readonly string[]) => [
  { value: 'any', label: 'any' },
  ...values.map((v) => ({ value: v, label: v })),
];

export interface CatalogDecisionTableProps {
  /** buildManifest(catalog) 결과. 스코어링 입력(SelectableEntry 만족). */
  entries: readonly ManifestEntry[];
  /** 'viz'면 priority 컬럼 생략 + family 옵션 viz-* union. */
  kind: 'ui' | 'viz';
}

/**
 * 인터랙티브 결정 테이블. 필터→selectStyleGuides 재랭크(score 내림차순 고정, 수동 정렬 없음).
 * Rank 1 행을 selected로 하이라이트해 "추천"을 명시한다.
 */
export function CatalogDecisionTable({ entries, kind }: CatalogDecisionTableProps) {
  const [filters, setFilters] = React.useState<DecisionFilters>(INITIAL_FILTERS);
  const set = <K extends keyof DecisionFilters>(k: K, v: DecisionFilters[K]) =>
    setFilters((prev) => ({ ...prev, [k]: v }));

  const ranked = React.useMemo(
    () => selectStyleGuides(entries, { ...criteriaFromFilters(filters), limit: entries.length }),
    [entries, filters]
  );

  const showPriority = kind === 'ui';
  const familyOptions = anyOpt(kind === 'viz' ? vizFamilies : uiFamilies);

  return (
    <div
      style={{
        fontFamily: 'var(--bbangto-typography-font-family-sans)',
        color: 'var(--bbangto-semantic-foreground-base)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: '100%',
      }}
    >
      <div>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>Catalog Decision Table</h2>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--bbangto-semantic-foreground-muted)' }}>
          필터로 채택 기준을 좁히면 <code>selectStyleGuides</code>가 후보를 스코어링·랭크합니다
          (score 내림차순, 상위 = 추천).
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
        <FilterSelect
          label="domain"
          value={filters.domain}
          options={anyOpt(DOMAINS)}
          onChange={(v) => set('domain', v as DecisionFilters['domain'])}
        />
        <FilterSelect
          label="family"
          value={filters.family}
          options={familyOptions}
          onChange={(v) => set('family', v as DecisionFilters['family'])}
        />
        <FilterSelect
          label="colorScheme"
          value={filters.colorScheme}
          options={anyOpt(['light', 'dark', 'both'])}
          onChange={(v) => set('colorScheme', v as DecisionFilters['colorScheme'])}
        />
        <FilterSelect
          label="min energy"
          value={String(filters.minEnergy)}
          options={[
            { value: '0', label: 'any' },
            ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `≥ ${n}` })),
          ]}
          onChange={(v) => set('minEnergy', Number(v))}
        />
      </div>

      <Table size="sm" variant="outlined" striped>
        <TableHead>
          <TableRow>
            <TableHeader>Rank</TableHeader>
            <TableHeader sortable sortDirection="desc">
              Score
            </TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Family</TableHeader>
            {showPriority && <TableHeader>Priority</TableHeader>}
            <TableHeader>Energy</TableHeader>
            <TableHeader>Color</TableHeader>
            <TableHeader>Domains</TableHeader>
            <TableHeader>Tags</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranked.map((r, i) => {
            const m = r.entry.meta;
            return (
              <TableRow key={r.name} selected={i === 0} data-name={r.name}>
                <TableCell style={CELL_MONO}>{i + 1}</TableCell>
                <TableCell style={CELL_MONO} data-score={r.score.toFixed(4)}>
                  {r.score.toFixed(2)}
                </TableCell>
                <TableCell title={m?.summary}>{m?.displayName ?? r.name}</TableCell>
                <TableCell style={CELL_MONO}>{m?.family ?? '—'}</TableCell>
                {showPriority && <TableCell style={CELL_MONO}>{m?.priority ?? '—'}</TableCell>}
                <TableCell style={CELL_MONO}>{m?.mood.energy ?? '—'}</TableCell>
                <TableCell style={CELL_MONO}>{m?.characteristics.colorScheme ?? '—'}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{m?.domains.join(', ') ?? '—'}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{m?.tags.join(', ') ?? '—'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
