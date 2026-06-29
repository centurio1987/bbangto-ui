import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Metaballs } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

/**
 * `Metaballs` — canvas-based metaball background (Wave 3d, motion/shaders).
 *
 * Several round blobs drift around the canvas. When they approach each other
 * they merge into organic, fluid shapes — the classic metaball effect
 * approximated via radial-gradient compositing on a 2D canvas.
 *
 * Both the container div and the `<canvas>` are `aria-hidden="true"` (purely
 * decorative). Under `prefers-reduced-motion: reduce`, or when the `static`
 * prop is set, a single static frame is rendered with no rAF loop.
 */
const meta = {
  title: 'ARCHETYPE/Foundations/Motion/Shaders/Metaballs',
  component: Metaballs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Metaballs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated metaballs with token-driven colors. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <Metaballs {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The container div with the data attribute is present.
    const container = canvasElement.querySelector('[data-bbangto-metaballs]');
    await expect(container).not.toBeNull();

    // The decorative canvas element is present and aria-hidden.
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(cvs).not.toBeNull();

    // The outer wrapper also carries aria-hidden (decorative).
    const outerWrapper = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(outerWrapper).not.toBeNull();

    // canvas is an HTMLCanvasElement
    const htmlCanvas = cvs as HTMLCanvasElement;
    await expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');

    // within is imported and usable
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
      <Metaballs static {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Container div with data attribute is present.
    const container = canvasElement.querySelector('[data-bbangto-metaballs]');
    await expect(container).not.toBeNull();

    // Decorative canvas is present and accessible-hidden.
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    await expect(cvs).not.toBeNull();

    // Canvas must be an HTMLCanvasElement.
    const htmlCanvas = cvs as HTMLCanvasElement;
    await expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');

    // Outer wrapper carries aria-hidden.
    const outerWrapper = canvasElement.querySelector('[aria-hidden="true"]');
    await expect(outerWrapper).not.toBeNull();
  },
};
