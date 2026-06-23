import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@centurio1987/core';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" style={{ marginBottom: '8px' }} />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={150} />
      <Skeleton variant="rounded" width="100%" height={60} />
    </div>
  ),
};
