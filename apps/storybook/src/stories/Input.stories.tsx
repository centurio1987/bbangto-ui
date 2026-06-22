import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@centurio87/core';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter something...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_doe',
    helperText: 'You can change this later.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    defaultValue: '123',
    error: 'Password must be at least 8 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Not allowed',
    disabled: true,
  },
};
