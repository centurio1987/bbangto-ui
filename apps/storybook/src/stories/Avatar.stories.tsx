import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@centurio1987/core';

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
};
