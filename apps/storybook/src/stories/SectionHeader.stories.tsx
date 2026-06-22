import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader, Button } from '@centurio87/core';

const meta = {
  title: 'Molecules/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Popular Jobs',
    action: <Button variant="text" size="sm">View All</Button>,
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Profile Settings',
    description: 'Update your personal information and preferences.',
    action: <Button variant="outline" size="sm">Edit</Button>,
  },
};
