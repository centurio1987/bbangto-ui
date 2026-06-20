import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from '@bbangto-ui/core';

const meta = {
  title: 'Atoms/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <ProgressIndicator size="sm" />
      <ProgressIndicator size="md" />
      <ProgressIndicator size="lg" />
    </div>
  ),
};
