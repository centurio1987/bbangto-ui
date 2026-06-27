import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopNavigation, Button } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Organisms/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '375px', border: '1px solid #eee', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
      <TopNavigation
        leading={<button style={{background:'none',border:'none',cursor:'pointer'}}><BackIcon /></button>}
        title="Settings"
        trailing={<Button variant="text" size="sm">Save</Button>}
      />
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div style={{ width: '375px', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
      <TopNavigation
        variant="bordered"
        leading={<button aria-label="Back" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><BackIcon /></button>}
        title="Bordered"
        trailing={<Button variant="ghost" size="sm">Save</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-navbar-variant]') as HTMLElement;
    await expect(root).toHaveAttribute('data-bbangto-navbar-variant', 'bordered');

    // 2. load-bearing chrome: opaque fill + hairline bottom rule + zero elevation
    const cs = getComputedStyle(root);
    await expect(cs.boxShadow).toBe('none');
    await expect(cs.borderBottomStyle).toBe('solid');
    await expect(parseFloat(cs.borderBottomWidth)).toBeGreaterThan(0);
    await expect(cs.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

    // 3. a11y contract + content slots: banner landmark + leading→trailing focus order
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeVisible();
    const back = canvas.getByRole('button', { name: /back/i });
    const save = canvas.getByRole('button', { name: /save/i });
    back.focus();
    await expect(back).toHaveFocus();
    await userEvent.tab();
    await expect(save).toHaveFocus();
  },
};

export const Glass: Story = {
  render: () => (
    <div style={{ width: '375px', position: 'relative', height: '200px', backgroundImage: 'linear-gradient(135deg,#c8d8ff,#ffd6e7)' }}>
      <TopNavigation
        variant="glass"
        leading={<button aria-label="Back" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><BackIcon /></button>}
        title="Glass"
        trailing={<Button variant="ghost" size="sm">Save</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-navbar-variant]') as HTMLElement;
    await expect(root).toHaveAttribute('data-bbangto-navbar-variant', 'glass');

    // 2. load-bearing chrome: frosted backdrop blur so content shows through
    const cs = getComputedStyle(root);
    const filter = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || '';
    await expect(filter).toContain('blur');

    // 3. a11y contract + content slots: banner landmark + leading→trailing focus order
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeVisible();
    const back = canvas.getByRole('button', { name: /back/i });
    const save = canvas.getByRole('button', { name: /save/i });
    back.focus();
    await expect(back).toHaveFocus();
    await userEvent.tab();
    await expect(save).toHaveFocus();
  },
};

export const FloatingPill: Story = {
  render: () => (
    <div style={{ width: '800px', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
      <TopNavigation
        variant="floating-pill"
        leading={<button aria-label="Back" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><BackIcon /></button>}
        title="Floating"
        trailing={<Button variant="ghost" size="sm">Save</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-navbar-variant]') as HTMLElement;
    await expect(root).toHaveAttribute('data-bbangto-navbar-variant', 'floating-pill');

    // 2. load-bearing reflow: detached capsule — constrained, rounded, elevated
    const cs = getComputedStyle(root);
    await expect(cs.maxWidth).not.toBe('none');
    await expect(parseFloat(cs.borderTopLeftRadius)).toBeGreaterThan(50);
    await expect(cs.boxShadow).not.toBe('none');

    // 3. a11y contract + content slots: banner landmark + leading→trailing focus order
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeVisible();
    const back = canvas.getByRole('button', { name: /back/i });
    const save = canvas.getByRole('button', { name: /save/i });
    back.focus();
    await expect(back).toHaveFocus();
    await userEvent.tab();
    await expect(save).toHaveFocus();
  },
};
