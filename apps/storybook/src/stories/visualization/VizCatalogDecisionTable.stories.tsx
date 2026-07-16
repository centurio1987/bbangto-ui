import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from 'storybook/test';
import React from 'react';
import {
  buildManifest,
  vizStyleGuideCatalog,
  vizStyleGuideMap,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { CatalogDecisionTable } from '../_decisionTable';

/*
 * VISUALIZATION STYLE GUIDE CATALOG / _Decision Table — viz 카탈로그(6종) 결정 테이블.
 * UI와 동일 CatalogDecisionTable 컴포넌트를 viz 데이터셋에 주입(kind='viz' → priority 컬럼 생략).
 */

const vizEntries = buildManifest(vizStyleGuideCatalog);
const authoredCount = vizStyleGuideCatalog.filter((sg) => sg.meta).length;

const FORBIDDEN = [
  'centurio', 'ghkdldjwls', 'gmail.com', 'naver.com', 'github.io',
  '+82', '1026411626', '빵토', 'bbangto bakery', 'est. 2019',
];

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/_Decision Table',
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
      <CatalogDecisionTable entries={vizEntries} kind="viz" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) 렌더 — 표 존재 + row 수 === viz authored 엔트리 수(6).
    const table = await canvas.findByRole('table');
    expect(rowNames(canvasElement)).toHaveLength(authoredCount);

    // Priority 컬럼 부재(viz meta엔 priority 없음).
    const headers = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent);
    expect(headers).not.toContain('Priority');

    // 2) 토큰 적용 — 표 fontFamily가 --bbangto-...-sans로 해석됨.
    const cs = getComputedStyle(table);
    const varVal = cs.getPropertyValue('--bbangto-typography-font-family-sans').trim();
    expect(varVal).not.toBe('');
    const firstFont = varVal.replace(/["']/g, '').split(',')[0].trim();
    expect(cs.fontFamily.replace(/["']/g, '')).toContain(firstFont);

    // 3) 필터 재랭크 — 다크·게이밍·고에너지 → 최상위 행 meta가 필터 만족(viz).
    const topBefore = rowNames(canvasElement)[0];
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'domain' }), 'gaming');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'colorScheme' }), 'dark');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'min energy' }), '4');

    const names = rowNames(canvasElement);
    const topMeta = vizStyleGuideMap[names[0]]?.meta;
    expect(topMeta).toBeDefined();
    expect(topMeta!.family.startsWith('viz-')).toBe(true);
    expect(topMeta!.domains).toContain('gaming');
    expect(['dark', 'both']).toContain(topMeta!.characteristics.colorScheme);
    expect(topMeta!.mood.energy).toBeGreaterThanOrEqual(4);
    expect(names[0]).not.toBe(topBefore);

    // 4) soft-weighted 비붕괴.
    expect(names).toHaveLength(authoredCount);

    // 5) 개인정보 회귀 가드.
    const html = canvasElement.innerHTML.toLowerCase();
    for (const token of FORBIDDEN) {
      expect(html.includes(token.toLowerCase())).toBe(false);
    }
  },
};
