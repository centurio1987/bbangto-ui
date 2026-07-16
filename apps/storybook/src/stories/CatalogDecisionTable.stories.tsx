import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from 'storybook/test';
import React from 'react';
import {
  buildManifest,
  styleGuideCatalog,
  styleGuideMap,
} from '@centurio1987/bbangto-ui-style-guide-catalog';
import { CatalogDecisionTable } from './_decisionTable';

/*
 * STYLE GUIDE CATALOG / _Decision Table — 매니페스트 채택 메타를 사람이 비교·선택하는 결정 테이블.
 * METADATA_STRATEGY §6 소비 흐름의 사람용 실현(필터→selectStyleGuides 재랭크, KAN-023).
 */

const uiEntries = buildManifest(styleGuideCatalog);
const authoredCount = styleGuideCatalog.filter((sg) => sg.meta).length;

// 개인정보/레거시 카피 회귀 가드 — DOM(text·attr) 어디에도 나타나면 안 되는 토큰.
const FORBIDDEN = [
  'centurio', 'ghkdldjwls', 'gmail.com', 'naver.com', 'github.io',
  '+82', '1026411626', '빵토', 'bbangto bakery', 'est. 2019',
];

const meta = {
  title: 'STYLE GUIDE CATALOG/_Decision Table',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const rowNames = (canvasElement: HTMLElement): string[] =>
  Array.from(canvasElement.querySelectorAll('tbody tr')).map(
    (tr) => tr.getAttribute('data-name') ?? ''
  );

export const Interactive: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <CatalogDecisionTable entries={uiEntries} kind="ui" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) 렌더 — 표 존재 + body row 수 === authored 엔트리 수(데이터 파생, 리터럴 아님).
    const table = await canvas.findByRole('table');
    expect(rowNames(canvasElement)).toHaveLength(authoredCount);

    // 2) 토큰 적용 — 표 fontFamily가 --bbangto-...-sans 변수로 해석됨(브라우저 기본 아님).
    const cs = getComputedStyle(table);
    const varVal = cs.getPropertyValue('--bbangto-typography-font-family-sans').trim();
    const resolved = cs.fontFamily;
    expect(varVal).not.toBe('');
    const firstFont = varVal.replace(/["']/g, '').split(',')[0].trim();
    expect(resolved.replace(/["']/g, '')).toContain(firstFont);

    // 3) 필터 재랭크(§6) — 관계적 검증(이름 하드코딩 없음).
    const topBefore = rowNames(canvasElement)[0];
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'domain' }), 'gaming');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'colorScheme' }), 'dark');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'min energy' }), '4');

    const names = rowNames(canvasElement);
    const topAfter = names[0];
    const topMeta = styleGuideMap[topAfter]?.meta;
    // (a) criteriaFromFilters 매핑 정확성: 최상위 행이 활성 필터를 모두 만족.
    expect(topMeta).toBeDefined();
    expect(topMeta!.domains).toContain('gaming');
    expect(['dark', 'both']).toContain(topMeta!.characteristics.colorScheme);
    expect(topMeta!.mood.energy).toBeGreaterThanOrEqual(4);
    // (b) 최상위 score가 최대.
    const scores = Array.from(canvasElement.querySelectorAll('tbody tr')).map((tr) =>
      Number(tr.querySelector('[data-score]')?.getAttribute('data-score') ?? '0')
    );
    expect(scores[0]).toBe(Math.max(...scores));
    // (c) 필터 전/후 최상위 행이 바뀜.
    expect(topAfter).not.toBe(topBefore);

    // 4) soft-weighted 비붕괴 — 좁은 필터에도 전 항목이 랭크된 채 유지.
    expect(names).toHaveLength(authoredCount);

    // 5) 개인정보 회귀 가드(broad) — innerHTML(text·title·aria-label·data-* 포함)에 부재.
    const html = canvasElement.innerHTML.toLowerCase();
    for (const token of FORBIDDEN) {
      expect(html.includes(token.toLowerCase())).toBe(false);
    }
  },
};
