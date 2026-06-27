import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RippleBg } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

/**
 * `RippleBg` — canvas-based concentric ripple background (Wave 3d, motion/shaders).
 *
 * Circular waves emanate from the center and expand outward, fading as they grow.
 * The container and canvas are decorative (`aria-hidden="true"`).
 *
 * Under `prefers-reduced-motion: reduce` or when `static` is set, a single
 * static frame is drawn with no rAF loop.
 */
const meta = {
  title: 'Motion/Shaders/Ripple',
  component: RippleBg,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RippleBg>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Animated concentric ripple with token-driven colors. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <RippleBg {...args} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-ripple-bg]');
    expect(container).not.toBeNull();

    // The container carries aria-hidden (decorative)
    expect(container?.getAttribute('aria-hidden')).toBe('true');

    // Decorative canvas element should exist inside the container
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();
  },
};

/**
 * Static mode — no requestAnimationFrame loop; a single frame is painted.
 * Models the `prefers-reduced-motion: reduce` fallback visually.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280 }}>
      <RippleBg {...args} static />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Container div with data attribute should be present
    const container = canvasElement.querySelector('[data-bbangto-ripple-bg]');
    expect(container).not.toBeNull();

    // The container carries aria-hidden (decorative)
    expect(container?.getAttribute('aria-hidden')).toBe('true');

    // Decorative canvas must be present
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();

    // It is a real HTMLCanvasElement
    const htmlCanvas = cvs as HTMLCanvasElement;
    expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');
  },
};
