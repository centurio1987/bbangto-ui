import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Halftone } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

/**
 * `Halftone` — canvas-based halftone dot background (Wave 3d, motion/shaders).
 *
 * Renders a grid of circles whose radii pulse over time, blended across
 * the supplied gradient colors. The effect recalls halftone printing but is
 * fully procedural and purely decorative.
 *
 * Under `prefers-reduced-motion: reduce` or when `static` is set, a single
 * static frame is drawn at t = 0 with no rAF loop.
 */
const meta = {
  title: 'Motion/Shaders/Halftone',
  component: Halftone,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Halftone>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated halftone with token-driven colors. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <Halftone {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // The wrapper container is present and carries data attribute
    const container = canvasElement.querySelector('[data-bbangto-halftone]');
    expect(container).not.toBeNull();

    // Both wrapper and inner canvas carry aria-hidden (purely decorative)
    const ariaHiddenEls = canvasElement.querySelectorAll('[aria-hidden="true"]');
    expect(ariaHiddenEls.length).toBeGreaterThan(0);

    // The decorative canvas element is present and aria-hidden
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();
  },
};

/**
 * Static snapshot — renders a single frame at t = 0, no animation loop.
 * Models the reduced-motion fallback visually.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <Halftone static {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Container renders with correct data attribute
    const container = canvasElement.querySelector('[data-bbangto-halftone]');
    expect(container).not.toBeNull();

    // Decorative canvas is present and accessible-hidden
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();

    // Confirm it is actually a canvas element
    const htmlCanvas = cvs as HTMLCanvasElement;
    expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');

    // The outer wrapper also carries aria-hidden
    const wrapper = canvasElement.querySelector('[data-bbangto-halftone][aria-hidden="true"]');
    expect(wrapper).not.toBeNull();
  },
};
