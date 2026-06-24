import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ParticleField } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

/**
 * Motion/Shaders/ParticleField — canvas-based decorative particle background.
 *
 * Floating dot particles drift slowly; nearby pairs are connected by faint
 * lines. Fully respects `prefers-reduced-motion`: when reduced motion is
 * preferred (or `static` prop is set), a single frozen frame is rendered
 * without any `requestAnimationFrame` loop.
 *
 * The component is purely decorative (`aria-hidden="true"` on both the
 * container div and the inner `<canvas>`), so it never reaches assistive
 * technology.
 */
const meta = {
  title: 'Motion/Shaders/ParticleField',
  component: ParticleField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ParticleField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated particle field at 480 × 280. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, background: 'var(--bbangto-semantic-background-elevated, #1a1a2e)', borderRadius: 8 }}>
      <ParticleField {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Container div should be present.
    const container = canvasElement.querySelector('[data-bbangto-particle-field]');
    await expect(container).not.toBeNull();

    // The inner <canvas> should exist and carry aria-hidden.
    const cvs = container?.querySelector('canvas');
    await expect(cvs).not.toBeNull();
    await expect(cvs?.getAttribute('aria-hidden')).toBe('true');

    // The wrapping container div should also be aria-hidden (purely decorative).
    await expect((container as HTMLElement | null)?.getAttribute('aria-hidden')).toBe('true');

    // Confirm the canvas has been sized (ResizeObserver / useEffect ran).
    // We just verify the element exists in the DOM — size may still be 0 in
    // Storybook's JSDOM-like layout, but the element is mounted correctly.
    void canvas; // suppress unused import warning
  },
};

/** Static (no animation) variant via the `static` prop. */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, background: 'var(--bbangto-semantic-background-elevated, #1a1a2e)', borderRadius: 8 }}>
      <ParticleField {...args} static />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Container and canvas must still render correctly in static mode.
    const container = canvasElement.querySelector('[data-bbangto-particle-field]');
    await expect(container).not.toBeNull();

    const cvs = container?.querySelector('canvas');
    await expect(cvs).not.toBeNull();
    await expect(cvs?.getAttribute('aria-hidden')).toBe('true');

    // Static prop: no rAF loop runs, but the element is mounted and the
    // single draw call does not throw.  We verify the element is visible.
    await expect((container as HTMLElement).style.overflow).toBe('hidden');
  },
};

/** Custom color palette example. */
export const CustomColors: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, background: '#0f172a', borderRadius: 8 }}>
      <ParticleField
        {...args}
        colors={['rgba(251,191,36,0.9)', 'rgba(251,191,36,0.2)']}
      />
    </div>
  ),
};

/** Slow-speed variant. */
export const SlowSpeed: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, background: 'var(--bbangto-semantic-background-base, #fff)', borderRadius: 8, border: '1px solid var(--bbangto-semantic-border-base)' }}>
      <ParticleField
        {...args}
        speed={0.3}
        colors={['var(--bbangto-semantic-primary-base)', 'var(--bbangto-semantic-primary-subtle)']}
      />
    </div>
  ),
};
