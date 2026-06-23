import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '@centurio1987/core';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return <SegmentedControl {...args} segments={['Daily', 'Weekly', 'Monthly']} selectedIndex={index} onChange={setIndex} />;
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <div style={{ width: '400px' }}>
        <SegmentedControl {...args} segments={['Left', 'Center', 'Right']} selectedIndex={index} onChange={setIndex} />
      </div>
    );
  },
};
