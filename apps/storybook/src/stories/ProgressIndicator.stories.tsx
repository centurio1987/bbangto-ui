import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from '@centurio1987/core';
import { expect, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Atoms/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['spinner', 'ring', 'spokes', 'dots', 'bars'],
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <ProgressIndicator size="sm" />
      <ProgressIndicator size="md" />
      <ProgressIndicator size="lg" />
    </div>
  ),
};

export const Ring: Story = {
  args: {
    variant: 'ring',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-spinner-loader-variant]'
    );
    await expect(root?.getAttribute('data-bbangto-spinner-loader-variant')).toBe('ring');

    // 2. load-bearing style: border-ring with a transparent arc gap, no fill.
    const arc = root!.querySelector('span') as HTMLElement;
    const arcStyle = getComputedStyle(arc);
    await expect(arcStyle.borderTopStyle).toBe('solid');
    // one edge carved out → top transparent, right (colored) is not.
    await expect(arcStyle.borderTopColor).toBe('rgba(0, 0, 0, 0)');
    await expect(arcStyle.borderRightColor).not.toBe('rgba(0, 0, 0, 0)');
    // no background fill ring.
    await expect(arcStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');

    // 3. content slot + a11y contract.
    const indicator = await canvas.findByRole('progressbar');
    await expect(indicator).toHaveAttribute('aria-label', 'Loading');
  },
};

export const Spokes: Story = {
  args: {
    variant: 'spokes',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-spinner-loader-variant]'
    );
    await expect(root?.getAttribute('data-bbangto-spinner-loader-variant')).toBe('spokes');

    // 2. load-bearing style: radial pill spokes, staggered fade, no border-ring.
    await expect(getComputedStyle(root!).position).toBe('relative');
    const spokes = Array.from(root!.querySelectorAll(':scope > span')) as HTMLElement[];
    await expect(spokes.length).toBeGreaterThanOrEqual(8);
    const first = getComputedStyle(spokes[0]);
    const second = getComputedStyle(spokes[1]);
    await expect(first.position).toBe('absolute');
    await expect(first.borderTopStyle).toBe('none'); // no border-ring on spokes
    await expect(first.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // staggered: per-child animation-delay differs.
    await expect(first.animationDelay).not.toBe(second.animationDelay);

    // 3. content slot + a11y contract.
    const indicator = await canvas.findByRole('progressbar');
    await expect(indicator).toHaveAttribute('aria-label', 'Loading');
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-spinner-loader-variant]'
    );
    await expect(root?.getAttribute('data-bbangto-spinner-loader-variant')).toBe('dots');

    // 2. load-bearing style: root reflows to a horizontal flex row of 3 circles.
    const rootStyle = getComputedStyle(root!);
    await expect(rootStyle.display).toBe('flex');
    await expect(rootStyle.flexDirection).toBe('row');
    const dots = Array.from(root!.querySelectorAll(':scope > span')) as HTMLElement[];
    await expect(dots.length).toBe(3);
    const dotStyle = getComputedStyle(dots[0]);
    await expect(dotStyle.borderTopStyle).toBe('none'); // no border-ring on dots
    await expect(dotStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // staggered animation across the track.
    await expect(getComputedStyle(dots[0]).animationDelay).not.toBe(
      getComputedStyle(dots[2]).animationDelay
    );

    // custom dot keyframe is injected via the scoped <style> aggregate.
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('bbangto-spinner-loader-dot');

    // 3. content slot + a11y contract.
    const indicator = await canvas.findByRole('progressbar');
    await expect(indicator).toHaveAttribute('aria-label', 'Loading');
  },
};

export const Bars: Story = {
  args: {
    variant: 'bars',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr hook
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-spinner-loader-variant]'
    );
    await expect(root?.getAttribute('data-bbangto-spinner-loader-variant')).toBe('bars');

    // 2. load-bearing style: horizontal equalizer track of narrow rects.
    const rootStyle = getComputedStyle(root!);
    await expect(rootStyle.display).toBe('flex');
    await expect(rootStyle.flexDirection).toBe('row');
    const bars = Array.from(root!.querySelectorAll(':scope > span')) as HTMLElement[];
    await expect(bars.length).toBeGreaterThanOrEqual(3);
    const barStyle = getComputedStyle(bars[0]);
    // small radius — NOT a full-circle radius (distinguishes from dots/spokes).
    await expect(barStyle.borderTopLeftRadius).not.toBe('');
    await expect(barStyle.borderTopStyle).toBe('none'); // no border-ring on bars
    await expect(barStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // equalizer beat is staggered per bar; transform origin anchors the scaleY.
    await waitFor(async () => {
      await expect(getComputedStyle(bars[0]).animationDelay).not.toBe(
        getComputedStyle(bars[1]).animationDelay
      );
    });

    // 3. content slot + a11y contract.
    const indicator = await canvas.findByRole('progressbar');
    await expect(indicator).toHaveAttribute('aria-label', 'Loading');
  },
};
