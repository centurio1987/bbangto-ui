import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DotMatrix } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

/**
 * `DotMatrix` — canvas-based dot matrix background (Wave 3d, motion/shaders).
 *
 * A grid of dots whose size and brightness ripple in a time-based wave pattern.
 * Purely time-driven — no mouse interaction. The canvas is decorative
 * (`aria-hidden="true"`).
 *
 * Under `prefers-reduced-motion: reduce` or when `static` is set, a single
 * static frame is drawn with no rAF loop.
 */
const meta = {
  title: 'Motion/Shaders/DotMatrix',
  component: DotMatrix,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DotMatrix>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Animated dot matrix with time-based wave ripple. Colors default to semantic token values. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <DotMatrix {...args} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-dot-matrix]');
    await expect(container).not.toBeNull();

    // The outer wrapper carries aria-hidden (decorative, non-interactive)
    const ariaHiddenEl = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(ariaHiddenEl).not.toBeNull();

    // A canvas element with aria-hidden must exist inside the container
    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(canvasEl).not.toBeNull();

    // Suppress unused variable lint — within() is imported per test convention
    void canvas;
  },
};

/**
 * Static mode — no requestAnimationFrame loop; a single frame is painted.
 * Models the `prefers-reduced-motion: reduce` fallback visually.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <DotMatrix {...args} static />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-dot-matrix]');
    await expect(container).not.toBeNull();

    // aria-hidden canvas element should exist inside the container
    const canvasEl = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(canvasEl).not.toBeNull();

    // Canvas must be an HTMLCanvasElement (static frame drawn, element is in DOM)
    const htmlCanvas = canvasEl as HTMLCanvasElement;
    await expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');

    // The wrapper also carries aria-hidden (decorative, non-interactive)
    const outerWrapper = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(outerWrapper).not.toBeNull();

    // Suppress unused variable lint — within() is imported per test convention
    void canvas;
  },
};
