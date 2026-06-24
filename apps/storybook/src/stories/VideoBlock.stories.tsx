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
