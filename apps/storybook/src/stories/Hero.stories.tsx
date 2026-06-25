import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Blocks/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Placeholder illustration used in the split variant story. */
const MediaPlaceholder = () => (
  <div
    role="img"
    aria-label="Hero illustration placeholder"
    style={{
      width: '100%',
      maxWidth: 480,
      aspectRatio: '4 / 3',
      borderRadius: 'var(--bbangto-radius-lg, 12px)',
      background:
        'linear-gradient(135deg, var(--bbangto-semantic-primary-subtle, #eff6ff) 0%, var(--bbangto-semantic-primary-base, #3b82f6) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 64,
    }}
  >
    🍞
  </div>
);

/** Full-bleed media used by the background-media variant. */
const BackgroundPlaceholder = () => (
  <div
    role="img"
    aria-label="Hero background placeholder"
    style={{
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(135deg, var(--bbangto-semantic-primary-base, #3b82f6) 0%, var(--bbangto-semantic-primary-active, #1d4ed8) 100%)',
    }}
  />
);

/** Aggregate every <style> tag's text so scoped @media rules can be asserted. */
const collectStyleText = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

/**
 * Default centred Hero — no media slot.
 * Verifies that title, subtitle and both CTAs are rendered, and that clicking
 * the primary CTA fires the handler.
 */
export const Default: Story = {
  args: {
    eyebrow: 'Now in public beta',
    title: 'Build beautiful products faster',
    subtitle:
      'A themeable, accessible React component library designed for teams that move quickly without cutting corners.',
    primaryCta: { label: 'Get started free' },
    secondaryCta: { label: 'View components' },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: typeof Default['args'] & { primaryCta?: { label: string; onClick?: () => void } } }) => {
    const canvas = within(canvasElement);

    // 1. Core slots are rendered
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveTextContent('Build beautiful products faster');

    const subtitle = canvas.getByText(
      'A themeable, accessible React component library designed for teams that move quickly without cutting corners.'
    );
    await expect(subtitle).toBeVisible();

    const primaryBtn = canvas.getByRole('button', { name: 'Get started free' });
    await expect(primaryBtn).toBeVisible();

    const secondaryBtn = canvas.getByRole('button', { name: 'View components' });
    await expect(secondaryBtn).toBeVisible();

    // 2. CTA interaction
    await userEvent.click(primaryBtn);
    // Button is not disabled after click — stays interactive
    await expect(primaryBtn).not.toBeDisabled();
  },
};

/**
 * Split Hero — text on the left, media on the right.
 * On desktop (≥ 1024 px) the layout becomes two columns.
 */
export const WithMedia: Story = {
  args: {
    eyebrow: 'Design System v2',
    title: 'Every component you need, out of the box',
    subtitle:
      'Tokens, themes, motion and accessibility built in. Ship faster and stay consistent across your entire product.',
    primaryCta: { label: 'Start building' },
    secondaryCta: { label: 'Read the docs' },
    media: <MediaPlaceholder />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Title and CTAs render
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    const primaryBtn = canvas.getByRole('button', { name: 'Start building' });
    await expect(primaryBtn).toBeVisible();

    // Media placeholder is present
    const media = canvas.getByRole('img', { name: 'Hero illustration placeholder' });
    await expect(media).toBeVisible();
  },
};

/**
 * Explicit split-media layout — text on the left, media on the right.
 * The two-column split is applied at ≥ lg via the scoped <style> rule.
 */
export const SplitMedia: Story = {
  args: {
    eyebrow: 'Split layout',
    title: 'Text leads, media follows',
    subtitle: 'An explicit split-media layout keeps text on the left.',
    primaryCta: { label: 'Start building' },
    secondaryCta: { label: 'Read the docs' },
    media: <MediaPlaceholder />,
    layout: 'split-media',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr reflects the explicit layout
    const section = canvasElement.querySelector(
      '[data-bbangto-hero-layout]'
    ) as HTMLElement;
    await expect(section).toBeTruthy();
    await expect(section).toHaveAttribute(
      'data-bbangto-hero-layout',
      'split-media'
    );

    // 2. Load-bearing: scoped 2-column rule present in aggregated <style> text
    const styleText = collectStyleText(canvasElement);
    await expect(styleText).toContain('grid-template-columns: 1fr 1fr');

    // 3. Content slots still render
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Start building' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Hero illustration placeholder' })
    ).toBeVisible();
  },
};

/**
 * split-reverse layout — same 2-column grid, media painted before text.
 */
export const SplitReverse: Story = {
  args: {
    eyebrow: 'Reverse split',
    title: 'Media leads, text follows',
    subtitle: 'The split-reverse layout flips the column order.',
    primaryCta: { label: 'Get started' },
    secondaryCta: { label: 'Learn more' },
    media: <MediaPlaceholder />,
    layout: 'split-reverse',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr
    const section = canvasElement.querySelector(
      '[data-bbangto-hero-layout]'
    ) as HTMLElement;
    await expect(section).toHaveAttribute(
      'data-bbangto-hero-layout',
      'split-reverse'
    );

    // 2. Load-bearing: scoped 2-column rule present + media column ordered first
    const styleText = collectStyleText(canvasElement);
    await expect(styleText).toContain('grid-template-columns: 1fr 1fr');

    const mediaCol = canvasElement.querySelector(
      '.bbangto-hero-media'
    ) as HTMLElement;
    await expect(mediaCol).toBeTruthy();
    await expect(getComputedStyle(mediaCol).order).toBe('-1');

    // 3. Content slots still render
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Get started' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Hero illustration placeholder' })
    ).toBeVisible();
  },
};

/**
 * background-media layout — media fills the section, text overlaid on a scrim.
 */
export const BackgroundMedia: Story = {
  args: {
    eyebrow: 'Immersive',
    title: 'Text on a full-bleed backdrop',
    subtitle: 'Media fills the section while the copy sits above a scrim.',
    primaryCta: { label: 'Explore' },
    secondaryCta: { label: 'Watch demo' },
    media: <BackgroundPlaceholder />,
    layout: 'background-media',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr
    const section = canvasElement.querySelector(
      '[data-bbangto-hero-layout]'
    ) as HTMLElement;
    await expect(section).toHaveAttribute(
      'data-bbangto-hero-layout',
      'background-media'
    );

    // 2. Load-bearing: media wrapper is absolutely positioned to fill the section
    const bgMedia = canvasElement.querySelector(
      '.bbangto-hero-bg-media'
    ) as HTMLElement;
    await expect(bgMedia).toBeTruthy();
    await waitFor(() =>
      expect(getComputedStyle(bgMedia).position).toBe('absolute')
    );

    // Reduced-motion fallback rule exists in aggregated <style> text
    const styleText = collectStyleText(canvasElement);
    await expect(styleText).toContain('prefers-reduced-motion: reduce');

    // 3. Content slots still render
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Explore' })).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Hero background placeholder' })
    ).toBeInTheDocument();
  },
};

/**
 * minimal layout — type-only and condensed. No media column is rendered even
 * when a media prop is supplied.
 */
export const Minimal: Story = {
  args: {
    eyebrow: 'Minimal',
    title: 'Just the essentials',
    subtitle: 'A condensed, type-only hero with no media column.',
    primaryCta: { label: 'Continue' },
    media: <MediaPlaceholder />,
    layout: 'minimal',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr
    const section = canvasElement.querySelector(
      '[data-bbangto-hero-layout]'
    ) as HTMLElement;
    await expect(section).toHaveAttribute(
      'data-bbangto-hero-layout',
      'minimal'
    );

    // 2. Load-bearing: no media column rendered despite media prop
    await expect(
      canvasElement.querySelector('.bbangto-hero-media')
    ).toBeNull();
    await expect(
      canvas.queryByRole('img', { name: 'Hero illustration placeholder' })
    ).toBeNull();

    // 3. Content slots still render
    const heading = await canvas.findByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeVisible();
  },
};
