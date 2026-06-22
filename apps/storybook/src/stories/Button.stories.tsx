import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@centurio87/core';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
    color: 'neutral',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Not Allowed',
    variant: 'solid',
    disabled: true,
  },
};
