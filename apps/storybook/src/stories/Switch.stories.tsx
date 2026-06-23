import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@centurio1987/core';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} label="Enable notifications" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};
