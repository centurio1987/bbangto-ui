import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from '@centurio1987/core';
import { expect, within, waitFor } from 'storybook/test';

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

/** Masonry layout — images flow into balanced columns via column-count. */
export const LayoutMasonry: Story = {
  args: {
    images: SAMPLE_IMAGES,
    layout: 'masonry',
    columns: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr reflects the layout
    const section = canvasElement.querySelector('section') as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute(
      'data-bbangto-gallery-layout',
      'masonry'
    );

    // 2. Load-bearing style: the list is a multi-column masonry container
    const list = canvasElement.querySelector('ul') as HTMLUListElement;
    await expect(list).not.toBeNull();
    const columnCount = getComputedStyle(list).columnCount;
    await expect(Number(columnCount)).toBeGreaterThan(1);

    // 3. Content slots still render
    const imgs = canvas.getAllByRole('img');
    await expect(imgs).toHaveLength(SAMPLE_IMAGES.length);
  },
};

/** Carousel layout — horizontal scroll-snap strip, keyboard-operable. */
export const LayoutCarousel: Story = {
  args: {
    images: SAMPLE_IMAGES,
    layout: 'carousel',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr reflects the layout
    const section = canvasElement.querySelector('section') as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute(
      'data-bbangto-gallery-layout',
      'carousel'
    );

    // 2. Load-bearing style: scroller overflows horizontally
    const scroller = canvasElement.querySelector('ul') as HTMLUListElement;
    await expect(scroller).not.toBeNull();
    const overflowX = getComputedStyle(scroller).overflowX;
    await expect(['auto', 'scroll']).toContain(overflowX);

    // 2b. Scroller is keyboard-focusable
    await expect(scroller).toHaveAttribute('tabindex', '0');

    // 2c. Reduced-motion fallback rule is present in the scoped styles
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('prefers-reduced-motion: reduce');

    // 3. Content slots still render
    const imgs = canvas.getAllByRole('img');
    await expect(imgs).toHaveLength(SAMPLE_IMAGES.length);
  },
};

/** Featured layout — one large lead image with a thumbnail strip of the rest. */
export const LayoutFeatured: Story = {
  args: {
    images: SAMPLE_IMAGES,
    layout: 'featured',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr reflects the layout
    const section = canvasElement.querySelector('section') as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute(
      'data-bbangto-gallery-layout',
      'featured'
    );

    // 3. Content slots still render
    const imgs = canvas.getAllByRole('img');
    await expect(imgs).toHaveLength(SAMPLE_IMAGES.length);

    // 2. Load-bearing: the lead image renders larger than the thumbnails
    const lead = canvasElement.querySelector(
      '.bbangto-gallery-featured-lead img'
    ) as HTMLImageElement;
    await expect(lead).not.toBeNull();

    const thumbList = canvasElement.querySelector('ul') as HTMLUListElement;
    await expect(thumbList).not.toBeNull();
    const firstThumb = thumbList.querySelector('img') as HTMLImageElement;
    await expect(firstThumb).not.toBeNull();

    await waitFor(async () => {
      const leadWidth = lead.getBoundingClientRect().width;
      const thumbWidth = firstThumb.getBoundingClientRect().width;
      await expect(leadWidth).toBeGreaterThan(thumbWidth);
    });
  },
};
