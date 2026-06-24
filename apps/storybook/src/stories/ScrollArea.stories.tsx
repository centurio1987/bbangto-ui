import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@centurio1987/core';
import { expect, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper: generate tall content
const TallContent = () => (
  <div style={{ padding: '8px 16px' }}>
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i} style={{ margin: '8px 0', whiteSpace: 'nowrap' }}>
        Item {i + 1} — scroll content line
      </p>
    ))}
  </div>
);

// Helper: generate wide content
const WideContent = () => (
  <div style={{ padding: '8px 16px', display: 'flex', gap: '16px' }}>
    {Array.from({ length: 20 }, (_, i) => (
      <span key={i} style={{ whiteSpace: 'nowrap', padding: '4px 8px' }}>
        Column {i + 1}
      </span>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    orientation: 'vertical',
    maxHeight: 200,
    style: { width: 280, border: '1px solid #eee', borderRadius: 6 },
    children: <TallContent />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. The scroll container must be present
    const scrollEl = canvasElement.querySelector('[data-bbangto-scrollarea]') as HTMLElement;
    await expect(scrollEl).toBeTruthy();
    await expect(scrollEl).toBeVisible();

    // 2. Content overflows — scrollHeight must exceed clientHeight
    await waitFor(() => {
      expect(scrollEl.scrollHeight).toBeGreaterThan(scrollEl.clientHeight);
    });

    // 3. The container has tabIndex so keyboard scrolling works
    await expect(scrollEl.getAttribute('tabindex')).toBe('0');

    // 4. A child item is rendered
    const firstItem = canvas.getByText('Item 1 — scroll content line');
    await expect(firstItem).toBeVisible();
  },
};

export const HorizontalScroll: Story = {
  name: 'Horizontal',
  args: {
    orientation: 'horizontal',
    maxWidth: 320,
    style: { border: '1px solid #eee', borderRadius: 6 },
    children: <WideContent />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const scrollEl = canvasElement.querySelector('[data-bbangto-scrollarea]') as HTMLElement;
    await expect(scrollEl).toBeTruthy();

    await waitFor(() => {
      expect(scrollEl.scrollWidth).toBeGreaterThan(scrollEl.clientWidth);
    });
  },
};

export const BothAxes: Story = {
  name: 'Both Axes',
  args: {
    orientation: 'both',
    maxHeight: 200,
    maxWidth: 320,
    style: { border: '1px solid #eee', borderRadius: 6 },
    children: (
      <div style={{ padding: '8px 16px' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: '8px 0', whiteSpace: 'nowrap' }}>
            {`Row ${i + 1} — `.padEnd(4)} long content that extends horizontally beyond the container width
          </p>
        ))}
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const scrollEl = canvasElement.querySelector('[data-bbangto-scrollarea]') as HTMLElement;
    await expect(scrollEl).toBeTruthy();

    await waitFor(() => {
      expect(scrollEl.scrollHeight).toBeGreaterThan(scrollEl.clientHeight);
    });
  },
};

export const NoOverflow: Story = {
  name: 'No Overflow (short content)',
  args: {
    orientation: 'vertical',
    maxHeight: 300,
    style: { width: 280, border: '1px solid #eee', borderRadius: 6 },
    children: (
      <div style={{ padding: '8px 16px' }}>
        <p>Short content that does not overflow.</p>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const scrollEl = canvasElement.querySelector('[data-bbangto-scrollarea]') as HTMLElement;
    await expect(scrollEl).toBeTruthy();
    await expect(scrollEl).toBeVisible();
  },
};
