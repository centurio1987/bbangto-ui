import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@bbangto-ui/core';

const meta = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return <Slider {...args} value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
};

export const Disabled: Story = {
  args: {
    value: 30,
    disabled: true,
  },
};
