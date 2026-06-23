import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@centurio1987/core';

const meta = {
  title: 'Molecules/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
    helperText: 'Max 500 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
    error: 'This field is required',
  },
};
