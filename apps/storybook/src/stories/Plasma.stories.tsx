import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Plasma } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

/**
 * `Plasma` — canvas-based classic plasma background (Wave 3d, motion/shaders).
 *
 * Produces a smoothly flowing multi-colour field by summing several sine
 * functions over a pixel grid — the "plasma" effect popularised in the demoscene.
 * The canvas and its container are decorative (`aria-hidden="true"`).
 *
 * Under `prefers-reduced-motion: reduce` or when `static` is set, a single
 * static frame is drawn at t = 0 with no rAF loop.
 */
const meta = {
  title: 'Motion/Shaders/Plasma',
  component: Plasma,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Plasma>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated plasma with token-driven colors. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <Plasma {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The container div carrying the data attribute should be present.
    const container = canvasElement.querySelector('[data-bbangto-plasma]');
    expect(container).not.toBeNull();

    // The decorative canvas element must be present and aria-hidden.
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();

    // The outer wrapper also carries aria-hidden (fully decorative subtree).
    const ariaHidden = canvasElement.querySelector('[aria-hidden="true"]');
    expect(ariaHidden).not.toBeNull();

    // Suppress unused-variable warning from the `canvas` helper.
    void canvas;
  },
};

/**
 * Static snapshot — renders a single frame, no animation loop.
 * Also models the reduced-motion fallback visually.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <Plasma static {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Container renders with data attribute.
    const container = canvasElement.querySelector('[data-bbangto-plasma]');
    expect(container).not.toBeNull();

    // Decorative canvas is present and accessible-hidden.
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();

    // Element must be a canvas tag.
    const htmlCanvas = cvs as HTMLCanvasElement;
    expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');

    void canvas;
  },
};
