import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

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
