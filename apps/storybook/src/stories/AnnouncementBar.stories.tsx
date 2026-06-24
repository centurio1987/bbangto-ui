import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnnouncementBar } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/AnnouncementBar',
  component: AnnouncementBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    dismissible: { control: 'boolean' },
    message: { control: 'text' },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'We just launched v2.0 — check out all the new features.',
    cta: {
      label: 'See what\'s new',
      href: '#changelog',
    },
    dismissible: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Region landmark is present
    const region = canvasElement.querySelector('[role="region"]');
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute('aria-label', 'Announcement');

    // 2. Message text renders
    const message = await canvas.findByText(
      /we just launched v2\.0/i
    );
    await expect(message).toBeVisible();

    // 3. CTA link renders and is a real anchor
    const ctaLink = await canvas.findByRole('link', { name: /see what's new/i });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '#changelog');
  },
};

export const Dismissible: Story = {
  args: {
    message: 'Free shipping on all orders over $50 — limited time offer.',
    cta: {
      label: 'Shop now',
      href: '#shop',
    },
    dismissible: true,
  },
  render: (args) => {
    // Wrapper with local state so the dismiss interaction can be demonstrated.
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <div
          style={{ padding: '24px', fontFamily: 'sans-serif', fontSize: '14px' }}
        >
          Announcement dismissed. Refresh the story to restore it.
        </div>
      );
    }
    return <AnnouncementBar {...args} onDismiss={() => setVisible(false)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Message renders
    const message = await canvas.findByText(/free shipping/i);
    await expect(message).toBeVisible();

    // 2. CTA link renders
    const ctaLink = await canvas.findByRole('link', { name: /shop now/i });
    await expect(ctaLink).toBeVisible();

    // 3. Dismiss button is present and accessible
    const dismissBtn = await canvas.findByRole('button', {
      name: /dismiss announcement/i,
    });
    await expect(dismissBtn).toBeVisible();

    // 4. Clicking dismiss removes the bar
    await userEvent.click(dismissBtn);
    await expect(message).not.toBeVisible();
  },
};
