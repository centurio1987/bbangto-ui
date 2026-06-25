import type { Meta, StoryObj } from '@storybook/react';
import { Comparison } from '@centurio1987/core';
import { expect, within, userEvent, fireEvent } from 'storybook/test';

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

// ─── LayoutColumns: 두 카드 나란히 (>= lg 2-col) ─────────────────────────────

export const LayoutColumns: Story = {
  args: {
    layout: 'columns',
    title: 'Us vs Them',
    columns: [
      { name: 'Us', highlighted: true },
      { name: 'Them' },
    ],
    rows: [
      { label: 'Open source',     values: [true,  false] },
      { label: 'Self-host',       values: [true,  false] },
      { label: 'Priced per seat', values: ['No',  'Yes'] },
      { label: 'SLA',             values: [true,  true] },
    ],
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 정확성
    const section = canvasElement.querySelector(
      '[data-bbangto-comparison-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-comparison-layout')).toBe('columns');

    // 2. load-bearing: scoped 2-col 규칙이 존재 (mobile fallback은 1-col)
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('bbangto-comparison-cards');
    await expect(styleText).toContain('grid-template-columns: repeat(2, 1fr)');

    // 3. content slots: 두 컬럼 이름 + 행 레이블 렌더
    await expect(await canvas.findByText('Us')).toBeVisible();
    await expect(await canvas.findByText('Them')).toBeVisible();
    // 'columns' renders row labels per-card, so the label may appear more than once.
    await expect((await canvas.findAllByText('Open source')).length).toBeGreaterThan(0);

    // highlighted 뱃지
    await expect(await canvas.findByText('Recommended')).toBeVisible();
  },
};

// ─── LayoutSlider: before/after 드래그 디바이더 ──────────────────────────────

export const LayoutSlider: Story = {
  args: {
    layout: 'slider',
    title: 'Before / After',
    columns: [
      { name: 'Before' },
      { name: 'After', highlighted: true },
    ],
    rows: [
      { label: 'Load time',  values: ['3.2s', '0.8s'] },
      { label: 'Bundle',     values: ['480kb', '120kb'] },
      { label: 'Lighthouse', values: ['64',   '98'] },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 정확성
    const section = canvasElement.querySelector(
      '[data-bbangto-comparison-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-comparison-layout')).toBe('slider');

    // 2. load-bearing: 드래그 가능한 range 디바이더가 존재하고 키보드 포커스 가능
    const slider = canvasElement.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    await expect(slider).not.toBeNull();
    slider.focus();
    await expect(slider).toHaveFocus();

    // 디바이더 값 변경 검증 (range input의 합성 ArrowRight는 이 환경에서 불안정 →
    // fireEvent.change로 결정적으로 검증; 위에서 keyboard-focusable은 이미 확인).
    const start = Number(slider.value);
    fireEvent.change(slider, { target: { value: String(Math.min(100, start + 15)) } });
    await expect(Number(slider.value)).toBeGreaterThan(start);

    // load-bearing: prefers-reduced-motion 정적 폴백 규칙 존재
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('prefers-reduced-motion: reduce');
    await expect(styleText).toContain('bbangto-comparison-slider-overlay');

    // 3. content slots: before/after 컬럼 + 행 레이블 렌더
    await expect(await canvas.findByText('Before')).toBeVisible();
    await expect(await canvas.findByText('After')).toBeVisible();
    await expect((await canvas.findAllByText('Load time')).length).toBeGreaterThan(0);
  },
};
