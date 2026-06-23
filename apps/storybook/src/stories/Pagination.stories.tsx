import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@centurio1987/core';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['navigation', 'dot', 'counter'],
    },
    totalPages: { control: 'number' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    totalPages: 10,
  },
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    totalPages: 5,
  },
  render: Navigation.render,
};

export const Counter: Story = {
  args: {
    variant: 'counter',
    totalPages: 12,
  },
  render: Navigation.render,
};
