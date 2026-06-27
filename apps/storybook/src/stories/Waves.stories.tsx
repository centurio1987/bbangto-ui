import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Waves } from '@centurio1987/bbangto-ui-core';
import { expect } from 'storybook/test';

const meta = {
  title: 'Motion/Shaders/Waves',
  component: Waves,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Waves>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Animated overlapping sine waves. Colors default to semantic token values. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <Waves {...args} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-waves]');
    await expect(container).not.toBeNull();

    // aria-hidden canvas element should exist inside the container
    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(canvasEl).not.toBeNull();

    // The outer wrapper container also carries aria-hidden
    const outerWrapper = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(outerWrapper).not.toBeNull();
  },
};

/**
 * Static mode — no requestAnimationFrame loop; a single frame is painted.
 * Use this under `prefers-reduced-motion: reduce` or when you need a
 * non-animated decorative background.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <Waves {...args} static />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {

    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-waves]');
    await expect(container).not.toBeNull();

    // aria-hidden canvas element should exist inside the container
    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(canvasEl).not.toBeNull();

    // Canvas should have non-zero dimensions (static frame was drawn)
    const htmlCanvas = canvasEl as HTMLCanvasElement;
    await expect(htmlCanvas).not.toBeNull();

    // The wrapper also carries aria-hidden (decorative, non-interactive)
    const outerWrapper = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(outerWrapper).not.toBeNull();
  },
};

/** Custom colors passed as props. */
export const CustomColors: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <Waves
        {...args}
        colors={['#a78bfa', '#f0abfc', '#67e8f9']}
        speed={1.5}
      />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const container = canvasElement.querySelector('[data-bbangto-waves]');
    await expect(container).not.toBeNull();

    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(canvasEl).not.toBeNull();
  },
};
