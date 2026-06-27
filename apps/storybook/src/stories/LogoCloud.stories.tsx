import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Blocks/LogoCloud',
  component: LogoCloud,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Placeholder logo rendered as a styled text badge — no external image needed. */
const TextLogo = ({ name }: { name: string }) => (
  <span
    style={{
      fontWeight: 700,
      fontSize: '1.1rem',
      letterSpacing: '-0.02em',
      color: 'var(--bbangto-semantic-foreground-muted)',
      userSelect: 'none',
    }}
  >
    {name}
  </span>
);

const sampleLogos = [
  { node: <TextLogo name="Acme Corp" />, alt: 'Acme Corp' },
  { node: <TextLogo name="Globex" />, alt: 'Globex' },
  { node: <TextLogo name="Initech" />, alt: 'Initech' },
  { node: <TextLogo name="Umbrella" />, alt: 'Umbrella' },
  { node: <TextLogo name="Veridian" />, alt: 'Veridian' },
  { node: <TextLogo name="Soylent" />, alt: 'Soylent' },
];

export const Default: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Section heading is rendered
    const heading = await canvas.findByText('Trusted by industry leaders');
    await expect(heading).toBeVisible();

    // 2. All logo items are rendered
    const list = canvasElement.querySelector('[role="list"]');
    await expect(list).not.toBeNull();
    const items = canvasElement.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);

    // 3. First logo text is visible
    const firstLogo = await canvas.findByText('Acme Corp');
    await expect(firstLogo).toBeVisible();
  },
};

export const WithoutTitle: Story = {
  args: {
    logos: sampleLogos,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // No heading should be present
    const headingEl = canvas.queryByText('Trusted by industry leaders');
    await expect(headingEl).toBeNull();

    // Logos are still rendered
    const items = canvasElement.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
  },
};

/** Aggregate ALL <style> tag text so we never grab a stray global @import sheet. */
const aggregateStyles = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

export const LayoutMarquee: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
    layout: 'marquee',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute is present with the right value
    const section = canvasElement.querySelector(
      '[data-bbangto-logocloud-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-logocloud-layout')).toBe(
      'marquee'
    );

    // 2a. Load-bearing: the scoped animation rule is present in aggregated <style>.
    const styles = aggregateStyles(canvasElement);
    await expect(styles).toContain('@keyframes bbangto-logocloud-scroll');
    await expect(styles).toContain(
      'animation: bbangto-logocloud-scroll'
    );

    // 2b. Load-bearing: prefers-reduced-motion fallback disables the animation.
    await expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    await expect(styles).toContain('animation: none');

    // The animated track carries the scoped class.
    const track = canvasElement.querySelector('.bbangto-logocloud-marquee-track');
    await expect(track).not.toBeNull();

    // 3. Logos still render (real list track has the named logos).
    const firstLogo = await canvas.findAllByText('Acme Corp');
    await expect(firstLogo.length).toBeGreaterThan(0);
    const list = canvasElement.querySelector('[role="list"]');
    await expect(list).not.toBeNull();
    const items = list!.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
  },
};

export const LayoutInline: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
    layout: 'inline',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute.
    const section = canvasElement.querySelector(
      '[data-bbangto-logocloud-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-logocloud-layout')).toBe(
      'inline'
    );

    // 2. Load-bearing: single row flex (row, no wrap).
    const list = canvasElement.querySelector('[role="list"]') as HTMLElement | null;
    await expect(list).not.toBeNull();
    const listStyle = getComputedStyle(list!);
    await expect(listStyle.display).toBe('flex');
    await expect(listStyle.flexDirection).toBe('row');
    await expect(listStyle.flexWrap).toBe('nowrap');

    // 3. Logos render.
    const items = list!.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
    const firstLogo = await canvas.findByText('Acme Corp');
    await expect(firstLogo).toBeVisible();
  },
};

export const LayoutBordered: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
    layout: 'bordered',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute.
    const section = canvasElement.querySelector(
      '[data-bbangto-logocloud-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-logocloud-layout')).toBe(
      'bordered'
    );

    // 2. Load-bearing: grid container + cells have solid borders (dividers).
    const list = canvasElement.querySelector('[role="list"]') as HTMLElement | null;
    await expect(list).not.toBeNull();
    await expect(getComputedStyle(list!).display).toBe('grid');

    const items = list!.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
    const cellStyle = getComputedStyle(items[0] as HTMLElement);
    await expect(cellStyle.borderRightStyle).toBe('solid');
    await expect(cellStyle.borderBottomStyle).toBe('solid');

    // 3. Logos render.
    const firstLogo = await canvas.findByText('Acme Corp');
    await expect(firstLogo).toBeVisible();
  },
};

export const ScrollColumns: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
    layout: 'scroll-columns',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute is present with the right value.
    const section = canvasElement.querySelector(
      '[data-bbangto-logocloud-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-logocloud-layout')).toBe(
      'scroll-columns'
    );

    // 2a. Load-bearing: BOTH vertical scroll keyframes + reduced-motion fallback
    //     are present in the aggregated <style> text.
    const styles = aggregateStyles(canvasElement);
    await expect(styles).toContain('@keyframes bbangto-logocloud-scroll-up');
    await expect(styles).toContain('@keyframes bbangto-logocloud-scroll-down');
    await expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    await expect(styles).toContain('animation: none');

    // 2b. Load-bearing: viewport is a horizontal flex of multiple VERTICAL
    //     tracks, clipped, with a vertical mask-image edge fade and no border.
    const viewport = canvasElement.querySelector(
      '.bbangto-logocloud-scroll-viewport'
    ) as HTMLElement | null;
    await expect(viewport).not.toBeNull();
    const viewportStyle = getComputedStyle(viewport!);
    await expect(viewportStyle.flexDirection).toBe('row');
    await expect(viewportStyle.overflow).toBe('hidden');
    await expect(viewportStyle.borderTopStyle).toBe('none');
    const mask =
      viewportStyle.maskImage ||
      viewportStyle.getPropertyValue('-webkit-mask-image');
    await expect(mask).toContain('linear-gradient');

    // Multiple columns, each laid out as a vertical track.
    const columns = canvasElement.querySelectorAll(
      '.bbangto-logocloud-column'
    );
    await expect(columns.length).toBe(3);
    const track = canvasElement.querySelector(
      '.bbangto-logocloud-column-track'
    ) as HTMLElement | null;
    await expect(track).not.toBeNull();
    await expect(getComputedStyle(track!).flexDirection).toBe('column');

    // 3. Logos render: the real (non-clone) listitems are the sample logos.
    const list = canvasElement.querySelector('[role="list"]');
    await expect(list).not.toBeNull();
    const items = list!.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
    const firstLogo = await canvas.findAllByText('Acme Corp');
    await expect(firstLogo.length).toBeGreaterThan(0);
  },
};
