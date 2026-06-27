import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Cell, Avatar, Switch, Badge } from '@centurio1987/bbangto-ui-core';

const meta = {
  title: 'Molecules/Cell',
  component: Cell,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Profile Settings',
    description: 'Update your personal details',
    interactive: true,
  },
};

export const WithLeadingAndTrailing: Story = {
  args: {
    title: 'Notifications',
    description: 'Receive push notifications',
    leading: <Avatar initials="N" size="sm" />,
    trailing: <Switch checked />,
    interactive: false,
  },
};

export const List: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <Cell title="General" trailing={<Badge>New</Badge>} interactive />
      <Cell title="Security" description="Password, 2FA" interactive />
      <Cell title="Billing" interactive />
    </div>
  ),
};
