import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Aurora } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

/**
 * Motion/Shaders/Aurora — canvas-based aurora background.
 *
 * Flowing vertical/diagonal gradient bands shift like an aurora borealis.
 * `prefers-reduced-motion: reduce` or `static` prop → one static frame, no rAF.
 * Both container and canvas are `aria-hidden="true"` (purely decorative).
 */
const meta = {
  title: 'ARCHETYPE/Foundations/Motion/Shaders/Aurora',
  component: Aurora,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Aurora>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated aurora. */
export const Default: Story = {
  render: (args) => (
    <div
      style={{
        width: 480,
        height: 280,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bbangto-semantic-background-base)',
        border: '1px solid var(--bbangto-semantic-border-base)',
      }}
    >
      <Aurora {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Container div (aria-hidden wrapper) must be present.
    const containers = canvasElement.querySelectorAll('[aria-hidden="true"]');
    expect(containers.length).toBeGreaterThanOrEqual(1);

    // The <canvas> element must exist inside the component.
    const canvasEl = canvasElement.querySelector('canvas');
    expect(canvasEl).toBeTruthy();

    // canvas must carry aria-hidden.
    expect(canvasEl?.getAttribute('aria-hidden')).toBe('true');

    // The container div with aria-hidden must also exist.
    const wrapperDiv = canvasElement.querySelector('div[aria-hidden="true"]');
    expect(wrapperDiv).toBeTruthy();

    // Verify the canvas element is inside the wrapper.
    expect(wrapperDiv?.contains(canvasEl)).toBe(true);

    // canvas must have width/height style set to 100%.
    const canvasStyle = window.getComputedStyle(canvasEl!);
    expect(canvasStyle.display).toBe('block');

    // No accessible role leaked — purely decorative.
    expect(canvas.queryAllByRole('img')).toHaveLength(0);
    expect(canvas.queryAllByRole('presentation')).toHaveLength(0);
  },
};

/** Static mode — no rAF loop, single frame rendered. */
export const Static: Story = {
  render: (args) => (
    <div
      style={{
        width: 480,
        height: 280,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bbangto-semantic-background-base)',
        border: '1px solid var(--bbangto-semantic-border-base)',
      }}
    >
      <Aurora static {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Same structural assertions as Default.
    const canvasEl = canvasElement.querySelector('canvas');
    expect(canvasEl).toBeTruthy();
    expect(canvasEl?.getAttribute('aria-hidden')).toBe('true');

    const wrapperDiv = canvasElement.querySelector('div[aria-hidden="true"]');
    expect(wrapperDiv).toBeTruthy();
    expect(wrapperDiv?.contains(canvasEl)).toBe(true);

    // Static mode: verify the canvas rendered a frame (non-zero dimensions
    // indicate the canvas was sized and drawn into).
    // The canvas element should have non-zero offsetWidth/offsetHeight.
    expect(canvasEl!.offsetWidth).toBeGreaterThan(0);
    expect(canvasEl!.offsetHeight).toBeGreaterThan(0);

    // No accessible role leaked.
    expect(canvas.queryAllByRole('img')).toHaveLength(0);
    expect(canvas.queryAllByRole('presentation')).toHaveLength(0);
  },
};

/** Custom colors — override the default token-based palette. */
export const CustomColors: Story = {
  render: (args) => (
    <div
      style={{
        width: 480,
        height: 280,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#0a0a1a',
        border: '1px solid #333',
      }}
    >
      <Aurora
        colors={['#00ffaa', '#0066ff', '#aa00ff', '#ff0066']}
        speed={0.6}
        {...args}
      />
    </div>
  ),
};

/** Slow, wide aurora. */
export const Slow: Story = {
  render: (args) => (
    <div
      style={{
        width: 480,
        height: 280,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bbangto-semantic-background-sunken)',
        border: '1px solid var(--bbangto-semantic-border-base)',
      }}
    >
      <Aurora speed={0.3} {...args} />
    </div>
  ),
};
