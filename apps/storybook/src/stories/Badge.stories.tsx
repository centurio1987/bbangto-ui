import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@centurio1987/core';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    color: 'success',
    variant: 'solid',
    children: 'Active',
  },
};

export const Value: Story = {
  args: {
    color: 'error',
    variant: 'solid',
    children: '99+',
  },
};

export const Subtle: Story = {
  args: {
    color: 'warning',
    variant: 'subtle',
    children: 'Pending',
  },
};
