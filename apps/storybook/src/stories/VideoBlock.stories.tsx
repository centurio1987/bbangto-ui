import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VideoBlock } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Blocks/VideoBlock',
  component: VideoBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    poster: { control: 'text' },
    title: { control: 'text' },
    caption: { control: 'text' },
  },
} satisfies Meta<typeof VideoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story: video with title and caption.
 * play() verifies the title, caption, and video element are rendered.
 */
export const Default: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://www.w3schools.com/html/pic_trulli.jpg',
    title: 'Big Buck Bunny — Preview Clip',
    caption: 'An open-source animated short film produced by the Blender Foundation.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Heading rendered
    const heading = await canvas.findByRole('heading', { name: /Big Buck Bunny/i });
    await expect(heading).toBeVisible();

    // 2. Video element rendered with controls
    const video = canvasElement.querySelector('video');
    await expect(video).not.toBeNull();
    await expect(video!.hasAttribute('controls')).toBe(true);

    // 3. Caption rendered
    const caption = await canvas.findByText(/Blender Foundation/i);
    await expect(caption).toBeVisible();

    // 4. Poster attribute set
    await expect(video!.getAttribute('poster')).toContain('pic_trulli');
  },
};

/**
 * MinimalSlots story: only the src is required — title and caption are optional.
 */
export const MinimalSlots: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // No heading when title is omitted
    const headings = canvas.queryAllByRole('heading');
    await expect(headings).toHaveLength(0);

    // Video still renders
    const video = canvasElement.querySelector('video');
    await expect(video).not.toBeNull();
    await expect(video!.getAttribute('src')).toContain('mov_bbb');
  },
};

/**
 * LayoutSplit: text/content beside the video, 2-column at ≥ lg via scoped style.
 */
export const LayoutSplit: Story = {
  args: {
    layout: 'split',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://www.w3schools.com/html/pic_trulli.jpg',
    title: 'Product Walkthrough',
    content: <p>A short tour of the key features, narrated end to end.</p>,
    caption: 'Recorded in 1080p.',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const section = canvasElement.querySelector('section');
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-videoblock-layout')).toBe('split');

    // 2. load-bearing: scoped 2-col rule emitted at ≥ lg
    const css = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(css).toContain('bbangto-videoblock-split');
    await expect(css).toContain('grid-template-columns: 1fr 1fr');

    // 3. content slots render: heading, supporting content, video player
    await expect(
      await canvas.findByRole('heading', { name: /Product Walkthrough/i })
    ).toBeVisible();
    await expect(canvas.getByText(/key features/i)).toBeVisible();
    const video = canvasElement.querySelector('video');
    await expect(video).not.toBeNull();
    await expect(video!.hasAttribute('controls')).toBe(true);
  },
};

/**
 * LayoutGridGallery: several square video tiles reflow inside one uniform CSS
 * grid (2-col → 3-col at ≥ lg).
 */
export const LayoutGridGallery: Story = {
  args: {
    layout: 'grid-gallery',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://www.w3schools.com/html/pic_trulli.jpg',
    title: 'Clip Gallery',
    caption: 'A grid of short clips.',
    tiles: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://www.w3schools.com/html/movie.mp4',
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://www.w3schools.com/html/movie.mp4',
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const section = canvasElement.querySelector('section');
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-videoblock-layout')).toBe(
      'grid-gallery'
    );

    // 2. load-bearing: grid container has multiple column tracks, and the scoped
    //    reflow rule promotes the gallery to 3 columns at ≥ lg.
    const grid = canvasElement.querySelector<HTMLElement>(
      '.bbangto-videoblock-gallery'
    );
    await expect(grid).not.toBeNull();
    const tracks = getComputedStyle(grid!)
      .gridTemplateColumns.split(/\s+/)
      .filter(Boolean);
    await expect(tracks.length).toBeGreaterThanOrEqual(2);

    const css = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(css).toContain('bbangto-videoblock-gallery');
    await expect(css).toContain('repeat(3, minmax(0, 1fr))');

    // 3. content slots render: heading, caption, and one video per tile (each
    //    keeping the controls + captions-track a11y contract).
    await expect(
      await canvas.findByRole('heading', { name: /Clip Gallery/i })
    ).toBeVisible();
    await expect(canvas.getByText(/short clips/i)).toBeVisible();
    const videos = canvasElement.querySelectorAll('video');
    await expect(videos.length).toBeGreaterThan(1);
    videos.forEach((v) => {
      expect(v.hasAttribute('controls')).toBe(true);
      expect(v.querySelector('track[kind="captions"]')).not.toBeNull();
    });
  },
};

/**
 * LayoutBackground: video fills the section as a background with an overlay
 * scrim; text overlaid on top.
 */
export const LayoutBackground: Story = {
  args: {
    layout: 'background',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Immersive Background',
    caption: 'Text reads against the scrim.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const section = canvasElement.querySelector('section');
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-videoblock-layout')).toBe(
      'background'
    );

    // 2. load-bearing: video wrapper is absolutely positioned (full-bleed)
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '.bbangto-videoblock-bg-media'
    );
    await expect(wrapper).not.toBeNull();
    await expect(getComputedStyle(wrapper!).position).toBe('absolute');

    // 3. content slots render: heading, caption, video player
    await expect(
      await canvas.findByRole('heading', { name: /Immersive Background/i })
    ).toBeVisible();
    await expect(canvas.getByText(/reads against the scrim/i)).toBeVisible();
    const video = canvasElement.querySelector('video');
    await expect(video).not.toBeNull();
    await expect(video!.hasAttribute('controls')).toBe(true);
  },
};

/**
 * LayoutFramed: video wrapped in a device / browser frame (border + chrome).
 */
export const LayoutFramed: Story = {
  args: {
    layout: 'framed',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://www.w3schools.com/html/pic_trulli.jpg',
    title: 'Framed Demo',
    caption: 'Shown inside a browser chrome.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const section = canvasElement.querySelector('section');
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-videoblock-layout')).toBe(
      'framed'
    );

    // 2. load-bearing: frame wrapper has a non-zero border
    const frame = canvasElement.querySelector<HTMLElement>(
      '.bbangto-videoblock-frame'
    );
    await expect(frame).not.toBeNull();
    const borderWidth = getComputedStyle(frame!).borderTopWidth;
    await expect(borderWidth).not.toBe('');
    await expect(borderWidth).not.toBe('0px');

    // 3. content slots render: heading, caption, video player
    await expect(
      await canvas.findByRole('heading', { name: /Framed Demo/i })
    ).toBeVisible();
    await expect(canvas.getByText(/browser chrome/i)).toBeVisible();
    const video = canvasElement.querySelector('video');
    await expect(video).not.toBeNull();
    await expect(video!.hasAttribute('controls')).toBe(true);
  },
};
