import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    variant: {
      control: 'select',
      options: ['plain', 'gradient-ring'],
    },
    src: { control: 'text' },
    initials: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'lg',
    initials: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    alt: 'User profile',
  },
};

export const SquareShape: Story = {
  args: {
    size: 'xl',
    shape: 'square',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
};

export const FallbackToInitials: Story = {
  args: {
    size: 'lg',
    src: 'https://invalid-image-url.com/broken.jpg',
    initials: 'JD',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Broken image src falls back to initials.
    const el = await canvas.findByText('JD');
    await expect(el).toBeVisible();
  },
};

export const NoSrcShowsInitials: Story = {
  args: {
    size: 'lg',
    initials: 'ab',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Initials are uppercased and capped at 2 chars.
    const el = await canvas.findByText('AB');
    await expect(el).toBeVisible();
  },
};

export const StatusOnline: Story = {
  args: {
    size: 'xl',
    initials: 'JD',
    status: 'online',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('JD')).toBeVisible();
    // Status dot exposes its state via aria-label / role.
    const dot = canvasElement.querySelector('[data-avatar-status]');
    await expect(dot).not.toBeNull();
    await expect(dot).toHaveAttribute('aria-label', 'online');
    const style = getComputedStyle(dot as Element);
    // Dot is positioned absolutely at the bottom-right corner.
    await expect(style.position).toBe('absolute');
    // Token-driven background color is applied (non-empty resolved color).
    await expect(style.backgroundColor).not.toBe('');
  },
};

export const StatusBusy: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    status: 'busy',
  },
  play: async ({ canvasElement }) => {
    const dot = canvasElement.querySelector('[data-avatar-status]');
    await expect(dot).not.toBeNull();
    await expect(dot).toHaveAttribute('aria-label', 'busy');
  },
};

export const GradientRing: Story = {
  args: {
    size: 'xl',
    variant: 'gradient-ring',
    initials: 'JD',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. Variant hook is rendered on the root element.
    const root = canvasElement.querySelector(
      '[data-bbangto-avatar-variant]'
    ) as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute(
      'data-bbangto-avatar-variant',
      'gradient-ring'
    );
    // 2. Load-bearing chrome: the gradient frame is the ring (background-image
    // carries a gradient), and a background-colored gap separates the ring from
    // the inner content.
    const rootStyle = getComputedStyle(root);
    await expect(rootStyle.backgroundImage).toContain('gradient');
    const gap = canvasElement.querySelector(
      '[data-bbangto-avatar-ring-gap]'
    ) as HTMLElement;
    await expect(gap).not.toBeNull();
    const gapStyle = getComputedStyle(gap);
    // Ring offset gap paints a real background color, not transparent.
    await expect(gapStyle.backgroundColor).not.toBe('');
    await expect(gapStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // 3. Content slot renders.
    await expect(await canvas.findByText('JD')).toBeVisible();
  },
};

export const SquareWithStatus: Story = {
  args: {
    size: 'lg',
    shape: 'square',
    initials: 'JD',
    status: 'away',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvasElement.querySelector('[data-avatar-status]')
      ?.parentElement as HTMLElement;
    const style = getComputedStyle(root);
    // Square shape uses radius token, not a 50% circle.
    await expect(style.borderRadius).not.toBe('50%');
    await expect(await canvas.findByText('JD')).toBeVisible();
  },
};
