import type { Meta, StoryObj } from '@storybook/react';
import { Comparison } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Blocks/Comparison',
  component: Comparison,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Comparison>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default: 플랜 기능 비교표 ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Compare plans',
    columns: [
      { name: 'Free' },
      { name: 'Pro', highlighted: true },
      { name: 'Enterprise' },
    ],
    rows: [
      { label: 'Projects',         values: ['3',   'Unlimited', 'Unlimited'] },
      { label: 'Team members',     values: ['1',   '10',        'Unlimited'] },
      { label: 'Storage',          values: ['1 GB', '50 GB',   'Custom'] },
      { label: 'Analytics',        values: [false,  true,       true] },
      { label: 'Custom domain',    values: [false,  true,       true] },
      { label: 'Priority support', values: [false,  false,      true] },
      { label: 'SLA guarantee',    values: [false,  false,      true] },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 제목 렌더링 확인
    const heading = await canvas.findByText('Compare plans');
    await expect(heading).toBeVisible();

    // 2. 컬럼 헤더 확인
    const proHeader = await canvas.findByText('Pro');
    await expect(proHeader).toBeVisible();

    // 3. "Recommended" 뱃지가 highlighted 컬럼에 표시되는지
    const badge = await canvas.findByText('Recommended');
    await expect(badge).toBeVisible();

    // 4. 행 레이블 확인
    const analyticsLabel = await canvas.findByText('Analytics');
    await expect(analyticsLabel).toBeVisible();

    // 5. boolean true → "included" aria-label 셀이 존재하는지
    const checks = canvasElement.querySelectorAll('[aria-label="included"]');
    await expect(checks.length).toBeGreaterThan(0);

    // 6. boolean false → "not included" aria-label 셀이 존재하는지
    const dashes = canvasElement.querySelectorAll('[aria-label="not included"]');
    await expect(dashes.length).toBeGreaterThan(0);

    // 7. role="table" 존재 확인 (접근성 시맨틱)
    const table = canvasElement.querySelector('[role="table"]');
    await expect(table).not.toBeNull();
  },
};

// ─── NoTitle: 제목 없이 사용하는 케이스 ─────────────────────────────────────

export const NoTitle: Story = {
  args: {
    columns: [
      { name: 'Starter' },
      { name: 'Growth', highlighted: true },
    ],
    rows: [
      { label: 'API calls / mo',  values: ['10k',    '500k'] },
      { label: 'Webhooks',        values: [false,     true] },
      { label: 'Team access',     values: [false,     true] },
      { label: 'Audit log',       values: [false,     true] },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 제목 없이 렌더링되는지 확인
    const starterHeader = await canvas.findByText('Starter');
    await expect(starterHeader).toBeVisible();

    // highlighted 컬럼 뱃지
    const badge = await canvas.findByText('Recommended');
    await expect(badge).toBeVisible();

    // 행 개수 확인: 4개 rows → 4개 rowheader
    const rowHeaders = canvasElement.querySelectorAll('[role="rowheader"]');
    await expect(rowHeaders.length).toBe(4);
  },
};
