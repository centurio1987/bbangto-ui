import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Noise } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Motion/Shaders/Noise',
  component: Noise,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Noise>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default animated film-grain noise texture background.
 * The grain shifts each frame using a seeded LCG — no Math.random() or
 * Date.now() in the render path.
 */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <Noise {...args} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // `within` scopes queries to the story render root.
    const canvas = within(canvasElement);

    // The wrapping fixed-size div is the direct parent; verify it rendered.
    // (within's container is that outer div's first child — the Noise root.)
    const noiseRoot = canvasElement.querySelector('[data-bbangto-noise]');
    expect(noiseRoot).not.toBeNull();

    // The root carries aria-hidden — purely decorative, no accessible label needed.
    expect(noiseRoot?.getAttribute('aria-hidden')).toBe('true');

    // canvas[aria-hidden] should exist inside the noise root.
    // We also verify the within helper exposes a functioning query object.
    expect(typeof canvas.queryAllByRole).toBe('function');
    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(canvasEl).not.toBeNull();
  },
};

/**
 * Static mode — a single deterministic frame is painted with no rAF loop.
 * Use when `prefers-reduced-motion: reduce` is active or when you need a
 * non-animated decorative background.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <Noise {...args} static />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // `within` scopes queries to the story render root.
    const canvas = within(canvasElement);

    // Container with data attribute should be present.
    const noiseRoot = canvasElement.querySelector('[data-bbangto-noise]');
    expect(noiseRoot).not.toBeNull();

    // The root carries aria-hidden (decorative, non-interactive).
    expect(noiseRoot?.getAttribute('aria-hidden')).toBe('true');

    // Verify the within helper is functional.
    expect(typeof canvas.queryAllByRole).toBe('function');

    // canvas[aria-hidden] should be present and be an HTMLCanvasElement.
    const canvasEl = canvasElement.querySelector(
      'canvas[aria-hidden="true"]',
    ) as HTMLCanvasElement | null;
    expect(canvasEl).not.toBeNull();
    expect(canvasEl?.tagName.toLowerCase()).toBe('canvas');
  },
};
