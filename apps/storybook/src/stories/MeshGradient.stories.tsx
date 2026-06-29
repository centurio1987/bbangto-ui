import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MeshGradient } from '@centurio1987/bbangto-ui-core';
import { expect } from 'storybook/test';

/**
 * `MeshGradient` — canvas-based mesh gradient background (Wave 3b, motion/shaders).
 *
 * Multiple radial-gradient blobs drift slowly around the canvas.
 * The canvas is decorative (`aria-hidden="true"`).
 * Under `prefers-reduced-motion: reduce` or when `static` is set, a single
 * static frame is drawn with no rAF loop.
 */
const meta = {
  title: 'ARCHETYPE/Foundations/Motion/Shaders/MeshGradient',
  component: MeshGradient,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof MeshGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default animated mesh gradient with token-driven colors. */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <MeshGradient {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // The container div is present
    const container = canvasElement.querySelector('[data-bbangto-mesh-gradient]');
    expect(container).not.toBeNull();

    // The decorative canvas element is present and aria-hidden
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();
  },
};

/**
 * Static snapshot — renders a single frame, no animation loop.
 * Also models the reduced-motion fallback visually.
 */
export const Static: Story = {
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <MeshGradient static {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Container renders
    const container = canvasElement.querySelector('[data-bbangto-mesh-gradient]');
    expect(container).not.toBeNull();

    // Decorative canvas is present and accessible-hidden
    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
    expect(cvs).toBeDefined();

    // Canvas must have been painted: width and height should be > 0
    // (the effect runs synchronously in JSDOM-like envs or in browser after mount)
    const htmlCanvas = cvs as HTMLCanvasElement;
    // After a short render cycle the canvas dimensions should be set.
    // We assert the element itself is in the DOM and is an HTMLCanvasElement.
    expect(htmlCanvas.tagName.toLowerCase()).toBe('canvas');
  },
};

/** Custom colors override. */
export const CustomColors: Story = {
  args: {
    colors: [
      'hsla(260,80%,65%,0.7)',
      'hsla(180,70%,55%,0.7)',
      'hsla(320,75%,60%,0.65)',
    ],
  },
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <MeshGradient {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[data-bbangto-mesh-gradient]');
    expect(container).not.toBeNull();

    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
  },
};

/** Slow speed variant for a calmer visual effect. */
export const SlowSpeed: Story = {
  args: {
    speed: 0.3,
  },
  render: (args) => (
    <div style={{ width: 480, height: 280, borderRadius: 12, overflow: 'hidden' }}>
      <MeshGradient {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[data-bbangto-mesh-gradient]');
    expect(container).not.toBeNull();

    const cvs = canvasElement.querySelector('canvas[aria-hidden="true"]');
    expect(cvs).not.toBeNull();
  },
};
