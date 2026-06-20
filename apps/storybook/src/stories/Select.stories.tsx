import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@bbangto-ui/core';

const meta = {
  title: 'Molecules/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} options={mockOptions} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    disabled: true,
  },
};
