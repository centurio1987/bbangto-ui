import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Blocks/Gallery',
  component: Gallery,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4],
    },
  },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Mountain lake with reflections at sunrise',
    caption: 'Sunrise at the lake',
  },
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    alt: 'Aerial view of green forest',
    caption: 'Forest from above',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    alt: 'Calm ocean with gentle waves at dusk',
    caption: 'Ocean at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    alt: 'Rugged mountain peaks under blue sky',
    caption: 'Mountain peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    alt: 'Sandy desert dunes casting long shadows',
    caption: 'Desert dunes',
  },
  {
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
    alt: 'Misty forest path in autumn',
    caption: 'Autumn forest path',
  },
];

/** Default gallery — intrinsic responsive grid (auto-fit / minmax). */
export const Default: Story = {
  args: {
    images: SAMPLE_IMAGES,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Section renders
    const section = canvasElement.querySelector('section');
    await expect(section).not.toBeNull();
    await expect(section).toBeVisible();

    // 2. All images are present
    const imgs = canvas.getAllByRole('img');
    await expect(imgs).toHaveLength(SAMPLE_IMAGES.length);

    // 3. Each image has a meaningful alt text
    for (const img of imgs) {
      await expect(img).toHaveAttribute('alt');
      await expect(img.getAttribute('alt')).not.toBe('');
    }

    // 4. Captions render for images that have them
    const captionTexts = SAMPLE_IMAGES
      .filter((i) => i.caption)
      .map((i) => i.caption as string);
    for (const caption of captionTexts) {
      const el = canvas.getByText(caption);
      await expect(el).toBeVisible();
    }
  },
};

/** Fixed 3-column layout — useful for marketing pages with a curated set. */
export const ThreeColumns: Story = {
  args: {
    images: SAMPLE_IMAGES.slice(0, 3),
    columns: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const imgs = canvas.getAllByRole('img');
    await expect(imgs).toHaveLength(3);

    // Grid column style should reflect the fixed count
    const list = canvasElement.querySelector('ul') as HTMLUListElement;
    await expect(list).not.toBeNull();
    await expect(getComputedStyle(list).display).toBe('grid');
  },
};
